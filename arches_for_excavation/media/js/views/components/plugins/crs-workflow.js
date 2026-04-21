define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/crs-workflow.htm',
  'views/components/workflows/universal/crs-creation-from-two-points-step',
], function(ko, $, arches, Workflow, workflowTemplate) {
  return ko.components.register('crs-workflow', {
    viewModel: function(params) {
      this.componentName = 'crs-workflow';
      this.quitUrl = (arches && arches.urls && arches.urls.plugin)
        ? arches.urls.plugin('init-workflow')
        : '/';

      this.stepConfig = [
        {
          title: 'Create Local Coordinate System',
          name: 'crs-creation',
          required: true,
          layoutSections: [{
            componentConfigs: [{
              componentName: 'crs-creation-from-two-points-step',
              uniqueInstanceName: 'crs-creation-instance',
              tilesManaged: 'none',
              parameters: {}
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