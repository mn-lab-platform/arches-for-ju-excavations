define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/context-footprint-addition-workflow.htm',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/context-footprint-addition/coordinates-addition-step',
  'views/components/workflows/context-footprint-addition/coordinates-map-display-step',
  'views/components/workflows/context-footprint-addition/context-footprint-summary-step',
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('context-footprint-addition-workflow', {
    viewModel: function(params) {
      this.componentName = 'context-footprint-addition-workflow';
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
              parameters: {}
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
        },
        {
          title: 'Summary',
          name: 'coordinates-summary',
          required: false,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'context-footprint-summary-step',
              uniqueInstanceName: 'coordinates-summary',
              tilesManaged: 'none',
              parameters: {
                resourceId: "['resource-selection']['resource-selector']['value']",
                coordinatesText: "['coordinates-addition']['coordinates-adder']['value']"
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