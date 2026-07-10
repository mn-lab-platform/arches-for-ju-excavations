import { Tool } from "./Tool";
import { TOOL_CALLBACKS } from "../../const/const";

export class GlobeTool extends Tool {
    constructor(scene, name, callbacks, basemaps = []) {
        super(scene, name, callbacks);
        this.basemaps = basemaps;
        console.log("GlobeTool initialized with basemaps: ", basemaps);
        this.currentIndex = 0;
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

    previousBasemap() {
        if (this.basemaps.length === 0) return;
        this.currentIndex =
            (this.currentIndex - 1 + this.basemaps.length) % this.basemaps.length;
        this._showCurrentBasemap();
    }

    nextBasemap() {
        if (this.basemaps.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.basemaps.length;
        this._showCurrentBasemap();
    }

    _showCurrentBasemap() {
        const basemap = this.basemaps[this.currentIndex];
        if (!basemap) return;
        this._triggerCallback(TOOL_CALLBACKS.ON_BASEMAP_SELECTED, basemap.id);
    }
}