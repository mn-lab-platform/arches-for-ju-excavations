import { getCookie } from "./service-utils";

const defineCRSFromTwoPoints = (formData) => {
    const url = '/api/local-coordinate-system/define';
    
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: formData
    }).then(resp => {
        if (!resp.ok) {
            return resp.text().then(text => {
                throw new Error(`HTTP ${resp.status}: ${text}`);
            });
        }
        return resp.json();
    }); 
}
const assignCRSToResources = (payload) => {
    return fetch('/api/local-coordinate-system/assign', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(payload)
    }).then(resp => {
        if (!resp.ok) return resp.text().then(t => { throw new Error(`HTTP ${resp.status}: ${t}`); });
        return resp.json();
    });
};

export default {
    defineCRSFromTwoPoints,
    assignCRSToResources
};
