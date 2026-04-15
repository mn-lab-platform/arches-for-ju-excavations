import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";
import store from "../core/store";

export class GlobalBusyOverlay {
    constructor(parentContainerId) {
        this.parentContainer = document.getElementById(parentContainerId);
        this.offset = store.menuPanelWidth + store.searchFlyoutWidth || 0;

        this._createLoader();

        EventBusInstance.subscribe(events.APP_BUSY_ON, () => {
            console.log("GlobalBusyOverlay: Received APP_BUSY_ON event, showing loader.");
            this._showLoader();
        });

        EventBusInstance.subscribe(events.APP_BUSY_OFF, () => {
            console.log("GlobalBusyOverlay: Received APP_BUSY_OFF event, hiding loader.");
            this._hideLoader();
        });
    }


    _createLoader() {
        this.loader = document.createElement("div");
        this.loader.className = "global-busy-overlay hidden";
        this.loader.style.left = `calc( 50% + ${this.offset / 2 }px - 50px)`;

        this.parentContainer.appendChild(this.loader);
    }

    _showLoader() {
        this.loader.classList.remove("hidden");
    }

    _hideLoader() {
        this.loader.classList.add("hidden");
    }
}