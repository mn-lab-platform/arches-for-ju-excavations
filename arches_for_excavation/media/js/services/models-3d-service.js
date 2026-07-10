const getAllModelsWithGeoreferencedData = () => {
    const url = `/api/model-3d/all/access`;
    return fetch(url, {
        method: 'GET'
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
        }
    ).then(data => data.models);
}

export default {
    getAllModelsWithGeoreferencedData: getAllModelsWithGeoreferencedData,
}