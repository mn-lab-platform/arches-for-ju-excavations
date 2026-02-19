// views/components/iiif/map/dem-sampling.js

const LOG = '[dem-sampling]';

function extractElevationValue(pointResp) {
  if (!pointResp || typeof pointResp !== 'object') return null;
  if (Number.isFinite(pointResp.value)) return pointResp.value;

  if (Array.isArray(pointResp.values)) {
    const first = pointResp.values.find(v => Number.isFinite(v));
    if (Number.isFinite(first)) return first;
  }

  const candidates = ['b1', 'band1', 'elevation', 'z', 'val'];
  for (const k of candidates) {
    if (Number.isFinite(pointResp[k])) return pointResp[k];
  }
  return null;
}

export function createDemSampler(opts = {}) {
  const setLoading = typeof opts.setLoading === 'function' ? opts.setLoading : () => {};
  const setValue = typeof opts.setValue === 'function' ? opts.setValue : () => {};
  const setError = typeof opts.setError === 'function' ? opts.setError : () => {};

  function pickLayer(layers) {
    const arr = Array.isArray(layers) ? layers : (typeof layers === 'function' ? layers() : []);
    if (!Array.isArray(arr)) return null;

    // STRICT: tylko isDemHint === true
    const cand = arr.find(l => l?.isDemHint === true && l?.titilerFilePath);
    return cand || null;
  }

  async function fetchAt(lon, lat, demLayer) {
    if (!demLayer) {
      setError('Brak warstwy DEM (is_dem_hint=True) do próbkowania.');
      setValue('');
      return;
    }

    const base = String(demLayer.titilerBaseUrl || '').replace(/\/+$/, '');
    const fpath = demLayer.titilerFilePath;
    if (!base || !fpath) {
      setError('Brak danych TiTiler (file_path/base_url).');
      setValue('');
      return;
    }

    const url = `${base}/cog/point/${lon},${lat}?url=${encodeURIComponent(fpath)}`;

    setLoading(true);
    setError('');
    setValue('');

    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const z = extractElevationValue(json);

      if (!Number.isFinite(z)) {
        setError('Nie udało się odczytać wysokości dla tego punktu.');
        return;
      }

      const unit = demLayer.elevationUnit || 'm';
      setValue(`${Number(z).toFixed(2)} ${unit}`);
    } catch (e) {
      console.warn(LOG, 'fetchAt error:', e);
      setError('Błąd odczytu wysokości z DEM.');
    } finally {
      setLoading(false);
    }
  }

  return {
    pickLayer,
    fetchAt
  };
}