import json
from pathlib import Path
from contextlib import nullcontext

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from arches.app.models.models import GraphModel, Node, Resource
from arches.app.models.tile import Tile
from arches_slocal.utils.resource_mapping import (
    get_graph_info,
    get_graph_nodes,
    get_graph_options,
    suggest_mapping,
)

class Command(BaseCommand):
    help = "Migrates resources from XXX Context to (O) Context using user-confirmed node mapping."

    def add_arguments(self, parser):
        parser.add_argument("--source-graph", type=str, default="")
        parser.add_argument("--target-graph", type=str, default="")
        parser.add_argument("--generate-mapping", type=str, default="")
        parser.add_argument("--mapping", type=str, default="")
        parser.add_argument("--apply", action="store_true", default=False)
        parser.add_argument("--limit", type=int, default=0)
        parser.add_argument("--verbose", action="store_true", default=False)
        parser.add_argument("--list-graphs", action="store_true", default=False)
        parser.add_argument("--list-nodes", type=str, default="")
        parser.add_argument("--suggest-mapping", nargs=2, metavar=("SOURCE_GRAPH_ID", "TARGET_GRAPH_ID"))
    def handle(self, *args, **opts):
        if opts["list_graphs"]:
            self.write_json(get_graph_options())
            return

        if opts["list_nodes"]:
            self.write_json(get_graph_nodes(opts["list_nodes"]))
            return

        if opts["suggest_mapping"]:
            source_graph_id, target_graph_id = opts["suggest_mapping"]
            self.write_json(self.build_mapping_payload(source_graph_id, target_graph_id))
            return        
        if opts["generate_mapping"]:
            if not opts["source_graph"] or not opts["target_graph"]:
                raise CommandError("Provide --source-graph and --target-graph with --generate-mapping")

            self.validate_graphs(opts["source_graph"], opts["target_graph"])
            self.generate_mapping(
                opts["source_graph"],
                opts["target_graph"],
                opts["generate_mapping"],
            )
            return

        if not opts["mapping"]:
            raise CommandError("Provide --mapping PATH or --generate-mapping PATH")

        self.migrate(opts)
    def validate_graphs(self, source_graph_id, target_graph_id):
        missing = []

        if not GraphModel.objects.filter(graphid=source_graph_id).exists():
            missing.append(f"source XXX Context graph not found: {source_graph_id}")
        if not GraphModel.objects.filter(graphid=target_graph_id).exists():
            missing.append(f"target (O) Context graph not found: {target_graph_id}")

        if missing:
            raise CommandError("\n".join(missing))
    def generate_mapping(self, source_graph_id, target_graph_id, output_path):
        payload = self.build_mapping_payload(source_graph_id, target_graph_id)

        path = Path(output_path)
        path.write_text(
            json.dumps(payload, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )

        self.stdout.write(self.style.SUCCESS(f"Mapping written to {path}"))
    def write_json(self, payload):
        self.stdout.write(json.dumps(payload, indent=2, ensure_ascii=False))

    def build_mapping_payload(self, source_graph_id, target_graph_id):
        source = get_graph_info(source_graph_id)
        target = get_graph_info(target_graph_id)

        return {
            "source_graph_id": source["graph_id"],
            "source_graph_name": source["name"],
            "target_graph_id": target["graph_id"],
            "target_graph_name": target["name"],
            "source_nodes": get_graph_nodes(source_graph_id),
            "target_nodes": get_graph_nodes(target_graph_id),
            "mappings": suggest_mapping(source_graph_id, target_graph_id),
        }        
    def build_nodegroup_lookup(self, graph_id):
        nodes = Node.objects.filter(graph_id=graph_id).exclude(datatype="semantic")
        return {
            str(node.nodeid): str(node.nodegroup_id)
            for node in nodes
            if node.nodegroup_id
        }


    def build_mapping_lookup(self, mappings):
        return {
            item["source_node_id"]: item["target_node_id"]
            for item in mappings
            if item.get("enabled") and item.get("source_node_id") and item.get("target_node_id")
        }


    def get_or_create_target_resource(self, source_resource, target_graph_id, do_apply):
        source_id = str(source_resource.resourceinstanceid)

        existing = Resource.objects.filter(
            graph_id=target_graph_id,
            legacyid=source_id,
        ).first()

        if existing:
            return existing, False

        if not do_apply:
            return None, True

        target = Resource.objects.create(
            graph_id=target_graph_id,
            legacyid=source_id,
        )
        return target, True    
    def copy_resource_tiles(
        self,
        source_resource,
        target_resource,
        mapping_lookup,
        target_nodegroup_by_node,
        do_apply,
        verbose=False,
    ):
        target_tiles_data = {}

        source_tiles = Tile.objects.filter(resourceinstance_id=source_resource.resourceinstanceid)

        stats = {
            "source_tiles": 0,
            "created_tiles": 0,
            "copied_values": 0,
            "skipped_values": 0,
        }

        for source_tile in source_tiles:
            stats["source_tiles"] += 1
            data = source_tile.data or {}

            for source_node_id, value in data.items():
                target_node_id = mapping_lookup.get(source_node_id)

                if not target_node_id:
                    stats["skipped_values"] += 1
                    continue

                if value in (None, "", []):
                    stats["skipped_values"] += 1
                    continue

                target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)

                if not target_nodegroup_id:
                    stats["skipped_values"] += 1
                    continue

                target_tiles_data.setdefault(target_nodegroup_id, {})[target_node_id] = value
                stats["copied_values"] += 1

        if not do_apply:
            stats["created_tiles"] = len(target_tiles_data)
            return stats

        for target_nodegroup_id, data in target_tiles_data.items():
            tile = Tile.get_blank_tile_from_nodegroup_id(
                target_nodegroup_id,
                resourceid=str(target_resource.resourceinstanceid),
            )
            tile.data.update(data)
            tile.save(index=False)
            stats["created_tiles"] += 1

            if verbose:
                self.stdout.write(
                    f"  tile {tile.tileid}: nodegroup={target_nodegroup_id}, values={len(data)}"
                )

        return stats    
    def migrate(self, opts):
        path = Path(opts["mapping"])
        payload = json.loads(path.read_text(encoding="utf-8"))

        do_apply = opts["apply"]
        limit = opts["limit"]
        verbose = opts["verbose"]

        source_graph_id = payload["source_graph_id"]
        target_graph_id = payload["target_graph_id"]

        self.validate_graphs(source_graph_id, target_graph_id)

        enabled_mappings = [
            item for item in payload["mappings"]
            if item.get("enabled") and item.get("target_node_id")
        ]

        mapping_lookup = self.build_mapping_lookup(enabled_mappings)
        target_nodegroup_by_node = self.build_nodegroup_lookup(target_graph_id)

        qs = Resource.objects.filter(graph_id=source_graph_id).order_by("resourceinstanceid")
        total = qs.count()

        self.stdout.write("=" * 60)
        self.stdout.write("Mode: APPLY" if do_apply else "Mode: DRY-RUN")
        self.stdout.write(f"Source graph: {source_graph_id}")
        self.stdout.write(f"Target graph: {target_graph_id}")
        self.stdout.write(f"Source resources: {total}")
        self.stdout.write(f"Enabled mappings: {len(mapping_lookup)}")
        if limit:
            self.stdout.write(f"Limit: {limit}")
        self.stdout.write("=" * 60)

        stats = {
            "processed_resources": 0,
            "created_resources": 0,
            "existing_resources": 0,
            "source_tiles": 0,
            "created_tiles": 0,
            "copied_values": 0,
            "skipped_values": 0,
        }

        ctx = transaction.atomic() if do_apply else nullcontext()

        with ctx:
            for source_resource in qs.iterator(chunk_size=100):
                if limit and stats["processed_resources"] >= limit:
                    break

                stats["processed_resources"] += 1

                target_resource, created = self.get_or_create_target_resource(
                    source_resource,
                    target_graph_id,
                    do_apply,
                )

                if created:
                    stats["created_resources"] += 1
                else:
                    stats["existing_resources"] += 1
                    if verbose:
                        self.stdout.write(
                            f"SKIP existing target for source {source_resource.resourceinstanceid}"
                        )
                    continue

                tile_stats = self.copy_resource_tiles(
                    source_resource=source_resource,
                    target_resource=target_resource,
                    mapping_lookup=mapping_lookup,
                    target_nodegroup_by_node=target_nodegroup_by_node,
                    do_apply=do_apply,
                    verbose=verbose,
                )

                for key in ("source_tiles", "created_tiles", "copied_values", "skipped_values"):
                    stats[key] += tile_stats[key]

                if verbose:
                    self.stdout.write(
                        f"source {source_resource.resourceinstanceid}: "
                        f"tiles={tile_stats['created_tiles']} values={tile_stats['copied_values']}"
                    )

        self.stdout.write("")
        self.stdout.write("Summary")
        for key, value in stats.items():
            self.stdout.write(f"  {key}: {value}")