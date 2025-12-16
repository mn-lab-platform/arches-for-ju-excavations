define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/context-addition-workflow.htm',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/context-addition/coordinates-addition-step',
  'views/components/workflows/context-addition/coordinates-map-display-step'
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('context-addition-workflow', {
    viewModel: function(params) {
      this.componentName = 'context-addition-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Select Context Resource',
          name: 'resource-selection',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-selection-step',
              uniqueInstanceName: 'resource-selector',
              tilesManaged: 'none',
              parameters: {
                graphId: 'd6559924-9f52-11eb-96c4-020063fe0012',
                searchPlaceHolder: 'Search for a Context resource...'
              }
            }]
          }]
        },
        {
          title: 'Add Coordinates to Context',
          name: 'coordinates-addition',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'coordinates-addition-step',
              uniqueInstanceName: 'coordinates-adder',
              tilesManaged: 'none',
              parameters: {
                createdResourceId: "['resource-selection']['resource-selector']['value']"
              }
            }]
          }]
        },
        {
          title: 'Verify Coordinates',
          name: 'coordinates-verification',
          required: false,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'coordinates-map-display-step',
              uniqueInstanceName: 'coordinates-viewer',
              tilesManaged: 'none',
              parameters: {
                coordinatesText: "['coordinates-addition']['coordinates-adder']['value']",
              }
            }]
          }]
        }
      ];

      const WF = Workflow && Workflow.default ? Workflow.default : Workflow;
      WF.apply(this, [params]);
    },
    template: workflowTemplate
  });
});