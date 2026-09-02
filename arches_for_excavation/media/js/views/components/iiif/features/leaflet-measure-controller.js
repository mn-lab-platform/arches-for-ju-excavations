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
      if (!Number.isFinite(pt?.viewX) || !Number.isFinite(pt?.viewY)) {
        console.warn(LOG, 'Invalid marker coords:', pt);
        return;
      }

      try {
        const markerColor = idx === 0 ? 'rgb(101, 150, 222)' : 'rgb(67, 137, 201)';
        const marker = L.circleMarker([-pt.viewY, pt.viewX], {
          pane : 'iiif-tools-markers',
          radius: 6,
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.8,
          weight: 2
        }).addTo(map);
        markers.push(marker);
      } catch (e) {
        console.error(LOG, 'Failed to add marker:', e);
      }
    });

    if (pts.length === 2 && Number.isFinite(pts[0]?.viewX) && Number.isFinite(pts[0]?.viewY) && Number.isFinite(pts[1]?.viewX) && Number.isFinite(pts[1]?.viewY)) {
      try {
        line = L.polyline([[-pts[0].viewY, pts[0].viewX], [-pts[1].viewY, pts[1].viewX]], {
          pane : 'iiif-tools-line',
          color: 'rgb(87, 155, 215)',
          weight: 3
        }).addTo(map);

        // kropki nad linią
        markers.forEach((m) => {
          if (m && typeof m.bringToFront === 'function') m.bringToFront();
        });
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

    const viewX = Number.isFinite(Number(info.viewX)) ? Number(info.viewX) : Number(info.x);
    const viewY = Number.isFinite(Number(info.viewY)) ? Number(info.viewY) : Number(info.y);
    const imageX = Number.isFinite(Number(info.imageX))
      ? Number(info.imageX)
      : viewX * (2 ** Number(info.s || 0));
    const imageY = Number.isFinite(Number(info.imageY))
      ? Number(info.imageY)
      : viewY * (2 ** Number(info.s || 0));

    let X = viewX;
    let Y = viewY;

    if (tr && affineForward) {
      const projected = affineForward(tr, imageX, imageY);
      if (Array.isArray(projected) && projected.length === 2 && Number.isFinite(projected[0]) && Number.isFinite(projected[1])) {
        X = projected[0];
        Y = projected[1];
      }
    }

    const next = [...base, { viewX, viewY, imageX, imageY, X, Y }];
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
