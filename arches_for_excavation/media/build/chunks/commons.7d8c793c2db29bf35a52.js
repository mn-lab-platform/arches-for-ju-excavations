"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[32771],{

/***/ 32771:
/*!****************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/dispose.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);


/**
* from http://www.knockmeout.net/2014/10/knockout-cleaning-up.html
* little helper that handles being given a value or prop + value
*
* @param  {string} the request method name
* @return {boolean} true if the method is CSRF safe
*/
var disposeOne = function disposeOne(propOrValue, value) {
  var disposable = value || propOrValue;
  if (disposable && typeof disposable.dispose === "function") {
    disposable.dispose();
  }
};
var dispose = function dispose(obj) {
  if (!!obj.disposables) {
    knockout__WEBPACK_IMPORTED_MODULE_0___default().utils.arrayForEach(obj.disposables, disposeOne);
  } else {
    knockout__WEBPACK_IMPORTED_MODULE_0___default().utils.objectForEach(obj, disposeOne);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispose);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuN2Q4Yzc5M2MyZGIyOWJmMzVhNTIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFZQyxXQUFXLEVBQUVDLEtBQUssRUFBRTtFQUM1QyxJQUFNQyxVQUFVLEdBQUdELEtBQUssSUFBSUQsV0FBVztFQUV2QyxJQUFJRSxVQUFVLElBQUksT0FBT0EsVUFBVSxDQUFDQyxPQUFPLEtBQUssVUFBVSxFQUFFO0lBQ3hERCxVQUFVLENBQUNDLE9BQU8sQ0FBQyxDQUFDO0VBQ3hCO0FBQ0osQ0FBQztBQUVELElBQU1BLE9BQU8sR0FBRyxTQUFWQSxPQUFPQSxDQUFZQyxHQUFHLEVBQUU7RUFDMUIsSUFBSSxDQUFDLENBQUNBLEdBQUcsQ0FBQ0MsV0FBVyxFQUFFO0lBQ25CUCxxREFBUSxDQUFDUyxZQUFZLENBQUNILEdBQUcsQ0FBQ0MsV0FBVyxFQUFFTixVQUFVLENBQUM7RUFDdEQsQ0FBQyxNQUFNO0lBQ0hELHFEQUFRLENBQUNVLGFBQWEsQ0FBQ0osR0FBRyxFQUFFTCxVQUFVLENBQUM7RUFDM0M7QUFDSixDQUFDO0FBRUQsaUVBQWVJLE9BQU8sRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3V0aWxzL2Rpc3Bvc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcblxuLyoqXG4qIGZyb20gaHR0cDovL3d3dy5rbm9ja21lb3V0Lm5ldC8yMDE0LzEwL2tub2Nrb3V0LWNsZWFuaW5nLXVwLmh0bWxcbiogbGl0dGxlIGhlbHBlciB0aGF0IGhhbmRsZXMgYmVpbmcgZ2l2ZW4gYSB2YWx1ZSBvciBwcm9wICsgdmFsdWVcbipcbiogQHBhcmFtICB7c3RyaW5nfSB0aGUgcmVxdWVzdCBtZXRob2QgbmFtZVxuKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBtZXRob2QgaXMgQ1NSRiBzYWZlXG4qL1xuY29uc3QgZGlzcG9zZU9uZSA9IGZ1bmN0aW9uKHByb3BPclZhbHVlLCB2YWx1ZSkge1xuICAgIGNvbnN0IGRpc3Bvc2FibGUgPSB2YWx1ZSB8fCBwcm9wT3JWYWx1ZTtcblxuICAgIGlmIChkaXNwb3NhYmxlICYmIHR5cGVvZiBkaXNwb3NhYmxlLmRpc3Bvc2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBkaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgICB9XG59O1xuXG5jb25zdCBkaXNwb3NlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCEhb2JqLmRpc3Bvc2FibGVzKSB7XG4gICAgICAgIGtvLnV0aWxzLmFycmF5Rm9yRWFjaChvYmouZGlzcG9zYWJsZXMsIGRpc3Bvc2VPbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGtvLnV0aWxzLm9iamVjdEZvckVhY2gob2JqLCBkaXNwb3NlT25lKTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwb3NlO1xuIl0sIm5hbWVzIjpbImtvIiwiZGlzcG9zZU9uZSIsInByb3BPclZhbHVlIiwidmFsdWUiLCJkaXNwb3NhYmxlIiwiZGlzcG9zZSIsIm9iaiIsImRpc3Bvc2FibGVzIiwidXRpbHMiLCJhcnJheUZvckVhY2giLCJvYmplY3RGb3JFYWNoIl0sInNvdXJjZVJvb3QiOiIifQ==