export const extractGeommetryFeaturesFromArchesResourceInfo = (resourceInfo) => {
    const geometry = resourceInfo?.geometries?.[0]?.geom;

    if (!geometry) {
        console.warn(`extractGeommetryFeaturesFromArchesResourceInfo: Resource with id ${resourceInfo?.resourceId} does not have valid geometry.`);
        return [];
    }

    let extractedFeatures = [];

    if (geometry.type === "FeatureCollection") {
        if (geometry.features) {
            extractedFeatures = geometry.features;
        }
    } else if (geometry.type === "Feature") {
        extractedFeatures = [geometry];
    } else {
        console.warn("MapEngine: Unrecognized or invalid geometry structure.", geometry);
    }

    return extractedFeatures;
}