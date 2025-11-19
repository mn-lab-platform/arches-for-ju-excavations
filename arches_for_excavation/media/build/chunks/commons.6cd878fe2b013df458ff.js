"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[5349],{

/***/ 5349:
/*!*************************************************************************!*\
  !*** ./arches_slocal/media/js/cesium_viewer/cesium/tools/PickerTool.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PickerTool: () => (/* binding */ PickerTool)
/* harmony export */ });
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cesium */ 37754);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cesium */ 41476);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cesium */ 86881);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cesium */ 49785);
/* harmony import */ var _Tool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tool.js */ 94227);
/* harmony import */ var _const_constTools_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../const/constTools.js */ 97846);
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/utils.js */ 31537);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var PickerTool = /*#__PURE__*/function (_Tool) {
  function PickerTool(widget, name, callbacks) {
    var _this;
    _classCallCheck(this, PickerTool);
    _this = _callSuper(this, PickerTool, [widget, name, callbacks]);
    _this.handler = null;
    _this.pickedAnnotation = null;
    return _this;
  }
  _inherits(PickerTool, _Tool);
  return _createClass(PickerTool, [{
    key: "activate",
    value: function activate() {
      var _this2 = this;
      this.active = true;
      this.handler = new cesium__WEBPACK_IMPORTED_MODULE_2__["default"](this.widget.canvas);
      this.handler.setInputAction(function (click) {
        var pickedObject = _this2.widget.scene.pick(click.position);
        if (pickedObject) {
          if (pickedObject && pickedObject.id instanceof cesium__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            _this2.pickedAnnotation = pickedObject.id;
            _this2._triggerCallback(_const_constTools_js__WEBPACK_IMPORTED_MODULE_5__.TOOL_CALLBACKS.ON_ANNOTATION_PICKED, _utils_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"].extractAnnotationData(_this2.pickedAnnotation));
          }
        }
      }, cesium__WEBPACK_IMPORTED_MODULE_3__["default"].LEFT_CLICK);
    }
  }, {
    key: "saveAnnotation",
    value: function saveAnnotation(annotationData) {
      if (this.pickedAnnotation) {
        this.pickedAnnotation.name = annotationData.name;
        this.pickedAnnotation.description = annotationData.description;
        this.pickedAnnotation.polygon.material = cesium__WEBPACK_IMPORTED_MODULE_1__["default"].fromCssColorString(annotationData.color).withAlpha(0.6);
        this._triggerCallback(_const_constTools_js__WEBPACK_IMPORTED_MODULE_5__.TOOL_CALLBACKS.ON_ANNOTATION_SAVED, _utils_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"].extractAnnotationData(this.pickedAnnotation));
        this.pickedAnnotation = null;
      }
    }
  }, {
    key: "cancelAnnotation",
    value: function cancelAnnotation() {
      this.pickedAnnotation = null;
    }
  }, {
    key: "deleteAnnotation",
    value: function deleteAnnotation() {
      if (this.pickedAnnotation) {
        this._triggerCallback(_const_constTools_js__WEBPACK_IMPORTED_MODULE_5__.TOOL_CALLBACKS.ON_ANNOTATION_DELETED, this.pickedAnnotation.id);
        this.widget.entities.remove(this.pickedAnnotation);
        this.pickedAnnotation = null;
      }
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.active = false;
      if (this.handler) {
        this.handler.destroy();
        this.handler = null;
      }
      this.pickedAnnotation = null;
    }
  }]);
}(_Tool_js__WEBPACK_IMPORTED_MODULE_4__.Tool);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YyxDQUFDMEMscUJBQXFCLEVBQUUsSUFBSSxDQUFDL0IsZ0JBQWdCLENBQUNlLEVBQUUsQ0FBQztRQUNyRixJQUFJLENBQUN0QixNQUFNLENBQUN1QyxRQUFRLENBQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUNqQyxnQkFBZ0IsQ0FBQztRQUNsRCxJQUFJLENBQUNBLGdCQUFnQixHQUFHLElBQUk7TUFDaEM7SUFDSjtFQUFDO0lBQUFHLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUE4QixVQUFVQSxDQUFBLEVBQUc7TUFDVCxJQUFJLENBQUMzQixNQUFNLEdBQUcsS0FBSztNQUNuQixJQUFJLElBQUksQ0FBQ1IsT0FBTyxFQUFFO1FBQ2QsSUFBSSxDQUFDQSxPQUFPLENBQUNvQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUNwQyxPQUFPLEdBQUcsSUFBSTtNQUN2QjtNQUNBLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUcsSUFBSTtJQUNoQztFQUFDO0FBQUEsRUFyRDJCWiwwQ0FBSSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL2FyY2hlc19zbG9jYWwvbWVkaWEvanMvY2VzaXVtX3ZpZXdlci9jZXNpdW0vdG9vbHMvUGlja2VyVG9vbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY3JlZW5TcGFjZUV2ZW50VHlwZSwgU2NyZWVuU3BhY2VFdmVudEhhbmRsZXIsIEVudGl0eSwgQ29sb3IgfSBmcm9tICdjZXNpdW0nO1xyXG5pbXBvcnQgeyBUb29sIH0gZnJvbSAnLi9Ub29sLmpzJztcclxuaW1wb3J0IHsgVE9PTF9DQUxMQkFDS1MgfSBmcm9tICcuLi8uLi9jb25zdC9jb25zdFRvb2xzLmpzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQaWNrZXJUb29sIGV4dGVuZHMgVG9vbCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3aWRnZXQsIG5hbWUsIGNhbGxiYWNrcykge1xyXG4gICAgICAgIHN1cGVyKHdpZGdldCwgbmFtZSwgY2FsbGJhY2tzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGlja2VkQW5ub3RhdGlvbiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlciA9IG5ldyBTY3JlZW5TcGFjZUV2ZW50SGFuZGxlcih0aGlzLndpZGdldC5jYW52YXMpO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXIuc2V0SW5wdXRBY3Rpb24oKGNsaWNrKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpY2tlZE9iamVjdCA9IHRoaXMud2lkZ2V0LnNjZW5lLnBpY2soY2xpY2sucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBpZiAocGlja2VkT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGlja2VkT2JqZWN0ICYmIHBpY2tlZE9iamVjdC5pZCBpbnN0YW5jZW9mIEVudGl0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VkQW5ub3RhdGlvbiA9IHBpY2tlZE9iamVjdC5pZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2FsbGJhY2soVE9PTF9DQUxMQkFDS1MuT05fQU5OT1RBVElPTl9QSUNLRUQsIHV0aWxzLmV4dHJhY3RBbm5vdGF0aW9uRGF0YSh0aGlzLnBpY2tlZEFubm90YXRpb24pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCBTY3JlZW5TcGFjZUV2ZW50VHlwZS5MRUZUX0NMSUNLKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQW5ub3RhdGlvbihhbm5vdGF0aW9uRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLnBpY2tlZEFubm90YXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5waWNrZWRBbm5vdGF0aW9uLm5hbWUgPSBhbm5vdGF0aW9uRGF0YS5uYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnBpY2tlZEFubm90YXRpb24uZGVzY3JpcHRpb24gPSBhbm5vdGF0aW9uRGF0YS5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5waWNrZWRBbm5vdGF0aW9uLnBvbHlnb24ubWF0ZXJpYWwgPSBDb2xvci5mcm9tQ3NzQ29sb3JTdHJpbmcoYW5ub3RhdGlvbkRhdGEuY29sb3IpLndpdGhBbHBoYSgwLjYpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNhbGxiYWNrKFRPT0xfQ0FMTEJBQ0tTLk9OX0FOTk9UQVRJT05fU0FWRUQsIHV0aWxzLmV4dHJhY3RBbm5vdGF0aW9uRGF0YSh0aGlzLnBpY2tlZEFubm90YXRpb24pKTtcclxuICAgICAgICAgICAgdGhpcy5waWNrZWRBbm5vdGF0aW9uID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsQW5ub3RhdGlvbigpIHtcclxuICAgICAgICB0aGlzLnBpY2tlZEFubm90YXRpb24gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUFubm90YXRpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGlja2VkQW5ub3RhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2FsbGJhY2soVE9PTF9DQUxMQkFDS1MuT05fQU5OT1RBVElPTl9ERUxFVEVELCB0aGlzLnBpY2tlZEFubm90YXRpb24uaWQpO1xyXG4gICAgICAgICAgICB0aGlzLndpZGdldC5lbnRpdGllcy5yZW1vdmUodGhpcy5waWNrZWRBbm5vdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5waWNrZWRBbm5vdGF0aW9uID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5waWNrZWRBbm5vdGF0aW9uID0gbnVsbDtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiU2NyZWVuU3BhY2VFdmVudFR5cGUiLCJTY3JlZW5TcGFjZUV2ZW50SGFuZGxlciIsIkVudGl0eSIsIkNvbG9yIiwiVG9vbCIsIlRPT0xfQ0FMTEJBQ0tTIiwidXRpbHMiLCJQaWNrZXJUb29sIiwiX1Rvb2wiLCJ3aWRnZXQiLCJuYW1lIiwiY2FsbGJhY2tzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiaGFuZGxlciIsInBpY2tlZEFubm90YXRpb24iLCJfaW5oZXJpdHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsImFjdGl2YXRlIiwiX3RoaXMyIiwiYWN0aXZlIiwiY2FudmFzIiwic2V0SW5wdXRBY3Rpb24iLCJjbGljayIsInBpY2tlZE9iamVjdCIsInNjZW5lIiwicGljayIsInBvc2l0aW9uIiwiaWQiLCJfdHJpZ2dlckNhbGxiYWNrIiwiT05fQU5OT1RBVElPTl9QSUNLRUQiLCJleHRyYWN0QW5ub3RhdGlvbkRhdGEiLCJMRUZUX0NMSUNLIiwic2F2ZUFubm90YXRpb24iLCJhbm5vdGF0aW9uRGF0YSIsImRlc2NyaXB0aW9uIiwicG9seWdvbiIsIm1hdGVyaWFsIiwiZnJvbUNzc0NvbG9yU3RyaW5nIiwiY29sb3IiLCJ3aXRoQWxwaGEiLCJPTl9BTk5PVEFUSU9OX1NBVkVEIiwiY2FuY2VsQW5ub3RhdGlvbiIsImRlbGV0ZUFubm90YXRpb24iLCJPTl9BTk5PVEFUSU9OX0RFTEVURUQiLCJlbnRpdGllcyIsInJlbW92ZSIsImRlYWN0aXZhdGUiLCJkZXN0cm95Il0sInNvdXJjZVJvb3QiOiIifQ==