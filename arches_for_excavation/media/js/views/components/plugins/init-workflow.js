define([
    'knockout',
    'arches',
    'templates/views/components/plugins/init-workflow.htm'
], function(ko, arches, template) {

    var InitWorkflow = function(params) {
        this.workflowButtons = ko.observableArray([
            {
                name: 'Add 3D Resource',
                slug: 'model-addition-workflow',
                icon: 'fa-cube',
                description: 'Create and link 3D models to existing resources',
                backgroundColor: '#e6f0fa'
            },
            {
                name: 'Annotate 3D Resource',
                slug: 'model-annotation-workflow',
                icon: 'fa-bookmark',
                description: 'Manage annotations for 3D models',
                backgroundColor: '#e3bcf1ff'
            },
            {
                name: 'GNSS/Total Station Data Import Workflow',
                slug: 'context-footprint-addition-workflow',
                icon: 'fa-object-group',
                description: 'Add footprints to Context resources',
                backgroundColor: '#f9d5b3ff'
            },
            {
                name: 'Add IIIF Resource',
                slug: 'iiif-addition-workflow',
                icon: 'fa fa-camera',
                description: 'Create and link IIIF resources to a resource',
                backgroundColor: '#e6fae6'
            },    
            {
                name: 'Add to existing IIIF Resource',
                slug: 'iiif-append-workflow',
                icon: 'fa fa-picture-o',
                description: 'Add to existing IIIF resources',
                backgroundColor: '#e6fae6'
            },                                     
            {
                name: 'Annotate IIIF Resource',
                slug: 'iiif-annotation-workflow',
                icon: 'fa fa-asterisk',
                description: 'Add annotation to IIIF resources',
                backgroundColor: '#fae6e6'
            }, 
            {
                name: 'Upload Basemap/Overlay Layer',
                slug: 'basemap-addition-workflow',
                icon: 'fa-map',
                description: 'Upload GeoTIFF file to be used as basemap or overlay layer in the map viewer',
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