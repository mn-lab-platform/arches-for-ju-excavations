define([
    'knockout',
    'arches',
    'templates/views/components/workflows/model-addition/summary-step.htm'
], function(ko, arches, template) {
    function viewModel(params) {
        const self = this;

        self.resourceId = params.resourceId;
        self.successMessage = params.successMessage;
    }

    return ko.components.register('model-addition-summary-step', {
        viewModel: viewModel,
        template: template
    });
});