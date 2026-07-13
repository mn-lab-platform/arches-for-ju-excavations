"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[19082],{

/***/ 19082:
/*!*****************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/concept-radio.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var viewmodels_concept_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! viewmodels/concept-widget */ 29487);
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
  viewmodels_concept_widget__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, [params]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('concept-radio-widget', {
  viewModel: viewModel,
  template: templates_views_components_widgets_radio_htm__WEBPACK_IMPORTED_MODULE_2__
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNDBlMjFmMDg0MDZjNTRmYzIzY2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ3FDO0FBQ2lCO0FBQzdDOztBQUduQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNRyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQy9CQSxNQUFNLENBQUNDLFVBQVUsR0FBRyxDQUFDLGNBQWMsQ0FBQztFQUVwQ0osaUVBQXNCLENBQUNLLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQ0YsTUFBTSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUVELGlFQUFlSiwwREFBYSxDQUFDUSxRQUFRLENBQUMsc0JBQXNCLEVBQUU7RUFDMURMLFNBQVMsRUFBRUEsU0FBUztFQUNwQk0sUUFBUSxFQUFFUCx5RUFBb0JBO0FBQ2xDLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL2NvbmNlcHQtcmFkaW8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBDb25jZXB0V2lkZ2V0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvY29uY2VwdC13aWRnZXQnO1xuaW1wb3J0IGNvbmNlcHRSYWRpb1RlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvcmFkaW8uaHRtJztcbmltcG9ydCAnYmluZGluZ3Mva2V5LWV2ZW50cy1jbGljayc7XG5cblxuLyoqXG4gKiByZWdpc3RlcnMgYSBzZWxlY3Qtd2lkZ2V0IGNvbXBvbmVudCBmb3IgdXNlIGluIGZvcm1zXG4gKiBAZnVuY3Rpb24gZXh0ZXJuYWw6XCJrby5jb21wb25lbnRzXCIuc2VsZWN0LXdpZGdldFxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtc1xuICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMudmFsdWUgLSB0aGUgdmFsdWUgYmVpbmcgbWFuYWdlZFxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcy5jb25maWcgLVxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcubGFiZWwgLSBsYWJlbCB0byB1c2UgYWxvbmdzaWRlIHRoZSBzZWxlY3QgaW5wdXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLnBsYWNlaG9sZGVyIC0gZGVmYXVsdCB0ZXh0IHRvIHNob3cgaW4gdGhlIHNlbGVjdCBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcub3B0aW9ucyAtXG4gKi9cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgcGFyYW1zLmNvbmZpZ0tleXMgPSBbJ2RlZmF1bHRWYWx1ZSddO1xuICAgICAgICBcbiAgICBDb25jZXB0V2lkZ2V0Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2NvbmNlcHQtcmFkaW8td2lkZ2V0Jywge1xuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiBjb25jZXB0UmFkaW9UZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbImtvIiwiQ29uY2VwdFdpZGdldFZpZXdNb2RlbCIsImNvbmNlcHRSYWRpb1RlbXBsYXRlIiwidmlld01vZGVsIiwicGFyYW1zIiwiY29uZmlnS2V5cyIsImFwcGx5IiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==