from django.http import JsonResponse
from django.views.decorators.http import require_GET

from arches.app.utils.permission_backend import get_editable_resource_types


@require_GET
def verify_permissions(request):
    """Graphs whose verification rules the signed-in user may manage (same as editing their resources)."""

    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required. Please log in.'}, status=401)

    return JsonResponse({
        'username': request.user.username,
        'editable_graph_ids': sorted(str(graph_id) for graph_id in get_editable_resource_types(request.user)),
    })
