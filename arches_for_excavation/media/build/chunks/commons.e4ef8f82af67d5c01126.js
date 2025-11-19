"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[45104],{

/***/ 45104:
/*!***************************************************************************!*\
  !*** ./arches_slocal/media/js/cesium_viewer/cesium/tools/DistanceTool.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DistanceTool: () => (/* binding */ DistanceTool)
/* harmony export */ });
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tool */ 94227);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cesium */ 67980);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cesium */ 41476);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cesium */ 86881);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cesium */ 49785);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cesium */ 91446);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cesium */ 74815);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cesium */ 401);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cesium */ 58646);
/* harmony import */ var _const_constTools__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../const/constTools */ 97846);
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



var DistanceTool = /*#__PURE__*/function (_Tool) {
  function DistanceTool(widget, name, callbacks) {
    var _this;
    _classCallCheck(this, DistanceTool);
    _this = _callSuper(this, DistanceTool, [widget, name, callbacks]);
    _this.pointCollection = _this.widget.scene.primitives.add(new cesium__WEBPACK_IMPORTED_MODULE_7__["default"]());
    _this.polylineCollection = _this.widget.scene.primitives.add(new cesium__WEBPACK_IMPORTED_MODULE_8__["default"]());
    _this.points = [];
    _this.handler = null;
    _this.accentColor = cesium__WEBPACK_IMPORTED_MODULE_2__["default"].fromCssColorString('#646cff');
    return _this;
  }
  _inherits(DistanceTool, _Tool);
  return _createClass(DistanceTool, [{
    key: "activate",
    value: function activate() {
      var _this2 = this;
      this.active = true;
      this.handler = new cesium__WEBPACK_IMPORTED_MODULE_3__["default"](this.widget.canvas);
      this.handler.setInputAction(function (click) {
        if (_this2.pointCollection.length === 2) {
          _this2._clearCollections();
          _this2._triggerCallback(_const_constTools__WEBPACK_IMPORTED_MODULE_9__.TOOL_CALLBACKS.ON_DISTANCE_UPDATE, null);
        }
        var pickedObject = _this2.widget.scene.pick(click.position);
        if ((0,cesium__WEBPACK_IMPORTED_MODULE_5__["default"])(pickedObject)) {
          var cartesian = _this2.widget.scene.pickPosition(click.position);
          if ((0,cesium__WEBPACK_IMPORTED_MODULE_5__["default"])(cartesian)) {
            _this2.points.push(cartesian);
            _this2.pointCollection.add({
              position: cartesian,
              color: _this2.accentColor,
              pixelSize: 10,
              outlineColor: cesium__WEBPACK_IMPORTED_MODULE_2__["default"].WHITE,
              outlineWidth: 2
            });
            if (_this2.points.length === 2) {
              var distance = cesium__WEBPACK_IMPORTED_MODULE_1__["default"].distance(_this2.points[0], _this2.points[1]);
              _this2._triggerCallback('onDistanceUpdate', distance);
              _this2.polylineCollection.add({
                positions: [_this2.points[0], _this2.points[1]],
                width: 4,
                material: cesium__WEBPACK_IMPORTED_MODULE_6__["default"].fromType('PolylineOutline', {
                  color: _this2.accentColor,
                  outlineColor: cesium__WEBPACK_IMPORTED_MODULE_2__["default"].WHITE.withAlpha(0.3),
                  outlineWidth: 1
                })
              });
              _this2.points.length = 0;
            }
          }
        }
      }, cesium__WEBPACK_IMPORTED_MODULE_4__["default"].LEFT_CLICK);
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.active = false;
      if (this.handler) {
        this.handler.destroy();
        this.handler = null;
      }
      this.points.length = 0;
      this._clearCollections();
      this._triggerCallback(_const_constTools__WEBPACK_IMPORTED_MODULE_9__.TOOL_CALLBACKS.ON_DISTANCE_UPDATE, null);
    }
  }, {
    key: "_clearCollections",
    value: function _clearCollections() {
      this.pointCollection.removeAll();
      this.polylineCollection.removeAll();
    }
  }]);
}(_Tool__WEBPACK_IMPORTED_MODULE_0__.Tool);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7SUFBQVgsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQVEsaUJBQWlCQSxDQUFBLEVBQUc7TUFDbEIsSUFBSSxDQUFDcEIsZUFBZSxDQUFDMkMsU0FBUyxDQUFDLENBQUM7TUFDaEMsSUFBSSxDQUFDdkMsa0JBQWtCLENBQUN1QyxTQUFTLENBQUMsQ0FBQztJQUNyQztFQUFDO0FBQUEsRUFyRStCN0QsdUNBQUksRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9hcmNoZXNfc2xvY2FsL21lZGlhL2pzL2Nlc2l1bV92aWV3ZXIvY2VzaXVtL3Rvb2xzL0Rpc3RhbmNlVG9vbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb29sIH0gZnJvbSAnLi9Ub29sJztcclxuaW1wb3J0IHsgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLCBQb2x5bGluZUNvbGxlY3Rpb24sIFNjcmVlblNwYWNlRXZlbnRIYW5kbGVyLCBTY3JlZW5TcGFjZUV2ZW50VHlwZSwgZGVmaW5lZCwgQ2FydGVzaWFuMywgQ29sb3IsIE1hdGVyaWFsIH0gZnJvbSAnY2VzaXVtJztcclxuaW1wb3J0IHsgVE9PTF9DQUxMQkFDS1MgfSBmcm9tICcuLi8uLi9jb25zdC9jb25zdFRvb2xzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEaXN0YW5jZVRvb2wgZXh0ZW5kcyBUb29sIHtcclxuICBjb25zdHJ1Y3Rvcih3aWRnZXQsIG5hbWUsIGNhbGxiYWNrcykge1xyXG4gICAgc3VwZXIod2lkZ2V0LCBuYW1lLCBjYWxsYmFja3MpO1xyXG4gICAgdGhpcy5wb2ludENvbGxlY3Rpb24gPSB0aGlzLndpZGdldC5zY2VuZS5wcmltaXRpdmVzLmFkZChuZXcgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uKCkpO1xyXG4gICAgdGhpcy5wb2x5bGluZUNvbGxlY3Rpb24gPSB0aGlzLndpZGdldC5zY2VuZS5wcmltaXRpdmVzLmFkZChuZXcgUG9seWxpbmVDb2xsZWN0aW9uKCkpO1xyXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgIHRoaXMuaGFuZGxlciA9IG51bGw7XHJcbiAgICBcclxuICAgIHRoaXMuYWNjZW50Q29sb3IgPSBDb2xvci5mcm9tQ3NzQ29sb3JTdHJpbmcoJyM2NDZjZmYnKTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5oYW5kbGVyID0gbmV3IFNjcmVlblNwYWNlRXZlbnRIYW5kbGVyKHRoaXMud2lkZ2V0LmNhbnZhcyk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGVyLnNldElucHV0QWN0aW9uKChjbGljaykgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wb2ludENvbGxlY3Rpb24ubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJDb2xsZWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX3RyaWdnZXJDYWxsYmFjayhUT09MX0NBTExCQUNLUy5PTl9ESVNUQU5DRV9VUERBVEUsIG51bGwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwaWNrZWRPYmplY3QgPSB0aGlzLndpZGdldC5zY2VuZS5waWNrKGNsaWNrLnBvc2l0aW9uKTtcclxuICAgICAgXHJcbiAgICAgIGlmIChkZWZpbmVkKHBpY2tlZE9iamVjdCkpIHtcclxuICAgICAgICBjb25zdCBjYXJ0ZXNpYW4gPSB0aGlzLndpZGdldC5zY2VuZS5waWNrUG9zaXRpb24oY2xpY2sucG9zaXRpb24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChkZWZpbmVkKGNhcnRlc2lhbikpIHtcclxuICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2goY2FydGVzaWFuKTtcclxuICAgICAgICAgIHRoaXMucG9pbnRDb2xsZWN0aW9uLmFkZCh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBjYXJ0ZXNpYW4sXHJcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLmFjY2VudENvbG9yLFxyXG4gICAgICAgICAgICBwaXhlbFNpemU6IDEwLFxyXG4gICAgICAgICAgICBvdXRsaW5lQ29sb3I6IENvbG9yLldISVRFLFxyXG4gICAgICAgICAgICBvdXRsaW5lV2lkdGg6IDJcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiAodGhpcy5wb2ludHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gQ2FydGVzaWFuMy5kaXN0YW5jZSh0aGlzLnBvaW50c1swXSwgdGhpcy5wb2ludHNbMV0pO1xyXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2FsbGJhY2soJ29uRGlzdGFuY2VVcGRhdGUnLCBkaXN0YW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9seWxpbmVDb2xsZWN0aW9uLmFkZCh7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb25zOiBbdGhpcy5wb2ludHNbMF0sIHRoaXMucG9pbnRzWzFdXSxcclxuICAgICAgICAgICAgICB3aWR0aDogNCxcclxuICAgICAgICAgICAgICBtYXRlcmlhbDogTWF0ZXJpYWwuZnJvbVR5cGUoJ1BvbHlsaW5lT3V0bGluZScsIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmFjY2VudENvbG9yLFxyXG4gICAgICAgICAgICAgICAgb3V0bGluZUNvbG9yOiBDb2xvci5XSElURS53aXRoQWxwaGEoMC4zKSxcclxuICAgICAgICAgICAgICAgIG91dGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50cy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgU2NyZWVuU3BhY2VFdmVudFR5cGUuTEVGVF9DTElDSyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcclxuICAgICAgdGhpcy5oYW5kbGVyLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5oYW5kbGVyID0gbnVsbDtcclxuICAgIH1cclxuICAgIHRoaXMucG9pbnRzLmxlbmd0aCA9IDA7XHJcbiAgICB0aGlzLl9jbGVhckNvbGxlY3Rpb25zKCk7XHJcbiAgICB0aGlzLl90cmlnZ2VyQ2FsbGJhY2soVE9PTF9DQUxMQkFDS1MuT05fRElTVEFOQ0VfVVBEQVRFLCBudWxsKTtcclxuICB9XHJcblxyXG4gIF9jbGVhckNvbGxlY3Rpb25zKCkge1xyXG4gICAgdGhpcy5wb2ludENvbGxlY3Rpb24ucmVtb3ZlQWxsKCk7XHJcbiAgICB0aGlzLnBvbHlsaW5lQ29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcclxuICB9XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJUb29sIiwiUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uIiwiUG9seWxpbmVDb2xsZWN0aW9uIiwiU2NyZWVuU3BhY2VFdmVudEhhbmRsZXIiLCJTY3JlZW5TcGFjZUV2ZW50VHlwZSIsImRlZmluZWQiLCJDYXJ0ZXNpYW4zIiwiQ29sb3IiLCJNYXRlcmlhbCIsIlRPT0xfQ0FMTEJBQ0tTIiwiRGlzdGFuY2VUb29sIiwiX1Rvb2wiLCJ3aWRnZXQiLCJuYW1lIiwiY2FsbGJhY2tzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwicG9pbnRDb2xsZWN0aW9uIiwic2NlbmUiLCJwcmltaXRpdmVzIiwiYWRkIiwicG9seWxpbmVDb2xsZWN0aW9uIiwicG9pbnRzIiwiaGFuZGxlciIsImFjY2VudENvbG9yIiwiZnJvbUNzc0NvbG9yU3RyaW5nIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJhY3RpdmF0ZSIsIl90aGlzMiIsImFjdGl2ZSIsImNhbnZhcyIsInNldElucHV0QWN0aW9uIiwiY2xpY2siLCJsZW5ndGgiLCJfY2xlYXJDb2xsZWN0aW9ucyIsIl90cmlnZ2VyQ2FsbGJhY2siLCJPTl9ESVNUQU5DRV9VUERBVEUiLCJwaWNrZWRPYmplY3QiLCJwaWNrIiwicG9zaXRpb24iLCJjYXJ0ZXNpYW4iLCJwaWNrUG9zaXRpb24iLCJwdXNoIiwiY29sb3IiLCJwaXhlbFNpemUiLCJvdXRsaW5lQ29sb3IiLCJXSElURSIsIm91dGxpbmVXaWR0aCIsImRpc3RhbmNlIiwicG9zaXRpb25zIiwid2lkdGgiLCJtYXRlcmlhbCIsImZyb21UeXBlIiwid2l0aEFscGhhIiwiTEVGVF9DTElDSyIsImRlYWN0aXZhdGUiLCJkZXN0cm95IiwicmVtb3ZlQWxsIl0sInNvdXJjZVJvb3QiOiIifQ==