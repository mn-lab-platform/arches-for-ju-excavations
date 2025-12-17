"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[50178],{

/***/ 50178:
/*!**************************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/file-renderers/pdfreader.js + 1 modules ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pdfreader)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/cards/file-renderers/pdfreader.htm
const pdfreader_namespaceObject = "templates/views/components/cards/file-renderers/pdfreader.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/file-renderers/pdfreader.js


/* harmony default export */ const pdfreader = (knockout_latest_default().components.register('pdfreader', {
  viewModel: function viewModel(params) {
    this.params = params;
    this.url = "";
    this.type = "";
    this.displayContent = knockout_latest_default().unwrap(this.params.displayContent);
    if (this.displayContent) {
      this.url = this.displayContent.url;
      this.type = this.displayContent.type;
    }
    this.fileType = 'application/pdf';
  },
  template: pdfreader_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYzQzMTQ1MWY5ODE1Y2ZjYzhkOWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDb0U7QUFFOUYsZ0RBQWVBLG9DQUFhLENBQUNHLFFBQVEsQ0FBQyxXQUFXLEVBQUU7RUFDL0NDLFNBQVMsRUFBRSxTQUFYQSxTQUFTQSxDQUFZQyxNQUFNLEVBQUU7SUFDekIsSUFBSSxDQUFDQSxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDQyxHQUFHLEdBQUcsRUFBRTtJQUNiLElBQUksQ0FBQ0MsSUFBSSxHQUFHLEVBQUU7SUFDZCxJQUFJLENBQUNDLGNBQWMsR0FBR1IsZ0NBQVMsQ0FBQyxJQUFJLENBQUNLLE1BQU0sQ0FBQ0csY0FBYyxDQUFDO0lBQzNELElBQUksSUFBSSxDQUFDQSxjQUFjLEVBQUU7TUFDckIsSUFBSSxDQUFDRixHQUFHLEdBQUcsSUFBSSxDQUFDRSxjQUFjLENBQUNGLEdBQUc7TUFDbEMsSUFBSSxDQUFDQyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxjQUFjLENBQUNELElBQUk7SUFDeEM7SUFDQSxJQUFJLENBQUNHLFFBQVEsR0FBRyxpQkFBaUI7RUFDckMsQ0FBQztFQUNEQyxRQUFRLEVBQUVWLHlCQUFpQkE7QUFDL0IsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL2NhcmRzL2ZpbGUtcmVuZGVyZXJzL3BkZnJlYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IHBkZlJlYWRlclRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2NhcmRzL2ZpbGUtcmVuZGVyZXJzL3BkZnJlYWRlci5odG0nO1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwZGZyZWFkZXInLCB7XG4gICAgdmlld01vZGVsOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICB0aGlzLnVybCA9IFwiXCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheUNvbnRlbnQgPSBrby51bndyYXAodGhpcy5wYXJhbXMuZGlzcGxheUNvbnRlbnQpO1xuICAgICAgICBpZiAodGhpcy5kaXNwbGF5Q29udGVudCkge1xuICAgICAgICAgICAgdGhpcy51cmwgPSB0aGlzLmRpc3BsYXlDb250ZW50LnVybDtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZGlzcGxheUNvbnRlbnQudHlwZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbGVUeXBlID0gJ2FwcGxpY2F0aW9uL3BkZic7XG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogcGRmUmVhZGVyVGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsInBkZlJlYWRlclRlbXBsYXRlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwicGFyYW1zIiwidXJsIiwidHlwZSIsImRpc3BsYXlDb250ZW50IiwidW53cmFwIiwiZmlsZVR5cGUiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=