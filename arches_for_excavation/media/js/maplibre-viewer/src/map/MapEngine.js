import { Map as MapLibreMap, ScaleControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { centroid, polygon } from '@turf/turf';
import { updateGeojsonSource, createValidLayerInfoFromResourceData, addSourceAndLayersToMap, showLayer, hideLayer, refreshGeojsonLayer, fitMapToBounds, extractBoundsFromRasterPreviewLayers, extractBoundsFromVectorPreviewLayers, extractBoundsFromGeojson, extractBoundsFromLayerDefinition } from './utils/utils';
import { combineLngLatBounds } from './utils/bounds';
import { getMapExtent, getBasemapsAndOverlays } from '../api/archesService';
import { createWarpedOrthoLayer } from './iiif/iiifLayerFactory';
import { BasemapControl } from './controls/BasemapControl';
import { OverlayControl } from './controls/OverlayControl';
import { RecenterMapControl } from './controls/RecenterMapControl';
import { PrintControl } from './controls/PrintControl';
import { EventBusInstance } from '../core/EventBus';
import { events } from '../constants/events';
import store from '../core/store';
import constants from '../constants/constants';

export class MapEngine {
    constructor(containerId) {
        this.previewFeatures = new Map();
        this.orthoLayer = new Map();
        this.previewSourceId = 'preview-source';
        this.previewOrthoLayers = new Map();
        this.container = document.getElementById(containerId);
        this.extent = null;
        this.map = new MapLibreMap({
            container: containerId,
            preserveDrawingBuffer: true,
            style: {
                version: 8,
                sources: {},
                layers: [] 
            },
            zoom: 16.5,
            maxZoom: 24,
            maxPitch: 0
        });
        this._centerMapToDefaultExtent();
        this.map.on('load', async () => {
            this._register_controls();
            await this._loadHatchFillImages();
        });
        this._setupEventListeners();
    }

    async _loadHatchFillImages() {
        for (const path of constants.HATCH_FILL_SOURCE_PATHS) {
            try {
                const image = await this.map.loadImage(path);
                this.map.addImage(path, image.data);
            } catch (error) {
                console.error(`Error loading image from path: ${path}`, error);
            }
        }
    }

    async _addIiifPreview(resourceData) {
        const resourceId = resourceData.resourceId;
        const layerId = `preview-ortho-${resourceId}`;

        if (this.previewOrthoLayers.has(resourceId)) return;

        const warpedLayer = await createWarpedOrthoLayer({
            map: this.map,
            resourceId,
            layerId,
            opacity: resourceData.opacity ?? 1
        });

        this.previewOrthoLayers.set(resourceId, {
            id: layerId,
            layer: warpedLayer
        });
    }

    _removeIiifPreview(resourceId) {
        const preview = this.previewOrthoLayers.get(resourceId);

        if (!preview) return;

        if (this.map.getLayer(preview.id)) {
            this.map.removeLayer(preview.id);
        }

        this.previewOrthoLayers.delete(resourceId);
    }

    _getMapLayerIdsForLayer(layerId) {
        const iiifIds = Array.from(this.orthoLayer.values())
            .filter(entry => entry.logicalLayerId === layerId)
            .map(entry => entry.id);

        if (iiifIds.length > 0) {
            return iiifIds;
        }

        return [
            layerId,
            `${layerId}-fill`,
            `${layerId}-fill-pattern`,
            `${layerId}-line`,
            `${layerId}-circle`,
            `${layerId}-symbol`
        ];
    }    

    _centerMapToDefaultExtent() {
        if (this.extent) {
            this.map.setCenter(this._getCenterFromExtent(this.extent));
            this.map.setZoom(16.5);
            this.map.setBearing(0);
        } else {
            getMapExtent()
                .then(extent => {
                    this.map.setCenter(this._getCenterFromExtent(extent));
                    this.extent = extent;
                    this.map.setZoom(16.5);
                    this.map.setBearing(0);
                })
                .catch(error => {
                    console.error('Error fetching map extent:', error);
                });
        }
    }

    _getCenterFromExtent(extent) {
        const extentPolygon = polygon([extent]);
        const center = centroid(extentPolygon);
        return center.geometry.coordinates ?? [0, 0];
    }

    _register_controls() {
        this.map.addControl(new ScaleControl({
            maxWidth: 200,
            unit: 'metric'
        }), 'bottom-right');
        return getBasemapsAndOverlays()
            .then(info => {
                const basemapInfo = info.basemaps;
                const overlayInfo = info.overlays;

                const basemapControl = new BasemapControl({
                    layers: basemapInfo
                });
                this.map.addControl(basemapControl, 'top-right');

                const overlayLayers = [this._createPreviewMapDefinition(), ...overlayInfo];
                const overlayControl = new OverlayControl({
                    layers: overlayLayers
                });
                this.map.addControl(overlayControl, 'top-right');

                const recenterControl = new RecenterMapControl();
                this.map.addControl(recenterControl, 'top-right');

                const printControl = new PrintControl(this.container, this.orthoLayer);
                this.map.addControl(printControl, 'top-right');

            })
            .catch(error => {
                console.error('Error registering controls:', error);
            });
    }

    _createPreviewMapDefinition() {
        return {
            source_info: {
                name: this.previewSourceId,
                type: 'geojson',
                data: { type: 'FeatureCollection', features: [] }
            },
            layer_info: {
                id: 'preview-layer',
                name: 'Layer Preview',
                source: this.previewSourceId,
                color: '#22d37a',
                icon: 'fa fa-map-marker',
            }
        }
    }

    async _addOrthoLayer(resourceId, name = 'IIIF Ortho', layerId=`ortho-layer-${resourceId}`, logicalLayerId=layerId, opacity) {
        if (this.map.getLayer(layerId)) {
            console.warn(`Ortho layer for resource ${resourceId} already exists on the map. Skipping adding it again.`);
            return;
        }

        const warpedLayer = await createWarpedOrthoLayer({
            map: this.map,
            resourceId,
            layerId,
            opacity
        });

        this.orthoLayer.set(layerId, {
            id: layerId,
            name,
            resourceId,
            logicalLayerId,
            opacity,
            layer: warpedLayer
        });    
    }

    _setupEventListeners() {
        EventBusInstance.subscribe(events.PREVIEW_ADD, async (resourceData) => {
            if (resourceData.type === constants.LAYER_TYPES.iiif) {
                await this._addIiifPreview(resourceData);
            }
            else {
                const validLayerInfo = createValidLayerInfoFromResourceData(resourceData);

                if (!validLayerInfo) {
                    console.warn(`MapEngine: Resource with id ${resourceData.resourceId} was not processed into valid layer info and will be skipped.`, resourceData);
                    return;
                }

                this.previewFeatures.set(resourceData.resourceId, validLayerInfo);

                updateGeojsonSource(this.map, this.previewSourceId, {
                    type: 'FeatureCollection',
                    features: Array.from(this.previewFeatures.values()).flat()
                });

            }
            this._fitToAllPreviews();
        });

        EventBusInstance.subscribe(events.PREVIEW_REMOVE, (resourceId) => {
            if (!resourceId) {
                console.warn("MapEngine: PREVIEW_REMOVE ignored because couldn't resolve resourceId.", resourceId);
                return;
            }

            if (this.previewOrthoLayers.has(resourceId)) {
                this._removeIiifPreview(resourceId);
            }
            else if (this.previewFeatures.has(resourceId)) {
                this.previewFeatures.delete(resourceId);
                updateGeojsonSource(this.map, this.previewSourceId, {
                    type: 'FeatureCollection',
                    features: Array.from(this.previewFeatures.values()).flat()
                });
            } else {
                console.warn(`MapEngine: PREVIEW_REMOVE requested for ${resourceId} but it wasn't in state.`);
            }

            this._fitToAllPreviews();
        });

        EventBusInstance.subscribe(events.PREVIEW_REMOVE_ALL, () => {
            for (const resourceId of this.previewOrthoLayers.keys()) {
                this._removeIiifPreview(resourceId);
            }
            this.previewFeatures.clear();
            updateGeojsonSource(this.map, this.previewSourceId, {});
        });

        EventBusInstance.subscribe(events.BASEMAP_ADD, (layerInfo) => {
            addSourceAndLayersToMap(this.map, layerInfo, store.basemapLayerId);
        });

        EventBusInstance.subscribe(events.OVERLAY_ADD, (layerInfo) => {
            addSourceAndLayersToMap(this.map, layerInfo, store.overlayLayerIds);
        });

        EventBusInstance.subscribe(events.LAYER_ADD, async (layerDefinition) => {
            if (layerDefinition.source_info.type === constants.LAYER_TYPES.iiif) {
                for (const iiifMetadataObject of layerDefinition.source_info.data) {
                    await this._addOrthoLayer(
                        iiifMetadataObject.resourceId, 
                        iiifMetadataObject.displayName, 
                        iiifMetadataObject.uniqueIiifId, 
                        layerDefinition.layer_info.id, 
                        layerDefinition.layer_info.rasterOpacity ?? layerDefinition.layer_info.opacity ?? 1
                    );
                    
                    store.iiifPrintLayers = [
                        ...store.iiifPrintLayers,
                        {
                            layerId: iiifMetadataObject.uniqueIiifId,
                            logicalLayerId: layerDefinition.layer_info.id,
                            resourceId: iiifMetadataObject.resourceId,
                            opacity: layerDefinition.layer_info.rasterOpacity ?? layerDefinition.layer_info.opacity ?? 1
                        }
                    ];
                }
            } else if (layerDefinition.source_info.type === constants.LAYER_TYPES.geojson) {
                addSourceAndLayersToMap(this.map, layerDefinition, store.mapLayerIds);
            }

            showLayer(this.map, layerDefinition.layer_info.id);

            const bounds = extractBoundsFromLayerDefinition(layerDefinition, this.orthoLayer);
            if (bounds) {
                fitMapToBounds(this.map, bounds);
            }
        });

        EventBusInstance.subscribe(events.LAYER_REMOVE, (layerId) => {
            const mapLayerIds = this._getMapLayerIdsForLayer(layerId);
            mapLayerIds.forEach(id => {
                if (this.map.getLayer(id)) {
                    this.map.removeLayer(id);
                }
                if (this.orthoLayer.has(id)) {
                    this.orthoLayer.delete(id);
                }
            });

            const sourceIdsToRemove = new Set([layerId, ...mapLayerIds.filter(id => !id.includes('-fill') && !id.includes('-line') && !id.includes('-circle') && !id.includes('-symbol'))]);
            sourceIdsToRemove.forEach(sourceId => {
                if (this.map.getSource(sourceId)) {
                    this.map.removeSource(sourceId);
                }
            });

            store.mapLayerIds = store.mapLayerIds.filter(id => id !== layerId);
            store.iiifPrintLayers = store.iiifPrintLayers.filter(printLayer => printLayer.logicalLayerId !== layerId);
        });

        EventBusInstance.subscribe(events.LAYER_SHOW, (layerId) => {
            store.mapLayerIds = [...store.mapLayerIds, layerId];
            showLayer(this.map, this._getMapLayerIdsForLayer(layerId));
        });

        EventBusInstance.subscribe(events.LAYER_HIDE, (layerId) => {
            store.mapLayerIds = store.mapLayerIds.filter(id => id !== layerId);
            hideLayer(this.map, this._getMapLayerIdsForLayer(layerId));
        });

        EventBusInstance.subscribe(events.LAYERS_REORDER, newlyOrderedLayerIds => {
            this._reorderLayers(newlyOrderedLayerIds)
        });

        EventBusInstance.subscribe(events.LAYER_REFRESH, (layerDefinition) => {
            if (layerDefinition.source_info.type === constants.LAYER_TYPES.iiif) {
                const logicalLayerId = layerDefinition.layer_info.id;
                const newOpacity = layerDefinition.layer_info.rasterOpacity ?? layerDefinition.layer_info.opacity ?? 1;

                layerDefinition.source_info.data.forEach(iiifMetadataObject => {
                    const orthoEntry = this.orthoLayer.get(iiifMetadataObject.uniqueIiifId);
                    if (orthoEntry) {
                        orthoEntry.opacity = newOpacity;
                        orthoEntry.layer.setOpacity(newOpacity);
                    }
                });

                store.iiifPrintLayers = store.iiifPrintLayers.map(printLayer => {
                    if (printLayer.logicalLayerId === logicalLayerId) {
                        return { ...printLayer, opacity: newOpacity };
                    }
                    return printLayer;
                });

            } else if (layerDefinition.source_info.type === constants.LAYER_TYPES.geojson) {
                refreshGeojsonLayer(this.map, layerDefinition);
            }

            const bounds = extractBoundsFromLayerDefinition(layerDefinition, this.orthoLayer);
            if (bounds) {
                fitMapToBounds(this.map, bounds);
            }
        });

        EventBusInstance.subscribe(events.LAYER_ZOOM_TO, (layerDefinition) => {
            const bounds = extractBoundsFromLayerDefinition(layerDefinition, this.orthoLayer);
            if (bounds) {
                fitMapToBounds(this.map, bounds);
            }
        });

        EventBusInstance.subscribe(events.MAP_TO_DEFAULT, () => {
            this._centerMapToDefaultExtent();
        });
    }

    _fitToAllPreviews() {
        const rasterBounds = extractBoundsFromRasterPreviewLayers(Array.from(this.previewOrthoLayers.values())) || [];
        const vectorBounds = extractBoundsFromVectorPreviewLayers(Array.from(this.previewFeatures.values()).flat());

        const allBounds = [...rasterBounds, ...vectorBounds];

        const combinedBounds = combineLngLatBounds(allBounds);
        
        if (combinedBounds) {
            fitMapToBounds(this.map, combinedBounds);
        }
    }

    _reorderLayers(newlyOrderedLayerIds) {
        for (let i = newlyOrderedLayerIds.length -1; i >= 0; i--) {
            const layerId = newlyOrderedLayerIds[i];
            this._moveLayerToTop(layerId);
        }
    }

     _moveLayerToTop(layerId) { 
        const mapLayerIds = this._getMapLayerIdsForLayer(layerId);
        
        mapLayerIds.forEach(idToMove => {
            if (this.map.getLayer(idToMove)) {
                this.map.moveLayer(idToMove);
            }
        });
    }
}