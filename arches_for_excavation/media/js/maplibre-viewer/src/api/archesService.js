import basemapService from '../../../services/basemap-service';
import resourceService from '../../../services/resource-service';
import tileService from '../../../services/tile-service';

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

export const getBasemapsAndOverlays = () => {
    return basemapService.getBasemapsAndOverlaysInfo();
};

export const getAllResources = (graphId = null, searchTerm = '', limit = 100) => {
    return resourceService.getAll(graphId, searchTerm, limit);
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

export const getAllTileDisplayValuesForResource = (resourceId) => {
    return tileService.getAllForResource(resourceId).then(tilesData => {
        const flatProperties = {};

        if (!tilesData.tiles || !Array.isArray(tilesData.tiles)) return flatProperties;

        tilesData.tiles.forEach(tile => {
            if (tile.display_values && Array.isArray(tile.display_values)) {
                tile.display_values.forEach(item => {
                    if (item.label && item.value !== null && item.value !== "") {
                        flatProperties[item.label] = item.value;
                    }
                });
            }
        });
        return flatProperties;
    });
};