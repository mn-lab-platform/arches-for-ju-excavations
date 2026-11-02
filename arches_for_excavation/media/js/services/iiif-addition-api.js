define([
  'utils/iiif-addition-utils',
  'services/tus-service',
  'tus-js-client'
], function(utils, tusServiceModule, tus) {
  'use strict';
  var tusService = tusServiceModule.default || tusServiceModule;

  function _fetchJson(url, opts) {
    return fetch(url, opts).then(function(resp) {
      if (!resp.ok) throw new Error('HTTP ' + resp.status + ' for ' + url);
      return resp.json();
    });
  }

  function uploadGeotiff(baseUrl, csrftoken, payload) {
    var url = utils.joinUrl(baseUrl, 'api/iiif/geotiff-upload');

    return _fetchJson(url, {
      method: 'POST',
      body: payload.formData,
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrftoken,
        'Accept': 'application/json'
      }
    });
  }

  function iiifTusMetadata(file, options, token) {
    var baseName = String(options.baseName || file.name.replace(/\.[^.]+$/, ''));
    var isDem = options.forceDem === undefined ? options.role === 'dem' : !!options.forceDem;
    return {
      upload_token: String(token),
      upload_started_at: String(Date.now()),
      upload_kind: 'iiif_geotiff',
      filename: String(file.name),
      resource_id: String(options.resourceId),
      resource_name: String(options.resourceName || baseName),
      base_name: baseName,
      role: isDem ? 'dem' : 'ortho',
      force_dem: isDem ? '1' : '0',
      make_hillshade: isDem && options.makeHillshade ? '1' : '0'
    };
  }

  function iiifTusFingerprint(file, options) {
    return Promise.resolve(JSON.stringify([
      'iiif-geotiff-v1', options.endpoint, file.name, file.type,
      file.size, file.lastModified, options.metadata.resource_id,
      options.metadata.role, options.metadata.base_name,
      options.metadata.resource_name, options.metadata.make_hillshade
    ]));
  }

  function resumableIiifUpload(previous, metadata, endpoint) {
    if (!previous || !previous.metadata || !previous.uploadUrl) return false;
    var old = previous.metadata;
    var startedAt = Number(old.upload_started_at);
    if (!old.upload_token || !Number.isFinite(startedAt) || startedAt > Date.now() ||
        Date.now() - startedAt > 45 * 60 * 1000) return false;

    for (var key in metadata) {
      if (key !== 'upload_token' && key !== 'upload_started_at' &&
          old[key] !== metadata[key]) return false;
    }

    try {
      var base = new URL(endpoint, window.location.href);
      var previousUrl = new URL(previous.uploadUrl, window.location.href);
      var basePath = base.pathname.replace(/\/?$/, '/');
      return previousUrl.origin === base.origin &&
        previousUrl.pathname.indexOf(basePath) === 0 &&
        /^[^/]+$/.test(previousUrl.pathname.slice(basePath.length)) &&
        !previousUrl.search && !previousUrl.hash;
    } catch (error) {
      return false;
    }
  }

  // Look up the original resource before the create workflow allocates a new one.
  function findResumableGeotiffUploads(file, options) {
    options = options || {};
    if (!file || !/\.tiff?$/i.test(file.name || '')) return Promise.resolve([]);

    var endpoint = tusService.getUploadEndpoint();
    var storage = tus.defaultOptions && tus.defaultOptions.urlStorage;
    if (!storage || typeof storage.findAllUploads !== 'function') return Promise.resolve([]);

    return storage.findAllUploads().then(function(uploads) {
      var matches = [];
      (uploads || []).forEach(function(previous) {
        var old = previous && previous.metadata;
        if (!old || !/^[0-9a-fA-F-]{36}$/.test(old.resource_id || '') ||
            previous.size !== file.size) return;

        var expected = iiifTusMetadata(file, Object.assign({}, options, {
          resourceId: old.resource_id
        }), old.upload_token);
        if (!resumableIiifUpload(previous, expected, endpoint)) return;

        var fingerprint = JSON.stringify([
          'iiif-geotiff-v1', endpoint, file.name, file.type,
          file.size, file.lastModified, old.resource_id,
          old.role, old.base_name, old.resource_name, old.make_hillshade
        ]);
        if (typeof previous.urlStorageKey !== 'string' ||
            previous.urlStorageKey.indexOf('tus::' + fingerprint + '::') !== 0) return;

        matches.push({
          resourceId: old.resource_id,
          uploadUrl: previous.uploadUrl,
          startedAt: Number(old.upload_started_at)
        });
      });
      return matches.sort(function(a, b) { return b.startedAt - a.startedAt; });
    });
  }

  // Transfers the file only. Processing it as IIIF will be connected later.
  function uploadGeotiffToTus(file, options) {
    options = options || {};
    if (!file || !/\.tiff?$/i.test(file.name || '') || !options.resourceId) {
      return Promise.reject(new Error('A GeoTIFF file and resourceId are required'));
    }

    return tusService.generateSecureToken().then(function(tokenResponse) {
      if (!tokenResponse || !tokenResponse.token) {
        throw new Error('Failed to obtain a TUS upload token');
      }

      return new Promise(function(resolve, reject) {
        var endpoint = tusService.getUploadEndpoint();
        var metadata = iiifTusMetadata(file, options, tokenResponse.token);
        var upload = new tus.Upload(file, {
          endpoint: endpoint,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          removeFingerprintOnSuccess: true,
          fingerprint: iiifTusFingerprint,
          metadata: metadata,
          onProgress: function(sent, total) {
            if (options.onProgress) options.onProgress(sent, total);
          },
          onError: reject,
          onSuccess: function() {
            if (!upload.url) {
              reject(new Error('TUS upload URL missing'));
              return;
            }
            var path = new URL(upload.url, window.location.href).pathname;
            var tusId = path.split('/').filter(Boolean).pop();
            if (!tusId) {
              reject(new Error('TUS upload ID missing'));
              return;
            }
            resolve({ tusId: tusId });
          }
        });
        upload.findPreviousUploads().then(function(previousUploads) {
          var previous = previousUploads.find(function(candidate) {
            return resumableIiifUpload(candidate, metadata, endpoint);
          });
          if (previous) upload.resumeFromPreviousUpload(previous);
          upload.start();
        }, function() {
          // Local URL storage is optional; a new upload can still proceed.
          upload.start();
        });
      });
    });
  }

  function fetchTusGeotiffResult(baseUrl, tusId) {
    if (!tusId || !/^[A-Za-z0-9_-]+$/.test(tusId)) {
      return Promise.reject(new Error('A valid TUS upload ID is required'));
    }
    var url = utils.joinUrl(baseUrl, 'api/iiif/tus-result/' + encodeURIComponent(tusId));
    return fetch(url, { credentials: 'include', headers: { 'Accept': 'application/json' } })
      .then(function(resp) {
        return resp.json().then(function(data) {
          if (!resp.ok) throw new Error(data.error || 'HTTP ' + resp.status + ' for ' + url);
          return data;
        });
      });
  }

  // Resolves with the same processing response as the multipart upload endpoint.
  function waitForTusGeotiffResult(baseUrl, tusId, opts) {
    opts = opts || {};
    var pollInterval = Number(opts.pollInterval || 2000);
    var maxAttempts = Number(opts.maxAttempts || 300);
    var attempts = 0;

    function tick() {
      attempts++;
      return fetchTusGeotiffResult(baseUrl, tusId).then(function(data) {
        if (data.status === 'submitted' && data.result) return data.result;
        if (data.status === 'error') throw new Error(data.error || 'GeoTIFF processing failed');
        if (data.status !== 'processing') throw new Error('Unexpected TUS upload result');
        if (attempts >= maxAttempts) throw new Error('Timeout waiting for TUS upload ' + tusId);
        return new Promise(function(resolve) { setTimeout(resolve, pollInterval); }).then(tick);
      });
    }

    return tick();
  }

  function fetchTaskStatus(baseUrl, taskId) {
    var url = utils.joinUrl(baseUrl, 'api/celery/task-status/' + taskId);
    return _fetchJson(url, { credentials: 'include' });
  }

  function pollTaskStatus(baseUrl, taskId, opts) {
    opts = opts || {};
    var pollInterval = Number(opts.pollInterval || 2000);
    var maxAttempts = Number(opts.maxAttempts || 600);
    var attempts = 0;

    function tick() {
      attempts++;
      return fetchTaskStatus(baseUrl, taskId).then(function(st) {
        var state = st.state || st.status || 'UNKNOWN';
        if (state === 'SUCCESS' || state === 'FAILURE') return st;
        if (attempts >= maxAttempts) throw new Error('Timeout waiting for task ' + taskId);
        return new Promise(function(res) { setTimeout(res, pollInterval); }).then(tick);
      });
    }

    return tick();
  }

  function buildManifest(baseUrl, csrftoken, bodyJson) {
    var url = utils.joinUrl(baseUrl, 'api/iiif/build-geotiff-manifest');

    return _fetchJson(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        'Accept': 'application/json'
      },
      body: JSON.stringify(bodyJson)
    });
  }

  return {
    uploadGeotiff: uploadGeotiff,
    uploadGeotiffToTus: uploadGeotiffToTus,
    findResumableGeotiffUploads: findResumableGeotiffUploads,
    fetchTusGeotiffResult: fetchTusGeotiffResult,
    waitForTusGeotiffResult: waitForTusGeotiffResult,
    fetchTaskStatus: fetchTaskStatus,
    pollTaskStatus: pollTaskStatus,
    buildManifest: buildManifest
  };
});
