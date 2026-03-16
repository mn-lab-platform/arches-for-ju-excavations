// views/components/iiif/lib/affine-utils.js

// pixel (col=x, row=y) -> local (X,Y)
// scaleLevel = poziom pyramid/IIIF; dla pełnej rozdzielczości mnożymy przez 2^s
export function affineForward(tr, x, y, scaleLevel = 0) {
  if (!Array.isArray(tr) || tr.length !== 6) return null;

  const s = Number.isFinite(scaleLevel) ? scaleLevel : 0;
  const px = Number(x) * (2 ** s);
  const py = Number(y) * (2 ** s);

  const [a, b, c, d, e, f] = tr;
  return [a * px + b * py + c, d * px + e * py + f];
}

// local (X,Y) -> pixel (x,y)
export function affineInverse(tr, X, Y) {
  if (!Array.isArray(tr) || tr.length !== 6) return null;

  const [a, b, c, d, e, f] = tr;
  const det = a * e - b * d;
  if (!Number.isFinite(det) || Math.abs(det) < 1e-12) return null;

  const dx = X - c;
  const dy = Y - f;

  const x = (e * dx - b * dy) / det;
  const y = (-d * dx + a * dy) / det;

  return [x, y];
}

export function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}