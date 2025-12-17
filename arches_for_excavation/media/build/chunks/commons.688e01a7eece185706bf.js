"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[75680],{

/***/ 75680:
/*!*****************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/map.js + 1 modules ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ map)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/card-component.js
var card_component = __webpack_require__(19480);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/map-editor.js
var map_editor = __webpack_require__(82692);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/cards/map.htm
const map_namespaceObject = "templates/views/components/cards/map.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/chosen.js
var chosen = __webpack_require__(63777);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/codemirror.js
var codemirror = __webpack_require__(4425);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/geojson-feature-collection.js + 1 modules
var geojson_feature_collection = __webpack_require__(90293);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/map.js
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }








var viewModel = function viewModel(params) {
  var self = this;
  params.configKeys = ['basemap', 'overlayConfigs', 'selectSource', 'selectSourceLayer', 'selectText', 'zoom', 'centerX', 'centerY'];
  card_component["default"].apply(this, [params]);
  var widgets = [];
  if (self.form && self.tile) {
    widgets = self.card.widgets().filter(function (widget) {
      var id = widget.node_id();
      var type = knockout_latest_default().unwrap(self.form.nodeLookup[id].datatype);
      return type === 'geojson-feature-collection';
    });
    var _iterator = _createForOfIteratorHelper(widgets),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var widget = _step.value;
        widget.config.basemap(self.basemap());
        widget.config.overlayConfigs(self.overlayConfigs());
        widget.config.centerX(self.centerX());
        widget.config.centerY(self.centerY());
        widget.config.zoom(self.zoom());
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  if (this.card.overlaysObservable) {
    params.overlaysObservable = this.card.overlaysObservable;
    params.activeBasemap = this.card.activeBasemap;
  }
  if (knockout_latest_default().isObservable(self.basemap)) {
    // if basemap has loaded
    if (self.centerX() == 0 && self.centerY() == 0 && self.zoom() == 0) {
      self.centerX(arches["default"].mapDefaultX);
      self.centerY(arches["default"].mapDefaultY);
      self.zoom(arches["default"].mapDefaultZoom);
    }

    // subscriptions need to stay explicit! DRY-ing will break
    this.basemap.subscribe(function (basemap) {
      if (self.config.basemap() !== basemap) {
        self.config.basemap(basemap);
      }
      var _iterator2 = _createForOfIteratorHelper(widgets),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var widget = _step2.value;
          widget.config.basemap(basemap);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
    this.overlayConfigs.subscribe(function (overlayConfigs) {
      if (self.config.overlayConfigs() !== overlayConfigs) {
        self.config.overlayConfigs(overlayConfigs);
      }
      var _iterator3 = _createForOfIteratorHelper(widgets),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var widget = _step3.value;
          widget.config.overlayConfigs(overlayConfigs);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    });
    this.centerX.subscribe(function (x) {
      if (self.config.centerX() !== x) {
        self.config.centerX(x);
      }
      self.centerX(x); /* forces card-control update */
      var _iterator4 = _createForOfIteratorHelper(widgets),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var widget = _step4.value;
          widget.config.centerX(x);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    });
    this.centerY.subscribe(function (y) {
      if (self.config.centerY() !== y) {
        self.config.centerY(y);
      }
      self.centerY(y); /* forces card-control update */
      var _iterator5 = _createForOfIteratorHelper(widgets),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var widget = _step5.value;
          widget.config.centerY(y);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    });
    this.zoom.subscribe(function (zoom) {
      if (self.config.zoom() !== zoom) {
        self.config.zoom(zoom);
      }
      self.zoom(zoom); /* forces card-control update */
      var _iterator6 = _createForOfIteratorHelper(widgets),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var widget = _step6.value;
          widget.config.zoom(zoom);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    });
  }
  params.defaultConfig = self.card.model.get('defaultConfig');
  params.overlayConfigs = this.overlayConfigs;
  params.basemap = this.basemap;
  params.x = this.centerX;
  params.y = this.centerY;
  params.zoom = this.zoom;
  params.usePosition = true;
  params.widgets = widgets;
  map_editor["default"].apply(this, [params]);
  this.expandSidePanel = knockout_latest_default().computed(function () {
    if (self.tile) {
      return self.tile.hasprovisionaledits() && self.reviewer === true;
    } else {
      return false;
    }
  });
  this.card.allowProvisionalEditRerender(false);
  if (!this.card.overlaysObservable) {
    this.card.overlaysObservable = this.overlays;
    this.card.activeBasemap = this.activeBasemap;
  }
};
knockout_latest_default().components.register('map-card', {
  viewModel: viewModel,
  template: map_namespaceObject
});
/* harmony default export */ const map = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNjg4ZTAxYTdlZWNlMTg1NzA2YmYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDRTtBQUNtQztBQUNSO0FBQ2dCO0FBQzlDO0FBQ0k7QUFDa0M7QUFHL0QsSUFBSUssU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQVlDLE1BQU0sRUFBRTtFQUM3QixJQUFJQyxJQUFJLEdBQUcsSUFBSTtFQUdmRCxNQUFNLENBQUNFLFVBQVUsR0FBRyxDQUNoQixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxtQkFBbUIsRUFDbkIsWUFBWSxFQUNaLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxDQUNaO0VBRUROLHlCQUFzQixDQUFDTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUNILE1BQU0sQ0FBQyxDQUFDO0VBRTVDLElBQUlJLE9BQU8sR0FBRyxFQUFFO0VBRWhCLElBQUlILElBQUksQ0FBQ0ksSUFBSSxJQUFJSixJQUFJLENBQUNLLElBQUksRUFBRTtJQUN4QkYsT0FBTyxHQUFHSCxJQUFJLENBQUNNLElBQUksQ0FBQ0gsT0FBTyxDQUFDLENBQUMsQ0FBQ0ksTUFBTSxDQUFDLFVBQVNDLE1BQU0sRUFBRTtNQUNsRCxJQUFJQyxFQUFFLEdBQUdELE1BQU0sQ0FBQ0UsT0FBTyxDQUFDLENBQUM7TUFDekIsSUFBSUMsSUFBSSxHQUFHbEIsZ0NBQVMsQ0FBQ08sSUFBSSxDQUFDSSxJQUFJLENBQUNTLFVBQVUsQ0FBQ0osRUFBRSxDQUFDLENBQUNLLFFBQVEsQ0FBQztNQUN2RCxPQUFPSCxJQUFJLEtBQUssNEJBQTRCO0lBQ2hELENBQUMsQ0FBQztJQUFDLElBQUFJLFNBQUEsR0FBQUMsMEJBQUEsQ0FFZ0JiLE9BQU87TUFBQWMsS0FBQTtJQUFBO01BQTFCLEtBQUFGLFNBQUEsQ0FBQUcsQ0FBQSxNQUFBRCxLQUFBLEdBQUFGLFNBQUEsQ0FBQUksQ0FBQSxJQUFBQyxJQUFBLEdB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QUFJLENBQUNwRCxJQUFJLENBQUN5QixrQkFBa0IsRUFBRTtJQUMvQixJQUFJLENBQUN6QixJQUFJLENBQUN5QixrQkFBa0IsR0FBRyxJQUFJLENBQUM0QixRQUFRO0lBQzVDLElBQUksQ0FBQ3JELElBQUksQ0FBQzBCLGFBQWEsR0FBRyxJQUFJLENBQUNBLGFBQWE7RUFDaEQ7QUFDSixDQUFDO0FBRUR2QyxvQ0FBYSxDQUFDb0UsUUFBUSxDQUFDLFVBQVUsRUFBRTtFQUMvQi9ELFNBQVMsRUFBRUEsU0FBUztFQUNwQmdFLFFBQVEsRUFBRWpFLG1CQUFlQTtBQUM3QixDQUFDLENBQUM7QUFDRiwwQ0FBZUMsU0FBUyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9jYXJkcy9tYXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBDYXJkQ29tcG9uZW50Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvY2FyZC1jb21wb25lbnQnO1xuaW1wb3J0IE1hcEVkaXRvclZpZXdNb2RlbCBmcm9tICd2aWV3bW9kZWxzL21hcC1lZGl0b3InO1xuaW1wb3J0IG1hcENhcmRUZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy9jYXJkcy9tYXAuaHRtJztcbmltcG9ydCAnYmluZGluZ3MvY2hvc2VuJztcbmltcG9ydCAnYmluZGluZ3MvY29kZW1pcnJvcic7XG5pbXBvcnQgJ3ZpZXdzL2NvbXBvbmVudHMvZGF0YXR5cGVzL2dlb2pzb24tZmVhdHVyZS1jb2xsZWN0aW9uJztcblxuXG52YXIgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIFxuICAgIHBhcmFtcy5jb25maWdLZXlzID0gW1xuICAgICAgICAnYmFzZW1hcCcsXG4gICAgICAgICdvdmVybGF5Q29uZmlncycsXG4gICAgICAgICdzZWxlY3RTb3VyY2UnLFxuICAgICAgICAnc2VsZWN0U291cmNlTGF5ZXInLFxuICAgICAgICAnc2VsZWN0VGV4dCcsXG4gICAgICAgICd6b29tJyxcbiAgICAgICAgJ2NlbnRlclgnLFxuICAgICAgICAnY2VudGVyWSdcbiAgICBdO1xuXG4gICAgQ2FyZENvbXBvbmVudFZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG5cbiAgICB2YXIgd2lkZ2V0cyA9IFtdO1xuXG4gICAgaWYgKHNlbGYuZm9ybSAmJiBzZWxmLnRpbGUpIHtcbiAgICAgICAgd2lkZ2V0cyA9IHNlbGYuY2FyZC53aWRnZXRzKCkuZmlsdGVyKGZ1bmN0aW9uKHdpZGdldCkge1xuICAgICAgICAgICAgdmFyIGlkID0gd2lkZ2V0Lm5vZGVfaWQoKTtcbiAgICAgICAgICAgIHZhciB0eXBlID0ga28udW53cmFwKHNlbGYuZm9ybS5ub2RlTG9va3VwW2lkXS5kYXRhdHlwZSk7XG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ2dlb2pzb24tZmVhdHVyZS1jb2xsZWN0aW9uJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgd2lkZ2V0IG9mIHdpZGdldHMpIHtcbiAgICAgICAgICAgIHdpZGdldC5jb25maWcuYmFzZW1hcChzZWxmLmJhc2VtYXAoKSk7XG4gICAgICAgICAgICB3aWRnZXQuY29uZmlnLm92ZXJsYXlDb25maWdzKHNlbGYub3ZlcmxheUNvbmZpZ3MoKSk7XG4gICAgICAgICAgICB3aWRnZXQuY29uZmlnLmNlbnRlclgoc2VsZi5jZW50ZXJYKCkpO1xuICAgICAgICAgICAgd2lkZ2V0LmNvbmZpZy5jZW50ZXJZKHNlbGYuY2VudGVyWSgpKTtcbiAgICAgICAgICAgIHdpZGdldC5jb25maWcuem9vbShzZWxmLnpvb20oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jYXJkLm92ZXJsYXlzT2JzZXJ2YWJsZSkge1xuICAgICAgICBwYXJhbXMub3ZlcmxheXNPYnNlcnZhYmxlID0gdGhpcy5jYXJkLm92ZXJsYXlzT2JzZXJ2YWJsZTtcbiAgICAgICAgcGFyYW1zLmFjdGl2ZUJhc2VtYXAgPSB0aGlzLmNhcmQuYWN0aXZlQmFzZW1hcDtcbiAgICB9XG5cbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKHNlbGYuYmFzZW1hcCkpIHsgIC8vIGlmIGJhc2VtYXAgaGFzIGxvYWRlZFxuICAgICAgICBpZiAoc2VsZi5jZW50ZXJYKCkgPT0gMCAmJiBzZWxmLmNlbnRlclkoKSA9PSAwICYmIHNlbGYuem9vbSgpID09IDApIHtcbiAgICAgICAgICAgIHNlbGYuY2VudGVyWChhcmNoZXMubWFwRGVmYXVsdFgpO1xuICAgICAgICAgICAgc2VsZi5jZW50ZXJZKGFyY2hlcy5tYXBEZWZhdWx0WSk7XG4gICAgICAgICAgICBzZWxmLnpvb20oYXJjaGVzLm1hcERlZmF1bHRab29tKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN1YnNjcmlwdGlvbnMgbmVlZCB0byBzdGF5IGV4cGxpY2l0ISBEUlktaW5nIHdpbGwgYnJlYWtcbiAgICAgICAgdGhpcy5iYXNlbWFwLnN1YnNjcmliZShmdW5jdGlvbihiYXNlbWFwKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuYmFzZW1hcCgpICE9PSBiYXNlbWFwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcuYmFzZW1hcChiYXNlbWFwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgd2lkZ2V0IG9mIHdpZGdldHMpIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQuY29uZmlnLmJhc2VtYXAoYmFzZW1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm92ZXJsYXlDb25maWdzLnN1YnNjcmliZShmdW5jdGlvbihvdmVybGF5Q29uZmlncykge1xuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLm92ZXJsYXlDb25maWdzKCkgIT09IG92ZXJsYXlDb25maWdzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcub3ZlcmxheUNvbmZpZ3Mob3ZlcmxheUNvbmZpZ3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciB3aWRnZXQgb2Ygd2lkZ2V0cykge1xuICAgICAgICAgICAgICAgIHdpZGdldC5jb25maWcub3ZlcmxheUNvbmZpZ3Mob3ZlcmxheUNvbmZpZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jZW50ZXJYLnN1YnNjcmliZShmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuY2VudGVyWCgpICE9PSB4KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcuY2VudGVyWCh4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5jZW50ZXJYKHgpOyAvKiBmb3JjZXMgY2FyZC1jb250cm9sIHVwZGF0ZSAqL1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZhciB3aWRnZXQgb2Ygd2lkZ2V0cykge1xuICAgICAgICAgICAgICAgIHdpZGdldC5jb25maWcuY2VudGVyWCh4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2VudGVyWS5zdWJzY3JpYmUoZnVuY3Rpb24oeSkge1xuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmNlbnRlclkoKSAhPT0geSkge1xuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLmNlbnRlclkoeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuY2VudGVyWSh5KTsgLyogZm9yY2VzIGNhcmQtY29udHJvbCB1cGRhdGUgKi9cblxuICAgICAgICAgICAgZm9yICh2YXIgd2lkZ2V0IG9mIHdpZGdldHMpIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQuY29uZmlnLmNlbnRlclkoeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnpvb20uc3Vic2NyaWJlKGZ1bmN0aW9uKHpvb20pIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy56b29tKCkgIT09IHpvb20pIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy56b29tKHpvb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZWxmLnpvb20oem9vbSk7IC8qIGZvcmNlcyBjYXJkLWNvbnRyb2wgdXBkYXRlICovXG5cbiAgICAgICAgICAgIGZvciAodmFyIHdpZGdldCBvZiB3aWRnZXRzKSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmNvbmZpZy56b29tKHpvb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwYXJhbXMuZGVmYXVsdENvbmZpZyA9IHNlbGYuY2FyZC5tb2RlbC5nZXQoJ2RlZmF1bHRDb25maWcnKTtcbiAgICBwYXJhbXMub3ZlcmxheUNvbmZpZ3MgPSB0aGlzLm92ZXJsYXlDb25maWdzO1xuICAgIHBhcmFtcy5iYXNlbWFwID0gdGhpcy5iYXNlbWFwO1xuICAgIHBhcmFtcy54ID0gdGhpcy5jZW50ZXJYO1xuICAgIHBhcmFtcy55ID0gdGhpcy5jZW50ZXJZO1xuICAgIHBhcmFtcy56b29tID0gdGhpcy56b29tO1xuICAgIHBhcmFtcy51c2VQb3NpdGlvbiA9IHRydWU7XG4gICAgcGFyYW1zLndpZGdldHMgPSB3aWRnZXRzO1xuXG4gICAgTWFwRWRpdG9yVmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcblxuICAgIHRoaXMuZXhwYW5kU2lkZVBhbmVsID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKHNlbGYudGlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYudGlsZS5oYXNwcm92aXNpb25hbGVkaXRzKCkgJiYgc2VsZi5yZXZpZXdlciA9PT0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5jYXJkLmFsbG93UHJvdmlzaW9uYWxFZGl0UmVyZW5kZXIoZmFsc2UpO1xuXG4gICAgaWYgKCF0aGlzLmNhcmQub3ZlcmxheXNPYnNlcnZhYmxlKSB7XG4gICAgICAgIHRoaXMuY2FyZC5vdmVybGF5c09ic2VydmFibGUgPSB0aGlzLm92ZXJsYXlzO1xuICAgICAgICB0aGlzLmNhcmQuYWN0aXZlQmFzZW1hcCA9IHRoaXMuYWN0aXZlQmFzZW1hcDtcbiAgICB9XG59O1xuXG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKCdtYXAtY2FyZCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogbWFwQ2FyZFRlbXBsYXRlLFxufSk7XG5leHBvcnQgZGVmYXVsdCB2aWV3TW9kZWw7XG4iXSwibmFtZXMiOlsia28iLCJhcmNoZXMiLCJDYXJkQ29tcG9uZW50Vmlld01vZGVsIiwiTWFwRWRpdG9yVmlld01vZGVsIiwibWFwQ2FyZFRlbXBsYXRlIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsImNvbmZpZ0tleXMiLCJhcHBseSIsIndpZGdldHMiLCJmb3JtIiwidGlsZSIsImNhcmQiLCJmaWx0ZXIiLCJ3aWRnZXQiLCJpZCIsIm5vZGVfaWQiLCJ0eXBlIiwidW53cmFwIiwibm9kZUxvb2t1cCIsImRhdGF0eXBlIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiY29uZmlnIiwiYmFzZW1hcCIsIm92ZXJsYXlDb25maWdzIiwiY2VudGVyWCIsImNlbnRlclkiLCJ6b29tIiwiZXJyIiwiZSIsImYiLCJvdmVybGF5c09ic2VydmFibGUiLCJhY3RpdmVCYXNlbWFwIiwiaXNPYnNlcnZhYmxlIiwibWFwRGVmYXVsdFgiLCJtYXBEZWZhdWx0WSIsIm1hcERlZmF1bHRab29tIiwic3Vic2NyaWJlIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJ4IiwiX2l0ZXJhdG9yNCIsIl9zdGVwNCIsInkiLCJfaXRlcmF0b3I1IiwiX3N0ZXA1IiwiX2l0ZXJhdG9yNiIsIl9zdGVwNiIsImRlZmF1bHRDb25maWciLCJtb2RlbCIsImdldCIsInVzZVBvc2l0aW9uIiwiZXhwYW5kU2lkZVBhbmVsIiwiY29tcHV0ZWQiLCJoYXNwcm92aXNpb25hbGVkaXRzIiwicmV2aWV3ZXIiLCJhbGxvd1Byb3Zpc2lvbmFsRWRpdFJlcmVuZGVyIiwib3ZlcmxheXMiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=