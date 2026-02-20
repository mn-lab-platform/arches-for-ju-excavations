import ko from 'knockout';
import $ from 'jquery';
import maplibregl from 'maplibre-gl';

import iiifMapViewerTemplate from 'templates/views/components/iiif/iiif-map-viewer.htm';

import { installIiifInfoJsonPatch } from './lib/iiif-infojson-patch';
import { createAllmapsLayerManager } from './map/allmaps-layer-manager';
import { createMeasureController } from './map/measure-controller';
import { createDemSampler } from './map/dem-sampling';

import { createLeafletViewer } from './viewers/iiif-leaflet-viewer';

// Binding: data-bind="iiifMapInit: initMap"
ko.bindingHandlers.iiifMapInit = {
  init(element, valueAccessor) {
    const initFn = ko.unwrap(valueAccessor());
    if (typeof initFn === 'function') initFn(element);
    return { controlsDescendantBindings: false };
  }
};

// ---- Manifest helpers ----
function mdValue(canvas, key) {
  const md = canvas && canvas.metadata;
  if (!Array.isArray(md)) return null;
  for (let i = 0; i < md.length; i++) {
    const row = md[i];
    const label = row?.label?.en?.[0] ?? row?.label?.none?.[0] ?? null;
    if (label !== key) continue;
    const val = row?.value?.en?.[0] ?? row?.value?.none?.[0] ?? null;
    return val ?? null;
  }
  return null;
}

function mdBool(canvas, key) {
  const v = mdValue(canvas, key);
  return String(v).trim().toLowerCase() === 'true';
}

function pickDemCanvasFromManifest(manifest) {
  const items = Array.isArray(manifest?.items) ? manifest.items : [];
  return items.find((c) => mdBool(c, 'is_dem_hint')) || null;
}
function ensureAbsoluteUrl(url) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  try {
    return new URL(url, window.location.origin).toString();
  } catch (e) {
    return window.location.origin + (url.startsWith('/') ? '' : '/') + url;
  }
}

function extractServiceUrlFromCanvas(canvas) {
  try {
    const ap = canvas?.items?.[0];
    const ann = ap?.items?.[0];
    const body = ann?.body;
    if (!body) return null;
    const svc = body.service;
    const s = Array.isArray(svc) ? svc[0] : svc;
    const id = s?.id || s?.['@id'];
    if (!id) return null;
    return ensureAbsoluteUrl(id);
  } catch (_) {
    return null;
  }
}

function extractTitilerFilePathFromServiceUrl(serviceUrl) {
  if (!serviceUrl) return null;
  try {
    const u = new URL(serviceUrl, window.location.origin);
    const p = u.pathname || '';
    const m = p.match(/\/iiif\/{1,2}(data\/.+)$/i);
    if (!m) return null;
    return '/' + m[1].replace(/^\/+/, '');
  } catch (_) {
    return null;
  }
}

function canvasHasGeoref(canvas) {
  const v = mdValue(canvas, 'has_georef');
  return String(v).trim().toLowerCase() === 'true';
}

function manifestHasAnyGeoref(manifest) {
  const items = manifest?.items;
  if (!Array.isArray(items) || !items.length) return false;
  return items.some(canvasHasGeoref);
}

ko.components.register('iiif-map-viewer', {
  viewModel: {
    createViewModel: function (params) {
      const self = {};
      installIiifInfoJsonPatch();
      async function fetchLeafletPixelElevation(x, y) {
        const m = ko.unwrap(self.manifest);
        const demCanvas = pickDemCanvasFromManifest(m);

        if (!demCanvas) {
          self.elevationError('Brak canvas DEM (is_dem_hint=true).');
          self.elevationValue('');
          return;
        }

        const serviceUrl = extractServiceUrlFromCanvas(demCanvas);
        const filePath =
          mdValue(demCanvas, 'titiler.file_path') ||
          mdValue(demCanvas, 'file_path') ||
          extractTitilerFilePathFromServiceUrl(serviceUrl);

        if (!filePath) {
          self.elevationError('Brak file_path dla DEM (metadata + service URL).');
          self.elevationValue('');
          return;
        }

        const band = Number(mdValue(demCanvas, 'dem_band') || 1);
        const unit = mdValue(demCanvas, 'vertical_units') || 'm';

        self.elevationLoading(true);
        self.elevationError('');
        self.elevationValue('');

        try {
          const url =
            `/api/iiif/dem/pixel?file_path=${encodeURIComponent(filePath)}&x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&band=${encodeURIComponent(band)}`;

          const res = await fetch(url, { credentials: 'same-origin' });
          const json = await res.json().catch(() => ({}));

          if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
          if (!Number.isFinite(json?.value)) {
            self.elevationError('Brak wartości (NoData) dla tego piksela.');
            return;
          }

          self.elevationValue(`${Number(json.value).toFixed(2)} ${unit}`);
        } catch (err) {
          self.elevationError(`Błąd odczytu piksela DEM: ${String(err?.message || err)}`);
        } finally {
          self.elevationLoading(false);
        }
      }
      self.manifest = params.manifest;

      self.status = ko.observable('');
      self.error = ko.observable('');

      // Unified UI
      self.renderMode = ko.observable('map'); // 'map' | 'image'
      self.fallbackReason = ko.observable('');
      self.canToggleRenderMode = ko.observable(false);

      // MAP mode: Allmaps layers UI
      self.layers = ko.observableArray([]);

      // IMAGE mode: Leaflet picker + overlays UI
      self.leafletBaseCanvasId = ko.observable(null);
      self.leafletCanvasOptions = ko.observableArray([]);
      self.leafletLayers = ko.observableArray([]);

      // MAP mode measure / elevation
      self.measureMode = ko.observable(false);
      self.measureDistance = ko.observable('');
      self.measureCoords = ko.observable('');

      self.elevationMode = ko.observable(true);
      self.elevationLoading = ko.observable(false);
      self.elevationValue = ko.observable('');
      self.elevationError = ko.observable('');

      const layerManager = createAllmapsLayerManager({
        setStatus: self.status,
        setError: self.error
      });

      const dem = createDemSampler({
        setLoading: self.elevationLoading,
        setValue: self.elevationValue,
        setError: self.elevationError
      });

      const measure = createMeasureController({
        setDistance: self.measureDistance,
        setCoords: self.measureCoords
      });

      // Leaflet viewer instance
      const leafletViewer = createLeafletViewer({
        setStatus: self.status,
        setError: self.error,
        onMapClick: async ({ x, y }) => {
          if (self.renderMode() !== 'image') return;
          if (!self.elevationMode()) return;
          await fetchLeafletPixelElevation(x, y);
        }
      });

      self._map = null;
      self._mapDiv = null;
      self._leafletDiv = null;

      self.mapReady = ko.observable(false);
      self._disposed = false;
      self._renderNonce = 0;
      self._renderQueue = Promise.resolve();

      function setMode(mode, reason) {
        self.renderMode(mode);
        self.fallbackReason(reason || '');

        const m = ko.unwrap(self.manifest);
        const canMap = !!(self._map && self.mapReady() && manifestHasAnyGeoref(m));
        const canImage = !!(self._leafletDiv);
        self.canToggleRenderMode(Boolean(canMap && canImage));
      }

      function scheduleRender(force) {
        const nonce = ++self._renderNonce;
        self._renderQueue = self._renderQueue
          .then(async () => {
            if (self._disposed) return;
            await render(force, nonce);
          })
          .catch((err) => {
            console.error('[iiif-map-viewer] render failed', err);
            self.error(err && err.message ? err.message : String(err));
          });
        return self._renderQueue;
      }

      function wireMapLayerVm(layerVm) {
        if (!ko.isObservable(layerVm.visible)) layerVm.visible = ko.observable(!!layerVm.visible);
        if (!ko.isObservable(layerVm.opacity)) layerVm.opacity = ko.observable(
          Number.isFinite(+layerVm.opacity) ? +layerVm.opacity : 1
        );

        layerVm.visible.subscribe(async (v) => {
          if (typeof layerVm._setVisible === 'function') await layerVm._setVisible(!!v);
        });

        layerVm.opacity.subscribe((v) => {
          if (typeof layerVm._setOpacity === 'function') layerVm._setOpacity(v);
        });

        return layerVm;
      }

      async function ensureLeafletReady(manifest) {
        if (!self._leafletDiv) return;
        if (!leafletViewer.ready()) {
          await leafletViewer.init(self._leafletDiv);
        }
        await leafletViewer.setManifest(manifest);

        self.leafletBaseCanvasId(leafletViewer.baseCanvasId());
        self.leafletCanvasOptions(leafletViewer.canvasOptions());
        self.leafletLayers(leafletViewer.layers());

        // Base is locked in Leaflet viewer: keep UI synced one-way only.
        if (!self._leafletBaseSub) {
          self._leafletBaseSub = self.leafletBaseCanvasId.subscribe(() => {
            const locked = leafletViewer.baseCanvasId();
            if (self.leafletBaseCanvasId() !== locked) self.leafletBaseCanvasId(locked);
          });
        }
        if (!self._leafletBaseSub2) {
          self._leafletBaseSub2 = leafletViewer.baseCanvasId.subscribe((id) => {
            if (self.leafletBaseCanvasId() !== id) self.leafletBaseCanvasId(id);
          });
        }
      }

      self.initMap = (rootEl) => {
        self._mapDiv = rootEl.querySelector('.iiif-maplibre-container');
        self._leafletDiv = rootEl.querySelector('.iiif-leaflet-container');

        self._map = new maplibregl.Map({
          container: self._mapDiv,
          style: params.basemapStyleUrl || 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
          center: [19, 52],
          zoom: 5,
          maxZoom: 32
        });
        self._map.addControl(new maplibregl.NavigationControl(), 'top-right');

        self._map.on('click', async (e) => {
          self.measureCoords(measure.formatCoords(e.lngLat));

          if (self.measureMode()) return measure.onClick(e);
          if (!self.elevationMode()) return;

          const demLayer = dem.pickLayer(self.layers());
          await dem.fetchAt(e.lngLat.lng, e.lngLat.lat, demLayer);
        });

        self._map.on('mousemove', (e) => {
          if (self.measureMode()) measure.onMouseMove(e);
        });

        self._map.on('load', async () => {
          measure.install(self._map);
          self.mapReady(true);
          await scheduleRender(true);
        });
      };

      async function render(force, nonce) {
        if (self._disposed) return;
        const m = ko.unwrap(self.manifest);
        if (!m) return;

        self.error('');

        const hasGeoref = manifestHasAnyGeoref(m);

        // AUTO mode decision: if no georef -> Leaflet image-only
        if (!hasGeoref) {
          setMode('image', 'No georeference metadata (has_georef=false). Showing raster as image layers.');
          await ensureLeafletReady(m);
          return;
        }

        // Has georef -> try map mode Allmaps
        if (!self._map || !self.mapReady()) return;

        // Clear previous map layers
        const prev = self.layers();
        if (Array.isArray(prev) && prev.length) layerManager.clear(self._map, prev);

        const built = await layerManager.build(self._map, m);

        // Stale render guard
        if (self._disposed || nonce !== self._renderNonce) {
          layerManager.clear(self._map, built);
          return;
        }

        if (!Array.isArray(built) || built.length === 0) {
          // georef exists, but cannot build -> fallback to Leaflet
          setMode('image', 'Allmaps could not build any displayable layers. Falling back to image-only Leaflet view.');
          await ensureLeafletReady(m);
          return;
        }

        setMode('map', '');

        const wired = built.map(wireMapLayerVm);
        self.layers(wired);

        if (force) layerManager.fitToLayers(self._map, wired);
      }

      self.fit = () => {
        if (self.renderMode() !== 'map') return;
        if (!self._map) return;
        layerManager.fitToLayers(self._map, self.layers());
      };

      self.toggleMeasure = () => {
        if (self.renderMode() !== 'map') return;
        const on = !self.measureMode();
        self.measureMode(on);
        measure.setEnabled(on);
        if (!on) measure.clear();
      };

      self.clearMeasure = () => measure.clear();

      self.toggleElevation = () => {
        if (self.renderMode() !== 'map') return;
        const on = !self.elevationMode();
        self.elevationMode(on);
        self.elevationError('');
        if (!on) self.elevationValue('');
      };

      self.toggleRenderMode = async () => {
        const m = ko.unwrap(self.manifest);
        if (!m) return;

        if (self.renderMode() === 'image') {
          if (!manifestHasAnyGeoref(m)) {
            self.fallbackReason('Cannot switch to map mode: no georeference metadata.');
            return;
          }
          self.renderMode('map');
          self.fallbackReason('');
          await scheduleRender(true);
          return;
        }

        self.renderMode('image');
        self.fallbackReason('User switched to image-only mode.');
        await ensureLeafletReady(m);
      };

      self._renderSub = ko.computed(() => {
        ko.unwrap(self.manifest);
        if (!self.mapReady()) return;
        scheduleRender(false);
      });

      self.dispose = () => {
        self._disposed = true;
        self._renderNonce++;

        try { if (self._renderSub) self._renderSub.dispose(); } catch (_) {}

        try {
          leafletViewer.dispose();
        } catch (_) {}

        try { if (self._leafletBaseSub) self._leafletBaseSub.dispose(); } catch (_) {}
        try { if (self._leafletBaseSub2) self._leafletBaseSub2.dispose(); } catch (_) {}

        try { if (self._map) self._map.remove(); } catch (_) {}

        self._map = null;
        self._mapDiv = null;
        self._leafletDiv = null;
      };

      return self;
    }
  },

  template: iiifMapViewerTemplate
});

export default ko.components;