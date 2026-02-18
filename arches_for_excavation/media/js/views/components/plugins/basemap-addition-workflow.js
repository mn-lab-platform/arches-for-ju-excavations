define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/basemap-addition-workflow.htm',
  'views/components/workflows/basemap-addition/geotiff-upload-step',
  'views/components/workflows/universal/process-selection-step',
  'views/components/workflows/basemap-addition/basemap-preview-step',
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('basemap-addition-workflow', {
    viewModel: function(params) {
      this.componentName = 'basemap-addition-workflow';
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
                    id: 'basemap',
                    label: 'Add Basemap',
                    icon: 'fa fa-map',
                    description: 'The foundation layer of your map. Only one basemap can be displayed at a time.'
                  },
                  {
                    id: 'overlay',
                    label: 'Add Overlay',
                    icon: 'fa fa-map-o',
                    description: 'Additional layers on top of the basemap. Multiple overlays can be stacked and toggled independently.'
                  }
                ]
              }
            }]
          }]
        },
        {
          title: 'Upload Basemap',
          name: 'basemap-selection',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'geotiff-upload-step',
              uniqueInstanceName: 'basemap-addition-instance',
              tilesManaged: 'none',
              parameters: {
                mode: "['process-selection']['process-selector']['value']"
              }
            }]
          }]
        },
        {
          title: 'Basemap Preview',
          name: 'basemap-preview',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'basemap-preview-step',
              uniqueInstanceName: 'basemap-preview-instance',
              tilesManaged: 'none',
              parameters: {
                basemapInfo: "['basemap-selection']['basemap-addition-instance']['value']"
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
