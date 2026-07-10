define([
   'knockout', 
   'arches',
   'templates/views/components/workflows/context-footprint-addition/summary-twoface-step.htm',
], function(ko, arches, template) {
    function viewModel(params) {
        const self = this;
        self.value = params.value;
        self.prevStepValue = params.prevStepValue || null;
        self.mode = self.prevStepValue.footprintSaved ? 'summary' : 'confirmation'; //if footprint saved means confirmation step completed
        self.graphId = params.graphId || null;
        self.resourceId = params.resourceId || null;
    }

    return ko.components.register('summary-twoface-step', {
        viewModel: viewModel,
        template: template
    });
    
});