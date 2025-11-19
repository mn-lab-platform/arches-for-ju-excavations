"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[94227],{

/***/ 94227:
/*!*******************************************************************!*\
  !*** ./arches_slocal/media/js/cesium_viewer/cesium/tools/Tool.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tool: () => (/* binding */ Tool)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Tool = /*#__PURE__*/function () {
  function Tool(scene, name) {
    var callbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, Tool);
    this.widget = scene.widget;
    this.scale = scene.scale;
    this.name = name;
    this.callbacks = callbacks;
    this.active = false;
  }
  return _createClass(Tool, [{
    key: "activate",
    value: function activate() {
      // To be implemented by subclasses, should set this.active = true
      throw new Error('activate() must be implemented by subclass');
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      // To be implemented by subclasses, should set this.active = false
      throw new Error('deactivate() must be implemented by subclass');
    }
  }, {
    key: "_triggerCallback",
    value: function _triggerCallback(eventName) {
      if (this.callbacks[eventName]) {
        var _this$callbacks;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return (_this$callbacks = this.callbacks)[eventName].apply(_this$callbacks, args);
      }
    }
  }]);
}();

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYzY5ZjE4OGQxMWIxYjAwY2JlZWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLElBQU1BLElBQUk7RUFDZixTQUFBQSxLQUFZQyxLQUFLLEVBQUVDLElBQUksRUFBa0I7SUFBQSxJQUFoQkMsU0FBUyxHQUFBQyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxDQUFDLENBQUM7SUFBQUcsZUFBQSxPQUFBUCxJQUFBO0lBQ3JDLElBQUksQ0FBQ1EsTUFBTSxHQUFHUCxLQUFLLENBQUNPLE1BQU07SUFDMUIsSUFBSSxDQUFDQyxLQUFLLEdBQUdSLEtBQUssQ0FBQ1EsS0FBSztJQUN4QixJQUFJLENBQUNQLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNDLFNBQVMsR0FBR0EsU0FBUztJQUMxQixJQUFJLENBQUNPLE1BQU0sR0FBRyxLQUFLO0VBQ3JCO0VBQUMsT0FBQUMsWUFBQSxDQUFBWCxJQUFBO0lBQUFZLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFDLFFBQVFBLENBQUEsRUFBRztNQUNUO01BQ0EsTUFBTSxJQUFJQyxLQUFLLENBQUMsNENBQTRDLENBQUM7SUFDL0Q7RUFBQztJQUFBSCxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBRyxVQUFVQSxDQUFBLEVBQUc7TUFDWDtNQUNBLE1BQU0sSUFBSUQsS0FBSyxDQUFDLDhDQUE4QyxDQUFDO0lBQ2pFO0VBQUM7SUFBQUgsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQUksZ0JBQWdCQSxDQUFDQyxTQUFTLEVBQVc7TUFDbkMsSUFBSSxJQUFJLENBQUNmLFNBQVMsQ0FBQ2UsU0FBUyxDQUFDLEVBQUU7UUFBQSxJQUFBQyxlQUFBO1FBQUEsU0FBQUMsSUFBQSxHQUFBaEIsU0FBQSxDQUFBQyxNQUFBLEVBREZnQixJQUFJLE9BQUFDLEtBQUEsQ0FBQUYsSUFBQSxPQUFBQSxJQUFBLFdBQUFHLElBQUEsTUFBQUEsSUFBQSxHQUFBSCxJQUFBLEVBQUFHLElBQUE7VUFBSkYsSUFBSSxDQUFBRSxJQUFBLFFBQUFuQixTQUFBLENBQUFtQixJQUFBO1FBQUE7UUFFL0IsT0FBTyxDQUFBSixlQUFBLE9BQUksQ0FBQ2hCLFNBQVMsRUFBQ2UsU0FBUyxDQUFDLENBQUFNLEtBQUEsQ0FBQUwsZUFBQSxFQUFJRSxJQUFJLENBQUM7TUFDM0M7SUFDRjtFQUFDO0FBQUEsSSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9hcmNoZXNfc2xvY2FsL21lZGlhL2pzL2Nlc2l1bV92aWV3ZXIvY2VzaXVtL3Rvb2xzL1Rvb2wuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRvb2wge1xyXG4gIGNvbnN0cnVjdG9yKHNjZW5lLCBuYW1lLCBjYWxsYmFja3MgPSB7fSkge1xyXG4gICAgdGhpcy53aWRnZXQgPSBzY2VuZS53aWRnZXQ7XHJcbiAgICB0aGlzLnNjYWxlID0gc2NlbmUuc2NhbGU7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5jYWxsYmFja3MgPSBjYWxsYmFja3M7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH1cclxuICBcclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIC8vIFRvIGJlIGltcGxlbWVudGVkIGJ5IHN1YmNsYXNzZXMsIHNob3VsZCBzZXQgdGhpcy5hY3RpdmUgPSB0cnVlXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FjdGl2YXRlKCkgbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBzdWJjbGFzcycpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIC8vIFRvIGJlIGltcGxlbWVudGVkIGJ5IHN1YmNsYXNzZXMsIHNob3VsZCBzZXQgdGhpcy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdkZWFjdGl2YXRlKCkgbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBzdWJjbGFzcycpO1xyXG4gIH1cclxuXHJcbiAgX3RyaWdnZXJDYWxsYmFjayhldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIGlmICh0aGlzLmNhbGxiYWNrc1tldmVudE5hbWVdKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrc1tldmVudE5hbWVdKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJUb29sIiwic2NlbmUiLCJuYW1lIiwiY2FsbGJhY2tzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX2NsYXNzQ2FsbENoZWNrIiwid2lkZ2V0Iiwic2NhbGUiLCJhY3RpdmUiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsImFjdGl2YXRlIiwiRXJyb3IiLCJkZWFjdGl2YXRlIiwiX3RyaWdnZXJDYWxsYmFjayIsImV2ZW50TmFtZSIsIl90aGlzJGNhbGxiYWNrcyIsIl9sZW4iLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiYXBwbHkiXSwic291cmNlUm9vdCI6IiJ9