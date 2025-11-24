// media/js/views/components/workflows/iiif/resource-selection-step.js
define([
    'knockout',
    'arches',
    'templates/views/components/workflows/iiif/resource-selection-step.htm'
], function(ko, arches, template) {

    function viewModel(params) {
        var self = this;

        console.log('[WF LOG][resource-select] ========== INIT ==========');
        console.log('[WF LOG][resource-select] params:', params);
        console.log('[WF LOG][resource-select] params.form:', params.form);
        console.log('[WF LOG][resource-select] params.value:', params.value);
        console.log('[WF LOG][resource-select] params.value is function?', typeof params.value === 'function');

        // --- stan ---
        self.searchText = ko.observable('');
        self.availableResources = ko.observableArray([]);
        self.selectedResourceId = ko.observable('');

        console.log('[WF LOG][resource-select] Created selectedResourceId observable');

        // Ensure params.value is an observable
        if (typeof params.value !== 'function') {
            console.log('[WF LOG][resource-select] params.value is NOT a function, creating observable');
            params.value = ko.observable();
        } else {
            console.log('[WF LOG][resource-select] params.value IS a function, current value:', params.value());
        }

        // zapis do form, żeby kolejne kroki mogły go użyć
        self.selectedResourceId.subscribe(function(val) {
            console.log('[WF LOG][resource-select] selectedResourceId CHANGED to:', val);
            
            if (params.form) {
                params.form.resourceid = val || null;
                console.log('[WF LOG][resource-select] Set params.form.resourceid to:', val);
            } else {
                console.log('[WF LOG][resource-select] WARNING: params.form is null/undefined');
            }
            
            // Update params.value immediately when resource is selected
            if (typeof params.value === 'function') {
                params.value(val || null);
                console.log('[WF LOG][resource-select] Set params.value() to:', val);
                console.log('[WF LOG][resource-select] Verify params.value() is now:', params.value());
            } else {
                console.log('[WF LOG][resource-select] ERROR: params.value is not a function!');
            }
        });

        // ====== ładowanie listy zasobów z API ======
        function buildResourcesUrl() {
            var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            var url = baseUrl + 'search/resources';

            var queryParams = [];
            
            var q = (self.searchText() || '').trim();
            if (q) {
                queryParams.push('term=' + encodeURIComponent(q));
            }

            if (params.graphid) {
                queryParams.push('graphid=' + params.graphid);
            }

            queryParams.push('limit=100');

            if (queryParams.length > 0) {
                url += '?' + queryParams.join('&');
            }

            return url;
        }

        self.loadResources = function() {
            var url = buildResourcesUrl();
            console.log('[WF LOG][resource-select] loading resources from', url);

            fetch(url, {credentials: 'include'})
                .then(function(resp) {
                    if (!resp.ok) {
                        throw new Error('HTTP ' + resp.status);
                    }
                    return resp.json();
                })
                .then(function(data) {
                    var rows = [];

                    if (data && data.results && data.results.hits && Array.isArray(data.results.hits.hits)) {
                        rows = data.results.hits.hits.map(function(hit) {
                            return hit._source;
                        });
                    } else if (Array.isArray(data)) {
                        rows = data;
                    } else if (Array.isArray(data.results)) {
                        rows = data.results;
                    } else if (Array.isArray(data.hits)) {
                        rows = data.hits;
                    } else if (data.resources && Array.isArray(data.resources)) {
                        rows = data.resources;
                    }

                    var mapped = rows.map(function(r) {
                        var id = r.resourceinstanceid || r.resourceinstance_id || r.id || r.pk;
                        var label = r.displayname || r.displaydescription || r._label || r.label || r.name || ('[' + id + ']');
                        return {
                            id: id,
                            label: label
                        };
                    });

                    console.log('[WF LOG][resource-select] loaded resources:', mapped);
                    self.availableResources(mapped);
                })
                .catch(function(err) {
                    console.error('[WF LOG][resource-select] failed to load resources', err);
                    self.availableResources([]);
                });
        };

        self.searchText.subscribe(function() {
            self.loadResources();
        });

        self.loadResources();

        // ====== gating kroku workflow ======
        var isComplete = ko.pureComputed(function() {
            var rid = self.selectedResourceId();
            var complete = !!(rid && rid.trim());
            console.log('[WF LOG][resource-select] complete check: selectedResourceId=', rid, 'complete=', complete);
            return complete;
        });
        
        console.log('[WF LOG][resource-select] Setting params.form.complete');
        params.form.complete(isComplete);

        console.log('[WF LOG][resource-select] Storing original save function');
        var _origSave = params.form.save;
        console.log('[WF LOG][resource-select] Original save function:', _origSave);

        params.form.save = function() {
            console.log('[WF LOG][resource-select] ========== SAVE CALLED ==========');
            console.log('[WF LOG][resource-select] arguments:', arguments);
            
            var rid = (self.selectedResourceId() || '').trim();
            console.log('[WF LOG][resource-select] selectedResourceId:', rid);
            
            if (!rid) {
                console.log('[WF LOG][resource-select] No resource selected, returning false');
                return Promise.resolve(false);
            }

            // Store the resource ID directly
            if (typeof params.value === 'function') {
                console.log('[WF LOG][resource-select] Setting params.value to:', rid);
                params.value(rid);
                console.log('[WF LOG][resource-select] params.value() is now:', params.value());
            } else {
                console.log('[WF LOG][resource-select] ERROR: params.value is not a function!');
            }
            
            if (params.form) {
                params.form.resourceid = rid;
                console.log('[WF LOG][resource-select] Set params.form.resourceid to:', rid);
            }

            if (_origSave) {
                console.log('[WF LOG][resource-select] Calling original save function');
                var result = _origSave.apply(params.form, arguments);
                console.log('[WF LOG][resource-select] Original save returned:', result);
                return result;
            }
            
            console.log('[WF LOG][resource-select] No original save, returning true');
            return Promise.resolve(true);
        };

        console.log('[WF LOG][resource-select] ========== INIT COMPLETE ==========');
        console.log('[WF LOG][resource-select] Final params.value:', params.value);
        console.log('[WF LOG][resource-select] Final params.value():', typeof params.value === 'function' ? params.value() : 'NOT A FUNCTION');

        return self;
    }

    return ko.components.register('resource-selection-step', {
        viewModel: viewModel,
        template: template
    });
});
