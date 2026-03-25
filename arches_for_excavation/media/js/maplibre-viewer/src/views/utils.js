export const extractGeommetryFeaturesFromArchesResourceInfo = (resourceInfo) => {
    const geometries = resourceInfo?.geometries;
    if (!geometries || !Array.isArray(geometries) || geometries.length === 0) return [];

    const features = [];

    geometries.forEach(g => {
        const geo = g?.geom;
        if (!geo) return;

        if (geo.type === 'FeatureCollection' && Array.isArray(geo.features)) {
            features.push(...geo.features.filter(f => f && f.type === 'Feature'));
        } else if (geo.type === 'Feature') {
            features.push(geo);
        } else if (geo.type && ['Point','LineString','Polygon','MultiPoint','MultiLineString','MultiPolygon','GeometryCollection'].includes(geo.type)) {
            features.push({ type: 'Feature', geometry: geo, properties: {} });
        } else {
            console.warn('extractGeommetryFeaturesFromArchesResourceInfo: unrecognized geometry', geo);
        }
    });

    return features;
}