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
                graphIds: ['ac939663-80ce-43df-967d-42def45ef333', 'aeeea75c-9251-45fe-9fa6-85e5153e9091', 'c09880b6-f404-4747-8038-a53938093437', '61b403ae-906c-4cba-ab64-8393c91561d1', '08c52b0f-c734-455b-aaef-e2f70ddae793', '124255a2-f11d-4a52-94f4-a06b791c4a60'],
                placeholderText: 'Select resource',
                searchPlaceholder: 'Search resources...',
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
