"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[21672],{

/***/ 21672:
/*!*******************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/alert.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_aria__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/aria */ 9285);



/**
* A viewmodel used for generic alert messages
*
* @constructor
* @name AlertViewModel
*
* @param  {string} type - the CSS class name to use to display alert level
* @param  {string} title - the alert's title text
* @param  {string} text - the alert's body text
* @param  {function} cancel (optional) - a function to call on cancel
* @param  {function} ok (optional) - a function to call on confirmation
*/
var AlertViewModel = function AlertViewModel(type, title, text, cancel, ok) {
  var self = this;
  this.active = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(true);
  this.close = function () {
    self.active(false);
  };
  this.type = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(type);
  this.title = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(title);
  this.text = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(text);
  this.ok = false;
  this.cancel = false;
  if (typeof ok === 'function') {
    this.ok = function () {
      self.close();
      ok();
    };
  }
  if (typeof cancel === 'function') {
    this.cancel = function () {
      self.close();
      cancel();
    };
  }
  knockout__WEBPACK_IMPORTED_MODULE_0___default().tasks.schedule(function () {
    var focusButton = document.querySelector('#card-alert-panel button:first-of-type');
    utils_aria__WEBPACK_IMPORTED_MODULE_1__["default"].shiftFocus(focusButton);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlertViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZTVjOGZkMTViN2Q2OTA0MzJjMGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNTOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJRSxjQUFjLEdBQUcsU0FBakJBLGNBQWNBLENBQVlDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLE1BQU0sRUFBRUMsRUFBRSxFQUFFO0VBQ3pELElBQUlDLElBQUksR0FBRyxJQUFJO0VBQ2YsSUFBSSxDQUFDQyxNQUFNLEdBQUdULDBEQUFhLENBQUMsSUFBSSxDQUFDO0VBQ2pDLElBQUksQ0FBQ1csS0FBSyxHQUFHLFlBQVc7SUFDcEJILElBQUksQ0FBQ0MsTUFBTSxDQUFDLEtBQUssQ0FBQztFQUN0QixDQUFDO0VBRUQsSUFBSSxDQUFDTixJQUFJLEdBQUdILDBEQUFhLENBQUNHLElBQUksQ0FBQztFQUMvQixJQUFJLENBQUNDLEtBQUssR0FBR0osMERBQWEsQ0FBQ0ksS0FBSyxDQUFDO0VBQ2pDLElBQUksQ0FBQ0MsSUFBSSxHQUFHTCwwREFBYSxDQUFDSyxJQUFJLENBQUM7RUFDL0IsSUFBSSxDQUFDRSxFQUFFLEdBQUcsS0FBSztFQUNmLElBQUksQ0FBQ0QsTUFBTSxHQUFHLEtBQUs7RUFDbkIsSUFBSSxPQUFPQyxFQUFFLEtBQUssVUFBVSxFQUFFO0lBQzFCLElBQUksQ0FBQ0EsRUFBRSxHQUFHLFlBQVc7TUFDakJDLElBQUksQ0FBQ0csS0FBSyxDQUFDLENBQUM7TUFDWkosRUFBRSxDQUFDLENBQUM7SUFDUixDQUFDO0VBQ0w7RUFDQSxJQUFJLE9BQU9ELE1BQU0sS0FBSyxVQUFVLEVBQUU7SUFDOUIsSUFBSSxDQUFDQSxNQUFNLEdBQUcsWUFBVztNQUNyQkUsSUFBSSxDQUFDRyxLQUFLLENBQUMsQ0FBQztNQUNaTCxNQUFNLENBQUMsQ0FBQztJQUNaLENBQUM7RUFDTDtFQUVBTixxREFBUSxDQUFDYSxRQUFRLENBQUMsWUFBTTtJQUNwQixJQUFNQyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLHdDQUF3QyxDQUFDO0lBQ3BGZixrREFBUyxDQUFDZ0IsVUFBVSxDQUFDSCxXQUFXLENBQUM7RUFDckMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGlFQUFlWixjQUFjLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3bW9kZWxzL2FsZXJ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgYXJpYVV0aWxzIGZyb20gJ3V0aWxzL2FyaWEnO1xuXG4vKipcbiogQSB2aWV3bW9kZWwgdXNlZCBmb3IgZ2VuZXJpYyBhbGVydCBtZXNzYWdlc1xuKlxuKiBAY29uc3RydWN0b3JcbiogQG5hbWUgQWxlcnRWaWV3TW9kZWxcbipcbiogQHBhcmFtICB7c3RyaW5nfSB0eXBlIC0gdGhlIENTUyBjbGFzcyBuYW1lIHRvIHVzZSB0byBkaXNwbGF5IGFsZXJ0IGxldmVsXG4qIEBwYXJhbSAge3N0cmluZ30gdGl0bGUgLSB0aGUgYWxlcnQncyB0aXRsZSB0ZXh0XG4qIEBwYXJhbSAge3N0cmluZ30gdGV4dCAtIHRoZSBhbGVydCdzIGJvZHkgdGV4dFxuKiBAcGFyYW0gIHtmdW5jdGlvbn0gY2FuY2VsIChvcHRpb25hbCkgLSBhIGZ1bmN0aW9uIHRvIGNhbGwgb24gY2FuY2VsXG4qIEBwYXJhbSAge2Z1bmN0aW9ufSBvayAob3B0aW9uYWwpIC0gYSBmdW5jdGlvbiB0byBjYWxsIG9uIGNvbmZpcm1hdGlvblxuKi9cbnZhciBBbGVydFZpZXdNb2RlbCA9IGZ1bmN0aW9uKHR5cGUsIHRpdGxlLCB0ZXh0LCBjYW5jZWwsIG9rKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuYWN0aXZlID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcbiAgICB0aGlzLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuYWN0aXZlKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdGhpcy50eXBlID0ga28ub2JzZXJ2YWJsZSh0eXBlKTtcbiAgICB0aGlzLnRpdGxlID0ga28ub2JzZXJ2YWJsZSh0aXRsZSk7XG4gICAgdGhpcy50ZXh0ID0ga28ub2JzZXJ2YWJsZSh0ZXh0KTtcbiAgICB0aGlzLm9rID0gZmFsc2U7XG4gICAgdGhpcy5jYW5jZWwgPSBmYWxzZTtcbiAgICBpZiAodHlwZW9mIG9rID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgIG9rKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY2FuY2VsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgICAgICBjYW5jZWwoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBrby50YXNrcy5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvY3VzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtYWxlcnQtcGFuZWwgYnV0dG9uOmZpcnN0LW9mLXR5cGUnKTtcbiAgICAgICAgYXJpYVV0aWxzLnNoaWZ0Rm9jdXMoZm9jdXNCdXR0b24pO1xuICAgIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IEFsZXJ0Vmlld01vZGVsO1xuIl0sIm5hbWVzIjpbImtvIiwiYXJpYVV0aWxzIiwiQWxlcnRWaWV3TW9kZWwiLCJ0eXBlIiwidGl0bGUiLCJ0ZXh0IiwiY2FuY2VsIiwib2siLCJzZWxmIiwiYWN0aXZlIiwib2JzZXJ2YWJsZSIsImNsb3NlIiwidGFza3MiLCJzY2hlZHVsZSIsImZvY3VzQnV0dG9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2hpZnRGb2N1cyJdLCJzb3VyY2VSb290IjoiIn0=