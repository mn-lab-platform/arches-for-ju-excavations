import { Tool } from "./Tool";
import { TOOL_CALLBACKS } from "../../const/const.js";

export class BackToDefaultTool extends Tool {
    constructor(scene, name, callbacks) {
        super(scene, name, callbacks);
    }

    activate() {
        this.active = true;
        const onDone = () => {
            this._triggerCallback(TOOL_CALLBACKS.ON_TOOL_SELF_DEACTIVATE);
        };
        this.widget.camera.flyToBoundingSphere(this.objectBoundingSphere, {
            complete: onDone,
            cancel: onDone
        });
    }

    deactivate() {
        this.active = false;
    }
};