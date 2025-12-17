"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[38998],{

/***/ 38998:
/*!***********************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/related-resources-map.js + 2 modules ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ related_resources_map)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ./node_modules/@mapbox/geojson-extent/geojson-extent.js
var geojson_extent = __webpack_require__(50653);
var geojson_extent_default = /*#__PURE__*/__webpack_require__.n(geojson_extent);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/card-component.js
var card_component = __webpack_require__(19480);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/map-editor.js
var map_editor = __webpack_require__(82692);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/map-filter.js
var map_filter = __webpack_require__(35359);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/select-related-feature-layers.js
var select_related_feature_layers = __webpack_require__(79364);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/cards/related-resources-map.htm
const related_resources_map_namespaceObject = "templates/views/components/cards/related-resources-map.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/cards/related-resources-map-popup.htm
const related_resources_map_popup_namespaceObject = "templates/views/components/cards/related-resources-map-popup.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/related-resources-map.js
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }











var viewModel = function viewModel(params) {
  var self = this;
  this.widgets = [];
  params.configKeys = ['selectRelatedSource', 'selectRelatedSourceLayer', 'selectLayerConfig', 'defaultcolor', 'selectioncolor', 'hovercolor', 'colorpalette', 'fillopacity', 'overviewzoom', 'minzoom', 'pointradius', 'linewidth', 'strokecolor', 'strokelinewidth', 'strokepointradius', 'strokepointopacity'];
  card_component["default"].apply(this, [params]);
  var selectLayerConfig = {};
  selectLayerConfig.defaultcolor = this.defaultcolor();
  selectLayerConfig.selectioncolor = this.selectioncolor();
  selectLayerConfig.hovercolor = this.hovercolor();
  selectLayerConfig.colorpalette = typeof this.colorpalette() === 'string' ? this.colorpalette().split(",") : this.colorpalette();
  selectLayerConfig.fillopacity = Number(this.fillopacity());
  selectLayerConfig.overviewzoom = Number(this.overviewzoom());
  selectLayerConfig.minzoom = Number(this.minzoom());
  selectLayerConfig.pointradius = Number(this.pointradius());
  selectLayerConfig.linewidth = Number(this.linewidth());
  selectLayerConfig.strokecolor = this.strokecolor();
  selectLayerConfig.strokelinewidth = Number(this.strokelinewidth());
  selectLayerConfig.strokepointradius = Number(this.strokepointradius());
  selectLayerConfig.strokepointopacity = Number(this.strokepointopacity());
  if (self.form && self.tile) self.card.widgets().forEach(function (widget) {
    var id = widget.node_id();
    var type = knockout_latest_default().unwrap(self.form.nodeLookup[id].datatype);
    if (type === 'resource-instance' || type === 'resource-instance-list' || type === 'geojson-feature-collection') {
      self.widgets.push(widget);
    }
  });
  var getNodeIds = function getNodeIds() {
    var nodeids = [];
    if (self.selectRelatedSource()) {
      var sourceUrl = new window.URL(arches["default"].mapSources[self.selectRelatedSource()].data, window.location.origin);
      var nodes = sourceUrl.searchParams.get('nodeids');
      var node = sourceUrl.searchParams.get('nodeid');
      if (node) {
        nodeids.push(node);
      }
      if (nodes) {
        nodeids = nodeids.concat(nodes.split(','));
      }
    }
    return nodeids;
  };

  /* 
      set/get logic to ensure all data values are equal between parent and children
  */

  this.basemap = knockout_latest_default().observable();
  this.overlayConfigs = knockout_latest_default().observable();
  this.centerX = knockout_latest_default().observable();
  this.centerY = knockout_latest_default().observable();
  var _iterator = _createForOfIteratorHelper(self.widgets),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var widget = _step.value;
      if (widget.config.basemap) {
        self.basemap(widget.config.basemap());
      }
      if (widget.config.overlayConfigs) {
        self.overlayConfigs(widget.config.overlayConfigs());
      }
      if (widget.config.centerX) {
        self.centerX(widget.config.centerX());
      }
      if (widget.config.centerY) {
        self.centerY(widget.config.centerY());
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  this.basemap.subscribe(function (map) {
    var _iterator2 = _createForOfIteratorHelper(self.widgets),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var widget = _step2.value;
        if (widget.config.basemap) {
          widget.config.basemap(map);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  });
  this.overlayConfigs.subscribe(function (configs) {
    var _iterator3 = _createForOfIteratorHelper(self.widgets),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var widget = _step3.value;
        if (widget.config.overlayConfigs) {
          widget.config.overlayConfigs(configs);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  });
  this.centerX.subscribe(function (x) {
    var _iterator4 = _createForOfIteratorHelper(self.widgets),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var widget = _step4.value;
        if (widget.config.centerX) {
          widget.config.centerX(x);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  });
  this.centerY.subscribe(function (y) {
    var _iterator5 = _createForOfIteratorHelper(self.widgets),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var widget = _step5.value;
        if (widget.config.centerY) {
          widget.config.centerY(y);
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  });
  this.zoom = knockout_latest_default().observable(this.overviewzoom());
  this.zoom.subscribe(function (zoom) {
    self.config.overviewzoom(zoom);
    var _iterator6 = _createForOfIteratorHelper(self.widgets),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var widget = _step6.value;
        if (widget.config.zoom) {
          widget.config.zoom(zoom);
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  });

  /* end local set/get */

  params.basemap = this.basemap;
  params.overlayConfigs = this.overlayConfigs;
  params.x = this.centerX;
  params.y = this.centerY;
  params.zoom = this.zoom;
  this.hoverId = knockout_latest_default().observable();
  this.nodeids = getNodeIds();
  this.nodeDetails = knockout_latest_default().observableArray();
  this.nodeids.forEach(function (nodeid) {
    fetch(arches["default"].urls.api_nodes(nodeid)).then(function (response) {
      return response.json();
    }).then(function (data) {
      self.nodeDetails.push(data[0]);
    }).catch(function (error) {
      console.error('Error:', error);
    });
  });
  var parsedNodeIds = JSON.parse(JSON.stringify(this.nodeids));
  var firstNode = parsedNodeIds.length > 0 ? [parsedNodeIds[0]] : [];
  this.filterNodeIds = knockout_latest_default().observableArray(firstNode);
  this.relatedResourceDetails = {};
  this.relatedResourceWidgets = this.widgets.filter(function (widget) {
    return widget.datatype.datatype === 'resource-instance' || widget.datatype.datatype === 'resource-instance-list';
  });
  this.relatedResources = knockout_latest_default().pureComputed(function () {
    var tileResourceIds = [];
    self.relatedResourceWidgets.forEach(function (widget) {
      var nodeid = knockout_latest_default().unwrap(widget.node_id);
      var related = self.tile.data[nodeid]();
      if (related) {
        self.tile.data[nodeid]().forEach(function (rr) {
          var resourceinstanceid = knockout_latest_default().unwrap(rr.resourceId);
          if (resourceinstanceid) {
            tileResourceIds.push(resourceinstanceid);
            if (!self.relatedResourceDetails[resourceinstanceid]) {
              window.fetch(arches["default"].urls.search_results + "?id=" + resourceinstanceid).then(function (response) {
                if (response.ok) {
                  return response.json();
                }
              }).then(function (json) {
                var details = json.results.hits.hits[0]._source;
                self.relatedResourceDetails[resourceinstanceid] = {
                  graphid: details.graph_id,
                  resourceinstanceid: resourceinstanceid,
                  displayname: details.displayname,
                  geometries: details.geometries
                };
                self.tile.data[nodeid].valueHasMutated();
              });
            }
          }
        });
      }
    });
    return tileResourceIds.map(function (resourceid) {
      return self.relatedResourceDetails[resourceid];
    }).filter(function (val) {
      return val !== undefined;
    });
  });
  this.showRelatedQuery = knockout_latest_default().observable(false);
  var resourceBounds = knockout_latest_default().observable();
  var selectRelatedSource = this.selectRelatedSource();
  var selectRelatedSourceLayer = this.selectRelatedSourceLayer();
  var selectedResourceIds = knockout_latest_default().computed(function () {
    var ids = [];
    self.relatedResourceWidgets.forEach(function (widget) {
      var id = widget.node_id();
      var value = knockout_latest_default().unwrap(self.tile.data[id]) ? knockout_mapping_min_default().toJS(self.tile.data[id]().map(function (item) {
        return item.resourceId;
      })) : null;
      if (value) {
        ids = ids.concat(value);
      }
    });
    return ids;
  });
  var updateResourceBounds = function updateResourceBounds(ids) {
    if (ids.length > 0) {
      jquery_min_default().getJSON({
        url: arches["default"].urls.geojson,
        data: {
          resourceid: ids.join(',')
        }
      }, function (geojson) {
        if (geojson.features.length > 0) resourceBounds(geojson_extent_default()(geojson));
      });
    }
  };
  updateResourceBounds(selectedResourceIds());
  selectedResourceIds.subscribe(updateResourceBounds);
  var zoomToData = true;
  resourceBounds.subscribe(function (bounds) {
    var map = self.map();
    if (map && map.getStyle() && zoomToData) {
      map.fitBounds(bounds);
    }
    zoomToData = true;
  });
  var selectFeatureLayers = (0,select_related_feature_layers["default"])(selectRelatedSource, selectRelatedSourceLayer, selectedResourceIds(), true, null, this.nodeids, this.filterNodeIds(), self.hoverId(), selectLayerConfig);
  var sources = [];
  for (var sourceName in arches["default"].mapSources) {
    if (Object.prototype.hasOwnProperty.call(arches["default"].mapSources, sourceName)) {
      sources.push(sourceName);
    }
  }
  var updateResourceSelectLayers = function updateResourceSelectLayers() {
    var source = self.selectRelatedSource();
    var sourceLayer = self.selectRelatedSourceLayer();
    selectFeatureLayers = sources.indexOf(source) > 0 ? (0,select_related_feature_layers["default"])(source, sourceLayer, selectedResourceIds(), true, null, self.nodeids, self.filterNodeIds(), self.hoverId(), selectLayerConfig) : [];
    self.additionalLayers(selectFeatureLayers.concat(extendedLayers));
  };
  selectedResourceIds.subscribe(updateResourceSelectLayers);
  this.selectRelatedSource.subscribe(updateResourceSelectLayers);
  this.selectRelatedSourceLayer.subscribe(updateResourceSelectLayers);
  this.filterNodeIds.subscribe(updateResourceSelectLayers);
  this.hoverId.subscribe(updateResourceSelectLayers);
  params.activeTab = 'editor';
  var extendedLayers = [];
  if (params.layers) {
    extendedLayers = params.layers;
  }
  params.layers = knockout_latest_default().observable(extendedLayers.concat(selectFeatureLayers));
  params.fitBounds = resourceBounds;
  map_editor["default"].apply(this, [params]);
  this.relateResource = function (resourceData, widget) {
    var id = widget.node_id();
    var resourceinstanceid = knockout_latest_default().unwrap(resourceData.resourceinstanceid);
    var type = knockout_latest_default().unwrap(self.form.nodeLookup[id].datatype);
    self.relatedResourceDetails[knockout_latest_default().unwrap(resourceData.resourceinstanceid)] = {
      graphid: knockout_latest_default().unwrap(resourceData.graphid),
      displayname: knockout_latest_default().unwrap(resourceData.displayname),
      resourceinstanceid: knockout_latest_default().unwrap(resourceData.resourceinstanceid)
    };
    zoomToData = false;
    var graphconfig = widget.node.config.graphs().find(function (graph) {
      return graph.graphid === knockout_latest_default().unwrap(resourceData.graphid);
    });
    var val = [{
      ontologyProperty: knockout_latest_default().observable((graphconfig === null || graphconfig === void 0 ? void 0 : graphconfig.ontologyProperty) || ''),
      inverseOntologyProperty: knockout_latest_default().observable((graphconfig === null || graphconfig === void 0 ? void 0 : graphconfig.ontologyProperty) || ''),
      resourceId: resourceinstanceid,
      resourceXresourceId: ""
    }];
    if (type === 'resource-instance') {
      self.tile.data[id](val);
    } else {
      var value = knockout_mapping_min_default().toJS(self.tile.data[id]);
      if (!value) {
        self.tile.data[id](val);
      } else if (value.map(function (rr) {
        return rr.resourceId;
      }).indexOf(resourceinstanceid) < 0) {
        var values = value.concat(val);
        self.tile.data[id](values);
      }
    }
  };
  this.unrelateResource = function (resourceData, widget) {
    var id = widget.node_id();
    var resourceinstanceid = knockout_latest_default().unwrap(resourceData.resourceinstanceid);
    var related = resourceData.mapCard.tile.data[id]();
    for (var i = 0; i < related.length; i++) {
      if (knockout_latest_default().unwrap(related[i].resourceId) === resourceinstanceid) {
        related.splice(i, 1);
      }
    }
    resourceData.mapCard.tile.data[id](related);
  };
  this.isSelectable = function (feature) {
    var selectLayerIds = selectFeatureLayers.map(function (layer) {
      return layer.id;
    });
    return selectLayerIds.indexOf(feature.layer.id) >= 0;
  };
  this.mapFilter = new map_filter["default"]({
    map: this.map,
    searchContext: self.showRelatedQuery
  });
  this.updateHoverId = function (val) {
    self.hoverId() === val.resourceinstanceid ? self.hoverId(null) : self.hoverId(val.resourceinstanceid);
  };
  this.mapFilter.filter.feature_collection.subscribe(function (val) {
    if (self.widget && self.widget.node.config.graphs().length && val.features && val.features.length > 0) {
      var graphs = self.widget.node.config.graphs().map(function (v) {
        if (v.graphid) {
          return v.graphid;
        }
      });
      var payload = {
        "map-filter": JSON.stringify(val),
        "precision": 6,
        "pages": 5,
        "resource-type-filter": JSON.stringify(graphs.map(function (graph) {
          return {
            "graphid": graph,
            "inverted": false
          };
        }))
      };
      jquery_min_default().ajax({
        url: arches["default"].urls.search_results,
        data: payload,
        method: 'GET'
      }).done(function (data) {
        self.relatedResourceWidgets.forEach(function (widget) {
          if (knockout_latest_default().unwrap(self.tile.data[widget.node.nodeid])) {
            self.tile.data[widget.node.nodeid]([]);
          }
        });
        data.results.hits.hits.forEach(function (hit) {
          var resourceInstance = hit._source;
          if (graphs.indexOf(resourceInstance.graph_id) > -1) {
            self.relateResource({
              resourceinstanceid: resourceInstance.resourceinstanceid,
              graphid: resourceInstance.graph_id,
              displayname: resourceInstance.displayname
            }, self.widget);
          }
        });
        var buffer = data['map-filter'].search_buffer;
        self.map().getSource('geojson-search-buffer-data').setData(buffer);
      });
    }
  });
  this.appendBufferToTileFeatures = function (val) {
    var bufferFeature = {
      geometry: self.map().getSource('geojson-search-buffer-data').serialize().data
    };
    bufferFeature.type = 'Feature';
    bufferFeature.properties = {};
    var bufferFeatureId = self.draw.add(bufferFeature)[0];
    self.draw.setFeatureProperty(bufferFeatureId, 'nodeId', val);
    self.updateTiles();
  };
  this.drawAvailable.subscribe(function (val) {
    if (!params.draw) {
      params.draw = self.draw;
    }
    if (!params.map) {
      params.map = self.map();
    }
    var bufferSrcId = 'geojson-search-buffer-data';
    self.widget = self.widgets.find(function (widget) {
      return widget.datatype.datatype === 'resource-instance' || widget.datatype.datatype === 'resource-instance-list';
    });
    if (val) {
      self.mapFilter.draw = self.draw;
      self.mapFilter.setupDraw();
      self.map().addSource(bufferSrcId, self.mapFilter.sources[bufferSrcId]);
      self.mapFilter.layers().forEach(function (layer) {
        self.map().addLayer(layer);
        extendedLayers.push(layer);
      });
      self.map().on('mousemove', function (e) {
        var features = self.map().queryRenderedFeatures(e.point);
        var feature;
        if (features.length && features[0].properties.resourceinstanceid) {
          feature = features[0].properties.resourceinstanceid;
          if (self.relatedResources().filter(function (val) {
            return val.resourceinstanceid === feature;
          }).length) {
            self.hoverId(feature);
          }
        } else {
          self.hoverId(null);
        }
      });
    }
  });
};
knockout_latest_default().components.register('related-resources-map-card', {
  viewModel: viewModel,
  template: related_resources_map_namespaceObject
});
/* harmony default export */ const related_resources_map = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMDc2YWM1ZDgxZGMyOTQ1YTg5MDAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDRztBQUNlO0FBQ0U7QUFDZjtBQUNtQztBQUNSO0FBQ0E7QUFDdUM7QUFDTztBQUNXO0FBR2hILElBQUlXLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFZQyxNQUFNLEVBQUU7RUFDN0IsSUFBSUMsSUFBSSxHQUFHLElBQUk7RUFHZixJQUFJLENBQUNDLE9BQU8sR0FBRyxFQUFFO0VBQ2pCRixNQUFNLENBQUNHLFVBQVUsR0FBRyxDQUNoQixxQkFBcUIsRUFDckIsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUNuQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixjQUFjLEVBQ2QsYUFBYSxFQUNiLGNBQWMsRUFDZCxTQUFTLEVBQ1QsYUFBYSxFQUNiLFdBQVcsRUFDWCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixvQkFBb0IsQ0FDdkI7RUFDRFYseUJBQXNCLENBQUNXLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQ0osTUFBTSxDQUFDLENBQUM7RUFDNUMsSUFBSUssaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0VBQzFCQSxpQkFBaUIsQ0FBQ0MsWUFBWSxHQUFHLElBQUksQ0FBQ0EsWUFBWSxDQUFDLENBQUM7RUFDcERELGlCQUFpQixDQUFDRSxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjLENBQUMsQ0FBQztFQUN4REYsaUJBQWlCLENBQUNHLFVBQVUsR0FBRyxJQUFJLENBQUNBLFVBQVUsQ0FBQyxDQUFDO0VBQ2hESCxpQkFBaUIsQ0FBQ0ksWUFBWSxHQUFHLE9BQU8sSUFBSSxDQUFDQSxZQUFZLENBQUMsQ0FBQyxLQUFLLFFBQVEsR0FBRyxJQUFJLENBQUNBLFlBQVksQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJ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SUFBSTNHLElBQUksQ0FBQ3NHLGdCQUFnQixDQUFDLENBQUMsQ0FBQ0QsTUFBTSxDQUFDLFVBQVNvQixHQUFHLEVBQUM7WUFBQyxPQUFPQSxHQUFHLENBQUNkLGtCQUFrQixLQUFLZ0UsT0FBTztVQUFDLENBQUMsQ0FBQyxDQUFDMUUsTUFBTSxFQUFFO1lBQ2xHakcsSUFBSSxDQUFDK0UsT0FBTyxDQUFDNEYsT0FBTyxDQUFDO1VBQ3pCO1FBQ0osQ0FBQyxNQUFNO1VBQ0gzSyxJQUFJLENBQUMrRSxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3RCO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFDSixDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQzRixvQ0FBYSxDQUFDMk4sUUFBUSxDQUFDLDRCQUE0QixFQUFFO0VBQ2pEak4sU0FBUyxFQUFFQSxTQUFTO0VBQ3BCa04sUUFBUSxFQUFFcE4scUNBQTJCQTtBQUN6QyxDQUFDLENBQUM7QUFDRiw0REFBZUUsU0FBUyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9jYXJkcy9yZWxhdGVkLXJlc291cmNlcy1tYXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQga29NYXBwaW5nIGZyb20gJ2tub2Nrb3V0LW1hcHBpbmcnO1xuaW1wb3J0IGdlb2pzb25FeHRlbnQgZnJvbSAnZ2VvanNvbi1leHRlbnQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IENhcmRDb21wb25lbnRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy9jYXJkLWNvbXBvbmVudCc7XG5pbXBvcnQgTWFwRWRpdG9yVmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvbWFwLWVkaXRvcic7XG5pbXBvcnQgTWFwRmlsdGVyVmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvbWFwLWZpbHRlcic7XG5pbXBvcnQgc2VsZWN0RmVhdHVyZUxheWVyc0ZhY3RvcnkgZnJvbSAndmlld3MvY29tcG9uZW50cy9jYXJkcy9zZWxlY3QtcmVsYXRlZC1mZWF0dXJlLWxheWVycyc7XG5pbXBvcnQgcmVsYXRlZFJlc291cmNlc01hcFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2NhcmRzL3JlbGF0ZWQtcmVzb3VyY2VzLW1hcC5odG0nO1xuaW1wb3J0IHJlbGF0ZWRSZXNvdXJjZXNNYXBQb3B1cFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2NhcmRzL3JlbGF0ZWQtcmVzb3VyY2VzLW1hcC1wb3B1cC5odG0nO1xuXG5cbnZhciB2aWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuXG4gICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgcGFyYW1zLmNvbmZpZ0tleXMgPSBbXG4gICAgICAgICdzZWxlY3RSZWxhdGVkU291cmNlJyxcbiAgICAgICAgJ3NlbGVjdFJlbGF0ZWRTb3VyY2VMYXllcicsXG4gICAgICAgICdzZWxlY3RMYXllckNvbmZpZycsXG4gICAgICAgICdkZWZhdWx0Y29sb3InLFxuICAgICAgICAnc2VsZWN0aW9uY29sb3InLFxuICAgICAgICAnaG92ZXJjb2xvcicsXG4gICAgICAgICdjb2xvcnBhbGV0dGUnLFxuICAgICAgICAnZmlsbG9wYWNpdHknLFxuICAgICAgICAnb3ZlcnZpZXd6b29tJyxcbiAgICAgICAgJ21pbnpvb20nLFxuICAgICAgICAncG9pbnRyYWRpdXMnLFxuICAgICAgICAnbGluZXdpZHRoJyxcbiAgICAgICAgJ3N0cm9rZWNvbG9yJyxcbiAgICAgICAgJ3N0cm9rZWxpbmV3aWR0aCcsXG4gICAgICAgICdzdHJva2Vwb2ludHJhZGl1cycsXG4gICAgICAgICdzdHJva2Vwb2ludG9wYWNpdHknXG4gICAgXTtcbiAgICBDYXJkQ29tcG9uZW50Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcbiAgICB2YXIgc2VsZWN0TGF5ZXJDb25maWcgPSB7fTtcbiAgICBzZWxlY3RMYXllckNvbmZpZy5kZWZhdWx0Y29sb3IgPSB0aGlzLmRlZmF1bHRjb2xvcigpO1xuICAgIHNlbGVjdExheWVyQ29uZmlnLnNlbGVjdGlvbmNvbG9yID0gdGhpcy5zZWxlY3Rpb25jb2xvcigpO1xuICAgIHNlbGVjdExheWVyQ29uZmlnLmhvdmVyY29sb3IgPSB0aGlzLmhvdmVyY29sb3IoKTtcbiAgICBzZWxlY3RMYXllckNvbmZpZy5jb2xvcnBhbGV0dGUgPSB0eXBlb2YgdGhpcy5jb2xvcnBhbGV0dGUoKSA9PT0gJ3N0cmluZycgPyB0aGlzLmNvbG9ycGFsZXR0ZSgpLnNwbGl0KFwiLFwiKSA6IHRoaXMuY29sb3JwYWxldHRlKCk7XG4gICAgc2VsZWN0TGF5ZXJDb25maWcuZmlsbG9wYWNpdHkgPSBOdW1iZXIodGhpcy5maWxsb3BhY2l0eSgpKTtcbiAgICBzZWxlY3RMYXllckNvbmZpZy5vdmVydmlld3pvb20gPSBOdW1iZXIodGhpcy5vdmVydmlld3pvb20oKSk7XG4gICAgc2VsZWN0TGF5ZXJDb25maWcubWluem9vbSA9IE51bWJlcih0aGlzLm1pbnpvb20oKSk7XG4gICAgc2VsZWN0TGF5ZXJDb25maWcucG9pbnRyYWRpdXMgPSBOdW1iZXIodGhpcy5wb2ludHJhZGl1cygpKTtcbiAgICBzZWxlY3RMYXllckNvbmZpZy5saW5ld2lkdGggPSBOdW1iZXIodGhpcy5saW5ld2lkdGgoKSk7XG4gICAgc2VsZWN0TGF5ZXJDb25maWcuc3Ryb2tlY29sb3IgPSB0aGlzLnN0cm9rZWNvbG9yKCk7XG4gICAgc2VsZWN0TGF5ZXJDb25maWcuc3Ryb2tlbGluZXdpZHRoID0gTnVtYmVyKHRoaXMuc3Ryb2tlbGluZXdpZHRoKCkpO1xuICAgIHNlbGVjdExheWVyQ29uZmlnLnN0cm9rZXBvaW50cmFkaXVzID0gTnVtYmVyKHRoaXMuc3Ryb2tlcG9pbnRyYWRpdXMoKSk7XG4gICAgc2VsZWN0TGF5ZXJDb25maWcuc3Ryb2tlcG9pbnRvcGFjaXR5ID0gTnVtYmVyKHRoaXMuc3Ryb2tlcG9pbnRvcGFjaXR5KCkpO1xuICAgIGlmIChzZWxmLmZvcm0gJiYgc2VsZi50aWxlKSBzZWxmLmNhcmQud2lkZ2V0cygpLmZvckVhY2goZnVuY3Rpb24od2lkZ2V0KSB7XG4gICAgICAgIHZhciBpZCA9IHdpZGdldC5ub2RlX2lkKCk7XG4gICAgICAgIHZhciB0eXBlID0ga28udW53cmFwKHNlbGYuZm9ybS5ub2RlTG9va3VwW2lkXS5kYXRhdHlwZSk7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdyZXNvdXJjZS1pbnN0YW5jZScgfHwgdHlwZSA9PT0gJ3Jlc291cmNlLWluc3RhbmNlLWxpc3QnIHx8IHR5cGUgPT09ICdnZW9qc29uLWZlYXR1cmUtY29sbGVjdGlvbicpIHtcbiAgICAgICAgICAgIHNlbGYud2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBnZXROb2RlSWRzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIG5vZGVpZHMgPSBbXTtcbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0UmVsYXRlZFNvdXJjZSgpKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlVXJsID0gbmV3IHdpbmRvdy5VUkwoYXJjaGVzLm1hcFNvdXJjZXNbc2VsZi5zZWxlY3RSZWxhdGVkU291cmNlKCldLmRhdGEsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gc291cmNlVXJsLnNlYXJjaFBhcmFtcy5nZXQoJ25vZGVpZHMnKTtcbiAgICAgICAgICAgIHZhciBub2RlID0gc291cmNlVXJsLnNlYXJjaFBhcmFtcy5nZXQoJ25vZGVpZCcpO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlaWRzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlaWRzID0gbm9kZWlkcy5jb25jYXQobm9kZXMuc3BsaXQoJywnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVpZHM7XG4gICAgfTtcblxuICAgIC8qIFxuICAgICAgICBzZXQvZ2V0IGxvZ2ljIHRvIGVuc3VyZSBhbGwgZGF0YSB2YWx1ZXMgYXJlIGVxdWFsIGJldHdlZW4gcGFyZW50IGFuZCBjaGlsZHJlblxuICAgICovXG5cbiAgICB0aGlzLmJhc2VtYXAgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5vdmVybGF5Q29uZmlncyA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmNlbnRlclggPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5jZW50ZXJZID0ga28ub2JzZXJ2YWJsZSgpO1xuXG4gICAgZm9yICh2YXIgd2lkZ2V0IG9mIHNlbGYud2lkZ2V0cykge1xuICAgICAgICBpZiAod2lkZ2V0LmNvbmZpZy5iYXNlbWFwKSB7XG4gICAgICAgICAgICBzZWxmLmJhc2VtYXAod2lkZ2V0LmNvbmZpZy5iYXNlbWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWRnZXQuY29uZmlnLm92ZXJsYXlDb25maWdzKSB7XG4gICAgICAgICAgICBzZWxmLm92ZXJsYXlDb25maWdzKHdpZGdldC5jb25maWcub3ZlcmxheUNvbmZpZ3MoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZGdldC5jb25maWcuY2VudGVyWCkge1xuICAgICAgICAgICAgc2VsZi5jZW50ZXJYKHdpZGdldC5jb25maWcuY2VudGVyWCgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkZ2V0LmNvbmZpZy5jZW50ZXJZKSB7XG4gICAgICAgICAgICBzZWxmLmNlbnRlclkod2lkZ2V0LmNvbmZpZy5jZW50ZXJZKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5iYXNlbWFwLnN1YnNjcmliZShmdW5jdGlvbihtYXApIHtcbiAgICAgICAgZm9yICh2YXIgd2lkZ2V0IG9mIHNlbGYud2lkZ2V0cykge1xuICAgICAgICAgICAgaWYgKHdpZGdldC5jb25maWcuYmFzZW1hcCkge1xuICAgICAgICAgICAgICAgIHdpZGdldC5jb25maWcuYmFzZW1hcChtYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vdmVybGF5Q29uZmlncy5zdWJzY3JpYmUoZnVuY3Rpb24oY29uZmlncykge1xuICAgICAgICBmb3IgKHZhciB3aWRnZXQgb2Ygc2VsZi53aWRnZXRzKSB7XG4gICAgICAgICAgICBpZiAod2lkZ2V0LmNvbmZpZy5vdmVybGF5Q29uZmlncykge1xuICAgICAgICAgICAgICAgIHdpZGdldC5jb25maWcub3ZlcmxheUNvbmZpZ3MoY29uZmlncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmNlbnRlclguc3Vic2NyaWJlKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgZm9yICh2YXIgd2lkZ2V0IG9mIHNlbGYud2lkZ2V0cykge1xuICAgICAgICAgICAgaWYgKHdpZGdldC5jb25maWcuY2VudGVyWCkge1xuICAgICAgICAgICAgICAgIHdpZGdldC5jb25maWcuY2VudGVyWCh4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY2VudGVyWS5zdWJzY3JpYmUoZnVuY3Rpb24oeSkge1xuICAgICAgICBmb3IgKHZhciB3aWRnZXQgb2Ygc2VsZi53aWRnZXRzKSB7XG4gICAgICAgICAgICBpZiAod2lkZ2V0LmNvbmZpZy5jZW50ZXJZKSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmNvbmZpZy5jZW50ZXJZKHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy56b29tID0ga28ub2JzZXJ2YWJsZSh0aGlzLm92ZXJ2aWV3em9vbSgpKTtcbiAgICB0aGlzLnpvb20uc3Vic2NyaWJlKGZ1bmN0aW9uKHpvb20pIHtcbiAgICAgICAgc2VsZi5jb25maWcub3ZlcnZpZXd6b29tKHpvb20pO1xuXG4gICAgICAgIGZvciAodmFyIHdpZGdldCBvZiBzZWxmLndpZGdldHMpIHtcbiAgICAgICAgICAgIGlmICh3aWRnZXQuY29uZmlnLnpvb20pIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQuY29uZmlnLnpvb20oem9vbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qIGVuZCBsb2NhbCBzZXQvZ2V0ICovIFxuICAgIFxuICAgIHBhcmFtcy5iYXNlbWFwID0gdGhpcy5iYXNlbWFwO1xuICAgIHBhcmFtcy5vdmVybGF5Q29uZmlncyA9IHRoaXMub3ZlcmxheUNvbmZpZ3M7XG4gICAgcGFyYW1zLnggPSB0aGlzLmNlbnRlclg7XG4gICAgcGFyYW1zLnkgPSB0aGlzLmNlbnRlclk7XG4gICAgcGFyYW1zLnpvb20gPSB0aGlzLnpvb207XG4gICAgXG4gICAgdGhpcy5ob3ZlcklkID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMubm9kZWlkcyA9IGdldE5vZGVJZHMoKTtcbiAgICB0aGlzLm5vZGVEZXRhaWxzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgdGhpcy5ub2RlaWRzLmZvckVhY2goZnVuY3Rpb24obm9kZWlkKSB7XG4gICAgICAgIGZldGNoKGFyY2hlcy51cmxzLmFwaV9ub2Rlcyhub2RlaWQpKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlRGV0YWlscy5wdXNoKGRhdGFbMF0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgcGFyc2VkTm9kZUlkcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5ub2RlaWRzKSk7XG4gICAgdmFyIGZpcnN0Tm9kZSA9IHBhcnNlZE5vZGVJZHMubGVuZ3RoID4gMCA/IFtwYXJzZWROb2RlSWRzWzBdXSA6IFtdO1xuICAgIHRoaXMuZmlsdGVyTm9kZUlkcyA9IGtvLm9ic2VydmFibGVBcnJheShmaXJzdE5vZGUpO1xuICAgIHRoaXMucmVsYXRlZFJlc291cmNlRGV0YWlscyA9IHt9O1xuICAgIHRoaXMucmVsYXRlZFJlc291cmNlV2lkZ2V0cyA9IHRoaXMud2lkZ2V0cy5maWx0ZXIoZnVuY3Rpb24od2lkZ2V0KXtyZXR1cm4gd2lkZ2V0LmRhdGF0eXBlLmRhdGF0eXBlID09PSAncmVzb3VyY2UtaW5zdGFuY2UnIHx8IHdpZGdldC5kYXRhdHlwZS5kYXRhdHlwZSA9PT0gJ3Jlc291cmNlLWluc3RhbmNlLWxpc3QnO30pO1xuICAgIHRoaXMucmVsYXRlZFJlc291cmNlcyA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRpbGVSZXNvdXJjZUlkcyA9IFtdO1xuICAgICAgICBzZWxmLnJlbGF0ZWRSZXNvdXJjZVdpZGdldHMuZm9yRWFjaChmdW5jdGlvbih3aWRnZXQpIHtcbiAgICAgICAgICAgIHZhciBub2RlaWQgPSBrby51bndyYXAod2lkZ2V0Lm5vZGVfaWQpO1xuICAgICAgICAgICAgdmFyIHJlbGF0ZWQgPSBzZWxmLnRpbGUuZGF0YVtub2RlaWRdKCk7XG4gICAgICAgICAgICBpZiAocmVsYXRlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYudGlsZS5kYXRhW25vZGVpZF0oKS5mb3JFYWNoKGZ1bmN0aW9uKHJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNvdXJjZWluc3RhbmNlaWQgPSBrby51bndyYXAocnIucmVzb3VyY2VJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNvdXJjZWluc3RhbmNlaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVSZXNvdXJjZUlkcy5wdXNoKHJlc291cmNlaW5zdGFuY2VpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGYucmVsYXRlZFJlc291cmNlRGV0YWlsc1tyZXNvdXJjZWluc3RhbmNlaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmZldGNoKGFyY2hlcy51cmxzLnNlYXJjaF9yZXN1bHRzICsgXCI/aWQ9XCIgKyByZXNvdXJjZWluc3RhbmNlaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlscyA9IGpzb24ucmVzdWx0cy5oaXRzLmhpdHNbMF0uX3NvdXJjZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWxhdGVkUmVzb3VyY2VEZXRhaWxzW3Jlc291cmNlaW5zdGFuY2VpZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpZDogZGV0YWlscy5ncmFwaF9pZCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VpbnN0YW5jZWlkOiByZXNvdXJjZWluc3RhbmNlaWQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXluYW1lOiBkZXRhaWxzLmRpc3BsYXluYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb21ldHJpZXM6IGRldGFpbHMuZ2VvbWV0cmllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbGUuZGF0YVtub2RlaWRdLnZhbHVlSGFzTXV0YXRlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRpbGVSZXNvdXJjZUlkc1xuICAgICAgICAgICAgLm1hcChmdW5jdGlvbihyZXNvdXJjZWlkKXtyZXR1cm4gc2VsZi5yZWxhdGVkUmVzb3VyY2VEZXRhaWxzW3Jlc291cmNlaWRdO30pXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKHZhbCl7cmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkO30pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaG93UmVsYXRlZFF1ZXJ5ID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdmFyIHJlc291cmNlQm91bmRzID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHZhciBzZWxlY3RSZWxhdGVkU291cmNlID0gdGhpcy5zZWxlY3RSZWxhdGVkU291cmNlKCk7XG4gICAgdmFyIHNlbGVjdFJlbGF0ZWRTb3VyY2VMYXllciA9IHRoaXMuc2VsZWN0UmVsYXRlZFNvdXJjZUxheWVyKCk7XG4gICAgdmFyIHNlbGVjdGVkUmVzb3VyY2VJZHMgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlkcyA9IFtdO1xuICAgICAgICBzZWxmLnJlbGF0ZWRSZXNvdXJjZVdpZGdldHMuZm9yRWFjaChmdW5jdGlvbih3aWRnZXQpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IHdpZGdldC5ub2RlX2lkKCk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBrby51bndyYXAoc2VsZi50aWxlLmRhdGFbaWRdKSA/IGtvTWFwcGluZy50b0pTKHNlbGYudGlsZS5kYXRhW2lkXSgpLm1hcChmdW5jdGlvbihpdGVtKXtyZXR1cm4gaXRlbS5yZXNvdXJjZUlkO30pKSA6IG51bGw7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZHMgPSBpZHMuY29uY2F0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpZHM7XG4gICAgfSk7XG5cbiAgICB2YXIgdXBkYXRlUmVzb3VyY2VCb3VuZHMgPSBmdW5jdGlvbihpZHMpIHtcbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkLmdldEpTT04oe1xuICAgICAgICAgICAgICAgIHVybDogYXJjaGVzLnVybHMuZ2VvanNvbixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlaWQ6IGlkcy5qb2luKCcsJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihnZW9qc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoID4gMCkgcmVzb3VyY2VCb3VuZHMoZ2VvanNvbkV4dGVudChnZW9qc29uKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdXBkYXRlUmVzb3VyY2VCb3VuZHMoc2VsZWN0ZWRSZXNvdXJjZUlkcygpKTtcbiAgICBzZWxlY3RlZFJlc291cmNlSWRzLnN1YnNjcmliZSh1cGRhdGVSZXNvdXJjZUJvdW5kcyk7XG5cbiAgICB2YXIgem9vbVRvRGF0YSA9IHRydWU7XG4gICAgcmVzb3VyY2VCb3VuZHMuc3Vic2NyaWJlKGZ1bmN0aW9uKGJvdW5kcykge1xuICAgICAgICB2YXIgbWFwID0gc2VsZi5tYXAoKTtcbiAgICAgICAgaWYgKG1hcCAmJiBtYXAuZ2V0U3R5bGUoKSAmJiB6b29tVG9EYXRhKSB7XG4gICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG4gICAgICAgIH1cbiAgICAgICAgem9vbVRvRGF0YSA9IHRydWU7XG4gICAgfSk7XG4gICAgdmFyIHNlbGVjdEZlYXR1cmVMYXllcnMgPSBzZWxlY3RGZWF0dXJlTGF5ZXJzRmFjdG9yeShzZWxlY3RSZWxhdGVkU291cmNlLCBzZWxlY3RSZWxhdGVkU291cmNlTGF5ZXIsIHNlbGVjdGVkUmVzb3VyY2VJZHMoKSwgdHJ1ZSwgbnVsbCwgdGhpcy5ub2RlaWRzLCB0aGlzLmZpbHRlck5vZGVJZHMoKSwgc2VsZi5ob3ZlcklkKCksIHNlbGVjdExheWVyQ29uZmlnKTtcbiAgICB2YXIgc291cmNlcyA9IFtdO1xuICAgIGZvciAodmFyIHNvdXJjZU5hbWUgaW4gYXJjaGVzLm1hcFNvdXJjZXMpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmNoZXMubWFwU291cmNlcywgc291cmNlTmFtZSkpIHtcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaChzb3VyY2VOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgdXBkYXRlUmVzb3VyY2VTZWxlY3RMYXllcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHNlbGYuc2VsZWN0UmVsYXRlZFNvdXJjZSgpO1xuICAgICAgICB2YXIgc291cmNlTGF5ZXIgPSBzZWxmLnNlbGVjdFJlbGF0ZWRTb3VyY2VMYXllcigpO1xuICAgICAgICBzZWxlY3RGZWF0dXJlTGF5ZXJzID0gc291cmNlcy5pbmRleE9mKHNvdXJjZSkgPiAwID9cbiAgICAgICAgICAgIHNlbGVjdEZlYXR1cmVMYXllcnNGYWN0b3J5KHNvdXJjZSwgc291cmNlTGF5ZXIsIHNlbGVjdGVkUmVzb3VyY2VJZHMoKSwgdHJ1ZSwgbnVsbCwgc2VsZi5ub2RlaWRzLCBzZWxmLmZpbHRlck5vZGVJZHMoKSwgc2VsZi5ob3ZlcklkKCksIHNlbGVjdExheWVyQ29uZmlnKSA6XG4gICAgICAgICAgICBbXTtcbiAgICAgICAgc2VsZi5hZGRpdGlvbmFsTGF5ZXJzKFxuICAgICAgICAgICAgc2VsZWN0RmVhdHVyZUxheWVycy5jb25jYXQoXG4gICAgICAgICAgICAgICAgZXh0ZW5kZWRMYXllcnNcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIHNlbGVjdGVkUmVzb3VyY2VJZHMuc3Vic2NyaWJlKHVwZGF0ZVJlc291cmNlU2VsZWN0TGF5ZXJzKTtcbiAgICB0aGlzLnNlbGVjdFJlbGF0ZWRTb3VyY2Uuc3Vic2NyaWJlKHVwZGF0ZVJlc291cmNlU2VsZWN0TGF5ZXJzKTtcbiAgICB0aGlzLnNlbGVjdFJlbGF0ZWRTb3VyY2VMYXllci5zdWJzY3JpYmUodXBkYXRlUmVzb3VyY2VTZWxlY3RMYXllcnMpO1xuICAgIHRoaXMuZmlsdGVyTm9kZUlkcy5zdWJzY3JpYmUodXBkYXRlUmVzb3VyY2VTZWxlY3RMYXllcnMpO1xuICAgIHRoaXMuaG92ZXJJZC5zdWJzY3JpYmUodXBkYXRlUmVzb3VyY2VTZWxlY3RMYXllcnMpO1xuXG4gICAgcGFyYW1zLmFjdGl2ZVRhYiA9ICdlZGl0b3InO1xuXG4gICAgdmFyIGV4dGVuZGVkTGF5ZXJzID0gW107XG4gICAgaWYgKHBhcmFtcy5sYXllcnMpIHtcbiAgICAgICAgZXh0ZW5kZWRMYXllcnMgPSBwYXJhbXMubGF5ZXJzO1xuICAgIH1cblxuICAgIHBhcmFtcy5sYXllcnMgPSBrby5vYnNlcnZhYmxlKFxuICAgICAgICBleHRlbmRlZExheWVycy5jb25jYXQoc2VsZWN0RmVhdHVyZUxheWVycylcbiAgICApO1xuXG4gICAgcGFyYW1zLmZpdEJvdW5kcyA9IHJlc291cmNlQm91bmRzO1xuICAgIE1hcEVkaXRvclZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG5cbiAgICB0aGlzLnJlbGF0ZVJlc291cmNlID0gZnVuY3Rpb24ocmVzb3VyY2VEYXRhLCB3aWRnZXQpIHtcbiAgICAgICAgdmFyIGlkID0gd2lkZ2V0Lm5vZGVfaWQoKTtcbiAgICAgICAgdmFyIHJlc291cmNlaW5zdGFuY2VpZCA9IGtvLnVud3JhcChyZXNvdXJjZURhdGEucmVzb3VyY2VpbnN0YW5jZWlkKTtcbiAgICAgICAgdmFyIHR5cGUgPSBrby51bndyYXAoc2VsZi5mb3JtLm5vZGVMb29rdXBbaWRdLmRhdGF0eXBlKTtcbiAgICAgICAgc2VsZi5yZWxhdGVkUmVzb3VyY2VEZXRhaWxzW2tvLnVud3JhcChyZXNvdXJjZURhdGEucmVzb3VyY2VpbnN0YW5jZWlkKV0gPSB7XG4gICAgICAgICAgICBncmFwaGlkOiBrby51bndyYXAocmVzb3VyY2VEYXRhLmdyYXBoaWQpLFxuICAgICAgICAgICAgZGlzcGxheW5hbWU6IGtvLnVud3JhcChyZXNvdXJjZURhdGEuZGlzcGxheW5hbWUpLFxuICAgICAgICAgICAgcmVzb3VyY2VpbnN0YW5jZWlkOiBrby51bndyYXAocmVzb3VyY2VEYXRhLnJlc291cmNlaW5zdGFuY2VpZClcbiAgICAgICAgfTtcbiAgICAgICAgem9vbVRvRGF0YSA9IGZhbHNlO1xuICAgICAgICB2YXIgZ3JhcGhjb25maWcgPSB3aWRnZXQubm9kZS5jb25maWcuZ3JhcGhzKCkuZmluZChmdW5jdGlvbihncmFwaCl7cmV0dXJuIGdyYXBoLmdyYXBoaWQgPT09IGtvLnVud3JhcChyZXNvdXJjZURhdGEuZ3JhcGhpZCk7fSk7XG4gICAgICAgIHZhciB2YWwgPSBbe1xuICAgICAgICAgICAgb250b2xvZ3lQcm9wZXJ0eToga28ub2JzZXJ2YWJsZShncmFwaGNvbmZpZz8ub250b2xvZ3lQcm9wZXJ0eSB8fCAnJyksXG4gICAgICAgICAgICBpbnZlcnNlT250b2xvZ3lQcm9wZXJ0eToga28ub2JzZXJ2YWJsZShncmFwaGNvbmZpZz8ub250b2xvZ3lQcm9wZXJ0eSB8fCAnJyksXG4gICAgICAgICAgICByZXNvdXJjZUlkOiByZXNvdXJjZWluc3RhbmNlaWQsXG4gICAgICAgICAgICByZXNvdXJjZVhyZXNvdXJjZUlkOiBcIlwiLFxuICAgICAgICB9XTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdyZXNvdXJjZS1pbnN0YW5jZScpIHtcbiAgICAgICAgICAgIHNlbGYudGlsZS5kYXRhW2lkXSh2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0ga29NYXBwaW5nLnRvSlMoc2VsZi50aWxlLmRhdGFbaWRdKTtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpbGUuZGF0YVtpZF0odmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUubWFwKGZ1bmN0aW9uKHJyKXtyZXR1cm4gcnIucmVzb3VyY2VJZDt9KS5pbmRleE9mKHJlc291cmNlaW5zdGFuY2VpZCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHZhbHVlLmNvbmNhdCh2YWwpO1xuICAgICAgICAgICAgICAgIHNlbGYudGlsZS5kYXRhW2lkXSh2YWx1ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhpcy51bnJlbGF0ZVJlc291cmNlID0gZnVuY3Rpb24ocmVzb3VyY2VEYXRhLCB3aWRnZXQpIHtcbiAgICAgICAgdmFyIGlkID0gd2lkZ2V0Lm5vZGVfaWQoKTtcbiAgICAgICAgdmFyIHJlc291cmNlaW5zdGFuY2VpZCA9IGtvLnVud3JhcChyZXNvdXJjZURhdGEucmVzb3VyY2VpbnN0YW5jZWlkKTtcbiAgICAgICAgdmFyIHJlbGF0ZWQgPSByZXNvdXJjZURhdGEubWFwQ2FyZC50aWxlLmRhdGFbaWRdKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcmVsYXRlZC5sZW5ndGg7IGkrKyl7IFxuICAgICAgICAgICAgaWYgKCBrby51bndyYXAocmVsYXRlZFtpXS5yZXNvdXJjZUlkKSA9PT0gcmVzb3VyY2VpbnN0YW5jZWlkKSB7IFxuICAgICAgICAgICAgICAgIHJlbGF0ZWQuc3BsaWNlKGksIDEpOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXNvdXJjZURhdGEubWFwQ2FyZC50aWxlLmRhdGFbaWRdKHJlbGF0ZWQpO1xuICAgIH07XG5cbiAgICB0aGlzLmlzU2VsZWN0YWJsZSA9IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgdmFyIHNlbGVjdExheWVySWRzID0gc2VsZWN0RmVhdHVyZUxheWVycy5tYXAoZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXllci5pZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RMYXllcklkcy5pbmRleE9mKGZlYXR1cmUubGF5ZXIuaWQpID49IDA7XG4gICAgfTtcblxuICAgIHRoaXMubWFwRmlsdGVyID0gbmV3IE1hcEZpbHRlclZpZXdNb2RlbCh7XG4gICAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICAgIHNlYXJjaENvbnRleHQ6IHNlbGYuc2hvd1JlbGF0ZWRRdWVyeVxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVIb3ZlcklkID0gZnVuY3Rpb24odmFsKXtcbiAgICAgICAgc2VsZi5ob3ZlcklkKCkgPT09IHZhbC5yZXNvdXJjZWluc3RhbmNlaWQgPyBzZWxmLmhvdmVySWQobnVsbCkgOiBzZWxmLmhvdmVySWQodmFsLnJlc291cmNlaW5zdGFuY2VpZCk7XG4gICAgfTtcbiAgICB0aGlzLm1hcEZpbHRlci5maWx0ZXIuZmVhdHVyZV9jb2xsZWN0aW9uLnN1YnNjcmliZShmdW5jdGlvbih2YWwpe1xuICAgICAgICBpZiAoc2VsZi53aWRnZXQgJiYgc2VsZi53aWRnZXQubm9kZS5jb25maWcuZ3JhcGhzKCkubGVuZ3RoICYmIHZhbC5mZWF0dXJlcyAmJiB2YWwuZmVhdHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIGdyYXBocyA9IHNlbGYud2lkZ2V0Lm5vZGUuY29uZmlnLmdyYXBocygpLm1hcChmdW5jdGlvbih2KXtpZiAodi5ncmFwaGlkKXtyZXR1cm4gdi5ncmFwaGlkO319KTtcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgICAgICAgICAgIFwibWFwLWZpbHRlclwiOiBKU09OLnN0cmluZ2lmeSh2YWwpLFxuICAgICAgICAgICAgICAgIFwicHJlY2lzaW9uXCI6IDYsXG4gICAgICAgICAgICAgICAgXCJwYWdlc1wiOiA1LFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2UtdHlwZS1maWx0ZXJcIjogSlNPTi5zdHJpbmdpZnkoZ3JhcGhzLm1hcChmdW5jdGlvbihncmFwaCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJncmFwaGlkXCI6IGdyYXBoLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnZlcnRlZFwiOmZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkpfTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5zZWFyY2hfcmVzdWx0cyxcbiAgICAgICAgICAgICAgICBkYXRhOiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWxhdGVkUmVzb3VyY2VXaWRnZXRzLmZvckVhY2goZnVuY3Rpb24od2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrby51bndyYXAoc2VsZi50aWxlLmRhdGFbd2lkZ2V0Lm5vZGUubm9kZWlkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGlsZS5kYXRhW3dpZGdldC5ub2RlLm5vZGVpZF0oW10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGF0YS5yZXN1bHRzLmhpdHMuaGl0cy5mb3JFYWNoKGZ1bmN0aW9uKGhpdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzb3VyY2VJbnN0YW5jZSA9IGhpdC5fc291cmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhcGhzLmluZGV4T2YocmVzb3VyY2VJbnN0YW5jZS5ncmFwaF9pZCkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWxhdGVSZXNvdXJjZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzb3VyY2VpbnN0YW5jZWlkOiByZXNvdXJjZUluc3RhbmNlLnJlc291cmNlaW5zdGFuY2VpZCwgZ3JhcGhpZDogcmVzb3VyY2VJbnN0YW5jZS5ncmFwaF9pZCwgZGlzcGxheW5hbWU6IHJlc291cmNlSW5zdGFuY2UuZGlzcGxheW5hbWV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBkYXRhWydtYXAtZmlsdGVyJ10uc2VhcmNoX2J1ZmZlcjtcbiAgICAgICAgICAgICAgICBzZWxmLm1hcCgpLmdldFNvdXJjZSgnZ2VvanNvbi1zZWFyY2gtYnVmZmVyLWRhdGEnKS5zZXREYXRhKGJ1ZmZlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hcHBlbmRCdWZmZXJUb1RpbGVGZWF0dXJlcyA9IGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgIHZhciBidWZmZXJGZWF0dXJlID0ge2dlb21ldHJ5OiBzZWxmLm1hcCgpLmdldFNvdXJjZSgnZ2VvanNvbi1zZWFyY2gtYnVmZmVyLWRhdGEnKS5zZXJpYWxpemUoKS5kYXRhfTtcbiAgICAgICAgYnVmZmVyRmVhdHVyZS50eXBlID0gJ0ZlYXR1cmUnO1xuICAgICAgICBidWZmZXJGZWF0dXJlLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgdmFyIGJ1ZmZlckZlYXR1cmVJZCA9IHNlbGYuZHJhdy5hZGQoYnVmZmVyRmVhdHVyZSlbMF07XG4gICAgICAgIHNlbGYuZHJhdy5zZXRGZWF0dXJlUHJvcGVydHkoYnVmZmVyRmVhdHVyZUlkLCAnbm9kZUlkJywgdmFsKTtcbiAgICAgICAgc2VsZi51cGRhdGVUaWxlcygpO1xuICAgIH07XG5cbiAgICB0aGlzLmRyYXdBdmFpbGFibGUuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgIGlmICghcGFyYW1zLmRyYXcpIHtcbiAgICAgICAgICAgIHBhcmFtcy5kcmF3ID0gc2VsZi5kcmF3O1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGFyYW1zLm1hcCkge1xuICAgICAgICAgICAgcGFyYW1zLm1hcCA9IHNlbGYubWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYnVmZmVyU3JjSWQgPSAnZ2VvanNvbi1zZWFyY2gtYnVmZmVyLWRhdGEnO1xuICAgICAgICBzZWxmLndpZGdldCA9IHNlbGYud2lkZ2V0cy5maW5kKGZ1bmN0aW9uKHdpZGdldCl7XG4gICAgICAgICAgICByZXR1cm4gd2lkZ2V0LmRhdGF0eXBlLmRhdGF0eXBlID09PSAncmVzb3VyY2UtaW5zdGFuY2UnIHx8IHdpZGdldC5kYXRhdHlwZS5kYXRhdHlwZSA9PT0gJ3Jlc291cmNlLWluc3RhbmNlLWxpc3QnO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgc2VsZi5tYXBGaWx0ZXIuZHJhdyA9IHNlbGYuZHJhdztcbiAgICAgICAgICAgIHNlbGYubWFwRmlsdGVyLnNldHVwRHJhdygpO1xuICAgICAgICAgICAgc2VsZi5tYXAoKS5hZGRTb3VyY2UoYnVmZmVyU3JjSWQsIHNlbGYubWFwRmlsdGVyLnNvdXJjZXNbYnVmZmVyU3JjSWRdKTtcbiAgICAgICAgICAgIHNlbGYubWFwRmlsdGVyLmxheWVycygpLmZvckVhY2goZnVuY3Rpb24obGF5ZXIpe1xuICAgICAgICAgICAgICAgIHNlbGYubWFwKCkuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgICAgIGV4dGVuZGVkTGF5ZXJzLnB1c2gobGF5ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLm1hcCgpLm9uKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmZWF0dXJlcyA9IHNlbGYubWFwKCkucXVlcnlSZW5kZXJlZEZlYXR1cmVzKGUucG9pbnQpO1xuICAgICAgICAgICAgICAgIHZhciBmZWF0dXJlO1xuICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlcy5sZW5ndGggJiYgZmVhdHVyZXNbMF0ucHJvcGVydGllcy5yZXNvdXJjZWluc3RhbmNlaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZSA9IGZlYXR1cmVzWzBdLnByb3BlcnRpZXMucmVzb3VyY2VpbnN0YW5jZWlkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5yZWxhdGVkUmVzb3VyY2VzKCkuZmlsdGVyKGZ1bmN0aW9uKHZhbCl7cmV0dXJuIHZhbC5yZXNvdXJjZWluc3RhbmNlaWQgPT09IGZlYXR1cmU7fSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvdmVySWQoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvdmVySWQobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3JlbGF0ZWQtcmVzb3VyY2VzLW1hcC1jYXJkJywge1xuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiByZWxhdGVkUmVzb3VyY2VzTWFwVGVtcGxhdGUsXG59KTtcbmV4cG9ydCBkZWZhdWx0IHZpZXdNb2RlbDtcbiJdLCJuYW1lcyI6WyIkIiwia28iLCJrb01hcHBpbmciLCJnZW9qc29uRXh0ZW50IiwiYXJjaGVzIiwiQ2FyZENvbXBvbmVudFZpZXdNb2RlbCIsIk1hcEVkaXRvclZpZXdNb2RlbCIsIk1hcEZpbHRlclZpZXdNb2RlbCIsInNlbGVjdEZlYXR1cmVMYXllcnNGYWN0b3J5IiwicmVsYXRlZFJlc291cmNlc01hcFRlbXBsYXRlIiwicmVsYXRlZFJlc291cmNlc01hcFBvcHVwVGVtcGxhdGUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwid2lkZ2V0cyIsImNvbmZpZ0tleXMiLCJhcHBseSIsInNlbGVjdExheWVyQ29uZmlnIiwiZGVmYXVsdGNvbG9yIiwic2VsZWN0aW9uY29sb3IiLCJob3ZlcmNvbG9yIiwiY29sb3JwYWxldHRlIiwic3BsaXQiLCJmaWxsb3BhY2l0eSIsIk51bWJlciIsIm92ZXJ2aWV3em9vbSIsIm1pbnpvb20iLCJwb2ludHJhZGl1cyIsImxpbmV3aWR0aCIsInN0cm9rZWNvbG9yIiwic3Ryb2tlbGluZXdpZHRoIiwic3Ryb2tlcG9pbnRyYWRpdXMiLCJzdHJva2Vwb2ludG9wYWNpdHkiLCJmb3JtIiwidGlsZSIsImNhcmQiLCJmb3JFYWNoIiwid2lkZ2V0IiwiaWQiLCJub2RlX2lkIiwidHlwZSIsInVud3JhcCIsIm5vZGVMb29rdXAiLCJkYXRhdHlwZSIsInB1c2giLCJnZXROb2RlSWRzIiwibm9kZWlkcyIsInNlbGVjdFJlbGF0ZWRTb3VyY2UiLCJzb3VyY2VVcmwiLCJ3aW5kb3ciLCJVUkwiLCJtYXBTb3VyY2VzIiwiZGF0YSIsImxvY2F0aW9uIiwib3JpZ2luIiwibm9kZXMiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJub2RlIiwiY29uY2F0IiwiYmFzZW1hcCIsIm9ic2VydmFibGUiLCJvdmVybGF5Q29uZmlncyIsImNlbnRlclgiLCJjZW50ZXJZIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiY29uZmlnIiwiZXJyIiwiZSIsImYiLCJzdWJzY3JpYmUiLCJtYXAiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiY29uZmlncyIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJ4IiwiX2l0ZXJhdG9yNCIsIl9zdGVwNCIsInkiLCJfaXRlcmF0b3I1IiwiX3N0ZXA1Iiwiem9vbSIsIl9pdGVyYXRvcjYiLCJfc3RlcDYiLCJob3ZlcklkIiwibm9kZURldGFpbHMiLCJvYnNlcnZhYmxlQXJyYXkiLCJub2RlaWQiLCJmZXRjaCIsInVybHMiLCJhcGlfbm9kZXMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJwYXJzZWROb2RlSWRzIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiZmlyc3ROb2RlIiwibGVuZ3RoIiwiZmlsdGVyTm9kZUlkcyIsInJlbGF0ZWRSZXNvdXJjZURldGFpbHMiLCJyZWxhdGVkUmVzb3VyY2VXaWRnZXRzIiwiZmlsdGVyIiwicmVsYXRlZFJlc291cmNlcyIsInB1cmVDb21wdXRlZCIsInRpbGVSZXNvdXJjZUlkcyIsInJlbGF0ZWQiLCJyciIsInJlc291cmNlaW5zdGFuY2VpZCIsInJlc291cmNlSWQiLCJzZWFyY2hfcmVzdWx0cyIsIm9rIiwiZGV0YWlscyIsInJlc3VsdHMiLCJoaXRzIiwiX3NvdXJjZSIsImdyYXBoaWQiLCJncmFwaF9pZCIsImRpc3BsYXluYW1lIiwiZ2VvbWV0cmllcyIsInZhbHVlSGFzTXV0YXRlZCIsInJlc291cmNlaWQiLCJ2YWwiLCJ1bmRlZmluZWQiLCJzaG93UmVsYXRlZFF1ZXJ5IiwicmVzb3VyY2VCb3VuZHMiLCJzZWxlY3RSZWxhdGVkU291cmNlTGF5ZXIiLCJzZWxlY3RlZFJlc291cmNlSWRzIiwiY29tcHV0ZWQiLCJpZHMiLCJ0b0pTIiwiaXRlbSIsInVwZGF0ZVJlc291cmNlQm91bmRzIiwiZ2V0SlNPTiIsInVybCIsImdlb2pzb24iLCJqb2luIiwiZmVhdHVyZXMiLCJ6b29tVG9EYXRhIiwiYm91bmRzIiwiZ2V0U3R5bGUiLCJmaXRCb3VuZHMiLCJzZWxlY3RGZWF0dXJlTGF5ZXJzIiwic291cmNlcyIsInNvdXJjZU5hbWUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJ1cGRhdGVSZXNvdXJjZVNlbGVjdExheWVycyIsInNvdXJjZSIsInNvdXJjZUxheWVyIiwiaW5kZXhPZiIsImFkZGl0aW9uYWxMYXllcnMiLCJleHRlbmRlZExheWVycyIsImFjdGl2ZVRhYiIsImxheWVycyIsInJlbGF0ZVJlc291cmNlIiwicmVzb3VyY2VEYXRhIiwiZ3JhcGhjb25maWciLCJncmFwaHMiLCJmaW5kIiwiZ3JhcGgiLCJvbnRvbG9neVByb3BlcnR5IiwiaW52ZXJzZU9udG9sb2d5UHJvcGVydHkiLCJyZXNvdXJjZVhyZXNvdXJjZUlkIiwidmFsdWVzIiwidW5yZWxhdGVSZXNvdXJjZSIsIm1hcENhcmQiLCJpIiwic3BsaWNlIiwiaXNTZWxlY3RhYmxlIiwiZmVhdHVyZSIsInNlbGVjdExheWVySWRzIiwibGF5ZXIiLCJtYXBGaWx0ZXIiLCJzZWFyY2hDb250ZXh0IiwidXBkYXRlSG92ZXJJZCIsImZlYXR1cmVfY29sbGVjdGlvbiIsInYiLCJwYXlsb2FkIiwiYWpheCIsIm1ldGhvZCIsImhpdCIsInJlc291cmNlSW5zdGFuY2UiLCJidWZmZXIiLCJzZWFyY2hfYnVmZmVyIiwiZ2V0U291cmNlIiwic2V0RGF0YSIsImFwcGVuZEJ1ZmZlclRvVGlsZUZlYXR1cmVzIiwiYnVmZmVyRmVhdHVyZSIsImdlb21ldHJ5Iiwic2VyaWFsaXplIiwicHJvcGVydGllcyIsImJ1ZmZlckZlYXR1cmVJZCIsImRyYXciLCJhZGQiLCJzZXRGZWF0dXJlUHJvcGVydHkiLCJ1cGRhdGVUaWxlcyIsImRyYXdBdmFpbGFibGUiLCJidWZmZXJTcmNJZCIsInNldHVwRHJhdyIsImFkZFNvdXJjZSIsImFkZExheWVyIiwib24iLCJxdWVyeVJlbmRlcmVkRmVhdHVyZXMiLCJwb2ludCIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==