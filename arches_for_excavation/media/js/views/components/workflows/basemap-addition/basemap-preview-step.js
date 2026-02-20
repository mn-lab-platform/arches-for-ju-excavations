define([
    'knockout',
    'arches',
    'maplibre-gl',
    'templates/views/components/workflows/basemap-addition/basemap-preview-step.htm'
], function(ko, arches, maplibreGl, template) {

    function viewModel(params) {
        const self = this;
        self.basemapInfo = ko.unwrap(params.basemapInfo);
        self.basemapId = self.basemapInfo.basemap_id;
        self.centerX = self.basemapInfo.centerx;
        self.centerY = self.basemapInfo.centery;
        self.bounds = self.basemapInfo.bounds;
        console.log('Basemap Preview Step params:', params.basemapInfo);

        let map = new maplibreGl.Map({
            container: 'map-preview',
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: [self.centerX, self.centerY],
            zoom: 17
        });

        map.on('load', () => {
            map.addSource('basemap-preview-source', {
                type: 'raster',
                tiles: [`/api/titiler/tiles/${self.basemapId}/{z}/{x}/{y}`],
                tileSize: 512,
                bounds: self.bounds
            });

            map.addLayer({
                id: 'basemap-preview-layer',
                source: 'basemap-preview-source',
                type: 'raster',
                minzoom: 0
            })
        })

    }

    return ko.components.register('basemap-preview-step', {
        viewModel: viewModel,
        template: template
    });
});