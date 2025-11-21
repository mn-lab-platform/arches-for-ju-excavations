"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[52139],{

/***/ 52139:
/*!************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/alert-json.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var utils_aria__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/aria */ 9285);




/**
* A viewmodel used for alert messages from JSON responses
*
* @constructor
* @name JsonErrorAlertViewModel
*
* @param  {string} type - the CSS class name to use to display alert level
* @param  {object} responseJSON - The response JSON received from the backend
* @param  {function} cancel (optional) - a function to call on cancel
* @param  {function} ok (optional) - a function to call on confirmation
*/
var getPropertyOrDefaultMessage = function getPropertyOrDefaultMessage(property, defaultMessage) {
  if (typeof property === 'undefined') {
    return defaultMessage;
  } else {
    return property;
  }
};
var initializeResponseJSON = function initializeResponseJSON(responseJSON) {
  if (typeof responseJSON === 'undefined') {
    responseJSON = {};
  }
  return responseJSON;
};
var parseResponseJson = function parseResponseJson(responseJSON) {
  responseJSON = initializeResponseJSON(responseJSON);
  responseJSON.title = getPropertyOrDefaultMessage(responseJSON.title, arches__WEBPACK_IMPORTED_MODULE_1__["default"].translations.requestFailed.title);
  responseJSON.message = getPropertyOrDefaultMessage(responseJSON.message, arches__WEBPACK_IMPORTED_MODULE_1__["default"].translations.requestFailed.text);
  return responseJSON;
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(type, responseJSON, cancel, ok) {
  var self = this;
  this.active = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(true);
  this.close = function () {
    self.active(false);
  };
  responseJSON = parseResponseJson(responseJSON);
  this.type = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(type);
  this.title = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(responseJSON.title);
  this.text = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(responseJSON.message);
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
    utils_aria__WEBPACK_IMPORTED_MODULE_2__["default"].shiftFocus(focusButton);
  });
}
;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3bW9kZWxzL2FsZXJ0LWpzb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBhcmlhVXRpbHMgZnJvbSAndXRpbHMvYXJpYSc7XG5cbi8qKlxuKiBBIHZpZXdtb2RlbCB1c2VkIGZvciBhbGVydCBtZXNzYWdlcyBmcm9tIEpTT04gcmVzcG9uc2VzXG4qXG4qIEBjb25zdHJ1Y3RvclxuKiBAbmFtZSBKc29uRXJyb3JBbGVydFZpZXdNb2RlbFxuKlxuKiBAcGFyYW0gIHtzdHJpbmd9IHR5cGUgLSB0aGUgQ1NTIGNsYXNzIG5hbWUgdG8gdXNlIHRvIGRpc3BsYXkgYWxlcnQgbGV2ZWxcbiogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZUpTT04gLSBUaGUgcmVzcG9uc2UgSlNPTiByZWNlaXZlZCBmcm9tIHRoZSBiYWNrZW5kXG4qIEBwYXJhbSAge2Z1bmN0aW9ufSBjYW5jZWwgKG9wdGlvbmFsKSAtIGEgZnVuY3Rpb24gdG8gY2FsbCBvbiBjYW5jZWxcbiogQHBhcmFtICB7ZnVuY3Rpb259IG9rIChvcHRpb25hbCkgLSBhIGZ1bmN0aW9uIHRvIGNhbGwgb24gY29uZmlybWF0aW9uXG4qL1xudmFyIGdldFByb3BlcnR5T3JEZWZhdWx0TWVzc2FnZSA9IGZ1bmN0aW9uKHByb3BlcnR5LCBkZWZhdWx0TWVzc2FnZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0TWVzc2FnZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICB9XG59O1xuXG52YXIgaW5pdGlhbGl6ZVJlc3BvbnNlSlNPTiA9IGZ1bmN0aW9uKHJlc3BvbnNlSlNPTikge1xuICAgIGlmICh0eXBlb2YgcmVzcG9uc2VKU09OID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXNwb25zZUpTT04gPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlSlNPTjtcbn07XG5cbnZhciBwYXJzZVJlc3BvbnNlSnNvbiA9IGZ1bmN0aW9uKHJlc3BvbnNlSlNPTikge1xuICAgIHJlc3BvbnNlSlNPTiA9IGluaXRpYWxpemVSZXNwb25zZUpTT04ocmVzcG9uc2VKU09OKTtcbiAgICByZXNwb25zZUpTT04udGl0bGUgPSBnZXRQcm9wZXJ0eU9yRGVmYXVsdE1lc3NhZ2UocmVzcG9uc2VKU09OLnRpdGxlLCBhcmNoZXMudHJhbnNsYXRpb25zLnJlcXVlc3RGYWlsZWQudGl0bGUpO1xuICAgIHJlc3BvbnNlSlNPTi5tZXNzYWdlID0gZ2V0UHJvcGVydHlPckRlZmF1bHRNZXNzYWdlKHJlc3BvbnNlSlNPTi5tZXNzYWdlLCBhcmNoZXMudHJhbnNsYXRpb25zLnJlcXVlc3RGYWlsZWQudGV4dCk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2VKU09OO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHlwZSwgcmVzcG9uc2VKU09OLCBjYW5jZWwsIG9rKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuYWN0aXZlID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcbiAgICB0aGlzLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuYWN0aXZlKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgcmVzcG9uc2VKU09OID0gcGFyc2VSZXNwb25zZUpzb24ocmVzcG9uc2VKU09OKTtcblxuICAgIHRoaXMudHlwZSA9IGtvLm9ic2VydmFibGUodHlwZSk7XG4gICAgdGhpcy50aXRsZSA9IGtvLm9ic2VydmFibGUocmVzcG9uc2VKU09OLnRpdGxlKTtcbiAgICB0aGlzLnRleHQgPSBrby5vYnNlcnZhYmxlKHJlc3BvbnNlSlNPTi5tZXNzYWdlKTtcbiAgICB0aGlzLm9rID0gZmFsc2U7XG4gICAgdGhpcy5jYW5jZWwgPSBmYWxzZTtcbiAgICBpZiAodHlwZW9mIG9rID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgIG9rKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY2FuY2VsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgICAgICBjYW5jZWwoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBrby50YXNrcy5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvY3VzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtYWxlcnQtcGFuZWwgYnV0dG9uOmZpcnN0LW9mLXR5cGUnKTtcbiAgICAgICAgYXJpYVV0aWxzLnNoaWZ0Rm9jdXMoZm9jdXNCdXR0b24pO1xuICAgIH0pO1xufTtcbiJdLCJuYW1lcyI6WyJrbyIsImFyY2hlcyIsImFyaWFVdGlscyIsImdldFByb3BlcnR5T3JEZWZhdWx0TWVzc2FnZSIsInByb3BlcnR5IiwiZGVmYXVsdE1lc3NhZ2UiLCJpbml0aWFsaXplUmVzcG9uc2VKU09OIiwicmVzcG9uc2VKU09OIiwicGFyc2VSZXNwb25zZUpzb24iLCJ0aXRsZSIsInRyYW5zbGF0aW9ucyIsInJlcXVlc3RGYWlsZWQiLCJtZXNzYWdlIiwidGV4dCIsInR5cGUiLCJjYW5jZWwiLCJvayIsInNlbGYiLCJhY3RpdmUiLCJvYnNlcnZhYmxlIiwiY2xvc2UiLCJ0YXNrcyIsInNjaGVkdWxlIiwiZm9jdXNCdXR0b24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzaGlmdEZvY3VzIl0sInNvdXJjZVJvb3QiOiIifQ==