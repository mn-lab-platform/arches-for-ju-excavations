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

export const addSourceAndLayersToMap = (map, layerInfo, activeLayerIds = []) => {
    console.log("Adding layer to map with info: ", layerInfo);
    console.log("Active layers before adding: ", activeLayerIds);
    
    const sourceInfo = {
        name: layerInfo.id,
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: layerInfo.features
        }
    }

    layerInfo.source = sourceInfo.name;

    console.log("Layerinfo inside loadSourcesmap: ", layerInfo);
    
    const hasRasterLayer = !!map.getLayer(layerInfo.id);
    const hasGeojsonLayer = !!map.getLayer(`${layerInfo.id}-fill`) || !!map.getLayer(`${layerInfo.id}-line`) || !!map.getLayer(`${layerInfo.id}-circle`);

    if (map.getSource(sourceInfo.name) && (hasRasterLayer || hasGeojsonLayer))
        return;

    if (sourceInfo.type === "raster") {
        const sourceConfig = {
            type: "raster",
            tiles: sourceInfo.tiles,
            tileSize: sourceInfo.tileSize,
            maxzoom: 24,
        };

        if (sourceInfo.bounds) {
            sourceConfig.bounds = sourceInfo.bounds;
        }

        if (!map.getSource(sourceInfo.name)) {
            map.addSource(sourceInfo.name, sourceConfig);
        }

        if (!map.getLayer(layerInfo.id)) {
            map.addLayer({
                id: layerInfo.id,
                type: "raster",
                source: layerInfo.source,
                maxzoom: 24,
                layout: {
                    visibility: "visible",
                },
            });
        }
    }
    else if (sourceInfo.type === "geojson") {
        if (!map.getSource(sourceInfo.name)) {
            map.addSource(sourceInfo.name, {
                type: "geojson",
                data: sourceInfo.data,
            });
        }
        _addLayersForGeojsonSource(map, layerInfo, activeLayerIds);
    }
    else {
        console.warn(`Unsupported source type: ${sourceInfo.type}`);
    }
};

const _addLayersForGeojsonSource = (map, layerInfo, activeLayerIds) => {
    console.log("Id from layerinfo: ", layerInfo.id);
    console.log("Active layers: ", activeLayerIds);
    
    map.addLayer({
        id: `${layerInfo.id}-fill`,
        type: 'fill',
        source: layerInfo.source,
        paint: {
            'fill-color': layerInfo.color || '#22d37a',
            'fill-opacity': 0.5
        },  
        filter: ['==', ['geometry-type'], 'Polygon'],
        layout: {
            visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none",
        },
        minzoom: 0,
    });

    map.addLayer({
        id: `${layerInfo.id}-line`,
        type: 'line',
        source: layerInfo.source,
        paint: {
            'line-color': layerInfo.color|| '#22d37a',
            'line-width': 2
        },
        filter: ['!=', ['geometry-type'], 'Point'],
        layout: {
            visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none",
        },
        minzoom: 0,
    });

    map.addLayer({
        id: `${layerInfo.id}-circle`,
        type: 'circle',
        source: layerInfo.source,
        paint: {
            'circle-radius': 6,
            'circle-color': layerInfo.color || '#22d37a',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        },
        filter: ['==', ['geometry-type'], 'Point'], 
        layout: {
            visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none",
        },
        minzoom: 0,
    });
};

const _layerSuffixes = ['-fill', '-line', '-circle'];

export const hideLayer = (map, layerId) => {
    if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', 'none');
        return;
    }
    _layerSuffixes.forEach(sfx => {
        const lid = `${layerId}${sfx}`;
        if (map.getLayer(lid)) {
            map.setLayoutProperty(lid, 'visibility', 'none');
        }
    });
};

export const showLayer = (map, layerId) => {
    if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
        return;
    }
    _layerSuffixes.forEach(sfx => {
        const lid = `${layerId}${sfx}`;
        if (map.getLayer(lid)) {
            map.setLayoutProperty(lid, 'visibility', 'visible');
        }
    });
};

export const applyActiveLayerVisibility = (map, layers, activeLayerIds = []) => {
    layers.forEach((layer) => {
        const id = layer.layer_info.id;
        const srcType = layer.source_info?.type;

        if (srcType === 'raster') {
            if (map.getLayer(id)) {
                map.setLayoutProperty(
                    id,
                    "visibility",
                    activeLayerIds.includes(id) ? "visible" : "none"
                );
            }
        }
        else if (srcType === 'geojson') {
            ['-fill', '-line', '-circle'].forEach(sfx => {
                const lid = `${id}${sfx}`;
                if (map.getLayer(lid)) {
                    map.setLayoutProperty(
                        lid,
                        "visibility",
                        activeLayerIds.includes(id) ? "visible" : "none"
                    );
                }
            });
        }
        else {
            if (map.getLayer(id)) {
                map.setLayoutProperty(
                    id,
                    "visibility",
                    activeLayerIds.includes(id) ? "visible" : "none"
                );
            }
        }
    });
};