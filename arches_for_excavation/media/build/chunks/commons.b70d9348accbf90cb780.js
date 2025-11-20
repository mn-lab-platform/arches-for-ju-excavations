(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[62834],{

/***/ 62834:
/*!*********************************************************************************************!*\
  !*** ./arches_slocal/media/js/views/components/workflows/iiif/iiif-image-selection-step.js ***!
  \*********************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// media/js/views/components/workflows/iiif/iiif-image-selection-step.js
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! knockout */ 51786), __webpack_require__(/*! arches */ 77126), __webpack_require__(/*! templates/views/components/workflows/iiif/iiif-image-selection-step.htm */ 86524), __webpack_require__(/*! bindings/dropzone */ 99152)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (ko, arches, template) {
  console.log('[WF LOG][image-select] Module loaded');

  // ==== KONSTANTY Z GRAFU "iiif-digital" ====
  // UWAGA: to są ID NODEGROUPÓW, nie grafu
  var IIIF_DIGITAL_GRAPH_ID = 'd948ccf4-bfb7-4dd6-b691-4050e3e0a19d';
  // JEDEN nodegroup – ta pierwsza linijka z grafu
  var DIGITAL_RES_NODEGROUP_ID = '04271267-d0a3-4930-8be3-0e8a2a34a735';

  // Trzy NODE_ID – te z wierszy: relation / iiif-url / _label
  var DIGITAL_RES_LABEL_NODE_ID = '85301074-1385-40fd-9a73-43692fe242dd';
  var DIGITAL_RES_URL_NODE_ID = 'aa8a8e71-4a98-4071-89c3-12fbe5ca9337';
  var DIGITAL_RES_REL_NODE_ID = '9b7e1d56-2f2b-411b-8491-4dd40d34e8b3';
  var REL_ONTOLOGY_PROPERTY_ID = null;
  var REL_INVERSE_PROPERTY_ID = null;
  // ====== HELPERS ======

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  function makeLangValue(value) {
    var lang = arches && arches.activeLanguage ? arches.activeLanguage : 'en';
    var obj = {};
    obj[lang] = {
      value: value,
      direction: 'ltr'
    };
    return obj;
  }
  function normalizeHost(url) {
    if (!url) {
      return url;
    }
    return url.replace('cantaloupe_arches_slocal:8182', 'localhost:8183').replace('cantaloupe_arches_slocal', 'localhost');
  }
  function serviceFromTile(url) {
    var idx = url.indexOf('/full/');
    return idx > -1 ? url.substring(0, idx) : url;
  }
  function imagesFromCanvases(canvases) {
    var images = [];
    (canvases || []).forEach(function (canvas) {
      try {
        var img = canvas.images && canvas.images[0];
        var svc = img && img.resource && img.resource.service && (img.resource.service['@id'] || img.resource.service.id);
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
  function postTile(nodegroupId, data, resourceId) {
    var payload = {
      tileid: '',
      nodegroup_id: nodegroupId,
      parenttile_id: null,
      resourceinstance_id: resourceId,
      sortorder: 0,
      tiles: {},
      data: data
    };
    var formData = new window.FormData();
    formData.append('data', JSON.stringify(payload));
    var baseUrl = arches && arches.urls && arches.urls.root ? arches.urls.root : '/';
    var url = arches.urls && typeof arches.urls.api_tile === 'string' ? arches.urls.api_tile // np. "/tile"
    : baseUrl + 'tile';
    console.log('[WF LOG][image-select] POST tile ->', url, payload);
    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: formData
    }).then(function (resp) {
      if (!resp.ok) {
        throw new Error('HTTP ' + resp.status);
      }
      return resp.json ? resp.json() : {};
    });
  }

  // =============================================================
  function viewModel(params) {
    var self = this;
    console.log('[WF LOG][image-select] ========== INIT ==========');
    console.log('[WF LOG][image-select] params:', params);
    console.log('[WF LOG][image-select] params.hostResourceId:', params.hostResourceId);
    console.log('[WF LOG][image-select] params.form:', params.form);
    console.log('[WF LOG][image-select] params.form.resourceid:', params.form && params.form.resourceid);

    // ===== host resource z kroku 1 =====
    self.targetResourceId = ko.observable(null);
    var hostParam = params.hostResourceId;
    console.log('[WF LOG][image-select] hostParam type:', _typeof(hostParam));
    console.log('[WF LOG][image-select] hostParam value:', hostParam);
    if (typeof hostParam === 'function') {
      // workflow turned the string path into a ko.computed/observable
      var unwrapped = ko.unwrap(hostParam);
      console.log('[WF LOG][image-select] hostParam is function, unwrapped value:', unwrapped);
      self.targetResourceId(unwrapped || null);

      // Subscribe to changes
      ko.computed(function () {
        var val = ko.unwrap(hostParam);
        console.log('[WF LOG][image-select] hostResourceId changed to:', val);
        self.targetResourceId(val || null);
      });
    } else if (hostParam) {
      // literal value
      console.log('[WF LOG][image-select] hostParam is literal value:', hostParam);
      self.targetResourceId(hostParam);
    } else if (params.form && params.form.resourceid) {
      // fallback jeśli trzymasz to też w formie
      console.log('[WF LOG][image-select] Using params.form.resourceid:', params.form.resourceid);
      self.targetResourceId(params.form.resourceid);
    }
    console.log('[WF LOG][image-select] Final targetResourceId:', self.targetResourceId());

    // ===== stan UI =====
    self.manifestUrl = ko.observable('');
    self.imageServiceUrl = ko.observable('');
    self.selectedImageIndex = ko.observable(null);
    self.loading = ko.observable(false);
    self.errorMessage = ko.observable('');
    self.availableImages = ko.observableArray([]);
    if (typeof params.value !== 'function') {
      params.value = ko.observable();
    }
    self.digitalResourceId = ko.observable(null);
    self.formData = new window.FormData();
    self.dropzone = null;
    var csrftoken = getCookie('csrftoken');
    var baseUrl = arches && arches.urls && arches.urls.root ? arches.urls.root : '/';
    var manifestManagerUrl = arches && arches.urls && arches.urls.manifest_manager ? arches.urls.manifest_manager : baseUrl + 'image-service-manager';
    console.log('[WF LOG][image-select] Using baseUrl:', baseUrl, 'manifestManagerUrl:', manifestManagerUrl);

    // ===================== CREATE digital resource: iiif =====================
    function postTile(nodegroupId, data, resourceId) {
      var payload = {
        tileid: '',
        nodegroup_id: nodegroupId,
        parenttile_id: null,
        resourceinstance_id: resourceId,
        sortorder: 0,
        tiles: {},
        data: data
      };
      var formData = new window.FormData();
      formData.append('data', JSON.stringify(payload));
      var baseUrl = arches && arches.urls && arches.urls.root ? arches.urls.root : '/';
      var url = arches.urls && typeof arches.urls.api_tile === 'string' ? arches.urls.api_tile : baseUrl + 'tile';
      return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: formData
      }).then(function (resp) {
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        return resp.json ? resp.json() : {};
      });
    }
    self.createDigitalResource = function (serviceUrl, labelText) {
      var resourceId = uuidv4();
      var label = labelText || serviceUrl || 'digital resource: iiif ' + new Date().toISOString();
      var labelData = {};
      labelData[DIGITAL_RES_LABEL_NODE_ID] = makeLangValue(label);
      var urlData = {};
      // jeśli datatype=string
      urlData[DIGITAL_RES_URL_NODE_ID] = makeLangValue(serviceUrl);
      var relData = {};
      relData[DIGITAL_RES_REL_NODE_ID] = [{
        resourceId: self.targetResourceId(),
        ontologyProperty: REL_ONTOLOGY_PROPERTY_ID || "",
        inverseOntologyProperty: REL_INVERSE_PROPERTY_ID || "",
        resourceXresourceId: "" // MUSI być, nawet pusty
      }];
      console.log("relData", relData);
      return postTile(DIGITAL_RES_LABEL_NODE_ID, labelData, resourceId).then(function () {
        return postTile(DIGITAL_RES_URL_NODE_ID, urlData, resourceId);
      }).then(function () {
        return postTile(DIGITAL_RES_REL_NODE_ID, relData, resourceId);
      }).then(function () {
        self.digitalResourceId(resourceId);
        params.value({
          imageServiceUrl: serviceUrl,
          digitalResourceId: resourceId,
          targetResourceId: self.targetResourceId()
        });
        return resourceId;
      });
    };

    // ========== SOURCE A: manifest / info.json ==========

    self.manifestUrl.subscribe(function (url) {
      self.errorMessage('');
      if (!url) {
        return;
      }
      self.loadManifest(url.trim());
    });
    self.loadManifest = function (url) {
      console.log('[WF LOG][image-select] loadManifest:', url);
      self.loading(true);
      self.availableImages.removeAll();
      self.imageServiceUrl('');
      params.value(undefined);
      self.digitalResourceId(null);
      if (/\/full\/.+\/default\.jpg(?:$|\?)/i.test(url)) {
        url = serviceFromTile(url).replace(/\/$/, '') + '/info.json';
      }
      fetch(url, {
        credentials: 'include'
      }).then(function (resp) {
        console.log('[WF LOG][image-select] manifest response status:', resp.status);
        if (!resp.ok) {
          throw new Error('HTTP ' + resp.status);
        }
        return resp.json();
      }).then(function (data) {
        console.log('[WF LOG][image-select] manifest payload:', data);
        if (data['@type'] === 'sc:Manifest' && Array.isArray(data.sequences)) {
          var images = [];
          (data.sequences || []).forEach(function (seq) {
            images = images.concat(imagesFromCanvases(seq.canvases || []));
          });
          if (!images.length) {
            throw new Error('No canvases with IIIF Image services found.');
          }
          self.availableImages(images);
          self.loading(false);
          return;
        }
        if (data['@context'] && String(data['@context']).indexOf('iiif.io/api/image') !== -1 || data['protocol'] && String(data['protocol']).indexOf('iiif.io/api/image') !== -1) {
          var svcId = normalizeHost(data['@id'] || data['id']);
          if (!svcId) {
            throw new Error('Missing service @id/id in info.json');
          }
          self.availableImages([{
            label: data['@id'] || data['id'] || 'Image',
            serviceUrl: svcId,
            thumbnail: svcId.replace(/\/$/, '') + '/full/200,/0/default.jpg'
          }]);
          self.loading(false);
          return;
        }
        throw new Error('Unsupported IIIF payload (not Manifest or Image API info.json).');
      }).catch(function (err) {
        console.log('[WF LOG][image-select] Failed to load IIIF resource:', err);
        self.errorMessage('Failed to load IIIF resource: ' + err.message);
        self.loading(false);
      });
    };

    // ========== SOURCE B: upload -> manifest -> loadManifest ==========

    self.dropzoneOptionsCreate = {
      url: baseUrl,
      dictDefaultMessage: '',
      autoProcessQueue: false,
      uploadMultiple: true,
      autoQueue: false,
      clickable: '.fileinput-create-button',
      previewsContainer: '#hidden-dz-create-previews',
      init: function init() {
        var dz = this;
        self.dropzone = dz;
        dz.on('addedfiles', function (files) {
          console.log('[WF LOG][image-select] dropzone addedfiles:', files.length);
          self.createManifestFromFiles(files);
        });
        dz.on('error', function (file, error) {
          console.log('[WF LOG][image-select] dropzone error:', error);
          file.error = error;
        });
      }
    };
    self.createManifestFromFiles = function (fileList) {
      if (!fileList || !fileList.length) {
        return;
      }
      self.errorMessage('');
      self.loading(true);
      self.availableImages.removeAll();
      self.imageServiceUrl('');
      params.value(undefined);
      self.digitalResourceId(null);
      self.formData = new window.FormData();
      Array.from(fileList).forEach(function (file) {
        self.formData.append('files', file, file.name);
      });
      var title = 'Workflow upload ' + new Date().toISOString();
      self.formData.append('manifest_title', title);
      self.formData.append('manifest_description', 'Uploaded via IIIF image workflow');
      self.formData.append('operation', 'create');
      self.formData.append('transaction_id', params.form && params.form.workflowId || 'iiif-image-workflow');
      console.log('[WF LOG][image-select] POSTing to manifest_manager', manifestManagerUrl);
      fetch(manifestManagerUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrftoken,
          'Accept': 'application/json'
        },
        body: self.formData
      }).then(function (resp) {
        console.log('[WF LOG][image-select] manifest_manager status:', resp.status);
        if (!resp.ok) {
          throw new Error('HTTP ' + resp.status);
        }
        return resp.json();
      }).then(function (response) {
        console.log('[WF LOG][image-select] manifest_manager response:', response);
        if (response && response.url) {
          self.loadManifest(response.url);
        } else {
          throw new Error('Server did not return manifest URL');
        }
      }).catch(function (err) {
        console.log('[WF LOG][image-select] createManifestFromFiles error:', err);
        self.errorMessage('Failed to create manifest: ' + err.message);
        self.loading(false);
      }).finally(function () {
        if (self.dropzone) {
          self.dropzone.removeAllFiles(true);
        }
      });
    };

    // ========== WYBÓR OBRAZU ==========

    self.imageServiceUrl.subscribe(function (val) {
      console.log('[WF LOG][image-select] imageServiceUrl ->', val);
    });
    self.selectImage = function (image, index) {
      console.log('[WF LOG][image-select] selectImage ->', image, index);
      self.selectedImageIndex(index);
      self.imageServiceUrl(image.serviceUrl);
      self.digitalResourceId(null);
      self.createDigitalResource(image.serviceUrl, image.label).then(function (resourceId) {
        console.log('[WF LOG][image-select] digital resource: iiif created with id', resourceId);
      }).catch(function (err) {
        console.error('[WF LOG][image-select] digital resource creation failed', err);
      });
    };

    // ========== GATING ==========

    params.form.complete(ko.pureComputed(function () {
      var ok = !!self.imageServiceUrl();
      console.log('[WF LOG][image-select] complete?', ok);
      return ok;
    }));
    var _origSave = params.form.save;
    params.form.save = function () {
      console.log('[WF LOG][image-select] save() value =', params.value(), 'imageServiceUrl =', self.imageServiceUrl(), 'digitalResourceId =', self.digitalResourceId(), 'targetResourceId =', self.targetResourceId());
      if (!self.imageServiceUrl()) {
        self.errorMessage('Please select an image before proceeding.');
        return Promise.resolve(false);
      }
      if (_origSave) {
        return _origSave.apply(params.form, arguments);
      }
      return Promise.resolve(true);
    };
    return self;
  }
  return ko.components.register('iiif-image-selection-step', {
    viewModel: viewModel,
    template: template
  });
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 86524:
/*!***********************************************************************************************!*\
  !*** ./arches_slocal/templates/views/components/workflows/iiif/iiif-image-selection-step.htm ***!
  \***********************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "templates/views/components/workflows/iiif/iiif-image-selection-step.htm";

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNoRixNQUFNLENBQUNHLElBQUksRUFBRThFLFNBQVMsQ0FBQztNQUNsRDtNQUNBLE9BQU9ILE9BQU8sQ0FBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQsT0FBTzlFLElBQUk7RUFDZjtFQUVBLE9BQU81RixFQUFFLENBQUM2SyxVQUFVLENBQUNDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtJQUN2RHBGLFNBQVMsRUFBRUEsU0FBUztJQUNwQnhGLFFBQVEsRUFBRUE7RUFDZCxDQUFDLENBQUM7QUFDTixDQUFDO0FBQUEsa0dBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9hcmNoZXNfc2xvY2FsL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvd29ya2Zsb3dzL2lpaWYvaWlpZi1pbWFnZS1zZWxlY3Rpb24tc3RlcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3dvcmtmbG93cy9paWlmL2lpaWYtaW1hZ2Utc2VsZWN0aW9uLXN0ZXAuanNcclxuZGVmaW5lKFtcclxuICAgICdrbm9ja291dCcsXHJcbiAgICAnYXJjaGVzJyxcclxuICAgICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy93b3JrZmxvd3MvaWlpZi9paWlmLWltYWdlLXNlbGVjdGlvbi1zdGVwLmh0bScsXHJcbiAgICAnYmluZGluZ3MvZHJvcHpvbmUnXHJcbl0sIGZ1bmN0aW9uKGtvLCBhcmNoZXMsIHRlbXBsYXRlKSB7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gTW9kdWxlIGxvYWRlZCcpO1xyXG5cclxuICAgIC8vID09PT0gS09OU1RBTlRZIFogR1JBRlUgXCJpaWlmLWRpZ2l0YWxcIiA9PT09XHJcbiAgICAvLyBVV0FHQTogdG8gc8SFIElEIE5PREVHUk9VUMOTVywgbmllIGdyYWZ1XHJcbiAgICB2YXIgSUlJRl9ESUdJVEFMX0dSQVBIX0lEID0gJ2Q5NDhjY2Y0LWJmYjctNGRkNi1iNjkxLTQwNTBlM2UwYTE5ZCcgICBcclxuICAgIC8vIEpFREVOIG5vZGVncm91cCDigJMgdGEgcGllcndzemEgbGluaWprYSB6IGdyYWZ1XHJcbiAgICB2YXIgRElHSVRBTF9SRVNfTk9ERUdST1VQX0lEID0gJzA0MjcxMjY3LWQwYTMtNDkzMC04YmUzLTBlOGEyYTM0YTczNSc7XHJcblxyXG4gICAgLy8gVHJ6eSBOT0RFX0lEIOKAkyB0ZSB6IHdpZXJzenk6IHJlbGF0aW9uIC8gaWlpZi11cmwgLyBfbGFiZWxcclxuICAgIHZhciBESUdJVEFMX1JFU19MQUJFTF9OT0RFX0lEID0gJzg1MzAxMDc0LTEzODUtNDBmZC05YTczLTQzNjkyZmUyNDJkZCc7XHJcbiAgICB2YXIgRElHSVRBTF9SRVNfVVJMX05PREVfSUQgICA9ICdhYThhOGU3MS00YTk4LTQwNzEtODljMy0xMmZiZTVjYTkzMzcnO1xyXG4gICAgdmFyIERJR0lUQUxfUkVTX1JFTF9OT0RFX0lEICAgPSAnOWI3ZTFkNTYtMmYyYi00MTFiLTg0OTEtNGRkNDBkMzRlOGIzJztcclxuXHJcbiAgICB2YXIgUkVMX09OVE9MT0dZX1BST1BFUlRZX0lEICA9IG51bGw7XHJcbiAgICB2YXIgUkVMX0lOVkVSU0VfUFJPUEVSVFlfSUQgICA9IG51bGw7XHJcbiAgICAvLyA9PT09PT0gSEVMUEVSUyA9PT09PT1cclxuXHJcbiAgICBmdW5jdGlvbiB1dWlkdjQoKSB7XHJcbiAgICAgICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24oYykge1xyXG4gICAgICAgICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XHJcbiAgICAgICAgICAgIHZhciB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENvb2tpZShuYW1lKSB7XHJcbiAgICAgICAgdmFyIGNvb2tpZVZhbHVlID0gbnVsbDtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuY29va2llICYmIGRvY3VtZW50LmNvb2tpZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29va2llID0gY29va2llc1tpXS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29va2llLnN1YnN0cmluZygwLCBuYW1lLmxlbmd0aCArIDEpID09PSAobmFtZSArICc9JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb29raWVWYWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChjb29raWUuc3Vic3RyaW5nKG5hbWUubGVuZ3RoICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb29raWVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlTGFuZ1ZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGxhbmcgPSAoYXJjaGVzICYmIGFyY2hlcy5hY3RpdmVMYW5ndWFnZSkgPyBhcmNoZXMuYWN0aXZlTGFuZ3VhZ2UgOiAnZW4nO1xyXG4gICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICBvYmpbbGFuZ10gPSB7IHZhbHVlOiB2YWx1ZSwgZGlyZWN0aW9uOiAnbHRyJyB9O1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplSG9zdCh1cmwpIHtcclxuICAgICAgICBpZiAoIXVybCkgeyByZXR1cm4gdXJsOyB9XHJcbiAgICAgICAgcmV0dXJuIHVybFxyXG4gICAgICAgICAgICAucmVwbGFjZSgnY2FudGFsb3VwZV9hcmNoZXNfc2xvY2FsOjgxODInLCAnbG9jYWxob3N0OjgxODMnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgnY2FudGFsb3VwZV9hcmNoZXNfc2xvY2FsJywgJ2xvY2FsaG9zdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlcnZpY2VGcm9tVGlsZSh1cmwpIHtcclxuICAgICAgICB2YXIgaWR4ID0gdXJsLmluZGV4T2YoJy9mdWxsLycpO1xyXG4gICAgICAgIHJldHVybiBpZHggPiAtMSA/IHVybC5zdWJzdHJpbmcoMCwgaWR4KSA6IHVybDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbWFnZXNGcm9tQ2FudmFzZXMoY2FudmFzZXMpIHtcclxuICAgICAgICB2YXIgaW1hZ2VzID0gW107XHJcbiAgICAgICAgKGNhbnZhc2VzIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGNhbnZhcykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGltZyA9IGNhbnZhcy5pbWFnZXMgJiYgY2FudmFzLmltYWdlc1swXTtcclxuICAgICAgICAgICAgICAgIHZhciBzdmMgPSBpbWcgJiYgaW1nLnJlc291cmNlICYmIGltZy5yZXNvdXJjZS5zZXJ2aWNlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKGltZy5yZXNvdXJjZS5zZXJ2aWNlWydAaWQnXSB8fCBpbWcucmVzb3VyY2Uuc2VydmljZS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ZjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ZjID0gbm9ybWFsaXplSG9zdChzdmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNhbnZhcy5sYWJlbCB8fCAnVW50aXRsZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVXJsOiBzdmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbDogc3ZjLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnL2Z1bGwvMjAwLC8wL2RlZmF1bHQuanBnJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBpbWFnZXNGcm9tQ2FudmFzZXMgZXJyb3I6JywgZSwgY2FudmFzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpbWFnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcG9zdFRpbGUobm9kZWdyb3VwSWQsIGRhdGEsIHJlc291cmNlSWQpIHtcclxuICAgICAgICB2YXIgcGF5bG9hZCA9IHtcclxuICAgICAgICAgICAgdGlsZWlkOiAnJyxcclxuICAgICAgICAgICAgbm9kZWdyb3VwX2lkOiBub2RlZ3JvdXBJZCxcclxuICAgICAgICAgICAgcGFyZW50dGlsZV9pZDogbnVsbCxcclxuICAgICAgICAgICAgcmVzb3VyY2VpbnN0YW5jZV9pZDogcmVzb3VyY2VJZCxcclxuICAgICAgICAgICAgc29ydG9yZGVyOiAwLFxyXG4gICAgICAgICAgICB0aWxlczoge30sXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgd2luZG93LkZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdkYXRhJywgSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG5cclxuICAgICAgICB2YXIgYmFzZVVybCA9IChhcmNoZXMgJiYgYXJjaGVzLnVybHMgJiYgYXJjaGVzLnVybHMucm9vdCkgPyBhcmNoZXMudXJscy5yb290IDogJy8nO1xyXG4gICAgICAgIHZhciB1cmwgPSAoYXJjaGVzLnVybHMgJiYgdHlwZW9mIGFyY2hlcy51cmxzLmFwaV90aWxlID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgPyBhcmNoZXMudXJscy5hcGlfdGlsZSAgICAgICAgICAvLyBucC4gXCIvdGlsZVwiXHJcbiAgICAgICAgICAgIDogYmFzZVVybCArICd0aWxlJztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gUE9TVCB0aWxlIC0+JywgdXJsLCBwYXlsb2FkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1DU1JGVG9rZW4nOiBnZXRDb29raWUoJ2NzcmZ0b2tlbicpIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwKSB7XHJcbiAgICAgICAgICAgIGlmICghcmVzcC5vaykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIVFRQICcgKyByZXNwLnN0YXR1cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3AuanNvbiA/IHJlc3AuanNvbigpIDoge307XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gdmlld01vZGVsKHBhcmFtcykge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gPT09PT09PT09PSBJTklUID09PT09PT09PT0nKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBwYXJhbXM6JywgcGFyYW1zKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBwYXJhbXMuaG9zdFJlc291cmNlSWQ6JywgcGFyYW1zLmhvc3RSZXNvdXJjZUlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBwYXJhbXMuZm9ybTonLCBwYXJhbXMuZm9ybSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gcGFyYW1zLmZvcm0ucmVzb3VyY2VpZDonLCBwYXJhbXMuZm9ybSAmJiBwYXJhbXMuZm9ybS5yZXNvdXJjZWlkKTtcclxuXHJcbiAgICAgICAgLy8gPT09PT0gaG9zdCByZXNvdXJjZSB6IGtyb2t1IDEgPT09PT1cclxuICAgICAgICBzZWxmLnRhcmdldFJlc291cmNlSWQgPSBrby5vYnNlcnZhYmxlKG51bGwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBob3N0UGFyYW0gPSBwYXJhbXMuaG9zdFJlc291cmNlSWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gaG9zdFBhcmFtIHR5cGU6JywgdHlwZW9mIGhvc3RQYXJhbSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gaG9zdFBhcmFtIHZhbHVlOicsIGhvc3RQYXJhbSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiBob3N0UGFyYW0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgLy8gd29ya2Zsb3cgdHVybmVkIHRoZSBzdHJpbmcgcGF0aCBpbnRvIGEga28uY29tcHV0ZWQvb2JzZXJ2YWJsZVxyXG4gICAgICAgICAgICB2YXIgdW53cmFwcGVkID0ga28udW53cmFwKGhvc3RQYXJhbSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXVtpbWFnZS1zZWxlY3RdIGhvc3RQYXJhbSBpcyBmdW5jdGlvbiwgdW53cmFwcGVkIHZhbHVlOicsIHVud3JhcHBlZCk7XHJcbiAgICAgICAgICAgIHNlbGYudGFyZ2V0UmVzb3VyY2VJZCh1bndyYXBwZWQgfHwgbnVsbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlc1xyXG4gICAgICAgICAgICBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBrby51bndyYXAoaG9zdFBhcmFtKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXVtpbWFnZS1zZWxlY3RdIGhvc3RSZXNvdXJjZUlkIGNoYW5nZWQgdG86JywgdmFsKTtcclxuICAgICAgICAgICAgICAgIHNlbGYudGFyZ2V0UmVzb3VyY2VJZCh2YWwgfHwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaG9zdFBhcmFtKSB7XHJcbiAgICAgICAgICAgIC8vIGxpdGVyYWwgdmFsdWVcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gaG9zdFBhcmFtIGlzIGxpdGVyYWwgdmFsdWU6JywgaG9zdFBhcmFtKTtcclxuICAgICAgICAgICAgc2VsZi50YXJnZXRSZXNvdXJjZUlkKGhvc3RQYXJhbSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuZm9ybSAmJiBwYXJhbXMuZm9ybS5yZXNvdXJjZWlkKSB7XHJcbiAgICAgICAgICAgIC8vIGZhbGxiYWNrIGplxZtsaSB0cnp5bWFzeiB0byB0ZcW8IHcgZm9ybWllXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXVtpbWFnZS1zZWxlY3RdIFVzaW5nIHBhcmFtcy5mb3JtLnJlc291cmNlaWQ6JywgcGFyYW1zLmZvcm0ucmVzb3VyY2VpZCk7XHJcbiAgICAgICAgICAgIHNlbGYudGFyZ2V0UmVzb3VyY2VJZChwYXJhbXMuZm9ybS5yZXNvdXJjZWlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gRmluYWwgdGFyZ2V0UmVzb3VyY2VJZDonLCBzZWxmLnRhcmdldFJlc291cmNlSWQoKSk7XHJcblxyXG4gICAgICAgIC8vID09PT09IHN0YW4gVUkgPT09PT1cclxuICAgICAgICBzZWxmLm1hbmlmZXN0VXJsICAgICAgICA9IGtvLm9ic2VydmFibGUoJycpO1xyXG4gICAgICAgIHNlbGYuaW1hZ2VTZXJ2aWNlVXJsICAgID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcbiAgICAgICAgc2VsZi5zZWxlY3RlZEltYWdlSW5kZXggPSBrby5vYnNlcnZhYmxlKG51bGwpO1xyXG4gICAgICAgIHNlbGYubG9hZGluZyAgICAgICAgICAgID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICAgICAgc2VsZi5lcnJvck1lc3NhZ2UgICAgICAgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuICAgICAgICBzZWxmLmF2YWlsYWJsZUltYWdlcyAgICA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW1zLnZhbHVlICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy52YWx1ZSA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuZGlnaXRhbFJlc291cmNlSWQgPSBrby5vYnNlcnZhYmxlKG51bGwpO1xyXG4gICAgICAgIHNlbGYuZm9ybURhdGEgPSBuZXcgd2luZG93LkZvcm1EYXRhKCk7XHJcbiAgICAgICAgc2VsZi5kcm9wem9uZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHZhciBjc3JmdG9rZW4gPSBnZXRDb29raWUoJ2NzcmZ0b2tlbicpO1xyXG4gICAgICAgIHZhciBiYXNlVXJsID0gKGFyY2hlcyAmJiBhcmNoZXMudXJscyAmJiBhcmNoZXMudXJscy5yb290KSA/IGFyY2hlcy51cmxzLnJvb3QgOiAnLyc7XHJcbiAgICAgICAgdmFyIG1hbmlmZXN0TWFuYWdlclVybCA9IChhcmNoZXMgJiYgYXJjaGVzLnVybHMgJiYgYXJjaGVzLnVybHMubWFuaWZlc3RfbWFuYWdlcilcclxuICAgICAgICAgICAgPyBhcmNoZXMudXJscy5tYW5pZmVzdF9tYW5hZ2VyXHJcbiAgICAgICAgICAgIDogYmFzZVVybCArICdpbWFnZS1zZXJ2aWNlLW1hbmFnZXInO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBVc2luZyBiYXNlVXJsOicsIGJhc2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgJ21hbmlmZXN0TWFuYWdlclVybDonLCBtYW5pZmVzdE1hbmFnZXJVcmwpO1xyXG5cclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT0gQ1JFQVRFIGRpZ2l0YWwgcmVzb3VyY2U6IGlpaWYgPT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgZnVuY3Rpb24gcG9zdFRpbGUobm9kZWdyb3VwSWQsIGRhdGEsIHJlc291cmNlSWQpIHtcclxuICAgICAgICAgICAgdmFyIHBheWxvYWQgPSB7XHJcbiAgICAgICAgICAgICAgICB0aWxlaWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgbm9kZWdyb3VwX2lkOiBub2RlZ3JvdXBJZCxcclxuICAgICAgICAgICAgICAgIHBhcmVudHRpbGVfaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZWluc3RhbmNlX2lkOiByZXNvdXJjZUlkLFxyXG4gICAgICAgICAgICAgICAgc29ydG9yZGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgdGlsZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IHdpbmRvdy5Gb3JtRGF0YSgpO1xyXG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2RhdGEnLCBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmFzZVVybCA9IChhcmNoZXMgJiYgYXJjaGVzLnVybHMgJiYgYXJjaGVzLnVybHMucm9vdCkgPyBhcmNoZXMudXJscy5yb290IDogJy8nO1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gKGFyY2hlcy51cmxzICYmIHR5cGVvZiBhcmNoZXMudXJscy5hcGlfdGlsZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICA/IGFyY2hlcy51cmxzLmFwaV90aWxlXHJcbiAgICAgICAgICAgICAgICA6IGJhc2VVcmwgKyAndGlsZSc7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLUNTUkZUb2tlbic6IGdldENvb2tpZSgnY3NyZnRva2VuJykgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhXHJcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0hUVFAgJyArIHJlc3Auc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwLmpzb24gPyByZXNwLmpzb24oKSA6IHt9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuY3JlYXRlRGlnaXRhbFJlc291cmNlID0gZnVuY3Rpb24oc2VydmljZVVybCwgbGFiZWxUZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXNvdXJjZUlkID0gdXVpZHY0KCk7XHJcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IGxhYmVsVGV4dCB8fCBzZXJ2aWNlVXJsIHx8ICgnZGlnaXRhbCByZXNvdXJjZTogaWlpZiAnICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsYWJlbERhdGEgPSB7fTtcclxuICAgICAgICAgICAgbGFiZWxEYXRhW0RJR0lUQUxfUkVTX0xBQkVMX05PREVfSURdID0gbWFrZUxhbmdWYWx1ZShsYWJlbCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdXJsRGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAvLyBqZcWbbGkgZGF0YXR5cGU9c3RyaW5nXHJcbiAgICAgICAgICAgIHVybERhdGFbRElHSVRBTF9SRVNfVVJMX05PREVfSURdID0gbWFrZUxhbmdWYWx1ZShzZXJ2aWNlVXJsKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZWxEYXRhID0ge307XHJcbiAgICAgICAgICAgIHJlbERhdGFbRElHSVRBTF9SRVNfUkVMX05PREVfSURdID0gW3tcclxuICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6IHNlbGYudGFyZ2V0UmVzb3VyY2VJZCgpLFxyXG4gICAgICAgICAgICAgICAgb250b2xvZ3lQcm9wZXJ0eTogUkVMX09OVE9MT0dZX1BST1BFUlRZX0lEIHx8IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBpbnZlcnNlT250b2xvZ3lQcm9wZXJ0eTogUkVMX0lOVkVSU0VfUFJPUEVSVFlfSUQgfHwgXCJcIixcclxuICAgICAgICAgICAgICAgIHJlc291cmNlWHJlc291cmNlSWQ6IFwiXCIgICAvLyBNVVNJIGJ5xIcsIG5hd2V0IHB1c3R5XHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlbERhdGFcIiwgcmVsRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwb3N0VGlsZShESUdJVEFMX1JFU19MQUJFTF9OT0RFX0lELCBsYWJlbERhdGEsIHJlc291cmNlSWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zdFRpbGUoRElHSVRBTF9SRVNfVVJMX05PREVfSUQsIHVybERhdGEsIHJlc291cmNlSWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwb3N0VGlsZShESUdJVEFMX1JFU19SRUxfTk9ERV9JRCwgcmVsRGF0YSwgcmVzb3VyY2VJZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaWdpdGFsUmVzb3VyY2VJZChyZXNvdXJjZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMudmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVNlcnZpY2VVcmw6IHNlcnZpY2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZ2l0YWxSZXNvdXJjZUlkOiByZXNvdXJjZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRSZXNvdXJjZUlkOiBzZWxmLnRhcmdldFJlc291cmNlSWQoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvdXJjZUlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gPT09PT09PT09PSBTT1VSQ0UgQTogbWFuaWZlc3QgLyBpbmZvLmpzb24gPT09PT09PT09PVxyXG5cclxuICAgICAgICBzZWxmLm1hbmlmZXN0VXJsLnN1YnNjcmliZShmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICAgICAgc2VsZi5lcnJvck1lc3NhZ2UoJycpO1xyXG4gICAgICAgICAgICBpZiAoIXVybCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgc2VsZi5sb2FkTWFuaWZlc3QodXJsLnRyaW0oKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbGYubG9hZE1hbmlmZXN0ID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXVtpbWFnZS1zZWxlY3RdIGxvYWRNYW5pZmVzdDonLCB1cmwpO1xyXG4gICAgICAgICAgICBzZWxmLmxvYWRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNlbGYuYXZhaWxhYmxlSW1hZ2VzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICBzZWxmLmltYWdlU2VydmljZVVybCgnJyk7XHJcbiAgICAgICAgICAgIHBhcmFtcy52YWx1ZSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBzZWxmLmRpZ2l0YWxSZXNvdXJjZUlkKG51bGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKC9cXC9mdWxsXFwvLitcXC9kZWZhdWx0XFwuanBnKD86JHxcXD8pL2kudGVzdCh1cmwpKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBzZXJ2aWNlRnJvbVRpbGUodXJsKS5yZXBsYWNlKC9cXC8kLywgJycpICsgJy9pbmZvLmpzb24nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtjcmVkZW50aWFsczogJ2luY2x1ZGUnfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBtYW5pZmVzdCByZXNwb25zZSBzdGF0dXM6JywgcmVzcC5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzcC5vaykgeyB0aHJvdyBuZXcgRXJyb3IoJ0hUVFAgJyArIHJlc3Auc3RhdHVzKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gbWFuaWZlc3QgcGF5bG9hZDonLCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbJ0B0eXBlJ10gPT09ICdzYzpNYW5pZmVzdCcgJiYgQXJyYXkuaXNBcnJheShkYXRhLnNlcXVlbmNlcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZGF0YS5zZXF1ZW5jZXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oc2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXMgPSBpbWFnZXMuY29uY2F0KGltYWdlc0Zyb21DYW52YXNlcyhzZXEuY2FudmFzZXMgfHwgW10pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgeyB0aHJvdyBuZXcgRXJyb3IoJ05vIGNhbnZhc2VzIHdpdGggSUlJRiBJbWFnZSBzZXJ2aWNlcyBmb3VuZC4nKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF2YWlsYWJsZUltYWdlcyhpbWFnZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRhdGFbJ0Bjb250ZXh0J10gJiYgU3RyaW5nKGRhdGFbJ0Bjb250ZXh0J10pLmluZGV4T2YoJ2lpaWYuaW8vYXBpL2ltYWdlJykgIT09IC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZGF0YVsncHJvdG9jb2wnXSAgJiYgU3RyaW5nKGRhdGFbJ3Byb3RvY29sJ10pLmluZGV4T2YoJ2lpaWYuaW8vYXBpL2ltYWdlJykgIT09IC0xKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN2Y0lkID0gbm9ybWFsaXplSG9zdChkYXRhWydAaWQnXSB8fCBkYXRhWydpZCddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdmNJZCkgeyB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2VydmljZSBAaWQvaWQgaW4gaW5mby5qc29uJyk7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXZhaWxhYmxlSW1hZ2VzKFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZGF0YVsnQGlkJ10gfHwgZGF0YVsnaWQnXSB8fCAnSW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVVybDogc3ZjSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWw6IHN2Y0lkLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnL2Z1bGwvMjAwLC8wL2RlZmF1bHQuanBnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgSUlJRiBwYXlsb2FkIChub3QgTWFuaWZlc3Qgb3IgSW1hZ2UgQVBJIGluZm8uanNvbikuJyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXVtpbWFnZS1zZWxlY3RdIEZhaWxlZCB0byBsb2FkIElJSUYgcmVzb3VyY2U6JywgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgSUlJRiByZXNvdXJjZTogJyArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gPT09PT09PT09PSBTT1VSQ0UgQjogdXBsb2FkIC0+IG1hbmlmZXN0IC0+IGxvYWRNYW5pZmVzdCA9PT09PT09PT09XHJcblxyXG4gICAgICAgIHNlbGYuZHJvcHpvbmVPcHRpb25zQ3JlYXRlID0ge1xyXG4gICAgICAgICAgICB1cmw6IGJhc2VVcmwsXHJcbiAgICAgICAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXHJcbiAgICAgICAgICAgIGF1dG9Qcm9jZXNzUXVldWU6IGZhbHNlLFxyXG4gICAgICAgICAgICB1cGxvYWRNdWx0aXBsZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b1F1ZXVlOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiAnLmZpbGVpbnB1dC1jcmVhdGUtYnV0dG9uJyxcclxuICAgICAgICAgICAgcHJldmlld3NDb250YWluZXI6ICcjaGlkZGVuLWR6LWNyZWF0ZS1wcmV2aWV3cycsXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGR6ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHNlbGYuZHJvcHpvbmUgPSBkejtcclxuICAgICAgICAgICAgICAgIGR6Lm9uKCdhZGRlZGZpbGVzJywgZnVuY3Rpb24oZmlsZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBkcm9wem9uZSBhZGRlZGZpbGVzOicsIGZpbGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVNYW5pZmVzdEZyb21GaWxlcyhmaWxlcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGR6Lm9uKCdlcnJvcicsIGZ1bmN0aW9uKGZpbGUsIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gZHJvcHpvbmUgZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGUuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2VsZi5jcmVhdGVNYW5pZmVzdEZyb21GaWxlcyA9IGZ1bmN0aW9uKGZpbGVMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICghZmlsZUxpc3QgfHwgIWZpbGVMaXN0Lmxlbmd0aCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYuZXJyb3JNZXNzYWdlKCcnKTtcclxuICAgICAgICAgICAgc2VsZi5sb2FkaW5nKHRydWUpO1xyXG4gICAgICAgICAgICBzZWxmLmF2YWlsYWJsZUltYWdlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgc2VsZi5pbWFnZVNlcnZpY2VVcmwoJycpO1xyXG4gICAgICAgICAgICBwYXJhbXMudmFsdWUodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgc2VsZi5kaWdpdGFsUmVzb3VyY2VJZChudWxsKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEgPSBuZXcgd2luZG93LkZvcm1EYXRhKCk7XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZmlsZUxpc3QpLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2ZpbGVzJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSAnV29ya2Zsb3cgdXBsb2FkICcgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnbWFuaWZlc3RfdGl0bGUnLCB0aXRsZSk7XHJcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdtYW5pZmVzdF9kZXNjcmlwdGlvbicsICdVcGxvYWRlZCB2aWEgSUlJRiBpbWFnZSB3b3JrZmxvdycpO1xyXG4gICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnb3BlcmF0aW9uJywgJ2NyZWF0ZScpO1xyXG4gICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZCgndHJhbnNhY3Rpb25faWQnLCBwYXJhbXMuZm9ybSAmJiBwYXJhbXMuZm9ybS53b3JrZmxvd0lkIHx8ICdpaWlmLWltYWdlLXdvcmtmbG93Jyk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBQT1NUaW5nIHRvIG1hbmlmZXN0X21hbmFnZXInLCBtYW5pZmVzdE1hbmFnZXJVcmwpO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2gobWFuaWZlc3RNYW5hZ2VyVXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ1gtQ1NSRlRva2VuJzogY3NyZnRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBzZWxmLmZvcm1EYXRhXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gbWFuaWZlc3RfbWFuYWdlciBzdGF0dXM6JywgcmVzcC5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzcC5vaykgeyB0aHJvdyBuZXcgRXJyb3IoJ0hUVFAgJyArIHJlc3Auc3RhdHVzKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXVtpbWFnZS1zZWxlY3RdIG1hbmlmZXN0X21hbmFnZXIgcmVzcG9uc2U6JywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2FkTWFuaWZlc3QocmVzcG9uc2UudXJsKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlcnZlciBkaWQgbm90IHJldHVybiBtYW5pZmVzdCBVUkwnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXVtpbWFnZS1zZWxlY3RdIGNyZWF0ZU1hbmlmZXN0RnJvbUZpbGVzIGVycm9yOicsIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvck1lc3NhZ2UoJ0ZhaWxlZCB0byBjcmVhdGUgbWFuaWZlc3Q6ICcgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5kcm9wem9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRyb3B6b25lLnJlbW92ZUFsbEZpbGVzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vID09PT09PT09PT0gV1lCw5NSIE9CUkFaVSA9PT09PT09PT09XHJcblxyXG4gICAgICAgIHNlbGYuaW1hZ2VTZXJ2aWNlVXJsLnN1YnNjcmliZShmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gaW1hZ2VTZXJ2aWNlVXJsIC0+JywgdmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZi5zZWxlY3RJbWFnZSA9IGZ1bmN0aW9uKGltYWdlLCBpbmRleCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBzZWxlY3RJbWFnZSAtPicsIGltYWdlLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRJbWFnZUluZGV4KGluZGV4KTtcclxuICAgICAgICAgICAgc2VsZi5pbWFnZVNlcnZpY2VVcmwoaW1hZ2Uuc2VydmljZVVybCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmRpZ2l0YWxSZXNvdXJjZUlkKG51bGwpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5jcmVhdGVEaWdpdGFsUmVzb3VyY2UoaW1hZ2Uuc2VydmljZVVybCwgaW1hZ2UubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvdXJjZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gZGlnaXRhbCByZXNvdXJjZTogaWlpZiBjcmVhdGVkIHdpdGggaWQnLCByZXNvdXJjZUlkKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignW1dGIExPR11baW1hZ2Utc2VsZWN0XSBkaWdpdGFsIHJlc291cmNlIGNyZWF0aW9uIGZhaWxlZCcsIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyA9PT09PT09PT09IEdBVElORyA9PT09PT09PT09XHJcblxyXG4gICAgICAgIHBhcmFtcy5mb3JtLmNvbXBsZXRlKGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9rID0gISFzZWxmLmltYWdlU2VydmljZVVybCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW1dGIExPR11baW1hZ2Utc2VsZWN0XSBjb21wbGV0ZT8nLCBvayk7XHJcbiAgICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIHZhciBfb3JpZ1NhdmUgPSBwYXJhbXMuZm9ybS5zYXZlO1xyXG4gICAgICAgIHBhcmFtcy5mb3JtLnNhdmUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddW2ltYWdlLXNlbGVjdF0gc2F2ZSgpIHZhbHVlID0nLCBwYXJhbXMudmFsdWUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlU2VydmljZVVybCA9Jywgc2VsZi5pbWFnZVNlcnZpY2VVcmwoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpZ2l0YWxSZXNvdXJjZUlkID0nLCBzZWxmLmRpZ2l0YWxSZXNvdXJjZUlkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXRSZXNvdXJjZUlkID0nLCBzZWxmLnRhcmdldFJlc291cmNlSWQoKSk7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5pbWFnZVNlcnZpY2VVcmwoKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5lcnJvck1lc3NhZ2UoJ1BsZWFzZSBzZWxlY3QgYW4gaW1hZ2UgYmVmb3JlIHByb2NlZWRpbmcuJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX29yaWdTYXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX29yaWdTYXZlLmFwcGx5KHBhcmFtcy5mb3JtLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2lpaWYtaW1hZ2Utc2VsZWN0aW9uLXN0ZXAnLCB7XHJcbiAgICAgICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXHJcbiAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlXHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJkZWZpbmUiLCJrbyIsImFyY2hlcyIsInRlbXBsYXRlIiwiY29uc29sZSIsImxvZyIsIklJSUZfRElHSVRBTF9HUkFQSF9JRCIsIkRJR0lUQUxfUkVTX05PREVHUk9VUF9JRCIsIkRJR0lUQUxfUkVTX0xBQkVMX05PREVfSUQiLCJESUdJVEFMX1JFU19VUkxfTk9ERV9JRCIsIkRJR0lUQUxfUkVTX1JFTF9OT0RFX0lEIiwiUkVMX09OVE9MT0dZX1BST1BFUlRZX0lEIiwiUkVMX0lOVkVSU0VfUFJPUEVSVFlfSUQiLCJ1dWlkdjQiLCJyZXBsYWNlIiwiYyIsInIiLCJNYXRoIiwicmFuZG9tIiwidiIsInRvU3RyaW5nIiwiZ2V0Q29va2llIiwibmFtZSIsImNvb2tpZVZhbHVlIiwiZG9jdW1lbnQiLCJjb29raWUiLCJjb29raWVzIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwidHJpbSIsInN1YnN0cmluZyIsImRlY29kZVVSSUNvbXBvbmVudCIsIm1ha2VMYW5nVmFsdWUiLCJ2YWx1ZSIsImxhbmciLCJhY3RpdmVMYW5ndWFnZSIsIm9iaiIsImRpcmVjdGlvbiIsIm5vcm1hbGl6ZUhvc3QiLCJ1cmwiLCJzZXJ2aWNlRnJvbVRpbGUiLCJpZHgiLCJpbmRleE9mIiwiaW1hZ2VzRnJvbUNhbnZhc2VzIiwiY2FudmFzZXMiLCJpbWFnZXMiLCJmb3JFYWNoIiwiY2FudmFzIiwiaW1nIiwic3ZjIiwicmVzb3VyY2UiLCJzZXJ2aWNlIiwiaWQiLCJwdXNoIiwibGFiZWwiLCJzZXJ2aWNlVXJsIiwidGh1bWJuYWlsIiwiZSIsInBvc3RUaWxlIiwibm9kZWdyb3VwSWQiLCJkYXRhIiwicmVzb3VyY2VJZCIsInBheWxvYWQiLCJ0aWxlaWQiLCJub2RlZ3JvdXBfaWQiLCJwYXJlbnR0aWxlX2lkIiwicmVzb3VyY2VpbnN0YW5jZV9pZCIsInNvcnRvcmRlciIsInRpbGVzIiwiZm9ybURhdGEiLCJ3aW5kb3ciLCJGb3JtRGF0YSIsImFwcGVuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJiYXNlVXJsIiwidXJscyIsInJvb3QiLCJhcGlfdGlsZSIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiYm9keSIsInRoZW4iLCJyZXNwIiwib2siLCJFcnJvciIsInN0YXR1cyIsImpzb24iLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwiaG9zdFJlc291cmNlSWQiLCJmb3JtIiwicmVzb3VyY2VpZCIsInRhcmdldFJlc291cmNlSWQiLCJvYnNlcnZhYmxlIiwiaG9zdFBhcmFtIiwiX3R5cGVvZiIsInVud3JhcHBlZCIsInVud3JhcCIsImNvbXB1dGVkIiwidmFsIiwibWFuaWZlc3RVcmwiLCJpbWFnZVNlcnZpY2VVcmwiLCJzZWxlY3RlZEltYWdlSW5kZXgiLCJsb2FkaW5nIiwiZXJyb3JNZXNzYWdlIiwiYXZhaWxhYmxlSW1hZ2VzIiwib2JzZXJ2YWJsZUFycmF5IiwiZGlnaXRhbFJlc291cmNlSWQiLCJkcm9wem9uZSIsImNzcmZ0b2tlbiIsIm1hbmlmZXN0TWFuYWdlclVybCIsIm1hbmlmZXN0X21hbmFnZXIiLCJjcmVhdGVEaWdpdGFsUmVzb3VyY2UiLCJsYWJlbFRleHQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJsYWJlbERhdGEiLCJ1cmxEYXRhIiwicmVsRGF0YSIsIm9udG9sb2d5UHJvcGVydHkiLCJpbnZlcnNlT250b2xvZ3lQcm9wZXJ0eSIsInJlc291cmNlWHJlc291cmNlSWQiLCJzdWJzY3JpYmUiLCJsb2FkTWFuaWZlc3QiLCJyZW1vdmVBbGwiLCJ1bmRlZmluZWQiLCJ0ZXN0IiwiQXJyYXkiLCJpc0FycmF5Iiwic2VxdWVuY2VzIiwic2VxIiwiY29uY2F0IiwiU3RyaW5nIiwic3ZjSWQiLCJjYXRjaCIsImVyciIsIm1lc3NhZ2UiLCJkcm9wem9uZU9wdGlvbnNDcmVhdGUiLCJkaWN0RGVmYXVsdE1lc3NhZ2UiLCJhdXRvUHJvY2Vzc1F1ZXVlIiwidXBsb2FkTXVsdGlwbGUiLCJhdXRvUXVldWUiLCJjbGlja2FibGUiLCJwcmV2aWV3c0NvbnRhaW5lciIsImluaXQiLCJkeiIsIm9uIiwiZmlsZXMiLCJjcmVhdGVNYW5pZmVzdEZyb21GaWxlcyIsImZpbGUiLCJlcnJvciIsImZpbGVMaXN0IiwiZnJvbSIsInRpdGxlIiwid29ya2Zsb3dJZCIsInJlc3BvbnNlIiwiZmluYWxseSIsInJlbW92ZUFsbEZpbGVzIiwic2VsZWN0SW1hZ2UiLCJpbWFnZSIsImluZGV4IiwiY29tcGxldGUiLCJwdXJlQ29tcHV0ZWQiLCJfb3JpZ1NhdmUiLCJzYXZlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJhcHBseSIsImFyZ3VtZW50cyIsImNvbXBvbmVudHMiLCJyZWdpc3RlciJdLCJzb3VyY2VSb290IjoiIn0=