import ko from 'knockout';
import maplibregl from 'maplibre-gl';
import '../../../../css/components/iiif_viewer/index.css';

import iiifMapViewerTemplate from 'templates/views/components/iiif/iiif-map-viewer.htm';

import { installIiifInfoJsonPatch } from './lib/iiif-infojson-patch';
import { createAllmapsLayerManager } from './map/allmaps-layer-manager';
import { createMeasureController } from './map/measure-controller';
import { createDemSampler } from './map/dem-sampling';

import { createLeafletViewer } from './viewers/iiif-leaflet-viewer';
import { createLeafletImageState } from './state/leaflet-image-state';
import { createLeafletMeasureController } from './features/leaflet-measure-controller';
import { createLeafletDemPickerController } from './features/leaflet-dem-picker-controller';
import { createLeafletAnnotationController } from './features/leaflet-annotation-controller';
import { manifestHasAnyGeoref, mdValue, parseTransformFromCanvas, pickDemCanvasFromManifest } from './lib/iiif-manifest-utils';
import { fetchDemPixelValue } from './lib/dem-pixel-api';
import {
  findCanvasById,
  formatLeafletClickReadout,
  parseMapCoordsFromReadout,
  parsePixelCoordsFromReadout
} from './lib/leaflet-click-utils';

import {affineForward, affineInverse, clamp} from './lib/affine-utils';
// Binding: data-bind="iiifMapInit: initMap"
ko.bindingHandlers.iiifMapInit = {
  init(element, valueAccessor) {
    const initFn = ko.unwrap(valueAccessor());
    if (typeof initFn === 'function') initFn(element);
    return { controlsDescendantBindings: false };
  }
};
ko.components.register('iiif-map-viewer', {
  viewModel: {
    createViewModel: function (params) {
      const self = {};
      installIiifInfoJsonPatch();
      self.manifest = params.manifest;

      // ---- Annotation hooks (optional, used by workflow annotator step) ----
      self.existingAnnotations = params.existingAnnotations || ko.observableArray([]);
      self.onAnnotationCreated = typeof params.onAnnotationCreated === 'function' ? params.onAnnotationCreated : null;
      self.onAnnotationDeleted = typeof params.onAnnotationDeleted === 'function' ? params.onAnnotationDeleted : null;

      self.onConfirmPendingAnnotations =
        typeof params.onConfirmPendingAnnotations === 'function' ? params.onConfirmPendingAnnotations : null;

      self.onResetPendingAnnotations =
        typeof params.onResetPendingAnnotations === 'function' ? params.onResetPendingAnnotations : null;

      self.canResetPendingAnnotations = ko.pureComputed(function() {
        return !!ko.unwrap(params.canResetPendingAnnotations);
      });

      self.resetPendingAnnotations = () => {
        if (!self.onResetPendingAnnotations) return;
        self.onResetPendingAnnotations();
      };

      self.pendingAnnotationsCount = ko.pureComputed(function() {
        const n = Number(ko.unwrap(params.pendingAnnotationsCount));
        return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
      });

      self.confirmPendingAnnotations = () => {
        if (!self.onConfirmPendingAnnotations) return;
        self.onConfirmPendingAnnotations();
      };

      self.status = ko.observable('');
      self.error = ko.observable('');

      // Unified UI
      self.renderMode = ko.observable('map'); // 'map' | 'image'
      self.fallbackReason = ko.observable('');
      self.canToggleRenderMode = ko.observable(false);

      // MAP mode: Allmaps layers UI
      self.layers = ko.observableArray([]);

      // MAP mode measure / elevation
      self.measureMode = ko.observable(false);
      self.measureDistance = ko.observable('');
      self.measureCoords = ko.observable('');

      self.elevationMode = ko.observable(true);

      Object.assign(self, createLeafletImageState({
        ko,
        annotationEnabled: !!self.onAnnotationCreated
      }));

      // Annotation modal state
      self.showAnnotationDialog = ko.observable(false);
      self.openAnnotationDialog = () => {
        if (!self.annotationEnabled || !self.annotationEnabled()) return;
        self.showAnnotationDialog(true);
      };
      self.closeAnnotationDialog = () => {
        self.showAnnotationDialog(false);
      };

      self.setImageGroup = async (g) => {
        const group = (g === 'dem') ? 'dem' : 'ortho';
        self.imageGroup(group);
        if (self.renderMode() === 'image') {
          await leafletViewer.setGroup(group);
          syncLeafletViewerState();
        }
      };

      function deactivateImageTool(toolName) {
        if (toolName === 'annotate') {
          leafletAnnotation.clearDraft();
          self.annotationStatus('');
        }
        if (toolName === 'measure') {
          leafletMeasure.clear();
        }
        if (toolName === 'dem-pick') {
          leafletDemPicker.clear();
        }
      }

      function activateImageTool(toolName) {
        const current = self.getActiveImageTool();
        if (current === toolName) {
          deactivateImageTool(toolName);
          self.clearActiveImageTool();
          setLeafletCursor();
          return false;
        }

        if (current && current !== 'none') {
          deactivateImageTool(current);
        }

        self.setActiveImageTool(toolName);

        if (toolName === 'annotate') {
          self.annotationStatus('Annotation mode: click to add vertices, double-click to Finish.');
        } else {
          self.annotationStatus('');
        }

        setLeafletCursor();
        return true;
      }

      // ---- Annotation public methods ----
      self.toggleAnnotationMode = () => {
        if (!self.annotationEnabled()) return;
        activateImageTool('annotate');
      };

      self.disableActiveImageTool = () => {
        const current = self.getActiveImageTool();
        if (!current || current === 'none') return;
        deactivateImageTool(current);
        self.clearActiveImageTool();
        setLeafletCursor();
      };

      self.finishAnnotation = () => {
        if (!self.annotationEnabled()) return;
        leafletAnnotation.finishDraft();
      };

      self.cancelAnnotation = () => {
        if (!leafletAnnotation) return;
        if (typeof leafletAnnotation.resetAnnotations === 'function') {
          leafletAnnotation.resetAnnotations();
        } else {
          leafletAnnotation.clearDraft();
        }
      };

      function setLeafletCursor() {
        const map = leafletViewer && leafletViewer._map;
        const el = map && typeof map.getContainer === 'function' ? map.getContainer() : null;
        if (!el) return;
        el.style.cursor = (self.isActiveImageTool('dem-pick') || self.isActiveImageTool('annotate')) ? 'crosshair' : '';
      }

      function getCurrentManifest() {
        return ko.unwrap(self.manifest);
      }

      function resetElevationReadout() {
        self.elevationLoading(false);
        self.elevationError('');
        self.elevationValue('');
      }

      function canUseMapRenderMode(manifest = getCurrentManifest()) {
        return !!(manifest && self._map && self.mapReady() && manifestHasAnyGeoref(manifest));
      }

      function syncLeafletViewerState() {
        self.leafletBaseCanvasId(leafletViewer.baseCanvasId());
        self.leafletCanvasOptions(leafletViewer.canvasOptions());
        self.leafletLayers(leafletViewer.layers());
      }

      function getLeafletBaseContext(manifest = getCurrentManifest()) {
        const baseId = self.leafletBaseCanvasId();
        const canvas = findCanvasById(manifest, baseId);
        return {
          baseId,
          canvas,
          transform: parseTransformFromCanvas(canvas)
        };
      }

      function refreshLeafletAnnotations() {
        try { leafletAnnotation.refresh(); } catch (_) {}
      }

      async function sampleDemPixel(manifest, x, y) {
        self.elevationLoading(true);
        self.elevationError('');

        try {
          const json = await fetchDemPixelValue({ manifest, x, y });
          self.elevationValue(`${json.value} m`);
        } catch (err) {
          self.elevationError('DEM pixel error: ' + String(err?.message || err));
        } finally {
          self.elevationLoading(false);
        }
      }

      function resolveDemMeasurementTarget(manifest, readout) {
        if (!manifest) return { error: 'Brak manifestu.' };

        if (self.imageGroup() === 'dem') {
          const pixelCoords = parsePixelCoordsFromReadout(readout);
          if (!pixelCoords) {
            return { error: 'Nie mozna odczytac wspolrzednych piksela.' };
          }
          return pixelCoords;
        }

        const mapCoords = parseMapCoordsFromReadout(readout);
        if (!mapCoords) {
          return { error: 'Nie mozna odczytac wspolrzednych mapy.' };
        }

        const demCanvas = pickDemCanvasFromManifest(manifest);
        if (!demCanvas) {
          return { error: 'Brak canvas DEM.' };
        }

        const transform = parseTransformFromCanvas(demCanvas);
        if (!transform) {
          return { error: 'Brak transformacji DEM.' };
        }

        const projected = affineInverse(transform, mapCoords.x, mapCoords.y);
        if (!Array.isArray(projected) || projected.length !== 2) {
          return { error: 'Nie mozna przeliczyc wspolrzednych DEM.' };
        }

        return { x: projected[0], y: projected[1] };
      }

      function ensureLeafletBaseSync() {
        if (!self._leafletBaseSub) {
          self._leafletBaseSub = self.leafletBaseCanvasId.subscribe(() => {
            const locked = leafletViewer.baseCanvasId();
            if (self.leafletBaseCanvasId() !== locked) self.leafletBaseCanvasId(locked);
          });
        }

        if (!self._leafletBaseSub2) {
          self._leafletBaseSub2 = leafletViewer.baseCanvasId.subscribe((id) => {
            if (self.leafletBaseCanvasId() !== id) self.leafletBaseCanvasId(id);
            refreshLeafletAnnotations();
          });
        }
      }

      const layerManager = createAllmapsLayerManager({
        setStatus: self.status,
        setError: self.error
      });

      const dem = createDemSampler({
        setLoading: self.elevationLoading,
        setValue: self.elevationValue,
        setError: self.elevationError
      });

      const leafletMeasure = createLeafletMeasureController({
        state: self,
        getMap: () => (leafletViewer && leafletViewer._map) ? leafletViewer._map : null,
        getLeaflet: () => (leafletViewer && leafletViewer._L) ? leafletViewer._L : window.L,
        affineForward
      });

      const leafletDemPicker = createLeafletDemPickerController({
        state: self,
        getMap: () => (leafletViewer && leafletViewer._map) ? leafletViewer._map : null,
        getLeaflet: () => (leafletViewer && leafletViewer._L) ? leafletViewer._L : window.L,
        getManifest: () => getCurrentManifest(),
        getImageGroup: () => self.imageGroup(),
        parseTransformFromCanvas,
        pickDemCanvasFromManifest,
        affineForward,
        affineInverse
      });

      const leafletAnnotation = createLeafletAnnotationController({
        state: self,
        getMap: () => (leafletViewer && leafletViewer._map) ? leafletViewer._map : null,
        getLeaflet: () => (leafletViewer && leafletViewer._L) ? leafletViewer._L : window.L,
        getManifest: () => getCurrentManifest(),
        getBaseCanvasId: () => self.leafletBaseCanvasId(),
        getExistingAnnotations: () => ko.unwrap(self.existingAnnotations) || [],
        getCanvasMaxZoom: (canvasId) =>
          (leafletViewer && typeof leafletViewer.getCanvasMaxZoom === 'function')
            ? leafletViewer.getCanvasMaxZoom(canvasId)
            : null,
        onAnnotationCreated: self.onAnnotationCreated,
        onAnnotationDeleted: self.onAnnotationDeleted,
        parseTransformFromCanvas,
        affineForward,
        affineInverse,
        clamp,
        mdValue
      });

      const measure = createMeasureController({
        setDistance: self.measureDistance,
        setCoords: self.measureCoords
      });

      // Leaflet viewer instance
      const leafletViewer = createLeafletViewer({
        setStatus: self.status,
        setError: self.error,
        onMapClick: (info) => {
          const manifest = getCurrentManifest();
          const { canvas, transform } = getLeafletBaseContext(manifest);
          self.clickedCoords(formatLeafletClickReadout(info, transform, affineForward));

          // ---- Annotation mode: collect polygon vertices ----
          if (self.isActiveImageTool('annotate')) {
            leafletAnnotation.handleMapClick(info);
            return;
          }

          // ---- DEM pick mode: click once => marker + sample ----
          if (self.isActiveImageTool('dem-pick')) {
            deactivateImageTool('dem-pick');
            self.clearActiveImageTool();
            setLeafletCursor();
            leafletDemPicker.handleMapClick(info, canvas, transform).catch((e) => {
              self.elevationError('DEM pixel error: ' + String(e?.message || e));
            });
            return;
          }

          if (self.isActiveImageTool('measure')) {
            leafletMeasure.handleMapClick(info, transform);
          }
        }
      });

      self._map = null;
      self._mapDiv = null;
      self._leafletDiv = null;

      self.mapReady = ko.observable(false);
      self._disposed = false;
      self._renderNonce = 0;
      self._renderQueue = Promise.resolve();

      function setMode(mode, reason) {
        self.renderMode(mode);
        self.fallbackReason(reason || '');

        const manifest = getCurrentManifest();
        const canMap = canUseMapRenderMode(manifest);
        const canImage = !!(self._leafletDiv);
        self.canToggleRenderMode(Boolean(canMap && canImage));
      }

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

      function wireMapLayerVm(layerVm) {
        if (!ko.isObservable(layerVm.visible)) layerVm.visible = ko.observable(!!layerVm.visible);
        if (!ko.isObservable(layerVm.opacity)) layerVm.opacity = ko.observable(
          Number.isFinite(+layerVm.opacity) ? +layerVm.opacity : 1
        );

        layerVm.visible.subscribe(async (v) => {
          if (typeof layerVm._setVisible === 'function') await layerVm._setVisible(!!v);
        });

        layerVm.opacity.subscribe((v) => {
          if (typeof layerVm._setOpacity === 'function') layerVm._setOpacity(v);
        });

        return layerVm;
      }

      async function ensureLeafletReady(manifest) {
        if (!self._leafletDiv) return;
        if (!leafletViewer.ready()) {
          await leafletViewer.init(self._leafletDiv);
          leafletAnnotation.attachDoubleClickFinish();
        }
        
        // Keep the current manifest in the viewer before switching the canvas group.
        await leafletViewer.setManifest(manifest);
        if (typeof leafletViewer.setGroup === 'function') {
          await leafletViewer.setGroup(self.imageGroup());
        }

        syncLeafletViewerState();
        setLeafletCursor();

        refreshLeafletAnnotations();

        ensureLeafletBaseSync();
      }

      self.initMap = (rootEl) => {
        self._mapDiv = rootEl.querySelector('.iiif-maplibre-container');
        self._leafletDiv = rootEl.querySelector('.iiif-leaflet-container');


        self._map = new maplibregl.Map({
          container: self._mapDiv,
          style: params.basemapStyleUrl || 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
          center: [19, 52],
          zoom: 5,
          maxZoom: 32
        });
        self._map.addControl(new maplibregl.NavigationControl(), 'top-right');

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
          measure.install(self._map);
          self.mapReady(true);
          await scheduleRender(true);
        });
      };

      async function render(force, nonce) {
        if (self._disposed) return;
        const manifest = getCurrentManifest();
        if (!manifest) return;

        self.error('');

        const hasGeoref = manifestHasAnyGeoref(manifest);

        if (!hasGeoref) {
          setMode('image', 'No georeference metadata (has_georef=false). Showing raster as image layers.');
          self.elevationMode(false);
          resetElevationReadout();
          await ensureLeafletReady(manifest);
          return;
        }

        if (!self._map || !self.mapReady()) return;

        const prev = self.layers();
        if (Array.isArray(prev) && prev.length) layerManager.clear(self._map, prev);

        const built = await layerManager.build(self._map, manifest);

        if (self._disposed || nonce !== self._renderNonce) {
          layerManager.clear(self._map, built);
          return;
        }

        if (!Array.isArray(built) || built.length === 0) {
          setMode('image', 'Allmaps could not build any displayable layers. Falling back to image-only Leaflet view.');
          await ensureLeafletReady(manifest);
          return;
        }

        setMode('map', '');

        const wired = built.map(wireMapLayerVm);
        self.layers(wired);

        if (force) layerManager.fitToLayers(self._map, wired);
      }

      self.fit = () => {
        if (self.renderMode() !== 'map') return;
        if (!self._map) return;
        layerManager.fitToLayers(self._map, self.layers());
      };

      self.toggleMeasure = () => {
        if (self.renderMode() !== 'map') return;
        const on = !self.measureMode();
        self.measureMode(on);
        measure.setEnabled(on);
        if (!on) measure.clear();
      };

      self.clearMeasure = () => measure.clear();

      self.toggleElevation = () => {
        if (self.renderMode() !== 'map') return;
        const on = !self.elevationMode();
        self.elevationMode(on);
        self.elevationError('');
        if (!on) self.elevationValue('');
      };

      self.toggleLeafletDemPick = () => {
        activateImageTool('dem-pick');
      };

      self.toggleLeafletMeasure = () => {
        activateImageTool('measure');
      };
      self.clearLeafletMeasure = () => {
        leafletMeasure.clear();
      };

      self.toggleRenderMode = async () => {
        const manifest = getCurrentManifest();
        if (!manifest) return;

        if (self.renderMode() === 'image') {
          if (!manifestHasAnyGeoref(manifest)) {
            self.fallbackReason('Cannot switch to map mode: no georeference metadata.');
            return;
          }
          self.renderMode('map');
          self.fallbackReason('');
          await scheduleRender(true);
          return;
        }

        self.renderMode('image');
        self.fallbackReason('User switched to image-only mode.');
        await ensureLeafletReady(manifest);
      };

      self._renderSub = ko.computed(() => {
        getCurrentManifest();
        if (!self.mapReady()) return;
        scheduleRender(false);
      });

      // Keep annotation overlays synced when existingAnnotations list changes
      self._annoSyncSub = ko.computed(() => {
        const _ = ko.unwrap(self.existingAnnotations);
        const mode = self.renderMode();
        const ready = leafletViewer && leafletViewer.ready && leafletViewer.ready();
        if (mode === 'image' && ready) {
          refreshLeafletAnnotations();
        }
        return _;
      });

      self.dispose = () => {
        self._disposed = true;
        self._renderNonce++;
        self.showAnnotationDialog(false);

        try { if (self._renderSub) self._renderSub.dispose(); } catch (_) {}
        try { if (self._annoSyncSub) self._annoSyncSub.dispose(); } catch (_) {}

        try { leafletMeasure.dispose(); } catch (_) {}
        try { leafletDemPicker.dispose(); } catch (_) {}
        try { leafletAnnotation.dispose(); } catch (_) {}

        try {
          leafletViewer.dispose();
        } catch (_) {}

        try { if (self._leafletBaseSub) self._leafletBaseSub.dispose(); } catch (_) {}
        try { if (self._leafletBaseSub2) self._leafletBaseSub2.dispose(); } catch (_) {}

        try { if (self._map) self._map.remove(); } catch (_) {}

        self._map = null;
        self._mapDiv = null;
        self._leafletDiv = null;
        self.disableActiveImageTool();
      };

      // Read DEM value from the last clicked point in the image view.
      self.measureDemPixel = async () => {
        const manifest = getCurrentManifest();
        const coords = self.clickedCoords();
        const target = coords ? resolveDemMeasurementTarget(manifest, coords) : null;
        if (!coords) {
          self.elevationError('Najpierw kliknij na mapie, aby pobrac wspolrzedne.');
          return;
        }

        if (target?.error) {
          self.elevationError(target.error);
          return;
        }

        if (!target) {
          self.elevationError('Nie mozna przygotowac punktu DEM.');
          return;
        }

        await sampleDemPixel(manifest, target.x, target.y);
        return;
      };

      return self;
    }
  },

  template: iiifMapViewerTemplate
});

export default ko.components;
