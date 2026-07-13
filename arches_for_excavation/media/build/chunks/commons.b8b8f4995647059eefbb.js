"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[54820],{

/***/ 54820:
/*!**********************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/rdm/modals/add-image-form.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! backbone */ 77186);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dropzone */ 50221);
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dropzone__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! js-cookie */ 12215);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap */ 21836);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_5__);






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backbone__WEBPACK_IMPORTED_MODULE_2___default().View.extend({
  events: {
    'click button': 'close'
  },
  initialize: function initialize(options) {
    var self = this,
      dropzoneEl = this.$el.find('.dropzone'),
      dropzoneInstance;
    // detect if dropzone is attached, and if not init
    if (!dropzoneEl.hasClass('dz-clickable')) {
      dropzoneInstance = new (dropzone__WEBPACK_IMPORTED_MODULE_3___default())(dropzoneEl[0], {
        url: arches__WEBPACK_IMPORTED_MODULE_1__["default"].urls.concept.replace('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', this.model.get('id')),
        acceptedFiles: 'image/*',
        headers: {
          'X-CSRFToken': js_cookie__WEBPACK_IMPORTED_MODULE_4___default().get('csrftoken')
        }
      });
      dropzoneInstance.on("addedfile", function (file) {
        self.changed = true;
      });
    }
    this.$el.find('.modal').modal('show');
  },
  close: function close() {
    var self = this,
      modal = this.$el.find('.modal');
    if (this.changed) {
      modal.on('hidden.bs.modal', function () {
        self.trigger('dataChanged');
      });
    }
    modal.modal('hide');
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYjhiOGY0OTk1NjQ3MDU5ZWVmYmIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0s7QUFDSTtBQUNBO0FBQ0E7QUFDYjtBQUduQixpRUFBZUUsb0RBQWEsQ0FBQ0ksTUFBTSxDQUFDO0VBQ2hDQyxNQUFNLEVBQUU7SUFDSixjQUFjLEVBQUU7RUFDcEIsQ0FBQztFQUNEQyxVQUFVLEVBQUUsU0FBWkEsVUFBVUEsQ0FBV0MsT0FBTyxFQUFFO0lBQzFCLElBQUlDLElBQUksR0FBRyxJQUFJO01BQ1hDLFVBQVUsR0FBRyxJQUFJLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQztNQUN2Q0MsZ0JBQWdCO0lBQ3BCO0lBQ0EsSUFBSSxDQUFDSCxVQUFVLENBQUNJLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtNQUN0Q0QsZ0JBQWdCLEdBQUcsSUFBSVgsaURBQVEsQ0FBQ1EsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzNDSyxHQUFHLEVBQUVmLDhDQUFNLENBQUNnQixJQUFJLENBQUNDLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDLHNDQUFzQyxFQUFFLElBQUksQ0FBQ0MsS0FBSyxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUZDLGFBQWEsRUFBRSxTQUFTO1FBQ3hCQyxPQUFPLEVBQUU7VUFDTCxhQUFhLEVBQUVuQixvREFBVyxDQUFDLFdBQVc7UUFDMUM7TUFDSixDQUFDLENBQUM7TUFFRlUsZ0JBQWdCLENBQUNVLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBU0MsSUFBSSxFQUFFO1FBQzVDZixJQUFJLENBQUNnQixPQUFPLEdBQUcsSUFBSTtNQUN2QixDQUFDLENBQUM7SUFDTjtJQUVBLElBQUksQ0FBQ2QsR0FBRyxDQUFDQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUNjLEtBQUssQ0FBQyxNQUFNLENBQUM7RUFDekMsQ0FBQztFQUNEQyxLQUFLLEVBQUUsU0FBUEEsS0FBS0EsQ0FBQSxFQUFhO0lBQ2QsSUFBSWxCLElBQUksR0FBRyxJQUFJO01BQ1hpQixLQUFLLEdBQUcsSUFBSSxDQUFDZixHQUFHLENBQUNDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsSUFBSSxJQUFJLENBQUNhLE9BQU8sRUFBRTtNQUNkQyxLQUFLLENBQUNILEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFXO1FBQ25DZCxJQUFJLENBQUNtQixPQUFPLENBQUMsYUFBYSxDQUFDO01BQy9CLENBQUMsQ0FBQztJQUNOO0lBQ0FGLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLE1BQU0sQ0FBQztFQUN2QjtBQUNKLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvcmRtL21vZGFscy9hZGQtaW1hZ2UtZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBkcm9wem9uZSBmcm9tICdkcm9wem9uZSc7XG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xuaW1wb3J0ICdib290c3RyYXAnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIGJ1dHRvbic6ICdjbG9zZSdcbiAgICB9LFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgZHJvcHpvbmVFbCA9IHRoaXMuJGVsLmZpbmQoJy5kcm9wem9uZScpLFxuICAgICAgICAgICAgZHJvcHpvbmVJbnN0YW5jZTtcbiAgICAgICAgLy8gZGV0ZWN0IGlmIGRyb3B6b25lIGlzIGF0dGFjaGVkLCBhbmQgaWYgbm90IGluaXRcbiAgICAgICAgaWYgKCFkcm9wem9uZUVsLmhhc0NsYXNzKCdkei1jbGlja2FibGUnKSkge1xuICAgICAgICAgICAgZHJvcHpvbmVJbnN0YW5jZSA9IG5ldyBkcm9wem9uZShkcm9wem9uZUVsWzBdLCB7XG4gICAgICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5jb25jZXB0LnJlcGxhY2UoJ2FhYWFhYWFhLWFhYWEtYWFhYS1hYWFhLWFhYWFhYWFhYWFhYScsIHRoaXMubW9kZWwuZ2V0KCdpZCcpKSxcbiAgICAgICAgICAgICAgICBhY2NlcHRlZEZpbGVzOiAnaW1hZ2UvKicsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnWC1DU1JGVG9rZW4nOiBDb29raWVzLmdldCgnY3NyZnRva2VuJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZHJvcHpvbmVJbnN0YW5jZS5vbihcImFkZGVkZmlsZVwiLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kZWwuZmluZCgnLm1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICB9LFxuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgbW9kYWwgPSB0aGlzLiRlbC5maW5kKCcubW9kYWwnKTtcbiAgICAgICAgaWYgKHRoaXMuY2hhbmdlZCkge1xuICAgICAgICAgICAgbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlcignZGF0YUNoYW5nZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG1vZGFsLm1vZGFsKCdoaWRlJyk7XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOlsiJCIsImFyY2hlcyIsIkJhY2tib25lIiwiZHJvcHpvbmUiLCJDb29raWVzIiwiVmlldyIsImV4dGVuZCIsImV2ZW50cyIsImluaXRpYWxpemUiLCJvcHRpb25zIiwic2VsZiIsImRyb3B6b25lRWwiLCIkZWwiLCJmaW5kIiwiZHJvcHpvbmVJbnN0YW5jZSIsImhhc0NsYXNzIiwidXJsIiwidXJscyIsImNvbmNlcHQiLCJyZXBsYWNlIiwibW9kZWwiLCJnZXQiLCJhY2NlcHRlZEZpbGVzIiwiaGVhZGVycyIsIm9uIiwiZmlsZSIsImNoYW5nZWQiLCJtb2RhbCIsImNsb3NlIiwidHJpZ2dlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9