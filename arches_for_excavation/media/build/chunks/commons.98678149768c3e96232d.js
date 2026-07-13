"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[45726],{

/***/ 45726:
/*!*************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/language-switcher.js + 1 modules ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ language_switcher)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/language-switcher.htm
const language_switcher_namespaceObject = "templates/views/components/language-switcher.htm";
// EXTERNAL MODULE: ./node_modules/js-cookie/src/js.cookie.js
var js_cookie = __webpack_require__(12215);
var js_cookie_default = /*#__PURE__*/__webpack_require__.n(js_cookie);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/select2-query.js
var select2_query = __webpack_require__(28192);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/language-switcher.js





/**
* knockout components namespace used in arches
* @external "ko.components"
* @see http://knockoutjs.com/documentation/component-binding.html
*/

/**
* registers a language-switcher component for use in forms
* @function external:"ko.components".language-switcher
* @param {object} params
* @param {string} params.current_language - the currently active language in the application
*/
/* harmony default export */ const language_switcher = (knockout_latest_default().components.register('views/components/language-switcher', {
  viewModel: function viewModel(params) {
    this.formid = Math.random();
    this.value = knockout_latest_default().observable(params.current_language);
    this.csrfToken = js_cookie_default().get('csrftoken');
    this.value.subscribe(function (val) {
      if (val) {
        document.getElementById(this.formid).submit();
      }
    }, this);
  },
  template: language_switcher_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOTg2NzgxNDk3NjhjM2U5NjIzMmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUM4RDtBQUN4RDtBQUNBOztBQUdoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUFlQSxvQ0FBYSxDQUFDSSxRQUFRLENBQUMsb0NBQW9DLEVBQUU7RUFDeEVDLFNBQVMsRUFBRSxTQUFYQSxTQUFTQSxDQUFXQyxNQUFNLEVBQUU7SUFDeEIsSUFBSSxDQUFDQyxNQUFNLEdBQUdDLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUM7SUFDM0IsSUFBSSxDQUFDQyxLQUFLLEdBQUdWLG9DQUFhLENBQUNNLE1BQU0sQ0FBQ00sZ0JBQWdCLENBQUM7SUFDbkQsSUFBSSxDQUFDQyxTQUFTLEdBQUdYLHVCQUFXLENBQUMsV0FBVyxDQUFDO0lBQ3pDLElBQUksQ0FBQ1EsS0FBSyxDQUFDSyxTQUFTLENBQUMsVUFBU0MsR0FBRyxFQUFDO01BQzlCLElBQUlBLEdBQUcsRUFBRTtRQUNMQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxJQUFJLENBQUNYLE1BQU0sQ0FBQyxDQUFDWSxNQUFNLENBQUMsQ0FBQztNQUNqRDtJQUNKLENBQUMsRUFBRSxJQUFJLENBQUM7RUFDWixDQUFDO0VBQ0RDLFFBQVEsRUFBRW5CLGlDQUF3QkE7QUFDdEMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL2xhbmd1YWdlLXN3aXRjaGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgbGFuZ3VhZ2VTd2l0Y2hlclRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2xhbmd1YWdlLXN3aXRjaGVyLmh0bSc7XG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xuaW1wb3J0ICdiaW5kaW5ncy9zZWxlY3QyLXF1ZXJ5JztcblxuXG4vKipcbioga25vY2tvdXQgY29tcG9uZW50cyBuYW1lc3BhY2UgdXNlZCBpbiBhcmNoZXNcbiogQGV4dGVybmFsIFwia28uY29tcG9uZW50c1wiXG4qIEBzZWUgaHR0cDovL2tub2Nrb3V0anMuY29tL2RvY3VtZW50YXRpb24vY29tcG9uZW50LWJpbmRpbmcuaHRtbFxuKi9cblxuLyoqXG4qIHJlZ2lzdGVycyBhIGxhbmd1YWdlLXN3aXRjaGVyIGNvbXBvbmVudCBmb3IgdXNlIGluIGZvcm1zXG4qIEBmdW5jdGlvbiBleHRlcm5hbDpcImtvLmNvbXBvbmVudHNcIi5sYW5ndWFnZS1zd2l0Y2hlclxuKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY3VycmVudF9sYW5ndWFnZSAtIHRoZSBjdXJyZW50bHkgYWN0aXZlIGxhbmd1YWdlIGluIHRoZSBhcHBsaWNhdGlvblxuKi9cbmV4cG9ydCBkZWZhdWx0IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3ZpZXdzL2NvbXBvbmVudHMvbGFuZ3VhZ2Utc3dpdGNoZXInLCB7XG4gICAgdmlld01vZGVsOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5mb3JtaWQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICB0aGlzLnZhbHVlID0ga28ub2JzZXJ2YWJsZShwYXJhbXMuY3VycmVudF9sYW5ndWFnZSk7XG4gICAgICAgIHRoaXMuY3NyZlRva2VuID0gQ29va2llcy5nZXQoJ2NzcmZ0b2tlbicpO1xuICAgICAgICB0aGlzLnZhbHVlLnN1YnNjcmliZShmdW5jdGlvbih2YWwpe1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZm9ybWlkKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogbGFuZ3VhZ2VTd2l0Y2hlclRlbXBsYXRlLFxufSk7XG4iXSwibmFtZXMiOlsia28iLCJsYW5ndWFnZVN3aXRjaGVyVGVtcGxhdGUiLCJDb29raWVzIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwicGFyYW1zIiwiZm9ybWlkIiwiTWF0aCIsInJhbmRvbSIsInZhbHVlIiwib2JzZXJ2YWJsZSIsImN1cnJlbnRfbGFuZ3VhZ2UiLCJjc3JmVG9rZW4iLCJnZXQiLCJzdWJzY3JpYmUiLCJ2YWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3VibWl0IiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==