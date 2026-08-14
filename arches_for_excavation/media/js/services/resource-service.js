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

const getAll = (graphIds = null, searchTerm = '', limit = 100) => {
    const url = '/search/resources';
    let queryParams = [];

    if (graphIds) {
        const idsArray = Array.isArray(graphIds) ? graphIds : [graphIds];
        
        const filterObjects = idsArray.map(id => ({
            "graphid": id,
            "inverted": false
        }));
        
        queryParams.push('resource-type-filter=' + encodeURIComponent(JSON.stringify(filterObjects)));  
    }
    
    if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.trim();
        const termFilter = [{
            "inverted": false,
            "type": "string",
            "context": "",
            "context_label": "",
            "id": term,
            "text": term,
            "value": term
        }];
        queryParams.push('term-filter=' + encodeURIComponent(JSON.stringify(termFilter)));
    }

    queryParams.push('limit=' + limit);

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

const getResourcesSimple = (graphIds) => {
    const url = `/api/resources-simple/${graphIds.join(',')}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    });
}

export default {
    getOne: getOne,
    getAll: getAll,
    getAllRelatedTo: getAllRelatedTo,
    deleteOne: deleteOne,
    getResourcesSimple: getResourcesSimple,
}