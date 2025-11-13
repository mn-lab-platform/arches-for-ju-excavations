"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[34682],{

/***/ 34682:
/*!***********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/concept-search.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! backbone */ 77186);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var select_woo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! select-woo */ 95586);
/* harmony import */ var select_woo__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(select_woo__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! arches */ 77126);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backbone__WEBPACK_IMPORTED_MODULE_2___default().View.extend({
  initialize: function initialize(options) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(this, options);
    this.render();
  },
  render: function render() {
    var self = this;
    this.searchbox = this.$el.find('select.concept_search_widget').selectWoo({
      multiple: false,
      maximumselectionsize: 1,
      minimumInputLength: 2,
      placeholder: arches__WEBPACK_IMPORTED_MODULE_4__["default"].translations.searchForAConcept,
      ajax: {
        url: this.getUrl,
        dataType: 'json',
        data: function data(requestParams) {
          var term = requestParams.term || '';
          var page = requestParams.page || 1;
          return {
            q: term,
            // search term
            page_limit: 30
          };
        },
        processResults: function processResults(data) {
          var results = [];
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(data.hits.hits, function () {
            results.push({
              id: this._source.conceptid,
              text: this._source.value,
              scheme_id: this._type,
              scheme: this.in_scheme_name
            });
          }, this);
          return {
            "results": results,
            "pagination": {
              "more": false
            }
          };
        }
      },
      templateResult: function templateResult(result) {
        result.scheme = result.scheme ? '(' + underscore__WEBPACK_IMPORTED_MODULE_1___default().escape(result.scheme) + ')' : '';
        var formatedresult = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span class="concept_result">' + result.text + '</span><i class="concept_result_schemaname">' + result.scheme + '</i>');
        return formatedresult;
      },
      escapeMarkup: function escapeMarkup(m) {
        return m;
      }
    }).on("select2:selecting", function (e) {
      self.trigger("select2:selecting", e);
    });
  },
  getUrl: function getUrl() {
    return arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.concept_search;
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVJBLE1BQU1BLENBQUEsRUFBWTtJQUNkLE9BQU9uQiw4Q0FBTSxDQUFDa0QsSUFBSSxDQUFDQyxjQUFjO0VBQ3JDO0FBRUosQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb25jZXB0LXNlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IFNlbGVjdDIgZnJvbSAnc2VsZWN0LXdvbyc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgQmFja2JvbmUuVmlldy5leHRlbmQoe1xuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAkLmV4dGVuZCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuc2VhcmNoYm94ID0gdGhpcy4kZWwuZmluZCgnc2VsZWN0LmNvbmNlcHRfc2VhcmNoX3dpZGdldCcpLnNlbGVjdFdvbyh7XG4gICAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBtYXhpbXVtc2VsZWN0aW9uc2l6ZTogMSxcbiAgICAgICAgICAgIG1pbmltdW1JbnB1dExlbmd0aDogMixcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBhcmNoZXMudHJhbnNsYXRpb25zLnNlYXJjaEZvckFDb25jZXB0LFxuICAgICAgICAgICAgYWpheDoge1xuICAgICAgICAgICAgICAgIHVybDogdGhpcy5nZXRVcmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbihyZXF1ZXN0UGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXJtID0gcmVxdWVzdFBhcmFtcy50ZXJtIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZSA9IHJlcXVlc3RQYXJhbXMucGFnZSB8fCAxO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcTogdGVybSwgLy8gc2VhcmNoIHRlcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VfbGltaXQ6IDMwXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS5oaXRzLmhpdHMsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLl9zb3VyY2UuY29uY2VwdGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuX3NvdXJjZS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWVfaWQ6IHRoaXMuX3R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB0aGlzLmluX3NjaGVtZV9uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogcmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFnaW5hdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtb3JlXCI6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OmZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNjaGVtZSA9IHJlc3VsdC5zY2hlbWUgPyAnKCcgKyBfLmVzY2FwZShyZXN1bHQuc2NoZW1lKSArICcpJyA6ICcnO1xuICAgICAgICAgICAgICAgIHZhciBmb3JtYXRlZHJlc3VsdCA9ICQoJzxzcGFuIGNsYXNzPVwiY29uY2VwdF9yZXN1bHRcIj4nICsgcmVzdWx0LnRleHQgICsgJzwvc3Bhbj48aSBjbGFzcz1cImNvbmNlcHRfcmVzdWx0X3NjaGVtYW5hbWVcIj4nICsgcmVzdWx0LnNjaGVtZSArICc8L2k+Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdGVkcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVzY2FwZU1hcmt1cDogZnVuY3Rpb24obSkgeyByZXR1cm4gbTsgfVxuICAgICAgICB9KS5vbihcInNlbGVjdDI6c2VsZWN0aW5nXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlbGYudHJpZ2dlcihcInNlbGVjdDI6c2VsZWN0aW5nXCIsIGUpO1xuICAgICAgICB9KTsgXG4gICAgfSxcblxuICAgIGdldFVybDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGFyY2hlcy51cmxzLmNvbmNlcHRfc2VhcmNoO1xuICAgIH1cblxufSk7XG4iXSwibmFtZXMiOlsiJCIsIl8iLCJCYWNrYm9uZSIsIlNlbGVjdDIiLCJhcmNoZXMiLCJWaWV3IiwiZXh0ZW5kIiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJyZW5kZXIiLCJzZWxmIiwic2VhcmNoYm94IiwiJGVsIiwiZmluZCIsInNlbGVjdFdvbyIsIm11bHRpcGxlIiwibWF4aW11bXNlbGVjdGlvbnNpemUiLCJtaW5pbXVtSW5wdXRMZW5ndGgiLCJwbGFjZWhvbGRlciIsInRyYW5zbGF0aW9ucyIsInNlYXJjaEZvckFDb25jZXB0IiwiYWpheCIsInVybCIsImdldFVybCIsImRhdGFUeXBlIiwiZGF0YSIsInJlcXVlc3RQYXJhbXMiLCJ0ZXJtIiwicGFnZSIsInEiLCJwYWdlX2xpbWl0IiwicHJvY2Vzc1Jlc3VsdHMiLCJyZXN1bHRzIiwiZWFjaCIsImhpdHMiLCJwdXNoIiwiaWQiLCJfc291cmNlIiwiY29uY2VwdGlkIiwidGV4dCIsInZhbHVlIiwic2NoZW1lX2lkIiwiX3R5cGUiLCJzY2hlbWUiLCJpbl9zY2hlbWVfbmFtZSIsInRlbXBsYXRlUmVzdWx0IiwicmVzdWx0IiwiZXNjYXBlIiwiZm9ybWF0ZWRyZXN1bHQiLCJlc2NhcGVNYXJrdXAiLCJtIiwib24iLCJlIiwidHJpZ2dlciIsInVybHMiLCJjb25jZXB0X3NlYXJjaCJdLCJzb3VyY2VSb290IjoiIn0=