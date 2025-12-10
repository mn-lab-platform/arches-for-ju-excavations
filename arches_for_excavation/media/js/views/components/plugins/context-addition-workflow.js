define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/context-addition-workflow.htm',
  'views/components/workflows/universal/resource-creation-step',
  'views/components/workflows/context-addition/coordinates-addition-step'
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('context-addition-workflow', {
    viewModel: function(params) {
      this.componentName = 'context-addition-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Create Context Resource',
          name: 'resource-creation',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'resource-creation-step',
              uniqueInstanceName: 'resource-creator',
              tilesManaged: 'none',
              parameters: {
                graphid: 'd6559924-9f52-11eb-96c4-020063fe0012',
                graphName: 'Context',
              }
            }]
          }]
        },
        {
          title: 'Add Coordinates to Context',
          name: 'coordinates-addition',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'coordinates-addition-step',
              uniqueInstanceName: 'coordinates-adder',
              tilesManaged: 'none',
              parameters: {
                createdResourceId: "['resource-creation']['resource-creator']['value']"
              }
            }]
          }]
        },
      ];

      const WF = Workflow && Workflow.default ? Workflow.default : Workflow;
      WF.apply(this, [params]);
    },
    template: workflowTemplate
  });
});