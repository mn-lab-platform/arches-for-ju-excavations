"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[91930],{

/***/ 91930:
/*!****************************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/file-renderers/imagereader.js + 1 modules ***!
  \****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ imagereader)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/cards/file-renderers/imagereader.htm
const imagereader_namespaceObject = "templates/views/components/cards/file-renderers/imagereader.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/file-renderers/imagereader.js


/* harmony default export */ const imagereader = (knockout_latest_default().components.register('imagereader', {
  viewModel: function viewModel(params) {
    this.params = params;
    this.url = "";
    this.type = "";
    this.displayContent = knockout_latest_default().unwrap(this.params.displayContent);
    if (this.displayContent) {
      this.url = this.displayContent.url;
      this.type = this.displayContent.type;
    }
    this.fileType = 'image/jpeg';
  },
  template: imagereader_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuM2JiNWM2ZmM2Mzk1NGJkMDA3NTQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDd0U7QUFFbEcsa0RBQWVBLG9DQUFhLENBQUNHLFFBQVEsQ0FBQyxhQUFhLEVBQUU7RUFDakRDLFNBQVMsRUFBRSxTQUFYQSxTQUFTQSxDQUFZQyxNQUFNLEVBQUU7SUFDekIsSUFBSSxDQUFDQSxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDQyxHQUFHLEdBQUcsRUFBRTtJQUNiLElBQUksQ0FBQ0MsSUFBSSxHQUFHLEVBQUU7SUFDZCxJQUFJLENBQUNDLGNBQWMsR0FBR1IsZ0NBQVMsQ0FBQyxJQUFJLENBQUNLLE1BQU0sQ0FBQ0csY0FBYyxDQUFDO0lBQzNELElBQUksSUFBSSxDQUFDQSxjQUFjLEVBQUU7TUFDckIsSUFBSSxDQUFDRixHQUFHLEdBQUcsSUFBSSxDQUFDRSxjQUFjLENBQUNGLEdBQUc7TUFDbEMsSUFBSSxDQUFDQyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxjQUFjLENBQUNELElBQUk7SUFDeEM7SUFDQSxJQUFJLENBQUNHLFFBQVEsR0FBRyxZQUFZO0VBQ2hDLENBQUM7RUFDREMsUUFBUSxFQUFFViwyQkFBbUJBO0FBQ2pDLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9jYXJkcy9maWxlLXJlbmRlcmVycy9pbWFnZXJlYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGltYWdlUmVhZGVyVGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvY2FyZHMvZmlsZS1yZW5kZXJlcnMvaW1hZ2VyZWFkZXIuaHRtJztcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3RlcignaW1hZ2VyZWFkZXInLCB7XG4gICAgdmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICB0aGlzLnVybCA9IFwiXCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheUNvbnRlbnQgPSBrby51bndyYXAodGhpcy5wYXJhbXMuZGlzcGxheUNvbnRlbnQpO1xuICAgICAgICBpZiAodGhpcy5kaXNwbGF5Q29udGVudCkge1xuICAgICAgICAgICAgdGhpcy51cmwgPSB0aGlzLmRpc3BsYXlDb250ZW50LnVybDtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZGlzcGxheUNvbnRlbnQudHlwZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbGVUeXBlID0gJ2ltYWdlL2pwZWcnO1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGltYWdlUmVhZGVyVGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsImltYWdlUmVhZGVyVGVtcGxhdGUiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJ1cmwiLCJ0eXBlIiwiZGlzcGxheUNvbnRlbnQiLCJ1bndyYXAiLCJmaWxlVHlwZSIsInRlbXBsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==