"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[98770],{

/***/ 98770:
/*!***************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/formattedNumber.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! numeral */ 99227);
/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(numeral__WEBPACK_IMPORTED_MODULE_1__);


(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).formattedNumber = {
  init: function init(element, valueAccessor, allBindings) {
    var value = valueAccessor();
    var format = allBindings.get('format');
    var formattedNumber = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed({
      read: function read() {
        return numeral__WEBPACK_IMPORTED_MODULE_1___default()(knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(value)).format(knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(format));
      },
      write: function write(newValue) {
        value(numeral__WEBPACK_IMPORTED_MODULE_1___default()(newValue).value());
      }
    }).extend({
      notify: 'always'
    });
    if (element.tagName.toLowerCase() == 'input') knockout__WEBPACK_IMPORTED_MODULE_0___default().applyBindingsToNode(element, {
      value: formattedNumber
    });else knockout__WEBPACK_IMPORTED_MODULE_0___default().applyBindingsToNode(element, {
      text: formattedNumber
    });
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).formattedNumber.init = knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers.formattedNumber.init.bind((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).formattedNumber);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).formattedNumber);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMTdiZDYwMjFiYTM5M2EwNjlmOGMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDSTtBQUU5QkEsaUVBQWtCLENBQUNHLGVBQWUsR0FBRztFQUNqQ0MsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQVlDLE9BQU8sRUFBRUMsYUFBYSxFQUFFQyxXQUFXLEVBQUU7SUFDakQsSUFBSUMsS0FBSyxHQUFHRixhQUFhLENBQUMsQ0FBQztJQUMzQixJQUFJRyxNQUFNLEdBQUdGLFdBQVcsQ0FBQ0csR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxJQUFJUCxlQUFlLEdBQUdILHdEQUFXLENBQUM7TUFDOUJZLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFBLEVBQWM7UUFDZCxPQUFPWCw4Q0FBTyxDQUFDRCxzREFBUyxDQUFDUSxLQUFLLENBQUMsQ0FBQyxDQUFDQyxNQUFNLENBQUNULHNEQUFTLENBQUNTLE1BQU0sQ0FBQyxDQUFDO01BQzlELENBQUM7TUFDREssS0FBSyxFQUFFLFNBQVBBLEtBQUtBLENBQVlDLFFBQVEsRUFBRTtRQUN2QlAsS0FBSyxDQUFDUCw4Q0FBTyxDQUFDYyxRQUFRLENBQUMsQ0FBQ1AsS0FBSyxDQUFDLENBQUMsQ0FBQztNQUNwQztJQUNKLENBQUMsQ0FBQyxDQUFDUSxNQUFNLENBQUM7TUFBRUMsTUFBTSxFQUFFO0lBQVMsQ0FBQyxDQUFDO0lBQy9CLElBQUlaLE9BQU8sQ0FBQ2EsT0FBTyxDQUFDQyxXQUFXLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFDeENuQixtRUFBc0IsQ0FBQ0ssT0FBTyxFQUFFO01BQzVCRyxLQUFLLEVBQUVMO0lBQ1gsQ0FBQyxDQUFDLENBQUMsS0FFSEgsbUVBQXNCLENBQUNLLE9BQU8sRUFBRTtNQUM1QmdCLElBQUksRUFBRWxCO0lBQ1YsQ0FBQyxDQUFDO0VBQ1Y7QUFDSixDQUFDO0FBQ0RILGlFQUFrQixDQUFDRyxlQUFlLENBQUNDLElBQUksR0FBR0osK0RBQWtCLENBQUNHLGVBQWUsQ0FBQ0MsSUFBSSxDQUFDa0IsSUFBSSxDQUFDdEIsaUVBQWtCLENBQUNHLGVBQWUsQ0FBQztBQUUxSCxpRUFBZUgsaUVBQWtCLENBQUNHLGVBQWUsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2JpbmRpbmdzL2Zvcm1hdHRlZE51bWJlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XG5cbmtvLmJpbmRpbmdIYW5kbGVycy5mb3JtYXR0ZWROdW1iZXIgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKTtcbiAgICAgICAgdmFyIGZvcm1hdCA9IGFsbEJpbmRpbmdzLmdldCgnZm9ybWF0Jyk7XG4gICAgICAgIHZhciBmb3JtYXR0ZWROdW1iZXIgPSBrby5jb21wdXRlZCh7XG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bWVyYWwoa28udW53cmFwKHZhbHVlKSkuZm9ybWF0KGtvLnVud3JhcChmb3JtYXQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUobnVtZXJhbChuZXdWYWx1ZSkudmFsdWUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmV4dGVuZCh7IG5vdGlmeTogJ2Fsd2F5cycgfSk7XG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAnaW5wdXQnKVxuICAgICAgICAgICAga28uYXBwbHlCaW5kaW5nc1RvTm9kZShlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGZvcm1hdHRlZE51bWJlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGtvLmFwcGx5QmluZGluZ3NUb05vZGUoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgIHRleHQ6IGZvcm1hdHRlZE51bWJlclxuICAgICAgICAgICAgfSk7XG4gICAgfVxufTtcbmtvLmJpbmRpbmdIYW5kbGVycy5mb3JtYXR0ZWROdW1iZXIuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5mb3JtYXR0ZWROdW1iZXIuaW5pdC5iaW5kKGtvLmJpbmRpbmdIYW5kbGVycy5mb3JtYXR0ZWROdW1iZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBrby5iaW5kaW5nSGFuZGxlcnMuZm9ybWF0dGVkTnVtYmVyO1xuIl0sIm5hbWVzIjpbImtvIiwibnVtZXJhbCIsImJpbmRpbmdIYW5kbGVycyIsImZvcm1hdHRlZE51bWJlciIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsImFsbEJpbmRpbmdzIiwidmFsdWUiLCJmb3JtYXQiLCJnZXQiLCJjb21wdXRlZCIsInJlYWQiLCJ1bndyYXAiLCJ3cml0ZSIsIm5ld1ZhbHVlIiwiZXh0ZW5kIiwibm90aWZ5IiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiYXBwbHlCaW5kaW5nc1RvTm9kZSIsInRleHQiLCJiaW5kIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=