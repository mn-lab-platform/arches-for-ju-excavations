import { getCookie } from "./service-utils";

const generateSecureToken = () => {
    const url = `/api/tus/generate-token`;
    return fetch(url, {
        method: 'GET',
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    })
}

const patchTusMetadata = (tusId, newMetadata) => {
    const url = `/api/tus/patch-metadata`;
    return fetch(url, {
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
}

export default {
    generateSecureToken,
    patchTusMetadata
}