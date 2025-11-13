"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[69001],{

/***/ 69001:
/*!*******************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/map.js + 2 modules ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ map)
});

// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/widget.js
var widget = __webpack_require__(77260);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/map-editor.js
var map_editor = __webpack_require__(82692);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/map.htm
const map_namespaceObject = "templates/views/components/widgets/map.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/map-widget-editor.htm
const map_widget_editor_namespaceObject = "templates/views/components/map-widget-editor.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/chosen.js
var chosen = __webpack_require__(63777);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/codemirror.js
var codemirror = __webpack_require__(4425);
// EXTERNAL MODULE: ./node_modules/select-woo/dist/js/selectWoo.full.js
var selectWoo_full = __webpack_require__(95586);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/fadeVisible.js
var fadeVisible = __webpack_require__(42699);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/mapbox-gl.js
var mapbox_gl = __webpack_require__(76206);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/color-picker.js
var color_picker = __webpack_require__(49119);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/key-events-click.js
var key_events_click = __webpack_require__(40513);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/map.js















var viewModel = function viewModel(params) {
  this.context = params.type;
  this.summaryDetails = [];
  this.defaultValueOptions = [{
    "name": "",
    "defaultOptionid": 0,
    "value": ""
  }, {
    "name": "Drawn Location",
    "defaultOptionid": 1,
    "value": "Drawn Location"
  }, {
    "name": "Current Device Location",
    "defaultOptionid": 2,
    "value": "Current Device Location"
  }];
  params.configKeys = ['basemap', 'overlayConfigs', 'zoom', 'centerX', 'centerY', 'geometryTypes', 'defaultValueType', 'defaultValue'];
  widget["default"].apply(this, [params]);
  this.geometryTypeList = knockout_latest_default().computed({
    read: function read() {
      var geometryTypes = this.geometryTypes() || [];
      return geometryTypes.map(function (type) {
        return knockout_latest_default().unwrap(type.id);
      });
    },
    write: function write(value) {
      this.geometryTypes(value.map(function (type) {
        return {
          id: type,
          text: type
        };
      }));
    },
    owner: this
  });
  this.displayValue = knockout_latest_default().computed(function () {
    var value = knockout_mapping_min_default().toJS(this.value);
    if (!value || !value.features) {
      return 0;
    }
    return value.features.length;
  }, this);
  if (params.widget) {
    params.widgets = [params.widget];
  }
  if (knockout_latest_default().unwrap(this.value) !== null) {
    this.summaryDetails = knockout_mapping_min_default().toJS(this.value).features || [];
  }
  if (this.centerX() == 0 && this.centerY() == 0 && this.zoom() == 0) {
    this.centerX(arches["default"].mapDefaultX);
    this.centerY(arches["default"].mapDefaultY);
    this.zoom(arches["default"].mapDefaultZoom);
  }
  params.basemap = this.basemap;
  params.overlayConfigs = this.overlayConfigs;
  params.zoom = this.zoom;
  params.x = this.centerX;
  params.y = this.centerY;
  params.usePosition = true;
  params.inWidget = true;
  map_editor["default"].apply(this, [params]);
};
knockout_latest_default().components.register('map-widget', {
  viewModel: viewModel,
  template: map_namespaceObject
});
/* harmony default export */ const map = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZTBmZTEyZjE3YmFjMzZiNjI5YTEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMkI7QUFDRDtBQUNlO0FBQ2I7QUFDb0I7QUFDTztBQUNvQjtBQUNZO0FBQzlEO0FBQ0k7QUFDVDtBQUNVO0FBQ0Y7QUFDRztBQUNJO0FBR25DLElBQUlRLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFZQyxNQUFNLEVBQUU7RUFFN0IsSUFBSSxDQUFDQyxPQUFPLEdBQUdELE1BQU0sQ0FBQ0UsSUFBSTtFQUUxQixJQUFJLENBQUNDLGNBQWMsR0FBRyxFQUFFO0VBQ3hCLElBQUksQ0FBQ0MsbUJBQW1CLEdBQUcsQ0FDdkI7SUFDSSxNQUFNLEVBQUUsRUFBRTtJQUNWLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsT0FBTyxFQUFFO0VBQ2IsQ0FBQyxFQUNEO0lBQ0ksTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLE9BQU8sRUFBRTtFQUNiLENBQUMsRUFDRDtJQUNJLE1BQU0sRUFBRSx5QkFBeUI7SUFDakMsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixPQUFPLEVBQUU7RUFDYixDQUFDLENBQ0o7RUFFREosTUFBTSxDQUFDSyxVQUFVLEdBQUcsQ0FDaEIsU0FBUyxFQUNULGdCQUFnQixFQUNoQixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGNBQWMsQ0FDakI7RUFFRFYsaUJBQWUsQ0FBQ1csS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDTixNQUFNLENBQUMsQ0FBQztFQUVyQyxJQUFJLENBQUNPLGdCQUFnQixHQUFHZixrQ0FBVyxDQUFDO0lBQ2hDaUIsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQUEsRUFBYTtNQUNiLElBQUlDLGFBQWEsR0FBRyxJQUFJLENBQUNBLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRTtNQUM5QyxPQUFPQSxhQUFhLENBQUNDLEdBQUcsQ0FBQyxVQUFTVCxJQUFJLEVBQUU7UUFDcEMsT0FBT1YsZ0NBQVMsQ0FBQ1UsSUFBSSxDQUFDVyxFQUFFLENBQUM7TUFDN0IsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNEQyxLQUFLLEVBQUUsU0FBUEEsS0FBS0EsQ0FBV0MsS0FBSyxFQUFFO01BQ25CLElBQUksQ0FBQ0wsYUFBYSxDQUFDSyxLQUFLLENBQUNKLEdBQUcsQ0FBQyxVQUFTVCxJQUFJLEVBQUU7UUFDeEMsT0FBTztVQUNIVyxFQUFFLEVBQUVYLElBQUk7VUFDUmMsSUFBSSxFQUFFZDtRQUNWLENBQUM7TUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRGUsS0FBSyxFQUFFO0VBQ1gsQ0FBQyxDQUFDO0VBRUYsSUFBSSxDQUFDQyxZQUFZLEdBQUcxQixrQ0FBVyxDQUFDLFlBQVc7SUFDdkMsSUFBSXVCLEtBQUssR0FBR3RCLG1DQUFjLENBQUMsSUFBSSxDQUFDc0IsS0FBSyxDQUFDO0lBQ3RDLElBQUksQ0FBQ0EsS0FBSyxJQUFJLENBQUNBLEtBQUssQ0FBQ0ssUUFBUSxFQUFFO01BQzNCLE9BQU8sQ0FBQztJQUNaO0lBQ0EsT0FBT0wsS0FBSyxDQUFDSyxRQUFRLENBQUNDLE1BQU07RUFDaEMsQ0FBQyxFQUFFLElBQUksQ0FBQztFQUVSLElBQUlyQixNQUFNLENBQUNzQixNQUFNLEVBQUU7SUFDZnRCLE1BQU0sQ0FBQ3VCLE9BQU8sR0FBRyxDQUFDdkIsTUFBTSxDQUFDc0IsTUFBTSxDQUFDO0VBQ3BDO0VBRUEsSUFBSTlCLGdDQUFTLENBQUMsSUFBSSxDQUFDdUIsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ2hDLElBQUksQ0FBQ1osY0FBYyxHQUFHVixtQ0FBYyxDQUFDLElBQUksQ0FBQ3NCLEtBQUssQ0FBQyxDQUFDSyxRQUFRLElBQUksRUFBRTtFQUNuRTtFQUVBLElBQUksSUFBSSxDQUFDSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUNDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQ0MsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDaEUsSUFBSSxDQUFDRixPQUFPLENBQUM5QixpQkFBTSxDQUFDaUMsV0FBVyxDQUFDO0lBQ2hDLElBQUksQ0FBQ0YsT0FBTyxDQUFDL0IsaUJBQU0sQ0FBQ2tDLFdBQVcsQ0FBQztJQUNoQyxJQUFJLENBQUNGLElBQUksQ0FBQ2hDLGlCQUFNLENBQUNtQyxjQUFjLENBQUM7RUFDcEM7RUFFQTdCLE1BQU0sQ0FBQzhCLE9BQU8sR0FBRyxJQUFJLENBQUNBLE9BQU87RUFDN0I5QixNQUFNLENBQUMrQixjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjO0VBQzNDL0IsTUFBTSxDQUFDMEIsSUFBSSxHQUFHLElBQUksQ0FBQ0EsSUFBSTtFQUN2QjFCLE1BQU0sQ0FBQ2dDLENBQUMsR0FBRyxJQUFJLENBQUNSLE9BQU87RUFDdkJ4QixNQUFNLENBQUNpQyxDQUFDLEdBQUcsSUFBSSxDQUFDUixPQUFPO0VBQ3ZCekIsTUFBTSxDQUFDa0MsV0FBVyxHQUFHLElBQUk7RUFDekJsQyxNQUFNLENBQUNtQyxRQUFRLEdBQUcsSUFBSTtFQUV0QnZDLHFCQUFrQixDQUFDVSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUNOLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRFIsb0NBQWEsQ0FBQzZDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7RUFDakN0QyxTQUFTLEVBQUVBLFNBQVM7RUFDcEJ1QyxRQUFRLEVBQUV6QyxtQkFBaUJBO0FBQy9CLENBQUMsQ0FBQztBQUVGLDBDQUFlRSxTQUFTLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvbWFwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgV2lkZ2V0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvd2lkZ2V0JztcbmltcG9ydCBNYXBFZGl0b3JWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy9tYXAtZWRpdG9yJztcbmltcG9ydCBtYXBXaWRnZXRUZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL21hcC5odG0nO1xuaW1wb3J0IG1hcFdpZGdldEVkaXRvclRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL21hcC13aWRnZXQtZWRpdG9yLmh0bSc7XG5pbXBvcnQgJ2JpbmRpbmdzL2Nob3Nlbic7XG5pbXBvcnQgJ2JpbmRpbmdzL2NvZGVtaXJyb3InO1xuaW1wb3J0ICdzZWxlY3Qtd29vJztcbmltcG9ydCAnYmluZGluZ3MvZmFkZVZpc2libGUnO1xuaW1wb3J0ICdiaW5kaW5ncy9tYXBib3gtZ2wnO1xuaW1wb3J0ICdiaW5kaW5ncy9jb2xvci1waWNrZXInO1xuaW1wb3J0ICdiaW5kaW5ncy9rZXktZXZlbnRzLWNsaWNrJztcblxuXG52YXIgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgIFxuICAgIHRoaXMuY29udGV4dCA9IHBhcmFtcy50eXBlO1xuXG4gICAgdGhpcy5zdW1tYXJ5RGV0YWlscyA9IFtdO1xuICAgIHRoaXMuZGVmYXVsdFZhbHVlT3B0aW9ucyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICBcImRlZmF1bHRPcHRpb25pZFwiOiAwLFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkRyYXduIExvY2F0aW9uXCIsXG4gICAgICAgICAgICBcImRlZmF1bHRPcHRpb25pZFwiOiAxLFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIkRyYXduIExvY2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiQ3VycmVudCBEZXZpY2UgTG9jYXRpb25cIixcbiAgICAgICAgICAgIFwiZGVmYXVsdE9wdGlvbmlkXCI6IDIsXG4gICAgICAgICAgICBcInZhbHVlXCI6IFwiQ3VycmVudCBEZXZpY2UgTG9jYXRpb25cIlxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHBhcmFtcy5jb25maWdLZXlzID0gW1xuICAgICAgICAnYmFzZW1hcCcsXG4gICAgICAgICdvdmVybGF5Q29uZmlncycsXG4gICAgICAgICd6b29tJyxcbiAgICAgICAgJ2NlbnRlclgnLFxuICAgICAgICAnY2VudGVyWScsXG4gICAgICAgICdnZW9tZXRyeVR5cGVzJyxcbiAgICAgICAgJ2RlZmF1bHRWYWx1ZVR5cGUnLFxuICAgICAgICAnZGVmYXVsdFZhbHVlJ1xuICAgIF07XG5cbiAgICBXaWRnZXRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgdGhpcy5nZW9tZXRyeVR5cGVMaXN0ID0ga28uY29tcHV0ZWQoe1xuICAgICAgICByZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBnZW9tZXRyeVR5cGVzID0gdGhpcy5nZW9tZXRyeVR5cGVzKCkgfHwgW107XG4gICAgICAgICAgICByZXR1cm4gZ2VvbWV0cnlUeXBlcy5tYXAoZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrby51bndyYXAodHlwZS5pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmdlb21ldHJ5VHlwZXModmFsdWUubWFwKGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpZDogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdHlwZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIG93bmVyOiB0aGlzXG4gICAgfSk7XG5cbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBrb01hcHBpbmcudG9KUyh0aGlzLnZhbHVlKTtcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUuZmVhdHVyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS5mZWF0dXJlcy5sZW5ndGg7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBpZiAocGFyYW1zLndpZGdldCkge1xuICAgICAgICBwYXJhbXMud2lkZ2V0cyA9IFtwYXJhbXMud2lkZ2V0XTtcbiAgICB9XG5cbiAgICBpZiAoa28udW53cmFwKHRoaXMudmFsdWUpICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3VtbWFyeURldGFpbHMgPSBrb01hcHBpbmcudG9KUyh0aGlzLnZhbHVlKS5mZWF0dXJlcyB8fCBbXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jZW50ZXJYKCkgPT0gMCAmJiB0aGlzLmNlbnRlclkoKSA9PSAwICYmIHRoaXMuem9vbSgpID09IDApIHtcbiAgICAgICAgdGhpcy5jZW50ZXJYKGFyY2hlcy5tYXBEZWZhdWx0WCk7XG4gICAgICAgIHRoaXMuY2VudGVyWShhcmNoZXMubWFwRGVmYXVsdFkpO1xuICAgICAgICB0aGlzLnpvb20oYXJjaGVzLm1hcERlZmF1bHRab29tKTtcbiAgICB9XG5cbiAgICBwYXJhbXMuYmFzZW1hcCA9IHRoaXMuYmFzZW1hcDtcbiAgICBwYXJhbXMub3ZlcmxheUNvbmZpZ3MgPSB0aGlzLm92ZXJsYXlDb25maWdzO1xuICAgIHBhcmFtcy56b29tID0gdGhpcy56b29tO1xuICAgIHBhcmFtcy54ID0gdGhpcy5jZW50ZXJYO1xuICAgIHBhcmFtcy55ID0gdGhpcy5jZW50ZXJZO1xuICAgIHBhcmFtcy51c2VQb3NpdGlvbiA9IHRydWU7XG4gICAgcGFyYW1zLmluV2lkZ2V0ID0gdHJ1ZTtcblxuICAgIE1hcEVkaXRvclZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG59O1xuXG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKCdtYXAtd2lkZ2V0Jywge1xuICAgIHZpZXdNb2RlbDogdmlld01vZGVsLFxuICAgIHRlbXBsYXRlOiBtYXBXaWRnZXRUZW1wbGF0ZSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB2aWV3TW9kZWw7XG4iXSwibmFtZXMiOlsiXyIsImtvIiwia29NYXBwaW5nIiwiYXJjaGVzIiwiV2lkZ2V0Vmlld01vZGVsIiwiTWFwRWRpdG9yVmlld01vZGVsIiwibWFwV2lkZ2V0VGVtcGxhdGUiLCJtYXBXaWRnZXRFZGl0b3JUZW1wbGF0ZSIsInZpZXdNb2RlbCIsInBhcmFtcyIsImNvbnRleHQiLCJ0eXBlIiwic3VtbWFyeURldGFpbHMiLCJkZWZhdWx0VmFsdWVPcHRpb25zIiwiY29uZmlnS2V5cyIsImFwcGx5IiwiZ2VvbWV0cnlUeXBlTGlzdCIsImNvbXB1dGVkIiwicmVhZCIsImdlb21ldHJ5VHlwZXMiLCJtYXAiLCJ1bndyYXAiLCJpZCIsIndyaXRlIiwidmFsdWUiLCJ0ZXh0Iiwib3duZXIiLCJkaXNwbGF5VmFsdWUiLCJ0b0pTIiwiZmVhdHVyZXMiLCJsZW5ndGgiLCJ3aWRnZXQiLCJ3aWRnZXRzIiwiY2VudGVyWCIsImNlbnRlclkiLCJ6b29tIiwibWFwRGVmYXVsdFgiLCJtYXBEZWZhdWx0WSIsIm1hcERlZmF1bHRab29tIiwiYmFzZW1hcCIsIm92ZXJsYXlDb25maWdzIiwieCIsInkiLCJ1c2VQb3NpdGlvbiIsImluV2lkZ2V0IiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9