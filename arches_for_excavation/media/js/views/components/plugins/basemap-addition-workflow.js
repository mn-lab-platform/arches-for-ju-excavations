define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/basemap-addition-workflow.htm',
  'views/components/workflows/basemap-addition/basemap-addition-step',
  'views/components/workflows/universal/resource-selection-step',
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('basemap-addition-workflow', {
    viewModel: function(params) {
      this.componentName = 'basemap-addition-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Upload Basemap',
          name: 'basemap-selection',
          required: true,
          informationboxdata: {
            heading: 'Upload a raster dataset in GeoTIFF format',
            text: 'Use the widget below.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'geotiff-upload-step',
              uniqueInstanceName: 'basemap-addition-instance',
              tilesManaged: 'none',
              parameters: {
                
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
