"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[57997],{

/***/ 57997:
/*!**************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/resource/resource-editor-data.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
function forceDoubleQuotes(string) {
  return string.replace(/'/g, '"');
}
var parsedResourceEditorData;
try {
  var resourceEditorDataHTML = document.querySelector('#resourceEditorData');
  var resourceEditorData = resourceEditorDataHTML.getAttribute('resourceEditorData');
  parsedResourceEditorData = JSON.parse(removeTrailingCommaFromObject(resourceEditorData));
  parsedResourceEditorData["relationship_types"] = JSON.parse(forceDoubleQuotes(parsedResourceEditorData["relationship_types"]));
  parsedResourceEditorData["creator"] = JSON.parse(parsedResourceEditorData["creator"]);
  parsedResourceEditorData["userisreviewer"] = Boolean(parsedResourceEditorData["userisreviewer"] === "True");
  parsedResourceEditorData["useriscreator"] = ["true", "True"].includes(parsedResourceEditorData["useriscreator"]);
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsedResourceEditorData);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZDUyYjIzYTEwMjVjZmZjNWZmMjcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxTQUFTQyxpQkFBaUJBLENBQUNGLE1BQU0sRUFBRTtFQUMvQixPQUFPQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0FBQ3BDO0FBRUEsSUFBSUUsd0JBQXdCO0FBQzVCLElBQUk7RUFDQSxJQUFNQyxzQkFBc0IsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMscUJBQXFCLENBQUM7RUFDNUUsSUFBTUMsa0JBQWtCLEdBQUdILHNCQUFzQixDQUFDSSxZQUFZLENBQUMsb0JBQW9CLENBQUM7RUFFcEZMLHdCQUF3QixHQUFHTSxJQUFJLENBQUNDLEtBQUssQ0FBQ1gsNkJBQTZCLENBQUNRLGtCQUFrQixDQUFDLENBQUM7RUFDeEZKLHdCQUF3QixDQUFDLG9CQUFvQixDQUFDLEdBQUdNLElBQUksQ0FBQ0MsS0FBSyxDQUFDUixpQkFBaUIsQ0FBQ0Msd0JBQXdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0VBQzlIQSx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsR0FBR00sSUFBSSxDQUFDQyxLQUFLLENBQUNQLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQ3JGQSx3QkFBd0IsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHUSxPQUFPLENBQUNSLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDLEtBQUssTUFBTSxDQUFDO0VBQzNHQSx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQ1MsUUFBUSxDQUFDVCx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNwSCxDQUFDLENBQUMsT0FBT1UsS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVYsd0JBQXdCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9yZXNvdXJjZS9yZXNvdXJjZS1lZGl0b3ItZGF0YS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiByZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyxcXHMqfSokLywgXCJ9XCIpO1xufVxuXG5mdW5jdGlvbiBmb3JjZURvdWJsZVF1b3RlcyhzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLycvZywgJ1wiJyk7XG59XG5cbmxldCBwYXJzZWRSZXNvdXJjZUVkaXRvckRhdGE7XG50cnkgeyAgICAgICAgXG4gICAgY29uc3QgcmVzb3VyY2VFZGl0b3JEYXRhSFRNTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXNvdXJjZUVkaXRvckRhdGEnKTtcbiAgICBjb25zdCByZXNvdXJjZUVkaXRvckRhdGEgPSByZXNvdXJjZUVkaXRvckRhdGFIVE1MLmdldEF0dHJpYnV0ZSgncmVzb3VyY2VFZGl0b3JEYXRhJyk7XG5cbiAgICBwYXJzZWRSZXNvdXJjZUVkaXRvckRhdGEgPSBKU09OLnBhcnNlKHJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0KHJlc291cmNlRWRpdG9yRGF0YSkpO1xuICAgIHBhcnNlZFJlc291cmNlRWRpdG9yRGF0YVtcInJlbGF0aW9uc2hpcF90eXBlc1wiXSA9IEpTT04ucGFyc2UoZm9yY2VEb3VibGVRdW90ZXMocGFyc2VkUmVzb3VyY2VFZGl0b3JEYXRhW1wicmVsYXRpb25zaGlwX3R5cGVzXCJdKSk7XG4gICAgcGFyc2VkUmVzb3VyY2VFZGl0b3JEYXRhW1wiY3JlYXRvclwiXSA9IEpTT04ucGFyc2UocGFyc2VkUmVzb3VyY2VFZGl0b3JEYXRhW1wiY3JlYXRvclwiXSk7XG4gICAgcGFyc2VkUmVzb3VyY2VFZGl0b3JEYXRhW1widXNlcmlzcmV2aWV3ZXJcIl0gPSBCb29sZWFuKHBhcnNlZFJlc291cmNlRWRpdG9yRGF0YVtcInVzZXJpc3Jldmlld2VyXCJdID09PSBcIlRydWVcIik7XG4gICAgcGFyc2VkUmVzb3VyY2VFZGl0b3JEYXRhW1widXNlcmlzY3JlYXRvclwiXSA9IFtcInRydWVcIiwgXCJUcnVlXCJdLmluY2x1ZGVzKHBhcnNlZFJlc291cmNlRWRpdG9yRGF0YVtcInVzZXJpc2NyZWF0b3JcIl0pO1xufSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VkUmVzb3VyY2VFZGl0b3JEYXRhO1xuIl0sIm5hbWVzIjpbInJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0Iiwic3RyaW5nIiwicmVwbGFjZSIsImZvcmNlRG91YmxlUXVvdGVzIiwicGFyc2VkUmVzb3VyY2VFZGl0b3JEYXRhIiwicmVzb3VyY2VFZGl0b3JEYXRhSFRNTCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInJlc291cmNlRWRpdG9yRGF0YSIsImdldEF0dHJpYnV0ZSIsIkpTT04iLCJwYXJzZSIsIkJvb2xlYW4iLCJpbmNsdWRlcyIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9