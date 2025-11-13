"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[92495],{

/***/ 92495:
/*!*****************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/profile-manager-data.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
var parsedProfileManagerData;
try {
  var profileManagerDataHTML = document.querySelector('#profileManagerData');
  var profileManagerData = profileManagerDataHTML.getAttribute('profileManagerData');
  parsedProfileManagerData = JSON.parse(removeTrailingCommaFromObject(profileManagerData));
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsedProfileManagerData);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNjJlOGVlYWRlYjI2YTI3MTVlMGMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxJQUFJQyx3QkFBd0I7QUFFNUIsSUFBSTtFQUNBLElBQU1DLHNCQUFzQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztFQUM1RSxJQUFNQyxrQkFBa0IsR0FBR0gsc0JBQXNCLENBQUNJLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztFQUNwRkwsd0JBQXdCLEdBQUdNLElBQUksQ0FBQ0MsS0FBSyxDQUFDViw2QkFBNkIsQ0FBQ08sa0JBQWtCLENBQUMsQ0FBQztBQUM1RixDQUFDLENBQUMsT0FBT0ksS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVIsd0JBQXdCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9wcm9maWxlLW1hbmFnZXItZGF0YS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiByZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyxcXHMqfSokLywgXCJ9XCIpO1xufVxuXG5sZXQgcGFyc2VkUHJvZmlsZU1hbmFnZXJEYXRhO1xuXG50cnkge1xuICAgIGNvbnN0IHByb2ZpbGVNYW5hZ2VyRGF0YUhUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZmlsZU1hbmFnZXJEYXRhJyk7XG4gICAgY29uc3QgcHJvZmlsZU1hbmFnZXJEYXRhID0gcHJvZmlsZU1hbmFnZXJEYXRhSFRNTC5nZXRBdHRyaWJ1dGUoJ3Byb2ZpbGVNYW5hZ2VyRGF0YScpO1xuICAgIHBhcnNlZFByb2ZpbGVNYW5hZ2VyRGF0YSA9IEpTT04ucGFyc2UocmVtb3ZlVHJhaWxpbmdDb21tYUZyb21PYmplY3QocHJvZmlsZU1hbmFnZXJEYXRhKSk7XG59IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJzZWRQcm9maWxlTWFuYWdlckRhdGE7Il0sIm5hbWVzIjpbInJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0Iiwic3RyaW5nIiwicmVwbGFjZSIsInBhcnNlZFByb2ZpbGVNYW5hZ2VyRGF0YSIsInByb2ZpbGVNYW5hZ2VyRGF0YUhUTUwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwcm9maWxlTWFuYWdlckRhdGEiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9