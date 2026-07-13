"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[9285],{

/***/ 9285:
/*!*************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/aria.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

var ariaUtils = {
  toggleAriaExpanded: function toggleAriaExpanded(id) {
    var ele = document.getElementById(id);
    var x = ele.getAttribute("aria-expanded");
    if (x === "true") {
      x = "false";
    } else {
      x = "true";
    }
    ele.setAttribute("aria-expanded", x);
  },
  handleEscKey: function handleEscKey(openElement, escListenerScope, closeElement) {
    /* 
    *   openElement: element that expands/contracts a panel, menu, etc. 
    *   escListenerScope: when focus is within this element, an escape key press will close the element controlled by openElement
    *   closeElement: [OPTIONAL] element that closes the panel, menu, etc. when clicked - use this param when the panel is not removed from DOM on close
    * 
    *   Implement this function within the openElement's click event handler, passing event.currentTarget as openElement
    */
    var attachListener = function attachListener(evt) {
      evt = evt || window.event;
      var isEscape = false;

      // Check for escape key press
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc';
      } else {
        isEscape = evt.keyCode === 27;
      }

      // Handle escape key press
      if (isEscape && closeElement) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(closeElement).click();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(openElement).focus();
      } else if (isEscape) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(openElement).click();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(openElement).focus();
      }
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(escListenerScope).off('keydown', attachListener);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(escListenerScope).on('keydown', attachListener);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(escListenerScope).find('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])').eq(0).focus();
  },
  shiftFocus: function shiftFocus(focusTarget) {
    /* 
    *   focusTarget: element to which focus will be moved. Should have tabindex="-1" or 0 and an aria-label
    */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(focusTarget).focus();
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ariaUtils);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZTQ4MjJhNDJhZGM1YTU0ZGQ1YjEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBRXZCLElBQU1DLFNBQVMsR0FBRztFQUNkQyxrQkFBa0IsRUFBRSxTQUFwQkEsa0JBQWtCQSxDQUFXQyxFQUFFLEVBQUU7SUFDN0IsSUFBTUMsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQ0gsRUFBRSxDQUFDO0lBQ3ZDLElBQUlJLENBQUMsR0FBR0gsR0FBRyxDQUFDSSxZQUFZLENBQUMsZUFBZSxDQUFDO0lBQ3pDLElBQUlELENBQUMsS0FBSyxNQUFNLEVBQUU7TUFDZEEsQ0FBQyxHQUFHLE9BQU87SUFDZixDQUFDLE1BQU07TUFDSEEsQ0FBQyxHQUFHLE1BQU07SUFDZDtJQUNBSCxHQUFHLENBQUNLLFlBQVksQ0FBQyxlQUFlLEVBQUVGLENBQUMsQ0FBQztFQUN4QyxDQUFDO0VBRURHLFlBQVksRUFBRSxTQUFkQSxZQUFZQSxDQUFXQyxXQUFXLEVBQUVDLGdCQUFnQixFQUFFQyxZQUFZLEVBQUU7SUFDaEU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDUSxJQUFJQyxjQUFjLEdBQUcsU0FBakJBLGNBQWNBLENBQVlDLEdBQUcsRUFBRTtNQUMvQkEsR0FBRyxHQUFHQSxHQUFHLElBQUlDLE1BQU0sQ0FBQ0MsS0FBSztNQUN6QixJQUFJQyxRQUFRLEdBQUcsS0FBSzs7TUFFcEI7TUFDQSxJQUFJLEtBQUssSUFBSUgsR0FBRyxFQUFFO1FBQ2RHLFFBQVEsR0FBSUgsR0FBRyxDQUFDSSxHQUFHLEtBQUssUUFBUSxJQUFJSixHQUFHLENBQUNJLEdBQUcsS0FBSyxLQUFNO01BQzFELENBQUMsTUFBTTtRQUNIRCxRQUFRLEdBQUlILEdBQUcsQ0FBQ0ssT0FBTyxLQUFLLEVBQUc7TUFDbkM7O01BRUE7TUFDQSxJQUFJRixRQUFRLElBQUlMLFlBQVksRUFBRTtRQUMxQmIsNkNBQUMsQ0FBQ2EsWUFBWSxDQUFDLENBQUNRLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCckIsNkNBQUMsQ0FBQ1csV0FBVyxDQUFDLENBQUNXLEtBQUssQ0FBQyxDQUFDO01BQzFCLENBQUMsTUFBTSxJQUFJSixRQUFRLEVBQUU7UUFDakJsQiw2Q0FBQyxDQUFDVyxXQUFXLENBQUMsQ0FBQ1UsS0FBSyxDQUFDLENBQUM7UUFDdEJyQiw2Q0FBQyxDQUFDVyxXQUFXLENBQUMsQ0FBQ1csS0FBSyxDQUFDLENBQUM7TUFDMUI7SUFDSixDQUFDO0lBQ0R0Qiw2Q0FBQyxDQUFDWSxnQkFBZ0IsQ0FBQyxDQUFDVyxHQUFHLENBQUMsU0FBUyxFQUFFVCxjQUFjLENBQUM7SUFDbERkLDZDQUFDLENBQUNZLGdCQUFnQixDQUFDLENBQUNZLEVBQUUsQ0FBQyxTQUFTLEVBQUVWLGNBQWMsQ0FBQztJQUNqRGQsNkNBQUMsQ0FBQ1ksZ0JBQWdCLENBQUMsQ0FBQ2EsSUFBSSxDQUFDLHFFQUFxRSxDQUFDLENBQUNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQ0osS0FBSyxDQUFDLENBQUM7RUFDakgsQ0FBQztFQUVESyxVQUFVLEVBQUUsU0FBWkEsVUFBVUEsQ0FBV0MsV0FBVyxFQUFFO0lBQzlCO0FBQ1I7QUFDQTtJQUNRNUIsNkNBQUMsQ0FBQzRCLFdBQVcsQ0FBQyxDQUFDTixLQUFLLENBQUMsQ0FBQztFQUMxQjtBQUNKLENBQUM7QUFFRCxpRUFBZXJCLFNBQVMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3V0aWxzL2FyaWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuY29uc3QgYXJpYVV0aWxzID0ge1xuICAgIHRvZ2dsZUFyaWFFeHBhbmRlZDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgY29uc3QgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICBsZXQgeCA9IGVsZS5nZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpOyBcbiAgICAgICAgaWYgKHggPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICB4ID0gXCJmYWxzZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IFwidHJ1ZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIHgpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVFc2NLZXk6IGZ1bmN0aW9uKG9wZW5FbGVtZW50LCBlc2NMaXN0ZW5lclNjb3BlLCBjbG9zZUVsZW1lbnQpIHtcbiAgICAgICAgLyogXG4gICAgICAgICogICBvcGVuRWxlbWVudDogZWxlbWVudCB0aGF0IGV4cGFuZHMvY29udHJhY3RzIGEgcGFuZWwsIG1lbnUsIGV0Yy4gXG4gICAgICAgICogICBlc2NMaXN0ZW5lclNjb3BlOiB3aGVuIGZvY3VzIGlzIHdpdGhpbiB0aGlzIGVsZW1lbnQsIGFuIGVzY2FwZSBrZXkgcHJlc3Mgd2lsbCBjbG9zZSB0aGUgZWxlbWVudCBjb250cm9sbGVkIGJ5IG9wZW5FbGVtZW50XG4gICAgICAgICogICBjbG9zZUVsZW1lbnQ6IFtPUFRJT05BTF0gZWxlbWVudCB0aGF0IGNsb3NlcyB0aGUgcGFuZWwsIG1lbnUsIGV0Yy4gd2hlbiBjbGlja2VkIC0gdXNlIHRoaXMgcGFyYW0gd2hlbiB0aGUgcGFuZWwgaXMgbm90IHJlbW92ZWQgZnJvbSBET00gb24gY2xvc2VcbiAgICAgICAgKiBcbiAgICAgICAgKiAgIEltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIHdpdGhpbiB0aGUgb3BlbkVsZW1lbnQncyBjbGljayBldmVudCBoYW5kbGVyLCBwYXNzaW5nIGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgb3BlbkVsZW1lbnRcbiAgICAgICAgKi9cbiAgICAgICAgbGV0IGF0dGFjaExpc3RlbmVyID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICBldnQgPSBldnQgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIGlzRXNjYXBlID0gZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBlc2NhcGUga2V5IHByZXNzXG4gICAgICAgICAgICBpZiAoJ2tleScgaW4gZXZ0KSB7XG4gICAgICAgICAgICAgICAgaXNFc2NhcGUgPSAoZXZ0LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZ0LmtleSA9PT0gJ0VzYycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpc0VzY2FwZSA9IChldnQua2V5Q29kZSA9PT0gMjcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIYW5kbGUgZXNjYXBlIGtleSBwcmVzc1xuICAgICAgICAgICAgaWYgKGlzRXNjYXBlICYmIGNsb3NlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICQoY2xvc2VFbGVtZW50KS5jbGljaygpO1xuICAgICAgICAgICAgICAgICQob3BlbkVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRXNjYXBlKSB7XG4gICAgICAgICAgICAgICAgJChvcGVuRWxlbWVudCkuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAkKG9wZW5FbGVtZW50KS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkKGVzY0xpc3RlbmVyU2NvcGUpLm9mZigna2V5ZG93bicsIGF0dGFjaExpc3RlbmVyKTtcbiAgICAgICAgJChlc2NMaXN0ZW5lclNjb3BlKS5vbigna2V5ZG93bicsIGF0dGFjaExpc3RlbmVyKTtcbiAgICAgICAgJChlc2NMaXN0ZW5lclNjb3BlKS5maW5kKCdidXR0b24sIGEsIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknKS5lcSgwKS5mb2N1cygpO1xuICAgIH0sXG5cbiAgICBzaGlmdEZvY3VzOiBmdW5jdGlvbihmb2N1c1RhcmdldCkge1xuICAgICAgICAvKiBcbiAgICAgICAgKiAgIGZvY3VzVGFyZ2V0OiBlbGVtZW50IHRvIHdoaWNoIGZvY3VzIHdpbGwgYmUgbW92ZWQuIFNob3VsZCBoYXZlIHRhYmluZGV4PVwiLTFcIiBvciAwIGFuZCBhbiBhcmlhLWxhYmVsXG4gICAgICAgICovXG4gICAgICAgICQoZm9jdXNUYXJnZXQpLmZvY3VzKCk7XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFyaWFVdGlscztcbiJdLCJuYW1lcyI6WyIkIiwiYXJpYVV0aWxzIiwidG9nZ2xlQXJpYUV4cGFuZGVkIiwiaWQiLCJlbGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwieCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImhhbmRsZUVzY0tleSIsIm9wZW5FbGVtZW50IiwiZXNjTGlzdGVuZXJTY29wZSIsImNsb3NlRWxlbWVudCIsImF0dGFjaExpc3RlbmVyIiwiZXZ0Iiwid2luZG93IiwiZXZlbnQiLCJpc0VzY2FwZSIsImtleSIsImtleUNvZGUiLCJjbGljayIsImZvY3VzIiwib2ZmIiwib24iLCJmaW5kIiwiZXEiLCJzaGlmdEZvY3VzIiwiZm9jdXNUYXJnZXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==