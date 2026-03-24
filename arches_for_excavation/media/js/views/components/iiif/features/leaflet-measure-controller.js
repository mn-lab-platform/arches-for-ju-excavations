// features/leaflet-measure-controller.js

const LOG = '[leaflet-measure-controller]';

export function createLeafletMeasureController(opts = {}) {
  const state = opts.state;
  const getMap = typeof opts.getMap === 'function' ? opts.getMap : () => null;
  const getLeaflet = typeof opts.getLeaflet === 'function' ? opts.getLeaflet : () => null;
  const affineForward = typeof opts.affineForward === 'function' ? opts.affineForward : null;

  if (!state) throw new Error('createLeafletMeasureController requires opts.state');

  let markers = [];
  let line = null;
  let pointsSub = null;

  function removeLayerSafe(map, layer) {
    if (!map || !layer) return;
    try { map.removeLayer(layer); } catch (_) {}
  }

  function clearRenderedArtifacts() {
    const map = getMap();
    if (Array.isArray(markers) && map) {
      markers.forEach((m) => removeLayerSafe(map, m));
    }
    markers = [];

    if (line && map) {
      removeLayerSafe(map, line);
    }
    line = null;
  }

  function renderPoints(pts) {
    const map = getMap();
    const L = getLeaflet();
    clearRenderedArtifacts();

    if (!map || !L || !Array.isArray(pts) || !pts.length) return;

    pts.forEach((pt, idx) => {
      if (!Number.isFinite(pt?.x) || !Number.isFinite(pt?.y)) {
        console.warn(LOG, 'Invalid marker coords:', pt);
        return;
      }

      try {
        const marker = L.circleMarker([-pt.y, pt.x], {
          pane : 'iiif-tools',
          radius: 6,
          color: idx === 0 ? 'blue' : 'red',
          fillColor: idx === 0 ? 'blue' : 'red',
          fillOpacity: 0.8,
          weight: 2
        }).addTo(map);
        markers.push(marker);
      } catch (e) {
        console.error(LOG, 'Failed to add marker:', e);
      }
    });

    if (pts.length === 2 && Number.isFinite(pts[0]?.x) && Number.isFinite(pts[0]?.y) && Number.isFinite(pts[1]?.x) && Number.isFinite(pts[1]?.y)) {
      try {
        line = L.polyline([[-pts[0].y, pts[0].x], [-pts[1].y, pts[1].x]], {
          pane : 'iiif-tools',
          color: 'red',
          weight: 3
        }).addTo(map);
      } catch (e) {
        console.error(LOG, 'Failed to draw line:', e);
      }
    }
  }

  function ensureSubscription() {
    if (pointsSub) return;
    pointsSub = state.leafletMeasurePoints.subscribe((pts) => {
      renderPoints(pts);
    });
  }

  function clear() {
    state.leafletMeasurePoints([]);
    state.leafletMeasureDistance('');
    clearRenderedArtifacts();
  }

  function handleMapClick(info, tr) {
    if (!info) return;

    const current = Array.isArray(state.leafletMeasurePoints()) ? state.leafletMeasurePoints() : [];
    const base = current.length >= 2 ? [] : current.slice();

    let X = Number(info.x);
    let Y = Number(info.y);

    if (tr && affineForward) {
      const projected = affineForward(tr, info.x, info.y, info.s);
      if (Array.isArray(projected) && projected.length === 2 && Number.isFinite(projected[0]) && Number.isFinite(projected[1])) {
        X = projected[0];
        Y = projected[1];
      }
    }

    const next = [...base, { x: Number(info.x), y: Number(info.y), X, Y }];
    state.leafletMeasurePoints(next);

    if (next.length === 2) {
      const [p1, p2] = next;
      const dx = Number(p2.X) - Number(p1.X);
      const dy = Number(p2.Y) - Number(p1.Y);
      const d = Math.sqrt(dx * dx + dy * dy);
      state.leafletMeasureDistance(Number.isFinite(d) ? `${d.toFixed(2)} meters` : '');
    } else {
      state.leafletMeasureDistance('');
    }
  }

  function refresh() {
    renderPoints(state.leafletMeasurePoints());
  }

  function dispose() {
    if (pointsSub) {
      try { pointsSub.dispose(); } catch (_) {}
      pointsSub = null;
    }
    clearRenderedArtifacts();
  }

  ensureSubscription();

  return {
    clear,
    handleMapClick,
    refresh,
    dispose
  };
}
