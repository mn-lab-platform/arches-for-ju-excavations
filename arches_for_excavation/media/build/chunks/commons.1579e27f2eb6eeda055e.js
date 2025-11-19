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
/* harmony import */ var _const_const_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const/const.js */ 64373);
/* harmony import */ var _templates_AnnotationModal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/AnnotationModal.js */ 6027);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var ToolController = /*#__PURE__*/function () {
  function ToolController(scene) {
    var _this = this;
    _classCallCheck(this, ToolController);
    this.toolDisplays = new Map();
    this.tools = [new _cesium_tools_DistanceTool_js__WEBPACK_IMPORTED_MODULE_0__.DistanceTool(scene, _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.DISTANCE, _defineProperty({}, _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_DISTANCE_UPDATE, function (distance) {
      return _this._updateDistanceDisplay(distance);
    })), new _cesium_tools_AnnotationsTool_js__WEBPACK_IMPORTED_MODULE_1__.AnnotationsTool(scene, _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.ANNOTATIONS, _defineProperty(_defineProperty({}, _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_POLYGON_COMPLETE, function () {
      return _this._showAnnotationToolModal();
    }), _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_ANNOTATION_SAVED, function (annotationData) {
      return _this._onAnnotationSaved(annotationData);
    })), new _cesium_tools_PickerTool_js__WEBPACK_IMPORTED_MODULE_2__.PickerTool(scene, _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.PICKER, _defineProperty(_defineProperty(_defineProperty({}, _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_ANNOTATION_PICKED, function (annotationData) {
      return _this._showPickerToolModal(annotationData);
    }), _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_ANNOTATION_SAVED, function (annotationData) {
      return _this._onAnnotationSaved(annotationData);
    }), _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_CALLBACKS.ON_ANNOTATION_DELETED, function (annotationId) {
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
    value: function _updateDistanceDisplay(distanceString) {
      var display = this.toolDisplays.get(_const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.DISTANCE);
      if (!display) return;
      if (distanceString == null) {
        display.textContent = '';
      } else {
        display.textContent = distanceString;
      }
    }
  }, {
    key: "_showAnnotationToolModal",
    value: function _showAnnotationToolModal() {
      var display = this.toolDisplays.get(_const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.ANNOTATIONS);
      (0,_templates_AnnotationModal_js__WEBPACK_IMPORTED_MODULE_4__.createAnnotationModal)(display, {}, this.tools.find(function (tool) {
        return tool.name === _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.ANNOTATIONS;
      }));
    }
  }, {
    key: "_showPickerToolModal",
    value: function _showPickerToolModal(annotationData) {
      var display = this.toolDisplays.get(_const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.PICKER);
      (0,_templates_AnnotationModal_js__WEBPACK_IMPORTED_MODULE_4__.createAnnotationModal)(display, annotationData, this.tools.find(function (tool) {
        return tool.name === _const_const_js__WEBPACK_IMPORTED_MODULE_3__.TOOL_NAMES.PICKER;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qyx1REFBVSxDQUFDYyxXQUFXO01BQUEsRUFBQyxDQUFDO0lBQ3JHO0VBQUM7SUFBQWMsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQVAsb0JBQW9CQSxDQUFDSixjQUFjLEVBQUU7TUFDakMsSUFBTXlDLE9BQU8sR0FBRyxJQUFJLENBQUNyRCxZQUFZLENBQUNzRCxHQUFHLENBQUM1RCx1REFBVSxDQUFDb0IsTUFBTSxDQUFDO01BQ3hEbkIsb0ZBQXFCLENBQUMwRCxPQUFPLEVBQUV6QyxjQUFjLEVBQUUsSUFBSSxDQUFDVixLQUFLLENBQUNzRCxJQUFJLENBQUMsVUFBQS9CLElBQUk7UUFBQSxPQUFJQSxJQUFJLENBQUNjLElBQUksS0FBSzdDLHVEQUFVLENBQUNvQixNQUFNO01BQUEsRUFBQyxFQUFFLElBQUksQ0FBQztJQUNsSDtFQUFDO0lBQUFRLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFWLGtCQUFrQkEsQ0FBQ0QsY0FBYyxFQUFFO01BQy9CO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtNQUNRNkMsT0FBTyxDQUFDQyxHQUFHLENBQUMscUJBQXFCLEVBQUU5QyxjQUFjLENBQUM7SUFDdEQ7RUFBQztJQUFBVSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBSixvQkFBb0JBLENBQUNELFlBQVksRUFBRTtNQUMvQnVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHFCQUFxQixFQUFFeEMsWUFBWSxDQUFDO0lBQ3BEO0VBQUM7QUFBQSxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL2FyY2hlc19zbG9jYWwvbWVkaWEvanMvY2VzaXVtX3ZpZXdlci91aS9Ub29sQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXN0YW5jZVRvb2wgfSBmcm9tICcuLi9jZXNpdW0vdG9vbHMvRGlzdGFuY2VUb29sLmpzJztcclxuaW1wb3J0IHsgQW5ub3RhdGlvbnNUb29sIH0gZnJvbSAnLi4vY2VzaXVtL3Rvb2xzL0Fubm90YXRpb25zVG9vbC5qcyc7XHJcbmltcG9ydCB7IFBpY2tlclRvb2wgfSBmcm9tICcuLi9jZXNpdW0vdG9vbHMvUGlja2VyVG9vbC5qcyc7XHJcbmltcG9ydCB7IFRPT0xfQ0FMTEJBQ0tTLCBUT09MX05BTUVTIH0gZnJvbSAnLi4vY29uc3QvY29uc3QuanMnO1xyXG5pbXBvcnQgeyBjcmVhdGVBbm5vdGF0aW9uTW9kYWwgfSBmcm9tICcuL3RlbXBsYXRlcy9Bbm5vdGF0aW9uTW9kYWwuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2xDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy50b29sRGlzcGxheXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy50b29scyA9IFtcclxuICAgICAgICAgICAgbmV3IERpc3RhbmNlVG9vbChzY2VuZSwgVE9PTF9OQU1FUy5ESVNUQU5DRSwge1xyXG4gICAgICAgICAgICAgICAgW1RPT0xfQ0FMTEJBQ0tTLk9OX0RJU1RBTkNFX1VQREFURV06IChkaXN0YW5jZSkgPT4gdGhpcy5fdXBkYXRlRGlzdGFuY2VEaXNwbGF5KGRpc3RhbmNlKVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbmV3IEFubm90YXRpb25zVG9vbChzY2VuZSwgVE9PTF9OQU1FUy5BTk5PVEFUSU9OUywge1xyXG4gICAgICAgICAgICAgICAgW1RPT0xfQ0FMTEJBQ0tTLk9OX1BPTFlHT05fQ09NUExFVEVdOiAoKSA9PiB0aGlzLl9zaG93QW5ub3RhdGlvblRvb2xNb2RhbCgpLFxyXG4gICAgICAgICAgICAgICAgW1RPT0xfQ0FMTEJBQ0tTLk9OX0FOTk9UQVRJT05fU0FWRURdOiAoYW5ub3RhdGlvbkRhdGEpID0+IHRoaXMuX29uQW5ub3RhdGlvblNhdmVkKGFubm90YXRpb25EYXRhKVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbmV3IFBpY2tlclRvb2woc2NlbmUsIFRPT0xfTkFNRVMuUElDS0VSLCB7XHJcbiAgICAgICAgICAgICAgICBbVE9PTF9DQUxMQkFDS1MuT05fQU5OT1RBVElPTl9QSUNLRURdOiAoYW5ub3RhdGlvbkRhdGEpID0+IHRoaXMuX3Nob3dQaWNrZXJUb29sTW9kYWwoYW5ub3RhdGlvbkRhdGEpLFxyXG4gICAgICAgICAgICAgICAgW1RPT0xfQ0FMTEJBQ0tTLk9OX0FOTk9UQVRJT05fU0FWRURdOiAoYW5ub3RhdGlvbkRhdGEpID0+IHRoaXMuX29uQW5ub3RhdGlvblNhdmVkKGFubm90YXRpb25EYXRhKSxcclxuICAgICAgICAgICAgICAgIFtUT09MX0NBTExCQUNLUy5PTl9BTk5PVEFUSU9OX0RFTEVURURdOiAoYW5ub3RhdGlvbklkKSA9PiB0aGlzLl9vbkFubm90YXRpb25EZWxldGVkKGFubm90YXRpb25JZClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuX3NldHVwVG9vbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2V0dXBUb29scygpIHtcclxuICAgICAgICB0aGlzLl9pbml0aWFsaXplVG9vbFVpKHRoaXMudG9vbHNbMF0sICcvc3RhdGljL2ltZy9jZXNpdW1fdmlld2VyL2Rpc3RhbmNlX2ljb24uc3ZnJyk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVRvb2xVaSh0aGlzLnRvb2xzWzFdLCAnL3N0YXRpYy9pbWcvY2VzaXVtX3ZpZXdlci9hbm5vdGF0aW9uc19pY29uLnN2ZycpO1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVUb29sVWkodGhpcy50b29sc1syXSwgJy9zdGF0aWMvaW1nL2Nlc2l1bV92aWV3ZXIvcGlja2VyX2ljb24uc3ZnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRpYWxpemVUb29sVWkodG9vbCwgaWNvblBhdGgpIHtcclxuICAgICAgICBjb25zdCB0b29sc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sc0NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICBjb25zdCB0b29sV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvb2xXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xXcmFwcGVyJyk7XHJcbiAgICAgICAgdG9vbHNDb250YWluZXIuYXBwZW5kQ2hpbGQodG9vbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBidXR0b24uaWQgPSBgJHt0b29sLm5hbWV9QnV0dG9uYDtcclxuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgndG9vbEJ1dHRvbicpO1xyXG4gICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ljb25QYXRofVwiIGFsdD1cIiR7dG9vbC5uYW1lfSBUb29sXCIgLz5gO1xyXG4gICAgICAgIHRvb2xXcmFwcGVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvb2xJbmZvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvb2xJbmZvRGlzcGxheS5pZCA9IGAke3Rvb2wubmFtZX1JbmZvRGlzcGxheWA7XHJcbiAgICAgICAgdG9vbEluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3Rvb2xJbmZvRGlzcGxheScpO1xyXG4gICAgICAgIHRvb2xXcmFwcGVyLmFwcGVuZENoaWxkKHRvb2xJbmZvRGlzcGxheSk7XHJcblxyXG4gICAgICAgIHRoaXMudG9vbERpc3BsYXlzLnNldCh0b29sLm5hbWUsIHRvb2xJbmZvRGlzcGxheSk7XHJcblxyXG4gICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gIXRvb2wuYWN0aXZlO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sLmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgndG9vbEFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVhY3RpdmF0ZVVudXNlZFRvb2xzKHRvb2wpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9vbC5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgndG9vbEFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2RlYWN0aXZhdGVVbnVzZWRUb29scyhhY3RpdmVUb29sKSB7XHJcbiAgICAgICAgdGhpcy50b29scy5mb3JFYWNoKCh0b29sKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b29sICE9PSBhY3RpdmVUb29sICYmIHRvb2wuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Rvb2wubmFtZX1CdXR0b25gKTtcclxuICAgICAgICAgICAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgndG9vbEFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZURpc3RhbmNlRGlzcGxheShkaXN0YW5jZVN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSB0aGlzLnRvb2xEaXNwbGF5cy5nZXQoVE9PTF9OQU1FUy5ESVNUQU5DRSk7XHJcbiAgICAgICAgaWYgKCFkaXNwbGF5KSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChkaXN0YW5jZVN0cmluZyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXkudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXNwbGF5LnRleHRDb250ZW50ID0gZGlzdGFuY2VTdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93QW5ub3RhdGlvblRvb2xNb2RhbCgpIHtcclxuICAgICAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy50b29sRGlzcGxheXMuZ2V0KFRPT0xfTkFNRVMuQU5OT1RBVElPTlMpO1xyXG4gICAgICAgIGNyZWF0ZUFubm90YXRpb25Nb2RhbChkaXNwbGF5LCB7fSwgdGhpcy50b29scy5maW5kKHRvb2wgPT4gdG9vbC5uYW1lID09PSBUT09MX05BTUVTLkFOTk9UQVRJT05TKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dQaWNrZXJUb29sTW9kYWwoYW5ub3RhdGlvbkRhdGEpIHtcclxuICAgICAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy50b29sRGlzcGxheXMuZ2V0KFRPT0xfTkFNRVMuUElDS0VSKTtcclxuICAgICAgICBjcmVhdGVBbm5vdGF0aW9uTW9kYWwoZGlzcGxheSwgYW5ub3RhdGlvbkRhdGEsIHRoaXMudG9vbHMuZmluZCh0b29sID0+IHRvb2wubmFtZSA9PT0gVE9PTF9OQU1FUy5QSUNLRVIpLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Bbm5vdGF0aW9uU2F2ZWQoYW5ub3RhdGlvbkRhdGEpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFeHBlY3RzIGFubm90YXRpb25EYXRhIHRvIGJlIGFuIG9iamVjdCBsaWtlOlxyXG4gICAgICAgICAqIHtcclxuICAgICAgICAgKiAgIG5hbWU6ICdBbm5vdGF0aW9uIE5hbWUnLFxyXG4gICAgICAgICAqICAgZGVzY3JpcHRpb246ICdBbm5vdGF0aW9uIERlc2NyaXB0aW9uJyxcclxuICAgICAgICAgKiAgIGNvbG9yOiAnI2ZmMDAwMCcsXHJcbiAgICAgICAgICogICBwb3NpdGlvbjogW1t4MSwgeTEsIHoxXSwgW3gyLCB5MiwgejJdLCAuLi5dICAvLyBBcnJheSBvZiBwb3NpdGlvbiBhcnJheXNcclxuICAgICAgICAgKiB9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Fubm90YXRpb24gY3JlYXRlZDonLCBhbm5vdGF0aW9uRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQW5ub3RhdGlvbkRlbGV0ZWQoYW5ub3RhdGlvbklkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Fubm90YXRpb24gZGVsZXRlZDonLCBhbm5vdGF0aW9uSWQpO1xyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbIkRpc3RhbmNlVG9vbCIsIkFubm90YXRpb25zVG9vbCIsIlBpY2tlclRvb2wiLCJUT09MX0NBTExCQUNLUyIsIlRPT0xfTkFNRVMiLCJjcmVhdGVBbm5vdGF0aW9uTW9kYWwiLCJUb29sQ29udHJvbGxlciIsInNjZW5lIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJ0b29sRGlzcGxheXMiLCJNYXAiLCJ0b29scyIsIkRJU1RBTkNFIiwiX2RlZmluZVByb3BlcnR5IiwiT05fRElTVEFOQ0VfVVBEQVRFIiwiZGlzdGFuY2UiLCJfdXBkYXRlRGlzdGFuY2VEaXNwbGF5IiwiQU5OT1RBVElPTlMiLCJPTl9QT0xZR09OX0NPTVBMRVRFIiwiX3Nob3dBbm5vdGF0aW9uVG9vbE1vZGFsIiwiT05fQU5OT1RBVElPTl9TQVZFRCIsImFubm90YXRpb25EYXRhIiwiX29uQW5ub3RhdGlvblNhdmVkIiwiUElDS0VSIiwiT05fQU5OT1RBVElPTl9QSUNLRUQiLCJfc2hvd1BpY2tlclRvb2xNb2RhbCIsIk9OX0FOTk9UQVRJT05fREVMRVRFRCIsImFubm90YXRpb25JZCIsIl9vbkFubm90YXRpb25EZWxldGVkIiwiX3NldHVwVG9vbHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsIl9pbml0aWFsaXplVG9vbFVpIiwidG9vbCIsImljb25QYXRoIiwiX3RoaXMyIiwidG9vbHNDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b29sV3JhcHBlciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImJ1dHRvbiIsImlkIiwiY29uY2F0IiwibmFtZSIsImlubmVySFRNTCIsInRvb2xJbmZvRGlzcGxheSIsInNldCIsIm9uY2xpY2siLCJhY3RpdmUiLCJhY3RpdmF0ZSIsIl9kZWFjdGl2YXRlVW51c2VkVG9vbHMiLCJkZWFjdGl2YXRlIiwicmVtb3ZlIiwiYWN0aXZlVG9vbCIsImZvckVhY2giLCJnZXRFbGVtZW50QnlJZCIsImRpc3RhbmNlU3RyaW5nIiwiZGlzcGxheSIsImdldCIsInRleHRDb250ZW50IiwiZmluZCIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9