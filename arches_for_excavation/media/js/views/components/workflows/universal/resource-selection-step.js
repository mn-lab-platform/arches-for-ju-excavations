define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/resource-selection-step.htm',
    '../../../../services/resource-service',
    '@/arches_vue_components/application',
    '@/arches_for_excavation/ResourcePicker.vue',
    '@/arches_search/default_theme.ts'
], function(ko, arches, template, resourceServiceModule, vueApplicationModule, filterModule, themeModule) {
    const resourceService = resourceServiceModule.default || resourceServiceModule;
    const ResourcePicker = filterModule.default || filterModule;
    const searchTheme = themeModule.default || themeModule;
    const pickerTheme = {
        ...searchTheme,
        // OpenVue appends Select/TreeSelect panels to <body>. Keep them above
        // the full-screen picker (z-index 20000), or their options are hidden.
        zIndex: { modal: 22000, overlay: 21000, menu: 21000, tooltip: 22000 }
    };

    ko.bindingHandlers.resourcePickerMount = {
        init: function(element, valueAccessor) {
            const step = valueAccessor();
            let disposed = false;
            let vueApp = null;
            const previousOverflow = document.body.style.overflow;
            const previousFocus = document.activeElement;
            document.body.style.overflow = 'hidden';

            const closeOnEscape = function(event) {
                if (event.key !== 'Escape' || event.defaultPrevented) return;
                const nearestDialog = event.target instanceof Element
                    ? event.target.closest('[role="dialog"]')
                    : null;
                if (nearestDialog && !nearestDialog.classList.contains('resource-picker-overlay')) return;
                event.preventDefault();
                step.toggleAdvancedSearch();
            };
            document.addEventListener('keydown', closeOnEscape);
            const closeButton = element.closest('.resource-picker-overlay').querySelector('button');
            if (closeButton) closeButton.focus();

            Promise.all([step.getEffectiveGraphIds(), resourceService.getSearchGraphModels()])
                .then(function(results) {
                    const graphIds = results[0];
                    const graphModels = results[1];
                    const allowedGraphIds = graphIds.length > 0 || step.relationConfigModelId
                        ? graphIds.map(String)
                        : graphModels.map(function(graph) { return String(graph.graphid); });
                    return vueApplicationModule.createVueApplication({
                        component: ResourcePicker,
                        themeConfiguration: pickerTheme,
                        initialProps: {
                            allowedGraphIds: allowedGraphIds,
                            preferredGraphId: step.selectedResourceTypeId(),
                            modelValue: step.selectedResourceIds().slice(),
                            multiple: step.multiple,
                            onSelectionChange: step.onAdvancedSelectionChange
                        }
                    });
                })
                .then(function(app) {
                    if (disposed) return;
                    vueApp = app;
                    vueApp.mount(element);
                })
                .catch(function(error) {
                    if (!disposed) step.error('Failed to load advanced search: ' + error.message);
                });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                disposed = true;
                if (vueApp) vueApp.unmount();
                document.removeEventListener('keydown', closeOnEscape);
                document.body.style.overflow = previousOverflow;
                if (previousFocus && previousFocus.isConnected && previousFocus.focus) {
                    previousFocus.focus();
                }
            });
            return { controlsDescendantBindings: true };
        }
    };

    function viewModel(params) {
        const self = this;
        self.value = params.value;

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
        self.advancedOpen = ko.observable(false);

        self.searchText = ko.observable('').extend({ 
            rateLimit: { timeout: 300, method: "notifyWhenChangesStop" } 
        });
        self.resourceTypes = ko.observableArray([]);
        self.selectedResourceTypeId = ko.observable(null);
        
        self.allResources = ko.observableArray([]);
        self.loading = ko.observable(false);
        self.error = ko.observable('');
    
        self.selectedResourceIds = ko.observableArray(toArray(self.value && self.value()));
        self.selectedResourceLabels = ko.observable({});
        self.allSelected = ko.observable(false);
        self.selectAllText = ko.observable('Select All Shown');

        self.availableResources = self.allResources;
        self.resultLimit = Math.min(Math.max(Number(params.resultLimit) || 100, 1), 500);
        self.totalResults = ko.observable(0);
        self._relatedGraphIdsPromise = null;
        self._searchRequestId = 0;

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
                return resource ? resource.name : (self.selectedResourceLabels()[selectedId] || selectedId);
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

        self.updateSelectAllState = function() {
            const visibleIds = self.availableResources().map(function(resource) { return resource.id; });
            const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(function(id) {
                return self.selectedResourceIds().includes(id);
            });
            self.allSelected(allVisibleSelected);
            self.selectAllText(allVisibleSelected ? 'Unselect All Shown' : 'Select All Shown');
        };

        self.selectResource = function(resource) {
            if (!resource || !resource.id) return;
            if (self.isSelected(resource)) {
                self.selectedResourceIds(self.selectedResourceIds().filter(function(id) { return id !== resource.id; }));
                self.value(self.selectedResourceIds().length > 0 ? self.selectedResourceIds() : null);
            } else {
                if (self.multiple) {
                    self.selectedResourceIds([...self.selectedResourceIds(), resource.id]);
                    self.value(self.selectedResourceIds());
                } else {
                    self.selectedResourceIds([resource.id]);
                    self.value(resource.id);
                }
                
            } 
            self.updateSelectAllState();
        };

        self.onAdvancedSelectionChange = function(ids, resource, name) {
            self.selectedResourceIds(ids);
            self.value(ids.length ? (self.multiple ? ids : ids[0]) : null);
            if (resource && name) {
                self.selectedResourceLabels(Object.assign({}, self.selectedResourceLabels(), {
                    [resource.resourceinstanceid]: name
                }));
            }
            self.updateSelectAllState();
        };

        self.selectAllResources = function() {
            const visibleIds = self.availableResources().map(function(resource) { return resource.id; });
            if (self.allSelected()) {
                self.selectedResourceIds(self.selectedResourceIds().filter(function(id) {
                    return !visibleIds.includes(id);
                }));
            } else {
                self.selectedResourceIds(Array.from(new Set(self.selectedResourceIds().concat(visibleIds))));
            }
            self.value(self.selectedResourceIds().length > 0 ? self.selectedResourceIds() : null);
            self.updateSelectAllState();
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

        self.updateResourceTypes = function(graphIds, graphModels) {
            const ids = graphIds.length > 0 || self.relationConfigModelId
                ? graphIds.map(String)
                : graphModels.map(function(graph) { return String(graph.graphid); });
            const resourceTypes = ids.map(function(id) {
                const graph = graphModels.find(function(model) {
                    return String(model.graphid) === id;
                });
                return graph ? { id: id, name: graph.name } : null;
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

        self.toggleAdvancedSearch = function() {
            const open = !self.advancedOpen();
            self.advancedOpen(open);
            if (open) {
                self.clearAdvancedResults();
            } else {
                self.loadResources(self.searchText());
            }
        };

        self.clearAdvancedResults = function() {
            ++self._searchRequestId;
            self.loading(false);
            self.error('');
            self.allResources([]);
            self.totalResults(0);
            self.updateSelectAllState();
        };

        self.loadResources = function(searchTerm = '') {
            const requestId = ++self._searchRequestId;
            self.loading(true);
            self.error('');

            Promise.all([self.getEffectiveGraphIds(), resourceService.getSearchGraphModels()])
                .then(function(results) {
                    if (requestId !== self._searchRequestId) return null;
                    const graphIds = results[0];
                    const graphModels = results[1];
                    self.updateResourceTypes(graphIds, graphModels);
                    // An explicitly configured model with no allowed related
                    // models must not fall back to an unfiltered resource list.
                    if (self.relationConfigModelId && graphIds.length === 0) {
                        return { data: { resources: [], pagination: { total_results: 0 } }, graphModels: graphModels };
                    }
                    const selectedGraphId = self.selectedResourceTypeId();
                    const allowedGraphIds = graphIds.map(String);
                    const allowedGraphs = graphModels.filter(function(graph) {
                        return allowedGraphIds.length === 0 || allowedGraphIds.includes(String(graph.graphid));
                    });
                    const graphSlugs = allowedGraphs.filter(function(graph) {
                        return !selectedGraphId || String(graph.graphid) === selectedGraphId;
                    }).map(function(graph) { return graph.slug; }).filter(Boolean);

                    if (graphSlugs.length === 0 || (searchTerm.trim() && searchTerm.trim().length < 2)) {
                        return { data: { resources: [], pagination: { total_results: 0 } }, graphModels: graphModels };
                    }

                    return resourceService.searchResources(
                        graphSlugs,
                        searchTerm,
                        self.resultLimit
                    )
                        .then(function(data) { return { data: data, graphModels: graphModels }; });
                })
                .then(function(result) {
                    if (requestId !== self._searchRequestId || !result) return;
                    const data = result.data;
                    const graphModels = result.graphModels;
                    const rows = Array.isArray(data.resources) ? data.resources : [];
                    const language = arches.activeLanguage || 'en';
                    const mapped = rows.map(function(r) {
                        const descriptors = r.descriptors || {};
                        const localized = descriptors[language] || descriptors.en || Object.values(descriptors)[0] || {};
                        let computedGraphName = 'Unknown Resource Type';
                        if (r.graph_id) {
                            const graphInfo = graphModels.find(g => String(g.graphid) === String(r.graph_id));
                            computedGraphName = graphInfo ? graphInfo.name : computedGraphName;
                        }
                        return {
                            id: r.resourceinstanceid,
                            name: localized.name || r.resourceinstanceid,
                            description: localized.description || '',
                            graphName: computedGraphName
                        };
                    });

                    self.totalResults((data.pagination || {}).total_results || 0);
                    self.allResources(mapped);
                    self.updateSelectAllState();
                })
                .catch(function(err) {
                    if (requestId !== self._searchRequestId) return;
                    self.error('Failed to load resources: ' + (err && err.message ? err.message : err));
                    self.allResources([]);
                    self.totalResults(0);
                    self.updateSelectAllState();
                })
                .finally(function() {
                    if (requestId === self._searchRequestId) self.loading(false);
                });
        };

        self.loadResources();
    }

    return ko.components.register('resource-selection-step', {
        viewModel: viewModel,
        template: template
    });
});
