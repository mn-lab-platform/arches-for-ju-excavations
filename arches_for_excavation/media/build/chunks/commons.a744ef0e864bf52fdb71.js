"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[52850],{

/***/ 52850:
/*!**********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/domain-multiselect.js ***!
  \**********************************************************************************************************************/
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
  this.multiple = true;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('domain-multiselect-widget', {
  viewModel: viewModel,
  template: templates_views_components_widgets_select_htm__WEBPACK_IMPORTED_MODULE_2__
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYTc0NGVmMGU4NjRiZjUyZmRiNzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDbUM7QUFDYzs7QUFFM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUcsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQVlDLE1BQU0sRUFBRTtFQUMvQkEsTUFBTSxDQUFDQyxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDO0VBRW5ESixnRUFBcUIsQ0FBQ0ssS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDRixNQUFNLENBQUMsQ0FBQztFQUUzQyxJQUFJLENBQUNHLFFBQVEsR0FBRyxJQUFJO0FBQ3hCLENBQUM7QUFFRCxpRUFBZVAsMERBQWEsQ0FBQ1MsUUFBUSxDQUFDLDJCQUEyQixFQUFFO0VBQy9ETixTQUFTLEVBQUVBLFNBQVM7RUFDcEJPLFFBQVEsRUFBRVIsMEVBQWNBO0FBQzVCLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL2RvbWFpbi1tdWx0aXNlbGVjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IERvbWFpbldpZGdldFZpZXdNb2RlbCBmcm9tICd2aWV3bW9kZWxzL2RvbWFpbi13aWRnZXQnO1xuaW1wb3J0IHNlbGVjdFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvc2VsZWN0Lmh0bSc7XG5cbi8qKlxuICogcmVnaXN0ZXJzIGEgc2VsZWN0LXdpZGdldCBjb21wb25lbnQgZm9yIHVzZSBpbiBmb3Jtc1xuICogQGZ1bmN0aW9uIGV4dGVybmFsOlwia28uY29tcG9uZW50c1wiLnNlbGVjdC13aWRnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLnZhbHVlIC0gdGhlIHZhbHVlIGJlaW5nIG1hbmFnZWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMuY29uZmlnIC1cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLmxhYmVsIC0gbGFiZWwgdG8gdXNlIGFsb25nc2lkZSB0aGUgc2VsZWN0IGlucHV0XG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZy5wbGFjZWhvbGRlciAtIGRlZmF1bHQgdGV4dCB0byBzaG93IGluIHRoZSBzZWxlY3QgaW5wdXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLm9wdGlvbnMgLVxuICovXG5cbmNvbnN0IHZpZXdNb2RlbCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHBhcmFtcy5jb25maWdLZXlzID0gWydwbGFjZWhvbGRlcicsICdkZWZhdWx0VmFsdWUnXTtcbiAgICAgICAgXG4gICAgRG9tYWluV2lkZ2V0Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcblxuICAgIHRoaXMubXVsdGlwbGUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3RlcignZG9tYWluLW11bHRpc2VsZWN0LXdpZGdldCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogc2VsZWN0VGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsIkRvbWFpbldpZGdldFZpZXdNb2RlbCIsInNlbGVjdFRlbXBsYXRlIiwidmlld01vZGVsIiwicGFyYW1zIiwiY29uZmlnS2V5cyIsImFwcGx5IiwibXVsdGlwbGUiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ0ZW1wbGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9