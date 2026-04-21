define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/model-addition-workflow.htm',
  'views/components/workflows/model-addition/model-addition-step',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/universal/crs-creation-from-two-points-step',
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('model-addition-workflow', {
    viewModel: function(params) {
      this.componentName = 'model-addition-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Define CRS',
          name: 'crs-creation',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'crs-creation-from-two-points-step',
              uniqueInstanceName: 'crs-creation-instance',
              tilesManaged: 'none',
              parameters: { 
                // No parameters needed for this step
              }
            }]
          }]
        },
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
        }
      ];

      // Apply Workflow base
      const WF = Workflow && Workflow.default ? Workflow.default : Workflow;
      WF.apply(this, [params]);
    },
    template: workflowTemplate
  });
});
