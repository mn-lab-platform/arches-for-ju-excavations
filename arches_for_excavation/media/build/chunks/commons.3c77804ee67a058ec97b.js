"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[60325],{

/***/ 60325:
/*!**************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/term-filter.js + 1 modules ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ term_filter)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/base-filter.js
var base_filter = __webpack_require__(76713);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/search/term-filter.htm
const term_filter_namespaceObject = "templates/views/components/search/term-filter.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/term-search.js
var term_search = __webpack_require__(89870);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/term-filter.js







var componentName = 'term-filter';
var viewModel = base_filter["default"].extend({
  initialize: function initialize(options) {
    options.name = 'Term Filter';
    base_filter["default"].prototype.initialize.call(this, options);
    this.filter.terms = knockout_latest_default().observableArray();
    this.filter.tags = knockout_latest_default().observableArray();
    this.language = knockout_latest_default().observable("*");
    this.languages = knockout_latest_default().observableArray();
    var languages = arches["default"].languages.slice();
    languages.unshift({
      "code": "*",
      "name": "All"
    });
    this.languages(languages);
    var updatedTerms = knockout_latest_default().computed(function () {
      return knockout_latest_default().toJS(this.filter.terms);
    }, this);
    updatedTerms.subscribe(function () {
      this.updateQuery();
    }, this);
    this.language.subscribe(function () {
      this.updateQuery();
    }, this);
    this.filter.tags.subscribe(function (tags) {
      underscore_min_default().each(tags, function (tag) {
        if (tag.status === 'deleted') {
          var found = underscore_min_default().find(this.filter.tags, function (currentTag) {
            return tag.value.type === currentTag.type;
          }, this);
          if (!found) {
            underscore_min_default().each(this.searchFilterVms, function (filter) {
              if (!!filter() && filter().name === tag.value.type) {
                filter().clear();
              }
            }, this);
          }
        }
      }, this);
    }, this, "arrayChange");
    this.searchFilterVms[componentName](this);
    this.restoreState();
  },
  updateQuery: function updateQuery() {
    var terms = underscore_min_default().filter(this.filter.terms(), function (term) {
      return arches["default"].termSearchTypes.map(function (searchType) {
        return searchType.type;
      }).concat(['string']).indexOf(term.type) > -1;
    }, this);
    var queryObj = this.query();
    if (terms.length > 0) {
      queryObj[componentName] = knockout_latest_default().toJSON(terms);
      queryObj['language'] = this.language();
    } else {
      delete queryObj[componentName];
    }
    this.query(queryObj);
  },
  restoreState: function restoreState() {
    var query = this.query();
    if (componentName in query) {
      var termQuery = JSON.parse(query[componentName]);
      if (termQuery.length > 0) {
        termQuery.forEach(function (term) {
          term.inverted = knockout_latest_default().observable(term.inverted);
        });
        this.filter.terms(termQuery);
      }
    }
  },
  addTag: function addTag(term, type, inverted) {
    if (!this.hasTag(term)) {
      this.filter.tags.unshift({
        inverted: inverted,
        type: type,
        context: '',
        context_label: '',
        id: term,
        text: term,
        value: term
      });
    }
  },
  removeTag: function removeTag(term) {
    this.filter.tags.remove(function (term_item) {
      return term_item.id == term && term_item.text == term && term_item.value == term;
    });
  },
  hasTag: function hasTag(tag_text) {
    var has_tag = false;
    this.filter.tags().forEach(function (term_item) {
      if (term_item.text == tag_text) {
        has_tag = true;
      }
    });
    return has_tag;
  },
  clear: function clear() {
    this.filter.terms.removeAll();
    this.filter.tags.removeAll();
  }
});
/* harmony default export */ const term_filter = (knockout_latest_default().components.register(componentName, {
  viewModel: viewModel,
  template: term_filter_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuM2M3NzgwNGVlNjdhMDU4ZWM5N2IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNlO0FBQ2Q7QUFDa0M7QUFDakM7QUFDdUQ7QUFDckQ7QUFHOUIsSUFBSU0sYUFBYSxHQUFHLGFBQWE7QUFDakMsSUFBTUMsU0FBUyxHQUFHSixzQkFBVSxDQUFDSyxNQUFNLENBQUM7RUFDaENDLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFXQyxPQUFPLEVBQUU7SUFDMUJBLE9BQU8sQ0FBQ0MsSUFBSSxHQUFHLGFBQWE7SUFDNUJSLHNCQUFVLENBQUNTLFNBQVMsQ0FBQ0gsVUFBVSxDQUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFSCxPQUFPLENBQUM7SUFFbkQsSUFBSSxDQUFDSSxNQUFNLENBQUNDLEtBQUssR0FBR2YseUNBQWtCLENBQUMsQ0FBQztJQUN4QyxJQUFJLENBQUNjLE1BQU0sQ0FBQ0csSUFBSSxHQUFHakIseUNBQWtCLENBQUMsQ0FBQztJQUV2QyxJQUFJLENBQUNrQixRQUFRLEdBQUdsQixvQ0FBYSxDQUFDLEdBQUcsQ0FBQztJQUNsQyxJQUFJLENBQUNvQixTQUFTLEdBQUdwQix5Q0FBa0IsQ0FBQyxDQUFDO0lBQ3JDLElBQU1vQixTQUFTLEdBQUdoQixpQkFBTSxDQUFDZ0IsU0FBUyxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUMxQ0QsU0FBUyxDQUFDRSxPQUFPLENBQUM7TUFBQyxNQUFNLEVBQUUsR0FBRztNQUFFLE1BQU0sRUFBRTtJQUFLLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUNGLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDO0lBRXpCLElBQUlHLFlBQVksR0FBR3ZCLGtDQUFXLENBQUMsWUFBVztNQUN0QyxPQUFPQSw4QkFBTyxDQUFDLElBQUksQ0FBQ2MsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFDckMsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUVSUSxZQUFZLENBQUNHLFNB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LElBQUksQ0FBQ2xELE1BQU0sQ0FBQ0csSUFBSSxDQUFDLENBQUMsQ0FBQ21DLE9BQU8sQ0FBQyxVQUFTVSxTQUFTLEVBQUM7TUFDMUMsSUFBSUEsU0FBUyxDQUFDSCxJQUFJLElBQUlJLFFBQVEsRUFBRTtRQUM1QkMsT0FBTyxHQUFHLElBQUk7TUFDbEI7SUFDSixDQUFDLENBQUM7SUFDRixPQUFPQSxPQUFPO0VBQ2xCLENBQUM7RUFFRDNCLEtBQUssRUFBRSxTQUFQQSxLQUFLQSxDQUFBLEVBQWE7SUFDZCxJQUFJLENBQUN2QixNQUFNLENBQUNDLEtBQUssQ0FBQ2tELFNBQVMsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQ25ELE1BQU0sQ0FBQ0csSUFBSSxDQUFDZ0QsU0FBUyxDQUFDLENBQUM7RUFDaEM7QUFDSixDQUFDLENBQUM7QUFFRixrREFBZWpFLG9DQUFhLENBQUNtRSxRQUFRLENBQUM3RCxhQUFhLEVBQUU7RUFDakRDLFNBQVMsRUFBRUEsU0FBUztFQUNwQjZELFFBQVEsRUFBRS9ELDJCQUFrQkE7QUFDaEMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC90ZXJtLWZpbHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGtvTWFwcGluZyBmcm9tICdrbm9ja291dC1tYXBwaW5nJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IEJhc2VGaWx0ZXIgZnJvbSAndmlld3MvY29tcG9uZW50cy9zZWFyY2gvYmFzZS1maWx0ZXInO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IHRlcm1GaWx0ZXJUZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy9zZWFyY2gvdGVybS1maWx0ZXIuaHRtJztcbmltcG9ydCAnYmluZGluZ3MvdGVybS1zZWFyY2gnO1xuXG5cbnZhciBjb21wb25lbnROYW1lID0gJ3Rlcm0tZmlsdGVyJztcbmNvbnN0IHZpZXdNb2RlbCA9IEJhc2VGaWx0ZXIuZXh0ZW5kKHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9ICdUZXJtIEZpbHRlcic7XG4gICAgICAgIEJhc2VGaWx0ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmZpbHRlci50ZXJtcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgICAgICB0aGlzLmZpbHRlci50YWdzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGtvLm9ic2VydmFibGUoXCIqXCIpO1xuICAgICAgICB0aGlzLmxhbmd1YWdlcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZXMgPSBhcmNoZXMubGFuZ3VhZ2VzLnNsaWNlKCk7XG4gICAgICAgIGxhbmd1YWdlcy51bnNoaWZ0KHtcImNvZGVcIjogXCIqXCIsIFwibmFtZVwiOiBcIkFsbFwifSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2VzKGxhbmd1YWdlcyk7XG5cbiAgICAgICAgdmFyIHVwZGF0ZWRUZXJtcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGtvLnRvSlModGhpcy5maWx0ZXIudGVybXMpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB1cGRhdGVkVGVybXMuc3Vic2NyaWJlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVRdWVyeSgpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLmxhbmd1YWdlLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUXVlcnkoKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIudGFncy5zdWJzY3JpYmUoZnVuY3Rpb24odGFncyl7XG4gICAgICAgICAgICBfLmVhY2godGFncywgZnVuY3Rpb24odGFnKXtcbiAgICAgICAgICAgICAgICBpZih0YWcuc3RhdHVzID09PSAnZGVsZXRlZCcpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBfLmZpbmQodGhpcy5maWx0ZXIudGFncywgZnVuY3Rpb24oY3VycmVudFRhZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFnLnZhbHVlLnR5cGUgPT09IGN1cnJlbnRUYWcudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFmb3VuZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5zZWFyY2hGaWx0ZXJWbXMsIGZ1bmN0aW9uKGZpbHRlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoISFmaWx0ZXIoKSAmJiBmaWx0ZXIoKS5uYW1lID09PSB0YWcudmFsdWUudHlwZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigpLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfSwgdGhpcywgXCJhcnJheUNoYW5nZVwiKTtcblxuICAgICAgICB0aGlzLnNlYXJjaEZpbHRlclZtc1tjb21wb25lbnROYW1lXSh0aGlzKTtcbiAgICAgICAgdGhpcy5yZXN0b3JlU3RhdGUoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUXVlcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGVybXMgPSBfLmZpbHRlcih0aGlzLmZpbHRlci50ZXJtcygpLCBmdW5jdGlvbih0ZXJtKXtcbiAgICAgICAgICAgIHJldHVybiBhcmNoZXMudGVybVNlYXJjaFR5cGVzLm1hcCgoc2VhcmNoVHlwZSkgPT4gc2VhcmNoVHlwZS50eXBlKS5jb25jYXQoWydzdHJpbmcnXSkuaW5kZXhPZih0ZXJtLnR5cGUpID4gLTE7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHZhciBxdWVyeU9iaiA9IHRoaXMucXVlcnkoKTtcbiAgICAgICAgaWYgKHRlcm1zLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgcXVlcnlPYmpbY29tcG9uZW50TmFtZV0gPSBrby50b0pTT04odGVybXMpO1xuICAgICAgICAgICAgcXVlcnlPYmpbJ2xhbmd1YWdlJ10gPSB0aGlzLmxhbmd1YWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgcXVlcnlPYmpbY29tcG9uZW50TmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5xdWVyeShxdWVyeU9iaik7XG4gICAgfSxcblxuICAgIHJlc3RvcmVTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcnkoKTtcbiAgICAgICAgaWYgKGNvbXBvbmVudE5hbWUgaW4gcXVlcnkpIHtcbiAgICAgICAgICAgIHZhciB0ZXJtUXVlcnkgPSBKU09OLnBhcnNlKHF1ZXJ5W2NvbXBvbmVudE5hbWVdKTtcbiAgICAgICAgICAgIGlmICh0ZXJtUXVlcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRlcm1RdWVyeS5mb3JFYWNoKGZ1bmN0aW9uKHRlcm0pe1xuICAgICAgICAgICAgICAgICAgICB0ZXJtLmludmVydGVkID0ga28ub2JzZXJ2YWJsZSh0ZXJtLmludmVydGVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlci50ZXJtcyh0ZXJtUXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFkZFRhZzogZnVuY3Rpb24odGVybSwgdHlwZSwgaW52ZXJ0ZWQpe1xuICAgICAgICBpZighdGhpcy5oYXNUYWcodGVybSkpe1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIudGFncy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICBpbnZlcnRlZDogaW52ZXJ0ZWQsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiAnJyxcbiAgICAgICAgICAgICAgICBjb250ZXh0X2xhYmVsOiAnJyxcbiAgICAgICAgICAgICAgICBpZDogdGVybSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXJtLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZXJtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVUYWc6IGZ1bmN0aW9uKHRlcm0pe1xuICAgICAgICB0aGlzLmZpbHRlci50YWdzLnJlbW92ZShmdW5jdGlvbih0ZXJtX2l0ZW0pe1xuICAgICAgICAgICAgcmV0dXJuIHRlcm1faXRlbS5pZCA9PSB0ZXJtICYmIHRlcm1faXRlbS50ZXh0ID09IHRlcm0gJiYgdGVybV9pdGVtLnZhbHVlID09IHRlcm07XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBoYXNUYWc6IGZ1bmN0aW9uKHRhZ190ZXh0KXtcbiAgICAgICAgdmFyIGhhc190YWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5maWx0ZXIudGFncygpLmZvckVhY2goZnVuY3Rpb24odGVybV9pdGVtKXtcbiAgICAgICAgICAgIGlmICh0ZXJtX2l0ZW0udGV4dCA9PSB0YWdfdGV4dCkge1xuICAgICAgICAgICAgICAgIGhhc190YWcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhhc190YWc7XG4gICAgfSxcblxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIudGVybXMucmVtb3ZlQWxsKCk7XG4gICAgICAgIHRoaXMuZmlsdGVyLnRhZ3MucmVtb3ZlQWxsKCk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoY29tcG9uZW50TmFtZSwge1xuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiB0ZXJtRmlsdGVyVGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsImtvTWFwcGluZyIsIl8iLCJCYXNlRmlsdGVyIiwiYXJjaGVzIiwidGVybUZpbHRlclRlbXBsYXRlIiwiY29tcG9uZW50TmFtZSIsInZpZXdNb2RlbCIsImV4dGVuZCIsImluaXRpYWxpemUiLCJvcHRpb25zIiwibmFtZSIsInByb3RvdHlwZSIsImNhbGwiLCJmaWx0ZXIiLCJ0ZXJtcyIsIm9ic2VydmFibGVBcnJheSIsInRhZ3MiLCJsYW5ndWFnZSIsIm9ic2VydmFibGUiLCJsYW5ndWFnZXMiLCJzbGljZSIsInVuc2hpZnQiLCJ1cGRhdGVkVGVybXMiLCJjb21wdXRlZCIsInRvSlMiLCJzdWJzY3JpYmUiLCJ1cGRhdGVRdWVyeSIsImVhY2giLCJ0YWciLCJzdGF0dXMiLCJmb3VuZCIsImZpbmQiLCJjdXJyZW50VGFnIiwidmFsdWUiLCJ0eXBlIiwic2VhcmNoRmlsdGVyVm1zIiwiY2xlYXIiLCJyZXN0b3JlU3RhdGUiLCJ0ZXJtIiwidGVybVNlYXJjaFR5cGVzIiwibWFwIiwic2VhcmNoVHlwZSIsImNvbmNhdCIsImluZGV4T2YiLCJxdWVyeU9iaiIsInF1ZXJ5IiwibGVuZ3RoIiwidG9KU09OIiwidGVybVF1ZXJ5IiwiSlNPTiIsInBhcnNlIiwiZm9yRWFjaCIsImludmVydGVkIiwiYWRkVGFnIiwiaGFzVGFnIiwiY29udGV4dCIsImNvbnRleHRfbGFiZWwiLCJpZCIsInRleHQiLCJyZW1vdmVUYWciLCJyZW1vdmUiLCJ0ZXJtX2l0ZW0iLCJ0YWdfdGV4dCIsImhhc190YWciLCJyZW1vdmVBbGwiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ0ZW1wbGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9