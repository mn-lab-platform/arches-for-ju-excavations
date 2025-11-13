"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[70855],{

/***/ 70855:
/*!******************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/graph-base-data.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
var graphBaseDataJSON;
try {
  var graphBaseDataHTML = document.querySelector('#graphBaseData');
  var graphBaseData = graphBaseDataHTML.getAttribute('graphBaseData');
  graphBaseDataJSON = JSON.parse(removeTrailingCommaFromObject(graphBaseData));
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (graphBaseDataJSON);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOTA1MjI0ZDU5MzA1ZWVhZmZkMjQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxJQUFJQyxpQkFBaUI7QUFDckIsSUFBSTtFQUNBLElBQU1DLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztFQUNsRSxJQUFNQyxhQUFhLEdBQUdILGlCQUFpQixDQUFDSSxZQUFZLENBQUMsZUFBZSxDQUFDO0VBRXJFTCxpQkFBaUIsR0FBR00sSUFBSSxDQUFDQyxLQUFLLENBQUNWLDZCQUE2QixDQUFDTyxhQUFhLENBQUMsQ0FBQztBQUNoRixDQUFDLENBQUMsT0FBT0ksS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVIsaUJBQWlCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9ncmFwaC9ncmFwaC1iYXNlLWRhdGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcmVtb3ZlVHJhaWxpbmdDb21tYUZyb21PYmplY3Qoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8sXFxzKn0qJC8sIFwifVwiKTtcbn1cblxubGV0IGdyYXBoQmFzZURhdGFKU09OO1xudHJ5IHsgICAgICAgIFxuICAgIGNvbnN0IGdyYXBoQmFzZURhdGFIVE1MID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dyYXBoQmFzZURhdGEnKTtcbiAgICBjb25zdCBncmFwaEJhc2VEYXRhID0gZ3JhcGhCYXNlRGF0YUhUTUwuZ2V0QXR0cmlidXRlKCdncmFwaEJhc2VEYXRhJyk7XG4gICAgXG4gICAgZ3JhcGhCYXNlRGF0YUpTT04gPSBKU09OLnBhcnNlKHJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0KGdyYXBoQmFzZURhdGEpKTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdyYXBoQmFzZURhdGFKU09OO1xuIl0sIm5hbWVzIjpbInJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0Iiwic3RyaW5nIiwicmVwbGFjZSIsImdyYXBoQmFzZURhdGFKU09OIiwiZ3JhcGhCYXNlRGF0YUhUTUwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJncmFwaEJhc2VEYXRhIiwiZ2V0QXR0cmlidXRlIiwiSlNPTiIsInBhcnNlIiwiZXJyb3IiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==