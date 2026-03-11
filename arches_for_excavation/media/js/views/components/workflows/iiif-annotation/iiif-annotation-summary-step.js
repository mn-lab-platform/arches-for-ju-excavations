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
        function baseRoot() {
            var root = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            return root.replace(/\/+$/, '/');
        }

        function manifestEditUrl(resourceId) {
            return baseRoot() + 'api/iiif/geotiff-manifest/edit/' + encodeURIComponent(resourceId);
        }

        let overrideReadyFor = null;

        function ensureManifestOverride(resourceId, manifest) {
            return fetchResourceName(resourceId).then(function(resourceName) {
                return $.ajax({
                    type: 'POST',
                    url: manifestEditUrl(resourceId),
                    data: JSON.stringify({ mode: 'replace', manifest: manifest, resource_name: resourceName }),
                    contentType: 'application/json',
                    headers: { 'X-CSRFToken': getCookie('csrftoken') }
                }).then(function() {
                    overrideReadyFor = resourceId;
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

            return {
                id: anno.id || ('anno-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)),
                type: 'Annotation',
                motivation: 'commenting',
                target: target,
                body: [{
                    type: 'TextualBody',
                    value: (description || label || 'Annotation'),
                    format: 'text/plain',
                    purpose: 'commenting'
                }]
            };
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
        
        self.createAnnotationResource = function(anno, hostResourceId) {
            // Zawsze używaj domyślnego grafu adnotacji
            var ANNOTATION_GRAPH_ID = 'ddd13240-8e2b-414f-a652-abab00a02015'; 
            var NODE_ID_LABEL = 'e202ea9f-e0a9-42a3-85a1-6380bc1115b9';
            var NODE_ID_DESCRIPTION = 'e4c6d7e5-317d-4d04-9936-e4ad1886ba05';
            var NODE_ID_GEOMETRY = '4277f805-09e7-4db1-bf26-49c09132c720';
            var NODE_ID_HOST_LINK = '5266b89c-72f7-41cf-a7f4-cde1df9efef9';

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

            var geomData = {};
            geomData[NODE_ID_GEOMETRY] = JSON.stringify(anno.geometry);

            var hostLinkData = {};
            hostLinkData[NODE_ID_HOST_LINK] = [{
                resourceId: hostResourceId,
                ontologyProperty: "",
                inverseOntologyProperty: "",
                resourceXresourceId: ""
            }];

            var promise = Promise.resolve();

            if (self.annotationLabel()) {
                promise = promise.then(() => postTile(NODE_ID_LABEL, labelData, resourceId));
            }

            if (self.annotationNote()) {
                promise = promise.then(() => postTile(NODE_ID_DESCRIPTION, descData, resourceId));
            }

            return promise
                .then(() => postTile(NODE_ID_GEOMETRY, geomData, resourceId))
                .then(() => postTile(NODE_ID_HOST_LINK, hostLinkData, resourceId))
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
                return;
            }

            self.isLoading(true);
            self.error('');

            console.log('[WF LOG][summary] Starting manual save...');

            // Sprawdź czy mamy wybrany/stworzony target resource
            const targetResourceId = self.riValue();
            const mode = self.mode();
            
            if (mode === 'annotation-and-resource' && targetResourceId) {
                console.log('[WF LOG][summary] Checking structure of target resource:', targetResourceId);
                
                // Sprawdź strukturę wybranego resource'a
                checkSelectedResourceStructure(targetResourceId)
                    .then(function(targetResourceInfo) {
                        console.log('[WF LOG][summary] Target resource analysis:', targetResourceInfo);
                        
                        // Zapisz wszystkie adnotacje
                        return self.saveAnnotationsWithTargetResource(payload, targetResourceId, targetResourceInfo);
                    })
                    .then(function() {
                        console.log('[WF LOG][summary] All annotations saved with target resource successfully');
                        self.isLoading(false);
                    })
                    .catch(function(err) {
                        console.error('[WF LOG][summary] Error in save with target resource:', err);
                        self.error('Failed to save: ' + err.message);
                        self.isLoading(false);
                    });
            } else {
                // Zwykły tryb - tylko adnotacje
                self.saveAnnotationsOnly(payload)
                    .then(function() {
                        console.log('[WF LOG][summary] All annotations saved successfully');
                        self.isLoading(false);
                    })
                    .catch(function(err) {
                        console.error('[WF LOG][summary] Error in save:', err);
                        self.error('Failed to save: ' + err.message);
                        self.isLoading(false);
                    });
            }
        };

        // Nowa funkcja do zapisu z target resource'em
        self.saveAnnotationsWithTargetResource = function(payload, targetResourceId, targetResourceInfo) {
            const annotations = payload.annotations || [];
            const hostResourceId = payload.hostResourceId || payload.digitalResourceId;
            const sourceManifest = payload.manifest || null;
            
            console.log('[WF LOG][summary] Saving', annotations.length, 'annotations with target resource');
            console.log('[WF LOG][summary] Full annotations data:', annotations); // ✅ ADD: Debug log
            
            // Zapisz wszystkie adnotacje i zbierz ich ID
            const annotationPromises = annotations.map(function(anno) {
                return self.createAnnotationResource(anno, hostResourceId);
            });
            
            return Promise.all(annotationPromises)
                .then(function(annotationResourceIds) {
                    console.log('[WF LOG][summary] Created annotation resources:', annotationResourceIds);
                    console.log('[WF LOG][summary] hasRelatedNode:', targetResourceInfo.hasRelatedNode);
                    console.log('[WF LOG][summary] canLinkToAnnotations:', targetResourceInfo.canLinkToAnnotations);
                    // Teraz dodaj relacje do target resource'a
                    if (targetResourceInfo.hasRelatedNode) {
                        return self.addAnnotationsToTargetResource(targetResourceId, annotationResourceIds, targetResourceInfo);
                    } else {
                        console.log('[WF LOG][summary] Target resource cannot link to annotations, skipping relation');
                        return Promise.resolve();
                    }
                })
                .then(function() {
                    // ✅ FIX: Pass the full annotation object with selector and geometry
                    const manifestPromises = annotations.map(function(anno) {
                        return self.updateManifestOnServer(anno, hostResourceId, sourceManifest);
                    });
                    
                    return Promise.all(manifestPromises);
                });
        };

        // Funkcja do dodawania relacji adnotacji do target resource'a
        self.addAnnotationsToTargetResource = function(targetResourceId, annotationResourceIds, targetResourceInfo) {
            console.log('[WF LOG][summary] === ADDING ANNOTATIONS TO TARGET ===');
            console.log('[WF LOG][summary] 🎯 Target Resource ID:', targetResourceId);
            console.log('[WF LOG][summary] 🎯 Target Resource Info:', targetResourceInfo);
            console.log('[WF LOG][summary] 🎯 Annotation IDs to link:', annotationResourceIds);
            console.log('[WF LOG][summary] 🎯 Cardinality:', targetResourceInfo.cardinality);

            // Przygotuj dane relacji - wszystkie adnotacje jako jedna lista
            const relData = {};
            relData[targetResourceInfo.nodeGroupId] = annotationResourceIds.map(function(annotationId) {
                return {
                    resourceId: annotationId,
                    ontologyProperty: "",
                    inverseOntologyProperty: "",
                    resourceXresourceId: ""
                };
            });
            console.log('[WF LOG][summary] Relation data to post:', relData);
            console.log('[WF LOG][summary] Target resource ID:', targetResourceId);
            console.log('[WF LOG][summary] Target resource nodeGroupId:', targetResourceInfo.nodeGroupId);
            // Wyślij tile z relacjami do target resource'a
            return postTile(targetResourceInfo.nodeGroupId, relData, targetResourceId)
                .then(function() {
                    console.log('[WF LOG][summary] Successfully added annotation relations to target resource');
                });
        };

        // Funkcja do zapisu tylko adnotacji (bez target resource)
        self.saveAnnotationsOnly = function(payload) {
            const annotations = payload.annotations || [];
            const hostResourceId = payload.hostResourceId || payload.digitalResourceId;
            const sourceManifest = payload.manifest || null;
            
            console.log('[WF LOG][summary] Saving', annotations.length, 'annotations only');
            
            const promises = annotations.map(function(anno) {
                // Utwórz annotation resource
                return self.createAnnotationResource(anno, hostResourceId)
                    .then(function(annotationResourceId) {
                        // Zaktualizuj manifest
                        return self.updateManifestOnServer(anno, hostResourceId, sourceManifest);
                    });
            });
            
            return Promise.all(promises);
        };

        // Dodaj nową funkcję do sprawdzania struktury wybranego/stworzonego resource'a
        // ✅ POPRAW: Sprawdzaj strukturę grafu bezpośrednio
        function checkSelectedResourceStructure(resourceId) {
            console.log('[WF LOG][summary] === CHECKING SELECTED RESOURCE STRUCTURE ===');
            console.log('[WF LOG][summary] Resource ID to check:', resourceId);
            
            if (!resourceId) {
                console.log('[WF LOG][summary] No resource ID provided, returning false');
                return Promise.resolve({ hasRelatedNode: false });
            }
            
            // ✅ ZMIANA: Pobierz graphId z Resource Instance Select
            // Kiedy użytkownik wybiera resource, RIS powinien wiedzieć jaki to graf
            const selectedGraphId = self.targetGraphId(); // To już mamy!
            
            if (!selectedGraphId) {
                console.error('[WF LOG][summary] No target graph ID available');
                return Promise.resolve({ 
                    hasRelatedNode: false, 
                    error: 'No graph ID available for selected resource' 
                });
            }
            
            console.log('[WF LOG][summary] Using target graph ID:', selectedGraphId);
            
            // Teraz sprawdź strukturę tego grafu bezpośrednio
            return checkGraphForRelatedResourceNode(selectedGraphId).then(graphInfo => {
                console.log('[WF LOG][summary] Graph analysis complete:', graphInfo);
                return {
                    ...graphInfo,
                    resourceGraphId: selectedGraphId,
                    resourceId: resourceId
                };
            });
        }

        function checkGraphForRelatedResourceNode(graphId) {
            console.log('[WF LOG][summary] === CHECKING GRAPH STRUCTURE ===');
            console.log('[WF LOG][summary] Graph ID to analyze:', graphId);
            
            const baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            const url = `${baseUrl}graphs/${graphId}?cards=true`;
            
            console.log('[WF LOG][summary] Fetching graph structure from URL:', url);
            
            return fetch(url, { 
                credentials: 'include',
                headers: { 'Accept': 'application/json' }
            })
            .then(resp => {
                console.log('[WF LOG][summary] Graph API response status:', resp.status);
                console.log('[WF LOG][summary] Response content-type:', resp.headers.get('content-type'));
                
                if (!resp.ok) {
                    throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
                }
                return resp.json();
            })
            .then(graphData => {
                console.log('[WF LOG][summary] ✅ Graph structure received');
                console.log('[WF LOG][summary] Graph data keys:', Object.keys(graphData || {}));
                console.log('[WF LOG][summary] Cards count:', (graphData.cards || []).length);
                
                const cards = graphData.cards || [];
                let relatedNode = null;
                let cardIndex = -1;
                
                console.log('[WF LOG][summary] 🔍 Searching through cards for related nodes...');
                
                for (let i = 0; i < cards.length; i++) {
                    const card = cards[i];
                    console.log(`[WF LOG][summary] Checking card ${i}:`, {
                        cardid: card.cardid,
                        name: card.name,
                        nodes_count: (card.nodes || []).length
                    });
                    
                    const nodes = card.nodes || [];
                    for (let j = 0; j < nodes.length; j++) {
                        const node = nodes[j];
                        console.log(`[WF LOG][summary]   Node ${j}:`, {
                            name: node.name,
                            datatype: node.datatype,
                            nodeid: node.nodeid
                        });
                
                        if (node.datatype === 'resource-instance-list' || node.datatype === 'resource-instance') {
                            console.log(`[WF LOG][summary] 🎯 FOUND RELATED NODE at card ${i}, node ${j}!`);
                            relatedNode = node;
                            cardIndex = i;
                            break;
                        }
                    }
                    
                    if (relatedNode) break;
                }
                
                if (relatedNode) {
                    console.log('[WF LOG][summary] ✅ Related node found:', relatedNode);
                    console.log('[WF LOG][summary] Node config:', relatedNode.config);
                    
                    // Sprawdź czy może linkować do adnotacji
                    const config = relatedNode.config || {};
                    const allowedGraphs = config.graphs || [];
                    
                    console.log('[WF LOG][summary] Allowed graphs for this node:', allowedGraphs);
                    
                    const canLinkToAnnotations = allowedGraphs.some(g => {
                        const canLink = g.name && (
                            g.name.toLowerCase().includes('annotation') ||
                            g.name.toLowerCase().includes('iiif') ||
                            g.graphid === '96e396f9-3fb8-47bf-b14c-189e9c1dee97'
                        );
                        
                        console.log('[WF LOG][summary] Checking graph:', {
                            name: g.name,
                            graphid: g.graphid,
                            canLink: canLink
                        });
                        
                        return canLink;
                    });
                    
                    console.log('[WF LOG][summary] Can link to annotations:', canLinkToAnnotations);
                    
                    const result = {
                        hasRelatedNode: true,
                        nodeId: relatedNode.nodeid,
                        nodeGroupId: relatedNode.nodegroup_id,
                        name: relatedNode.name,
                        canLinkToAnnotations: canLinkToAnnotations,
                        allowedGraphs: allowedGraphs
                    };
                    
                    console.log('[WF LOG][summary] ✅ Final result:', result);
                    return result;
                }
                
                console.log('[WF LOG][summary] ❌ No related resource node found in any card');
                return { 
                    hasRelatedNode: false,
                    canLinkToAnnotations: false
                };
            })
            .catch(err => {
                console.error('[WF LOG][summary] ❌ Error checking graph structure:', err);
                console.error('[WF LOG][summary] Error details:', {
                    message: err.message,
                    stack: err.stack
                });
                return { 
                    hasRelatedNode: false,
                    canLinkToAnnotations: false,
                    error: err.message
                };
            });
        }

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
