"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[6813],{

/***/ 6813:
/*!***********************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/resource-type-filter.js + 1 modules ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ resource_type_filter)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/base-filter.js
var base_filter = __webpack_require__(76713);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/search/resource-type-filter.htm
const resource_type_filter_namespaceObject = "templates/views/components/search/resource-type-filter.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/resource-type-filter.js
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }




var componentName = 'resource-type-filter';
var viewModel = base_filter["default"].extend({
  initialize: function () {
    var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(options) {
      var self, response, data, filterUpdated;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            options.name = 'Resource Type Filter';
            base_filter["default"].prototype.initialize.call(this, options);
            this.resourceModels = knockout_latest_default().observableArray();
            this.filter = knockout_latest_default().observableArray();
            self = this;
            _context.n = 1;
            return fetch(arches["default"].urls.api_search_component_data + componentName);
          case 1:
            response = _context.v;
            if (!response.ok) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return response.json();
          case 2:
            data = _context.v;
            data.resources.forEach(function (res) {
              if (res.is_active === true && !res.source_identifier_id) {
                self.resourceModels.push(res);
              }
            });
            self.resourceModels.sort(function (a, b) {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            }); // sort resource model list alphabetically
            _context.n = 4;
            break;
          case 3:
            // eslint-disable-next-line no-console
            console.log('Failed to fetch resource instance list');
          case 4:
            filterUpdated = knockout_latest_default().computed(function () {
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
          case 5:
            return _context.a(2);
        }
      }, _callee, this);
    }));
    function initialize(_x) {
      return _initialize.apply(this, arguments);
    }
    return initialize;
  }(),
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
      var resourceTypeQuery = JSON.parse(query[componentName]);
      if (resourceTypeQuery.length > 0) {
        resourceTypeQuery.forEach(function (type) {
          type.inverted = knockout_latest_default().observable(!!type.inverted);
          this.getFilterByType('term-filter-type').addTag(type.name, this.name, type.inverted);
        }, this);
        this.filter(resourceTypeQuery);
      }
    }
  },
  clear: function clear() {
    this.filter.removeAll();
  },
  selectModelType: function selectModelType(item) {
    this.filter().forEach(function (item) {
      this.getFilterByType('term-filter-type').removeTag(item.name);
    }, this);
    if (!!item) {
      var inverted = knockout_latest_default().observable(false);
      this.getFilterByType('term-filter-type').addTag(item.name, this.name, inverted);
      this.filter([{
        graphid: item.graphid,
        name: item.name,
        inverted: inverted
      }]);
    } else {
      this.clear();
    }
  }
});
/* harmony default export */ const resource_type_filter = (knockout_latest_default().components.register(componentName, {
  viewModel: viewModel,
  template: resource_type_filter_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxrQkFBa0IsQ0FBQyxDQUFDQyxNQUFNLENBQUNJLElBQUksQ0FBQzVDLElBQUksRUFBRSxJQUFJLENBQUNBLElBQUksRUFBRXFDLFFBQVEsQ0FBQztNQUMvRSxJQUFJLENBQUNsQyxNQUFNLENBQUMsQ0FBQztRQUFDMkMsT0FBTyxFQUFDRixJQUFJLENBQUNFLE9BQU87UUFBRTlDLElBQUksRUFBRTRDLElBQUksQ0FBQzVDLElBQUk7UUFBRXFDLFFBQVEsRUFBRUE7TUFBUSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDLE1BQUk7TUFDRCxJQUFJLENBQUNJLEtBQUssQ0FBQyxDQUFDO0lBQ2hCO0VBQ0o7QUFDSixDQUFDLENBQUM7QUFFRiwyREFBZXpELG9DQUFhLENBQUNnRSxRQUFRLENBQUM1RCxhQUFhLEVBQUU7RUFDakRDLFNBQVMsRUFBRUEsU0FBUztFQUNwQjRELFFBQVEsRUFBRTlELG9DQUEwQkE7QUFDeEMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9yZXNvdXJjZS10eXBlLWZpbHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IEJhc2VGaWx0ZXIgZnJvbSAndmlld3MvY29tcG9uZW50cy9zZWFyY2gvYmFzZS1maWx0ZXInO1xuaW1wb3J0IHJlc291cmNlVHlwZUZpbHRlclRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9yZXNvdXJjZS10eXBlLWZpbHRlci5odG0nO1xuXG5cbnZhciBjb21wb25lbnROYW1lID0gJ3Jlc291cmNlLXR5cGUtZmlsdGVyJztcbmNvbnN0IHZpZXdNb2RlbCA9IEJhc2VGaWx0ZXIuZXh0ZW5kKHtcbiAgICBpbml0aWFsaXplOiBhc3luYyBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9ICdSZXNvdXJjZSBUeXBlIEZpbHRlcic7XG4gICAgICAgIEJhc2VGaWx0ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZXNvdXJjZU1vZGVscyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgICAgICB0aGlzLmZpbHRlciA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFyY2hlcy51cmxzLmFwaV9zZWFyY2hfY29tcG9uZW50X2RhdGEgKyBjb21wb25lbnROYW1lKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgZGF0YS5yZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5pc19hY3RpdmUgPT09IHRydWUgJiYgIXJlcy5zb3VyY2VfaWRlbnRpZmllcl9pZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc291cmNlTW9kZWxzLnB1c2gocmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VNb2RlbHMuc29ydChmdW5jdGlvbihhLGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5uYW1lLnRvTG93ZXJDYXNlKCkubG9jYWxlQ29tcGFyZShiLm5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICB9KTsgIC8vIHNvcnQgcmVzb3VyY2UgbW9kZWwgbGlzdCBhbHBoYWJldGljYWxseVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gZmV0Y2ggcmVzb3VyY2UgaW5zdGFuY2UgbGlzdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpbHRlclVwZGF0ZWQgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShrby50b0pTKHRoaXMuZmlsdGVyKCkpKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIGZpbHRlclVwZGF0ZWQuc3Vic2NyaWJlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVRdWVyeSgpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLnNlYXJjaEZpbHRlclZtc1tjb21wb25lbnROYW1lXSh0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hWaWV3RmlsdGVyc0xvYWRlZCgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hWaWV3RmlsdGVyc0xvYWRlZC5zdWJzY3JpYmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlU3RhdGUoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXN0b3JlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVRdWVyeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBxdWVyeU9iaiA9IHRoaXMucXVlcnkoKTtcbiAgICAgICAgaWYodGhpcy5maWx0ZXIoKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHF1ZXJ5T2JqW2NvbXBvbmVudE5hbWVdID0ga28udG9KU09OKHRoaXMuZmlsdGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBxdWVyeU9ialtjb21wb25lbnROYW1lXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXJ5KHF1ZXJ5T2JqKTtcbiAgICB9LFxuXG4gICAgcmVzdG9yZVN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSgpO1xuICAgICAgICBpZiAoY29tcG9uZW50TmFtZSBpbiBxdWVyeSkge1xuICAgICAgICAgICAgdmFyIHJlc291cmNlVHlwZVF1ZXJ5ID0gSlNPTi5wYXJzZShxdWVyeVtjb21wb25lbnROYW1lXSk7XG4gICAgICAgICAgICBpZiAocmVzb3VyY2VUeXBlUXVlcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlc291cmNlVHlwZVF1ZXJ5LmZvckVhY2goZnVuY3Rpb24odHlwZSl7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUuaW52ZXJ0ZWQgPSBrby5vYnNlcnZhYmxlKCEhdHlwZS5pbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyQnlUeXBlKCd0ZXJtLWZpbHRlci10eXBlJykuYWRkVGFnKHR5cGUubmFtZSwgdGhpcy5uYW1lLCB0eXBlLmludmVydGVkKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcihyZXNvdXJjZVR5cGVRdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmZpbHRlci5yZW1vdmVBbGwoKTtcbiAgICB9LFxuXG4gICAgc2VsZWN0TW9kZWxUeXBlOiBmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgdGhpcy5maWx0ZXIoKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXJCeVR5cGUoJ3Rlcm0tZmlsdGVyLXR5cGUnKS5yZW1vdmVUYWcoaXRlbS5uYW1lKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIGlmKCEhaXRlbSl7XG4gICAgICAgICAgICB2YXIgaW52ZXJ0ZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyQnlUeXBlKCd0ZXJtLWZpbHRlci10eXBlJykuYWRkVGFnKGl0ZW0ubmFtZSwgdGhpcy5uYW1lLCBpbnZlcnRlZCk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcihbe2dyYXBoaWQ6aXRlbS5ncmFwaGlkLCBuYW1lOiBpdGVtLm5hbWUsIGludmVydGVkOiBpbnZlcnRlZH1dKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3Rlcihjb21wb25lbnROYW1lLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IHJlc291cmNlVHlwZUZpbHRlclRlbXBsYXRlLFxufSk7XG4iXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJyZXR1cm4iLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJrbyIsImFyY2hlcyIsIkJhc2VGaWx0ZXIiLCJyZXNvdXJjZVR5cGVGaWx0ZXJUZW1wbGF0ZSIsImNvbXBvbmVudE5hbWUiLCJ2aWV3TW9kZWwiLCJleHRlbmQiLCJpbml0aWFsaXplIiwiX2luaXRpYWxpemUiLCJfY2FsbGVlIiwib3B0aW9ucyIsInNlbGYiLCJyZXNwb25zZSIsImRhdGEiLCJmaWx0ZXJVcGRhdGVkIiwiX2NvbnRleHQiLCJuYW1lIiwicmVzb3VyY2VNb2RlbHMiLCJvYnNlcnZhYmxlQXJyYXkiLCJmaWx0ZXIiLCJmZXRjaCIsInVybHMiLCJhcGlfc2VhcmNoX2NvbXBvbmVudF9kYXRhIiwib2siLCJqc29uIiwicmVzb3VyY2VzIiwiZm9yRWFjaCIsInJlcyIsImlzX2FjdGl2ZSIsInNvdXJjZV9pZGVudGlmaWVyX2lkIiwicHVzaCIsInNvcnQiLCJiIiwidG9Mb3dlckNhc2UiLCJsb2NhbGVDb21wYXJlIiwiY29uc29sZSIsImxvZyIsImNvbXB1dGVkIiwiSlNPTiIsInN0cmluZ2lmeSIsInRvSlMiLCJzdWJzY3JpYmUiLCJ1cGRhdGVRdWVyeSIsInNlYXJjaEZpbHRlclZtcyIsInNlYXJjaFZpZXdGaWx0ZXJzTG9hZGVkIiwicmVzdG9yZVN0YXRlIiwiX3giLCJxdWVyeU9iaiIsInF1ZXJ5IiwidG9KU09OIiwicmVzb3VyY2VUeXBlUXVlcnkiLCJwYXJzZSIsInR5cGUiLCJpbnZlcnRlZCIsIm9ic2VydmFibGUiLCJnZXRGaWx0ZXJCeVR5cGUiLCJhZGRUYWciLCJjbGVhciIsInJlbW92ZUFsbCIsInNlbGVjdE1vZGVsVHlwZSIsIml0ZW0iLCJyZW1vdmVUYWciLCJncmFwaGlkIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==