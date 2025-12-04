define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/resource-selection-step.htm'
], function(ko, arches, template) {

    function viewModel(params) {
        var self = this;

        // ===== Configuration =====
        self.graphId = params.graphid || params.graphId || null;
        self.placeholderText = params.placeholderText || '— choose resource —';
        self.searchPlaceholder = params.searchPlaceholder || 'Search resources...';
        self.enableSearch = params.enableSearch !== false;
        self.resultLimit = params.resultLimit || 100;

        // ===== State =====
        self.searchText = ko.observable('');
        self.allResources = ko.observableArray([]);
        self.selectedResourceId = ko.observable('');
        self.loading = ko.observable(false);
        self.error = ko.observable('');

        // ===== Computed: Filtered resources based on search =====
        self.availableResources = ko.pureComputed(function() {
            var searchTerm = (self.searchText() || '').trim().toLowerCase();
            if (!searchTerm) {
                return self.allResources();
            }
            
            return self.allResources().filter(function(resource) {
                return resource.name.toLowerCase().indexOf(searchTerm) !== -1;
            });
        });

        // ===== Computed: Get selected resource label =====
        self.selectedResourceName = ko.pureComputed(function() {
            var selectedId = self.selectedResourceId();
            if (!selectedId) return '';
            
            var resource = self.allResources().find(function(r) {
                return r.id === selectedId;
            });
            
            return resource ? resource.label : selectedId;
        });

        // ===== Method: Select a resource =====
        self.selectResource = function(resource) {
            if (resource && resource.id) {
                self.selectedResourceId(resource.id);
            }
        };

        // ===== Ensure params.value is observable =====
        if (typeof params.value !== 'function') {
            params.value = ko.observable();
        }

        // ===== Two-way binding with params.value =====
        self.selectedResourceId.subscribe(function(val) {
            params.value(val || null);
            
            if (params.form) {
                params.form.resourceid = val || null;
            }
        });

        if (ko.isObservable(params.value)) {
            params.value.subscribe(function(val) {
                if (val !== self.selectedResourceId()) {
                    self.selectedResourceId(val || '');
                }
            });
        }

        // ===== API Integration (Load Once) =====
        function buildResourcesUrl() {
            var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            var url = baseUrl + 'search/resources';
            var queryParams = [];

            if (self.graphId) {
                var resourceTypeFilter = JSON.stringify([{
                    "graphid": self.graphId,
                    "inverted": false
                }]);
                queryParams.push('resource-type-filter=' + encodeURIComponent(resourceTypeFilter));
            }

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
                    const rows = data.results.hits.hits.map(function(hit) { return hit._source; });
                    console.log("Data: ", data);

                    console.log("Rows: ", rows);

                    self.allResources(rows.map(function(r) {
                        return {
                            id: r.resourceinstanceid,
                            name: r.displayname,
                            description: r.displaydescription
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
        
        // Load resources once on initialization
        self.loadResources();

        // ===== Workflow Integration =====
        if (params.form && params.form.complete) {
            params.form.complete(ko.pureComputed(function() {
                var rid = self.selectedResourceId();
                return !!(rid && rid.trim());
            }));
        }

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