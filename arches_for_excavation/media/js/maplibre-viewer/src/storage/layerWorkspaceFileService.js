const EXTENSION = ".mapli";

const downloadLayerWorkspaceFile = (layersArray) => {
    const filename = `layer-workspace-${Date.now()}${EXTENSION}`;

    const fileContent = JSON.stringify(layersArray, null, 2);

    const blob = new Blob([fileContent], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
};


export default {
    EXTENSION,
    downloadLayerWorkspaceFile,
}