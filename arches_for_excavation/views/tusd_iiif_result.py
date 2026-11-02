import json
import logging

from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .tusd_webhook import TUS_ID_PATTERN, iiif_tus_results_dir


logger = logging.getLogger(__name__)


@require_GET
def iiif_tus_result(request, tus_id):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)
    if not (request.user.is_superuser or request.user.groups.filter(name='Plugin Access').exists()):
        return JsonResponse({'error': 'Forbidden'}, status=403)
    if not TUS_ID_PATTERN.fullmatch(tus_id):
        return JsonResponse({'error': 'Invalid TUS upload ID'}, status=400)

    result_path = iiif_tus_results_dir() / f'{tus_id}.json'
    try:
        saved = json.loads(result_path.read_text(encoding='utf-8'))
    except (FileNotFoundError, json.JSONDecodeError):
        # The browser may ask before the post-finish webhook has written its result.
        return JsonResponse({'status': 'processing'}, status=202)
    except OSError:
        logger.exception('Cannot read IIIF TUS result %s', tus_id)
        return JsonResponse({'error': 'Cannot read upload result'}, status=500)

    if not isinstance(saved, dict) or saved.get('user_id') != str(request.user.pk):
        return JsonResponse({'error': 'Upload result not found'}, status=404)

    status = saved.get('status')
    if status == 'processing':
        return JsonResponse({'status': 'processing'}, status=202)
    if status == 'submitted' and isinstance(saved.get('result'), dict):
        return JsonResponse({'status': 'submitted', 'result': saved['result']})
    if status == 'error':
        return JsonResponse({'status': 'error', 'error': saved.get('error') or 'GeoTIFF processing failed'})

    logger.error('Invalid IIIF TUS result record for %s', tus_id)
    return JsonResponse({'error': 'Invalid upload result'}, status=500)
