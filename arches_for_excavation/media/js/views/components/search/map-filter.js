import ko from "knockout";
import geojsonExtent from "geojson-extent";
import arches from "arches";

const originalRegister = ko.components.register.bind(ko.components);

const reorderMapLayers = function(map) {
    const style = map.getStyle();
    if (!style || !style.layers) return;

    const resourceLayers = style.layers.filter(layer => 
        layer.source === 'resource' || 
        layer.source?.startsWith('resources-') || 
        layer.source?.startsWith('search-results-')
    );
    
    const rasterLayers = style.layers.filter(layer => layer.type === 'raster');

    if (resourceLayers.length === 0 || rasterLayers.length === 0) return;

    const firstResourceLayerId = resourceLayers[0].id;
    const firstResourceIndex = style.layers.findIndex(layer => layer.id === firstResourceLayerId);

    rasterLayers.forEach(layer => {
        const currentRasterIndex = style.layers.findIndex(item => item.id === layer.id);
        
        if (currentRasterIndex > firstResourceIndex) {
            map.moveLayer(layer.id, firstResourceLayerId);
        }
    });
};

ko.components.register = function(name, config) {
    if (name === "map-filter" && config?.viewModel?.prototype) {
        
        const originalInitialize = config.viewModel.prototype.initialize;
        config.viewModel.prototype.initialize = function(...args) {
            const result = originalInitialize.apply(this, args);

            if (ko.isObservable(this.map)) {
                this.map.subscribe(mapInstance => {
                    if (!mapInstance) return;

                    if (mapInstance.isStyleLoaded()) {
                        reorderMapLayers(mapInstance);
                    } else {
                        mapInstance.once('load', () => reorderMapLayers(mapInstance));
                    }
                    mapInstance.on('idle', () => reorderMapLayers(mapInstance));
                });
            }

            return result;
        };

        config.viewModel.prototype.zoomToGeoJSON = function(data) {
            const mapData = data.properties.geometries.reduce((fc1, fc2) => {
                fc1.geom.features = fc1.geom.features.concat(fc2.geom.features);
                return fc1;
            }, {
                geom: { type: "FeatureCollection", features: [] },
            });

            const bounds = new this.mapboxgl.LngLatBounds(
                geojsonExtent(mapData.geom),
            );

            this.mapFitBounds(bounds, {
                maxZoom: Math.min(ko.unwrap(this.maxZoom), arches.mapDefaultMaxZoom || 24),
            }, true);
        };
    }

    return originalRegister(name, config);
};

const coreMapFilter = require("arches/arches/app/media/js/views/components/search/map-filter");
export default coreMapFilter.default;