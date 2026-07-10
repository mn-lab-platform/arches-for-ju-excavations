define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/model-addition-workflow.htm',
  'views/components/workflows/model-addition/model-addition-step',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/model-addition/summary-step'
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('model-addition-workflow', {
    viewModel: function(params) {
      this.componentName = 'model-addition-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Select Resource',
          name: 'resource-selection',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-selection-step',
              uniqueInstanceName: 'resource-selection-instance',
              tilesManaged: 'none',
              parameters: {
                graphIds: ['d6559924-9f52-11eb-96c4-020063fe0012', '9d82972a-f537-11ea-ac6d-9fb7e90de197'],
                searchPlaceholder: 'Search resources...',
              }
            }]
          }]
        },
        {
          title: 'Add 3D Model',
          name: 'model-selection',
          required: true,
          informationboxdata: {
            heading: 'Select or upload 3D model',
            text: 'Upload/select a file containing valid 3D Tiles to create a 3D model resource linked to the resource from step 1.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'model-addition-step',
              uniqueInstanceName: 'model-addition-instance',
              tilesManaged: 'none',
              parameters: {
                parentResourceId: "['resource-selection']['resource-selection-instance']['value']"
              }
            }]
          }]
        },
        {
          title: 'Summary',
          name: 'summary',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'model-addition-summary-step',
              uniqueInstanceName: 'model-addition-summary-instance',
              tilesManaged: 'none',
              parameters: {
                resourceId: "['model-selection']['model-addition-instance']['value']",
                successMessage: "3D model added successfully!"
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
