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
/* harmony import */ var _const_const__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../const/const */ 64373);
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
  function DistanceTool(scene, name, callbacks) {
    var _this;
    _classCallCheck(this, DistanceTool);
    _this = _callSuper(this, DistanceTool, [scene, name, callbacks]);
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
          _this2._triggerCallback(_const_const__WEBPACK_IMPORTED_MODULE_9__.TOOL_CALLBACKS.ON_DISTANCE_UPDATE, null);
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
              var distanceString = "".concat(distance.toFixed(3), " ").concat(_this2.scale === _const_const__WEBPACK_IMPORTED_MODULE_9__.SCALE_FACTORS.METERS ? 'm' : 'cm');
              _this2._triggerCallback(_const_const__WEBPACK_IMPORTED_MODULE_9__.TOOL_CALLBACKS.ON_DISTANCE_UPDATE, distanceString);
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
      this._triggerCallback(_const_const__WEBPACK_IMPORTED_MODULE_9__.TOOL_CALLBACKS.ON_DISTANCE_UPDATE, null);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLElBQUk7TUFDckI7TUFDQSxJQUFJLENBQUNELE1BQU0sQ0FBQ2MsTUFBTSxHQUFHLENBQUM7TUFDdEIsSUFBSSxDQUFDQyxpQkFBaUIsQ0FBQyxDQUFDO01BQ3hCLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUMvQix3REFBYyxDQUFDZ0Msa0JBQWtCLEVBQUUsSUFBSSxDQUFDO0lBQ2hFO0VBQUM7SUFBQVgsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQVEsaUJBQWlCQSxDQUFBLEVBQUc7TUFDbEIsSUFBSSxDQUFDcEIsZUFBZSxDQUFDZ0QsU0FBUyxDQUFDLENBQUM7TUFDaEMsSUFBSSxDQUFDNUMsa0JBQWtCLENBQUM0QyxTQUFTLENBQUMsQ0FBQztJQUNyQztFQUFDO0FBQUEsRUF0RStCbkUsdUNBQUksRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9hcmNoZXNfc2xvY2FsL21lZGlhL2pzL2Nlc2l1bV92aWV3ZXIvY2VzaXVtL3Rvb2xzL0Rpc3RhbmNlVG9vbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb29sIH0gZnJvbSAnLi9Ub29sJztcclxuaW1wb3J0IHsgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLCBQb2x5bGluZUNvbGxlY3Rpb24sIFNjcmVlblNwYWNlRXZlbnRIYW5kbGVyLCBTY3JlZW5TcGFjZUV2ZW50VHlwZSwgZGVmaW5lZCwgQ2FydGVzaWFuMywgQ29sb3IsIE1hdGVyaWFsIH0gZnJvbSAnY2VzaXVtJztcclxuaW1wb3J0IHsgVE9PTF9DQUxMQkFDS1MsIFNDQUxFX0ZBQ1RPUlMgfSBmcm9tICcuLi8uLi9jb25zdC9jb25zdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzdGFuY2VUb29sIGV4dGVuZHMgVG9vbCB7XHJcbiAgY29uc3RydWN0b3Ioc2NlbmUsIG5hbWUsIGNhbGxiYWNrcykge1xyXG4gICAgc3VwZXIoc2NlbmUsIG5hbWUsIGNhbGxiYWNrcyk7XHJcbiAgICB0aGlzLnBvaW50Q29sbGVjdGlvbiA9IHRoaXMud2lkZ2V0LnNjZW5lLnByaW1pdGl2ZXMuYWRkKG5ldyBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24oKSk7XHJcbiAgICB0aGlzLnBvbHlsaW5lQ29sbGVjdGlvbiA9IHRoaXMud2lkZ2V0LnNjZW5lLnByaW1pdGl2ZXMuYWRkKG5ldyBQb2x5bGluZUNvbGxlY3Rpb24oKSk7XHJcbiAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG4gICAgdGhpcy5oYW5kbGVyID0gbnVsbDtcclxuICAgIFxyXG4gICAgdGhpcy5hY2NlbnRDb2xvciA9IENvbG9yLmZyb21Dc3NDb2xvclN0cmluZygnIzY0NmNmZicpO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLmhhbmRsZXIgPSBuZXcgU2NyZWVuU3BhY2VFdmVudEhhbmRsZXIodGhpcy53aWRnZXQuY2FudmFzKTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZXIuc2V0SW5wdXRBY3Rpb24oKGNsaWNrKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBvaW50Q29sbGVjdGlvbi5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICB0aGlzLl9jbGVhckNvbGxlY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5fdHJpZ2dlckNhbGxiYWNrKFRPT0xfQ0FMTEJBQ0tTLk9OX0RJU1RBTkNFX1VQREFURSwgbnVsbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBpY2tlZE9iamVjdCA9IHRoaXMud2lkZ2V0LnNjZW5lLnBpY2soY2xpY2sucG9zaXRpb24pO1xyXG4gICAgICBcclxuICAgICAgaWYgKGRlZmluZWQocGlja2VkT2JqZWN0KSkge1xyXG4gICAgICAgIGNvbnN0IGNhcnRlc2lhbiA9IHRoaXMud2lkZ2V0LnNjZW5lLnBpY2tQb3NpdGlvbihjbGljay5wb3NpdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGRlZmluZWQoY2FydGVzaWFuKSkge1xyXG4gICAgICAgICAgdGhpcy5wb2ludHMucHVzaChjYXJ0ZXNpYW4pO1xyXG4gICAgICAgICAgdGhpcy5wb2ludENvbGxlY3Rpb24uYWRkKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGNhcnRlc2lhbixcclxuICAgICAgICAgICAgY29sb3I6IHRoaXMuYWNjZW50Q29sb3IsXHJcbiAgICAgICAgICAgIHBpeGVsU2l6ZTogMTAsXHJcbiAgICAgICAgICAgIG91dGxpbmVDb2xvcjogQ29sb3IuV0hJVEUsXHJcbiAgICAgICAgICAgIG91dGxpbmVXaWR0aDogMlxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmICh0aGlzLnBvaW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBDYXJ0ZXNpYW4zLmRpc3RhbmNlKHRoaXMucG9pbnRzWzBdLCB0aGlzLnBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlU3RyaW5nID0gYCR7ZGlzdGFuY2UudG9GaXhlZCgzKX0gJHt0aGlzLnNjYWxlID09PSBTQ0FMRV9GQUNUT1JTLk1FVEVSUyA/ICdtJyA6ICdjbSd9YDtcclxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNhbGxiYWNrKFRPT0xfQ0FMTEJBQ0tTLk9OX0RJU1RBTkNFX1VQREFURSwgZGlzdGFuY2VTdHJpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLnBvbHlsaW5lQ29sbGVjdGlvbi5hZGQoe1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uczogW3RoaXMucG9pbnRzWzBdLCB0aGlzLnBvaW50c1sxXV0sXHJcbiAgICAgICAgICAgICAgd2lkdGg6IDQsXHJcbiAgICAgICAgICAgICAgbWF0ZXJpYWw6IE1hdGVyaWFsLmZyb21UeXBlKCdQb2x5bGluZU91dGxpbmUnLCB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5hY2NlbnRDb2xvcixcclxuICAgICAgICAgICAgICAgIG91dGxpbmVDb2xvcjogQ29sb3IuV0hJVEUud2l0aEFscGhhKDAuMyksXHJcbiAgICAgICAgICAgICAgICBvdXRsaW5lV2lkdGg6IDFcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludHMubGVuZ3RoID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIFNjcmVlblNwYWNlRXZlbnRUeXBlLkxFRlRfQ0xJQ0spO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5oYW5kbGVyKSB7XHJcbiAgICAgIHRoaXMuaGFuZGxlci5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuaGFuZGxlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBvaW50cy5sZW5ndGggPSAwO1xyXG4gICAgdGhpcy5fY2xlYXJDb2xsZWN0aW9ucygpO1xyXG4gICAgdGhpcy5fdHJpZ2dlckNhbGxiYWNrKFRPT0xfQ0FMTEJBQ0tTLk9OX0RJU1RBTkNFX1VQREFURSwgbnVsbCk7XHJcbiAgfVxyXG5cclxuICBfY2xlYXJDb2xsZWN0aW9ucygpIHtcclxuICAgIHRoaXMucG9pbnRDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1xyXG4gICAgdGhpcy5wb2x5bGluZUNvbGxlY3Rpb24ucmVtb3ZlQWxsKCk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJUb29sIiwiUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uIiwiUG9seWxpbmVDb2xsZWN0aW9uIiwiU2NyZWVuU3BhY2VFdmVudEhhbmRsZXIiLCJTY3JlZW5TcGFjZUV2ZW50VHlwZSIsImRlZmluZWQiLCJDYXJ0ZXNpYW4zIiwiQ29sb3IiLCJNYXRlcmlhbCIsIlRPT0xfQ0FMTEJBQ0tTIiwiU0NBTEVfRkFDVE9SUyIsIkRpc3RhbmNlVG9vbCIsIl9Ub29sIiwic2NlbmUiLCJuYW1lIiwiY2FsbGJhY2tzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwicG9pbnRDb2xsZWN0aW9uIiwid2lkZ2V0IiwicHJpbWl0aXZlcyIsImFkZCIsInBvbHlsaW5lQ29sbGVjdGlvbiIsInBvaW50cyIsImhhbmRsZXIiLCJhY2NlbnRDb2xvciIsImZyb21Dc3NDb2xvclN0cmluZyIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiYWN0aXZhdGUiLCJfdGhpczIiLCJhY3RpdmUiLCJjYW52YXMiLCJzZXRJbnB1dEFjdGlvbiIsImNsaWNrIiwibGVuZ3RoIiwiX2NsZWFyQ29sbGVjdGlvbnMiLCJfdHJpZ2dlckNhbGxiYWNrIiwiT05fRElTVEFOQ0VfVVBEQVRFIiwicGlja2VkT2JqZWN0IiwicGljayIsInBvc2l0aW9uIiwiY2FydGVzaWFuIiwicGlja1Bvc2l0aW9uIiwicHVzaCIsImNvbG9yIiwicGl4ZWxTaXplIiwib3V0bGluZUNvbG9yIiwiV0hJVEUiLCJvdXRsaW5lV2lkdGgiLCJkaXN0YW5jZSIsImRpc3RhbmNlU3RyaW5nIiwiY29uY2F0IiwidG9GaXhlZCIsInNjYWxlIiwiTUVURVJTIiwicG9zaXRpb25zIiwid2lkdGgiLCJtYXRlcmlhbCIsImZyb21UeXBlIiwid2l0aEFscGhhIiwiTEVGVF9DTElDSyIsImRlYWN0aXZhdGUiLCJkZXN0cm95IiwicmVtb3ZlQWxsIl0sInNvdXJjZVJvb3QiOiIifQ==