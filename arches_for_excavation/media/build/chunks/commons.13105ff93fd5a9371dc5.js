"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[65700],{

/***/ 65700:
/*!************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/map-controls.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);


(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible = {
  init: function init(element, valueAccessor) {
    // Initially set the element to be instantly visible/hidden depending on the value
    var value = valueAccessor();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).toggle(knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
  },
  update: function update(element, valueAccessor) {
    // Whenever the value subsequently changes, slowly fade the element in or out
    var value = valueAccessor();
    if (knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(value) === false) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).fadeOut();
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).delay(200).fadeIn(400);
    }
    // ko.unwrap(value) ? $(element).fadeOut() : $(element).fadeIn();
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.fadeVisible.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible);
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible.update = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.fadeVisible.update.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).fadeVisible);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMTMxMDVmZjkzZmQ1YTkzNzFkYzUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDRztBQUUxQkMsaUVBQWtCLENBQUNFLFdBQVcsR0FBRztFQUM3QkMsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQVlDLE9BQU8sRUFBRUMsYUFBYSxFQUFFO0lBQ3BDO0lBQ0EsSUFBSUMsS0FBSyxHQUFHRCxhQUFhLENBQUMsQ0FBQztJQUMzQk4sNkNBQUMsQ0FBQ0ssT0FBTyxDQUFDLENBQUNHLE1BQU0sQ0FBQ1Asc0RBQVMsQ0FBQ00sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pDLENBQUM7RUFDREcsTUFBTSxFQUFFLFNBQVJBLE1BQU1BLENBQVlMLE9BQU8sRUFBRUMsYUFBYSxFQUFFO0lBQ3RDO0lBQ0EsSUFBSUMsS0FBSyxHQUFHRCxhQUFhLENBQUMsQ0FBQztJQUMzQixJQUFJTCxzREFBUyxDQUFDTSxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUU7TUFDNUJQLDZDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDTSxPQUFPLENBQUMsQ0FBQztJQUN4QixDQUFDLE1BQU07TUFDSFgsNkNBQUMsQ0FBQ0ssT0FBTyxDQUFDLENBQUNPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNyQztJQUNBO0VBQ0o7QUFDSixDQUFDO0FBQ0RaLGlFQUFrQixDQUFDRSxXQUFXLENBQUNDLElBQUksR0FBR0gsK0RBQWtCLENBQUNFLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDVSxJQUFJLENBQUNiLGlFQUFrQixDQUFDRSxXQUFXLENBQUM7QUFDOUdGLGlFQUFrQixDQUFDRSxXQUFXLENBQUNPLE1BQU0sR0FBR1QsK0RBQWtCLENBQUNFLFdBQVcsQ0FBQ08sTUFBTSxDQUFDSSxJQUFJLENBQUNiLGlFQUFrQixDQUFDRSxXQUFXLENBQUM7QUFFbEgsaUVBQWVGLGlFQUFrQixDQUFDRSxXQUFXLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy9iaW5kaW5ncy9tYXAtY29udHJvbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5cbmtvLmJpbmRpbmdIYW5kbGVycy5mYWRlVmlzaWJsZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xuICAgICAgICAvLyBJbml0aWFsbHkgc2V0IHRoZSBlbGVtZW50IHRvIGJlIGluc3RhbnRseSB2aXNpYmxlL2hpZGRlbiBkZXBlbmRpbmcgb24gdGhlIHZhbHVlXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKTtcbiAgICAgICAgJChlbGVtZW50KS50b2dnbGUoa28udW53cmFwKHZhbHVlKSk7IC8vIFVzZSBcInVud3JhcE9ic2VydmFibGVcIiBzbyB3ZSBjYW4gaGFuZGxlIHZhbHVlcyB0aGF0IG1heSBvciBtYXkgbm90IGJlIG9ic2VydmFibGVcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcbiAgICAgICAgLy8gV2hlbmV2ZXIgdGhlIHZhbHVlIHN1YnNlcXVlbnRseSBjaGFuZ2VzLCBzbG93bHkgZmFkZSB0aGUgZWxlbWVudCBpbiBvciBvdXRcbiAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpO1xuICAgICAgICBpZiAoa28udW53cmFwKHZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmFkZU91dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChlbGVtZW50KS5kZWxheSgyMDApLmZhZGVJbig0MDApO1xuICAgICAgICB9XG4gICAgICAgIC8vIGtvLnVud3JhcCh2YWx1ZSkgPyAkKGVsZW1lbnQpLmZhZGVPdXQoKSA6ICQoZWxlbWVudCkuZmFkZUluKCk7XG4gICAgfVxufTtcbmtvLmJpbmRpbmdIYW5kbGVycy5mYWRlVmlzaWJsZS5pbml0ID0ga28uYmluZGluZ0hhbmRsZXJzLmZhZGVWaXNpYmxlLmluaXQuYmluZChrby5iaW5kaW5nSGFuZGxlcnMuZmFkZVZpc2libGUpO1xua28uYmluZGluZ0hhbmRsZXJzLmZhZGVWaXNpYmxlLnVwZGF0ZSA9IGtvLmJpbmRpbmdIYW5kbGVycy5mYWRlVmlzaWJsZS51cGRhdGUuYmluZChrby5iaW5kaW5nSGFuZGxlcnMuZmFkZVZpc2libGUpO1xuXG5leHBvcnQgZGVmYXVsdCBrby5iaW5kaW5nSGFuZGxlcnMuZmFkZVZpc2libGU7XG4iXSwibmFtZXMiOlsiJCIsImtvIiwiYmluZGluZ0hhbmRsZXJzIiwiZmFkZVZpc2libGUiLCJpbml0IiwiZWxlbWVudCIsInZhbHVlQWNjZXNzb3IiLCJ2YWx1ZSIsInRvZ2dsZSIsInVud3JhcCIsInVwZGF0ZSIsImZhZGVPdXQiLCJkZWxheSIsImZhZGVJbiIsImJpbmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==