import ko from "knockout";
import geojsonExtent from "geojson-extent";

const targetMaxZoom = 20;
const originalRegister = ko.components.register.bind(ko.components);

ko.components.register = function(name, config) {
    if (name === "map-filter" && config?.viewModel?.prototype) {
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
                maxZoom: Math.min(ko.unwrap(this.maxZoom), targetMaxZoom),
            }, true);
        };
    }

    return originalRegister(name, config);
};

const coreMapFilter = require(
    "arches/arches/app/media/js/views/components/search/map-filter",
);

export default coreMapFilter.default;