import constants from "../../constants/constants";
import { getAllTileDisplayValuesForResource } from "../../api/archesService";
import { extractGeommetryFeaturesFromArchesResourceInfo } from "../../core/utils/utils";

const _generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`;
};

const _aggregateLayerIiifFeatures = (layerDataArray, layerId) => {
    return layerDataArray.map(layerData => ({
        resourceId: layerData.resourceinstanceid,
        displayName: layerData.displayname,
        uniqueIiifId: `${layerId}-ortho-layer-${layerData.resourceinstanceid}`,
    }));
};

const _aggregateLayerGeometryFeatures = async (layerDataArray) => {
    const allFeatures = [];
    const availableLabelKeys = new Set();

    const tileDataPromises = layerDataArray.map(async (layerData, layerIdx) => {
        const resId = layerData.resourceinstanceid ?? layerData.resourceId ?? `layer-${layerIdx}`;
        try {
            const flatProperties = await getAllTileDisplayValuesForResource(resId);
            return { resId, layerData, flatProperties };
        } catch (error) {
            console.error(`Failed to fetch tiles for ${resId}`, error);
            return { resId, layerData, flatProperties: [] };
        }
    });

    const resourcesWithTiles = await Promise.all(tileDataPromises);

    resourcesWithTiles.forEach(({ resId, layerData, flatProperties }) => {
        const features = extractGeommetryFeaturesFromArchesResourceInfo(layerData);
        if (!features || !Array.isArray(features)) return;

        flatProperties && Object.keys(flatProperties).forEach(key => availableLabelKeys.add(key));

        features.forEach((feat, fi) => {
            let feature = feat?.type === 'Feature' 
                ? { ...feat } 
                : { type: 'Feature', geometry: feat?.geometry ?? feat, properties: {} };

            feature.id = feature.id ?? `${resId}-${fi}`;
            feature.properties = {
                ...(feature.properties || {}),
                sourceResourceId: resId,
                sourceDisplayName: layerData.displayname ?? layerData.name,
                ...flatProperties
            };

            allFeatures.push(feature);
        });
    });

    return {
        featureCollection: { type: 'FeatureCollection', features: allFeatures },
        availableLabels: Array.from(availableLabelKeys)
    };
};

export const createLayerDefinition = async (layerDataArray, existingLayerCount) => {
    const layerColor = _generateRandomColor();
    const layerId = `layer-${existingLayerCount}`;
    const layerIcon = layerDataArray[0].icon ?? 'fa-layer-group'; 
    const layerType = layerDataArray[0].type;
    
    const layerName = layerDataArray.length === 1 
        ? layerDataArray[0].displayname 
        : `${layerDataArray[0].displayname} and ${layerDataArray.length - 1} other resource(s)`;

    const layerDefinition = {
        layer_info: {
            id: layerId,
            name: layerName,
            source: layerId,
            color: layerColor,
            icon: layerIcon,
            opacity: null
        },
        source_info: {
            resourceId: layerDataArray[0].resourceinstanceid,
        }
    };
    
    if (layerType === constants.LAYER_TYPES.iiif) {
        layerDefinition.layer_info.opacity = 1;
        layerDefinition.source_info = {
            ...layerDefinition.source_info,
            type: constants.LAYER_TYPES.iiif,
            data: _aggregateLayerIiifFeatures(layerDataArray, layerId),
            name: layerId,
        };
    }
    else if (layerType === constants.LAYER_TYPES.geojson) {
        const { featureCollection, availableLabels } = await _aggregateLayerGeometryFeatures(layerDataArray);

        Object.assign(layerDefinition.layer_info, {
            isGeojson: true,
            opacity: constants.DEFAULT_LAYER_OPACITY,
            hatchFill: constants.HATCH_FILL_SOURCE_PATHS[0],
            hatchFillOpacity: constants.DEFAULT_LAYER_HATCH_FILL_OPACITY,
            hasPoint: false,
            hasLine: false,
            hasPolygon: false,
            lineColor: layerColor,
            lineOpacity: constants.DEFAULT_LAYER_LINE_OPACITY,
            lineStyle: constants.LINE_STYLES.solid,
            lineWidth: constants.DEFAULT_LAYER_LINE_WIDTH,
            pointRadius: constants.DEFAULT_LAYER_POINT_RADIUS,
            pointColor: layerColor,
            pointOpacity: constants.DEFAULT_LAYER_POINT_OPACITY,
            pointBorderColor: constants.DEFAULT_LAYER_POINT_BORDER_COLOR,
            pointBorderWidth: constants.DEFAULT_LAYER_POINT_BORDER_WIDTH,
            availableLabelProperties: availableLabels,
            labelProperty: "",
            customLabel: "",
            labelSize: constants.DEFAULT_LAYER_LABEL_FONT_SIZE,
            labelColor: constants.DEFAULT_LAYER_LABEL_COLOR,
            labelOpacity: constants.DEFAULT_LAYER_LABEL_OPACITY,
            labelHaloColor: constants.DEFAULT_LAYER_LABEL_HALO_COLOR,
            labelHaloWidth: constants.DEFAULT_LAYER_LABEL_HALO_WIDTH
        });

        if (featureCollection.features.length > 0) {
            featureCollection.features.forEach(feature => {
                const geomType = feature.geometry?.type;
                if (!geomType) return;

                if (geomType.includes('Point')) layerDefinition.layer_info.hasPoint = true;
                if (geomType.includes('LineString')) layerDefinition.layer_info.hasLine = true;
                if (geomType.includes('Polygon')) layerDefinition.layer_info.hasPolygon = true;
            });

            layerDefinition.source_info = {
                ...layerDefinition.source_info,
                type: constants.LAYER_TYPES.geojson,
                data: featureCollection,
                name: layerId
            };
        }
    }

    return layerDefinition;
};