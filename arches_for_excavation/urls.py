from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from django.urls import include, path
from .views.model_3d import Model3DView
from .views.basemap import BasemapUploadView, BasemapCheckView, BasemapAccessView
from .views.local_coordinate_system import LocalCoordinateSystemDefineView,    LocalCoordinateSystemDownloadView, LocalCoordinateSystemAssignToResourcesView
from .views.tile_proxy import titiler_tile_proxy
from .views.celery_utils import get_celery_task_status
from .views.iiif_manifest_annotation import save_iiif_annotation_db, delete_iiif_annotation
from .views.geotiif_handler import RasterUploadView ,dem_pixel_value
from .views.geotiff_manifest import BuildGeoTiffManifestView, GetGeoTiffManifestView, ManifestEditView, ResourceContextView
from .views.geotiff_files import GeoTiffFileView
from .views.dem_pixel_sample import dem_pixel_sample
from .views.iiif_titler_proxy import titiler_iiif_proxy
from .views.iiif_photo_handler import PhotoUploadView
urlpatterns = [
    # project-level urls
    path('api/model-3d/upload/', Model3DView.as_view(), name='model_3d_upload'),
    path('api/basemap/upload', BasemapUploadView.as_view(), name='basemaps'),
    path('api/basemap/check-name', BasemapCheckView.as_view(), name='basemap_check_name'),
    path('api/basemap/access-info', BasemapAccessView.as_view(), name='basemap_access_info'),
    path('api/local-coordinate-system/define', LocalCoordinateSystemDefineView.as_view(), name='local_coordinate_system_define'),
    path('api/local-coordinate-system/<str:resource_id>/download/<str:definition_type>', LocalCoordinateSystemDownloadView.as_view(), name='local_coordinate_system_download'),
    path('api/local-coordinate-system/assign', LocalCoordinateSystemAssignToResourcesView.as_view(), name='local_coordinate_system_assign'),
    path('api/titiler/tiles/<str:basemap_id>/<int:z>/<int:x>/<int:y>', titiler_tile_proxy, name='titiler_tile_proxy'),
    path('api/celery/task-status/<str:task_id>', get_celery_task_status, name='celery_task_status'),
    path('api/manifest/update_db', save_iiif_annotation_db, name='save_iiif_annotation_db'),
    path('api/manifest/delete_annotation', delete_iiif_annotation, name='delete_iiif_annotation'),
    path('api/iiif/geotiff-upload', RasterUploadView.as_view(), name='geotiff_process'),
    path("api/iiif/build-geotiff-manifest", BuildGeoTiffManifestView.as_view()),
    path("api/iiif/geotiff-manifest/<uuid:resource_id>", GetGeoTiffManifestView.as_view()),
    path("api/iiif/geotiff-file/<uuid:job_id>/<str:kind>", GeoTiffFileView.as_view()),
    path("api/iiif/dem/pixel", dem_pixel_sample, name="dem_pixel_sample"),    
    path("iiif/api/iiif/titiler-proxy", titiler_iiif_proxy, name="titiler-iiif-proxy"),
    path("api/iiif/dem/pixel-value", dem_pixel_value, name="dem_pixel_value"),
    path("api/iiif/geotiff-manifest/edit/<uuid:resource_id>", ManifestEditView.as_view(), name="manifest_edit"),
    path("api/iiif/photo-upload", PhotoUploadView.as_view(), name="iiif-photo-upload"),
    path("api/iiif/resource-context/<uuid:resource_id>", ResourceContextView.as_view(), name="iiif_resource_context"),
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