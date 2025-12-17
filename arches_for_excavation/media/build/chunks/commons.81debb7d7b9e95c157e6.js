"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[96187],{

/***/ 96187:
/*!********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/text.js + 1 modules ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ widgets_text)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/widget.js
var widget = __webpack_require__(77260);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/text.htm
const text_namespaceObject = "templates/views/components/widgets/text.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/chosen.js
var chosen = __webpack_require__(63777);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/text.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }








/**
* registers a text-widget component for use in forms
* @function external:"ko.components".text-widget
* @param {object} params
* @param {string} params.value - the value being managed
* @param {function} params.config - observable containing config object
* @param {string} params.config().label - label to use alongside the text input
* @param {string} params.config().placeholder - default text to show in the text input
* @param {string} params.config().uneditable - disables widget
*/

var viewModel = function viewModel(params) {
  params.configKeys = ['placeholder', 'width', 'maxLength', 'defaultValue', 'uneditable'];
  widget["default"].apply(this, [params]);
  var self = this;
  self.card = params.card;
  self.currentLanguage = knockout_latest_default().observable({
    code: arches["default"].activeLanguage
  });
  self.languages = knockout_latest_default().observableArray();
  self.currentText = knockout_latest_default().observable();
  self.currentDirection = knockout_latest_default().observable();
  self.showi18nOptions = knockout_latest_default().observable(false);
  self.currentDefaultText = knockout_latest_default().observable();
  self.currentDefaultDirection = knockout_latest_default().observable();
  self.currentDefaultLanguage = knockout_latest_default().observable({
    code: arches["default"].activeLanguage
  });
  self.currentPlaceholder = knockout_latest_default().observable();
  var initialCurrent = {};
  var initialDefault = {};
  initialDefault[arches["default"].activeLanguage] = {
    value: '',
    direction: 'ltr'
  };
  initialCurrent[arches["default"].activeLanguage] = {
    value: '',
    direction: 'ltr'
  };
  var currentDefaultValue = knockout_latest_default().unwrap(self.defaultValue) || initialDefault;
  var currentValue = knockout_mapping_min_default().toJS(self.value) || initialCurrent;
  if (self.form) {
    self.form.on('tile-reset', function (x) {
      if (knockout_latest_default().unwrap(self.value)) {
        var _currentValue$self$cu, _currentValue$self$cu2;
        currentValue = knockout_mapping_min_default().toJS(self.value);
        self.currentText((_currentValue$self$cu = currentValue[self.currentLanguage().code]) === null || _currentValue$self$cu === void 0 ? void 0 : _currentValue$self$cu.value);
        self.currentDirection((_currentValue$self$cu2 = currentValue[self.currentLanguage().code]) === null || _currentValue$self$cu2 === void 0 ? void 0 : _currentValue$self$cu2.direction);
      }
    });
  }
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _currentValue;
      var languages, currentLanguage, _currentValue2, _currentValue3, _currentDefaultValue$, _currentDefaultValue$2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            languages = arches["default"].languages;
            currentLanguage = languages === null || languages === void 0 ? void 0 : languages.find(function (element) {
              return element.code == arches["default"].activeLanguage;
            });
            self.languages(languages);
            self.currentLanguage(currentLanguage);
            self.currentDefaultLanguage(currentLanguage);
            if (currentLanguage !== null && currentLanguage !== void 0 && currentLanguage.code && (_currentValue = currentValue) !== null && _currentValue !== void 0 && _currentValue[currentLanguage.code]) {
              self.currentText((_currentValue2 = currentValue) === null || _currentValue2 === void 0 || (_currentValue2 = _currentValue2[currentLanguage.code]) === null || _currentValue2 === void 0 ? void 0 : _currentValue2.value);
              self.currentDirection((_currentValue3 = currentValue) === null || _currentValue3 === void 0 || (_currentValue3 = _currentValue3[currentLanguage.code]) === null || _currentValue3 === void 0 ? void 0 : _currentValue3.direction);
            } else if (!(currentLanguage !== null && currentLanguage !== void 0 && currentLanguage.code)) {
              self.currentText('');
              self.currentDirection('ltr');
            } else if (currentValue) {
              self.currentText('');
              self.currentDirection('ltr');
              currentValue[currentLanguage.code] = {
                value: '',
                direction: 'ltr'
              };
            }
            if (currentLanguage !== null && currentLanguage !== void 0 && currentLanguage.code && currentDefaultValue !== null && currentDefaultValue !== void 0 && currentDefaultValue[currentLanguage.code]) {
              self.currentDefaultText(currentDefaultValue === null || currentDefaultValue === void 0 || (_currentDefaultValue$ = currentDefaultValue[currentLanguage.code]) === null || _currentDefaultValue$ === void 0 ? void 0 : _currentDefaultValue$.value);
              self.currentDefaultDirection(currentDefaultValue === null || currentDefaultValue === void 0 || (_currentDefaultValue$2 = currentDefaultValue[currentLanguage.code]) === null || _currentDefaultValue$2 === void 0 ? void 0 : _currentDefaultValue$2.direction);
            } else if (!(currentLanguage !== null && currentLanguage !== void 0 && currentLanguage.code)) {
              self.currentDefaultText('');
              self.currentDefaultDirection('ltr');
            } else if (currentDefaultValue) {
              self.currentDefaultText('');
              self.currentDefaultDirection('ltr');
              currentDefaultValue[currentLanguage.code] = {
                value: '',
                direction: 'ltr'
              };
            }
            if (knockout_latest_default().unwrap(self.placeholder)) {
              if (typeof knockout_latest_default().unwrap(self.placeholder) === 'string') {
                self.placeholder(_defineProperty({}, self.currentLanguage().code, knockout_latest_default().unwrap(self.placeholder)));
              }
              self.currentPlaceholder(self.placeholder()[self.currentLanguage().code]);
            }
          case 1:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function init() {
      return _ref.apply(this, arguments);
    };
  }();
  init();
  self.disable = knockout_latest_default().computed(function () {
    return knockout_latest_default().unwrap(self.disabled) || knockout_latest_default().unwrap(self.uneditable);
  }, self);
  self.currentDefaultText.subscribe(function (newValue) {
    var currentLanguage = self.currentDefaultLanguage();
    if (!currentLanguage) {
      return;
    }
    currentDefaultValue[currentLanguage.code].value = newValue;
    self.defaultValue(currentDefaultValue);
    self.card._card.valueHasMutated();
  });
  self.currentDefaultDirection.subscribe(function (newValue) {
    var currentLanguage = self.currentDefaultLanguage();
    if (!currentLanguage) {
      return;
    }
    if (!(currentDefaultValue !== null && currentDefaultValue !== void 0 && currentDefaultValue[currentLanguage.code])) {
      currentDefaultValue[currentLanguage.code] = {};
    }
    currentDefaultValue[currentLanguage.code].direction = newValue;
    self.defaultValue(currentDefaultValue);
    self.card._card.valueHasMutated();
  });
  self.currentDefaultLanguage.subscribe(function (newValue) {
    var _self$defaultValue, _self$defaultValue2;
    if (!self.currentDefaultLanguage()) {
      return;
    }
    var currentLanguage = self.currentDefaultLanguage();
    if (!(currentDefaultValue !== null && currentDefaultValue !== void 0 && currentDefaultValue[currentLanguage.code])) {
      currentDefaultValue[currentLanguage.code] = {
        value: '',
        direction: currentLanguage === null || currentLanguage === void 0 ? void 0 : currentLanguage.default_direction
      };
      self.defaultValue(currentDefaultValue);
      self.card._card.valueHasMutated();
    }
    self.currentDefaultText((_self$defaultValue = self.defaultValue()) === null || _self$defaultValue === void 0 || (_self$defaultValue = _self$defaultValue[currentLanguage.code]) === null || _self$defaultValue === void 0 ? void 0 : _self$defaultValue.value);
    self.currentDefaultDirection((_self$defaultValue2 = self.defaultValue()) === null || _self$defaultValue2 === void 0 || (_self$defaultValue2 = _self$defaultValue2[currentLanguage.code]) === null || _self$defaultValue2 === void 0 ? void 0 : _self$defaultValue2.direction);
  });
  if (knockout_latest_default().isObservable(self.value)) {
    self.value.subscribe(function (newValue) {
      var currentLanguage = self.currentLanguage();
      if (!currentLanguage) {
        return;
      }
      if (JSON.stringify(currentValue) != JSON.stringify(knockout_latest_default().toJS(knockout_latest_default().unwrap(self.value)))) {
        var _newValue$currentLang;
        self.currentText(newValue === null || newValue === void 0 || (_newValue$currentLang = newValue[currentLanguage.code]) === null || _newValue$currentLang === void 0 ? void 0 : _newValue$currentLang.value);
      }
    });
  }
  self.currentText.subscribe(function (newValue) {
    var _currentValue4, _newValue$currentLang2;
    var currentLanguage = self.currentLanguage();
    if (!currentLanguage) {
      return;
    }
    if (!((_currentValue4 = currentValue) !== null && _currentValue4 !== void 0 && _currentValue4[currentLanguage.code])) {
      currentValue[currentLanguage.code] = {};
    }
    currentValue[currentLanguage.code].value = newValue !== null && newValue !== void 0 && newValue[currentLanguage.code] ? (_newValue$currentLang2 = newValue[currentLanguage.code]) === null || _newValue$currentLang2 === void 0 ? void 0 : _newValue$currentLang2.value : newValue;
    if (knockout_latest_default().isObservable(self.value)) {
      self.value(currentValue);
    } else {
      self.value[currentLanguage.code].value(newValue);
    }
  });
  self.currentDirection.subscribe(function (newValue) {
    var _currentValue5;
    var currentLanguage = self.currentLanguage();
    if (!currentLanguage) {
      return;
    }
    if (!((_currentValue5 = currentValue) !== null && _currentValue5 !== void 0 && _currentValue5[currentLanguage.code])) {
      currentValue[currentLanguage.code] = {};
    }
    currentValue[currentLanguage.code].direction = newValue;
    if (knockout_latest_default().isObservable(self.value)) {
      self.value(currentValue);
    } else {
      self.value[currentLanguage.code].direction(newValue);
    }
  });
  self.currentLanguage.subscribe(function () {
    var _koMapping$toJS$curre, _koMapping$toJS$curre2;
    if (!self.currentLanguage()) {
      return;
    }
    var currentLanguage = self.currentLanguage();
    self.currentText((_koMapping$toJS$curre = knockout_mapping_min_default().toJS(self.value)[currentLanguage.code]) === null || _koMapping$toJS$curre === void 0 ? void 0 : _koMapping$toJS$curre.value);
    self.currentDirection((_koMapping$toJS$curre2 = knockout_mapping_min_default().toJS(self.value)[currentLanguage.code]) === null || _koMapping$toJS$curre2 === void 0 ? void 0 : _koMapping$toJS$curre2.direction);
    self.currentPlaceholder(knockout_mapping_min_default().toJS(self.placeholder)[currentLanguage.code]);
  });
  self.currentPlaceholder.subscribe(function (newValue) {
    if (!self.currentLanguage()) {
      return;
    }
    var currentLanguage = self.currentLanguage();
    if (self.card && knockout_latest_default().isObservable(self.placeholder)) {
      var patchedPlaceholder = self.placeholder() || {};
      patchedPlaceholder[currentLanguage.code] = newValue;
      self.placeholder(patchedPlaceholder);
      self.card._card.valueHasMutated();
    }
  });
};
/* harmony default export */ const widgets_text = (knockout_latest_default().components.register('text-widget', {
  viewModel: viewModel,
  template: text_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxlQUFlLEdBQUdGLElBQUksQ0FBQ0UsZUFBZSxDQUFDLENBQUM7SUFFOUMsSUFBSUYsSUFBSSxDQUFDQyxJQUFJLElBQUlWLHNDQUFlLENBQUNTLElBQUksQ0FBQ3VDLFdBQVcsQ0FBQyxFQUFFO01BQ2hELElBQU1xQixrQkFBa0IsR0FBRzVELElBQUksQ0FBQ3VDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO01BQ25EcUIsa0JBQWtCLENBQUMxRCxlQUFlLENBQUNFLElBQUksQ0FBQyxHQUFHeUMsUUFBUTtNQUNuRDdDLElBQUksQ0FBQ3VDLFdBQVcsQ0FBQ3FCLGtCQUFrQixDQUFDO01BQ3BDNUQsSUFBSSxDQUFDQyxJQUFJLENBQUM2QyxLQUFLLENBQUNDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JDO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELG1EQUFleEQsb0NBQWEsQ0FBQ3VFLFFBQVEsQ0FBQyxhQUFhLEVBQUU7RUFDakRqRSxTQUFTLEVBQUVBLFNBQVM7RUFDcEJrRSxRQUFRLEVBQUVuRSxvQkFBa0JBO0FBQ2hDLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL3RleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBXaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy93aWRnZXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IHRleHRXaWRnZXRUZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL3RleHQuaHRtJztcbmltcG9ydCAnYmluZGluZ3MvY2hvc2VuJztcblxuXG4vKipcbiogcmVnaXN0ZXJzIGEgdGV4dC13aWRnZXQgY29tcG9uZW50IGZvciB1c2UgaW4gZm9ybXNcbiogQGZ1bmN0aW9uIGV4dGVybmFsOlwia28uY29tcG9uZW50c1wiLnRleHQtd2lkZ2V0XG4qIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy52YWx1ZSAtIHRoZSB2YWx1ZSBiZWluZyBtYW5hZ2VkXG4qIEBwYXJhbSB7ZnVuY3Rpb259IHBhcmFtcy5jb25maWcgLSBvYnNlcnZhYmxlIGNvbnRhaW5pbmcgY29uZmlnIG9iamVjdFxuKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZygpLmxhYmVsIC0gbGFiZWwgdG8gdXNlIGFsb25nc2lkZSB0aGUgdGV4dCBpbnB1dFxuKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZygpLnBsYWNlaG9sZGVyIC0gZGVmYXVsdCB0ZXh0IHRvIHNob3cgaW4gdGhlIHRleHQgaW5wdXRcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcoKS51bmVkaXRhYmxlIC0gZGlzYWJsZXMgd2lkZ2V0XG4qL1xuXG5jb25zdCB2aWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBwYXJhbXMuY29uZmlnS2V5cyA9IFsncGxhY2Vob2xkZXInLCAnd2lkdGgnLCAnbWF4TGVuZ3RoJywgJ2RlZmF1bHRWYWx1ZScsICd1bmVkaXRhYmxlJ107XG5cbiAgICBXaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgc2VsZi5jYXJkID0gcGFyYW1zLmNhcmQ7XG4gICAgc2VsZi5jdXJyZW50TGFuZ3VhZ2UgPSBrby5vYnNlcnZhYmxlKHtjb2RlOiBhcmNoZXMuYWN0aXZlTGFuZ3VhZ2V9KTtcbiAgICBzZWxmLmxhbmd1YWdlcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIHNlbGYuY3VycmVudFRleHQgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgc2VsZi5jdXJyZW50RGlyZWN0aW9uID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHNlbGYuc2hvd2kxOG5PcHRpb25zID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG5cbiAgICBzZWxmLmN1cnJlbnREZWZhdWx0VGV4dCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICBzZWxmLmN1cnJlbnREZWZhdWx0RGlyZWN0aW9uID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHNlbGYuY3VycmVudERlZmF1bHRMYW5ndWFnZSA9IGtvLm9ic2VydmFibGUoe2NvZGU6IGFyY2hlcy5hY3RpdmVMYW5ndWFnZX0pO1xuICAgIHNlbGYuY3VycmVudFBsYWNlaG9sZGVyID0ga28ub2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3QgaW5pdGlhbEN1cnJlbnQgPSB7fTtcbiAgICBjb25zdCBpbml0aWFsRGVmYXVsdCA9IHt9O1xuICAgIGluaXRpYWxEZWZhdWx0W2FyY2hlcy5hY3RpdmVMYW5ndWFnZV0gPSB7dmFsdWU6ICcnLCBkaXJlY3Rpb246ICdsdHInfTtcbiAgICBpbml0aWFsQ3VycmVudFthcmNoZXMuYWN0aXZlTGFuZ3VhZ2VdID0ge3ZhbHVlOiAnJywgZGlyZWN0aW9uOiAnbHRyJ307XG4gICAgbGV0IGN1cnJlbnREZWZhdWx0VmFsdWUgPSBrby51bndyYXAoc2VsZi5kZWZhdWx0VmFsdWUpIHx8IGluaXRpYWxEZWZhdWx0O1xuICAgIGxldCBjdXJyZW50VmFsdWUgPSBrb01hcHBpbmcudG9KUyhzZWxmLnZhbHVlKSB8fCBpbml0aWFsQ3VycmVudDtcblxuICAgIGlmKHNlbGYuZm9ybSl7XG4gICAgICAgIHNlbGYuZm9ybS5vbigndGlsZS1yZXNldCcsICh4KSA9PiB7XG4gICAgICAgICAgICBpZiAoa28udW53cmFwKHNlbGYudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0ga29NYXBwaW5nLnRvSlMoc2VsZi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50VGV4dChjdXJyZW50VmFsdWVbc2VsZi5jdXJyZW50TGFuZ3VhZ2UoKS5jb2RlXT8udmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudERpcmVjdGlvbihjdXJyZW50VmFsdWVbc2VsZi5jdXJyZW50TGFuZ3VhZ2UoKS5jb2RlXT8uZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdCA9IGFzeW5jKCkgPT4ge1xuICAgICAgICBjb25zdCBsYW5ndWFnZXMgPSBhcmNoZXMubGFuZ3VhZ2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50TGFuZ3VhZ2UgPSBsYW5ndWFnZXM/LmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LmNvZGUgPT0gYXJjaGVzLmFjdGl2ZUxhbmd1YWdlKTtcbiAgICAgICAgc2VsZi5sYW5ndWFnZXMobGFuZ3VhZ2VzKTtcbiAgICAgICAgc2VsZi5jdXJyZW50TGFuZ3VhZ2UoY3VycmVudExhbmd1YWdlKTtcbiAgICAgICAgc2VsZi5jdXJyZW50RGVmYXVsdExhbmd1YWdlKGN1cnJlbnRMYW5ndWFnZSk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRMYW5ndWFnZT8uY29kZSAmJiBjdXJyZW50VmFsdWU/LltjdXJyZW50TGFuZ3VhZ2UuY29kZV0pe1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50VGV4dChjdXJyZW50VmFsdWU/LltjdXJyZW50TGFuZ3VhZ2UuY29kZV0/LnZhbHVlKTtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudERpcmVjdGlvbihjdXJyZW50VmFsdWU/LltjdXJyZW50TGFuZ3VhZ2UuY29kZV0/LmRpcmVjdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAoIWN1cnJlbnRMYW5ndWFnZT8uY29kZSkge1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50VGV4dCgnJyk7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnREaXJlY3Rpb24oJ2x0cicpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50VGV4dCgnJyk7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnREaXJlY3Rpb24oJ2x0cicpO1xuICAgICAgICAgICAgY3VycmVudFZhbHVlW2N1cnJlbnRMYW5ndWFnZS5jb2RlXSA9IHt2YWx1ZTogJycsIGRpcmVjdGlvbjogJ2x0cid9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY3VycmVudExhbmd1YWdlPy5jb2RlICYmIGN1cnJlbnREZWZhdWx0VmFsdWU/LltjdXJyZW50TGFuZ3VhZ2UuY29kZV0pe1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50RGVmYXVsdFRleHQoY3VycmVudERlZmF1bHRWYWx1ZT8uW2N1cnJlbnRMYW5ndWFnZS5jb2RlXT8udmFsdWUpO1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50RGVmYXVsdERpcmVjdGlvbihjdXJyZW50RGVmYXVsdFZhbHVlPy5bY3VycmVudExhbmd1YWdlLmNvZGVdPy5kaXJlY3Rpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKCFjdXJyZW50TGFuZ3VhZ2U/LmNvZGUpIHtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudERlZmF1bHRUZXh0KCcnKTtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudERlZmF1bHREaXJlY3Rpb24oJ2x0cicpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnREZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudERlZmF1bHRUZXh0KCcnKTtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudERlZmF1bHREaXJlY3Rpb24oJ2x0cicpO1xuICAgICAgICAgICAgY3VycmVudERlZmF1bHRWYWx1ZVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0gPSB7dmFsdWU6ICcnLCBkaXJlY3Rpb246ICdsdHInfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrby51bndyYXAoc2VsZi5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Yga28udW53cmFwKHNlbGYucGxhY2Vob2xkZXIpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNlbGYucGxhY2Vob2xkZXIoe1xuICAgICAgICAgICAgICAgICAgICBbc2VsZi5jdXJyZW50TGFuZ3VhZ2UoKS5jb2RlXToga28udW53cmFwKHNlbGYucGxhY2Vob2xkZXIpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jdXJyZW50UGxhY2Vob2xkZXIoc2VsZi5wbGFjZWhvbGRlcigpW3NlbGYuY3VycmVudExhbmd1YWdlKCkuY29kZV0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGluaXQoKTtcblxuICAgIHNlbGYuZGlzYWJsZSA9IGtvLmNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGtvLnVud3JhcChzZWxmLmRpc2FibGVkKSB8fCBrby51bndyYXAoc2VsZi51bmVkaXRhYmxlKTtcbiAgICB9LCBzZWxmKTtcblxuICAgIHNlbGYuY3VycmVudERlZmF1bHRUZXh0LnN1YnNjcmliZShuZXdWYWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRMYW5ndWFnZSA9IHNlbGYuY3VycmVudERlZmF1bHRMYW5ndWFnZSgpO1xuICAgICAgICBpZighY3VycmVudExhbmd1YWdlKSB7IHJldHVybjsgfVxuICAgICAgICBjdXJyZW50RGVmYXVsdFZhbHVlW2N1cnJlbnRMYW5ndWFnZS5jb2RlXS52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBzZWxmLmRlZmF1bHRWYWx1ZShjdXJyZW50RGVmYXVsdFZhbHVlKTtcbiAgICAgICAgc2VsZi5jYXJkLl9jYXJkLnZhbHVlSGFzTXV0YXRlZCgpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5jdXJyZW50RGVmYXVsdERpcmVjdGlvbi5zdWJzY3JpYmUobmV3VmFsdWUgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50TGFuZ3VhZ2UgPSBzZWxmLmN1cnJlbnREZWZhdWx0TGFuZ3VhZ2UoKTtcbiAgICAgICAgaWYoIWN1cnJlbnRMYW5ndWFnZSkgeyByZXR1cm47IH1cbiAgICAgICAgaWYoIWN1cnJlbnREZWZhdWx0VmFsdWU/LltjdXJyZW50TGFuZ3VhZ2UuY29kZV0pe1xuICAgICAgICAgICAgY3VycmVudERlZmF1bHRWYWx1ZVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50RGVmYXVsdFZhbHVlW2N1cnJlbnRMYW5ndWFnZS5jb2RlXS5kaXJlY3Rpb24gPSBuZXdWYWx1ZTtcbiAgICAgICAgc2VsZi5kZWZhdWx0VmFsdWUoY3VycmVudERlZmF1bHRWYWx1ZSk7XG4gICAgICAgIHNlbGYuY2FyZC5fY2FyZC52YWx1ZUhhc011dGF0ZWQoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuY3VycmVudERlZmF1bHRMYW5ndWFnZS5zdWJzY3JpYmUobmV3VmFsdWUgPT4ge1xuICAgICAgICBpZighc2VsZi5jdXJyZW50RGVmYXVsdExhbmd1YWdlKCkpeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3VycmVudExhbmd1YWdlID0gc2VsZi5jdXJyZW50RGVmYXVsdExhbmd1YWdlKCk7XG4gICAgICAgIGlmKCFjdXJyZW50RGVmYXVsdFZhbHVlPy5bY3VycmVudExhbmd1YWdlLmNvZGVdKSB7XG4gICAgICAgICAgICBjdXJyZW50RGVmYXVsdFZhbHVlW2N1cnJlbnRMYW5ndWFnZS5jb2RlXSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBjdXJyZW50TGFuZ3VhZ2U/LmRlZmF1bHRfZGlyZWN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2VsZi5kZWZhdWx0VmFsdWUoY3VycmVudERlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICBzZWxmLmNhcmQuX2NhcmQudmFsdWVIYXNNdXRhdGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLmN1cnJlbnREZWZhdWx0VGV4dChzZWxmLmRlZmF1bHRWYWx1ZSgpPy5bY3VycmVudExhbmd1YWdlLmNvZGVdPy52YWx1ZSk7XG4gICAgICAgIHNlbGYuY3VycmVudERlZmF1bHREaXJlY3Rpb24oc2VsZi5kZWZhdWx0VmFsdWUoKT8uW2N1cnJlbnRMYW5ndWFnZS5jb2RlXT8uZGlyZWN0aW9uKTtcblxuICAgIH0pO1xuXG4gICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShzZWxmLnZhbHVlKSkge1xuICAgICAgICBzZWxmLnZhbHVlLnN1YnNjcmliZShuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TGFuZ3VhZ2UgPSBzZWxmLmN1cnJlbnRMYW5ndWFnZSgpO1xuICAgICAgICAgICAgaWYoIWN1cnJlbnRMYW5ndWFnZSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGlmKEpTT04uc3RyaW5naWZ5KGN1cnJlbnRWYWx1ZSkgIT0gSlNPTi5zdHJpbmdpZnkoa28udG9KUyhrby51bndyYXAoc2VsZi52YWx1ZSkpKSl7XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50VGV4dChuZXdWYWx1ZT8uW2N1cnJlbnRMYW5ndWFnZS5jb2RlXT8udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxmLmN1cnJlbnRUZXh0LnN1YnNjcmliZShuZXdWYWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRMYW5ndWFnZSA9IHNlbGYuY3VycmVudExhbmd1YWdlKCk7XG4gICAgICAgIGlmKCFjdXJyZW50TGFuZ3VhZ2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYoIWN1cnJlbnRWYWx1ZT8uW2N1cnJlbnRMYW5ndWFnZS5jb2RlXSl7XG4gICAgICAgICAgICBjdXJyZW50VmFsdWVbY3VycmVudExhbmd1YWdlLmNvZGVdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFZhbHVlW2N1cnJlbnRMYW5ndWFnZS5jb2RlXS52YWx1ZSA9IG5ld1ZhbHVlPy5bY3VycmVudExhbmd1YWdlLmNvZGVdID8gbmV3VmFsdWVbY3VycmVudExhbmd1YWdlLmNvZGVdPy52YWx1ZSA6IG5ld1ZhbHVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShzZWxmLnZhbHVlKSkge1xuICAgICAgICAgICAgc2VsZi52YWx1ZShjdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi52YWx1ZVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0udmFsdWUobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0pO1xuXG4gICAgc2VsZi5jdXJyZW50RGlyZWN0aW9uLnN1YnNjcmliZShuZXdWYWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRMYW5ndWFnZSA9IHNlbGYuY3VycmVudExhbmd1YWdlKCk7XG4gICAgICAgIGlmKCFjdXJyZW50TGFuZ3VhZ2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYoIWN1cnJlbnRWYWx1ZT8uW2N1cnJlbnRMYW5ndWFnZS5jb2RlXSl7XG4gICAgICAgICAgICBjdXJyZW50VmFsdWVbY3VycmVudExhbmd1YWdlLmNvZGVdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFZhbHVlW2N1cnJlbnRMYW5ndWFnZS5jb2RlXS5kaXJlY3Rpb24gPSBuZXdWYWx1ZTtcbiAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShzZWxmLnZhbHVlKSkge1xuICAgICAgICAgICAgc2VsZi52YWx1ZShjdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi52YWx1ZVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0uZGlyZWN0aW9uKG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2VsZi5jdXJyZW50TGFuZ3VhZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYoIXNlbGYuY3VycmVudExhbmd1YWdlKCkpeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3VycmVudExhbmd1YWdlID0gc2VsZi5jdXJyZW50TGFuZ3VhZ2UoKTtcblxuICAgICAgICBzZWxmLmN1cnJlbnRUZXh0KGtvTWFwcGluZy50b0pTKHNlbGYudmFsdWUpW2N1cnJlbnRMYW5ndWFnZS5jb2RlXT8udmFsdWUpO1xuICAgICAgICBzZWxmLmN1cnJlbnREaXJlY3Rpb24oa29NYXBwaW5nLnRvSlMoc2VsZi52YWx1ZSlbY3VycmVudExhbmd1YWdlLmNvZGVdPy5kaXJlY3Rpb24pO1xuICAgICAgICBzZWxmLmN1cnJlbnRQbGFjZWhvbGRlcihrb01hcHBpbmcudG9KUyhzZWxmLnBsYWNlaG9sZGVyKVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0pO1xuICAgIH0pO1xuXG4gICAgc2VsZi5jdXJyZW50UGxhY2Vob2xkZXIuc3Vic2NyaWJlKG5ld1ZhbHVlID0+IHtcbiAgICAgICAgaWYoIXNlbGYuY3VycmVudExhbmd1YWdlKCkpeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3VycmVudExhbmd1YWdlID0gc2VsZi5jdXJyZW50TGFuZ3VhZ2UoKTtcblxuICAgICAgICBpZiAoc2VsZi5jYXJkICYmIGtvLmlzT2JzZXJ2YWJsZShzZWxmLnBsYWNlaG9sZGVyKSkge1xuICAgICAgICAgICAgY29uc3QgcGF0Y2hlZFBsYWNlaG9sZGVyID0gc2VsZi5wbGFjZWhvbGRlcigpIHx8IHt9O1xuICAgICAgICAgICAgcGF0Y2hlZFBsYWNlaG9sZGVyW2N1cnJlbnRMYW5ndWFnZS5jb2RlXSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgc2VsZi5wbGFjZWhvbGRlcihwYXRjaGVkUGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgc2VsZi5jYXJkLl9jYXJkLnZhbHVlSGFzTXV0YXRlZCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCd0ZXh0LXdpZGdldCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogdGV4dFdpZGdldFRlbXBsYXRlLFxufSk7XG4iXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJyZXR1cm4iLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfZGVmaW5lUHJvcGVydHkiLCJfdG9Qcm9wZXJ0eUtleSIsIl90b1ByaW1pdGl2ZSIsIl90eXBlb2YiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsImtvIiwia29NYXBwaW5nIiwiXyIsIldpZGdldFZpZXdNb2RlbCIsImFyY2hlcyIsInRleHRXaWRnZXRUZW1wbGF0ZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsImNvbmZpZ0tleXMiLCJzZWxmIiwiY2FyZCIsImN1cnJlbnRMYW5ndWFnZSIsIm9ic2VydmFibGUiLCJjb2RlIiwiYWN0aXZlTGFuZ3VhZ2UiLCJsYW5ndWFnZXMiLCJvYnNlcnZhYmxlQXJyYXkiLCJjdXJyZW50VGV4dCIsImN1cnJlbnREaXJlY3Rpb24iLCJzaG93aTE4bk9wdGlvbnMiLCJjdXJyZW50RGVmYXVsdFRleHQiLCJjdXJyZW50RGVmYXVsdERpcmVjdGlvbiIsImN1cnJlbnREZWZhdWx0TGFuZ3VhZ2UiLCJjdXJyZW50UGxhY2Vob2xkZXIiLCJpbml0aWFsQ3VycmVudCIsImluaXRpYWxEZWZhdWx0IiwiZGlyZWN0aW9uIiwiY3VycmVudERlZmF1bHRWYWx1ZSIsInVud3JhcCIsImRlZmF1bHRWYWx1ZSIsImN1cnJlbnRWYWx1ZSIsInRvSlMiLCJmb3JtIiwib24iLCJ4IiwiX2N1cnJlbnRWYWx1ZSRzZWxmJGN1IiwiX2N1cnJlbnRWYWx1ZSRzZWxmJGN1MiIsImluaXQiLCJfcmVmIiwiX2NhbGxlZSIsIl9jdXJyZW50VmFsdWUiLCJfY3VycmVudFZhbHVlMiIsIl9jdXJyZW50VmFsdWUzIiwiX2N1cnJlbnREZWZhdWx0VmFsdWUkIiwiX2N1cnJlbnREZWZhdWx0VmFsdWUkMiIsIl9jb250ZXh0IiwiZmluZCIsImVsZW1lbnQiLCJwbGFjZWhvbGRlciIsImRpc2FibGUiLCJjb21wdXRlZCIsImRpc2FibGVkIiwidW5lZGl0YWJsZSIsInN1YnNjcmliZSIsIm5ld1ZhbHVlIiwiX2NhcmQiLCJ2YWx1ZUhhc011dGF0ZWQiLCJfc2VsZiRkZWZhdWx0VmFsdWUiLCJfc2VsZiRkZWZhdWx0VmFsdWUyIiwiZGVmYXVsdF9kaXJlY3Rpb24iLCJpc09ic2VydmFibGUiLCJKU09OIiwic3RyaW5naWZ5IiwiX25ld1ZhbHVlJGN1cnJlbnRMYW5nIiwiX2N1cnJlbnRWYWx1ZTQiLCJfbmV3VmFsdWUkY3VycmVudExhbmcyIiwiX2N1cnJlbnRWYWx1ZTUiLCJfa29NYXBwaW5nJHRvSlMkY3VycmUiLCJfa29NYXBwaW5nJHRvSlMkY3VycmUyIiwicGF0Y2hlZFBsYWNlaG9sZGVyIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9