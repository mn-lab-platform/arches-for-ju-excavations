import { Map as MapLibreMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { centroid, polygon, bbox } from '@turf/turf';

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

    _updatePreviewSource() {
        const source = this.map.getSource(this.previewSourceId);
        if (!source) {
            return;
        }

        const allFeatures = Array.from(this.previewFeatures.values()).flat();
        
        source.setData({
            type: 'FeatureCollection',
            features: allFeatures
        });
    }

    _fitMapToPreview() {
        const allFeatures = Array.from(this.previewFeatures.values()).flat();
        if (allFeatures.length === 0) {
            return;
        }

        try {
            const fc = {
                type: 'FeatureCollection',
                features: allFeatures
            };
            
            const bounds = bbox(fc);

            if (bounds && bounds.length === 4 && bounds.every(b => isFinite(b))) {
                this.map.fitBounds([[bounds[0], bounds[1]], [bounds[2], bounds[3]]], {
                    padding: 50,
                    duration: 800
                });
            } else {
                console.error("MapEngine: Invalid bounds calculated:", bounds);
            }
        } catch (e) {
            console.error("MapEngine: Error in _fitMapToPreview:", e);
        }
    }

    _setupEventListeners() {
        EventBusInstance.subscribe(events.PREVIEW_ADD, (resourceData) => {
            const { resourceId, name, description, geometry } = resourceData;
            
            if (!geometry) {
                return;
            }
            
            const geojsonData = geometry.geom;

            let extractedFeatures = [];

            if (geojsonData.type === "FeatureCollection") {
                if (geojsonData.features) {
                     extractedFeatures = geojsonData.features;
                }
            } else if (geojsonData.type === "Feature") {
                extractedFeatures = [geojsonData];
            } else {
                console.warn("MapEngine: Unrecognized or invalid geojsonData structure.", geojsonData);
            }

            const processedFeatures = extractedFeatures.map((feat, index) => {
                return {
                    ...feat,
                    id: `${resourceId}-${index}`, 
                    properties: {
                        ...feat.properties,
                        resourceId: resourceId, 
                        name: name,
                        description: description
                    }
                };
            });

            this.previewFeatures.set(resourceId, processedFeatures);
            this._updatePreviewSource();
            this._fitMapToPreview();
        });

        EventBusInstance.subscribe(events.PREVIEW_REMOVE, (resourceId) => {
            if (!resourceId) {
                console.warn("MapEngine: PREVIEW_REMOVE ignored because couldn't resolve resourceId.", resourceId);
                return;
            }

            if (this.previewFeatures.has(resourceId)) {
                this.previewFeatures.delete(resourceId);
                this._updatePreviewSource();
            } else {
                console.warn(`MapEngine: PREVIEW_REMOVE requested for ${resourceId} but it wasn't in state.`);
            }
        });
    }
}