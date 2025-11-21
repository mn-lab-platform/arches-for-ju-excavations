"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[46983],{

/***/ 46983:
/*!*****************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/saved-searches.js + 1 modules ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ saved_searches)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/search/saved-searches.htm
const saved_searches_namespaceObject = "templates/views/components/search/saved-searches.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/smartresize.js
var smartresize = __webpack_require__(74434);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/saved-searches.js





var componentName = 'saved-searches';
var viewModel = function viewModel(params) {
  var self = this;
  self.searchFilterVms = params.searchFilterVms;
  self.urls = arches["default"].urls;
  self.selectedPopup = params.selectedPopup;
  self.items = knockout_latest_default().observableArray([]);
  jquery_min_default().ajax({
    type: "GET",
    url: arches["default"].urls.api_search_component_data + componentName,
    context: this
  }).done(function (response) {
    response[componentName].forEach(function (search) {
      var searchImageUrl = arches["default"].urls.url_subpath + (search.IMAGE && search.IMAGE.length > 0 ? search.IMAGE[0].url : '');
      searchImageUrl = searchImageUrl.replace('//', '/');
      self.items.push({
        image: searchImageUrl,
        title: search.SEARCH_NAME ? search.SEARCH_NAME[arches["default"].activeLanguage].value : "",
        subtitle: search.SEARCH_DESCRIPTION ? search.SEARCH_DESCRIPTION[arches["default"].activeLanguage].value : "",
        searchUrl: search.SEARCH_URL ? search.SEARCH_URL[arches["default"].activeLanguage].value : ""
      });
    });
    self.searchFilterVms[componentName](self);
  });
  self.options = {
    itemSelector: '.ss-grid-item',
    masonry: {
      columnWidth: 500,
      gutterWidth: 25
    }
  };
};
/* harmony default export */ const saved_searches = (knockout_latest_default().components.register(componentName, {
  viewModel: viewModel,
  template: saved_searches_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZTI5ZGNhYjMzNmY0MWVmY2JkNDkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0c7QUFDRTtBQUM2RDtBQUMzRDtBQUc5QixJQUFNSSxhQUFhLEdBQUcsZ0JBQWdCO0FBQ3RDLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFZQyxNQUFNLEVBQUU7RUFDL0IsSUFBSUMsSUFBSSxHQUFHLElBQUk7RUFDZkEsSUFBSSxDQUFDQyxlQUFlLEdBQUdGLE1BQU0sQ0FBQ0UsZUFBZTtFQUc3Q0QsSUFBSSxDQUFDRSxJQUFJLEdBQUdQLGlCQUFNLENBQUNPLElBQUk7RUFDdkJGLElBQUksQ0FBQ0csYUFBYSxHQUFHSixNQUFNLENBQUNJLGFBQWE7RUFDekNILElBQUksQ0FBQ0ksS0FBSyxHQUFHVix5Q0FBa0IsQ0FBQyxFQUFFLENBQUM7RUFDbkNELHlCQUFNLENBQUM7SUFDSGMsSUFBSSxFQUFFLEtBQUs7SUFDWEMsR0FBRyxFQUFFYixpQkFBTSxDQUFDTyxJQUFJLENBQUNPLHlCQUF5QixHQUFHWixhQUFhO0lBQzFEYSxPQUFPLEVBQUU7RUFDYixDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQVNDLFFBQVEsRUFBRTtJQUN2QkEsUUFBUSxDQUFDZixhQUFhLENBQUMsQ0FBQ2dCLE9BQU8sQ0FBQyxVQUFTQyxNQUFNLEVBQUU7TUFDN0MsSUFBSUMsY0FBYyxHQUFHcEIsaUJBQU0sQ0FBQ08sSUFBSSxDQUFDYyxXQUFXLElBQUtGLE1BQU0sQ0FBQ0csS0FBSyxJQUFJSCxNQUFNLENBQUNHLEtBQUssQ0FBQ0MsTUFBTSxHQUFHLENBQUMsR0FBSUosTUFBTSxDQUFDRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNULEdBQUcsR0FBRyxFQUFFLENBQUM7TUFDckhPLGNBQWMsR0FBR0EsY0FBYyxDQUFDSSxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztNQUNsRG5CLElBQUksQ0FBQ0ksS0FBSyxDQUFDZ0IsSUFBSSxDQUFDO1FBQ1pDLEtBQUssRUFBRU4sY0FBYztRQUNyQk8sS0FBSyxFQUFFUixNQUFNLENBQUNTLFdBQVcsR0FBR1QsTUFBTSxDQUFDUyxXQUFXLENBQUM1QixpQkFBTSxDQUFDNkIsY0FBYyxDQUFDLENBQUNDLEtBQUssR0FBRyxFQUFFO1FBQ2hGQyxRQUFRLEVBQUVaLE1BQU0sQ0FBQ2Esa0JBQWtCLEdBQUdiLE1BQU0sQ0FBQ2Esa0JBQWtCLENBQUNoQyxpQkFBTSxDQUFDNkIsY0FBYyxDQUFDLENBQUNDLEtBQUssR0FBRyxFQUFFO1FBQ2pHRyxTQUFTLEVBQUVkLE1BQU0sQ0FBQ2UsVUFBVSxHQUFHZixNQUFNLENBQUNlLFVBQVUsQ0FBQ2xDLGlCQUFNLENBQUM2QixjQUFjLENBQUMsQ0FBQ0MsS0FBSyxHQUFFO01BQ25GLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztJQUNGekIsSUFBSSxDQUFDQyxlQUFlLENBQUNKLGFBQWEsQ0FBQyxDQUFDRyxJQUFJLENBQUM7RUFDN0MsQ0FBQyxDQUFDO0VBRUZBLElBQUksQ0FBQzhCLE9BQU8sR0FBRztJQUNYQyxZQUFZLEVBQUUsZUFBZTtJQUM3QkMsT0FBTyxFQUFFO01BQ0xDLFdBQVcsRUFBRSxHQUFHO01BQ2hCQyxXQUFXLEVBQUU7SUFDakI7RUFDSixDQUFDO0FBQ0wsQ0FBQztBQUVELHFEQUFleEMsb0NBQWEsQ0FBQzBDLFFBQVEsQ0FBQ3ZDLGFBQWEsRUFBRTtFQUNqREMsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCdUMsUUFBUSxFQUFFekMsOEJBQXFCQTtBQUNuQyxDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvc2VhcmNoL3NhdmVkLXNlYXJjaGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IHNhdmVkU2VhcmNoZXNUZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy9zZWFyY2gvc2F2ZWQtc2VhcmNoZXMuaHRtJztcbmltcG9ydCAnYmluZGluZ3Mvc21hcnRyZXNpemUnO1xuXG5cbmNvbnN0IGNvbXBvbmVudE5hbWUgPSAnc2F2ZWQtc2VhcmNoZXMnO1xuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuc2VhcmNoRmlsdGVyVm1zID0gcGFyYW1zLnNlYXJjaEZpbHRlclZtcztcblxuICAgICAgICBcbiAgICBzZWxmLnVybHMgPSBhcmNoZXMudXJscztcbiAgICBzZWxmLnNlbGVjdGVkUG9wdXAgPSBwYXJhbXMuc2VsZWN0ZWRQb3B1cDtcbiAgICBzZWxmLml0ZW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICB1cmw6IGFyY2hlcy51cmxzLmFwaV9zZWFyY2hfY29tcG9uZW50X2RhdGEgKyBjb21wb25lbnROYW1lLFxuICAgICAgICBjb250ZXh0OiB0aGlzXG4gICAgfSkuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXNwb25zZVtjb21wb25lbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKHNlYXJjaCkge1xuICAgICAgICAgICAgbGV0IHNlYXJjaEltYWdlVXJsID0gYXJjaGVzLnVybHMudXJsX3N1YnBhdGggKyAoKHNlYXJjaC5JTUFHRSAmJiBzZWFyY2guSU1BR0UubGVuZ3RoID4gMCkgPyBzZWFyY2guSU1BR0VbMF0udXJsIDogJycpO1xuICAgICAgICAgICAgc2VhcmNoSW1hZ2VVcmwgPSBzZWFyY2hJbWFnZVVybC5yZXBsYWNlKCcvLycsICcvJyk7XG4gICAgICAgICAgICBzZWxmLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIGltYWdlOiBzZWFyY2hJbWFnZVVybCxcbiAgICAgICAgICAgICAgICB0aXRsZTogc2VhcmNoLlNFQVJDSF9OQU1FID8gc2VhcmNoLlNFQVJDSF9OQU1FW2FyY2hlcy5hY3RpdmVMYW5ndWFnZV0udmFsdWUgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHN1YnRpdGxlOiBzZWFyY2guU0VBUkNIX0RFU0NSSVBUSU9OID8gc2VhcmNoLlNFQVJDSF9ERVNDUklQVElPTlthcmNoZXMuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlIDogXCJcIixcbiAgICAgICAgICAgICAgICBzZWFyY2hVcmw6IHNlYXJjaC5TRUFSQ0hfVVJMID8gc2VhcmNoLlNFQVJDSF9VUkxbYXJjaGVzLmFjdGl2ZUxhbmd1YWdlXS52YWx1ZTogXCJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLnNlYXJjaEZpbHRlclZtc1tjb21wb25lbnROYW1lXShzZWxmKTtcbiAgICB9KTtcblxuICAgIHNlbGYub3B0aW9ucyA9IHtcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnNzLWdyaWQtaXRlbScsXG4gICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiA1MDAsXG4gICAgICAgICAgICBndXR0ZXJXaWR0aDogMjUsXG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3Rlcihjb21wb25lbnROYW1lLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IHNhdmVkU2VhcmNoZXNUZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbIiQiLCJrbyIsImFyY2hlcyIsInNhdmVkU2VhcmNoZXNUZW1wbGF0ZSIsImNvbXBvbmVudE5hbWUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwic2VhcmNoRmlsdGVyVm1zIiwidXJscyIsInNlbGVjdGVkUG9wdXAiLCJpdGVtcyIsIm9ic2VydmFibGVBcnJheSIsImFqYXgiLCJ0eXBlIiwidXJsIiwiYXBpX3NlYXJjaF9jb21wb25lbnRfZGF0YSIsImNvbnRleHQiLCJkb25lIiwicmVzcG9uc2UiLCJmb3JFYWNoIiwic2VhcmNoIiwic2VhcmNoSW1hZ2VVcmwiLCJ1cmxfc3VicGF0aCIsIklNQUdFIiwibGVuZ3RoIiwicmVwbGFjZSIsInB1c2giLCJpbWFnZSIsInRpdGxlIiwiU0VBUkNIX05BTUUiLCJhY3RpdmVMYW5ndWFnZSIsInZhbHVlIiwic3VidGl0bGUiLCJTRUFSQ0hfREVTQ1JJUFRJT04iLCJzZWFyY2hVcmwiLCJTRUFSQ0hfVVJMIiwib3B0aW9ucyIsIml0ZW1TZWxlY3RvciIsIm1hc29ucnkiLCJjb2x1bW5XaWR0aCIsImd1dHRlcldpZHRoIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9