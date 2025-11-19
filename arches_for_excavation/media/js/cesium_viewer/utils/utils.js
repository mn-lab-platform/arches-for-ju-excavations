function extractAnnotationData(annotationEntity) {
    const id = annotationEntity?._id || '';
    const name = annotationEntity?._name || '';
    const description = annotationEntity?._description?._value || '';
    const colorObj = annotationEntity?._polygon?.material?.color?._value;
    const positionObj = annotationEntity?._polygon?._hierarchy?._value;

    return {
        id,
        name,
        description,
        color: colorObj ? _cesiumColorToHex(colorObj) : '',
        position: positionObj.positions.map(pos => [pos.x, pos.y, pos.z])
    }
}

function _cesiumColorToHex(color) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    const r = Math.floor(color.red * 255);
    const g = Math.floor(color.green * 255);
    const b = Math.floor(color.blue * 255);

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function generateUniqueId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default {
    extractAnnotationData,
    generateUniqueId
}
