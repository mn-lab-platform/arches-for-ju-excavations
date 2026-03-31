import ko from 'knockout';
import photoViewerTemplate from 'templates/views/components/iiif/iiif-photo-viewer.htm';

const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_IIIF_JS = 'https://unpkg.com/leaflet-iiif@3.0.0/leaflet-iiif.js';

const LOG = '[iiif-photo-viewer]';
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
  const existing = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .find(l => l.href === url);
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

  if (raw.indexOf('titiler-proxy') !== -1 && raw.indexOf('?') !== -1) {
    const u = new URL(raw, window.location.origin);
    const suffix = (u.searchParams.get('suffix') || '').toLowerCase();
    if (suffix !== 'info.json') u.searchParams.set('suffix', 'info.json');
    return u.toString();
  }

  const s = raw.replace(/\/+$/, '');
  return s.endsWith('/info.json') ? s : (s + '/info.json');
}

function imageUrlFromService(serviceUrl) {
  if (!serviceUrl) return null;

  const raw = String(serviceUrl).trim();

  // IIIF Image API 3.0
  if (raw.indexOf('titiler-proxy') !== -1 && raw.indexOf('?') !== -1) {
    const u = new URL(raw, window.location.origin);
    u.searchParams.set('iiif_region', 'full');
    u.searchParams.set('iiif_size', 'max');
    u.searchParams.set('iiif_rotation', '0');
    u.searchParams.set('iiif_quality', 'default');
    u.searchParams.set('iiif_format', 'jpg');
    u.searchParams.delete('suffix');
    return u.toString();
  }

  const s = raw.replace(/\/+$/, '');
  return s + '/full/max/0/default.jpg';
}

async function fetchInfoJson(infoJsonUrl) {
  console.log(LOG, 'Fetching info.json:', infoJsonUrl);
  const r = await fetch(infoJsonUrl, { credentials: 'same-origin' });
  if (!r.ok) {
      console.error(LOG, `Fetch failed for ${infoJsonUrl} with status: ${r.status}`);
      throw new Error('IIIF info.json fetch failed: ' + r.status);
  }
  const data = await r.json();
  console.log(LOG, 'info.json data:', data);
  return data;
}

function getSafeMaxNativeZoom(info) {
  const scaleFactors =
    (info?.tiles && info.tiles[0] && Array.isArray(info.tiles[0].scaleFactors))
      ? info.tiles[0].scaleFactors
      : [1];

  // zabezpieczenie: minimum 0
  console.log(LOG, 'Calculated max native zoom level from info.json:', scaleFactors.length - 1);
  return Math.max(0, scaleFactors.length - 1);
}

function getBoundsFromInfo(info) {
  const width = Number(info?.width);
  const height = Number(info?.height);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error('IIIF info.json missing valid width/height');
  }

  // leaflet-iiif wewnętrznie mapuje bounds tak:
  // prawy dolny róg to [0,0]? Nie, zazwyczaj standardowy układ dla L.CRS.Simple to:
  // dół-lewo: [0, 0] lub góra-lewo: [0,0], a drugi punkt to [height, width] w jednostkach obrazu.
  return [[-height, 0], [0, width]];
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
        console.log(LOG, 'Building pages from manifest:', manifest);
        const canvases = Array.isArray(manifest?.items) ? manifest.items : [];
        console.log(LOG, `Found ${canvases.length} canvases`);
        
        const generatedPages = canvases.map((c, i) => {
          const serviceUrl = serviceFromCanvas(c);
          const infoJson = infoJsonFromService(serviceUrl);
          const imageUrl = imageUrlFromService(serviceUrl);

          return {
            id: c?.id || `canvas-${i + 1}`,
            label: firstText(c?.label) || `Page ${i + 1}`,
            serviceUrl,
            infoJson,
            imageUrl
          };
        }).filter(p => !!p.infoJson);
        
        console.log(LOG, 'Valid pages to render:', generatedPages);
        return generatedPages;
      }

      function clearCurrentLayer() {
        console.log(LOG, 'Clearing current layers...');
        try {
          if (self._layer) {
            self._map.removeLayer(self._layer);
            self._layer = null;
          }
        } catch (_) {}

        try {
          if (self._overlay) {
            self._map.removeLayer(self._overlay);
            self._overlay = null;
          }
        } catch (_) {}
      }

      function applyBounds(retries = 5) {
         if (!self._map || !self._currentBounds) return;
         const { clientWidth, clientHeight } = self._container || {};
         if (clientWidth > 0 && clientHeight > 0) {
            self._map.invalidateSize();
            self._map.fitBounds(self._currentBounds);
            self._map.scrollWheelZoom.enable();
            console.log(LOG, `Bounds applied. Container size: ${clientWidth}x${clientHeight}`);
         } else {
            console.log(LOG, 'Container is 0x0, skipping fitBounds for now.');
         }
      }

      async function renderCurrent() {
        if (!self._map || !self._L) {
            console.warn(LOG, 'renderCurrent aborted: map or Leaflet not ready');
            return;
        }

        const pages = self.pages();
        const p = pages[self.index()];
        if (!p) {
            console.warn(LOG, 'renderCurrent aborted: no page found at index', self.index());
            return;
        }

        console.log(LOG, `renderCurrent starting for page ${self.index()}:`, p.label, p);

        self.status(`Loading: ${p.label}`);
        self.error('');

        try {
          clearCurrentLayer();

          const info = await fetchInfoJson(p.infoJson);
          const bounds = getBoundsFromInfo(info);
          const maxNativeZoom = getSafeMaxNativeZoom(info);
          
          self._currentBounds = bounds;
          console.log(LOG, 'New map bounds configured:', bounds, 'maxNativeZoom:', maxNativeZoom);

          self._map.setMaxBounds(null);
          
          try {
            console.log(LOG, 'Attempting to create L.tileLayer.iiif...');
            self._layer = self._L.tileLayer.iiif(p.infoJson, {
              setMaxBounds: false,
              fitBounds: false,
              quality: 'default',
            }).addTo(self._map);
            const targetMaxZoom = Math.max(8, maxNativeZoom + 8);
            self._map.setMaxZoom(targetMaxZoom);
            self._layer.options.maxNativeZoom = maxNativeZoom;
            self._layer.options.maxZoom = targetMaxZoom;
            console.log(LOG, 'Leaflet IIIF layer initialized successfully.');
          } catch (tileErr) {
            console.error(LOG, 'L.tileLayer.iiif threw an error, trying fallback...', tileErr);
            // fallback dla problematycznych info.json / małych obrazów
            if (!p.imageUrl) throw tileErr;

            self._overlay = self._L.imageOverlay(p.imageUrl, bounds).addTo(self._map);
            self._map.setMaxZoom(Math.max(4, maxNativeZoom + 2));
            console.log(LOG, 'Fallback imageOverlay initialized successfully.');
          }

          self.status('');
          
          // Używamy naszej nowej, bezpiecznej funkcji, która sprawdzi czy kontener ma rozmiar
          setTimeout(() => applyBounds(10), 50);

        } catch (e) {
          console.error(LOG, 'Page render failed completely:', e);
          self.status('');
          self.error('Page render failed: ' + (e?.message || String(e)));
        }
      }

      self.prev = async () => {
        if (!self.canPrev()) return;
        self.index(self.index() - 1);
        console.log(LOG, 'Navigating to PREV page, index:', self.index());
        await renderCurrent();
      };

      self.next = async () => {
        if (!self.canNext()) return;
        self.index(self.index() + 1);
        console.log(LOG, 'Navigating to NEXT page, index:', self.index());
        await renderCurrent();
      };

      self.initMap = async (rootEl) => {
        console.log(LOG, 'initMap called');
        try {
          self._container = rootEl.querySelector('.iiif-photo-leaflet-container');
          if (!self._container) throw new Error('Missing .iiif-photo-leaflet-container');

          console.log(LOG, 'Ensuring Leaflet and IIIF plugin...');
          self._L = await ensureLeafletIiif();
          console.log(LOG, 'Leaflet ready. Initializing map on container...');

          self._map = self._L.map(self._container, {
            crs: self._L.CRS.Simple,
            zoomControl: true,
            maxZoom: 12
          });

          //self._map.setView([0, 0], 0);

          // Obserwator zapewni poprawne ułożenie widoku gdy zakładka stanie się widoczna
          if (typeof ResizeObserver !== 'undefined') {
              self._resizeObserver = new ResizeObserver(() => {
                  if (self._map && self._currentBounds) applyBounds();
              });
              self._resizeObserver.observe(self._container);
          }

          const m = ko.unwrap(self.manifest);
          console.log(LOG, 'Unwrapped manifest on init:', m);
          self.pages(buildPages(m));
          self.index(0);

          if (!self.pages().length) {
            console.warn(LOG, 'No valid pages found during init.');
            self.error('No photo canvases with IIIF service in manifest.');
            return;
          }

          // ważne przy raportach/KO/layoutach
          setTimeout(async () => {
            console.log(LOG, 'Invalidating layout size & triggering first render');
            self._map.invalidateSize();
            await renderCurrent();
          }, 0);
        } catch (e) {
          console.error(LOG, 'initMap failed:', e);
          self.error(e?.message || String(e));
        }
      };

      self._manifestSub = ko.computed(async () => {
        const m = ko.unwrap(self.manifest);
        console.log(LOG, 'Manifest observable changed:', m);
        const pages = buildPages(m);
        self.pages(pages);
        self.index(0);

        if (self._map && pages.length) {
          setTimeout(async () => {
             // zamiast invalidateSize w ciemno polegamy na renderCurrent -> applyBounds
            await renderCurrent();
          }, 0);
        }
      });

      self.dispose = () => {
        try { if (self._manifestSub) self._manifestSub.dispose(); } catch (_) {}
        try {
          if (self._resizeObserver) {
              self._resizeObserver.disconnect();
              self._resizeObserver = null;
          }
        } catch (_) {}
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