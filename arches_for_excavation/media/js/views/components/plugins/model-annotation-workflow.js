define([
  'knockout',
  'jquery',
  'arches',
  'viewmodels/workflow',
  'templates/views/components/plugins/model-annotation-workflow.htm',
  'views/components/workflows/universal/process-selection-step',
  'views/components/workflows/model-annotation/model-annotator-step',
  'views/components/workflows/model-annotation/annotation-form-step',
  'views/components/workflows/universal/components/workflow-success-summary',
  'views/components/workflows/universal/resource-selection-step',
  'views/components/workflows/model-annotation/resource-type-selection-step',
  'views/components/workflows/model-annotation/resource-creation-step',
  'views/components/workflows/model-annotation/summary-step'
], function(ko, $, arches, Workflow, workflowTemplate) {  
  return ko.components.register('model-annotation-workflow', {
    viewModel: function(params) {
        this.componentName = 'model-annotation-workflow';
        this.quitUrl = (arches && arches.urls && arches.urls.plugin)
            ? arches.urls.plugin('init-workflow')
            : '/';

        this.stepConfig = [
            {
            title: 'Step 1',
            name: 'resource-selection',
            required: true,
            layoutSections: [{
                componentConfigs: [{
                componentName: 'resource-selection-step',
                uniqueInstanceName: 'resource-selection-instance',
                tilesManaged: 'none',
                parameters: {
                    graphIds: ['5465389c-bba7-4af1-bc9a-9fbb201e8408', '039f5a45-82e2-4597-8609-d24c758bfd59'],                
                    searchPlaceholder: 'Search resources...',
                }
                }]
            }]
            },
            {
            title: 'Step 2',
            name: 'process-selection',
            required: true,
            layoutSections: [{
                componentConfigs: [{
                    componentName: 'process-selection-step',
                    uniqueInstanceName: 'process-selection-instance',
                    tilesManaged: 'none',
                    parameters: {
                        cards: [
                            {
                                id: 'add',
                                label: 'Add a New Annotation',
                                icon: 'fa fa-plus'
                            },
                            {
                                id: 'edit',
                                label: 'Edit Existing Annotations',
                                icon: 'fa fa-edit'
                            }
                        ]
                    }
                    }]
                }]
            },
            {
            title: 'Step 3',
            name: 'model-annotator',
            required: true,
            layoutSections: [{
                componentConfigs: [{
                componentName: 'model-annotator-step',
                uniqueInstanceName: 'model-annotator-instance',
                tilesManaged: 'none',
                parameters: {
                    mode: "['process-selection']['process-selection-instance']['value']",
                    parentResourceId: "['resource-selection']['resource-selection-instance']['value']"
                }
                }]
            }]
            },
            {
                title: 'Step 4',
                name: 'annotation-configuration',
                required: true,
                layoutSections: [{
                    componentConfigs: [{
                        componentName: 'annotation-form-step',
                        uniqueInstanceName: 'annotation-configuration-instance',
                        tilesManaged: 'none',
                        parameters: {
                            annotationData: "['model-annotator']['model-annotator-instance']['value']",
                            modelResourceId: "['resource-selection']['resource-selection-instance']['value']",
                            mode: "['process-selection']['process-selection-instance']['value']"
                        }
                    }]
                }]
            },
            {
                title: 'Step 5',
                name: 'annotation-type-selection',
                required: true,
                layoutSections: [{
                    componentConfigs: [{
                        componentName: 'process-selection-step',
                        uniqueInstanceName: 'annotation-type-selection-instance',
                        tilesManaged: 'none',
                        parameters: {
                            cards: [
                                {
                                    id: 'annotation',
                                    label: 'Create Plain Annotation',
                                    icon: 'fa fa-sticky-note'
                                },
                                {
                                    id: 'resource',
                                    label: 'Create Annotation and Associate with Resource',
                                    icon: 'fa fa-cubes'
                                }
                            ]
                        }
                    }]
                }]
            },
            {
                title: 'Step 6',
                name: 'resource-type-selection',
                required: true,
                layoutSections: [{
                    componentConfigs: [{
                        componentName: 'resource-type-selection-step',
                        uniqueInstanceName: 'resource-type-selection-instance',
                        tilesManaged: 'none',
                        parameters: {
                            mode: "['annotation-type-selection']['annotation-type-selection-instance']['value']",
                            annotationData: "['annotation-configuration']['annotation-configuration-instance']['value']",
                            modelResourceId: "['resource-selection']['resource-selection-instance']['value']"
                        }
                    }]
                }]
            },
            {
                title: 'Step 7',
                name: 'resource-creation',
                required: true,
                layoutSections: [{
                    componentConfigs: [{
                        componentName: 'resource-creation-step',
                        uniqueInstanceName: 'resource-creation-instance',
                        tilesManaged: 'none',
                        parameters: {
                            targetGraphId: "['resource-type-selection']['resource-type-selection-instance']['value']",
                            annotationData: "['annotation-configuration']['annotation-configuration-instance']['value']",
                        }
                    }]
                }]
            },
            {
                title: 'Step 8',
                name: 'summary',
                required: true,
                layoutSections: [{
                    componentConfigs: [{
                        componentName: 'model-annotation-summary-step',
                        uniqueInstanceName: 'model-annotation-summary-instance',
                        tilesManaged: 'none',
                        parameters: {
                            annotationData: "['annotation-configuration']['annotation-configuration-instance']['value']",
                            successMessage: "Annotation created successfully and linked to the resource!"
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
