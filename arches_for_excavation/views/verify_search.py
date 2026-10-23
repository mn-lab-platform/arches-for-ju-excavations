"""Host the shared Arches search UI and return its complete resource ID set."""

import json
from uuid import UUID

from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.clickjacking import xframe_options_sameorigin
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_POST

from arches.app.models.models import Graph
from arches_search.utils.search.compiler import SearchCompiler
from arches_search.utils.search.types import SearchPayload
from arches_search.utils.search.validation import validate_search_payload

def _graph(graph_id):
    try:
        graph_id = UUID(graph_id)
    except (TypeError, ValueError, AttributeError):
        return None
    return Graph.objects.filter(graphid=graph_id, isresource=True, is_active=True).first()


def _signed_in(request):
    # Arches replaces Django's AnonymousUser with a real user named "anonymous".
    return request.user.is_authenticated and request.user.username != "anonymous"


@require_GET
@ensure_csrf_cookie
@xframe_options_sameorigin
def verify_search_page(request):
    graph = _graph(request.GET.get("graph_id"))
    if graph is None:
        return JsonResponse({"error": "Unknown resource model."}, status=400)
    return render(request, "views/verify-search.htm", {
        "graph_id": str(graph.graphid),
        "search_available": _signed_in(request),
        "main_script": "views/verify-search" if _signed_in(request) else None,
    })


@require_POST
def verify_search_ids(request):
    if not _signed_in(request):
        return JsonResponse({"error": "Sign in to Arches to use advanced search."}, status=403)
    try:
        body = json.loads(request.body)
    except (UnicodeDecodeError, json.JSONDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)
    if not isinstance(body, dict):
        return JsonResponse({"error": "Expected a JSON object."}, status=400)

    graph = _graph(body.get("graph_id"))
    query = body.get("search_query")
    if graph is None or not isinstance(query, dict) or query.get("graph_slug") != graph.slug:
        return JsonResponse({"error": "Search must use the selected resource model."}, status=400)

    try:
        payload = SearchPayload(
            graph_slugs=[graph.slug],
            term_search=None,
            advanced_search_queries=[query],
        )
        validate_search_payload(payload)
        matches = SearchCompiler(payload, request.user).compile().results
        ids = [str(resource_id) for resource_id in matches.values_list("resourceinstanceid", flat=True).iterator()]
    except (ValidationError, ValueError) as error:
        return JsonResponse({"error": str(error)}, status=400)

    response = JsonResponse({"resource_ids": ids, "total": len(ids)})
    response["Cache-Control"] = "no-store"
    return response
