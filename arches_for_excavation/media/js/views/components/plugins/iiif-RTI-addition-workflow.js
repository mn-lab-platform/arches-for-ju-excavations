define([
  'knockout',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/iiif-addition-workflow.htm',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/iiif-RTI-addition/iiif-rti-upload-step',
  'views/components/workflows/iiif-RTI-addition/iiif-rti-adjustment-step'
], function(ko, arches, Workflow, workflowTemplate) {
  'use strict';

  return ko.components.register('iiif-RTI-addition-workflow', {
    viewModel: function(params) {
      this.componentName = 'iiif-RTI-addition-workflow';

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
            text: 'Choose an existing resource to attach an RTI IIIF asset to.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-selection-step',
              uniqueInstanceName: 'resource-selection-instance',
              tilesManaged: 'none',
              parameters: {
                graphIds: ['d6559924-9f52-11eb-96c4-020063fe0012', '2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c'],
                placeholderText: 'Select resource',
                searchPlaceholder: 'Search resources...',
                enableSearch: true,
                resultLimit: 50
              }
            }]
          }]
        },
        {
          title: 'Upload RTI Package',
          name: 'rti-upload',
          required: true,
          informationboxdata: {
            heading: 'Upload RTI Package',
            text: 'Upload a ZIP containing JPG planes and Relight info.json.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'iiif-rti-upload-step',
              uniqueInstanceName: 'iiif-rti-upload-instance',
              tilesManaged: 'none',
              parameters: {
                hostResourceId: "['resource-selection']['resource-selection-instance']['value']",
                optional: false
              }
            }]
          }]
        },
        {
          title: 'Adjust RTI View',
          name: 'rti-adjustment',
          required: true,
          informationboxdata: {
            heading: 'Adjust RTI View',
            text: 'Set rotation and crop values before saving the RTI manifest.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'iiif-rti-adjustment-step',
              uniqueInstanceName: 'iiif-rti-adjustment-instance',
              tilesManaged: 'none',
              parameters: {
                rtiResourceId: "['rti-upload']['iiif-rti-upload-instance']['digitalResourceId']",
                manifestUrl: "['rti-upload']['iiif-rti-upload-instance']['manifestUrl']",
                metadataUrl: "['rti-upload']['iiif-rti-upload-instance']['metadataUrl']",
                planes: "['rti-upload']['iiif-rti-upload-instance']['planes']",
                optional: false
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
