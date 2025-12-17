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
    this.readOnly = scene.readOnly;
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
      if (!this.readOnly) {
        this._initializeToolUi(this.tools[1], '/static/img/cesium_viewer/annotations_icon.svg');
      }
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
      }), true, this.readOnly);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsRUFBRSxJQUFJLENBQUNuRCxLQUFLLENBQUNzRCxJQUFJLENBQUMsVUFBQS9CLElBQUk7UUFBQSxPQUFJQSxJQUFJLENBQUNjLElBQUksS0FBSzlDLHVEQUFVLENBQUNlLFdBQVc7TUFBQSxFQUFDLENBQUM7SUFDckc7RUFBQztJQUFBYyxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBUCxvQkFBb0JBLENBQUNKLGNBQWMsRUFBRTtNQUNqQyxJQUFNeUMsT0FBTyxHQUFHLElBQUksQ0FBQ3JELFlBQVksQ0FBQ3NELEdBQUcsQ0FBQzdELHVEQUFVLENBQUNxQixNQUFNLENBQUM7TUFDeERwQixvRkFBcUIsQ0FBQzJELE9BQU8sRUFBRXpDLGNBQWMsRUFBRSxJQUFJLENBQUNWLEtBQUssQ0FBQ3NELElBQUksQ0FBQyxVQUFBL0IsSUFBSTtRQUFBLE9BQUlBLElBQUksQ0FBQ2MsSUFBSSxLQUFLOUMsdURBQVUsQ0FBQ3FCLE1BQU07TUFBQSxFQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQ2YsUUFBUSxDQUFDO0lBQ2pJO0VBQUM7SUFBQXVCLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFWLGtCQUFrQkEsQ0FBQ0QsY0FBYyxFQUFFO01BQy9CO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtNQUNRNkMsT0FBTyxDQUFDQyxHQUFHLENBQUMscUJBQXFCLEVBQUU5QyxjQUFjLENBQUM7SUFDdEQ7RUFBQztJQUFBVSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBSixvQkFBb0JBLENBQUNELFlBQVksRUFBRTtNQUMvQnVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHFCQUFxQixFQUFFeEMsWUFBWSxDQUFDO0lBQ3BEO0VBQUM7QUFBQSxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL2FyY2hlc19zbG9jYWwvbWVkaWEvanMvY2VzaXVtX3ZpZXdlci91aS9Ub29sQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXN0YW5jZVRvb2wgfSBmcm9tICcuLi9jZXNpdW0vdG9vbHMvRGlzdGFuY2VUb29sLmpzJztcclxuaW1wb3J0IHsgQW5ub3RhdGlvbnNUb29sIH0gZnJvbSAnLi4vY2VzaXVtL3Rvb2xzL0Fubm90YXRpb25zVG9vbC5qcyc7XHJcbmltcG9ydCB7IFBpY2tlclRvb2wgfSBmcm9tICcuLi9jZXNpdW0vdG9vbHMvUGlja2VyVG9vbC5qcyc7XHJcbmltcG9ydCB7IFRPT0xfQ0FMTEJBQ0tTLCBUT09MX05BTUVTIH0gZnJvbSAnLi4vY29uc3QvY29uc3QuanMnO1xyXG5pbXBvcnQgeyBjcmVhdGVBbm5vdGF0aW9uTW9kYWwgfSBmcm9tICcuL3RlbXBsYXRlcy9Bbm5vdGF0aW9uTW9kYWwuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2xDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5yZWFkT25seSA9IHNjZW5lLnJlYWRPbmx5O1xyXG4gICAgICAgIHRoaXMudG9vbERpc3BsYXlzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMudG9vbHMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBEaXN0YW5jZVRvb2woc2NlbmUsIFRPT0xfTkFNRVMuRElTVEFOQ0UsIHtcclxuICAgICAgICAgICAgICAgIFtUT09MX0NBTExCQUNLUy5PTl9ESVNUQU5DRV9VUERBVEVdOiAoZGlzdGFuY2UpID0+IHRoaXMuX3VwZGF0ZURpc3RhbmNlRGlzcGxheShkaXN0YW5jZSlcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5ldyBBbm5vdGF0aW9uc1Rvb2woc2NlbmUsIFRPT0xfTkFNRVMuQU5OT1RBVElPTlMsIHtcclxuICAgICAgICAgICAgICAgIFtUT09MX0NBTExCQUNLUy5PTl9QT0xZR09OX0NPTVBMRVRFXTogKCkgPT4gdGhpcy5fc2hvd0Fubm90YXRpb25Ub29sTW9kYWwoKSxcclxuICAgICAgICAgICAgICAgIFtUT09MX0NBTExCQUNLUy5PTl9BTk5PVEFUSU9OX1NBVkVEXTogKGFubm90YXRpb25EYXRhKSA9PiB0aGlzLl9vbkFubm90YXRpb25TYXZlZChhbm5vdGF0aW9uRGF0YSlcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5ldyBQaWNrZXJUb29sKHNjZW5lLCBUT09MX05BTUVTLlBJQ0tFUiwge1xyXG4gICAgICAgICAgICAgICAgW1RPT0xfQ0FMTEJBQ0tTLk9OX0FOTk9UQVRJT05fUElDS0VEXTogKGFubm90YXRpb25EYXRhKSA9PiB0aGlzLl9zaG93UGlja2VyVG9vbE1vZGFsKGFubm90YXRpb25EYXRhKSxcclxuICAgICAgICAgICAgICAgIFtUT09MX0NBTExCQUNLUy5PTl9BTk5PVEFUSU9OX1NBVkVEXTogKGFubm90YXRpb25EYXRhKSA9PiB0aGlzLl9vbkFubm90YXRpb25TYXZlZChhbm5vdGF0aW9uRGF0YSksXHJcbiAgICAgICAgICAgICAgICBbVE9PTF9DQUxMQkFDS1MuT05fQU5OT1RBVElPTl9ERUxFVEVEXTogKGFubm90YXRpb25JZCkgPT4gdGhpcy5fb25Bbm5vdGF0aW9uRGVsZXRlZChhbm5vdGF0aW9uSWQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLl9zZXR1cFRvb2xzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldHVwVG9vbHMoKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVRvb2xVaSh0aGlzLnRvb2xzWzBdLCAnL3N0YXRpYy9pbWcvY2VzaXVtX3ZpZXdlci9kaXN0YW5jZV9pY29uLnN2ZycpOyBcclxuICAgICAgICBpZiAoIXRoaXMucmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVRvb2xVaSh0aGlzLnRvb2xzWzFdLCAnL3N0YXRpYy9pbWcvY2VzaXVtX3ZpZXdlci9hbm5vdGF0aW9uc19pY29uLnN2ZycpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVRvb2xVaSh0aGlzLnRvb2xzWzJdLCAnL3N0YXRpYy9pbWcvY2VzaXVtX3ZpZXdlci9waWNrZXJfaWNvbi5zdmcnKTsgXHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRpYWxpemVUb29sVWkodG9vbCwgaWNvblBhdGgpIHtcclxuICAgICAgICBjb25zdCB0b29sc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sc0NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICBjb25zdCB0b29sV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvb2xXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xXcmFwcGVyJyk7XHJcbiAgICAgICAgdG9vbHNDb250YWluZXIuYXBwZW5kQ2hpbGQodG9vbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBidXR0b24uaWQgPSBgJHt0b29sLm5hbWV9QnV0dG9uYDtcclxuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgndG9vbEJ1dHRvbicpO1xyXG4gICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ljb25QYXRofVwiIGFsdD1cIiR7dG9vbC5uYW1lfSBUb29sXCIgLz5gO1xyXG4gICAgICAgIHRvb2xXcmFwcGVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvb2xJbmZvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvb2xJbmZvRGlzcGxheS5pZCA9IGAke3Rvb2wubmFtZX1JbmZvRGlzcGxheWA7XHJcbiAgICAgICAgdG9vbEluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3Rvb2xJbmZvRGlzcGxheScpO1xyXG4gICAgICAgIHRvb2xXcmFwcGVyLmFwcGVuZENoaWxkKHRvb2xJbmZvRGlzcGxheSk7XHJcblxyXG4gICAgICAgIHRoaXMudG9vbERpc3BsYXlzLnNldCh0b29sLm5hbWUsIHRvb2xJbmZvRGlzcGxheSk7XHJcblxyXG4gICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gIXRvb2wuYWN0aXZlO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sLmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgndG9vbEFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVhY3RpdmF0ZVVudXNlZFRvb2xzKHRvb2wpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9vbC5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgndG9vbEFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2RlYWN0aXZhdGVVbnVzZWRUb29scyhhY3RpdmVUb29sKSB7XHJcbiAgICAgICAgdGhpcy50b29scy5mb3JFYWNoKCh0b29sKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b29sICE9PSBhY3RpdmVUb29sICYmIHRvb2wuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Rvb2wubmFtZX1CdXR0b25gKTtcclxuICAgICAgICAgICAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgndG9vbEFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZURpc3RhbmNlRGlzcGxheShkaXN0YW5jZVN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSB0aGlzLnRvb2xEaXNwbGF5cy5nZXQoVE9PTF9OQU1FUy5ESVNUQU5DRSk7XHJcbiAgICAgICAgaWYgKCFkaXNwbGF5KSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChkaXN0YW5jZVN0cmluZyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXkudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXNwbGF5LnRleHRDb250ZW50ID0gZGlzdGFuY2VTdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaG93QW5ub3RhdGlvblRvb2xNb2RhbCgpIHtcclxuICAgICAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy50b29sRGlzcGxheXMuZ2V0KFRPT0xfTkFNRVMuQU5OT1RBVElPTlMpO1xyXG4gICAgICAgIGNyZWF0ZUFubm90YXRpb25Nb2RhbChkaXNwbGF5LCB7fSwgdGhpcy50b29scy5maW5kKHRvb2wgPT4gdG9vbC5uYW1lID09PSBUT09MX05BTUVTLkFOTk9UQVRJT05TKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dQaWNrZXJUb29sTW9kYWwoYW5ub3RhdGlvbkRhdGEpIHtcclxuICAgICAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy50b29sRGlzcGxheXMuZ2V0KFRPT0xfTkFNRVMuUElDS0VSKTtcclxuICAgICAgICBjcmVhdGVBbm5vdGF0aW9uTW9kYWwoZGlzcGxheSwgYW5ub3RhdGlvbkRhdGEsIHRoaXMudG9vbHMuZmluZCh0b29sID0+IHRvb2wubmFtZSA9PT0gVE9PTF9OQU1FUy5QSUNLRVIpLCB0cnVlLCB0aGlzLnJlYWRPbmx5KTtcclxuICAgIH1cclxuXHJcbiAgICBfb25Bbm5vdGF0aW9uU2F2ZWQoYW5ub3RhdGlvbkRhdGEpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFeHBlY3RzIGFubm90YXRpb25EYXRhIHRvIGJlIGFuIG9iamVjdCBsaWtlOlxyXG4gICAgICAgICAqIHtcclxuICAgICAgICAgKiAgIG5hbWU6ICdBbm5vdGF0aW9uIE5hbWUnLFxyXG4gICAgICAgICAqICAgZGVzY3JpcHRpb246ICdBbm5vdGF0aW9uIERlc2NyaXB0aW9uJyxcclxuICAgICAgICAgKiAgIGNvbG9yOiAnI2ZmMDAwMCcsXHJcbiAgICAgICAgICogICBwb3NpdGlvbjogW1t4MSwgeTEsIHoxXSwgW3gyLCB5MiwgejJdLCAuLi5dICAvLyBBcnJheSBvZiBwb3NpdGlvbiBhcnJheXNcclxuICAgICAgICAgKiB9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Fubm90YXRpb24gY3JlYXRlZDonLCBhbm5vdGF0aW9uRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uQW5ub3RhdGlvbkRlbGV0ZWQoYW5ub3RhdGlvbklkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Fubm90YXRpb24gZGVsZXRlZDonLCBhbm5vdGF0aW9uSWQpO1xyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbIkRpc3RhbmNlVG9vbCIsIkFubm90YXRpb25zVG9vbCIsIlBpY2tlclRvb2wiLCJUT09MX0NBTExCQUNLUyIsIlRPT0xfTkFNRVMiLCJjcmVhdGVBbm5vdGF0aW9uTW9kYWwiLCJUb29sQ29udHJvbGxlciIsInNjZW5lIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJyZWFkT25seSIsInRvb2xEaXNwbGF5cyIsIk1hcCIsInRvb2xzIiwiRElTVEFOQ0UiLCJfZGVmaW5lUHJvcGVydHkiLCJPTl9ESVNUQU5DRV9VUERBVEUiLCJkaXN0YW5jZSIsIl91cGRhdGVEaXN0YW5jZURpc3BsYXkiLCJBTk5PVEFUSU9OUyIsIk9OX1BPTFlHT05fQ09NUExFVEUiLCJfc2hvd0Fubm90YXRpb25Ub29sTW9kYWwiLCJPTl9BTk5PVEFUSU9OX1NBVkVEIiwiYW5ub3RhdGlvbkRhdGEiLCJfb25Bbm5vdGF0aW9uU2F2ZWQiLCJQSUNLRVIiLCJPTl9BTk5PVEFUSU9OX1BJQ0tFRCIsIl9zaG93UGlja2VyVG9vbE1vZGFsIiwiT05fQU5OT1RBVElPTl9ERUxFVEVEIiwiYW5ub3RhdGlvbklkIiwiX29uQW5ub3RhdGlvbkRlbGV0ZWQiLCJfc2V0dXBUb29scyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiX2luaXRpYWxpemVUb29sVWkiLCJ0b29sIiwiaWNvblBhdGgiLCJfdGhpczIiLCJ0b29sc0NvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRvb2xXcmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiYnV0dG9uIiwiaWQiLCJjb25jYXQiLCJuYW1lIiwiaW5uZXJIVE1MIiwidG9vbEluZm9EaXNwbGF5Iiwic2V0Iiwib25jbGljayIsImFjdGl2ZSIsImFjdGl2YXRlIiwiX2RlYWN0aXZhdGVVbnVzZWRUb29scyIsImRlYWN0aXZhdGUiLCJyZW1vdmUiLCJhY3RpdmVUb29sIiwiZm9yRWFjaCIsImdldEVsZW1lbnRCeUlkIiwiZGlzdGFuY2VTdHJpbmciLCJkaXNwbGF5IiwiZ2V0IiwidGV4dENvbnRlbnQiLCJmaW5kIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=