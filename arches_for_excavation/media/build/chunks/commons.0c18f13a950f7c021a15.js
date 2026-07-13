"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[34859],{

/***/ 34859:
/*!******************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/rdm/modals/delete-collection-form.js ***!
  \******************************************************************************************************************/
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
/* harmony import */ var models_value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! models/value */ 50494);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backbone__WEBPACK_IMPORTED_MODULE_1___default().View.extend({
  initialize: function initialize(e) {
    var self = this;
    this.modal = this.$el.find('.modal');
    this.title = this.modal.find('h4').text();

    // test to see if select2 has already been applied to the dom
    if (!this.$el.find('.select2').attr('id')) {
      this.collectiondropdown = this.$el.find('.select2').select2({
        placeholder: arches__WEBPACK_IMPORTED_MODULE_2__["default"].translations.selectAnOption
      }).on("select2:selecting", function (e) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          url: arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.confirm_delete.replace('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', e.params.args.data.id),
          success: function success(response) {
            self.modal.find('.modal-body [name="additional-info"]').html(response);
          }
        });
      });
    }
    this.modal.validate({
      ignore: null,
      rules: {
        scheme_dd: "required"
      },
      submitHandler: function submitHandler(form) {
        self.modal.find('h4').text(' ' + self.title);
        self.modal.find('.modal-title').addClass('loading');
        self.model = new models_concept__WEBPACK_IMPORTED_MODULE_3__["default"]({
          'id': self.collectiondropdown.val(),
          'nodetype': 'Collection',
          'delete_self': true
        });
        self.model.delete(function () {
          self.modal.find('h4').text(self.title);
          self.modal.find('.modal-title').removeClass('loading');
          self.modal.modal('hide');
          self.trigger('collectionDeleted');
        }, self);
      }
    });
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUosQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL3JkbS9tb2RhbHMvZGVsZXRlLWNvbGxlY3Rpb24tZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBDb25jZXB0TW9kZWwgZnJvbSAnbW9kZWxzL2NvbmNlcHQnO1xuaW1wb3J0IFZhbHVlTW9kZWwgZnJvbSAnbW9kZWxzL3ZhbHVlJztcblxuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm1vZGFsID0gdGhpcy4kZWwuZmluZCgnLm1vZGFsJyk7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLm1vZGFsLmZpbmQoJ2g0JykudGV4dCgpO1xuXG4gICAgICAgIC8vIHRlc3QgdG8gc2VlIGlmIHNlbGVjdDIgaGFzIGFscmVhZHkgYmVlbiBhcHBsaWVkIHRvIHRoZSBkb21cbiAgICAgICAgaWYgKCEgdGhpcy4kZWwuZmluZCgnLnNlbGVjdDInKS5hdHRyKCdpZCcpKXtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbmRyb3Bkb3duID0gdGhpcy4kZWwuZmluZCgnLnNlbGVjdDInKS5zZWxlY3QyKHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogYXJjaGVzLnRyYW5zbGF0aW9ucy5zZWxlY3RBbk9wdGlvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oXCJzZWxlY3QyOnNlbGVjdGluZ1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLmNvbmZpcm1fZGVsZXRlLnJlcGxhY2UoJ2FhYWFhYWFhLWFhYWEtYWFhYS1hYWFhLWFhYWFhYWFhYWFhYScsIGUucGFyYW1zLmFyZ3MuZGF0YS5pZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubW9kYWwuZmluZCgnLm1vZGFsLWJvZHkgW25hbWU9XCJhZGRpdGlvbmFsLWluZm9cIl0nKS5odG1sKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICBcbiAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RhbC52YWxpZGF0ZSh7XG4gICAgICAgICAgICBpZ25vcmU6IG51bGwsXG4gICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgIHNjaGVtZV9kZDogXCJyZXF1aXJlZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgICAgICAgIHNlbGYubW9kYWwuZmluZCgnaDQnKS50ZXh0KCcgJyArIHNlbGYudGl0bGUpO1xuICAgICAgICAgICAgICAgIHNlbGYubW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICBzZWxmLm1vZGVsID0gbmV3IENvbmNlcHRNb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6c2VsZi5jb2xsZWN0aW9uZHJvcGRvd24udmFsKCksXG4gICAgICAgICAgICAgICAgICAgICdub2RldHlwZSc6ICdDb2xsZWN0aW9uJywgXG4gICAgICAgICAgICAgICAgICAgICdkZWxldGVfc2VsZic6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHNlbGYubW9kZWwuZGVsZXRlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubW9kYWwuZmluZCgnaDQnKS50ZXh0KHNlbGYudGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyKCdjb2xsZWN0aW9uRGVsZXRlZCcpO1xuICAgICAgICAgICAgICAgIH0sIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbIiQiLCJCYWNrYm9uZSIsImFyY2hlcyIsIkNvbmNlcHRNb2RlbCIsIlZhbHVlTW9kZWwiLCJWaWV3IiwiZXh0ZW5kIiwiaW5pdGlhbGl6ZSIsImUiLCJzZWxmIiwibW9kYWwiLCIkZWwiLCJmaW5kIiwidGl0bGUiLCJ0ZXh0IiwiYXR0ciIsImNvbGxlY3Rpb25kcm9wZG93biIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsInRyYW5zbGF0aW9ucyIsInNlbGVjdEFuT3B0aW9uIiwib24iLCJhamF4IiwidXJsIiwidXJscyIsImNvbmZpcm1fZGVsZXRlIiwicmVwbGFjZSIsInBhcmFtcyIsImFyZ3MiLCJkYXRhIiwiaWQiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJodG1sIiwidmFsaWRhdGUiLCJpZ25vcmUiLCJydWxlcyIsInNjaGVtZV9kZCIsInN1Ym1pdEhhbmRsZXIiLCJmb3JtIiwiYWRkQ2xhc3MiLCJtb2RlbCIsInZhbCIsImRlbGV0ZSIsInJlbW92ZUNsYXNzIiwidHJpZ2dlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9