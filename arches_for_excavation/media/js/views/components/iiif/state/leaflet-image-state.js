// state/leaflet-image-state.js

export function createLeafletImageState(opts = {}) {
  const ko = opts.ko;
  if (!ko) {
    throw new Error('createLeafletImageState requires opts.ko');
  }

  const annotationEnabledInitial = !!opts.annotationEnabled;

  const state = {};

  state.imageGroup = ko.observable('ortho'); // 'ortho' | 'dem'

  state.leafletBaseCanvasId = ko.observable(null);
  state.leafletCanvasOptions = ko.observableArray([]);
  state.leafletLayers = ko.observableArray([]);

  state.clickedCoords = ko.observable('');

  state.activeImageTool = ko.observable('none');

  state.elevationLoading = ko.observable(false);
  state.elevationValue = ko.observable('');
  state.elevationError = ko.observable('');

  state.leafletMeasurePoints = ko.observableArray([]);
  state.leafletMeasureDistance = ko.observable('');

  state.annotationEnabled = ko.observable(annotationEnabledInitial);
  state.annotationStatus = ko.observable('');
  state.annotationCanFinish = ko.observable(false);

  state.annotationMode = ko.pureComputed(() => state.activeImageTool() === 'annotate');
  state.leafletMeasureMode = ko.pureComputed(() => state.activeImageTool() === 'measure');
  state.leafletDemPickMode = ko.pureComputed(() => state.activeImageTool() === 'dem-pick');

  state.setActiveImageTool = (toolName) => {
    const normalized = toolName === 'annotate' || toolName === 'measure' || toolName === 'dem-pick'
      ? toolName
      : 'none';
    state.activeImageTool(normalized);
  };

  state.clearActiveImageTool = () => {
    state.activeImageTool('none');
  };

  state.isActiveImageTool = (toolName) => state.activeImageTool() === toolName;
  state.getActiveImageTool = () => state.activeImageTool();

  return state;
}
