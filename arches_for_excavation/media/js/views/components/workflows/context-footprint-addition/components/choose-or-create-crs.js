define([
    'knockout',
    'arches',
    'templates/views/components/workflows/context-footprint-addition/components/choose-or-create-crs.htm'
], function(ko, archesModule, template) {
    function viewModel(params) {
        const self = this;
        self.CRS_GRAPHID = 'a5219c24-2907-4055-9d68-18216d214458';
        self.value = params.value || null;
        self.useCreateMode = ko.observable(false);
        self.crsResourceId = ko.observable(null);
    }
    
    return ko.components.register('choose-or-create-crs', {
        viewModel: viewModel,
        template: template
    });
});