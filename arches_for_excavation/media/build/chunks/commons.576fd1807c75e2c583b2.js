"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[76206],{

/***/ 76206:
/*!*********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/mapbox-gl.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mapbox-gl */ 60842);
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_4__);





var initialize = function initialize(element, valueAccessor, mapboxgl) {
  var defaults = {
    container: element
  };
  var options = knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(valueAccessor()).mapOptions || {};
  var mapInitOptions = {};
  mapboxgl.accessToken = arches__WEBPACK_IMPORTED_MODULE_3__["default"].mapboxApiKey;
  underscore__WEBPACK_IMPORTED_MODULE_1___default().each(options, function (option, key) {
    if (knockout__WEBPACK_IMPORTED_MODULE_2___default().isObservable(option)) {
      mapInitOptions[key] = option();
    } else {
      mapInitOptions[key] = option;
    }
  });
  if (mapInitOptions.centerX && mapInitOptions.centerY) {
    mapInitOptions['center'] = [mapInitOptions.centerX, mapInitOptions.centerY];
  }
  var map = new mapboxgl.Map(underscore__WEBPACK_IMPORTED_MODULE_1___default().defaults(mapInitOptions, defaults));
  map.on('load', function () {
    underscore__WEBPACK_IMPORTED_MODULE_1___default().each(arches__WEBPACK_IMPORTED_MODULE_3__["default"].mapMarkers, function (marker) {
      map.loadImage(marker.url, function (error, image) {
        if (error) throw error;
        map.addImage(marker.name, image);
      });
    });
  });

  // prevents drag events from bubbling
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).mousedown(function (event) {
    event.stopPropagation();
  });
  if (typeof knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(valueAccessor()).afterRender === 'function') {
    knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(valueAccessor()).afterRender(map);
  }
  if (knockout__WEBPACK_IMPORTED_MODULE_2___default().isObservable(options.zoom)) {
    options.zoom.subscribe(function (val) {
      map.setZoom(val);
    }, this);
  }
  if (knockout__WEBPACK_IMPORTED_MODULE_2___default().isObservable(options.centerX)) {
    options.centerX.subscribe(function (val) {
      map.setCenter(new mapboxgl.LngLat(val, options.centerY()));
    }, this);
  }
  if (knockout__WEBPACK_IMPORTED_MODULE_2___default().isObservable(options.centerY)) {
    options.centerY.subscribe(function (val) {
      map.setCenter(new mapboxgl.LngLat(options.centerX(), val));
    }, this);
  }
  if (knockout__WEBPACK_IMPORTED_MODULE_2___default().isObservable(options.pitch)) {
    options.pitch.subscribe(function (val) {
      map.setPitch(val);
    }, this);
  }
  if (knockout__WEBPACK_IMPORTED_MODULE_2___default().isObservable(options.setBearing)) {
    options.bearing.subscribe(function (val) {
      map.setBearing(val);
    }, this);
  }
  knockout__WEBPACK_IMPORTED_MODULE_2___default().utils.domNodeDisposal.addDisposeCallback(element, function () {
    map.remove();
  });
};
(knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).mapboxgl = {
  init: function init(element, valueAccessor) {
    initialize(element, valueAccessor, (mapbox_gl__WEBPACK_IMPORTED_MODULE_4___default()));
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).mapboxgl.init = knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers.mapboxgl.init.bind((knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).mapboxgl);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_2___default().bindingHandlers).mapboxgl);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNTc2ZmQxODA3Yzc1ZTJjNTgzYjIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNJO0FBQ0Q7QUFDRTtBQUNHO0FBRy9CLElBQU1LLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFZQyxPQUFPLEVBQUVDLGFBQWEsRUFBRUMsUUFBUSxFQUFFO0VBQzFELElBQUlDLFFBQVEsR0FBRztJQUNYQyxTQUFTLEVBQUVKO0VBQ2YsQ0FBQztFQUNELElBQUlLLE9BQU8sR0FBR1Qsc0RBQVMsQ0FBQ0ssYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDTSxVQUFVLElBQUksQ0FBQyxDQUFDO0VBQ3pELElBQUlDLGNBQWMsR0FBRyxDQUFDLENBQUM7RUFDdkJOLFFBQVEsQ0FBQ08sV0FBVyxHQUFHWiw4Q0FBTSxDQUFDYSxZQUFZO0VBRTFDZixzREFBTSxDQUFDVSxPQUFPLEVBQUUsVUFBU08sTUFBTSxFQUFFQyxHQUFHLEVBQUM7SUFDakMsSUFBSWpCLDREQUFlLENBQUNnQixNQUFNLENBQUMsRUFBQztNQUN4QkosY0FBYyxDQUFDSyxHQUFHLENBQUMsR0FBR0QsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQyxNQUFNO01BQ0hKLGNBQWMsQ0FBQ0ssR0FBRyxDQUFDLEdBQUdELE1BQU07SUFDaEM7RUFDSixDQUFDLENBQUM7RUFFRixJQUFJSixjQUFjLENBQUNPLE9BQU8sSUFBSVAsY0FBYyxDQUFDUSxPQUFPLEVBQUU7SUFDbERSLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN2QkEsY0FBYyxDQUFDTyxPQUFPLEVBQ3RCUCxjQUFjLENBQUNRLE9BQU8sQ0FDekI7RUFDTDtFQUVBLElBQUlDLEdBQUcsR0FBRyxJQUFJZixRQUFRLENBQUNnQixHQUFHLENBQ3RCdkIsMERBQVUsQ0FBQ2EsY0FBYyxFQUFFTCxRQUFRLENBQ3ZDLENBQUM7RUFDRGMsR0FBRyxDQUFDRSxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQVc7SUFD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QU8sRUFBRUMsYUFBYSxFQUFFSCxrREFBTSxDQUFDO0VBQzlDO0FBQ0osQ0FBQztBQUNERixpRUFBa0IsQ0FBQ00sUUFBUSxDQUFDNkMsSUFBSSxHQUFHbkQsK0RBQWtCLENBQUNNLFFBQVEsQ0FBQzZDLElBQUksQ0FBQ0MsSUFBSSxDQUFDcEQsaUVBQWtCLENBQUNNLFFBQVEsQ0FBQztBQUVyRyxpRUFBZU4saUVBQWtCLENBQUNNLFFBQVEsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL2JpbmRpbmdzL21hcGJveC1nbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IG1hcGJveCBmcm9tICdtYXBib3gtZ2wnO1xuXG5cbmNvbnN0IGluaXRpYWxpemUgPSBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBtYXBib3hnbCkge1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgY29udGFpbmVyOiBlbGVtZW50XG4gICAgfTtcbiAgICB2YXIgb3B0aW9ucyA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpLm1hcE9wdGlvbnMgfHwge307XG4gICAgdmFyIG1hcEluaXRPcHRpb25zID0ge307XG4gICAgbWFwYm94Z2wuYWNjZXNzVG9rZW4gPSBhcmNoZXMubWFwYm94QXBpS2V5O1xuXG4gICAgXy5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKG9wdGlvbiwga2V5KXtcbiAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShvcHRpb24pKXtcbiAgICAgICAgICAgIG1hcEluaXRPcHRpb25zW2tleV0gPSBvcHRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcEluaXRPcHRpb25zW2tleV0gPSBvcHRpb247XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChtYXBJbml0T3B0aW9ucy5jZW50ZXJYICYmIG1hcEluaXRPcHRpb25zLmNlbnRlclkpIHtcbiAgICAgICAgbWFwSW5pdE9wdGlvbnNbJ2NlbnRlciddID0gW1xuICAgICAgICAgICAgbWFwSW5pdE9wdGlvbnMuY2VudGVyWCxcbiAgICAgICAgICAgIG1hcEluaXRPcHRpb25zLmNlbnRlcllcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICB2YXIgbWFwID0gbmV3IG1hcGJveGdsLk1hcChcbiAgICAgICAgXy5kZWZhdWx0cyhtYXBJbml0T3B0aW9ucywgZGVmYXVsdHMpXG4gICAgKTtcbiAgICBtYXAub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5lYWNoKGFyY2hlcy5tYXBNYXJrZXJzLCBmdW5jdGlvbihtYXJrZXIpIHtcbiAgICAgICAgICAgIG1hcC5sb2FkSW1hZ2UobWFya2VyLnVybCwgZnVuY3Rpb24oZXJyb3IsIGltYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICBtYXAuYWRkSW1hZ2UobWFya2VyLm5hbWUsIGltYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHByZXZlbnRzIGRyYWcgZXZlbnRzIGZyb20gYnViYmxpbmdcbiAgICAkKGVsZW1lbnQpLm1vdXNlZG93bihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Yga28udW53cmFwKHZhbHVlQWNjZXNzb3IoKSkuYWZ0ZXJSZW5kZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAga28udW53cmFwKHZhbHVlQWNjZXNzb3IoKSkuYWZ0ZXJSZW5kZXIobWFwKTtcbiAgICB9XG5cbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG9wdGlvbnMuem9vbSkpIHtcbiAgICAgICAgb3B0aW9ucy56b29tLnN1YnNjcmliZShmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIG1hcC5zZXRab29tKHZhbCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIGlmIChrby5pc09ic2VydmFibGUob3B0aW9ucy5jZW50ZXJYKSkge1xuICAgICAgICBvcHRpb25zLmNlbnRlclguc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgbWFwLnNldENlbnRlcihuZXcgbWFwYm94Z2wuTG5nTGF0KHZhbCwgb3B0aW9ucy5jZW50ZXJZKCkpKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShvcHRpb25zLmNlbnRlclkpKSB7XG4gICAgICAgIG9wdGlvbnMuY2VudGVyWS5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKG5ldyBtYXBib3hnbC5MbmdMYXQob3B0aW9ucy5jZW50ZXJYKCksIHZhbCkpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG9wdGlvbnMucGl0Y2gpKSB7XG4gICAgICAgIG9wdGlvbnMucGl0Y2guc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgbWFwLnNldFBpdGNoKHZhbCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIGlmIChrby5pc09ic2VydmFibGUob3B0aW9ucy5zZXRCZWFyaW5nKSkge1xuICAgICAgICBvcHRpb25zLmJlYXJpbmcuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgbWFwLnNldEJlYXJpbmcodmFsKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAga28udXRpbHMuZG9tTm9kZURpc3Bvc2FsLmFkZERpc3Bvc2VDYWxsYmFjayhlbGVtZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFwLnJlbW92ZSgpO1xuICAgIH0pO1xufTtcblxua28uYmluZGluZ0hhbmRsZXJzLm1hcGJveGdsID0ge1xuICAgIGluaXQ6IChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSA9PiB7XG4gICAgICAgIGluaXRpYWxpemUoZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgbWFwYm94KTtcbiAgICB9XG59O1xua28uYmluZGluZ0hhbmRsZXJzLm1hcGJveGdsLmluaXQgPSBrby5iaW5kaW5nSGFuZGxlcnMubWFwYm94Z2wuaW5pdC5iaW5kKGtvLmJpbmRpbmdIYW5kbGVycy5tYXBib3hnbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmJpbmRpbmdIYW5kbGVycy5tYXBib3hnbDtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwiYXJjaGVzIiwibWFwYm94IiwiaW5pdGlhbGl6ZSIsImVsZW1lbnQiLCJ2YWx1ZUFjY2Vzc29yIiwibWFwYm94Z2wiLCJkZWZhdWx0cyIsImNvbnRhaW5lciIsIm9wdGlvbnMiLCJ1bndyYXAiLCJtYXBPcHRpb25zIiwibWFwSW5pdE9wdGlvbnMiLCJhY2Nlc3NUb2tlbiIsIm1hcGJveEFwaUtleSIsImVhY2giLCJvcHRpb24iLCJrZXkiLCJpc09ic2VydmFibGUiLCJjZW50ZXJYIiwiY2VudGVyWSIsIm1hcCIsIk1hcCIsIm9uIiwibWFwTWFya2VycyIsIm1hcmtlciIsImxvYWRJbWFnZSIsInVybCIsImVycm9yIiwiaW1hZ2UiLCJhZGRJbWFnZSIsIm5hbWUiLCJtb3VzZWRvd24iLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImFmdGVyUmVuZGVyIiwiem9vbSIsInN1YnNjcmliZSIsInZhbCIsInNldFpvb20iLCJzZXRDZW50ZXIiLCJMbmdMYXQiLCJwaXRjaCIsInNldFBpdGNoIiwic2V0QmVhcmluZyIsImJlYXJpbmciLCJ1dGlscyIsImRvbU5vZGVEaXNwb3NhbCIsImFkZERpc3Bvc2VDYWxsYmFjayIsInJlbW92ZSIsImJpbmRpbmdIYW5kbGVycyIsImluaXQiLCJiaW5kIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=