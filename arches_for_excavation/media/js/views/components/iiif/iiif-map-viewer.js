import ko from 'knockout';
import $ from 'jquery';
import maplibregl from 'maplibre-gl';
import proj4 from 'proj4';

import iiifMapViewerTemplate from 'templates/views/components/iiif/iiif-map-viewer.htm';

import { installIiifInfoJsonPatch } from './lib/iiif-infojson-patch';
import { createAllmapsLayerManager } from './map/allmaps-layer-manager';
import { createMeasureController } from './map/measure-controller';
import { createDemSampler } from './map/dem-sampling';

// Binding used in template: data-bind="iiifMapInit: initMap"
ko.bindingHandlers.iiifMapInit = {
  init(element, valueAccessor) {
    const initFn = ko.unwrap(valueAccessor());
    if (typeof initFn === 'function') initFn(element);
    return { controlsDescendantBindings: false };
  }
};

ko.components.register('iiif-map-viewer', {
  viewModel: {
    createViewModel: function(params) {
      const self = {};
      installIiifInfoJsonPatch();

      self.manifest = params.manifest;
      self.status = ko.observable('');
      self.error = ko.observable('');
      self.layers = ko.observableArray([]);

      self.measureMode = ko.observable(false);
      self.measureDistance = ko.observable('');
      self.measureCoords = ko.observable('');

      self.elevationMode = ko.observable(true);
      self.elevationLoading = ko.observable(false);
      self.elevationValue = ko.observable('');
      self.elevationError = ko.observable('');

      // FIX: correct option names
      const layerManager = createAllmapsLayerManager({
        setStatus: self.status,
        setError: self.error
      });

      const dem = createDemSampler({
        setLoading: self.elevationLoading,
        setValue: self.elevationValue,
        setError: self.elevationError
      });

      const measure = createMeasureController({
        setDistance: self.measureDistance,
        setCoords: self.measureCoords
      });

      self._map = null;
      self.mapReady = ko.observable(false);
      self._disposed = false;
      self._renderNonce = 0;
      self._renderQueue = Promise.resolve();

      function scheduleRender(force) {
        const nonce = ++self._renderNonce;
        self._renderQueue = self._renderQueue
          .then(async () => {
            if (self._disposed) return;
            await render(force, nonce);
          })
          .catch((err) => {
            console.error('[iiif-map-viewer] render failed', err);
            self.error(err && err.message ? err.message : String(err));
          });
        return self._renderQueue;
      }

      function wireLayerVm(layerVm) {
        if (!ko.isObservable(layerVm.visible)) {
          layerVm.visible = ko.observable(!!layerVm.visible);
        }
        if (!ko.isObservable(layerVm.opacity)) {
          layerVm.opacity = ko.observable(
            Number.isFinite(+layerVm.opacity) ? +layerVm.opacity : 1
          );
        }

        layerVm.visible.subscribe(async (v) => {
          if (typeof layerVm._setVisible === 'function') {
            await layerVm._setVisible(!!v);
          }
        });

        layerVm.opacity.subscribe((v) => {
          if (typeof layerVm._setOpacity === 'function') {
            layerVm._setOpacity(v);
          }
        });

        return layerVm;
      }

      self.initMap = (div) => {
        self._map = new maplibregl.Map({
          container: div,
          style: params.basemapStyleUrl || 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
          center: [19, 52],
          zoom: 5,
          maxZoom: 32
        });

        self._map.addControl(new maplibregl.NavigationControl(), 'top-right');
        // measure.install(self._map); // REMOVE: too early

        self._map.on('click', async (e) => {
          self.measureCoords(measure.formatCoords(e.lngLat));
          if (self.measureMode()) return measure.onClick(e);

          if (!self.elevationMode()) return;
          const demLayer = dem.pickLayer(self.layers());
          await dem.fetchAt(e.lngLat.lng, e.lngLat.lat, demLayer);
        });

        self._map.on('mousemove', (e) => {
          if (self.measureMode()) measure.onMouseMove(e);
        });

        self._map.on('load', async () => {
          measure.install(self._map); // ADD: safe point, style is ready
          self.mapReady(true);
          await scheduleRender(true);
        });
      };

      async function render(force, nonce) {
        if (!self._map || !self.mapReady() || self._disposed) return;
        const m = ko.unwrap(self.manifest);
        if (!m) return;

        self.error('');

        const prev = self.layers();
        if (Array.isArray(prev) && prev.length) {
          layerManager.clear(self._map, prev);
        }

        const built = await layerManager.build(self._map, m);

        // stale render guard
        if (self._disposed || nonce !== self._renderNonce) {
          layerManager.clear(self._map, built);
          return;
        }

        const wired = built.map(wireLayerVm);
        self.layers(wired);

        if (force) layerManager.fitToLayers(self._map, wired);
      }

      // FIX: template uses click: fit
      self.fit = () => {
        if (!self._map) return;
        layerManager.fitToLayers(self._map, self.layers());
      };

      self.toggleMeasure = () => {
        const on = !self.measureMode();
        self.measureMode(on);
        measure.setEnabled(on);
        if (!on) measure.clear();
      };

      self.clearMeasure = () => measure.clear();

      self.toggleElevation = () => {
        const on = !self.elevationMode();
        self.elevationMode(on);
        self.elevationError('');
        if (!on) self.elevationValue('');
      };

      self._renderSub = ko.computed(() => {
        ko.unwrap(self.manifest); // dependency
        if (!self.mapReady()) return;
        scheduleRender(false);
      });

      self.dispose = () => {
        self._disposed = true;
        self._renderNonce++;
        try { if (self._renderSub) self._renderSub.dispose(); } catch (e) {}
        try { if (self._map) self._map.remove(); } catch (e) {}
      };

      return self;
    }
  },

  template: iiifMapViewerTemplate
});

export default ko.components;