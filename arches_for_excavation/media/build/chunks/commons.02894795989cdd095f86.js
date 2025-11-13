"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[91264],{

/***/ 91264:
/*!*********************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/provisional-filter.js + 1 modules ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ provisional_filter)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/base-filter.js
var base_filter = __webpack_require__(76713);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/search/provisional-filter.htm
const provisional_filter_namespaceObject = "templates/views/components/search/provisional-filter.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/provisional-filter.js




var componentName = 'provisional-filter';
var viewModel = base_filter["default"].extend({
  initialize: function initialize(options) {
    options.name = 'Provisional Filter';
    this.translations = arches["default"].translations;
    base_filter["default"].prototype.initialize.call(this, options);
    this.filter = knockout_latest_default().observableArray();
    this.provisionalOptions = [{
      'name': 'Authoritative'
    }, {
      'name': 'Provisional'
    }];
    var filterUpdated = knockout_latest_default().computed(function () {
      return JSON.stringify(knockout_latest_default().toJS(this.filter()));
    }, this);
    filterUpdated.subscribe(function () {
      this.updateQuery();
    }, this);
    this.searchFilterVms[componentName](this);
    if (this.searchViewFiltersLoaded() === false) {
      this.searchViewFiltersLoaded.subscribe(function () {
        this.restoreState();
      }, this);
    } else {
      this.restoreState();
    }
  },
  updateQuery: function updateQuery() {
    var queryObj = this.query();
    if (this.filter().length > 0) {
      queryObj[componentName] = knockout_latest_default().toJSON(this.filter);
    } else {
      delete queryObj[componentName];
    }
    this.query(queryObj);
  },
  restoreState: function restoreState() {
    var query = this.query();
    if (componentName in query) {
      var provisionalQuery = JSON.parse(query[componentName]);
      if (provisionalQuery.length > 0) {
        provisionalQuery.forEach(function (type) {
          type.inverted = knockout_latest_default().observable(!!type.inverted);
          this.getFilterByType('term-filter-type').addTag(type.provisionaltype, this.name, type.inverted);
        }, this);
        this.filter(provisionalQuery);
      }
    }
  },
  selectProvisional: function selectProvisional(item) {
    this.filter().forEach(function (val) {
      this.getFilterByType('term-filter-type').removeTag(val.provisionaltype);
    }, this);
    if (!!item) {
      var inverted = knockout_latest_default().observable(false);
      this.getFilterByType('term-filter-type').addTag(item.name, this.name, inverted);
      this.filter([{
        provisionaltype: item.name,
        inverted: inverted
      }]);
    } else {
      this.clear();
    }
  },
  clear: function clear() {
    this.filter.removeAll();
  }
});
/* harmony default export */ const provisional_filter = (knockout_latest_default().components.register(componentName, {
  viewModel: viewModel,
  template: provisional_filter_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMDI4OTQ3OTU5ODljZGQwOTVmODYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ0U7QUFDaUM7QUFDb0M7QUFHakcsSUFBTUksYUFBYSxHQUFHLG9CQUFvQjtBQUMxQyxJQUFNQyxTQUFTLEdBQUdILHNCQUFVLENBQUNJLE1BQU0sQ0FBQztFQUNoQ0MsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQVdDLE9BQU8sRUFBRTtJQUMxQkEsT0FBTyxDQUFDQyxJQUFJLEdBQUcsb0JBQW9CO0lBQ25DLElBQUksQ0FBQ0MsWUFBWSxHQUFHVCxpQkFBTSxDQUFDUyxZQUFZO0lBQ3ZDUixzQkFBVSxDQUFDUyxTQUFTLENBQUNKLFVBQVUsQ0FBQ0ssSUFBSSxDQUFDLElBQUksRUFBRUosT0FBTyxDQUFDO0lBQ25ELElBQUksQ0FBQ0ssTUFBTSxHQUFHYix5Q0FBa0IsQ0FBQyxDQUFDO0lBQ2xDLElBQUksQ0FBQ2Usa0JBQWtCLEdBQUcsQ0FBQztNQUFDLE1BQU0sRUFBRTtJQUFlLENBQUMsRUFBQztNQUFDLE1BQU0sRUFBRTtJQUFhLENBQUMsQ0FBQztJQUM3RSxJQUFJQyxhQUFhLEdBQUdoQixrQ0FBVyxDQUFDLFlBQVc7TUFDdkMsT0FBT2tCLElBQUksQ0FBQ0MsU0FBUyxDQUFDbkIsOEJBQU8sQ0FBQyxJQUFJLENBQUNhLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1JHLGFBQWEsQ0FBQ0ssU0FBUyxDQUFDLFlBQVc7TUFDL0IsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQztJQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBRVIsSUFBSSxDQUFDQyxlQUFlLENBQUNuQixhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFekMsSUFBSSxJQUFJLENBQUNvQix1QkFBdUIsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO01BQzFDLElBQUksQ0FBQ0EsdUJB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RTVDLGtDQUF5QkE7QUFDdkMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9wcm92aXNpb25hbC1maWx0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBCYXNlRmlsdGVyIGZyb20gJ3ZpZXdzL2NvbXBvbmVudHMvc2VhcmNoL2Jhc2UtZmlsdGVyJztcbmltcG9ydCBwcm92aXNpb25hbEZpbHRlclRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9wcm92aXNpb25hbC1maWx0ZXIuaHRtJztcblxuXG5jb25zdCBjb21wb25lbnROYW1lID0gJ3Byb3Zpc2lvbmFsLWZpbHRlcic7XG5jb25zdCB2aWV3TW9kZWwgPSBCYXNlRmlsdGVyLmV4dGVuZCh7XG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zLm5hbWUgPSAnUHJvdmlzaW9uYWwgRmlsdGVyJztcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbnMgPSBhcmNoZXMudHJhbnNsYXRpb25zO1xuICAgICAgICBCYXNlRmlsdGVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZmlsdGVyID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgICAgIHRoaXMucHJvdmlzaW9uYWxPcHRpb25zID0gW3snbmFtZSc6ICdBdXRob3JpdGF0aXZlJ30seyduYW1lJzogJ1Byb3Zpc2lvbmFsJ31dO1xuICAgICAgICB2YXIgZmlsdGVyVXBkYXRlZCA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGtvLnRvSlModGhpcy5maWx0ZXIoKSkpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgZmlsdGVyVXBkYXRlZC5zdWJzY3JpYmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVF1ZXJ5KCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoRmlsdGVyVm1zW2NvbXBvbmVudE5hbWVdKHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFZpZXdGaWx0ZXJzTG9hZGVkKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFZpZXdGaWx0ZXJzTG9hZGVkLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVTdGF0ZSgpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVF1ZXJ5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXJ5T2JqID0gdGhpcy5xdWVyeSgpO1xuICAgICAgICBpZih0aGlzLmZpbHRlcigpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgcXVlcnlPYmpbY29tcG9uZW50TmFtZV0gPSBrby50b0pTT04odGhpcy5maWx0ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHF1ZXJ5T2JqW2NvbXBvbmVudE5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkocXVlcnlPYmopO1xuICAgIH0sXG4gICAgXG4gICAgcmVzdG9yZVN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSgpO1xuICAgICAgICBpZiAoY29tcG9uZW50TmFtZSBpbiBxdWVyeSkge1xuICAgICAgICAgICAgdmFyIHByb3Zpc2lvbmFsUXVlcnkgPSBKU09OLnBhcnNlKHF1ZXJ5W2NvbXBvbmVudE5hbWVdKTtcbiAgICAgICAgICAgIGlmIChwcm92aXNpb25hbFF1ZXJ5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwcm92aXNpb25hbFF1ZXJ5LmZvckVhY2goZnVuY3Rpb24odHlwZSl7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUuaW52ZXJ0ZWQgPSBrby5vYnNlcnZhYmxlKCEhdHlwZS5pbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyQnlUeXBlKCd0ZXJtLWZpbHRlci10eXBlJykuYWRkVGFnKHR5cGUucHJvdmlzaW9uYWx0eXBlLCB0aGlzLm5hbWUsIHR5cGUuaW52ZXJ0ZWQpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKHByb3Zpc2lvbmFsUXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNlbGVjdFByb3Zpc2lvbmFsOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyKCkuZm9yRWFjaChmdW5jdGlvbih2YWwpe1xuICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXJCeVR5cGUoJ3Rlcm0tZmlsdGVyLXR5cGUnKS5yZW1vdmVUYWcodmFsLnByb3Zpc2lvbmFsdHlwZSk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGlmKCEhaXRlbSl7XG4gICAgICAgICAgICB2YXIgaW52ZXJ0ZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyQnlUeXBlKCd0ZXJtLWZpbHRlci10eXBlJykuYWRkVGFnKGl0ZW0ubmFtZSwgdGhpcy5uYW1lLCBpbnZlcnRlZCk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcihbe3Byb3Zpc2lvbmFsdHlwZTogaXRlbS5uYW1lLCBpbnZlcnRlZDogaW52ZXJ0ZWR9XSk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyLnJlbW92ZUFsbCgpO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKGNvbXBvbmVudE5hbWUsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogcHJvdmlzaW9uYWxGaWx0ZXJUZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbImtvIiwiYXJjaGVzIiwiQmFzZUZpbHRlciIsInByb3Zpc2lvbmFsRmlsdGVyVGVtcGxhdGUiLCJjb21wb25lbnROYW1lIiwidmlld01vZGVsIiwiZXh0ZW5kIiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJuYW1lIiwidHJhbnNsYXRpb25zIiwicHJvdG90eXBlIiwiY2FsbCIsImZpbHRlciIsIm9ic2VydmFibGVBcnJheSIsInByb3Zpc2lvbmFsT3B0aW9ucyIsImZpbHRlclVwZGF0ZWQiLCJjb21wdXRlZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0b0pTIiwic3Vic2NyaWJlIiwidXBkYXRlUXVlcnkiLCJzZWFyY2hGaWx0ZXJWbXMiLCJzZWFyY2hWaWV3RmlsdGVyc0xvYWRlZCIsInJlc3RvcmVTdGF0ZSIsInF1ZXJ5T2JqIiwicXVlcnkiLCJsZW5ndGgiLCJ0b0pTT04iLCJwcm92aXNpb25hbFF1ZXJ5IiwicGFyc2UiLCJmb3JFYWNoIiwidHlwZSIsImludmVydGVkIiwib2JzZXJ2YWJsZSIsImdldEZpbHRlckJ5VHlwZSIsImFkZFRhZyIsInByb3Zpc2lvbmFsdHlwZSIsInNlbGVjdFByb3Zpc2lvbmFsIiwiaXRlbSIsInZhbCIsInJlbW92ZVRhZyIsImNsZWFyIiwicmVtb3ZlQWxsIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9