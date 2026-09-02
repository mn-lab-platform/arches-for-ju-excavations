const LOG = '[leaflet-dem-picker-controller]';

import { fetchDemPixelValue } from '../lib/dem-pixel-api';

export function createLeafletDemPickerController(opts = {}) {
  const state = opts.state;
  const getMap = typeof opts.getMap === 'function' ? opts.getMap : () => null;
  const getLeaflet = typeof opts.getLeaflet === 'function' ? opts.getLeaflet : () => null;
  const getManifest = typeof opts.getManifest === 'function' ? opts.getManifest : () => null;
  const parseTransformFromCanvas = typeof opts.parseTransformFromCanvas === 'function' ? opts.parseTransformFromCanvas : null;
  const pickDemCanvasFromManifest = typeof opts.pickDemCanvasFromManifest === 'function' ? opts.pickDemCanvasFromManifest : null;
  const affineForward = typeof opts.affineForward === 'function' ? opts.affineForward : null;
  const affineInverse = typeof opts.affineInverse === 'function' ? opts.affineInverse : null;
  const getCanvasDims = typeof opts.getCanvasDims === 'function'
    ? opts.getCanvasDims
    : (canvas) => ({ w: Number(canvas?.width || 0), h: Number(canvas?.height || 0) });
  const endpoint = opts.endpoint || '/api/iiif/dem/pixel-value';

  if (!state) throw new Error('createLeafletDemPickerController requires opts.state');
  if (!pickDemCanvasFromManifest) throw new Error('createLeafletDemPickerController requires opts.pickDemCanvasFromManifest');

  let marker = null;

  function removeLayerSafe(map, layer) {
    if (!map || !layer) return;
    try { map.removeLayer(layer); } catch (_) {}
  }

  function clear() {
    const map = getMap();
    state.elevationError('');
    if (marker && map) removeLayerSafe(map, marker);
    marker = null;
  }

  function setMarker(viewX, viewY) {
    const map = getMap();
    const L = getLeaflet();
    if (!map || !L) return;

    if (marker) removeLayerSafe(map, marker);
    marker = L.circleMarker([-viewY, viewX], {
        pane : 'iiif-tools-markers',
        radius: 6,
        color: 'rgb(87, 155, 215)',
        fillColor: 'rgb(87, 155, 215)',
        fillOpacity: 0.9,
        weight: 2
    }).addTo(map);
  }

  function imageCoords(info) {
    const viewX = Number.isFinite(Number(info?.viewX)) ? Number(info.viewX) : Number(info?.x);
    const viewY = Number.isFinite(Number(info?.viewY)) ? Number(info.viewY) : Number(info?.y);
    const scale = 2 ** Number(info?.nativeMaxZoom ?? info?.s ?? 0);
    return {
      x: Number.isFinite(Number(info?.imageX)) ? Number(info.imageX) : viewX * scale,
      y: Number.isFinite(Number(info?.imageY)) ? Number(info.imageY) : viewY * scale
    };
  }

  function toPixelIndex(value, size) {
    const rounded = Math.round(Number(value));
    if (!Number.isFinite(rounded)) return null;
    return Number.isFinite(Number(size)) && Number(size) > 0
      ? Math.max(0, Math.min(Number(size) - 1, rounded))
      : rounded;
  }

  function sameCanvas(a, b) {
    const aId = a?.id || a?.['@id'];
    const bId = b?.id || b?.['@id'];
    return !!aId && aId === bId;
  }

  function resolveDemPixel(info, baseCanvas, baseTransform, manifest) {
    const demCanvas = pickDemCanvasFromManifest(manifest);
    if (!demCanvas) {
      state.elevationError('Brak canvas DEM.');
      return null;
    }

    const sourceCanvas = baseCanvas || info?.canvas || null;
    const source = imageCoords(info);
    const demDims = getCanvasDims(demCanvas);

    if (sameCanvas(sourceCanvas, demCanvas)) {
      return {
        demCanvas,
        x: toPixelIndex(source.x, demDims.w),
        y: toPixelIndex(source.y, demDims.h)
      };
    }

    if (!parseTransformFromCanvas || !affineForward || !affineInverse) {
      state.elevationError('Brak funkcji transformacji do przeliczenia na DEM.');
      return null;
    }

    const demTr = parseTransformFromCanvas(demCanvas);
    if (!baseTransform || !demTr) {
      state.elevationError('Brak transformacji do przeliczenia na DEM.');
      return null;
    }

    const local = affineForward(baseTransform, source.x, source.y);
    if (!Array.isArray(local) || local.length !== 2) {
      state.elevationError('Nie można przeliczyć współrzędnych do lokalnego CRS.');
      return null;
    }

    const inv = affineInverse(demTr, local[0], local[1]);
    if (!inv) {
      state.elevationError('Nie można przeliczyć współrzędnych DEM.');
      return null;
    }

    return {
      demCanvas,
      x: toPixelIndex(inv[0], demDims.w),
      y: toPixelIndex(inv[1], demDims.h)
    };
  }

  async function fetchValue(x, y, manifest) {
    try {
      state.elevationLoading(true);
      state.elevationError('');
      const json = await fetchDemPixelValue({ manifest, x, y, endpoint });
      state.elevationValue(`${json.value} m`);
    } catch (err) {
      console.warn(LOG, 'DEM pixel error:', err);
      state.elevationError('DEM pixel error: ' + String(err?.message || err));
    } finally {
      state.elevationLoading(false);
    }
  }

  async function handleMapClick(info, _baseCanvas, baseTransform) {
    const manifest = getManifest();
    if (!manifest || !info) return;

    setMarker(info.viewX ?? info.x, info.viewY ?? info.y);

    const resolved = resolveDemPixel(info, _baseCanvas, baseTransform, manifest);
    if (!resolved) return;

    await fetchValue(resolved.x, resolved.y, manifest);
  }

  function dispose() {
    clear();
  }

  return {
    clear,
    handleMapClick,
    dispose
  };
}
