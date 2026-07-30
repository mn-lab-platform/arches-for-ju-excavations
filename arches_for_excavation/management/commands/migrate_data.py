import json
from pathlib import Path
from contextlib import nullcontext

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from arches.app.models.models import Edge, GraphModel, Node, Resource
from arches.app.models.tile import Tile
from arches_for_excavation.utils.resource_mapping import (
    datatypes_compatible,
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
        parser.add_argument("--update-existing", action="store_true", default=False)
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

    def build_parent_nodegroup_lookup(self, graph_id):
        nodes = {
            str(node.nodeid): node
            for node in Node.objects.filter(graph_id=graph_id)
        }
        parent_by_node = {
            str(edge.rangenode_id): str(edge.domainnode_id)
            for edge in Edge.objects.filter(graph_id=graph_id)
            if edge.rangenode_id and edge.domainnode_id
        }
        parent_nodegroup_by_nodegroup = {}

        for node in nodes.values():
            if not node.nodegroup_id:
                continue

            nodegroup_id = str(node.nodegroup_id)
            parent_node_id = parent_by_node.get(str(node.nodeid))

            while parent_node_id:
                parent_node = nodes.get(parent_node_id)
                parent_nodegroup_id = (
                    str(parent_node.nodegroup_id)
                    if parent_node and parent_node.nodegroup_id
                    else ""
                )

                if parent_nodegroup_id and parent_nodegroup_id != nodegroup_id:
                    parent_nodegroup_by_nodegroup.setdefault(
                        nodegroup_id,
                        parent_nodegroup_id,
                    )
                    break

                parent_node_id = parent_by_node.get(parent_node_id)

        return parent_nodegroup_by_nodegroup

    def nodegroup_depth(self, nodegroup_id, parent_nodegroup_by_nodegroup):
        depth = 0
        current = parent_nodegroup_by_nodegroup.get(nodegroup_id)
        seen = set()

        while current and current not in seen:
            seen.add(current)
            depth += 1
            current = parent_nodegroup_by_nodegroup.get(current)

        return depth


    def build_mapping_lookup(self, mappings):
        return {
            item["source_node_id"]: item
            for item in mappings
            if item.get("enabled") and item.get("source_node_id") and item.get("target_node_id")
        }

    def get_localized_text(self, value):
        if isinstance(value, str):
            return value

        if isinstance(value, list):
            parts = [self.get_localized_text(item) for item in value]
            return ", ".join(part for part in parts if part)

        if isinstance(value, dict):
            if "value" in value:
                return self.get_localized_text(value.get("value"))

            for lang in ("en", "none"):
                if lang in value:
                    text = self.get_localized_text(value.get(lang))
                    if text:
                        return text

            for item in value.values():
                text = self.get_localized_text(item)
                if text:
                    return text

        if value is None:
            return ""

        return str(value)

    def make_localized_text(self, value):
        if isinstance(value, dict):
            if "value" in value:
                return {"en": {"value": self.get_localized_text(value), "direction": "ltr"}}
            if any(isinstance(item, dict) and "value" in item for item in value.values()):
                return value

        text = self.get_localized_text(value)
        return {"en": {"value": text, "direction": "ltr"}}

    def get_number_value(self, value):
        if isinstance(value, (int, float)) and not isinstance(value, bool):
            return value

        text = self.get_localized_text(value).strip().replace(",", ".")
        if not text:
            return None

        try:
            number = float(text)
        except ValueError:
            return None

        return int(number) if number.is_integer() else number

    def first_value(self, value):
        if isinstance(value, list):
            return value[0] if value else None
        return value

    def list_value(self, value):
        if isinstance(value, list):
            return value
        if value in (None, ""):
            return []
        return [value]

    def convert_value_for_target(self, value, source_datatype, target_datatype):
        if source_datatype == target_datatype:
            return value

        if target_datatype in {"non-localized-string", "url"}:
            return self.get_localized_text(value)

        if target_datatype == "string":
            return self.make_localized_text(value)

        if target_datatype == "number":
            return self.get_number_value(value)

        if target_datatype in {"concept", "domain-value"}:
            return self.first_value(value)

        if target_datatype == "concept-list":
            return self.list_value(value)

        return value

    def is_truthy(self, value):
        if isinstance(value, bool):
            return value

        text = self.get_localized_text(value).strip().lower()
        return text in {"1", "true", "t", "yes", "y", "tak"}

    def apply_special_transform(
        self,
        mapping,
        value,
        target_nodegroup_by_node,
        target_tiles_data,
        extra_tiles_data,
    ):
        transform = mapping.get("special_transform")

        if transform == "descriptive_statement":
            statement_node_id = mapping.get("target_node_id")
            statement_type_node_id = mapping.get("statement_type_node_id")
            statement_type_value_id = (
                mapping.get("statement_type_value_id")
                or mapping.get("statement_type_concept_id")
            )
            target_nodegroup_id = target_nodegroup_by_node.get(statement_node_id)

            if not target_nodegroup_id or not statement_type_node_id or not statement_type_value_id:
                return False

            statement_value = self.convert_value_for_target(
                value,
                mapping.get("source_datatype"),
                mapping.get("target_datatype") or "string",
            )

            if statement_value in (None, "", []):
                return False

            extra_tiles_data.append((
                target_nodegroup_id,
                {
                    statement_node_id: statement_value,
                    statement_type_node_id: statement_type_value_id,
                },
            ))
            return True

        if transform == "procedure_if_true":
            if not self.is_truthy(value):
                return False

            target_node_id = mapping.get("target_node_id")
            procedure_value_id = (
                mapping.get("procedure_value_id")
                or mapping.get("procedure_concept_id")
            )
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)

            if not target_nodegroup_id or not procedure_value_id:
                return False

            data = target_tiles_data.setdefault(target_nodegroup_id, {})
            procedures = data.setdefault(target_node_id, [])

            if procedure_value_id not in procedures:
                procedures.append(procedure_value_id)

            return True

        return False


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
        parent_nodegroup_by_nodegroup,
        do_apply,
        verbose=False,
    ):
        target_tiles_data = {}
        extra_tiles_data = []

        source_tiles = list(Tile.objects.filter(resourceinstance_id=source_resource.resourceinstanceid))
        source_nodegroup_tile_counts = {}
        for tile in source_tiles:
            key = str(tile.nodegroup_id)
            source_nodegroup_tile_counts[key] = source_nodegroup_tile_counts.get(key, 0) + 1

        stats = {
            "source_tiles": 0,
            "created_tiles": 0,
            "copied_values": 0,
            "skipped_values": 0,
        }

        for source_tile in source_tiles:
            stats["source_tiles"] += 1
            data = source_tile.data or {}
            repeated_tiles_data = {}
            source_nodegroup_is_repeated = (
                source_nodegroup_tile_counts.get(str(source_tile.nodegroup_id), 0) > 1
            )

            for source_node_id, value in data.items():
                mapping = mapping_lookup.get(source_node_id)

                if not mapping:
                    stats["skipped_values"] += 1
                    continue

                if value in (None, "", []):
                    stats["skipped_values"] += 1
                    continue

                if mapping.get("special_transform"):
                    if self.apply_special_transform(
                        mapping,
                        value,
                        target_nodegroup_by_node,
                        target_tiles_data,
                        extra_tiles_data,
                    ):
                        stats["copied_values"] += 1
                    else:
                        stats["skipped_values"] += 1
                    continue

                target_node_id = mapping["target_node_id"]
                target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)

                if not target_nodegroup_id:
                    stats["skipped_values"] += 1
                    continue

                if not datatypes_compatible(mapping.get("source_datatype"), mapping.get("target_datatype")):
                    stats["skipped_values"] += 1
                    continue

                value = self.convert_value_for_target(
                    value,
                    mapping.get("source_datatype"),
                    mapping.get("target_datatype"),
                )

                if value in (None, "", []):
                    stats["skipped_values"] += 1
                    continue

                target_data = repeated_tiles_data if source_nodegroup_is_repeated else target_tiles_data
                target_data.setdefault(target_nodegroup_id, {})[target_node_id] = value
                stats["copied_values"] += 1

            if repeated_tiles_data:
                extra_tiles_data.extend(repeated_tiles_data.items())

        tiles_data = list(target_tiles_data.items()) + extra_tiles_data
        parent_nodegroups = set(parent_nodegroup_by_nodegroup.values())
        required_parent_nodegroups = set()

        for target_nodegroup_id, _data in tiles_data:
            parent_nodegroup_id = parent_nodegroup_by_nodegroup.get(target_nodegroup_id)
            while parent_nodegroup_id:
                required_parent_nodegroups.add(parent_nodegroup_id)
                parent_nodegroup_id = parent_nodegroup_by_nodegroup.get(parent_nodegroup_id)

        missing_parent_nodegroups = required_parent_nodegroups.difference(
            target_nodegroup_id for target_nodegroup_id, _data in tiles_data
        )

        if not do_apply:
            stats["created_tiles"] = len(tiles_data) + len(missing_parent_nodegroups)
            return stats

        tiles_data.sort(
            key=lambda item: self.nodegroup_depth(
                item[0],
                parent_nodegroup_by_nodegroup,
            )
        )
        parent_tile_by_nodegroup = {}
        placeholder_tile_ids = set()

        def ensure_parent_tile(nodegroup_id):
            if not nodegroup_id:
                return None

            if nodegroup_id in parent_tile_by_nodegroup:
                return parent_tile_by_nodegroup[nodegroup_id]

            parent_nodegroup_id = parent_nodegroup_by_nodegroup.get(nodegroup_id)
            parent_tile = ensure_parent_tile(parent_nodegroup_id)
            tile = Tile.get_blank_tile_from_nodegroup_id(
                nodegroup_id,
                resourceid=str(target_resource.resourceinstanceid),
            )
            if parent_tile:
                tile.parenttile = parent_tile
            tile.save(index=False)
            stats["created_tiles"] += 1
            parent_tile_by_nodegroup[nodegroup_id] = tile
            placeholder_tile_ids.add(str(tile.tileid))

            if verbose:
                self.stdout.write(
                    f"  parent tile {tile.tileid}: nodegroup={nodegroup_id}"
                )

            return tile

        for target_nodegroup_id, data in tiles_data:
            parent_nodegroup_id = parent_nodegroup_by_nodegroup.get(target_nodegroup_id)
            parent_tile = ensure_parent_tile(parent_nodegroup_id)

            cached_tile = parent_tile_by_nodegroup.get(target_nodegroup_id)
            if cached_tile and str(cached_tile.tileid) in placeholder_tile_ids:
                tile = cached_tile
                placeholder_tile_ids.remove(str(tile.tileid))
            else:
                tile = Tile.get_blank_tile_from_nodegroup_id(
                    target_nodegroup_id,
                    resourceid=str(target_resource.resourceinstanceid),
                )
                if parent_tile:
                    tile.parenttile = parent_tile
                stats["created_tiles"] += 1

            tile.data.update(data)
            tile.save(index=False)

            if target_nodegroup_id in parent_nodegroups and target_nodegroup_id not in parent_tile_by_nodegroup:
                parent_tile_by_nodegroup[target_nodegroup_id] = tile

            if verbose:
                self.stdout.write(
                    f"  tile {tile.tileid}: nodegroup={target_nodegroup_id}, parent={tile.parenttile_id}, values={len(data)}"
                )

        return stats    
    def migrate(self, opts):
        path = Path(opts["mapping"])
        payload = json.loads(path.read_text(encoding="utf-8"))

        do_apply = opts["apply"]
        limit = opts["limit"]
        verbose = opts["verbose"]
        update_existing = opts["update_existing"]

        source_graph_id = payload["source_graph_id"]
        target_graph_id = payload["target_graph_id"]

        self.validate_graphs(source_graph_id, target_graph_id)

        enabled_mappings = [
            item for item in payload["mappings"]
            if item.get("enabled") and item.get("target_node_id")
        ]

        mapping_lookup = self.build_mapping_lookup(enabled_mappings)
        target_nodegroup_by_node = self.build_nodegroup_lookup(target_graph_id)
        parent_nodegroup_by_nodegroup = self.build_parent_nodegroup_lookup(target_graph_id)
        mapped_target_nodegroup_ids = {
            target_nodegroup_by_node.get(item["target_node_id"])
            for item in enabled_mappings
        }
        mapped_target_nodegroup_ids.discard(None)

        qs = Resource.objects.filter(graph_id=source_graph_id).order_by("resourceinstanceid")
        total = qs.count()

        self.stdout.write("=" * 60)
        self.stdout.write("Mode: APPLY" if do_apply else "Mode: DRY-RUN")
        self.stdout.write(f"Source graph: {source_graph_id}")
        self.stdout.write(f"Target graph: {target_graph_id}")
        self.stdout.write(f"Source resources: {total}")
        self.stdout.write(f"Enabled mappings: {len(mapping_lookup)}")
        if update_existing:
            self.stdout.write("Update existing target resources: yes")
        if limit:
            self.stdout.write(f"Limit: {limit}")
        self.stdout.write("=" * 60)

        stats = {
            "processed_resources": 0,
            "created_resources": 0,
            "existing_resources": 0,
            "updated_resources": 0,
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
                    if not update_existing:
                        if verbose:
                            self.stdout.write(
                                f"SKIP existing target for source {source_resource.resourceinstanceid}"
                            )
                        continue

                    stats["updated_resources"] += 1
                    if do_apply and mapped_target_nodegroup_ids:
                        Tile.objects.filter(
                            resourceinstance_id=target_resource.resourceinstanceid,
                            nodegroup_id__in=mapped_target_nodegroup_ids,
                        ).delete()
                    if verbose:
                        self.stdout.write(
                            f"UPDATE existing target for source {source_resource.resourceinstanceid}"
                        )

                tile_stats = self.copy_resource_tiles(
                    source_resource=source_resource,
                    target_resource=target_resource,
                    mapping_lookup=mapping_lookup,
                    target_nodegroup_by_node=target_nodegroup_by_node,
                    parent_nodegroup_by_nodegroup=parent_nodegroup_by_nodegroup,
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