define([
    'knockout',
    'arches',
    'templates/views/components/workflows/model-annotation/summary-step.htm'
], function(ko, arches, template) {
    function viewModel(params) {
        const self = this;

        self.resourceId = params.annotationData.id;
        self.successMessage = params.successMessage;
    }

    return ko.components.register('model-annotation-summary-step', {
        viewModel: viewModel,
        template: template
    });
});