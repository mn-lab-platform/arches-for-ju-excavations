"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[88428],{

/***/ 88428:
/*!*******************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/resizable-sidepanel.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);



(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).resizableSidepanel = {
  init: function init(element, valueAccessor, allBindings, viewModel) {
    var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
    var start = null;
    var handle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.createElement('div')).attr('draggable', 'true');
    for (var i = 0; i < 3; i++) {
      handle.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.createElement('i')).addClass('fa fa-circle'));
    }
    $el.after(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.createElement('div')).addClass('sidepanel-draggable').append(handle).on('dragstart', function (e) {
      if (arches__WEBPACK_IMPORTED_MODULE_2__["default"].activeLanguageDir == "rtl") {
        start = $el.width() + e.pageX;
      } else {
        start = $el.width() - e.pageX;
      }
      // Fix for Firefox where dragging was not working:
      e.originalEvent.dataTransfer.setData('Text', this.id);
    }).on('dragend', function (e) {
      start = null;
    }));
    if (arches__WEBPACK_IMPORTED_MODULE_2__["default"].activeLanguageDir == "rtl") {
      $el.css('flex', $el.width() + 'px 0 0');
    } else {
      $el.css('flex', '0 0 ' + $el.width() + 'px');
    }
    $el.css('width', 'auto');
    document.addEventListener('dragover', function (e) {
      if (start !== null) {
        if (arches__WEBPACK_IMPORTED_MODULE_2__["default"].activeLanguageDir == "rtl") {
          $el.css('flex', start - e.pageX + 'px 0 0');
        } else {
          $el.css('flex', '0 0 ' + (start + e.pageX) + 'px');
        }
      }
    }, false);
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).resizableSidepanel.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.resizableSidepanel.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).resizableSidepanel);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).resizableSidepanel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxDQUFDO0VBQ2I7QUFDSixDQUFDO0FBQ0R2QixpRUFBa0IsQ0FBQ0csa0JBQWtCLENBQUNDLElBQUksR0FBR0osK0RBQWtCLENBQUNHLGtCQUFrQixDQUFDQyxJQUFJLENBQUMwQixJQUFJLENBQUM5QixpRUFBa0IsQ0FBQ0csa0JBQWtCLENBQUM7QUFFbkksaUVBQWVILGlFQUFrQixDQUFDRyxrQkFBa0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2JpbmRpbmdzL3Jlc2l6YWJsZS1zaWRlcGFuZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5cbmtvLmJpbmRpbmdIYW5kbGVycy5yZXNpemFibGVTaWRlcGFuZWwgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzLCB2aWV3TW9kZWwpIHtcbiAgICAgICAgdmFyICRlbCA9ICQoZWxlbWVudCk7XG4gICAgICAgIHZhciBzdGFydCA9IG51bGw7XG4gICAgICAgIHZhciBoYW5kbGUgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxuICAgICAgICAgICAgLmF0dHIoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGhhbmRsZS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJykpLmFkZENsYXNzKCdmYSBmYS1jaXJjbGUnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbC5hZnRlcihcbiAgICAgICAgICAgICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzaWRlcGFuZWwtZHJhZ2dhYmxlJylcbiAgICAgICAgICAgICAgICAuYXBwZW5kKGhhbmRsZSlcbiAgICAgICAgICAgICAgICAub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmNoZXMuYWN0aXZlTGFuZ3VhZ2VEaXIgPT0gXCJydGxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSAkZWwud2lkdGgoKSArIGUucGFnZVg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9ICRlbC53aWR0aCgpIC0gZS5wYWdlWDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBGaXggZm9yIEZpcmVmb3ggd2hlcmUgZHJhZ2dpbmcgd2FzIG5vdCB3b3JraW5nOlxuICAgICAgICAgICAgICAgICAgICBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ1RleHQnLCB0aGlzLmlkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignZHJhZ2VuZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChhcmNoZXMuYWN0aXZlTGFuZ3VhZ2VEaXIgPT0gXCJydGxcIikge1xuICAgICAgICAgICAgJGVsLmNzcygnZmxleCcsICRlbC53aWR0aCgpICsgJ3B4IDAgMCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGVsLmNzcygnZmxleCcsICcwIDAgJyArICRlbC53aWR0aCgpICsgJ3B4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJGVsLmNzcygnd2lkdGgnLCAnYXV0bycpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChzdGFydCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChhcmNoZXMuYWN0aXZlTGFuZ3VhZ2VEaXIgPT0gXCJydGxcIikge1xuICAgICAgICAgICAgICAgICAgICAkZWwuY3NzKCdmbGV4JywgKHN0YXJ0IC0gZS5wYWdlWCkgKyAncHggMCAwJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsLmNzcygnZmxleCcsICcwIDAgJyArIChzdGFydCArIGUucGFnZVgpICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxufTtcbmtvLmJpbmRpbmdIYW5kbGVycy5yZXNpemFibGVTaWRlcGFuZWwuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5yZXNpemFibGVTaWRlcGFuZWwuaW5pdC5iaW5kKGtvLmJpbmRpbmdIYW5kbGVycy5yZXNpemFibGVTaWRlcGFuZWwpO1xuXG5leHBvcnQgZGVmYXVsdCBrby5iaW5kaW5nSGFuZGxlcnMucmVzaXphYmxlU2lkZXBhbmVsO1xuIl0sIm5hbWVzIjpbIiQiLCJrbyIsImFyY2hlcyIsImJpbmRpbmdIYW5kbGVycyIsInJlc2l6YWJsZVNpZGVwYW5lbCIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsImFsbEJpbmRpbmdzIiwidmlld01vZGVsIiwiJGVsIiwic3RhcnQiLCJoYW5kbGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhdHRyIiwiaSIsImFwcGVuZCIsImFkZENsYXNzIiwiYWZ0ZXIiLCJvbiIsImUiLCJhY3RpdmVMYW5ndWFnZURpciIsIndpZHRoIiwicGFnZVgiLCJvcmlnaW5hbEV2ZW50IiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImlkIiwiY3NzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==