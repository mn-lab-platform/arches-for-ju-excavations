import { getCookie } from './service-utils';

const getOne = (resourceId) => {
    const url = `/resources/${resourceId}`;
    
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Accept': 'application/json'  
        }
    }).then(resp => {
        if (!resp.ok) {
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

const getAllRelatedTo = (resourceId) => {
    const url = `/resource/related/${resourceId}`;
    return fetch(url, {
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
        return {};
    });
};

export default {
    getOne: getOne,
    getAll: getAll,
    getAllRelatedTo: getAllRelatedTo,
    deleteOne: deleteOne
}