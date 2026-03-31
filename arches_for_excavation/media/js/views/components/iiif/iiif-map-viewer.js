import ko from 'knockout';
import $ from 'jquery';
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
import { canvasHasGeoref, ensureAbsoluteUrl,extractServiceUrlFromCanvas,
  extractTitilerFilePathFromServiceUrl, manifestHasAnyGeoref, mdValue,
  mdBool, parseTransformFromCanvas, pickDemCanvasFromManifest
} from './lib/iiif-manifest-utils';

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
          // zsynchronizuj UI po rebuild
          self.leafletBaseCanvasId(leafletViewer.baseCanvasId());
          self.leafletCanvasOptions(leafletViewer.canvasOptions());
          self.leafletLayers(leafletViewer.layers());
          //try { leafletAnnotation.refresh(); } catch (_) {}
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
        const on = activateImageTool('annotate');
        if (on) {
          console.log('[iiif-map-viewer] Annotation mode ENABLED');
        } else {
          console.log('[iiif-map-viewer] Annotation mode DISABLED');
        }
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
        leafletAnnotation.clearDraft();
      };
      function setLeafletCursor() {
        const map = leafletViewer && leafletViewer._map;
        const el = map && typeof map.getContainer === 'function' ? map.getContainer() : null;
        if (!el) return;
        el.style.cursor = (self.isActiveImageTool('dem-pick') || self.isActiveImageTool('annotate')) ? 'crosshair' : '';
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
        getManifest: () => ko.unwrap(self.manifest),
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
        getManifest: () => ko.unwrap(self.manifest),
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
          const m = ko.unwrap(self.manifest);
          const baseId = self.leafletBaseCanvasId();
          const canvas = Array.isArray(m?.items)
            ? m.items.find(c => (c.id || c['@id']) === baseId)
            : null;
          const tr = parseTransformFromCanvas(canvas);

          // DODATKOWE LOGI
          const container = self._leafletDiv;
          const mapBounds = leafletViewer._map?.getBounds?.();
          const mapZoom = leafletViewer._map?.getZoom?.();
          const mapSize = leafletViewer._map?.getSize?.();


          // Jeśli chcesz zobaczyć event kliknięcia:
          // (dodaj do createLeafletViewer przekazywanie e.originalEvent)
          // console.log('Original event:', info.originalEvent);

          if (tr) {
            const [X, Y] = affineForward(tr, info.x, info.y, info.s);
            self.clickedCoords(
              `Pixel: ${info.x *2**info.s}, ${info.y *2**info.s} / ${info.width}x${info.height} | Map: ${X.toFixed(6)}, ${Y.toFixed(6)}`
            );
          } else {
            self.clickedCoords(
              `Pixel: ${info.x}, ${info.y} / ${info.width}x${info.height}`
            );
          }

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
            leafletDemPicker.handleMapClick(info, canvas, tr).catch((e) => {
              self.elevationError('DEM pixel error: ' + String(e?.message || e));
            });
            return;
          }

          if (self.isActiveImageTool('measure')) {
            leafletMeasure.handleMapClick(info, tr);
            return;
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

        const m = ko.unwrap(self.manifest);
        const canMap = !!(self._map && self.mapReady() && manifestHasAnyGeoref(m));
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
        if (typeof leafletViewer.setGroup === 'function') {
          await leafletViewer.setGroup(self.imageGroup());
        } else {
          await leafletViewer.setManifest(manifest);
        }


        self.leafletBaseCanvasId(leafletViewer.baseCanvasId());
        self.leafletCanvasOptions(leafletViewer.canvasOptions());
        self.leafletLayers(leafletViewer.layers());
        setLeafletCursor();

        leafletAnnotation.refresh();

        // Base is locked in Leaflet viewer: keep UI synced one-way only.
        if (!self._leafletBaseSub) {
          self._leafletBaseSub = self.leafletBaseCanvasId.subscribe(() => {
            const locked = leafletViewer.baseCanvasId();
            if (self.leafletBaseCanvasId() !== locked) self.leafletBaseCanvasId(locked);
          });
        }
        if (!self._leafletBaseSub2) {
          self._leafletBaseSub2 = leafletViewer.baseCanvasId.subscribe((id) => {
            if (self.leafletBaseCanvasId() !== id) self.leafletBaseCanvasId(id);
            try { leafletAnnotation.refresh(); } catch (_) {}
          });
        }
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
        const m = ko.unwrap(self.manifest);
        if (!m) return;

        self.error('');

        const hasGeoref = manifestHasAnyGeoref(m);

        // AUTO mode decision: if no georef -> Leaflet image-only
        if (!hasGeoref) {
          setMode('image', 'No georeference metadata (has_georef=false). Showing raster as image layers.');
          self.elevationMode(false);
          self.elevationError('');
          self.elevationValue('');          
          await ensureLeafletReady(m);
          return;
        }

        // Has georef -> try map mode Allmaps
        if (!self._map || !self.mapReady()) return;

        // Clear previous map layers
        const prev = self.layers();
        if (Array.isArray(prev) && prev.length) layerManager.clear(self._map, prev);

        const built = await layerManager.build(self._map, m);

        // Stale render guard
        if (self._disposed || nonce !== self._renderNonce) {
          layerManager.clear(self._map, built);
          return;
        }

        if (!Array.isArray(built) || built.length === 0) {
          // georef exists, but cannot build -> fallback to Leaflet
          setMode('image', 'Allmaps could not build any displayable layers. Falling back to image-only Leaflet view.');
          await ensureLeafletReady(m);
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
        const m = ko.unwrap(self.manifest);
        if (!m) return;

        if (self.renderMode() === 'image') {
          if (!manifestHasAnyGeoref(m)) {
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
        await ensureLeafletReady(m);
      };

      self._renderSub = ko.computed(() => {
        ko.unwrap(self.manifest);
        if (!self.mapReady()) return;
        scheduleRender(false);
      });

      // Keep annotation overlays synced when existingAnnotations list changes
      self._annoSyncSub = ko.computed(() => {
        const _ = ko.unwrap(self.existingAnnotations);
        const mode = self.renderMode();
        const ready = leafletViewer && leafletViewer.ready && leafletViewer.ready();
        if (mode === 'image' && ready) {
          try { leafletAnnotation.refresh(); } catch (e) { console.error(e); }
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

      // Nowa funkcja do pomiaru wartości piksela DEM
      self.measureDemPixel = async () => {
        const m = ko.unwrap(self.manifest);
        const coords = self.clickedCoords();
        if (!coords) {
          self.elevationError('Najpierw kliknij na mapie, aby pobrać współrzędne.');
          return;
        }

        // Sprawdź, czy jesteśmy na warstwie DEM (imageGroup === 'dem')
        if (self.imageGroup && self.imageGroup() === 'dem') {
          // Wyciągnij pixel x, y z tekstu np. "Pixel: 123, 456 / ..."
          const match = coords.match(/Pixel:\s*(\d+),\s*(\d+)/);
          if (!match) {
            self.elevationError('Nie można odczytać współrzędnych piksela.');
            return;
          }
          const x = parseInt(match[1], 10);
          const y = parseInt(match[2], 10);
          console.log('Pixel coords for DEM sampling:', { x, y });
          try {
            self.elevationLoading(true);
            self.elevationError('');
            const resp = await fetch('/api/iiif/dem/pixel-value', {
              method: 'POST',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ manifest: m, x, y })
            });
            const json = await resp.json();
            if (!resp.ok) throw new Error(json?.error || 'HTTP ' + resp.status);
            self.elevationValue(`${json.value} m`);
          } catch (err) {
            self.elevationError('DEM pixel error: ' + String(err?.message || err));
          } finally {
            self.elevationLoading(false);
          }
          return;
        }

        // W przeciwnym razie (np. orto) użyj transformacji afinicznej
        const match = coords.match(/Map:\s*([-\d.]+),\s*([-\d.]+)/);
        if (!match) {
          self.elevationError('Nie można odczytać współrzędnych mapy.');
          return;
        }
        const X = parseFloat(match[1]);
        const Y = parseFloat(match[2]);
        const demCanvas = pickDemCanvasFromManifest(m);
        if (!demCanvas) {
          self.elevationError('Brak canvas DEM.');
          return;
        }
        const tr = parseTransformFromCanvas(demCanvas);
        if (!tr) {
          self.elevationError('Brak transformacji DEM.');
          return;
        }
        const [demX, demY] = affineInverse(tr, X, Y);
        console.log('Affine inverse coords:', { X, Y, demX, demY });
        try {
          self.elevationLoading(true);
          self.elevationError('');
          const resp = await fetch('/api/iiif/dem/pixel-value', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ manifest: m, x: demX, y: demY })
          });
          const json = await resp.json();
          if (!resp.ok) throw new Error(json?.error || 'HTTP ' + resp.status);
          self.elevationValue(`${json.value} m`);
        } catch (err) {
          self.elevationError('DEM pixel error: ' + String(err?.message || err));
        } finally {
          self.elevationLoading(false);
        }
      };

      return self;
    }
  },

  template: iiifMapViewerTemplate
});

export default ko.components;
