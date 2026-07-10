import { ScreenSpaceEventType, ScreenSpaceEventHandler, Entity, Color } from 'cesium';
import { Tool } from './Tool.js';
import { TOOL_CALLBACKS } from '../../const/const.js';
import utils from '../../utils/utils.js';

export class PickerTool extends Tool {
    constructor(scene, name, callbacks) {
        super(scene, name, callbacks);
        this.handler = null;
        this.pickedAnnotation = null;
    }

    activate() {
        this.active = true;
        this.handler = new ScreenSpaceEventHandler(this.widget.canvas);

        this.handler.setInputAction((click) => {
            const pickedObject = this.widget.scene.pick(click.position);
            if (pickedObject) {
                if (pickedObject && pickedObject.id instanceof Entity) {
                    this.pickedAnnotation = pickedObject.id;
                    this._triggerCallback(TOOL_CALLBACKS.ON_ANNOTATION_PICKED, utils.extractAnnotationData(this.pickedAnnotation));
                }
            }

        }, ScreenSpaceEventType.LEFT_CLICK);
    }

    saveAnnotation(annotationData) {
        if (this.pickedAnnotation) {
            this.pickedAnnotation.name = annotationData.name;
            this.pickedAnnotation.description = annotationData.description;
            this.pickedAnnotation.polygon.material = Color.fromCssColorString(annotationData.color).withAlpha(0.6);

            this._triggerCallback(TOOL_CALLBACKS.ON_ANNOTATION_SAVED, utils.extractAnnotationData(this.pickedAnnotation));
            this.pickedAnnotation = null;
        }
    }

    cancelAnnotation() {
        this.pickedAnnotation = null;
    }

    deleteAnnotation() {
        if (this.pickedAnnotation) {
            this._triggerCallback(TOOL_CALLBACKS.ON_ANNOTATION_DELETED, this.pickedAnnotation.id);
            this.widget.entities.remove(this.pickedAnnotation);
            this.pickedAnnotation = null;
        }
    }

    updateAnnotation(annotationData) {
        if (this.pickedAnnotation) {
            this.pickedAnnotation.name = annotationData.name;
            this.pickedAnnotation.description = annotationData.description;
            this.pickedAnnotation.polygon.material = Color.fromCssColorString(annotationData.color).withAlpha(0.6);

            this._triggerCallback(TOOL_CALLBACKS.ON_ANNOTATION_UPDATED, utils.extractAnnotationData(this.pickedAnnotation));
            this.pickedAnnotation = null;
        }
    }

    deactivate() {
        this.active = false;
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
        this.pickedAnnotation = null;
    }
}