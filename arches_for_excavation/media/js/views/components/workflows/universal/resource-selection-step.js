define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/resource-selection-step.htm'
], function(ko, arches, template) {

    function viewModel(params) {
        var self = this;

        // ===== Configuration =====
        // Graph ID from parameters (required)
        self.graphId = params.graphid || params.graphId || null;
        
        // Optional: custom placeholder text
        self.placeholderText = params.placeholderText || '— choose resource —';
        
        // Optional: search placeholder
        self.searchPlaceholder = params.searchPlaceholder || 'Search resources...';
        
        // Optional: enable/disable search
        self.enableSearch = params.enableSearch !== false; // default true
        
        // Optional: limit results
        self.resultLimit = params.resultLimit || 100;

        // ===== State =====
        self.searchText = ko.observable('');
        self.availableResources = ko.observableArray([]);
        self.selectedResourceId = ko.observable('');
        self.loading = ko.observable(false);
        self.error = ko.observable('');

        // ===== Ensure params.value is observable =====
        if (typeof params.value !== 'function') {
            params.value = ko.observable();
        }

        // ===== Two-way binding with params.value =====
        // When user selects a resource
        self.selectedResourceId.subscribe(function(val) {
            params.value(val || null);
            
            // Also update params.form if it exists (workflow compatibility)
            if (params.form) {
                params.form.resourceid = val || null;
            }
        });

        // When params.value changes externally
        if (ko.isObservable(params.value)) {
            params.value.subscribe(function(val) {
                if (val !== self.selectedResourceId()) {
                    self.selectedResourceId(val || '');
                }
            });
        }

        // ===== API Integration =====
        function buildResourcesUrl() {
            var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            var url = baseUrl + 'search/resources';
            var queryParams = [];
            
            // Search term
            var q = (self.searchText() || '').trim();
            if (q) {
                queryParams.push('term=' + encodeURIComponent(q));
            }

            // Graph ID filter (required)
            if (self.graphId) {
                var resourceTypeFilter = JSON.stringify([{
                    "graphid": self.graphId,
                    "inverted": false
                }]);
                queryParams.push('resource-type-filter=' + encodeURIComponent(resourceTypeFilter));
            }

            // Limit results
            queryParams.push('limit=' + self.resultLimit);

            return queryParams.length > 0 ? url + '?' + queryParams.join('&') : url;
        }

        self.loadResources = function() {
            self.loading(true);
            self.error('');
            
            fetch(buildResourcesUrl(), {credentials: 'include'})
                .then(function(resp) {
                    if (!resp.ok) throw new Error('HTTP ' + resp.status);
                    return resp.json();
                })
                .then(function(data) {
                    var rows = [];
                    
                    // Handle different response formats
                    if (data?.results?.hits?.hits) {
                        rows = data.results.hits.hits.map(function(hit) { return hit._source; });
                    } else if (Array.isArray(data)) {
                        rows = data;
                    } else if (Array.isArray(data.results)) {
                        rows = data.results;
                    } else if (Array.isArray(data.hits)) {
                        rows = data.hits;
                    } else if (data.resources && Array.isArray(data.resources)) {
                        rows = data.resources;
                    }

                    self.availableResources(rows.map(function(r) {
                        return {
                            id: r.resourceinstanceid || r.resourceinstance_id || r.id || r.pk,
                            label: r.displayname || r.displaydescription || r._label || r.label || r.name || '[' + (r.resourceinstanceid || r.id || r.pk) + ']'
                        };
                    }));
                    
                    self.loading(false);
                })
                .catch(function(err) {
                    self.error('Failed to load resources: ' + err.message);
                    self.availableResources([]);
                    self.loading(false);
                });
        };

        // Auto-reload on search if enabled
        if (self.enableSearch) {
            self.searchText.subscribe(self.loadResources);
        }
        
        // Initial load
        self.loadResources();

        // ===== Workflow Integration =====
        // Workflow gating: step is complete when a resource is selected
        if (params.form && params.form.complete) {
            params.form.complete(ko.pureComputed(function() {
                var rid = self.selectedResourceId();
                return !!(rid && rid.trim());
            }));
        }

        // Workflow save: persist selected resource
        if (params.form && params.form.save) {
            var originalSave = params.form.save;
            params.form.save = function() {
                var rid = (self.selectedResourceId() || '').trim();
                if (!rid) {
                    return Promise.reject(new Error('No resource selected'));
                }

                params.value(rid);
                if (params.form) {
                    params.form.resourceid = rid;
                }

                // Call original save if it exists
                return originalSave ? originalSave.apply(params.form, arguments) : Promise.resolve(true);
            };
        }

        return self;
    }

    return ko.components.register('resource-selection-step', {
        viewModel: viewModel,
        template: template
    });
});