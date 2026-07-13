// views/components/iiif/map/measure-controller.js

const LOG = '[measure-controller]';

function haversineMeters(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371008.8;
  const lat1 = toRad(a[1]);
  const lon1 = toRad(a[0]);
  const lat2 = toRad(b[1]);
  const lon2 = toRad(b[0]);
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

function polylineLengthMeters(coords) {
  if (!Array.isArray(coords) || coords.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < coords.length; i++) total += haversineMeters(coords[i - 1], coords[i]);
  return total;
}

function formatDistance(meters) {
  if (!Number.isFinite(meters) || meters <= 0) return '';
  if (meters < 1000) return `${meters.toFixed(2)} m`;
  return `${(meters / 1000).toFixed(5)} km`;
}

function formatLonLat(lon, lat, digits = 6) {
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return '';
  return `${lon.toFixed(digits)}, ${lat.toFixed(digits)}`;
}

export function createMeasureController(opts = {}) {
  const setDistance = typeof opts.setDistance === 'function' ? opts.setDistance : () => {};
  const setCoords = typeof opts.setCoords === 'function' ? opts.setCoords : () => {};
  const pointColor = opts.pointColor || 'rgb(67, 137, 201)';
  const lineColor = opts.lineColor || 'rgb(67, 137, 201)';

  const MEASURE_SOURCE_ID = 'iiif-measure-source';
  const MEASURE_POINTS_LAYER_ID = 'iiif-measure-points';
  const MEASURE_LINES_LAYER_ID = 'iiif-measure-lines';

  let map = null;
  let enabled = false;

  let pointSeq = 1;
  let geojson = { type: 'FeatureCollection', features: [] };

  function getMeasurePoints() {
    return geojson.features.filter(f => f?.geometry?.type === 'Point');
  }

  function rebuildFeatures(pointsOnly) {
    const points = pointsOnly.slice();
    const features = points.slice();

    if (points.length > 1) {
      features.push({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: points.map(p => p.geometry.coordinates)
        },
        properties: {}
      });
    }

    geojson = { type: 'FeatureCollection', features };
  }

  function syncSourceAndDistance() {
    if (!map) return;

    const src = map.getSource(MEASURE_SOURCE_ID);
    if (src && typeof src.setData === 'function') src.setData(geojson);

    const coords = getMeasurePoints().map(p => p.geometry.coordinates);
    setDistance(formatDistance(polylineLengthMeters(coords)));
  }

  function bringToFront() {
    if (!map) return;
    try {
      if (map.getLayer(MEASURE_LINES_LAYER_ID)) map.moveLayer(MEASURE_LINES_LAYER_ID);
      if (map.getLayer(MEASURE_POINTS_LAYER_ID)) map.moveLayer(MEASURE_POINTS_LAYER_ID);
    } catch (e) {}
  }

  function ensureLayers() {
    if (!map) return;

    if (!map.getSource(MEASURE_SOURCE_ID)) {
      map.addSource(MEASURE_SOURCE_ID, { type: 'geojson', data: geojson });
    }

    if (!map.getLayer(MEASURE_POINTS_LAYER_ID)) {
      map.addLayer({
        id: MEASURE_POINTS_LAYER_ID,
        type: 'circle',
        source: MEASURE_SOURCE_ID,
        paint: {
          'circle-radius': 5,
          'circle-color': pointColor
        },
        filter: ['in', '$type', 'Point'],
        layout: { visibility: 'none' }
      });
    }

    if (!map.getLayer(MEASURE_LINES_LAYER_ID)) {
      map.addLayer({
        id: MEASURE_LINES_LAYER_ID,
        type: 'line',
        source: MEASURE_SOURCE_ID,
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
          visibility: 'none'
        },
        paint: {
          'line-color': lineColor,
          'line-width': 2.5
        },
        filter: ['in', '$type', 'LineString']
      });
    }

    bringToFront();
  }

  function setVisibility(isVisible) {
    if (!map) return;
    const v = isVisible ? 'visible' : 'none';
    try { if (map.getLayer(MEASURE_POINTS_LAYER_ID)) map.setLayoutProperty(MEASURE_POINTS_LAYER_ID, 'visibility', v); } catch (e) {}
    try { if (map.getLayer(MEASURE_LINES_LAYER_ID)) map.setLayoutProperty(MEASURE_LINES_LAYER_ID, 'visibility', v); } catch (e) {}
  }

  function clear() {
    pointSeq = 1;
    geojson = { type: 'FeatureCollection', features: [] };
    setDistance('');
    syncSourceAndDistance();
  }

  function onClick(e) {
    if (!enabled || !map) return;

    // zawsze ustaw współrzędne kliknięcia (nawet jak trafisz w punkt)
    setCoords(formatLonLat(e.lngLat.lng, e.lngLat.lat));

    let points = getMeasurePoints();

    let hit = null;
    try {
      const hits = map.queryRenderedFeatures(e.point, { layers: [MEASURE_POINTS_LAYER_ID] });
      hit = hits && hits.length ? hits[0] : null;
    } catch (err) {
      hit = null;
    }

    if (hit?.properties?.id != null) {
      const id = String(hit.properties.id);
      points = points.filter(p => String(p?.properties?.id) !== id);
    } else {
      points.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [e.lngLat.lng, e.lngLat.lat]
        },
        properties: { id: String(pointSeq++) }
      });
    }

    rebuildFeatures(points);
    syncSourceAndDistance();
  }

  function onMouseMove(e) {
    if (!map) return;
    const canvas = map.getCanvas();
    if (!canvas) return;

    if (!enabled) {
      canvas.style.cursor = '';
      return;
    }

    try {
      const hits = map.queryRenderedFeatures(e.point, { layers: [MEASURE_POINTS_LAYER_ID] });
      canvas.style.cursor = (hits && hits.length) ? 'pointer' : 'crosshair';
    } catch (err) {
      canvas.style.cursor = 'crosshair';
    }
  }

  function setEnabled(next) {
    enabled = !!next;
    if (!map) return;

    setVisibility(enabled);
    bringToFront();

    const canvas = map.getCanvas();
    if (canvas) canvas.style.cursor = enabled ? 'crosshair' : '';
    if (!enabled) clear();
  }

  function install(m) {
    map = m;
    ensureLayers();
    setVisibility(false);
    console.log(LOG, 'installed');
  }

  function formatCoords(lngLat) {
    if (!lngLat) return '';
    return formatLonLat(lngLat.lng, lngLat.lat);
  }

  return {
    install,
    setEnabled,
    clear,
    onClick,
    onMouseMove,
    formatCoords
  };
}
