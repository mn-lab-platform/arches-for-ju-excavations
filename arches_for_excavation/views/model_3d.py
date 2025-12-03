from django.views import View
from django.http import HttpResponseBadRequest, JsonResponse
import zipfile
from django.conf import settings
import os
import uuid

class Model3DView(View):
    def post(self, request):
        zip_file = request.FILES.get('zip_file')
        parent_resource_id = request.POST.get('parent_resource_id')
        print(f"Received upload request for parent_resource_id: {parent_resource_id}")

        if not zip_file or not zip_file.name.endswith('.zip'):
            print("Invalid file type uploaded")
            return HttpResponseBadRequest('Invalid file type.')

        validation = self._zipfile_is_valid_3d_tiles(zip_file)
        if validation is not None:
            print(f"Validation failed: {validation}")
            return HttpResponseBadRequest(validation)
        model_id = str(uuid.uuid4())
        model_folder_path = os.path.join(settings.MEDIA_ROOT,settings.UPLOADED_FILES_DIR, '3d_models', parent_resource_id, model_id)
        os.makedirs(model_folder_path, exist_ok=True)
        print(f"Created folder: {model_folder_path}")

        with zipfile.ZipFile(zip_file) as zf:
            zf.extractall(model_folder_path)
        print(f"Extracted ZIP to: {model_folder_path}")
        return JsonResponse({'status': 'success', 'model_id': model_id, 'url': f"{settings.MEDIA_URL}{settings.UPLOADED_FILES_DIR}/3d_models/{parent_resource_id}/{model_id}/"})
    
    def _zipfile_is_valid_3d_tiles(self, zip_file) -> str:
        try:
            with zipfile.ZipFile(zip_file) as zf:
                namelist = zf.namelist()
                print(f"ZIP contents: {namelist}")
                if not any(name == 'tileset.json' for name in namelist):
                    return 'Missing tileset.json file in uploaded zip.'
                try:
                    with zf.open('tileset.json') as f:
                        import json
                        json.load(f)
                        print("tileset.json is valid JSON")
                except (KeyError, json.JSONDecodeError) as e:
                    print(f"tileset.json invalid: {e}")
                    return 'tileset.json is not valid JSON.'
                tile_extensions = ('.b3dm', '.pnts', '.i3dm', '.cmpt', '.glb', '.gltf')
                if not any(name.lower().endswith(tile_extensions) for name in namelist):
                    return 'No tile files found (e.g., .b3dm, .pnts).'
        except zipfile.BadZipFile as e:
            print(f"Bad ZIP file: {e}")
            return 'Uploaded file is not a valid zip file.'
        print("ZIP validation passed")
        return None