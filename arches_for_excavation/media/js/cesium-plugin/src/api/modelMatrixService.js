export const getTransformedModelMatrixForTileset = (tilesetUrl, wkt2Definition) => {
    const url = `/api/model-matrix/generate?tilesetUrl=${encodeURIComponent(tilesetUrl)}&wkt2=${encodeURIComponent(wkt2Definition)}`;
    return fetch(url, {
        method: 'GET',
    }).then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    });
}