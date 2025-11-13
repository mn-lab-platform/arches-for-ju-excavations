"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[77701],{

/***/ 77701:
/*!**************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/scroll-to-file.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);


(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).scrollToFile = {
  update: function update(element, valueAccessor, allBindings) {
    var _value = valueAccessor();
    var _valueUnwrapped = knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(_value);
    var container = jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body');
    if (allBindings().container) {
      container = jquery__WEBPACK_IMPORTED_MODULE_0___default()(allBindings().container);
    }
    if (_valueUnwrapped) {
      var target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
      var top = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height();
      var containerTop = jquery__WEBPACK_IMPORTED_MODULE_0___default()(container).offset().top;
      var bottom = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).offset().top + jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).outerHeight();
      if (bottom > top || bottom > containerTop) {
        container.stop().animate({
          scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).offset().top - container.offset().top + container.scrollTop() - 50
        }, 10);
      }
    }
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).scrollToFile.update = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.scrollToFile.update.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).scrollToFile);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).scrollToFile);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNDNkOGU3YTQ0ODgyNjM4ZDA4MGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDRztBQUUxQkMsaUVBQWtCLENBQUNFLFlBQVksR0FBRztFQUM5QkMsTUFBTSxFQUFFLFNBQVJBLE1BQU1BLENBQVlDLE9BQU8sRUFBRUMsYUFBYSxFQUFFQyxXQUFXLEVBQUU7SUFDbkQsSUFBSUMsTUFBTSxHQUFHRixhQUFhLENBQUMsQ0FBQztJQUM1QixJQUFJRyxlQUFlLEdBQUdSLHNEQUFTLENBQUNPLE1BQU0sQ0FBQztJQUN2QyxJQUFJRyxTQUFTLEdBQUdYLDZDQUFDLENBQUMsWUFBWSxDQUFDO0lBQy9CLElBQUlPLFdBQVcsQ0FBQyxDQUFDLENBQUNJLFNBQVMsRUFBRTtNQUN6QkEsU0FBUyxHQUFHWCw2Q0FBQyxDQUFDTyxXQUFXLENBQUMsQ0FBQyxDQUFDSSxTQUFTLENBQUM7SUFDMUM7SUFDQSxJQUFJRixlQUFlLEVBQUU7TUFDakIsSUFBSUcsTUFBTSxHQUFHWiw2Q0FBQyxDQUFDSyxPQUFPLENBQUM7TUFDdkIsSUFBSVEsR0FBRyxHQUFHYiw2Q0FBQyxDQUFDYyxNQUFNLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7TUFDNUIsSUFBSUMsWUFBWSxHQUFHaEIsNkNBQUMsQ0FBQ1csU0FBUyxDQUFDLENBQUNNLE1BQU0sQ0FBQyxDQUFDLENBQUNKLEdBQUc7TUFDNUMsSUFBSUssTUFBTSxHQUFHbEIsNkNBQUMsQ0FBQ1ksTUFBTSxDQUFDLENBQUNLLE1BQU0sQ0FBQyxDQUFDLENBQUNKLEdBQUcsR0FBR2IsNkNBQUMsQ0FBQ1ksTUFBTSxDQUFDLENBQUNPLFdBQVcsQ0FBQyxDQUFDO01BQzdELElBQUlELE1BQU0sR0FBR0wsR0FBRyxJQUFJSyxNQUFNLEdBQUdGLFlBQVksRUFBRTtRQUN2Q0wsU0FBUyxDQUFDUyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxPQUFPLENBQUM7VUFDckJDLFNBQVMsRUFBRXRCLDZDQUFDLENBQUNZLE1BQU0sQ0FBQyxDQUFDSyxNQUFNLENBQUMsQ0FBQyxDQUFDSixHQUFHLEdBQUdGLFNBQVMsQ0FBQ00sTUFBTSxDQUFDLENBQUMsQ0FBQ0osR0FBRyxHQUFHRixTQUFTLENBQUNXLFNBQVMsQ0FBQyxDQUFDLEdBQUc7UUFDekYsQ0FBQyxFQUFFLEVBQUUsQ0FBQztNQUNWO0lBQ0o7RUFDSjtBQUNKLENBQUM7QUFDRHJCLGlFQUFrQixDQUFDRSxZQUFZLENBQUNDLE1BQU0sR0FBR0gsK0RBQWtCLENBQUNFLFlBQVksQ0FBQ0MsTUFBTSxDQUFDbUIsSUFBSSxDQUFDdEIsaUVBQWtCLENBQUNFLFlBQVksQ0FBQztBQUVySCxpRUFBZUYsaUVBQWtCLENBQUNFLFlBQVksRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2JpbmRpbmdzL3Njcm9sbC10by1maWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuXG5rby5iaW5kaW5nSGFuZGxlcnMuc2Nyb2xsVG9GaWxlID0ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzKSB7XG4gICAgICAgIHZhciBfdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCk7XG4gICAgICAgIHZhciBfdmFsdWVVbndyYXBwZWQgPSBrby51bndyYXAoX3ZhbHVlKTtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgaWYgKGFsbEJpbmRpbmdzKCkuY29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSAkKGFsbEJpbmRpbmdzKCkuY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX3ZhbHVlVW53cmFwcGVkKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgIHZhciB0b3AgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyVG9wID0gJChjb250YWluZXIpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgIHZhciBib3R0b20gPSAkKHRhcmdldCkub2Zmc2V0KCkudG9wICsgJCh0YXJnZXQpLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICBpZiAoYm90dG9tID4gdG9wIHx8IGJvdHRvbSA+IGNvbnRhaW5lclRvcCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtIGNvbnRhaW5lci5vZmZzZXQoKS50b3AgKyBjb250YWluZXIuc2Nyb2xsVG9wKCkgLSA1MFxuICAgICAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5rby5iaW5kaW5nSGFuZGxlcnMuc2Nyb2xsVG9GaWxlLnVwZGF0ZSA9IGtvLmJpbmRpbmdIYW5kbGVycy5zY3JvbGxUb0ZpbGUudXBkYXRlLmJpbmQoa28uYmluZGluZ0hhbmRsZXJzLnNjcm9sbFRvRmlsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmJpbmRpbmdIYW5kbGVycy5zY3JvbGxUb0ZpbGU7XG4iXSwibmFtZXMiOlsiJCIsImtvIiwiYmluZGluZ0hhbmRsZXJzIiwic2Nyb2xsVG9GaWxlIiwidXBkYXRlIiwiZWxlbWVudCIsInZhbHVlQWNjZXNzb3IiLCJhbGxCaW5kaW5ncyIsIl92YWx1ZSIsIl92YWx1ZVVud3JhcHBlZCIsInVud3JhcCIsImNvbnRhaW5lciIsInRhcmdldCIsInRvcCIsIndpbmRvdyIsImhlaWdodCIsImNvbnRhaW5lclRvcCIsIm9mZnNldCIsImJvdHRvbSIsIm91dGVySGVpZ2h0Iiwic3RvcCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJiaW5kIl0sInNvdXJjZVJvb3QiOiIifQ==