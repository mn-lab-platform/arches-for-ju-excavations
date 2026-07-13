"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[9405],{

/***/ 9405:
/*!***************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/photo-gallery.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);

var GalleryViewModel = function GalleryViewModel() {
  this.selectedItem;
  this.selectItem = function (val) {
    if (val && val.selected) {
      this.selectedItem = val;
      if (knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(val) !== true) {
        val.selected(true);
      }
    }
  };
  this.pan = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable();
  this.updatePan = function (val) {
    if (this.pan() !== val) {
      this.pan(val);
    } else {
      this.pan.valueHasMutated();
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GalleryViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYmRjMWFkM2Q0MmYwNmUwZjA0NzkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBRzFCLElBQUlDLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUEsRUFBYztFQUM5QixJQUFJLENBQUNDLFlBQVk7RUFDakIsSUFBSSxDQUFDQyxVQUFVLEdBQUcsVUFBU0MsR0FBRyxFQUFDO0lBQzNCLElBQUlBLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxRQUFRLEVBQUU7TUFDckIsSUFBSSxDQUFDSCxZQUFZLEdBQUdFLEdBQUc7TUFDdkIsSUFBSUosc0RBQVMsQ0FBQ0ksR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3pCQSxHQUFHLENBQUNDLFFBQVEsQ0FBQyxJQUFJLENBQUM7TUFDdEI7SUFDSjtFQUNKLENBQUM7RUFFRCxJQUFJLENBQUNFLEdBQUcsR0FBR1AsMERBQWEsQ0FBQyxDQUFDO0VBQzFCLElBQUksQ0FBQ1MsU0FBUyxHQUFHLFVBQVNMLEdBQUcsRUFBQztJQUMxQixJQUFJLElBQUksQ0FBQ0csR0FBRyxDQUFDLENBQUMsS0FBS0gsR0FBRyxFQUFFO01BQ3BCLElBQUksQ0FBQ0csR0FBRyxDQUFDSCxHQUFHLENBQUM7SUFDakIsQ0FBQyxNQUFNO01BQ0gsSUFBSSxDQUFDRyxHQUFHLENBQUNHLGVBQWUsQ0FBQyxDQUFDO0lBQzlCO0VBQ0osQ0FBQztBQUNMLENBQUM7QUFFRCxpRUFBZVQsZ0JBQWdCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3bW9kZWxzL3Bob3RvLWdhbGxlcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcblxuXG52YXIgR2FsbGVyeVZpZXdNb2RlbCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtO1xuICAgIHRoaXMuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgIGlmICh2YWwgJiYgdmFsLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IHZhbDtcbiAgICAgICAgICAgIGlmIChrby51bndyYXAodmFsKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhbC5zZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnBhbiA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLnVwZGF0ZVBhbiA9IGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgIGlmICh0aGlzLnBhbigpICE9PSB2YWwpIHtcbiAgICAgICAgICAgIHRoaXMucGFuKHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhbi52YWx1ZUhhc011dGF0ZWQoKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYWxsZXJ5Vmlld01vZGVsO1xuIl0sIm5hbWVzIjpbImtvIiwiR2FsbGVyeVZpZXdNb2RlbCIsInNlbGVjdGVkSXRlbSIsInNlbGVjdEl0ZW0iLCJ2YWwiLCJzZWxlY3RlZCIsInVud3JhcCIsInBhbiIsIm9ic2VydmFibGUiLCJ1cGRhdGVQYW4iLCJ2YWx1ZUhhc011dGF0ZWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==