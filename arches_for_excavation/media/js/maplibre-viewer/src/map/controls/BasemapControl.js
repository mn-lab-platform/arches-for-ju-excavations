import { MapControl } from "../../components/MapControl";
import { EventBusInstance } from "../../core/EventBus";
import { events } from "../../constants/events";
import store from "../../core/store";

export class BasemapControl {
    constructor(options) {
        const defaultBasemap = {
            source_info: {
                name: 'osm-standard',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                bounds: null,
                type: 'raster'
            },
            layer_info: {
                name: 'Default Basemap',
                id: 'osm-standard-layer',
                source: 'osm-standard',
                sortorder: -1,
                icon: 'fa fa-home'
            }
        };

        const noBasemap = {
            source_info: {
                name: 'none',
                tiles: [],
                type: 'none'
            },
            layer_info: {
                name: 'No Basemap',
                id: 'none-basemap-layer',
                source: 'none',
                sortorder: -2,
                icon: 'fa fa-ban'
            }
        };

        this._map = null;
        const areLayersProvided = options?.layers && options.layers.length > 0;
        this._layers = [noBasemap, ...(areLayersProvided ? [...options?.layers, defaultBasemap] : [defaultBasemap])];
        store.basemapLayerId = areLayersProvided ? [options.layers[0].layer_info.id] : [defaultBasemap.layer_info.id];

        const { container, button, panel } = new MapControl({
            iconClass: 'fa fa-map',
            title: 'Select Basemap',
            hasPanel: true,
            controlInstance: this
        }).build();
        
        this._controlContainer = container;
        this._controlButton = button;
        this._controlPanel = panel;
    }

    onAdd(map) {
        this._map = map;
        
        this._layers.forEach(layer => {
            const layerInfo = layer.layer_info;

            const basemapContainer = document.createElement("div");
            basemapContainer.classList.add("control-tile");

            if (store.basemapLayerId.includes(layerInfo.id)) {
                basemapContainer.classList.add("active");
            }

            const iconElement = document.createElement("i");
            iconElement.className = layerInfo.icon;
            basemapContainer.appendChild(iconElement);

            const labelElement = document.createElement("span");
            labelElement.classList.add("maplayer-label");
            labelElement.textContent = layerInfo.name;
            basemapContainer.appendChild(labelElement);

            basemapContainer.addEventListener("click", () => {
                this._switchBasemap(layerInfo.id, basemapContainer);
            });

            this._controlPanel.appendChild(basemapContainer);

            EventBusInstance.publish(events.BASEMAP_ADD, layer);
        });
        
        return this._controlContainer;
    }

    _switchBasemap(newLayerId, newContainer) {
        const oldLayerId = store.basemapLayerId[0];
        store.basemapLayerId = [newLayerId];

        if (newLayerId === 'none-basemap-layer') {
            EventBusInstance.publish(events.LAYER_HIDE, oldLayerId);
        } else {
            EventBusInstance.publish(events.LAYER_HIDE, oldLayerId);
            EventBusInstance.publish(events.LAYER_SHOW, newLayerId);
        }
        
        this._controlPanel.querySelectorAll('.control-tile').forEach(el => {
            el.classList.remove('active');
        });
        newContainer.classList.add('active');
    }

    onRemove() {
        this._controlContainer.parentNode?.removeChild(this._controlContainer);
    }
}