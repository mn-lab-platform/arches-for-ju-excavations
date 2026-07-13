"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[48699],{

/***/ 48699:
/*!***************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/sort-results.js + 1 modules ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ sort_results)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/base-filter.js
var base_filter = __webpack_require__(76713);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/search/sort-results.htm
const sort_results_namespaceObject = "templates/views/components/search/sort-results.htm";
// EXTERNAL MODULE: ./node_modules/chosen-js/chosen.jquery.min.js
var chosen_jquery_min = __webpack_require__(5785);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/sort-results.js






var componentName = 'sort-results';
var viewModel = base_filter["default"].extend({
  initialize: function initialize(options) {
    options.name = 'Sort Results';
    base_filter["default"].prototype.initialize.call(this, options);
    this.sortBy = knockout_latest_default().observable('');
    this.sortOrder = knockout_latest_default().observable('asc');
    this.sortSymbol = knockout_latest_default().computed(function () {
      return this.sortOrder() === "asc" ? '<i class="fa fa-sort-amount-asc fa-lg"></i>' : '<i class="fa fa-sort-amount-desc fa-lg"></i>';
    }, this);
    this.searchFilterVms[componentName](this);
    this.sortBy.subscribe(function () {
      this.updateQuery();
    }, this);
    this.sortOrder.subscribe(function () {
      this.updateQuery();
    }, this);
    this.restoreState();
  },
  updateQuery: function updateQuery() {
    var queryObj = this.query();
    if (this.sortBy() === '') {
      delete queryObj['sort-by'];
    } else {
      queryObj['sort-by'] = this.sortBy();
    }
    if (this.sortOrder() === '' | this.sortBy() === '') {
      delete queryObj['sort-order'];
    } else {
      queryObj['sort-order'] = this.sortOrder();
    }
    this.query(queryObj);
  },
  restoreState: function restoreState() {
    var query = this.query();
    if ('sort-by' in query) {
      this.sortBy(query['sort-by']);
    }
    if ('sort-order' in query) {
      this.sortOrder(query['sort-order']);
    }
  },
  clear: function clear() {
    this.sortBy('');
    this.sortOrder('');
  }
});
/* harmony default export */ const sort_results = (knockout_latest_default().components.register(componentName, {
  viewModel: viewModel,
  template: sort_results_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYzEwODFlNDM5ZTNjMzkyMWY1ZjUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNJO0FBQ0Q7QUFDbUM7QUFDd0I7QUFDckU7QUFHaEIsSUFBSUssYUFBYSxHQUFHLGNBQWM7QUFDbEMsSUFBTUMsU0FBUyxHQUFHSCxzQkFBVSxDQUFDSSxNQUFNLENBQUM7RUFDaENDLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFXQyxPQUFPLEVBQUU7SUFDMUJBLE9BQU8sQ0FBQ0MsSUFBSSxHQUFHLGNBQWM7SUFDN0JQLHNCQUFVLENBQUNRLFNBQVMsQ0FBQ0gsVUFBVSxDQUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFSCxPQUFPLENBQUM7SUFFbkQsSUFBSSxDQUFDSSxNQUFNLEdBQUdYLG9DQUFhLENBQUMsRUFBRSxDQUFDO0lBQy9CLElBQUksQ0FBQ2EsU0FBUyxHQUFHYixvQ0FBYSxDQUFDLEtBQUssQ0FBQztJQUVyQyxJQUFJLENBQUNjLFVBQVUsR0FBQ2Qsa0NBQVcsQ0FBQyxZQUFXO01BQ25DLE9BQU8sSUFBSSxDQUFDYSxTQUFTLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FDN0IsNkNBQTZDLEdBQzdDLDhDQUE4QztJQUN0RCxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBRVIsSUFBSSxDQUFDRyxlQUFlLENBQUNiLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUV6QyxJQUFJLENBQUNRLE1BQU0sQ0FBQ00sU0FBUyxDQUFDLFlBQVU7TUFDNUIsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQztJQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBRVIsSUFBSSxDQUFDTCxTQUFTLENBQUNJLFNBQVMsQ0FBQyxZQUFVO01BQy9CLElBQUksQ0FBQ0MsV0FBVyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUVSLElBQUksQ0FBQ0MsWUFBWSxDQUFDLENBQUM7RUFDdkIsQ0FBQztFQUVERCxXQUFXLEVBQUUsU0FBYkEsV0FBV0EsQ0FBQSxFQUFhO0lBQ3BCLElBQUlFLFFBQVEsR0FBRyxJQUFJLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLElBQUcsSUFBSSxDQUFDVixNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtNQUNyQixPQUFPUyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQzlCLENBQUMsTUFBTTtNQUNIQSxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDVCxNQUFNLENBQUMsQ0FBQztJQUN2QztJQUVBLElBQUcsSUFBSSxDQUFDRSxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUNGLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO01BQy9DLE9BQU9TLFFBQVEsQ0FBQyxZQUFZLENBQUM7SUFDakMsQ0FBQyxNQUFNO01BQ0hBLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUNQLFNBQVMsQ0FBQyxDQUFDO0lBQzdDO0lBRUEsSUFBSSxDQUFDUSxLQUFLLENBQUNELFFBQVEsQ0FBQztFQUN4QixDQUFDO0VBRURELFlBQVksRUFBRSxTQUFkQSxZQUFZQSxDQUFBLEVBQVk7SUFDcEIsSUFBSUUsS0FBSyxHQUFHLElBQUksQ0FBQ0EsS0FBSyxDQUFDLENBQUM7SUFDeEIsSUFBSSxTQUFTLElBQUlBLEtBQUssRUFBRTtNQUNwQixJQUFJLENBQUNWLE1BQU0sQ0FBQ1UsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDO0lBRUEsSUFBSSxZQUFZLElBQUlBLEtBQUssRUFBRTtNQUN2QixJQUFJLENBQUNSLFNBQVMsQ0FBQ1EsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZDO0VBQ0osQ0FBQztFQUVEQyxLQUFLLEVBQUUsU0FBUEEsS0FBS0EsQ0FBQSxFQUFZO0lBQ2IsSUFBSSxDQUFDWCxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2YsSUFBSSxDQUFDRSxTQUFTLENBQUMsRUFBRSxDQUFDO0VBQ3RCO0FBRUosQ0FBQyxDQUFDO0FBRUYsbURBQWViLG9DQUFhLENBQUN3QixRQUFRLENBQUNyQixhQUFhLEVBQUU7RUFDakRDLFNBQVMsRUFBRUEsU0FBUztFQUNwQnFCLFFBQVEsRUFBRXZCLDRCQUFtQkE7QUFDakMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9zb3J0LXJlc3VsdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBCYXNlRmlsdGVyIGZyb20gJ3ZpZXdzL2NvbXBvbmVudHMvc2VhcmNoL2Jhc2UtZmlsdGVyJztcbmltcG9ydCBzb3J0UmVzdWx0c1RlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9zb3J0LXJlc3VsdHMuaHRtJztcbmltcG9ydCAnY2hvc2VuJztcblxuXG52YXIgY29tcG9uZW50TmFtZSA9ICdzb3J0LXJlc3VsdHMnO1xuY29uc3Qgdmlld01vZGVsID0gQmFzZUZpbHRlci5leHRlbmQoe1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy5uYW1lID0gJ1NvcnQgUmVzdWx0cyc7XG4gICAgICAgIEJhc2VGaWx0ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLnNvcnRCeSA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgICAgICB0aGlzLnNvcnRPcmRlciA9IGtvLm9ic2VydmFibGUoJ2FzYycpO1xuXG4gICAgICAgIHRoaXMuc29ydFN5bWJvbD1rby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvcnRPcmRlcigpID09PSBcImFzY1wiID8gXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtc29ydC1hbW91bnQtYXNjIGZhLWxnXCI+PC9pPicgOiAgXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtc29ydC1hbW91bnQtZGVzYyBmYS1sZ1wiPjwvaT4nXG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoRmlsdGVyVm1zW2NvbXBvbmVudE5hbWVdKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc29ydEJ5LnN1YnNjcmliZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy51cGRhdGVRdWVyeSgpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLnNvcnRPcmRlci5zdWJzY3JpYmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUXVlcnkoKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5yZXN0b3JlU3RhdGUoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUXVlcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcXVlcnlPYmogPSB0aGlzLnF1ZXJ5KCk7XG4gICAgICAgIGlmKHRoaXMuc29ydEJ5KCkgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgcXVlcnlPYmpbJ3NvcnQtYnknXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5T2JqWydzb3J0LWJ5J10gPSB0aGlzLnNvcnRCeSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5zb3J0T3JkZXIoKSA9PT0gJycgfCB0aGlzLnNvcnRCeSgpID09PSAnJykge1xuICAgICAgICAgICAgZGVsZXRlIHF1ZXJ5T2JqWydzb3J0LW9yZGVyJ107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWVyeU9ialsnc29ydC1vcmRlciddID0gdGhpcy5zb3J0T3JkZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLnF1ZXJ5KHF1ZXJ5T2JqKTtcbiAgICB9LFxuXG4gICAgcmVzdG9yZVN0YXRlOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5KCk7XG4gICAgICAgIGlmICgnc29ydC1ieScgaW4gcXVlcnkpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydEJ5KHF1ZXJ5Wydzb3J0LWJ5J10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdzb3J0LW9yZGVyJyBpbiBxdWVyeSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXIocXVlcnlbJ3NvcnQtb3JkZXInXSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuc29ydEJ5KCcnKTtcbiAgICAgICAgdGhpcy5zb3J0T3JkZXIoJycpXG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3Rlcihjb21wb25lbnROYW1lLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IHNvcnRSZXN1bHRzVGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwiQmFzZUZpbHRlciIsInNvcnRSZXN1bHRzVGVtcGxhdGUiLCJjb21wb25lbnROYW1lIiwidmlld01vZGVsIiwiZXh0ZW5kIiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJuYW1lIiwicHJvdG90eXBlIiwiY2FsbCIsInNvcnRCeSIsIm9ic2VydmFibGUiLCJzb3J0T3JkZXIiLCJzb3J0U3ltYm9sIiwiY29tcHV0ZWQiLCJzZWFyY2hGaWx0ZXJWbXMiLCJzdWJzY3JpYmUiLCJ1cGRhdGVRdWVyeSIsInJlc3RvcmVTdGF0ZSIsInF1ZXJ5T2JqIiwicXVlcnkiLCJjbGVhciIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=