import { getCookie } from "./service-utils";

const createOne = (tileData) => {
    let formData = new FormData();
    formData.append('data', JSON.stringify(tileData));

    const url = '/tile';

    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
        body: formData
    }).then((resp) => {
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        return resp.json ? resp.json() : {};
    });
}

const getAllForResource = (resourceId) => {
    const url = `/resource/${resourceId}/tiles`;
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
}

export default {
    createOne: createOne,
    getAllForResource: getAllForResource
}