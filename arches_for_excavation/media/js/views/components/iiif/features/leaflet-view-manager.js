// features/leaflet-view-manager.js

import { affineForward, affineInverse } from '../lib/affine-utils';
import { mdValue, parseTransformFromCanvas } from '../lib/iiif-manifest-utils';

export function getCanvasGeoref(canvas) {
  const transform = parseTransformFromCanvas(canvas);
  const epsgRaw = String(mdValue(canvas, 'epsg') || '')
    .trim()
    .replace(/^EPSG:/i, '');
  const epsg = /^\d+$/.test(epsgRaw) ? epsgRaw : null;
  const crsRaw = String(mdValue(canvas, 'crs') || '').trim();
  const crs = crsRaw && !/^(none|null)$/i.test(crsRaw)
    ? crsRaw.replace(/\s+/g, ' ')
    : null;

  if (!transform || !transform.every(Number.isFinite)) {
    return { reason: 'brak poprawnej transformacji' };
  }
  if (!epsg && !crs) return { reason: 'brak układu współrzędnych' };

  const [a, b, , d, e] = transform;
  const pixelSize = Math.sqrt(Math.abs(a * e - b * d));
  if (!(pixelSize > 0) || !Number.isFinite(pixelSize)) {
    return { reason: 'nieodwracalna transformacja' };
  }

  // has_georef=false oznacza tu brak EPSG; LOCAL_CS nadal ma użyteczną transformację.
  return { transform, epsg, crs, pixelSize };
}

export function createLeafletViewManager(opts = {}) {
  const getMap = opts.getMap || (() => null);
  const getLeaflet = opts.getLeaflet || (() => null);
  const getBaseCanvasId = opts.getBaseCanvasId || (() => null);
  const getCanvasRecord = opts.getCanvasRecord || (() => null);

  /**
   * getCanvasMaxZoom zostawiamy jako native max zoom.
   * Nie zmieniam nazwy, żeby nie rozwalać istniejących wywołań.
   */
  const getCanvasMaxZoom = opts.getCanvasMaxZoom || (() => null);

  /**
   * displayMaxZoom to max zoom UI.
   * Może być większy niż native max zoom DEM-a.
   */
  const getDisplayMaxZoom = opts.getDisplayMaxZoom || (() => null);

  const getViewportCenterInfo = opts.getViewportCenterInfo || (() => null);
  const dbg = opts.dbg || (() => {});

  let savedView = null;

  function clampNum(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function nextFrame() {
    return new Promise((r) => requestAnimationFrame(() => r()));
  }

  function saveView() {
    const map = getMap();
    if (!map) return;

    const baseId = getBaseCanvasId();
    const rec = baseId ? getCanvasRecord(baseId) : null;
    if (!rec) return;

    const w = Number(rec.w || 0);
    const h = Number(rec.h || 0);

    if (!(w > 1 && h > 1)) return;

    const nativeMaxZoom = getCanvasMaxZoom(baseId) ?? 0;

    const crs = map.options?.crs;
    if (!crs?.latLngToPoint) return;

    const viewportCenter = getViewportCenterInfo();
    const center = viewportCenter?.latlng || map.getCenter?.();

    if (!center) return;

    const pZero = viewportCenter
      ? {
          x: viewportCenter.imgX,
          y: viewportCenter.imgY
        }
      : crs.latLngToPoint(center, 0);

    if (
      !pZero ||
      !Number.isFinite(pZero.x) ||
      !Number.isFinite(pZero.y)
    ) {
      return;
    }

    /**
     * Full pixels liczymy po nativeMaxZoom,
     * bo to jest prawdziwa siatka pikseli danego canvasu.
     */
    const scale = Math.pow(2, nativeMaxZoom);

    const fullX = Number.isFinite(viewportCenter?.absX)
      ? viewportCenter.absX
      : pZero.x * scale;

    const fullY = Number.isFinite(viewportCenter?.absY)
      ? viewportCenter.absY
      : pZero.y * scale;

    if (!Number.isFinite(fullX) || !Number.isFinite(fullY)) {
      return;
    }

    // Względny środek służy jako fallback przy braku wspólnej georeferencji.
    const relX = fullX / w;
    const relY = fullY / h;

    const zoom = Number(map.getZoom?.() ?? 0);
    if (!Number.isFinite(zoom)) return;

    const georef = getCanvasGeoref(rec.canvas);
    const groundCenter = !georef.reason
      ? affineForward(georef.transform, fullX, fullY)
      : null;

    savedView = {
      relX,
      relY,
      zoom,
      refW: w,
      refH: h,
      refNativeMaxZoom: nativeMaxZoom,
      sourceLabel: rec.label || rec.id,
      georefReason: georef.reason || null,
      epsg: georef.epsg || null,
      crs: georef.crs || null,
      groundCenter,
      groundUnitsPerScreenPixel: !georef.reason
        ? georef.pixelSize * Math.pow(2, nativeMaxZoom - zoom)
        : null
    };
  }

  async function restoreView(rec) {
    if (!savedView || !rec) return false;

    const map = getMap();
    const L = getLeaflet();

    if (!map || !L) return false;

    const layer = rec._layer;

    try {
      if (layer?._infoPromise && typeof layer._infoPromise.then === 'function') {
        await layer._infoPromise;
      }
    } catch (_) {
      return false;
    }

    await nextFrame();

    const w = Number(rec.w || 0);
    const h = Number(rec.h || 0);

    if (!(w > 1 && h > 1)) return false;

    const crs = map.options?.crs;
    if (!crs?.pointToLatLng) return false;

    const nativeMaxZoom = getCanvasMaxZoom(rec.id) ?? 0;
    const displayMaxZoom = Number(getDisplayMaxZoom() ?? nativeMaxZoom ?? 0);

    // Bez wspólnej georeferencji zachowujemy względny środek i skalę obrazu.
    let newFullX = savedView.relX * w;
    let newFullY = savedView.relY * h;
    let targetZoom =
      savedView.zoom +
      nativeMaxZoom -
      savedView.refNativeMaxZoom +
      Math.log2(savedView.refW / w);

    const georef = getCanvasGeoref(rec.canvas);
    const sameCrs = !georef.reason && (
      (savedView.epsg && savedView.epsg === georef.epsg) ||
      (savedView.crs && savedView.crs === georef.crs)
    );
    let restoreMode = 'względny';
    let fallbackReason = savedView.georefReason || georef.reason || 'różne układy współrzędnych';

    if (
      sameCrs &&
      savedView.groundCenter?.length === 2 &&
      savedView.groundCenter.every(Number.isFinite) &&
      Number.isFinite(savedView.groundUnitsPerScreenPixel) &&
      savedView.groundUnitsPerScreenPixel > 0
    ) {
      const pixel = affineInverse(
        georef.transform,
        savedView.groundCenter[0],
        savedView.groundCenter[1]
      );

      if (pixel?.every(Number.isFinite)) {
        newFullX = pixel[0];
        newFullY = pixel[1];
        targetZoom = nativeMaxZoom + Math.log2(
          georef.pixelSize / savedView.groundUnitsPerScreenPixel
        );
        restoreMode = 'terenowy';
        fallbackReason = null;
      } else {
        fallbackReason = 'nie można odwrócić transformacji';
      }
    }

    if (!Number.isFinite(targetZoom)) return false;

    const originalTargetZoom = targetZoom;

    /**
     * Zoom może być ujemny, ale musi pozostać w zakresie mapy
     * i wspólnego maksymalnego zoomu UI.
     */
    const mapMinZoom = Number(map.getMinZoom?.());
    const mapMaxZoom = Number(map.getMaxZoom?.());
    const minZoom = Number.isFinite(mapMinZoom) ? mapMinZoom : -10;
    const maxZoom = Number.isFinite(mapMaxZoom)
      ? Math.min(mapMaxZoom, displayMaxZoom)
      : displayMaxZoom;

    targetZoom = clampNum(targetZoom, minZoom, maxZoom);

    const newImgX = newFullX / Math.pow(2, nativeMaxZoom);
    const newImgY = newFullY / Math.pow(2, nativeMaxZoom);

    const unscaledPt = L.point(newImgX, newImgY);
    const center = crs.pointToLatLng(unscaledPt, 0);

    const clampInfo = originalTargetZoom !== targetZoom
      ? ` (limit z ${originalTargetZoom.toFixed(3)})`
      : '';
    const reasonInfo = fallbackReason ? `, powód: ${fallbackReason}` : '';
    dbg(`Widok ${savedView.sourceLabel} → ${rec.label || rec.id}: ${restoreMode}${reasonInfo}, środek px=(${newFullX.toFixed(1)}, ${newFullY.toFixed(1)}), zoom=${savedView.zoom.toFixed(3)}→${targetZoom.toFixed(3)}${clampInfo}`);

    map.invalidateSize(false);
    map.setView(center, targetZoom, {
      animate: false
    });

    return true;
  }

  return {
    saveView,
    restoreView,
    hasSavedView: () => !!savedView,
    clear: () => {
      savedView = null;
    }
  };
}
