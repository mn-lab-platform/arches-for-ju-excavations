// viewers/iiif-leaflet-viewer.js
import ko from 'knockout';
import $ from 'jquery';

import {
  canvasDims,
  canvasLabel,
  canvasLabelStr,
  extractServiceUrlFromCanvas,
  forceIiifServiceId,
  isDemCanvas,
  isDemProductCanvas,
  mdValue,
  pickLargestCanvas
} from '../lib/iiif-manifest-utils';


const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
const LEAFLET_IIIF_JS = 'https://unpkg.com/leaflet-iiif@3.0.0/leaflet-iiif.js';

const LOG = '[iiif-leaflet-viewer]';
const DEBUG_FLAG = 'iiif.leaflet.debug';
const FORCE_DEBUG = true; // <-- stałe włączenie logów

function isDebugOn() {
  if (FORCE_DEBUG) return true;
  try {
    if (typeof window === 'undefined') return false;
    if (window.__IIIF_LEAFLET_DEBUG__ === true) return true;
    return window.localStorage?.getItem(DEBUG_FLAG) === '1';
  } catch (_) {
    return false;
  }
}
function dbg(...args) {
  if (!isDebugOn()) return;
  console.log(LOG, ...args);
}

const _scriptOnce = new Map();
function ensureScript(url) {
  if (_scriptOnce.has(url)) return _scriptOnce.get(url);

  const p = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.async = true;
    s.src = url;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load script: ' + url));
    document.head.appendChild(s);
  });

  _scriptOnce.set(url, p);
  return p;
}
function getIiifLayerMaxZoom(layer) {
  if (!layer) return null;

  // 1) najczęściej w options
  const a = layer.options?.maxNativeZoom;
  if (Number.isFinite(a)) return a;

  // 2) czasem trzymane wewnętrznie
  const b = layer._maxZoom;
  if (Number.isFinite(b)) return b;

  // 3) jeśli są tiery, policz sam
  const tiers = layer._tiers || layer._tileTiers || null;
  if (Array.isArray(tiers) && tiers.length) {
    // zwykle tiers są w kolejności od najmniejszego do największego
    // maxZoom to tiers.length - 1
    return tiers.length - 1;
  }

  return null;
}
async function ensureLeaflet() {
  // make jQuery visible for non-webpack CDN scripts (leaflet-iiif)
  if (typeof window !== 'undefined') {
    if (!window.$) window.$ = $;
    if (!window.jQuery) window.jQuery = $;
  }

  await ensureScript(LEAFLET_JS);
  await ensureScript(LEAFLET_IIIF_JS);

  const L = window.L;
  if (!L) throw new Error('Leaflet not available after load');
  if (!L.tileLayer || typeof L.tileLayer.iiif !== 'function') {
    throw new Error('leaflet-iiif not available after load');
  }
  return L;
}

/**
 * Leaflet IIIF multi-layer viewer in pixel space (CRS.Simple).
 *
 * - baseCanvasId: selected base canvas (picker)
 * - layers: overlay toggles + opacity (canvases except base)
 *
 * API:
 *   - init(containerEl)
 *   - setManifest(manifest)
 *   - fitToBase()
 *   - dispose()
 */
export function createLeafletViewer(opts = {}) {
  const setStatus = typeof opts.setStatus === 'function' ? opts.setStatus : () => {};
  const setError = typeof opts.setError === 'function' ? opts.setError : () => {};
  const onMapClick = typeof opts.onMapClick === 'function' ? opts.onMapClick : null;

  const api = {};
  api.group = ko.observable('ortho');
  api.ready = ko.observable(false);
  api.error = ko.observable('');

  api.baseCanvasId = ko.observable(null);       // selected base canvas id
  api.canvasOptions = ko.observableArray([]);   // [{ id, label }]
  api.layers = ko.observableArray([]);          // overlay layer VMs

  api._L = null;
  api._map = null;
  api._container = null;

  api._manifest = null;
  api._canvasIndex = new Map(); // id -> { canvas, serviceUrl, label, w,h, _layer, isBase }
  api._subscriptions = [];

  api._lockedBaseId = null;

  function disposeSubs() {
    api._subscriptions.forEach((s) => { try { s.dispose(); } catch (_) {} });
    api._subscriptions = [];
  }

  function makeLayerVm(rec) {
    // Ustaw opacity tylko dla warstwy colorrelief
    const label = rec.label.toLowerCase();
    const isColorRelief = label.includes('(colorrelief)') || label.includes('(color relief)') || label.includes('hillshade');
    const vm = {
      id: rec.id,
      label: rec.label,
      visible: ko.observable(true),
      opacity: ko.observable(isColorRelief ? 0.5 : 1),
      _ensureLayer: () => ensureLayer(rec),
      _setVisible: async (v) => setLayerVisible(rec, v),
      _setOpacity: async (o) => setLayerOpacity(rec, o),
    };

    api._subscriptions.push(vm.visible.subscribe((v) => {
      vm._setVisible(!!v).catch((e) => setError(String(e?.message || e)));
    }));
    api._subscriptions.push(vm.opacity.subscribe((o) => {
      vm._setOpacity(o).catch((e) => setError(String(e?.message || e)));
    }));

    return vm;
  }

  function ensurePanes() {
    if (!api._map) return;

    if (!api._map.getPane('iiif-base')) {
      api._map.createPane('iiif-base');
      api._map.getPane('iiif-base').style.zIndex = 200;
    }
    if (!api._map.getPane('iiif-overlays')) {
      api._map.createPane('iiif-overlays');
      api._map.getPane('iiif-overlays').style.zIndex = 400;
    }
    if (!api._map.getPane('iiif-tools')) {
      api._map.createPane('iiif-tools');
      api._map.getPane('iiif-tools').style.zIndex = 800;
    }    
  }

  async function loadDimsFromInfoJson(rec) {
    if (!rec?.serviceUrl) return;
    try {
      const infoJsonUrl = rec.serviceUrl.replace(/\/+$/, '') + '/info.json';
      const res = await fetch(infoJsonUrl, { credentials: 'same-origin' });
      if (!res.ok) return;
      const json = await res.json();
      const w = Number(json?.width || 0);
      const h = Number(json?.height || 0);
      if (w > 1 && h > 1) {
        rec.w = w;
        rec.h = h;
      }
    } catch (e) {
      dbg('dims load failed', { id: rec?.id, err: String(e?.message || e) });
    }
  }

  async function ensureLayer(rec) {
    if (!api._map) return null;
    if (rec._layer) return rec._layer;
    if (!rec.serviceUrl) {
      throw new Error('Leaflet: missing IIIF ImageService for canvas: ' + rec.id);
    }

    ensurePanes();

    const infoJsonUrl = rec.serviceUrl.replace(/\/+$/, '') + '/info.json';
    const paneName = rec.isBase ? 'iiif-base' : 'iiif-overlays';

    rec._layer = api._L.tileLayer.iiif(infoJsonUrl, {
      opacity: 1,
      pane: paneName,
      fitBounds: false,
      setMaxBounds: false
    });
    return rec._layer;
  }

  async function setLayerVisible(rec, visible) {
    if (!api._map) return;
    if (rec.isBase) return; // base handled separately
    const layer = await ensureLayer(rec);
    const has = api._map.hasLayer(layer);

    if (visible && !has) {
      layer.addTo(api._map);
    } else if (!visible && has) {
      api._map.removeLayer(layer);
    }
  }

  async function setLayerOpacity(rec, opacity) {
    if (!api._map) return;
    if (rec.isBase) return;
    const layer = await ensureLayer(rec);
    const o = Math.max(0, Math.min(1, Number(opacity)));
    if (Number.isFinite(o) && typeof layer.setOpacity === 'function') {
      layer.setOpacity(o);
    }
  }

  async function rebuildBaseAndOverlays() {
    if (!api._map || !api._manifest) return;

    const baseId = api._lockedBaseId || api.baseCanvasId();
    if (!baseId) return;

    // remove only our IIIF layers (safer than removing everything)
    const toRemove = [];
    api._map.eachLayer((l) => {
      const p = l?.options?.pane;
      if (p === 'iiif-base' || p === 'iiif-overlays') toRemove.push(l);
    });
    toRemove.forEach((l) => {
      try { if (api._map.hasLayer(l)) api._map.removeLayer(l); } catch (_) {}
    });

    for (const rec of api._canvasIndex.values()) rec.isBase = (rec.id === baseId);

    const baseRec = api._canvasIndex.get(baseId);
    if (!baseRec) throw new Error('Leaflet: base canvas not found: ' + baseId);

    setStatus('Leaflet: loading base canvas…');

    const baseLayer = await ensureLayer(baseRec);
    baseLayer.addTo(api._map);

    for (const vm of api.layers()) {
      const rec = api._canvasIndex.get(vm.id);
      if (!rec || rec.isBase || !vm.visible()) continue;

      const layer = await ensureLayer(rec);
      const o = Math.max(0, Math.min(1, Number(vm.opacity())));
      layer.setOpacity?.(o);
      layer.addTo(api._map);
    }

    await api.fitToBase();
    setStatus('Leaflet: ready');
  }

  api.init = async (containerEl) => {
    api._container = containerEl;
    api.error('');

    try {
      api._L = await ensureLeaflet();
      api._map = api._L.map(containerEl, {
        crs: api._L.CRS.Simple,
        zoomControl: true,
        attributionControl: false,
        preferCanvas: true
      });

      ensurePanes();

      // Sensible default
      api._map.setView([0, 0], 0);
      api._map.on('click', (e) => {
        const baseId = api._lockedBaseId || api.baseCanvasId();
        const rec = baseId ? api._canvasIndex.get(baseId) : null;
        if (!rec) return;
        const layer = rec?._layer;
        const maxZ = getIiifLayerMaxZoom(layer);
        console.log(LOG, 'IIIF layer maxZoom:', maxZ, 'leaflet map maxZoom:', api._map.getMaxZoom?.(), api._map.options?.maxZoom);
        const w = Number(rec.w || 0);
        const h = Number(rec.h || 0);
        if (!(w > 1 && h > 1)) return;

        // ✅ klucz: CRS -> point na zoom=0 (czyli "piksele obrazu")
        const p = api._map.options.crs.latLngToPoint(e.latlng, 0);
        if (!p) return;

        // Leaflet w CRS.Simple ma (x=lng, y=lat) po transformacji; tutaj dostajesz point w "image units"
        const x = Math.round(p.x);
        const y = Math.round(p.y);

        const xc = Math.max(0, Math.min(w - 1, x));
        const yc = Math.max(0, Math.min(h - 1, y));
        
        onMapClick({
          s:maxZ,
          x: xc,
          y: yc,
          width: w,
          height: h,
          baseCanvasId: baseId,
          canvas: rec.canvas,
          originalEvent: e.originalEvent
        });
      });

      api.ready(true);
    } catch (e) {
      api.error(String(e?.message || e));
      setError(String(e?.message || e));
      throw e;
    }
  };

  api.setManifest = async (manifest) => {
    api._manifest = manifest;
    api.error('');
    const all = manifest.items || [];

    function inGroup(canvas) {
      const dem = isDemCanvas(canvas);
      const prod = isDemProductCanvas(canvas);
      const demFamily = dem || prod;
      return api.group() === 'dem' ? demFamily : !demFamily;
    }
    if (!manifest?.items?.length) {
      disposeSubs();
      api.canvasOptions([]);
      api.layers([]);
      api.baseCanvasId(null);
      return;
    }

    disposeSubs();
    api._canvasIndex.clear();

    let canvases = all.filter(inGroup);
    canvases.forEach((canvas, idx) => {
      const id = canvas?.id || canvas?.['@id'] || `canvas-${idx + 1}`;
      const label = canvasLabel(canvas, `Canvas ${idx + 1}`);
      const serviceUrl = extractServiceUrlFromCanvas(canvas);
      const { w, h } = canvasDims(canvas);


      api._canvasIndex.set(id, {
        id,
        canvas,
        label,
        serviceUrl,
        w,
        h,
        _layer: null,
        isBase: false
      });
    });

    // Build picker options
    const options = Array.from(api._canvasIndex.values()).map((rec) => ({
      id: rec.id,
      label: rec.label
    }));
    api.canvasOptions(options);

    // Pick base:
    // - keep current if exists
    // - else pick largest
    const current = api.baseCanvasId();
    if (current && api._canvasIndex.has(current)) {
      // keep
    } else {
      const bestCanvas = pickLargestCanvas(canvases);
      const bestId = bestCanvas?.id || bestCanvas?.['@id'] || options[0]?.id || null;
      api.baseCanvasId(bestId);
    }

    // Build overlay VMs (everything except base)
    const baseIdNow = api.baseCanvasId();
    const overlayVms = [];
    for (const rec of api._canvasIndex.values()) {
      if (rec.id === baseIdNow) continue;
      overlayVms.push(makeLayerVm(rec));
    }
    api.layers(overlayVms);

    // Rebuild on base change
    api._subscriptions.push(api.baseCanvasId.subscribe(() => {
      rebuildBaseAndOverlays().catch((e) => setError(String(e?.message || e)));
    }));

    // Initial build
    if (api._map) {
      await rebuildBaseAndOverlays();
    }
    api.setGroup = async (group) => {
      api.group(group === 'dem' ? 'dem' : 'ortho');
      if (api._manifest) await api.setManifest(api._manifest);
    };
  };
  function raf() {
    return new Promise((r) => requestAnimationFrame(() => r()));
  }

  api.fitToBase = async () => {
    if (!api._map || !api._manifest || !api._container) return;

    const wpx = api._container.offsetWidth;
    const hpx = api._container.offsetHeight;
    if (!(wpx > 0 && hpx > 0)) return; // ukryty kontener

    const baseId = api._lockedBaseId || api.baseCanvasId();
    const rec = baseId ? api._canvasIndex.get(baseId) : null;
    if (!rec || !rec._layer) return;

    const layer = rec._layer;

    // KLUCZ: poczekaj aż leaflet-iiif skończy _getInfo() i policzy tierSizes
    try {
      if (layer._infoPromise && typeof layer._infoPromise.then === 'function') {
        await layer._infoPromise;
      }
    } catch (_) {
      // jeśli infoPromise reject, i tak nie fituj
      return;
    }

    // daj przeglądarce 1 klatkę na layout + Leaflet na init tilepane
    await raf();

    try {
      api._map.invalidateSize(false);

      if (typeof layer._fitBounds === 'function') {
        layer._fitBounds();     // używa poprawnych imageSizes + zoom logic pluginu
        return;
      }

      // fallback: dopiero jakby _fitBounds nie istniało
      const w = Number(rec.w), h = Number(rec.h);
      if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 1 || h <= 1) return;

      const sw = api._map.options.crs.pointToLatLng(L.point(0, h), 0);
      const ne = api._map.options.crs.pointToLatLng(L.point(w, 0), 0);
      api._map.fitBounds(L.latLngBounds(sw, ne), { animate: false });
    } catch (e) {
      setError(`Leaflet fit failed: ${String(e?.message || e)}`);
    }
  };

  api.getCanvasRecord = (canvasId) => {
    if (!canvasId) return null;
    return api._canvasIndex.get(canvasId) || null;
  };

  api.getCanvasMaxZoom = (canvasId) => {
    const rec = api.getCanvasRecord(canvasId);
    if (!rec) return null;

    const layer = rec._layer || null;
    const fromLayer = getIiifLayerMaxZoom(layer);
    if (Number.isFinite(fromLayer)) return fromLayer;

    const w = Number(rec.w || 0);
    const h = Number(rec.h || 0);
    const maxDim = Math.max(w, h);
    if (!(maxDim > 1)) return 0;

    // fallback tylko gdy warstwa jeszcze nie ma wyliczonego zoomu
    return Math.max(0, Math.ceil(Math.log2(maxDim / 256)));
  };

  api.getCurrentBaseCanvasMaxZoom = () => {
    const baseId = api._lockedBaseId || api.baseCanvasId();
    return api.getCanvasMaxZoom(baseId);
  };
  api.dispose = () => {
    disposeSubs();

    try {
      if (api._map) api._map.remove();
    } catch (_) {}

    api._map = null;
    api._container = null;
    api._manifest = null;
    api._canvasIndex.clear();
    api.ready(false);
  };

  return api;
}