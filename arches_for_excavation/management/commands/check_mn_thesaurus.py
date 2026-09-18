"""Check locally imported MN Thesaurus schemes against the live endpoint."""

from __future__ import annotations

import json
import re
import time
from collections import defaultdict, deque
from dataclasses import dataclass, field

import requests
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.db.models import Q

from arches.app.models.concept import Concept as ArchesConcept
from arches.app.models.models import Concept, Relation, Value


ENTITY_BASE_URL = "https://thesaurus.mn.cenagis.edu.pl/entity/"
SPARQL_ENDPOINT = "https://thesaurus.mn.cenagis.edu.pl/sparql"
PARENT_PROPERTIES = "(wdt:P2|wdt:P20)"
LOCAL_RELATION_TYPES = ("hasTopConcept", "narrower")
VALUE_TYPES = ("prefLabel", "altLabel", "definition")


@dataclass
class SchemeSnapshot:
    uri: str
    concepts: set[str] = field(default_factory=set)
    values: dict[str, set[tuple[str, str, str]]] = field(
        default_factory=lambda: defaultdict(set)
    )
    relations: set[tuple[str, str]] = field(default_factory=set)


@dataclass(frozen=True)
class SchemeDifference:
    missing_concepts: frozenset[str]
    extra_concepts: frozenset[str]
    missing_values: frozenset[tuple[str, str, str, str]]
    extra_values: frozenset[tuple[str, str, str, str]]
    missing_relations: frozenset[tuple[str, str]]
    extra_relations: frozenset[tuple[str, str]]

    @property
    def is_current(self):
        return not any(
            (
                self.missing_concepts,
                self.extra_concepts,
                self.missing_values,
                self.extra_values,
                self.missing_relations,
                self.extra_relations,
            )
        )


@dataclass
class ApplyStats:
    concepts_created: int = 0
    values_created: int = 0
    values_updated: int = 0
    relations_created: int = 0


def compare_snapshots(local: SchemeSnapshot, remote: SchemeSnapshot):
    """Return independent content differences without double-counting new nodes."""
    missing_concepts = frozenset(remote.concepts - local.concepts)
    extra_concepts = frozenset(local.concepts - remote.concepts)
    common_uris = (local.concepts & remote.concepts) | {local.uri}

    local_values = {
        (uri, value_type, language, value)
        for uri in common_uris
        for value_type, language, value in local.values.get(uri, set())
    }
    remote_values = {
        (uri, value_type, language, value)
        for uri in common_uris
        for value_type, language, value in remote.values.get(uri, set())
    }

    # A relation is compared only when both of its endpoints exist on both
    # sides. Otherwise the missing/extra concept already describes the issue.
    comparable_uris = (local.concepts & remote.concepts) | {local.uri}
    local_relations = {
        relation
        for relation in local.relations
        if relation[0] in comparable_uris and relation[1] in comparable_uris
    }
    remote_relations = {
        relation
        for relation in remote.relations
        if relation[0] in comparable_uris and relation[1] in comparable_uris
    }

    return SchemeDifference(
        missing_concepts=missing_concepts,
        extra_concepts=extra_concepts,
        missing_values=frozenset(remote_values - local_values),
        extra_values=frozenset(local_values - remote_values),
        missing_relations=frozenset(remote_relations - local_relations),
        extra_relations=frozenset(local_relations - remote_relations),
    )


def build_sparql_query(scheme_uris, languages):
    schemes = " ".join(f"<{uri}>" for uri in scheme_uris)
    language_literals = ", ".join(json.dumps(language) for language in languages)
    if "" not in languages:
        language_literals += ', ""'

    return f"""
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <http://schema.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX wdt: <https://thesaurus.mn.cenagis.edu.pl/prop/direct/>

SELECT DISTINCT ?scheme ?kind ?concept ?value ?language ?parent WHERE {{
  VALUES ?scheme {{ {schemes} }}
  {{
    ?scheme rdfs:label ?value .
    FILTER(LANG(?value) IN ({language_literals}))
    BIND(?scheme AS ?concept)
    BIND(LANG(?value) AS ?language)
    BIND("prefLabel" AS ?kind)
  }}
  UNION
  {{
    ?concept {PARENT_PROPERTIES}+ ?scheme .
    ?concept rdfs:label ?value .
    FILTER(LANG(?value) IN ({language_literals}))
    BIND(LANG(?value) AS ?language)
    BIND("prefLabel" AS ?kind)
  }}
  UNION
  {{
    ?concept {PARENT_PROPERTIES}+ ?scheme .
    ?concept skos:altLabel ?value .
    FILTER(LANG(?value) IN ({language_literals}))
    BIND(LANG(?value) AS ?language)
    BIND("altLabel" AS ?kind)
  }}
  UNION
  {{
    ?concept {PARENT_PROPERTIES}+ ?scheme .
    ?concept schema:description ?value .
    FILTER(LANG(?value) IN ({language_literals}))
    BIND(LANG(?value) AS ?language)
    BIND("definition" AS ?kind)
  }}
  UNION
  {{
    ?concept {PARENT_PROPERTIES} ?parent .
    ?parent {PARENT_PROPERTIES}* ?scheme .
    BIND("relation" AS ?kind)
  }}
}}
""".strip()


def parse_remote_bindings(scheme_uris, bindings):
    snapshots = {uri: SchemeSnapshot(uri=uri) for uri in scheme_uris}

    for binding in bindings:
        scheme_uri = binding.get("scheme", {}).get("value", "")
        snapshot = snapshots.get(scheme_uri)
        if snapshot is None:
            continue

        kind = binding.get("kind", {}).get("value", "")
        concept_uri = binding.get("concept", {}).get("value", "")

        if kind == "relation":
            parent_uri = binding.get("parent", {}).get("value", "")
            if parent_uri and concept_uri:
                snapshot.concepts.add(concept_uri)
                if parent_uri != scheme_uri:
                    snapshot.concepts.add(parent_uri)
                snapshot.relations.add((parent_uri, concept_uri))
            continue

        value = binding.get("value", {}).get("value")
        language = binding.get("language", {}).get("value", "")
        if concept_uri and value is not None and kind in VALUE_TYPES:
            if concept_uri != scheme_uri:
                snapshot.concepts.add(concept_uri)
            snapshot.values[concept_uri].add((kind, language, value))

    return snapshots


class Command(BaseCommand):
    help = (
        "Checks whether local ConceptSchemes imported from "
        "thesaurus.mn.cenagis.edu.pl match the live SPARQL data."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--scheme",
            action="append",
            default=[],
            metavar="QID_OR_URI",
            help="Check only this scheme (for example Q451). May be repeated.",
        )
        parser.add_argument(
            "--language",
            action="append",
            default=[],
            metavar="CODE",
            help=(
                "Language to compare. May be repeated; defaults to the Django "
                "LANGUAGE_CODE. Values without a language tag are also compared."
            ),
        )
        parser.add_argument(
            "--endpoint",
            default=SPARQL_ENDPOINT,
            help="SPARQL endpoint URL (mainly useful for diagnostics/testing).",
        )
        parser.add_argument(
            "--timeout",
            type=float,
            default=60.0,
            help="HTTP timeout in seconds (default: 60).",
        )
        parser.add_argument(
            "--retries",
            type=int,
            default=2,
            help="Retries after a transient HTTP/network error (default: 2).",
        )
        parser.add_argument(
            "--max-details",
            type=int,
            default=20,
            help="Maximum displayed items per difference category (default: 20).",
        )
        parser.add_argument(
            "--summary-only",
            action="store_true",
            help="Show counts without individual changed items.",
        )
        parser.add_argument(
            "--apply",
            action="store_true",
            help=(
                "Add missing concepts, values and hierarchy relations from the "
                "live source, then check the selected schemes again."
            ),
        )
        parser.add_argument(
            "--no-fail",
            action="store_true",
            help="Return exit code 0 even when differences are found.",
        )

    def handle(self, *args, **options):
        self._validate_options(options)
        languages = tuple(
            dict.fromkeys(options["language"] or [settings.LANGUAGE_CODE])
        )
        schemes = self._get_schemes(options["scheme"])
        if not schemes:
            raise CommandError(
                "No local ConceptSchemes linked to thesaurus.mn.cenagis.edu.pl were found."
            )

        scheme_uris = [scheme.legacyoid for scheme in schemes]
        self.stdout.write(
            f"Checking {len(scheme_uris)} MN Thesaurus scheme(s) "
            f"[{', '.join(languages)}]..."
        )

        local_snapshots = self._load_local_snapshots(schemes, languages)
        remote_snapshots = self._load_remote_snapshots(
            scheme_uris=scheme_uris,
            languages=languages,
            endpoint=options["endpoint"],
            timeout=options["timeout"],
            retries=options["retries"],
        )

        if options["apply"]:
            differences = {
                scheme_uri: compare_snapshots(
                    local_snapshots[scheme_uri], remote_snapshots[scheme_uri]
                )
                for scheme_uri in scheme_uris
            }
            if any(not difference.is_current for difference in differences.values()):
                self.stdout.write("Applying MN Thesaurus changes...")
                stats = self._apply_remote_snapshots(
                    schemes, local_snapshots, remote_snapshots, languages
                )
                self.stdout.write(
                    self.style.SUCCESS(
                        "Applied: "
                        f"{stats.concepts_created} concepts created, "
                        f"{stats.values_created} values created, "
                        f"{stats.values_updated} values updated, "
                        f"{stats.relations_created} relations created."
                    )
                )
                local_snapshots = self._load_local_snapshots(schemes, languages)
                self.stdout.write("Checking again after apply...")
            else:
                self.stdout.write("No changes to apply.")

        outdated = 0
        for scheme_uri in scheme_uris:
            local = local_snapshots[scheme_uri]
            remote = remote_snapshots[scheme_uri]
            difference = compare_snapshots(local, remote)
            label = self._scheme_label(local, languages)
            if difference.is_current:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"OK       {label} ({self._short_uri(scheme_uri)}): "
                        f"{len(local.concepts)} concepts"
                    )
                )
                continue

            outdated += 1
            self.stdout.write(
                self.style.ERROR(
                    f"OUTDATED {label} ({self._short_uri(scheme_uri)}): "
                    f"local {len(local.concepts)}, remote {len(remote.concepts)} concepts"
                )
            )
            self._write_difference(
                difference,
                max_details=options["max_details"],
                summary_only=options["summary_only"],
            )

        current = len(scheme_uris) - outdated
        self.stdout.write("")
        self.stdout.write(
            f"Summary: {len(scheme_uris)} checked, {current} current, {outdated} outdated."
        )

        if outdated and not options["no_fail"]:
            raise CommandError(
                f"{outdated} MN Thesaurus scheme(s) are not current. "
                "Use --no-fail when only a report is required."
            )

    @staticmethod
    def _validate_options(options):
        if options["timeout"] <= 0:
            raise CommandError("--timeout must be greater than zero.")
        if options["retries"] < 0:
            raise CommandError("--retries cannot be negative.")
        if options["max_details"] < 0:
            raise CommandError("--max-details cannot be negative.")

        language_pattern = re.compile(r"^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$")
        invalid_languages = [
            language
            for language in options["language"]
            if not language_pattern.fullmatch(language)
        ]
        if invalid_languages:
            raise CommandError(
                f"Invalid --language value: {invalid_languages[0]!r}."
            )

    def _get_schemes(self, requested_schemes):
        queryset = Concept.objects.filter(
            nodetype_id="ConceptScheme",
            legacyoid__startswith=ENTITY_BASE_URL,
        )

        if requested_schemes:
            requested_uris = set()
            for identifier in requested_schemes:
                if re.fullmatch(r"Q\d+", identifier, flags=re.IGNORECASE):
                    requested_uris.add(f"{ENTITY_BASE_URL}{identifier.upper()}")
                elif identifier.startswith(ENTITY_BASE_URL):
                    requested_uris.add(identifier)
                else:
                    raise CommandError(
                        f"Invalid --scheme {identifier!r}; use a QID or an "
                        f"{ENTITY_BASE_URL} URL."
                    )
            queryset = queryset.filter(legacyoid__in=requested_uris)

            found_uris = set(queryset.values_list("legacyoid", flat=True))
            missing_uris = requested_uris - found_uris
            if missing_uris:
                missing = ", ".join(sorted(self._short_uri(uri) for uri in missing_uris))
                raise CommandError(f"Local scheme(s) not found: {missing}.")

        return list(queryset.order_by("legacyoid"))

    @staticmethod
    def _load_local_snapshots(schemes, languages):
        concepts = list(
            Concept.objects.filter(legacyoid__startswith=ENTITY_BASE_URL).only(
                "conceptid", "legacyoid"
            )
        )
        id_to_uri = {
            concept.conceptid: concept.legacyoid
            for concept in concepts
            if concept.legacyoid
        }

        adjacency = defaultdict(set)
        relation_rows = Relation.objects.filter(
            conceptfrom_id__in=id_to_uri,
            conceptto_id__in=id_to_uri,
            relationtype_id__in=LOCAL_RELATION_TYPES,
        ).values_list("conceptfrom_id", "conceptto_id")
        for parent_id, child_id in relation_rows:
            adjacency[parent_id].add(child_id)

        values_by_id = defaultdict(set)
        value_rows = Value.objects.filter(
            Q(language_id__in=languages) | Q(language__isnull=True),
            concept_id__in=id_to_uri,
            valuetype_id__in=VALUE_TYPES,
        ).values_list("concept_id", "valuetype_id", "language_id", "value")
        for concept_id, value_type, language, value in value_rows:
            values_by_id[concept_id].add((value_type, language or "", value))

        snapshots = {}
        for scheme in schemes:
            scheme_uri = scheme.legacyoid
            snapshot = SchemeSnapshot(uri=scheme_uri)
            queue = deque([scheme.conceptid])
            visited = {scheme.conceptid}

            while queue:
                parent_id = queue.popleft()
                parent_uri = id_to_uri.get(parent_id)
                if not parent_uri:
                    continue
                for child_id in adjacency.get(parent_id, set()):
                    child_uri = id_to_uri.get(child_id)
                    if not child_uri:
                        continue
                    snapshot.relations.add((parent_uri, child_uri))
                    snapshot.concepts.add(child_uri)
                    if child_id not in visited:
                        visited.add(child_id)
                        queue.append(child_id)

            for concept_id in visited:
                uri = id_to_uri.get(concept_id)
                if uri:
                    snapshot.values[uri].update(values_by_id.get(concept_id, set()))

            snapshots[scheme_uri] = snapshot

        return snapshots

    def _apply_remote_snapshots(
        self, schemes, local_snapshots, remote_snapshots, languages
    ):
        """Add source concepts, values and hierarchy relations that are missing."""
        stats = ApplyStats()
        scheme_uris = {scheme.legacyoid for scheme in schemes}

        with transaction.atomic():
            concepts_by_uri = {
                concept.legacyoid: concept
                for concept in Concept.objects.select_for_update().filter(
                    legacyoid__startswith=ENTITY_BASE_URL
                )
            }

            remote_concept_uris = set(scheme_uris)
            for snapshot in remote_snapshots.values():
                remote_concept_uris.update(snapshot.concepts)

            default_language = languages[0] if languages else settings.LANGUAGE_CODE
            for uri in sorted(remote_concept_uris):
                if uri in concepts_by_uri:
                    continue
                concept = Concept.objects.create(
                    nodetype_id="Concept",
                    legacyoid=uri,
                )
                concepts_by_uri[uri] = concept
                Value.objects.create(
                    concept=concept,
                    valuetype_id="identifier",
                    value=uri,
                    language_id=default_language,
                )
                stats.concepts_created += 1
                stats.values_created += 1

            desired_values = defaultdict(set)
            for snapshot in remote_snapshots.values():
                for uri, values in snapshot.values.items():
                    desired_values[uri].update(values)

            relevant_concept_ids = [
                concepts_by_uri[uri].conceptid for uri in remote_concept_uris
            ]
            language_filter = Q(language_id__in=languages) | Q(
                language__isnull=True
            )
            existing_values = Value.objects.filter(
                language_filter,
                concept_id__in=relevant_concept_ids,
                valuetype_id__in=VALUE_TYPES,
            ).values_list(
                "concept__legacyoid",
                "valuetype_id",
                "language_id",
                "value",
            )
            exact_value_keys = {
                (uri, value_type, language or "", value)
                for uri, value_type, language, value in existing_values
            }
            occupied_single_value_slots = {
                (uri, value_type, language)
                for uri, value_type, language, _value in exact_value_keys
                if value_type in ("prefLabel", "definition")
            }

            for uri, values in desired_values.items():
                concept = concepts_by_uri[uri]
                for value_type, language, value in sorted(values):
                    value_key = (uri, value_type, language, value)
                    if value_key in exact_value_keys:
                        continue
                    slot = (uri, value_type, language)
                    if slot in occupied_single_value_slots:
                        # A prefLabel/definition has one value per language.
                        # Keep its Value UUID (referenced by record tiles) but
                        # replace stale text with the live RDM label.
                        if value_type in ("prefLabel", "definition"):
                            stats.values_updated += Value.objects.filter(
                                concept=concept,
                                valuetype_id=value_type,
                                language_id=language or None,
                            ).exclude(value=value).update(value=value)
                            exact_value_keys.add(value_key)
                        continue
                    Value.objects.create(
                        concept=concept,
                        valuetype_id=value_type,
                        value=value,
                        language_id=language or None,
                    )
                    exact_value_keys.add(value_key)
                    if value_type in ("prefLabel", "definition"):
                        occupied_single_value_slots.add(slot)
                    stats.values_created += 1

            desired_relations = set()
            local_relations = set()
            for scheme_uri in scheme_uris:
                desired_relations.update(remote_snapshots[scheme_uri].relations)
                local_relations.update(local_snapshots[scheme_uri].relations)

            for parent_uri, child_uri in sorted(desired_relations - local_relations):
                relation_type = (
                    "hasTopConcept" if parent_uri in scheme_uris else "narrower"
                )
                _relation, created = Relation.objects.get_or_create(
                    conceptfrom=concepts_by_uri[parent_uri],
                    conceptto=concepts_by_uri[child_uri],
                    relationtype_id=relation_type,
                )
                if created:
                    stats.relations_created += 1

        if stats.concepts_created or stats.values_created or stats.relations_created:
            try:
                for scheme in schemes:
                    ArchesConcept(scheme).bulk_index()
            except Exception as exc:
                raise CommandError(
                    "The missing data was added to the database, but the Arches "
                    f"concept search index could not be refreshed: {exc}"
                ) from exc

        return stats

    def _load_remote_snapshots(
        self, scheme_uris, languages, endpoint, timeout, retries
    ):
        query = build_sparql_query(scheme_uris, languages)
        for attempt in range(retries + 1):
            try:
                response = requests.get(
                    endpoint,
                    params={"query": query},
                    headers={
                        "Accept": "application/sparql-results+json",
                        "User-Agent": "arches-for-excavation-thesaurus-check/1.0",
                    },
                    timeout=timeout,
                )
                response.raise_for_status()
                payload = response.json()
                bindings = payload["results"]["bindings"]
                return parse_remote_bindings(scheme_uris, bindings)
            except (
                requests.RequestException,
                ValueError,
                KeyError,
                TypeError,
            ) as exc:
                if attempt >= retries:
                    raise CommandError(
                        f"Could not read MN Thesaurus SPARQL endpoint: {exc}"
                    ) from exc
                wait_seconds = min(2**attempt, 10)
                self.stderr.write(
                    self.style.WARNING(
                        f"SPARQL request failed; retrying in {wait_seconds}s "
                        f"({attempt + 1}/{retries})..."
                    )
                )
                time.sleep(wait_seconds)

        raise CommandError("Could not read MN Thesaurus SPARQL endpoint.")

    def _write_difference(self, difference, max_details, summary_only):
        categories = (
            (
                "missing local concepts",
                difference.missing_concepts,
                lambda uri: self._short_uri(uri),
            ),
            (
                "concepts only in local data",
                difference.extra_concepts,
                lambda uri: self._short_uri(uri),
            ),
            (
                "missing/changed local values",
                difference.missing_values,
                self._format_value,
            ),
            (
                "values only in local data",
                difference.extra_values,
                self._format_value,
            ),
            (
                "missing/changed local hierarchy relations",
                difference.missing_relations,
                self._format_relation,
            ),
            (
                "hierarchy relations only in local data",
                difference.extra_relations,
                self._format_relation,
            ),
        )

        for title, items, formatter in categories:
            if not items:
                continue
            self.stdout.write(f"  {title}: {len(items)}")
            if summary_only or max_details == 0:
                continue
            sorted_items = sorted(items)
            for item in sorted_items[:max_details]:
                self.stdout.write(f"    {formatter(item)}")
            remaining = len(sorted_items) - max_details
            if remaining > 0:
                self.stdout.write(f"    ... and {remaining} more")

    @staticmethod
    def _scheme_label(snapshot, languages):
        preferred = sorted(
            value
            for value_type, language, value in snapshot.values.get(
                snapshot.uri, set()
            )
            if value_type == "prefLabel" and language in languages
        )
        return preferred[0] if preferred else snapshot.uri

    @staticmethod
    def _short_uri(uri):
        return uri.removeprefix(ENTITY_BASE_URL)

    def _format_value(self, item):
        uri, value_type, language, value = item
        language_display = language or "no language"
        return (
            f"{self._short_uri(uri)} {value_type}[{language_display}] = {value!r}"
        )

    def _format_relation(self, item):
        parent_uri, child_uri = item
        return f"{self._short_uri(parent_uri)} -> {self._short_uri(child_uri)}"
