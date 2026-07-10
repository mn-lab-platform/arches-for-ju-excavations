define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/pottery-csv-upload-workflow.htm',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/pottery-csv-upload/pottery-csv-upload-step',
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('pottery-csv-upload-workflow', {
    viewModel: function(params) {
      this.componentName = 'pottery-csv-upload-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Select Context',
          name: 'context-selection',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-selection-step',
              uniqueInstanceName: 'context-selector',
              tilesManaged: 'none',
              parameters: {
                graphId: 'd6559924-9f52-11eb-96c4-020063fe0012',
                searchPlaceholder: 'Search for a Context resource...'
              }
            }]
          }]
        },
        {
          title: 'Pottery Collection File',
          name: 'pottery-csv-upload',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'pottery-csv-upload-step',
              uniqueInstanceName: 'pottery-csv-upload-instance',
              tilesManaged: 'none',
              parameters: {
                selectedContextResourceId: "['context-selection']['context-selector']['value']"
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
