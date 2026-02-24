define([
    'knockout',
    'arches',
    '../../../../services/tile-service',
    'templates/views/components/workflows/context-footprint-addition/context-footprint-confirmation-step.htm',
], function(ko, arches, tileServiceModule, template) {
    return ko.components.register('context-footprint-confirmation-step', {
        viewModel: function(params) {
            const self = this;
            
            const tileService = tileServiceModule.default || tileServiceModule;

            const CONTEXT_GRAPHID = 'd6559924-9f52-11eb-96c4-020063fe0012';
            const TRENCH_GRAPHID= '9d82972a-f537-11ea-ac6d-9fb7e90de197';

            const CONTEXT_FOOTPRINT_NODE_ID = 'd6559931-9f52-11eb-96c4-020063fe0012';
            const CONTEXT_MEASURED_GEOJSON_NODE_ID = 'bd290f65-b2fe-4de2-a9b6-fa056036facb';
            const TRENCH_FOOTPRINT_NODE_ID = '3a9f46c0-f538-11ea-ac6d-9fb7e90de197';
            const TRENCH_MEASURED_GEOJSON_NODE_ID = '6d6accec-cde3-4a6d-b10b-ea217a01c6e7';

            self.inputData = ko.unwrap(params.coordinatesData);
            self.graphId = ko.unwrap(params.graphId);
            self.resourceId = ko.unwrap(params.resourceId);

            console.log('Received coordinatesData:', self.inputData);
            console.log('Received graphId:', self.graphId);
            console.log('Received resourceId:', self.resourceId);
                        
            let rawText = '';
            let rawIgnore = false;

            if (self.inputData && typeof self.inputData === 'object') {
                rawText = self.inputData.text || '';
                rawIgnore = self.inputData.ignoreLastLine || false;
            }

            self.coordinatesText = ko.observable(rawText);
            self.ignoreLastLine = ko.observable(rawIgnore);

            self.finalCoordinatesText = ko.computed(() => {
                if (self.ignoreLastLine()) {
                    const lines = self.coordinatesText().split('\n');
                    return lines.slice(0, -1).join('\n');
                }
                return self.coordinatesText();
            });

            self.isLoading = ko.observable(false);
            self.infoMessage = ko.observable(self.ignoreLastLine() ? 'The last line of the input will be ignored when generating the footprint.' : null);
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            
            // Initialize footprintSaved from existing step value if present
            const existingValue = ko.unwrap(params.value) || {};
            self.footprintSaved = ko.observable(existingValue.footprintSaved || false);

            const generateFeatureId = () => {
                return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };

            self._getFootprintNodeIdForGraphId = function(graphId) {
                switch(graphId) {
                    case CONTEXT_GRAPHID:
                        return CONTEXT_FOOTPRINT_NODE_ID;
                    case TRENCH_GRAPHID:
                        return TRENCH_FOOTPRINT_NODE_ID;
                    default:
                        throw new Error('Unknown graphId: ' + graphId);
                }
            };

            self._getMeasuredGeojsonNodeIdForGraphId = function(graphId) {
                switch(graphId) {
                    case CONTEXT_GRAPHID:
                        return CONTEXT_MEASURED_GEOJSON_NODE_ID;
                    case TRENCH_GRAPHID:
                        return TRENCH_MEASURED_GEOJSON_NODE_ID;
                    default:
                        throw new Error('Unknown graphId: ' + graphId);
                }
            };

            self.geojson = ko.computed(() => {
                const text = self.finalCoordinatesText();
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
                            nodeId: self._getFootprintNodeIdForGraphId(self.graphId),
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
                self.infoMessage("Saving footprint data...");
                self.successMessage(null);
                self.errorMessage(null);
                const geojsonValue = self.geojson();
                if (!geojsonValue) {
                    self.errorMessage('No GeoJSON data to save.');
                    self.isLoading(false);
                    return;
                }
                const geojsonStr = self.geojsonString();

                try {
                    await self._postTile(self._getFootprintNodeIdForGraphId(self.graphId), geojsonValue);
                    await self._postTile(self._getMeasuredGeojsonNodeIdForGraphId(self.graphId), geojsonStr);
                    
                    self.infoMessage(null);
                    self.successMessage('Footprint data saved successfully.');
                    
                    self.footprintSaved(true);
                    if (params.value) {
                        params.value({
                            footprintSaved: true,
                            ...ko.unwrap(params.value)
                        });
                    }

                } catch (e) {
                    console.error('Failed to save footprint tile:', e);
                    self.errorMessage('Failed to save footprint data.');
                    self.infoMessage(null);
                } finally {
                    self.isLoading(false);
                }
            };
            
        },
        template: template
    });
});