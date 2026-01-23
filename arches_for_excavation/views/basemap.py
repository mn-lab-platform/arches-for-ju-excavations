from django.views import View
from django.http import HttpResponseBadRequest, JsonResponse, HttpResponse
from django.conf import settings
from django.utils.text import get_valid_filename
import os
from uuid import uuid4
from ..celery_tasks.basemap_tasks import convert_geotiff_to_cog


class BasemapView(View):
    def post(self, request):
        input_geotiff = request.FILES.get('basemap_geotiff')
        if not input_geotiff:
            return HttpResponseBadRequest("File upload failed, no file provided.")
        
        basemap_name = get_valid_filename(request.POST.get('basemap_name', 'unnamed_basemap'))
        basemap_id = str(uuid4())

        COG_STORAGE = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR, 'basemaps')
        basemap_dir = os.path.join(COG_STORAGE, basemap_name)
        original_geotiff_path = os.path.join(basemap_dir, f"origin_{basemap_id}.tif")
        dst_cog_path = os.path.join(basemap_dir, f"{basemap_id}.tif")
        
        try:
            os.makedirs(basemap_dir, exist_ok=True)
            self._save_file_to_location(input_geotiff, original_geotiff_path)
            task = convert_geotiff_to_cog.delay(original_geotiff_path, dst_cog_path)
            return JsonResponse({
                'status': 'success',
                'task_id': task.id,
                'basemap_id': basemap_id,
                'basemap_name': basemap_name,
                'output_path': dst_cog_path 
            })
        except Exception as e:
            return JsonResponse({
                'status': 'error', 
                'message': str(e)
            }, status=500)

    def _geotiff_is_valid(self, geotiff):
        #TODO: check if provided tiff is geo?
        pass

    def _save_file_to_location(self, file, location):
        with open(location, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)



