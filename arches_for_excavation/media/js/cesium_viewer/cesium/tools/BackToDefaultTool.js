import { Tool } from "./Tool.js";
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

        this.widget.camera.flyTo({
            destination: this.cameraDestination,
            orientation: {
                heading: 0.0,
                roll: 0.0
            },
            complete: onDone,
            cancel: onDone
        });
    }

    deactivate() {
        this.active = false;
    }
};