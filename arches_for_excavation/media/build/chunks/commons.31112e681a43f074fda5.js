"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[99986],{

/***/ 99986:
/*!********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/iiif.js + 1 modules ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ iiif)
});

// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ./node_modules/leaflet/dist/leaflet.js
var leaflet = __webpack_require__(53214);
var leaflet_default = /*#__PURE__*/__webpack_require__.n(leaflet);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/widget.js
var widget = __webpack_require__(77260);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/iiif-annotation.js
var iiif_annotation = __webpack_require__(35283);
// EXTERNAL MODULE: ./node_modules/@mapbox/geojson-extent/geojson-extent.js
var geojson_extent = __webpack_require__(50653);
var geojson_extent_default = /*#__PURE__*/__webpack_require__.n(geojson_extent);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/iiif.htm
const iiif_namespaceObject = "templates/views/components/widgets/iiif.htm";
// EXTERNAL MODULE: ./node_modules/leaflet.fullscreen/Control.FullScreen.js
var Control_FullScreen = __webpack_require__(29401);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/iiif.js









var viewModel = function viewModel(params) {
  var self = this;
  params.configKeys = ['defaultManifest'];
  widget["default"].apply(this, [params]);
  if (params.widget) params.widgets = [params.widget];
  if (!params.manifest) params.manifest = this.defaultManifest();
  iiif_annotation["default"].apply(this, [params]);
  if (params.state === 'report') {
    this.canvasConfigs = [];
    var canvases = {};
    var value = knockout_mapping_min_default().toJS(params.value);
    if (value && value.features) {
      value.features.forEach(function (feature) {
        if (!canvases[feature.properties.canvas]) canvases[feature.properties.canvas] = [];
        canvases[feature.properties.canvas].push(feature);
      });
    }
    underscore_min_default().forEach(canvases, function (features, canvas) {
      self.canvasConfigs.push({
        center: [0, 0],
        crs: (leaflet_default()).CRS.Simple,
        zoom: 0,
        afterRender: function afterRender(map) {
          leaflet_default().tileLayer.iiif(canvas + '/info.json').addTo(map);
          var featureCollection = {
            type: 'FeatureCollection',
            features: features
          };
          var extent = geojson_extent_default()(featureCollection);
          map.addLayer(leaflet_default().geoJson(featureCollection, {
            pointToLayer: function pointToLayer(feature, latlng) {
              return leaflet_default().circleMarker(latlng, feature.properties);
            },
            style: function style(feature) {
              return feature.properties;
            }
          }));
          leaflet_default().control.fullscreen().addTo(map);
          setTimeout(function () {
            map.fitBounds([[extent[1] - 1, extent[0] - 1], [extent[3] + 1, extent[2] + 1]]);
          }, 250);
        }
      });
    });
  }
  this.manifest.subscribe(function (manifest) {
    if (manifest !== self.defaultManifest()) self.defaultManifest(manifest);
  });
  this.defaultManifest.subscribe(function (manifest) {
    if (manifest !== self.manifest()) self.manifest(manifest);
  });
  this.displayValue = knockout_latest_default().computed(function () {
    var value = knockout_mapping_min_default().toJS(this.value);
    if (!value || !value.features) {
      return 0;
    }
    return value.features.length;
  }, this);
};
/* harmony default export */ const iiif = (knockout_latest_default().components.register('iiif-widget', {
  viewModel: viewModel,
  template: iiif_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMzExMTJlNjgxYTQzZjA3NGZkYTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMkI7QUFDSDtBQUNFO0FBQ2U7QUFDTztBQUN1QjtBQUM1QjtBQUNrQztBQUNqRDtBQUc1QixJQUFNUSxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQy9CLElBQUlDLElBQUksR0FBRyxJQUFJO0VBR2ZELE1BQU0sQ0FBQ0UsVUFBVSxHQUFHLENBQUMsaUJBQWlCLENBQUM7RUFDdkNQLGlCQUFlLENBQUNRLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQ0gsTUFBTSxDQUFDLENBQUM7RUFFckMsSUFBSUEsTUFBTSxDQUFDSSxNQUFNLEVBQUVKLE1BQU0sQ0FBQ0ssT0FBTyxHQUFHLENBQUNMLE1BQU0sQ0FBQ0ksTUFBTSxDQUFDO0VBQ25ELElBQUksQ0FBQ0osTUFBTSxDQUFDTSxRQUFRLEVBQUVOLE1BQU0sQ0FBQ00sUUFBUSxHQUFHLElBQUksQ0FBQ0MsZUFBZSxDQUFDLENBQUM7RUFFOURYLDBCQUF1QixDQUFDTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUNILE1BQU0sQ0FBQyxDQUFDO0VBRTdDLElBQUlBLE1BQU0sQ0FBQ1EsS0FBSyxLQUFLLFFBQVEsRUFBRTtJQUMzQixJQUFJLENBQUNDLGFBQWEsR0FBRyxFQUFFO0lBQ3ZCLElBQUlDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSUMsS0FBSyxHQUFHakIsbUNBQWMsQ0FBQ00sTUFBTSxDQUFDVyxLQUFLLENBQUM7SUFDeEMsSUFBSUEsS0FBSyxJQUFJQSxLQUFLLENBQUNFLFFBQVEsRUFBRTtNQUN6QkYsS0FBSyxDQUFDRSxRQUFRLENBQUNDLE9BQU8sQ0FBQyxVQUFTQyxPQUFPLEVBQUU7UUFDckMsSUFBSSxDQUFDTCxRQUFRLENBQUNLLE9BQU8sQ0FBQ0MsVUFBVSxDQUFDQyxNQUFNLENBQUMsRUFB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QUNaLENBQUM7QUFFRCwyQ0FBZXBELG9DQUFhLENBQUNzRCxRQUFRLENBQUMsYUFBYSxFQUFFO0VBQ2pEaEQsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCaUQsUUFBUSxFQUFFbEQsb0JBQWtCQTtBQUNoQyxDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9paWlmLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGtvTWFwcGluZyBmcm9tICdrbm9ja291dC1tYXBwaW5nJztcbmltcG9ydCBXaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy93aWRnZXQnO1xuaW1wb3J0IElJSUZBbm5vdGF0aW9uVmlld21vZGVsIGZyb20gJ3ZpZXdzL2NvbXBvbmVudHMvaWlpZi1hbm5vdGF0aW9uJztcbmltcG9ydCBnZW9qc29uRXh0ZW50IGZyb20gJ2dlb2pzb24tZXh0ZW50JztcbmltcG9ydCBpaWlmV2lkZ2V0VGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9paWlmLmh0bSc7XG5pbXBvcnQgJ2xlYWZsZXQtZnVsbHNjcmVlbic7XG5cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIFxuICAgIHBhcmFtcy5jb25maWdLZXlzID0gWydkZWZhdWx0TWFuaWZlc3QnXTtcbiAgICBXaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgaWYgKHBhcmFtcy53aWRnZXQpIHBhcmFtcy53aWRnZXRzID0gW3BhcmFtcy53aWRnZXRdO1xuICAgIGlmICghcGFyYW1zLm1hbmlmZXN0KSBwYXJhbXMubWFuaWZlc3QgPSB0aGlzLmRlZmF1bHRNYW5pZmVzdCgpO1xuXG4gICAgSUlJRkFubm90YXRpb25WaWV3bW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgaWYgKHBhcmFtcy5zdGF0ZSA9PT0gJ3JlcG9ydCcpIHtcbiAgICAgICAgdGhpcy5jYW52YXNDb25maWdzID0gW107XG4gICAgICAgIHZhciBjYW52YXNlcyA9IHt9O1xuICAgICAgICB2YXIgdmFsdWUgPSBrb01hcHBpbmcudG9KUyhwYXJhbXMudmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuZmVhdHVyZXMpIHtcbiAgICAgICAgICAgIHZhbHVlLmZlYXR1cmVzLmZvckVhY2goZnVuY3Rpb24oZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgIGlmICghY2FudmFzZXNbZmVhdHVyZS5wcm9wZXJ0aWVzLmNhbnZhc10pIGNhbnZhc2VzW2ZlYXR1cmUucHJvcGVydGllcy5jYW52YXNdID0gW107XG4gICAgICAgICAgICAgICAgY2FudmFzZXNbZmVhdHVyZS5wcm9wZXJ0aWVzLmNhbnZhc10ucHVzaChmZWF0dXJlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIF8uZm9yRWFjaChjYW52YXNlcywgZnVuY3Rpb24oZmVhdHVyZXMsIGNhbnZhcykge1xuICAgICAgICAgICAgc2VsZi5jYW52YXNDb25maWdzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNlbnRlcjogWzAsIDBdLFxuICAgICAgICAgICAgICAgIGNyczogTC5DUlMuU2ltcGxlLFxuICAgICAgICAgICAgICAgIHpvb206ICAwLFxuICAgICAgICAgICAgICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgICAgICAgICAgICAgTC50aWxlTGF5ZXIuaWlpZihjYW52YXMgKyAnL2luZm8uanNvbicpLmFkZFRvKG1hcCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmZWF0dXJlQ29sbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZXNcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4dGVudCA9IGdlb2pzb25FeHRlbnQoZmVhdHVyZUNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIoTC5nZW9Kc29uKGZlYXR1cmVDb2xsZWN0aW9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludFRvTGF5ZXI6IGZ1bmN0aW9uKGZlYXR1cmUsIGxhdGxuZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcsIGZlYXR1cmUucHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIEwuY29udHJvbC5mdWxsc2NyZWVuKCkuYWRkVG8obWFwKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtleHRlbnRbMV0tMSwgZXh0ZW50WzBdLTFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtleHRlbnRbM10rMSwgZXh0ZW50WzJdKzFdXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5tYW5pZmVzdC5zdWJzY3JpYmUoZnVuY3Rpb24obWFuaWZlc3QpIHtcbiAgICAgICAgaWYgKG1hbmlmZXN0ICE9PSBzZWxmLmRlZmF1bHRNYW5pZmVzdCgpKVxuICAgICAgICAgICAgc2VsZi5kZWZhdWx0TWFuaWZlc3QobWFuaWZlc3QpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kZWZhdWx0TWFuaWZlc3Quc3Vic2NyaWJlKGZ1bmN0aW9uKG1hbmlmZXN0KSB7XG4gICAgICAgIGlmIChtYW5pZmVzdCAhPT0gc2VsZi5tYW5pZmVzdCgpKVxuICAgICAgICAgICAgc2VsZi5tYW5pZmVzdChtYW5pZmVzdCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBrb01hcHBpbmcudG9KUyh0aGlzLnZhbHVlKTtcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUuZmVhdHVyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS5mZWF0dXJlcy5sZW5ndGg7XG4gICAgfSwgdGhpcyk7ICAgIFxufTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3RlcignaWlpZi13aWRnZXQnLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IGlpaWZXaWRnZXRUZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbIl8iLCJMIiwia28iLCJrb01hcHBpbmciLCJXaWRnZXRWaWV3TW9kZWwiLCJJSUlGQW5ub3RhdGlvblZpZXdtb2RlbCIsImdlb2pzb25FeHRlbnQiLCJpaWlmV2lkZ2V0VGVtcGxhdGUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwiY29uZmlnS2V5cyIsImFwcGx5Iiwid2lkZ2V0Iiwid2lkZ2V0cyIsIm1hbmlmZXN0IiwiZGVmYXVsdE1hbmlmZXN0Iiwic3RhdGUiLCJjYW52YXNDb25maWdzIiwiY2FudmFzZXMiLCJ2YWx1ZSIsInRvSlMiLCJmZWF0dXJlcyIsImZvckVhY2giLCJmZWF0dXJlIiwicHJvcGVydGllcyIsImNhbnZhcyIsInB1c2giLCJjZW50ZXIiLCJjcnMiLCJDUlMiLCJTaW1wbGUiLCJ6b29tIiwiYWZ0ZXJSZW5kZXIiLCJtYXAiLCJ0aWxlTGF5ZXIiLCJpaWlmIiwiYWRkVG8iLCJmZWF0dXJlQ29sbGVjdGlvbiIsInR5cGUiLCJleHRlbnQiLCJhZGRMYXllciIsImdlb0pzb24iLCJwb2ludFRvTGF5ZXIiLCJsYXRsbmciLCJjaXJjbGVNYXJrZXIiLCJzdHlsZSIsImNvbnRyb2wiLCJmdWxsc2NyZWVuIiwic2V0VGltZW91dCIsImZpdEJvdW5kcyIsInN1YnNjcmliZSIsImRpc3BsYXlWYWx1ZSIsImNvbXB1dGVkIiwibGVuZ3RoIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==