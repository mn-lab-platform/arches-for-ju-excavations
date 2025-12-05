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

            self.riVm(null);
            self.riVmReady(false);
            self.error('');

            if (!gid) return;

            try {
                console.log('[WF LOG][summary] Creating RIS for graphid:', gid);
                console.log('[WF LOG][summary] Available RIS constructor:', RIS);
                
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
            const canContinue = p && (self.mode() !== 'annotation-and-resource' || (self.targetGraphId() && self.riValue()));
            console.log('[DEBUG] canContinue:', canContinue, {
                payload: !!p,
                mode: self.mode(),
                targetGraphId: self.targetGraphId(),
                riValue: self.riValue()
            });
            return canContinue;
        });

        // Wire workflow step
        if (params.form) {
            params.form.complete = self.canContinue;
            console.log('[WF LOG][summary] Workflow step complete condition set.');
        }

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
        self.updateManifestOnServer = function(annotationData, digitalResourceId) {
                    var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
                    var backendUrl = baseUrl + 'api/manifest/update_db'; 

                    // Używamy selektora z annotatora
                    var selector = annotationData.selector; // {type:..., value:...} (svg/xywh)
                    
                    // Preferuj xywh z annotatora, jeśli brakuje
                    if (!selector && annotationData.geometry) {
                        // fallback (gdyby coś poszło nie tak, ale getIIIFSelectorFromLayer powinien to załatwić)
                        var xywhString = getXYWHFromGeoJSON(annotationData.geometry);
                        selector = { type: 'xywh', value: xywhString };
                    }

                    var payload = {
                        digital_resource_id: digitalResourceId,
                        annotation: {
                            label: self.annotationLabel() || 'Annotation',
                            description: self.annotationNote() || '', // <--- DODANO TO POLE
                            selector: selector,
                            geometry: annotationData.geometry
                        }
                    };

                    console.log('[WF LOG][summary] Sending to backend:', payload);

                    return $.ajax({
                        type: "POST",
                        url: backendUrl,
                        data: JSON.stringify(payload),
                        contentType: "application/json",
                        headers: { 'X-CSRFToken': getCookie('csrftoken') }
                    }).then(function(res) {
                        console.log("[WF LOG][summary] Manifest updated:", res);
                        return res;
                    });
                };
        // ===================== CREATE ANNOTATION RESOURCE =====================
        
        self.createAnnotationResource = function(anno, hostResourceId) {
            var ANNOTATION_GRAPH_ID = '96e396f9-3fb8-47bf-b14c-189e9c1dee97'; 
            var NODE_ID_LABEL = 'f51dfa50-b888-4ea7-93e8-d5263fbeaf87';
            var NODE_ID_DESCRIPTION = '05c7457d-69ba-4856-b898-88e9451a1aa5';
            var NODE_ID_GEOMETRY = 'b2ad31fe-9cdb-4ab5-a7de-a227ef1c8b0c';
            var NODE_ID_HOST_LINK = '4318dc2f-d592-46f3-883a-91a0f95bedcd';

            var resourceId = uuidv4();
            console.log('[WF LOG][summary] Creating annotation resource:', resourceId, 'for geometry:', anno.geometry);

            var labelData = {};
            if (self.annotationLabel()) {
                labelData[NODE_ID_LABEL] = self.annotationLabel();
            }

            var descData = {};
            if (self.annotationNote()) {
                descData[NODE_ID_DESCRIPTION] = self.annotationNote();
            }

            var geomData = {};
            geomData[NODE_ID_GEOMETRY] = JSON.stringify(anno.geometry);

            var hostLinkData = {};
            hostLinkData[NODE_ID_HOST_LINK] = [{
                resourceId: hostResourceId,
                ontologyProperty: "",
                inverseOntologyProperty: "",
                resourceXresourceId: ""
            }];

            // Chain tile creation
            var promise = Promise.resolve();

            if (self.annotationLabel()) {
                promise = promise.then(function() {
                    return postTile(NODE_ID_LABEL, labelData, resourceId);
                });
            }

            if (self.annotationNote()) {
                promise = promise.then(function() {
                    return postTile(NODE_ID_DESCRIPTION, descData, resourceId);
                });
            }

            return promise
                .then(function() {
                    return postTile(NODE_ID_GEOMETRY, geomData, resourceId);
                })
                .then(function() {
                    return postTile(NODE_ID_HOST_LINK, hostLinkData, resourceId);
                })
                .then(function() {
                    console.log('[WF LOG][summary] Annotation resource created successfully:', resourceId);
                    return resourceId;
                });
        };

        // ===================== MANUAL SAVE =====================
        
        self.manualSave = function() {
            console.log('[WF LOG][summary] manualSave clicked');
            self.isLoading(true);
            self.error('');
            
            var payload = self.payload() || {};
            var annotations = payload.annotations || [];
            var hostResourceId = payload.hostResourceId; // ✅ To jest ID zdjęcia z manifestem

            if (!payload || annotations.length === 0) {
                self.error('Brak adnotacji do zapisania.');
                self.isLoading(false);
                return;
            }

            if (!hostResourceId) {
                self.error('Brak ID zasobu hosta (zdjęcia z manifestem).');
                self.isLoading(false);
                return;
            }

            console.log('[WF LOG][summary] Host resource ID:', hostResourceId);
            console.log('[WF LOG][summary] Creating', annotations.length, 'annotation(s)');

            // ✅ Najpierw wywołaj backend Python dla każdej adnotacji
            var manifestUpdatePromises = annotations.map(function(anno) {
                return self.updateManifestOnServer(anno, hostResourceId); // ✅ Używaj hostResourceId
            });

            Promise.all(manifestUpdatePromises)
                .then(function(manifestResults) {
                    console.log('[WF LOG][summary] Manifests updated:', manifestResults);
                    
                    // ✅ Dopiero potem twórz zasoby Annotation
                    var annoResourcePromises = annotations.map(function(anno) {
                        return self.createAnnotationResource(anno, hostResourceId);
                    });
                    
                    return Promise.all(annoResourcePromises);
                })
                .then(function(annoResourceIds) {
                    self.isLoading(false);
                    self.error('');
                    console.log('[WF LOG][summary] All done! Annotation IDs:', annoResourceIds);
                    alert('✅ Adnotacje zapisane w manifeście i jako zasoby!\nIDs: ' + annoResourceIds.join(', '));
                })
                .catch(function(err) {
                    self.isLoading(false);
                    self.error('Błąd zapisu: ' + (err.message || err));
                    console.error('[WF LOG][summary] Save failed:', err);
                });
        };

        self.dispose = function() {
            // no custom subscriptions to clean right now
        };

    }

    return ko.components.register('iiif-annotation-summary-step', {
        viewModel: viewModel,
        template: template
    });
});
