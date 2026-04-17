export const TOOL_NAMES = {
  DISTANCE: 'distance',
  ANNOTATIONS: 'annotations',
  PICKER: 'picker',
  BACK_TO_DEFAULT: 'back_to_default',
  GLOBE: 'globe'
};

export const TOOL_CALLBACKS = {
  ON_DISTANCE_UPDATE: 'onDistanceUpdate',
  ON_POLYGON_COMPLETE: 'onPolygonComplete',
  ON_ANNOTATION_SAVED: 'onAnnotationSaved',
  ON_ANNOTATION_PICKED: 'onAnnotationPicked',
  ON_ANNOTATION_DELETED: 'onAnnotationDeleted',
  ON_TOOL_SELF_DEACTIVATE: 'onToolSelfDeactivate'
};

export const SCALE_FACTORS = {
  METERS: 1,
  CENTIMETERS: 100
}

export const TOOL_TITLES = {
  [TOOL_NAMES.BACK_TO_DEFAULT]: 'Reset camera to default view',
  [TOOL_NAMES.DISTANCE]: 'Measure distance between points',
  [TOOL_NAMES.ANNOTATIONS]: 'Draw and annotate polygons',
  [TOOL_NAMES.PICKER]: 'Select and edit existing annotations',
  [TOOL_NAMES.GLOBE]: 'Toggle globe view'
};