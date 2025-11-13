"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[56584],{

/***/ 56584:
/*!************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/geocoders/mapbox.js + 1 modules ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ mapbox)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/geocoders/base-geocoder.js
var base_geocoder = __webpack_require__(81224);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/geocoders/geocoder.htm
const geocoder_namespaceObject = "templates/views/components/geocoders/geocoder.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/geocoders/mapbox.js






/* harmony default export */ const mapbox = (knockout_latest_default().components.register('views/components/geocoders/mapbox', {
  viewModel: function viewModel(params) {
    base_geocoder["default"].apply(this, [params]);
    var self = this;
    this.placeholder = params.placeholder || knockout_latest_default().observable('Locate a Place or Address');
    this.anchorLayerId = params.anchorLayerId;
    this.apiKey = params.api_key() || arches["default"].mapboxApiKey;
    this.map = params.map;
    this.options.subscribe(function () {
      self.selection(null);
    });
    this.updateResults = function (data) {
      self.options([]);
      if (data.length > 3) {
        self.loading(true);
        jquery_min_default().ajax({
          type: 'GET',
          url: '//api.mapbox.com/geocoding/v5/mapbox.places/' + self.query() + '.json',
          data: {
            access_token: knockout_latest_default().unwrap(self.apiKey)
          },
          success: function success(res) {
            var results = underscore_min_default().map(res.features, function (feature) {
              return {
                'id': feature['id'],
                'text': feature['place_name'],
                'geometry': {
                  "type": "Point",
                  "coordinates": [feature['geometry']['coordinates'][0], feature['geometry']['coordinates'][1]]
                }
              };
            });
            self.options(results);
          },
          complete: function complete() {
            self.loading(false);
          }
        });
      }
    };
    this.query.subscribe(this.updateResults);
    this.isFocused.subscribe(function () {
      self.focusItem(null);
    });
  },
  template: geocoder_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9nZW9jb2RlcnMvbWFwYm94LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgQmFzZUdlb2NvZGVyVmlld01vZGVsIGZyb20gJ3ZpZXdzL2NvbXBvbmVudHMvZ2VvY29kZXJzL2Jhc2UtZ2VvY29kZXInO1xuaW1wb3J0IGdlb2NvZGVyVGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvZ2VvY29kZXJzL2dlb2NvZGVyLmh0bSc7XG5cblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3Rlcigndmlld3MvY29tcG9uZW50cy9nZW9jb2RlcnMvbWFwYm94Jywge1xuICAgIHZpZXdNb2RlbDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgIEJhc2VHZW9jb2RlclZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGFyYW1zLnBsYWNlaG9sZGVyIHx8IGtvLm9ic2VydmFibGUoJ0xvY2F0ZSBhIFBsYWNlIG9yIEFkZHJlc3MnKTtcbiAgICAgICAgdGhpcy5hbmNob3JMYXllcklkID0gcGFyYW1zLmFuY2hvckxheWVySWQ7XG4gICAgICAgIHRoaXMuYXBpS2V5ID0gcGFyYW1zLmFwaV9rZXkoKSB8fCBhcmNoZXMubWFwYm94QXBpS2V5O1xuICAgICAgICB0aGlzLm1hcCA9IHBhcmFtcy5tYXA7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0aW9uKG51bGwpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdHMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBzZWxmLm9wdGlvbnMoW10pO1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnLy9hcGkubWFwYm94LmNvbS9nZW9jb2RpbmcvdjUvbWFwYm94LnBsYWNlcy8nKyBzZWxmLnF1ZXJ5KCkgKyAnLmpzb24nLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW46IGtvLnVud3JhcChzZWxmLmFwaUtleSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gXy5tYXAocmVzLmZlYXR1cmVzLCBmdW5jdGlvbihmZWF0dXJlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOmZlYXR1cmVbJ2lkJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0JzpmZWF0dXJlWydwbGFjZV9uYW1lJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdnZW9tZXRyeSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIlBvaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlWydnZW9tZXRyeSddWydjb29yZGluYXRlcyddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmVbJ2dlb21ldHJ5J11bJ2Nvb3JkaW5hdGVzJ11bMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnF1ZXJ5LnN1YnNjcmliZSh0aGlzLnVwZGF0ZVJlc3VsdHMpO1xuXG4gICAgICAgIHRoaXMuaXNGb2N1c2VkLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuZm9jdXNJdGVtKG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHRlbXBsYXRlOiBnZW9jb2RlclRlbXBsYXRlLFxufSk7XG4iXSwibmFtZXMiOlsiJCIsIl8iLCJrbyIsImFyY2hlcyIsIkJhc2VHZW9jb2RlclZpZXdNb2RlbCIsImdlb2NvZGVyVGVtcGxhdGUiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJhcHBseSIsInNlbGYiLCJwbGFjZWhvbGRlciIsIm9ic2VydmFibGUiLCJhbmNob3JMYXllcklkIiwiYXBpS2V5IiwiYXBpX2tleSIsIm1hcGJveEFwaUtleSIsIm1hcCIsIm9wdGlvbnMiLCJzdWJzY3JpYmUiLCJzZWxlY3Rpb24iLCJ1cGRhdGVSZXN1bHRzIiwiZGF0YSIsImxlbmd0aCIsImxvYWRpbmciLCJhamF4IiwidHlwZSIsInVybCIsInF1ZXJ5IiwiYWNjZXNzX3Rva2VuIiwidW53cmFwIiwic3VjY2VzcyIsInJlcyIsInJlc3VsdHMiLCJmZWF0dXJlcyIsImZlYXR1cmUiLCJjb21wbGV0ZSIsImlzRm9jdXNlZCIsImZvY3VzSXRlbSIsInRlbXBsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==