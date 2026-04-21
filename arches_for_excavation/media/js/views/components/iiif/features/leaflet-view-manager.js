export function createLeafletViewManager(opts = {}) {
  const getMap = opts.getMap || (() => null);
  const getLeaflet = opts.getLeaflet || (() => null);
  const getBaseCanvasId = opts.getBaseCanvasId || (() => null);
  const getCanvasRecord = opts.getCanvasRecord || (() => null);
  const getCanvasMaxZoom = opts.getCanvasMaxZoom || (() => null);
  const getViewportCenterInfo = opts.getViewportCenterInfo || (() => null);
  const dbg = opts.dbg || (() => {});
  let savedView = null;

  function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function nextFrame() { return new Promise((r) => requestAnimationFrame(() => r())); }

  function saveView() {
    const map = getMap();
    if (!map) return;

    const baseId = getBaseCanvasId();
    const rec = baseId ? getCanvasRecord(baseId) : null;
    if (!rec) return;

    const w = Number(rec.w || 0);
    const h = Number(rec.h || 0);
    if (!(w > 1 && h > 1)) return;

    const maxZ = getCanvasMaxZoom(baseId) ?? 0;
    const crs = map.options?.crs;
    if (!crs?.latLngToPoint) return;

    const viewportCenter = getViewportCenterInfo();
    const center = viewportCenter?.latlng || map.getCenter?.();
    if (!center) return;

    const pZero = viewportCenter
      ? { x: viewportCenter.imgX, y: viewportCenter.imgY }
      : crs.latLngToPoint(center, 0);
    if (!pZero || !Number.isFinite(pZero.x) || !Number.isFinite(pZero.y)) return;

    const scale = Math.pow(2, maxZ);
    const fullX = Number.isFinite(viewportCenter?.absX) ? viewportCenter.absX : pZero.x * scale;
    const fullY = Number.isFinite(viewportCenter?.absY) ? viewportCenter.absY : pZero.y * scale;
    if (!Number.isFinite(fullX) || !Number.isFinite(fullY)) return;

    const relX = fullX / w;
    const relY = fullY / h;
    const zoom = Number(map.getZoom?.() ?? 0);
    const relZ = zoom - maxZ;

    savedView = {
      relX,
      relY,
      relZ,
      refW: w,
      refH: h,
      refMaxZ: maxZ,
    };

    dbg('--- [SAVE VIEW] ---');
    dbg(`1. Canvas Dimensions: w=${w}, h=${h}, maxZoom=${maxZ}`);
    dbg(`2. Viewport Center (LatLng): ${center.toString()}`);
    dbg(`3. Full Pixels: fullX=${fullX.toFixed(2)}, fullY=${fullY.toFixed(2)}`);
    dbg(`4. Ratios: relX=${relX.toFixed(6)}, relY=${relY.toFixed(6)}`);
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

    const newMaxZ = getCanvasMaxZoom(rec.id) ?? 0;
    let targetZoom = savedView.relZ + newMaxZ;
    const originalTargetZoom = targetZoom;
    targetZoom = clampNum(targetZoom, 0, newMaxZ);

    const newFullX = savedView.relX * w;
    const newFullY = savedView.relY * h;
    const newImgX = newFullX / Math.pow(2, newMaxZ);
    const newImgY = newFullY / Math.pow(2, newMaxZ);
    const unscaledPt = L.point(newImgX, newImgY);
    const center = crs.pointToLatLng(unscaledPt, 0);

    dbg('--- [RESTORE VIEW] ---');
    dbg(`1. Target Canvas Dimensions: w=${w}, h=${h}, maxZoom=${newMaxZ}`);
    dbg(`2. Restoring Ratios: relX=${savedView.relX.toFixed(6)}, relY=${savedView.relY.toFixed(6)}`);
    dbg(`3. Target Full Pixels: fullX=${newFullX.toFixed(2)}, fullY=${newFullY.toFixed(2)}`);
    dbg(`4. Target Image Pixels (zoom 0): newImgX=${newImgX.toFixed(2)}, newImgY=${newImgY.toFixed(2)}`);
    if (originalTargetZoom !== targetZoom) {
      dbg(`5. Target Zoom clamped to ${targetZoom} to prevent Leaflet crash`);
    }
    dbg(`6. Final Map Center (LatLng): ${center.toString()}`);

    map.invalidateSize(false);
    map.setView(center, targetZoom, { animate: false });
    return true;
  }

  return {
    saveView,
    restoreView,
    hasSavedView: () => !!savedView,
    clear: () => { savedView = null; }
  };
}
