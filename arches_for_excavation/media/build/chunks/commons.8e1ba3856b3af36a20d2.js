"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[82067],{

/***/ 82067:
/*!********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/scrollTo.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);


(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).scrollTo = {
  update: function update(element, valueAccessor, allBindings) {
    var _value = valueAccessor();
    if (knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(_value)) {
      var target = jquery__WEBPACK_IMPORTED_MODULE_1___default()(element);
      var container = jquery__WEBPACK_IMPORTED_MODULE_1___default()(allBindings.get('container') || 'html, body');
      var scrollDirection = allBindings.get('scrollDirection') || 'vertical';
      if (scrollDirection === 'vertical') {
        var top = jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).height();
        var containerTop = container.offset().top;
        var bottom = target.offset().top + target.outerHeight();
        if (bottom > top || bottom < containerTop) {
          container.stop().animate({
            scrollTop: target.offset().top - containerTop + container.scrollTop() - 50
          }, 500);
        }
      } else if (scrollDirection === 'horizontal') {
        var leftScreenBoundary = 50; /* left-nav width */
        var rightScreenBoundary = jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).width();
        var targetOffsetLeft = target.offset().left;
        var targetOffsetRight = targetOffsetLeft + target.width();
        if (targetOffsetLeft < leftScreenBoundary) {
          container.stop().animate({
            scrollLeft: container.scrollLeft() + targetOffsetLeft - leftScreenBoundary
          }, 500);
        } else if (targetOffsetRight > rightScreenBoundary) {
          container.stop().animate({
            scrollLeft: container.scrollLeft() + targetOffsetRight - rightScreenBoundary
          }, 500);
        }
      }
    }
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).scrollTo.update = knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers.scrollTo.update.bind((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).scrollTo);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).scrollTo);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2JpbmRpbmdzL3Njcm9sbFRvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5rby5iaW5kaW5nSGFuZGxlcnMuc2Nyb2xsVG8gPSB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5ncykge1xuICAgICAgICB2YXIgX3ZhbHVlID0gdmFsdWVBY2Nlc3NvcigpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGtvLnVud3JhcChfdmFsdWUpKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKGFsbEJpbmRpbmdzLmdldCgnY29udGFpbmVyJykgfHwgJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxEaXJlY3Rpb24gPSBhbGxCaW5kaW5ncy5nZXQoJ3Njcm9sbERpcmVjdGlvbicpIHx8ICd2ZXJ0aWNhbCc7XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGxEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9wID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJUb3AgPSBjb250YWluZXIub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIHZhciBib3R0b20gPSB0YXJnZXQub2Zmc2V0KCkudG9wICsgdGFyZ2V0Lm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYm90dG9tID4gdG9wIHx8IGJvdHRvbSA8IGNvbnRhaW5lclRvcCkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gY29udGFpbmVyVG9wICsgY29udGFpbmVyLnNjcm9sbFRvcCgpIC0gNTBcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzY3JvbGxEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgIHZhciBsZWZ0U2NyZWVuQm91bmRhcnkgPSA1MDsgIC8qIGxlZnQtbmF2IHdpZHRoICovXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0U2NyZWVuQm91bmRhcnkgPSAkKHdpbmRvdykud2lkdGgoKTtcblxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRPZmZzZXRMZWZ0ID0gdGFyZ2V0Lm9mZnNldCgpLmxlZnQ7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldE9mZnNldFJpZ2h0ID0gdGFyZ2V0T2Zmc2V0TGVmdCArIHRhcmdldC53aWR0aCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldE9mZnNldExlZnQgPCBsZWZ0U2NyZWVuQm91bmRhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IGNvbnRhaW5lci5zY3JvbGxMZWZ0KCkgKyB0YXJnZXRPZmZzZXRMZWZ0IC0gbGVmdFNjcmVlbkJvdW5kYXJ5XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhcmdldE9mZnNldFJpZ2h0ID4gcmlnaHRTY3JlZW5Cb3VuZGFyeSkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTGVmdDogY29udGFpbmVyLnNjcm9sbExlZnQoKSArIHRhcmdldE9mZnNldFJpZ2h0IC0gcmlnaHRTY3JlZW5Cb3VuZGFyeVxuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5rby5iaW5kaW5nSGFuZGxlcnMuc2Nyb2xsVG8udXBkYXRlID0ga28uYmluZGluZ0hhbmRsZXJzLnNjcm9sbFRvLnVwZGF0ZS5iaW5kKGtvLmJpbmRpbmdIYW5kbGVycy5zY3JvbGxUbyk7XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmJpbmRpbmdIYW5kbGVycy5zY3JvbGxUbzsiXSwibmFtZXMiOlsia28iLCIkIiwiYmluZGluZ0hhbmRsZXJzIiwic2Nyb2xsVG8iLCJ1cGRhdGUiLCJlbGVtZW50IiwidmFsdWVBY2Nlc3NvciIsImFsbEJpbmRpbmdzIiwiX3ZhbHVlIiwidW53cmFwIiwidGFyZ2V0IiwiY29udGFpbmVyIiwiZ2V0Iiwic2Nyb2xsRGlyZWN0aW9uIiwidG9wIiwid2luZG93IiwiaGVpZ2h0IiwiY29udGFpbmVyVG9wIiwib2Zmc2V0IiwiYm90dG9tIiwib3V0ZXJIZWlnaHQiLCJzdG9wIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImxlZnRTY3JlZW5Cb3VuZGFyeSIsInJpZ2h0U2NyZWVuQm91bmRhcnkiLCJ3aWR0aCIsInRhcmdldE9mZnNldExlZnQiLCJsZWZ0IiwidGFyZ2V0T2Zmc2V0UmlnaHQiLCJzY3JvbGxMZWZ0IiwiYmluZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9