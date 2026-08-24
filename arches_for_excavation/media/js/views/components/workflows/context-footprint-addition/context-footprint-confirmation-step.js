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
                '2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c': { // Context
                    targetNodegroupId: '62ce85a9-150c-4485-8a7b-39f5c75b26ae',
                    parentNodegroupId: 'd45fc0db-a519-45be-911f-fe1e71153ed9', 
                    footprintNodeId: 'e2605398-9cbc-4ce0-bc88-46a96e8bcec8',
                    measurementGeojsonNodeId: 'a6830f40-33ea-4087-a1af-9fc6e7d0bd57',
                    measurementTextNodeId: 'be23ff04-3be2-443f-99a1-68534946e9cb',
                },
                'cc91f1ff-6ea8-422c-be14-b818660f66f8': { // Trench
                    targetNodegroupId: '13f0cf86-0f4f-4d8c-96dc-3daa5a58af44',
                    parentNodegroupId: null, 
                    footprintNodeId: 'ecd3d094-57fb-4dd0-80fe-bc17fc4ca7e7',
                    measurementGeojsonNodeId: 'ca3ca0ce-78df-4594-991c-47c3720cb1fd',
                    measurementTextNodeId: '39c128ad-df05-4395-8ccf-cf052ac90908',
                },
                'ac939663-80ce-43df-967d-42def45ef333': { // Special Find
                    targetNodegroupId: '99dab25d-d1ee-4336-bb11-bd73d3fd400c', 
                    parentNodegroupId: null, 
                    footprintNodeId: 'bbdde26b-edb0-4f14-ba56-11d9a4296800', 
                    measurementGeojsonNodeId: null,
                    measurementTextNodeId: 'd7baaa04-3f55-40ac-99ce-2c42bcf66d10', 
                }
            };

            self._graphConfig = function() {
                const config = GRAPH_CONFIG[self.graphId];
                if (!config) throw new Error('Unknown graphId: ' + self.graphId);
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
                    return self.coordinatesText().split('\n').slice(0, -1).join('\n');
                }
                return self.coordinatesText();
            });

            self.finalProjectedText = ko.computed(() => {
                if (self.ignoreLastLine() && self.projectedText()) {
                    return self.projectedText().split('\n').slice(0, -1).join('\n');
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
                        if (!isNaN(x) && !isNaN(y)) {
                            coordinates.push([x, y, z]);
                        }
                    }
                });

                if (coordinates.length === 0) return null;

                let geometry = {};

                if (coordinates.length === 1) {
                    geometry = { type: 'Point', coordinates: coordinates[0] };
                } else if (coordinates.length === 2) {
                    geometry = { type: 'LineString', coordinates: coordinates };
                } else {
                    const first = coordinates[0];
                    const last = coordinates[coordinates.length - 1];
                    
                    if (first[0] !== last[0] || first[1] !== last[1] || first[2] !== last[2]) {
                        coordinates.push(first.slice());
                    }

                    if (coordinates.length < 4) {
                        geometry = { type: 'LineString', coordinates: coordinates.slice(0, 2) };
                    } else {
                        geometry = { type: 'Polygon', coordinates: [coordinates] };
                    }
                }

                return {
                    type: 'FeatureCollection',
                    features: [{
                        id: generateFeatureId(),
                        type: 'Feature',
                        properties: { nodeId: targetNodeId },
                        geometry: geometry
                    }]
                };
            };

            self.projectedGeojson = ko.computed(() => {
                const textToUse = self.finalProjectedText() || self.finalCoordinatesText(); 
                return self._createGeojsonFromText(textToUse, self._graphConfig().footprintNodeId);
            });

            self.originalGeojson = ko.computed(() => {
                return self._createGeojsonFromText(self.finalCoordinatesText(), self._graphConfig().measurementGeojsonNodeId);
            });

            self.displayGeojsonString = ko.computed(() => {
                const geojsonObj = self.projectedGeojson(); 
                return geojsonObj ? JSON.stringify(geojsonObj, null, 2) : '';
            });

            self._tileIdFromResponse = function(response) {
                return response && (response.tileid || response.tileId || response.tile_id || (response.tile && response.tile.tileid));
            };

            self._findTileByNodegroup = async function(nodegroupId) {
                const response = await tileService.getAllForResource(self.resourceId);
                const rootTiles = Array.isArray(response) ? response : (response.tiles || []);
                
                const searchTree = (tilesArray) => {
                    if (!tilesArray || !Array.isArray(tilesArray)) return null;
                    
                    for (const tile of tilesArray) {
                        if (String(tile.nodegroup) === nodegroupId || String(tile.nodegroup_id) === nodegroupId) {
                            return tile;
                        }
                        if (tile.tiles && typeof tile.tiles === 'object') {
                            for (const key in tile.tiles) {
                                const found = searchTree(tile.tiles[key]);
                                if (found) return found;
                            }
                        }
                    }
                    return null;
                };

                return searchTree(rootTiles);
            };

            self._getOrCreateParentTile = async function(nodegroupId) {
                const existing = await self._findTileByNodegroup(nodegroupId);
                if (existing) return existing.tileid;

                const payload = {
                    tileid: '',
                    nodegroup_id: nodegroupId,
                    parenttile_id: null,
                    resourceinstance_id: self.resourceId,
                    sortorder: 0,
                    tiles: {},
                    data: {},
                };
                const created = await tileService.createOne(payload);
                return self._tileIdFromResponse(created);
            };

            self._postGroupedFootprintTile = async function(config, projectedVal, originalGeojson, originalText) {
                const buildCleanPayload = (existing, nodegroupId, parentTileId) => {
                    return {
                        tileid: existing ? existing.tileid : '',
                        nodegroup_id: nodegroupId,
                        parenttile_id: parentTileId || null,
                        resourceinstance_id: self.resourceId,
                        sortorder: existing ? (existing.sortorder || 0) : 0,
                        tiles: existing ? (existing.tiles || {}) : {},
                        data: existing ? (existing.data || {}) : {}
                    };
                };

                let parentTileId = null;
                if (config.parentNodegroupId) {
                    parentTileId = await self._getOrCreateParentTile(config.parentNodegroupId);
                }

                const existingTile = await self._findTileByNodegroup(config.targetNodegroupId);
                const payload = buildCleanPayload(existingTile, config.targetNodegroupId, parentTileId);

                if (config.footprintNodeId) {
                    payload.data[config.footprintNodeId] = projectedVal;
                }
                if (config.measurementGeojsonNodeId) {
                    payload.data[config.measurementGeojsonNodeId] = JSON.stringify(originalGeojson); 
                }
                if (config.measurementTextNodeId) {
                    payload.data[config.measurementTextNodeId] = originalText;
                }
                
                return existingTile ? await tileService.updateOne(payload) : await tileService.createOne(payload);
            };

            self.saveFootprint = async function() {
                self.isLoading(true);
                self.infoMessage("Saving footprint data...");
                self.successMessage(null);
                self.errorMessage(null);
                
                const projectedVal = self.projectedGeojson();
                const originalGeojson = self.originalGeojson(); 
                const originalText = self.finalCoordinatesText();

                if (!projectedVal || !originalGeojson) {
                    self.errorMessage('No GeoJSON data available to save.');
                    self.isLoading(false);
                    return;
                }

                try {
                    await self._postGroupedFootprintTile(self._graphConfig(), projectedVal, originalGeojson, originalText);
                    
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
                    if (e && e.message) {
                        self.errorMessage(e.message);
                    } else {
                        self.errorMessage('Failed to save footprint data due to an unknown error.');
                    }
                    
                    self.infoMessage(null);
                } finally {
                    self.isLoading(false);
                }
            };
            
        },
        template: template
    });
});