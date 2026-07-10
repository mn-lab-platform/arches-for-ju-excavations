import ko from 'knockout';
import { Viewer, UIBasic, LayerRTI, Layout, Skin, ControllerPanZoom } from 'openlime';

import rtiViewerTemplate from 'templates/views/components/iiif/iiif-RTI-viewer.htm';

const LOG = '[iiif-rti-viewer]';
const RIGHT_MOUSE_BUTTON = 2;
const ALL_MODIFIER_STATES = [0, 1, 2, 3, 4, 5, 6, 7];
const MOUSE_BUTTON_MASKS = {
  0: 1,
  1: 4,
  2: 2
};

ko.bindingHandlers.rtiViewerInit = {
  init(element, valueAccessor) {
    const initFn = ko.unwrap(valueAccessor());
    if (typeof initFn === 'function') {
      setTimeout(() => initFn(element), 0);
    }
    return { controlsDescendantBindings: false };
  }
};

function unwrapParam(value, fallback) {
  const unwrapped = ko.unwrap(value);
  return unwrapped === undefined || unwrapped === null ? fallback : unwrapped;
}

function normalizeServiceUrl(url) {
  return String(url || '').replace(/\/info\.json$/i, '').replace(/\/$/, '');
}

function planeInfoUrl(planes, planeName) {
  const plane = planes.find(item => item.name === planeName);

  if (!plane || !plane.iiif_service_url) {
    throw new Error('Missing IIIF service for RTI plane: ' + planeName);
  }

  return normalizeServiceUrl(plane.iiif_service_url) + '/info.json';
}

function buildFallbackScaleFactors(width, height, tileSize) {
  const scaleFactors = [1];
  const maxDim = Math.max(Number(width) || 1, Number(height) || 1);

  while (Math.ceil(maxDim / scaleFactors[scaleFactors.length - 1]) > tileSize) {
    scaleFactors.push(scaleFactors[scaleFactors.length - 1] * 2);
  }

  return scaleFactors;
}

function rotatePoint(x, y, angle) {
  const radians = Math.PI * (angle / 180);

  return {
    x: Math.cos(radians) * x - Math.sin(radians) * y,
    y: Math.sin(radians) * x + Math.cos(radians) * y
  };
}

class RightButtonPanZoom extends ControllerPanZoom {
  constructor(camera, options = {}) {
    super(camera, options);
    this.mouseButton = options.mouseButton ?? RIGHT_MOUSE_BUTTON;
  }

  matchesMouseButton(event) {
    if (event.button === this.mouseButton) {
      return true;
    }

    // OpenLIME starts pan from pointermove; there `button` is often -1.
    if (typeof event.buttons === 'number') {
      const buttonMask = MOUSE_BUTTON_MASKS[this.mouseButton];
      return (event.buttons & buttonMask) === buttonMask;
    }

    return false;
  }

  panStart(event) {
    if (!this.matchesMouseButton(event)) {
      return;
    }

    super.panStart(event);
  }

  panMove(event) {
    if (!this.panning) {
      return;
    }

    super.panMove(event);
  }

  panEnd(event) {
    if (!this.panning) {
      return;
    }

    super.panEnd(event);
  }

  fingerDoubleTap(_event) {
    // Disable double-tap / double-click zoom from this controller.
    // This avoids accidental conflicts with RTI light interaction.
    return;
  }
}

function keepRtiMouseMode(ui, panZoom) {
  if (!ui) return;

  if (ui.panzoom) {
    ui.panzoom.active = false;
  }

  if (panZoom) {
    panZoom.active = true;
    panZoom.activeModifiers = ALL_MODIFIER_STATES;
  }

  if (ui.lightcontroller) {
    ui.lightcontroller.active = true;
    ui.lightcontroller.activeModifiers = ALL_MODIFIER_STATES;
  }

  ui.lightActive = true;
}

function disableUiAction(actions, actionName) {
  const action = actions && actions[actionName];
  if (!action) return;

  action.display = false;
  action.active = false;
  action.task = function() {};
  delete action.key;
}

function showUiAction(actions, actionName) {
  if (actions && actions[actionName]) {
    actions[actionName].display = true;
  }
}

function configureOpenLimeUi(ui, panZoom) {
  const previousPostInit = ui.postInit;
  const keepMouseMode = () => keepRtiMouseMode(ui, panZoom);

  disableUiAction(ui.actions, 'home');
  disableUiAction(ui.actions, 'light');
  showUiAction(ui.actions, 'layers');
  showUiAction(ui.actions, 'zoomin');
  showUiAction(ui.actions, 'zoomout');

  ui.toggleLightController = function() {
    keepMouseMode();
    return true;
  };

  ui.postInit = function() {
    if (typeof previousPostInit === 'function') {
      previousPostInit.call(ui);
    }

    keepMouseMode();
  };

  keepMouseMode();
}

function createRightButtonPanZoom(viewer) {
  const panZoom = new RightButtonPanZoom(viewer.camera, {
    priority: 1000,
    activeModifiers: ALL_MODIFIER_STATES,
    mouseButton: RIGHT_MOUSE_BUTTON,
    controlZoom: false,
    zoomAmount: 1.2
  });

  viewer.addController(panZoom);
  return panZoom;
}

function preventContextMenuOnRightDrag(viewer) {
  const handler = function(event) {
    event.preventDefault();
  };

  viewer.containerElement.addEventListener('contextmenu', handler);
  return handler;
}

function createIiifLayout(planes, onSize) {
  const layout = new Layout(null, 'iiif');

  layout.imageUrl = function(_metadataUrl, planeName) {
    return planeInfoUrl(planes, planeName);
  };

  layout.initIIIF = async function() {
    const infoUrl = this.urls[0];
    this.overlap = 0;

    const response = await fetch(infoUrl, { credentials: 'same-origin' });
    if (!response.ok) {
      this.status = 'Failed loading ' + infoUrl + ': ' + response.statusText;
      throw new Error(this.status);
    }

    const info = await response.json();
    const tileInfo = info.tiles && info.tiles[0];
    const tileSize = Number(
      (tileInfo && tileInfo.width) ||
      info.tile_width ||
      info.tileWidth ||
      256
    );

    const scaleFactors = tileInfo && Array.isArray(tileInfo.scaleFactors)
      ? tileInfo.scaleFactors
      : buildFallbackScaleFactors(info.width, info.height, tileSize);

    this.width = Number(info.width);
    this.height = Number(info.height);
    this.nlevels = scaleFactors.length;
    this.tilesize = tileSize;

    if (!this.width || !this.height) {
      this.status = 'IIIF info.json is missing width/height';
      throw new Error(this.status);
    }

    if (typeof onSize === 'function') {
      onSize({
        width: this.width,
        height: this.height
      });
    }

    this.getTileURL = (rasterId, tile) => {
      const serviceUrl = this.urls[rasterId].slice(0, this.urls[rasterId].lastIndexOf('/'));
      const scale = 2 ** (this.nlevels - 1 - tile.level);
      const regionX = tile.x * this.tilesize * scale;
      const regionY = tile.y * this.tilesize * scale;
      const regionW = Math.min(this.tilesize * scale, this.width - regionX);
      const regionH = Math.min(this.tilesize * scale, this.height - regionY);
      const sizeW = Math.ceil(regionW / scale);
      const sizeH = Math.ceil(regionH / scale);

      return `${serviceUrl}/${regionX},${regionY},${regionW},${regionH}/${sizeW},${sizeH}/0/default.jpg`;
    };
  };

  return layout;
}

async function assertIiifIsReachable(planes) {
  const response = await fetch(planeInfoUrl(planes, 'plane_0'), { credentials: 'same-origin' });

  if (!response.ok) {
    throw new Error('IIIF plane_0 is not reachable: ' + response.status + ' ' + response.statusText);
  }
}

function ensureStylesheet(href) {
  if (!href || document.querySelector('link[href="' + href + '"]')) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

function validateViewerInputs(container, metadataUrl, planes) {
  if (!container) {
    throw new Error('Missing RTI viewer container');
  }

  if (!metadataUrl) {
    throw new Error('Missing RTI metadataUrl');
  }

  if (!Array.isArray(planes) || !planes.length) {
    throw new Error('Missing RTI planes');
  }
}

function fitAndRotateWhenReady(layer, viewer, viewModel) {
  layer.addEvent('ready', () => {
    viewer.camera.fitCameraBox(0);

    const rotation = Number(ko.unwrap(viewModel.rotation) || 0);
    if (!rotation) {
      viewModel.appliedRotation = 0;
      return;
    }

    viewer.camera.rotate(1, rotation);
    viewModel.appliedRotation = rotation;
  });
}

function createOpenLimeScene(container, metadataUrl, planes, skinUrl, viewModel) {
  const viewer = new Viewer(container, { background: 'black' });
  viewer.containerElement.style.touchAction = 'none';
  viewer.canvasElement.style.touchAction = 'none';

  const panZoom = createRightButtonPanZoom(viewer);
  const layer = new LayerRTI({
    url: metadataUrl,
    layout: createIiifLayout(planes, viewModel.imageSize),
    normals: false
  });

  viewer.addLayer('rti', layer);
  fitAndRotateWhenReady(layer, viewer, viewModel);

  Skin.setUrl(skinUrl);

  const ui = new UIBasic(viewer, {
    skin: skinUrl,
    showLightDirections: true
  });

  configureOpenLimeUi(ui, panZoom);

  viewer.camera.maxFixedZoom = 8;
  const contextMenuHandler = preventContextMenuOnRightDrag(viewer);

  return {
    viewer,
    layer,
    ui,
    panZoom,
    contextMenuHandler
  };
}

ko.components.register('iiif-rti-viewer', {
  viewModel: {
    createViewModel(params) {
      const self = {};

      self.metadataUrl = params.metadataUrl;
      self.planes = params.planes;
      self.skinUrl = params.skinUrl || '/static/img/openlime/skin.svg';
      self.skinCssUrl = params.skinCssUrl || '/static/css/openlime/skin.css';
      self.lightCssUrl = params.lightCssUrl || '/static/css/openlime/light.css';

      self.rotation = params.rotation || ko.observable(0);
      self.cropEnabled = params.cropEnabled || ko.observable(false);
      self.cropSelection = params.cropSelection || ko.observable(null);
      self.onCropSelected = params.onCropSelected;

      self.status = ko.observable('');
      self.error = ko.observable('');
      self.imageSize = ko.observable(null);
      self.cropDrag = ko.observable(null);

      self.appliedRotation = 0;
      self._contextMenuHandler = null;

      self.showError = function(error) {
        self.status('');
        self.error(error && error.message ? error.message : String(error));
        console.error(LOG, error);
      };

      self.cropSelectionStyle = ko.pureComputed(function() {
        const drag = ko.unwrap(self.cropDrag);
        if (!drag) return {};

        const left = Math.min(drag.startX, drag.endX);
        const top = Math.min(drag.startY, drag.endY);
        const width = Math.abs(drag.endX - drag.startX);
        const height = Math.abs(drag.endY - drag.startY);

        return {
          left: left + 'px',
          top: top + 'px',
          width: width + 'px',
          height: height + 'px'
        };
      });

      self.screenToImagePoint = function(clientX, clientY) {
        if (!self.viewer || !self.viewer.camera) {
          throw new Error('RTI viewer is not ready');
        }

        const size = ko.unwrap(self.imageSize);
        if (!size || !size.width || !size.height) {
          throw new Error('RTI image size is not ready');
        }

        const rect = self.rootEl.getBoundingClientRect();
        const transform = self.viewer.camera.getCurrentTransform(performance.now());
        const viewport = self.viewer.camera.viewport || {
          w: rect.width,
          h: rect.height
        };

        const canvasX = clientX - rect.left;
        const canvasY = clientY - rect.top;

        const localX = (canvasX - viewport.w / 2 - transform.x) / transform.z;
        const localY = -(canvasY - viewport.h / 2 - transform.y) / transform.z;

        const scene = rotatePoint(localX, localY, -transform.a);

        return {
          x: scene.x + size.width / 2,
          y: size.height / 2 - scene.y
        };
      };

      self.cropFromDrag = function(drag) {
        const points = [
          self.screenToImagePoint(drag.startClientX, drag.startClientY),
          self.screenToImagePoint(drag.endClientX, drag.startClientY),
          self.screenToImagePoint(drag.startClientX, drag.endClientY),
          self.screenToImagePoint(drag.endClientX, drag.endClientY)
        ];

        const size = ko.unwrap(self.imageSize);
        const xs = points.map(point => point.x);
        const ys = points.map(point => point.y);

        const x1 = Math.max(0, Math.min.apply(Math, xs));
        const y1 = Math.max(0, Math.min.apply(Math, ys));
        const x2 = Math.min(size.width, Math.max.apply(Math, xs));
        const y2 = Math.min(size.height, Math.max.apply(Math, ys));

        return {
          x: Math.round(x1),
          y: Math.round(y1),
          width: Math.round(x2 - x1),
          height: Math.round(y2 - y1)
        };
      };

      self.beginCrop = function(_data, event) {
        if (!ko.unwrap(self.cropEnabled)) return true;

        /**
         * Crop intentionally uses only left mouse button.
         * Right mouse button remains reserved for panning.
         */
        if (event.button !== 0) {
          return true;
        }

        const rect = self.rootEl.getBoundingClientRect();

        const drag = {
          startClientX: event.clientX,
          startClientY: event.clientY,
          endClientX: event.clientX,
          endClientY: event.clientY,
          startX: event.clientX - rect.left,
          startY: event.clientY - rect.top,
          endX: event.clientX - rect.left,
          endY: event.clientY - rect.top
        };

        self.cropDrag(drag);

        const move = function(moveEvent) {
          const next = Object.assign({}, ko.unwrap(self.cropDrag) || drag, {
            endClientX: moveEvent.clientX,
            endClientY: moveEvent.clientY,
            endX: moveEvent.clientX - rect.left,
            endY: moveEvent.clientY - rect.top
          });

          self.cropDrag(next);
          moveEvent.preventDefault();
        };

        const up = function(upEvent) {
          window.removeEventListener('mousemove', move);
          window.removeEventListener('mouseup', up);

          const finalDrag = Object.assign({}, ko.unwrap(self.cropDrag) || drag, {
            endClientX: upEvent.clientX,
            endClientY: upEvent.clientY,
            endX: upEvent.clientX - rect.left,
            endY: upEvent.clientY - rect.top
          });

          self.cropDrag(finalDrag);

          try {
            const crop = self.cropFromDrag(finalDrag);

            if (crop.width < 8 || crop.height < 8) {
              self.error('Selected crop is too small.');
              self.cropDrag(null);
              upEvent.preventDefault();
              return;
            }

            if (typeof self.cropSelection === 'function') {
              self.cropSelection(crop);
            }

            if (typeof self.onCropSelected === 'function') {
              self.onCropSelected(crop);
            }
          } catch (error) {
            self.showError(error);
          }

          upEvent.preventDefault();
        };

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);

        event.preventDefault();
        return false;
      };

      self.setRotation = function(angle) {
        const nextAngle = Number(angle || 0);
        const delta = nextAngle - self.appliedRotation;

        if (typeof self.rotation === 'function') {
          self.rotation(nextAngle);
        }

        if (self.viewer && self.viewer.camera && delta) {
          self.viewer.camera.rotate(1, delta);
          self.appliedRotation = nextAngle;
        } else if (!self.viewer) {
          self.appliedRotation = nextAngle;
        }

      };

      self._rotationSub = ko.computed(function() {
        const angle = Number(ko.unwrap(self.rotation) || 0);
        self.setRotation(angle);
      });

      self.initViewer = async function(rootEl) {
        try {
          self.rootEl = rootEl;
          self.status('Loading RTI...');
          self.error('');

          ensureStylesheet(unwrapParam(self.skinCssUrl, ''));
          ensureStylesheet(unwrapParam(self.lightCssUrl, ''));

          const container = rootEl.querySelector('.iiif-rti-openlime');
          const metadataUrl = unwrapParam(self.metadataUrl, '');
          const planes = unwrapParam(self.planes, []);
          const skinUrl = unwrapParam(self.skinUrl, '/static/img/openlime/skin.svg');

          validateViewerInputs(container, metadataUrl, planes);
          await assertIiifIsReachable(planes);

          const scene = createOpenLimeScene(container, metadataUrl, planes, skinUrl, self);

          self.viewer = scene.viewer;
          self.layer = scene.layer;
          self.ui = scene.ui;
          self.panZoom = scene.panZoom;
          self._contextMenuHandler = scene.contextMenuHandler;

          self.status('');
        } catch (error) {
          self.showError(error);
        }
      };

      self.dispose = function() {
        try {
          if (self._rotationSub) {
            self._rotationSub.dispose();
          }
        } catch (_) {}

        try {
          if (
            self.viewer &&
            self.viewer.containerElement &&
            self._contextMenuHandler
          ) {
            self.viewer.containerElement.removeEventListener(
              'contextmenu',
              self._contextMenuHandler
            );
          }
        } catch (_) {}

        try {
          if (self.viewer && typeof self.viewer.destroy === 'function') {
            self.viewer.destroy();
          }
        } catch (error) {
          console.error(LOG, 'dispose failed', error);
        }

        self.viewer = null;
        self.layer = null;
        self.ui = null;
        self.panZoom = null;
        self.rootEl = null;
        self._contextMenuHandler = null;
      };

      return self;
    }
  },
  template: rtiViewerTemplate
});
