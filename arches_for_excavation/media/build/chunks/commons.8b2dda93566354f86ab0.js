"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[68772],{

/***/ 68772:
/*!********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/concept-checkbox.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var viewmodels_concept_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! viewmodels/concept-widget */ 29487);
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
  viewmodels_concept_widget__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, [params]);
  this.multiple = true;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('concept-checkbox-widget', {
  viewModel: viewModel,
  template: templates_views_components_widgets_checkbox_htm__WEBPACK_IMPORTED_MODULE_2__
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOGIyZGRhOTM1NjYzNTRmODZhYjAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ3FDO0FBQ3VCO0FBQ25EOztBQUduQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNRyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBRS9CQSxNQUFNLENBQUNDLFVBQVUsR0FBRyxDQUFDLGNBQWMsQ0FBQztFQUNwQ0osaUVBQXNCLENBQUNLLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQ0YsTUFBTSxDQUFDLENBQUM7RUFFNUMsSUFBSSxDQUFDRyxRQUFRLEdBQUcsSUFBSTtBQUN4QixDQUFDO0FBRUQsaUVBQWVQLDBEQUFhLENBQUNTLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtFQUM3RE4sU0FBUyxFQUFFQSxTQUFTO0VBQ3BCTyxRQUFRLEVBQUVSLDRFQUF1QkE7QUFDckMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvY29uY2VwdC1jaGVja2JveC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IENvbmNlcHRXaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy9jb25jZXB0LXdpZGdldCc7XG5pbXBvcnQgY29uY2VwdENoZWNrYm94VGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9jaGVja2JveC5odG0nO1xuaW1wb3J0ICdiaW5kaW5ncy9rZXktZXZlbnRzLWNsaWNrJztcblxuXG4vKipcbiAqIHJlZ2lzdGVycyBhIHNlbGVjdC13aWRnZXQgY29tcG9uZW50IGZvciB1c2UgaW4gZm9ybXNcbiAqIEBmdW5jdGlvbiBleHRlcm5hbDpcImtvLmNvbXBvbmVudHNcIi5zZWxlY3Qtd2lkZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy52YWx1ZSAtIHRoZSB2YWx1ZSBiZWluZyBtYW5hZ2VkXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zLmNvbmZpZyAtXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZy5sYWJlbCAtIGxhYmVsIHRvIHVzZSBhbG9uZ3NpZGUgdGhlIHNlbGVjdCBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcucGxhY2Vob2xkZXIgLSBkZWZhdWx0IHRleHQgdG8gc2hvdyBpbiB0aGUgc2VsZWN0IGlucHV0XG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZy5vcHRpb25zIC1cbiAqL1xuXG5jb25zdCB2aWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgXG4gICAgcGFyYW1zLmNvbmZpZ0tleXMgPSBbJ2RlZmF1bHRWYWx1ZSddO1xuICAgIENvbmNlcHRXaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgdGhpcy5tdWx0aXBsZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjb25jZXB0LWNoZWNrYm94LXdpZGdldCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogY29uY2VwdENoZWNrYm94VGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsIkNvbmNlcHRXaWRnZXRWaWV3TW9kZWwiLCJjb25jZXB0Q2hlY2tib3hUZW1wbGF0ZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsImNvbmZpZ0tleXMiLCJhcHBseSIsIm11bHRpcGxlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9