"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[81876],{

/***/ 81876:
/*!**********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/edtf.js + 1 modules ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ edtf)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/datatypes/edtf.htm
const edtf_namespaceObject = "templates/views/components/datatypes/edtf.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/edtf.js


var edtf_name = 'edtf-datatype-config';
var viewModel = function viewModel(params) {
  var self = this;
  this.config = params.config;
  this.search = params.search;
  if (this.search) {
    var filter = params.filterValue();
    this.node = params.node;
    this.op = knockout_latest_default().observable(filter.op || 'overlaps');
    this.searchValue = knockout_latest_default().observable(filter.val || '');
    this.filterValue = knockout_latest_default().computed(function () {
      return {
        op: self.op(),
        val: self.searchValue()
      };
    }).extend({
      throttle: 750
    });
    params.filterValue(this.filterValue());
    this.filterValue.subscribe(function (val) {
      params.filterValue(val);
    });
  }
};
knockout_latest_default().components.register(edtf_name, {
  viewModel: viewModel,
  template: edtf_namespaceObject
});
/* harmony default export */ const edtf = (edtf_name);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZGE4YzgyOTYxODJhZjRhNjkwZWEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDdUQ7QUFHakYsSUFBSUUsU0FBSSxHQUFHLHNCQUFzQjtBQUNqQyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQy9CLElBQUlDLElBQUksR0FBRyxJQUFJO0VBRWYsSUFBSSxDQUFDQyxNQUFNLEdBQUdGLE1BQU0sQ0FBQ0UsTUFBTTtFQUMzQixJQUFJLENBQUNDLE1BQU0sR0FBR0gsTUFBTSxDQUFDRyxNQUFNO0VBQzNCLElBQUksSUFBSSxDQUFDQSxNQUFNLEVBQUU7SUFDYixJQUFJQyxNQUFNLEdBQUdKLE1BQU0sQ0FBQ0ssV0FBVyxDQUFDLENBQUM7SUFDakMsSUFBSSxDQUFDQyxJQUFJLEdBQUdOLE1BQU0sQ0FBQ00sSUFBSTtJQUN2QixJQUFJLENBQUNDLEVBQUUsR0FBR1gsb0NBQWEsQ0FBQ1EsTUFBTSxDQUFDRyxFQUFFLElBQUksVUFBVSxDQUFDO0lBQ2hELElBQUksQ0FBQ0UsV0FBVyxHQUFHYixvQ0FBYSxDQUFDUSxNQUFNLENBQUNNLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDbEQsSUFBSSxDQUFDTCxXQUFXLEdBQUdULGtDQUFXLENBQUMsWUFBVztNQUN0QyxPQUFPO1FBQ0hXLEVBQUUsRUFBRU4sSUFBSSxDQUFDTSxFQUFFLENBQUMsQ0FBQztRQUNiRyxHQUFHLEVBQUVULElBQUksQ0FBQ1EsV0FBVyxDQUFDO01BQzFCLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQ0csTUFBTSxDQUFDO01BQUVDLFFBQVEsRUFBRTtJQUFJLENBQUMsQ0FBQztJQUM1QmIsTUFBTSxDQUFDSyxXQUFXLENBQUMsSUFBSSxDQUFDQSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUksQ0FBQ0EsV0FBVyxDQUFDUyxTQUFTLENBQUMsVUFBU0osR0FBRyxFQUFFO01BQ3JDVixNQUFNLENBQUNLLFdBQVcsQ0FBQ0ssR0FBRyxDQUFDO0lBQzNCLENBQUMsQ0FBQztFQUNOO0FBQ0osQ0FBQztBQUVEZCxvQ0FBYSxDQUFDb0IsUUFBUSxDQUFDbEIsU0FBSSxFQUFFO0VBQ3pCQyxTQUFTLEVBQUVBLFNBQVM7RUFDcEJrQixRQUFRLEVBQUVwQixvQkFBb0JBO0FBQ2xDLENBQUMsQ0FBQztBQUVGLDJDQUFlQyxTQUFJLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL2RhdGF0eXBlcy9lZHRmLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgZWR0ZkRhdGF0eXBlVGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvZGF0YXR5cGVzL2VkdGYuaHRtJztcblxuXG52YXIgbmFtZSA9ICdlZHRmLWRhdGF0eXBlLWNvbmZpZyc7XG5jb25zdCB2aWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuICAgIHRoaXMuY29uZmlnID0gcGFyYW1zLmNvbmZpZztcbiAgICB0aGlzLnNlYXJjaCA9IHBhcmFtcy5zZWFyY2g7XG4gICAgaWYgKHRoaXMuc2VhcmNoKSB7XG4gICAgICAgIHZhciBmaWx0ZXIgPSBwYXJhbXMuZmlsdGVyVmFsdWUoKTtcbiAgICAgICAgdGhpcy5ub2RlID0gcGFyYW1zLm5vZGU7XG4gICAgICAgIHRoaXMub3AgPSBrby5vYnNlcnZhYmxlKGZpbHRlci5vcCB8fCAnb3ZlcmxhcHMnKTtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9IGtvLm9ic2VydmFibGUoZmlsdGVyLnZhbCB8fCAnJyk7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb3A6IHNlbGYub3AoKSxcbiAgICAgICAgICAgICAgICB2YWw6IHNlbGYuc2VhcmNoVmFsdWUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkuZXh0ZW5kKHsgdGhyb3R0bGU6IDc1MCB9KTtcbiAgICAgICAgcGFyYW1zLmZpbHRlclZhbHVlKHRoaXMuZmlsdGVyVmFsdWUoKSk7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgcGFyYW1zLmZpbHRlclZhbHVlKHZhbCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmtvLmNvbXBvbmVudHMucmVnaXN0ZXIobmFtZSwge1xuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiBlZHRmRGF0YXR5cGVUZW1wbGF0ZSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBuYW1lO1xuIl0sIm5hbWVzIjpbImtvIiwiZWR0ZkRhdGF0eXBlVGVtcGxhdGUiLCJuYW1lIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsImNvbmZpZyIsInNlYXJjaCIsImZpbHRlciIsImZpbHRlclZhbHVlIiwibm9kZSIsIm9wIiwib2JzZXJ2YWJsZSIsInNlYXJjaFZhbHVlIiwidmFsIiwiY29tcHV0ZWQiLCJleHRlbmQiLCJ0aHJvdHRsZSIsInN1YnNjcmliZSIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=