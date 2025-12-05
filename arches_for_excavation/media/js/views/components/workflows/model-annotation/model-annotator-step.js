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
        self.NAME_NODE_ID = 'e202ea9f-e0a9-42a3-85a1-6380bc1115b9';
        self.DESCRIPTION_NODE_ID = 'e4c6d7e5-317d-4d04-9936-e4ad1886ba05';
        self.GEOMETRY_NODE_ID = '4277f805-09e7-4db1-bf26-49c09132c720';
        self.RELATED_NODE_ID = '5266b89c-72f7-41cf-a7f4-cde1df9efef9';

        self.isLoading = ko.observable(false);
        self.error = ko.observable('');
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(true);
        self.allowObjectPicking = ko.observable(true);
        self.existingAnnotations = ko.observableArray([]);
        self.parentResourceId = ko.observable(params.parentResourceId || null);

        self.onAnnotationSaved = function(annotationData) {
            console.log('[Workflow] Annotation saved:', annotationData);
        };

        self._saveAnnotationResource = function(annotationData) {

        };

        self.onAnnotationDeleted = function(annotationId) {
            console.log('[Workflow] Annotation deleted:', annotationId);
        };

        self._deleteAnnotationResource = function(resourceId) {
            return resourceService.deleteOne(resourceId);
        };

        console.log("parent:", self.parentResourceId());

        if (self.parentResourceId()) {
            resourceService.getOne(self.parentResourceId()).then(data => {
                data.resourceId = self.parentResourceId();
                self.models3D.push(data);
                console.log("Added model to models3D:", data);
            }).catch(error => {
                console.error("Failed to load model data:", error);
                self.error("Failed to load 3D model data.");
            });
        }
        
    }

    return ko.components.register('model-annotator-step', {
        viewModel: viewModel,
        template: template
    });  
});