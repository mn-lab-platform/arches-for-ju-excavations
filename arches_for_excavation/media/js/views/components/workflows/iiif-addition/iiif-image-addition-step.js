define([
  'knockout',
  'arches',
  'templates/views/components/workflows/iiif-addition/iiif-image-addition-step.htm',
  'bindings/dropzone',
  'utils/iiif-addition-utils',
  'services/iiif-addition-api',
  'utils/iiif-file-entries-store',
  'services/iiif-queue-runner',
  '../../../../services/service-utils'
], function(ko, arches, template, _dropzone, utils, iiifApi, FileEntriesStore, QueueRunner, serviceUtils) {
  'use strict';

  var NODE_IIIF_LABEL = '78422c09-4994-4eff-b764-60f21f3290cd';
  var NODE_IIIF_URL = 'e0216dc7-89ba-4a27-9126-bf7e06d859a8';
  var NODE_RELATED_RESOURCE = '9c317e5f-76b4-407d-9b8d-b64f446ea17a';
  var NODE_USED_FILES = 'ba3a8689-8bb6-4759-b4e2-328e8cf9bdf8';

  var REL_ONTOLOGY_PROPERTY_ID = "";
  var REL_INVERSE_PROPERTY_ID = "";

  function viewModel(params) {
    var self = this;

    var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
    var csrftoken = serviceUtils.getCookie('csrftoken');

    self.stepTitle = ko.observable(params.stepTitle || 'Add IIIF Image');
    self.stepDescription = ko.observable(params.stepDescription || 'Upload GeoTIFF files to create an IIIF resource');

    self.resourceName = ko.observable('');

    // Ustaw domyślnie na false – inaczej znowu wrócisz do “zawsze robi hillshade”
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

    // host resource
    self.targetResourceId = ko.observable(null);
    var hostParam = params.hostResourceId;
    if (typeof hostParam === 'function') {
      self.targetResourceId(ko.unwrap(hostParam) || null);
      ko.computed(function() { self.targetResourceId(ko.unwrap(hostParam) || null); });
    } else if (hostParam) {
      self.targetResourceId(hostParam);
    } else if (params.form && params.form.resourceid) {
      self.targetResourceId(params.form.resourceid);
    }

    // queue
    self.maxParallel = ko.observable(1); // was 3
    self.queue = ko.observableArray([]); // [{ file, name, statusObs, isDemObs, makeHillshadeObs, ... }]
    self.isFinalizing = ko.observable(false);

    self.humanSize = utils.humanSize;

    self.uploadMode = ko.observable('geotiff'); // geotiff | photo
    self.isPhotoMode = ko.pureComputed(function() { return self.uploadMode() === 'photo'; });

    function _isAllowedForCurrentMode(file) {
      var name = (file && file.name ? file.name : '').toLowerCase();
      if (self.isPhotoMode()) return /\.(jpe?g|png)$/.test(name);
      return /\.(tif|tiff)$/.test(name);
    }

    self.canRemoveFile = function(row) {
      if (!row || !row.statusObs) return false;
      return ['selected', 'queued', 'failed'].includes(row.statusObs());
    };

    self.removeFileRow = function(row) {
      if (!row || !self.canRemoveFile(row)) return;

      self.queue.remove(row);
      try {
        if (self.dropzone && row.file) self.dropzone.removeFile(row.file);
      } catch (e) {
        console.warn('[IIIF-STEP] dropzone.removeFile failed:', e);
      }
      _refreshReadyState();
    };
    self.canToggleDem = function(row) {
      if (self.isPhotoMode()) return false;
      if (!row || !row.statusObs || !row.isDemObs) return false;
      return ['selected', 'failed'].includes(row.statusObs());
    };

    self.toggleDem = function(row) {
      if (!self.canToggleDem(row)) return;
      var nowDem = !row.isDemObs();
      row.isDemObs(nowDem);
      if (row.makeHillshadeObs) row.makeHillshadeObs(nowDem);
    };
    // USED_FILES store
    self.fileStore = new FileEntriesStore({ arches: arches });

    self.saveUsedFilesTile = function() {
      var tileid = self.tiles.fileListTileId();
      self.fileStore.tileId(tileid);

      return self.fileStore.saveToTile(NODE_USED_FILES, self.digitalResourceId())
        .then(function(t) {
          if (t && t.tileid) self.tiles.fileListTileId(t.tileid);
          return t;
        });
    };

    function _refreshReadyState() {
      var count = self.queue().filter(function(it) {
        return it && it.statusObs && it.statusObs() === 'selected';
      }).length;

      if (count > 0) {
        self.canStartUpload(true);
        self.progressStatus('Ready to upload ' + count + ' file(s)');
        self.progressPhase('ready');
      } else {
        self.canStartUpload(false);
        self.progressStatus('');
        if (!self.queue().some(function(it) {
          var st = it && it.statusObs ? it.statusObs() : '';
          return (st === 'queued' || st === 'uploading' || st === 'processing');
        })) {
          self.progressPhase('idle');
        }
      }
    }

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

        function addToQueue(file) {
          if (!file) return;
          if (!_isAllowedForCurrentMode(file)) {
            self.errorMessage(self.isPhotoMode()
              ? 'Photo mode: only JPG/PNG are allowed.'
              : 'GeoTIFF mode: only TIF/TIFF are allowed.');
            try { if (self.dropzone) self.dropzone.removeFile(file); } catch (_) {}
            return;
          }
          var exists = self.queue().some(function(it) { return it.file === file; });
          if (exists) return;

          self.queue.push({
            localId: utils.uuidv4(),
            file: file,
            name: file.name || 'unnamed',
            statusObs: ko.observable('selected'),

            isDemObs: ko.observable(self.isPhotoMode() ? false : !!self.forceDem()),
            makeHillshadeObs: ko.observable(self.isPhotoMode() ? false : !!self.forceDem()),

            // backend ids
            task_id: null,
            job_id: null,
            file_id: null,

            // iiif urls
            iiif_service_url: null,
            derivedItems: [] // [{ kind, label, iiif_service_url }]
          });
        }

        dz.on('addedfiles', function(files) {
          utils.normalizeFiles(files).forEach(addToQueue);
          _refreshReadyState();
        });

        dz.on('addedfile', function(file) {
          addToQueue(file);
          _refreshReadyState();
        });

        dz.on('removedfile', function(file) {
          self.queue.remove(function(it) {
            return it.file === file && it.statusObs && ['selected', 'queued', 'failed'].includes(it.statusObs());
          });
          _refreshReadyState();
        });

        dz.on('error', function(file, error) {
          console.error('[IIIF-STEP] Dropzone error:', error);
          file.error = error;
        });
      }
    };

    // STEP 1: init resource + tiles
    self.ensureDigitalResource = function() {
      if (self.digitalResourceId()) return Promise.resolve(self.digitalResourceId());

      self.loading(true);
      self.errorMessage('');
      self.progressPhase('uploading');
      self.progressStatus('Initializing resource...');

      var rid = utils.uuidv4();
      self.digitalResourceId(rid);

      var labelData = utils.makeLangValue(self.resourceName() || '', arches);
      var urlData = utils.makeLangValue('', arches);

      var relTargets = [{
        resourceId: self.targetResourceId(),
        ontologyProperty: REL_ONTOLOGY_PROPERTY_ID,
        inverseOntologyProperty: REL_INVERSE_PROPERTY_ID,
        resourceXresourceId: ""
      }];

      self.fileStore.clear();

      return utils.createOrUpdateTile(NODE_IIIF_LABEL, rid, '', labelData)
        .then(function(t) { self.tiles.labelTileId(t.tileid); return utils.createOrUpdateTile(NODE_IIIF_URL, rid, '', urlData); })
        .then(function(t) { self.tiles.urlTileId(t.tileid); return utils.createOrUpdateTile(NODE_RELATED_RESOURCE, rid, '', relTargets); })
        .then(function(t) { self.tiles.relTileId(t.tileid); return utils.createOrUpdateTile(NODE_USED_FILES, rid, '', []); })
        .then(function(t) { self.tiles.fileListTileId(t.tileid); return rid; })
        .finally(function() { self.loading(false); });
    };

    // Queue runner
    self.queueRunner = new QueueRunner({
      queue: self.queue,
      maxParallel: self.maxParallel,
      processItem: function(item) { return self.processOne(item); },
      onDrain: function() { return self.finalizeManifest(); }
    });

    // STEP 2: start upload
    self.startUpload = function() {
      var toQueue = self.queue().filter(function(it) { return it.statusObs() === 'selected'; });
      if (!toQueue.length) {
        self.errorMessage('No new files to upload');
        return;
      }

      self.errorMessage('');
      self.queueRunner.resetDrain();

      self.ensureDigitalResource()
        .then(function() {
          toQueue.forEach(function(it) { it.statusObs('queued'); });
          self.progressPhase('uploading');
          self.progressStatus('Uploading ' + toQueue.length + ' file(s)...');
          self.queueRunner.run();
        })
        .catch(function(err) {
          self.progressPhase('error');
          self.progressStatus('Init failed');
          self.errorMessage('Failed to init resource: ' + (err && err.message ? err.message : String(err)));
        });
    };

    // STEP 3: upload + poll celery + update USED_FILES
    self.processOne = function(item) {
      item.statusObs('uploading');
      self.progressStatus('Uploading ' + item.name + '...');

      var fd = new FormData();
      fd.append('file', item.file, item.file.name);

      var baseName = utils.stripExt(item.file.name);
      fd.append('base_name', baseName);
      fd.append('resource_id', self.digitalResourceId());
      fd.append('resource_name', self.resourceName() || baseName);

      // PHOTO MODE: no celery, direct IIIF service from backend
      if (self.isPhotoMode()) {
        return fetch(baseUrl + 'api/iiif/photo-upload', {
          method: 'POST',
          headers: { 'X-CSRFToken': csrftoken },
          body: fd
        })
        .then(function(resp) {
          if (!resp.ok) return resp.json().then(function(e){ throw new Error(e.error || 'Photo upload failed'); });
          return resp.json();
        })
        .then(function(r) {
          item.job_id = r.job_id || null;
          item.file_id = r.job_id || item.file_id || utils.uuidv4();
          item.iiif_service_url = r && r.titiler ? r.titiler.iiif_service_url : null;
          item.fileMetadata = r.metadata || null;
          item.derivedItems = [];
          item.statusObs('ready');

          self.fileStore.upsert([{
            file_id: item.file_id,
            name: item.name,
            type: r.format || item.file.type || 'image/jpeg',
            size: item.file && item.file.size,
            status: 'uploaded',
            url: utils.toAbsoluteUrl(r.download_url_original || ''),
            description: item.iiif_service_url ? ('IIIF: ' + item.iiif_service_url) : ''
          }]);

          return self.saveUsedFilesTile();
        })
        .catch(function(err) {
          item.statusObs('failed');
          self.errorMessage((self.errorMessage() ? (self.errorMessage() + '\n') : '') + (err && err.message ? err.message : String(err)));
        });
      }

      // GEOTIFF MODE: existing flow
      var forceDem = !!(item.isDemObs && item.isDemObs());
      var makeHillshade = forceDem && (!item.makeHillshadeObs || item.makeHillshadeObs());
      fd.append('role', forceDem ? 'dem' : 'ortho');
      fd.append('force_dem', forceDem ? '1' : '0');
      fd.append('make_hillshade', makeHillshade ? '1' : '0');

      return iiifApi.uploadGeotiff(baseUrl, csrftoken, { formData: fd })
        .then(function(r) {
          // ids
          item.task_id = r.task_id || r.job_id;
          item.job_id = r.job_id || null;
          item.file_id = r.job_id || item.file_id || utils.uuidv4();

          // initial file entries (original + whatever endpoints są dostępne od razu)
          var entries = [{
            file_id: item.file_id,
            name: item.name,
            type: 'image/tiff',
            size: item.file && item.file.size,
            status: 'uploaded',
            url: utils.toAbsoluteUrl(r.download_url_original),
            description: ''
          }];

          if (r.download_url_cog) {
            entries.push({
              file_id: item.file_id + '_cog',
              name: baseName + '_COG.tif',
              type: 'image/tiff',
              status: 'uploaded',
              url: utils.toAbsoluteUrl(r.download_url_cog)
            });
          }
          if (r.download_url_hillshade) {
            entries.push({
              file_id: item.file_id + '_hillshade',
              name: baseName + '_hillshade.tif',
              type: 'image/tiff',
              status: 'uploaded',
              url: utils.toAbsoluteUrl(r.download_url_hillshade)
            });
          }
          if (r.download_url_colorrelief) {
            entries.push({
              file_id: item.file_id + '_colorrelief',
              name: baseName + '_colorrelief.tif',
              type: 'image/tiff',
              status: 'uploaded',
              url: utils.toAbsoluteUrl(r.download_url_colorrelief)
            });
          }

          self.fileStore.upsert(entries);
          item.statusObs('processing');
          self.progressStatus('Processing ' + item.name + '...');

          return self.saveUsedFilesTile()
            .then(function() { return iiifApi.pollTaskStatus(baseUrl, item.task_id, { pollInterval: 2000, maxAttempts: 600 }); });
        })
        .then(function(st) {
          var state = st.state || st.status || 'UNKNOWN';

          if (state === 'FAILURE') {
            var failMsg =
              (st && st.result && (st.result.exc_message || st.result.error)) ||
              st.error ||
              'Celery: FAILURE';

            item.statusObs('failed');
            self.errorMessage((self.errorMessage() ? (self.errorMessage() + '\n') : '') + item.name + ': ' + failMsg);

            self.fileStore.upsert([{
              file_id: item.file_id,
              status: 'failed',
              description: failMsg
            }]);
            return self.saveUsedFilesTile();
          }

          // SUCCESS
          var result = st.result || st;

          var svc = result && result.titiler && result.titiler.iiif_service_url;
          item.iiif_service_url = svc || null;

          // NEW: keep metadata from celery result (written also to separate json)
          item.fileMetadata = (result && result.metadata) ? result.metadata : null;

          // derived
          var derivedItems = [];

          var hsSvc = utils.getDerivedIiifServiceUrl(result, 'hillshade');
          if (hsSvc) {
            derivedItems.push({ kind: 'hillshade', label: item.name + ' (hillshade)', iiif_service_url: hsSvc });
            self.fileStore.upsert([{ file_id: item.file_id + '_hillshade', description: 'IIIF: ' + hsSvc }]);
          }

          var crSvc = utils.getDerivedIiifServiceUrl(result, 'color_relief');
          if (crSvc) {
            derivedItems.push({ kind: 'colorrelief', label: item.name + ' (color relief)', iiif_service_url: crSvc });
            self.fileStore.upsert([{ file_id: item.file_id + '_colorrelief', description: 'IIIF: ' + crSvc }]);
          }

          item.derivedItems = derivedItems;
          item.statusObs('ready');

          self.fileStore.upsert([{
            file_id: item.file_id,
            status: 'uploaded',
            description: svc ? ('IIIF: ' + svc) : ''
          }]);

          return self.saveUsedFilesTile();
        })
        .catch(function(err) {
          item.statusObs('failed');
          self.errorMessage((self.errorMessage() ? (self.errorMessage() + '\n') : '') + (err && err.message ? err.message : String(err)));

          if (item.file_id) {
            self.fileStore.upsert([{
              file_id: item.file_id,
              status: 'failed',
              description: 'Upload/poll error'
            }]);
            return self.saveUsedFilesTile();
          }
        });
    };

    // FINALIZE: build manifest from successful services + update iiif_url tile
    self.finalizeManifest = function() {
      if (self.isFinalizing()) return;
      self.isFinalizing(true);

      var services = [];
      self.queue().forEach(function(it) {
        if (!it || !it.statusObs || it.statusObs() !== 'ready') return;

        if (it.iiif_service_url) {
          services.push({
            label: it.name,
            iiif_service_url: it.iiif_service_url,
            file_id: it.file_id,
            metadata: it.fileMetadata || {} // NEW
          });
        }

        (it.derivedItems || []).forEach(function(d) {
          if (!d || !d.iiif_service_url) return;
          services.push({
            label: d.label || (it.name + ' (derived)'),
            iiif_service_url: d.iiif_service_url,
            file_id: (it.file_id || '') + '_' + (d.kind || 'derived')
          });
        });
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

      return iiifApi.buildManifest(baseUrl, csrftoken, {
        resource_id: self.digitalResourceId(),
        label: self.isPhotoMode() ? 'Photo manifest' : 'GeoTIFF manifest',
        iiif_version: 3,
        items: services,
        resource_name: self.resourceName(),
        mode: self.uploadMode()
      })
      .then(function(r) {
        var manifestUrl = r.manifest_url;
        if (!manifestUrl) throw new Error('No manifest_url returned');

        var data = utils.makeLangValue(manifestUrl, arches);
        return utils.createOrUpdateTile(NODE_IIIF_URL, self.digitalResourceId(), self.tiles.urlTileId(), data)
          .then(function(t) {
            if (t && t.tileid) self.tiles.urlTileId(t.tileid);

            self.progressPhase('complete');
            self.progressStatus('Done');

            var valueData = {
              digitalResourceId: self.digitalResourceId(),
              targetResourceId: self.targetResourceId(),
              manifestUrl: manifestUrl
            };

            if (typeof params.value === 'function') params.value(valueData);
            if (params.form && params.form.value) params.form.value(valueData);

            setTimeout(function() { self.progressStatus(''); }, 800);
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