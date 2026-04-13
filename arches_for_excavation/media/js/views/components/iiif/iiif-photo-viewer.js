import ko from 'knockout';
import photoViewerTemplate from 'templates/views/components/iiif/iiif-photo-viewer.htm';
import { canvasLabel, extractServiceUrlFromCanvas } from './lib/iiif-manifest-utils';
import {
  fetchIiifInfoJson,
  getIiifImageBounds,
  getIiifMaxNativeZoom,
  imageUrlFromServiceUrl,
  infoJsonFromServiceUrl
} from './lib/iiif-image-service-utils';
import { ensureLeafletIiif } from './lib/leaflet-iiif-loader';

const LOG = '[iiif-photo-viewer]';
const DEBUG_FLAG = 'iiif.photo.debug';

function isDebugOn() {
  try {
    if (typeof window === 'undefined') return false;
    if (window.__IIIF_PHOTO_DEBUG__ === true) return true;
    return window.localStorage?.getItem(DEBUG_FLAG) === '1';
  } catch (_) {
    return false;
  }
}

function dbg(...args) {
  if (!isDebugOn()) return;
  console.log(LOG, ...args);
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
        dbg('Building pages from manifest:', manifest);
        const canvases = Array.isArray(manifest?.items) ? manifest.items : [];
        dbg(`Found ${canvases.length} canvases`);
        
        const generatedPages = canvases.map((c, i) => {
          const serviceUrl = extractServiceUrlFromCanvas(c);
          const infoJson = infoJsonFromServiceUrl(serviceUrl);
          const imageUrl = imageUrlFromServiceUrl(serviceUrl);

          return {
            id: c?.id || `canvas-${i + 1}`,
            label: canvasLabel(c, `Page ${i + 1}`),
            serviceUrl,
            infoJson,
            imageUrl
          };
        }).filter(p => !!p.infoJson);
        
        dbg('Valid pages to render:', generatedPages);
        return generatedPages;
      }

      function clearCurrentLayer() {
        dbg('Clearing current layers...');
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

      function applyBounds() {
         if (!self._map || !self._currentBounds) return;
         const { clientWidth, clientHeight } = self._container || {};
         if (clientWidth > 0 && clientHeight > 0) {
            self._map.invalidateSize();
            self._map.fitBounds(self._currentBounds);
            self._map.scrollWheelZoom.enable();
            dbg(`Bounds applied. Container size: ${clientWidth}x${clientHeight}`);
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

        dbg(`renderCurrent starting for page ${self.index()}:`, p.label, p);

        self.status(`Loading: ${p.label}`);
        self.error('');

        try {
          clearCurrentLayer();

          const info = await fetchIiifInfoJson(p.infoJson);
          const bounds = getIiifImageBounds(info);
          const maxNativeZoom = getIiifMaxNativeZoom(info);
          
          self._currentBounds = bounds;
          dbg('New map bounds configured:', bounds, 'maxNativeZoom:', maxNativeZoom);

          self._map.setMaxBounds(null);
          
          try {
            self._layer = self._L.tileLayer.iiif(p.infoJson, {
              setMaxBounds: false,
              fitBounds: false,
              quality: 'default',
            }).addTo(self._map);
            const targetMaxZoom = Math.max(8, maxNativeZoom + 8);
            self._map.setMaxZoom(targetMaxZoom);
            self._layer.options.maxNativeZoom = maxNativeZoom;
            self._layer.options.maxZoom = targetMaxZoom;
          } catch (tileErr) {
            console.error(LOG, 'L.tileLayer.iiif threw an error, trying fallback...', tileErr);
            // Fallback for small images or info.json variants the plugin cannot handle.
            if (!p.imageUrl) throw tileErr;

            self._overlay = self._L.imageOverlay(p.imageUrl, bounds).addTo(self._map);
            self._map.setMaxZoom(Math.max(4, maxNativeZoom + 2));
          }

          self.status('');
          
          // Defer fitBounds until the container has a measurable size.
          setTimeout(() => applyBounds(), 50);

        } catch (e) {
          console.error(LOG, 'Page render failed completely:', e);
          self.status('');
          self.error('Page render failed: ' + (e?.message || String(e)));
        }
      }

      self.prev = async () => {
        if (!self.canPrev()) return;
        self.index(self.index() - 1);
        dbg('Navigating to previous page. Index:', self.index());
        await renderCurrent();
      };

      self.next = async () => {
        if (!self.canNext()) return;
        self.index(self.index() + 1);
        dbg('Navigating to next page. Index:', self.index());
        await renderCurrent();
      };

      self.initMap = async (rootEl) => {
        dbg('initMap called');
        try {
          self._container = rootEl.querySelector('.iiif-photo-leaflet-container');
          if (!self._container) throw new Error('Missing .iiif-photo-leaflet-container');

          self._L = await ensureLeafletIiif({ includeCss: true });

          self._map = self._L.map(self._container, {
            crs: self._L.CRS.Simple,
            zoomControl: true,
            maxZoom: 12
          });

          if (typeof ResizeObserver !== 'undefined') {
              self._resizeObserver = new ResizeObserver(() => {
                  if (self._map && self._currentBounds) applyBounds();
              });
              self._resizeObserver.observe(self._container);
          }

          const m = ko.unwrap(self.manifest);
          dbg('Unwrapped manifest on init:', m);
          self.pages(buildPages(m));
          self.index(0);

          if (!self.pages().length) {
            console.warn(LOG, 'No valid pages found during init.');
            self.error('No photo canvases with IIIF service in manifest.');
            return;
          }

          setTimeout(async () => {
            dbg('Invalidating layout size and triggering first render');
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
        dbg('Manifest observable changed:', m);
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
