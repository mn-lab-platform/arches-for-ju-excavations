"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[45899],{

/***/ 45899:
/*!*****************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/domain-select.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var viewmodels_domain_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! viewmodels/domain-widget */ 33257);
/* harmony import */ var templates_views_components_widgets_select_htm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! templates/views/components/widgets/select.htm */ 29754);




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
  params.configKeys = ['placeholder', 'defaultValue'];
  viewmodels_domain_widget__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, [params]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('domain-select-widget', {
  viewModel: viewModel,
  template: templates_views_components_widgets_select_htm__WEBPACK_IMPORTED_MODULE_2__
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNTZlZDYyMDE2Y2MxNzE1NmQ5MjMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDbUM7QUFDYzs7QUFHM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUcsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQVlDLE1BQU0sRUFBRTtFQUMvQkEsTUFBTSxDQUFDQyxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDO0VBRW5ESixnRUFBcUIsQ0FBQ0ssS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDRixNQUFNLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBRUQsaUVBQWVKLDBEQUFhLENBQUNRLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtFQUMxREwsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCTSxRQUFRLEVBQUVQLDBFQUFjQTtBQUM1QixDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9kb21haW4tc2VsZWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgRG9tYWluV2lkZ2V0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvZG9tYWluLXdpZGdldCc7XG5pbXBvcnQgc2VsZWN0VGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9zZWxlY3QuaHRtJztcblxuXG4vKipcbiAqIHJlZ2lzdGVycyBhIHNlbGVjdC13aWRnZXQgY29tcG9uZW50IGZvciB1c2UgaW4gZm9ybXNcbiAqIEBmdW5jdGlvbiBleHRlcm5hbDpcImtvLmNvbXBvbmVudHNcIi5zZWxlY3Qtd2lkZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy52YWx1ZSAtIHRoZSB2YWx1ZSBiZWluZyBtYW5hZ2VkXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zLmNvbmZpZyAtXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZy5sYWJlbCAtIGxhYmVsIHRvIHVzZSBhbG9uZ3NpZGUgdGhlIHNlbGVjdCBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcucGxhY2Vob2xkZXIgLSBkZWZhdWx0IHRleHQgdG8gc2hvdyBpbiB0aGUgc2VsZWN0IGlucHV0XG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZy5vcHRpb25zIC1cbiAqL1xuXG5jb25zdCB2aWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBwYXJhbXMuY29uZmlnS2V5cyA9IFsncGxhY2Vob2xkZXInLCAnZGVmYXVsdFZhbHVlJ107XG4gICAgICAgIFxuICAgIERvbWFpbldpZGdldFZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdkb21haW4tc2VsZWN0LXdpZGdldCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogc2VsZWN0VGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsIkRvbWFpbldpZGdldFZpZXdNb2RlbCIsInNlbGVjdFRlbXBsYXRlIiwidmlld01vZGVsIiwicGFyYW1zIiwiY29uZmlnS2V5cyIsImFwcGx5IiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9