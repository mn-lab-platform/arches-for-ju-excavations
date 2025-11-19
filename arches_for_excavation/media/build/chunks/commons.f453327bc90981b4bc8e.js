(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[8383],{

/***/ 8383:
/*!***********************************************************!*\
  !*** ./arches_slocal/media/js/reports/resource_report.js ***!
  \***********************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! knockout */ 51786), __webpack_require__(/*! templates/views/report-templates/resource_report.htm */ 29349), __webpack_require__(/*! arches */ 77126), __webpack_require__(/*! views/components/custom/cesium_viewer */ 17149)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (ko, resourceReportTemplate, arches) {
  return ko.components.register('resource_report', {
    viewModel: function viewModel(params) {
      params.configKeys = ['tabs', 'activeTabIndex'];
      this.sections = [{
        id: 'cesium_viewer',
        title: 'Cesium Viewer'
      }];
      this.activeSection = ko.observable('cesium_viewer');
    },
    template: resourceReportTemplate
  });
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 29349:
/*!****************************************************************************!*\
  !*** ./arches_slocal/templates/views/report-templates/resource_report.htm ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "templates/views/report-templates/resource_report.htm";

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZjQ1MzMyN2JjOTA5ODFiNGJjOGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsZ0VBQUFBLGlDQUFPLENBQ0gsMENBQVUsRUFDVixzRkFBc0QsRUFDdEQsd0NBQVEsRUFDUix1RUFBdUMsQ0FDMUMsbUNBQUUsVUFBU0MsRUFBRSxFQUFFQyxzQkFBc0IsRUFBRUMsTUFBTSxFQUFFO0VBQzVDLE9BQU9GLEVBQUUsQ0FBQ0csVUFBVSxDQUFDQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7SUFDN0NDLFNBQVMsRUFBRSxTQUFYQSxTQUFTQSxDQUFXQyxNQUFNLEVBQUU7TUFDeEJBLE1BQU0sQ0FBQ0MsVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDO01BRTlDLElBQUksQ0FBQ0MsUUFBUSxHQUFHLENBQ1o7UUFBRUMsRUFBRSxFQUFFLGVBQWU7UUFBRUMsS0FBSyxFQUFFO01BQWdCLENBQUMsQ0FDbEQ7TUFFRCxJQUFJLENBQUNDLGFBQWEsR0FBR1gsRUFBRSxDQUFDWSxVQUFVLENBQUMsZUFBZSxDQUFDO0lBQ3ZELENBQUM7SUFDREMsUUFBUSxFQUFFWjtFQUNkLENBQUMsQ0FBQztBQUNOLENBQUM7QUFBQSxrR0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL2FyY2hlc19zbG9jYWwvbWVkaWEvanMvcmVwb3J0cy9yZXNvdXJjZV9yZXBvcnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFtcclxuICAgICdrbm9ja291dCcsXHJcbiAgICAndGVtcGxhdGVzL3ZpZXdzL3JlcG9ydC10ZW1wbGF0ZXMvcmVzb3VyY2VfcmVwb3J0Lmh0bScsXHJcbiAgICAnYXJjaGVzJyxcclxuICAgICd2aWV3cy9jb21wb25lbnRzL2N1c3RvbS9jZXNpdW1fdmlld2VyJ1xyXG5dLCBmdW5jdGlvbihrbywgcmVzb3VyY2VSZXBvcnRUZW1wbGF0ZSwgYXJjaGVzKSB7XHJcbiAgICByZXR1cm4ga28uY29tcG9uZW50cy5yZWdpc3RlcigncmVzb3VyY2VfcmVwb3J0Jywge1xyXG4gICAgICAgIHZpZXdNb2RlbDogZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5jb25maWdLZXlzID0gWyd0YWJzJywgJ2FjdGl2ZVRhYkluZGV4J107XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlY3Rpb25zID0gW1xyXG4gICAgICAgICAgICAgICAgeyBpZDogJ2Nlc2l1bV92aWV3ZXInLCB0aXRsZTogJ0Nlc2l1bSBWaWV3ZXInIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU2VjdGlvbiA9IGtvLm9ic2VydmFibGUoJ2Nlc2l1bV92aWV3ZXInKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXNvdXJjZVJlcG9ydFRlbXBsYXRlXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4iXSwibmFtZXMiOlsiZGVmaW5lIiwia28iLCJyZXNvdXJjZVJlcG9ydFRlbXBsYXRlIiwiYXJjaGVzIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwicGFyYW1zIiwiY29uZmlnS2V5cyIsInNlY3Rpb25zIiwiaWQiLCJ0aXRsZSIsImFjdGl2ZVNlY3Rpb24iLCJvYnNlcnZhYmxlIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9