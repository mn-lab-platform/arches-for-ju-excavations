from django.views import View
from .services.crs.local_mercator.oblique_mercator import ObliqueMercator
from .services.crs.tools.transform_tileset import extract_matrix_from_tileset, extract_center_from_tileset, mulp, estimate_transformation_matrix, load_json_file
from django.http import JsonResponse
from django.conf import settings
import os

class GenerateModelMatrixView(View):
    def get(self, request):
        tileset_url = request.GET.get('tilesetUrl')
        wkt2 = request.GET.get('wkt2')
        if not tileset_url or not wkt2:
            return JsonResponse({'status': 'error', 'error': 'Missing parameters'}, status=400)
        try:
            mercator = ObliqueMercator.from_wkt2_string(wkt2)
            tileset_path = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR, self.extract_model_path_with_file(tileset_url))
            tileset = load_json_file(tileset_path)
            matrix = extract_matrix_from_tileset(tileset)
            center = extract_center_from_tileset(tileset)
            center = mulp(matrix, center)
            transformation = estimate_transformation_matrix(mercator, center)

            new_matrix = transformation.T.flatten().tolist()

            return JsonResponse({'status': 'success', 'new_matrix': new_matrix})
        except Exception as e:
            print(f"Error during model matrix generation: {e}")
            return JsonResponse({'status': 'error', 'error': str(e)}, status=400)
    
    def extract_model_path_with_file(self, tileset_url):
        path = tileset_url.replace('/files/uploadedfiles/', '', 1)
        path = path.lstrip('/')
        path = path.replace('//', '/')
        return path
