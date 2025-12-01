function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const getResourceData = (resourceId) => {
    console.log("getResourceData called with resourceId:", resourceId, "type:", typeof resourceId);
    const url = `/resources/${resourceId}`;
    console.log("Fetching URL:", url);
    
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Accept': 'application/json'
        }
    }).then(resp => {
        console.log("Response status:", resp.status, "for URL:", url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    });
};

export default {
    getResourceData
}