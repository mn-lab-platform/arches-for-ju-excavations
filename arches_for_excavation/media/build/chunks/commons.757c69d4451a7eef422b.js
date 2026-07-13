"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[72253],{

/***/ 72253:
/*!**********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/datepicker.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 95093);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap-datetimepicker */ 48918);
/* harmony import */ var bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_4__);






/**
 * A knockout.js binding for the jQuery UI datepicker
 * @constructor
 * @name datepicker
 */
(knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).datepicker = {
  init: function init(element, valueAccessor, allBindingsAccessor) {
    //initialize datepicker with some optional options
    var options = valueAccessor() || {};
    var minDate;
    var maxDate;
    underscore__WEBPACK_IMPORTED_MODULE_1___default().forEach(options, function (value, key) {
      if (knockout__WEBPACK_IMPORTED_MODULE_2___default().isObservable(value)) {
        var rawValue = options[key]();
        if (key === 'minDate') {
          minDate = value;
          rawValue = rawValue || false;
        } else if (key === 'maxDate') {
          maxDate = value;
          rawValue = rawValue || false;
        }
        value.subscribe(function (newValue) {
          if (underscore__WEBPACK_IMPORTED_MODULE_1___default().isObject(newValue)) {
            newValue = moment__WEBPACK_IMPORTED_MODULE_3___default()(newValue).format(options['format']);
          }
          options[key] = newValue || false;
          if ((key === 'minDate' || key === 'maxDate') && typeof minDate === 'function' && minDate() && typeof maxDate === 'function' && maxDate() && (minDate() > maxDate() || maxDate() < minDate())) {
            if (key === 'minDate' && maxDate()) {
              maxDate(minDate());
            } else if (minDate()) {
              minDate(maxDate());
            }
            options[key === 'minDate' ? 'maxDate' : 'minDate'] = moment__WEBPACK_IMPORTED_MODULE_3___default()(newValue).format(options['format']).toDate();
          }
          var picker = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).data("DateTimePicker");
          underscore__WEBPACK_IMPORTED_MODULE_1___default().each(options, function (val, key) {
            if (!val) {
              delete options[key];
            }
          });
          if (picker) {
            picker.options(options);
            picker.date(allBindingsAccessor().value());
          }
        });
        options[key] = rawValue;
      }
    });
    underscore__WEBPACK_IMPORTED_MODULE_1___default().each(options, function (val, key) {
      if (!val) {
        delete options[key];
      }
    });
    var format = options.format;
    if (!!options['keepInvalid']) {
      delete options['format'];
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).datetimepicker(options);
    var value = allBindingsAccessor().value;
    var picker = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).data("DateTimePicker");
    value.subscribe(function (val) {
      if (val !== 'Date of Data Entry') {
        picker.date(val);
      }
    });
    knockout__WEBPACK_IMPORTED_MODULE_2___default().utils.registerEventHandler(element, "dp.change", function (event) {
      if (knockout__WEBPACK_IMPORTED_MODULE_2___default().isObservable(value)) {
        if (value() === "" || event.date === false) {
          value(null);
        } else if (event.date.isValid()) {
          value(event.date.format(format));
        }
      }
    });
    knockout__WEBPACK_IMPORTED_MODULE_2___default().utils.domNodeDisposal.addDisposeCallback(element, function () {
      var picker = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).data("datepicker");
      if (picker) {
        picker.destroy();
      }
    });
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).datepicker.init = knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers.datepicker.init.bind((knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).datepicker);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).datepicker);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNzU3YzY5ZDQ0NTFhN2VlZjQyMmIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDSTtBQUNEO0FBQ0U7QUFDTTs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRSxpRUFBa0IsQ0FBQ0csVUFBVSxHQUFHO0VBQzVCQyxJQUFJLEVBQUUsU0FBTkEsSUFBSUEsQ0FBWUMsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLG1CQUFtQixFQUFFO0lBQ3pEO0lBQ0EsSUFBSUMsT0FBTyxHQUFHRixhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxJQUFJRyxPQUFPO0lBQ1gsSUFBSUMsT0FBTztJQUVYWCx5REFBUyxDQUFDUyxPQUFPLEVBQUUsVUFBVUksS0FBSyxFQUFFQyxHQUFHLEVBQUU7TUFDckMsSUFBSWIsNERBQWUsQ0FBQ1ksS0FBSyxDQUFDLEVBQUU7UUFDeEIsSUFBSUcsUUFBUSxHQUFHUCxPQUFPLENBQUNLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSUEsR0FBRyxLQUFLLFNBQVMsRUFBRTtVQUNuQkosT0FBTyxHQUFHRyxLQUFLO1VBQ2ZHLFFBQVEsR0FBR0EsUUFBUSxJQUFJLEtBQUs7UUFDaEMsQ0FBQyxNQUFNLElBQUlGLEdBQUcsS0FBSyxTQUFTLEVBQUU7VUFDMUJILE9BQU8sR0FBR0UsS0FBSztVQUNmRyxRQUFRLEdBQUdBLFFBQVEsSUFBSSxLQUFLO1FBQ2hDO1FBRUFILEtBQUssQ0FBQ0ksU0FBUyxDQUFDLFVBQVVDLFFBQVEsRUFBRTtVQUNoQyxJQUFJbEIsMERBQVUsQ0FBQ2tCLFFBQVEsQ0FBQyxFQUFFO1lBQ3RCQSxRQUFRLEdBQUdoQiw2Q0FBTSxDQUFDZ0IsUUFBUSxDQUFDLENBQUNFLE1BQU0sQ0FBQ1gsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1VBQ3pEO1VBQ0FBLE9BQU8sQ0FBQ0ssR0FBRyxDQUFDLEdBQUdJLFFBQVEsSUFBSSxLQUFLO1VBRWhDLElBQUksQ0FBQ0osR0FBRyxLQUFLLFNBQVMsSUFBSUEsR0FBRyxLQUFLLFNBQVMsS0FDdkMsT0FBT0osT0FBTyxLQUFLLFVBQVUsSUFBSUEsT0FBTyxDQUFDLENBQUMsSUFDMUMsT0FBT0MsT0FBTyxLQUFLLFVBQVUsSUFBSUEsT0FBTyxDQUFDLENBQUMsS0FDekNELE9BQU8sQ0FBQyxDQUFDLEdBQUdDLE9BQU8sQ0FBQyxDQUFDLElBQUlBLE9BQU8sQ0FBQyxDQUFDLEdBQUdELE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsRCxJQUFJSSxHQUFHLEtBQUssU0FBUyxJQUFJSCxPQUFPLENBQUMsQ0FBQyxFQUFFO2NBQ2hDQSxPQUFPLENBQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdEIsQ0FBQyxNQUFNLElBQUlBLE9BQU8sQ0FBQyxDQUFDLEVBQUU7Y0FDbEJBLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0QjtZQUNBRixPQUFPLENBQUNLLEdBQUcsS0FBSyxTQUFTLEdBQUcsU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHWiw2Q0FBTSxDQUFDZ0IsUUFBUSxDQUFDLENBQUNFLE1BQU0sQ0FBQ1gsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUNZLE1BQU0sQ0FBQyxDQUFDO1VBQzVHO1VBRUEsSUFBSUMsTUFBTSxHQUFHdkIsNkNBQUMsQ0FBQ08sT0FBTyxDQUFDLENBQUNpQixJQUFJLENBQUMsZ0JBQWdCLENBQUM7VUFDOUN2QixzREFBTSxDQUFDUyxPQUFPLEVBQUUsVUFBVWdCLEdBQUcsRUFBRVgsR0FBRyxFQUFFO1lBQ2hDLElBQUksQ0FBQ1csR0FBRyxFQUFFO2NBQ04sT0FBT2hCLE9BQU8sQ0FBQ0ssR0FBRyxDQUFDO1lBQ3ZCO1VBQ0osQ0FBQyxDQUFDO1VBQ0YsSUFBSVEsTUFBTSxFQUFFO1lBQ1JBLE1BQU0sQ0FBQ2IsT0FBTyxDQUFDQSxPQUFPLENBQUM7WUFDdkJhLE1BQU0sQ0FBQ0ksSUFBSSxDQUFDbEIsbUJBQW1CLENBQUMsQ0FBQyxDQUFDSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1VBQzlDO1FBQ0osQ0FBQyxDQUFDO1FBRUZKLE9BQU8sQ0FBQ0ssR0FBRyxDQUFDLEdBQUdFLFFBQVE7TUFDM0I7SUFDSixDQUFDLENBQUM7SUFFRmhCLHNEQUFNLENBQUNTLE9BQU8sRUFBRSxVQUFVZ0IsR0FBRyxFQUFFWCxHQUFHLEVBQUU7TUFDaEMsSUFBSSxDQUFDVyxHQUFHLEVBQUU7UUFDTixPQUFPaEIsT0FBTyxDQUFDSyxHQUFHLENBQUM7TUFDdkI7SUFDSixDQUFDLENBQUM7SUFFRixJQUFJTSxNQUFNLEdBQUdYLE9BQU8sQ0FBQ1csTUFBTTtJQUMzQixJQUFJLENBQUMsQ0FBQ1gsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO01BQzFCLE9BQU9BLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDNUI7SUFFQVYsNkNBQUMsQ0FBQ08sT0FBTyxDQUFDLENBQUNxQixjQUFjLENBQUNsQixPQUFPLENBQUM7SUFFbEMsSUFBSUksS0FBSyxHQUFHTCxtQkFBbUIsQ0FBQyxDQUFDLENBQUNLLEtBQUs7SUFDdkMsSUFBSVMsTUFBTSxHQUFHdkIsNkNBQUMsQ0FBQ08sT0FBTyxDQUFDLENBQUNpQixJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDOUNWLEtBQUssQ0FBQ0ksU0FBUyxDQUFDLFVBQUFRLEdBQUcsRUFBSTtNQUNuQixJQUFJQSxHQUFHLEtBQUssb0JBQW9CLEVBQUU7UUFDOUJILE1BQU0sQ0FBQ0ksSUFBSSxDQUFDRCxHQUFHLENBQUM7TUFDcEI7SUFDSixDQUFDLENBQUM7SUFFRnhCLHFEQUFRLENBQUM0QixvQkFBb0IsQ0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVXdCLEtBQUssRUFBRTtNQUNqRSxJQUFJN0IsNERBQWUsQ0FBQ1ksS0FBSyxDQUFDLEVBQUU7UUFDeEIsSUFBSUEsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUlpQixLQUFLLENBQUNKLElBQUksS0FBSyxLQUFLLEVBQUU7VUFDeENiLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDZixDQUFDLE1BQU0sSUFBSWlCLEtBQUssQ0FBQ0osSUFBSSxDQUFDSyxPQUFPLENBQUMsQ0FBQyxFQUFFO1VBQzdCbEIsS0FBSyxDQUFDaUIsS0FBSyxDQUFDSixJQUFJLENBQUNOLE1BQU0sQ0FBQ0EsTUFBTSxDQUFDLENBQUM7UUFDcEM7TUFDSjtJQUNKLENBQUMsQ0FBQztJQUVGbkIscURBQVEsQ0FBQytCLGVBQWUsQ0FBQ0Msa0JBQWtCLENBQUMzQixPQUFPLEVBQUUsWUFBWTtNQUM3RCxJQUFJZ0IsTUFBTSxHQUFHdkIsNkNBQUMsQ0FBQ08sT0FBTyxDQUFDLENBQUNpQixJQUFJLENBQUMsWUFBWSxDQUFDO01BQzFDLElBQUlELE1BQU0sRUFBRTtRQUNSQSxNQUFNLENBQUNZLE9BQU8sQ0FBQyxDQUFDO01BQ3BCO0lBQ0osQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDO0FBQ0RqQyxpRUFBa0IsQ0FBQ0csVUFBVSxDQUFDQyxJQUFJLEdBQUdKLCtEQUFrQixDQUFDRyxVQUFVLENBQUNDLElBQUksQ0FBQzhCLElBQUksQ0FBQ2xDLGlFQUFrQixDQUFDRyxVQUFVLENBQUM7QUFFM0csaUVBQWVILGlFQUFrQixDQUFDRyxVQUFVLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy9iaW5kaW5ncy9kYXRlcGlja2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlcic7XG5cbi8qKlxuICogQSBrbm9ja291dC5qcyBiaW5kaW5nIGZvciB0aGUgalF1ZXJ5IFVJIGRhdGVwaWNrZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQG5hbWUgZGF0ZXBpY2tlclxuICovXG5rby5iaW5kaW5nSGFuZGxlcnMuZGF0ZXBpY2tlciA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3NBY2Nlc3Nvcikge1xuICAgICAgICAvL2luaXRpYWxpemUgZGF0ZXBpY2tlciB3aXRoIHNvbWUgb3B0aW9uYWwgb3B0aW9uc1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHZhbHVlQWNjZXNzb3IoKSB8fCB7fTtcbiAgICAgICAgdmFyIG1pbkRhdGU7XG4gICAgICAgIHZhciBtYXhEYXRlO1xuXG4gICAgICAgIF8uZm9yRWFjaChvcHRpb25zLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmF3VmFsdWUgPSBvcHRpb25zW2tleV0oKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnbWluRGF0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByYXdWYWx1ZSA9IHJhd1ZhbHVlIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnbWF4RGF0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByYXdWYWx1ZSA9IHJhd1ZhbHVlIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlLnN1YnNjcmliZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNPYmplY3QobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IG1vbWVudChuZXdWYWx1ZSkuZm9ybWF0KG9wdGlvbnNbJ2Zvcm1hdCddKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBuZXdWYWx1ZSB8fCBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKGtleSA9PT0gJ21pbkRhdGUnIHx8IGtleSA9PT0gJ21heERhdGUnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG1pbkRhdGUgPT09ICdmdW5jdGlvbicgJiYgbWluRGF0ZSgpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgbWF4RGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBtYXhEYXRlKCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChtaW5EYXRlKCkgPiBtYXhEYXRlKCkgfHwgbWF4RGF0ZSgpIDwgbWluRGF0ZSgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ21pbkRhdGUnICYmIG1heERhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGUobWluRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWluRGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0ZShtYXhEYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXkgPT09ICdtaW5EYXRlJyA/ICdtYXhEYXRlJyA6ICdtaW5EYXRlJ10gPSBtb21lbnQobmV3VmFsdWUpLmZvcm1hdChvcHRpb25zWydmb3JtYXQnXSkudG9EYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgcGlja2VyID0gJChlbGVtZW50KS5kYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChvcHRpb25zLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpY2tlci5vcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGlja2VyLmRhdGUoYWxsQmluZGluZ3NBY2Nlc3NvcigpLnZhbHVlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSByYXdWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9uc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQ7XG4gICAgICAgIGlmICghIW9wdGlvbnNbJ2tlZXBJbnZhbGlkJ10pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zWydmb3JtYXQnXTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoZWxlbWVudCkuZGF0ZXRpbWVwaWNrZXIob3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIHZhbHVlID0gYWxsQmluZGluZ3NBY2Nlc3NvcigpLnZhbHVlO1xuICAgICAgICB2YXIgcGlja2VyID0gJChlbGVtZW50KS5kYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIik7XG4gICAgICAgIHZhbHVlLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gJ0RhdGUgb2YgRGF0YSBFbnRyeScpIHtcbiAgICAgICAgICAgICAgICBwaWNrZXIuZGF0ZSh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBrby51dGlscy5yZWdpc3RlckV2ZW50SGFuZGxlcihlbGVtZW50LCBcImRwLmNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChrby5pc09ic2VydmFibGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKCkgPT09IFwiXCIgfHwgZXZlbnQuZGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5kYXRlLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZShldmVudC5kYXRlLmZvcm1hdChmb3JtYXQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBpY2tlciA9ICQoZWxlbWVudCkuZGF0YShcImRhdGVwaWNrZXJcIik7XG4gICAgICAgICAgICBpZiAocGlja2VyKSB7XG4gICAgICAgICAgICAgICAgcGlja2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmtvLmJpbmRpbmdIYW5kbGVycy5kYXRlcGlja2VyLmluaXQgPSBrby5iaW5kaW5nSGFuZGxlcnMuZGF0ZXBpY2tlci5pbml0LmJpbmQoa28uYmluZGluZ0hhbmRsZXJzLmRhdGVwaWNrZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBrby5iaW5kaW5nSGFuZGxlcnMuZGF0ZXBpY2tlcjtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwibW9tZW50IiwiYmluZGluZ0hhbmRsZXJzIiwiZGF0ZXBpY2tlciIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsImFsbEJpbmRpbmdzQWNjZXNzb3IiLCJvcHRpb25zIiwibWluRGF0ZSIsIm1heERhdGUiLCJmb3JFYWNoIiwidmFsdWUiLCJrZXkiLCJpc09ic2VydmFibGUiLCJyYXdWYWx1ZSIsInN1YnNjcmliZSIsIm5ld1ZhbHVlIiwiaXNPYmplY3QiLCJmb3JtYXQiLCJ0b0RhdGUiLCJwaWNrZXIiLCJkYXRhIiwiZWFjaCIsInZhbCIsImRhdGUiLCJkYXRldGltZXBpY2tlciIsInV0aWxzIiwicmVnaXN0ZXJFdmVudEhhbmRsZXIiLCJldmVudCIsImlzVmFsaWQiLCJkb21Ob2RlRGlzcG9zYWwiLCJhZGREaXNwb3NlQ2FsbGJhY2siLCJkZXN0cm95IiwiYmluZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9