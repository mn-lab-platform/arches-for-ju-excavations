"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[49119],{

/***/ 49119:
/*!************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/color-picker.js ***!
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
/* harmony import */ var bootstrap_colorpicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-colorpicker */ 82828);
/* harmony import */ var bootstrap_colorpicker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_colorpicker__WEBPACK_IMPORTED_MODULE_2__);



(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).colorPicker = {
  init: function init(element, valueAccessor) {
    var options = knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(valueAccessor());
    var values = [];
    var picking = false;
    var updateValues = function updateValues(val) {
      if (!picking) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(cp).colorpicker('setValue', val);
      }
    };
    var keys = ['color', 'format'];
    keys.forEach(function (key) {
      var value = options[key];
      if (knockout__WEBPACK_IMPORTED_MODULE_1___default().isObservable(value)) {
        value.subscribe(updateValues);
        values.push(value);
        options[key] = value();
      }
    });
    var cp = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).colorpicker(options);
    cp.on('changeColor', function (newValues, options) {
      picking = true;
      values.forEach(function (value, i) {
        if (newValues.color === undefined) {
          value(options.color);
        } else {
          value(newValues.color.toString());
        }
      });
      picking = false;
    });
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).colorPicker.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.colorPicker.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).colorPicker);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).colorPicker);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMTZkNDUwN2RjOWRlZThiNGQ4OWIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNHO0FBQ0s7QUFFL0JDLGlFQUFrQixDQUFDRSxXQUFXLEdBQUc7RUFDN0JDLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFZQyxPQUFPLEVBQUVDLGFBQWEsRUFBRTtJQUNwQyxJQUFJQyxPQUFPLEdBQUdOLHNEQUFTLENBQUNLLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDeEMsSUFBSUcsTUFBTSxHQUFHLEVBQUU7SUFDZixJQUFJQyxPQUFPLEdBQUcsS0FBSztJQUNuQixJQUFJQyxZQUFZLEdBQUcsU0FBZkEsWUFBWUEsQ0FBYUMsR0FBRyxFQUFFO01BQzlCLElBQUksQ0FBQ0YsT0FBTyxFQUFFO1FBQ1ZWLDZDQUFDLENBQUNhLEVBQUUsQ0FBQyxDQUFDQyxXQUFXLENBQUMsVUFBVSxFQUFFRixHQUFHLENBQUM7TUFDdEM7SUFDSixDQUFDO0lBRUQsSUFBSUcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztJQUM5QkEsSUFBSSxDQUFDQyxPQUFPLENBQUMsVUFBVUMsR0FBRyxFQUFFO01BQ3hCLElBQUlDLEtBQUssR0FBR1gsT0FBTyxDQUFDVSxHQUFHLENBQUM7TUFDeEIsSUFBSWhCLDREQUFlLENBQUNpQixLQUFLLENBQUMsRUFBRTtRQUN4QkEsS0FBSyxDQUFDRSxTQUFTLENBQUNULFlBQVksQ0FBQztRQUM3QkYsTUFBTSxDQUFDWSxJQUFJLENBQUNILEtBQUssQ0FBQztRQUNsQlgsT0FBTyxDQUFDVSxHQUFHLENBQUMsR0FBR0MsS0FBSyxDQUFDLENBQUM7TUFDMUI7SUFDSixDQUFDLENBQUM7SUFFRixJQUFJTCxFQUFFLEdBQUdiLDZDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDUyxXQUFXLENBQUNQLE9BQU8sQ0FBQztJQUV4Q00sRUFBRSxDQUFDUyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVVDLFNBQVMsRUFBRWhCLE9BQU8sRUFBRTtNQUMvQ0csT0FBTyxHQUFHLElBQUk7TUFDZEQsTUFBTSxDQUFDTyxPQUFPLENBQUMsVUFBVUUsS0FBSyxFQUFFTSxDQUFDLEVBQUU7UUFDL0IsSUFBSUQsU0FBUyxDQUFDRSxLQUFLLEtBQUtDLFNBQVMsRUFBRTtVQUMvQlIsS0FBSyxDQUFDWCxPQUFPLENBQUNrQixLQUFLLENBQUM7UUFDeEIsQ0FBQyxNQUFNO1VBQ0hQLEtBQUssQ0FBQ0ssU0FBUyxDQUFDRSxLQUFLLENBQUNFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckM7TUFDSixDQUFDLENBQUM7TUFDRmpCLE9BQU8sR0FBRyxLQUFLO0lBQ25CLENBQUMsQ0FBQztFQUNOO0FBQ0osQ0FBQztBQUVEVCxpRUFBa0IsQ0FBQ0UsV0FBVyxDQUFDQyxJQUFJLEdBQUdILCtEQUFrQixDQUFDRSxXQUFXLENBQUNDLElBQUksQ0FBQ3dCLElBQUksQ0FBQzNCLGlFQUFrQixDQUFDRSxXQUFXLENBQUM7QUFDOUcsaUVBQWVGLGlFQUFrQixDQUFDRSxXQUFXLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy9iaW5kaW5ncy9jb2xvci1waWNrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC1jb2xvcnBpY2tlcic7XG5cbmtvLmJpbmRpbmdIYW5kbGVycy5jb2xvclBpY2tlciA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpO1xuICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgIHZhciBwaWNraW5nID0gZmFsc2U7XG4gICAgICAgIHZhciB1cGRhdGVWYWx1ZXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAoIXBpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICAkKGNwKS5jb2xvcnBpY2tlcignc2V0VmFsdWUnLCB2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBrZXlzID0gWydjb2xvcicsICdmb3JtYXQnXTtcbiAgICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgIGlmIChrby5pc09ic2VydmFibGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuc3Vic2NyaWJlKHVwZGF0ZVZhbHVlcyk7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjcCA9ICQoZWxlbWVudCkuY29sb3JwaWNrZXIob3B0aW9ucyk7XG5cbiAgICAgICAgY3Aub24oJ2NoYW5nZUNvbG9yJywgZnVuY3Rpb24gKG5ld1ZhbHVlcywgb3B0aW9ucykge1xuICAgICAgICAgICAgcGlja2luZyA9IHRydWU7XG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWVzLmNvbG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUob3B0aW9ucy5jb2xvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUobmV3VmFsdWVzLmNvbG9yLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGlja2luZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5rby5iaW5kaW5nSGFuZGxlcnMuY29sb3JQaWNrZXIuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5jb2xvclBpY2tlci5pbml0LmJpbmQoa28uYmluZGluZ0hhbmRsZXJzLmNvbG9yUGlja2VyKTtcbmV4cG9ydCBkZWZhdWx0IGtvLmJpbmRpbmdIYW5kbGVycy5jb2xvclBpY2tlcjtcbiJdLCJuYW1lcyI6WyIkIiwia28iLCJiaW5kaW5nSGFuZGxlcnMiLCJjb2xvclBpY2tlciIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsIm9wdGlvbnMiLCJ1bndyYXAiLCJ2YWx1ZXMiLCJwaWNraW5nIiwidXBkYXRlVmFsdWVzIiwidmFsIiwiY3AiLCJjb2xvcnBpY2tlciIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwidmFsdWUiLCJpc09ic2VydmFibGUiLCJzdWJzY3JpYmUiLCJwdXNoIiwib24iLCJuZXdWYWx1ZXMiLCJpIiwiY29sb3IiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsImJpbmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==