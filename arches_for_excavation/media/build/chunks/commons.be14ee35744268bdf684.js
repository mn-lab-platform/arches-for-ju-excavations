"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[14321],{

/***/ 14321:
/*!**********************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/non-localized-text.js + 1 modules ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ non_localized_text)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/widget.js
var widget = __webpack_require__(77260);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/non-localized-text.htm
const non_localized_text_namespaceObject = "templates/views/components/widgets/non-localized-text.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/non-localized-text.js






/**
* registers a text-widget component for use in forms
* @function external:"ko.components".text-widget
* @param {object} params
* @param {string} params.value - the value being managed
* @param {function} params.config - observable containing config object
* @param {string} params.config().label - label to use alongside the text input
* @param {string} params.config().placeholder - default text to show in the text input
* @param {string} params.config().uneditable - disables widget
*/

var viewModel = function viewModel(params) {
  params.configKeys = ['placeholder', 'width', 'maxLength', 'defaultValue', 'uneditable'];
  widget["default"].apply(this, [params]);
  var self = this;
  this.disable = knockout_latest_default().computed(function () {
    return knockout_latest_default().unwrap(self.disabled) || knockout_latest_default().unwrap(self.uneditable);
  }, self);
};
/* harmony default export */ const non_localized_text = (knockout_latest_default().components.register('non-localized-text-widget', {
  viewModel: viewModel,
  template: non_localized_text_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYmUxNGVlMzU3NDQyNjhiZGY2ODQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDQztBQUNxQjtBQUNwQjtBQUMyRTs7QUFHdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUssU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQVlDLE1BQU0sRUFBRTtFQUMvQkEsTUFBTSxDQUFDQyxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDO0VBRW5GTCxpQkFBZSxDQUFDTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUNGLE1BQU0sQ0FBQyxDQUFDO0VBRXJDLElBQU1HLElBQUksR0FBRyxJQUFJO0VBRWpCLElBQUksQ0FBQ0MsT0FBTyxHQUFHVixrQ0FBVyxDQUFDLFlBQU07SUFDN0IsT0FBT0EsZ0NBQVMsQ0FBQ1MsSUFBSSxDQUFDSSxRQUFRLENBQUMsSUFBSWIsZ0NBQVMsQ0FBQ1MsSUFBSSxDQUFDSyxVQUFVLENBQUM7RUFDakUsQ0FBQyxFQUFFTCxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELHlEQUFlVCxvQ0FBYSxDQUFDZ0IsUUFBUSxDQUFDLDJCQUEyQixFQUFFO0VBQy9EWCxTQUFTLEVBQUVBLFNBQVM7RUFDcEJZLFFBQVEsRUFBRWIsa0NBQThCQTtBQUM1QyxDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9ub24tbG9jYWxpemVkLXRleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IFdpZGdldFZpZXdNb2RlbCBmcm9tICd2aWV3bW9kZWxzL3dpZGdldCc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgbm9ubG9jYWxpemVkVGV4dFdpZGdldFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvbm9uLWxvY2FsaXplZC10ZXh0Lmh0bSc7XG5cblxuLyoqXG4qIHJlZ2lzdGVycyBhIHRleHQtd2lkZ2V0IGNvbXBvbmVudCBmb3IgdXNlIGluIGZvcm1zXG4qIEBmdW5jdGlvbiBleHRlcm5hbDpcImtvLmNvbXBvbmVudHNcIi50ZXh0LXdpZGdldFxuKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMudmFsdWUgLSB0aGUgdmFsdWUgYmVpbmcgbWFuYWdlZFxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBwYXJhbXMuY29uZmlnIC0gb2JzZXJ2YWJsZSBjb250YWluaW5nIGNvbmZpZyBvYmplY3RcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcoKS5sYWJlbCAtIGxhYmVsIHRvIHVzZSBhbG9uZ3NpZGUgdGhlIHRleHQgaW5wdXRcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcoKS5wbGFjZWhvbGRlciAtIGRlZmF1bHQgdGV4dCB0byBzaG93IGluIHRoZSB0ZXh0IGlucHV0XG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnKCkudW5lZGl0YWJsZSAtIGRpc2FibGVzIHdpZGdldFxuKi9cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgcGFyYW1zLmNvbmZpZ0tleXMgPSBbJ3BsYWNlaG9sZGVyJywgJ3dpZHRoJywgJ21heExlbmd0aCcsICdkZWZhdWx0VmFsdWUnLCAndW5lZGl0YWJsZSddO1xuXG4gICAgICAgIFdpZGdldFZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG5cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlID0ga28uY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtvLnVud3JhcChzZWxmLmRpc2FibGVkKSB8fCBrby51bndyYXAoc2VsZi51bmVkaXRhYmxlKTsgXG4gICAgICAgIH0sIHNlbGYpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3Rlcignbm9uLWxvY2FsaXplZC10ZXh0LXdpZGdldCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogbm9ubG9jYWxpemVkVGV4dFdpZGdldFRlbXBsYXRlXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsIl8iLCJXaWRnZXRWaWV3TW9kZWwiLCJhcmNoZXMiLCJub25sb2NhbGl6ZWRUZXh0V2lkZ2V0VGVtcGxhdGUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJjb25maWdLZXlzIiwiYXBwbHkiLCJzZWxmIiwiZGlzYWJsZSIsImNvbXB1dGVkIiwidW53cmFwIiwiZGlzYWJsZWQiLCJ1bmVkaXRhYmxlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9