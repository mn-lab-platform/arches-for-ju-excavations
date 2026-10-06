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

        // NEW
        self.success = ko.observable('');
        self.isSaved = ko.observable(false);

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

            const baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            const graphsUrl = baseUrl + 'graphs/' + encodeURIComponent(gid) + '?cards=true';
            
            console.log('[WF LOG][summary] Fetching graph cards from:', graphsUrl);

            return window.fetch(graphsUrl, { credentials: 'include' })
                .then(r => {
                    console.log('[WF LOG][summary] Graph fetch response status:', r.status);
                    if (!r.ok) throw new Error(`graph fetch failed: ${r.status}`);
                    return r.json();
                })
                .then(json => {
                    console.log('[WF LOG][summary] Graph API full response:', json);
                    
                    // Try multiple possible paths for cards
                    let cards = [];
                    if (json?.graph?.cards) cards = json.graph.cards;
                    else if (json?.cards) cards = json.cards;
                    else if (json?.data?.cards) cards = json.data.cards;
                    else if (Array.isArray(json)) cards = json;
                    
                    console.log('[WF LOG][summary] Found cards:', cards);
                    
                    const active = cards.find(c => c && c.active !== false) || cards[0];
                    const cardid = active?.cardid || active?.cardId || active?.card_id || null;
                    
                    console.log('[WF LOG][summary] Selected card:', active);
                    console.log('[WF LOG][summary] creatorCardId ->', cardid);
                    
                    self.creatorCardId(cardid);
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

            console.log('[WF LOG][summary] === REBUILDING RIS VM ===');
            console.log('[WF LOG][summary] Graph ID for RIS:', gid);

            self.riVm(null);
            self.riVmReady(false);
            self.error('');

            if (!gid) return;

            try {
                console.log('[WF LOG][summary] Creating new RIS instance...');
                
                const newVm = new RIS({
                    renderContext: 'workflow',
                    multiple: false,
                    value: self.riValue,
                    allowInstanceCreation: true,
                    graphids: ko.observableArray([gid]),
                    label: 'Target resource',
                    placeholder: 'Search or create new resource…',
                    displayOntologyTable: false,
                    onlyManageResourceIds: true,
                    form: params.form || null,
                    tile: null,
                    pageVm: params.pageVm
                });

                console.log('[WF LOG][summary] RIS created successfully:', newVm);
                console.log('[WF LOG][summary] RIS newResourceInstance:', newVm.newResourceInstance);
                
                self.riVm(newVm);

                window.setTimeout(function() {
                    console.log('[WF LOG][summary] RIS select2Config:', newVm.select2Config);
                    self.riVmReady(true);
                }, 50);

                // Fetch card info for creator
                fetchCreatorCardId(gid);

            } catch (err) {
                console.error('[WF LOG][summary] ❌ Error creating RIS:', err);
                self.error('Failed to initialize resource selector: ' + err.message);
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
            console.log('[WF LOG][summary] === TARGET GRAPH CHANGED ===');
            console.log('[WF LOG][summary] Old graph cleared, new graph:', newGid);
            console.log('[WF LOG][summary] Clearing riValue and rebuilding RIS');
            
            self.riValue(null);
            rebuildRiVm(newGid);
        });

        // Clear when mode changes away
        self.mode.subscribe(function(v) {
            console.log('[WF LOG][summary] === MODE CHANGED ===');
            console.log('[WF LOG][summary] New mode:', v);
            
            if (v !== 'annotation-and-resource') {
                self.riValue(null);
                self.targetGraphId('');
                self.creatorCardId(null);
                self.riVm(null);
            }
        });

        // Can continue?
        self.canSave = ko.pureComputed(function() {
            const p = self.payload();
            return !!(p && (self.mode() !== 'annotation-and-resource' || (self.targetGraphId() && self.riValue())));
        });

        self.canContinue = ko.pureComputed(function() {
            // workflow można zamknąć dopiero po udanym zapisie
            return self.canSave() && self.isSaved() && !self.isLoading();
        });

        // Wire workflow step
        if (params.form) {
            params.form.complete = self.canContinue;
            console.log('[WF LOG][summary] Workflow step complete condition set.');
        }

        // NEW: jeżeli user zmieni parametry po zapisie -> wymagaj ponownego save
        function invalidateSavedState() {
            if (self.isSaved()) {
                self.isSaved(false);
                self.success('');
            }
        }
        self.annotationLabel.subscribe(invalidateSavedState);
        self.annotationNote.subscribe(invalidateSavedState);
        self.mode.subscribe(invalidateSavedState);
        self.targetGraphId.subscribe(invalidateSavedState);
        self.riValue.subscribe(invalidateSavedState);

        // ===================== HELPER FUNCTIONS =====================
        
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0;
                var v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        function postTile(nodegroupId, data, resourceId) {
            var payload = {
                tileid: '',
                nodegroup_id: nodegroupId,
                parenttile_id: null,
                resourceinstance_id: resourceId,
                sortorder: 0,
                tiles: {},
                data: data
            };

            var formData = new window.FormData();
            formData.append('data', JSON.stringify(payload));

            var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            var url = (arches.urls && typeof arches.urls.api_tile === 'string')
                ? arches.urls.api_tile
                : baseUrl + 'tile';

            console.log('[WF LOG][summary] POST tile ->', url, payload);

            return fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: formData
            }).then(function(resp) {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.json ? resp.json() : {};
            });
        }    
        function baseRoot() {
            var root = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            return root.replace(/\/+$/, '/');
        }

        function manifestEditUrl(resourceId) {
            return baseRoot() + 'api/iiif/geotiff-manifest/edit/' + encodeURIComponent(resourceId);
        }

        let overrideReadyFor = null;

        function ensureManifestOverride(resourceId, manifest) {
            return $.ajax({
                type: 'GET',
                url: manifestEditUrl(resourceId),
                headers: { 'X-CSRFToken': getCookie('csrftoken') }
            }).catch(function() {
                return fetchResourceName(resourceId).then(function(resourceName) {
                    return $.ajax({
                        type: 'POST',
                        url: manifestEditUrl(resourceId),
                        data: JSON.stringify({
                            mode: 'replace',
                            manifest: manifest,
                            resource_name: resourceName
                        }),
                        contentType: 'application/json',
                        headers: { 'X-CSRFToken': getCookie('csrftoken') }
                    });
                });
            });
        }

        function normalizeSelector(selector) {
            if (!selector || !selector.value) return null;
            var t = String(selector.type || '').toLowerCase();
            var v = String(selector.value || '');

            if (t.indexOf('svg') >= 0) return { type: 'SvgSelector', value: v };
            if (t.indexOf('xywh') >= 0 || t.indexOf('fragment') >= 0) {
                return {
                    type: 'FragmentSelector',
                    conformsTo: 'http://www.w3.org/TR/media-frags/',
                    value: /^xywh=/.test(v) ? v : ('xywh=' + v)
                };
            }
            return selector;
        }

        function buildV3Annotation(anno, label, description) {
            var canvasId = anno.canvasId || (typeof anno.target === 'string' ? anno.target : null);
            var selector = normalizeSelector(anno.selector);
            var target = selector ? { source: canvasId, selector: selector } : canvasId;

            var title = (label || '').trim();
            var note = (description || '').trim();

            var body = [];
            if (title) {
                body.push({
                    type: 'TextualBody',
                    value: title,
                    format: 'text/plain',
                    purpose: 'tagging'
                });
            }
            if (note) {
                body.push({
                    type: 'TextualBody',
                    value: note,
                    format: 'text/plain',
                    purpose: 'commenting'
                });
            }
            if (anno.color) {
                body.push({
                    type: 'TextualBody',
                    value: anno.color,
                    format: 'text/plain',
                    purpose: 'color'
                });
            }

            var annotationResourceId =
                anno.annotationResourceId ||
                anno.annotation_resource_id ||
                null;

            // redundancja: zapisz też w body
            if (annotationResourceId) {
                body.push({
                    type: 'TextualBody',
                    value: annotationResourceId,
                    format: 'text/plain',
                    purpose: 'resource-id'
                });
            }

            if (!body.length) {
                body.push({
                    type: 'TextualBody',
                    value: 'Annotation',
                    format: 'text/plain',
                    purpose: 'commenting'
                });
            }

            var out = {
                id: anno.id || ('anno-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)),
                type: 'Annotation',
                motivation: 'commenting',
                target: target,
                body: body
            };

            if (annotationResourceId) {
                out.annotationResourceId = annotationResourceId;   // główne pole
                out.annotation_resource_id = annotationResourceId; // kompatybilność
            }

            if (title) {
                out.label = { none: [title] };
            }
            return out;
        }

        self.updateManifestOnServer = function(annotationData, digitalResourceId, sourceManifest) {
            var canvasId = annotationData.canvasId || (typeof annotationData.target === 'string' ? annotationData.target : null);
            if (!canvasId) return Promise.reject(new Error('Missing canvasId for annotation upsert'));

            var v3Anno = buildV3Annotation(
                annotationData,
                self.annotationLabel() || 'Annotation',
                self.annotationNote() || ''
            );

            return ensureManifestOverride(digitalResourceId, sourceManifest).then(function() {
                return $.ajax({
                    type: 'POST',
                    url: manifestEditUrl(digitalResourceId),
                    data: JSON.stringify({
                        mode: 'upsert_annotation',
                        canvas_id: canvasId,
                        annotation: v3Anno
                    }),
                    contentType: 'application/json',
                    headers: { 'X-CSRFToken': getCookie('csrftoken') }
                });
            });
        };

        // ===================== CREATE ANNOTATION RESOURCE =====================
        
        self.createAnnotationResource = function(anno, hostResourceId, targetResourceId) {
            var NODE_ID_LABEL = 'c6840b34-8614-4734-bdb2-10d52f258afc';
            var NODE_ID_DESCRIPTION = '897a4abf-32dd-4d1f-925e-45c8d82828b9';
            var NODE_ID_GEOMETRY = '2586e7f6-3610-4666-bc27-7efe9639dcaf';
            var NODE_ID_COLOR = '2a0b5108-ef64-47e3-9460-61c064e397b1';
            var NODE_ID_HOST_LINK = 'a2ef2d24-20ae-4070-b11b-207834905809';
            var NODEGROUP_ANNOTATION_BODY = 'a2ef2d24-20ae-4070-b11b-207834905809';

            var resourceId = uuidv4();
            console.log('[WF LOG][summary] Creating annotation resource:', resourceId);

            var labelData = {};
            if (self.annotationLabel()) {
                labelData[NODE_ID_LABEL] = self.annotationLabel();
            }

            var descData = {};
            if (self.annotationNote()) {
                descData[NODE_ID_DESCRIPTION] = self.annotationNote();
            }

            var annotationBodyData = {};
            annotationBodyData[NODE_ID_GEOMETRY] = JSON.stringify(anno.geometry);
            annotationBodyData[NODE_ID_COLOR] = anno.color || '#64ff64';
            var relatedResourceIds = [hostResourceId];
            if (targetResourceId && targetResourceId !== hostResourceId) {
                relatedResourceIds.push(targetResourceId);
            }
            annotationBodyData[NODE_ID_HOST_LINK] = relatedResourceIds.map(function(resourceId) {
                return {
                    resourceId: resourceId,
                    ontologyProperty: "",
                    inverseOntologyProperty: "",
                    resourceXresourceId: ""
                };
            });

            var promise = Promise.resolve();

            if (self.annotationLabel()) {
                promise = promise.then(() => postTile(NODE_ID_LABEL, labelData, resourceId));
            }

            if (self.annotationNote()) {
                promise = promise.then(() => postTile(NODE_ID_DESCRIPTION, descData, resourceId));
            }

            return promise
                .then(() => postTile(NODEGROUP_ANNOTATION_BODY, annotationBodyData, resourceId))
                .then(() => {
                    console.log('[WF LOG][summary] Annotation resource created:', resourceId);
                    return resourceId; // Zwróć ID stworzonego resource'a
                });
        };

        // ===================== MANUAL SAVE =====================
        
        self.manualSave = function() {
            console.log('[WF LOG][summary] === MANUAL SAVE STARTED ===');
            console.log('[WF LOG][summary] Current mode:', self.mode());
            console.log('[WF LOG][summary] Target graph ID:', self.targetGraphId());
            console.log('[WF LOG][summary] riValue (selected/created resource):', self.riValue());
            console.log('[WF LOG][summary] RIS VM state:', {
                vm: !!self.riVm(),
                ready: self.riVmReady(),
                newResourceInstance: self.riVm() && self.riVm().newResourceInstance && self.riVm().newResourceInstance()
            });

            const payload = self.payload();
            if (!payload || !payload.annotations || payload.annotations.length === 0) {
                self.error('No annotations to save');
                self.isSaved(false);
                self.success('');
                return;
            }

            self.isLoading(true);
            self.error('');
            self.success('');
            self.isSaved(false);

            console.log('[WF LOG][summary] Starting manual save...');

            // Sprawdź czy mamy wybrany/stworzony target resource
            const targetResourceId = self.riValue();
            const mode = self.mode();
            
            if (mode === 'annotation-and-resource' && targetResourceId) {
                self.saveAnnotationsWithTargetResource(payload, targetResourceId)
                    .then(function() {
                        self.isSaved(true);
                        self.success('Adnotacje zapisane poprawnie. Możesz zamknąć workflow.');
                        self.isLoading(false);
                    })
                    .catch(function(err) {
                        self.isSaved(false);
                        self.error('Failed to save: ' + err.message);
                        self.isLoading(false);
                    });
            } else {
                // Zwykły tryb - tylko adnotacje
                self.saveAnnotationsOnly(payload)
                    .then(function() {
                        self.isSaved(true);
                        self.success('Adnotacje zapisane poprawnie. Możesz zamknąć workflow.');
                        self.isLoading(false);
                    })
                    .catch(function(err) {
                        self.isSaved(false);
                        self.error('Failed to save: ' + err.message);
                        self.isLoading(false);
                    });
            }
        };

        // Store the target relation on the annotation resource.
        self.saveAnnotationsWithTargetResource = function(payload, targetResourceId) {
            const annotations = payload.annotations || [];
            const hostResourceId = payload.hostResourceId || payload.digitalResourceId;
            const sourceManifest = payload.manifest || null;

            return Promise.all(annotations.map(function(anno) {
                return self.createAnnotationResource(anno, hostResourceId, targetResourceId);
            }))
            .then(function(annotationResourceIds) {
                return Promise.all(annotations.map(function(anno, i) {
                    var withResourceId = Object.assign({}, anno, {
                        annotationResourceId: annotationResourceIds[i],
                        targetResourceId: targetResourceId,
                        linkedResourceIds: [targetResourceId]
                    });
                    return self.updateManifestOnServer(withResourceId, hostResourceId, sourceManifest);
                }));
            });
        };

        // Funkcja do zapisu tylko adnotacji (bez target resource)
        self.saveAnnotationsOnly = function(payload) {
            const annotations = payload.annotations || [];
            const hostResourceId = payload.hostResourceId || payload.digitalResourceId;
            const sourceManifest = payload.manifest || null;

            return Promise.all(annotations.map(function(anno) {
                return self.createAnnotationResource(anno, hostResourceId);
            })).then(function(annotationResourceIds) {
                return Promise.all(annotations.map(function(anno, i) {
                    var withResourceId = Object.assign({}, anno, { annotationResourceId: annotationResourceIds[i] });
                    return self.updateManifestOnServer(withResourceId, hostResourceId, sourceManifest);
                }));
            });
        };

        function fetchResourceName(resourceId) {
            var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            var url = baseUrl + 'resource/' + encodeURIComponent(resourceId);
            return fetch(url, { credentials: 'include', headers: { 'Accept': 'application/json' } })
                .then(resp => resp.json())
                .then(data => data.displayname || data.name || resourceId)
                .catch(() => resourceId);
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
