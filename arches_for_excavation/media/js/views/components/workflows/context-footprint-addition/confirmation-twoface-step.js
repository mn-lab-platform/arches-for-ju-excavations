define([
   'knockout', 
   'arches',
   'templates/views/components/workflows/context-footprint-addition/confirmation-twoface-step.htm',
], function(ko, arches, template) {
    function viewModel(params) {
        const self = this;
        self.value = params.value;

        const rawCrsValue = ko.unwrap(params.crsId);
        self.crsId = typeof rawCrsValue === 'string'
            ? rawCrsValue
            : null;

        self.prevStepValue = params.prevStepValue || null;
        self.mode = self.prevStepValue.verified ? 'confirmation' : 'map';
        self.graphId = params.graphId || null;
        self.resourceId = params.resourceId || null;
        self.overwriteNodeIds = params.overwriteNodeIds || null;
    }

    return ko.components.register('confirmation-twoface-step', {
        viewModel: viewModel,
        template: template
    });
    
});