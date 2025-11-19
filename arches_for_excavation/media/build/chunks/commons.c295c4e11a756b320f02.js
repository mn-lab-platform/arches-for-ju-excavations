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
/* harmony import */ var _const_const_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../const/const.js */ 64373);
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
  function PickerTool(scene, name, callbacks) {
    var _this;
    _classCallCheck(this, PickerTool);
    _this = _callSuper(this, PickerTool, [scene, name, callbacks]);
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
            _this2._triggerCallback(_const_const_js__WEBPACK_IMPORTED_MODULE_5__.TOOL_CALLBACKS.ON_ANNOTATION_PICKED, _utils_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"].extractAnnotationData(_this2.pickedAnnotation));
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
        this._triggerCallback(_const_const_js__WEBPACK_IMPORTED_MODULE_5__.TOOL_CALLBACKS.ON_ANNOTATION_SAVED, _utils_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"].extractAnnotationData(this.pickedAnnotation));
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
        this._triggerCallback(_const_const_js__WEBPACK_IMPORTED_MODULE_5__.TOOL_CALLBACKS.ON_ANNOTATION_DELETED, this.pickedAnnotation.id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YyxDQUFDMEMscUJBQXFCLEVBQUUsSUFBSSxDQUFDL0IsZ0JBQWdCLENBQUNlLEVBQUUsQ0FBQztRQUNyRixJQUFJLENBQUNQLE1BQU0sQ0FBQ3dCLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQ2pDLGdCQUFnQixDQUFDO1FBQ2xELElBQUksQ0FBQ0EsZ0JBQWdCLEdBQUcsSUFBSTtNQUNoQztJQUNKO0VBQUM7SUFBQUcsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQThCLFVBQVVBLENBQUEsRUFBRztNQUNULElBQUksQ0FBQzNCLE1BQU0sR0FBRyxLQUFLO01BQ25CLElBQUksSUFBSSxDQUFDUixPQUFPLEVBQUU7UUFDZCxJQUFJLENBQUNBLE9BQU8sQ0FBQ29DLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQ3BDLE9BQU8sR0FBRyxJQUFJO01BQ3ZCO01BQ0EsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBRyxJQUFJO0lBQ2hDO0VBQUM7QUFBQSxFQXJEMkJaLDBDQUFJLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vYXJjaGVzX3Nsb2NhbC9tZWRpYS9qcy9jZXNpdW1fdmlld2VyL2Nlc2l1bS90b29scy9QaWNrZXJUb29sLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjcmVlblNwYWNlRXZlbnRUeXBlLCBTY3JlZW5TcGFjZUV2ZW50SGFuZGxlciwgRW50aXR5LCBDb2xvciB9IGZyb20gJ2Nlc2l1bSc7XHJcbmltcG9ydCB7IFRvb2wgfSBmcm9tICcuL1Rvb2wuanMnO1xyXG5pbXBvcnQgeyBUT09MX0NBTExCQUNLUyB9IGZyb20gJy4uLy4uL2NvbnN0L2NvbnN0LmpzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQaWNrZXJUb29sIGV4dGVuZHMgVG9vbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgbmFtZSwgY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIG5hbWUsIGNhbGxiYWNrcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBpY2tlZEFubm90YXRpb24gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2YXRlKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBuZXcgU2NyZWVuU3BhY2VFdmVudEhhbmRsZXIodGhpcy53aWRnZXQuY2FudmFzKTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyLnNldElucHV0QWN0aW9uKChjbGljaykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwaWNrZWRPYmplY3QgPSB0aGlzLndpZGdldC5zY2VuZS5waWNrKGNsaWNrLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaWYgKHBpY2tlZE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBpY2tlZE9iamVjdCAmJiBwaWNrZWRPYmplY3QuaWQgaW5zdGFuY2VvZiBFbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlZEFubm90YXRpb24gPSBwaWNrZWRPYmplY3QuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNhbGxiYWNrKFRPT0xfQ0FMTEJBQ0tTLk9OX0FOTk9UQVRJT05fUElDS0VELCB1dGlscy5leHRyYWN0QW5ub3RhdGlvbkRhdGEodGhpcy5waWNrZWRBbm5vdGF0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgU2NyZWVuU3BhY2VFdmVudFR5cGUuTEVGVF9DTElDSyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUFubm90YXRpb24oYW5ub3RhdGlvbkRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5waWNrZWRBbm5vdGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VkQW5ub3RhdGlvbi5uYW1lID0gYW5ub3RhdGlvbkRhdGEubmFtZTtcclxuICAgICAgICAgICAgdGhpcy5waWNrZWRBbm5vdGF0aW9uLmRlc2NyaXB0aW9uID0gYW5ub3RhdGlvbkRhdGEuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VkQW5ub3RhdGlvbi5wb2x5Z29uLm1hdGVyaWFsID0gQ29sb3IuZnJvbUNzc0NvbG9yU3RyaW5nKGFubm90YXRpb25EYXRhLmNvbG9yKS53aXRoQWxwaGEoMC42KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDYWxsYmFjayhUT09MX0NBTExCQUNLUy5PTl9BTk5PVEFUSU9OX1NBVkVELCB1dGlscy5leHRyYWN0QW5ub3RhdGlvbkRhdGEodGhpcy5waWNrZWRBbm5vdGF0aW9uKSk7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VkQW5ub3RhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbEFubm90YXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5waWNrZWRBbm5vdGF0aW9uID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBbm5vdGF0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBpY2tlZEFubm90YXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNhbGxiYWNrKFRPT0xfQ0FMTEJBQ0tTLk9OX0FOTk9UQVRJT05fREVMRVRFRCwgdGhpcy5waWNrZWRBbm5vdGF0aW9uLmlkKTtcclxuICAgICAgICAgICAgdGhpcy53aWRnZXQuZW50aXRpZXMucmVtb3ZlKHRoaXMucGlja2VkQW5ub3RhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VkQW5ub3RhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGlja2VkQW5ub3RhdGlvbiA9IG51bGw7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOlsiU2NyZWVuU3BhY2VFdmVudFR5cGUiLCJTY3JlZW5TcGFjZUV2ZW50SGFuZGxlciIsIkVudGl0eSIsIkNvbG9yIiwiVG9vbCIsIlRPT0xfQ0FMTEJBQ0tTIiwidXRpbHMiLCJQaWNrZXJUb29sIiwiX1Rvb2wiLCJzY2VuZSIsIm5hbWUiLCJjYWxsYmFja3MiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9jYWxsU3VwZXIiLCJoYW5kbGVyIiwicGlja2VkQW5ub3RhdGlvbiIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiYWN0aXZhdGUiLCJfdGhpczIiLCJhY3RpdmUiLCJ3aWRnZXQiLCJjYW52YXMiLCJzZXRJbnB1dEFjdGlvbiIsImNsaWNrIiwicGlja2VkT2JqZWN0IiwicGljayIsInBvc2l0aW9uIiwiaWQiLCJfdHJpZ2dlckNhbGxiYWNrIiwiT05fQU5OT1RBVElPTl9QSUNLRUQiLCJleHRyYWN0QW5ub3RhdGlvbkRhdGEiLCJMRUZUX0NMSUNLIiwic2F2ZUFubm90YXRpb24iLCJhbm5vdGF0aW9uRGF0YSIsImRlc2NyaXB0aW9uIiwicG9seWdvbiIsIm1hdGVyaWFsIiwiZnJvbUNzc0NvbG9yU3RyaW5nIiwiY29sb3IiLCJ3aXRoQWxwaGEiLCJPTl9BTk5PVEFUSU9OX1NBVkVEIiwiY2FuY2VsQW5ub3RhdGlvbiIsImRlbGV0ZUFubm90YXRpb24iLCJPTl9BTk5PVEFUSU9OX0RFTEVURUQiLCJlbnRpdGllcyIsInJlbW92ZSIsImRlYWN0aXZhdGUiLCJkZXN0cm95Il0sInNvdXJjZVJvb3QiOiIifQ==