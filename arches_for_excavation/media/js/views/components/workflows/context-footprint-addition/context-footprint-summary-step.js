define([
    'knockout',
    'arches',
    '../../../../services/tile-service',
    'templates/views/components/workflows/context-footprint-addition/context-footprint-summary-step.htm',
], function(ko, arches, tileServiceModule, template) {
    return ko.components.register('context-footprint-summary-step', {
        viewModel: function(params) {
            const self = this;
            
            const tileService = tileServiceModule.default || tileServiceModule;
            const FOOTPRINT_NODEGROUP_ID = 'd6559931-9f52-11eb-96c4-020063fe0012';

            self.coordinatesText = params.coordinatesText;
            self.resourceId = params.resourceId;
            self.isLoading = ko.observable(false);
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            console.log("Resource ID in summary step: ", self.resourceId);

            self.geojson = ko.computed(() => {
                const text = self.coordinatesText;
                if (!text) {
                    return null;
                }

                const lines = text.trim().split('\n');
                const coordinates = [];
                
                lines.forEach(line => {
                    const parts = line.trim().split(/\s+/);
                    if (parts.length >= 4) {
                        const x = parseFloat(parts[1]);
                        const y = parseFloat(parts[2]);
                        coordinates.push([x, y]);
                    }
                });

                if (coordinates.length === 0) {
                    return null;
                }

                if (coordinates.length > 0) {
                    const first = coordinates[0];
                    const last = coordinates[coordinates.length - 1];
                    if (first[0] !== last[0] || first[1] !== last[1]) {
                        coordinates.push([first[0], first[1]]);
                    }
                }

                return {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [coordinates]
                        },
                        properties: {}
                    }]
                };
            });

            self.geojsonString = ko.computed(() => {
                const geojsonObj = self.geojson();
                if (geojsonObj) {
                    return JSON.stringify(geojsonObj, null, 2);
                }
                return '';
            });

            self.saveFootprint = async function() {
                self.isLoading(true);
                self.errorMessage(null);

                const geojsonValue = self.geojson();
                if (!geojsonValue) {
                    self.errorMessage('No GeoJSON data to save.');
                    self.isLoading(false);
                    return;
                }

                const payload = {
                    tileid: '',
                    nodegroup_id: FOOTPRINT_NODEGROUP_ID,
                    parenttile_id: null,
                    resourceinstance_id: self.resourceId,
                    sortorder: 0,
                    tiles: {},
                    data: {}
                };
                payload.data[FOOTPRINT_NODEGROUP_ID] = geojsonValue;

                try {
                    await tileService.createOne(payload);
                    self.successMessage('Footprint data saved successfully.');
                } catch (e) {
                    console.error('Failed to save footprint tile:', e);
                    self.errorMessage('Failed to save footprint data.');
                } finally {
                    self.isLoading(false);
                }
            };
            
        },
        template: template
    });
});