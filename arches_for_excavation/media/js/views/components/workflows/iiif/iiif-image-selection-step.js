define([
  'knockout',
  'arches',
  'templates/views/components/workflows/iiif/iiif-image-selection-step.htm',
  'bindings/dropzone'
], function(ko, arches, template) {

  console.log('[WF LOG][image-select] Module loaded');

  function viewModel(params) {
    var self = this;

    console.log('[WF LOG][image-select] viewModel initializing');

    // ---- STATE ----
    self.manifestUrl        = ko.observable('');
    self.imageServiceUrl    = ko.observable('');
    self.selectedImageIndex = ko.observable(null);
    self.loading            = ko.observable(false);
    self.errorMessage       = ko.observable('');
    self.availableImages    = ko.observableArray([]);

    // Arches will persist params.value() as ['image-selection']['image-selection-instance']['value']
    if (typeof params.value !== 'function') {
      params.value = ko.observable();
    }

    // For uploads -> POST /manifest_manager
    self.formData = new window.FormData();
    self.dropzone = null;

    // ---- HELPERS ----
    // --- CSRF helper (standard Django pattern) ---
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    function normalizeHost(url) {
      if (!url) return url;
      return url
        .replace('cantaloupe_arches_slocal:8182', 'localhost:8183')
        .replace('cantaloupe_arches_slocal', 'localhost');
    }

    function serviceFromTile(url) {
      var idx = url.indexOf('/full/');
      return idx > -1 ? url.substring(0, idx) : url;
    }

    function imagesFromCanvases(canvases) {
      var images = [];
      (canvases || []).forEach(function(canvas) {
        try {
          var img = canvas.images && canvas.images[0];
          var svc = img && img.resource && img.resource.service &&
                    (img.resource.service['@id'] || img.resource.service.id);
          if (svc) {
            svc = normalizeHost(svc);
            images.push({
              label: canvas.label || 'Untitled',
              serviceUrl: svc,
              thumbnail: svc.replace(/\/$/, '') + '/full/200,/0/default.jpg'
            });
          }
        } catch (e) {
          console.log('[WF LOG][image-select] imagesFromCanvases error:', e, canvas);
        }
      });
      return images;
    }

    // ========= SOURCE A: manual manifest / info.json URL =========

    self.manifestUrl.subscribe(function(url) {
      self.errorMessage('');
      if (!url) return;
      self.loadManifest(url.trim());
    });

    self.loadManifest = function(url) {
      console.log('[WF LOG][image-select] loadManifest:', url);
      self.loading(true);
      self.availableImages.removeAll();
      self.imageServiceUrl('');
      params.value(undefined);

      // if user pasted a tile URL, convert to info.json
      if (/\/full\/.+\/default\.jpg(?:$|\?)/i.test(url)) {
        url = serviceFromTile(url).replace(/\/$/, '') + '/info.json';
      }

      fetch(url, { credentials: 'include' })
        .then(function(resp) {
          console.log('[WF LOG][image-select] manifest response status:', resp.status);
          if (!resp.ok) throw new Error('HTTP ' + resp.status);
          return resp.json();
        })
        .then(function(data) {
          console.log('[WF LOG][image-select] manifest payload:', data);

          // IIIF Presentation v2 Manifest
          if (data['@type'] === 'sc:Manifest' && Array.isArray(data.sequences)) {
            var images = [];
            (data.sequences || []).forEach(function(seq) {
              images = images.concat(imagesFromCanvases(seq.canvases || []));
            });
            if (!images.length) throw new Error('No canvases with IIIF Image services found.');
            self.availableImages(images);
            self.loading(false);
            return;
          }

          // IIIF Image API info.json (v2/v3)
          if ((data['@context'] && String(data['@context']).indexOf('iiif.io/api/image') !== -1) ||
              (data['protocol'] && String(data['protocol']).indexOf('iiif.io/api/image') !== -1)) {

            var svcId = normalizeHost(data['@id'] || data['id']);
            if (!svcId) throw new Error('Missing service @id/id in info.json');

            self.availableImages([{
              label: data['@id'] || data['id'] || 'Image',
              serviceUrl: svcId,
              thumbnail: svcId.replace(/\/$/, '') + '/full/200,/0/default.jpg'
            }]);
            self.loading(false);
            return;
          }

          throw new Error('Unsupported IIIF payload (not Manifest or Image API info.json).');
        })
        .catch(function(err) {
          console.log('[WF LOG][image-select] Failed to load IIIF resource:', err);
          self.errorMessage('Failed to load IIIF resource: ' + err.message);
          self.loading(false);
        });
    };

    // ========= SOURCE B: upload photos -> create manifest -> loadManifest =========
    var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
    var manifestManagerUrl = (arches && arches.urls && arches.urls.manifest_manager) 
      ? arches.urls.manifest_manager 
      : baseUrl + 'image-service-manager';

    console.log('[WF LOG][image-select] Using baseUrl:', baseUrl, 'manifestManagerUrl:', manifestManagerUrl);

    self.dropzoneOptionsCreate = {
      url: baseUrl,  // CHANGED: use the safe baseUrl
      dictDefaultMessage: '',
      autoProcessQueue: false,
      uploadMultiple: true,
      autoQueue: false,
      clickable: '.fileinput-create-button',
      previewsContainer: '#hidden-dz-create-previews',
      init: function() {
        var dz = this;
        self.dropzone = dz;
        dz.on('addedfiles', function(files) {
          console.log('[WF LOG][image-select] dropzone addedfiles:', files.length);
          self.createManifestFromFiles(files);
        });
        dz.on('error', function(file, error) {
          console.log('[WF LOG][image-select] dropzone error:', error);
          file.error = error;
        });
      }
    };

    self.createManifestFromFiles = function(fileList) {
      if (!fileList || !fileList.length) return;

      self.errorMessage('');
      self.loading(true);
      self.availableImages.removeAll();
      self.imageServiceUrl('');
      params.value(undefined);

      // reset formData
      self.formData = new window.FormData();

      Array.from(fileList).forEach(function(file) {
        self.formData.append('files', file, file.name);
      });

      var title = 'Workflow upload ' + new Date().toISOString();

      self.formData.append('manifest_title', title);
      self.formData.append('manifest_description', 'Uploaded via IIIF annotation workflow');
      self.formData.append('operation', 'create');
      self.formData.append('transaction_id', params.form && params.form.workflowId || 'iiif-workflow');

      console.log('[WF LOG][image-select] POSTing to manifest_manager', manifestManagerUrl);

      fetch(manifestManagerUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrftoken,
          'Accept': 'application/json'
        },
        body: self.formData
      })
      .then(function(resp) {
        console.log('[WF LOG][image-select] manifest_manager status:', resp.status);
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        return resp.json();
      })
      .then(function(response) {
        console.log('[WF LOG][image-select] manifest_manager response:', response);
        if (response && response.url) {
          self.loadManifest(response.url);
        } else {
          throw new Error('Server did not return manifest URL');
        }
      })
      .catch(function(err) {
        console.log('[WF LOG][image-select] createManifestFromFiles error:', err);
        self.errorMessage('Failed to create manifest: ' + err.message);
        self.loading(false);
      })
      .finally(function() {
        if (self.dropzone) {
          self.dropzone.removeAllFiles(true);
        }
      });
    };

    // ========= SELECTION =========

    self.imageServiceUrl.subscribe(function(val) {
      console.log('[WF LOG][image-select] imageServiceUrl ->', val);
    });

    self.selectImage = function(image, index) {
      console.log('[WF LOG][image-select] selectImage ->', image, index);
      self.selectedImageIndex(index);
      self.imageServiceUrl(image.serviceUrl);

      // what the workflow actually persists
      params.value(image.serviceUrl);

      console.log('[WF LOG][image-select] now imageServiceUrl =', self.imageServiceUrl(), 'value =', params.value());
    };

    // ========= WORKFLOW GATING =========

    params.form.complete(ko.pureComputed(function () {
      return !!self.imageServiceUrl();
    }));

    var _origSave = params.form.save;
    params.form.save = function() {
      console.log('[WF LOG][image-select] save() value =', params.value(), 'imageServiceUrl =', self.imageServiceUrl());
      if (!self.imageServiceUrl()) {
        self.errorMessage('Please select an image before proceeding.');
        return Promise.resolve(false);
      }
      if (_origSave) return _origSave.apply(params.form, arguments);
      return Promise.resolve(true);
    };

    return self;
  }

  return ko.components.register('iiif-image-selection-step', {
    viewModel: viewModel,
    template: template
  });
});
