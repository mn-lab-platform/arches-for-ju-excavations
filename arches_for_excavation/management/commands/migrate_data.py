import json
from pathlib import Path
from contextlib import nullcontext

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from arches.app.models.models import Edge, GraphModel, Node, Relation, Resource, Value
from arches.app.models.tile import Tile
from arches_for_excavation.utils.resource_mapping import (
    datatypes_compatible,
    get_graph_info,
    get_graph_nodes,
    get_graph_options,
    suggest_mapping,
)

# These are the same controlled-value translations used by
# migrate_context.py and migrate_context_color_v2.py. They allow migration
# directly to (O) Context without first changing the source resource.
DENSITY_DOMAIN_TO_VALUE = {
    "17c537c9-8c44-41d6-a6ab-c9019ff5b3fc": "07b4e46c-6b29-4a92-87b5-c8b157ced95f",
    "1afb30f5-319c-4503-9b64-69e75721bab0": "cd81009d-55bb-435f-acd1-fc782ce83ae8",
    "9e3f4a26-3841-4925-b54a-92dd57fc838c": "c7ad532f-a699-4e34-863c-7960db028987",
    "daedc1fe-183e-4cb9-b447-77be7df52776": "32297674-95f8-41a2-9d9c-c349372e5e35",
    "dd0b02fc-5f07-4855-84fa-77fdf83eeabb": "d9d31dc9-1f48-4977-bd80-6b5c36a4e241",
}
HIERARCHICAL_COLOR_COLLECTION_ID = "bde3931e-101f-464e-af91-017896e379fa"

COLOR_VALUE_TO_LABEL = {
    "54442de7-6950-411e-8cc6-58698cdc82e6": "Black",
    "eac2e2d9-36ab-4544-9b54-6063a1b2460c": "Beige",
    "991e1de1-f1c4-490a-ae69-3ae4d0f8ca35": "Yellow",
    "718155c0-883b-43a8-81b0-834e040290d8": "Brown",
    "c268e995-b1ea-4126-9ff7-e29c443ffbc6": "Grey",
    "d2bdb6ea-defb-4a02-adb5-5b890a70217e": "Other",
    "6fbdf8be-0fab-4bfc-90c4-d643ac6b0ea6": "Red",
    "f0154eab-a54e-48df-8980-fcd55ed42715": "White",
}
INTENSITY_VALUE_TO_LABEL = {
    "b7670796-0b26-416e-89a0-dd0051bcb972": "Dark",
    "39e2ba8e-a30d-4dad-b0fd-5e67dd8cf190": "Light",
    "4b310f9f-e365-4bd2-a313-4ba5884fa4ff": "Other",
}
COLOR_LABEL_TO_VALUE = {
    "Beige": "35f2ca16-b3ad-4da3-a738-56c1d12bb8ec",
    "Black": "32fc79c5-1570-4bd8-8531-4053f2cb843f",
    "Brown": "29026988-5dfc-43d9-bded-9b88e88dc327",
    "Dark Beige": "d05e6630-82da-42ff-9678-e6b4ba434a98",
    "Dark Black": "d6a8f3ea-7bb4-4725-872a-9c9c95d2253f",
    "Dark Brown": "c81fbaa4-ba05-4d6c-aabf-85c807730ba8",
    "Dark Green": "97302a34-be24-4e92-b77d-83a1cbdf669f",
    "Dark Grey": "b416fda3-7856-471b-b0ae-5e9326e30848",
    "Dark Red": "50294bc8-6cf2-41e1-8be5-cb1dfbc51c4f",
    "Dark White": "7c80d82e-a0d6-448a-9e85-45a38a3e189c",
    "Dark Yellow": "6d9d0a16-6b55-43c1-8e4d-4cb8b0c3c4cd",
    "Green": "e6e93ef7-f57c-4062-b521-b1d3267dc6ca",
    "Grey": "0fbc6ba5-966c-48e2-abea-a688d445062d",
    "Light Beige": "296d0668-266a-484b-9176-7b49fbf83ef3",
    "Light Black": "549e8779-9881-4a50-a2cc-3c104fafd357",
    "Light Brown": "76fcf063-767c-465f-85e8-e85d999b1c44",
    "Light Green": "6f1a05ac-84bf-4b26-9408-68a4d10d90e2",
    "Light Grey": "8e293485-84b5-4a2c-ba8d-5c041a696fa7",
    "Light Red": "adb99484-fceb-45f0-b3c7-cbbf4ef2fcb4",
    "Light White": "67e3db62-bf83-4e3d-8a22-71d3da523f14",
    "Light Yellow": "6c955500-e6a3-4fd2-ba4d-e749d5cea09d",
    "Other": "116d0298-8adb-457d-9cef-684c8915a06e",
    "Red": "669b319b-6a31-4083-afe6-ed8f71b8ef5c",
    "White": "7ee9f8dc-ca03-4d56-95df-d336e61f28cd",
    "Yellow": "7c9c86de-87dd-4fd5-844b-5b76561e9c34",
}

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
        parser.add_argument("--report-skipped", action="store_true", default=False)
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


    def validate_special_mapping_collections(self, mappings):
        color_mappings = [
            mapping for mapping in mappings
            if mapping.get("special_transform") == "context_color_v2"
        ]
        if color_mappings:
            for mapping in color_mappings:
                node = Node.objects.get(nodeid=mapping["target_node_id"])
                collection_id = str((node.config or {}).get("rdmCollection") or "")
                if collection_id != HIERARCHICAL_COLOR_COLLECTION_ID:
                    raise CommandError(
                        f"{node.name} must use the Hierarchical color of the soil "
                        f"collection ({HIERARCHICAL_COLOR_COLLECTION_ID}); found "
                        f"{collection_id or 'no collection'}"
                    )

            missing_values = set(COLOR_LABEL_TO_VALUE.values()).difference(
                str(value_id)
                for value_id in Value.objects.filter(
                    valueid__in=COLOR_LABEL_TO_VALUE.values()
                ).values_list("valueid", flat=True)
            )
            if missing_values:
                raise CommandError(
                    "Hierarchical color collection is missing required values: "
                    + ", ".join(sorted(missing_values))
                )

        for mapping in mappings:
            if mapping.get("special_transform") != "descriptive_statement":
                continue

            statement_type_node_id = mapping.get("statement_type_node_id")
            expected_collection_id = mapping.get("statement_type_collection_id")
            if expected_collection_id:
                node = Node.objects.filter(nodeid=statement_type_node_id).first()
                actual_collection_id = str(
                    (node.config or {}).get("rdmCollection") or ""
                ) if node else ""
                if actual_collection_id != expected_collection_id:
                    raise CommandError(
                        f"{mapping.get('target_node_path')} must use Statement Type "
                        f"collection {expected_collection_id}; found "
                        f"{actual_collection_id or 'no collection'}."
                    )

            statement_type_value_id = (
                mapping.get("statement_type_value_id")
                or mapping.get("statement_type_concept_id")
            )
            if statement_type_value_id and not Value.objects.filter(
                valueid=statement_type_value_id
            ).exists():
                raise CommandError(
                    f"Statement Type value {statement_type_value_id} does not exist."
                )

            label = mapping.get("statement_type_label")
            if label and not self.rdm_value_id_for_label(statement_type_node_id, label):
                raise CommandError(
                    f"{mapping.get('target_node_path')} has no unique RDM value "
                    f"for Statement Type {label!r}."
                )

        for mapping in mappings:
            if mapping.get("special_transform") != "domain_value_to_rdm":
                continue
            labels = set((mapping.get("label_map") or {}).values())
            missing_labels = [
                label for label in sorted(labels)
                if not self.rdm_value_id_for_label(mapping.get("target_node_id"), label)
            ]
            if missing_labels:
                raise CommandError(
                    f"{mapping.get('target_node_path')} has no unique RDM value(s): "
                    + ", ".join(missing_labels)
                )

    def build_mapping_lookup(self, mappings):
        lookup = {}
        for item in mappings:
            if not (
                item.get("enabled")
                and item.get("source_node_id")
                and item.get("target_node_id")
            ):
                continue
            lookup.setdefault(item["source_node_id"], []).append(item)
        return lookup

    def domain_option_label_for_value(self, node_id, value):
        node = Node.objects.filter(nodeid=node_id).first()
        value_id = str(self.first_value(value) or "")
        if not node or not value_id:
            return None
        options = (node.config or {}).get("options") or []
        labels = [
            self.get_localized_text(option.get("text")).strip()
            for option in options
            if str(option.get("id") or "") == value_id
        ]
        return labels[0] if len(labels) == 1 and labels[0] else None

    def domain_option_id_for_label(self, node_id, label):
        node = Node.objects.filter(nodeid=node_id).first()
        wanted = str(label or "").strip().casefold()
        if not node or not wanted:
            return None
        options = (node.config or {}).get("options") or []
        values = [
            str(option.get("id") or "")
            for option in options
            if self.get_localized_text(option.get("text")).strip().casefold() == wanted
            and str(option.get("id") or "")
        ]
        return values[0] if len(values) == 1 else None

    def resolve_resource_default(self, default):
        target_node_id = default.get("target_node_id")
        if default.get("rdm_value_label"):
            return self.rdm_value_id_for_label(
                target_node_id,
                default["rdm_value_label"],
            )
        if default.get("domain_option_label"):
            return self.domain_option_id_for_label(
                target_node_id,
                default["domain_option_label"],
            )
        return default.get("value")

    def validate_resource_defaults(self, defaults):
        for default in defaults:
            target_node_id = default.get("target_node_id")
            if not target_node_id or not Node.objects.filter(nodeid=target_node_id).exists():
                raise CommandError("Resource default has an invalid target node.")
            if not self.resolve_resource_default(default):
                description = (
                    default.get("rdm_value_label")
                    or default.get("domain_option_label")
                    or default.get("value")
                    or "value"
                )
                raise CommandError(
                    f"No unique target value for resource default {description!r}."
                )

    def apply_resource_defaults(self, defaults, target_nodegroup_by_node, target_tiles_data):
        applied = 0
        for default in defaults:
            target_node_id = default["target_node_id"]
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)
            value = self.resolve_resource_default(default)
            if not target_nodegroup_id or value in (None, "", []):
                continue
            data = target_tiles_data.setdefault(target_nodegroup_id, {})
            if data.get(target_node_id) != value:
                data[target_node_id] = value
                applied += 1
        return applied

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

    def merge_unique_list_values(self, *values):
        """Combine list-like values without requiring their items to be hashable."""
        merged = []
        for value in values:
            for item in self.list_value(value):
                if item not in merged:
                    merged.append(item)
        return merged

    def remap_value(self, value, mapping):
        value_map = mapping.get("value_map") or {}
        if not value_map:
            return value
        if isinstance(value, list):
            return [value_map.get(str(item), item) for item in value]
        return value_map.get(str(value), value)

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

    def rdm_value_id_for_label(self, node_id, label):
        cache = getattr(self, "_rdm_value_label_cache", {})
        cache_key = (str(node_id), str(label))
        if cache_key in cache:
            return cache[cache_key]

        node = Node.objects.filter(nodeid=node_id).first()
        collection_id = str((node.config or {}).get("rdmCollection") or "") if node else ""
        if not collection_id:
            cache[cache_key] = None
            self._rdm_value_label_cache = cache
            return None

        concepts = {collection_id}
        frontier = {collection_id}
        while frontier:
            children = set(
                str(concept_id)
                for concept_id in Relation.objects.filter(
                    conceptfrom_id__in=frontier,
                    relationtype_id__in=("member", "narrower"),
                ).values_list("conceptto_id", flat=True)
            ).difference(concepts)
            concepts.update(children)
            frontier = children

        value_ids = list(
            Value.objects.filter(
                concept_id__in=concepts,
                value=label,
            ).values_list("valueid", flat=True)
        )
        result = str(value_ids[0]) if len(value_ids) == 1 else None
        cache[cache_key] = result
        self._rdm_value_label_cache = cache
        return result

    def file_list_reference_text(self, value):
        entries = value if isinstance(value, list) else [value]
        references = []
        for entry in entries:
            if isinstance(entry, str):
                reference = entry.strip()
            elif isinstance(entry, dict):
                name = str(
                    entry.get("name")
                    or entry.get("filename")
                    or entry.get("file_name")
                    or ""
                ).strip()
                location = str(
                    entry.get("url")
                    or entry.get("path")
                    or entry.get("file_id")
                    or ""
                ).strip()
                reference = " — ".join(part for part in (name, location) if part)
            else:
                reference = self.get_localized_text(entry).strip()
            if reference and reference not in references:
                references.append(reference)
        return "\n".join(references)

    def context_color_value(self, color_value, intensity_value):
        color_id = str(self.first_value(color_value) or "")
        intensity_id = str(self.first_value(intensity_value) or "")
        color_label = COLOR_VALUE_TO_LABEL.get(color_id)
        intensity_label = INTENSITY_VALUE_TO_LABEL.get(intensity_id)

        if not color_label:
            return None
        if color_label == "Other" or intensity_label == "Other":
            return COLOR_LABEL_TO_VALUE["Other"]
        if intensity_label in {"Dark", "Light"}:
            combined = f"{intensity_label} {color_label}"
            return COLOR_LABEL_TO_VALUE.get(combined, COLOR_LABEL_TO_VALUE.get(color_label))
        return COLOR_LABEL_TO_VALUE.get(color_label)

    def apply_special_transform(
        self,
        mapping,
        value,
        source_tile_data,
        target_nodegroup_by_node,
        target_tiles_data,
        extra_tiles_data,
    ):
        transform = mapping.get("special_transform")

        if transform == "density_domain_to_concept":
            target_node_id = mapping.get("target_node_id")
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)
            target_value = DENSITY_DOMAIN_TO_VALUE.get(str(value))
            if not target_nodegroup_id or not target_value:
                return False
            data = target_tiles_data.setdefault(target_nodegroup_id, {})
            values = data.setdefault(target_node_id, [])
            if target_value not in values:
                values.append(target_value)
            return True

        if transform == "domain_value_to_domain_option":
            target_node_id = mapping.get("target_node_id")
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)
            source_label = self.domain_option_label_for_value(
                mapping.get("source_node_id"),
                value,
            )
            label_map = {
                str(key).casefold(): str(mapped)
                for key, mapped in (mapping.get("label_map") or {}).items()
            }
            target_label = label_map.get(
                str(source_label or "").casefold(),
                mapping.get("default_target_label"),
            )
            target_value = self.domain_option_id_for_label(target_node_id, target_label)
            if not target_nodegroup_id or not target_value:
                return False
            target_tiles_data.setdefault(target_nodegroup_id, {})[target_node_id] = target_value
            return True

        if transform == "coordinates_to_measurement_text":
            target_node_id = mapping.get("target_node_id")
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)
            if not target_nodegroup_id:
                return False
            parts = []
            prefix = str(mapping.get("prefix") or "").strip()
            if prefix:
                parts.append(prefix)
            for field in mapping.get("fields") or []:
                raw = source_tile_data.get(field.get("source_node_id"))
                text = self.get_localized_text(raw).strip()
                if text:
                    parts.append(f"{field.get('label')}: {text}")
            if len(parts) <= (1 if prefix else 0):
                return False
            target_tiles_data.setdefault(target_nodegroup_id, {})[target_node_id] = "\n".join(parts)
            return True

        if transform == "domain_value_to_rdm":
            target_node_id = mapping.get("target_node_id")
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)
            source_label = self.domain_option_label_for_value(
                mapping.get("source_node_id"),
                value,
            )
            label_map = {
                str(key).casefold(): str(mapped)
                for key, mapped in (mapping.get("label_map") or {}).items()
            }
            target_label = label_map.get(str(source_label or "").casefold())
            target_value = self.rdm_value_id_for_label(target_node_id, target_label)
            if not target_nodegroup_id or not target_value:
                return False
            target_tiles_data.setdefault(target_nodegroup_id, {})[target_node_id] = target_value
            return True

        if transform == "context_color_v2":
            target_node_id = mapping.get("target_node_id")
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)
            precomputed_value = source_tile_data.get(
                mapping.get("precomputed_color_source_node_id")
            )
            intensity_value = source_tile_data.get(mapping.get("intensity_source_node_id"))
            target_value = self.context_color_value(value, intensity_value)
            if not target_nodegroup_id:
                return False
            data = target_tiles_data.setdefault(target_nodegroup_id, {})
            if precomputed_value not in (None, "", []):
                data[target_node_id] = self.list_value(precomputed_value)
                return True
            if not target_value:
                return False
            data[target_node_id] = [target_value]
            return True

        if transform == "descriptive_statement":
            statement_node_id = mapping.get("target_node_id")
            statement_type_node_id = mapping.get("statement_type_node_id")
            statement_type_value_id = (
                mapping.get("statement_type_value_id")
                or mapping.get("statement_type_concept_id")
            )
            if not statement_type_value_id and mapping.get("statement_type_label"):
                statement_type_value_id = self.rdm_value_id_for_label(
                    statement_type_node_id,
                    mapping["statement_type_label"],
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

        if transform == "append_labeled_text":
            target_node_id = mapping.get("target_node_id")
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)
            text = self.get_localized_text(value).strip()
            label = str(mapping.get("text_label") or "").strip()
            if not target_nodegroup_id or not text:
                return False
            if label:
                text = f"{label}: {text}"

            data = target_tiles_data.setdefault(target_nodegroup_id, {})
            existing = self.get_localized_text(data.get(target_node_id)).strip()
            if text not in existing.split("\n"):
                combined = "\n".join(part for part in (existing, text) if part)
                data[target_node_id] = self.make_localized_text(combined)
            return True

        if transform == "concept_list_with_comment_rules":
            target_node_id = mapping.get("target_node_id")
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)
            if not target_nodegroup_id:
                return False

            value_map = mapping.get("value_map") or {}
            comment_by_source_value = mapping.get("comment_by_source_value") or {}
            values = self.list_value(value)
            target_values = [value_map.get(str(item), item) for item in values]
            target_values = list(dict.fromkeys(str(item) for item in target_values if item))
            if not target_values:
                return False

            data = target_tiles_data.setdefault(target_nodegroup_id, {})
            existing_values = self.list_value(data.get(target_node_id))
            data[target_node_id] = list(dict.fromkeys(existing_values + target_values))

            comment_node_id = mapping.get("target_comment_node_id")
            comments = [
                str(comment_by_source_value[str(item)]).strip()
                for item in values
                if str(item) in comment_by_source_value
                and str(comment_by_source_value[str(item)]).strip()
            ]
            if comment_node_id and comments:
                existing = self.get_localized_text(data.get(comment_node_id)).strip()
                parts = [part for part in existing.split("\n") if part]
                for comment in comments:
                    if comment not in parts:
                        parts.append(comment)
                data[comment_node_id] = self.make_localized_text("\n".join(parts))
            return True

        if transform == "file_list_to_reference_text":
            target_node_id = mapping.get("target_node_id")
            target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)
            reference_text = self.file_list_reference_text(value)
            if not target_nodegroup_id or not reference_text:
                return False

            data = target_tiles_data.setdefault(target_nodegroup_id, {})
            existing = data.get(target_node_id)
            if existing:
                references = [existing, reference_text]
                data[target_node_id] = "\n".join(
                    dict.fromkeys(part for part in references if part)
                )
            else:
                data[target_node_id] = reference_text
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
        resource_defaults,
        target_nodegroup_by_node,
        parent_nodegroup_by_nodegroup,
        do_apply,
        verbose=False,
        skip_report=None,
    ):
        target_tiles_data = {}

        def record_skip(reason, source_node_id):
            if skip_report is None:
                return
            key = (reason, str(source_node_id))
            skip_report[key] = skip_report.get(key, 0) + 1
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
        stats["copied_values"] += self.apply_resource_defaults(
            resource_defaults,
            target_nodegroup_by_node,
            target_tiles_data,
        )

        for source_tile in source_tiles:
            stats["source_tiles"] += 1
            data = source_tile.data or {}
            repeated_tiles_data = {}
            source_nodegroup_is_repeated = (
                source_nodegroup_tile_counts.get(str(source_tile.nodegroup_id), 0) > 1
            )

            for source_node_id, value in data.items():
                mappings = mapping_lookup.get(source_node_id)

                if not mappings:
                    stats["skipped_values"] += 1
                    record_skip("unmapped_or_disabled", source_node_id)
                    continue

                if value in (None, "", []):
                    stats["skipped_values"] += 1
                    record_skip("empty_value", source_node_id)
                    continue

                for mapping in mappings:
                    target_data = (
                        target_tiles_data
                        if mapping.get("flatten_repeated_target")
                        else (
                            repeated_tiles_data
                            if source_nodegroup_is_repeated
                            else target_tiles_data
                        )
                    )

                    if mapping.get("special_transform"):
                        if self.apply_special_transform(
                            mapping,
                            value,
                            data,
                            target_nodegroup_by_node,
                            target_data,
                            extra_tiles_data,
                        ):
                            stats["copied_values"] += 1
                        else:
                            stats["skipped_values"] += 1
                            record_skip("special_transform_not_applied", source_node_id)
                        continue

                    target_node_id = mapping["target_node_id"]
                    target_nodegroup_id = target_nodegroup_by_node.get(target_node_id)

                    if not target_nodegroup_id:
                        stats["skipped_values"] += 1
                        record_skip("target_node_missing", source_node_id)
                        continue

                    if not datatypes_compatible(mapping.get("source_datatype"), mapping.get("target_datatype")):
                        stats["skipped_values"] += 1
                        record_skip("incompatible_datatype", source_node_id)
                        continue

                    converted_value = self.remap_value(value, mapping)
                    converted_value = self.convert_value_for_target(
                        converted_value,
                        mapping.get("source_datatype"),
                        mapping.get("target_datatype"),
                    )

                    if converted_value in (None, "", []):
                        stats["skipped_values"] += 1
                        record_skip("conversion_produced_empty_value", source_node_id)
                        continue

                    target_values = target_data.setdefault(target_nodegroup_id, {})
                    if mapping.get("merge_list_values"):
                        existing = self.list_value(target_values.get(target_node_id))
                        incoming = self.list_value(converted_value)
                        target_values[target_node_id] = self.merge_unique_list_values(
                            existing,
                            incoming,
                        )
                    else:
                        target_values[target_node_id] = converted_value
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
        report_skipped = opts["report_skipped"]

        source_graph_id = payload["source_graph_id"]
        target_graph_id = payload["target_graph_id"]
        resource_defaults = payload.get("resource_defaults") or []

        self.validate_graphs(source_graph_id, target_graph_id)

        enabled_mappings = [
            item for item in payload["mappings"]
            if item.get("enabled") and item.get("target_node_id")
        ]

        self.validate_special_mapping_collections(enabled_mappings)
        self.validate_resource_defaults(resource_defaults)
        mapping_lookup = self.build_mapping_lookup(enabled_mappings)
        source_node_labels = {
            node["node_id"]: node.get("path") or node.get("name") or node["node_id"]
            for node in payload.get("source_nodes", [])
        }
        skip_report = {} if report_skipped else None
        target_nodegroup_by_node = self.build_nodegroup_lookup(target_graph_id)
        parent_nodegroup_by_nodegroup = self.build_parent_nodegroup_lookup(target_graph_id)
        mapped_target_nodegroup_ids = {
            target_nodegroup_by_node.get(item["target_node_id"])
            for item in enabled_mappings + resource_defaults
        }
        mapped_target_nodegroup_ids.discard(None)

        qs = Resource.objects.filter(graph_id=source_graph_id).order_by("resourceinstanceid")
        total = qs.count()

        self.stdout.write("=" * 60)
        self.stdout.write("Mode: APPLY" if do_apply else "Mode: DRY-RUN")
        self.stdout.write(f"Source graph: {source_graph_id}")
        self.stdout.write(f"Target graph: {target_graph_id}")
        self.stdout.write(f"Source resources: {total}")
        self.stdout.write(f"Enabled mappings: {len(enabled_mappings)}")
        if resource_defaults:
            self.stdout.write(f"Resource defaults: {len(resource_defaults)}")
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
                    resource_defaults=resource_defaults,
                    target_nodegroup_by_node=target_nodegroup_by_node,
                    parent_nodegroup_by_nodegroup=parent_nodegroup_by_nodegroup,
                    do_apply=do_apply,
                    verbose=verbose,
                    skip_report=skip_report,
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

        if report_skipped and skip_report:
            self.stdout.write("\nSkipped values by reason and source field")
            for (reason, source_node_id), count in sorted(
                skip_report.items(), key=lambda item: (-item[1], item[0])
            ):
                label = source_node_labels.get(source_node_id, source_node_id)
                self.stdout.write(f"  {count}: {reason} | {label}")
