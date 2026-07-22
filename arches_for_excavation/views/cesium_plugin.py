from django.views import View
from django.http import JsonResponse
from arches.app.models.models import Resource

from arches_slocal.utils.resource_model_compat import graph_ids, node_id


class Models3DAccessView(View):
    DIGITAL_RESOURCE_3D_GRAPH_IDS = graph_ids("digital_resource_3d")

    def get(self, request):
        resources = Resource.objects.filter(
            graph_id__in=self.DIGITAL_RESOURCE_3D_GRAPH_IDS
        ).distinct()

        results = []
        for resource in resources:
            tiles = resource.tilemodel_set.all()

            def _get_node_value(field_name):
                field_node_id = node_id(
                    "digital_resource_3d",
                    field_name,
                    resource.graph_id,
                )
                if not field_node_id:
                    return None
                for tile in tiles:
                    if field_node_id in tile.data:
                        return tile.data[field_node_id]
                return None

            descriptors = resource.descriptors or {}
            en_descriptors = descriptors.get("en", {})

            model_info = {
                "resource_id": str(resource.resourceinstanceid),
                "name": en_descriptors.get("name", "Unnamed Model"),
                "url": _get_node_value("url"),
                "georeferenced": bool(_get_node_value("georeferenced")),
                "description": en_descriptors.get("description", ""),
            }
            results.append(model_info)

        return JsonResponse({"models": results})
