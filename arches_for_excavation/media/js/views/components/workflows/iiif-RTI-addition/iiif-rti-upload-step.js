define([
  'knockout',
  'arches',
  'templates/views/components/workflows/iiif-RTI-addition/iiif-rti-upload-step.htm',
  'utils/iiif-addition-utils',
  '../../../../services/service-utils'
], function(ko, arches, template, utils, serviceUtils) {
  'use strict';

  var NODE_IIIF_LABEL = 'b9a36003-ef1c-4150-83dc-4d979e874065';
  var NODE_IIIF_URL = 'df47642e-dfc0-442f-a5cf-8c1247e9c5bb';
  var NODE_RELATED_RESOURCE = '8bedf116-657a-4eb5-af06-b4de29839966';
  var NODE_USED_FILES = '9469c29f-85c2-4fce-bdb8-cd5d101d49d9';

  var REL_ONTOLOGY_PROPERTY_ID = '';
  var REL_INVERSE_PROPERTY_ID = '';

  function viewModel(params) {
    var self = this;

    var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
    var csrftoken = serviceUtils.getCookie('csrftoken');

    self.stepTitle = ko.observable(params.stepTitle || 'Upload RTI Package');
    self.stepDescription = ko.observable(params.stepDescription || 'Upload a ZIP with JPG planes and Relight info.json.');

    self.hostResourceId = ko.observable(null);
    self.resourceName = ko.observable('');
    self.packageFile = ko.observable(null);
    self.packageFileName = ko.observable('');

    self.loading = ko.observable(false);
    self.errorMessage = ko.observable('');
    self.progressStatus = ko.observable('');

    self.jobId = ko.observable(null);
    self.digitalResourceId = ko.observable(null);
    self.manifestUrl = ko.observable('');
    self.metadataUrl = ko.observable('');
    self.planes = ko.observableArray([]);
    self.tiles = {
      labelTileId: ko.observable(null),
      urlTileId: ko.observable(null),
      relTileId: ko.observable(null),
      fileListTileId: ko.observable(null)
    };

    var hostParam = params.hostResourceId;
    if (typeof hostParam === 'function') {
      self.hostResourceId(ko.unwrap(hostParam) || null);
      ko.computed(function() {
        self.hostResourceId(ko.unwrap(hostParam) || null);
      });
    } else if (hostParam) {
      self.hostResourceId(hostParam);
    }

    function resetUploadResult() {
      self.jobId(null);
      self.digitalResourceId(null);
      self.manifestUrl('');
      self.metadataUrl('');
      self.planes([]);
      self.tiles.labelTileId(null);
      self.tiles.urlTileId(null);
      self.tiles.relTileId(null);
      self.tiles.fileListTileId(null);
    }

    function makeUsedFileEntry(entry) {
      return {
        accepted: true,
        altText: utils.makeLangValue(entry.altText || '', arches),
        title: utils.makeLangValue(entry.title || '', arches),
        attribution: utils.makeLangValue(entry.attribution || '', arches),
        description: utils.makeLangValue(entry.description || '', arches),
        content: null,
        file_id: entry.file_id || null,
        height: entry.height || null,
        width: entry.width || null,
        index: typeof entry.index === 'number' ? entry.index : 0,
        lastModified: Date.now(),
        name: entry.name || '',
        path: entry.path || null,
        size: typeof entry.size === 'number' ? entry.size : 0,
        status: entry.status || 'uploaded',
        type: entry.type || 'application/octet-stream',
        url: entry.url || null
      };
    }

    function buildUsedFilesEntries(data) {
      var entries = [makeUsedFileEntry({
        file_id: data.job_id,
        name: self.packageFileName() || 'RTI package',
        type: 'application/zip',
        status: 'uploaded',
        url: null,
        description: 'RTI ZIP package'
      }), makeUsedFileEntry({
        file_id: data.job_id + '_info',
        name: 'info.json',
        type: 'application/json',
        status: 'uploaded',
        url: utils.toAbsoluteUrl(data.metadata_url || data.info_url || ''),
        description: 'Relight RTI info.json'
      })];

      (Array.isArray(data.planes) ? data.planes : []).forEach(function(plane) {
        entries.push(makeUsedFileEntry({
          file_id: data.job_id + '_' + plane.name,
          name: plane.cog_filename || (plane.name + '.tif'),
          type: 'image/tiff',
          status: 'uploaded',
          url: null,
          description: plane.iiif_service_url ? ('IIIF: ' + plane.iiif_service_url) : ''
        }));
      });

      return entries;
    }

    self.saveDigitalResourceTiles = function(data) {
      var rid = data.resource_id;
      var manifestUrl = data.manifest_url;

      if (!rid) {
        return Promise.reject(new Error('Backend did not return resource_id.'));
      }

      if (!manifestUrl) {
        return Promise.reject(new Error('Backend did not return manifest_url.'));
      }

      var labelData = self.resourceName() || data.resource_name || 'RTI';
      var urlData = manifestUrl;
      var relTargets = [{
        resourceId: self.hostResourceId(),
        ontologyProperty: REL_ONTOLOGY_PROPERTY_ID,
        inverseOntologyProperty: REL_INVERSE_PROPERTY_ID,
        resourceXresourceId: ''
      }];
      var usedFiles = buildUsedFilesEntries(data);

      return utils.createOrUpdateTile(NODE_IIIF_LABEL, rid, '', labelData)
        .then(function(tile) {
          if (tile && tile.tileid) self.tiles.labelTileId(tile.tileid);
          return utils.createOrUpdateTile(NODE_IIIF_URL, rid, '', urlData);
        })
        .then(function(tile) {
          if (tile && tile.tileid) self.tiles.urlTileId(tile.tileid);
          return utils.createOrUpdateTile(NODE_RELATED_RESOURCE, rid, '', relTargets);
        })
        .then(function(tile) {
          if (tile && tile.tileid) self.tiles.relTileId(tile.tileid);
          return utils.createOrUpdateTile(NODE_USED_FILES, rid, '', usedFiles);
        })
        .then(function(tile) {
          if (tile && tile.tileid) self.tiles.fileListTileId(tile.tileid);
          return data;
        });
    };

    self.onPackageSelected = function(_data, event) {
      var file = event.target.files && event.target.files[0];

      self.errorMessage('');
      self.progressStatus('');
      self.packageFile(null);
      self.packageFileName('');
      resetUploadResult();

      if (!file) return;

      if (!/\.zip$/i.test(file.name || '')) {
        self.errorMessage('Select a ZIP file.');
        event.target.value = '';
        return;
      }

      self.packageFile(file);
      self.packageFileName(file.name);
      self.progressStatus('ZIP selected. Ready to upload.');
    };

    self.uploadPackage = function() {
      var file = self.packageFile();

      if (!file) {
        self.errorMessage('Select a ZIP file first.');
        return;
      }

      self.loading(true);
      self.errorMessage('');
      self.progressStatus('Uploading and processing RTI package...');
      resetUploadResult();

      var fd = new FormData();
      fd.append('file', file, file.name);
      fd.append('resource_name', self.resourceName() || 'RTI');

      if (self.digitalResourceId()) {
        fd.append('resource_id', self.digitalResourceId());
      }

      return fetch(baseUrl + 'api/iiif/rti-upload', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken,
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        body: fd
      })
      .then(function(resp) {
        return resp.json().catch(function() {
          return {};
        }).then(function(data) {
          if (!resp.ok) {
            throw new Error(data.error || ('RTI upload failed: HTTP ' + resp.status));
          }
          return data;
        });
      })
      .then(function(data) {
        self.progressStatus('Saving RTI Digital Resource...');
        return self.saveDigitalResourceTiles(data);
      })
      .then(function(data) {
        self.jobId(data.job_id || null);
        self.digitalResourceId(data.resource_id || null);
        self.metadataUrl(data.metadata_url || data.info_url || '');
        self.planes(Array.isArray(data.planes) ? data.planes : []);
        self.manifestUrl(data.manifest_url || '');

        self.progressStatus(
          'RTI resource saved. Created ' + self.planes().length + ' IIIF plane(s).'
        );

        if (typeof params.value === 'function') {
          params.value({
            jobId: self.jobId(),
            digitalResourceId: self.digitalResourceId(),
            manifestUrl: self.manifestUrl(),
            metadataUrl: self.metadataUrl(),
            planes: self.planes()
          });
        }

        if (params.form && params.form.value) {
          params.form.value({
            jobId: self.jobId(),
            digitalResourceId: self.digitalResourceId(),
            manifestUrl: self.manifestUrl(),
            metadataUrl: self.metadataUrl(),
            planes: self.planes()
          });
        }
      })
      .catch(function(err) {
        self.errorMessage(err && err.message ? err.message : String(err));
        self.progressStatus('');
      })
      .finally(function() {
        self.loading(false);
      });
    };

    if (params.form && typeof params.form.complete === 'function') {
      params.form.complete(ko.pureComputed(function() {
        return !!self.digitalResourceId() && !!self.metadataUrl() && self.planes().length > 0;
      }));
    }

    return self;
  }

  return ko.components.register('iiif-rti-upload-step', {
    viewModel: viewModel,
    template: template
  });
});
