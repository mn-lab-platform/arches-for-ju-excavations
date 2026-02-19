import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import ReportViewModel from 'viewmodels/report';

import iiifReportTemplate from 'templates/views/report-templates/iiif-report.htm';

// ⬇⬇⬇ potrzebne do map-viewera (w tym samym pliku) ⬇⬇⬇
import maplibregl from 'maplibre-gl';
import proj4 from 'proj4';
import iiifMapViewerTemplate from 'templates/views/components/iiif/iiif-map-viewer.htm';

const DIGITAL_RES_URL_NODE_ID = 'e0216dc7-89ba-4a27-9126-bf7e06d859a8';
const LOG = '[iiif-report]';

// ============================================================================
// =======================  START: iiif-map-viewer  ===========================
// ============================================================================

const MV_LOG = '[iiif-map-viewer]';

// -------- CDN loader for @allmaps/maplibre --------
// beta.38: NIE zakładaj setMapOptions / setMapsOptions -> ale jak są, to używamy do opacity
const ALLMAPS_ESM_URL =
  'https://esm.sh/@allmaps/maplibre@1.0.0-beta.38?bundle';

let _allmapsCdnPromise = null;
function loadAllmapsCdn() {
  if (_allmapsCdnPromise) return _allmapsCdnPromise;

  _allmapsCdnPromise = import(/* webpackIgnore: true */ ALLMAPS_ESM_URL)
    .then((mod) => {
      const ctor = mod?.WarpedMapLayer || mod?.default?.WarpedMapLayer || mod?.default;
      if (typeof ctor !== 'function') {
        throw new Error('WarpedMapLayer not found in ESM module');
      }
      return ctor;
    });

  return _allmapsCdnPromise;
}

/**
 * Minimal binding: odpala callback kiedy element jest w DOM.
 * Używamy tego, żeby initMap dostał realny div.
 */
ko.bindingHandlers.iiifMapInit = {
  init: function(element, valueAccessor) {
    const callback = valueAccessor();
    if (typeof callback === 'function') callback(element);
  }
};
function extractTitilerFilePathFromServiceUrl(serviceUrl) {
  if (!serviceUrl) return null;
  try {
    const u = new URL(serviceUrl, window.location.origin);
    const p = u.pathname || '';
    // /iiif//data/... lub /iiif/data/... -> /data/...
    const m = p.match(/\/iiif\/{1,2}(data\/.+)$/i);
    if (!m) return null;
    return '/' + m[1].replace(/^\/+/, '');
  } catch (e) {
    return null;
  }
}

function extractElevationValue(pointResp) {
  if (!pointResp || typeof pointResp !== 'object') return null;
  if (Number.isFinite(pointResp.value)) return pointResp.value;

  if (Array.isArray(pointResp.values)) {
    const first = pointResp.values.find(v => Number.isFinite(v));
    if (Number.isFinite(first)) return first;
  }

  const candidates = ['b1', 'band1', 'elevation', 'z', 'val'];
  for (const k of candidates) {
    if (Number.isFinite(pointResp[k])) return pointResp[k];
  }
  return null;
}

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
  if (v == null) return false;
  const s = String(v).trim().toLowerCase();
  return s === 'true' || s === '1' || s === 'yes' || s === 'on';
}

function parseCanvasGeoref(canvas) {
  const has = mdValue(canvas, 'has_georef');
  const hasGeoref = String(has).toLowerCase() === 'true';
  const epsgRaw = mdValue(canvas, 'epsg');
  const epsg = epsgRaw ? parseInt(epsgRaw, 10) : null;
  const trRaw = mdValue(canvas, 'transform');
  let transform = null;
  try { transform = trRaw ? JSON.parse(trRaw) : null; } catch (e) { transform = null; }
  const width = parseInt(mdValue(canvas, 'width') || '0', 10);
  const height = parseInt(mdValue(canvas, 'height') || '0', 10);
  return { hasGeoref, epsg, transform, width, height };
}

function isValidGeoref(g) {
  return !!(
    g &&
    g.hasGeoref === true &&
    Number.isFinite(g.epsg) &&
    Array.isArray(g.transform) &&
    g.transform.length === 6 &&
    Number.isFinite(g.width) && g.width > 1 &&
    Number.isFinite(g.height) && g.height > 1
  );
}

function baseLabelKey(label) {
  return String(label || '')
    .trim()
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/\s+/g, ' ');
}

function slugifyId(s) {
  return String(s || 'layer')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'layer';
}

function forceDoubleSlashAfterIiif(url) {
  if (!url) return url;

  let s = String(url).trim();
  s = s.replace(/\/info\.json$/i, '').replace(/\/+$/, '');

  const isAbs = /^https?:\/\//i.test(s);

  if (isAbs) {
    try {
      const u = new URL(s);
      let p = u.pathname || '/';

      if (/^\/{1,2}data\//.test(p)) {
        p = '/iiif/' + p.replace(/^\/+/, '');
      } else if (!/^\/iiif(\/|$)/.test(p)) {
        p = '/iiif/' + p.replace(/^\/+/, '');
      }

      p = p.replace(/^\/iiif\/(?!\/)(data\/)/, '/iiif//$1');

      u.pathname = p;
      const out = u.toString().replace(/\/+$/, '');
      return out;
    } catch (e) {
      console.warn(MV_LOG, 'forceDoubleSlashAfterIiif URL parse failed:', s, e);
    }
  }

  if (/^\/{1,2}data\//.test(s)) {
    s = '/iiif/' + s.replace(/^\/+/, '');
  } else if (!/^\/iiif(\/|$)/.test(s)) {
    s = '/iiif/' + s.replace(/^\/+/, '');
  }

  s = s.replace(/^\/iiif\/(?!\/)(data\/)/, '/iiif//$1');
  return s;
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

    return forceDoubleSlashAfterIiif(id);
  } catch (e) {
    console.warn(MV_LOG, 'extractServiceUrlFromCanvas failed:', e);
    return null;
  }
}

function canvasLabel(canvas) {
  const l = canvas?.label;
  return l?.en?.[0] ?? l?.none?.[0] ?? (typeof l === 'string' ? l : 'Layer');
}

function affineForward(tr, col, row) {
  const a = tr[0], b = tr[1], c = tr[2], d = tr[3], e = tr[4], f = tr[5];
  return [a * col + b * row + c, d * col + e * row + f];
}

function boundsFromCorners(cornersLonLat) {
  let minLon = 180, minLat = 90, maxLon = -180, maxLat = -90;
  for (const ll of cornersLonLat) {
    if (!ll) continue;
    const lon = ll[0], lat = ll[1];
    if (!isFinite(lon) || !isFinite(lat)) continue;
    minLon = Math.min(minLon, lon); minLat = Math.min(minLat, lat);
    maxLon = Math.max(maxLon, lon); maxLat = Math.max(maxLat, lat);
  }
  if (minLon > maxLon || minLat > maxLat) return null;
  return [[minLon, minLat], [maxLon, maxLat]];
}

function buildGeorefAnnotation(serviceUrl, width, height, cornersLonLat) {
  const w = Math.round(width);
  const h = Math.round(height);

  const svg =
    `<svg width="${w}" height="${h}">` +
    `<polygon points="0,0 ${w},0 ${w},${h} 0,${h}" />` +
    `</svg>`;

  return {
    id: 'urn:uuid:' + Math.random().toString(16).slice(2),
    type: 'Annotation',
    motivation: 'georeference',

    target: {
      type: 'SpecificResource',
      source: { id: serviceUrl, type: 'ImageService3' },
      selector: { type: 'SvgSelector', value: svg }
    },

    body: {
      type: 'FeatureCollection',
      features: [
        { type: 'Feature', properties: { resourceCoords: [0, 0] }, geometry: { type: 'Point', coordinates: cornersLonLat[0] } },
        { type: 'Feature', properties: { resourceCoords: [w, 0] }, geometry: { type: 'Point', coordinates: cornersLonLat[1] } },
        { type: 'Feature', properties: { resourceCoords: [w, h] }, geometry: { type: 'Point', coordinates: cornersLonLat[2] } },
        { type: 'Feature', properties: { resourceCoords: [0, h] }, geometry: { type: 'Point', coordinates: cornersLonLat[3] } }
      ]
    }
  };
}

// ---- OPACITY: najpierw API Allmaps, potem CSS fallback ----
function setLayerOpacityCompat(layerObj, mapIds, opacity) {
  const o = Math.max(0, Math.min(1, parseFloat(opacity)));
  if (!layerObj) return;

  // 0) single-layer API (niektóre buildy)
  if (typeof layerObj.setOpacity === 'function') {
    try { layerObj.setOpacity(o); return; } catch (e) {}
  }

  // 1) API per-map (jeśli jest) — to jest realnie jedyny pewny sposób
  const ids = Array.isArray(mapIds) ? mapIds.filter(x => typeof x === 'string') : [];

  if (ids.length && typeof layerObj.setMapsOptions === 'function') {
    try { layerObj.setMapsOptions(ids, { opacity: o }); return; } catch (e) {}
  }

  if (ids.length && typeof layerObj.setMapOptions === 'function') {
    let ok = false;
    for (const id of ids) {
      try { layerObj.setMapOptions(id, { opacity: o }); ok = true; } catch (e) {}
    }
    if (ok) return;
  }

  // inne warianty nazw w różnych buildach
  if (ids.length && typeof layerObj.setMapOpacity === 'function') {
    let ok = false;
    for (const id of ids) {
      try { layerObj.setMapOpacity(id, o); ok = true; } catch (e) {}
    }
    if (ok) return;
  }

  if (ids.length && typeof layerObj.setOpacity === 'function') {
    // czasem bywa setOpacity(mapId, opacity)
    let ok = false;
    for (const id of ids) {
      try { layerObj.setOpacity(id, o); ok = true; } catch (e) {}
    }
    if (ok) return;
  }

  // 2) CSS fallback (działa tylko jeśli Allmaps ma osobny canvas)
  const c =
    layerObj.canvas ||
    layerObj._canvas ||
    layerObj._glCanvas ||
    null;

  if (c && c.style) {
    c.style.opacity = String(o);
  }
}

function applyOpacityWithRetry(vm, triesLeft) {
  if (!vm || !vm.layerObj) return;
  setLayerOpacityCompat(vm.layerObj, vm.mapIds, vm.opacity());

  const c = vm.layerObj.canvas || vm.layerObj._canvas || vm.layerObj._glCanvas;
  if (c && c.style) return;

  if ((triesLeft ?? 0) <= 0) return;
  requestAnimationFrame(() => applyOpacityWithRetry(vm, (triesLeft ?? 0) - 1));
}

// ---- warstwa-level controls (działa bez setMapOptions) ----
async function setLayerVisibleCompat(map, vm, visible) {
  if (!map || !vm) return;

  if (!visible) {
    try { if (vm.layerId && map.getLayer(vm.layerId)) map.removeLayer(vm.layerId); } catch (e) {}
    vm.layerObj = null;
    vm._isOnMap = false;
    return;
  }

  if (vm.layerId && map.getLayer(vm.layerId)) {
    vm._isOnMap = true;
    try { map.moveLayer(vm.layerId); } catch (e) {}
    // reaplikuj opacity “na wszelki”
    applyOpacityWithRetry(vm, 2);
    return;
  }

  try {
    const layer = new vm.WarpedCtor(vm.layerId);
    map.addLayer(layer);
    vm.layerObj = layer;
    vm._isOnMap = true;

    // klucz: ponownie dodaj georef annotation + zaktualizuj mapIds
    const res = await layer.addGeoreferenceAnnotation(vm._anno);
    vm.mapIds = (res || []).filter(x => typeof x === 'string');

    // przywróć opacity po re-create
    applyOpacityWithRetry(vm, 6);

    try { map.moveLayer(vm.layerId); } catch (e) {}
  } catch (e) {
    console.error(MV_LOG, 'Failed to re-enable layer', vm.layerId, e);
  }
}

// -------------------- measure helpers --------------------
function haversineMeters(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371008.8;
  const lat1 = toRad(a[1]);
  const lon1 = toRad(a[0]);
  const lat2 = toRad(b[1]);
  const lon2 = toRad(b[0]);
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

function polylineLengthMeters(coords) {
  if (!Array.isArray(coords) || coords.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < coords.length; i++) total += haversineMeters(coords[i - 1], coords[i]);
  return total;
}

function formatDistance(meters) {
  if (!Number.isFinite(meters) || meters <= 0) return '';
  if (meters < 1000) return `${meters.toFixed(2)} m`;
  return `${(meters / 1000).toFixed(5)} km`;
}

// -------------------- component --------------------
ko.components.register('iiif-map-viewer', {
  viewModel: {
    createViewModel: function(params) {
      const self = {};
      installIiifInfoJsonPatch();

      self.manifest = params.manifest;
      self.status = ko.observable('Initializing…');
      self.error = ko.observable('');
      self.layers = ko.observableArray([]);

      self._map = null;
      self.mapReady = ko.observable(false);
      self._rendering = false;
      self._renderedManifestId = null;

      self.measureMode = ko.observable(false);
      self.measureDistance = ko.observable('');

      // NEW: DEM point-elevation state
      self.elevationMode = ko.observable(true);
      self.elevationLoading = ko.observable(false);
      self.elevationValue = ko.observable('');
      self.elevationError = ko.observable('');

      self.toggleElevation = function() {
        const next = !self.elevationMode();
        self.elevationMode(next);
        self.elevationError('');
        if (!next) self.elevationValue('');
      };

      function looksLikeDemByText(s) {
        return /(^|[_.\-\s])(dem|dtm|dsm|elevation|height)([_.\-\s]|$)/i.test(String(s || ''));
      }

      function pickDemLayerForSampling() {
        const arr = self.layers();

        // TYLKO warstwa z is_dem_hint=True
        const cand = arr.find(l => l?.isDemHint === true && l?.titilerFilePath);
        return cand || null;
      }

      async function fetchElevationAt(lon, lat) {
        const demLayer = pickDemLayerForSampling();
        if (!demLayer) {
          self.elevationError('Brak warstwy DEM (is_dem_hint=True) do próbkowania.');
          self.elevationValue('');
          return;
        }

        const base = (demLayer.titilerBaseUrl || '').replace(/\/+$/, '');
        const fpath = demLayer.titilerFilePath;
        if (!base || !fpath) {
          self.elevationError('Brak danych TiTiler (file_path/base_url).');
          self.elevationValue('');
          return;
        }

        const url = `${base}/cog/point/${lon},${lat}?url=${encodeURIComponent(fpath)}`;
        self.elevationLoading(true);
        self.elevationError('');
        self.elevationValue('');

        try {
          const resp = await $.getJSON(url);
          const z = extractElevationValue(resp);

          if (!Number.isFinite(z)) {
            self.elevationError('Nie udało się odczytać wysokości dla tego punktu.');
            return;
          }

          const unit = demLayer.elevationUnit || 'm';
          self.elevationValue(`${Number(z).toFixed(2)} ${unit}`);
        } catch (e) {
          self.elevationError('Błąd odczytu wysokości z DEM.');
        } finally {
          self.elevationLoading(false);
        }
      }

      const MEASURE_SOURCE_ID = 'iiif-measure-source';
      const MEASURE_POINTS_LAYER_ID = 'iiif-measure-points';
      const MEASURE_LINES_LAYER_ID = 'iiif-measure-lines';

      let _measurePointSeq = 1;
      self._measureGeojson = { type: 'FeatureCollection', features: [] };

      function getMeasurePoints() {
        return self._measureGeojson.features.filter(f => f?.geometry?.type === 'Point');
      }

      function ensureMeasureLayers() {
        if (!self._map) return;

        if (!self._map.getSource(MEASURE_SOURCE_ID)) {
          self._map.addSource(MEASURE_SOURCE_ID, {
            type: 'geojson',
            data: self._measureGeojson
          });
        }

        if (!self._map.getLayer(MEASURE_POINTS_LAYER_ID)) {
          self._map.addLayer({
            id: MEASURE_POINTS_LAYER_ID,
            type: 'circle',
            source: MEASURE_SOURCE_ID,
            paint: {
              'circle-radius': 5,
              'circle-color': '#000'
            },
            filter: ['in', '$type', 'Point'],
            layout: { visibility: 'none' }
          });
        }

        if (!self._map.getLayer(MEASURE_LINES_LAYER_ID)) {
          self._map.addLayer({
            id: MEASURE_LINES_LAYER_ID,
            type: 'line',
            source: MEASURE_SOURCE_ID,
            layout: {
              'line-cap': 'round',
              'line-join': 'round',
              visibility: 'none'
            },
            paint: {
              'line-color': '#000',
              'line-width': 2.5
            },
            filter: ['in', '$type', 'LineString']
          });
        }

        bringMeasureLayersToFront();
      }

      function bringMeasureLayersToFront() {
        if (!self._map) return;
        try {
          // najpierw linia, potem punkty -> punkty nad linią
          if (self._map.getLayer(MEASURE_LINES_LAYER_ID)) self._map.moveLayer(MEASURE_LINES_LAYER_ID);
          if (self._map.getLayer(MEASURE_POINTS_LAYER_ID)) self._map.moveLayer(MEASURE_POINTS_LAYER_ID);
        } catch (e) {}
      }

      function setMeasureLayerVisibility(isVisible) {
        if (!self._map) return;
        const v = isVisible ? 'visible' : 'none';
        try { if (self._map.getLayer(MEASURE_POINTS_LAYER_ID)) self._map.setLayoutProperty(MEASURE_POINTS_LAYER_ID, 'visibility', v); } catch (e) {}
        try { if (self._map.getLayer(MEASURE_LINES_LAYER_ID)) self._map.setLayoutProperty(MEASURE_LINES_LAYER_ID, 'visibility', v); } catch (e) {}
      }

      function rebuildMeasureFeatures(pointsOnly) {
        const points = pointsOnly.slice();
        const features = points.slice();

        if (points.length > 1) {
          features.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: points.map(p => p.geometry.coordinates)
            },
            properties: {}
          });
        }

        self._measureGeojson = {
          type: 'FeatureCollection',
          features
        };
      }

      function syncMeasureSourceAndDistance() {
        const src = self._map?.getSource(MEASURE_SOURCE_ID);
        if (src && typeof src.setData === 'function') {
          src.setData(self._measureGeojson);
        }

        const coords = getMeasurePoints().map(p => p.geometry.coordinates);
        const total = polylineLengthMeters(coords);
        self.measureDistance(formatDistance(total));
      }

      function onMeasureClick(e) {
        if (!self.measureMode() || !self._map) return;
        if (!self._map.getLayer(MEASURE_POINTS_LAYER_ID)) return;

        let points = getMeasurePoints();

        let hit = null;
        try {
          const hits = self._map.queryRenderedFeatures(e.point, { layers: [MEASURE_POINTS_LAYER_ID] });
          hit = hits && hits.length ? hits[0] : null;
        } catch (err) {
          hit = null;
        }

        if (hit?.properties?.id != null) {
          const id = String(hit.properties.id);
          points = points.filter(p => String(p?.properties?.id) !== id);
        } else {
          points.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [e.lngLat.lng, e.lngLat.lat]
            },
            properties: {
              id: String(_measurePointSeq++)
            }
          });
        }

        rebuildMeasureFeatures(points);
        syncMeasureSourceAndDistance();
      }

      function onMeasureMouseMove(e) {
        if (!self._map) return;
        const canvas = self._map.getCanvas();
        if (!canvas) return;

        if (!self.measureMode()) {
          canvas.style.cursor = '';
          return;
        }

        try {
          const hits = self._map.queryRenderedFeatures(e.point, { layers: [MEASURE_POINTS_LAYER_ID] });
          canvas.style.cursor = (hits && hits.length) ? 'pointer' : 'crosshair';
        } catch (err) {
          canvas.style.cursor = 'crosshair';
        }
      }

      async function onMapClick(e) {
        if (self.measureMode()) {
          onMeasureClick(e);
          return;
        }
        if (!self.elevationMode()) return;
        await fetchElevationAt(e.lngLat.lng, e.lngLat.lat);
      }

      self.clearMeasure = function() {
        _measurePointSeq = 1;
        self._measureGeojson = { type: 'FeatureCollection', features: [] };
        self.measureDistance('');
        syncMeasureSourceAndDistance();
      };

      self.toggleMeasure = function() {
        const next = !self.measureMode();
        self.measureMode(next);
        setMeasureLayerVisibility(next);

        if (!next) {
          self.clearMeasure();
          if (self._map?.getCanvas()) self._map.getCanvas().style.cursor = '';
        } else if (self._map?.getCanvas()) {
          bringMeasureLayersToFront();
          self._map.getCanvas().style.cursor = 'crosshair';
          // optional: clear elevation when entering measure mode
          self.elevationError('');
          self.elevationValue('');
        }
      };

      function manifestId(m) {
        return m && (m.id || m['@id']) ? (m.id || m['@id']) : null;
      }

      function destroy() {
        try { if (self._map) self._map.remove(); } catch (e) {}
        self._map = null;
        self.layers([]);
        self.mapReady(false);
        self._renderedManifestId = null;
      }

      function clearWarpedLayers() {
        if (self._map) {
          const prev = self.layers();
          for (const l of prev) {
            if (l?.layerId && self._map.getLayer(l.layerId)) {
              try { self._map.removeLayer(l.layerId); } catch (e) {}
            }
          }
        }
        self.layers([]);
      }

      function fitToAllLayers() {
        if (!self._map) return;
        const boundsList = self.layers().map(l => l.bounds).filter(Boolean);
        if (!boundsList.length) return;

        let minLon = 180, minLat = 90, maxLon = -180, maxLat = -90;
        for (const b of boundsList) {
          minLon = Math.min(minLon, b[0][0]); minLat = Math.min(minLat, b[0][1]);
          maxLon = Math.max(maxLon, b[1][0]); maxLat = Math.max(maxLat, b[1][1]);
        }
        self._map.fitBounds([[minLon, minLat], [maxLon, maxLat]], { padding: 40, duration: 0 });
      }
      self.fit = fitToAllLayers;

      // ---- getWarpedCtor via CDN ----
      let _warpedCtor = null;
      async function getWarpedCtor() {
        if (_warpedCtor) return _warpedCtor;
        self.status('Loading Allmaps library…');
        _warpedCtor = await loadAllmapsCdn();
        self.status('');
        return _warpedCtor;
      }

      async function addAllmapsLayersFromManifest(m) {
        const canvases = Array.isArray(m?.items) ? m.items : [];
        const picked = [];

        const georefByBase = new Map();

        for (const canvas of canvases) {
          const svc = extractServiceUrlFromCanvas(canvas);
          if (!svc) continue;

          const g = parseCanvasGeoref(canvas);
          if (!isValidGeoref(g)) continue;

          const label = canvasLabel(canvas);
          const baseKey = baseLabelKey(label);

          if (!georefByBase.has(baseKey)) {
            georefByBase.set(baseKey, {
              epsg: g.epsg,
              transform: g.transform,
              width: g.width,
              height: g.height,
              sourceLabel: label
            });
          }
        }

        for (const canvas of canvases) {
          const svc = extractServiceUrlFromCanvas(canvas);
          if (!svc) continue;

          const label = canvasLabel(canvas);
          const baseKey = baseLabelKey(label);

          const own = parseCanvasGeoref(canvas);
          const donor = georefByBase.get(baseKey);

          let geo = null;

          if (isValidGeoref(own)) geo = own;
          else if (donor) geo = donor;
          else continue;

          const width = own?.width > 1 ? own.width : geo.width;
          const height = own?.height > 1 ? own.height : geo.height;

          // STRICT: tylko metadata.is_dem_hint decyduje o DEM
          const isDemHint = mdBool(canvas, 'is_dem_hint');

          const titilerFilePath =
            mdValue(canvas, 'titiler.file_path') ||
            mdValue(canvas, 'file_path') ||
            extractTitilerFilePathFromServiceUrl(svc);

          let titilerBaseUrl = '';
          try { titilerBaseUrl = new URL(svc, window.location.origin).origin; } catch (e) {}
          const elevationUnit = mdValue(canvas, 'vertical_units') || 'm';

          picked.push({
            label,
            serviceUrl: svc,
            epsg: geo.epsg,
            transform: geo.transform,
            width,
            height,
            isDemHint,
            titilerFilePath,
            titilerBaseUrl,
            elevationUnit
          });
        }

        if (!picked.length) {
          self.error('No displayable canvases found (no service/georeference).');
          return;
        }

        const WarpedCtor = await getWarpedCtor();
        const layerVMs = [];

        for (const p of picked) {
          const layerId = 'iiif-warped-' + slugifyId(p.label);

          const warpedLayer = new WarpedCtor(layerId);
          try {
            self._map.addLayer(warpedLayer);
          } catch (e) {
            console.error(MV_LOG, 'Failed to add warped layer to map:', layerId, e);
            continue;
          }

          const fromKey = 'EPSG:' + p.epsg;
          if (!proj4.defs(fromKey)) {
            console.warn(MV_LOG, 'proj4 missing definition for', fromKey, '(ensure proj4 defs loaded)');
          }

          const w = p.width, h = p.height, tr = p.transform;
          const pxCorners = [[0,0],[w,0],[w,h],[0,h]];
          const cornersLonLat = pxCorners.map(([x,y]) => {
            const xy = affineForward(tr, x, y);
            const ll = proj4(fromKey, 'EPSG:4326', xy);
            return [ll[0], ll[1]];
          });

          const bounds = boundsFromCorners(cornersLonLat);
          if (!bounds) {
            try { if (self._map.getLayer(layerId)) self._map.removeLayer(layerId); } catch (e) {}
            continue;
          }

          const anno = buildGeorefAnnotation(p.serviceUrl, w, h, cornersLonLat);

          let mapIds = [];
          try {
            const res = await warpedLayer.addGeoreferenceAnnotation(anno);
            mapIds = (res || []).filter(x => typeof x === 'string');
          } catch (e) {
            console.error(MV_LOG, 'addGeoreferenceAnnotation failed for', p.label, e);
            try { if (self._map.getLayer(layerId)) self._map.removeLayer(layerId); } catch (e2) {}
            continue;
          }

          const vm = {
            label: p.label,
            bounds,
            layerId,
            layerObj: warpedLayer,
            WarpedCtor,
            _anno: anno,
            mapIds,
            _isOnMap: true,
            visible: ko.observable(!p.isDemHint),   // DEM hint: start jako niewidoczny
            opacity: ko.observable(p.isDemHint ? 0 : 1),

            // STRICT DEM source for sampling
            isDemHint: !!p.isDemHint,

            // blokada UI dla DEM hint (sampling-only)
            samplingOnly: !!p.isDemHint,

            titilerFilePath: p.titilerFilePath,
            titilerBaseUrl: p.titilerBaseUrl,
            elevationUnit: p.elevationUnit
          };

          // DEM hint ma być stale 0% i nie do włączenia
          if (vm.samplingOnly) {
            try { setLayerOpacityCompat(vm.layerObj, vm.mapIds, 0); } catch (e) {}
            try { await setLayerVisibleCompat(self._map, vm, false); } catch (e) {}
          }

          // initial opacity attempt
          applyOpacityWithRetry(vm, 8);

          vm.visible.subscribe(async (v) => {
            // blokada: tej warstwy nie można włączyć
            if (vm.samplingOnly) {
              if (v !== false) vm.visible(false);
              return;
            }
            await setLayerVisibleCompat(self._map, vm, !!v);
          });

          vm.opacity.subscribe(val => {
            // blokada: tej warstwy nie można rozjaśnić
            if (vm.samplingOnly) {
              if (val !== 0) vm.opacity(0);
              return;
            }

            if (!vm.layerObj) return;
            setLayerOpacityCompat(vm.layerObj, vm.mapIds, val);
            applyOpacityWithRetry(vm, 3);
            try { self._map.triggerRepaint(); } catch (e) {}
          });

          layerVMs.push(vm);
        }

        self.layers(layerVMs);
        bringMeasureLayersToFront();
        fitToAllLayers();
      }

      async function renderLayersIfReady(force) {
        const m = ko.unwrap(self.manifest);
        if (!m || !self._map || !self.mapReady()) return;
        if (self._rendering) return;

        const mid = manifestId(m);
        if (!force && mid && self._renderedManifestId === mid) return;

        self._rendering = true;
        self.error('');

        try {
          clearWarpedLayers();
          await addAllmapsLayersFromManifest(m);
          self._renderedManifestId = mid || null;
        } catch (e) {
          console.error(MV_LOG, 'Failed to add layers from manifest', e);
          self.error('Failed to build Allmaps layers: ' + (e?.message || String(e)));
        } finally {
          self._rendering = false;
        }
      }

      self.initMap = function(mapDiv) {
        if (self._map) return;
        if (!mapDiv) { self.error('Missing map container.'); return; }

        self.mapReady(false);
        self.status('Initializing map…');

        self._map = new maplibregl.Map({
          container: mapDiv,
          style: params.basemapStyleUrl || 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
          center: [19, 52],
          zoom: 5,
          maxZoom: 32
        });

        self._map.addControl(new maplibregl.NavigationControl(), 'top-right');
        self._map.on('click', onMapClick);
        self._map.on('mousemove', onMeasureMouseMove);

        self._map.on('load', function() {
          self.status('');
          self.mapReady(true);
          try { self._map.resize(); } catch (e) {}

          ensureMeasureLayers();
          setMeasureLayerVisibility(false);

          renderLayersIfReady(true);
        });

        self._map.on('error', function(e) {
          console.error(MV_LOG, 'MapLibre error', e);
        });

        ko.utils.domNodeDisposal.addDisposeCallback(mapDiv, destroy);
      };

      ko.computed(() => {
        const m = ko.unwrap(self.manifest);
        const ready = self.mapReady();
        if (!m || !ready) return;
        renderLayersIfReady(false);
      });

      return self;
    }
  },
  template: iiifMapViewerTemplate
});

// ============================================================================
// ========================  END: iiif-map-viewer  ============================
// ============================================================================


// ------------------------------------------------------------
// iiif-report component
// ------------------------------------------------------------

export default ko.components.register('iiif-report', {
  viewModel: function(params) {
    const self = this;

    params.configKeys = params.configKeys || [];
    ReportViewModel.apply(self, [params]);

    function baseRoot() {
      const root = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
      return root.replace(/\/+$/, '') + '/';
    }

    function safeUnwrap(x) {
      try { return ko.unwrap(x); } catch (e) { return x; }
    }

    function getOverrideResourceIdFromActiveTab() {
      const tab = params.activeTab ? safeUnwrap(params.activeTab) : null;
      if (!tab) return null;
      const cp = tab.component_params ? safeUnwrap(tab.component_params) : null;

      const rid =
        (cp && cp.overrideResourceId) ? safeUnwrap(cp.overrideResourceId) :
        (tab.overrideResourceId ? safeUnwrap(tab.overrideResourceId) : null);

      return rid || null;
    }

    function tilesArray(resp) {
      if (!resp) return [];
      if (Array.isArray(resp)) return resp;
      if (Array.isArray(resp.tiles)) return resp.tiles;
      return [];
    }

    function getNodeRawFromTiles(nodeId, tilesResp) {
      const tiles = tilesArray(tilesResp);
      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if (!tile || !tile.data) continue;
        if (tile.data[nodeId] !== undefined) return tile.data[nodeId];
      }
      return null;
    }

    function normalizeLangString(raw) {
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        const langs = Object.keys(raw);
        if (!langs.length) return null;
        const langObj = raw[langs[0]];
        const v = langObj && langObj.value ? safeUnwrap(langObj.value) : null;
        return v || null;
      }
      if (typeof raw === 'string') return raw;
      return null;
    }

    function looksLikeManifestUrl(url) {
      if (!url) return false;
      const s = String(url);
      return (s.indexOf('/manifest/') > -1 || s.indexOf('/api/iiif/geotiff-manifest/') > -1);
    }

    function normalizeManifestUrl(url) {
      if (!url || typeof url !== 'string') return null;
      const s = url.trim();
      if (!s) return null;

      if (/^https?:\/\//i.test(s)) return s;

      const root = baseRoot().replace(/\/$/, '');
      return s.charAt(0) === '/' ? root + s : root + '/' + s;
    }

    function geotiffManifestUrlForResource(resourceId) {
      return baseRoot() + 'api/iiif/geotiff-manifest/' + encodeURIComponent(resourceId);
    }

    function defaultManifestUrlForResource(resourceId) {
      return baseRoot() + 'manifest/' + encodeURIComponent(resourceId);
    }

    self.status = ko.observable('Loading…');
    self.error = ko.observable('');
    self.manifestUrl = ko.observable(null);
    self.manifest = ko.observable(null);

    function loadManifestFromUrl(url) {
      self.status('Loading manifest…');
      self.error('');
      self.manifestUrl(url);

      return $.getJSON(url)
        .then(m => {
          self.manifest(m);
          self.status('');
          return m;
        })
        .catch(err => {
          self.manifest(null);
          self.status('');
          self.error('Manifest load failed: ' + (err?.message || String(err)));
          throw err;
        });
    }

    function manifestUrlFromTiles(resourceId) {
      const tilesUrl = baseRoot() + 'resource/' + encodeURIComponent(resourceId) + '/tiles';
      return $.ajax({ url: tilesUrl, method: 'GET', xhrFields: { withCredentials: true } })
        .then(resp => {
          const raw = getNodeRawFromTiles(DIGITAL_RES_URL_NODE_ID, resp);
          const val = normalizeLangString(raw) || raw;
          const url = (typeof val === 'string') ? val : null;
          if (url && looksLikeManifestUrl(url)) return url;
          return null;
        });
    }

    function bootstrap() {
      const ridFromTab = getOverrideResourceIdFromActiveTab();
      const ridFallback = self.report && self.report.get ? self.report.get('resourceid') : null;
      const rid = ridFromTab || ridFallback;

      if (!rid) {
        self.status('');
        self.error('No resource id available for IIIF report.');
        return;
      }

      manifestUrlFromTiles(rid)
        .then(tileManifestUrl => {
          const tileUrl = normalizeManifestUrl(tileManifestUrl);

          if (tileUrl && looksLikeManifestUrl(tileUrl)) {
            return loadManifestFromUrl(tileUrl);
          }

          return loadManifestFromUrl(geotiffManifestUrlForResource(rid))
            .catch(() => loadManifestFromUrl(defaultManifestUrlForResource(rid)));
        })
        .catch(() => {
          return loadManifestFromUrl(geotiffManifestUrlForResource(rid))
            .catch(() => loadManifestFromUrl(defaultManifestUrlForResource(rid)));
        });
    }

    bootstrap();
  },

  template: iiifReportTemplate
});

let _iiifInfoPatchInstalled = false;
function installIiifInfoJsonPatch() {
  if (_iiifInfoPatchInstalled) return;
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') return;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = async function(input, init) {
    const reqUrl =
      typeof input === 'string' ? input :
      (input && input.url ? input.url : '');

    const res = await nativeFetch(input, init);

    try {
      const abs = new URL(reqUrl, window.location.origin);
      const path = abs.pathname || '';

      if (!/\/info\.json$/i.test(path)) return res;
      if (!/\/(iiif\/{1,2})?data\//i.test(path)) return res;

      const ct = (res.headers.get('content-type') || '').toLowerCase();
      if (!res.ok || (!ct.includes('json') && !ct.includes('ld+json'))) return res;

      const cloned = res.clone();
      const json = await cloned.json();

      const rawId = json?.id ?? json?.['@id'] ?? '';
      const fallbackId = abs.origin + path.replace(/\/info\.json$/i, '');
      const idAbs = rawId ? new URL(rawId, abs.origin).toString() : fallbackId;
      const fixedId = forceDoubleSlashAfterIiif(idAbs);

      const needsPatch =
        !rawId ||
        rawId !== fixedId ||
        json?.type !== 'ImageService3' ||
        json?.['@context'] !== 'http://iiif.io/api/image/3/context.json';

      if (!needsPatch) return res;

      const patched = {
        ...json,
        id: fixedId,
        type: 'ImageService3',
        '@context': 'http://iiif.io/api/image/3/context.json'
      };
      delete patched['@id'];

      const headers = new Headers(res.headers);
      headers.set('content-type', 'application/json');
      headers.delete('content-length');

      console.warn(MV_LOG, 'Patched info.json for Allmaps:', rawId, '=>', fixedId);

      return new Response(JSON.stringify(patched), {
        status: res.status,
        statusText: res.statusText,
        headers
      });
    } catch (e) {
      console.warn(MV_LOG, 'info.json patch skipped:', e);
      return res;
    }
  };

  _iiifInfoPatchInstalled = true;
  console.log(MV_LOG, 'Installed IIIF info.json fetch patch');
}