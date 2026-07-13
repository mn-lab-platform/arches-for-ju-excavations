"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[53606],{

/***/ 53606:
/*!*********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/cytoscape.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cytoscape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cytoscape */ 64432);
/* harmony import */ var cytoscape__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cytoscape__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cytoscape_cola__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cytoscape-cola */ 71095);
/* harmony import */ var cytoscape_cola__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cytoscape_cola__WEBPACK_IMPORTED_MODULE_3__);




cytoscape__WEBPACK_IMPORTED_MODULE_2___default().use((cytoscape_cola__WEBPACK_IMPORTED_MODULE_3___default()));
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).cytoscape = {
  init: function init(element, valueAccessor) {
    var defaults = {
      container: element
    };
    var config = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(valueAccessor()).config || {};
    var viz = cytoscape__WEBPACK_IMPORTED_MODULE_2___default()(underscore__WEBPACK_IMPORTED_MODULE_1___default().defaults(knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(config), defaults));
    knockout__WEBPACK_IMPORTED_MODULE_0___default().utils.domNodeDisposal.addDisposeCallback(element, function () {
      viz.destroy();
    }, this);
    if (typeof knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(valueAccessor()).afterRender === 'function') {
      knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(valueAccessor()).afterRender(viz);
    }
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).cytoscape.init = knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers.cytoscape.init.bind((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).cytoscape);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).cytoscape);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMGRiM2M3MjJkMjc0M2VmMWY5NjEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ0M7QUFDTztBQUNBO0FBRWxDRSxvREFBYSxDQUFDQyx1REFBSSxDQUFDO0FBRW5CSCxpRUFBa0IsQ0FBQ0UsU0FBUyxHQUFHO0VBQzNCSSxJQUFJLEVBQUUsU0FBTkEsSUFBSUEsQ0FBWUMsT0FBTyxFQUFFQyxhQUFhLEVBQUU7SUFDcEMsSUFBSUMsUUFBUSxHQUFHO01BQ1hDLFNBQVMsRUFBRUg7SUFDZixDQUFDO0lBQ0QsSUFBSUksTUFBTSxHQUFHWCxzREFBUyxDQUFDUSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUNHLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFFcEQsSUFBSUUsR0FBRyxHQUFHWCxnREFBUyxDQUNmRCwwREFBVSxDQUFDRCxzREFBUyxDQUFDVyxNQUFNLENBQUMsRUFBRUYsUUFBUSxDQUMxQyxDQUFDO0lBRURULHFEQUFRLENBQUNlLGVBQWUsQ0FBQ0Msa0JBQWtCLENBQUNULE9BQU8sRUFBRSxZQUFZO01BQzdETSxHQUFHLENBQUNJLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUMsRUFBRSxJQUFJLENBQUM7SUFFUixJQUFJLE9BQU9qQixzREFBUyxDQUFDUSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUNVLFdBQVcsS0FBSyxVQUFVLEVBQUU7TUFDOURsQixzREFBUyxDQUFDUSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUNVLFdBQVcsQ0FBQ0wsR0FBRyxDQUFDO0lBQy9DO0VBQ0o7QUFDSixDQUFDO0FBRURiLGlFQUFrQixDQUFDRSxTQUFTLENBQUNJLElBQUksR0FBR04sK0RBQWtCLENBQUNFLFNBQVMsQ0FBQ0ksSUFBSSxDQUFDYSxJQUFJLENBQUNuQixpRUFBa0IsQ0FBQ0UsU0FBUyxDQUFDO0FBQ3hHLGlFQUFlRixpRUFBa0IsQ0FBQ0UsU0FBUyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvYmluZGluZ3MvY3l0b3NjYXBlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBjeXRvc2NhcGUgZnJvbSAnY3l0b3NjYXBlJztcbmltcG9ydCBjb2xhIGZyb20gJ2N5dG9zY2FwZS1jb2xhJztcblxuY3l0b3NjYXBlLnVzZShjb2xhKTtcblxua28uYmluZGluZ0hhbmRsZXJzLmN5dG9zY2FwZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBjb250YWluZXI6IGVsZW1lbnRcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNvbmZpZyA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpLmNvbmZpZyB8fCB7fTtcblxuICAgICAgICB2YXIgdml6ID0gY3l0b3NjYXBlKFxuICAgICAgICAgICAgXy5kZWZhdWx0cyhrby51bndyYXAoY29uZmlnKSwgZGVmYXVsdHMpXG4gICAgICAgICk7XG5cbiAgICAgICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhlbGVtZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2aXouZGVzdHJveSgpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBpZiAodHlwZW9mIGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpLmFmdGVyUmVuZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBrby51bndyYXAodmFsdWVBY2Nlc3NvcigpKS5hZnRlclJlbmRlcih2aXopO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5cbmtvLmJpbmRpbmdIYW5kbGVycy5jeXRvc2NhcGUuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5jeXRvc2NhcGUuaW5pdC5iaW5kKGtvLmJpbmRpbmdIYW5kbGVycy5jeXRvc2NhcGUpO1xuZXhwb3J0IGRlZmF1bHQga28uYmluZGluZ0hhbmRsZXJzLmN5dG9zY2FwZTtcbiJdLCJuYW1lcyI6WyJrbyIsIl8iLCJjeXRvc2NhcGUiLCJjb2xhIiwidXNlIiwiYmluZGluZ0hhbmRsZXJzIiwiaW5pdCIsImVsZW1lbnQiLCJ2YWx1ZUFjY2Vzc29yIiwiZGVmYXVsdHMiLCJjb250YWluZXIiLCJjb25maWciLCJ1bndyYXAiLCJ2aXoiLCJ1dGlscyIsImRvbU5vZGVEaXNwb3NhbCIsImFkZERpc3Bvc2VDYWxsYmFjayIsImRlc3Ryb3kiLCJhZnRlclJlbmRlciIsImJpbmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==