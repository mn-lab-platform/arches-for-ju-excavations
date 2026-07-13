"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[49999],{

/***/ 49999:
/*!**************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/map-controls.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);



/**
 * A viewmodel used for a generic geocoder
 *
 * @constructor
 * @name MapControlsViewModel
 *
 */
var MapControlsViewModel = function MapControlsViewModel(params) {
  var self = this;
  this.mapControlsHidden = params.mapControlsHidden || knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
  this.overlaySelectorClosed = params.overlaySelectorClosed || knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
  this.overlays = params.overlays || knockout__WEBPACK_IMPORTED_MODULE_1___default().observableArray([]);
  this.mapControlsExpanded = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
  this.mapControlPanels = {
    basemaps: knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false),
    overlays: knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(true),
    maptools: knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(true),
    legend: knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(true)
  };

  /**
   * toggles between the panels: legend, basemaps, etc
   * @return {null}
   */
  this.toggleMapControlPanels = function (data) {
    var panel = data;
    underscore__WEBPACK_IMPORTED_MODULE_0___default().each(self.mapControlPanels, function (panelValue, panelName) {
      panelName === panel ? panelValue(false) : panelValue(true);
      panel === 'overlays' || self.overlaySelectorClosed(true);
    });
  };

  /**
   * toggles the open or closed state of the of the map controls
   * @return {null}
   */
  this.toggleMapTools = function () {
    self.mapControlsExpanded(!self.mapControlsExpanded());
  };

  /**
   * toggles the visibility of the of the map controls and the availability of map controls in a report-template
   * @return {null}
   */
  this.toggleMapControlsVisibility = function () {
    if (self.mapControlsHidden() === true) {
      self.mapControlsHidden(false);
    } else {
      self.mapControlsHidden(true);
    }
  };
  this.moveOverlay = function (overlay, direction) {
    var overlays = knockout__WEBPACK_IMPORTED_MODULE_1___default().utils.unwrapObservable(self.overlays);
    var source = knockout__WEBPACK_IMPORTED_MODULE_1___default().utils.arrayIndexOf(overlays, overlay);
    var target = direction === 'up' ? source - 1 : source + 1;
    if (target >= 0 && target < overlays.length) {
      self.overlays.valueWillMutate();
      overlays.splice(source, 1);
      overlays.splice(target, 0, overlay);
      self.overlays.valueHasMutated();
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapControlsViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7TUFDMUJwQixRQUFRLENBQUN5QixNQUFNLENBQUNILE1BQU0sRUFBRSxDQUFDLEVBQUVOLE9BQU8sQ0FBQztNQUVuQ3BCLElBQUksQ0FBQ0ksUUFBUSxDQUFDMEIsZUFBZSxDQUFDLENBQUM7SUFDbkM7RUFDSixDQUFDO0FBQ0wsQ0FBQztBQUNELGlFQUFlaEMsb0JBQW9CLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3bW9kZWxzL21hcC1jb250cm9scy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5cblxuLyoqXG4gKiBBIHZpZXdtb2RlbCB1c2VkIGZvciBhIGdlbmVyaWMgZ2VvY29kZXJcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBuYW1lIE1hcENvbnRyb2xzVmlld01vZGVsXG4gKlxuICovXG52YXIgTWFwQ29udHJvbHNWaWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5tYXBDb250cm9sc0hpZGRlbiA9IHBhcmFtcy5tYXBDb250cm9sc0hpZGRlbiB8fCBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICB0aGlzLm92ZXJsYXlTZWxlY3RvckNsb3NlZCA9IHBhcmFtcy5vdmVybGF5U2VsZWN0b3JDbG9zZWQgfHwga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy5vdmVybGF5cyA9IHBhcmFtcy5vdmVybGF5cyB8fCBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gICAgdGhpcy5tYXBDb250cm9sc0V4cGFuZGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG5cbiAgICB0aGlzLm1hcENvbnRyb2xQYW5lbHMgPSB7XG4gICAgICAgIGJhc2VtYXBzOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcbiAgICAgICAgb3ZlcmxheXM6IGtvLm9ic2VydmFibGUodHJ1ZSksXG4gICAgICAgIG1hcHRvb2xzOiBrby5vYnNlcnZhYmxlKHRydWUpLFxuICAgICAgICBsZWdlbmQ6IGtvLm9ic2VydmFibGUodHJ1ZSlcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdG9nZ2xlcyBiZXR3ZWVuIHRoZSBwYW5lbHM6IGxlZ2VuZCwgYmFzZW1hcHMsIGV0Y1xuICAgICAqIEByZXR1cm4ge251bGx9XG4gICAgICovXG4gICAgdGhpcy50b2dnbGVNYXBDb250cm9sUGFuZWxzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgcGFuZWwgPSBkYXRhO1xuICAgICAgICBfLmVhY2goc2VsZi5tYXBDb250cm9sUGFuZWxzLCBmdW5jdGlvbihwYW5lbFZhbHVlLCBwYW5lbE5hbWUpIHtcbiAgICAgICAgICAgIHBhbmVsTmFtZSA9PT0gcGFuZWwgPyBwYW5lbFZhbHVlKGZhbHNlKSA6IHBhbmVsVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBwYW5lbCA9PT0gJ292ZXJsYXlzJyB8fCBzZWxmLm92ZXJsYXlTZWxlY3RvckNsb3NlZCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRvZ2dsZXMgdGhlIG9wZW4gb3IgY2xvc2VkIHN0YXRlIG9mIHRoZSBvZiB0aGUgbWFwIGNvbnRyb2xzXG4gICAgICogQHJldHVybiB7bnVsbH1cbiAgICAgKi9cbiAgICB0aGlzLnRvZ2dsZU1hcFRvb2xzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYubWFwQ29udHJvbHNFeHBhbmRlZCghc2VsZi5tYXBDb250cm9sc0V4cGFuZGVkKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0b2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBvZiB0aGUgbWFwIGNvbnRyb2xzIGFuZCB0aGUgYXZhaWxhYmlsaXR5IG9mIG1hcCBjb250cm9scyBpbiBhIHJlcG9ydC10ZW1wbGF0ZVxuICAgICAqIEByZXR1cm4ge251bGx9XG4gICAgICovXG4gICAgdGhpcy50b2dnbGVNYXBDb250cm9sc1Zpc2liaWxpdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNlbGYubWFwQ29udHJvbHNIaWRkZW4oKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2VsZi5tYXBDb250cm9sc0hpZGRlbihmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLm1hcENvbnRyb2xzSGlkZGVuKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubW92ZU92ZXJsYXkgPSBmdW5jdGlvbihvdmVybGF5LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIG92ZXJsYXlzID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLm92ZXJsYXlzKTtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGtvLnV0aWxzLmFycmF5SW5kZXhPZihvdmVybGF5cywgb3ZlcmxheSk7XG4gICAgICAgIHZhciB0YXJnZXQgPSAoZGlyZWN0aW9uID09PSAndXAnKSA/IHNvdXJjZSAtIDEgOiBzb3VyY2UgKyAxO1xuXG4gICAgICAgIGlmICh0YXJnZXQgPj0gMCAmJiB0YXJnZXQgPCBvdmVybGF5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYub3ZlcmxheXMudmFsdWVXaWxsTXV0YXRlKCk7XG5cbiAgICAgICAgICAgIG92ZXJsYXlzLnNwbGljZShzb3VyY2UsIDEpO1xuICAgICAgICAgICAgb3ZlcmxheXMuc3BsaWNlKHRhcmdldCwgMCwgb3ZlcmxheSk7XG5cbiAgICAgICAgICAgIHNlbGYub3ZlcmxheXMudmFsdWVIYXNNdXRhdGVkKCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IE1hcENvbnRyb2xzVmlld01vZGVsO1xuIl0sIm5hbWVzIjpbIl8iLCJrbyIsIk1hcENvbnRyb2xzVmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsIm1hcENvbnRyb2xzSGlkZGVuIiwib2JzZXJ2YWJsZSIsIm92ZXJsYXlTZWxlY3RvckNsb3NlZCIsIm92ZXJsYXlzIiwib2JzZXJ2YWJsZUFycmF5IiwibWFwQ29udHJvbHNFeHBhbmRlZCIsIm1hcENvbnRyb2xQYW5lbHMiLCJiYXNlbWFwcyIsIm1hcHRvb2xzIiwibGVnZW5kIiwidG9nZ2xlTWFwQ29udHJvbFBhbmVscyIsImRhdGEiLCJwYW5lbCIsImVhY2giLCJwYW5lbFZhbHVlIiwicGFuZWxOYW1lIiwidG9nZ2xlTWFwVG9vbHMiLCJ0b2dnbGVNYXBDb250cm9sc1Zpc2liaWxpdHkiLCJtb3ZlT3ZlcmxheSIsIm92ZXJsYXkiLCJkaXJlY3Rpb24iLCJ1dGlscyIsInVud3JhcE9ic2VydmFibGUiLCJzb3VyY2UiLCJhcnJheUluZGV4T2YiLCJ0YXJnZXQiLCJsZW5ndGgiLCJ2YWx1ZVdpbGxNdXRhdGUiLCJzcGxpY2UiLCJ2YWx1ZUhhc011dGF0ZWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==