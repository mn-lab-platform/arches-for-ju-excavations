"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[29156],{

/***/ 29156:
/*!******************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/map/bin-feature-collection.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var turf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! turf */ 66577);
/* harmony import */ var turf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(turf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(searchAggregations) {
  var cellWidth = arches__WEBPACK_IMPORTED_MODULE_2__["default"].hexBinSize;
  var units = 'kilometers';
  var hexGrid = (0,turf__WEBPACK_IMPORTED_MODULE_1__.hexGrid)(arches__WEBPACK_IMPORTED_MODULE_2__["default"].hexBinBounds, cellWidth, units);
  underscore__WEBPACK_IMPORTED_MODULE_3___default().each(hexGrid.features, function (feature, i) {
    feature.properties.id = i;
  });
  return knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(hexGrid);
}
;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNzcyNzQ3NjA5ODk1ODI2MGU2YWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDb0I7QUFDbEI7QUFDRDtBQUczQiw2QkFBZSxvQ0FBU0ssa0JBQWtCLEVBQUU7RUFDeEMsSUFBSUMsU0FBUyxHQUFHSCw4Q0FBTSxDQUFDSSxVQUFVO0VBQ2pDLElBQUlDLEtBQUssR0FBRyxZQUFZO0VBQ3hCLElBQUlQLE9BQU8sR0FBR0MsNkNBQVcsQ0FBQ0MsOENBQU0sQ0FBQ00sWUFBWSxFQUFFSCxTQUFTLEVBQUVFLEtBQUssQ0FBQztFQUNoRUosc0RBQU0sQ0FBQ0gsT0FBTyxDQUFDVSxRQUFRLEVBQUUsVUFBU0MsT0FBTyxFQUFFQyxDQUFDLEVBQUU7SUFDMUNELE9BQU8sQ0FBQ0UsVUFBVSxDQUFDQyxFQUFFLEdBQUdGLENBQUM7RUFDN0IsQ0FBQyxDQUFDO0VBQ0YsT0FBT2IsMERBQWEsQ0FBQ0MsT0FBTyxDQUFDO0FBQ2pDO0FBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy9tYXAvYmluLWZlYXR1cmUtY29sbGVjdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IHsgaGV4R3JpZCBhcyB0dXJmSGV4R3JpZCB9IGZyb20gJ3R1cmYnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VhcmNoQWdncmVnYXRpb25zKSB7XG4gICAgdmFyIGNlbGxXaWR0aCA9IGFyY2hlcy5oZXhCaW5TaXplO1xuICAgIHZhciB1bml0cyA9ICdraWxvbWV0ZXJzJztcbiAgICB2YXIgaGV4R3JpZCA9IHR1cmZIZXhHcmlkKGFyY2hlcy5oZXhCaW5Cb3VuZHMsIGNlbGxXaWR0aCwgdW5pdHMpO1xuICAgIF8uZWFjaChoZXhHcmlkLmZlYXR1cmVzLCBmdW5jdGlvbihmZWF0dXJlLCBpKSB7XG4gICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5pZCA9IGk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGtvLm9ic2VydmFibGUoaGV4R3JpZCk7XG59O1xuIl0sIm5hbWVzIjpbImtvIiwiaGV4R3JpZCIsInR1cmZIZXhHcmlkIiwiYXJjaGVzIiwiXyIsInNlYXJjaEFnZ3JlZ2F0aW9ucyIsImNlbGxXaWR0aCIsImhleEJpblNpemUiLCJ1bml0cyIsImhleEJpbkJvdW5kcyIsImVhY2giLCJmZWF0dXJlcyIsImZlYXR1cmUiLCJpIiwicHJvcGVydGllcyIsImlkIiwib2JzZXJ2YWJsZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9