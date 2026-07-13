"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[10160],{

/***/ 10160:
/*!******************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/domain-value.js + 1 modules ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ domain_value)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/uuidjs/dist/uuid.core.js
var uuid_core = __webpack_require__(84806);
var uuid_core_default = /*#__PURE__*/__webpack_require__.n(uuid_core);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/datatypes/domain-value.htm
const domain_value_namespaceObject = "templates/views/components/datatypes/domain-value.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/domain-value.js




var domain_value_name = 'domain-value-datatype-config';
var viewModel = function viewModel(params) {
  var self = this;
  this.search = params.search;
  if (this.search) {
    this.options = params.node.config.options;
    this.options.unshift({
      id: "",
      selected: true,
      text: "Select an Option"
    });
    var filter = params.filterValue();
    this.node = params.node;
    this.op = knockout_latest_default().observable(filter.op || 'eq');
    this.searchValue = knockout_latest_default().observable(filter.val || '');
    this.filterValue = knockout_latest_default().computed(function () {
      return {
        op: self.op(),
        val: self.searchValue()
      };
    });
    params.filterValue(this.filterValue());
    this.filterValue.subscribe(function (val) {
      params.filterValue(val);
    });
  } else {
    this.options = params.config.options;
    params.config.options().map(function (option) {
      option.text = knockout_latest_default().observable(knockout_latest_default().unwrap(option.text));
      option.text.subscribe(function (value) {
        if (value != option.text) {
          self.options.valueHasMutated();
        }
      });
      return option;
    });
    var setupOption = function setupOption(option) {
      option.remove = function () {
        self.options.remove(option);
      };
    };
    this.options().forEach(setupOption);
    this.newOptionLabel = knockout_latest_default().observable('');
    this.addNewOption = function () {
      var option = {
        id: uuid_core_default().generate(),
        selected: false,
        text: knockout_latest_default().observable(self.newOptionLabel())
      };
      setupOption(option);
      self.options.push(option);
      self.newOptionLabel('');
    };
    if (knockout_latest_default().isObservable(this.options)) {
      this.options.subscribe(function (opts) {
        underscore_min_default().each(opts, function (opt) {
          if (!opt.remove) {
            setupOption(opt);
          }
        });
      }, this);
    }
  }
};
knockout_latest_default().components.register(domain_value_name, {
  viewModel: viewModel,
  template: domain_value_namespaceObject
});
/* harmony default export */ const domain_value = (domain_value_name);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOTg3OTc3MGUzMmUwMzQ0ZGI2MTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDRjtBQUNHO0FBQ3FFO0FBR2hHLElBQU1JLGlCQUFJLEdBQUcsOEJBQThCO0FBQzNDLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFZQyxNQUFNLEVBQUU7RUFDL0IsSUFBSUMsSUFBSSxHQUFHLElBQUk7RUFDZixJQUFJLENBQUNDLE1BQU0sR0FBR0YsTUFBTSxDQUFDRSxNQUFNO0VBRTNCLElBQUksSUFBSSxDQUFDQSxNQUFNLEVBQUU7SUFDYixJQUFJLENBQUNDLE9BQU8sR0FBR0gsTUFBTSxDQUFDSSxJQUFJLENBQUNDLE1BQU0sQ0FBQ0YsT0FBTztJQUN6QyxJQUFJLENBQUNBLE9BQU8sQ0FBQ0csT0FBTyxDQUFDO01BQUNDLEVBQUUsRUFBQyxFQUFFO01BQUVDLFFBQVEsRUFBQyxJQUFJO01BQUVDLElBQUksRUFBQztJQUFrQixDQUFDLENBQUM7SUFDckUsSUFBSUMsTUFBTSxHQUFHVixNQUFNLENBQUNXLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQ1AsSUFBSSxHQUFHSixNQUFNLENBQUNJLElBQUk7SUFDdkIsSUFBSSxDQUFDUSxFQUFFLEdBQUdsQixvQ0FBYSxDQUFDZ0IsTUFBTSxDQUFDRSxFQUFFLElBQUksSUFBSSxDQUFDO0lBQzFDLElBQUksQ0FBQ0UsV0FBVyxHQUFHcEIsb0NBQWEsQ0FBQ2dCLE1BQU0sQ0FBQ0ssR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUNsRCxJQUFJLENBQUNKLFdBQVcsR0FBR2pCLGtDQUFXLENBQUMsWUFBVztNQUN0QyxPQUFPO1FBQ0hrQixFQUFFLEVBQUVYLElBQUksQ0FBQ1csRUFBRSxDQUFDLENBQUM7UUFDYkcsR0FBRyxFQUFFZCxJQUFJLENBQUNhLFdBQVcsQ0FBQztNQUMxQixDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBQ0ZkLE1BQU0sQ0FBQ1csV0FBVyxDQUFDLElBQUksQ0FBQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUNBLFdBQVcsQ0FBQ00sU0FBUyxDQUFDLFVBQVNGLEdBQUcsRUFBRTtNQUNyQ2YsTUFBTSxDQUFDVyxXQUFXLENBQUNJLEdBQUcsQ0FBQztJQUMzQixDQUFDLENBQUM7RUFFTixDQUFDLE1BQU07SUFDSCxJQUFJLENBQUNaLE9BQU8sR0FBR0gsTUFBTSxDQUFDSyxNQUFNLENBQUNGLE9BQU87SUFDcENILE1BQU0sQ0FBQ0ssTUFBTSxDQUFDRixPQUFPLENBQUMsQ0FBQyxDQUFDZSxHQUFHLENBQUMsVUFBQUMsTUFBTSxFQUFJO01BQ2xDQSxNQUFNLENBQUNWLElBQUksR0FBR2Ysb0NBQWEsQ0FBQ0EsZ0NBQVMsQ0FBQ3lCLE1BQU0sQ0FBQ1YsSUFBSSxDQUFDLENBQUM7TUFDbkRVLE1BQU0sQ0FBQ1YsSUFBSSxDQUFDUSxTQUFTLENBQUMsVUFBQUksS0FBSyxFQUFJO1FBQzNCLElBQUdBLEtBQUssSUFBSUYsTUFBTSxDQUFDVixJQUFJLEVBQUU7VUFDckJSLElBQUksQ0FBQ0UsT0FBTyxDQUFDbUIsZUFBZSxDQUFDLENBQUM7UUFDbEM7TUFDSixDQUFDLENBQUM7TUFDRixPQUFPSCxNQUFNO0lBQ2pCLENBQUMsQ0FBQztJQUNGLElBQUlJLFdBQVcsR0FBRyxTQUFkQSxXQUFXQSxDQUFZSixNQUFNLEVBQUU7TUFDL0JBLE1BQU0sQ0FBQ0ssTUFBTSxHQUFHLFlBQVc7UUFDdkJ2QixJQUFJLENBQUNFLE9BQU8sQ0FBQ3FCLE1BQU0sQ0FBQ0wsTUFBTSxDQUFDO01BQy9CLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBSSxDQUFDaEIsT0FBTyxDQUFDLENBQUMsQ0FBQ3NCLE9BQU8sQ0FBQ0YsV0FBVyxDQUFDO0lBQ25DLElBQUksQ0FBQ0csY0FBYyxHQUFHaEMsb0NBQWEsQ0FBQyxFQUFFLENBQUM7SUFDdkMsSUFBSSxDQUFDaUMsWUFBWSxHQUFHLFlBQVc7TUFDM0IsSUFBSVIsTUFBTSxHQUFHO1FBQ1RaLEVBQUUsRUFBRVosNEJBQWEsQ0FBQyxDQUFDO1FBQ25CYSxRQUFRLEVBQUUsS0FBSztRQUNmQyxJQUFJLEVBQUVmLG9DQUFhLENBQUNPLElBQUksQ0FBQ3lCLGNBQWMsQ0FBQyxDQUFDO01BQzdDLENBQUM7TUFDREgsV0FBVyxDQUFDSixNQUFNLENBQUM7TUFDbkJsQixJQUFJLENBQUNFLE9BQU8sQ0FBQzBCLElBQUksQ0FBQ1YsTUFBTSxDQUFDO01BQ3pCbEIsSUFBSSxDQUFDeUIsY0FBYyxDQUFDLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSWhDLHNDQUFlLENBQUMsSUFBSSxDQUFDUyxPQUFPLENBQUMsRUFBRTtNQUMvQixJQUFJLENBQUNBLE9BQU8sQ0FBQ2MsU0FBUyxDQUFDLFVBQVNjLElBQUksRUFBQztRQUNqQ25DLDZCQUFNLENBQUNtQyxJQUFJLEVBQUUsVUFBU0UsR0FBRyxFQUFDO1VBQ3RCLElBQUksQ0FBQ0EsR0FBRyxDQUFDVCxNQUFNLEVBQUU7WUFDYkQsV0FBVyxDQUFDVSxHQUFHLENBQUM7VUFDcEI7UUFDSixDQUFDLENBQUM7TUFDTixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1o7RUFDSjtBQUNKLENBQUM7QUFFRHZDLG9DQUFhLENBQUN5QyxRQUFRLENBQUNyQyxpQkFBSSxFQUFFO0VBQ3pCQyxTQUFTLEVBQUVBLFNBQVM7RUFDcEJxQyxRQUFRLEVBQUV2Qyw0QkFBMkJBO0FBQ3pDLENBQUMsQ0FBQztBQUVGLG1EQUFlQyxpQkFBSSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9kYXRhdHlwZXMvZG9tYWluLXZhbHVlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGRvbWFpblZhbHVlRGF0YXR5cGVUZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy9kYXRhdHlwZXMvZG9tYWluLXZhbHVlLmh0bSc7XG5cblxuY29uc3QgbmFtZSA9ICdkb21haW4tdmFsdWUtZGF0YXR5cGUtY29uZmlnJztcbmNvbnN0IHZpZXdNb2RlbCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnNlYXJjaCA9IHBhcmFtcy5zZWFyY2g7XG4gICAgICAgIFxuICAgIGlmICh0aGlzLnNlYXJjaCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBwYXJhbXMubm9kZS5jb25maWcub3B0aW9ucztcbiAgICAgICAgdGhpcy5vcHRpb25zLnVuc2hpZnQoe2lkOlwiXCIsIHNlbGVjdGVkOnRydWUsIHRleHQ6XCJTZWxlY3QgYW4gT3B0aW9uXCJ9KTtcbiAgICAgICAgdmFyIGZpbHRlciA9IHBhcmFtcy5maWx0ZXJWYWx1ZSgpO1xuICAgICAgICB0aGlzLm5vZGUgPSBwYXJhbXMubm9kZTtcbiAgICAgICAgdGhpcy5vcCA9IGtvLm9ic2VydmFibGUoZmlsdGVyLm9wIHx8ICdlcScpO1xuICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0ga28ub2JzZXJ2YWJsZShmaWx0ZXIudmFsIHx8ICcnKTtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvcDogc2VsZi5vcCgpLFxuICAgICAgICAgICAgICAgIHZhbDogc2VsZi5zZWFyY2hWYWx1ZSgpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcGFyYW1zLmZpbHRlclZhbHVlKHRoaXMuZmlsdGVyVmFsdWUoKSk7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgcGFyYW1zLmZpbHRlclZhbHVlKHZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gcGFyYW1zLmNvbmZpZy5vcHRpb25zO1xuICAgICAgICBwYXJhbXMuY29uZmlnLm9wdGlvbnMoKS5tYXAob3B0aW9uID0+IHsgXG4gICAgICAgICAgICBvcHRpb24udGV4dCA9IGtvLm9ic2VydmFibGUoa28udW53cmFwKG9wdGlvbi50ZXh0KSk7XG4gICAgICAgICAgICBvcHRpb24udGV4dC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlICE9IG9wdGlvbi50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy52YWx1ZUhhc011dGF0ZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2V0dXBPcHRpb24gPSBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgICAgICAgIG9wdGlvbi5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMucmVtb3ZlKG9wdGlvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9wdGlvbnMoKS5mb3JFYWNoKHNldHVwT3B0aW9uKTtcbiAgICAgICAgdGhpcy5uZXdPcHRpb25MYWJlbCA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgICAgICB0aGlzLmFkZE5ld09wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBpZDogdXVpZC5nZW5lcmF0ZSgpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBrby5vYnNlcnZhYmxlKHNlbGYubmV3T3B0aW9uTGFiZWwoKSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZXR1cE9wdGlvbihvcHRpb24pO1xuICAgICAgICAgICAgc2VsZi5vcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgICAgIHNlbGYubmV3T3B0aW9uTGFiZWwoJycpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKHRoaXMub3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdWJzY3JpYmUoZnVuY3Rpb24ob3B0cyl7XG4gICAgICAgICAgICAgICAgXy5lYWNoKG9wdHMsIGZ1bmN0aW9uKG9wdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb3B0LnJlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXBPcHRpb24ob3B0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKG5hbWUsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogZG9tYWluVmFsdWVEYXRhdHlwZVRlbXBsYXRlLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG5hbWU7XG4iXSwibmFtZXMiOlsia28iLCJ1dWlkIiwiXyIsImRvbWFpblZhbHVlRGF0YXR5cGVUZW1wbGF0ZSIsIm5hbWUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwic2VhcmNoIiwib3B0aW9ucyIsIm5vZGUiLCJjb25maWciLCJ1bnNoaWZ0IiwiaWQiLCJzZWxlY3RlZCIsInRleHQiLCJmaWx0ZXIiLCJmaWx0ZXJWYWx1ZSIsIm9wIiwib2JzZXJ2YWJsZSIsInNlYXJjaFZhbHVlIiwidmFsIiwiY29tcHV0ZWQiLCJzdWJzY3JpYmUiLCJtYXAiLCJvcHRpb24iLCJ1bndyYXAiLCJ2YWx1ZSIsInZhbHVlSGFzTXV0YXRlZCIsInNldHVwT3B0aW9uIiwicmVtb3ZlIiwiZm9yRWFjaCIsIm5ld09wdGlvbkxhYmVsIiwiYWRkTmV3T3B0aW9uIiwiZ2VuZXJhdGUiLCJwdXNoIiwiaXNPYnNlcnZhYmxlIiwib3B0cyIsImVhY2giLCJvcHQiLCJjb21wb25lbnRzIiwicmVnaXN0ZXIiLCJ0ZW1wbGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9