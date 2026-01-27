from celery import shared_task
from rasterio.shutil import copy
from arches.app.models.models import MapSource, MapLayer
from django.contrib.auth.models import Group
from guardian.shortcuts import assign_perm
import uuid

class ConversionError(Exception):
    pass

@shared_task
def convert_geotiff_to_cog(src_path, dst_path, basemap_metadata):
    print(f"Converting {src_path} -> {dst_path}...")
    try:
        copy(
            src_path,
            dst_path,
            driver='COG',      
            compress='DEFLATE',
            overview_resampling='NEAREST',
            blocksize=512
        )
        print("Conversion Complete.")
        register_basemap_in_db(basemap_metadata)
    except Exception as e:
        print(f"Error during conversion: {e}")
        raise ConversionError(f"Failed to convert GeoTIFF to COG: {str(e)}")

def register_basemap_in_db(basemap_metadata):
    is_public = basemap_metadata['ispublic']

    source = MapSource(
        name=basemap_metadata['id'],
        source={
            'type': 'raster',
            'tiles': [f'/api/titiler/tiles/{basemap_metadata["id"]}/{{z}}/{{x}}/{{y}}'],
            'tileSize': 512,
            'bounds': basemap_metadata['bounds']
        }
    )
    source.save()
    
    layer = MapLayer(
        maplayerid=uuid.UUID(basemap_metadata['id']),
        name=basemap_metadata['name'],
        layerdefinitions=[{
            'id': basemap_metadata['id'],
            'type': 'raster',
            'source': basemap_metadata['id']
        }],
        isoverlay=basemap_metadata['isoverlay'],
        activated=basemap_metadata['activated'],
        icon='fa fa-binoculars',
        addtomap=basemap_metadata['addto_map'],
        centerx=basemap_metadata['center_coordinates'][0],
        centery=basemap_metadata['center_coordinates'][1],
        sortorder=int(basemap_metadata['sortorder']),
        ispublic=is_public,
    )
    layer.save()

    if not is_public:
        group_name = basemap_metadata['authorized_group']
        try:
            group = Group.objects.get(name=group_name)
            assign_perm('read_maplayer', group, layer)
        except Group.DoesNotExist:
            print(f"Group '{group_name}' does not exist. Permission not assigned.")
    
    return layer.maplayerid