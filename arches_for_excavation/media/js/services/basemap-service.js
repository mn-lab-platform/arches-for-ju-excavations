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

export default {
    getCeleryTaskStatus
}