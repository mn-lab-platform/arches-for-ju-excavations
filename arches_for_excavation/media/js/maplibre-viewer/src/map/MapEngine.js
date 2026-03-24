import {Map} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { centroid, polygon } from '@turf/turf';

import {getMapExtent, getBasemapsAndOverlays} from '../api/archesService';

import BasemapControl from './controls/BasemapControl';
import { OverlayControl } from './controls/OverlayControl';

export class MapEngine {
    constructor(containerId) {
        this.map = new Map({
            container: containerId,
            style: {
                version: 8,
                sources: {},
                layers: [] 
            },
            zoom: 17,
        });
        this._centerMap();
        this.map.on('load', () => {
            this._register_controls();
        });
    }

    _centerMap() {
        getMapExtent()
            .then(extent => {
                const extentPolygon = polygon([extent]);
                const center = centroid(extentPolygon);
                this.map.setCenter(center.geometry.coordinates ?? [0, 0]);
                this.map.fitBounds(extent, {padding: 20});
            })
            .catch(error => {
                console.error('Error fetching map extent:', error);
            });
    }

    _register_controls() {
        getBasemapsAndOverlays()
            .then(info => {
                const basemapInfo = info.basemaps;
                const overlayInfo = info.overlays;

                const basemapControl = new BasemapControl({
                    layers: basemapInfo
                });
                this.map.addControl(basemapControl, 'top-right');

                const overlayControl = new OverlayControl({
                    layers: overlayInfo
                });
                this.map.addControl(overlayControl, 'top-right');
            })
            .catch(error => {
                console.error('Error registering controls:', error);
                this.map.addControl(new BasemapControl({ layers: [] }), 'top-right');
                this.map.addControl(new OverlayControl({ layers: [] }), 'top-right');
            });
    }
}