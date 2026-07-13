"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[25476],{

/***/ 25476:
/*!****************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/strings.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



var stringUtils = {
  compareTwoStrings: function compareTwoStrings(str1, str2) {
    // uses dice coefficient for string similarity score
    if (str1.length < 2 || str2.length < 2) return 0;
    var set1 = new Set();
    var set2 = new Set();
    for (var i = 0; i < str1.length - 1; i++) {
      var bigram = str1.substr(i, 2);
      set1.add(bigram);
    }
    for (var _i = 0; _i < str2.length - 1; _i++) {
      var _bigram = str2.substr(_i, 2);
      set2.add(_bigram);
    }
    var intersection = new Set(_toConsumableArray(set1).filter(function (x) {
      return set2.has(x);
    }));
    return 2 * intersection.size / (set1.size + set2.size);
  },
  normalizeText: function normalizeText(text) {
    return text.toLowerCase().replace(/\W+/g, '');
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringUtils);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNmEzYmNhZTRmNzExN2U0MzliMjUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0c7QUFDRTtBQUU1QixJQUFNRyxXQUFXLEdBQUc7RUFDaEJDLGlCQUFpQixFQUFFLFNBQW5CQSxpQkFBaUJBLENBQVdDLElBQUksRUFBRUMsSUFBSSxFQUFFO0lBQ3BDO0lBQ0EsSUFBSUQsSUFBSSxDQUFDRSxNQUFNLEdBQUcsQ0FBQyxJQUFJRCxJQUFJLENBQUNDLE1BQU0sR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ2hELElBQUlDLElBQUksR0FBRyxJQUFJQyxHQUFHLENBQUMsQ0FBQztJQUNwQixJQUFJQyxJQUFJLEdBQUcsSUFBSUQsR0FBRyxDQUFDLENBQUM7SUFDcEIsS0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdOLElBQUksQ0FBQ0UsTUFBTSxHQUFHLENBQUMsRUFBRUksQ0FBQyxFQUFFLEVBQUU7TUFDdEMsSUFBTUMsTUFBTSxHQUFHUCxJQUFJLENBQUNRLE1BQU0sQ0FBQ0YsQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUNoQ0gsSUFBSSxDQUFDTSxHQUFHLENBQUNGLE1BQU0sQ0FBQztJQUNwQjtJQUNBLEtBQUssSUFBSUQsRUFBQyxHQUFHLENBQUMsRUFBRUEsRUFBQyxHQUFHTCxJQUFJLENBQUNDLE1BQU0sR0FBRyxDQUFDLEVBQUVJLEVBQUMsRUFBRSxFQUFFO01BQ3RDLElBQU1DLE9BQU0sR0FBR04sSUFBSSxDQUFDTyxNQUFNLENBQUNGLEVBQUMsRUFBRSxDQUFDLENBQUM7TUFDaENELElBQUksQ0FBQ0ksR0FBRyxDQUFDRixPQUFNLENBQUM7SUFDcEI7SUFDQSxJQUFNRyxZQUFZLEdBQUcsSUFBSU4sR0FBRyxDQUFDTyxrQkFBQSxDQUFJUixJQUFJLEVBQUVTLE1BQU0sQ0FBQyxVQUFBQyxDQUFDO01BQUEsT0FBSVIsSUFBSSxDQUFDUyxHQUFHLENBQUNELENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FBQztJQUNoRSxPQUFRLENBQUMsR0FBR0gsWUFBWSxDQUFDSyxJQUFJLElBQUtaLElBQUksQ0FBQ1ksSUFBSSxHQUFHVixJQUFJLENBQUNVLElBQUksQ0FBQztFQUM1RCxDQUFDO0VBQ0RDLGFBQWEsRUFBRSxTQUFmQSxhQUFhQSxDQUFXQyxJQUFJLEVBQUU7SUFBRSxPQUFPQSxJQUFJLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0VBQUU7QUFDbkYsQ0FBQztBQUVELGlFQUFlckIsV0FBVyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdXRpbHMvc3RyaW5ncy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcblxuY29uc3Qgc3RyaW5nVXRpbHMgPSB7XG4gICAgY29tcGFyZVR3b1N0cmluZ3M6IGZ1bmN0aW9uKHN0cjEsIHN0cjIpIHtcbiAgICAgICAgLy8gdXNlcyBkaWNlIGNvZWZmaWNpZW50IGZvciBzdHJpbmcgc2ltaWxhcml0eSBzY29yZVxuICAgICAgICBpZiAoc3RyMS5sZW5ndGggPCAyIHx8IHN0cjIubGVuZ3RoIDwgMikgcmV0dXJuIDA7XG4gICAgICAgIGxldCBzZXQxID0gbmV3IFNldCgpO1xuICAgICAgICBsZXQgc2V0MiA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIxLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYmlncmFtID0gc3RyMS5zdWJzdHIoaSwgMik7XG4gICAgICAgICAgICBzZXQxLmFkZChiaWdyYW0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyMi5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJpZ3JhbSA9IHN0cjIuc3Vic3RyKGksIDIpO1xuICAgICAgICAgICAgc2V0Mi5hZGQoYmlncmFtKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBuZXcgU2V0KFsuLi5zZXQxXS5maWx0ZXIoeCA9PiBzZXQyLmhhcyh4KSkpO1xuICAgICAgICByZXR1cm4gKDIgKiBpbnRlcnNlY3Rpb24uc2l6ZSkgLyAoc2V0MS5zaXplICsgc2V0Mi5zaXplKTtcbiAgICB9LFxuICAgIG5vcm1hbGl6ZVRleHQ6IGZ1bmN0aW9uKHRleHQpIHsgcmV0dXJuIHRleHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXFcrL2csICcnKTsgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ1V0aWxzO1xuIl0sIm5hbWVzIjpbIiQiLCJrbyIsImFyY2hlcyIsInN0cmluZ1V0aWxzIiwiY29tcGFyZVR3b1N0cmluZ3MiLCJzdHIxIiwic3RyMiIsImxlbmd0aCIsInNldDEiLCJTZXQiLCJzZXQyIiwiaSIsImJpZ3JhbSIsInN1YnN0ciIsImFkZCIsImludGVyc2VjdGlvbiIsIl90b0NvbnN1bWFibGVBcnJheSIsImZpbHRlciIsIngiLCJoYXMiLCJzaXplIiwibm9ybWFsaXplVGV4dCIsInRleHQiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==