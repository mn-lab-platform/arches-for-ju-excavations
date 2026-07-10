import { Tool } from './Tool.js';
import { PointPrimitiveCollection, PolylineCollection, ScreenSpaceEventHandler, ScreenSpaceEventType, Cartesian3, Color, Material, ClassificationType } from 'cesium';
import { TOOL_CALLBACKS } from '../../const/const.js';
import utils from '../../utils/utils.js';

export class AnnotationsTool extends Tool {
    constructor(scene, name, callbacks) {
        super(scene, name, callbacks);
        this.pointCollection = this.widget.scene.primitives.add(new PointPrimitiveCollection());
        this.polylineCollection = this.widget.scene.primitives.add(new PolylineCollection());
        this.handler = null;
        this.pendingAnnotation = null;

        this.prePolygonCloseColor = Color.fromCssColorString('#646cff');
        this.postPolygonCloseColor = Color.fromCssColorString('#64ff64');
    }

    activate() {
        this.active = true;
        if (!this.points) this.points = [];
        this.handler = new ScreenSpaceEventHandler(this.widget.canvas);

        this.handler.setInputAction((click) => {
            const pickedObject = this.widget.scene.pick(click.position);
            
            if (pickedObject) {
                const cartesian = this.widget.scene.pickPosition(click.position);
                if (cartesian) {
                    if (this.points.length >= 1) {
                        const distance = Cartesian3.distance(cartesian, this.points[0]);
                        if (this.points.length >= 3 && distance <  0.1) { 
                            this.pendingAnnotation = utils.createAnnotationData({
                                id: utils.generateUniqueId(),
                                geometry: this.points.map(point => [point.x, point.y, point.z]),
                                color: this.postPolygonCloseColor.toCssHexString(),
                                name: '',
                                description: '',
                                isResource: false,
                                relatedResourceName: ''
                            })
                            this._triggerCallback(TOOL_CALLBACKS.ON_POLYGON_COMPLETED, this.pendingAnnotation);
                            this._drawPolygonToCanvas();
                            return;
                        }
                    }

                    this.points.push(cartesian);
                    this.pointCollection.add({
                        position: cartesian,
                        color: this.prePolygonCloseColor,
                        pixelSize: 10,
                        outlineColor: Color.WHITE,
                        outlineWidth: 2
                    });

                    if (this.points.length === 2) {
                        this.polylinePrimitive = this.polylineCollection.add({
                            positions: this.points.slice(),
                            width: 4,
                            material: Material.fromType('PolylineOutline', {
                                color: this.prePolygonCloseColor,
                                outlineColor: Color.WHITE.withAlpha(0.3),
                                outlineWidth: 1
                            })
                        });
                    } else if (this.points.length > 2 && this.polylinePrimitive) {
                        this.polylinePrimitive.positions = this.points.slice();
                    }
                }
            }

        }, ScreenSpaceEventType.LEFT_CLICK);

        this.handler.setInputAction(() => {
            this._clearCollections();
            this.points.length = 0;
        }, ScreenSpaceEventType.RIGHT_CLICK);
    }

    _drawPolygonToCanvas() {
        console.log("Drawing polygon with geometry: ", this.pendingAnnotation.geometry);
        if (this.pendingAnnotation) {
            const color =Color.fromCssColorString(this.pendingAnnotation.color);
            const annotation = this.widget.entities.add({
                id: this.pendingAnnotation.id,
                name: this.pendingAnnotation.name,
                description: this.pendingAnnotation.description,
                polygon: {
                    hierarchy: this.pendingAnnotation.geometry.map(coord => Cartesian3.fromArray(coord)),
                    perPositionHeight: true,
                    material: color.withAlpha(0.6),
                    classificationType: ClassificationType.CESIUM_3D_TILE
                }
            });
        }
        this._clearCollections();
        this.points.length = 0;
        this.pendingAnnotation = null;
    }

    cancelAnnotation() {
        this.pendingAnnotation = null;
    }

    deactivate() {
        this.active = false;
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
        this._clearCollections();
        this.pendingAnnotation = null;
    }

    _clearCollections() {
        this.pointCollection.removeAll();
        this.polylineCollection.removeAll();
    }
}