define([
   'knockout', 
   'arches',
   'templates/views/components/workflows/model-annotation/annotation-form-step.htm',
   '../../../../services/resource-service',
   '../../../../services/tile-service',
], function(ko, arches, template, resourceServiceModule, tileServiceModule) {
    function viewModel(params) {
        const self = this;

        self.value = params.value;
        self.annotationData = ko.observable(params.annotationData || {});
        console.log('Annotation data in form step:', self.annotationData());
        self.isLastStep = ko.pureComputed(function() { return ko.unwrap(params.mode) === 'edit'; });
        if (self.isLastStep()) {
            params.form.complete(false);
        }
        self.modelResourceId = params.modelResourceId; 
       
        self.successMessage = ko.observable(null);
        self.errorMessage = ko.observable(null);

        self.annotationName = ko.observable(self.value()?.name || '');
        self.annotationDescription = ko.observable(self.value()?.description || '');
        self.annotationColor = ko.observable(self.value()?.color || '#64ff64');

        self.formValue = ko.pureComputed(function () {
            return {
                ...self.annotationData(),
                name: self.annotationName().trim() || 'Unnamed Annotation',
                description: self.annotationDescription().trim() || 'No description provided.',
                color: self.annotationColor()
            }
        });

        self.formValue.subscribe(function(val) {
            self.value(val);
        });
    }

    return ko.components.register('annotation-form-step', {
        viewModel: viewModel,
        template: template
    });
});