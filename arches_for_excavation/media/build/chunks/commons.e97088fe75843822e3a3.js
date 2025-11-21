"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[5225],{

/***/ 5225:
/*!****************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/paging-filter.js + 1 modules ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ paging_filter)
});

// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/base-filter.js
var base_filter = __webpack_require__(76713);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/aria.js
var aria = __webpack_require__(9285);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/search/paging-filter.htm
const paging_filter_namespaceObject = "templates/views/components/search/paging-filter.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/paging-filter.js





var componentName = 'paging-filter';
var viewModel = base_filter["default"].extend({
  initialize: function initialize(options) {
    options.name = 'Paging Filter';
    base_filter["default"].prototype.initialize.call(this, options);
    this.page = knockout_latest_default().observable();
    this.preventLoop = false;
    this.userRequestedNewPage = false;
    this.pageInitialized = false;
    this.paginator = knockout_mapping_min_default().fromJS({
      current_page: 1,
      end_index: 1,
      has_next: false,
      has_other_pages: true,
      has_previous: false,
      next_page_number: 2,
      pages: [],
      previous_page_number: null,
      start_index: 1
    });
    this.shiftFocus = aria["default"].shiftFocus;
    this.query.subscribe(function () {
      if (this.preventLoop === false && this.userRequestedNewPage === false && this.pageInitialized === true) {
        this.preventLoop = true;
        this.page(1);
      } else {
        this.preventLoop = false;
        this.userRequestedNewPage = false;
      }
    }, this, 'beforeChange');
    this.page.subscribe(function (timestamp) {
      this.updateQuery();
    }, this);
    this.searchResults.timestamp.subscribe(function (timestamp) {
      this.updateResults();
    }, this);
    this.searchFilterVms[componentName](this);
    this.restoreState();
    this.pageInitialized = true;
  },
  updateQuery: function updateQuery() {
    var queryObj = this.query();
    queryObj[componentName] = this.page();
    this.query(queryObj);
  },
  newPage: function newPage(page) {
    if (page) {
      this.userRequestedNewPage = true;
      this.page(page);
      this.shiftFocus('#search-results-list-type');
    }
  },
  restoreState: function restoreState() {
    var currentPage = this.query()[componentName];
    if (!currentPage) {
      currentPage = 1;
    }
    this.page(currentPage);
    this.updateResults();
  },
  updateResults: function updateResults() {
    if (!!this.searchResults[componentName] && !!this.searchResults[componentName]['paginator']) {
      knockout_mapping_min_default().fromJS(this.searchResults[componentName]['paginator'], this.paginator);
    }
  }
});
/* harmony default export */ const paging_filter = (knockout_latest_default().components.register(componentName, {
  viewModel: viewModel,
  template: paging_filter_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxDQUFDSCxJQUFJLENBQUNBLElBQUksQ0FBQztNQUNmLElBQUksQ0FBQ2dCLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQztJQUNoRDtFQUNKLENBQUM7RUFFRFEsWUFBWSxFQUFFLFNBQWRBLFlBQVlBLENBQUEsRUFBWTtJQUNwQixJQUFJRyxXQUFXLEdBQUcsSUFBSSxDQUFDVixLQUFLLENBQUMsQ0FBQyxDQUFDekIsYUFBYSxDQUFDO0lBQzdDLElBQUksQ0FBQ21DLFdBQVcsRUFBRTtNQUNkQSxXQUFXLEdBQUcsQ0FBQztJQUNuQjtJQUNBLElBQUksQ0FBQzNCLElBQUksQ0FBQzJCLFdBQVcsQ0FBQztJQUN0QixJQUFJLENBQUNMLGFBQWEsQ0FBQyxDQUFDO0VBQ3hCLENBQUM7RUFFREEsYUFBYSxFQUFFLFNBQWZBLGFBQWFBLENBQUEsRUFBYTtJQUN0QixJQUFHLENBQUMsQ0FBQyxJQUFJLENBQUNELGFBQWEsQ0FBQzdCLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM2QixhQUFhLENBQUM3QixhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRTtNQUN4RkgscUNBQWdCLENBQUMsSUFBSSxDQUFDZ0MsYUFBYSxDQUFDN0IsYUFBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDYSxTQUFTLENBQUM7SUFDcEY7RUFDSjtBQUNKLENBQUMsQ0FBQztBQUVGLG9EQUFlakIsb0NBQWEsQ0FBQ3lDLFFBQVEsQ0FBQ3JDLGFBQWEsRUFBRTtFQUNqREMsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCcUMsUUFBUSxFQUFFdkMsNkJBQW9CQTtBQUNsQyxDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvc2VhcmNoL3BhZ2luZy1maWx0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VGaWx0ZXIgZnJvbSAndmlld3MvY29tcG9uZW50cy9zZWFyY2gvYmFzZS1maWx0ZXInO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgYXJpYVV0aWxzIGZyb20gJ3V0aWxzL2FyaWEnO1xuaW1wb3J0IHBhZ2luZ0ZpbHRlclRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9wYWdpbmctZmlsdGVyLmh0bSc7XG5cblxuY29uc3QgY29tcG9uZW50TmFtZSA9ICdwYWdpbmctZmlsdGVyJztcbmNvbnN0IHZpZXdNb2RlbCA9IEJhc2VGaWx0ZXIuZXh0ZW5kKHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9ICdQYWdpbmcgRmlsdGVyJztcbiAgICAgICAgQmFzZUZpbHRlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnBhZ2UgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgICAgIHRoaXMucHJldmVudExvb3AgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51c2VyUmVxdWVzdGVkTmV3UGFnZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhZ2VJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhZ2luYXRvciA9IGtvTWFwcGluZy5mcm9tSlMoe1xuICAgICAgICAgICAgY3VycmVudF9wYWdlOiAxLFxuICAgICAgICAgICAgZW5kX2luZGV4OiAxLFxuICAgICAgICAgICAgaGFzX25leHQ6IGZhbHNlLFxuICAgICAgICAgICAgaGFzX290aGVyX3BhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgaGFzX3ByZXZpb3VzOiBmYWxzZSxcbiAgICAgICAgICAgIG5leHRfcGFnZV9udW1iZXI6IDIsXG4gICAgICAgICAgICBwYWdlczogW10sXG4gICAgICAgICAgICBwcmV2aW91c19wYWdlX251bWJlcjogbnVsbCxcbiAgICAgICAgICAgIHN0YXJ0X2luZGV4OiAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNoaWZ0Rm9jdXMgPSBhcmlhVXRpbHMuc2hpZnRGb2N1cztcblxuICAgICAgICB0aGlzLnF1ZXJ5LnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXZlbnRMb29wID09PSBmYWxzZSAmJiB0aGlzLnVzZXJSZXF1ZXN0ZWROZXdQYWdlID09PSBmYWxzZSAmJiB0aGlzLnBhZ2VJbml0aWFsaXplZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmVudExvb3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZSgxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50TG9vcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudXNlclJlcXVlc3RlZE5ld1BhZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcywgJ2JlZm9yZUNoYW5nZScpO1xuXG4gICAgICAgIHRoaXMucGFnZS5zdWJzY3JpYmUoZnVuY3Rpb24odGltZXN0YW1wKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVF1ZXJ5KCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cy50aW1lc3RhbXAuc3Vic2NyaWJlKGZ1bmN0aW9uKHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSZXN1bHRzKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoRmlsdGVyVm1zW2NvbXBvbmVudE5hbWVdKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc3RvcmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLnBhZ2VJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfSxcblxuICAgIHVwZGF0ZVF1ZXJ5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXJ5T2JqID0gdGhpcy5xdWVyeSgpO1xuICAgICAgICBxdWVyeU9ialtjb21wb25lbnROYW1lXSA9IHRoaXMucGFnZSgpO1xuICAgICAgICB0aGlzLnF1ZXJ5KHF1ZXJ5T2JqKTtcbiAgICB9LFxuXG4gICAgbmV3UGFnZTogZnVuY3Rpb24ocGFnZSl7XG4gICAgICAgIGlmKHBhZ2Upe1xuICAgICAgICAgICAgdGhpcy51c2VyUmVxdWVzdGVkTmV3UGFnZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBhZ2UocGFnZSk7XG4gICAgICAgICAgICB0aGlzLnNoaWZ0Rm9jdXMoJyNzZWFyY2gtcmVzdWx0cy1saXN0LXR5cGUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXN0b3JlU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBjdXJyZW50UGFnZSA9IHRoaXMucXVlcnkoKVtjb21wb25lbnROYW1lXTtcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgY3VycmVudFBhZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZShjdXJyZW50UGFnZSk7XG4gICAgICAgIHRoaXMudXBkYXRlUmVzdWx0cygpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVSZXN1bHRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoISF0aGlzLnNlYXJjaFJlc3VsdHNbY29tcG9uZW50TmFtZV0gJiYgISF0aGlzLnNlYXJjaFJlc3VsdHNbY29tcG9uZW50TmFtZV1bJ3BhZ2luYXRvciddKSB7XG4gICAgICAgICAgICBrb01hcHBpbmcuZnJvbUpTKHRoaXMuc2VhcmNoUmVzdWx0c1tjb21wb25lbnROYW1lXVsncGFnaW5hdG9yJ10sIHRoaXMucGFnaW5hdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKGNvbXBvbmVudE5hbWUsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogcGFnaW5nRmlsdGVyVGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJCYXNlRmlsdGVyIiwia28iLCJrb01hcHBpbmciLCJhcmlhVXRpbHMiLCJwYWdpbmdGaWx0ZXJUZW1wbGF0ZSIsImNvbXBvbmVudE5hbWUiLCJ2aWV3TW9kZWwiLCJleHRlbmQiLCJpbml0aWFsaXplIiwib3B0aW9ucyIsIm5hbWUiLCJwcm90b3R5cGUiLCJjYWxsIiwicGFnZSIsIm9ic2VydmFibGUiLCJwcmV2ZW50TG9vcCIsInVzZXJSZXF1ZXN0ZWROZXdQYWdlIiwicGFnZUluaXRpYWxpemVkIiwicGFnaW5hdG9yIiwiZnJvbUpTIiwiY3VycmVudF9wYWdlIiwiZW5kX2luZGV4IiwiaGFzX25leHQiLCJoYXNfb3RoZXJfcGFnZXMiLCJoYXNfcHJldmlvdXMiLCJuZXh0X3BhZ2VfbnVtYmVyIiwicGFnZXMiLCJwcmV2aW91c19wYWdlX251bWJlciIsInN0YXJ0X2luZGV4Iiwic2hpZnRGb2N1cyIsInF1ZXJ5Iiwic3Vic2NyaWJlIiwidGltZXN0YW1wIiwidXBkYXRlUXVlcnkiLCJzZWFyY2hSZXN1bHRzIiwidXBkYXRlUmVzdWx0cyIsInNlYXJjaEZpbHRlclZtcyIsInJlc3RvcmVTdGF0ZSIsInF1ZXJ5T2JqIiwibmV3UGFnZSIsImN1cnJlbnRQYWdlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9