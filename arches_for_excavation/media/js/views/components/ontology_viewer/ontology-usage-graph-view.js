import ko from 'knockout';
import template from 'templates/views/components/ontology_viewer/ontology-usage-graph-view.htm';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import contextMenus from 'cytoscape-context-menus';
import edgeEditing from 'cytoscape-edge-editing';
import Konva from 'konva';
import 'cytoscape-context-menus/cytoscape-context-menus.css';

cytoscape.use(dagre);
cytoscape.use(contextMenus);
edgeEditing(cytoscape, Konva);

export default ko.components.register('ontology-usage-graph-view', {
    viewModel: function(params) {
        const self = this;

        self.graph = params.graph;
        self.onSelectNode = params.onSelectNode || function() {};
        self.diagramId = `ontology-usage-diagram-${Date.now()}`;
        self.resizeHandleId = `ontology-usage-resize-handle-${Date.now()}`;
        self.cy = null;
        self.edgeEditing = null;
        self.selectedCyNodeId = ko.observable('');
        self.layoutStatus = ko.observable('');
        self.nodeSizeOverrides = {};
        self.resizeDragState = null;

        console.log('[OntologyUsageGraph] component created', {
            diagramId: self.diagramId,
            resizeHandleId: self.resizeHandleId,
            hasObservableGraph: ko.isObservable(self.graph),
            initialGraph: ko.unwrap(self.graph)
        });

        self.downloadDataUrl = function(dataUrl, filename) {
            const link = document.createElement('a');

            link.href = dataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        self.getExportBaseName = function() {
            const graph = ko.unwrap(self.graph);
            const modelName = graph && graph.model && graph.model.name
                ? graph.model.name
                : 'ontology-usage';

            return modelName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '') || 'ontology-usage';
        };

        self.exportPng = function() {
            if (!self.cy) {
                console.warn('[OntologyUsageGraph] PNG export requested before cytoscape exists');
                return;
            }

            console.log('[OntologyUsageGraph] PNG export requested');
            self.cy.resize();
            self.cy.fit(undefined, 32);

            const dataUrl = self.cy.png({
                output: 'base64uri',
                full: true,
                scale: 2,
                bg: '#ffffff'
            });

            self.downloadDataUrl(dataUrl, `${self.getExportBaseName()}.png`);
        };

        self.exportJpg = function() {
            if (!self.cy) {
                console.warn('[OntologyUsageGraph] JPG export requested before cytoscape exists');
                return;
            }

            console.log('[OntologyUsageGraph] JPG export requested');
            self.cy.resize();
            self.cy.fit(undefined, 32);

            const dataUrl = self.cy.jpg({
                output: 'base64uri',
                full: true,
                scale: 2,
                bg: '#ffffff',
                quality: 0.95
            });

            self.downloadDataUrl(dataUrl, `${self.getExportBaseName()}.jpg`);
        };

        self.getOntologyFamily = function(uriOrCode) {
            const value = String(uriOrCode || '').toLowerCase();

            if (value.includes('crmarchaeo') || value.startsWith('ap') || value.startsWith('a')) {
                return 'CRMarchaeo';
            }

            if (value.includes('crmdig') || value.startsWith('d')) {
                return 'CRMdig';
            }

            if (value.includes('crmsci') || value.startsWith('s') || value.startsWith('o')) {
                return 'CRMsci';
            }

            if (value.includes('crmgeo') || value.startsWith('sp')) {
                return 'CRMgeo';
            }

            if (value.includes('rdf-schema') || value.includes('literal') || value === 'literal') {
                return 'Literal';
            }

            if (value.includes('cidoc-crm') || value.startsWith('e') || value.startsWith('p')) {
                return 'CIDOC CRM';
            }

            return 'Other';
        };

        self.getNodeLabel = function(node) {
            const nodeName = node.name || node.alias || node.id;
            const ontologyType = node.ontologyClassCode || 'No class';

            return `${nodeName}\n(${ontologyType})`;
        };

        self.getNodeSize = function(node) {
            const label = `${node.name || node.alias || node.id} ${node.ontologyClassCode || 'No class'}`;
            const length = label.length;
            const override = self.nodeSizeOverrides[node.id];

            if (override) {
                return override;
            }

            return {
                width: Math.min(Math.max(120, length * 4.5), 280),
                height: Math.min(Math.max(64, Math.ceil(length / 24) * 22 + 42), 160)
            };
        };

        self.getSavedLayout = function(graph) {
            return graph && graph.layout && typeof graph.layout === 'object'
                ? graph.layout
                : null;
        };

        self.getSavedNodeLayout = function(graph, nodeId) {
            const layout = self.getSavedLayout(graph);
            const nodes = layout && layout.nodes;

            return nodes && nodes[nodeId]
                ? nodes[nodeId]
                : null;
        };

        self.getSavedEdgeLayout = function(graph, edgeId) {
            const layout = self.getSavedLayout(graph);
            const edges = layout && layout.edges;

            return edges && edges[edgeId]
                ? edges[edgeId]
                : null;
        };

        self.buildDiagramElements = function(graph) {
            const nodes = (graph.nodes || []).map((node) => {
                const savedNodeLayout = self.getSavedNodeLayout(graph, node.id);
                const size = savedNodeLayout && savedNodeLayout.size
                    ? savedNodeLayout.size
                    : self.getNodeSize(node);

                const element = {
                    data: {
                        id: node.id,
                        label: self.getNodeLabel(node),
                        ontologyClassCode: node.ontologyClassCode || 'No class',
                        datatype: node.datatype || '',
                        cardName: node.card ? node.card.name : '',
                        ontologyFamily: self.getOntologyFamily(node.ontologyClass || node.ontologyClassCode),
                        width: size.width,
                        height: size.height,
                        raw: node
                    }
                };

                if (savedNodeLayout && savedNodeLayout.position) {
                    element.position = savedNodeLayout.position;
                }

                return element;
            });

            const edges = (graph.edges || []).map((edge) => {
                const savedEdgeLayout = self.getSavedEdgeLayout(graph, edge.id) || {};
                const bendDistances = savedEdgeLayout.cyedgebendeditingDistances || [];
                const bendWeights = savedEdgeLayout.cyedgebendeditingWeights || [];

                return {
                    data: {
                        id: edge.id,
                        source: edge.source,
                        target: edge.target,
                        label: edge.ontologyPropertyCode || '',
                        ontologyFamily: self.getOntologyFamily(edge.ontologyProperty || edge.ontologyPropertyCode),
                        cyedgebendeditingDistances: bendDistances,
                        cyedgebendeditingWeights: bendWeights,
                        bendPointPositions: savedEdgeLayout.bendPointPositions || [],
                        controlPointPositions: savedEdgeLayout.controlPointPositions || [],
                        raw: edge
                    },
                    classes: bendDistances.length && bendWeights.length
                        ? 'edgebendediting-hasbendpoints'
                        : ''
                };
            });

            return [...nodes, ...edges];
        };

        self.getLayoutOptions = function(graph) {
            return self.getSavedLayout(graph)
                ? {name: 'preset'}
                : {
                    name: 'dagre',
                    rankDir: 'LR',
                    nodeSep: 42,
                    rankSep: 90,
                    edgeSep: 12
                };
        };

        self.getDiagramStyle = function() {
            return [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#eef2f6',
                        'border-color': '#94a3b8',
                        'border-width': 1,
                        'shape': 'round-rectangle',
                        'label': 'data(label)',
                        'font-size': 10,
                        'font-weight': 600,
                        'text-wrap': 'wrap',
                        'text-max-width': 220,
                        'text-valign': 'top',
                        'text-halign': 'center',
                        'text-margin-y': 10,
                        'color': '#102033',
                        'width': 'data(width)',
                        'height': 'data(height)',
                        'padding': '12px'
                    }
                },
                {
                    selector: 'node:selected',
                    style: {
                        'border-color': '#1f5f9f',
                        'border-width': 3
                    }
                },
                {
                    selector: 'node[ontologyFamily = "CIDOC CRM"]',
                    style: {
                        'background-color': '#ffe8a6',
                        'border-color': '#d6b85c'
                    }
                },
                {
                    selector: 'node[ontologyFamily = "CRMarchaeo"]',
                    style: {
                        'background-color': '#f6c7a6',
                        'border-color': '#d99a6d'
                    }
                },
                {
                    selector: 'node[ontologyFamily = "CRMdig"]',
                    style: {
                        'background-color': '#c9dfb8',
                        'border-color': '#94b779'
                    }
                },
                {
                    selector: 'node[ontologyFamily = "CRMsci"]',
                    style: {
                        'background-color': '#b8dce8',
                        'border-color': '#73aebe'
                    }
                },
                {
                    selector: 'node[ontologyFamily = "CRMgeo"]',
                    style: {
                        'background-color': '#d4c3e6',
                        'border-color': '#a889c5'
                    }
                },
                {
                    selector: 'node[ontologyFamily = "Literal"]',
                    style: {
                        'background-color': '#e3e5e8',
                        'border-color': '#b7bec7'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1.5,
                        'line-color': '#9aa6b2',
                        'target-arrow-color': '#9aa6b2',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'segments',
                        'edge-distances': 'node-position',
                        'label': 'data(label)',
                        'font-size': 9,
                        'text-background-color': '#fff',
                        'text-background-opacity': 0.85,
                        'text-background-padding': 2
                    }
                },
                {
                    selector: 'edge[ontologyFamily = "CRMarchaeo"]',
                    style: {
                        'line-color': '#d99a6d',
                        'target-arrow-color': '#d99a6d'
                    }
                },
                {
                    selector: 'edge[ontologyFamily = "CRMdig"]',
                    style: {
                        'line-color': '#94b779',
                        'target-arrow-color': '#94b779'
                    }
                },
                {
                    selector: 'edge[ontologyFamily = "CRMsci"]',
                    style: {
                        'line-color': '#73aebe',
                        'target-arrow-color': '#73aebe'
                    }
                }
            ];
        };

        self.initializeEdgeEditing = function() {
            if (!self.cy || typeof self.cy.edgeEditing !== 'function') {
                console.warn('[OntologyUsageGraph] edge editing extension is not available');
                return;
            }

            self.edgeEditing = self.cy.edgeEditing({
                bendPositionsFunction: (edge) => edge.data('bendPointPositions'),
                controlPositionsFunction: (edge) => edge.data('controlPointPositions'),
                bendPointPositionsSetterFunction: (edge, positions) => {
                    edge.data('bendPointPositions', positions);
                },
                controlPointPositionsSetterFunction: (edge, positions) => {
                    edge.data('controlPointPositions', positions);
                },
                initAnchorsAutomatically: true,
                enableCreateAnchorOnDrag: true,
                enableRemoveAnchorMidOfNearLine: true,
                handleReconnectEdge: false,
                handleAnchors: true,
                addBendMenuItemTitle: 'Add Bend Point',
                removeBendMenuItemTitle: 'Remove Bend Point',
                removeAllBendMenuItemTitle: 'Remove All Bend Points',
                addControlMenuItemTitle: null,
                removeControlMenuItemTitle: null,
                removeAllControlMenuItemTitle: null,
                anchorColor: '#1f5f9f',
                endPointColor: '#1f5f9f',
                zIndex: 4
            });

            console.log('[OntologyUsageGraph] edge editing initialized', {
                initialized: self.cy.edgeEditing('initialized')
            });
        };

        self.getCurrentGraphId = function() {
            const graph = ko.unwrap(self.graph);

            return graph && graph.model
                ? graph.model.graphid
                : null;
        };

        self.collectLayoutState = function() {
            const nodes = {};
            const edges = {};

            if (!self.cy) {
                return null;
            }

            self.cy.nodes().forEach((node) => {
                nodes[node.id()] = {
                    position: node.position(),
                    size: {
                        width: Number(node.data('width')) || node.width(),
                        height: Number(node.data('height')) || node.height()
                    }
                };
            });

            self.cy.edges().forEach((edge) => {
                edges[edge.id()] = {
                    cyedgebendeditingDistances: edge.data('cyedgebendeditingDistances') || [],
                    cyedgebendeditingWeights: edge.data('cyedgebendeditingWeights') || [],
                    bendPointPositions: edge.data('bendPointPositions') || [],
                    controlPointPositions: edge.data('controlPointPositions') || []
                };
            });

            return {
                version: 1,
                savedAt: new Date().toISOString(),
                viewport: {
                    pan: self.cy.pan(),
                    zoom: self.cy.zoom()
                },
                nodes,
                edges
            };
        };

        self.saveLayout = async function() {
            const graphId = self.getCurrentGraphId();
            const layout = self.collectLayoutState();

            if (!graphId || !layout) {
                self.layoutStatus('Nothing to save');
                return;
            }

            self.layoutStatus('Saving view...');

            try {
                const response = await fetch(`/api/ontology-usage/models/${graphId}/layout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({layout})
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const graph = ko.unwrap(self.graph);

                if (graph) {
                    graph.layout = layout;
                }

                console.log('[OntologyUsageGraph] layout saved', layout);
                self.layoutStatus('View saved');
            } catch (error) {
                console.error('[OntologyUsageGraph] save layout failed', error);
                self.layoutStatus(`Save failed: ${error.message}`);
            }
        };

        self.resetSavedLayout = async function() {
            const graphId = self.getCurrentGraphId();
            const graph = ko.unwrap(self.graph);

            if (!graphId || !graph) {
                self.layoutStatus('Nothing to reset');
                return;
            }

            self.layoutStatus('Resetting saved view...');

            try {
                const response = await fetch(`/api/ontology-usage/models/${graphId}/layout`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                graph.layout = null;
                self.nodeSizeOverrides = {};
                self.renderDiagram(graph);
                self.layoutStatus('Saved view reset');
            } catch (error) {
                console.error('[OntologyUsageGraph] reset layout failed', error);
                self.layoutStatus(`Reset failed: ${error.message}`);
            }
        };

        self.getResizeHandle = function() {
            return document.getElementById(self.resizeHandleId);
        };

        self.hideResizeHandle = function() {
            const handle = self.getResizeHandle();

            if (handle) {
                handle.style.display = 'none';
            }
        };

        self.syncResizeHandle = function() {
            const handle = self.getResizeHandle();

            if (!handle || !self.cy || !self.selectedCyNodeId()) {
                self.hideResizeHandle();
                return;
            }

            const node = self.cy.getElementById(self.selectedCyNodeId());

            if (!node || node.empty()) {
                self.hideResizeHandle();
                return;
            }

            const position = node.renderedPosition();

            handle.style.display = 'block';
            handle.style.left = `${position.x + node.renderedWidth() / 2 - 7}px`;
            handle.style.top = `${position.y + node.renderedHeight() / 2 - 7}px`;
        };

        self.syncOverlays = function() {
            window.requestAnimationFrame(() => {
                self.syncResizeHandle();
            });
        };

        self.getPointerPosition = function(event) {
            return {
                x: event.clientX,
                y: event.clientY
            };
        };

        self.setNodeSize = function(node, size) {
            const nextSize = {
                width: Math.round(Math.max(size.width, 80)),
                height: Math.round(Math.max(size.height, 48))
            };

            self.nodeSizeOverrides[node.id()] = nextSize;
            node.data(nextSize);
            self.syncOverlays();

            return nextSize;
        };

        self.attachResizeHandle = function() {
            const handle = self.getResizeHandle();

            if (!handle || handle.dataset.bound === 'true') {
                return;
            }

            handle.dataset.bound = 'true';

            handle.addEventListener('pointerdown', (event) => {
                if (!self.cy || !self.selectedCyNodeId()) {
                    return;
                }

                const node = self.cy.getElementById(self.selectedCyNodeId());

                if (!node || node.empty()) {
                    return;
                }

                const pointer = self.getPointerPosition(event);

                self.resizeDragState = {
                    nodeId: node.id(),
                    startX: pointer.x,
                    startY: pointer.y,
                    startWidth: Number(node.data('width')) || node.width(),
                    startHeight: Number(node.data('height')) || node.height()
                };

                console.log('[OntologyUsageGraph] node resize drag started', self.resizeDragState);

                handle.setPointerCapture(event.pointerId);
                event.preventDefault();
                event.stopPropagation();
            });

            handle.addEventListener('pointermove', (event) => {
                if (!self.resizeDragState || !self.cy) {
                    return;
                }

                const node = self.cy.getElementById(self.resizeDragState.nodeId);

                if (!node || node.empty()) {
                    return;
                }

                const pointer = self.getPointerPosition(event);
                const zoom = self.cy.zoom() || 1;
                const nextSize = {
                    width: self.resizeDragState.startWidth + (pointer.x - self.resizeDragState.startX) / zoom,
                    height: self.resizeDragState.startHeight + (pointer.y - self.resizeDragState.startY) / zoom
                };

                self.setNodeSize(node, nextSize);
                event.preventDefault();
                event.stopPropagation();
            });

            handle.addEventListener('pointerup', (event) => {
                if (!self.resizeDragState) {
                    return;
                }

                const nodeId = self.resizeDragState.nodeId;

                self.resizeDragState = null;
                console.log('[OntologyUsageGraph] node resize drag finished', {
                    nodeId,
                    size: self.nodeSizeOverrides[nodeId]
                });

                self.refreshEdgeEditing();
                event.preventDefault();
                event.stopPropagation();
            });

            handle.addEventListener('pointercancel', () => {
                self.resizeDragState = null;
            });
        };

        self.renderDiagram = function(graph, attempt = 0) {
            self.selectedCyNodeId('');
            self.hideResizeHandle();
            self.layoutStatus(self.getSavedLayout(graph) ? 'Saved view loaded' : '');

            console.log('[OntologyUsageGraph] render requested', {
                attempt,
                hasGraph: Boolean(graph),
                nodeCount: graph ? (graph.nodes || []).length : 0,
                edgeCount: graph ? (graph.edges || []).length : 0
            });

            window.setTimeout(() => {
                const container = document.getElementById(self.diagramId);

                if (!container) {
                    console.warn('[OntologyUsageGraph] diagram container not found', {
                        diagramId: self.diagramId,
                        attempt
                    });
                    return;
                }

                console.log('[OntologyUsageGraph] diagram container found', {
                    diagramId: self.diagramId,
                    clientWidth: container.clientWidth,
                    clientHeight: container.clientHeight,
                    offsetWidth: container.offsetWidth,
                    offsetHeight: container.offsetHeight
                });

                if ((!container.clientWidth || !container.clientHeight) && attempt < 3) {
                    console.warn('[OntologyUsageGraph] diagram container has no size, retrying render', {
                        diagramId: self.diagramId,
                        attempt
                    });

                    window.setTimeout(() => {
                        self.renderDiagram(graph, attempt + 1);
                    }, 250);
                    return;
                }

                if (self.cy) {
                    self.cy.destroy();
                    self.cy = null;
                    self.edgeEditing = null;
                }

                const elements = self.buildDiagramElements(graph);

                console.log('[OntologyUsageGraph] cytoscape elements built', {
                    elementCount: elements.length,
                    nodeCount: elements.filter((element) => !element.data.source).length,
                    edgeCount: elements.filter((element) => element.data.source).length,
                    firstElement: elements[0]
                });

                try {
                    self.cy = cytoscape({
                        container,
                        elements,
                        style: self.getDiagramStyle(),
                        layout: self.getLayoutOptions(graph)
                    });
                } catch (error) {
                    console.error('[OntologyUsageGraph] cytoscape render failed', error, {
                        diagramId: self.diagramId,
                        elements
                    });
                    return;
                }

                window.ontologyUsageCy = self.cy;
                self.attachResizeHandle();
                self.initializeEdgeEditing();

                console.log('[OntologyUsageGraph] cytoscape created', {
                    nodes: self.cy.nodes().length,
                    edges: self.cy.edges().length,
                    width: self.cy.width(),
                    height: self.cy.height(),
                    zoom: self.cy.zoom(),
                    pan: self.cy.pan()
                });

                self.cy.on('tap', (event) => {
                    if (event.target === self.cy) {
                        self.selectedCyNodeId('');
                        self.onSelectNode(null);
                        self.syncOverlays();
                    }
                });

                self.cy.on('tap', 'node', (event) => {
                    self.selectedCyNodeId(event.target.id());
                    console.log('[OntologyUsageGraph] cytoscape node tapped', event.target.data('raw'));
                    self.onSelectNode(event.target.data('raw'));
                    self.syncOverlays();
                });

                self.cy.on('render zoom pan position layoutstop resize', self.syncOverlays);
                self.syncOverlays();

                window.setTimeout(() => {
                    const savedLayout = self.getSavedLayout(graph);

                    self.cy.resize();

                    if (savedLayout && savedLayout.viewport) {
                        self.cy.zoom(savedLayout.viewport.zoom);
                        self.cy.pan(savedLayout.viewport.pan);
                    } else {
                        self.cy.fit(undefined, 32);
                    }

                    self.syncOverlays();

                    console.log('[OntologyUsageGraph] cytoscape fitted', {
                        width: self.cy.width(),
                        height: self.cy.height(),
                        zoom: self.cy.zoom(),
                        pan: self.cy.pan(),
                        boundingBox: self.cy.elements().boundingBox()
                    });
                }, 100);
            }, 0);
        };

        self.runLayout = function() {
            if (!self.cy) {
                console.warn('[OntologyUsageGraph] layout requested before cytoscape exists');
                return;
            }

            console.log('[OntologyUsageGraph] layout requested');
            self.cy.layout({
                name: 'dagre',
                rankDir: 'LR',
                nodeSep: 42,
                rankSep: 90,
                edgeSep: 12
            }).run();
        };

        self.runCurrentLayout = function() {
            if (!self.cy) {
                return;
            }

            self.cy.layout({
                name: 'dagre',
                rankDir: 'LR',
                nodeSep: 42,
                rankSep: 90,
                edgeSep: 12
            }).run();
        };

        self.refreshEdgeEditing = function() {
            if (!self.cy) {
                return;
            }

            self.cy.resize();
            self.cy.edges().trigger('data');
            self.syncOverlays();
        };

        self.fitDiagram = function() {
            if (self.cy) {
                console.log('[OntologyUsageGraph] fit requested');
                self.cy.resize();
                self.cy.fit(undefined, 32);
            } else {
                console.warn('[OntologyUsageGraph] fit requested before cytoscape exists');
            }
        };

        if (ko.isObservable(self.graph)) {
            self.graph.subscribe((graph) => {
                console.log('[OntologyUsageGraph] graph observable update', {
                    hasGraph: Boolean(graph),
                    nodeCount: graph ? (graph.nodes || []).length : 0,
                    edgeCount: graph ? (graph.edges || []).length : 0
                });

                if (graph) {
                    self.renderDiagram(graph);
                }
            });
        }

        const graph = ko.unwrap(self.graph);
        console.log('[OntologyUsageGraph] initial graph unwrap', {
            hasGraph: Boolean(graph),
            nodeCount: graph ? (graph.nodes || []).length : 0,
            edgeCount: graph ? (graph.edges || []).length : 0
        });

        if (graph) {
            self.renderDiagram(graph);
        }
    },
    template: template
});
