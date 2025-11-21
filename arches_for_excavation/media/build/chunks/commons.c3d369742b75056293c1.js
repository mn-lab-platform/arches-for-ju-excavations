"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[25130],{

/***/ 25130:
/*!*********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/function-manager/function-list.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var views_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! views/list */ 38777);

var FunctionList = views_list__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  /**
  * A backbone view to manage a list of functions
  * @augments ListView
  * @constructor
  * @name FunctionList
  */

  filterFunction: null,
  /**
  * initializes the view with optional parameters
  * @memberof FunctionList.prototype
  * @param {object} options
  * @param {object} options.functions - a list of {@link FunctionModel} models
  */
  initialize: function initialize(options) {
    this.items = options.functions;
    this.items.sort(function (left, right) {
      return left.name().toLowerCase() == right.name().toLowerCase() ? 0 : left.name().toLowerCase() < right.name().toLowerCase() ? -1 : 1;
    });
    views_list__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.initialize.apply(this, arguments);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FunctionList);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYzNkMzY5NzQyYjc1MDU2MjkzYzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7QUFHbEMsSUFBSUMsWUFBWSxHQUFHRCxrREFBUSxDQUFDRSxNQUFNLENBQUM7RUFDL0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVJQyxjQUFjLEVBQUUsSUFBSTtFQUVwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSUMsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQVdDLE9BQU8sRUFBRTtJQUMxQixJQUFJLENBQUNDLEtBQUssR0FBR0QsT0FBTyxDQUFDRSxTQUFTO0lBQzlCLElBQUksQ0FBQ0QsS0FBSyxDQUFDRSxJQUFJLENBQUMsVUFBU0MsSUFBSSxFQUFFQyxLQUFLLEVBQUU7TUFDbEMsT0FBT0QsSUFBSSxDQUFDRSxJQUFJLENBQUMsQ0FBQyxDQUFDQyxXQUFXLENBQUMsQ0FBQyxJQUFJRixLQUFLLENBQUNDLElBQUksQ0FBQyxDQUFDLENBQUNDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFJSCxJQUFJLENBQUNFLElBQUksQ0FBQyxDQUFDLENBQUNDLFdBQVcsQ0FBQyxDQUFDLEdBQUdGLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFFO0lBQzFJLENBQUMsQ0FBQztJQUNGWixrREFBUSxDQUFDYSxTQUFTLENBQUNULFVBQVUsQ0FBQ1UsS0FBSyxDQUFDLElBQUksRUFBRUMsU0FBUyxDQUFDO0VBQ3hEO0FBRUosQ0FBQyxDQUFDO0FBQ0YsaUVBQWVkLFlBQVksRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2dyYXBoL2Z1bmN0aW9uLW1hbmFnZXIvZnVuY3Rpb24tbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlzdFZpZXcgZnJvbSAndmlld3MvbGlzdCc7XG5cblxudmFyIEZ1bmN0aW9uTGlzdCA9IExpc3RWaWV3LmV4dGVuZCh7XG4gICAgLyoqXG4gICAgKiBBIGJhY2tib25lIHZpZXcgdG8gbWFuYWdlIGEgbGlzdCBvZiBmdW5jdGlvbnNcbiAgICAqIEBhdWdtZW50cyBMaXN0Vmlld1xuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKiBAbmFtZSBGdW5jdGlvbkxpc3RcbiAgICAqL1xuXG4gICAgZmlsdGVyRnVuY3Rpb246IG51bGwsXG5cbiAgICAvKipcbiAgICAqIGluaXRpYWxpemVzIHRoZSB2aWV3IHdpdGggb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICogQG1lbWJlcm9mIEZ1bmN0aW9uTGlzdC5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5mdW5jdGlvbnMgLSBhIGxpc3Qgb2Yge0BsaW5rIEZ1bmN0aW9uTW9kZWx9IG1vZGVsc1xuICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aGlzLml0ZW1zID0gb3B0aW9ucy5mdW5jdGlvbnM7XG4gICAgICAgIHRoaXMuaXRlbXMuc29ydChmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGxlZnQubmFtZSgpLnRvTG93ZXJDYXNlKCkgPT0gcmlnaHQubmFtZSgpLnRvTG93ZXJDYXNlKCkgPyAwIDogKGxlZnQubmFtZSgpLnRvTG93ZXJDYXNlKCkgPCByaWdodC5uYW1lKCkudG9Mb3dlckNhc2UoKSA/IC0xIDogMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBMaXN0Vmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxufSk7XG5leHBvcnQgZGVmYXVsdCBGdW5jdGlvbkxpc3Q7XG4iXSwibmFtZXMiOlsiTGlzdFZpZXciLCJGdW5jdGlvbkxpc3QiLCJleHRlbmQiLCJmaWx0ZXJGdW5jdGlvbiIsImluaXRpYWxpemUiLCJvcHRpb25zIiwiaXRlbXMiLCJmdW5jdGlvbnMiLCJzb3J0IiwibGVmdCIsInJpZ2h0IiwibmFtZSIsInRvTG93ZXJDYXNlIiwicHJvdG90eXBlIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwic291cmNlUm9vdCI6IiJ9