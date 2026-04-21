const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_IIIF_JS = 'https://unpkg.com/leaflet-iiif@3.0.0/leaflet-iiif.js';

const scriptOnce = new Map();
const loadedCss = new Set();

function ensureScript(url) {
  if (scriptOnce.has(url)) return scriptOnce.get(url);

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load script: ' + url));
    document.head.appendChild(script);
  });

  scriptOnce.set(url, promise);
  return promise;
}

function ensureCss(url) {
  if (typeof document === 'undefined' || loadedCss.has(url)) return;

  const existing = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .some((link) => link.href === url);
  if (existing) {
    loadedCss.add(url);
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
  loadedCss.add(url);
}

export async function ensureLeafletIiif(opts = {}) {
  const includeCss = opts.includeCss === true;
  const jquery = opts.jquery || null;

  if (includeCss) ensureCss(LEAFLET_CSS);

  if (typeof window !== 'undefined' && jquery) {
    if (!window.$) window.$ = jquery;
    if (!window.jQuery) window.jQuery = jquery;
  }

  await ensureScript(LEAFLET_JS);
  await ensureScript(LEAFLET_IIIF_JS);

  const L = typeof window !== 'undefined' ? window.L : null;
  if (!L) throw new Error('Leaflet not available after load');
  if (!L.tileLayer || typeof L.tileLayer.iiif !== 'function') {
    throw new Error('leaflet-iiif not available after load');
  }

  return L;
}

export function getIiifLayerMaxZoom(layer) {
  if (!layer) return null;

  const fromOptions = layer.options?.maxNativeZoom;
  if (Number.isFinite(fromOptions)) return fromOptions;

  const fromLayer = layer._maxZoom;
  if (Number.isFinite(fromLayer)) return fromLayer;

  const tiers = layer._tiers || layer._tileTiers || null;
  if (Array.isArray(tiers) && tiers.length) return tiers.length - 1;

  return null;
}
