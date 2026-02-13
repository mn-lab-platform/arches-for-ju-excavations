from django.core.cache import cache
from django.http import HttpResponse, StreamingHttpResponse, HttpResponseForbidden, HttpResponseNotFound
import requests
from arches.app.models.models import MapLayer

TITILER_INTERNAL_URL = "http://titiler:8000"
#TODO: no matter if layer is public or private only users with certain group membership can view tiles

def titiler_tile_proxy(request, basemap_id, z, x, y):
    user = request.user
    layer_cache_key = f"layer_info:{basemap_id}"
    layer_info = cache.get(layer_cache_key)

    if layer_info is None:
        print(f"Layer {basemap_id} not found in cache, querying DB")
        try:
            layer = MapLayer.objects.get(maplayerid=basemap_id)
            print(f"Fetched layer {basemap_id} from DB: {layer}")
            layer_info = {
                'name': layer.name,
                'is_public': layer.ispublic
            }
            print(f"Caching layer {basemap_id} is_public={layer.ispublic}")
            cache.set(layer_cache_key, layer_info, 300) #cache for 5 minutes
        except MapLayer.DoesNotExist:
            return HttpResponseNotFound("Layer not found")
    
    is_public = layer_info['is_public']
    if not is_public:
        if not user.is_authenticated:
            return HttpResponseForbidden("Secure Layer: Login Required")
        
        if not (user.is_staff or user.is_superuser):
            user_perm_key = f"user_perm:{user.id}:{basemap_id}:can_view"
            can_view = cache.get(user_perm_key)

            if can_view is None:
                print(f"Checking permissions for user {user.username} (id={user.id})")
                print(f"User groups: {[group.name for group in user.groups.all()]}")
                if user.groups.filter(name='TEST').exists(): #IMPORTANT: Hardcoded
                    can_view = True
                else:
                    can_view = False
                cache.set(user_perm_key, can_view, 300)
            if not can_view:
                return HttpResponseForbidden("Access Denied: Insufficient Permissions")
    
    try:
        titiler_url = f"{TITILER_INTERNAL_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}.png?url=file:///data/basemaps/{layer_info['name']}/{basemap_id}.tif&bidx=1&bidx=2&bidx=3"

        upstream_req = requests.get(titiler_url, stream=True, timeout=5)

        if upstream_req.status_code != 200:
             print(f"TiTiler Failed: {upstream_req.content}") 
             return HttpResponse(status=upstream_req.status_code)
        
        response = StreamingHttpResponse(
            upstream_req.iter_content(chunk_size=65536),
            content_type=upstream_req.headers.get('Content-Type', 'image/png'),
            status=upstream_req.status_code
        )
        response['Cache-Control'] = 'private, max-age=3600'
        return response
    
    except requests.exceptions.RequestException as e:
        return HttpResponse(status=502)