define(['knockout'], function(ko) {
    'use strict';

    return function(workflow) {
        // Arches marks a workflow finished as soon as its last step is reachable.
        // Its shared template should show the finish button only on that step.
        var baseFinished = workflow.isWorkflowFinished;
        workflow.isWorkflowFinished = ko.pureComputed({
            read: function() {
                var activeStep = workflow.activeStep();
                return !!activeStep && activeStep._index === workflow.steps().length - 1;
            },
            write: function(value) {
                baseFinished(value);
            }
        });
    };
});
