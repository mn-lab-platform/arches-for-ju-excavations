define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/context-footprint-addition-workflow.htm',
  'views/components/workflows/universal/process-selection-step',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/context-footprint-addition/coordinates-addition-step',
  'views/components/workflows/context-footprint-addition/coordinates-map-display-step',
  'views/components/workflows/context-footprint-addition/context-footprint-confirmation-step',
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
          title: 'Select Process',
          name: 'process-selection',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'process-selection-step',
              uniqueInstanceName: 'process-selector',
              tilesManaged: 'none',
              parameters: {
                cards: [
                  {
                    id: 'd6559924-9f52-11eb-96c4-020063fe0012',
                    label: 'Import Context Measurements',
                    icon: 'fa fa-digg'
                  },
                  {
                    id: '9d82972a-f537-11ea-ac6d-9fb7e90de197',
                    label: 'Import Trench Measurements',
                    icon: 'fa fa-crop'
                  }
                ]
              }
            }]
          }]
        },
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
                graphId: "['process-selection']['process-selector']['value']",
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
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'coordinates-map-display-step',
              uniqueInstanceName: 'coordinates-viewer',
              tilesManaged: 'none',
              parameters: {
                coordinatesData: "['coordinates-addition']['coordinates-adder']['value']"
              }
            }]
          }]
        },
        {
          title: 'Confirm and Save',
          name: 'context-footprint-confirmation',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'context-footprint-confirmation-step',
              uniqueInstanceName: 'context-footprint-confirmer',
              tilesManaged: 'none',
              parameters: {
                coordinatesData: "['coordinates-addition']['coordinates-adder']['value']",
                graphId: "['process-selection']['process-selector']['value']",
                resourceId: "['resource-selection']['resource-selector']['value']"
              }
            }]
          }]
        },
        {
          title: 'Summary',
          name: 'coordinates-summary',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'context-footprint-summary-step',
              uniqueInstanceName: 'coordinates-summary',
              tilesManaged: 'none',
              parameters: {
                resourceId: "['resource-selection']['resource-selector']['value']",
                footprintSaved: "['context-footprint-confirmation']['context-footprint-confirmer']['value']"
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