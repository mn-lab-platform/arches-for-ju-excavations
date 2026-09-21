from django.views import View
from django.http import HttpResponseBadRequest, JsonResponse
from arches.app.models.models import MapLayer, MapSource


class BasemapCheckView(View):
    def get(self, request):
        basemap_name = request.GET.get('name')
        if not basemap_name:
            return HttpResponseBadRequest("Missing 'name' query parameter.")
        
        exists = MapLayer.objects.filter(name=basemap_name).exists()
        return JsonResponse({'exists': exists})

class BasemapAccessView(View):
    def get(self, request):
        user_can_access_restricted = self._user_can_access_restricted_basemaps(request.user)

        map_sources = MapSource.objects.only('name', 'source').all()
        
        layer_query = MapLayer.objects.only(
            'maplayerid', 'name', 'sortorder', 'icon', 
            'ispublic', 'isoverlay', 'layerdefinitions'
        )
        if not user_can_access_restricted:
            layer_query = layer_query.filter(ispublic=True)
        
        map_layers = {str(l.maplayerid): l for l in layer_query}

        basemaps = []
        overlays = []
        
        for source in map_sources:
            layer = map_layers.get(str(source.name))
            if not layer:
                continue
            if not layer.ispublic and not self._user_can_access_restricted_basemaps(request.user):
                continue
            
            layer_info = self._build_basemap_info(source, layer)
            
            if layer.isoverlay:
                overlays.append(layer_info)
            else:
                basemaps.append(layer_info)
        
        basemaps.sort(key=lambda x: x['layer_info']['sortorder'])
        overlays.sort(key=lambda x: x['layer_info']['sortorder'])

        return JsonResponse({
            'basemaps': basemaps,
            'overlays': overlays
        })
                    

    def _build_basemap_info(self, source, layer):
        return {
            'source_info': {
                'name': source.name,
                'type': 'raster',
                'tiles': source.source.get('tiles', [None]) if source.source else None,
                'tileSize': source.source.get('tileSize') if source.source else None,
                'bounds': source.source.get('bounds') if source.source else None
            },
            'layer_info': {
                'name': layer.name,
                'id': str(layer.layerdefinitions[0]['id']) if layer.layerdefinitions else None,
                'source': layer.layerdefinitions[0]['source'] if layer.layerdefinitions else None,
                'sortorder': layer.sortorder,
                'icon': layer.icon
            }
        }
    def _user_can_access_restricted_basemaps(self, user):
        return user.groups.filter(name='Restricted Basemap Access').exists() or user.is_superuser
