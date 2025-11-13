"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[60488],{

/***/ 60488:
/*!***********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/iiif-card.js + 1 modules ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ iiif_card)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/card-component.js
var card_component = __webpack_require__(19480);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/iiif-annotation.js
var iiif_annotation = __webpack_require__(35283);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/alert.js
var viewmodels_alert = __webpack_require__(21672);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/cards/iiif-card.htm
const iiif_card_namespaceObject = "templates/views/components/cards/iiif-card.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/iiif-card.js






var viewModel = function viewModel(params) {
  var self = this;
  params.configKeys = ['defaultManifest'];
  card_component["default"].apply(this, [params]);
  var newTile = true;
  if (self.tile) newTile = !self.tile.tileid;
  if (newTile) {
    this.onSaveSuccess = function () {
      self.card.center = self.map().getCenter();
      self.card.zoom = self.map().getZoom();
    };
  }
  this.deleteTile = function () {
    self.loading(true);
    self.tile.deleteTile(function (response) {
      self.loading(false);
      params.pageVm.alert(new viewmodels_alert["default"]('ep-alert-red', response.responseJSON.title, response.responseJSON.message, null, function () {}));
      if (params.form.onDeleteError) {
        params.form.onDeleteError(self.tile);
      }
    }, function () {
      self.loading(false);
      if (!self.card.tiles().length) {
        self.card.manifest = undefined;
        self.card.canvas = undefined;
      }
      if (params.form.onDeleteSuccess) {
        params.form.onDeleteSuccess(self.tile);
      }
    });
  };
  if (this.form && this.tile) {
    params.widgets = this.card.widgets().filter(function (widget) {
      var id = widget.node_id();
      var type = knockout_latest_default().unwrap(self.form.nodeLookup[id].datatype);
      return type === 'annotation';
    });
    params.widgets.forEach(function (widget) {
      var id = widget.node_id();
      var featureCollection = knockout_mapping_min_default().toJS(self.tile.data[id]);
      if (featureCollection) {
        featureCollection.features.forEach(function (feature) {
          if (feature.properties.manifest && !params.manifest) params.manifest = feature.properties.manifest;
          if (feature.properties.canvas && !params.canvas) params.canvas = feature.properties.canvas;
        });
      }
    });
  }
  if (!params.manifest) params.manifest = this.card.manifest || this.defaultManifest();
  params.canvas = params.canvas || this.card.canvas;
  params.center = this.card.center;
  params.zoom = this.card.zoom;
  params.expandGallery = this.card.expandGallery;
  params.showGallery = this.card.showGallery;
  iiif_annotation["default"].apply(this, [params]);
  if (this.form && !this.preview) {
    this.card.manifest = this.manifest();
    this.card.canvas = this.canvas();
    this.manifest.subscribe(function (manifest) {
      self.card.manifest = manifest;
    });
    this.canvas.subscribe(function (canvas) {
      self.card.canvas = canvas;
    });
  }
  if (this.preview) {
    this.manifest.subscribe(function (m) {
      if (m !== self.defaultManifest()) self.defaultManifest(m);
    });
    this.defaultManifest.subscribe(function (m) {
      if (m !== self.manifest()) self.manifest(m);
    });
  }
  self.card.center = undefined;
  self.card.zoom = undefined;
  self.expandGallery.subscribe(function (expandGallery) {
    self.card.expandGallery = expandGallery;
  });
  self.showGallery.subscribe(function (showGallery) {
    self.card.showGallery = showGallery;
  });
};
knockout_latest_default().components.register('iiif-card', {
  viewModel: viewModel,
  template: iiif_card_namespaceObject
});
/* harmony default export */ const iiif_card = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S2xELElBQUksQ0FBQ3lCLFFBQVEsQ0FBQyxDQUFDLEVBQUV6QixJQUFJLENBQUN5QixRQUFRLENBQUN5QixDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0VBQ047RUFFQWxELElBQUksQ0FBQ08sSUFBSSxDQUFDQyxNQUFNLEdBQUdrQixTQUFTO0VBQzVCMUIsSUFBSSxDQUFDTyxJQUFJLENBQUNJLElBQUksR0FBR2UsU0FBUztFQUMxQjFCLElBQUksQ0FBQzhDLGFBQWEsQ0FBQ0csU0FBUyxDQUFDLFVBQVNILGFBQWEsRUFBRTtJQUNqRDlDLElBQUksQ0FBQ08sSUFBSSxDQUFDdUMsYUFBYSxHQUFHQSxhQUFhO0VBQzNDLENBQUMsQ0FBQztFQUNGOUMsSUFBSSxDQUFDK0MsV0FBVyxDQUFDRSxTQUFTLENBQUMsVUFBU0YsV0FBVyxFQUFFO0lBQzdDL0MsSUFBSSxDQUFDTyxJQUFJLENBQUN3QyxXQUFXLEdBQUdBLFdBQVc7RUFDdkMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVEdkQsb0NBQWEsQ0FBQzRELFFBQVEsQ0FBQyxXQUFXLEVBQUU7RUFDaEN0RCxTQUFTLEVBQUVBLFNBQVM7RUFDcEJ1RCxRQUFRLEVBQUV4RCx5QkFBZ0JBO0FBQzlCLENBQUMsQ0FBQztBQUNGLGdEQUFlQyxTQUFTLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL2NhcmRzL2lpaWYtY2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGtvTWFwcGluZyBmcm9tICdrbm9ja291dC1tYXBwaW5nJztcbmltcG9ydCBDYXJkQ29tcG9uZW50Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvY2FyZC1jb21wb25lbnQnO1xuaW1wb3J0IElJSUZBbm5vdGF0aW9uVmlld21vZGVsIGZyb20gJ3ZpZXdzL2NvbXBvbmVudHMvaWlpZi1hbm5vdGF0aW9uJztcbmltcG9ydCBBbGVydFZpZXdNb2RlbCBmcm9tICd2aWV3bW9kZWxzL2FsZXJ0JztcbmltcG9ydCBpaWlmQ2FyZFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2NhcmRzL2lpaWYtY2FyZC5odG0nO1xuXG5cbmNvbnN0IHZpZXdNb2RlbCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHBhcmFtcy5jb25maWdLZXlzID0gWydkZWZhdWx0TWFuaWZlc3QnXTtcbiAgICAgICAgXG5cbiAgICBDYXJkQ29tcG9uZW50Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcblxuICAgIHZhciBuZXdUaWxlID0gdHJ1ZTtcbiAgICBpZiAoc2VsZi50aWxlKSBuZXdUaWxlID0gIXNlbGYudGlsZS50aWxlaWQ7XG5cbiAgICBpZiAobmV3VGlsZSkge1xuICAgICAgICB0aGlzLm9uU2F2ZVN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuY2FyZC5jZW50ZXIgPSBzZWxmLm1hcCgpLmdldENlbnRlcigpO1xuICAgICAgICAgICAgc2VsZi5jYXJkLnpvb20gPSBzZWxmLm1hcCgpLmdldFpvb20oKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmRlbGV0ZVRpbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5sb2FkaW5nKHRydWUpO1xuICAgICAgICBzZWxmLnRpbGUuZGVsZXRlVGlsZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgc2VsZi5sb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIHBhcmFtcy5wYWdlVm0uYWxlcnQoXG4gICAgICAgICAgICAgICAgbmV3IEFsZXJ0Vmlld01vZGVsKFxuICAgICAgICAgICAgICAgICAgICAnZXAtYWxlcnQtcmVkJyxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucmVzcG9uc2VKU09OLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5mb3JtLm9uRGVsZXRlRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuZm9ybS5vbkRlbGV0ZUVycm9yKHNlbGYudGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5sb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIGlmICghc2VsZi5jYXJkLnRpbGVzKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jYXJkLm1hbmlmZXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHNlbGYuY2FyZC5jYW52YXMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYW1zLmZvcm0ub25EZWxldGVTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmZvcm0ub25EZWxldGVTdWNjZXNzKHNlbGYudGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5mb3JtICYmIHRoaXMudGlsZSkge1xuICAgICAgICBwYXJhbXMud2lkZ2V0cyA9IHRoaXMuY2FyZC53aWRnZXRzKCkuZmlsdGVyKGZ1bmN0aW9uKHdpZGdldCkge1xuICAgICAgICAgICAgdmFyIGlkID0gd2lkZ2V0Lm5vZGVfaWQoKTtcbiAgICAgICAgICAgIHZhciB0eXBlID0ga28udW53cmFwKHNlbGYuZm9ybS5ub2RlTG9va3VwW2lkXS5kYXRhdHlwZSk7XG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ2Fubm90YXRpb24nO1xuICAgICAgICB9KTtcbiAgICAgICAgcGFyYW1zLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbih3aWRnZXQpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IHdpZGdldC5ub2RlX2lkKCk7XG4gICAgICAgICAgICB2YXIgZmVhdHVyZUNvbGxlY3Rpb24gPSBrb01hcHBpbmcudG9KUyhzZWxmLnRpbGUuZGF0YVtpZF0pO1xuICAgICAgICAgICAgaWYgKGZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMubWFuaWZlc3QgJiYgIXBhcmFtcy5tYW5pZmVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5tYW5pZmVzdCA9IGZlYXR1cmUucHJvcGVydGllcy5tYW5pZmVzdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZlYXR1cmUucHJvcGVydGllcy5jYW52YXMgJiYgIXBhcmFtcy5jYW52YXMpXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuY2FudmFzID0gZmVhdHVyZS5wcm9wZXJ0aWVzLmNhbnZhcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFwYXJhbXMubWFuaWZlc3QpXG4gICAgICAgIHBhcmFtcy5tYW5pZmVzdCA9IHRoaXMuY2FyZC5tYW5pZmVzdCB8fCB0aGlzLmRlZmF1bHRNYW5pZmVzdCgpO1xuICAgIHBhcmFtcy5jYW52YXMgPSBwYXJhbXMuY2FudmFzIHx8IHRoaXMuY2FyZC5jYW52YXM7XG4gICAgcGFyYW1zLmNlbnRlciA9IHRoaXMuY2FyZC5jZW50ZXI7XG4gICAgcGFyYW1zLnpvb20gPSB0aGlzLmNhcmQuem9vbTtcbiAgICBwYXJhbXMuZXhwYW5kR2FsbGVyeSA9IHRoaXMuY2FyZC5leHBhbmRHYWxsZXJ5O1xuICAgIHBhcmFtcy5zaG93R2FsbGVyeSA9IHRoaXMuY2FyZC5zaG93R2FsbGVyeTtcblxuICAgIElJSUZBbm5vdGF0aW9uVmlld21vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcblxuICAgIGlmICh0aGlzLmZvcm0gJiYgIXRoaXMucHJldmlldykge1xuICAgICAgICB0aGlzLmNhcmQubWFuaWZlc3QgPSB0aGlzLm1hbmlmZXN0KCk7XG4gICAgICAgIHRoaXMuY2FyZC5jYW52YXMgPSB0aGlzLmNhbnZhcygpO1xuICAgICAgICB0aGlzLm1hbmlmZXN0LnN1YnNjcmliZShmdW5jdGlvbihtYW5pZmVzdCkge1xuICAgICAgICAgICAgc2VsZi5jYXJkLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNhbnZhcy5zdWJzY3JpYmUoZnVuY3Rpb24oY2FudmFzKSB7XG4gICAgICAgICAgICBzZWxmLmNhcmQuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcmV2aWV3KSB7XG4gICAgICAgIHRoaXMubWFuaWZlc3Quc3Vic2NyaWJlKGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgICAgIGlmIChtICE9PSBzZWxmLmRlZmF1bHRNYW5pZmVzdCgpKSBzZWxmLmRlZmF1bHRNYW5pZmVzdChtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGVmYXVsdE1hbmlmZXN0LnN1YnNjcmliZShmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICBpZiAobSAhPT0gc2VsZi5tYW5pZmVzdCgpKSBzZWxmLm1hbmlmZXN0KG0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxmLmNhcmQuY2VudGVyID0gdW5kZWZpbmVkO1xuICAgIHNlbGYuY2FyZC56b29tID0gdW5kZWZpbmVkO1xuICAgIHNlbGYuZXhwYW5kR2FsbGVyeS5zdWJzY3JpYmUoZnVuY3Rpb24oZXhwYW5kR2FsbGVyeSkge1xuICAgICAgICBzZWxmLmNhcmQuZXhwYW5kR2FsbGVyeSA9IGV4cGFuZEdhbGxlcnk7XG4gICAgfSk7XG4gICAgc2VsZi5zaG93R2FsbGVyeS5zdWJzY3JpYmUoZnVuY3Rpb24oc2hvd0dhbGxlcnkpIHtcbiAgICAgICAgc2VsZi5jYXJkLnNob3dHYWxsZXJ5ID0gc2hvd0dhbGxlcnk7XG4gICAgfSk7XG59O1xuXG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKCdpaWlmLWNhcmQnLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IGlpaWZDYXJkVGVtcGxhdGUsXG59KTtcbmV4cG9ydCBkZWZhdWx0IHZpZXdNb2RlbDtcbiJdLCJuYW1lcyI6WyJrbyIsImtvTWFwcGluZyIsIkNhcmRDb21wb25lbnRWaWV3TW9kZWwiLCJJSUlGQW5ub3RhdGlvblZpZXdtb2RlbCIsIkFsZXJ0Vmlld01vZGVsIiwiaWlpZkNhcmRUZW1wbGF0ZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsInNlbGYiLCJjb25maWdLZXlzIiwiYXBwbHkiLCJuZXdUaWxlIiwidGlsZSIsInRpbGVpZCIsIm9uU2F2ZVN1Y2Nlc3MiLCJjYXJkIiwiY2VudGVyIiwibWFwIiwiZ2V0Q2VudGVyIiwiem9vbSIsImdldFpvb20iLCJkZWxldGVUaWxlIiwibG9hZGluZyIsInJlc3BvbnNlIiwicGFnZVZtIiwiYWxlcnQiLCJyZXNwb25zZUpTT04iLCJ0aXRsZSIsIm1lc3NhZ2UiLCJmb3JtIiwib25EZWxldGVFcnJvciIsInRpbGVzIiwibGVuZ3RoIiwibWFuaWZlc3QiLCJ1bmRlZmluZWQiLCJjYW52YXMiLCJvbkRlbGV0ZVN1Y2Nlc3MiLCJ3aWRnZXRzIiwiZmlsdGVyIiwid2lkZ2V0IiwiaWQiLCJub2RlX2lkIiwidHlwZSIsInVud3JhcCIsIm5vZGVMb29rdXAiLCJkYXRhdHlwZSIsImZvckVhY2giLCJmZWF0dXJlQ29sbGVjdGlvbiIsInRvSlMiLCJkYXRhIiwiZmVhdHVyZXMiLCJmZWF0dXJlIiwicHJvcGVydGllcyIsImRlZmF1bHRNYW5pZmVzdCIsImV4cGFuZEdhbGxlcnkiLCJzaG93R2FsbGVyeSIsInByZXZpZXciLCJzdWJzY3JpYmUiLCJtIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9