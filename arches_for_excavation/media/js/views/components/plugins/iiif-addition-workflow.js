define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/iiif-addition-workflow.htm',
  'views/components/workflows/iiif-addition/iiif-image-addition-step',
  'views/components/workflows/universal/resource-selection-step',
], function(ko, $, arches, Workflow, workflowTemplate) {

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
                placeholderText: '— Select which resource —',
                searchPlaceholder: 'Search resources...',
                enableSearch: true,
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
          title: 'Add DEM (optional)',
          name: 'dem-addition',
          required: false,
          informationboxdata: {
            heading: 'Add DEM (optional)',
            text: 'Upload/select a DEM-derived visualization (hillshade/color relief recommended for IIIF) and link it to the same target resource. DEM manifest will get related -> ortho.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'iiif-image-addition-step',
              uniqueInstanceName: 'dem-addition-instance',
              tilesManaged: 'none',
              parameters: {
                hostResourceId: "['resource-selection']['resource-selection-instance']['value']",
                assetType: 'dem',
                optional: true,
                stepTitle: 'Add DEM (optional)',
                labelPrefix: 'DEM: ',

                // DEM knows ORTHO globalid from step 2:
                relatedManifestGlobalId: "['iiif-image-selection']['iiif-image-addition-instance']['value']['manifestGlobalId']"
              }
            }]
          }]
        }
      ];

      var WF = Workflow && Workflow.default ? Workflow.default : Workflow;
      WF.apply(this, [params]);
    },
    template: workflowTemplate
  });
});
