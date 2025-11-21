(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[2673],{

/***/ 2673:
/*!**********************************************************************************************!*\
  !*** ./arches_slocal/media/js/views/components/workflows/iiif/iiif-simple-annotator-step.js ***!
  \**********************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! knockout */ 51786), __webpack_require__(/*! leaflet */ 53214), __webpack_require__(/*! arches */ 77126), __webpack_require__(/*! templates/views/components/workflows/iiif/iiif-simple-annotator-step.htm */ 91625)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (ko, L, arches, template) {
  function viewModel(params) {
    var self = this;
    console.log('[WF LOG] Annotator init, params.imageServiceUrl =', params.imageServiceUrl, 'typeof =', _typeof(params.imageServiceUrl));
    if (ko.isObservable(params.imageServiceUrl)) {
      this.imageServiceUrl = params.imageServiceUrl;
    } else {
      this.imageServiceUrl = ko.observable(params.imageServiceUrl || '');
    }
    console.log('[WF LOG] Annotator effective URL =', this.imageServiceUrl());
    this.map = null;
    this.annotations = ko.observableArray([]);
    this.imageServiceUrl.subscribe(function (newVal) {
      console.log('[WF LOG] Annotator URL changed ->', newVal);
      if (newVal && self.map && L.tileLayer && L.tileLayer.iiif) {
        try {
          L.tileLayer.iiif(newVal.replace(/\/info\.json$/, '') + '/info.json').addTo(self.map);
        } catch (e) {
          console.error('[WF LOG] IIIF add error:', e);
        }
      }
    });
    this.afterMapRender = function (element) {
      // element comes from the template afterRender wrapper; get the #annotation-map div
      var container = element && element.querySelector ? element.querySelector('#annotation-map') : document.getElementById('annotation-map');
      console.log('[WF LOG] afterMapRender container =', container);
      self.map = L.map(container, {
        crs: L.CRS.Simple,
        center: [0, 0],
        zoom: 0,
        minZoom: -5,
        maxZoom: 5
      });
      console.log('[WF LOG] Leaflet map created');
      var url = (self.imageServiceUrl() || '').replace(/\/info\.json$/, '');
      console.log('[WF LOG] will load IIIF from =', url);
      if (url && L.tileLayer && L.tileLayer.iiif) {
        try {
          var iiifLayer = L.tileLayer.iiif(url + '/info.json');
          iiifLayer.addTo(self.map);
          iiifLayer.on('load', function () {
            if (iiifLayer && iiifLayer.options && iiifLayer.options.bounds) {
              self.map.fitBounds(iiifLayer.options.bounds);
            }
          });
        } catch (e) {
          console.error('[WF LOG] IIIF layer load error:', e);
        }
      }

      // minimal drawing (optional)
      var drawnItems = new L.FeatureGroup();
      self.map.addLayer(drawnItems);
      var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
          remove: true
        },
        draw: {
          polygon: true,
          rectangle: true,
          circle: true,
          marker: true,
          polyline: true,
          circlemarker: false
        }
      });
      self.map.addControl(drawControl);
      self.map.on(L.Draw.Event.CREATED, function (e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);
        self.annotations.push({
          id: 'annotation-' + Date.now(),
          type: e.layerType,
          geometry: layer.toGeoJSON().geometry,
          created: new Date().toISOString()
        });
      });
    };
    params.form.save = function () {
      // make annotations available later if needed
      self.data = {
        imageServiceUrl: self.imageServiceUrl(),
        annotations: self.annotations()
      };
      return Promise.resolve(true);
    };
    return self;
  }
  return ko.components.register('iiif-simple-annotator-step', {
    viewModel: viewModel,
    template: template
  });
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 91625:
/*!************************************************************************************************!*\
  !*** ./arches_slocal/templates/views/components/workflows/iiif/iiif-simple-annotator-step.htm ***!
  \************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "templates/views/components/workflows/iiif/iiif-simple-annotator-step.htm";

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQzFEM0UsU0FBUyxFQUFFQSxTQUFTO0lBQ3BCRCxRQUFRLEVBQUVBO0VBQ1osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUFBLGtHQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vYXJjaGVzX3Nsb2NhbC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3dvcmtmbG93cy9paWlmL2lpaWYtc2ltcGxlLWFubm90YXRvci1zdGVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbXHJcbiAgJ2tub2Nrb3V0JyxcclxuICAnbGVhZmxldCcsXHJcbiAgJ2FyY2hlcycsXHJcbiAgJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dvcmtmbG93cy9paWlmL2lpaWYtc2ltcGxlLWFubm90YXRvci1zdGVwLmh0bSdcclxuXSwgZnVuY3Rpb24oa28sIEwsIGFyY2hlcywgdGVtcGxhdGUpIHtcclxuXHJcbiAgZnVuY3Rpb24gdmlld01vZGVsKHBhcmFtcykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXSBBbm5vdGF0b3IgaW5pdCwgcGFyYW1zLmltYWdlU2VydmljZVVybCA9JywgcGFyYW1zLmltYWdlU2VydmljZVVybCwgJ3R5cGVvZiA9JywgdHlwZW9mIHBhcmFtcy5pbWFnZVNlcnZpY2VVcmwpO1xyXG5cclxuICAgIGlmIChrby5pc09ic2VydmFibGUocGFyYW1zLmltYWdlU2VydmljZVVybCkpIHtcclxuICAgICAgdGhpcy5pbWFnZVNlcnZpY2VVcmwgPSBwYXJhbXMuaW1hZ2VTZXJ2aWNlVXJsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbWFnZVNlcnZpY2VVcmwgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5pbWFnZVNlcnZpY2VVcmwgfHwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXSBBbm5vdGF0b3IgZWZmZWN0aXZlIFVSTCA9JywgdGhpcy5pbWFnZVNlcnZpY2VVcmwoKSk7XHJcblxyXG4gICAgdGhpcy5tYXAgPSBudWxsO1xyXG4gICAgdGhpcy5hbm5vdGF0aW9ucyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblxyXG4gICAgdGhpcy5pbWFnZVNlcnZpY2VVcmwuc3Vic2NyaWJlKGZ1bmN0aW9uKG5ld1ZhbCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnW1dGIExPR10gQW5ub3RhdG9yIFVSTCBjaGFuZ2VkIC0+JywgbmV3VmFsKTtcclxuICAgICAgaWYgKG5ld1ZhbCAmJiBzZWxmLm1hcCAmJiBMLnRpbGVMYXllciAmJiBMLnRpbGVMYXllci5paWlmKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIEwudGlsZUxheWVyLmlpaWYobmV3VmFsLnJlcGxhY2UoL1xcL2luZm9cXC5qc29uJC8sICcnKSArICcvaW5mby5qc29uJykuYWRkVG8oc2VsZi5tYXApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tXRiBMT0ddIElJSUYgYWRkIGVycm9yOicsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hZnRlck1hcFJlbmRlciA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgLy8gZWxlbWVudCBjb21lcyBmcm9tIHRoZSB0ZW1wbGF0ZSBhZnRlclJlbmRlciB3cmFwcGVyOyBnZXQgdGhlICNhbm5vdGF0aW9uLW1hcCBkaXZcclxuICAgICAgdmFyIGNvbnRhaW5lciA9IChlbGVtZW50ICYmIGVsZW1lbnQucXVlcnlTZWxlY3RvcikgPyBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbm5vdGF0aW9uLW1hcCcpIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fubm90YXRpb24tbWFwJyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbV0YgTE9HXSBhZnRlck1hcFJlbmRlciBjb250YWluZXIgPScsIGNvbnRhaW5lcik7XHJcblxyXG4gICAgICBzZWxmLm1hcCA9IEwubWFwKGNvbnRhaW5lciwge1xyXG4gICAgICAgIGNyczogTC5DUlMuU2ltcGxlLFxyXG4gICAgICAgIGNlbnRlcjogWzAsIDBdLFxyXG4gICAgICAgIHpvb206IDAsXHJcbiAgICAgICAgbWluWm9vbTogLTUsXHJcbiAgICAgICAgbWF4Wm9vbTogNVxyXG4gICAgICB9KTtcclxuICAgICAgY29uc29sZS5sb2coJ1tXRiBMT0ddIExlYWZsZXQgbWFwIGNyZWF0ZWQnKTtcclxuXHJcbiAgICAgIHZhciB1cmwgPSAoc2VsZi5pbWFnZVNlcnZpY2VVcmwoKSB8fCAnJykucmVwbGFjZSgvXFwvaW5mb1xcLmpzb24kLywgJycpO1xyXG4gICAgICBjb25zb2xlLmxvZygnW1dGIExPR10gd2lsbCBsb2FkIElJSUYgZnJvbSA9JywgdXJsKTtcclxuXHJcbiAgICAgIGlmICh1cmwgJiYgTC50aWxlTGF5ZXIgJiYgTC50aWxlTGF5ZXIuaWlpZikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB2YXIgaWlpZkxheWVyID0gTC50aWxlTGF5ZXIuaWlpZih1cmwgKyAnL2luZm8uanNvbicpO1xyXG4gICAgICAgICAgaWlpZkxheWVyLmFkZFRvKHNlbGYubWFwKTtcclxuICAgICAgICAgIGlpaWZMYXllci5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoaWlpZkxheWVyICYmIGlpaWZMYXllci5vcHRpb25zICYmIGlpaWZMYXllci5vcHRpb25zLmJvdW5kcykge1xyXG4gICAgICAgICAgICAgIHNlbGYubWFwLmZpdEJvdW5kcyhpaWlmTGF5ZXIub3B0aW9ucy5ib3VuZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdbV0YgTE9HXSBJSUlGIGxheWVyIGxvYWQgZXJyb3I6JywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBtaW5pbWFsIGRyYXdpbmcgKG9wdGlvbmFsKVxyXG4gICAgICB2YXIgZHJhd25JdGVtcyA9IG5ldyBMLkZlYXR1cmVHcm91cCgpO1xyXG4gICAgICBzZWxmLm1hcC5hZGRMYXllcihkcmF3bkl0ZW1zKTtcclxuICAgICAgdmFyIGRyYXdDb250cm9sID0gbmV3IEwuQ29udHJvbC5EcmF3KHtcclxuICAgICAgICBlZGl0OiB7IGZlYXR1cmVHcm91cDogZHJhd25JdGVtcywgcmVtb3ZlOiB0cnVlIH0sXHJcbiAgICAgICAgZHJhdzogeyBwb2x5Z29uOiB0cnVlLCByZWN0YW5nbGU6IHRydWUsIGNpcmNsZTogdHJ1ZSwgbWFya2VyOiB0cnVlLCBwb2x5bGluZTogdHJ1ZSwgY2lyY2xlbWFya2VyOiBmYWxzZSB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBzZWxmLm1hcC5hZGRDb250cm9sKGRyYXdDb250cm9sKTtcclxuXHJcbiAgICAgIHNlbGYubWFwLm9uKEwuRHJhdy5FdmVudC5DUkVBVEVELCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGxheWVyID0gZS5sYXllcjtcclxuICAgICAgICBkcmF3bkl0ZW1zLmFkZExheWVyKGxheWVyKTtcclxuICAgICAgICBzZWxmLmFubm90YXRpb25zLnB1c2goe1xyXG4gICAgICAgICAgaWQ6ICdhbm5vdGF0aW9uLScgKyBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgdHlwZTogZS5sYXllclR5cGUsXHJcbiAgICAgICAgICBnZW9tZXRyeTogbGF5ZXIudG9HZW9KU09OKCkuZ2VvbWV0cnksXHJcbiAgICAgICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHBhcmFtcy5mb3JtLnNhdmUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgLy8gbWFrZSBhbm5vdGF0aW9ucyBhdmFpbGFibGUgbGF0ZXIgaWYgbmVlZGVkXHJcbiAgICAgIHNlbGYuZGF0YSA9IHtcclxuICAgICAgICBpbWFnZVNlcnZpY2VVcmw6IHNlbGYuaW1hZ2VTZXJ2aWNlVXJsKCksXHJcbiAgICAgICAgYW5ub3RhdGlvbnM6IHNlbGYuYW5ub3RhdGlvbnMoKVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gc2VsZjtcclxuICB9XHJcblxyXG4gIHJldHVybiBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdpaWlmLXNpbXBsZS1hbm5vdGF0b3Itc3RlcCcsIHtcclxuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxyXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiZGVmaW5lIiwia28iLCJMIiwiYXJjaGVzIiwidGVtcGxhdGUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImltYWdlU2VydmljZVVybCIsIl90eXBlb2YiLCJpc09ic2VydmFibGUiLCJvYnNlcnZhYmxlIiwibWFwIiwiYW5ub3RhdGlvbnMiLCJvYnNlcnZhYmxlQXJyYXkiLCJzdWJzY3JpYmUiLCJuZXdWYWwiLCJ0aWxlTGF5ZXIiLCJpaWlmIiwicmVwbGFjZSIsImFkZFRvIiwiZSIsImVycm9yIiwiYWZ0ZXJNYXBSZW5kZXIiLCJlbGVtZW50IiwiY29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcnMiLCJDUlMiLCJTaW1wbGUiLCJjZW50ZXIiLCJ6b29tIiwibWluWm9vbSIsIm1heFpvb20iLCJ1cmwiLCJpaWlmTGF5ZXIiLCJvbiIsIm9wdGlvbnMiLCJib3VuZHMiLCJmaXRCb3VuZHMiLCJkcmF3bkl0ZW1zIiwiRmVhdHVyZUdyb3VwIiwiYWRkTGF5ZXIiLCJkcmF3Q29udHJvbCIsIkNvbnRyb2wiLCJEcmF3IiwiZWRpdCIsImZlYXR1cmVHcm91cCIsInJlbW92ZSIsImRyYXciLCJwb2x5Z29uIiwicmVjdGFuZ2xlIiwiY2lyY2xlIiwibWFya2VyIiwicG9seWxpbmUiLCJjaXJjbGVtYXJrZXIiLCJhZGRDb250cm9sIiwiRXZlbnQiLCJDUkVBVEVEIiwibGF5ZXIiLCJwdXNoIiwiaWQiLCJEYXRlIiwibm93IiwidHlwZSIsImxheWVyVHlwZSIsImdlb21ldHJ5IiwidG9HZW9KU09OIiwiY3JlYXRlZCIsInRvSVNPU3RyaW5nIiwiZm9ybSIsInNhdmUiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiXSwic291cmNlUm9vdCI6IiJ9