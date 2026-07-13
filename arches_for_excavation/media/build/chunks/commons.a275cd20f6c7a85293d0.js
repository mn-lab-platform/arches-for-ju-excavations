"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[70445],{

/***/ 70445:
/*!***************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/rdm/modals/add-collection-form.js ***!
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
/* harmony import */ var models_concept__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! models/concept */ 10359);
/* harmony import */ var models_value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! models/value */ 50494);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backbone__WEBPACK_IMPORTED_MODULE_1___default().View.extend({
  initialize: function initialize(e) {
    var self = this;
    this.modal = this.$el.find('.modal');
    this.modal.on('hidden.bs.modal', function () {
      self.$el.find('input[type=text], textarea').val('');
    });
    this.select2 = this.$el.find('[name=language_dd]').select2({
      minimumResultsForSearch: -1
    });
    this.modal.validate({
      ignore: null,
      rules: {
        label: 'required',
        language_dd: 'required',
        scheme_group_dd: 'required'
      },
      submitHandler: function submitHandler(form) {
        var label = new models_value__WEBPACK_IMPORTED_MODULE_3__["default"]({
          value: jquery__WEBPACK_IMPORTED_MODULE_0___default()(form).find('[name=label]').val(),
          language: jquery__WEBPACK_IMPORTED_MODULE_0___default()(form).find('[name=language_dd]').val(),
          category: 'label',
          type: 'prefLabel'
        });
        var collection = new models_concept__WEBPACK_IMPORTED_MODULE_2__["default"]({
          legacyoid: jquery__WEBPACK_IMPORTED_MODULE_0___default()(form).find('[name=label]').val(),
          values: [label],
          nodetype: 'Collection'
        });
        self.modal.on('hidden.bs.modal', function (e) {
          collection.save(function (response, status) {
            self.trigger('collectionAdded', response.responseJSON);
          }, self);
        });
        self.modal.modal('hide');
        return false;
      }
    });
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYTI3NWNkMjBmNmM3YTg1MjkzZDAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNTO0FBQ1U7QUFDSjtBQUd0QyxpRUFBZUMsb0RBQWEsQ0FBQ0ksTUFBTSxDQUFDO0VBRWhDQyxVQUFVLEVBQUUsU0FBWkEsVUFBVUEsQ0FBV0MsQ0FBQyxFQUFDO0lBQ25CLElBQUlDLElBQUksR0FBRyxJQUFJO0lBQ2YsSUFBSSxDQUFDQyxLQUFLLEdBQUcsSUFBSSxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsSUFBSSxDQUFDRixLQUFLLENBQUNHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFXO01BQ3hDSixJQUFJLENBQUNFLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUNFLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDdkQsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDQyxPQUFPLEdBQUcsSUFBSSxDQUFDSixHQUFHLENBQUNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDRyxPQUFPLENBQUM7TUFDdkRDLHVCQUF1QixFQUFFLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDTixLQUFLLENBQUNPLFFBQVEsQ0FBQztNQUNoQkMsTUFBTSxFQUFFLElBQUk7TUFDWkMsS0FBSyxFQUFFO1FBQ0hDLEtBQUssRUFBRSxVQUFVO1FBQ2pCQyxXQUFXLEVBQUUsVUFBVTtRQUN2QkMsZUFBZSxFQUFFO01BQ3JCLENBQUM7TUFDREMsYUFBYSxFQUFFLFNBQWZBLGFBQWFBLENBQVdDLElBQUksRUFBRTtRQUMxQixJQUFJSixLQUFLLEdBQUcsSUFBSWhCLG9EQUFVLENBQUM7VUFDdkJxQixLQUFLLEVBQUV4Qiw2Q0FBQyxDQUFDdUIsSUFBSSxDQUFDLENBQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQ0UsR0FBRyxDQUFDLENBQUM7VUFDekNZLFFBQVEsRUFBRXpCLDZDQUFDLENBQUN1QixJQUFJLENBQUMsQ0FBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUNFLEdBQUcsQ0FBQyxDQUFDO1VBQ2xEYSxRQUFRLEVBQUUsT0FBTztVQUNqQkMsSUFBSSxFQUFFO1FBQ1YsQ0FBQyxDQUFDO1FBRUYsSUFBSUMsVUFBVSxHQUFHLElBQUkxQixzREFBWSxDQUFDO1VBQzlCMkIsU0FBUyxFQUFFN0IsNkNBQUMsQ0FBQ3VCLElBQUksQ0FBQyxDQUFDWixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUNFLEdBQUcsQ0FBQyxDQUFDO1VBQzdDaUIsTUFBTSxFQUFFLENBQUNYLEtBQUssQ0FBQztVQUNmWSxRQUFRLEVBQUU7UUFDZCxDQUFDLENBQUM7UUFFRnZCLElBQUksQ0FBQ0MsS0FBSyxDQUFDRyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBU0wsQ0FBQyxFQUFFO1VBQ3pDcUIsVUFBVSxDQUFDSSxJQUFJLENBQUMsVUFBU0MsUUFBUSxFQUFFQyxNQUFNLEVBQUU7WUFDdkMxQixJQUFJLENBQUMyQixPQUFPLENBQUMsaUJBQWlCLEVBQUVGLFFBQVEsQ0FBQ0csWUFBWSxDQUFDO1VBQzFELENBQUMsRUFBRTVCLElBQUksQ0FBQztRQUNaLENBQUMsQ0FBQztRQUNGQSxJQUFJLENBQUNDLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUV4QixPQUFPLEtBQUs7TUFDaEI7SUFDSixDQUFDLENBQUM7RUFDTjtBQUNKLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvcmRtL21vZGFscy9hZGQtY29sbGVjdGlvbi1mb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IENvbmNlcHRNb2RlbCBmcm9tICdtb2RlbHMvY29uY2VwdCc7XG5pbXBvcnQgVmFsdWVNb2RlbCBmcm9tICdtb2RlbHMvdmFsdWUnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubW9kYWwgPSB0aGlzLiRlbC5maW5kKCcubW9kYWwnKTtcbiAgICAgICAgdGhpcy5tb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLiRlbC5maW5kKCdpbnB1dFt0eXBlPXRleHRdLCB0ZXh0YXJlYScpLnZhbCgnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0MiA9IHRoaXMuJGVsLmZpbmQoJ1tuYW1lPWxhbmd1YWdlX2RkXScpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pOyAgICAgICAgICAgICAgICBcblxuICAgICAgICB0aGlzLm1vZGFsLnZhbGlkYXRlKHtcbiAgICAgICAgICAgIGlnbm9yZTogbnVsbCxcbiAgICAgICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdyZXF1aXJlZCcsXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VfZGQ6ICdyZXF1aXJlZCcsXG4gICAgICAgICAgICAgICAgc2NoZW1lX2dyb3VwX2RkOiAncmVxdWlyZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IG5ldyBWYWx1ZU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICQoZm9ybSkuZmluZCgnW25hbWU9bGFiZWxdJykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAkKGZvcm0pLmZpbmQoJ1tuYW1lPWxhbmd1YWdlX2RkXScpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3ByZWZMYWJlbCdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IENvbmNlcHRNb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGxlZ2FjeW9pZDogJChmb3JtKS5maW5kKCdbbmFtZT1sYWJlbF0nKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBbbGFiZWxdLFxuICAgICAgICAgICAgICAgICAgICBub2RldHlwZTogJ0NvbGxlY3Rpb24nXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLm1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24uc2F2ZShmdW5jdGlvbihyZXNwb25zZSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXIoJ2NvbGxlY3Rpb25BZGRlZCcsIHJlc3BvbnNlLnJlc3BvbnNlSlNPTik7XG4gICAgICAgICAgICAgICAgICAgIH0sIHNlbGYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbGYubW9kYWwubW9kYWwoJ2hpZGUnKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOlsiJCIsIkJhY2tib25lIiwiQ29uY2VwdE1vZGVsIiwiVmFsdWVNb2RlbCIsIlZpZXciLCJleHRlbmQiLCJpbml0aWFsaXplIiwiZSIsInNlbGYiLCJtb2RhbCIsIiRlbCIsImZpbmQiLCJvbiIsInZhbCIsInNlbGVjdDIiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsInZhbGlkYXRlIiwiaWdub3JlIiwicnVsZXMiLCJsYWJlbCIsImxhbmd1YWdlX2RkIiwic2NoZW1lX2dyb3VwX2RkIiwic3VibWl0SGFuZGxlciIsImZvcm0iLCJ2YWx1ZSIsImxhbmd1YWdlIiwiY2F0ZWdvcnkiLCJ0eXBlIiwiY29sbGVjdGlvbiIsImxlZ2FjeW9pZCIsInZhbHVlcyIsIm5vZGV0eXBlIiwic2F2ZSIsInJlc3BvbnNlIiwic3RhdHVzIiwidHJpZ2dlciIsInJlc3BvbnNlSlNPTiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9