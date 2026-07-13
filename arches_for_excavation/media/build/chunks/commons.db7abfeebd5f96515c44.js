"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[76379],{

/***/ 76379:
/*!*******************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/card-multi-select.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);


/**
* A base viewmodel for functions
*
* @constructor
* @name CardMultiSelect
*
* @param  {string} params - a configuration object
*/
var CardMultiSelect = function CardMultiSelect() {
  this.card.staging = knockout__WEBPACK_IMPORTED_MODULE_0___default().observableArray();
  this.staging = this.card.staging;
  var self = this;
  this.card.stageTile = function (tile, e) {
    e.preventDefault(e);
    if (self.staging.indexOf(tile.tileid) < 0) {
      self.staging.push(tile.tileid);
    } else {
      self.staging.remove(tile.tileid);
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardMultiSelect);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZGI3YWJmZWViZDVmOTY1MTVjNDQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFlQSxDQUFBLEVBQWM7RUFDN0IsSUFBSSxDQUFDQyxJQUFJLENBQUNDLE9BQU8sR0FBR0gsK0RBQWtCLENBQUMsQ0FBQztFQUN4QyxJQUFJLENBQUNHLE9BQU8sR0FBRyxJQUFJLENBQUNELElBQUksQ0FBQ0MsT0FBTztFQUNoQyxJQUFJRSxJQUFJLEdBQUcsSUFBSTtFQUNmLElBQUksQ0FBQ0gsSUFBSSxDQUFDSSxTQUFTLEdBQUcsVUFBU0MsSUFBSSxFQUFFQyxDQUFDLEVBQUM7SUFDbkNBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDRCxDQUFDLENBQUM7SUFDbkIsSUFBSUgsSUFBSSxDQUFDRixPQUFPLENBQUNPLE9BQU8sQ0FBQ0gsSUFBSSxDQUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7TUFDdkNOLElBQUksQ0FBQ0YsT0FBTyxDQUFDUyxJQUFJLENBQUNMLElBQUksQ0FBQ0ksTUFBTSxDQUFDO0lBQ2xDLENBQUMsTUFBTTtNQUNITixJQUFJLENBQUNGLE9BQU8sQ0FBQ1UsTUFBTSxDQUFDTixJQUFJLENBQUNJLE1BQU0sQ0FBQztJQUNwQztFQUNKLENBQUM7QUFDTCxDQUFDO0FBQ0QsaUVBQWVWLGVBQWUsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdtb2RlbHMvY2FyZC1tdWx0aS1zZWxlY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcblxuLyoqXG4qIEEgYmFzZSB2aWV3bW9kZWwgZm9yIGZ1bmN0aW9uc1xuKlxuKiBAY29uc3RydWN0b3JcbiogQG5hbWUgQ2FyZE11bHRpU2VsZWN0XG4qXG4qIEBwYXJhbSAge3N0cmluZ30gcGFyYW1zIC0gYSBjb25maWd1cmF0aW9uIG9iamVjdFxuKi9cbnZhciBDYXJkTXVsdGlTZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNhcmQuc3RhZ2luZyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIHRoaXMuc3RhZ2luZyA9IHRoaXMuY2FyZC5zdGFnaW5nO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmNhcmQuc3RhZ2VUaWxlID0gZnVuY3Rpb24odGlsZSwgZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoZSk7IFxuICAgICAgICBpZiAoc2VsZi5zdGFnaW5nLmluZGV4T2YodGlsZS50aWxlaWQpIDwgMCkge1xuICAgICAgICAgICAgc2VsZi5zdGFnaW5nLnB1c2godGlsZS50aWxlaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5zdGFnaW5nLnJlbW92ZSh0aWxlLnRpbGVpZCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IENhcmRNdWx0aVNlbGVjdDtcbiJdLCJuYW1lcyI6WyJrbyIsIkNhcmRNdWx0aVNlbGVjdCIsImNhcmQiLCJzdGFnaW5nIiwib2JzZXJ2YWJsZUFycmF5Iiwic2VsZiIsInN0YWdlVGlsZSIsInRpbGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJpbmRleE9mIiwidGlsZWlkIiwicHVzaCIsInJlbW92ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9