define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/iiif-append-workflow.htm',
  'views/components/workflows/iiif-append/iiif-image-append-step',
  'views/components/workflows/universal/resource-selection-step'
], function(ko, $, arches, Workflow, workflowTemplate) {
  'use strict';

  return ko.components.register('iiif-append-workflow', {
    viewModel: function(params) {
      this.componentName = 'iiif-append-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Select existing IIIF resource',
          name: 'resource-selection',
          required: true,
          informationboxdata: {
            heading: 'Select existing IIIF resource',
            text: 'Choose the existing IIIF digital resource that should receive additional GeoTIFF/photo items.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-selection-step',
              uniqueInstanceName: 'resource-selection-instance',
              tilesManaged: 'none',
              parameters: {
                placeholderText: '— Select existing IIIF resource —',
                searchPlaceholder: 'Search IIIF resources...',
                enableSearch: true,
                resultLimit: 50,
                graphId: "401b3051-d1c4-465c-8dd0-1d5784adee98"
              }
            }]
          }]
        },
        {
          title: 'Append files to existing IIIF resource',
          name: 'iiif-image-append',
          required: true,
          informationboxdata: {
            heading: 'Append files to existing IIIF resource',
            text: 'Upload additional GeoTIFF/photo files and append new canvases to the existing manifest.'
          },
          layoutSections: [{
            componentConfigs: [{
              componentName: 'iiif-image-append-step',
              uniqueInstanceName: 'iiif-image-append-instance',
              tilesManaged: 'none',
              parameters: {
                existingResourceId: "['resource-selection']['resource-selection-instance']['value']",
                assetType: 'iiif',
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