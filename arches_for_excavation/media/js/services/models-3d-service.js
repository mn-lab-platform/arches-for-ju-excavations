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

const waitForModelStatus = async (parentResourceId, modelId, options = {}) => {
    const maxAttempts = options.maxAttempts || 30;
    const delayMs = options.delayMs || 1000;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const response = await fetch(
            `/api/tus/model-status/${parentResourceId}/${modelId}`,
            { credentials: 'include' }
        );
        const status = await response.json();

        if (!response.ok && response.status !== 202) {
            throw new Error(status.error || `HTTP ${response.status}`);
        }
        if (status.status === 'ready') {
            return status;
        }
        if (status.status === 'error') {
            throw new Error(status.error || '3D model processing failed');
        }
        await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    throw new Error('Timed out waiting for 3D model processing');
};

export default {
    getAllModelsWithGeoreferencedData: getAllModelsWithGeoreferencedData,
    waitForModelStatus: waitForModelStatus,
}