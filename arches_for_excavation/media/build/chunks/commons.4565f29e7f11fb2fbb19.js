"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[41018],{

/***/ 41018:
/*!*************************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/etl_modules/import-single-csv.js + 1 modules ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ import_single_csv)
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
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/strings.js
var strings = __webpack_require__(25476);
// EXTERNAL MODULE: ./node_modules/uuidjs/dist/uuid.core.js
var uuid_core = __webpack_require__(84806);
var uuid_core_default = /*#__PURE__*/__webpack_require__.n(uuid_core);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/alert-json.js
var alert_json = __webpack_require__(52139);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/etl_modules/import-single-csv.htm
const import_single_csv_namespaceObject = "templates/views/components/etl_modules/import-single-csv.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/simple-switch.js + 1 modules
var simple_switch = __webpack_require__(96613);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/datatable.js
var datatable = __webpack_require__(65863);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/dropzone.js
var dropzone = __webpack_require__(99152);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/resizable-sidepanel.js
var resizable_sidepanel = __webpack_require__(88428);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/etl_modules/import-single-csv.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }













var viewModel = function viewModel(params) {
  var _ko$unwrap;
  var self = this;
  this.loadDetails = params.load_details || knockout_latest_default().observable();
  this.state = params.state;
  this.loading = params.loading || knockout_latest_default().observable();
  this.alert = params.alert;
  this.moduleId = params.etlmoduleid;
  this.graphs = knockout_latest_default().observable();
  this.selectedGraph = knockout_latest_default().observable();
  this.nodes = knockout_latest_default().observable();
  this.fileInfo = knockout_latest_default().observable({
    name: "",
    size: ""
  });
  this.hasHeaders = knockout_latest_default().observable(true);
  this.csvArray = knockout_latest_default().observable();
  this.headers = knockout_latest_default().observable();
  this.fieldMapping = knockout_latest_default().observableArray();
  this.csvBody = knockout_latest_default().observable();
  this.csvExample = knockout_latest_default().observable();
  this.csvFileName = knockout_latest_default().observable();
  this.numberOfCol = knockout_latest_default().observable();
  this.numberOfRow = knockout_latest_default().observable();
  this.numberOfExampleRow = knockout_latest_default().observable();
  this.languages = knockout_latest_default().observableArray();
  this.languages(arches["default"].languages);
  this.fileAdded = knockout_latest_default().observable(false);
  this.validated = knockout_latest_default().observable();
  this.validationError = knockout_latest_default().observableArray();
  this.formData = new window.FormData();
  this.loadId = params.loadId || uuid_core_default().generate();
  this.uniqueId = uuid_core_default().generate();
  this.uniqueidClass = knockout_latest_default().computed(function () {
    return "unique_id_" + self.uniqueId;
  });
  this.selectedLoadEvent = params.selectedLoadEvent || knockout_latest_default().observable();
  this.editHistoryUrl = "".concat(arches["default"].urls.edit_history, "?transactionid=").concat((_ko$unwrap = knockout_latest_default().unwrap(params.selectedLoadEvent)) === null || _ko$unwrap === void 0 ? void 0 : _ko$unwrap.loadid);
  this.validationErrors = params.validationErrors || knockout_latest_default().observable();
  this.validated = params.validated || knockout_latest_default().observable();
  this.getErrorReport = params.getErrorReport;
  this.getNodeError = params.getNodeError;
  this.formatTime = params.formatTime;
  this.timeDifference = params.timeDifference;
  this.ready = knockout_latest_default().computed(function () {
    return self.selectedGraph() && self.fieldMapping().find(function (mapping) {
      return mapping.node();
    });
  });
  this.suggestField = function (i) {
    var bestMatch = null;
    var highestScore = 0;
    if (!!self.headers()) {
      var header = strings["default"].normalizeText(self.headers()[i]);
      if (header == 'resourceid') return null;
      self.nodes().forEach(function (node) {
        if (node.name) {
          var nameNorm = strings["default"].normalizeText(node.name);
          var aliasNorm = node.alias ? strings["default"].normalizeText(node.alias) : '';

          // Compute similarity scores
          var scoreWithName = strings["default"].compareTwoStrings(header, nameNorm);
          var scoreWithAlias = strings["default"].compareTwoStrings(header, aliasNorm);
          var bestNodeScore = Math.max(scoreWithName, scoreWithAlias);
          if (bestNodeScore > highestScore) {
            highestScore = bestNodeScore;
            bestMatch = node;
          }
        }
      });

      // Return the alias of the best match if the highest score is above a certain threshold (e.g., 0.8)
      if (bestMatch && highestScore > 0.5) {
        return bestMatch.alias;
      }
    }
    return null;
  };
  this.guessAllMappings = function () {
    if (self.headers()) {
      self.headers().forEach(function (header, i) {
        var bestMatchNode = self.suggestField(i);
        if (bestMatchNode && self.fieldMapping().length > i) {
          self.fieldMapping()[i].node(bestMatchNode);
        }
      });
    }
  };
  this.createTableConfig = function (col) {
    return {
      paging: false,
      searching: false,
      scrollCollapse: true,
      info: false,
      // columnDefs: [{
      //     orderable: false,
      //     targets: -1,
      // }],
      columns: Array(col).fill(null)
    };
  };
  this.hasHeaders.subscribe(function (val) {
    self.headers(null);
    if (val) {
      self.headers(self.csvArray()[0]);
      self.csvBody(self.csvArray().slice(1));
    } else {
      self.headers(Array.apply(0, Array(self.csvArray()[0].length)).map(function (_, b) {
        return b + 1;
      }));
      self.csvBody(self.csvArray());
    }
  });
  this.headers.subscribe(function (headers) {
    if (headers) {
      self.fieldMapping(headers.map(function (header) {
        return {
          field: header,
          node: knockout_latest_default().observable(),
          language: knockout_latest_default().observable(arches["default"].languages.find(function (lang) {
            return lang.code == arches["default"].activeLanguage;
          }))
        };
      }));
    }
  });
  this.formatSize = function (size) {
    var bytes = size;
    if (bytes == 0) return '0 Byte';
    var k = 1024;
    var dm = 2;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return '<strong>' + parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '</strong> ' + sizes[i];
  };
  this.csvArray.subscribe(function (val) {
    self.numberOfCol(val[0].length);
    if (self.hasHeaders()) {
      self.headers(val[0]);
      self.csvBody(val.slice(1));
    } else {
      self.headers(null);
      self.csvBody(val);
    }
  });
  this.selectedGraph.subscribe(function (graph) {
    if (!graph) {
      self.nodes(null);
    }
  });
  this.csvBody.subscribe(function (val) {
    self.numberOfRow(val.length);
    self.csvExample(val.slice(0, 5));
  });
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
  this.selectedGraph.subscribe(function (graph) {
    if (graph) {
      self.loading(true);
      self.formData.append('graphid', graph);
      self.submit('get_nodes').then(function (response) {
        var nodes = response.result.map(function (node) {
          return _objectSpread(_objectSpread({}, node), {}, {
            label: node.alias
          });
        });
        self.stringNodes = nodes.reduce(function (acc, node) {
          if (node.datatype === 'string') {
            acc.push(node.alias);
          }
          return acc;
        }, []);
        nodes.unshift({
          alias: "resourceid",
          label: arches["default"].translations.idColumnSelection
        });
        self.nodes(nodes);
        self.loading(false);
      });
    }
  });
  this.addFile = function (file) {
    self.loading(true);
    self.fileInfo({
      name: file.name,
      size: file.size
    });
    self.formData.append('file', file, file.name);
    self.submit('read').then(function (response) {
      self.csvArray(response.result.csv);
      self.csvFileName(response.result.csv_file);
      if (response.result.config) {
        self.fieldMapping(response.result.config.mapping);
        self.selectedGraph(response.result.config.graph);
      }
      self.formData.delete('file');
      self.fileAdded(true);
      self.loading(false);
    }).fail(function (err) {
      console.log(err);
      self.alert(new alert_json["default"]('ep-alert-red', err.responseJSON, null, function () {}));
      self.loading(false);
    });
  };
  this.write = function () {
    if (!self.ready()) {
      return;
    }
    var fieldnames = knockout_mapping_min_default().toJS(self.fieldMapping).map(function (fieldname) {
      return fieldname.node;
    });
    var fieldMapping = knockout_mapping_min_default().toJS(self.fieldMapping);
    self.formData.append('fieldnames', fieldnames);
    self.formData.append('fieldMapping', JSON.stringify(fieldMapping));
    self.formData.append('hasHeaders', self.hasHeaders());
    self.formData.append('graphid', self.selectedGraph());
    self.formData.append('csvFileName', self.csvFileName());
    self.loading(true);
    self.submit('start').then(function (data) {
      params.activeTab("import");
      self.formData.append('async', true);
      self.submit('write').then(function (data) {
        console.log(data.result);
      }).fail(function (err) {
        console.log(err);
        self.alert(new alert_json["default"]('ep-alert-red', err.responseJSON["data"], null, function () {}));
      }).always(function () {
        self.loading(false);
      });
    }).fail(function (error) {
      return console.log(error.responseJSON.data);
    });
  };
  this.validate = function () {
    self.validated(false);
    var fieldnames = knockout_mapping_min_default().toJS(self.fieldMapping).map(function (fieldname) {
      return fieldname.node;
    });
    var fieldMapping = knockout_mapping_min_default().toJS(self.fieldMapping);
    self.formData.append('fieldnames', fieldnames);
    self.formData.append('fieldMapping', JSON.stringify(fieldMapping));
    self.formData.append('hasHeaders', self.hasHeaders());
    self.formData.append('graphid', self.selectedGraph());
    self.submit('validate').then(function (data) {
      self.validated(true);
      self.validationError(data.result);
    }).fail(function (error) {
      return console.log(error);
    });
  };
  this.submit = function (action) {
    self.formData.append('action', action);
    self.formData.append('load_id', self.loadId);
    self.formData.append('module', self.moduleId);
    return jquery_min_default().ajax({
      type: "POST",
      url: arches["default"].urls.etl_manager,
      data: self.formData,
      cache: false,
      processData: false,
      contentType: false
    });
  };
  this.dropzoneOptions = {
    url: "arches.urls.root",
    dictDefaultMessage: '',
    autoProcessQueue: false,
    uploadMultiple: false,
    // acceptedFiles: ["text/csv"],
    autoQueue: false,
    clickable: ".fileinput-button." + this.uniqueidClass(),
    previewsContainer: '#hidden-dz-previews',
    init: function init() {
      self.dropzone = this;
      this.on("addedfile", self.addFile);
      this.on("error", function (file, error) {
        file.error = error;
      });
    }
  };
  this.init = function () {
    this.getGraphs();
  };
  this.init();
};
knockout_latest_default().components.register('import-single-csv', {
  viewModel: viewModel,
  template: import_single_csv_namespaceObject
});
/* harmony default export */ const import_single_csv = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNDU2NWYyOWU3ZjExZmIyZmJiMTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ2U7QUFDbEI7QUFDUztBQUNRO0FBQ2hCO0FBQ0k7QUFDZ0M7QUFDdUM7QUFDM0Q7QUFDWjtBQUNEO0FBQ1c7QUFHdEMsSUFBTVMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQVlDLE1BQU0sRUFBRTtFQUFBLElBQUFDLFVBQUE7RUFDL0IsSUFBTUMsSUFBSSxHQUFHLElBQUk7RUFDakIsSUFBSSxDQUFDQyxXQUFXLEdBQUdILE1BQU0sQ0FBQ0ksWUFBWSxJQUFJZCxvQ0FBYSxDQUFDLENBQUM7RUFDekQsSUFBSSxDQUFDZ0IsS0FBSyxHQUFHTixNQUFNLENBQUNNLEtBQUs7RUFDekIsSUFBSSxDQUFDQyxPQUFPLEdBQUdQLE1BQU0sQ0FBQ08sT0FBTyxJQUFJakIsb0NBQWEsQ0FBQyxDQUFDO0VBQ2hELElBQUksQ0FBQ2tCLEtBQUssR0FBR1IsTUFBTSxDQUFDUSxLQUFLO0VBQ3pCLElBQUksQ0FBQ0MsUUFBUSxHQUFHVCxNQUFNLENBQUNVLFdBQVc7RUFDbEMsSUFBSSxDQUFDQyxNQUFNLEdBQUdyQixvQ0FBYSxDQUFDLENBQUM7RUFDN0IsSUFBSSxDQUFDc0IsYUFBYSxHQUFHdEIsb0NBQWEsQ0FBQyxDQUFDO0VBQ3BDLElBQUksQ0FBQ3VCLEtBQUssR0FBR3ZCLG9DQUFhLENBQUMsQ0FBQztFQUM1QixJQUFJLENBQUN3QixRQUFRLEdBQUd4QixvQ0FBYSxDQUFDO0lBQUN5QixJQUFJLEVBQUMsRUFBRTtJQUFFQyxJQUFJLEVBQUM7RUFBRSxDQUFDLENBQUM7RUFDakQsSUFBSSxDQUFDQyxVQUFVLEdBQUczQixvQ0FBYSxDQUFDLElBQUksQ0FBQztFQUNyQyxJQUFJLENBQUM0QixRQUFRLEdBQUc1QixvQ0FBYSxDQUFDLENBQUM7RUFDL0IsSUFBSSxDQUFD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Q3BCd0ssUUFBUSxFQUFFekssaUNBQXVCQTtBQUNyQyxDQUFDLENBQUM7QUFDRix3REFBZUMsU0FBUyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9ldGxfbW9kdWxlcy9pbXBvcnQtc2luZ2xlLWNzdi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSBcImtub2Nrb3V0XCI7XG5pbXBvcnQga29NYXBwaW5nIGZyb20gXCJrbm9ja291dC1tYXBwaW5nXCI7XG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgZHJvcHpvbmUgZnJvbSBcImRyb3B6b25lXCI7XG5pbXBvcnQgc3RyaW5nVXRpbHMgZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcbmltcG9ydCB1dWlkIGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgYXJjaGVzIGZyb20gXCJhcmNoZXNcIjtcbmltcG9ydCBKc29uRXJyb3JBbGVydFZpZXdNb2RlbCBmcm9tIFwidmlld21vZGVscy9hbGVydC1qc29uXCI7XG5pbXBvcnQgaW1wb3J0U2luZ2xlQ1NWVGVtcGxhdGUgZnJvbSBcInRlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2V0bF9tb2R1bGVzL2ltcG9ydC1zaW5nbGUtY3N2Lmh0bVwiO1xuaW1wb3J0IFwidmlld3MvY29tcG9uZW50cy9zaW1wbGUtc3dpdGNoXCI7XG5pbXBvcnQgXCJiaW5kaW5ncy9kYXRhdGFibGVcIjtcbmltcG9ydCBcImJpbmRpbmdzL2Ryb3B6b25lXCI7XG5pbXBvcnQgXCJiaW5kaW5ncy9yZXNpemFibGUtc2lkZXBhbmVsXCI7XG5cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5sb2FkRGV0YWlscyA9IHBhcmFtcy5sb2FkX2RldGFpbHMgfHwga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc3RhdGUgPSBwYXJhbXMuc3RhdGU7XG4gICAgdGhpcy5sb2FkaW5nID0gcGFyYW1zLmxvYWRpbmcgfHwga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuYWxlcnQgPSBwYXJhbXMuYWxlcnQ7XG4gICAgdGhpcy5tb2R1bGVJZCA9IHBhcmFtcy5ldGxtb2R1bGVpZDtcbiAgICB0aGlzLmdyYXBocyA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLnNlbGVjdGVkR3JhcGggPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5ub2RlcyA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmZpbGVJbmZvID0ga28ub2JzZXJ2YWJsZSh7bmFtZTpcIlwiLCBzaXplOlwiXCJ9KTtcbiAgICB0aGlzLmhhc0hlYWRlcnMgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xuICAgIHRoaXMuY3N2QXJyYXkgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5oZWFkZXJzID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZmllbGRNYXBwaW5nID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgdGhpcy5jc3ZCb2R5ID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuY3N2RXhhbXBsZSA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmNzdkZpbGVOYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMubnVtYmVyT2ZDb2wgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5udW1iZXJPZlJvdyA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLm51bWJlck9mRXhhbXBsZVJvdyA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmxhbmd1YWdlcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIHRoaXMubGFuZ3VhZ2VzKGFyY2hlcy5sYW5ndWFnZXMpO1xuICAgIHRoaXMuZmlsZUFkZGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy52YWxpZGF0ZWQgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy52YWxpZGF0aW9uRXJyb3IgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB0aGlzLmZvcm1EYXRhID0gbmV3IHdpbmRvdy5Gb3JtRGF0YSgpO1xuICAgIHRoaXMubG9hZElkID0gcGFyYW1zLmxvYWRJZCB8fCB1dWlkLmdlbmVyYXRlKCk7XG4gICAgdGhpcy51bmlxdWVJZCA9IHV1aWQuZ2VuZXJhdGUoKTtcbiAgICB0aGlzLnVuaXF1ZWlkQ2xhc3MgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwidW5pcXVlX2lkX1wiICsgc2VsZi51bmlxdWVJZDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2VsZWN0ZWRMb2FkRXZlbnQgPSBwYXJhbXMuc2VsZWN0ZWRMb2FkRXZlbnQgfHwga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZWRpdEhpc3RvcnlVcmwgPSBgJHthcmNoZXMudXJscy5lZGl0X2hpc3Rvcnl9P3RyYW5zYWN0aW9uaWQ9JHtrby51bndyYXAocGFyYW1zLnNlbGVjdGVkTG9hZEV2ZW50KT8ubG9hZGlkfWA7XG4gICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzID0gcGFyYW1zLnZhbGlkYXRpb25FcnJvcnMgfHwga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMudmFsaWRhdGVkID0gcGFyYW1zLnZhbGlkYXRlZCB8fCBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5nZXRFcnJvclJlcG9ydCA9IHBhcmFtcy5nZXRFcnJvclJlcG9ydDtcbiAgICB0aGlzLmdldE5vZGVFcnJvciA9IHBhcmFtcy5nZXROb2RlRXJyb3I7XG4gICAgdGhpcy5mb3JtYXRUaW1lID0gcGFyYW1zLmZvcm1hdFRpbWU7XG4gICAgdGhpcy50aW1lRGlmZmVyZW5jZSA9IHBhcmFtcy50aW1lRGlmZmVyZW5jZTtcbiAgICB0aGlzLnJlYWR5ID0ga28uY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gc2VsZi5zZWxlY3RlZEdyYXBoKCkgJiYgc2VsZi5maWVsZE1hcHBpbmcoKS5maW5kKChtYXBwaW5nKSA9PiBtYXBwaW5nLm5vZGUoKSk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWdnZXN0RmllbGQgPSBmdW5jdGlvbihpKSB7XG4gICAgICAgIGxldCBiZXN0TWF0Y2ggPSBudWxsO1xuICAgICAgICBsZXQgaGlnaGVzdFNjb3JlID0gMDtcbiAgICAgICAgaWYgKCEhc2VsZi5oZWFkZXJzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHN0cmluZ1V0aWxzLm5vcm1hbGl6ZVRleHQoc2VsZi5oZWFkZXJzKClbaV0pO1xuICAgICAgICAgICAgaWYgKGhlYWRlciA9PSAncmVzb3VyY2VpZCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgXG4gICAgICAgICAgICBzZWxmLm5vZGVzKCkuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lTm9ybSA9IHN0cmluZ1V0aWxzLm5vcm1hbGl6ZVRleHQobm9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxpYXNOb3JtID0gbm9kZS5hbGlhcyA/IHN0cmluZ1V0aWxzLm5vcm1hbGl6ZVRleHQobm9kZS5hbGlhcykgOiAnJztcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tcHV0ZSBzaW1pbGFyaXR5IHNjb3Jlc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY29yZVdpdGhOYW1lID0gc3RyaW5nVXRpbHMuY29tcGFyZVR3b1N0cmluZ3MoaGVhZGVyLCBuYW1lTm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlV2l0aEFsaWFzID0gc3RyaW5nVXRpbHMuY29tcGFyZVR3b1N0cmluZ3MoaGVhZGVyLCBhbGlhc05vcm0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiZXN0Tm9kZVNjb3JlID0gTWF0aC5tYXgoc2NvcmVXaXRoTmFtZSwgc2NvcmVXaXRoQWxpYXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdE5vZGVTY29yZSA+IGhpZ2hlc3RTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFNjb3JlID0gYmVzdE5vZGVTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgYWxpYXMgb2YgdGhlIGJlc3QgbWF0Y2ggaWYgdGhlIGhpZ2hlc3Qgc2NvcmUgaXMgYWJvdmUgYSBjZXJ0YWluIHRocmVzaG9sZCAoZS5nLiwgMC44KVxuICAgICAgICAgICAgaWYgKGJlc3RNYXRjaCAmJiBoaWdoZXN0U2NvcmUgPiAwLjUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoLmFsaWFzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB0aGlzLmd1ZXNzQWxsTWFwcGluZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNlbGYuaGVhZGVycygpKSB7XG4gICAgICAgICAgICBzZWxmLmhlYWRlcnMoKS5mb3JFYWNoKChoZWFkZXIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBiZXN0TWF0Y2hOb2RlID0gc2VsZi5zdWdnZXN0RmllbGQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaE5vZGUgJiYgc2VsZi5maWVsZE1hcHBpbmcoKS5sZW5ndGggPiBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmllbGRNYXBwaW5nKClbaV0ubm9kZShiZXN0TWF0Y2hOb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZVRhYmxlQ29uZmlnID0gZnVuY3Rpb24oY29sKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYWdpbmc6IGZhbHNlLFxuICAgICAgICAgICAgc2VhcmNoaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHNjcm9sbENvbGxhcHNlOiB0cnVlLFxuICAgICAgICAgICAgaW5mbzogZmFsc2UsXG4gICAgICAgICAgICAvLyBjb2x1bW5EZWZzOiBbe1xuICAgICAgICAgICAgLy8gICAgIG9yZGVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAvLyAgICAgdGFyZ2V0czogLTEsXG4gICAgICAgICAgICAvLyB9XSxcbiAgICAgICAgICAgIGNvbHVtbnM6IEFycmF5KGNvbCkuZmlsbChudWxsKVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB0aGlzLmhhc0hlYWRlcnMuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgIHNlbGYuaGVhZGVycyhudWxsKTtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgc2VsZi5oZWFkZXJzKHNlbGYuY3N2QXJyYXkoKVswXSk7XG4gICAgICAgICAgICBzZWxmLmNzdkJvZHkoc2VsZi5jc3ZBcnJheSgpLnNsaWNlKDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuaGVhZGVycyhBcnJheS5hcHBseSgwLCBBcnJheShzZWxmLmNzdkFycmF5KClbMF0ubGVuZ3RoKSkubWFwKGZ1bmN0aW9uKF8sYikgeyByZXR1cm4gYiArIDE7IH0pKTtcbiAgICAgICAgICAgIHNlbGYuY3N2Qm9keShzZWxmLmNzdkFycmF5KCkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmhlYWRlcnMuc3Vic2NyaWJlKGZ1bmN0aW9uKGhlYWRlcnMpe1xuICAgICAgICBpZiAoaGVhZGVycykge1xuICAgICAgICAgICAgc2VsZi5maWVsZE1hcHBpbmcoXG4gICAgICAgICAgICAgICAgaGVhZGVycy5tYXAoZnVuY3Rpb24oaGVhZGVyKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBoZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBrby5vYnNlcnZhYmxlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZToga28ub2JzZXJ2YWJsZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmNoZXMubGFuZ3VhZ2VzLmZpbmQobGFuZyA9PiBsYW5nLmNvZGUgPT0gYXJjaGVzLmFjdGl2ZUxhbmd1YWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JtYXRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB2YXIgYnl0ZXMgPSBzaXplO1xuICAgICAgICBpZihieXRlcyA9PSAwKSByZXR1cm4gJzAgQnl0ZSc7XG4gICAgICAgIHZhciBrID0gMTAyNDtcbiAgICAgICAgdmFyIGRtID0gMjtcbiAgICAgICAgdmFyIHNpemVzID0gWydCeXRlcycsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddO1xuICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coaykpO1xuICAgICAgICByZXR1cm4gJzxzdHJvbmc+JyArIHBhcnNlRmxvYXQoKGJ5dGVzIC8gTWF0aC5wb3coaywgaSkpLnRvRml4ZWQoZG0pKSArICc8L3N0cm9uZz4gJyArIHNpemVzW2ldO1xuICAgIH07XG5cbiAgICB0aGlzLmNzdkFycmF5LnN1YnNjcmliZShmdW5jdGlvbih2YWwpe1xuICAgICAgICBzZWxmLm51bWJlck9mQ29sKHZhbFswXS5sZW5ndGgpO1xuICAgICAgICBpZiAoc2VsZi5oYXNIZWFkZXJzKCkpIHtcbiAgICAgICAgICAgIHNlbGYuaGVhZGVycyh2YWxbMF0pO1xuICAgICAgICAgICAgc2VsZi5jc3ZCb2R5KHZhbC5zbGljZSgxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmhlYWRlcnMobnVsbCk7XG4gICAgICAgICAgICBzZWxmLmNzdkJvZHkodmFsKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3RlZEdyYXBoLnN1YnNjcmliZShncmFwaCA9PiB7XG4gICAgICAgIGlmICghZ3JhcGgpIHtzZWxmLm5vZGVzKG51bGwpO31cbiAgICB9KTtcblxuICAgIHRoaXMuY3N2Qm9keS5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgc2VsZi5udW1iZXJPZlJvdyh2YWwubGVuZ3RoKTtcbiAgICAgICAgc2VsZi5jc3ZFeGFtcGxlKHZhbC5zbGljZSgwLCA1KSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdldEdyYXBocyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlbGYubG9hZGluZyh0cnVlKTtcbiAgICAgICAgc2VsZi5zdWJtaXQoJ2dldF9ncmFwaHMnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgIHNlbGYuZ3JhcGhzKHJlc3BvbnNlLnJlc3VsdCk7XG4gICAgICAgICAgICBzZWxmLmxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRHcmFwaE5hbWUgPSBmdW5jdGlvbihncmFwaElkKXtcbiAgICAgICAgbGV0IGdyYXBoO1xuICAgICAgICBpZiAoc2VsZi5ncmFwaHMoKSkge1xuICAgICAgICAgICAgZ3JhcGggPSBzZWxmLmdyYXBocygpLmZpbmQoZnVuY3Rpb24oZ3JhcGgpe1xuICAgICAgICAgICAgICAgIHJldHVybiBncmFwaC5ncmFwaGlkID09IGdyYXBoSWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JhcGg/Lm5hbWU7XG4gICAgfTtcblxuICAgIHRoaXMuc2VsZWN0ZWRHcmFwaC5zdWJzY3JpYmUoZnVuY3Rpb24oZ3JhcGgpe1xuICAgICAgICBpZiAoZ3JhcGgpe1xuICAgICAgICAgICAgc2VsZi5sb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2dyYXBoaWQnLCBncmFwaCk7XG4gICAgICAgICAgICBzZWxmLnN1Ym1pdCgnZ2V0X25vZGVzJykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSByZXNwb25zZS5yZXN1bHQubWFwKG5vZGUgPT4gKHsgLi4ubm9kZSwgbGFiZWw6IG5vZGUuYWxpYXMgfSkpO1xuICAgICAgICAgICAgICAgIHNlbGYuc3RyaW5nTm9kZXMgPSBub2Rlcy5yZWR1Y2UoKGFjYywgbm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5kYXRhdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5wdXNoKG5vZGUuYWxpYXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgfSwgW10pO1xuICAgICAgICAgICAgICAgIG5vZGVzLnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgICAgICBhbGlhczogXCJyZXNvdXJjZWlkXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBhcmNoZXMudHJhbnNsYXRpb25zLmlkQ29sdW1uU2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZXMobm9kZXMpO1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRGaWxlID0gZnVuY3Rpb24oZmlsZSl7XG4gICAgICAgIHNlbGYubG9hZGluZyh0cnVlKTtcbiAgICAgICAgc2VsZi5maWxlSW5mbyh7bmFtZTogZmlsZS5uYW1lLCBzaXplOiBmaWxlLnNpemV9KTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgICAgICBzZWxmLnN1Ym1pdCgncmVhZCcpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgc2VsZi5jc3ZBcnJheShyZXNwb25zZS5yZXN1bHQuY3N2KTtcbiAgICAgICAgICAgIHNlbGYuY3N2RmlsZU5hbWUocmVzcG9uc2UucmVzdWx0LmNzdl9maWxlKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXN1bHQuY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5maWVsZE1hcHBpbmcocmVzcG9uc2UucmVzdWx0LmNvbmZpZy5tYXBwaW5nKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkR3JhcGgocmVzcG9uc2UucmVzdWx0LmNvbmZpZy5ncmFwaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnZmlsZScpO1xuICAgICAgICAgICAgc2VsZi5maWxlQWRkZWQodHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLmxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIHNlbGYuYWxlcnQobmV3IEpzb25FcnJvckFsZXJ0Vmlld01vZGVsKCdlcC1hbGVydC1yZWQnLCBlcnIucmVzcG9uc2VKU09OLCBudWxsLCBmdW5jdGlvbigpe30pKTtcbiAgICAgICAgICAgIHNlbGYubG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLndyaXRlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKCFzZWxmLnJlYWR5KCkpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IGZpZWxkbmFtZXMgPSBrb01hcHBpbmcudG9KUyhzZWxmLmZpZWxkTWFwcGluZykubWFwKGZpZWxkbmFtZSA9PiB7cmV0dXJuIGZpZWxkbmFtZS5ub2RlO30pO1xuICAgICAgICBjb25zdCBmaWVsZE1hcHBpbmcgPSBrb01hcHBpbmcudG9KUyhzZWxmLmZpZWxkTWFwcGluZyk7XG4gICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdmaWVsZG5hbWVzJywgZmllbGRuYW1lcyk7XG4gICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdmaWVsZE1hcHBpbmcnLCBKU09OLnN0cmluZ2lmeShmaWVsZE1hcHBpbmcpKTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2hhc0hlYWRlcnMnLCBzZWxmLmhhc0hlYWRlcnMoKSk7XG4gICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdncmFwaGlkJywgc2VsZi5zZWxlY3RlZEdyYXBoKCkpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnY3N2RmlsZU5hbWUnLCBzZWxmLmNzdkZpbGVOYW1lKCkpO1xuICAgICAgICBzZWxmLmxvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHNlbGYuc3VibWl0KCdzdGFydCcpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBwYXJhbXMuYWN0aXZlVGFiKFwiaW1wb3J0XCIpO1xuICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2FzeW5jJywgdHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLnN1Ym1pdCgnd3JpdGUnKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEucmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmZhaWwoIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgc2VsZi5hbGVydChcbiAgICAgICAgICAgICAgICAgICAgbmV3IEpzb25FcnJvckFsZXJ0Vmlld01vZGVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2VwLWFsZXJ0LXJlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIucmVzcG9uc2VKU09OW1wiZGF0YVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpe31cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuZmFpbChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvci5yZXNwb25zZUpTT04uZGF0YSkpO1xuICAgIH07XG5cbiAgICB0aGlzLnZhbGlkYXRlID1mdW5jdGlvbigpe1xuICAgICAgICBzZWxmLnZhbGlkYXRlZChmYWxzZSk7XG4gICAgICAgIGNvbnN0IGZpZWxkbmFtZXMgPSBrb01hcHBpbmcudG9KUyhzZWxmLmZpZWxkTWFwcGluZykubWFwKGZpZWxkbmFtZSA9PiBmaWVsZG5hbWUubm9kZSk7XG4gICAgICAgIGNvbnN0IGZpZWxkTWFwcGluZyA9IGtvTWFwcGluZy50b0pTKHNlbGYuZmllbGRNYXBwaW5nKTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2ZpZWxkbmFtZXMnLCBmaWVsZG5hbWVzKTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2ZpZWxkTWFwcGluZycsIEpTT04uc3RyaW5naWZ5KGZpZWxkTWFwcGluZykpO1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnaGFzSGVhZGVycycsIHNlbGYuaGFzSGVhZGVycygpKTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2dyYXBoaWQnLCBzZWxmLnNlbGVjdGVkR3JhcGgoKSk7XG4gICAgICAgIHNlbGYuc3VibWl0KCd2YWxpZGF0ZScpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLnZhbGlkYXRlZCh0cnVlKTtcbiAgICAgICAgICAgIHNlbGYudmFsaWRhdGlvbkVycm9yKGRhdGEucmVzdWx0KTtcbiAgICAgICAgfSkuZmFpbChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuICAgIH07XG5cbiAgICB0aGlzLnN1Ym1pdCA9IGZ1bmN0aW9uKGFjdGlvbikge1xuICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnYWN0aW9uJywgYWN0aW9uKTtcbiAgICAgICAgc2VsZi5mb3JtRGF0YS5hcHBlbmQoJ2xvYWRfaWQnLCBzZWxmLmxvYWRJZCk7XG4gICAgICAgIHNlbGYuZm9ybURhdGEuYXBwZW5kKCdtb2R1bGUnLCBzZWxmLm1vZHVsZUlkKTtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogYXJjaGVzLnVybHMuZXRsX21hbmFnZXIsXG4gICAgICAgICAgICBkYXRhOiBzZWxmLmZvcm1EYXRhLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kcm9wem9uZU9wdGlvbnMgPSB7XG4gICAgICAgIHVybDogXCJhcmNoZXMudXJscy5yb290XCIsXG4gICAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXG4gICAgICAgIGF1dG9Qcm9jZXNzUXVldWU6IGZhbHNlLFxuICAgICAgICB1cGxvYWRNdWx0aXBsZTogZmFsc2UsXG4gICAgICAgIC8vIGFjY2VwdGVkRmlsZXM6IFtcInRleHQvY3N2XCJdLFxuICAgICAgICBhdXRvUXVldWU6IGZhbHNlLFxuICAgICAgICBjbGlja2FibGU6IFwiLmZpbGVpbnB1dC1idXR0b24uXCIgKyB0aGlzLnVuaXF1ZWlkQ2xhc3MoKSxcbiAgICAgICAgcHJldmlld3NDb250YWluZXI6ICcjaGlkZGVuLWR6LXByZXZpZXdzJyxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmRyb3B6b25lID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub24oXCJhZGRlZGZpbGVcIiwgc2VsZi5hZGRGaWxlKTtcbiAgICAgICAgICAgIHRoaXMub24oXCJlcnJvclwiLCBmdW5jdGlvbihmaWxlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgIGZpbGUuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmdldEdyYXBocygpO1xuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbn07XG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKCdpbXBvcnQtc2luZ2xlLWNzdicsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogaW1wb3J0U2luZ2xlQ1NWVGVtcGxhdGUsXG59KTtcbmV4cG9ydCBkZWZhdWx0IHZpZXdNb2RlbDtcbiJdLCJuYW1lcyI6WyJrbyIsImtvTWFwcGluZyIsIiQiLCJkcm9wem9uZSIsInN0cmluZ1V0aWxzIiwidXVpZCIsImFyY2hlcyIsIkpzb25FcnJvckFsZXJ0Vmlld01vZGVsIiwiaW1wb3J0U2luZ2xlQ1NWVGVtcGxhdGUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJfa28kdW53cmFwIiwic2VsZiIsImxvYWREZXRhaWxzIiwibG9hZF9kZXRhaWxzIiwib2JzZXJ2YWJsZSIsInN0YXRlIiwibG9hZGluZyIsImFsZXJ0IiwibW9kdWxlSWQiLCJldGxtb2R1bGVpZCIsImdyYXBocyIsInNlbGVjdGVkR3JhcGgiLCJub2RlcyIsImZpbGVJbmZvIiwibmFtZSIsInNpemUiLCJoYXNIZWFkZXJzIiwiY3N2QXJyYXkiLCJoZWFkZXJzIiwiZmllbGRNYXBwaW5nIiwib2JzZXJ2YWJsZUFycmF5IiwiY3N2Qm9keSIsImNzdkV4YW1wbGUiLCJjc3ZGaWxlTmFtZSIsIm51bWJlck9mQ29sIiwibnVtYmVyT2ZSb3ciLCJudW1iZXJPZkV4YW1wbGVSb3ciLCJsYW5ndWFnZXMiLCJmaWxlQWRkZWQiLCJ2YWxpZGF0ZWQiLCJ2YWxpZGF0aW9uRXJyb3IiLCJmb3JtRGF0YSIsIndpbmRvdyIsIkZvcm1EYXRhIiwibG9hZElkIiwiZ2VuZXJhdGUiLCJ1bmlxdWVJZCIsInVuaXF1ZWlkQ2xhc3MiLCJjb21wdXRlZCIsInNlbGVjdGVkTG9hZEV2ZW50IiwiZWRpdEhpc3RvcnlVcmwiLCJjb25jYXQiLCJ1cmxzIiwiZWRpdF9oaXN0b3J5IiwidW53cmFwIiwibG9hZGlkIiwidmFsaWRhdGlvbkVycm9ycyIsImdldEVycm9yUmVwb3J0IiwiZ2V0Tm9kZUVycm9yIiwiZm9ybWF0VGltZSIsInRpbWVEaWZmZXJlbmNlIiwicmVhZHkiLCJmaW5kIiwibWFwcGluZyIsIm5vZGUiLCJzdWdnZXN0RmllbGQiLCJpIiwiYmVzdE1hdGNoIiwiaGlnaGVzdFNjb3JlIiwiaGVhZGVyIiwibm9ybWFsaXplVGV4dCIsImZvckVhY2giLCJuYW1lTm9ybSIsImFsaWFzTm9ybSIsImFsaWFzIiwic2NvcmVXaXRoTmFtZSIsImNvbXBhcmVUd29TdHJpbmdzIiwic2NvcmVXaXRoQWxpYXMiLCJiZXN0Tm9kZVNjb3JlIiwiTWF0aCIsIm1heCIsImd1ZXNzQWxsTWFwcGluZ3MiLCJiZXN0TWF0Y2hOb2RlIiwibGVuZ3RoIiwiY3JlYXRlVGFibGVDb25maWciLCJjb2wiLCJwYWdpbmciLCJzZWFyY2hpbmciLCJzY3JvbGxDb2xsYXBzZSIsImluZm8iLCJjb2x1bW5zIiwiQXJyYXkiLCJmaWxsIiwic3Vic2NyaWJlIiwidmFsIiwic2xpY2UiLCJhcHBseSIsIm1hcCIsIl8iLCJiIiwiZmllbGQiLCJsYW5ndWFnZSIsImxhbmciLCJjb2RlIiwiYWN0aXZlTGFuZ3VhZ2UiLCJmb3JtYXRTaXplIiwiYnl0ZXMiLCJrIiwiZG0iLCJzaXplcyIsImZsb29yIiwibG9nIiwicGFyc2VGbG9hdCIsInBvdyIsInRvRml4ZWQiLCJncmFwaCIsImdldEdyYXBocyIsInN1Ym1pdCIsInRoZW4iLCJyZXNwb25zZSIsInJlc3VsdCIsImdldEdyYXBoTmFtZSIsImdyYXBoSWQiLCJfZ3JhcGgiLCJncmFwaGlkIiwiYXBwZW5kIiwiX29iamVjdFNwcmVhZCIsImxhYmVsIiwic3RyaW5nTm9kZXMiLCJyZWR1Y2UiLCJhY2MiLCJkYXRhdHlwZSIsInB1c2giLCJ1bnNoaWZ0IiwidHJhbnNsYXRpb25zIiwiaWRDb2x1bW5TZWxlY3Rpb24iLCJhZGRGaWxlIiwiZmlsZSIsImNzdiIsImNzdl9maWxlIiwiY29uZmlnIiwiZGVsZXRlIiwiZmFpbCIsImVyciIsImNvbnNvbGUiLCJyZXNwb25zZUpTT04iLCJ3cml0ZSIsImZpZWxkbmFtZXMiLCJ0b0pTIiwiZmllbGRuYW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGEiLCJhY3RpdmVUYWIiLCJhbHdheXMiLCJlcnJvciIsInZhbGlkYXRlIiwiYWN0aW9uIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJldGxfbWFuYWdlciIsImNhY2hlIiwicHJvY2Vzc0RhdGEiLCJjb250ZW50VHlwZSIsImRyb3B6b25lT3B0aW9ucyIsImRpY3REZWZhdWx0TWVzc2FnZSIsImF1dG9Qcm9jZXNzUXVldWUiLCJ1cGxvYWRNdWx0aXBsZSIsImF1dG9RdWV1ZSIsImNsaWNrYWJsZSIsInByZXZpZXdzQ29udGFpbmVyIiwiaW5pdCIsIm9uIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==