export const TOOL_NAMES = {
  DISTANCE: 'distance',
  ANNOTATIONS: 'annotations',
  PICKER: 'picker',
  BACK_TO_DEFAULT: 'back_to_default',
  GLOBE: 'globe',
  ENTITIES_VISIBILITY: 'entities_visibility'
};

export const TOOL_CALLBACKS = {
  ON_DISTANCE_UPDATE: 'onDistanceUpdate',
  ON_POLYGON_COMPLETE: 'onPolygonComplete',
  ON_ANNOTATION_UPDATED: 'onAnnotationUpdated',
  ON_ANNOTATION_PICKED: 'onAnnotationPicked',
  ON_ANNOTATION_DELETED: 'onAnnotationDeleted',
  ON_TOOL_SELF_DEACTIVATE: 'onToolSelfDeactivate',
  ON_POLYGON_COMPLETED: 'onPolygonCompleted',
  ON_BASEMAP_SELECTED: 'onBasemapSelected'
};

export const TOOL_TITLES = {
  [TOOL_NAMES.BACK_TO_DEFAULT]: 'Default view',
  [TOOL_NAMES.DISTANCE]: 'Measure distance between points',
  [TOOL_NAMES.ANNOTATIONS]: 'Draw and annotate polygons',
  [TOOL_NAMES.PICKER]: 'Select and edit existing annotations',
  [TOOL_NAMES.GLOBE]: 'Toggle globe view',
  [TOOL_NAMES.ENTITIES_VISIBILITY]: 'Toggle annotations visibility'
};