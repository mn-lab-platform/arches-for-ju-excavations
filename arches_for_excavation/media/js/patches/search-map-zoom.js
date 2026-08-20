import mapboxgl from "mapbox-gl";

const targetMaxZoom = 400;
const prototype = mapboxgl.Map.prototype;

if (!prototype.__archesOriginalFitBounds) {
    prototype.__archesOriginalFitBounds = prototype.fitBounds;

    prototype.fitBounds = function(bounds, options, ...rest) {
        const nextOptions =
            options?.maxZoom === 17
                ? { ...options, maxZoom: targetMaxZoom }
                : options;

        return prototype.__archesOriginalFitBounds.call(
            this,
            bounds,
            nextOptions,
            ...rest,
        );
    };
}