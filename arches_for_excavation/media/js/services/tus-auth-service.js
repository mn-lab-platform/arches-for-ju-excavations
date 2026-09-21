const generateSecureToken = () => {
    const url = `/api/tus/generate-token`;
    return fetch(url, {
        method: 'GET',
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    })
}

export default {
    generateSecureToken
}