"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[41747],{

/***/ 41747:
/*!********************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/plugins/manifest-manager.js + 1 modules ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ manifest_manager)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/dropzone/dist/min/dropzone-amd-module.min.js
var dropzone_amd_module_min = __webpack_require__(50221);
// EXTERNAL MODULE: ./node_modules/uuidjs/dist/uuid.core.js
var uuid_core = __webpack_require__(84806);
var uuid_core_default = /*#__PURE__*/__webpack_require__.n(uuid_core);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/alert-json.js
var alert_json = __webpack_require__(52139);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/iiif-viewer.js + 2 modules
var iiif_viewer = __webpack_require__(61485);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/plugins/manifest-manager.htm
const manifest_manager_namespaceObject = "templates/views/components/plugins/manifest-manager.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/dropzone.js
var dropzone = __webpack_require__(99152);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/plugins/manifest-manager.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }










/* harmony default export */ const manifest_manager = (knockout_latest_default().components.register('manifest-manager', {
  viewModel: function viewModel(params) {
    var self = this;
    this.transactionId = params.transactionId || uuid_core_default().generate();
    this.canvasesForDeletion = knockout_latest_default().observableArray([]);
    this.metadataLabel = knockout_latest_default().observable('');
    this.metadataValues = knockout_latest_default().observable('');
    this.mainMenu = knockout_latest_default().observable(true);

    // params.shouldShowEditService is deprecated, but retained for backward compatibility for other projects that may have used it.  Use params.shouldShowSelectService instead.
    this.shouldShowSelectService = params.shouldShowSelectService || params.shouldShowEditService || knockout_latest_default().observable(true);
    this.selectService = knockout_latest_default().observable(false);
    this.shouldShowCreateService = params.shouldShowCreateService || knockout_latest_default().observable(true);
    this.createService = knockout_latest_default().observable(true);
    this.remoteManifest = knockout_latest_default().observable(true);
    this.alert = params.alert || knockout_latest_default().observable();
    this.addCanvas = function (canvas) {
      //the function name needs to be better
      self.canvasesForDeletion.push(canvas);
      self.canvas(canvas.images[0].resource.service['@id']);
    };
    this.removeCanvas = function (canvas) {
      //the function name needs to be better
      self.canvasesForDeletion.remove(canvas);
      self.canvas(canvas.images[0].resource.service['@id']);
    };
    iiif_viewer["default"].apply(this, [_objectSpread(_objectSpread({}, params), {}, {
      renderContext: params !== null && params !== void 0 && params.renderContext ? params.renderContext : 'manifestManager'
    })]);
    this.showTabs(false);
    this.mainMenu.subscribe(function (val) {
      val || self.showTabs(true);
    });
    if (this.renderContext() == "manifest-workflow") {
      this.showModeSelector(false);
    }
    this.isManifestDirty = knockout_latest_default().computed(function () {
      return knockout_latest_default().unwrap(self.manifestName) !== self.origManifestName || knockout_latest_default().unwrap(self.manifestDescription) !== self.origManifestDescription || knockout_latest_default().unwrap(self.manifestAttribution) !== self.origManifestAttribution || knockout_latest_default().unwrap(self.manifestLogo) !== self.origManifestLogo || knockout_latest_default().unwrap(self.metadataLabel) || knockout_latest_default().unwrap(self.metadataValues) || knockout_mapping_min_default().toJSON(self.manifestMetadata) !== self.origManifestMetadata;
    });
    this.isCanvasDirty = knockout_latest_default().computed(function () {
      return !self.compareMode() && self.canvasLabel() !== self.origCanvasLabel();
    });
    this.uniqueId = uuid_core_default().generate();
    this.uniqueidClass = knockout_latest_default().computed(function () {
      return "unique_id_" + self.uniqueId;
    });
    this.formData = new window.FormData();
    this.stagedMetadata = knockout_latest_default().computed(function () {
      var res = {
        label: self.metadataLabel(),
        value: self.metadataValues()
      };
      return res;
    });
    this.updateMetadata = function () {
      if (!!self.metadataLabel() || !!self.metadataValues()) {
        this.manifestMetadata.unshift(knockout_mapping_min_default().fromJS(this.stagedMetadata()));
      }
      self.metadataLabel(null);
      self.metadataValues(null);
    };
    this.removeMetadata = function (val) {
      this.manifestMetadata.remove(val);
    };
    this.addAllCanvases = function () {
      self.canvases().forEach(function (canvas) {
        if (self.canvasesForDeletion().indexOf(canvas) < 0) {
          self.canvasesForDeletion.push(canvas);
        }
      });
    };
    this.clearCanvasSelection = function () {
      self.canvasesForDeletion([]);
    };
    this.reset = function () {
      self.formData.delete("files");
      self.formData = new window.FormData();
      self.clearCanvasSelection();
      self.metadataLabel('');
      self.metadataValues('');
      self.manifestName(self.origManifestName);
      self.manifestAttribution(self.origManifestAttribution);
      self.manifestLogo(self.origManifestLogo);
      self.manifestDescription(self.origManifestDescription);
      self.canvasLabel(self.origCanvasLabel());
      if (self.origManifestMetadata) {
        self.manifestMetadata.removeAll();
        JSON.parse(self.origManifestMetadata).forEach(function (entry) {
          self.manifestMetadata.push(knockout_mapping_min_default().fromJS(entry));
        });
      }
      if (self.dropzone) {
        self.dropzone.removeAllFiles(true);
      }
    };
    this.submitToManifest = function (onSuccess, onError) {
      if (params.manifestManagerFormData) {
        params.manifestManagerFormData(self.formData);
      }
      jquery_min_default().ajax({
        type: "POST",
        url: arches["default"].urls.manifest_manager,
        data: self.formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function success(response) {
          self.reset();
          self.manifest(response.url);
          self.getManifestData();
          if (onSuccess) {
            onSuccess();
          }
        },
        error: function error(response) {
          self.reset();
          // eslint-disable-next-line no-console
          console.log("Failed to save manifest");
          self.alert(new alert_json["default"]('ep-alert-red', response.responseJSON));
          if (onError) {
            onError();
          }
        }
      });
    };
    this.deleteCanvases = function () {
      self.formData.append("manifest", knockout_latest_default().unwrap(self.manifest));
      self.formData.append("selected_canvases", JSON.stringify(knockout_latest_default().unwrap(self.canvasesForDeletion)));
      self.submitToManifest();
    };
    this.deleteManifest = function () {
      self.formData.append("manifest", knockout_latest_default().unwrap(self.manifest));
      jquery_min_default().ajax({
        type: "DELETE",
        url: arches["default"].urls.manifest_manager,
        data: JSON.stringify({
          "manifest": knockout_latest_default().unwrap(self.manifest)
        }),
        cache: false,
        processData: false,
        contentType: false,
        success: function success() {
          self.reset();
          self.toggleManifestEditor();
          self.manifestData(null);
          self.manifest(null);
          self.canvas(null);
          self.manifestName(null);
          self.manifestDescription(null);
          self.manifestAttribution(null);
          self.expandGallery(true);
          self.mainMenu(true);
          self.activeTab(undefined);
        },
        error: function error(response) {
          self.reset();
          // eslint-disable-next-line no-console
          console.log("Failed to delete manifest");
          self.alert(new alert_json["default"]('ep-alert-red', response.responseJSON));
        }
      });
    };
    this.createManifest = function (fileList) {
      Array.from(fileList).forEach(function (file) {
        self.formData.append("files", file, file.name);
      });
      self.formData.append("manifest_title", knockout_latest_default().unwrap(self.manifestName));
      self.formData.append("manifest_description", knockout_latest_default().unwrap(self.manifestDescription));
      self.formData.append("operation", "create");
      self.formData.append("transaction_id", self.transactionId);
      var onSuccess = function onSuccess() {
        self.activeTab('manifest');
        self.mainMenu(false);
      };
      var onError = function onError() {
        self.mainMenu(true);
        self.activeTab(undefined);
      };
      self.submitToManifest(onSuccess, onError);
    };
    this.addFiles = function (fileList) {
      Array.from(fileList).forEach(function (file) {
        self.formData.append("files", file, file.name);
      });
      self.updateManifest();
    };
    this.updateManifest = function () {
      var _ko$unwrap;
      self.updateMetadata();
      self.formData.append("manifest_title", knockout_latest_default().unwrap(self.manifestName));
      self.formData.append("manifest_description", knockout_latest_default().unwrap(self.manifestDescription));
      self.formData.append("manifest_attribution", knockout_latest_default().unwrap(self.manifestAttribution));
      self.formData.append("manifest_logo", knockout_latest_default().unwrap(self.manifestLogo));
      self.formData.append("manifest", knockout_latest_default().unwrap(self.manifest));
      self.formData.append("canvas_label", (_ko$unwrap = knockout_latest_default().unwrap(self.canvasLabel)) !== null && _ko$unwrap !== void 0 ? _ko$unwrap : ''); //new label for canvas
      self.formData.append("canvas_id", knockout_latest_default().unwrap(self.canvas)); //canvas id for label change
      self.formData.append("metadata", JSON.stringify(knockout_mapping_min_default().toJS(self.manifestMetadata)));
      self.updateCanvas = false;
      self.submitToManifest();
    };
    this.manifest.subscribe(function (val) {
      self.getManifestData(val);
      self.mainMenu(false);
    });
    this.manifestData.subscribe(function (manifestData) {
      if (manifestData) {
        self.selectCanvas(manifestData.sequences[0].canvases[0]);
      }
      if (params.manifestData && knockout_latest_default().isObservable(params.manifestData)) {
        params.manifestData(manifestData);
      }
    });
    this.manifest.subscribe(function () {
      if (self.manifest() && self.manifest().charAt(0) == '/') {
        self.remoteManifest(false);
      } else {
        self.remoteManifest(true);
      }
      self.hideSidePanel();
    });
    this.dropzoneOptions4create = {
      url: "arches.urls.root",
      dictDefaultMessage: '',
      autoProcessQueue: false,
      uploadMultiple: true,
      acceptedFiles: ["image/jpeg", "image/png", "image/tiff"].join(','),
      autoQueue: false,
      clickable: ".fileinput-create-button." + this.uniqueidClass(),
      previewsContainer: '#hidden-dz-create-previews',
      init: function init() {
        self.dropzone = this;
        this.on("addedfiles", self.createManifest);
        this.on("error", function (file, error) {
          file.error = error;
        });
      }
    };
    this.dropzoneOptions = {
      url: "arches.urls.root",
      dictDefaultMessage: '',
      autoProcessQueue: false,
      uploadMultiple: true,
      autoQueue: false,
      clickable: ".fileinput-button." + this.uniqueidClass(),
      previewsContainer: '#hidden-dz-previews',
      init: function init() {
        self.dropzone = this;
        this.on("addedfiles", self.addFiles);
        this.on("error", function (file, error) {
          file.error = error;
        });
      }
    };
  },
  template: manifest_manager_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYjZmNWYyY2Q1NjAyOGEwMjQ3NDcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ2U7QUFDbEI7QUFDUztBQUNSO0FBQ0k7QUFDZ0M7QUFDRztBQUMrQjtBQUNuRTtBQUczQix1REFBZUEsb0NBQWEsQ0FBQ1UsUUFBUSxDQUFDLGtCQUFrQixFQUFFO0VBQ3REQyxTQUFTLEVBQUUsU0FBWEEsU0FBU0EsQ0FBV0MsTUFBTSxFQUFFO0lBQ3hCLElBQUlDLElBQUksR0FBRyxJQUFJO0lBRWYsSUFBSSxDQUFDQyxhQUFhLEdBQUdGLE1BQU0sQ0FBQ0UsYUFBYSxJQUFJViw0QkFBYSxDQUFDLENBQUM7SUFDNUQsSUFBSSxDQUFDWSxtQkFBbUIsR0FBR2hCLHlDQUFrQixDQUFDLEVBQUUsQ0FBQztJQUNqRCxJQUFJLENBQUNrQixhQUFhLEdBQUdsQixvQ0FBYSxDQUFDLEVBQUUsQ0FBQztJQUN0QyxJQUFJLENBQUNvQixjQUFjLEdBQUdwQixvQ0FBYSxDQUFDLEVBQUUsQ0FBQztJQUN2QyxJQUFJLENBQUNxQixRQUFRLEdBQUdyQixvQ0FBYSxDQUFDLElBQUksQ0FBQzs7SUFFbkM7SUFDQSxJQUFJLENBQUNzQix1QkFBdUIsR0FBR1YsTUFBTSxDQUFDVSx1QkFBdUIsSUFBSVYsTUFBTSxDQUFDVyxxQkFBcUIsSUFBSXZCLG9DQUFhLENBQUMsSUFBSSxDQUFDO0lBQ3BILElBQUksQ0FBQ3dCLGFBQWEsR0FBR3hCLG9DQUFhLENBQUMsS0FBSyxDQUFDO0lBRXpDLElBQUksQ0FBQ3lCLHVCQUF1QixHQUFHYixNQUFNLENBQUNhLHVCQUF1QixJQUFJekIsb0NBQWEsQ0FBQyxJQUFJLENBQUM7SUFDcEYsSUFBSSxDQUFDMEIsYUFBYSxHQUFHMUIsb0NBQWEsQ0FBQyxJQUFJLENBQUM7SUFFeEMsSUFBSSxDQUFDMkIsY0FBYyxHQUFHM0Isb0NBQWEsQ0FBQyxJQUFJLENB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Q2lCLElBQUksQ0FBQ2pCLEtBQUssR0FBR0EsS0FBSztRQUN0QixDQUFDLENBQUM7TUFDTjtJQUNKLENBQUM7RUFDTCxDQUFDO0VBQ0R5QyxRQUFRLEVBQUUxSSxnQ0FBdUJBO0FBQ3JDLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9wbHVnaW5zL21hbmlmZXN0LW1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2Ryb3B6b25lJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IEpzb25FcnJvckFsZXJ0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvYWxlcnQtanNvbic7XG5pbXBvcnQgSUlJRlZpZXdlclZpZXdtb2RlbCBmcm9tICd2aWV3cy9jb21wb25lbnRzL2lpaWYtdmlld2VyJztcbmltcG9ydCBtYW5pZmVzdE1hbmFnZXJUZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy9wbHVnaW5zL21hbmlmZXN0LW1hbmFnZXIuaHRtJztcbmltcG9ydCAnYmluZGluZ3MvZHJvcHpvbmUnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ21hbmlmZXN0LW1hbmFnZXInLCB7XG4gICAgdmlld01vZGVsOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25JZCA9IHBhcmFtcy50cmFuc2FjdGlvbklkIHx8IHV1aWQuZ2VuZXJhdGUoKTtcbiAgICAgICAgdGhpcy5jYW52YXNlc0ZvckRlbGV0aW9uID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgICAgdGhpcy5tZXRhZGF0YUxhYmVsID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgICAgIHRoaXMubWV0YWRhdGFWYWx1ZXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICAgICAgdGhpcy5tYWluTWVudSA9IGtvLm9ic2VydmFibGUodHJ1ZSk7XG5cbiAgICAgICAgLy8gcGFyYW1zLnNob3VsZFNob3dFZGl0U2VydmljZSBpcyBkZXByZWNhdGVkLCBidXQgcmV0YWluZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgZm9yIG90aGVyIHByb2plY3RzIHRoYXQgbWF5IGhhdmUgdXNlZCBpdC4gIFVzZSBwYXJhbXMuc2hvdWxkU2hvd1NlbGVjdFNlcnZpY2UgaW5zdGVhZC5cbiAgICAgICAgdGhpcy5zaG91bGRTaG93U2VsZWN0U2VydmljZSA9IHBhcmFtcy5zaG91bGRTaG93U2VsZWN0U2VydmljZSB8fCBwYXJhbXMuc2hvdWxkU2hvd0VkaXRTZXJ2aWNlIHx8IGtvLm9ic2VydmFibGUodHJ1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0U2VydmljZSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zaG91bGRTaG93Q3JlYXRlU2VydmljZSA9IHBhcmFtcy5zaG91bGRTaG93Q3JlYXRlU2VydmljZSB8fCBrby5vYnNlcnZhYmxlKHRydWUpO1xuICAgICAgICB0aGlzLmNyZWF0ZVNlcnZpY2UgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xuXG4gICAgICAgIHRoaXMucmVtb3RlTWFuaWZlc3QgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gcGFyYW1zLmFsZXJ0IHx8IGtvLm9ic2VydmFibGUoKTsgXG4gICAgICAgIHRoaXMuYWRkQ2FudmFzID0gZnVuY3Rpb24oY2FudmFzKSB7IC8vdGhlIGZ1bmN0aW9uIG5hbWUgbmVlZHMgdG8gYmUgYmV0dGVyXG4gICAgICAgICAgICBzZWxmLmNhbnZhc2VzRm9yRGVsZXRpb24ucHVzaChjYW52YXMpO1xuICAgICAgICAgICAgc2VsZi5jYW52YXMoY2FudmFzLmltYWdlc1swXS5yZXNvdXJjZS5zZXJ2aWNlWydAaWQnXSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZW1vdmVDYW52YXMgPSBmdW5jdGlvbihjYW52YXMpIHsgLy90aGUgZnVuY3Rpb24gbmFtZSBuZWVkcyB0byBiZSBiZXR0ZXJcbiAgICAgICAgICAgIHNlbGYuY2FudmFzZXNGb3JEZWxldGlvbi5yZW1vdmUoY2FudmFzKTtcbiAgICAgICAgICAgIHNlbGYuY2FudmFzKGNhbnZhcy5pbWFnZXNbMF0ucmVzb3VyY2Uuc2VydmljZVsnQGlkJ10pO1xuICAgICAgICB9O1xuXG4gICAgICAgIElJSUZWaWV3ZXJWaWV3bW9kZWwuYXBwbHkodGhpcywgW3suLi5wYXJhbXMsIHJlbmRlckNvbnRleHQ6IHBhcmFtcz8ucmVuZGVyQ29udGV4dCA/IHBhcmFtcy5yZW5kZXJDb250ZXh0OiAnbWFuaWZlc3RNYW5hZ2VyJ31dKTtcbiAgICAgICAgdGhpcy5zaG93VGFicyhmYWxzZSk7XG4gICAgICAgIHRoaXMubWFpbk1lbnUuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgICAgICB2YWwgfHwgc2VsZi5zaG93VGFicyh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy5yZW5kZXJDb250ZXh0KCkgPT0gXCJtYW5pZmVzdC13b3JrZmxvd1wiKXtcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGVTZWxlY3RvcihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc01hbmlmZXN0RGlydHkgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAoKGtvLnVud3JhcChzZWxmLm1hbmlmZXN0TmFtZSkgIT09IHNlbGYub3JpZ01hbmlmZXN0TmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKGtvLnVud3JhcChzZWxmLm1hbmlmZXN0RGVzY3JpcHRpb24pICE9PSBzZWxmLm9yaWdNYW5pZmVzdERlc2NyaXB0aW9uKSB8fFxuICAgICAgICAgICAgICAgICAgICAoa28udW53cmFwKHNlbGYubWFuaWZlc3RBdHRyaWJ1dGlvbikgIT09IHNlbGYub3JpZ01hbmlmZXN0QXR0cmlidXRpb24pIHx8XG4gICAgICAgICAgICAgICAgICAgIChrby51bndyYXAoc2VsZi5tYW5pZmVzdExvZ28pICE9PSBzZWxmLm9yaWdNYW5pZmVzdExvZ28pIHx8XG4gICAgICAgICAgICAgICAgICAgIChrby51bndyYXAoc2VsZi5tZXRhZGF0YUxhYmVsKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKGtvLnVud3JhcChzZWxmLm1ldGFkYXRhVmFsdWVzKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKGtvTWFwcGluZy50b0pTT04oc2VsZi5tYW5pZmVzdE1ldGFkYXRhKSAhPT0gc2VsZi5vcmlnTWFuaWZlc3RNZXRhZGF0YSlcbiAgICAgICAgICAgICk7fSk7XG5cbiAgICAgICAgdGhpcy5pc0NhbnZhc0RpcnR5ID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIXNlbGYuY29tcGFyZU1vZGUoKSAmJiAoc2VsZi5jYW52YXNMYWJlbCgpICE9PSBzZWxmLm9yaWdDYW52YXNMYWJlbCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHV1aWQuZ2VuZXJhdGUoKTtcbiAgICAgICAgdGhpcy51bmlxdWVpZENsYXNzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ1bmlxdWVfaWRfXCIgKyBzZWxmLnVuaXF1ZUlkO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvcm1EYXRhID0gbmV3IHdpbmRvdy5Gb3JtRGF0YSgpO1xuXG4gICAgICAgIHRoaXMuc3RhZ2VkTWV0YWRhdGEgPSBrby5jb21wdXRlZChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHJlcyA9IHtsYWJlbDogc2VsZi5tZXRhZGF0YUxhYmVsKCksIHZhbHVlOiBzZWxmLm1ldGFkYXRhVmFsdWVzKCl9O1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVNZXRhZGF0YSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoISFzZWxmLm1ldGFkYXRhTGFiZWwoKSB8fCAhIXNlbGYubWV0YWRhdGFWYWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFuaWZlc3RNZXRhZGF0YS51bnNoaWZ0KGtvTWFwcGluZy5mcm9tSlModGhpcy5zdGFnZWRNZXRhZGF0YSgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLm1ldGFkYXRhTGFiZWwobnVsbCk7XG4gICAgICAgICAgICBzZWxmLm1ldGFkYXRhVmFsdWVzKG51bGwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVtb3ZlTWV0YWRhdGEgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHRoaXMubWFuaWZlc3RNZXRhZGF0YS5yZW1vdmUodmFsKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZEFsbENhbnZhc2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmNhbnZhc2VzKCkuZm9yRWFjaChmdW5jdGlvbihjYW52YXMpe1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNhbnZhc2VzRm9yRGVsZXRpb24oKS5pbmRleE9mKGNhbnZhcykgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FudmFzZXNGb3JEZWxldGlvbi5wdXNoKGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jbGVhckNhbnZhc1NlbGVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5jYW52YXNlc0ZvckRlbGV0aW9uKFtdKTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuZGVsZXRlKFwiZmlsZXNcIik7XG4gICAgICAgICAgICBzZWxmLmZvcm1EYXRhID0gbmV3IHdpbmRvdy5Gb3JtRGF0YSgpO1xuICAgICAgICAgICAgc2VsZi5jbGVhckNhbnZhc1NlbGVjdGlvbigpO1xuICAgICAgICAgICAgc2VsZi5tZXRhZGF0YUxhYmVsKCcnKTtcbiAgICAgICAgICAgIHNlbGYubWV0YWRhdGFWYWx1ZXMoJycpO1xuICAgICAgICAgICAgc2VsZi5tYW5pZmVzdE5hbWUoc2VsZi5vcmlnTWFuaWZlc3ROYW1lKTtcbiAgICAgICAgICAgIHNlbGYubWFuaWZlc3RBdHRyaWJ1dGlvbihzZWxmLm9yaWdNYW5pZmVzdEF0dHJpYnV0aW9uKTtcbiAgICAgICAgICAgIHNlbGYubWFuaWZlc3RMb2dvKHNlbGYub3JpZ01hbmlmZXN0TG9nbyk7XG4gICAgICAgICAgICBzZWxmLm1hbmlmZXN0RGVzY3JpcHRpb24oc2VsZi5vcmlnTWFuaWZlc3REZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBzZWxmLmNhbnZhc0xhYmVsKHNlbGYub3JpZ0NhbnZhc0xhYmVsKCkpO1xuICAgICAgICAgICAgaWYgKHNlbGYub3JpZ01hbmlmZXN0TWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1hbmlmZXN0TWV0YWRhdGEucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgSlNPTi5wYXJzZShzZWxmLm9yaWdNYW5pZmVzdE1ldGFkYXRhKS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tYW5pZmVzdE1ldGFkYXRhLnB1c2goa29NYXBwaW5nLmZyb21KUyhlbnRyeSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYuZHJvcHpvbmUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRyb3B6b25lLnJlbW92ZUFsbEZpbGVzKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc3VibWl0VG9NYW5pZmVzdCA9IGZ1bmN0aW9uKG9uU3VjY2Vzcywgb25FcnJvcil7XG4gICAgICAgICAgICBpZiAocGFyYW1zLm1hbmlmZXN0TWFuYWdlckZvcm1EYXRhKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLm1hbmlmZXN0TWFuYWdlckZvcm1EYXRhKHNlbGYuZm9ybURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLm1hbmlmZXN0X21hbmFnZXIsXG4gICAgICAgICAgICAgICAgZGF0YTogc2VsZi5mb3JtRGF0YSxcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWFuaWZlc3QocmVzcG9uc2UudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRNYW5pZmVzdERhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIHNhdmUgbWFuaWZlc3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWxlcnQobmV3IEpzb25FcnJvckFsZXJ0Vmlld01vZGVsKCdlcC1hbGVydC1yZWQnLCByZXNwb25zZS5yZXNwb25zZUpTT04pKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGVsZXRlQ2FudmFzZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKFwibWFuaWZlc3RcIiwga28udW53cmFwKHNlbGYubWFuaWZlc3QpKTtcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKFwic2VsZWN0ZWRfY2FudmFzZXNcIiwgSlNPTi5zdHJpbmdpZnkoa28udW53cmFwKHNlbGYuY2FudmFzZXNGb3JEZWxldGlvbikpKTtcbiAgICAgICAgICAgIHNlbGYuc3VibWl0VG9NYW5pZmVzdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGVsZXRlTWFuaWZlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoXCJtYW5pZmVzdFwiLCBrby51bndyYXAoc2VsZi5tYW5pZmVzdCkpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgICAgIHVybDogYXJjaGVzLnVybHMubWFuaWZlc3RfbWFuYWdlcixcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XCJtYW5pZmVzdFwiOiBrby51bndyYXAoc2VsZi5tYW5pZmVzdCl9KSxcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRvZ2dsZU1hbmlmZXN0RWRpdG9yKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWFuaWZlc3REYXRhKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1hbmlmZXN0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbnZhcyhudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tYW5pZmVzdE5hbWUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWFuaWZlc3REZXNjcmlwdGlvbihudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tYW5pZmVzdEF0dHJpYnV0aW9uKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4cGFuZEdhbGxlcnkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWFpbk1lbnUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWN0aXZlVGFiKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBkZWxldGUgbWFuaWZlc3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWxlcnQobmV3IEpzb25FcnJvckFsZXJ0Vmlld01vZGVsKCdlcC1hbGVydC1yZWQnLCByZXNwb25zZS5yZXNwb25zZUpTT04pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNyZWF0ZU1hbmlmZXN0ID0gZnVuY3Rpb24oZmlsZUxpc3Qpe1xuICAgICAgICAgICAgQXJyYXkuZnJvbShmaWxlTGlzdCkuZm9yRWFjaChmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoXCJmaWxlc1wiLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZChcIm1hbmlmZXN0X3RpdGxlXCIsIGtvLnVud3JhcChzZWxmLm1hbmlmZXN0TmFtZSkpO1xuICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoXCJtYW5pZmVzdF9kZXNjcmlwdGlvblwiLCBrby51bndyYXAoc2VsZi5tYW5pZmVzdERlc2NyaXB0aW9uKSk7XG4gICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZChcIm9wZXJhdGlvblwiLCBcImNyZWF0ZVwiKTtcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKFwidHJhbnNhY3Rpb25faWRcIiwgc2VsZi50cmFuc2FjdGlvbklkKTtcbiAgICAgICAgICAgIHZhciBvblN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFjdGl2ZVRhYignbWFuaWZlc3QnKTtcbiAgICAgICAgICAgICAgICBzZWxmLm1haW5NZW51KGZhbHNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgb25FcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYubWFpbk1lbnUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5hY3RpdmVUYWIodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZWxmLnN1Ym1pdFRvTWFuaWZlc3Qob25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZEZpbGVzID0gZnVuY3Rpb24oZmlsZUxpc3QpIHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oZmlsZUxpc3QpLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKFwiZmlsZXNcIiwgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi51cGRhdGVNYW5pZmVzdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudXBkYXRlTWFuaWZlc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlTWV0YWRhdGEoKTtcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKFwibWFuaWZlc3RfdGl0bGVcIiwga28udW53cmFwKHNlbGYubWFuaWZlc3ROYW1lKSk7XG4gICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZChcIm1hbmlmZXN0X2Rlc2NyaXB0aW9uXCIsIGtvLnVud3JhcChzZWxmLm1hbmlmZXN0RGVzY3JpcHRpb24pKTtcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKFwibWFuaWZlc3RfYXR0cmlidXRpb25cIiwga28udW53cmFwKHNlbGYubWFuaWZlc3RBdHRyaWJ1dGlvbikpO1xuICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoXCJtYW5pZmVzdF9sb2dvXCIsIGtvLnVud3JhcChzZWxmLm1hbmlmZXN0TG9nbykpO1xuICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoXCJtYW5pZmVzdFwiLCBrby51bndyYXAoc2VsZi5tYW5pZmVzdCkpO1xuICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoXCJjYW52YXNfbGFiZWxcIiwga28udW53cmFwKHNlbGYuY2FudmFzTGFiZWwpID8/ICcnKTsgLy9uZXcgbGFiZWwgZm9yIGNhbnZhc1xuICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoXCJjYW52YXNfaWRcIiwga28udW53cmFwKHNlbGYuY2FudmFzKSk7IC8vY2FudmFzIGlkIGZvciBsYWJlbCBjaGFuZ2VcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKFwibWV0YWRhdGFcIiwgSlNPTi5zdHJpbmdpZnkoa29NYXBwaW5nLnRvSlMoc2VsZi5tYW5pZmVzdE1ldGFkYXRhKSkpO1xuICAgICAgICAgICAgc2VsZi51cGRhdGVDYW52YXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuc3VibWl0VG9NYW5pZmVzdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubWFuaWZlc3Quc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgICAgICBzZWxmLmdldE1hbmlmZXN0RGF0YSh2YWwpO1xuICAgICAgICAgICAgc2VsZi5tYWluTWVudShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWFuaWZlc3REYXRhLnN1YnNjcmliZShmdW5jdGlvbihtYW5pZmVzdERhdGEpIHtcbiAgICAgICAgICAgIGlmIChtYW5pZmVzdERhdGEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdENhbnZhcyhtYW5pZmVzdERhdGEuc2VxdWVuY2VzWzBdLmNhbnZhc2VzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMubWFuaWZlc3REYXRhICYmIGtvLmlzT2JzZXJ2YWJsZShwYXJhbXMubWFuaWZlc3REYXRhKSkge1xuICAgICAgICAgICAgICAgIHBhcmFtcy5tYW5pZmVzdERhdGEobWFuaWZlc3REYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYW5pZmVzdC5zdWJzY3JpYmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChzZWxmLm1hbmlmZXN0KCkgJiYgc2VsZi5tYW5pZmVzdCgpLmNoYXJBdCgwKSA9PSAnLycpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW90ZU1hbmlmZXN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3RlTWFuaWZlc3QodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmhpZGVTaWRlUGFuZWwoKTtcbiAgICAgICAgfSk7IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5kcm9wem9uZU9wdGlvbnM0Y3JlYXRlID0ge1xuICAgICAgICAgICAgdXJsOiBcImFyY2hlcy51cmxzLnJvb3RcIixcbiAgICAgICAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXG4gICAgICAgICAgICBhdXRvUHJvY2Vzc1F1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgIHVwbG9hZE11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgYWNjZXB0ZWRGaWxlczogW1wiaW1hZ2UvanBlZ1wiLCBcImltYWdlL3BuZ1wiLCBcImltYWdlL3RpZmZcIl0uam9pbignLCcpLFxuICAgICAgICAgICAgYXV0b1F1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgIGNsaWNrYWJsZTogXCIuZmlsZWlucHV0LWNyZWF0ZS1idXR0b24uXCIgKyB0aGlzLnVuaXF1ZWlkQ2xhc3MoKSxcbiAgICAgICAgICAgIHByZXZpZXdzQ29udGFpbmVyOiAnI2hpZGRlbi1kei1jcmVhdGUtcHJldmlld3MnLFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kcm9wem9uZSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcImFkZGVkZmlsZXNcIiwgc2VsZi5jcmVhdGVNYW5pZmVzdCk7IFxuICAgICAgICAgICAgICAgIHRoaXMub24oXCJlcnJvclwiLCBmdW5jdGlvbihmaWxlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBmaWxlLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgfSk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZHJvcHpvbmVPcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsOiBcImFyY2hlcy51cmxzLnJvb3RcIixcbiAgICAgICAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXG4gICAgICAgICAgICBhdXRvUHJvY2Vzc1F1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgIHVwbG9hZE11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b1F1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgIGNsaWNrYWJsZTogXCIuZmlsZWlucHV0LWJ1dHRvbi5cIiArIHRoaXMudW5pcXVlaWRDbGFzcygpLFxuICAgICAgICAgICAgcHJldmlld3NDb250YWluZXI6ICcjaGlkZGVuLWR6LXByZXZpZXdzJyxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJvcHpvbmUgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJhZGRlZGZpbGVzXCIsIHNlbGYuYWRkRmlsZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJlcnJvclwiLCBmdW5jdGlvbihmaWxlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBmaWxlLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgfSk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IG1hbmlmZXN0TWFuYWdlclRlbXBsYXRlLFxufSk7XG4iXSwibmFtZXMiOlsia28iLCJrb01hcHBpbmciLCIkIiwiRHJvcHpvbmUiLCJ1dWlkIiwiYXJjaGVzIiwiSnNvbkVycm9yQWxlcnRWaWV3TW9kZWwiLCJJSUlGVmlld2VyVmlld21vZGVsIiwibWFuaWZlc3RNYW5hZ2VyVGVtcGxhdGUiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwidHJhbnNhY3Rpb25JZCIsImdlbmVyYXRlIiwiY2FudmFzZXNGb3JEZWxldGlvbiIsIm9ic2VydmFibGVBcnJheSIsIm1ldGFkYXRhTGFiZWwiLCJvYnNlcnZhYmxlIiwibWV0YWRhdGFWYWx1ZXMiLCJtYWluTWVudSIsInNob3VsZFNob3dTZWxlY3RTZXJ2aWNlIiwic2hvdWxkU2hvd0VkaXRTZXJ2aWNlIiwic2VsZWN0U2VydmljZSIsInNob3VsZFNob3dDcmVhdGVTZXJ2aWNlIiwiY3JlYXRlU2VydmljZSIsInJlbW90ZU1hbmlmZXN0IiwiYWxlcnQiLCJhZGRDYW52YXMiLCJjYW52YXMiLCJwdXNoIiwiaW1hZ2VzIiwicmVzb3VyY2UiLCJzZXJ2aWNlIiwicmVtb3ZlQ2FudmFzIiwicmVtb3ZlIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwicmVuZGVyQ29udGV4dCIsInNob3dUYWJzIiwic3Vic2NyaWJlIiwidmFsIiwic2hvd01vZGVTZWxlY3RvciIsImlzTWFuaWZlc3REaXJ0eSIsImNvbXB1dGVkIiwidW53cmFwIiwibWFuaWZlc3ROYW1lIiwib3JpZ01hbmlmZXN0TmFtZSIsIm1hbmlmZXN0RGVzY3JpcHRpb24iLCJvcmlnTWFuaWZlc3REZXNjcmlwdGlvbiIsIm1hbmlmZXN0QXR0cmlidXRpb24iLCJvcmlnTWFuaWZlc3RBdHRyaWJ1dGlvbiIsIm1hbmlmZXN0TG9nbyIsIm9yaWdNYW5pZmVzdExvZ28iLCJ0b0pTT04iLCJtYW5pZmVzdE1ldGFkYXRhIiwib3JpZ01hbmlmZXN0TWV0YWRhdGEiLCJpc0NhbnZhc0RpcnR5IiwiY29tcGFyZU1vZGUiLCJjYW52YXNMYWJlbCIsIm9yaWdDYW52YXNMYWJlbCIsInVuaXF1ZUlkIiwidW5pcXVlaWRDbGFzcyIsImZvcm1EYXRhIiwid2luZG93IiwiRm9ybURhdGEiLCJzdGFnZWRNZXRhZGF0YSIsInJlcyIsImxhYmVsIiwidmFsdWUiLCJ1cGRhdGVNZXRhZGF0YSIsInVuc2hpZnQiLCJmcm9tSlMiLCJyZW1vdmVNZXRhZGF0YSIsImFkZEFsbENhbnZhc2VzIiwiY2FudmFzZXMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsImNsZWFyQ2FudmFzU2VsZWN0aW9uIiwicmVzZXQiLCJkZWxldGUiLCJyZW1vdmVBbGwiLCJKU09OIiwicGFyc2UiLCJlbnRyeSIsImRyb3B6b25lIiwicmVtb3ZlQWxsRmlsZXMiLCJzdWJtaXRUb01hbmlmZXN0Iiwib25TdWNjZXNzIiwib25FcnJvciIsIm1hbmlmZXN0TWFuYWdlckZvcm1EYXRhIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJ1cmxzIiwibWFuaWZlc3RfbWFuYWdlciIsImRhdGEiLCJjYWNoZSIsInByb2Nlc3NEYXRhIiwiY29udGVudFR5cGUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJtYW5pZmVzdCIsImdldE1hbmlmZXN0RGF0YSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlSlNPTiIsImRlbGV0ZUNhbnZhc2VzIiwiYXBwZW5kIiwic3RyaW5naWZ5IiwiZGVsZXRlTWFuaWZlc3QiLCJ0b2dnbGVNYW5pZmVzdEVkaXRvciIsIm1hbmlmZXN0RGF0YSIsImV4cGFuZEdhbGxlcnkiLCJhY3RpdmVUYWIiLCJ1bmRlZmluZWQiLCJjcmVhdGVNYW5pZmVzdCIsImZpbGVMaXN0IiwiQXJyYXkiLCJmcm9tIiwiZmlsZSIsIm5hbWUiLCJhZGRGaWxlcyIsInVwZGF0ZU1hbmlmZXN0IiwiX2tvJHVud3JhcCIsInRvSlMiLCJ1cGRhdGVDYW52YXMiLCJzZWxlY3RDYW52YXMiLCJzZXF1ZW5jZXMiLCJpc09ic2VydmFibGUiLCJjaGFyQXQiLCJoaWRlU2lkZVBhbmVsIiwiZHJvcHpvbmVPcHRpb25zNGNyZWF0ZSIsImRpY3REZWZhdWx0TWVzc2FnZSIsImF1dG9Qcm9jZXNzUXVldWUiLCJ1cGxvYWRNdWx0aXBsZSIsImFjY2VwdGVkRmlsZXMiLCJqb2luIiwiYXV0b1F1ZXVlIiwiY2xpY2thYmxlIiwicHJldmlld3NDb250YWluZXIiLCJpbml0Iiwib24iLCJkcm9wem9uZU9wdGlvbnMiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=