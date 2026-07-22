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

        self.ANNOTATION_NAME_NODE_ID = 'c6840b34-8614-4734-bdb2-10d52f258afc';
        self.ANNOTATION_DESCRIPTION_NODE_ID = '897a4abf-32dd-4d1f-925e-45c8d82828b9';   
        self.ANNOTATION_COLOR_NODE_ID = '2a0b5108-ef64-47e3-9460-61c064e397b1';
        self.ANNOTATION_GEOMETRY_NODE_ID = '2586e7f6-3610-4666-bc27-7efe9639dcaf';
        self.ANNOTATION_RELATED_NODE_ID = 'a2ef2d24-20ae-4070-b11b-207834905809';
        self.ANNOTATION_GROUP_NODEGROUP_ID = 'a2ef2d24-20ae-4070-b11b-207834905809';

        self.mode = params.mode;
        
        self.annotationData = params.annotationData;
        self.modelResourceId = params.modelResourceId;
        self.annotationId = null;

        self.targetGraphId = ko.observable(self.value());
        
        self.infoMessage = ko.observable(null);
        self.isLoading = ko.observable(false);
        self.errorMessage = ko.observable(null);
        
        self.annotationSaved = ko.observable(false);
        const annotationData = ko.unwrap(self.annotationData) || {};
        console.log('[ANNOTATION SAVE] annotationData before save', annotationData);
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
            self.isLoading(true);

            self.annotationId = annotationData.id || null;

            const relatedResources = Array.isArray(annotationData.relatedResources) && annotationData.relatedResources.length
                ? annotationData.relatedResources
                : [{
                    resourceId: ko.unwrap(self.modelResourceId),
                    ontologyProperty: "",
                    inverseOntologyProperty: "",
                    resourceXresourceId: ""
                }];

            const groupData = {};
            groupData[self.ANNOTATION_COLOR_NODE_ID] = annotationData.color || '#64ff64';
            groupData[self.ANNOTATION_GEOMETRY_NODE_ID] = JSON.stringify(annotationData.geometry);
            groupData[self.ANNOTATION_RELATED_NODE_ID] = relatedResources;

            if (annotationData.isSavedToDatabase && annotationData.relatedTileId) {
                console.log('[ANNOTATION SAVE] updating existing annotation grouped tile', annotationData.relatedTileId, groupData);

                return self._postTile(
                    self.ANNOTATION_GROUP_NODEGROUP_ID,
                    groupData,
                    self.annotationId,
                    annotationData.relatedTileId
                ).then(function(response) {
                    annotationData.relatedResources = relatedResources;
                    annotationData.isSavedToDatabase = true;
                    self.annotationSaved(true);
                    return response;
                });
            }

            self.infoMessage(`Saving core annotation... ${self.mode === self.MODES.resource ? ' You will be prompted to select resource type in a second' : ''}`);

            
            self.annotationId = annotationData.id || null;

            const nameData = {};
            nameData[self.ANNOTATION_NAME_NODE_ID] = annotationData.name;
            const descriptionData = {};
            descriptionData[self.ANNOTATION_DESCRIPTION_NODE_ID] = annotationData.description;
            const colorData = {};
            colorData[self.ANNOTATION_COLOR_NODE_ID] = annotationData.color;
            const geometryData = {};
            geometryData[self.ANNOTATION_GEOMETRY_NODE_ID] = JSON.stringify(annotationData.geometry);
            
            return self._postTile(self.ANNOTATION_NAME_NODE_ID, nameData, self.annotationId)
                .then(() => self._postTile(self.ANNOTATION_DESCRIPTION_NODE_ID, descriptionData, self.annotationId))
                .then(() => self._postTile(self.ANNOTATION_GROUP_NODEGROUP_ID, groupData, self.annotationId))
                .then(function(response) {
                    if (annotationData && response && response.tileid) {
                        annotationData.relatedTileId = response.tileid;
                        annotationData.relatedResources = groupData[self.ANNOTATION_RELATED_NODE_ID];
                        
                        annotationData.isSavedToDatabase = true; 
                    }
                    return response;
                });
        };

        
        self._saveAnnotation().then(function() {
            self.isLoading(false);
            if (!Array.isArray(annotationData.geometry) || annotationData.geometry.length < 3) {
                return Promise.reject(new Error('Annotation geometry is missing.'));
            }
            self.annotationSaved(true);
            
            if (annotationData && !annotationData.id && self.annotationId) {
                annotationData.id = self.annotationId;
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