"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[37367],{

/***/ 37367:
/*!***************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/rdm/modals/import-concept-form.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! backbone */ 77186);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var models_concept__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! models/concept */ 10359);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backbone__WEBPACK_IMPORTED_MODULE_1___default().View.extend({
  initialize: function initialize() {
    var self = this;
    self.$el.find("#error_text").closest('.row').addClass('hidden');
    self.$el.find("[name=concept_identifiers]").val('');
    this.endpoint = this.$el.find('#sparql_endpoint').select2({
      minimumResultsForSearch: -1
    });
    this.$el.find('select.concept_import').select2({
      // multiple: false,
      // maximumselectionsize: 1,
      minimumInputLength: 2,
      id: function id(result) {
        return result.Subject.value;
      },
      ajax: {
        url: arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.search_sparql_endpoint,
        dataType: 'json',
        data: function data(requestParams) {
          return {
            terms: requestParams.term,
            endpoint: self.endpoint.val()
          };
        },
        processResults: function processResults(data, page) {
          data.results.bindings.forEach(function (item) {
            item.id = item.Subject.value;
            return item;
          });
          return {
            results: data.results.bindings
          };
        }
      },
      templateResult: function templateResult(result, container, query, escapeMarkup) {
        var _result$Subject, _result$Subject2, _result$ScopeNote;
        if (result.loading || result.children) {
          return result.text;
        }
        var formatedresult = '<span class="concept_result">' + result.Term.value + '</span> - <a href="' + (result === null || result === void 0 || (_result$Subject = result.Subject) === null || _result$Subject === void 0 ? void 0 : _result$Subject.value) + '" target="_blank">' + (result === null || result === void 0 || (_result$Subject2 = result.Subject) === null || _result$Subject2 === void 0 ? void 0 : _result$Subject2.value) + '</a><div><i class="concept_result_schemaname">(' + (result === null || result === void 0 || (_result$ScopeNote = result.ScopeNote) === null || _result$ScopeNote === void 0 ? void 0 : _result$ScopeNote.value) + ')</i></div>';
        return formatedresult;
      },
      escapeMarkup: function escapeMarkup(m) {
        return m;
      }
    }).on("select2:selecting", function (e) {
      self.trigger("select2:selecting", e);
      self.$el.find("[name=concept_identifiers]").val(e.params.args.data.id);
    });
    this.modal = this.$el.find('form');
    this.modal.validate({
      ignore: null,
      rules: {
        concept_identifiers: "required"
      },
      submitHandler: function submitHandler(form) {
        var data = {
          'ids': self.$el.find("[name=concept_identifiers]").val(),
          'endpoint': self.endpoint.val(),
          'model': self.model.toJSON()
        };
        self.$el.find("#error_text").closest('.row').addClass('hidden');
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          type: "POST",
          url: arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.from_sparql_endpoint.replace('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', self.model.get('id')),
          data: JSON.stringify(data),
          success: function success() {
            self.modal.on('hidden.bs.modal', function (e) {
              self.trigger('conceptsImported');
            });
            self.modal.modal('hide');
          },
          error: function error(response) {
            var el = self.$el.find("#error_text");
            el.closest('.row').removeClass('hidden');
            el.html(response.responseText);
          }
        });
        return false;
      }
    });
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZDMxYmMyZTM3NTNiZTRhNzgyZGYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNTO0FBQ0o7QUFDYztBQUcxQyxpRUFBZUMsb0RBQWEsQ0FBQ0ksTUFBTSxDQUFDO0VBRWhDQyxVQUFVLEVBQUUsU0FBWkEsVUFBVUEsQ0FBQSxFQUFZO0lBQ2xCLElBQUlDLElBQUksR0FBRyxJQUFJO0lBQ2ZBLElBQUksQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUMvREosSUFBSSxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDRyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQ25ELElBQUksQ0FBQ0MsUUFBUSxHQUFHLElBQUksQ0FBQ0wsR0FBRyxDQUFDQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQ0ssT0FBTyxDQUFDO01BQ3REQyx1QkFBdUIsRUFBRSxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQ1AsR0FBRyxDQUFDQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQ0ssT0FBTyxDQUFDO01BQzNDO01BQ0E7TUFDQUUsa0JBQWtCLEVBQUUsQ0FBQztNQUNyQkMsRUFBRSxFQUFFLFNBQUpBLEVBQUVBLENBQVdDLE1BQU0sRUFBQztRQUFFLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxLQUFLO01BQUUsQ0FBQztNQUNwREMsSUFBSSxFQUFFO1FBQ0ZDLEdBQUcsRUFBRXBCLDhDQUFNLENBQUNxQixJQUFJLENBQUNDLHNCQUFzQjtRQUN2Q0MsUUFBUSxFQUFFLE1BQU07UUFDaEJDLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFXQyxhQUFhLEVBQUU7VUFDMUIsT0FBTztZQUNIQyxLQUFLLEVBQUVELGFBQWEsQ0FBQ0UsSUFBSTtZQUN6QmhCLFFBQVEsRUFBRU4sSUFBSSxDQUFDTSxRQUFRLENBQUNELEdBQUcsQ0FBQztVQUNoQyxDQUFDO1FBQ0wsQ0FBQztRQUNEa0IsY0FBYyxFQUFFLFNBQWhCQSxjQUFjQSxDQUFXSixJQUFJLEVBQUVLLElBQUksRUFBRTtVQUNqQ0wsSUFBSSxDQUFDTSxPQUFPLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBSTtZQUNuQ0EsSUFBSSxDQUFDbEIsRUFBRSxHQUFHa0IsSUFBSSxDQUFDaEIsT0FBTyxDQUFDQyxLQUFLO1lBQzVCLE9BQU9lLElBQUk7VUFDZixDQUFDLENBQUM7VUFDRixPQUFPO1lBQUNILE9BQU8sRUFBRU4sSUFBSSxDQUFDTSxPQUFPLENBQUNDO1VBQVEsQ0FBQztRQUMzQztNQUNKLENBQUM7TUFDREcsY0FBYyxFQUFDLFNBQWZBLGNBQWNBLENBQVVsQixNQUFNLEVBQUVtQixTQUFTLEVBQUVDLEtBQUssRUFBRUMsWUFBWSxFQUFDO1FBQUEsSUFBQUMsZUFBQSxFQUFBQyxnQkFBQSxFQUFBQyxpQkFBQTtRQUMzRCxJQUFJeEIsTUFBTSxDQUFDeUIsT0FBTyxJQUFJekIsTUFBTSxDQUFDMEIsUUFBUSxFQUFFO1VBQ25DLE9BQU8xQixNQUFNLENBQUMyQixJQUFJO1FBQ3RCO1FBQ0EsSUFBSUMsY0FBYyxHQUFHLCtCQUErQixHQUFHNUIsTUFBTSxDQUFDNkIsSUFBSSxDQUFDM0IsS0FBSyxHQUFHLHFCQUFxQixJQUFHRixNQUFNLGFBQU5BLE1BQU0sZ0JBQUFzQixlQUFBLEdBQU50QixNQUFNLENBQUVDLE9BQU8sY0FBQXFCLGVBQUEsdUJBQWZBLGVBQUEsQ0FBaUJwQixLQUFLLElBQUcsb0JBQW9CLElBQUdGLE1BQU0sYUFBTkEsTUFBTSxnQkFBQXVCLGdCQUFBLEdBQU52QixNQUFNLENBQUVDLE9BQU8sY0FBQXNCLGdCQUFBLHVCQUFmQSxnQkFBQSxDQUFpQnJCLEtBQUssSUFBRyxpREFBaUQsSUFBR0YsTUFBTSxhQUFOQSxNQUFNLGdCQUFBd0IsaUJBQUEsR0FBTnhCLE1BQU0sQ0FBRThCLFNBQVMsY0FBQU4saUJBQUEsdUJBQWpCQSxpQkFBQSxDQUFtQnRCLEtBQUssSUFBRyxhQUFhO1FBQ3hRLE9BQU8wQixjQUFjO01BQ3pCLENBQUM7TUFDRFAsWUFBWSxFQUFFLFNBQWRBLFlBQVlBLENBQVdVLENBQUMsRUFBRTtRQUFFLE9BQU9BLENBQUM7TUFBRTtJQUMxQyxDQUFDLENBQUMsQ0FBQ0MsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQVNDLENBQUMsRUFBRTtNQUNuQzVDLElBQUksQ0FBQzZDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRUQsQ0FBQyxDQUFDO01BQ3BDNUMsSUFBSSxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDRyxHQUFHLENBQUN1QyxDQUFDLENBQUNFLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDNUIsSUFBSSxDQUFDVCxFQUFFLENBQUM7SUFDMUUsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDc0MsS0FBSyxHQUFHLElBQUksQ0FBQy9DLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxJQUFJLENBQUM4QyxLQUFLLENBQUNDLFFBQVEsQ0FBQztNQUNoQkMsTUFBTSxFQUFFLElBQUk7TUFDWkMsS0FBSyxFQUFFO1FBQ0hDLG1CQUFtQixFQUFFO01BQ3pCLENBQUM7TUFDREMsYUFBYSxFQUFFLFNBQWZBLGFBQWFBLENBQVdDLElBQUksRUFBRTtRQUMxQixJQUFJbkMsSUFBSSxHQUFHO1VBQ1AsS0FBSyxFQUFFbkIsSUFBSSxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDRyxHQUFHLENBQUMsQ0FBQztVQUN4RCxVQUFVLEVBQUVMLElBQUksQ0FBQ00sUUFBUSxDQUFDRCxHQUFHLENBQUMsQ0FBQztVQUMvQixPQUFPLEVBQUVMLElBQUksQ0FBQ3VELEtBQUssQ0FBQ0MsTUFBTSxDQUFDO1FBQy9CLENBQUM7UUFDRHhELElBQUksQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUMvRFgsa0RBQU0sQ0FBQztVQUNIZ0UsSUFBSSxFQUFFLE1BQU07VUFDWjFDLEdBQUcsRUFBRXBCLDhDQUFNLENBQUNxQixJQUFJLENBQUMwQyxvQkFBb0IsQ0FBQ0MsT0FBTyxDQUFDLHNDQUFzQyxFQUFFM0QsSUFBSSxDQUFDdUQsS0FBSyxDQUFDSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7VUFDM0d6QyxJQUFJLEVBQUUwQyxJQUFJLENBQUNDLFNBQVMsQ0FBQzNDLElBQUksQ0FBQztVQUMxQjRDLE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFBLEVBQVk7WUFDZi9ELElBQUksQ0FBQ2dELEtBQUssQ0FBQ0wsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQVNDLENBQUMsRUFBRTtjQUN6QzVDLElBQUksQ0FBQzZDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztZQUNwQyxDQUFDLENBQUM7WUFDRjdDLElBQUksQ0FBQ2dELEtBQUssQ0FBQ0EsS0FBSyxDQUFDLE1BQU0sQ0FBQztVQUM1QixDQUFDO1VBQ0RnQixLQUFLLEVBQUUsU0FBUEEsS0FBS0EsQ0FBV0MsUUFBUSxFQUFDO1lBQ3JCLElBQUlDLEVBQUUsR0FBR2xFLElBQUksQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3JDZ0UsRUFBRSxDQUFDL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDZ0UsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUN4Q0QsRUFBRSxDQUFDRSxJQUFJLENBQUNILFFBQVEsQ0FBQ0ksWUFBWSxDQUFDO1VBQ2xDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsT0FBTyxLQUFLO01BQ2hCO0lBQ0osQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL3JkbS9tb2RhbHMvaW1wb3J0LWNvbmNlcHQtZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBDb25jZXB0TW9kZWwgZnJvbSAnbW9kZWxzL2NvbmNlcHQnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi4kZWwuZmluZChcIiNlcnJvcl90ZXh0XCIpLmNsb3Nlc3QoJy5yb3cnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIHNlbGYuJGVsLmZpbmQoXCJbbmFtZT1jb25jZXB0X2lkZW50aWZpZXJzXVwiKS52YWwoJycpO1xuICAgICAgICB0aGlzLmVuZHBvaW50ID0gdGhpcy4kZWwuZmluZCgnI3NwYXJxbF9lbmRwb2ludCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRlbC5maW5kKCdzZWxlY3QuY29uY2VwdF9pbXBvcnQnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIC8vIG11bHRpcGxlOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIG1heGltdW1zZWxlY3Rpb25zaXplOiAxLFxuICAgICAgICAgICAgbWluaW11bUlucHV0TGVuZ3RoOiAyLFxuICAgICAgICAgICAgaWQ6IGZ1bmN0aW9uKHJlc3VsdCl7IHJldHVybiByZXN1bHQuU3ViamVjdC52YWx1ZTsgfSxcbiAgICAgICAgICAgIGFqYXg6IHtcbiAgICAgICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLnNlYXJjaF9zcGFycWxfZW5kcG9pbnQsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbihyZXF1ZXN0UGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXJtczogcmVxdWVzdFBhcmFtcy50ZXJtLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kcG9pbnQ6IHNlbGYuZW5kcG9pbnQudmFsKClcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbihkYXRhLCBwYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucmVzdWx0cy5iaW5kaW5ncy5mb3JFYWNoKChpdGVtKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaWQgPSBpdGVtLlN1YmplY3QudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7cmVzdWx0czogZGF0YS5yZXN1bHRzLmJpbmRpbmdzfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6ZnVuY3Rpb24ocmVzdWx0LCBjb250YWluZXIsIHF1ZXJ5LCBlc2NhcGVNYXJrdXApe1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubG9hZGluZyB8fCByZXN1bHQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0ZWRyZXN1bHQgPSAnPHNwYW4gY2xhc3M9XCJjb25jZXB0X3Jlc3VsdFwiPicgKyByZXN1bHQuVGVybS52YWx1ZSArICc8L3NwYW4+IC0gPGEgaHJlZj1cIicgKyByZXN1bHQ/LlN1YmplY3Q/LnZhbHVlICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyByZXN1bHQ/LlN1YmplY3Q/LnZhbHVlICsgJzwvYT48ZGl2PjxpIGNsYXNzPVwiY29uY2VwdF9yZXN1bHRfc2NoZW1hbmFtZVwiPignICsgcmVzdWx0Py5TY29wZU5vdGU/LnZhbHVlICsgJyk8L2k+PC9kaXY+JztcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0ZWRyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlTWFya3VwOiBmdW5jdGlvbihtKSB7IHJldHVybiBtOyB9XG4gICAgICAgIH0pLm9uKFwic2VsZWN0MjpzZWxlY3RpbmdcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgc2VsZi50cmlnZ2VyKFwic2VsZWN0MjpzZWxlY3RpbmdcIiwgZSk7XG4gICAgICAgICAgICBzZWxmLiRlbC5maW5kKFwiW25hbWU9Y29uY2VwdF9pZGVudGlmaWVyc11cIikudmFsKGUucGFyYW1zLmFyZ3MuZGF0YS5pZCk7XG4gICAgICAgIH0pOyAgICAgIFxuXG4gICAgICAgIHRoaXMubW9kYWwgPSB0aGlzLiRlbC5maW5kKCdmb3JtJyk7XG4gICAgICAgIHRoaXMubW9kYWwudmFsaWRhdGUoe1xuICAgICAgICAgICAgaWdub3JlOiBudWxsLFxuICAgICAgICAgICAgcnVsZXM6IHtcbiAgICAgICAgICAgICAgICBjb25jZXB0X2lkZW50aWZpZXJzOiBcInJlcXVpcmVkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbihmb3JtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICdpZHMnOiBzZWxmLiRlbC5maW5kKFwiW25hbWU9Y29uY2VwdF9pZGVudGlmaWVyc11cIikudmFsKCksXG4gICAgICAgICAgICAgICAgICAgICdlbmRwb2ludCc6IHNlbGYuZW5kcG9pbnQudmFsKCksXG4gICAgICAgICAgICAgICAgICAgICdtb2RlbCc6IHNlbGYubW9kZWwudG9KU09OKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsLmZpbmQoXCIjZXJyb3JfdGV4dFwiKS5jbG9zZXN0KCcucm93JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLmZyb21fc3BhcnFsX2VuZHBvaW50LnJlcGxhY2UoJ2FhYWFhYWFhLWFhYWEtYWFhYS1hYWFhLWFhYWFhYWFhYWFhYScsIHNlbGYubW9kZWwuZ2V0KCdpZCcpKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyKCdjb25jZXB0c0ltcG9ydGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSBzZWxmLiRlbC5maW5kKFwiI2Vycm9yX3RleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbG9zZXN0KCcucm93JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuaHRtbChyZXNwb25zZS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbIiQiLCJCYWNrYm9uZSIsImFyY2hlcyIsIkNvbmNlcHRNb2RlbCIsIlZpZXciLCJleHRlbmQiLCJpbml0aWFsaXplIiwic2VsZiIsIiRlbCIsImZpbmQiLCJjbG9zZXN0IiwiYWRkQ2xhc3MiLCJ2YWwiLCJlbmRwb2ludCIsInNlbGVjdDIiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm1pbmltdW1JbnB1dExlbmd0aCIsImlkIiwicmVzdWx0IiwiU3ViamVjdCIsInZhbHVlIiwiYWpheCIsInVybCIsInVybHMiLCJzZWFyY2hfc3BhcnFsX2VuZHBvaW50IiwiZGF0YVR5cGUiLCJkYXRhIiwicmVxdWVzdFBhcmFtcyIsInRlcm1zIiwidGVybSIsInByb2Nlc3NSZXN1bHRzIiwicGFnZSIsInJlc3VsdHMiLCJiaW5kaW5ncyIsImZvckVhY2giLCJpdGVtIiwidGVtcGxhdGVSZXN1bHQiLCJjb250YWluZXIiLCJxdWVyeSIsImVzY2FwZU1hcmt1cCIsIl9yZXN1bHQkU3ViamVjdCIsIl9yZXN1bHQkU3ViamVjdDIiLCJfcmVzdWx0JFNjb3BlTm90ZSIsImxvYWRpbmciLCJjaGlsZHJlbiIsInRleHQiLCJmb3JtYXRlZHJlc3VsdCIsIlRlcm0iLCJTY29wZU5vdGUiLCJtIiwib24iLCJlIiwidHJpZ2dlciIsInBhcmFtcyIsImFyZ3MiLCJtb2RhbCIsInZhbGlkYXRlIiwiaWdub3JlIiwicnVsZXMiLCJjb25jZXB0X2lkZW50aWZpZXJzIiwic3VibWl0SGFuZGxlciIsImZvcm0iLCJtb2RlbCIsInRvSlNPTiIsInR5cGUiLCJmcm9tX3NwYXJxbF9lbmRwb2ludCIsInJlcGxhY2UiLCJnZXQiLCJKU09OIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsImVycm9yIiwicmVzcG9uc2UiLCJlbCIsInJlbW92ZUNsYXNzIiwiaHRtbCIsInJlc3BvbnNlVGV4dCJdLCJzb3VyY2VSb290IjoiIn0=