define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/crs-assignment-workflow.htm',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/crs-assignment/crs-assignment-summary-step',

], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('crs-assignment-workflow', {
    viewModel: function(params) {
      this.componentName = 'crs-assignment-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Select Local CRS',
          name: 'crs-selection',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-selection-step',
              uniqueInstanceName: 'crs-selection-instance',
              tilesManaged: 'none',
              parameters: {
                graphId: 'a5219c24-2907-4055-9d68-18216d214458',
                multiple: false,
                searchPlaceholder: 'Search CRS definitions...'
              }
            }]
          }]
        },
        {
          title: 'Select resources',
          name: 'resource-selection',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-selection-step',
              uniqueInstanceName: 'resource-selection-instance',
              tilesManaged: 'none',
              parameters: {
                graphIds: ['401b3051-d1c4-465c-8dd0-1d5784adee98', '5465389c-bba7-4af1-bc9a-9fbb201e8408'],
                multiple: true,
                searchPlaceholder: 'Search IIIF and 3D resources...'
              }
            }]
          }]
        },
        {
          title: 'Summary',
          name: 'crs-assignment-summary',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'crs-assignment-summary-step',
              uniqueInstanceName: 'crs-assignment-summary-instance',
              tilesManaged: 'none',
              parameters: {
                crsId: "['crs-selection']['crs-selection-instance']['value']",
                crsName: "['crs-selection']['crs-selection-instance']['selectedResourceName']",
                resourceIds: "['resource-selection']['resource-selection-instance']['value']",
                selectedResources: "['resource-selection']['resource-selection-instance']['selectedResources']"
              }
            }]
          }]
        },
      ];

      const WF = Workflow && Workflow.default ? Workflow.default : Workflow;
      WF.apply(this, [params]);
    },
    template: workflowTemplate
  });
});