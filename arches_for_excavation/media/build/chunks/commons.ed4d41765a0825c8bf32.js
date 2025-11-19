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
/* harmony import */ var _const_const_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../const/const.js */ 64373);
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
  function AnnotationsTool(scene, name, callbacks) {
    var _this;
    _classCallCheck(this, AnnotationsTool);
    _this = _callSuper(this, AnnotationsTool, [scene, name, callbacks]);
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
              // if scene.scale is in meters use buffer of 0.5 meter to close polygon, if in centimeters use 1 milimeter (with smaller objects we want greater precision)
              if (_this2.points.length >= 3 && distance < (_this2.scale === _const_const_js__WEBPACK_IMPORTED_MODULE_9__.SCALE_FACTORS.METERS ? 0.5 : 0.1)) {
                _this2.pendingAnnotation = {
                  points: _this2.points.slice(),
                  color: _this2.postPolygonCloseColor
                };
                _this2._triggerCallback(_const_const_js__WEBPACK_IMPORTED_MODULE_9__.TOOL_CALLBACKS.ON_POLYGON_COMPLETE);
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
        this._triggerCallback(_const_const_js__WEBPACK_IMPORTED_MODULE_9__.TOOL_CALLBACKS.ON_ANNOTATION_SAVED, _utils_utils_js__WEBPACK_IMPORTED_MODULE_10__["default"].extractAnnotationData(this.annotation));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZWQ0ZDQxNzY1YTA4MjVjOGJmMzIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUN3STtBQUNqRztBQUM1QjtBQUVsQyxJQUFNWSxlQUFlLDBCQUFBQyxLQUFBO0VBQ3hCLFNBQUFELGdCQUFZRSxLQUFLLEVBQUVDLElBQUksRUFBRUMsU0FBUyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUFBQyxlQUFBLE9BQUFOLGVBQUE7SUFDaENLLEtBQUEsR0FBQUUsVUFBQSxPQUFBUCxlQUFBLEdBQU1FLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxTQUFTO0lBQzVCQyxLQUFBLENBQUtHLGVBQWUsR0FBR0gsS0FBQSxDQUFLSSxNQUFNLENBQUNQLEtBQUssQ0FBQ1EsVUFBVSxDQUFDQyxHQUFHLENBQUMsSUFBSXRCLDhDQUF3QixDQUFDLENBQUMsQ0FBQztJQUN2RmdCLEtBQUEsQ0FBS08sa0JBQWtCLEdBQUdQLEtBQUEsQ0FBS0ksTUFBTSxDQUFDUCxLQUFLLENBQUNRLFVBQVUsQ0FBQ0MsR0FBRyxDQUFDLElBQUlyQiw4Q0FBa0IsQ0FBQyxDQUFDLENBQUM7SUFDcEZlLEtBQUEsQ0FBS1EsT0FBTyxHQUFHLElBQUk7SUFDbkJSLEtBQUEsQ0FBS1MsaUJBQWlCLEdBQUcsSUFBSTtJQUU3QlQsS0FBQSxDQUFLVSxvQkFBb0IsR0FBR3JCLDhDQUFLLENBQUNzQixrQkFBa0IsQ0FBQyxTQUFTLENBQUM7SUFDL0RYLEtBQUEsQ0FBS1kscUJBQXFCLEdBQUd2Qiw4Q0FBSyxDQUFDc0Isa0JBQWtCLENBQUMsU0FBUyxDQUFDO0lBQUMsT0FBQVgsS0FBQTtFQUNyRTtFQUFDYSxTQUFBLENBQUFsQixlQUFBLEVBQUFDLEtBQUE7RUFBQSxPQUFBa0IsWUFBQSxDQUFBbkIsZUFBQTtJQUFBb0IsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQUMsUUFBUUEsQ0FBQSxFQUFHO01BQUEsSUFBQUMsTUFBQTtNQUNQLElBQUksQ0FBQ0MsTUFBTSxHQUFHLElBQUk7TUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQ0MsTUFBTSxFQUFFLElBQUksQ0FBQ0EsTUFBTSxHQUFHLEVBQUU7TUFDbEMsSUFBSSxDQUFDWixPQUFPLEdBQUcsSUFBSXRCLDhDQUF1QixDQUFDLElBQUksQ0FBQ2tCLE1BQU0sQ0FBQ2lCLE1BQU0sQ0FBQztNQUU5RCxJQUFJLENBQUNiLE9BQU8sQ0FBQ2MsY0FBYyxDQUFDLFVBQUNDLEtBQUssRUFBSztRQUNuQyxJQUFNQyxZQUFZLEdBQUdOLE1BQUksQ0FBQ2QsTUFBTSxDQUFDUCxLQUFLLENBQUM0QixJQUFJLENBQUNGLEtBQUssQ0FBQ0csUUFBUSxDQUFDO1FBRTNELElBQUlGLFlBQVksRUFBRTtVQUNkLElBQU1HLFNBQVMsR0FBR1QsTUFBSSxDQUFDZCxNQUFNLENBQUNQLEtBQUssQ0FBQytCLFlBQVksQ0FBQ0wsS0FBSyxDQUFDRyxRQUFRLENBQUM7VUFDaEUsSUFBSUMsU0FBUyxFQUFFO1lBQ1gsSUFBSVQsTUFBSSxDQUFDRSxNQUFNLENBQUNTLE1BQU0sSUFBSSxDQUFDLEVBQUU7Y0FDekIsSUFBTUMsUUFBUSxHQUFHMUMsOENBQVUsQ0FBQzBDLFFBQVEsQ0FBQ0gsU0FBUyxFQUFFVCxNQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUMvRDtjQUNBLElBQUlGLE1BQUksQ0FBQ0UsTUFBTSxDQUFDUyxNQUFNLElBQUksQ0FBQyxJQUFJQyxRQUFRLElBQUlaLE1BQUksQ0FBQ2EsS0FBSyxLQUFLdEMsMERBQWEsQ0FBQ3VDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pGZCxNQUFJLENBQUNULGlCQUFpQixHQUFHO2tCQUNyQlcsTUFBTSxFQUFFRixNQUFJLENBQUNFLE1BQU0sQ0FBQ2EsS0FBSyxDQUFDLENBQUM7a0JBQzNCQyxLQUFLLEVBQUVoQixNQUFJLENBQUNOO2dCQUNoQixDQUFDO2dCQUNETSxNQUFJLENBQUNpQixnQkFBZ0IsQ0FBQzNDLDJEQUFjLENBQUM0QyxtQkFBbUIsQ0FBQztnQkFDekQ7Y0FDSjtZQUNKO1lBRUFsQixNQUFJLENBQUNFLE1BQU0sQ0FBQ2lCLElBQUksQ0FBQ1YsU0FBUyxDQUFDO1lBQzNCVCxNQUFJLENBQUNmLGVBQWUsQ0FBQ0csR0FBRyxDQUFDO2NBQ3JCb0IsUUFBUSxFQUFFQyxTQUFTO2NBQ25CTyxLQUFLLEVBQUVoQixNQUFJLENBQUNSLG9CQUFvQjtjQUNoQzRCLFNBQVMsRUFBRSxFQUFFO2NBQ2JDLFlBQVksRUFBRWxELDhDQUFLLENBQUNtRCxLQUFLO2NBQ3pCQyxZQUFZLEVBQUU7WUFDbEIsQ0FBQyxDQUFDO1lBRUYsSUFBSXZCLE1BQUksQ0FBQ0UsTUFBTSxDQUFDUyxNQUFNLEtBQUssQ0FBQyxFQUFFO2NBQzFCWCxNQUFJLENBQUN3QixpQkFBaUIsR0FBR3hCLE1BQUksQ0FBQ1gsa0JBQWtCLENBQUNELEdBQUcsQ0FBQztnQkFDakRxQyxTQUFTLEVBQUV6QixNQUFJLENBQUNFLE1BQU0sQ0FBQ2EsS0FBSyxDQUFDLENBQUM7Z0JBQzlCVyxLQUFLLEVBQUUsQ0FBQztnQkFDUkMsUUFBUSxFQUFFdkQsOENBQVEsQ0FBQ3dELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtrQkFDM0NaLEtBQUssRUFBRWhCLE1BQUksQ0FBQ1Isb0JBQW9CO2tCQUNoQzZCLFlBQVksRUFBRWxELDhDQUFLLENBQUNtRCxLQUFLLENBQUNPLFNBQVMsQ0FBQyxHQUFHLENBQUM7a0JBQ3hDTixZQUFZLEVBQUU7Z0JBQ2xCLENBQUM7Y0FDTCxDQUFDLENBQUM7WUFDTixDQUFDLE1BQU0sSUFBSXZCLE1BQUksQ0FBQ0UsTUFBTSxDQUFDUyxNQUFNLEdBQUcsQ0FBQyxJQUFJWCxNQUFJLENBQUN3QixpQkFBaUIsRUFBRTtjQUN6RHhCLE1BQUksQ0FBQ3dCLGlCQUFpQixDQUFDQyxTQUFTLEdBQUd6QixNQUFJLENBQUNFLE1BQU0sQ0FBQ2EsS0FBSyxDQUFDLENBQUM7WUFDMUQ7VUFDSjtRQUNKO01BRUosQ0FBQyxFQUFFOUMsOENBQW9CLENBQUM2RCxVQUFVLENBQUM7TUFFbkMsSUFBSSxDQUFDeEMsT0FBTyxDQUFDYyxjQUFjLENBQUMsWUFBTTtRQUM5QkosTUFBSSxDQUFDK0IsaUJBQWlCLENBQUMsQ0FBQztRQUN4Qi9CLE1BQUksQ0FBQ0UsTUFBTSxDQUFDUyxNQUFNLEdBQUcsQ0FBQztNQUMxQixDQUFDLEVBQUUxQyw4Q0FBb0IsQ0FBQytELFdBQVcsQ0FBQztJQUN4QztFQUFDO0lBQUFuQyxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBbUMsY0FBY0EsQ0FBQ0MsY0FBYyxFQUFFO01BQzNCLElBQUksSUFBSSxDQUFDM0MsaUJBQWlCLEVBQUU7UUFDeEIsSUFBTXlCLEtBQUssR0FBRzdDLDhDQUFLLENBQUNzQixrQkFBa0IsQ0FBQ3lDLGNBQWMsQ0FBQ2xCLEtBQUssQ0FBQztRQUM1RCxJQUFJLENBQUNtQixVQUFVLEdBQUcsSUFBSSxDQUFDakQsTUFBTSxDQUFDa0QsUUFBUSxDQUFDaEQsR0FBRyxDQUFDO1VBQ3ZDaUQsRUFBRSxFQUFFN0Qsd0RBQUssQ0FBQzhELGdCQUFnQixDQUFDLFlBQVksQ0FBQztVQUN4QzFELElBQUksRUFBRXNELGNBQWMsQ0FBQ3RELElBQUk7VUFDekIyRCxXQUFXLEVBQUVMLGNBQWMsQ0FBQ0ssV0FBVztVQUN2Q0MsT0FBTyxFQUFFO1lBQ0xDLFNBQVMsRUFBRSxJQUFJLENBQUNsRCxpQkFBaUIsQ0FBQ1csTUFBTTtZQUN4Q3dDLGlCQUFpQixFQUFFLElBQUk7WUFDdkJmLFFBQVEsRUFBRVgsS0FBSyxDQUFDYSxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQzlCYyxrQkFBa0IsRUFBRXRFLDhDQUFrQixDQUFDdUU7VUFDM0M7UUFDSixDQUFDLENBQUM7UUFDRixJQUFJLENBQUNiLGlCQUFpQixDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDN0IsTUFBTSxDQUFDUyxNQUFNLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUNwQixpQkFBaUIsR0FBRyxJQUFJO1FBQzdCLElBQUksQ0FBQzBCLGdCQUFnQixDQUFDM0MsMkRBQWMsQ0FBQ3VFLG1CQUFtQixFQUFFckUsd0RBQUssQ0FBQ3NFLHFCQUFxQixDQUFDLElBQUksQ0FBQ1gsVUFBVSxDQUFDLENBQUM7TUFDM0c7SUFDSjtFQUFDO0lBQUF0QyxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBaUQsZ0JBQWdCQSxDQUFBLEVBQUc7TUFDZixJQUFJLENBQUN4RCxpQkFBaUIsR0FBRyxJQUFJO0lBQ2pDO0VBQUM7SUFBQU0sR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQWtELFVBQVVBLENBQUEsRUFBRztNQUNULElBQUksQ0FBQy9DLE1BQU0sR0FBRyxLQUFLO01BQ25CLElBQUksSUFBSSxDQUFDWCxPQUFPLEVBQUU7UUFDZCxJQUFJLENBQUNBLE9BQU8sQ0FBQzJELE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQzNELE9BQU8sR0FBRyxJQUFJO01BQ3ZCO01BQ0EsSUFBSSxDQUFDeUMsaUJBQWlCLENBQUMsQ0FBQztNQUN4QixJQUFJLENBQUN4QyxpQkFBaUIsR0FBRyxJQUFJO0lBQ2pDO0VBQUM7SUFBQU0sR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQWlDLGlCQUFpQkEsQ0FBQSxFQUFHO01BQ2hCLElBQUksQ0FBQzlDLGVBQWUsQ0FBQ2lFLFNBQVMsQ0FBQyxDQUFDO01BQ2hDLElBQUksQ0FBQzdELGtCQUFrQixDQUFDNkQsU0FBUyxDQUFDLENBQUM7SUFDdkM7RUFBQztBQUFBLEVBM0dnQ3JGLHVDQUFJLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vYXJjaGVzX3Nsb2NhbC9tZWRpYS9qcy9jZXNpdW1fdmlld2VyL2Nlc2l1bS90b29scy9Bbm5vdGF0aW9uc1Rvb2wuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9vbCB9IGZyb20gJy4vVG9vbCc7XHJcbmltcG9ydCB7IFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbiwgUG9seWxpbmVDb2xsZWN0aW9uLCBTY3JlZW5TcGFjZUV2ZW50SGFuZGxlciwgU2NyZWVuU3BhY2VFdmVudFR5cGUsIENhcnRlc2lhbjMsIENvbG9yLCBNYXRlcmlhbCwgQ2xhc3NpZmljYXRpb25UeXBlIH0gZnJvbSAnY2VzaXVtJztcclxuaW1wb3J0IHsgVE9PTF9DQUxMQkFDS1MsIFNDQUxFX0ZBQ1RPUlMgfSBmcm9tICcuLi8uLi9jb25zdC9jb25zdC5qcyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscy5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQW5ub3RhdGlvbnNUb29sIGV4dGVuZHMgVG9vbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgbmFtZSwgY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIG5hbWUsIGNhbGxiYWNrcyk7XHJcbiAgICAgICAgdGhpcy5wb2ludENvbGxlY3Rpb24gPSB0aGlzLndpZGdldC5zY2VuZS5wcmltaXRpdmVzLmFkZChuZXcgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMucG9seWxpbmVDb2xsZWN0aW9uID0gdGhpcy53aWRnZXQuc2NlbmUucHJpbWl0aXZlcy5hZGQobmV3IFBvbHlsaW5lQ29sbGVjdGlvbigpKTtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0Fubm90YXRpb24gPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnByZVBvbHlnb25DbG9zZUNvbG9yID0gQ29sb3IuZnJvbUNzc0NvbG9yU3RyaW5nKCcjNjQ2Y2ZmJyk7XHJcbiAgICAgICAgdGhpcy5wb3N0UG9seWdvbkNsb3NlQ29sb3IgPSBDb2xvci5mcm9tQ3NzQ29sb3JTdHJpbmcoJyM2NGZmNjQnKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBvaW50cykgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBuZXcgU2NyZWVuU3BhY2VFdmVudEhhbmRsZXIodGhpcy53aWRnZXQuY2FudmFzKTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyLnNldElucHV0QWN0aW9uKChjbGljaykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwaWNrZWRPYmplY3QgPSB0aGlzLndpZGdldC5zY2VuZS5waWNrKGNsaWNrLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwaWNrZWRPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnRlc2lhbiA9IHRoaXMud2lkZ2V0LnNjZW5lLnBpY2tQb3NpdGlvbihjbGljay5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FydGVzaWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gQ2FydGVzaWFuMy5kaXN0YW5jZShjYXJ0ZXNpYW4sIHRoaXMucG9pbnRzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgc2NlbmUuc2NhbGUgaXMgaW4gbWV0ZXJzIHVzZSBidWZmZXIgb2YgMC41IG1ldGVyIHRvIGNsb3NlIHBvbHlnb24sIGlmIGluIGNlbnRpbWV0ZXJzIHVzZSAxIG1pbGltZXRlciAod2l0aCBzbWFsbGVyIG9iamVjdHMgd2Ugd2FudCBncmVhdGVyIHByZWNpc2lvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCA+PSAzICYmIGRpc3RhbmNlIDwgKHRoaXMuc2NhbGUgPT09IFNDQUxFX0ZBQ1RPUlMuTUVURVJTID8gMC41IDogMC4xKSkgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0Fubm90YXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB0aGlzLnBvaW50cy5zbGljZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLnBvc3RQb2x5Z29uQ2xvc2VDb2xvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2FsbGJhY2soVE9PTF9DQUxMQkFDS1MuT05fUE9MWUdPTl9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2goY2FydGVzaWFuKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50Q29sbGVjdGlvbi5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY2FydGVzaWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5wcmVQb2x5Z29uQ2xvc2VDb2xvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxTaXplOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZUNvbG9yOiBDb2xvci5XSElURSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZVdpZHRoOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvaW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2x5bGluZVByaW1pdGl2ZSA9IHRoaXMucG9seWxpbmVDb2xsZWN0aW9uLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IHRoaXMucG9pbnRzLnNsaWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBNYXRlcmlhbC5mcm9tVHlwZSgnUG9seWxpbmVPdXRsaW5lJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLnByZVBvbHlnb25DbG9zZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGxpbmVDb2xvcjogQ29sb3IuV0hJVEUud2l0aEFscGhhKDAuMyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZVdpZHRoOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCA+IDIgJiYgdGhpcy5wb2x5bGluZVByaW1pdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlsaW5lUHJpbWl0aXZlLnBvc2l0aW9ucyA9IHRoaXMucG9pbnRzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sIFNjcmVlblNwYWNlRXZlbnRUeXBlLkxFRlRfQ0xJQ0spO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXIuc2V0SW5wdXRBY3Rpb24oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhckNvbGxlY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfSwgU2NyZWVuU3BhY2VFdmVudFR5cGUuUklHSFRfQ0xJQ0spO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVBbm5vdGF0aW9uKGFubm90YXRpb25EYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGVuZGluZ0Fubm90YXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgY29sb3IgPSBDb2xvci5mcm9tQ3NzQ29sb3JTdHJpbmcoYW5ub3RhdGlvbkRhdGEuY29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24gPSB0aGlzLndpZGdldC5lbnRpdGllcy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IHV0aWxzLmdlbmVyYXRlVW5pcXVlSWQoJ2Fubm90YXRpb24nKSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IGFubm90YXRpb25EYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYW5ub3RhdGlvbkRhdGEuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBwb2x5Z29uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGllcmFyY2h5OiB0aGlzLnBlbmRpbmdBbm5vdGF0aW9uLnBvaW50cyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJQb3NpdGlvbkhlaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbDogY29sb3Iud2l0aEFscGhhKDAuNiksXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NpZmljYXRpb25UeXBlOiBDbGFzc2lmaWNhdGlvblR5cGUuQ0VTSVVNXzNEX1RJTEVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyQ29sbGVjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludHMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nQW5ub3RhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDYWxsYmFjayhUT09MX0NBTExCQUNLUy5PTl9BTk5PVEFUSU9OX1NBVkVELCB1dGlscy5leHRyYWN0QW5ub3RhdGlvbkRhdGEodGhpcy5hbm5vdGF0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbEFubm90YXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nQW5ub3RhdGlvbiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2xlYXJDb2xsZWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0Fubm90YXRpb24gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIF9jbGVhckNvbGxlY3Rpb25zKCkge1xyXG4gICAgICAgIHRoaXMucG9pbnRDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgIHRoaXMucG9seWxpbmVDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1xyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbIlRvb2wiLCJQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24iLCJQb2x5bGluZUNvbGxlY3Rpb24iLCJTY3JlZW5TcGFjZUV2ZW50SGFuZGxlciIsIlNjcmVlblNwYWNlRXZlbnRUeXBlIiwiQ2FydGVzaWFuMyIsIkNvbG9yIiwiTWF0ZXJpYWwiLCJDbGFzc2lmaWNhdGlvblR5cGUiLCJUT09MX0NBTExCQUNLUyIsIlNDQUxFX0ZBQ1RPUlMiLCJ1dGlscyIsIkFubm90YXRpb25zVG9vbCIsIl9Ub29sIiwic2NlbmUiLCJuYW1lIiwiY2FsbGJhY2tzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwicG9pbnRDb2xsZWN0aW9uIiwid2lkZ2V0IiwicHJpbWl0aXZlcyIsImFkZCIsInBvbHlsaW5lQ29sbGVjdGlvbiIsImhhbmRsZXIiLCJwZW5kaW5nQW5ub3RhdGlvbiIsInByZVBvbHlnb25DbG9zZUNvbG9yIiwiZnJvbUNzc0NvbG9yU3RyaW5nIiwicG9zdFBvbHlnb25DbG9zZUNvbG9yIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJhY3RpdmF0ZSIsIl90aGlzMiIsImFjdGl2ZSIsInBvaW50cyIsImNhbnZhcyIsInNldElucHV0QWN0aW9uIiwiY2xpY2siLCJwaWNrZWRPYmplY3QiLCJwaWNrIiwicG9zaXRpb24iLCJjYXJ0ZXNpYW4iLCJwaWNrUG9zaXRpb24iLCJsZW5ndGgiLCJkaXN0YW5jZSIsInNjYWxlIiwiTUVURVJTIiwic2xpY2UiLCJjb2xvciIsIl90cmlnZ2VyQ2FsbGJhY2siLCJPTl9QT0xZR09OX0NPTVBMRVRFIiwicHVzaCIsInBpeGVsU2l6ZSIsIm91dGxpbmVDb2xvciIsIldISVRFIiwib3V0bGluZVdpZHRoIiwicG9seWxpbmVQcmltaXRpdmUiLCJwb3NpdGlvbnMiLCJ3aWR0aCIsIm1hdGVyaWFsIiwiZnJvbVR5cGUiLCJ3aXRoQWxwaGEiLCJMRUZUX0NMSUNLIiwiX2NsZWFyQ29sbGVjdGlvbnMiLCJSSUdIVF9DTElDSyIsInNhdmVBbm5vdGF0aW9uIiwiYW5ub3RhdGlvbkRhdGEiLCJhbm5vdGF0aW9uIiwiZW50aXRpZXMiLCJpZCIsImdlbmVyYXRlVW5pcXVlSWQiLCJkZXNjcmlwdGlvbiIsInBvbHlnb24iLCJoaWVyYXJjaHkiLCJwZXJQb3NpdGlvbkhlaWdodCIsImNsYXNzaWZpY2F0aW9uVHlwZSIsIkNFU0lVTV8zRF9USUxFIiwiT05fQU5OT1RBVElPTl9TQVZFRCIsImV4dHJhY3RBbm5vdGF0aW9uRGF0YSIsImNhbmNlbEFubm90YXRpb24iLCJkZWFjdGl2YXRlIiwiZGVzdHJveSIsInJlbW92ZUFsbCJdLCJzb3VyY2VSb290IjoiIn0=