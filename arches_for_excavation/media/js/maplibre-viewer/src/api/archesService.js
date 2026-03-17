import basemapService from '../../../services/basemap-service';

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

const FALLBACK_MAP_EXTENT_PAYLOAD = {
    'a106c400-260c-11e7-a604-14109fd34195': {
        resource: {
            'Map Settings': {
                'Project Extent': {
                    DEFAULT_BOUNDS: {
                        geojson: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Polygon',
                                        coordinates: [[
                                            [21.8743505694393, 37.7321068192526],
                                            [21.8744023550122, 37.7232228441796],
                                            [21.8741627140566, 37.715509003016],
                                            [21.8914859609764, 37.7154434449371],
                                            [21.8940367731779, 37.7152932920655],
                                            [21.894183201293, 37.7319361916638],
                                            [21.8910657449219, 37.7318915843109],
                                            [21.888573705031, 37.732004000042],
                                            [21.8743505694393, 37.7321068192526]
                                        ]]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
};

const _extractProjectExtentCoordinates = (payload) => {
    const firstEntry = Object.values(payload)[0];
    const coordinates =
        firstEntry.resource['Map Settings']['Project Extent'].DEFAULT_BOUNDS.geojson.features[0].geometry.coordinates;
    return coordinates.flat();
};

const _parseJsonSafely = async (response) => {
    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    const bodyText = await response.text();

    if (!contentType.includes('application/json')) {
        throw new Error(`Expected JSON but got "${contentType || 'unknown'}". Body starts with: ${bodyText.slice(0, 120)}`);
    }

    try {
        return JSON.parse(bodyText);
    } catch (error) {
        throw new Error(`Invalid JSON response. Body starts with: ${bodyText.slice(0, 120)}`);
    }
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

        const payload = await _parseJsonSafely(response);
        return _extractProjectExtentCoordinates(payload);
    } catch (error) {
        console.warn('Map extent API failed, using fallback extent:', error);
        return _extractProjectExtentCoordinates(FALLBACK_MAP_EXTENT_PAYLOAD);
    }
};

export const getBasemapsAndOverlays = () => {
    return basemapService.getBasemapsAndOverlaysInfo();
};
