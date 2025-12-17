"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[40513],{

/***/ 40513:
/*!****************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/key-events-click.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);



// Register binding of onEnterkeyClick. e.g. <div data-bind="onEnterkeyClick"> </div>
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).onEnterkeyClick = {
  init: function init(element, valueAccessor) {
    knockout__WEBPACK_IMPORTED_MODULE_1___default().utils.unwrapObservable(valueAccessor()); // Unwrap to get subscription.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).keypress(function (event) {
      var keyCode = event.which ? event.which : event.keyCode;
      if (keyCode === 13) {
        // Check if keypress is <enter>.
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).click();
      }
      return false; // Allow default action.
    });
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).onEnterkeyClick.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.onEnterkeyClick.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).onEnterkeyClick);

// Register binding of onSpaceClick. e.g. <div data-bind="onSpaceClick"> </div>
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).onSpaceClick = {
  init: function init(element, valueAccessor) {
    knockout__WEBPACK_IMPORTED_MODULE_1___default().utils.unwrapObservable(valueAccessor()); // Unwrap to get subscription.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).keypress(function (event) {
      var keyCode = event.which ? event.which : event.keyCode;
      if (keyCode === 32) {
        // Check if keypress is <space>.
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).click();
      }
      return false; // Allow default action.
    });
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).onSpaceClick.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.onSpaceClick.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).onSpaceClick);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNDljZjJmODAyM2IwNDMyMTg0MTAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDRzs7QUFFMUI7QUFDQUMsaUVBQWtCLENBQUNFLGVBQWUsR0FBRztFQUNqQ0MsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQVlDLE9BQU8sRUFBRUMsYUFBYSxFQUFFO0lBQ3BDTCxxREFBUSxDQUFDTyxnQkFBZ0IsQ0FBQ0YsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUNOLDZDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDSSxRQUFRLENBQUMsVUFBVUMsS0FBSyxFQUFFO01BQ2pDLElBQUlDLE9BQU8sR0FBSUQsS0FBSyxDQUFDRSxLQUFLLEdBQUdGLEtBQUssQ0FBQ0UsS0FBSyxHQUFHRixLQUFLLENBQUNDLE9BQVE7TUFDekQsSUFBSUEsT0FBTyxLQUFLLEVBQUUsRUFBRTtRQUFJO1FBQ3BCWCw2Q0FBQyxDQUFDSyxPQUFPLENBQUMsQ0FBQ1EsS0FBSyxDQUFDLENBQUM7TUFDdEI7TUFDQSxPQUFPLEtBQUssQ0FBQyxDQUFJO0lBQ3JCLENBQUMsQ0FBQztFQUNOO0FBQ0osQ0FBQztBQUNEWixpRUFBa0IsQ0FBQ0UsZUFBZSxDQUFDQyxJQUFJLEdBQUdILCtEQUFrQixDQUFDRSxlQUFlLENBQUNDLElBQUksQ0FBQ1UsSUFBSSxDQUFDYixpRUFBa0IsQ0FBQ0UsZUFBZSxDQUFDOztBQUUxSDtBQUNBRixpRUFBa0IsQ0FBQ2MsWUFBWSxHQUFHO0VBQzlCWCxJQUFJLEVBQUUsU0FBTkEsSUFBSUEsQ0FBWUMsT0FBTyxFQUFFQyxhQUFhLEVBQUU7SUFDcENMLHFEQUFRLENBQUNPLGdCQUFnQixDQUFDRixhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1Q04sNkNBQUMsQ0FBQ0ssT0FBTyxDQUFDLENBQUNJLFFBQVEsQ0FBQyxVQUFVQyxLQUFLLEVBQUU7TUFDakMsSUFBSUMsT0FBTyxHQUFJRCxLQUFLLENBQUNFLEtBQUssR0FBR0YsS0FBSyxDQUFDRSxLQUFLLEdBQUdGLEtBQUssQ0FBQ0MsT0FBUTtNQUN6RCxJQUFJQSxPQUFPLEtBQUssRUFBRSxFQUFFO1FBQUk7UUFDcEJYLDZDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDUSxLQUFLLENBQUMsQ0FBQztNQUN0QjtNQUNBLE9BQU8sS0FBSyxDQUFDLENBQUk7SUFDckIsQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDO0FBQ0RaLGlFQUFrQixDQUFDYyxZQUFZLENBQUNYLElBQUksR0FBR0gsK0RBQWtCLENBQUNjLFlBQVksQ0FBQ1gsSUFBSSxDQUFDVSxJQUFJLENBQUNiLGlFQUFrQixDQUFDYyxZQUFZLENBQUM7QUFFakgsaUVBQWVkLGlFQUFrQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvYmluZGluZ3Mva2V5LWV2ZW50cy1jbGljay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcblxuLy8gUmVnaXN0ZXIgYmluZGluZyBvZiBvbkVudGVya2V5Q2xpY2suIGUuZy4gPGRpdiBkYXRhLWJpbmQ9XCJvbkVudGVya2V5Q2xpY2tcIj4gPC9kaXY+XG5rby5iaW5kaW5nSGFuZGxlcnMub25FbnRlcmtleUNsaWNrID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XG4gICAgICAgIGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodmFsdWVBY2Nlc3NvcigpKTsgLy8gVW53cmFwIHRvIGdldCBzdWJzY3JpcHRpb24uXG4gICAgICAgICQoZWxlbWVudCkua2V5cHJlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IChldmVudC53aGljaCA/IGV2ZW50LndoaWNoIDogZXZlbnQua2V5Q29kZSk7XG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gMTMpIHsgICAvLyBDaGVjayBpZiBrZXlwcmVzcyBpcyA8ZW50ZXI+LlxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgICAgLy8gQWxsb3cgZGVmYXVsdCBhY3Rpb24uXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5rby5iaW5kaW5nSGFuZGxlcnMub25FbnRlcmtleUNsaWNrLmluaXQgPSBrby5iaW5kaW5nSGFuZGxlcnMub25FbnRlcmtleUNsaWNrLmluaXQuYmluZChrby5iaW5kaW5nSGFuZGxlcnMub25FbnRlcmtleUNsaWNrKTtcblxuLy8gUmVnaXN0ZXIgYmluZGluZyBvZiBvblNwYWNlQ2xpY2suIGUuZy4gPGRpdiBkYXRhLWJpbmQ9XCJvblNwYWNlQ2xpY2tcIj4gPC9kaXY+XG5rby5iaW5kaW5nSGFuZGxlcnMub25TcGFjZUNsaWNrID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XG4gICAgICAgIGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodmFsdWVBY2Nlc3NvcigpKTsgLy8gVW53cmFwIHRvIGdldCBzdWJzY3JpcHRpb24uXG4gICAgICAgICQoZWxlbWVudCkua2V5cHJlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IChldmVudC53aGljaCA/IGV2ZW50LndoaWNoIDogZXZlbnQua2V5Q29kZSk7XG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gMzIpIHsgICAvLyBDaGVjayBpZiBrZXlwcmVzcyBpcyA8c3BhY2U+LlxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgICAgLy8gQWxsb3cgZGVmYXVsdCBhY3Rpb24uXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5rby5iaW5kaW5nSGFuZGxlcnMub25TcGFjZUNsaWNrLmluaXQgPSBrby5iaW5kaW5nSGFuZGxlcnMub25TcGFjZUNsaWNrLmluaXQuYmluZChrby5iaW5kaW5nSGFuZGxlcnMub25TcGFjZUNsaWNrKTtcblxuZXhwb3J0IGRlZmF1bHQga28uYmluZGluZ0hhbmRsZXJzO1xuIl0sIm5hbWVzIjpbIiQiLCJrbyIsImJpbmRpbmdIYW5kbGVycyIsIm9uRW50ZXJrZXlDbGljayIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsInV0aWxzIiwidW53cmFwT2JzZXJ2YWJsZSIsImtleXByZXNzIiwiZXZlbnQiLCJrZXlDb2RlIiwid2hpY2giLCJjbGljayIsImJpbmQiLCJvblNwYWNlQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9