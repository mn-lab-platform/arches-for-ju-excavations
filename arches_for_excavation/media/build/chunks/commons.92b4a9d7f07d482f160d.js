"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[96613],{

/***/ 96613:
/*!*********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/simple-switch.js + 1 modules ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ simple_switch)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/widget.js
var widget = __webpack_require__(77260);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/simple-switch.htm
const simple_switch_namespaceObject = "templates/views/components/simple-switch.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/key-events-click.js
var key_events_click = __webpack_require__(40513);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/simple-switch.js





/**
* knockout components namespace used in arches
* @external "ko.components"
* @see http://knockoutjs.com/documentation/component-binding.html
*/

/**
* registers a switch-widget component for use in forms
* @function external:"ko.components".simple-switch
* @param {object} params
* @param {boolean} params.value - the value being managed
* @param {object} params.config -
* @param {string} params.config.label - label to use alongside the select input
* @param {string} params.config.subtitle - subtitle to use alongside the select input
* @param {string|true} [params.config.on=true] - the value to use for the "on" state of the switch
* @param {string|false} [params.config.off=false] - the value to use for the "off" state of the switch
*/
/* harmony default export */ const simple_switch = (knockout_latest_default().components.register('views/components/simple-switch', {
  viewModel: function viewModel(params) {
    params.configKeys = ['subtitle'];
    widget["default"].apply(this, [params]);
    this.on = this.config().on || true;
    this.off = this.config().off || false;
    this.setvalue = this.config().setvalue || function (self, evt) {
      if (self.value() === self.on) {
        self.value(self.off);
      } else {
        self.value(self.on);
      }
    };
    this.getvalue = this.config().getvalue || knockout_latest_default().computed(function () {
      return this.value() === this.on;
    }, this);
  },
  template: simple_switch_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOTJiNGE5ZDdmMDdkNDgyZjE2MGQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ3NCO0FBQ2dDO0FBQzdDOztBQUduQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBZUEsb0NBQWEsQ0FBQ0ksUUFBUSxDQUFDLGdDQUFnQyxFQUFFO0VBQ3BFQyxTQUFTLEVBQUUsU0FBWEEsU0FBU0EsQ0FBV0MsTUFBTSxFQUFFO0lBQ3hCQSxNQUFNLENBQUNDLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNoQ04saUJBQWUsQ0FBQ08sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDRixNQUFNLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUNHLEVBQUUsR0FBRyxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUNELEVBQUUsSUFBSSxJQUFJO0lBQ2xDLElBQUksQ0FBQ0UsR0FBRyxHQUFHLElBQUksQ0FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQ0MsR0FBRyxJQUFJLEtBQUs7SUFDckMsSUFBSSxDQUFDQyxRQUFRLEdBQUcsSUFBSSxDQUFDRixNQUFNLENBQUMsQ0FBQyxDQUFDRSxRQUFRLElBQUksVUFBU0MsSUFBSSxFQUFFQyxHQUFHLEVBQUM7TUFDekQsSUFBR0QsSUFBSSxDQUFDRSxLQUFLLENBQUMsQ0FBQyxLQUFLRixJQUFJLENBQUNKLEVBQUUsRUFBQztRQUN4QkksSUFBSSxDQUFDRSxLQUFLLENBQUNGLElBQUksQ0FBQ0YsR0FBRyxDQUFDO01BQ3hCLENBQUMsTUFBSTtRQUNERSxJQUFJLENBQUNFLEtBQUssQ0FBQ0YsSUFBSSxDQUFDSixFQUFFLENBQUM7TUFDdkI7SUFDSixDQUFDO0lBQ0QsSUFBSSxDQUFDTyxRQUFRLEdBQUcsSUFBSSxDQUFDTixNQUFNLENBQUMsQ0FBQyxDQUFDTSxRQUFRLElBQUloQixrQ0FBVyxDQUFDLFlBQVU7TUFDNUQsT0FBTyxJQUFJLENBQUNlLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDTixFQUFFO0lBQ25DLENBQUMsRUFBRSxJQUFJLENBQUM7RUFDWixDQUFDO0VBQ0RTLFFBQVEsRUFBRWhCLDZCQUFvQkE7QUFDbEMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3NpbXBsZS1zd2l0Y2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBXaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy93aWRnZXQnO1xuaW1wb3J0IHNpbXBsZVN3aXRjaFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3NpbXBsZS1zd2l0Y2guaHRtJztcbmltcG9ydCAnYmluZGluZ3Mva2V5LWV2ZW50cy1jbGljayc7XG5cblxuLyoqXG4qIGtub2Nrb3V0IGNvbXBvbmVudHMgbmFtZXNwYWNlIHVzZWQgaW4gYXJjaGVzXG4qIEBleHRlcm5hbCBcImtvLmNvbXBvbmVudHNcIlxuKiBAc2VlIGh0dHA6Ly9rbm9ja291dGpzLmNvbS9kb2N1bWVudGF0aW9uL2NvbXBvbmVudC1iaW5kaW5nLmh0bWxcbiovXG5cbi8qKlxuKiByZWdpc3RlcnMgYSBzd2l0Y2gtd2lkZ2V0IGNvbXBvbmVudCBmb3IgdXNlIGluIGZvcm1zXG4qIEBmdW5jdGlvbiBleHRlcm5hbDpcImtvLmNvbXBvbmVudHNcIi5zaW1wbGUtc3dpdGNoXG4qIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiogQHBhcmFtIHtib29sZWFufSBwYXJhbXMudmFsdWUgLSB0aGUgdmFsdWUgYmVpbmcgbWFuYWdlZFxuKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zLmNvbmZpZyAtXG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLmxhYmVsIC0gbGFiZWwgdG8gdXNlIGFsb25nc2lkZSB0aGUgc2VsZWN0IGlucHV0XG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLnN1YnRpdGxlIC0gc3VidGl0bGUgdG8gdXNlIGFsb25nc2lkZSB0aGUgc2VsZWN0IGlucHV0XG4qIEBwYXJhbSB7c3RyaW5nfHRydWV9IFtwYXJhbXMuY29uZmlnLm9uPXRydWVdIC0gdGhlIHZhbHVlIHRvIHVzZSBmb3IgdGhlIFwib25cIiBzdGF0ZSBvZiB0aGUgc3dpdGNoXG4qIEBwYXJhbSB7c3RyaW5nfGZhbHNlfSBbcGFyYW1zLmNvbmZpZy5vZmY9ZmFsc2VdIC0gdGhlIHZhbHVlIHRvIHVzZSBmb3IgdGhlIFwib2ZmXCIgc3RhdGUgb2YgdGhlIHN3aXRjaFxuKi9cbmV4cG9ydCBkZWZhdWx0IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3ZpZXdzL2NvbXBvbmVudHMvc2ltcGxlLXN3aXRjaCcsIHtcbiAgICB2aWV3TW9kZWw6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICBwYXJhbXMuY29uZmlnS2V5cyA9IFsnc3VidGl0bGUnXTtcbiAgICAgICAgV2lkZ2V0Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcbiAgICAgICAgdGhpcy5vbiA9IHRoaXMuY29uZmlnKCkub24gfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5vZmYgPSB0aGlzLmNvbmZpZygpLm9mZiB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXR2YWx1ZSA9IHRoaXMuY29uZmlnKCkuc2V0dmFsdWUgfHwgZnVuY3Rpb24oc2VsZiwgZXZ0KXtcbiAgICAgICAgICAgIGlmKHNlbGYudmFsdWUoKSA9PT0gc2VsZi5vbil7XG4gICAgICAgICAgICAgICAgc2VsZi52YWx1ZShzZWxmLm9mZik7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbHVlKHNlbGYub24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldHZhbHVlID0gdGhpcy5jb25maWcoKS5nZXR2YWx1ZSB8fCBrby5jb21wdXRlZChmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUoKSA9PT0gdGhpcy5vbjtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogc2ltcGxlU3dpdGNoVGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsIldpZGdldFZpZXdNb2RlbCIsInNpbXBsZVN3aXRjaFRlbXBsYXRlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwicGFyYW1zIiwiY29uZmlnS2V5cyIsImFwcGx5Iiwib24iLCJjb25maWciLCJvZmYiLCJzZXR2YWx1ZSIsInNlbGYiLCJldnQiLCJ2YWx1ZSIsImdldHZhbHVlIiwiY29tcHV0ZWQiLCJ0ZW1wbGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9