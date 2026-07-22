define([
    'knockout',
    'arches',
    'templates/views/components/workflows/model-annotation/resource-creation-step.htm',
    '../../../../services/resource-service',
    '../../../../services/tile-service',
], function(ko, arches, template, resourceServiceModule, tileServiceModule) {
    function viewModel(params) {
        const self = this;
        const resourceService = resourceServiceModule.default || resourceServiceModule;
        const tileService = tileServiceModule.default || tileServiceModule;

        self.ANNOTATION_RELATED_NODE_ID = 'a2ef2d24-20ae-4070-b11b-207834905809';
        self.ANNOTATION_GEOMETRY_NODE_ID = '2586e7f6-3610-4666-bc27-7efe9639dcaf';
        self.ANNOTATION_COLOR_NODE_ID = '2a0b5108-ef64-47e3-9460-61c064e397b1';

        self.value = params.value;
        self.useCreateMode = ko.observable(false);
        self.annotationResourceId = params.annotationData.id;

        self.selectedGraphId = params.targetGraphId;

        self.loading = ko.observable(false);
        self.successMessage = ko.observable('');
        self.errorMessage = ko.observable('');
        self.error = ko.observable('');
        self.allResources = ko.observableArray([]);
        self.selectedResourceId = ko.observable(null);
        self.createdResourceId = ko.observable(null);
        self.createdResourceId.subscribe(function() {
            self.value(self.createdResourceId());
            self.showInstallButtons(false);
            self.successMessage('Resource created successfully! You can move on to the next step.');
            self.linkCreatedResourceToAnnotation(self.annotationResourceId, self.createdResourceId())
        });
        self.showInstallButtons = ko.observable(true);

        self.showInstallButtons.subscribe(function() {
            if (self.showInstallButtons()) {
                if (self.installButtonsDOMElement) {
                    self.installButtonsDOMElement.style.display = 'flex';
                }
            } else {
                if (self.installButtonsDOMElement) {
                    self.installButtonsDOMElement.style.display = 'none';
                } 
            }
        });

        self.resources = ko.pureComputed(function() {
            return self.allResources();
        });

        self.installButtonsDOMElement = document.querySelector('.resource-creator-panel .install-buttons');

        self.isSelected = function(resource) {
            return resource && self.selectedResourceId() === resource.id;
        };

        self.selectResource = function(resource) {
            if (!resource || !resource.id) {
                return;
            }

            self.selectedResourceId(resource.id);

            if (ko.isObservable(self.value)) {
                self.value(resource.id);
            }

            if (params.form) {
                params.form.resourceid = resource.id;

                if (typeof params.form.value === 'function') {
                    params.form.value(resource.id);
                }
            }
        };

        self.loadResources = function() {
            const graphId = ko.unwrap(self.selectedGraphId);

            self.loading(true);
            self.error('');

            return resourceService.getAll(graphId)
                .then(function(data) {
                    const hits = (((data || {}).results || {}).hits || {}).hits || [];

                    self.allResources(hits.map(function(hit) {
                        const row = hit._source || {};
                        let graphName = 'Unknown Resource Type';

                        if (row.graph_id && arches.default && arches.default.resources) {
                            const graphInfo = arches.default.resources.find(function(graph) {
                                return graph.graphid === row.graph_id;
                            });

                            if (graphInfo) {
                                graphName = graphInfo.name || graphName;
                            }
                        }

                        return {
                            id: row.resourceinstanceid,
                            name: row.displayname || row.resourceinstanceid,
                            description: row.displaydescription || '',
                            graphId: row.graph_id || null,
                            graphName: graphName
                        };
                    }));
                })
                .catch(function(err) {
                    self.error('Failed to load resources: ' + err.message);
                    self.allResources([]);
                })
                .finally(function() {
                    self.loading(false);
                });
        };

        self.linkCreatedResourceToAnnotation = function(annotationResourceId, createdResourceId) {
            if (!annotationResourceId || !createdResourceId) {
                return Promise.resolve();
            }
            
            const relatedTileId = params.annotationData.relatedTileId;
            let relatedResources = params.annotationData.relatedResources || [];

            if (!Array.isArray(relatedResources)) {
                relatedResources = [relatedResources];
            }

            const isAlreadyLinked = relatedResources.some(rel =>
                rel && rel.resourceId === createdResourceId
            );

            if (!isAlreadyLinked) {
                relatedResources.push({
                    resourceId: createdResourceId,
                    ontologyProperty: "",
                    inverseOntologyProperty: "",
                    resourceXresourceId: ""
                });
            }
            const annotationData = ko.unwrap(params.annotationData) || params.annotationData || {};

            const fullTileData = {};
            fullTileData[self.ANNOTATION_RELATED_NODE_ID] = relatedResources;
            fullTileData[self.ANNOTATION_GEOMETRY_NODE_ID] = Array.isArray(annotationData.geometry)
                ? JSON.stringify(annotationData.geometry)
                : annotationData.geometry || null;
            fullTileData[self.ANNOTATION_COLOR_NODE_ID] = annotationData.color || null;

            const payload = {
                tileid: relatedTileId || null,
                nodegroup_id: self.ANNOTATION_RELATED_NODE_ID,
                parenttile_id: null,
                resourceinstance_id: annotationResourceId,
                sortorder: 0,
                tiles: {},
                data: fullTileData
            };
                        
             if (payload.tileid) {
                 return tileService.updateOne(payload);
             }
             return tileService.createOne(payload);
        };

        if (ko.isObservable(self.selectedGraphId)) {
            self.selectedGraphId.subscribe(function() {
                self.loadResources();
            });
        }

        self.loadResources();

        return self;
    }

    return ko.components.register('resource-creation-step', {
        viewModel: viewModel,
        template: template
    });
});