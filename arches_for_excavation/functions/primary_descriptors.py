import re
import uuid

from django.utils.translation import gettext as _

from arches.app.datatypes.datatypes import DataTypeFactory
from arches.app.functions.primary_descriptors import PrimaryDescriptorsFunction
from arches.app.models import models


details = {
    "name": "Multi-card Resource Descriptors",
    "functionid": "a40cb2ac-7a0a-4d3f-a843-92cfdb6cd4de",
    "type": "primarydescriptors",
    "description": (
        "Generates resource descriptors from nodes located in different cards, "
        "including ordered fallback nodes."
    ),
    "defaultconfig": {
        "descriptor_types": {
            "name": {
                "nodegroup_id": "",
                "string_template": "",
                "source_nodes": {},
            },
            "description": {
                "nodegroup_id": "",
                "string_template": "",
            },
            "map_popup": {
                "nodegroup_id": "",
                "string_template": "",
            },
        }
    },
    "classname": "MultiCardPrimaryDescriptorsFunction",
    # Używamy istniejącego interfejsu Arches, więc nie trzeba tworzyć JS i HTML.
    "component": "views/components/functions/primary-descriptors",
}


class MultiCardPrimaryDescriptorsFunction(PrimaryDescriptorsFunction):
    TRENCH_NODE_ID = uuid.UUID("13e52ba6-b14d-41de-9a09-8bd1186edc10")
    CONTEXT_NUMBER_NODE_ID = uuid.UUID("cf7f2532-74f3-487f-9261-bf27825fe04c")

    def _get_tile_data(self, tile):
        """Return normal or provisional tile data."""
        if tile is None:
            return {}

        if tile.data:
            return tile.data

        provisional_edits = tile.provisionaledits or {}

        if len(provisional_edits) == 1:
            user_id = next(iter(provisional_edits))
            return provisional_edits[user_id].get("value", {})

        return {}

    @staticmethod
    def _get_node(node_id):
        try:
            return models.Node.objects.get(nodeid=node_id)
        except (models.Node.DoesNotExist, ValueError, TypeError):
            return None

    def _get_tiles_for_node(self, resource, node, context):
        """Return a node's tiles, preferring the tile currently being saved."""
        context = context or {}
        current_tile = context.get("tile")
        tiles = []
        if current_tile is not None and current_tile.nodegroup_id == node.nodegroup_id:
            tiles.append(current_tile)

        persisted_tiles = models.TileModel.objects.filter(
            resourceinstance_id=resource.resourceinstanceid,
            nodegroup_id=node.nodegroup_id,
        ).order_by("sortorder")
        for tile in persisted_tiles:
            if current_tile is None or tile.tileid != current_tile.tileid:
                tiles.append(tile)
        return tiles

    def _get_display_value_from_tile(self, tile, node, language):
        data = self._get_tile_data(tile)
        if str(node.nodeid) not in data:
            return ""

        datatype = DataTypeFactory().get_instance(node.datatype)
        value = datatype.get_display_value(tile, node, language=language)
        return "" if value is None else str(value).strip()

    def _get_display_value(self, resource, node_id, context=None):
        return self._get_display_value_with_filters(resource, node_id, context)

    def _get_display_value_with_filters(
        self,
        resource,
        node_id,
        context=None,
        filters=None,
    ):
        context = context or {}
        node = self._get_node(node_id)
        if node is None:
            return ""

        for tile in self._get_tiles_for_node(resource, node, context):
            if not self._tile_matches_filters(tile, filters, context.get("language")):
                continue
            value = self._get_display_value_from_tile(
                tile,
                node,
                context.get("language"),
            )
            if value:
                return value
        return ""

    def _tile_matches_filters(self, tile, filters, language):
        """Check values stored on the same card as a descriptor source node."""
        for item in filters or []:
            node = self._get_node(item.get("node_id"))
            if node is None:
                return False

            actual = self._get_display_value_from_tile(tile, node, language)
            expected = item.get("values", item.get("value", []))
            if isinstance(expected, str):
                expected = [expected]
            if not any(
                actual.casefold() == str(value).strip().casefold()
                for value in expected or []
            ):
                return False
        return True

    def _get_first_display_value(self, resource, source, context):
        if isinstance(source, dict):
            node_ids = source.get("node_ids", source.get("nodes", []))
            filters = source.get("filters", [])
        else:
            node_ids = source
            filters = []
        if isinstance(node_ids, str):
            node_ids = [node_ids]
        for node_id in node_ids or []:
            value = self._get_display_value_with_filters(
                resource,
                node_id,
                context,
                filters,
            )
            if value:
                return value
        return ""

    def _render_multicard_template(self, resource, descriptor_config, context):
        sources = descriptor_config.get("source_nodes") or {}
        if not sources:
            return None

        rendered = descriptor_config.get("string_template") or ""
        has_value = False
        for variable, node_ids in sources.items():
            value = self._get_first_display_value(resource, node_ids, context)
            has_value = has_value or bool(value)
            rendered = re.sub(
                r"<\s*{}\s*>".format(re.escape(variable)),
                value,
                rendered,
            )

        rendered = re.sub(r"<[^>]+>", "", rendered)
        return re.sub(r"\s+", " ", rendered).strip() if has_value else ""

    def get_primary_descriptor_from_nodes(
        self,
        resource,
        config,
        context=None,
        descriptor=None,
    ):
        # Arches passes config for this descriptor directly, not the complete
        # FunctionXGraph configuration.
        rendered = self._render_multicard_template(resource, config or {}, context)
        if rendered is not None:
            if rendered or descriptor != "name":
                return rendered
            return _("Undefined")

        if descriptor != "name":
            return super().get_primary_descriptor_from_nodes(
                resource=resource,
                config=config,
                context=context,
                descriptor=descriptor,
            )

        trench = self._get_display_value(
            resource,
            self.TRENCH_NODE_ID,
            context,
        )

        context_number = self._get_display_value(
            resource,
            self.CONTEXT_NUMBER_NODE_ID,
            context,
        )

        parts = [
            value
            for value in (trench, context_number)
            if value
        ]

        if not parts:
            return _("Undefined")

        return "_".join(parts)