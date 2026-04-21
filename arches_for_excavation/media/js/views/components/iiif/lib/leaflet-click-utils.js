export function findCanvasById(manifest, canvasId) {
  if (!canvasId) return null;
  const canvases = Array.isArray(manifest?.items) ? manifest.items : [];
  return canvases.find((canvas) => (canvas.id || canvas['@id']) === canvasId) || null;
}

export function formatLeafletClickReadout(info, transform, affineForward) {
  if (!info) return '';

  const scaleLevel = Number.isFinite(Number(info.s)) ? Number(info.s) : 0;
  const fullX = Number(info.x) * (2 ** scaleLevel);
  const fullY = Number(info.y) * (2 ** scaleLevel);
  const pixelPart = `Pixel: ${fullX}, ${fullY} / ${info.width}x${info.height}`;

  if (!transform || typeof affineForward !== 'function') {
    return pixelPart;
  }

  const projected = affineForward(transform, info.x, info.y, scaleLevel);
  if (!Array.isArray(projected) || projected.length !== 2) {
    return pixelPart;
  }

  return `${pixelPart} | Map: ${projected[0].toFixed(6)}, ${projected[1].toFixed(6)}`;
}

export function parsePixelCoordsFromReadout(readout) {
  const match = String(readout || '').match(/Pixel:\s*(\d+),\s*(\d+)/);
  if (!match) return null;

  return {
    x: parseInt(match[1], 10),
    y: parseInt(match[2], 10)
  };
}

export function parseMapCoordsFromReadout(readout) {
  const match = String(readout || '').match(/Map:\s*([-\d.]+),\s*([-\d.]+)/);
  if (!match) return null;

  return {
    x: parseFloat(match[1]),
    y: parseFloat(match[2])
  };
}
