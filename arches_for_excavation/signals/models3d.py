import os
import shutil

from django.conf import settings
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.db import transaction
from arches.app.models.models import TileModel
from arches.app.models.resource import Resource

MODEL3D_GRAPHID = "039f5a45-82e2-4597-8609-d24c758bfd59"
PARENT_RESOURCE_NODE_ID = "f67c4c42-fe0e-489b-9af7-58405ad7c65f"
BASE_PATH = os.path.join(settings.MEDIA_ROOT, settings.UPLOADED_FILES_DIR, "3d_models")

def cleanup_3d_model_directory(directory_path):
    if os.path.exists(directory_path):
        shutil.rmtree(directory_path)
        print(f"Deleted 3D model directory: {directory_path}")
    else:
        print(f"Warning: 3D model directory does not exist: {directory_path}")


@receiver(pre_delete, sender=Resource)
def delete_3d_model_files(sender, instance, **kwargs):
    if str(instance.graph_id) == MODEL3D_GRAPHID:
        resource_id = str(instance.resourceinstanceid)
        parent_id = None

        tiles = TileModel.objects.filter(resourceinstance_id=resource_id)
        for t in tiles:
            if PARENT_RESOURCE_NODE_ID in t.data:
                node_data = t.data[PARENT_RESOURCE_NODE_ID]
                if isinstance(node_data, list) and len(node_data) > 0 and isinstance(node_data[0], dict):
                    parent_id = str(node_data[0].get('resourceId', ''))
                    break
        if parent_id:
            target_dir = os.path.abspath(
                os.path.join(
                    BASE_PATH,
                    parent_id,
                    resource_id
                )
            )

            transaction.on_commit(
                lambda: cleanup_3d_model_directory(target_dir)
            )
        else:
            print(f"Warning: Could not find parent Tile data for 3D model resource {resource_id}")