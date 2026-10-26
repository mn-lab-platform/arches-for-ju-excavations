from celery import shared_task
from rasterio.shutil import copy
from arches.app.models.models import MapSource, MapLayer
from django.contrib.auth.models import Group
from guardian.shortcuts import assign_perm
import uuid
from .convert_task import convert_geotiff_to_cog


class ConversionError(Exception):
    pass

@shared_task
def create_basemap(src_path, dst_path, basemap_metadata):
    print(f"Converting {src_path} -> {dst_path}...")
    try:
            result = convert_geotiff_to_cog.apply((src_path, dst_path))
            return register_basemap_in_db(basemap_metadata)
    except Exception as e:
        print(f"Error during conversion: {e}")
        raise ConversionError(f"Failed to convert GeoTIFF to COG: {str(e)}")

def register_basemap_in_db(basemap_metadata):
    is_public = basemap_metadata['ispublic']

    source = MapSource(
        name=basemap_metadata['tus_id'],
        source={
            'type': 'raster',
            'tiles': [f'/api/titiler/tiles/{basemap_metadata["tus_id"]}/{{z}}/{{x}}/{{y}}'],
            'tileSize': 256,
            'bounds': basemap_metadata['bounds']
        }
    )
    source.save()
    
    layer = MapLayer(
        maplayerid=uuid.UUID(basemap_metadata['tus_id']),
        name=basemap_metadata['original_name'],
        layerdefinitions=[{
            'id': basemap_metadata['tus_id'],
            'tus_id': basemap_metadata['tus_id'],
            'type': 'raster',
            'source': basemap_metadata['tus_id'],
            'band_count': basemap_metadata['band_count']
        }],
        isoverlay=basemap_metadata['isoverlay'],
        activated=basemap_metadata['activated'],
        icon=basemap_metadata['icon'],
        addtomap=basemap_metadata['addto_map'],
        centerx=basemap_metadata['center_coordinates'][0],
        centery=basemap_metadata['center_coordinates'][1],
        sortorder=int(basemap_metadata['sortorder']),
        ispublic=is_public,
    )
    layer.save()

    print(f"After register basemap in db: is_public={is_public}")
    if not is_public:
        print(f"Assigning read_maplayer permission to group '{basemap_metadata['authorized_group']}' for layer {layer.maplayerid}")
        group_name = basemap_metadata['authorized_group']
        try:
            group = Group.objects.get(name=group_name)
            assign_perm('read_maplayer', group, layer)
        except Group.DoesNotExist:
            print(f"Group '{group_name}' does not exist. Permission not assigned.")
    
    return {
        'basemap_id': str(layer.maplayerid),
        'centerx': layer.centerx,
        'centery': layer.centery,
        'bounds': basemap_metadata['bounds']
    }