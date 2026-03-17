define([
    'knockout',
    'jquery',
    'arches',
    // komponent mapy (V3)
    'views/components/iiif/iiif-map-viewer',
    'templates/views/components/workflows/iiif-annotation/iiif-annotator-step.htm'
    ], function(ko, $, arches, _MapViewer, template) {
    'use strict';

    function viewModel(params) {
        var self = this;

        // ---- workflow params ----
        if (typeof params.value !== 'function') params.value = ko.observable(null);
        self.value = params.value;

        self.hostResourceId = ko.observable(ko.unwrap(params.hostResourceId) || null);

        // ---- state ----
        self.loading = ko.observable(false);
        self.error = ko.observable('');

        // V3 manifest (source of truth)
        self.manifest = ko.observable(null);

        // optional: extracted iiif service url (debug/legacy)
        self.imageServiceUrl = ko.observable('');

        // existing + new annotations (workflow payload uses NEW only)
        self.existingAnnotations = ko.observableArray([]);
        self.newAnnotations = ko.observableArray([]);

        // --- Finalize Modal ---
        self.showFinalizeModal = ko.observable(false);
        self.outputMode = ko.observable('annotation-only');
        self.targetGraphId = ko.observable('');
        self.availableOutputGraphs = ko.observableArray([]);

        // =====================================================================
        // helpers
        // =====================================================================

        function baseRoot() {
        var root = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
        return root.replace(/\/+$/, '/') ;
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

        function safeJsonGet(url) {
        return $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            xhrFields: { withCredentials: true }
        });
        }

        // Walk object and try to find iiif-ish URLs (legacy convenience)
        function extractIiifFromTiles(tilesResp) {
        var candidates = [];
        function walk(o) {
            if (!o) return;
            if (typeof o === 'string') {
            if (o.indexOf('/iiif/') >= 0 || /\/info\.json$/i.test(o)) candidates.push(o);
            return;
            }
            if (Array.isArray(o)) { o.forEach(walk); return; }
            if (typeof o === 'object') { Object.keys(o).forEach(function(k){ walk(o[k]); }); }
        }
        walk(tilesResp);
        return (candidates[0] || '').replace(/\/info\.json$/i, '');
        }

        // IIIF Presentation 3: collect annotations from canvas.annotations[*].items
        function collectV3AnnotationsFromManifest(manifest) {
        var out = [];
        try {
            var canvases = (manifest && Array.isArray(manifest.items)) ? manifest.items : [];
            canvases.forEach(function(canvas) {
            var canvasId = canvas && canvas.id ? canvas.id : null;
            var pages = Array.isArray(canvas.annotations) ? canvas.annotations : [];
            pages.forEach(function(page) {
                if (page && Array.isArray(page.items)) {
                page.items.forEach(function(anno) {
                    var a = Object.assign({}, anno);
                    if (!a.canvasId) a.canvasId = canvasId;
                    out.push(a);
                });
                }
            });
            });
        } catch (e) {}
        return out;
        }

        // =====================================================================
        // data loading
        // =====================================================================

        self.loadHostResource = function(resourceId) {
        if (!resourceId) return;

        self.loading(true);
        self.error('');
        self.manifest(null);
        self.existingAnnotations.removeAll();
        self.newAnnotations.removeAll();

        var root = baseRoot();

        // 1) optional: fetch tiles to extract iiif service url (not required by viewer)
        var tilesUrl = root + 'resource/' + encodeURIComponent(resourceId) + '/tiles';

        // 2) fetch V3 manifest (this is required)
        var manifestUrl = root + 'api/iiif/geotiff-manifest/' + encodeURIComponent(resourceId);

        var tilesReq = $.ajax({
            url: tilesUrl,
            method: 'GET',
            dataType: 'json',
            xhrFields: { withCredentials: true }
        });

        var manifestReq = safeJsonGet(manifestUrl);

        $.when(tilesReq, manifestReq)
            .done(function(tilesResp, manifestResp) {
            // jQuery returns [data, status, xhr] tuples for $.when
            var tilesJson = tilesResp && tilesResp[0] ? tilesResp[0] : tilesResp;
            var manifestJson = manifestResp && manifestResp[0] ? manifestResp[0] : manifestResp;

            var iiif = extractIiifFromTiles(tilesJson);
            if (iiif) self.imageServiceUrl(iiif);

            // sanity: must look like IIIF v3
            if (!manifestJson || !Array.isArray(manifestJson.items)) {
                self.error('Manifest does not look like IIIF Presentation 3 (missing items[]).');
                self.loading(false);
                return;
            }

            self.manifest(manifestJson);

            // collect existing annotations (embedded only)
            var existing = collectV3AnnotationsFromManifest(manifestJson);
            self.existingAnnotations(existing);

            self.loading(false);
            })
            .fail(function(xhr) {
            self.loading(false);
            var msg = 'Failed to load manifest/tiles';
            try {
                if (xhr && xhr.responseJSON && xhr.responseJSON.error) msg = xhr.responseJSON.error;
                else if (xhr && xhr.responseText) msg = xhr.responseText;
            } catch (_) {}
            self.error(msg);
            });
        };

        // init
        if (self.hostResourceId()) {
        self.loadHostResource(self.hostResourceId());
        }

        // =====================================================================
        // handlers from map-viewer (future-proof)
        // =====================================================================

        self.handleNewAnnotation = function(annoPayload) {
        // viewer should send a normalized payload; we store it verbatim + stable id
        self.newAnnotations.push({
            id: annoPayload.id || ('anno-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)),
            type: annoPayload.type || 'Polygon',
            canvasId: annoPayload.canvasId || null,
            selector: annoPayload.selector || null,        // SvgSelector / FragmentSelector
            geometry: annoPayload.geometry || null,        // optional GeoJSON (pixel or local)
            localGeometry: annoPayload.localGeometry || null, // optional GeoJSON local CRS
            created: annoPayload.created || new Date().toISOString(),
            body: annoPayload.body || null,
            color: annoPayload.color || '#64ff64' 
        });
        };

        // NOTE: your current delete endpoint deletes by index (fragile).
        // This hook stays, but treat it as legacy until you switch to annotation_id.
        self.handleAnnotationDeleted = function(annotationOrIndex) {
        var annos = self.existingAnnotations().slice();
        var anno = null;

        if (typeof annotationOrIndex === 'number') {
            var idx = annotationOrIndex;
            if (idx >= 0 && idx < annos.length) anno = annos[idx];
            if (idx >= 0 && idx < annos.length) {
            annos.splice(idx, 1);
            self.existingAnnotations(annos);
            }
        } else if (annotationOrIndex && typeof annotationOrIndex === 'object') {
            anno = annotationOrIndex;
            self.existingAnnotations(annos.filter(function(a){ return a.id !== anno.id; }));
        }

        if (anno && anno.id && (anno.canvasId || (anno.target && typeof anno.target === 'string'))) {
            self.deleteAnnotationFromServer(anno);
        }
        };

        self.deleteAnnotationFromServer = function(annotation) {
        var root = baseRoot();
        var rid = self.hostResourceId();
        var deleteUrl = root + 'api/iiif/geotiff-manifest/edit/' + encodeURIComponent(rid);

        var canvasId = annotation.canvasId || (typeof annotation.target === 'string' ? annotation.target : null);

        return $.ajax({
            url: deleteUrl,
            method: 'POST',
            contentType: 'application/json',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            data: JSON.stringify({
            mode: 'delete_annotation',
            canvas_id: canvasId,
            annotation_id: annotation.id
            })
        }).fail(function(err) {
            console.error('[iiif-annotator-step] Failed to delete annotation:', err);
            alert('Failed to delete annotation from server (state may be inconsistent).');
        });
        };

        // =====================================================================
        // workflow save / modal
        // =====================================================================

        self.openFinalizeModal = function() { self.showFinalizeModal(true); };
        self.cancelFinalizeModal = function() { self.showFinalizeModal(false); };

        function buildStepPayload() {
        return {
            hostResourceId: self.hostResourceId(),
            digitalResourceId: self.hostResourceId(),
            iiifServiceUrl: self.imageServiceUrl(), // legacy/debug
            manifest: self.manifest(),              // <-- V3 manifest (source of truth)
            annotations: self.newAnnotations(),     // only NEW go to summary/save
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

        // Save hook
        if (params.form && params.form.save) {
        var origSave = params.form.save;
        params.form.save = function() {
            self.value(buildStepPayload());
            return origSave ? origSave.apply(params.form, arguments) : Promise.resolve(true);
        };
        }

        // Gating
        if (params.form && params.form.complete) {
        params.form.complete(ko.pureComputed(function() {
            // allow complete only if manifest loaded AND at least one new annotation
            return !!self.manifest() && self.newAnnotations().length > 0;
        }));
        }

        // optional: load graphs for modal
        function readCreateableResources() {
        var vm = params.pageVm || {};
        var list = ko.unwrap(vm.createableResources || []);
        self.availableOutputGraphs(list.map(function(g) { return { graphid: g.graphid, name: g.name }; }));
        }
        ko.computed(readCreateableResources);

        return self;
    }

    return ko.components.register('iiif-annotator-step', {
        viewModel: viewModel,
        template: template
    });
    });