"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[99152],{

/***/ 99152:
/*!********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/dropzone.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dropzone */ 50221);
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dropzone__WEBPACK_IMPORTED_MODULE_3__);





/**
 * @constructor
 * @name dropzone
 */
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).dropzone = {
  init: function init(element, valueAccessor, allBindings, viewModel, bindingContext) {
    var innerBindingContext = bindingContext.extend(valueAccessor);
    knockout__WEBPACK_IMPORTED_MODULE_0___default().applyBindingsToDescendants(innerBindingContext, element);
    var options = valueAccessor() || {};
    underscore__WEBPACK_IMPORTED_MODULE_1___default().each(underscore__WEBPACK_IMPORTED_MODULE_1___default().filter(options, function (value, key) {
      return underscore__WEBPACK_IMPORTED_MODULE_1___default().contains(['previewsContainer', 'clickable'], key);
    }), function (value, key) {
      options[key] = jquery__WEBPACK_IMPORTED_MODULE_2___default()(element).find(value)[0];
    });
    jquery__WEBPACK_IMPORTED_MODULE_2___default()(element).dropzone(options);
    return {
      controlsDescendantBindings: true
    };
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).dropzone.init = knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers.dropzone.init.bind((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).dropzone);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).dropzone);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYTZkNTA1NWE4ZjliMjNmNTg4ZTQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ0M7QUFDSjtBQUNTOztBQUdoQztBQUNBO0FBQ0E7QUFDQTtBQUNBQSxpRUFBa0IsQ0FBQ0csUUFBUSxHQUFHO0VBQzFCRSxJQUFJLEVBQUUsU0FBTkEsSUFBSUEsQ0FBV0MsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLFdBQVcsRUFBRUMsU0FBUyxFQUFFQyxjQUFjLEVBQUU7SUFDM0UsSUFBSUMsbUJBQW1CLEdBQUdELGNBQWMsQ0FBQ0UsTUFBTSxDQUFDTCxhQUFhLENBQUM7SUFDOURQLDBFQUE2QixDQUFDVyxtQkFBbUIsRUFBRUwsT0FBTyxDQUFDO0lBRTNELElBQUlRLE9BQU8sR0FBR1AsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkNOLHNEQUFNLENBQUNBLHdEQUFRLENBQUNhLE9BQU8sRUFBRSxVQUFTRyxLQUFLLEVBQUVDLEdBQUcsRUFBRTtNQUMxQyxPQUFPakIsMERBQVUsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxFQUFFaUIsR0FBRyxDQUFDO0lBQzlELENBQUMsQ0FBQyxFQUFDLFVBQVNELEtBQUssRUFBRUMsR0FBRyxFQUFFO01BQ3BCSixPQUFPLENBQUNJLEdBQUcsQ0FBQyxHQUFHaEIsNkNBQUMsQ0FBQ0ksT0FBTyxDQUFDLENBQUNjLElBQUksQ0FBQ0gsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQztJQUVGZiw2Q0FBQyxDQUFDSSxPQUFPLENBQUMsQ0FBQ0gsUUFBUSxDQUFDVyxPQUFPLENBQUM7SUFDNUIsT0FBTztNQUFFTywwQkFBMEIsRUFBRTtJQUFLLENBQUM7RUFDL0M7QUFDSixDQUFDO0FBQ0RyQixpRUFBa0IsQ0FBQ0csUUFBUSxDQUFDRSxJQUFJLEdBQUdMLCtEQUFrQixDQUFDRyxRQUFRLENBQUNFLElBQUksQ0FBQ2lCLElBQUksQ0FBQ3RCLGlFQUFrQixDQUFDRyxRQUFRLENBQUM7QUFFckcsaUVBQWVILGlFQUFrQixDQUFDRyxRQUFRLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy9iaW5kaW5ncy9kcm9wem9uZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGRyb3B6b25lIGZyb20gJ2Ryb3B6b25lJzsgICAgXG5cblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBuYW1lIGRyb3B6b25lXG4gKi9cbmtvLmJpbmRpbmdIYW5kbGVycy5kcm9wem9uZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5ncywgdmlld01vZGVsLCBiaW5kaW5nQ29udGV4dCkge1xuICAgICAgICB2YXIgaW5uZXJCaW5kaW5nQ29udGV4dCA9IGJpbmRpbmdDb250ZXh0LmV4dGVuZCh2YWx1ZUFjY2Vzc29yKTtcbiAgICAgICAga28uYXBwbHlCaW5kaW5nc1RvRGVzY2VuZGFudHMoaW5uZXJCaW5kaW5nQ29udGV4dCwgZWxlbWVudCk7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB2YWx1ZUFjY2Vzc29yKCkgfHwge307XG5cbiAgICAgICAgXy5lYWNoKF8uZmlsdGVyKG9wdGlvbnMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBfLmNvbnRhaW5zKFsncHJldmlld3NDb250YWluZXInLCAnY2xpY2thYmxlJ10sIGtleSk7XG4gICAgICAgIH0pLGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9ICQoZWxlbWVudCkuZmluZCh2YWx1ZSlbMF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZWxlbWVudCkuZHJvcHpvbmUob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB7IGNvbnRyb2xzRGVzY2VuZGFudEJpbmRpbmdzOiB0cnVlIH07XG4gICAgfVxufTtcbmtvLmJpbmRpbmdIYW5kbGVycy5kcm9wem9uZS5pbml0ID0ga28uYmluZGluZ0hhbmRsZXJzLmRyb3B6b25lLmluaXQuYmluZChrby5iaW5kaW5nSGFuZGxlcnMuZHJvcHpvbmUpO1xuXG5leHBvcnQgZGVmYXVsdCBrby5iaW5kaW5nSGFuZGxlcnMuZHJvcHpvbmU7XG5cbiJdLCJuYW1lcyI6WyJrbyIsIl8iLCIkIiwiZHJvcHpvbmUiLCJiaW5kaW5nSGFuZGxlcnMiLCJpbml0IiwiZWxlbWVudCIsInZhbHVlQWNjZXNzb3IiLCJhbGxCaW5kaW5ncyIsInZpZXdNb2RlbCIsImJpbmRpbmdDb250ZXh0IiwiaW5uZXJCaW5kaW5nQ29udGV4dCIsImV4dGVuZCIsImFwcGx5QmluZGluZ3NUb0Rlc2NlbmRhbnRzIiwib3B0aW9ucyIsImVhY2giLCJmaWx0ZXIiLCJ2YWx1ZSIsImtleSIsImNvbnRhaW5zIiwiZmluZCIsImNvbnRyb2xzRGVzY2VuZGFudEJpbmRpbmdzIiwiYmluZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9