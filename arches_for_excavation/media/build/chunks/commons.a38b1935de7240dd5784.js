"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[94207],{

/***/ 94207:
/*!**********************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/graph-settings-data.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
var parsedGraphSettingsData;
try {
  var graphSettingsDataHTML = document.querySelector('#graphSettingsData');
  var graphSettingsData = graphSettingsDataHTML.getAttribute('graphSettingsData');
  parsedGraphSettingsData = JSON.parse(removeTrailingCommaFromObject(graphSettingsData));
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsedGraphSettingsData);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYTM4YjE5MzVkZTcyNDBkZDU3ODQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxJQUFJQyx1QkFBdUI7QUFDM0IsSUFBSTtFQUNBLElBQU1DLHFCQUFxQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztFQUMxRSxJQUFNQyxpQkFBaUIsR0FBR0gscUJBQXFCLENBQUNJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztFQUVqRkwsdUJBQXVCLEdBQUdNLElBQUksQ0FBQ0MsS0FBSyxDQUFDViw2QkFBNkIsQ0FBQ08saUJBQWlCLENBQUMsQ0FBQztBQUMxRixDQUFDLENBQUMsT0FBT0ksS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVIsdUJBQXVCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9ncmFwaC9ncmFwaC1zZXR0aW5ncy1kYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0KHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLFxccyp9KiQvLCBcIn1cIik7XG59XG5cbmxldCBwYXJzZWRHcmFwaFNldHRpbmdzRGF0YTtcbnRyeSB7ICAgICAgICBcbiAgICBjb25zdCBncmFwaFNldHRpbmdzRGF0YUhUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ3JhcGhTZXR0aW5nc0RhdGEnKTtcbiAgICBjb25zdCBncmFwaFNldHRpbmdzRGF0YSA9IGdyYXBoU2V0dGluZ3NEYXRhSFRNTC5nZXRBdHRyaWJ1dGUoJ2dyYXBoU2V0dGluZ3NEYXRhJyk7XG5cbiAgICBwYXJzZWRHcmFwaFNldHRpbmdzRGF0YSA9IEpTT04ucGFyc2UocmVtb3ZlVHJhaWxpbmdDb21tYUZyb21PYmplY3QoZ3JhcGhTZXR0aW5nc0RhdGEpKTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlZEdyYXBoU2V0dGluZ3NEYXRhO1xuIl0sIm5hbWVzIjpbInJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0Iiwic3RyaW5nIiwicmVwbGFjZSIsInBhcnNlZEdyYXBoU2V0dGluZ3NEYXRhIiwiZ3JhcGhTZXR0aW5nc0RhdGFIVE1MIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ3JhcGhTZXR0aW5nc0RhdGEiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==