//always use reasignment eg. store.mapLayerIds = [...store.mapLayerIds, newLayerId];. Dont mutate state in place.
const store = {
    menuPanelWidth: 0,
    searchFlyoutWidth: 0,

    basemapLayerId: null,
}


export default Object.seal(store);