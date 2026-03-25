import { Map as MapLibreMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { centroid, polygon, bbox } from '@turf/turf';
import { updateGeojsonSource, fitMapToGeojson, createValidLayerInfoFromResourceData } from './utils';

import {getMapExtent, getBasemapsAndOverlays} from '../api/archesService';

import BasemapControl from './controls/BasemapControl';
import { OverlayControl } from './controls/OverlayControl';
import { EventBusInstance } from '../core/EventBus';
import { events } from '../constants/events';

export class MapEngine {
    constructor(containerId) {
        this.previewFeatures = new Map();
        this.previewSourceId = 'preview-source';
        this.map = new MapLibreMap({
            container: containerId,
            style: {
                version: 8,
                sources: {},
                layers: [] 
            },
            zoom: 16.5,
        });
        this._centerMap();
        this.map.on('load', () => {
            this._register_controls();
        });
        this._setupEventListeners();
    }

    _centerMap() {
        getMapExtent()
            .then(extent => {
                const extentPolygon = polygon([extent]);
                const center = centroid(extentPolygon);
                this.map.setCenter(center.geometry.coordinates ?? [0, 0]);
            })
            .catch(error => {
                console.error('Error fetching map extent:', error);
            });
    }

     _register_controls() {
        return getBasemapsAndOverlays()
            .then(info => {
                const basemapInfo = info.basemaps;
                const overlayInfo = info.overlays;
                console.log("overlays: ", overlayInfo);
                

                const basemapControl = new BasemapControl({
                    layers: basemapInfo
                });
                this.map.addControl(basemapControl, 'top-right');

                const overlayLayers = [this._createPreviewMapDefinition(), ...overlayInfo];
                console.log("overlayLayers: ", overlayLayers);
                const overlayControl = new OverlayControl({
                    layers: overlayLayers
                });
                this.map.addControl(overlayControl, 'top-right');
            })
            .catch(error => {
                console.error('Error registering controls:', error);
                this.map.addControl(new BasemapControl({ layers: [] }), 'top-right');
                this.map.addControl(new OverlayControl({ layers: [] }), 'top-right');
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
            }, { padding: 50, duration: 800 });
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
    }
}