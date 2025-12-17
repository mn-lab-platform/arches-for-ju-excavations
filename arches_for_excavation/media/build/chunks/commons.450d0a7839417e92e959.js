"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[67323],{

/***/ 67323:
/*!******************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/tree-view.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! backbone */ 77186);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var views_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/list */ 38777);




var TreeView = views_list__WEBPACK_IMPORTED_MODULE_3__["default"].extend({
  /**
  * A list view to manage a hierarchical lists of things
  * @augments ListView
  * @constructor
  * @name TreeView
  */

  /**
  * Used internally to add observable parameters to list items
  * @memberof TreeView.prototype
  * @param {object} item - a list item
  */
  _initializeItem: function _initializeItem(item) {
    if (!item.filtered) {
      item.filtered = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
    }
    if (!('selectable' in item)) {
      item.selectable = true;
    }
    if (!item.selected) {
      item.selected = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
    }
    if (!item.expanded) {
      item.expanded = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
    }
  },
  /**
  * Reset the search string to blank
  * @memberof TreeView.prototype
  */
  expandAll: function expandAll() {
    this.items().forEach(function (item) {
      item.expanded(true);
    }, this);
  },
  /**
  * Reset the search string to blank
  * @memberof TreeView.prototype
  */
  collapseAll: function collapseAll() {
    this.items().forEach(function (item) {
      item.expanded(false);
    }, this);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TreeView);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNDUwZDBhNzgzOTQxN2U5MmU5NTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDUztBQUNOO0FBQ1E7QUFHbEMsSUFBSUksUUFBUSxHQUFHRCxrREFBUSxDQUFDRSxNQUFNLENBQUM7RUFDM0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFDSUMsZUFBZSxFQUFFLFNBQWpCQSxlQUFlQSxDQUFXQyxJQUFJLEVBQUM7SUFDM0IsSUFBSSxDQUFDQSxJQUFJLENBQUNDLFFBQVEsRUFBRTtNQUNoQkQsSUFBSSxDQUFDQyxRQUFRLEdBQUdOLDBEQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3hDO0lBQ0EsSUFBSSxFQUFFLFlBQVksSUFBSUssSUFBSSxDQUFDLEVBQUM7TUFDeEJBLElBQUksQ0FBQ0csVUFBVSxHQUFHLElBQUk7SUFDMUI7SUFDQSxJQUFJLENBQUNILElBQUksQ0FBQ0ksUUFBUSxFQUFFO01BQ2hCSixJQUFJLENBQUNJLFFBQVEsR0FBR1QsMERBQWEsQ0FBQyxLQUFLLENBQUM7SUFDeEM7SUFDQSxJQUFJLENBQUNLLElBQUksQ0FBQ0ssUUFBUSxFQUFFO01BQ2hCTCxJQUFJLENBQUNLLFFBQVEsR0FBR1YsMERBQWEsQ0FBQyxLQUFLLENBQUM7SUFDeEM7RUFDSixDQUFDO0VBRUQ7QUFDSjtBQUNBO0FBQ0E7RUFDSVcsU0FBUyxFQUFFLFNBQVhBLFNBQVNBLENBQUEsRUFBWTtJQUNqQixJQUFJLENBQUNDLEtBQUssQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFTUixJQUFJLEVBQUM7TUFDL0JBLElBQUksQ0FBQ0ssUUFBUSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDLEVBQUUsSUFBSSxDQUFDO0VBQ1osQ0FBQztFQUVEO0FBQ0o7QUFDQTtBQUNBO0VBQ0lJLFdBQVcsRUFBRSxTQUFiQSxXQUFXQSxDQUFBLEVBQVk7SUFDbkIsSUFBSSxDQUFDRixLQUFLLENBQUMsQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBU1IsSUFBSSxFQUFDO01BQy9CQSxJQUFJLENBQUNLLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQztFQUNaO0FBQ0osQ0FBQyxDQUFDO0FBRUYsaUVBQWVSLFFBQVEsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL3RyZWUtdmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgTGlzdFZpZXcgZnJvbSAndmlld3MvbGlzdCc7XG5cblxudmFyIFRyZWVWaWV3ID0gTGlzdFZpZXcuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAqIEEgbGlzdCB2aWV3IHRvIG1hbmFnZSBhIGhpZXJhcmNoaWNhbCBsaXN0cyBvZiB0aGluZ3NcbiAgICAqIEBhdWdtZW50cyBMaXN0Vmlld1xuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKiBAbmFtZSBUcmVlVmlld1xuICAgICovXG5cbiAgICAvKipcbiAgICAqIFVzZWQgaW50ZXJuYWxseSB0byBhZGQgb2JzZXJ2YWJsZSBwYXJhbWV0ZXJzIHRvIGxpc3QgaXRlbXNcbiAgICAqIEBtZW1iZXJvZiBUcmVlVmlldy5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtIC0gYSBsaXN0IGl0ZW1cbiAgICAqL1xuICAgIF9pbml0aWFsaXplSXRlbTogZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgIGlmICghaXRlbS5maWx0ZXJlZCkge1xuICAgICAgICAgICAgaXRlbS5maWx0ZXJlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKCdzZWxlY3RhYmxlJyBpbiBpdGVtKSl7XG4gICAgICAgICAgICBpdGVtLnNlbGVjdGFibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXRlbS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXRlbS5leHBhbmRlZCkge1xuICAgICAgICAgICAgaXRlbS5leHBhbmRlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAqIFJlc2V0IHRoZSBzZWFyY2ggc3RyaW5nIHRvIGJsYW5rXG4gICAgKiBAbWVtYmVyb2YgVHJlZVZpZXcucHJvdG90eXBlXG4gICAgKi9cbiAgICBleHBhbmRBbGw6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuaXRlbXMoKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgaXRlbS5leHBhbmRlZCh0cnVlKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogUmVzZXQgdGhlIHNlYXJjaCBzdHJpbmcgdG8gYmxhbmtcbiAgICAqIEBtZW1iZXJvZiBUcmVlVmlldy5wcm90b3R5cGVcbiAgICAqL1xuICAgIGNvbGxhcHNlQWxsOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLml0ZW1zKCkuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIGl0ZW0uZXhwYW5kZWQoZmFsc2UpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRyZWVWaWV3O1xuIl0sIm5hbWVzIjpbIiQiLCJCYWNrYm9uZSIsImtvIiwiTGlzdFZpZXciLCJUcmVlVmlldyIsImV4dGVuZCIsIl9pbml0aWFsaXplSXRlbSIsIml0ZW0iLCJmaWx0ZXJlZCIsIm9ic2VydmFibGUiLCJzZWxlY3RhYmxlIiwic2VsZWN0ZWQiLCJleHBhbmRlZCIsImV4cGFuZEFsbCIsIml0ZW1zIiwiZm9yRWFjaCIsImNvbGxhcHNlQWxsIl0sInNvdXJjZVJvb3QiOiIifQ==