define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/process-selection-step.htm'
], function(ko, arches, template) {

    function viewModel(params) {
        const self = this;

        process = {
            id: 'd6559924-9f52-11eb-96c4-020063fe0012',
            label: 'Import Context Measurements',
            icon: 'fa-digg'
        }

        self.cards = ko.observableArray(params.cards || []);
        self.cardId = params.value || ko.observable(null);

        self.toggleCard = function(cardId) {
            const selectedCardId = (self.cardId() === cardId) ? null : cardId;
            self.cardId(selectedCardId);
            params.value(selectedCardId);
        }
        
        // ===== Workflow Integration =====
        if (params.form) {
            // Set complete status
            if (params.form?.complete) {
                params.form.complete(ko.pureComputed(function() {
                    return Boolean(params.value());
                }));
            }

            // Override save method
            if (params.form.save) {
                const originalSave = params.form.save;
                params.form.save = function() {
                    const rid = (self.cardId() || '').trim();
                    if (!rid) {
                        return Promise.reject(new Error('No card selected'));
                    }
                    return originalSave.apply(params.form, arguments);
                };
            }
        }

        return self;
    }

    return ko.components.register('process-selection-step', {
        viewModel: viewModel,
        template: template
    });
});