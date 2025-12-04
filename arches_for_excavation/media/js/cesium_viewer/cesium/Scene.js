import { Ion, CesiumWidget, Cesium3DTileset, Color, HeadingPitchRange, Matrix4 } from 'cesium';
import { SCALE_FACTORS } from '../const/const';

export class Scene {
    constructor(containerId, {token, georeferenced=false, allowAnnotationsEdits=false, allowObjectPicking=false} = {}) {
        Ion.defaultAccessToken = token;
        this.georeferenced = georeferenced;
        this.allowAnnotationsEdits = allowAnnotationsEdits;
        this.allowObjectPicking = allowObjectPicking;
        this.scale = SCALE_FACTORS.METERS;
        this.containerId = containerId;
        console.log("Scene received: ", this.allowAnnotationsEdits, this.allowObjectPicking);
        
        this.widget = new CesiumWidget(containerId, {
            globe: georeferenced ? undefined : false,
            creditContainer: document.createElement('div'),
        });

        const containerElement = document.getElementById(containerId);
        const creditAnchor = document.createElement('a');
        creditAnchor.href = 'https://cesium.com/';
        creditAnchor.target = '_blank';
        creditAnchor.rel = 'noopener noreferrer';
        creditAnchor.textContent = 'Powered by Cesium';
        creditAnchor.style.position = 'absolute';
        creditAnchor.style.right = '10px';
        creditAnchor.style.bottom = '6px';
        creditAnchor.style.background = 'rgba(255,255,255,0.85)';
        creditAnchor.style.padding = '4px 8px';
        creditAnchor.style.fontSize = '12px';
        creditAnchor.style.borderRadius = '4px';
        creditAnchor.style.textDecoration = 'none';
        creditAnchor.style.color = '#000';
        creditAnchor.style.zIndex = '1000';
        creditAnchor.style.pointerEvents = 'auto';

        containerElement.appendChild(creditAnchor);

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
        console.log("Bounding: ", boundingSphereRadius);
        
        // if object's bounding sphere radius is smaller than 1 meter scale up for viewer to work correctly and to recognise unit between meters and centimeters
        this.scale = boundingSphereRadius > 1 ? SCALE_FACTORS.METERS : SCALE_FACTORS.CENTIMETERS; 
        console.log("Scale set to: ", this.scale);
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
        this.widget.camera.flyToBoundingSphere(tileset.boundingSphere, { duration: 1.5 });
    }

    _scaleTileset(tileset) {
        if (this.scale === SCALE_FACTORS.METERS) return; // No scaling needed
        const scaleMatrix = Matrix4.fromUniformScale(this.scale);
        tileset.modelMatrix = scaleMatrix;
    }
}