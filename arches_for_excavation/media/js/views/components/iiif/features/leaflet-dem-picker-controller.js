const LOG = '[leaflet-dem-picker-controller]';

export function createLeafletDemPickerController(opts = {}) {
  const state = opts.state;
  const getMap = typeof opts.getMap === 'function' ? opts.getMap : () => null;
  const getLeaflet = typeof opts.getLeaflet === 'function' ? opts.getLeaflet : () => null;
  const getManifest = typeof opts.getManifest === 'function' ? opts.getManifest : () => null;
  const getImageGroup = typeof opts.getImageGroup === 'function' ? opts.getImageGroup : () => 'ortho';
  const parseTransformFromCanvas = typeof opts.parseTransformFromCanvas === 'function' ? opts.parseTransformFromCanvas : null;
  const pickDemCanvasFromManifest = typeof opts.pickDemCanvasFromManifest === 'function' ? opts.pickDemCanvasFromManifest : null;
  const affineForward = typeof opts.affineForward === 'function' ? opts.affineForward : null;
  const affineInverse = typeof opts.affineInverse === 'function' ? opts.affineInverse : null;
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

  function setMarker(x, y) {
    const map = getMap();
    const L = getLeaflet();
    if (!map || !L) return;

    if (marker) removeLayerSafe(map, marker);
    marker = L.circleMarker([-y, x], {
        pane : 'iiif-tools',
        radius: 6,
        color: '#e91e63',
        fillColor: '#e91e63',
        fillOpacity: 0.9,
        weight: 2
    }).addTo(map);
  }

  function resolveDemPixel(info, baseCanvas, baseTransform, manifest) {
    const demCanvas = pickDemCanvasFromManifest(manifest);
    if (!demCanvas) {
      state.elevationError('Brak canvas DEM.');
      return null;
    }

    if (getImageGroup() === 'dem') {
      const s = Number.isFinite(info?.s) ? info.s : 0;
      return {
        demCanvas,
        x: Math.round(Number(info.x) * (2 ** s)),
        y: Math.round(Number(info.y) * (2 ** s))
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

    const local = affineForward(baseTransform, info.x, info.y, info.s || 0);
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
      x: Math.round(inv[0]),
      y: Math.round(inv[1])
    };
  }

  async function fetchValue(x, y, manifest) {
    try {
      state.elevationLoading(true);
      state.elevationError('');
      const resp = await fetch(endpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manifest, x, y })
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json?.error || 'HTTP ' + resp.status);
      state.elevationValue(`${json.value} m`);
    } catch (err) {
      console.warn(LOG, 'DEM pixel error:', err);
      state.elevationError('DEM pixel error: ' + String(err?.message || err));
    } finally {
      state.elevationLoading(false);
    }
  }

  async function handleMapClick(info, baseCanvas, baseTransform) {
    const manifest = getManifest();
    if (!manifest || !info) return;

    setMarker(info.x, info.y);

    const resolved = resolveDemPixel(info, baseCanvas, baseTransform, manifest);
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
