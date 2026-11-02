import os
import json
import rasterio
import zipfile
import json
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired
from django.http import JsonResponse 
from pyproj import Transformer
from uuid import UUID
from ..celery_tasks.basemap_tasks import create_basemap

TUS_UPLOAD_TYPES = {
    'maplayer': 'maplayer',
    'model': 'model',
    'iiif': 'iiif',
}

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
    
def _tileset_has_lat_lng_height_properties(tileset_data):
    props = tileset_data.get('properties', {})
    return all(prop in props for prop in ['Latitude', 'Longitude', 'Height'])

def _analyze_3d_tiles_file(file_path):
    model_georeferenced = False
    try:
        with zipfile.ZipFile(file_path) as zf:
            namelist = zf.namelist()
            if not any(name == 'tileset.json' for name in namelist):
                return { 'status': 'error', 'message': 'tileset.json not found in ZIP.' }
            try:
                with zf.open('tileset.json') as f:
                    tileset_data = json.load(f)
                    model_georeferenced = _tileset_has_lat_lng_height_properties(tileset_data)
            except (KeyError, json.JSONDecodeError) as e:
                print(f"tileset.json invalid: {e}")
                return { 'status': 'error', 'message': 'tileset.json is not valid JSON.' }
            tile_extensions = ('.b3dm', '.pnts', '.i3dm', '.cmpt', '.glb', '.gltf')
            if not any(name.lower().endswith(tile_extensions) for name in namelist):
                return { 'status': 'error', 'message': 'No tile files found (e.g., .b3dm, .pnts).' }
    except zipfile.BadZipFile as e:
        print(f"Bad ZIP file: {e}")
        return { 'status': 'error', 'message': 'Uploaded file is not a valid zip file.' }
    print("ZIP validation passed")
    return { 'status': 'success', 'georeferenced': model_georeferenced }

def _handle_maplayer_upload(metadata, source_file_path, tus_id):
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

def _handle_model_upload(metadata, source_file_path, tus_id):
    model_id = metadata.get('model_id')
    parent_resource_id = metadata.get('parent_resource_id')
    try:
        model_uuid = UUID(str(model_id))
        parent_uuid = UUID(str(parent_resource_id))
        if model_uuid.version != 4:
            raise ValueError
    except (TypeError, ValueError):
        return JsonResponse({'error': 'Model and parent resource IDs must be valid UUIDs'}, status=400)

    model_id = str(model_uuid)
    parent_resource_id = str(parent_uuid)
    target_folder = os.path.join(
        settings.MEDIA_ROOT,
        settings.UPLOADED_FILES_DIR,
        '3d_models',
        parent_resource_id,
        model_id,
    )

    try:
        model_info = _analyze_3d_tiles_file(source_file_path)
        if model_info['status'] == 'error':
            print(f"Validation failed: {model_info['message']}")
            os.makedirs(target_folder, exist_ok=True)
            with open(os.path.join(target_folder, ".upload-status.json"), "w", encoding="utf-8") as status_file:
                json.dump({"status": "error", "error": model_info["message"]}, status_file)
            return JsonResponse({'error': model_info['message']}, status=400)
        
        os.makedirs(target_folder, exist_ok=True)

        with zipfile.ZipFile(source_file_path) as zf:
            zf.extractall(target_folder)
        with open(os.path.join(target_folder, ".upload-status.json"), "w", encoding="utf-8") as status_file:
            json.dump({
                "status": "ready",
                "model_id": model_id,
                "parent_resource_id": parent_resource_id,
                "georeferenced": model_info["georeferenced"],
            }, status_file)
    except Exception as e:
        print(f"Error processing 3D model upload: {e}")
        os.makedirs(target_folder, exist_ok=True)
        with open(os.path.join(target_folder, ".upload-status.json"), "w", encoding="utf-8") as status_file:
            json.dump({"status": "error", "error": str(e)}, status_file)
        return JsonResponse({'error': f'Failed to process 3D model: {str(e)}'}, status=500)
    model_url = (
        f"{settings.MEDIA_URL.rstrip('/')}/{settings.UPLOADED_FILES_DIR}/"
        f"3d_models/{parent_resource_id}/{model_id}/"
    )
    return JsonResponse({'status': 'success', 'model_id': model_id, 'url': model_url, 'georeferenced': model_info['georeferenced'] })


@require_GET
def model_upload_status(request, parent_resource_id, model_id):
    try:
        parent_uuid = UUID(str(parent_resource_id))
        model_uuid = UUID(str(model_id))
        if model_uuid.version != 4:
            raise ValueError
    except (TypeError, ValueError):
        return JsonResponse({"error": "Invalid model or parent resource ID"}, status=400)

    status_path = os.path.join(
        settings.MEDIA_ROOT,
        settings.UPLOADED_FILES_DIR,
        "3d_models",
        str(parent_uuid),
        str(model_uuid),
        ".upload-status.json",
    )
    try:
        with open(status_path, "r", encoding="utf-8") as status_file:
            return JsonResponse(json.load(status_file))
    except FileNotFoundError:
        return JsonResponse({"status": "processing"}, status=202)
    except (OSError, json.JSONDecodeError) as error:
        return JsonResponse({"error": f"Unable to read model status: {error}"}, status=500)
    

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
        if not os.path.exists(source_file_path):
            return JsonResponse({'error': 'Uploaded file not found'}, status=404)

        upload_type = metadata.get('upload_type', None)
        if not upload_type:
            return JsonResponse({'error': 'Missing upload_type in metadata'}, status=400)

        if upload_type == TUS_UPLOAD_TYPES['maplayer']:
            return _handle_maplayer_upload(metadata, source_file_path, tus_id)
        elif upload_type == TUS_UPLOAD_TYPES['model']:
            return _handle_model_upload(metadata, source_file_path, tus_id)
        elif upload_type == TUS_UPLOAD_TYPES['iiif']:
            pass

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'success', 'message': 'Webhook received successfully'})