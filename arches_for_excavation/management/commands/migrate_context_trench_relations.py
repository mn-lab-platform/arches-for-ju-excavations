from collections import Counter
from contextlib import nullcontext

from django.core.management.base import CommandError
from django.db import transaction

from arches.app.models.models import Node, ResourceXResource
from arches.app.models.resource import Resource
from arches.app.models.tile import Tile

from .link_context_media_resources import Command as ResourceRelationCommand


O_CONTEXT_GRAPH_ID = "2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c"
O_CONTEXT_TRENCH_NODE_ID = "13e52ba6-b14d-41de-9a09-8bd1186edc10"
O_TRENCH_GRAPH_ID = "cc91f1ff-6ea8-422c-be14-b818660f66f8"


class Command(ResourceRelationCommand):
    help = (
        "Rewrite Trench relations on migrated (O) Context resources from old "
        "Trench ids to matching (O) Trench resources using legacyid."
    )

    def add_arguments(self, parser):
        parser.add_argument("--apply", action="store_true", default=False)
        parser.add_argument("--limit", type=int, default=0)
        parser.add_argument("--verbose", action="store_true", default=False)

    def handle(self, *args, **options):
        do_apply = options["apply"]
        limit = options["limit"]
        verbose = options["verbose"]

        self._validate_node(
            O_CONTEXT_TRENCH_NODE_ID,
            O_CONTEXT_GRAPH_ID,
            "(O) Context Trench",
        )

        trenches_by_legacy_id = {}
        duplicate_legacy_ids = set()
        trenches = Resource.objects.filter(graph_id=O_TRENCH_GRAPH_ID).exclude(
            legacyid__isnull=True
        )
        for trench in trenches:
            legacy_id = str(trench.legacyid or "").strip()
            if not legacy_id:
                continue
            if legacy_id in trenches_by_legacy_id:
                duplicate_legacy_ids.add(legacy_id)
            trenches_by_legacy_id[legacy_id] = trench

        if duplicate_legacy_ids:
            raise CommandError(
                "Duplicate (O) Trench legacyid values: "
                + ", ".join(sorted(duplicate_legacy_ids))
            )
        if not trenches_by_legacy_id:
            raise CommandError("No migrated (O) Trench resources with legacyid were found.")

        new_trench_ids = {
            str(trench.resourceinstanceid)
            for trench in trenches_by_legacy_id.values()
        }
        contexts = Resource.objects.filter(graph_id=O_CONTEXT_GRAPH_ID).order_by(
            "resourceinstanceid"
        )
        if limit:
            contexts = contexts[:limit]
        context_ids = list(contexts.values_list("resourceinstanceid", flat=True))

        mode = "APPLY" if do_apply else "DRY-RUN"
        self.stdout.write(f"Migrated (O) Context/Trench relation rewrite [{mode}]")
        self.stdout.write(f"Migrated (O) Trench resources: {len(trenches_by_legacy_id)}")
        self.stdout.write(f"(O) Context resources scanned: {len(context_ids)}")

        totals = Counter()
        pending = []
        tiles = Tile.objects.filter(
            resourceinstance_id__in=context_ids,
            data__has_key=O_CONTEXT_TRENCH_NODE_ID,
        )

        for tile in tiles.iterator(chunk_size=200):
            relation_values = (tile.data or {}).get(O_CONTEXT_TRENCH_NODE_ID)
            if not isinstance(relation_values, list):
                totals["invalid_relation_values"] += 1
                continue

            converted_values = []
            seen_resource_ids = set()
            tile_changed = False

            for relation in relation_values:
                if not isinstance(relation, dict):
                    converted_values.append(relation)
                    continue

                converted = dict(relation)
                related_resource_id = str(relation.get("resourceId") or "")
                target_trench = trenches_by_legacy_id.get(related_resource_id)

                if target_trench:
                    new_trench_id = str(target_trench.resourceinstanceid)
                    converted["resourceId"] = new_trench_id
                    tile_changed = True
                    totals["relations_rewritten"] += 1
                    if verbose:
                        self.stdout.write(
                            f"  (O) Context {tile.resourceinstance_id}: "
                            f"{related_resource_id} -> {new_trench_id}"
                        )
                elif related_resource_id in new_trench_ids:
                    totals["already_migrated_relations"] += 1
                else:
                    totals["missing_target_trench"] += 1
                    if verbose:
                        self.stdout.write(
                            f"  MISSING (O) Trench for {related_resource_id} "
                            f"on Context {tile.resourceinstance_id}"
                        )

                converted_resource_id = converted.get("resourceId")
                if converted_resource_id and converted_resource_id in seen_resource_ids:
                    tile_changed = True
                    totals["duplicates_removed"] += 1
                    continue
                if converted_resource_id:
                    seen_resource_ids.add(converted_resource_id)
                converted_values.append(converted)

            if tile_changed:
                pending.append((tile, converted_values))

        totals["tiles_to_update"] = len(pending)
        ctx = transaction.atomic() if do_apply else nullcontext()
        with ctx:
            node = Node.objects.get(nodeid=O_CONTEXT_TRENCH_NODE_ID)
            for tile, relation_values in pending:
                if not do_apply:
                    continue

                tile.data[O_CONTEXT_TRENCH_NODE_ID] = relation_values
                tile.save()

                valid_relation_ids = []
                for relation in relation_values:
                    if not isinstance(relation, dict) or not relation.get("resourceId"):
                        continue
                    self._sync_resource_x_resource(
                        media_resource=tile.resourceinstance,
                        context_resource_id=relation["resourceId"],
                        tile=tile,
                        node=node,
                        relation=relation,
                    )
                    if relation.get("resourceXresourceId"):
                        valid_relation_ids.append(relation["resourceXresourceId"])

                stale_relations = ResourceXResource.objects.filter(
                    from_resource=tile.resourceinstance,
                    tile=tile,
                    node=node,
                )
                if valid_relation_ids:
                    stale_relations = stale_relations.exclude(
                        resourcexid__in=valid_relation_ids
                    )
                totals["stale_rows_removed"] += stale_relations.count()
                stale_relations.delete()

                tile.save()
                totals["tiles_updated"] += 1

        self.stdout.write("")
        self.stdout.write("Summary:")
        for key in (
            "relations_rewritten",
            "already_migrated_relations",
            "missing_target_trench",
            "duplicates_removed",
            "invalid_relation_values",
            "tiles_to_update",
            "tiles_updated",
            "stale_rows_removed",
        ):
            self.stdout.write(f"  {key}: {totals[key]}")

        if not do_apply:
            self.stdout.write("")
            self.stdout.write("Dry-run only. Add --apply to rewrite the relations.")
