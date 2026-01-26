import { getCookie } from "./service-utils";

const getCeleryTaskStatus = (taskId, interval = 3000) => {
    const url = `/api/celery/task-status/${taskId}`;
    return fetch(url, {
        method: 'GET'
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    })
}

const addSource = (config) => {
    const url = '/admin/models/mapsource/add/';

    let formData = new FormData();
    formData.append('name', config.name);
    formData.append('source', config.source);
    formData.append('_save', 'Save');

    return fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: formData
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.text();
    });
}

const addLayer = (config) => {
    const url = '/admin/models/maplayer/add/';

    let formData = new FormData();
    formData.append('name', config.name);
    formData.append('maplayerid', config.mapLayerId);
    formData.append('initial-maplayerid', config.mapLayerId);
    formData.append('layerdefinitions', config.layerDefinitions);
    formData.append('activated', config.activated);
    formData.append('icon', config.icon);
    formData.append('addtomap', config.addToMap);
    formData.append('sortorder', config.sortOrder);
    formData.append('ispublic', config.isPublic);
    formData.append('centerx', config.centerX);
    formData.append('centery', config.centerY);
    formData.append('searchonly', config.searchOnly);
    formData.append('isoverlay', config.isOverlay);
    formData.append('_save', 'Save');

    return fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: formData
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.text();
    });
}

export default {
    getCeleryTaskStatus,
    addSource,
    addLayer
}