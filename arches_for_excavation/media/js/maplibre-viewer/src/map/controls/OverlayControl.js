import { createMapControl } from "../../components/mapControl";
import { loadSourcesAndLayersIntoMap, applyActiveLayerVisibility } from "./utils/controlUtils";

//TODO: generic control to handle eventbus
export class OverlayControl {
    constructor(options) {
        const osmBasemap = {
            source_info: {
                name: 'osm-standard',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                bounds: null,
                type: 'raster'
            },
            layer_info: {
                name: 'OSM Standard',
                id: 'osm-standard-layer',
                source: 'osm-standard',
                icon: 'fa fa-globe'
            }
        };

        this._map = null;
        this._layers = options?.layers || [];
        this._activeLayerIds = [];

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
        if (!this._activeLayerIds.includes(previewLayerId)) {
            this._activeLayerIds.push(previewLayerId);
        }

        loadSourcesAndLayersIntoMap(this._map, this._layers, this._activeLayerIds);

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
            checkbox.checked = this._activeLayerIds.includes(layerInfo.id);

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    this._activeLayerIds.push(layerInfo.id);
                } else {
                    this._activeLayerIds = this._activeLayerIds.filter(id => id !== layerInfo.id);
                }
                applyActiveLayerVisibility(this._map, this._layers, this._activeLayerIds);
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

        applyActiveLayerVisibility(this._map, this._layers, this._activeLayerIds);// for initial visibility of preview

        return this._controlButton;
    }

    onRemove() {
        this._controlButton.parentNode?.removeChild(this._controlButton);
        this._controlPanel.parentNode?.removeChild(this._controlPanel);
    }
}