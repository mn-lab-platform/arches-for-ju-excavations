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

            const GRAPH_CONFIG = {
                'd6559924-9f52-11eb-96c4-020063fe0012': {
                    legacy: true,
                    footprintNodeId: 'd6559931-9f52-11eb-96c4-020063fe0012',
                    measurementGeojsonNodeId: 'bd290f65-b2fe-4de2-a9b6-fa056036facb',
                    measurementTextNodeId: '1d9f2ee2-d024-4c4e-a668-48951c55af63',
                },
                '9d82972a-f537-11ea-ac6d-9fb7e90de197': {
                    legacy: true,
                    footprintNodeId: '3a9f46c0-f538-11ea-ac6d-9fb7e90de197',
                    measurementGeojsonNodeId: '6d6accec-cde3-4a6d-b10b-ea217a01c6e7',
                    measurementTextNodeId: '55693a63-9800-4439-8c64-34b72aa2d36b',
                },
                '2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c': {
                    nodegroupId: '62ce85a9-150c-4485-8a7b-39f5c75b26ae',
                    parentNodegroupId: 'd45fc0db-a519-45be-911f-fe1e71153ed9',
                    footprintNodeId: 'e2605398-9cbc-4ce0-bc88-46a96e8bcec8',
                    measurementGeojsonNodeId: 'a9b48ce5-7590-4972-8f09-38c16294592d',
                    measurementTextNodeId: '0fc80919-a200-4cfd-981b-27c901a4f5df',
                },
                'cc91f1ff-6ea8-422c-be14-b818660f66f8': {
                    nodegroupId: '13f0cf86-0f4f-4d8c-96dc-3daa5a58af44',
                    footprintNodeId: 'ecd3d094-57fb-4dd0-80fe-bc17fc4ca7e7',
                    measurementGeojsonNodeId: 'ca3ca0ce-78df-4594-991c-47c3720cb1fd',
                    measurementTextNodeId: '39c128ad-df05-4395-8ccf-cf052ac90908',
                },
            };

            self._graphConfig = function() {
                const config = GRAPH_CONFIG[self.graphId];
                if (!config) {
                    throw new Error('Unknown graphId: ' + self.graphId);
                }
                return config;
            };

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
                return GRAPH_CONFIG[graphId].footprintNodeId;
            };

            self._getMeasuredGeojsonNodeIdForGraphId = function(graphId) {
                return GRAPH_CONFIG[graphId].measurementGeojsonNodeId;
            };

            self._getMeasuredTextNodeIdForGraphId = function(graphId) {
                return GRAPH_CONFIG[graphId].measurementTextNodeId;
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

            self._tileIdFromResponse = function(response) {
                return response && (response.tileid || response.tileId || response.tile_id || (response.tile && response.tile.tileid));
            };

            self._postTile = function (nodegroupId, data, parenttileId) {
                const payload = {
                    tileid: '',
                    nodegroup_id: nodegroupId,
                    parenttile_id: parenttileId || null,
                    resourceinstance_id: self.resourceId,
                    sortorder: 0,
                    tiles: {},
                    data: {}
                };

                payload.data[nodegroupId] = data;

                return tileService.createOne(payload);
            };

            self._findTileByNodegroup = async function(nodegroupId) {
                const tiles = await tileService.getAllForResource(self.resourceId);
                return (tiles || []).find(tile => String(tile.nodegroup_id) === nodegroupId) || null;
            };

            self._getOrCreateParentTile = async function(nodegroupId) {
                const existing = await self._findTileByNodegroup(nodegroupId);
                if (existing) {
                    return existing.tileid;
                }

                const created = await tileService.createOne({
                    tileid: '',
                    nodegroup_id: nodegroupId,
                    parenttile_id: null,
                    resourceinstance_id: self.resourceId,
                    sortorder: 0,
                    tiles: {},
                    data: {},
                });
                return self._tileIdFromResponse(created);
            };

            self._postGroupedFootprintTile = async function(config, projectedVal, projectedValStr, originalText) {
                const parenttileId = config.parentNodegroupId
                    ? await self._getOrCreateParentTile(config.parentNodegroupId)
                    : null;

                const payload = {
                    tileid: '',
                    nodegroup_id: config.nodegroupId,
                    parenttile_id: parenttileId || null,
                    resourceinstance_id: self.resourceId,
                    sortorder: 0,
                    tiles: {},
                    data: {},
                };

                payload.data[config.footprintNodeId] = projectedVal;
                payload.data[config.measurementGeojsonNodeId] = projectedValStr;
                payload.data[config.measurementTextNodeId] = originalText;

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
                    const config = self._graphConfig();
                    if (config.legacy) {
                        await self._postTile(config.footprintNodeId, projectedVal);
                        await self._postTile(config.measurementGeojsonNodeId, projectedValStr);
                        await self._postTile(config.measurementTextNodeId, originalText);
                    } else {
                        await self._postGroupedFootprintTile(config, projectedVal, projectedValStr, originalText);
                    }
                    
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