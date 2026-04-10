import { Map as MapLibreMap, ScaleControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { centroid, polygon } from '@turf/turf';
import { updateGeojsonSource, fitMapToGeojson, createValidLayerInfoFromResourceData, addSourceAndLayersToMap, showLayer, hideLayer, refreshGeojsonLayer } from './utils/utils';

import {getMapExtent, getBasemapsAndOverlays} from '../api/archesService';

import { BasemapControl } from './controls/BasemapControl';
import { OverlayControl } from './controls/OverlayControl';
import { RecenterMapControl } from './controls/RecenterMapControl';
import { EventBusInstance } from '../core/EventBus';
import { events } from '../constants/events';
import store from '../core/store';

export class MapEngine {
    constructor(containerId) {
        this.previewFeatures = new Map();
        this.previewSourceId = 'preview-source';
        this.extent = null;
        this.map = new MapLibreMap({
            container: containerId,
            style: {
                version: 8,
                sources: {},
                layers: [] 
            },
            zoom: 16.5,
        });
        this._centerMapToDefaultExtent();
        this.map.on('load', () => {
            this._register_controls();
        });
        this._setupEventListeners();
    }

    _centerMapToDefaultExtent() {
        if (this.extent) {
            this.map.setCenter(this._getCenterFromExtent(this.extent));
            this.map.setZoom(16.5);
        } else {
            getMapExtent()
                .then(extent => {
                    this.map.setCenter(this._getCenterFromExtent(extent));
                    this.extent = extent;
                    this.map.setZoom(16.5);
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
                accent: '#22d37a',
                icon: 'fa fa-map-marker',
            }
        }
    }

    _setupEventListeners() {
        EventBusInstance.subscribe(events.PREVIEW_ADD, (resourceData) => {
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

            fitMapToGeojson(this.map, {
                type: 'FeatureCollection',
                features: Array.from(this.previewFeatures.values()).flat()
            });
        });

        EventBusInstance.subscribe(events.PREVIEW_REMOVE, (resourceId) => {
            if (!resourceId) {
                console.warn("MapEngine: PREVIEW_REMOVE ignored because couldn't resolve resourceId.", resourceId);
                return;
            }

            if (this.previewFeatures.has(resourceId)) {
                this.previewFeatures.delete(resourceId);
                updateGeojsonSource(this.map, this.previewSourceId, {
                    type: 'FeatureCollection',
                    features: Array.from(this.previewFeatures.values()).flat()
                });
            } else {
                console.warn(`MapEngine: PREVIEW_REMOVE requested for ${resourceId} but it wasn't in state.`);
            }
        });

        EventBusInstance.subscribe(events.PREVIEW_REMOVE_ALL, () => {
            this.previewFeatures.clear();
            updateGeojsonSource(this.map, this.previewSourceId, {});
        });

        EventBusInstance.subscribe(events.BASEMAP_ADD, (layerInfo) => {
            addSourceAndLayersToMap(this.map, layerInfo, store.basemapLayerId);
        });

        EventBusInstance.subscribe(events.OVERLAY_ADD, (layerInfo) => {
            addSourceAndLayersToMap(this.map, layerInfo, store.overlayLayerIds);
        });

        EventBusInstance.subscribe(events.LAYER_ADD, (layerDefinition) => {
            addSourceAndLayersToMap(this.map, layerDefinition, store.mapLayerIds);
            const features = layerDefinition.source_info.data.features;
            if (features) {
                fitMapToGeojson(this.map, {
                    type: 'FeatureCollection',
                    features: features
                });
            }
            showLayer(this.map, layerDefinition.layer_info.id);
        });

        EventBusInstance.subscribe(events.LAYER_SHOW, (layerId) => {
            store.mapLayerIds = [...store.mapLayerIds, layerId];
            showLayer(this.map, layerId);
        });

        EventBusInstance.subscribe(events.LAYER_HIDE, (layerId) => {
            store.mapLayerIds = store.mapLayerIds.filter(id => id !== layerId);
            hideLayer(this.map, layerId);
        });

        EventBusInstance.subscribe(events.LAYERS_REORDER, newlyOrderedLayerIds => {
            console.log("Reordering layers to new order: ", newlyOrderedLayerIds);
            this._reorderLayers(newlyOrderedLayerIds)
        });

        EventBusInstance.subscribe(events.LAYER_REFRESH, (layerDefinition) => {
            refreshGeojsonLayer(this.map, layerDefinition);
            fitMapToGeojson(this.map, {
                type: 'FeatureCollection',
                features: layerDefinition.source_info.data.features
            });
        });

        EventBusInstance.subscribe(events.LAYER_ZOOM_TO, (layerId) => {
            const source = this.map.getSource(layerId);
            if (source && source._data) {
                fitMapToGeojson(this.map, source._data.geojson);
            }
        });

        EventBusInstance.subscribe(events.MAP_TO_DEFAULT, () => {
            this._centerMapToDefaultExtent();
        });
    }

    _reorderLayers(newlyOrderedLayerIds) {
        //order of layer matters, we move the ones that should be lower in the stack first, so we iterate from the end of the array
        for (let i = newlyOrderedLayerIds.length -1; i >= 0; i--) {
            const layerId = newlyOrderedLayerIds[i];
            this._moveLayerToTop(layerId);
        }
    }

     _moveLayerToTop(layerId) { 
        const sufixes = ['-fill', '-line', '-circle'];
        sufixes.forEach(sfx => {
            const idToMove = `${layerId}${sfx}`;
            if (this.map.getLayer(idToMove)) {
                this.map.moveLayer(idToMove);
            }
        });
    }
}