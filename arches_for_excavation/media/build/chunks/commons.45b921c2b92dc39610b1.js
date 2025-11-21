"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[29487],{

/***/ 29487:
/*!****************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/concept-widget.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var viewmodels_remote_domain_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! viewmodels/remote-domain-widget */ 56120);



/**
* A viewmodel used for concept widgets
*
* @constructor
* @name ConceptWidgetViewModel
*
* @param  {string} params - a configuration object
*/

var ConceptWidgetViewModel = function ConceptWidgetViewModel(params) {
  var self = this;
  params.prepData = function (data) {
    data.forEach(function (record) {
      if (record.collector) {
        record.id = undefined;
      }
    });
    return data;
  };
  viewmodels_remote_domain_widget__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, [params]);
  var setUrl = function setUrl(id) {
    if (id) {
      self.url(arches__WEBPACK_IMPORTED_MODULE_0__["default"].urls.dropdown + '?conceptid=' + id);
    }
  };
  this.node.config.rdmCollection.subscribe(setUrl);
  setUrl(this.node.config.rdmCollection());
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConceptWidgetViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNDViOTIxYzJiOTJkYzM5NjEwYjEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTRCO0FBQzhDOztBQUcxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUlFLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQVlDLE1BQU0sRUFBRTtFQUMxQyxJQUFJQyxJQUFJLEdBQUcsSUFBSTtFQUVmRCxNQUFNLENBQUNFLFFBQVEsR0FBRyxVQUFTQyxJQUFJLEVBQUU7SUFDN0JBLElBQUksQ0FBQ0MsT0FBTyxDQUFDLFVBQVNDLE1BQU0sRUFBRTtNQUMxQixJQUFJQSxNQUFNLENBQUNDLFNBQVMsRUFBRTtRQUNsQkQsTUFBTSxDQUFDRSxFQUFFLEdBQUdDLFNBQVM7TUFDekI7SUFDSixDQUFDLENBQUM7SUFDRixPQUFPTCxJQUFJO0VBQ2YsQ0FBQztFQUVETCx1RUFBMkIsQ0FBQ1csS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDVCxNQUFNLENBQUMsQ0FBQztFQUVqRCxJQUFJVSxNQUFNLEdBQUcsU0FBVEEsTUFBTUEsQ0FBWUgsRUFBRSxFQUFFO0lBQ3RCLElBQUlBLEVBQUUsRUFBRTtNQUNKTixJQUFJLENBQUNVLEdBQUcsQ0FBQ2QsOENBQU0sQ0FBQ2UsSUFBSSxDQUFDQyxRQUFRLEdBQUcsYUFBYSxHQUFHTixFQUFFLENBQUM7SUFDdkQ7RUFDSixDQUFDO0VBRUQsSUFBSSxDQUFDTyxJQUFJLENBQUNDLE1BQU0sQ0FBQ0MsYUFBYSxDQUFDQyxTQUFTLENBQUNQLE1BQU0sQ0FBQztFQUNoREEsTUFBTSxDQUFDLElBQUksQ0FBQ0ksSUFBSSxDQUFDQyxNQUFNLENBQUNDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELGlFQUFlakIsc0JBQXNCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3bW9kZWxzL2NvbmNlcHQtd2lkZ2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBSZW1vdGVEb21haW5XaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy9yZW1vdGUtZG9tYWluLXdpZGdldCc7XG5cblxuLyoqXG4qIEEgdmlld21vZGVsIHVzZWQgZm9yIGNvbmNlcHQgd2lkZ2V0c1xuKlxuKiBAY29uc3RydWN0b3JcbiogQG5hbWUgQ29uY2VwdFdpZGdldFZpZXdNb2RlbFxuKlxuKiBAcGFyYW0gIHtzdHJpbmd9IHBhcmFtcyAtIGEgY29uZmlndXJhdGlvbiBvYmplY3RcbiovXG5cbnZhciBDb25jZXB0V2lkZ2V0Vmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgcGFyYW1zLnByZXBEYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24ocmVjb3JkKSB7XG4gICAgICAgICAgICBpZiAocmVjb3JkLmNvbGxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJlY29yZC5pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG5cbiAgICBSZW1vdGVEb21haW5XaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgdmFyIHNldFVybCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgc2VsZi51cmwoYXJjaGVzLnVybHMuZHJvcGRvd24gKyAnP2NvbmNlcHRpZD0nICsgaWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubm9kZS5jb25maWcucmRtQ29sbGVjdGlvbi5zdWJzY3JpYmUoc2V0VXJsKTtcbiAgICBzZXRVcmwodGhpcy5ub2RlLmNvbmZpZy5yZG1Db2xsZWN0aW9uKCkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uY2VwdFdpZGdldFZpZXdNb2RlbDtcblxuIl0sIm5hbWVzIjpbImFyY2hlcyIsIlJlbW90ZURvbWFpbldpZGdldFZpZXdNb2RlbCIsIkNvbmNlcHRXaWRnZXRWaWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwicHJlcERhdGEiLCJkYXRhIiwiZm9yRWFjaCIsInJlY29yZCIsImNvbGxlY3RvciIsImlkIiwidW5kZWZpbmVkIiwiYXBwbHkiLCJzZXRVcmwiLCJ1cmwiLCJ1cmxzIiwiZHJvcGRvd24iLCJub2RlIiwiY29uZmlnIiwicmRtQ29sbGVjdGlvbiIsInN1YnNjcmliZSJdLCJzb3VyY2VSb290IjoiIn0=