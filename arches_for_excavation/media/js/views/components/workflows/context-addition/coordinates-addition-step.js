define([
    'knockout',
    'arches',
    'templates/views/components/workflows/context-addition/coordinates-addition-step.htm',
], function(ko, arches, template) {
    return ko.components.register('coordinates-addition-step', {
        viewModel: function(params) {
            const self = this;

            self.coordinatesText = ko.observable('');

            console.log("Created Resource ID param: ", params.createdResourceId);
        },
        template: template
    });
});