"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[5146],{

/***/ 5146:
/*!*****************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/function-manager/applied-function-list.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var views_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! views/list */ 38777);

var AppliedFunctionList = views_list__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  /**
  * A backbone view to manage a list of functions
  * @augments ListView
  * @constructor
  * @name AppliedFunctionList
  */

  filterFunction: null,
  /**
  * initializes the view with optional parameters
  * @memberof AppliedFunctionList.prototype
  * @param {object} options
  */
  initialize: function initialize(options) {
    this.items = options.functions;
    this.items.sort(function (left, right) {
      return left.function.name().toLowerCase() == right.function.name().toLowerCase() ? 0 : left.function.name().toLowerCase() < right.function.name().toLowerCase() ? -1 : 1;
    });
    views_list__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.initialize.apply(this, arguments);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppliedFunctionList);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNzkwNTY2NGU4NjEzZDc5YTIyOGQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7QUFHbEMsSUFBSUMsbUJBQW1CLEdBQUdELGtEQUFRLENBQUNFLE1BQU0sQ0FBQztFQUN0QztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0VBRUlDLGNBQWMsRUFBRSxJQUFJO0VBRXBCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFDSUMsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQVdDLE9BQU8sRUFBRTtJQUMxQixJQUFJLENBQUNDLEtBQUssR0FBR0QsT0FBTyxDQUFDRSxTQUFTO0lBQzlCLElBQUksQ0FBQ0QsS0FBSyxDQUFDRSxJQUFJLENBQUMsVUFBU0MsSUFBSSxFQUFFQyxLQUFLLEVBQUU7TUFDbEMsT0FBT0QsSUFBSSxDQUFDRSxRQUFRLENBQUNDLElBQUksQ0FBQyxDQUFDLENBQUNDLFdBQVcsQ0FBQyxDQUFDLElBQUlILEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBSUosSUFBSSxDQUFDRSxRQUFRLENBQUNDLElBQUksQ0FBQyxDQUFDLENBQUNDLFdBQVcsQ0FBQyxDQUFDLEdBQUdILEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUU7SUFDOUssQ0FBQyxDQUFDO0lBQ0ZiLGtEQUFRLENBQUNjLFNBQVMsQ0FBQ1YsVUFBVSxDQUFDVyxLQUFLLENBQUMsSUFBSSxFQUFFQyxTQUFTLENBQUM7RUFDeEQ7QUFFSixDQUFDLENBQUM7QUFDRixpRUFBZWYsbUJBQW1CLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9ncmFwaC9mdW5jdGlvbi1tYW5hZ2VyL2FwcGxpZWQtZnVuY3Rpb24tbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlzdFZpZXcgZnJvbSAndmlld3MvbGlzdCc7XG5cblxudmFyIEFwcGxpZWRGdW5jdGlvbkxpc3QgPSBMaXN0Vmlldy5leHRlbmQoe1xuICAgIC8qKlxuICAgICogQSBiYWNrYm9uZSB2aWV3IHRvIG1hbmFnZSBhIGxpc3Qgb2YgZnVuY3Rpb25zXG4gICAgKiBAYXVnbWVudHMgTGlzdFZpZXdcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICogQG5hbWUgQXBwbGllZEZ1bmN0aW9uTGlzdFxuICAgICovXG5cbiAgICBmaWx0ZXJGdW5jdGlvbjogbnVsbCxcblxuICAgIC8qKlxuICAgICogaW5pdGlhbGl6ZXMgdGhlIHZpZXcgd2l0aCBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgKiBAbWVtYmVyb2YgQXBwbGllZEZ1bmN0aW9uTGlzdC5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgKi9cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBvcHRpb25zLmZ1bmN0aW9ucztcbiAgICAgICAgdGhpcy5pdGVtcy5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gbGVmdC5mdW5jdGlvbi5uYW1lKCkudG9Mb3dlckNhc2UoKSA9PSByaWdodC5mdW5jdGlvbi5uYW1lKCkudG9Mb3dlckNhc2UoKSA/IDAgOiAobGVmdC5mdW5jdGlvbi5uYW1lKCkudG9Mb3dlckNhc2UoKSA8IHJpZ2h0LmZ1bmN0aW9uLm5hbWUoKS50b0xvd2VyQ2FzZSgpID8gLTEgOiAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIExpc3RWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG59KTtcbmV4cG9ydCBkZWZhdWx0IEFwcGxpZWRGdW5jdGlvbkxpc3Q7XG5cbiJdLCJuYW1lcyI6WyJMaXN0VmlldyIsIkFwcGxpZWRGdW5jdGlvbkxpc3QiLCJleHRlbmQiLCJmaWx0ZXJGdW5jdGlvbiIsImluaXRpYWxpemUiLCJvcHRpb25zIiwiaXRlbXMiLCJmdW5jdGlvbnMiLCJzb3J0IiwibGVmdCIsInJpZ2h0IiwiZnVuY3Rpb24iLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9