"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[73641],{

/***/ 73641:
/*!*****************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/ontology.js ***!
  \*****************************************************************************************/
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



var ontologyUtils = {
  /**
   * makeFriendly - makes a shortened name from a fully qualified name
   * (eg: "http://www.cidoc-crm.org/cidoc-crm/E74_Group")
   *
   * @param  {ontologyName} the request method name
   * @return {string}
   */
  makeFriendly: function makeFriendly(ontologyName) {
    ontologyName = knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(ontologyName);
    if (!!ontologyName) {
      var parts = ontologyName.split("/");
      return parts[parts.length - 1];
    }
    return '';
  },
  getSelect2ConfigForOntologyProperties: function getSelect2ConfigForOntologyProperties(value, domain, range, placeholder, allowClear) {
    return {
      value: value,
      clickBubble: false,
      placeholder: placeholder,
      closeOnSelect: true,
      allowClear: allowClear || false,
      ajax: {
        url: arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.ontology_properties,
        data: function data(requestParams) {
          var data = {
            'domain_ontology_class': domain,
            'range_ontology_class': range,
            'ontologyid': ''
          };
          return data;
        },
        dataType: 'json',
        quietMillis: 250,
        processResults: function processResults(data, params) {
          var ret = data;
          if (!!params.term && params.term !== "") {
            ret = data.filter(function (item) {
              return item.toUpperCase().includes(params.term.toUpperCase());
            });
          }
          ret = ret.map(function (item) {
            return {
              id: item,
              text: item
            };
          });
          return {
            results: ret
          };
        }
      },
      templateResult: function templateResult(item) {
        return ontologyUtils.makeFriendly(item.text);
      },
      templateSelection: function templateSelection(item) {
        return ontologyUtils.makeFriendly(item.text);
      },
      initSelection: function initSelection(el, callback) {
        if (!!value()) {
          var data = {
            id: value(),
            text: value()
          };
          var option = new Option(data.text, data.id, true, true);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).append(option);
          callback([data]);
        } else {
          callback([]);
        }
      }
    };
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ontologyUtils);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixLQUFLLENBQUMsQ0FBQztZQUFFeUIsSUFBSSxFQUFFekIsS0FBSyxDQUFDO1VBQUUsQ0FBQztVQUMzQyxJQUFNZ0MsTUFBTSxHQUFHLElBQUlDLE1BQU0sQ0FBQ3RCLElBQUksQ0FBQ2MsSUFBSSxFQUFFZCxJQUFJLENBQUNhLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1VBQ3pEbkMsNkNBQUMsQ0FBQ3lDLEVBQUUsQ0FBQyxDQUFDSSxNQUFNLENBQUNGLE1BQU0sQ0FBQztVQUNwQkQsUUFBUSxDQUFDLENBQUNwQixJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDLE1BQU07VUFDSG9CLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDaEI7TUFDSjtJQUNKLENBQUM7RUFDTDtBQUNKLENBQUM7QUFFRCxpRUFBZXZDLGFBQWEsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3V0aWxzL29udG9sb2d5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuXG5jb25zdCBvbnRvbG9neVV0aWxzID0ge1xuICAgIC8qKlxuICAgICAqIG1ha2VGcmllbmRseSAtIG1ha2VzIGEgc2hvcnRlbmVkIG5hbWUgZnJvbSBhIGZ1bGx5IHF1YWxpZmllZCBuYW1lXG4gICAgICogKGVnOiBcImh0dHA6Ly93d3cuY2lkb2MtY3JtLm9yZy9jaWRvYy1jcm0vRTc0X0dyb3VwXCIpXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtvbnRvbG9neU5hbWV9IHRoZSByZXF1ZXN0IG1ldGhvZCBuYW1lXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIG1ha2VGcmllbmRseTogZnVuY3Rpb24ob250b2xvZ3lOYW1lKSB7XG4gICAgICAgIG9udG9sb2d5TmFtZSA9IGtvLnVud3JhcChvbnRvbG9neU5hbWUpO1xuICAgICAgICBpZiAoISFvbnRvbG9neU5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gb250b2xvZ3lOYW1lLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfSxcblxuICAgIGdldFNlbGVjdDJDb25maWdGb3JPbnRvbG9neVByb3BlcnRpZXM6IGZ1bmN0aW9uKHZhbHVlLCBkb21haW4sIHJhbmdlLCBwbGFjZWhvbGRlciwgYWxsb3dDbGVhcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgY2xpY2tCdWJibGU6IGZhbHNlLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgY2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGFsbG93Q2xlYXI6IGFsbG93Q2xlYXIgfHwgZmFsc2UsXG4gICAgICAgICAgICBhamF4OiB7XG4gICAgICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5vbnRvbG9neV9wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uKHJlcXVlc3RQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdkb21haW5fb250b2xvZ3lfY2xhc3MnOiBkb21haW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAncmFuZ2Vfb250b2xvZ3lfY2xhc3MnOiByYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdvbnRvbG9neWlkJzogJydcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIHF1aWV0TWlsbGlzOiAyNTAsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uKGRhdGEsIHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhcGFyYW1zLnRlcm0gJiYgcGFyYW1zLnRlcm0gIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS50b1VwcGVyQ2FzZSgpLmluY2x1ZGVzKHBhcmFtcy50ZXJtLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gcmV0Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGl0ZW0sIHRleHQ6IGl0ZW0gfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiByZXRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb250b2xvZ3lVdGlscy5tYWtlRnJpZW5kbHkoaXRlbS50ZXh0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbnRvbG9neVV0aWxzLm1ha2VGcmllbmRseShpdGVtLnRleHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRTZWxlY3Rpb246IGZ1bmN0aW9uKGVsLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmICghIXZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHsgaWQ6IHZhbHVlKCksIHRleHQ6IHZhbHVlKCkgfTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gbmV3IE9wdGlvbihkYXRhLnRleHQsIGRhdGEuaWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkKGVsKS5hcHBlbmQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soW2RhdGFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9udG9sb2d5VXRpbHM7XG4iXSwibmFtZXMiOlsiJCIsImtvIiwiYXJjaGVzIiwib250b2xvZ3lVdGlscyIsIm1ha2VGcmllbmRseSIsIm9udG9sb2d5TmFtZSIsInVud3JhcCIsInBhcnRzIiwic3BsaXQiLCJsZW5ndGgiLCJnZXRTZWxlY3QyQ29uZmlnRm9yT250b2xvZ3lQcm9wZXJ0aWVzIiwidmFsdWUiLCJkb21haW4iLCJyYW5nZSIsInBsYWNlaG9sZGVyIiwiYWxsb3dDbGVhciIsImNsaWNrQnViYmxlIiwiY2xvc2VPblNlbGVjdCIsImFqYXgiLCJ1cmwiLCJ1cmxzIiwib250b2xvZ3lfcHJvcGVydGllcyIsImRhdGEiLCJyZXF1ZXN0UGFyYW1zIiwiZGF0YVR5cGUiLCJxdWlldE1pbGxpcyIsInByb2Nlc3NSZXN1bHRzIiwicGFyYW1zIiwicmV0IiwidGVybSIsImZpbHRlciIsIml0ZW0iLCJ0b1VwcGVyQ2FzZSIsImluY2x1ZGVzIiwibWFwIiwiaWQiLCJ0ZXh0IiwicmVzdWx0cyIsInRlbXBsYXRlUmVzdWx0IiwidGVtcGxhdGVTZWxlY3Rpb24iLCJpbml0U2VsZWN0aW9uIiwiZWwiLCJjYWxsYmFjayIsIm9wdGlvbiIsIk9wdGlvbiIsImFwcGVuZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9