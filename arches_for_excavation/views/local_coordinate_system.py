from django.views import View
from django.http import HttpResponse, JsonResponse
from django.utils.text import get_valid_filename

from arches.app.models.models import Resource
from arches.app.models.models import Node
from arches.app.models.tile import Tile

import json

import numpy as np
from uuid import uuid4
from .services.iiif_utils import _resolve_manifest_path_and_current, _atomic_write_json

from ..views.services.crs.local_mercator.from_2_points import estimate_local_mercator_2_points

class CRSNodeIds:
    GRAPH_ID = "a5219c24-2907-4055-9d68-18216d214458"
    NAME_NODE_ID = "d52b7c0c-c948-43ab-896d-30b266416d6b"
    DESCRIPTION_NODE_ID = "32d0c83f-7de5-4389-8b8d-84c0fca12f6b"
    ORIGIN_LOCAL_X_NODE_ID = "2e5bd906-cdf4-4d6d-9b6d-502e66ff146b"
    ORIGIN_LOCAL_Y_NODE_ID = "6354545f-a37c-4502-b6cc-a76c04b8223d"
    ORIGIN_LONGITUDE_NODE_ID = "fb65c048-399b-4fdd-8ea8-9ceafcaacb8c"
    ORIGIN_LATITUDE_NODE_ID = "2cbd84ea-2a4d-4e7f-b956-e0af814a6b80"
    DIRECTION_LONGITUDE_NODE_ID = "773938c1-2334-4954-a66a-0bc56c5e74a3"
    DIRECTION_LATITUDE_NODE_ID = "5c42db2f-d64b-4dc0-87a7-b27796405283"
    WKT2_STRING_NODE_ID = "fd7658d3-9e61-4ff3-b644-7edd9d458a9c"
    WKT2_DOWNLOAD_NODE_ID = "eb3fe0ad-42d6-406e-a377-22de76262941"
    ESRI_WKT_STRING_NODE_ID = "fc23448e-7ab8-4e02-9848-73e3103a4423"
    ESRI_WKT_DOWNLOAD_NODE_ID = "70ec772d-7b91-4ab7-86a1-70f94d605841"
    PROJ4_STRING_NODE_ID = "6caa2759-1a2b-4561-b3f4-9bbde19a9e8b"
    PROJ4_DOWNLOAD_NODE_ID = "a45eba3a-2caa-4fb1-8d37-766d03128e63"

class CRSShorthands:
    WKT2 = "wkt2"
    ESRI_WKT = "esri_wkt"
    PROJ4 = "proj4"

class LocalCoordinateSystemDefineView(View):
    def _get_crs_definitions(self, origin_point_local: np.ndarray, origin_point_global: np.ndarray, direction_point_global: np.ndarray, name: str):
        local_mercator = estimate_local_mercator_2_points(origin_point_local, origin_point_global, 
                                                            direction_point_global, name)
        return local_mercator.to_wkt2_string(), local_mercator.to_esri_wkt_string(), local_mercator.to_proj4_string()

    def _populate_resource_tiles(self, resource: Resource, data: dict):
        try: 
            tiles_by_nodegroup = {}

            for node_id, value in data.items():
                node = Node.objects.get(nodeid=node_id)
                nodegroup_id = str(node.nodegroup_id)
                
                if nodegroup_id not in tiles_by_nodegroup:
                    tiles_by_nodegroup[nodegroup_id] = Tile.get_blank_tile_from_nodegroup_id(
                        nodegroup_id, 
                        resourceid=str(resource.resourceinstanceid) 
                    )
                
                tiles_by_nodegroup[nodegroup_id].data[node_id] = value

            for tile in tiles_by_nodegroup.values():
                tile.save()
        except Exception as e:
            print(f"Error populating resource tiles: {e}")
            raise
    
    def _create_download_tile_value(self, resource_id: str, node_id: str):
        definitions = {
            CRSNodeIds.WKT2_DOWNLOAD_NODE_ID:    (CRSShorthands.WKT2,    "WKT2",    ".prj"),
            CRSNodeIds.ESRI_WKT_DOWNLOAD_NODE_ID: (CRSShorthands.ESRI_WKT, "ESRI WKT", ".prj"),
            CRSNodeIds.PROJ4_DOWNLOAD_NODE_ID:   (CRSShorthands.PROJ4,   "PROJ4",   ".txt"),
        }
        meta = definitions.get(node_id)
        if not meta:
            return {
                "url": "",
                "url_label": "Unknown definition type"
            }

        shorthand, title, extension = meta
        api_path = f"/api/local-coordinate-system/{resource_id}/download/{shorthand}"
        
        js_bypass_url = f"javascript:window.open('{api_path}', '_blank');"
        
        return {
            "url": js_bypass_url,
            "url_label": f"Download {title} definition file ({extension})"
        }

    def post(self, request):
        name = request.POST.get("name")
        description = request.POST.get("description")

        origin_local_x = float(request.POST.get("origin_local_x"))
        origin_local_y = float(request.POST.get("origin_local_y"))
        origin_point_local = np.float64([origin_local_x, origin_local_y])

        origin_longitude = float(request.POST.get("origin_longitude"))
        origin_latitude = float(request.POST.get("origin_latitude"))
        origin_point_global = np.float64([origin_longitude, origin_latitude])

        direction_longitude = float(request.POST.get("direction_longitude"))
        direction_latitude = float(request.POST.get("direction_latitude"))
        direction_point_global = np.float64([direction_longitude, direction_latitude])

        try:
            wkt2, esri_wkt, proj4 = self._get_crs_definitions(
                origin_point_local, origin_point_global, direction_point_global, name
            )
            
            resource = Resource.objects.create(graph_id=CRSNodeIds.GRAPH_ID)
            resource_id = str(resource.resourceinstanceid)

            local_crs_resource_data = {
                CRSNodeIds.NAME_NODE_ID: name,
                CRSNodeIds.DESCRIPTION_NODE_ID: description,
                CRSNodeIds.WKT2_STRING_NODE_ID: wkt2,
                CRSNodeIds.WKT2_DOWNLOAD_NODE_ID: self._create_download_tile_value(resource_id, CRSNodeIds.WKT2_DOWNLOAD_NODE_ID),
                CRSNodeIds.ESRI_WKT_STRING_NODE_ID: esri_wkt,
                CRSNodeIds.ESRI_WKT_DOWNLOAD_NODE_ID: self._create_download_tile_value(resource_id, CRSNodeIds.ESRI_WKT_DOWNLOAD_NODE_ID),
                CRSNodeIds.PROJ4_STRING_NODE_ID: proj4,
                CRSNodeIds.PROJ4_DOWNLOAD_NODE_ID: self._create_download_tile_value(resource_id, CRSNodeIds.PROJ4_DOWNLOAD_NODE_ID),
                CRSNodeIds.ORIGIN_LOCAL_X_NODE_ID: origin_local_x,
                CRSNodeIds.ORIGIN_LOCAL_Y_NODE_ID: origin_local_y,
                CRSNodeIds.ORIGIN_LONGITUDE_NODE_ID: origin_longitude,
                CRSNodeIds.ORIGIN_LATITUDE_NODE_ID: origin_latitude,
                CRSNodeIds.DIRECTION_LONGITUDE_NODE_ID: direction_longitude,
                CRSNodeIds.DIRECTION_LATITUDE_NODE_ID: direction_latitude,
            }

            self._populate_resource_tiles(resource, local_crs_resource_data)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

        return JsonResponse({
            "status": "success",
            "resource_id": resource_id,
            "message": f"Created CRS: {name}"
        }, status=201)
        
class LocalCoordinateSystemDownloadView(View):
    def _get_node_id_for_definition_type(self, definition_type: str):
        node_id_map = {
            CRSShorthands.WKT2: CRSNodeIds.WKT2_STRING_NODE_ID,
            CRSShorthands.ESRI_WKT: CRSNodeIds.ESRI_WKT_STRING_NODE_ID,
            CRSShorthands.PROJ4: CRSNodeIds.PROJ4_STRING_NODE_ID
        }
        return node_id_map.get(definition_type)
        
    def _get_extension_for_definition_type(self, definition_type: str):
        extension_map = {
            CRSShorthands.WKT2: "prj",
            CRSShorthands.ESRI_WKT: "prj",
            CRSShorthands.PROJ4: "txt"
        }
        return extension_map.get(definition_type, "txt")

    def _get_crs_definition(self, resource: Resource, node_id: str):
        tile = self.query_tile_by_resource_and_node_id(resource, node_id)

        if not tile or node_id not in tile.data:
            return None

        return tile.data[node_id]
    
    def _get_resource_name(self, resource: Resource):
        name_tile = self.query_tile_by_resource_and_node_id(resource, CRSNodeIds.NAME_NODE_ID)
        
        if not name_tile or CRSNodeIds.NAME_NODE_ID not in name_tile.data:
            return "local_coordinate_system"

        return get_valid_filename(name_tile.data[CRSNodeIds.NAME_NODE_ID])

    def query_tile_by_resource_and_node_id(self, resource: Resource, node_id: str):
        return Tile.objects.filter(
            resourceinstance=resource,
            data__has_key=node_id
        ).first()
    
    def get(self, request, resource_id: str, definition_type: str):
        if not resource_id or not definition_type:
            return HttpResponse("Missing resource_id or definition_type", status=400)
        
        if definition_type not in [CRSShorthands.WKT2, CRSShorthands.ESRI_WKT, CRSShorthands.PROJ4]:
            return HttpResponse("Invalid definition_type", status=400)

        try: 
            resource = Resource.objects.get(
                resourceinstanceid=resource_id,
                graph_id=CRSNodeIds.GRAPH_ID
            )
        except Resource.DoesNotExist:
            return HttpResponse("Resource not found", status=404)
        
        node_id = self._get_node_id_for_definition_type(definition_type)

        file_extension = self._get_extension_for_definition_type(definition_type)

        try:
            definition = self._get_crs_definition(resource, node_id)
            if not definition:
                return HttpResponse("CRS definition not found for the specified type", status=404)

            resource_name = self._get_resource_name(resource)

            response = HttpResponse(definition, content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{resource_name}_{definition_type}.{file_extension}"'
            response['Content-Length'] = len(definition.encode('utf-8'))

            return response
        except Exception as e:
            return HttpResponse(f"Error retrieving CRS definition: {e}", status=500)



class LocalCoordinateSystemAssignToResourcesView(View):
    IIIF_GRAPH_ID = "401b3051-d1c4-465c-8dd0-1d5784adee98"
    LOCAL_CRS_NODE_ID = "b5feba58-b75c-46da-9703-fef9b6d26217"

    def _get_local_crs_node(self):
        """
        Strict lookup by known nodeid.
        """
        return Node.objects.get(
            nodeid=self.LOCAL_CRS_NODE_ID,
            graph_id=self.IIIF_GRAPH_ID
        )

    def _upsert_local_crs_relation_tile(self, resource: Resource, rel_node: Node, crs_resource_id: str):
        """
        Upsert relation value in node local_crs_resource (resource-instance-list/resource-instance).
        """
        node_id = str(rel_node.nodeid)
        nodegroup_id = str(rel_node.nodegroup_id)

        relation_value = [{
            "resourceId": crs_resource_id,
            "ontologyProperty": "",
            "inverseOntologyProperty": "",
            "resourceXresourceId": str(uuid4())
        }]

        tile = Tile.objects.filter(
            resourceinstance=resource,
            data__has_key=node_id
        ).order_by("-sortorder").first()

        if not tile:
            tile = Tile.get_blank_tile_from_nodegroup_id(
                nodegroup_id,
                resourceid=str(resource.resourceinstanceid)
            )

        if not isinstance(tile.data, dict):
            tile.data = {}

        tile.data[node_id] = relation_value
        tile.save()
        return str(tile.tileid)

    def _upsert_manifest_metadata(self, resource_id: str, crs_resource_id: str):
        """
        Adds/updates metadata in IIIF manifest for selected resource.
        """
        path, current, _resolved_name = _resolve_manifest_path_and_current(
            resource_id=str(resource_id),
            resource_name=None,
            current=None
        )

        if current is None:
            return False, "manifest not found"

        metadata = current.get("metadata")
        if not isinstance(metadata, list):
            metadata = []
            current["metadata"] = metadata

        def _lang_first(v):
            if isinstance(v, str):
                return v
            if isinstance(v, dict):
                for lang in ("en", "none"):
                    arr = v.get(lang)
                    if isinstance(arr, list) and arr:
                        return str(arr[0])
            return ""

        def _set_meta(key: str, value: str):
            for row in metadata:
                if not isinstance(row, dict):
                    continue
                k = _lang_first(row.get("label", {})).strip().lower()
                if k == key.lower():
                    row["value"] = {"en": [str(value)]}
                    return
            metadata.append({
                "label": {"en": [key]},
                "value": {"en": [str(value)]}
            })

        _set_meta("local_crs_resource_id", crs_resource_id)
        _set_meta("georeferencing_method", "local_mercator_2_points")

        _atomic_write_json(path, current)
        return True, None

    def post(self, request):
        try:
            payload = json.loads(request.body or "{}")
            crs_resource_id = payload.get("crs_resource_id")
            resource_ids = payload.get("resource_ids", [])

            if not crs_resource_id or not isinstance(resource_ids, list) or len(resource_ids) == 0:
                return JsonResponse({"status": "error", "message": "Invalid payload"}, status=400)

            # Validate CRS resource exists in CRS graph
            try:
                Resource.objects.get(
                    resourceinstanceid=crs_resource_id,
                    graph_id=CRSNodeIds.GRAPH_ID
                )
            except Resource.DoesNotExist:
                return JsonResponse(
                    {"status": "error", "message": "CRS resource not found"},
                    status=404
                )

            try:
                rel_node = self._get_local_crs_node()
            except Node.DoesNotExist:
                return JsonResponse(
                    {
                        "status": "error",
                        "message": f"Node '{self.LOCAL_CRS_NODE_ID}' not found in IIIF graph."
                    },
                    status=400
                )

            updated = []
            failed = []

            for rid in resource_ids:
                try:
                    resource = Resource.objects.get(
                        resourceinstanceid=rid,
                        graph_id=self.IIIF_GRAPH_ID
                    )

                    tile_id = self._upsert_local_crs_relation_tile(resource, rel_node, crs_resource_id)
                    manifest_updated, manifest_error = self._upsert_manifest_metadata(str(rid), str(crs_resource_id))

                    updated.append({
                        "resource_id": str(rid),
                        "tile_id": tile_id,
                        "manifest_updated": bool(manifest_updated),
                        "manifest_error": manifest_error
                    })
                except Resource.DoesNotExist:
                    failed.append({"resource_id": str(rid), "error": "IIIF resource not found"})
                except Exception as ex:
                    failed.append({"resource_id": str(rid), "error": str(ex)})

            return JsonResponse({
                "status": "success",
                "assigned_count": len(updated),
                "failed_count": len(failed),
                "crs_resource_id": str(crs_resource_id),
                "updated": updated,
                "failed": failed
            }, status=200)

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)