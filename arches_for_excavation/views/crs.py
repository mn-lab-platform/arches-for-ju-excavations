import json
from uuid import UUID

from django.http import JsonResponse
from arches.app.models.resource import Resource
from pyproj import CRS, Transformer
from pyproj.database import query_crs_info
from pyproj.exceptions import CRSError

from .local_coordinate_system import CRSShorthands, get_crs_definition


def _extract_local_crs_from_arches_db():
    CRS_RESOURCE_GRAPH_ID = "855343ec-9d7c-4947-970c-e80b6cfacc4f"
    resources = Resource.objects.filter(graph_id=CRS_RESOURCE_GRAPH_ID)

    local_crs = []
    for resource in resources:
        name = resource.displayname() or "Undefined"

        local_crs.append({
            "name": name,
            "code": str(resource.resourceinstanceid),
            "is_local": True,
        })

    return local_crs


def search_epsg(request):
    query = request.GET.get('q', '').lower().strip()

    if not query or len(query) < 2:
        return JsonResponse({"results": []})
    
    try:

        all_crs = [
            {"name": crs.name, "code": str(crs.code), "is_local": False}
            for crs in query_crs_info(auth_name="EPSG")
        ]
        all_crs.extend(_extract_local_crs_from_arches_db())

        matches = [
            crs for crs in all_crs
            if query in crs["name"].lower() or query in crs["code"].lower()
        ]
        
        return JsonResponse({"results": matches[:10]})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def get_epsg_proj4(request, code):
    if not code:
        return JsonResponse({"error": "EPSG code is required."}, status=400)

    try:
        resource_id = UUID(str(code))
    except ValueError:
        resource_id = None

    if resource_id:
        arches_crs_resource = Resource.objects.filter(
            resourceinstanceid=resource_id,
            graph_id="855343ec-9d7c-4947-970c-e80b6cfacc4f",
        ).first()
        if arches_crs_resource:
            proj4 = get_crs_definition(arches_crs_resource, CRSShorthands.PROJ4)
            if not proj4:
                return JsonResponse(
                    {"error": f"No PROJ4 definition found for local CRS: {code}"},
                    status=404,
                )
            return JsonResponse({"proj4": proj4})

    try:
        crs = CRS.from_epsg(code)

        return JsonResponse({
            "proj4": crs.to_proj4(),
        })
    except CRSError as e:
        return JsonResponse({"error": f"Invalid EPSG code: {code}. Error: {str(e)}"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def transform_coordinates(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST is required."}, status=405)

    try:
        payload = json.loads(request.body)
        source_code = str(payload["source"])
        target_code = str(payload["target"])
        coordinates = payload["coordinates"]

        def resolve_crs(code):
            try:
                resource_id = UUID(code)
            except ValueError:
                resource_id = None

            if resource_id:
                resource = Resource.objects.filter(
                    resourceinstanceid=resource_id,
                    graph_id="855343ec-9d7c-4947-970c-e80b6cfacc4f",
                ).first()
                if resource:
                    definition = get_crs_definition(resource, CRSShorthands.WKT2)
                    if not definition:
                        definition = get_crs_definition(resource, CRSShorthands.PROJ4)
                    if definition:
                        return CRS.from_user_input(definition)

            return CRS.from_user_input(code)

        transformer = Transformer.from_crs(
            resolve_crs(source_code),
            resolve_crs(target_code),
            always_xy=True,
        )
        transformed = [
            transformer.transform(float(x), float(y))
            for x, y in coordinates
        ]
        return JsonResponse({"coordinates": transformed})
    except (KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
        return JsonResponse(
            {"error": f"Invalid coordinate transformation request: {error}"},
            status=400,
        )
    except Exception as error:
        return JsonResponse({"error": str(error)}, status=400)