define([
    'knockout',
    'jquery',
    'arches',
    'viewmodels/resource-instance-select',
    'templates/views/components/workflows/iiif-annotation/iiif-annotation-summary-step.htm'
], function(ko, $, arches, ResourceInstanceSelectModule, template) {
    'use strict';

    function unwrapCtor(m) {
        if (typeof m === 'function') return m;
        if (m && typeof m.default === 'function') return m.default;
        if (m && m.default && typeof m.default.default === 'function') return m.default.default;
        return null;
    }

    function viewModel(params) {
        const self = this;
        console.log('[DEBUG] Available URL keys:', arches && arches.urls ? Object.keys(arches.urls) : 'none');
        self.value = (typeof params.value === 'function') ? params.value : ko.observable(params.value);
        params.value = self.value;

        const rawPayload = ko.unwrap(params.payload) || null;
        self.payload = ko.observable(rawPayload);

        self.error = ko.observable('');
        self.isLoading = ko.observable(false);

        self.annotationLabel = ko.observable('');
        self.annotationNote = ko.observable('');

        self.availableOutputGraphs = ko.observableArray([]);

        const initialMode = (rawPayload && rawPayload.output && rawPayload.output.mode) || 'annotation-only';
        self.mode = ko.observable(initialMode);

        self.targetGraphId = ko.observable((rawPayload && rawPayload.output && rawPayload.output.targetGraphId) || '');
        self.targetResourceId = ko.observable((rawPayload && rawPayload.output && rawPayload.output.targetResourceId) || null);

        function readCreateableResourcesFromPageVm() {
            const vm = params.pageVm || {};
            const raw = ko.unwrap(vm.createableResources || vm.creatableResources || vm.createable_resources || []);
            const list = Array.isArray(raw) ? raw : [];

            const filtered = list
                .filter(g => g && g.graphid && g.disable_instance_creation !== true && g.is_active !== false)
                .map(g => ({
                    graphid: g.graphid,
                    name: g.name || g.subtitle || g.slug || g.graphid,
                    iconclass: g.iconclass || ''
                }));

            self.availableOutputGraphs(filtered);
        }
        ko.computed(readCreateableResourcesFromPageVm);

        const RIS = unwrapCtor(ResourceInstanceSelectModule);
        if (!RIS) {
            console.error('[WF LOG][summary] resource-instance-select import shape:', ResourceInstanceSelectModule);
            throw new Error('Cannot unwrap ResourceInstanceSelectViewModel constructor');
        }

        // Selected/created resource id
        self.riValue = ko.observable(self.targetResourceId() || null);

        // RIS instance
        self.riVm = ko.observable(null);
        self.riVmReady = ko.observable(false);

        // Needed for related-instance-creator to not hit /cards/undefined
        self.creatorCardId = ko.observable(null);

        function fetchCreatorCardId(graphid) {
            const gid = (graphid || '').trim();
            self.creatorCardId(null);

            if (!gid) return Promise.resolve(null);

            // Build the URL manually - arches.urls.graphs_api doesn't exist
            const baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            const graphsUrl = baseUrl + 'graphs/' + encodeURIComponent(gid) + '?cards=true';
            
            console.log('[WF LOG][summary] Fetching graph cards from:', graphsUrl);

            return window.fetch(graphsUrl, { credentials: 'include' })
                .then(r => {
                    if (!r.ok) throw new Error(`graph fetch failed: ${r.status}`);
                    return r.json();
                })
                .then(json => {
                    console.log('[WF LOG][summary] Graph API response:', json);
                    
                    // The response structure might vary - try different paths
                    const cards = json?.graph?.cards || json?.cards || [];
                    const active = cards.find(c => c && c.active !== false) || cards[0];
                    const cardid = active?.cardid || active?.cardId || active?.card_id || null;
                    
                    self.creatorCardId(cardid);
                    console.log('[WF LOG][summary] creatorCardId ->', cardid);
                    return cardid;
                })
                .catch(err => {
                    console.warn('[WF LOG][summary] fetchCreatorCardId error', err);
                    return null;
                });
        }

        // Build params for <related-instance-creator>
        self.creatorParams = ko.pureComputed(function() {
            const vm = self.riVm();
            const nri = vm && vm.newResourceInstance && vm.newResourceInstance();
            const cardid = self.creatorCardId();

            if (!nri || !cardid) return null;

            // Provide both variants because some builds look for cardid vs cardId
            return Object.assign({}, nri, { cardid: cardid, cardId: cardid });
        });

        function rebuildRiVm(graphid) {
            const gid = (graphid || '').trim();

            self.riVm(null);
            self.riVmReady(false);
            self.error('');

            if (!gid) return;

            try {
                console.log('[WF LOG][summary] graphids: ko.observableArray([gid]) RIS for graphid:',ko.observableArray([gid]));
                const newVm = new RIS({
                    renderContext: 'workflow',
                    multiple: false,

                    // Critical: RIS manages this observable (string resourceid)
                    value: self.riValue,

                    allowInstanceCreation: true,

                    // Filter dropdown to the chosen graph
                    graphids: ko.observableArray([gid]),

                    label: 'Target resource',
                    placeholder: 'Search or create new resource…',

                    displayOntologyTable: false,
                    onlyManageResourceIds: true,

                    // Passing form helps in workflow context (locked etc.)
                    form: params.form || null,
                    tile: null,

                    pageVm: params.pageVm
                });

                self.riVm(newVm);

                // select2Config becomes available after RIS init; just flip ready a tick later
                window.setTimeout(function() {
                    self.riVmReady(true);
                }, 50);

                // ensure we have a cardid ready for creator UI
                fetchCreatorCardId(gid);

            } catch (err) {
                console.error('[WF LOG][summary] Error creating RIS:', err);
                self.error('Failed to initialize resource selector: ' + (err.message || err));
            }
        }

        // Initial build
        if (self.targetGraphId()) {
            rebuildRiVm(self.targetGraphId());
        } else {
            // still good to keep creatorCardId null
            self.creatorCardId(null);
        }

        // Rebuild when graph changes
        self.targetGraphId.subscribe(function(newGid) {
            self.riValue(null);
            rebuildRiVm(newGid);
        });

        // Clear when mode changes away
        self.mode.subscribe(function(v) {
            if (v !== 'annotation-and-resource') {
                self.riValue(null);
                self.targetGraphId('');
                self.creatorCardId(null);
                self.riVm(null);
            }
        });

        // Can continue?
        self.canContinue = ko.pureComputed(function() {
            const p = self.payload();
            if (!p) return false;

            if (self.mode() === 'annotation-and-resource') {
                return !!(self.targetGraphId() && self.riValue());
            }
            return true;
        });

        // Wire workflow step
        if (params.form) {
            params.form.complete = self.canContinue;

            params.form.save = function() {
                const p = self.payload() || {};

                const finalPayload = {
                    hostResourceId: p.hostResourceId || null,
                    iiifServiceUrl: p.iiifServiceUrl || null,
                    annotations: p.annotations || [],
                    output: {
                        mode: self.mode(),
                        targetGraphId: (self.targetGraphId() || '').trim() || null,
                        targetResourceId: (self.mode() === 'annotation-and-resource') ? (self.riValue() || null) : null
                    },
                    metadata: {
                        label: (self.annotationLabel() || '').trim() || null,
                        note: (self.annotationNote() || '').trim() || null
                    }
                };

                console.log('[WF LOG][summary] save, finalPayload:', finalPayload);
                self.value(finalPayload);
            };
        }

        // Restore if previously set
        if (self.targetResourceId()) {
            self.riValue(self.targetResourceId());
        }

        self.dispose = function() {
            // no custom subscriptions to clean right now
        };
    }

    return ko.components.register('iiif-annotation-summary-step', {
        viewModel: viewModel,
        template: template
    });
});
