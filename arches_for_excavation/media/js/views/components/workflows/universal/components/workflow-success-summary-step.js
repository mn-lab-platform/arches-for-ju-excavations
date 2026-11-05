define([
    'knockout',
    'templates/views/components/workflows/universal/components/workflow-success-summary-step.htm',
    'views/components/workflows/universal/components/workflow-success-summary'
], function(ko, template) {
    return ko.components.register('workflow-success-summary-step', {
        viewModel: function(params) {
            this.resourceId = params.resourceId;
            this.successMessage = params.successMessage;
        },
        template: template
    });
});
