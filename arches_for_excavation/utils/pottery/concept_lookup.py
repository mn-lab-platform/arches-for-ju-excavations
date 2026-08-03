import json
import re
from collections import Counter
from dataclasses import dataclass
from functools import lru_cache
from uuid import UUID

import requests
from arches.app.models.models import Concept, Node, Relation, Value

from arches_slocal.utils.pottery.common import clean_cell


LABEL_VALUE_TYPES = ("prefLabel", "altLabel", "hiddenLabel")
PAC_SPARQL_ENDPOINT = "https://pac.cenagis.edu.pl/wiki/sparql"
PAC_CHRONOLOGY_SCHEME_LEGACYOID = "https://pac.cenagis.edu.pl/entity/Q454"
PAC_ENTITY_BASE_URL = "https://pac.cenagis.edu.pl/entity/"
PAC_REQUEST_TIMEOUT_SECONDS = 10


@dataclass(frozen=True)
class DictionaryIndex:
    dictionary: str
    concept_id: str
    legacyoid: str
    values_by_label: dict
    value_ids: frozenset
    ambiguous_labels: frozenset


def normalize_dictionary_label(value):
    return re.sub(r"\s+", " ", clean_cell(value)).casefold()


def is_uuid(value):
    try:
        UUID(clean_cell(value))
    except (TypeError, ValueError):
        return False

    return True


def apply_dictionary_alias(field, value, aliases):
    raw = clean_cell(value)
    normalized = normalize_dictionary_label(raw)

    for alias, canonical in aliases.get(field, {}).items():
        if normalize_dictionary_label(alias) == normalized:
            return clean_cell(canonical)

    return raw


def _get_concept_by_id(concept_id):
    try:
        return Concept.objects.get(conceptid=concept_id)
    except (Concept.DoesNotExist, ValueError):
        return None


def _get_concept_by_label(label, nodetype):
    normalized_label = normalize_dictionary_label(label)

    for value in Value.objects.filter(
        valuetype_id="prefLabel",
        concept__nodetype_id=nodetype,
    ).select_related("concept"):
        if normalize_dictionary_label(value.value) == normalized_label:
            return value.concept

    return None


def _resolve_dictionary_concept(dictionary):
    dictionary = clean_cell(dictionary)

    if is_uuid(dictionary):
        return _get_concept_by_id(dictionary)

    # PAC concept UUIDs are generated during the RDF import and therefore are
    # not stable between databases. The PAC entity URL (for example Q454 for
    # chronology) is stable and is stored as ``legacyoid`` on the imported
    # ConceptScheme, so allow dictionaries to be configured with that URL.
    concept = Concept.objects.filter(legacyoid=dictionary).first()
    if concept:
        return concept

    collection = _get_concept_by_label(dictionary, "Collection")
    if collection:
        return collection

    return _get_concept_by_label(dictionary, "Concept")


def _get_descendant_concept_ids(root_id):
    descendants = set()
    frontier = {root_id}

    while frontier:
        child_ids = {
            str(concept_id)
            for concept_id in Relation.objects.filter(
                conceptfrom_id__in=frontier,
                relationtype_id="narrower",
            ).values_list("conceptto_id", flat=True)
        }
        child_ids -= descendants
        descendants.update(child_ids)
        frontier = child_ids

    return descendants


def _get_dictionary_concept_ids(dictionary_concept):
    dictionary_concept_id = str(dictionary_concept.conceptid)

    if str(dictionary_concept.nodetype_id) == "Collection":
        member_ids = {
            str(concept_id)
            for concept_id in Relation.objects.filter(
                conceptfrom_id=dictionary_concept_id,
                relationtype_id="member",
            ).values_list("conceptto_id", flat=True)
        }

        concept_ids = set(member_ids)
        for member_id in member_ids:
            concept_ids.update(_get_descendant_concept_ids(member_id))

        return concept_ids

    if str(dictionary_concept.nodetype_id) == "ConceptScheme":
        top_concept_ids = {
            str(concept_id)
            for concept_id in Relation.objects.filter(
                conceptfrom_id=dictionary_concept_id,
                relationtype_id="hasTopConcept",
            ).values_list("conceptto_id", flat=True)
        }

        concept_ids = set(top_concept_ids)
        for concept_id in top_concept_ids:
            concept_ids.update(_get_descendant_concept_ids(concept_id))

        return concept_ids

    return _get_descendant_concept_ids(dictionary_concept_id)


def _get_preferred_value_ids(concept_ids):
    preferred = {}

    for value in Value.objects.filter(
        concept_id__in=concept_ids,
        valuetype_id="prefLabel",
    ).order_by("concept_id", "language_id"):
        concept_id = str(value.concept_id)
        current = preferred.get(concept_id)

        if current is None or value.language_id == "en":
            preferred[concept_id] = str(value.valueid)

    return preferred


@lru_cache(maxsize=256)
def _find_pac_chronology_qid(label):
    """Find one PAC chronology concept whose alternative label is ``label``."""
    normalized_label = clean_cell(label)
    if not normalized_label:
        return ""

    # json.dumps creates a safe SPARQL string literal, including quotes and
    # backslashes that could otherwise change the query.
    sparql_literal = json.dumps(normalized_label)
    query = f"""
PREFIX wd: <https://pac.cenagis.edu.pl/entity/>
PREFIX wdt: <https://pac.cenagis.edu.pl/prop/direct/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT DISTINCT ?concept WHERE {{
  ?concept skos:altLabel ?alternative_label .
  FILTER(LCASE(STR(?alternative_label)) = LCASE({sparql_literal}))
  ?concept wdt:P20* wd:Q454 .
}}
LIMIT 2
""".strip()

    response = requests.get(
        PAC_SPARQL_ENDPOINT,
        params={"query": query},
        headers={"Accept": "application/sparql-results+json"},
        timeout=PAC_REQUEST_TIMEOUT_SECONDS,
    )
    response.raise_for_status()

    bindings = response.json().get("results", {}).get("bindings", [])
    if len(bindings) != 1:
        return ""

    concept_url = bindings[0].get("concept", {}).get("value", "")
    match = re.fullmatch(r"https://pac\.cenagis\.edu\.pl/entity/(Q\d+)", concept_url)
    return match.group(1) if match else ""


def _local_value_id_for_pac_qid(period_id, allowed_value_ids):
    """Return the English preferred Arches value for a PAC Q identifier."""
    values = Value.objects.filter(
        concept__legacyoid=f"{PAC_ENTITY_BASE_URL}{period_id}",
        valuetype_id="prefLabel",
    ).order_by("language_id")

    for value in values:
        value_id = str(value.valueid)
        if value_id in allowed_value_ids and value.language_id == "en":
            return value_id

    for value in values:
        value_id = str(value.valueid)
        if value_id in allowed_value_ids:
            return value_id

    return ""


@lru_cache(maxsize=64)
def get_dictionary_index(dictionary):
    dictionary_concept = _resolve_dictionary_concept(dictionary)

    if not dictionary_concept:
        return DictionaryIndex(
            dictionary=dictionary,
            concept_id="",
            legacyoid="",
            values_by_label={},
            value_ids=frozenset(),
            ambiguous_labels=frozenset(),
        )

    concept_ids = _get_dictionary_concept_ids(dictionary_concept)
    preferred_value_ids = _get_preferred_value_ids(concept_ids)
    values_by_label = {}
    ambiguous_labels = set()

    for value in Value.objects.filter(
        concept_id__in=concept_ids,
        valuetype_id__in=LABEL_VALUE_TYPES,
    ):
        concept_id = str(value.concept_id)
        preferred_value_id = preferred_value_ids.get(concept_id)

        if not preferred_value_id:
            continue

        normalized_label = normalize_dictionary_label(value.value)
        existing_value_id = values_by_label.get(normalized_label)

        if existing_value_id and existing_value_id != preferred_value_id:
            ambiguous_labels.add(normalized_label)
            continue

        values_by_label[normalized_label] = preferred_value_id

    for label in ambiguous_labels:
        values_by_label.pop(label, None)

    return DictionaryIndex(
        dictionary=dictionary,
        concept_id=str(dictionary_concept.conceptid),
        legacyoid=dictionary_concept.legacyoid or "",
        values_by_label=values_by_label,
        value_ids=frozenset(values_by_label.values()),
        ambiguous_labels=frozenset(ambiguous_labels),
    )


def resolve_dictionary_value(dictionary, value):
    raw = clean_cell(value)

    if not raw:
        return ""

    dictionary_index = get_dictionary_index(dictionary)

    if is_uuid(raw):
        value_id = str(UUID(raw))
        if value_id in dictionary_index.value_ids:
            return value_id

    local_value_id = dictionary_index.values_by_label.get(
        normalize_dictionary_label(raw),
        "",
    )
    if local_value_id:
        return local_value_id

    # The PAC RDF import used here contains the preferred labels but may not
    # include its skos:altLabel values. Excel files can therefore use e.g.
    # "MH", while Arches still stores the canonical "Middle Hellenistic".
    if dictionary_index.legacyoid != PAC_CHRONOLOGY_SCHEME_LEGACYOID:
        return ""

    try:
        pac_qid = _find_pac_chronology_qid(raw)
    except requests.RequestException:
        return ""

    if not pac_qid:
        return ""

    return _local_value_id_for_pac_qid(
        pac_qid,
        dictionary_index.value_ids,
    )


def get_dictionary_options(dictionary):
    dictionary_concept = _resolve_dictionary_concept(dictionary)

    if not dictionary_concept:
        return []

    concept_ids = _get_dictionary_concept_ids(dictionary_concept)
    values = (
        Value.objects.filter(
            concept_id__in=concept_ids,
            valuetype_id="prefLabel",
        )
        .order_by("value")
    )

    options_by_concept = {}
    for value in values:
        concept_id = str(value.concept_id)
        current = options_by_concept.get(concept_id)

        if current is None or value.language_id == "en":
            options_by_concept[concept_id] = {
                "valueId": str(value.valueid),
                "conceptId": concept_id,
                "label": clean_cell(value.value),
            }

    return sorted(
        options_by_concept.values(),
        key=lambda option: normalize_dictionary_label(option["label"]),
    )


def validate_and_prepare_dictionary_records(record_config, records):
    dictionary_fields = record_config.get("dictionary_fields", {})
    aliases = record_config.get("dictionary_aliases", {})
    dictionary_required = record_config.get("dictionary_required", True)
    missing_counter = Counter()
    prepared_records = []

    for record in records:
        prepared_record = dict(record)

        for field, dictionary in dictionary_fields.items():
            raw_value = clean_cell(record.get(field))

            if not raw_value:
                continue

            canonical_value = apply_dictionary_alias(field, raw_value, aliases)
            value_id = resolve_dictionary_value(dictionary, canonical_value)

            if value_id:
                prepared_record[field] = value_id
            elif dictionary_required:
                missing_counter[(field, dictionary, canonical_value)] += 1

        prepared_records.append(prepared_record)

    missing_values = [
        {
            "field": field,
            "dictionary": dictionary,
            "value": value,
            "count": count,
        }
        for (field, dictionary, value), count in sorted(missing_counter.items())
    ]

    return prepared_records, missing_values


@lru_cache(maxsize=256)
def get_node_datatype(node_id):
    return Node.objects.get(nodeid=node_id).datatype


def format_concept_tile_value(node_id, value_id):
    value_id = clean_cell(value_id)

    if not value_id:
        return ""

    if get_node_datatype(node_id) == "concept-list":
        return [value_id]

    return value_id


def get_dictionary_node_ids(record_config):
    node_ids = {}

    if "potteryType" in record_config.get("dictionary_fields", {}):
        node_ids["potteryType"] = record_config.get("pottery_type_node_id")

    for field, node_id in record_config.get("fields", {}).items():
        if field in record_config.get("dictionary_fields", {}):
            node_ids[field] = node_id

    return node_ids


def get_invalid_dictionary_nodes(record_config):
    invalid_nodes = []

    for field, node_id in get_dictionary_node_ids(record_config).items():
        datatype = get_node_datatype(node_id)

        if datatype not in ("concept", "concept-list"):
            invalid_nodes.append(
                {
                    "field": field,
                    "nodeId": node_id,
                    "datatype": datatype,
                }
            )

    return invalid_nodes
