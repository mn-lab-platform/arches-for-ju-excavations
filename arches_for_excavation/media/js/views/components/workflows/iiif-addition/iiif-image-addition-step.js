define([
  'knockout',
  'arches',
  'templates/views/components/workflows/iiif-addition/iiif-image-addition-step.htm',
  'bindings/dropzone',
  'utils/iiif-addition-utils',
  '../../../../services/service-utils'
], function(ko, arches, template, _dropzone, iiifAdditionUtils, serviceUtils) {
  'use strict';

  var NODE_IIIF_LABEL = '78422c09-4994-4eff-b764-60f21f3290cd';
  var NODE_IIIF_URL = 'e0216dc7-89ba-4a27-9126-bf7e06d859a8';
  var NODE_RELATED_RESOURCE = '9c317e5f-76b4-407d-9b8d-b64f446ea17a';
  var NODE_USED_FILES = 'ba3a8689-8bb6-4759-b4e2-328e8cf9bdf8';

  var REL_ONTOLOGY_PROPERTY_ID = "";
  var REL_INVERSE_PROPERTY_ID = "";

  function viewModel(params) {
    var self = this;

    console.log('[IIIF-STEP] Initializing viewModel with params:', params);

    var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
    var csrftoken = serviceUtils.getCookie('csrftoken');

    self.stepTitle = ko.observable(params.stepTitle || 'Add IIIF Image');
    self.stepDescription = ko.observable(params.stepDescription || 'Upload GeoTIFF files to create an IIIF resource');
    self.resourceName = ko.observable('');

    self.forceDem = ko.observable(false);
    self.makeHillshade = ko.observable(false);

    self.loading = ko.observable(false);
    self.errorMessage = ko.observable('');

    self.progressStatus = ko.observable('');
    self.progressPhase = ko.observable('idle'); // idle | ready | uploading | processing | complete | error
    self.canStartUpload = ko.observable(false);

    self.digitalResourceId = ko.observable(null);

    self.tiles = {
      labelTileId: ko.observable(null),
      urlTileId: ko.observable(null),
      relTileId: ko.observable(null),
      fileListTileId: ko.observable(null)
    };

    self.titilerBaseUrl = ko.observable(ko.unwrap(params.titilerBaseUrl) || 'http://localhost:8081');

    var geotiffUploadUrl = iiifAdditionUtils.joinUrl(baseUrl, 'api/iiif/geotiff-upload');
    var celeryStatusUrlBase = iiifAdditionUtils.joinUrl(baseUrl, 'api/celery/task-status/');
    var buildManifestUrl = iiifAdditionUtils.joinUrl(baseUrl, 'api/iiif/build-geotiff-manifest');

    // host resource
    self.targetResourceId = ko.observable(null);
    var hostParam = params.hostResourceId;
    if (typeof hostParam === 'function') {
      self.targetResourceId(ko.unwrap(hostParam) || null);
      ko.computed(function() {
        self.targetResourceId(ko.unwrap(hostParam) || null);
      });
    } else if (hostParam) {
      self.targetResourceId(hostParam);
    } else if (params.form && params.form.resourceid) {
      self.targetResourceId(params.form.resourceid);
    }

    // queue for processing selected files (only originals)
    self.maxParallel = ko.observable(3);
    self.queue = ko.observableArray([]); // [{ localId, file, name, statusObs, file_id, url, iiif_service_url, task_id }]
    self.activeCount = ko.observable(0);
    self.isFinalizing = ko.observable(false);

    self.humanSize = function(bytes) {
      var b = Number(bytes || 0);
      if (!b) return '0 B';
      var units = ['B', 'KB', 'MB', 'GB', 'TB'];
      var i = Math.floor(Math.log(b) / Math.log(1024));
      i = Math.min(i, units.length - 1);
      return (b / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1) + ' ' + units[i];
    };

    // single source of truth for USED_FILES tile (includes derived products)
    self.fileEntries = ko.observableArray([]); // raw entries (not arches tile structure yet)
    self.canRemoveFile = function(row) {
      if (!row || !row.statusObs) return false;
      return ['selected', 'queued', 'failed'].includes(row.statusObs());
    };
    self.canToggleDem = function(row) {
      if (!row || !row.statusObs || !row.isDemObs) return false;
      return ['selected', 'failed'].includes(row.statusObs());
    };

    self.toggleDem = function(row) {
      if (!self.canToggleDem(row)) return;
      row.isDemObs(!row.isDemObs());
    };  
    self.removeFileRow = function(row) {
      if (!row) return;
      if (!self.canRemoveFile(row)) return;
      self.queue.remove(row);
      try {
        if (self.dropzone && row.file) {
          self.dropzone.removeFile(row.file);
        }
      } catch (e) {
        console.warn('[IIIF-STEP] dropzone.removeFile failed:', e);
      }

      var left = self.queue().length;
      if (left > 0) {
        self.canStartUpload(true);
        self.progressStatus('Ready to upload ' + left + ' file(s)');
        self.progressPhase('ready');
      } else {
        self.canStartUpload(false);
        self.progressStatus('');
        if (!self.activeCount()) self.progressPhase('idle');
      }
    };
    // dropzone
    self.dropzone = null;
    self.dropzoneOptionsCreate = {
      url: baseUrl,
      dictDefaultMessage: '',
      maxFilesize: 4096,
      autoProcessQueue: false,
      uploadMultiple: true,
      autoQueue: false,
      clickable: '.fileinput-create-button',
      previewsContainer: '#hidden-dz-create-previews',
      init: function() {
        var dz = this;
        self.dropzone = dz;

        function normalizeFiles(files) {
          if (!files) return [];
          if (Array.isArray(files)) return files;
          if (typeof files.length === 'number') return Array.prototype.slice.call(files);
          return [files];
        }

        function addToQueue(file) {
          if (!file) return;
          var exists = self.queue().some(function(it) { return it.file === file; });
          if (exists) return;

          self.queue.push({
            localId: iiifAdditionUtils.uuidv4(),
            file: file,
            name: file.name || 'unnamed',
            isDemObs: ko.observable(!!self.forceDem()),            
            statusObs: ko.observable('selected'),
            file_id: null,
            url: null,
            iiif_service_url: null,
            task_id: null
          });
        }

        function refreshReadyState() {
          var count = dz.files ? dz.files.length : self.queue().length;
          if (count > 0) {
            self.canStartUpload(true);
            self.progressStatus('Ready to upload ' + count + ' file(s)');
            self.progressPhase('ready');
          } else {
            self.canStartUpload(false);
            self.progressStatus('');
            if (!self.activeCount()) self.progressPhase('idle');
          }
        }

        dz.on('addedfiles', function(files) {
          normalizeFiles(files).forEach(addToQueue);
          refreshReadyState();
        });

        dz.on('addedfile', function(file) {
          addToQueue(file);
          refreshReadyState();
        });

        dz.on('removedfile', function(file) {
          self.queue.remove(function(it) {
            return it.file === file && ['selected', 'queued', 'failed'].includes(it.statusObs());
          });
          refreshReadyState();
        });

        dz.on('error', function(file, error) {
          console.error('[IIIF-STEP] Dropzone error:', error);
          file.error = error;
        });
      }
    };

    // ------------------------------------------------------------
    // Helpers: file entries (truth) -> tile payload
    // ------------------------------------------------------------
    function stripExt(name) {
      return String(name || '').replace(/\.[^.]+$/, '');
    }

    function makeFileListItem(e) {
      var now = Date.now();
      return {
        accepted: true,
        altText: iiifAdditionUtils.makeLangValue(e.altText || '', arches),
        title: iiifAdditionUtils.makeLangValue(e.title || '', arches),
        attribution: iiifAdditionUtils.makeLangValue(e.attribution || '', arches),
        description: iiifAdditionUtils.makeLangValue(e.description || '', arches),
        content: null,
        file_id: e.file_id || null,
        height: e.height || null,
        width: e.width || null,
        index: typeof e.index === 'number' ? e.index : 0,
        lastModified: now,
        name: e.name || '',
        path: e.path || null,
        size: typeof e.size === 'number' ? e.size : (e.size || 0),
        status: e.status || 'uploaded',
        type: e.type || 'image/tiff',
        url: e.url || null
      };
    }

    function upsertEntriesInMemory(entries) {
      entries.forEach(function(e) {
        if (!e || !e.file_id) return;
        var existing = self.fileEntries().find(function(x) { return x.file_id === e.file_id; });
        if (existing) {
          Object.assign(existing, e);
        } else {
          self.fileEntries.push(Object.assign({}, e));
        }
      });
    }

    self.saveFileEntriesTile = function() {
      var tileid = self.tiles.fileListTileId();
      if (!tileid) throw new Error('Missing fileListTileId');

      var arr = self.fileEntries().map(makeFileListItem);

      return iiifAdditionUtils.createOrUpdateTile(
        NODE_USED_FILES,
        self.digitalResourceId(),
        tileid,
        arr
      ).then(function(t) {
        self.tiles.fileListTileId(t.tileid);
        return t;
      });
    };

    // ------------------------------------------------------------
    // STEP 1: Create minimal digital resource + tiles
    // ------------------------------------------------------------
    self.ensureDigitalResource = function() {
      if (self.digitalResourceId()) return Promise.resolve(self.digitalResourceId());

      self.loading(true);
      self.errorMessage('');
      self.progressPhase('uploading');
      self.progressStatus('Initializing resource...');

      var rid = iiifAdditionUtils.uuidv4();
      self.digitalResourceId(rid);

      var labelData = iiifAdditionUtils.makeLangValue(self.resourceName() || '', arches);
      var urlData = iiifAdditionUtils.makeLangValue('', arches);

      var relTargets = [{
        resourceId: self.targetResourceId(),
        ontologyProperty: REL_ONTOLOGY_PROPERTY_ID,
        inverseOntologyProperty: REL_INVERSE_PROPERTY_ID,
        resourceXresourceId: ""
      }];

      // start with empty used-files array
      self.fileEntries.removeAll();

      return iiifAdditionUtils.createOrUpdateTile(NODE_IIIF_LABEL, rid, '', labelData)
        .then(function(t) {
          self.tiles.labelTileId(t.tileid);
          return iiifAdditionUtils.createOrUpdateTile(NODE_IIIF_URL, rid, '', urlData);
        })
        .then(function(t) {
          self.tiles.urlTileId(t.tileid);
          return iiifAdditionUtils.createOrUpdateTile(NODE_RELATED_RESOURCE, rid, '', relTargets);
        })
        .then(function(t) {
          self.tiles.relTileId(t.tileid);
          return iiifAdditionUtils.createOrUpdateTile(NODE_USED_FILES, rid, '', []);
        })
        .then(function(t) {
          self.tiles.fileListTileId(t.tileid);
          return rid;
        })
        .finally(function() {
          self.loading(false);
        });
    };

    // ------------------------------------------------------------
    // STEP 2: start upload
    // ------------------------------------------------------------
    self.startUpload = function() {
      if (!self.dropzone || self.dropzone.files.length === 0) {
        self.errorMessage('No files selected');
        return;
      }

      var toQueue = self.queue().filter(function(it) { return it.statusObs() === 'selected'; });
      if (!toQueue.length) {
        self.errorMessage('No new files to upload');
        return;
      }

      self.errorMessage('');

      self.ensureDigitalResource()
        .then(function() {
          toQueue.forEach(function(it) { it.statusObs('queued'); });

          self.progressPhase('uploading');
          self.progressStatus('Uploading ' + toQueue.length + ' file(s)...');

          self.runQueue();
        })
        .catch(function(err) {
          self.progressPhase('error');
          self.progressStatus('Init failed');
          self.errorMessage('Failed to init resource: ' + (err && err.message ? err.message : String(err)));
        });
    };

    self.runQueue = function() {
      while (self.activeCount() < self.maxParallel()) {
        var next = self.queue().find(function(it) { return it.statusObs() === 'queued'; });
        if (!next) break;
        self.processOne(next);
      }

      var anyActive = self.queue().some(function(it) {
        return ['queued', 'uploading', 'processing'].includes(it.statusObs());
      });

      if (!anyActive && self.queue().length > 0 && !self.isFinalizing()) {
        self.finalizeManifest();
      }
    };

    // ------------------------------------------------------------
    // STEP 3: upload one file, write entries once, poll, update entries once
    // ------------------------------------------------------------
    self.processOne = function(item) {
      self.activeCount(self.activeCount() + 1);
      item.statusObs('uploading');
      self.progressStatus('Uploading ' + item.name + '...');

      var fd = new FormData();
      fd.append('file', item.file, item.file.name);

      var baseName = stripExt(item.file.name);
      fd.append('base_name', baseName);

      var role = (item && item.isDemObs && item.isDemObs()) ? 'dem' : 'ortho';
      fd.append('role', role);

      fd.append('resource_id', self.digitalResourceId());

      // IMPORTANT: name should match what user typed (resourceName), fallback to original file base name
      fd.append('resource_name', self.resourceName() || baseName);

      fetch(geotiffUploadUrl, {
        method: 'POST',
        body: fd,
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrftoken,
          'Accept': 'application/json'
        }
      })
      .then(function(resp) {
        if (!resp.ok) throw new Error('Upload HTTP ' + resp.status + ' for ' + item.name);
        return resp.json();
      })
      .then(function(r) {
        item.task_id = r.task_id || r.job_id;
        item.file_id = r.file_id || r.job_id || iiifAdditionUtils.uuidv4();
        item.url = r.download_url_original || null;

        // Build entries (original + derived products if returned)
        var entries = [{
          file_id: item.file_id,
          name: item.name,
          type: 'image/tiff',
          size: item.file && item.file.size,
          status: 'uploaded',
          url: item.url
        }];

        if (r.download_url_cog) {
          entries.push({
            file_id: item.file_id + '_cog',
            name: item.name.replace(/(\.tif+)?$/i, '_COG.tif'),
            type: 'image/tiff',
            size: null,
            status: 'uploaded',
            url: r.download_url_cog
          });
        }
        if (r.download_url_hillshade) {
          entries.push({
            file_id: item.file_id + '_hillshade',
            name: item.name.replace(/(\.tif+)?$/i, '_hillshade.tif'),
            type: 'image/tiff',
            size: null,
            status: 'uploaded',
            url: r.download_url_hillshade
          });
        }
        if (r.download_url_colorrelief) {
          entries.push({
            file_id: item.file_id + '_colorrelief',
            name: item.name.replace(/(\.tif+)?$/i, '_colorrelief.tif'),
            type: 'image/tiff',
            size: null,
            status: 'uploaded',
            url: r.download_url_colorrelief
          });
        }

        // Store entries in memory + save tile ONCE
        upsertEntriesInMemory(entries);

        item.statusObs('processing');
        self.progressStatus('Processing ' + item.name + '...');

        return self.saveFileEntriesTile().then(function() {
          return self.pollTask(item, item.task_id);
        });
      })
      .catch(function(err) {
        item.statusObs('failed');
        self.errorMessage((self.errorMessage() ? (self.errorMessage() + '\n') : '') + (err && err.message ? err.message : String(err)));

        // reflect failure in entries if we already have file_id
        if (item.file_id) {
          upsertEntriesInMemory([{
            file_id: item.file_id,
            name: item.name,
            type: 'image/tiff',
            size: item.file && item.file.size,
            status: 'failed',
            url: item.url || null
          }]);
          return self.saveFileEntriesTile();
        }
      })
      .finally(function() {
        self.activeCount(self.activeCount() - 1);
        self.runQueue();
      });
    };

    // ------------------------------------------------------------
    // Poll celery per file and update ONLY in-memory truth + save once
    // ------------------------------------------------------------
    self.pollTask = function(item, taskId) {
      if (!taskId) {
        item.statusObs('failed');
        throw new Error('Missing taskId for ' + item.name);
      }

      var statusUrl = celeryStatusUrlBase + taskId;
      var pollInterval = 2000;
      var maxAttempts = 600;
      var attempts = 0;

      function tick() {
        attempts++;
        return fetch(statusUrl, { credentials: 'include' })
          .then(function(resp) {
            if (!resp.ok) throw new Error('Status HTTP ' + resp.status);
            return resp.json();
          })
          .then(function(st) {
            var state = st.state || st.status || 'UNKNOWN';

            if (state === 'SUCCESS') {
              var result = st.result || st;

              var svc = result && result.titiler && result.titiler.iiif_service_url;
              item.iiif_service_url = svc || null;
              item.statusObs('ready');

              // Update original entry (don’t blow away derived products)
              var desc = svc ? ('IIIF: ' + svc) : '';
              upsertEntriesInMemory([{
                file_id: item.file_id,
                name: item.name,
                type: 'image/tiff',
                size: item.file && item.file.size,
                status: 'uploaded',
                url: item.url || (result && result.download_url_cog) || null,
                description: desc
              }]);

              return self.saveFileEntriesTile();
            }

            if (state === 'FAILURE') {
              item.statusObs('failed');

              upsertEntriesInMemory([{
                file_id: item.file_id,
                name: item.name,
                type: 'image/tiff',
                size: item.file && item.file.size,
                status: 'failed',
                url: item.url || null
              }]);

              return self.saveFileEntriesTile();
            }

            if (attempts >= maxAttempts) {
              item.statusObs('failed');
              throw new Error('Timeout for ' + item.name);
            }

            return new Promise(function(res) { setTimeout(res, pollInterval); }).then(tick);
          });
      }

      return tick();
    };

    // ------------------------------------------------------------
    // FINALIZE: build manifest from ready iiif_service_url + update iiif_url tile
    // ------------------------------------------------------------
    self.finalizeManifest = function() {
      if (self.isFinalizing()) return;
      self.isFinalizing(true);

      var services = self.queue()
        .filter(function(it) { return it.statusObs() === 'ready' && it.iiif_service_url; })
        .map(function(it) {
          return {
            label: it.name,
            iiif_service_url: it.iiif_service_url,
            file_id: it.file_id
          };
        });

      if (!services.length) {
        self.progressPhase('error');
        self.progressStatus('No successful files');
        self.errorMessage(self.errorMessage() || 'No GeoTIFF processed successfully, cannot build manifest.');
        self.isFinalizing(false);
        return;
      }

      self.progressPhase('processing');
      self.progressStatus('Building manifest...');

      return fetch(buildManifestUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          resource_id: self.digitalResourceId(),
          label: 'GeoTIFF manifest',
          iiif_version: 3,
          items: services,
          resource_name: self.resourceName()
        })
      })
      .then(function(resp) {
        if (!resp.ok) throw new Error('Manifest build HTTP ' + resp.status);
        return resp.json();
      })
      .then(function(r) {
        var manifestUrl = r.manifest_url;
        if (!manifestUrl) throw new Error('No manifest_url returned');

        return self.updateIiifUrlTile(manifestUrl).then(function() {
          self.progressPhase('complete');
          self.progressStatus('Done');
          setTimeout(function() { self.progressStatus(''); }, 800);

          var valueData = {
            digitalResourceId: self.digitalResourceId(),
            targetResourceId: self.targetResourceId(),
            manifestUrl: manifestUrl
          };

          if (typeof params.value === 'function') params.value(valueData);
          if (params.form && params.form.value) params.form.value(valueData);

          return manifestUrl;
        });
      })
      .catch(function(err) {
        self.progressPhase('error');
        self.progressStatus('Manifest failed');
        self.errorMessage('Failed to build/update manifest: ' + (err && err.message ? err.message : String(err)));
      })
      .finally(function() {
        self.isFinalizing(false);
      });
    };

    self.updateIiifUrlTile = function(manifestUrl) {
      var tileid = self.tiles.urlTileId();
      if (!tileid) throw new Error('Missing iiif_url tileid');

      var data = iiifAdditionUtils.makeLangValue(manifestUrl, arches);
      return iiifAdditionUtils.createOrUpdateTile(NODE_IIIF_URL, self.digitalResourceId(), tileid, data)
        .then(function(t) {
          self.tiles.urlTileId(t.tileid);
          return t;
        });
    };

    // Step complete gate
    if (params.form && typeof params.form.complete === 'function') {
      params.form.complete(ko.pureComputed(function() {
        return !!self.digitalResourceId() && self.queue().length > 0;
      }));
    }

    return self;
  }

  return ko.components.register('iiif-image-addition-step', {
    viewModel: viewModel,
    template: template
  });
});