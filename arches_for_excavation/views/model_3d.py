from django.views import View
from django.http import HttpResponseBadRequest, JsonResponse
import zipfile
from django.conf import settings
import os
import uuid
from typing import Dict, Any

class Model3DView(View):
    supported_formats = ['.zip', '.3tz']
    
    def post(self, request):
        input_file = request.FILES.get('model_file')
        parent_resource_id = request.POST.get('parent_resource_id')
        print(f"Received upload request for parent_resource_id: {parent_resource_id}")

        if not input_file or not any(input_file.name.endswith(ext) for ext in self.supported_formats):
            print("Invalid file type uploaded")
            return HttpResponseBadRequest('Invalid file type.')

        model_info = self._analyze_3d_tiles_file(input_file)
        if model_info['status'] == 'error':
            print(f"Validation failed: {model_info['message']}")
            return HttpResponseBadRequest(model_info['message'])
        model_id = str(uuid.uuid4())
        model_folder_path = os.path.join(settings.MEDIA_ROOT,settings.UPLOADED_FILES_DIR, '3d_models', parent_resource_id, model_id)
        os.makedirs(model_folder_path, exist_ok=True)

        with zipfile.ZipFile(input_file) as zf:
            zf.extractall(model_folder_path)
        return JsonResponse({'status': 'success', 'model_id': model_id, 'url': f"{settings.MEDIA_URL}{settings.UPLOADED_FILES_DIR}/3d_models/{parent_resource_id}/{model_id}/", 'georeferenced': model_info['georeferenced'] })

    def _analyze_3d_tiles_file(self, file) -> Dict[str, Any]:
        model_georeferenced = False
        try:
            with zipfile.ZipFile(file) as zf:
                namelist = zf.namelist()
                if not any(name == 'tileset.json' for name in namelist):
                    return { 'status': 'error', 'message': 'tileset.json not found in ZIP.' }
                try:
                    with zf.open('tileset.json') as f:
                        import json
                        tileset_data = json.load(f)
                        model_georeferenced = self._tileset_has_lat_lng_height_properties(tileset_data)
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


    
    def _tileset_has_lat_lng_height_properties(self, tileset_data):
        props = tileset_data.get('properties', {})
        return all(prop in props for prop in ['Latitude', 'Longitude', 'Height'])