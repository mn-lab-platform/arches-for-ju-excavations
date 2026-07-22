import json
from uuid import uuid4

import numpy as np
from django.http import HttpResponse, JsonResponse
from django.utils.text import get_valid_filename
from django.views import View

from arches.app.models.models import Node
from arches.app.models.resource import Resource
from arches.app.models.tile import Tile
from arches_slocal.utils.resource_model_compat import (
    RESOURCE_MODELS,
    graph_ids,
    graph_variant,
    node_id,
)

from .services.crs.local_mercator.from_2_points import (
    estimate_local_mercator_2_points,
)
from .services.iiif_utils import _atomic_write_json, _resolve_manifest_path_and_current


class CRSShorthands:
    WKT2 = "wkt2"
    ESRI_WKT = "esri_wkt"
    PROJ4 = "proj4"

    ALL = (WKT2, ESRI_WKT, PROJ4)


class LegacyCRSNodeIds:
    GRAPH_ID = RESOURCE_MODELS["coordinate_system"]["legacy"]
    NAME_NODE_ID = "d52b7c0c-c948-43ab-896d-30b266416d6b"
    DESCRIPTION_NODE_ID = "32d0c83f-7de5-4389-8b8d-84c0fca12f6b"
    ORIGIN_LOCAL_X_NODE_ID = "2e5bd906-cdf4-4d6d-9b6d-502e66ff146b"
    ORIGIN_LOCAL_Y_NODE_ID = "6354545f-a37c-4502-b6cc-a76c04b8223d"
    ORIGIN_LONGITUDE_NODE_ID = "fb65c048-399b-4fdd-8ea8-9ceafcaacb8c"
    ORIGIN_LATITUDE_NODE_ID = "2cbd84ea-2a4d-4e7f-b956-e0af814a6b80"
    DIRECTION_LONGITUDE_NODE_ID = "773938c1-2334-4954-a66a-0bc56c5e74a3"
    DIRECTION_LATITUDE_NODE_ID = "5c42db2f-d64b-4dc0-87a7-b27796405283"
    WKT2_STRING_NODE_ID = "fd7658d3-9e61-4ff3-b644-7edd9d458a9c"
    ESRI_WKT_STRING_NODE_ID = "fc23448e-7ab8-4e02-9848-73e3103a4423"
    PROJ4_STRING_NODE_ID = "6caa2759-1a2b-4561-b3f4-9bbde19a9e8b"


class CRSNodeIds:
    GRAPH_ID = RESOURCE_MODELS["coordinate_system"]["ontology"]
    NAME_NODE_ID = "9c0f5c73-f6bd-4fd4-8f14-ea4182771ea5"
    DESCRIPTION_NODE_ID = "7e487749-15f0-495c-a2aa-8a4fcbb601f6"
    ORIGIN_LOCAL_X_NODE_ID = "1e71c16f-98e9-4c8e-a0db-3598c55d43c5"
    ORIGIN_LOCAL_Y_NODE_ID = "711f581c-8960-493c-9910-6c22a5d85190"
    ORIGIN_LONGITUDE_NODE_ID = "d60cfa59-5d6e-433d-be02-9535763c2056"
    ORIGIN_LATITUDE_NODE_ID = "003479b2-c6fa-4760-ae6a-4c858ba4389f"
    DIRECTION_LONGITUDE_NODE_ID = "bd1d70f6-e300-40ed-bb93-1cb2442df386"
    DIRECTION_LATITUDE_NODE_ID = "142469c8-d5f4-4b0b-9bfc-7e28f30199d7"

    DEFINITION_NODEGROUP_ID = "1af31135-cd42-4c39-9748-7fa630cad2be"
    DEFINITION_TYPE_NODE_ID = "8c2e2502-cf35-4857-b349-f06aea3b6d00"
    DEFINITION_STRING_NODE_ID = "8577152b-8abb-4b46-b3c3-4a8b223c4117"
    DEFINITION_DOWNLOAD_NODE_ID = "cc84866f-9de8-4ff1-a5de-839c0f0b8f7d"

    DEFINITION_TYPE_VALUES = {
        CRSShorthands.PROJ4: "52e237e4-189d-4a56-af58-b690ff219071",
        CRSShorthands.ESRI_WKT: "99fb3e0f-94ba-4f65-a140-3a7088301737",
        CRSShorthands.WKT2: "eeda1e4e-3fc7-4b9a-9a8a-44244d5b57c2",
    }


def _localized_string(value):
    return {"en": {"value": str(value or ""), "direction": "ltr"}}


def _plain_text(value):
    if isinstance(value, str):
        return value
    if isinstance(value, dict):
        if "value" in value:
            return _plain_text(value["value"])
        for language in ("en", "none"):
            if language in value:
                result = _plain_text(value[language])
                if result:
                    return result
        for child in value.values():
            result = _plain_text(child)
            if result:
                return result
    if isinstance(value, list):
        for child in value:
            result = _plain_text(child)
            if result:
                return result
    return ""


def get_crs_definition(resource, definition_type):
    variant = graph_variant("coordinate_system", resource.graph_id)
    if variant == "legacy":
        old_node_ids = {
            CRSShorthands.WKT2: LegacyCRSNodeIds.WKT2_STRING_NODE_ID,
            CRSShorthands.ESRI_WKT: LegacyCRSNodeIds.ESRI_WKT_STRING_NODE_ID,
            CRSShorthands.PROJ4: LegacyCRSNodeIds.PROJ4_STRING_NODE_ID,
        }
        definition_node_id = old_node_ids.get(definition_type)
        tile = Tile.objects.filter(
            resourceinstance=resource,
            data__has_key=definition_node_id,
        ).first()
        return (tile.data or {}).get(definition_node_id) if tile else None

    if variant == "ontology":
        type_value_id = CRSNodeIds.DEFINITION_TYPE_VALUES.get(definition_type)
        for tile in Tile.objects.filter(
            resourceinstance=resource,
            nodegroup_id=CRSNodeIds.DEFINITION_NODEGROUP_ID,
        ):
            data = tile.data or {}
            if data.get(CRSNodeIds.DEFINITION_TYPE_NODE_ID) == type_value_id:
                return data.get(CRSNodeIds.DEFINITION_STRING_NODE_ID)

    return None


def get_crs_resource_name(resource):
    name_node_id = node_id("coordinate_system", "name", resource.graph_id)
    if not name_node_id:
        return "local_coordinate_system"
    tile = Tile.objects.filter(
        resourceinstance=resource,
        data__has_key=name_node_id,
    ).first()
    value = (tile.data or {}).get(name_node_id) if tile else None
    return get_valid_filename(_plain_text(value) or "local_coordinate_system")


class LocalCoordinateSystemDefineView(View):
    def _get_crs_definitions(
        self,
        origin_point_local,
        origin_point_global,
        direction_point_global,
        name,
    ):
        local_mercator = estimate_local_mercator_2_points(
            origin_point_local,
            origin_point_global,
            direction_point_global,
            name,
        )
        return (
            local_mercator.to_wkt2_string(),
            local_mercator.to_esri_wkt_string(),
            local_mercator.to_proj4_string(),
        )

    def _save_grouped_tiles(self, resource, data):
        tiles_by_nodegroup = {}
        for current_node_id, value in data.items():
            node = Node.objects.get(nodeid=current_node_id, graph_id=resource.graph_id)
            nodegroup_id = str(node.nodegroup_id)
            tile = tiles_by_nodegroup.setdefault(
                nodegroup_id,
                Tile.get_blank_tile_from_nodegroup_id(
                    nodegroup_id,
                    resourceid=str(resource.resourceinstanceid),
                ),
            )
            tile.data[current_node_id] = value

        for tile in tiles_by_nodegroup.values():
            tile.save()

    def _save_definition_tiles(self, resource, definitions):
        for shorthand, definition in definitions.items():
            tile = Tile.get_blank_tile_from_nodegroup_id(
                CRSNodeIds.DEFINITION_NODEGROUP_ID,
                resourceid=str(resource.resourceinstanceid),
            )
            tile.data.update(
                {
                    CRSNodeIds.DEFINITION_TYPE_NODE_ID: (
                        CRSNodeIds.DEFINITION_TYPE_VALUES[shorthand]
                    ),
                    CRSNodeIds.DEFINITION_STRING_NODE_ID: definition,
                    CRSNodeIds.DEFINITION_DOWNLOAD_NODE_ID: (
                        self._create_download_tile_value(
                            str(resource.resourceinstanceid),
                            shorthand,
                        )
                    ),
                }
            )
            tile.save()

    def _create_download_tile_value(self, resource_id, shorthand):
        definitions = {
            CRSShorthands.WKT2: ("WKT2", ".prj"),
            CRSShorthands.ESRI_WKT: ("ESRI WKT", ".prj"),
            CRSShorthands.PROJ4: ("PROJ4", ".txt"),
        }
        title, extension = definitions[shorthand]
        api_path = f"/api/local-coordinate-system/{resource_id}/download/{shorthand}"
        return {
            "url": api_path,
            "url_label": f"Download {title} definition file ({extension})",
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
        direction_point_global = np.float64(
            [direction_longitude, direction_latitude]
        )

        try:
            wkt2, esri_wkt, proj4 = self._get_crs_definitions(
                origin_point_local,
                origin_point_global,
                direction_point_global,
                name,
            )
            resource = Resource.objects.create(graph_id=CRSNodeIds.GRAPH_ID)
            resource_id = str(resource.resourceinstanceid)

            self._save_grouped_tiles(
                resource,
                {
                    CRSNodeIds.NAME_NODE_ID: name,
                    CRSNodeIds.DESCRIPTION_NODE_ID: _localized_string(description),
                    CRSNodeIds.ORIGIN_LOCAL_X_NODE_ID: origin_local_x,
                    CRSNodeIds.ORIGIN_LOCAL_Y_NODE_ID: origin_local_y,
                    CRSNodeIds.ORIGIN_LONGITUDE_NODE_ID: origin_longitude,
                    CRSNodeIds.ORIGIN_LATITUDE_NODE_ID: origin_latitude,
                    CRSNodeIds.DIRECTION_LONGITUDE_NODE_ID: direction_longitude,
                    CRSNodeIds.DIRECTION_LATITUDE_NODE_ID: direction_latitude,
                },
            )
            self._save_definition_tiles(
                resource,
                {
                    CRSShorthands.WKT2: wkt2,
                    CRSShorthands.ESRI_WKT: esri_wkt,
                    CRSShorthands.PROJ4: proj4,
                },
            )
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)

        return JsonResponse(
            {
                "status": "success",
                "resource_id": resource_id,
                "graph_id": CRSNodeIds.GRAPH_ID,
                "message": f"Created CRS: {name}",
            },
            status=201,
        )


class LocalCoordinateSystemDownloadView(View):
    def _get_extension_for_definition_type(self, definition_type):
        return {
            CRSShorthands.WKT2: "prj",
            CRSShorthands.ESRI_WKT: "prj",
            CRSShorthands.PROJ4: "txt",
        }.get(definition_type, "txt")

    def get(self, request, resource_id, definition_type):
        if not resource_id or definition_type not in CRSShorthands.ALL:
            return HttpResponse("Invalid resource_id or definition_type", status=400)

        try:
            resource = Resource.objects.get(
                resourceinstanceid=resource_id,
                graph_id__in=graph_ids("coordinate_system"),
            )
        except Resource.DoesNotExist:
            return HttpResponse("Resource not found", status=404)

        try:
            definition = get_crs_definition(resource, definition_type)
            if not definition:
                return HttpResponse(
                    "CRS definition not found for the specified type",
                    status=404,
                )

            resource_name = get_crs_resource_name(resource)
            extension = self._get_extension_for_definition_type(definition_type)
            response = HttpResponse(
                definition,
                content_type="application/octet-stream",
            )
            response["Content-Disposition"] = (
                f'attachment; filename="{resource_name}_{definition_type}.{extension}"'
            )
            response["Content-Length"] = len(definition.encode("utf-8"))
            return response
        except Exception as error:
            return HttpResponse(
                f"Error retrieving CRS definition: {error}",
                status=500,
            )


class LocalCoordinateSystemAssignToResourcesView(View):
    TARGETS = {
        RESOURCE_MODELS["iiif"]["legacy"]: {
            "node_id": None,
            "georeferenced_node_id": None,
            "handles_manifest": True,
        },
        RESOURCE_MODELS["iiif"]["ontology"]: {
            "node_id": "dd068843-d477-4602-9457-71b31b97a564",
            "georeferenced_node_id": "2d50ef5e-e70b-47fe-ba18-b645a3c7f182",
            "handles_manifest": True,
        },
        RESOURCE_MODELS["digital_resource_3d"]["legacy"]: {
            "node_id": None,
            "georeferenced_node_id": (
                "6f57cc4e-3c15-4483-8517-753a999ac448"
            ),
            "handles_manifest": False,
        },
        RESOURCE_MODELS["digital_resource_3d"]["ontology"]: {
            "node_id": "26125877-dc4e-402e-a925-78859a703ec3",
            "georeferenced_node_id": "dc5d3b0a-f66a-4c66-b951-0d99fc68367b",
            "handles_manifest": False,
        },
    }

    def _get_target_config(self, resource_graph_id):
        return self.TARGETS.get(str(resource_graph_id))

    def _upsert_local_crs_relation_tile(self, resource, rel_node, crs_resource_id):
        if rel_node is None:
            return None

        relation_node_id = str(rel_node.nodeid)
        nodegroup_id = str(rel_node.nodegroup_id)
        tile = Tile.objects.filter(
            resourceinstance=resource,
            nodegroup_id=nodegroup_id,
        ).first()
        if not tile:
            tile = Tile.get_blank_tile_from_nodegroup_id(
                nodegroup_id,
                resourceid=str(resource.resourceinstanceid),
            )

        tile.data[relation_node_id] = [
            {
                "resourceId": crs_resource_id,
                "ontologyProperty": "",
                "inverseOntologyProperty": "",
                "resourceXresourceId": str(uuid4()),
            }
        ]
        tile.save()
        return str(tile.tileid)

    def _upsert_manifest_metadata(self, resource_id, crs_resource_id):
        path, current, _resolved_name = _resolve_manifest_path_and_current(
            resource_id=str(resource_id),
            resource_name=None,
            current=None,
        )
        if current is None:
            return False, "manifest not found"

        metadata = current.get("metadata")
        if not isinstance(metadata, list):
            metadata = []
            current["metadata"] = metadata

        def _lang_first(value):
            if isinstance(value, str):
                return value
            if isinstance(value, dict):
                for language in ("en", "none"):
                    values = value.get(language)
                    if isinstance(values, list) and values:
                        return str(values[0])
            return ""

        def _set_meta(key, value):
            for row in metadata:
                if not isinstance(row, dict):
                    continue
                label = _lang_first(row.get("label", {})).strip().lower()
                if label == key.lower():
                    row["value"] = {"en": [str(value)]}
                    return
            metadata.append(
                {
                    "label": {"en": [key]},
                    "value": {"en": [str(value)]},
                }
            )

        _set_meta("local_crs_resource_id", crs_resource_id)
        _set_meta("georeferencing_method", "local_mercator_2_points")
        _atomic_write_json(path, current)
        return True, None

    def _set_georeferenced_flag(self, resource, node_id_value):
        if not node_id_value:
            return

        try:
            node = Node.objects.get(
                nodeid=node_id_value,
                graph_id=resource.graph_id,
            )
        except Node.DoesNotExist:
            return

        nodegroup_id = str(node.nodegroup_id)
        tile = Tile.objects.filter(
            resourceinstance=resource,
            nodegroup_id=nodegroup_id,
        ).first()
        if not tile:
            tile = Tile.get_blank_tile_from_nodegroup_id(
                nodegroup_id,
                resourceid=str(resource.resourceinstanceid),
            )
        tile.data[node_id_value] = True
        tile.save()

    def post(self, request):
        try:
            payload = json.loads(request.body or "{}")
            crs_resource_id = payload.get("crs_resource_id")
            resource_ids = payload.get("resource_ids", [])
            if not crs_resource_id or not isinstance(resource_ids, list) or not resource_ids:
                return JsonResponse(
                    {"status": "error", "message": "Invalid payload"},
                    status=400,
                )

            try:
                Resource.objects.get(
                    resourceinstanceid=crs_resource_id,
                    graph_id__in=graph_ids("coordinate_system"),
                )
            except Resource.DoesNotExist:
                return JsonResponse(
                    {"status": "error", "message": "CRS resource not found"},
                    status=404,
                )

            updated = []
            failed = []
            for resource_id in resource_ids:
                try:
                    resource = Resource.objects.get(resourceinstanceid=resource_id)
                    config = self._get_target_config(resource.graph_id)
                    if not config:
                        failed.append(
                            {
                                "resource_id": str(resource_id),
                                "error": f"Unsupported target graph: {resource.graph_id}",
                            }
                        )
                        continue

                    relation_node = None
                    if config["node_id"]:
                        relation_node = Node.objects.get(
                            nodeid=config["node_id"],
                            graph_id=resource.graph_id,
                        )
                    tile_id = self._upsert_local_crs_relation_tile(
                        resource,
                        relation_node,
                        str(crs_resource_id),
                    )
                    self._set_georeferenced_flag(
                        resource,
                        config.get("georeferenced_node_id"),
                    )

                    manifest_updated = False
                    manifest_error = None
                    if config["handles_manifest"]:
                        manifest_updated, manifest_error = self._upsert_manifest_metadata(
                            str(resource_id),
                            str(crs_resource_id),
                        )

                    updated.append(
                        {
                            "resource_id": str(resource_id),
                            "tile_id": tile_id,
                            "manifest_updated": bool(manifest_updated),
                            "manifest_error": manifest_error,
                        }
                    )
                except Resource.DoesNotExist:
                    failed.append(
                        {
                            "resource_id": str(resource_id),
                            "error": "Resource not found",
                        }
                    )
                except Exception as error:
                    failed.append(
                        {
                            "resource_id": str(resource_id),
                            "error": str(error),
                        }
                    )

            return JsonResponse(
                {
                    "status": "success",
                    "assigned_count": len(updated),
                    "failed_count": len(failed),
                    "crs_resource_id": str(crs_resource_id),
                    "updated": updated,
                    "failed": failed,
                }
            )
        except Exception as error:
            return JsonResponse(
                {"status": "error", "message": str(error)},
                status=500,
            )
