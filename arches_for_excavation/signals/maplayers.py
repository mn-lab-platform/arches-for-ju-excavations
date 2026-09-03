import os
import shutil

from django.conf import settings
from django.core.cache import cache
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.db import transaction
from arches.app.models.models import MapLayer, MapSource

def execute_basemap_cleanup(maplayer_id, layer_definitions):
    """Handles file and source deletion after the MapLayer deletion commits."""
    layer_definition = (layer_definitions or [{}])[0]

    basemap_dir = layer_definition.get("basemap_dir")
    source_name = layer_definition.get("source")

    if basemap_dir:
        basemap_root = os.path.abspath(
            os.path.join(
                settings.MEDIA_ROOT,
                settings.UPLOADED_FILES_DIR,
                "basemaps",
            )
        )
        directory = os.path.abspath(os.path.join(basemap_root, basemap_dir))

        if directory.startswith(basemap_root + os.sep):
            shutil.rmtree(directory, ignore_errors=True)

    if source_name:
        MapSource.objects.filter(name=source_name).delete()

    if maplayer_id:
        cache.delete(f"layer_info:{maplayer_id}")
        
    print(f"Deleted files and source for MapLayer: {maplayer_id}")


@receiver(post_delete, sender=MapLayer)
def delete_maplayer_files(sender, instance, **kwargs):
    maplayer_id = instance.maplayerid
    layer_definitions = instance.layerdefinitions
    
    transaction.on_commit(
        lambda: execute_basemap_cleanup(maplayer_id, layer_definitions)
    )