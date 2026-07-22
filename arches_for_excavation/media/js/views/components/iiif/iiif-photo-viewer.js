import ko from 'knockout';
import photoViewerTemplate from 'templates/views/components/iiif/iiif-photo-viewer.htm';
import { canvasLabel, extractServiceUrlFromCanvas } from './lib/iiif-manifest-utils';
import { infoJsonFromServiceUrl } from './lib/iiif-image-service-utils';
import { ensureLeafletIiif } from './lib/leaflet-iiif-loader';

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
          const serviceUrl = extractServiceUrlFromCanvas(c);
          const infoJson = infoJsonFromServiceUrl(serviceUrl);

          return {
            id: c?.id || `canvas-${i + 1}`,
            label: canvasLabel(c, `Page ${i + 1}`),
            serviceUrl,
            infoJson
          };
        }).filter(p => !!p.infoJson);
      }

      function clearCurrentLayer() {
        try {
          if (self._layer && self._map) {
            self._map.removeLayer(self._layer);
          }
        } catch (_) {}
        self._layer = null;
      }

      function refreshMapSize() {
        if (!self._map || !self._container) return;
        const { clientWidth, clientHeight } = self._container;
        if (clientWidth > 0 && clientHeight > 0) {
          self._map.invalidateSize();
        }
      }

      async function renderCurrent() {
        if (!self._map || !self._L) return;

        const p = self.pages()[self.index()];
        if (!p) return;

        self.status(`Loading: ${p.label}`);
        self.error('');

        try {
          clearCurrentLayer();

          const layer = self._L.tileLayer.iiif(p.infoJson, {
            fitBounds: false,
            setMaxBounds: false,
            quality: 'default',
            tileFormat: 'png'
          });

          self._layer = layer;
          layer.addTo(self._map);

          if (layer._infoPromise && typeof layer._infoPromise.then === 'function') {
            await layer._infoPromise;
          }

          if (self._layer !== layer || !self._map.hasLayer(layer)) return;
          if (!Number.isFinite(layer.x) || !Number.isFinite(layer.y)) {
            throw new Error('IIIF info.json missing valid width/height');
          }

          refreshMapSize();
          self._map.scrollWheelZoom.enable();
          self.status('');
        } catch (e) {
          self.status('');
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

          self._L = await ensureLeafletIiif({ includeCss: true });

          self._map = self._L.map(self._container, {
            crs: self._L.CRS.Simple,
            zoomControl: true
          });
          self._map.setView([0, 0], 0, { animate: false });

          if (typeof ResizeObserver !== 'undefined') {
            self._resizeObserver = new ResizeObserver(() => refreshMapSize());
            self._resizeObserver.observe(self._container);
          }

          self.pages(buildPages(ko.unwrap(self.manifest)));
          self.index(0);

          if (!self.pages().length) {
            self.error('No photo canvases with IIIF service in manifest.');
            return;
          }

          setTimeout(async () => {
            refreshMapSize();
            await renderCurrent();
          }, 0);
        } catch (e) {
          self.error(e?.message || String(e));
        }
      };

      self._manifestSub = ko.computed(async () => {
        const pages = buildPages(ko.unwrap(self.manifest));
        self.pages(pages);
        self.index(0);

        if (self._map && pages.length) {
          setTimeout(async () => renderCurrent(), 0);
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
