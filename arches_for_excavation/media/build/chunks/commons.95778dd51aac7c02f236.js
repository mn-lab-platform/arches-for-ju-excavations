"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[70711],{

/***/ 70711:
/*!**********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/nouislider.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nouislider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nouislider */ 13729);
/* harmony import */ var nouislider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nouislider__WEBPACK_IMPORTED_MODULE_1__);


(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).noUiSlider = {
  init: function init(element, valueAccessor) {
    var options = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(valueAccessor());
    var values = [];
    var sliding = false;
    var updateValues = function updateValues() {
      if (!sliding) {
        slider.set(values.map(function (value) {
          return value();
        }));
      }
    };
    var keys = ['start', 'end'];
    keys.forEach(function (key) {
      var value = options[key];
      if (knockout__WEBPACK_IMPORTED_MODULE_0___default().isObservable(value)) {
        value.subscribe(updateValues);
        values.push(value);
        options[key] = value();
      }
    });
    var slider = nouislider__WEBPACK_IMPORTED_MODULE_1___default().create(element, options);
    element.noUiSlider.on('slide', function (newValues) {
      sliding = true;
      values.forEach(function (value, i) {
        value(newValues[i]);
      });
      sliding = false;
    });
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).noUiSlider.init = knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers.noUiSlider.init.bind((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).noUiSlider);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).noUiSlider);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOTU3NzhkZDUxYWFjN2MwMmYyMzYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDVTtBQUVwQ0EsaUVBQWtCLENBQUNDLFVBQVUsR0FBRztFQUM1QkUsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQVdDLE9BQU8sRUFBRUMsYUFBYSxFQUFFO0lBQ25DLElBQUlDLE9BQU8sR0FBR04sc0RBQVMsQ0FBQ0ssYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN4QyxJQUFJRyxNQUFNLEdBQUcsRUFBRTtJQUNmLElBQUlDLE9BQU8sR0FBRyxLQUFLO0lBQ25CLElBQUlDLFlBQVksR0FBRyxTQUFmQSxZQUFZQSxDQUFBLEVBQWM7TUFDMUIsSUFBSSxDQUFDRCxPQUFPLEVBQUU7UUFDVkUsTUFBTSxDQUFDQyxHQUFHLENBQUNKLE1BQU0sQ0FBQ0ssR0FBRyxDQUFDLFVBQVNDLEtBQUssRUFBRTtVQUNsQyxPQUFPQSxLQUFLLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztNQUNQO0lBQ0osQ0FBQztJQUVELElBQUlDLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDM0JBLElBQUksQ0FBQ0MsT0FBTyxDQUFDLFVBQVNDLEdBQUcsRUFBRTtNQUN2QixJQUFJSCxLQUFLLEdBQUdSLE9BQU8sQ0FBQ1csR0FBRyxDQUFDO01BQ3hCLElBQUlqQiw0REFBZSxDQUFDYyxLQUFLLENBQUMsRUFBRTtRQUN4QkEsS0FBSyxDQUFDSyxTQUFTLENBQUNULFlBQVksQ0FBQztRQUM3QkYsTUFBTSxDQUFDWSxJQUFJLENBQUNOLEtBQUssQ0FBQztRQUNsQlIsT0FBTyxDQUFDVyxHQUFHLENBQUMsR0FBR0gsS0FBSyxDQUFDLENBQUM7TUFDMUI7SUFDSixDQUFDLENBQUM7SUFFRixJQUFJSCxNQUFNLEdBQUdWLHdEQUFpQixDQUFDRyxPQUFPLEVBQUVFLE9BQU8sQ0FBQztJQUVoREYsT0FBTyxDQUFDSCxVQUFVLENBQUNxQixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVNDLFNBQVMsRUFBRTtNQUMvQ2QsT0FBTyxHQUFHLElBQUk7TUFDZEQsTUFBTSxDQUFDUSxPQUFPLENBQUMsVUFBU0YsS0FBSyxFQUFFVSxDQUFDLEVBQUU7UUFDOUJWLEtBQUssQ0FBQ1MsU0FBUyxDQUFDQyxDQUFDLENBQUMsQ0FBQztNQUN2QixDQUFDLENBQUM7TUFDRmYsT0FBTyxHQUFHLEtBQUs7SUFDbkIsQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDO0FBQ0RULGlFQUFrQixDQUFDQyxVQUFVLENBQUNFLElBQUksR0FBR0gsK0RBQWtCLENBQUNDLFVBQVUsQ0FBQ0UsSUFBSSxDQUFDc0IsSUFBSSxDQUFDekIsaUVBQWtCLENBQUNDLFVBQVUsQ0FBQztBQUUzRyxpRUFBZUQsaUVBQWtCLENBQUNDLFVBQVUsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2JpbmRpbmdzL25vdWlzbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBub1VpU2xpZGVyIGZyb20gJ25vdWlzbGlkZXInO1xuXG5rby5iaW5kaW5nSGFuZGxlcnMubm9VaVNsaWRlciA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ga28udW53cmFwKHZhbHVlQWNjZXNzb3IoKSk7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgdmFyIHNsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIHVwZGF0ZVZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFzbGlkaW5nKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyLnNldCh2YWx1ZXMubWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSgpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIga2V5cyA9IFsnc3RhcnQnLCAnZW5kJ107XG4gICAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgIGlmIChrby5pc09ic2VydmFibGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuc3Vic2NyaWJlKHVwZGF0ZVZhbHVlcyk7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBzbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShlbGVtZW50LCBvcHRpb25zKTtcblxuICAgICAgICBlbGVtZW50Lm5vVWlTbGlkZXIub24oJ3NsaWRlJywgZnVuY3Rpb24obmV3VmFsdWVzKSB7XG4gICAgICAgICAgICBzbGlkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUobmV3VmFsdWVzW2ldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2xpZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xua28uYmluZGluZ0hhbmRsZXJzLm5vVWlTbGlkZXIuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5ub1VpU2xpZGVyLmluaXQuYmluZChrby5iaW5kaW5nSGFuZGxlcnMubm9VaVNsaWRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmJpbmRpbmdIYW5kbGVycy5ub1VpU2xpZGVyO1xuIl0sIm5hbWVzIjpbImtvIiwibm9VaVNsaWRlciIsImJpbmRpbmdIYW5kbGVycyIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsIm9wdGlvbnMiLCJ1bndyYXAiLCJ2YWx1ZXMiLCJzbGlkaW5nIiwidXBkYXRlVmFsdWVzIiwic2xpZGVyIiwic2V0IiwibWFwIiwidmFsdWUiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImlzT2JzZXJ2YWJsZSIsInN1YnNjcmliZSIsInB1c2giLCJjcmVhdGUiLCJvbiIsIm5ld1ZhbHVlcyIsImkiLCJiaW5kIl0sInNvdXJjZVJvb3QiOiIifQ==