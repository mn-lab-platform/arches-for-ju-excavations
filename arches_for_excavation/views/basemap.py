from django.views import View
from django.http import HttpResponseBadRequest, JsonResponse
from django.conf import settings
from django.utils.text import get_valid_filename
from arches.app.models.models import MapLayer

import os
from uuid import uuid4
import rasterio
from pyproj import Transformer

from ..celery_tasks.basemap_tasks import create_basemap

class BasemapView(View):
    def post(self, request):
        input_geotiff = request.FILES.get('basemap_geotiff')
        if not input_geotiff:
            return HttpResponseBadRequest("File upload failed, no file provided.")
        
        basemap_name = request.POST.get('basemap_name', 'unnamed_basemap')

        if MapLayer.objects.filter(name=basemap_name).exists():
            return HttpResponseBadRequest("A basemap with this name already exists. Please choose a different name.")
        
        basemap_metadata = {
            'original_name': basemap_name,
            'sanitized_name': get_valid_filename(basemap_name),
            'sortorder': request.POST.get('basemap_sortorder', '0'),
            'activated': request.POST.get('basemap_activated', 'true').lower() == 'true',
            'ispublic': request.POST.get('basemap_ispublic', 'true').lower() == 'true',
            'addto_map': request.POST.get('basemap_addto_map', 'false').lower() == 'true',
            'isoverlay': request.POST.get('basemap_isoverlay', 'false').lower() == 'true',
            'icon': request.POST.get('basemap_icon', 'fa fa-map'),
            'authorized_group': 'TEST', #IMPORTANT: hardcoded group with basemap viewing rights,
            'bounds': None,
            'center_coordinates': None,
            'id': str(uuid4())
        }

        COG_STORAGE = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR, 'basemaps')
        basemap_dir = os.path.join(COG_STORAGE, basemap_metadata['sanitized_name'])
        os.makedirs(basemap_dir, exist_ok=True)

        original_path = os.path.join(basemap_dir, f"origin_{basemap_metadata['id']}.tif")
        cog_path = os.path.join(basemap_dir, f"{basemap_metadata['id']}.tif")
        
        try:
            self._save_file_to_location(input_geotiff, original_path)
            raster_data = self._get_raster_info(original_path, to_wgs84=True)
            basemap_metadata['center_coordinates'] = raster_data['center']
            basemap_metadata['bounds'] = raster_data['bounds']

            task = create_basemap.delay(original_path, cog_path, basemap_metadata)
            return JsonResponse({
                'status': 'processing',
                'task_id': task.id
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

    def _get_raster_info(self, path, to_wgs84=False):
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
                'bounds': bounds
            }


class BasemapCheckView(View):
    def get(self, request):
        basemap_name = request.GET.get('name')
        if not basemap_name:
            return HttpResponseBadRequest("Missing 'name' query parameter.")
        
        exists = MapLayer.objects.filter(name=basemap_name).exists()
        return JsonResponse({'exists': exists})


