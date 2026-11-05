define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',

  'templates/views/components/plugins/iiif-annotation-workflow.htm',
  'viewmodels/workflow-step',  
  'views/components/workflows/iiif-annotation/iiif-annotator-step',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/universal/components/workflow-success-summary-step',
  'views/components/workflows/universal/components/finish-on-summary'
], function(ko, $, arches, Workflow, workflowTemplate, _workflowStep, _annotator, _selection, _summary, finishOnSummary) {
  // Workflow steps register their Knockout components when imported.
  
  return ko.components.register('iiif-annotation-workflow', {
    viewModel: function(params) {
      this.componentName = 'iiif-annotation-workflow';
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
                graphIds: ['401b3051-d1c4-465c-8dd0-1d5784adee98', 'f1b9e37a-c3ba-4c26-a797-7f16302c031c'],                
                placeholderText: '— Select which ortomap to annotate —',
                searchPlaceholder: 'Search resources...',
                enableSearch: true,
                resultLimit: 50
              }
            }]
          }]
        },
        {
          title: 'Add annotation to IIIF',
          name: 'iiif-image-selection',
          required: true,
          informationboxdata: {
            heading: 'Select or upload IIIF image',
            text: 'Upload/select an image and create a “digital resource: iiif” linked to the resource from step 1.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'iiif-annotator-step',
              uniqueInstanceName: 'iiif-annotator-instance',
              tilesManaged: 'none',
              parameters: {
                hostResourceId: "['resource-selection']['resource-selection-instance']['value']"
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
              uniqueInstanceName: 'iiif-annotation-summary-instance',
              tilesManaged: 'none',
              parameters: {
                resourceId: "['iiif-image-selection']['iiif-annotator-instance']['digitalResourceId']",
                successMessage: 'IIIF annotations saved successfully!'
              }
            }]
          }]
        }
      ];

      // Apply Workflow base
      var WF = Workflow && Workflow.default ? Workflow.default : Workflow;
      WF.apply(this, [params]);
      finishOnSummary(this);
    },
    template: workflowTemplate
  });
});
