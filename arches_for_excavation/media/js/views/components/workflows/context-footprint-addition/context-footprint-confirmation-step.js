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
            const CONTEXT_MEASURED_TEXT_NODE_ID = '1d9f2ee2-d024-4c4e-a668-48951c55af63';
            const TRENCH_FOOTPRINT_NODE_ID = '3a9f46c0-f538-11ea-ac6d-9fb7e90de197'; 
            const TRENCH_MEASURED_GEOJSON_NODE_ID = '6d6accec-cde3-4a6d-b10b-ea217a01c6e7';
            const TRENCH_MEASURED_TEXT_NODE_ID = '55693a63-9800-4439-8c64-34b72aa2d36b';

            self.inputData = ko.unwrap(params.coordinatesData);
            self.graphId = ko.unwrap(params.graphId);
            self.resourceId = ko.unwrap(params.resourceId);
                        
            let rawText = '';
            let rawIgnore = false;
            let projectedTextStr = '';

            if (self.inputData && typeof self.inputData === 'object') {
                rawText = self.inputData.text || '';
                rawIgnore = self.inputData.ignoreLastLine || false;
                projectedTextStr = self.inputData.projectedText || '';
            }

            self.coordinatesText = ko.observable(rawText);
            self.ignoreLastLine = ko.observable(rawIgnore);
            self.projectedText = ko.observable(projectedTextStr);

            self.finalCoordinatesText = ko.computed(() => {
                if (self.ignoreLastLine()) {
                    const lines = self.coordinatesText().split('\n');
                    return lines.slice(0, -1).join('\n');
                }
                return self.coordinatesText();
            });

            self.finalProjectedText = ko.computed(() => {
                if (self.ignoreLastLine() && self.projectedText()) {
                    const lines = self.projectedText().split('\n');
                    return lines.slice(0, -1).join('\n');
                }
                return self.projectedText();
            });

            self.isLoading = ko.observable(false);
            self.infoMessage = ko.observable(self.ignoreLastLine() ? 'The last line of the input will be ignored when generating the footprint.' : null);
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            
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

            self._getMeasuredTextNodeIdForGraphId = function(graphId) {
                switch(graphId) {
                    case CONTEXT_GRAPHID:
                        return CONTEXT_MEASURED_TEXT_NODE_ID;
                    case TRENCH_GRAPHID:
                        return TRENCH_MEASURED_TEXT_NODE_ID;
                    default:
                        throw new Error('Unknown graphId for measured text node: ' + graphId);
                }
            };

            self._createGeojsonFromText = function(text, targetNodeId) {
                if (!text) return null;

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

                if (coordinates.length === 0) return null;

                const first = coordinates[0];
                const last = coordinates[coordinates.length - 1];
                if (first[0] !== last[0] || first[1] !== last[1] || first[2] !== last[2]) {
                    coordinates.push(first.slice());
                }

                return {
                    type: 'FeatureCollection',
                    features: [{
                        id: generateFeatureId(),
                        type: 'Feature',
                        properties: {
                            nodeId: targetNodeId,
                        },
                        geometry: {
                            type: 'Polygon',
                            coordinates: [coordinates]
                        }
                    }]
                };
            };

            self.projectedGeojson = ko.computed(() => {
                const textToUse = self.finalProjectedText() || self.finalCoordinatesText(); 
                const nodeId = self._getFootprintNodeIdForGraphId(self.graphId);
                return self._createGeojsonFromText(textToUse, nodeId);
            });

            self.originalGeojson = ko.computed(() => {
                const textToUse = self.finalCoordinatesText();
                const nodeId = self._getMeasuredGeojsonNodeIdForGraphId(self.graphId);
                return self._createGeojsonFromText(textToUse, nodeId);
            });

            self.originalGeojsonString = ko.computed(() => {
                const geojsonObj = self.originalGeojson();
                return geojsonObj ? JSON.stringify(geojsonObj, null, 2) : '';
            });

            self.displayGeojsonString = ko.computed(() => {
                const geojsonObj = self.projectedGeojson(); 
                return geojsonObj ? JSON.stringify(geojsonObj, null, 2) : '';
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
            };

            self.saveFootprint = async function() {
                self.isLoading(true);
                self.infoMessage("Saving footprint data...");
                self.successMessage(null);
                self.errorMessage(null);
                
                const projectedVal = self.projectedGeojson();
                const projectedValStr = self.displayGeojsonString();
                const originalText = self.finalCoordinatesText();

                if (!projectedVal || !projectedValStr) {
                    self.errorMessage('No GeoJSON data available to save.');
                    self.isLoading(false);
                    return;
                }

                try {
                    await self._postTile(self._getFootprintNodeIdForGraphId(self.graphId), projectedVal);
                    
                    await self._postTile(self._getMeasuredGeojsonNodeIdForGraphId(self.graphId), projectedValStr);
                    
                    await self._postTile(self._getMeasuredTextNodeIdForGraphId(self.graphId), originalText);
                    
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