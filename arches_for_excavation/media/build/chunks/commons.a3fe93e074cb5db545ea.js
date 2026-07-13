"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[19128],{

/***/ 19128:
/*!******************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/graph-page-view.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var views_base_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/base-manager */ 18646);
/* harmony import */ var views_graph_graph_base_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/graph/graph-base-data */ 70855);
/* harmony import */ var bindings_chosen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bindings/chosen */ 63777);






/**
* A backbone view representing a page in the graph manager workflow.  It
* adds some graph manager specfic values to the view model.
*
* @augments BaseManager
* @constructor
* @name GraphPageView
*/
var GraphPageView = views_base_manager__WEBPACK_IMPORTED_MODULE_2__["default"].extend({
  /**
  * Creates an instance of GraphPageView, optionally using a passed in
  * view model
  *
  * @memberof GraphPageView.prototype
  * @param {object} options
  * @param {object} options.viewModel - an optional view model to be
  *                 bound to the page
  * @return {object} an instance of GraphPageView
  */
  constructor: function constructor(options) {
    var self = this;
    options.viewModel.graphid = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(views_graph_graph_base_data__WEBPACK_IMPORTED_MODULE_3__["default"].graphid);
    views_base_manager__WEBPACK_IMPORTED_MODULE_2__["default"].apply(this, arguments);
    options.viewModel.graphid.subscribe(function (graphid) {
      var re = /\b[a-f\d-]{36}\b/;
      var newPath = window.location.pathname.replace(re, graphid);
      self.viewModel.navigate(newPath);
    });
    return this;
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GraphPageView);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYTNmZTkzZTA3NGNiNWRiNTQ1ZWEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDQztBQUNrQjtBQUNFO0FBQ3RCOztBQUd6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUksYUFBYSxHQUFHRiwwREFBVyxDQUFDRyxNQUFNLENBQUM7RUFDbkM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSUMsV0FBVyxFQUFFLFNBQWJBLFdBQVdBLENBQVdDLE9BQU8sRUFBRTtJQUMzQixJQUFJQyxJQUFJLEdBQUcsSUFBSTtJQUNmRCxPQUFPLENBQUNFLFNBQVMsQ0FBQ0MsT0FBTyxHQUFHViwwREFBYSxDQUFDRyxtRUFBSSxDQUFDTyxPQUFPLENBQUM7SUFDdkRSLDBEQUFXLENBQUNVLEtBQUssQ0FBQyxJQUFJLEVBQUVDLFNBQVMsQ0FBQztJQUNsQ04sT0FBTyxDQUFDRSxTQUFTLENBQUNDLE9BQU8sQ0FBQ0ksU0FBUyxDQUFDLFVBQVNKLE9BQU8sRUFBRTtNQUNsRCxJQUFJSyxFQUFFLEdBQUcsa0JBQWtCO01BQzNCLElBQUlDLE9BQU8sR0FBR0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDTCxFQUFFLEVBQUVMLE9BQU8sQ0FBQztNQUMzREYsSUFBSSxDQUFDQyxTQUFTLENBQUNZLFFBQVEsQ0FBQ0wsT0FBTyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUNGLE9BQU8sSUFBSTtFQUNmO0FBQ0osQ0FBQyxDQUFDO0FBQ0YsaUVBQWVaLGFBQWEsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2dyYXBoL2dyYXBoLXBhZ2Utdmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSAndmlld3MvYmFzZS1tYW5hZ2VyJztcbmltcG9ydCBkYXRhIGZyb20gJ3ZpZXdzL2dyYXBoL2dyYXBoLWJhc2UtZGF0YSc7XG5pbXBvcnQgJ2JpbmRpbmdzL2Nob3Nlbic7XG5cblxuLyoqXG4qIEEgYmFja2JvbmUgdmlldyByZXByZXNlbnRpbmcgYSBwYWdlIGluIHRoZSBncmFwaCBtYW5hZ2VyIHdvcmtmbG93LiAgSXRcbiogYWRkcyBzb21lIGdyYXBoIG1hbmFnZXIgc3BlY2ZpYyB2YWx1ZXMgdG8gdGhlIHZpZXcgbW9kZWwuXG4qXG4qIEBhdWdtZW50cyBCYXNlTWFuYWdlclxuKiBAY29uc3RydWN0b3JcbiogQG5hbWUgR3JhcGhQYWdlVmlld1xuKi9cbnZhciBHcmFwaFBhZ2VWaWV3ID0gQmFzZU1hbmFnZXIuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR3JhcGhQYWdlVmlldywgb3B0aW9uYWxseSB1c2luZyBhIHBhc3NlZCBpblxuICAgICogdmlldyBtb2RlbFxuICAgICpcbiAgICAqIEBtZW1iZXJvZiBHcmFwaFBhZ2VWaWV3LnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnZpZXdNb2RlbCAtIGFuIG9wdGlvbmFsIHZpZXcgbW9kZWwgdG8gYmVcbiAgICAqICAgICAgICAgICAgICAgICBib3VuZCB0byB0aGUgcGFnZVxuICAgICogQHJldHVybiB7b2JqZWN0fSBhbiBpbnN0YW5jZSBvZiBHcmFwaFBhZ2VWaWV3XG4gICAgKi9cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG9wdGlvbnMudmlld01vZGVsLmdyYXBoaWQgPSBrby5vYnNlcnZhYmxlKGRhdGEuZ3JhcGhpZCk7XG4gICAgICAgIEJhc2VNYW5hZ2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIG9wdGlvbnMudmlld01vZGVsLmdyYXBoaWQuc3Vic2NyaWJlKGZ1bmN0aW9uKGdyYXBoaWQpIHtcbiAgICAgICAgICAgIHZhciByZSA9IC9cXGJbYS1mXFxkLV17MzZ9XFxiLztcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UocmUsIGdyYXBoaWQpO1xuICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwubmF2aWdhdGUobmV3UGF0aCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59KTtcbmV4cG9ydCBkZWZhdWx0IEdyYXBoUGFnZVZpZXc7XG4iXSwibmFtZXMiOlsia28iLCJfIiwiQmFzZU1hbmFnZXIiLCJkYXRhIiwiR3JhcGhQYWdlVmlldyIsImV4dGVuZCIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsInNlbGYiLCJ2aWV3TW9kZWwiLCJncmFwaGlkIiwib2JzZXJ2YWJsZSIsImFwcGx5IiwiYXJndW1lbnRzIiwic3Vic2NyaWJlIiwicmUiLCJuZXdQYXRoIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsInJlcGxhY2UiLCJuYXZpZ2F0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9