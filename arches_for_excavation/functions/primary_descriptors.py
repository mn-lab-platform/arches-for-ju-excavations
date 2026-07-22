import uuid

from django.utils.translation import gettext as _

from arches.app.datatypes.datatypes import DataTypeFactory
from arches.app.functions.primary_descriptors import PrimaryDescriptorsFunction
from arches.app.models import models


details = {
    "name": "Multi-card Resource Descriptors",
    "type": "primarydescriptors",
    "description": (
        "Generates a resource name using nodes located in different cards."
    ),
    "defaultconfig": {
        "descriptor_types": {
            "name": {
                "nodegroup_id": "",
                "string_template": "<Trench>_<Context Number>",
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

    def _get_display_value(self, resource, node_id, context=None):
        context = context or {}
        language = context.get("language")

        try:
            node = models.Node.objects.get(nodeid=node_id)
        except models.Node.DoesNotExist:
            return ""

        current_tile = context.get("tile")
        tile = None
        if (
            current_tile is not None
            and current_tile.nodegroup_id == node.nodegroup_id
            and not current_tile.sortorder
        ):
            tile = current_tile

        if tile is None:
            tile = (
                models.TileModel.objects
                .filter(
                    resourceinstance_id=resource.resourceinstanceid,
                    nodegroup_id=node.nodegroup_id,
                )
                .order_by("sortorder")
                .first()
            )

        if tile is None:
            return ""

        data = self._get_tile_data(tile)

        if str(node.nodeid) not in data:
            return ""

        datatype_factory = DataTypeFactory()
        datatype = datatype_factory.get_instance(node.datatype)

        value = datatype.get_display_value(
            tile,
            node,
            language=language,
        )

        if value is None:
            return ""

        return str(value).strip()

    def get_primary_descriptor_from_nodes(
        self,
        resource,
        config,
        context=None,
        descriptor=None,
    ):
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