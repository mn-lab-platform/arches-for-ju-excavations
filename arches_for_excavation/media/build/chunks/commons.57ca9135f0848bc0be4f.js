"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[56120],{

/***/ 56120:
/*!**********************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/remote-domain-widget.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var viewmodels_domain_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! viewmodels/domain-widget */ 33257);




/**
* A viewmodel used for remote domain widgets
*
* @constructor
* @name RemoteDomainWidgetViewModel
*
* @param  {string} params - a configuration object
*/
var RemoteDomainWidgetViewModel = function RemoteDomainWidgetViewModel(params) {
  var self = this;
  params.configKeys = underscore__WEBPACK_IMPORTED_MODULE_1___default().union(['options', 'url'], params.configKeys);
  viewmodels_domain_widget__WEBPACK_IMPORTED_MODULE_2__["default"].apply(this, [params]);

  // to be used in widgets/extended view models to prep data for select
  var prepData = typeof params.prepData === 'function' ? params.prepData : function (data) {
    return data;
  };
  var getOptions = function getOptions(url) {
    if (url) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        url: url,
        dataType: 'json'
      }).done(function (data) {
        self.options(prepData(data));
      });
    }
  };
  this.url.subscribe(getOptions);
  getOptions(this.url());
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RemoteDomainWidgetViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNTdjYTkxMzVmMDg0OGJjMGJlNGYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0k7QUFDa0M7O0FBRzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJRywyQkFBMkIsR0FBRyxTQUE5QkEsMkJBQTJCQSxDQUFZQyxNQUFNLEVBQUU7RUFDL0MsSUFBSUMsSUFBSSxHQUFHLElBQUk7RUFFZkQsTUFBTSxDQUFDRSxVQUFVLEdBQUdMLHVEQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUVHLE1BQU0sQ0FBQ0UsVUFBVSxDQUFDO0VBRWxFSixnRUFBcUIsQ0FBQ00sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDSixNQUFNLENBQUMsQ0FBQzs7RUFFM0M7RUFDQSxJQUFJSyxRQUFRLEdBQUcsT0FBT0wsTUFBTSxDQUFDSyxRQUFRLEtBQUssVUFBVSxHQUNoREwsTUFBTSxDQUFDSyxRQUFRLEdBQ2YsVUFBU0MsSUFBSSxFQUFFO0lBQUUsT0FBT0EsSUFBSTtFQUFFLENBQUM7RUFFbkMsSUFBSUMsVUFBVSxHQUFHLFNBQWJBLFVBQVVBLENBQVlDLEdBQUcsRUFBRTtJQUMzQixJQUFJQSxHQUFHLEVBQUU7TUFDTFosa0RBQU0sQ0FBQztRQUNIWSxHQUFHLEVBQUVBLEdBQUc7UUFDUkUsUUFBUSxFQUFFO01BQ2QsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxVQUFTTCxJQUFJLEVBQUU7UUFDbkJMLElBQUksQ0FBQ1csT0FBTyxDQUFDUCxRQUFRLENBQUNDLElBQUksQ0FBQyxDQUFDO01BQ2hDLENBQUMsQ0FBQztJQUNOO0VBQ0osQ0FBQztFQUVELElBQUksQ0FBQ0UsR0FBRyxDQUFDSyxTQUFTLENBQUNOLFVBQVUsQ0FBQztFQUM5QkEsVUFBVSxDQUFDLElBQUksQ0FBQ0MsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsaUVBQWVULDJCQUEyQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld21vZGVscy9yZW1vdGUtZG9tYWluLXdpZGdldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgRG9tYWluV2lkZ2V0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvZG9tYWluLXdpZGdldCc7XG5cblxuLyoqXG4qIEEgdmlld21vZGVsIHVzZWQgZm9yIHJlbW90ZSBkb21haW4gd2lkZ2V0c1xuKlxuKiBAY29uc3RydWN0b3JcbiogQG5hbWUgUmVtb3RlRG9tYWluV2lkZ2V0Vmlld01vZGVsXG4qXG4qIEBwYXJhbSAge3N0cmluZ30gcGFyYW1zIC0gYSBjb25maWd1cmF0aW9uIG9iamVjdFxuKi9cbnZhciBSZW1vdGVEb21haW5XaWRnZXRWaWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBwYXJhbXMuY29uZmlnS2V5cyA9IF8udW5pb24oWydvcHRpb25zJywgJ3VybCddLCBwYXJhbXMuY29uZmlnS2V5cyk7XG5cbiAgICBEb21haW5XaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgLy8gdG8gYmUgdXNlZCBpbiB3aWRnZXRzL2V4dGVuZGVkIHZpZXcgbW9kZWxzIHRvIHByZXAgZGF0YSBmb3Igc2VsZWN0XG4gICAgdmFyIHByZXBEYXRhID0gdHlwZW9mIHBhcmFtcy5wcmVwRGF0YSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgIHBhcmFtcy5wcmVwRGF0YSA6XG4gICAgICAgIGZ1bmN0aW9uKGRhdGEpIHsgcmV0dXJuIGRhdGE7IH07XG5cbiAgICB2YXIgZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucyhwcmVwRGF0YShkYXRhKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnVybC5zdWJzY3JpYmUoZ2V0T3B0aW9ucyk7XG4gICAgZ2V0T3B0aW9ucyh0aGlzLnVybCgpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlbW90ZURvbWFpbldpZGdldFZpZXdNb2RlbDtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsIkRvbWFpbldpZGdldFZpZXdNb2RlbCIsIlJlbW90ZURvbWFpbldpZGdldFZpZXdNb2RlbCIsInBhcmFtcyIsInNlbGYiLCJjb25maWdLZXlzIiwidW5pb24iLCJhcHBseSIsInByZXBEYXRhIiwiZGF0YSIsImdldE9wdGlvbnMiLCJ1cmwiLCJhamF4IiwiZGF0YVR5cGUiLCJkb25lIiwib3B0aW9ucyIsInN1YnNjcmliZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9