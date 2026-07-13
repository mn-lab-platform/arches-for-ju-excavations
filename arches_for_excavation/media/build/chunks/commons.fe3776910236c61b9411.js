"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[32806],{

/***/ 32806:
/*!*************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/graph-publication-data.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
var parsedGraphPublicationData;
try {
  var graphPublicationDataHTML = document.querySelector('#graphPublicationData');
  var graphPublicationData = graphPublicationDataHTML.getAttribute('graphPublicationData');
  parsedGraphPublicationData = JSON.parse(removeTrailingCommaFromObject(graphPublicationData));
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsedGraphPublicationData);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZmUzNzc2OTEwMjM2YzYxYjk0MTEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxJQUFJQywwQkFBMEI7QUFDOUIsSUFBSTtFQUNBLElBQU1DLHdCQUF3QixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztFQUNoRixJQUFNQyxvQkFBb0IsR0FBR0gsd0JBQXdCLENBQUNJLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztFQUUxRkwsMEJBQTBCLEdBQUdNLElBQUksQ0FBQ0MsS0FBSyxDQUFDViw2QkFBNkIsQ0FBQ08sb0JBQW9CLENBQUMsQ0FBQztBQUNoRyxDQUFDLENBQUMsT0FBT0ksS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVIsMEJBQTBCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9ncmFwaC9ncmFwaC1wdWJsaWNhdGlvbi1kYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0KHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLFxccyp9KiQvLCBcIn1cIik7XG59XG5cbmxldCBwYXJzZWRHcmFwaFB1YmxpY2F0aW9uRGF0YTtcbnRyeSB7XG4gICAgY29uc3QgZ3JhcGhQdWJsaWNhdGlvbkRhdGFIVE1MID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dyYXBoUHVibGljYXRpb25EYXRhJyk7XG4gICAgY29uc3QgZ3JhcGhQdWJsaWNhdGlvbkRhdGEgPSBncmFwaFB1YmxpY2F0aW9uRGF0YUhUTUwuZ2V0QXR0cmlidXRlKCdncmFwaFB1YmxpY2F0aW9uRGF0YScpO1xuXG4gICAgcGFyc2VkR3JhcGhQdWJsaWNhdGlvbkRhdGEgPSBKU09OLnBhcnNlKHJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0KGdyYXBoUHVibGljYXRpb25EYXRhKSk7XG59IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJzZWRHcmFwaFB1YmxpY2F0aW9uRGF0YTtcbiJdLCJuYW1lcyI6WyJyZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdCIsInN0cmluZyIsInJlcGxhY2UiLCJwYXJzZWRHcmFwaFB1YmxpY2F0aW9uRGF0YSIsImdyYXBoUHVibGljYXRpb25EYXRhSFRNTCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImdyYXBoUHVibGljYXRpb25EYXRhIiwiZ2V0QXR0cmlidXRlIiwiSlNPTiIsInBhcnNlIiwiZXJyb3IiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=