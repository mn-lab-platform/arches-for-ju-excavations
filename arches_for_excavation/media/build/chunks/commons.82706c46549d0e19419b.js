"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[70614],{

/***/ 47069:
/*!***********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/set-csrf-token.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ 12215);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);



/**
 * csrfSafeMethod - checks if the request method is CSRF safe (using regex)
 * this function is called before every request made using jQuery, and
 * the CSRF token is set accordingly
 *
 * @param  {string} the request method name
 * @return {boolean} true if the method is CSRF safe
 */
function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}
jquery__WEBPACK_IMPORTED_MODULE_0___default().ajaxSetup({
  beforeSend: function beforeSend(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", js_cookie__WEBPACK_IMPORTED_MODULE_1___default().get('csrftoken'));
    }
  }
});

/***/ }),

/***/ 70614:
/*!******************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/template-loader.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! arches */ 77126);


knockout__WEBPACK_IMPORTED_MODULE_0___default().components.loaders.unshift({
  loadTemplate: function loadTemplate(_name, relativeTemplatePath, callback) {
    fetch(arches__WEBPACK_IMPORTED_MODULE_1__["default"].urls.root + relativeTemplatePath).then(function (response) {
      return response.text();
    }).then(function (html) {
      var range = document.createRange();
      range.selectNode(document.body);
      var fragment = range.createContextualFragment(html);
      callback(Array.from(fragment.childNodes));
    }).catch(function (error) {
      console.error('Template load failed:', relativeTemplatePath, error);
    });
  }
});

/***/ }),

/***/ 77126:
/*!*********************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var utils_set_csrf_token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/set-csrf-token */ 47069);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

function removeTrailingCommaFromArray(string) {
  return string.replace(/, *]*$/, "]");
}
function removeTrailingCommaFromObject(string) {
  return string.replace(/,\s*}*$/, "}");
}
function convertToCamelCase(string) {
  return string.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}
var archesUrlHTMLObjects = document.querySelectorAll('.arches-urls');
var parsedArchesUrls = {};
var _iterator = _createForOfIteratorHelper(archesUrlHTMLObjects),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var archesUrlHTMLObject = _step.value;
    var _iterator4 = _createForOfIteratorHelper(archesUrlHTMLObject.attributes),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var attribute = _step4.value;
        if (attribute.specified && attribute.name !== 'style' && attribute.name !== 'class') {
          try {
            var functionFromString = Function("return" + attribute.value);
            var result = functionFromString();
            if (!result) {
              result = "";
            }
            if (_typeof(result) === 'object') {
              result = String(result);
            }
            parsedArchesUrls[attribute.name] = result;
          } catch (error) {
            parsedArchesUrls[attribute.name] = String(attribute.value);
          }
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
var archesTranslationsHTMLObjects = document.querySelectorAll('.arches-translations');
var parsedArchesTranslations = {};
var _iterator2 = _createForOfIteratorHelper(archesTranslationsHTMLObjects),
  _step2;
try {
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    var archesTranslationsHTMLObject = _step2.value;
    var _iterator5 = _createForOfIteratorHelper(archesTranslationsHTMLObject.attributes),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _attribute = _step5.value;
        if (_attribute.specified && _attribute.name !== 'style' && _attribute.name !== 'class') {
          try {
            var _functionFromString = Function("return" + _attribute.value);
            var _result = _functionFromString();
            if (!_result) {
              _result = "";
            }
            parsedArchesTranslations[convertToCamelCase(_attribute.name)] = _result;
          } catch (error) {
            parsedArchesTranslations[convertToCamelCase(_attribute.name)] = JSON.parse(_attribute.value);
          }
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}
var archesDataHTMLObjects = document.querySelectorAll('.arches-data');
var parsedArchesData = {};
var _iterator3 = _createForOfIteratorHelper(archesDataHTMLObjects),
  _step3;
try {
  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
    var archesDataHTMLObject = _step3.value;
    var _iterator6 = _createForOfIteratorHelper(archesDataHTMLObject.attributes),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _attribute2 = _step6.value;
        if (_attribute2.specified && _attribute2.name !== 'style' && _attribute2.name !== 'class') {
          var camelCaseName = convertToCamelCase(_attribute2.name);
          try {
            parsedArchesData[camelCaseName] = JSON.parse(_attribute2.value);
          } catch (e) {
            try {
              parsedArchesData[camelCaseName] = JSON.parse(removeTrailingCommaFromObject(_attribute2.value));
            } catch (e) {
              try {
                parsedArchesData[camelCaseName] = JSON.parse(removeTrailingCommaFromArray(_attribute2.value));
              } catch (e) {
                parsedArchesData[camelCaseName] = JSON.parse("\"".concat(_attribute2.value, "\""));
              }
            }
          }
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }
} catch (err) {
  _iterator3.e(err);
} finally {
  _iterator3.f();
}
var archesObject = _objectSpread({}, parsedArchesData);
if (Object.keys(parsedArchesTranslations).length) {
  archesObject["translations"] = parsedArchesTranslations;
}
if (Object.keys(parsedArchesUrls).length) {
  archesObject["urls"] = parsedArchesUrls;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (archesObject);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVksQ0FBQyxNQUFNLENBQUMsR0FBR3pDLGdCQUFnQjtBQUMzQztBQUVBLGlFQUFleUMsWUFBWSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdXRpbHMvc2V0LWNzcmYtdG9rZW4uanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdGVtcGxhdGUtbG9hZGVyLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2FyY2hlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IENvb2tpZXMgZnJvbSAnanMtY29va2llJztcblxuLyoqXG4gKiBjc3JmU2FmZU1ldGhvZCAtIGNoZWNrcyBpZiB0aGUgcmVxdWVzdCBtZXRob2QgaXMgQ1NSRiBzYWZlICh1c2luZyByZWdleClcbiAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGJlZm9yZSBldmVyeSByZXF1ZXN0IG1hZGUgdXNpbmcgalF1ZXJ5LCBhbmRcbiAqIHRoZSBDU1JGIHRva2VuIGlzIHNldCBhY2NvcmRpbmdseVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdGhlIHJlcXVlc3QgbWV0aG9kIG5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIG1ldGhvZCBpcyBDU1JGIHNhZmVcbiAqL1xuZnVuY3Rpb24gY3NyZlNhZmVNZXRob2QobWV0aG9kKSB7XG4gICAgLy8gdGhlc2UgSFRUUCBtZXRob2RzIGRvIG5vdCByZXF1aXJlIENTUkYgcHJvdGVjdGlvblxuICAgIHJldHVybiAoL14oR0VUfEhFQUR8T1BUSU9OU3xUUkFDRSkkLy50ZXN0KG1ldGhvZCkpO1xufVxuXG4kLmFqYXhTZXR1cCh7XG4gICAgYmVmb3JlU2VuZDogZnVuY3Rpb24oeGhyLCBzZXR0aW5ncykge1xuICAgICAgICBpZiAoIWNzcmZTYWZlTWV0aG9kKHNldHRpbmdzLnR5cGUpICYmICF0aGlzLmNyb3NzRG9tYWluKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIlgtQ1NSRlRva2VuXCIsIENvb2tpZXMuZ2V0KCdjc3JmdG9rZW4nKSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5cbmtvLmNvbXBvbmVudHMubG9hZGVycy51bnNoaWZ0KHtcbiAgICBsb2FkVGVtcGxhdGU6IGZ1bmN0aW9uIChfbmFtZSwgcmVsYXRpdmVUZW1wbGF0ZVBhdGgsIGNhbGxiYWNrKSB7XG4gICAgICAgIGZldGNoKGFyY2hlcy51cmxzLnJvb3QgKyByZWxhdGl2ZVRlbXBsYXRlUGF0aCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB9KS50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShkb2N1bWVudC5ib2R5KTtcblxuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoaHRtbCk7XG4gICAgICAgICAgICBjYWxsYmFjayhBcnJheS5mcm9tKGZyYWdtZW50LmNoaWxkTm9kZXMpKTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGVtcGxhdGUgbG9hZCBmYWlsZWQ6JywgcmVsYXRpdmVUZW1wbGF0ZVBhdGgsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iLCJpbXBvcnQgJ3V0aWxzL3NldC1jc3JmLXRva2VuJztcblxuZnVuY3Rpb24gcmVtb3ZlVHJhaWxpbmdDb21tYUZyb21BcnJheShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLywgKl0qJC8sIFwiXVwiKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlVHJhaWxpbmdDb21tYUZyb21PYmplY3Qoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8sXFxzKn0qJC8sIFwifVwiKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFRvQ2FtZWxDYXNlKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24gKGcpIHsgcmV0dXJuIGdbMV0udG9VcHBlckNhc2UoKTsgfSk7XG59XG5cbmNvbnN0IGFyY2hlc1VybEhUTUxPYmplY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFyY2hlcy11cmxzJyk7XG5jb25zdCBwYXJzZWRBcmNoZXNVcmxzID0ge307XG5mb3IgKGxldCBhcmNoZXNVcmxIVE1MT2JqZWN0IG9mIGFyY2hlc1VybEhUTUxPYmplY3RzKSB7XG4gICAgZm9yIChsZXQgYXR0cmlidXRlIG9mIGFyY2hlc1VybEhUTUxPYmplY3QuYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoYXR0cmlidXRlLnNwZWNpZmllZCAmJiBhdHRyaWJ1dGUubmFtZSAhPT0gJ3N0eWxlJyAmJiBhdHRyaWJ1dGUubmFtZSAhPT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgZnVuY3Rpb25Gcm9tU3RyaW5nID0gRnVuY3Rpb24oXCJyZXR1cm5cIiArIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZ1bmN0aW9uRnJvbVN0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBTdHJpbmcocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyc2VkQXJjaGVzVXJsc1thdHRyaWJ1dGUubmFtZV0gPSByZXN1bHQ7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHBhcnNlZEFyY2hlc1VybHNbYXR0cmlidXRlLm5hbWVdID0gU3RyaW5nKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IGFyY2hlc1RyYW5zbGF0aW9uc0hUTUxPYmplY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFyY2hlcy10cmFuc2xhdGlvbnMnKTtcbmNvbnN0IHBhcnNlZEFyY2hlc1RyYW5zbGF0aW9ucyA9IHt9O1xuZm9yIChsZXQgYXJjaGVzVHJhbnNsYXRpb25zSFRNTE9iamVjdCBvZiBhcmNoZXNUcmFuc2xhdGlvbnNIVE1MT2JqZWN0cykge1xuICAgIGZvciAobGV0IGF0dHJpYnV0ZSBvZiBhcmNoZXNUcmFuc2xhdGlvbnNIVE1MT2JqZWN0LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZS5zcGVjaWZpZWQgJiYgYXR0cmlidXRlLm5hbWUgIT09ICdzdHlsZScgJiYgYXR0cmlidXRlLm5hbWUgIT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGZ1bmN0aW9uRnJvbVN0cmluZyA9IEZ1bmN0aW9uKFwicmV0dXJuXCIgKyBhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBmdW5jdGlvbkZyb21TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJzZWRBcmNoZXNUcmFuc2xhdGlvbnNbY29udmVydFRvQ2FtZWxDYXNlKGF0dHJpYnV0ZS5uYW1lKV0gPSByZXN1bHQ7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHBhcnNlZEFyY2hlc1RyYW5zbGF0aW9uc1tjb252ZXJ0VG9DYW1lbENhc2UoYXR0cmlidXRlLm5hbWUpXSA9IEpTT04ucGFyc2UoYXR0cmlidXRlLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgYXJjaGVzRGF0YUhUTUxPYmplY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFyY2hlcy1kYXRhJyk7XG5jb25zdCBwYXJzZWRBcmNoZXNEYXRhID0ge307XG5mb3IgKGxldCBhcmNoZXNEYXRhSFRNTE9iamVjdCBvZiBhcmNoZXNEYXRhSFRNTE9iamVjdHMpIHtcbiAgICBmb3IgKGxldCBhdHRyaWJ1dGUgb2YgYXJjaGVzRGF0YUhUTUxPYmplY3QuYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoYXR0cmlidXRlLnNwZWNpZmllZCAmJiBhdHRyaWJ1dGUubmFtZSAhPT0gJ3N0eWxlJyAmJiBhdHRyaWJ1dGUubmFtZSAhPT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgY29uc3QgY2FtZWxDYXNlTmFtZSA9IGNvbnZlcnRUb0NhbWVsQ2FzZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnNlZEFyY2hlc0RhdGFbY2FtZWxDYXNlTmFtZV0gPSBKU09OLnBhcnNlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkQXJjaGVzRGF0YVtjYW1lbENhc2VOYW1lXSA9IEpTT04ucGFyc2UocmVtb3ZlVHJhaWxpbmdDb21tYUZyb21PYmplY3QoYXR0cmlidXRlLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkQXJjaGVzRGF0YVtjYW1lbENhc2VOYW1lXSA9IEpTT04ucGFyc2UocmVtb3ZlVHJhaWxpbmdDb21tYUZyb21BcnJheShhdHRyaWJ1dGUudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkQXJjaGVzRGF0YVtjYW1lbENhc2VOYW1lXSA9IEpTT04ucGFyc2UoYFwiJHthdHRyaWJ1dGUudmFsdWV9XCJgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgYXJjaGVzT2JqZWN0ID0geyAuLi5wYXJzZWRBcmNoZXNEYXRhIH07XG5cbmlmIChPYmplY3Qua2V5cyhwYXJzZWRBcmNoZXNUcmFuc2xhdGlvbnMpLmxlbmd0aCkge1xuICAgIGFyY2hlc09iamVjdFtcInRyYW5zbGF0aW9uc1wiXSA9IHBhcnNlZEFyY2hlc1RyYW5zbGF0aW9ucztcbn1cbmlmIChPYmplY3Qua2V5cyhwYXJzZWRBcmNoZXNVcmxzKS5sZW5ndGgpIHtcbiAgICBhcmNoZXNPYmplY3RbXCJ1cmxzXCJdID0gcGFyc2VkQXJjaGVzVXJscztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJjaGVzT2JqZWN0O1xuIl0sIm5hbWVzIjpbIiQiLCJDb29raWVzIiwiY3NyZlNhZmVNZXRob2QiLCJtZXRob2QiLCJ0ZXN0IiwiYWpheFNldHVwIiwiYmVmb3JlU2VuZCIsInhociIsInNldHRpbmdzIiwidHlwZSIsImNyb3NzRG9tYWluIiwic2V0UmVxdWVzdEhlYWRlciIsImdldCIsImtvIiwiYXJjaGVzIiwiY29tcG9uZW50cyIsImxvYWRlcnMiLCJ1bnNoaWZ0IiwibG9hZFRlbXBsYXRlIiwiX25hbWUiLCJyZWxhdGl2ZVRlbXBsYXRlUGF0aCIsImNhbGxiYWNrIiwiZmV0Y2giLCJ1cmxzIiwicm9vdCIsInRoZW4iLCJyZXNwb25zZSIsInRleHQiLCJodG1sIiwicmFuZ2UiLCJkb2N1bWVudCIsImNyZWF0ZVJhbmdlIiwic2VsZWN0Tm9kZSIsImJvZHkiLCJmcmFnbWVudCIsImNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCIsIkFycmF5IiwiZnJvbSIsImNoaWxkTm9kZXMiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsInJlbW92ZVRyYWlsaW5nQ29tbWFGcm9tQXJyYXkiLCJzdHJpbmciLCJyZXBsYWNlIiwicmVtb3ZlVHJhaWxpbmdDb21tYUZyb21PYmplY3QiLCJjb252ZXJ0VG9DYW1lbENhc2UiLCJnIiwidG9VcHBlckNhc2UiLCJhcmNoZXNVcmxIVE1MT2JqZWN0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwYXJzZWRBcmNoZXNVcmxzIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsImFyY2hlc1VybEhUTUxPYmplY3QiLCJ2YWx1ZSIsIl9pdGVyYXRvcjQiLCJhdHRyaWJ1dGVzIiwiX3N0ZXA0IiwiYXR0cmlidXRlIiwic3BlY2lmaWVkIiwibmFtZSIsImZ1bmN0aW9uRnJvbVN0cmluZyIsIkZ1bmN0aW9uIiwicmVzdWx0IiwiX3R5cGVvZiIsIlN0cmluZyIsImVyciIsImUiLCJmIiwiYXJjaGVzVHJhbnNsYXRpb25zSFRNTE9iamVjdHMiLCJwYXJzZWRBcmNoZXNUcmFuc2xhdGlvbnMiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiYXJjaGVzVHJhbnNsYXRpb25zSFRNTE9iamVjdCIsIl9pdGVyYXRvcjUiLCJfc3RlcDUiLCJKU09OIiwicGFyc2UiLCJhcmNoZXNEYXRhSFRNTE9iamVjdHMiLCJwYXJzZWRBcmNoZXNEYXRhIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsImFyY2hlc0RhdGFIVE1MT2JqZWN0IiwiX2l0ZXJhdG9yNiIsIl9zdGVwNiIsImNhbWVsQ2FzZU5hbWUiLCJjb25jYXQiLCJhcmNoZXNPYmplY3QiLCJfb2JqZWN0U3ByZWFkIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9