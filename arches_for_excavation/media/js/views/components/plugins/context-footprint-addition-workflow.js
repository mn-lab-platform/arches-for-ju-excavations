define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/context-footprint-addition-workflow.htm',
  'views/components/workflows/universal/process-selection-step',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/context-footprint-addition/crs-twoface-step',
  'views/components/workflows/context-footprint-addition/coord-twoface-step',
  'views/components/workflows/context-footprint-addition/confirmation-twoface-step',
  'views/components/workflows/context-footprint-addition/summary-twoface-step',
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
          title: 'Step 1',
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
                    id: '2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c',
                    label: 'Import (O) Context Measurements',
                    icon: 'fa fa-digg'
                  },
                  {
                    id: '9d82972a-f537-11ea-ac6d-9fb7e90de197',
                    label: 'Import Trench Measurements',
                    icon: 'fa fa-crop'
                  },
                  {
                    id: 'cc91f1ff-6ea8-422c-be14-b818660f66f8',
                    label: 'Import (O) Trench Measurements',
                    icon: 'fa fa-crop'
                  }
                ]
              }
            }]
          }]
        },
        {
          title: 'Step 2',
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
          title: 'Step 3',
          name: 'crs-type-selection',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'process-selection-step',
              uniqueInstanceName: 'process-selector',
              tilesManaged: 'none',
              parameters: {
                cards: [
                  {
                    id: 'local',
                    label: 'Coordinates are in Local CRS',
                    icon: 'fa fa-flag'
                  },
                  {
                    id: 'wgs',
                    label: 'Coordinates are in WGS84 CRS',
                    icon: 'fa fa-globe'
                  }
                ]
              }
            }]
          }]
        },
        {
          title: 'Step 4',
          name: 'crs-twoface',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'crs-twoface-step',
              uniqueInstanceName: 'crs-twoface',
              tilesManaged: 'none',
              parameters: {
                mode: "['crs-type-selection']['process-selector']['value']",
              }
            }]
          }]
        },
        {
          title: 'Step 5',
          name: 'coord-twoface',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'coord-twoface-step',
              uniqueInstanceName: 'coord-twoface',
              tilesManaged: 'none',
              parameters: {
                prevStepValue: "['crs-twoface']['crs-twoface']['value']",
              }
            }]
          }]
        },
        {
          title: 'Step 6',
          name: 'confirmation-twoface',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'confirmation-twoface-step',
              uniqueInstanceName: 'confirmation-twoface',
              tilesManaged: 'none',
              parameters: {
                prevStepValue: "['coord-twoface']['coord-twoface']['value']",
                graphId: "['process-selection']['process-selector']['value']",
                resourceId: "['resource-selection']['resource-selector']['value']",
                crsId: "['crs-twoface']['crs-twoface']['value']"              
              }
            }]
          }]
        },
        {
          title: 'Step 7',
          name: 'summary-twoface',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'summary-twoface-step',
              uniqueInstanceName: 'summary-twoface',
              tilesManaged: 'none',
              parameters: {
                prevStepValue: "['confirmation-twoface']['confirmation-twoface']['value']",
                graphId: "['process-selection']['process-selector']['value']",
                resourceId: "['resource-selection']['resource-selector']['value']",
              }
            }]
          }]
        },
        {
          title: 'Step 8',
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