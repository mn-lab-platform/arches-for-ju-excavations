import { getCookie } from "./service-utils";

const createOne = (tileData) => {
    /**
     * Important Note: this function is used for both creating and updating files
     * arches handles this based on whether tileid is present in the tileData (if it is, it updates the existing tile)
     */
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

const updateOne = (tileData) => {
    if (!tileData.tileid) {
        throw new Error("Tile ID is required for updating a tile.");
    }
    return createOne(tileData);
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
    updateOne: updateOne,
    getAllForResource: getAllForResource
}