define([
    'knockout',
    'arches',
    'viewmodels/workflow',
    'templates/views/components/plugins/bone-csv-visualization-workflow.htm',
    'views/components/workflows/bone-csv-visualization/bone-csv-visualization-step',
    'views/components/workflows/bone-csv-visualization/bone-iiif-leaflet-step'
], function(ko, arches, Workflow, workflowTemplate) {
    return ko.components.register('bone-csv-visualization-workflow', {
        viewModel: function(params) {
            this.componentName = 'bone-csv-visualization-workflow';
            this.quitUrl = arches && arches.urls && arches.urls.plugin
                ? arches.urls.plugin('init-workflow')
                : '/';

            this.stepConfig = [{
                title: 'CSV and skeleton preview',
                name: 'bone-csv-preview',
                required: true,
                informationboxdata: {
                    heading: 'Prototype: CSV to IIIF annotations',
                    text: 'Upload a CSV file, match bone_id values to predefined image regions, and preview the annotations.'
                },
                layoutSections: [{
                    componentConfigs: [{
                        componentName: 'bone-csv-visualization-step',
                        uniqueInstanceName: 'bone-csv-visualization-instance',
                        tilesManaged: 'none'
                    }]
                }]
            }, {
                title: 'IIIF Leaflet preview',
                name: 'bone-iiif-preview',
                required: true,
                informationboxdata: {
                    heading: 'IIIF annotations in Leaflet',
                    text: 'Review the generated IIIF Canvas and SvgSelector annotation regions in a zoomable Leaflet view.'
                },
                layoutSections: [{
                    componentConfigs: [{
                        componentName: 'bone-iiif-leaflet-step',
                        uniqueInstanceName: 'bone-iiif-leaflet-instance',
                        tilesManaged: 'none',
                        parameters: {
                            payload: "['bone-csv-preview']['bone-csv-visualization-instance']['value']"
                        }
                    }]
                }]
            }];

            const WorkflowViewModel = Workflow && Workflow.default ? Workflow.default : Workflow;
            WorkflowViewModel.apply(this, [params]);
        },
        template: workflowTemplate
    });
});
