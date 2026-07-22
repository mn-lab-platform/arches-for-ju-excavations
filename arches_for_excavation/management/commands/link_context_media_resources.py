import re
import unicodedata
from collections import Counter, defaultdict
from contextlib import nullcontext
from dataclasses import dataclass, field
from uuid import uuid4

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from arches.app.models.models import Node, ResourceXResource
from arches.app.models.resource import Resource
from arches.app.models.tile import Tile


CONTEXT_GRAPH_ID = "2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c"
CONTEXT_NUMBER_NODE_ID = "cf7f2532-74f3-487f-9261-bf27825fe04c"

IIIF_GRAPH_ID = "f1b9e37a-c3ba-4c26-a797-7f16302c031c"
IIIF_LABEL_NODE_ID = "b9a36003-ef1c-4150-83dc-4d979e874065"
IIIF_RELATED_NODE_ID = "8bedf116-657a-4eb5-af06-b4de29839966"

DIGITAL_RESOURCE_3D_GRAPH_ID = "039f5a45-82e2-4597-8609-d24c758bfd59"
DIGITAL_RESOURCE_3D_NAME_NODE_ID = "5b1ab6bd-faf6-4120-93ae-8e6f4ea1de32"
DIGITAL_RESOURCE_3D_RELATED_NODE_ID = "f67c4c42-fe0e-489b-9af7-58405ad7c65f"


@dataclass
class ResourceInfo:
    resource: Resource
    graph_id: str
    labels: set[str] = field(default_factory=set)
    keys: set[str] = field(default_factory=set)
    best_label: str = ""

    @property
    def resource_id(self):
        return str(self.resource.resourceinstanceid)


@dataclass
class MatchResult:
    media: ResourceInfo
    context: ResourceInfo | None
    key: str = ""
    status: str = ""


def normalize_text(value):
    if value is None:
        return ""

    value = unicodedata.normalize("NFKD", str(value))
    value = "".join(char for char in value if not unicodedata.combining(char))
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def contains_phrase(haystack, needle):
    if not haystack or not needle:
        return False
    return f" {needle} " in f" {haystack} "


def value_to_strings(value):
    values = []

    def walk(item):
        if item is None:
            return

        if isinstance(item, str):
            if item.strip():
                values.append(item.strip())
            return

        if isinstance(item, (int, float)):
            values.append(str(item))
            return

        if isinstance(item, list):
            for child in item:
                walk(child)
            return

        if isinstance(item, dict):
            if "value" in item:
                walk(item.get("value"))
                return

            if "display_value" in item:
                walk(item.get("display_value"))

            for key in ("name", "displayname", "label", "title"):
                if key in item:
                    walk(item.get(key))

            for key in ("en", "none", "pl"):
                if key in item:
                    walk(item.get(key))

    walk(value)
    return values


class Command(BaseCommand):
    help = (
        "Link Context resources to IIIF and 3D Digital Resources by matching "
        "context labels/numbers inside media resource names."
    )

    media_configs = {
        "iiif": {
            "label": "IIIF",
            "graph_id": IIIF_GRAPH_ID,
            "name_node_id": IIIF_LABEL_NODE_ID,
            "related_node_id": IIIF_RELATED_NODE_ID,
        },
        "3d": {
            "label": "3D",
            "graph_id": DIGITAL_RESOURCE_3D_GRAPH_ID,
            "name_node_id": DIGITAL_RESOURCE_3D_NAME_NODE_ID,
            "related_node_id": DIGITAL_RESOURCE_3D_RELATED_NODE_ID,
        },
    }

    def add_arguments(self, parser):
        parser.add_argument(
            "--apply",
            action="store_true",
            default=False,
            help="Write relation tiles. Default is dry-run.",
        )
        parser.add_argument(
            "--replace-existing",
            action="store_true",
            default=False,
            help="Replace existing relation values on matched IIIF/3D resources.",
        )
        parser.add_argument(
            "--media-type",
            choices=("all", "iiif", "3d"),
            default="all",
            help="Limit linking to one media graph.",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=0,
            help="Limit processed media resources per type. 0 means no limit.",
        )
        parser.add_argument(
            "--verbose",
            action="store_true",
            default=False,
            help="Print every matched, ambiguous, and unmatched media resource.",
        )
        parser.add_argument(
            "--context-graph-id",
            default=CONTEXT_GRAPH_ID,
            help="Context graph id.",
        )
        parser.add_argument(
            "--context-number-node-id",
            default=CONTEXT_NUMBER_NODE_ID,
            help="Context number/name node id used as the strongest match key.",
        )

    def handle(self, *args, **options):
        do_apply = options["apply"]
        replace_existing = options["replace_existing"]
        media_type = options["media_type"]
        limit = options["limit"]
        verbose = options["verbose"]
        context_graph_id = options["context_graph_id"]
        context_number_node_id = options["context_number_node_id"]

        mode = "APPLY" if do_apply else "DRY-RUN"
        self.stdout.write(f"Context/media linker [{mode}]")
        if replace_existing:
            self.stdout.write("Existing relation values will be replaced for matched resources.")
        self.stdout.write("")

        self._validate_node(context_number_node_id, context_graph_id, "Context number")
        selected_media = {
            key: config
            for key, config in self.media_configs.items()
            if media_type == "all" or media_type == key
        }
        for config in selected_media.values():
            self._validate_node(config["name_node_id"], config["graph_id"], f"{config['label']} name")
            self._validate_node(config["related_node_id"], config["graph_id"], f"{config['label']} related resource")

        context_infos = self._load_resource_infos(
            graph_id=context_graph_id,
            key_node_id=context_number_node_id,
            is_context=True,
        )
        if not context_infos:
            raise CommandError(f"No Context resources found for graph {context_graph_id}")

        self.stdout.write(f"Loaded Context resources: {len(context_infos)}")

        context_keys = []
        for info in context_infos:
            for key in info.keys:
                context_keys.append((key, info))

        context_keys.sort(key=lambda item: len(item[0]), reverse=True)

        totals = Counter()
        pending = []

        for media_key, config in selected_media.items():
            media_infos = self._load_resource_infos(
                graph_id=config["graph_id"],
                key_node_id=config["name_node_id"],
                is_context=False,
                limit=limit,
            )
            self.stdout.write(f"{config['label']} resources scanned: {len(media_infos)}")

            for media_info in media_infos:
                result = self._match_media_to_context(media_info, context_keys)
                totals[result.status] += 1

                if result.status == "matched":
                    pending.append((config, result))

                if verbose or result.status != "matched":
                    self._print_match_result(config["label"], result)

        updated = []
        ctx = transaction.atomic() if do_apply else nullcontext()
        with ctx:
            for config, result in pending:
                if not result.context:
                    continue

                if do_apply:
                    tile_id, changed = self._upsert_relation(
                        media_resource=result.media.resource,
                        related_node_id=config["related_node_id"],
                        context_resource_id=result.context.resource_id,
                        replace_existing=replace_existing,
                    )
                else:
                    tile_id = ""
                    changed = replace_existing or not self._relation_already_present(
                        media_resource=result.media.resource,
                        related_node_id=config["related_node_id"],
                        context_resource_id=result.context.resource_id,
                    )

                status_key = "would_update" if not do_apply else "updated"
                if not changed:
                    status_key = "already_linked"

                totals[status_key] += 1
                updated.append((config["label"], result, tile_id, changed))

        self.stdout.write("")
        self.stdout.write("Summary:")
        for key in ("matched", "ambiguous", "unmatched", "would_update", "updated", "already_linked"):
            self.stdout.write(f"  {key}: {totals[key]}")

        if verbose and updated:
            self.stdout.write("")
            self.stdout.write("Updates:")
            for label, result, tile_id, changed in updated:
                verb = "changed" if changed else "already linked"
                self.stdout.write(
                    f"  {label} {result.media.resource_id} -> Context {result.context.resource_id} "
                    f"by {result.key!r}: {verb}"
                    + (f" tile={tile_id}" if tile_id else "")
                )

        if not do_apply:
            self.stdout.write("")
            self.stdout.write("Dry-run only. Add --apply to write relation tiles.")

    def _validate_node(self, node_id, graph_id, label):
        try:
            Node.objects.get(nodeid=node_id, graph_id=graph_id)
        except Node.DoesNotExist as exc:
            raise CommandError(f"{label} node {node_id} was not found in graph {graph_id}") from exc

    def _load_resource_infos(self, graph_id, key_node_id, is_context, limit=0):
        resources = list(Resource.objects.filter(graph_id=graph_id).order_by("resourceinstanceid"))
        if limit:
            resources = resources[:limit]

        infos = {
            str(resource.resourceinstanceid): ResourceInfo(
                resource=resource,
                graph_id=str(resource.graph_id),
            )
            for resource in resources
        }

        for info in infos.values():
            self._add_resource_descriptor_labels(info)

        if infos:
            tiles = Tile.objects.filter(
                resourceinstance_id__in=list(infos.keys()),
                data__has_key=key_node_id,
            )
            for tile in tiles.iterator(chunk_size=200):
                info = infos.get(str(tile.resourceinstance_id))
                if not info:
                    continue
                for value in value_to_strings((tile.data or {}).get(key_node_id)):
                    info.labels.add(value)

        for info in infos.values():
            info.labels = {label for label in info.labels if label}
            info.best_label = self._best_label(info)
            if is_context:
                info.keys = self._context_match_keys(info)
            else:
                info.keys = {normalize_text(label) for label in info.labels if normalize_text(label)}

        return list(infos.values())

    def _add_resource_descriptor_labels(self, info):
        resource = info.resource

        try:
            display_name = resource.displayname()
            if display_name:
                info.labels.add(display_name)
        except Exception:
            pass

        for value in value_to_strings(getattr(resource, "name", None)):
            info.labels.add(value)

        descriptors = getattr(resource, "descriptors", None) or {}
        for value in value_to_strings(descriptors):
            info.labels.add(value)

    def _best_label(self, info):
        labels = sorted(info.labels, key=lambda label: (-len(str(label)), str(label)))
        return labels[0] if labels else info.resource_id

    def _context_match_keys(self, info):
        keys = set()
        for label in info.labels:
            normalized = normalize_text(label)
            if not normalized:
                continue

            keys.add(normalized)
            if not normalized.startswith("context "):
                keys.add(f"context {normalized}")

            if len(normalized) >= 3:
                keys.add(normalized)

        return {
            key
            for key in keys
            if len(key) >= 3 or (re.search(r"[a-z]", key) and re.search(r"[0-9]", key))
        }

    def _match_media_to_context(self, media_info, context_keys):
        media_labels = [normalize_text(label) for label in media_info.labels]
        media_labels = [label for label in media_labels if label]

        matches = defaultdict(set)
        for media_label in media_labels:
            for key, context_info in context_keys:
                if contains_phrase(media_label, key):
                    matches[context_info.resource_id].add(key)

        if not matches:
            return MatchResult(media=media_info, context=None, status="unmatched")

        ranked = []
        for context_id, keys in matches.items():
            longest_key = max(keys, key=len)
            ranked.append((len(longest_key), longest_key, context_id))
        ranked.sort(reverse=True)

        if len(ranked) > 1 and ranked[0][0] == ranked[1][0]:
            return MatchResult(media=media_info, context=None, key=ranked[0][1], status="ambiguous")

        winning_context_id = ranked[0][2]
        winning_context = next(
            context_info
            for _key, context_info in context_keys
            if context_info.resource_id == winning_context_id
        )
        return MatchResult(
            media=media_info,
            context=winning_context,
            key=ranked[0][1],
            status="matched",
        )

    def _upsert_relation(self, media_resource, related_node_id, context_resource_id, replace_existing):
        rel_node = Node.objects.get(nodeid=related_node_id)
        nodegroup_id = str(rel_node.nodegroup_id)

        tile = Tile.objects.filter(
            resourceinstance=media_resource,
            data__has_key=related_node_id,
        ).order_by("-sortorder").first()

        if not tile:
            tile = Tile.objects.filter(
                resourceinstance=media_resource,
                nodegroup_id=nodegroup_id,
            ).order_by("-sortorder").first()

        if not tile:
            tile = Tile.get_blank_tile_from_nodegroup_id(
                nodegroup_id,
                resourceid=str(media_resource.resourceinstanceid),
            )

        if not isinstance(tile.data, dict):
            tile.data = {}

        existing = tile.data.get(related_node_id)
        existing_values = existing if isinstance(existing, list) else []

        if not replace_existing:
            for relation in existing_values:
                if isinstance(relation, dict) and relation.get("resourceId") == context_resource_id:
                    changed = self._sync_resource_x_resource(
                        media_resource=media_resource,
                        context_resource_id=context_resource_id,
                        tile=tile,
                        node=rel_node,
                        relation=relation,
                    )
                    if changed:
                        tile.save()
                    return str(tile.tileid), changed
            relation_values = list(existing_values)
            relation_values.append(self._relation_value(context_resource_id))
        else:
            relation_values = [self._relation_value(context_resource_id)]

        tile.data[related_node_id] = relation_values
        tile.save()
        for relation in relation_values:
            if isinstance(relation, dict) and relation.get("resourceId") == context_resource_id:
                self._sync_resource_x_resource(
                    media_resource=media_resource,
                    context_resource_id=context_resource_id,
                    tile=tile,
                    node=rel_node,
                    relation=relation,
                )
        return str(tile.tileid), True

    def _relation_already_present(self, media_resource, related_node_id, context_resource_id):
        rel_node = Node.objects.get(nodeid=related_node_id)
        tile = Tile.objects.filter(
            resourceinstance=media_resource,
            data__has_key=related_node_id,
        ).order_by("-sortorder").first()

        if not tile:
            return False

        existing = (tile.data or {}).get(related_node_id)
        if not isinstance(existing, list):
            return False

        for relation in existing:
            if isinstance(relation, dict) and relation.get("resourceId") == context_resource_id:
                return self._resource_x_resource_present(
                    media_resource=media_resource,
                    context_resource_id=context_resource_id,
                    tile=tile,
                    node=rel_node,
                    relation=relation,
                )

        return False

    def _resource_x_resource_present(self, media_resource, context_resource_id, tile, node, relation):
        filters = {
            "from_resource": media_resource,
            "to_resource_id": context_resource_id,
            "tile": tile,
            "node": node,
        }
        resource_x_resource_id = relation.get("resourceXresourceId")
        if resource_x_resource_id:
            return ResourceXResource.objects.filter(resourcexid=resource_x_resource_id, **filters).exists()

        return ResourceXResource.objects.filter(**filters).exists()

    def _sync_resource_x_resource(self, media_resource, context_resource_id, tile, node, relation):
        existing = None
        resource_x_resource_id = relation.get("resourceXresourceId")
        if resource_x_resource_id:
            existing = ResourceXResource.objects.filter(resourcexid=resource_x_resource_id).first()

        if not existing:
            existing = ResourceXResource.objects.filter(
                from_resource=media_resource,
                to_resource_id=context_resource_id,
                tile=tile,
                node=node,
            ).first()

        context_resource = Resource.objects.get(resourceinstanceid=context_resource_id)

        if existing:
            changed = False
            existing_values = {
                "from_resource_id": str(existing.from_resource_id),
                "from_resource_graph_id": str(existing.from_resource_graph_id),
                "to_resource_id": str(existing.to_resource_id),
                "to_resource_graph_id": str(existing.to_resource_graph_id),
                "tile_id": str(existing.tile_id),
                "node_id": str(existing.node_id),
                "relationshiptype": existing.relationshiptype or "",
                "inverserelationshiptype": existing.inverserelationshiptype or "",
            }
            expected_values = {
                "from_resource_id": str(media_resource.resourceinstanceid),
                "from_resource_graph_id": str(media_resource.graph_id),
                "to_resource_id": str(context_resource.resourceinstanceid),
                "to_resource_graph_id": str(context_resource.graph_id),
                "tile_id": str(tile.tileid),
                "node_id": str(node.nodeid),
                "relationshiptype": relation.get("ontologyProperty") or "",
                "inverserelationshiptype": relation.get("inverseOntologyProperty") or "",
            }

            for field, expected_value in expected_values.items():
                if existing_values[field] != expected_value:
                    setattr(existing, field, expected_value or None)
                    changed = True

            if relation.get("resourceXresourceId") != str(existing.resourcexid):
                relation["resourceXresourceId"] = str(existing.resourcexid)
                changed = True

            if changed:
                existing.save()
            return changed

        if not resource_x_resource_id:
            resource_x_resource_id = str(uuid4())
            relation["resourceXresourceId"] = resource_x_resource_id

        ResourceXResource.objects.create(
            resourcexid=resource_x_resource_id,
            from_resource=media_resource,
            from_resource_graph_id=media_resource.graph_id,
            to_resource=context_resource,
            to_resource_graph_id=context_resource.graph_id,
            relationshiptype=relation.get("ontologyProperty") or None,
            inverserelationshiptype=relation.get("inverseOntologyProperty") or None,
            tile=tile,
            node=node,
        )
        return True

    def _relation_value(self, resource_id):
        return {
            "resourceId": resource_id,
            "ontologyProperty": "",
            "inverseOntologyProperty": "",
            "resourceXresourceId": str(uuid4()),
        }

    def _print_match_result(self, label, result):
        media_label = result.media.best_label
        if result.status == "matched":
            self.stdout.write(
                f"  MATCH {label}: {media_label!r} -> {result.context.best_label!r} by {result.key!r}"
            )
            return

        self.stdout.write(
            f"  {result.status.upper()} {label}: {media_label!r} ({result.media.resource_id})"
        )
