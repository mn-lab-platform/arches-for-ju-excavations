"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[63158],{

/***/ 63158:
/*!*************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/rich-text.js + 1 modules ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ rich_text)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
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
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/rich-text.htm
const rich_text_namespaceObject = "templates/views/components/widgets/rich-text.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/ckeditor.js
var ckeditor = __webpack_require__(82008);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/chosen.js
var chosen = __webpack_require__(63777);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/rich-text.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }










/**
* registers a rich-text-widget component for use in forms
* @function external:"ko.components".rich-text-widget
* @param {object} params
* @param {string} params.value - the value being managed
* @param {function} params.config - observable containing config object
*/

var viewModel = function viewModel(params) {
  var _currentValue, _self$value;
  params.configKeys = ['placeholder', 'displayfullvalue'];
  var self = this;
  self.card = params.card;
  widget["default"].apply(self, [params]);
  var initialCurrent = {};
  self.showi18nOptions = knockout_latest_default().observable(false);
  initialCurrent[arches["default"].activeLanguage] = {
    value: '',
    direction: 'ltr'
  };
  var currentLanguage = {
    "code": arches["default"].activeLanguage
  };
  var currentValue = knockout_mapping_min_default().toJS(self.value) || initialCurrent;
  self.currentLanguage = knockout_latest_default().observable(currentLanguage);
  self.currentPlaceholder = knockout_latest_default().observable();
  var updating = false;
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
  var languages = arches["default"].languages;
  self.languages = knockout_latest_default().observableArray(languages);
  self.currentLanguage(languages.find(function (element) {
    return element.code == arches["default"].activeLanguage;
  }));
  if (!((_currentValue = currentValue) !== null && _currentValue !== void 0 && _currentValue[currentLanguage.code])) {
    self.currentText = knockout_latest_default().observable('');
    self.currentDirection = knockout_latest_default().observable('ltr');
    currentValue[currentLanguage.code] = {
      value: '',
      direction: 'ltr'
    };
  } else {
    var _currentValue2, _currentValue3;
    self.currentText = knockout_latest_default().observable((_currentValue2 = currentValue) === null || _currentValue2 === void 0 || (_currentValue2 = _currentValue2[currentLanguage.code]) === null || _currentValue2 === void 0 ? void 0 : _currentValue2.value);
    self.currentDirection = knockout_latest_default().observable(knockout_latest_default().unwrap((_currentValue3 = currentValue) === null || _currentValue3 === void 0 || (_currentValue3 = _currentValue3[currentLanguage.code]) === null || _currentValue3 === void 0 ? void 0 : _currentValue3.direction));
  }
  if (knockout_latest_default().unwrap(self.placeholder)) {
    if (typeof knockout_latest_default().unwrap(self.placeholder) === 'string') {
      self.placeholder(_defineProperty({}, self.currentLanguage().code, knockout_latest_default().unwrap(self.placeholder)));
    }
    self.currentPlaceholder(self.placeholder()[self.currentLanguage().code]);
  }
  self.strippedValue = knockout_latest_default().pureComputed(function () {
    return jquery_min_default()("<span>".concat(self.currentText(), "</span>")).text();
  });
  self.strippedValue();
  self.defaultText = knockout_latest_default().observable();
  self.defaultText.subscribe(function (newValue) {
    var config = self.config();
    config.placeholder = newValue;
    self.config(config);
  });
  var valueLeaf = ((_self$value = self.value) === null || _self$value === void 0 || (_self$value = _self$value[arches["default"].activeLanguage]) === null || _self$value === void 0 ? void 0 : _self$value.value) || self.value;
  valueLeaf === null || valueLeaf === void 0 || valueLeaf.subscribe(function (newValue) {
    var currentLanguage = self.currentLanguage();
    if (!currentLanguage) {
      return;
    }
    if (!updating && JSON.stringify(currentValue) != JSON.stringify(knockout_latest_default().toJS(knockout_latest_default().unwrap(self.value)))) {
      var _newValue$currentLang;
      // Don't attempt to update currentText if we are in the middle of another update.
      // currentValue will already be correct, and self.value has not yet finished updating.
      // https://github.com/archesproject/arches/issues/10468
      self.currentText((newValue === null || newValue === void 0 || (_newValue$currentLang = newValue[currentLanguage.code]) === null || _newValue$currentLang === void 0 ? void 0 : _newValue$currentLang.value) || newValue);
    }
  });
  self.currentText.subscribe(function (newValue) {
    var _currentValue4, _newValue$currentLang2;
    var currentLanguage = self.currentLanguage();
    if (!currentLanguage) {
      return;
    }
    updating = true;
    if (!((_currentValue4 = currentValue) !== null && _currentValue4 !== void 0 && _currentValue4[currentLanguage.code])) {
      currentValue[currentLanguage.code] = {};
    }
    currentValue[currentLanguage.code].value = newValue !== null && newValue !== void 0 && newValue[currentLanguage.code] ? (_newValue$currentLang2 = newValue[currentLanguage.code]) === null || _newValue$currentLang2 === void 0 ? void 0 : _newValue$currentLang2.value : newValue;
    if (knockout_latest_default().isObservable(self.value)) {
      self.value(currentValue);
    } else {
      self.value[currentLanguage.code].value(newValue);
    }
    updating = false;
  });
  self.currentDirection.subscribe(function (newValue) {
    var _currentValue5;
    var currentLanguage = self.currentLanguage();
    if (!currentLanguage) {
      return;
    }
    updating = true;
    if (!((_currentValue5 = currentValue) !== null && _currentValue5 !== void 0 && _currentValue5[currentLanguage.code])) {
      currentValue[currentLanguage.code] = {};
    }
    currentValue[currentLanguage.code].direction = newValue;
    if (knockout_latest_default().isObservable(self.value)) {
      self.value(currentValue);
    } else {
      self.value[currentLanguage.code].direction(newValue);
    }
    updating = false;
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
      var patchedPlaceholder = self.placeholder();
      patchedPlaceholder[currentLanguage.code] = newValue;
      self.placeholder(patchedPlaceholder);
      self.card._card.valueHasMutated();
    }
  });
  this.displayfullvalue(params.displayfullvalue);
};
/* harmony default export */ const rich_text = (knockout_latest_default().components.register('rich-text-widget', {
  viewModel: viewModel,
  template: rich_text_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYWIwZjRhNTljZDBkOWFkOTI1ZDcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNHO0FBQ2U7QUFDZDtBQUNxQjtBQUNwQjtBQUMwRDtBQUMzRDtBQUNGOztBQUd6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNTyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQUEsSUFBQUMsYUFBQSxFQUFBQyxXQUFBO0VBQy9CRixNQUFNLENBQUNHLFVBQVUsR0FBRyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQztFQUN2RCxJQUFNQyxJQUFJLEdBQUcsSUFBSTtFQUNqQkEsSUFBSSxDQUFDQyxJQUFJLEdBQUdMLE1BQU0sQ0FBQ0ssSUFBSTtFQUV2QlQsaUJBQWUsQ0FBQ1UsS0FBSyxDQUFDRixJQUFJLEVBQUUsQ0FBQ0osTUFBTSxDQUFDLENBQUM7RUFDckMsSUFBTU8sY0FBYyxHQUFHLENBQUMsQ0FBQztFQUN6QkgsSUFBSSxDQUFDSSxlQUFlLEdBQUdmLG9DQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDYyxjQUFjLENBQUNWLGlCQUFNLENBQUNhLGNBQWMsQ0FBQyxHQUFHO0lBQUNDLEtBQUssRUFBRSxFQUFFO0lBQUVDLFNBQVMsRUFBRTtFQUFLLENBQUM7RUFDckUsSUFBTUMsZUFBZSxHQUFHO0lBQUMsTUFBTSxFQUFFaEIsaUJBQU0sQ0FBQ2E7RUFBYyxDQUFDO0VBQ3ZELElBQUlJLFlBQVksR0FBR3BCLG1DQUFjLENBQUNVLElBQUksQ0FBQ08sS0FBSyxDQUFDLElBQUlKLGNBQWM7RUFDL0RILElBQUksQ0FBQ1MsZUFBZSxHQUFHcEIsb0NBQWEsQ0FBQ29CLGVBQWUsQ0FBQztFQUNyRFQsSUFBSSxDQUFDWSxrQkFBa0IsR0FBR3ZCLG9DQUFhLENBQUMsQ0FBQztFQUN6QyxJQUFJd0IsUUFBUSxHQUFHLEtBQUs7RUFFcEIsSUFBR2IsSUFBSSxDQUFDYyxJQUFJLEVBQUM7SUFDVGQsSUFBSSxDQUFDYyxJQUFJLENBQUNDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQ0MsQ0FBQyxFQUFLO01BQzlCLElBQUkzQixnQ0FBUyxDQUFDVyxJQUFJLENBQUNPLEtBQUssQ0FBQyxFQUFFO1FBQUEsSUFBQVcscUJBQUEsRUFBQUMsc0JBQUE7UUFDdkJULFlBQVksR0FBR3BCLG1DQUFjLENBQUNVLElBQUksQ0FBQ08sS0FBSyxDQUFDO1FBQ3pDUCxJQUFJLENBQUNvQixXQUFXLEVBQUFGLHFCQUFBLEdBQUNSLFlBQVksQ0FBQ1YsSUFBSSxDQUFDUyxlQUFlLENBQUMsQ0FBQyxDQUFDWSxJQUFJLENBQUMsY0FBQUgscUJBQUEsdUJBQXpDQSxxQkFBQSxDQUEyQ1gsS0FBSyxDQUFDO1FBQ2xFUCxJQUFJLENBQUNzQixnQkFBZ0IsRUFBQUgsc0JBQUEsR0FBQ1QsWUFBWSxDQUFDVixJQUFJLENBQUNTLGVBQWUsQ0FBQyxDQUFDLENBQUNZLElBQUksQ0FBQyxjQUFBRixzQkFBQSx1QkFBekNBLHNCQUFBLENBQTJDWCxTQUFTLENBQUM7TUFDL0U7SUFDSixDQUFDLENBQUM7RUFDTjtFQUVBLElBQU1lLFNBQVMsR0FBRzlCLGlCQUFNLENBQUM4QixTQUFTO0VBQ2xDdkIsSUFBSSxDQUFDdUIsU0FBUyxHQUFJbEMseUNBQWtCLENBQUNrQyxTQUFTLENBQUM7RUFDL0N2QixJQUFJLENBQUNTLGVBQWUsQ0FBQ2MsU0FBUyxDQUFDRSxJQUFJLENBQUMsVUFBQUMsT0FBTztJQUFBLE9BQUlBLE9BQU8sQ0FBQ0wsSUFBSSxJQUFJNUIsaUJBQU0sQ0FBQ2EsY0FBYztFQUFBLEVBQUMsQ0FBQztFQUV0RixJQUFHLEdBQUFULGFBQUEsR0FBQ2EsWUFBWSxjQUFBYixhQUFBLGVBQVpBLGFBQUEsQ0FBZVksZUFBZSxDQUFDWSxJQUFJLENBQUMsR0FBQztJQUNyQ3JCLElBQUksQ0FBQ29CLFdBQVcsR0FBRy9CLG9DQUFhLENBQUMsRUFBRSxDQUFDO0lBQ3BDVyxJQUFJLENBQUNzQixnQkFBZ0IsR0FBR2pDLG9DQUFhLENBQUMsS0FBSyxDQUFDO0lBQzVDcUIsWUFBWSxDQUFDRCxlQUFlLENBQUNZLElBQUksQ0FBQyxHQUFHO01BQUNkLEtBQUssRUFBRSxFQUFFO01BQUVDLFNBQVMsRUFBRTtJQUFLLENBQUM7RUFDdEUsQ0FBQyxNQUFNO0lBQUEsSUFBQW1CLGNBQUEsRUFBQUMsY0FBQTtJQUNINUIsSUFBSSxDQUFDb0IsV0FBVyxHQUFHL0Isb0NBQWEsRUFBQXNDLGNBQUEsR0FBQ2pCLFlBQVksY0FBQWlCLGNBQUEsZ0JBQUFBLGNBQUEsR0FBWkEsY0FBQSxDQUFlbEIsZUFBZSxDQUFDWSxJQUFJLENBQUMsY0FBQU0sY0FBQSx1QkFBcENBLGNBQUEsQ0FBc0NwQixLQUFLLENBQUM7SUFDN0VQLElBQUksQ0FBQ3NCLGdCQUFnQixHQUFHakMsb0NBQWEsQ0FBQ0EsZ0NBQVMsRUFBQXVDLGNBQUEsR0FBQ2xCLFlBQVksY0FBQWtCLGNBQUEsZ0JBQUFBLGNBQUEsR0FBWkEsY0FBQSxDQUFlbkIsZUFBZSxDQUFDWSxJQUFJLENBQUMsY0FBQU8sY0FBQSx1QkFBcENBLGNBQUEsQ0FBc0NwQixTQUFTLENBQUMsQ0FBQztFQUNyRztFQUVBLElBQUluQixnQ0FBUyxDQUFDVyxJQUFJLENBQUM2QixXQUFXLENBQUMsRUFBRTtJQUM3QixJQUFJLE9BQU94QyxnQ0FBUyxDQUFDVyxJQUFJLENBQUM2QixXQUFXLENBQUMsS0FBSyxRQUFRLEVBQUU7TUFDakQ3QixJQUFJLENBQUM2QixXQUFXLENBQUFDLGVBQUEsS0FDWDlCLElBQUksQ0FBQ1MsZUFBZSxDQUFDLENBQUMsQ0FBQ1ksSUFBSSxFQUFHaEMsZ0NBQVMsQ0FBQ1csSUFBSSxDQUFDNkIsV0FBVyxDQUFDLENBQzdELENBQUM7SUFDTjtJQUNBN0IsSUFBSSxDQUFDWSxrQkFBa0IsQ0FBQ1osSUFBSSxDQUFDNkIsV0FBVyxDQUFDLENBQUMsQ0FBQzdCLElBQUksQ0FBQ1MsZUFBZSxDQUFDLENBQUMsQ0FBQ1ksSUFBSSxDQUFDLENBQUM7RUFDNUU7RUFFQXJCLElBQUksQ0FBQytCLGFBQWEsR0FBRzFDLHNDQUFlLENBQUMsWUFBTTtJQUN2QyxPQUFPRCxvQkFBQyxVQUFBNkMsTUFBQSxDQUFVakMsSUFBSSxDQUFDb0IsV0FBVyxDQUFDLENBQUMsWUFBUyxDQUFDLENBQUNjLElBQUksQ0FBQyxDQUFDO0VBQ3pELENBQUMsQ0FBQztFQUVGbEMsSUFBSSxDQUFDK0IsYUFBYSxDQUFDLENBQUM7RUFFcEIvQixJQUFJLENBQUNtQyxXQUFXLEdBQUc5QyxvQ0FBYSxDQUFDLENBQUM7RUFDbENXLElBQUksQ0FBQ21DLFdBQVcsQ0FBQ0MsU0FBUyxDQUFDLFVBQUFDLFFBQVEsRUFBSTtJQUNuQyxJQUFNQyxNQUFNLEdBQUd0QyxJQUFJLENBQUNzQyxNQUFNLENBQUMsQ0FBQztJQUM1QkEsTUFBTSxDQUFDVCxXQUFXLEdBQUdRLFFBQVE7SUFDN0JyQyxJQUFJLENBQUNzQyxNQUFNLENBQUNBLE1BQU0sQ0FBQztFQUN2QixDQUFDLENBQUM7RUFFRixJQUFNQyxTQUFTLEdBQUcsRUFBQXpDLFdBQUEsR0FBQUUsSUFBSSxDQUFDTyxLQUFLLGNBQUFULFdBQUEsZ0JBQUFBLFdBQUEsR0FBVkEsV0FBQSxDQUFhTCxpQkFBTSxDQUFDYSxjQUFjLENBQUMsY0FBQVIsV0FBQSx1QkFBbkNBLFdBQUEsQ0FBcUNTLEtBQUssS0FBSVAsSUFBSSxDQUFDTyxLQUFLO0VBQzFFZ0MsU0FBUyxhQUFUQSxTQUFTLGVBQVRBLFNBQVMsQ0FBRUgsU0FBUyxDQUFDLFVBQUFDLFFBQVEsRUFBSTtJQUM3QixJQUFNNUIsZUFBZSxHQUFHVCxJQUFJLENBQUNTLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLElBQUcsQ0FBQ0EsZUFBZSxFQUFFO01BQUU7SUFBUTtJQUUvQixJQUFHLENBQUNJLFFBQVEsSUFBSzJCLElBQUksQ0FBQ0MsU0FBUyxDQUFDL0IsWUFBWSxDQUFDLElBQUk4QixJQUFJLENBQUNDLFNBQVMsQ0FBQ3BELDhCQUFPLENBQUNBLGdDQUFTLENBQUNXLElBQUksQ0FBQ08sS0FBSyxDQUFDLENBQUMsQ0FBRSxFQUFDO01BQUEsSUFBQW1DLHFCQUFBO01BQzdGO01BQ0E7TUFDQTtNQUNBMUMsSUFBSSxDQUFDb0IsV0FBVyxDQUFDLENBQUFpQixRQUFRLGFBQVJBLFFBQVEsZ0JBQUFLLHFCQUFBLEdBQVJMLFFBQVEsQ0FBRzVCLGVBQWUsQ0FBQ1ksSUFBSSxDQUFDLGNBQUFxQixxQkFBQSx1QkFBaENBLHFCQUFBLENBQWtDbkMsS0FBSyxLQUFJOEIsUUFBUSxDQUFDO0lBQ3pFO0VBQ0osQ0FBQyxDQUFDO0VBRUZyQyxJQUFJLENBQUNvQixXQUFXLENBQUNnQixTQUFTLENBQUMsVUFBQUMsUUFBUSxFQUFJO0lBQUEsSUFBQU0sY0FBQSxFQUFBQyxzQkFBQTtJQUNuQyxJQUFNbkMsZUFBZSxHQUFHVCxJQUFJLENBQUNTLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLElBQUcsQ0FBQ0EsZUFBZSxFQUFFO01BQUU7SUFBUTtJQUUvQkksUUFBUSxHQUFHLElBQUk7SUFDZixJQUFHLEdBQUE4QixjQUFBLEdBQUNqQyxZQUFZLGNBQUFpQyxjQUFBLGVBQVpBLGNBQUEsQ0FBZWxDLGVBQWUsQ0FBQ1ksSUFBSSxDQUFDLEdBQUM7TUFDckNYLFlBQVksQ0FBQ0QsZUFBZSxDQUFDWSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0M7SUFDQVgsWUFBWSxDQUFDRCxlQUFlLENBQUNZLElBQUksQ0FBQyxDQUFDZCxLQUFLLEdBQUc4QixRQUFRLGFBQVJBLFFBQVEsZUFBUkEsUUFBUSxDQUFHNUIsZUFBZSxDQUFDWSxJQUFJLENBQUMsSUFBQXVCLHNCQUFBLEdBQUdQLFFBQVEsQ0FBQzVCLGVBQWUsQ0FBQ1ksSUFBSSxDQUFDLGNBQUF1QixzQkFBQSx1QkFBOUJBLHNCQUFBLENBQWdDckMsS0FBSyxHQUFHOEIsUUFBUTtJQUM5SCxJQUFJaEQsc0NBQWUsQ0FBQ1csSUFBSSxDQUFDTyxLQUFLLENBQUMsRUFBRTtNQUM3QlAsSUFBSSxDQUFDTyxLQUFLLENBQUNHLFlBQVksQ0FBQztJQUM1QixDQUFDLE1BQU07TUFDSFYsSUFBSSxDQUFDTyxLQUFLLENBQUNFLGVBQWUsQ0FBQ1ksSUFBSSxDQUFDLENBQUNkLEtBQUssQ0FBQzhCLFFBQVEsQ0FBQztJQUNwRDtJQUNBeEIsUUFBUSxHQUFHLEtBQUs7RUFDcEIsQ0FBQyxDQUFDO0VBQ0ZiLElBQUksQ0FBQ3NCLGdCQUFnQixDQUFDYyxTQUFTLENBQUMsVUFBQUMsUUFBUSxFQUFJO0lBQUEsSUFBQVMsY0FBQTtJQUN4QyxJQUFNckMsZUFBZSxHQUFHVCxJQUFJLENBQUNTLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLElBQUcsQ0FBQ0EsZUFBZSxFQUFFO01BQUU7SUFBUTtJQUUvQkksUUFBUSxHQUFHLElBQUk7SUFDZixJQUFHLEdBQUFpQyxjQUFBLEdBQUNwQyxZQUFZLGNBQUFvQyxjQUFBLGVBQVpBLGNBQUEsQ0FBZXJDLGVBQWUsQ0FBQ1ksSUFBSSxDQUFDLEdBQUM7TUFDckNYLFlBQVksQ0FBQ0QsZUFBZSxDQUFDWSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0M7SUFDQVgsWUFBWSxDQUFDRCxlQUFlLENBQUNZLElBQUksQ0FBQyxDQUFDYixTQUFTLEdBQUc2QixRQUFRO0lBRXZELElBQUloRCxzQ0FBZSxDQUFDVyxJQUFJLENBQUNPLEtBQUssQ0FBQyxFQUFFO01BQzdCUCxJQUFJLENBQUNPLEtBQUssQ0FBQ0csWUFBWSxDQUFDO0lBQzVCLENBQUMsTUFBTTtNQUNIVixJQUFJLENBQUNPLEtBQUssQ0FBQ0UsZUFBZSxDQUFDWSxJQUFJLENBQUMsQ0FBQ2IsU0FBUyxDQUFDNkIsUUFBUSxDQUFDO0lBQ3hEO0lBQ0F4QixRQUFRLEdBQUcsS0FBSztFQUNwQixDQUFDLENBQUM7RUFFRmIsSUFBSSxDQUFDUyxlQUFlLENBQUMyQixTQUFTLENBQUMsWUFBTTtJQUFBLElBQUFXLHFCQUFBLEVBQUFDLHNCQUFBO0lBQ2pDLElBQUcsQ0FBQ2hELElBQUksQ0FBQ1MsZUFBZSxDQUFDLENBQUMsRUFBQztNQUFFO0lBQVE7SUFFckMsSUFBTUEsZUFBZSxHQUFHVCxJQUFJLENBQUNTLGVBQWUsQ0FBQyxDQUFDO0lBRTlDVCxJQUFJLENBQUNvQixXQUFXLEVBQUEyQixxQkFBQSxHQUFDekQsbUNBQWMsQ0FBQ1UsSUFBSSxDQUFDTyxLQUFLLENBQUMsQ0FBQ0UsZUFBZSxDQUFDWSxJQUFJLENBQUMsY0FBQTBCLHFCQUFBLHVCQUFoREEscUJBQUEsQ0FBa0R4QyxLQUFLLENBQUM7SUFDekVQLElBQUksQ0FBQ3NCLGdCQUFnQixFQUFBMEIsc0JBQUEsR0FBQzFELG1DQUFjLENBQUNVLElBQUksQ0FBQ08sS0FBSyxDQUFDLENBQUNFLGVBQWUsQ0FBQ1ksSUFBSSxDQUFDLGNBQUEyQixzQkFBQSx1QkFBaERBLHNCQUFBLENBQWtEeEMsU0FBUyxDQUFDO0lBQ2xGUixJQUFJLENBQUNZLGtCQUFrQixDQUFDdEIsbUNBQWMsQ0FBQ1UsSUFBSSxDQUFDNkIsV0FBVyxDQUFDLENBQUNwQixlQUFlLENBQUNZLElBQUksQ0FBQyxDQUFDO0VBQ25GLENBQUMsQ0FBQztFQUVGckIsSUFBSSxDQUFDWSxrQkFBa0IsQ0FBQ3dCLFNBQVMsQ0FBQyxVQUFBQyxRQUFRLEVBQUk7SUFDMUMsSUFBRyxDQUFDckMsSUFBSSxDQUFDUyxlQUFlLENBQUMsQ0FBQyxFQUFDO01BQUU7SUFBUTtJQUNyQyxJQUFNQSxlQUFlLEdBQUdULElBQUksQ0FBQ1MsZUFBZSxDQUFDLENBQUM7SUFFOUMsSUFBSVQsSUFBSSxDQUFDQyxJQUFJLElBQUlaLHNDQUFlLENBQUNXLElBQUksQ0FBQzZCLFdBQVcsQ0FBQyxFQUFFO01BQ2hELElBQU1vQixrQkFBa0IsR0FBR2pELElBQUksQ0FBQzZCLFdBQVcsQ0FBQyxDQUFDO01BQzdDb0Isa0JBQWtCLENBQUN4QyxlQUFlLENBQUNZLElBQUksQ0FBQyxHQUFHZ0IsUUFBUTtNQUNuRHJDLElBQUksQ0FBQzZCLFdBQVcsQ0FBQ29CLGtCQUFrQixDQUFDO01BQ3BDakQsSUFBSSxDQUFDQyxJQUFJLENBQUNpRCxLQUFLLENBQUNDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JDO0VBQ0osQ0FBQyxDQUFDO0VBRUYsSUFBSSxDQUFDQyxnQkFBZ0IsQ0FBQ3hELE1BQU0sQ0FBQ3dELGdCQUFnQixDQUFDO0FBQ2xELENBQUM7QUFFRCxnREFBZS9ELG9DQUFhLENBQUNpRSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7RUFDdEQzRCxTQUFTLEVBQUVBLFNBQVM7RUFDcEI0RCxRQUFRLEVBQUU3RCx5QkFBc0JBO0FBQ3BDLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL3JpY2gtdGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBXaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy93aWRnZXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IHJpY2hUZXh0V2lkZ2V0VGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9yaWNoLXRleHQuaHRtJztcbmltcG9ydCAnYmluZGluZ3MvY2tlZGl0b3InO1xuaW1wb3J0ICdiaW5kaW5ncy9jaG9zZW4nO1xuXG5cbi8qKlxuKiByZWdpc3RlcnMgYSByaWNoLXRleHQtd2lkZ2V0IGNvbXBvbmVudCBmb3IgdXNlIGluIGZvcm1zXG4qIEBmdW5jdGlvbiBleHRlcm5hbDpcImtvLmNvbXBvbmVudHNcIi5yaWNoLXRleHQtd2lkZ2V0XG4qIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy52YWx1ZSAtIHRoZSB2YWx1ZSBiZWluZyBtYW5hZ2VkXG4qIEBwYXJhbSB7ZnVuY3Rpb259IHBhcmFtcy5jb25maWcgLSBvYnNlcnZhYmxlIGNvbnRhaW5pbmcgY29uZmlnIG9iamVjdFxuKi9cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgcGFyYW1zLmNvbmZpZ0tleXMgPSBbJ3BsYWNlaG9sZGVyJywgJ2Rpc3BsYXlmdWxsdmFsdWUnXTtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNhcmQgPSBwYXJhbXMuY2FyZDtcblxuICAgIFdpZGdldFZpZXdNb2RlbC5hcHBseShzZWxmLCBbcGFyYW1zXSk7XG4gICAgY29uc3QgaW5pdGlhbEN1cnJlbnQgPSB7fTtcbiAgICBzZWxmLnNob3dpMThuT3B0aW9ucyA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgIGluaXRpYWxDdXJyZW50W2FyY2hlcy5hY3RpdmVMYW5ndWFnZV0gPSB7dmFsdWU6ICcnLCBkaXJlY3Rpb246ICdsdHInfTtcbiAgICBjb25zdCBjdXJyZW50TGFuZ3VhZ2UgPSB7XCJjb2RlXCI6IGFyY2hlcy5hY3RpdmVMYW5ndWFnZX07XG4gICAgbGV0IGN1cnJlbnRWYWx1ZSA9IGtvTWFwcGluZy50b0pTKHNlbGYudmFsdWUpIHx8IGluaXRpYWxDdXJyZW50O1xuICAgIHNlbGYuY3VycmVudExhbmd1YWdlID0ga28ub2JzZXJ2YWJsZShjdXJyZW50TGFuZ3VhZ2UpO1xuICAgIHNlbGYuY3VycmVudFBsYWNlaG9sZGVyID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIGxldCB1cGRhdGluZyA9IGZhbHNlO1xuXG4gICAgaWYoc2VsZi5mb3JtKXtcbiAgICAgICAgc2VsZi5mb3JtLm9uKCd0aWxlLXJlc2V0JywgKHgpID0+IHtcbiAgICAgICAgICAgIGlmIChrby51bndyYXAoc2VsZi52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBrb01hcHBpbmcudG9KUyhzZWxmLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRUZXh0KGN1cnJlbnRWYWx1ZVtzZWxmLmN1cnJlbnRMYW5ndWFnZSgpLmNvZGVdPy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50RGlyZWN0aW9uKGN1cnJlbnRWYWx1ZVtzZWxmLmN1cnJlbnRMYW5ndWFnZSgpLmNvZGVdPy5kaXJlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBsYW5ndWFnZXMgPSBhcmNoZXMubGFuZ3VhZ2VzO1xuICAgIHNlbGYubGFuZ3VhZ2VzID0gIGtvLm9ic2VydmFibGVBcnJheShsYW5ndWFnZXMpO1xuICAgIHNlbGYuY3VycmVudExhbmd1YWdlKGxhbmd1YWdlcy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5jb2RlID09IGFyY2hlcy5hY3RpdmVMYW5ndWFnZSkpO1xuXG4gICAgaWYoIWN1cnJlbnRWYWx1ZT8uW2N1cnJlbnRMYW5ndWFnZS5jb2RlXSl7XG4gICAgICAgIHNlbGYuY3VycmVudFRleHQgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICAgICAgc2VsZi5jdXJyZW50RGlyZWN0aW9uID0ga28ub2JzZXJ2YWJsZSgnbHRyJyk7XG4gICAgICAgIGN1cnJlbnRWYWx1ZVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0gPSB7dmFsdWU6ICcnLCBkaXJlY3Rpb246ICdsdHInfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmN1cnJlbnRUZXh0ID0ga28ub2JzZXJ2YWJsZShjdXJyZW50VmFsdWU/LltjdXJyZW50TGFuZ3VhZ2UuY29kZV0/LnZhbHVlKTtcbiAgICAgICAgc2VsZi5jdXJyZW50RGlyZWN0aW9uID0ga28ub2JzZXJ2YWJsZShrby51bndyYXAoY3VycmVudFZhbHVlPy5bY3VycmVudExhbmd1YWdlLmNvZGVdPy5kaXJlY3Rpb24pKTtcbiAgICB9XG5cbiAgICBpZiAoa28udW53cmFwKHNlbGYucGxhY2Vob2xkZXIpKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga28udW53cmFwKHNlbGYucGxhY2Vob2xkZXIpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgc2VsZi5wbGFjZWhvbGRlcih7XG4gICAgICAgICAgICAgICAgW3NlbGYuY3VycmVudExhbmd1YWdlKCkuY29kZV06IGtvLnVud3JhcChzZWxmLnBsYWNlaG9sZGVyKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuY3VycmVudFBsYWNlaG9sZGVyKHNlbGYucGxhY2Vob2xkZXIoKVtzZWxmLmN1cnJlbnRMYW5ndWFnZSgpLmNvZGVdKTtcbiAgICB9XG5cbiAgICBzZWxmLnN0cmlwcGVkVmFsdWUgPSBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gJChgPHNwYW4+JHtzZWxmLmN1cnJlbnRUZXh0KCl9PC9zcGFuPmApLnRleHQoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuc3RyaXBwZWRWYWx1ZSgpO1xuXG4gICAgc2VsZi5kZWZhdWx0VGV4dCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICBzZWxmLmRlZmF1bHRUZXh0LnN1YnNjcmliZShuZXdWYWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHNlbGYuY29uZmlnKCk7XG4gICAgICAgIGNvbmZpZy5wbGFjZWhvbGRlciA9IG5ld1ZhbHVlO1xuICAgICAgICBzZWxmLmNvbmZpZyhjb25maWcpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdmFsdWVMZWFmID0gc2VsZi52YWx1ZT8uW2FyY2hlcy5hY3RpdmVMYW5ndWFnZV0/LnZhbHVlIHx8IHNlbGYudmFsdWU7XG4gICAgdmFsdWVMZWFmPy5zdWJzY3JpYmUobmV3VmFsdWUgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50TGFuZ3VhZ2UgPSBzZWxmLmN1cnJlbnRMYW5ndWFnZSgpO1xuICAgICAgICBpZighY3VycmVudExhbmd1YWdlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmKCF1cGRhdGluZyAmJiAoSlNPTi5zdHJpbmdpZnkoY3VycmVudFZhbHVlKSAhPSBKU09OLnN0cmluZ2lmeShrby50b0pTKGtvLnVud3JhcChzZWxmLnZhbHVlKSkpKSl7XG4gICAgICAgICAgICAvLyBEb24ndCBhdHRlbXB0IHRvIHVwZGF0ZSBjdXJyZW50VGV4dCBpZiB3ZSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhbm90aGVyIHVwZGF0ZS5cbiAgICAgICAgICAgIC8vIGN1cnJlbnRWYWx1ZSB3aWxsIGFscmVhZHkgYmUgY29ycmVjdCwgYW5kIHNlbGYudmFsdWUgaGFzIG5vdCB5ZXQgZmluaXNoZWQgdXBkYXRpbmcuXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYXJjaGVzcHJvamVjdC9hcmNoZXMvaXNzdWVzLzEwNDY4XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRUZXh0KG5ld1ZhbHVlPy5bY3VycmVudExhbmd1YWdlLmNvZGVdPy52YWx1ZSB8fCBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlbGYuY3VycmVudFRleHQuc3Vic2NyaWJlKG5ld1ZhbHVlID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudExhbmd1YWdlID0gc2VsZi5jdXJyZW50TGFuZ3VhZ2UoKTtcbiAgICAgICAgaWYoIWN1cnJlbnRMYW5ndWFnZSkgeyByZXR1cm47IH1cblxuICAgICAgICB1cGRhdGluZyA9IHRydWU7XG4gICAgICAgIGlmKCFjdXJyZW50VmFsdWU/LltjdXJyZW50TGFuZ3VhZ2UuY29kZV0pe1xuICAgICAgICAgICAgY3VycmVudFZhbHVlW2N1cnJlbnRMYW5ndWFnZS5jb2RlXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRWYWx1ZVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0udmFsdWUgPSBuZXdWYWx1ZT8uW2N1cnJlbnRMYW5ndWFnZS5jb2RlXSA/IG5ld1ZhbHVlW2N1cnJlbnRMYW5ndWFnZS5jb2RlXT8udmFsdWUgOiBuZXdWYWx1ZTtcbiAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShzZWxmLnZhbHVlKSkge1xuICAgICAgICAgICAgc2VsZi52YWx1ZShjdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi52YWx1ZVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0udmFsdWUobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0aW5nID0gZmFsc2U7XG4gICAgfSk7XG4gICAgc2VsZi5jdXJyZW50RGlyZWN0aW9uLnN1YnNjcmliZShuZXdWYWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRMYW5ndWFnZSA9IHNlbGYuY3VycmVudExhbmd1YWdlKCk7XG4gICAgICAgIGlmKCFjdXJyZW50TGFuZ3VhZ2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdXBkYXRpbmcgPSB0cnVlO1xuICAgICAgICBpZighY3VycmVudFZhbHVlPy5bY3VycmVudExhbmd1YWdlLmNvZGVdKXtcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50VmFsdWVbY3VycmVudExhbmd1YWdlLmNvZGVdLmRpcmVjdGlvbiA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIGlmIChrby5pc09ic2VydmFibGUoc2VsZi52YWx1ZSkpIHtcbiAgICAgICAgICAgIHNlbGYudmFsdWUoY3VycmVudFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYudmFsdWVbY3VycmVudExhbmd1YWdlLmNvZGVdLmRpcmVjdGlvbihuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRpbmcgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIHNlbGYuY3VycmVudExhbmd1YWdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmKCFzZWxmLmN1cnJlbnRMYW5ndWFnZSgpKXsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudExhbmd1YWdlID0gc2VsZi5jdXJyZW50TGFuZ3VhZ2UoKTtcblxuICAgICAgICBzZWxmLmN1cnJlbnRUZXh0KGtvTWFwcGluZy50b0pTKHNlbGYudmFsdWUpW2N1cnJlbnRMYW5ndWFnZS5jb2RlXT8udmFsdWUpO1xuICAgICAgICBzZWxmLmN1cnJlbnREaXJlY3Rpb24oa29NYXBwaW5nLnRvSlMoc2VsZi52YWx1ZSlbY3VycmVudExhbmd1YWdlLmNvZGVdPy5kaXJlY3Rpb24pO1xuICAgICAgICBzZWxmLmN1cnJlbnRQbGFjZWhvbGRlcihrb01hcHBpbmcudG9KUyhzZWxmLnBsYWNlaG9sZGVyKVtjdXJyZW50TGFuZ3VhZ2UuY29kZV0pO1xuICAgIH0pO1xuXG4gICAgc2VsZi5jdXJyZW50UGxhY2Vob2xkZXIuc3Vic2NyaWJlKG5ld1ZhbHVlID0+IHtcbiAgICAgICAgaWYoIXNlbGYuY3VycmVudExhbmd1YWdlKCkpeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3VycmVudExhbmd1YWdlID0gc2VsZi5jdXJyZW50TGFuZ3VhZ2UoKTtcblxuICAgICAgICBpZiAoc2VsZi5jYXJkICYmIGtvLmlzT2JzZXJ2YWJsZShzZWxmLnBsYWNlaG9sZGVyKSkge1xuICAgICAgICAgICAgY29uc3QgcGF0Y2hlZFBsYWNlaG9sZGVyID0gc2VsZi5wbGFjZWhvbGRlcigpO1xuICAgICAgICAgICAgcGF0Y2hlZFBsYWNlaG9sZGVyW2N1cnJlbnRMYW5ndWFnZS5jb2RlXSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgc2VsZi5wbGFjZWhvbGRlcihwYXRjaGVkUGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgc2VsZi5jYXJkLl9jYXJkLnZhbHVlSGFzTXV0YXRlZCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpc3BsYXlmdWxsdmFsdWUocGFyYW1zLmRpc3BsYXlmdWxsdmFsdWUpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3RlcigncmljaC10ZXh0LXdpZGdldCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogcmljaFRleHRXaWRnZXRUZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbIiQiLCJrbyIsImtvTWFwcGluZyIsIl8iLCJXaWRnZXRWaWV3TW9kZWwiLCJhcmNoZXMiLCJyaWNoVGV4dFdpZGdldFRlbXBsYXRlIiwidmlld01vZGVsIiwicGFyYW1zIiwiX2N1cnJlbnRWYWx1ZSIsIl9zZWxmJHZhbHVlIiwiY29uZmlnS2V5cyIsInNlbGYiLCJjYXJkIiwiYXBwbHkiLCJpbml0aWFsQ3VycmVudCIsInNob3dpMThuT3B0aW9ucyIsIm9ic2VydmFibGUiLCJhY3RpdmVMYW5ndWFnZSIsInZhbHVlIiwiZGlyZWN0aW9uIiwiY3VycmVudExhbmd1YWdlIiwiY3VycmVudFZhbHVlIiwidG9KUyIsImN1cnJlbnRQbGFjZWhvbGRlciIsInVwZGF0aW5nIiwiZm9ybSIsIm9uIiwieCIsInVud3JhcCIsIl9jdXJyZW50VmFsdWUkc2VsZiRjdSIsIl9jdXJyZW50VmFsdWUkc2VsZiRjdTIiLCJjdXJyZW50VGV4dCIsImNvZGUiLCJjdXJyZW50RGlyZWN0aW9uIiwibGFuZ3VhZ2VzIiwib2JzZXJ2YWJsZUFycmF5IiwiZmluZCIsImVsZW1lbnQiLCJfY3VycmVudFZhbHVlMiIsIl9jdXJyZW50VmFsdWUzIiwicGxhY2Vob2xkZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJzdHJpcHBlZFZhbHVlIiwicHVyZUNvbXB1dGVkIiwiY29uY2F0IiwidGV4dCIsImRlZmF1bHRUZXh0Iiwic3Vic2NyaWJlIiwibmV3VmFsdWUiLCJjb25maWciLCJ2YWx1ZUxlYWYiLCJKU09OIiwic3RyaW5naWZ5IiwiX25ld1ZhbHVlJGN1cnJlbnRMYW5nIiwiX2N1cnJlbnRWYWx1ZTQiLCJfbmV3VmFsdWUkY3VycmVudExhbmcyIiwiaXNPYnNlcnZhYmxlIiwiX2N1cnJlbnRWYWx1ZTUiLCJfa29NYXBwaW5nJHRvSlMkY3VycmUiLCJfa29NYXBwaW5nJHRvSlMkY3VycmUyIiwicGF0Y2hlZFBsYWNlaG9sZGVyIiwiX2NhcmQiLCJ2YWx1ZUhhc011dGF0ZWQiLCJkaXNwbGF5ZnVsbHZhbHVlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9