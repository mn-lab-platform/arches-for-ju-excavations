"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[97295],{

/***/ 97295:
/*!**********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/number.js + 1 modules ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ number)
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
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/number.htm
const number_namespaceObject = "templates/views/components/widgets/number.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/formattedNumber.js
var formattedNumber = __webpack_require__(98770);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/number.js







/**
* registers a text-widget component for use in forms
* @function external:"ko.components".text-widget
* @param {object} params
* @param {number} params.value - the value being managed
* @param {function} params.config - observable containing config object
* @param {string} params.config().label - label to use alongside the text input
* @param {string} params.config().placeholder - default text to show in the text input
* @param {string} params.config().uneditable - disables widget
*/

var NumberWidget = function NumberWidget(params) {
  params.configKeys = ['placeholder', 'width', 'min', 'max', 'step', 'precision', 'prefix', 'suffix', 'defaultValue', 'format', 'uneditable'];
  this.preview = arches["default"].graphs.length > 0;
  widget["default"].apply(this, [params]);
  var self = this;
  this.disable = knockout_latest_default().computed(function () {
    return knockout_latest_default().unwrap(self.disabled) || knockout_latest_default().unwrap(self.uneditable);
  }, self);
  this.updateVal = knockout_latest_default().computed(function () {
    if (self.value() !== null && self.value() !== undefined) {
      //allow a value of 0 to pass
      var val = self.value();
      if (typeof self.min() === 'number') {
        val = Number(val) < Number(self.min()) ? Number(self.min()) : Number(val);
      }
      if (typeof self.max() === 'number') {
        val = Number(val) > Number(self.max()) ? Number(self.max()) : Number(val);
      }
      if (self.precision()) {
        val = Number(val).toFixed(self.precision());
      }
    }
    return val || self.value() || null;
  }, self).extend({
    throttle: 600
  });
  if (!this.preview) {
    this.value(Number(this.updateVal()));
  }
  this.displayValue = knockout_latest_default().pureComputed(function () {
    if (self.value() !== null && self.value() !== undefined) {
      return self.value().toString();
    }
  }, self);
  if (knockout_latest_default().isObservable(this.precision)) {
    var precisionSubscription = this.precision.subscribe(function (val) {
      if (self.value() && val) {
        self.value(Number(self.value()).toFixed(val));
      }
    }, self);
    self.disposables.push(precisionSubscription);
  }
  self.disposables.push(this.updateVal);
};
/* harmony default export */ const number = (knockout_latest_default().components.register('number-widget', {
  viewModel: NumberWidget,
  template: number_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLEtBQUssSUFBSSxJQUFJUCxJQUFJLENBQUNPLEtBQUssQ0FBQyxDQUFDLEtBQUtDLFNBQVMsRUFBRTtNQUNyRCxPQUFPUixJQUFJLENBQUNPLEtBQUssQ0FBQyxDQUFDLENBQUNZLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDO0VBQ0osQ0FBQyxFQUFFbkIsSUFBSSxDQUFDO0VBRVIsSUFBSVosc0NBQWUsQ0FBQyxJQUFJLENBQUN5QixTQUFTLENBQUMsRUFBRTtJQUNqQyxJQUFJUSxxQkFBcUIsR0FBRyxJQUFJLENBQUNSLFNBQVMsQ0FBQ1MsU0FBUyxDQUFDLFVBQVNiLEdBQUcsRUFBQztNQUM5RCxJQUFJVCxJQUFJLENBQUNPLEtBQUssQ0FBQyxDQUFDLElBQUlFLEdBQUcsRUFBQztRQUNwQlQsSUFBSSxDQUFDTyxLQUFLLENBQUNJLE1BQU0sQ0FBQ1gsSUFBSSxDQUFDTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNPLE9BQU8sQ0FBQ0wsR0FBRyxDQUFDLENBQUM7TUFDakQ7SUFDSixDQUFDLEVBQUVULElBQUksQ0FBQztJQUNSQSxJQUFJLENBQUN1QixXQUFXLENBQUNDLElBQUksQ0FBQ0gscUJBQXFCLENBQUM7RUFDaEQ7RUFDQXJCLElBQUksQ0FBQ3VCLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ2xCLFNBQVMsQ0FBQztBQUN6QyxDQUFDO0FBRUQsNkNBQWVsQixvQ0FBYSxDQUFDc0MsUUFBUSxDQUFDLGVBQWUsRUFBRTtFQUNuREMsU0FBUyxFQUFFbEMsWUFBWTtFQUN2Qm1DLFFBQVEsRUFBRXBDLHNCQUFvQkE7QUFDbEMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvbnVtYmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBXaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy93aWRnZXQnO1xuaW1wb3J0IG51bWJlcldpZGdldFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvbnVtYmVyLmh0bSc7XG5pbXBvcnQgJ2JpbmRpbmdzL2Zvcm1hdHRlZE51bWJlcic7XG5cblxuLyoqXG4qIHJlZ2lzdGVycyBhIHRleHQtd2lkZ2V0IGNvbXBvbmVudCBmb3IgdXNlIGluIGZvcm1zXG4qIEBmdW5jdGlvbiBleHRlcm5hbDpcImtvLmNvbXBvbmVudHNcIi50ZXh0LXdpZGdldFxuKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXG4qIEBwYXJhbSB7bnVtYmVyfSBwYXJhbXMudmFsdWUgLSB0aGUgdmFsdWUgYmVpbmcgbWFuYWdlZFxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBwYXJhbXMuY29uZmlnIC0gb2JzZXJ2YWJsZSBjb250YWluaW5nIGNvbmZpZyBvYmplY3RcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcoKS5sYWJlbCAtIGxhYmVsIHRvIHVzZSBhbG9uZ3NpZGUgdGhlIHRleHQgaW5wdXRcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5jb25maWcoKS5wbGFjZWhvbGRlciAtIGRlZmF1bHQgdGV4dCB0byBzaG93IGluIHRoZSB0ZXh0IGlucHV0XG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnKCkudW5lZGl0YWJsZSAtIGRpc2FibGVzIHdpZGdldFxuKi9cblxudmFyIE51bWJlcldpZGdldCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHBhcmFtcy5jb25maWdLZXlzID0gWydwbGFjZWhvbGRlcicsICd3aWR0aCcsICdtaW4nLCAnbWF4JywgJ3N0ZXAnLCAncHJlY2lzaW9uJywgJ3ByZWZpeCcsICdzdWZmaXgnLCAnZGVmYXVsdFZhbHVlJywgJ2Zvcm1hdCcsICd1bmVkaXRhYmxlJ107XG4gICAgdGhpcy5wcmV2aWV3ID0gYXJjaGVzLmdyYXBocy5sZW5ndGggPiAwO1xuXG4gICAgV2lkZ2V0Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuZGlzYWJsZSA9IGtvLmNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGtvLnVud3JhcChzZWxmLmRpc2FibGVkKSB8fCBrby51bndyYXAoc2VsZi51bmVkaXRhYmxlKTtcbiAgICB9LCBzZWxmKTtcblxuICAgIHRoaXMudXBkYXRlVmFsID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKHNlbGYudmFsdWUoKSAhPT0gbnVsbCAmJiBzZWxmLnZhbHVlKCkgIT09IHVuZGVmaW5lZCkgeyAvL2FsbG93IGEgdmFsdWUgb2YgMCB0byBwYXNzXG4gICAgICAgICAgICB2YXIgdmFsID0gc2VsZi52YWx1ZSgpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLm1pbigpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHZhbCA9IE51bWJlcih2YWwpIDwgTnVtYmVyKHNlbGYubWluKCkpID8gTnVtYmVyKHNlbGYubWluKCkpIDogTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5tYXgoKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBOdW1iZXIodmFsKSA+IE51bWJlcihzZWxmLm1heCgpKSA/IE51bWJlcihzZWxmLm1heCgpKSA6IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VsZi5wcmVjaXNpb24oKSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IE51bWJlcih2YWwpLnRvRml4ZWQoc2VsZi5wcmVjaXNpb24oKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsIHx8IHNlbGYudmFsdWUoKSB8fCBudWxsO1xuICAgIH0sIHNlbGYpLmV4dGVuZCh7dGhyb3R0bGU6IDYwMH0pO1xuXG4gICAgaWYgKCF0aGlzLnByZXZpZXcpIHtcbiAgICAgICAgdGhpcy52YWx1ZShOdW1iZXIodGhpcy51cGRhdGVWYWwoKSkpO1xuICAgIH1cblxuICAgIHRoaXMuZGlzcGxheVZhbHVlID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2VsZi52YWx1ZSgpICE9PSBudWxsICYmIHNlbGYudmFsdWUoKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi52YWx1ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9LCBzZWxmKTtcblxuICAgIGlmIChrby5pc09ic2VydmFibGUodGhpcy5wcmVjaXNpb24pKSB7XG4gICAgICAgIHZhciBwcmVjaXNpb25TdWJzY3JpcHRpb24gPSB0aGlzLnByZWNpc2lvbi5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKXtcbiAgICAgICAgICAgIGlmIChzZWxmLnZhbHVlKCkgJiYgdmFsKXtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbHVlKE51bWJlcihzZWxmLnZhbHVlKCkpLnRvRml4ZWQodmFsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNlbGYpO1xuICAgICAgICBzZWxmLmRpc3Bvc2FibGVzLnB1c2gocHJlY2lzaW9uU3Vic2NyaXB0aW9uKTtcbiAgICB9XG4gICAgc2VsZi5kaXNwb3NhYmxlcy5wdXNoKHRoaXMudXBkYXRlVmFsKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ251bWJlci13aWRnZXQnLCB7XG4gICAgdmlld01vZGVsOiBOdW1iZXJXaWRnZXQsXG4gICAgdGVtcGxhdGU6IG51bWJlcldpZGdldFRlbXBsYXRlLFxufSk7XG4iXSwibmFtZXMiOlsia28iLCJfIiwiYXJjaGVzIiwiV2lkZ2V0Vmlld01vZGVsIiwibnVtYmVyV2lkZ2V0VGVtcGxhdGUiLCJOdW1iZXJXaWRnZXQiLCJwYXJhbXMiLCJjb25maWdLZXlzIiwicHJldmlldyIsImdyYXBocyIsImxlbmd0aCIsImFwcGx5Iiwic2VsZiIsImRpc2FibGUiLCJjb21wdXRlZCIsInVud3JhcCIsImRpc2FibGVkIiwidW5lZGl0YWJsZSIsInVwZGF0ZVZhbCIsInZhbHVlIiwidW5kZWZpbmVkIiwidmFsIiwibWluIiwiTnVtYmVyIiwibWF4IiwicHJlY2lzaW9uIiwidG9GaXhlZCIsImV4dGVuZCIsInRocm90dGxlIiwiZGlzcGxheVZhbHVlIiwicHVyZUNvbXB1dGVkIiwidG9TdHJpbmciLCJpc09ic2VydmFibGUiLCJwcmVjaXNpb25TdWJzY3JpcHRpb24iLCJzdWJzY3JpYmUiLCJkaXNwb3NhYmxlcyIsInB1c2giLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ2aWV3TW9kZWwiLCJ0ZW1wbGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9