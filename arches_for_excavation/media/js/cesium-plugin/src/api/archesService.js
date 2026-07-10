import basemapService from '../../../services/basemap-service';
import resourceService from '../../../services/resource-service';
import models3dService from '../../../services/models-3d-service';

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === `${name}=`) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

export const getMapExtent = async () => {
    const url = '/api/bulk_disambiguated_resource_instance?v=beta&resource_ids=a106c400-260c-11e7-a604-14109fd34195';

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const payload = await response.json();
        return _extractProjectExtentCoordinates(payload);
    } catch (error) {
        console.warn('Map extent API failed: ', error);
    }
};

const _extractProjectExtentCoordinates = (payload) => {
    const firstEntry = Object.values(payload)[0];
    const coordinates =
        firstEntry.resource['Map Settings']['Project Extent'].DEFAULT_BOUNDS.geojson.features[0].geometry.coordinates;
    return coordinates.flat();
};

export const getWKT2DefinitionForModelId = (modelId) => {
    const CRS_MODEL_GRAPHID = 'a5219c24-2907-4055-9d68-18216d214458';
    return resourceService.getAllRelatedTo(modelId).then(relatedResources => {
        const relatedResourcesArray = relatedResources.related_resources.related_resources || [];
        const relatedCRSObject = relatedResourcesArray.filter(rel => rel.graph_id === CRS_MODEL_GRAPHID);
        if (relatedCRSObject.length === 0) {
            console.log("No related CRS resource found for model ID: ", modelId);
            return null;
        }
        const crsResourceId = relatedCRSObject[0].resourceinstanceid;

        return resourceService.getOne(crsResourceId).then(crsResource => {
            const wkt2Definition = crsResource.resource.Definition['WKT-2']['WKT-2 String'] || '';
            return wkt2Definition;
        });
    });
};

export const getAllModels = () => {
    return models3dService.getAllModelsWithGeoreferencedData();
};

export const getBasemapsAndOverlays = () => {
    return basemapService.getBasemapsAndOverlaysInfo();
};
