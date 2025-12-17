"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[98523],{

/***/ 98523:
/*!***************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/rdm/modals/related-member-form.js ***!
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
/* harmony import */ var views_concept_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/concept-search */ 34682);
/* harmony import */ var models_concept__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! models/concept */ 10359);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (views_concept_search__WEBPACK_IMPORTED_MODULE_2__["default"].extend({
  events: {
    'click .modal-footer .savebtn': 'save'
  },
  initialize: function initialize() {
    views_concept_search__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.initialize.apply(this, arguments);
    this.modal = this.$el.find('.modal');
    this.relationshiptype = this.modal.find('#related-relation-type').select2({
      minimumResultsForSearch: 10,
      maximumSelectionSize: 1
    });
  },
  save: function save() {
    var self = this;
    if (this.searchbox.val() !== '') {
      var relatedConcept = new models_concept__WEBPACK_IMPORTED_MODULE_3__["default"]({
        id: this.searchbox.val(),
        relationshiptype: this.relationshiptype.val()
      });
      this.model.set('relatedconcepts', [relatedConcept]);
      this.modal.on('hidden.bs.modal', function (e) {
        self.model.save();
      });
      this.modal.modal('hide');
    }
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZjYzMjE5MTU0ZjcwY2QwNDVkYzMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNTO0FBQ2lCO0FBQ1A7QUFHMUMsaUVBQWVFLDREQUFhLENBQUNFLE1BQU0sQ0FBQztFQUVoQ0MsTUFBTSxFQUFFO0lBQ0osOEJBQThCLEVBQUU7RUFDcEMsQ0FBQztFQUVEQyxVQUFVLEVBQUUsU0FBWkEsVUFBVUEsQ0FBQSxFQUFZO0lBQ2xCSiw0REFBYSxDQUFDSyxTQUFTLENBQUNELFVBQVUsQ0FBQ0UsS0FBSyxDQUFDLElBQUksRUFBRUMsU0FBUyxDQUFDO0lBQ3pELElBQUksQ0FBQ0MsS0FBSyxHQUFHLElBQUksQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDSCxLQUFLLENBQUNFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDRSxPQUFPLENBQUM7TUFDdEVDLHVCQUF1QixFQUFFLEVBQUU7TUFDM0JDLG9CQUFvQixFQUFFO0lBQzFCLENBQUMsQ0FBQztFQUNOLENBQUM7RUFFREMsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQUEsRUFBWTtJQUNaLElBQUlDLElBQUksR0FBRyxJQUFJO0lBQ2YsSUFBSSxJQUFJLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUM7TUFDNUIsSUFBSUMsY0FBYyxHQUFHLElBQUlsQixzREFBWSxDQUFDO1FBQ2xDbUIsRUFBRSxFQUFFLElBQUksQ0FBQ0gsU0FBUyxDQUFDQyxHQUFHLENBQUMsQ0FBQztRQUN4QlAsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDQSxnQkFBZ0IsQ0FBQ08sR0FBRyxDQUFDO01BQ2hELENBQUMsQ0FBQztNQUNGLElBQUksQ0FBQ0csS0FBSyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQ0gsY0FBYyxDQUFDLENBQUM7TUFFbkQsSUFBSSxDQUFDWCxLQUFLLENBQUNlLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFTQyxDQUFDLEVBQUU7UUFDekNSLElBQUksQ0FBQ0ssS0FBSyxDQUFDTixJQUFJLENBQUMsQ0FBQztNQUNyQixDQUFDLENBQUM7TUFDRixJQUFJLENBQUNQLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUM1QjtFQUNKO0FBQ0osQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9yZG0vbW9kYWxzL3JlbGF0ZWQtbWVtYmVyLWZvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgQ29uY2VwdFNlYXJjaCBmcm9tICd2aWV3cy9jb25jZXB0LXNlYXJjaCc7XG5pbXBvcnQgQ29uY2VwdE1vZGVsIGZyb20gJ21vZGVscy9jb25jZXB0JztcblxuXG5leHBvcnQgZGVmYXVsdCBDb25jZXB0U2VhcmNoLmV4dGVuZCh7XG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIC5tb2RhbC1mb290ZXIgLnNhdmVidG4nOiAnc2F2ZSdcbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgQ29uY2VwdFNlYXJjaC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLm1vZGFsID0gdGhpcy4kZWwuZmluZCgnLm1vZGFsJyk7XG4gICAgICAgIHRoaXMucmVsYXRpb25zaGlwdHlwZSA9IHRoaXMubW9kYWwuZmluZCgnI3JlbGF0ZWQtcmVsYXRpb24tdHlwZScpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IDEwLFxuICAgICAgICAgICAgbWF4aW11bVNlbGVjdGlvblNpemU6IDFcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBcbiAgICBzYXZlOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaGJveC52YWwoKSAhPT0gJycpe1xuICAgICAgICAgICAgdmFyIHJlbGF0ZWRDb25jZXB0ID0gbmV3IENvbmNlcHRNb2RlbCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuc2VhcmNoYm94LnZhbCgpLFxuICAgICAgICAgICAgICAgIHJlbGF0aW9uc2hpcHR5cGU6IHRoaXMucmVsYXRpb25zaGlwdHlwZS52YWwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNldCgncmVsYXRlZGNvbmNlcHRzJywgW3JlbGF0ZWRDb25jZXB0XSk7XG5cbiAgICAgICAgICAgIHRoaXMubW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1vZGVsLnNhdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOlsiJCIsIkJhY2tib25lIiwiQ29uY2VwdFNlYXJjaCIsIkNvbmNlcHRNb2RlbCIsImV4dGVuZCIsImV2ZW50cyIsImluaXRpYWxpemUiLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsIm1vZGFsIiwiJGVsIiwiZmluZCIsInJlbGF0aW9uc2hpcHR5cGUiLCJzZWxlY3QyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJtYXhpbXVtU2VsZWN0aW9uU2l6ZSIsInNhdmUiLCJzZWxmIiwic2VhcmNoYm94IiwidmFsIiwicmVsYXRlZENvbmNlcHQiLCJpZCIsIm1vZGVsIiwic2V0Iiwib24iLCJlIl0sInNvdXJjZVJvb3QiOiIifQ==