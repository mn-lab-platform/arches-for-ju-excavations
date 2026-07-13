"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[59903],{

/***/ 59903:
/*!******************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/card-constraints.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! arches */ 77126);


var ConstraintViewModel = function ConstraintViewModel(params) {
  this.widgets = params.widgets || [];
  this.constraint = params.constraint;
  this.getSelect2ConstraintConfig = function (placeholder) {
    var nodeOptions = this.widgets.map(function (c) {
      return {
        text: c.label(),
        id: c.node.nodeid
      };
    });
    return {
      clickBubble: true,
      disabled: false,
      data: nodeOptions,
      value: this.constraint.nodes,
      multiple: params.multiple || true,
      closeOnSelect: false,
      placeholder: placeholder || arches__WEBPACK_IMPORTED_MODULE_1__["default"].translations.cardConstraintsPlaceholder,
      allowClear: true
    };
  };
  this.update = function (val) {
    this.constraint.nodes(val.nodes);
    this.constraint.constraintid(val.constraintid);
    this.constraint.uniquetoallinstances(val.uniquetoallinstances);
  };
  this.toJSON = function () {
    return knockout_mapping__WEBPACK_IMPORTED_MODULE_0___default().toJS(this.constraint);
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConstraintViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMWMyM2VhYmNmM2UzMjAyYWU5ZjUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNiO0FBRTVCLElBQUlFLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUJBLENBQVlDLE1BQU0sRUFBRTtFQUN2QyxJQUFJLENBQUNDLE9BQU8sR0FBR0QsTUFBTSxDQUFDQyxPQUFPLElBQUksRUFBRTtFQUNuQyxJQUFJLENBQUNDLFVBQVUsR0FBR0YsTUFBTSxDQUFDRSxVQUFVO0VBQ25DLElBQUksQ0FBQ0MsMEJBQTBCLEdBQUcsVUFBU0MsV0FBVyxFQUFDO0lBQ25ELElBQUlDLFdBQVcsR0FBRyxJQUFJLENBQUNKLE9BQU8sQ0FBQ0ssR0FBRyxDQUFDLFVBQVNDLENBQUMsRUFBQztNQUFDLE9BQU87UUFBQ0MsSUFBSSxFQUFFRCxDQUFDLENBQUNFLEtBQUssQ0FBQyxDQUFDO1FBQUVDLEVBQUUsRUFBRUgsQ0FBQyxDQUFDSSxJQUFJLENBQUNDO01BQU0sQ0FBQztJQUFDLENBQUMsQ0FBQztJQUM3RixPQUFPO01BQ0hDLFdBQVcsRUFBRSxJQUFJO01BQ2pCQyxRQUFRLEVBQUUsS0FBSztNQUNmQyxJQUFJLEVBQUVWLFdBQVc7TUFDakJXLEtBQUssRUFBRSxJQUFJLENBQUNkLFVBQVUsQ0FBQ2UsS0FBSztNQUM1QkMsUUFBUSxFQUFFbEIsTUFBTSxDQUFDa0IsUUFBUSxJQUFJLElBQUk7TUFDakNDLGFBQWEsRUFBRSxLQUFLO01BQ3BCZixXQUFXLEVBQUVBLFdBQVcsSUFBSU4sOENBQU0sQ0FBQ3NCLFlBQVksQ0FBQ0MsMEJBQTBCO01BQzFFQyxVQUFVLEVBQUU7SUFDaEIsQ0FBQztFQUNMLENBQUM7RUFDRCxJQUFJLENBQUNDLE1BQU0sR0FBRyxVQUFTQyxHQUFHLEVBQUM7SUFDdkIsSUFBSSxDQUFDdEIsVUFBVSxDQUFDZSxLQUFLLENBQUNPLEdBQUcsQ0FBQ1AsS0FBSyxDQUFDO0lBQ2hDLElBQUksQ0FBQ2YsVUFBVSxDQUFDdUIsWUFBWSxDQUFDRCxHQUFHLENBQUNDLFlBQVksQ0FBQztJQUM5QyxJQUFJLENBQUN2QixVQUFVLENBQUN3QixvQkFBb0IsQ0FBQ0YsR0FBRyxDQUFDRSxvQkFBb0IsQ0FBQztFQUNsRSxDQUFDO0VBQ0QsSUFBSSxDQUFDQyxNQUFNLEdBQUcsWUFBVTtJQUNwQixPQUFPOUIsNERBQWMsQ0FBQyxJQUFJLENBQUNLLFVBQVUsQ0FBQztFQUMxQyxDQUFDO0FBRUwsQ0FBQztBQUVELGlFQUFlSCxtQkFBbUIsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdtb2RlbHMvY2FyZC1jb25zdHJhaW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga29NYXBwaW5nIGZyb20gJ2tub2Nrb3V0LW1hcHBpbmcnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuXG52YXIgQ29uc3RyYWludFZpZXdNb2RlbCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHRoaXMud2lkZ2V0cyA9IHBhcmFtcy53aWRnZXRzIHx8IFtdO1xuICAgIHRoaXMuY29uc3RyYWludCA9IHBhcmFtcy5jb25zdHJhaW50O1xuICAgIHRoaXMuZ2V0U2VsZWN0MkNvbnN0cmFpbnRDb25maWcgPSBmdW5jdGlvbihwbGFjZWhvbGRlcil7XG4gICAgICAgIHZhciBub2RlT3B0aW9ucyA9IHRoaXMud2lkZ2V0cy5tYXAoZnVuY3Rpb24oYyl7cmV0dXJuIHt0ZXh0OiBjLmxhYmVsKCksIGlkOiBjLm5vZGUubm9kZWlkfTt9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNsaWNrQnViYmxlOiB0cnVlLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGF0YTogbm9kZU9wdGlvbnMsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5jb25zdHJhaW50Lm5vZGVzLFxuICAgICAgICAgICAgbXVsdGlwbGU6IHBhcmFtcy5tdWx0aXBsZSB8fCB0cnVlLFxuICAgICAgICAgICAgY2xvc2VPblNlbGVjdDogZmFsc2UsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXIgfHwgYXJjaGVzLnRyYW5zbGF0aW9ucy5jYXJkQ29uc3RyYWludHNQbGFjZWhvbGRlcixcbiAgICAgICAgICAgIGFsbG93Q2xlYXI6IHRydWVcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24odmFsKXtcbiAgICAgICAgdGhpcy5jb25zdHJhaW50Lm5vZGVzKHZhbC5ub2Rlcyk7XG4gICAgICAgIHRoaXMuY29uc3RyYWludC5jb25zdHJhaW50aWQodmFsLmNvbnN0cmFpbnRpZCk7XG4gICAgICAgIHRoaXMuY29uc3RyYWludC51bmlxdWV0b2FsbGluc3RhbmNlcyh2YWwudW5pcXVldG9hbGxpbnN0YW5jZXMpO1xuICAgIH07XG4gICAgdGhpcy50b0pTT04gPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ga29NYXBwaW5nLnRvSlModGhpcy5jb25zdHJhaW50KTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb25zdHJhaW50Vmlld01vZGVsO1xuIl0sIm5hbWVzIjpbImtvTWFwcGluZyIsImFyY2hlcyIsIkNvbnN0cmFpbnRWaWV3TW9kZWwiLCJwYXJhbXMiLCJ3aWRnZXRzIiwiY29uc3RyYWludCIsImdldFNlbGVjdDJDb25zdHJhaW50Q29uZmlnIiwicGxhY2Vob2xkZXIiLCJub2RlT3B0aW9ucyIsIm1hcCIsImMiLCJ0ZXh0IiwibGFiZWwiLCJpZCIsIm5vZGUiLCJub2RlaWQiLCJjbGlja0J1YmJsZSIsImRpc2FibGVkIiwiZGF0YSIsInZhbHVlIiwibm9kZXMiLCJtdWx0aXBsZSIsImNsb3NlT25TZWxlY3QiLCJ0cmFuc2xhdGlvbnMiLCJjYXJkQ29uc3RyYWludHNQbGFjZWhvbGRlciIsImFsbG93Q2xlYXIiLCJ1cGRhdGUiLCJ2YWwiLCJjb25zdHJhaW50aWQiLCJ1bmlxdWV0b2FsbGluc3RhbmNlcyIsInRvSlNPTiIsInRvSlMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==