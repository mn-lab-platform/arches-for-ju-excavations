define([
   'knockout', 
   'arches',
   'templates/views/components/workflows/context-footprint-addition/confirmation-twoface-step.htm',
], function(ko, arches, template) {
    function viewModel(params) {
        const self = this;
        self.value = params.value;
        self.crsId = params.crsId;
        console.log('crsid in confirmation two-face step: ', self.crsId);
        self.prevStepValue = params.prevStepValue || null;
        self.mode = self.prevStepValue.verified ? 'confirmation' : 'map';
        self.graphId = params.graphId || null;
        self.resourceId = params.resourceId || null;
        console.log('Confirmation Two-Face Step - Previous Step Value:', self.prevStepValue);
    }

    return ko.components.register('confirmation-twoface-step', {
        viewModel: viewModel,
        template: template
    });
    
});