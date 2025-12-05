define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',

  'templates/views/components/plugins/model-annotation-workflow.htm',
  'views/components/workflows/model-annotation/model-annotator-step',
  'views/components/workflows/universal/resource-selection-step'
], function(ko, $, arches, Workflow, workflowTemplate) {
  
  return ko.components.register('model-annotation-workflow', {
    viewModel: function(params) {
        this.componentName = 'model-annotation-workflow';
        this.quitUrl = (arches && arches.urls && arches.urls.plugin)
            ? arches.urls.plugin('init-workflow')
            : '/';

        this.stepConfig = [
            {
            title: 'Select Digital Resource 3D',
            name: 'resource-selection',
            required: true,
            layoutSections: [{
                componentConfigs: [{
                componentName: 'resource-selection-step',
                uniqueInstanceName: 'resource-selection-instance',
                tilesManaged: 'none',
                parameters: {
                    graphid: '5465389c-bba7-4af1-bc9a-9fbb201e8408', // 3D model graph ID                
                    searchPlaceholder: 'Search resources...',
                }
                }]
            }]
            },
            {
            title: 'Manage Annotations of Digital Resource 3D',
            name: 'model-annotator',
            required: true,
            layoutSections: [{
                componentConfigs: [{
                componentName: 'model-annotator-step',
                uniqueInstanceName: 'model-annotator-instance',
                tilesManaged: 'none',
                parameters: {
                    parentResourceId: "['resource-selection']['resource-selection-instance']['value']"
                }
                }]
            }]
            }
        ];

        // Apply Workflow base
        const WF = Workflow && Workflow.default ? Workflow.default : Workflow;
        WF.apply(this, [params]);
        },
        template: workflowTemplate
    });
});
