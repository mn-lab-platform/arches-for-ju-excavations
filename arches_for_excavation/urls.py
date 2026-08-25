from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from django.urls import include, path
from .views.model_3d import Model3DView
from .views.cesium_plugin import Models3DAccessView
from .views.basemap import BasemapUploadView, BasemapCheckView, BasemapAccessView
from .views.local_coordinate_system import LocalCoordinateSystemDefineView, LocalCoordinateSystemDownloadView, LocalCoordinateSystemAssignToResourcesView
from .views.tile_proxy import titiler_tile_proxy
from .views.celery_utils import get_celery_task_status
from .views.geotiif_handler import RasterUploadView ,dem_pixel_value
from .views.geotiff_manifest import BuildGeoTiffManifestView, GetGeoTiffManifestView, ManifestEditView, ResourceContextView
from .views.geotiff_files import GeoTiffFileView
from .views.dem_pixel_sample import dem_pixel_sample
from .views.iiif_titler_proxy import iiif_image_info, iiif_image_service, titiler_iiif_proxy
from .views.iiif_photo_handler import PhotoUploadView
from .views.iiif_map_plugin import IiifAllmapsLayersView
from .views.iiif_rti_handler import RTIUploadView, RTIInfoView, RTIManifestView, RTIManifestSettingsView, RTIManifestCropView
from .views.iiif_thumbnail import IiifThumbnailView
from .views.pottery import PotteryImportPreviewView, PotteryImportWorkbookPreviewView
from .views.pac_wikidata import PacWikidataDictionarySearchView
from .views.pottery_records import (
    AmphoraeRecordImportView,
    PotteryRecordCommitView,
    PotteryRecordPreviewView,
    PotteryRecordTemplateView,
    PotteryRecordsForCollectionView,
    StorageVesselRecordImportView,
    TableWareRecordImportView,
)
from .views.model_matrix import GenerateModelMatrixView
from .views.iiif_thumbnail import IiifThumbnailView
from .views.cesium_plugin import Models3DAccessView
from .views.cidoc_periodic_table import CidocPeriodicTableDataView
from .views.ontology_usage import OntologyUsageModelGraphView, OntologyUsageModelLayoutView, OntologyUsageModelsView
from .views.resource_mapping_editor import ResourceMappingGraphsView, ResourceMappingMigrateView, ResourceMappingSuggestView

urlpatterns = [
    # project-level urls
    path("thumbnail/<uuid:resource_id>", IiifThumbnailView.as_view(), name="thumbnail"),
    path('api/model-3d/upload/', Model3DView.as_view(), name='model_3d_upload'),
    path('api/model-3d/all/access', Models3DAccessView.as_view(), name='model_3d_access'),
    path('api/model-matrix/generate', GenerateModelMatrixView.as_view(), name='generate_model_matrix'),
    path('api/basemap/upload', BasemapUploadView.as_view(), name='basemaps'),
    path('api/basemap/check-name', BasemapCheckView.as_view(), name='basemap_check_name'),
    path('api/basemap/access-info', BasemapAccessView.as_view(), name='basemap_access_info'),
    path('api/local-coordinate-system/define', LocalCoordinateSystemDefineView.as_view(), name='local_coordinate_system_define'),
    path('api/local-coordinate-system/<str:resource_id>/download/<str:definition_type>', LocalCoordinateSystemDownloadView.as_view(), name='local_coordinate_system_download'),
    path('api/local-coordinate-system/assign', LocalCoordinateSystemAssignToResourcesView.as_view(), name='local_coordinate_system_assign'),
    path('api/titiler/tiles/<str:basemap_id>/<int:z>/<int:x>/<int:y>', titiler_tile_proxy, name='titiler_tile_proxy'),
    path('api/celery/task-status/<str:task_id>', get_celery_task_status, name='celery_task_status'),
    path('api/iiif/geotiff-upload', RasterUploadView.as_view(), name='geotiff_process'),
    path("api/iiif/build-geotiff-manifest", BuildGeoTiffManifestView.as_view()),
    path("api/iiif/geotiff-manifest/<uuid:resource_id>", GetGeoTiffManifestView.as_view()),
    path("api/iiif/geotiff-file/<uuid:job_id>/<str:kind>", GeoTiffFileView.as_view()),
    path("api/iiif/dem/pixel", dem_pixel_sample, name="dem_pixel_sample"),    
    path("iiif/image/<str:image_id>/info.json", iiif_image_info, name="iiif-image-info"),
    path("iiif/image/<str:image_id>/<path:iiif_request>", iiif_image_service, name="iiif-image-service-request"),
    path("iiif/image/<str:image_id>", iiif_image_service, name="iiif-image-service"),
    path("iiif/api/iiif/titiler-proxy", titiler_iiif_proxy, name="titiler-iiif-proxy"),
    path("api/iiif/dem/pixel-value", dem_pixel_value, name="dem_pixel_value"),
    path("api/iiif/geotiff-manifest/edit/<uuid:resource_id>", ManifestEditView.as_view(), name="manifest_edit"),
    path("api/iiif/photo-upload", PhotoUploadView.as_view(), name="iiif-photo-upload"),
    path("api/iiif/resource-context/<uuid:resource_id>", ResourceContextView.as_view(), name="iiif_resource_context"),
    path('api/iiif/<str:resource_id>/allmaps-layers', IiifAllmapsLayersView.as_view(), name='iiif_allmaps_layers'),
    path("api/iiif/rti-upload", RTIUploadView.as_view(), name="iiif-rti-upload"),
    path("api/iiif/rti-info/<uuid:job_id>/info.json", RTIInfoView.as_view(), name="iiif-rti-info"),
    path("api/iiif/rti-manifest/<uuid:resource_id>/settings", RTIManifestSettingsView.as_view(), name="iiif-rti-manifest-settings"),
    path("api/iiif/rti-manifest/<uuid:resource_id>/crop", RTIManifestCropView.as_view(), name="iiif-rti-manifest-crop"),
    path("api/iiif/rti-manifest/<uuid:resource_id>", RTIManifestView.as_view(), name="iiif-rti-manifest"),
    path("api/pottery/import-preview", PotteryImportPreviewView.as_view(), name="pottery_import_preview"),
    path("api/pottery/import-preview/workbook", PotteryImportWorkbookPreviewView.as_view(), name="pottery_import_workbook_preview"),
    path("api/wikidata/dictionaries/search", PacWikidataDictionarySearchView.as_view(), name="pac_wikidata_dictionary_search"),
    path("api/pottery/records/<str:record_type>/preview", PotteryRecordPreviewView.as_view(), name="pottery_record_preview"),
    path("api/pottery/records/<str:record_type>/template", PotteryRecordTemplateView.as_view(), name="pottery_record_template"),
    path("api/pottery/records/<str:record_type>/commit", PotteryRecordCommitView.as_view(), name="pottery_record_commit"),
    path("api/pottery/records/amphorae/import",AmphoraeRecordImportView.as_view(),name="amphorae_record_import"),
    path("api/pottery/collections/<uuid:collection_resource_id>/records/<str:record_type>",PotteryRecordsForCollectionView.as_view(),name="pottery_records_for_collection",),         
    path("api/pottery/records/storage-vessel/import", StorageVesselRecordImportView.as_view(), name="storage_vessel_record_import"),
    path("api/pottery/records/table-ware/import", TableWareRecordImportView.as_view(), name="table_ware_record_import"),
    path("api/cidoc-periodic-table", CidocPeriodicTableDataView.as_view(), name="cidoc_periodic_table_data"),
    path("api/ontology-usage/models", OntologyUsageModelsView.as_view(), name="ontology_usage_models"),
    path("api/ontology-usage/models/<str:graph_id>", OntologyUsageModelGraphView.as_view(), name="ontology_usage_model_graph"),
    path("api/ontology-usage/models/<str:graph_id>/layout", OntologyUsageModelLayoutView.as_view(), name="ontology_usage_model_layout"),
    path("api/resource-mapping/graphs", ResourceMappingGraphsView.as_view(), name="resource_mapping_graphs"),
    path("api/resource-mapping/suggest", ResourceMappingSuggestView.as_view(), name="resource_mapping_suggest"),
    path("api/resource-mapping/migrate", ResourceMappingMigrateView.as_view(), name="resource_mapping_migrate"),
]