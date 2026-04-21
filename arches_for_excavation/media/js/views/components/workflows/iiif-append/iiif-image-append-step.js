define([
  'knockout',
  'arches',
  'templates/views/components/workflows/iiif-append/iiif-image-append-step.htm',
  'bindings/dropzone',
  'utils/iiif-addition-utils',
  'services/iiif-addition-api',
  'utils/iiif-file-entries-store',
  'services/iiif-queue-runner',
  '../../../../services/service-utils'
], function(ko, arches, template, _dropzone, utils, iiifApi, FileEntriesStore, QueueRunner, serviceUtils) {
  'use strict';

  var NODE_IIIF_URL = 'e0216dc7-89ba-4a27-9126-bf7e06d859a8';
  var NODE_USED_FILES = 'ba3a8689-8bb6-4759-b4e2-328e8cf9bdf8';

  function viewModel(params) {
    var self = this;

    var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
    var csrftoken = serviceUtils.getCookie('csrftoken');

    self.stepTitle = ko.observable(params.stepTitle || 'Append files to IIIF resource');
    self.stepDescription = ko.observable(
      params.stepDescription || 'Upload GeoTIFF/photo files and append them to an existing IIIF manifest'
    );

    self.resourceName = ko.observable('');
    self.manifestUrl = ko.observable('');
    self.resourceContextLoaded = ko.observable(false);

    self.forceDem = ko.observable(false);
    self.makeHillshade = ko.observable(false);

    self.loading = ko.observable(false);
    self.errorMessage = ko.observable('');

    self.progressStatus = ko.observable('');
    self.progressPhase = ko.observable('idle');
    self.canStartUpload = ko.observable(false);

    self.digitalResourceId = ko.observable(null);

    self.tiles = {
      urlTileId: ko.observable(null),
      fileListTileId: ko.observable(null)
    };

    var resourceIdParam = params.existingResourceId;
    if (typeof resourceIdParam === 'function') {
      self.digitalResourceId(ko.unwrap(resourceIdParam) || null);
      ko.computed(function() {
        self.digitalResourceId(ko.unwrap(resourceIdParam) || null);
      });
    } else if (resourceIdParam) {
      self.digitalResourceId(resourceIdParam);
    } else if (params.form && params.form.resourceid) {
      self.digitalResourceId(params.form.resourceid);
    }

    self.maxParallel = ko.observable(1);
    self.queue = ko.observableArray([]);
    self.isFinalizing = ko.observable(false);

    self.humanSize = utils.humanSize;
    self.uploadMode = ko.observable('geotiff');
    self.modeLocked = ko.observable(false); // NOWE: blokada trybu
    self.isPhotoMode = ko.pureComputed(function() {
      return self.uploadMode() === 'photo';
    });

    self.fileStore = new FileEntriesStore({ arches: arches });

    function _extractText(val) {
      if (val == null) return '';
      if (typeof val === 'string') return val;
      if (Array.isArray(val)) return val.length ? _extractText(val[0]) : '';
      if (typeof val === 'object') {
        if (Object.prototype.hasOwnProperty.call(val, 'value')) return _extractText(val.value);
        if (Object.prototype.hasOwnProperty.call(val, 'en')) return _extractText(val.en);
      }
      try { return String(val); } catch (_) { return ''; }
    }

    function _langText(val) {
      return { en: { value: _extractText(val), direction: 'ltr' } };
    }

    function _normalizeUsedFileEntryForStore(entry) {
      var e = Object.assign({}, entry || {});
      e.title = _extractText(e.title);
      e.altText = _extractText(e.altText);
      e.attribution = _extractText(e.attribution);
      e.description = _extractText(e.description);
      return e;
    }

    function _normalizeUsedFileEntriesForStore(list) {
      return (Array.isArray(list) ? list : []).map(_normalizeUsedFileEntryForStore);
    }

    self.saveUsedFilesTile = function() {
      var tileid = self.tiles.fileListTileId();
      self.fileStore.tileId(tileid);

      return self.fileStore.saveToTile(NODE_USED_FILES, self.digitalResourceId())
        .then(function(t) {
          if (t && t.tileid) self.tiles.fileListTileId(t.tileid);
          return t;
        });
    };

    self.loadExistingResourceContext = function() {
      var rid = self.digitalResourceId();
      if (!rid) {
        return Promise.reject(new Error('Missing existing IIIF resource id.'));
      }

      self.loading(true);
      self.errorMessage('');

      return fetch(baseUrl + 'api/iiif/resource-context/' + encodeURIComponent(rid), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'same-origin'
      })
      .then(function(resp) {
        if (!resp.ok) {
          return resp.json().catch(function() { return {}; }).then(function(err) {
            throw new Error(err.error || ('Failed to load IIIF resource context (' + resp.status + ')'));
          });
        }
        return resp.json();
      })
      .then(function(ctx) {
        self.resourceName(ctx.resource_name || '');
        self.manifestUrl(ctx.manifest_url || '');

        if (ctx.tiles) {
          self.tiles.urlTileId(ctx.tiles.iiif_url_tile_id || null);
          self.tiles.fileListTileId(ctx.tiles.used_files_tile_id || null);
        }

        var files = _normalizeUsedFileEntriesForStore(ctx.used_files);
        
        // append workflow: ładujemy istniejące USED_FILES, ale ich nie kasujemy docelowo
        self.fileStore.clear();
        self.fileStore.tileId(self.tiles.fileListTileId());
        self.fileStore.upsert(files);

        // Sprawdzamy tryb na podstawie pliku manifestu (odczytujemy 'label')
        var mUrl = ctx.manifest_url;
        if (!mUrl) {
          self.modeLocked(false);
          self.resourceContextLoaded(true);
          return ctx;
        }

        var absoluteManifestUrl = mUrl.indexOf('http') === 0 ? mUrl : (baseUrl + mUrl.replace(/^\/+/, ''));
        
        return fetch(absoluteManifestUrl)
          .then(function(r) { return r.json(); })
          .then(function(manifest) {
            var label = _extractText(manifest && manifest.label || '').toLowerCase();
            var isPhoto = label.indexOf('photo') !== -1;
            
            self.uploadMode(isPhoto ? 'photo' : 'geotiff');
            self.modeLocked(true);
            self.resourceContextLoaded(true);
            return ctx;
          })
          .catch(function(err) {
            console.warn('[IIIF-APPEND] Could not fetch manifest to detect mode', err);
            self.resourceContextLoaded(true);
            return ctx;
          });
      })
      .finally(function() {
        self.loading(false);
      });
    };

    ko.computed(function() {
      var rid = self.digitalResourceId();
      if (!rid) return;

      self.resourceContextLoaded(false);

      self.loadExistingResourceContext().catch(function(err) {
        self.errorMessage(err && err.message ? err.message : String(err));
      });
    });

    function _isAllowedForCurrentMode(file) {
      var name = (file && file.name ? file.name : '').toLowerCase();
      if (self.isPhotoMode()) return /\.(jpe?g|png|tiff?)$/.test(name);
      return /\.(tif|tiff)$/.test(name);
    }

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
        console.warn('[IIIF-APPEND-STEP] dropzone.removeFile failed:', e);
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

    self.dropzone = null;
    self.dropzoneOptionsCreate = {
      url: baseUrl,
      dictDefaultMessage: '',
      maxFilesize: 4096,
      autoProcessQueue: false,
      uploadMultiple: true,
      autoQueue: false,
      createImageThumbnails: false,
      clickable: '.fileinput-create-button',
      previewsContainer: '#hidden-dz-append-previews',
      init: function() {
        var dz = this;
        self.dropzone = dz;

        function addToQueue(file) {
          if (!file || !file.name || typeof file.name !== 'string') return;

          if (!_isAllowedForCurrentMode(file)) {
            self.errorMessage(
              self.isPhotoMode()
                ? 'Photo mode: only JPG/PNG/TIFF are allowed.'
                : 'GeoTIFF mode: only TIF/TIFF are allowed.'
            );
            try {
              if (self.dropzone) self.dropzone.removeFile(file);
            } catch (_) {}
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
            task_id: null,
            job_id: null,
            file_id: null,
            iiif_service_url: null,
            fileMetadata: null,
            derivedItems: []
          });
        }

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
          console.error('[IIIF-APPEND-STEP] Dropzone error:', error);
          file.error = error;
        });
      }
    };

    self.queueRunner = new QueueRunner({
      maxParallel: self.maxParallel,
      queue: self.queue, // FIX: było "list", musi być "queue"
      processItem: function(item) {
        console.log('[IIIF-APPEND] processItem start:', item && item.name, item && item.statusObs && item.statusObs());
        return self.processOne(item);
      },
      onDrain: function() {
        console.log('[IIIF-APPEND] queue drained -> finalizeManifest()');
        return self.finalizeManifest();
      }
    });

    // debug: podgląd statusów kolejki
    self._queueDebugSub = ko.computed(function() {
      var snapshot = self.queue().map(function(it) {
        return {
          name: it && it.name,
          status: it && it.statusObs ? it.statusObs() : null,
          task_id: it && it.task_id,
          job_id: it && it.job_id
        };
      });
      console.log('[IIIF-APPEND] queue snapshot:', snapshot);
    });

    self.startUpload = function() {
      var toQueue = self.queue().filter(function(it) {
        return it && it.statusObs && it.statusObs() === 'selected';
      });

      console.log('[IIIF-APPEND] startUpload click', {
        digitalResourceId: self.digitalResourceId(),
        resourceContextLoaded: self.resourceContextLoaded(),
        selectedCount: toQueue.length
      });

      if (!self.digitalResourceId()) {
        self.errorMessage('No IIIF resource selected.');
        self.progressPhase('error');
        return;
      }

      if (!self.resourceContextLoaded()) {
        self.progressPhase('uploading');
        self.progressStatus('Loading resource context...');
        self.errorMessage('');
        return self.loadExistingResourceContext()
          .then(function() { self.startUpload(); })
          .catch(function(err) {
            self.progressPhase('error');
            self.errorMessage(err && err.message ? err.message : String(err));
          });
      }

      if (!toQueue.length) {
        self.errorMessage('Please select at least one file.');
        self.progressPhase('error');
        return;
      }

      self.errorMessage('');
      self.queueRunner.resetDrain();
      toQueue.forEach(function(it) { it.statusObs('queued'); });

      console.log('[IIIF-APPEND] queued items:', toQueue.map(function(it) { return it.name; }));

      self.progressPhase('uploading');
      self.progressStatus('Uploading ' + toQueue.length + ' file(s)...');
      self.queueRunner.run();
    };

    self.processOne = function(item) {
      console.log('[IIIF-APPEND] processOne ENTER:', item && item.name);
      item.statusObs('uploading');
      self.progressStatus('Uploading ' + item.name + '...');

      var fd = new FormData();
      fd.append('file', item.file, item.file.name);

      var baseName = utils.stripExt(item.file.name);
      fd.append('base_name', baseName);
      fd.append('resource_id', self.digitalResourceId());
      fd.append('resource_name', self.resourceName() || baseName);

      if (self.isPhotoMode()) {
        return fetch(baseUrl + 'api/iiif/photo-upload', {
          method: 'POST',
          headers: { 'X-CSRFToken': csrftoken },
          body: fd,
          credentials: 'same-origin'
        })
        .then(function(resp) {
          if (!resp.ok) {
            return resp.json().then(function(e) {
              throw new Error(e.error || 'Photo upload failed');
            });
          }
          return resp.json(); // FIX: było resp.json
        })
        .then(function(r) {
          item.job_id = r.job_id || null;
          item.file_id = r.job_id || item.file_id || utils.uuidv4();
          item.iiif_service_url = r && r.titiler ? r.titiler.iiif_service_url : null;
          item.fileMetadata = r.metadata || null;
          item.derivedItems = [];
          item.statusObs('ready');

          self.fileStore.upsert(_normalizeUsedFileEntriesForStore([{
            file_id: item.file_id,
            name: item.name,
            type: r.format || item.file.type || 'image/jpeg',
            size: item.file && item.file.size,
            status: 'uploaded',
            url: utils.toAbsoluteUrl(r.download_url_original || ''),
            description: item.iiif_service_url ? ('IIIF: ' + item.iiif_service_url) : ''
          }]));

          // nie blokuj całego uploadu gdy zapis USED_FILES się nie uda
          return self.saveUsedFilesTile().catch(function(e) {
            console.warn('[IIIF-APPEND] saveUsedFilesTile failed (non-fatal):', e);
          });
        })
        .catch(function(err) {
          console.error('[IIIF-APPEND] processOne ERROR:', item && item.name, err);
          item.statusObs('failed');
          self.errorMessage(
            (self.errorMessage() ? (self.errorMessage() + '\n') : '') +
            (err && err.message ? err.message : String(err))
          );
        });
      }

      var forceDem = !!(item.isDemObs && item.isDemObs());
      var makeHillshade = forceDem && (!item.makeHillshadeObs || item.makeHillshadeObs());

      fd.append('role', forceDem ? 'dem' : 'ortho');
      fd.append('force_dem', forceDem ? '1' : '0');
      fd.append('make_hillshade', makeHillshade ? '1' : '0');

      return iiifApi.uploadGeotiff(baseUrl, csrftoken, { formData: fd })
        .then(function(r) {
          item.task_id = r.task_id || r.job_id;
          item.job_id = r.job_id || null;
          item.file_id = r.job_id || item.file_id || utils.uuidv4();

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

          self.fileStore.upsert(_normalizeUsedFileEntriesForStore(entries));
          item.statusObs('processing');
          self.progressStatus('Processing ' + item.name + '...');

          return self.saveUsedFilesTile().then(function() {
            return iiifApi.pollTaskStatus(baseUrl, item.task_id, {
              pollInterval: 2000,
              maxAttempts: 600
            });
          });
        })
        .then(function(st) {
          var state = st.state || st.status || 'UNKNOWN';

          if (state === 'FAILURE') {
            var failMsg =
              (st && st.result && (st.result.exc_message || st.result.error)) ||
              st.error ||
              'Celery: FAILURE';

            item.statusObs('failed');
            self.errorMessage(
              (self.errorMessage() ? (self.errorMessage() + '\n') : '') +
              item.name + ': ' + failMsg
            );

            self.fileStore.upsert(_normalizeUsedFileEntriesForStore([{
              file_id: item.file_id,
              status: 'failed',
              description: failMsg
            }]));

            return self.saveUsedFilesTile().catch(function(e) {
              console.warn('[IIIF-APPEND] saveUsedFilesTile failed on FAILURE branch (non-fatal):', e);
            });
          }

          var result = st.result || st;
          var svc = result && result.titiler && result.titiler.iiif_service_url;
          item.iiif_service_url = svc || null;
          item.fileMetadata = (result && result.metadata) ? result.metadata : null;

          var derivedItems = [];

          var hsSvc = utils.getDerivedIiifServiceUrl(result, 'hillshade');
          if (hsSvc) {
            derivedItems.push({
              kind: 'hillshade',
              label: item.name + ' (hillshade)',
              iiif_service_url: hsSvc
            });
            self.fileStore.upsert([{
              file_id: item.file_id + '_hillshade',
              description: 'IIIF: ' + hsSvc
            }]);
          }

          var crSvc = utils.getDerivedIiifServiceUrl(result, 'color_relief');
          if (crSvc) {
            derivedItems.push({
              kind: 'colorrelief',
              label: item.name + ' (color relief)',
              iiif_service_url: crSvc
            });
            self.fileStore.upsert([{
              file_id: item.file_id + '_colorrelief',
              description: 'IIIF: ' + crSvc
            }]);
          }

          item.derivedItems = derivedItems;
          item.statusObs('ready');

          self.fileStore.upsert([{
            file_id: item.file_id,
            status: 'uploaded',
            description: svc ? ('IIIF: ' + svc) : ''
          }]);

          return self.saveUsedFilesTile().catch(function(e) {
            console.warn('[IIIF-APPEND] saveUsedFilesTile failed after success (non-fatal):', e);
          });
        })
        .catch(function(err) {
          item.statusObs('failed');
          self.errorMessage(
            (self.errorMessage() ? (self.errorMessage() + '\n') : '') +
            (err && err.message ? err.message : String(err))
          );

          if (item.file_id) {
            self.fileStore.upsert([{
              file_id: item.file_id,
              status: 'failed',
              description: 'Upload/poll error'
            }]);
            return self.saveUsedFilesTile().catch(function(e) {
              console.warn('[IIIF-APPEND] saveUsedFilesTile failed in catch (non-fatal):', e);
            });
          }
        });
    };

    self.finalizeManifest = function() {
      console.log('[IIIF-APPEND] finalizeManifest ENTER');
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
            metadata: it.fileMetadata || {}
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
        self.errorMessage(
          self.errorMessage() || 'No file processed successfully, cannot append manifest items.'
        );
        self.isFinalizing(false);
        return;
      }

      self.progressPhase('processing');
      self.progressStatus('Appending manifest items...');

      // FIX: endpoint zgodny z urls.py (ManifestEditView)
      return fetch(baseUrl + 'api/iiif/geotiff-manifest/edit/' + encodeURIComponent(self.digitalResourceId()), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          mode: 'append_items',
          resource_id: self.digitalResourceId(),
          resource_name: self.resourceName(),
          label: self.isPhotoMode() ? 'Photo manifest' : 'GeoTIFF manifest',
          iiif_version: 3,
          items: services
        })
      })
      .then(function(resp) {
        console.log('[IIIF-APPEND] finalizeManifest response status:', resp.status);
        return resp.json().then(function(data) {
          if (!resp.ok) throw new Error(data.error || 'Append manifest failed');
          return data;
        });
      })
      .then(function(r) {
        var manifestUrl = r.manifest_url || self.manifestUrl();
        if (!manifestUrl) throw new Error('No manifest_url returned');

        self.manifestUrl(manifestUrl);

        var data = utils.makeLangValue(manifestUrl, arches);
        return utils.createOrUpdateTile(
          NODE_IIIF_URL,
          self.digitalResourceId(),
          self.tiles.urlTileId(),
          data
        ).then(function(t) {
          if (t && t.tileid) self.tiles.urlTileId(t.tileid);

          self.progressPhase('complete');
          self.progressStatus('Done');

          var valueData = {
            digitalResourceId: self.digitalResourceId(),
            manifestUrl: manifestUrl,
            appendedCount: services.length
          };

          if (typeof params.value === 'function') params.value(valueData);
          if (params.form && params.form.value) params.form.value(valueData);

          setTimeout(function() { self.progressStatus(''); }, 800);
          return manifestUrl;
        });
      })
      .catch(function(err) {
        self.progressPhase('error');
        self.progressStatus('Append failed');
        self.errorMessage(
          'Failed to append/update manifest: ' +
          (err && err.message ? err.message : String(err))
        );
      })
      .finally(function() {
        self.isFinalizing(false);
      });
    };

    if (params.form && typeof params.form.complete === 'function') {
      params.form.complete(ko.pureComputed(function() {
        return !!self.digitalResourceId() && self.queue().length > 0;
      }));
    }

    return self;
  }

  return ko.components.register('iiif-image-append-step', {
    viewModel: viewModel,
    template: template
  });
});