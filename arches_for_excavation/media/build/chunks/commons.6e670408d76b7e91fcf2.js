"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[53720],{

/***/ 53720:
/*!***********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/concept-multiselect.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var viewmodels_concept_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! viewmodels/concept-select */ 10771);
/* harmony import */ var templates_views_components_widgets_concept_select_htm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! templates/views/components/widgets/concept-select.htm */ 11855);
/* harmony import */ var bindings_select2_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bindings/select2-query */ 28192);




var viewModel = function viewModel(params) {
  params.multiple = true;
  params.configKeys = ['defaultValue'];
  viewmodels_concept_select__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, [params]);
  var defaultValue = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(this.defaultValue);
  var self = this;
  if (self.configForm) {
    self.select2Config.value = self.defaultValue;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('concept-multiselect-widget', {
  viewModel: viewModel,
  template: templates_views_components_widgets_concept_select_htm__WEBPACK_IMPORTED_MODULE_2__
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNmU2NzA0MDhkNzZiN2U5MWZjZjIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ3FDO0FBQ2dDO0FBQy9EO0FBR2hDLElBQU1HLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFZQyxNQUFNLEVBQUU7RUFDL0JBLE1BQU0sQ0FBQ0MsUUFBUSxHQUFHLElBQUk7RUFDdEJELE1BQU0sQ0FBQ0UsVUFBVSxHQUFHLENBQUMsY0FBYyxDQUFDO0VBR3BDTCxpRUFBc0IsQ0FBQ00sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDSCxNQUFNLENBQUMsQ0FBQztFQUU1QyxJQUFJSSxZQUFZLEdBQUdSLHNEQUFTLENBQUMsSUFBSSxDQUFDUSxZQUFZLENBQUM7RUFDL0MsSUFBSUUsSUFBSSxHQUFHLElBQUk7RUFFZixJQUFJQSxJQUFJLENBQUNDLFVBQVUsRUFBQztJQUNoQkQsSUFBSSxDQUFDRSxhQUFhLENBQUNDLEtBQUssR0FBR0gsSUFBSSxDQUFDRixZQUFZO0VBQ2hEO0FBQ0osQ0FBQztBQUVELGlFQUFlUiwwREFBYSxDQUFDZSxRQUFRLENBQUMsNEJBQTRCLEVBQUU7RUFDaEVaLFNBQVMsRUFBRUEsU0FBUztFQUNwQmEsUUFBUSxFQUFFZCxrRkFBMEJBO0FBQ3hDLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL2NvbmNlcHQtbXVsdGlzZWxlY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBDb25jZXB0U2VsZWN0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvY29uY2VwdC1zZWxlY3QnO1xuaW1wb3J0IGNvbmNlcHRNdWx0aXNlbGVjdFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvY29uY2VwdC1zZWxlY3QuaHRtJztcbmltcG9ydCAnYmluZGluZ3Mvc2VsZWN0Mi1xdWVyeSc7XG5cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgcGFyYW1zLm11bHRpcGxlID0gdHJ1ZTtcbiAgICBwYXJhbXMuY29uZmlnS2V5cyA9IFsnZGVmYXVsdFZhbHVlJ107XG5cbiAgICAgICAgXG4gICAgQ29uY2VwdFNlbGVjdFZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG5cbiAgICB2YXIgZGVmYXVsdFZhbHVlID0ga28udW53cmFwKHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAoc2VsZi5jb25maWdGb3JtKXtcbiAgICAgICAgc2VsZi5zZWxlY3QyQ29uZmlnLnZhbHVlID0gc2VsZi5kZWZhdWx0VmFsdWU7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3RlcignY29uY2VwdC1tdWx0aXNlbGVjdC13aWRnZXQnLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IGNvbmNlcHRNdWx0aXNlbGVjdFRlbXBsYXRlLFxufSk7XG4iXSwibmFtZXMiOlsia28iLCJDb25jZXB0U2VsZWN0Vmlld01vZGVsIiwiY29uY2VwdE11bHRpc2VsZWN0VGVtcGxhdGUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJtdWx0aXBsZSIsImNvbmZpZ0tleXMiLCJhcHBseSIsImRlZmF1bHRWYWx1ZSIsInVud3JhcCIsInNlbGYiLCJjb25maWdGb3JtIiwic2VsZWN0MkNvbmZpZyIsInZhbHVlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==