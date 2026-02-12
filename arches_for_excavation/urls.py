from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from django.urls import include, path
from .views.model_3d import Model3DView
from .views.basemap import BasemapView
from .views.tile_proxy import titiler_tile_proxy
from .views.celery_utils import get_celery_task_status
from .views.iiif_manifest_annotation import save_iiif_annotation_db, delete_iiif_annotation
from .views.geotiif_handler import RasterUploadView
from .views.geotiff_manifest import BuildGeoTiffManifestView, GetGeoTiffManifestView
from .views.geotiff_files import GeoTiffFileView

urlpatterns = [
    # project-level urls
    path('api/model-3d/upload/', Model3DView.as_view(), name='model_3d_upload'),
    path('api/basemap/upload', BasemapView.as_view(), name='basemaps'),
    path('api/titiler/tiles/<str:basemap_id>/<int:z>/<int:x>/<int:y>', titiler_tile_proxy, name='titiler_tile_proxy'),
    path('api/celery/task-status/<str:task_id>', get_celery_task_status, name='celery_task_status'),
    path('api/manifest/update_db', save_iiif_annotation_db, name='save_iiif_annotation_db'),
    path('api/manifest/delete_annotation', delete_iiif_annotation, name='delete_iiif_annotation'),
    path('api/iiif/geotiff-upload', RasterUploadView.as_view(), name='geotiff_process'),
    path("api/iiif/build-geotiff-manifest", BuildGeoTiffManifestView.as_view()),
    path("api/iiif/geotiff-manifest/<uuid:resource_id>", GetGeoTiffManifestView.as_view()),
    path("api/iiif/geotiff-file/<uuid:job_id>/<str:kind>", GeoTiffFileView.as_view()),    

]


# Ensure Arches core urls are superseded by project-level urls
urlpatterns.append(path("", include("arches.urls")))


# Adds URL pattern to serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Only handle i18n routing in active project. This will still handle the routes provided by Arches core and Arches applications,
# but handling i18n routes in multiple places causes application errors.
if settings.ROOT_URLCONF == __name__:
    if settings.SHOW_LANGUAGE_SWITCH is True:
        urlpatterns = i18n_patterns(*urlpatterns)

    urlpatterns.append(path("i18n/", include("django.conf.urls.i18n")))