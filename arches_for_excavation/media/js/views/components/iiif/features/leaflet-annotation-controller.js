const LOG = '[leaflet-annotation-controller]';

export function createLeafletAnnotationController(opts = {}) {
  const state = opts.state;
  const getMap = typeof opts.getMap === 'function' ? opts.getMap : () => null;
  const getLeaflet = typeof opts.getLeaflet === 'function' ? opts.getLeaflet : () => null;
  const getManifest = typeof opts.getManifest === 'function' ? opts.getManifest : () => null;
  const getBaseCanvasId = typeof opts.getBaseCanvasId === 'function' ? opts.getBaseCanvasId : () => null;
  const getExistingAnnotations = typeof opts.getExistingAnnotations === 'function' ? opts.getExistingAnnotations : () => [];
  const onAnnotationCreated = typeof opts.onAnnotationCreated === 'function' ? opts.onAnnotationCreated : null;
  const onAnnotationDeleted = typeof opts.onAnnotationDeleted === 'function' ? opts.onAnnotationDeleted : null;
  const parseTransformFromCanvas = typeof opts.parseTransformFromCanvas === 'function' ? opts.parseTransformFromCanvas : null;
  const affineForward = typeof opts.affineForward === 'function' ? opts.affineForward : null;
  const affineInverse = typeof opts.affineInverse === 'function' ? opts.affineInverse : null;
  const clamp = typeof opts.clamp === 'function' ? opts.clamp : ((v) => v);
  const mdValue = typeof opts.mdValue === 'function' ? opts.mdValue : (() => null);
  const getCanvasMaxZoom = typeof opts.getCanvasMaxZoom === 'function' ? opts.getCanvasMaxZoom : () => null;

  if (!state) throw new Error('createLeafletAnnotationController requires opts.state');

  let layerGroup = null;
  let draftLine = null;
  let draftMarkers = [];
  let draftPoints = [];
  let createdAnnotations = [];
  let dblHooked = false;

  let draftSourceCanvasId = null;
  let draftSourceScale = null;

  const DEBUG_AFFINE = false;

  function dbg(...args) {
    if (!DEBUG_AFFINE) return;
    console.log(LOG, ...args);
  }

  function getMapSafe() {
    return getMap() || null;
  }

  function getLeafletSafe() {
    return getLeaflet() || null;
  }

  function ensureLayer() {
    const L = getLeafletSafe();
    const map = getMapSafe();
    if (!L || !map) return null;

    if (!map.getPane('iiif-anno')) {
      map.createPane('iiif-anno');
      map.getPane('iiif-anno').style.zIndex = 650;
    }

    if (!layerGroup) {
      layerGroup = L.layerGroup([], { pane: 'iiif-anno' }).addTo(map);
    }

    return layerGroup;
  }
  function annotationColorFromAnno(anno, fallback = '#64ff64') {
    if (anno && typeof anno.color === 'string' && anno.color.trim()) return anno.color.trim();

    const b = anno?.body;
    if (Array.isArray(b)) {
      const c = b.find(x => x && typeof x === 'object' && x.purpose === 'color' && typeof x.value === 'string' && x.value.trim());
      if (c) return c.value.trim();
    } else if (b && typeof b === 'object' && b.purpose === 'color' && typeof b.value === 'string' && b.value.trim()) {
      return b.value.trim();
    }

    return fallback;
  }
  function removeLayerSafe(map, layer) {
    if (!map || !layer) return;
    try { map.removeLayer(layer); } catch (_) {}
  }

  function pointsToLatLng(points) {
    return (Array.isArray(points) ? points : []).map((p) => [p.y, p.x]);
  }

  function clearDraft() {
    const map = getMapSafe();

    if (draftLine && map) removeLayerSafe(map, draftLine);
    draftLine = null;

    if (Array.isArray(draftMarkers) && map) {
      draftMarkers.forEach((m) => removeLayerSafe(map, m));
    }

    draftMarkers = [];
    draftPoints = [];
    draftSourceCanvasId = null;
    draftSourceScale = null;

    if (state.annotationCanFinish) state.annotationCanFinish(false);
  }

  function resetAnnotations() {
    clearDraft();
    createdAnnotations = [];
    refresh();
    if (state.annotationStatus) state.annotationStatus('Annotation reset.');
  }

  function clearLayer() {
    if (layerGroup) {
      try { layerGroup.clearLayers(); } catch (_) {}
    }
  }

  function svgSelectorFromPoints(points, w, h) {
    const pts = points.map((p) => `${p.x},${p.y}`).join(' ');
    const vw = Number.isFinite(w) ? w : 1;
    const vh = Number.isFinite(h) ? h : 1;

    return {
      type: 'SvgSelector',
      value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}"><polygon points="${pts}"/></svg>`
    };
  }

  function geojsonPolygonFromPoints(points) {
    if (!Array.isArray(points) || points.length < 3) return null;

    const ring = points.map((p) => [p.x, p.y]);
    ring.push([points[0].x, points[0].y]);

    return {
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [ring] },
      properties: {}
    };
  }

  function geojsonPolygonLocal(points, canvas, sourceScale) {
    if (!parseTransformFromCanvas || !affineForward) return null;

    const tr = parseTransformFromCanvas(canvas);
    if (!tr) return null;

    const z = Number.isFinite(Number(sourceScale)) ? Number(sourceScale) : 0;

    const ring = points.map((p) => {
      const XY = affineForward(tr, p.x, p.y, z);
      return [XY[0], XY[1]];
    });
    ring.push(ring[0]);

    return {
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [ring] },
      properties: {
        crs: 'LOCAL',
        baseCanvasId: canvas?.id || canvas?.['@id'] || null,
        sourceScale: z
      }
    };
  }

  function parseSvgPoints(svgValue) {
    if (!svgValue || typeof svgValue !== 'string') return null;

    const m = svgValue.match(/points\s*=\s*"([^"]+)"/i);
    if (!m) return null;

    const raw = m[1].trim();
    if (!raw) return null;

    const pairs = raw.split(/\s+/).map((tok) => tok.split(',').map(Number));
    const pts = pairs
      .filter((a) => a.length === 2 && Number.isFinite(a[0]) && Number.isFinite(a[1]))
      .map((a) => ({ x: a[0], y: a[1] }));

    return pts.length ? pts : null;
  }

  function xywhToRectPoints(xywh) {
    if (!xywh || typeof xywh !== 'string') return null;

    const m = xywh.match(/xywh\s*=\s*([0-9.+-]+),([0-9.+-]+),([0-9.+-]+),([0-9.+-]+)/i);
    if (!m) return null;

    const x = Number(m[1]);
    const y = Number(m[2]);
    const w = Number(m[3]);
    const h = Number(m[4]);

    if (![x, y, w, h].every(Number.isFinite)) return null;

    return [
      { x, y },
      { x: x + w, y },
      { x: x + w, y: y + h },
      { x, y: y + h }
    ];
  }

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function firstText(v) {
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (Array.isArray(v)) {
      for (const x of v) {
        if (typeof x === 'string' && x.trim()) return x.trim();
      }
    }
    return '';
  }

  function annotationTitle(anno, idx) {
    const label = anno?.label;

    // IIIF v3 language map: { none: ["..."] } / { pl: ["..."] } / etc.
    if (label && typeof label === 'object' && !Array.isArray(label)) {
      const preferred = ['none', 'pl', 'en'];
      for (const k of preferred) {
        const t = firstText(label[k]);
        if (t) return t;
      }
      for (const k of Object.keys(label)) {
        const t = firstText(label[k]);
        if (t) return t;
      }
    }

    // legacy string label
    if (typeof label === 'string' && label.trim()) return label.trim();

    // fallback: body purpose=tagging
    const b = anno?.body;
    if (Array.isArray(b)) {
      const tag = b.find(x => x && typeof x === 'object' && x.purpose === 'tagging' && typeof x.value === 'string' && x.value.trim());
      if (tag) return tag.value.trim();
    } else if (b && typeof b === 'object' && b.purpose === 'tagging' && typeof b.value === 'string' && b.value.trim()) {
      return b.value.trim();
    }

    return `Adnotacja #${idx + 1}`;
  }

  function annotationTextFromBody(anno) {
    const b = anno?.body;

    if (Array.isArray(b)) {
      const vals = b
        .filter((x) => x && typeof x === 'object' && !['tagging', 'color', 'resource-id', 'arch-resource-id', 'linked-resource-id', 'target-resource-id'].includes(x.purpose))
        .map((x) => x.value || x.chars || '')
        .filter((v) => typeof v === 'string' && v.trim());

      if (vals.length) return vals.join('\n');
      return '';
    }

    if (b && typeof b === 'object') {
      if (b.purpose === 'tagging') return ''; // <- nie pokazuj tytułu jako opis
      if (typeof b.value === 'string' && b.value.trim()) return b.value;
      if (typeof b.chars === 'string' && b.chars.trim()) return b.chars;
    }

    return '';
  }

  function annotationPopupHtml(anno, idx) {
    const title = annotationTitle(anno, idx);
    const txt = annotationTextFromBody(anno) || '(brak treści)';
  return `
    <div style="min-width:180px;max-width:320px;font-size:14px;line-height:1.45;">
      <div style="font-weight:600;font-size:16px;margin-bottom:6px;">${escapeHtml(title)}</div>
      <div style="white-space:pre-wrap;word-break:break-word;font-size:14px;">${escapeHtml(txt)}</div>
      ${onAnnotationDeleted ? '<div style="margin-top:8px;color:#666;font-size:12px;">Shift+Click = usuń</div>' : ''}
    </div>
  `;
  }

  function annotationTextFromBody(anno) {
    const b = anno?.body;

    if (Array.isArray(b)) {
      const vals = b
        .filter((x) => x && typeof x === 'object' && !['tagging', 'color', 'resource-id', 'arch-resource-id', 'linked-resource-id', 'target-resource-id'].includes(x.purpose))
        .map((x) => x.value || x.chars || '')
        .filter((v) => typeof v === 'string' && v.trim());

      if (vals.length) return vals.join('\n');
      return '';
    }

    if (b && typeof b === 'object') {
      if (['tagging', 'color', 'resource-id', 'arch-resource-id', 'linked-resource-id', 'target-resource-id'].includes(b.purpose)) return '';
      if (typeof b.value === 'string' && b.value.trim()) return b.value;
      if (typeof b.chars === 'string' && b.chars.trim()) return b.chars;
    }

    return '';
  }

  function annotationLinkedResources(anno) {
    const linkedResources = Array.isArray(anno?.linkedResources) ? anno.linkedResources.slice() : [];
    const linkedResourceIds = Array.isArray(anno?.linkedResourceIds) ? anno.linkedResourceIds.slice() : [];
    const body = anno?.body;

    const addLinkedResourceId = (value) => {
      const normalized = String(value || '').trim();
      if (!normalized) return;
      linkedResourceIds.push(normalized);
    };

    if (anno?.targetResourceId) addLinkedResourceId(anno.targetResourceId);

    if (Array.isArray(body)) {
      body.forEach((item) => {
        if (!item || typeof item !== 'object') return;
        if (item.purpose === 'linked-resource-id' || item.purpose === 'target-resource-id') {
          addLinkedResourceId(item.value);
        }
      });
    } else if (body && typeof body === 'object') {
      if (body.purpose === 'linked-resource-id' || body.purpose === 'target-resource-id') {
        addLinkedResourceId(body.value);
      }
    }

    const fallbackLinkedResources = linkedResourceIds.map((id) => ({
      id,
      name: id,
      reportUrl: `/resources/${encodeURIComponent(id)}`
    }));

    return linkedResources
      .concat(fallbackLinkedResources)
      .map((resource) => {
        if (!resource || typeof resource !== 'object') return null;

        const id = resource.id || resource.resourceId || resource.resourceinstanceid || null;
        if (!id) return null;

        return {
          id,
          name: resource.name || resource.displayname || id,
          reportUrl: resource.reportUrl || `/resources/${encodeURIComponent(id)}`
        };
      })
      .filter(Boolean)
      .filter((resource, index, arr) => arr.findIndex((candidate) => candidate.id === resource.id) === index);
  }

  function annotationPopupHtml(anno, idx) {
    const title = annotationTitle(anno, idx);
    const txt = annotationTextFromBody(anno) || '(brak treści)';
    const linkedResources = annotationLinkedResources(anno);
    const linkedResourcesHtml = linkedResources.length
      ? `
      <div style="margin-top:10px;padding-top:8px;border-top:1px solid #e5e5e5;">
        <div style="font-weight:600;font-size:12px;color:#555;margin-bottom:4px;">Powiązany resource</div>
        ${linkedResources.map((resource) => `
          <div>
            <a href="${escapeHtml(resource.reportUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(resource.name)}</a>
          </div>
        `).join('')}
      </div>`
      : '';

    return `
    <div style="min-width:180px;max-width:320px;font-size:14px;line-height:1.45;">
      <div style="font-weight:600;font-size:16px;margin-bottom:6px;">${escapeHtml(title)}</div>
      <div style="white-space:pre-wrap;word-break:break-word;font-size:14px;">${escapeHtml(txt)}</div>
      ${linkedResourcesHtml}
      ${onAnnotationDeleted ? '<div style="margin-top:8px;color:#666;font-size:12px;">Shift+Click = usuń</div>' : ''}
    </div>
  `;
  }

  function drawAnnotationPolygon(points, opts = {}) {
    const L = getLeafletSafe();
    const map = getMapSafe();
    if (!L || !map || !Array.isArray(points) || !points.length) return null;

    ensureLayer();

    const fillColor = opts.color || '#64ff64';

    const poly = L.polygon(pointsToLatLng(points), {
      pane: 'iiif-anno',
      weight: 2,
      fillOpacity: 0.2,
      color: fillColor,
      fillColor: fillColor
    });

    if (opts.popupHtml) {
      poly.bindPopup(opts.popupHtml, { maxWidth: 340 });
    }

    if (opts.onClick) {
      poly.on('click', opts.onClick);
    }

    layerGroup.addLayer(poly);
    return poly;
  }

  function getBaseCanvas(manifest) {
    const baseId = getBaseCanvasId();
    const items = Array.isArray(manifest?.items) ? manifest.items : [];
    return items.find((c) => (c.id || c['@id']) === baseId) || null;
  }

  function canvasIdForAnno(anno) {
    const t = anno?.target;
    if (typeof t === 'string') return t;
    if (typeof t === 'object' && t) return t.source || t.id || null;
    return anno?.canvasId || null;
  }

  function findCanvasById(manifest, id) {
    if (!id) return null;
    const items = Array.isArray(manifest?.items) ? manifest.items : [];
    return items.find((c) => (c.id || c['@id']) === id) || null;
  }

  function resolveCanvasScale(canvasId, fallbackCanvas) {
    const rawFromViewer = getCanvasMaxZoom(canvasId);
    const fromViewer = Number(rawFromViewer);

    // UWAGA: null/undefined z viewer-a NIE może zostać 0
    if (rawFromViewer !== null && rawFromViewer !== undefined && Number.isFinite(fromViewer)) {
      return fromViewer;
    }

    const canvas = fallbackCanvas || findCanvasById(getManifest(), canvasId);
    if (!canvas) return 0;

    const w = Number(mdValue(canvas, 'width') || canvas?.width || 0);
    const h = Number(mdValue(canvas, 'height') || canvas?.height || 0);
    const maxDim = Math.max(w, h);

    if (!(maxDim > 1)) return 0;

    return Math.max(0, Math.ceil(Math.log2(maxDim / 256)));
  }

  function projectPointsToBaseCanvas(points, sourceCanvasId, baseCanvasId, manifest, sourceScale = null) {
    if (!Array.isArray(points) || points.length < 3) return null;
    if (!sourceCanvasId || !baseCanvasId) return null;
    if (!parseTransformFromCanvas || !affineForward || !affineInverse) return null;

    const srcCanvas = findCanvasById(manifest, sourceCanvasId);
    const dstCanvas = findCanvasById(manifest, baseCanvasId);
    if (!srcCanvas || !dstCanvas) return null;

    if (sourceCanvasId === baseCanvasId) {
      dbg('[anno:project] same canvas, no reprojection', {
        sourceCanvasId,
        baseCanvasId
      });
      return points;
    }

    const srcTr = parseTransformFromCanvas(srcCanvas);
    const dstTr = parseTransformFromCanvas(dstCanvas);
    if (!srcTr || !dstTr) return null;

    const dstW = Number(mdValue(dstCanvas, 'width') || dstCanvas?.width || 0);
    const dstH = Number(mdValue(dstCanvas, 'height') || dstCanvas?.height || 0);

    const parsedSourceScale = Number(sourceScale);
    const hasExplicitSourceScale =
      sourceScale !== null &&
      sourceScale !== undefined &&
      sourceScale !== '' &&
      Number.isFinite(parsedSourceScale);

    const srcZ = hasExplicitSourceScale
      ? parsedSourceScale
      : resolveCanvasScale(sourceCanvasId, srcCanvas);

    const dstZ = resolveCanvasScale(baseCanvasId, dstCanvas);
    const dstDiv = 2 ** dstZ;

    dbg('[anno:project] using scales', {
      sourceCanvasId,
      baseCanvasId,
      sourceScale,
      hasExplicitSourceScale,
      srcZ,
      dstZ
    });
    const out = [];
    for (const [i, p] of points.entries()) {
      const x = Number(p?.x);
      const y = Number(p?.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

      // 1) SOURCE pixel -> LOCAL XY
      const localXY = affineForward(srcTr, x, -y, srcZ);
      if (!Array.isArray(localXY) || localXY.length !== 2) return null;

      // 2) LOCAL XY -> DEST pixel (raw, full-res)
      const inv = affineInverse(dstTr, localXY[0], localXY[1]);
      if (!inv) return null;

      const rawPx = Number(inv[0]);
      const rawPy = Number(inv[1]);

      // 3) Full-res -> displayed zoom-0 units
      let px = rawPx / dstDiv;
      let py = -rawPy / dstDiv;
      //console.log(LOG, 'Raw projected pixel:', { rawPx, rawPy, dstDiv, px, py });
      if (dstW > 1 && dstH > 1) {
        px = clamp(px, 0, dstW - 1);
        py = clamp(py, -(dstH - 1), 0);
      }
      //console.log(LOG, 'Clamped projected pixel:', { px, py });
      const backLocal = affineForward(dstTr, px, py, 0);
      const errX = Array.isArray(backLocal) ? (backLocal[0] - localXY[0]) : null;
      const errY = Array.isArray(backLocal) ? (backLocal[1] - localXY[1]) : null;

      out.push({ x: px, y: py });

      dbg('[anno:project] POINT', {
        i,
        sourcePixelInput: { x, y, sourceScale: srcZ },
        localXY: { X: localXY[0], Y: localXY[1] },
        destPixelRaw: { x: rawPx, y: rawPy },
        destPixelClamped: { x: px, y: py },
        reverseCheck: {
          localFromDest: backLocal ? { X: backLocal[0], Y: backLocal[1] } : null,
          error: { dX: errX, dY: errY }
        }
      });
    }

    dbg('[anno:project] END', { outputPoints: out });
    return out;
  }

  function extractSelectorPoints(anno) {
    const target = anno?.target;
    let selector = null;

    if (typeof target === 'object' && target) selector = target.selector;
    if (!selector && anno?.selector) selector = anno.selector;

    if (selector && selector.type === 'SvgSelector') return parseSvgPoints(selector.value);
    if (selector && selector.type === 'FragmentSelector') return xywhToRectPoints(selector.value);

    return null;
  }

  function updateDraftGeometry() {
    const L = getLeafletSafe();
    const map = getMapSafe();
    if (!L || !map) return;

    ensureLayer();

    const latlngs = pointsToLatLng(draftPoints);

    if (draftLine) {
      try { draftLine.setLatLngs(latlngs); } catch (_) {}
    } else {
      draftLine = L.polyline(latlngs, { pane: 'iiif-anno', weight: 2 }).addTo(map);
    }
  }

  function addDraftPoint(fullX, fullY) {
    const L = getLeafletSafe();
    const map = getMapSafe();
    if (!L || !map) return;

    draftPoints.push({ x: fullX, y: fullY });

    const marker = L.circleMarker([fullY, fullX], {
      pane: 'iiif-anno',
      radius: 4,
      weight: 2,
      fillOpacity: 1
    }).addTo(map);

    draftMarkers.push(marker);

    if (state.annotationCanFinish) state.annotationCanFinish(draftPoints.length >= 3);
    updateDraftGeometry();
  }

  function handleMapClick(info) {
    if (!info) return;

    if (!draftSourceCanvasId) {
      draftSourceCanvasId = info.baseCanvasId || null;
    }

    if (!Number.isFinite(Number(draftSourceScale))) {
      draftSourceScale = Number.isFinite(Number(info.s)) ? Number(info.s) : null;
    }

    addDraftPoint(info.x, -info.y);
    state.annotationStatus(`Annotation mode: ${draftPoints.length} point(s). Double-click Finish or use Finish button.`);
  }

  function finishDraft() {
    const manifest = getManifest();
    if (!manifest) return;

    const canvas = getBaseCanvas(manifest);
    if (!canvas) return;

    if (!Array.isArray(draftPoints) || draftPoints.length < 3) {
      state.annotationStatus('Need at least 3 points for a polygon.');
      return;
    }

    const canvasId = draftSourceCanvasId || canvas.id || canvas['@id'] || null;
    const sourceScale = Number.isFinite(Number(draftSourceScale))
      ? Number(draftSourceScale)
      : resolveCanvasScale(canvasId, canvas);

    const points = draftPoints.slice();
    drawAnnotationPolygon(points);

    const selector = svgSelectorFromPoints(points, canvas.width, canvas.height);
    const pixelGeom = geojsonPolygonFromPoints(points);
    const localGeom = geojsonPolygonLocal(points, canvas, sourceScale);

    const color = state.annotationColor ? state.annotationColor() : '#64ff64';

    const payload = {
      id: `anno-${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
      type: 'Polygon',
      canvasId,
      sourceScale,
      selector,
      geometry: pixelGeom,
      localGeometry: localGeom,
      created: new Date().toISOString(),
      color,
      body: {
        type: 'TextualBody',
        purpose: 'commenting',
        value: ''
      }
    };

    createdAnnotations.push(payload);

    if (onAnnotationCreated) {
      try { onAnnotationCreated(payload); } catch (e) { console.error(LOG, e); }
    }

    clearDraft();
    state.annotationStatus('Annotation created.');
    refresh();
  }

  function refresh() {
    const map = getMapSafe();
    const manifest = getManifest();
    if (!map || !manifest) return;

    ensureLayer();
    clearLayer();

    const baseId = getBaseCanvasId();
    const existing = getExistingAnnotations() || [];

    dbg('[anno:refresh] begin', {
      baseCanvasId: baseId,
      existingCount: existing.length
    });

    existing.forEach((anno, idx) => {
      const sourceCanvasId = canvasIdForAnno(anno);
      const rawPts = extractSelectorPoints(anno);
      if (!rawPts || rawPts.length < 3) return;

      const rawSourceScale = anno?.sourceScale ?? anno?.scaleLevel ?? anno?.maxZoomAtCreation ?? null;

      const pts = projectPointsToBaseCanvas(
        rawPts,
        sourceCanvasId,
        baseId,
        manifest,
        rawSourceScale
      );
      if (!pts || pts.length < 3) return;

      drawAnnotationPolygon(pts, {
        popupHtml: annotationPopupHtml(anno, idx),
        color: annotationColorFromAnno(anno),
        onClick: (e) => {
          if (!onAnnotationDeleted) return;
          const shift = !!e?.originalEvent?.shiftKey;
          if (!shift) return;
          const ok = window.confirm('Delete this annotation?');
          if (!ok) return;
          try { onAnnotationDeleted(anno); } catch (err) { console.error(LOG, err); }
        }
      });
    });

    createdAnnotations.forEach((anno, idx) => {
      const sourceCanvasId = anno.canvasId;
      const rawPts = anno?.selector?.type === 'SvgSelector' ? parseSvgPoints(anno.selector.value) : null;
      if (!rawPts || rawPts.length < 3) return;

      const rawSourceScale = anno?.sourceScale ?? anno?.scaleLevel ?? anno?.maxZoomAtCreation ?? null;

      const pts = projectPointsToBaseCanvas(
        rawPts,
        sourceCanvasId,
        baseId,
        manifest,
        rawSourceScale
      );
      if (!pts || pts.length < 3) return;

      drawAnnotationPolygon(pts, {
        popupHtml: annotationPopupHtml(anno, idx),
        color: annotationColorFromAnno(anno)
      });
    });

    if (draftPoints.length) {
      draftMarkers.forEach((m) => {
        try { layerGroup.addLayer(m); } catch (_) {}
      });
      if (draftLine) {
        try { layerGroup.addLayer(draftLine); } catch (_) {}
      }
    }
  }

  function attachDoubleClickFinish() {
    const map = getMapSafe();
    if (!map || dblHooked) return;

    map.on('dblclick', () => {
      if (state.isActiveImageTool && state.isActiveImageTool('annotate')) {
        finishDraft();
      }
    });

    dblHooked = true;
  }

  function dispose() {
    clearDraft();
    clearLayer();

    if (layerGroup) {
      try { layerGroup.remove(); } catch (_) {}
    }

    layerGroup = null;
    createdAnnotations = [];
    dblHooked = false;
  }

  return {
    clearDraft,
    resetAnnotations,
    handleMapClick,
    finishDraft,
    refresh,
    attachDoubleClickFinish,
    dispose
  };
}
