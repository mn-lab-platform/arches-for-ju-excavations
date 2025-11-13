define([
  'knockout',
  'arches',
  'templates/views/components/workflows/iiif/iiif-image-selection-step.htm',
  // side-effect deps: register component + dropzone binding
  'views/components/plugins/manifest-manager',
  'bindings/dropzone',
], function(ko, arches, template) {

  function viewModel(params) {
    var self = this;

    // state
    self.manifestUrl = ko.observable('');
    self.imageServiceUrl = ko.observable('');
    self.selectedImageIndex = ko.observable(null);
    self.loading = ko.observable(false);
    self.errorMessage = ko.observable('');
    self.availableImages = ko.observableArray([]);

    // data coming FROM manifest-manager component
    self.manifestManagerData = ko.observable(null);

    // Arches saves params.value() for this component as ['...']['value'].
    if (typeof params.value !== 'function') {
      params.value = ko.observable(); // ensure it exists
    }

    // helpers
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
          console.log('[WF LOG] imagesFromCanvases: error parsing canvas', e, canvas);
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
      console.log('[WF LOG] loadManifest:', url);
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
          console.log('[WF LOG] manifest response status:', resp.status);
          if (!resp.ok) throw new Error('HTTP ' + resp.status);
          return resp.json();
        })
        .then(function(data) {
          console.log('[WF LOG] manifest payload:', data);

          // IIIF Presentation v2 Manifest
          if (data['@type'] === 'sc:Manifest' && Array.isArray(data.sequences)) {
            var images = [];
            (data.sequences || []).forEach(function(seq) {
              images = images.concat(imagesFromCanvases(seq.canvases || []));
            });
            if (images.length === 0) throw new Error('No canvases with IIIF Image services found.');
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
          console.log('[WF LOG] Failed to load IIIF resource:', err);
          self.errorMessage('Failed to load IIIF resource: ' + err.message);
          self.loading(false);
        });
    };

    // ========= SOURCE B: manifest-manager (upload / create / select) =========

    self.manifestManagerData.subscribe(function(md) {
      console.log('[WF LOG] manifestManagerData updated:', md);
      self.availableImages.removeAll();
      self.imageServiceUrl('');
      self.selectedImageIndex(null);

      if (!md) return;

      try {
        // v2 style: sequences[0].canvases
        var seqs = md.sequences || [];
        if (seqs.length && Array.isArray(seqs[0].canvases)) {
          var images = [];
          (seqs || []).forEach(function(seq) {
            images = images.concat(imagesFromCanvases(seq.canvases || []));
          });
          if (images.length) {
            console.log('[WF LOG] manifestManagerData: got', images.length, 'images from v2 manifest');
            self.availableImages(images);
            return;
          }
        }

        // v3-style manifests (items[] of canvases)
        var items = md.items;
        if (Array.isArray(items) && items.length) {
          var canvases = items.map(function(c) {
            var anno = c.items && c.items[0] && c.items[0].items && c.items[0].items[0];
            var body = anno && anno.body;
            var service = body && (body.service || (Array.isArray(body.service) && body.service[0]));
            var svcId = service && (service['@id'] || service.id);
            return {
              label: c.label || 'Untitled',
              images: [{
                resource: {
                  service: svcId ? { '@id': svcId } : {}
                }
              }]
            };
          });
          var imagesV3 = imagesFromCanvases(canvases);
          if (imagesV3.length) {
            console.log('[WF LOG] manifestManagerData: got', imagesV3.length, 'images from v3 manifest');
            self.availableImages(imagesV3);
          }
        }
      } catch (e) {
        console.log('[WF LOG] manifestManagerData: error parsing manifest', e);
      }
    });

    // ========= SELECTION =========

    self.imageServiceUrl.subscribe(function(newVal) {
      console.log('[WF LOG] imageServiceUrl ->', newVal);
    });

    self.selectImage = function(image, index) {
      console.log('[WF LOG] selectImage ->', image, index);
      self.selectedImageIndex(index);
      self.imageServiceUrl(image.serviceUrl);

      // CRITICAL: this is what Arches persists as ['image-selection']['image-selection-instance']['value']
      params.value(image.serviceUrl);

      console.log('[WF LOG] now imageServiceUrl =', self.imageServiceUrl(), 'value =', params.value());
    };

    // ========= WORKFLOW GATING =========

    params.form.complete(ko.pureComputed(function () {
      return !!self.imageServiceUrl();
    }));

    // Let Arches do the normal save (it will persist params.value()).
    var _origSave = params.form.save;
    params.form.save = function() {
      console.log('[WF LOG] save() about to run; value =', params.value(), 'imageServiceUrl =', self.imageServiceUrl());
      if (!self.imageServiceUrl()) {
        self.errorMessage('Please select an image before proceeding.');
        return Promise.resolve(false);
      }
      if (_origSave) return _origSave.apply(params.form, arguments);
      return Promise.resolve(true);
    };

    // Add the manifest manager URL
    self.manifestManagerUrl = ko.pureComputed(function() {
      // Construct the URL directly instead of using arches.urls.plugin
      var baseUrl = arches.urls && arches.urls.root ? arches.urls.root : '/';
      return baseUrl + 'plugins/manifest-manager';
    });

    // Listen for messages from the manifest manager iframe
    window.addEventListener('message', function(event) {
      // Verify the origin for security
      if (event.origin !== window.location.origin) return;
      
      if (event.data && event.data.type === 'iiif-service-selected') {
        console.log('[WF LOG] Received service from manifest manager:', event.data.serviceUrl);
        self.manifestUrl(event.data.serviceUrl);
      }
    });

    return self;
  }

  return ko.components.register('iiif-image-selection-step', {
    viewModel: viewModel,
    template: template
  });
});
