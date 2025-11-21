"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[90141],{

/***/ 90141:
/*!*****************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/workbench.js + 1 modules ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ workbench)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/workbench.htm
const workbench_namespaceObject = "templates/views/components/workbench.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/aria.js
var aria = __webpack_require__(9285);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/sortable.js
var sortable = __webpack_require__(40319);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/workbench.js






var viewModel = function viewModel(params) {
  var self = this;
  this.activeTab = knockout_latest_default().observable(params.activeTab);
  this.showTabs = knockout_latest_default().observable(true);
  this.hideSidePanel = function (focusElement) {
    self.activeTab(undefined);
    if (focusElement) {
      aria["default"].shiftFocus(focusElement);
    }
  };
  if (this.card) {
    this.card.allowProvisionalEditRerender(false);
  }
  this.expandSidePanel = knockout_latest_default().computed(function () {
    if (self.tile) {
      return self.tile.hasprovisionaledits() && self.reviewer === true;
    } else {
      return false;
    }
  });
  this.workbenchWrapperClass = knockout_latest_default().observable();
  this.toggleTab = function (tabName) {
    if (self.activeTab() === tabName) {
      self.activeTab(null);
    } else {
      self.activeTab(tabName);
    }
  };
};
knockout_latest_default().components.register('workbench', {
  viewModel: viewModel,
  template: workbench_namespaceObject
});
/* harmony default export */ const workbench = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYzM3MjllZjE5ODgxZjgzZWE0ZDUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNJO0FBQ0Q7QUFDK0M7QUFDdEM7QUFDUjtBQUczQixJQUFJSyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQzdCLElBQUlDLElBQUksR0FBRyxJQUFJO0VBR2YsSUFBSSxDQUFDQyxTQUFTLEdBQUdOLG9DQUFhLENBQUNJLE1BQU0sQ0FBQ0UsU0FBUyxDQUFDO0VBQ2hELElBQUksQ0FBQ0UsUUFBUSxHQUFHUixvQ0FBYSxDQUFDLElBQUksQ0FBQztFQUNuQyxJQUFJLENBQUNTLGFBQWEsR0FBRyxVQUFTQyxZQUFZLEVBQUU7SUFDeENMLElBQUksQ0FBQ0MsU0FBUyxDQUFDSyxTQUFTLENBQUM7SUFDekIsSUFBR0QsWUFBWSxFQUFDO01BQ1pSLGVBQVMsQ0FBQ1UsVUFBVSxDQUFDRixZQUFZLENBQUM7SUFDdEM7RUFDSixDQUFDO0VBRUQsSUFBSSxJQUFJLENBQUNHLElBQUksRUFBRTtJQUNYLElBQUksQ0FBQ0EsSUFBSSxDQUFDQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUM7RUFDakQ7RUFFQSxJQUFJLENBQUNDLGVBQWUsR0FBR2Ysa0NBQVcsQ0FBQyxZQUFVO0lBQ3pDLElBQUlLLElBQUksQ0FBQ1ksSUFBSSxFQUFFO01BQ1gsT0FBT1osSUFBSSxDQUFDWSxJQUFJLENBQUNDLG1CQUFtQixDQUFDLENBQUMsSUFBSWIsSUFBSSxDQUFDYyxRQUFRLEtBQUssSUFBSTtJQUNwRSxDQUFDLE1BQU07TUFDSCxPQUFPLEtBQUs7SUFDaEI7RUFDSixDQUFDLENBQUM7RUFFRixJQUFJLENBQUNDLHFCQUFxQixHQUFHcEIsb0NBQWEsQ0FBQyxDQUFDO0VBRTVDLElBQUksQ0FBQ3FCLFNBQVMsR0FBRyxVQUFTQyxPQUFPLEVBQUU7SUFDL0IsSUFBSWpCLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUMsS0FBS2dCLE9BQU8sRUFBRTtNQUM5QmpCLElBQUksQ0FBQ0MsU0FBUyxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDLE1BQU07TUFDSEQsSUFBSSxDQUFDQyxTQUFTLENBQUNnQixPQUFPLENBQUM7SUFDM0I7RUFDSixDQUFDO0FBQ0wsQ0FBQztBQUVEdEIsb0NBQWEsQ0FBQ3dCLFFBQVEsQ0FBQyxXQUFXLEVBQUU7RUFDaENyQixTQUFTLEVBQUVBLFNBQVM7RUFDcEJzQixRQUFRLEVBQUV4Qix5QkFBaUJBO0FBQy9CLENBQUMsQ0FBQztBQUNGLGdEQUFlRSxTQUFTLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3dvcmtiZW5jaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IHdvcmtiZW5jaFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dvcmtiZW5jaC5odG0nO1xuaW1wb3J0IGFyaWFVdGlscyBmcm9tICd1dGlscy9hcmlhJztcbmltcG9ydCAnYmluZGluZ3Mvc29ydGFibGUnO1xuXG5cbnZhciB2aWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgXG4gICAgdGhpcy5hY3RpdmVUYWIgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5hY3RpdmVUYWIpO1xuICAgIHRoaXMuc2hvd1RhYnMgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xuICAgIHRoaXMuaGlkZVNpZGVQYW5lbCA9IGZ1bmN0aW9uKGZvY3VzRWxlbWVudCkge1xuICAgICAgICBzZWxmLmFjdGl2ZVRhYih1bmRlZmluZWQpO1xuICAgICAgICBpZihmb2N1c0VsZW1lbnQpe1xuICAgICAgICAgICAgYXJpYVV0aWxzLnNoaWZ0Rm9jdXMoZm9jdXNFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jYXJkKSB7XG4gICAgICAgIHRoaXMuY2FyZC5hbGxvd1Byb3Zpc2lvbmFsRWRpdFJlcmVuZGVyKGZhbHNlKTtcbiAgICB9XG5cbiAgICB0aGlzLmV4cGFuZFNpZGVQYW5lbCA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmIChzZWxmLnRpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLnRpbGUuaGFzcHJvdmlzaW9uYWxlZGl0cygpICYmIHNlbGYucmV2aWV3ZXIgPT09IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLndvcmtiZW5jaFdyYXBwZXJDbGFzcyA9IGtvLm9ic2VydmFibGUoKTtcblxuICAgIHRoaXMudG9nZ2xlVGFiID0gZnVuY3Rpb24odGFiTmFtZSkge1xuICAgICAgICBpZiAoc2VsZi5hY3RpdmVUYWIoKSA9PT0gdGFiTmFtZSkge1xuICAgICAgICAgICAgc2VsZi5hY3RpdmVUYWIobnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFjdGl2ZVRhYih0YWJOYW1lKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKCd3b3JrYmVuY2gnLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IHdvcmtiZW5jaFRlbXBsYXRlLFxufSk7XG5leHBvcnQgZGVmYXVsdCB2aWV3TW9kZWw7XG4iXSwibmFtZXMiOlsiJCIsIl8iLCJrbyIsIndvcmtiZW5jaFRlbXBsYXRlIiwiYXJpYVV0aWxzIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsImFjdGl2ZVRhYiIsIm9ic2VydmFibGUiLCJzaG93VGFicyIsImhpZGVTaWRlUGFuZWwiLCJmb2N1c0VsZW1lbnQiLCJ1bmRlZmluZWQiLCJzaGlmdEZvY3VzIiwiY2FyZCIsImFsbG93UHJvdmlzaW9uYWxFZGl0UmVyZW5kZXIiLCJleHBhbmRTaWRlUGFuZWwiLCJjb21wdXRlZCIsInRpbGUiLCJoYXNwcm92aXNpb25hbGVkaXRzIiwicmV2aWV3ZXIiLCJ3b3JrYmVuY2hXcmFwcGVyQ2xhc3MiLCJ0b2dnbGVUYWIiLCJ0YWJOYW1lIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9