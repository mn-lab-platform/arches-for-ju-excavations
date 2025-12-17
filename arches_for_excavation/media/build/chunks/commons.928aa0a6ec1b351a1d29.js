"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[71404],{

/***/ 71404:
/*!*****************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/map.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var utils_map_popup_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! utils/map-popup-provider */ 70949);
/* harmony import */ var utils_map_configurator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! utils/map-configurator */ 50688);
/* harmony import */ var utils_aria__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! utils/aria */ 9285);
/* harmony import */ var templates_views_components_map_popup_htm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! templates/views/components/map-popup.htm */ 19617);
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! mapbox-gl */ 60842);
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var mapbox_gl_geocoder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! mapbox-gl-geocoder */ 25086);
/* harmony import */ var mapbox_gl_geocoder__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl_geocoder__WEBPACK_IMPORTED_MODULE_10__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }











var viewModel = function viewModel(params) {
  var self = this;
  var geojsonSourceFactory = function geojsonSourceFactory() {
    return {
      "type": "geojson",
      "generateId": true,
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    };
  };
  this.activeTab = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.activeTab));
  this.canEdit = params.userCanEditResources;
  this.canRead = params.userCanReadResources;
  var boundingOptions = {
    padding: {
      top: 40,
      left: 40 + (self.activeTab() ? 200 : 0),
      bottom: 40,
      right: 40 + (self.activeTab() ? 200 : 0)
    },
    animate: false
  };
  this.map = knockout__WEBPACK_IMPORTED_MODULE_3___default().isObservable(params.map) ? params.map : knockout__WEBPACK_IMPORTED_MODULE_3___default().observable();
  this.map.subscribe(function (map) {
    self.setupMap(map);
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.x) && knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.y)) {
      var center = map.getCenter();
      var lng = parseFloat(params.x());
      var lat = parseFloat(params.y());
      if (lng) {
        center.lng = lng;
      }
      if (lat) {
        center.lat = lat;
      }
      map.setCenter(center);
    }
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.zoom)) {
      map.setZoom(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.zoom));
    }
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.bounds)) {
      map.fitBounds(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.bounds), boundingOptions);
    }
  });
  this.bounds = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.bounds) || arches__WEBPACK_IMPORTED_MODULE_2__["default"].hexBinBounds);
  this.bounds.subscribe(function (bounds) {
    if (bounds && self.map()) {
      self.map().fitBounds(bounds, boundingOptions);
    }
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().isObservable(params.fitBounds) && params.fitBounds() !== bounds) {
      params.fitBounds(bounds);
    }
  });
  this.centerX = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.x) || arches__WEBPACK_IMPORTED_MODULE_2__["default"].mapDefaultX);
  this.centerX.subscribe(function (lng) {
    if (lng && self.map()) {
      var center = self.map().getCenter();
      center.lng = lng;
      self.map().setCenter(center);
    }
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().isObservable(params.x) && params.x() !== lng) {
      params.x(lng);
    }
  });
  this.centerY = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.y) || arches__WEBPACK_IMPORTED_MODULE_2__["default"].mapDefaultY);
  this.centerY.subscribe(function (lat) {
    if (lat && self.map()) {
      var center = self.map().getCenter();
      center.lat = lat;
      self.map().setCenter(center);
    }
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().isObservable(params.y) && params.y() !== lat) {
      params.y(lat);
    }
  });
  this.zoom = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.zoom) || arches__WEBPACK_IMPORTED_MODULE_2__["default"].mapDefaultZoom);
  this.zoom.subscribe(function (level) {
    if (level && self.map()) {
      self.map().setZoom(level);
    }
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().isObservable(params.zoom) && params.zoom() !== level) {
      params.zoom(level);
    }
  });
  this.overlayConfigs = knockout__WEBPACK_IMPORTED_MODULE_3___default().observableArray(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.overlayConfigs));
  this.overlayConfigs.subscribe(function (overlayConfigs) {
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().isObservable(params.overlayConfigs)) {
      params.overlayConfigs(overlayConfigs);
    }
  });
  this.activeBasemap = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(); // params.basemap is a string, activeBasemap is a map. Cannot initialize from params.
  this.activeBasemap.subscribe(function (basemap) {
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().isObservable(params.basemap) && params.basemap() !== basemap.name) {
      params.basemap(basemap.name);
    }
  });
  var sources = Object.assign({
    "resource": geojsonSourceFactory(),
    "search-results-hex": geojsonSourceFactory(),
    "search-results-hashes": geojsonSourceFactory(),
    "search-results-points": geojsonSourceFactory()
  }, arches__WEBPACK_IMPORTED_MODULE_2__["default"].mapSources, params.sources);
  this.basemaps = params.basemaps || [];
  this.overlays = params.overlaysObservable || knockout__WEBPACK_IMPORTED_MODULE_3___default().observableArray();
  var mapLayers = params.mapLayers || arches__WEBPACK_IMPORTED_MODULE_2__["default"].mapLayers;
  mapLayers.forEach(function (layer) {
    if (!layer.isoverlay) {
      if (!params.basemaps) self.basemaps.push(layer);
    } else if (!params.overlaysObservable) {
      if (layer.searchonly && !params.search) return;
      layer.opacity = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(layer.addtomap ? 100 : 0);
      layer.onMap = knockout__WEBPACK_IMPORTED_MODULE_3___default().pureComputed({
        read: function read() {
          return layer.opacity() > 0;
        },
        write: function write(value) {
          layer.opacity(value ? 100 : 0);
        }
      });
      layer.updateParent = function (parent) {
        if (self.overlayConfigs.indexOf(layer.maplayerid) === -1) {
          self.overlayConfigs.push(layer.maplayerid);
          layer.opacity(100);
        } else {
          self.overlayConfigs.remove(layer.maplayerid);
          layer.opacity(0);
        }
        if (parent !== self) {
          parent.overlayConfigs(self.overlayConfigs());
          if (params.inWidget) {
            try {
              parent.overlays.valueHasMutated();
            } catch (e) {
              console.log(e);
            }
          }
        }
      };
      self.overlays.push(layer);
    }
  });
  if (!self.activeBasemap()) {
    var basemap = knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(self.basemaps).find(function (basemap) {
      return knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(params.basemap) === basemap.name;
    });
    if (!basemap && params.config) {
      basemap = knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(self.basemaps).find(function (basemap) {
        return params.config().basemap === basemap.name;
      });
    }
    if (!basemap) {
      basemap = knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(self.basemaps).find(function (basemap) {
        return basemap.addtomap;
      });
    }
    self.activeBasemap(basemap);
  }
  var _iterator = _createForOfIteratorHelper(self.overlays()),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var overlay = _step.value;
      if (knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(self.overlayConfigs) && self.overlayConfigs.indexOf(overlay.maplayerid) > -1 || params.search && overlay.addtomap) {
        overlay.opacity(100);
      } else {
        overlay.opacity(0);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  underscore__WEBPACK_IMPORTED_MODULE_1___default().each(sources, function (sourceConfig) {
    if (sourceConfig.tiles) {
      sourceConfig.tiles.forEach(function (url, i) {
        if (url.startsWith('/')) {
          sourceConfig.tiles[i] = window.location.origin + url;
        }
      });
    }
    if (sourceConfig.data && typeof sourceConfig.data === 'string' && sourceConfig.data.startsWith('/')) {
      sourceConfig.data = arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.root + sourceConfig.data.substr(1);
    }
  });
  var _multiplyStopValues = function multiplyStopValues(stops, multiplier) {
    underscore__WEBPACK_IMPORTED_MODULE_1___default().each(stops, function (stop) {
      if (Array.isArray(stop[1])) {
        _multiplyStopValues(stop[1], multiplier);
      } else {
        stop[1] = stop[1] * multiplier;
      }
    });
  };
  var updateOpacity = function updateOpacity(layer, val) {
    var opacityVal = Number(val) / 100.0;
    layer = JSON.parse(JSON.stringify(layer));
    if (layer.paint === undefined) {
      layer.paint = {};
    }
    underscore__WEBPACK_IMPORTED_MODULE_1___default().each(['background', 'fill', 'line', 'text', 'icon', 'raster', 'circle', 'fill-extrusion', 'heatmap'], function (opacityType) {
      var startVal = layer.paint ? layer.paint[opacityType + '-opacity'] : null;
      if (startVal) {
        if (parseFloat(startVal) && parseFloat(layer.paint[opacityType + '-opacity'])) {
          // verify startVal and opacity can be numbers
          layer.paint[opacityType + '-opacity'] = startVal * opacityVal;
        } else if (parseFloat(startVal)) {
          layer.paint[opacityType + '-opacity'].base = startVal * opacityVal;
        } else {
          layer.paint[opacityType + '-opacity'] = JSON.parse(JSON.stringify(startVal));
          if (startVal.base) {
            layer.paint[opacityType + '-opacity'].base = startVal.base * opacityVal;
          }
          if (startVal.stops) {
            _multiplyStopValues(layer.paint[opacityType + '-opacity'].stops, opacityVal);
          }
        }
      } else if (layer.type === opacityType || layer.type === 'symbol' && (opacityType === 'text' || opacityType === 'icon')) {
        layer.paint[opacityType + '-opacity'] = opacityVal;
      }
    }, self);
    return layer;
  };
  this.additionalLayers = params.layers;
  this.layers = knockout__WEBPACK_IMPORTED_MODULE_3___default().pureComputed(function () {
    var layers = [];
    self.overlays().forEach(function (layer) {
      if (layer.onMap()) {
        var opacity = layer.opacity();
        layers = layer.layer_definitions.map(function (layer) {
          return updateOpacity(layer, opacity);
        }).concat(layers);
      }
    });
    if (knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(self.activeBasemap)) {
      layers = knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(self.activeBasemap).layer_definitions.slice(0).concat(layers);
    }
    if (this.additionalLayers) {
      layers = layers.concat(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(this.additionalLayers));
    }
    return layers;
  }, this);
  this.mapOptions = {
    style: {
      version: 8,
      sources: sources,
      sprite: arches__WEBPACK_IMPORTED_MODULE_2__["default"].mapboxSprites,
      glyphs: arches__WEBPACK_IMPORTED_MODULE_2__["default"].mapboxGlyphs,
      layers: self.layers(),
      center: [parseFloat(self.centerX()), parseFloat(self.centerY())],
      zoom: parseFloat(self.zoom())
    },
    maxZoom: arches__WEBPACK_IMPORTED_MODULE_2__["default"].mapDefaultMaxZoom,
    minZoom: arches__WEBPACK_IMPORTED_MODULE_2__["default"].mapDefaultMinZoom
  };
  if (!params.usePosition) {
    this.mapOptions.bounds = self.bounds;
    this.mapOptions.fitBoundsOptions = params.fitBoundsOptions;
  }
  this.hideSidePanel = function (focusElement) {
    self.activeTab(undefined);
    if (focusElement) {
      utils_aria__WEBPACK_IMPORTED_MODULE_7__["default"].shiftFocus(focusElement);
    }
  };
  this.toggleTab = function (tabName) {
    if (self.activeTab() === tabName) {
      self.activeTab(null);
    } else {
      self.activeTab(tabName);
      utils_aria__WEBPACK_IMPORTED_MODULE_7__["default"].shiftFocus('#side-panel');
    }
  };
  this.updateLayers = function (layers) {
    var style = self.map().getStyle();
    if (style) {
      style.layers = self.draw ? layers.concat(self.draw.options.styles) : layers;
      self.map().setStyle(style);
    }
  };
  this.expandSidePanel = function () {
    return false;
  };
  this.resourceLookup = {};
  this.getPopupData = function (features) {
    var popupFeatures = features.map(function (feature) {
      var data = feature.properties;
      var id = data.resourceinstanceid;
      var userid = knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(self.userid);
      data.showFilterByFeatureButton = !!params.search;
      data.sendFeatureToMapFilter = utils_map_popup_provider__WEBPACK_IMPORTED_MODULE_5__["default"].sendFeatureToMapFilter.bind(utils_map_popup_provider__WEBPACK_IMPORTED_MODULE_5__["default"]);
      data.showFilterByFeature = utils_map_popup_provider__WEBPACK_IMPORTED_MODULE_5__["default"].showFilterByFeature.bind(utils_map_popup_provider__WEBPACK_IMPORTED_MODULE_5__["default"]);
      var descriptionProperties = ['displayname', 'graph_name', 'map_popup', 'geometries'];
      var setEditButtonVisibility = function setEditButtonVisibility(data) {
        var _ko$unwrap, _ko$unwrap2, _ko$unwrap3;
        var isFeatureEditable = self.canEdit && ((_ko$unwrap = knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(data.permissions)) === null || _ko$unwrap === void 0 || (_ko$unwrap = _ko$unwrap.users_without_edit_perm) === null || _ko$unwrap === void 0 ? void 0 : _ko$unwrap.includes(userid)) === false || ((_ko$unwrap2 = knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(data.permissions)) === null || _ko$unwrap2 === void 0 || (_ko$unwrap2 = _ko$unwrap2.principal_user) === null || _ko$unwrap2 === void 0 ? void 0 : _ko$unwrap2.includes(userid)) || ((_ko$unwrap3 = knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(data.permissions)) === null || _ko$unwrap3 === void 0 || (_ko$unwrap3 = _ko$unwrap3.users_edit) === null || _ko$unwrap3 === void 0 ? void 0 : _ko$unwrap3.includes(userid));
        data.showEditButton(isFeatureEditable);
      };
      if (id) {
        if (!self.resourceLookup[id]) {
          data = underscore__WEBPACK_IMPORTED_MODULE_1___default().defaults(data, {
            'loading': true,
            'displayname': '',
            'graph_name': '',
            'map_popup': '',
            'geometries': [],
            'feature': feature,
            'showEditButton': knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false)
          });
          if (data.permissions) {
            try {
              data.permissions = JSON.parse(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(data.permissions));
            } catch (err) {
              data.permissions = knockout_mapping__WEBPACK_IMPORTED_MODULE_4___default().toJS(knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(data.permissions));
            }
            setEditButtonVisibility(data);
          }
          descriptionProperties.forEach(function (prop) {
            return data[prop] = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(data[prop]);
          });
          data.reportURL = arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.resource_report;
          data.editURL = arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.resource_editor;
          self.resourceLookup[id] = data;
          jquery__WEBPACK_IMPORTED_MODULE_0___default().get(arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.resource_descriptors + id, function (data) {
            data.loading = false;
            descriptionProperties.forEach(function (prop) {
              return self.resourceLookup[id][prop](data[prop]);
            });
            self.resourceLookup[id].permissions = data["permissions"];
            setEditButtonVisibility(self.resourceLookup[id]);
          });
        }
        self.resourceLookup[id].feature = feature;
        self.resourceLookup[id].mapCard = self;
        return self.resourceLookup[id];
      } else {
        data.resourceinstanceid = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
        data.loading = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
        data.feature = feature;
        data.mapCard = self;
        return data;
      }
    });
    var unique = [];
    var uniquePopupFeatures = popupFeatures.filter(function (feature) {
      feature.active = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
      if (!unique.includes(feature)) {
        unique.push(feature);
        return true;
      }
    });
    uniquePopupFeatures[0].active(true);
    return {
      popupFeatures: uniquePopupFeatures,
      loading: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false),
      activeFeature: uniquePopupFeatures[0],
      advanceFeature: function advanceFeature(direction) {
        var map = self.map();
        var activeFeatureIndex = uniquePopupFeatures.findIndex(function (feature) {
          return feature.active();
        });
        var activeFeature;
        uniquePopupFeatures[activeFeatureIndex].active(false);
        if (direction === 'right') {
          if (activeFeatureIndex + 1 >= uniquePopupFeatures.length) {
            activeFeature = uniquePopupFeatures[0];
          } else {
            activeFeature = uniquePopupFeatures[activeFeatureIndex + 1];
          }
        } else {
          if (activeFeatureIndex == 0) {
            activeFeature = uniquePopupFeatures[uniquePopupFeatures.length - 1];
          } else {
            activeFeature = uniquePopupFeatures[activeFeatureIndex - 1];
          }
        }
        activeFeature.active(true);
        if (map.getStyle()) {
          uniquePopupFeatures.forEach(function (feature) {
            var featureId = feature.feature.id;
            if (featureId) {
              if (featureId === activeFeature.feature.id) {
                map.setFeatureState(activeFeature.feature, {
                  hover: true
                });
              } else {
                map.setFeatureState(feature.feature, {
                  hover: false
                });
              }
            }
          });
        }
      }
    };
  };
  this.onFeatureClick = function (features, lngLat, MapboxGl) {
    var popupTemplate = this.popupTemplate ? this.popupTemplate : utils_map_popup_provider__WEBPACK_IMPORTED_MODULE_5__["default"].getPopupTemplate(features);
    var map = self.map();
    var mapStyle = map.getStyle();
    self.popup = new MapboxGl.Popup().setLngLat(lngLat).setHTML(popupTemplate).addTo(map);
    knockout__WEBPACK_IMPORTED_MODULE_3___default().applyBindingsToDescendants(_objectSpread(_objectSpread({}, utils_map_popup_provider__WEBPACK_IMPORTED_MODULE_5__["default"].processData(self.getPopupData(features))), {}, {
      translations: arches__WEBPACK_IMPORTED_MODULE_2__["default"].translations
    }), self.popup._content);
    features.forEach(function (feature) {
      if (mapStyle && feature.id) map.setFeatureState(feature, {
        selected: true
      });
      self.popup.on('close', function () {
        if (mapStyle && feature.id) {
          try {
            map.setFeatureState(feature, {
              selected: false
            });
            map.setFeatureState(feature, {
              hover: false
            });
          } catch (e) {
            // catch TypeError which occurs when map is destroyed while popup open.
          }
        }
        self.popup = undefined;
      });
    });
  };
  this.beforeMove = function (e) {
    e.cancelDrop = e.sourceParent !== e.targetParent;
  };
  this.reorderOverlays = function (e) {
    var mapOrder = knockout__WEBPACK_IMPORTED_MODULE_3___default().observableArray(e.sourceParent());
    var newOrder = self.createNewOverlayOrder(mapOrder);
    self.sendNewOverlayOrder(newOrder);
  };
  this.keyDownHandler = function (context, e) {
    // reorder list in the front-end by only using keyboard inputs
    var li = this;
    var moveOverlays = function moveOverlays(direction) {
      if (self.overlays().includes(li)) {
        var index = self.overlays().indexOf(li);
        var newIndex = index;
        if (direction == "up") {
          newIndex--;
        } else if (direction == "down") {
          newIndex++;
        }
        if (newIndex != -1 && newIndex != self.overlays().length) {
          var newArr = self.overlays();
          newArr.splice(newIndex, 0, newArr.splice(index, 1)[0]);
          self.overlays(newArr);
        }
      }
    };
    if (e.ctrlKey) {
      switch (e.which) {
        case 38:
          moveOverlays("up");
          break;
        case 40:
          moveOverlays("down");
          break;
      }
    }
  };
  this.setupMap = function (map) {
    map.on('load', function () {
      utils_map_configurator__WEBPACK_IMPORTED_MODULE_6__["default"].preConfig(map);
      map.addControl(new (mapbox_gl__WEBPACK_IMPORTED_MODULE_9___default().NavigationControl)(), 'top-left');
      map.addControl(new (mapbox_gl__WEBPACK_IMPORTED_MODULE_9___default().FullscreenControl)({
        container: jquery__WEBPACK_IMPORTED_MODULE_0___default()(map.getContainer()).closest('.workbench-card-wrapper')[0]
      }), 'top-left');
      map.addControl(new (mapbox_gl_geocoder__WEBPACK_IMPORTED_MODULE_10___default())({
        accessToken: (mapbox_gl__WEBPACK_IMPORTED_MODULE_9___default().accessToken),
        mapboxgl: (mapbox_gl__WEBPACK_IMPORTED_MODULE_9___default()),
        placeholder: arches__WEBPACK_IMPORTED_MODULE_2__["default"].translations.geocoderPlaceHolder,
        bbox: arches__WEBPACK_IMPORTED_MODULE_2__["default"].hexBinBounds
      }), 'top-right');
      self.layers.subscribe(self.updateLayers);
      var hoverFeature;
      map.on('mousemove', function (e) {
        var style = map.getStyle();
        if (hoverFeature && hoverFeature.id && style) map.setFeatureState(hoverFeature, {
          hover: false
        });
        hoverFeature = underscore__WEBPACK_IMPORTED_MODULE_1___default().find(map.queryRenderedFeatures(e.point), function (feature) {
          return utils_map_popup_provider__WEBPACK_IMPORTED_MODULE_5__["default"].isFeatureClickable(feature, self);
        });
        if (hoverFeature && hoverFeature.id && style) map.setFeatureState(hoverFeature, {
          hover: true
        });
        map.getCanvas().style.cursor = hoverFeature ? 'pointer' : '';
        if (self.map().draw_mode) {
          var crosshairModes = ["draw_point", "draw_line_string", "draw_polygon"];
          map.getCanvas().style.cursor = crosshairModes.includes(self.map().draw_mode) ? "crosshair" : "";
        }
      });
      map.draw_mode = null;
      map.on('click', function (e) {
        var popupFeatures = underscore__WEBPACK_IMPORTED_MODULE_1___default().filter(map.queryRenderedFeatures(e.point), function (feature) {
          return utils_map_popup_provider__WEBPACK_IMPORTED_MODULE_5__["default"].isFeatureClickable(feature, self);
        });
        if (popupFeatures.length) {
          self.onFeatureClick(popupFeatures, e.lngLat, (mapbox_gl__WEBPACK_IMPORTED_MODULE_9___default()));
        }
      });
      map.on('zoomend', function () {
        self.zoom(parseFloat(map.getZoom()));
      });
      map.on('dragend', function () {
        var center = map.getCenter();
        self.centerX(parseFloat(center.lng));
        self.centerY(parseFloat(center.lat));
      });
      utils_map_configurator__WEBPACK_IMPORTED_MODULE_6__["default"].postConfig(map);
      self.map(map);
    });
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztBQUNELGlFQUFlbEIsU0FBUyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld21vZGVscy9tYXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgbWFwUG9wdXBQcm92aWRlciBmcm9tICd1dGlscy9tYXAtcG9wdXAtcHJvdmlkZXInO1xuaW1wb3J0IG1hcENvbmZpZ3VyYXRvciBmcm9tICd1dGlscy9tYXAtY29uZmlndXJhdG9yJztcbmltcG9ydCBhcmlhVXRpbHMgZnJvbSAndXRpbHMvYXJpYSc7XG5pbXBvcnQgJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL21hcC1wb3B1cC5odG0nO1xuaW1wb3J0IE1hcGJveEdsIGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgTWFwYm94R2VvY29kZXIgZnJvbSAnbWFwYm94LWdsLWdlb2NvZGVyJztcblxuXG5jb25zdCB2aWV3TW9kZWwgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cbiAgICB2YXIgZ2VvanNvblNvdXJjZUZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJnZW9qc29uXCIsXG4gICAgICAgICAgICBcImdlbmVyYXRlSWRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVzXCI6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRoaXMuYWN0aXZlVGFiID0ga28ub2JzZXJ2YWJsZShrby51bndyYXAocGFyYW1zLmFjdGl2ZVRhYikpO1xuICAgIHRoaXMuY2FuRWRpdCA9IHBhcmFtcy51c2VyQ2FuRWRpdFJlc291cmNlcztcbiAgICB0aGlzLmNhblJlYWQgPSBwYXJhbXMudXNlckNhblJlYWRSZXNvdXJjZXM7XG5cbiAgICB2YXIgYm91bmRpbmdPcHRpb25zID0ge1xuICAgICAgICBwYWRkaW5nOiB7XG4gICAgICAgICAgICB0b3A6IDQwLFxuICAgICAgICAgICAgbGVmdDogNDAgKyAoc2VsZi5hY3RpdmVUYWIoKSA/IDIwMCA6IDApLFxuICAgICAgICAgICAgYm90dG9tOiA0MCxcbiAgICAgICAgICAgIHJpZ2h0OiA0MCArIChzZWxmLmFjdGl2ZVRhYigpID8gMjAwIDogMClcbiAgICAgICAgfSxcbiAgICAgICAgYW5pbWF0ZTogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5tYXAgPSBrby5pc09ic2VydmFibGUocGFyYW1zLm1hcCkgPyBwYXJhbXMubWFwIDoga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMubWFwLnN1YnNjcmliZShmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgIHNlbGYuc2V0dXBNYXAobWFwKTtcblxuICAgICAgICBpZiAoa28udW53cmFwKHBhcmFtcy54KSAmJiBrby51bndyYXAocGFyYW1zLnkpKSB7XG4gICAgICAgICAgICB2YXIgY2VudGVyID0gbWFwLmdldENlbnRlcigpO1xuXG4gICAgICAgICAgICBjb25zdCBsbmcgPSBwYXJzZUZsb2F0KHBhcmFtcy54KCkpO1xuICAgICAgICAgICAgY29uc3QgbGF0ID0gcGFyc2VGbG9hdChwYXJhbXMueSgpKTtcblxuICAgICAgICAgICAgaWYgKGxuZykgeyBjZW50ZXIubG5nID0gbG5nOyB9XG4gICAgICAgICAgICBpZiAobGF0KSB7IGNlbnRlci5sYXQgPSBsYXQ7IH1cblxuICAgICAgICAgICAgbWFwLnNldENlbnRlcihjZW50ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtvLnVud3JhcChwYXJhbXMuem9vbSkpIHtcbiAgICAgICAgICAgIG1hcC5zZXRab29tKGtvLnVud3JhcChwYXJhbXMuem9vbSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtvLnVud3JhcChwYXJhbXMuYm91bmRzKSkge1xuICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhrby51bndyYXAocGFyYW1zLmJvdW5kcyksIGJvdW5kaW5nT3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdGhpcy5ib3VuZHMgPSBrby5vYnNlcnZhYmxlKGtvLnVud3JhcChwYXJhbXMuYm91bmRzKSB8fCBhcmNoZXMuaGV4QmluQm91bmRzKTtcbiAgICB0aGlzLmJvdW5kcy5zdWJzY3JpYmUoZnVuY3Rpb24gKGJvdW5kcykge1xuICAgICAgICBpZiAoYm91bmRzICYmIHNlbGYubWFwKCkpIHtcbiAgICAgICAgICAgIHNlbGYubWFwKCkuZml0Qm91bmRzKGJvdW5kcywgYm91bmRpbmdPcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrby5pc09ic2VydmFibGUocGFyYW1zLmZpdEJvdW5kcykgJiYgcGFyYW1zLmZpdEJvdW5kcygpICE9PSBib3VuZHMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5jZW50ZXJYID0ga28ub2JzZXJ2YWJsZShrby51bndyYXAocGFyYW1zLngpIHx8IGFyY2hlcy5tYXBEZWZhdWx0WCk7XG4gICAgdGhpcy5jZW50ZXJYLnN1YnNjcmliZShmdW5jdGlvbiAobG5nKSB7XG4gICAgICAgIGlmIChsbmcgJiYgc2VsZi5tYXAoKSkge1xuICAgICAgICAgICAgdmFyIGNlbnRlciA9IHNlbGYubWFwKCkuZ2V0Q2VudGVyKCk7XG4gICAgICAgICAgICBjZW50ZXIubG5nID0gbG5nO1xuXG4gICAgICAgICAgICBzZWxmLm1hcCgpLnNldENlbnRlcihjZW50ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrby5pc09ic2VydmFibGUocGFyYW1zLngpICYmIHBhcmFtcy54KCkgIT09IGxuZykge1xuICAgICAgICAgICAgcGFyYW1zLngobG5nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5jZW50ZXJZID0ga28ub2JzZXJ2YWJsZShrby51bndyYXAocGFyYW1zLnkpIHx8IGFyY2hlcy5tYXBEZWZhdWx0WSk7XG4gICAgdGhpcy5jZW50ZXJZLnN1YnNjcmliZShmdW5jdGlvbiAobGF0KSB7XG4gICAgICAgIGlmIChsYXQgJiYgc2VsZi5tYXAoKSkge1xuICAgICAgICAgICAgdmFyIGNlbnRlciA9IHNlbGYubWFwKCkuZ2V0Q2VudGVyKCk7XG4gICAgICAgICAgICBjZW50ZXIubGF0ID0gbGF0O1xuXG4gICAgICAgICAgICBzZWxmLm1hcCgpLnNldENlbnRlcihjZW50ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrby5pc09ic2VydmFibGUocGFyYW1zLnkpICYmIHBhcmFtcy55KCkgIT09IGxhdCkge1xuICAgICAgICAgICAgcGFyYW1zLnkobGF0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy56b29tID0ga28ub2JzZXJ2YWJsZShrby51bndyYXAocGFyYW1zLnpvb20pIHx8IGFyY2hlcy5tYXBEZWZhdWx0Wm9vbSk7XG4gICAgdGhpcy56b29tLnN1YnNjcmliZShmdW5jdGlvbiAobGV2ZWwpIHtcbiAgICAgICAgaWYgKGxldmVsICYmIHNlbGYubWFwKCkpIHsgc2VsZi5tYXAoKS5zZXRab29tKGxldmVsKTsgfVxuXG4gICAgICAgIGlmIChrby5pc09ic2VydmFibGUocGFyYW1zLnpvb20pICYmIHBhcmFtcy56b29tKCkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICBwYXJhbXMuem9vbShsZXZlbCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMub3ZlcmxheUNvbmZpZ3MgPSBrby5vYnNlcnZhYmxlQXJyYXkoa28udW53cmFwKHBhcmFtcy5vdmVybGF5Q29uZmlncykpO1xuICAgIHRoaXMub3ZlcmxheUNvbmZpZ3Muc3Vic2NyaWJlKGZ1bmN0aW9uIChvdmVybGF5Q29uZmlncykge1xuICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKHBhcmFtcy5vdmVybGF5Q29uZmlncykpIHtcbiAgICAgICAgICAgIHBhcmFtcy5vdmVybGF5Q29uZmlncyhvdmVybGF5Q29uZmlncyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWN0aXZlQmFzZW1hcCA9IGtvLm9ic2VydmFibGUoKTsgIC8vIHBhcmFtcy5iYXNlbWFwIGlzIGEgc3RyaW5nLCBhY3RpdmVCYXNlbWFwIGlzIGEgbWFwLiBDYW5ub3QgaW5pdGlhbGl6ZSBmcm9tIHBhcmFtcy5cbiAgICB0aGlzLmFjdGl2ZUJhc2VtYXAuc3Vic2NyaWJlKGZ1bmN0aW9uIChiYXNlbWFwKSB7XG4gICAgICAgIGlmIChrby5pc09ic2VydmFibGUocGFyYW1zLmJhc2VtYXApICYmIHBhcmFtcy5iYXNlbWFwKCkgIT09IGJhc2VtYXAubmFtZSkge1xuICAgICAgICAgICAgcGFyYW1zLmJhc2VtYXAoYmFzZW1hcC5uYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHNvdXJjZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgXCJyZXNvdXJjZVwiOiBnZW9qc29uU291cmNlRmFjdG9yeSgpLFxuICAgICAgICBcInNlYXJjaC1yZXN1bHRzLWhleFwiOiBnZW9qc29uU291cmNlRmFjdG9yeSgpLFxuICAgICAgICBcInNlYXJjaC1yZXN1bHRzLWhhc2hlc1wiOiBnZW9qc29uU291cmNlRmFjdG9yeSgpLFxuICAgICAgICBcInNlYXJjaC1yZXN1bHRzLXBvaW50c1wiOiBnZW9qc29uU291cmNlRmFjdG9yeSgpXG4gICAgfSwgYXJjaGVzLm1hcFNvdXJjZXMsIHBhcmFtcy5zb3VyY2VzKTtcblxuICAgIHRoaXMuYmFzZW1hcHMgPSBwYXJhbXMuYmFzZW1hcHMgfHwgW107XG4gICAgdGhpcy5vdmVybGF5cyA9IHBhcmFtcy5vdmVybGF5c09ic2VydmFibGUgfHwga28ub2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICB2YXIgbWFwTGF5ZXJzID0gcGFyYW1zLm1hcExheWVycyB8fCBhcmNoZXMubWFwTGF5ZXJzO1xuICAgIG1hcExheWVycy5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICBpZiAoIWxheWVyLmlzb3ZlcmxheSkge1xuICAgICAgICAgICAgaWYgKCFwYXJhbXMuYmFzZW1hcHMpIHNlbGYuYmFzZW1hcHMucHVzaChsYXllcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXBhcmFtcy5vdmVybGF5c09ic2VydmFibGUpIHtcbiAgICAgICAgICAgIGlmIChsYXllci5zZWFyY2hvbmx5ICYmICFwYXJhbXMuc2VhcmNoKSByZXR1cm47XG4gICAgICAgICAgICBsYXllci5vcGFjaXR5ID0ga28ub2JzZXJ2YWJsZShsYXllci5hZGR0b21hcCA/IDEwMCA6IDApO1xuICAgICAgICAgICAgbGF5ZXIub25NYXAgPSBrby5wdXJlQ29tcHV0ZWQoe1xuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxheWVyLm9wYWNpdHkoKSA+IDA7IH0sXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBsYXllci5vcGFjaXR5KHZhbHVlID8gMTAwIDogMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxheWVyLnVwZGF0ZVBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vdmVybGF5Q29uZmlncy5pbmRleE9mKGxheWVyLm1hcGxheWVyaWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm92ZXJsYXlDb25maWdzLnB1c2gobGF5ZXIubWFwbGF5ZXJpZCk7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLm9wYWNpdHkoMTAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm92ZXJsYXlDb25maWdzLnJlbW92ZShsYXllci5tYXBsYXllcmlkKTtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIub3BhY2l0eSgwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGFyZW50ICE9PSBzZWxmKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5vdmVybGF5Q29uZmlncyhzZWxmLm92ZXJsYXlDb25maWdzKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaW5XaWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Lm92ZXJsYXlzLnZhbHVlSGFzTXV0YXRlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2VsZi5vdmVybGF5cy5wdXNoKGxheWVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZWxmLmFjdGl2ZUJhc2VtYXAoKSkge1xuICAgICAgICB2YXIgYmFzZW1hcCA9IGtvLnVud3JhcChzZWxmLmJhc2VtYXBzKS5maW5kKGZ1bmN0aW9uIChiYXNlbWFwKSB7XG4gICAgICAgICAgICByZXR1cm4ga28udW53cmFwKHBhcmFtcy5iYXNlbWFwKSA9PT0gYmFzZW1hcC5uYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWJhc2VtYXAgJiYgcGFyYW1zLmNvbmZpZykge1xuICAgICAgICAgICAgYmFzZW1hcCA9IGtvLnVud3JhcChzZWxmLmJhc2VtYXBzKS5maW5kKGZ1bmN0aW9uIChiYXNlbWFwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5jb25maWcoKS5iYXNlbWFwID09PSBiYXNlbWFwLm5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYmFzZW1hcCkge1xuICAgICAgICAgICAgYmFzZW1hcCA9IGtvLnVud3JhcChzZWxmLmJhc2VtYXBzKS5maW5kKGZ1bmN0aW9uIChiYXNlbWFwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhc2VtYXAuYWRkdG9tYXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuYWN0aXZlQmFzZW1hcChiYXNlbWFwKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBvdmVybGF5IG9mIHNlbGYub3ZlcmxheXMoKSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBrby51bndyYXAoc2VsZi5vdmVybGF5Q29uZmlncykgJiYgc2VsZi5vdmVybGF5Q29uZmlncy5pbmRleE9mKG92ZXJsYXkubWFwbGF5ZXJpZCkgPiAtMVxuICAgICAgICAgICAgfHwgcGFyYW1zLnNlYXJjaCAmJiBvdmVybGF5LmFkZHRvbWFwXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3ZlcmxheS5vcGFjaXR5KDEwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdmVybGF5Lm9wYWNpdHkoMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfLmVhY2goc291cmNlcywgZnVuY3Rpb24gKHNvdXJjZUNvbmZpZykge1xuICAgICAgICBpZiAoc291cmNlQ29uZmlnLnRpbGVzKSB7XG4gICAgICAgICAgICBzb3VyY2VDb25maWcudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodXJsLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVybC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlQ29uZmlnLnRpbGVzW2ldID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIHVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc291cmNlQ29uZmlnLmRhdGEgJiYgdHlwZW9mIHNvdXJjZUNvbmZpZy5kYXRhID09PSAnc3RyaW5nJyAmJiBzb3VyY2VDb25maWcuZGF0YS5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHNvdXJjZUNvbmZpZy5kYXRhID0gYXJjaGVzLnVybHMucm9vdCArIHNvdXJjZUNvbmZpZy5kYXRhLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIG11bHRpcGx5U3RvcFZhbHVlcyA9IGZ1bmN0aW9uIChzdG9wcywgbXVsdGlwbGllcikge1xuICAgICAgICBfLmVhY2goc3RvcHMsIGZ1bmN0aW9uIChzdG9wKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdG9wWzFdKSkge1xuICAgICAgICAgICAgICAgIG11bHRpcGx5U3RvcFZhbHVlcyhzdG9wWzFdLCBtdWx0aXBsaWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcFsxXSA9IHN0b3BbMV0gKiBtdWx0aXBsaWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHVwZGF0ZU9wYWNpdHkgPSBmdW5jdGlvbiAobGF5ZXIsIHZhbCkge1xuICAgICAgICB2YXIgb3BhY2l0eVZhbCA9IE51bWJlcih2YWwpIC8gMTAwLjA7XG4gICAgICAgIGxheWVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsYXllcikpO1xuICAgICAgICBpZiAobGF5ZXIucGFpbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGF5ZXIucGFpbnQgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBfLmVhY2goW1xuICAgICAgICAgICAgJ2JhY2tncm91bmQnLFxuICAgICAgICAgICAgJ2ZpbGwnLFxuICAgICAgICAgICAgJ2xpbmUnLFxuICAgICAgICAgICAgJ3RleHQnLFxuICAgICAgICAgICAgJ2ljb24nLFxuICAgICAgICAgICAgJ3Jhc3RlcicsXG4gICAgICAgICAgICAnY2lyY2xlJyxcbiAgICAgICAgICAgICdmaWxsLWV4dHJ1c2lvbicsXG4gICAgICAgICAgICAnaGVhdG1hcCdcbiAgICAgICAgXSwgZnVuY3Rpb24gKG9wYWNpdHlUeXBlKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRWYWwgPSBsYXllci5wYWludCA/IGxheWVyLnBhaW50W29wYWNpdHlUeXBlICsgJy1vcGFjaXR5J10gOiBudWxsO1xuXG4gICAgICAgICAgICBpZiAoc3RhcnRWYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VGbG9hdChzdGFydFZhbCkgJiYgcGFyc2VGbG9hdChsYXllci5wYWludFtvcGFjaXR5VHlwZSArICctb3BhY2l0eSddKSkgeyAvLyB2ZXJpZnkgc3RhcnRWYWwgYW5kIG9wYWNpdHkgY2FuIGJlIG51bWJlcnNcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIucGFpbnRbb3BhY2l0eVR5cGUgKyAnLW9wYWNpdHknXSA9IHN0YXJ0VmFsICogb3BhY2l0eVZhbDtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhcnNlRmxvYXQoc3RhcnRWYWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnBhaW50W29wYWNpdHlUeXBlICsgJy1vcGFjaXR5J10uYmFzZSA9IHN0YXJ0VmFsICogb3BhY2l0eVZhbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsYXllci5wYWludFtvcGFjaXR5VHlwZSArICctb3BhY2l0eSddID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdGFydFZhbCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRWYWwuYmFzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIucGFpbnRbb3BhY2l0eVR5cGUgKyAnLW9wYWNpdHknXS5iYXNlID0gc3RhcnRWYWwuYmFzZSAqIG9wYWNpdHlWYWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0VmFsLnN0b3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBseVN0b3BWYWx1ZXMobGF5ZXIucGFpbnRbb3BhY2l0eVR5cGUgKyAnLW9wYWNpdHknXS5zdG9wcywgb3BhY2l0eVZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxheWVyLnR5cGUgPT09IG9wYWNpdHlUeXBlIHx8XG4gICAgICAgICAgICAgICAgKGxheWVyLnR5cGUgPT09ICdzeW1ib2wnICYmIChvcGFjaXR5VHlwZSA9PT0gJ3RleHQnIHx8IG9wYWNpdHlUeXBlID09PSAnaWNvbicpKSkge1xuICAgICAgICAgICAgICAgIGxheWVyLnBhaW50W29wYWNpdHlUeXBlICsgJy1vcGFjaXR5J10gPSBvcGFjaXR5VmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzZWxmKTtcbiAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgIH07XG5cbiAgICB0aGlzLmFkZGl0aW9uYWxMYXllcnMgPSBwYXJhbXMubGF5ZXJzO1xuICAgIHRoaXMubGF5ZXJzID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IFtdO1xuICAgICAgICBzZWxmLm92ZXJsYXlzKCkuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIGlmIChsYXllci5vbk1hcCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wYWNpdHkgPSBsYXllci5vcGFjaXR5KCk7XG4gICAgICAgICAgICAgICAgbGF5ZXJzID0gbGF5ZXIubGF5ZXJfZGVmaW5pdGlvbnMubWFwKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlT3BhY2l0eShsYXllciwgb3BhY2l0eSk7XG4gICAgICAgICAgICAgICAgfSkuY29uY2F0KGxheWVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoa28udW53cmFwKHNlbGYuYWN0aXZlQmFzZW1hcCkpIHtcbiAgICAgICAgICAgIGxheWVycyA9IGtvLnVud3JhcChzZWxmLmFjdGl2ZUJhc2VtYXApLmxheWVyX2RlZmluaXRpb25zLnNsaWNlKDApLmNvbmNhdChsYXllcnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFkZGl0aW9uYWxMYXllcnMpIHtcbiAgICAgICAgICAgIGxheWVycyA9IGxheWVycy5jb25jYXQoa28udW53cmFwKHRoaXMuYWRkaXRpb25hbExheWVycykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYXllcnM7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLm1hcE9wdGlvbnMgPSB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICB2ZXJzaW9uOiA4LFxuICAgICAgICAgICAgc291cmNlczogc291cmNlcyxcbiAgICAgICAgICAgIHNwcml0ZTogYXJjaGVzLm1hcGJveFNwcml0ZXMsXG4gICAgICAgICAgICBnbHlwaHM6IGFyY2hlcy5tYXBib3hHbHlwaHMsXG4gICAgICAgICAgICBsYXllcnM6IHNlbGYubGF5ZXJzKCksXG4gICAgICAgICAgICBjZW50ZXI6IFtcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHNlbGYuY2VudGVyWCgpKSxcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHNlbGYuY2VudGVyWSgpKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB6b29tOiBwYXJzZUZsb2F0KHNlbGYuem9vbSgpKSxcbiAgICAgICAgfSxcbiAgICAgICAgbWF4Wm9vbTogYXJjaGVzLm1hcERlZmF1bHRNYXhab29tLFxuICAgICAgICBtaW5ab29tOiBhcmNoZXMubWFwRGVmYXVsdE1pblpvb20sXG4gICAgfTtcbiAgICBpZiAoIXBhcmFtcy51c2VQb3NpdGlvbikge1xuICAgICAgICB0aGlzLm1hcE9wdGlvbnMuYm91bmRzID0gc2VsZi5ib3VuZHM7XG4gICAgICAgIHRoaXMubWFwT3B0aW9ucy5maXRCb3VuZHNPcHRpb25zID0gcGFyYW1zLmZpdEJvdW5kc09wdGlvbnM7XG4gICAgfVxuXG4gICAgdGhpcy5oaWRlU2lkZVBhbmVsID0gZnVuY3Rpb24gKGZvY3VzRWxlbWVudCkge1xuICAgICAgICBzZWxmLmFjdGl2ZVRhYih1bmRlZmluZWQpO1xuICAgICAgICBpZiAoZm9jdXNFbGVtZW50KSB7XG4gICAgICAgICAgICBhcmlhVXRpbHMuc2hpZnRGb2N1cyhmb2N1c0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudG9nZ2xlVGFiID0gZnVuY3Rpb24gKHRhYk5hbWUpIHtcbiAgICAgICAgaWYgKHNlbGYuYWN0aXZlVGFiKCkgPT09IHRhYk5hbWUpIHtcbiAgICAgICAgICAgIHNlbGYuYWN0aXZlVGFiKG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5hY3RpdmVUYWIodGFiTmFtZSk7XG4gICAgICAgICAgICBhcmlhVXRpbHMuc2hpZnRGb2N1cygnI3NpZGUtcGFuZWwnKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZUxheWVycyA9IGZ1bmN0aW9uIChsYXllcnMpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gc2VsZi5tYXAoKS5nZXRTdHlsZSgpO1xuXG4gICAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICAgICAgc3R5bGUubGF5ZXJzID0gc2VsZi5kcmF3ID8gbGF5ZXJzLmNvbmNhdChzZWxmLmRyYXcub3B0aW9ucy5zdHlsZXMpIDogbGF5ZXJzO1xuICAgICAgICAgICAgc2VsZi5tYXAoKS5zZXRTdHlsZShzdHlsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5leHBhbmRTaWRlUGFuZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXNvdXJjZUxvb2t1cCA9IHt9O1xuICAgIHRoaXMuZ2V0UG9wdXBEYXRhID0gZnVuY3Rpb24gKGZlYXR1cmVzKSB7XG4gICAgICAgIGNvbnN0IHBvcHVwRmVhdHVyZXMgPSBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGZlYXR1cmUucHJvcGVydGllcztcbiAgICAgICAgICAgIHZhciBpZCA9IGRhdGEucmVzb3VyY2VpbnN0YW5jZWlkO1xuICAgICAgICAgICAgY29uc3QgdXNlcmlkID0ga28udW53cmFwKHNlbGYudXNlcmlkKTtcbiAgICAgICAgICAgIGRhdGEuc2hvd0ZpbHRlckJ5RmVhdHVyZUJ1dHRvbiA9ICEhcGFyYW1zLnNlYXJjaDtcbiAgICAgICAgICAgIGRhdGEuc2VuZEZlYXR1cmVUb01hcEZpbHRlciA9IG1hcFBvcHVwUHJvdmlkZXIuc2VuZEZlYXR1cmVUb01hcEZpbHRlci5iaW5kKG1hcFBvcHVwUHJvdmlkZXIpO1xuICAgICAgICAgICAgZGF0YS5zaG93RmlsdGVyQnlGZWF0dXJlID0gbWFwUG9wdXBQcm92aWRlci5zaG93RmlsdGVyQnlGZWF0dXJlLmJpbmQobWFwUG9wdXBQcm92aWRlcik7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvblByb3BlcnRpZXMgPSBbJ2Rpc3BsYXluYW1lJywgJ2dyYXBoX25hbWUnLCAnbWFwX3BvcHVwJywgJ2dlb21ldHJpZXMnXTtcbiAgICAgICAgICAgIGNvbnN0IHNldEVkaXRCdXR0b25WaXNpYmlsaXR5ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0ZlYXR1cmVFZGl0YWJsZSA9IHNlbGYuY2FuRWRpdCAmJlxuICAgICAgICAgICAgICAgICAgICBrby51bndyYXAoZGF0YS5wZXJtaXNzaW9ucyk/LnVzZXJzX3dpdGhvdXRfZWRpdF9wZXJtPy5pbmNsdWRlcyh1c2VyaWQpID09PSBmYWxzZSB8fFxuICAgICAgICAgICAgICAgICAgICBrby51bndyYXAoZGF0YS5wZXJtaXNzaW9ucyk/LnByaW5jaXBhbF91c2VyPy5pbmNsdWRlcyh1c2VyaWQpIHx8XG4gICAgICAgICAgICAgICAgICAgIGtvLnVud3JhcChkYXRhLnBlcm1pc3Npb25zKT8udXNlcnNfZWRpdD8uaW5jbHVkZXModXNlcmlkKTtcbiAgICAgICAgICAgICAgICBkYXRhLnNob3dFZGl0QnV0dG9uKGlzRmVhdHVyZUVkaXRhYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgIGlmICghc2VsZi5yZXNvdXJjZUxvb2t1cFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF8uZGVmYXVsdHMoZGF0YSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2xvYWRpbmcnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXluYW1lJzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZ3JhcGhfbmFtZSc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21hcF9wb3B1cCc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2dlb21ldHJpZXMnOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdmZWF0dXJlJzogZmVhdHVyZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzaG93RWRpdEJ1dHRvbic6IGtvLm9ic2VydmFibGUoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnBlcm1pc3Npb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucGVybWlzc2lvbnMgPSBKU09OLnBhcnNlKGtvLnVud3JhcChkYXRhLnBlcm1pc3Npb25zKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnBlcm1pc3Npb25zID0ga29NYXBwaW5nLnRvSlMoa28udW53cmFwKGRhdGEucGVybWlzc2lvbnMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEVkaXRCdXR0b25WaXNpYmlsaXR5KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uUHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4gZGF0YVtwcm9wXSA9IGtvLm9ic2VydmFibGUoZGF0YVtwcm9wXSkpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnJlcG9ydFVSTCA9IGFyY2hlcy51cmxzLnJlc291cmNlX3JlcG9ydDtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5lZGl0VVJMID0gYXJjaGVzLnVybHMucmVzb3VyY2VfZWRpdG9yO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc291cmNlTG9va3VwW2lkXSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICQuZ2V0KGFyY2hlcy51cmxzLnJlc291cmNlX2Rlc2NyaXB0b3JzICsgaWQsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uUHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4gc2VsZi5yZXNvdXJjZUxvb2t1cFtpZF1bcHJvcF0oZGF0YVtwcm9wXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXNvdXJjZUxvb2t1cFtpZF0ucGVybWlzc2lvbnMgPSBkYXRhW1wicGVybWlzc2lvbnNcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRFZGl0QnV0dG9uVmlzaWJpbGl0eShzZWxmLnJlc291cmNlTG9va3VwW2lkXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnJlc291cmNlTG9va3VwW2lkXS5mZWF0dXJlID0gZmVhdHVyZTtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc291cmNlTG9va3VwW2lkXS5tYXBDYXJkID0gc2VsZjtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5yZXNvdXJjZUxvb2t1cFtpZF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEucmVzb3VyY2VpbnN0YW5jZWlkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgZGF0YS5sb2FkaW5nID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgZGF0YS5mZWF0dXJlID0gZmVhdHVyZTtcbiAgICAgICAgICAgICAgICBkYXRhLm1hcENhcmQgPSBzZWxmO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCB1bmlxdWUgPSBbXTtcbiAgICAgICAgY29uc3QgdW5pcXVlUG9wdXBGZWF0dXJlcyA9IHBvcHVwRmVhdHVyZXMuZmlsdGVyKGZlYXR1cmUgPT4ge1xuICAgICAgICAgICAgZmVhdHVyZS5hY3RpdmUgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIGlmICghdW5pcXVlLmluY2x1ZGVzKGZlYXR1cmUpKSB7XG4gICAgICAgICAgICAgICAgdW5pcXVlLnB1c2goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB1bmlxdWVQb3B1cEZlYXR1cmVzWzBdLmFjdGl2ZSh0cnVlKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9wdXBGZWF0dXJlczogdW5pcXVlUG9wdXBGZWF0dXJlcyxcbiAgICAgICAgICAgIGxvYWRpbmc6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuICAgICAgICAgICAgYWN0aXZlRmVhdHVyZTogdW5pcXVlUG9wdXBGZWF0dXJlc1swXSxcbiAgICAgICAgICAgIGFkdmFuY2VGZWF0dXJlOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwID0gc2VsZi5tYXAoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVGZWF0dXJlSW5kZXggPSB1bmlxdWVQb3B1cEZlYXR1cmVzLmZpbmRJbmRleChmZWF0dXJlID0+IGZlYXR1cmUuYWN0aXZlKCkpO1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVGZWF0dXJlO1xuICAgICAgICAgICAgICAgIHVuaXF1ZVBvcHVwRmVhdHVyZXNbYWN0aXZlRmVhdHVyZUluZGV4XS5hY3RpdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUZlYXR1cmVJbmRleCArIDEgPj0gdW5pcXVlUG9wdXBGZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUZlYXR1cmUgPSB1bmlxdWVQb3B1cEZlYXR1cmVzWzBdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlRmVhdHVyZSA9IHVuaXF1ZVBvcHVwRmVhdHVyZXNbYWN0aXZlRmVhdHVyZUluZGV4ICsgMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlRmVhdHVyZUluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUZlYXR1cmUgPSB1bmlxdWVQb3B1cEZlYXR1cmVzW3VuaXF1ZVBvcHVwRmVhdHVyZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVGZWF0dXJlID0gdW5pcXVlUG9wdXBGZWF0dXJlc1thY3RpdmVGZWF0dXJlSW5kZXggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhY3RpdmVGZWF0dXJlLmFjdGl2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBpZiAobWFwLmdldFN0eWxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlUG9wdXBGZWF0dXJlcy5mb3JFYWNoKGZlYXR1cmUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZUlkID0gZmVhdHVyZS5mZWF0dXJlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZlYXR1cmVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlSWQgPT09IGFjdGl2ZUZlYXR1cmUuZmVhdHVyZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0RmVhdHVyZVN0YXRlKGFjdGl2ZUZlYXR1cmUuZmVhdHVyZSwgeyBob3ZlcjogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0RmVhdHVyZVN0YXRlKGZlYXR1cmUuZmVhdHVyZSwgeyBob3ZlcjogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRoaXMub25GZWF0dXJlQ2xpY2sgPSBmdW5jdGlvbiAoZmVhdHVyZXMsIGxuZ0xhdCwgTWFwYm94R2wpIHtcbiAgICAgICAgY29uc3QgcG9wdXBUZW1wbGF0ZSA9IHRoaXMucG9wdXBUZW1wbGF0ZSA/IHRoaXMucG9wdXBUZW1wbGF0ZSA6IG1hcFBvcHVwUHJvdmlkZXIuZ2V0UG9wdXBUZW1wbGF0ZShmZWF0dXJlcyk7XG4gICAgICAgIGNvbnN0IG1hcCA9IHNlbGYubWFwKCk7XG4gICAgICAgIGNvbnN0IG1hcFN0eWxlID0gbWFwLmdldFN0eWxlKCk7XG4gICAgICAgIHNlbGYucG9wdXAgPSBuZXcgTWFwYm94R2wuUG9wdXAoKVxuICAgICAgICAgICAgLnNldExuZ0xhdChsbmdMYXQpXG4gICAgICAgICAgICAuc2V0SFRNTChwb3B1cFRlbXBsYXRlKVxuICAgICAgICAgICAgLmFkZFRvKG1hcCk7XG4gICAgICAgIGtvLmFwcGx5QmluZGluZ3NUb0Rlc2NlbmRhbnRzKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC4uLm1hcFBvcHVwUHJvdmlkZXIucHJvY2Vzc0RhdGEoc2VsZi5nZXRQb3B1cERhdGEoZmVhdHVyZXMpKSxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbnM6IGFyY2hlcy50cmFuc2xhdGlvbnMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZi5wb3B1cC5fY29udGVudFxuICAgICAgICApO1xuICAgICAgICBmZWF0dXJlcy5mb3JFYWNoKGZlYXR1cmUgPT4ge1xuICAgICAgICAgICAgaWYgKG1hcFN0eWxlICYmIGZlYXR1cmUuaWQpIG1hcC5zZXRGZWF0dXJlU3RhdGUoZmVhdHVyZSwgeyBzZWxlY3RlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHNlbGYucG9wdXAub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChtYXBTdHlsZSAmJiBmZWF0dXJlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0RmVhdHVyZVN0YXRlKGZlYXR1cmUsIHsgc2VsZWN0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldEZlYXR1cmVTdGF0ZShmZWF0dXJlLCB7IGhvdmVyOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2F0Y2ggVHlwZUVycm9yIHdoaWNoIG9jY3VycyB3aGVuIG1hcCBpcyBkZXN0cm95ZWQgd2hpbGUgcG9wdXAgb3Blbi5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnBvcHVwID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmJlZm9yZU1vdmUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuY2FuY2VsRHJvcCA9IChlLnNvdXJjZVBhcmVudCE9PWUudGFyZ2V0UGFyZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW9yZGVyT3ZlcmxheXMgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnN0IG1hcE9yZGVyID0ga28ub2JzZXJ2YWJsZUFycmF5KGUuc291cmNlUGFyZW50KCkpO1xuICAgICAgICBjb25zdCBuZXdPcmRlciA9IHNlbGYuY3JlYXRlTmV3T3ZlcmxheU9yZGVyKG1hcE9yZGVyKTtcbiAgICAgICAgc2VsZi5zZW5kTmV3T3ZlcmxheU9yZGVyKG5ld09yZGVyKVxuICAgIH07XG5cbiAgICB0aGlzLmtleURvd25IYW5kbGVyID0gZnVuY3Rpb24gKGNvbnRleHQsIGUpIHtcbiAgICAgICAgLy8gcmVvcmRlciBsaXN0IGluIHRoZSBmcm9udC1lbmQgYnkgb25seSB1c2luZyBrZXlib2FyZCBpbnB1dHNcbiAgICAgICAgY29uc3QgbGkgPSB0aGlzXG4gICAgICAgIGNvbnN0IG1vdmVPdmVybGF5cyA9IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChzZWxmLm92ZXJsYXlzKCkuaW5jbHVkZXMobGkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzZWxmLm92ZXJsYXlzKCkuaW5kZXhPZihsaSk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0luZGV4ID0gaW5kZXhcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IFwidXBcIikge1xuICAgICAgICAgICAgICAgICAgICBuZXdJbmRleC0tXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gXCJkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW5kZXgrK1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV3SW5kZXggIT0gLTEgJiYgbmV3SW5kZXggIT0gc2VsZi5vdmVybGF5cygpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdBcnIgPSBzZWxmLm92ZXJsYXlzKClcbiAgICAgICAgICAgICAgICAgICAgbmV3QXJyLnNwbGljZShuZXdJbmRleCwgMCwgbmV3QXJyLnNwbGljZShpbmRleCwgMSlbMF0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm92ZXJsYXlzKG5ld0Fycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuY3RybEtleSkge1xuICAgICAgICAgICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICAgICAgbW92ZU92ZXJsYXlzKFwidXBcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgICAgIG1vdmVPdmVybGF5cyhcImRvd25cIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuc2V0dXBNYXAgPSBmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgIG1hcC5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1hcENvbmZpZ3VyYXRvci5wcmVDb25maWcobWFwKTtcbiAgICAgICAgICAgIG1hcC5hZGRDb250cm9sKG5ldyBNYXBib3hHbC5OYXZpZ2F0aW9uQ29udHJvbCgpLCAndG9wLWxlZnQnKTtcbiAgICAgICAgICAgIG1hcC5hZGRDb250cm9sKG5ldyBNYXBib3hHbC5GdWxsc2NyZWVuQ29udHJvbCh7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiAkKG1hcC5nZXRDb250YWluZXIoKSkuY2xvc2VzdCgnLndvcmtiZW5jaC1jYXJkLXdyYXBwZXInKVswXVxuICAgICAgICAgICAgfSksICd0b3AtbGVmdCcpO1xuICAgICAgICAgICAgbWFwLmFkZENvbnRyb2wobmV3IE1hcGJveEdlb2NvZGVyKHtcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogTWFwYm94R2wuYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgbWFwYm94Z2w6IE1hcGJveEdsLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBhcmNoZXMudHJhbnNsYXRpb25zLmdlb2NvZGVyUGxhY2VIb2xkZXIsXG4gICAgICAgICAgICAgICAgYmJveDogYXJjaGVzLmhleEJpbkJvdW5kc1xuICAgICAgICAgICAgfSksICd0b3AtcmlnaHQnKTtcblxuICAgICAgICAgICAgc2VsZi5sYXllcnMuc3Vic2NyaWJlKHNlbGYudXBkYXRlTGF5ZXJzKTtcblxuICAgICAgICAgICAgdmFyIGhvdmVyRmVhdHVyZTtcblxuICAgICAgICAgICAgbWFwLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IG1hcC5nZXRTdHlsZSgpO1xuICAgICAgICAgICAgICAgIGlmIChob3ZlckZlYXR1cmUgJiYgaG92ZXJGZWF0dXJlLmlkICYmIHN0eWxlKSBtYXAuc2V0RmVhdHVyZVN0YXRlKGhvdmVyRmVhdHVyZSwgeyBob3ZlcjogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgaG92ZXJGZWF0dXJlID0gXy5maW5kKFxuICAgICAgICAgICAgICAgICAgICBtYXAucXVlcnlSZW5kZXJlZEZlYXR1cmVzKGUucG9pbnQpLFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlID0+IG1hcFBvcHVwUHJvdmlkZXIuaXNGZWF0dXJlQ2xpY2thYmxlKGZlYXR1cmUsIHNlbGYpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoaG92ZXJGZWF0dXJlICYmIGhvdmVyRmVhdHVyZS5pZCAmJiBzdHlsZSkgbWFwLnNldEZlYXR1cmVTdGF0ZShob3ZlckZlYXR1cmUsIHsgaG92ZXI6IHRydWUgfSk7XG5cbiAgICAgICAgICAgICAgICBtYXAuZ2V0Q2FudmFzKCkuc3R5bGUuY3Vyc29yID0gaG92ZXJGZWF0dXJlID8gJ3BvaW50ZXInIDogJyc7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubWFwKCkuZHJhd19tb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjcm9zc2hhaXJNb2RlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHJhd19wb2ludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkcmF3X2xpbmVfc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRyYXdfcG9seWdvblwiLFxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICBtYXAuZ2V0Q2FudmFzKCkuc3R5bGUuY3Vyc29yID0gY3Jvc3NoYWlyTW9kZXMuaW5jbHVkZXMoc2VsZi5tYXAoKS5kcmF3X21vZGUpID8gXCJjcm9zc2hhaXJcIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hcC5kcmF3X21vZGUgPSBudWxsO1xuXG5cbiAgICAgICAgICAgIG1hcC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcHVwRmVhdHVyZXMgPSBfLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgbWFwLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhlLnBvaW50KSxcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZSA9PiBtYXBQb3B1cFByb3ZpZGVyLmlzRmVhdHVyZUNsaWNrYWJsZShmZWF0dXJlLCBzZWxmKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKHBvcHVwRmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25GZWF0dXJlQ2xpY2socG9wdXBGZWF0dXJlcywgZS5sbmdMYXQsIE1hcGJveEdsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBtYXAub24oJ3pvb21lbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tKFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KG1hcC5nZXRab29tKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXAub24oJ2RyYWdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbnRlciA9IG1hcC5nZXRDZW50ZXIoKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuY2VudGVyWChwYXJzZUZsb2F0KGNlbnRlci5sbmcpKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNlbnRlclkocGFyc2VGbG9hdChjZW50ZXIubGF0KSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWFwQ29uZmlndXJhdG9yLnBvc3RDb25maWcobWFwKTtcbiAgICAgICAgICAgIHNlbGYubWFwKG1hcCk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCB2aWV3TW9kZWw7XG4iXSwibmFtZXMiOlsiJCIsIl8iLCJhcmNoZXMiLCJrbyIsImtvTWFwcGluZyIsIm1hcFBvcHVwUHJvdmlkZXIiLCJtYXBDb25maWd1cmF0b3IiLCJhcmlhVXRpbHMiLCJNYXBib3hHbCIsIk1hcGJveEdlb2NvZGVyIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsImdlb2pzb25Tb3VyY2VGYWN0b3J5IiwiYWN0aXZlVGFiIiwib2JzZXJ2YWJsZSIsInVud3JhcCIsImNhbkVkaXQiLCJ1c2VyQ2FuRWRpdFJlc291cmNlcyIsImNhblJlYWQiLCJ1c2VyQ2FuUmVhZFJlc291cmNlcyIsImJvdW5kaW5nT3B0aW9ucyIsInBhZGRpbmciLCJ0b3AiLCJsZWZ0IiwiYm90dG9tIiwicmlnaHQiLCJhbmltYXRlIiwibWFwIiwiaXNPYnNlcnZhYmxlIiwic3Vic2NyaWJlIiwic2V0dXBNYXAiLCJ4IiwieSIsImNlbnRlciIsImdldENlbnRlciIsImxuZyIsInBhcnNlRmxvYXQiLCJsYXQiLCJzZXRDZW50ZXIiLCJ6b29tIiwic2V0Wm9vbSIsImJvdW5kcyIsImZpdEJvdW5kcyIsImhleEJpbkJvdW5kcyIsImNlbnRlclgiLCJtYXBEZWZhdWx0WCIsImNlbnRlclkiLCJtYXBEZWZhdWx0WSIsIm1hcERlZmF1bHRab29tIiwibGV2ZWwiLCJvdmVybGF5Q29uZmlncyIsIm9ic2VydmFibGVBcnJheSIsImFjdGl2ZUJhc2VtYXAiLCJiYXNlbWFwIiwibmFtZSIsInNvdXJjZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJtYXBTb3VyY2VzIiwiYmFzZW1hcHMiLCJvdmVybGF5cyIsIm92ZXJsYXlzT2JzZXJ2YWJsZSIsIm1hcExheWVycyIsImZvckVhY2giLCJsYXllciIsImlzb3ZlcmxheSIsInB1c2giLCJzZWFyY2hvbmx5Iiwic2VhcmNoIiwib3BhY2l0eSIsImFkZHRvbWFwIiwib25NYXAiLCJwdXJlQ29tcHV0ZWQiLCJyZWFkIiwid3JpdGUiLCJ2YWx1ZSIsInVwZGF0ZVBhcmVudCIsInBhcmVudCIsImluZGV4T2YiLCJtYXBsYXllcmlkIiwicmVtb3ZlIiwiaW5XaWRnZXQiLCJ2YWx1ZUhhc011dGF0ZWQiLCJlIiwiY29uc29sZSIsImxvZyIsImZpbmQiLCJjb25maWciLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwib3ZlcmxheSIsImVyciIsImYiLCJlYWNoIiwic291cmNlQ29uZmlnIiwidGlsZXMiLCJ1cmwiLCJpIiwic3RhcnRzV2l0aCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGF0YSIsInVybHMiLCJyb290Iiwic3Vic3RyIiwibXVsdGlwbHlTdG9wVmFsdWVzIiwic3RvcHMiLCJtdWx0aXBsaWVyIiwic3RvcCIsIkFycmF5IiwiaXNBcnJheSIsInVwZGF0ZU9wYWNpdHkiLCJ2YWwiLCJvcGFjaXR5VmFsIiwiTnVtYmVyIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicGFpbnQiLCJ1bmRlZmluZWQiLCJvcGFjaXR5VHlwZSIsInN0YXJ0VmFsIiwiYmFzZSIsInR5cGUiLCJhZGRpdGlvbmFsTGF5ZXJzIiwibGF5ZXJzIiwibGF5ZXJfZGVmaW5pdGlvbnMiLCJjb25jYXQiLCJzbGljZSIsIm1hcE9wdGlvbnMiLCJzdHlsZSIsInZlcnNpb24iLCJzcHJpdGUiLCJtYXBib3hTcHJpdGVzIiwiZ2x5cGhzIiwibWFwYm94R2x5cGhzIiwibWF4Wm9vbSIsIm1hcERlZmF1bHRNYXhab29tIiwibWluWm9vbSIsIm1hcERlZmF1bHRNaW5ab29tIiwidXNlUG9zaXRpb24iLCJmaXRCb3VuZHNPcHRpb25zIiwiaGlkZVNpZGVQYW5lbCIsImZvY3VzRWxlbWVudCIsInNoaWZ0Rm9jdXMiLCJ0b2dnbGVUYWIiLCJ0YWJOYW1lIiwidXBkYXRlTGF5ZXJzIiwiZ2V0U3R5bGUiLCJkcmF3Iiwib3B0aW9ucyIsInN0eWxlcyIsInNldFN0eWxlIiwiZXhwYW5kU2lkZVBhbmVsIiwicmVzb3VyY2VMb29rdXAiLCJnZXRQb3B1cERhdGEiLCJmZWF0dXJlcyIsInBvcHVwRmVhdHVyZXMiLCJmZWF0dXJlIiwicHJvcGVydGllcyIsImlkIiwicmVzb3VyY2VpbnN0YW5jZWlkIiwidXNlcmlkIiwic2hvd0ZpbHRlckJ5RmVhdHVyZUJ1dHRvbiIsInNlbmRGZWF0dXJlVG9NYXBGaWx0ZXIiLCJiaW5kIiwic2hvd0ZpbHRlckJ5RmVhdHVyZSIsImRlc2NyaXB0aW9uUHJvcGVydGllcyIsInNldEVkaXRCdXR0b25WaXNpYmlsaXR5IiwiX2tvJHVud3JhcCIsIl9rbyR1bndyYXAyIiwiX2tvJHVud3JhcDMiLCJpc0ZlYXR1cmVFZGl0YWJsZSIsInBlcm1pc3Npb25zIiwidXNlcnNfd2l0aG91dF9lZGl0X3Blcm0iLCJpbmNsdWRlcyIsInByaW5jaXBhbF91c2VyIiwidXNlcnNfZWRpdCIsInNob3dFZGl0QnV0dG9uIiwiZGVmYXVsdHMiLCJ0b0pTIiwicHJvcCIsInJlcG9ydFVSTCIsInJlc291cmNlX3JlcG9ydCIsImVkaXRVUkwiLCJyZXNvdXJjZV9lZGl0b3IiLCJnZXQiLCJyZXNvdXJjZV9kZXNjcmlwdG9ycyIsImxvYWRpbmciLCJtYXBDYXJkIiwidW5pcXVlIiwidW5pcXVlUG9wdXBGZWF0dXJlcyIsImZpbHRlciIsImFjdGl2ZSIsImFjdGl2ZUZlYXR1cmUiLCJhZHZhbmNlRmVhdHVyZSIsImRpcmVjdGlvbiIsImFjdGl2ZUZlYXR1cmVJbmRleCIsImZpbmRJbmRleCIsImxlbmd0aCIsImZlYXR1cmVJZCIsInNldEZlYXR1cmVTdGF0ZSIsImhvdmVyIiwib25GZWF0dXJlQ2xpY2siLCJsbmdMYXQiLCJwb3B1cFRlbXBsYXRlIiwiZ2V0UG9wdXBUZW1wbGF0ZSIsIm1hcFN0eWxlIiwicG9wdXAiLCJQb3B1cCIsInNldExuZ0xhdCIsInNldEhUTUwiLCJhZGRUbyIsImFwcGx5QmluZGluZ3NUb0Rlc2NlbmRhbnRzIiwiX29iamVjdFNwcmVhZCIsInByb2Nlc3NEYXRhIiwidHJhbnNsYXRpb25zIiwiX2NvbnRlbnQiLCJzZWxlY3RlZCIsIm9uIiwiYmVmb3JlTW92ZSIsImNhbmNlbERyb3AiLCJzb3VyY2VQYXJlbnQiLCJ0YXJnZXRQYXJlbnQiLCJyZW9yZGVyT3ZlcmxheXMiLCJtYXBPcmRlciIsIm5ld09yZGVyIiwiY3JlYXRlTmV3T3ZlcmxheU9yZGVyIiwic2VuZE5ld092ZXJsYXlPcmRlciIsImtleURvd25IYW5kbGVyIiwiY29udGV4dCIsImxpIiwibW92ZU92ZXJsYXlzIiwiaW5kZXgiLCJuZXdJbmRleCIsIm5ld0FyciIsInNwbGljZSIsImN0cmxLZXkiLCJ3aGljaCIsInByZUNvbmZpZyIsImFkZENvbnRyb2wiLCJOYXZpZ2F0aW9uQ29udHJvbCIsIkZ1bGxzY3JlZW5Db250cm9sIiwiY29udGFpbmVyIiwiZ2V0Q29udGFpbmVyIiwiY2xvc2VzdCIsImFjY2Vzc1Rva2VuIiwibWFwYm94Z2wiLCJwbGFjZWhvbGRlciIsImdlb2NvZGVyUGxhY2VIb2xkZXIiLCJiYm94IiwiaG92ZXJGZWF0dXJlIiwicXVlcnlSZW5kZXJlZEZlYXR1cmVzIiwicG9pbnQiLCJpc0ZlYXR1cmVDbGlja2FibGUiLCJnZXRDYW52YXMiLCJjdXJzb3IiLCJkcmF3X21vZGUiLCJjcm9zc2hhaXJNb2RlcyIsImdldFpvb20iLCJwb3N0Q29uZmlnIl0sInNvdXJjZVJvb3QiOiIifQ==