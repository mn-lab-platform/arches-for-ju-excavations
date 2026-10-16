from collections import Counter
from contextlib import nullcontext

from django.core.management.base import CommandError
from django.db import transaction

from arches.app.models.models import Node, Resource, ResourceXResource
from arches.app.models.tile import Tile

from .link_context_media_resources import Command as ResourceRelationCommand


O_CONTEXT_GRAPH_ID = "2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c"
HARRIS_NODE_IDS = (
    "2510dc70-b915-4677-86ba-3e3297134ce7",  # above
    "26ed0689-b697-4f7d-87fd-d76f4bf21b92",  # same level
    "1a86987c-f436-41f7-a8d8-2742f58b0616",  # below
)


class Command(ResourceRelationCommand):
    help = "Rewrites migrated (O) Context Harris relations to migrated (O) Context resources."

    def add_arguments(self, parser):
        parser.add_argument("--apply", action="store_true", default=False)
        parser.add_argument("--limit", type=int, default=0)
        parser.add_argument("--verbose", action="store_true", default=False)

    def handle(self, *args, **options):
        do_apply = options["apply"]
        limit = options["limit"]
        verbose = options["verbose"]

        nodes = {
            node_id: Node.objects.filter(nodeid=node_id, graph_id=O_CONTEXT_GRAPH_ID).first()
            for node_id in HARRIS_NODE_IDS
        }
        missing_nodes = [node_id for node_id, node in nodes.items() if node is None]
        if missing_nodes:
            raise CommandError("Missing (O) Context Harris nodes: " + ", ".join(missing_nodes))

        contexts_by_legacy_id = {}
        duplicate_legacy_ids = set()
        contexts = Resource.objects.filter(graph_id=O_CONTEXT_GRAPH_ID).exclude(legacyid__isnull=True)
        for context in contexts:
            legacy_id = str(context.legacyid or "").strip()
            if not legacy_id:
                continue
            if legacy_id in contexts_by_legacy_id:
                duplicate_legacy_ids.add(legacy_id)
            contexts_by_legacy_id[legacy_id] = context
        if duplicate_legacy_ids:
            raise CommandError("Duplicate migrated Context legacyids: " + ", ".join(sorted(duplicate_legacy_ids)))
        if not contexts_by_legacy_id:
            raise CommandError("No migrated (O) Context resources with legacyid were found.")

        migrated_context_ids = [
            context.resourceinstanceid for context in contexts_by_legacy_id.values()
        ]
        migrated_context_id_set = {str(resource_id) for resource_id in migrated_context_ids}
        if limit:
            migrated_context_ids = migrated_context_ids[:limit]

        self.stdout.write("Mode: APPLY" if do_apply else "Mode: DRY-RUN")
        self.stdout.write(f"Migrated (O) Context resources scanned: {len(migrated_context_ids)}")

        totals = Counter()
        pending = []
        tiles = Tile.objects.filter(
            resourceinstance_id__in=migrated_context_ids,
            data__has_any_keys=list(HARRIS_NODE_IDS),
        )
        for tile in tiles.iterator(chunk_size=200):
            for node_id, node in nodes.items():
                relations = (tile.data or {}).get(node_id)
                if relations in (None, "", []):
                    continue
                if not isinstance(relations, list):
                    totals["invalid_relation_values"] += 1
                    continue

                rewritten = []
                seen_resource_ids = set()
                changed = False
                for relation in relations:
                    if not isinstance(relation, dict):
                        rewritten.append(relation)
                        totals["invalid_relation_values"] += 1
                        continue
                    updated = dict(relation)
                    old_resource_id = str(relation.get("resourceId") or "")
                    target = contexts_by_legacy_id.get(old_resource_id)
                    if target:
                        updated["resourceId"] = str(target.resourceinstanceid)
                        changed = True
                        totals["relations_rewritten"] += 1
                    elif old_resource_id in migrated_context_id_set:
                        totals["already_migrated_relations"] += 1
                    else:
                        totals["missing_target_context"] += 1

                    resource_id = updated.get("resourceId")
                    if resource_id and resource_id in seen_resource_ids:
                        changed = True
                        totals["duplicates_removed"] += 1
                        continue
                    if resource_id:
                        seen_resource_ids.add(resource_id)
                    rewritten.append(updated)

                if changed:
                    pending.append((tile, node, node_id, rewritten))

        totals["tiles_to_update"] = len(pending)
        ctx = transaction.atomic() if do_apply else nullcontext()
        with ctx:
            for tile, node, node_id, relations in pending:
                if not do_apply:
                    continue
                tile.data[node_id] = relations
                tile.save()

                preserved_relation_ids = []
                for relation in relations:
                    if not isinstance(relation, dict) or not relation.get("resourceId"):
                        continue
                    # An orphan relation can share a tile with a relation that
                    # is safe to rewrite. Preserve it unchanged and, crucially,
                    # do not attempt to load a target Resource that is absent.
                    if str(relation["resourceId"]) not in migrated_context_id_set:
                        if relation.get("resourceXresourceId"):
                            preserved_relation_ids.append(relation["resourceXresourceId"])
                        totals["relations_skipped"] += 1
                        continue
                    self._sync_resource_x_resource(
                        media_resource=tile.resourceinstance,
                        context_resource_id=relation["resourceId"],
                        tile=tile,
                        node=node,
                        relation=relation,
                    )
                    if relation.get("resourceXresourceId"):
                        preserved_relation_ids.append(relation["resourceXresourceId"])

                stale_relations = ResourceXResource.objects.filter(
                    from_resource=tile.resourceinstance,
                    tile=tile,
                    node=node,
                )
                if preserved_relation_ids:
                    stale_relations = stale_relations.exclude(resourcexid__in=preserved_relation_ids)
                totals["stale_rows_removed"] += stale_relations.count()
                stale_relations.delete()
                totals["tiles_updated"] += 1

        self.stdout.write("Summary")
        for key in (
            "relations_rewritten",
            "already_migrated_relations",
            "missing_target_context",
            "relations_skipped",
            "duplicates_removed",
            "invalid_relation_values",
            "tiles_to_update",
            "tiles_updated",
            "stale_rows_removed",
        ):
            self.stdout.write(f"  {key}: {totals[key]}")
        if not do_apply:
            self.stdout.write("Dry-run only. Add --apply after the Context migration.")
