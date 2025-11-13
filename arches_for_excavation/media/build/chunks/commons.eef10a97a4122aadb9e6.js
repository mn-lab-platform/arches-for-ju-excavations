"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[22212],{

/***/ 22212:
/*!************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/view-data.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
var parsedViewData;
try {
  var viewDataHTML = document.querySelector('#viewData');
  var viewData = viewDataHTML.getAttribute('viewData');
  parsedViewData = JSON.parse(removeTrailingCommaFromObject(viewData));
  parsedViewData['userCanEditResources'] = Boolean(parsedViewData['userCanEditResources'] === "True");
  parsedViewData['userCanReadResources'] = Boolean(parsedViewData['userCanReadResources'] === "True");
} catch (error) {
  console.error(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsedViewData);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZWVmMTBhOTdhNDEyMmFhZGI5ZTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLDZCQUE2QkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzNDLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7QUFDekM7QUFFQSxJQUFJQyxjQUFjO0FBQ2xCLElBQUk7RUFDQSxJQUFNQyxZQUFZLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQztFQUN4RCxJQUFNQyxRQUFRLEdBQUdILFlBQVksQ0FBQ0ksWUFBWSxDQUFDLFVBQVUsQ0FBQztFQUN0REwsY0FBYyxHQUFHTSxJQUFJLENBQUNDLEtBQUssQ0FBQ1YsNkJBQTZCLENBQUNPLFFBQVEsQ0FBQyxDQUFDO0VBQ3BFSixjQUFjLENBQUMsc0JBQXNCLENBQUMsR0FBR1EsT0FBTyxDQUFDUixjQUFjLENBQUMsc0JBQXNCLENBQUMsS0FBSyxNQUFNLENBQUM7RUFDbkdBLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHUSxPQUFPLENBQUNSLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLE1BQU0sQ0FBQztBQUN2RyxDQUFDLENBQUMsT0FBT1MsS0FBSyxFQUFFO0VBQ1pDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7QUFDeEI7QUFFQSxpRUFBZVQsY0FBYyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlldy1kYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0KHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLFxccyp9KiQvLCBcIn1cIik7XG59XG5cbmxldCBwYXJzZWRWaWV3RGF0YTtcbnRyeSB7XG4gICAgY29uc3Qgdmlld0RhdGFIVE1MID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdEYXRhJyk7XG4gICAgY29uc3Qgdmlld0RhdGEgPSB2aWV3RGF0YUhUTUwuZ2V0QXR0cmlidXRlKCd2aWV3RGF0YScpO1xuICAgIHBhcnNlZFZpZXdEYXRhID0gSlNPTi5wYXJzZShyZW1vdmVUcmFpbGluZ0NvbW1hRnJvbU9iamVjdCh2aWV3RGF0YSkpO1xuICAgIHBhcnNlZFZpZXdEYXRhWyd1c2VyQ2FuRWRpdFJlc291cmNlcyddID0gQm9vbGVhbihwYXJzZWRWaWV3RGF0YVsndXNlckNhbkVkaXRSZXNvdXJjZXMnXSA9PT0gXCJUcnVlXCIpO1xuICAgIHBhcnNlZFZpZXdEYXRhWyd1c2VyQ2FuUmVhZFJlc291cmNlcyddID0gQm9vbGVhbihwYXJzZWRWaWV3RGF0YVsndXNlckNhblJlYWRSZXNvdXJjZXMnXSA9PT0gXCJUcnVlXCIpO1xufSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VkVmlld0RhdGE7Il0sIm5hbWVzIjpbInJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tT2JqZWN0Iiwic3RyaW5nIiwicmVwbGFjZSIsInBhcnNlZFZpZXdEYXRhIiwidmlld0RhdGFIVE1MIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidmlld0RhdGEiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJCb29sZWFuIiwiZXJyb3IiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==