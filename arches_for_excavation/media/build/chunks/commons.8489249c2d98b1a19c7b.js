"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[4425],{

/***/ 4425:
/*!**********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/codemirror.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codemirror */ 15237);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! codemirror/mode/javascript/javascript */ 16792);
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_3__);




var initialize = function initialize(element, valueAccessor, CodeMirror) {
  var options = knockout__WEBPACK_IMPORTED_MODULE_1___default().toJS(valueAccessor());
  options.value = options.value || '';
  var editor = new CodeMirror(element, options);
  editor.on('change', function (cm) {
    var value = knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(valueAccessor()).value;
    if (knockout__WEBPACK_IMPORTED_MODULE_1___default().isObservable(value)) {
      value(cm.getValue());
    } else {
      knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(valueAccessor()).value = cm.getValue();
    }
  });
  var subscriptions = [];
  if (knockout__WEBPACK_IMPORTED_MODULE_1___default().isObservable(valueAccessor().value)) {
    subscriptions.push(valueAccessor().value.subscribe(function () {
      if (editor.getValue() !== valueAccessor().value()) editor.setValue(valueAccessor().value());
    }));
  }
  if (knockout__WEBPACK_IMPORTED_MODULE_1___default().isObservable(valueAccessor().mode)) {
    subscriptions.push(valueAccessor().mode.subscribe(function () {
      editor.setOption('mode', valueAccessor().mode());
    }));
  }
  var wrapperElement = jquery__WEBPACK_IMPORTED_MODULE_0___default()(editor.getWrapperElement());
  knockout__WEBPACK_IMPORTED_MODULE_1___default().utils.domNodeDisposal.addDisposeCallback(element, function () {
    wrapperElement.remove();
    for (var i = 0; i < subscriptions.length; i++) {
      subscriptions[i].dispose();
    }
  });
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).codemirror = {
  init: function init(element, valueAccessor) {
    initialize(element, valueAccessor, (codemirror__WEBPACK_IMPORTED_MODULE_2___default()));
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).codemirror.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.codemirror.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).codemirror);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).codemirror);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuODQ4OTI0OWMyZDk4YjFhMTljN2IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0c7QUFDVTtBQUNXO0FBRS9DLElBQU1HLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFZQyxPQUFPLEVBQUVDLGFBQWEsRUFBRUMsVUFBVSxFQUFFO0VBQzVELElBQUlDLE9BQU8sR0FBR04sb0RBQU8sQ0FBQ0ksYUFBYSxDQUFDLENBQUMsQ0FBQztFQUN0Q0UsT0FBTyxDQUFDRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQ0UsS0FBSyxJQUFJLEVBQUU7RUFDbkMsSUFBSUMsTUFBTSxHQUFHLElBQUlKLFVBQVUsQ0FBQ0YsT0FBTyxFQUFFRyxPQUFPLENBQUM7RUFDN0NHLE1BQU0sQ0FBQ0MsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFTQyxFQUFFLEVBQUU7SUFDN0IsSUFBSUgsS0FBSyxHQUFHUixzREFBUyxDQUFDSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUNJLEtBQUs7SUFDNUMsSUFBSVIsNERBQWUsQ0FBQ1EsS0FBSyxDQUFDLEVBQUU7TUFDeEJBLEtBQUssQ0FBQ0csRUFBRSxDQUFDRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsTUFBTTtNQUNIZCxzREFBUyxDQUFDSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUNJLEtBQUssR0FBR0csRUFBRSxDQUFDRyxRQUFRLENBQUMsQ0FBQztJQUNwRDtFQUNKLENBQUMsQ0FBQztFQUNGLElBQUlDLGFBQWEsR0FBRyxFQUFFO0VBQ3RCLElBQUlmLDREQUFlLENBQUNJLGFBQWEsQ0FBQyxDQUFDLENBQUNJLEtBQUssQ0FBQyxFQUFFO0lBQ3hDTyxhQUFhLENBQUNDLElBQUksQ0FBQ1osYUFBYSxDQUFDLENBQUMsQ0FBQ0ksS0FBSyxDQUFDUyxTQUFTLENBQUMsWUFBVztNQUMxRCxJQUFJUixNQUFNLENBQUNLLFFBQVEsQ0FBQyxDQUFDLEtBQUtWLGFBQWEsQ0FBQyxDQUFDLENBQUNJLEtBQUssQ0FBQyxDQUFDLEVBQzdDQyxNQUFNLENBQUNTLFFBQVEsQ0FBQ2QsYUFBYSxDQUFDLENBQUMsQ0FBQ0ksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztFQUNQO0VBQ0EsSUFBSVIsNERBQWUsQ0FBQ0ksYUFBYSxDQUFDLENBQUMsQ0FBQ2UsSUFBSSxDQUFDLEVBQUU7SUFDdkNKLGFBQWEsQ0FBQ0MsSUFBSSxDQUFDWixhQUFhLENBQUMsQ0FBQyxDQUFDZSxJQUFJLENBQUNGLFNBQVMsQ0FBQyxZQUFXO01BQ3pEUixNQUFNLENBQUNXLFNBQVMsQ0FBQyxNQUFNLEVBQUVoQixhQUFhLENBQUMsQ0FBQyxDQUFDZSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0VBQ1A7RUFFQSxJQUFJRSxjQUFjLEdBQUd0Qiw2Q0FBQyxDQUFDVSxNQUFNLENBQUNhLGlCQUFpQixDQUFDLENBQUMsQ0FBQztFQUNsRHRCLHFEQUFRLENBQUN3QixlQUFlLENBQUNDLGtCQUFrQixDQUFDdEIsT0FBTyxFQUFFLFlBQVc7SUFDNURrQixjQUFjLENBQUNLLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHWixhQUFhLENBQUNhLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7TUFDM0NaLGFBQWEsQ0FBQ1ksQ0FBQyxDQUFDLENBQUNFLE9BQU8sQ0FBQyxDQUFDO0lBQzlCO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVEN0IsaUVBQWtCLENBQUNDLFVBQVUsR0FBRztFQUM1QjhCLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFHNUIsT0FBTyxFQUFFQyxhQUFhLEVBQUs7SUFDOUJGLFVBQVUsQ0FBQ0MsT0FBTyxFQUFFQyxhQUFhLEVBQUVILG1EQUFVLENBQUM7RUFDbEQ7QUFDSixDQUFDO0FBQ0RELGlFQUFrQixDQUFDQyxVQUFVLENBQUM4QixJQUFJLEdBQUcvQiwrREFBa0IsQ0FBQ0MsVUFBVSxDQUFDOEIsSUFBSSxDQUFDQyxJQUFJLENBQUNoQyxpRUFBa0IsQ0FBQ0MsVUFBVSxDQUFDO0FBRTNHLGlFQUFlRCxpRUFBa0IsQ0FBQ0MsVUFBVSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvYmluZGluZ3MvY29kZW1pcnJvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBjb2RlbWlycm9yIGZyb20gJ2NvZGVtaXJyb3InO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUvamF2YXNjcmlwdC9qYXZhc2NyaXB0JztcblxuY29uc3QgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIENvZGVNaXJyb3IpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGtvLnRvSlModmFsdWVBY2Nlc3NvcigpKTtcbiAgICBvcHRpb25zLnZhbHVlID0gb3B0aW9ucy52YWx1ZSB8fCAnJztcbiAgICB2YXIgZWRpdG9yID0gbmV3IENvZGVNaXJyb3IoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgZWRpdG9yLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihjbSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBrby51bndyYXAodmFsdWVBY2Nlc3NvcigpKS52YWx1ZTtcbiAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlKGNtLmdldFZhbHVlKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga28udW53cmFwKHZhbHVlQWNjZXNzb3IoKSkudmFsdWUgPSBjbS5nZXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFyIHN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKHZhbHVlQWNjZXNzb3IoKS52YWx1ZSkpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKHZhbHVlQWNjZXNzb3IoKS52YWx1ZS5zdWJzY3JpYmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoZWRpdG9yLmdldFZhbHVlKCkgIT09IHZhbHVlQWNjZXNzb3IoKS52YWx1ZSgpKVxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRWYWx1ZSh2YWx1ZUFjY2Vzc29yKCkudmFsdWUoKSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKGtvLmlzT2JzZXJ2YWJsZSh2YWx1ZUFjY2Vzc29yKCkubW9kZSkpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKHZhbHVlQWNjZXNzb3IoKS5tb2RlLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb24oJ21vZGUnLCB2YWx1ZUFjY2Vzc29yKCkubW9kZSgpKTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHZhciB3cmFwcGVyRWxlbWVudCA9ICQoZWRpdG9yLmdldFdyYXBwZXJFbGVtZW50KCkpO1xuICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soZWxlbWVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHdyYXBwZXJFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNjcmlwdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbnNbaV0uZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5rby5iaW5kaW5nSGFuZGxlcnMuY29kZW1pcnJvciA9IHtcbiAgICBpbml0OiAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvcikgPT4ge1xuICAgICAgICBpbml0aWFsaXplKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGNvZGVtaXJyb3IpO1xuICAgIH1cbn07XG5rby5iaW5kaW5nSGFuZGxlcnMuY29kZW1pcnJvci5pbml0ID0ga28uYmluZGluZ0hhbmRsZXJzLmNvZGVtaXJyb3IuaW5pdC5iaW5kKGtvLmJpbmRpbmdIYW5kbGVycy5jb2RlbWlycm9yKTtcblxuZXhwb3J0IGRlZmF1bHQga28uYmluZGluZ0hhbmRsZXJzLmNvZGVtaXJyb3I7XG4iXSwibmFtZXMiOlsiJCIsImtvIiwiY29kZW1pcnJvciIsImluaXRpYWxpemUiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsIkNvZGVNaXJyb3IiLCJvcHRpb25zIiwidG9KUyIsInZhbHVlIiwiZWRpdG9yIiwib24iLCJjbSIsInVud3JhcCIsImlzT2JzZXJ2YWJsZSIsImdldFZhbHVlIiwic3Vic2NyaXB0aW9ucyIsInB1c2giLCJzdWJzY3JpYmUiLCJzZXRWYWx1ZSIsIm1vZGUiLCJzZXRPcHRpb24iLCJ3cmFwcGVyRWxlbWVudCIsImdldFdyYXBwZXJFbGVtZW50IiwidXRpbHMiLCJkb21Ob2RlRGlzcG9zYWwiLCJhZGREaXNwb3NlQ2FsbGJhY2siLCJyZW1vdmUiLCJpIiwibGVuZ3RoIiwiZGlzcG9zZSIsImJpbmRpbmdIYW5kbGVycyIsImluaXQiLCJiaW5kIl0sInNvdXJjZVJvb3QiOiIifQ==