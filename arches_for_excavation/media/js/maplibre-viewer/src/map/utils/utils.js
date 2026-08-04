import { bbox } from "@turf/turf";
import { combineLngLatBounds } from "./bounds";
import store from "../../core/store";
import constants from "../../constants/constants";

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

export const extractBoundsFromVectorPreviewLayers = (vectorPreviewLayer) => {
    try {
        const geometryObject = {
            type: "FeatureCollection",
            features: Array.from(vectorPreviewLayer)
        }

        const bboxArray = bbox(geometryObject);

         return [[
            [bboxArray[0], bboxArray[1]],
            [bboxArray[2], bboxArray[3]]
        ]];
    } catch (error) {
        console.error(`extractBoundsFromVectorPreview: Error extracting bounds from vector preview: ${error.message}`);
        return null;
    }
}

export const extractBoundsFromRasterPreviewLayers = (rasterPreviewLayer) => {
    try {
        return rasterPreviewLayer.map(l => l.layer.getBounds());
    } catch (error) {
        console.error(`extractBoundsFromRasterPreview: Error extracting bounds from raster preview: ${error.message}`);
        return null;
    }
}

export const extractBoundsFromGeojson = (geojsonData) => {
    try {
        const bboxArray = bbox(geojsonData);
        return [
            [bboxArray[0], bboxArray[1]],
            [bboxArray[2], bboxArray[3]]
        ];
    } catch (error) {
        console.error(`getBoundsFromGeojson: Error extracting bounds: ${error.message}`);
        return null;
    }
}

export const extractBoundsFromLayerDefinition = (layerDefinition, orthoLayerMap) => {
    const allBounds = [];
    const sourceInfo = layerDefinition.source_info;

    if (sourceInfo.type === constants.LAYER_TYPES.iiif && sourceInfo.data) {
        sourceInfo.data.forEach(iiifObj => {
            const orthoEntry = orthoLayerMap.get(iiifObj.uniqueIiifId);
            if (orthoEntry && orthoEntry.layer && orthoEntry.layer.getBounds) {
                allBounds.push(orthoEntry.layer.getBounds());
            }
        });
    } 
    else if (sourceInfo.type === constants.LAYER_TYPES.geojson && sourceInfo.data && sourceInfo.data.features) {
        const bounds = extractBoundsFromGeojson({
            type: 'FeatureCollection',
            features: sourceInfo.data.features
        });
        if (bounds) allBounds.push(bounds);
    }

    return allBounds.length > 0 ? combineLngLatBounds(allBounds) : null;
};

export const fitMapToBounds = (map, bounds) => {
    const blockedLeftWidth = (store.searchFlyoutWidth || 0) + (store.menuPanelWidth || 0);
    try {
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
        console.error(`fitMapToBounds: Error fitting map to bounds: ${error.message}`);
    }
}

export const createValidLayerInfoFromResourceData = (resourceData) => {
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
    const sourceInfo = layerDefinition.source_info;
    const layerInfo = layerDefinition.layer_info;

    const hasRasterLayer = map.getLayer(layerInfo.id);
    const hasGeojsonLayer = map.getLayer(`${layerInfo.id}-fill`) || map.getLayer(`${layerInfo.id}-line`) || map.getLayer(`${layerInfo.id}-circle`) || map.getLayer(`${layerInfo.id}-fill-pattern`);

    if (map.getSource(sourceInfo.name) && (hasRasterLayer || hasGeojsonLayer))
        return;

    if (sourceInfo.type === "none") return;

    if (sourceInfo.type === "raster") {
        const sourceConfig = {
            type: "raster",
            tiles: sourceInfo.tiles,
            tileSize: sourceInfo.tileSize,
            maxzoom: 26,
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
                layout: {
                    visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none",
                },
            });
        }
    }
    else if (sourceInfo.type === constants.LAYER_TYPES.geojson) {
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

const _asArray = (value) => {
    return Array.isArray(value) ? value : [value];
};

const _setLayerVisibility = (map, mapLayerId, visibility) => {
    if (map.getLayer(mapLayerId)) {
        map.setLayoutProperty(mapLayerId, 'visibility', visibility);
    }
};

export const hideMapLayerIds = (map, mapLayerIds) => {
    mapLayerIds.forEach(mapLayerId => {
        _setLayerVisibility(map, mapLayerId, 'none');
    });
};

export const showMapLayerIds = (map, mapLayerIds) => {
    mapLayerIds.forEach(mapLayerId => {
        _setLayerVisibility(map, mapLayerId, 'visible');
    });
};

const _addLayersForGeojsonSource = (map, layerInfo, activeLayerIds) => {
    map.addLayer({
        id: `${layerInfo.id}-fill`,
        type: 'fill',
        source: layerInfo.source,
        paint: {
            'fill-color': layerInfo.color || '#22d37a',
            'fill-opacity': layerInfo.opacity || constants.DEFAULT_LAYER_OPACITY,
        },  
        filter: ['==', ['geometry-type'], 'Polygon'],
        layout: {
            visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none",
        },
        minzoom: 0,
    });

    map.addLayer({
        id: `${layerInfo.id}-fill-pattern`,
        type: 'fill',
        source: layerInfo.source,
        paint: {
            'fill-color': 'transparent',
            'fill-opacity': layerInfo.opacity || constants.DEFAULT_LAYER_OPACITY,
        },
        filter: ['==', ['geometry-type'], 'Polygon'],
        layout: {
            visibility: "none",
        },
        minzoom: 0,
    });

    map.addLayer({
        id: `${layerInfo.id}-line`,
        type: 'line',
        source: layerInfo.source,
        paint: {
            'line-color': layerInfo.color || '#22d37a',
            'line-width': layerInfo.lineWidth || constants.DEFAULT_LAYER_LINE_WIDTH,
            'line-opacity': layerInfo.opacity || constants.DEFAULT_LAYER_OPACITY,
        },
        filter: ['!=', ['geometry-type'], 'Point'],
        layout: {
            visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none"
        },
        minzoom: 0,
    });

    map.addLayer({
        id: `${layerInfo.id}-circle`,
        type: 'circle',
        source: layerInfo.source,
        paint: {
            'circle-radius': layerInfo.pointRadius || constants.DEFAULT_LAYER_POINT_RADIUS,
            'circle-color': layerInfo.color || '#22d37a',
            'circle-stroke-width': layerInfo.pointBorderWidth || constants.DEFAULT_LAYER_POINT_BORDER_WIDTH,
            'circle-stroke-color': layerInfo.pointBorderColor || constants.DEFAULT_LAYER_POINT_BORDER_COLOR,
            'circle-opacity': layerInfo.opacity || constants.DEFAULT_LAYER_OPACITY,
            'circle-stroke-opacity': layerInfo.opacity || constants.DEFAULT_LAYER_OPACITY,
        },
        filter: ['==', ['geometry-type'], 'Point'], 
        layout: {
            visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none",
        },
        minzoom: 0,
    });

    map.addLayer({
        id: `${layerInfo.id}-symbol`,
        type: 'symbol',
        source: layerInfo.source,
        layout: {
            'text-field': ['get', layerInfo.labelProperty || ''],
            'text-size': layerInfo.labelSize || constants.DEFAULT_LAYER_LABEL_FONT_SIZE,
            'text-anchor': [
                'match',
                ['geometry-type'],
                'Point', 'bottom',     
                'LineString', 'center', 
                'Polygon', 'center',   
                'center'
            ],
            visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none",
            'text-allow-overlap': false,
            'text-ignore-placement': false,
            'text-offset': [
                'match',
                ['geometry-type'],
                'Point', ['literal', [0, -1.5]],
                'LineString', ['literal', [0, 0]],
                'Polygon', ['literal', [0, 0]],
                ['literal', [0, 0]]
            ],
        },
        paint: {
            'text-color': '#333333',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2
        },
        minzoom: 0,
    });
};

export const hideLayer = (map, exactMapLayerIds) => {
    hideMapLayerIds(map, _asArray(exactMapLayerIds));
};

export const showLayer = (map, exactMapLayerIds) => {
    showMapLayerIds(map, _asArray(exactMapLayerIds));
};

export const refreshGeojsonLayer = (map, layerDefinition) => {
    console.log('refreshGeojsonLayer called with layerDefinition: ', layerDefinition);
    console.log("Currently active layers: ", map.getStyle().layers.map(l => l.id));
    const sourceInfo = layerDefinition.source_info;
    const layerInfo = layerDefinition.layer_info;
    if (sourceInfo.type === constants.LAYER_TYPES.geojson) {
        const layerIdsToUpdate = [`${layerInfo.id}-fill`, `${layerInfo.id}-line`, `${layerInfo.id}-circle`, `${layerInfo.id}-fill-pattern`, `${layerInfo.id}-symbol`];

        layerIdsToUpdate.forEach(layerId => {
            if (map.getLayer(layerId)) {
                if (layerId.endsWith('-fill')) {
                    map.setPaintProperty(layerId, 'fill-color', layerInfo.color || '#22d37a');
                    map.setPaintProperty(layerId, 'fill-opacity', layerInfo.opacity ?? 0.5);
                } else if (layerId.endsWith('-fill-pattern')) {
                    map.setPaintProperty(layerId, 'fill-pattern', layerInfo.hatchFill || '');
                    map.setPaintProperty(layerId, 'fill-opacity', layerInfo.hatchFillOpacity ?? 0.6);
                    map.setLayoutProperty(layerId, 'visibility', layerInfo.hatchFill ? 'visible' : 'none');
                } else if (layerId.endsWith('-line')) {
                    map.setPaintProperty(layerId, 'line-color', layerInfo.lineColor || '#22d37a');
                    map.setPaintProperty(layerId, 'line-opacity', layerInfo.lineOpacity ?? 1);
                    map.setPaintProperty(layerId, 'line-width', layerInfo.lineWidth ?? 2);
                    _applyLineStyle(map, layerId, layerInfo.lineStyle || constants.LINE_STYLES.solid);
                } else if (layerId.endsWith('-circle')) {
                    map.setPaintProperty(layerId, 'circle-color', layerInfo.pointColor || '#22d37a');
                    map.setPaintProperty(layerId, 'circle-opacity', layerInfo.pointOpacity || constants.DEFAULT_LAYER_OPACITY);
                    map.setPaintProperty(layerId, 'circle-radius', layerInfo.pointRadius || constants.DEFAULT_LAYER_POINT_RADIUS);
                    map.setPaintProperty(layerId, 'circle-stroke-color', layerInfo.pointBorderColor || constants.DEFAULT_LAYER_POINT_BORDER_COLOR);
                    map.setPaintProperty(layerId, 'circle-stroke-width', layerInfo.pointBorderWidth || constants.DEFAULT_LAYER_POINT_BORDER_WIDTH);
                    map.setPaintProperty(layerId, 'circle-stroke-opacity', layerInfo.pointOpacity || constants.DEFAULT_LAYER_OPACITY);
                } else if (layerId.endsWith('-symbol')) {
                    map.setLayoutProperty(layerId, 'text-field', layerInfo.customLabel ? layerInfo.customLabel : ['get', layerInfo.labelProperty || '']);
                    map.setPaintProperty(layerId, 'text-color', layerInfo.labelColor || '#333333');
                    map.setPaintProperty(layerId, 'text-halo-color', layerInfo.labelHaloColor || '#FFFFFF');
                    map.setPaintProperty(layerId, 'text-halo-width', layerInfo.labelHaloWidth ?? 2);
                    map.setLayoutProperty(layerId, 'text-size', layerInfo.labelSize || constants.DEFAULT_LAYER_LABEL_FONT_SIZE);
                }
            }
        });
    }
}

const _applyLineStyle = (map, layerId, lineStyle) => {
    switch (lineStyle) {
        case constants.LINE_STYLES.solid:
            map.setPaintProperty(layerId, 'line-dasharray', null);
            map.setLayoutProperty(layerId, 'line-cap', 'butt');
            map.setLayoutProperty(layerId, 'line-join', 'miter');
            break;

        case constants.LINE_STYLES.dashed:
            map.setPaintProperty(layerId, 'line-dasharray', [4, 4]);
            map.setLayoutProperty(layerId, 'line-cap', 'butt');
            map.setLayoutProperty(layerId, 'line-join', 'miter');
            break;

        case constants.LINE_STYLES.dotted:
            map.setLayoutProperty(layerId, 'line-cap', 'round');
            map.setLayoutProperty(layerId, 'line-join', 'round');
            map.setPaintProperty(layerId, 'line-dasharray', [0, 2]);
            break;
    }
}