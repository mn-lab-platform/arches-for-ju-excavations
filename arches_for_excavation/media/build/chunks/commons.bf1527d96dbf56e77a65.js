"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[29986],{

/***/ 29986:
/*!***************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/file-list.js + 1 modules ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ file_list)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/datatypes/file-list.htm
const file_list_namespaceObject = "templates/views/components/datatypes/file-list.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/file-list.js



var file_list_name = 'file-list-datatype-config';
var viewModel = function viewModel(params) {
  var self = this;
  this.config = params.config;
  this.search = params.search;
  if (this.search) {
    var filter = params.filterValue();
    this.op = knockout_latest_default().observable(filter.op || '~');
    this.node = params.node;
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
  } else {
    this.maxFiles = knockout_latest_default().observable(params.config.maxFiles());
    this.maxFiles.subscribe(function (val) {
      var int = parseInt(val);
      if (int > 0) {
        params.config.maxFiles(int);
      } else {
        self.maxFiles(1);
      }
    });
    this.imagesOnly = params.config.imagesOnly;
    params.config.maxFiles.subscribe(function (val) {
      return self.maxFiles(val);
    });
    this.activated = params.config.activateMax;
  }
};
knockout_latest_default().components.register(file_list_name, {
  viewModel: viewModel,
  template: file_list_namespaceObject
});
/* harmony default export */ const file_list = (file_list_name);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYmYxNTI3ZDk2ZGJmNTZlNzdhNjUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNDO0FBQytEO0FBRzFGLElBQUlHLGNBQUksR0FBRywyQkFBMkI7QUFDdEMsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQVlDLE1BQU0sRUFBRTtFQUMvQixJQUFNQyxJQUFJLEdBQUcsSUFBSTtFQUNqQixJQUFJLENBQUNDLE1BQU0sR0FBR0YsTUFBTSxDQUFDRSxNQUFNO0VBQzNCLElBQUksQ0FBQ0MsTUFBTSxHQUFHSCxNQUFNLENBQUNHLE1BQU07RUFFM0IsSUFBSSxJQUFJLENBQUNBLE1BQU0sRUFBRTtJQUNiLElBQUlDLE1BQU0sR0FBR0osTUFBTSxDQUFDSyxXQUFXLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUNDLEVBQUUsR0FBR1gsb0NBQWEsQ0FBQ1MsTUFBTSxDQUFDRSxFQUFFLElBQUksR0FBRyxDQUFDO0lBQ3pDLElBQUksQ0FBQ0UsSUFBSSxHQUFHUixNQUFNLENBQUNRLElBQUk7SUFDdkIsSUFBSSxDQUFDQyxXQUFXLEdBQUdkLG9DQUFhLENBQUNTLE1BQU0sQ0FBQ00sR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUNsRCxJQUFJLENBQUNMLFdBQVcsR0FBR1Ysa0NBQVcsQ0FBQyxZQUFXO01BQ3RDLE9BQU87UUFDSFcsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBQUUsQ0FBQyxDQUFDO1FBQ2JJLEdBQUcsRUFBRVQsSUFBSSxDQUFDUSxXQUFXLENBQUM7TUFDMUIsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDRyxNQUFNLENBQUM7TUFBRUMsUUFBUSxFQUFFO0lBQUksQ0FBQyxDQUFDO0lBQzVCYixNQUFNLENBQUNLLFdBQVcsQ0FBQyxJQUFJLENBQUNBLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsSUFBSSxDQUFDQSxXQUFXLENBQUNTLFNBQVMsQ0FBQyxVQUFTSixHQUFHLEVBQUU7TUFDckNWLE1BQU0sQ0FBQ0ssV0FBVyxDQUFDSyxHQUFHLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxNQUFNO0lBQ0gsSUFBSSxDQUFDSyxRQUFRLEdBQUdwQixvQ0FBYSxDQUFDSyxNQUFNLENBQUNFLE1BQU0sQ0FBQ2EsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN2RCxJQUFJLENBQUNBLFFBQVEsQ0FBQ0QsU0FBUyxDQUFDLFVBQVNKLEdBQUcsRUFBRTtNQUNsQyxJQUFJTSxHQUFHLEdBQUdDLFFBQVEsQ0FBQ1AsR0FBRyxDQUFDO01BQ3ZCLElBQUdNLEdBQUcsR0FBRyxDQUFDLEVBQUU7UUFBRWhCLE1BQU0sQ0FBQ0UsTUFBTSxDQUFDYSxRQUFRLENBQUNDLEdBQUcsQ0FBQztNQUFFLENBQUMsTUFDdkM7UUFBRWYsSUFBSSxDQUFDYyxRQUFRLENBQUMsQ0FBQyxDQUFDO01BQUU7SUFDN0IsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDRyxVQUFVLEdBQUdsQixNQUFNLENBQUNFLE1BQU0sQ0FBQ2dCLFVBQVU7SUFDMUNsQixNQUFNLENBQUNFLE1BQU0sQ0FBQ2EsUUFBUSxDQUFDRCxTQUFTLENBQUMsVUFBQ0osR0FBRztNQUFBLE9BQUtULElBQUksQ0FBQ2MsUUFBUSxDQUFDTCxHQUFHLENBQUM7SUFBQSxFQUFDO0lBQzdELElBQUksQ0FBQ1MsU0FBUyxHQUFHbkIsTUFBTSxDQUFDRSxNQUFNLENBQUNrQixXQUFXO0VBQzlDO0FBQ0osQ0FBQztBQUVEekIsb0NBQWEsQ0FBQzJCLFFBQVEsQ0FBQ3hCLGNBQUksRUFBRTtFQUN6QkMsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCd0IsUUFBUSxFQUFFMUIseUJBQXdCQTtBQUN0QyxDQUFDLENBQUM7QUFFRixnREFBZUMsY0FBSSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9kYXRhdHlwZXMvZmlsZS1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tIFwia25vY2tvdXRcIjtcbmltcG9ydCBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XG5pbXBvcnQgZmlsZUxpc3REYXRhdHlwZVRlbXBsYXRlIGZyb20gXCJ0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy9kYXRhdHlwZXMvZmlsZS1saXN0Lmh0bVwiO1xuXG5cbnZhciBuYW1lID0gJ2ZpbGUtbGlzdC1kYXRhdHlwZS1jb25maWcnO1xuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5jb25maWcgPSBwYXJhbXMuY29uZmlnO1xuICAgIHRoaXMuc2VhcmNoID0gcGFyYW1zLnNlYXJjaDtcblxuICAgIGlmICh0aGlzLnNlYXJjaCkge1xuICAgICAgICB2YXIgZmlsdGVyID0gcGFyYW1zLmZpbHRlclZhbHVlKCk7XG4gICAgICAgIHRoaXMub3AgPSBrby5vYnNlcnZhYmxlKGZpbHRlci5vcCB8fCAnficpO1xuICAgICAgICB0aGlzLm5vZGUgPSBwYXJhbXMubm9kZTtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9IGtvLm9ic2VydmFibGUoZmlsdGVyLnZhbCB8fCAnJyk7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb3A6IHNlbGYub3AoKSxcbiAgICAgICAgICAgICAgICB2YWw6IHNlbGYuc2VhcmNoVmFsdWUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkuZXh0ZW5kKHsgdGhyb3R0bGU6IDc1MCB9KTtcbiAgICAgICAgcGFyYW1zLmZpbHRlclZhbHVlKHRoaXMuZmlsdGVyVmFsdWUoKSk7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgcGFyYW1zLmZpbHRlclZhbHVlKHZhbCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWF4RmlsZXMgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5jb25maWcubWF4RmlsZXMoKSk7XG4gICAgICAgIHRoaXMubWF4RmlsZXMuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgdmFyIGludCA9IHBhcnNlSW50KHZhbCk7XG4gICAgICAgICAgICBpZihpbnQgPiAwKSB7IHBhcmFtcy5jb25maWcubWF4RmlsZXMoaW50KTsgfVxuICAgICAgICAgICAgZWxzZSB7IHNlbGYubWF4RmlsZXMoMSk7IH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbWFnZXNPbmx5ID0gcGFyYW1zLmNvbmZpZy5pbWFnZXNPbmx5O1xuICAgICAgICBwYXJhbXMuY29uZmlnLm1heEZpbGVzLnN1YnNjcmliZSgodmFsKSA9PiBzZWxmLm1heEZpbGVzKHZhbCkpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZCA9IHBhcmFtcy5jb25maWcuYWN0aXZhdGVNYXg7XG4gICAgfVxufTtcblxua28uY29tcG9uZW50cy5yZWdpc3RlcihuYW1lLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IGZpbGVMaXN0RGF0YXR5cGVUZW1wbGF0ZSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBuYW1lO1xuIl0sIm5hbWVzIjpbImtvIiwiXyIsImZpbGVMaXN0RGF0YXR5cGVUZW1wbGF0ZSIsIm5hbWUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwiY29uZmlnIiwic2VhcmNoIiwiZmlsdGVyIiwiZmlsdGVyVmFsdWUiLCJvcCIsIm9ic2VydmFibGUiLCJub2RlIiwic2VhcmNoVmFsdWUiLCJ2YWwiLCJjb21wdXRlZCIsImV4dGVuZCIsInRocm90dGxlIiwic3Vic2NyaWJlIiwibWF4RmlsZXMiLCJpbnQiLCJwYXJzZUludCIsImltYWdlc09ubHkiLCJhY3RpdmF0ZWQiLCJhY3RpdmF0ZU1heCIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=