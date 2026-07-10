import { WarpedMapLayer } from '@allmaps/maplibre';
import { getOrthoAnnotationPage } from '../../api/iiifMapService';

export const createWarpedOrthoLayer = async ({
    map,
    resourceId,
    layerId,
    opacity
}) => {
    const annotationPage = await getOrthoAnnotationPage(resourceId);
    const warpedLayer = new WarpedMapLayer({
        layerId,
        opacity
    });

    map.addLayer(warpedLayer);
    await warpedLayer.addGeoreferenceAnnotation(annotationPage);

    return warpedLayer;
};
