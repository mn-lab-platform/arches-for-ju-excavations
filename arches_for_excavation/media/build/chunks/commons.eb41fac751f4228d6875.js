"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[37555],{

/***/ 37555:
/*!*********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/icon-selector.js + 1 modules ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ icon_selector)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/icon-selector.htm
const icon_selector_namespaceObject = "templates/views/components/icon-selector.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/key-events-click.js
var key_events_click = __webpack_require__(40513);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/icon-selector.js




/**
* knockout components namespace used in arches
* @external "ko.components"
* @see http://knockoutjs.com/documentation/component-binding.html
*/

/**
* registers a icon-selector component for use in forms
* @function external:"ko.components".icon-selector
* @param {object} params
* @param {observable} params.selectedIconObservable - the currently selected icon
* @param {observable} params.iconFilter
* @param {array} params.iconList
* @param {string} params.label
*/
/* harmony default export */ const icon_selector = (knockout_latest_default().components.register('views/components/icon-selector', {
  viewModel: function viewModel(params) {
    this.selectedIcon = params.selectedIconObservable;
    this.iconFilter = params.iconFilter;
    this.iconList = params.iconList;
    this.label = params.label;
  },
  template: icon_selector_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZWI0MWZhYzc1MWY0MjI4ZDY4NzUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNzRDtBQUM3Qzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBZUEsb0NBQWEsQ0FBQ0csUUFBUSxDQUFDLGdDQUFnQyxFQUFFO0VBQ3BFQyxTQUFTLEVBQUUsU0FBWEEsU0FBU0EsQ0FBV0MsTUFBTSxFQUFFO0lBRXhCLElBQUksQ0FBQ0MsWUFBWSxHQUFHRCxNQUFNLENBQUNFLHNCQUFzQjtJQUNqRCxJQUFJLENBQUNDLFVBQVUsR0FBR0gsTUFBTSxDQUFDRyxVQUFVO0lBQ25DLElBQUksQ0FBQ0MsUUFBUSxHQUFHSixNQUFNLENBQUNJLFFBQVE7SUFDL0IsSUFBSSxDQUFDQyxLQUFLLEdBQUdMLE1BQU0sQ0FBQ0ssS0FBSztFQUM3QixDQUFDO0VBQ0RDLFFBQVEsRUFBRVYsNkJBQW9CQTtBQUNsQyxDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvaWNvbi1zZWxlY3Rvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGljb25TZWxlY3RvclRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2ljb24tc2VsZWN0b3IuaHRtJztcbmltcG9ydCAnYmluZGluZ3Mva2V5LWV2ZW50cy1jbGljayc7XG5cbi8qKlxuKiBrbm9ja291dCBjb21wb25lbnRzIG5hbWVzcGFjZSB1c2VkIGluIGFyY2hlc1xuKiBAZXh0ZXJuYWwgXCJrby5jb21wb25lbnRzXCJcbiogQHNlZSBodHRwOi8va25vY2tvdXRqcy5jb20vZG9jdW1lbnRhdGlvbi9jb21wb25lbnQtYmluZGluZy5odG1sXG4qL1xuXG4vKipcbiogcmVnaXN0ZXJzIGEgaWNvbi1zZWxlY3RvciBjb21wb25lbnQgZm9yIHVzZSBpbiBmb3Jtc1xuKiBAZnVuY3Rpb24gZXh0ZXJuYWw6XCJrby5jb21wb25lbnRzXCIuaWNvbi1zZWxlY3RvclxuKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXG4qIEBwYXJhbSB7b2JzZXJ2YWJsZX0gcGFyYW1zLnNlbGVjdGVkSWNvbk9ic2VydmFibGUgLSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGljb25cbiogQHBhcmFtIHtvYnNlcnZhYmxlfSBwYXJhbXMuaWNvbkZpbHRlclxuKiBAcGFyYW0ge2FycmF5fSBwYXJhbXMuaWNvbkxpc3RcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5sYWJlbFxuKi9cbmV4cG9ydCBkZWZhdWx0IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3ZpZXdzL2NvbXBvbmVudHMvaWNvbi1zZWxlY3RvcicsIHtcbiAgICB2aWV3TW9kZWw6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJY29uID0gcGFyYW1zLnNlbGVjdGVkSWNvbk9ic2VydmFibGU7XG4gICAgICAgIHRoaXMuaWNvbkZpbHRlciA9IHBhcmFtcy5pY29uRmlsdGVyO1xuICAgICAgICB0aGlzLmljb25MaXN0ID0gcGFyYW1zLmljb25MaXN0O1xuICAgICAgICB0aGlzLmxhYmVsID0gcGFyYW1zLmxhYmVsO1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGljb25TZWxlY3RvclRlbXBsYXRlXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsImljb25TZWxlY3RvclRlbXBsYXRlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZWN0ZWRJY29uIiwic2VsZWN0ZWRJY29uT2JzZXJ2YWJsZSIsImljb25GaWx0ZXIiLCJpY29uTGlzdCIsImxhYmVsIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9