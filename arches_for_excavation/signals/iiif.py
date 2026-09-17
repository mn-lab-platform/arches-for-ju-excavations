import os
import shutil

from django.conf import settings
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.db import transaction
from arches.app.models.models import TileModel
from arches.app.models.resource import Resource

IIIF_RESOURCE_GRAPHID = "f1b9e37a-c3ba-4c26-a797-7f16302c031c"
PARENT_RESOURCE_NODE_ID = "8bedf116-657a-4eb5-af06-b4de29839966"
BASE_PATH = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR, "iiif_raster")

def find_resource_dir(resource_id: str) -> os.PathLike:
    suffix = f"_{resource_id}"
    with os.scandir(BASE_PATH) as it:
        for entry in it:
            if entry.is_dir() and entry.name.endswith(suffix):
                return os.path.join(BASE_PATH, entry.name)
    return None

def cleanup_iiif_raster_directory(directory_path: os.PathLike):
    if os.path.exists(directory_path):
        shutil.rmtree(directory_path)
        print(f"Deleted IIIF raster directory: {directory_path}")
    else:
        print(f"Warning: IIIF raster directory does not exist: {directory_path}")

@receiver(post_delete, sender=Resource)
def delete_iiif_raster_files(sender, instance,**kwargs):
    if str(instance.graph_id) == IIIF_RESOURCE_GRAPHID:
        resource_id = str(instance.resourceinstanceid)
        
        if resource_id:
            target_dir = find_resource_dir(resource_id)
            if target_dir:
                transaction.on_commit(
                    lambda: cleanup_iiif_raster_directory(target_dir)
                )
            else:
                print(f"Warning: Could not find directory for IIIF raster resource {resource_id}")