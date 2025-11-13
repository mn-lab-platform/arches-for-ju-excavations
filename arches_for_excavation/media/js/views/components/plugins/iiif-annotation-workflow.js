define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/iiif-annotation-workflow.htm',
  'views/components/workflows/iiif/iiif-image-selection-step',
  'views/components/workflows/iiif/iiif-simple-annotator-step',
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('iiif-annotation-workflow', {
    viewModel: function(params) {

      this.componentName = 'iiif-annotation-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Select IIIF Image',
          name: 'image-selection',
          required: true,
          informationboxdata: { heading: 'Select Image', text: 'Choose a IIIF image to annotate' },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'iiif-image-selection-step',
              uniqueInstanceName: 'image-selection-instance',
              tilesManaged: 'none',
              parameters: {}
            }]
          }]
        },
        {
          title: 'Create Annotations',
          name: 'annotate',
          required: false,
          informationboxdata: { heading: 'Annotate Image', text: 'Draw annotations on the selected image' },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'iiif-simple-annotator-step',
              uniqueInstanceName: 'annotator-instance',
              tilesManaged: 'none',
              parameters: {
                // <- THIS is the working pattern in Arches:
                imageServiceUrl: "['image-selection']['image-selection-instance']['value']"
              }
            }]
          }]
        }
      ];

      // Apply Workflow base
      var WF = Workflow && Workflow.default ? Workflow.default : Workflow;
      WF.apply(this, [params]);
    },
    template: workflowTemplate
  });
});
