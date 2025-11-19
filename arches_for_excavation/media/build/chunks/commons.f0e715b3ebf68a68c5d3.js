"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[95861],{

/***/ 95861:
/*!******************************************************************************!*\
  !*** ./arches_slocal/media/js/cesium_viewer/cesium/tools/AnnotationsTool.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnnotationsTool: () => (/* binding */ AnnotationsTool)
/* harmony export */ });
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tool */ 94227);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cesium */ 67980);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cesium */ 41476);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cesium */ 86881);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cesium */ 49785);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cesium */ 71578);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cesium */ 74815);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cesium */ 401);
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cesium */ 58646);
/* harmony import */ var _const_constTools__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../const/constTools */ 97846);
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/utils.js */ 31537);
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




var AnnotationsTool = /*#__PURE__*/function (_Tool) {
  function AnnotationsTool(widget, name, callbacks) {
    var _this;
    _classCallCheck(this, AnnotationsTool);
    _this = _callSuper(this, AnnotationsTool, [widget, name, callbacks]);
    _this.pointCollection = _this.widget.scene.primitives.add(new cesium__WEBPACK_IMPORTED_MODULE_7__["default"]());
    _this.polylineCollection = _this.widget.scene.primitives.add(new cesium__WEBPACK_IMPORTED_MODULE_8__["default"]());
    _this.handler = null;
    _this.pendingAnnotation = null;
    _this.prePolygonCloseColor = cesium__WEBPACK_IMPORTED_MODULE_2__["default"].fromCssColorString('#646cff');
    _this.postPolygonCloseColor = cesium__WEBPACK_IMPORTED_MODULE_2__["default"].fromCssColorString('#64ff64');
    return _this;
  }
  _inherits(AnnotationsTool, _Tool);
  return _createClass(AnnotationsTool, [{
    key: "activate",
    value: function activate() {
      var _this2 = this;
      this.active = true;
      if (!this.points) this.points = [];
      this.handler = new cesium__WEBPACK_IMPORTED_MODULE_3__["default"](this.widget.canvas);
      this.handler.setInputAction(function (click) {
        var pickedObject = _this2.widget.scene.pick(click.position);
        if (pickedObject) {
          var cartesian = _this2.widget.scene.pickPosition(click.position);
          if (cartesian) {
            if (_this2.points.length >= 1) {
              var distance = cesium__WEBPACK_IMPORTED_MODULE_1__["default"].distance(cartesian, _this2.points[0]);
              if (_this2.points.length >= 3 && distance < 0.1) {
                _this2.pendingAnnotation = {
                  points: _this2.points.slice(),
                  color: _this2.postPolygonCloseColor
                };
                _this2._triggerCallback(_const_constTools__WEBPACK_IMPORTED_MODULE_9__.TOOL_CALLBACKS.ON_POLYGON_COMPLETE);
                // DON'T clear points here - keep them for potential continuation
                return;
              }
            }
            _this2.points.push(cartesian);
            _this2.pointCollection.add({
              position: cartesian,
              color: _this2.prePolygonCloseColor,
              pixelSize: 10,
              outlineColor: cesium__WEBPACK_IMPORTED_MODULE_2__["default"].WHITE,
              outlineWidth: 2
            });
            if (_this2.points.length === 2) {
              _this2.polylinePrimitive = _this2.polylineCollection.add({
                positions: _this2.points.slice(),
                width: 4,
                material: cesium__WEBPACK_IMPORTED_MODULE_6__["default"].fromType('PolylineOutline', {
                  color: _this2.prePolygonCloseColor,
                  outlineColor: cesium__WEBPACK_IMPORTED_MODULE_2__["default"].WHITE.withAlpha(0.3),
                  outlineWidth: 1
                })
              });
            } else if (_this2.points.length > 2 && _this2.polylinePrimitive) {
              _this2.polylinePrimitive.positions = _this2.points.slice();
            }
          }
        }
      }, cesium__WEBPACK_IMPORTED_MODULE_4__["default"].LEFT_CLICK);
      this.handler.setInputAction(function () {
        _this2._clearCollections();
        _this2.points.length = 0;
      }, cesium__WEBPACK_IMPORTED_MODULE_4__["default"].RIGHT_CLICK);
    }
  }, {
    key: "saveAnnotation",
    value: function saveAnnotation(annotationData) {
      if (this.pendingAnnotation) {
        var color = cesium__WEBPACK_IMPORTED_MODULE_2__["default"].fromCssColorString(annotationData.color);
        this.annotation = this.widget.entities.add({
          id: _utils_utils_js__WEBPACK_IMPORTED_MODULE_10__["default"].generateUniqueId('annotation'),
          name: annotationData.name,
          description: annotationData.description,
          polygon: {
            hierarchy: this.pendingAnnotation.points,
            perPositionHeight: true,
            material: color.withAlpha(0.6),
            classificationType: cesium__WEBPACK_IMPORTED_MODULE_5__["default"].CESIUM_3D_TILE
          }
        });
        this._clearCollections();
        this.points.length = 0;
        this.pendingAnnotation = null;
        this._triggerCallback(_const_constTools__WEBPACK_IMPORTED_MODULE_9__.TOOL_CALLBACKS.ON_ANNOTATION_SAVED, _utils_utils_js__WEBPACK_IMPORTED_MODULE_10__["default"].extractAnnotationData(this.annotation));
      }
    }
  }, {
    key: "cancelAnnotation",
    value: function cancelAnnotation() {
      this.pendingAnnotation = null;
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.active = false;
      if (this.handler) {
        this.handler.destroy();
        this.handler = null;
      }
      this._clearCollections();
      this.pendingAnnotation = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZjBlNzE1YjNlYmY2OGE2OGM1ZDMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUN3STtBQUM5RztBQUNmO0FBRWxDLElBQU1XLGVBQWUsMEJBQUFDLEtBQUE7RUFDeEIsU0FBQUQsZ0JBQVlFLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxTQUFTLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQUFDLGVBQUEsT0FBQU4sZUFBQTtJQUNqQ0ssS0FBQSxHQUFBRSxVQUFBLE9BQUFQLGVBQUEsR0FBTUUsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLFNBQVM7SUFDN0JDLEtBQUEsQ0FBS0csZUFBZSxHQUFHSCxLQUFBLENBQUtILE1BQU0sQ0FBQ08sS0FBSyxDQUFDQyxVQUFVLENBQUNDLEdBQUcsQ0FBQyxJQUFJckIsOENBQXdCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGZSxLQUFBLENBQUtPLGtCQUFrQixHQUFHUCxLQUFBLENBQUtILE1BQU0sQ0FBQ08sS0FBSyxDQUFDQyxVQUFVLENBQUNDLEdBQUcsQ0FBQyxJQUFJcEIsOENBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQ3BGYyxLQUFBLENBQUtRLE9BQU8sR0FBRyxJQUFJO0lBQ25CUixLQUFBLENBQUtTLGlCQUFpQixHQUFHLElBQUk7SUFFN0JULEtBQUEsQ0FBS1Usb0JBQW9CLEdBQUdwQiw4Q0FBSyxDQUFDcUIsa0JBQWtCLENBQUMsU0FBUyxDQUFDO0lBQy9EWCxLQUFBLENBQUtZLHFCQUFxQixHQUFHdEIsOENBQUssQ0FBQ3FCLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztJQUFDLE9BQUFYLEtBQUE7RUFDckU7RUFBQ2EsU0FBQSxDQUFBbEIsZUFBQSxFQUFBQyxLQUFBO0VBQUEsT0FBQWtCLFlBQUEsQ0FBQW5CLGVBQUE7SUFBQW9CLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFDLFFBQVFBLENBQUEsRUFBRztNQUFBLElBQUFDLE1BQUE7TUFD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LENBQUMsQ0FBQztNQUMzRztJQUNKO0VBQUM7SUFBQXBDLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUErQyxnQkFBZ0JBLENBQUEsRUFBRztNQUNmLElBQUksQ0FBQ3RELGlCQUFpQixHQUFHLElBQUk7SUFDakM7RUFBQztJQUFBTSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBZ0QsVUFBVUEsQ0FBQSxFQUFHO01BQ1QsSUFBSSxDQUFDN0MsTUFBTSxHQUFHLEtBQUs7TUFDbkIsSUFBSSxJQUFJLENBQUNYLE9BQU8sRUFBRTtRQUNkLElBQUksQ0FBQ0EsT0FBTyxDQUFDeUQsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDekQsT0FBTyxHQUFHLElBQUk7TUFDdkI7TUFDQSxJQUFJLENBQUN1QyxpQkFBaUIsQ0FBQyxDQUFDO01BQ3hCLElBQUksQ0FBQ3RDLGlCQUFpQixHQUFHLElBQUk7SUFDakM7RUFBQztJQUFBTSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBK0IsaUJBQWlCQSxDQUFBLEVBQUc7TUFDaEIsSUFBSSxDQUFDNUMsZUFBZSxDQUFDK0QsU0FBUyxDQUFDLENBQUM7TUFDaEMsSUFBSSxDQUFDM0Qsa0JBQWtCLENBQUMyRCxTQUFTLENBQUMsQ0FBQztJQUN2QztFQUFDO0FBQUEsRUEzR2dDbEYsdUNBQUksRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9hcmNoZXNfc2xvY2FsL21lZGlhL2pzL2Nlc2l1bV92aWV3ZXIvY2VzaXVtL3Rvb2xzL0Fubm90YXRpb25zVG9vbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb29sIH0gZnJvbSAnLi9Ub29sJztcclxuaW1wb3J0IHsgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLCBQb2x5bGluZUNvbGxlY3Rpb24sIFNjcmVlblNwYWNlRXZlbnRIYW5kbGVyLCBTY3JlZW5TcGFjZUV2ZW50VHlwZSwgQ2FydGVzaWFuMywgQ29sb3IsIE1hdGVyaWFsLCBDbGFzc2lmaWNhdGlvblR5cGUgfSBmcm9tICdjZXNpdW0nO1xyXG5pbXBvcnQgeyBUT09MX0NBTExCQUNLUyB9IGZyb20gJy4uLy4uL2NvbnN0L2NvbnN0VG9vbHMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFubm90YXRpb25zVG9vbCBleHRlbmRzIFRvb2wge1xyXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0LCBuYW1lLCBjYWxsYmFja3MpIHtcclxuICAgICAgICBzdXBlcih3aWRnZXQsIG5hbWUsIGNhbGxiYWNrcyk7XHJcbiAgICAgICAgdGhpcy5wb2ludENvbGxlY3Rpb24gPSB0aGlzLndpZGdldC5zY2VuZS5wcmltaXRpdmVzLmFkZChuZXcgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMucG9seWxpbmVDb2xsZWN0aW9uID0gdGhpcy53aWRnZXQuc2NlbmUucHJpbWl0aXZlcy5hZGQobmV3IFBvbHlsaW5lQ29sbGVjdGlvbigpKTtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0Fubm90YXRpb24gPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnByZVBvbHlnb25DbG9zZUNvbG9yID0gQ29sb3IuZnJvbUNzc0NvbG9yU3RyaW5nKCcjNjQ2Y2ZmJyk7XHJcbiAgICAgICAgdGhpcy5wb3N0UG9seWdvbkNsb3NlQ29sb3IgPSBDb2xvci5mcm9tQ3NzQ29sb3JTdHJpbmcoJyM2NGZmNjQnKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBvaW50cykgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBuZXcgU2NyZWVuU3BhY2VFdmVudEhhbmRsZXIodGhpcy53aWRnZXQuY2FudmFzKTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyLnNldElucHV0QWN0aW9uKChjbGljaykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwaWNrZWRPYmplY3QgPSB0aGlzLndpZGdldC5zY2VuZS5waWNrKGNsaWNrLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwaWNrZWRPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnRlc2lhbiA9IHRoaXMud2lkZ2V0LnNjZW5lLnBpY2tQb3NpdGlvbihjbGljay5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FydGVzaWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gQ2FydGVzaWFuMy5kaXN0YW5jZShjYXJ0ZXNpYW4sIHRoaXMucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCA+PSAzICYmIGRpc3RhbmNlIDwgMC4xKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nQW5ub3RhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6IHRoaXMucG9pbnRzLnNsaWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMucG9zdFBvbHlnb25DbG9zZUNvbG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDYWxsYmFjayhUT09MX0NBTExCQUNLUy5PTl9QT0xZR09OX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERPTidUIGNsZWFyIHBvaW50cyBoZXJlIC0ga2VlcCB0aGVtIGZvciBwb3RlbnRpYWwgY29udGludWF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2goY2FydGVzaWFuKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50Q29sbGVjdGlvbi5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY2FydGVzaWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5wcmVQb2x5Z29uQ2xvc2VDb2xvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxTaXplOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZUNvbG9yOiBDb2xvci5XSElURSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZVdpZHRoOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvaW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2x5bGluZVByaW1pdGl2ZSA9IHRoaXMucG9seWxpbmVDb2xsZWN0aW9uLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IHRoaXMucG9pbnRzLnNsaWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBNYXRlcmlhbC5mcm9tVHlwZSgnUG9seWxpbmVPdXRsaW5lJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLnByZVBvbHlnb25DbG9zZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGxpbmVDb2xvcjogQ29sb3IuV0hJVEUud2l0aEFscGhhKDAuMyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZVdpZHRoOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCA+IDIgJiYgdGhpcy5wb2x5bGluZVByaW1pdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlsaW5lUHJpbWl0aXZlLnBvc2l0aW9ucyA9IHRoaXMucG9pbnRzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sIFNjcmVlblNwYWNlRXZlbnRUeXBlLkxFRlRfQ0xJQ0spO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXIuc2V0SW5wdXRBY3Rpb24oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhckNvbGxlY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfSwgU2NyZWVuU3BhY2VFdmVudFR5cGUuUklHSFRfQ0xJQ0spO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVBbm5vdGF0aW9uKGFubm90YXRpb25EYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGVuZGluZ0Fubm90YXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgY29sb3IgPSBDb2xvci5mcm9tQ3NzQ29sb3JTdHJpbmcoYW5ub3RhdGlvbkRhdGEuY29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24gPSB0aGlzLndpZGdldC5lbnRpdGllcy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IHV0aWxzLmdlbmVyYXRlVW5pcXVlSWQoJ2Fubm90YXRpb24nKSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IGFubm90YXRpb25EYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYW5ub3RhdGlvbkRhdGEuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBwb2x5Z29uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGllcmFyY2h5OiB0aGlzLnBlbmRpbmdBbm5vdGF0aW9uLnBvaW50cyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJQb3NpdGlvbkhlaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbDogY29sb3Iud2l0aEFscGhhKDAuNiksXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NpZmljYXRpb25UeXBlOiBDbGFzc2lmaWNhdGlvblR5cGUuQ0VTSVVNXzNEX1RJTEVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyQ29sbGVjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludHMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nQW5ub3RhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDYWxsYmFjayhUT09MX0NBTExCQUNLUy5PTl9BTk5PVEFUSU9OX1NBVkVELCB1dGlscy5leHRyYWN0QW5ub3RhdGlvbkRhdGEodGhpcy5hbm5vdGF0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbEFubm90YXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nQW5ub3RhdGlvbiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2xlYXJDb2xsZWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0Fubm90YXRpb24gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckNvbGxlY3Rpb25zKCkge1xyXG4gICAgICAgIHRoaXMucG9pbnRDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgIHRoaXMucG9seWxpbmVDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJUb29sIiwiUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uIiwiUG9seWxpbmVDb2xsZWN0aW9uIiwiU2NyZWVuU3BhY2VFdmVudEhhbmRsZXIiLCJTY3JlZW5TcGFjZUV2ZW50VHlwZSIsIkNhcnRlc2lhbjMiLCJDb2xvciIsIk1hdGVyaWFsIiwiQ2xhc3NpZmljYXRpb25UeXBlIiwiVE9PTF9DQUxMQkFDS1MiLCJ1dGlscyIsIkFubm90YXRpb25zVG9vbCIsIl9Ub29sIiwid2lkZ2V0IiwibmFtZSIsImNhbGxiYWNrcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsInBvaW50Q29sbGVjdGlvbiIsInNjZW5lIiwicHJpbWl0aXZlcyIsImFkZCIsInBvbHlsaW5lQ29sbGVjdGlvbiIsImhhbmRsZXIiLCJwZW5kaW5nQW5ub3RhdGlvbiIsInByZVBvbHlnb25DbG9zZUNvbG9yIiwiZnJvbUNzc0NvbG9yU3RyaW5nIiwicG9zdFBvbHlnb25DbG9zZUNvbG9yIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJhY3RpdmF0ZSIsIl90aGlzMiIsImFjdGl2ZSIsInBvaW50cyIsImNhbnZhcyIsInNldElucHV0QWN0aW9uIiwiY2xpY2siLCJwaWNrZWRPYmplY3QiLCJwaWNrIiwicG9zaXRpb24iLCJjYXJ0ZXNpYW4iLCJwaWNrUG9zaXRpb24iLCJsZW5ndGgiLCJkaXN0YW5jZSIsInNsaWNlIiwiY29sb3IiLCJfdHJpZ2dlckNhbGxiYWNrIiwiT05fUE9MWUdPTl9DT01QTEVURSIsInB1c2giLCJwaXhlbFNpemUiLCJvdXRsaW5lQ29sb3IiLCJXSElURSIsIm91dGxpbmVXaWR0aCIsInBvbHlsaW5lUHJpbWl0aXZlIiwicG9zaXRpb25zIiwid2lkdGgiLCJtYXRlcmlhbCIsImZyb21UeXBlIiwid2l0aEFscGhhIiwiTEVGVF9DTElDSyIsIl9jbGVhckNvbGxlY3Rpb25zIiwiUklHSFRfQ0xJQ0siLCJzYXZlQW5ub3RhdGlvbiIsImFubm90YXRpb25EYXRhIiwiYW5ub3RhdGlvbiIsImVudGl0aWVzIiwiaWQiLCJnZW5lcmF0ZVVuaXF1ZUlkIiwiZGVzY3JpcHRpb24iLCJwb2x5Z29uIiwiaGllcmFyY2h5IiwicGVyUG9zaXRpb25IZWlnaHQiLCJjbGFzc2lmaWNhdGlvblR5cGUiLCJDRVNJVU1fM0RfVElMRSIsIk9OX0FOTk9UQVRJT05fU0FWRUQiLCJleHRyYWN0QW5ub3RhdGlvbkRhdGEiLCJjYW5jZWxBbm5vdGF0aW9uIiwiZGVhY3RpdmF0ZSIsImRlc3Ryb3kiLCJyZW1vdmVBbGwiXSwic291cmNlUm9vdCI6IiJ9