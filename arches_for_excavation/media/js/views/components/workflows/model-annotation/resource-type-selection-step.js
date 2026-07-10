define([
    'knockout',
    'arches',
    'templates/views/components/workflows/model-annotation/resource-type-selection-step.htm',
    '../../../../services/tile-service',
    'views/components/workflows/universal/components/resource-type-picker'
], function(ko, arches, template, tileServiceModule, resourceInstanceSelectViewModel) {
    function viewModel(params) {
        const self = this;
        const tileService = tileServiceModule.default || tileServiceModule;
        self.value = params.value; 
        self.MODES = {
            annotation: 'annotation',
            resource: 'resource'
        }

        self.ANNOTATION_NAME_NODE_ID = 'e202ea9f-e0a9-42a3-85a1-6380bc1115b9';
        self.ANNOTATION_DESCRIPTION_NODE_ID = 'e4c6d7e5-317d-4d04-9936-e4ad1886ba05';
        self.ANNOTATION_COLOR_NODE_ID = 'd691d389-6259-4765-b2d3-7f7f98057101';
        self.ANNOTATION_GEOMETRY_NODE_ID = '4277f805-09e7-4db1-bf26-49c09132c720';
        self.ANNOTATION_RELATED_NODE_ID = '5266b89c-72f7-41cf-a7f4-cde1df9efef9';

        self.mode = params.mode;
        
        self.annotationData = params.annotationData;
        self.modelResourceId = params.modelResourceId;
        self.annotationId = null;

        self.targetGraphId = ko.observable(self.value());
        
        self.infoMessage = ko.observable(null);
        self.isLoading = ko.observable(false);
        self.errorMessage = ko.observable(null);
        
        self.annotationSaved = ko.observable(false);

        self._postTile = function(nodegroupId, data, resourceId, tileId='') {
            const payload = {
                tileid: tileId,
                nodegroup_id: nodegroupId,
                parenttile_id: null,
                resourceinstance_id: resourceId,
                sortorder: 0,
                tiles: {},
                data: data
            };

            if (payload.tileid) {
                return tileService.updateOne(payload);
            }

            return tileService.createOne(payload);
        };

        self._saveAnnotation = function() {
            if (self.annotationData && self.annotationData.isSavedToDatabase) {
                console.log("Annotation already saved to DB. Skipping tile creation to prevent duplicates.");
                self.annotationId = self.annotationData.id;
                self.annotationSaved(true);
                self.isLoading(false);
                return Promise.resolve();
            }

            self.isLoading(true);
            self.infoMessage(`Saving core annotation... ${self.mode === self.MODES.resource ? ' You will be prompted to select resource type in a second' : ''}`);
            
            self.annotationId = self.annotationData.id || null;

            const nameData = {};
            nameData[self.ANNOTATION_NAME_NODE_ID] = self.annotationData.name;
            const descriptionData = {};
            descriptionData[self.ANNOTATION_DESCRIPTION_NODE_ID] = self.annotationData.description;
            const colorData = {};
            colorData[self.ANNOTATION_COLOR_NODE_ID] = self.annotationData.color;
            const geometryData = {};
            geometryData[self.ANNOTATION_GEOMETRY_NODE_ID] = JSON.stringify(self.annotationData.geometry);
            const relatedData = {};
            relatedData[self.ANNOTATION_RELATED_NODE_ID] = [{
                resourceId: self.modelResourceId
            }];
            
            return self._postTile(self.ANNOTATION_NAME_NODE_ID, nameData, self.annotationId)
                .then(() => self._postTile(self.ANNOTATION_DESCRIPTION_NODE_ID, descriptionData, self.annotationId))
                .then(() => self._postTile(self.ANNOTATION_COLOR_NODE_ID, colorData, self.annotationId))
                .then(() => self._postTile(self.ANNOTATION_GEOMETRY_NODE_ID, geometryData, self.annotationId))
                .then(() => self._postTile(self.ANNOTATION_RELATED_NODE_ID, relatedData, self.annotationId))
                .then(function(response) {
                    if (self.annotationData && response && response.tileid) {
                        self.annotationData.relatedTileId = response.tileid;
                        self.annotationData.relatedResources = relatedData[self.ANNOTATION_RELATED_NODE_ID];
                        
                        self.annotationData.isSavedToDatabase = true; 
                    }
                    return response;
                });
        };

        
        self._saveAnnotation().then(function() {
            self.isLoading(false);
            self.annotationSaved(true);
            
            if (self.annotationData && !self.annotationData.id && self.annotationId) {
                self.annotationData.id = self.annotationId;
            }
            
        }).catch(function(err) {
            self.isLoading(false);
            self.errorMessage("Error saving annotation: " + err.message);
            console.error("Error saving annotation:", err);
        });

        self.targetGraphId.subscribe(function(newVal) {
            if (ko.isObservable(self.value)) {
                console.log("Selected graph ID for resource type:", newVal);
                self.value(newVal);
            }
        });
        
    }
    return ko.components.register('resource-type-selection-step', {
        viewModel: viewModel,
        template: template
    });
});