"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[43271],{

/***/ 43271:
/*!*******************************************************************!*\
  !*** ./arches_slocal/media/js/cesium_viewer/ui/ToolController.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolController: () => (/* binding */ ToolController)
/* harmony export */ });
/* harmony import */ var _cesium_tools_DistanceTool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cesium/tools/DistanceTool.js */ 45104);
/* harmony import */ var _cesium_tools_AnnotationsTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cesium/tools/AnnotationsTool.js */ 95861);
/* harmony import */ var _cesium_tools_PickerTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cesium/tools/PickerTool.js */ 5349);
/* harmony import */ var _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const/constTools.js */ 97846);
/* harmony import */ var _templates_AnnotationModal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/AnnotationModal.js */ 6027);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var ToolController = /*#__PURE__*/function () {
  function ToolController(widget) {
    var _this = this;
    _classCallCheck(this, ToolController);
    this.toolDisplays = new Map();
    this.tools = [new _cesium_tools_DistanceTool_js__WEBPACK_IMPORTED_MODULE_0__.DistanceTool(widget, _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.DISTANCE, _defineProperty({}, _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_DISTANCE_UPDATE, function (distance) {
      return _this._updateDistanceDisplay(distance);
    })), new _cesium_tools_AnnotationsTool_js__WEBPACK_IMPORTED_MODULE_1__.AnnotationsTool(widget, _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.ANNOTATIONS, _defineProperty(_defineProperty({}, _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_POLYGON_COMPLETE, function () {
      return _this._showAnnotationToolModal();
    }), _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_ANNOTATION_SAVED, function (annotationData) {
      return _this._onAnnotationSaved(annotationData);
    })), new _cesium_tools_PickerTool_js__WEBPACK_IMPORTED_MODULE_2__.PickerTool(widget, _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.PICKER, _defineProperty(_defineProperty(_defineProperty({}, _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_ANNOTATION_PICKED, function (annotationData) {
      return _this._showPickerToolModal(annotationData);
    }), _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_ANNOTATION_SAVED, function (annotationData) {
      return _this._onAnnotationSaved(annotationData);
    }), _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_ANNOTATION_DELETED, function (annotationId) {
      return _this._onAnnotationDeleted(annotationId);
    }))];
    this._setupTools();
  }
  return _createClass(ToolController, [{
    key: "_setupTools",
    value: function _setupTools() {
      this._initializeToolUi(this.tools[0], '/static/img/cesium_viewer/distance_icon.svg');
      this._initializeToolUi(this.tools[1], '/static/img/cesium_viewer/annotations_icon.svg');
      this._initializeToolUi(this.tools[2], '/static/img/cesium_viewer/picker_icon.svg');
    }
  }, {
    key: "_initializeToolUi",
    value: function _initializeToolUi(tool, iconPath) {
      var _this2 = this;
      var toolsContainer = document.querySelector('.toolsContainer');
      var toolWrapper = document.createElement('div');
      toolWrapper.classList.add('toolWrapper');
      toolsContainer.appendChild(toolWrapper);
      var button = document.createElement('button');
      button.id = "".concat(tool.name, "Button");
      button.classList.add('toolButton');
      button.innerHTML = "<img src=\"".concat(iconPath, "\" alt=\"").concat(tool.name, " Tool\" />");
      toolWrapper.appendChild(button);
      var toolInfoDisplay = document.createElement('div');
      toolInfoDisplay.id = "".concat(tool.name, "InfoDisplay");
      toolInfoDisplay.classList.add('toolInfoDisplay');
      toolWrapper.appendChild(toolInfoDisplay);
      this.toolDisplays.set(tool.name, toolInfoDisplay);
      button.onclick = function () {
        var active = !tool.active;
        if (active) {
          tool.activate();
          button.classList.add('toolActive');
          _this2._deactivateUnusedTools(tool);
        } else {
          tool.deactivate();
          button.classList.remove('toolActive');
        }
      };
    }
  }, {
    key: "_deactivateUnusedTools",
    value: function _deactivateUnusedTools(activeTool) {
      this.tools.forEach(function (tool) {
        if (tool !== activeTool && tool.active) {
          tool.deactivate();
          var button = document.getElementById("".concat(tool.name, "Button"));
          if (button) {
            button.classList.remove('toolActive');
          }
        }
      });
    }
  }, {
    key: "_updateDistanceDisplay",
    value: function _updateDistanceDisplay(distance) {
      var display = this.toolDisplays.get(_const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.DISTANCE);
      if (!display) return;
      if (distance == null) {
        display.textContent = '';
      } else {
        display.textContent = "".concat(distance.toFixed(3), " cm");
      }
    }
  }, {
    key: "_showAnnotationToolModal",
    value: function _showAnnotationToolModal() {
      var display = this.toolDisplays.get(_const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.ANNOTATIONS);
      (0,_templates_AnnotationModal_js__WEBPACK_IMPORTED_MODULE_4__.createAnnotationModal)(display, {}, this.tools.find(function (tool) {
        return tool.name === _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.ANNOTATIONS;
      }));
    }
  }, {
    key: "_showPickerToolModal",
    value: function _showPickerToolModal(annotationData) {
      var display = this.toolDisplays.get(_const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.PICKER);
      (0,_templates_AnnotationModal_js__WEBPACK_IMPORTED_MODULE_4__.createAnnotationModal)(display, annotationData, this.tools.find(function (tool) {
        return tool.name === _const_constTools_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.PICKER;
      }), true);
    }
  }, {
    key: "_onAnnotationSaved",
    value: function _onAnnotationSaved(annotationData) {
      /**
       * Expects annotationData to be an object like:
       * {
       *   name: 'Annotation Name',
       *   description: 'Annotation Description',
       *   color: '#ff0000',
       *   position: [[x1, y1, z1], [x2, y2, z2], ...]  // Array of position arrays
       * }
       */
      console.log('Annotation created:', annotationData);
    }
  }, {
    key: "_onAnnotationDeleted",
    value: function _onAnnotationDeleted(annotationId) {
      console.log('Annotation deleted:', annotationId);
    }
  }]);
}();

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYjExOTdmYzQyZDRiZWIyNzk1ZGQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErRDtBQUNNO0FBQ1Y7QUFDUztBQUNHO0FBRWhFLElBQU1NLGNBQWM7RUFDdkIsU0FBQUEsZUFBWUMsTUFBTSxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUFBQyxlQUFBLE9BQUFILGNBQUE7SUFDaEIsSUFBSSxDQUFDSSxZQUFZLEdBQUcsSUFBSUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsSUFBSSxDQUFDQyxLQUFLLEdBQUcsQ0FDVCxJQUFJWix1RUFBWSxDQUFDTyxNQUFNLEVBQUVILDREQUFVLENBQUNTLFFBQVEsRUFBQUMsZUFBQSxLQUN2Q1gsZ0VBQWMsQ0FBQ1ksa0JBQWtCLEVBQUcsVUFBQ0MsUUFBUTtNQUFBLE9BQUtSLEtBQUksQ0FBQ1Msc0JBQXNCLENBQUNELFFBQVEsQ0FBQztJQUFBLEVBQzNGLENBQUMsRUFDRixJQUFJZiw2RUFBZSxDQUFDTSxNQUFNLEVBQUVILDREQUFVLENBQUNjLFdBQVcsRUFBQUosZUFBQSxDQUFBQSxlQUFBLEtBQzdDWCxnRUFBYyxDQUFDZ0IsbUJBQW1CLEVBQUc7TUFBQSxPQUFNWCxLQUFJLENBQUNZLHdCQUF3QixDQUFDLENBQUM7SUFBQSxJQUMxRWpCLGdFQUFjLENBQUNrQixtQkFBbUIsRUFBRyxVQUFDQyxjQUFjO01BQUEsT0FBS2QsS0FBSSxDQUFDZSxrQkFBa0IsQ0FBQ0QsY0FBYyxDQUFDO0lBQUEsRUFDcEcsQ0FBQyxFQUNGLElBQUlwQixtRUFBVSxDQUFDSyxNQUFNLEVBQUVILDREQUFVLENBQUNvQixNQUFNLEVBQUFWLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLEtBQ25DWCxnRUFBYyxDQUFDc0Isb0JBQW9CLEVBQUcsVUFBQ0gsY0FBYztNQUFBLE9BQUtkLEtBQUksQ0FBQ2tCLG9CQUFvQixDQUFDSixjQUFjLENBQUM7SUFBQSxJQUNuR25CLGdFQUFjLENBQUNr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QUFDLFVBQUEvQixJQUFJO1FBQUEsT0FBSUEsSUFBSSxDQUFDYyxJQUFJLEtBQUs3Qyw0REFBVSxDQUFDYyxXQUFXO01BQUEsRUFBQyxDQUFDO0lBQ3JHO0VBQUM7SUFBQWMsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQVAsb0JBQW9CQSxDQUFDSixjQUFjLEVBQUU7TUFDakMsSUFBTXdDLE9BQU8sR0FBRyxJQUFJLENBQUNwRCxZQUFZLENBQUNxRCxHQUFHLENBQUMzRCw0REFBVSxDQUFDb0IsTUFBTSxDQUFDO01BQ3hEbkIsb0ZBQXFCLENBQUN5RCxPQUFPLEVBQUV4QyxjQUFjLEVBQUUsSUFBSSxDQUFDVixLQUFLLENBQUNzRCxJQUFJLENBQUMsVUFBQS9CLElBQUk7UUFBQSxPQUFJQSxJQUFJLENBQUNjLElBQUksS0FBSzdDLDREQUFVLENBQUNvQixNQUFNO01BQUEsRUFBQyxFQUFFLElBQUksQ0FBQztJQUNsSDtFQUFDO0lBQUFRLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFWLGtCQUFrQkEsQ0FBQ0QsY0FBYyxFQUFFO01BQy9CO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtNQUNRNkMsT0FBTyxDQUFDQyxHQUFHLENBQUMscUJBQXFCLEVBQUU5QyxjQUFjLENBQUM7SUFDdEQ7RUFBQztJQUFBVSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBSixvQkFBb0JBLENBQUNELFlBQVksRUFBRTtNQUMvQnVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHFCQUFxQixFQUFFeEMsWUFBWSxDQUFDO0lBQ3BEO0VBQUM7QUFBQSxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL2FyY2hlc19zbG9jYWwvbWVkaWEvanMvY2VzaXVtX3ZpZXdlci91aS9Ub29sQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXN0YW5jZVRvb2wgfSBmcm9tICcuLi9jZXNpdW0vdG9vbHMvRGlzdGFuY2VUb29sLmpzJztcclxuaW1wb3J0IHsgQW5ub3RhdGlvbnNUb29sIH0gZnJvbSAnLi4vY2VzaXVtL3Rvb2xzL0Fubm90YXRpb25zVG9vbC5qcyc7XHJcbmltcG9ydCB7IFBpY2tlclRvb2wgfSBmcm9tICcuLi9jZXNpdW0vdG9vbHMvUGlja2VyVG9vbC5qcyc7XHJcbmltcG9ydCB7IFRPT0xfQ0FMTEJBQ0tTLCBUT09MX05BTUVTIH0gZnJvbSAnLi4vY29uc3QvY29uc3RUb29scy5qcyc7XHJcbmltcG9ydCB7IGNyZWF0ZUFubm90YXRpb25Nb2RhbCB9IGZyb20gJy4vdGVtcGxhdGVzL0Fubm90YXRpb25Nb2RhbC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9vbENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0KSB7XHJcbiAgICAgICAgdGhpcy50b29sRGlzcGxheXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy50b29scyA9IFtcclxuICAgICAgICAgICAgbmV3IERpc3RhbmNlVG9vbCh3aWRnZXQsIFRPT0xfTkFNRVMuRElTVEFOQ0UsIHtcclxuICAgICAgICAgICAgICAgIFtUT09MX0NBTExCQUNLUy5PTl9ESVNUQU5DRV9VUERBVEVdOiAoZGlzdGFuY2UpID0+IHRoaXMuX3VwZGF0ZURpc3RhbmNlRGlzcGxheShkaXN0YW5jZSlcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5ldyBBbm5vdGF0aW9uc1Rvb2wod2lkZ2V0LCBUT09MX05BTUVTLkFOTk9UQVRJT05TLCB7XHJcbiAgICAgICAgICAgICAgICBbVE9PTF9DQUxMQkFDS1MuT05fUE9MWUdPTl9DT01QTEVURV06ICgpID0+IHRoaXMuX3Nob3dBbm5vdGF0aW9uVG9vbE1vZGFsKCksXHJcbiAgICAgICAgICAgICAgICBbVE9PTF9DQUxMQkFDS1MuT05fQU5OT1RBVElPTl9TQVZFRF06IChhbm5vdGF0aW9uRGF0YSkgPT4gdGhpcy5fb25Bbm5vdGF0aW9uU2F2ZWQoYW5ub3RhdGlvbkRhdGEpXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBuZXcgUGlja2VyVG9vbCh3aWRnZXQsIFRPT0xfTkFNRVMuUElDS0VSLCB7XHJcbiAgICAgICAgICAgICAgICBbVE9PTF9DQUxMQkFDS1MuT05fQU5OT1RBVElPTl9QSUNLRURdOiAoYW5ub3RhdGlvbkRhdGEpID0+IHRoaXMuX3Nob3dQaWNrZXJUb29sTW9kYWwoYW5ub3RhdGlvbkRhdGEpLFxyXG4gICAgICAgICAgICAgICAgW1RPT0xfQ0FMTEJBQ0tTLk9OX0FOTk9UQVRJT05fU0FWRURdOiAoYW5ub3RhdGlvbkRhdGEpID0+IHRoaXMuX29uQW5ub3RhdGlvblNhdmVkKGFubm90YXRpb25EYXRhKSxcclxuICAgICAgICAgICAgICAgIFtUT09MX0NBTExCQUNLUy5PTl9BTk5PVEFUSU9OX0RFTEVURURdOiAoYW5ub3RhdGlvbklkKSA9PiB0aGlzLl9vbkFubm90YXRpb25EZWxldGVkKGFubm90YXRpb25JZClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuX3NldHVwVG9vbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2V0dXBUb29scygpIHtcclxuICAgICAgICB0aGlzLl9pbml0aWFsaXplVG9vbFVpKHRoaXMudG9vbHNbMF0sICcvc3RhdGljL2ltZy9jZXNpdW1fdmlld2VyL2Rpc3RhbmNlX2ljb24uc3ZnJyk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVRvb2xVaSh0aGlzLnRvb2xzWzFdLCAnL3N0YXRpYy9pbWcvY2VzaXVtX3ZpZXdlci9hbm5vdGF0aW9uc19pY29uLnN2ZycpO1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVUb29sVWkodGhpcy50b29sc1syXSwgJy9zdGF0aWMvaW1nL2Nlc2l1bV92aWV3ZXIvcGlja2VyX2ljb24uc3ZnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRpYWxpemVUb29sVWkodG9vbCwgaWNvblBhdGgpIHtcclxuICAgICAgICBjb25zdCB0b29sc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sc0NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICBjb25zdCB0b29sV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvb2xXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xXcmFwcGVyJyk7XHJcbiAgICAgICAgdG9vbHNDb250YWluZXIuYXBwZW5kQ2hpbGQodG9vbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBidXR0b24uaWQgPSBgJHt0b29sLm5hbWV9QnV0dG9uYDtcclxuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgndG9vbEJ1dHRvbicpO1xyXG4gICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ljb25QYXRofVwiIGFsdD1cIiR7dG9vbC5uYW1lfSBUb29sXCIgLz5gO1xyXG4gICAgICAgIHRvb2xXcmFwcGVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvb2xJbmZvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvb2xJbmZvRGlzcGxheS5pZCA9IGAke3Rvb2wubmFtZX1JbmZvRGlzcGxheWA7XHJcbiAgICAgICAgdG9vbEluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3Rvb2xJbmZvRGlzcGxheScpO1xyXG4gICAgICAgIHRvb2xXcmFwcGVyLmFwcGVuZENoaWxkKHRvb2xJbmZvRGlzcGxheSk7XHJcblxyXG4gICAgICAgIHRoaXMudG9vbERpc3BsYXlzLnNldCh0b29sLm5hbWUsIHRvb2xJbmZvRGlzcGxheSk7XHJcblxyXG4gICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gIXRvb2wuYWN0aXZlO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sLmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgndG9vbEFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVhY3RpdmF0ZVVudXNlZFRvb2xzKHRvb2wpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9vbC5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgndG9vbEFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2RlYWN0aXZhdGVVbnVzZWRUb29scyhhY3RpdmVUb29sKSB7XHJcbiAgICAgICAgdGhpcy50b29scy5mb3JFYWNoKCh0b29sKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b29sICE9PSBhY3RpdmVUb29sICYmIHRvb2wuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Rvb2wubmFtZX1CdXR0b25gKTtcclxuICAgICAgICAgICAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgndG9vbEFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZURpc3RhbmNlRGlzcGxheShkaXN0YW5jZSkge1xyXG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSB0aGlzLnRvb2xEaXNwbGF5cy5nZXQoVE9PTF9OQU1FUy5ESVNUQU5DRSk7XHJcbiAgICAgICAgaWYgKCFkaXNwbGF5KSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChkaXN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXkudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGlzdGFuY2UudG9GaXhlZCgzKX0gY21gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0Fubm90YXRpb25Ub29sTW9kYWwoKSB7XHJcbiAgICAgICAgY29uc3QgZGlzcGxheSA9IHRoaXMudG9vbERpc3BsYXlzLmdldChUT09MX05BTUVTLkFOTk9UQVRJT05TKTtcclxuICAgICAgICBjcmVhdGVBbm5vdGF0aW9uTW9kYWwoZGlzcGxheSwge30sIHRoaXMudG9vbHMuZmluZCh0b29sID0+IHRvb2wubmFtZSA9PT0gVE9PTF9OQU1FUy5BTk5PVEFUSU9OUykpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zaG93UGlja2VyVG9vbE1vZGFsKGFubm90YXRpb25EYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZGlzcGxheSA9IHRoaXMudG9vbERpc3BsYXlzLmdldChUT09MX05BTUVTLlBJQ0tFUik7XHJcbiAgICAgICAgY3JlYXRlQW5ub3RhdGlvbk1vZGFsKGRpc3BsYXksIGFubm90YXRpb25EYXRhLCB0aGlzLnRvb2xzLmZpbmQodG9vbCA9PiB0b29sLm5hbWUgPT09IFRPT0xfTkFNRVMuUElDS0VSKSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQW5ub3RhdGlvblNhdmVkKGFubm90YXRpb25EYXRhKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXhwZWN0cyBhbm5vdGF0aW9uRGF0YSB0byBiZSBhbiBvYmplY3QgbGlrZTpcclxuICAgICAgICAgKiB7XHJcbiAgICAgICAgICogICBuYW1lOiAnQW5ub3RhdGlvbiBOYW1lJyxcclxuICAgICAgICAgKiAgIGRlc2NyaXB0aW9uOiAnQW5ub3RhdGlvbiBEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICogICBjb2xvcjogJyNmZjAwMDAnLFxyXG4gICAgICAgICAqICAgcG9zaXRpb246IFtbeDEsIHkxLCB6MV0sIFt4MiwgeTIsIHoyXSwgLi4uXSAgLy8gQXJyYXkgb2YgcG9zaXRpb24gYXJyYXlzXHJcbiAgICAgICAgICogfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBbm5vdGF0aW9uIGNyZWF0ZWQ6JywgYW5ub3RhdGlvbkRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkFubm90YXRpb25EZWxldGVkKGFubm90YXRpb25JZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBbm5vdGF0aW9uIGRlbGV0ZWQ6JywgYW5ub3RhdGlvbklkKTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiRGlzdGFuY2VUb29sIiwiQW5ub3RhdGlvbnNUb29sIiwiUGlja2VyVG9vbCIsIlRPT0xfQ0FMTEJBQ0tTIiwiVE9PTF9OQU1FUyIsImNyZWF0ZUFubm90YXRpb25Nb2RhbCIsIlRvb2xDb250cm9sbGVyIiwid2lkZ2V0IiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJ0b29sRGlzcGxheXMiLCJNYXAiLCJ0b29scyIsIkRJU1RBTkNFIiwiX2RlZmluZVByb3BlcnR5IiwiT05fRElTVEFOQ0VfVVBEQVRFIiwiZGlzdGFuY2UiLCJfdXBkYXRlRGlzdGFuY2VEaXNwbGF5IiwiQU5OT1RBVElPTlMiLCJPTl9QT0xZR09OX0NPTVBMRVRFIiwiX3Nob3dBbm5vdGF0aW9uVG9vbE1vZGFsIiwiT05fQU5OT1RBVElPTl9TQVZFRCIsImFubm90YXRpb25EYXRhIiwiX29uQW5ub3RhdGlvblNhdmVkIiwiUElDS0VSIiwiT05fQU5OT1RBVElPTl9QSUNLRUQiLCJfc2hvd1BpY2tlclRvb2xNb2RhbCIsIk9OX0FOTk9UQVRJT05fREVMRVRFRCIsImFubm90YXRpb25JZCIsIl9vbkFubm90YXRpb25EZWxldGVkIiwiX3NldHVwVG9vbHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsIl9pbml0aWFsaXplVG9vbFVpIiwidG9vbCIsImljb25QYXRoIiwiX3RoaXMyIiwidG9vbHNDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b29sV3JhcHBlciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImJ1dHRvbiIsImlkIiwiY29uY2F0IiwibmFtZSIsImlubmVySFRNTCIsInRvb2xJbmZvRGlzcGxheSIsInNldCIsIm9uY2xpY2siLCJhY3RpdmUiLCJhY3RpdmF0ZSIsIl9kZWFjdGl2YXRlVW51c2VkVG9vbHMiLCJkZWFjdGl2YXRlIiwicmVtb3ZlIiwiYWN0aXZlVG9vbCIsImZvckVhY2giLCJnZXRFbGVtZW50QnlJZCIsImRpc3BsYXkiLCJnZXQiLCJ0ZXh0Q29udGVudCIsInRvRml4ZWQiLCJmaW5kIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=