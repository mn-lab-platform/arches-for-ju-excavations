"""Repair Trench/Context links on (O) Special find; dry-run unless --apply."""

from collections import Counter
from contextlib import nullcontext
from copy import deepcopy
from uuid import UUID, uuid4

from django.core.management.base import CommandError
from django.db import transaction

from arches.app.models.models import Node, ResourceXResource
from arches.app.models.resource import Resource
from arches.app.models.tile import Tile

from .link_context_media_resources import Command as ResourceRelationCommand


SPECIAL_FIND_GRAPH_ID = "ac939663-80ce-43df-967d-42def45ef333"
RELATIONS = {
    "trench": ("a0d4f084-67f2-4c31-919e-5e55f5852490", "cc91f1ff-6ea8-422c-be14-b818660f66f8"),
    "context": ("ebbcb9f7-e515-4a01-a6f3-610bad9dd13f", "2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c"),
}


class Command(ResourceRelationCommand):
    help = (
        "Repair Trench ID and Context ID relations on (O) Special find: remap "
        "legacy targets and synchronize resource_x_resource. Dry-run by default."
    )

    def add_arguments(self, parser):
        parser.add_argument("--apply", action="store_true")
        parser.add_argument("--limit", type=int, default=0, help="Maximum number of Special Finds to scan.")
        parser.add_argument("--resource-id", type=UUID, help="Scan a single (O) Special find UUID.")
        parser.add_argument("--relation", choices=("all", *RELATIONS), default="all")
        parser.add_argument("--verbose", action="store_true")
        parser.add_argument("--skip-index", action="store_true", help="Skip reindexing repaired resources after commit.")

    @staticmethod
    def _uuid(value):
        try:
            return str(UUID(str(value)))
        except (ValueError, TypeError, AttributeError):
            return None

    def _targets(self, graph_id):
        current_ids, legacy_ids = set(), {}
        for resource_id, legacy_id in Resource.objects.filter(graph_id=graph_id).values_list(
            "resourceinstanceid", "legacyid"
        ):
            resource_id = str(resource_id)
            current_ids.add(resource_id)
            legacy_id = self._uuid(legacy_id)
            if legacy_id:
                if legacy_id in legacy_ids:
                    raise CommandError(f"Ambiguous legacyid {legacy_id} in target graph {graph_id}")
                legacy_ids[legacy_id] = resource_id
        return current_ids, legacy_ids

    def _plan_tile(self, tile, node, current_ids, legacy_ids, totals):
        node_id = str(node.nodeid)
        original = (tile.data or {}).get(node_id)
        if original is None:
            return None
        if not isinstance(original, list):
            totals["invalid_tiles"] += 1
            return None
        if tile.provisionaledits:
            totals["provisional_tiles_skipped"] += 1
            return None

        converted, seen = [], set()
        local_totals = Counter()
        for value in original:
            if not isinstance(value, dict):
                totals["invalid_tiles"] += 1
                return None
            target_id = self._uuid(value.get("resourceId"))
            if target_id not in current_ids:
                target_id = legacy_ids.get(target_id)
            if not target_id:
                # Do not partially repair a field or delete rows for unresolved data.
                totals["unresolved_tiles"] += 1
                return None
            if target_id in seen:
                local_totals["duplicates_removed"] += 1
                continue
            seen.add(target_id)
            relation = dict(value, resourceId=target_id)
            if relation["resourceId"] != value.get("resourceId"):
                local_totals["relations_rewritten"] += 1

            # Never reuse a copied UUID owned by an old resource/tile/node.
            row_id = self._uuid(relation.get("resourceXresourceId"))
            row = ResourceXResource.objects.filter(resourcexid=row_id).first() if row_id else None
            if row and not (
                str(row.from_resource_id) == str(tile.resourceinstance_id)
                and str(row.tile_id) == str(tile.tileid)
                and str(row.node_id) == node_id
                and str(row.to_resource_id) == target_id
            ):
                local_totals["foreign_relation_ids_replaced"] += 1
                row = None
            if row is None:
                row = ResourceXResource.objects.filter(
                    from_resource_id=tile.resourceinstance_id,
                    to_resource_id=target_id, tile=tile, node=node,
                ).first()
            relation["resourceXresourceId"] = str(row.resourcexid) if row else str(uuid4())
            expected = {
                "from_resource_graph_id": SPECIAL_FIND_GRAPH_ID,
                "to_resource_graph_id": str(next(g for n, g in RELATIONS.values() if n == node_id)),
                "relationshiptype": relation.get("ontologyProperty") or "",
                "inverserelationshiptype": relation.get("inverseOntologyProperty") or "",
            }
            if row is None or any(str(getattr(row, key) or "") != val for key, val in expected.items()):
                local_totals["resource_x_resource_to_sync"] += 1
            converted.append(relation)

        keep_ids = [value["resourceXresourceId"] for value in converted]
        stale = ResourceXResource.objects.filter(
            from_resource_id=tile.resourceinstance_id, tile=tile, node=node,
        ).exclude(resourcexid__in=keep_ids)
        local_totals["stale_rows_to_remove"] = stale.count()
        totals.update(local_totals)
        totals["relations_scanned"] += len(original)
        if converted != original or local_totals["resource_x_resource_to_sync"] or local_totals["stale_rows_to_remove"]:
            return converted
        return None

    def handle(self, *args, **options):
        if options["limit"] < 0:
            raise CommandError("--limit must be non-negative")
        selected = RELATIONS if options["relation"] == "all" else {
            options["relation"]: RELATIONS[options["relation"]]
        }
        nodes = {}
        for label, (node_id, graph_id) in selected.items():
            self._validate_node(node_id, SPECIAL_FIND_GRAPH_ID, f"(O) Special find {label}")
            node = Node.objects.get(nodeid=node_id)
            if node.datatype not in ("resource-instance", "resource-instance-list"):
                raise CommandError(f"Unexpected datatype for {label}: {node.datatype}")
            nodes[label] = (node, *self._targets(graph_id))

        resources = Resource.objects.filter(graph_id=SPECIAL_FIND_GRAPH_ID).order_by("resourceinstanceid")
        if options["resource_id"]:
            resources = resources.filter(resourceinstanceid=options["resource_id"])
            if not resources.exists():
                raise CommandError("--resource-id is not an (O) Special find")
        if options["limit"]:
            resources = resources[:options["limit"]]
        resource_ids = list(resources.values_list("resourceinstanceid", flat=True))
        do_apply = options["apply"]
        self.stdout.write(f"(O) Special find relations [{'APPLY' if do_apply else 'DRY-RUN'}]")
        self.stdout.write(f"Resources scanned: {len(resource_ids)}")
        totals, affected = Counter(), set()
        with transaction.atomic() if do_apply else nullcontext():
            for label, (node, current_ids, legacy_ids) in nodes.items():
                tiles = Tile.objects.filter(
                    resourceinstance_id__in=resource_ids,
                    nodegroup_id=node.nodegroup_id,
                    data__has_key=str(node.nodeid),
                ).order_by("tileid")
                if do_apply:
                    tiles = tiles.select_for_update()
                for tile in tiles.iterator(chunk_size=200):
                    values = self._plan_tile(tile, node, current_ids, legacy_ids, totals)
                    if values is None:
                        continue
                    totals["tiles_to_update"] += 1
                    if options["verbose"]:
                        self.stdout.write(f"  {label}: resource={tile.resourceinstance_id} tile={tile.tileid}")
                    if not do_apply:
                        continue
                    for relation in values:
                        self._sync_resource_x_resource(
                            media_resource=tile.resourceinstance,
                            context_resource_id=relation["resourceId"],
                            tile=tile, node=node, relation=relation,
                        )
                    ResourceXResource.objects.filter(
                        from_resource_id=tile.resourceinstance_id, tile=tile, node=node,
                    ).exclude(resourcexid__in=[r["resourceXresourceId"] for r in values]).delete()
                    data = deepcopy(tile.data)
                    data[str(node.nodeid)] = values
                    # Relations are synchronized explicitly. Avoid Tile.save hooks
                    # modifying unrelated fields (e.g. CRS) in this shared tile.
                    Tile.objects.filter(tileid=tile.tileid).update(data=data)
                    affected.add(tile.resourceinstance_id)
                    totals["tiles_updated"] += 1

        self.stdout.write("Summary:")
        for key in ("relations_scanned", "relations_rewritten", "resource_x_resource_to_sync",
                    "foreign_relation_ids_replaced", "duplicates_removed", "stale_rows_to_remove",
                    "invalid_tiles", "unresolved_tiles", "provisional_tiles_skipped",
                    "tiles_to_update", "tiles_updated"):
            self.stdout.write(f"  {key}: {totals[key]}")
        if do_apply and not options["skip_index"]:
            self.stdout.write(f"Database committed. Reindexing {len(affected)} Special Finds...")
            for resource in Resource.objects.filter(resourceinstanceid__in=affected):
                try:
                    resource.index()
                except Exception as exc:
                    raise CommandError(
                        f"Database repair committed; indexing failed for {resource.pk}. "
                        "Run es index_resources to refresh the search index."
                    ) from exc
        elif not do_apply:
            self.stdout.write("Dry-run only. Add --apply to repair relations.")
