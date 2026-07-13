"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[98170],{

/***/ 98170:
/*!***************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/let.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);


/**
 * A knockout.js binding to alias a given context 
 * Should be available in knockout 3.5 
 * https://github.com/knockout/knockout/pull/1792
 * 
 * Usage:
 *   <!--ko let: { $viewModel: $data }-->
 *   ...
 *   <!--/ko-->
 */

(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers)['let'] = {
  init: function init(element, valueAccessor, allBindings, vm, bindingContext) {
    // Make a modified binding context, with extra properties, and apply it to descendant elements
    var innerContext = bindingContext.extend(valueAccessor);
    knockout__WEBPACK_IMPORTED_MODULE_0___default().applyBindingsToDescendants(innerContext, element);
    return {
      controlsDescendantBindings: true
    };
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers)['let'].init = knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers['let'].init.bind((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers)['let']);
(knockout__WEBPACK_IMPORTED_MODULE_0___default().virtualElements).allowedBindings['let'] = true;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers)['let']);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuODQ2NGEzODdjMTFkNzljM2YyYWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUEsaUVBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUc7RUFDeEJFLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFZQyxPQUFPLEVBQUVDLGFBQWEsRUFBRUMsV0FBVyxFQUFFQyxFQUFFLEVBQUVDLGNBQWMsRUFBRTtJQUNyRTtJQUNBLElBQUlDLFlBQVksR0FBR0QsY0FBYyxDQUFDRSxNQUFNLENBQUNMLGFBQWEsQ0FBQztJQUN2REosMEVBQTZCLENBQUNRLFlBQVksRUFBRUwsT0FBTyxDQUFDO0lBRXBELE9BQU87TUFBRVEsMEJBQTBCLEVBQUU7SUFBSyxDQUFDO0VBQy9DO0FBQ0osQ0FBQztBQUNEWCxpRUFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQ0UsSUFBSSxHQUFHRiwrREFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQ0UsSUFBSSxDQUFDVSxJQUFJLENBQUNaLGlFQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRS9GQSxpRUFBa0IsQ0FBQ2MsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUk7QUFFaEQsaUVBQWVkLGlFQUFrQixDQUFDLEtBQUssQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvYmluZGluZ3MvbGV0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5cbi8qKlxuICogQSBrbm9ja291dC5qcyBiaW5kaW5nIHRvIGFsaWFzIGEgZ2l2ZW4gY29udGV4dCBcbiAqIFNob3VsZCBiZSBhdmFpbGFibGUgaW4ga25vY2tvdXQgMy41IFxuICogaHR0cHM6Ly9naXRodWIuY29tL2tub2Nrb3V0L2tub2Nrb3V0L3B1bGwvMTc5MlxuICogXG4gKiBVc2FnZTpcbiAqICAgPCEtLWtvIGxldDogeyAkdmlld01vZGVsOiAkZGF0YSB9LS0+XG4gKiAgIC4uLlxuICogICA8IS0tL2tvLS0+XG4gKi9cblxua28uYmluZGluZ0hhbmRsZXJzWydsZXQnXSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3MsIHZtLCBiaW5kaW5nQ29udGV4dCkge1xuICAgICAgICAvLyBNYWtlIGEgbW9kaWZpZWQgYmluZGluZyBjb250ZXh0LCB3aXRoIGV4dHJhIHByb3BlcnRpZXMsIGFuZCBhcHBseSBpdCB0byBkZXNjZW5kYW50IGVsZW1lbnRzXG4gICAgICAgIHZhciBpbm5lckNvbnRleHQgPSBiaW5kaW5nQ29udGV4dC5leHRlbmQodmFsdWVBY2Nlc3Nvcik7XG4gICAgICAgIGtvLmFwcGx5QmluZGluZ3NUb0Rlc2NlbmRhbnRzKGlubmVyQ29udGV4dCwgZWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHsgY29udHJvbHNEZXNjZW5kYW50QmluZGluZ3M6IHRydWUgfTtcbiAgICB9XG59O1xua28uYmluZGluZ0hhbmRsZXJzWydsZXQnXS5pbml0ID0ga28uYmluZGluZ0hhbmRsZXJzWydsZXQnXS5pbml0LmJpbmQoa28uYmluZGluZ0hhbmRsZXJzWydsZXQnXSk7XG5cbmtvLnZpcnR1YWxFbGVtZW50cy5hbGxvd2VkQmluZGluZ3NbJ2xldCddID0gdHJ1ZTtcblxuZXhwb3J0IGRlZmF1bHQga28uYmluZGluZ0hhbmRsZXJzWydsZXQnXTtcbiJdLCJuYW1lcyI6WyJrbyIsImJpbmRpbmdIYW5kbGVycyIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsImFsbEJpbmRpbmdzIiwidm0iLCJiaW5kaW5nQ29udGV4dCIsImlubmVyQ29udGV4dCIsImV4dGVuZCIsImFwcGx5QmluZGluZ3NUb0Rlc2NlbmRhbnRzIiwiY29udHJvbHNEZXNjZW5kYW50QmluZGluZ3MiLCJiaW5kIiwidmlydHVhbEVsZW1lbnRzIiwiYWxsb3dlZEJpbmRpbmdzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=