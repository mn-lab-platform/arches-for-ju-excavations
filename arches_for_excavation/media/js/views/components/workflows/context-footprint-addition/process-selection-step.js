define([
    'knockout',
    'arches',
    'templates/views/components/workflows/context-footprint-addition/process-selection-step.htm'
], function(ko, arches, template) {

    function viewModel(params) {
        const self = this;

        self.CONTEXT_GRAPHID = 'd6559924-9f52-11eb-96c4-020063fe0012';
        self.TRENCH_GRAPHID= '9d82972a-f537-11ea-ac6d-9fb7e90de197';

        // ===== State =====
        self.graphId = ko.observable(params.value && params.value() ? params.value() : null);

        self.toggleCard = function(card) {
            const selectedGraphId = (self.graphId() === self._graphIdForCard(card)) ? null : self._graphIdForCard(card);
            self.graphId(selectedGraphId);
            params.value(selectedGraphId);
        };

        self._graphIdForCard = function(card) {
            switch(card) {
                case 'context':
                    return self.CONTEXT_GRAPHID;
                case 'trench':
                    return self.TRENCH_GRAPHID;
                default:
                    return null;
            }
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
                    const rid = (self.graphId() || '').trim();
                    if (!rid) {
                        return Promise.reject(new Error('No resource selected'));
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