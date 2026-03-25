export const loadSourcesAndLayersIntoMap = (map, layers, activeLayerIds = []) => {
    layers.forEach((layer) => {
        const sourceInfo = layer.source_info;
        const layerInfo = layer.layer_info;

        console.log("Layerinfo inside loadSources: ", layerInfo);
        
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
    });
};

const _addLayersForGeojsonSource = (map, layerInfo, activeLayerIds) => {
    map.addLayer({
        id: `${layerInfo.id}-fill`,
        type: 'fill',
        source: layerInfo.source,
        paint: {
            'fill-color': layerInfo.accent || '#22d37a',
            'fill-opacity': 0.4
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
            'line-color': layerInfo.accent || '#22d37a',
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
            'circle-color': layerInfo.accent || '#22d37a',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        },
        filter: ['==', ['geometry-type'], 'Point'], 
        layout: {
            visibility: activeLayerIds.includes(layerInfo.id) ? "visible" : "none",
        },
        minzoom: 0,
    });
}



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