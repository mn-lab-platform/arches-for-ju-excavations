"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[66031],{

/***/ 66031:
/*!**************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/models/tile.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var models_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/abstract */ 47797);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (models_abstract__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
  url: arches__WEBPACK_IMPORTED_MODULE_0__["default"].urls.tile,
  defaults: {
    tileid: '',
    data: '',
    nodegroup_id: '',
    parenttile_id: '',
    resourceinstance_id: ''
  },
  save: function save(callback, scope, fd) {
    fd || (fd = new FormData());
    delete fd.data;
    fd.append('data', JSON.stringify(this.toJSON()));
    var method = 'POST';
    return this._doRequest({
      type: method,
      processData: false,
      contentType: false,
      url: this._getURL(method),
      data: fd
    }, callback, scope, 'save');
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNzU2NWMzNjEwZGI3YzZkNTMzYWEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTRCO0FBQ2dCO0FBRTVDLGlFQUFlQyx1REFBYSxDQUFDQyxNQUFNLENBQUM7RUFDaENDLEdBQUcsRUFBRUgsOENBQU0sQ0FBQ0ksSUFBSSxDQUFDQyxJQUFJO0VBRXJCQyxRQUFRLEVBQUU7SUFDTkMsTUFBTSxFQUFFLEVBQUU7SUFDVkMsSUFBSSxFQUFFLEVBQUU7SUFDUkMsWUFBWSxFQUFFLEVBQUU7SUFDaEJDLGFBQWEsRUFBRSxFQUFFO0lBQ2pCQyxtQkFBbUIsRUFBRTtFQUN6QixDQUFDO0VBRURDLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFZQyxRQUFRLEVBQUVDLEtBQUssRUFBRUMsRUFBRSxFQUFFO0lBQ2pDQSxFQUFFLEtBQUtBLEVBQUUsR0FBRyxJQUFJQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzNCLE9BQU9ELEVBQUUsQ0FBQ1AsSUFBSTtJQUNkTyxFQUFFLENBQUNFLE1BQU0sQ0FBQyxNQUFNLEVBQUVDLElBQUksQ0FBQ0MsU0FBUyxDQUFDLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELElBQU1DLE1BQU0sR0FBRyxNQUFNO0lBQ3JCLE9BQU8sSUFBSSxDQUFDQyxVQUFVLENBQUM7TUFDbkJDLElBQUksRUFBRUYsTUFBTTtNQUNaRyxXQUFXLEVBQUUsS0FBSztNQUNsQkMsV0FBVyxFQUFFLEtBQUs7TUFDbEJ0QixHQUFHLEVBQUUsSUFBSSxDQUFDdUIsT0FBTyxDQUFDTCxNQUFNLENBQUM7TUFDekJiLElBQUksRUFBRU87SUFDVixDQUFDLEVBQUVGLFFBQVEsRUFBRUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztFQUMvQjtBQUNKLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvbW9kZWxzL3RpbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IEFic3RyYWN0TW9kZWwgZnJvbSAnbW9kZWxzL2Fic3RyYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3RNb2RlbC5leHRlbmQoe1xuICAgIHVybDogYXJjaGVzLnVybHMudGlsZSxcblxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHRpbGVpZDogJycsXG4gICAgICAgIGRhdGE6ICcnLFxuICAgICAgICBub2RlZ3JvdXBfaWQ6ICcnLFxuICAgICAgICBwYXJlbnR0aWxlX2lkOiAnJyxcbiAgICAgICAgcmVzb3VyY2VpbnN0YW5jZV9pZDogJydcbiAgICB9LFxuXG4gICAgc2F2ZTogZnVuY3Rpb24gKGNhbGxiYWNrLCBzY29wZSwgZmQpIHtcbiAgICAgICAgZmQgfHwgKGZkID0gbmV3IEZvcm1EYXRhKCkpO1xuICAgICAgICBkZWxldGUgZmQuZGF0YTtcbiAgICAgICAgZmQuYXBwZW5kKCdkYXRhJywgSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSkpO1xuICAgICAgICBjb25zdCBtZXRob2QgPSAnUE9TVCc7XG4gICAgICAgIHJldHVybiB0aGlzLl9kb1JlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogbWV0aG9kLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgdXJsOiB0aGlzLl9nZXRVUkwobWV0aG9kKSxcbiAgICAgICAgICAgIGRhdGE6IGZkXG4gICAgICAgIH0sIGNhbGxiYWNrLCBzY29wZSwgJ3NhdmUnKTtcbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6WyJhcmNoZXMiLCJBYnN0cmFjdE1vZGVsIiwiZXh0ZW5kIiwidXJsIiwidXJscyIsInRpbGUiLCJkZWZhdWx0cyIsInRpbGVpZCIsImRhdGEiLCJub2RlZ3JvdXBfaWQiLCJwYXJlbnR0aWxlX2lkIiwicmVzb3VyY2VpbnN0YW5jZV9pZCIsInNhdmUiLCJjYWxsYmFjayIsInNjb3BlIiwiZmQiLCJGb3JtRGF0YSIsImFwcGVuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0b0pTT04iLCJtZXRob2QiLCJfZG9SZXF1ZXN0IiwidHlwZSIsInByb2Nlc3NEYXRhIiwiY29udGVudFR5cGUiLCJfZ2V0VVJMIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=