"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[80047],{

/***/ 80047:
/*!****************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/search-export.js + 1 modules ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ search_export)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/search/search-export.htm
const search_export_namespaceObject = "templates/views/components/search/search-export.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/fadeVisible.js
var fadeVisible = __webpack_require__(42699);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/clipboard.js
var clipboard = __webpack_require__(39805);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/simple-switch.js + 1 modules
var simple_switch = __webpack_require__(96613);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/search/search-export.js







var componentName = 'search-export';
var viewModel = function viewModel(sharedStateObject) {
  var self = this;
  this.total = sharedStateObject.total;
  this.query = sharedStateObject.query;
  this.selectedPopup = sharedStateObject.selectedPopup;
  this.downloadStarted = knockout_latest_default().observable(false);
  this.reportlink = knockout_latest_default().observable(false);
  this.format = knockout_latest_default().observable('tilecsv');
  this.precision = knockout_latest_default().observable(6);
  this.result = knockout_latest_default().observable();
  this.emailInput = knockout_latest_default().observable(arches["default"].userEmail);
  this.exportName = knockout_latest_default().observable();
  this.celeryRunning = knockout_latest_default().observable(arches["default"].celeryRunning);
  this.hasExportHtmlTemplates = knockout_latest_default().observable(arches["default"].exportHtmlTemplates.length > 0);
  this.downloadPending = knockout_latest_default().observable(false);
  this.hasResourceTypeFilter = knockout_latest_default().observable(!!sharedStateObject.query()['resource-type-filter']);
  this.exportSystemValues = knockout_latest_default().observable(false);
  this.copyGeojsonText = knockout_latest_default().observable("");
  this.showCopyText = knockout_latest_default().observable(false);
  this.query.subscribe(function (val) {
    if (val['resource-type-filter']) {
      self.hasResourceTypeFilter(true);
    } else {
      self.hasResourceTypeFilter(false);
    }
  });
  this.hasResourceTypeFilter.subscribe(function (val) {
    if (!val) {
      self.format('tilecsv');
    }
  });
  this.url = knockout_latest_default().computed(function () {
    var url = arches["default"].urls.export_results;
    var urlparams = knockout_latest_default().unwrap(self.query);
    urlparams.format = self.format();
    urlparams.reportlink = self.reportlink();
    urlparams.precision = self.precision();
    urlparams.total = self.total();
    urlparams.exportsystemvalues = self.exportSystemValues();
    url = url + '?' + jquery_min_default().param(urlparams);
    return url;
  });
  this.geojsonUrl = knockout_latest_default().pureComputed(function () {
    if (knockout_latest_default().unwrap(self.format()) === 'geojson') {
      var exportPath = self.url().replace('search/export_results', 'api/search/export_results');
      return window.location.origin + exportPath;
    } else {
      return null;
    }
  });
  this.copyGeojsonUrlText = function () {
    self.copyGeojsonText("Geojson url copied to clipboard.");
    self.showCopyText(true);
    window.setTimeout(function () {
      self.showCopyText(false);
    }, 6000);
  };
  this.getExportData = function () {
    var payload = knockout_latest_default().unwrap(this.query);
    self.downloadPending(true);
    payload.format = this.format();
    payload.reportlink = this.reportlink();
    payload.precision = this.precision();
    payload.total = this.total();
    payload.email = this.emailInput();
    payload.exportName = this.exportName() || "Arches Export";
    payload.exportsystemvalues = this.exportSystemValues();
    jquery_min_default().ajax({
      type: "GET",
      url: arches["default"].urls.export_results,
      data: payload
    }).done(function (response) {
      self.downloadPending(false);
      self.downloadStarted(true);
      window.setTimeout(function () {
        self.downloadStarted(false);
      }, 9000);
      self.result(response.message);
    });
  };
  this.executeExport = function (limit) {
    if (knockout_latest_default().unwrap(self.format()) === 'geojson' && this.total() <= limit) {
      window.open(this.geojsonUrl());
    } else if (this.total() > limit) {
      this.getExportData();
    } else if (this.total() > 0) {
      window.open(this.url());
    }
  };
  sharedStateObject.searchFilterVms[componentName](this);
};
/* harmony default export */ const search_export = (knockout_latest_default().components.register(componentName, {
  viewModel: viewModel,
  template: search_export_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMzFjZDIxMTJmNjk0MzIzM2RmMjQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNHO0FBQ0U7QUFDMkQ7QUFDekQ7QUFDRjtBQUNZO0FBR3hDLElBQU1JLGFBQWEsR0FBRyxlQUFlO0FBQ3JDLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFZQyxpQkFBaUIsRUFBRTtFQUMxQyxJQUFJQyxJQUFJLEdBQUcsSUFBSTtFQUdmLElBQUksQ0FBQ0MsS0FBSyxHQUFHRixpQkFBaUIsQ0FBQ0UsS0FBSztFQUNwQyxJQUFJLENBQUNDLEtBQUssR0FBR0gsaUJBQWlCLENBQUNHLEtBQUs7RUFDcEMsSUFBSSxDQUFDQyxhQUFhLEdBQUdKLGlCQUFpQixDQUFDSSxhQUFhO0VBQ3BELElBQUksQ0FBQ0MsZUFBZSxHQUFHVixvQ0FBYSxDQUFDLEtBQUssQ0FBQztFQUMzQyxJQUFJLENBQUNZLFVBQVUsR0FBR1osb0NBQWEsQ0FBQyxLQUFLLENBQUM7RUFDdEMsSUFBSSxDQUFDYSxNQUFNLEdBQUdiLG9DQUFhLENBQUMsU0FBUyxDQUFDO0VBQ3RDLElBQUksQ0FBQ2MsU0FBUyxHQUFHZCxvQ0FBYSxDQUFDLENBQUMsQ0FBQztFQUNqQyxJQUFJLENBQUNlLE1BQU0sR0FBR2Ysb0NBQWEsQ0FBQyxDQUFDO0VBQzdCLElBQUksQ0FBQ2dCLFVBQVUsR0FBR2hCLG9DQUFhLENBQUNDLGlCQUFNLENBQUNnQixTQUFTLENBQUM7RUFDakQsSUFBSSxDQUFDQyxVQUFVLEdBQUdsQixvQ0FBYSxDQUFDLENBQUM7RUFDakMsSUFBSSxDQUFDbUIsYUFBYSxHQUFHbkIsb0NBQWEsQ0FBQ0MsaUJBQU0sQ0FBQ2tCLGFBQWEsQ0FBQztFQUN4RCxJQUFJLENBQUNDLHNCQUFzQixHQUFHcEIsb0NBQWEsQ0FBQ0MsaUJBQU0sQ0FBQ29CLG1CQUFtQixDQUFDQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0VBQ2xGLElB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LEtBQUssRUFBQztJQUNoQyxJQUFJekQsZ0NBQVMsQ0FBQ00sSUFBSSxDQUFDTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQ04sS0FBSyxDQUFDLENBQUMsSUFBSWtELEtBQUssRUFBRTtNQUNqRWYsTUFBTSxDQUFDZ0IsSUFBSSxDQUFDLElBQUksQ0FBQ3BCLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDL0IsS0FBSyxDQUFDLENBQUMsR0FBR2tELEtBQUssRUFBRTtNQUM3QixJQUFJLENBQUNWLGFBQWEsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQ3hDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQ3pCbUMsTUFBTSxDQUFDZ0IsSUFBSSxDQUFDLElBQUksQ0FBQzVCLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0I7RUFDSixDQUFDO0VBRUR6QixpQkFBaUIsQ0FBQ3NELGVBQWUsQ0FBQ3hELGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUMxRCxDQUFDO0FBRUQsb0RBQWVILG9DQUFhLENBQUM2RCxRQUFRLENBQUMxRCxhQUFhLEVBQUU7RUFDakRDLFNBQVMsRUFBRUEsU0FBUztFQUNwQjBELFFBQVEsRUFBRTVELDZCQUFvQkE7QUFDbEMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9zZWFyY2gtZXhwb3J0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IHNlYXJjaEV4cG9ydFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3NlYXJjaC9zZWFyY2gtZXhwb3J0Lmh0bSc7XG5pbXBvcnQgJ2JpbmRpbmdzL2ZhZGVWaXNpYmxlJztcbmltcG9ydCAnYmluZGluZ3MvY2xpcGJvYXJkJztcbmltcG9ydCAndmlld3MvY29tcG9uZW50cy9zaW1wbGUtc3dpdGNoJztcblxuXG5jb25zdCBjb21wb25lbnROYW1lID0gJ3NlYXJjaC1leHBvcnQnO1xuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24oc2hhcmVkU3RhdGVPYmplY3QpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgXG4gICAgdGhpcy50b3RhbCA9IHNoYXJlZFN0YXRlT2JqZWN0LnRvdGFsO1xuICAgIHRoaXMucXVlcnkgPSBzaGFyZWRTdGF0ZU9iamVjdC5xdWVyeTtcbiAgICB0aGlzLnNlbGVjdGVkUG9wdXAgPSBzaGFyZWRTdGF0ZU9iamVjdC5zZWxlY3RlZFBvcHVwO1xuICAgIHRoaXMuZG93bmxvYWRTdGFydGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy5yZXBvcnRsaW5rID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy5mb3JtYXQgPSBrby5vYnNlcnZhYmxlKCd0aWxlY3N2Jyk7XG4gICAgdGhpcy5wcmVjaXNpb24gPSBrby5vYnNlcnZhYmxlKDYpO1xuICAgIHRoaXMucmVzdWx0ID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZW1haWxJbnB1dCA9IGtvLm9ic2VydmFibGUoYXJjaGVzLnVzZXJFbWFpbCk7XG4gICAgdGhpcy5leHBvcnROYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuY2VsZXJ5UnVubmluZyA9IGtvLm9ic2VydmFibGUoYXJjaGVzLmNlbGVyeVJ1bm5pbmcpO1xuICAgIHRoaXMuaGFzRXhwb3J0SHRtbFRlbXBsYXRlcyA9IGtvLm9ic2VydmFibGUoYXJjaGVzLmV4cG9ydEh0bWxUZW1wbGF0ZXMubGVuZ3RoID4gMCk7XG4gICAgdGhpcy5kb3dubG9hZFBlbmRpbmcgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICB0aGlzLmhhc1Jlc291cmNlVHlwZUZpbHRlciA9IGtvLm9ic2VydmFibGUoISFzaGFyZWRTdGF0ZU9iamVjdC5xdWVyeSgpWydyZXNvdXJjZS10eXBlLWZpbHRlciddKTtcbiAgICB0aGlzLmV4cG9ydFN5c3RlbVZhbHVlcyA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgIHRoaXMuY29weUdlb2pzb25UZXh0ID0ga28ub2JzZXJ2YWJsZShcIlwiKTtcbiAgICB0aGlzLnNob3dDb3B5VGV4dCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuXG4gICAgdGhpcy5xdWVyeS5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWxbJ3Jlc291cmNlLXR5cGUtZmlsdGVyJ10pIHtcbiAgICAgICAgICAgIHNlbGYuaGFzUmVzb3VyY2VUeXBlRmlsdGVyKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5oYXNSZXNvdXJjZVR5cGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmhhc1Jlc291cmNlVHlwZUZpbHRlci5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICghdmFsKSB7XG4gICAgICAgICAgICBzZWxmLmZvcm1hdCgndGlsZWNzdicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnVybCA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdXJsID0gYXJjaGVzLnVybHMuZXhwb3J0X3Jlc3VsdHM7XG4gICAgICAgIHZhciB1cmxwYXJhbXMgPSBrby51bndyYXAoc2VsZi5xdWVyeSk7XG4gICAgICAgIHVybHBhcmFtcy5mb3JtYXQgPSBzZWxmLmZvcm1hdCgpO1xuICAgICAgICB1cmxwYXJhbXMucmVwb3J0bGluayA9IHNlbGYucmVwb3J0bGluaygpO1xuICAgICAgICB1cmxwYXJhbXMucHJlY2lzaW9uID0gc2VsZi5wcmVjaXNpb24oKTtcbiAgICAgICAgdXJscGFyYW1zLnRvdGFsID0gc2VsZi50b3RhbCgpO1xuICAgICAgICB1cmxwYXJhbXMuZXhwb3J0c3lzdGVtdmFsdWVzID0gc2VsZi5leHBvcnRTeXN0ZW1WYWx1ZXMoKTtcbiAgICAgICAgdXJsID0gdXJsICsgJz8nICsgJC5wYXJhbSh1cmxwYXJhbXMpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH0pO1xuXG4gICAgdGhpcy5nZW9qc29uVXJsID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmIChrby51bndyYXAoc2VsZi5mb3JtYXQoKSkgPT09ICdnZW9qc29uJykge1xuICAgICAgICAgICAgdmFyIGV4cG9ydFBhdGggPSBzZWxmLnVybCgpLnJlcGxhY2UoJ3NlYXJjaC9leHBvcnRfcmVzdWx0cycsICdhcGkvc2VhcmNoL2V4cG9ydF9yZXN1bHRzJyk7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIGV4cG9ydFBhdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5jb3B5R2VvanNvblVybFRleHQgPSBmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLmNvcHlHZW9qc29uVGV4dChcIkdlb2pzb24gdXJsIGNvcGllZCB0byBjbGlwYm9hcmQuXCIpXG4gICAgICAgIHNlbGYuc2hvd0NvcHlUZXh0KHRydWUpO1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5zaG93Q29weVRleHQoZmFsc2UpO1xuICAgICAgICB9LCA2MDAwKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRFeHBvcnREYXRhID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHBheWxvYWQgPSBrby51bndyYXAodGhpcy5xdWVyeSk7XG4gICAgICAgIHNlbGYuZG93bmxvYWRQZW5kaW5nKHRydWUpO1xuICAgICAgICBwYXlsb2FkLmZvcm1hdCA9IHRoaXMuZm9ybWF0KCk7XG4gICAgICAgIHBheWxvYWQucmVwb3J0bGluayA9IHRoaXMucmVwb3J0bGluaygpO1xuICAgICAgICBwYXlsb2FkLnByZWNpc2lvbiA9IHRoaXMucHJlY2lzaW9uKCk7XG4gICAgICAgIHBheWxvYWQudG90YWwgPSB0aGlzLnRvdGFsKCk7XG4gICAgICAgIHBheWxvYWQuZW1haWwgPSB0aGlzLmVtYWlsSW5wdXQoKTtcbiAgICAgICAgcGF5bG9hZC5leHBvcnROYW1lID0gdGhpcy5leHBvcnROYW1lKCkgfHwgXCJBcmNoZXMgRXhwb3J0XCI7XG4gICAgICAgIHBheWxvYWQuZXhwb3J0c3lzdGVtdmFsdWVzID0gdGhpcy5leHBvcnRTeXN0ZW1WYWx1ZXMoKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLmV4cG9ydF9yZXN1bHRzLFxuICAgICAgICAgICAgZGF0YTogcGF5bG9hZFxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBzZWxmLmRvd25sb2FkUGVuZGluZyhmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmRvd25sb2FkU3RhcnRlZCh0cnVlKTtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5kb3dubG9hZFN0YXJ0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgfSwgOTAwMCk7XG4gICAgICAgICAgICBzZWxmLnJlc3VsdChyZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZXhlY3V0ZUV4cG9ydCA9IGZ1bmN0aW9uKGxpbWl0KXtcbiAgICAgICAgaWYgKGtvLnVud3JhcChzZWxmLmZvcm1hdCgpKSA9PT0gJ2dlb2pzb24nICYmIHRoaXMudG90YWwoKSA8PSBsaW1pdCkge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4odGhpcy5nZW9qc29uVXJsKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG90YWwoKSA+IGxpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLmdldEV4cG9ydERhdGEoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsKCkgPiAwKSB7XG4gICAgICAgICAgICB3aW5kb3cub3Blbih0aGlzLnVybCgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzaGFyZWRTdGF0ZU9iamVjdC5zZWFyY2hGaWx0ZXJWbXNbY29tcG9uZW50TmFtZV0odGhpcyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKGNvbXBvbmVudE5hbWUsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogc2VhcmNoRXhwb3J0VGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyIkIiwia28iLCJhcmNoZXMiLCJzZWFyY2hFeHBvcnRUZW1wbGF0ZSIsImNvbXBvbmVudE5hbWUiLCJ2aWV3TW9kZWwiLCJzaGFyZWRTdGF0ZU9iamVjdCIsInNlbGYiLCJ0b3RhbCIsInF1ZXJ5Iiwic2VsZWN0ZWRQb3B1cCIsImRvd25sb2FkU3RhcnRlZCIsIm9ic2VydmFibGUiLCJyZXBvcnRsaW5rIiwiZm9ybWF0IiwicHJlY2lzaW9uIiwicmVzdWx0IiwiZW1haWxJbnB1dCIsInVzZXJFbWFpbCIsImV4cG9ydE5hbWUiLCJjZWxlcnlSdW5uaW5nIiwiaGFzRXhwb3J0SHRtbFRlbXBsYXRlcyIsImV4cG9ydEh0bWxUZW1wbGF0ZXMiLCJsZW5ndGgiLCJkb3dubG9hZFBlbmRpbmciLCJoYXNSZXNvdXJjZVR5cGVGaWx0ZXIiLCJleHBvcnRTeXN0ZW1WYWx1ZXMiLCJjb3B5R2VvanNvblRleHQiLCJzaG93Q29weVRleHQiLCJzdWJzY3JpYmUiLCJ2YWwiLCJ1cmwiLCJjb21wdXRlZCIsInVybHMiLCJleHBvcnRfcmVzdWx0cyIsInVybHBhcmFtcyIsInVud3JhcCIsImV4cG9ydHN5c3RlbXZhbHVlcyIsInBhcmFtIiwiZ2VvanNvblVybCIsInB1cmVDb21wdXRlZCIsImV4cG9ydFBhdGgiLCJyZXBsYWNlIiwid2luZG93IiwibG9jYXRpb24iLCJvcmlnaW4iLCJjb3B5R2VvanNvblVybFRleHQiLCJzZXRUaW1lb3V0IiwiZ2V0RXhwb3J0RGF0YSIsInBheWxvYWQiLCJlbWFpbCIsImFqYXgiLCJ0eXBlIiwiZGF0YSIsImRvbmUiLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJleGVjdXRlRXhwb3J0IiwibGltaXQiLCJvcGVuIiwic2VhcmNoRmlsdGVyVm1zIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9