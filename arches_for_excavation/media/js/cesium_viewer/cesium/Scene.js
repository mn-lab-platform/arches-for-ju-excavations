import { CesiumWidget, Cesium3DTileset, Color, HeadingPitchRange, Matrix4, Cartesian3, Transforms } from 'cesium';
import { SCALE_FACTORS } from '../const/const';

export class Scene {
    constructor(containerId, {georeferenced=false, allowAnnotationsEdits=false, allowObjectPicking=false, existingAnnotations=[]} = {}) {
        this.georeferenced = georeferenced;
        this.allowAnnotationsEdits = allowAnnotationsEdits;
        this.allowObjectPicking = allowObjectPicking;
        this.existingAnnotations = existingAnnotations;
        this.scale = SCALE_FACTORS.METERS;
        this.containerId = containerId;
        
        this.widget = new CesiumWidget(containerId, {
            creditContainer: document.createElement('div'),
            scene3DOnly: true 
        });

        this._initializeScene();
    }

    _initializeScene() {
        this.widget.scene.skyBox = undefined;
        this.widget.scene.backgroundColor = Color.fromCssColorString('#303030');
        this.widget.scene.moon.show = false;
        this.widget.scene.sun.show = false;
        this.widget.scene.fog.enabled = false;

        if (!this.georeferenced) {
            this.widget.scene.globe.show = false;
            this.widget.scene.skyAtmosphere.show = false;
        }

        if (this.existingAnnotations.length > 0) {
            this._displayExistingAnnotations();
        }
    }
    //TODO: Centralize annotation display logic - it should be moved to scene, with methods like addAnnotationEntity, removeAnnotationEntity
    _displayExistingAnnotations() {
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

        const radius = tileset.boundingSphere.radius;
        console.log("Original Radius:", radius);
        
        // if object's bounding sphere radius is smaller than 1 meter scale up for viewer to work correctly and to recognise unit between meters and centimeters
        this.scale = radius > 1 ? SCALE_FACTORS.METERS : SCALE_FACTORS.CENTIMETERS; 
        console.log("Scale set to: ", this.scale);

        if (this.georeferenced) {
            this._handleGeoreferencedTileset(tileset);
        } else {
            this._handleUngeoreferencedTileset(tileset);
        }

    }

    _handleUngeoreferencedTileset(tileset) {
        const fakePosition = Cartesian3.fromDegrees(0.0, 0.0, 0.0);

        const fixedFrame = Transforms.eastNorthUpToFixedFrame(fakePosition);

        const center = tileset.boundingSphere.center;
        const centerOffset = Cartesian3.negate(center, new Cartesian3());
        const translationMatrix = Matrix4.fromTranslation(centerOffset);

        const scaleMatrix = Matrix4.fromUniformScale(this.scale);

        const finalMatrix = new Matrix4();
        Matrix4.multiply(scaleMatrix, translationMatrix, finalMatrix); 
        Matrix4.multiply(fixedFrame, finalMatrix, finalMatrix);        

        tileset.modelMatrix = finalMatrix;

        tileset.update(this.widget.scene.frameState);

        const newRadius = tileset.boundingSphere.radius;
        this.widget.scene.screenSpaceCameraController.minimumZoomDistance = newRadius * 0.1;
        
        this.widget.scene.screenSpaceCameraController.enableCollisionDetection = false;

        this.widget.camera.flyToBoundingSphere(tileset.boundingSphere, {
            duration: 1.0,
            offset: new HeadingPitchRange(0.0, -Math.PI / 2.5, newRadius * 1.5) // approx 72 degrees tilt
        });
    }

    _handleGeoreferencedTileset(tileset) {
        if (this.scale !== SCALE_FACTORS.METERS) {
            const scaleMatrix = Matrix4.fromUniformScale(this.scale);
            tileset.modelMatrix = scaleMatrix;
        }

        this.widget.camera.flyToBoundingSphere(tileset.boundingSphere, {
            duration: 1.5,
            offset: new HeadingPitchRange(0.0, -Math.PI / 2, tileset.boundingSphere.radius * 2) // straight down
        });
    }
}