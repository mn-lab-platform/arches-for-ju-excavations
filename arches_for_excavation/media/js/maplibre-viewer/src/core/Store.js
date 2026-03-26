const store = {
    previewedResourceId: null,
    mapLayerIds: [],
    basemapLayerId: [], //in order to keep map layers and sources loading logic modular we keep it as array
    overlayLayerIds: [],
}


export default store;