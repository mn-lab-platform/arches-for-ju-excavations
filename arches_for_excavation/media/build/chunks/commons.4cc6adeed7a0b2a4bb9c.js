"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[45108],{

/***/ 30048:
/*!*********************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/etl_modules/base-bulk-string-editor.htm ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

module.exports = "templates/views/components/etl_modules/base-bulk-string-editor.htm";

/***/ }),

/***/ 45108:
/*!*******************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/etl_modules/base-bulk-string-editor.js ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ 84806);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var viewmodels_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! viewmodels/alert */ 21672);
/* harmony import */ var viewmodels_alert_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! viewmodels/alert-json */ 52139);
/* harmony import */ var templates_views_components_etl_modules_base_bulk_string_editor_htm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! templates/views/components/etl_modules/base-bulk-string-editor.htm */ 30048);
/* harmony import */ var views_components_simple_switch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! views/components/simple-switch */ 96613);
/* harmony import */ var bindings_datatable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! bindings/datatable */ 65863);
/* harmony import */ var bindings_dropzone__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! bindings/dropzone */ 99152);
/* harmony import */ var bindings_resizable_sidepanel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! bindings/resizable-sidepanel */ 88428);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }












var viewModel = function viewModel(params) {
  var _this$selectedLoadEve, _ko$unwrap;
  var self = this;
  this.operationLabel = {
    "trim": "Trim",
    "replace": "Replace (Case Sensitive)",
    "replace_i": "Replace (Case Insensitive)",
    "capitalize": "Capitalize",
    "capitalize_trim": "Capitalize (Also, remove leading/trailing spaces)",
    "upper": "Uppercase",
    "upper_trim": "Uppercase (Also, remove leading/trailing spaces)",
    "lower": "Lowercase",
    "lower_trim": "Lowercase (Also, remove leading/trailing spaces)"
  };
  this.load_details = params.load_details;
  this.selectedLoadEvent = params.selectedLoadEvent || knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.statusDetails = (_this$selectedLoadEve = this.selectedLoadEvent()) === null || _this$selectedLoadEve === void 0 || (_this$selectedLoadEve = _this$selectedLoadEve.load_description) === null || _this$selectedLoadEve === void 0 ? void 0 : _this$selectedLoadEve.split("|");
  this.showStatusDetails = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(false);
  this.editHistoryUrl = "".concat(arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.edit_history, "?transactionid=").concat((_ko$unwrap = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(params.selectedLoadEvent)) === null || _ko$unwrap === void 0 ? void 0 : _ko$unwrap.loadid);
  this.state = params.state;
  this.loading = params.loading || knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.alert = params.alert;
  this.moduleId = params.etlmoduleid;
  this.formatTime = params.formatTime;
  this.timeDifference = params.timeDifference;
  this.config = params.config;
  this.loading(true);
  this.previewing = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.languages = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(arches__WEBPACK_IMPORTED_MODULE_4__["default"].languages);
  this.selectedLanguage = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(this.languages().find(function (lang) {
    return lang.code === arches__WEBPACK_IMPORTED_MODULE_4__["default"].activeLanguage;
  }));
  this.graphs = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.selectedGraph = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.nodes = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.selectedNode = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.selectedNodeName = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.operation = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.oldText = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.newText = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.validated = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.validationError = knockout__WEBPACK_IMPORTED_MODULE_0___default().observableArray();
  this.formData = new window.FormData();
  this.loadId = params.loadId || uuid__WEBPACK_IMPORTED_MODULE_3___default().generate();
  this.resourceids = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.previewValue = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.previewLimit = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.showPreview = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(false);
  this.searchUrl = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.caseInsensitive = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.wholeWord = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.trim = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.numberOfResources = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(0);
  this.numberOfTiles = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(0);
  this.selectedCaseOperation = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.caseOperations = [{
    name: 'capitalize',
    label: 'Capitalize'
  }, {
    name: 'upper',
    label: 'Upper Case'
  }, {
    name: 'lower',
    label: 'Lower Case'
  }];
  this.getGraphs = function () {
    self.loading(true);
    self.submit('get_graphs').then(function (response) {
      self.graphs(response.result);
      self.loading(false);
    });
  };
  this.getGraphName = function (graphId) {
    var _graph;
    var graph;
    if (self.graphs()) {
      graph = self.graphs().find(function (graph) {
        return graph.graphid == graphId;
      });
    }
    return (_graph = graph) === null || _graph === void 0 ? void 0 : _graph.name;
  };
  this.ready = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    var ready = !!self.selectedGraph() && !!self.selectedNode() && !self.previewing() && (self.operation() == 'replace' && !!self.oldText() && !!self.newText() || self.operation() != 'replace');
    return ready;
  });
  this.clearResults = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    // if any of these values change then clear the preview results
    self.showPreview(false);
    // we don't actually care about the results of the following
    var clearResults = '';
    [self.selectedGraph(), self.selectedCaseOperation(), self.selectedNode(), self.searchUrl(), self.selectedLanguage(), self.operation() == 'replace' && !!self.oldText() && !!self.newText() || self.operation() != 'replace'].forEach(function (item) {
      clearResults += item === null || item === void 0 ? void 0 : item.toString();
    });
    return clearResults;
  });
  this.allowEditOperation = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    return self.ready() && self.numberOfTiles() > 0 && self.showPreview();
  });
  this.addAllFormData = function () {
    if (self.operation() == 'case') {
      self.formData.append('operation', self.selectedCaseOperation());
    } else {
      self.formData.append('operation', self.operation());
    }
    if (self.searchUrl()) {
      self.formData.append('search_url', self.searchUrl());
    }
    if (self.selectedNode()) {
      self.formData.append('node_id', self.selectedNode());
    }
    if (self.selectedNodeName()) {
      self.formData.append('node_name', self.selectedNodeName());
    }
    if (self.selectedGraph()) {
      self.formData.append('graph_id', self.selectedGraph());
    }
    if (self.selectedLanguage()) {
      self.formData.append('language_code', self.selectedLanguage().code);
    }
    if (self.caseInsensitive()) {
      self.formData.append('case_insensitive', self.caseInsensitive());
    }
    if (self.wholeWord()) {
      self.formData.append('whole_word', self.wholeWord());
    }
    if (self.trim()) {
      self.formData.append('also_trim', self.trim());
    }
    if (self.oldText()) {
      self.formData.append('old_text', self.oldText());
    }
    if (self.newText()) {
      self.formData.append('new_text', self.newText());
    }
    if (self.resourceids()) {
      self.formData.append('resourceids', JSON.stringify(self.resourceids()));
    }
  };
  self.deleteAllFormData = function () {
    self.formData.delete('operation');
    self.formData.delete('search_url');
    self.formData.delete('node_id');
    self.formData.delete('node_name');
    self.formData.delete('graph_id');
    self.formData.delete('language_code');
    self.formData.delete('case_insensitive');
    self.formData.delete('whole_word');
    self.formData.delete('also_trim');
    self.formData.delete('old_text');
    self.formData.delete('new_text');
    self.formData.delete('resourceids');
  };
  this.selectedNode.subscribe(function (nodeid) {
    if (nodeid) {
      self.selectedNodeName(self.nodes().find(function (node) {
        return node.nodeid === nodeid;
      }).label);
    }
  });
  this.selectedGraph.subscribe(function (graph) {
    if (graph) {
      self.loading(true);
      self.formData.append('graphid', graph);
      self.submit('get_nodes').then(function (response) {
        var nodes = response.result.map(function (node) {
          return _objectSpread(_objectSpread({}, node), {}, {
            label: "".concat(JSON.parse(node.card_name)[arches__WEBPACK_IMPORTED_MODULE_4__["default"].activeLanguage], " - ").concat(JSON.parse(node.widget_label)[arches__WEBPACK_IMPORTED_MODULE_4__["default"].activeLanguage])
          });
        });
        self.selectedNode(null);
        self.nodes(nodes);
        self.loading(false);
      });
    } else {
      self.nodes(null);
    }
  });
  this.preview = function () {
    if (!self.ready()) {
      return;
    }
    self.previewing(true);
    self.showPreview(false);
    self.previewValue([]);
    if (self.operation() === 'replace' && (!self.oldText() || !self.newText())) {
      self.alert(new viewmodels_alert__WEBPACK_IMPORTED_MODULE_5__["default"]('ep-alert-red', "", "The old and new texts should be provided to replace texts", null, function () {}));
      return;
    }
    self.addAllFormData();
    self.submit('preview').then(function (data) {
      self.previewValue(data.result.value);
      self.showPreview(true);
      self.numberOfResources(data.result.number_of_resources);
      self.numberOfTiles(data.result.number_of_tiles);
      self.previewLimit(data.result.preview_limit);
    }).fail(function (err) {
      self.alert(new viewmodels_alert_json__WEBPACK_IMPORTED_MODULE_6__["default"]('ep-alert-red', err.responseJSON["data"], null, function () {}));
    }).always(function () {
      self.previewing(false);
      self.deleteAllFormData();
    });
  };
  this.write = function () {
    if (!self.allowEditOperation()) {
      return;
    }
    if (self.operation() === 'replace' && (!self.oldText() || !self.newText())) {
      self.alert(new viewmodels_alert__WEBPACK_IMPORTED_MODULE_5__["default"]('ep-alert-red', "", "The old and new texts should be provided to replace texts", null, function () {}));
      return;
    }
    self.addAllFormData();
    params.activeTab("import");
    self.submit('write').then(function (data) {
      //console.log(data.result);
    }).fail(function (err) {
      self.alert(new viewmodels_alert_json__WEBPACK_IMPORTED_MODULE_6__["default"]('ep-alert-red', err.responseJSON["data"], null, function () {}));
    });
  };
  this.submit = function (action) {
    self.formData.append('action', action);
    self.formData.append('load_id', self.loadId);
    self.formData.append('module', self.moduleId);
    return jquery__WEBPACK_IMPORTED_MODULE_2___default().ajax({
      type: "POST",
      url: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.etl_manager,
      data: self.formData,
      cache: false,
      processData: false,
      contentType: false
    });
  };
  this.init = function () {
    this.getGraphs();
  };
  this.init();
};
knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('bulk-data-editor', {
  viewModel: viewModel,
  template: templates_views_components_etl_modules_base_bulk_string_editor_htm__WEBPACK_IMPORTED_MODULE_7__
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVMsQ0FBQyxDQUFDO0VBQ3BCLENBQUM7RUFFRCxJQUFJLENBQUNtRCxJQUFJLENBQUMsQ0FBQztBQUNmLENBQUM7QUFDRDNILDBEQUFhLENBQUM2SCxRQUFRLENBQUMsa0JBQWtCLEVBQUU7RUFDdkNySCxTQUFTLEVBQUVBLFNBQVM7RUFDcEJzSCxRQUFRLEVBQUV2SCwrRkFBd0JBO0FBQ3RDLENBQUMsQ0FBQztBQUNGLGlFQUFlQyxTQUFTLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL2V0bF9tb2R1bGVzL2Jhc2UtYnVsay1zdHJpbmctZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQga29NYXBwaW5nIGZyb20gJ2tub2Nrb3V0LW1hcHBpbmcnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IEFsZXJ0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvYWxlcnQnO1xuaW1wb3J0IEpzb25FcnJvckFsZXJ0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvYWxlcnQtanNvbic7XG5pbXBvcnQgYmFzZVN0cmluZ0VkaXRvclRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2V0bF9tb2R1bGVzL2Jhc2UtYnVsay1zdHJpbmctZWRpdG9yLmh0bSc7XG5pbXBvcnQgJ3ZpZXdzL2NvbXBvbmVudHMvc2ltcGxlLXN3aXRjaCc7XG5pbXBvcnQgJ2JpbmRpbmdzL2RhdGF0YWJsZSc7XG5pbXBvcnQgJ2JpbmRpbmdzL2Ryb3B6b25lJztcbmltcG9ydCAnYmluZGluZ3MvcmVzaXphYmxlLXNpZGVwYW5lbCc7XG5cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLm9wZXJhdGlvbkxhYmVsID0ge1xuICAgICAgICBcInRyaW1cIjogXCJUcmltXCIsXG4gICAgICAgIFwicmVwbGFjZVwiOiBcIlJlcGxhY2UgKENhc2UgU2Vuc2l0aXZlKVwiLFxuICAgICAgICBcInJlcGxhY2VfaVwiOiBcIlJlcGxhY2UgKENhc2UgSW5zZW5zaXRpdmUpXCIsXG4gICAgICAgIFwiY2FwaXRhbGl6ZVwiOiBcIkNhcGl0YWxpemVcIixcbiAgICAgICAgXCJjYXBpdGFsaXplX3RyaW1cIjogXCJDYXBpdGFsaXplIChBbHNvLCByZW1vdmUgbGVhZGluZy90cmFpbGluZyBzcGFjZXMpXCIsXG4gICAgICAgIFwidXBwZXJcIjogXCJVcHBlcmNhc2VcIixcbiAgICAgICAgXCJ1cHBlcl90cmltXCI6IFwiVXBwZXJjYXNlIChBbHNvLCByZW1vdmUgbGVhZGluZy90cmFpbGluZyBzcGFjZXMpXCIsXG4gICAgICAgIFwibG93ZXJcIjogXCJMb3dlcmNhc2VcIixcbiAgICAgICAgXCJsb3dlcl90cmltXCI6IFwiTG93ZXJjYXNlIChBbHNvLCByZW1vdmUgbGVhZGluZy90cmFpbGluZyBzcGFjZXMpXCIsXG4gICAgfTtcblxuICAgIHRoaXMubG9hZF9kZXRhaWxzID0gcGFyYW1zLmxvYWRfZGV0YWlscztcbiAgICB0aGlzLnNlbGVjdGVkTG9hZEV2ZW50ID0gcGFyYW1zLnNlbGVjdGVkTG9hZEV2ZW50IHx8IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLnN0YXR1c0RldGFpbHMgPSB0aGlzLnNlbGVjdGVkTG9hZEV2ZW50KCk/LmxvYWRfZGVzY3JpcHRpb24/LnNwbGl0KFwifFwiKTtcbiAgICB0aGlzLnNob3dTdGF0dXNEZXRhaWxzID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy5lZGl0SGlzdG9yeVVybCA9IGAke2FyY2hlcy51cmxzLmVkaXRfaGlzdG9yeX0/dHJhbnNhY3Rpb25pZD0ke2tvLnVud3JhcChwYXJhbXMuc2VsZWN0ZWRMb2FkRXZlbnQpPy5sb2FkaWR9YDtcbiAgICB0aGlzLnN0YXRlID0gcGFyYW1zLnN0YXRlO1xuICAgIHRoaXMubG9hZGluZyA9IHBhcmFtcy5sb2FkaW5nIHx8IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmFsZXJ0ID0gcGFyYW1zLmFsZXJ0O1xuICAgIHRoaXMubW9kdWxlSWQgPSBwYXJhbXMuZXRsbW9kdWxlaWQ7XG4gICAgdGhpcy5mb3JtYXRUaW1lID0gcGFyYW1zLmZvcm1hdFRpbWU7XG4gICAgdGhpcy50aW1lRGlmZmVyZW5jZSA9IHBhcmFtcy50aW1lRGlmZmVyZW5jZTtcbiAgICB0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XG4gICAgdGhpcy5sb2FkaW5nKHRydWUpO1xuICAgIHRoaXMucHJldmlld2luZyA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmxhbmd1YWdlcyA9IGtvLm9ic2VydmFibGUoYXJjaGVzLmxhbmd1YWdlcyk7XG4gICAgdGhpcy5zZWxlY3RlZExhbmd1YWdlID0ga28ub2JzZXJ2YWJsZSh0aGlzLmxhbmd1YWdlcygpLmZpbmQobGFuZyA9PiBsYW5nLmNvZGUgPT09IGFyY2hlcy5hY3RpdmVMYW5ndWFnZSkpO1xuICAgIHRoaXMuZ3JhcGhzID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc2VsZWN0ZWRHcmFwaCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLm5vZGVzID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc2VsZWN0ZWROb2RlID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc2VsZWN0ZWROb2RlTmFtZSA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLm9wZXJhdGlvbiA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLm9sZFRleHQgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5uZXdUZXh0ID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMudmFsaWRhdGVkID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMudmFsaWRhdGlvbkVycm9yID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgdGhpcy5mb3JtRGF0YSA9IG5ldyB3aW5kb3cuRm9ybURhdGEoKTtcbiAgICB0aGlzLmxvYWRJZCA9IHBhcmFtcy5sb2FkSWQgfHwgdXVpZC5nZW5lcmF0ZSgpO1xuICAgIHRoaXMucmVzb3VyY2VpZHMgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5wcmV2aWV3VmFsdWUgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5wcmV2aWV3TGltaXQgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5zaG93UHJldmlldyA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgIHRoaXMuc2VhcmNoVXJsID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuY2FzZUluc2Vuc2l0aXZlID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMud2hvbGVXb3JkID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMudHJpbSA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLm51bWJlck9mUmVzb3VyY2VzID0ga28ub2JzZXJ2YWJsZSgwKTtcbiAgICB0aGlzLm51bWJlck9mVGlsZXMgPSBrby5vYnNlcnZhYmxlKDApO1xuICAgIHRoaXMuc2VsZWN0ZWRDYXNlT3BlcmF0aW9uID0ga28ub2JzZXJ2YWJsZSgpO1xuXG4gICAgdGhpcy5jYXNlT3BlcmF0aW9ucyA9IFtcbiAgICAgICAge25hbWU6ICdjYXBpdGFsaXplJywgbGFiZWw6ICdDYXBpdGFsaXplJ30sXG4gICAgICAgIHtuYW1lOiAndXBwZXInLCBsYWJlbDogJ1VwcGVyIENhc2UnfSxcbiAgICAgICAge25hbWU6ICdsb3dlcicsIGxhYmVsOiAnTG93ZXIgQ2FzZSd9XG4gICAgXTtcbiAgICB0aGlzLmdldEdyYXBocyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlbGYubG9hZGluZyh0cnVlKTtcbiAgICAgICAgc2VsZi5zdWJtaXQoJ2dldF9ncmFwaHMnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgIHNlbGYuZ3JhcGhzKHJlc3BvbnNlLnJlc3VsdCk7XG4gICAgICAgICAgICBzZWxmLmxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRHcmFwaE5hbWUgPSBmdW5jdGlvbihncmFwaElkKXtcbiAgICAgICAgbGV0IGdyYXBoO1xuICAgICAgICBpZiAoc2VsZi5ncmFwaHMoKSkge1xuICAgICAgICAgICAgZ3JhcGggPSBzZWxmLmdyYXBocygpLmZpbmQoZnVuY3Rpb24oZ3JhcGgpe1xuICAgICAgICAgICAgICAgIHJldHVybiBncmFwaC5ncmFwaGlkID09IGdyYXBoSWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JhcGg/Lm5hbWU7XG4gICAgfTtcblxuICAgIHRoaXMucmVhZHkgPSBrby5jb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWR5ID0gISFzZWxmLnNlbGVjdGVkR3JhcGgoKSAmJlxuICAgICAgICAgICAgISFzZWxmLnNlbGVjdGVkTm9kZSgpICYmXG4gICAgICAgICAgICAhc2VsZi5wcmV2aWV3aW5nKCkgJiZcbiAgICAgICAgICAgICgoc2VsZi5vcGVyYXRpb24oKSA9PSAncmVwbGFjZScgJiYgISFzZWxmLm9sZFRleHQoKSAmJiAhIXNlbGYubmV3VGV4dCgpIHx8IHNlbGYub3BlcmF0aW9uKCkgIT0gJ3JlcGxhY2UnKSk7XG4gICAgICAgIHJldHVybiByZWFkeTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2xlYXJSZXN1bHRzID0ga28uY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICAvLyBpZiBhbnkgb2YgdGhlc2UgdmFsdWVzIGNoYW5nZSB0aGVuIGNsZWFyIHRoZSBwcmV2aWV3IHJlc3VsdHNcbiAgICAgICAgc2VsZi5zaG93UHJldmlldyhmYWxzZSk7XG4gICAgICAgIC8vIHdlIGRvbid0IGFjdHVhbGx5IGNhcmUgYWJvdXQgdGhlIHJlc3VsdHMgb2YgdGhlIGZvbGxvd2luZ1xuICAgICAgICBsZXQgY2xlYXJSZXN1bHRzID0gJyc7XG4gICAgICAgIFtzZWxmLnNlbGVjdGVkR3JhcGgoKSxcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRDYXNlT3BlcmF0aW9uKCksXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZSgpLFxuICAgICAgICAgICAgc2VsZi5zZWFyY2hVcmwoKSxcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRMYW5ndWFnZSgpLFxuICAgICAgICAgICAgKChzZWxmLm9wZXJhdGlvbigpID09ICdyZXBsYWNlJyAmJiAhIXNlbGYub2xkVGV4dCgpICYmICEhc2VsZi5uZXdUZXh0KCkgfHwgc2VsZi5vcGVyYXRpb24oKSAhPSAncmVwbGFjZScpKVxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBjbGVhclJlc3VsdHMgKz0gaXRlbT8udG9TdHJpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjbGVhclJlc3VsdHM7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFsbG93RWRpdE9wZXJhdGlvbiA9IGtvLmNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNlbGYucmVhZHkoKSAmJiBzZWxmLm51bWJlck9mVGlsZXMoKSA+IDAgJiYgc2VsZi5zaG93UHJldmlldygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRBbGxGb3JtRGF0YSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHNlbGYub3BlcmF0aW9uKCkgPT0gJ2Nhc2UnKXtcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdvcGVyYXRpb24nLCBzZWxmLnNlbGVjdGVkQ2FzZU9wZXJhdGlvbigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdvcGVyYXRpb24nLCBzZWxmLm9wZXJhdGlvbigpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5zZWFyY2hVcmwoKSkgeyBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnc2VhcmNoX3VybCcsIHNlbGYuc2VhcmNoVXJsKCkpOyB9XG4gICAgICAgIGlmIChzZWxmLnNlbGVjdGVkTm9kZSgpKSB7IHNlbGYuZm9ybURhdGEuYXBwZW5kKCdub2RlX2lkJywgc2VsZi5zZWxlY3RlZE5vZGUoKSk7IH1cbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWROb2RlTmFtZSgpKSB7IHNlbGYuZm9ybURhdGEuYXBwZW5kKCdub2RlX25hbWUnLCBzZWxmLnNlbGVjdGVkTm9kZU5hbWUoKSk7IH1cbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRHcmFwaCgpKSB7IHNlbGYuZm9ybURhdGEuYXBwZW5kKCdncmFwaF9pZCcsIHNlbGYuc2VsZWN0ZWRHcmFwaCgpKTsgfVxuICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZExhbmd1YWdlKCkpIHsgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2xhbmd1YWdlX2NvZGUnLCBzZWxmLnNlbGVjdGVkTGFuZ3VhZ2UoKS5jb2RlKTsgfVxuICAgICAgICBpZiAoc2VsZi5jYXNlSW5zZW5zaXRpdmUoKSkgeyBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnY2FzZV9pbnNlbnNpdGl2ZScsIHNlbGYuY2FzZUluc2Vuc2l0aXZlKCkpOyB9XG4gICAgICAgIGlmIChzZWxmLndob2xlV29yZCgpKSB7IHNlbGYuZm9ybURhdGEuYXBwZW5kKCd3aG9sZV93b3JkJywgc2VsZi53aG9sZVdvcmQoKSk7IH1cbiAgICAgICAgaWYgKHNlbGYudHJpbSgpKSB7IHNlbGYuZm9ybURhdGEuYXBwZW5kKCdhbHNvX3RyaW0nLCBzZWxmLnRyaW0oKSk7IH1cbiAgICAgICAgaWYgKHNlbGYub2xkVGV4dCgpKSB7IHNlbGYuZm9ybURhdGEuYXBwZW5kKCdvbGRfdGV4dCcsIHNlbGYub2xkVGV4dCgpKTsgfVxuICAgICAgICBpZiAoc2VsZi5uZXdUZXh0KCkpIHsgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ25ld190ZXh0Jywgc2VsZi5uZXdUZXh0KCkpOyB9XG4gICAgICAgIGlmIChzZWxmLnJlc291cmNlaWRzKCkpIHsgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ3Jlc291cmNlaWRzJywgSlNPTi5zdHJpbmdpZnkoc2VsZi5yZXNvdXJjZWlkcygpKSk7IH1cbiAgICB9O1xuXG4gICAgc2VsZi5kZWxldGVBbGxGb3JtRGF0YSA9ICgpID0+IHtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5kZWxldGUoJ29wZXJhdGlvbicpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnc2VhcmNoX3VybCcpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnbm9kZV9pZCcpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnbm9kZV9uYW1lJyk7XG4gICAgICAgIHNlbGYuZm9ybURhdGEuZGVsZXRlKCdncmFwaF9pZCcpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnbGFuZ3VhZ2VfY29kZScpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnY2FzZV9pbnNlbnNpdGl2ZScpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnd2hvbGVfd29yZCcpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnYWxzb190cmltJyk7XG4gICAgICAgIHNlbGYuZm9ybURhdGEuZGVsZXRlKCdvbGRfdGV4dCcpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnbmV3X3RleHQnKTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5kZWxldGUoJ3Jlc291cmNlaWRzJyk7XG4gICAgfTtcblxuICAgIHRoaXMuc2VsZWN0ZWROb2RlLnN1YnNjcmliZShub2RlaWQgPT4ge1xuICAgICAgICBpZiAobm9kZWlkKSB7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZU5hbWUoc2VsZi5ub2RlcygpLmZpbmQobm9kZSA9PiBub2RlLm5vZGVpZCA9PT0gbm9kZWlkKS5sYWJlbCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc2VsZWN0ZWRHcmFwaC5zdWJzY3JpYmUoZnVuY3Rpb24oZ3JhcGgpe1xuICAgICAgICBpZiAoZ3JhcGgpe1xuICAgICAgICAgICAgc2VsZi5sb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2dyYXBoaWQnLCBncmFwaCk7XG4gICAgICAgICAgICBzZWxmLnN1Ym1pdCgnZ2V0X25vZGVzJykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSByZXNwb25zZS5yZXN1bHQubWFwKG5vZGUgPT4gKFxuICAgICAgICAgICAgICAgICAgICB7IC4uLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7SlNPTi5wYXJzZShub2RlLmNhcmRfbmFtZSlbYXJjaGVzLmFjdGl2ZUxhbmd1YWdlXX0gLSAke0pTT04ucGFyc2Uobm9kZS53aWRnZXRfbGFiZWwpW2FyY2hlcy5hY3RpdmVMYW5ndWFnZV19YCBcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWROb2RlKG51bGwpO1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZXMobm9kZXMpO1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYubm9kZXMobnVsbCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucHJldmlldyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXNlbGYucmVhZHkoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5wcmV2aWV3aW5nKHRydWUpO1xuICAgICAgICBzZWxmLnNob3dQcmV2aWV3KGZhbHNlKTtcbiAgICAgICAgc2VsZi5wcmV2aWV3VmFsdWUoW10pO1xuXG4gICAgICAgIGlmIChzZWxmLm9wZXJhdGlvbigpID09PSAncmVwbGFjZScgJiYgKCFzZWxmLm9sZFRleHQoKSB8fCAhc2VsZi5uZXdUZXh0KCkpKXtcbiAgICAgICAgICAgIHNlbGYuYWxlcnQoXG4gICAgICAgICAgICAgICAgbmV3IEFsZXJ0Vmlld01vZGVsKFxuICAgICAgICAgICAgICAgICAgICAnZXAtYWxlcnQtcmVkJyxcbiAgICAgICAgICAgICAgICAgICAgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJUaGUgb2xkIGFuZCBuZXcgdGV4dHMgc2hvdWxkIGJlIHByb3ZpZGVkIHRvIHJlcGxhY2UgdGV4dHNcIixcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKXt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuYWRkQWxsRm9ybURhdGEoKTtcbiAgICAgICAgc2VsZi5zdWJtaXQoJ3ByZXZpZXcnKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5wcmV2aWV3VmFsdWUoZGF0YS5yZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgc2VsZi5zaG93UHJldmlldyh0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubnVtYmVyT2ZSZXNvdXJjZXMoZGF0YS5yZXN1bHQubnVtYmVyX29mX3Jlc291cmNlcyk7XG4gICAgICAgICAgICBzZWxmLm51bWJlck9mVGlsZXMoZGF0YS5yZXN1bHQubnVtYmVyX29mX3RpbGVzKTtcbiAgICAgICAgICAgIHNlbGYucHJldmlld0xpbWl0KGRhdGEucmVzdWx0LnByZXZpZXdfbGltaXQpO1xuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgc2VsZi5hbGVydChcbiAgICAgICAgICAgICAgICBuZXcgSnNvbkVycm9yQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICdlcC1hbGVydC1yZWQnLFxuICAgICAgICAgICAgICAgICAgICBlcnIucmVzcG9uc2VKU09OW1wiZGF0YVwiXSxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKXt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5wcmV2aWV3aW5nKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYuZGVsZXRlQWxsRm9ybURhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMud3JpdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFzZWxmLmFsbG93RWRpdE9wZXJhdGlvbigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYub3BlcmF0aW9uKCkgPT09ICdyZXBsYWNlJyAmJiAoIXNlbGYub2xkVGV4dCgpIHx8ICFzZWxmLm5ld1RleHQoKSkpe1xuICAgICAgICAgICAgc2VsZi5hbGVydChcbiAgICAgICAgICAgICAgICBuZXcgQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICdlcC1hbGVydC1yZWQnLFxuICAgICAgICAgICAgICAgICAgICBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBcIlRoZSBvbGQgYW5kIG5ldyB0ZXh0cyBzaG91bGQgYmUgcHJvdmlkZWQgdG8gcmVwbGFjZSB0ZXh0c1wiLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpe31cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5hZGRBbGxGb3JtRGF0YSgpO1xuICAgICAgICBwYXJhbXMuYWN0aXZlVGFiKFwiaW1wb3J0XCIpO1xuICAgICAgICBzZWxmLnN1Ym1pdCgnd3JpdGUnKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhLnJlc3VsdCk7XG4gICAgICAgIH0pLmZhaWwoIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgc2VsZi5hbGVydChcbiAgICAgICAgICAgICAgICBuZXcgSnNvbkVycm9yQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICdlcC1hbGVydC1yZWQnLFxuICAgICAgICAgICAgICAgICAgICBlcnIucmVzcG9uc2VKU09OW1wiZGF0YVwiXSxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKXt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc3VibWl0ID0gZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdhY3Rpb24nLCBhY3Rpb24pO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnbG9hZF9pZCcsIHNlbGYubG9hZElkKTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ21vZHVsZScsIHNlbGYubW9kdWxlSWQpO1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5ldGxfbWFuYWdlcixcbiAgICAgICAgICAgIGRhdGE6IHNlbGYuZm9ybURhdGEsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmdldEdyYXBocygpO1xuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbn07XG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKCdidWxrLWRhdGEtZWRpdG9yJywge1xuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiBiYXNlU3RyaW5nRWRpdG9yVGVtcGxhdGUsXG59KTtcbmV4cG9ydCBkZWZhdWx0IHZpZXdNb2RlbDtcbiJdLCJuYW1lcyI6WyJrbyIsImtvTWFwcGluZyIsIiQiLCJ1dWlkIiwiYXJjaGVzIiwiQWxlcnRWaWV3TW9kZWwiLCJKc29uRXJyb3JBbGVydFZpZXdNb2RlbCIsImJhc2VTdHJpbmdFZGl0b3JUZW1wbGF0ZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsIl90aGlzJHNlbGVjdGVkTG9hZEV2ZSIsIl9rbyR1bndyYXAiLCJzZWxmIiwib3BlcmF0aW9uTGFiZWwiLCJsb2FkX2RldGFpbHMiLCJzZWxlY3RlZExvYWRFdmVudCIsIm9ic2VydmFibGUiLCJzdGF0dXNEZXRhaWxzIiwibG9hZF9kZXNjcmlwdGlvbiIsInNwbGl0Iiwic2hvd1N0YXR1c0RldGFpbHMiLCJlZGl0SGlzdG9yeVVybCIsImNvbmNhdCIsInVybHMiLCJlZGl0X2hpc3RvcnkiLCJ1bndyYXAiLCJsb2FkaWQiLCJzdGF0ZSIsImxvYWRpbmciLCJhbGVydCIsIm1vZHVsZUlkIiwiZXRsbW9kdWxlaWQiLCJmb3JtYXRUaW1lIiwidGltZURpZmZlcmVuY2UiLCJjb25maWciLCJwcmV2aWV3aW5nIiwibGFuZ3VhZ2VzIiwic2VsZWN0ZWRMYW5ndWFnZSIsImZpbmQiLCJsYW5nIiwiY29kZSIsImFjdGl2ZUxhbmd1YWdlIiwiZ3JhcGhzIiwic2VsZWN0ZWRHcmFwaCIsIm5vZGVzIiwic2VsZWN0ZWROb2RlIiwic2VsZWN0ZWROb2RlTmFtZSIsIm9wZXJhdGlvbiIsIm9sZFRleHQiLCJuZXdUZXh0IiwidmFsaWRhdGVkIiwidmFsaWRhdGlvbkVycm9yIiwib2JzZXJ2YWJsZUFycmF5IiwiZm9ybURhdGEiLCJ3aW5kb3ciLCJGb3JtRGF0YSIsImxvYWRJZCIsImdlbmVyYXRlIiwicmVzb3VyY2VpZHMiLCJwcmV2aWV3VmFsdWUiLCJwcmV2aWV3TGltaXQiLCJzaG93UHJldmlldyIsInNlYXJjaFVybCIsImNhc2VJbnNlbnNpdGl2ZSIsIndob2xlV29yZCIsInRyaW0iLCJudW1iZXJPZlJlc291cmNlcyIsIm51bWJlck9mVGlsZXMiLCJzZWxlY3RlZENhc2VPcGVyYXRpb24iLCJjYXNlT3BlcmF0aW9ucyIsIm5hbWUiLCJsYWJlbCIsImdldEdyYXBocyIsInN1Ym1pdCIsInRoZW4iLCJyZXNwb25zZSIsInJlc3VsdCIsImdldEdyYXBoTmFtZSIsImdyYXBoSWQiLCJfZ3JhcGgiLCJncmFwaCIsImdyYXBoaWQiLCJyZWFkeSIsImNvbXB1dGVkIiwiY2xlYXJSZXN1bHRzIiwiZm9yRWFjaCIsIml0ZW0iLCJ0b1N0cmluZyIsImFsbG93RWRpdE9wZXJhdGlvbiIsImFkZEFsbEZvcm1EYXRhIiwiYXBwZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsImRlbGV0ZUFsbEZvcm1EYXRhIiwiZGVsZXRlIiwic3Vic2NyaWJlIiwibm9kZWlkIiwibm9kZSIsIm1hcCIsIl9vYmplY3RTcHJlYWQiLCJwYXJzZSIsImNhcmRfbmFtZSIsIndpZGdldF9sYWJlbCIsInByZXZpZXciLCJkYXRhIiwidmFsdWUiLCJudW1iZXJfb2ZfcmVzb3VyY2VzIiwibnVtYmVyX29mX3RpbGVzIiwicHJldmlld19saW1pdCIsImZhaWwiLCJlcnIiLCJyZXNwb25zZUpTT04iLCJhbHdheXMiLCJ3cml0ZSIsImFjdGl2ZVRhYiIsImFjdGlvbiIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZXRsX21hbmFnZXIiLCJjYWNoZSIsInByb2Nlc3NEYXRhIiwiY29udGVudFR5cGUiLCJpbml0IiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==