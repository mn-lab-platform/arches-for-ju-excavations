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

function forceHttpsUrl(u) {
  if (!u || typeof u !== 'string') return u;
  try {
    const x = new URL(u, window.location.origin);
    if (window.location.protocol === 'https:') x.protocol = 'https:';
    return x.toString();
  } catch (_) {
    return u.replace(/^http:\/\//i, 'https://');
  }
}

function patchInfoJsonProtocol(data) {
  if (!data || typeof data !== 'object') return data;

  if (typeof data.id === 'string') data.id = forceHttpsUrl(data.id);
  if (typeof data['@id'] === 'string') data['@id'] = forceHttpsUrl(data['@id']);

  if (Array.isArray(data.tiles)) {
    data.tiles.forEach((t) => {
      if (t && typeof t.id === 'string') t.id = forceHttpsUrl(t.id);
      if (t && typeof t['@id'] === 'string') t['@id'] = forceHttpsUrl(t['@id']);
    });
  }
  return data;
}

let _installed = false;

/**
 * Patchuje fetch() tylko dla info.json, żeby Allmaps dostał poprawne:
 * - id (z poprawionym /iiif//data/...)
 * - type: ImageService3
 * - @context: IIIF Image API 3
 */
function rewriteToHttpsIfSameHost(urlLike) {
  try {
    //console.log(LOG, 'Rewriting URL if needed:', urlLike);
    const u = new URL(urlLike, window.location.origin);
    const isPageHttps = window.location.protocol === 'https:';
    const sameHost = u.host === window.location.host;
    if (isPageHttps && sameHost && u.protocol === 'http:') {
      u.protocol = 'https:';
      return u.toString();
    }
    return typeof urlLike === 'string' ? urlLike : u.toString();
  } catch (_) {
    if (typeof urlLike === 'string') {
      return urlLike.replace(/^http:\/\//i, 'https://');
    }
    return urlLike;
  }
}

export function installIiifInfoJsonPatch() {
  if (_installed) return;
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') return;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = async function(input, init) {
    let rewrittenInput = input;
    //console.log(LOG, 'Fetch called with:', input, init);
    if (typeof input === 'string') {
      rewrittenInput = rewriteToHttpsIfSameHost(input);
    } else if (input instanceof Request) {
      const rewrittenUrl = rewriteToHttpsIfSameHost(input.url);
      if (rewrittenUrl !== input.url) {
        rewrittenInput = new Request(rewrittenUrl, input);
      }
    }

    const reqUrl =
      typeof rewrittenInput === 'string' ? rewrittenInput :
      (rewrittenInput && rewrittenInput.url ? rewrittenInput.url : '');

    const res = await nativeFetch(rewrittenInput, init);

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

      const patched = patchInfoJsonProtocol({
        ...json,
        id: fixedId,
        type: 'ImageService3',
        '@context': 'http://iiif.io/api/image/3/context.json'
      });
      delete patched['@id'];
      //console.log(LOG, 'Original info.json:', rawId, '=>', fixedId, 'Needs patch:', patched);
      const headers = new Headers(res.headers);
      headers.set('content-type', 'application/json');
      headers.delete('content-length');

      //console.log(LOG, 'Patched info.json:', rawId, '=>', fixedId);

      return new Response(JSON.stringify(patched), {
        status: res.status,
        statusText: res.statusText,
        headers
      });
    } catch (e) {
      return res;
    }
  };

  _installed = true;
  //console.log(LOG, 'Installed IIIF info.json fetch patch');
}