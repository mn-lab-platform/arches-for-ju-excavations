define([
   'knockout', 
   'arches',
   'templates/views/components/workflows/context-footprint-addition/crs-twoface-step.htm',
   'views/components/workflows/context-footprint-addition/components/choose-or-create-crs'
], function(ko, arches, template) {
    function viewModel(params) {
        const self = this;
        self.value = params.value;
        self.mode = params.mode;
    }

    return ko.components.register('crs-twoface-step', {
        viewModel: viewModel,
        template: template
    });
    
});