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
            const FOOTPRINT_NODE_ID = 'd6559931-9f52-11eb-96c4-020063fe0012';
            const INITIAL_GEOJSON_NODE_ID = '8c0da05b-29c4-4167-a4b0-e9374c7be7e8';

            self.coordinatesText = params.coordinatesText;
            self.resourceId = params.resourceId;
            self.isLoading = ko.observable(false);
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            console.log("Resource ID in summary step: ", self.resourceId);

            const generateFeatureId = () => {
                return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };

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
                        const z = parseFloat(parts[3]);
                        coordinates.push([x, y, z]);
                    }
                });

                if (coordinates.length === 0) {
                    return null;
                }

                if (coordinates.length > 0) {
                    const first = coordinates[0];
                    const last = coordinates[coordinates.length - 1];
                    if (first[0] !== last[0] || first[1] !== last[1] || first[2] !== last[2]) {
                        coordinates.push(first.slice());
                    }
                }

                return {
                    type: 'FeatureCollection',
                    features: [{
                        id: generateFeatureId(),
                        type: 'Feature',
                        properties: {
                            nodeId: FOOTPRINT_NODE_ID
                        },
                        geometry: {
                            type: 'Polygon',
                            coordinates: [coordinates]
                        }
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

            self._postTile = function (nodegroup_id, data) {
                const payload = {
                    tileid: '',
                    nodegroup_id: nodegroup_id,
                    parenttile_id: null,
                    resourceinstance_id: self.resourceId,
                    sortorder: 0,
                    tiles: {},
                    data: {}
                };

                payload.data[nodegroup_id] = data;

                return tileService.createOne(payload);
            }

            self.saveFootprint = async function() {
                self.isLoading(true);
                self.errorMessage(null);

                const geojsonValue = self.geojson();
                if (!geojsonValue) {
                    self.errorMessage('No GeoJSON data to save.');
                    self.isLoading(false);
                    return;
                }
                const geojsonStr = self.geojsonString();

                try {
                    await self._postTile(FOOTPRINT_NODE_ID, geojsonValue);
                    await self._postTile(INITIAL_GEOJSON_NODE_ID, geojsonStr);
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