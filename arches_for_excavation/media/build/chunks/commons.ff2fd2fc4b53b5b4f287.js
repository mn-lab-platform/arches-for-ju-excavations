"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[14364],{

/***/ 14364:
/*!******************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/card-configuration/card-components-tree.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! backbone */ 77186);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bindings_sortable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bindings/sortable */ 40319);
/* harmony import */ var bindings_sortable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bindings_sortable__WEBPACK_IMPORTED_MODULE_3__);




var CardComponentsTree = backbone__WEBPACK_IMPORTED_MODULE_2___default().View.extend({
  /**
  * A backbone view representing a card components tree
  * @augments Backbone.View
  * @constructor
  * @name CardComponentsTree
  */

  /**
  * Initializes the view with optional parameters
  * @memberof CardComponentsTree.prototype
  */
  initialize: function initialize(options) {
    underscore__WEBPACK_IMPORTED_MODULE_0___default().extend(this, underscore__WEBPACK_IMPORTED_MODULE_0___default().pick(options, 'card'));
    this.selection = options.selection || knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(this.card);
  },
  /**
  * beforeMove - prevents dropping of tree nodes into other lists
  * this provides for sorting within cards and card containers, but
  * prevents moving of cards/widgets between containers/cards
  * @memberof CardComponentsTree.prototype
  * @param  {object} e - the ko.sortable event object
  */
  beforeMove: function beforeMove(e) {
    e.cancelDrop = e.sourceParent !== e.targetParent;
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardComponentsTree);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZmYyZmQyZmM0YjUzYjViNGYyODcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTJCO0FBQ0Q7QUFDTTtBQUNMO0FBRzNCLElBQUlHLGtCQUFrQixHQUFHRCxvREFBYSxDQUFDRyxNQUFNLENBQUM7RUFDMUM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVJO0FBQ0o7QUFDQTtBQUNBO0VBQ0lDLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFXQyxPQUFPLEVBQUU7SUFDMUJQLHdEQUFRLENBQUMsSUFBSSxFQUFFQSxzREFBTSxDQUFDTyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDRSxTQUFTLEdBQUdGLE9BQU8sQ0FBQ0UsU0FBUyxJQUFJUiwwREFBYSxDQUFDLElBQUksQ0FBQ1UsSUFBSSxDQUFDO0VBQ2xFLENBQUM7RUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJQyxVQUFVLEVBQUUsU0FBWkEsVUFBVUEsQ0FBV0MsQ0FBQyxFQUFFO0lBQ3BCQSxDQUFDLENBQUNDLFVBQVUsR0FBSUQsQ0FBQyxDQUFDRSxZQUFZLEtBQUdGLENBQUMsQ0FBQ0csWUFBYTtFQUNwRDtBQUNKLENBQUMsQ0FBQztBQUNGLGlFQUFlYixrQkFBa0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2dyYXBoL2NhcmQtY29uZmlndXJhdGlvbi9jYXJkLWNvbXBvbmVudHMtdHJlZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0ICdiaW5kaW5ncy9zb3J0YWJsZSc7XG5cblxudmFyIENhcmRDb21wb25lbnRzVHJlZSA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAqIEEgYmFja2JvbmUgdmlldyByZXByZXNlbnRpbmcgYSBjYXJkIGNvbXBvbmVudHMgdHJlZVxuICAgICogQGF1Z21lbnRzIEJhY2tib25lLlZpZXdcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICogQG5hbWUgQ2FyZENvbXBvbmVudHNUcmVlXG4gICAgKi9cblxuICAgIC8qKlxuICAgICogSW5pdGlhbGl6ZXMgdGhlIHZpZXcgd2l0aCBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgKiBAbWVtYmVyb2YgQ2FyZENvbXBvbmVudHNUcmVlLnByb3RvdHlwZVxuICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLCBfLnBpY2sob3B0aW9ucywgJ2NhcmQnKSk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gb3B0aW9ucy5zZWxlY3Rpb24gfHwga28ub2JzZXJ2YWJsZSh0aGlzLmNhcmQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIGJlZm9yZU1vdmUgLSBwcmV2ZW50cyBkcm9wcGluZyBvZiB0cmVlIG5vZGVzIGludG8gb3RoZXIgbGlzdHNcbiAgICAqIHRoaXMgcHJvdmlkZXMgZm9yIHNvcnRpbmcgd2l0aGluIGNhcmRzIGFuZCBjYXJkIGNvbnRhaW5lcnMsIGJ1dFxuICAgICogcHJldmVudHMgbW92aW5nIG9mIGNhcmRzL3dpZGdldHMgYmV0d2VlbiBjb250YWluZXJzL2NhcmRzXG4gICAgKiBAbWVtYmVyb2YgQ2FyZENvbXBvbmVudHNUcmVlLnByb3RvdHlwZVxuICAgICogQHBhcmFtICB7b2JqZWN0fSBlIC0gdGhlIGtvLnNvcnRhYmxlIGV2ZW50IG9iamVjdFxuICAgICovXG4gICAgYmVmb3JlTW92ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLmNhbmNlbERyb3AgPSAoZS5zb3VyY2VQYXJlbnQhPT1lLnRhcmdldFBhcmVudCk7XG4gICAgfVxufSk7XG5leHBvcnQgZGVmYXVsdCBDYXJkQ29tcG9uZW50c1RyZWU7XG4iXSwibmFtZXMiOlsiXyIsImtvIiwiQmFja2JvbmUiLCJDYXJkQ29tcG9uZW50c1RyZWUiLCJWaWV3IiwiZXh0ZW5kIiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJwaWNrIiwic2VsZWN0aW9uIiwib2JzZXJ2YWJsZSIsImNhcmQiLCJiZWZvcmVNb3ZlIiwiZSIsImNhbmNlbERyb3AiLCJzb3VyY2VQYXJlbnQiLCJ0YXJnZXRQYXJlbnQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==