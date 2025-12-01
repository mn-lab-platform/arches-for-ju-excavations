define([
  'knockout',
  'jquery',
  'arches',
  'leaflet',
  'leaflet-draw',
  'leaflet-iiif',
  'templates/views/components/workflows/iiif-annotation/iiif-annotator-step.htm'
], function(ko, $, arches, Leaflet, _draw, _iiif, template) {
  'use strict';

  // (opcjonalnie) jeśli masz pewny node id z IIIF url w tiles
  // var DIGITAL_RES_URL_NODE_ID = 'e0216dc7-89ba-4a27-9126-bf7e06d859a8';

  function viewModel(params) {
    var self = this;
    var L = Leaflet || window.L;

    console.log('[WF LOG] Annotator init, params:', params);

    // ensure workflow output observable
    if (typeof params.value !== 'function') params.value = ko.observable(null);
    self.value = params.value;

    // ==== Inputs ====
    self.hostResourceId = ko.observable(null);
    if (typeof params.hostResourceId === 'function') {
      self.hostResourceId(ko.unwrap(params.hostResourceId));
      ko.computed(function() {
        self.hostResourceId(ko.unwrap(params.hostResourceId) || null);
      });
    } else if (params.hostResourceId) {
      self.hostResourceId(params.hostResourceId);
    }

    // ==== Map / IIIF state ====
    self.imageServiceUrl = ko.observable('');     // <--- template uses this
    self.map = null;
    self.iiifLayer = null;
    self._mapInitialized = false;

    self.annotations = ko.observableArray([]);

    // ==== Finalize state ====
    self.isFinalized = ko.observable(false);
    self.showFinalizeModal = ko.observable(false);

    self.outputMode = ko.observable('annotation-only'); // 'annotation-only' | 'annotation-and-resource'
    self.targetGraphId = ko.observable('');

    self.availableOutputGraphs = ko.observableArray([]);

    // ---- helpers ----
    function unwrap(x) { return ko.isObservable(x) ? x() : x; }

    function extractIiifFromTiles(tilesResp) {
      // Najpierw spróbuj “normalnie”: tiles to lista
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

      var url = candidates[0] || '';
      url = url.replace(/\/info\.json$/i, '');
      return url;
    }

    function readCreateableResourcesFromPageVm() {
      var vm = params.pageVm || {};
      var raw = unwrap(vm.createableResources || vm.creatableResources || vm.createable_resources || []);
      var list = Array.isArray(raw) ? raw : [];

      // nie rób tu “isresource === true”, bo Arches często tego nie ma
      var filtered = list
        .filter(function(g) {
          return g && g.graphid && g.disable_instance_creation !== true && g.is_active !== false;
        })
        .map(function(g) {
          return {
            graphid: g.graphid,
            name: g.name || g.subtitle || g.slug || g.graphid,
            iconclass: g.iconclass || ''
          };
        });

      console.log('[WF LOG] pageVm.createableResources raw:', raw);
      console.log('[WF LOG] Available output graphs:', filtered);

      self.availableOutputGraphs(filtered);
    }

    // computed – pageVm może się uzupełnić później
    ko.computed(readCreateableResourcesFromPageVm);

    // ---- map lifecycle ----
    function destroyMapIfAny() {
      if (self.map) {
        try { self.map.off(); } catch(_) {}
        try { self.map.remove(); } catch(_) {}
      }
      self.map = null;
      self.iiifLayer = null;
      self._mapInitialized = false;
    }

    function ensureMap(container) {
      if (!L) throw new Error('Leaflet L missing');
      if (self._mapInitialized) return;

      // gwarancja “czystego” kontenera
      destroyMapIfAny();

      self.map = L.map(container, {
        crs: L.CRS.Simple,
        center: [0, 0],
        zoom: 0,
        zoomControl: true,
        attributionControl: false
      });

      // przy CRS.Simple warto dopuścić zejście niżej
      try { self.map.setMinZoom(-5); } catch(_) {}

      // rysowanie
      var drawnItems = new L.FeatureGroup();
      self.map.addLayer(drawnItems);

      var drawControl = new L.Control.Draw({
        edit: { featureGroup: drawnItems, remove: true },
        draw: {
          polygon: true,
          rectangle: true,
          circle: true,
          marker: true,
          polyline: true,
          circlemarker: false
        }
      });
      self.map.addControl(drawControl);

      self.map.on(L.Draw.Event.CREATED, function(e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);

        self.annotations.push({
          id: 'annotation-' + Date.now(),
          type: e.layerType,
          geometry: layer.toGeoJSON().geometry,
          created: new Date().toISOString()
        });

        console.log('[WF LOG] Annotation created:', e.layerType);
      });

      self._mapInitialized = true;

      // ważne: po wejściu w modal/zmianie kroku layout często się zmienia
      setTimeout(function() {
        try { self.map.invalidateSize(true); } catch(_) {}
      }, 0);
    }

    function addIiifLayerFromServiceUrl(serviceUrl) {
      if (!self.map || !serviceUrl || !(L.tileLayer && L.tileLayer.iiif)) return;

      // usuń poprzednią warstwę
      if (self.iiifLayer) {
        try { self.map.removeLayer(self.iiifLayer); } catch(_) {}
        self.iiifLayer = null;
      }

      var clean = serviceUrl.replace(/\/info\.json$/i, '').replace(/\/$/, '');
      var infoUrl = clean + '/info.json';

      // 1) najpierw pobierz wymiary, żeby mieć pewne bounds
      $.getJSON(infoUrl).done(function(info) {
        var w = info && info.width;
        var h = info && info.height;

        // 2) dopiero wtedy dodaj layer
        try {
          self.iiifLayer = L.tileLayer.iiif(infoUrl).addTo(self.map);
          console.log('[WF LOG] IIIF layer added:', infoUrl);
        } catch (e) {
          console.error('[WF LOG] IIIF add error:', e);
          return;
        }

        // 3) fitBounds na pewnych bounds (h,w) – to usuwa “random coordinate” efekt
        if (w && h) {
          var bounds = L.latLngBounds([0, 0], [h, w]);

          try {
            self.map.fitBounds(bounds, { animate: false });
            // NIE zaciskam maxBounds na twardo, bo to często daje “nie da się przesuwać”
            // Jak chcesz clamp: odkomentuj 2 linie niżej
            // self.map.setMaxBounds(bounds.pad(0.5));
            // self.map.options.maxBoundsViscosity = 0.8;

            self.map.invalidateSize(true);
          } catch (e2) {
            console.warn('[WF LOG] fitBounds error:', e2);
          }
        } else {
          console.warn('[WF LOG] info.json missing width/height; skipping fitBounds');
        }
      }).fail(function() {
        console.warn('[WF LOG] Could not fetch info.json:', infoUrl);

        // fallback: spróbuj dodać warstwę mimo wszystko
        try {
          self.iiifLayer = L.tileLayer.iiif(infoUrl).addTo(self.map);
          console.log('[WF LOG] IIIF layer added (no-bounds):', infoUrl);
        } catch (e) {
          console.error('[WF LOG] IIIF add error:', e);
        }
      });
    }

    // KO hook from template
    self.afterMapRender = function() {
      var container = document.getElementById('annotation-map');
      if (!container) return;

      ensureMap(container);

      var url = (self.imageServiceUrl() || '').trim();
      if (url) addIiifLayerFromServiceUrl(url);
    };

    // subscribe url changes
    self.imageServiceUrl.subscribe(function(newVal) {
      console.log('[WF LOG] Image service URL changed ->', newVal);
      if (self.map) addIiifLayerFromServiceUrl(newVal);
    });

    // ---- load tiles -> set imageServiceUrl ----
    self.loadHostResource = function(resourceId) {
      if (!resourceId) return;

      var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
      var tilesUrl = baseUrl + 'resource/' + encodeURIComponent(resourceId) + '/tiles';

      console.log('[WF LOG] Fetching tiles for hostResourceId', resourceId, '->', tilesUrl);

      $.ajax({ url: tilesUrl, method: 'GET', xhrFields: { withCredentials: true } })
        .done(function(resp) {
          var iiif = extractIiifFromTiles(resp);
          if (iiif) {
            console.log('[WF LOG] Found IIIF service URL ->', iiif);
            self.imageServiceUrl(iiif);
          } else {
            console.warn('[WF LOG] No IIIF URL found in tiles response');
            self.imageServiceUrl('');
          }
        })
        .fail(function(xhr) {
          console.error('[WF LOG] Failed to load tiles:', xhr && xhr.status);
          self.imageServiceUrl('');
        });
    };

    self.hostResourceId.subscribe(self.loadHostResource);
    self.loadHostResource(self.hostResourceId());

    // ---- finalize modal actions ----
    self.openFinalizeModal = function() { self.showFinalizeModal(true); };
    self.cancelFinalizeModal = function() { self.showFinalizeModal(false); };

    function buildStepPayload() {
      return {
        hostResourceId: self.hostResourceId(),
        iiifServiceUrl: self.imageServiceUrl(),
        annotations: self.annotations(),
        output: {
          mode: self.outputMode(),
          targetGraphId: (self.outputMode() === 'annotation-and-resource') ? (self.targetGraphId() || null) : null,
          createdAt: new Date().toISOString()
        }
      };
    }

    self.confirmFinalizeModal = function() {
      self.isFinalized(true);
      self.value(buildStepPayload());
      self.showFinalizeModal(false);
      console.log('[WF LOG] Finalize confirmed, payload:', ko.toJS(self.value()));
    };

    // workflow gating
    if (params.form && params.form.complete) {
      params.form.complete(ko.pureComputed(function() {
        if (!self.isFinalized()) return false;
        if (!self.imageServiceUrl()) return false;
        if (self.annotations().length < 1) return false;

        if (self.outputMode() === 'annotation-and-resource' && !self.targetGraphId()) return false;
        return true;
      }));
    }

    // save wrapper (blokuj jeśli nie finalized)
    var originalSave = params.form && params.form.save ? params.form.save : null;
    if (params.form) {
      params.form.save = function() {
        if (!self.isFinalized()) {
          console.warn('[WF LOG] Save blocked – not finalized');
          return Promise.reject(new Error('Finalize output first.'));
        }
        self.value(buildStepPayload());
        console.log('[WF LOG] Saving step2 payload:', ko.toJS(self.value()));
        return originalSave ? originalSave.apply(params.form, arguments) : Promise.resolve(true);
      };
    }

    return self;
  }

  return ko.components.register('iiif-annotator-step', {
    viewModel: viewModel,
    template: template
  });
});
