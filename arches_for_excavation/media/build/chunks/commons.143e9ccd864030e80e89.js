"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[31755],{

/***/ 31755:
/*!***********************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/graph-functions-data.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
var parsedGraphFunctionsData;
try {
  var graphFunctionsDataHTML = document.querySelector('#graphFunctionsData');
  var graphFunctionsData = graphFunctionsDataHTML.getAttribute('graphFunctionsData');
  parsedGraphFunctionsData = JSON.parse(removeTrailingCommaFromObject(graphFunctionsData));
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsedGraphFunctionsData);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMTQzZTljY2Q4NjQwMzBlODBlODkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxJQUFJQyx3QkFBd0I7QUFDNUIsSUFBSTtFQUNBLElBQU1DLHNCQUFzQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztFQUM1RSxJQUFNQyxrQkFBa0IsR0FBR0gsc0JBQXNCLENBQUNJLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztFQUVwRkwsd0JBQXdCLEdBQUdNLElBQUksQ0FBQ0MsS0FBSyxDQUFDViw2QkFBNkIsQ0FBQ08sa0JBQWtCLENBQUMsQ0FBQztBQUM1RixDQUFDLENBQUMsT0FBT0ksS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVIsd0JBQXdCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9ncmFwaC9ncmFwaC1mdW5jdGlvbnMtZGF0YS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiByZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyxcXHMqfSokLywgXCJ9XCIpO1xufVxuXG5sZXQgcGFyc2VkR3JhcGhGdW5jdGlvbnNEYXRhO1xudHJ5IHsgICAgICAgIFxuICAgIGNvbnN0IGdyYXBoRnVuY3Rpb25zRGF0YUhUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ3JhcGhGdW5jdGlvbnNEYXRhJyk7XG4gICAgY29uc3QgZ3JhcGhGdW5jdGlvbnNEYXRhID0gZ3JhcGhGdW5jdGlvbnNEYXRhSFRNTC5nZXRBdHRyaWJ1dGUoJ2dyYXBoRnVuY3Rpb25zRGF0YScpO1xuXG4gICAgcGFyc2VkR3JhcGhGdW5jdGlvbnNEYXRhID0gSlNPTi5wYXJzZShyZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdChncmFwaEZ1bmN0aW9uc0RhdGEpKTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlZEdyYXBoRnVuY3Rpb25zRGF0YTtcbiJdLCJuYW1lcyI6WyJyZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdCIsInN0cmluZyIsInJlcGxhY2UiLCJwYXJzZWRHcmFwaEZ1bmN0aW9uc0RhdGEiLCJncmFwaEZ1bmN0aW9uc0RhdGFIVE1MIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ3JhcGhGdW5jdGlvbnNEYXRhIiwiZ2V0QXR0cmlidXRlIiwiSlNPTiIsInBhcnNlIiwiZXJyb3IiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==