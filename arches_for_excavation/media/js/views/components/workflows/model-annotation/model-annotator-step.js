define([
    'knockout',
    'jquery',
    'arches',
    'templates/views/components/workflows/model-annotation/model-annotator-step.htm',
    '../../../../services/resource-service',
    '../../../../services/tile-service',
    'views/components/custom/cesium-viewer'
], function(ko, $, arches, template, resourceServiceModule, tileServiceModule) {
    function viewModel(params) {
        const self = this;
        const resourceService = resourceServiceModule.default || resourceServiceModule;
        const tileService = tileServiceModule.default || tileServiceModule;

        self.REL_ONTOLOGY_PROPERTY_ID = null;
        self.REL_INVERSE_PROPERTY_ID = null;
        self.ANNOTATIONS_GRAPH_ID = '2880934b-0015-4c5a-8ec1-1ab9bca329fd';
        self.NAME_NODE_ID = 'e202ea9f-e0a9-42a3-85a1-6380bc1115b9';
        self.DESCRIPTION_NODE_ID = 'e4c6d7e5-317d-4d04-9936-e4ad1886ba05';
        self.COLOR_NODE_ID = 'd691d389-6259-4765-b2d3-7f7f98057101';
        self.GEOMETRY_NODE_ID = '4277f805-09e7-4db1-bf26-49c09132c720';
        self.RELATED_NODE_ID = '5266b89c-72f7-41cf-a7f4-cde1df9efef9';

        self.isLoading = ko.observable(false);
        self.error = ko.observable('');
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(true);
        self.allowObjectPicking = ko.observable(true);
        self.existingAnnotations = ko.observableArray([]);
        self.parentResourceId = ko.observable(params.parentResourceId || null);
        self.existingAnnotations = ko.observableArray([]);

        self.onAnnotationSaved = function(annotationData) {
            console.log('[Workflow] Annotation saved:', annotationData);
            return self._saveAnnotationResource(annotationData);
        };

        self._saveAnnotationResource = function(annotationData) {
            const annotationId = annotationData.id;
            
            const nameData = {};
            nameData[self.NAME_NODE_ID] = annotationData.name || 'Unnamed Annotation';

            const descriptionData = {};
            descriptionData[self.DESCRIPTION_NODE_ID] = annotationData.description || '';

            const colorData = {};
            colorData[self.COLOR_NODE_ID] = annotationData.color || '#ffffff';

            const geometryData = {};
            geometryData[self.GEOMETRY_NODE_ID] = JSON.stringify(annotationData.position);

            const relData = {};
            relData[self.RELATED_NODE_ID] = [{
                resourceId: self.parentResourceId(),
                ontologyProperty: self.REL_ONTOLOGY_PROPERTY_ID || "",
                inverseOntologyProperty: self.REL_INVERSE_PROPERTY_ID || "",
                resourceXresourceId: ""
            }];

            return self._postTile(self.NAME_NODE_ID, nameData, annotationId)
                .then(() => 
                    self._postTile(self.DESCRIPTION_NODE_ID, descriptionData, annotationId)
                ).then(() => 
                    self._postTile(self.COLOR_NODE_ID, colorData, annotationId)
                ).then(() =>
                    self._postTile(self.GEOMETRY_NODE_ID, geometryData, annotationId)
                ).then(() =>
                    self._postTile(self.RELATED_NODE_ID, relData, annotationId)
                );
        };

        self._postTile = function(nodegroupId, data, resourceId) {
            const payload = {
                tileid: '',
                nodegroup_id: nodegroupId,
                parenttile_id: null,
                resourceinstance_id: resourceId,
                sortorder: 0,
                tiles: {},
                data: data
            };

            return tileService.createOne(payload);
        }

        self.onAnnotationDeleted = function(annotationId) {
            console.log('[Workflow] Annotation deleted:', annotationId);
        };

        self._deleteAnnotationResource = function(resourceId) {
            return resourceService.deleteOne(resourceId);
        };

        console.log("parent:", self.parentResourceId());

        if (self.parentResourceId()) {
            resourceService.getOne(self.parentResourceId()).then(data => {
                data.resourceId = self.parentResourceId(); //TODO: unnecessary - resourceinstanceid in data
                self.models3D.push(data);
                console.log("Added model to models3D:", data);
            }).catch(error => {
                console.error("Failed to load model data:", error);
                self.error("Failed to load 3D model data.");
            });

            resourceService.getOneRelatedTo(self.parentResourceId(), self.ANNOTATIONS_GRAPH_ID).then(data => {
                console.log("Fetched related annotations:", data);
                self.existingAnnotations(data);
            }).catch(error => {
                console.error("Failed to fetch related annotations:", error);
            });
        }
        
    }

    return ko.components.register('model-annotator-step', {
        viewModel: viewModel,
        template: template
    });  
});