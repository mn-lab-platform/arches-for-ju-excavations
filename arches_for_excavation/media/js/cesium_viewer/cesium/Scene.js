import { Ion, CesiumWidget, Cesium3DTileset, Color, HeadingPitchRange, Matrix4, Cartesian3 } from 'cesium';
import { SCALE_FACTORS } from '../const/const';

export class Scene {
    constructor(containerId, {token, georeferenced=false, allowAnnotationsEdits=false, allowObjectPicking=false, existingAnnotations=[]} = {}) {
        Ion.defaultAccessToken = token;
        this.georeferenced = georeferenced;
        this.allowAnnotationsEdits = allowAnnotationsEdits;
        this.allowObjectPicking = allowObjectPicking;
        this.existingAnnotations = existingAnnotations;
        this.scale = SCALE_FACTORS.METERS;
        this.containerId = containerId;
        console.log("Scene received: ", this.allowAnnotationsEdits, this.allowObjectPicking);
        
        this.widget = new CesiumWidget(containerId, {
            globe: georeferenced ? undefined : false,
            creditContainer: document.createElement('div'),
        });

        this._initializeScene();
    }

    _initializeScene() {
        this.widget.scene.skyBox = undefined;
        this.widget.scene.backgroundColor = new Color(0.85, 0.85, 0.95, 0.5);
        this.widget.scene.moon.show = false;
        this.widget.scene.sun.show = false;
        this.widget.scene.fog.enabled = false;

        if (this.existingAnnotations.length > 0) {
            this._displayExistingAnnotations();
        }
    }
    //TODO: Centralize annotation display logic - it should be moved to scene, with methods like addAnnotationEntity, removeAnnotationEntity
    _displayExistingAnnotations() {
        console.log("Scene received existing annotations object: ", this.existingAnnotations);
        this.existingAnnotations.forEach(annotation => {
            const geometry = JSON.parse(annotation.resource.Geometry); 
            const positions = geometry.map(coord => Cartesian3.fromArray(coord)); 
            
            this.widget.entities.add({
                id: annotation.resourceinstanceid,
                name: annotation.displayname || 'Unnamed Annotation',
                description: annotation.displaydescription || '',
                polygon: {
                    hierarchy: positions,
                    perPositionHeight: true,
                    material: Color.fromCssColorString(annotation.resource.Color).withAlpha(0.6)
                }
            });
        });
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