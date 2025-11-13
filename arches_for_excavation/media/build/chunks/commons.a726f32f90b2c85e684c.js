"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[92629],{

/***/ 92629:
/*!**********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/switch.js + 1 modules ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ widgets_switch)
});

// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/widget.js
var widget = __webpack_require__(77260);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/widgets/switch.htm
const switch_namespaceObject = "templates/views/components/widgets/switch.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/key-events-click.js
var key_events_click = __webpack_require__(40513);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/widgets/switch.js







/**
* knockout components namespace used in arches
* @external "ko.components"
* @see http://knockoutjs.com/documentation/component-binding.html
*/

/**
* registers a switch-widget component for use in forms
* @function external:"ko.components".switch-widget
* @param {object} params
* @param {boolean} params.value - the value being managed
* @param {object} params.config -
* @param {string} params.config.label - label to use alongside the select input
* @param {string} params.config.subtitle - subtitle to use alongside the select input
* @param {string|true} [params.config.on=true] - the value to use for the "on" state of the switch
* @param {string|false} [params.config.off=false] - the value to use for the "off" state of the switch
*/

var SwitchWidget = function SwitchWidget(params) {
  var _this$subtitle,
    _this = this;
  params.configKeys = ['subtitle', 'defaultValue'];
  widget["default"].apply(this, [params]);
  var originalConfig = this.config();
  this.on = this.config().on || true;
  this.activeLanguage = arches["default"].activeLanguage;
  this.off = this.config().off || false;
  this.null = this.config().null || null;
  this.localizedSubtitle = knockout_latest_default().observable((_this$subtitle = this.subtitle()) === null || _this$subtitle === void 0 ? void 0 : _this$subtitle[this.activeLanguage]);

  // chained observable to avoid issues with ko.mapping
  this.localizedSubtitle.subscribe(function (value) {
    var val = _this.subtitle();
    if (value != "") {
      val[_this.activeLanguage] = value;
      _this.subtitle(val);
    } else {
      delete val[_this.activeLanguage];
      _this.config(originalConfig);
    }
    params.card.get('widgets').valueHasMutated();
  });
  this.setvalue = this.config().setvalue || function (self, evt) {
    if (knockout_latest_default().unwrap(self.disabled) === false) {
      if (self.value() === self.on) {
        self.value(self.null);
      } else if (self.value() === self.null) {
        self.value(self.off);
      } else if (self.value() === self.off) {
        self.value(self.on);
      }
    }
  };
  this.getvalue = this.config().getvalue || knockout_latest_default().computed(function () {
    var result = null;
    if (this.value() === this.on) {
      result = true;
    } else if (this.value() === false) {
      result = false;
    }
    return result;
  }, this);
  this.getariavalue = knockout_latest_default().computed(function () {
    var result = null;
    if (this.getvalue() === null) {
      result = "mixed";
    } else {
      result = this.getvalue();
    }
    return result;
  }, this);
  this.setdefault = this.config().setdefault || function (self) {
    if (self.defaultValue() === self.on) {
      self.defaultValue(self.null);
    } else if (self.defaultValue() === self.null) {
      self.defaultValue(self.off);
    } else if (self.defaultValue() === self.off) {
      self.defaultValue(self.on);
    }
  };
  this.getdefault = this.config().getdefault || knockout_latest_default().computed(function () {
    var result = null;
    if (this.defaultValue() === this.on) {
      result = true;
    } else if (this.defaultValue() === false) {
      result = false;
    }
    return result;
  }, this);
  this.getariadefault = knockout_latest_default().computed(function () {
    var result = null;
    if (this.getdefault() === null) {
      result = "mixed";
    } else {
      result = this.getdefault();
    }
    return result;
  }, this);
  var defaultValue = knockout_latest_default().unwrap(this.defaultValue);
  if (this.value() === null && this.defaultValue() !== null) {
    this.value(this.defaultValue());
  }
  if (this.tile && this.tile.tileid == "" && defaultValue != null && defaultValue != "") {
    this.value(defaultValue);
  }
  this.disposables.push(this.getvalue);
  this.disposables.push(this.setdefault);
  this.disposables.push(this.getdefault);
};
/* harmony default export */ const widgets_switch = (knockout_latest_default().components.register('switch-widget', {
  viewModel: SwitchWidget,
  template: switch_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSyxJQUFJLEVBQUU7SUFDdkQsSUFBSSxDQUFDZixLQUFLLENBQUMsSUFBSSxDQUFDZSxZQUFZLENBQUMsQ0FBQyxDQUFDO0VBQ25DO0VBQ0EsSUFBSSxJQUFJLENBQUNHLElBQUksSUFBSSxJQUFJLENBQUNBLElBQUksQ0FBQ0MsTUFBTSxJQUFJLEVBQUUsSUFBSUosWUFBWSxJQUFJLElBQUksSUFBSUEsWUFBWSxJQUFJLEVBQUUsRUFBRTtJQUNuRixJQUFJLENBQUNmLEtBQUssQ0FBQ2UsWUFBWSxDQUFDO0VBQzVCO0VBQ0EsSUFBSSxDQUFDSyxXQUFXLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNYLFFBQVEsQ0FBQztFQUNwQyxJQUFJLENBQUNVLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ1AsVUFBVSxDQUFDO0VBQ3RDLElBQUksQ0FBQ00sV0FBVyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDTCxVQUFVLENBQUM7QUFDMUMsQ0FBQztBQUVELHFEQUFlcEMsb0NBQWEsQ0FBQzJDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7RUFDbkRDLFNBQVMsRUFBRXhDLFlBQVk7RUFDdkJ5QyxRQUFRLEVBQUUxQyxzQkFBb0JBO0FBQ2xDLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL3N3aXRjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgV2lkZ2V0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvd2lkZ2V0JztcbmltcG9ydCBzd2l0Y2hXaWRnZXRUZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy93aWRnZXRzL3N3aXRjaC5odG0nO1xuaW1wb3J0ICdiaW5kaW5ncy9rZXktZXZlbnRzLWNsaWNrJztcblxuLyoqXG4qIGtub2Nrb3V0IGNvbXBvbmVudHMgbmFtZXNwYWNlIHVzZWQgaW4gYXJjaGVzXG4qIEBleHRlcm5hbCBcImtvLmNvbXBvbmVudHNcIlxuKiBAc2VlIGh0dHA6Ly9rbm9ja291dGpzLmNvbS9kb2N1bWVudGF0aW9uL2NvbXBvbmVudC1iaW5kaW5nLmh0bWxcbiovXG5cbi8qKlxuKiByZWdpc3RlcnMgYSBzd2l0Y2gtd2lkZ2V0IGNvbXBvbmVudCBmb3IgdXNlIGluIGZvcm1zXG4qIEBmdW5jdGlvbiBleHRlcm5hbDpcImtvLmNvbXBvbmVudHNcIi5zd2l0Y2gtd2lkZ2V0XG4qIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiogQHBhcmFtIHtib29sZWFufSBwYXJhbXMudmFsdWUgLSB0aGUgdmFsdWUgYmVpbmcgbWFuYWdlZFxuKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zLmNvbmZpZyAtXG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLmxhYmVsIC0gbGFiZWwgdG8gdXNlIGFsb25nc2lkZSB0aGUgc2VsZWN0IGlucHV0XG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuY29uZmlnLnN1YnRpdGxlIC0gc3VidGl0bGUgdG8gdXNlIGFsb25nc2lkZSB0aGUgc2VsZWN0IGlucHV0XG4qIEBwYXJhbSB7c3RyaW5nfHRydWV9IFtwYXJhbXMuY29uZmlnLm9uPXRydWVdIC0gdGhlIHZhbHVlIHRvIHVzZSBmb3IgdGhlIFwib25cIiBzdGF0ZSBvZiB0aGUgc3dpdGNoXG4qIEBwYXJhbSB7c3RyaW5nfGZhbHNlfSBbcGFyYW1zLmNvbmZpZy5vZmY9ZmFsc2VdIC0gdGhlIHZhbHVlIHRvIHVzZSBmb3IgdGhlIFwib2ZmXCIgc3RhdGUgb2YgdGhlIHN3aXRjaFxuKi9cblxudmFyIFN3aXRjaFdpZGdldCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHBhcmFtcy5jb25maWdLZXlzID0gWydzdWJ0aXRsZScsICdkZWZhdWx0VmFsdWUnXTtcblxuICAgIFdpZGdldFZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG4gICAgY29uc3Qgb3JpZ2luYWxDb25maWcgPSB0aGlzLmNvbmZpZygpO1xuICAgIHRoaXMub24gPSB0aGlzLmNvbmZpZygpLm9uIHx8IHRydWU7XG4gICAgdGhpcy5hY3RpdmVMYW5ndWFnZSA9IGFyY2hlcy5hY3RpdmVMYW5ndWFnZTtcbiAgICB0aGlzLm9mZiA9IHRoaXMuY29uZmlnKCkub2ZmIHx8IGZhbHNlO1xuICAgIHRoaXMubnVsbCA9IHRoaXMuY29uZmlnKCkubnVsbCB8fCBudWxsO1xuICAgIHRoaXMubG9jYWxpemVkU3VidGl0bGUgPSBrby5vYnNlcnZhYmxlKHRoaXMuc3VidGl0bGUoKT8uW3RoaXMuYWN0aXZlTGFuZ3VhZ2VdKTtcblxuICAgIC8vIGNoYWluZWQgb2JzZXJ2YWJsZSB0byBhdm9pZCBpc3N1ZXMgd2l0aCBrby5tYXBwaW5nXG4gICAgdGhpcy5sb2NhbGl6ZWRTdWJ0aXRsZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuc3VidGl0bGUoKTtcblxuICAgICAgICBpZih2YWx1ZSAhPSBcIlwiKXtcbiAgICAgICAgICAgIHZhbFt0aGlzLmFjdGl2ZUxhbmd1YWdlXSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zdWJ0aXRsZSh2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHZhbFt0aGlzLmFjdGl2ZUxhbmd1YWdlXTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnKG9yaWdpbmFsQ29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtcy5jYXJkLmdldCgnd2lkZ2V0cycpLnZhbHVlSGFzTXV0YXRlZCgpO1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLnNldHZhbHVlID0gdGhpcy5jb25maWcoKS5zZXR2YWx1ZSB8fCBmdW5jdGlvbihzZWxmLCBldnQpe1xuICAgICAgICBpZiAoa28udW53cmFwKHNlbGYuZGlzYWJsZWQpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYoc2VsZi52YWx1ZSgpID09PSBzZWxmLm9uKXtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbHVlKHNlbGYubnVsbCk7XG4gICAgICAgICAgICB9ZWxzZSBpZiAoc2VsZi52YWx1ZSgpID09PSBzZWxmLm51bGwpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbHVlKHNlbGYub2ZmKTtcbiAgICAgICAgICAgIH1lbHNlIGlmIChzZWxmLnZhbHVlKCkgPT09IHNlbGYub2ZmKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52YWx1ZShzZWxmLm9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldHZhbHVlID0gdGhpcy5jb25maWcoKS5nZXR2YWx1ZSB8fCBrby5jb21wdXRlZChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUoKSA9PT0gdGhpcy5vbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5nZXRhcmlhdmFsdWUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuZ2V0dmFsdWUoKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gXCJtaXhlZFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5nZXR2YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLnNldGRlZmF1bHQgPSB0aGlzLmNvbmZpZygpLnNldGRlZmF1bHQgfHwgZnVuY3Rpb24oc2VsZil7XG4gICAgICAgIGlmKHNlbGYuZGVmYXVsdFZhbHVlKCkgPT09IHNlbGYub24pe1xuICAgICAgICAgICAgc2VsZi5kZWZhdWx0VmFsdWUoc2VsZi5udWxsKTtcbiAgICAgICAgfWVsc2UgaWYoc2VsZi5kZWZhdWx0VmFsdWUoKSA9PT0gc2VsZi5udWxsKXtcbiAgICAgICAgICAgIHNlbGYuZGVmYXVsdFZhbHVlKHNlbGYub2ZmKTtcbiAgICAgICAgfWVsc2UgaWYoc2VsZi5kZWZhdWx0VmFsdWUoKSA9PT0gc2VsZi5vZmYpe1xuICAgICAgICAgICAgc2VsZi5kZWZhdWx0VmFsdWUoc2VsZi5vbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRkZWZhdWx0ID0gdGhpcy5jb25maWcoKS5nZXRkZWZhdWx0IHx8IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5kZWZhdWx0VmFsdWUoKSA9PT0gdGhpcy5vbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRWYWx1ZSgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMuZ2V0YXJpYWRlZmF1bHQgPSBrby5jb21wdXRlZChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuZ2V0ZGVmYXVsdCgpID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBcIm1peGVkXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmdldGRlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdmFyIGRlZmF1bHRWYWx1ZSA9IGtvLnVud3JhcCh0aGlzLmRlZmF1bHRWYWx1ZSk7XG4gICAgaWYgKHRoaXMudmFsdWUoKSA9PT0gbnVsbCAmJiB0aGlzLmRlZmF1bHRWYWx1ZSgpICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUodGhpcy5kZWZhdWx0VmFsdWUoKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRpbGUgJiYgdGhpcy50aWxlLnRpbGVpZCA9PSBcIlwiICYmIGRlZmF1bHRWYWx1ZSAhPSBudWxsICYmIGRlZmF1bHRWYWx1ZSAhPSBcIlwiKSB7XG4gICAgICAgIHRoaXMudmFsdWUoZGVmYXVsdFZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKHRoaXMuZ2V0dmFsdWUpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaCh0aGlzLnNldGRlZmF1bHQpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaCh0aGlzLmdldGRlZmF1bHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3Rlcignc3dpdGNoLXdpZGdldCcsIHtcbiAgICB2aWV3TW9kZWw6IFN3aXRjaFdpZGdldCxcbiAgICB0ZW1wbGF0ZTogc3dpdGNoV2lkZ2V0VGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJhcmNoZXMiLCJrbyIsIl8iLCJXaWRnZXRWaWV3TW9kZWwiLCJzd2l0Y2hXaWRnZXRUZW1wbGF0ZSIsIlN3aXRjaFdpZGdldCIsInBhcmFtcyIsIl90aGlzJHN1YnRpdGxlIiwiX3RoaXMiLCJjb25maWdLZXlzIiwiYXBwbHkiLCJvcmlnaW5hbENvbmZpZyIsImNvbmZpZyIsIm9uIiwiYWN0aXZlTGFuZ3VhZ2UiLCJvZmYiLCJudWxsIiwibG9jYWxpemVkU3VidGl0bGUiLCJvYnNlcnZhYmxlIiwic3VidGl0bGUiLCJzdWJzY3JpYmUiLCJ2YWx1ZSIsInZhbCIsImNhcmQiLCJnZXQiLCJ2YWx1ZUhhc011dGF0ZWQiLCJzZXR2YWx1ZSIsInNlbGYiLCJldnQiLCJ1bndyYXAiLCJkaXNhYmxlZCIsImdldHZhbHVlIiwiY29tcHV0ZWQiLCJyZXN1bHQiLCJnZXRhcmlhdmFsdWUiLCJzZXRkZWZhdWx0IiwiZGVmYXVsdFZhbHVlIiwiZ2V0ZGVmYXVsdCIsImdldGFyaWFkZWZhdWx0IiwidGlsZSIsInRpbGVpZCIsImRpc3Bvc2FibGVzIiwicHVzaCIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInZpZXdNb2RlbCIsInRlbXBsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==