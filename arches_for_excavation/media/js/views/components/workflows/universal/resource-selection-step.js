define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/resource-selection-step.htm',
    '../../../../services/resource-service'
], function(ko, arches, template, resourceServiceModule) {

    function viewModel(params) {
        const self = this;

        const resourceService = resourceServiceModule.default || resourceServiceModule;
        
        // ===== Configuration =====
        self.graphId = params.graphId || null;
        self.searchPlaceholder = params.searchPlaceholder || 'Search resources...';
        self.resultLimit = params.resultLimit || 100;

        // ===== State =====
        self.searchText = ko.observable('');
        self.allResources = ko.observableArray([]);
        self.selectedResourceId = ko.observable(params.value && params.value() ? params.value() : '');
        self.loading = ko.observable(false);
        self.error = ko.observable('');

        // ===== Computed: Filtered resources based on search =====
        self.availableResources = ko.pureComputed(function() {
            const searchTerm = (self.searchText() || '').trim().toLowerCase();
            if (!searchTerm) {
                return self.allResources();
            }
            
            return self.allResources().filter(resource => resource.name.toLowerCase().indexOf(searchTerm) !== -1);
        });

        // ===== Computed: Get selected resource label =====
        self.selectedResourceName = ko.pureComputed(function() {
            const selectedId = self.selectedResourceId();
            if (!selectedId) return '';
            
            const resource = self.allResources().find(function(r) {
                return r.id === selectedId;
            });
            
            return resource ? resource.name : selectedId;
        });

        // ===== Method: Select a resource =====
        self.selectResource = function(resource) {
            if (resource && resource.id) {
                self.selectedResourceId(resource.id);
            }
        };

        // ===== Sync selectedResourceId with external params =====
        self.selectedResourceId.subscribe(function(val) {
            if (typeof params.value === 'function') {
                params.value(val || null);
            }
            
            if (params.form) {
                params.form.resourceid = val || null;
            }
        });

        self.loadResources = function() {
            self.loading(true);
            self.error('');
            
            resourceService.getAll(self.graphId)
                .then(function(data) {
                    const rows = data.results.hits.hits.map(function(hit) { return hit._source; });
                    
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
        
        // Load resources on initialization
        self.loadResources();

        // ===== Workflow Integration =====
        if (params.form) {
            // Set complete status
            if (params.form.complete) {
                params.form.complete(ko.pureComputed(function() {
                    return !!(self.selectedResourceId() && self.selectedResourceId().trim());
                }));
            }

            // Override save method
            if (params.form.save) {
                const originalSave = params.form.save;
                params.form.save = function() {
                    const rid = (self.selectedResourceId() || '').trim();
                    if (!rid) {
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