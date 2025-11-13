"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[67948],{

/***/ 67948:
/*!****************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/domain-radio.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var viewmodels_domain_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! viewmodels/domain-widget */ 33257);
/* harmony import */ var templates_views_components_widgets_radio_htm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! templates/views/components/widgets/radio.htm */ 1525);
/* harmony import */ var bindings_key_events_click__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bindings/key-events-click */ 40513);





/**
 * registers a select-widget component for use in forms
 * @function external:"ko.components".select-widget
 * @param {object} params
 * @param {boolean} params.value - the value being managed
 * @param {object} params.config -
 * @param {string} params.config.label - label to use alongside the select input
 * @param {string} params.config.placeholder - default text to show in the select input
 * @param {string} params.config.options -
 */

var viewModel = function viewModel(params) {
  params.configKeys = ['defaultValue'];
  viewmodels_domain_widget__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, [params]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('domain-radio-widget', {
  viewModel: viewModel,
  template: templates_views_components_widgets_radio_htm__WEBPACK_IMPORTED_MODULE_2__
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZDFmYTM3YjZhODM3NThiZmQyZTEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ21DO0FBQ1k7QUFDdEM7O0FBR25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1HLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFZQyxNQUFNLEVBQUU7RUFFL0JBLE1BQU0sQ0FBQ0MsVUFBVSxHQUFHLENBQUMsY0FBYyxDQUFDO0VBQ3BDSixnRUFBcUIsQ0FBQ0ssS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDRixNQUFNLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBRUQsaUVBQWVKLDBEQUFhLENBQUNRLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtFQUN6REwsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCTSxRQUFRLEVBQUVQLHlFQUFhQTtBQUMzQixDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9kb21haW4tcmFkaW8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBEb21haW5XaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy9kb21haW4td2lkZ2V0JztcbmltcG9ydCByYWRpb1RlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvcmFkaW8uaHRtJztcbmltcG9ydCAnYmluZGluZ3Mva2V5LWV2ZW50cy1jbGljayc7XG5cblxuLyoqXG4gKiByZWdpc3RlcnMgYSBzZWxlY3Qtd2lkZ2V0IGNvbXBvbmVudCBmb3IgdXNlIGluIGZvcm1zXG4gKiBAZnVuY3Rpb24gZXh0ZXJuYWw6XCJrby5jb21wb25lbnRzXCIuc2VsZWN0LXdpZGdldFxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtc1xuICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMudmFsdWUgLSB0aGUgdmFsdWUgYmVpbmcgbWFuYWdlZFxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcy5jb25maWcgLVxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcubGFiZWwgLSBsYWJlbCB0byB1c2UgYWxvbmdzaWRlIHRoZSBzZWxlY3QgaW5wdXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLnBsYWNlaG9sZGVyIC0gZGVmYXVsdCB0ZXh0IHRvIHNob3cgaW4gdGhlIHNlbGVjdCBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcub3B0aW9ucyAtXG4gKi9cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgIFxuICAgIHBhcmFtcy5jb25maWdLZXlzID0gWydkZWZhdWx0VmFsdWUnXTtcbiAgICBEb21haW5XaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3RlcignZG9tYWluLXJhZGlvLXdpZGdldCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogcmFkaW9UZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbImtvIiwiRG9tYWluV2lkZ2V0Vmlld01vZGVsIiwicmFkaW9UZW1wbGF0ZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsImNvbmZpZ0tleXMiLCJhcHBseSIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==