"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[56755],{

/***/ 56755:
/*!*************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/boolean.js + 1 modules ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ datatypes_boolean)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/datatypes/boolean.htm
const boolean_namespaceObject = "templates/views/components/datatypes/boolean.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/boolean.js


var boolean_name = 'boolean-datatype-config';
var viewModel = function viewModel(params) {
  var self = this;
  var config = params.config ? params.config : params.node.config;
  this.search = params.search;
  this.graph = params.graph;
  this.trueLabel = config.trueLabel;
  this.falseLabel = config.falseLabel;
  if (this.search) {
    var filter = params.filterValue();
    this.node = params.node;
    this.searchValue = knockout_latest_default().observable(filter.val || '');
    this.filterValue = knockout_latest_default().computed(function () {
      return {
        val: self.searchValue()
      };
    });
    params.filterValue(this.filterValue());
    this.filterValue.subscribe(function (val) {
      params.filterValue(val);
    });
  }
};
knockout_latest_default().components.register(boolean_name, {
  viewModel: viewModel,
  template: boolean_namespaceObject
});
/* harmony default export */ const datatypes_boolean = (boolean_name);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNTMwYzE4NTI3OThkNjI3ZmRiYzYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDcUQ7QUFFL0UsSUFBSUUsWUFBSSxHQUFHLHlCQUF5QjtBQUVwQyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQy9CLElBQUlDLElBQUksR0FBRyxJQUFJO0VBQ2YsSUFBSUMsTUFBTSxHQUFHRixNQUFNLENBQUNFLE1BQU0sR0FBR0YsTUFBTSxDQUFDRSxNQUFNLEdBQUdGLE1BQU0sQ0FBQ0csSUFBSSxDQUFDRCxNQUFNO0VBRy9ELElBQUksQ0FBQ0UsTUFBTSxHQUFHSixNQUFNLENBQUNJLE1BQU07RUFDM0IsSUFBSSxDQUFDQyxLQUFLLEdBQUdMLE1BQU0sQ0FBQ0ssS0FBSztFQUN6QixJQUFJLENBQUNDLFNBQVMsR0FBR0osTUFBTSxDQUFDSSxTQUFTO0VBQ2pDLElBQUksQ0FBQ0MsVUFBVSxHQUFHTCxNQUFNLENBQUNLLFVBQVU7RUFFbkMsSUFBSSxJQUFJLENBQUNILE1BQU0sRUFBRTtJQUNiLElBQUlJLE1BQU0sR0FBR1IsTUFBTSxDQUFDUyxXQUFXLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUNOLElBQUksR0FBR0gsTUFBTSxDQUFDRyxJQUFJO0lBQ3ZCLElBQUksQ0FBQ08sV0FBVyxHQUFHZCxvQ0FBYSxDQUFDWSxNQUFNLENBQUNJLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDbEQsSUFBSSxDQUFDSCxXQUFXLEdBQUdiLGtDQUFXLENBQUMsWUFBVztNQUN0QyxPQUFPO1FBQ0hnQixHQUFHLEVBQUVYLElBQUksQ0FBQ1MsV0FBVyxDQUFDO01BQzFCLENBQUM7SUFDTCxDQUFDLENBQUM7SUFDRlYsTUFBTSxDQUFDUyxXQUFXLENBQUMsSUFBSSxDQUFDQSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUksQ0FBQ0EsV0FBVyxDQUFDSyxTQUFTLENBQUMsVUFBU0YsR0FBRyxFQUFFO01BQ3JDWixNQUFNLENBQUNTLFdBQVcsQ0FBQ0csR0FBRyxDQUFDO0lBQzNCLENBQUMsQ0FBQztFQUNOO0FBQ0osQ0FBQztBQUVEaEIsb0NBQWEsQ0FBQ29CLFFBQVEsQ0FBQ2xCLFlBQUksRUFBRTtFQUN6QkMsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCa0IsUUFBUSxFQUFFcEIsdUJBQWVBO0FBQzdCLENBQUMsQ0FBQztBQUVGLHdEQUFlQyxZQUFJLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL2RhdGF0eXBlcy9ib29sZWFuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgYm9vbGVhblRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2RhdGF0eXBlcy9ib29sZWFuLmh0bSc7XG5cbnZhciBuYW1lID0gJ2Jvb2xlYW4tZGF0YXR5cGUtY29uZmlnJztcblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjb25maWcgPSBwYXJhbXMuY29uZmlnID8gcGFyYW1zLmNvbmZpZyA6IHBhcmFtcy5ub2RlLmNvbmZpZztcblxuICAgICAgICBcbiAgICB0aGlzLnNlYXJjaCA9IHBhcmFtcy5zZWFyY2g7XG4gICAgdGhpcy5ncmFwaCA9IHBhcmFtcy5ncmFwaDtcbiAgICB0aGlzLnRydWVMYWJlbCA9IGNvbmZpZy50cnVlTGFiZWw7XG4gICAgdGhpcy5mYWxzZUxhYmVsID0gY29uZmlnLmZhbHNlTGFiZWw7XG5cbiAgICBpZiAodGhpcy5zZWFyY2gpIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IHBhcmFtcy5maWx0ZXJWYWx1ZSgpO1xuICAgICAgICB0aGlzLm5vZGUgPSBwYXJhbXMubm9kZTtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9IGtvLm9ic2VydmFibGUoZmlsdGVyLnZhbCB8fCAnJyk7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsOiBzZWxmLnNlYXJjaFZhbHVlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICBwYXJhbXMuZmlsdGVyVmFsdWUodGhpcy5maWx0ZXJWYWx1ZSgpKTtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZS5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBwYXJhbXMuZmlsdGVyVmFsdWUodmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxua28uY29tcG9uZW50cy5yZWdpc3RlcihuYW1lLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IGJvb2xlYW5UZW1wbGF0ZSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBuYW1lO1xuIl0sIm5hbWVzIjpbImtvIiwiYm9vbGVhblRlbXBsYXRlIiwibmFtZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsInNlbGYiLCJjb25maWciLCJub2RlIiwic2VhcmNoIiwiZ3JhcGgiLCJ0cnVlTGFiZWwiLCJmYWxzZUxhYmVsIiwiZmlsdGVyIiwiZmlsdGVyVmFsdWUiLCJzZWFyY2hWYWx1ZSIsIm9ic2VydmFibGUiLCJ2YWwiLCJjb21wdXRlZCIsInN1YnNjcmliZSIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=