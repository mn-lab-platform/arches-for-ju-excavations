define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/pottery-record-import-workflow.htm',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/pottery-record-import/pottery-record-import-step'
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('pottery-record-import-workflow', {
    viewModel: function(params) {
      this.componentName = 'pottery-record-import-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Select Pottery Collection',
          name: 'pottery-collection-selection',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-selection-step',
              uniqueInstanceName: 'pottery-collection-selector',
              tilesManaged: 'none',
              parameters: {
                graphId: '55777e89-af36-44f5-b699-d7b90d08a1e8',
                searchPlaceholder: 'Search for a Pottery Collection resource...'
              }
            }]
          }]
        },
        {
          title: 'Pottery Record XLSX',
          name: 'pottery-record-import',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'pottery-record-import-step',
              uniqueInstanceName: 'pottery-record-import-instance',
              tilesManaged: 'none',
              parameters: {
                selectedPotteryCollectionResourceId: "['pottery-collection-selection']['pottery-collection-selector']['value']",
                recordTypes: [
                  { value: 'amphorae', label: 'Amphorae' },
                  { value: 'storage-vessel', label: 'Storage Vessel' },
                  { value: 'table-ware', label: 'Table Ware' }
                ]
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
