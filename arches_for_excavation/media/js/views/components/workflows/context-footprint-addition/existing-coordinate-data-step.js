define([
    'knockout',
    'templates/views/components/workflows/context-footprint-addition/existing-coordinate-data-step.htm',
    'services/tile-service',
], function(ko, template, tileServiceModule) {
    return ko.components.register('existing-coordinate-data-step', {
        viewModel: function(params) {
            const self = this;
            const tileService = tileServiceModule.default || tileServiceModule;
            
            self.value = params.value;
            self.resourceId = params.resourceId;
            self.graphId = params.graphId;

            self.TRENCH_GRAPH_ID = 'cc91f1ff-6ea8-422c-be14-b818660f66f8';
            self.CONTEXT_GRAPH_ID = '2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c';
            self.SPECIAL_FIND_GRAPH_ID = 'ac939663-80ce-43df-967d-42def45ef333';

            self.coordDataNodegroupIds = {
                [self.TRENCH_GRAPH_ID]: {
                    footprint: 'ecd3d094-57fb-4dd0-80fe-bc17fc4ca7e7',
                    txtMeasurement: 'd30b4a32-7632-4147-a6e7-b1b7ad42b85c',
                    geojsonMeasurement: 'dbf3e29b-669d-4db7-8d3a-26aa0a257813'
                },
                [self.CONTEXT_GRAPH_ID]: {
                    footprint: 'e2605398-9cbc-4ce0-bc88-46a96e8bcec8',
                    txtMeasurement: '771ad351-f735-4de5-baab-2d726c033d85',
                    geojsonMeasurement: 'dc38a61e-47d9-49e5-8956-a864fb87a830'
                },
                [self.SPECIAL_FIND_GRAPH_ID]: {
                    footprint: 'bbdde26b-edb0-4f14-ba56-11d9a4296800',
                    txtMeasurement: 'd7baaa04-3f55-40ac-99ce-2c42bcf66d10',
                    geojsonMeasurement: null
                }
            };

            self.loading = ko.observable(true);
            self.coordCardInfo = ko.observableArray([]);
            self.activeNodegroupId = ko.observable(null);
            self.displayContent = ko.observable('');

            const initialValue = ko.unwrap(self.value);
            const initialSelection = initialValue instanceof Set
                ? Array.from(initialValue)
                : Array.isArray(initialValue) ? initialValue : [];
            self.selectedOverwrites = ko.observableArray(initialSelection);

            self.selectedOverwrites.subscribe(function(selectedIds) {
                self.value(new Set(selectedIds));
            });

            self.setDisplayContent = function(item) {
                if (!item) {
                    self.activeNodegroupId(null);
                    return self.displayContent('');
                }

                self.activeNodegroupId(item.nodegroupId);

                if (typeof item.value === 'object' && item.value !== null) {
                    return self.displayContent(JSON.stringify(item.value, null, 2));
                }

                const formatted = String(item.value)
                    .replace(/\\+r\\+n|\\+n/g, '\n')
                    .replace(/\\"/g, '"');

                self.displayContent(formatted);
            };

            tileService.getAllForResource(self.resourceId)
                .then(response => {
                    const tiles = response.tiles;
                    const nodegroupIds = self.coordDataNodegroupIds[self.graphId];

                    const getTileValueAndLabel = (nodegroupId) => {
                        const tile = tiles.find(tile => tile.data?.[nodegroupId]);
                        if (!tile) return { value: null, label: 'Undefined' };
                        const value = tile.data[nodegroupId];
                        const label = tile.display_values?.find(display_value => display_value.nodeid === nodegroupId)?.label || 'Undefined';
                        return { value, label };
                    };

                    const footprintTile = getTileValueAndLabel(nodegroupIds.footprint);
                    const txtMeasurementTile = getTileValueAndLabel(nodegroupIds.txtMeasurement);
                    const geojsonMeasurementTile = getTileValueAndLabel(nodegroupIds.geojsonMeasurement);

                    if (self._tileIsNotEmpty(footprintTile)) self.coordCardInfo.push(
                        {
                            nodegroupId: nodegroupIds.footprint,
                            label: footprintTile.label,
                            value: footprintTile.value,
                            status: self._validateGeoJson(footprintTile.value)
                        }
                    );

                    if (self._tileIsNotEmpty(txtMeasurementTile)) self.coordCardInfo.push(
                        {
                            nodegroupId: nodegroupIds.txtMeasurement,
                            label: txtMeasurementTile.label,
                            value: txtMeasurementTile.value,
                            status: self._validateTxtMeasurement(txtMeasurementTile.value)
                        }
                    );

                    if (self._tileIsNotEmpty(geojsonMeasurementTile)) self.coordCardInfo.push(
                        {
                            nodegroupId: nodegroupIds.geojsonMeasurement,
                            label: geojsonMeasurementTile.label,
                            value: geojsonMeasurementTile.value,
                            status: self._validateGeoJson(geojsonMeasurementTile.value)
                        }
                    );

                    if (self.coordCardInfo().length === 0) {
                        self.value(new Set());
                    }

                    if (self.coordCardInfo().length > 0) {
                        self.setDisplayContent(self.coordCardInfo()[0]);
                    }
                })
                .finally(() => {
                    self.loading(false);
                });

            self._tileIsNotEmpty = function(tile) {
                return tile && tile.value !== null && tile.label !== 'Undefined';
            };

            self._parseGeoJsonValue = function(value) {
                if (!value || typeof value === 'object') return value || null;
                try {
                    let str = String(value).trim().replace(/\\"/g, '"').replace(/'/g, '"').replace(/^"\{/, '{').replace(/\}"$/, '}');
                    let parsed = JSON.parse(str);
                    
                    while (typeof parsed === 'string') parsed = JSON.parse(parsed);
                    return parsed;
                } catch {
                    return false;
                }
            };

            self._validateGeoJson = function(tileValue) {
                const geojson = self._parseGeoJsonValue(tileValue);
                
                if (geojson === false) return 'malformed';
                if (!geojson) return 'empty';
                
                return (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features))
                    ? (geojson.features.length > 0 ? 'valid' : 'empty')
                    : 'malformed';
            };

            self._validateTxtMeasurement = function(tileValue) {
                if (!tileValue || typeof tileValue !== 'string') return tileValue ? 'malformed' : 'empty';
                
                const cleanedValue = String(tileValue).replace(/\\+r\\+n|\\+n/g, '\n');
                
                const lines = cleanedValue.split('\n').map(l => l.trim()).filter(Boolean);
                if (!lines.length) return 'empty';

                const strictNumberRegex = /^-?\d*\.?\d+$/;

                const isValid = lines.every(line => {
                    const tokens = line.split(/\s+/);
                    
                    if (tokens.length < 3) return false;

                    const coords = tokens.slice(-3);
                    
                    return coords.every(str => strictNumberRegex.test(str));
                });
                
                return isValid ? 'valid' : 'malformed';
            };
        },
        template: template
    });
});