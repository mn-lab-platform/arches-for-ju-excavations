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
function parseTransformFromCanvas(canvas) {
  const trRaw = mdValue(canvas, 'transform');
  if (!trRaw) return null;
  try {
    const tr = JSON.parse(trRaw);
    return (Array.isArray(tr) && tr.length === 6) ? tr : null;
  } catch (_) {
    return null;
  }
}

// pixel (col=x, row=y) -> local (X,Y)
function affineForward(tr, x, y,s) {
  // console.log("affine tr", tr);
  // console.log("x,y", x, y);
  x=x*(2**s);
  y=y*(2**s);
  const [a,b,c,d,e,f] = tr;
  return [a*x + b*y + c, d*x + e*y + f];
}

// local (X,Y) -> pixel (x,y)
function affineInverse(tr, X, Y) {
  const [a,b,c,d,e,f] = tr;
  const det = a*e - b*d;
  if (!Number.isFinite(det) || Math.abs(det) < 1e-12) return null;

  const dx = X - c;
  const dy = Y - f;
  const x = ( e*dx - b*dy) / det;
  const y = (-d*dx + a*dy) / det;
  return [x, y];
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
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
      self.manifest = params.manifest;

      self.status = ko.observable('');
      self.error = ko.observable('');
      self.imageGroup = ko.observable('ortho'); // 'ortho' | 'dem'
      self.setImageGroup = async (g) => {
        const group = (g === 'dem') ? 'dem' : 'ortho';
        self.imageGroup(group);
        if (self.renderMode() === 'image') {
          await leafletViewer.setGroup(group);
          // zsynchronizuj UI po rebuild
          self.leafletBaseCanvasId(leafletViewer.baseCanvasId());
          self.leafletCanvasOptions(leafletViewer.canvasOptions());
          self.leafletLayers(leafletViewer.layers());
        }
      };
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

      self.clickedCoords = ko.observable(''); // Dodaj observable na współrzędne

      // Leaflet measure
      self.leafletMeasureMode = ko.observable(false);
      self.leafletMeasurePoints = ko.observableArray([]);
      self.leafletMeasureDistance = ko.observable('');
      self._leafletMeasureLine = null;
      self._leafletMeasureMarkers = [];

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
        onMapClick: (info) => {
          const m = ko.unwrap(self.manifest);
          const baseId = self.leafletBaseCanvasId();
          const canvas = Array.isArray(m?.items)
            ? m.items.find(c => (c.id || c['@id']) === baseId)
            : null;
          const tr = parseTransformFromCanvas(canvas);

          // DODATKOWE LOGI
          const container = self._leafletDiv;
          const mapBounds = leafletViewer._map?.getBounds?.();
          const mapZoom = leafletViewer._map?.getZoom?.();
          const mapSize = leafletViewer._map?.getSize?.();


          // Jeśli chcesz zobaczyć event kliknięcia:
          // (dodaj do createLeafletViewer przekazywanie e.originalEvent)
          // console.log('Original event:', info.originalEvent);

          if (tr) {
            const [X, Y] = affineForward(tr, info.x, info.y, info.s);
            self.clickedCoords(
              `Pixel: ${info.x *2**info.s}, ${info.y *2**info.s} / ${info.width}x${info.height} | Map: ${X.toFixed(6)}, ${Y.toFixed(6)}`
            );
          } else {
            self.clickedCoords(
              `Pixel: ${info.x}, ${info.y} / ${info.width}x${info.height}`
            );
          }

          if (self.leafletMeasureMode && self.leafletMeasureMode()) {
            const pts = self.leafletMeasurePoints();
            if (pts.length >= 2) {
              self.leafletMeasurePoints([]);
              self.leafletMeasureDistance('');
            }
            // Zawsze licz affineForward ejeśli jst transformacja
            let X = info.x, Y = info.y;
            if (tr) {
              [X, Y] = affineForward(tr, info.x, info.y, info.s);
            }
            // Zapisz oba zestawy współrzędnych
            self.leafletMeasurePoints([...pts, { x: info.x, y: info.y, X, Y }]);
            if (self.leafletMeasurePoints().length === 2) {
              const [p1, p2] = self.leafletMeasurePoints();
              const dx = p2.X - p1.X;
              const dy = p2.Y - p1.Y;
              const d = Math.sqrt(dx * dx + dy * dy);
              self.leafletMeasureDistance(`${d.toFixed(2)} meters`);
            }
            return;
          }
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
        if (typeof leafletViewer.setGroup === 'function') {
          await leafletViewer.setGroup(self.imageGroup());
        } else {
          await leafletViewer.setManifest(manifest);
        }


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
          self.elevationMode(false);
          self.elevationError('');
          self.elevationValue('');          
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

      self.toggleLeafletMeasure = () => {
        const on = !self.leafletMeasureMode();
        self.leafletMeasureMode(on);
        self.leafletMeasurePoints([]);
        self.leafletMeasureDistance('');
        if (self._leafletMeasureLine && leafletViewer._map) {
          leafletViewer._map.removeLayer(self._leafletMeasureLine);
          self._leafletMeasureLine = null;
        }
        // Usuń markery
        if (self._leafletMeasureMarkers && leafletViewer._map) {
          self._leafletMeasureMarkers.forEach(m => leafletViewer._map.removeLayer(m));
          self._leafletMeasureMarkers = [];
        }
      };
      self.clearLeafletMeasure = () => {
        self.leafletMeasurePoints([]);
        self.leafletMeasureDistance('');
        if (self._leafletMeasureLine && leafletViewer._map) {
          leafletViewer._map.removeLayer(self._leafletMeasureLine);
          self._leafletMeasureLine = null;
        }
        // Usuń markery
        if (self._leafletMeasureMarkers && leafletViewer._map) {
          self._leafletMeasureMarkers.forEach(m => leafletViewer._map.removeLayer(m));
          self._leafletMeasureMarkers = [];
        }
      };

      // Subskrypcja do leafletMeasurePoints
      self.leafletMeasurePoints.subscribe((pts) => {

        if (!leafletViewer._map) {
          console.warn('[LeafletMeasure] Map is not ready!');
          return;
        }

        // Usuń stare markery
        if (self._leafletMeasureMarkers) {
          self._leafletMeasureMarkers.forEach(m => {
            try {
              leafletViewer._map.removeLayer(m);
            } catch (e) {
              console.warn('[LeafletMeasure] Failed to remove marker:', e);
            }
          });
          self._leafletMeasureMarkers = [];
        }

        // Dodaj markery dla każdego punktu
        pts.forEach((pt, idx) => {
          if (!Number.isFinite(pt.X) || !Number.isFinite(pt.Y)) {
            console.warn('[LeafletMeasure] Invalid marker coords:', pt);
            return;
          }
          try {
            const marker = window.L.circleMarker([-pt.y, pt.x], {
              radius: 6,
              color: idx === 0 ? 'blue' : 'red',
              fillColor: idx === 0 ? 'blue' : 'red',
              fillOpacity: 0.8,
              weight: 2
            }).addTo(leafletViewer._map);
            self._leafletMeasureMarkers.push(marker);
          } catch (e) {
            console.error('[LeafletMeasure] Failed to add marker:', e);
          }
        });

        // Rysuj linię jeśli są dwa punkty
        if (pts.length === 2) {
          const latlngs = [
            [-pts[0].y, pts[0].x],
            [-pts[1].y, pts[1].x]
          ];
          if (
            Number.isFinite(pts[0].X) && Number.isFinite(pts[0].Y) &&
            Number.isFinite(pts[1].X) && Number.isFinite(pts[1].Y)
          ) {
            try {
              self._leafletMeasureLine = window.L.polyline(latlngs, { color: 'red', weight: 3 }).addTo(leafletViewer._map);

            } catch (e) {
              console.error('[LeafletMeasure] Failed to draw line:', e);
            }
          } else {
            console.warn('[LeafletMeasure] Invalid line coords:', latlngs);
          }
        }
      });

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

      // Nowa funkcja do pomiaru wartości piksela DEM
      self.measureDemPixel = async () => {
        const m = ko.unwrap(self.manifest);
        const coords = self.clickedCoords();
        if (!coords) {
          self.elevationError('Najpierw kliknij na mapie, aby pobrać współrzędne.');
          return;
        }

        // Sprawdź, czy jesteśmy na warstwie DEM (imageGroup === 'dem')
        if (self.imageGroup && self.imageGroup() === 'dem') {
          // Wyciągnij pixel x, y z tekstu np. "Pixel: 123, 456 / ..."
          const match = coords.match(/Pixel:\s*(\d+),\s*(\d+)/);
          if (!match) {
            self.elevationError('Nie można odczytać współrzędnych piksela.');
            return;
          }
          const x = parseInt(match[1], 10);
          const y = parseInt(match[2], 10);
          console.log('Pixel coords for DEM sampling:', { x, y });
          try {
            self.elevationLoading(true);
            self.elevationError('');
            const resp = await fetch('/api/iiif/dem/pixel-value', {
              method: 'POST',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ manifest: m, x, y })
            });
            const json = await resp.json();
            if (!resp.ok) throw new Error(json?.error || 'HTTP ' + resp.status);
            self.elevationValue(`${json.value} m`);
          } catch (err) {
            self.elevationError('DEM pixel error: ' + String(err?.message || err));
          } finally {
            self.elevationLoading(false);
          }
          return;
        }

        // W przeciwnym razie (np. orto) użyj transformacji afinicznej
        const match = coords.match(/Map:\s*([-\d.]+),\s*([-\d.]+)/);
        if (!match) {
          self.elevationError('Nie można odczytać współrzędnych mapy.');
          return;
        }
        const X = parseFloat(match[1]);
        const Y = parseFloat(match[2]);
        const demCanvas = pickDemCanvasFromManifest(m);
        if (!demCanvas) {
          self.elevationError('Brak canvas DEM.');
          return;
        }
        const tr = parseTransformFromCanvas(demCanvas);
        if (!tr) {
          self.elevationError('Brak transformacji DEM.');
          return;
        }
        const [demX, demY] = affineInverse(tr, X, Y);
        console.log('Affine inverse coords:', { X, Y, demX, demY });
        try {
          self.elevationLoading(true);
          self.elevationError('');
          const resp = await fetch('/api/iiif/dem/pixel-value', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ manifest: m, x: demX, y: demY })
          });
          const json = await resp.json();
          if (!resp.ok) throw new Error(json?.error || 'HTTP ' + resp.status);
          self.elevationValue(`${json.value} m`);
        } catch (err) {
          self.elevationError('DEM pixel error: ' + String(err?.message || err));
        } finally {
          self.elevationLoading(false);
        }
      };

      return self;
    }
  },

  template: iiifMapViewerTemplate
});

export default ko.components;