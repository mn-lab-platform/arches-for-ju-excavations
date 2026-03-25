import { bbox } from "@turf/turf";

export const updateGeojsonSource = (map, sourceId, geojsonData) => {
    try {
        if (map.getSource(sourceId)) {
            map.getSource(sourceId).setData(geojsonData);
        } else {
            console.warn(`updateGeojsonSource: Source with id ${sourceId} not found on the map.`);
        }
    } catch (error) {
        console.error(`updateGeojsonSource: Error updating geojson source: ${error.message}`);
    }
}

export const fitMapToGeojson = (map, geojsonData, options = {}) => {
    try {
        const bounds = bbox(geojsonData);
        map.fitBounds(bounds, options);
    } catch (error) {
        console.error(`fitMapToGeojson: Error fitting map to geojson: ${error.message}`);
    }
}

export const createValidLayerInfoFromResourceData= (resourceData) => {
    const { resourceId, name, description, geometryFeatures } = resourceData;

    const processedFeatures = geometryFeatures.map((feat, index) => {
        return {
            ...feat,
            id: `${resourceId}-${index}`, 
            properties: {
                ...feat.properties,
                resourceId: resourceId, 
                name: name,
                description: description
            }
        };
    });

    return processedFeatures;
}