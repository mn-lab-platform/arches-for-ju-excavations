"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[26675],{

/***/ 26675:
/*!****************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/workflows/final-step.js + 1 modules ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ final_step)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/workflows/final-step.htm
const final_step_namespaceObject = "templates/views/components/workflows/final-step.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/workflows/final-step.js



function viewModel(params) {
  this.urls = arches["default"].urls;
  this.loading = knockout_latest_default().observable(true);
  this.resourceid = params.resourceid;
  this.workflowUrl = "".concat(this.urls.root, "plugins/").concat(params.pageVm.plugin.slug);
  this.resourceEditUrl = "".concat(this.urls.resource, "/").concat(this.resourceid);
  try {
    this.resourceid = knockout_latest_default().unwrap(params.workflow.resourceId);
  } catch (e) {
    try {
      this.resourceid = knockout_latest_default().unwrap(params.form.resourceId);
    } catch (e) {
      // pass
    }
  }
}
knockout_latest_default().components.register('final-step', {
  viewModel: viewModel,
  template: final_step_namespaceObject
});
/* harmony default export */ const final_step = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZjczMDcxZjc0ZTU4NTUwZDVlOWMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNFO0FBQ3dEO0FBR3BGLFNBQVNHLFNBQVNBLENBQUNDLE1BQU0sRUFBRTtFQUV2QixJQUFJLENBQUNDLElBQUksR0FBR0osaUJBQU0sQ0FBQ0ksSUFBSTtFQUN2QixJQUFJLENBQUNDLE9BQU8sR0FBR04sb0NBQWEsQ0FBQyxJQUFJLENBQUM7RUFDbEMsSUFBSSxDQUFDUSxVQUFVLEdBQUdKLE1BQU0sQ0FBQ0ksVUFBVTtFQUNuQyxJQUFJLENBQUNDLFdBQVcsTUFBQUMsTUFBQSxDQUFNLElBQUksQ0FBQ0wsSUFBSSxDQUFDTSxJQUFJLGNBQUFELE1BQUEsQ0FBV04sTUFBTSxDQUFDUSxNQUFNLENBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFFO0VBQzFFLElBQUksQ0FBQ0MsZUFBZSxNQUFBTCxNQUFBLENBQU0sSUFBSSxDQUFDTCxJQUFJLENBQUNXLFFBQVEsT0FBQU4sTUFBQSxDQUFJLElBQUksQ0FBQ0YsVUFBVSxDQUFFO0VBRWpFLElBQUk7SUFDQSxJQUFJLENBQUNBLFVBQVUsR0FBR1IsZ0NBQVMsQ0FBQ0ksTUFBTSxDQUFDYyxRQUFRLENBQUNDLFVBQVUsQ0FBQztFQUMzRCxDQUFDLENBQUMsT0FBTUMsQ0FBQyxFQUFFO0lBQ1AsSUFBSTtNQUNBLElBQUksQ0FBQ1osVUFBVSxHQUFHUixnQ0FBUyxDQUFDSSxNQUFNLENBQUNpQixJQUFJLENBQUNGLFVBQVUsQ0FBQztJQUN2RCxDQUFDLENBQUMsT0FBTUMsQ0FBQyxFQUFFO01BQ1A7SUFBQTtFQUVSO0FBQ0o7QUFFQXBCLG9DQUFhLENBQUN1QixRQUFRLENBQUMsWUFBWSxFQUFFO0VBQ2pDcEIsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCcUIsUUFBUSxFQUFFdEIsMEJBQWlCQTtBQUMvQixDQUFDLENBQUM7QUFDRixpREFBZUMsU0FBUyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy93b3JrZmxvd3MvZmluYWwtc3RlcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IGZpbmFsU3RlcFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dvcmtmbG93cy9maW5hbC1zdGVwLmh0bSc7XG5cblxuZnVuY3Rpb24gdmlld01vZGVsKHBhcmFtcykge1xuICAgICAgICBcbiAgICB0aGlzLnVybHMgPSBhcmNoZXMudXJscztcbiAgICB0aGlzLmxvYWRpbmcgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xuICAgIHRoaXMucmVzb3VyY2VpZCA9IHBhcmFtcy5yZXNvdXJjZWlkO1xuICAgIHRoaXMud29ya2Zsb3dVcmwgPSBgJHt0aGlzLnVybHMucm9vdH1wbHVnaW5zLyR7cGFyYW1zLnBhZ2VWbS5wbHVnaW4uc2x1Z31gO1xuICAgIHRoaXMucmVzb3VyY2VFZGl0VXJsID0gYCR7dGhpcy51cmxzLnJlc291cmNlfS8ke3RoaXMucmVzb3VyY2VpZH1gO1xuICAgICAgICBcbiAgICB0cnkge1xuICAgICAgICB0aGlzLnJlc291cmNlaWQgPSBrby51bndyYXAocGFyYW1zLndvcmtmbG93LnJlc291cmNlSWQpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZWlkID0ga28udW53cmFwKHBhcmFtcy5mb3JtLnJlc291cmNlSWQpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIC8vIHBhc3NcbiAgICAgICAgfVxuICAgIH0gXG59XG5cbmtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2ZpbmFsLXN0ZXAnLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IGZpbmFsU3RlcFRlbXBsYXRlLFxufSk7XG5leHBvcnQgZGVmYXVsdCB2aWV3TW9kZWw7XG4iXSwibmFtZXMiOlsia28iLCJhcmNoZXMiLCJmaW5hbFN0ZXBUZW1wbGF0ZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsInVybHMiLCJsb2FkaW5nIiwib2JzZXJ2YWJsZSIsInJlc291cmNlaWQiLCJ3b3JrZmxvd1VybCIsImNvbmNhdCIsInJvb3QiLCJwYWdlVm0iLCJwbHVnaW4iLCJzbHVnIiwicmVzb3VyY2VFZGl0VXJsIiwicmVzb3VyY2UiLCJ1bndyYXAiLCJ3b3JrZmxvdyIsInJlc291cmNlSWQiLCJlIiwiZm9ybSIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=