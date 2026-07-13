"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[16680],{

/***/ 16680:
/*!***************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph-manager-data.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
var parsedGraphManagerData;
try {
  var graphManagerDataHTML = document.querySelector('#graphManagerData');
  var graphManagerData = graphManagerDataHTML.getAttribute('graphManagerData');
  parsedGraphManagerData = JSON.parse(removeTrailingCommaFromObject(graphManagerData));
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsedGraphManagerData);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYjc4YThiMWUzMzBiNGU0YjdmMzAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxJQUFJQyxzQkFBc0I7QUFDMUIsSUFBSTtFQUNBLElBQU1DLG9CQUFvQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztFQUN4RSxJQUFNQyxnQkFBZ0IsR0FBR0gsb0JBQW9CLENBQUNJLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztFQUU5RUwsc0JBQXNCLEdBQUdNLElBQUksQ0FBQ0MsS0FBSyxDQUFDViw2QkFBNkIsQ0FBQ08sZ0JBQWdCLENBQUMsQ0FBQztBQUN4RixDQUFDLENBQUMsT0FBT0ksS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVIsc0JBQXNCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9ncmFwaC1tYW5hZ2VyLWRhdGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcmVtb3ZlVHJhaWxpbmdDb21tYUZyb21PYmplY3Qoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8sXFxzKn0qJC8sIFwifVwiKTtcbn1cblxubGV0IHBhcnNlZEdyYXBoTWFuYWdlckRhdGE7XG50cnkgeyAgICAgICAgXG4gICAgY29uc3QgZ3JhcGhNYW5hZ2VyRGF0YUhUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ3JhcGhNYW5hZ2VyRGF0YScpO1xuICAgIGNvbnN0IGdyYXBoTWFuYWdlckRhdGEgPSBncmFwaE1hbmFnZXJEYXRhSFRNTC5nZXRBdHRyaWJ1dGUoJ2dyYXBoTWFuYWdlckRhdGEnKTtcblxuICAgIHBhcnNlZEdyYXBoTWFuYWdlckRhdGEgPSBKU09OLnBhcnNlKHJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0KGdyYXBoTWFuYWdlckRhdGEpKTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlZEdyYXBoTWFuYWdlckRhdGE7XG4iXSwibmFtZXMiOlsicmVtb3ZlVHJhaWxpbmdDb21tYUZyb21PYmplY3QiLCJzdHJpbmciLCJyZXBsYWNlIiwicGFyc2VkR3JhcGhNYW5hZ2VyRGF0YSIsImdyYXBoTWFuYWdlckRhdGFIVE1MIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ3JhcGhNYW5hZ2VyRGF0YSIsImdldEF0dHJpYnV0ZSIsIkpTT04iLCJwYXJzZSIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9