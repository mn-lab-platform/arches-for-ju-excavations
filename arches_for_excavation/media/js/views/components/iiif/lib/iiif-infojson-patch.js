// views/components/iiif/lib/iiif-infojson-patch.js

const LOG = '[iiif-infojson-patch]';

export function forceDoubleSlashAfterIiif(url) {
  if (!url) return url;

  let s = String(url).trim();
  s = s.replace(/\/info\.json$/i, '').replace(/\/+$/, '');

  const isAbs = /^https?:\/\//i.test(s);

  if (isAbs) {
    try {
      const u = new URL(s);
      let p = u.pathname || '/';

      if (/^\/{1,2}data\//.test(p)) {
        p = '/iiif/' + p.replace(/^\/+/, '');
      } else if (!/^\/iiif(\/|$)/.test(p)) {
        p = '/iiif/' + p.replace(/^\/+/, '');
      }

      // enforce /iiif//data/...
      p = p.replace(/^\/iiif\/(?!\/)(data\/)/, '/iiif//$1');

      u.pathname = p;
      return u.toString().replace(/\/+$/, '');
    } catch (e) {
      // fall through to string ops
    }
  }

  if (/^\/{1,2}data\//.test(s)) {
    s = '/iiif/' + s.replace(/^\/+/, '');
  } else if (!/^\/iiif(\/|$)/.test(s)) {
    s = '/iiif/' + s.replace(/^\/+/, '');
  }

  s = s.replace(/^\/iiif\/(?!\/)(data\/)/, '/iiif//$1');
  return s;
}

let _installed = false;

/**
 * Patchuje fetch() tylko dla info.json, żeby Allmaps dostał poprawne:
 * - id (z poprawionym /iiif//data/...)
 * - type: ImageService3
 * - @context: IIIF Image API 3
 */
export function installIiifInfoJsonPatch() {
  if (_installed) return;
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') return;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = async function(input, init) {
    const reqUrl =
      typeof input === 'string' ? input :
      (input && input.url ? input.url : '');

    const res = await nativeFetch(input, init);

    try {
      const abs = new URL(reqUrl, window.location.origin);
      const path = abs.pathname || '';

      if (!/\/info\.json$/i.test(path)) return res;
      if (!/\/(iiif\/{1,2})?data\//i.test(path)) return res;

      const ct = (res.headers.get('content-type') || '').toLowerCase();
      if (!res.ok || (!ct.includes('json') && !ct.includes('ld+json'))) return res;

      const cloned = res.clone();
      const json = await cloned.json();

      const rawId = json?.id ?? json?.['@id'] ?? '';
      const fallbackId = abs.origin + path.replace(/\/info\.json$/i, '');
      const idAbs = rawId ? new URL(rawId, abs.origin).toString() : fallbackId;
      const fixedId = forceDoubleSlashAfterIiif(idAbs);

      const needsPatch =
        !rawId ||
        rawId !== fixedId ||
        json?.type !== 'ImageService3' ||
        json?.['@context'] !== 'http://iiif.io/api/image/3/context.json';

      if (!needsPatch) return res;

      const patched = {
        ...json,
        id: fixedId,
        type: 'ImageService3',
        '@context': 'http://iiif.io/api/image/3/context.json'
      };
      delete patched['@id'];

      const headers = new Headers(res.headers);
      headers.set('content-type', 'application/json');
      headers.delete('content-length');

      console.warn(LOG, 'Patched info.json:', rawId, '=>', fixedId);

      return new Response(JSON.stringify(patched), {
        status: res.status,
        statusText: res.statusText,
        headers
      });
    } catch (e) {
      // jak coś się wywali – nie blokuj, tylko zwróć oryginał
      return res;
    }
  };

  _installed = true;
  console.log(LOG, 'Installed IIIF info.json fetch patch');
}