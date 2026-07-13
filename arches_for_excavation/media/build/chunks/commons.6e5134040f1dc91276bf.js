"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[72317],{

/***/ 72317:
/*!*****************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/resource.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var views_base_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/base-manager */ 18646);
/* harmony import */ var bindings_chosen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bindings/chosen */ 63777);







/**
* a BaseManagerView representing the resource listing and recent edits pages
*/
var ResourceView = views_base_manager__WEBPACK_IMPORTED_MODULE_4__["default"].extend({
  initialize: function initialize(options) {
    var self = this;
    underscore__WEBPACK_IMPORTED_MODULE_1___default().defaults(this.viewModel, {
      showFind: knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false),
      graphId: knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(null),
      arches: arches__WEBPACK_IMPORTED_MODULE_3__["default"]
    });
    this.viewModel.graphId.subscribe(function (graphid) {
      if (graphid && graphid !== "") {
        self.viewModel.navigate(arches__WEBPACK_IMPORTED_MODULE_3__["default"].urls.add_resource(graphid));
      }
    });
    views_base_manager__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.initialize.call(this, options);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ResourceView());

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNmU1MTM0MDQwZjFkYzkxMjc2YmYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNJO0FBQ0Q7QUFDRTtBQUNxQjtBQUN4Qjs7QUFHekI7QUFDQTtBQUNBO0FBQ0EsSUFBSUssWUFBWSxHQUFHRCwwREFBZSxDQUFDRSxNQUFNLENBQUM7RUFDdENDLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFXQyxPQUFPLEVBQUM7SUFDekIsSUFBSUMsSUFBSSxHQUFHLElBQUk7SUFFZlIsMERBQVUsQ0FBQyxJQUFJLENBQUNVLFNBQVMsRUFBRTtNQUN2QkMsUUFBUSxFQUFFViwwREFBYSxDQUFDLEtBQUssQ0FBQztNQUM5QlksT0FBTyxFQUFFWiwwREFBYSxDQUFDLElBQUksQ0FBQztNQUM1QkMsTUFBTSxFQUFFQSw4Q0FBTUE7SUFDbEIsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDUSxTQUFTLENBQUNHLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDLFVBQVNDLE9BQU8sRUFBRTtNQUMvQyxJQUFHQSxPQUFPLElBQUlBLE9BQU8sS0FBSyxFQUFFLEVBQUM7UUFDekJQLElBQUksQ0FBQ0UsU0FBUyxDQUFDTSxRQUFRLENBQUNkLDhDQUFNLENBQUNlLElBQUksQ0FBQ0MsWUFBWSxDQUFDSCxPQUFPLENBQUMsQ0FBQztNQUM5RDtJQUNKLENBQUMsQ0FBQztJQUVGWiwwREFBZSxDQUFDZ0IsU0FBUyxDQUFDYixVQUFVLENBQUNjLElBQUksQ0FBQyxJQUFJLEVBQUViLE9BQU8sQ0FBQztFQUM1RDtBQUNKLENBQUMsQ0FBQztBQUNGLGlFQUFlLElBQUlILFlBQVksQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9yZXNvdXJjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IEJhc2VNYW5hZ2VyVmlldyBmcm9tICd2aWV3cy9iYXNlLW1hbmFnZXInO1xuaW1wb3J0ICdiaW5kaW5ncy9jaG9zZW4nO1xuXG5cbi8qKlxuKiBhIEJhc2VNYW5hZ2VyVmlldyByZXByZXNlbnRpbmcgdGhlIHJlc291cmNlIGxpc3RpbmcgYW5kIHJlY2VudCBlZGl0cyBwYWdlc1xuKi9cbnZhciBSZXNvdXJjZVZpZXcgPSBCYXNlTWFuYWdlclZpZXcuZXh0ZW5kKHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIF8uZGVmYXVsdHModGhpcy52aWV3TW9kZWwsIHtcbiAgICAgICAgICAgIHNob3dGaW5kOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcbiAgICAgICAgICAgIGdyYXBoSWQ6IGtvLm9ic2VydmFibGUobnVsbCksXG4gICAgICAgICAgICBhcmNoZXM6IGFyY2hlcyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52aWV3TW9kZWwuZ3JhcGhJZC5zdWJzY3JpYmUoZnVuY3Rpb24oZ3JhcGhpZCkge1xuICAgICAgICAgICAgaWYoZ3JhcGhpZCAmJiBncmFwaGlkICE9PSBcIlwiKXtcbiAgICAgICAgICAgICAgICBzZWxmLnZpZXdNb2RlbC5uYXZpZ2F0ZShhcmNoZXMudXJscy5hZGRfcmVzb3VyY2UoZ3JhcGhpZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBCYXNlTWFuYWdlclZpZXcucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG59KTtcbmV4cG9ydCBkZWZhdWx0IG5ldyBSZXNvdXJjZVZpZXcoKTtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwiYXJjaGVzIiwiQmFzZU1hbmFnZXJWaWV3IiwiUmVzb3VyY2VWaWV3IiwiZXh0ZW5kIiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJzZWxmIiwiZGVmYXVsdHMiLCJ2aWV3TW9kZWwiLCJzaG93RmluZCIsIm9ic2VydmFibGUiLCJncmFwaElkIiwic3Vic2NyaWJlIiwiZ3JhcGhpZCIsIm5hdmlnYXRlIiwidXJscyIsImFkZF9yZXNvdXJjZSIsInByb3RvdHlwZSIsImNhbGwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==