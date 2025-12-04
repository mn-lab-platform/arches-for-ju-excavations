define([
    'knockout',
    'jquery',
    'arches',
    // Importujemy nasz nowy komponent (upewnij się co do ścieżki!)
    'views/components/iiif/iiif-map-viewer', 
    'templates/views/components/workflows/iiif-annotation/iiif-annotator-step.htm'
], function(ko, $, arches, MapViewer, template) {
    'use strict';

    function viewModel(params) {
        var self = this;

        console.log('[WF LOG] Annotator Step Loaded');

        // --- Workflow Params ---
        if (typeof params.value !== 'function') params.value = ko.observable(null);
        self.value = params.value;

        self.hostResourceId = ko.observable(ko.unwrap(params.hostResourceId) || null);

        // --- State ---
        self.imageServiceUrl = ko.observable('');
        self.existingAnnotations = ko.observableArray([]); // To przekażemy do mapy
        self.newAnnotations = ko.observableArray([]);      // To odbierzemy z mapy

        // --- Finalize Modal ---
        self.showFinalizeModal = ko.observable(false);
        self.outputMode = ko.observable('annotation-only');
        self.targetGraphId = ko.observable('');
        self.availableOutputGraphs = ko.observableArray([]);

        // =====================================================================
        // DATA LOADING (Arches API)
        // =====================================================================

        // 1. Pobierz URL obrazka z kafelków
        self.loadHostResource = function(resourceId) {
            if (!resourceId) return;
            // Add null check for arches.urls
            var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            var tilesUrl = baseUrl + 'resource/' + encodeURIComponent(resourceId) + '/tiles';
            
            $.ajax({ url: tilesUrl, method: 'GET', xhrFields: { withCredentials: true } })
                .done(function(resp) {
                    var iiif = extractIiifFromTiles(resp);
                    if (iiif) {
                        console.log('[WF LOG] Found Image URL:', iiif);
                        self.imageServiceUrl(iiif);
                        // Jak mamy obrazek, to szukamy adnotacji
                        self.loadExistingAnnotations(resourceId);
                    }
                });
        };

        // 2. Pobierz Manifest i Adnotacje
        self.loadExistingAnnotations = function(resourceId) {
            var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            var manifestUrl = baseUrl + 'manifest/' + resourceId;
            $.getJSON(manifestUrl, function(manifest) {
                try {
                    var canvas = manifest.sequences[0].canvases[0];
                    if (canvas.otherContent && canvas.otherContent.length > 0) {
                        var listUrl = canvas.otherContent[0]['@id'];
                        $.getJSON(listUrl, function(annoList) {
                            if (annoList && annoList.resources) {
                                console.log('[WF LOG] Loaded existing annotations:', annoList.resources.length);
                                self.existingAnnotations(annoList.resources);
                            }
                        });
                    }
                } catch(e) { console.warn('No annotations found/manifest structure error', e); }
            });
        };

        // Helper do wyciągania URL z tilesów
        function extractIiifFromTiles(tilesResp) {
            var candidates = [];
            function walk(o) {
                if (!o) return;
                if (typeof o === 'string') {
                    if (o.includes('/iiif/') || /\/info\.json$/i.test(o)) candidates.push(o);
                    return;
                }
                if (Array.isArray(o)) { o.forEach(walk); return; }
                if (typeof o === 'object') { Object.keys(o).forEach(function(k){ walk(o[k]); }); }
            }
            walk(tilesResp);
            return (candidates[0] || '').replace(/\/info\.json$/i, '');
        }

        // Inicjalizacja
        if (self.hostResourceId()) {
            self.loadHostResource(self.hostResourceId());
        }

        // =====================================================================
        // HANDLERS (Komunikacja z Mapą)
        // =====================================================================

        // Funkcja przekazywana do komponentu mapy
        self.handleNewAnnotation = function(annoPayload) {
            console.log('[WF LOG] Received new annotation from map:', annoPayload);
            // Dodajemy do naszej listy, która pójdzie do zapisu
            self.newAnnotations.push({
                id: 'anno-' + Date.now(),
                type: annoPayload.type,
                selector: annoPayload.selector, // SVG lub XYWH
                geometry: annoPayload.geometry, // GeoJSON
                created: annoPayload.created
            });
        };

        // ✅ NEW: Handle annotation deletion
        self.handleAnnotationDeleted = function(annotationIndex) {
            console.log('[WF LOG] Annotation deleted annotationIndex:', annotationIndex);
            
            // Remove from existing annotations array
            var annos = self.existingAnnotations();
            if (annotationIndex >= 0 && annotationIndex < annos.length) {
                annos.splice(annotationIndex, 1);
                self.existingAnnotations(annos);
            }
            
            // Call backend with INDEX
            self.deleteAnnotationFromServer(annotationIndex);
        };

        self.deleteAnnotationFromServer = function(annotationIndex) {
            var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            var deleteUrl = baseUrl + 'api/manifest/delete_annotation';
            
            $.ajax({
                url: deleteUrl,
                method: 'POST',
                contentType: 'application/json',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                data: JSON.stringify({
                    digital_resource_id: self.hostResourceId(),
                    annotation_index: annotationIndex
                })
            })
            .done(function(response) {
                console.log('[WF LOG] Annotation deleted from server:', response);
            })
            .fail(function(err) {
                console.error('[WF LOG] Failed to delete annotation:', err);
                alert('Failed to delete annotation from server');
            });
        };

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

        // =====================================================================
        // WORKFLOW LOGIC (Save, Modal)
        // =====================================================================

        self.openFinalizeModal = function() { self.showFinalizeModal(true); };
        self.cancelFinalizeModal = function() { self.showFinalizeModal(false); };

        function buildStepPayload() {
            return {
                hostResourceId: self.hostResourceId(),
                digitalResourceId: self.hostResourceId(),
                iiifServiceUrl: self.imageServiceUrl(),
                annotations: self.newAnnotations(), // Tylko nowe idą do zapisu!
                output: {
                    mode: self.outputMode(),
                    targetGraphId: self.targetGraphId()
                }
            };
        }

        self.confirmFinalizeModal = function() {
            self.value(buildStepPayload());
            self.showFinalizeModal(false);
        };

        // Save Hook
        if (params.form && params.form.save) {
            var origSave = params.form.save;
            params.form.save = function() {
                if (self.newAnnotations().length === 0) {
                    // Możemy pozwolić przejść bez nowych adnotacji, albo zablokować
                    // return Promise.reject(new Error('Draw something first!'));
                }
                self.value(buildStepPayload());
                return origSave ? origSave.apply(params.form, arguments) : Promise.resolve(true);
            };
        }
        
        // Gating
        if (params.form && params.form.complete) {
            params.form.complete(ko.pureComputed(function() {
                return self.imageServiceUrl() && self.newAnnotations().length > 0;
            }));
        }

        // Opcjonalne ładowanie listy grafów (dla modala)
        function readCreateableResources() {
            var vm = params.pageVm || {};
            var list = ko.unwrap(vm.createableResources || []);
            self.availableOutputGraphs(list.map(g => ({ graphid: g.graphid, name: g.name })));
        }
        ko.computed(readCreateableResources);

        return self;
    }

    return ko.components.register('iiif-annotator-step', {
        viewModel: viewModel,
        template: template
    });
});32