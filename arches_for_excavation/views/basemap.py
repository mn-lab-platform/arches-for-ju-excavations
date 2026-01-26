from django.views import View
from django.http import HttpResponseBadRequest, JsonResponse, HttpResponse
from django.conf import settings
from django.utils.text import get_valid_filename
import os
from uuid import uuid4
import rasterio
from pyproj import Transformer

from ..celery_tasks.basemap_tasks import convert_geotiff_to_cog


class BasemapView(View):
    def post(self, request):
        input_geotiff = request.FILES.get('basemap_geotiff')
        if not input_geotiff:
            return HttpResponseBadRequest("File upload failed, no file provided.")
        
        basemap_name = get_valid_filename(request.POST.get('basemap_name', 'unnamed_basemap'))
        basemap_legend = request.POST.get('basemap_legend', '')
        basemap_sortorder = request.POST.get('basemap_sortorder', '0')
        basemap_activated = request.POST.get('basemap_activated', 'true').lower() == 'true'
        basemap_addto_map = request.POST.get('basemap_addto_map', 'false').lower() == 'true'
        basemap_searchonly = request.POST.get('basemap_searchonly', 'false').lower() == 'true'
        basemap_ispublic = request.POST.get('basemap_ispublic', 'true').lower() == 'true'
        basemap_isoverlay = request.POST.get('basemap_isoverlay', 'false').lower() == 'true'
        basemap_id = str(uuid4())

        COG_STORAGE = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR, 'basemaps')
        basemap_dir = os.path.join(COG_STORAGE, basemap_name)
        original_geotiff_path = os.path.join(basemap_dir, f"origin_{basemap_id}.tif")
        dst_cog_path = os.path.join(basemap_dir, f"{basemap_id}.tif")
        
        try:
            os.makedirs(basemap_dir, exist_ok=True)
            self._save_file_to_location(input_geotiff, original_geotiff_path)
            raster_data = self._get_raster_info(original_geotiff_path, to_wgs84=True)
            task = convert_geotiff_to_cog.delay(original_geotiff_path, dst_cog_path)
            return JsonResponse({
                'status': 'success',
                'task_id': task.id,
                'basemap_metadata' : {
                    'id': basemap_id,
                    'name': basemap_name,
                    'center_coordinates': raster_data['center'],
                    'bounds': raster_data['bounds'],
                    'legend': basemap_legend,
                    'sort_order': int(basemap_sortorder),
                    'activated': basemap_activated,
                    'add_to_map': basemap_addto_map,
                    'search_only': basemap_searchonly,
                    'is_public': basemap_ispublic,
                    'is_overlay': basemap_isoverlay
                }
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



