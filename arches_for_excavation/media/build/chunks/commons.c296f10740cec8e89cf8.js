"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[78986],{

/***/ 78986:
/*!********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/edtf.js + 1 modules ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ edtf)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/widget.js
var widget = __webpack_require__(77260);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/edtf.htm
const edtf_namespaceObject = "templates/views/components/widgets/edtf.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/key-events-click.js
var key_events_click = __webpack_require__(40513);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/edtf.js







/**
* registers a edtf-widget component for use in forms
* @function external:"ko.components".edtf-widget
* @param {object} params
* @param {string} params.value - the value being managed
* @param {function} params.config - observable containing config object
* @param {string} params.config().label - label to use alongside the text input
* @param {string} params.config().placeholder - default text to show in the text input
*/

var viewModel = function viewModel(params) {
  var self = this;
  params.configKeys = ['placeholder', 'defaultValue'];
  this.showEDTFFormats = knockout_latest_default().observable(false);
  this.transformedEdtf = knockout_latest_default().observable();
  this.getEdtf = function (val) {
    window.fetch(arches["default"].urls.transform_edtf_for_tile + "?value=" + val).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        self.transformedEdtf(null);
      }
    }).then(function (json) {
      var _json$data;
      if (json !== null && json !== void 0 && (_json$data = json.data) !== null && _json$data !== void 0 && _json$data[1]) {
        self.transformedEdtf(json.data[0]);
      } else {
        self.transformedEdtf(null);
      }
    });
  };
  this.getEdtf(knockout_latest_default().unwrap(params.value));
  if (params.state !== 'report') {
    params.value.subscribe(function (val) {
      self.getEdtf(val);
    });
  }
  widget["default"].apply(this, [params]);
};
/* harmony default export */ const edtf = (knockout_latest_default().components.register('edtf-widget', {
  viewModel: viewModel,
  template: edtf_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYzI5NmYxMDc0MGNlYzhlODljZjguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNDO0FBQ0M7QUFDb0I7QUFDdUI7QUFDcEM7O0FBR25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNSyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBWUMsTUFBTSxFQUFFO0VBQy9CLElBQU1DLElBQUksR0FBRyxJQUFJO0VBRWpCRCxNQUFNLENBQUNFLFVBQVUsR0FBRyxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUM7RUFDbkQsSUFBSSxDQUFDQyxlQUFlLEdBQUdULG9DQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDLElBQUksQ0FBQ1csZUFBZSxHQUFHWCxvQ0FBYSxDQUFDLENBQUM7RUFDdEMsSUFBSSxDQUFDWSxPQUFPLEdBQUcsVUFBQUMsR0FBRyxFQUFJO0lBQUNDLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDYixpQkFBTSxDQUFDYyxJQUFJLENBQUNDLHVCQUF1QixHQUFHLFNBQVMsR0FBR0osR0FBRyxDQUFDLENBQ3JGSyxJQUFJLENBQUMsVUFBQUMsUUFBUSxFQUFJO01BQ2QsSUFBR0EsUUFBUSxDQUFDQyxFQUFFLEVBQUU7UUFDWixPQUFPRCxRQUFRLENBQUNFLElBQUksQ0FBQyxDQUFDO01BQzFCLENBQUMsTUFBTTtRQUNIZCxJQUFJLENBQUNJLGVBQWUsQ0FBQyxJQUFJLENBQUM7TUFDOUI7SUFDSixDQUFDLENBQUMsQ0FDRE8sSUFBSSxDQUFDLFVBQUFHLElBQUksRUFBSTtNQUFBLElBQUFDLFVBQUE7TUFDVixJQUFJRCxJQUFJLGFBQUpBLElBQUksZ0JBQUFDLFVBQUEsR0FBSkQsSUFBSSxDQUFFRSxJQUFJLGNBQUFELFVBQUEsZUFBVkEsVUFBQSxDQUFhLENBQUMsQ0FBQyxFQUFFO1FBQ2pCZixJQUFJLENBQUNJLGVBQWUsQ0FBQ1UsSUFBSSxDQUFDRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDdEMsQ0FBQyxNQUFNO1FBQ0hoQixJQUFJLENBQUNJLGVBQWUsQ0FBQyxJQUFJLENBQUM7TUFDOUI7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBRUQsSUFBSSxDQUFDQyxPQUFPLENBQUNaLGdDQUFTLENBQUNNLE1BQU0sQ0FBQ21CLEtBQUssQ0FBQyxDQUFDO0VBQ3JDLElBQUluQixNQUFNLENBQUNvQixLQUFLLEtBQUssUUFBUSxFQUFFO0lBQzNCcEIsTUFBTSxDQUFDbUIsS0FBSyxDQUFDRSxTQUFTLENBQUMsVUFBQWQsR0FBRyxFQUFJO01BQzFCTixJQUFJLENBQUNLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO0lBQ3JCLENBQUMsQ0FBQztFQUNOO0VBRUFWLGlCQUFlLENBQUN5QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUN0QixNQUFNLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQsMkNBQWVOLG9DQUFhLENBQUM4QixRQUFRLENBQUMsYUFBYSxFQUFFO0VBQ2pEekIsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCMEIsUUFBUSxFQUFFM0Isb0JBQVlBO0FBQzFCLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL2VkdGYuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IFdpZGdldFZpZXdNb2RlbCBmcm9tICd2aWV3bW9kZWxzL3dpZGdldCc7XG5pbXBvcnQgZWR0ZlRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvZWR0Zi5odG0nO1xuaW1wb3J0ICdiaW5kaW5ncy9rZXktZXZlbnRzLWNsaWNrJztcblxuXG4vKipcbiogcmVnaXN0ZXJzIGEgZWR0Zi13aWRnZXQgY29tcG9uZW50IGZvciB1c2UgaW4gZm9ybXNcbiogQGZ1bmN0aW9uIGV4dGVybmFsOlwia28uY29tcG9uZW50c1wiLmVkdGYtd2lkZ2V0XG4qIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy52YWx1ZSAtIHRoZSB2YWx1ZSBiZWluZyBtYW5hZ2VkXG4qIEBwYXJhbSB7ZnVuY3Rpb259IHBhcmFtcy5jb25maWcgLSBvYnNlcnZhYmxlIGNvbnRhaW5pbmcgY29uZmlnIG9iamVjdFxuKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZygpLmxhYmVsIC0gbGFiZWwgdG8gdXNlIGFsb25nc2lkZSB0aGUgdGV4dCBpbnB1dFxuKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmNvbmZpZygpLnBsYWNlaG9sZGVyIC0gZGVmYXVsdCB0ZXh0IHRvIHNob3cgaW4gdGhlIHRleHQgaW5wdXRcbiovXG5cbmNvbnN0IHZpZXdNb2RlbCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBcbiAgICBwYXJhbXMuY29uZmlnS2V5cyA9IFsncGxhY2Vob2xkZXInLCAnZGVmYXVsdFZhbHVlJ107XG4gICAgdGhpcy5zaG93RURURkZvcm1hdHMgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICB0aGlzLnRyYW5zZm9ybWVkRWR0ZiA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmdldEVkdGYgPSB2YWwgPT4ge3dpbmRvdy5mZXRjaChhcmNoZXMudXJscy50cmFuc2Zvcm1fZWR0Zl9mb3JfdGlsZSArIFwiP3ZhbHVlPVwiICsgdmFsKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3JtZWRFZHRmKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgIGlmIChqc29uPy5kYXRhPy5bMV0pIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybWVkRWR0Zihqc29uLmRhdGFbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybWVkRWR0ZihudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldEVkdGYoa28udW53cmFwKHBhcmFtcy52YWx1ZSkpO1xuICAgIGlmIChwYXJhbXMuc3RhdGUgIT09ICdyZXBvcnQnKSB7XG4gICAgICAgIHBhcmFtcy52YWx1ZS5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICAgIHNlbGYuZ2V0RWR0Zih2YWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBXaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3RlcignZWR0Zi13aWRnZXQnLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IGVkdGZUZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbImtvIiwiXyIsImFyY2hlcyIsIldpZGdldFZpZXdNb2RlbCIsImVkdGZUZW1wbGF0ZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsInNlbGYiLCJjb25maWdLZXlzIiwic2hvd0VEVEZGb3JtYXRzIiwib2JzZXJ2YWJsZSIsInRyYW5zZm9ybWVkRWR0ZiIsImdldEVkdGYiLCJ2YWwiLCJ3aW5kb3ciLCJmZXRjaCIsInVybHMiLCJ0cmFuc2Zvcm1fZWR0Zl9mb3JfdGlsZSIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwianNvbiIsIl9qc29uJGRhdGEiLCJkYXRhIiwidW53cmFwIiwidmFsdWUiLCJzdGF0ZSIsInN1YnNjcmliZSIsImFwcGx5IiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9