"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[10359],{

/***/ 10359:
/*!*****************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/models/concept.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var models_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/abstract */ 47797);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (models_abstract__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
  url: arches__WEBPACK_IMPORTED_MODULE_0__["default"].urls.concept,
  defaults: {
    'id': '',
    'legacyoid': '',
    'nodetype': '',
    'relationshiptype': '',
    'values': [],
    'subconcepts': [],
    'parentconcepts': [],
    'relatedconcepts': []
  },
  reset: function reset() {
    var id = this.get('id');
    var legacyoid = this.get('legacyoid');
    var nodetype = this.get('nodetype');
    this.clear();
    this.set('id', id);
    this.set('legacyoid', legacyoid);
    this.set('nodetype', nodetype);
  },
  makeCollection: function makeCollection(callback, scope) {
    return this._doRequest({
      type: 'GET',
      url: arches__WEBPACK_IMPORTED_MODULE_0__["default"].urls.concept_make_collection.replace('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', this.get('id')),
      data: {}
    }, callback, scope, 'collection_created');
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZDAxZWI4NDk4NGJiZDdkMGM0OTcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTRCO0FBQ2dCO0FBRTVDLGlFQUFlQyx1REFBYSxDQUFDQyxNQUFNLENBQUM7RUFDaENDLEdBQUcsRUFBRUgsOENBQU0sQ0FBQ0ksSUFBSSxDQUFDQyxPQUFPO0VBRXhCQyxRQUFRLEVBQUU7SUFDTixJQUFJLEVBQUUsRUFBRTtJQUNSLFdBQVcsRUFBRSxFQUFFO0lBQ2YsVUFBVSxFQUFFLEVBQUU7SUFDZCxrQkFBa0IsRUFBRSxFQUFFO0lBQ3RCLFFBQVEsRUFBRSxFQUFFO0lBQ1osYUFBYSxFQUFFLEVBQUU7SUFDakIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixpQkFBaUIsRUFBRTtFQUN2QixDQUFDO0VBRURDLEtBQUssRUFBRSxTQUFQQSxLQUFLQSxDQUFBLEVBQWM7SUFDZixJQUFJQyxFQUFFLEdBQUcsSUFBSSxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLElBQUlDLFNBQVMsR0FBRyxJQUFJLENBQUNELEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDckMsSUFBSUUsUUFBUSxHQUFHLElBQUksQ0FBQ0YsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNuQyxJQUFJLENBQUNHLEtBQUssQ0FBQyxDQUFDO0lBQ1osSUFBSSxDQUFDQyxHQUFHLENBQUMsSUFBSSxFQUFFTCxFQUFFLENBQUM7SUFDbEIsSUFBSSxDQUFDSyxHQUFHLENBQUMsV0FBVyxFQUFFSCxTQUFTLENBQUM7SUFDaEMsSUFBSSxDQUFDRyxHQUFHLENBQUMsVUFBVSxFQUFFRixRQUFRLENBQUM7RUFDbEMsQ0FBQztFQUVERyxjQUFjLEVBQUUsU0FBaEJBLGNBQWNBLENBQVlDLFFBQVEsRUFBRUMsS0FBSyxFQUFFO0lBQ3ZDLE9BQU8sSUFBSSxDQUFDQyxVQUFVLENBQUM7TUFDbkJDLElBQUksRUFBRSxLQUFLO01BQ1hmLEdBQUcsRUFBRUgsOENBQU0sQ0FBQ0ksSUFBSSxDQUFDZSx1QkFBdUIsQ0FBQ0MsT0FBTyxDQUFDLHNDQUFzQyxFQUFFLElBQUksQ0FBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO01BQ3hHWSxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsRUFBRU4sUUFBUSxFQUFFQyxLQUFLLEVBQUUsb0JBQW9CLENBQUM7RUFDN0M7QUFDSixDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL21vZGVscy9jb25jZXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBBYnN0cmFjdE1vZGVsIGZyb20gJ21vZGVscy9hYnN0cmFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0TW9kZWwuZXh0ZW5kKHtcbiAgICB1cmw6IGFyY2hlcy51cmxzLmNvbmNlcHQsXG5cbiAgICBkZWZhdWx0czoge1xuICAgICAgICAnaWQnOiAnJyxcbiAgICAgICAgJ2xlZ2FjeW9pZCc6ICcnLFxuICAgICAgICAnbm9kZXR5cGUnOiAnJyxcbiAgICAgICAgJ3JlbGF0aW9uc2hpcHR5cGUnOiAnJyxcbiAgICAgICAgJ3ZhbHVlcyc6IFtdLFxuICAgICAgICAnc3ViY29uY2VwdHMnOiBbXSxcbiAgICAgICAgJ3BhcmVudGNvbmNlcHRzJzogW10sXG4gICAgICAgICdyZWxhdGVkY29uY2VwdHMnOiBbXVxuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWQgPSB0aGlzLmdldCgnaWQnKTtcbiAgICAgICAgdmFyIGxlZ2FjeW9pZCA9IHRoaXMuZ2V0KCdsZWdhY3lvaWQnKTtcbiAgICAgICAgdmFyIG5vZGV0eXBlID0gdGhpcy5nZXQoJ25vZGV0eXBlJyk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zZXQoJ2lkJywgaWQpO1xuICAgICAgICB0aGlzLnNldCgnbGVnYWN5b2lkJywgbGVnYWN5b2lkKTtcbiAgICAgICAgdGhpcy5zZXQoJ25vZGV0eXBlJywgbm9kZXR5cGUpO1xuICAgIH0sXG5cbiAgICBtYWtlQ29sbGVjdGlvbjogZnVuY3Rpb24gKGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZG9SZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5jb25jZXB0X21ha2VfY29sbGVjdGlvbi5yZXBsYWNlKCdhYWFhYWFhYS1hYWFhLWFhYWEtYWFhYS1hYWFhYWFhYWFhYWEnLCB0aGlzLmdldCgnaWQnKSksXG4gICAgICAgICAgICBkYXRhOiB7fVxuICAgICAgICB9LCBjYWxsYmFjaywgc2NvcGUsICdjb2xsZWN0aW9uX2NyZWF0ZWQnKTtcbiAgICB9LFxufSk7XG4iXSwibmFtZXMiOlsiYXJjaGVzIiwiQWJzdHJhY3RNb2RlbCIsImV4dGVuZCIsInVybCIsInVybHMiLCJjb25jZXB0IiwiZGVmYXVsdHMiLCJyZXNldCIsImlkIiwiZ2V0IiwibGVnYWN5b2lkIiwibm9kZXR5cGUiLCJjbGVhciIsInNldCIsIm1ha2VDb2xsZWN0aW9uIiwiY2FsbGJhY2siLCJzY29wZSIsIl9kb1JlcXVlc3QiLCJ0eXBlIiwiY29uY2VwdF9tYWtlX2NvbGxlY3Rpb24iLCJyZXBsYWNlIiwiZGF0YSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9