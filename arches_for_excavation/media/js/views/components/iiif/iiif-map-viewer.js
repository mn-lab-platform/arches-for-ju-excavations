
console.log('[iiif-map-viewer] I AM DEFINITELY EXECUTING');
import ko from 'knockout';
import maplibregl from 'maplibre-gl';
import { WarpedMapLayer } from '@allmaps/maplibre';
import template from 'templates/views/components/iiif/iiif-map-viewer.htm';
console.error('[iiif-map-viewer] I AM DEFINITELY EXECUTING');
console.log('[iiif-map-viewer] I AM DEFINITELY EXECUTING');
const LOG = '[iiif-map-viewer]';

/* eslint-disable no-console */
console.log(LOG, '=== MODULE LOADED (WEBPACK) ===');
console.log(LOG, 'Dependencies check:', {
  ko: !!ko,
  maplibregl: !!maplibregl,
  WarpedMapLayer: !!WarpedMapLayer,
  template: !!template
});

try {
  console.groupCollapsed(LOG, 'Allmaps boot check');
  console.log('WarpedMapLayer:', WarpedMapLayer);
  console.log('WarpedMapLayer found:', !!WarpedMapLayer);
  console.log('WarpedMapLayer type:', typeof WarpedMapLayer);
  console.groupEnd();
} catch (e) {
  console.warn(LOG, 'Allmaps boot check failed', e);
}
if (window.require) {
  window.require(['views/components/iiif/iiif-map-viewer'], function () {
    console.log('[iiif-report] iiif-map-viewer registered via requirejs?', ko.components.isRegistered('iiif-map-viewer'));
  });
}
ko.components.register('iiif-map-viewer', {
  viewModel: { 
    createViewModel: function(params, componentInfo) {
      const self = this;
      console.log(LOG, 'Defining viewModel for iiif-map-viewer component');
      self.manifest = params.manifest;
      self.status = ko.observable('');
      self.error = ko.observable('');

      const el = componentInfo?.element;
      const mapId = 'iiif-maplibre-' + Math.random().toString(16).slice(2);
      self._map = null;

      function getMapDiv() {
        if (!el?.querySelector) return null;
        const d = el.querySelector('[data-iiif-map]');
        if (d && !d.id) d.id = mapId;
        return d || null;
      }

      function destroy() {
        if (self._map) {
          try { self._map.remove(); } catch (e) {}
        }
        self._map = null;
      }

      function initMapOnce() {
        if (self._map) return;

        const mapDiv = getMapDiv();
        if (!mapDiv) {
          self.error('Missing map container ([data-iiif-map]).');
          return;
        }

        console.log(LOG, 'WarpedMapLayer available:', !!WarpedMapLayer);

        self.status('Initializing map…');
        self._map = new maplibregl.Map({
          container: mapDiv,
          style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
          center: [19, 52],
          zoom: 5
        });

        self._map.addControl(new maplibregl.NavigationControl(), 'top-right');
        self._map.on('load', () => {
          self.status('');
          console.log(LOG, 'Map loaded');
        });
        self._map.on('error', (e) => console.error(LOG, 'MapLibre error', e));
      }

      setTimeout(initMapOnce, 0);

      ko.computed(() => {
        const m = (typeof self.manifest === 'function') ? ko.unwrap(self.manifest) : self.manifest;
        if (!m) return;
        console.groupCollapsed(LOG, 'manifest');
        console.log('manifest.id:', m.id || m['@id']);
        console.log('items count:', m.items?.length || 0);
        console.groupEnd();
      });

      if (el) {
        ko.utils.domNodeDisposal.addDisposeCallback(el, destroy);
      }

      return self;
    }
  },
  template
});

console.log(LOG, 'Component registered:', ko.components.isRegistered('iiif-map-viewer'));
/* eslint-enable no-console */

export default ko.components;