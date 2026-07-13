"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[82692],{

/***/ 82692:
/*!************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/map-editor.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ 84806);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var geojson_extent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! geojson-extent */ 50653);
/* harmony import */ var geojson_extent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(geojson_extent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var geojsonhint__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! geojsonhint */ 3863);
/* harmony import */ var geojsonhint__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(geojsonhint__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var togeojson__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! togeojson */ 69153);
/* harmony import */ var shpjsesm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shpjsesm */ 9823);
/* harmony import */ var proj4__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! proj4 */ 17898);
/* harmony import */ var proj4__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(proj4__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var mapbox_gl_draw__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! mapbox-gl-draw */ 23188);
/* harmony import */ var mapbox_gl_draw__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl_draw__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var views_components_map__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! views/components/map */ 70680);
/* harmony import */ var views_components_cards_select_feature_layers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! views/components/cards/select-feature-layers */ 77578);
/* harmony import */ var views_components_datatypes_geojson_feature_collection__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! views/components/datatypes/geojson-feature-collection */ 90293);















var viewModel = function viewModel(params) {
  var self = this;
  var padding = 40;
  var drawFeatures;
  var resourceId = params.tile ? params.tile.resourceinstance_id : "";
  if (this.widgets === undefined) {
    // could be [], so checking specifically for undefined
    this.widgets = params.widgets || [];
  }
  this.geojsonWidgets = this.widgets.filter(function (widget) {
    return widget.datatype.datatype === "geojson-feature-collection";
  });
  this.newNodeId = null;
  this.featureLookup = {};
  this.selectedFeatureIds = knockout__WEBPACK_IMPORTED_MODULE_2___default().observableArray();
  this.geoJSONString = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
  this.draw = null;
  this.selectSource = this.selectSource || knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
  this.selectSourceLayer = this.selectSourceLayer || knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
  this.drawAvailable = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
  this.bufferNodeId = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
  this.bufferDistance = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(0);
  this.bufferUnits = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable("m");
  this.bufferResult = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
  this.bufferAddNew = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
  this.allowAddNew = this.card && this.card.canAdd() && this.tile !== this.card.newTile;
  var selectSource = this.selectSource();
  var selectSourceLayer = this.selectSourceLayer();
  var selectFeatureLayers = (0,views_components_cards_select_feature_layers__WEBPACK_IMPORTED_MODULE_13__["default"])(resourceId, selectSource, selectSourceLayer);
  this.setSelectLayersVisibility = function (visibility) {
    var map = self.map();
    if (map) {
      selectFeatureLayers.forEach(function (layer) {
        map.setLayoutProperty(layer.id, "visibility", visibility ? "visible" : "none");
      });
    }
  };
  var sources = [];
  for (var sourceName in arches__WEBPACK_IMPORTED_MODULE_4__["default"].mapSources) {
    if (Object.prototype.hasOwnProperty.call(arches__WEBPACK_IMPORTED_MODULE_4__["default"].mapSources, sourceName)) {
      sources.push(sourceName);
    }
  }
  var updateSelectLayers = function updateSelectLayers() {
    var source = self.selectSource();
    var sourceLayer = self.selectSourceLayer();
    selectFeatureLayers = sources.indexOf(source) > 0 ? (0,views_components_cards_select_feature_layers__WEBPACK_IMPORTED_MODULE_13__["default"])(resourceId, source, sourceLayer) : [];
    self.additionalLayers(extendedLayers.concat(selectFeatureLayers, geojsonLayers));
  };
  this.selectSource.subscribe(updateSelectLayers);
  this.selectSourceLayer.subscribe(updateSelectLayers);
  this.setDrawTool = function (tool) {
    var showSelectLayers = tool === "select_feature";
    self.setSelectLayersVisibility(showSelectLayers);
    if (showSelectLayers) {
      self.draw.changeMode("simple_select");
      self.selectedFeatureIds([]);
    } else {
      if (tool) {
        self.draw.changeMode(tool);
        self.map().draw_mode = tool;
      }
    }
  };
  self.geojsonWidgets.forEach(function (widget) {
    var id = knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(widget.node_id);
    self.featureLookup[id] = {
      features: knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
        var value = knockout_mapping__WEBPACK_IMPORTED_MODULE_3___default().toJS(self.tile.data[id]);
        if (value) return value.features;else return [];
      }),
      selectedTool: knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(),
      dropErrors: knockout__WEBPACK_IMPORTED_MODULE_2___default().observableArray()
    };
    self.featureLookup[id].selectedTool.subscribe(function (tool) {
      if (self.draw) {
        if (tool === "") {
          self.draw.trash();
          self.draw.changeMode("simple_select");
        } else if (tool) {
          underscore__WEBPACK_IMPORTED_MODULE_1___default().each(self.featureLookup, function (value, key) {
            if (key !== id) {
              value.selectedTool(null);
            }
          });
          self.newNodeId = id;
        }
        self.setDrawTool(tool);
      }
    });
  });
  this.selectedTool = knockout__WEBPACK_IMPORTED_MODULE_2___default().pureComputed(function () {
    var tool;
    underscore__WEBPACK_IMPORTED_MODULE_1___default().find(self.featureLookup, function (value) {
      var selectedTool = value.selectedTool();
      if (selectedTool) tool = selectedTool;
    });
    return tool;
  });
  this.updateTiles = function () {
    var featureCollection = self.draw.getAll();
    underscore__WEBPACK_IMPORTED_MODULE_1___default().each(self.featureLookup, function (value) {
      value.selectedTool(null);
    });
    self.geojsonWidgets.forEach(function (widget) {
      var id = knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(widget.node_id);
      var features = [];
      featureCollection.features.forEach(function (feature) {
        if (feature.properties.nodeId === id) features.push(feature);
      });
      if (knockout__WEBPACK_IMPORTED_MODULE_2___default().isObservable(self.tile.data[id])) {
        self.tile.data[id]({
          type: "FeatureCollection",
          features: features
        });
      } else {
        if (self.tile.data[id]) {
          self.tile.data[id].features(features);
        }
      }
    });
  };
  var getDrawFeatures = function getDrawFeatures() {
    var drawFeatures = [];
    self.geojsonWidgets.forEach(function (widget) {
      var id = knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(widget.node_id);
      var featureCollection = knockout_mapping__WEBPACK_IMPORTED_MODULE_3___default().toJS(self.tile.data[id]);
      if (featureCollection) {
        featureCollection.features.forEach(function (feature) {
          if (!feature.id) {
            feature.id = uuid__WEBPACK_IMPORTED_MODULE_5___default().generate();
          }
          feature.properties.nodeId = id;
        });
        drawFeatures = drawFeatures.concat(featureCollection.features);
      }
    });
    return drawFeatures;
  };
  drawFeatures = getDrawFeatures();
  if (drawFeatures.length > 0) {
    params.usePosition = false;
    params.bounds = geojson_extent__WEBPACK_IMPORTED_MODULE_6___default()({
      type: "FeatureCollection",
      features: drawFeatures
    });
    params.fitBoundsOptions = {
      padding: {
        top: padding,
        left: padding + 200,
        bottom: padding,
        right: padding + 200
      }
    };
  }
  params.activeTab = "editor";
  params.sources = Object.assign({
    "geojson-editor-data": {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: []
      }
    }
  }, params.sources);
  var extendedLayers = [];
  if (params.layers) {
    extendedLayers = knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(params.layers);
  }
  var geojsonLayers = [{
    id: "geojson-editor-polygon-fill",
    type: "fill",
    filter: ["==", "$type", "Polygon"],
    paint: {
      "fill-color": "#3bb2d0",
      "fill-outline-color": "#3bb2d0",
      "fill-opacity": 0.1
    },
    source: "geojson-editor-data"
  }, {
    id: "geojson-editor-polygon-stroke-base",
    type: "line",
    filter: ["==", "$type", "Polygon"],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#fff",
      "line-width": 4
    },
    source: "geojson-editor-data"
  }, {
    id: "geojson-editor-polygon-stroke",
    type: "line",
    filter: ["==", "$type", "Polygon"],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2
    },
    source: "geojson-editor-data"
  }, {
    id: "geojson-editor-line",
    type: "line",
    filter: ["==", "$type", "LineString"],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2
    },
    source: "geojson-editor-data"
  }, {
    id: "geojson-editor-point-point-stroke",
    type: "circle",
    filter: ["==", "$type", "Point"],
    paint: {
      "circle-radius": 6,
      "circle-opacity": 1,
      "circle-color": "#fff"
    },
    source: "geojson-editor-data"
  }, {
    id: "geojson-editor-point",
    type: "circle",
    filter: ["==", "$type", "Point"],
    paint: {
      "circle-radius": 5,
      "circle-color": "#3bb2d0"
    },
    source: "geojson-editor-data"
  }];
  params.layers = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(extendedLayers.concat(selectFeatureLayers, geojsonLayers));
  views_components_map__WEBPACK_IMPORTED_MODULE_12__["default"].apply(this, [params]);
  this.deleteFeature = function (feature) {
    if (self.draw) {
      self.draw.delete(feature.id);
      self.selectedFeatureIds(self.selectedFeatureIds().filter(function (id) {
        return id !== feature.id;
      }));
      self.updateTiles();
    }
  };
  this.editFeature = function (feature) {
    if (self.draw) {
      self.draw.changeMode("simple_select", {
        featureIds: [feature.id]
      });
      self.selectedFeatureIds([feature.id]);
      underscore__WEBPACK_IMPORTED_MODULE_1___default().each(self.featureLookup, function (value) {
        value.selectedTool(null);
      });
    }
  };
  this.updateLayers = function (layers) {
    var map = self.map();
    var style = map.getStyle();
    if (style) {
      style.layers = self.draw ? layers.concat(self.draw.options.styles) : layers;
      map.setStyle(style);
    }
  };
  this.fitFeatures = function (features) {
    var map = self.map();
    var bounds = geojson_extent__WEBPACK_IMPORTED_MODULE_6___default()({
      type: "FeatureCollection",
      features: features
    });
    var camera = map.cameraForBounds(bounds, {
      padding: padding
    });
    map.jumpTo(camera);
  };
  this.editGeoJSON = function (features, nodeId) {
    var geoJSONString = JSON.stringify({
      type: "FeatureCollection",
      features: features
    }, null, "   ");
    this.geoJSONString(geoJSONString);
    self.newNodeId = nodeId;
  };
  this.geoJSONString.subscribe(function (geoJSONString) {
    var map = self.map();
    if (geoJSONString === undefined) {
      setupDraw(map);
    } else if (self.draw) {
      map.removeControl(self.draw);
      self.draw = undefined;
      self.selectedFeatureIds([]);
    }
    self.setSelectLayersVisibility(false);
  });
  this.geoJSONErrors = knockout__WEBPACK_IMPORTED_MODULE_2___default().pureComputed(function () {
    var geoJSONString = self.geoJSONString();
    var hint = geojsonhint__WEBPACK_IMPORTED_MODULE_7___default().hint(geoJSONString);
    var errors = [];
    hint.forEach(function (item) {
      if (item.level !== "message") {
        errors.push(item);
      }
    });
    return errors;
  }).extend({
    rateLimit: 50
  });
  var geoJSONLayerData = knockout__WEBPACK_IMPORTED_MODULE_2___default().pureComputed(function () {
    var geoJSONString = self.geoJSONString();
    var geoJSONErrors = self.geoJSONErrors();
    if (geoJSONErrors.length === 0) return JSON.parse(geoJSONString);
    var fc = {
      type: "FeatureCollection",
      features: []
    };
    if (self.bufferNodeId() && self.bufferResult()) {
      fc.features.push(self.bufferResult());
    }
    return fc;
  }).extend({
    rateLimit: 100
  });
  geoJSONLayerData.subscribe(function (data) {
    var map = self.map();
    map.getSource("geojson-editor-data").setData(data);
  });
  this.updateGeoJSON = function () {
    if (self.geoJSONErrors().length === 0) {
      self.drawAvailable(false);
      var geoJSON = JSON.parse(this.geoJSONString());
      var subscription = self.drawAvailable.subscribe(function () {
        geoJSON.features = geoJSON.features.filter(function (feature) {
          return feature.geometry;
        });
        if (geoJSON.features.length > 0) {
          self.map().fitBounds(geojson_extent__WEBPACK_IMPORTED_MODULE_6___default()(geoJSON), {
            padding: padding
          });
          geoJSON.features.forEach(function (feature) {
            feature.id = uuid__WEBPACK_IMPORTED_MODULE_5___default().generate();
            if (!feature.properties) feature.properties = {};
            feature.properties.nodeId = self.newNodeId;
            self.draw.add(feature);
          });
          self.updateTiles();
        }
        subscription.dispose();
      });
      self.geoJSONString(undefined);

      // var geoJSON = JSON.parse(this.geoJSONString());
      // geoJSON.features.forEach(function(feature) {
      //     feature.id = uuid.generate();
      //     if (!feature.properties) feature.properties = {};
      //     feature.properties.nodeId = self.newNodeId;
      // });
      // if (ko.isObservable(self.tile.data[self.newNodeId])) {
      //     self.tile.data[self.newNodeId](geoJSON);
      // } else {
      //     self.tile.data[self.newNodeId].features(geoJSON.features);
      // }
      // self.geoJSONString(undefined);
    }
  };
  var setupDraw = function setupDraw(map) {
    var modes = (mapbox_gl_draw__WEBPACK_IMPORTED_MODULE_11___default().modes);
    modes.static = {
      onSetup: function onSetup() {
        this.setActionableState();
        return {};
      },
      toDisplayFeatures: function toDisplayFeatures(state, geojson, display) {
        display(geojson);
      }
    };
    self.draw = new (mapbox_gl_draw__WEBPACK_IMPORTED_MODULE_11___default())({
      displayControlsDefault: false,
      modes: modes
    });
    map.addControl(self.draw);
    self.draw.set({
      type: "FeatureCollection",
      features: getDrawFeatures()
    });
    map.on("draw.create", function (e) {
      e.features.forEach(function (feature) {
        self.draw.setFeatureProperty(feature.id, "nodeId", self.newNodeId);
      });
      self.updateTiles();
    });
    map.on("draw.update", function () {
      self.updateTiles();
      if (self.coordinateEditing()) {
        var editingFeature = self.draw.getSelected().features[0];
        if (editingFeature) updateCoordinatesFromFeature(editingFeature);
      }
      if (self.bufferNodeId()) self.updateBufferFeature();
    });
    map.on("draw.delete", self.updateTiles);
    map.on("draw.modechange", function (e) {
      self.updateTiles();
      self.setSelectLayersVisibility(false);
      map.draw_mode = e.mode;
    });
    map.on("draw.selectionchange", function (e) {
      self.selectedFeatureIds(e.features.map(function (feature) {
        return feature.id;
      }));
      if (e.features.length > 0) {
        underscore__WEBPACK_IMPORTED_MODULE_1___default().each(self.featureLookup, function (value) {
          value.selectedTool(null);
        });
      }
      self.setSelectLayersVisibility(false);
    });
    if (self.form) self.form.on("tile-reset", function () {
      var style = self.map().getStyle();
      if (style) {
        self.draw.set({
          type: "FeatureCollection",
          features: getDrawFeatures()
        });
      }
      underscore__WEBPACK_IMPORTED_MODULE_1___default().each(self.featureLookup, function (value) {
        if (value.selectedTool()) value.selectedTool("");
      });
    });
    if (self.draw) {
      self.drawAvailable(true);
    }
  };
  if (this.provisionalTileViewModel) {
    this.provisionalTileViewModel.resetAuthoritative();
    this.provisionalTileViewModel.selectedProvisionalEdit.subscribe(function (val) {
      if (val) {
        var displayAll = function displayAll() {
          var featureCollection;
          for (var k in self.tile.data) {
            if (self.featureLookup[k] && self.draw) {
              try {
                featureCollection = self.draw.getAll();
                featureCollection.features = knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(self.featureLookup[k].features);
                self.draw.set(featureCollection);
              } catch (e) {
                //pass: TypeError in draw seems inconsequential.
              }
            }
          }
        };
        setTimeout(displayAll, 100);
      }
    });
  }
  this.map.subscribe(setupDraw);
  self.map.subscribe(function (map) {
    if (self.draw && !params.draw) {
      params.draw = self.draw;
    }
    if (map && !params.map) {
      params.map = map;
    }
  });
  if (!params.additionalDrawOptions) {
    params.additionalDrawOptions = [];
  }
  self.geojsonWidgets.forEach(function (widget) {
    if (widget.config.geometryTypes) {
      widget.drawTools = knockout__WEBPACK_IMPORTED_MODULE_2___default().pureComputed(function () {
        var options = [{
          value: "",
          text: ""
        }];
        options = options.concat(knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(widget.config.geometryTypes).map(function (type) {
          var option = {};
          switch (knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(type.id)) {
            case "Point":
              option.value = "draw_point";
              option.text = arches__WEBPACK_IMPORTED_MODULE_4__["default"].translations.mapAddPoint;
              break;
            case "Line":
              option.value = "draw_line_string";
              option.text = arches__WEBPACK_IMPORTED_MODULE_4__["default"].translations.mapAddLine;
              break;
            case "Polygon":
              option.value = "draw_polygon";
              option.text = arches__WEBPACK_IMPORTED_MODULE_4__["default"].translations.mapAddPolygon;
              break;
          }
          return option;
        }));
        if (self.selectSource()) {
          options.push({
            value: "select_feature",
            text: self.selectText() || arches__WEBPACK_IMPORTED_MODULE_4__["default"].translations.mapSelectDrawing
          });
        }
        options = options.concat(params.additionalDrawOptions);
        return options;
      });
    }
  });
  this.isFeatureClickable = function (feature) {
    var tool = self.selectedTool();
    if (tool && tool !== "select_feature") return false;
    return feature.properties.resourceinstanceid || self.isSelectable(feature);
  };
  self.isSelectable = function (feature) {
    var selectLayerIds = selectFeatureLayers.map(function (layer) {
      return layer.id;
    });
    return selectLayerIds.indexOf(feature.layer.id) >= 0;
  };
  var addSelectFeatures = function addSelectFeatures(features) {
    var featureIds = [];
    features.forEach(function (feature) {
      feature.id = uuid__WEBPACK_IMPORTED_MODULE_5___default().generate();
      feature.properties = {
        nodeId: self.newNodeId
      };
      self.draw.add(feature);
      featureIds.push(feature.id);
    });
    self.updateTiles();
    if (self.popup) self.popup.remove();
    self.draw.changeMode("simple_select", {
      featureIds: featureIds
    });
    self.selectedFeatureIds(featureIds);
    underscore__WEBPACK_IMPORTED_MODULE_1___default().each(self.featureLookup, function (value) {
      value.selectedTool(null);
    });
  };
  self.selectFeature = function (feature) {
    try {
      var geometry = JSON.parse(feature.properties.geojson);
      var newFeature = {
        type: "Feature",
        properties: {},
        geometry: geometry
      };
      addSelectFeatures([newFeature]);
    } catch (e) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(feature.properties.geojson, function (data) {
        addSelectFeatures(data.features);
      });
    }
  };
  var addFromGeoJSON = function addFromGeoJSON(geoJSONString, nodeId) {
    var hint = geojsonhint__WEBPACK_IMPORTED_MODULE_7___default().hint(geoJSONString);
    var errors = [];
    hint.forEach(function (item) {
      if (item.level !== "message") {
        errors.push(item);
      }
    });
    if (errors.length === 0) {
      var geoJSON = JSON.parse(geoJSONString);
      geoJSON.features = geoJSON.features.filter(function (feature) {
        return feature.geometry;
      });
      if (geoJSON.features.length > 0) {
        self.map().fitBounds(geojson_extent__WEBPACK_IMPORTED_MODULE_6___default()(geoJSON), {
          padding: padding
        });
        geoJSON.features.forEach(function (feature) {
          feature.id = uuid__WEBPACK_IMPORTED_MODULE_5___default().generate();
          if (!feature.properties) feature.properties = {};
          feature.properties.nodeId = nodeId;
          self.draw.add(feature);
        });
        self.updateTiles();
      }
    }
    return errors;
  };
  self.handleFiles = function (files, nodeId) {
    var errors = [];
    var promises = [];
    for (var i = 0; i < files.length; i++) {
      var extension = files[i].name.split(".").pop();
      if (!["kml", "json", "geojson", "shp", "zip"].includes(extension)) {
        errors.push({
          message: 'File unsupported: "' + files[i].name + '"'
        });
      } else {
        promises.push(new Promise(function (resolve) {
          var file = files[i];
          var extension = file.name.split(".").pop();
          var reader = new window.FileReader();
          reader.onload = function (e) {
            var geoJSON;
            if (["json", "geojson"].includes(extension)) geoJSON = JSON.parse(e.target.result);else if (extension === "kml") geoJSON = (0,togeojson__WEBPACK_IMPORTED_MODULE_8__.kml)(new window.DOMParser().parseFromString(e.target.result, "text/xml"));else if (extension === "shp") geoJSON = {
              "type": "FeatureCollection",
              "features": shpjsesm__WEBPACK_IMPORTED_MODULE_9__["default"].parseShp(e.target.result).reduce(function (features, geometry) {
                features = features.concat({
                  "type": "Feature",
                  "geometry": geometry,
                  "properties": {}
                });
                return features;
              }, [])
            };else if (extension === "zip") shpjsesm__WEBPACK_IMPORTED_MODULE_9__["default"].parseZip(e.target.result).then(function (parsedZip) {
              resolve(parsedZip);
            });
            if (extension !== "zip") resolve(geoJSON);
          };
          if (["shp", "zip"].includes(extension)) reader.readAsArrayBuffer(file);else reader.readAsText(file);
        }));
      }
    }
    Promise.all(promises).then(function (results) {
      var geoJSON = {
        type: "FeatureCollection",
        features: results.reduce(function (features, geoJSON) {
          features = features.concat(geoJSON.features);
          return features;
        }, [])
      };
      errors = errors.concat(addFromGeoJSON(JSON.stringify(geoJSON), nodeId));
      self.featureLookup[nodeId].dropErrors(errors);
    });
  };
  self.dropZoneHandler = function (data, e) {
    var nodeId = data.node.nodeid;
    e.stopPropagation();
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files;
    self.handleFiles(files, nodeId);
    self.dropZoneLeaveHandler(data, e);
  };
  self.dropZoneOverHandler = function (data, e) {
    e.stopPropagation();
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = "copy";
  };
  self.dropZoneClickHandler = function (data, e) {
    var fileInput = e.target.parentNode.parentNode.querySelector(".hidden-file-input input");
    var event = window.document.createEvent("MouseEvents");
    event.initEvent("click", true, false);
    fileInput.dispatchEvent(event);
  };
  self.dropZoneEnterHandler = function (data, e) {
    e.target.classList.add("drag-hover");
  };
  self.dropZoneLeaveHandler = function (data, e) {
    e.target.classList.remove("drag-hover");
  };
  self.dropZoneFileSelected = function (data, e) {
    self.handleFiles(e.target.files, data.node.nodeid);
  };
  self.coordinateReferences = arches__WEBPACK_IMPORTED_MODULE_4__["default"].preferredCoordinateSystems;
  self.selectedCoordinateReference = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(self.coordinateReferences[0].proj4);
  self.coordinates = knockout__WEBPACK_IMPORTED_MODULE_2___default().observableArray();
  var geographic = '+proj=longlat +datum=WGS84 +no_defs", "default';
  self.rawCoordinates = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
    return self.coordinates().map(function (coords) {
      var sourceCRS = self.selectedCoordinateReference();
      return proj4__WEBPACK_IMPORTED_MODULE_10___default()(sourceCRS, geographic, [Number(coords[0]()), Number(coords[1]())]);
    });
  }).extend({
    throttle: 100
  });
  self.rawCoordinates.subscribe(function (rawCoordinates) {
    var selectedFeatureId = self.selectedFeatureIds()[0];
    if (self.coordinateEditing()) {
      if (selectedFeatureId) {
        var drawFeatures = getDrawFeatures();
        drawFeatures.forEach(function (feature) {
          if (feature.id === selectedFeatureId) {
            if (feature.geometry.type === "Polygon") {
              rawCoordinates.push(rawCoordinates[0]);
              feature.geometry.coordinates[0] = rawCoordinates;
            } else if (feature.geometry.type === "Point") feature.geometry.coordinates = rawCoordinates[0];else feature.geometry.coordinates = rawCoordinates;
          }
        });
        self.draw.set({
          type: "FeatureCollection",
          features: drawFeatures
        });
        self.updateTiles();
      } else if (rawCoordinates.length >= self.minCoordinates()) {
        var coordinates = [];
        var geomType = self.coordinateGeomType();
        switch (geomType) {
          case "Polygon":
            rawCoordinates.push(rawCoordinates[0]);
            coordinates = [rawCoordinates];
            break;
          case "Point":
            coordinates = rawCoordinates[0];
            break;
          default:
            coordinates = rawCoordinates;
            break;
        }
        addSelectFeatures([{
          type: "Feature",
          geometry: {
            type: geomType,
            coordinates: coordinates
          }
        }]);
      }
    }
  });
  self.showCoordinateFeature = function () {
    var selectedFeatureIds = self.selectedFeatureIds();
    var featureId = selectedFeatureIds[0];
    if (featureId) {
      var feature = self.draw.get(featureId);
      self.fitFeatures([feature]);
    }
  };
  self.coordinateEditing = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
  self.newX = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
  self.newY = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
  var newCoordinatePair = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
    var x = self.newX();
    var y = self.newY();
    return [x, y];
  });
  self.focusLatestY = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(true);
  var getNewCoordinatePair = function getNewCoordinatePair(coords) {
    var newCoords = [knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(coords[0]), knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(coords[1])];
    newCoords.forEach(function (value) {
      value.subscribe(function (newValue) {
        if ([undefined, null, ""].includes(newValue)) value(0);
      });
    });
    return newCoords;
  };
  newCoordinatePair.subscribe(function (coords) {
    if (coords[0] && coords[1]) {
      self.coordinates.push(getNewCoordinatePair(coords));
      self.newX(undefined);
      self.newY(undefined);
      self.focusLatestY(true);
    }
  });
  var updateCoordinatesFromFeature = function updateCoordinatesFromFeature(feature) {
    var sourceCoordinates = [];
    if (feature.geometry.type === "Polygon") {
      sourceCoordinates = [];
      for (var i = 0; i < feature.geometry.coordinates[0].length - 1; i++) {
        sourceCoordinates.push(feature.geometry.coordinates[0][i]);
      }
    } else if (feature.geometry.type === "Point") sourceCoordinates = [feature.geometry.coordinates];else sourceCoordinates = feature.geometry.coordinates;
    self.coordinateGeomType(feature.geometry.type);
    self.coordinates(sourceCoordinates.map(function (coords) {
      var newCoords = getNewCoordinatePair(coords);
      transformCoordinatePair(newCoords, geographic);
      return newCoords;
    }));
  };
  var transformCoordinatePair = function transformCoordinatePair(coords, sourceCRS) {
    var targetCRS = self.selectedCoordinateReference();
    var transformedCoordinates = proj4__WEBPACK_IMPORTED_MODULE_10___default()(sourceCRS, targetCRS, [Number(coords[0]()), Number(coords[1]())]);
    coords[0](transformedCoordinates[0]);
    coords[1](transformedCoordinates[1]);
  };
  var previousCRS = self.selectedCoordinateReference();
  var transformCoordinates = function transformCoordinates() {
    var targetCRS = self.selectedCoordinateReference();
    self.coordinates().forEach(function (coords) {
      transformCoordinatePair(coords, previousCRS);
    });
    previousCRS = targetCRS;
  };
  self.selectedCoordinateReference.subscribe(transformCoordinates);
  self.coordinateGeomType = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
  self.coordinateEditing.subscribe(function (editing) {
    self.coordinateGeomType(null);
    var selectedTool = self.selectedTool();
    switch (selectedTool) {
      case "draw_point":
        self.coordinateGeomType("Point");
        break;
      case "draw_line_string":
        self.coordinateGeomType("LineString");
        break;
      case "draw_polygon":
        self.coordinateGeomType("Polygon");
        break;
      default:
        break;
    }
    var selectedFeatureIds = self.selectedFeatureIds();
    var featureId = selectedFeatureIds[0];
    self.focusLatestY(false);
    self.coordinates([]);
    self.newX(undefined);
    self.newY(undefined);
    if (editing) {
      var selectConfig;
      if (selectedFeatureIds.length > 0) {
        selectConfig = {
          featureIds: [featureId]
        };
        self.selectedFeatureIds([featureId]);
        var feature = self.draw.get(featureId);
        updateCoordinatesFromFeature(feature);
      }
      if (selectedTool) {
        self.draw.trash();
      }
      self.draw.changeMode("simple_select", selectConfig);
      underscore__WEBPACK_IMPORTED_MODULE_1___default().each(self.featureLookup, function (value) {
        value.selectedTool(null);
      });
    }
  });
  self.hideNewCoordinates = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
    var geomType = self.coordinateGeomType();
    var coordCount = self.coordinates().length;
    return geomType === "Point" && coordCount > 0;
  });
  self.minCoordinates = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
    var geomType = self.coordinateGeomType();
    var minCoordinates;
    switch (geomType) {
      case "Point":
        minCoordinates = 1;
        break;
      case "LineString":
        minCoordinates = 2;
        break;
      case "Polygon":
        minCoordinates = 3;
        break;
      default:
        break;
    }
    return minCoordinates;
  });
  self.allowDeleteCoordinates = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
    return self.coordinates().length > self.minCoordinates();
  });
  self.editCoordinates = function () {
    self.coordinateEditing(true);
  };
  self.canEditCoordinates = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
    var featureId = self.selectedFeatureIds()[0];
    if (featureId) {
      var feature = self.draw.get(featureId);
      return ["Point", "LineString", "Polygon"].includes(feature.geometry.type);
    } else {
      var selectedTool = self.selectedTool();
      return ["draw_point", "draw_line_string", "draw_polygon"].includes(selectedTool);
    }
  });
  self.selectedFeatureIds.subscribe(function (ids) {
    if (ids.length === 0) self.coordinateEditing(false);else if (self.canEditCoordinates()) {
      var feature = self.draw.get(ids[0]);
      updateCoordinatesFromFeature(feature);
    }
  });
  self.bufferFeature = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
    return self.selectedFeatureIds()[0];
  });
  var getBufferFeature = function getBufferFeature() {
    var featureId = self.bufferFeature();
    if (featureId) {
      return self.draw.get(featureId);
    }
  };
  self.bufferParams = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
    var bufferFeature = getBufferFeature();
    if (bufferFeature && self.bufferNodeId()) return {
      geometry: bufferFeature.geometry,
      buffer: {
        width: parseFloat(self.bufferDistance()),
        unit: self.bufferUnits()
      }
    };
  });
  self.bufferFeature.subscribe(function (bufferFeature) {
    if (!bufferFeature) self.bufferNodeId(false);
  });
  self.updateBufferFeature = function () {
    var bufferParams = self.bufferParams();
    var bufferFeature = getBufferFeature();
    if (bufferParams && bufferFeature) {
      bufferParams.geometry = bufferFeature.geometry;
      window.fetch(arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.buffer + "?filter=" + JSON.stringify(bufferParams)).then(function (response) {
        if (response.ok) {
          return response.json();
        }
      }).then(function (json) {
        var bufferFeature = getBufferFeature();
        self.bufferResult({
          type: "Feature",
          id: uuid__WEBPACK_IMPORTED_MODULE_5___default().generate(),
          geometry: json,
          properties: {
            nodeId: bufferFeature.properties.nodeId
          }
        });
      });
    } else self.bufferResult(undefined);
  };
  self.bufferParams.subscribe(self.updateBufferFeature);
  if (self.card) {
    self.card.map = self.map;
  }
  self.addBufferResult = function () {
    var bufferResult = self.bufferResult();
    if (self.bufferAddNew()) {
      var dirty = knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(self.tile.dirty);
      var nodeId = self.bufferNodeId();
      var addBufferResultAsNew = function addBufferResultAsNew() {
        var updateNewTile = self.card.selected.subscribe(function () {
          var fc = {
            type: "FeatureCollection",
            features: [bufferResult]
          };
          self.card.getNewTile().data[nodeId](fc);
          self.card.map.subscribe(function (map) {
            map.fitBounds(geojson_extent__WEBPACK_IMPORTED_MODULE_6___default()(fc), {
              duration: 0,
              padding: padding
            });
          });
          updateNewTile.dispose();
        });
        self.card.selected(true);
      };
      if (dirty) self.saveTile(addBufferResultAsNew);else addBufferResultAsNew();
    } else {
      self.draw.add(bufferResult);
      self.bufferNodeId(false);
      self.updateTiles();
      self.editFeature(bufferResult);
      self.fitFeatures([bufferResult]);
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOTU0YjA2NzMzYWNmZmY1YmEzZGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNJO0FBQ0Q7QUFDZTtBQUNiO0FBQ0o7QUFDbUI7QUFDTDtBQUNOO0FBQ0g7QUFDSDtBQUNjO0FBQ2lCO0FBQzZCO0FBQ087QUFHN0YsSUFBSWUsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQWFDLE1BQU0sRUFBRTtFQUM5QixJQUFJQyxJQUFJLEdBQUcsSUFBSTtFQUNmLElBQUlDLE9BQU8sR0FBRyxFQUFFO0VBQ2hCLElBQUlDLFlBQVk7RUFFaEIsSUFBSUMsVUFBVSxHQUFHSixNQUFNLENBQUNLLElBQUksR0FBR0wsTUFBTSxDQUFDSyxJQUFJLENBQUNDLG1CQUFtQixHQUFHLEVBQUU7RUFDbkUsSUFBSSxJQUFJLENBQUNDLE9BQU8sS0FBS0MsU0FBUyxFQUFFO0lBQzVCO0lBQ0EsSUFBSSxDQUFDRCxPQUFPLEdBQUdQLE1BQU0sQ0FBQ08sT0FBTyxJQUFJLEVBQUU7RUFDdkM7RUFFQSxJQUFJLENBQUNFLGNBQWMsR0FBRyxJQUFJLENBQUNGLE9BQU8sQ0FBQ0csTUFBTSxDQUFDLFVBQVVDLE1BQU0sRUFBRTtJQUN4RCxPQUFPQSxNQUFNLENBQUNDLFFBQVEsQ0FBQ0EsUUFBUSxLQUFLLDRCQUE0QjtFQUNwRSxDQUFDLENBQUM7RUFDRixJQUFJLENBQUNDLFNBQVMsR0FBRyxJQUFJO0VBQ3JCLElBQUksQ0FBQ0MsYUFBYSxHQUFHLENBQUMsQ0FBQztFQUN2QixJQUFJLENBQUNDLGtCQUFrQixHQUFHN0IsK0RBQWtCLENBQUMsQ0FBQztFQUM5QyxJQUFJLENBQUMrQixhQUFhLEdBQUcvQiwwREFBYSxDQUFDLENBQUM7RUFDcEMsSUFBSSxDQUFDaUMsSUFBSSxHQUFHLElBQUk7RUFDaEIsSUFBSSxDQUFDQyxZQUFZLEdBQUcsSUFBSSxDQUFDQSxZQUFZLElBQUlsQywwREFBYSxDQUFDLENB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O1VBQ0ZzUyxhQUFhLENBQUMvSixPQUFPLENBQUMsQ0FBQztRQUMzQixDQUNKLENBQUM7UUFDRHhJLElBQUksQ0FBQzRCLElBQUksQ0FBQzRRLFFBQVEsQ0FBQyxJQUFJLENBQUM7TUFDNUIsQ0FBQztNQUNELElBQUlILEtBQUssRUFBRXJTLElBQUksQ0FBQzJTLFFBQVEsQ0FBQ0wsb0JBQW9CLENBQUMsQ0FBQyxLQUMxQ0Esb0JBQW9CLENBQUMsQ0FBQztJQUMvQixDQUFDLE1BQU07TUFDSHRTLElBQUksQ0FBQ2tCLElBQUksQ0FBQ3FILEdBQUcsQ0FBQzlHLFlBQVksQ0FBQztNQUMzQnpCLElBQUksQ0FBQ3NCLFlBQVksQ0FBQyxLQUFLLENBQUM7TUFDeEJ0QixJQUFJLENBQUMyRSxXQUFXLENBQUMsQ0FBQztNQUNsQjNFLElBQUksQ0FBQ3FHLFdBQVcsQ0FBQzVFLFlBQVksQ0FBQztNQUM5QnpCLElBQUksQ0FBQzZHLFdBQVcsQ0FBQyxDQUFDcEYsWUFBWSxDQUFDLENBQUM7SUFDcEM7RUFDSixDQUFDO0FBQ0wsQ0FBQztBQUNELGlFQUFlM0IsU0FBUyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld21vZGVscy9tYXAtZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XG5pbXBvcnQga28gZnJvbSBcImtub2Nrb3V0XCI7XG5pbXBvcnQga29NYXBwaW5nIGZyb20gXCJrbm9ja291dC1tYXBwaW5nXCI7XG5pbXBvcnQgYXJjaGVzIGZyb20gXCJhcmNoZXNcIjtcbmltcG9ydCB1dWlkIGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgZ2VvanNvbkV4dGVudCBmcm9tIFwiZ2VvanNvbi1leHRlbnRcIjtcbmltcG9ydCBnZW9qc29uaGludCBmcm9tIFwiZ2VvanNvbmhpbnRcIjtcbmltcG9ydCB7IGttbCB9IGZyb20gXCJ0b2dlb2pzb25cIjtcbmltcG9ydCBzaHBqcyBmcm9tIFwic2hwanNlc21cIjtcbmltcG9ydCBwcm9qNCBmcm9tIFwicHJvajRcIjtcbmltcG9ydCBNYXBib3hEcmF3IGZyb20gXCJtYXBib3gtZ2wtZHJhd1wiO1xuaW1wb3J0IE1hcENvbXBvbmVudFZpZXdNb2RlbCBmcm9tIFwidmlld3MvY29tcG9uZW50cy9tYXBcIjtcbmltcG9ydCBzZWxlY3RGZWF0dXJlTGF5ZXJzRmFjdG9yeSBmcm9tIFwidmlld3MvY29tcG9uZW50cy9jYXJkcy9zZWxlY3QtZmVhdHVyZS1sYXllcnNcIjtcbmltcG9ydCBnZW9qc29uRmVhdHVyZUNvbGxlY3Rpb24gZnJvbSBcInZpZXdzL2NvbXBvbmVudHMvZGF0YXR5cGVzL2dlb2pzb24tZmVhdHVyZS1jb2xsZWN0aW9uXCI7XG5cblxudmFyIHZpZXdNb2RlbCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHBhZGRpbmcgPSA0MDtcbiAgICB2YXIgZHJhd0ZlYXR1cmVzO1xuXG4gICAgdmFyIHJlc291cmNlSWQgPSBwYXJhbXMudGlsZSA/IHBhcmFtcy50aWxlLnJlc291cmNlaW5zdGFuY2VfaWQgOiBcIlwiO1xuICAgIGlmICh0aGlzLndpZGdldHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBjb3VsZCBiZSBbXSwgc28gY2hlY2tpbmcgc3BlY2lmaWNhbGx5IGZvciB1bmRlZmluZWRcbiAgICAgICAgdGhpcy53aWRnZXRzID0gcGFyYW1zLndpZGdldHMgfHwgW107XG4gICAgfVxuXG4gICAgdGhpcy5nZW9qc29uV2lkZ2V0cyA9IHRoaXMud2lkZ2V0cy5maWx0ZXIoZnVuY3Rpb24gKHdpZGdldCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0LmRhdGF0eXBlLmRhdGF0eXBlID09PSBcImdlb2pzb24tZmVhdHVyZS1jb2xsZWN0aW9uXCI7XG4gICAgfSk7XG4gICAgdGhpcy5uZXdOb2RlSWQgPSBudWxsO1xuICAgIHRoaXMuZmVhdHVyZUxvb2t1cCA9IHt9O1xuICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlSWRzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgdGhpcy5nZW9KU09OU3RyaW5nID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZHJhdyA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RTb3VyY2UgPSB0aGlzLnNlbGVjdFNvdXJjZSB8fCBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5zZWxlY3RTb3VyY2VMYXllciA9IHRoaXMuc2VsZWN0U291cmNlTGF5ZXIgfHwga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZHJhd0F2YWlsYWJsZSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgIHRoaXMuYnVmZmVyTm9kZUlkID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuYnVmZmVyRGlzdGFuY2UgPSBrby5vYnNlcnZhYmxlKDApO1xuICAgIHRoaXMuYnVmZmVyVW5pdHMgPSBrby5vYnNlcnZhYmxlKFwibVwiKTtcbiAgICB0aGlzLmJ1ZmZlclJlc3VsdCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmJ1ZmZlckFkZE5ldyA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgIHRoaXMuYWxsb3dBZGROZXcgPVxuICAgICAgICB0aGlzLmNhcmQgJiYgdGhpcy5jYXJkLmNhbkFkZCgpICYmIHRoaXMudGlsZSAhPT0gdGhpcy5jYXJkLm5ld1RpbGU7XG5cbiAgICB2YXIgc2VsZWN0U291cmNlID0gdGhpcy5zZWxlY3RTb3VyY2UoKTtcbiAgICB2YXIgc2VsZWN0U291cmNlTGF5ZXIgPSB0aGlzLnNlbGVjdFNvdXJjZUxheWVyKCk7XG4gICAgdmFyIHNlbGVjdEZlYXR1cmVMYXllcnMgPSBzZWxlY3RGZWF0dXJlTGF5ZXJzRmFjdG9yeShcbiAgICAgICAgcmVzb3VyY2VJZCxcbiAgICAgICAgc2VsZWN0U291cmNlLFxuICAgICAgICBzZWxlY3RTb3VyY2VMYXllclxuICAgICk7XG5cbiAgICB0aGlzLnNldFNlbGVjdExheWVyc1Zpc2liaWxpdHkgPSBmdW5jdGlvbiAodmlzaWJpbGl0eSkge1xuICAgICAgICB2YXIgbWFwID0gc2VsZi5tYXAoKTtcbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgc2VsZWN0RmVhdHVyZUxheWVycy5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID8gXCJ2aXNpYmxlXCIgOiBcIm5vbmVcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgc291cmNlcyA9IFtdO1xuICAgIGZvciAodmFyIHNvdXJjZU5hbWUgaW4gYXJjaGVzLm1hcFNvdXJjZXMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgICAgIGFyY2hlcy5tYXBTb3VyY2VzLFxuICAgICAgICAgICAgICAgIHNvdXJjZU5hbWVcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goc291cmNlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHVwZGF0ZVNlbGVjdExheWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHNlbGYuc2VsZWN0U291cmNlKCk7XG4gICAgICAgIHZhciBzb3VyY2VMYXllciA9IHNlbGYuc2VsZWN0U291cmNlTGF5ZXIoKTtcbiAgICAgICAgc2VsZWN0RmVhdHVyZUxheWVycyA9XG4gICAgICAgICAgICBzb3VyY2VzLmluZGV4T2Yoc291cmNlKSA+IDBcbiAgICAgICAgICAgICAgICA/IHNlbGVjdEZlYXR1cmVMYXllcnNGYWN0b3J5KFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZUxheWVyXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IFtdO1xuICAgICAgICBzZWxmLmFkZGl0aW9uYWxMYXllcnMoXG4gICAgICAgICAgICBleHRlbmRlZExheWVycy5jb25jYXQoc2VsZWN0RmVhdHVyZUxheWVycywgZ2VvanNvbkxheWVycylcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0U291cmNlLnN1YnNjcmliZSh1cGRhdGVTZWxlY3RMYXllcnMpO1xuICAgIHRoaXMuc2VsZWN0U291cmNlTGF5ZXIuc3Vic2NyaWJlKHVwZGF0ZVNlbGVjdExheWVycyk7XG5cbiAgICB0aGlzLnNldERyYXdUb29sID0gZnVuY3Rpb24gKHRvb2wpIHtcbiAgICAgICAgdmFyIHNob3dTZWxlY3RMYXllcnMgPSB0b29sID09PSBcInNlbGVjdF9mZWF0dXJlXCI7XG4gICAgICAgIHNlbGYuc2V0U2VsZWN0TGF5ZXJzVmlzaWJpbGl0eShzaG93U2VsZWN0TGF5ZXJzKTtcbiAgICAgICAgaWYgKHNob3dTZWxlY3RMYXllcnMpIHtcbiAgICAgICAgICAgIHNlbGYuZHJhdy5jaGFuZ2VNb2RlKFwic2ltcGxlX3NlbGVjdFwiKTtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRGZWF0dXJlSWRzKFtdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0b29sKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmF3LmNoYW5nZU1vZGUodG9vbCk7XG4gICAgICAgICAgICAgICAgc2VsZi5tYXAoKS5kcmF3X21vZGUgPSB0b29sO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYuZ2VvanNvbldpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAod2lkZ2V0KSB7XG4gICAgICAgIHZhciBpZCA9IGtvLnVud3JhcCh3aWRnZXQubm9kZV9pZCk7XG4gICAgICAgIHNlbGYuZmVhdHVyZUxvb2t1cFtpZF0gPSB7XG4gICAgICAgICAgICBmZWF0dXJlczoga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGtvTWFwcGluZy50b0pTKHNlbGYudGlsZS5kYXRhW2lkXSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSByZXR1cm4gdmFsdWUuZmVhdHVyZXM7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gW107XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHNlbGVjdGVkVG9vbDoga28ub2JzZXJ2YWJsZSgpLFxuICAgICAgICAgICAgZHJvcEVycm9yczoga28ub2JzZXJ2YWJsZUFycmF5KCksXG4gICAgICAgIH07XG4gICAgICAgIHNlbGYuZmVhdHVyZUxvb2t1cFtpZF0uc2VsZWN0ZWRUb29sLnN1YnNjcmliZShmdW5jdGlvbiAodG9vbCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuZHJhdykge1xuICAgICAgICAgICAgICAgIGlmICh0b29sID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZHJhdy50cmFzaCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRyYXcuY2hhbmdlTW9kZShcInNpbXBsZV9zZWxlY3RcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b29sKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChzZWxmLmZlYXR1cmVMb29rdXAsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnNlbGVjdGVkVG9vbChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmV3Tm9kZUlkID0gaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuc2V0RHJhd1Rvb2wodG9vbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3RlZFRvb2wgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9vbDtcbiAgICAgICAgXy5maW5kKHNlbGYuZmVhdHVyZUxvb2t1cCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRUb29sID0gdmFsdWUuc2VsZWN0ZWRUb29sKCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRUb29sKSB0b29sID0gc2VsZWN0ZWRUb29sO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRvb2w7XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZVRpbGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZmVhdHVyZUNvbGxlY3Rpb24gPSBzZWxmLmRyYXcuZ2V0QWxsKCk7XG4gICAgICAgIF8uZWFjaChzZWxmLmZlYXR1cmVMb29rdXAsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUuc2VsZWN0ZWRUb29sKG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5nZW9qc29uV2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3aWRnZXQpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IGtvLnVud3JhcCh3aWRnZXQubm9kZV9pZCk7XG4gICAgICAgICAgICB2YXIgZmVhdHVyZXMgPSBbXTtcbiAgICAgICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLm5vZGVJZCA9PT0gaWQpXG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChrby5pc09ic2VydmFibGUoc2VsZi50aWxlLmRhdGFbaWRdKSkge1xuICAgICAgICAgICAgICAgIHNlbGYudGlsZS5kYXRhW2lkXSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi50aWxlLmRhdGFbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGlsZS5kYXRhW2lkXS5mZWF0dXJlcyhmZWF0dXJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGdldERyYXdGZWF0dXJlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRyYXdGZWF0dXJlcyA9IFtdO1xuICAgICAgICBzZWxmLmdlb2pzb25XaWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHdpZGdldCkge1xuICAgICAgICAgICAgdmFyIGlkID0ga28udW53cmFwKHdpZGdldC5ub2RlX2lkKTtcbiAgICAgICAgICAgIHZhciBmZWF0dXJlQ29sbGVjdGlvbiA9IGtvTWFwcGluZy50b0pTKHNlbGYudGlsZS5kYXRhW2lkXSk7XG4gICAgICAgICAgICBpZiAoZmVhdHVyZUNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmVhdHVyZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5pZCA9IHV1aWQuZ2VuZXJhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMubm9kZUlkID0gaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZHJhd0ZlYXR1cmVzID0gZHJhd0ZlYXR1cmVzLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRyYXdGZWF0dXJlcztcbiAgICB9O1xuICAgIGRyYXdGZWF0dXJlcyA9IGdldERyYXdGZWF0dXJlcygpO1xuXG4gICAgaWYgKGRyYXdGZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhcmFtcy51c2VQb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgICBwYXJhbXMuYm91bmRzID0gZ2VvanNvbkV4dGVudCh7XG4gICAgICAgICAgICB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICBmZWF0dXJlczogZHJhd0ZlYXR1cmVzLFxuICAgICAgICB9KTtcbiAgICAgICAgcGFyYW1zLmZpdEJvdW5kc09wdGlvbnMgPSB7XG4gICAgICAgICAgICBwYWRkaW5nOiB7XG4gICAgICAgICAgICAgICAgdG9wOiBwYWRkaW5nLFxuICAgICAgICAgICAgICAgIGxlZnQ6IHBhZGRpbmcgKyAyMDAsXG4gICAgICAgICAgICAgICAgYm90dG9tOiBwYWRkaW5nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiBwYWRkaW5nICsgMjAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwYXJhbXMuYWN0aXZlVGFiID0gXCJlZGl0b3JcIjtcbiAgICBwYXJhbXMuc291cmNlcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZ2VvanNvbi1lZGl0b3ItZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJnZW9qc29uXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcGFyYW1zLnNvdXJjZXNcbiAgICApO1xuICAgIHZhciBleHRlbmRlZExheWVycyA9IFtdO1xuICAgIGlmIChwYXJhbXMubGF5ZXJzKSB7XG4gICAgICAgIGV4dGVuZGVkTGF5ZXJzID0ga28udW53cmFwKHBhcmFtcy5sYXllcnMpO1xuICAgIH1cbiAgICB2YXIgZ2VvanNvbkxheWVycyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiZ2VvanNvbi1lZGl0b3ItcG9seWdvbi1maWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcImZpbGxcIixcbiAgICAgICAgICAgIGZpbHRlcjogW1wiPT1cIiwgXCIkdHlwZVwiLCBcIlBvbHlnb25cIl0sXG4gICAgICAgICAgICBwYWludDoge1xuICAgICAgICAgICAgICAgIFwiZmlsbC1jb2xvclwiOiBcIiMzYmIyZDBcIixcbiAgICAgICAgICAgICAgICBcImZpbGwtb3V0bGluZS1jb2xvclwiOiBcIiMzYmIyZDBcIixcbiAgICAgICAgICAgICAgICBcImZpbGwtb3BhY2l0eVwiOiAwLjEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc291cmNlOiBcImdlb2pzb24tZWRpdG9yLWRhdGFcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiZ2VvanNvbi1lZGl0b3ItcG9seWdvbi1zdHJva2UtYmFzZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJsaW5lXCIsXG4gICAgICAgICAgICBmaWx0ZXI6IFtcIj09XCIsIFwiJHR5cGVcIiwgXCJQb2x5Z29uXCJdLFxuICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgXCJsaW5lLWNhcFwiOiBcInJvdW5kXCIsXG4gICAgICAgICAgICAgICAgXCJsaW5lLWpvaW5cIjogXCJyb3VuZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhaW50OiB7XG4gICAgICAgICAgICAgICAgXCJsaW5lLWNvbG9yXCI6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgIFwibGluZS13aWR0aFwiOiA0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvdXJjZTogXCJnZW9qc29uLWVkaXRvci1kYXRhXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImdlb2pzb24tZWRpdG9yLXBvbHlnb24tc3Ryb2tlXCIsXG4gICAgICAgICAgICB0eXBlOiBcImxpbmVcIixcbiAgICAgICAgICAgIGZpbHRlcjogW1wiPT1cIiwgXCIkdHlwZVwiLCBcIlBvbHlnb25cIl0sXG4gICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICBcImxpbmUtY2FwXCI6IFwicm91bmRcIixcbiAgICAgICAgICAgICAgICBcImxpbmUtam9pblwiOiBcInJvdW5kXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFpbnQ6IHtcbiAgICAgICAgICAgICAgICBcImxpbmUtY29sb3JcIjogXCIjM2JiMmQwXCIsXG4gICAgICAgICAgICAgICAgXCJsaW5lLXdpZHRoXCI6IDIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc291cmNlOiBcImdlb2pzb24tZWRpdG9yLWRhdGFcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiZ2VvanNvbi1lZGl0b3ItbGluZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJsaW5lXCIsXG4gICAgICAgICAgICBmaWx0ZXI6IFtcIj09XCIsIFwiJHR5cGVcIiwgXCJMaW5lU3RyaW5nXCJdLFxuICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgXCJsaW5lLWNhcFwiOiBcInJvdW5kXCIsXG4gICAgICAgICAgICAgICAgXCJsaW5lLWpvaW5cIjogXCJyb3VuZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhaW50OiB7XG4gICAgICAgICAgICAgICAgXCJsaW5lLWNvbG9yXCI6IFwiIzNiYjJkMFwiLFxuICAgICAgICAgICAgICAgIFwibGluZS13aWR0aFwiOiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvdXJjZTogXCJnZW9qc29uLWVkaXRvci1kYXRhXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImdlb2pzb24tZWRpdG9yLXBvaW50LXBvaW50LXN0cm9rZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJjaXJjbGVcIixcbiAgICAgICAgICAgIGZpbHRlcjogW1wiPT1cIiwgXCIkdHlwZVwiLCBcIlBvaW50XCJdLFxuICAgICAgICAgICAgcGFpbnQ6IHtcbiAgICAgICAgICAgICAgICBcImNpcmNsZS1yYWRpdXNcIjogNixcbiAgICAgICAgICAgICAgICBcImNpcmNsZS1vcGFjaXR5XCI6IDEsXG4gICAgICAgICAgICAgICAgXCJjaXJjbGUtY29sb3JcIjogXCIjZmZmXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc291cmNlOiBcImdlb2pzb24tZWRpdG9yLWRhdGFcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiZ2VvanNvbi1lZGl0b3ItcG9pbnRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiY2lyY2xlXCIsXG4gICAgICAgICAgICBmaWx0ZXI6IFtcIj09XCIsIFwiJHR5cGVcIiwgXCJQb2ludFwiXSxcbiAgICAgICAgICAgIHBhaW50OiB7XG4gICAgICAgICAgICAgICAgXCJjaXJjbGUtcmFkaXVzXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJjaXJjbGUtY29sb3JcIjogXCIjM2JiMmQwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc291cmNlOiBcImdlb2pzb24tZWRpdG9yLWRhdGFcIixcbiAgICAgICAgfSxcbiAgICBdO1xuXG4gICAgcGFyYW1zLmxheWVycyA9IGtvLm9ic2VydmFibGUoXG4gICAgICAgIGV4dGVuZGVkTGF5ZXJzLmNvbmNhdChzZWxlY3RGZWF0dXJlTGF5ZXJzLCBnZW9qc29uTGF5ZXJzKVxuICAgICk7XG5cbiAgICBNYXBDb21wb25lbnRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgdGhpcy5kZWxldGVGZWF0dXJlID0gZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgaWYgKHNlbGYuZHJhdykge1xuICAgICAgICAgICAgc2VsZi5kcmF3LmRlbGV0ZShmZWF0dXJlLmlkKTtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRGZWF0dXJlSWRzKFxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRGZWF0dXJlSWRzKCkuZmlsdGVyKGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWQgIT09IGZlYXR1cmUuaWQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVRpbGVzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5lZGl0RmVhdHVyZSA9IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICAgIGlmIChzZWxmLmRyYXcpIHtcbiAgICAgICAgICAgIHNlbGYuZHJhdy5jaGFuZ2VNb2RlKFwic2ltcGxlX3NlbGVjdFwiLCB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZUlkczogW2ZlYXR1cmUuaWRdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkRmVhdHVyZUlkcyhbZmVhdHVyZS5pZF0pO1xuICAgICAgICAgICAgXy5lYWNoKHNlbGYuZmVhdHVyZUxvb2t1cCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuc2VsZWN0ZWRUb29sKG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGVMYXllcnMgPSBmdW5jdGlvbiAobGF5ZXJzKSB7XG4gICAgICAgIHZhciBtYXAgPSBzZWxmLm1hcCgpO1xuICAgICAgICB2YXIgc3R5bGUgPSBtYXAuZ2V0U3R5bGUoKTtcbiAgICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgICAgICBzdHlsZS5sYXllcnMgPSBzZWxmLmRyYXdcbiAgICAgICAgICAgICAgICA/IGxheWVycy5jb25jYXQoc2VsZi5kcmF3Lm9wdGlvbnMuc3R5bGVzKVxuICAgICAgICAgICAgICAgIDogbGF5ZXJzO1xuICAgICAgICAgICAgbWFwLnNldFN0eWxlKHN0eWxlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmZpdEZlYXR1cmVzID0gZnVuY3Rpb24gKGZlYXR1cmVzKSB7XG4gICAgICAgIHZhciBtYXAgPSBzZWxmLm1hcCgpO1xuICAgICAgICB2YXIgYm91bmRzID0gZ2VvanNvbkV4dGVudCh7XG4gICAgICAgICAgICB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZXMsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY2FtZXJhID0gbWFwLmNhbWVyYUZvckJvdW5kcyhib3VuZHMsIHsgcGFkZGluZzogcGFkZGluZyB9KTtcbiAgICAgICAgbWFwLmp1bXBUbyhjYW1lcmEpO1xuICAgIH07XG5cbiAgICB0aGlzLmVkaXRHZW9KU09OID0gZnVuY3Rpb24gKGZlYXR1cmVzLCBub2RlSWQpIHtcbiAgICAgICAgdmFyIGdlb0pTT05TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBcIiAgIFwiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2VvSlNPTlN0cmluZyhnZW9KU09OU3RyaW5nKTtcbiAgICAgICAgc2VsZi5uZXdOb2RlSWQgPSBub2RlSWQ7XG4gICAgfTtcbiAgICB0aGlzLmdlb0pTT05TdHJpbmcuc3Vic2NyaWJlKGZ1bmN0aW9uIChnZW9KU09OU3RyaW5nKSB7XG4gICAgICAgIHZhciBtYXAgPSBzZWxmLm1hcCgpO1xuICAgICAgICBpZiAoZ2VvSlNPTlN0cmluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZXR1cERyYXcobWFwKTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmLmRyYXcpIHtcbiAgICAgICAgICAgIG1hcC5yZW1vdmVDb250cm9sKHNlbGYuZHJhdyk7XG4gICAgICAgICAgICBzZWxmLmRyYXcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkRmVhdHVyZUlkcyhbXSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zZXRTZWxlY3RMYXllcnNWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICB9KTtcbiAgICB0aGlzLmdlb0pTT05FcnJvcnMgPSBrb1xuICAgICAgICAucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBnZW9KU09OU3RyaW5nID0gc2VsZi5nZW9KU09OU3RyaW5nKCk7XG4gICAgICAgICAgICB2YXIgaGludCA9IGdlb2pzb25oaW50LmhpbnQoZ2VvSlNPTlN0cmluZyk7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gW107XG4gICAgICAgICAgICBoaW50LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZXZlbCAhPT0gXCJtZXNzYWdlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgICB9KVxuICAgICAgICAuZXh0ZW5kKHsgcmF0ZUxpbWl0OiA1MCB9KTtcbiAgICB2YXIgZ2VvSlNPTkxheWVyRGF0YSA9IGtvXG4gICAgICAgIC5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGdlb0pTT05TdHJpbmcgPSBzZWxmLmdlb0pTT05TdHJpbmcoKTtcbiAgICAgICAgICAgIHZhciBnZW9KU09ORXJyb3JzID0gc2VsZi5nZW9KU09ORXJyb3JzKCk7XG4gICAgICAgICAgICBpZiAoZ2VvSlNPTkVycm9ycy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZ2VvSlNPTlN0cmluZyk7XG4gICAgICAgICAgICB2YXIgZmMgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgICAgICAgICAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoc2VsZi5idWZmZXJOb2RlSWQoKSAmJiBzZWxmLmJ1ZmZlclJlc3VsdCgpKSB7XG4gICAgICAgICAgICAgICAgZmMuZmVhdHVyZXMucHVzaChzZWxmLmJ1ZmZlclJlc3VsdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYztcbiAgICAgICAgfSlcbiAgICAgICAgLmV4dGVuZCh7IHJhdGVMaW1pdDogMTAwIH0pO1xuICAgIGdlb0pTT05MYXllckRhdGEuc3Vic2NyaWJlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBtYXAgPSBzZWxmLm1hcCgpO1xuICAgICAgICBtYXAuZ2V0U291cmNlKFwiZ2VvanNvbi1lZGl0b3ItZGF0YVwiKS5zZXREYXRhKGRhdGEpO1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlR2VvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNlbGYuZ2VvSlNPTkVycm9ycygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2VsZi5kcmF3QXZhaWxhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIHZhciBnZW9KU09OID0gSlNPTi5wYXJzZSh0aGlzLmdlb0pTT05TdHJpbmcoKSk7XG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBzZWxmLmRyYXdBdmFpbGFibGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBnZW9KU09OLmZlYXR1cmVzID0gZ2VvSlNPTi5mZWF0dXJlcy5maWx0ZXIoZnVuY3Rpb24gKFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmZWF0dXJlLmdlb21ldHJ5O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChnZW9KU09OLmZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tYXAoKS5maXRCb3VuZHMoZ2VvanNvbkV4dGVudChnZW9KU09OKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogcGFkZGluZyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGdlb0pTT04uZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5pZCA9IHV1aWQuZ2VuZXJhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmVhdHVyZS5wcm9wZXJ0aWVzKSBmZWF0dXJlLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5ub2RlSWQgPSBzZWxmLm5ld05vZGVJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZHJhdy5hZGQoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVRpbGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZ2VvSlNPTlN0cmluZyh1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAvLyB2YXIgZ2VvSlNPTiA9IEpTT04ucGFyc2UodGhpcy5nZW9KU09OU3RyaW5nKCkpO1xuICAgICAgICAgICAgLy8gZ2VvSlNPTi5mZWF0dXJlcy5mb3JFYWNoKGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgICAgIC8vICAgICBmZWF0dXJlLmlkID0gdXVpZC5nZW5lcmF0ZSgpO1xuICAgICAgICAgICAgLy8gICAgIGlmICghZmVhdHVyZS5wcm9wZXJ0aWVzKSBmZWF0dXJlLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICAgIC8vICAgICBmZWF0dXJlLnByb3BlcnRpZXMubm9kZUlkID0gc2VsZi5uZXdOb2RlSWQ7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIGlmIChrby5pc09ic2VydmFibGUoc2VsZi50aWxlLmRhdGFbc2VsZi5uZXdOb2RlSWRdKSkge1xuICAgICAgICAgICAgLy8gICAgIHNlbGYudGlsZS5kYXRhW3NlbGYubmV3Tm9kZUlkXShnZW9KU09OKTtcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgc2VsZi50aWxlLmRhdGFbc2VsZi5uZXdOb2RlSWRdLmZlYXR1cmVzKGdlb0pTT04uZmVhdHVyZXMpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gc2VsZi5nZW9KU09OU3RyaW5nKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHNldHVwRHJhdyA9IGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgdmFyIG1vZGVzID0gTWFwYm94RHJhdy5tb2RlcztcbiAgICAgICAgbW9kZXMuc3RhdGljID0ge1xuICAgICAgICAgICAgb25TZXR1cDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9uYWJsZVN0YXRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvRGlzcGxheUZlYXR1cmVzOiBmdW5jdGlvbiAoc3RhdGUsIGdlb2pzb24sIGRpc3BsYXkpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5KGdlb2pzb24pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5kcmF3ID0gbmV3IE1hcGJveERyYXcoe1xuICAgICAgICAgICAgZGlzcGxheUNvbnRyb2xzRGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBtb2RlczogbW9kZXMsXG4gICAgICAgIH0pO1xuICAgICAgICBtYXAuYWRkQ29udHJvbChzZWxmLmRyYXcpO1xuICAgICAgICBzZWxmLmRyYXcuc2V0KHtcbiAgICAgICAgICAgIHR5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICAgICAgICAgIGZlYXR1cmVzOiBnZXREcmF3RmVhdHVyZXMoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIG1hcC5vbihcImRyYXcuY3JlYXRlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLmZlYXR1cmVzLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYXcuc2V0RmVhdHVyZVByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLmlkLFxuICAgICAgICAgICAgICAgICAgICBcIm5vZGVJZFwiLFxuICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld05vZGVJZFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlVGlsZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1hcC5vbihcImRyYXcudXBkYXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlVGlsZXMoKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvb3JkaW5hdGVFZGl0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWRpdGluZ0ZlYXR1cmUgPVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRyYXcuZ2V0U2VsZWN0ZWQoKS5mZWF0dXJlc1swXTtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdGluZ0ZlYXR1cmUpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNvb3JkaW5hdGVzRnJvbUZlYXR1cmUoZWRpdGluZ0ZlYXR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYuYnVmZmVyTm9kZUlkKCkpIHNlbGYudXBkYXRlQnVmZmVyRmVhdHVyZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgbWFwLm9uKFwiZHJhdy5kZWxldGVcIiwgc2VsZi51cGRhdGVUaWxlcyk7XG4gICAgICAgIG1hcC5vbihcImRyYXcubW9kZWNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVUaWxlcygpO1xuICAgICAgICAgICAgc2VsZi5zZXRTZWxlY3RMYXllcnNWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgIG1hcC5kcmF3X21vZGUgPSBlLm1vZGU7XG4gICAgICAgIH0pO1xuICAgICAgICBtYXAub24oXCJkcmF3LnNlbGVjdGlvbmNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZEZlYXR1cmVJZHMoXG4gICAgICAgICAgICAgICAgZS5mZWF0dXJlcy5tYXAoZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZlYXR1cmUuaWQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoZS5mZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHNlbGYuZmVhdHVyZUxvb2t1cCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnNlbGVjdGVkVG9vbChudWxsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuc2V0U2VsZWN0TGF5ZXJzVmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzZWxmLmZvcm0pXG4gICAgICAgICAgICBzZWxmLmZvcm0ub24oXCJ0aWxlLXJlc2V0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSBzZWxmLm1hcCgpLmdldFN0eWxlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZHJhdy5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZXM6IGdldERyYXdGZWF0dXJlcygpLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXy5lYWNoKHNlbGYuZmVhdHVyZUxvb2t1cCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zZWxlY3RlZFRvb2woKSkgdmFsdWUuc2VsZWN0ZWRUb29sKFwiXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGlmIChzZWxmLmRyYXcpIHtcbiAgICAgICAgICAgIHNlbGYuZHJhd0F2YWlsYWJsZSh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnByb3Zpc2lvbmFsVGlsZVZpZXdNb2RlbCkge1xuICAgICAgICB0aGlzLnByb3Zpc2lvbmFsVGlsZVZpZXdNb2RlbC5yZXNldEF1dGhvcml0YXRpdmUoKTtcbiAgICAgICAgdGhpcy5wcm92aXNpb25hbFRpbGVWaWV3TW9kZWwuc2VsZWN0ZWRQcm92aXNpb25hbEVkaXQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3BsYXlBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmVhdHVyZUNvbGxlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrIGluIHNlbGYudGlsZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuZmVhdHVyZUxvb2t1cFtrXSAmJiBzZWxmLmRyYXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uID0gc2VsZi5kcmF3LmdldEFsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMgPSBrby51bndyYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mZWF0dXJlTG9va3VwW2tdLmZlYXR1cmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kcmF3LnNldChmZWF0dXJlQ29sbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcGFzczogVHlwZUVycm9yIGluIGRyYXcgc2VlbXMgaW5jb25zZXF1ZW50aWFsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGRpc3BsYXlBbGwsIDEwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHRoaXMubWFwLnN1YnNjcmliZShzZXR1cERyYXcpO1xuXG4gICAgc2VsZi5tYXAuc3Vic2NyaWJlKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgaWYgKHNlbGYuZHJhdyAmJiAhcGFyYW1zLmRyYXcpIHtcbiAgICAgICAgICAgIHBhcmFtcy5kcmF3ID0gc2VsZi5kcmF3O1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXAgJiYgIXBhcmFtcy5tYXApIHtcbiAgICAgICAgICAgIHBhcmFtcy5tYXAgPSBtYXA7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghcGFyYW1zLmFkZGl0aW9uYWxEcmF3T3B0aW9ucykge1xuICAgICAgICBwYXJhbXMuYWRkaXRpb25hbERyYXdPcHRpb25zID0gW107XG4gICAgfVxuXG4gICAgc2VsZi5nZW9qc29uV2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3aWRnZXQpIHtcbiAgICAgICAgaWYgKHdpZGdldC5jb25maWcuZ2VvbWV0cnlUeXBlcykge1xuICAgICAgICAgICAgd2lkZ2V0LmRyYXdUb29scyA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAga29cbiAgICAgICAgICAgICAgICAgICAgICAgIC51bndyYXAod2lkZ2V0LmNvbmZpZy5nZW9tZXRyeVR5cGVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGtvLnVud3JhcCh0eXBlLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IFwiZHJhd19wb2ludFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyY2hlcy50cmFuc2xhdGlvbnMubWFwQWRkUG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkxpbmVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IFwiZHJhd19saW5lX3N0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyY2hlcy50cmFuc2xhdGlvbnMubWFwQWRkTGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gXCJkcmF3X3BvbHlnb25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmNoZXMudHJhbnNsYXRpb25zLm1hcEFkZFBvbHlnb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RTb3VyY2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwic2VsZWN0X2ZlYXR1cmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RUZXh0KCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmNoZXMudHJhbnNsYXRpb25zLm1hcFNlbGVjdERyYXdpbmcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucy5jb25jYXQocGFyYW1zLmFkZGl0aW9uYWxEcmF3T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pc0ZlYXR1cmVDbGlja2FibGUgPSBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICB2YXIgdG9vbCA9IHNlbGYuc2VsZWN0ZWRUb29sKCk7XG4gICAgICAgIGlmICh0b29sICYmIHRvb2wgIT09IFwic2VsZWN0X2ZlYXR1cmVcIikgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLnJlc291cmNlaW5zdGFuY2VpZCB8fFxuICAgICAgICAgICAgc2VsZi5pc1NlbGVjdGFibGUoZmVhdHVyZSlcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgc2VsZi5pc1NlbGVjdGFibGUgPSBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICB2YXIgc2VsZWN0TGF5ZXJJZHMgPSBzZWxlY3RGZWF0dXJlTGF5ZXJzLm1hcChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXllci5pZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RMYXllcklkcy5pbmRleE9mKGZlYXR1cmUubGF5ZXIuaWQpID49IDA7XG4gICAgfTtcblxuICAgIHZhciBhZGRTZWxlY3RGZWF0dXJlcyA9IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgICAgICB2YXIgZmVhdHVyZUlkcyA9IFtdO1xuICAgICAgICBmZWF0dXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICAgICAgICBmZWF0dXJlLmlkID0gdXVpZC5nZW5lcmF0ZSgpO1xuICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzID0ge1xuICAgICAgICAgICAgICAgIG5vZGVJZDogc2VsZi5uZXdOb2RlSWQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2VsZi5kcmF3LmFkZChmZWF0dXJlKTtcbiAgICAgICAgICAgIGZlYXR1cmVJZHMucHVzaChmZWF0dXJlLmlkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYudXBkYXRlVGlsZXMoKTtcbiAgICAgICAgaWYgKHNlbGYucG9wdXApIHNlbGYucG9wdXAucmVtb3ZlKCk7XG4gICAgICAgIHNlbGYuZHJhdy5jaGFuZ2VNb2RlKFwic2ltcGxlX3NlbGVjdFwiLCB7XG4gICAgICAgICAgICBmZWF0dXJlSWRzOiBmZWF0dXJlSWRzLFxuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZEZlYXR1cmVJZHMoZmVhdHVyZUlkcyk7XG4gICAgICAgIF8uZWFjaChzZWxmLmZlYXR1cmVMb29rdXAsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUuc2VsZWN0ZWRUb29sKG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi5zZWxlY3RGZWF0dXJlID0gZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBnZW9tZXRyeSA9IEpTT04ucGFyc2UoZmVhdHVyZS5wcm9wZXJ0aWVzLmdlb2pzb24pO1xuICAgICAgICAgICAgdmFyIG5ld0ZlYXR1cmUgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJGZWF0dXJlXCIsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge30sXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnk6IGdlb21ldHJ5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGFkZFNlbGVjdEZlYXR1cmVzKFtuZXdGZWF0dXJlXSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICQuZ2V0SlNPTihmZWF0dXJlLnByb3BlcnRpZXMuZ2VvanNvbiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBhZGRTZWxlY3RGZWF0dXJlcyhkYXRhLmZlYXR1cmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBhZGRGcm9tR2VvSlNPTiA9IGZ1bmN0aW9uIChnZW9KU09OU3RyaW5nLCBub2RlSWQpIHtcbiAgICAgICAgdmFyIGhpbnQgPSBnZW9qc29uaGludC5oaW50KGdlb0pTT05TdHJpbmcpO1xuICAgICAgICB2YXIgZXJyb3JzID0gW107XG4gICAgICAgIGhpbnQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWwgIT09IFwibWVzc2FnZVwiKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdmFyIGdlb0pTT04gPSBKU09OLnBhcnNlKGdlb0pTT05TdHJpbmcpO1xuICAgICAgICAgICAgZ2VvSlNPTi5mZWF0dXJlcyA9IGdlb0pTT04uZmVhdHVyZXMuZmlsdGVyKGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZlYXR1cmUuZ2VvbWV0cnk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChnZW9KU09OLmZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1hcCgpLmZpdEJvdW5kcyhnZW9qc29uRXh0ZW50KGdlb0pTT04pLCB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IHBhZGRpbmcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZ2VvSlNPTi5mZWF0dXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmUuaWQgPSB1dWlkLmdlbmVyYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmVhdHVyZS5wcm9wZXJ0aWVzKSBmZWF0dXJlLnByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLm5vZGVJZCA9IG5vZGVJZDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kcmF3LmFkZChmZWF0dXJlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVRpbGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICB9O1xuXG4gICAgc2VsZi5oYW5kbGVGaWxlcyA9IGZ1bmN0aW9uIChmaWxlcywgbm9kZUlkKSB7XG4gICAgICAgIHZhciBlcnJvcnMgPSBbXTtcbiAgICAgICAgdmFyIHByb21pc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBleHRlbnNpb24gPSBmaWxlc1tpXS5uYW1lLnNwbGl0KFwiLlwiKS5wb3AoKTtcbiAgICAgICAgICAgIGlmICghW1wia21sXCIsIFwianNvblwiLCBcImdlb2pzb25cIiwgXCJzaHBcIiwgXCJ6aXBcIl0uaW5jbHVkZXMoZXh0ZW5zaW9uKSkge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0ZpbGUgdW5zdXBwb3J0ZWQ6IFwiJyArIGZpbGVzW2ldLm5hbWUgKyAnXCInLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGZpbGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXh0ZW5zaW9uID0gZmlsZS5uYW1lLnNwbGl0KFwiLlwiKS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyB3aW5kb3cuRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdlb0pTT047XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoW1wianNvblwiLCBcImdlb2pzb25cIl0uaW5jbHVkZXMoZXh0ZW5zaW9uKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW9KU09OID0gSlNPTi5wYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZXh0ZW5zaW9uID09PSBcImttbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb0pTT04gPSBrbWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyB3aW5kb3cuRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQucmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChleHRlbnNpb24gPT09IFwic2hwXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VvSlNPTiA9IHtcInR5cGVcIjogXCJGZWF0dXJlQ29sbGVjdGlvblwiLCBcImZlYXR1cmVzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaHBqcy5wYXJzZVNocChlLnRhcmdldC5yZXN1bHQpLnJlZHVjZShmdW5jdGlvbihmZWF0dXJlcywgZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlcyA9IGZlYXR1cmVzLmNvbmNhdCh7XCJ0eXBlXCI6IFwiRmVhdHVyZVwiLCBcImdlb21ldHJ5XCI6IGdlb21ldHJ5LCBcInByb3BlcnRpZXNcIjoge319KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmVhdHVyZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSl9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZXh0ZW5zaW9uID09PSBcInppcFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNocGpzLnBhcnNlWmlwKGUudGFyZ2V0LnJlc3VsdCkudGhlbihmdW5jdGlvbihwYXJzZWRaaXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZWRaaXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbiAhPT0gXCJ6aXBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGdlb0pTT04pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoW1wic2hwXCIsIFwiemlwXCJdLmluY2x1ZGVzKGV4dGVuc2lvbikpXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgICAgICAgdmFyIGdlb0pTT04gPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgICAgICAgICAgICAgIGZlYXR1cmVzOiByZXN1bHRzLnJlZHVjZShmdW5jdGlvbiAoZmVhdHVyZXMsIGdlb0pTT04pIHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZXMgPSBmZWF0dXJlcy5jb25jYXQoZ2VvSlNPTi5mZWF0dXJlcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmZWF0dXJlcztcbiAgICAgICAgICAgICAgICB9LCBbXSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdChcbiAgICAgICAgICAgICAgICBhZGRGcm9tR2VvSlNPTihKU09OLnN0cmluZ2lmeShnZW9KU09OKSwgbm9kZUlkKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHNlbGYuZmVhdHVyZUxvb2t1cFtub2RlSWRdLmRyb3BFcnJvcnMoZXJyb3JzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYuZHJvcFpvbmVIYW5kbGVyID0gZnVuY3Rpb24gKGRhdGEsIGUpIHtcbiAgICAgICAgdmFyIG5vZGVJZCA9IGRhdGEubm9kZS5ub2RlaWQ7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIGZpbGVzID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICAgICAgc2VsZi5oYW5kbGVGaWxlcyhmaWxlcywgbm9kZUlkKTtcbiAgICAgICAgc2VsZi5kcm9wWm9uZUxlYXZlSGFuZGxlcihkYXRhLCBlKTtcbiAgICB9O1xuXG4gICAgc2VsZi5kcm9wWm9uZU92ZXJIYW5kbGVyID0gZnVuY3Rpb24gKGRhdGEsIGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBcImNvcHlcIjtcbiAgICB9O1xuXG4gICAgc2VsZi5kcm9wWm9uZUNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uIChkYXRhLCBlKSB7XG4gICAgICAgIHZhciBmaWxlSW5wdXQgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIFwiLmhpZGRlbi1maWxlLWlucHV0IGlucHV0XCJcbiAgICAgICAgKTtcbiAgICAgICAgdmFyIGV2ZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7XG4gICAgICAgIGV2ZW50LmluaXRFdmVudChcImNsaWNrXCIsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgZmlsZUlucHV0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH07XG5cbiAgICBzZWxmLmRyb3Bab25lRW50ZXJIYW5kbGVyID0gZnVuY3Rpb24gKGRhdGEsIGUpIHtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyYWctaG92ZXJcIik7XG4gICAgfTtcblxuICAgIHNlbGYuZHJvcFpvbmVMZWF2ZUhhbmRsZXIgPSBmdW5jdGlvbiAoZGF0YSwgZSkge1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZy1ob3ZlclwiKTtcbiAgICB9O1xuXG4gICAgc2VsZi5kcm9wWm9uZUZpbGVTZWxlY3RlZCA9IGZ1bmN0aW9uIChkYXRhLCBlKSB7XG4gICAgICAgIHNlbGYuaGFuZGxlRmlsZXMoZS50YXJnZXQuZmlsZXMsIGRhdGEubm9kZS5ub2RlaWQpO1xuICAgIH07XG4gICAgc2VsZi5jb29yZGluYXRlUmVmZXJlbmNlcyA9IGFyY2hlcy5wcmVmZXJyZWRDb29yZGluYXRlU3lzdGVtcztcbiAgICBzZWxmLnNlbGVjdGVkQ29vcmRpbmF0ZVJlZmVyZW5jZSA9IGtvLm9ic2VydmFibGUoXG4gICAgICAgIHNlbGYuY29vcmRpbmF0ZVJlZmVyZW5jZXNbMF0ucHJvajRcbiAgICApO1xuICAgIHNlbGYuY29vcmRpbmF0ZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB2YXIgZ2VvZ3JhcGhpYyA9ICcrcHJvaj1sb25nbGF0ICtkYXR1bT1XR1M4NCArbm9fZGVmc1wiLCBcImRlZmF1bHQnO1xuICAgIHNlbGYucmF3Q29vcmRpbmF0ZXMgPSBrb1xuICAgICAgICAuY29tcHV0ZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29vcmRpbmF0ZXMoKS5tYXAoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICAgICAgICAgIHZhciBzb3VyY2VDUlMgPSBzZWxmLnNlbGVjdGVkQ29vcmRpbmF0ZVJlZmVyZW5jZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qNChzb3VyY2VDUlMsIGdlb2dyYXBoaWMsIFtcbiAgICAgICAgICAgICAgICAgICAgTnVtYmVyKGNvb3Jkc1swXSgpKSxcbiAgICAgICAgICAgICAgICAgICAgTnVtYmVyKGNvb3Jkc1sxXSgpKSxcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuZXh0ZW5kKHsgdGhyb3R0bGU6IDEwMCB9KTtcbiAgICBzZWxmLnJhd0Nvb3JkaW5hdGVzLnN1YnNjcmliZShmdW5jdGlvbiAocmF3Q29vcmRpbmF0ZXMpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkRmVhdHVyZUlkID0gc2VsZi5zZWxlY3RlZEZlYXR1cmVJZHMoKVswXTtcbiAgICAgICAgaWYgKHNlbGYuY29vcmRpbmF0ZUVkaXRpbmcoKSkge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRmVhdHVyZUlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRyYXdGZWF0dXJlcyA9IGdldERyYXdGZWF0dXJlcygpO1xuICAgICAgICAgICAgICAgIGRyYXdGZWF0dXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLmlkID09PSBzZWxlY3RlZEZlYXR1cmVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gXCJQb2x5Z29uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdDb29yZGluYXRlcy5wdXNoKHJhd0Nvb3JkaW5hdGVzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3Q29vcmRpbmF0ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gXCJQb2ludFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdDb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcyA9IHJhd0Nvb3JkaW5hdGVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmF3LnNldCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZXM6IGRyYXdGZWF0dXJlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVRpbGVzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJhd0Nvb3JkaW5hdGVzLmxlbmd0aCA+PSBzZWxmLm1pbkNvb3JkaW5hdGVzKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgZ2VvbVR5cGUgPSBzZWxmLmNvb3JkaW5hdGVHZW9tVHlwZSgpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZ2VvbVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd0Nvb3JkaW5hdGVzLnB1c2gocmF3Q29vcmRpbmF0ZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSBbcmF3Q29vcmRpbmF0ZXNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSByYXdDb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSByYXdDb29yZGluYXRlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRTZWxlY3RGZWF0dXJlcyhbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiRmVhdHVyZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBnZW9tVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgc2VsZi5zaG93Q29vcmRpbmF0ZUZlYXR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZEZlYXR1cmVJZHMgPSBzZWxmLnNlbGVjdGVkRmVhdHVyZUlkcygpO1xuICAgICAgICB2YXIgZmVhdHVyZUlkID0gc2VsZWN0ZWRGZWF0dXJlSWRzWzBdO1xuICAgICAgICBpZiAoZmVhdHVyZUlkKSB7XG4gICAgICAgICAgICB2YXIgZmVhdHVyZSA9IHNlbGYuZHJhdy5nZXQoZmVhdHVyZUlkKTtcbiAgICAgICAgICAgIHNlbGYuZml0RmVhdHVyZXMoW2ZlYXR1cmVdKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZWxmLmNvb3JkaW5hdGVFZGl0aW5nID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgc2VsZi5uZXdYID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHNlbGYubmV3WSA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB2YXIgbmV3Q29vcmRpbmF0ZVBhaXIgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB4ID0gc2VsZi5uZXdYKCk7XG4gICAgICAgIHZhciB5ID0gc2VsZi5uZXdZKCk7XG4gICAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfSk7XG4gICAgc2VsZi5mb2N1c0xhdGVzdFkgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xuICAgIHZhciBnZXROZXdDb29yZGluYXRlUGFpciA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgdmFyIG5ld0Nvb3JkcyA9IFtcbiAgICAgICAgICAgIGtvLm9ic2VydmFibGUoY29vcmRzWzBdKSxcbiAgICAgICAgICAgIGtvLm9ic2VydmFibGUoY29vcmRzWzFdKSxcbiAgICAgICAgXTtcbiAgICAgICAgbmV3Q29vcmRzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZS5zdWJzY3JpYmUoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKFt1bmRlZmluZWQsIG51bGwsIFwiXCJdLmluY2x1ZGVzKG5ld1ZhbHVlKSkgdmFsdWUoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXdDb29yZHM7XG4gICAgfTtcbiAgICBuZXdDb29yZGluYXRlUGFpci5zdWJzY3JpYmUoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICBpZiAoY29vcmRzWzBdICYmIGNvb3Jkc1sxXSkge1xuICAgICAgICAgICAgc2VsZi5jb29yZGluYXRlcy5wdXNoKGdldE5ld0Nvb3JkaW5hdGVQYWlyKGNvb3JkcykpO1xuICAgICAgICAgICAgc2VsZi5uZXdYKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBzZWxmLm5ld1kodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHNlbGYuZm9jdXNMYXRlc3RZKHRydWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFyIHVwZGF0ZUNvb3JkaW5hdGVzRnJvbUZlYXR1cmUgPSBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICB2YXIgc291cmNlQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gXCJQb2x5Z29uXCIpIHtcbiAgICAgICAgICAgIHNvdXJjZUNvb3JkaW5hdGVzID0gW107XG4gICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICBpIDwgZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlc1swXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc291cmNlQ29vcmRpbmF0ZXMucHVzaChmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09IFwiUG9pbnRcIilcbiAgICAgICAgICAgIHNvdXJjZUNvb3JkaW5hdGVzID0gW2ZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXNdO1xuICAgICAgICBlbHNlIHNvdXJjZUNvb3JkaW5hdGVzID0gZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgICAgc2VsZi5jb29yZGluYXRlR2VvbVR5cGUoZmVhdHVyZS5nZW9tZXRyeS50eXBlKTtcbiAgICAgICAgc2VsZi5jb29yZGluYXRlcyhcbiAgICAgICAgICAgIHNvdXJjZUNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0Nvb3JkcyA9IGdldE5ld0Nvb3JkaW5hdGVQYWlyKGNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtQ29vcmRpbmF0ZVBhaXIobmV3Q29vcmRzLCBnZW9ncmFwaGljKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3Q29vcmRzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIHZhciB0cmFuc2Zvcm1Db29yZGluYXRlUGFpciA9IGZ1bmN0aW9uIChjb29yZHMsIHNvdXJjZUNSUykge1xuICAgICAgICB2YXIgdGFyZ2V0Q1JTID0gc2VsZi5zZWxlY3RlZENvb3JkaW5hdGVSZWZlcmVuY2UoKTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVkQ29vcmRpbmF0ZXMgPSBwcm9qNChzb3VyY2VDUlMsIHRhcmdldENSUywgW1xuICAgICAgICAgICAgTnVtYmVyKGNvb3Jkc1swXSgpKSxcbiAgICAgICAgICAgIE51bWJlcihjb29yZHNbMV0oKSksXG4gICAgICAgIF0pO1xuICAgICAgICBjb29yZHNbMF0odHJhbnNmb3JtZWRDb29yZGluYXRlc1swXSk7XG4gICAgICAgIGNvb3Jkc1sxXSh0cmFuc2Zvcm1lZENvb3JkaW5hdGVzWzFdKTtcbiAgICB9O1xuICAgIHZhciBwcmV2aW91c0NSUyA9IHNlbGYuc2VsZWN0ZWRDb29yZGluYXRlUmVmZXJlbmNlKCk7XG4gICAgdmFyIHRyYW5zZm9ybUNvb3JkaW5hdGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGFyZ2V0Q1JTID0gc2VsZi5zZWxlY3RlZENvb3JkaW5hdGVSZWZlcmVuY2UoKTtcbiAgICAgICAgc2VsZi5jb29yZGluYXRlcygpLmZvckVhY2goZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICAgICAgdHJhbnNmb3JtQ29vcmRpbmF0ZVBhaXIoY29vcmRzLCBwcmV2aW91c0NSUyk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcmV2aW91c0NSUyA9IHRhcmdldENSUztcbiAgICB9O1xuICAgIHNlbGYuc2VsZWN0ZWRDb29yZGluYXRlUmVmZXJlbmNlLnN1YnNjcmliZSh0cmFuc2Zvcm1Db29yZGluYXRlcyk7XG5cbiAgICBzZWxmLmNvb3JkaW5hdGVHZW9tVHlwZSA9IGtvLm9ic2VydmFibGUoKTtcbiAgICBzZWxmLmNvb3JkaW5hdGVFZGl0aW5nLnN1YnNjcmliZShmdW5jdGlvbiAoZWRpdGluZykge1xuICAgICAgICBzZWxmLmNvb3JkaW5hdGVHZW9tVHlwZShudWxsKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkVG9vbCA9IHNlbGYuc2VsZWN0ZWRUb29sKCk7XG4gICAgICAgIHN3aXRjaCAoc2VsZWN0ZWRUb29sKSB7XG4gICAgICAgICAgICBjYXNlIFwiZHJhd19wb2ludFwiOlxuICAgICAgICAgICAgICAgIHNlbGYuY29vcmRpbmF0ZUdlb21UeXBlKFwiUG9pbnRcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZHJhd19saW5lX3N0cmluZ1wiOlxuICAgICAgICAgICAgICAgIHNlbGYuY29vcmRpbmF0ZUdlb21UeXBlKFwiTGluZVN0cmluZ1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkcmF3X3BvbHlnb25cIjpcbiAgICAgICAgICAgICAgICBzZWxmLmNvb3JkaW5hdGVHZW9tVHlwZShcIlBvbHlnb25cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxlY3RlZEZlYXR1cmVJZHMgPSBzZWxmLnNlbGVjdGVkRmVhdHVyZUlkcygpO1xuICAgICAgICB2YXIgZmVhdHVyZUlkID0gc2VsZWN0ZWRGZWF0dXJlSWRzWzBdO1xuICAgICAgICBzZWxmLmZvY3VzTGF0ZXN0WShmYWxzZSk7XG4gICAgICAgIHNlbGYuY29vcmRpbmF0ZXMoW10pO1xuICAgICAgICBzZWxmLm5ld1godW5kZWZpbmVkKTtcbiAgICAgICAgc2VsZi5uZXdZKHVuZGVmaW5lZCk7XG4gICAgICAgIGlmIChlZGl0aW5nKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0Q29uZmlnO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRmVhdHVyZUlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Q29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlSWRzOiBbZmVhdHVyZUlkXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRGZWF0dXJlSWRzKFtmZWF0dXJlSWRdKTtcbiAgICAgICAgICAgICAgICB2YXIgZmVhdHVyZSA9IHNlbGYuZHJhdy5nZXQoZmVhdHVyZUlkKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVDb29yZGluYXRlc0Zyb21GZWF0dXJlKGZlYXR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVG9vbCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhdy50cmFzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5kcmF3LmNoYW5nZU1vZGUoXCJzaW1wbGVfc2VsZWN0XCIsIHNlbGVjdENvbmZpZyk7XG4gICAgICAgICAgICBfLmVhY2goc2VsZi5mZWF0dXJlTG9va3VwLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5zZWxlY3RlZFRvb2wobnVsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHNlbGYuaGlkZU5ld0Nvb3JkaW5hdGVzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ2VvbVR5cGUgPSBzZWxmLmNvb3JkaW5hdGVHZW9tVHlwZSgpO1xuICAgICAgICB2YXIgY29vcmRDb3VudCA9IHNlbGYuY29vcmRpbmF0ZXMoKS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBnZW9tVHlwZSA9PT0gXCJQb2ludFwiICYmIGNvb3JkQ291bnQgPiAwO1xuICAgIH0pO1xuXG4gICAgc2VsZi5taW5Db29yZGluYXRlcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdlb21UeXBlID0gc2VsZi5jb29yZGluYXRlR2VvbVR5cGUoKTtcbiAgICAgICAgdmFyIG1pbkNvb3JkaW5hdGVzO1xuICAgICAgICBzd2l0Y2ggKGdlb21UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICAgICAgICBtaW5Db29yZGluYXRlcyA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIG1pbkNvb3JkaW5hdGVzID0gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgICAgICAgICAgbWluQ29vcmRpbmF0ZXMgPSAzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluQ29vcmRpbmF0ZXM7XG4gICAgfSk7XG5cbiAgICBzZWxmLmFsbG93RGVsZXRlQ29vcmRpbmF0ZXMgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzZWxmLmNvb3JkaW5hdGVzKCkubGVuZ3RoID4gc2VsZi5taW5Db29yZGluYXRlcygpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5lZGl0Q29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuY29vcmRpbmF0ZUVkaXRpbmcodHJ1ZSk7XG4gICAgfTtcblxuICAgIHNlbGYuY2FuRWRpdENvb3JkaW5hdGVzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZmVhdHVyZUlkID0gc2VsZi5zZWxlY3RlZEZlYXR1cmVJZHMoKVswXTtcbiAgICAgICAgaWYgKGZlYXR1cmVJZCkge1xuICAgICAgICAgICAgdmFyIGZlYXR1cmUgPSBzZWxmLmRyYXcuZ2V0KGZlYXR1cmVJZCk7XG4gICAgICAgICAgICByZXR1cm4gW1wiUG9pbnRcIiwgXCJMaW5lU3RyaW5nXCIsIFwiUG9seWdvblwiXS5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICBmZWF0dXJlLmdlb21ldHJ5LnR5cGVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRUb29sID0gc2VsZi5zZWxlY3RlZFRvb2woKTtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgXCJkcmF3X3BvaW50XCIsXG4gICAgICAgICAgICAgICAgXCJkcmF3X2xpbmVfc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJkcmF3X3BvbHlnb25cIixcbiAgICAgICAgICAgIF0uaW5jbHVkZXMoc2VsZWN0ZWRUb29sKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2VsZi5zZWxlY3RlZEZlYXR1cmVJZHMuc3Vic2NyaWJlKGZ1bmN0aW9uIChpZHMpIHtcbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPT09IDApIHNlbGYuY29vcmRpbmF0ZUVkaXRpbmcoZmFsc2UpO1xuICAgICAgICBlbHNlIGlmIChzZWxmLmNhbkVkaXRDb29yZGluYXRlcygpKSB7XG4gICAgICAgICAgICB2YXIgZmVhdHVyZSA9IHNlbGYuZHJhdy5nZXQoaWRzWzBdKTtcbiAgICAgICAgICAgIHVwZGF0ZUNvb3JkaW5hdGVzRnJvbUZlYXR1cmUoZmVhdHVyZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlbGYuYnVmZmVyRmVhdHVyZSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuc2VsZWN0ZWRGZWF0dXJlSWRzKClbMF07XG4gICAgfSk7XG4gICAgdmFyIGdldEJ1ZmZlckZlYXR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmZWF0dXJlSWQgPSBzZWxmLmJ1ZmZlckZlYXR1cmUoKTtcbiAgICAgICAgaWYgKGZlYXR1cmVJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZHJhdy5nZXQoZmVhdHVyZUlkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgc2VsZi5idWZmZXJQYXJhbXMgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBidWZmZXJGZWF0dXJlID0gZ2V0QnVmZmVyRmVhdHVyZSgpO1xuICAgICAgICBpZiAoYnVmZmVyRmVhdHVyZSAmJiBzZWxmLmJ1ZmZlck5vZGVJZCgpKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZW9tZXRyeTogYnVmZmVyRmVhdHVyZS5nZW9tZXRyeSxcbiAgICAgICAgICAgICAgICBidWZmZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHBhcnNlRmxvYXQoc2VsZi5idWZmZXJEaXN0YW5jZSgpKSxcbiAgICAgICAgICAgICAgICAgICAgdW5pdDogc2VsZi5idWZmZXJVbml0cygpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgc2VsZi5idWZmZXJGZWF0dXJlLnN1YnNjcmliZShmdW5jdGlvbiAoYnVmZmVyRmVhdHVyZSkge1xuICAgICAgICBpZiAoIWJ1ZmZlckZlYXR1cmUpIHNlbGYuYnVmZmVyTm9kZUlkKGZhbHNlKTtcbiAgICB9KTtcbiAgICBzZWxmLnVwZGF0ZUJ1ZmZlckZlYXR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBidWZmZXJQYXJhbXMgPSBzZWxmLmJ1ZmZlclBhcmFtcygpO1xuICAgICAgICB2YXIgYnVmZmVyRmVhdHVyZSA9IGdldEJ1ZmZlckZlYXR1cmUoKTtcbiAgICAgICAgaWYgKGJ1ZmZlclBhcmFtcyAmJiBidWZmZXJGZWF0dXJlKSB7XG4gICAgICAgICAgICBidWZmZXJQYXJhbXMuZ2VvbWV0cnkgPSBidWZmZXJGZWF0dXJlLmdlb21ldHJ5O1xuICAgICAgICAgICAgd2luZG93XG4gICAgICAgICAgICAgICAgLmZldGNoKFxuICAgICAgICAgICAgICAgICAgICBhcmNoZXMudXJscy5idWZmZXIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCI/ZmlsdGVyPVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGJ1ZmZlclBhcmFtcylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlckZlYXR1cmUgPSBnZXRCdWZmZXJGZWF0dXJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYnVmZmVyUmVzdWx0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiRmVhdHVyZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHV1aWQuZ2VuZXJhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5OiBqc29uLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVJZDogYnVmZmVyRmVhdHVyZS5wcm9wZXJ0aWVzLm5vZGVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Ugc2VsZi5idWZmZXJSZXN1bHQodW5kZWZpbmVkKTtcbiAgICB9O1xuICAgIHNlbGYuYnVmZmVyUGFyYW1zLnN1YnNjcmliZShzZWxmLnVwZGF0ZUJ1ZmZlckZlYXR1cmUpO1xuXG4gICAgaWYgKHNlbGYuY2FyZCkge1xuICAgICAgICBzZWxmLmNhcmQubWFwID0gc2VsZi5tYXA7XG4gICAgfVxuXG4gICAgc2VsZi5hZGRCdWZmZXJSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBidWZmZXJSZXN1bHQgPSBzZWxmLmJ1ZmZlclJlc3VsdCgpO1xuICAgICAgICBpZiAoc2VsZi5idWZmZXJBZGROZXcoKSkge1xuICAgICAgICAgICAgdmFyIGRpcnR5ID0ga28udW53cmFwKHNlbGYudGlsZS5kaXJ0eSk7XG4gICAgICAgICAgICB2YXIgbm9kZUlkID0gc2VsZi5idWZmZXJOb2RlSWQoKTtcbiAgICAgICAgICAgIHZhciBhZGRCdWZmZXJSZXN1bHRBc05ldyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlTmV3VGlsZSA9IHNlbGYuY2FyZC5zZWxlY3RlZC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZXM6IFtidWZmZXJSZXN1bHRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FyZC5nZXROZXdUaWxlKCkuZGF0YVtub2RlSWRdKGZjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FyZC5tYXAuc3Vic2NyaWJlKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuZml0Qm91bmRzKGdlb2pzb25FeHRlbnQoZmMpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVOZXdUaWxlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgc2VsZi5jYXJkLnNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChkaXJ0eSkgc2VsZi5zYXZlVGlsZShhZGRCdWZmZXJSZXN1bHRBc05ldyk7XG4gICAgICAgICAgICBlbHNlIGFkZEJ1ZmZlclJlc3VsdEFzTmV3KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRyYXcuYWRkKGJ1ZmZlclJlc3VsdCk7XG4gICAgICAgICAgICBzZWxmLmJ1ZmZlck5vZGVJZChmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVRpbGVzKCk7XG4gICAgICAgICAgICBzZWxmLmVkaXRGZWF0dXJlKGJ1ZmZlclJlc3VsdCk7XG4gICAgICAgICAgICBzZWxmLmZpdEZlYXR1cmVzKFtidWZmZXJSZXN1bHRdKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuZXhwb3J0IGRlZmF1bHQgdmlld01vZGVsO1xuIl0sIm5hbWVzIjpbIiQiLCJfIiwia28iLCJrb01hcHBpbmciLCJhcmNoZXMiLCJ1dWlkIiwiZ2VvanNvbkV4dGVudCIsImdlb2pzb25oaW50Iiwia21sIiwic2hwanMiLCJwcm9qNCIsIk1hcGJveERyYXciLCJNYXBDb21wb25lbnRWaWV3TW9kZWwiLCJzZWxlY3RGZWF0dXJlTGF5ZXJzRmFjdG9yeSIsImdlb2pzb25GZWF0dXJlQ29sbGVjdGlvbiIsInZpZXdNb2RlbCIsInBhcmFtcyIsInNlbGYiLCJwYWRkaW5nIiwiZHJhd0ZlYXR1cmVzIiwicmVzb3VyY2VJZCIsInRpbGUiLCJyZXNvdXJjZWluc3RhbmNlX2lkIiwid2lkZ2V0cyIsInVuZGVmaW5lZCIsImdlb2pzb25XaWRnZXRzIiwiZmlsdGVyIiwid2lkZ2V0IiwiZGF0YXR5cGUiLCJuZXdOb2RlSWQiLCJmZWF0dXJlTG9va3VwIiwic2VsZWN0ZWRGZWF0dXJlSWRzIiwib2JzZXJ2YWJsZUFycmF5IiwiZ2VvSlNPTlN0cmluZyIsIm9ic2VydmFibGUiLCJkcmF3Iiwic2VsZWN0U291cmNlIiwic2VsZWN0U291cmNlTGF5ZXIiLCJkcmF3QXZhaWxhYmxlIiwiYnVmZmVyTm9kZUlkIiwiYnVmZmVyRGlzdGFuY2UiLCJidWZmZXJVbml0cyIsImJ1ZmZlclJlc3VsdCIsImJ1ZmZlckFkZE5ldyIsImFsbG93QWRkTmV3IiwiY2FyZCIsImNhbkFkZCIsIm5ld1RpbGUiLCJzZWxlY3RGZWF0dXJlTGF5ZXJzIiwic2V0U2VsZWN0TGF5ZXJzVmlzaWJpbGl0eSIsInZpc2liaWxpdHkiLCJtYXAiLCJmb3JFYWNoIiwibGF5ZXIiLCJzZXRMYXlvdXRQcm9wZXJ0eSIsImlkIiwic291cmNlcyIsInNvdXJjZU5hbWUiLCJtYXBTb3VyY2VzIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwicHVzaCIsInVwZGF0ZVNlbGVjdExheWVycyIsInNvdXJjZSIsInNvdXJjZUxheWVyIiwiaW5kZXhPZiIsImFkZGl0aW9uYWxMYXllcnMiLCJleHRlbmRlZExheWVycyIsImNvbmNhdCIsImdlb2pzb25MYXllcnMiLCJzdWJzY3JpYmUiLCJzZXREcmF3VG9vbCIsInRvb2wiLCJzaG93U2VsZWN0TGF5ZXJzIiwiY2hhbmdlTW9kZSIsImRyYXdfbW9kZSIsInVud3JhcCIsIm5vZGVfaWQiLCJmZWF0dXJlcyIsImNvbXB1dGVkIiwidmFsdWUiLCJ0b0pTIiwiZGF0YSIsInNlbGVjdGVkVG9vbCIsImRyb3BFcnJvcnMiLCJ0cmFzaCIsImVhY2giLCJrZXkiLCJwdXJlQ29tcHV0ZWQiLCJmaW5kIiwidXBkYXRlVGlsZXMiLCJmZWF0dXJlQ29sbGVjdGlvbiIsImdldEFsbCIsImZlYXR1cmUiLCJwcm9wZXJ0aWVzIiwibm9kZUlkIiwiaXNPYnNlcnZhYmxlIiwidHlwZSIsImdldERyYXdGZWF0dXJlcyIsImdlbmVyYXRlIiwibGVuZ3RoIiwidXNlUG9zaXRpb24iLCJib3VuZHMiLCJmaXRCb3VuZHNPcHRpb25zIiwidG9wIiwibGVmdCIsImJvdHRvbSIsInJpZ2h0IiwiYWN0aXZlVGFiIiwiYXNzaWduIiwibGF5ZXJzIiwicGFpbnQiLCJsYXlvdXQiLCJhcHBseSIsImRlbGV0ZUZlYXR1cmUiLCJkZWxldGUiLCJlZGl0RmVhdHVyZSIsImZlYXR1cmVJZHMiLCJ1cGRhdGVMYXllcnMiLCJzdHlsZSIsImdldFN0eWxlIiwib3B0aW9ucyIsInN0eWxlcyIsInNldFN0eWxlIiwiZml0RmVhdHVyZXMiLCJjYW1lcmEiLCJjYW1lcmFGb3JCb3VuZHMiLCJqdW1wVG8iLCJlZGl0R2VvSlNPTiIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZXR1cERyYXciLCJyZW1vdmVDb250cm9sIiwiZ2VvSlNPTkVycm9ycyIsImhpbnQiLCJlcnJvcnMiLCJpdGVtIiwibGV2ZWwiLCJleHRlbmQiLCJyYXRlTGltaXQiLCJnZW9KU09OTGF5ZXJEYXRhIiwicGFyc2UiLCJmYyIsImdldFNvdXJjZSIsInNldERhdGEiLCJ1cGRhdGVHZW9KU09OIiwiZ2VvSlNPTiIsInN1YnNjcmlwdGlvbiIsImdlb21ldHJ5IiwiZml0Qm91bmRzIiwiYWRkIiwiZGlzcG9zZSIsIm1vZGVzIiwic3RhdGljIiwib25TZXR1cCIsInNldEFjdGlvbmFibGVTdGF0ZSIsInRvRGlzcGxheUZlYXR1cmVzIiwic3RhdGUiLCJnZW9qc29uIiwiZGlzcGxheSIsImRpc3BsYXlDb250cm9sc0RlZmF1bHQiLCJhZGRDb250cm9sIiwic2V0Iiwib24iLCJlIiwic2V0RmVhdHVyZVByb3BlcnR5IiwiY29vcmRpbmF0ZUVkaXRpbmciLCJlZGl0aW5nRmVhdHVyZSIsImdldFNlbGVjdGVkIiwidXBkYXRlQ29vcmRpbmF0ZXNGcm9tRmVhdHVyZSIsInVwZGF0ZUJ1ZmZlckZlYXR1cmUiLCJtb2RlIiwiZm9ybSIsInByb3Zpc2lvbmFsVGlsZVZpZXdNb2RlbCIsInJlc2V0QXV0aG9yaXRhdGl2ZSIsInNlbGVjdGVkUHJvdmlzaW9uYWxFZGl0IiwidmFsIiwiZGlzcGxheUFsbCIsImsiLCJzZXRUaW1lb3V0IiwiYWRkaXRpb25hbERyYXdPcHRpb25zIiwiY29uZmlnIiwiZ2VvbWV0cnlUeXBlcyIsImRyYXdUb29scyIsInRleHQiLCJvcHRpb24iLCJ0cmFuc2xhdGlvbnMiLCJtYXBBZGRQb2ludCIsIm1hcEFkZExpbmUiLCJtYXBBZGRQb2x5Z29uIiwic2VsZWN0VGV4dCIsIm1hcFNlbGVjdERyYXdpbmciLCJpc0ZlYXR1cmVDbGlja2FibGUiLCJyZXNvdXJjZWluc3RhbmNlaWQiLCJpc1NlbGVjdGFibGUiLCJzZWxlY3RMYXllcklkcyIsImFkZFNlbGVjdEZlYXR1cmVzIiwicG9wdXAiLCJyZW1vdmUiLCJzZWxlY3RGZWF0dXJlIiwibmV3RmVhdHVyZSIsImdldEpTT04iLCJhZGRGcm9tR2VvSlNPTiIsImhhbmRsZUZpbGVzIiwiZmlsZXMiLCJwcm9taXNlcyIsImkiLCJleHRlbnNpb24iLCJuYW1lIiwic3BsaXQiLCJwb3AiLCJpbmNsdWRlcyIsIm1lc3NhZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsImZpbGUiLCJyZWFkZXIiLCJ3aW5kb3ciLCJGaWxlUmVhZGVyIiwib25sb2FkIiwidGFyZ2V0IiwicmVzdWx0IiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwicGFyc2VTaHAiLCJyZWR1Y2UiLCJwYXJzZVppcCIsInRoZW4iLCJwYXJzZWRaaXAiLCJyZWFkQXNBcnJheUJ1ZmZlciIsInJlYWRBc1RleHQiLCJhbGwiLCJyZXN1bHRzIiwiZHJvcFpvbmVIYW5kbGVyIiwibm9kZSIsIm5vZGVpZCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0Iiwib3JpZ2luYWxFdmVudCIsImRhdGFUcmFuc2ZlciIsImRyb3Bab25lTGVhdmVIYW5kbGVyIiwiZHJvcFpvbmVPdmVySGFuZGxlciIsImRyb3BFZmZlY3QiLCJkcm9wWm9uZUNsaWNrSGFuZGxlciIsImZpbGVJbnB1dCIsInBhcmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yIiwiZXZlbnQiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImRyb3Bab25lRW50ZXJIYW5kbGVyIiwiY2xhc3NMaXN0IiwiZHJvcFpvbmVGaWxlU2VsZWN0ZWQiLCJjb29yZGluYXRlUmVmZXJlbmNlcyIsInByZWZlcnJlZENvb3JkaW5hdGVTeXN0ZW1zIiwic2VsZWN0ZWRDb29yZGluYXRlUmVmZXJlbmNlIiwiY29vcmRpbmF0ZXMiLCJnZW9ncmFwaGljIiwicmF3Q29vcmRpbmF0ZXMiLCJjb29yZHMiLCJzb3VyY2VDUlMiLCJOdW1iZXIiLCJ0aHJvdHRsZSIsInNlbGVjdGVkRmVhdHVyZUlkIiwibWluQ29vcmRpbmF0ZXMiLCJnZW9tVHlwZSIsImNvb3JkaW5hdGVHZW9tVHlwZSIsInNob3dDb29yZGluYXRlRmVhdHVyZSIsImZlYXR1cmVJZCIsImdldCIsIm5ld1giLCJuZXdZIiwibmV3Q29vcmRpbmF0ZVBhaXIiLCJ4IiwieSIsImZvY3VzTGF0ZXN0WSIsImdldE5ld0Nvb3JkaW5hdGVQYWlyIiwibmV3Q29vcmRzIiwibmV3VmFsdWUiLCJzb3VyY2VDb29yZGluYXRlcyIsInRyYW5zZm9ybUNvb3JkaW5hdGVQYWlyIiwidGFyZ2V0Q1JTIiwidHJhbnNmb3JtZWRDb29yZGluYXRlcyIsInByZXZpb3VzQ1JTIiwidHJhbnNmb3JtQ29vcmRpbmF0ZXMiLCJlZGl0aW5nIiwic2VsZWN0Q29uZmlnIiwiaGlkZU5ld0Nvb3JkaW5hdGVzIiwiY29vcmRDb3VudCIsImFsbG93RGVsZXRlQ29vcmRpbmF0ZXMiLCJlZGl0Q29vcmRpbmF0ZXMiLCJjYW5FZGl0Q29vcmRpbmF0ZXMiLCJpZHMiLCJidWZmZXJGZWF0dXJlIiwiZ2V0QnVmZmVyRmVhdHVyZSIsImJ1ZmZlclBhcmFtcyIsImJ1ZmZlciIsIndpZHRoIiwicGFyc2VGbG9hdCIsInVuaXQiLCJmZXRjaCIsInVybHMiLCJyZXNwb25zZSIsIm9rIiwianNvbiIsImFkZEJ1ZmZlclJlc3VsdCIsImRpcnR5IiwiYWRkQnVmZmVyUmVzdWx0QXNOZXciLCJ1cGRhdGVOZXdUaWxlIiwic2VsZWN0ZWQiLCJnZXROZXdUaWxlIiwiZHVyYXRpb24iLCJzYXZlVGlsZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9