"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[17429],{

/***/ 17429:
/*!********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/resource/resource-edit-history-data.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
var parsedResourceEditHistoryData;
try {
  var resourceEditHistoryDataHTML = document.querySelector('#resourceEditHistoryData');
  var resourceEditHistoryData = resourceEditHistoryDataHTML.getAttribute('resourceEditHistoryData');
  parsedResourceEditHistoryData = JSON.parse(removeTrailingCommaFromObject(resourceEditHistoryData));
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsedResourceEditHistoryData);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZjBiYTFjZmNlOTRjNzI1OTFhNGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxJQUFJQyw2QkFBNkI7QUFDakMsSUFBSTtFQUNBLElBQU1DLDJCQUEyQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztFQUN0RixJQUFNQyx1QkFBdUIsR0FBR0gsMkJBQTJCLENBQUNJLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQztFQUVuR0wsNkJBQTZCLEdBQUdNLElBQUksQ0FBQ0MsS0FBSyxDQUFDViw2QkFBNkIsQ0FBQ08sdUJBQXVCLENBQUMsQ0FBQztBQUN0RyxDQUFDLENBQUMsT0FBT0ksS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVIsNkJBQTZCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9yZXNvdXJjZS9yZXNvdXJjZS1lZGl0LWhpc3RvcnktZGF0YS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiByZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyxcXHMqfSokLywgXCJ9XCIpO1xufVxuXG5sZXQgcGFyc2VkUmVzb3VyY2VFZGl0SGlzdG9yeURhdGE7XG50cnkgeyAgICAgICAgXG4gICAgY29uc3QgcmVzb3VyY2VFZGl0SGlzdG9yeURhdGFIVE1MID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc291cmNlRWRpdEhpc3RvcnlEYXRhJyk7XG4gICAgY29uc3QgcmVzb3VyY2VFZGl0SGlzdG9yeURhdGEgPSByZXNvdXJjZUVkaXRIaXN0b3J5RGF0YUhUTUwuZ2V0QXR0cmlidXRlKCdyZXNvdXJjZUVkaXRIaXN0b3J5RGF0YScpO1xuXG4gICAgcGFyc2VkUmVzb3VyY2VFZGl0SGlzdG9yeURhdGEgPSBKU09OLnBhcnNlKHJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0KHJlc291cmNlRWRpdEhpc3RvcnlEYXRhKSk7XG59IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJzZWRSZXNvdXJjZUVkaXRIaXN0b3J5RGF0YTtcbiJdLCJuYW1lcyI6WyJyZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdCIsInN0cmluZyIsInJlcGxhY2UiLCJwYXJzZWRSZXNvdXJjZUVkaXRIaXN0b3J5RGF0YSIsInJlc291cmNlRWRpdEhpc3RvcnlEYXRhSFRNTCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInJlc291cmNlRWRpdEhpc3RvcnlEYXRhIiwiZ2V0QXR0cmlidXRlIiwiSlNPTiIsInBhcnNlIiwiZXJyb3IiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=