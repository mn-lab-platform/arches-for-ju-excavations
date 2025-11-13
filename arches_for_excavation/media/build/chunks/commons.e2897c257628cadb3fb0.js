"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[42093],{

/***/ 42093:
/*!*************************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/etl_modules/bulk_edit_concept.js + 1 modules ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ bulk_edit_concept)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/uuidjs/dist/uuid.core.js
var uuid_core = __webpack_require__(84806);
var uuid_core_default = /*#__PURE__*/__webpack_require__.n(uuid_core);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/alert-json.js
var alert_json = __webpack_require__(52139);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/etl_modules/bulk_edit_concept.htm
const bulk_edit_concept_namespaceObject = "templates/views/components/etl_modules/bulk_edit_concept.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/concept-select.js
var concept_select = __webpack_require__(85029);
// EXTERNAL MODULE: ./node_modules/select-woo/dist/js/selectWoo.full.js
var selectWoo_full = __webpack_require__(95586);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/etl_modules/bulk_edit_concept.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }








var ViewModel = function ViewModel(params) {
  var _ko$unwrap, _params$load_details, _this$selectedLoadEve;
  var self = this;
  this.config = params.config;
  this.state = params.state;
  this.editHistoryUrl = "".concat(arches["default"].urls.edit_history, "?transactionid=").concat((_ko$unwrap = knockout_latest_default().unwrap(params.selectedLoadEvent)) === null || _ko$unwrap === void 0 ? void 0 : _ko$unwrap.loadid);
  this.load_details = (_params$load_details = params.load_details) !== null && _params$load_details !== void 0 ? _params$load_details : {};
  this.loadId = params.loadId || uuid_core_default().generate();
  this.showStatusDetails = knockout_latest_default().observable(false);
  this.moduleId = params.etlmoduleid;
  this.previewing = knockout_latest_default().observable();
  this.formData = new window.FormData();
  this.searchUrl = knockout_latest_default().observable();
  this.dropdownnodes = knockout_latest_default().observableArray();
  this.selectedNode = knockout_latest_default().observable();
  this.dropdowngraph = knockout_latest_default().observableArray();
  this.selectedGraph = knockout_latest_default().observable();
  this.conceptOld = knockout_latest_default().observable();
  this.conceptNew = knockout_latest_default().observable();
  this.conceptOldLang = knockout_latest_default().observable();
  this.conceptNewLang = knockout_latest_default().observable();
  this.rdmCollection = null;
  this.rdmCollectionLanguages = knockout_latest_default().observableArray();
  this.showPreview = knockout_latest_default().observable(false);
  //paging
  this.currentPageIndex = knockout_latest_default().observable(0);
  this.tilesToRemove = knockout_latest_default().observableArray();
  //length table
  this.numberOfTiles = knockout_latest_default().observable();
  this.numberOfResources = knockout_latest_default().observable();
  this.previewLimit = knockout_latest_default().observable();
  //loading status
  this.formatTime = params.formatTime;
  this.selectedLoadEvent = params.selectedLoadEvent || knockout_latest_default().observable();
  this.statusDetails = (_this$selectedLoadEve = this.selectedLoadEvent()) === null || _this$selectedLoadEve === void 0 || (_this$selectedLoadEve = _this$selectedLoadEve.load_description) === null || _this$selectedLoadEve === void 0 ? void 0 : _this$selectedLoadEve.split("|");
  this.timeDifference = params.timeDifference;
  this.alert = params.alert || knockout_latest_default().observable();
  this.addAllFormData = function () {
    self.formData = new window.FormData();
    self.formData.append('load_id', self.loadId);
    self.formData.append('module', self.moduleId);
    if (self.selectedGraph()) {
      self.formData.append('selectedGraph', self.selectedGraph());
    }
    if (self.conceptOld()) {
      self.formData.append('conceptOld', self.conceptOld());
    }
    if (self.conceptNew()) {
      self.formData.append('conceptNew', self.conceptNew());
    }
    if (self.selectedNode()) {
      self.formData.append('selectedNode', JSON.stringify(self.selectedNode()));
    }
    if (self.searchUrl()) {
      self.formData.append('search_url', self.searchUrl());
    }
    if (self.rdmCollection) {
      self.formData.append('rdmCollection', self.rdmCollection);
    }
    self.formData.append('currentPageIndex', self.currentPageIndex());
    self.formData.append('tilesToRemove', self.tilesToRemove());
  };

  //paging
  // Function to navigate to the previous page
  self.previousPage = function () {
    if (self.currentPageIndex() > 0) {
      self.currentPageIndex(self.currentPageIndex() - 1);
    }
  };
  // Function to navigate to the next page
  self.nextPage = function () {
    if (self.currentPageIndex() < self.maxPageIndex()) {
      self.currentPageIndex(self.currentPageIndex() + 1);
    }
  };
  self.currentPageIndex.subscribe(function (pageIndex) {
    self.getPreviewData();
  });
  // Computed observable to calculate the maximum page index
  self.maxPageIndex = knockout_latest_default().computed(function () {
    return Math.ceil(self.numberOfTiles() / 5) - 1;
  });

  // Computed observable to paginate rows
  self.paginatedRows = knockout_latest_default().observableArray();

  //make url
  self.constructReportUrl = function (dataItem) {
    return arches["default"].urls.reports + dataItem.resourceid;
  };
  this.ready = knockout_latest_default().computed(function () {
    var ready = !!self.selectedGraph() && !!self.selectedNode() && !self.previewing() && self.conceptNew() !== self.conceptOld() && !!self.conceptNew() && !!self.conceptOld();
    return ready;
  });
  this.clearResults = knockout_latest_default().computed(function () {
    // if any of these values change then clear the preview results
    self.showPreview(false);
    self.tilesToRemove.removeAll();
    self.currentPageIndex(0);
    // we don't actually care about the results of the following
    var clearResults = '';
    [self.selectedGraph(), self.selectedNode(), self.conceptOldLang(), self.conceptNewLang(), self.conceptOld(), self.conceptNew()].forEach(function (item) {
      clearResults += item === null || item === void 0 ? void 0 : item.toString();
    });
    return clearResults;
  });
  this.allowEditOperation = knockout_latest_default().computed(function () {
    return self.ready() && self.numberOfTiles() > 0 && self.showPreview();
  });
  this.inTileList = function (tileToFind) {
    var tile = self.tilesToRemove().find(function (tileid) {
      return tileid === tileToFind.tileid;
    });
    return !!tile;
  };

  //delete Row in table
  this.addToList = function (tileid) {
    var list = new Set([].concat(_toConsumableArray(self.tilesToRemove()), [tileid]));
    self.tilesToRemove(list);
  };

  //call python code to display the change
  this.getPreviewData = function () {
    self.showPreview(true);
    self.submit('preview').then(function (data) {
      self.numberOfResources(data.result.number_of_resources);
      self.numberOfTiles(data.result.number_of_tiles);
      self.previewLimit(data.result.preview_limit);
      self.paginatedRows(data.result.values);
    }).fail(function (err) {
      self.alert(new alert_json["default"]('ep-alert-red', err.responseJSON["data"], null, function () {}));
    }).always(function () {
      self.previewing(false);
    });
  };
  this.selectedNode.subscribe(function (node) {
    self.conceptNew(undefined);
    self.conceptOld(undefined);
    self.rdmCollectionLanguages.removeAll();
    if (!!node) {
      self.rdmCollection = node.rdmCollection;
      self.submit('get_collection_languages').then(function (data) {
        self.rdmCollectionLanguages(data.result);
        if (data.result.length > 0) {
          window.setTimeout(function () {
            self.conceptOldLang(data.result[0].id);
            self.conceptNewLang(data.result[0].id);
          }, 500);
        }
      }).fail(function (err) {
        self.alert(new alert_json["default"]('ep-alert-red', err.responseJSON["data"], null, function () {}));
      }).always(function () {
        //self.previewing(false);
      });
    }
  });

  //select nodes and take the specific value
  this.selectedGraph.subscribe(function (graphid) {
    self.dropdownnodes.removeAll();
    self.conceptNew(undefined);
    self.conceptOld(undefined);
    self.selectedNode(undefined);
    self.submit('get_graphs_node').then(function (data) {
      var nodes = data.result.map(function (node) {
        return {
          node: node.nodeid,
          label: "".concat(JSON.parse(node.card_name)[arches["default"].activeLanguage], " - ").concat(JSON.parse(node.widget_label)[arches["default"].activeLanguage]),
          rdmCollection: JSON.parse(node.config).rdmCollection
        };
      });
      self.dropdownnodes(nodes);
    }).fail(function (err) {
      self.alert(new alert_json["default"]('ep-alert-red', err.responseJSON["data"], null, function () {}));
    }).always(function () {
      self.previewing(false);
    });
  });

  //take the graphs 
  this.allgraph = function () {
    self.dropdowngraph.removeAll();
    self.dropdownnodes.removeAll();
    self.showPreview(false);
    self.submit('get_graphs').then(function (data) {
      data.result.forEach(function (graph) {
        self.dropdowngraph.push({
          "graphName": graph.name,
          "graphid": graph.graphid
        });
      });
    }).fail(function (err) {
      self.alert(new alert_json["default"]('ep-alert-red', err.responseJSON["data"], null, function () {}));
    }).always(function () {
      self.previewing(false);
    });
  };
  this.write = function () {
    if (!self.allowEditOperation()) {
      return;
    }
    self.showPreview(false);
    params.activeTab("import");
    self.submit('write').then(function (data) {}).fail(function (err) {
      self.alert(new alert_json["default"]('ep-alert-red', err.responseJSON["data"], null, function () {}));
    });
  };
  this.submit = function (action, data) {
    self.addAllFormData();
    self.formData.append('action', action);
    return jquery_min_default().ajax({
      type: "POST",
      url: arches["default"].urls.etl_manager,
      data: self.formData,
      cache: false,
      processData: false,
      contentType: false
    });
  };
  this.allgraph();
};

// Register the 'bulk_edit_concept' component
knockout_latest_default().components.register('bulk_edit_concept', {
  viewModel: ViewModel,
  template: bulk_edit_concept_namespaceObject
});

// Apply bindings after registering the component
//ko.applyBindings(new ViewModel()); // This makes Knockout get to work
/* harmony default export */ const bulk_edit_concept = (ViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUJsQyxJQUFJLEVBQUVqRixJQUFJLENBQUNrQixRQUFRO01BQ25Ca0csS0FBSyxFQUFFLEtBQUs7TUFDWkMsV0FBVyxFQUFFLEtBQUs7TUFDbEJDLFdBQVcsRUFBRTtJQUNqQixDQUFDLENBQUM7RUFDTixDQUFDO0VBRUQsSUFBSSxDQUFDYixRQUFRLENBQUMsQ0FBQztBQUNuQixDQUFDOztBQUVEO0FBQ0FwSCxvQ0FBYSxDQUFDbUksUUFBUSxDQUFDLG1CQUFtQixFQUFFO0VBQ3hDQyxTQUFTLEVBQUU5SCxTQUFTO0VBQ3BCK0gsUUFBUSxFQUFFaEksaUNBQXdCQTtBQUN0QyxDQUFDLENBQUM7O0FBRUY7QUFDQTtBQUNBLHdEQUFlQyxTQUFTLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL2V0bF9tb2R1bGVzL2J1bGtfZWRpdF9jb25jZXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgSnNvbkVycm9yQWxlcnRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy9hbGVydC1qc29uJztcbmltcG9ydCBiYXNlU3RyaW5nRWRpdG9yVGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvZXRsX21vZHVsZXMvYnVsa19lZGl0X2NvbmNlcHQuaHRtJztcbmltcG9ydCAndmlld3MvY29tcG9uZW50cy93aWRnZXRzL2NvbmNlcHQtc2VsZWN0JztcbmltcG9ydCAnc2VsZWN0LXdvbyc7XG5cblxuY29uc3QgVmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5jb25maWcgPSBwYXJhbXMuY29uZmlnO1xuICAgIHRoaXMuc3RhdGUgPSBwYXJhbXMuc3RhdGU7XG4gICAgdGhpcy5lZGl0SGlzdG9yeVVybCA9IGAke2FyY2hlcy51cmxzLmVkaXRfaGlzdG9yeX0/dHJhbnNhY3Rpb25pZD0ke2tvLnVud3JhcChwYXJhbXMuc2VsZWN0ZWRMb2FkRXZlbnQpPy5sb2FkaWR9YDtcbiAgICB0aGlzLmxvYWRfZGV0YWlscyA9IHBhcmFtcy5sb2FkX2RldGFpbHMgPz8ge307XG4gICAgdGhpcy5sb2FkSWQgPSBwYXJhbXMubG9hZElkIHx8IHV1aWQuZ2VuZXJhdGUoKTtcbiAgICB0aGlzLnNob3dTdGF0dXNEZXRhaWxzID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy5tb2R1bGVJZCA9IHBhcmFtcy5ldGxtb2R1bGVpZDtcbiAgICB0aGlzLnByZXZpZXdpbmcgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5mb3JtRGF0YSA9IG5ldyB3aW5kb3cuRm9ybURhdGEoKTtcbiAgICB0aGlzLnNlYXJjaFVybCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmRyb3Bkb3dubm9kZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB0aGlzLnNlbGVjdGVkTm9kZSA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmRyb3Bkb3duZ3JhcGggPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB0aGlzLnNlbGVjdGVkR3JhcGggPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5jb25jZXB0T2xkID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuY29uY2VwdE5ldyA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmNvbmNlcHRPbGRMYW5nID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuY29uY2VwdE5ld0xhbmcgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5yZG1Db2xsZWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLnJkbUNvbGxlY3Rpb25MYW5ndWFnZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB0aGlzLnNob3dQcmV2aWV3ID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgLy9wYWdpbmdcbiAgICB0aGlzLmN1cnJlbnRQYWdlSW5kZXggPSBrby5vYnNlcnZhYmxlKDApO1xuICAgIHRoaXMudGlsZXNUb1JlbW92ZSA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIC8vbGVuZ3RoIHRhYmxlXG4gICAgdGhpcy5udW1iZXJPZlRpbGVzID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMubnVtYmVyT2ZSZXNvdXJjZXMgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5wcmV2aWV3TGltaXQgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgLy9sb2FkaW5nIHN0YXR1c1xuICAgIHRoaXMuZm9ybWF0VGltZSA9IHBhcmFtcy5mb3JtYXRUaW1lO1xuICAgIHRoaXMuc2VsZWN0ZWRMb2FkRXZlbnQgPSBwYXJhbXMuc2VsZWN0ZWRMb2FkRXZlbnQgfHwga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc3RhdHVzRGV0YWlscyA9IHRoaXMuc2VsZWN0ZWRMb2FkRXZlbnQoKT8ubG9hZF9kZXNjcmlwdGlvbj8uc3BsaXQoXCJ8XCIpO1xuICAgIHRoaXMudGltZURpZmZlcmVuY2UgPSBwYXJhbXMudGltZURpZmZlcmVuY2U7XG4gICAgdGhpcy5hbGVydCA9IHBhcmFtcy5hbGVydCB8fCBrby5vYnNlcnZhYmxlKCk7XG4gICAgXG4gICAgdGhpcy5hZGRBbGxGb3JtRGF0YSA9ICgpID0+IHtcbiAgICAgICAgc2VsZi5mb3JtRGF0YSA9IG5ldyB3aW5kb3cuRm9ybURhdGEoKTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2xvYWRfaWQnLCBzZWxmLmxvYWRJZCk7XG4gICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdtb2R1bGUnLCBzZWxmLm1vZHVsZUlkKTtcbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRHcmFwaCgpKSB7IHNlbGYuZm9ybURhdGEuYXBwZW5kKCdzZWxlY3RlZEdyYXBoJywgc2VsZi5zZWxlY3RlZEdyYXBoKCkpOyB9XG4gICAgICAgIGlmIChzZWxmLmNvbmNlcHRPbGQoKSkgeyBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnY29uY2VwdE9sZCcsIHNlbGYuY29uY2VwdE9sZCgpKTsgfVxuICAgICAgICBpZiAoc2VsZi5jb25jZXB0TmV3KCkpIHsgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2NvbmNlcHROZXcnLCBzZWxmLmNvbmNlcHROZXcoKSk7IH1cbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWROb2RlKCkpIHsgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ3NlbGVjdGVkTm9kZScsIEpTT04uc3RyaW5naWZ5KHNlbGYuc2VsZWN0ZWROb2RlKCkpKTsgfVxuICAgICAgICBpZiAoc2VsZi5zZWFyY2hVcmwoKSkgeyBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnc2VhcmNoX3VybCcsIHNlbGYuc2VhcmNoVXJsKCkpOyB9XG4gICAgICAgIGlmIChzZWxmLnJkbUNvbGxlY3Rpb24pIHsgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ3JkbUNvbGxlY3Rpb24nLCBzZWxmLnJkbUNvbGxlY3Rpb24pOyB9XG4gICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdjdXJyZW50UGFnZUluZGV4Jywgc2VsZi5jdXJyZW50UGFnZUluZGV4KCkpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZCgndGlsZXNUb1JlbW92ZScsIHNlbGYudGlsZXNUb1JlbW92ZSgpKTtcbiAgICB9O1xuXG4gICAgLy9wYWdpbmdcbiAgICAvLyBGdW5jdGlvbiB0byBuYXZpZ2F0ZSB0byB0aGUgcHJldmlvdXMgcGFnZVxuICAgIHNlbGYucHJldmlvdXNQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRQYWdlSW5kZXgoKSA+IDApIHtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFBhZ2VJbmRleChzZWxmLmN1cnJlbnRQYWdlSW5kZXgoKSAtIDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBGdW5jdGlvbiB0byBuYXZpZ2F0ZSB0byB0aGUgbmV4dCBwYWdlXG4gICAgc2VsZi5uZXh0UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2VsZi5jdXJyZW50UGFnZUluZGV4KCkgPCBzZWxmLm1heFBhZ2VJbmRleCgpKSB7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRQYWdlSW5kZXgoc2VsZi5jdXJyZW50UGFnZUluZGV4KCkgKyAxKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZWxmLmN1cnJlbnRQYWdlSW5kZXguc3Vic2NyaWJlKChwYWdlSW5kZXgpID0+IHtcbiAgICAgICAgc2VsZi5nZXRQcmV2aWV3RGF0YSgpO1xuICAgIH0pO1xuICAgIC8vIENvbXB1dGVkIG9ic2VydmFibGUgdG8gY2FsY3VsYXRlIHRoZSBtYXhpbXVtIHBhZ2UgaW5kZXhcbiAgICBzZWxmLm1heFBhZ2VJbmRleCA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHNlbGYubnVtYmVyT2ZUaWxlcygpIC8gNSkgLSAxO1xuICAgIH0pO1xuXG4gICAgLy8gQ29tcHV0ZWQgb2JzZXJ2YWJsZSB0byBwYWdpbmF0ZSByb3dzXG4gICAgc2VsZi5wYWdpbmF0ZWRSb3dzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICAvL21ha2UgdXJsXG4gICAgc2VsZi5jb25zdHJ1Y3RSZXBvcnRVcmwgPSBmdW5jdGlvbihkYXRhSXRlbSkge1xuICAgICAgICByZXR1cm4gYXJjaGVzLnVybHMucmVwb3J0cyArIGRhdGFJdGVtLnJlc291cmNlaWQ7XG4gICAgfTtcblxuICAgIHRoaXMucmVhZHkgPSBrby5jb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWR5ID0gISFzZWxmLnNlbGVjdGVkR3JhcGgoKSAmJlxuICAgICAgICAgICAgISFzZWxmLnNlbGVjdGVkTm9kZSgpICYmXG4gICAgICAgICAgICAhc2VsZi5wcmV2aWV3aW5nKCkgJiZcbiAgICAgICAgICAgIHNlbGYuY29uY2VwdE5ldygpICE9PSBzZWxmLmNvbmNlcHRPbGQoKSAmJlxuICAgICAgICAgICAgISFzZWxmLmNvbmNlcHROZXcoKSAmJlxuICAgICAgICAgICAgISFzZWxmLmNvbmNlcHRPbGQoKTtcbiAgICAgICAgcmV0dXJuIHJlYWR5O1xuICAgIH0pO1xuXG4gICAgdGhpcy5jbGVhclJlc3VsdHMgPSBrby5jb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIC8vIGlmIGFueSBvZiB0aGVzZSB2YWx1ZXMgY2hhbmdlIHRoZW4gY2xlYXIgdGhlIHByZXZpZXcgcmVzdWx0c1xuICAgICAgICBzZWxmLnNob3dQcmV2aWV3KGZhbHNlKTtcbiAgICAgICAgc2VsZi50aWxlc1RvUmVtb3ZlLnJlbW92ZUFsbCgpO1xuICAgICAgICBzZWxmLmN1cnJlbnRQYWdlSW5kZXgoMCk7XG4gICAgICAgIC8vIHdlIGRvbid0IGFjdHVhbGx5IGNhcmUgYWJvdXQgdGhlIHJlc3VsdHMgb2YgdGhlIGZvbGxvd2luZ1xuICAgICAgICBsZXQgY2xlYXJSZXN1bHRzID0gJyc7XG4gICAgICAgIFtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRHcmFwaCgpLFxuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGUoKSxcbiAgICAgICAgICAgIHNlbGYuY29uY2VwdE9sZExhbmcoKSxcbiAgICAgICAgICAgIHNlbGYuY29uY2VwdE5ld0xhbmcoKSxcbiAgICAgICAgICAgIHNlbGYuY29uY2VwdE9sZCgpLFxuICAgICAgICAgICAgc2VsZi5jb25jZXB0TmV3KClcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgY2xlYXJSZXN1bHRzICs9IGl0ZW0/LnRvU3RyaW5nKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2xlYXJSZXN1bHRzO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hbGxvd0VkaXRPcGVyYXRpb24gPSBrby5jb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBzZWxmLnJlYWR5KCkgJiYgc2VsZi5udW1iZXJPZlRpbGVzKCkgPiAwICYmIHNlbGYuc2hvd1ByZXZpZXcoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW5UaWxlTGlzdCA9ICh0aWxlVG9GaW5kKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpbGUgPSBzZWxmLnRpbGVzVG9SZW1vdmUoKS5maW5kKCh0aWxlaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aWxlaWQgPT09IHRpbGVUb0ZpbmQudGlsZWlkO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICEhdGlsZTtcbiAgICB9O1xuXG4gICAgLy9kZWxldGUgUm93IGluIHRhYmxlXG4gICAgdGhpcy5hZGRUb0xpc3QgPSBmdW5jdGlvbih0aWxlaWQpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IG5ldyBTZXQoWy4uLnNlbGYudGlsZXNUb1JlbW92ZSgpLCB0aWxlaWRdKTtcbiAgICAgICAgc2VsZi50aWxlc1RvUmVtb3ZlKGxpc3QpO1xuICAgIH07XG5cbiAgICAvL2NhbGwgcHl0aG9uIGNvZGUgdG8gZGlzcGxheSB0aGUgY2hhbmdlXG4gICAgdGhpcy5nZXRQcmV2aWV3RGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnNob3dQcmV2aWV3KHRydWUpO1xuICAgICAgICBzZWxmLnN1Ym1pdCgncHJldmlldycpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLm51bWJlck9mUmVzb3VyY2VzKGRhdGEucmVzdWx0Lm51bWJlcl9vZl9yZXNvdXJjZXMpO1xuICAgICAgICAgICAgc2VsZi5udW1iZXJPZlRpbGVzKGRhdGEucmVzdWx0Lm51bWJlcl9vZl90aWxlcyk7XG4gICAgICAgICAgICBzZWxmLnByZXZpZXdMaW1pdChkYXRhLnJlc3VsdC5wcmV2aWV3X2xpbWl0KTtcbiAgICAgICAgICAgIHNlbGYucGFnaW5hdGVkUm93cyhkYXRhLnJlc3VsdC52YWx1ZXMpO1xuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgc2VsZi5hbGVydChcbiAgICAgICAgICAgICAgICBuZXcgSnNvbkVycm9yQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICdlcC1hbGVydC1yZWQnLFxuICAgICAgICAgICAgICAgICAgICBlcnIucmVzcG9uc2VKU09OW1wiZGF0YVwiXSxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKXt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5wcmV2aWV3aW5nKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2VsZWN0ZWROb2RlLnN1YnNjcmliZSgobm9kZSkgPT4ge1xuICAgICAgICBzZWxmLmNvbmNlcHROZXcodW5kZWZpbmVkKTtcbiAgICAgICAgc2VsZi5jb25jZXB0T2xkKHVuZGVmaW5lZCk7XG4gICAgICAgIHNlbGYucmRtQ29sbGVjdGlvbkxhbmd1YWdlcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCEhbm9kZSl7XG4gICAgICAgICAgICBzZWxmLnJkbUNvbGxlY3Rpb24gPSBub2RlLnJkbUNvbGxlY3Rpb247XG5cbiAgICAgICAgICAgIHNlbGYuc3VibWl0KCdnZXRfY29sbGVjdGlvbl9sYW5ndWFnZXMnKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYucmRtQ29sbGVjdGlvbkxhbmd1YWdlcyhkYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5yZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uY2VwdE9sZExhbmcoZGF0YS5yZXN1bHRbMF0uaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25jZXB0TmV3TGFuZyhkYXRhLnJlc3VsdFswXS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFsZXJ0KFxuICAgICAgICAgICAgICAgICAgICBuZXcgSnNvbkVycm9yQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZXAtYWxlcnQtcmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5yZXNwb25zZUpTT05bXCJkYXRhXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCl7fVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvL3NlbGYucHJldmlld2luZyhmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9zZWxlY3Qgbm9kZXMgYW5kIHRha2UgdGhlIHNwZWNpZmljIHZhbHVlXG4gICAgdGhpcy5zZWxlY3RlZEdyYXBoLnN1YnNjcmliZSgoZ3JhcGhpZCkgPT4ge1xuICAgICAgICBzZWxmLmRyb3Bkb3dubm9kZXMucmVtb3ZlQWxsKCk7XG4gICAgICAgIHNlbGYuY29uY2VwdE5ldyh1bmRlZmluZWQpO1xuICAgICAgICBzZWxmLmNvbmNlcHRPbGQodW5kZWZpbmVkKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGUodW5kZWZpbmVkKTtcbiAgICAgICAgc2VsZi5zdWJtaXQoJ2dldF9ncmFwaHNfbm9kZScpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IGRhdGEucmVzdWx0Lm1hcChub2RlID0+IChcbiAgICAgICAgICAgICAgICB7ICAgbm9kZTogbm9kZS5ub2RlaWQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBgJHtKU09OLnBhcnNlKG5vZGUuY2FyZF9uYW1lKVthcmNoZXMuYWN0aXZlTGFuZ3VhZ2VdfSAtICR7SlNPTi5wYXJzZShub2RlLndpZGdldF9sYWJlbClbYXJjaGVzLmFjdGl2ZUxhbmd1YWdlXX1gLFxuICAgICAgICAgICAgICAgICAgICByZG1Db2xsZWN0aW9uOiBKU09OLnBhcnNlKG5vZGUuY29uZmlnKS5yZG1Db2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgc2VsZi5kcm9wZG93bm5vZGVzKG5vZGVzKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgc2VsZi5hbGVydChcbiAgICAgICAgICAgICAgICBuZXcgSnNvbkVycm9yQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICdlcC1hbGVydC1yZWQnLFxuICAgICAgICAgICAgICAgICAgICBlcnIucmVzcG9uc2VKU09OW1wiZGF0YVwiXSxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKXt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5wcmV2aWV3aW5nKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIC8vdGFrZSB0aGUgZ3JhcGhzIFxuICAgIHRoaXMuYWxsZ3JhcGggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5kcm9wZG93bmdyYXBoLnJlbW92ZUFsbCgpO1xuICAgICAgICBzZWxmLmRyb3Bkb3dubm9kZXMucmVtb3ZlQWxsKCk7XG4gICAgICAgIHNlbGYuc2hvd1ByZXZpZXcoZmFsc2UpO1xuXG4gICAgICAgIHNlbGYuc3VibWl0KCdnZXRfZ3JhcGhzJykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEucmVzdWx0LmZvckVhY2goZ3JhcGggPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJvcGRvd25ncmFwaC5wdXNoKHtcImdyYXBoTmFtZVwiOiBncmFwaC5uYW1lLCBcImdyYXBoaWRcIjogZ3JhcGguZ3JhcGhpZH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBzZWxmLmFsZXJ0KFxuICAgICAgICAgICAgICAgIG5ldyBKc29uRXJyb3JBbGVydFZpZXdNb2RlbChcbiAgICAgICAgICAgICAgICAgICAgJ2VwLWFsZXJ0LXJlZCcsXG4gICAgICAgICAgICAgICAgICAgIGVyci5yZXNwb25zZUpTT05bXCJkYXRhXCJdLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpe31cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnByZXZpZXdpbmcoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMud3JpdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFzZWxmLmFsbG93RWRpdE9wZXJhdGlvbigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zaG93UHJldmlldyhmYWxzZSk7XG4gICAgICAgIHBhcmFtcy5hY3RpdmVUYWIoXCJpbXBvcnRcIik7XG4gICAgICAgIHNlbGYuc3VibWl0KCd3cml0ZScpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIH0pLmZhaWwoIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgc2VsZi5hbGVydChcbiAgICAgICAgICAgICAgICBuZXcgSnNvbkVycm9yQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICdlcC1hbGVydC1yZWQnLFxuICAgICAgICAgICAgICAgICAgICBlcnIucmVzcG9uc2VKU09OW1wiZGF0YVwiXSxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKXt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc3VibWl0ID0gZnVuY3Rpb24oYWN0aW9uLCBkYXRhKSB7XG4gICAgICAgIHNlbGYuYWRkQWxsRm9ybURhdGEoKTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2FjdGlvbicsIGFjdGlvbik7XG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLmV0bF9tYW5hZ2VyLFxuICAgICAgICAgICAgZGF0YTogc2VsZi5mb3JtRGF0YSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmFsbGdyYXBoKCk7XG59O1xuXG4vLyBSZWdpc3RlciB0aGUgJ2J1bGtfZWRpdF9jb25jZXB0JyBjb21wb25lbnRcbmtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2J1bGtfZWRpdF9jb25jZXB0Jywge1xuICAgIHZpZXdNb2RlbDogVmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiBiYXNlU3RyaW5nRWRpdG9yVGVtcGxhdGUsXG59KTtcblxuLy8gQXBwbHkgYmluZGluZ3MgYWZ0ZXIgcmVnaXN0ZXJpbmcgdGhlIGNvbXBvbmVudFxuLy9rby5hcHBseUJpbmRpbmdzKG5ldyBWaWV3TW9kZWwoKSk7IC8vIFRoaXMgbWFrZXMgS25vY2tvdXQgZ2V0IHRvIHdvcmtcbmV4cG9ydCBkZWZhdWx0IFZpZXdNb2RlbDtcbiJdLCJuYW1lcyI6WyJrbyIsIiQiLCJ1dWlkIiwiYXJjaGVzIiwiSnNvbkVycm9yQWxlcnRWaWV3TW9kZWwiLCJiYXNlU3RyaW5nRWRpdG9yVGVtcGxhdGUiLCJWaWV3TW9kZWwiLCJwYXJhbXMiLCJfa28kdW53cmFwIiwiX3BhcmFtcyRsb2FkX2RldGFpbHMiLCJfdGhpcyRzZWxlY3RlZExvYWRFdmUiLCJzZWxmIiwiY29uZmlnIiwic3RhdGUiLCJlZGl0SGlzdG9yeVVybCIsImNvbmNhdCIsInVybHMiLCJlZGl0X2hpc3RvcnkiLCJ1bndyYXAiLCJzZWxlY3RlZExvYWRFdmVudCIsImxvYWRpZCIsImxvYWRfZGV0YWlscyIsImxvYWRJZCIsImdlbmVyYXRlIiwic2hvd1N0YXR1c0RldGFpbHMiLCJvYnNlcnZhYmxlIiwibW9kdWxlSWQiLCJldGxtb2R1bGVpZCIsInByZXZpZXdpbmciLCJmb3JtRGF0YSIsIndpbmRvdyIsIkZvcm1EYXRhIiwic2VhcmNoVXJsIiwiZHJvcGRvd25ub2RlcyIsIm9ic2VydmFibGVBcnJheSIsInNlbGVjdGVkTm9kZSIsImRyb3Bkb3duZ3JhcGgiLCJzZWxlY3RlZEdyYXBoIiwiY29uY2VwdE9sZCIsImNvbmNlcHROZXciLCJjb25jZXB0T2xkTGFuZyIsImNvbmNlcHROZXdMYW5nIiwicmRtQ29sbGVjdGlvbiIsInJkbUNvbGxlY3Rpb25MYW5ndWFnZXMiLCJzaG93UHJldmlldyIsImN1cnJlbnRQYWdlSW5kZXgiLCJ0aWxlc1RvUmVtb3ZlIiwibnVtYmVyT2ZUaWxlcyIsIm51bWJlck9mUmVzb3VyY2VzIiwicHJldmlld0xpbWl0IiwiZm9ybWF0VGltZSIsInN0YXR1c0RldGFpbHMiLCJsb2FkX2Rlc2NyaXB0aW9uIiwic3BsaXQiLCJ0aW1lRGlmZmVyZW5jZSIsImFsZXJ0IiwiYWRkQWxsRm9ybURhdGEiLCJhcHBlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwicHJldmlvdXNQYWdlIiwibmV4dFBhZ2UiLCJtYXhQYWdlSW5kZXgiLCJzdWJzY3JpYmUiLCJwYWdlSW5kZXgiLCJnZXRQcmV2aWV3RGF0YSIsImNvbXB1dGVkIiwiTWF0aCIsImNlaWwiLCJwYWdpbmF0ZWRSb3dzIiwiY29uc3RydWN0UmVwb3J0VXJsIiwiZGF0YUl0ZW0iLCJyZXBvcnRzIiwicmVzb3VyY2VpZCIsInJlYWR5IiwiY2xlYXJSZXN1bHRzIiwicmVtb3ZlQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJ0b1N0cmluZyIsImFsbG93RWRpdE9wZXJhdGlvbiIsImluVGlsZUxpc3QiLCJ0aWxlVG9GaW5kIiwidGlsZSIsImZpbmQiLCJ0aWxlaWQiLCJhZGRUb0xpc3QiLCJsaXN0IiwiU2V0IiwiX3RvQ29uc3VtYWJsZUFycmF5Iiwic3VibWl0IiwidGhlbiIsImRhdGEiLCJyZXN1bHQiLCJudW1iZXJfb2ZfcmVzb3VyY2VzIiwibnVtYmVyX29mX3RpbGVzIiwicHJldmlld19saW1pdCIsInZhbHVlcyIsImZhaWwiLCJlcnIiLCJyZXNwb25zZUpTT04iLCJhbHdheXMiLCJub2RlIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwic2V0VGltZW91dCIsImlkIiwiZ3JhcGhpZCIsIm5vZGVzIiwibWFwIiwibm9kZWlkIiwibGFiZWwiLCJwYXJzZSIsImNhcmRfbmFtZSIsImFjdGl2ZUxhbmd1YWdlIiwid2lkZ2V0X2xhYmVsIiwiYWxsZ3JhcGgiLCJncmFwaCIsInB1c2giLCJuYW1lIiwid3JpdGUiLCJhY3RpdmVUYWIiLCJhY3Rpb24iLCJhamF4IiwidHlwZSIsInVybCIsImV0bF9tYW5hZ2VyIiwiY2FjaGUiLCJwcm9jZXNzRGF0YSIsImNvbnRlbnRUeXBlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9