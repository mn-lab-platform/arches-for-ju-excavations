define([
    'knockout',
    'arches',
    'templates/views/components/workflows/context-footprint-addition/context-footprint-summary-step.htm',
], function(ko, arches, template) {
    return ko.components.register('context-footprint-summary-step', {
        viewModel: function(params) {
            const self = this;

            self.coordinatesText = params.coordinatesText;
            self.resourceId = params.resourceId;
            self.footprintSaved = params.footprintSaved;

            self.errorMessage = ko.observable(self.footprintSaved ? null : 'Footprint has not been added to your resource yet. Please return to the previous step to save the footprint before proceeding.');
            self.successMessage = ko.observable(self.footprintSaved ? 'Footprint has been successfully added to your resource. You can safely complete/delete this workflow' : null);
            console.log("Resource ID in summary step: ", self.resourceId);
            
        },
        template: template
    });
});