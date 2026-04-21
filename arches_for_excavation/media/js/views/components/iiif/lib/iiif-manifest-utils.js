// views/components/iiif/lib/iiif-manifest-utils.js

import { forceDoubleSlashAfterIiif } from './iiif-infojson-patch';

export function ensureAbsoluteUrl(url) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;

  try {
    return new URL(url, window.location.origin).toString();
  } catch (_) {
    return window.location.origin + (String(url).startsWith('/') ? '' : '/') + String(url);
  }
}

export function forceIiifServiceId(serviceId) {
  if (!serviceId) return null;

  const s = forceDoubleSlashAfterIiif(serviceId);
  return String(s).replace(/\/+$/, '');
}

// Reads IIIF v3 metadata: [{label:{en:[k]}, value:{en:[v]}}]
export function mdValue(canvas, key) {
  const md = canvas && canvas.metadata;
  if (!Array.isArray(md)) return null;

  for (let i = 0; i < md.length; i++) {
    const row = md[i];
    const label = row?.label?.en?.[0] ?? row?.label?.none?.[0] ?? null;
    if (label !== key) continue;

    const val = row?.value?.en?.[0] ?? row?.value?.none?.[0] ?? null;
    return val ?? null;
  }

  return null;
}

export function mdBool(canvas, key) {
  const v = mdValue(canvas, key);
  if (v == null) return false;

  const s = String(v).trim().toLowerCase();
  return s === 'true' || s === '1' || s === 'yes' || s === 'on';
}

export function canvasLabelStr(canvas) {
  return (
    canvas?.label?.en?.[0] ||
    canvas?.label?.none?.[0] ||
    ''
  );
}

export function canvasLabel(canvas, fallback = 'Layer') {
  return (
    canvas?.label?.en?.[0] ||
    canvas?.label?.none?.[0] ||
    String(fallback)
  );
}

export function isDemCanvas(canvas) {
  return mdBool(canvas, 'is_dem_hint');
}

// Produkty DEM rozpoznawane po suffixach w label
export function isDemProductCanvas(canvas) {
  const label = canvasLabelStr(canvas).toLowerCase();
  return (
    label.includes('(hillshade)') ||
    label.includes('(color relief)') ||
    label.includes('(colorrelief)') ||
    label.includes('(slope)') ||
    label.includes('(aspect)')
  );
}

export function pickDemCanvasFromManifest(manifest) {
  const items = Array.isArray(manifest?.items) ? manifest.items : [];
  return items.find((c) => isDemCanvas(c)) || null;
}

export function extractServiceUrlFromCanvas(canvas) {
  try {
    const ap = canvas?.items?.[0];
    const ann = ap?.items?.[0];
    const body = ann?.body;
    if (!body) return null;

    const svc = body.service;
    const s = Array.isArray(svc) ? svc[0] : svc;
    const id = s?.id || s?.['@id'];
    if (!id) return null;

    return forceIiifServiceId(id);
  } catch (_) {
    return null;
  }
}

export function extractTitilerFilePathFromServiceUrl(serviceUrl) {
  if (!serviceUrl) return null;

  try {
    const u = new URL(serviceUrl, window.location.origin);
    const p = u.pathname || '';
    const m = p.match(/\/iiif\/{1,2}(data\/.+)$/i);
    if (!m) return null;
    return '/' + m[1].replace(/^\/+/, '');
  } catch (_) {
    return null;
  }
}

export function canvasDims(canvas) {
  // canvas.width/height mogą być 1 (placeholder) — fallback do metadata
  const wCanvas = Number(canvas?.width || 0);
  const hCanvas = Number(canvas?.height || 0);
  const wMeta = Number(mdValue(canvas, 'width') || 0);
  const hMeta = Number(mdValue(canvas, 'height') || 0);

  // preferuj większą wartość (metadata > placeholder)
  const w = wMeta > 1 ? wMeta : wCanvas;
  const h = hMeta > 1 ? hMeta : hCanvas;

  return { w, h };
}

export function pickLargestCanvas(canvases) {
  let best = null;
  let bestArea = -1;

  (Array.isArray(canvases) ? canvases : []).forEach((c) => {
    const { w, h } = canvasDims(c);
    const area = w > 0 && h > 0 ? w * h : -1;

    if (area > bestArea) {
      bestArea = area;
      best = c;
    }
  });

  return best || canvases?.[0] || null;
}

export function parseTransformFromCanvas(canvas) {
  const trRaw = mdValue(canvas, 'transform');
  if (!trRaw) return null;

  try {
    const tr = JSON.parse(trRaw);
    return (Array.isArray(tr) && tr.length === 6) ? tr : null;
  } catch (_) {
    return null;
  }
}

export function canvasHasGeoref(canvas) {
  return mdBool(canvas, 'has_georef');
}

export function manifestHasAnyGeoref(manifest) {
  const items = manifest?.items;
  if (!Array.isArray(items) || !items.length) return false;
  return items.some(canvasHasGeoref);
}