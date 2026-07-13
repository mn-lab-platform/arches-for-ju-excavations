"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[34344],{

/***/ 34344:
/*!********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/dragDrop.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery-ui */ 76364);
/* harmony import */ var jquery_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery_ui__WEBPACK_IMPORTED_MODULE_2__);



var _dragged;
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).drag = {
  init: function init(element, valueAccessor, allBindingsAccessor, viewModel) {
    if (!valueAccessor().preventDrag) {
      var dragElement = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
      var dragOptions = {
        helper: 'clone',
        revert: true,
        revertDuration: 0,
        start: function start() {
          _dragged = knockout__WEBPACK_IMPORTED_MODULE_1___default().utils.unwrapObservable(valueAccessor().value);
        },
        cursor: 'default',
        scroll: false,
        zIndex: 1000,
        appendTo: 'body'
      };
      dragElement.draggable(dragOptions).disableSelection();
    } else {
      console.log(valueAccessor());
    }
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).drop = {
  init: function init(element, valueAccessor, allBindingsAccessor, viewModel) {
    var dropElement = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
    var dropOptions = {
      drop: function drop(event, ui) {
        valueAccessor().value(_dragged);
      }
    };
    dropElement.droppable(dropOptions);
  }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOGM3Zjk1M2I1YWJlNGE4MmQ4MDIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNHO0FBQ1A7QUFFbkIsSUFBSUUsUUFBUTtBQUNaRCxpRUFBa0IsQ0FBQ0csSUFBSSxHQUFHO0VBQ3RCQyxJQUFJLEVBQUUsU0FBTkEsSUFBSUEsQ0FBV0MsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLG1CQUFtQixFQUFFQyxTQUFTLEVBQUU7SUFDbkUsSUFBSSxDQUFDRixhQUFhLENBQUMsQ0FBQyxDQUFDRyxXQUFXLEVBQUU7TUFDOUIsSUFBSUMsV0FBVyxHQUFHWCw2Q0FBQyxDQUFDTSxPQUFPLENBQUM7TUFDNUIsSUFBSU0sV0FBVyxHQUFHO1FBQ2RDLE1BQU0sRUFBRSxPQUFPO1FBQ2ZDLE1BQU0sRUFBRSxJQUFJO1FBQ1pDLGNBQWMsRUFBRSxDQUFDO1FBQ2pCQyxLQUFLLEVBQUUsU0FBUEEsS0FBS0EsQ0FBQSxFQUFhO1VBQ2RkLFFBQVEsR0FBR0QscURBQVEsQ0FBQ2lCLGdCQUFnQixDQUFDWCxhQUFhLENBQUMsQ0FBQyxDQUFDWSxLQUFLLENBQUM7UUFDL0QsQ0FBQztRQUNEQyxNQUFNLEVBQUUsU0FBUztRQUNqQkMsTUFBTSxFQUFFLEtBQUs7UUFDYkMsTUFBTSxFQUFFLElBQUk7UUFDWkMsUUFBUSxFQUFFO01BQ2QsQ0FBQztNQUNEWixXQUFXLENBQUNhLFNBQVMsQ0FBQ1osV0FBVyxDQUFDLENBQUNhLGdCQUFnQixDQUFDLENBQUM7SUFDekQsQ0FBQyxNQUFNO01BQ0hDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDcEIsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUNoQztFQUNKO0FBQ0osQ0FBQztBQUVETixpRUFBa0IsQ0FBQzJCLElBQUksR0FBRztFQUN0QnZCLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFXQyxPQUFPLEVBQUVDLGFBQWEsRUFBRUMsbUJBQW1CLEVBQUVDLFNBQVMsRUFBRTtJQUNuRSxJQUFJb0IsV0FBVyxHQUFHN0IsNkNBQUMsQ0FBQ00sT0FBTyxDQUFDO0lBQzVCLElBQUl3QixXQUFXLEdBQUc7TUFDZEYsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQVdHLEtBQUssRUFBRUMsRUFBRSxFQUFFO1FBQ3RCekIsYUFBYSxDQUFDLENBQUMsQ0FBQ1ksS0FBSyxDQUFDakIsUUFBUSxDQUFDO01BQ25DO0lBQ0osQ0FBQztJQUNEMkIsV0FBVyxDQUFDSSxTQUFTLENBQUNILFdBQVcsQ0FBQztFQUN0QztBQUNKLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2JpbmRpbmdzL2RyYWdEcm9wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0ICdqcXVlcnktdWknOyBcblxudmFyIF9kcmFnZ2VkO1xua28uYmluZGluZ0hhbmRsZXJzLmRyYWcgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3NBY2Nlc3Nvciwgdmlld01vZGVsKSB7XG4gICAgICAgIGlmICghdmFsdWVBY2Nlc3NvcigpLnByZXZlbnREcmFnKSB7XG4gICAgICAgICAgICB2YXIgZHJhZ0VsZW1lbnQgPSAkKGVsZW1lbnQpO1xuICAgICAgICAgICAgdmFyIGRyYWdPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGhlbHBlcjogJ2Nsb25lJyxcbiAgICAgICAgICAgICAgICByZXZlcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcmV2ZXJ0RHVyYXRpb246IDAsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBfZHJhZ2dlZCA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodmFsdWVBY2Nlc3NvcigpLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgICAgICAgICAgICAgIHNjcm9sbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgekluZGV4OiAxMDAwLFxuICAgICAgICAgICAgICAgIGFwcGVuZFRvOiAnYm9keSdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkcmFnRWxlbWVudC5kcmFnZ2FibGUoZHJhZ09wdGlvbnMpLmRpc2FibGVTZWxlY3Rpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbHVlQWNjZXNzb3IoKSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5rby5iaW5kaW5nSGFuZGxlcnMuZHJvcCA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5nc0FjY2Vzc29yLCB2aWV3TW9kZWwpIHtcbiAgICAgICAgdmFyIGRyb3BFbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICAgICAgdmFyIGRyb3BPcHRpb25zID0ge1xuICAgICAgICAgICAgZHJvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVBY2Nlc3NvcigpLnZhbHVlKF9kcmFnZ2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZHJvcEVsZW1lbnQuZHJvcHBhYmxlKGRyb3BPcHRpb25zKTtcbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbIiQiLCJrbyIsIl9kcmFnZ2VkIiwiYmluZGluZ0hhbmRsZXJzIiwiZHJhZyIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsImFsbEJpbmRpbmdzQWNjZXNzb3IiLCJ2aWV3TW9kZWwiLCJwcmV2ZW50RHJhZyIsImRyYWdFbGVtZW50IiwiZHJhZ09wdGlvbnMiLCJoZWxwZXIiLCJyZXZlcnQiLCJyZXZlcnREdXJhdGlvbiIsInN0YXJ0IiwidXRpbHMiLCJ1bndyYXBPYnNlcnZhYmxlIiwidmFsdWUiLCJjdXJzb3IiLCJzY3JvbGwiLCJ6SW5kZXgiLCJhcHBlbmRUbyIsImRyYWdnYWJsZSIsImRpc2FibGVTZWxlY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiZHJvcCIsImRyb3BFbGVtZW50IiwiZHJvcE9wdGlvbnMiLCJldmVudCIsInVpIiwiZHJvcHBhYmxlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=