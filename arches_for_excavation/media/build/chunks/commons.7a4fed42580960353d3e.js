"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[34808],{

/***/ 34808:
/*!*****************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/search-results.js + 1 modules ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ search_results)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/base-filter.js
var base_filter = __webpack_require__(76713);
// EXTERNAL MODULE: ./node_modules/bootstrap/dist/js/bootstrap.min.js
var bootstrap_min = __webpack_require__(21836);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ./node_modules/select-woo/dist/js/selectWoo.full.js
var selectWoo_full = __webpack_require__(95586);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/models/graph.js
var graph = __webpack_require__(6303);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/view-data.js
var view_data = __webpack_require__(22212);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/search/search-results.htm
const search_results_namespaceObject = "templates/views/components/search/search-results.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/aria.js
var aria = __webpack_require__(9285);
// EXTERNAL MODULE: ./node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js
var bootstrap_datetimepicker_min = __webpack_require__(48918);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/search-results.js
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }













var componentName = "search-results";
/* harmony default export */ const search_results = (knockout_latest_default().components.register(componentName, {
  viewModel: base_filter["default"].extend({
    events: {
      "click .related-resources-graph": "showRelatedResouresGraph",
      "click .navigate-map": "zoomToFeature",
      "mouseover .arches-search-item": "itemMouseover",
      "mouseout .arches-search-item": "itemMouseout"
    },
    initialize: function initialize(options) {
      var _this = this;
      options.name = 'Search Results';
      base_filter["default"].prototype.initialize.call(this, options);
      this.results = knockout_latest_default().observableArray();
      this.showRelationships = knockout_latest_default().observable();
      this.relationshipCandidates = knockout_latest_default().observableArray();
      this.selectedResourceId = knockout_latest_default().observable(null);
      this.language = arches["default"].activeLanguage;
      this.showRelationships.subscribe(function (res) {
        this.selectedResourceId(res.resourceinstanceid);
      }, this);
      this.searchResults.timestamp.subscribe(function () {
        this.updateResults();
      }, this);
      this.searchFilterVms[componentName](this);
      this.restoreState();
      this.mapFilter = this.getFilterByType("map-filter-type", false);
      this.mapFilter.subscribe(function (mapFilter) {
        if (mapFilter) {
          _this.mapFilter = mapFilter;
        }
      }, this);
      this.selectedTab.subscribe(function (tab) {
        if (tab === "map-filter-type") {
          if (knockout_latest_default().unwrap(this.mapFilter.map)) {
            this.mapFilter.map().resize();
          }
        }
      }, this);
      this.bulkResourceReportCache = knockout_latest_default().observable({});
      this.bulkDisambiguatedResourceInstanceCache = knockout_latest_default().observable({});
      this.shiftFocus = aria["default"].shiftFocus;
    },
    mouseoverInstance: function mouseoverInstance() {
      var self = this;
      return function (resourceinstance) {
        var resourceinstanceid = resourceinstance.resourceinstanceid || "";
        self.mouseoverInstanceId(resourceinstanceid);
      };
    },
    mouseoverThumbnail: function mouseoverThumbnail(_data, event) {
      var largeThumbnail = event.currentTarget.nextElementSibling;
      largeThumbnail.style.display = "block";
      var rect = largeThumbnail.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        largeThumbnail.style.top = window.innerHeight - rect.height - 60 + "px";
      }
    },
    mouseoutThumbnail: function mouseoutThumbnail(_data, event) {
      event.currentTarget.nextElementSibling.style.display = "none";
    },
    showRelatedResources: function showRelatedResources() {
      var self = this;
      return function (resourceinstance) {
        if (resourceinstance === undefined) {
          resourceinstance = self.relatedResourcesManager.currentResource();
          if (self.relatedResourcesManager.showGraph() === true) {
            self.relatedResourcesManager.showGraph(false);
          }
        }
        self.showRelationships(resourceinstance);
        if (self.selectedTab() !== "related-resources-filter-type") {
          self.selectedTab("related-resources-filter-type");
        }
        self.shiftFocus("#related-resources-filter-type-tabpanel");
      };
    },
    showResourceSummaryReport: function showResourceSummaryReport(result) {
      var self = this;
      var resourceId = result._source.resourceinstanceid;
      var reportDataLoaded = knockout_latest_default().observable(false);
      return function () {
        reportDataLoaded(false);
        reportDataLoaded.subscribe(function (loaded) {
          if (loaded) {
            self.details.setupReport(result._source, self.bulkResourceReportCache, self.bulkDisambiguatedResourceInstanceCache);
          }
        });
        if (!self.bulkDisambiguatedResourceInstanceCache()[resourceId]) {
          var url = arches["default"].urls.api_bulk_disambiguated_resource_instance + "?v=beta&resource_ids=".concat(resourceId);
          self.details.loading(true);
          jquery_min_default().getJSON(url, function (resp) {
            var instanceCache = self.bulkDisambiguatedResourceInstanceCache();
            Object.keys(resp).forEach(function (resourceId) {
              instanceCache[resourceId] = resp[resourceId];
            });
            reportDataLoaded(true);
            self.shiftFocus(".resource-report");
            self.bulkDisambiguatedResourceInstanceCache(instanceCache);
          });
        } else {
          reportDataLoaded(true);
          self.shiftFocus(".resource-report");
        }
        if (self.selectedTab() !== "search-result-details-type") {
          self.selectedTab("search-result-details-type");
        }
      };
    },
    updateResults: function updateResults() {
      var self = this;
      var data = jquery_min_default()('div[name="search-result-data"]').data();
      if (!self.bulkResourceReportCache) {
        self.bulkResourceReportCache = knockout_latest_default().observable({});
      }
      if (!self.bulkDisambiguatedResourceInstanceCache) {
        self.bulkDisambiguatedResourceInstanceCache = knockout_latest_default().observable({});
      }
      if (!!this.searchResults.results) {
        this.results.removeAll();
        this.selectedResourceId(null);
        var graphIdsToFetch = this.searchResults.results.hits.hits.reduce(function (acc, hit) {
          var graphId = hit["_source"]["graph_id"];
          if (!knockout_latest_default().unwrap(self.bulkResourceReportCache)[graphId]) {
            acc.push(graphId);
          }
          return acc;
        }, []);
        if (graphIdsToFetch.length > 0) {
          var url = arches["default"].urls.api_bulk_resource_report + "?graph_ids=".concat(graphIdsToFetch);
          jquery_min_default().getJSON(url, function (resp) {
            var bulkResourceReportCache = self.bulkResourceReportCache();
            Object.keys(resp).forEach(function (graphId) {
              var graphData = resp[graphId];
              if (graphData.graph) {
                var graphModel = new graph["default"]({
                  data: graphData.graph,
                  datatypes: graphData.datatypes
                });
                graphData["graphModel"] = graphModel;
              }
              bulkResourceReportCache[graphId] = graphData;
            });
            self.bulkResourceReportCache(bulkResourceReportCache);
          });
        }
        var resourceIdsToFetch = this.searchResults.results.hits.hits.reduce(function (acc, hit) {
          var resourceId = hit["_source"]["resourceinstanceid"];
          if (!knockout_latest_default().unwrap(self.bulkDisambiguatedResourceInstanceCache)[resourceId]) {
            acc.push(resourceId);
          }
          return acc;
        }, []);
        this.searchResults.results.hits.hits.forEach(/*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(result) {
            var graphdata, point, thumbnailUrl, thumbnailResponse, thumbnail, _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  graphdata = underscore_min_default().find(view_data["default"].graphs, function (graphdata) {
                    return result._source.graph_id === graphdata.graphid;
                  });
                  point = null;
                  if (result._source.points.length > 0) {
                    point = result._source.points[0].point;
                  }
                  thumbnailUrl = "/thumbnail/".concat(result._source.resourceinstanceid);
                  if (!(arches["default"].searchThumbnails == "True")) {
                    _context.n = 2;
                    break;
                  }
                  _context.n = 1;
                  return fetch(thumbnailUrl, {
                    method: "HEAD"
                  });
                case 1:
                  _t = _context.v;
                  _context.n = 3;
                  break;
                case 2:
                  _t = undefined;
                case 3:
                  thumbnailResponse = _t;
                  thumbnail = thumbnailResponse && thumbnailResponse.ok ? thumbnailUrl : undefined;
                  this.results.push({
                    displayname: result._source.displayname,
                    thumbnail: thumbnail,
                    resourceinstanceid: result._source.resourceinstanceid,
                    displaydescription: result._source.displaydescription,
                    alternativelanguage: result._source.displayname_language != arches["default"].activeLanguage,
                    map_popup: result._source.map_popup,
                    provisional_resource: result._source.provisional_resource,
                    geometries: knockout_latest_default().observableArray(result._source.geometries),
                    iconclass: graphdata ? graphdata.iconclass : "",
                    showrelated: this.showRelatedResources(result._source.resourceinstanceid),
                    showDetails: this.showResourceSummaryReport(result),
                    mouseoverInstance: this.mouseoverInstance(result._source.resourceinstanceid),
                    mouseoverThumbnail: this.mouseoverThumbnail,
                    mouseoutThumbnail: this.mouseoutThumbnail,
                    relationshipcandidacy: this.toggleRelationshipCandidacy(result._source.resourceinstanceid),
                    ontologyclass: result._source.root_ontology_class,
                    relatable: this.isResourceRelatable(result._source.graph_id),
                    point: point,
                    reportUrl: arches["default"].urls.resource_report + result._source.resourceinstanceid,
                    editUrl: arches["default"].urls.resource_editor + result._source.resourceinstanceid,
                    mapLinkClicked: function mapLinkClicked() {
                      self.selectedResourceId(result._source.resourceinstanceid);
                      if (self.selectedTab() !== "map-filter-type") {
                        self.selectedTab("map-filter-type");
                      }
                      self.mapLinkData({
                        properties: result._source
                      });
                      self.shiftFocus("canvas.mapboxgl-canvas");
                    },
                    selected: knockout_latest_default().computed(function () {
                      return result._source.resourceinstanceid === knockout_latest_default().unwrap(self.selectedResourceId);
                    }),
                    isPrincipal: result["is_principal"],
                    canRead: result["can_read"],
                    canEdit: result["can_edit"]
                    // can_delete: result._source.permissions.users_without_delete_perm.indexOf(this.userid) < 0,
                  });
                case 4:
                  return _context.a(2);
              }
            }, _callee, this);
          }));
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }(), this);
      }
      return data;
    },
    restoreState: function restoreState() {
      this.updateResults();
    },
    viewReport: function viewReport(resourceinstance) {
      window.open(arches["default"].urls.resource_report + resourceinstance.resourceinstanceid);
    },
    editResource: function editResource(resourceinstance) {
      window.open(arches["default"].urls.resource_editor + resourceinstance.resourceinstanceid);
    },
    zoomToFeature: function zoomToFeature(evt) {
      var data = jquery_min_default()(evt.currentTarget).data();
      this.trigger("find_on_map", data.resourceid, data);
    }
  }),
  template: search_results_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuN2E0ZmVkNDI1ODA5NjAzNTNkM2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBQ0EsdUtBQUFBLENBQUEsRUFBQUMsQ0FBQSxFQUFBQyxDQUFBLHdCQUFBQyxNQUFBLEdBQUFBLE1BQUEsT0FBQUMsQ0FBQSxHQUFBRixDQUFBLENBQUFHLFFBQUEsa0JBQUFDLENBQUEsR0FBQUosQ0FBQSxDQUFBSyxXQUFBLDhCQUFBQyxFQUFBTixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLFFBQUFDLENBQUEsR0FBQUwsQ0FBQSxJQUFBQSxDQUFBLENBQUFNLFNBQUEsWUFBQUMsU0FBQSxHQUFBUCxDQUFBLEdBQUFPLFNBQUEsRUFBQUMsQ0FBQSxHQUFBQyxNQUFBLENBQUFDLE1BQUEsQ0FBQUwsQ0FBQSxDQUFBQyxTQUFBLFVBQUFLLG1CQUFBLENBQUFILENBQUEsdUJBQUFWLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLFFBQUFFLENBQUEsRUFBQUMsQ0FBQSxFQUFBRyxDQUFBLEVBQUFJLENBQUEsTUFBQUMsQ0FBQSxHQUFBWCxDQUFBLFFBQUFZLENBQUEsT0FBQUMsQ0FBQSxLQUFBRixDQUFBLEtBQUFiLENBQUEsS0FBQWdCLENBQUEsRUFBQXBCLENBQUEsRUFBQXFCLENBQUEsRUFBQUMsQ0FBQSxFQUFBTixDQUFBLEVBQUFNLENBQUEsQ0FBQUMsSUFBQSxDQUFBdkIsQ0FBQSxNQUFBc0IsQ0FBQSxXQUFBQSxFQUFBckIsQ0FBQSxFQUFBQyxDQUFBLFdBQUFNLENBQUEsR0FBQVAsQ0FBQSxFQUFBUSxDQUFBLE1BQUFHLENBQUEsR0FBQVosQ0FBQSxFQUFBbUIsQ0FBQSxDQUFBZixDQUFBLEdBQUFGLENBQUEsRUFBQW1CLENBQUEsZ0JBQUFDLEVBQUFwQixDQUFBLEVBQUFFLENBQUEsU0FBQUssQ0FBQSxHQUFBUCxDQUFBLEVBQUFVLENBQUEsR0FB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ckcsYUFBYSxDQUFDLENBQUNtQyxJQUFJLENBQUMsQ0FBQztNQUN0QyxJQUFJLENBQUNtRSxPQUFPLENBQUMsYUFBYSxFQUFFbkUsSUFBSSxDQUFDb0UsVUFBVSxFQUFFcEUsSUFBSSxDQUFDO0lBQ3REO0VBQ0osQ0FBQyxDQUFDO0VBQ0ZxRSxRQUFRLEVBQUV0Siw4QkFBcUJBO0FBQ25DLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLXJlc3VsdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IF8gZnJvbSBcInVuZGVyc2NvcmVcIjtcbmltcG9ydCBCYXNlRmlsdGVyIGZyb20gXCJ2aWV3cy9jb21wb25lbnRzL3NlYXJjaC9iYXNlLWZpbHRlclwiO1xuaW1wb3J0IGJvb3RzdHJhcCBmcm9tIFwiYm9vdHN0cmFwXCI7XG5pbXBvcnQgYXJjaGVzIGZyb20gXCJhcmNoZXNcIjtcbmltcG9ydCBzZWxlY3QyIGZyb20gXCJzZWxlY3Qtd29vXCI7XG5pbXBvcnQga28gZnJvbSBcImtub2Nrb3V0XCI7XG5pbXBvcnQga29NYXBwaW5nIGZyb20gXCJrbm9ja291dC1tYXBwaW5nXCI7XG5pbXBvcnQgR3JhcGhNb2RlbCBmcm9tIFwibW9kZWxzL2dyYXBoXCI7XG5pbXBvcnQgdmlld2RhdGEgZnJvbSBcInZpZXctZGF0YVwiO1xuaW1wb3J0IHNlYXJjaFJlc3VsdHNUZW1wbGF0ZSBmcm9tIFwidGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvc2VhcmNoL3NlYXJjaC1yZXN1bHRzLmh0bVwiO1xuaW1wb3J0IGFyaWFVdGlscyBmcm9tIFwidXRpbHMvYXJpYVwiO1xuaW1wb3J0IFwiYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyXCI7XG5cblxudmFyIGNvbXBvbmVudE5hbWUgPSBcInNlYXJjaC1yZXN1bHRzXCI7XG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKGNvbXBvbmVudE5hbWUsIHtcbiAgICB2aWV3TW9kZWw6IEJhc2VGaWx0ZXIuZXh0ZW5kKHtcbiAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICBcImNsaWNrIC5yZWxhdGVkLXJlc291cmNlcy1ncmFwaFwiOiBcInNob3dSZWxhdGVkUmVzb3VyZXNHcmFwaFwiLFxuICAgICAgICAgICAgXCJjbGljayAubmF2aWdhdGUtbWFwXCI6IFwiem9vbVRvRmVhdHVyZVwiLFxuICAgICAgICAgICAgXCJtb3VzZW92ZXIgLmFyY2hlcy1zZWFyY2gtaXRlbVwiOiBcIml0ZW1Nb3VzZW92ZXJcIixcbiAgICAgICAgICAgIFwibW91c2VvdXQgLmFyY2hlcy1zZWFyY2gtaXRlbVwiOiBcIml0ZW1Nb3VzZW91dFwiLFxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zLm5hbWUgPSAnU2VhcmNoIFJlc3VsdHMnO1xuICAgICAgICAgICAgQmFzZUZpbHRlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgICAgICAgICB0aGlzLnNob3dSZWxhdGlvbnNoaXBzID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWxhdGlvbnNoaXBDYW5kaWRhdGVzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmVzb3VyY2VJZCA9IGtvLm9ic2VydmFibGUobnVsbCk7XG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlID0gYXJjaGVzLmFjdGl2ZUxhbmd1YWdlO1xuICAgICAgICAgICAgdGhpcy5zaG93UmVsYXRpb25zaGlwcy5zdWJzY3JpYmUoZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSZXNvdXJjZUlkKHJlcy5yZXNvdXJjZWluc3RhbmNlaWQpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cy50aW1lc3RhbXAuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdHMoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEZpbHRlclZtc1tjb21wb25lbnROYW1lXSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZVN0YXRlKCk7XG5cbiAgICAgICAgICAgIHRoaXMubWFwRmlsdGVyID0gdGhpcy5nZXRGaWx0ZXJCeVR5cGUoXCJtYXAtZmlsdGVyLXR5cGVcIiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5tYXBGaWx0ZXIuc3Vic2NyaWJlKG1hcEZpbHRlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1hcEZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcEZpbHRlciA9IG1hcEZpbHRlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIuc3Vic2NyaWJlKGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFiID09PSBcIm1hcC1maWx0ZXItdHlwZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrby51bndyYXAodGhpcy5tYXBGaWx0ZXIubWFwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBGaWx0ZXIubWFwKCkucmVzaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5idWxrUmVzb3VyY2VSZXBvcnRDYWNoZSA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgICAgICAgICAgdGhpcy5idWxrRGlzYW1iaWd1YXRlZFJlc291cmNlSW5zdGFuY2VDYWNoZSA9IGtvLm9ic2VydmFibGUoe30pO1xuICAgICAgICAgICAgdGhpcy5zaGlmdEZvY3VzID0gYXJpYVV0aWxzLnNoaWZ0Rm9jdXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbW91c2VvdmVySW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAocmVzb3VyY2VpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXNvdXJjZWluc3RhbmNlaWQgPVxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZWluc3RhbmNlLnJlc291cmNlaW5zdGFuY2VpZCB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIHNlbGYubW91c2VvdmVySW5zdGFuY2VJZChyZXNvdXJjZWluc3RhbmNlaWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBtb3VzZW92ZXJUaHVtYm5haWw6IGZ1bmN0aW9uIChfZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhcmdlVGh1bWJuYWlsID0gZXZlbnQuY3VycmVudFRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBsYXJnZVRodW1ibmFpbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gbGFyZ2VUaHVtYm5haWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAocmVjdC5ib3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBsYXJnZVRodW1ibmFpbC5zdHlsZS50b3AgPVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCAtIDYwICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1vdXNlb3V0VGh1bWJuYWlsOiBmdW5jdGlvbiAoX2RhdGEsIGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd1JlbGF0ZWRSZXNvdXJjZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAocmVzb3VyY2VpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXNvdXJjZWluc3RhbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VpbnN0YW5jZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbGF0ZWRSZXNvdXJjZXNNYW5hZ2VyLmN1cnJlbnRSZXNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5yZWxhdGVkUmVzb3VyY2VzTWFuYWdlci5zaG93R3JhcGgoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWxhdGVkUmVzb3VyY2VzTWFuYWdlci5zaG93R3JhcGgoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuc2hvd1JlbGF0aW9uc2hpcHMocmVzb3VyY2VpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRUYWIoKSAhPT0gXCJyZWxhdGVkLXJlc291cmNlcy1maWx0ZXItdHlwZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRUYWIoXCJyZWxhdGVkLXJlc291cmNlcy1maWx0ZXItdHlwZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5zaGlmdEZvY3VzKFwiI3JlbGF0ZWQtcmVzb3VyY2VzLWZpbHRlci10eXBlLXRhYnBhbmVsXCIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93UmVzb3VyY2VTdW1tYXJ5UmVwb3J0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IHJlc291cmNlSWQgPSByZXN1bHQuX3NvdXJjZS5yZXNvdXJjZWluc3RhbmNlaWQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydERhdGFMb2FkZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXBvcnREYXRhTG9hZGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXBvcnREYXRhTG9hZGVkLnN1YnNjcmliZSgobG9hZGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGV0YWlscy5zZXR1cFJlcG9ydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuX3NvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ1bGtSZXNvdXJjZVJlcG9ydENhY2hlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnVsa0Rpc2FtYmlndWF0ZWRSZXNvdXJjZUluc3RhbmNlQ2FjaGUsXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICFzZWxmLmJ1bGtEaXNhbWJpZ3VhdGVkUmVzb3VyY2VJbnN0YW5jZUNhY2hlKClbXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUlkXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyY2hlcy51cmxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwaV9idWxrX2Rpc2FtYmlndWF0ZWRfcmVzb3VyY2VfaW5zdGFuY2UgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYD92PWJldGEmcmVzb3VyY2VfaWRzPSR7cmVzb3VyY2VJZH1gO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGV0YWlscy5sb2FkaW5nKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICQuZ2V0SlNPTih1cmwsIChyZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZUNhY2hlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ1bGtEaXNhbWJpZ3VhdGVkUmVzb3VyY2VJbnN0YW5jZUNhY2hlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhyZXNwKS5mb3JFYWNoKGZ1bmN0aW9uIChyZXNvdXJjZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VDYWNoZVtyZXNvdXJjZUlkXSA9IHJlc3BbcmVzb3VyY2VJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0RGF0YUxvYWRlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hpZnRGb2N1cyhcIi5yZXNvdXJjZS1yZXBvcnRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ1bGtEaXNhbWJpZ3VhdGVkUmVzb3VyY2VJbnN0YW5jZUNhY2hlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlQ2FjaGUsXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXBvcnREYXRhTG9hZGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNoaWZ0Rm9jdXMoXCIucmVzb3VyY2UtcmVwb3J0XCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkVGFiKCkgIT09IFwic2VhcmNoLXJlc3VsdC1kZXRhaWxzLXR5cGVcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkVGFiKFwic2VhcmNoLXJlc3VsdC1kZXRhaWxzLXR5cGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVSZXN1bHRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgZGF0YSA9ICQoJ2RpdltuYW1lPVwic2VhcmNoLXJlc3VsdC1kYXRhXCJdJykuZGF0YSgpO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGYuYnVsa1Jlc291cmNlUmVwb3J0Q2FjaGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmJ1bGtSZXNvdXJjZVJlcG9ydENhY2hlID0ga28ub2JzZXJ2YWJsZSh7fSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghc2VsZi5idWxrRGlzYW1iaWd1YXRlZFJlc291cmNlSW5zdGFuY2VDYWNoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuYnVsa0Rpc2FtYmlndWF0ZWRSZXNvdXJjZUluc3RhbmNlQ2FjaGUgPSBrby5vYnNlcnZhYmxlKFxuICAgICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISF0aGlzLnNlYXJjaFJlc3VsdHMucmVzdWx0cykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmVzb3VyY2VJZChudWxsKTtcblxuICAgICAgICAgICAgICAgIHZhciBncmFwaElkc1RvRmV0Y2ggPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMucmVzdWx0cy5oaXRzLmhpdHMucmVkdWNlKGZ1bmN0aW9uIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdCxcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhcGhJZCA9IGhpdFtcIl9zb3VyY2VcIl1bXCJncmFwaF9pZFwiXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFrby51bndyYXAoc2VsZi5idWxrUmVzb3VyY2VSZXBvcnRDYWNoZSlbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2MucHVzaChncmFwaElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICAgICAgfSwgW10pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGdyYXBoSWRzVG9GZXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJjaGVzLnVybHMuYXBpX2J1bGtfcmVzb3VyY2VfcmVwb3J0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGA/Z3JhcGhfaWRzPSR7Z3JhcGhJZHNUb0ZldGNofWA7XG5cbiAgICAgICAgICAgICAgICAgICAgJC5nZXRKU09OKHVybCwgZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWxrUmVzb3VyY2VSZXBvcnRDYWNoZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5idWxrUmVzb3VyY2VSZXBvcnRDYWNoZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhyZXNwKS5mb3JFYWNoKGZ1bmN0aW9uIChncmFwaElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyYXBoRGF0YSA9IHJlc3BbZ3JhcGhJZF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhcGhEYXRhLmdyYXBoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmFwaE1vZGVsID0gbmV3IEdyYXBoTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZ3JhcGhEYXRhLmdyYXBoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXR5cGVzOiBncmFwaERhdGEuZGF0YXR5cGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhEYXRhW1wiZ3JhcGhNb2RlbFwiXSA9IGdyYXBoTW9kZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsa1Jlc291cmNlUmVwb3J0Q2FjaGVbZ3JhcGhJZF0gPSBncmFwaERhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5idWxrUmVzb3VyY2VSZXBvcnRDYWNoZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxrUmVzb3VyY2VSZXBvcnRDYWNoZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByZXNvdXJjZUlkc1RvRmV0Y2ggPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMucmVzdWx0cy5oaXRzLmhpdHMucmVkdWNlKGZ1bmN0aW9uIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdCxcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzb3VyY2VJZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGl0W1wiX3NvdXJjZVwiXVtcInJlc291cmNlaW5zdGFuY2VpZFwiXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFrby51bndyYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnVsa0Rpc2FtYmlndWF0ZWRSZXNvdXJjZUluc3RhbmNlQ2FjaGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtyZXNvdXJjZUlkXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2gocmVzb3VyY2VJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cy5yZXN1bHRzLmhpdHMuaGl0cy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICBhc3luYyBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhcGhkYXRhID0gXy5maW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdkYXRhLmdyYXBocyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZ3JhcGhkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuX3NvdXJjZS5ncmFwaF9pZCA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoZGF0YS5ncmFwaGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5fc291cmNlLnBvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQgPSByZXN1bHQuX3NvdXJjZS5wb2ludHNbMF0ucG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRodW1ibmFpbFVybCA9IGAvdGh1bWJuYWlsLyR7cmVzdWx0Ll9zb3VyY2UucmVzb3VyY2VpbnN0YW5jZWlkfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aHVtYm5haWxSZXNwb25zZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJjaGVzLnNlYXJjaFRodW1ibmFpbHMgPT0gXCJUcnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBhd2FpdCBmZXRjaCh0aHVtYm5haWxVcmwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiSEVBRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aHVtYm5haWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbFJlc3BvbnNlICYmIHRodW1ibmFpbFJlc3BvbnNlLm9rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGh1bWJuYWlsVXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheW5hbWU6IHJlc3VsdC5fc291cmNlLmRpc3BsYXluYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbDogdGh1bWJuYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlaW5zdGFuY2VpZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Ll9zb3VyY2UucmVzb3VyY2VpbnN0YW5jZWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlkZXNjcmlwdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Ll9zb3VyY2UuZGlzcGxheWRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0aXZlbGFuZ3VhZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5fc291cmNlLmRpc3BsYXluYW1lX2xhbmd1YWdlICE9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyY2hlcy5hY3RpdmVMYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBfcG9wdXA6IHJlc3VsdC5fc291cmNlLm1hcF9wb3B1cCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aXNpb25hbF9yZXNvdXJjZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Ll9zb3VyY2UucHJvdmlzaW9uYWxfcmVzb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cmllczoga28ub2JzZXJ2YWJsZUFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuX3NvdXJjZS5nZW9tZXRyaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbmNsYXNzOiBncmFwaGRhdGEgPyBncmFwaGRhdGEuaWNvbmNsYXNzIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93cmVsYXRlZDogdGhpcy5zaG93UmVsYXRlZFJlc291cmNlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Ll9zb3VyY2UucmVzb3VyY2VpbnN0YW5jZWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0RldGFpbHM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc291cmNlU3VtbWFyeVJlcG9ydChyZXN1bHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlb3Zlckluc3RhbmNlOiB0aGlzLm1vdXNlb3Zlckluc3RhbmNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuX3NvdXJjZS5yZXNvdXJjZWluc3RhbmNlaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZW92ZXJUaHVtYm5haWw6IHRoaXMubW91c2VvdmVyVGh1bWJuYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlb3V0VGh1bWJuYWlsOiB0aGlzLm1vdXNlb3V0VGh1bWJuYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uc2hpcGNhbmRpZGFjeTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVSZWxhdGlvbnNoaXBDYW5kaWRhY3koXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuX3NvdXJjZS5yZXNvdXJjZWluc3RhbmNlaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb250b2xvZ3ljbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Ll9zb3VyY2Uucm9vdF9vbnRvbG9neV9jbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGFibGU6IHRoaXMuaXNSZXNvdXJjZVJlbGF0YWJsZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Ll9zb3VyY2UuZ3JhcGhfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludDogcG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0VXJsOiBhcmNoZXMudXJscy5yZXNvdXJjZV9yZXBvcnQgKyByZXN1bHQuX3NvdXJjZS5yZXNvdXJjZWluc3RhbmNlaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdFVybDogYXJjaGVzLnVybHMucmVzb3VyY2VfZWRpdG9yICsgcmVzdWx0Ll9zb3VyY2UucmVzb3VyY2VpbnN0YW5jZWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcExpbmtDbGlja2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRSZXNvdXJjZUlkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Ll9zb3VyY2UucmVzb3VyY2VpbnN0YW5jZWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZFRhYigpICE9PSBcIm1hcC1maWx0ZXItdHlwZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkVGFiKFwibWFwLWZpbHRlci10eXBlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWFwTGlua0RhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcmVzdWx0Ll9zb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoaWZ0Rm9jdXMoXCJjYW52YXMubWFwYm94Z2wtY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5fc291cmNlLnJlc291cmNlaW5zdGFuY2VpZCA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtvLnVud3JhcChzZWxmLnNlbGVjdGVkUmVzb3VyY2VJZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ByaW5jaXBhbDogcmVzdWx0W1wiaXNfcHJpbmNpcGFsXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhblJlYWQ6IHJlc3VsdFtcImNhbl9yZWFkXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbkVkaXQ6IHJlc3VsdFtcImNhbl9lZGl0XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbl9kZWxldGU6IHJlc3VsdC5fc291cmNlLnBlcm1pc3Npb25zLnVzZXJzX3dpdGhvdXRfZGVsZXRlX3Blcm0uaW5kZXhPZih0aGlzLnVzZXJpZCkgPCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVzdG9yZVN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdHMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICB2aWV3UmVwb3J0OiBmdW5jdGlvbiAocmVzb3VyY2VpbnN0YW5jZSkge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oXG4gICAgICAgICAgICAgICAgYXJjaGVzLnVybHMucmVzb3VyY2VfcmVwb3J0ICtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VpbnN0YW5jZS5yZXNvdXJjZWluc3RhbmNlaWQsXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVkaXRSZXNvdXJjZTogZnVuY3Rpb24gKHJlc291cmNlaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKFxuICAgICAgICAgICAgICAgIGFyY2hlcy51cmxzLnJlc291cmNlX2VkaXRvciArXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlaW5zdGFuY2UucmVzb3VyY2VpbnN0YW5jZWlkLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICB6b29tVG9GZWF0dXJlOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9ICQoZXZ0LmN1cnJlbnRUYXJnZXQpLmRhdGEoKTtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImZpbmRfb25fbWFwXCIsIGRhdGEucmVzb3VyY2VpZCwgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgdGVtcGxhdGU6IHNlYXJjaFJlc3VsdHNUZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwicmV0dXJuIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiJCIsIl8iLCJCYXNlRmlsdGVyIiwiYm9vdHN0cmFwIiwiYXJjaGVzIiwic2VsZWN0MiIsImtvIiwia29NYXBwaW5nIiwiR3JhcGhNb2RlbCIsInZpZXdkYXRhIiwic2VhcmNoUmVzdWx0c1RlbXBsYXRlIiwiYXJpYVV0aWxzIiwiY29tcG9uZW50TmFtZSIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInZpZXdNb2RlbCIsImV4dGVuZCIsImV2ZW50cyIsImluaXRpYWxpemUiLCJvcHRpb25zIiwiX3RoaXMiLCJuYW1lIiwicmVzdWx0cyIsIm9ic2VydmFibGVBcnJheSIsInNob3dSZWxhdGlvbnNoaXBzIiwib2JzZXJ2YWJsZSIsInJlbGF0aW9uc2hpcENhbmRpZGF0ZXMiLCJzZWxlY3RlZFJlc291cmNlSWQiLCJsYW5ndWFnZSIsImFjdGl2ZUxhbmd1YWdlIiwic3Vic2NyaWJlIiwicmVzIiwicmVzb3VyY2VpbnN0YW5jZWlkIiwic2VhcmNoUmVzdWx0cyIsInRpbWVzdGFtcCIsInVwZGF0ZVJlc3VsdHMiLCJzZWFyY2hGaWx0ZXJWbXMiLCJyZXN0b3JlU3RhdGUiLCJtYXBGaWx0ZXIiLCJnZXRGaWx0ZXJCeVR5cGUiLCJzZWxlY3RlZFRhYiIsInRhYiIsInVud3JhcCIsIm1hcCIsInJlc2l6ZSIsImJ1bGtSZXNvdXJjZVJlcG9ydENhY2hlIiwiYnVsa0Rpc2FtYmlndWF0ZWRSZXNvdXJjZUluc3RhbmNlQ2FjaGUiLCJzaGlmdEZvY3VzIiwibW91c2VvdmVySW5zdGFuY2UiLCJzZWxmIiwicmVzb3VyY2VpbnN0YW5jZSIsIm1vdXNlb3Zlckluc3RhbmNlSWQiLCJtb3VzZW92ZXJUaHVtYm5haWwiLCJfZGF0YSIsImV2ZW50IiwibGFyZ2VUaHVtYm5haWwiLCJjdXJyZW50VGFyZ2V0IiwibmV4dEVsZW1lbnRTaWJsaW5nIiwic3R5bGUiLCJkaXNwbGF5IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwidG9wIiwiaGVpZ2h0IiwibW91c2VvdXRUaHVtYm5haWwiLCJzaG93UmVsYXRlZFJlc291cmNlcyIsInVuZGVmaW5lZCIsInJlbGF0ZWRSZXNvdXJjZXNNYW5hZ2VyIiwiY3VycmVudFJlc291cmNlIiwic2hvd0dyYXBoIiwic2hvd1Jlc291cmNlU3VtbWFyeVJlcG9ydCIsInJlc3VsdCIsInJlc291cmNlSWQiLCJfc291cmNlIiwicmVwb3J0RGF0YUxvYWRlZCIsImxvYWRlZCIsImRldGFpbHMiLCJzZXR1cFJlcG9ydCIsInVybCIsInVybHMiLCJhcGlfYnVsa19kaXNhbWJpZ3VhdGVkX3Jlc291cmNlX2luc3RhbmNlIiwiY29uY2F0IiwibG9hZGluZyIsImdldEpTT04iLCJyZXNwIiwiaW5zdGFuY2VDYWNoZSIsImtleXMiLCJmb3JFYWNoIiwiZGF0YSIsInJlbW92ZUFsbCIsImdyYXBoSWRzVG9GZXRjaCIsImhpdHMiLCJyZWR1Y2UiLCJhY2MiLCJoaXQiLCJncmFwaElkIiwicHVzaCIsImFwaV9idWxrX3Jlc291cmNlX3JlcG9ydCIsImdyYXBoRGF0YSIsImdyYXBoIiwiZ3JhcGhNb2RlbCIsImRhdGF0eXBlcyIsInJlc291cmNlSWRzVG9GZXRjaCIsIl9yZWYiLCJfY2FsbGVlIiwiZ3JhcGhkYXRhIiwicG9pbnQiLCJ0aHVtYm5haWxVcmwiLCJ0aHVtYm5haWxSZXNwb25zZSIsInRodW1ibmFpbCIsIl90IiwiX2NvbnRleHQiLCJmaW5kIiwiZ3JhcGhzIiwiZ3JhcGhfaWQiLCJncmFwaGlkIiwicG9pbnRzIiwic2VhcmNoVGh1bWJuYWlscyIsImZldGNoIiwibWV0aG9kIiwib2siLCJkaXNwbGF5bmFtZSIsImRpc3BsYXlkZXNjcmlwdGlvbiIsImFsdGVybmF0aXZlbGFuZ3VhZ2UiLCJkaXNwbGF5bmFtZV9sYW5ndWFnZSIsIm1hcF9wb3B1cCIsInByb3Zpc2lvbmFsX3Jlc291cmNlIiwiZ2VvbWV0cmllcyIsImljb25jbGFzcyIsInNob3dyZWxhdGVkIiwic2hvd0RldGFpbHMiLCJyZWxhdGlvbnNoaXBjYW5kaWRhY3kiLCJ0b2dnbGVSZWxhdGlvbnNoaXBDYW5kaWRhY3kiLCJvbnRvbG9neWNsYXNzIiwicm9vdF9vbnRvbG9neV9jbGFzcyIsInJlbGF0YWJsZSIsImlzUmVzb3VyY2VSZWxhdGFibGUiLCJyZXBvcnRVcmwiLCJyZXNvdXJjZV9yZXBvcnQiLCJlZGl0VXJsIiwicmVzb3VyY2VfZWRpdG9yIiwibWFwTGlua0NsaWNrZWQiLCJtYXBMaW5rRGF0YSIsInByb3BlcnRpZXMiLCJzZWxlY3RlZCIsImNvbXB1dGVkIiwiaXNQcmluY2lwYWwiLCJjYW5SZWFkIiwiY2FuRWRpdCIsIl94Iiwidmlld1JlcG9ydCIsIm9wZW4iLCJlZGl0UmVzb3VyY2UiLCJ6b29tVG9GZWF0dXJlIiwiZXZ0IiwidHJpZ2dlciIsInJlc291cmNlaWQiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=