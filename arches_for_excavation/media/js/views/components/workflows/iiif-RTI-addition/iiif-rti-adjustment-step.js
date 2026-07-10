define([
  'knockout',
  'arches',
  'templates/views/components/workflows/iiif-RTI-addition/iiif-rti-adjustment-step.htm',
  'views/components/iiif/iiif-RTI-viewer',
  '../../../../services/service-utils'
], function(ko, arches, template, _rtiViewer, serviceUtils) {
  'use strict';

  function readParamObservable(param) {
    var value = ko.observable(null);

    if (typeof param === 'function') {
      value(ko.unwrap(param) || null);
      ko.computed(function() {
        value(ko.unwrap(param) || null);
      });
    } else if (param) {
      value(param);
    }

    return value;
  }

  function viewModel(params) {
    var self = this;
    var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
    var csrftoken = serviceUtils.getCookie('csrftoken');

    self.stepTitle = ko.observable(params.stepTitle || 'Adjust RTI View');
    self.stepDescription = ko.observable(params.stepDescription || 'Set initial RTI rotation.');
    self.metadataUrl = readParamObservable(params.metadataUrl);
    self.planes = readParamObservable(params.planes);

    self.rtiResourceId = readParamObservable(params.rtiResourceId);
    self.manifestUrl = readParamObservable(params.manifestUrl);

    self.rotation = ko.observable(0);
    self.cropEnabled = ko.observable(false);
    self.cropSelection = ko.observable(null);
    self.cropping = ko.observable(false);
    self.viewerVisible = ko.observable(true);

    self.saved = ko.observable(false);
    self.statusMessage = ko.observable('');
    self.errorMessage = ko.observable('');
    self.saving = ko.observable(false);

    self.rotation.subscribe(function() {
      self.saved(false);
    });

    self.cropSelection.subscribe(function() {
      self.saved(false);
    });

    self.handleCropSelected = function(crop) {
      self.cropSelection(crop);
      self.statusMessage('Crop selected. Apply it to create new cropped RTI rasters.');
      self.errorMessage('');
    };

    self.toggleCropMode = function() {
      self.cropEnabled(!self.cropEnabled());
      self.statusMessage(self.cropEnabled() ? 'Drag over the viewer to select a crop area.' : '');
      self.errorMessage('');
    };

    self.clearCropSelection = function() {
      self.cropSelection(null);
      self.cropEnabled(false);
      self.statusMessage('');
    };

    self.reloadViewer = function() {
      self.viewerVisible(false);
      setTimeout(function() {
        self.viewerVisible(true);
      }, 0);
    };

    self.applyCrop = function() {
      var rid = self.rtiResourceId();
      var crop = self.cropSelection();

      if (!rid) {
        self.errorMessage('Missing RTI resource id.');
        return;
      }

      if (!crop) {
        self.errorMessage('Select a crop area first.');
        return;
      }

      self.cropping(true);
      self.errorMessage('');
      self.statusMessage('Cropping RTI rasters...');

      console.log('[iiif-rti-adjustment-step] applyCrop payload', {
        rtiResourceId: rid,
        crop: crop
      });

      return fetch(baseUrl + 'api/iiif/rti-manifest/' + encodeURIComponent(rid) + '/crop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'same-origin',
        body: JSON.stringify({ crop: crop })
      })
      .then(function(resp) {
        return resp.json().catch(function() { return {}; }).then(function(data) {
          if (!resp.ok) throw new Error(data.error || ('Crop failed: HTTP ' + resp.status));
          return data;
        });
      })
      .then(function(data) {
        console.log('[iiif-rti-adjustment-step] applyCrop response', data);

        if (Array.isArray(data.planes)) {
          self.planes(data.planes);
        }

        self.cropEnabled(false);
        self.cropSelection(data.crop || crop);
        self.statusMessage('Crop applied. Viewer now uses cropped RTI rasters.');
        self.saved(false);
        self.reloadViewer();
      })
      .catch(function(err) {
        self.errorMessage(err && err.message ? err.message : String(err));
        self.statusMessage('');
      })
      .finally(function() {
        self.cropping(false);
      });
    };

    self.saveSettings = function() {
      var rid = self.rtiResourceId();
      var settings = {
        rtiResourceId: self.rtiResourceId(),
        manifestUrl: self.manifestUrl(),
        rotation: Number(self.rotation() || 0)
      };

      console.log('[iiif-rti-adjustment-step] saveSettings payload', settings);

      if (!rid) {
        self.errorMessage('Missing RTI resource id.');
        return;
      }

      self.saving(true);
      self.errorMessage('');
      self.statusMessage('Saving RTI settings...');

      return fetch(baseUrl + 'api/iiif/rti-manifest/' + encodeURIComponent(rid) + '/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'same-origin',
        body: JSON.stringify(settings)
      })
      .then(function(resp) {
        return resp.json().catch(function() { return {}; }).then(function(data) {
          if (!resp.ok) throw new Error(data.error || ('Settings save failed: HTTP ' + resp.status));
          return data;
        });
      })
      .then(function(data) {
        console.log('[iiif-rti-adjustment-step] saveSettings response', data);
        self.saved(true);
        self.statusMessage('RTI settings saved to manifest.');

        var value = Object.assign({}, settings, {
          manifestUrl: data.manifest_url || settings.manifestUrl,
          crop: self.cropSelection(),
          planes: self.planes()
        });

        if (typeof params.value === 'function') params.value(value);
        if (params.form && params.form.value) params.form.value(value);
      })
      .catch(function(err) {
        self.saved(false);
        self.statusMessage('');
        self.errorMessage(err && err.message ? err.message : String(err));
      })
      .finally(function() {
        self.saving(false);
      });
    };

    if (params.form && typeof params.form.complete === 'function') {
      params.form.complete(ko.pureComputed(function() {
        return self.saved();
      }));
    }

    return self;
  }

  return ko.components.register('iiif-rti-adjustment-step', {
    viewModel: viewModel,
    template: template
  });
});

