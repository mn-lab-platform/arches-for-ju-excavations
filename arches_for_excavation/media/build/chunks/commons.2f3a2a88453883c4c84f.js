"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[11594],{

/***/ 11594:
/*!*************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/map-filter.js + 1 modules ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ map_filter)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/search/map-filter.htm
const map_filter_namespaceObject = "templates/views/components/search/map-filter.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/base-filter.js
var base_filter = __webpack_require__(76713);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/map.js
var map = __webpack_require__(70680);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/map/bin-feature-collection.js
var bin_feature_collection = __webpack_require__(29156);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/map/map-styles.js
var map_styles = __webpack_require__(27518);
// EXTERNAL MODULE: ./node_modules/@turf/turf/turf.min.js
var turf_min = __webpack_require__(66577);
// EXTERNAL MODULE: ./node_modules/latlon-geohash/latlon-geohash.js
var latlon_geohash = __webpack_require__(81545);
var latlon_geohash_default = /*#__PURE__*/__webpack_require__.n(latlon_geohash);
// EXTERNAL MODULE: ./node_modules/@mapbox/geojson-extent/geojson-extent.js
var geojson_extent = __webpack_require__(50653);
var geojson_extent_default = /*#__PURE__*/__webpack_require__.n(geojson_extent);
// EXTERNAL MODULE: ./node_modules/uuidjs/dist/uuid.core.js
var uuid_core = __webpack_require__(84806);
var uuid_core_default = /*#__PURE__*/__webpack_require__.n(uuid_core);
// EXTERNAL MODULE: ./node_modules/@mapbox/geojsonhint/geojsonhint.js
var geojsonhint = __webpack_require__(3863);
var geojsonhint_default = /*#__PURE__*/__webpack_require__.n(geojsonhint);
// EXTERNAL MODULE: ./node_modules/mapbox-gl/dist/mapbox-gl.js
var mapbox_gl = __webpack_require__(60842);
var mapbox_gl_default = /*#__PURE__*/__webpack_require__.n(mapbox_gl);
// EXTERNAL MODULE: ./node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js
var mapbox_gl_draw = __webpack_require__(23188);
var mapbox_gl_draw_default = /*#__PURE__*/__webpack_require__.n(mapbox_gl_draw);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/map-filter.js
















var componentName = 'map-filter';
var viewModel = base_filter["default"].extend({
  initialize: function initialize(options) {
    var self = this;
    this.dependenciesLoaded = knockout_latest_default().observable(false);
    this.resultsAutoZoomEnabled = knockout_latest_default().observable(arches["default"].mapFilterAutoZoom);
    this.mapFitBounds = function (bounds, options, force) {
      this.lastResultsBounds = bounds;
      if (this.resultsAutoZoomEnabled() || force) {
        this.map().fitBounds(bounds, options);
      }
    };
    self.mapboxgl = (mapbox_gl_default());
    self.MapboxDraw = (mapbox_gl_draw_default());
    self.dependenciesLoaded(true);
    options.name = "Map Filter";
    base_filter["default"].prototype.initialize.call(this, options);
    options.sources = {
      "geojson-search-buffer-data": {
        "type": "geojson",
        "generateId": true,
        "data": {
          "type": "FeatureCollection",
          "features": []
        }
      }
    };
    options.layers = knockout_latest_default().observable([{
      "id": "geojson-search-buffer-outline-base",
      "source": "geojson-search-buffer-data",
      "type": "line",
      "filter": ["==", "$type", "Polygon"],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": 4
      }
    }, {
      "id": "geojson-search-buffer-outline",
      "source": "geojson-search-buffer-data",
      "type": "line",
      "filter": ["==", "$type", "Polygon"],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#3bb2d0",
        "line-width": 2
      }
    }, {
      "id": "geojson-search-buffer",
      "type": "fill",
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#3bb2d0",
        "fill-outline-color": "#3bb2d0",
        "fill-opacity": 0.2
      },
      "source": "geojson-search-buffer-data"
    }]);
    options.search = true;
    map["default"].apply(this, [options]);
    this.updateLayers = function (layers) {
      var map = self.map();
      var style = map.getStyle();
      style.layers = self.draw ? layers.concat(self.draw.options.styles) : layers;
      map.setStyle(style);
    };
    this.searchGeometries = knockout_latest_default().observableArray(null);
    this.searchAggregations = knockout_latest_default().observable();
    this.selectedTool = knockout_latest_default().observable();
    this.geoJSONString = knockout_latest_default().observable(undefined);
    this.geoJSONErrors = knockout_latest_default().observableArray();
    this.pageLoaded = false;
    this.maxBuffer = 100000;
    this.maxBufferUnits = 'm';
    this.maxZoom = arches["default"].mapDefaultMaxZoom;
    this.filter.feature_collection = knockout_latest_default().observable({
      "type": "FeatureCollection",
      "features": []
    });
    this.bufferUnits = [{
      name: 'meters',
      val: 'm'
    }, {
      name: 'feet',
      val: 'ft'
    }];
    this.mapLinkData.subscribe(function (data) {
      this.zoomToGeoJSON(data);
    }, this);
    var bins = (0,bin_feature_collection["default"])(this.searchAggregations);
    this.geoJSONString.subscribe(function (geoJSONString) {
      this.geoJSONErrors(this.getGeoJSONErrors(geoJSONString));
      if (this.geoJSONErrors().length === 0) {
        var geoJSON = JSON.parse(geoJSONString);
        // remove any extra geometries as only one geometry is allowed for search
        geoJSON.features = geoJSON.features.slice(0, 1);
        if (geoJSON.features.length > 0) {
          var extent = geojson_extent_default()(geoJSON);
          var bounds = new this.mapboxgl.LngLatBounds(extent);
          this.mapFitBounds(bounds, {
            padding: parseInt(this.buffer(), 10)
          });
        }
        this.searchGeometries(geoJSON.features);
        this.draw.set(geoJSON);
      }
    }, this);
    this.getGeoJSONErrors = function (geoJSONString) {
      var hint = geojsonhint_default().hint(geoJSONString);
      var errors = [];
      try {
        var geoJSON = JSON.parse(geoJSONString);
        if (geoJSON.features.length > 1) {
          hint.push({
            "level": 'warning',
            "message": 'Only one feature is allowed for search filtering.  Ignorning all all but the first feature.'
          });
        }
        var feature = geoJSON.features[0];
        var bufferWidth;
        if (!!feature.properties && !!feature.properties.buffer) {
          var buffer = feature.properties.buffer;
          try {
            bufferWidth = parseInt(buffer.width, 10);
            if (bufferWidth < 0 || bufferWidth > this.maxBuffer) {
              throw new Error('Whoops!');
            }
          } catch (_unused) {
            hint.push({
              "level": 'warning',
              "message": 'Buffer must be an integer between 0 and ' + this.maxBuffer
            });
          }
          try {
            var bufferUnit = buffer.unit;
            if (bufferUnit !== 'ft' && bufferUnit !== 'm') {
              throw new Error('Whoops!');
            }
          } catch (_unused2) {
            hint.push({
              "level": 'warning',
              "message": 'Buffer unit must be either "ft" of "m"'
            });
          }
        }
        if (!!feature.properties && !!feature.properties.inverted) {
          var inverted = feature.properties.inverted;
          try {
            bufferWidth = parseInt(buffer.width, 10);
            if (inverted !== true && inverted !== false) {
              throw new Error('Whoops!');
            }
          } catch (_unused3) {
            hint.push({
              "level": 'warning',
              "message": 'Property "inverted" must be the boolean "true" or "false" (no quotes)'
            });
          }
        }
      } finally {
        hint.forEach(function (item) {
          if (item.level !== 'message') {
            errors.push(item);
          }
        });
        return errors; // eslint-disable-line no-unsafe-finally
      }
    };
    this.spatialFilterTypes = [{
      name: 'Point',
      title: 'Draw a Marker',
      class: 'leaflet-draw-draw-marker',
      icon: 'ion-location',
      drawMode: 'draw_point',
      active: knockout_latest_default().observable(false)
    }, {
      name: 'Line',
      title: 'Draw a Polyline',
      icon: 'ion-steam',
      class: 'leaflet-draw-draw-polyline',
      drawMode: 'draw_line_string',
      active: knockout_latest_default().observable(false)
    }, {
      name: 'Polygon',
      title: 'Draw a Polygon',
      icon: 'fa fa-pencil-square-o',
      class: 'leaflet-draw-draw-polygon',
      drawMode: 'draw_polygon',
      active: knockout_latest_default().observable(false)
    }, {
      name: 'Extent',
      title: 'Search by Map Extent',
      icon: 'fa fa-pencil-square-o',
      class: 'leaflet-draw-draw-polygon',
      drawMode: 'extent',
      active: knockout_latest_default().observable(false)
    }];
    this.drawModes = underscore_min_default().pluck(this.spatialFilterTypes, 'drawMode');
    this.selectedTool.subscribe(function (selectedDrawTool) {
      if (!!selectedDrawTool) {
        if (selectedDrawTool === 'extent') {
          this.searchByExtent();
        } else {
          this.draw.changeMode(selectedDrawTool);
          self.map().draw_mode = selectedDrawTool;
        }
      }
    }, this);
    this.searchResults.timestamp.subscribe(function (timestamp) {
      if (this.pageLoaded) {
        this.updateResults();
      }
    }, this);
    this.filterByFeatureGeom = function (feature) {
      if (feature.geometry.type == 'Point' && this.buffer() == 0) {
        this.buffer(25);
      }
      self.searchGeometries.removeAll();
      this.draw.deleteAll();
      this.draw.set({
        "type": "FeatureCollection",
        "features": [feature]
      });
      self.searchGeometries([feature]);
      self.updateFilter();
    };
    var updateSearchResultPointLayer = function updateSearchResultPointLayer() {
      var pointSource = self.map().getSource('search-results-points');
      var agg = knockout_latest_default().unwrap(self.searchAggregations);
      var features = [];
      var mouseoverInstanceId = self.mouseoverInstanceId();
      if (agg) {
        underscore_min_default().each(agg.results, function (result) {
          underscore_min_default().each(result._source.points, function (point) {
            var feature = turf_min.point([point.point.lon, point.point.lat], underscore_min_default().extend(result._source, {
              resourceinstanceid: result._id,
              highlight: result._id === mouseoverInstanceId
            }));
            features.push(feature);
          });
        });
      }
      var pointsFC = turf_min.featureCollection(features);
      pointSource.setData(pointsFC);
    };
    this.updateSearchResultsLayers = function () {
      if (self.filter.feature_collection() && self.filter.feature_collection()['features'].length > 0) {
        var geojsonFC = self.filter.feature_collection();
        var extent = geojson_extent_default()(geojsonFC);
        var bounds = new this.mapboxgl.LngLatBounds(extent);
        self.mapFitBounds(bounds, {
          padding: self.buffer()
        });
      } else {
        self.fitToAggregationBounds();
      }
      var features = [];
      var agg = knockout_latest_default().unwrap(self.searchAggregations);
      underscore_min_default().each(agg.geo_aggs.grid.buckets, function (cell) {
        var pt = latlon_geohash_default().decode(cell.key);
        var feature = turf_min.point([pt.lon, pt.lat], {
          doc_count: cell.doc_count
        });
        features.push(feature);
      });
      var pointsFC = turf_min.featureCollection(features);
      var aggregated = turf_min.collect(knockout_latest_default().unwrap(bins), pointsFC, 'doc_count', 'doc_count');
      underscore_min_default().each(aggregated.features, function (feature) {
        feature.properties.doc_count = underscore_min_default().reduce(feature.properties.doc_count, function (i, ii) {
          return i + ii;
        }, 0);
      });
      var aggData = {
        points: pointsFC,
        agg: aggregated
      };
      var aggSource = self.map().getSource('search-results-hex');
      var hashSource = self.map().getSource('search-results-hashes');
      aggSource.setData(aggData.agg);
      hashSource.setData(aggData.points);
      updateSearchResultPointLayer();
    };
    this.searchFilterVms[componentName](this);
    this.map.subscribe(function () {
      this.setupDraw();
      this.restoreState();
      var filterUpdated = knockout_latest_default().computed(function () {
        return JSON.stringify(knockout_latest_default().toJS(this.filter.feature_collection())) + this.filter.inverted();
      }, this);
      filterUpdated.subscribe(function () {
        this.updateQuery();
      }, this);
      this.buffer.subscribe(function (val) {
        this.updateFilter();
      }, this);
      this.bufferUnit.subscribe(function (val) {
        this.updateFilter();
      }, this);
      this.searchAggregations.subscribe(this.updateSearchResultsLayers, this);
      if (knockout_latest_default().isObservable(bins)) {
        bins.subscribe(this.updateSearchResultsLayers, this);
      }
      if (this.searchAggregations()) {
        this.updateSearchResultsLayers();
      }
      this.mouseoverInstanceId.subscribe(updateSearchResultPointLayer);
    }, this);
  },
  setupDraw: function setupDraw() {
    if (!this.map() || !this.dependenciesLoaded()) {
      return;
    }
    var self = this;
    var modes = this.MapboxDraw.modes;
    modes.static = {
      toDisplayFeatures: function toDisplayFeatures(state, geojson, display) {
        display(geojson);
      }
    };
    this.draw = new this.MapboxDraw({
      displayControlsDefault: false,
      modes: modes
    });
    this.map().addControl(this.draw);
    this.map().on('draw.create', function (e) {
      self.draw.getAll().features.forEach(function (feature) {
        if (feature.id !== e.features[0].id) {
          self.draw.delete(feature.id);
        }
      });
      self.searchGeometries(e.features);
      self.updateFilter();
      self.selectedTool(undefined);
    });
    this.map().on('draw.update', function (e) {
      self.searchGeometries(e.features);
      self.updateFilter();
    });
    this.map().on("draw.modechange", function (e) {
      self.map().draw_mode = e.mode;
    });
  },
  searchByExtent: function searchByExtent() {
    if (underscore_min_default().contains(this.drawModes, this.selectedTool())) {
      this.draw.deleteAll();
    }
    var bounds = this.map().getBounds();
    var ll = bounds.getSouthWest().toArray();
    var ul = bounds.getNorthWest().toArray();
    var ur = bounds.getNorthEast().toArray();
    var lr = bounds.getSouthEast().toArray();
    var coordinates = [ll, ul, ur, lr, ll];
    var boundsFeature = {
      "type": "Feature",
      "properties": {},
      "id": uuid_core_default().generate(),
      "geometry": {
        "type": "Polygon",
        "coordinates": [coordinates]
      }
    };
    this.draw.set({
      "type": "FeatureCollection",
      "features": [boundsFeature]
    });
    this.searchGeometries([boundsFeature]);
    this.updateFilter();
    this.selectedTool(undefined);
  },
  useMaxBuffer: function useMaxBuffer(unit, buffer, maxBuffer) {
    var res = false;
    if (unit === 'ft') {
      res = buffer * 0.3048 > maxBuffer;
    } else {
      res = buffer > maxBuffer;
    }
    return res;
  },
  updateFilter: function updateFilter() {
    if (this.buffer() < 0) {
      this.buffer(0);
    }
    var useMaxBuffer = this.useMaxBuffer(this.bufferUnit(), this.buffer(), this.maxBuffer);
    if (useMaxBuffer) {
      var max = this.bufferUnit() === 'ft' ? 328084 : this.maxBuffer;
      this.buffer(max);
    }
    this.searchGeometries().forEach(function (feature) {
      if (!feature.properties) {
        feature.properties = {};
      }
      feature.properties.buffer = {
        "width": this.buffer(),
        "unit": this.bufferUnit()
      };
      feature.properties.inverted = this.filter.inverted();
    }, this);
    this.filter.feature_collection({
      "type": "FeatureCollection",
      "features": this.searchGeometries()
    });
  },
  editGeoJSON: function editGeoJSON(feature) {
    var geoJSON = feature();
    var geoJSONString = JSON.stringify(geoJSON, null, 4);
    this.geoJSONString(geoJSONString);
  },
  updateGeoJSON: function updateGeoJSON() {
    if (this.geoJSONErrors().length === 0) {
      var geoJSON = JSON.parse(this.geoJSONString());
      this.draw.set(geoJSON);
      this.searchGeometries(geoJSON.features);
      geoJSON.features.forEach(function (feature) {
        if (!!feature.properties && !!feature.properties.buffer) {
          this.buffer(parseInt(feature.properties.buffer.width, 10));
          this.bufferUnit(feature.properties.buffer.unit);
        }
        if (!!feature.properties && Object.prototype.hasOwnProperty.call(feature.properties, 'inverted')) {
          this.filter.inverted(feature.properties.inverted);
        }
      }, this);
      this.selectedTool(undefined);
      this.geoJSONString(undefined);
    }
  },
  zoomToGeoJSON: function zoomToGeoJSON(data) {
    var mapData = data.properties.geometries.reduce(function (fc1, fc2) {
      fc1.geom.features = fc1.geom.features.concat(fc2.geom.features);
      return fc1;
    }, {
      "geom": {
        "type": "FeatureCollection",
        "features": []
      }
    });
    var bounds = new this.mapboxgl.LngLatBounds(geojson_extent_default()(mapData.geom));
    var maxZoom = knockout_latest_default().unwrap(this.maxZoom);
    this.mapFitBounds(bounds, {
      maxZoom: maxZoom > 17 ? 17 : maxZoom
    }, true);
  },
  updateQuery: function updateQuery() {
    var self = this;
    var queryObj = this.query();
    if (this.filter.feature_collection().features.length > 0) {
      if (this.getFilterByType('term-filter-type').hasTag(this.type) === false) {
        this.getFilterByType('term-filter-type').addTag('Map Filter Enabled', this.name, this.filter.inverted);
      }
      this.filter.feature_collection().features[0].properties['inverted'] = this.filter.inverted();
      queryObj[componentName] = knockout_latest_default().toJSON(this.filter.feature_collection());
    } else {
      delete queryObj[componentName];
    }
    this.query(queryObj);
  },
  restoreState: function restoreState() {
    var query = this.query();
    var buffer = 10;
    var bufferUnit = 'm';
    var inverted = false;
    var hasSpatialFilter = false;
    if (componentName in query) {
      var mapQuery = JSON.parse(query[componentName]);
      if (mapQuery.features.length > 0) {
        hasSpatialFilter = true;
        var properties = mapQuery.features[0].properties;
        inverted = properties.inverted;
        this.filter.feature_collection(mapQuery);
        buffer = properties.buffer.width;
        bufferUnit = properties.buffer.unit;
        this.draw.set({
          "type": "FeatureCollection",
          "features": mapQuery.features
        });
      }
    }
    // we need to add these observables here AFTER initial values have been discovered
    // because of the race nature of these variables' subscriptions
    this.buffer = knockout_latest_default().observable(buffer).extend({
      deferred: true
    });
    this.bufferUnit = knockout_latest_default().observable(bufferUnit).extend({
      deferred: true
    });
    this.filter.inverted = knockout_latest_default().observable(inverted).extend({
      deferred: true
    });
    if (hasSpatialFilter) {
      this.getFilterByType('term-filter-type').addTag('Map Filter Enabled', this.name, this.filter.inverted);
    }
    this.updateResults();
    this.pageLoaded = true;
  },
  updateResults: function updateResults() {
    if (!!this.searchResults.results) {
      this.searchAggregations({
        results: this.searchResults.results.hits.hits,
        geo_aggs: this.searchResults.results.aggregations.geo_aggs.inner.buckets[0]
      });
      this.fitToAggregationBounds();
    }
    if (!!this.searchResults[componentName]) {
      var buffer = this.searchResults[componentName].search_buffer;
      this.map().getSource('geojson-search-buffer-data').setData(buffer);
    }
  },
  clear: function clear(reset_features) {
    this.filter.feature_collection({
      "type": "FeatureCollection",
      "features": []
    });
    if (this.map()) {
      this.map().getSource('geojson-search-buffer-data').setData({
        "type": "FeatureCollection",
        "features": []
      });
      this.getFilterByType('term-filter-type').removeTag('Map Filter Enabled');
      this.draw.deleteAll();
      this.searchGeometries([]);
    }
  },
  zoomToAllFeaturesHandler: function zoomToAllFeaturesHandler() {
    this.fitToAggregationBounds(true);
  },
  fitToAggregationBounds: function fitToAggregationBounds(forceFitBounds) {
    var agg = this.searchAggregations();
    var aggBounds;
    if (agg && agg.geo_aggs.bounds.bounds && this.map()) {
      aggBounds = agg.geo_aggs.bounds.bounds;
      var bounds = [[aggBounds.top_left.lon, aggBounds.bottom_right.lat], [aggBounds.bottom_right.lon, aggBounds.top_left.lat]];
      var maxZoom = knockout_latest_default().unwrap(this.maxZoom);
      maxZoom = maxZoom > 17 ? 17 : maxZoom;
      forceFitBounds = forceFitBounds == undefined ? !this.pageLoaded : forceFitBounds == true;
      this.mapFitBounds(bounds, {
        padding: 45,
        maxZoom: maxZoom
      }, forceFitBounds);
    }
  }
});
/* harmony default export */ const map_filter = (knockout_latest_default().components.register(componentName, {
  viewModel: viewModel,
  template: map_filter_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMmYzYTJhODg0NTM4ODNjNGM4NGYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNJO0FBQ0Q7QUFDRTtBQUNxRDtBQUNwQjtBQUNKO0FBQzhCO0FBQ3ZCO0FBQ25DO0FBQ0M7QUFDYTtBQUNuQjtBQUNjO0FBQ1A7QUFDSztBQUdwQyxJQUFJZ0IsYUFBYSxHQUFHLFlBQVk7QUFDaEMsSUFBTUMsU0FBUyxHQUFHWixzQkFBVSxDQUFDYSxNQUFNLENBQUM7RUFDaENDLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFXQyxPQUFPLEVBQUU7SUFDMUIsSUFBSUMsSUFBSSxHQUFHLElBQUk7SUFFZixJQUFJLENBQUNDLGtCQUFrQixHQUFHcEIsb0NBQWEsQ0FBQyxLQUFLLENBQUM7SUFDOUMsSUFBSSxDQUFDc0Isc0JBQXNCLEdBQUd0QixvQ0FBYSxDQUFDQyxpQkFBTSxDQUFDc0IsaUJBQWlCLENBQUM7SUFDckUsSUFBSSxDQUFDQyxZQUFZLEdBQUcsVUFBU0MsTUFBTSxFQUFFUCxPQUFPLEVBQUVRLEtBQUssRUFBQztNQUNoRCxJQUFJLENBQUNDLGlCQUFpQixHQUFHRixNQUFNO01BQy9CLElBQUcsSUFBSSxDQUFDSCxzQkFBc0IsQ0FBQyxDQUFDLElBQUlJLEtBQUssRUFBQztRQUN0QyxJQUFJLENBQUNFLEdBQUcsQ0FBQyxDQUFDLENBQUNDLFNBQVMsQ0FBQ0osTUFBTSxFQUFFUCxPQUFPLENBQUM7TUFDekM7SUFDSixDQUFDO0lBRURDLElBQUksQ0FBQ1csUUFBUSxHQUFHbEIscUJBQU07SUFDdEJPLElBQUksQ0FBQ1ksVUFBVSxHQUFHbEIsMEJBQU07SUFDeEJNLElBQUksQ0FBQ0Msa0JBQWtCLENBQUMsSUFBSSxDQUFDO0lBRTdCRixPQUFPLENBQUNjLElBQUksR0FBRyxZQUFZO0lBQzNCN0Isc0JBQVUsQ0FBQzhCLFNBQVMsQ0FBQ2hC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QUNvQixRQUFRLENBQUNwSCxNQUFNLENBQUNBLE1BQU07TUFDdEMsSUFBSUEsTUFBTSxHQUFHLENBQ1QsQ0FDSXVNLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDL0YsR0FBRyxFQUN0QjhGLFNBQVMsQ0FBQ0UsWUFBWSxDQUFDL0YsR0FBRyxDQUM3QixFQUNELENBQ0k2RixTQUFTLENBQUNFLFlBQVksQ0FBQ2hHLEdBQUcsRUFDMUI4RixTQUFTLENBQUNDLFFBQVEsQ0FBQzlGLEdBQUcsQ0FDekIsQ0FDSjtNQUNELElBQUkzRSxPQUFPLEdBQUd4RCxnQ0FBUyxDQUFDLElBQUksQ0FBQ3dELE9BQU8sQ0FBQztNQUNyQ0EsT0FBTyxHQUFHQSxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBR0EsT0FBTztNQUNyQ3VLLGNBQWMsR0FBR0EsY0FBYyxJQUFJNUssU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDRSxVQUFVLEdBQUcwSyxjQUFjLElBQUksSUFBSTtNQUN4RixJQUFJLENBQUN2TSxZQUFZLENBQUNDLE1BQU0sRUFBRTtRQUN0Qm1ELE9BQU8sRUFBRSxFQUFFO1FBQ1hwQixPQUFPLEVBQUVBO01BQ2IsQ0FBQyxFQUFFdUssY0FBYyxDQUFDO0lBQ3RCO0VBQ0o7QUFDSixDQUFDLENBQUM7QUFFRixpREFBZS9OLG9DQUFhLENBQUNvTyxRQUFRLENBQUN0TixhQUFhLEVBQUU7RUFDakRDLFNBQVMsRUFBRUEsU0FBUztFQUNwQnNOLFFBQVEsRUFBRW5PLDBCQUFpQkE7QUFDL0IsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9tYXAtZmlsdGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgbWFwRmlsdGVyVGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvc2VhcmNoL21hcC1maWx0ZXIuaHRtJztcbmltcG9ydCBCYXNlRmlsdGVyIGZyb20gJ3ZpZXdzL2NvbXBvbmVudHMvc2VhcmNoL2Jhc2UtZmlsdGVyJztcbmltcG9ydCBNYXBDb21wb25lbnRWaWV3TW9kZWwgZnJvbSAndmlld3MvY29tcG9uZW50cy9tYXAnO1xuaW1wb3J0IGJpbkZlYXR1cmVDb2xsZWN0aW9uIGZyb20gJ3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9tYXAvYmluLWZlYXR1cmUtY29sbGVjdGlvbic7XG5pbXBvcnQgbWFwU3R5bGVzIGZyb20gJ3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9tYXAvbWFwLXN0eWxlcyc7XG5pbXBvcnQgKiBhcyB0dXJmIGZyb20gJ3R1cmYnO1xuaW1wb3J0IGdlb2hhc2ggZnJvbSAnZ2VvaGFzaCc7XG5pbXBvcnQgZ2VvanNvbkV4dGVudCBmcm9tICdnZW9qc29uLWV4dGVudCc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBnZW9qc29uaGludCBmcm9tICdnZW9qc29uaGludCc7XG5pbXBvcnQgbWFwYm94IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgbWJkcmF3IGZyb20gJ21hcGJveC1nbC1kcmF3JztcblxuXG52YXIgY29tcG9uZW50TmFtZSA9ICdtYXAtZmlsdGVyJztcbmNvbnN0IHZpZXdNb2RlbCA9IEJhc2VGaWx0ZXIuZXh0ZW5kKHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmRlcGVuZGVuY2llc0xvYWRlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnJlc3VsdHNBdXRvWm9vbUVuYWJsZWQgPSBrby5vYnNlcnZhYmxlKGFyY2hlcy5tYXBGaWx0ZXJBdXRvWm9vbSk7XG4gICAgICAgIHRoaXMubWFwRml0Qm91bmRzID0gZnVuY3Rpb24oYm91bmRzLCBvcHRpb25zLCBmb3JjZSl7XG4gICAgICAgICAgICB0aGlzLmxhc3RSZXN1bHRzQm91bmRzID0gYm91bmRzO1xuICAgICAgICAgICAgaWYodGhpcy5yZXN1bHRzQXV0b1pvb21FbmFibGVkKCkgfHwgZm9yY2Upe1xuICAgICAgICAgICAgICAgIHRoaXMubWFwKCkuZml0Qm91bmRzKGJvdW5kcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLm1hcGJveGdsID0gbWFwYm94O1xuICAgICAgICBzZWxmLk1hcGJveERyYXcgPSBtYmRyYXc7XG4gICAgICAgIHNlbGYuZGVwZW5kZW5jaWVzTG9hZGVkKHRydWUpO1xuXG4gICAgICAgIG9wdGlvbnMubmFtZSA9IFwiTWFwIEZpbHRlclwiO1xuICAgICAgICBCYXNlRmlsdGVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgb3B0aW9ucy5zb3VyY2VzID0ge1xuICAgICAgICAgICAgXCJnZW9qc29uLXNlYXJjaC1idWZmZXItZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZ2VvanNvblwiLFxuICAgICAgICAgICAgICAgIFwiZ2VuZXJhdGVJZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgb3B0aW9ucy5sYXllcnMgPSBrby5vYnNlcnZhYmxlKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImdlb2pzb24tc2VhcmNoLWJ1ZmZlci1vdXRsaW5lLWJhc2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJnZW9qc29uLXNlYXJjaC1idWZmZXItZGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZmlsdGVyXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPT1cIiwgXCIkdHlwZVwiLCBcIlBvbHlnb25cIlxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBcImxheW91dFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImxpbmUtY2FwXCI6IFwicm91bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGluZS1qb2luXCI6IFwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcInBhaW50XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGluZS1jb2xvclwiOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGluZS13aWR0aFwiOiA0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImdlb2pzb24tc2VhcmNoLWJ1ZmZlci1vdXRsaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic291cmNlXCI6IFwiZ2VvanNvbi1zZWFyY2gtYnVmZmVyLWRhdGFcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGluZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImZpbHRlclwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIj09XCIsIFwiJHR5cGVcIiwgXCJQb2x5Z29uXCJcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgXCJsYXlvdXRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5lLWNhcFwiOiBcInJvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxpbmUtam9pblwiOiBcInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJwYWludFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImxpbmUtY29sb3JcIjogXCIjM2JiMmQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxpbmUtd2lkdGhcIjogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJnZW9qc29uLXNlYXJjaC1idWZmZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZmlsbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImxheW91dFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJ2aXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJwYWludFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZpbGwtY29sb3JcIjogXCIjM2JiMmQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZpbGwtb3V0bGluZS1jb2xvclwiOiBcIiMzYmIyZDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlsbC1vcGFjaXR5XCI6IDAuMlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcInNvdXJjZVwiOiBcImdlb2pzb24tc2VhcmNoLWJ1ZmZlci1kYXRhXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICk7XG5cbiAgICAgICAgb3B0aW9ucy5zZWFyY2ggPSB0cnVlO1xuXG4gICAgICAgIE1hcENvbXBvbmVudFZpZXdNb2RlbC5hcHBseSh0aGlzLCBbb3B0aW9uc10pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlTGF5ZXJzID0gZnVuY3Rpb24obGF5ZXJzKSB7XG4gICAgICAgICAgICB2YXIgbWFwID0gc2VsZi5tYXAoKTtcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IG1hcC5nZXRTdHlsZSgpO1xuICAgICAgICAgICAgc3R5bGUubGF5ZXJzID0gc2VsZi5kcmF3ID8gbGF5ZXJzLmNvbmNhdChzZWxmLmRyYXcub3B0aW9ucy5zdHlsZXMpIDogbGF5ZXJzO1xuICAgICAgICAgICAgbWFwLnNldFN0eWxlKHN0eWxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNlYXJjaEdlb21ldHJpZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkobnVsbCk7XG4gICAgICAgIHRoaXMuc2VhcmNoQWdncmVnYXRpb25zID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVG9vbCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICAgICAgdGhpcy5nZW9KU09OU3RyaW5nID0ga28ub2JzZXJ2YWJsZSh1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLmdlb0pTT05FcnJvcnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICAgICAgdGhpcy5wYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWF4QnVmZmVyID0gMTAwMDAwO1xuICAgICAgICB0aGlzLm1heEJ1ZmZlclVuaXRzID0gJ20nO1xuICAgICAgICB0aGlzLm1heFpvb20gPSBhcmNoZXMubWFwRGVmYXVsdE1heFpvb207XG4gICAgICAgIHRoaXMuZmlsdGVyLmZlYXR1cmVfY29sbGVjdGlvbiA9IGtvLm9ic2VydmFibGUoe1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5idWZmZXJVbml0cyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAnbWV0ZXJzJyxcbiAgICAgICAgICAgIHZhbDogJ20nXG4gICAgICAgIH0se1xuICAgICAgICAgICAgbmFtZTogJ2ZlZXQnLFxuICAgICAgICAgICAgdmFsOiAnZnQnXG4gICAgICAgIH1dO1xuXG4gICAgICAgIHRoaXMubWFwTGlua0RhdGEuc3Vic2NyaWJlKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuem9vbVRvR2VvSlNPTihkYXRhKTtcbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICB2YXIgYmlucyA9IGJpbkZlYXR1cmVDb2xsZWN0aW9uKHRoaXMuc2VhcmNoQWdncmVnYXRpb25zKTtcblxuICAgICAgICB0aGlzLmdlb0pTT05TdHJpbmcuc3Vic2NyaWJlKGZ1bmN0aW9uKGdlb0pTT05TdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VvSlNPTkVycm9ycyh0aGlzLmdldEdlb0pTT05FcnJvcnMoZ2VvSlNPTlN0cmluZykpO1xuICAgICAgICAgICAgaWYodGhpcy5nZW9KU09ORXJyb3JzKCkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICB2YXIgZ2VvSlNPTiA9IEpTT04ucGFyc2UoZ2VvSlNPTlN0cmluZyk7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFueSBleHRyYSBnZW9tZXRyaWVzIGFzIG9ubHkgb25lIGdlb21ldHJ5IGlzIGFsbG93ZWQgZm9yIHNlYXJjaFxuICAgICAgICAgICAgICAgIGdlb0pTT04uZmVhdHVyZXMgPSBnZW9KU09OLmZlYXR1cmVzLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgIGlmKGdlb0pTT04uZmVhdHVyZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBleHRlbnQgPSBnZW9qc29uRXh0ZW50KGdlb0pTT04pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm91bmRzID0gbmV3IHRoaXMubWFwYm94Z2wuTG5nTGF0Qm91bmRzKGV4dGVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwRml0Qm91bmRzKGJvdW5kcywge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogcGFyc2VJbnQodGhpcy5idWZmZXIoKSwgMTApXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaEdlb21ldHJpZXMoZ2VvSlNPTi5mZWF0dXJlcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3LnNldChnZW9KU09OKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5nZXRHZW9KU09ORXJyb3JzID0gZnVuY3Rpb24oZ2VvSlNPTlN0cmluZykge1xuICAgICAgICAgICAgdmFyIGhpbnQgPSBnZW9qc29uaGludC5oaW50KGdlb0pTT05TdHJpbmcpO1xuICAgICAgICAgICAgdmFyIGVycm9ycyA9IFtdO1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIHZhciBnZW9KU09OID0gSlNPTi5wYXJzZShnZW9KU09OU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2VvSlNPTi5mZWF0dXJlcy5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgICAgICAgICAgaGludC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGV2ZWxcIjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6ICdPbmx5IG9uZSBmZWF0dXJlIGlzIGFsbG93ZWQgZm9yIHNlYXJjaCBmaWx0ZXJpbmcuICBJZ25vcm5pbmcgYWxsIGFsbCBidXQgdGhlIGZpcnN0IGZlYXR1cmUuJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGZlYXR1cmUgPSBnZW9KU09OLmZlYXR1cmVzWzBdO1xuICAgICAgICAgICAgICAgIGxldCBidWZmZXJXaWR0aDtcbiAgICAgICAgICAgICAgICBpZiAoISFmZWF0dXJlLnByb3BlcnRpZXMgJiYgISFmZWF0dXJlLnByb3BlcnRpZXMuYnVmZmVyKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGZlYXR1cmUucHJvcGVydGllcy5idWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcldpZHRoID0gcGFyc2VJbnQoYnVmZmVyLndpZHRoLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihidWZmZXJXaWR0aCA8IDAgfHwgYnVmZmVyV2lkdGggPiB0aGlzLm1heEJ1ZmZlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaG9vcHMhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxldmVsXCI6ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogJ0J1ZmZlciBtdXN0IGJlIGFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCAnICsgdGhpcy5tYXhCdWZmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlclVuaXQgPSBidWZmZXIudW5pdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGJ1ZmZlclVuaXQgIT09ICdmdCcgJiYgYnVmZmVyVW5pdCAhPT0gJ20nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dob29wcyEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGV2ZWxcIjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiAnQnVmZmVyIHVuaXQgbXVzdCBiZSBlaXRoZXIgXCJmdFwiIG9mIFwibVwiJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoISFmZWF0dXJlLnByb3BlcnRpZXMgJiYgISFmZWF0dXJlLnByb3BlcnRpZXMuaW52ZXJ0ZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW52ZXJ0ZWQgPSBmZWF0dXJlLnByb3BlcnRpZXMuaW52ZXJ0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcldpZHRoID0gcGFyc2VJbnQoYnVmZmVyLndpZHRoLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbnZlcnRlZCAhPT0gdHJ1ZSAmJiBpbnZlcnRlZCAhPT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2hvb3BzIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsZXZlbFwiOiAnd2FybmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6ICdQcm9wZXJ0eSBcImludmVydGVkXCIgbXVzdCBiZSB0aGUgYm9vbGVhbiBcInRydWVcIiBvciBcImZhbHNlXCIgKG5vIHF1b3RlcyknXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1maW5hbGx5e1xuICAgICAgICAgICAgICAgIGhpbnQuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVsICE9PSAnbWVzc2FnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnNhZmUtZmluYWxseVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc3BhdGlhbEZpbHRlclR5cGVzID0gW3tcbiAgICAgICAgICAgIG5hbWU6ICdQb2ludCcsXG4gICAgICAgICAgICB0aXRsZTogJ0RyYXcgYSBNYXJrZXInLFxuICAgICAgICAgICAgY2xhc3M6ICdsZWFmbGV0LWRyYXctZHJhdy1tYXJrZXInLFxuICAgICAgICAgICAgaWNvbjogJ2lvbi1sb2NhdGlvbicsXG4gICAgICAgICAgICBkcmF3TW9kZTogJ2RyYXdfcG9pbnQnLFxuICAgICAgICAgICAgYWN0aXZlOiBrby5vYnNlcnZhYmxlKGZhbHNlKVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnTGluZScsXG4gICAgICAgICAgICB0aXRsZTogJ0RyYXcgYSBQb2x5bGluZScsXG4gICAgICAgICAgICBpY29uOiAnaW9uLXN0ZWFtJyxcbiAgICAgICAgICAgIGNsYXNzOiAnbGVhZmxldC1kcmF3LWRyYXctcG9seWxpbmUnLFxuICAgICAgICAgICAgZHJhd01vZGU6ICdkcmF3X2xpbmVfc3RyaW5nJyxcbiAgICAgICAgICAgIGFjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSlcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ1BvbHlnb24nLFxuICAgICAgICAgICAgdGl0bGU6ICdEcmF3IGEgUG9seWdvbicsXG4gICAgICAgICAgICBpY29uOiAnZmEgZmEtcGVuY2lsLXNxdWFyZS1vJyxcbiAgICAgICAgICAgIGNsYXNzOiAnbGVhZmxldC1kcmF3LWRyYXctcG9seWdvbicsXG4gICAgICAgICAgICBkcmF3TW9kZTogJ2RyYXdfcG9seWdvbicsXG4gICAgICAgICAgICBhY3RpdmU6IGtvLm9ic2VydmFibGUoZmFsc2UpXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdFeHRlbnQnLFxuICAgICAgICAgICAgdGl0bGU6ICdTZWFyY2ggYnkgTWFwIEV4dGVudCcsXG4gICAgICAgICAgICBpY29uOiAnZmEgZmEtcGVuY2lsLXNxdWFyZS1vJyxcbiAgICAgICAgICAgIGNsYXNzOiAnbGVhZmxldC1kcmF3LWRyYXctcG9seWdvbicsXG4gICAgICAgICAgICBkcmF3TW9kZTogJ2V4dGVudCcsXG4gICAgICAgICAgICBhY3RpdmU6IGtvLm9ic2VydmFibGUoZmFsc2UpXG4gICAgICAgIH1dO1xuXG4gICAgICAgIHRoaXMuZHJhd01vZGVzID0gXy5wbHVjayh0aGlzLnNwYXRpYWxGaWx0ZXJUeXBlcywgJ2RyYXdNb2RlJyk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZFRvb2wuc3Vic2NyaWJlKGZ1bmN0aW9uKHNlbGVjdGVkRHJhd1Rvb2wpe1xuICAgICAgICAgICAgaWYoISFzZWxlY3RlZERyYXdUb29sKXtcbiAgICAgICAgICAgICAgICBpZihzZWxlY3RlZERyYXdUb29sID09PSAnZXh0ZW50Jyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQnlFeHRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcuY2hhbmdlTW9kZShzZWxlY3RlZERyYXdUb29sKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tYXAoKS5kcmF3X21vZGUgPSBzZWxlY3RlZERyYXdUb29sO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzLnRpbWVzdGFtcC5zdWJzY3JpYmUoZnVuY3Rpb24odGltZXN0YW1wKSB7XG4gICAgICAgICAgICBpZih0aGlzLnBhZ2VMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJCeUZlYXR1cmVHZW9tID0gZnVuY3Rpb24oZmVhdHVyZSkge1xuICAgICAgICAgICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PSAnUG9pbnQnICYmIHRoaXMuYnVmZmVyKCkgPT0gMCkgeyB0aGlzLmJ1ZmZlcigyNSk7IH1cbiAgICAgICAgICAgIHNlbGYuc2VhcmNoR2VvbWV0cmllcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhdy5kZWxldGVBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhdy5zZXQoe1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiBbZmVhdHVyZV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5zZWFyY2hHZW9tZXRyaWVzKFtmZWF0dXJlXSk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUZpbHRlcigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB1cGRhdGVTZWFyY2hSZXN1bHRQb2ludExheWVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcG9pbnRTb3VyY2UgPSBzZWxmLm1hcCgpLmdldFNvdXJjZSgnc2VhcmNoLXJlc3VsdHMtcG9pbnRzJyk7XG4gICAgICAgICAgICB2YXIgYWdnID0ga28udW53cmFwKHNlbGYuc2VhcmNoQWdncmVnYXRpb25zKTtcbiAgICAgICAgICAgIHZhciBmZWF0dXJlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIG1vdXNlb3Zlckluc3RhbmNlSWQgPSBzZWxmLm1vdXNlb3Zlckluc3RhbmNlSWQoKTtcblxuICAgICAgICAgICAgaWYgKGFnZykge1xuICAgICAgICAgICAgICAgIF8uZWFjaChhZ2cucmVzdWx0cywgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChyZXN1bHQuX3NvdXJjZS5wb2ludHMsIGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmVhdHVyZSA9IHR1cmYucG9pbnQoW3BvaW50LnBvaW50LmxvbiwgcG9pbnQucG9pbnQubGF0XSwgXy5leHRlbmQocmVzdWx0Ll9zb3VyY2UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZWluc3RhbmNlaWQ6IHJlc3VsdC5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiByZXN1bHQuX2lkID09PSBtb3VzZW92ZXJJbnN0YW5jZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBvaW50c0ZDID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihmZWF0dXJlcyk7XG4gICAgICAgICAgICBwb2ludFNvdXJjZS5zZXREYXRhKHBvaW50c0ZDKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNlYXJjaFJlc3VsdHNMYXllcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmZpbHRlci5mZWF0dXJlX2NvbGxlY3Rpb24oKSAmJiBzZWxmLmZpbHRlci5mZWF0dXJlX2NvbGxlY3Rpb24oKVsnZmVhdHVyZXMnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdlb2pzb25GQyA9IHNlbGYuZmlsdGVyLmZlYXR1cmVfY29sbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBleHRlbnQgPSBnZW9qc29uRXh0ZW50KGdlb2pzb25GQyk7XG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kcyA9IG5ldyB0aGlzLm1hcGJveGdsLkxuZ0xhdEJvdW5kcyhleHRlbnQpO1xuICAgICAgICAgICAgICAgIHNlbGYubWFwRml0Qm91bmRzKGJvdW5kcywge1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBzZWxmLmJ1ZmZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuZml0VG9BZ2dyZWdhdGlvbkJvdW5kcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZlYXR1cmVzID0gW107XG4gICAgICAgICAgICB2YXIgYWdnID0ga28udW53cmFwKHNlbGYuc2VhcmNoQWdncmVnYXRpb25zKTtcbiAgICAgICAgICAgIF8uZWFjaChhZ2cuZ2VvX2FnZ3MuZ3JpZC5idWNrZXRzLCBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHB0ID0gZ2VvaGFzaC5kZWNvZGUoY2VsbC5rZXkpO1xuICAgICAgICAgICAgICAgIHZhciBmZWF0dXJlID0gdHVyZi5wb2ludChbcHQubG9uLCBwdC5sYXRdLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvY19jb3VudDogY2VsbC5kb2NfY291bnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgcG9pbnRzRkMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKGZlYXR1cmVzKTtcblxuICAgICAgICAgICAgdmFyIGFnZ3JlZ2F0ZWQgPSB0dXJmLmNvbGxlY3Qoa28udW53cmFwKGJpbnMpLCBwb2ludHNGQywgJ2RvY19jb3VudCcsICdkb2NfY291bnQnKTtcbiAgICAgICAgICAgIF8uZWFjaChhZ2dyZWdhdGVkLmZlYXR1cmVzLCBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLmRvY19jb3VudCA9IF8ucmVkdWNlKGZlYXR1cmUucHJvcGVydGllcy5kb2NfY291bnQsIGZ1bmN0aW9uKGksIGlpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpICsgaWk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGFnZ0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgcG9pbnRzOiBwb2ludHNGQyxcbiAgICAgICAgICAgICAgICBhZ2c6IGFnZ3JlZ2F0ZWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBhZ2dTb3VyY2UgPSBzZWxmLm1hcCgpLmdldFNvdXJjZSgnc2VhcmNoLXJlc3VsdHMtaGV4Jyk7XG4gICAgICAgICAgICB2YXIgaGFzaFNvdXJjZSA9IHNlbGYubWFwKCkuZ2V0U291cmNlKCdzZWFyY2gtcmVzdWx0cy1oYXNoZXMnKTtcbiAgICAgICAgICAgIGFnZ1NvdXJjZS5zZXREYXRhKGFnZ0RhdGEuYWdnKTtcbiAgICAgICAgICAgIGhhc2hTb3VyY2Uuc2V0RGF0YShhZ2dEYXRhLnBvaW50cyk7XG4gICAgICAgICAgICB1cGRhdGVTZWFyY2hSZXN1bHRQb2ludExheWVyKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZWFyY2hGaWx0ZXJWbXNbY29tcG9uZW50TmFtZV0odGhpcyk7XG4gICAgICAgIHRoaXMubWFwLnN1YnNjcmliZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5zZXR1cERyYXcoKTtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZVN0YXRlKCk7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJVcGRhdGVkID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGtvLnRvSlModGhpcy5maWx0ZXIuZmVhdHVyZV9jb2xsZWN0aW9uKCkpKSArIHRoaXMuZmlsdGVyLmludmVydGVkKCk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIGZpbHRlclVwZGF0ZWQuc3Vic2NyaWJlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUXVlcnkoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlci5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXIoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlclVuaXQuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyKCk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5zZWFyY2hBZ2dyZWdhdGlvbnMuc3Vic2NyaWJlKHRoaXMudXBkYXRlU2VhcmNoUmVzdWx0c0xheWVycywgdGhpcyk7XG4gICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKGJpbnMpKSB7XG4gICAgICAgICAgICAgICAgYmlucy5zdWJzY3JpYmUodGhpcy51cGRhdGVTZWFyY2hSZXN1bHRzTGF5ZXJzLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaEFnZ3JlZ2F0aW9ucygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZWFyY2hSZXN1bHRzTGF5ZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vdXNlb3Zlckluc3RhbmNlSWQuc3Vic2NyaWJlKHVwZGF0ZVNlYXJjaFJlc3VsdFBvaW50TGF5ZXIpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgc2V0dXBEcmF3OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMubWFwKCkgfHwgIXRoaXMuZGVwZW5kZW5jaWVzTG9hZGVkKCkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG1vZGVzID0gdGhpcy5NYXBib3hEcmF3Lm1vZGVzO1xuICAgICAgICBtb2Rlcy5zdGF0aWMgPSB7XG4gICAgICAgICAgICB0b0Rpc3BsYXlGZWF0dXJlczogZnVuY3Rpb24oc3RhdGUsIGdlb2pzb24sIGRpc3BsYXkpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5KGdlb2pzb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRyYXcgPSBuZXcgdGhpcy5NYXBib3hEcmF3KHtcbiAgICAgICAgICAgIGRpc3BsYXlDb250cm9sc0RlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgbW9kZXM6IG1vZGVzXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1hcCgpLmFkZENvbnRyb2wodGhpcy5kcmF3KTtcbiAgICAgICAgdGhpcy5tYXAoKS5vbignZHJhdy5jcmVhdGUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZWxmLmRyYXcuZ2V0QWxsKCkuZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbihmZWF0dXJlKXtcbiAgICAgICAgICAgICAgICBpZihmZWF0dXJlLmlkICE9PSBlLmZlYXR1cmVzWzBdLmlkKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kcmF3LmRlbGV0ZShmZWF0dXJlLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoR2VvbWV0cmllcyhlLmZlYXR1cmVzKTtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlRmlsdGVyKCk7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkVG9vbCh1bmRlZmluZWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tYXAoKS5vbignZHJhdy51cGRhdGUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZWxmLnNlYXJjaEdlb21ldHJpZXMoZS5mZWF0dXJlcyk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUZpbHRlcigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tYXAoKS5vbihcImRyYXcubW9kZWNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZWxmLm1hcCgpLmRyYXdfbW9kZSA9IGUubW9kZTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNlYXJjaEJ5RXh0ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF8uY29udGFpbnModGhpcy5kcmF3TW9kZXMsIHRoaXMuc2VsZWN0ZWRUb29sKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXcuZGVsZXRlQWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMubWFwKCkuZ2V0Qm91bmRzKCk7XG4gICAgICAgIHZhciBsbCA9IGJvdW5kcy5nZXRTb3V0aFdlc3QoKS50b0FycmF5KCk7XG4gICAgICAgIHZhciB1bCA9IGJvdW5kcy5nZXROb3J0aFdlc3QoKS50b0FycmF5KCk7XG4gICAgICAgIHZhciB1ciA9IGJvdW5kcy5nZXROb3J0aEVhc3QoKS50b0FycmF5KCk7XG4gICAgICAgIHZhciBsciA9IGJvdW5kcy5nZXRTb3V0aEVhc3QoKS50b0FycmF5KCk7XG4gICAgICAgIHZhciBjb29yZGluYXRlcyA9IFtsbCwgdWwsIHVyLCBsciwgbGxdO1xuICAgICAgICB2YXIgYm91bmRzRmVhdHVyZSA9IHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7fSxcbiAgICAgICAgICAgIFwiaWRcIjogdXVpZC5nZW5lcmF0ZSgpLFxuICAgICAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICAgICAgICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW2Nvb3JkaW5hdGVzXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRyYXcuc2V0KHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICBcImZlYXR1cmVzXCI6IFtib3VuZHNGZWF0dXJlXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZWFyY2hHZW9tZXRyaWVzKFtib3VuZHNGZWF0dXJlXSk7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUb29sKHVuZGVmaW5lZCk7XG4gICAgfSxcblxuICAgIHVzZU1heEJ1ZmZlcjogZnVuY3Rpb24odW5pdCwgYnVmZmVyLCBtYXhCdWZmZXIpIHtcbiAgICAgICAgbGV0IHJlcyA9IGZhbHNlO1xuICAgICAgICBpZiAodW5pdCA9PT0gJ2Z0Jykge1xuICAgICAgICAgICAgcmVzID0gKGJ1ZmZlciAqIDAuMzA0OCkgPiBtYXhCdWZmZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMgPSBidWZmZXIgPiBtYXhCdWZmZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9LFxuXG4gICAgdXBkYXRlRmlsdGVyOiBmdW5jdGlvbigpe1xuICAgICAgICBpZiAodGhpcy5idWZmZXIoKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVzZU1heEJ1ZmZlciA9IHRoaXMudXNlTWF4QnVmZmVyKHRoaXMuYnVmZmVyVW5pdCgpLCB0aGlzLmJ1ZmZlcigpLCB0aGlzLm1heEJ1ZmZlcik7XG4gICAgICAgIGlmICh1c2VNYXhCdWZmZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9IHRoaXMuYnVmZmVyVW5pdCgpID09PSAnZnQnID8gMzI4MDg0IDogdGhpcy5tYXhCdWZmZXI7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcihtYXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWFyY2hHZW9tZXRyaWVzKCkuZm9yRWFjaChmdW5jdGlvbihmZWF0dXJlKXtcbiAgICAgICAgICAgIGlmKCFmZWF0dXJlLnByb3BlcnRpZXMpe1xuICAgICAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllcyA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLmJ1ZmZlciA9IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IHRoaXMuYnVmZmVyKCksXG4gICAgICAgICAgICAgICAgXCJ1bml0XCI6IHRoaXMuYnVmZmVyVW5pdCgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLmludmVydGVkID0gdGhpcy5maWx0ZXIuaW52ZXJ0ZWQoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMuZmlsdGVyLmZlYXR1cmVfY29sbGVjdGlvbih7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiB0aGlzLnNlYXJjaEdlb21ldHJpZXMoKVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZWRpdEdlb0pTT046IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgdmFyIGdlb0pTT04gPSBmZWF0dXJlKCk7XG4gICAgICAgIHZhciBnZW9KU09OU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZ2VvSlNPTiwgbnVsbCwgNCk7XG4gICAgICAgIHRoaXMuZ2VvSlNPTlN0cmluZyhnZW9KU09OU3RyaW5nKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlR2VvSlNPTjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmdlb0pTT05FcnJvcnMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZhciBnZW9KU09OID0gSlNPTi5wYXJzZSh0aGlzLmdlb0pTT05TdHJpbmcoKSk7XG4gICAgICAgICAgICB0aGlzLmRyYXcuc2V0KGdlb0pTT04pO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hHZW9tZXRyaWVzKGdlb0pTT04uZmVhdHVyZXMpO1xuICAgICAgICAgICAgZ2VvSlNPTi5mZWF0dXJlcy5mb3JFYWNoKGZ1bmN0aW9uKGZlYXR1cmUpe1xuICAgICAgICAgICAgICAgIGlmKCEhZmVhdHVyZS5wcm9wZXJ0aWVzICYmICEhZmVhdHVyZS5wcm9wZXJ0aWVzLmJ1ZmZlcil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyKHBhcnNlSW50KGZlYXR1cmUucHJvcGVydGllcy5idWZmZXIud2lkdGgsIDEwKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyVW5pdChmZWF0dXJlLnByb3BlcnRpZXMuYnVmZmVyLnVuaXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighIWZlYXR1cmUucHJvcGVydGllcyAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZmVhdHVyZS5wcm9wZXJ0aWVzLCAnaW52ZXJ0ZWQnKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyLmludmVydGVkKGZlYXR1cmUucHJvcGVydGllcy5pbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVG9vbCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgdGhpcy5nZW9KU09OU3RyaW5nKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgem9vbVRvR2VvSlNPTjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgbWFwRGF0YSA9IGRhdGEucHJvcGVydGllcy5nZW9tZXRyaWVzLnJlZHVjZShmdW5jdGlvbihmYzEsIGZjMikge1xuICAgICAgICAgICAgZmMxLmdlb20uZmVhdHVyZXMgPSBmYzEuZ2VvbS5mZWF0dXJlcy5jb25jYXQoZmMyLmdlb20uZmVhdHVyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIGZjMTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgXCJnZW9tXCI6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBib3VuZHMgPSBuZXcgdGhpcy5tYXBib3hnbC5MbmdMYXRCb3VuZHMoZ2VvanNvbkV4dGVudChtYXBEYXRhLmdlb20pKTtcbiAgICAgICAgdmFyIG1heFpvb20gPSBrby51bndyYXAodGhpcy5tYXhab29tKTtcbiAgICAgICAgdGhpcy5tYXBGaXRCb3VuZHMoYm91bmRzLCB7XG4gICAgICAgICAgICBtYXhab29tOiBtYXhab29tID4gMTcgPyAxNyA6IG1heFpvb21cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVF1ZXJ5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcXVlcnlPYmogPSB0aGlzLnF1ZXJ5KCk7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlci5mZWF0dXJlX2NvbGxlY3Rpb24oKS5mZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRGaWx0ZXJCeVR5cGUoJ3Rlcm0tZmlsdGVyLXR5cGUnKS5oYXNUYWcodGhpcy50eXBlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEZpbHRlckJ5VHlwZSgndGVybS1maWx0ZXItdHlwZScpLmFkZFRhZygnTWFwIEZpbHRlciBFbmFibGVkJywgdGhpcy5uYW1lLCB0aGlzLmZpbHRlci5pbnZlcnRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5mZWF0dXJlX2NvbGxlY3Rpb24oKS5mZWF0dXJlc1swXS5wcm9wZXJ0aWVzWydpbnZlcnRlZCddID0gdGhpcy5maWx0ZXIuaW52ZXJ0ZWQoKTtcbiAgICAgICAgICAgIHF1ZXJ5T2JqW2NvbXBvbmVudE5hbWVdID0ga28udG9KU09OKHRoaXMuZmlsdGVyLmZlYXR1cmVfY29sbGVjdGlvbigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBxdWVyeU9ialtjb21wb25lbnROYW1lXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXJ5KHF1ZXJ5T2JqKTtcbiAgICB9LFxuXG4gICAgcmVzdG9yZVN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSgpO1xuICAgICAgICB2YXIgYnVmZmVyID0gMTA7XG4gICAgICAgIHZhciBidWZmZXJVbml0ID0gJ20nO1xuICAgICAgICB2YXIgaW52ZXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGhhc1NwYXRpYWxGaWx0ZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKGNvbXBvbmVudE5hbWUgaW4gcXVlcnkpIHtcbiAgICAgICAgICAgIHZhciBtYXBRdWVyeSA9IEpTT04ucGFyc2UocXVlcnlbY29tcG9uZW50TmFtZV0pO1xuICAgICAgICAgICAgaWYgKG1hcFF1ZXJ5LmZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBoYXNTcGF0aWFsRmlsdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydGllcyA9IG1hcFF1ZXJ5LmZlYXR1cmVzWzBdLnByb3BlcnRpZXM7XG4gICAgICAgICAgICAgICAgaW52ZXJ0ZWQgPSBwcm9wZXJ0aWVzLmludmVydGVkO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyLmZlYXR1cmVfY29sbGVjdGlvbihtYXBRdWVyeSk7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gcHJvcGVydGllcy5idWZmZXIud2lkdGg7XG4gICAgICAgICAgICAgICAgYnVmZmVyVW5pdCA9IHByb3BlcnRpZXMuYnVmZmVyLnVuaXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3LnNldCh7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogbWFwUXVlcnkuZmVhdHVyZXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIGFkZCB0aGVzZSBvYnNlcnZhYmxlcyBoZXJlIEFGVEVSIGluaXRpYWwgdmFsdWVzIGhhdmUgYmVlbiBkaXNjb3ZlcmVkXG4gICAgICAgIC8vIGJlY2F1c2Ugb2YgdGhlIHJhY2UgbmF0dXJlIG9mIHRoZXNlIHZhcmlhYmxlcycgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLmJ1ZmZlciA9IGtvLm9ic2VydmFibGUoYnVmZmVyKS5leHRlbmQoeyBkZWZlcnJlZDogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5idWZmZXJVbml0ID0ga28ub2JzZXJ2YWJsZShidWZmZXJVbml0KS5leHRlbmQoeyBkZWZlcnJlZDogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5maWx0ZXIuaW52ZXJ0ZWQgPSBrby5vYnNlcnZhYmxlKGludmVydGVkKS5leHRlbmQoeyBkZWZlcnJlZDogdHJ1ZSB9KTtcbiAgICAgICAgaWYgKGhhc1NwYXRpYWxGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyQnlUeXBlKCd0ZXJtLWZpbHRlci10eXBlJykuYWRkVGFnKCdNYXAgRmlsdGVyIEVuYWJsZWQnLCB0aGlzLm5hbWUsIHRoaXMuZmlsdGVyLmludmVydGVkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdHMoKTtcbiAgICAgICAgdGhpcy5wYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUmVzdWx0czogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghIXRoaXMuc2VhcmNoUmVzdWx0cy5yZXN1bHRzKXtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQWdncmVnYXRpb25zKHtcbiAgICAgICAgICAgICAgICByZXN1bHRzOiB0aGlzLnNlYXJjaFJlc3VsdHMucmVzdWx0cy5oaXRzLmhpdHMsXG4gICAgICAgICAgICAgICAgZ2VvX2FnZ3M6IHRoaXMuc2VhcmNoUmVzdWx0cy5yZXN1bHRzLmFnZ3JlZ2F0aW9ucy5nZW9fYWdncy5pbm5lci5idWNrZXRzWzBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZml0VG9BZ2dyZWdhdGlvbkJvdW5kcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCEhdGhpcy5zZWFyY2hSZXN1bHRzW2NvbXBvbmVudE5hbWVdKSB7XG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gdGhpcy5zZWFyY2hSZXN1bHRzW2NvbXBvbmVudE5hbWVdLnNlYXJjaF9idWZmZXI7XG4gICAgICAgICAgICB0aGlzLm1hcCgpLmdldFNvdXJjZSgnZ2VvanNvbi1zZWFyY2gtYnVmZmVyLWRhdGEnKS5zZXREYXRhKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uKHJlc2V0X2ZlYXR1cmVzKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyLmZlYXR1cmVfY29sbGVjdGlvbih7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMubWFwKCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFwKCkuZ2V0U291cmNlKCdnZW9qc29uLXNlYXJjaC1idWZmZXItZGF0YScpLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmdldEZpbHRlckJ5VHlwZSgndGVybS1maWx0ZXItdHlwZScpLnJlbW92ZVRhZygnTWFwIEZpbHRlciBFbmFibGVkJyk7XG4gICAgICAgICAgICB0aGlzLmRyYXcuZGVsZXRlQWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEdlb21ldHJpZXMoW10pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHpvb21Ub0FsbEZlYXR1cmVzSGFuZGxlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5maXRUb0FnZ3JlZ2F0aW9uQm91bmRzKHRydWUpO1xuICAgIH0sXG5cbiAgICBmaXRUb0FnZ3JlZ2F0aW9uQm91bmRzOiBmdW5jdGlvbihmb3JjZUZpdEJvdW5kcykge1xuICAgICAgICB2YXIgYWdnID0gdGhpcy5zZWFyY2hBZ2dyZWdhdGlvbnMoKTtcbiAgICAgICAgdmFyIGFnZ0JvdW5kcztcbiAgICAgICAgaWYgKGFnZyAmJiBhZ2cuZ2VvX2FnZ3MuYm91bmRzLmJvdW5kcyAmJiB0aGlzLm1hcCgpKSB7XG4gICAgICAgICAgICBhZ2dCb3VuZHMgPSBhZ2cuZ2VvX2FnZ3MuYm91bmRzLmJvdW5kcztcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBhZ2dCb3VuZHMudG9wX2xlZnQubG9uLFxuICAgICAgICAgICAgICAgICAgICBhZ2dCb3VuZHMuYm90dG9tX3JpZ2h0LmxhdFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBhZ2dCb3VuZHMuYm90dG9tX3JpZ2h0LmxvbixcbiAgICAgICAgICAgICAgICAgICAgYWdnQm91bmRzLnRvcF9sZWZ0LmxhdFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB2YXIgbWF4Wm9vbSA9IGtvLnVud3JhcCh0aGlzLm1heFpvb20pO1xuICAgICAgICAgICAgbWF4Wm9vbSA9IG1heFpvb20gPiAxNyA/IDE3IDogbWF4Wm9vbTtcbiAgICAgICAgICAgIGZvcmNlRml0Qm91bmRzID0gZm9yY2VGaXRCb3VuZHMgPT0gdW5kZWZpbmVkID8gIXRoaXMucGFnZUxvYWRlZCA6IGZvcmNlRml0Qm91bmRzID09IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1hcEZpdEJvdW5kcyhib3VuZHMsIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA0NSxcbiAgICAgICAgICAgICAgICBtYXhab29tOiBtYXhab29tXG4gICAgICAgICAgICB9LCBmb3JjZUZpdEJvdW5kcyk7XG4gICAgICAgIH1cbiAgICB9LCAgXG59KTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3Rlcihjb21wb25lbnROYW1lLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IG1hcEZpbHRlclRlbXBsYXRlLFxufSk7XG4iXSwibmFtZXMiOlsiJCIsIl8iLCJrbyIsImFyY2hlcyIsIm1hcEZpbHRlclRlbXBsYXRlIiwiQmFzZUZpbHRlciIsIk1hcENvbXBvbmVudFZpZXdNb2RlbCIsImJpbkZlYXR1cmVDb2xsZWN0aW9uIiwibWFwU3R5bGVzIiwidHVyZiIsImdlb2hhc2giLCJnZW9qc29uRXh0ZW50IiwidXVpZCIsImdlb2pzb25oaW50IiwibWFwYm94IiwibWJkcmF3IiwiY29tcG9uZW50TmFtZSIsInZpZXdNb2RlbCIsImV4dGVuZCIsImluaXRpYWxpemUiLCJvcHRpb25zIiwic2VsZiIsImRlcGVuZGVuY2llc0xvYWRlZCIsIm9ic2VydmFibGUiLCJyZXN1bHRzQXV0b1pvb21FbmFibGVkIiwibWFwRmlsdGVyQXV0b1pvb20iLCJtYXBGaXRCb3VuZHMiLCJib3VuZHMiLCJmb3JjZSIsImxhc3RSZXN1bHRzQm91bmRzIiwibWFwIiwiZml0Qm91bmRzIiwibWFwYm94Z2wiLCJNYXBib3hEcmF3IiwibmFtZSIsInByb3RvdHlwZSIsImNhbGwiLCJzb3VyY2VzIiwibGF5ZXJzIiwic2VhcmNoIiwiYXBwbHkiLCJ1cGRhdGVMYXllcnMiLCJzdHlsZSIsImdldFN0eWxlIiwiZHJhdyIsImNvbmNhdCIsInN0eWxlcyIsInNldFN0eWxlIiwic2VhcmNoR2VvbWV0cmllcyIsIm9ic2VydmFibGVBcnJheSIsInNlYXJjaEFnZ3JlZ2F0aW9ucyIsInNlbGVjdGVkVG9vbCIsImdlb0pTT05TdHJpbmciLCJ1bmRlZmluZWQiLCJnZW9KU09ORXJyb3JzIiwicGFnZUxvYWRlZCIsIm1heEJ1ZmZlciIsIm1heEJ1ZmZlclVuaXRzIiwibWF4Wm9vbSIsIm1hcERlZmF1bHRNYXhab29tIiwiZmlsdGVyIiwiZmVhdHVyZV9jb2xsZWN0aW9uIiwiYnVmZmVyVW5pdHMiLCJ2YWwiLCJtYXBMaW5rRGF0YSIsInN1YnNjcmliZSIsImRhdGEiLCJ6b29tVG9HZW9KU09OIiwiYmlucyIsImdldEdlb0pTT05FcnJvcnMiLCJsZW5ndGgiLCJnZW9KU09OIiwiSlNPTiIsInBhcnNlIiwiZmVhdHVyZXMiLCJzbGljZSIsImV4dGVudCIsIkxuZ0xhdEJvdW5kcyIsInBhZGRpbmciLCJwYXJzZUludCIsImJ1ZmZlciIsInNldCIsImhpbnQiLCJlcnJvcnMiLCJwdXNoIiwiZmVhdHVyZSIsImJ1ZmZlcldpZHRoIiwicHJvcGVydGllcyIsIndpZHRoIiwiRXJyb3IiLCJfdW51c2VkIiwiYnVmZmVyVW5pdCIsInVuaXQiLCJfdW51c2VkMiIsImludmVydGVkIiwiX3VudXNlZDMiLCJmb3JFYWNoIiwiaXRlbSIsImxldmVsIiwic3BhdGlhbEZpbHRlclR5cGVzIiwidGl0bGUiLCJjbGFzcyIsImljb24iLCJkcmF3TW9kZSIsImFjdGl2ZSIsImRyYXdNb2RlcyIsInBsdWNrIiwic2VsZWN0ZWREcmF3VG9vbCIsInNlYXJjaEJ5RXh0ZW50IiwiY2hhbmdlTW9kZSIsImRyYXdfbW9kZSIsInNlYXJjaFJlc3VsdHMiLCJ0aW1lc3RhbXAiLCJ1cGRhdGVSZXN1bHRzIiwiZmlsdGVyQnlGZWF0dXJlR2VvbSIsImdlb21ldHJ5IiwidHlwZSIsInJlbW92ZUFsbCIsImRlbGV0ZUFsbCIsInVwZGF0ZUZpbHRlciIsInVwZGF0ZVNlYXJjaFJlc3VsdFBvaW50TGF5ZXIiLCJwb2ludFNvdXJjZSIsImdldFNvdXJjZSIsImFnZyIsInVud3JhcCIsIm1vdXNlb3Zlckluc3RhbmNlSWQiLCJlYWNoIiwicmVzdWx0cyIsInJlc3VsdCIsIl9zb3VyY2UiLCJwb2ludHMiLCJwb2ludCIsImxvbiIsImxhdCIsInJlc291cmNlaW5zdGFuY2VpZCIsIl9pZCIsImhpZ2hsaWdodCIsInBvaW50c0ZDIiwiZmVhdHVyZUNvbGxlY3Rpb24iLCJzZXREYXRhIiwidXBkYXRlU2VhcmNoUmVzdWx0c0xheWVycyIsImdlb2pzb25GQyIsImZpdFRvQWdncmVnYXRpb25Cb3VuZHMiLCJnZW9fYWdncyIsImdyaWQiLCJidWNrZXRzIiwiY2VsbCIsInB0IiwiZGVjb2RlIiwia2V5IiwiZG9jX2NvdW50IiwiYWdncmVnYXRlZCIsImNvbGxlY3QiLCJyZWR1Y2UiLCJpIiwiaWkiLCJhZ2dEYXRhIiwiYWdnU291cmNlIiwiaGFzaFNvdXJjZSIsInNlYXJjaEZpbHRlclZtcyIsInNldHVwRHJhdyIsInJlc3RvcmVTdGF0ZSIsImZpbHRlclVwZGF0ZWQiLCJjb21wdXRlZCIsInN0cmluZ2lmeSIsInRvSlMiLCJ1cGRhdGVRdWVyeSIsImlzT2JzZXJ2YWJsZSIsIm1vZGVzIiwic3RhdGljIiwidG9EaXNwbGF5RmVhdHVyZXMiLCJzdGF0ZSIsImdlb2pzb24iLCJkaXNwbGF5IiwiZGlzcGxheUNvbnRyb2xzRGVmYXVsdCIsImFkZENvbnRyb2wiLCJvbiIsImUiLCJnZXRBbGwiLCJpZCIsImRlbGV0ZSIsIm1vZGUiLCJjb250YWlucyIsImdldEJvdW5kcyIsImxsIiwiZ2V0U291dGhXZXN0IiwidG9BcnJheSIsInVsIiwiZ2V0Tm9ydGhXZXN0IiwidXIiLCJnZXROb3J0aEVhc3QiLCJsciIsImdldFNvdXRoRWFzdCIsImNvb3JkaW5hdGVzIiwiYm91bmRzRmVhdHVyZSIsImdlbmVyYXRlIiwidXNlTWF4QnVmZmVyIiwicmVzIiwibWF4IiwiZWRpdEdlb0pTT04iLCJ1cGRhdGVHZW9KU09OIiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJtYXBEYXRhIiwiZ2VvbWV0cmllcyIsImZjMSIsImZjMiIsImdlb20iLCJxdWVyeU9iaiIsInF1ZXJ5IiwiZ2V0RmlsdGVyQnlUeXBlIiwiaGFzVGFnIiwiYWRkVGFnIiwidG9KU09OIiwiaGFzU3BhdGlhbEZpbHRlciIsIm1hcFF1ZXJ5IiwiZGVmZXJyZWQiLCJoaXRzIiwiYWdncmVnYXRpb25zIiwiaW5uZXIiLCJzZWFyY2hfYnVmZmVyIiwiY2xlYXIiLCJyZXNldF9mZWF0dXJlcyIsInJlbW92ZVRhZyIsInpvb21Ub0FsbEZlYXR1cmVzSGFuZGxlciIsImZvcmNlRml0Qm91bmRzIiwiYWdnQm91bmRzIiwidG9wX2xlZnQiLCJib3R0b21fcmlnaHQiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ0ZW1wbGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9