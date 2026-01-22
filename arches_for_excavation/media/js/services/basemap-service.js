import { getCookie } from "./service-utils";

const pollBasemapTask = (taskId, interval = 3000) => {
    const url = `/basemap/task-status/${taskId}/`;
}