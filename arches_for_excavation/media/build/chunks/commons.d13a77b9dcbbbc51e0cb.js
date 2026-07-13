"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[95442],{

/***/ 95442:
/*!********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/report.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 95093);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bindings_let__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bindings/let */ 98170);
/* harmony import */ var views_components_simple_switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/components/simple-switch */ 96613);






var ReportViewModel = function ReportViewModel(params) {
  var self = this;
  this.report = params.report || null;
  this.summary = params.summary || false;
  this.reportDate = moment__WEBPACK_IMPORTED_MODULE_3___default()().format('MMMM D, YYYY');
  this.configForm = params.configForm || false;
  this.configType = params.configType || 'header';
  this.editorContext = params.editorContext || false;
  this.configState = params.report.configState || knockout__WEBPACK_IMPORTED_MODULE_0___default().observable({});
  this.configJSON = params.report.configJSON || knockout__WEBPACK_IMPORTED_MODULE_0___default().observable({});
  this.configObservables = params.configObservables || {};
  this.configKeys = params.configKeys || [];
  this.hasProvisionalData = knockout__WEBPACK_IMPORTED_MODULE_0___default().pureComputed(function () {
    return underscore__WEBPACK_IMPORTED_MODULE_2___default().some(self.tiles(), function (tile) {
      return underscore__WEBPACK_IMPORTED_MODULE_2___default().keys(knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(tile.provisionaledits)).length > 0;
    });
  });
  this.hideEmptyNodes = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(params.report.hideEmptyNodes);
  this.configJSON = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    self.configKeys.forEach(function (config) {
      self[config] = self.configState[config];
    });
    self.report.configJSON(knockout_mapping__WEBPACK_IMPORTED_MODULE_1___default().toJS(self.report.configState));
    return self.report.configJSON;
  }).extend({
    deferred: true
  });
  var _getCardTiles = function getCardTiles(card, tiles) {
    var cardTiles = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(card.tiles);
    cardTiles.forEach(function (tile) {
      tiles.push(tile);
      tile.cards.forEach(function (card) {
        _getCardTiles(card, tiles);
      });
    });
  };
  this.tiles = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    var tiles = [];
    if (self.report) {
      knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(self.report.cards).forEach(function (card) {
        _getCardTiles(card, tiles);
      });
    }
    return tiles;
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReportViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNDLElBQUksRUFBRWQsS0FBSyxDQUFDO01BQzdCLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOLENBQUM7RUFFRCxJQUFJLENBQUNBLEtBQUssR0FBR3RCLHdEQUFXLENBQUMsWUFBVztJQUNoQyxJQUFJc0IsS0FBSyxHQUFHLEVBQUU7SUFDZCxJQUFJaEIsSUFBSSxDQUFDQyxNQUFNLEVBQUU7TUFDYlAsc0RBQVMsQ0FBQ00sSUFBSSxDQUFDQyxNQUFNLENBQUNnQyxLQUFLLENBQUMsQ0FBQ1QsT0FBTyxDQUFDLFVBQVNNLElBQUksRUFBRTtRQUNoREQsYUFBWSxDQUFDQyxJQUFJLEVBQUVkLEtBQUssQ0FBQztNQUM3QixDQUFDLENBQUM7SUFDTjtJQUNBLE9BQU9BLEtBQUs7RUFDaEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGlFQUFlbEIsZUFBZSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld21vZGVscy9yZXBvcnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCAnYmluZGluZ3MvbGV0JztcbmltcG9ydCAndmlld3MvY29tcG9uZW50cy9zaW1wbGUtc3dpdGNoJztcblxuXG52YXIgUmVwb3J0Vmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5yZXBvcnQgPSBwYXJhbXMucmVwb3J0IHx8IG51bGw7XG4gICAgdGhpcy5zdW1tYXJ5ID0gcGFyYW1zLnN1bW1hcnkgfHwgZmFsc2U7XG4gICAgdGhpcy5yZXBvcnREYXRlID0gbW9tZW50KCkuZm9ybWF0KCdNTU1NIEQsIFlZWVknKTtcbiAgICB0aGlzLmNvbmZpZ0Zvcm0gPSBwYXJhbXMuY29uZmlnRm9ybSB8fCBmYWxzZTtcbiAgICB0aGlzLmNvbmZpZ1R5cGUgPSBwYXJhbXMuY29uZmlnVHlwZSB8fCAnaGVhZGVyJztcbiAgICB0aGlzLmVkaXRvckNvbnRleHQgPSBwYXJhbXMuZWRpdG9yQ29udGV4dCB8fCBmYWxzZTtcblxuICAgIHRoaXMuY29uZmlnU3RhdGUgPSBwYXJhbXMucmVwb3J0LmNvbmZpZ1N0YXRlIHx8IGtvLm9ic2VydmFibGUoe30pO1xuICAgIHRoaXMuY29uZmlnSlNPTiA9IHBhcmFtcy5yZXBvcnQuY29uZmlnSlNPTiB8fCBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICB0aGlzLmNvbmZpZ09ic2VydmFibGVzID0gcGFyYW1zLmNvbmZpZ09ic2VydmFibGVzIHx8IHt9O1xuICAgIHRoaXMuY29uZmlnS2V5cyA9IHBhcmFtcy5jb25maWdLZXlzIHx8IFtdO1xuXG4gICAgdGhpcy5oYXNQcm92aXNpb25hbERhdGEgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfLnNvbWUoc2VsZi50aWxlcygpLCBmdW5jdGlvbih0aWxlKXtcbiAgICAgICAgICAgIHJldHVybiBfLmtleXMoa28udW53cmFwKHRpbGUucHJvdmlzaW9uYWxlZGl0cykpLmxlbmd0aCA+IDA7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIHRoaXMuaGlkZUVtcHR5Tm9kZXMgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5yZXBvcnQuaGlkZUVtcHR5Tm9kZXMpO1xuXG4gICAgdGhpcy5jb25maWdKU09OID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5jb25maWdLZXlzLmZvckVhY2goZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICAgICAgICBzZWxmW2NvbmZpZ10gPSBzZWxmLmNvbmZpZ1N0YXRlW2NvbmZpZ107XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLnJlcG9ydC5jb25maWdKU09OKGtvTWFwcGluZy50b0pTKHNlbGYucmVwb3J0LmNvbmZpZ1N0YXRlKSk7XG4gICAgICAgIHJldHVybiBzZWxmLnJlcG9ydC5jb25maWdKU09OO1xuICAgIH0pLmV4dGVuZCh7ZGVmZXJyZWQ6IHRydWV9KTtcblxuICAgIHZhciBnZXRDYXJkVGlsZXMgPSBmdW5jdGlvbihjYXJkLCB0aWxlcykge1xuICAgICAgICB2YXIgY2FyZFRpbGVzID0ga28udW53cmFwKGNhcmQudGlsZXMpO1xuICAgICAgICBjYXJkVGlsZXMuZm9yRWFjaChmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgICAgICB0aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgdGlsZS5jYXJkcy5mb3JFYWNoKGZ1bmN0aW9uKGNhcmQpIHtcbiAgICAgICAgICAgICAgICBnZXRDYXJkVGlsZXMoY2FyZCwgdGlsZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnRpbGVzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0aWxlcyA9IFtdO1xuICAgICAgICBpZiAoc2VsZi5yZXBvcnQpIHtcbiAgICAgICAgICAgIGtvLnVud3JhcChzZWxmLnJlcG9ydC5jYXJkcykuZm9yRWFjaChmdW5jdGlvbihjYXJkKSB7XG4gICAgICAgICAgICAgICAgZ2V0Q2FyZFRpbGVzKGNhcmQsIHRpbGVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aWxlcztcbiAgICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBSZXBvcnRWaWV3TW9kZWw7XG4iXSwibmFtZXMiOlsia28iLCJrb01hcHBpbmciLCJfIiwibW9tZW50IiwiUmVwb3J0Vmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsInJlcG9ydCIsInN1bW1hcnkiLCJyZXBvcnREYXRlIiwiZm9ybWF0IiwiY29uZmlnRm9ybSIsImNvbmZpZ1R5cGUiLCJlZGl0b3JDb250ZXh0IiwiY29uZmlnU3RhdGUiLCJvYnNlcnZhYmxlIiwiY29uZmlnSlNPTiIsImNvbmZpZ09ic2VydmFibGVzIiwiY29uZmlnS2V5cyIsImhhc1Byb3Zpc2lvbmFsRGF0YSIsInB1cmVDb21wdXRlZCIsInNvbWUiLCJ0aWxlcyIsInRpbGUiLCJrZXlzIiwidW53cmFwIiwicHJvdmlzaW9uYWxlZGl0cyIsImxlbmd0aCIsImhpZGVFbXB0eU5vZGVzIiwiY29tcHV0ZWQiLCJmb3JFYWNoIiwiY29uZmlnIiwidG9KUyIsImV4dGVuZCIsImRlZmVycmVkIiwiZ2V0Q2FyZFRpbGVzIiwiY2FyZCIsImNhcmRUaWxlcyIsInB1c2giLCJjYXJkcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9