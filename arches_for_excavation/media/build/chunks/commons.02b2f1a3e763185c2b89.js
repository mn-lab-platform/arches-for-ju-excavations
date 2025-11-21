"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[87088],{

/***/ 87088:
/*!****************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph-designer-data.js ***!
  \****************************************************************************************************/
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
var parsedGraphDesignerData;
try {
  var graphDesignerDataHTML = document.querySelector('#graphDesignerData');
  var graphDesignerData = graphDesignerDataHTML.getAttribute('graphDesignerData');
  parsedGraphDesignerData = JSON.parse(removeTrailingCommaFromObject(graphDesignerData));
  parsedGraphDesignerData.ontology_namespaces = JSON.parse(forceDoubleQuotes(parsedGraphDesignerData.ontology_namespaces));
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsedGraphDesignerData);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMDJiMmYxYTNlNzYzMTg1YzJiODkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxTQUFTQyxpQkFBaUJBLENBQUNGLE1BQU0sRUFBRTtFQUMvQixPQUFPQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0FBQ3BDO0FBRUEsSUFBSUUsdUJBQXVCO0FBQzNCLElBQUk7RUFDQSxJQUFNQyxxQkFBcUIsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7RUFDMUUsSUFBTUMsaUJBQWlCLEdBQUdILHFCQUFxQixDQUFDSSxZQUFZLENBQUMsbUJBQW1CLENBQUM7RUFFakZMLHVCQUF1QixHQUFHTSxJQUFJLENBQUNDLEtBQUssQ0FBQ1gsNkJBQTZCLENBQUNRLGlCQUFpQixDQUFDLENBQUM7RUFDdEZKLHVCQUF1QixDQUFDUSxtQkFBbUIsR0FBR0YsSUFBSSxDQUFDQyxLQUFLLENBQUNSLGlCQUFpQixDQUFDQyx1QkFBdUIsQ0FBQ1EsbUJBQW1CLENBQUMsQ0FBQztBQUM1SCxDQUFDLENBQUMsT0FBT0MsS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVQsdUJBQXVCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9ncmFwaC1kZXNpZ25lci1kYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0KHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLFxccyp9KiQvLCBcIn1cIik7XG59XG5cbmZ1bmN0aW9uIGZvcmNlRG91YmxlUXVvdGVzKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvJy9nLCAnXCInKTtcbn1cblxubGV0IHBhcnNlZEdyYXBoRGVzaWduZXJEYXRhO1xudHJ5IHsgICAgICAgIFxuICAgIGNvbnN0IGdyYXBoRGVzaWduZXJEYXRhSFRNTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNncmFwaERlc2lnbmVyRGF0YScpO1xuICAgIGNvbnN0IGdyYXBoRGVzaWduZXJEYXRhID0gZ3JhcGhEZXNpZ25lckRhdGFIVE1MLmdldEF0dHJpYnV0ZSgnZ3JhcGhEZXNpZ25lckRhdGEnKTtcblxuICAgIHBhcnNlZEdyYXBoRGVzaWduZXJEYXRhID0gSlNPTi5wYXJzZShyZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdChncmFwaERlc2lnbmVyRGF0YSkpO1xuICAgIHBhcnNlZEdyYXBoRGVzaWduZXJEYXRhLm9udG9sb2d5X25hbWVzcGFjZXMgPSBKU09OLnBhcnNlKGZvcmNlRG91YmxlUXVvdGVzKHBhcnNlZEdyYXBoRGVzaWduZXJEYXRhLm9udG9sb2d5X25hbWVzcGFjZXMpKTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlZEdyYXBoRGVzaWduZXJEYXRhO1xuIl0sIm5hbWVzIjpbInJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0Iiwic3RyaW5nIiwicmVwbGFjZSIsImZvcmNlRG91YmxlUXVvdGVzIiwicGFyc2VkR3JhcGhEZXNpZ25lckRhdGEiLCJncmFwaERlc2lnbmVyRGF0YUhUTUwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJncmFwaERlc2lnbmVyRGF0YSIsImdldEF0dHJpYnV0ZSIsIkpTT04iLCJwYXJzZSIsIm9udG9sb2d5X25hbWVzcGFjZXMiLCJlcnJvciIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9