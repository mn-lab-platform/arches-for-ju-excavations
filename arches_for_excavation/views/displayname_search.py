from django.http import JsonResponse
from django.views import View

from arches.app.search.elasticsearch_dsl_builder import Bool, Nested, Query, Terms, Wildcard
from arches.app.search.mappings import RESOURCES_INDEX
from arches.app.search.search_engine_factory import SearchEngineFactory
from arches.app.utils import permission_backend

from arches_for_excavation.utils.resource_model_compat import graph_ids, node_id
from arches.app.models.tile import Tile
from django.db.models import Q

def _english_value(value):
    if not isinstance(value, list):
        return value or ""

    return next(
        (item.get("value", "") for item in value if item.get("language") == "en"),
        "",
    )

def _get_iiif_resources_with_crs(resource_ids):
    if not resource_ids:
        return set()
    
    crs_node_ids = [
        node_id("iiif", "crs", graph_id)
        for graph_id in graph_ids("iiif")
    ]

    crs_filter = Q()
    for crs_node_id in crs_node_ids:
        if crs_node_id:
            crs_filter |= Q(data__has_key=crs_node_id)

    if not crs_filter:
        return set()

    crs_tiles = Tile.objects.filter(
        resourceinstance_id__in=resource_ids
    ).filter(crs_filter)

    return {
        str(tile.resourceinstance_id)
        for tile in crs_tiles
        if any(
            (tile.data or {}).get(node_id_value)
            for node_id_value in crs_node_ids
        )
    }


def _contains_wildcard(value):
    escaped_value = value.replace("\\", "\\\\").replace("*", "\\*").replace("?", "\\?")
    return f"*{escaped_value}*"


class DisplayNameSearchView(View):
    def get(self, request):
        term = request.GET.get("q", "").strip()
        if term and len(term) < 2:
            return JsonResponse({"results": {"hits": {"total": {"value": 0}, "hits": []}}})

        try:
            limit = max(int(request.GET.get("limit", 100)), 1)
        except (TypeError, ValueError):
            limit = 100

        resource_ids = request.GET.getlist("resourceid")
        if resource_ids:
            limit = max(limit, len(resource_ids))

        search_engine = SearchEngineFactory().create()
        search_query = Query(search_engine, start=0, limit=limit)
        search_query.sort("date_last_edited", {"order": "desc"})
        for field in (
            "resourceinstanceid",
            "graph_id",
            "displayname",
            "displaydescription",
            "geometries",
            "date_last_edited",
        ):
            search_query.include(field)

        query = Bool()
        if term:
            query.must(
                Nested(
                    path="displayname",
                    query=Wildcard(
                        field="displayname.value",
                        query=_contains_wildcard(term),
                    ),
                )
            )

        graph_id_list = request.GET.getlist("graphid")
        if graph_id_list:
            query.filter(Terms(field="graph_id", terms=graph_id_list))

        if resource_ids:
            query.filter(Terms(field="resourceinstanceid", terms=resource_ids))

        if not request.user.is_superuser:
            for inclusion in permission_backend.get_permission_inclusions():
                search_query.include(inclusion)
            query.must(permission_backend.get_permission_search_filter(request.user))

        if term or graph_id_list or resource_ids or not request.user.is_superuser:
            search_query.add_query(query)
        response = search_query.search(index=RESOURCES_INDEX) or {
            "hits": {"total": {"value": 0}, "hits": []}
        }

        hits = response.get("hits", {}).get("hits", [])

        iiif_ids = [
            hit["_source"]["resourceinstanceid"]
            for hit in hits
            if hit["_source"].get("graph_id") in graph_ids("iiif")
        ]

        iiif_resources_with_crs = _get_iiif_resources_with_crs(iiif_ids)

        for hit in hits:
            source = hit.get("_source", {})
            resource_id = source.get("resourceinstanceid")
            source["displayname"] = _english_value(source.get("displayname"))
            source["displaydescription"] = _english_value(
                source.get("displaydescription")
            )

            if source.get("graph_id") in graph_ids("iiif"):
                source["has_crs"] = resource_id in iiif_resources_with_crs

        return JsonResponse({"results": response})