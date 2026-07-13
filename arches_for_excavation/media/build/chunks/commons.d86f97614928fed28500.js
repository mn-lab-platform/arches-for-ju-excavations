"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[70266],{

/***/ 70266:
/*!*******************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/leaflet.js ***!
  \*******************************************************************************************/
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
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet */ 53214);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_3__);




(knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).leaflet = {
  init: function init(element, valueAccessor, allBindings, viewModel) {
    var config = knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(valueAccessor());
    var map = leaflet__WEBPACK_IMPORTED_MODULE_3___default().map(element, config);
    if (typeof config.afterRender === 'function') {
      config.afterRender(map);
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).mousedown(function (event) {
      event.stopPropagation();
    });
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).leaflet.init = knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers.leaflet.init.bind((knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).leaflet);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).leaflet);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZDg2Zjk3NjE0OTI4ZmVkMjg1MDAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0k7QUFDRDtBQUNGO0FBRXhCRSxpRUFBa0IsQ0FBQ0csT0FBTyxHQUFHO0VBQ3pCQyxJQUFJLEVBQUUsU0FBTkEsSUFBSUEsQ0FBWUMsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLFdBQVcsRUFBRUMsU0FBUyxFQUFFO0lBQzVELElBQUlDLE1BQU0sR0FBR1Qsc0RBQVMsQ0FBQ00sYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN2QyxJQUFJSyxHQUFHLEdBQUdWLGtEQUFLLENBQUNJLE9BQU8sRUFBRUksTUFBTSxDQUFDO0lBQ2hDLElBQUksT0FBT0EsTUFBTSxDQUFDRyxXQUFXLEtBQUssVUFBVSxFQUFFO01BQzFDSCxNQUFNLENBQUNHLFdBQVcsQ0FBQ0QsR0FBRyxDQUFDO0lBQzNCO0lBRUFiLDZDQUFDLENBQUNPLE9BQU8sQ0FBQyxDQUFDUSxTQUFTLENBQUMsVUFBVUMsS0FBSyxFQUFFO01BQ2xDQSxLQUFLLENBQUNDLGVBQWUsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztFQUNOO0FBQ0osQ0FBQztBQUNEZixpRUFBa0IsQ0FBQ0csT0FBTyxDQUFDQyxJQUFJLEdBQUdKLCtEQUFrQixDQUFDRyxPQUFPLENBQUNDLElBQUksQ0FBQ1ksSUFBSSxDQUFDaEIsaUVBQWtCLENBQUNHLE9BQU8sQ0FBQztBQUVsRyxpRUFBZUgsaUVBQWtCLENBQUNHLE9BQU8sRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2JpbmRpbmdzL2xlYWZsZXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuXG5rby5iaW5kaW5nSGFuZGxlcnMubGVhZmxldCA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3MsIHZpZXdNb2RlbCkge1xuICAgICAgICB2YXIgY29uZmlnID0ga28udW53cmFwKHZhbHVlQWNjZXNzb3IoKSk7XG4gICAgICAgIHZhciBtYXAgPSBMLm1hcChlbGVtZW50LCBjb25maWcpO1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5hZnRlclJlbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uZmlnLmFmdGVyUmVuZGVyKG1hcCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKGVsZW1lbnQpLm1vdXNlZG93bihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xua28uYmluZGluZ0hhbmRsZXJzLmxlYWZsZXQuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5sZWFmbGV0LmluaXQuYmluZChrby5iaW5kaW5nSGFuZGxlcnMubGVhZmxldCk7XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmJpbmRpbmdIYW5kbGVycy5sZWFmbGV0O1xuIl0sIm5hbWVzIjpbIiQiLCJfIiwia28iLCJMIiwiYmluZGluZ0hhbmRsZXJzIiwibGVhZmxldCIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsImFsbEJpbmRpbmdzIiwidmlld01vZGVsIiwiY29uZmlnIiwidW53cmFwIiwibWFwIiwiYWZ0ZXJSZW5kZXIiLCJtb3VzZWRvd24iLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImJpbmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==