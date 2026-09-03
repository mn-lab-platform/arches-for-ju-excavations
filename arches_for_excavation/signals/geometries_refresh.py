"""Signal handlers for project-wide Arches maintenance."""

import logging

from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver

from arches.app import tasks
from arches.app.models.models import GraphXPublishedGraph


logger = logging.getLogger(__name__)


def _queue_geojson_geometry_refresh():
    """Queue the global geometry rebuild without failing an already-published graph."""
    try:
        tasks.refresh_geojson_geometries.delay()
    except Exception:
        logger.exception("Could not queue GeoJSON geometry refresh after graph publication")


@receiver(
    post_save,
    sender=GraphXPublishedGraph,
    dispatch_uid="refresh_geometries_after_resource_model_publish",
)
def refresh_geometries_after_resource_model_publish(
    sender, instance, created, **kwargs
):
    """Rebuild map geometries after a Resource Model is successfully published."""
    if not created or not instance.graph.isresource:
        return

    transaction.on_commit(_queue_geojson_geometry_refresh, robust=True)
