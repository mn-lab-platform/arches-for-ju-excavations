define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/resource-selection-step.htm',
    '../../../../services/resource-service'
], function(ko, arches, template, resourceServiceModule) {
    function viewModel(params) {
        const self = this;
        self.value = params.value;
        const resourceService = resourceServiceModule.default || resourceServiceModule;

        function toArray(v) {
            if (!v) return [];
            return Array.isArray(v) ? v.filter(Boolean) : [v];
        }

        self.graphIds = toArray(params.graphIds || params.graphids || params.graphId || params.graphid);
        // Optional ID of a resource model whose Configuration defines
        // which resource models may be related to it. For example, passing the
        // IIIF resource-model ID makes this step list only models enabled for
        // IIIF in Arches' Resource Model Configuration panel.
        self.relationConfigModelId = params.relationConfigModelId;
        self.searchPlaceholder = params.searchPlaceholder || 'Search resources...';
        self.multiple = params.multiple || false;

        self.searchText = ko.observable('').extend({ 
            rateLimit: { timeout: 300, method: "notifyWhenChangesStop" } 
        });
        self.resourceTypes = ko.observableArray([]);
        self.selectedResourceTypeId = ko.observable(null);
        
        self.allResources = ko.observableArray([]);
        self.loading = ko.observable(false);
        self.error = ko.observable('');
    
        self.selectedResourceIds = ko.observableArray(toArray(self.value && self.value()));
        self.allSelected = ko.observable(false);
        self.selectAllText = ko.observable('Select All');

        self.availableResources = self.allResources;
        self.resultLimit = 100;
        self._relatedGraphIdsPromise = null;

        self.searchText.subscribe(function(newValue) {
            self.loadResources(newValue);
        });

        self.selectedResourceName = ko.pureComputed(function() {
            const ids = self.selectedResourceIds();
            if (ids.length > 1) {
                return `${ids.length} selected`;
            }
            else if (ids.length === 1) {
                const selectedId = ids[0];
                const resource = self.allResources().find(function(r) { return r.id === selectedId; });
                return resource ? resource.name : selectedId;
            }
            return '';
        });

        self.selectedResourceTypeName = ko.pureComputed(function() {
            const selectedId = self.selectedResourceTypeId();
            if (!selectedId) {
                return 'Resource Type';
            }
            const selectedType = self.resourceTypes().find(function(type) {
                return type.id === selectedId;
            });
            return selectedType ? selectedType.name : 'Resource Type';
        });

        self.isSelected = function(resource) {
            if (!resource || !resource.id) return false;
            return self.selectedResourceIds().indexOf(resource.id) !== -1;
        };

        self.selectResource = function(resource) {
            if (!resource || !resource.id) return;
            if (self.isSelected(resource)) {
                self.selectedResourceIds(self.selectedResourceIds().filter(function(id) { return id !== resource.id; }));
                self.value(self.selectedResourceIds().length > 0 ? self.selectedResourceIds() : null);
                self.allSelected(false);
                self.selectAllText('Select All');
            } else {
                if (self.multiple) {
                    self.selectedResourceIds([...self.selectedResourceIds(), resource.id]);
                    self.value(self.selectedResourceIds());
                } else {
                    self.selectedResourceIds([resource.id]);
                    self.value(resource.id);
                }
                
                if (self.availableResources().length > 0 && self.selectedResourceIds().length === self.availableResources().length) {
                    self.allSelected(true);
                    self.selectAllText('Unselect All');
                }
            } 
        };

        self.selectAllResources = function() {
            if (self.allSelected()) {
                self.selectedResourceIds([]);
                self.value(null);
                self.allSelected(false);
                self.selectAllText('Select All');
            } else {
                const allIds = self.availableResources().map(function(r) { return r.id; });
                self.selectedResourceIds(allIds);
                self.value(self.selectedResourceIds());
                self.allSelected(true);
                self.selectAllText('Unselect All');
            }
        };

        self.getConfiguredGraphIds = function() {
            if (self._relatedGraphIdsPromise) {
                return self._relatedGraphIdsPromise;
            }

            self._relatedGraphIdsPromise = resourceService
                .getRelatableGraphIds(self.relationConfigModelId)
                .then(function(graphIds) {
                    return graphIds.map(String);
                });

            return self._relatedGraphIdsPromise;
        };

        self.getEffectiveGraphIds = function() {
            if (!self.relationConfigModelId) {
                return Promise.resolve(self.graphIds);
            }

            return self.getConfiguredGraphIds().then(function(configuredGraphIds) {
                return Array.from(new Set(self.graphIds.concat(configuredGraphIds)));
            });
        };

        self.updateResourceTypes = function(graphIds) {
            const graphModels = (arches.default && arches.default.resources) || [];
            const ids = graphIds.length > 0 || self.relationConfigModelId
                ? graphIds
                : graphModels.map(function(graph) { return graph.graphid; });
            const resourceTypes = ids.map(function(id) {
                const graph = graphModels.find(function(model) {
                    return model.graphid === id;
                });
                return graph ? { id: graph.graphid, name: graph.name } : null;
            }).filter(Boolean).sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });

            self.resourceTypes(resourceTypes);
            if (self.selectedResourceTypeId() && !resourceTypes.some(function(type) {
                return type.id === self.selectedResourceTypeId();
            })) {
                self.selectedResourceTypeId(null);
            }
        };

        self.selectResourceType = function(resourceType) {
            self.selectedResourceTypeId(resourceType ? resourceType.id : null);
            self.loadResources(self.searchText());
            return false;
        };

        self.loadResources = function(searchTerm = '') {
            self.loading(true);
            self.error('');

            self.getEffectiveGraphIds()
                .then(function(graphIds) {
                    self.updateResourceTypes(graphIds);
                    // An explicitly configured model with no allowed related
                    // models must not fall back to an unfiltered resource list.
                    if (self.relationConfigModelId && graphIds.length === 0) {
                        return { results: { hits: { hits: [] } } };
                    }
                    const selectedGraphId = self.selectedResourceTypeId();
                    return resourceService.getAll(
                        selectedGraphId ? [selectedGraphId] : graphIds,
                        searchTerm,
                        self.resultLimit
                    );
                })
                .then(function(data) {
                    const hits = (((data || {}).results || {}).hits || {}).hits || [];
                    const rows = hits.map(function(hit) { return hit._source; });

                    const mapped = rows.map(function(r) {
                        let computedGraphName = 'Unknown Resource Type';
                        if (r.graph_id && arches.default && arches.default.resources) {
                            const graphInfo = arches.default.resources.find(g => g.graphid === r.graph_id);
                            computedGraphName = graphInfo ? graphInfo.name : computedGraphName;
                        }
                        return {
                            id: r.resourceinstanceid,
                            name: r.displayname || 'Undefined',
                            description: r.displaydescription || '',
                            graphName: computedGraphName
                        };
                    });

                    self.allResources(mapped);
                })
                .catch(function(err) {
                    self.error('Failed to load resources: ' + (err && err.message ? err.message : err));
                    self.allResources([]);
                })
                .finally(function() {
                    self.loading(false);
                });
        };

        self.loadResources();
    }

    return ko.components.register('resource-selection-step', {
        viewModel: viewModel,
        template: template
    });
});
