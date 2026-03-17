import ko from 'knockout';
import photoViewerTemplate from 'templates/views/components/iiif/iiif-photo-viewer.htm';

const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_IIIF_JS = 'https://unpkg.com/leaflet-iiif@3.0.0/leaflet-iiif.js';

const _once = new Map();

function ensureScript(url) {
  if (_once.has(url)) return _once.get(url);
  const p = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.async = true;
    s.src = url;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Failed to load script: ' + url));
    document.head.appendChild(s);
  });
  _once.set(url, p);
  return p;
}

function ensureCss(url) {
  const existing = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find(l => l.href === url);
  if (existing) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = url;
  document.head.appendChild(l);
}

async function ensureLeafletIiif() {
  ensureCss(LEAFLET_CSS);
  await ensureScript(LEAFLET_JS);
  await ensureScript(LEAFLET_IIIF_JS);

  if (!window.L || !window.L.tileLayer || typeof window.L.tileLayer.iiif !== 'function') {
    throw new Error('Leaflet IIIF not available');
  }
  return window.L;
}

function firstText(v) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  if (v.en && Array.isArray(v.en) && v.en[0]) return v.en[0];
  if (v.none && Array.isArray(v.none) && v.none[0]) return v.none[0];
  return '';
}

function serviceFromCanvas(canvas) {
  const body = canvas?.items?.[0]?.items?.[0]?.body;
  const b = Array.isArray(body) ? body[0] : body;
  const svc = b?.service;
  const s = Array.isArray(svc) ? svc[0] : svc;
  return s?.id || s?.['@id'] || null;
}

function infoJsonFromService(serviceUrl) {
  if (!serviceUrl) return null;

  const raw = String(serviceUrl).trim();

  // Proxy URL with query (?path=...) -> use suffix param, not "/info.json" path append
  if (raw.indexOf('titiler-proxy') !== -1 && raw.indexOf('?') !== -1) {
    const u = new URL(raw, window.location.origin);
    const suffix = (u.searchParams.get('suffix') || '').toLowerCase();
    if (suffix !== 'info.json') u.searchParams.set('suffix', 'info.json');
    return u.toString();
  }

  const s = raw.replace(/\/+$/, '');
  return s.endsWith('/info.json') ? s : (s + '/info.json');
}

async function getIiifMaxNativeZoom(infoJsonUrl) {
  const r = await fetch(infoJsonUrl, { credentials: 'same-origin' });
  if (!r.ok) throw new Error('IIIF info.json fetch failed: ' + r.status);
  const info = await r.json();

  // IIIF Image API 3: tiles[0].scaleFactors
  const scaleFactors = (info?.tiles && info.tiles[0] && Array.isArray(info.tiles[0].scaleFactors))
    ? info.tiles[0].scaleFactors
    : [1];

  // plugin używa indeksu zoom-level
  return Math.max(0, scaleFactors.length - 1);
}

ko.bindingHandlers.iiifPhotoInit = {
  init(element, valueAccessor) {
    const initFn = ko.unwrap(valueAccessor());
    if (typeof initFn === 'function') initFn(element);
    return { controlsDescendantBindings: false };
  }
};

ko.components.register('iiif-photo-viewer', {
  viewModel: {
    createViewModel: function(params) {
      const self = {};
      self.manifest = params.manifest;

      self.status = ko.observable('');
      self.error = ko.observable('');
      self.pages = ko.observableArray([]);
      self.index = ko.observable(0);

      self.canPrev = ko.pureComputed(() => self.index() > 0);
      self.canNext = ko.pureComputed(() => self.index() < self.pages().length - 1);
      self.pageText = ko.pureComputed(() => {
        const total = self.pages().length;
        return total ? `${self.index() + 1} / ${total}` : '0 / 0';
      });

      function buildPages(manifest) {
        const canvases = Array.isArray(manifest?.items) ? manifest.items : [];
        return canvases.map((c, i) => {
          const infoJson = infoJsonFromService(serviceFromCanvas(c));
          return {
            id: c?.id || `canvas-${i + 1}`,
            label: firstText(c?.label) || `Page ${i + 1}`,
            infoJson
          };
        }).filter(p => !!p.infoJson);
      }

      async function renderCurrent() {
        if (!self._map || !self._L) return;
        const pages = self.pages();
        const p = pages[self.index()];
        if (!p) return;

        self.status(`Loading: ${p.label}`);
        self.error('');

        try {
          if (self._layer) {
            self._map.removeLayer(self._layer);
            self._layer = null;
          }

          const maxNativeZoom = await getIiifMaxNativeZoom(p.infoJson);

          self._layer = self._L.tileLayer.iiif(p.infoJson, {
            setMaxBounds: true,
            fitBounds: true,
            maxNativeZoom: maxNativeZoom
            // NIE ustawiaj tu maxZoom: 27
          }).addTo(self._map);

          // opcjonalny overzoom o +2
          self._map.setMaxZoom(maxNativeZoom + 2);

          self.status('');
          setTimeout(() => self._map.invalidateSize(), 0);
        } catch (e) {
          self.error('Page render failed: ' + (e?.message || String(e)));
        }
      }

      self.prev = async () => {
        if (!self.canPrev()) return;
        self.index(self.index() - 1);
        await renderCurrent();
      };

      self.next = async () => {
        if (!self.canNext()) return;
        self.index(self.index() + 1);
        await renderCurrent();
      };

      self.initMap = async (rootEl) => {
        try {
          self._container = rootEl.querySelector('.iiif-photo-leaflet-container');
          if (!self._container) throw new Error('Missing .iiif-photo-leaflet-container');

          self._L = await ensureLeafletIiif();
          self._map = self._L.map(self._container, {
            crs: self._L.CRS.Simple,
            zoomControl: true,
            maxZoom: 27
          });
          self._map.setView([0, 0], 0);
          const m = ko.unwrap(self.manifest);
          self.pages(buildPages(m));
          self.index(0);

          if (!self.pages().length) {
            self.error('No photo canvases with IIIF service in manifest.');
            return;
          }

          await renderCurrent();
        } catch (e) {
          self.error(e?.message || String(e));
        }
      };

      self._manifestSub = ko.computed(async () => {
        const m = ko.unwrap(self.manifest);
        const pages = buildPages(m);
        self.pages(pages);
        self.index(0);
        if (self._map && pages.length) await renderCurrent();
      });

      self.dispose = () => {
        try { if (self._manifestSub) self._manifestSub.dispose(); } catch (_) {}
        try {
          if (self._map) {
            self._map.remove();
            self._map = null;
          }
        } catch (_) {}
      };

      return self;
    }
  },
  template: photoViewerTemplate
});