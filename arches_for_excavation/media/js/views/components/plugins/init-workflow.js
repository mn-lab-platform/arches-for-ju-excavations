define([
    'knockout',
    'arches',
    'templates/views/components/plugins/init-workflow.htm'
], function(ko, arches, template) {

    var InitWorkflow = function(params) {
        this.workflowButtons = ko.observableArray([
            {
                name: 'Digital Resource 3D Addition Workflow',
                slug: 'model-addition-workflow',
                icon: 'fa-cube',
                description: 'Upload 3D models to existing resources',
                backgroundColor: '#e6f0fa'
            },
            {
                name: 'Digital Resource 3D Annotation Workflow',
                slug: 'model-annotation-workflow',
                icon: 'fa-bookmark',
                description: 'Manage annotations of 3D models',
                backgroundColor: '#e3bcf1ff'
            },
            {
                name: 'GNSS/Total Station Data Import Workflow',
                slug: 'context-footprint-addition-workflow',
                icon: 'fa fa-shape',
                description: 'Add footprint to Context resources',
                backgroundColor: '#f9d5b3ff'
            },
            {
                name: 'IIIF resource addition',
                slug: 'iiif-addition-workflow',
                icon: 'fa fa-picture-o',
                description: 'Add an iiif resources to a resource',
                backgroundColor: '#e6fae6'
            },               
            {
                name: 'IIIF annotation workflow',
                slug: 'iiif-annotation-workflow',
                icon: 'fa fa-asterisk',
                description: 'Add annotation to iiif resources',
                backgroundColor: '#fae6e6'
            }, 
            {
                name: 'Basemap Addition Workflow',
                slug: 'basemap-addition-workflow',
                icon: 'fa-map',
                description: 'Upload GeoTIFF basemaps to existing resources',
                backgroundColor: '#d9f2f2ff'
            }   

        ]);

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