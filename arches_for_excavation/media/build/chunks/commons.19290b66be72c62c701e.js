"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[77578],{

/***/ 77578:
/*!***********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/select-feature-layers.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! arches */ 77126);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(resourceId, source, sourceLayer, selectedResourceIds, visible, color) {
  color = color || "#F0C200";
  var strokecolor = "#fff";
  var minzoom = arches__WEBPACK_IMPORTED_MODULE_0__["default"].mapDefaultMinZoom;
  if (selectedResourceIds && selectedResourceIds.length > 0) {
    color = ['match', ['get', 'resourceinstanceid'], selectedResourceIds, "#2F14A6", color];
  }
  if (!source) return [];
  var layers = [{
    "id": "select-feature-polygon-fill",
    "type": "fill",
    "minzoom": minzoom,
    "filter": ['all', ["==", "$type", "Polygon"], ["!=", "resourceinstanceid", resourceId]],
    "paint": {
      "fill-color": color,
      "fill-outline-color": color,
      "fill-opacity": 0.2
    },
    "layout": {
      "visibility": visible ? "visible" : "none"
    }
  }, {
    "id": "select-feature-polygon-under-stroke",
    "type": "line",
    "minzoom": minzoom,
    "filter": ['all', ["==", "$type", "Polygon"], ["!=", "resourceinstanceid", resourceId]],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": visible ? "visible" : "none"
    },
    "paint": {
      "line-color": strokecolor,
      "line-width": 4
    }
  }, {
    "id": "select-feature-polygon-stroke",
    "type": "line",
    "minzoom": minzoom,
    "filter": ['all', ["==", "$type", "Polygon"], ["!=", "resourceinstanceid", resourceId]],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": visible ? "visible" : "none"
    },
    "paint": {
      "line-color": color,
      "line-width": 2
    }
  }, {
    "id": "select-feature-line",
    "type": "line",
    "minzoom": minzoom,
    "filter": ['all', ["==", "$type", "LineString"], ["!=", "resourceinstanceid", resourceId]],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": visible ? "visible" : "none"
    },
    "paint": {
      "line-color": color,
      "line-width": 2
    }
  }, {
    "id": "select-feature-point-point-stroke",
    "type": "circle",
    "minzoom": minzoom,
    "filter": ['all', ["==", "$type", "Point"], ["!=", "resourceinstanceid", resourceId]],
    "paint": {
      "circle-radius": 6,
      "circle-opacity": 1,
      "circle-color": "#fff"
    },
    "layout": {
      "visibility": visible ? "visible" : "none"
    }
  }, {
    "id": "select-feature-point",
    "type": "circle",
    "minzoom": minzoom,
    "filter": ['all', ["==", "$type", "Point"], ["!=", "resourceinstanceid", resourceId]],
    "paint": {
      "circle-radius": 4,
      "circle-color": color
    },
    "layout": {
      "visibility": visible ? "visible" : "none"
    }
  }];
  layers.forEach(function (layer) {
    layer["source"] = source;
    if (sourceLayer) layer["source-layer"] = sourceLayer;
  });
  return layers;
}
;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFdBQVc7RUFDeEQsQ0FBQyxDQUFDO0VBQ0YsT0FBT1EsTUFBTTtBQUNqQjtBQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL2NhcmRzL3NlbGVjdC1mZWF0dXJlLWxheWVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmVzb3VyY2VJZCwgc291cmNlLCBzb3VyY2VMYXllciwgc2VsZWN0ZWRSZXNvdXJjZUlkcywgdmlzaWJsZSwgY29sb3IpIHtcbiAgICBjb2xvciA9IGNvbG9yIHx8IFwiI0YwQzIwMFwiO1xuICAgIHZhciBzdHJva2Vjb2xvciA9IFwiI2ZmZlwiO1xuICAgIHZhciBtaW56b29tID0gYXJjaGVzLm1hcERlZmF1bHRNaW5ab29tO1xuICAgIGlmIChzZWxlY3RlZFJlc291cmNlSWRzICYmIHNlbGVjdGVkUmVzb3VyY2VJZHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb2xvciA9IFtcbiAgICAgICAgICAgICdtYXRjaCcsXG4gICAgICAgICAgICBbJ2dldCcsICdyZXNvdXJjZWluc3RhbmNlaWQnXSxcbiAgICAgICAgICAgIHNlbGVjdGVkUmVzb3VyY2VJZHMsIFwiIzJGMTRBNlwiLFxuICAgICAgICAgICAgY29sb3JcbiAgICAgICAgXTtcbiAgICB9XG4gICAgaWYgKCFzb3VyY2UpIHJldHVybiBbXTtcbiAgICB2YXIgbGF5ZXJzID0gW3tcbiAgICAgICAgXCJpZFwiOiBcInNlbGVjdC1mZWF0dXJlLXBvbHlnb24tZmlsbFwiLFxuICAgICAgICBcInR5cGVcIjogXCJmaWxsXCIsXG4gICAgICAgIFwibWluem9vbVwiOiBtaW56b29tLFxuICAgICAgICBcImZpbHRlclwiOiBbJ2FsbCcsW1xuICAgICAgICAgICAgXCI9PVwiLCBcIiR0eXBlXCIsIFwiUG9seWdvblwiXG4gICAgICAgIF0sIFtcbiAgICAgICAgICAgIFwiIT1cIiwgXCJyZXNvdXJjZWluc3RhbmNlaWRcIiwgcmVzb3VyY2VJZFxuICAgICAgICBdXSxcbiAgICAgICAgXCJwYWludFwiOiB7XG4gICAgICAgICAgICBcImZpbGwtY29sb3JcIjogY29sb3IsXG4gICAgICAgICAgICBcImZpbGwtb3V0bGluZS1jb2xvclwiOiBjb2xvcixcbiAgICAgICAgICAgIFwiZmlsbC1vcGFjaXR5XCI6IDAuMlxuICAgICAgICB9LFxuICAgICAgICBcImxheW91dFwiOiB7XG4gICAgICAgICAgICBcInZpc2liaWxpdHlcIjogdmlzaWJsZSA/IFwidmlzaWJsZVwiOiBcIm5vbmVcIlxuICAgICAgICB9XG4gICAgfSwgIHtcbiAgICAgICAgXCJpZFwiOiBcInNlbGVjdC1mZWF0dXJlLXBvbHlnb24tdW5kZXItc3Ryb2tlXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImxpbmVcIixcbiAgICAgICAgXCJtaW56b29tXCI6IG1pbnpvb20sXG4gICAgICAgIFwiZmlsdGVyXCI6IFsnYWxsJyxbXG4gICAgICAgICAgICBcIj09XCIsIFwiJHR5cGVcIiwgXCJQb2x5Z29uXCJcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgXCIhPVwiLCBcInJlc291cmNlaW5zdGFuY2VpZFwiLCByZXNvdXJjZUlkXG4gICAgICAgIF1dLFxuICAgICAgICBcImxheW91dFwiOiB7XG4gICAgICAgICAgICBcImxpbmUtY2FwXCI6IFwicm91bmRcIixcbiAgICAgICAgICAgIFwibGluZS1qb2luXCI6IFwicm91bmRcIixcbiAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiB2aXNpYmxlID8gXCJ2aXNpYmxlXCI6IFwibm9uZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicGFpbnRcIjoge1xuICAgICAgICAgICAgXCJsaW5lLWNvbG9yXCI6IHN0cm9rZWNvbG9yLFxuICAgICAgICAgICAgXCJsaW5lLXdpZHRoXCI6IDRcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgXCJpZFwiOiBcInNlbGVjdC1mZWF0dXJlLXBvbHlnb24tc3Ryb2tlXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImxpbmVcIixcbiAgICAgICAgXCJtaW56b29tXCI6IG1pbnpvb20sXG4gICAgICAgIFwiZmlsdGVyXCI6IFsnYWxsJyxbXG4gICAgICAgICAgICBcIj09XCIsIFwiJHR5cGVcIiwgXCJQb2x5Z29uXCJcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgXCIhPVwiLCBcInJlc291cmNlaW5zdGFuY2VpZFwiLCByZXNvdXJjZUlkXG4gICAgICAgIF1dLFxuICAgICAgICBcImxheW91dFwiOiB7XG4gICAgICAgICAgICBcImxpbmUtY2FwXCI6IFwicm91bmRcIixcbiAgICAgICAgICAgIFwibGluZS1qb2luXCI6IFwicm91bmRcIixcbiAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiB2aXNpYmxlID8gXCJ2aXNpYmxlXCI6IFwibm9uZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicGFpbnRcIjoge1xuICAgICAgICAgICAgXCJsaW5lLWNvbG9yXCI6IGNvbG9yLFxuICAgICAgICAgICAgXCJsaW5lLXdpZHRoXCI6IDJcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgXCJpZFwiOiBcInNlbGVjdC1mZWF0dXJlLWxpbmVcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwibGluZVwiLFxuICAgICAgICBcIm1pbnpvb21cIjogbWluem9vbSxcbiAgICAgICAgXCJmaWx0ZXJcIjogWydhbGwnLFtcbiAgICAgICAgICAgIFwiPT1cIiwgXCIkdHlwZVwiLCBcIkxpbmVTdHJpbmdcIlxuICAgICAgICBdLCBbXG4gICAgICAgICAgICBcIiE9XCIsIFwicmVzb3VyY2VpbnN0YW5jZWlkXCIsIHJlc291cmNlSWRcbiAgICAgICAgXV0sXG4gICAgICAgIFwibGF5b3V0XCI6IHtcbiAgICAgICAgICAgIFwibGluZS1jYXBcIjogXCJyb3VuZFwiLFxuICAgICAgICAgICAgXCJsaW5lLWpvaW5cIjogXCJyb3VuZFwiLFxuICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IHZpc2libGUgPyBcInZpc2libGVcIjogXCJub25lXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWludFwiOiB7XG4gICAgICAgICAgICBcImxpbmUtY29sb3JcIjogY29sb3IsXG4gICAgICAgICAgICBcImxpbmUtd2lkdGhcIjogMlxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBcImlkXCI6IFwic2VsZWN0LWZlYXR1cmUtcG9pbnQtcG9pbnQtc3Ryb2tlXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImNpcmNsZVwiLFxuICAgICAgICBcIm1pbnpvb21cIjogbWluem9vbSxcbiAgICAgICAgXCJmaWx0ZXJcIjogWydhbGwnLFtcbiAgICAgICAgICAgIFwiPT1cIiwgXCIkdHlwZVwiLCBcIlBvaW50XCJcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgXCIhPVwiLCBcInJlc291cmNlaW5zdGFuY2VpZFwiLCByZXNvdXJjZUlkXG4gICAgICAgIF1dLFxuICAgICAgICBcInBhaW50XCI6IHtcbiAgICAgICAgICAgIFwiY2lyY2xlLXJhZGl1c1wiOiA2LFxuICAgICAgICAgICAgXCJjaXJjbGUtb3BhY2l0eVwiOiAxLFxuICAgICAgICAgICAgXCJjaXJjbGUtY29sb3JcIjogXCIjZmZmXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYXlvdXRcIjoge1xuICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IHZpc2libGUgPyBcInZpc2libGVcIjogXCJub25lXCJcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgXCJpZFwiOiBcInNlbGVjdC1mZWF0dXJlLXBvaW50XCIsXG4gICAgICAgIFwidHlwZVwiOiBcImNpcmNsZVwiLFxuICAgICAgICBcIm1pbnpvb21cIjogbWluem9vbSxcbiAgICAgICAgXCJmaWx0ZXJcIjogWydhbGwnLFtcbiAgICAgICAgICAgIFwiPT1cIiwgXCIkdHlwZVwiLCBcIlBvaW50XCJcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgXCIhPVwiLCBcInJlc291cmNlaW5zdGFuY2VpZFwiLCByZXNvdXJjZUlkXG4gICAgICAgIF1dLFxuICAgICAgICBcInBhaW50XCI6IHtcbiAgICAgICAgICAgIFwiY2lyY2xlLXJhZGl1c1wiOiA0LFxuICAgICAgICAgICAgXCJjaXJjbGUtY29sb3JcIjogY29sb3JcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYXlvdXRcIjoge1xuICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IHZpc2libGUgPyBcInZpc2libGVcIjogXCJub25lXCJcbiAgICAgICAgfVxuICAgIH1dO1xuICAgIGxheWVycy5mb3JFYWNoKGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgIGxheWVyW1wic291cmNlXCJdID0gc291cmNlO1xuICAgICAgICBpZiAoc291cmNlTGF5ZXIpIGxheWVyW1wic291cmNlLWxheWVyXCJdID0gc291cmNlTGF5ZXI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGxheWVycztcbn07XG4iXSwibmFtZXMiOlsiYXJjaGVzIiwicmVzb3VyY2VJZCIsInNvdXJjZSIsInNvdXJjZUxheWVyIiwic2VsZWN0ZWRSZXNvdXJjZUlkcyIsInZpc2libGUiLCJjb2xvciIsInN0cm9rZWNvbG9yIiwibWluem9vbSIsIm1hcERlZmF1bHRNaW5ab29tIiwibGVuZ3RoIiwibGF5ZXJzIiwiZm9yRWFjaCIsImxheWVyIl0sInNvdXJjZVJvb3QiOiIifQ==