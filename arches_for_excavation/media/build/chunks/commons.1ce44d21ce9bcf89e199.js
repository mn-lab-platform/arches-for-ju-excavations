"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[7055],{

/***/ 7055:
/*!**************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/datepicker.js + 1 modules ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ widgets_datepicker)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/widget.js
var widget = __webpack_require__(77260);
// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(95093);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/datepicker.htm
const datepicker_namespaceObject = "templates/views/components/widgets/datepicker.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/datepicker.js
var datepicker = __webpack_require__(72253);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/moment-date.js
var moment_date = __webpack_require__(58920);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/chosen.js
var chosen = __webpack_require__(63777);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/key-events-click.js
var key_events_click = __webpack_require__(40513);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/datepicker.js











/**
 * registers a datepicker-widget component for use in forms
 * @function external:"ko.components".datepicker-widget
 * @param {object} params
 * @param {date} params.value - the value being managed
 * @param {object} params.config -
 * @param {string} params.config.label - label to use alongside the text input
 * @param {string} params.config.minDate - Minimum date allowed to be chosen
 * @param {string} params.config.maxDate - Maximum date allowed to be chosen
 * @param {string} params.config.viewMode - The default view to display when the picker is shown. (Accepts: 'decades','years','months','days')
 * @param {string} params.config.dateFormat - Format of the date to display. (See moment.js' options for format: http://momentjs.com/docs/#/displaying/format/)
 */

var DatePickerWidget = function DatePickerWidget(params) {
  var self = this;
  params.configKeys = ['minDate', 'maxDate', 'viewMode', 'dateFormat', 'defaultValue'];
  widget["default"].apply(this, [params]);
  if (self.node.config && knockout_latest_default().unwrap(self.node.config.dateFormat)) {
    this.dateFormat(knockout_latest_default().unwrap(self.node.config.dateFormat));
  }
  if (!knockout_latest_default().unwrap(this.dateFormat)) {
    this.dateFormat = knockout_latest_default().observable(self.node.datatypeLookup.date.config);
  }
  this.placeholder = this.config().placeholder;
  this.viewModeOptions = knockout_latest_default().observableArray([{
    'id': 'days',
    'name': 'Days'
  }, {
    'id': 'months',
    'name': 'Months'
  }, {
    'id': 'years',
    'name': 'Years'
  }, {
    'id': 'decades',
    'name': 'Decades'
  }]);
  this.onViewModeSelection = function (val, e) {
    this.viewMode(e.currentTarget.value);
  };
  this.on = this.config().on || 'Date of Data Entry';
  this.off = this.config().off || '';
  this.setvalue = this.config().setvalue || function (self) {
    if (self.defaultValue() === self.on) {
      self.defaultValue(self.off);
    } else {
      self.defaultValue(self.on);
    }
  };
  this.setdefault = this.config().setdefault || function (self) {
    if (self.defaultValue() === self.on) {
      self.defaultValue(self.off);
    } else {
      self.defaultValue(self.on);
    }
  };
  this.getdefault = this.config().getdefault || knockout_latest_default().computed(function () {
    return this.defaultValue() == this.on;
  }, this);
  if (self.form && this.defaultValue() === 'Date of Data Entry') {
    if (this.value() === 'Date of Data Entry') {
      var today = new Date();
      self.value(today.toLocaleDateString("en-CA")); //"en-CA" formats the date in the desired format YYYY-MM-DD
      var tileData = JSON.parse(self.tile._tileData());
      tileData[this.node.id] = today.toLocaleDateString("en-CA");
      self.tile._tileData(knockout_mapping_min_default().toJSON(tileData));
    }
  }
  this.disposables.push(this.getdefault);
};
/* harmony default export */ const widgets_datepicker = (knockout_latest_default().components.register('datepicker-widget', {
  viewModel: DatePickerWidget,
  template: datepicker_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMWNlNDRkMjFjZTliY2Y4OWUxOTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNlO0FBQ2Q7QUFDcUI7QUFDcEI7QUFDNkQ7QUFDNUQ7QUFDQztBQUNMO0FBQ1U7O0FBR25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJTSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCQSxDQUFZQyxNQUFNLEVBQUU7RUFDcEMsSUFBSUMsSUFBSSxHQUFHLElBQUk7RUFDZkQsTUFBTSxDQUFDRSxVQUFVLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDO0VBRXBGTixpQkFBZSxDQUFDTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUNILE1BQU0sQ0FBQyxDQUFDO0VBRXJDLElBQUlDLElBQUksQ0FBQ0csSUFBSSxDQUFDQyxNQUFNLElBQUlaLGdDQUFTLENBQUNRLElBQUksQ0FBQ0csSUFBSSxDQUFDQyxNQUFNLENBQUNFLFVBQVUsQ0FBQyxFQUFFO0lBQzVELElBQUksQ0FBQ0EsVUFBVSxDQUFDZCxnQ0FBUyxDQUFDUSxJQUFJLENBQUNHLElBQUksQ0FBQ0MsTUFBTSxDQUFDRSxVQUFVLENBQUMsQ0FBQztFQUMzRDtFQUNBLElBQUksQ0FBQ2QsZ0NBQVMsQ0FBQyxJQUFJLENBQUNjLFVBQVUsQ0FBQyxFQUFFO0lBQzdCLElBQUksQ0FBQ0EsVUFBVSxHQUFHZCxvQ0FBYSxDQUFDUSxJQUFJLENBQUNHLElBQUksQ0FBQ0ssY0FBYyxDQUFDQyxJQUFJLENBQUNMLE1BQU0sQ0FBQztFQUN6RTtFQUVBLElBQUksQ0FBQ00sV0FBVyxHQUFHLElBQUksQ0FBQ04sTUFBTSxDQUFDLENBQUMsQ0FBQ00sV0FBVztFQUM1QyxJQUFJLENBQUNDLGVBQWUsR0FBR25CLHlDQUFrQixDQUFDLENBQUM7SUFDdkMsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUU7RUFDWixDQUFDLEVBQUU7SUFDQyxJQUFJLEVBQUUsUUFBUTtJQUNkLE1BQU0sRUFBRTtFQUNaLENBQUMsRUFBRTtJQUNDLElBQUksRUFBRSxPQUFPO0lBQ2IsTUFBTSxFQUFFO0VBQ1osQ0FBQyxFQUFFO0lBQ0MsSUFBSSxFQUFFLFNBQVM7SUFDZixNQUFNLEVBQUU7RUFDWixDQUFDLENBQUMsQ0FBQztFQUVILElBQUksQ0FBQ3FCLG1CQUFtQixHQUFHLFVBQVNDLEdBQUcsRUFBRUMsQ0FBQyxFQUFFO0lBQ3hDLElBQUksQ0FBQ0MsUUFBUSxDQUFDRCxDQUFDLENBQUNFLGFBQWEsQ0FBQ0MsS0FBSyxDQUFDO0VBQ3hDLENBQUM7RUFFRCxJQUFJLENBQUNDLEVBQUUsR0FBRyxJQUFJLENBQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUNlLEVBQUUsSUFBSSxvQkFBb0I7RUFDbEQsSUFBSSxDQUFDQyxHQUFHLEdBQUcsSUFBSSxDQUFDaEIsTUFBTSxDQUFDLENBQUMsQ0FBQ2dCLEdBQUcsSUFBSSxFQUFFO0VBQ2xDLElBQUksQ0FBQ0MsUUFBUSxHQUFHLElBQUksQ0FBQ2pCLE1BQU0sQ0FBQyxDQUFDLENBQUNpQixRQUFRLElBQUksVUFBU3JCLElBQUksRUFBQztJQUNwRCxJQUFHQSxJQUFJLENBQUNzQixZQUFZLENBQUMsQ0FBQyxLQUFLdEIsSUFBSSxDQUFDbUIsRUFBRSxFQUFDO01BQy9CbkIsSUFBSSxDQUFDc0IsWUFBWSxDQUFDdEIsSUFBSSxDQUFDb0IsR0FBRyxDQUFDO0lBQy9CLENBQUMsTUFBSTtNQUNEcEIsSUFBSSxDQUFDc0IsWUFBWSxDQUFDdEIsSUFBSSxDQUFDbUIsRUFBRSxDQUFDO0lBQzlCO0VBQ0osQ0FBQztFQUVELElBQUksQ0FBQ0ksVUFBVSxHQUFHLElBQUksQ0FBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUNtQixVQUFVLElBQUksVUFBU3ZCLElBQUksRUFBQztJQUN4RCxJQUFHQSxJQUFJLENBQUNzQixZQUFZLENBQUMsQ0FBQyxLQUFLdEIsSUFBSSxDQUFDbUIsRUFBRSxFQUFDO01BQy9CbkIsSUFBSSxDQUFDc0IsWUFBWSxDQUFDdEIsSUFBSSxDQUFDb0IsR0FBRyxDQUFDO0lBQy9CLENBQUMsTUFBSTtNQUNEcEIsSUFBSSxDQUFDc0IsWUFBWSxDQUFDdEIsSUFBSSxDQUFDbUIsRUFBRSxDQUFDO0lBQzlCO0VBQ0osQ0FBQztFQUVELElBQUksQ0FBQ0ssVUFBVSxHQUFHLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQyxDQUFDLENBQUNvQixVQUFVLElBQUloQyxrQ0FBVyxDQUFDLFlBQVU7SUFDaEUsT0FBTyxJQUFJLENBQUM4QixZQUFZLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQ0gsRUFBRTtFQUN6QyxDQUFDLEVBQUUsSUFBSSxDQUFDO0VBRVIsSUFBSW5CLElBQUksQ0FBQzBCLElBQUksSUFBSSxJQUFJLENBQUNKLFlBQVksQ0FBQyxDQUFDLEtBQUssb0JBQW9CLEVBQUU7SUFDM0QsSUFBSSxJQUFJLENBQUNKLEtBQUssQ0FBQyxDQUFDLEtBQUssb0JBQW9CLEVBQUU7TUFDdkMsSUFBTVMsS0FBSyxHQUFHLElBQUlDLElBQUksQ0FBQyxDQUFDO01BQ3hCNUIsSUFBSSxDQUFDa0IsS0FBSyxDQUFDUyxLQUFLLENBQUNFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUMvQyxJQUFNQyxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDaEMsSUFBSSxDQUFDaUMsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQyxDQUFDO01BQ2xESixRQUFRLENBQUMsSUFBSSxDQUFDM0IsSUFBSSxDQUFDZ0MsRUFBRSxDQUFDLEdBQUdSLEtBQUssQ0FBQ0Usa0JBQWtCLENBQUMsT0FBTyxDQUFDO01BQzFEN0IsSUFBSSxDQUFDaUMsSUFBSSxDQUFDQyxTQUFTLENBQUN6QyxxQ0FBZ0IsQ0FBQ3FDLFFBQVEsQ0FBQyxDQUFDO0lBQ25EO0VBQ0o7RUFFQSxJQUFJLENBQUNPLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ2QsVUFBVSxDQUFDO0FBQzFDLENBQUM7QUFFRCx5REFBZWhDLG9DQUFhLENBQUNnRCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7RUFDdkRDLFNBQVMsRUFBRTNDLGdCQUFnQjtFQUMzQjRDLFFBQVEsRUFBRTdDLDBCQUF3QkE7QUFDdEMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvZGF0ZXBpY2tlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGtvTWFwcGluZyBmcm9tICdrbm9ja291dC1tYXBwaW5nJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IFdpZGdldFZpZXdNb2RlbCBmcm9tICd2aWV3bW9kZWxzL3dpZGdldCc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgZGF0ZVBpY2tlcldpZGdldFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvZGF0ZXBpY2tlci5odG0nO1xuaW1wb3J0ICdiaW5kaW5ncy9kYXRlcGlja2VyJztcbmltcG9ydCAnYmluZGluZ3MvbW9tZW50LWRhdGUnO1xuaW1wb3J0ICdiaW5kaW5ncy9jaG9zZW4nO1xuaW1wb3J0ICdiaW5kaW5ncy9rZXktZXZlbnRzLWNsaWNrJztcblxuXG4vKipcbiAqIHJlZ2lzdGVycyBhIGRhdGVwaWNrZXItd2lkZ2V0IGNvbXBvbmVudCBmb3IgdXNlIGluIGZvcm1zXG4gKiBAZnVuY3Rpb24gZXh0ZXJuYWw6XCJrby5jb21wb25lbnRzXCIuZGF0ZXBpY2tlci13aWRnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiAqIEBwYXJhbSB7ZGF0ZX0gcGFyYW1zLnZhbHVlIC0gdGhlIHZhbHVlIGJlaW5nIG1hbmFnZWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMuY29uZmlnIC1cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLmxhYmVsIC0gbGFiZWwgdG8gdXNlIGFsb25nc2lkZSB0aGUgdGV4dCBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcubWluRGF0ZSAtIE1pbmltdW0gZGF0ZSBhbGxvd2VkIHRvIGJlIGNob3NlblxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcubWF4RGF0ZSAtIE1heGltdW0gZGF0ZSBhbGxvd2VkIHRvIGJlIGNob3NlblxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcudmlld01vZGUgLSBUaGUgZGVmYXVsdCB2aWV3IHRvIGRpc3BsYXkgd2hlbiB0aGUgcGlja2VyIGlzIHNob3duLiAoQWNjZXB0czogJ2RlY2FkZXMnLCd5ZWFycycsJ21vbnRocycsJ2RheXMnKVxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcuZGF0ZUZvcm1hdCAtIEZvcm1hdCBvZiB0aGUgZGF0ZSB0byBkaXNwbGF5LiAoU2VlIG1vbWVudC5qcycgb3B0aW9ucyBmb3IgZm9ybWF0OiBodHRwOi8vbW9tZW50anMuY29tL2RvY3MvIy9kaXNwbGF5aW5nL2Zvcm1hdC8pXG4gKi9cblxudmFyIERhdGVQaWNrZXJXaWRnZXQgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcGFyYW1zLmNvbmZpZ0tleXMgPSBbJ21pbkRhdGUnLCAnbWF4RGF0ZScsICd2aWV3TW9kZScsICdkYXRlRm9ybWF0JywgJ2RlZmF1bHRWYWx1ZSddO1xuXG4gICAgV2lkZ2V0Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcblxuICAgIGlmIChzZWxmLm5vZGUuY29uZmlnICYmIGtvLnVud3JhcChzZWxmLm5vZGUuY29uZmlnLmRhdGVGb3JtYXQpKSB7XG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdChrby51bndyYXAoc2VsZi5ub2RlLmNvbmZpZy5kYXRlRm9ybWF0KSk7XG4gICAgfVxuICAgIGlmICgha28udW53cmFwKHRoaXMuZGF0ZUZvcm1hdCkpIHtcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0ga28ub2JzZXJ2YWJsZShzZWxmLm5vZGUuZGF0YXR5cGVMb29rdXAuZGF0ZS5jb25maWcpO1xuICAgIH0gXG5cbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5jb25maWcoKS5wbGFjZWhvbGRlcjtcbiAgICB0aGlzLnZpZXdNb2RlT3B0aW9ucyA9IGtvLm9ic2VydmFibGVBcnJheShbe1xuICAgICAgICAnaWQnOiAnZGF5cycsXG4gICAgICAgICduYW1lJzogJ0RheXMnXG4gICAgfSwge1xuICAgICAgICAnaWQnOiAnbW9udGhzJyxcbiAgICAgICAgJ25hbWUnOiAnTW9udGhzJ1xuICAgIH0sIHtcbiAgICAgICAgJ2lkJzogJ3llYXJzJyxcbiAgICAgICAgJ25hbWUnOiAnWWVhcnMnXG4gICAgfSwge1xuICAgICAgICAnaWQnOiAnZGVjYWRlcycsXG4gICAgICAgICduYW1lJzogJ0RlY2FkZXMnXG4gICAgfV0pO1xuXG4gICAgdGhpcy5vblZpZXdNb2RlU2VsZWN0aW9uID0gZnVuY3Rpb24odmFsLCBlKSB7XG4gICAgICAgIHRoaXMudmlld01vZGUoZS5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5vbiA9IHRoaXMuY29uZmlnKCkub24gfHwgJ0RhdGUgb2YgRGF0YSBFbnRyeSc7XG4gICAgdGhpcy5vZmYgPSB0aGlzLmNvbmZpZygpLm9mZiB8fCAnJztcbiAgICB0aGlzLnNldHZhbHVlID0gdGhpcy5jb25maWcoKS5zZXR2YWx1ZSB8fCBmdW5jdGlvbihzZWxmKXtcbiAgICAgICAgaWYoc2VsZi5kZWZhdWx0VmFsdWUoKSA9PT0gc2VsZi5vbil7XG4gICAgICAgICAgICBzZWxmLmRlZmF1bHRWYWx1ZShzZWxmLm9mZik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2VsZi5kZWZhdWx0VmFsdWUoc2VsZi5vbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zZXRkZWZhdWx0ID0gdGhpcy5jb25maWcoKS5zZXRkZWZhdWx0IHx8IGZ1bmN0aW9uKHNlbGYpe1xuICAgICAgICBpZihzZWxmLmRlZmF1bHRWYWx1ZSgpID09PSBzZWxmLm9uKXtcbiAgICAgICAgICAgIHNlbGYuZGVmYXVsdFZhbHVlKHNlbGYub2ZmKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZWxmLmRlZmF1bHRWYWx1ZShzZWxmLm9uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldGRlZmF1bHQgPSB0aGlzLmNvbmZpZygpLmdldGRlZmF1bHQgfHwga28uY29tcHV0ZWQoZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFZhbHVlKCkgPT0gdGhpcy5vbjtcbiAgICB9LCB0aGlzKTtcblxuICAgIGlmIChzZWxmLmZvcm0gJiYgdGhpcy5kZWZhdWx0VmFsdWUoKSA9PT0gJ0RhdGUgb2YgRGF0YSBFbnRyeScpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUoKSA9PT0gJ0RhdGUgb2YgRGF0YSBFbnRyeScpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHNlbGYudmFsdWUodG9kYXkudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tQ0FcIikpOyAvL1wiZW4tQ0FcIiBmb3JtYXRzIHRoZSBkYXRlIGluIHRoZSBkZXNpcmVkIGZvcm1hdCBZWVlZLU1NLUREXG4gICAgICAgICAgICBjb25zdCB0aWxlRGF0YSA9IEpTT04ucGFyc2Uoc2VsZi50aWxlLl90aWxlRGF0YSgpKTtcbiAgICAgICAgICAgIHRpbGVEYXRhW3RoaXMubm9kZS5pZF0gPSB0b2RheS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1DQVwiKTtcbiAgICAgICAgICAgIHNlbGYudGlsZS5fdGlsZURhdGEoa29NYXBwaW5nLnRvSlNPTih0aWxlRGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKHRoaXMuZ2V0ZGVmYXVsdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdkYXRlcGlja2VyLXdpZGdldCcsIHtcbiAgICB2aWV3TW9kZWw6IERhdGVQaWNrZXJXaWRnZXQsXG4gICAgdGVtcGxhdGU6IGRhdGVQaWNrZXJXaWRnZXRUZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbImtvIiwia29NYXBwaW5nIiwiXyIsIldpZGdldFZpZXdNb2RlbCIsIm1vbWVudCIsImRhdGVQaWNrZXJXaWRnZXRUZW1wbGF0ZSIsIkRhdGVQaWNrZXJXaWRnZXQiLCJwYXJhbXMiLCJzZWxmIiwiY29uZmlnS2V5cyIsImFwcGx5Iiwibm9kZSIsImNvbmZpZyIsInVud3JhcCIsImRhdGVGb3JtYXQiLCJvYnNlcnZhYmxlIiwiZGF0YXR5cGVMb29rdXAiLCJkYXRlIiwicGxhY2Vob2xkZXIiLCJ2aWV3TW9kZU9wdGlvbnMiLCJvYnNlcnZhYmxlQXJyYXkiLCJvblZpZXdNb2RlU2VsZWN0aW9uIiwidmFsIiwiZSIsInZpZXdNb2RlIiwiY3VycmVudFRhcmdldCIsInZhbHVlIiwib24iLCJvZmYiLCJzZXR2YWx1ZSIsImRlZmF1bHRWYWx1ZSIsInNldGRlZmF1bHQiLCJnZXRkZWZhdWx0IiwiY29tcHV0ZWQiLCJmb3JtIiwidG9kYXkiLCJEYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwidGlsZURhdGEiLCJKU09OIiwicGFyc2UiLCJ0aWxlIiwiX3RpbGVEYXRhIiwiaWQiLCJ0b0pTT04iLCJkaXNwb3NhYmxlcyIsInB1c2giLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ2aWV3TW9kZWwiLCJ0ZW1wbGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9