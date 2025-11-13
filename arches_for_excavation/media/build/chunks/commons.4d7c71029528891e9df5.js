"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[40270],{

/***/ 40270:
/*!*******************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/domain-checkbox.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var viewmodels_domain_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! viewmodels/domain-widget */ 33257);
/* harmony import */ var templates_views_components_widgets_checkbox_htm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! templates/views/components/widgets/checkbox.htm */ 20825);
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
  this.multiple = true;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('domain-checkbox-widget', {
  viewModel: viewModel,
  template: templates_views_components_widgets_checkbox_htm__WEBPACK_IMPORTED_MODULE_2__
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNGQ3YzcxMDI5NTI4ODkxZTlkZjUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ21DO0FBQ2tCO0FBQzVDOztBQUduQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNRyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQy9CQSxNQUFNLENBQUNDLFVBQVUsR0FBRyxDQUFDLGNBQWMsQ0FBQztFQUdwQ0osZ0VBQXFCLENBQUNLLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQ0YsTUFBTSxDQUFDLENBQUM7RUFFM0MsSUFBSSxDQUFDRyxRQUFRLEdBQUcsSUFBSTtBQUN4QixDQUFDO0FBRUQsaUVBQWVQLDBEQUFhLENBQUNTLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtFQUM1RE4sU0FBUyxFQUFFQSxTQUFTO0VBQ3BCTyxRQUFRLEVBQUVSLDRFQUFnQkE7QUFDOUIsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvZG9tYWluLWNoZWNrYm94LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgRG9tYWluV2lkZ2V0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvZG9tYWluLXdpZGdldCc7XG5pbXBvcnQgY2hlY2tib3hUZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL2NoZWNrYm94Lmh0bSc7XG5pbXBvcnQgJ2JpbmRpbmdzL2tleS1ldmVudHMtY2xpY2snO1xuXG5cbi8qKlxuICogcmVnaXN0ZXJzIGEgc2VsZWN0LXdpZGdldCBjb21wb25lbnQgZm9yIHVzZSBpbiBmb3Jtc1xuICogQGZ1bmN0aW9uIGV4dGVybmFsOlwia28uY29tcG9uZW50c1wiLnNlbGVjdC13aWRnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLnZhbHVlIC0gdGhlIHZhbHVlIGJlaW5nIG1hbmFnZWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMuY29uZmlnIC1cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLmxhYmVsIC0gbGFiZWwgdG8gdXNlIGFsb25nc2lkZSB0aGUgc2VsZWN0IGlucHV0XG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZy5wbGFjZWhvbGRlciAtIGRlZmF1bHQgdGV4dCB0byBzaG93IGluIHRoZSBzZWxlY3QgaW5wdXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLm9wdGlvbnMgLVxuICovXG5cbmNvbnN0IHZpZXdNb2RlbCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHBhcmFtcy5jb25maWdLZXlzID0gWydkZWZhdWx0VmFsdWUnXTtcblxuICAgICAgICBcbiAgICBEb21haW5XaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgdGhpcy5tdWx0aXBsZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdkb21haW4tY2hlY2tib3gtd2lkZ2V0Jywge1xuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiBjaGVja2JveFRlbXBsYXRlLFxufSk7XG4iXSwibmFtZXMiOlsia28iLCJEb21haW5XaWRnZXRWaWV3TW9kZWwiLCJjaGVja2JveFRlbXBsYXRlIiwidmlld01vZGVsIiwicGFyYW1zIiwiY29uZmlnS2V5cyIsImFwcGx5IiwibXVsdGlwbGUiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=