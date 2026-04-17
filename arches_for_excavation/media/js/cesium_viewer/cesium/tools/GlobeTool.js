import { Tool } from "./Tool";

export class GlobeTool extends Tool {
    constructor(scene, name, callbacks) {
        super(scene, name, callbacks);
    }

    activate() {
        this.active = true;
        this._enableGlobeView();
    }

    deactivate() {
        this.active = false;
        this._disableGlobeView();
    }

    _enableGlobeView() {
        this.widget.scene.globe.show = true;
        this.widget.scene.skyAtmosphere.show = true;
    }

    _disableGlobeView() {
        this.widget.scene.globe.show = false;
        this.widget.scene.skyAtmosphere.show = false;
    }
}