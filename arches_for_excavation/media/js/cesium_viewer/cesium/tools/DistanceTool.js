import { Tool } from './Tool';
import { PointPrimitiveCollection, PolylineCollection, ScreenSpaceEventHandler, ScreenSpaceEventType, defined, Cartesian3, Color, Material } from 'cesium';
import { TOOL_CALLBACKS } from '../../const/const';

export class DistanceTool extends Tool {
  constructor(scene, name, callbacks) {
    super(scene, name, callbacks);
    this.pointCollection = this.widget.scene.primitives.add(new PointPrimitiveCollection());
    this.polylineCollection = this.widget.scene.primitives.add(new PolylineCollection());
    this.points = [];
    this.handler = null;
    
    this.accentColor = Color.fromCssColorString('#646cff');
  }

  activate() {
    this.active = true;
    this.handler = new ScreenSpaceEventHandler(this.widget.canvas);

    this.handler.setInputAction((click) => {
      if (this.pointCollection.length === 2) {
        this._clearCollections();
        this._triggerCallback(TOOL_CALLBACKS.ON_DISTANCE_UPDATE, null);
      }

      const pickedObject = this.widget.scene.pick(click.position);
      
      if (defined(pickedObject)) {
        const cartesian = this.widget.scene.pickPosition(click.position);
        
        if (defined(cartesian)) {
          this.points.push(cartesian);
          this.pointCollection.add({
            position: cartesian,
            color: this.accentColor,
            pixelSize: 10,
            outlineColor: Color.WHITE,
            outlineWidth: 2
          });
          
          if (this.points.length === 2) {
            const distance = Cartesian3.distance(this.points[0], this.points[1]);
            const distanceString = `${distance.toFixed(3)} meters`;
            this._triggerCallback(TOOL_CALLBACKS.ON_DISTANCE_UPDATE, distanceString);
            this.polylineCollection.add({
              positions: [this.points[0], this.points[1]],
              width: 4,
              material: Material.fromType('PolylineOutline', {
                color: this.accentColor,
                outlineColor: Color.WHITE.withAlpha(0.3),
                outlineWidth: 1
              })
            });
            this.points.length = 0;
          }
        }
      }
    }, ScreenSpaceEventType.LEFT_CLICK);
  }

  deactivate() {
    this.active = false;
    if (this.handler) {
      this.handler.destroy();
      this.handler = null;
    }
    this.points.length = 0;
    this._clearCollections();
    this._triggerCallback(TOOL_CALLBACKS.ON_DISTANCE_UPDATE, null);
  }

  _clearCollections() {
    this.pointCollection.removeAll();
    this.polylineCollection.removeAll();
  }
}
