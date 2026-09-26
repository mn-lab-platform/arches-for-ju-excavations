import { getCookie } from './service-utils';

function request(url, options) {
    const requestOptions = options || {};
    const headers = {
        'X-CSRFToken': getCookie('csrftoken') || '',
        'Accept': 'application/json',
        ...(requestOptions.headers || {}),
    };

    return fetch(url, {
        ...requestOptions,
        credentials: 'include',
        headers,
    }).then((response) => {
        if (!response.ok) {
            return response.text().then((text) => {
                let message = text;
                try {
                    const data = JSON.parse(text);
                    message = data.message || data.error || text;
                } catch (error) {
                    // Keep the raw response for HTML error pages such as CSRF 403.
                }
                throw new Error(message || `HTTP ${response.status}`);
            });
        }
        return response;
    });
}

function requestJson(url, options) {
    return request(url, options).then((response) => response.json());
}

function tablePayload(state) {
    return {
        graph_id: state.graphId,
        columns: state.columns,
        filters: state.filters || {},
        sort_by: state.sortBy || '',
        sort_direction: state.sortDirection || 'asc',
    };
}

export function getModels() {
    return requestJson('/api/resource-table/models');
}

export function getColumns(graphId) {
    return requestJson(`/api/resource-table/models/${encodeURIComponent(graphId)}/columns`);
}

export function getTable(state) {
    return requestJson('/api/resource-table/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tablePayload(state)),
    });
}

export function exportCsv(state) {
    return request('/api/resource-table/csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tablePayload(state)),
    }).then((response) => response.blob());
}