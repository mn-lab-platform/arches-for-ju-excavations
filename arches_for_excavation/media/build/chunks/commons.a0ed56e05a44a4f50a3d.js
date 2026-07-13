"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[74434],{

/***/ 74434:
/*!***********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/smartresize.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var jQuery = __webpack_require__(/*! ./node_modules/jquery/dist/jquery.min */ 33270);



// eslint-disable-next-line no-undef
(function (e, t) {
  var n = function n(e, t, _n) {
    var r;
    return function () {
      function u() {
        if (!_n) e.apply(s, o);
        r = null;
      }
      var s = this,
        o = arguments;
      if (r) clearTimeout(r);else if (_n) e.apply(s, o);
      r = setTimeout(u, t || 100);
    };
  };
  jQuery.fn[t] = function (e) {
    return e ? this.bind("resize", n(e)) : this.trigger(t);
  };
})(jQuery, "smartresize");
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).smartresize = {
  init: function init(element, valueAccessor, allBindings, viewModel) {
    var options = knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(valueAccessor());
    var childclass = options.childclass;
    function update_grid() {
      var content_width = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).width() + 20;
      var images_per_row = Math.floor(content_width / 300);
      var width = Math.round(content_width / images_per_row);
      var height = Math.round(width / 3 * 1.8);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).find(childclass).each(function (id) {
        var x = Math.round(id % images_per_row * width);
        var y = Math.floor(id / images_per_row) * height + Math.floor(id / images_per_row) * 20;
        if (navigator.appName.indexOf("Internet Explorer") != -1) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).animate({
            width: width - 3 + 'px',
            height: height + 'px',
            left: x,
            top: y
          }, 600);
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css({
            'width': width - 3 + 'px',
            'height': height + 'px',
            'left': x,
            'top': y
          });
        }
      });
      if (images_per_row == 1) {
        // console.log(images_per_row)
      }
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).smartresize(update_grid);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).ready(update_grid);
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).smartresize.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.smartresize.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).smartresize);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).smartresize);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYTBlZDU2ZTA1YTQ0YTRmNTBhM2QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0c7O0FBRTFCO0FBQ0EsQ0FBQyxVQUFTRSxDQUFDLEVBQUNDLENBQUMsRUFBQztFQUFDLElBQUlDLENBQUMsR0FBQyxTQUFGQSxDQUFDQSxDQUFVRixDQUFDLEVBQUNDLENBQUMsRUFBQ0MsRUFBQyxFQUFDO0lBQUMsSUFBSUMsQ0FBQztJQUFDLE9BQU8sWUFBVTtNQUFDLFNBQVNDLENBQUNBLENBQUEsRUFBRTtRQUFDLElBQUcsQ0FBQ0YsRUFBQyxFQUFDRixDQUFDLENBQUNLLEtBQUssQ0FBQ0MsQ0FBQyxFQUFDQyxDQUFDLENBQUM7UUFBQ0osQ0FBQyxHQUFDLElBQUk7TUFBQztNQUFDLElBQUlHLENBQUMsR0FBQyxJQUFJO1FBQUNDLENBQUMsR0FBQ0MsU0FBUztNQUFDLElBQUdMLENBQUMsRUFBQ00sWUFBWSxDQUFDTixDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUdELEVBQUMsRUFBQ0YsQ0FBQyxDQUFDSyxLQUFLLENBQUNDLENBQUMsRUFBQ0MsQ0FBQyxDQUFDO01BQUNKLENBQUMsR0FBQ08sVUFBVSxDQUFDTixDQUFDLEVBQUNILENBQUMsSUFBRSxHQUFHLENBQUM7SUFBQyxDQUFDO0VBQUMsQ0FBQztFQUFDVSxNQUFNLENBQUNDLEVBQUUsQ0FBQ1gsQ0FBQyxDQUFDLEdBQUMsVUFBU0QsQ0FBQyxFQUFDO0lBQUMsT0FBT0EsQ0FBQyxHQUFDLElBQUksQ0FBQ2EsSUFBSSxDQUFDLFFBQVEsRUFBQ1gsQ0FBQyxDQUFDRixDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQ2MsT0FBTyxDQUFDYixDQUFDLENBQUM7RUFBQyxDQUFDO0FBQUMsQ0FBQyxFQUFFVSxNQUFNLEVBQUMsYUFBYSxDQUFDO0FBRXhTWixpRUFBa0IsQ0FBQ2lCLFdBQVcsR0FBRztFQUM3QkMsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQVdDLE9BQU8sRUFBRUMsYUFBYSxFQUFFQyxXQUFXLEVBQUVDLFNBQVMsRUFBRTtJQUMzRCxJQUFJQyxPQUFPLEdBQUd2QixzREFBUyxDQUFDb0IsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN4QyxJQUFJSyxVQUFVLEdBQUdGLE9BQU8sQ0FBQ0UsVUFBVTtJQUNuQyxTQUFTQyxXQUFXQSxDQUFBLEVBQUc7TUFDbkIsSUFBSUMsYUFBYSxHQUFHNUIsNkNBQUMsQ0FBQ29CLE9BQU8sQ0FBQyxDQUFDUyxLQUFLLENBQUMsQ0FBQyxHQUFDLEVBQUU7TUFDekMsSUFBTUMsY0FBYyxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0osYUFBYSxHQUFHLEdBQUcsQ0FBQztNQUN0RCxJQUFJQyxLQUFLLEdBQUdFLElBQUksQ0FBQ0UsS0FBSyxDQUFDTCxhQUFhLEdBQUdFLGNBQWMsQ0FBQztNQUN0RCxJQUFJSSxNQUFNLEdBQUdILElBQUksQ0FBQ0UsS0FBSyxDQUFDSixLQUFLLEdBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQztNQUNwQzdCLDZDQUFDLENBQUNvQixPQUFPLENBQUMsQ0FBQ2UsSUFBSSxDQUFDVCxVQUFVLENBQUMsQ0FBQ1UsSUFBSSxDQUFDLFVBQVNDLEVBQUUsRUFBQztRQUN6QyxJQUFJQyxDQUFDLEdBQUdQLElBQUksQ0FBQ0UsS0FBSyxDQUFFSSxFQUFFLEdBQUdQLGNBQWMsR0FBSUQsS0FBSyxDQUFDO1FBQ2pELElBQUlVLENBQUMsR0FBR1IsSUFBSSxDQUFDQyxLQUFLLENBQUNLLEVBQUUsR0FBQ1AsY0FBYyxDQUFDLEdBQUdJLE1BQU0sR0FBR0gsSUFBSSxDQUFDQyxLQUFLLENBQUNLLEVBQUUsR0FBQ1AsY0FBYyxDQUFDLEdBQUcsRUFBRTtRQUNuRixJQUFJVSxTQUFTLENBQUNDLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUM7VUFDbkQxQyw2Q0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDMkMsT0FBTyxDQUFDO1lBQUNkLEtBQUssRUFBRUEsS0FBSyxHQUFDLENBQUMsR0FBQyxJQUFJO1lBQUVLLE1BQU0sRUFBRUEsTUFBTSxHQUFDLElBQUk7WUFBRVUsSUFBSSxFQUFFTixDQUFDO1lBQUVPLEdBQUcsRUFBRU47VUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDO1FBQ3BGLENBQUMsTUFBTTtVQUNIdkMsNkNBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzhDLEdBQUcsQ0FBQztZQUFDLE9BQU8sRUFBRWpCLEtBQUssR0FBQyxDQUFDLEdBQUMsSUFBSTtZQUFFLFFBQVEsRUFBRUssTUFBTSxHQUFDLElBQUk7WUFBRSxNQUFNLEVBQUVJLENBQUM7WUFBRSxLQUFLLEVBQUVDO1VBQUUsQ0FBQyxDQUFDO1FBQ3JGO01BQ0osQ0FBQyxDQUFDO01BRUYsSUFBSVQsY0FBYyxJQUFJLENBQUMsRUFBRTtRQUNyQjtNQUFBO0lBRVI7SUFDQTlCLDZDQUFDLENBQUMrQyxNQUFNLENBQUMsQ0FBQzdCLFdBQVcsQ0FBQ1MsV0FBVyxDQUFDO0lBQ2xDM0IsNkNBQUMsQ0FBQytDLE1BQU0sQ0FBQyxDQUFDQyxLQUFLLENBQUNyQixXQUFXLENBQUM7RUFDaEM7QUFDSixDQUFDO0FBQ0QxQixpRUFBa0IsQ0FBQ2lCLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHbEIsK0RBQWtCLENBQUNpQixXQUFXLENBQUNDLElBQUksQ0FBQ0osSUFBSSxDQUFDZCxpRUFBa0IsQ0FBQ2lCLFdBQVcsQ0FBQztBQUU5RyxpRUFBZWpCLGlFQUFrQixDQUFDaUIsV0FBVyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvYmluZGluZ3Mvc21hcnRyZXNpemUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuKGZ1bmN0aW9uKGUsdCl7dmFyIG49ZnVuY3Rpb24oZSx0LG4pe3ZhciByO3JldHVybiBmdW5jdGlvbigpe2Z1bmN0aW9uIHUoKXtpZighbillLmFwcGx5KHMsbyk7cj1udWxsO312YXIgcz10aGlzLG89YXJndW1lbnRzO2lmKHIpY2xlYXJUaW1lb3V0KHIpO2Vsc2UgaWYobillLmFwcGx5KHMsbyk7cj1zZXRUaW1lb3V0KHUsdHx8MTAwKTt9O307alF1ZXJ5LmZuW3RdPWZ1bmN0aW9uKGUpe3JldHVybiBlP3RoaXMuYmluZChcInJlc2l6ZVwiLG4oZSkpOnRoaXMudHJpZ2dlcih0KTt9O30pKGpRdWVyeSxcInNtYXJ0cmVzaXplXCIpO1xuXG5rby5iaW5kaW5nSGFuZGxlcnMuc21hcnRyZXNpemUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3MsIHZpZXdNb2RlbCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpO1xuICAgICAgICB2YXIgY2hpbGRjbGFzcyA9IG9wdGlvbnMuY2hpbGRjbGFzcztcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlX2dyaWQoKSB7XG4gICAgICAgICAgICB2YXIgY29udGVudF93aWR0aCA9ICQoZWxlbWVudCkud2lkdGgoKSsyMDtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlc19wZXJfcm93ID0gTWF0aC5mbG9vcihjb250ZW50X3dpZHRoIC8gMzAwKTtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IE1hdGgucm91bmQoY29udGVudF93aWR0aCAvIGltYWdlc19wZXJfcm93KTtcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBNYXRoLnJvdW5kKHdpZHRoLzMqMS44KTtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZChjaGlsZGNsYXNzKS5lYWNoKGZ1bmN0aW9uKGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IE1hdGgucm91bmQoKGlkICUgaW1hZ2VzX3Blcl9yb3cpICogd2lkdGgpO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihpZC9pbWFnZXNfcGVyX3JvdykgKiBoZWlnaHQgKyBNYXRoLmZsb29yKGlkL2ltYWdlc19wZXJfcm93KSAqIDIwO1xuICAgICAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IuYXBwTmFtZS5pbmRleE9mKFwiSW50ZXJuZXQgRXhwbG9yZXJcIikhPS0xKXtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hbmltYXRlKHt3aWR0aDogd2lkdGgtMysncHgnLCBoZWlnaHQ6IGhlaWdodCsncHgnLCBsZWZ0OiB4LCB0b3A6IHl9LDYwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3Moeyd3aWR0aCc6IHdpZHRoLTMrJ3B4JywgJ2hlaWdodCc6IGhlaWdodCsncHgnLCAnbGVmdCc6IHgsICd0b3AnOiB5IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaW1hZ2VzX3Blcl9yb3cgPT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGltYWdlc19wZXJfcm93KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICQod2luZG93KS5zbWFydHJlc2l6ZSh1cGRhdGVfZ3JpZCk7XG4gICAgICAgICQod2luZG93KS5yZWFkeSh1cGRhdGVfZ3JpZCk7XG4gICAgfVxufTtcbmtvLmJpbmRpbmdIYW5kbGVycy5zbWFydHJlc2l6ZS5pbml0ID0ga28uYmluZGluZ0hhbmRsZXJzLnNtYXJ0cmVzaXplLmluaXQuYmluZChrby5iaW5kaW5nSGFuZGxlcnMuc21hcnRyZXNpemUpO1xuXG5leHBvcnQgZGVmYXVsdCBrby5iaW5kaW5nSGFuZGxlcnMuc21hcnRyZXNpemU7XG4iXSwibmFtZXMiOlsiJCIsImtvIiwiZSIsInQiLCJuIiwiciIsInUiLCJhcHBseSIsInMiLCJvIiwiYXJndW1lbnRzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImpRdWVyeSIsImZuIiwiYmluZCIsInRyaWdnZXIiLCJiaW5kaW5nSGFuZGxlcnMiLCJzbWFydHJlc2l6ZSIsImluaXQiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsImFsbEJpbmRpbmdzIiwidmlld01vZGVsIiwib3B0aW9ucyIsInVud3JhcCIsImNoaWxkY2xhc3MiLCJ1cGRhdGVfZ3JpZCIsImNvbnRlbnRfd2lkdGgiLCJ3aWR0aCIsImltYWdlc19wZXJfcm93IiwiTWF0aCIsImZsb29yIiwicm91bmQiLCJoZWlnaHQiLCJmaW5kIiwiZWFjaCIsImlkIiwieCIsInkiLCJuYXZpZ2F0b3IiLCJhcHBOYW1lIiwiaW5kZXhPZiIsImFuaW1hdGUiLCJsZWZ0IiwidG9wIiwiY3NzIiwid2luZG93IiwicmVhZHkiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==