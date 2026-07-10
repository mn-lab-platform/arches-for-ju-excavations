define([
    'knockout',
    'templates/views/components/workflows/universal/components/workflow-success-summary.htm'
], function(ko, template) {
    return ko.components.register('workflow-success-summary', {
        viewModel: function(params) {
            console.log("Initializing workflow-success-summary with params:", params);
            this.resourceId = ko.unwrap(params.resourceId);
            this.successMessage = ko.unwrap(params.successMessage) || 'Operation completed successfully.';
            
            this.resourceUrl = params.resourceUrl 
                ? ko.unwrap(params.resourceUrl) 
                : (this.resourceId ? `/report/${this.resourceId}` : null);
        },
        template: template
    });
});