import { Ion, CesiumWidget, Cesium3DTileset, Color, HeadingPitchRange, Matrix4, Terrain } from 'cesium';
import { SCALE_FACTORS } from '../const/const';

export class Scene {
    constructor(containerId, {token, georeferenced=false, readOnly=false} = {}) {
        Ion.defaultAccessToken = token;
        this.georeferenced = georeferenced;
        this.readOnly = readOnly;
        this.scale = SCALE_FACTORS.METERS;

        this.widget = new CesiumWidget(containerId, {
            globe: georeferenced ? undefined : false,
            terrain: georeferenced ? Terrain.fromWorldTerrain() : undefined
        });
        this._configureScene();
    }

    _configureScene() {
        this.widget.scene.skyBox = undefined;
        this.widget.scene.backgroundColor = new Color(0.85, 0.85, 0.95, 0.5);
        this.widget.scene.moon.show = false;
        this.widget.scene.sun.show = false;
        this.widget.scene.fog.enabled = false;
    }

    async loadTileset(url) {
        const tileset = await Cesium3DTileset.fromUrl(url, {
            maximumMemoryUsage: 1024
        });
        this.widget.scene.primitives.add(tileset);

        const boundingSphereRadius = tileset.boundingSphere.radius;

        // if object's bounding sphere radius is smaller than 1 meter scale up for viewer to work correctly and to recognise unit between meters and centimeters
        this.scale = boundingSphereRadius > 1 ? SCALE_FACTORS.METERS : SCALE_FACTORS.CENTIMETERS; 
        this._scaleTileset(tileset);

        if (this.georeferenced) {
            this._handleGeoreferencedTileset(tileset);
        } else {
            this._handleUngeoreferencedTileset(tileset);
        }

    }

    _handleUngeoreferencedTileset(tileset) {
        this.widget.scene.screenSpaceCameraController.minimumZoomDistance = tileset.boundingSphere.radius * 0.3;
        this.widget.camera.viewBoundingSphere(tileset.boundingSphere, new HeadingPitchRange(0.5, -0.5, tileset.boundingSphere.radius * 3));
    }

    _handleGeoreferencedTileset(tileset) {
        this.widget.camera.flyToBoundingSphere(tileset.boundingSphere, {
            duration: 1.5,
            offset: new HeadingPitchRange(0.5, -0.5, tileset.boundingSphere.radius * 3)
        });
    }

    _scaleTileset(tileset) {
        if (this.scale === SCALE_FACTORS.METERS) return; // No scaling needed
        const scaleMatrix = Matrix4.fromUniformScale(this.scale);
        tileset.modelMatrix = scaleMatrix;
    }
}