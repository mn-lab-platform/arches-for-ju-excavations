export const loadSourcesAndLayersIntoMap = (map, layers, activeLayerIds = []) => {
    layers.forEach((layer) => {
        const sourceInfo = layer.source_info;
        const layerInfo = layer.layer_info;

        if (!map.getSource(sourceInfo.name)) {
            const sourceConfig = {
                type: "raster",
                tiles: sourceInfo.tiles,
                tileSize: sourceInfo.tileSize,
                maxzoom: 24,
            };

            if (sourceInfo.bounds) {
                sourceConfig.bounds = sourceInfo.bounds;
            }

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
    });
};

export const applyActiveLayerVisibility = (map, layers, activeLayerIds = []) => {
    layers.forEach((layer) => {
        const id = layer.layer_info.id;
        if (map.getLayer(id)) {
            map.setLayoutProperty(
                id,
                "visibility",
                activeLayerIds.includes(id) ? "visible" : "none"
            );
        }
    });
};