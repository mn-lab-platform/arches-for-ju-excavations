import { CesiumWidget, Cesium3DTileset, Color, Matrix4, Cartesian3, Transforms, Rectangle, OrientedBoundingBox, UrlTemplateImageryProvider, Cartographic, Math as CesiumMath, ClassificationType } from 'cesium';

export class Scene {
    constructor(containerId, {georeferenced=false, allowAnnotationsEdits=false, allowObjectPicking=false, allowObjectAddition=false, existingAnnotations=[], basemaps=[]} = {}) {
        this.georeferenced = georeferenced;
        this.allowAnnotationsEdits = allowAnnotationsEdits;
        this.allowObjectPicking = allowObjectPicking;
        this.allowObjectAddition = allowObjectAddition;

        this.existingAnnotations = existingAnnotations;
        this.basemaps = [
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
        this.tileset = null;
        this.containerId = containerId;
        this.cameraDestination = null;
        
        this.widget = new CesiumWidget(containerId, {
            baseLayer: false,
            creditContainer: document.createElement('div'),
            scene3DOnly: true 
        });

        this.imageryLayers = new Map();
        this.basemaps.map((b, index) => {
            const basemapId = b.layer_info.id;
            const layer = this.widget.scene.imageryLayers.addImageryProvider(
                    new UrlTemplateImageryProvider({
                        url: b.source_info.tiles[0],
                    })
                )
            layer.show = index === 0;
            this.imageryLayers.set(basemapId, layer);
        });

        this._initializeScene();
    }

    _initializeScene() {
        this.widget.scene.skyBox = undefined;
        this.widget.scene.backgroundColor = Color.fromCssColorString('#3e3d3d');
        this.widget.scene.moon.show = false;
        this.widget.scene.sun.show = false;
        this.widget.scene.fog.enabled = false;
        this.widget.scene.globe.show = false;
        this.widget.scene.skyAtmosphere.show = false;

        if (this.existingAnnotations.length > 0) {
            this._displayExistingAnnotations();
        }
    }

    hasAnnotations() {
        return this.existingAnnotations.length > 0;
    }

    getBasemapsInfo() {
        return this.basemaps.map(b => ({ id: b.layer_info.id, name: b.layer_info.name, icon: b.layer_info.icon }));
    }

    showBasemap(basemapId) {
        this.imageryLayers.forEach((layer, id) => {
            layer.show = (id === basemapId);
        })
    }

    //TODO: Centralize annotation display logic - it should be moved to scene, with methods like addAnnotationEntity, removeAnnotationEntity
    _displayExistingAnnotations() {
        this.existingAnnotations.forEach(annotation => {
            const geometry = annotation.geometry;
            const positions = geometry.map(coord => Cartesian3.fromArray(coord)); 
            
            this.widget.entities.add({
                id: annotation.id,
                name: annotation.name || 'Unnamed Annotation',
                description: annotation.description || '',
                polygon: {
                    hierarchy: positions,
                    perPositionHeight: true,
                    material: Color.fromCssColorString(annotation.color).withAlpha(0.6),
                    classificationType: ClassificationType.CESIUM_3D_TILE
                }
            });
        });
    }

    async loadTileset(url) {
        this.tileset = await Cesium3DTileset.fromUrl(url, {
            maximumMemoryUsage: 1024
        });
        this.widget.scene.primitives.add(this.tileset);

        if (this.georeferenced) {
            this._zoomToTileset(this.tileset);
        } else {
            this._handleUngeoreferencedTileset(this.tileset);
            this._zoomToTileset(this.tileset);
        }

        return this.tileset;
    }

    applyModelMatrix(matrix) {
        if (!this.tileset) {
            console.error("Tileset not loaded yet. Cannot apply model matrix.");
            return;
        }

        const newMatrix = Matrix4.fromArray(matrix);
        this.tileset.modelMatrix = newMatrix;

        this._zoomToTileset(this.tileset);
    }

    _handleUngeoreferencedTileset(tileset) {
        const fakePosition = Cartesian3.fromDegrees(0.0, 0.0, 0.0);
        const fixedFrame = Transforms.eastNorthUpToFixedFrame(fakePosition);

        const center = tileset.boundingSphere.center;
        const radius = tileset.boundingSphere.radius;
        const centerOffset = new Cartesian3(-center.x, -center.y, -center.z + radius);

        const translationMatrix = Matrix4.fromTranslation(centerOffset);
        const finalMatrix = new Matrix4();

        Matrix4.multiply(fixedFrame, translationMatrix, finalMatrix);

        tileset.modelMatrix = finalMatrix;

        this.widget.scene.screenSpaceCameraController.minimumZoomDistance = 0.1;
        this.widget.scene.screenSpaceCameraController.enableCollisionDetection = true;
    }

    _zoomToTileset(tileset) {
        const rootTile = tileset.root;
        const rawBoundingVolume = rootTile.contentBoundingVolume.boundingVolume;
        const localCorners = OrientedBoundingBox.computeCorners(rawBoundingVolume);

        const transformedCorners = localCorners.map(corner => {
            return Matrix4.multiplyByPoint(tileset.modelMatrix, corner, new Cartesian3());
        });
        
        const boundingRectangle = Rectangle.fromCartesianArray(transformedCorners);

        const fitCartesian = this.widget.camera.getRectangleCameraCoordinates(boundingRectangle);
        const fitCarto = Cartographic.fromCartesian(fitCartesian);

        const radius = tileset.boundingSphere.radius;
        const zOffset = radius;
        const finalHeight = fitCarto.height + zOffset;

        const center = Rectangle.center(boundingRectangle);
        const cameraDestination = Cartesian3.fromRadians(center.longitude, center.latitude, finalHeight);
        this.cameraDestination = cameraDestination;

        this.widget.camera.setView({
            destination: cameraDestination,
            orientation: {
                heading: 0.0,
                roll: 0.0,
                pitch: CesiumMath.toRadians(-90.0)
            }
        });
    }
}