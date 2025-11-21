"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[27447],{

/***/ 27447:
/*!**************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/rdm/modals/manage-parent-form.js ***!
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
/* harmony import */ var views_concept_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/concept-search */ 34682);
/* harmony import */ var models_concept__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! models/concept */ 10359);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backbone__WEBPACK_IMPORTED_MODULE_1___default().View.extend({
  events: {
    'click .modal-footer .savebtn': 'save',
    'click .modal-footer .btn-u-default': 'cancel',
    'click a': 'removeRelationship'
  },
  initialize: function initialize() {
    var self = this;
    this.conceptsearch = new views_concept_search__WEBPACK_IMPORTED_MODULE_3__["default"]({
      el: this.$el,
      getUrl: function getUrl() {
        return arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.concept_search + '?removechildren=' + self.model.get('id');
      }
    });
    this.modal = this.$el.find('.modal');
    this.relationshiptype = this.modal.find('#parent-relation-type').select2({
      minimumResultsForSearch: 10,
      maximumSelectionSize: 1
    });
    this.numberOfParents = this.$el.find('#number_of_parents').val();
    this.deletedrelationships = [];
  },
  save: function save() {
    var self = this;
    if (this.conceptsearch.searchbox.val()) {
      var parentConcept = new models_concept__WEBPACK_IMPORTED_MODULE_4__["default"]({
        id: this.conceptsearch.searchbox.val(),
        relationshiptype: this.relationshiptype.val()
      });
      this.model.set('added', [parentConcept.toJSON()]);
    }
    var concepts = [];
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.deletedrelationships, function () {
      var parentConcept = new models_concept__WEBPACK_IMPORTED_MODULE_4__["default"]({
        id: this
      });
      concepts.push(parentConcept);
    });
    self.model.set('deleted', concepts);
    this.modal.on('hidden.bs.modal', function (e) {
      self.model.save(function () {
        self.cleanup();
      }, this);
    });
    this.modal.modal('hide');
  },
  cancel: function cancel() {
    this.cleanup();
  },
  removeRelationship: function removeRelationship(e) {
    var data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data();
    this.deletedrelationships.push(data.id);
    this.$el.find('[data-id="' + data.id + '"]').toggle(300);
  },
  cleanup: function cleanup() {
    var self = this;
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.deletedrelationships, function () {
      self.$el.find('[data-id="' + this + '"]').toggle(300);
    });
    this.model.set('deleted', []);
    this.model.set('added', []);
    this.$el.find('a').show(300);
    this.undelegateEvents();
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9yZG0vbW9kYWxzL21hbmFnZS1wYXJlbnQtZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBDb25jZXB0U2VhcmNoIGZyb20gJ3ZpZXdzL2NvbmNlcHQtc2VhcmNoJztcbmltcG9ydCBDb25jZXB0TW9kZWwgZnJvbSAnbW9kZWxzL2NvbmNlcHQnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcblxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgLm1vZGFsLWZvb3RlciAuc2F2ZWJ0bic6ICdzYXZlJyxcbiAgICAgICAgJ2NsaWNrIC5tb2RhbC1mb290ZXIgLmJ0bi11LWRlZmF1bHQnOiAnY2FuY2VsJyxcbiAgICAgICAgJ2NsaWNrIGEnOiAncmVtb3ZlUmVsYXRpb25zaGlwJ1xuICAgIH0sXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29uY2VwdHNlYXJjaCA9IG5ldyBDb25jZXB0U2VhcmNoKHtcbiAgICAgICAgICAgIGVsOnRoaXMuJGVsLFxuICAgICAgICAgICAgZ2V0VXJsOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJldHVybiBhcmNoZXMudXJscy5jb25jZXB0X3NlYXJjaCArICc/cmVtb3ZlY2hpbGRyZW49JyArIHNlbGYubW9kZWwuZ2V0KCdpZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tb2RhbCA9IHRoaXMuJGVsLmZpbmQoJy5tb2RhbCcpO1xuICAgICAgICB0aGlzLnJlbGF0aW9uc2hpcHR5cGUgPSB0aGlzLm1vZGFsLmZpbmQoJyNwYXJlbnQtcmVsYXRpb24tdHlwZScpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IDEwLFxuICAgICAgICAgICAgbWF4aW11bVNlbGVjdGlvblNpemU6IDFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZQYXJlbnRzID0gdGhpcy4kZWwuZmluZCgnI251bWJlcl9vZl9wYXJlbnRzJykudmFsKCk7XG4gICAgICAgIHRoaXMuZGVsZXRlZHJlbGF0aW9uc2hpcHMgPSBbXTtcbiAgICB9LFxuICAgIFxuICAgIHNhdmU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuY29uY2VwdHNlYXJjaC5zZWFyY2hib3gudmFsKCkpe1xuICAgICAgICAgICAgdmFyIHBhcmVudENvbmNlcHQgPSBuZXcgQ29uY2VwdE1vZGVsKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5jb25jZXB0c2VhcmNoLnNlYXJjaGJveC52YWwoKSxcbiAgICAgICAgICAgICAgICByZWxhdGlvbnNoaXB0eXBlOiB0aGlzLnJlbGF0aW9uc2hpcHR5cGUudmFsKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zZXQoJ2FkZGVkJywgW3BhcmVudENvbmNlcHQudG9KU09OKCldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb25jZXB0cyA9IFtdO1xuICAgICAgICAkLmVhY2godGhpcy5kZWxldGVkcmVsYXRpb25zaGlwcywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBwYXJlbnRDb25jZXB0ID0gbmV3IENvbmNlcHRNb2RlbCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uY2VwdHMucHVzaChwYXJlbnRDb25jZXB0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYubW9kZWwuc2V0KCdkZWxldGVkJywgY29uY2VwdHMpO1xuXG4gICAgICAgIHRoaXMubW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlbGYubW9kZWwuc2F2ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNsZWFudXAoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tb2RhbC5tb2RhbCgnaGlkZScpO1xuICAgIH0sXG5cbiAgICBjYW5jZWw6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIH0sXG5cbiAgICByZW1vdmVSZWxhdGlvbnNoaXA6IGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgZGF0YSA9ICQoZS50YXJnZXQpLmRhdGEoKTtcbiAgICAgICAgdGhpcy5kZWxldGVkcmVsYXRpb25zaGlwcy5wdXNoKGRhdGEuaWQpO1xuICAgICAgICB0aGlzLiRlbC5maW5kKCdbZGF0YS1pZD1cIicrIGRhdGEuaWQgKydcIl0nKS50b2dnbGUoMzAwKTtcbiAgICB9LFxuXG4gICAgY2xlYW51cDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgJC5lYWNoKHRoaXMuZGVsZXRlZHJlbGF0aW9uc2hpcHMsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLiRlbC5maW5kKCdbZGF0YS1pZD1cIicrIHRoaXMgKydcIl0nKS50b2dnbGUoMzAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubW9kZWwuc2V0KCdkZWxldGVkJywgW10pO1xuICAgICAgICB0aGlzLm1vZGVsLnNldCgnYWRkZWQnLCBbXSk7XG5cbiAgICAgICAgdGhpcy4kZWwuZmluZCgnYScpLnNob3coMzAwKTsgICAgICAgICAgICBcbiAgICAgICAgdGhpcy51bmRlbGVnYXRlRXZlbnRzKCk7XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOlsiJCIsIkJhY2tib25lIiwiYXJjaGVzIiwiQ29uY2VwdFNlYXJjaCIsIkNvbmNlcHRNb2RlbCIsIlZpZXciLCJleHRlbmQiLCJldmVudHMiLCJpbml0aWFsaXplIiwic2VsZiIsImNvbmNlcHRzZWFyY2giLCJlbCIsIiRlbCIsImdldFVybCIsInVybHMiLCJjb25jZXB0X3NlYXJjaCIsIm1vZGVsIiwiZ2V0IiwibW9kYWwiLCJmaW5kIiwicmVsYXRpb25zaGlwdHlwZSIsInNlbGVjdDIiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm1heGltdW1TZWxlY3Rpb25TaXplIiwibnVtYmVyT2ZQYXJlbnRzIiwidmFsIiwiZGVsZXRlZHJlbGF0aW9uc2hpcHMiLCJzYXZlIiwic2VhcmNoYm94IiwicGFyZW50Q29uY2VwdCIsImlkIiwic2V0IiwidG9KU09OIiwiY29uY2VwdHMiLCJlYWNoIiwicHVzaCIsIm9uIiwiZSIsImNsZWFudXAiLCJjYW5jZWwiLCJyZW1vdmVSZWxhdGlvbnNoaXAiLCJkYXRhIiwidGFyZ2V0IiwidG9nZ2xlIiwic2hvdyIsInVuZGVsZWdhdGVFdmVudHMiXSwic291cmNlUm9vdCI6IiJ9