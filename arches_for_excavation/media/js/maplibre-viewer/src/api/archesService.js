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
    params.delete('paging-filter');
    params.set('limit', '10000');
    [
        'total',
        'tiles',
        'format',
        'reportlink',
        'precision',
        'exportsystemvalues',
    ].forEach(param => params.delete(param));
    let page = 1;
    const results = [];
    let fetchedHitCount = 0;
    let totalHitCount = null;
    const iiifIds = new Set();
    const IIIF_GRAPH_IDS = new Set([
        '401b3051-d1c4-465c-8dd0-1d5784adee98',
        'f1b9e37a-c3ba-4c26-a797-7f16302c031c'
    ]);

    while (page <= maxPages) {
        params.set('paging-filter', String(page));
        const url = `/search/resources?${params.toString()}`;
        console.debug('[Map Search] Requesting page', page, url);

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
            console.warn('[Map Search] Network error:', err);
            break;
        }

        let json;
        try {
            json = await resp.json();
        } catch (err) {
            console.warn('[Map Search] Non-JSON response:', err, 'HTTP', resp.status);
            break;
        }
        if (!resp.ok) {
            console.warn('[Map Search] HTTP error:', resp.status, json);
            break;
        }
        if (json && json.success === false) {
            console.warn('[Map Search] Search returned success=false:', json);
            break;
        }
        results.push(json);
        if (!json || (Object.keys(json).length === 0 && resp.ok)) {
            break;
        }

        const hits = json?.results?.hits?.hits;
        if (Array.isArray(hits)) {
            fetchedHitCount += hits.length;
            hits.forEach(hit => {
                const source = hit?._source;
                if (source?.resourceinstanceid && IIIF_GRAPH_IDS.has(source.graph_id)) {
                    iiifIds.add(source.resourceinstanceid);
                }
            });
            if (hits.length === 0) {
                break;
            }

            const total = json?.results?.hits?.total;
            if (typeof total === 'number') {
                totalHitCount = total;
            } else if (typeof total?.value === 'number') {
                totalHitCount = total.value;
            }
            if (totalHitCount !== null && fetchedHitCount >= totalHitCount) {
                break;
            }
        }
        page += 1;
    }

    if (iiifIds.size > 0) {
        const crsByResourceId = new Map();
        const resourceIds = Array.from(iiifIds);
        const BATCH_SIZE = 50;

        for (let start = 0; start < resourceIds.length; start += BATCH_SIZE) {
            const batch = resourceIds.slice(start, start + BATCH_SIZE);
            const enrichParams = new URLSearchParams();
            batch.forEach(resourceId => enrichParams.append('resourceid', resourceId));
            enrichParams.set('limit', String(batch.length));

            try {
                const enrichResponse = await fetch(
                    `/api/resources-by-displayname?${enrichParams.toString()}`,
                    {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken')
                        }
                    }
                );

                if (!enrichResponse.ok) {
                    console.warn('[Map Search] CRS enrichment HTTP error:', enrichResponse.status);
                    continue;
                }

                const enriched = await enrichResponse.json();
                (enriched?.results?.hits?.hits || []).forEach(hit => {
                    const source = hit?._source;
                    if (source?.resourceinstanceid) {
                        crsByResourceId.set(
                            source.resourceinstanceid,
                            source.has_crs === true
                        );
                    }
                });
            } catch (err) {
                console.warn('[Map Search] CRS enrichment network error:', err);
            }
        }

        results.forEach(pageResult => {
            (pageResult?.results?.hits?.hits || []).forEach(hit => {
                const source = hit?._source;
                if (source && crsByResourceId.has(source.resourceinstanceid)) {
                    source.has_crs = crsByResourceId.get(source.resourceinstanceid);
                }
            });
        });
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