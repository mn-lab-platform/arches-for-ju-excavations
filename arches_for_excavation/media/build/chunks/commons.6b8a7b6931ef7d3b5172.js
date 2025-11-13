"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[70949],{

/***/ 19617:
/*!*******************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/map-popup.htm ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = "templates/views/components/map-popup.htm";

/***/ }),

/***/ 70949:
/*!***************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/map-popup-provider.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var templates_views_components_map_popup_htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! templates/views/components/map-popup.htm */ 19617);
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


var provider = {
  /**
   * Callback to determine if the feature is clickable
   * @param feature Map feature to check
   * @returns <code>true</code> if the feature can be clicked, otherwise <code>false</code>
   */
  isFeatureClickable: function isFeatureClickable(feature, map) {
    var selectedFeatureIds = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(map.selectedFeatureIds);
    var selectedTool = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(map.selectedTool);
    if (typeof selectedTool !== 'undefined' && selectedTool !== null || selectedFeatureIds && selectedFeatureIds.length) return false;
    return feature.properties.resourceinstanceid;
  },
  /**
   * Return the template that should be used for the popup
   * @param features - Unused in this provider, but may be used in custom provider to determine which template
   * to use
   * @returns {*} HTML template for the Map Popup
   */
  getPopupTemplate: function getPopupTemplate(features) {
    return templates_views_components_map_popup_htm__WEBPACK_IMPORTED_MODULE_1__;
  },
  /**
   * Each feature in the list must have a <code>displayname</code> and <code>map_popup</code> value. This is
   * handled for arches resources by the framework, but can be injected here if any of the features.popupFeatures
   * do not have one.
   */
  processData: function processData(features) {
    return features;
  },
  /**
   * This method enables custom logic for how the feature in the popup should be handled and/or mutated en route to the mapFilter.
   * @param popupFeatureObject - the javascript object of the feature and its associated contexts (e.g. mapCard).
   * @required @method mapCard.filterByFeatureGeom()
   * @required @send argument: @param feature - a geojson feature object 
   */
  sendFeatureToMapFilter: function sendFeatureToMapFilter(popupFeatureObject) {
    var foundFeature = this.findPopupFeatureById(popupFeatureObject);
    popupFeatureObject.mapCard.filterByFeatureGeom(foundFeature);
  },
  /**
   * Determines whether to show the button for Filter By Feature
   * @param popupFeatureObject - the javascript object of the feature and its associated contexts (e.g. mapCard).
   * @returns {boolean} - whether to show "Filter by Feature" on map popup
   * typically dependent on at least 1 feature with a geometry and/or a featureid/resourceid combo
   */
  showFilterByFeature: function showFilterByFeature(popupFeatureObject) {
    var _popupFeatureObject$f;
    var noFeatureId = ((_popupFeatureObject$f = popupFeatureObject.feature) === null || _popupFeatureObject$f === void 0 || (_popupFeatureObject$f = _popupFeatureObject$f.properties) === null || _popupFeatureObject$f === void 0 ? void 0 : _popupFeatureObject$f.featureid) === undefined;
    if (noFeatureId) return false;
    return this.findPopupFeatureById(popupFeatureObject) !== null;
  },
  findPopupFeatureById: function findPopupFeatureById(popupFeatureObject) {
    var foundFeature = null;
    var strippedFeatureId = popupFeatureObject.feature.properties.featureid.replace(/-/g, "");
    var _iterator = _createForOfIteratorHelper(popupFeatureObject.geometries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var geometry = _step.value;
        if (geometry.geom && Array.isArray(geometry.geom.features)) {
          foundFeature = geometry.geom.features.find(function (feature) {
            return feature.id.replace(/-/g, "") === strippedFeatureId;
          });
          if (foundFeature) break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return foundFeature;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (provider);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPO1lBQUEsT0FBSUEsT0FBTyxDQUFDcUMsRUFBRSxDQUFDZCxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLRCxpQkFBaUI7VUFBQSxFQUFDO1VBQ3pHLElBQUlULFlBQVksRUFDWjtRQUNSO01BQ0o7SUFBQyxTQUFBeUIsR0FBQTtNQUFBZCxTQUFBLENBQUFlLENBQUEsQ0FBQUQsR0FBQTtJQUFBO01BQUFkLFNBQUEsQ0FBQWdCLENBQUE7SUFBQTtJQUNELE9BQU8zQixZQUFZO0VBQ3ZCO0FBRUosQ0FBQztBQUVELGlFQUFlZixRQUFRLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy91dGlscy9tYXAtcG9wdXAtcHJvdmlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBwb3B1cFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL21hcC1wb3B1cC5odG0nO1xuXG5jb25zdCBwcm92aWRlciA9IHtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGRldGVybWluZSBpZiB0aGUgZmVhdHVyZSBpcyBjbGlja2FibGVcbiAgICAgKiBAcGFyYW0gZmVhdHVyZSBNYXAgZmVhdHVyZSB0byBjaGVja1xuICAgICAqIEByZXR1cm5zIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBmZWF0dXJlIGNhbiBiZSBjbGlja2VkLCBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+XG4gICAgICovXG4gICAgaXNGZWF0dXJlQ2xpY2thYmxlOiBmdW5jdGlvbihmZWF0dXJlLCBtYXApIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlSWRzID0ga28udW53cmFwKG1hcC5zZWxlY3RlZEZlYXR1cmVJZHMpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRvb2wgPSBrby51bndyYXAobWFwLnNlbGVjdGVkVG9vbCk7XG4gICAgICAgIGlmICgodHlwZW9mIHNlbGVjdGVkVG9vbCAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZWN0ZWRUb29sICE9PSBudWxsKSB8fCBzZWxlY3RlZEZlYXR1cmVJZHMgJiYgc2VsZWN0ZWRGZWF0dXJlSWRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllcy5yZXNvdXJjZWluc3RhbmNlaWQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgdGVtcGxhdGUgdGhhdCBzaG91bGQgYmUgdXNlZCBmb3IgdGhlIHBvcHVwXG4gICAgICogQHBhcmFtIGZlYXR1cmVzIC0gVW51c2VkIGluIHRoaXMgcHJvdmlkZXIsIGJ1dCBtYXkgYmUgdXNlZCBpbiBjdXN0b20gcHJvdmlkZXIgdG8gZGV0ZXJtaW5lIHdoaWNoIHRlbXBsYXRlXG4gICAgICogdG8gdXNlXG4gICAgICogQHJldHVybnMgeyp9IEhUTUwgdGVtcGxhdGUgZm9yIHRoZSBNYXAgUG9wdXBcbiAgICAgKi9cbiAgICBnZXRQb3B1cFRlbXBsYXRlOiBmdW5jdGlvbihmZWF0dXJlcykge1xuICAgICAgICByZXR1cm4gcG9wdXBUZW1wbGF0ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRWFjaCBmZWF0dXJlIGluIHRoZSBsaXN0IG11c3QgaGF2ZSBhIDxjb2RlPmRpc3BsYXluYW1lPC9jb2RlPiBhbmQgPGNvZGU+bWFwX3BvcHVwPC9jb2RlPiB2YWx1ZS4gVGhpcyBpc1xuICAgICAqIGhhbmRsZWQgZm9yIGFyY2hlcyByZXNvdXJjZXMgYnkgdGhlIGZyYW1ld29yaywgYnV0IGNhbiBiZSBpbmplY3RlZCBoZXJlIGlmIGFueSBvZiB0aGUgZmVhdHVyZXMucG9wdXBGZWF0dXJlc1xuICAgICAqIGRvIG5vdCBoYXZlIG9uZS5cbiAgICAgKi9cbiAgICBwcm9jZXNzRGF0YTogZnVuY3Rpb24oZmVhdHVyZXMpIHtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBlbmFibGVzIGN1c3RvbSBsb2dpYyBmb3IgaG93IHRoZSBmZWF0dXJlIGluIHRoZSBwb3B1cCBzaG91bGQgYmUgaGFuZGxlZCBhbmQvb3IgbXV0YXRlZCBlbiByb3V0ZSB0byB0aGUgbWFwRmlsdGVyLlxuICAgICAqIEBwYXJhbSBwb3B1cEZlYXR1cmVPYmplY3QgLSB0aGUgamF2YXNjcmlwdCBvYmplY3Qgb2YgdGhlIGZlYXR1cmUgYW5kIGl0cyBhc3NvY2lhdGVkIGNvbnRleHRzIChlLmcuIG1hcENhcmQpLlxuICAgICAqIEByZXF1aXJlZCBAbWV0aG9kIG1hcENhcmQuZmlsdGVyQnlGZWF0dXJlR2VvbSgpXG4gICAgICogQHJlcXVpcmVkIEBzZW5kIGFyZ3VtZW50OiBAcGFyYW0gZmVhdHVyZSAtIGEgZ2VvanNvbiBmZWF0dXJlIG9iamVjdCBcbiAgICAgKi9cbiAgICBzZW5kRmVhdHVyZVRvTWFwRmlsdGVyOiBmdW5jdGlvbihwb3B1cEZlYXR1cmVPYmplY3QpIHtcbiAgICAgICAgY29uc3QgZm91bmRGZWF0dXJlID0gdGhpcy5maW5kUG9wdXBGZWF0dXJlQnlJZChwb3B1cEZlYXR1cmVPYmplY3QpO1xuICAgICAgICBwb3B1cEZlYXR1cmVPYmplY3QubWFwQ2FyZC5maWx0ZXJCeUZlYXR1cmVHZW9tKGZvdW5kRmVhdHVyZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciB0byBzaG93IHRoZSBidXR0b24gZm9yIEZpbHRlciBCeSBGZWF0dXJlXG4gICAgICogQHBhcmFtIHBvcHVwRmVhdHVyZU9iamVjdCAtIHRoZSBqYXZhc2NyaXB0IG9iamVjdCBvZiB0aGUgZmVhdHVyZSBhbmQgaXRzIGFzc29jaWF0ZWQgY29udGV4dHMgKGUuZy4gbWFwQ2FyZCkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IC0gd2hldGhlciB0byBzaG93IFwiRmlsdGVyIGJ5IEZlYXR1cmVcIiBvbiBtYXAgcG9wdXBcbiAgICAgKiB0eXBpY2FsbHkgZGVwZW5kZW50IG9uIGF0IGxlYXN0IDEgZmVhdHVyZSB3aXRoIGEgZ2VvbWV0cnkgYW5kL29yIGEgZmVhdHVyZWlkL3Jlc291cmNlaWQgY29tYm9cbiAgICAgKi9cbiAgICBzaG93RmlsdGVyQnlGZWF0dXJlOiBmdW5jdGlvbihwb3B1cEZlYXR1cmVPYmplY3QpIHtcbiAgICAgICAgY29uc3Qgbm9GZWF0dXJlSWQgPSBwb3B1cEZlYXR1cmVPYmplY3QuZmVhdHVyZT8ucHJvcGVydGllcz8uZmVhdHVyZWlkID09PSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChub0ZlYXR1cmVJZCkgXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRQb3B1cEZlYXR1cmVCeUlkKHBvcHVwRmVhdHVyZU9iamVjdCkgIT09IG51bGw7XG4gICAgfSxcblxuICAgIGZpbmRQb3B1cEZlYXR1cmVCeUlkOiBmdW5jdGlvbihwb3B1cEZlYXR1cmVPYmplY3QpIHtcbiAgICAgICAgbGV0IGZvdW5kRmVhdHVyZSA9IG51bGw7XG4gICAgICAgIGNvbnN0IHN0cmlwcGVkRmVhdHVyZUlkID0gcG9wdXBGZWF0dXJlT2JqZWN0LmZlYXR1cmUucHJvcGVydGllcy5mZWF0dXJlaWQucmVwbGFjZSgvLS9nLCBcIlwiKTtcbiAgICAgICAgZm9yIChsZXQgZ2VvbWV0cnkgb2YgcG9wdXBGZWF0dXJlT2JqZWN0Lmdlb21ldHJpZXMoKSkge1xuICAgICAgICAgICAgaWYgKGdlb21ldHJ5Lmdlb20gJiYgQXJyYXkuaXNBcnJheShnZW9tZXRyeS5nZW9tLmZlYXR1cmVzKSkge1xuICAgICAgICAgICAgICAgIGZvdW5kRmVhdHVyZSA9IGdlb21ldHJ5Lmdlb20uZmVhdHVyZXMuZmluZChmZWF0dXJlID0+IGZlYXR1cmUuaWQucmVwbGFjZSgvLS9nLCBcIlwiKSA9PT0gc3RyaXBwZWRGZWF0dXJlSWQpO1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZEZlYXR1cmUpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3VuZEZlYXR1cmU7XG4gICAgfSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvdmlkZXI7XG4iXSwibmFtZXMiOlsia28iLCJwb3B1cFRlbXBsYXRlIiwicHJvdmlkZXIiLCJpc0ZlYXR1cmVDbGlja2FibGUiLCJmZWF0dXJlIiwibWFwIiwic2VsZWN0ZWRGZWF0dXJlSWRzIiwidW53cmFwIiwic2VsZWN0ZWRUb29sIiwibGVuZ3RoIiwicHJvcGVydGllcyIsInJlc291cmNlaW5zdGFuY2VpZCIsImdldFBvcHVwVGVtcGxhdGUiLCJmZWF0dXJlcyIsInByb2Nlc3NEYXRhIiwic2VuZEZlYXR1cmVUb01hcEZpbHRlciIsInBvcHVwRmVhdHVyZU9iamVjdCIsImZvdW5kRmVhdHVyZSIsImZpbmRQb3B1cEZlYXR1cmVCeUlkIiwibWFwQ2FyZCIsImZpbHRlckJ5RmVhdHVyZUdlb20iLCJzaG93RmlsdGVyQnlGZWF0dXJlIiwiX3BvcHVwRmVhdHVyZU9iamVjdCRmIiwibm9GZWF0dXJlSWQiLCJmZWF0dXJlaWQiLCJ1bmRlZmluZWQiLCJzdHJpcHBlZEZlYXR1cmVJZCIsInJlcGxhY2UiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsImdlb21ldHJpZXMiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsImdlb21ldHJ5IiwidmFsdWUiLCJnZW9tIiwiQXJyYXkiLCJpc0FycmF5IiwiZmluZCIsImlkIiwiZXJyIiwiZSIsImYiXSwic291cmNlUm9vdCI6IiJ9