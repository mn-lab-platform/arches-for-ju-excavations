"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[78787],{

/***/ 78787:
/*!************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/map-report.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var viewmodels_report__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! viewmodels/report */ 95442);
/* harmony import */ var reports_map_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reports/map-header */ 3338);





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(params) {
  var self = this;
  params.configKeys = ['zoom', 'centerX', 'centerY', 'geocoder', 'basemap', 'geometryTypes', 'pitch', 'bearing', 'geocodePlaceholder'];
  viewmodels_report__WEBPACK_IMPORTED_MODULE_3__["default"].apply(this, [params]);
  this.featureCollection = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed({
    read: function read() {
      var features = [];
      knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(self.tiles).forEach(function (tile) {
        underscore__WEBPACK_IMPORTED_MODULE_0___default().each(tile.data, function (val) {
          if (val !== null && val !== void 0 && val.features) {
            features = features.concat(knockout_mapping__WEBPACK_IMPORTED_MODULE_2___default().toJS(val.features));
          }
        }, this);
      }, this);
      return {
        type: 'FeatureCollection',
        features: features
      };
    },
    write: function write() {
      return;
    }
  });
  this.featureCount = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
    var count = 0;
    knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(self.tiles).forEach(function (tile) {
      underscore__WEBPACK_IMPORTED_MODULE_0___default().each(tile.data, function (val) {
        if (val !== null && val !== void 0 && val.features) {
          count += 1;
        }
      }, this);
    }, this);
    return count;
  });
}
;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZjMwYzVkMmFhYTczMzlkOWI1NTcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTJCO0FBQ0Q7QUFDZTtBQUNPO0FBQ3BCO0FBRzVCLDZCQUFlLG9DQUFTSSxNQUFNLEVBQUU7RUFDNUIsSUFBSUMsSUFBSSxHQUFHLElBQUk7RUFDZkQsTUFBTSxDQUFDRSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixDQUFDO0VBRXBJSCx5REFBZSxDQUFDSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUNILE1BQU0sQ0FBQyxDQUFDO0VBRXJDLElBQUksQ0FBQ0ksaUJBQWlCLEdBQUdQLHdEQUFXLENBQUM7SUFDakNTLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFBLEVBQWE7TUFDYixJQUFJQyxRQUFRLEdBQUcsRUFBRTtNQUNqQlYsc0RBQVMsQ0FBQ0ksSUFBSSxDQUFDUSxLQUFLLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLFVBQVNDLElBQUksRUFBRTtRQUN6Q2Ysc0RBQU0sQ0FBQ2UsSUFBSSxDQUFDRSxJQUFJLEVBQUUsVUFBU0MsR0FBRyxFQUFFO1VBQzVCLElBQUlBLEdBQUcsYUFBSEEsR0FBRyxlQUFIQSxHQUFHLENBQUVQLFFBQVEsRUFBRTtZQUNmQSxRQUFRLEdBQUdBLFFBQVEsQ0FBQ1EsTUFBTSxDQUFDakIsNERBQWMsQ0FBQ2dCLEdBQUcsQ0FBQ1AsUUFBUSxDQUFDLENBQUM7VUFDNUQ7UUFDSixDQUFDLEVBQUUsSUFBSSxDQUFDO01BQ1osQ0FBQyxFQUFFLElBQUksQ0FBQztNQUNSLE9BQU87UUFDSFUsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QlYsUUFBUSxFQUFFQTtNQUNkLENBQUM7SUFDTCxDQUFDO0lBQ0RXLEtBQUssRUFBRSxTQUFQQSxLQUFLQSxDQUFBLEVBQWE7TUFDZDtJQUNKO0VBQ0osQ0FBQyxDQUFDO0VBRUYsSUFBSSxDQUFDQyxZQUFZLEdBQUd0Qix3REFBVyxDQUFDLFlBQVc7SUFDdkMsSUFBSXVCLEtBQUssR0FBRyxDQUFDO0lBQ2J2QixzREFBUyxDQUFDSSxJQUFJLENBQUNRLEtBQUssQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBU0MsSUFBSSxFQUFFO01BQ3pDZixzREFBTSxDQUFDZSxJQUFJLENBQUNFLElBQUksRUFBRSxVQUFTQyxHQUFHLEVBQUU7UUFDNUIsSUFBSUEsR0FBRyxhQUFIQSxHQUFHLGVBQUhBLEdBQUcsQ0FBRVAsUUFBUSxFQUFFO1VBQ2ZhLEtBQUssSUFBSSxDQUFDO1FBQ2Q7TUFDSixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNSLE9BQU9BLEtBQUs7RUFDaEIsQ0FBQyxDQUFDO0FBQ047QUFBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld21vZGVscy9tYXAtcmVwb3J0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgUmVwb3J0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvcmVwb3J0JztcbmltcG9ydCAncmVwb3J0cy9tYXAtaGVhZGVyJztcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcGFyYW1zLmNvbmZpZ0tleXMgPSBbJ3pvb20nLCAnY2VudGVyWCcsICdjZW50ZXJZJywgJ2dlb2NvZGVyJywgJ2Jhc2VtYXAnLCAnZ2VvbWV0cnlUeXBlcycsICdwaXRjaCcsICdiZWFyaW5nJywgJ2dlb2NvZGVQbGFjZWhvbGRlciddO1xuXG4gICAgUmVwb3J0Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcblxuICAgIHRoaXMuZmVhdHVyZUNvbGxlY3Rpb24gPSBrby5jb21wdXRlZCh7XG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZlYXR1cmVzID0gW107XG4gICAgICAgICAgICBrby51bndyYXAoc2VsZi50aWxlcykuZm9yRWFjaChmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRpbGUuZGF0YSwgZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWw/LmZlYXR1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlcyA9IGZlYXR1cmVzLmNvbmNhdChrb01hcHBpbmcudG9KUyh2YWwuZmVhdHVyZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICB3cml0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZmVhdHVyZUNvdW50ID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgIGtvLnVud3JhcChzZWxmLnRpbGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgICAgIF8uZWFjaCh0aWxlLmRhdGEsIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWw/LmZlYXR1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfSk7XG59O1xuIl0sIm5hbWVzIjpbIl8iLCJrbyIsImtvTWFwcGluZyIsIlJlcG9ydFZpZXdNb2RlbCIsInBhcmFtcyIsInNlbGYiLCJjb25maWdLZXlzIiwiYXBwbHkiLCJmZWF0dXJlQ29sbGVjdGlvbiIsImNvbXB1dGVkIiwicmVhZCIsImZlYXR1cmVzIiwidW53cmFwIiwidGlsZXMiLCJmb3JFYWNoIiwidGlsZSIsImVhY2giLCJkYXRhIiwidmFsIiwiY29uY2F0IiwidG9KUyIsInR5cGUiLCJ3cml0ZSIsImZlYXR1cmVDb3VudCIsImNvdW50Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=