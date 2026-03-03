export default class BasemapMenuControl {
    constructor(options) {
        const defaultBasemap = {
            source_info: {
                name: 'carto-voyager',
                tiles: ['https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'],
                tileSize: 256,
                bounds: null
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
        this._layers = [defaultBasemap, ...(options.layers || [])];
        this._activeLayerId = defaultBasemap.layer_info.id;

        this._container = document.createElement("div");
        this._container.classList.add("maplibregl-ctrl");
        this._container.classList.add("basemap-control");
        this._container.classList.add("collapsed");

        this._collapsedIcon = document.createElement("i");
        this._collapsedIcon.className = "fa fa-map";
        this._collapsedIcon.style.fontSize = "2rem";
        this._collapsedIcon.style.color = "#6b7280";
        this._container.appendChild(this._collapsedIcon);

        this._container.addEventListener("mouseenter", () => {
            this._container.classList.remove("collapsed");
            this._collapsedIcon.style.display = "none";
        });
        this._container.addEventListener("mouseleave", () => {
            this._container.classList.add("collapsed");
            this._collapsedIcon.style.display = "block";
        });
    }

    onAdd(map) {
        this._map = map;
        this._layers.forEach(layer => {
            const sourceInfo = layer.source_info;
            const layerInfo = layer.layer_info;

            const sourceConfig = {
                type: "raster",
                tiles: sourceInfo.tiles,
                tileSize: sourceInfo.tileSize,
                maxzoom: 24
            };
            
            if (sourceInfo.bounds) {
                sourceConfig.bounds = sourceInfo.bounds;
            }
            
            this._map.addSource(sourceInfo.name, sourceConfig);

            this._map.addLayer({
                id: layerInfo.id,
                type: "raster",
                source: layerInfo.source,
                maxzoom: 24,
                layout: {
                    visibility: layerInfo.id === this._activeLayerId ? "visible" : "none"
                }
            });

            const basemapContainer = document.createElement("div");
            basemapContainer.classList.add("basemap-option");
            if (layerInfo.id === this._activeLayerId) {
                basemapContainer.classList.add("active");
            }

            const iconElement = document.createElement("i");
            iconElement.className = layerInfo.icon;
            basemapContainer.appendChild(iconElement);

            const labelElement = document.createElement("span");
            labelElement.classList.add("basemap-label");
            labelElement.textContent = layerInfo.name;
            basemapContainer.appendChild(labelElement);

            basemapContainer.addEventListener("click", () => {
                this._switchBasemap(layerInfo.id, basemapContainer);
            });

            this._container.appendChild(basemapContainer);
        });
        
        return this._container;
    }

    _switchBasemap(newLayerId, newContainer) {
        this._layers.forEach(layer => {
            this._map.setLayoutProperty(layer.layer_info.id, 'visibility', 'none');
        });

        this._map.setLayoutProperty(newLayerId, 'visibility', 'visible');
        this._activeLayerId = newLayerId;

        this._container.querySelectorAll('.basemap-option').forEach(el => {
            el.classList.remove('active');
        });
        newContainer.classList.add('active');
    }

    onRemove() {
        this._container.parentNode?.removeChild(this._container);
    }
}