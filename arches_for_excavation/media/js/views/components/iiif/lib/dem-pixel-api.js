const DEFAULT_ENDPOINT = '/api/iiif/dem/pixel-value';

export async function fetchDemPixelValue(opts = {}) {
  const manifest = opts.manifest;
  const x = opts.x;
  const y = opts.y;
  const endpoint = opts.endpoint || DEFAULT_ENDPOINT;

  const response = await fetch(endpoint, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ manifest, x, y })
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.error || 'HTTP ' + response.status);
  }

  return json;
}
