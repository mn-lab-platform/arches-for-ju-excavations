"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[90293],{

/***/ 90293:
/*!********************************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/geojson-feature-collection.js + 1 modules ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ geojson_feature_collection)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/datatypes/geojson-feature-collection.htm
const geojson_feature_collection_namespaceObject = "templates/views/components/datatypes/geojson-feature-collection.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/color-picker.js
var color_picker = __webpack_require__(49119);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/mapbox-gl.js
var mapbox_gl = __webpack_require__(76206);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/codemirror.js
var codemirror = __webpack_require__(4425);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/key-events-click.js
var key_events_click = __webpack_require__(40513);
// EXTERNAL MODULE: ./node_modules/codemirror/mode/javascript/javascript.js
var javascript = __webpack_require__(16792);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/ckeditor.js
var ckeditor = __webpack_require__(82008);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/icon-selector.js + 1 modules
var icon_selector = __webpack_require__(37555);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/geojson-feature-collection.js












var geojson_feature_collection_name = 'geojson-feature-collection-datatype-config';
var viewModel = function viewModel(params) {
  var self = this;
  this.node = params;
  this.config = params.config;
  this.graph = params.graph;
  this.layer = params.layer;
  this.search = params.search;
  if (this.search) {
    var filter = params.filterValue();
    this.op = knockout_latest_default().observable(filter.op || '~');
    this.node = params.node;
    this.searchValue = knockout_latest_default().observable(filter.val || '');
    this.filterValue = knockout_latest_default().computed(function () {
      return {
        op: self.op(),
        val: self.searchValue()
      };
    }).extend({
      throttle: 750
    });
    params.filterValue(this.filterValue());
    this.filterValue.subscribe(function (val) {
      params.filterValue(val);
    });
  } else {
    var haloWeightValue = self.config.haloWeight();
    var outlineWeightValue = self.config.outlineWeight();
    var weightValue = self.config.weight();
    var haloRadiusValue = self.config.haloRadius();
    var radiusValue = self.config.radius();
    var clusterDistanceValue = self.config.clusterDistance();
    var clusterMaxZoomValue = self.config.clusterMaxZoom();
    var clusterMinPointsValue = self.config.clusterMinPoints();
    var simplificationValue = self.config.simplification();
    if (this.layer) {
      this.permissions = params.permissions;
      this.iconFilter = knockout_latest_default().observable('');
      this.icons = knockout_latest_default().computed(function () {
        return underscore_min_default().filter(params.icons, function (icon) {
          return icon.name.indexOf(self.iconFilter()) >= 0;
        });
      });
      if (!this.config.layerIcon()) {
        this.config.layerIcon(this.layer.icon);
      }
      this.count = params.mapSource.count;
      this.loading = params.loading || knockout_latest_default().observable(false);
      var overlays = JSON.parse(this.layer.layer_definitions);
      var getDisplayLayers = function getDisplayLayers() {
        var displayLayers = overlays;
        if (self.config.advancedStyling()) {
          var advancedStyle = self.config.advancedStyle();
          try {
            displayLayers = JSON.parse(advancedStyle);
          } catch (e) {
            displayLayers = [];
          }
        }
        if (params.mapSource.count > 0) {
          underscore_min_default().each(displayLayers, function (layer) {
            layer["source-layer"] = params.nodeid;
          });
        }
        return displayLayers;
      };
      if (params.mapSource.count === 0) {
        underscore_min_default().each(overlays, function (overlay) {
          delete overlay["source-layer"];
        });
      }
      this.selectedBasemapName = knockout_latest_default().observable('');
      var mapLayers = jquery_min_default().extend(true, {}, arches["default"].mapLayers);
      this.basemaps = underscore_min_default().filter(mapLayers, function (layer) {
        return !layer.isoverlay;
      });
      this.basemaps.forEach(function (basemap) {
        basemap.select = function () {
          self.selectedBasemapName(basemap.name);
        };
      });
      var defaultBasemap = underscore_min_default().find(this.basemaps, function (basemap) {
        return basemap.addtomap;
      });
      if (!defaultBasemap) {
        defaultBasemap = this.basemaps[0];
      }
      if (defaultBasemap) {
        this.selectedBasemapName(defaultBasemap.name);
      }
      var getBasemapLayers = function getBasemapLayers() {
        return underscore_min_default().filter(self.basemaps, function (layer) {
          return layer.name === self.selectedBasemapName();
        }).reduce(function (layers, layer) {
          return layers.concat(layer.layer_definitions);
        }, []);
      };
      var sources = jquery_min_default().extend(true, {}, arches["default"].mapSources);
      sources[params.mapSource.name] = JSON.parse(params.mapSource.source);
      underscore_min_default().each(sources, function (sourceConfig, name) {
        if (sourceConfig.tiles) {
          sourceConfig.tiles.forEach(function (url, i) {
            if (url.startsWith('/')) {
              sourceConfig.tiles[i] = window.location.origin + url;
            }
          });
        }
      });
      var displayLayers = getDisplayLayers();
      var basemapLayers = getBasemapLayers();
      this.mapStyle = {
        "version": 8,
        "name": "Basic",
        "metadata": {
          "mapbox:autocomposite": true,
          "mapbox:type": "template"
        },
        "sources": sources,
        "sprite": "mapbox://sprites/mapbox/basic-v9",
        "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        "layers": basemapLayers.concat(displayLayers)
      };
      this.zoom = knockout_latest_default().observable(arches["default"].mapDefaultZoom);
      this.minZoom = knockout_latest_default().observable(arches["default"].mapDefaultMinZoom);
      this.maxZoom = knockout_latest_default().observable(arches["default"].mapDefaultMaxZoom);
      this.centerX = knockout_latest_default().observable(arches["default"].mapDefaultX);
      this.centerY = knockout_latest_default().observable(arches["default"].mapDefaultY);
      this.pitch = knockout_latest_default().observable(0);
      this.bearing = knockout_latest_default().observable(0);
      this.serviceURL = window.location.origin + arches["default"].urls.mvt(params.nodeid);
      this.map = null;
      this.setupMap = function (map) {
        this.map = map;
        if (this.node.layer.bounds) {
          var bounds = [[this.node.layer.bounds.top_left.lon, this.node.layer.bounds.bottom_right.lat], [this.node.layer.bounds.bottom_right.lon, this.node.layer.bounds.top_left.lat]];
          underscore_min_default().defer(function () {
            map.fitBounds(bounds, {
              padding: 20
            });
          }, 1);
        }
      };
      var updateMapStyle = function updateMapStyle() {
        underscore_min_default().each(overlays, function (layer) {
          switch (layer.id) {
            case "resources-fill-" + params.nodeid:
              layer.paint["fill-color"] = self.config.fillColor();
              break;
            case "resources-line-halo-" + params.nodeid:
              haloWeightValue = self.config.haloWeight();
              if (haloWeightValue === "") {
                haloWeightValue = 4;
              } else {
                haloWeightValue = Number(haloWeightValue);
              }
              layer.paint["line-width"] = haloWeightValue;
              layer.paint["line-color"] = self.config.lineHaloColor();
              break;
            case "resources-line-" + params.nodeid:
              weightValue = self.config.weight();
              if (weightValue === "") {
                weightValue = 4;
              } else {
                weightValue = Number(weightValue);
              }
              layer.paint["line-width"] = weightValue;
              layer.paint["line-color"] = self.config.lineColor();
              break;
            case "resources-poly-outline-" + params.nodeid:
              outlineWeightValue = self.config.outlineWeight();
              if (outlineWeightValue === "") {
                outlineWeightValue = 2;
              } else {
                outlineWeightValue = Number(outlineWeightValue);
              }
              layer.paint["line-width"] = outlineWeightValue;
              layer.paint["line-color"] = self.config.outlineColor();
              break;
            case "resources-point-halo-" + params.nodeid:
              haloRadiusValue = self.config.haloRadius();
              if (haloRadiusValue === "") {
                haloRadiusValue = 4;
              } else {
                haloRadiusValue = Number(haloRadiusValue);
              }
              layer.paint["circle-radius"] = haloRadiusValue;
            case "resources-cluster-point-halo-" + params.nodeid:
              layer.paint["circle-color"] = self.config.pointHaloColor();
              break;
            case "resources-point-" + params.nodeid:
              radiusValue = self.config.radius();
              if (radiusValue === "") {
                radiusValue = 2;
              } else {
                radiusValue = Number(radiusValue);
              }
              layer.paint["circle-radius"] = radiusValue;
            case "resources-cluster-point-" + params.nodeid:
              clusterDistanceValue = self.config.clusterDistance();
              if (clusterDistanceValue === "") {
                clusterDistanceValue = 20;
              } else {
                clusterDistanceValue = Number(clusterDistanceValue);
              }
              clusterMaxZoomValue = self.config.clusterMaxZoom();
              if (clusterMaxZoomValue === "") {
                clusterMaxZoomValue = 5;
              } else {
                clusterMaxZoomValue = Number(clusterMaxZoomValue);
              }
              clusterMinPointsValue = self.config.clusterMinPoints();
              if (clusterMinPointsValue === "") {
                clusterMinPointsValue = 3;
              } else {
                clusterMinPointsValue = Number(clusterMinPointsValue);
              }
              simplificationValue = self.config.simplification();
              if (simplificationValue === "") {
                simplificationValue = 0.3;
              } else {
                simplificationValue = Number(simplificationValue);
              }
              break;
            default:
          }
        });
        var displayLayers = getDisplayLayers();
        var basemapLayers = getBasemapLayers();
        self.mapStyle.layers = basemapLayers.concat(displayLayers);
        self.map.setStyle(self.mapStyle);
      };
      this.node.json.subscribe(updateMapStyle);
      this.selectedBasemapName.subscribe(updateMapStyle);
      this.config.advancedStyling.subscribe(function (value) {
        if (value && !self.config.advancedStyle()) {
          self.config.advancedStyle(JSON.stringify(overlays, null, '\t'));
        }
      });
      this.saveNode = function () {
        // do saving of config values at end to avoid double save button issue
        self.config.haloWeight(haloWeightValue);
        self.config.weight(weightValue);
        self.config.outlineWeight(outlineWeightValue);
        self.config.haloRadius(haloRadiusValue);
        self.config.radius(radiusValue);
        self.config.clusterDistance(clusterDistanceValue);
        self.config.clusterMaxZoom(clusterMaxZoomValue);
        self.config.clusterMinPoints(clusterMinPointsValue);
        self.config.simplification(simplificationValue);
        self.loading(true);
        self.node.save(function () {
          self.loading(false);
        });
      };
    }
  }
};
knockout_latest_default().components.register(geojson_feature_collection_name, {
  viewModel: viewModel,
  template: geojson_feature_collection_namespaceObject
});
/* harmony default export */ const geojson_feature_collection = (geojson_feature_collection_name);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNTdmOTQ2YTJkNjVjMGQyMjRlOTIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0k7QUFDRDtBQUNFO0FBQytGO0FBQzVGO0FBQ0g7QUFDQztBQUNNO0FBQ1k7QUFDcEI7QUFDYTtBQUd4QyxJQUFJSywrQkFBSSxHQUFHLDRDQUE0QztBQUN2RCxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQy9CLElBQUlDLElBQUksR0FBRyxJQUFJO0VBRWYsSUFBSSxDQUFDQyxJQUFJLEdBQUdGLE1BQU07RUFDbEIsSUFBSSxDQUFDRyxNQUFNLEdBQUdILE1BQU0sQ0FBQ0csTUFBTTtFQUMzQixJQUFJLENBQUNDLEtBQUssR0FBR0osTUFBTSxDQUFDSSxLQUFLO0VBQ3pCLElBQUksQ0FBQ0MsS0FBSyxHQUFHTCxNQUFNLENBQUNLLEtBQUs7RUFDekIsSUFBSSxDQUFDQyxNQUFNLEdBQUdOLE1BQU0sQ0FBQ00sTUFBTTtFQUUzQixJQUFJLElBQUksQ0FBQ0EsTUFBTSxFQUFFO0lBQ2IsSUFBSUMsTUFBTSxHQUFHUCxNQUFNLENBQUNRLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQ0MsRUFBRSxHQUFHZCxvQ0FBYSxDQUFDWSxNQUFNLENBQUNFLEVBQUUsSUFBSSxHQUFHLENBQUM7SUFDekMsSUFBSSxDQUFDUCxJQUFJLEdBQUdGLE1BQU0sQ0FBQ0UsSUFBSTtJQUN2QixJQUFJLENBQUNTLFdBQVcsR0FBR2hCLG9DQUFhLENBQUNZLE1BQU0sQ0FBQ0ssR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUNsRCxJQUFJLENBQUNKLFdBQVcsR0FBR2Isa0NBQVcsQ0FBQyxZQUFXO01BQ3RDLE9BQU87UUFDSGMsRUFBRSxFQUFFUixJQUFJLENBQUNRLEVBQUUsQ0FBQyxDQUFDO1FBQ2JHLEdBQUcsRUFBRVgsSUFBSSxDQUFDVSxXQUFXLENBQUM7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QUMvQnhCLElBQUksQ0FBQ0UsTUFBTSxDQUFDeUIsZUFBZSxDQUFDRCxvQkFBb0IsQ0FBQztRQUNqRDFCLElBQUksQ0FBQ0UsTUFBTSxDQUFDMkIsY0FBYyxDQUFDRCxtQkFBbUIsQ0FBQztRQUMvQzVCLElBQUksQ0FBQ0UsTUFBTSxDQUFDNkIsZ0JBQWdCLENBQUNELHFCQUFxQixDQUFDO1FBQ25EOUIsSUFBSSxDQUFDRSxNQUFNLENBQUMrQixjQUFjLENBQUNELG1CQUFtQixDQUFDO1FBQy9DaEMsSUFBSSxDQUFDMEMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNsQjFDLElBQUksQ0FBQ0MsSUFBSSxDQUFDd0gsSUFBSSxDQUFDLFlBQVc7VUFDdEJ6SCxJQUFJLENBQUMwQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztNQUNOLENBQUM7SUFDTDtFQUNKO0FBQ0osQ0FBQztBQUVEaEQsb0NBQWEsQ0FBQ2lJLFFBQVEsQ0FBQzlILCtCQUFJLEVBQUU7RUFDekJDLFNBQVMsRUFBRUEsU0FBUztFQUNwQjhILFFBQVEsRUFBRWhJLDBDQUF3Q0E7QUFDdEQsQ0FBQyxDQUFDO0FBRUYsaUVBQWVDLCtCQUFJLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL2RhdGF0eXBlcy9nZW9qc29uLWZlYXR1cmUtY29sbGVjdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IGdlb2pzb25GZWF0dXJlQ29sbGVjdGlvbkRhdGF0eXBlVGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvZGF0YXR5cGVzL2dlb2pzb24tZmVhdHVyZS1jb2xsZWN0aW9uLmh0bSc7XG5pbXBvcnQgJ2JpbmRpbmdzL2NvbG9yLXBpY2tlcic7XG5pbXBvcnQgJ2JpbmRpbmdzL21hcGJveC1nbCc7XG5pbXBvcnQgJ2JpbmRpbmdzL2NvZGVtaXJyb3InO1xuaW1wb3J0ICdiaW5kaW5ncy9rZXktZXZlbnRzLWNsaWNrJztcbmltcG9ydCAnY29kZW1pcnJvci9tb2RlL2phdmFzY3JpcHQvamF2YXNjcmlwdCc7XG5pbXBvcnQgJ2JpbmRpbmdzL2NrZWRpdG9yJztcbmltcG9ydCAndmlld3MvY29tcG9uZW50cy9pY29uLXNlbGVjdG9yJztcblxuXG52YXIgbmFtZSA9ICdnZW9qc29uLWZlYXR1cmUtY29sbGVjdGlvbi1kYXRhdHlwZS1jb25maWcnO1xuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBcbiAgICB0aGlzLm5vZGUgPSBwYXJhbXM7XG4gICAgdGhpcy5jb25maWcgPSBwYXJhbXMuY29uZmlnO1xuICAgIHRoaXMuZ3JhcGggPSBwYXJhbXMuZ3JhcGg7XG4gICAgdGhpcy5sYXllciA9IHBhcmFtcy5sYXllcjtcbiAgICB0aGlzLnNlYXJjaCA9IHBhcmFtcy5zZWFyY2g7XG5cbiAgICBpZiAodGhpcy5zZWFyY2gpIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IHBhcmFtcy5maWx0ZXJWYWx1ZSgpO1xuICAgICAgICB0aGlzLm9wID0ga28ub2JzZXJ2YWJsZShmaWx0ZXIub3AgfHwgJ34nKTtcbiAgICAgICAgdGhpcy5ub2RlID0gcGFyYW1zLm5vZGU7XG4gICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSBrby5vYnNlcnZhYmxlKGZpbHRlci52YWwgfHwgJycpO1xuICAgICAgICB0aGlzLmZpbHRlclZhbHVlID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9wOiBzZWxmLm9wKCksXG4gICAgICAgICAgICAgICAgdmFsOiBzZWxmLnNlYXJjaFZhbHVlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pLmV4dGVuZCh7IHRocm90dGxlOiA3NTAgfSk7XG4gICAgICAgIHBhcmFtcy5maWx0ZXJWYWx1ZSh0aGlzLmZpbHRlclZhbHVlKCkpO1xuICAgICAgICB0aGlzLmZpbHRlclZhbHVlLnN1YnNjcmliZShmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHBhcmFtcy5maWx0ZXJWYWx1ZSh2YWwpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaGFsb1dlaWdodFZhbHVlID0gc2VsZi5jb25maWcuaGFsb1dlaWdodCgpO1xuICAgICAgICBsZXQgb3V0bGluZVdlaWdodFZhbHVlID0gc2VsZi5jb25maWcub3V0bGluZVdlaWdodCgpO1xuICAgICAgICBsZXQgd2VpZ2h0VmFsdWUgPSBzZWxmLmNvbmZpZy53ZWlnaHQoKTtcbiAgICAgICAgbGV0IGhhbG9SYWRpdXNWYWx1ZSA9IHNlbGYuY29uZmlnLmhhbG9SYWRpdXMoKTtcbiAgICAgICAgbGV0IHJhZGl1c1ZhbHVlID0gc2VsZi5jb25maWcucmFkaXVzKCk7XG4gICAgICAgIGxldCBjbHVzdGVyRGlzdGFuY2VWYWx1ZSA9IHNlbGYuY29uZmlnLmNsdXN0ZXJEaXN0YW5jZSgpO1xuICAgICAgICBsZXQgY2x1c3Rlck1heFpvb21WYWx1ZSA9IHNlbGYuY29uZmlnLmNsdXN0ZXJNYXhab29tKCk7XG4gICAgICAgIGxldCBjbHVzdGVyTWluUG9pbnRzVmFsdWUgPSBzZWxmLmNvbmZpZy5jbHVzdGVyTWluUG9pbnRzKCk7XG4gICAgICAgIGxldCBzaW1wbGlmaWNhdGlvblZhbHVlID0gc2VsZi5jb25maWcuc2ltcGxpZmljYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMubGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucGVybWlzc2lvbnMgPSBwYXJhbXMucGVybWlzc2lvbnM7XG4gICAgICAgICAgICB0aGlzLmljb25GaWx0ZXIgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICAgICAgICAgIHRoaXMuaWNvbnMgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIocGFyYW1zLmljb25zLCBmdW5jdGlvbihpY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpY29uLm5hbWUuaW5kZXhPZihzZWxmLmljb25GaWx0ZXIoKSkgPj0gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5sYXllckljb24oKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcubGF5ZXJJY29uKHRoaXMubGF5ZXIuaWNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gcGFyYW1zLm1hcFNvdXJjZS5jb3VudDtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHBhcmFtcy5sb2FkaW5nIHx8IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICAgICAgdmFyIG92ZXJsYXlzID0gSlNPTi5wYXJzZSh0aGlzLmxheWVyLmxheWVyX2RlZmluaXRpb25zKTtcbiAgICAgICAgICAgIHZhciBnZXREaXNwbGF5TGF5ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3BsYXlMYXllcnMgPSBvdmVybGF5cztcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuYWR2YW5jZWRTdHlsaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFkdmFuY2VkU3R5bGUgPSBzZWxmLmNvbmZpZy5hZHZhbmNlZFN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TGF5ZXJzID0gSlNPTi5wYXJzZShhZHZhbmNlZFN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheUxheWVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubWFwU291cmNlLmNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2goZGlzcGxheUxheWVycywgZnVuY3Rpb24obGF5ZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJbXCJzb3VyY2UtbGF5ZXJcIl0gPSBwYXJhbXMubm9kZWlkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BsYXlMYXllcnM7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5tYXBTb3VyY2UuY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBfLmVhY2gob3ZlcmxheXMsIGZ1bmN0aW9uKG92ZXJsYXkpe1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3ZlcmxheVtcInNvdXJjZS1sYXllclwiXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRCYXNlbWFwTmFtZSA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgICAgICAgICAgdmFyIG1hcExheWVycyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBhcmNoZXMubWFwTGF5ZXJzKTtcbiAgICAgICAgICAgIHRoaXMuYmFzZW1hcHMgPSBfLmZpbHRlcihtYXBMYXllcnMsIGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFsYXllci5pc292ZXJsYXk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYmFzZW1hcHMuZm9yRWFjaChmdW5jdGlvbihiYXNlbWFwKSB7XG4gICAgICAgICAgICAgICAgYmFzZW1hcC5zZWxlY3QgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkQmFzZW1hcE5hbWUoYmFzZW1hcC5uYW1lKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdEJhc2VtYXAgPSBfLmZpbmQodGhpcy5iYXNlbWFwcywgZnVuY3Rpb24oYmFzZW1hcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlbWFwLmFkZHRvbWFwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWRlZmF1bHRCYXNlbWFwKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdEJhc2VtYXAgPSB0aGlzLmJhc2VtYXBzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlZmF1bHRCYXNlbWFwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEJhc2VtYXBOYW1lKGRlZmF1bHRCYXNlbWFwLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGdldEJhc2VtYXBMYXllcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoc2VsZi5iYXNlbWFwcywgZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxheWVyLm5hbWUgPT09IHNlbGYuc2VsZWN0ZWRCYXNlbWFwTmFtZSgpO1xuICAgICAgICAgICAgICAgIH0pLnJlZHVjZShmdW5jdGlvbihsYXllcnMsIGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsYXllcnMuY29uY2F0KGxheWVyLmxheWVyX2RlZmluaXRpb25zKTtcbiAgICAgICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHNvdXJjZXMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgYXJjaGVzLm1hcFNvdXJjZXMpO1xuICAgICAgICAgICAgc291cmNlc1twYXJhbXMubWFwU291cmNlLm5hbWVdID0gSlNPTi5wYXJzZShwYXJhbXMubWFwU291cmNlLnNvdXJjZSk7XG4gICAgICAgICAgICBfLmVhY2goc291cmNlcywgZnVuY3Rpb24oc291cmNlQ29uZmlnLCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZUNvbmZpZy50aWxlcykge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VDb25maWcudGlsZXMuZm9yRWFjaChmdW5jdGlvbih1cmwsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlQ29uZmlnLnRpbGVzW2ldID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBkaXNwbGF5TGF5ZXJzID0gZ2V0RGlzcGxheUxheWVycygpO1xuICAgICAgICAgICAgdmFyIGJhc2VtYXBMYXllcnMgPSBnZXRCYXNlbWFwTGF5ZXJzKCk7XG4gICAgICAgICAgICB0aGlzLm1hcFN0eWxlID0ge1xuICAgICAgICAgICAgICAgIFwidmVyc2lvblwiOiA4LFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkJhc2ljXCIsXG4gICAgICAgICAgICAgICAgXCJtZXRhZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwibWFwYm94OmF1dG9jb21wb3NpdGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgXCJtYXBib3g6dHlwZVwiOiBcInRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwic291cmNlc1wiOiBzb3VyY2VzLFxuICAgICAgICAgICAgICAgIFwic3ByaXRlXCI6IFwibWFwYm94Oi8vc3ByaXRlcy9tYXBib3gvYmFzaWMtdjlcIixcbiAgICAgICAgICAgICAgICBcImdseXBoc1wiOiBcIm1hcGJveDovL2ZvbnRzL21hcGJveC97Zm9udHN0YWNrfS97cmFuZ2V9LnBiZlwiLFxuICAgICAgICAgICAgICAgIFwibGF5ZXJzXCI6IGJhc2VtYXBMYXllcnMuY29uY2F0KGRpc3BsYXlMYXllcnMpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy56b29tID0ga28ub2JzZXJ2YWJsZShhcmNoZXMubWFwRGVmYXVsdFpvb20pO1xuICAgICAgICAgICAgdGhpcy5taW5ab29tID0ga28ub2JzZXJ2YWJsZShhcmNoZXMubWFwRGVmYXVsdE1pblpvb20pO1xuICAgICAgICAgICAgdGhpcy5tYXhab29tID0ga28ub2JzZXJ2YWJsZShhcmNoZXMubWFwRGVmYXVsdE1heFpvb20pO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJYID0ga28ub2JzZXJ2YWJsZShhcmNoZXMubWFwRGVmYXVsdFgpO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJZID0ga28ub2JzZXJ2YWJsZShhcmNoZXMubWFwRGVmYXVsdFkpO1xuICAgICAgICAgICAgdGhpcy5waXRjaCA9IGtvLm9ic2VydmFibGUoMCk7XG4gICAgICAgICAgICB0aGlzLmJlYXJpbmcgPSBrby5vYnNlcnZhYmxlKDApO1xuXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VVUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICtcbiAgICAgICAgICAgICAgICBhcmNoZXMudXJscy5tdnQocGFyYW1zLm5vZGVpZCk7XG5cbiAgICAgICAgICAgIHRoaXMubWFwID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBNYXAgPSBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmxheWVyLmJvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm91bmRzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5sYXllci5ib3VuZHMudG9wX2xlZnQubG9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5sYXllci5ib3VuZHMuYm90dG9tX3JpZ2h0LmxhdFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUubGF5ZXIuYm91bmRzLmJvdHRvbV9yaWdodC5sb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmxheWVyLmJvdW5kcy50b3BfbGVmdC5sYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgdXBkYXRlTWFwU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2gob3ZlcmxheXMsIGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobGF5ZXIuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlc291cmNlcy1maWxsLVwiICsgcGFyYW1zLm5vZGVpZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnBhaW50W1wiZmlsbC1jb2xvclwiXSA9IHNlbGYuY29uZmlnLmZpbGxDb2xvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlc291cmNlcy1saW5lLWhhbG8tXCIgKyBwYXJhbXMubm9kZWlkOlxuICAgICAgICAgICAgICAgICAgICAgICAgaGFsb1dlaWdodFZhbHVlID0gc2VsZi5jb25maWcuaGFsb1dlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbG9XZWlnaHRWYWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbG9XZWlnaHRWYWx1ZSA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChoYWxvV2VpZ2h0VmFsdWUgPSBOdW1iZXIoaGFsb1dlaWdodFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllci5wYWludFtcImxpbmUtd2lkdGhcIl0gPSBoYWxvV2VpZ2h0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllci5wYWludFtcImxpbmUtY29sb3JcIl0gPSBzZWxmLmNvbmZpZy5saW5lSGFsb0NvbG9yKCk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNvdXJjZXMtbGluZS1cIiArIHBhcmFtcy5ub2RlaWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHRWYWx1ZSA9IHNlbGYuY29uZmlnLndlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdlaWdodFZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0VmFsdWUgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2VpZ2h0VmFsdWUgPSBOdW1iZXIod2VpZ2h0VmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnBhaW50W1wibGluZS13aWR0aFwiXSA9IHdlaWdodFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIucGFpbnRbXCJsaW5lLWNvbG9yXCJdID0gc2VsZi5jb25maWcubGluZUNvbG9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVzb3VyY2VzLXBvbHktb3V0bGluZS1cIiArIHBhcmFtcy5ub2RlaWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRsaW5lV2VpZ2h0VmFsdWUgPSBzZWxmLmNvbmZpZy5vdXRsaW5lV2VpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0bGluZVdlaWdodFZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZVdlaWdodFZhbHVlID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG91dGxpbmVXZWlnaHRWYWx1ZSA9IE51bWJlcihvdXRsaW5lV2VpZ2h0VmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnBhaW50W1wibGluZS13aWR0aFwiXSA9IG91dGxpbmVXZWlnaHRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnBhaW50W1wibGluZS1jb2xvclwiXSA9IHNlbGYuY29uZmlnLm91dGxpbmVDb2xvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlc291cmNlcy1wb2ludC1oYWxvLVwiICsgcGFyYW1zLm5vZGVpZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbG9SYWRpdXNWYWx1ZSA9IHNlbGYuY29uZmlnLmhhbG9SYWRpdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYWxvUmFkaXVzVmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYWxvUmFkaXVzVmFsdWUgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaGFsb1JhZGl1c1ZhbHVlID0gTnVtYmVyKGhhbG9SYWRpdXNWYWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnBhaW50W1wiY2lyY2xlLXJhZGl1c1wiXSA9IGhhbG9SYWRpdXNWYWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVzb3VyY2VzLWNsdXN0ZXItcG9pbnQtaGFsby1cIiArIHBhcmFtcy5ub2RlaWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllci5wYWludFtcImNpcmNsZS1jb2xvclwiXSA9IHNlbGYuY29uZmlnLnBvaW50SGFsb0NvbG9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVzb3VyY2VzLXBvaW50LVwiICsgcGFyYW1zLm5vZGVpZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1c1ZhbHVlID0gc2VsZi5jb25maWcucmFkaXVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkaXVzVmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpdXNWYWx1ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyYWRpdXNWYWx1ZSA9IE51bWJlcihyYWRpdXNWYWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIucGFpbnRbXCJjaXJjbGUtcmFkaXVzXCJdID0gcmFkaXVzVmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlc291cmNlcy1jbHVzdGVyLXBvaW50LVwiICsgcGFyYW1zLm5vZGVpZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJEaXN0YW5jZVZhbHVlID0gc2VsZi5jb25maWcuY2x1c3RlckRpc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2x1c3RlckRpc3RhbmNlVmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyRGlzdGFuY2VWYWx1ZSA9IDIwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2x1c3RlckRpc3RhbmNlVmFsdWUgPSBOdW1iZXIoY2x1c3RlckRpc3RhbmNlVmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJNYXhab29tVmFsdWUgPSBzZWxmLmNvbmZpZy5jbHVzdGVyTWF4Wm9vbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsdXN0ZXJNYXhab29tVmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyTWF4Wm9vbVZhbHVlID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsdXN0ZXJNYXhab29tVmFsdWUgPSBOdW1iZXIoY2x1c3Rlck1heFpvb21WYWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3Rlck1pblBvaW50c1ZhbHVlID0gc2VsZi5jb25maWcuY2x1c3Rlck1pblBvaW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsdXN0ZXJNaW5Qb2ludHNWYWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJNaW5Qb2ludHNWYWx1ZSA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbHVzdGVyTWluUG9pbnRzVmFsdWUgPSBOdW1iZXIoY2x1c3Rlck1pblBvaW50c1ZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW1wbGlmaWNhdGlvblZhbHVlID0gc2VsZi5jb25maWcuc2ltcGxpZmljYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaW1wbGlmaWNhdGlvblZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2ltcGxpZmljYXRpb25WYWx1ZSA9IDAuMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNpbXBsaWZpY2F0aW9uVmFsdWUgPSBOdW1iZXIoc2ltcGxpZmljYXRpb25WYWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBkaXNwbGF5TGF5ZXJzID0gZ2V0RGlzcGxheUxheWVycygpO1xuICAgICAgICAgICAgICAgIHZhciBiYXNlbWFwTGF5ZXJzID0gZ2V0QmFzZW1hcExheWVycygpO1xuICAgICAgICAgICAgICAgIHNlbGYubWFwU3R5bGUubGF5ZXJzID0gYmFzZW1hcExheWVycy5jb25jYXQoZGlzcGxheUxheWVycyk7XG4gICAgICAgICAgICAgICAgc2VsZi5tYXAuc2V0U3R5bGUoc2VsZi5tYXBTdHlsZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuanNvbi5zdWJzY3JpYmUodXBkYXRlTWFwU3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEJhc2VtYXBOYW1lLnN1YnNjcmliZSh1cGRhdGVNYXBTdHlsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFkdmFuY2VkU3R5bGluZy5zdWJzY3JpYmUoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgJiYgIXNlbGYuY29uZmlnLmFkdmFuY2VkU3R5bGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5hZHZhbmNlZFN0eWxlKEpTT04uc3RyaW5naWZ5KG92ZXJsYXlzLCBudWxsLCAnXFx0JykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNhdmVOb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gZG8gc2F2aW5nIG9mIGNvbmZpZyB2YWx1ZXMgYXQgZW5kIHRvIGF2b2lkIGRvdWJsZSBzYXZlIGJ1dHRvbiBpc3N1ZVxuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLmhhbG9XZWlnaHQoaGFsb1dlaWdodFZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy53ZWlnaHQod2VpZ2h0VmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm91dGxpbmVXZWlnaHQob3V0bGluZVdlaWdodFZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5oYWxvUmFkaXVzKGhhbG9SYWRpdXNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcucmFkaXVzKHJhZGl1c1ZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5jbHVzdGVyRGlzdGFuY2UoY2x1c3RlckRpc3RhbmNlVmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLmNsdXN0ZXJNYXhab29tKGNsdXN0ZXJNYXhab29tVmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLmNsdXN0ZXJNaW5Qb2ludHMoY2x1c3Rlck1pblBvaW50c1ZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5zaW1wbGlmaWNhdGlvbihzaW1wbGlmaWNhdGlvblZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLnNhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufTtcblxua28uY29tcG9uZW50cy5yZWdpc3RlcihuYW1lLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IGdlb2pzb25GZWF0dXJlQ29sbGVjdGlvbkRhdGF0eXBlVGVtcGxhdGUsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbmFtZTtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwiYXJjaGVzIiwiZ2VvanNvbkZlYXR1cmVDb2xsZWN0aW9uRGF0YXR5cGVUZW1wbGF0ZSIsIm5hbWUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwibm9kZSIsImNvbmZpZyIsImdyYXBoIiwibGF5ZXIiLCJzZWFyY2giLCJmaWx0ZXIiLCJmaWx0ZXJWYWx1ZSIsIm9wIiwib2JzZXJ2YWJsZSIsInNlYXJjaFZhbHVlIiwidmFsIiwiY29tcHV0ZWQiLCJleHRlbmQiLCJ0aHJvdHRsZSIsInN1YnNjcmliZSIsImhhbG9XZWlnaHRWYWx1ZSIsImhhbG9XZWlnaHQiLCJvdXRsaW5lV2VpZ2h0VmFsdWUiLCJvdXRsaW5lV2VpZ2h0Iiwid2VpZ2h0VmFsdWUiLCJ3ZWlnaHQiLCJoYWxvUmFkaXVzVmFsdWUiLCJoYWxvUmFkaXVzIiwicmFkaXVzVmFsdWUiLCJyYWRpdXMiLCJjbHVzdGVyRGlzdGFuY2VWYWx1ZSIsImNsdXN0ZXJEaXN0YW5jZSIsImNsdXN0ZXJNYXhab29tVmFsdWUiLCJjbHVzdGVyTWF4Wm9vbSIsImNsdXN0ZXJNaW5Qb2ludHNWYWx1ZSIsImNsdXN0ZXJNaW5Qb2ludHMiLCJzaW1wbGlmaWNhdGlvblZhbHVlIiwic2ltcGxpZmljYXRpb24iLCJwZXJtaXNzaW9ucyIsImljb25GaWx0ZXIiLCJpY29ucyIsImljb24iLCJpbmRleE9mIiwibGF5ZXJJY29uIiwiY291bnQiLCJtYXBTb3VyY2UiLCJsb2FkaW5nIiwib3ZlcmxheXMiLCJKU09OIiwicGFyc2UiLCJsYXllcl9kZWZpbml0aW9ucyIsImdldERpc3BsYXlMYXllcnMiLCJkaXNwbGF5TGF5ZXJzIiwiYWR2YW5jZWRTdHlsaW5nIiwiYWR2YW5jZWRTdHlsZSIsImUiLCJlYWNoIiwibm9kZWlkIiwib3ZlcmxheSIsInNlbGVjdGVkQmFzZW1hcE5hbWUiLCJtYXBMYXllcnMiLCJiYXNlbWFwcyIsImlzb3ZlcmxheSIsImZvckVhY2giLCJiYXNlbWFwIiwic2VsZWN0IiwiZGVmYXVsdEJhc2VtYXAiLCJmaW5kIiwiYWRkdG9tYXAiLCJnZXRCYXNlbWFwTGF5ZXJzIiwicmVkdWNlIiwibGF5ZXJzIiwiY29uY2F0Iiwic291cmNlcyIsIm1hcFNvdXJjZXMiLCJzb3VyY2UiLCJzb3VyY2VDb25maWciLCJ0aWxlcyIsInVybCIsImkiLCJzdGFydHNXaXRoIiwid2luZG93IiwibG9jYXRpb24iLCJvcmlnaW4iLCJiYXNlbWFwTGF5ZXJzIiwibWFwU3R5bGUiLCJ6b29tIiwibWFwRGVmYXVsdFpvb20iLCJtaW5ab29tIiwibWFwRGVmYXVsdE1pblpvb20iLCJtYXhab29tIiwibWFwRGVmYXVsdE1heFpvb20iLCJjZW50ZXJYIiwibWFwRGVmYXVsdFgiLCJjZW50ZXJZIiwibWFwRGVmYXVsdFkiLCJwaXRjaCIsImJlYXJpbmciLCJzZXJ2aWNlVVJMIiwidXJscyIsIm12dCIsIm1hcCIsInNldHVwTWFwIiwiYm91bmRzIiwidG9wX2xlZnQiLCJsb24iLCJib3R0b21fcmlnaHQiLCJsYXQiLCJkZWZlciIsImZpdEJvdW5kcyIsInBhZGRpbmciLCJ1cGRhdGVNYXBTdHlsZSIsImlkIiwicGFpbnQiLCJmaWxsQ29sb3IiLCJOdW1iZXIiLCJsaW5lSGFsb0NvbG9yIiwibGluZUNvbG9yIiwib3V0bGluZUNvbG9yIiwicG9pbnRIYWxvQ29sb3IiLCJzZXRTdHlsZSIsImpzb24iLCJ2YWx1ZSIsInN0cmluZ2lmeSIsInNhdmVOb2RlIiwic2F2ZSIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=