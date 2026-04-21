// views/components/iiif/map/allmaps-layer-manager.js

import proj4 from 'proj4';
import { affineForward } from '../lib/affine-utils';
import {
  canvasLabel,
  ensureAbsoluteUrl,
  extractServiceUrlFromCanvas,
  extractTitilerFilePathFromServiceUrl,
  mdBool,
  mdValue
} from '../lib/iiif-manifest-utils';

const LOG = '[allmaps-layer-manager]';

// CDN loader for @allmaps/maplibre
const ALLMAPS_ESM_URL = 'https://esm.sh/@allmaps/maplibre@1.0.0-beta.38?bundle';

let _ctorPromise = null;
async function loadWarpedCtor(setStatus) {
  if (_ctorPromise) return _ctorPromise;

  _ctorPromise = import(/* webpackIgnore: true */ ALLMAPS_ESM_URL).then((mod) => {
    const ctor = mod?.WarpedMapLayer || mod?.default?.WarpedMapLayer || mod?.default;
    if (typeof ctor !== 'function') throw new Error('WarpedMapLayer not found in ESM module');
    return ctor;
  });

  if (typeof setStatus === 'function') setStatus('Loading Allmaps library…');
  const ctor = await _ctorPromise;
  if (typeof setStatus === 'function') setStatus('');
  return ctor;
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

function forceHttpsUrl(url) {
  if (!url) return url;
  try {
    const u = new URL(url, window.location.origin);
    if (window.location.protocol === 'https:' && u.protocol === 'http:' && u.host === window.location.host) {
      u.protocol = 'https:';
      return u.toString();
    }
    return u.toString();
  } catch (_) {
    return String(url).replace(/^http:\/\//i, 'https://');
  }
}

function resolveCanvasServiceUrl(canvas) {
  const rawServiceUrl = extractServiceUrlFromCanvas(canvas);
  return rawServiceUrl ? forceHttpsUrl(ensureAbsoluteUrl(rawServiceUrl)) : null;
}

function getTitilerBaseUrl(serviceUrl) {
  try {
    return new URL(serviceUrl, window.location.origin).origin;
  } catch (_) {
    return '';
  }
}

function buildGeorefAnnotation(serviceUrl, width, height, cornersLonLat) {
  const w = Math.round(width);
  const h = Math.round(height);
  const absoluteServiceUrl = forceHttpsUrl(ensureAbsoluteUrl(serviceUrl));
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
      source: { id: absoluteServiceUrl, type: 'ImageService3' },
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

function createLayerVm(map, picked, layerId, warpedLayer, WarpedCtor, anno, mapIds) {
  const vm = {
    label: picked.label,
    bounds: picked.bounds,
    layerId,
    layerObj: warpedLayer,
    WarpedCtor,
    _anno: anno,
    mapIds,
    _isOnMap: true,
    visible: picked.isDemHint ? false : true,
    opacity: picked.isDemHint ? 0 : 1,
    isDemHint: !!picked.isDemHint,
    samplingOnly: !!picked.isDemHint,
    titilerFilePath: picked.titilerFilePath,
    titilerBaseUrl: picked.titilerBaseUrl,
    elevationUnit: picked.elevationUnit,
    _setVisible: async (visible) => {
      if (vm.samplingOnly) return;
      await setLayerVisibleCompat(map, vm, !!visible);
    },
    _setOpacity: (opacity) => {
      if (vm.samplingOnly) return;
      setLayerOpacityCompat(vm.layerObj, vm.mapIds, opacity);
      applyOpacityWithRetry(vm, 3);
      try { map.triggerRepaint(); } catch (e) {}
    }
  };

  return vm;
}

// ---- OPACITY compat ----
function setLayerOpacityCompat(layerObj, mapIds, opacity) {
  const o = Math.max(0, Math.min(1, parseFloat(opacity)));
  if (!layerObj) return;

  if (typeof layerObj.setOpacity === 'function') {
    try { layerObj.setOpacity(o); return; } catch (e) {}
  }

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

  if (ids.length && typeof layerObj.setMapOpacity === 'function') {
    let ok = false;
    for (const id of ids) {
      try { layerObj.setMapOpacity(id, o); ok = true; } catch (e) {}
    }
    if (ok) return;
  }

  const c = layerObj.canvas || layerObj._canvas || layerObj._glCanvas || null;
  if (c && c.style) c.style.opacity = String(o);
}
function getOpacityValue(vm) {
  const raw = typeof vm?.opacity === 'function' ? vm.opacity() : vm?.opacity;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 1;
}

function applyOpacityWithRetry(vm, triesLeft) {
  if (!vm || !vm.layerObj) return;
  setLayerOpacityCompat(vm.layerObj, vm.mapIds, getOpacityValue(vm));

  const c = vm.layerObj.canvas || vm.layerObj._canvas || vm.layerObj._glCanvas;
  if (c && c.style) return;

  if ((triesLeft ?? 0) <= 0) return;
  requestAnimationFrame(() => applyOpacityWithRetry(vm, (triesLeft ?? 0) - 1));
}

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
    applyOpacityWithRetry(vm, 2);
    return;
  }

  try {
    // defensive: remove stale layer with same id if present
    if (vm.layerId && map.getLayer(vm.layerId)) {
      try { map.removeLayer(vm.layerId); } catch (e) {}
    }

    const layer = new vm.WarpedCtor(vm.layerId);
    map.addLayer(layer);
    vm.layerObj = layer;
    vm._isOnMap = true;

    const res = await layer.addGeoreferenceAnnotation(vm._anno);
    vm.mapIds = (res || []).filter(x => typeof x === 'string');

    applyOpacityWithRetry(vm, 6);

    try { map.moveLayer(vm.layerId); } catch (e) {}
  } catch (e) {
    console.error(LOG, 'Failed to re-enable layer', vm.layerId, e);
  }
}

// ---------------- public factory ----------------
export function createAllmapsLayerManager(opts = {}) {
  const setStatus = typeof opts.setStatus === 'function' ? opts.setStatus : () => {};
  const setError = typeof opts.setError === 'function' ? opts.setError : () => {};

  function clear(map, layerVMs) {
    if (!map || !Array.isArray(layerVMs)) return;
    for (const l of layerVMs) {
      if (l?.layerId && map.getLayer(l.layerId)) {
        try { map.removeLayer(l.layerId); } catch (e) {}
      }
    }
  }

  function fitToLayers(map, layerVMs) {
    if (!map || !Array.isArray(layerVMs)) return;
    const boundsList = layerVMs.map(l => l.bounds).filter(Boolean);
    if (!boundsList.length) return;

    let minLon = 180, minLat = 90, maxLon = -180, maxLat = -90;
    for (const b of boundsList) {
      minLon = Math.min(minLon, b[0][0]); minLat = Math.min(minLat, b[0][1]);
      maxLon = Math.max(maxLon, b[1][0]); maxLat = Math.max(maxLat, b[1][1]);
    }
    map.fitBounds([[minLon, minLat], [maxLon, maxLat]], { padding: 40, duration: 0 });
  }

  async function build(map, manifest) {
    if (!map) throw new Error('Missing map');
    const m = manifest;
    const canvases = Array.isArray(m?.items) ? m.items : [];

    // 1) pre-pass: donors by base label for missing georef
    const georefByBase = new Map();

    for (const canvas of canvases) {
      const svc = resolveCanvasServiceUrl(canvas);
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

    // 2) pick display candidates
    const picked = [];
    for (const canvas of canvases) {
      const svc = resolveCanvasServiceUrl(canvas);
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

      const isDemHint = mdBool(canvas, 'is_dem_hint');

      const titilerFilePath =
        mdValue(canvas, 'titiler.file_path') ||
        mdValue(canvas, 'file_path') ||
        extractTitilerFilePathFromServiceUrl(svc);

      const titilerBaseUrl = getTitilerBaseUrl(svc);
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
      setError('No displayable canvases found (no service/georeference).');
      return [];
    }

    // 3) load ctor + build layers
    const WarpedCtor = await loadWarpedCtor(setStatus);

    const layerVMs = [];
    for (const p of picked) {
      const layerId = 'iiif-warped-' + slugifyId(p.label);

      // defensive: if concurrent/re-entrant build left stale id
      if (map.getLayer(layerId)) {
        try { map.removeLayer(layerId); } catch (e) {}
      }

      const warpedLayer = new WarpedCtor(layerId);
      try {
        map.addLayer(warpedLayer);
      } catch (e) {
        console.error(LOG, 'Failed to add warped layer to map:', layerId, e);
        continue;
      }

      const fromKey = 'EPSG:' + p.epsg;
      if (!proj4.defs(fromKey)) {
        console.warn(LOG, 'proj4 missing definition for', fromKey, '(ensure proj4 defs loaded)');
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
        try { if (map.getLayer(layerId)) map.removeLayer(layerId); } catch (e) {}
        continue;
      }

      const anno = buildGeorefAnnotation(p.serviceUrl, w, h, cornersLonLat);
      let mapIds = [];
      try {
        const res = await warpedLayer.addGeoreferenceAnnotation(anno);
        mapIds = (res || []).filter(x => typeof x === 'string');
      } catch (e) {
        console.error(LOG, 'addGeoreferenceAnnotation failed for', p.label, e);
        try { if (map.getLayer(layerId)) map.removeLayer(layerId); } catch (e2) {}
        continue;
      }

      const vm = createLayerVm(map, { ...p, bounds }, layerId, warpedLayer, WarpedCtor, anno, mapIds);

      // DEM-only layers stay available for sampling, but hidden from the map UI.
      if (vm.samplingOnly) {
        try { setLayerOpacityCompat(vm.layerObj, vm.mapIds, 0); } catch (e) {}
        try { await setLayerVisibleCompat(map, vm, false); } catch (e) {}
      }

      // initial opacity attempt
      applyOpacityWithRetry(vm, 8);

      layerVMs.push(vm);
    }

    return layerVMs;
  }

  return {
    build,
    clear,
    fitToLayers
  };
}
