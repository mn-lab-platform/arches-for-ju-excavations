import { getCookie } from './service-utils';

const getOne = (resourceId) => {
    console.log("getOne called with resourceId:", resourceId, "type:", typeof resourceId);
    const url = `/resources/${resourceId}`;
    console.log("Fetching URL:", url);
    
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Accept': 'application/json'  
        }
    }).then(resp => {
        console.log("Response status:", resp.status, "for URL:", url);
        if (!resp.ok) {
            // Log response body for debugging
            return resp.text().then(text => {
                console.error("Error response body:", text);
                throw new Error(`HTTP ${resp.status}: ${text}`);
            });
        }
        return resp.json();
    });
};

const getAll = (graphId=null) => {
    const url = '/search/resources';
    let queryParams = [];

    if (graphId) {
        const resourceTypeFilter = JSON.stringify([{
            "graphid": graphId,
            "inverted": false,
        }]);
        queryParams.push('resource-type-filter=' + encodeURIComponent(resourceTypeFilter));  
    }
    queryParams.push('limit=1000'); //TODO: maybe instead of fetching everything at once fetch based on search

    return fetch(queryParams.length > 0 ? url + '?' + queryParams.join('&') : url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json(); 
    });
};

const deleteOne = (resourceId) => {
    const url = `/resources/${resourceId}`;
    return fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    });
};

const getOneRelatedTo = (relatedResourceId, targetResourceGraphId) => {
    const url = '/search/resources';
    let queryParams = [];

    queryParams.push('relatesto=' + relatedResourceId);
    
    if (targetResourceGraphId) {
        const resourceTypeFilter = JSON.stringify([{
            "graphid": targetResourceGraphId,
            "inverted": false
        }]);
        queryParams.push('resource-type-filter=' + encodeURIComponent(resourceTypeFilter));
    }
    
    queryParams.push('limit=1000');

    return fetch(url + '?' + queryParams.join('&'), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    }).then(searchResults => {
        const resourceIds = searchResults.results.hits.hits.map(hit => hit._source.resourceinstanceid);
        const fetchPromises = resourceIds.map(id => getOne(id));
        return Promise.all(fetchPromises);
    });
}

export default {
    getOne: getOne,
    getAll: getAll,
    deleteOne: deleteOne,
    getOneRelatedTo: getOneRelatedTo
}