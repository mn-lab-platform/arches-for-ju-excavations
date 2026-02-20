define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/process-selection-step.htm'
], function(ko, arches, template) {

    function viewModel(params) {
        const self = this;

        // process = {
        //     id: 'id',
        //     label: 'Will be displayed as the title of the workflow step and in the process selection card.',
        //     icon: 'icon class for the process selection card, e.g. "fa fa-map"',
        //     description: 'Optional description of the process to be performed, which may include instructions for the user.'
        // }

        self.cards = ko.observableArray(params.cards || []);
        self.cardId = params.value || ko.observable(null);

        self.toggleCard = function(cardId) {
            const selectedCardId = (self.cardId() === cardId) ? null : cardId;
            self.cardId(selectedCardId);
            params.value(selectedCardId);
        }
    }

    return ko.components.register('process-selection-step', {
        viewModel: viewModel,
        template: template
    });
});