import os
import shutil

from django.conf import settings
from django.core.cache import cache
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.db import transaction
from arches.app.models.models import MapLayer, MapSource

BASE_PATH = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR)

def execute_basemap_cleanup(maplayer_id, layer_definitions):
    """Handles file and source deletion after the MapLayer deletion commits."""

    if not maplayer_id or not layer_definitions:
        print(f"Skipping cleanup: maplayer_id={maplayer_id}, layer_definition={layer_definition}")
        return

    layer_definition = (layer_definitions or [{}])[0]

    source_name = layer_definition.get("source")
    tus_id = layer_definition.get("tus_id")

    original_file = os.path.join(BASE_PATH, tus_id)
    original_info_file = os.path.join(BASE_PATH, f"{tus_id}.info")
    cog_file = os.path.join(BASE_PATH, "maplayers", f"{tus_id}.tif")

    for file in [original_file, original_info_file, cog_file]:
        if os.path.exists(file):
            os.remove(file)

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