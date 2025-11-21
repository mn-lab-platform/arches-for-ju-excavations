"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[39805],{

/***/ 39805:
/*!*********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/clipboard.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);


(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).clipboard = {
  init: function init(element, valueAccessor) {
    var data = valueAccessor();
    if (data.tooltip) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).attr('data-original-title', data.beforeCopiedText);
    }
    function resetText() {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).tooltip('hide');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).attr('data-original-title', data.beforeCopiedText);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).off('mouseleave', resetText);
    }
    ;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).click(function () {
      if (data.tooltip) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).attr('data-original-title', data.afterCopiedText);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).tooltip('show');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).on('mouseleave', resetText);
      }
      navigator.clipboard.writeText(knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(data.value));
    });
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).clipboard.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.clipboard.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).clipboard);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).clipboard);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZWJiYTEyZjU0NjljNTI1NzRmM2MuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDRztBQUUxQkMsaUVBQWtCLENBQUNFLFNBQVMsR0FBRztFQUMzQkMsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQVlDLE9BQU8sRUFBRUMsYUFBYSxFQUFFO0lBQ3BDLElBQU1DLElBQUksR0FBR0QsYUFBYSxDQUFDLENBQUM7SUFDNUIsSUFBSUMsSUFBSSxDQUFDQyxPQUFPLEVBQUU7TUFDZFIsNkNBQUMsQ0FBQ0ssT0FBTyxDQUFDLENBQUNJLElBQUksQ0FBQyxxQkFBcUIsRUFBRUYsSUFBSSxDQUFDRyxnQkFBZ0IsQ0FBQztJQUNqRTtJQUVBLFNBQVNDLFNBQVNBLENBQUEsRUFBRztNQUNqQlgsNkNBQUMsQ0FBQ0ssT0FBTyxDQUFDLENBQUNHLE9BQU8sQ0FBQyxNQUFNLENBQUM7TUFDMUJSLDZDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDSSxJQUFJLENBQUMscUJBQXFCLEVBQUVGLElBQUksQ0FBQ0csZ0JBQWdCLENBQUM7TUFDN0RWLDZDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDTyxHQUFHLENBQUMsWUFBWSxFQUFFRCxTQUFTLENBQUM7SUFDM0M7SUFBQztJQUVEWCw2Q0FBQyxDQUFDSyxPQUFPLENBQUMsQ0FBQ1EsS0FBSyxDQUFDLFlBQVk7TUFDekIsSUFBSU4sSUFBSSxDQUFDQyxPQUFPLEVBQUU7UUFDZFIsNkNBQUMsQ0FBQ0ssT0FBTyxDQUFDLENBQUNJLElBQUksQ0FBQyxxQkFBcUIsRUFBRUYsSUFBSSxDQUFDTyxlQUFlLENBQUM7UUFDNURkLDZDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzFCUiw2Q0FBQyxDQUFDSyxPQUFPLENBQUMsQ0FBQ1UsRUFBRSxDQUFDLFlBQVksRUFBRUosU0FBUyxDQUFDO01BQzFDO01BQ0FLLFNBQVMsQ0FBQ2IsU0FBUyxDQUFDYyxTQUFTLENBQUNoQixzREFBUyxDQUFDTSxJQUFJLENBQUNZLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQztFQUNOO0FBQ0osQ0FBQztBQUNEbEIsaUVBQWtCLENBQUNFLFNBQVMsQ0FBQ0MsSUFBSSxHQUFHSCwrREFBa0IsQ0FBQ0UsU0FBUyxDQUFDQyxJQUFJLENBQUNnQixJQUFJLENBQUNuQixpRUFBa0IsQ0FBQ0UsU0FBUyxDQUFDO0FBRXhHLGlFQUFlRixpRUFBa0IsQ0FBQ0UsU0FBUyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvYmluZGluZ3MvY2xpcGJvYXJkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuXG5rby5iaW5kaW5nSGFuZGxlcnMuY2xpcGJvYXJkID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB2YWx1ZUFjY2Vzc29yKCk7XG4gICAgICAgIGlmIChkYXRhLnRvb2x0aXApIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScsIGRhdGEuYmVmb3JlQ29waWVkVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZXNldFRleHQoKSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAgICAgICAgICQoZWxlbWVudCkuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScsIGRhdGEuYmVmb3JlQ29waWVkVGV4dCk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLm9mZignbW91c2VsZWF2ZScsIHJlc2V0VGV4dCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJChlbGVtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS50b29sdGlwKSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJywgZGF0YS5hZnRlckNvcGllZFRleHQpO1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkudG9vbHRpcCgnc2hvdycpO1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkub24oJ21vdXNlbGVhdmUnLCByZXNldFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoa28udW53cmFwKGRhdGEudmFsdWUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmtvLmJpbmRpbmdIYW5kbGVycy5jbGlwYm9hcmQuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5jbGlwYm9hcmQuaW5pdC5iaW5kKGtvLmJpbmRpbmdIYW5kbGVycy5jbGlwYm9hcmQpO1xuXG5leHBvcnQgZGVmYXVsdCBrby5iaW5kaW5nSGFuZGxlcnMuY2xpcGJvYXJkO1xuIl0sIm5hbWVzIjpbIiQiLCJrbyIsImJpbmRpbmdIYW5kbGVycyIsImNsaXBib2FyZCIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsImRhdGEiLCJ0b29sdGlwIiwiYXR0ciIsImJlZm9yZUNvcGllZFRleHQiLCJyZXNldFRleHQiLCJvZmYiLCJjbGljayIsImFmdGVyQ29waWVkVGV4dCIsIm9uIiwibmF2aWdhdG9yIiwid3JpdGVUZXh0IiwidW53cmFwIiwidmFsdWUiLCJiaW5kIl0sInNvdXJjZVJvb3QiOiIifQ==