"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[59318],{

/***/ 59318:
/*!**************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/rdm/modals/delete-scheme-form.js ***!
  \**************************************************************************************************************/
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
  initialize: function initialize(options) {
    var self = this;
    this.modal = this.$el.find('.modal');
    this.viewModel = options.viewModel;

    // test to see if select2 has already been applied to the dom
    if (!this.$el.find('.select2').attr('id')) {
      this.schemedropdown = this.$el.find('.select2').select2({
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
        self.viewModel.loading(true);
        self.model = new models_concept__WEBPACK_IMPORTED_MODULE_3__["default"]({
          'id': self.schemedropdown.val(),
          'nodetype': 'ConceptScheme',
          'delete_self': true
        });
        self.model.delete(function () {
          self.modal.modal('hide');
          self.viewModel.loading(true);
          self.trigger('conceptSchemeDeleted');
        }, self);
      }
    });
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNjNlZTY2NDc5MWUxNjRlZmFiMDUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDUztBQUNKO0FBQ2M7QUFDSjtBQUd0QyxpRUFBZUMsb0RBQWEsQ0FBQ0ssTUFBTSxDQUFDO0VBRWhDQyxVQUFVLEVBQUUsU0FBWkEsVUFBVUEsQ0FBV0MsT0FBTyxFQUFDO0lBQ3pCLElBQUlDLElBQUksR0FBRyxJQUFJO0lBQ2YsSUFBSSxDQUFDQyxLQUFLLEdBQUcsSUFBSSxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsSUFBSSxDQUFDQyxTQUFTLEdBQUdMLE9BQU8sQ0FBQ0ssU0FBUzs7SUFFbEM7SUFDQSxJQUFJLENBQUUsSUFBSSxDQUFDRixHQUFHLENBQUNDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO01BQ3ZDLElBQUksQ0FBQ0MsY0FBYyxHQUFHLElBQUksQ0FBQ0osR0FBRyxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUNJLE9BQU8sQ0FBQztRQUNwREMsV0FBVyxFQUFFZiw4Q0FBTSxDQUFDZ0IsWUFBWSxDQUFDQztNQUNyQyxDQUFDLENBQUMsQ0FDR0MsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQVNDLENBQUMsRUFBRTtRQUNqQ3JCLGtEQUFNLENBQUM7VUFDSHVCLEdBQUcsRUFBRXJCLDhDQUFNLENBQUNzQixJQUFJLENBQUNDLGNBQWMsQ0FBQ0MsT0FBTyxDQUFDLHNDQUFzQyxFQUFFTCxDQUFDLENBQUNNLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDQyxJQUFJLENBQUNDLEVBQUUsQ0FBQztVQUN0R0MsT0FBTyxFQUFFLFNBQVRBLE9BQU9BLENBQVdDLFFBQVEsRUFBRTtZQUN4QnZCLElBQUksQ0FBQ0MsS0FBSyxDQUFDRSxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQ3FCLElBQUksQ0FBQ0QsUUFBUSxDQUFDO1VBQzFFO1FBQ0osQ0FBQyxDQUFDO01BQ04sQ0FBQyxDQUFDO0lBQ1Y7SUFFQSxJQUFJLENBQUN0QixLQUFLLENBQUN3QixRQUFRLENBQUM7TUFDaEJDLE1BQU0sRUFBRSxJQUFJO01BQ1pDLEtBQUssRUFBRTtRQUNIQyxTQUFTLEVBQUU7TUFDZixDQUFDO01BQ0RDLGFBQWEsRUFBRSxTQUFmQSxhQUFhQSxDQUFXQyxJQUFJLEVBQUU7UUFDMUI5QixJQUFJLENBQUNJLFNBQVMsQ0FBQzJCLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDNUIvQixJQUFJLENBQUNnQyxLQUFLLEdBQUcsSUFBSXRDLHNEQUFZLENBQUM7VUFDMUIsSUFBSSxFQUFDTSxJQUFJLENBQUNNLGNBQWMsQ0FBQzJCLEdBQUcsQ0FBQyxDQUFDO1VBQzlCLFVBQVUsRUFBRSxlQUFlO1VBQzNCLGFBQWEsRUFBRTtRQUNuQixDQUFDLENBQUM7UUFFRmpDLElBQUksQ0FBQ2dDLEtBQUssQ0FBQ0UsTUFBTSxDQUFDLFlBQVU7VUFDeEJsQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLE1BQU0sQ0FBQztVQUN4QkQsSUFBSSxDQUFDSSxTQUFTLENBQUMyQixPQUFPLENBQUMsSUFBSSxDQUFDO1VBQzVCL0IsSUFBSSxDQUFDbUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1FBQ3hDLENBQUMsRUFBRW5DLElBQUksQ0FBQztNQUNaO0lBRUosQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL3JkbS9tb2RhbHMvZGVsZXRlLXNjaGVtZS1mb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IENvbmNlcHRNb2RlbCBmcm9tICdtb2RlbHMvY29uY2VwdCc7XG5pbXBvcnQgVmFsdWVNb2RlbCBmcm9tICdtb2RlbHMvdmFsdWUnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubW9kYWwgPSB0aGlzLiRlbC5maW5kKCcubW9kYWwnKTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSBvcHRpb25zLnZpZXdNb2RlbDtcblxuICAgICAgICAvLyB0ZXN0IHRvIHNlZSBpZiBzZWxlY3QyIGhhcyBhbHJlYWR5IGJlZW4gYXBwbGllZCB0byB0aGUgZG9tXG4gICAgICAgIGlmICghIHRoaXMuJGVsLmZpbmQoJy5zZWxlY3QyJykuYXR0cignaWQnKSl7XG4gICAgICAgICAgICB0aGlzLnNjaGVtZWRyb3Bkb3duID0gdGhpcy4kZWwuZmluZCgnLnNlbGVjdDInKS5zZWxlY3QyKHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogYXJjaGVzLnRyYW5zbGF0aW9ucy5zZWxlY3RBbk9wdGlvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oXCJzZWxlY3QyOnNlbGVjdGluZ1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLmNvbmZpcm1fZGVsZXRlLnJlcGxhY2UoJ2FhYWFhYWFhLWFhYWEtYWFhYS1hYWFhLWFhYWFhYWFhYWFhYScsIGUucGFyYW1zLmFyZ3MuZGF0YS5pZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubW9kYWwuZmluZCgnLm1vZGFsLWJvZHkgW25hbWU9XCJhZGRpdGlvbmFsLWluZm9cIl0nKS5odG1sKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICBcbiAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RhbC52YWxpZGF0ZSh7XG4gICAgICAgICAgICBpZ25vcmU6IG51bGwsXG4gICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgIHNjaGVtZV9kZDogXCJyZXF1aXJlZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld01vZGVsLmxvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5tb2RlbCA9IG5ldyBDb25jZXB0TW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICAnaWQnOnNlbGYuc2NoZW1lZHJvcGRvd24udmFsKCksXG4gICAgICAgICAgICAgICAgICAgICdub2RldHlwZSc6ICdDb25jZXB0U2NoZW1lJywgXG4gICAgICAgICAgICAgICAgICAgICdkZWxldGVfc2VsZic6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHNlbGYubW9kZWwuZGVsZXRlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwubG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyKCdjb25jZXB0U2NoZW1lRGVsZXRlZCcpO1xuICAgICAgICAgICAgICAgIH0sIHNlbGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbIiQiLCJCYWNrYm9uZSIsImFyY2hlcyIsIkNvbmNlcHRNb2RlbCIsIlZhbHVlTW9kZWwiLCJWaWV3IiwiZXh0ZW5kIiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJzZWxmIiwibW9kYWwiLCIkZWwiLCJmaW5kIiwidmlld01vZGVsIiwiYXR0ciIsInNjaGVtZWRyb3Bkb3duIiwic2VsZWN0MiIsInBsYWNlaG9sZGVyIiwidHJhbnNsYXRpb25zIiwic2VsZWN0QW5PcHRpb24iLCJvbiIsImUiLCJhamF4IiwidXJsIiwidXJscyIsImNvbmZpcm1fZGVsZXRlIiwicmVwbGFjZSIsInBhcmFtcyIsImFyZ3MiLCJkYXRhIiwiaWQiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJodG1sIiwidmFsaWRhdGUiLCJpZ25vcmUiLCJydWxlcyIsInNjaGVtZV9kZCIsInN1Ym1pdEhhbmRsZXIiLCJmb3JtIiwibG9hZGluZyIsIm1vZGVsIiwidmFsIiwiZGVsZXRlIiwidHJpZ2dlciJdLCJzb3VyY2VSb290IjoiIn0=