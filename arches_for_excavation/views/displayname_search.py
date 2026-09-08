from django.http import JsonResponse
from django.views import View

from arches.app.search.elasticsearch_dsl_builder import Bool, Nested, Prefix, Query, Terms
from arches.app.search.mappings import RESOURCES_INDEX
from arches.app.search.search_engine_factory import SearchEngineFactory
from arches.app.utils import permission_backend


def _english_value(value):
    if not isinstance(value, list):
        return value or ""

    return next(
        (item.get("value", "") for item in value if item.get("language") == "en"),
        "",
    )


class DisplayNameSearchView(View):
    def get(self, request):
        term = request.GET.get("q", "").strip()
        if term and len(term) < 2:
            return JsonResponse({"results": {"hits": {"total": {"value": 0}, "hits": []}}})

        try:
            limit = max(int(request.GET.get("limit", 100)), 1)
        except (TypeError, ValueError):
            limit = 100

        search_engine = SearchEngineFactory().create()
        search_query = Query(search_engine, start=0, limit=limit)
        for field in (
            "resourceinstanceid",
            "graph_id",
            "displayname",
            "displaydescription",
            "geometries",
        ):
            search_query.include(field)

        query = Bool()
        if term:
            query.must(
                Nested(
                    path="displayname",
                    query=Prefix(field="displayname.value", query=term),
                )
            )

        graph_ids = request.GET.getlist("graphid")
        if graph_ids:
            query.filter(Terms(field="graph_id", terms=graph_ids))

        if not request.user.is_superuser:
            for inclusion in permission_backend.get_permission_inclusions():
                search_query.include(inclusion)
            query.must(permission_backend.get_permission_search_filter(request.user))

        if term or graph_ids or not request.user.is_superuser:
            search_query.add_query(query)
        response = search_query.search(index=RESOURCES_INDEX) or {
            "hits": {"total": {"value": 0}, "hits": []}
        }

        for hit in response.get("hits", {}).get("hits", []):
            source = hit.get("_source", {})
            source["displayname"] = _english_value(source.get("displayname"))
            source["displaydescription"] = _english_value(
                source.get("displaydescription")
            )

        return JsonResponse({"results": response})