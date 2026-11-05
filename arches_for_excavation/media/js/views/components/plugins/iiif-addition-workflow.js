define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/iiif-addition-workflow.htm',
  'views/components/workflows/iiif-addition/iiif-image-addition-step',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/universal/components/workflow-success-summary-step',
  'views/components/workflows/universal/components/finish-on-summary'
], function(ko, $, arches, Workflow, workflowTemplate, _addition, _selection, _summary, finishOnSummary) {

  return ko.components.register('iiif-addition-workflow', {
    viewModel: function(params) {

      this.componentName = 'iiif-addition-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Select Resource',
          name: 'resource-selection',
          required: true,
          informationboxdata: {
            heading: 'Select Resource',
            text: 'Choose an existing resource to attach a IIIF image to.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-selection-step',
              uniqueInstanceName: 'resource-selection-instance',
              tilesManaged: 'none',
              parameters: {
                graphIds: ['d6559924-9f52-11eb-96c4-020063fe0012', '2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c'],
                placeholderText: '— Select which resource —',
                searchPlaceholder: 'Search resources...',
                enableSearch: true,
                multiple: true,
                resultLimit: 50
              }
            }]
          }]
        },

        {
          title: 'Add IIIF Image',
          name: 'iiif-image-selection',
          required: true,
          informationboxdata: {
            heading: 'Select or upload IIIF image',
            text: 'Upload/select an image and create a “digital resource: iiif” linked to the resource from step 1.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'iiif-image-addition-step',
              uniqueInstanceName: 'iiif-image-addition-instance',
              tilesManaged: 'none',
              parameters: {
                hostResourceId: "['resource-selection']['resource-selection-instance']['value']",
                assetType: 'iiif',
                optional: false
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
              uniqueInstanceName: 'iiif-addition-summary-instance',
              tilesManaged: 'none',
              parameters: {
                resourceId: "['iiif-image-selection']['iiif-image-addition-instance']['digitalResourceId']",
                successMessage: 'IIIF image added successfully!'
              }
            }]
          }]
        }
      ];

      var WF = Workflow && Workflow.default ? Workflow.default : Workflow;
      WF.apply(this, [params]);
      finishOnSummary(this);
    },
    template: workflowTemplate
  });
});
