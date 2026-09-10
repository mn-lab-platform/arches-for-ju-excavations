define([
    'knockout',
    '../../../../services/tile-service',
    'templates/views/components/workflows/context-footprint-addition/context-footprint-confirmation-step.htm',
], function(ko, tileServiceModule, template) {
    return ko.components.register('context-footprint-confirmation-step', {
        viewModel: function(params) {
            const self = this;
            const tileService = tileServiceModule.default || tileServiceModule;

            self.inputData = ko.unwrap(params.coordinatesData);
            self.graphId = ko.unwrap(params.graphId);
            self.resourceId = ko.unwrap(params.resourceId);
            self.crsId = ko.unwrap(params.crsId);
            self.overwriteNodeIds = ko.unwrap(params.overwriteNodeIds) || new Set();

            const GRAPH_CONFIG = {
                '2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c': { // Context
                    targetNodegroupId: '62ce85a9-150c-4485-8a7b-39f5c75b26ae',
                    measurementNodegroupId: 'b66a8c3c-bdca-4ca9-b86f-4028bbfa9210',
                    parentNodegroupId: 'd45fc0db-a519-45be-911f-fe1e71153ed9', 
                    footprintNodeId: 'e2605398-9cbc-4ce0-bc88-46a96e8bcec8',
                    measurementGeojsonNodeId: 'dc38a61e-47d9-49e5-8956-a864fb87a830',
                    measurementTextNodeId: '771ad351-f735-4de5-baab-2d726c033d85',
                    crsNodeId: '659ce2b7-bee6-48f0-8cbb-21949b69bf37',
                },
                'cc91f1ff-6ea8-422c-be14-b818660f66f8': { // Trench
                    targetNodegroupId: '13f0cf86-0f4f-4d8c-96dc-3daa5a58af44',
                    measurementNodegroupId: 'b7b3f2e1-1872-488a-971a-81d0cf9fb2f8',
                    parentNodegroupId: null, 
                    footprintNodeId: 'ecd3d094-57fb-4dd0-80fe-bc17fc4ca7e7',
                    measurementGeojsonNodeId: 'dbf3e29b-669d-4db7-8d3a-26aa0a257813',
                    measurementTextNodeId: 'd30b4a32-7632-4147-a6e7-b1b7ad42b85c',
                    crsNodeId: 'bdaad0d7-fa36-4920-b506-bd06c2c58891',
                },
                'ac939663-80ce-43df-967d-42def45ef333': { // Special Find
                    targetNodegroupId: '99dab25d-d1ee-4336-bb11-bd73d3fd400c', 
                    parentNodegroupId: null, 
                    footprintNodeId: 'bbdde26b-edb0-4f14-ba56-11d9a4296800', 
                    measurementGeojsonNodeId: null,
                    measurementTextNodeId: 'd7baaa04-3f55-40ac-99ce-2c42bcf66d10', 
                    crsNodeId: '3ac2698f-dcf4-46ad-adde-ce1f4ed4b7fe',
                }
            };

            self._graphConfig = function() {
                const config = GRAPH_CONFIG[self.graphId];
                if (!config) throw new Error('Unknown graphId: ' + self.graphId);
                return config;
            };
                        
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

            const withoutLastNonEmptyLine = (text) => {
                const lines = (text || '').split('\n');
                for (let i = lines.length - 1; i >= 0; i--) {
                    if (lines[i].trim().length > 0) {
                        lines.splice(i, 1);
                        break;
                    }
                }
                return lines.join('\n');
            };

            self.finalCoordinatesText = ko.computed(() => {
                if (self.ignoreLastLine()) {
                    return withoutLastNonEmptyLine(self.coordinatesText());
                }
                return self.coordinatesText();
            });

            self.finalProjectedText = ko.computed(() => {
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
                    if (parts.length === 3 || parts.length === 4) {
                        const coordinateStart = parts.length === 4 ? 1 : 0;
                        const x = parseFloat(parts[coordinateStart]);
                        const y = parseFloat(parts[coordinateStart + 1]);
                        const z = parseFloat(parts[coordinateStart + 2]);
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

            self._postGroupedFootprintTile = async function(config, projectedGeojson , originalText) {
                const overwriteAll = self.overwriteNodeIds.size === 0;
                const shouldOverwrite = (nodeId) => overwriteAll || self.overwriteNodeIds.has(nodeId);
                const crsResourceId = typeof self.crsId === 'string' && self.crsId.trim()
                    ? self.crsId
                    : null;
                const overwriteFootprint = shouldOverwrite(config.footprintNodeId);
                const overwriteGeojson = config.measurementGeojsonNodeId
                    && shouldOverwrite(config.measurementGeojsonNodeId);
                const overwriteText = config.measurementTextNodeId
                    && shouldOverwrite(config.measurementTextNodeId);
                const overwriteMeasurement = overwriteGeojson || overwriteText;

                const applyCrsValue = (data) => {
                    if (!config.crsNodeId) return;

                    if (crsResourceId) {
                        data[config.crsNodeId] = [{
                            resourceId: crsResourceId,
                            resourceXresourceId: ''
                        }];
                    } else {
                        delete data[config.crsNodeId];
                    }
                };

                const buildPayload = (existing, nodegroupId, parentTileId, data) => {
                    return {
                        tileid: existing ? existing.tileid : '',
                        nodegroup_id: nodegroupId,
                        parenttile_id: parentTileId || null,
                        resourceinstance_id: self.resourceId,
                        sortorder: existing ? (existing.sortorder || 0) : 0,
                        tiles: existing ? (existing.tiles || {}) : {},
                        data: data || {}
                    };
                };

                let parentTileId = null;
                if (config.parentNodegroupId) {
                    parentTileId = await self._getOrCreateParentTile(config.parentNodegroupId);
                }

                const existingTile = await self._findTileByNodegroup(config.targetNodegroupId);
                const targetData = existingTile ? { ...(existingTile.data || {}) } : {};

                if (config.footprintNodeId && overwriteFootprint) {
                    targetData[config.footprintNodeId] = projectedGeojson;
                }

                if (config.measurementNodegroupId) {
                    if (overwriteGeojson) delete targetData[config.measurementGeojsonNodeId];
                    if (overwriteText) delete targetData[config.measurementTextNodeId];
                } else {
                    if (config.measurementGeojsonNodeId && overwriteGeojson) {
                        targetData[config.measurementGeojsonNodeId] = JSON.stringify(projectedGeojson);
                    }
                    if (config.measurementTextNodeId && overwriteText) {
                        targetData[config.measurementTextNodeId] = originalText;
                    }
                }

                if (!config.measurementNodegroupId && overwriteMeasurement) {
                    applyCrsValue(targetData);
                }

                const shouldSaveTarget = overwriteFootprint
                    || (!config.measurementNodegroupId && overwriteMeasurement)
                    || (!existingTile && overwriteMeasurement);
                let targetResponse = null;
                if (shouldSaveTarget) {
                    const targetPayload = buildPayload(
                        existingTile,
                        config.targetNodegroupId,
                        parentTileId,
                        targetData,
                    );
                    targetResponse = existingTile
                        ? await tileService.updateOne(targetPayload)
                        : await tileService.createOne(targetPayload);
                }
                const targetTileId = existingTile
                    ? existingTile.tileid
                    : self._tileIdFromResponse(targetResponse);

                if (!targetTileId && !shouldSaveTarget) return null;

                if (!targetTileId) {
                    throw new Error('Unable to determine the saved spatial extent tile ID.');
                }

                if (config.measurementNodegroupId) {
                    if (!overwriteMeasurement) return targetResponse;

                    const existingMeasurementTile = await self._findTileByNodegroup(
                        config.measurementNodegroupId,
                    );
                    const measurementData = existingMeasurementTile
                        ? { ...(existingMeasurementTile.data || {}) }
                        : {};

                    if (overwriteGeojson) {
                        measurementData[config.measurementGeojsonNodeId] = JSON.stringify(projectedGeojson);
                    }
                    if (overwriteText) {
                        measurementData[config.measurementTextNodeId] = originalText;
                    }
                    applyCrsValue(measurementData);

                    const measurementPayload = buildPayload(
                        existingMeasurementTile,
                        config.measurementNodegroupId,
                        targetTileId,
                        measurementData,
                    );

                    return existingMeasurementTile
                        ? tileService.updateOne(measurementPayload)
                        : tileService.createOne(measurementPayload);
                }

                return targetResponse;
            };

            self.saveFootprint = async function() {
                self.isLoading(true);
                self.infoMessage("Saving footprint data...");
                self.successMessage(null);
                self.errorMessage(null);
                
                const projectedGeojson = self.projectedGeojson();
                const originalText = self.finalCoordinatesText();

                if (!projectedGeojson) {
                    self.errorMessage('No GeoJSON data available to save.');
                    self.isLoading(false);
                    return;
                }

                try {
                    await self._postGroupedFootprintTile(self._graphConfig(), projectedGeojson, originalText);
                    
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
                    const errorMessage = e && typeof e.message === 'string' && e.message.trim()
                        ? e.message
                        : e && typeof e.title === 'string' && e.title.trim()
                            ? e.title
                            : 'Failed to save footprint data.';
                    self.errorMessage(errorMessage);
                    
                    self.infoMessage(null);
                } finally {
                    self.isLoading(false);
                }
            };
            
        },
        template: template
    });
});