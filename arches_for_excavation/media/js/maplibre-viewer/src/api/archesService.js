import basemapService from '../../../services/basemap-service';
import resourceService from '../../../services/resource-service';

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

const _extractProjectExtentCoordinates = (payload) => {
    const firstEntry = Object.values(payload)[0];
    console.log('Extracted first entry from map extent API response: ', firstEntry);
    const coordinates =
        firstEntry.resource['Map Settings']['Project Extent'].DEFAULT_BOUNDS.geojson.features[0].geometry.coordinates;
    return coordinates.flat();
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

export const getBasemapsAndOverlays = () => {
    return basemapService.getBasemapsAndOverlaysInfo();
};

export const getAllResources = (graphId=null) => {
    return resourceService.getAll(graphId);
};

export const getAllResourcesFromFilterString = async (filterString, maxPages = 1000) => {
    const params = new URLSearchParams(filterString);
    let page = Number(params.get('paging-filter') || 1);
    const results = [];

    while (page <= maxPages) {
        params.set('paging-filter', String(page));
        const url = `/search/resources?${params.toString()}`;

        let resp;
        try {
            resp = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
        } catch (err) {
            console.warn('Network error:', err);
            break;
        }

        let json;
        try {
            json = await resp.json();
        } catch (err) {
            console.warn('Non-JSON response:', err);
            break;
        }
        if (json && json.success === false) {
            break;
        }
        results.push(json);
        if (!json || (Object.keys(json).length === 0 && resp.ok)) {
            break;
        }
        page += 1;
    }

    return results;
};