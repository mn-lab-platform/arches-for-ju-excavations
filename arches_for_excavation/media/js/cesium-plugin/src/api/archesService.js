import basemapService from '../../../services/basemap-service';
import resourceService from '../../../services/resource-service';
import models3dService from '../../../services/models-3d-service';

export const getWKT2DefinitionForModelId = (modelId) => {
    const CRS_MODEL_GRAPHIDS = ['a5219c24-2907-4055-9d68-18216d214458', '855343ec-9d7c-4947-970c-e80b6cfacc4f'];
    return resourceService.getAllRelatedTo(modelId).then(relatedResources => {
        const relatedResourcesArray = relatedResources.related_resources.related_resources || [];
        const relatedCRSObject = relatedResourcesArray.filter(rel => CRS_MODEL_GRAPHIDS.includes(rel.graph_id));
        if (relatedCRSObject.length === 0) {
            console.log("No related CRS resource found for model ID: ", modelId);
            return null;
        }
        const crsResourceId = relatedCRSObject[0].resourceinstanceid;

        return resourceService.getOne(crsResourceId).then(crsResource => {
            return findDeepValue(crsResource.resource || {}, ['WKT-2 String', 'WKT-2', 'WKT2']) || '';
        });
    });
};

export const getAllModels = () => {
    return models3dService.getAllModelsWithGeoreferencedData();
};

export const getBasemapsAndOverlays = () => {
    return basemapService.getBasemapsAndOverlaysInfo();
};
