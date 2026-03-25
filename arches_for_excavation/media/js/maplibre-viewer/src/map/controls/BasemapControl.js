import { createMapControl } from "../../components/mapControl";
import { loadSourcesAndLayersIntoMap, applyActiveLayerVisibility } from "./utils/controlUtils";

export default class BasemapControl {
    constructor(options) {
        const defaultBasemap = {
            source_info: {
                name: 'carto-voyager',
                tiles: ['https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'],
                tileSize: 256,
                bounds: null,
                type: 'raster'
            },
            layer_info: {
                name: 'Carto Voyager',
                id: 'carto-voyager-layer',
                source: 'carto-voyager',
                sortorder: -1,
                icon: 'fa fa-map'
            }
        };

        this._map = null;
        this._layers = [defaultBasemap, ...(options?.layers || [])];
        this._activeLayerIds = [defaultBasemap.layer_info.id];

        const { button, panel } = createMapControl({
            iconClass: 'fa fa-map',
            title: 'Basemap Selector'
        });
        this._controlButton = button;
        this._controlPanel = panel;
    }

    onAdd(map) {
        this._map = map;
        loadSourcesAndLayersIntoMap(this._map, this._layers, this._activeLayerIds);
        this._layers.forEach(layer => {
            const layerInfo = layer.layer_info;

            const basemapContainer = document.createElement("div");
            basemapContainer.classList.add("maplayer-option");

            if (this._activeLayerIds.includes(layerInfo.id)) {
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
        });
        
        return this._controlButton;
    }

    _switchBasemap(newLayerId, newContainer) {
        this._activeLayerIds = [newLayerId];
        applyActiveLayerVisibility(this._map, this._layers, this._activeLayerIds);

        this._controlButton.querySelectorAll('.maplayer-option').forEach(el => {
            el.classList.remove('active');
        });
        newContainer.classList.add('active');
    }

    onRemove() {
        this._controlButton.parentNode?.removeChild(this._controlButton);
        this._controlPanel.parentNode?.removeChild(this._controlPanel);
    }
}
