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

export default {
    defineCRSFromTwoPoints
};