"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[10771],{

/***/ 10771:
/*!****************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/concept-select.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var viewmodels_widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! viewmodels/widget */ 77260);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var NAME_LOOKUP = {};
var ConceptSelectViewModel = function ConceptSelectViewModel(params) {
  var _params$allowClear;
  var self = this;
  params.configKeys = ['placeholder', 'defaultValue'];
  this.multiple = params.multiple || false;
  this.allowClear = (_params$allowClear = params.allowClear) !== null && _params$allowClear !== void 0 ? _params$allowClear : true;
  this.displayName = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable('');
  viewmodels_widget__WEBPACK_IMPORTED_MODULE_3__["default"].apply(this, [params]);
  this.valueList = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    var valueList = self.value() || self.defaultValue();
    self.displayName();
    if (Array.isArray(valueList)) {
      return valueList;
    } else if (!self.multiple && valueList) {
      return [valueList];
    }
    return [];
  });
  this.valueObjects = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    self.displayName();
    return self.valueList().map(function (value) {
      return {
        id: value,
        name: NAME_LOOKUP[value]
      };
    }).filter(function (item) {
      return item.name;
    });
  });
  this.displayValue = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    var val = self.value();
    var name = self.displayName();
    var displayVal = null;
    if (val) {
      displayVal = name;
    }
    return displayVal;
  });
  this.setNames = function () {
    var names = [];
    self.valueList().forEach(function (val) {
      if (knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(val)) {
        if (NAME_LOOKUP[val]) {
          names.push(NAME_LOOKUP[val]);
          self.displayName(names.join(', '));
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_1___default().ajax(arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.get_pref_label + '?valueid=' + knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(val), {
            dataType: "json"
          }).done(function (data) {
            NAME_LOOKUP[val] = data.value;
            names.push(data.value);
            self.displayName(names.join(', '));
          });
        }
      }
    });
  };
  this.setNames();
  this.value.subscribe(function () {
    self.setNames();
  });
  this.select2Config = {
    value: self.value,
    clickBubble: true,
    multiple: self.multiple,
    closeOnSelect: true,
    placeholder: self.placeholder,
    allowClear: self.allowClear,
    ajax: {
      url: arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.paged_dropdown,
      dataType: 'json',
      quietMillis: 250,
      data: function data(requestParams) {
        var term = requestParams.term || '';
        var page = requestParams.page || 1;
        return {
          conceptid: knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(params.node.config.rdmCollection),
          query: term,
          page: page,
          lang: knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(params.lang)
        };
      },
      processResults: function processResults(data) {
        data.results.forEach(function (result) {
          if (result.collector) {
            delete result.id;
          }
        });
        return {
          "results": data.results,
          "pagination": {
            "more": data.more
          }
        };
      }
    },
    templateResult: function templateResult(item) {
      var indentation = '';
      for (var i = 0; i < item.depth - 1; i++) {
        indentation += '&nbsp;&nbsp;&nbsp;&nbsp;';
      }
      return indentation + item.text;
    },
    templateSelection: function templateSelection(item) {
      return item.text;
    },
    escapeMarkup: function escapeMarkup(m) {
      return m;
    },
    initComplete: false,
    initSelection: function initSelection(el, callback) {
      var valueList = self.valueList();
      var setSelectionData = function setSelectionData(data) {
        var valueData = [];
        if (self.multiple || Array.isArray(valueList)) {
          if (!(data instanceof Array)) {
            data = [data];
          }
          valueData = data.map(function (valueId) {
            return {
              id: valueId,
              text: NAME_LOOKUP[valueId]
            };
          });

          /* add the rest of the previously selected values */
          valueList.forEach(function (value) {
            if (value !== valueData[0].id) {
              valueData.push({
                id: value,
                text: NAME_LOOKUP[value]
              });
            }
          });

          /* keeps valueData obeying valueList as ordering source of truth */
          if (valueData[0].id !== valueList[0]) {
            valueData.reverse();
          }
        } else {
          valueData = [{
            id: data,
            text: NAME_LOOKUP[data]
          }];
        }
        if (!self.select2Config.initComplete) {
          valueData.forEach(function (data) {
            var option = new Option(data.text, data.id, true, true);
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(el).append(option);
          });
          self.select2Config.initComplete = true;
        }
        callback(valueData);
      };
      if (valueList.length > 0) {
        valueList.forEach(function (value) {
          if (knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(value)) {
            if (NAME_LOOKUP[value]) {
              setSelectionData(value);
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_1___default().ajax(arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.concept_value + '?valueid=' + knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(value), {
                dataType: "json"
              }).done(function (data) {
                NAME_LOOKUP[value] = data.value;
                setSelectionData(value);
              });
            }
          }
        });
      } else {
        callback([]);
      }
    }
  };
  this.select2ConfigMulti = _objectSpread({}, this.select2Config);
  this.select2ConfigMulti.multiple = true;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConceptSelectViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuODkxMDViZDEzYjk0Y2UyNWMwMGQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNIO0FBQ0s7QUFDb0I7QUFFaEQsSUFBSUksV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNwQixJQUFJQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCQSxDQUFZQyxNQUFNLEVBQUU7RUFBQSxJQUFBQyxrQkFBQTtFQUMxQyxJQUFJQyxJQUFJLEdBQUcsSUFBSTtFQUVmRixNQUFNLENBQUNHLFVBQVUsR0FBRyxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUM7RUFFbkQsSUFBSSxDQUFDQyxRQUFRLEdBQUdKLE1BQU0sQ0FBQ0ksUUFBUSxJQUFJLEtBQUs7RUFDeEMsSUFBSSxDQUFDQyxVQUFVLElBQUFKLGtCQUFBLEdBQUdELE1BQU0sQ0FBQ0ssVUFBVSxjQUFBSixrQkFBQSxjQUFBQSxrQkFBQSxHQUFJLElBQUk7RUFDM0MsSUFBSSxDQUFDSyxXQUFXLEdBQUdaLDBEQUFhLENBQUMsRUFBRSxDQUFDO0VBRXBDRyx5REFBZSxDQUFDVyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUNSLE1BQU0sQ0FBQyxDQUFDO0VBRXJDLElBQUksQ0FBQ1MsU0FBUyxHQUFHZix3REFBVyxDQUFDLFlBQVc7SUFDcEMsSUFBSWUsU0FBUyxHQUFHUCxJQUFJLENBQUNTLEtBQUssQ0FBQyxDQUFDLElBQUlULElBQUksQ0FBQ1UsWUFBWSxDQUFDLENBQUM7SUFDbkRWLElBQUksQ0FBQ0ksV0FBVyxDQUFDLENBQUM7SUFFbEIsSUFBSU8sS0FBSyxDQUFDQyxPQUFPLENBQUNMLFNBQVMsQ0FBQyxFQUFFO01BQzFCLE9BQU9BLFNBQVM7SUFDcEIsQ0FBQyxNQUFNLElBQUksQ0FBQ1AsSUFBSSxDQUFDRSxRQUFRLElBQUlLLFNBQVMsRUFBRTtNQUNwQyxPQUFPLENBQUNBLFNBQVMsQ0FBQztJQUN0QjtJQUNBLE9BQU8sRUFBRTtFQUNiLENBQUMsQ0FB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RHNCLFFBQVEsRUFBRTtjQUNkLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBU0MsSUFBSSxFQUFFO2dCQUNuQnJDLFdBQVcsQ0FBQ2EsS0FBSyxDQUFDLEdBQUd3QixJQUFJLENBQUN4QixLQUFLO2dCQUMvQjJELGdCQUFnQixDQUFDM0QsS0FBSyxDQUFDO2NBQzNCLENBQUMsQ0FBQztZQUNOO1VBQ0o7UUFDSixDQUFDLENBQUM7TUFDTixDQUFDLE1BQUk7UUFDRDBELFFBQVEsQ0FBQyxFQUFFLENBQUM7TUFDaEI7SUFHSjtFQUNKLENBQUM7RUFDRCxJQUFJLENBQUNVLGtCQUFrQixHQUFBQyxhQUFBLEtBQVEsSUFBSSxDQUFDM0MsYUFBYSxDQUFFO0VBQ25ELElBQUksQ0FBQzBDLGtCQUFrQixDQUFDM0UsUUFBUSxHQUFHLElBQUk7QUFDM0MsQ0FBQztBQUVELGlFQUFlTCxzQkFBc0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdtb2RlbHMvY29uY2VwdC1zZWxlY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgV2lkZ2V0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvd2lkZ2V0JztcblxudmFyIE5BTUVfTE9PS1VQID0ge307XG52YXIgQ29uY2VwdFNlbGVjdFZpZXdNb2RlbCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHBhcmFtcy5jb25maWdLZXlzID0gWydwbGFjZWhvbGRlcicsICdkZWZhdWx0VmFsdWUnXTtcblxuICAgIHRoaXMubXVsdGlwbGUgPSBwYXJhbXMubXVsdGlwbGUgfHwgZmFsc2U7XG4gICAgdGhpcy5hbGxvd0NsZWFyID0gcGFyYW1zLmFsbG93Q2xlYXIgPz8gdHJ1ZTtcbiAgICB0aGlzLmRpc3BsYXlOYW1lID0ga28ub2JzZXJ2YWJsZSgnJyk7XG5cbiAgICBXaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgdGhpcy52YWx1ZUxpc3QgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlTGlzdCA9IHNlbGYudmFsdWUoKSB8fCBzZWxmLmRlZmF1bHRWYWx1ZSgpO1xuICAgICAgICBzZWxmLmRpc3BsYXlOYW1lKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZUxpc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVMaXN0O1xuICAgICAgICB9IGVsc2UgaWYgKCFzZWxmLm11bHRpcGxlICYmIHZhbHVlTGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZUxpc3RdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9KTtcblxuICAgIHRoaXMudmFsdWVPYmplY3RzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuZGlzcGxheU5hbWUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGYudmFsdWVMaXN0KCkubWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBOQU1FX0xPT0tVUFt2YWx1ZV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlzcGxheVZhbHVlID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWwgPSBzZWxmLnZhbHVlKCk7XG4gICAgICAgIHZhciBuYW1lID0gc2VsZi5kaXNwbGF5TmFtZSgpO1xuICAgICAgICB2YXIgZGlzcGxheVZhbCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgZGlzcGxheVZhbCA9IG5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzcGxheVZhbDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0TmFtZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5hbWVzID0gW107XG4gICAgICAgIHNlbGYudmFsdWVMaXN0KCkuZm9yRWFjaChmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmIChrby51bndyYXAodmFsKSkge1xuICAgICAgICAgICAgICAgIGlmIChOQU1FX0xPT0tVUFt2YWxdKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVzLnB1c2goTkFNRV9MT09LVVBbdmFsXSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGxheU5hbWUobmFtZXMuam9pbignLCAnKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KGFyY2hlcy51cmxzLmdldF9wcmVmX2xhYmVsICsgJz92YWx1ZWlkPScgKyBrby51bndyYXAodmFsKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiXG4gICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTkFNRV9MT09LVVBbdmFsXSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKGRhdGEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwbGF5TmFtZShuYW1lcy5qb2luKCcsICcpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuc2V0TmFtZXMoKTtcblxuICAgIHRoaXMudmFsdWUuc3Vic2NyaWJlKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnNldE5hbWVzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNlbGVjdDJDb25maWcgPSB7XG4gICAgICAgIHZhbHVlOiBzZWxmLnZhbHVlLFxuICAgICAgICBjbGlja0J1YmJsZTogdHJ1ZSxcbiAgICAgICAgbXVsdGlwbGU6IHNlbGYubXVsdGlwbGUsXG4gICAgICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBzZWxmLnBsYWNlaG9sZGVyLFxuICAgICAgICBhbGxvd0NsZWFyOiBzZWxmLmFsbG93Q2xlYXIsXG4gICAgICAgIGFqYXg6IHtcbiAgICAgICAgICAgIHVybDogYXJjaGVzLnVybHMucGFnZWRfZHJvcGRvd24sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgcXVpZXRNaWxsaXM6IDI1MCxcbiAgICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uKHJlcXVlc3RQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVybSA9IHJlcXVlc3RQYXJhbXMudGVybSB8fCAnJztcbiAgICAgICAgICAgICAgICBsZXQgcGFnZSA9IHJlcXVlc3RQYXJhbXMucGFnZSB8fCAxO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNlcHRpZDoga28udW53cmFwKHBhcmFtcy5ub2RlLmNvbmZpZy5yZG1Db2xsZWN0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHRlcm0sXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGxhbmc6IGtvLnVud3JhcChwYXJhbXMubGFuZylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuY29sbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVzdWx0LmlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IGRhdGEucmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibW9yZVwiOiBkYXRhLm1vcmVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlUmVzdWx0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICB2YXIgaW5kZW50YXRpb24gPSAnJztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5kZXB0aC0xOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbmRlbnRhdGlvbiArPSAnJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmRlbnRhdGlvbiArIGl0ZW0udGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnRleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVzY2FwZU1hcmt1cDogZnVuY3Rpb24obSkgeyByZXR1cm4gbTsgfSxcbiAgICAgICAgaW5pdENvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgaW5pdFNlbGVjdGlvbjogZnVuY3Rpb24oZWwsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWVMaXN0ID0gc2VsZi52YWx1ZUxpc3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNldFNlbGVjdGlvbkRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlRGF0YSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubXVsdGlwbGUgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZUxpc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHsgZGF0YSA9IFtkYXRhXTsgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVEYXRhID0gZGF0YS5tYXAoZnVuY3Rpb24odmFsdWVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdmFsdWVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBOQU1FX0xPT0tVUFt2YWx1ZUlkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIGFkZCB0aGUgcmVzdCBvZiB0aGUgcHJldmlvdXNseSBzZWxlY3RlZCB2YWx1ZXMgKi8gXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHZhbHVlRGF0YVswXS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlRGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBOQU1FX0xPT0tVUFt2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIGtlZXBzIHZhbHVlRGF0YSBvYmV5aW5nIHZhbHVlTGlzdCBhcyBvcmRlcmluZyBzb3VyY2Ugb2YgdHJ1dGggKi8gXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZURhdGFbMF0uaWQgIT09IHZhbHVlTGlzdFswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVEYXRhLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlRGF0YSA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IE5BTUVfTE9PS1VQW2RhdGFdLFxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIXNlbGYuc2VsZWN0MkNvbmZpZy5pbml0Q29tcGxldGUpe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZURhdGEuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gbmV3IE9wdGlvbihkYXRhLnRleHQsIGRhdGEuaWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlbCkuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdDJDb25maWcuaW5pdENvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodmFsdWVEYXRhKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrby51bndyYXAodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTkFNRV9MT09LVVBbdmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0aW9uRGF0YSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheChhcmNoZXMudXJscy5jb25jZXB0X3ZhbHVlICsgJz92YWx1ZWlkPScgKyBrby51bndyYXAodmFsdWUpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOQU1FX0xPT0tVUFt2YWx1ZV0gPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3Rpb25EYXRhKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soW10pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5zZWxlY3QyQ29uZmlnTXVsdGkgPSB7IC4uLnRoaXMuc2VsZWN0MkNvbmZpZyB9O1xuICAgIHRoaXMuc2VsZWN0MkNvbmZpZ011bHRpLm11bHRpcGxlID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmNlcHRTZWxlY3RWaWV3TW9kZWw7Il0sIm5hbWVzIjpbImtvIiwiJCIsImFyY2hlcyIsIldpZGdldFZpZXdNb2RlbCIsIk5BTUVfTE9PS1VQIiwiQ29uY2VwdFNlbGVjdFZpZXdNb2RlbCIsInBhcmFtcyIsIl9wYXJhbXMkYWxsb3dDbGVhciIsInNlbGYiLCJjb25maWdLZXlzIiwibXVsdGlwbGUiLCJhbGxvd0NsZWFyIiwiZGlzcGxheU5hbWUiLCJvYnNlcnZhYmxlIiwiYXBwbHkiLCJ2YWx1ZUxpc3QiLCJjb21wdXRlZCIsInZhbHVlIiwiZGVmYXVsdFZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwidmFsdWVPYmplY3RzIiwibWFwIiwiaWQiLCJuYW1lIiwiZmlsdGVyIiwiaXRlbSIsImRpc3BsYXlWYWx1ZSIsInZhbCIsImRpc3BsYXlWYWwiLCJzZXROYW1lcyIsIm5hbWVzIiwiZm9yRWFjaCIsInVud3JhcCIsInB1c2giLCJqb2luIiwiYWpheCIsInVybHMiLCJnZXRfcHJlZl9sYWJlbCIsImRhdGFUeXBlIiwiZG9uZSIsImRhdGEiLCJzdWJzY3JpYmUiLCJzZWxlY3QyQ29uZmlnIiwiY2xpY2tCdWJibGUiLCJjbG9zZU9uU2VsZWN0IiwicGxhY2Vob2xkZXIiLCJ1cmwiLCJwYWdlZF9kcm9wZG93biIsInF1aWV0TWlsbGlzIiwicmVxdWVzdFBhcmFtcyIsInRlcm0iLCJwYWdlIiwiY29uY2VwdGlkIiwibm9kZSIsImNvbmZpZyIsInJkbUNvbGxlY3Rpb24iLCJxdWVyeSIsImxhbmciLCJwcm9jZXNzUmVzdWx0cyIsInJlc3VsdHMiLCJyZXN1bHQiLCJjb2xsZWN0b3IiLCJtb3JlIiwidGVtcGxhdGVSZXN1bHQiLCJpbmRlbnRhdGlvbiIsImkiLCJkZXB0aCIsInRleHQiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsImVzY2FwZU1hcmt1cCIsIm0iLCJpbml0Q29tcGxldGUiLCJpbml0U2VsZWN0aW9uIiwiZWwiLCJjYWxsYmFjayIsInNldFNlbGVjdGlvbkRhdGEiLCJ2YWx1ZURhdGEiLCJ2YWx1ZUlkIiwicmV2ZXJzZSIsIm9wdGlvbiIsIk9wdGlvbiIsImFwcGVuZCIsImxlbmd0aCIsImNvbmNlcHRfdmFsdWUiLCJzZWxlY3QyQ29uZmlnTXVsdGkiLCJfb2JqZWN0U3ByZWFkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=