import ko from 'knockout';
import template from 'templates/views/components/plugins/ontology-usage-explorer.htm';

import '../ontology_viewer/ontology-usage-graph-view';
import '../../../../css/components/ontology-usage-explorer/index.css';

export default ko.components.register('ontology-usage-explorer', {
    viewModel: function() {
        const self = this;

        console.log('[OntologyUsageExplorer] component created');

        self.models = ko.observableArray([]);
        self.selectedModelId = ko.observable('');
        self.modelGraph = ko.observable(null);
        self.isLoading = ko.observable(false);
        self.error = ko.observable('');
        self.selectedNode = ko.observable(null);
        self.showDetails = ko.observable(false);

        self.toggleDetails = function() {
            self.showDetails(!self.showDetails());
        };

        self.selectNode = function(node) {
            console.log('[OntologyUsageExplorer] node selected', node);
            self.selectedNode(node);
        };

        self.nodes = ko.pureComputed(() => {
            const graph = self.modelGraph();
            return graph ? graph.nodes || [] : [];
        });

        self.edges = ko.pureComputed(() => {
            const graph = self.modelGraph();
            return graph ? graph.edges || [] : [];
        });

        self.classUsage = ko.pureComputed(() => {
            const graph = self.modelGraph();
            return graph ? graph.classUsage || [] : [];
        });

        self.propertyUsage = ko.pureComputed(() => {
            const graph = self.modelGraph();
            return graph ? graph.propertyUsage || [] : [];
        });

        self.hasGraph = ko.pureComputed(() => Boolean(self.modelGraph()));

        self.loadModels = async function() {
            console.log('[OntologyUsageExplorer] loading resource models');
            self.isLoading(true);
            self.error('');

            try {
                const response = await fetch('/api/ontology-usage/models');
                console.log('[OntologyUsageExplorer] models response', {
                    ok: response.ok,
                    status: response.status
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                console.log('[OntologyUsageExplorer] models loaded', {
                    count: (data.models || []).length,
                    models: data.models || []
                });

                self.models(data.models || []);
            } catch (error) {
                console.error('[OntologyUsageExplorer] loadModels failed', error);
                self.error(`Could not load resource models: ${error.message}`);
            } finally {
                self.isLoading(false);
            }
        };

        self.loadModelGraph = async function(graphId) {
            console.log('[OntologyUsageExplorer] selected model changed', {graphId});

            if (!graphId) {
                console.log('[OntologyUsageExplorer] no model selected, clearing graph');
                self.modelGraph(null);
                self.selectedNode(null);
                return;
            }

            self.isLoading(true);
            self.error('');
            self.modelGraph(null);
            self.selectedNode(null);

            try {
                const response = await fetch(`/api/ontology-usage/models/${graphId}`);
                console.log('[OntologyUsageExplorer] graph response', {
                    graphId,
                    ok: response.ok,
                    status: response.status
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                console.log('[OntologyUsageExplorer] graph loaded', {
                    model: data.model,
                    nodes: (data.nodes || []).length,
                    edges: (data.edges || []).length,
                    classUsage: (data.classUsage || []).length,
                    propertyUsage: (data.propertyUsage || []).length
                });

                self.modelGraph(data);
            } catch (error) {
                console.error('[OntologyUsageExplorer] loadModelGraph failed', error);
                self.error(`Could not load ontology usage graph: ${error.message}`);
            } finally {
                self.isLoading(false);
            }
        };

        self.selectedModelId.subscribe(self.loadModelGraph);
        self.loadModels();
    },
    template: template
});
