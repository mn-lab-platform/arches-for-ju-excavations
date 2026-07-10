from django.views import View
from django.http import JsonResponse
from arches.app.models.models import Resource, TileModel

class Models3DAccessView(View):
    DIGITAL_RESOURCE_3D_GRAPH_ID = "5465389c-bba7-4af1-bc9a-9fbb201e8408"
    GEOREFERENCED_NODE_ID = "6f57cc4e-3c15-4483-8517-753a999ac448"
    URL_NODE_ID = "5c156476-b54c-4e7b-80b2-005667812d4e"

    def get(self, request):
        resources = Resource.objects.filter(
            graph_id=self.DIGITAL_RESOURCE_3D_GRAPH_ID
        ).distinct()

        results = []
        for resource in resources:
            tiles = resource.tilemodel_set.all()
            
            def _get_node_value(node_id):
                for tile in tiles:
                    if node_id in tile.data:
                        return tile.data[node_id]
                return None
            
            descriptors = resource.descriptors or {}
            en_descriptors = descriptors.get('en', {})
            
            model_info = {
                "resource_id": str(resource.resourceinstanceid),
                "name": en_descriptors.get('name', 'Unnamed Model'),
                "url": _get_node_value(self.URL_NODE_ID),
                "georeferenced": bool(_get_node_value(self.GEOREFERENCED_NODE_ID)),
                "description": en_descriptors.get('description', '')
            }
            results.append(model_info)

        return JsonResponse({"models": results})
