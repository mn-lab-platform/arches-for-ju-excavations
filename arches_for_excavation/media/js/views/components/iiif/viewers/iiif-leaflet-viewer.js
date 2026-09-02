// viewers/iiif-leaflet-viewer.js
import ko from 'knockout';
import $ from 'jquery';

import {
  canvasDims,
  canvasLabel,
  extractServiceUrlFromCanvas,
  isDemCanvas,
  isDemProductCanvas,
  pickLargestCanvas
} from '../lib/iiif-manifest-utils';

import { createLeafletViewManager } from '../features/leaflet-view-manager';
import { ensureLeafletIiif, getIiifLayerMaxZoom } from '../lib/leaflet-iiif-loader';
import { createLeafletClickCoordinates } from '../lib/leaflet-click-coordinates';

const LOG = '[iiif-leaflet-viewer]';
const DEBUG_FLAG = 'iiif.leaflet.debug';
const FORCE_DEBUG = true;

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

function computeNativeMaxZoomFromDims(w, h) {
  const maxDim = Math.max(Number(w || 0), Number(h || 0));
  if (!(maxDim > 1)) return 0;
  return Math.max(0, Math.ceil(Math.log2(maxDim / 256)));
}

function getCanvasId(canvas, fallback) {
  return canvas?.id || canvas?.['@id'] || fallback || null;
}

export function createLeafletViewer(opts = {}) {
  const setStatus  = typeof opts.setStatus  === 'function' ? opts.setStatus  : () => {};
  const setError   = typeof opts.setError   === 'function' ? opts.setError   : () => {};
  const onMapClick = typeof opts.onMapClick === 'function' ? opts.onMapClick : null;

  const api = {};

  api.group = ko.observable('ortho');
  api.ready = ko.observable(false);
  api.error = ko.observable('');

  api.baseCanvasId  = ko.observable(null);
  api.canvasOptions = ko.observableArray([]);
  api.layers        = ko.observableArray([]);

  api._L             = null;
  api._map           = null;
  api._container     = null;
  api._manifest      = null;
  api._canvasIndex   = new Map();
  api._subscriptions = [];
  api._lockedBaseId  = null;

  /**
   * displayMaxZoom:
   * - wspólny max zoom dla UI Leafleta
   * - zwykle powinien odpowiadać największemu canvasowi, np. ortho
   *
   * nativeMaxZoom:
   * - prawdziwy max zoom konkretnego canvasu
   * - używany do pikseli, DEM, pomiarów, affine itd.
   */
  api._displayMaxZoom = 0;

  const viewManager = createLeafletViewManager({
    getMap: () => api._map,
    getLeaflet: () => api._L,
    getBaseCanvasId: () => api._lockedBaseId || api.baseCanvasId(),
    getCanvasRecord: (id) => api.getCanvasRecord(id),

    // To ma zostać natywne. Tego używają piksele/pomiary/DEM.
    getCanvasMaxZoom: (id) => api.getCanvasNativeMaxZoom(id),

    // To jest tylko zoom widoku/UI.
    getDisplayMaxZoom: () => api.getDisplayMaxZoom(),

    getViewportCenterInfo: () => api.getViewportCenterInfo(),
    dbg
  });

  function disposeSubs() {
    api._subscriptions.forEach((s) => {
      try { s.dispose(); } catch (_) {}
    });
    api._subscriptions = [];
  }

  // ─── layer management ─────────────────────────────────────────────────────

  function makeLayerVm(rec) {
    const label = String(rec.label || '').toLowerCase();
    const isColorRelief =
      label.includes('(colorrelief)') ||
      label.includes('(color relief)') ||
      label.includes('hillshade');

    const vm = {
      id: rec.id,
      label: rec.label,
      visible: ko.observable(true),
      opacity: ko.observable(isColorRelief ? 0.5 : 1),
      _ensureLayer: () => ensureLayer(rec),
      _setVisible: async (v) => setLayerVisible(rec, v),
      _setOpacity: async (o) => setLayerOpacity(rec, o)
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

    if (!api._map.getPane('iiif-tools-line')) {
      api._map.createPane('iiif-tools-line');
      api._map.getPane('iiif-tools-line').style.zIndex = 850;
    }

    if (!api._map.getPane('iiif-tools-markers')) {
      api._map.createPane('iiif-tools-markers');
      api._map.getPane('iiif-tools-markers').style.zIndex = 900;
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

    const nativeMaxZoom = Number(api.getCanvasNativeMaxZoom(rec.id) ?? rec.nativeMaxZoom ?? 0);
    const displayMaxZoom = Number(api.getDisplayMaxZoom() ?? nativeMaxZoom);

    rec._layer = api._L.tileLayer.iiif(infoJsonUrl, {
      opacity: 1,
      pane: paneName,
      fitBounds: false,
      setMaxBounds: false,

      /**
       * Najważniejsza część:
       *
       * maxNativeZoom = do którego zoomu istnieją prawdziwe kafle
       * maxZoom       = do którego Leaflet pozwala wizualnie przybliżać
       *
       * Czyli DEM może mieć nativeMaxZoom = 3,
       * ale displayMaxZoom = 5, więc Leaflet overzoomuje DEM-a.
       */
      maxNativeZoom: nativeMaxZoom,
      maxZoom: displayMaxZoom
    });

    return rec._layer;
  }

  async function setLayerVisible(rec, visible) {
    if (!api._map) return;
    if (rec.isBase) return;

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

  // ─── rebuild ──────────────────────────────────────────────────────────────

  async function rebuildBaseAndOverlays(rebuildOpts = {}) {
    if (!api._map || !api._manifest) return;

    const preserveView = !!rebuildOpts.preserveView;
    const savedViewReady = !!rebuildOpts.savedViewReady;

    if (preserveView && !savedViewReady) {
      viewManager.saveView();
    }

    const baseId = api._lockedBaseId || api.baseCanvasId();
    if (!baseId) return;

    const toRemove = [];

    api._map.eachLayer((l) => {
      const p = l?.options?.pane;
      if (p === 'iiif-base' || p === 'iiif-overlays') {
        toRemove.push(l);
      }
    });

    toRemove.forEach((l) => {
      try {
        if (api._map.hasLayer(l)) api._map.removeLayer(l);
      } catch (_) {}
    });

    for (const rec of api._canvasIndex.values()) {
      rec.isBase = rec.id === baseId;
    }

    const baseRec = api._canvasIndex.get(baseId);
    if (!baseRec) {
      throw new Error('Leaflet: base canvas not found: ' + baseId);
    }

    const displayMaxZoom = Number(api.getDisplayMaxZoom() ?? baseRec.nativeMaxZoom ?? 0);

    if (typeof api._map.setMaxZoom === 'function') {
      api._map.setMaxZoom(displayMaxZoom);
    }

    setStatus('Leaflet: loading base canvas…');

    const baseLayer = await ensureLayer(baseRec);
    baseLayer.addTo(api._map);

    for (const vm of api.layers()) {
      const rec = api._canvasIndex.get(vm.id);
      if (!rec || rec.isBase || !vm.visible()) continue;

      const layer = await ensureLayer(rec);
      layer.setOpacity?.(Math.max(0, Math.min(1, Number(vm.opacity()))));
      layer.addTo(api._map);
    }

    if (preserveView && viewManager.hasSavedView()) {
      const ok = await viewManager.restoreView(baseRec);
      if (!ok) {
        await api.fitToBase();
      }
    } else {
      await api.fitToBase();
    }

    setStatus('Leaflet: ready');
  }

  // ─── init ─────────────────────────────────────────────────────────────────

  api.init = async (containerEl) => {
    api._container = containerEl;
    api.error('');

    try {
      api._L = await ensureLeafletIiif({ jquery: $, includeCss: true });

      api._map = api._L.map(containerEl, {
        crs: api._L.CRS.Simple,
        zoomControl: true,
        attributionControl: false,
        preferCanvas: true
      });

      ensurePanes();

      api._map.setView([0, 0], 0);

      api._map.on('click', (e) => {
        const baseId = api._lockedBaseId || api.baseCanvasId();
        const rec = baseId ? api._canvasIndex.get(baseId) : null;
        if (!rec) return;

        const nativeMaxZoom = api.getCanvasNativeMaxZoom(baseId) ?? 0;
        const displayMaxZoom = api.getDisplayMaxZoom() ?? nativeMaxZoom;

        const w = Number(rec.w || 0);
        const h = Number(rec.h || 0);

        if (!(w > 1 && h > 1)) return;

        const p = api._map.options.crs.latLngToPoint(e.latlng, 0);
        if (!p) return;

        onMapClick?.(createLeafletClickCoordinates({
          viewX: p.x,
          viewY: p.y,
          nativeMaxZoom,
          displayMaxZoom,
          width: w,
          height: h,
          baseCanvasId: baseId,
          canvas: rec.canvas,
          latlng: e.latlng,
          originalEvent: e.originalEvent
        }));
      });

      api.ready(true);
    } catch (e) {
      api.error(String(e?.message || e));
      setError(String(e?.message || e));
      throw e;
    }
  };

  // ─── setManifest ──────────────────────────────────────────────────────────

  api.setManifest = async (manifest, manifestOpts = {}) => {
    api._manifest = manifest;
    api.error('');

    const all = manifest?.items || [];

    const preserveView = !!manifestOpts.preserveView;

    /**
     * Save robimy zanim wyczyścimy canvasIndex.
     */
    if (preserveView) {
      viewManager.saveView();
    }

    function inGroup(canvas) {
      const dem = isDemCanvas(canvas);
      const prod = isDemProductCanvas(canvas);
      const demFam = dem || prod;

      return api.group() === 'dem' ? demFam : !demFam;
    }

    if (!all.length) {
      disposeSubs();
      api.canvasOptions([]);
      api.layers([]);
      api.baseCanvasId(null);
      api._displayMaxZoom = 0;
      return;
    }

    /**
     * Wspólny displayMaxZoom liczymy z całego manifestu,
     * a nie tylko z aktualnej grupy.
     *
     * Dzięki temu przełączenie ortho <-> DEM nie zmienia
     * maksymalnego zoomu UI.
     */
    api._displayMaxZoom = Math.max(
      0,
      ...all.map((canvas, idx) => {
        const { w, h } = canvasDims(canvas);
        return computeNativeMaxZoomFromDims(w, h);
      })
    );

    disposeSubs();
    api._canvasIndex.clear();

    const canvases = all.filter(inGroup);
    const activeCanvases = canvases.length ? canvases : all;

    activeCanvases.forEach((canvas, idx) => {
      const id = getCanvasId(canvas, `canvas-${idx + 1}`);
      const label = canvasLabel(canvas, `Canvas ${idx + 1}`);
      const serviceUrl = extractServiceUrlFromCanvas(canvas);
      const { w, h } = canvasDims(canvas);
      const nativeMaxZoom = computeNativeMaxZoomFromDims(w, h);

      api._canvasIndex.set(id, {
        id,
        canvas,
        label,
        serviceUrl,
        w,
        h,
        nativeMaxZoom,
        _layer: null,
        isBase: false
      });
    });

    const pickerOpts = Array.from(api._canvasIndex.values()).map((rec) => ({
      id: rec.id,
      label: rec.label
    }));

    api.canvasOptions(pickerOpts);

    const current = api.baseCanvasId();

    if (current && api._canvasIndex.has(current)) {
      // zostaw aktualną bazę
    } else {
      const src = canvases.length ? canvases : all;
      const best = pickLargestCanvas(src);
      const bestId = getCanvasId(best, pickerOpts[0]?.id || null);

      api.baseCanvasId(bestId);
    }

    const baseIdNow = api.baseCanvasId();
    const overlayVms = [];

    for (const rec of api._canvasIndex.values()) {
      if (rec.id === baseIdNow) continue;
      overlayVms.push(makeLayerVm(rec));
    }

    api.layers(overlayVms);

    api._subscriptions.push(api.baseCanvasId.subscribe((newId) => {
      rebuildBaseAndOverlays({ preserveView: false })
        .catch((e) => setError(String(e?.message || e)));
    }));

    if (api._map) {
      await rebuildBaseAndOverlays({
        preserveView,
        savedViewReady: preserveView
      });
    }
  };

  // ─── setGroup ─────────────────────────────────────────────────────────────

  api.setGroup = async (group, groupOpts = {}) => {
    const newGroup = group === 'dem' ? 'dem' : 'ortho';
    api.group(newGroup);

    if (api._manifest) {
      await api.setManifest(api._manifest, {
        preserveView: true,
        ...groupOpts
      });
    }
  };

  // ─── fitToBase ────────────────────────────────────────────────────────────

  function raf() {
    return new Promise((r) => requestAnimationFrame(() => r()));
  }

  api.fitToBase = async () => {
    if (!api._map || !api._manifest || !api._container) return;

    const wpx = api._container.offsetWidth;
    const hpx = api._container.offsetHeight;

    if (!(wpx > 0 && hpx > 0)) return;

    const baseId = api._lockedBaseId || api.baseCanvasId();
    const rec = baseId ? api._canvasIndex.get(baseId) : null;

    if (!rec || !rec._layer) return;

    const layer = rec._layer;

    try {
      if (layer._infoPromise && typeof layer._infoPromise.then === 'function') {
        await layer._infoPromise;
      }
    } catch (_) {
      return;
    }

    await raf();

    try {
      api._map.invalidateSize(false);

      if (typeof layer._fitBounds === 'function') {
        layer._fitBounds();
        return;
      }

      const w = Number(rec.w);
      const h = Number(rec.h);

      if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 1 || h <= 1) {
        return;
      }

      const L = api._L;
      const sw = api._map.options.crs.pointToLatLng(L.point(0, h), 0);
      const ne = api._map.options.crs.pointToLatLng(L.point(w, 0), 0);

      api._map.fitBounds(L.latLngBounds(sw, ne), {
        animate: false
      });
    } catch (e) {
      setError(`Leaflet fit failed: ${String(e?.message || e)}`);
    }
  };

  // ─── misc API ─────────────────────────────────────────────────────────────

  api.getCanvasRecord = (canvasId) => {
    if (!canvasId) return null;
    return api._canvasIndex.get(canvasId) || null;
  };

  api.getViewportCenterInfo = () => {
    const map = api._map;
    const L = api._L;
    const baseId = api._lockedBaseId || api.baseCanvasId();
    const rec = baseId ? api._canvasIndex.get(baseId) : null;

    if (!map || !L || !rec) return null;

    const w = Number(rec.w || 0);
    const h = Number(rec.h || 0);

    if (!(w > 1 && h > 1)) return null;

    const crs = map.options?.crs;

    if (
      !crs?.latLngToPoint ||
      typeof map.getSize !== 'function' ||
      typeof map.containerPointToLatLng !== 'function'
    ) {
      return null;
    }

    const size = map.getSize();

    if (!size || !(size.x > 0) || !(size.y > 0)) {
      return null;
    }

    const viewportPoint = L.point(size.x / 2, size.y / 2);
    const latlng = map.containerPointToLatLng(viewportPoint);

    if (!latlng) return null;

    const pixelAtZoom0 = crs.latLngToPoint(latlng, 0);

    if (
      !pixelAtZoom0 ||
      !Number.isFinite(pixelAtZoom0.x) ||
      !Number.isFinite(pixelAtZoom0.y)
    ) {
      return null;
    }

    const nativeMaxZoom = api.getCanvasNativeMaxZoom(baseId) ?? 0;
    const displayMaxZoom = api.getDisplayMaxZoom() ?? nativeMaxZoom;

    /**
     * Skala do pikseli musi być natywna dla canvasu.
     * Nie wolno tutaj użyć displayMaxZoom.
     */
    const scale = Math.pow(2, nativeMaxZoom);

    return {
      baseCanvasId: baseId,
      width: w,
      height: h,

      /**
       * Stare `s` zostaje jako nativeMaxZoom.
       * To chroni stare moduły: DEM picker, measure, annotations.
       */
      s: nativeMaxZoom,
      nativeMaxZoom,
      displayMaxZoom,

      x: pixelAtZoom0.x,
      y: pixelAtZoom0.y,
      imgX: pixelAtZoom0.x,
      imgY: pixelAtZoom0.y,

      absX: pixelAtZoom0.x * scale,
      absY: pixelAtZoom0.y * scale,

      latlng,
      viewportX: viewportPoint.x,
      viewportY: viewportPoint.y,
      zoom: Number(map.getZoom?.() ?? 0)
    };
  };

  api.getCanvasNativeMaxZoom = (canvasId) => {
    const rec = api.getCanvasRecord(canvasId);
    if (!rec) return null;

    /**
     * Najpierw próbujemy z layera, bo leaflet-iiif po info.json
     * może mieć dokładniejszą wartość.
     */
    const fromLayer = getIiifLayerMaxZoom(rec._layer || null);

    if (Number.isFinite(fromLayer)) {
      return fromLayer;
    }

    if (Number.isFinite(rec.nativeMaxZoom)) {
      return rec.nativeMaxZoom;
    }

    return computeNativeMaxZoomFromDims(rec.w, rec.h);
  };

  /**
   * Backward compatibility:
   * stara nazwa zwraca nadal native max zoom.
   */
  api.getCanvasMaxZoom = (canvasId) => {
    return api.getCanvasNativeMaxZoom(canvasId);
  };

  api.getDisplayMaxZoom = () => {
    return Number(api._displayMaxZoom || 0);
  };

  api.getCurrentBaseCanvasMaxZoom = () => {
    const baseId = api._lockedBaseId || api.baseCanvasId();
    return api.getCanvasNativeMaxZoom(baseId);
  };

  api.getCurrentDisplayMaxZoom = () => {
    return api.getDisplayMaxZoom();
  };

  api.dispose = () => {
    disposeSubs();

    try {
      if (api._map) api._map.remove();
    } catch (_) {}

    api._map = null;
    api._container = null;
    api._manifest = null;
    api._displayMaxZoom = 0;

    api._canvasIndex.clear();
    viewManager.clear();

    api.ready(false);
  };

  return api;
}