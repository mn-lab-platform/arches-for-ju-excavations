
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

        this._layers = [defaultBasemap, ...(options.layers || [])];

        this._container = document.createElement("div");
        this._container.classList.add("maplibregl-ctrl");
        this._container.classList.add("maplibregl-ctrl-basemaps");
        this._container.classList.add("closed");

        this._container.addEventListener("mouseenter", () => {
            this._container.classList.remove("closed");
        });
        this._container.addEventListener("mouseleave", () => {
            this._container.classList.add("closed");
        });
    }

    onAdd(map) {
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
            
            map.addSource(sourceInfo.name, sourceConfig);

            map.addLayer({
                id: layerInfo.id,
                type: "raster",
                source: layerInfo.source,
                maxzoom: 24
            });
        });
        
        return this._container;
    }

    onRemove() {
        this._container.parentNode?.removeChild(this._container);
    }

}