define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/crs-creation-from-two-points-step.htm',
    '../../../../services/crs-service'
], function(ko, arches, template, crsServiceModule) {
    return ko.components.register('crs-creation-from-two-points-step', {
        viewModel: function(params) {
            const self = this;
            const crsService = crsServiceModule.default || crsServiceModule;

            self.infoMessage = ko.observable(null);
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            
            self.submitForm = function(formElement) {
                self.infoMessage('Creating local coordinate system...');
                self.errorMessage(null);
                self.successMessage(null);

                const formData = new FormData(formElement);
                crsService.defineCRSFromTwoPoints(formData)
                    .then(response => {
                        self.infoMessage(null);
                        self.successMessage('Local coordinate system created successfully!');
                    })
                    .catch(error => {
                        self.infoMessage(null);
                        self.errorMessage('Error creating local coordinate system: ' + error.message);
                    });

                return false; // Prevent default form submission
            };

            
        },
        template: template
    });
});