import { getCookie } from "./service-utils";

const TUS_UPLOAD_TYPES = Object.freeze({
    maplayer: 'maplayer',
    model: 'model',
    iiif: 'iiif',
});

const getUploadUrl = () => {
    return '/tus/files/';
}

const generateSecureToken = () => {
    const url = `/api/tus/generate-token`;
    return fetch(url, {
        method: 'GET',
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    })
}

const patchTusMetadata = async (tusId, newMetadata) => {
    const url = `/api/tus/patch-metadata`;
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') 
        },
        body: JSON.stringify({
            tus_id: tusId,
            metadata: newMetadata
        })
    });

    if (!response.ok) {
        throw new Error(`Metadata update failed: HTTP ${response.status}`);
    }

    return response;
}

export default {
    TUS_UPLOAD_TYPES,
    getUploadUrl,
    generateSecureToken,
    patchTusMetadata
}