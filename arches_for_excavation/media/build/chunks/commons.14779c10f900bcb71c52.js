"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[93646],{

/***/ 93646:
/*!***************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/urldatatype.js + 1 modules ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ urldatatype)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/widget.js
var widget = __webpack_require__(77260);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/urldatatype.htm
const urldatatype_namespaceObject = "templates/views/components/widgets/urldatatype.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/urldatatype.js



var urldatatype_name = 'urldatatype';
var viewModel = function viewModel(params) {
  var self = this;
  params.configKeys = ['url_placeholder', 'url_label_placeholder', 'link_color'];
  params.valueProperties = ['url', 'url_label'];
  widget["default"].apply(this, [params]);
  if (knockout_latest_default().isObservable(this.value)) {
    // #10027 assign this.url & this.url_label with value versions for updating UI with edits
    if (this.value()) {
      var valueUrl = this.value().url;
      var valueUrlLabel = this.value().url_label;
      this.url(valueUrl);
      this.url_label(valueUrlLabel);
    }
    this.value.subscribe(function (newValue) {
      if (newValue) {
        if (newValue.url) {
          self.url(newValue.url);
        } else {
          self.url(null);
        }
        if (newValue.url_label) {
          self.url_label(newValue.url_label);
        } else {
          self.url_label(null);
          newValue.url_label = null;
        }
      } else {
        self.url(null);
        self.url_label(null);
        newValue.url = null;
        newValue.url_label = null;
      }
    });
  } else {
    if (this.value) {
      this.value.url.subscribe(function (newUrl) {
        if (newUrl) {
          self.url(newUrl);
        } else {
          self.url(null);
        }
      });
      this.value.url_label.subscribe(function (newUrlLabel) {
        if (newUrlLabel) {
          self.url_label(newUrlLabel);
        } else {
          self.url_label(null);
        }
      });
    }
  }
  this.urlPreviewText = knockout_latest_default().pureComputed(function () {
    if (self.url()) {
      if (self.url_label && self.url_label()) {
        return self.url_label();
      } else if (self.url && self.url()) {
        return self.url();
      }
    } else {
      return "--";
    }
  }, this);
};
knockout_latest_default().components.register(urldatatype_name, {
  viewModel: viewModel,
  template: urldatatype_namespaceObject
});
/* harmony default export */ const urldatatype = (urldatatype_name);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFDVixJQUFJUCxJQUFJLENBQUNTLFNBQVMsSUFBSVQsSUFBSSxDQUFDUyxTQUFTLENBQUMsQ0FBQyxFQUFFO1FBQ3BDLE9BQU9ULElBQUksQ0FBQ1MsU0FBUyxDQUFDLENBQUM7TUFDM0IsQ0FBQyxNQUFNLElBQUlULElBQUksQ0FBQ08sR0FBRyxJQUFJUCxJQUFJLENBQUNPLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDL0IsT0FBT1AsSUFBSSxDQUFDTyxHQUFHLENBQUMsQ0FBQztNQUNyQjtJQUNKLENBQUMsTUFDRztNQUNBLE9BQU8sSUFBSTtJQUNmO0VBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQztBQUVaLENBQUM7QUFFRGIsb0NBQWEsQ0FBQ3VCLFFBQVEsQ0FBQ3BCLGdCQUFJLEVBQUU7RUFDekJDLFNBQVMsRUFBRUEsU0FBUztFQUNwQm9CLFFBQVEsRUFBRXRCLDJCQUF5QkE7QUFDdkMsQ0FBQyxDQUFDO0FBRUYsa0RBQWVDLGdCQUFJLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL3dpZGdldHMvdXJsZGF0YXR5cGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBXaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy93aWRnZXQnO1xuaW1wb3J0IHVybERhdGF0eXBlV2lkZ2V0VGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvd2lkZ2V0cy91cmxkYXRhdHlwZS5odG0nO1xuXG5cbnZhciBuYW1lID0gJ3VybGRhdGF0eXBlJztcbmNvbnN0IHZpZXdNb2RlbCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHBhcmFtcy5jb25maWdLZXlzID0gWyd1cmxfcGxhY2Vob2xkZXInLCd1cmxfbGFiZWxfcGxhY2Vob2xkZXInLCdsaW5rX2NvbG9yJ107XG4gICAgcGFyYW1zLnZhbHVlUHJvcGVydGllcyA9IFsndXJsJywgJ3VybF9sYWJlbCddO1xuXG4gICAgV2lkZ2V0Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcblxuICAgIGlmIChrby5pc09ic2VydmFibGUodGhpcy52YWx1ZSkpIHtcbiAgICBcbiAgICAgICAgLy8gIzEwMDI3IGFzc2lnbiB0aGlzLnVybCAmIHRoaXMudXJsX2xhYmVsIHdpdGggdmFsdWUgdmVyc2lvbnMgZm9yIHVwZGF0aW5nIFVJIHdpdGggZWRpdHNcbiAgICAgICAgaWYgKHRoaXMudmFsdWUoKSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlVXJsID0gdGhpcy52YWx1ZSgpLnVybDtcbiAgICAgICAgICAgIHZhciB2YWx1ZVVybExhYmVsID0gdGhpcy52YWx1ZSgpLnVybF9sYWJlbDtcbiAgICAgICAgICAgIHRoaXMudXJsKHZhbHVlVXJsKTtcbiAgICAgICAgICAgIHRoaXMudXJsX2xhYmVsKHZhbHVlVXJsTGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZS5zdWJzY3JpYmUoZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cmwobmV3VmFsdWUudXJsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVybChudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLnVybF9sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVybF9sYWJlbChuZXdWYWx1ZS51cmxfbGFiZWwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXJsX2xhYmVsKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZS51cmxfbGFiZWwgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cmwobnVsbCk7XG4gICAgICAgICAgICAgICAgc2VsZi51cmxfbGFiZWwobnVsbCk7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUudXJsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZS51cmxfbGFiZWwgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnVybC5zdWJzY3JpYmUoZnVuY3Rpb24obmV3VXJsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1VybCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVybChuZXdVcmwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXJsKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnZhbHVlLnVybF9sYWJlbC5zdWJzY3JpYmUoZnVuY3Rpb24obmV3VXJsTGFiZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VXJsTGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cmxfbGFiZWwobmV3VXJsTGFiZWwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXJsX2xhYmVsKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVybFByZXZpZXdUZXh0ID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihzZWxmLnVybCgpKXtcbiAgICAgICAgICAgIGlmIChzZWxmLnVybF9sYWJlbCAmJiBzZWxmLnVybF9sYWJlbCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYudXJsX2xhYmVsKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYudXJsICYmIHNlbGYudXJsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi51cmwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIFwiLS1cIjtcbiAgICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICAgIFxufTtcblxua28uY29tcG9uZW50cy5yZWdpc3RlcihuYW1lLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IHVybERhdGF0eXBlV2lkZ2V0VGVtcGxhdGUsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbmFtZTtcbiJdLCJuYW1lcyI6WyJrbyIsIldpZGdldFZpZXdNb2RlbCIsInVybERhdGF0eXBlV2lkZ2V0VGVtcGxhdGUiLCJuYW1lIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsImNvbmZpZ0tleXMiLCJ2YWx1ZVByb3BlcnRpZXMiLCJhcHBseSIsImlzT2JzZXJ2YWJsZSIsInZhbHVlIiwidmFsdWVVcmwiLCJ1cmwiLCJ2YWx1ZVVybExhYmVsIiwidXJsX2xhYmVsIiwic3Vic2NyaWJlIiwibmV3VmFsdWUiLCJuZXdVcmwiLCJuZXdVcmxMYWJlbCIsInVybFByZXZpZXdUZXh0IiwicHVyZUNvbXB1dGVkIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==