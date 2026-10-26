import os
import json
import rasterio
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired
from django.http import JsonResponse 
from pyproj import Transformer
from uuid import uuid4
from ..celery_tasks.basemap_tasks import create_basemap

def _token_is_valid(token, max_age=3600):
    if not token:
        return False
    signer = TimestampSigner()
    try: 
        user_id = signer.unsign(token, max_age=max_age)
        return bool(user_id)
    except (BadSignature, SignatureExpired):
        return False

def _get_raster_info(path, to_wgs84=False):
    with rasterio.open(path) as ds:
        b = ds.bounds
        
        cx = b.left + (b.right - b.left) / 2
        cy = b.bottom + (b.top - b.bottom) / 2
        
        bounds = {
            'left': b.left,
            'bottom': b.bottom,
            'right': b.right,
            'top': b.top
        }
        
        if to_wgs84 and ds.crs and ds.crs != "EPSG:4326":
            transformer = Transformer.from_crs(ds.crs, "EPSG:4326", always_xy=True)
            cx, cy = transformer.transform(cx, cy)
            left_bottom = transformer.transform(b.left, b.bottom)
            right_top = transformer.transform(b.right, b.top)
            bounds = [left_bottom[0], left_bottom[1], right_top[0], right_top[1]]
        
        return {
            'center': (cx, cy),
            'bounds': bounds,
            'band_count': ds.count,
        }

def _raster_is_geotiff(path):
    try:
        with rasterio.open(path) as ds:
            return ds.driver == 'GTiff'
    except Exception as e:
        print(f"Error checking if raster is GeoTIFF: {e}")
        return False


@csrf_exempt
@require_POST
def tus_webhook(request):
    MEDIA_BASE = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR)
    try:
        body = json.loads(request.body)
        event_type = body.get('Type')

        upload = body.get('Event', {}).get('Upload', {})
        tus_id = upload.get('ID')
        metadata = upload.get('MetaData', {})

        token = metadata.get('upload_token')
        print(f"RECEIVED TOKEN IN WEBHOOK: {token}", flush=True)

        if not _token_is_valid(token):
            return JsonResponse({'error': 'Invalid or expired upload authentication token'}, status=403)

        if event_type == 'pre-create':
            return JsonResponse({'status': 'success', 'message': 'Upload authorized'})
        
        source_file_path = os.path.join(MEDIA_BASE, tus_id)

        if not _raster_is_geotiff(source_file_path):
            return JsonResponse({'error': 'Uploaded file is not a valid GeoTIFF'}, status=400)

        maplayer_metadata = {
            'original_name': metadata.get('basemap_name', 'Untitled Basemap'),
            'sortorder': metadata.get('basemap_sortorder', '0'),
            'activated': metadata.get('basemap_activated', 'true').lower() == 'true',
            'ispublic': metadata.get('basemap_ispublic', 'true').lower() == 'true',
            'addto_map': metadata.get('basemap_addto_map', 'false').lower() == 'true',
            'isoverlay': metadata.get('basemap_isoverlay', 'false').lower() == 'true',
            'icon': metadata.get('basemap_icon', 'fa fa-map'),
            'authorized_group': 'Restricted Basemap Access', # IMPORTANT: hardcoded group with basemap viewing rights,
            'bounds': None,
            'center_coordinates': None,
            'band_count': None,
            'tus_id': tus_id, # Use the TUS ID as the unique identifier for the basemap, it is also the name of the file in the mounted volume
        }

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    try:
        source_file_path = os.path.join(MEDIA_BASE, tus_id)
        cog_path = os.path.join(MEDIA_BASE, "maplayers", f"{tus_id}.tif")

        raster_data = _get_raster_info(source_file_path, to_wgs84=True)
        maplayer_metadata['center_coordinates'] = raster_data['center']
        maplayer_metadata['bounds'] = raster_data['bounds']
        maplayer_metadata['band_count'] = raster_data['band_count']

        task = create_basemap.apply_async(
            args=[source_file_path, cog_path, maplayer_metadata],
            task_id=tus_id
        )
        return JsonResponse({
            'status': 'processing',
            'task_id': task.id,
        })
    
    except Exception as e:
        return JsonResponse({'error': f'Failed to read raster info: {str(e)}'}, status=500)

    return JsonResponse({'status': 'success', 'message': 'Webhook received successfully'})