define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/components/resource-type-picker.htm'
], function(ko, archesModule, template) {
    function viewModel(params) {
        const arches = archesModule.default || archesModule;
        const self = this;

        self.selectedGraphId = params.selectedGraphId;
        
        self.label = params.label || 'Select Resource Type';

        const rawResources = arches?.resources || [];
        const parsedResources = Array.isArray(rawResources) 
            ? rawResources 
            : Object.values(rawResources);
        
        self.availableResourceTypes = ko.observableArray(parsedResources);

        self.selectGraph = function(graph) {
            if (ko.isObservable(self.selectedGraphId)) {
                self.selectedGraphId(graph.graphid);
            }
        };
    }
    
    return ko.components.register('resource-type-picker', {
        viewModel: viewModel,
        template: template
    });
});