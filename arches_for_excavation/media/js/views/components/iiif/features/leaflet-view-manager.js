// features/leaflet-view-manager.js

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
    const displayMaxZoom = Number(getDisplayMaxZoom() ?? nativeMaxZoom ?? 0);

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

    /**
     * Pozycja jako relatywny punkt canvasu.
     * Działa dobrze, jeśli ortho i DEM mają ten sam extent.
     */
    const relX = fullX / w;
    const relY = fullY / h;

    const zoom = Number(map.getZoom?.() ?? 0);

    /**
     * Zoom widoku zapisujemy względem displayMaxZoom,
     * nie względem nativeMaxZoom konkretnego canvasu.
     *
     * Dzięki temu:
     * ortho native=5, DEM native=3, display=5
     * przełączenie ortho -> DEM nie zetnie zoomu do 3.
     */
    const relZ = zoom - displayMaxZoom;

    savedView = {
      relX,
      relY,
      relZ,
      refW: w,
      refH: h,
      refNativeMaxZoom: nativeMaxZoom,
      refDisplayMaxZoom: displayMaxZoom
    };

    dbg('--- [SAVE VIEW] ---');
    dbg(`1. Canvas Dimensions: w=${w}, h=${h}`);
    dbg(`2. nativeMaxZoom=${nativeMaxZoom}, displayMaxZoom=${displayMaxZoom}`);
    dbg(`3. Viewport Center LatLng: ${center.toString?.() || String(center)}`);
    dbg(`4. Full Pixels: fullX=${fullX.toFixed(2)}, fullY=${fullY.toFixed(2)}`);
    dbg(`5. Ratios: relX=${relX.toFixed(6)}, relY=${relY.toFixed(6)}`);
    dbg(`6. Map zoom=${zoom}, relZ=${relZ}`);
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

    /**
     * Target zoom liczymy po displayMaxZoom.
     * To jest główny fix.
     */
    let targetZoom = savedView.relZ + displayMaxZoom;
    const originalTargetZoom = targetZoom;

    /**
     * Clamp też do displayMaxZoom, a nie do nativeMaxZoom.
     * Inaczej DEM zetnie zoom.
     */
    targetZoom = clampNum(targetZoom, 0, displayMaxZoom);

    /**
     * Pozycję liczymy w pikselach aktualnego canvasu.
     * Tu nadal używamy nativeMaxZoom, bo to jest raster.
     */
    const newFullX = savedView.relX * w;
    const newFullY = savedView.relY * h;

    const newImgX = newFullX / Math.pow(2, nativeMaxZoom);
    const newImgY = newFullY / Math.pow(2, nativeMaxZoom);

    const unscaledPt = L.point(newImgX, newImgY);
    const center = crs.pointToLatLng(unscaledPt, 0);

    dbg('--- [RESTORE VIEW] ---');
    dbg(`1. Target Canvas Dimensions: w=${w}, h=${h}`);
    dbg(`2. nativeMaxZoom=${nativeMaxZoom}, displayMaxZoom=${displayMaxZoom}`);
    dbg(`3. Restoring Ratios: relX=${savedView.relX.toFixed(6)}, relY=${savedView.relY.toFixed(6)}`);
    dbg(`4. Target Full Pixels: fullX=${newFullX.toFixed(2)}, fullY=${newFullY.toFixed(2)}`);
    dbg(`5. Target Image Pixels zoom0: newImgX=${newImgX.toFixed(2)}, newImgY=${newImgY.toFixed(2)}`);

    if (originalTargetZoom !== targetZoom) {
      dbg(`6. Target Zoom clamped from ${originalTargetZoom} to ${targetZoom}`);
    } else {
      dbg(`6. Target Zoom=${targetZoom}`);
    }

    dbg(`7. Final Map Center LatLng: ${center.toString?.() || String(center)}`);

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