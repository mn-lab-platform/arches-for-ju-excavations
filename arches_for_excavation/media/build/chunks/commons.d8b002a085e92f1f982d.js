"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[82008],{

/***/ 82008:
/*!********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/ckeditor.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }




/**
* A knockout.js binding for the "ckeditor" rich text editor widget
* - pass options to ckeditor using the following syntax in the knockout
* data-bind attribute
* @example
* ckeditor: {height: 250}
* @constructor
* @name ckeditor
*/

var initialize = function initialize(element, valueAccessor, allBindings) {
  var _allBindings;
  var modelValue = valueAccessor();
  var value = knockout__WEBPACK_IMPORTED_MODULE_1___default().utils.unwrapObservable(valueAccessor());
  var language = allBindings.get('language') || knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(arches__WEBPACK_IMPORTED_MODULE_2__["default"].activeLanguage);
  var direction = allBindings.get('direction') || knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(arches__WEBPACK_IMPORTED_MODULE_2__["default"].activeLanguageDir);
  var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
  var options = {
    bodyId: 'ckeditor'
  };
  var languageList = [];
  for (var _i = 0, _Object$keys = Object.keys(arches__WEBPACK_IMPORTED_MODULE_2__["default"].languages); _i < _Object$keys.length; _i++) {
    var lang = _Object$keys[_i];
    languageList.push("".concat(lang, ":").concat(arches__WEBPACK_IMPORTED_MODULE_2__["default"].languages[lang]));
  }
  /* eslint-disable no-undef */
  CKEDITOR.config.language_list = languageList;
  CKEDITOR.config.language = language();
  CKEDITOR.config.contentsLangDirection = direction();
  CKEDITOR.config.autoParagraph = false;
  CKEDITOR.config.toolbar = [{
    name: 'clipboard',
    groups: ['clipboard', 'undo'],
    items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
  }, {
    name: 'editing',
    groups: [/* 'find' , 'selection',*/'spellchecker'],
    items: [/* 'Find', 'Replace', '-', 'SelectAll', '-',*/'Scayt']
  }, {
    name: 'links',
    items: ['Link', 'Unlink', 'Anchor']
  },
  // { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
  {
    name: 'insert',
    items: ['Image', /*'Flash',*/'Table', 'HorizontalRule', /*'Smiley',*/'SpecialChar', 'PageBreak' /*'Iframe'*/]
  }, {
    name: 'tools',
    items: ['Maximize' /*'ShowBlocks'*/]
  }, '/', {
    name: 'basicstyles',
    groups: ['basicstyles', 'cleanup'],
    items: ['Bold', 'Italic', 'Underline', 'Strike', /*'Subscript', 'Superscript',*/'-', 'RemoveFormat']
  }, {
    name: 'paragraph',
    groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' /*'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'*/]
  }, {
    name: 'styles',
    items: ['Styles', 'Format' /*'Font', 'FontSize'*/]
  },
  // { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
  // { name: 'others', items: [ '-' ] },
  {
    name: 'document',
    groups: ['mode', 'document', 'doctools'],
    items: ['Source', '-' /*'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'*/]
  }, {
    name: 'about',
    items: ['About']
  }];
  direction.subscribe(function (newValue) {
    CKEDITOR.config.contentsLangDirection = newValue;
    CKEDITOR.replace('ckeditor', CKEDITOR.config);
  });
  language.subscribe(function (newValue) {
    CKEDITOR.config.language = newValue;
  });
  if (allBindings.has('ckeditorOptions')) {
    var opts = allBindings.get('ckeditorOptions');
    options = _typeof(opts) === 'object' ? opts : {};
  }

  // Set initial value and create the CKEditor
  $element.html(value);
  var editor = $element.ckeditor(options).editor;
  var placeholder = allBindings.get('placeholder');
  if (placeholder) {
    editor.config.editorplaceholder = knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(placeholder);
    if (allBindings.get('isConfigForm')) {
      $element[0].defaultValue = knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(placeholder);
    }
  }
  (_allBindings = allBindings()) === null || _allBindings === void 0 || (_allBindings = _allBindings.attr) === null || _allBindings === void 0 || (_allBindings = _allBindings.disabled) === null || _allBindings === void 0 || _allBindings.subscribe(function (disabled) {
    if (!!(editor !== null && editor !== void 0 && editor.editable()) && (disabled === true || disabled === false)) {
      editor === null || editor === void 0 || editor.setReadOnly(disabled);
    }
  });

  // bind to change events and link it to the observable
  var onChange = function onChange(e) {
    var self = this;
    if (knockout__WEBPACK_IMPORTED_MODULE_1___default().isWriteableObservable(self)) {
      var newValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.listenerData).val();
      if (!((self() === null || self() === "") && (newValue === null || newValue === ""))) {
        self(newValue);
      }
    }
    return true;
  };
  editor.on('change', onChange, modelValue, element);
  editor.on('afterCommandExec', function (event) {
    if (event.data.name == 'language') {
      language(event.data.commandData);
    }
  }, modelValue, element);
  modelValue.subscribe(function (value) {
    var self = this;
    var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
    var newValue = knockout__WEBPACK_IMPORTED_MODULE_1___default().utils.unwrapObservable(valueAccessor());
    if (editor.getData() != newValue) {
      // remove the listener and then add back to prevent `setData`
      // from triggering the onChange event
      editor.removeListener('change', onChange);
      editor.setData(newValue);
      editor.on('change', onChange, modelValue, element);
    }
  }, this);

  // Handle disposal if KO removes an editor through template binding
  knockout__WEBPACK_IMPORTED_MODULE_1___default().utils.domNodeDisposal.addDisposeCallback(element, function () {
    editor.updateElement();
    editor.destroy();
  });
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).ckeditor = {
  init: function init(element, valueAccessor, allBindings) {
    window.jQuery = (jquery__WEBPACK_IMPORTED_MODULE_0___default());
    __webpack_require__.e(/*! AMD require */ 68363).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(/*! ckeditor4 */ 23971), __webpack_require__(/*! ckeditor-jquery */ 47497)]; (function () {
      initialize(element, valueAccessor, allBindings);
    }).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);})['catch'](__webpack_require__.oe);
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).ckeditor.init = knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers.ckeditor.init.bind((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).ckeditor);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_1___default().bindingHandlers).ckeditor);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZDhiMDAyYTA4NWU5MmYxZjk4MmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNHO0FBQ0U7O0FBRzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNRyxVQUFVLEdBQUcsU0FBYkEsVUFBVUEsQ0FBYUMsT0FBTyxFQUFFQyxhQUFhLEVBQUVDLFdBQVcsRUFBRTtFQUFBLElBQUFDLFlBQUE7RUFDOUQsSUFBSUMsVUFBVSxHQUFHSCxhQUFhLENBQUMsQ0FBQztFQUNoQyxJQUFJSSxLQUFLLEdBQUdSLHFEQUFRLENBQUNVLGdCQUFnQixDQUFDTixhQUFhLENBQUMsQ0FBQyxDQUFDO0VBQ3RELElBQU1PLFFBQVEsR0FBR04sV0FBVyxDQUFDTyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUlaLDBEQUFhLENBQUNDLDhDQUFNLENBQUNhLGNBQWMsQ0FBQztFQUNwRixJQUFNQyxTQUFTLEdBQUdWLFdBQVcsQ0FBQ08sR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJWiwwREFBYSxDQUFDQyw4Q0FBTSxDQUFDZSxpQkFBaUIsQ0FBQztFQUN6RixJQUFJQyxRQUFRLEdBQUdsQiw2Q0FBQyxDQUFDSSxPQUFPLENBQUM7RUFDekIsSUFBSWUsT0FBTyxHQUFHO0lBQUVDLE1BQU0sRUFBRTtFQUFXLENBQUM7RUFDcEMsSUFBTUMsWUFBWSxHQUFHLEVBQUU7RUFFdkIsU0FBQUMsRUFBQSxNQUFBQyxZQUFBLEdBQW1CQyxNQUFNLENBQUNDLElBQUksQ0FBQ3ZCLDhDQUFNLENBQUN3QixTQUFTLENBQUMsRUFBQUosRUFBQSxHQUFBQyxZQUFBLENBQUFJLE1BQUEsRUFBQUwsRUFBQSxJQUFFO0lBQTdDLElBQU1NLElBQUksR0FBQUwsWUFBQSxDQUFBRCxFQUFBO0lBQ1hELFlBQVksQ0FBQ1EsSUFBSSxJQUFBQyxNQUFBLENBQUlGLElBQUksT0FBQUUsTUFBQSxDQUFJNUIsOENBQU0sQ0FB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YXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvYmluZGluZ3MvY2tlZGl0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5cblxuLyoqXG4qIEEga25vY2tvdXQuanMgYmluZGluZyBmb3IgdGhlIFwiY2tlZGl0b3JcIiByaWNoIHRleHQgZWRpdG9yIHdpZGdldFxuKiAtIHBhc3Mgb3B0aW9ucyB0byBja2VkaXRvciB1c2luZyB0aGUgZm9sbG93aW5nIHN5bnRheCBpbiB0aGUga25vY2tvdXRcbiogZGF0YS1iaW5kIGF0dHJpYnV0ZVxuKiBAZXhhbXBsZVxuKiBja2VkaXRvcjoge2hlaWdodDogMjUwfVxuKiBAY29uc3RydWN0b3JcbiogQG5hbWUgY2tlZGl0b3JcbiovXG5cbmNvbnN0IGluaXRpYWxpemUgPSBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3MpIHtcbiAgICB2YXIgbW9kZWxWYWx1ZSA9IHZhbHVlQWNjZXNzb3IoKTtcbiAgICB2YXIgdmFsdWUgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHZhbHVlQWNjZXNzb3IoKSk7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBhbGxCaW5kaW5ncy5nZXQoJ2xhbmd1YWdlJykgfHwga28ub2JzZXJ2YWJsZShhcmNoZXMuYWN0aXZlTGFuZ3VhZ2UpO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGFsbEJpbmRpbmdzLmdldCgnZGlyZWN0aW9uJykgfHwga28ub2JzZXJ2YWJsZShhcmNoZXMuYWN0aXZlTGFuZ3VhZ2VEaXIpO1xuICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgdmFyIG9wdGlvbnMgPSB7IGJvZHlJZDogJ2NrZWRpdG9yJyB9O1xuICAgIGNvbnN0IGxhbmd1YWdlTGlzdCA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBsYW5nIG9mIE9iamVjdC5rZXlzKGFyY2hlcy5sYW5ndWFnZXMpKSB7XG4gICAgICAgIGxhbmd1YWdlTGlzdC5wdXNoKGAke2xhbmd9OiR7YXJjaGVzLmxhbmd1YWdlc1tsYW5nXX1gKTtcbiAgICB9XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICBDS0VESVRPUi5jb25maWcubGFuZ3VhZ2VfbGlzdCA9IGxhbmd1YWdlTGlzdDtcbiAgICBDS0VESVRPUi5jb25maWcubGFuZ3VhZ2UgPSBsYW5ndWFnZSgpO1xuICAgIENLRURJVE9SLmNvbmZpZy5jb250ZW50c0xhbmdEaXJlY3Rpb24gPSBkaXJlY3Rpb24oKTtcbiAgICBDS0VESVRPUi5jb25maWcuYXV0b1BhcmFncmFwaCA9IGZhbHNlO1xuICAgIENLRURJVE9SLmNvbmZpZy50b29sYmFyID0gW1xuICAgICAgICB7IG5hbWU6ICdjbGlwYm9hcmQnLCBncm91cHM6IFsnY2xpcGJvYXJkJywgJ3VuZG8nXSwgaXRlbXM6IFsnQ3V0JywgJ0NvcHknLCAnUGFzdGUnLCAnUGFzdGVUZXh0JywgJ1Bhc3RlRnJvbVdvcmQnLCAnLScsICdVbmRvJywgJ1JlZG8nXSB9LFxuICAgICAgICB7IG5hbWU6ICdlZGl0aW5nJywgZ3JvdXBzOiBbIC8qICdmaW5kJyAsICdzZWxlY3Rpb24nLCovICdzcGVsbGNoZWNrZXInXSwgaXRlbXM6IFsgLyogJ0ZpbmQnLCAnUmVwbGFjZScsICctJywgJ1NlbGVjdEFsbCcsICctJywqLyAnU2NheXQnXSB9LFxuICAgICAgICB7IG5hbWU6ICdsaW5rcycsIGl0ZW1zOiBbJ0xpbmsnLCAnVW5saW5rJywgJ0FuY2hvciddIH0sXG4gICAgICAgIC8vIHsgbmFtZTogJ2Zvcm1zJywgaXRlbXM6IFsgJ0Zvcm0nLCAnQ2hlY2tib3gnLCAnUmFkaW8nLCAnVGV4dEZpZWxkJywgJ1RleHRhcmVhJywgJ1NlbGVjdCcsICdCdXR0b24nLCAnSW1hZ2VCdXR0b24nLCAnSGlkZGVuRmllbGQnIF0gfSxcbiAgICAgICAgeyBuYW1lOiAnaW5zZXJ0JywgaXRlbXM6IFsnSW1hZ2UnLCAvKidGbGFzaCcsKi8gJ1RhYmxlJywgJ0hvcml6b250YWxSdWxlJywgLyonU21pbGV5JywqLyAnU3BlY2lhbENoYXInLCAnUGFnZUJyZWFrJywgLyonSWZyYW1lJyovXSB9LFxuICAgICAgICB7IG5hbWU6ICd0b29scycsIGl0ZW1zOiBbJ01heGltaXplJywgLyonU2hvd0Jsb2NrcycqL10gfSxcbiAgICAgICAgJy8nLFxuICAgICAgICB7IG5hbWU6ICdiYXNpY3N0eWxlcycsIGdyb3VwczogWydiYXNpY3N0eWxlcycsICdjbGVhbnVwJ10sIGl0ZW1zOiBbJ0JvbGQnLCAnSXRhbGljJywgJ1VuZGVybGluZScsICdTdHJpa2UnLCAvKidTdWJzY3JpcHQnLCAnU3VwZXJzY3JpcHQnLCovICctJywgJ1JlbW92ZUZvcm1hdCddIH0sXG4gICAgICAgIHsgbmFtZTogJ3BhcmFncmFwaCcsIGdyb3VwczogWydsaXN0JywgJ2luZGVudCcsICdibG9ja3MnLCAnYWxpZ24nLCAnYmlkaSddLCBpdGVtczogWydOdW1iZXJlZExpc3QnLCAnQnVsbGV0ZWRMaXN0JywgJy0nLCAnT3V0ZGVudCcsICdJbmRlbnQnLCAnLScsICdCbG9ja3F1b3RlJywgLyonQ3JlYXRlRGl2JywgJy0nLCAnSnVzdGlmeUxlZnQnLCAnSnVzdGlmeUNlbnRlcicsICdKdXN0aWZ5UmlnaHQnLCAnSnVzdGlmeUJsb2NrJywgJy0nLCAnQmlkaUx0cicsICdCaWRpUnRsJywgJ0xhbmd1YWdlJyovXSB9LFxuICAgICAgICB7IG5hbWU6ICdzdHlsZXMnLCBpdGVtczogWydTdHlsZXMnLCAnRm9ybWF0JywgLyonRm9udCcsICdGb250U2l6ZScqL10gfSxcbiAgICAgICAgLy8geyBuYW1lOiAnY29sb3JzJywgaXRlbXM6IFsgJ1RleHRDb2xvcicsICdCR0NvbG9yJyBdIH0sXG4gICAgICAgIC8vIHsgbmFtZTogJ290aGVycycsIGl0ZW1zOiBbICctJyBdIH0sXG4gICAgICAgIHsgbmFtZTogJ2RvY3VtZW50JywgZ3JvdXBzOiBbJ21vZGUnLCAnZG9jdW1lbnQnLCAnZG9jdG9vbHMnXSwgaXRlbXM6IFsnU291cmNlJywgJy0nLCAvKidTYXZlJywgJ05ld1BhZ2UnLCAnUHJldmlldycsICdQcmludCcsICctJywgJ1RlbXBsYXRlcycqL10gfSxcbiAgICAgICAgeyBuYW1lOiAnYWJvdXQnLCBpdGVtczogWydBYm91dCddIH1cbiAgICBdO1xuXG4gICAgZGlyZWN0aW9uLnN1YnNjcmliZShuZXdWYWx1ZSA9PiB7XG4gICAgICAgIENLRURJVE9SLmNvbmZpZy5jb250ZW50c0xhbmdEaXJlY3Rpb24gPSBuZXdWYWx1ZTtcbiAgICAgICAgQ0tFRElUT1IucmVwbGFjZSgnY2tlZGl0b3InLCBDS0VESVRPUi5jb25maWcpO1xuICAgIH0pO1xuXG4gICAgbGFuZ3VhZ2Uuc3Vic2NyaWJlKG5ld1ZhbHVlID0+IHtcbiAgICAgICAgQ0tFRElUT1IuY29uZmlnLmxhbmd1YWdlID0gbmV3VmFsdWU7XG4gICAgfSk7XG5cbiAgICBpZiAoYWxsQmluZGluZ3MuaGFzKCdja2VkaXRvck9wdGlvbnMnKSkge1xuICAgICAgICB2YXIgb3B0cyA9IGFsbEJpbmRpbmdzLmdldCgnY2tlZGl0b3JPcHRpb25zJyk7XG4gICAgICAgIG9wdGlvbnMgPSAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSA/IG9wdHMgOiB7fTtcbiAgICB9XG5cbiAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZSBhbmQgY3JlYXRlIHRoZSBDS0VkaXRvclxuICAgICRlbGVtZW50Lmh0bWwodmFsdWUpO1xuICAgIHZhciBlZGl0b3IgPSAkZWxlbWVudC5ja2VkaXRvcihvcHRpb25zKS5lZGl0b3I7XG5cbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IGFsbEJpbmRpbmdzLmdldCgncGxhY2Vob2xkZXInKTtcbiAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgZWRpdG9yLmNvbmZpZy5lZGl0b3JwbGFjZWhvbGRlciA9IGtvLnVud3JhcChwbGFjZWhvbGRlcik7XG5cbiAgICAgICAgaWYgKGFsbEJpbmRpbmdzLmdldCgnaXNDb25maWdGb3JtJykpIHtcbiAgICAgICAgICAgICRlbGVtZW50WzBdLmRlZmF1bHRWYWx1ZSA9IGtvLnVud3JhcChwbGFjZWhvbGRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGxCaW5kaW5ncygpPy5hdHRyPy5kaXNhYmxlZD8uc3Vic2NyaWJlKGRpc2FibGVkID0+IHtcbiAgICAgICAgaWYgKCEhZWRpdG9yPy5lZGl0YWJsZSgpICYmIChkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICBlZGl0b3I/LnNldFJlYWRPbmx5KGRpc2FibGVkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYmluZCB0byBjaGFuZ2UgZXZlbnRzIGFuZCBsaW5rIGl0IHRvIHRoZSBvYnNlcnZhYmxlXG4gICAgdmFyIG9uQ2hhbmdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmIChrby5pc1dyaXRlYWJsZU9ic2VydmFibGUoc2VsZikpIHtcbiAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9ICQoZS5saXN0ZW5lckRhdGEpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKCEoKHNlbGYoKSA9PT0gbnVsbCB8fCBzZWxmKCkgPT09IFwiXCIpICYmIChuZXdWYWx1ZSA9PT0gbnVsbCB8fCBuZXdWYWx1ZSA9PT0gXCJcIikpKSB7XG4gICAgICAgICAgICAgICAgc2VsZihuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBlZGl0b3Iub24oJ2NoYW5nZScsIG9uQ2hhbmdlLCBtb2RlbFZhbHVlLCBlbGVtZW50KTtcbiAgICBlZGl0b3Iub24oJ2FmdGVyQ29tbWFuZEV4ZWMnLCAoZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5uYW1lID09ICdsYW5ndWFnZScpIHtcbiAgICAgICAgICAgIGxhbmd1YWdlKGV2ZW50LmRhdGEuY29tbWFuZERhdGEpO1xuICAgICAgICB9XG4gICAgfSksIG1vZGVsVmFsdWUsIGVsZW1lbnQpO1xuXG4gICAgbW9kZWxWYWx1ZS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZSh2YWx1ZUFjY2Vzc29yKCkpO1xuICAgICAgICBpZiAoZWRpdG9yLmdldERhdGEoKSAhPSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBhbmQgdGhlbiBhZGQgYmFjayB0byBwcmV2ZW50IGBzZXREYXRhYFxuICAgICAgICAgICAgLy8gZnJvbSB0cmlnZ2VyaW5nIHRoZSBvbkNoYW5nZSBldmVudFxuICAgICAgICAgICAgZWRpdG9yLnJlbW92ZUxpc3RlbmVyKCdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0RGF0YShuZXdWYWx1ZSk7XG4gICAgICAgICAgICBlZGl0b3Iub24oJ2NoYW5nZScsIG9uQ2hhbmdlLCBtb2RlbFZhbHVlLCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgLy8gSGFuZGxlIGRpc3Bvc2FsIGlmIEtPIHJlbW92ZXMgYW4gZWRpdG9yIHRocm91Z2ggdGVtcGxhdGUgYmluZGluZ1xuICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soZWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBlZGl0b3IudXBkYXRlRWxlbWVudCgpO1xuICAgICAgICBlZGl0b3IuZGVzdHJveSgpO1xuICAgIH0pO1xufTtcblxua28uYmluZGluZ0hhbmRsZXJzLmNrZWRpdG9yID0ge1xuICAgIGluaXQ6IChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5ncykgPT4ge1xuICAgICAgICB3aW5kb3cualF1ZXJ5ID0gJDtcbiAgICAgICAgcmVxdWlyZShbJ2NrZWRpdG9yNCcsICdja2VkaXRvci1qcXVlcnknXSwgKCkgPT4ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZShlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5ncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5rby5iaW5kaW5nSGFuZGxlcnMuY2tlZGl0b3IuaW5pdCA9IGtvLmJpbmRpbmdIYW5kbGVycy5ja2VkaXRvci5pbml0LmJpbmQoa28uYmluZGluZ0hhbmRsZXJzLmNrZWRpdG9yKVxuXG5leHBvcnQgZGVmYXVsdCBrby5iaW5kaW5nSGFuZGxlcnMuY2tlZGl0b3I7XG4iXSwibmFtZXMiOlsiJCIsImtvIiwiYXJjaGVzIiwiaW5pdGlhbGl6ZSIsImVsZW1lbnQiLCJ2YWx1ZUFjY2Vzc29yIiwiYWxsQmluZGluZ3MiLCJfYWxsQmluZGluZ3MiLCJtb2RlbFZhbHVlIiwidmFsdWUiLCJ1dGlscyIsInVud3JhcE9ic2VydmFibGUiLCJsYW5ndWFnZSIsImdldCIsIm9ic2VydmFibGUiLCJhY3RpdmVMYW5ndWFnZSIsImRpcmVjdGlvbiIsImFjdGl2ZUxhbmd1YWdlRGlyIiwiJGVsZW1lbnQiLCJvcHRpb25zIiwiYm9keUlkIiwibGFuZ3VhZ2VMaXN0IiwiX2kiLCJfT2JqZWN0JGtleXMiLCJPYmplY3QiLCJrZXlzIiwibGFuZ3VhZ2VzIiwibGVuZ3RoIiwibGFuZyIsInB1c2giLCJjb25jYXQiLCJDS0VESVRPUiIsImNvbmZpZyIsImxhbmd1YWdlX2xpc3QiLCJjb250ZW50c0xhbmdEaXJlY3Rpb24iLCJhdXRvUGFyYWdyYXBoIiwidG9vbGJhciIsIm5hbWUiLCJncm91cHMiLCJpdGVtcyIsInN1YnNjcmliZSIsIm5ld1ZhbHVlIiwicmVwbGFjZSIsImhhcyIsIm9wdHMiLCJfdHlwZW9mIiwiaHRtbCIsImVkaXRvciIsImNrZWRpdG9yIiwicGxhY2Vob2xkZXIiLCJlZGl0b3JwbGFjZWhvbGRlciIsInVud3JhcCIsImRlZmF1bHRWYWx1ZSIsImF0dHIiLCJkaXNhYmxlZCIsImVkaXRhYmxlIiwic2V0UmVhZE9ubHkiLCJvbkNoYW5nZSIsImUiLCJzZWxmIiwiaXNXcml0ZWFibGVPYnNlcnZhYmxlIiwibGlzdGVuZXJEYXRhIiwidmFsIiwib24iLCJldmVudCIsImRhdGEiLCJjb21tYW5kRGF0YSIsImdldERhdGEiLCJyZW1vdmVMaXN0ZW5lciIsInNldERhdGEiLCJkb21Ob2RlRGlzcG9zYWwiLCJhZGREaXNwb3NlQ2FsbGJhY2siLCJ1cGRhdGVFbGVtZW50IiwiZGVzdHJveSIsImJpbmRpbmdIYW5kbGVycyIsImluaXQiLCJ3aW5kb3ciLCJqUXVlcnkiLCJyZXF1aXJlIiwiYmluZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9