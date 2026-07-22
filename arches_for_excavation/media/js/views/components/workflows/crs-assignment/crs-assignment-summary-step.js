define([
    'knockout',
    'templates/views/components/workflows/crs-assignment/crs-assignment-summary-step.htm',
    '../../../../services/crs-service',
    '../../../../services/resource-service'
], function(ko, template, crsServiceModule, resourceServiceModule) {
    function viewModel(params) {
        const self = this;
        const crsService = crsServiceModule.default || crsServiceModule;
        const resourceService = resourceServiceModule.default || resourceServiceModule;

        self.crsId = params.crsId;
        self.crsName = params.crsName;
        self.resourceIds = params.resourceIds;
        self.selectedResources = params.selectedResources;

        self.submitting = ko.observable(false);
        self.error = ko.observable('');
        self.success = ko.observable('');
        self.confirmed = ko.observable(false);
        self.loadingNames = ko.observable(false);

        self.resolvedCrsName = ko.observable('');
        self.resolvedResources = ko.observableArray([]);
        self.crsRaw = ko.observable(null);

        self.count = ko.pureComputed(() => (ko.unwrap(self.resourceIds) || []).length);
        const chunkArray = function(items, size) {
            const chunks = [];
            for (let i = 0; i < items.length; i += size) {
                chunks.push(items.slice(i, i + size));
            }
            return chunks;
        };
        function extractName(obj, fallbackId) {
            if (!obj || typeof obj !== 'object') return fallbackId || '(unknown)';
            return (
                obj.displayname ||
                obj.display_name ||
                obj.name ||
                (obj._source && (obj._source.displayname || obj._source.name)) ||
                fallbackId ||
                '(unknown)'
            );
        }

        function asObject(v) {
            return (v && typeof v === 'object') ? v : null;
        }

        function getCrsPayload(raw) {
            if (!raw || typeof raw !== 'object') return null;
            const source = asObject(raw._source) || raw;

            let payload = source.resource;
            if (typeof payload === 'string') {
                try { payload = JSON.parse(payload); } catch (_) { payload = null; }
            }
            payload = asObject(payload);

            // awaryjnie: czasem może być zagnieżdżone jeszcze raz
            if (payload && asObject(payload.resource)) payload = payload.resource;

            return asObject(payload);
        }

        function clean(v) {
            if (v === null || v === undefined || v === '' || v === 'Undefined') return '—';
            return String(v);
        }

        self.crsDetails = ko.pureComputed(function() {
            const payload = getCrsPayload(self.crsRaw());
            if (!payload) return [];

            const identification = asObject(payload['Identification']) || {};
            const derivation = asObject(payload['Derivation Parameters']) || {};
            const definition = asObject(payload['Definition']) || {};
            const proj4 = asObject(definition['PROJ4']) || {};

            const rows = [
                { key: 'Name', value: clean(identification['Name']) },
                { key: 'Description', value: clean(identification['Description']) },

                { key: 'Origin Latitude', value: clean(derivation['Origin Latitude']) },
                { key: 'Origin Longitude', value: clean(derivation['Origin Longitude']) },
                { key: 'Origin Local X', value: clean(derivation['Origin Local X']) },
                { key: 'Origin Local Y', value: clean(derivation['Origin Local Y']) },

                { key: 'Direction Latitude', value: clean(derivation['Direction Latitude']) },
                { key: 'Direction Longitude', value: clean(derivation['Direction Longitude']) },

                { key: 'PROJ4 String', value: clean(proj4['PROJ4 String']) }
            ];

            return rows;
        });

        function refreshDisplayData() {
            const crsId = ko.unwrap(self.crsId);
            const ids = ko.unwrap(self.resourceIds) || [];

            self.loadingNames(true);

            const crsPromise = crsId
                ? resourceService.getOne(crsId)
                    .then(function(r) {
                        self.crsRaw(r || null);

                        const payload = getCrsPayload(r);
                        const ident = payload && payload['Identification'] ? payload['Identification'] : null;
                        const nameFromPayload = ident && ident['Name'] ? ident['Name'] : null;

                        self.resolvedCrsName(nameFromPayload || extractName(r, crsId));
                    })
                    .catch(function() {
                        self.crsRaw(null);
                        self.resolvedCrsName('');
                    })
                : Promise.resolve();

            const iiifPromise = ids.length
                ? Promise.all(ids.map(function(id) {
                    return resourceService.getOne(id)
                        .then(function(r) { return { id: id, name: extractName(r, id) }; })
                        .catch(function() { return { id: id, name: id }; });
                })).then(function(rows) { self.resolvedResources(rows); })
                : Promise.resolve(self.resolvedResources([]));

            Promise.all([crsPromise, iiifPromise]).finally(function() {
                self.loadingNames(false);
            });
        }

        self.crsNameDisplay = ko.pureComputed(function() {
            return self.resolvedCrsName() || ko.unwrap(self.crsName) || '(unknown)';
        });

        self.resourcesForDisplay = ko.pureComputed(function() {
            const resolved = self.resolvedResources();
            if (resolved && resolved.length) return resolved;

            return (ko.unwrap(self.resourceIds) || []).map(function(id) {
                return { id: id, name: id };
            });
        });

        refreshDisplayData();
        if (ko.isObservable(self.crsId)) self.crsId.subscribe(refreshDisplayData);
        if (ko.isObservable(self.resourceIds)) self.resourceIds.subscribe(refreshDisplayData);

        const runAssign = function() {
            if (self.submitting()) return Promise.resolve();
            self.submitting(true);
            self.error('');
            self.success('');

            const crsResourceId = ko.unwrap(self.crsId);
            const resourceIds = ko.unwrap(self.resourceIds) || [];
            const chunks = chunkArray(resourceIds, 25);
            let assignedTotal = 0;

            return chunks.reduce(function(promise, chunk, index) {
                return promise.then(function() {
                    self.success(`Assigning batch ${index + 1}/${chunks.length}...`);

                    return crsService.assignCRSToResources({
                        crs_resource_id: crsResourceId,
                        resource_ids: chunk
                    }).then(function(resp) {
                        assignedTotal += resp.assigned_count || chunk.length;
                        return resp;
                    });
                });
            }, Promise.resolve()).then(function(resp) {
                self.confirmed(true);
                self.success(`Assigned CRS to ${assignedTotal} resource(s).`);
                return resp;
            }).catch(function(err) {
                self.error(err.message || 'Assignment failed');
                return Promise.reject(err);
            }).finally(function() {
                self.submitting(false);
            });
        };
        self.confirmAssignment = function() { return runAssign(); };

        if (params.form) {
            params.form.complete(ko.pureComputed(function() {
                return !!ko.unwrap(self.crsId) && self.count() > 0 && self.confirmed();
            }));

            const originalSave = params.form.save || function() { return Promise.resolve(); };
            params.form.save = function() {
                if (self.confirmed()) return originalSave();
                return runAssign().then(() => originalSave());
            };
        }

        return self;
    }

    return ko.components.register('crs-assignment-summary-step', {
        viewModel: viewModel,
        template: template
    });
});