import 'cesium/Build/Cesium/Widgets/widgets.css';

import { CesiumWidget, Color, UrlTemplateImageryProvider, Rectangle, Cesium3DTileset, OrientedBoundingBox, Cartographic, Cartesian3, Matrix4, Math as CesiumMath } from "cesium";
import { getMapExtent, getWKT2DefinitionForModelId, getBasemapsAndOverlays } from '../api/archesService';
import { getTransformedModelMatrixForTileset } from '../api/modelMatrixService';
import { ControlManager } from './controls/ControlManager';

import { EventBusInstance } from '../core/EventBus';
import { events } from '../constants/events';
import store from "../core/store";
import { BasemapControl } from './controls/BasemapControl';

export class CesiumEngine {
    constructor(containerId) {
        this._containerId = containerId;

        this._controlManager = new ControlManager(containerId);

        this._widget = new CesiumWidget(containerId, {
            baseLayer: false,
            creditContainer: document.createElement('div'),
            scene3DOnly: true ,
        });

        this._defaultExtentRect = null;
        this._previewLayer = new Map();
        
        this._layers = new Map(); 

        this._basemaps = null;

        this._imageryLayers = new Map();
        
        this._initializeWidget();
        this._setCameraLookOffset();
        this._zoomToDefaultExtent();
        this._setupEventListeners();
        this._initializeBasemaps();
    }

    _zoomToDefaultExtent() {
        if (this._defaultExtentRect) {
            this._widget.scene.camera.flyTo({
                destination: this._defaultExtentRect,
                duration: 1.5
            });
        }
        else {
            getMapExtent().then(extent => {
                const rect = this._getBboxRectFromCoords(extent);
                this._defaultExtentRect = rect;
                this._widget.scene.camera.flyTo({
                    destination: rect,
                    duration: 0
                });
            });
        }
    }

    _getBboxRectFromCoords(coords) {
        const lons = coords.map(c => c[0]);
        const lats = coords.map(c => c[1]);
        const west = Math.min(...lons);
        const east = Math.max(...lons);
        const south = Math.min(...lats);
        const north = Math.max(...lats);

        const rect = Rectangle.fromDegrees(west, south, east, north);

        return rect;
    }

    _initializeWidget() {
        this._widget.scene.skyBox = undefined;
        this._widget.scene.backgroundColor = Color.fromCssColorString('#3e3d3d');
        this._widget.scene.moon.show = true;
        this._widget.scene.sun.show = true;
        this._widget.scene.fog.enabled = false;
        this._widget.scene.globe.show = true;
        this._widget.scene.skyAtmosphere.show = true;
    }

    async _initializeBasemaps() {
        const response = await getBasemapsAndOverlays();
        const basemaps = response.basemaps || [];

        this._basemaps = [
            ...basemaps,
            {
                layer_info: {
                    id: '0',
                    name: 'Default Basemap',
                    icon: 'fa fa-home'
                },
                source_info: {
                    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png']
                }
            }
        ];

        this._basemaps.forEach((basemap, index) => {
            const basemapId = basemap.layer_info.id;
            const layer = this._widget.scene.imageryLayers.addImageryProvider(
                new UrlTemplateImageryProvider({
                    url: basemap.source_info.tiles[0],
                })
            );
            layer.show = index === 0;
            this._imageryLayers.set(basemapId, layer);
        });

        const basemapsControl = new BasemapControl('fa fa-map', 'Choose Basemap', true, this._basemaps);
        this._controlManager.registerControls([basemapsControl]);
    }

    _setCameraLookOffset() {
        const PADDING = 150;
        const pixelOffset = (store.menuPanelWidth + store.searchFlyoutWidth - PADDING) / 2;
        const canvasWidth = this._widget.canvas.clientWidth;
        
        const frustum = this._widget.camera.frustum;

        const horizontalFov = 2 * Math.atan(Math.tan(frustum.fov / 2) * frustum.aspectRatio);

        const angleInRadians = (pixelOffset / canvasWidth) * horizontalFov;

        this._widget.camera.lookLeft(angleInRadians);
    }

    _setupEventListeners() {
        EventBusInstance.subscribe(events.PREVIEW_ADD, async (modelData) => {   
            const tileset = await this._addTilesetFromUrl(modelData.url, modelData.resourceId);
            if (tileset) {
                this._previewLayer.set(modelData.resourceId, tileset);
                this._zoomToTileset(tileset);
            }
        });

        EventBusInstance.subscribe(events.PREVIEW_REMOVE, (resourceId) => {
            this._removeTilesetById(resourceId);
            this._previewLayer.delete(resourceId);
        });

        EventBusInstance.subscribe(events.PREVIEW_REMOVE_ALL, () => {
            this._previewLayer.forEach((tileset, resourceId) => {
                this._removeTilesetById(resourceId);
            });
            this._previewLayer.clear();
        });

        EventBusInstance.subscribe(events.BASEMAP_SHOW, (basemapId) => {
            this._imageryLayers.forEach((layer, id) => {
                layer.show = id === basemapId;
            });
        });

        EventBusInstance.subscribe(events.LAYER_HIDE, (layerId) => {
            const tilesets = this._layers.get(layerId);
            if (tilesets) {
                tilesets.forEach(tileset => { tileset.show = false; });
            }
        });

        EventBusInstance.subscribe(events.LAYER_SHOW, (layerId) => {
            const tilesets = this._layers.get(layerId);
            if (tilesets) {
                tilesets.forEach(tileset => { tileset.show = true; });
            }
        });

        EventBusInstance.subscribe(events.LAYER_ADD, async (layerData) => {
            const { id, urls, ids } = layerData;
            const layerTilesets = []; 

            for (let i = 0; i < urls.length; i++) {
                const modelUrl = urls[i];
                const resourceId = ids[i];

                const tileset = await this._addTilesetFromUrl(modelUrl, resourceId);
                
                if (tileset) {
                    layerTilesets.push(tileset);

                    if (layerTilesets.length === 1) {
                        this._zoomToTileset(tileset);
                    }
                }
            }

            this._layers.set(id, layerTilesets);
        });
    }

    _zoomToTileset(tileset) {
        const rootTile = tileset.root;
        const rawBoundingVolume = rootTile.contentBoundingVolume.boundingVolume;
        const localCorners = OrientedBoundingBox.computeCorners(rawBoundingVolume);

        const transformedCorners = localCorners.map(corner => {
            return Matrix4.multiplyByPoint(tileset.modelMatrix, corner, new Cartesian3());
        });
        
        const boundingRectangle = Rectangle.fromCartesianArray(transformedCorners);

        const fitCartesian = this._widget.camera.getRectangleCameraCoordinates(boundingRectangle);
        const fitCarto = Cartographic.fromCartesian(fitCartesian);

        const radius = tileset.boundingSphere.radius;
        const zOffset = radius;
        const finalHeight = fitCarto.height + zOffset;

        const center = Rectangle.center(boundingRectangle);
        const cameraDestination = Cartesian3.fromRadians(center.longitude, center.latitude, finalHeight);
        this.cameraDestination = cameraDestination;
        
        this._widget.camera.setView({
            destination: cameraDestination,
            orientation: {
                heading: 0.0,
                roll: 0.0,
                pitch: CesiumMath.toRadians(-90.0)
            }
        });

        this._setCameraLookOffset();
    }

    async _addTilesetFromUrl(url, resourceId) {
        EventBusInstance.publish(events.APP_BUSY_ON);
        
        try {
            const tilesetUrl = `${url}/tileset.json`;
            const tileset = await Cesium3DTileset.fromUrl(tilesetUrl);
            
            const wkt2Definition = await getWKT2DefinitionForModelId(resourceId);
            if (wkt2Definition) { 
                const transformedMatrix = await getTransformedModelMatrixForTileset(tileset._url, wkt2Definition);
                if (transformedMatrix && transformedMatrix.new_matrix) {
                    tileset.modelMatrix = transformedMatrix.new_matrix;
                }
            }

            this._widget.scene.primitives.add(tileset);
            return tileset;
        } catch (error) {
            console.error(`Error loading tileset mapping to resource ${resourceId}:`, error);
            return null;
        } finally {
            EventBusInstance.publish(events.APP_BUSY_OFF);
        }
    }

    _removeTilesetById(resourceId) {
        const tileset = this._previewLayer.get(resourceId);
        if (tileset) {
            this._widget.scene.primitives.remove(tileset);
        }
    }
}