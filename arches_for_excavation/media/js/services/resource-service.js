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
    const url = '/api/resources-by-displayname';
    let queryParams = [];

    if (graphIds) {
        const idsArray = Array.isArray(graphIds) ? graphIds : [graphIds];
        
        idsArray.forEach(id => queryParams.push('graphid=' + encodeURIComponent(id)));
    }
    
    if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.trim();
        queryParams.push('q=' + encodeURIComponent(term));
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