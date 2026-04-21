define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/resource-selection-step.htm',
    '../../../../services/resource-service'
], function(ko, arches, template, resourceServiceModule) {

    function toArray(v) {
        if (!v) return [];
        return Array.isArray(v) ? v.filter(Boolean) : [v];
    }

    function viewModel(params) {
        const self = this;
        const resourceService = resourceServiceModule.default || resourceServiceModule;

        // ===== Configuration =====
        self.graphId = params.graphId || params.graphid || null;
        self.searchPlaceholder = params.searchPlaceholder || 'Search resources...';
        self.resultLimit = params.resultLimit || 100;

        self.multiple = !!(params.multiple || params.allowMultiple);
        self.enableSelectAll = params.enableSelectAll !== false;

        // ===== State =====
        self.searchText = ko.observable('');
        self.allResources = ko.observableArray([]);
        self.loading = ko.observable(false);
        self.error = ko.observable('');

        // single-select
        self.selectedResourceId = ko.observable('');

        // multi-select
        self.selectedResourceIds = ko.observableArray([]);

        const initialVal = typeof params.value === 'function' ? ko.unwrap(params.value) : params.value;
        if (self.multiple) {
            self.selectedResourceIds(toArray(initialVal));
        } else {
            self.selectedResourceId(initialVal || '');
        }

        // ===== Computed: Filtered resources based on search =====
        self.availableResources = ko.pureComputed(function() {
            const searchTerm = (self.searchText() || '').trim().toLowerCase();
            if (!searchTerm) return self.allResources();

            return self.allResources().filter(function(resource) {
                const name = (resource.name || '').toLowerCase();
                return name.indexOf(searchTerm) !== -1;
            });
        });

        // ===== Computed: Get selected resource label =====
        self.selectedResourceName = ko.pureComputed(function() {
            if (self.multiple) {
                const ids = self.selectedResourceIds();
                if (!ids.length) return '';
                return `${ids.length} selected`;
            }
            const selectedId = self.selectedResourceId();
            if (!selectedId) return '';
            const resource = self.allResources().find(function(r) { return r.id === selectedId; });
            return resource ? resource.name : selectedId;
        });

        // ===== Method: Check if resource is selected =====
        self.isSelected = function(resource) {
            if (!resource || !resource.id) return false;
            return self.multiple
                ? self.selectedResourceIds().indexOf(resource.id) !== -1
                : self.selectedResourceId() === resource.id;
        };

        // ===== Method: Select a resource =====
        self.selectResource = function(resource) {
            if (!resource || !resource.id) return;
            if (!self.multiple) {
                self.selectedResourceId(resource.id);
                return;
            }

            const current = self.selectedResourceIds().slice();
            const idx = current.indexOf(resource.id);
            if (idx === -1) current.push(resource.id);
            else current.splice(idx, 1);
            self.selectedResourceIds(current);
        };

        // ===== Method: Select all visible resources =====
        self.selectAllVisible = function() {
            const ids = self.availableResources().map(function(r) { return r.id; });
            self.selectedResourceIds(ids);
        };

        // ===== Method: Clear selection =====
        self.clearSelection = function() {
            if (self.multiple) self.selectedResourceIds([]);
            else self.selectedResourceId('');
        };

        // ===== Computed: Check if all visible resources are selected =====
        self.allVisibleSelected = ko.pureComputed(function() {
            if (!self.multiple) return false;
            const visible = self.availableResources().map(function(r) { return r.id; });
            if (!visible.length) return false;
            const selected = self.selectedResourceIds();
            return visible.every(function(id) { return selected.indexOf(id) !== -1; });
        });

        // ===== Sync selectedResourceId and selectedResourceIds with external params =====
        function syncToWorkflow() {
            if (self.multiple) {
                const ids = self.selectedResourceIds().slice();
                if (typeof params.value === 'function') params.value(ids);

                if (params.form) {
                    params.form.resourceids = ids;
                    params.form.resourceid = ids[0] || null; // backward compatibility

                    // FIX: never overwrite form.value (it is expected to be a function/observable)
                    if (typeof params.form.value === 'function') {
                        params.form.value(ids);
                    } else {
                        params.form._value = ids; // optional fallback only
                    }

                    const selected = self.allResources()
                        .filter(r => ids.indexOf(r.id) !== -1)
                        .map(r => ({ id: r.id, name: r.name, description: r.description || '' }));
                    params.form.selectedResources = selected;
                    params.form.selectedResourceName = `${selected.length} selected`;
                }
            } else {
                const id = self.selectedResourceId() || null;
                if (typeof params.value === 'function') params.value(id);

                if (params.form) {
                    params.form.resourceid = id;

                    // FIX: never overwrite form.value (it is expected to be a function/observable)
                    if (typeof params.form.value === 'function') {
                        params.form.value(id);
                    } else {
                        params.form._value = id; // optional fallback only
                    }

                    const one = self.allResources().find(r => r.id === id) || null;
                    params.form.selectedResources = one ? [{ id: one.id, name: one.name, description: one.description || '' }] : [];
                    params.form.selectedResourceName = one ? one.name : '';
                }
            }
        }

        self.selectedResourceId.subscribe(syncToWorkflow);
        self.selectedResourceIds.subscribe(syncToWorkflow);

        // ===== Method: Load resources from the server =====
        self.loadResources = function() {
            self.loading(true);
            self.error('');

            resourceService.getAll(self.graphId)
                .then(function(data) {
                    const hits = (((data || {}).results || {}).hits || {}).hits || [];
                    const rows = hits.map(function(hit) { return hit._source; });
                    self.allResources(rows.map(function(r) {

                        let computedGraphName = 'Unknown Resource Type';
                        if (r.graph_id && arches.default && arches.default.resources) {
                            const graphInfo = arches.default.resources.find(g => g.graphid === r.graph_id)
                            computedGraphName = graphInfo.name;
                        }
                        return {
                            id: r.resourceinstanceid,
                            name: r.displayname || r.resourceinstanceid,
                            description: r.displaydescription || '',
                            graphName: computedGraphName
                        };
                    }));

                    self.loading(false);
                })
                .catch(function(err) {
                    self.error('Failed to load resources: ' + err.message);
                    self.allResources([]);
                    self.loading(false);
                });
        };

        // Load resources on initialization
        self.loadResources();
        syncToWorkflow();

        // ===== Workflow Integration =====
        if (params.form) {
            // Set complete status
            if (params.form.complete) {
                params.form.complete(ko.pureComputed(function() {
                    if (self.multiple) return self.selectedResourceIds().length > 0;
                    return !!(self.selectedResourceId() && self.selectedResourceId().trim());
                }));
            }

            // Override save method
            if (params.form.save) {
                const originalSave = params.form.save;
                params.form.save = function() {
                    if (self.multiple && self.selectedResourceIds().length === 0) {
                        return Promise.reject(new Error('No resources selected'));
                    }
                    if (!self.multiple && !(self.selectedResourceId() || '').trim()) {
                        return Promise.reject(new Error('No resource selected'));
                    }
                    return originalSave.apply(params.form, arguments);
                };
            }
        }

        return self;
    }

    return ko.components.register('resource-selection-step', {
        viewModel: viewModel,
        template: template
    });
});