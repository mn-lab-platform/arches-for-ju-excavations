"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[1463],{

/***/ 1463:
/*!***********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/permission-manager/identity-list.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var views_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/list */ 38777);


var IdentityList = views_list__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
  /**
  * A backbone view to manage a list of graph nodes
  * @augments ListView
  * @constructor
  * @name IdentityList
  */

  singleSelect: true,
  /**
  * initializes the view with optional parameters
  * @memberof IdentityList.prototype
  * @param {object} options
  * @param {boolean} options.permissions - a list of allowable permissions
  * @param {boolean} options.card - a reference to the selected {@link CardModel}
  */
  initialize: function initialize(options) {
    views_list__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.initialize.apply(this, arguments);
    this.items = options.items;
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IdentityList);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMGM5ZjQ3MjY1ODk0YjJjNGY2NjIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNRO0FBR2xDLElBQUlFLFlBQVksR0FBR0Qsa0RBQVEsQ0FBQ0UsTUFBTSxDQUFDO0VBQy9CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7RUFFSUMsWUFBWSxFQUFFLElBQUk7RUFFbEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSUMsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQVdDLE9BQU8sRUFBRTtJQUMxQkwsa0RBQVEsQ0FBQ00sU0FBUyxDQUFDRixVQUFVLENBQUNHLEtBQUssQ0FBQyxJQUFJLEVBQUVDLFNBQVMsQ0FBQztJQUNwRCxJQUFJLENBQUNDLEtBQUssR0FBR0osT0FBTyxDQUFDSSxLQUFLO0VBQzlCO0FBRUosQ0FBQyxDQUFDO0FBQ0YsaUVBQWVSLFlBQVksRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2dyYXBoL3Blcm1pc3Npb24tbWFuYWdlci9pZGVudGl0eS1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgTGlzdFZpZXcgZnJvbSAndmlld3MvbGlzdCc7XG5cblxudmFyIElkZW50aXR5TGlzdCA9IExpc3RWaWV3LmV4dGVuZCh7XG4gICAgLyoqXG4gICAgKiBBIGJhY2tib25lIHZpZXcgdG8gbWFuYWdlIGEgbGlzdCBvZiBncmFwaCBub2Rlc1xuICAgICogQGF1Z21lbnRzIExpc3RWaWV3XG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqIEBuYW1lIElkZW50aXR5TGlzdFxuICAgICovXG5cbiAgICBzaW5nbGVTZWxlY3Q6IHRydWUsXG5cbiAgICAvKipcbiAgICAqIGluaXRpYWxpemVzIHRoZSB2aWV3IHdpdGggb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICogQG1lbWJlcm9mIElkZW50aXR5TGlzdC5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGVybWlzc2lvbnMgLSBhIGxpc3Qgb2YgYWxsb3dhYmxlIHBlcm1pc3Npb25zXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuY2FyZCAtIGEgcmVmZXJlbmNlIHRvIHRoZSBzZWxlY3RlZCB7QGxpbmsgQ2FyZE1vZGVsfVxuICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBMaXN0Vmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLml0ZW1zID0gb3B0aW9ucy5pdGVtcztcbiAgICB9XG5cbn0pO1xuZXhwb3J0IGRlZmF1bHQgSWRlbnRpdHlMaXN0O1xuIl0sIm5hbWVzIjpbImtvIiwiTGlzdFZpZXciLCJJZGVudGl0eUxpc3QiLCJleHRlbmQiLCJzaW5nbGVTZWxlY3QiLCJpbml0aWFsaXplIiwib3B0aW9ucyIsInByb3RvdHlwZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiaXRlbXMiXSwic291cmNlUm9vdCI6IiJ9