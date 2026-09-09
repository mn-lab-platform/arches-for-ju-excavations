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

            self.coordDataNodegroups = {
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

            self.validationStatuses = null;

            tileService.getAllForResource(self.resourceId)
                .then(response => {
                    const tiles = response.tiles;
                    const nodegroups = self.coordDataNodegroups[self.graphId];

                    const getTileValue = (nodegroupId) => nodegroupId ? tiles.find(tile => tile.data?.[nodegroupId])?.data[nodegroupId] : null;

                    self.validationStatuses = {
                        footprint: self._validateGeoJson(getTileValue(nodegroups.footprint)),
                        txtMeasurement: self._validateTxtMeasurement(getTileValue(nodegroups.txtMeasurement)),
                        geojsonMeasurement: self._validateGeoJson(getTileValue(nodegroups.geojsonMeasurement))
                    }

                    console.log('Coordinate Data Statuses:', self.validationStatuses);
                })

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
                
                const lines = tileValue.split('\n').map(l => l.trim()).filter(Boolean);
                if (!lines.length) return 'empty';

                const isValid = lines.every(line => {
                    const nums = line.split(/\s+/).slice(-3).map(Number);
                    return nums.length === 3 && nums.every(n => !isNaN(n));
                });
                
                return isValid ? 'valid' : 'malformed';
            };
        },
        template: template
    });
});