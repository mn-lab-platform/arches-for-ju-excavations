"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[42699],{

/***/ 42699:
/*!***********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/fadeVisible.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
// Here's a custom Knockout binding that makes elements shown/hidden via jQuery's fadeIn()/fadeOut() methods
// Could be stored in a separate utility library



(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible = {
  init: function init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContent) {
    // Initially set the element to be instantly visible/hidden depending on the value
    var value = valueAccessor();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).toggle(knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
  },
  update: function update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContent) {
    // Whenever the value subsequently changes, slowly fade the element in or out
    var delay = allBindingsAccessor.get('delay');
    var fade = allBindingsAccessor.get('fade');
    var value = valueAccessor();
    if (knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(value) === false) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).fadeOut(fade);
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).delay(delay).fadeIn(fade);
    }
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.fadeVisible.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible);
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible.update = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.fadeVisible.update.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuM2YxNDExOWU1ZGE1MDE4MWFiY2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUV1QjtBQUNHO0FBRTFCQyxpRUFBa0IsQ0FBQ0UsV0FBVyxHQUFHO0VBQzdCQyxJQUFJLEVBQUUsU0FBTkEsSUFBSUEsQ0FBWUMsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLG1CQUFtQixFQUFFQyxTQUFTLEVBQUVDLGNBQWMsRUFBRTtJQUNwRjtJQUNBLElBQUlDLEtBQUssR0FBR0osYUFBYSxDQUFDLENBQUM7SUFDM0JOLDZDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDTSxNQUFNLENBQUNWLHNEQUFTLENBQUNTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6QyxDQUFDO0VBQ0RHLE1BQU0sRUFBRSxTQUFSQSxNQUFNQSxDQUFZUixPQUFPLEVBQUVDLGFBQWEsRUFBRUMsbUJBQW1CLEVBQUVDLFNBQVMsRUFBRUMsY0FBYyxFQUFFO0lBQ3RGO0lBQ0EsSUFBSUssS0FBSyxHQUFHUCxtQkFBbUIsQ0FBQ1EsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUM1QyxJQUFJQyxJQUFJLEdBQUdULG1CQUFtQixDQUFDUSxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzFDLElBQUlMLEtBQUssR0FBR0osYUFBYSxDQUFDLENBQUM7SUFDM0IsSUFBSUwsc0RBQVMsQ0FBQ1MsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO01BQzVCViw2Q0FBQyxDQUFDSyxPQUFPLENBQUMsQ0FBQ1ksT0FBTyxDQUFDRCxJQUFJLENBQUM7SUFDNUIsQ0FBQyxNQUFNO01BQ0hoQiw2Q0FBQyxDQUFDSyxPQUFPLENBQUMsQ0FBQ1MsS0FBSyxDQUFDQSxLQUFLLENBQUMsQ0FBQ0ksTUFBTSxDQUFDRixJQUFJLENBQUM7SUFDeEM7RUFDSjtBQUNKLENBQUM7QUFDRGYsaUVBQWtCLENBQUNFLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHSCwrREFBa0IsQ0FBQ0UsV0FBVyxDQUFDQyxJQUFJLENBQUNlLElBQUksQ0FBQ2xCLGlFQUFrQixDQUFDRSxXQUFXLENBQUM7QUFDOUdGLGlFQUFrQixDQUFDRSxXQUFXLENBQUNVLE1BQU0sR0FBR1osK0RBQWtCLENBQUNFLFdBQVcsQ0FBQ1UsTUFBTSxDQUFDTSxJQUFJLENBQUNsQixpRUFBa0IsQ0FBQ0UsV0FBVyxDQUFDO0FBR2xILGlFQUFlRixpRUFBa0IsQ0FBQ0UsV0FBVyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvYmluZGluZ3MvZmFkZVZpc2libGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSGVyZSdzIGEgY3VzdG9tIEtub2Nrb3V0IGJpbmRpbmcgdGhhdCBtYWtlcyBlbGVtZW50cyBzaG93bi9oaWRkZW4gdmlhIGpRdWVyeSdzIGZhZGVJbigpL2ZhZGVPdXQoKSBtZXRob2RzXG4vLyBDb3VsZCBiZSBzdG9yZWQgaW4gYSBzZXBhcmF0ZSB1dGlsaXR5IGxpYnJhcnlcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5cbmtvLmJpbmRpbmdIYW5kbGVycy5mYWRlVmlzaWJsZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3NBY2Nlc3Nvciwgdmlld01vZGVsLCBiaW5kaW5nQ29udGVudCkge1xuICAgICAgICAvLyBJbml0aWFsbHkgc2V0IHRoZSBlbGVtZW50IHRvIGJlIGluc3RhbnRseSB2aXNpYmxlL2hpZGRlbiBkZXBlbmRpbmcgb24gdGhlIHZhbHVlXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKTtcbiAgICAgICAgJChlbGVtZW50KS50b2dnbGUoa28udW53cmFwKHZhbHVlKSk7IC8vIFVzZSBcInVud3JhcE9ic2VydmFibGVcIiBzbyB3ZSBjYW4gaGFuZGxlIHZhbHVlcyB0aGF0IG1heSBvciBtYXkgbm90IGJlIG9ic2VydmFibGVcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzQWNjZXNzb3IsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRlbnQpIHtcbiAgICAgICAgLy8gV2hlbmV2ZXIgdGhlIHZhbHVlIHN1YnNlcXVlbnRseSBjaGFuZ2VzLCBzbG93bHkgZmFkZSB0aGUgZWxlbWVudCBpbiBvciBvdXRcbiAgICAgICAgdmFyIGRlbGF5ID0gYWxsQmluZGluZ3NBY2Nlc3Nvci5nZXQoJ2RlbGF5Jyk7XG4gICAgICAgIHZhciBmYWRlID0gYWxsQmluZGluZ3NBY2Nlc3Nvci5nZXQoJ2ZhZGUnKTtcbiAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpO1xuICAgICAgICBpZiAoa28udW53cmFwKHZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmFkZU91dChmYWRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZGVsYXkoZGVsYXkpLmZhZGVJbihmYWRlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5rby5iaW5kaW5nSGFuZGxlcnMuZmFkZVZpc2libGUuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5mYWRlVmlzaWJsZS5pbml0LmJpbmQoa28uYmluZGluZ0hhbmRsZXJzLmZhZGVWaXNpYmxlKTtcbmtvLmJpbmRpbmdIYW5kbGVycy5mYWRlVmlzaWJsZS51cGRhdGUgPSBrby5iaW5kaW5nSGFuZGxlcnMuZmFkZVZpc2libGUudXBkYXRlLmJpbmQoa28uYmluZGluZ0hhbmRsZXJzLmZhZGVWaXNpYmxlKTtcblxuXG5leHBvcnQgZGVmYXVsdCBrby5iaW5kaW5nSGFuZGxlcnMuZmFkZVZpc2libGU7XG4iXSwibmFtZXMiOlsiJCIsImtvIiwiYmluZGluZ0hhbmRsZXJzIiwiZmFkZVZpc2libGUiLCJpbml0IiwiZWxlbWVudCIsInZhbHVlQWNjZXNzb3IiLCJhbGxCaW5kaW5nc0FjY2Vzc29yIiwidmlld01vZGVsIiwiYmluZGluZ0NvbnRlbnQiLCJ2YWx1ZSIsInRvZ2dsZSIsInVud3JhcCIsInVwZGF0ZSIsImRlbGF5IiwiZ2V0IiwiZmFkZSIsImZhZGVPdXQiLCJmYWRlSW4iLCJiaW5kIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=