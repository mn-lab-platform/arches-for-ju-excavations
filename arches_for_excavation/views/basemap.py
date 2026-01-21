from django.views import View
from django.http import HttpResponseBadRequest, JsonResponse
from django.conf import settings
from rasterio.shutil import copy
import os
from uuid import uuid4
import tempfile
from ..celery_tasks.basemap_tasks import convert_geotiff_to_cog


class BasemapView(View):
    def post(self, request):
        COG_STORAGE = os.path.join(settings.MEDIA_ROOT, 'basemaps')

        source_geotiff = request.FILES.get('basemap_geotiff')
        basemap_name = request.POST.get('basemap_name', 'unnamed_basemap')
        basemap_id = str(uuid4())

        if not source_geotiff:
            return HttpResponseBadRequest("File upload failed, no file provided.")
        
        temp_src_path = self._create_path_for_geotiff(source_geotiff)
        dst_cog_path = os.path.join(COG_STORAGE, basemap_name, f"{basemap_id}.tif")
        os.makedirs(os.path.dirname(dst_cog_path), exist_ok=True)
        
        task = convert_geotiff_to_cog.delay(temp_src_path, dst_cog_path)
        
    def _create_path_for_geotiff(self, geotiff):
        _, ext = os.path.splitext(geotiff.name)
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as destination:
            for chunk in geotiff.chunks():
                destination.write(chunk)
            return destination.name



