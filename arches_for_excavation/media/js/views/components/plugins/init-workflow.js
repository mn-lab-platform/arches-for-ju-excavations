define([
    'knockout',
    'arches',
    'templates/views/components/plugins/init-workflow.htm'
], function(ko, arches, template) {

    var InitWorkflow = function(params) {
        this.workflowButtons = ko.observableArray([
            {
                name: 'Digital Resource 3D Addition',
                slug: 'model-addition-workflow',
                icon: 'fa-cube',
                description: 'Upload 3D models to existing resources',
                backgroundColor: '#e6f0fa'
            }
        ]);

        // Add URL and hovering state to each button
        this.workflowButtons().forEach(function(workflow) {
            workflow.url = `/plugins/${workflow.slug}`;
            workflow.hovering = ko.observable(false);
        });
    };

    return ko.components.register('init-workflow', {
        viewModel: InitWorkflow,
        template: template
    });
});