from collections import Counter
from contextlib import nullcontext

from django.core.management.base import CommandError
from django.db import transaction

from arches.app.models.models import Node, ResourceXResource
from arches.app.models.resource import Resource
from arches.app.models.tile import Tile

from .link_context_media_resources import Command as ContextMediaLinkCommand


O_CONTEXT_GRAPH_ID = "2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c"

MEDIA_CONFIGS = {
    "iiif": {
        "label": "(O) Digital Resource IIIF",
        "graph_id": "f1b9e37a-c3ba-4c26-a797-7f16302c031c",
        "related_node_id": "8bedf116-657a-4eb5-af06-b4de29839966",
    },
    "3d": {
        "label": "(O) Digital Resource 3D",
        "graph_id": "039f5a45-82e2-4597-8609-d24c758bfd59",
        "related_node_id": "f67c4c42-fe0e-489b-9af7-58405ad7c65f",
    },
}


class Command(ContextMediaLinkCommand):
    help = (
        "Rewrite relations on migrated (O) IIIF/3D resources from old Context ids "
        "to matching (O) Context resources using legacyid."
    )

    def add_arguments(self, parser):
        parser.add_argument("--apply", action="store_true", default=False)
        parser.add_argument(
            "--media-type", choices=("all", "iiif", "3d"), default="all"
        )
        parser.add_argument("--limit", type=int, default=0)
        parser.add_argument("--verbose", action="store_true", default=False)

    def handle(self, *args, **options):
        do_apply = options["apply"]
        media_type = options["media_type"]
        limit = options["limit"]
        verbose = options["verbose"]

        contexts_by_legacy_id = {}
        duplicate_legacy_ids = set()
        contexts = Resource.objects.filter(graph_id=O_CONTEXT_GRAPH_ID).exclude(
            legacyid__isnull=True
        )
        for context in contexts:
            legacy_id = str(context.legacyid or "").strip()
            if not legacy_id:
                continue
            if legacy_id in contexts_by_legacy_id:
                duplicate_legacy_ids.add(legacy_id)
            contexts_by_legacy_id[legacy_id] = context

        if duplicate_legacy_ids:
            raise CommandError(
                "Duplicate (O) Context legacyid values: "
                + ", ".join(sorted(duplicate_legacy_ids))
            )
        if not contexts_by_legacy_id:
            raise CommandError("No migrated (O) Context resources with legacyid were found.")

        new_context_ids = {
            str(context.resourceinstanceid)
            for context in contexts_by_legacy_id.values()
        }
        selected_configs = {
            key: config
            for key, config in MEDIA_CONFIGS.items()
            if media_type == "all" or media_type == key
        }
        for config in selected_configs.values():
            self._validate_node(
                config["related_node_id"],
                config["graph_id"],
                f"{config['label']} related resource",
            )

        mode = "APPLY" if do_apply else "DRY-RUN"
        self.stdout.write(f"Migrated Context/media relation rewrite [{mode}]")
        self.stdout.write(f"Migrated (O) Context resources: {len(contexts_by_legacy_id)}")

        totals = Counter()
        pending = []

        for config in selected_configs.values():
            resources = Resource.objects.filter(graph_id=config["graph_id"]).order_by(
                "resourceinstanceid"
            )
            if limit:
                resources = resources[:limit]

            media_ids = list(resources.values_list("resourceinstanceid", flat=True))
            tiles = Tile.objects.filter(
                resourceinstance_id__in=media_ids,
                data__has_key=config["related_node_id"],
            )
            totals["media_resources"] += len(media_ids)

            for tile in tiles.iterator(chunk_size=200):
                relation_values = (tile.data or {}).get(config["related_node_id"])
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
                    target_context = contexts_by_legacy_id.get(related_resource_id)

                    if target_context:
                        new_context_id = str(target_context.resourceinstanceid)
                        converted["resourceId"] = new_context_id
                        tile_changed = True
                        totals["relations_rewritten"] += 1
                        if verbose:
                            self.stdout.write(
                                f"  {config['label']} {tile.resourceinstance_id}: "
                                f"{related_resource_id} -> {new_context_id}"
                            )
                    elif related_resource_id in new_context_ids:
                        totals["already_migrated_relations"] += 1
                    else:
                        totals["missing_target_context"] += 1
                        if verbose:
                            self.stdout.write(
                                f"  MISSING (O) Context for {related_resource_id} "
                                f"on media {tile.resourceinstance_id}"
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
                    pending.append((config, tile, converted_values))

            self.stdout.write(f"{config['label']} resources scanned: {len(media_ids)}")

        totals["tiles_to_update"] = len(pending)
        ctx = transaction.atomic() if do_apply else nullcontext()
        with ctx:
            for config, tile, relation_values in pending:
                if not do_apply:
                    continue

                node = Node.objects.get(nodeid=config["related_node_id"])
                tile.data[config["related_node_id"]] = relation_values
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
            "media_resources",
            "relations_rewritten",
            "already_migrated_relations",
            "missing_target_context",
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
