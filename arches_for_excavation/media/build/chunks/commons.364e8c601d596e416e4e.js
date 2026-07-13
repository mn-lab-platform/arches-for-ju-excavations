"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[34567],{

/***/ 34567:
/*!********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/back-to-top.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var backToTop = {
  scrollToTopHandler: function scrollToTopHandler() {
    // Get the button:
    var mybutton = document.getElementById("backToTopBtn");

    // When the user scrolls down 200px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };
    function scrollFunction() {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.style.opacity = "0.5";
      } else {
        mybutton.style.opacity = "0";
      }
    }
  },
  // When the user clicks on the button, scroll to the top of the document
  backToTopHandler: function backToTopHandler() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backToTop);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMzY0ZThjNjAxZDU5NmU0MTZlNGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFNBQVMsR0FBRztFQUNkQyxrQkFBa0IsRUFBRSxTQUFwQkEsa0JBQWtCQSxDQUFBLEVBQWE7SUFDM0I7SUFDQSxJQUFJQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGNBQWMsQ0FBQzs7SUFFdEQ7SUFDQUMsTUFBTSxDQUFDQyxRQUFRLEdBQUcsWUFBVztNQUFFQyxjQUFjLENBQUMsQ0FBQztJQUFFLENBQUM7SUFFbEQsU0FBU0EsY0FBY0EsQ0FBQSxFQUFHO01BQ3RCLElBQUlKLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDQyxTQUFTLEdBQUcsR0FBRyxJQUFJTixRQUFRLENBQUNPLGVBQWUsQ0FBQ0QsU0FBUyxHQUFHLEdBQUcsRUFBRTtRQUMzRVAsUUFBUSxDQUFDUyxLQUFLLENBQUNDLE9BQU8sR0FBRyxLQUFLO01BQ2xDLENBQUMsTUFBTTtRQUNIVixRQUFRLENBQUNTLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLEdBQUc7TUFDaEM7SUFDSjtFQUNKLENBQUM7RUFFRDtFQUNBQyxnQkFBZ0IsRUFBRSxTQUFsQkEsZ0JBQWdCQSxDQUFBLEVBQWE7SUFDekJWLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0JOLFFBQVEsQ0FBQ08sZUFBZSxDQUFDRCxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDNUM7QUFDSixDQUFDO0FBRUQsaUVBQWVULFNBQVMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3V0aWxzL2JhY2stdG8tdG9wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJhY2tUb1RvcCA9IHtcbiAgICBzY3JvbGxUb1RvcEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBHZXQgdGhlIGJ1dHRvbjpcbiAgICAgICAgbGV0IG15YnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrVG9Ub3BCdG5cIik7XG4gICAgICAgIFxuICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIHNjcm9sbHMgZG93biAyMDBweCBmcm9tIHRoZSB0b3Agb2YgdGhlIGRvY3VtZW50LCBzaG93IHRoZSBidXR0b25cbiAgICAgICAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24oKSB7IHNjcm9sbEZ1bmN0aW9uKCk7IH07XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBzY3JvbGxGdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IDIwMCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID4gMjAwKSB7XG4gICAgICAgICAgICAgICAgbXlidXR0b24uc3R5bGUub3BhY2l0eSA9IFwiMC41XCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG15YnV0dG9uLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgYnV0dG9uLCBzY3JvbGwgdG8gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICBiYWNrVG9Ub3BIYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwOyAvLyBGb3IgU2FmYXJpXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwOyAvLyBGb3IgQ2hyb21lLCBGaXJlZm94LCBJRSwgYW5kIE9wZXJhXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJhY2tUb1RvcDsiXSwibmFtZXMiOlsiYmFja1RvVG9wIiwic2Nyb2xsVG9Ub3BIYW5kbGVyIiwibXlidXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwid2luZG93Iiwib25zY3JvbGwiLCJzY3JvbGxGdW5jdGlvbiIsImJvZHkiLCJzY3JvbGxUb3AiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm9wYWNpdHkiLCJiYWNrVG9Ub3BIYW5kbGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=