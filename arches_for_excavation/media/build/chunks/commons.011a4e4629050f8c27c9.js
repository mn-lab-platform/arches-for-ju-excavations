"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[60925],{

/***/ 60925:
/*!*******************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/gallery.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);


(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).gallery = {
  init: function init() {
    this.initted = true;
  },
  update: function update(element, valueAccessor, allBindingsAccessor) {
    var value = valueAccessor();
    var bindings = allBindingsAccessor();
    var pan = value;
    var duration = bindings.duration;
    var thumbnailclass = "." + bindings.thumbnailclass;
    var gt = jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).find(thumbnailclass)[0];
    pan.subscribe(function (val) {
      if (val === 'right') {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(gt).animate({
          scrollLeft: '+=' + jquery__WEBPACK_IMPORTED_MODULE_1___default()(gt).width()
        }, duration);
      } else if (val === 'left') {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(gt).animate({
          scrollLeft: '-=' + jquery__WEBPACK_IMPORTED_MODULE_1___default()(gt).width()
        }, duration);
      }
    });
    this.initted = false;
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).gallery.init = knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers.gallery.init.bind((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).gallery);
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).gallery.update = knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers.gallery.update.bind((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).gallery);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).gallery);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMDExYTRlNDYyOTA1MGY4YzI3YzkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDSDtBQUV2QkEsaUVBQWtCLENBQUNHLE9BQU8sR0FBRztFQUN6QkMsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQUEsRUFBYTtJQUNiLElBQUksQ0FBQ0MsT0FBTyxHQUFHLElBQUk7RUFDdkIsQ0FBQztFQUNEQyxNQUFNLEVBQUUsU0FBUkEsTUFBTUEsQ0FBV0MsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLG1CQUFtQixFQUFFO0lBQzFELElBQUlDLEtBQUssR0FBR0YsYUFBYSxDQUFDLENBQUM7SUFDM0IsSUFBSUcsUUFBUSxHQUFHRixtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BDLElBQUlHLEdBQUcsR0FBR0YsS0FBSztJQUNmLElBQUlHLFFBQVEsR0FBR0YsUUFBUSxDQUFDRSxRQUFRO0lBQ2hDLElBQUlDLGNBQWMsR0FBRyxHQUFHLEdBQUdILFFBQVEsQ0FBQ0csY0FBYztJQUNsRCxJQUFJQyxFQUFFLEdBQUdkLDZDQUFDLENBQUNNLE9BQU8sQ0FBQyxDQUFDUyxJQUFJLENBQUNGLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQ0YsR0FBRyxDQUFDSyxTQUFTLENBQUMsVUFBU0MsR0FBRyxFQUFDO01BQ3ZCLElBQUlBLEdBQUcsS0FBSyxPQUFPLEVBQUU7UUFDakJqQiw2Q0FBQyxDQUFDYyxFQUFFLENBQUMsQ0FBQ0ksT0FBTyxDQUFDO1VBQUNDLFVBQVUsRUFBRSxJQUFJLEdBQUduQiw2Q0FBQyxDQUFDYyxFQUFFLENBQUMsQ0FBQ00sS0FBSyxDQUFDO1FBQUMsQ0FBQyxFQUFFUixRQUFRLENBQUM7TUFDL0QsQ0FBQyxNQUFNLElBQUlLLEdBQUcsS0FBSyxNQUFNLEVBQUU7UUFDdkJqQiw2Q0FBQyxDQUFDYyxFQUFFLENBQUMsQ0FBQ0ksT0FBTyxDQUFDO1VBQUNDLFVBQVUsRUFBRSxJQUFJLEdBQUduQiw2Q0FBQyxDQUFDYyxFQUFFLENBQUMsQ0FBQ00sS0FBSyxDQUFDO1FBQUMsQ0FBQyxFQUFFUixRQUFRLENBQUM7TUFDL0Q7SUFDSixDQUFDLENBQUM7SUFDRixJQUFJLENBQUNSLE9BQU8sR0FBRyxLQUFLO0VBQ3hCO0FBQ0osQ0FBQztBQUNETCxpRUFBa0IsQ0FBQ0csT0FBTyxDQUFDQyxJQUFJLEdBQUdKLCtEQUFrQixDQUFDRyxPQUFPLENBQUNDLElBQUksQ0FBQ2tCLElBQUksQ0FBQ3RCLGlFQUFrQixDQUFDRyxPQUFPLENBQUM7QUFDbEdILGlFQUFrQixDQUFDRyxPQUFPLENBQUNHLE1BQU0sR0FBR04sK0RBQWtCLENBQUNHLE9BQU8sQ0FBQ0csTUFBTSxDQUFDZ0IsSUFBSSxDQUFDdEIsaUVBQWtCLENBQUNHLE9BQU8sQ0FBQztBQUV0RyxpRUFBZUgsaUVBQWtCLENBQUNHLE9BQU8sRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2JpbmRpbmdzL2dhbGxlcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmtvLmJpbmRpbmdIYW5kbGVycy5nYWxsZXJ5ID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmluaXR0ZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5nc0FjY2Vzc29yKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKTtcbiAgICAgICAgdmFyIGJpbmRpbmdzID0gYWxsQmluZGluZ3NBY2Nlc3NvcigpO1xuICAgICAgICB2YXIgcGFuID0gdmFsdWU7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGJpbmRpbmdzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgdGh1bWJuYWlsY2xhc3MgPSBcIi5cIiArIGJpbmRpbmdzLnRodW1ibmFpbGNsYXNzO1xuICAgICAgICB2YXIgZ3QgPSAkKGVsZW1lbnQpLmZpbmQodGh1bWJuYWlsY2xhc3MpWzBdO1xuICAgICAgICBwYW4uc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgICAgICBpZiAodmFsID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgJChndCkuYW5pbWF0ZSh7c2Nyb2xsTGVmdDogJys9JyArICQoZ3QpLndpZHRoKCl9LCBkdXJhdGlvbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgJChndCkuYW5pbWF0ZSh7c2Nyb2xsTGVmdDogJy09JyArICQoZ3QpLndpZHRoKCl9LCBkdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmluaXR0ZWQgPSBmYWxzZTtcbiAgICB9XG59O1xua28uYmluZGluZ0hhbmRsZXJzLmdhbGxlcnkuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5nYWxsZXJ5LmluaXQuYmluZChrby5iaW5kaW5nSGFuZGxlcnMuZ2FsbGVyeSk7XG5rby5iaW5kaW5nSGFuZGxlcnMuZ2FsbGVyeS51cGRhdGUgPSBrby5iaW5kaW5nSGFuZGxlcnMuZ2FsbGVyeS51cGRhdGUuYmluZChrby5iaW5kaW5nSGFuZGxlcnMuZ2FsbGVyeSk7XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmJpbmRpbmdIYW5kbGVycy5nYWxsZXJ5O1xuXG4iXSwibmFtZXMiOlsia28iLCIkIiwiYmluZGluZ0hhbmRsZXJzIiwiZ2FsbGVyeSIsImluaXQiLCJpbml0dGVkIiwidXBkYXRlIiwiZWxlbWVudCIsInZhbHVlQWNjZXNzb3IiLCJhbGxCaW5kaW5nc0FjY2Vzc29yIiwidmFsdWUiLCJiaW5kaW5ncyIsInBhbiIsImR1cmF0aW9uIiwidGh1bWJuYWlsY2xhc3MiLCJndCIsImZpbmQiLCJzdWJzY3JpYmUiLCJ2YWwiLCJhbmltYXRlIiwic2Nyb2xsTGVmdCIsIndpZHRoIiwiYmluZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9