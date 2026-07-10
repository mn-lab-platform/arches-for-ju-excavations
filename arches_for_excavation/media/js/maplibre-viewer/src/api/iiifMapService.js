const buildAllmapsLayerUrl = (resourceId, kind = "ortho") => {
    const encondedResourceId = encodeURIComponent(resourceId);
    const encodedKind = encodeURIComponent(kind);
    return `/api/iiif/${encondedResourceId}/allmaps-layers?kind=${encodedKind}`;
};

const checkResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return response;
}

export const getAllmapsLayer = async (resourceId, options= {}) => {
    const url = buildAllmapsLayerUrl(resourceId, options.kind);
    const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
    });
    await checkResponse(response);
    const data = await response.json();
    return data;
}

export const getOrthoAnnotationPage = async (resourceId) => {
    const data = await getAllmapsLayer(resourceId, { kind: "ortho" });

    if (!data || !data.annotation_page) {
        throw new Error("IIIF map response did not include annotation_page");
    }

    return data.annotation_page;
};
