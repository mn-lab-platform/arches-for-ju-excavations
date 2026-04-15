import { bbox } from "@turf/turf";
import store from "../../core/store";

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

export const fitMapToGeojson = (map, geojsonData) => {
    const blockedLeftWidth = (store.searchFlyoutWidth || 0) + (store.menuPanelWidth || 0);
    
    try {
        const bounds = bbox(geojsonData);
        map.fitBounds(bounds, {
            duration: 800,
            padding: {
                top: 50,
                bottom: 50,
                right: 50,
                left: blockedLeftWidth + 50
            }
        });
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

export const addSourceAndLayersToMap = (map, layerDefinition, activeLayerIds = []) => {
    console.log("Adding layer to map with definition: ", layerDefinition);
    const sourceInfo = layerDefinition.source_info;
    const layerInfo = layerDefinition.layer_info;

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
                    visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none",
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
    map.addLayer({
        id: `${layerInfo.id}-fill`,
        type: 'fill',
        source: layerInfo.source,
        paint: {
            'fill-color': layerInfo.accent || '#22d37a',
            'fill-opacity': layerInfo.opacity ?? 0.5,
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
            'line-color': layerInfo.accent|| '#22d37a',
            'line-width': 2,
            'line-opacity': layerInfo.opacity ?? 0.5,
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
            'circle-color': layerInfo.accent || '#22d37a',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': layerInfo.opacity ?? 0.5,
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

export const refreshGeojsonLayer = (map, layerDefinition) => {
    const sourceInfo = layerDefinition.source_info;
    const layerInfo = layerDefinition.layer_info;
    //currently supports opacity and accent color change, name is handled externally and doesn't require map update
    if (sourceInfo.type === "geojson") {
        const layerIdsToUpdate = [`${layerInfo.id}-fill`, `${layerInfo.id}-line`, `${layerInfo.id}-circle`];

        layerIdsToUpdate.forEach(layerId => {
            if (map.getLayer(layerId)) {
                if (layerId.endsWith('-fill')) {
                    map.setPaintProperty(layerId, 'fill-color', layerInfo.accent || '#22d37a');
                    map.setPaintProperty(layerId, 'fill-opacity', layerInfo.opacity ?? 0.5);
                } else if (layerId.endsWith('-line')) {
                    map.setPaintProperty(layerId, 'line-color', layerInfo.accent || '#22d37a');
                    map.setPaintProperty(layerId, 'line-opacity', layerInfo.opacity ?? 0.5);
                } else if (layerId.endsWith('-circle')) {
                    map.setPaintProperty(layerId, 'circle-color', layerInfo.accent || '#22d37a');
                    map.setPaintProperty(layerId, 'circle-opacity', layerInfo.opacity ?? 0.5);
                }
            }
        });
    }
}