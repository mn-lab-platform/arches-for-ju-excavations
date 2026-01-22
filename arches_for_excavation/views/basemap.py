from django.views import View
from django.http import HttpResponseBadRequest, JsonResponse, HttpResponse
from django.conf import settings
from django.utils.text import get_valid_filename
import os
from uuid import uuid4
import tempfile
from ..celery_tasks.basemap_tasks import convert_geotiff_to_cog


class BasemapView(View):
    def post(self, request):
        source_geotiff = request.FILES.get('basemap_geotiff')
        if not source_geotiff:
            return HttpResponseBadRequest("File upload failed, no file provided.")
        
        basemap_name = get_valid_filename(request.POST.get('basemap_name', 'unnamed_basemap'))
        basemap_id = str(uuid4())
        temp_src_path = None

        COG_STORAGE = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR, 'basemaps')
        dst_cog_path = os.path.join(COG_STORAGE, basemap_name, f"{basemap_id}.tif")
        
        try:
            temp_src_path = self._create_path_for_geotiff(source_geotiff)
            os.makedirs(os.path.dirname(dst_cog_path), exist_ok=True)
            task = convert_geotiff_to_cog.delay(temp_src_path, dst_cog_path)
            return JsonResponse({
                'status': 'success',
                'task_id': task.id,
                'basemap_id': basemap_id,
                'basemap_name': basemap_name,
                'output_path': dst_cog_path 
            })
        except Exception as e:
            if temp_src_path and os.path.exists(temp_src_path):
                os.remove(temp_src_path)

            return JsonResponse({
                'status': 'error', 
                'message': str(e)
            }, status=500)

    def _geotiff_is_valid(self, geotiff):
        #TODO: check if provided tiff is geo?
        pass

    def _create_path_for_geotiff(self, geotiff):
        shared_tmp_dir = os.path.join(
            settings.APP_ROOT,  
            settings.UPLOADED_FILES_DIR, 
            'tmp'
        )
        os.makedirs(shared_tmp_dir, exist_ok=True)
        
        _, ext = os.path.splitext(geotiff.name)
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext, dir=shared_tmp_dir) as destination:
            for chunk in geotiff.chunks():
                destination.write(chunk)
            return destination.name



