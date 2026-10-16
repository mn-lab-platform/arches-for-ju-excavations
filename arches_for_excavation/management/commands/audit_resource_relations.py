"""Audit resource relations and optionally repair safe missing rows for (O) models."""

from __future__ import annotations

import json
from collections import Counter, defaultdict
from dataclasses import dataclass
from types import SimpleNamespace
from uuid import UUID

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone

from arches.app.models.models import GraphModel, Node, ResourceXResource
from arches.app.models.resource import Resource
from arches.app.models.tile import Tile


RESOURCE_DATATYPES = ("resource-instance", "resource-instance-list")


def normalized_uuid(value):
    try:
        return str(UUID(str(value)))
    except (AttributeError, TypeError, ValueError):
        return ""


def display_name(value):
    if isinstance(value, dict):
        return value.get("en") or next((item for item in value.values() if item), "")
    return str(value or "")


@dataclass(frozen=True)
class ExpectedRelation:
    relation_id: str
    from_resource_id: str
    from_graph_id: str
    to_resource_id: str
    to_graph_id: str
    tile_id: str
    node_id: str
    relationship_type: str
    inverse_relationship_type: str

    def as_model(self, timestamp):
        return ResourceXResource(
            resourcexid=self.relation_id,
            from_resource_id=self.from_resource_id,
            from_resource_graph_id=self.from_graph_id,
            to_resource_id=self.to_resource_id,
            to_resource_graph_id=self.to_graph_id,
            tile_id=self.tile_id,
            node_id=self.node_id,
            relationshiptype=self.relationship_type or None,
            inverserelationshiptype=self.inverse_relationship_type or None,
            created=timestamp,
            modified=timestamp,
        )


def relation_row_issues(expected, row):
    """Return discrepancies between one tile relation and its database row."""
    if row is None:
        return ("missing_row",)

    checks = (
        ("from_resource_mismatch", "from_resource_id", expected.from_resource_id),
        ("from_graph_mismatch", "from_resource_graph_id", expected.from_graph_id),
        ("to_resource_mismatch", "to_resource_id", expected.to_resource_id),
        ("to_graph_mismatch", "to_resource_graph_id", expected.to_graph_id),
        ("tile_mismatch", "tile_id", expected.tile_id),
        ("node_mismatch", "node_id", expected.node_id),
        ("relationship_type_mismatch", "relationshiptype", expected.relationship_type),
        (
            "inverse_relationship_type_mismatch",
            "inverserelationshiptype",
            expected.inverse_relationship_type,
        ),
    )
    return tuple(
        issue
        for issue, attribute, expected_value in checks
        if str(getattr(row, attribute, None) or "") != expected_value
    )


class Command(BaseCommand):
    help = (
        "Audit every resource-instance field. With --apply, create safe missing "
        "resource_x_resource rows only for models whose name starts with '(O)'."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--apply",
            action="store_true",
            help="Create safe missing rows for (O) models after the audit.",
        )
        parser.add_argument(
            "--graph-id",
            type=UUID,
            help="Only scan resources belonging to this graph UUID.",
        )
        parser.add_argument(
            "--resource-id",
            type=UUID,
            help="Only scan this resource UUID.",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=0,
            help="Maximum number of resources to scan (0 means all).",
        )
        parser.add_argument(
            "--verbose",
            action="store_true",
            help="Print every detected problem.",
        )
        parser.add_argument(
            "--json",
            action="store_true",
            dest="as_json",
            help="Print the complete result as JSON.",
        )
        parser.add_argument(
            "--progress-every",
            type=int,
            default=5000,
            help="Print progress after this many tiles (0 disables progress).",
        )

    @staticmethod
    def _configured_graph_ids(node):
        config = node.config or {}
        if isinstance(config, str):
            try:
                config = json.loads(config)
            except (TypeError, ValueError):
                return set()
        return {
            normalized_uuid(item.get("graphid"))
            for item in config.get("graphs", [])
            if isinstance(item, dict) and normalized_uuid(item.get("graphid"))
        }

    def handle(self, *args, **options):
        if options["limit"] < 0:
            raise CommandError("--limit must be non-negative")
        if options["progress_every"] < 0:
            raise CommandError("--progress-every must be non-negative")

        resources = Resource.objects.all().order_by("resourceinstanceid")
        if options["graph_id"]:
            resources = resources.filter(graph_id=options["graph_id"])
        if options["resource_id"]:
            resources = resources.filter(resourceinstanceid=options["resource_id"])
            if not resources.exists():
                raise CommandError("--resource-id does not exist in the selected scope")
        if options["limit"]:
            resources = resources[: options["limit"]]

        resource_graphs = {
            str(resource_id): str(graph_id)
            for resource_id, graph_id in resources.values_list("resourceinstanceid", "graph_id")
        }
        resource_ids = set(resource_graphs)
        if not options["as_json"]:
            mode = "APPLY SAFE (O)" if options["apply"] else "READ-ONLY"
            self.stdout.write(f"Resource relation audit [{mode}]")
            self.stdout.write(f"Resources selected: {len(resource_ids)}")
            self.stdout.write("Loading resource and relation indexes...")
        all_resource_graphs = {
            str(resource_id): str(graph_id)
            for resource_id, graph_id in Resource.objects.values_list("resourceinstanceid", "graph_id")
        }

        nodes = {
            str(node.nodeid): node
            for node in Node.objects.filter(datatype__in=RESOURCE_DATATYPES).select_related("graph")
        }
        graph_names = {
            str(graph_id): display_name(name)
            for graph_id, name in GraphModel.objects.values_list("graphid", "name")
        }

        # Keep a global id index so a scoped audit can recognise a relation
        # UUID copied from another resource instead of calling it missing.
        rows_by_id = {}
        rows_by_scope = defaultdict(list)
        scoped_rows = []
        for row in ResourceXResource.objects.all().iterator(chunk_size=1000):
            row_id = str(row.resourcexid)
            rows_by_id[row_id] = row
            if str(row.from_resource_id) in resource_ids:
                scoped_rows.append(row)
                rows_by_scope[(str(row.tile_id or ""), str(row.node_id or ""))].append(row)

        totals = Counter()
        by_field = defaultdict(Counter)
        details = []
        referenced_row_ids = Counter()
        repair_candidates = []

        def add_issue(issue, tile, node, relation_index=None, relation_id="", target_id=""):
            totals[issue] += 1
            field_key = (str(node.graph_id), str(node.nodeid), display_name(node.name))
            by_field[field_key][issue] += 1
            if options["verbose"] or options["as_json"]:
                details.append(
                    {
                        "issue": issue,
                        "source_resource_id": str(tile.resourceinstance_id),
                        "source_graph_id": str(node.graph_id),
                        "source_graph": graph_names.get(str(node.graph_id), ""),
                        "tile_id": str(tile.tileid),
                        "node_id": str(node.nodeid),
                        "node": display_name(node.name),
                        "relation_index": relation_index,
                        "relation_id": relation_id,
                        "target_resource_id": target_id,
                    }
                )

        # values() is intentional. Arches' Tile constructor loads the serialized
        # graph, which turns a full audit into an N+1 query loop.
        tiles = Tile.objects.filter(resourceinstance_id__in=resource_ids).values(
            "tileid", "resourceinstance_id", "nodegroup_id", "data", "provisionaledits"
        )
        for tile_values in tiles.iterator(chunk_size=2000):
            tile = SimpleNamespace(**tile_values)
            totals["tiles_scanned"] += 1
            progress_every = options["progress_every"]
            if (
                progress_every
                and not options["as_json"]
                and totals["tiles_scanned"] % progress_every == 0
            ):
                current_issue_count = sum(
                    count for counts in by_field.values() for count in counts.values()
                )
                self.stdout.write(
                    f"  scanned {totals['tiles_scanned']} tiles; "
                    f"relations={totals['relations_scanned']}; "
                    f"issues={current_issue_count}"
                )
            data = tile.data or {}
            if not isinstance(data, dict):
                totals["invalid_tile_data"] += 1
                continue

            for node_id in set(data).intersection(nodes):
                node = nodes[node_id]
                values = data.get(node_id)
                totals["relation_fields_scanned"] += 1
                if tile.provisionaledits:
                    totals["fields_with_provisional_edits"] += 1
                if values is None:
                    continue
                if not isinstance(values, list):
                    add_issue("invalid_field_value", tile, node)
                    continue

                configured_graph_ids = self._configured_graph_ids(node)
                seen_targets = set()
                for index, value in enumerate(values):
                    totals["relations_scanned"] += 1
                    if not isinstance(value, dict):
                        add_issue("invalid_relation_value", tile, node, index)
                        continue

                    raw_target_id = value.get("resourceId")
                    target_id = normalized_uuid(raw_target_id)
                    raw_relation_id = value.get("resourceXresourceId")
                    relation_id = normalized_uuid(raw_relation_id)

                    if not target_id:
                        add_issue("missing_or_invalid_target_id", tile, node, index)
                        continue
                    if target_id in seen_targets:
                        add_issue("duplicate_target_in_field", tile, node, index, relation_id, target_id)
                    seen_targets.add(target_id)

                    target_graph_id = all_resource_graphs.get(target_id, "")
                    if not target_graph_id:
                        add_issue("missing_target_resource", tile, node, index, relation_id, target_id)
                    elif configured_graph_ids and target_graph_id not in configured_graph_ids:
                        add_issue("target_graph_not_configured", tile, node, index, relation_id, target_id)

                    if not relation_id:
                        add_issue("missing_or_invalid_relation_id", tile, node, index, "", target_id)
                        matching_rows = [
                            row
                            for row in rows_by_scope.get((str(tile.tileid), node_id), [])
                            if str(row.to_resource_id) == target_id
                        ]
                        if matching_rows:
                            add_issue("matching_row_has_unlinked_id", tile, node, index, "", target_id)
                        continue

                    if referenced_row_ids[relation_id]:
                        add_issue("relation_id_reused_in_tiles", tile, node, index, relation_id, target_id)
                    referenced_row_ids[relation_id] += 1
                    expected = ExpectedRelation(
                        relation_id=relation_id,
                        from_resource_id=str(tile.resourceinstance_id),
                        from_graph_id=resource_graphs[str(tile.resourceinstance_id)],
                        to_resource_id=target_id,
                        to_graph_id=target_graph_id,
                        tile_id=str(tile.tileid),
                        node_id=node_id,
                        relationship_type=str(value.get("ontologyProperty") or ""),
                        inverse_relationship_type=str(value.get("inverseOntologyProperty") or ""),
                    )
                    relation_row = rows_by_id.get(relation_id)
                    for issue in relation_row_issues(expected, relation_row):
                        add_issue(issue, tile, node, index, relation_id, target_id)

                    source_graph_name = graph_names.get(expected.from_graph_id, "").strip()
                    safe_target = bool(target_graph_id) and (
                        not configured_graph_ids or target_graph_id in configured_graph_ids
                    )
                    matching_row = any(
                        str(row.to_resource_id) == target_id
                        for row in rows_by_scope.get((str(tile.tileid), node_id), [])
                    )
                    if (
                        relation_row is None
                        and source_graph_name.startswith("(O)")
                        and safe_target
                        and not tile.provisionaledits
                        and not matching_row
                    ):
                        repair_candidates.append(expected)

        # A relation UUID reused by multiple tile values cannot safely identify
        # either row, so exclude all such candidates from automatic repair.
        pending_repairs = [
            relation
            for relation in repair_candidates
            if referenced_row_ids[relation.relation_id] == 1
        ]
        totals["safe_o_rows_to_create"] = len(pending_repairs)
        totals["unsafe_reused_ids_skipped"] = len(repair_candidates) - len(pending_repairs)
        if options["apply"] and pending_repairs:
            timestamp = timezone.now()
            with transaction.atomic():
                ResourceXResource.objects.bulk_create(
                    [relation.as_model(timestamp) for relation in pending_repairs],
                    batch_size=1000,
                )
            totals["safe_o_rows_created"] = len(pending_repairs)

        # Bound rows should be represented by a relation UUID in their owning tile.
        for row in scoped_rows:
            totals["resource_x_resource_rows_scanned"] += 1
            if not row.tile_id or not row.node_id:
                totals["unbound_rows"] += 1
                continue
            if str(row.node_id) not in nodes:
                totals["rows_for_non_resource_node"] += 1
                continue
            if str(row.resourcexid) not in referenced_row_ids:
                totals["orphan_rows"] += 1
                if options["verbose"] or options["as_json"]:
                    details.append(
                        {
                            "issue": "orphan_row",
                            "source_resource_id": str(row.from_resource_id),
                            "source_graph_id": str(row.from_resource_graph_id or ""),
                            "source_graph": graph_names.get(str(row.from_resource_graph_id or ""), ""),
                            "tile_id": str(row.tile_id),
                            "node_id": str(row.node_id),
                            "node": display_name(nodes[str(row.node_id)].name),
                            "relation_index": None,
                            "relation_id": str(row.resourcexid),
                            "target_resource_id": str(row.to_resource_id),
                        }
                    )

        issue_count = sum(
            count
            for key, count in totals.items()
            if key
            not in {
                "tiles_scanned",
                "relation_fields_scanned",
                "relations_scanned",
                "resource_x_resource_rows_scanned",
                "fields_with_provisional_edits",
                "unbound_rows",
                "safe_o_rows_to_create",
                "safe_o_rows_created",
                "unsafe_reused_ids_skipped",
            }
        )
        result = {
            "read_only": not options["apply"],
            "repair_scope": "safe missing rows in (O) models",
            "resources_scanned": len(resource_ids),
            "summary": dict(sorted(totals.items())),
            "issue_count": issue_count,
            "fields_with_issues": [
                {
                    "graph_id": graph_id,
                    "graph": graph_names.get(graph_id, ""),
                    "node_id": node_id,
                    "node": node_name,
                    "issues": dict(sorted(counts.items())),
                }
                for (graph_id, node_id, node_name), counts in sorted(by_field.items())
            ],
            "details": details,
        }

        if options["as_json"]:
            self.stdout.write(json.dumps(result, ensure_ascii=False, indent=2))
            return

        self.stdout.write(f"Resources scanned: {len(resource_ids)}")
        for key in (
            "tiles_scanned",
            "relation_fields_scanned",
            "relations_scanned",
            "resource_x_resource_rows_scanned",
            "safe_o_rows_to_create",
            "safe_o_rows_created",
            "unsafe_reused_ids_skipped",
        ):
            self.stdout.write(f"{key}: {totals[key]}")
        self.stdout.write(f"Issues found: {issue_count}")

        if by_field:
            self.stdout.write("")
            self.stdout.write("Fields with issues:")
            for (graph_id, node_id, node_name), counts in sorted(by_field.items()):
                model = graph_names.get(graph_id, graph_id)
                summary = ", ".join(f"{key}={value}" for key, value in sorted(counts.items()))
                self.stdout.write(f"  {model} | {node_name} | {node_id}: {summary}")

        other = {
            key: totals[key]
            for key in (
                "orphan_rows",
                "unbound_rows",
                "rows_for_non_resource_node",
                "fields_with_provisional_edits",
                "invalid_tile_data",
            )
            if totals[key]
        }
        if other:
            self.stdout.write("")
            self.stdout.write("Other checks:")
            for key, value in other.items():
                self.stdout.write(f"  {key}: {value}")

        if options["verbose"] and details:
            self.stdout.write("")
            self.stdout.write("Individual problems:")
            for detail in details:
                self.stdout.write(
                    "  {issue}: resource={source_resource_id} tile={tile_id} "
                    "node={node_id} target={target_resource_id} relation={relation_id}".format(
                        **detail
                    )
                )

        self.stdout.write("")
        if options["apply"]:
            self.stdout.write(
                f"Created {totals['safe_o_rows_created']} safe resource_x_resource rows for (O) models."
            )
        else:
            self.stdout.write(
                "No data was changed. Add --apply to create safe missing rows for (O) models. "
                "Use --verbose for individual records or --json for structured output."
            )
