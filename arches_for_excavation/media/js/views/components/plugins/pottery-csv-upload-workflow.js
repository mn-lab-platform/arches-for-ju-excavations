define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/pottery-csv-upload-workflow.htm',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/pottery-csv-upload/pottery-csv-upload-step',
  'views/components/workflows/universal/components/workflow-success-summary-step',
  'views/components/workflows/universal/components/finish-on-summary'
], function(ko, $, arches, Workflow, workflowTemplate, _resourceSelection, _potteryStep, _summaryStep, finishOnSummary) {
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
                graphIds: ['2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c'],
                searchPlaceholder: 'Search for an (O) Context resource...'
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
        },
        {
          title: 'Summary',
          name: 'summary',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'workflow-success-summary-step',
              uniqueInstanceName: 'pottery-csv-summary-instance',
              tilesManaged: 'none',
              parameters: {
                resourceId: "['pottery-csv-upload']['pottery-csv-upload-instance']['value']",
                successMessage: 'Pottery Collection saved successfully!'
              }
            }]
          }]
        }
      ];

      const WF = Workflow && Workflow.default ? Workflow.default : Workflow;
      WF.apply(this, [params]);
      finishOnSummary(this);
    },
    template: workflowTemplate
  });
});
