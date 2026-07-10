export function infoJsonFromServiceUrl(serviceUrl) {
  if (!serviceUrl) return null;

  const raw = String(serviceUrl).trim();

  if (raw.includes('titiler-proxy') && raw.includes('?')) {
    const url = new URL(raw, window.location.origin);
    const suffix = (url.searchParams.get('suffix') || '').toLowerCase();
    if (suffix !== 'info.json') url.searchParams.set('suffix', 'info.json');
    return url.toString();
  }

  const normalized = raw.replace(/\/+$/, '');
  return normalized.endsWith('/info.json') ? normalized : `${normalized}/info.json`;
}

export function imageUrlFromServiceUrl(serviceUrl) {
  if (!serviceUrl) return null;

  const raw = String(serviceUrl).trim();

  if (raw.includes('titiler-proxy') && raw.includes('?')) {
    const url = new URL(raw, window.location.origin);
    url.searchParams.set('iiif_region', 'full');
    url.searchParams.set('iiif_size', 'max');
    url.searchParams.set('iiif_rotation', '0');
    url.searchParams.set('iiif_quality', 'default');
    url.searchParams.set('iiif_format', 'png');
    url.searchParams.delete('suffix');
    return url.toString();
  }

  const normalized = raw.replace(/\/+$/, '');
  return `${normalized}/full/max/0/default.png`;
}

export async function fetchIiifInfoJson(infoJsonUrl) {
  const response = await fetch(infoJsonUrl, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error('IIIF info.json fetch failed: ' + response.status);
  }
  return response.json();
}

export function getIiifMaxNativeZoom(info) {
  const scaleFactors =
    (info?.tiles && info.tiles[0] && Array.isArray(info.tiles[0].scaleFactors))
      ? info.tiles[0].scaleFactors
      : [1];

  return Math.max(0, scaleFactors.length - 1);
}

export function getIiifImageBounds(info) {
  const width = Number(info?.width);
  const height = Number(info?.height);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error('IIIF info.json missing valid width/height');
  }

  return [[-height, 0], [0, width]];
}
