from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from django.urls import include, path
from .views.model_3d import Model3DView
from .views.iiif_manifest_annotation import save_iiif_annotation_db, delete_iiif_annotation
from .views.geotiif_handler import geotiff_reencode_test, geotiff_meta, dem_file, dem_elevation

urlpatterns = [
    # project-level urls
    path('api/model-3d/upload/', Model3DView.as_view(), name='model_3d_upload'),
    path('api/manifest/update_db', save_iiif_annotation_db, name='save_iiif_annotation_db'),
    path('api/manifest/delete_annotation', delete_iiif_annotation, name='delete_iiif_annotation'),
    path("api/iiif/geotiff-reencode-test", geotiff_reencode_test, name="geotiff_reencode"),
    path("api/iiif/geotiff-meta/<str:globalid>", geotiff_meta, name="geotiff_meta"),
    path("files/dem/<uuid:globalid>.tif", dem_file, name="iiif_dem_file"),
    path("api/iiif/dem-elevation/<str:globalid>", dem_elevation, name="iiif_dem_elevation"),

    

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