"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[96087],{

/***/ 96087:
/*!************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/number.js + 1 modules ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ number)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/datatypes/number.htm
const number_namespaceObject = "templates/views/components/datatypes/number.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/number.js


var number_name = 'number-datatype-config';
var viewModel = function viewModel(params) {
  var self = this;
  this.search = params.search;
  if (this.search) {
    var filter = params.filterValue();
    this.node = params.node;
    this.op = knockout_latest_default().observable(filter.op || 'eq');
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
knockout_latest_default().components.register(number_name, {
  viewModel: viewModel,
  template: number_namespaceObject
});
/* harmony default export */ const number = (number_name);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNWU2ZmMzYjM5NmYwYmNhMDY2ZjMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDMkQ7QUFHckYsSUFBSUUsV0FBSSxHQUFHLHdCQUF3QjtBQUNuQyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQy9CLElBQUlDLElBQUksR0FBRyxJQUFJO0VBQ2YsSUFBSSxDQUFDQyxNQUFNLEdBQUdGLE1BQU0sQ0FBQ0UsTUFBTTtFQUUzQixJQUFJLElBQUksQ0FBQ0EsTUFBTSxFQUFFO0lBQ2IsSUFBSUMsTUFBTSxHQUFHSCxNQUFNLENBQUNJLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQ0MsSUFBSSxHQUFHTCxNQUFNLENBQUNLLElBQUk7SUFDdkIsSUFBSSxDQUFDQyxFQUFFLEdBQUdWLG9DQUFhLENBQUNPLE1BQU0sQ0FBQ0csRUFBRSxJQUFJLElBQUksQ0FBQztJQUMxQyxJQUFJLENBQUNFLFdBQVcsR0FBR1osb0NBQWEsQ0FBQ08sTUFBTSxDQUFDTSxHQUFHLElBQUksRUFBRSxDQUFDO0lBQ2xELElBQUksQ0FBQ0wsV0FBVyxHQUFHUixrQ0FBVyxDQUFDLFlBQVc7TUFDdEMsT0FBTztRQUNIVSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFBRSxDQUFDLENBQUM7UUFDYkcsR0FBRyxFQUFFUixJQUFJLENBQUNPLFdBQVcsQ0FBQztNQUMxQixDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUNHLE1BQU0sQ0FBQztNQUFFQyxRQUFRLEVBQUU7SUFBSSxDQUFDLENBQUM7SUFDNUJaLE1BQU0sQ0FBQ0ksV0FBVyxDQUFDLElBQUksQ0FBQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUNBLFdBQVcsQ0FBQ1MsU0FBUyxDQUFDLFVBQVNKLEdBQUcsRUFBRTtNQUNyQ1QsTUFBTSxDQUFDSSxXQUFXLENBQUNLLEdBQUcsQ0FBQztJQUMzQixDQUFDLENBQUM7RUFDTjtBQUNKLENBQUM7QUFFRGIsb0NBQWEsQ0FBQ21CLFFBQVEsQ0FBQ2pCLFdBQUksRUFBRTtFQUN6QkMsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCaUIsUUFBUSxFQUFFbkIsc0JBQXNCQTtBQUNwQyxDQUFDLENBQUM7QUFFRiw2Q0FBZUMsV0FBSSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9kYXRhdHlwZXMvbnVtYmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tIFwia25vY2tvdXRcIjtcbmltcG9ydCBudW1iZXJEYXRhdHlwZVRlbXBsYXRlIGZyb20gXCJ0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy9kYXRhdHlwZXMvbnVtYmVyLmh0bVwiO1xuXG5cbnZhciBuYW1lID0gJ251bWJlci1kYXRhdHlwZS1jb25maWcnO1xuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuc2VhcmNoID0gcGFyYW1zLnNlYXJjaDtcbiAgICAgICAgXG4gICAgaWYgKHRoaXMuc2VhcmNoKSB7XG4gICAgICAgIHZhciBmaWx0ZXIgPSBwYXJhbXMuZmlsdGVyVmFsdWUoKTtcbiAgICAgICAgdGhpcy5ub2RlID0gcGFyYW1zLm5vZGU7XG4gICAgICAgIHRoaXMub3AgPSBrby5vYnNlcnZhYmxlKGZpbHRlci5vcCB8fCAnZXEnKTtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9IGtvLm9ic2VydmFibGUoZmlsdGVyLnZhbCB8fCAnJyk7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb3A6IHNlbGYub3AoKSxcbiAgICAgICAgICAgICAgICB2YWw6IHNlbGYuc2VhcmNoVmFsdWUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkuZXh0ZW5kKHsgdGhyb3R0bGU6IDc1MCB9KTtcbiAgICAgICAgcGFyYW1zLmZpbHRlclZhbHVlKHRoaXMuZmlsdGVyVmFsdWUoKSk7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgcGFyYW1zLmZpbHRlclZhbHVlKHZhbCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmtvLmNvbXBvbmVudHMucmVnaXN0ZXIobmFtZSwge1xuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiBudW1iZXJEYXRhdHlwZVRlbXBsYXRlLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG5hbWU7XG4iXSwibmFtZXMiOlsia28iLCJudW1iZXJEYXRhdHlwZVRlbXBsYXRlIiwibmFtZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsInNlbGYiLCJzZWFyY2giLCJmaWx0ZXIiLCJmaWx0ZXJWYWx1ZSIsIm5vZGUiLCJvcCIsIm9ic2VydmFibGUiLCJzZWFyY2hWYWx1ZSIsInZhbCIsImNvbXB1dGVkIiwiZXh0ZW5kIiwidGhyb3R0bGUiLCJzdWJzY3JpYmUiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ0ZW1wbGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9