/**
 * Converts Leaflet's CRS.Simple coordinates into two explicit coordinate spaces.
 *
 * viewX/viewY are Leaflet coordinates at zoom 0 and are only for overlays.
 * imageX/imageY are full-resolution IIIF pixels for transforms and sampling.
 */
function clamp(value, lower, upper) {
  return Math.max(lower, Math.min(upper, value));
}

function finiteOr(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function createLeafletClickCoordinates(opts = {}) {
  const nativeMaxZoom = Math.max(0, finiteOr(opts.nativeMaxZoom, 0));
  const scale = 2 ** nativeMaxZoom;
  const width = finiteOr(opts.width, 0);
  const height = finiteOr(opts.height, 0);

  const rawImageX = finiteOr(opts.viewX, 0) * scale;
  const rawImageY = finiteOr(opts.viewY, 0) * scale;

  // The right/bottom image edges do not identify a raster pixel.
  const imageX = width > 1 ? clamp(rawImageX, 0, width - 1) : rawImageX;
  const imageY = height > 1 ? clamp(rawImageY, 0, height - 1) : rawImageY;
  const viewX = imageX / scale;
  const viewY = imageY / scale;

  return {
    viewX,
    viewY,
    imageX,
    imageY,
    nativeMaxZoom,
    displayMaxZoom: finiteOr(opts.displayMaxZoom, nativeMaxZoom),
    width,
    height,
    baseCanvasId: opts.baseCanvasId || null,
    canvas: opts.canvas || null,
    latlng: opts.latlng || null,
    originalEvent: opts.originalEvent || null,

    // Compatibility aliases for annotation selectors stored in zoom-0 space.
    x: viewX,
    y: viewY,
    s: nativeMaxZoom
  };
}
