from django.core.signing import TimestampSigner
from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .permissions import has_plugin_access


@require_GET
def generate_tus_token(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required. Please log in.'}, status=401)

    if not has_plugin_access(request.user):
        return JsonResponse({'error': 'You do not have permission to generate a TUS token.'}, status=403)

    signer = TimestampSigner()
    token = signer.sign(request.user.id)

    return JsonResponse({'token': token})
