import { createMapControl } from "../../components/mapControl";
import { EventBusInstance } from "../../core/EventBus";
import { events } from "../../constants/events";
import store from "../../core/store";

//TODO: generic control to handle eventbus
export class OverlayControl {
    constructor(options) {
        this._map = null;

        this._layers = options?.layers || [];
        
        const { button, panel } = createMapControl({
            iconClass: 'fa fa-list',
            title: 'Overlay Selector',
            controlInstance: this
        });
        this._controlButton = button;
        this._controlPanel = panel;
    }

    onAdd(map) {
        this._map = map;
        
        const previewLayerId = this._layers[0].layer_info.id;
        if (!store.overlayLayerIds.includes(previewLayerId)) {
            store.overlayLayerIds = [...store.overlayLayerIds, previewLayerId];
        }

        this._layers.forEach(layer => {
            console.log("Adding layer to map: ", layer);
            EventBusInstance.publish(events.OVERLAY_ADD, layer);
        });

        this._map.once('idle', () => {
            ['','-fill','-line','-circle'].forEach(sfx => {
                const lid = `${previewLayerId}${sfx}`;
                if (this._map.getLayer(lid)) {
                    this._map.moveLayer(lid);
                }
            });
        });

        this._layers.forEach((layer) => {
            const layerInfo = layer.layer_info;

            const overlayContainer = document.createElement("div");
            overlayContainer.classList.add("maplayer-option");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("overlay-checkbox");
            checkbox.checked = store.overlayLayerIds.includes(layerInfo.id);

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    store.overlayLayerIds = [...store.overlayLayerIds, layerInfo.id];
                    EventBusInstance.publish(events.LAYER_SHOW, layerInfo.id);
                } else {
                    store.overlayLayerIds = store.overlayLayerIds.filter(id => id !== layerInfo.id);
                    EventBusInstance.publish(events.LAYER_HIDE, layerInfo.id);
                }
            });
            overlayContainer.appendChild(checkbox);

            const iconElement = document.createElement("i");
            iconElement.className = layerInfo.icon;
            overlayContainer.appendChild(iconElement);

            const labelElement = document.createElement("span");
            labelElement.classList.add("maplayer-label");
            labelElement.textContent = layerInfo.name;
            overlayContainer.appendChild(labelElement);

            this._controlPanel.appendChild(overlayContainer);
        });

        // for initial visibility of preview
        //TODO
        store.overlayLayerIds.forEach(layerId => {
            EventBusInstance.publish(events.LAYER_SHOW, layerId);
        });

        return this._controlButton;
    }

    onRemove() {
        this._controlButton.parentNode?.removeChild(this._controlButton);
        this._controlPanel.parentNode?.removeChild(this._controlPanel);
    }
}