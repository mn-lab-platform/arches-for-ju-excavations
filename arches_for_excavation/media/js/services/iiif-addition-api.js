define(['utils/iiif-addition-utils'], function(utils) {
  'use strict';

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
    fetchTaskStatus: fetchTaskStatus,
    pollTaskStatus: pollTaskStatus,
    buildManifest: buildManifest
  };
});