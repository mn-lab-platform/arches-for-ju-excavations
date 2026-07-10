define([
   'knockout', 
   'arches',
   'templates/views/components/workflows/context-footprint-addition/coord-twoface-step.htm',
], function(ko, arches, template) {
    function viewModel(params) {
        const self = this;
        self.value = params.value;
        self.prevStepValue = params.prevStepValue || null;
        self.mode = typeof self.prevStepValue === 'object' ? 'map' : 'input';
    }

    return ko.components.register('coord-twoface-step', {
        viewModel: viewModel,
        template: template
    });
    
});