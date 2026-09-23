from django.conf import settings
from django.views.decorators.http import require_POST
from django.http import JsonResponse

import json
import os

@require_POST
def patch_tusd_metadata(request):

    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    
    is_in_group = request.user.groups.filter(name='Plugin Access').exists()

    if not (is_in_group or request.user.is_superuser):
        return JsonResponse({'error': 'Forbidden'}, status=403)

    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)
        
    tus_id = body.get('tus_id')
    if not tus_id:
        return JsonResponse({'error': 'Missing tus_id parameter'}, status=400)
    
    new_metadata_dict = body.get('metadata')
    if not new_metadata_dict or not isinstance(new_metadata_dict, dict):
        return JsonResponse({'error': 'Missing or invalid metadata parameter'}, status=400)
    
    try:
        new_upload_token = new_metadata_dict.get('upload_token')

        new_basemap_name = new_metadata_dict.get('basemap_name', 'Untitled Basemap')
        new_sortorder = new_metadata_dict.get('basemap_sortorder', '0')
        
        new_ispublic = str(new_metadata_dict.get('basemap_ispublic', 'true')).lower() == 'true'
        new_isoverlay = str(new_metadata_dict.get('basemap_isoverlay', 'false')).lower() == 'true'
        new_icon = new_metadata_dict.get('basemap_icon', 'fa fa-map')

    except (json.JSONDecodeError, AttributeError, ValueError) as e:
        return JsonResponse({'error': f'Invalid metadata payload: {str(e)}'}, status=400)

    try:
        MEDIA_BASE = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR)
        source_file_path = os.path.join(MEDIA_BASE, f"{tus_id}.info")

        if not os.path.exists(source_file_path):
            return JsonResponse({'error': f'Metadata file for tus_id {tus_id} not found'}, status=404)
        
        with open(source_file_path, 'r') as f:
            existing_metadata = json.load(f)
        
        if 'MetaData' not in existing_metadata:
            existing_metadata['MetaData'] = {}
        
        existing_metadata['MetaData']['upload_token'] = str(new_upload_token)
        existing_metadata['MetaData']['basemap_name'] = str(new_basemap_name)
        existing_metadata['MetaData']['basemap_sortorder'] = str(new_sortorder)
        existing_metadata['MetaData']['basemap_ispublic'] = 'true' if new_ispublic else 'false'
        existing_metadata['MetaData']['basemap_isoverlay'] = 'true' if new_isoverlay else 'false'
        existing_metadata['MetaData']['basemap_icon'] = str(new_icon)

        with open(source_file_path, 'w') as f:
            json.dump(existing_metadata, f)
        
        return JsonResponse({'status': 'success', 'message': 'Metadata updated successfully'})

    except FileNotFoundError:
        return JsonResponse({'error': f'File for tus_id {tus_id} not found'}, status=404)
    except OSError as e:
        return JsonResponse({'error': f'Error accessing file for tus_id {tus_id}: {str(e)}'}, status=500)