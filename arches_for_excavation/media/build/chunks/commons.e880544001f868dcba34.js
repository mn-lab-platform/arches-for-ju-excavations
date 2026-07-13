"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[92117],{

/***/ 92117:
/*!*******************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/plugins/map.js + 1 modules ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ plugins_map)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/plugins/map.htm
const map_namespaceObject = "templates/views/components/plugins/map.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/map.js + 2 modules
var map = __webpack_require__(69001);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/plugins/map.js



var viewModel = function viewModel() {
  this.configJSON = {
    "zoom": 0,
    "pitch": 0,
    "basemap": "streets",
    "bearing": 0,
    "centerX": 0,
    "centerY": 0,
    "maxZoom": 20,
    "minZoom": 0,
    "defaultValue": "",
    "featureColor": "#FF0000",
    "geometryTypes": [],
    "overlayConfigs": [],
    "overlayOpacity": 0,
    "geocodeProvider": "10000000-0000-0000-0000-010000000000",
    "geocoderVisible": true,
    "defaultValueType": "",
    "featureLineWidth": 1,
    "featurePointSize": 3,
    "geocodePlaceholder": "Search"
  };
};
/* harmony default export */ const plugins_map = (knockout_latest_default().components.register('map-plugin', {
  viewModel: viewModel,
  template: map_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZTg4MDU0NDAwMWY4NjhkY2JhMzQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNpRDtBQUNyQztBQUd0QyxJQUFNRSxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBQSxFQUFjO0VBQ3pCLElBQUksQ0FBQ0MsVUFBVSxHQUFHO0lBQ2QsTUFBTSxFQUFFLENBQUM7SUFDVCxPQUFPLEVBQUUsQ0FBQztJQUNWLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFNBQVMsRUFBRSxDQUFDO0lBQ1osU0FBUyxFQUFFLENBQUM7SUFDWixTQUFTLEVBQUUsQ0FBQztJQUNaLFNBQVMsRUFBRSxFQUFFO0lBQ2IsU0FBUyxFQUFFLENBQUM7SUFDWixjQUFjLEVBQUUsRUFBRTtJQUNsQixjQUFjLEVBQUUsU0FBUztJQUN6QixlQUFlLEVBQUUsRUFBRTtJQUNuQixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGdCQUFnQixFQUFFLENBQUM7SUFDbkIsaUJBQWlCLEVBQUUsc0NBQXNDO0lBQ3pELGlCQUFpQixFQUFFLElBQUk7SUFDdkIsa0JBQWtCLEVBQUUsRUFBRTtJQUN0QixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLGtCQUFrQixFQUFFLENBQUM7SUFDckIsb0JBQW9CLEVBQUU7RUFDMUIsQ0FBQztBQUNMLENBQUM7QUFFRCxrREFBZUgsb0NBQWEsQ0FBQ0ssUUFBUSxDQUFDLFlBQVksRUFBRTtFQUNoREgsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCSSxRQUFRLEVBQUVMLG1CQUFpQkE7QUFDL0IsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3BsdWdpbnMvbWFwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgbWFwUGx1Z2luVGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvcGx1Z2lucy9tYXAuaHRtJztcbmltcG9ydCAndmlld3MvY29tcG9uZW50cy93aWRnZXRzL21hcCc7XG5cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb25maWdKU09OID0ge1xuICAgICAgICBcInpvb21cIjogMCxcbiAgICAgICAgXCJwaXRjaFwiOiAwLFxuICAgICAgICBcImJhc2VtYXBcIjogXCJzdHJlZXRzXCIsXG4gICAgICAgIFwiYmVhcmluZ1wiOiAwLFxuICAgICAgICBcImNlbnRlclhcIjogMCxcbiAgICAgICAgXCJjZW50ZXJZXCI6IDAsXG4gICAgICAgIFwibWF4Wm9vbVwiOiAyMCxcbiAgICAgICAgXCJtaW5ab29tXCI6IDAsXG4gICAgICAgIFwiZGVmYXVsdFZhbHVlXCI6IFwiXCIsXG4gICAgICAgIFwiZmVhdHVyZUNvbG9yXCI6IFwiI0ZGMDAwMFwiLFxuICAgICAgICBcImdlb21ldHJ5VHlwZXNcIjogW10sXG4gICAgICAgIFwib3ZlcmxheUNvbmZpZ3NcIjogW10sXG4gICAgICAgIFwib3ZlcmxheU9wYWNpdHlcIjogMCxcbiAgICAgICAgXCJnZW9jb2RlUHJvdmlkZXJcIjogXCIxMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMTAwMDAwMDAwMDBcIixcbiAgICAgICAgXCJnZW9jb2RlclZpc2libGVcIjogdHJ1ZSxcbiAgICAgICAgXCJkZWZhdWx0VmFsdWVUeXBlXCI6IFwiXCIsXG4gICAgICAgIFwiZmVhdHVyZUxpbmVXaWR0aFwiOiAxLFxuICAgICAgICBcImZlYXR1cmVQb2ludFNpemVcIjogMyxcbiAgICAgICAgXCJnZW9jb2RlUGxhY2Vob2xkZXJcIjogXCJTZWFyY2hcIlxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdtYXAtcGx1Z2luJywge1xuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiBtYXBQbHVnaW5UZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbImtvIiwibWFwUGx1Z2luVGVtcGxhdGUiLCJ2aWV3TW9kZWwiLCJjb25maWdKU09OIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==