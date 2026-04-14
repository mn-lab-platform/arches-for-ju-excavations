//always use reasignment eg. store.mapLayerIds = [...store.mapLayerIds, newLayerId];. Dont mutate state in place.
const store = {
    previewedResourceId: null,
    mapLayerIds: [],
    basemapLayerId: [], //in order to keep map layers and sources loading logic modular we keep it as array
    overlayLayerIds: [],
    searchFlyoutWidth: 0,
    menuPanelWidth: 0,
    flyoutOpen: false,
}


export default Object.seal(store);