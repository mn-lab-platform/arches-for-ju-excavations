"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[61223],{

/***/ 61223:
/*!**************************************************************!*\
  !*** ./arches_slocal/media/js/reports/resource-3d-report.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var templates_views_report_templates_tabbed_htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! templates/views/report-templates/tabbed.htm */ 41234);
/* harmony import */ var _viewmodels_mixins_tab_report_setup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../viewmodels/mixins/tab-report-setup */ 90405);
/* harmony import */ var views_components_custom_cesium_viewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/components/custom/cesium-viewer */ 79388);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('resource-3d-report', {
  viewModel: function viewModel(params) {
    var self = this;
    var myTabs = [knockout__WEBPACK_IMPORTED_MODULE_0___default().mapping.fromJS({
      name: 'Info',
      icon: 'fa-info-circle',
      main_component: undefined,
      nodegroup_ids: []
    }), knockout__WEBPACK_IMPORTED_MODULE_0___default().mapping.fromJS({
      name: 'Cesium Viewer',
      icon: 'fa-cube',
      main_component: 'cesium-viewer',
      nodegroup_ids: []
    })];
    (0,_viewmodels_mixins_tab_report_setup__WEBPACK_IMPORTED_MODULE_2__.setupTabbedReport)(self, params, myTabs);
  },
  template: templates_views_report_templates_tabbed_htm__WEBPACK_IMPORTED_MODULE_1__
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYTA2YWM3ZmQ1ZTNlMWE2ZjBlYzMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ3FEO0FBQ0w7QUFDM0I7QUFFL0MsaUVBQWVBLDBEQUFhLENBQUNJLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtFQUN4REMsU0FBUyxFQUFFLFNBQVhBLFNBQVNBLENBQVdDLE1BQU0sRUFBRTtJQUN4QixJQUFNQyxJQUFJLEdBQUcsSUFBSTtJQUNqQixJQUFNQyxNQUFNLEdBQUcsQ0FDWFIsdURBQVUsQ0FBQ1UsTUFBTSxDQUFDO01BQ2RDLElBQUksRUFBRSxNQUFNO01BQ1pDLElBQUksRUFBRSxnQkFBZ0I7TUFDdEJDLGNBQWMsRUFBRUMsU0FBUztNQUN6QkMsYUFBYSxFQUFFO0lBQ25CLENBQUMsQ0FBQyxFQUNGZix1REFBVSxDQUFDVSxNQUFNLENBQUM7TUFDZEMsSUFBSSxFQUFFLGVBQWU7TUFDckJDLElBQUksRUFBRSxTQUFTO01BQ2ZDLGNBQWMsRUFBRSxlQUFlO01BQy9CRSxhQUFhLEVBQUU7SUFDbkIsQ0FBQyxDQUFDLENBQ0w7SUFDRGIsc0ZBQWlCLENBQUNLLElBQUksRUFBRUQsTUFBTSxFQUFFRSxNQUFNLENBQUM7RUFDM0MsQ0FBQztFQUNEUSxRQUFRLEVBQUVmLHdFQUFvQkE7QUFDbEMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vYXJjaGVzX3Nsb2NhbC9tZWRpYS9qcy9yZXBvcnRzL3Jlc291cmNlLTNkLXJlcG9ydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xyXG5pbXBvcnQgdGFiYmVkUmVwb3J0VGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL3JlcG9ydC10ZW1wbGF0ZXMvdGFiYmVkLmh0bSc7XHJcbmltcG9ydCB7IHNldHVwVGFiYmVkUmVwb3J0IH0gZnJvbSAnLi4vdmlld21vZGVscy9taXhpbnMvdGFiLXJlcG9ydC1zZXR1cCc7XHJcbmltcG9ydCAndmlld3MvY29tcG9uZW50cy9jdXN0b20vY2VzaXVtLXZpZXdlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdyZXNvdXJjZS0zZC1yZXBvcnQnLCB7XHJcbiAgICB2aWV3TW9kZWw6IGZ1bmN0aW9uKHBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG15VGFicyA9IFtcclxuICAgICAgICAgICAga28ubWFwcGluZy5mcm9tSlMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0luZm8nLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhLWluZm8tY2lyY2xlJyxcclxuICAgICAgICAgICAgICAgIG1haW5fY29tcG9uZW50OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBub2RlZ3JvdXBfaWRzOiBbXVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAga28ubWFwcGluZy5mcm9tSlMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0Nlc2l1bSBWaWV3ZXInLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhLWN1YmUnLFxyXG4gICAgICAgICAgICAgICAgbWFpbl9jb21wb25lbnQ6ICdjZXNpdW0tdmlld2VyJyxcclxuICAgICAgICAgICAgICAgIG5vZGVncm91cF9pZHM6IFtdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICBzZXR1cFRhYmJlZFJlcG9ydChzZWxmLCBwYXJhbXMsIG15VGFicyk7XHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6IHRhYmJlZFJlcG9ydFRlbXBsYXRlXHJcbn0pOyJdLCJuYW1lcyI6WyJrbyIsInRhYmJlZFJlcG9ydFRlbXBsYXRlIiwic2V0dXBUYWJiZWRSZXBvcnQiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwibXlUYWJzIiwibWFwcGluZyIsImZyb21KUyIsIm5hbWUiLCJpY29uIiwibWFpbl9jb21wb25lbnQiLCJ1bmRlZmluZWQiLCJub2RlZ3JvdXBfaWRzIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9