"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[98949],{

/***/ 98949:
/*!**************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/nodegroup-selector.js + 1 modules ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ nodegroup_selector)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/function-view-model.js
var function_view_model = __webpack_require__(80056);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/models/graph.js
var graph = __webpack_require__(6303);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/chosen.js
var chosen = __webpack_require__(63777);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/nodegroup-selector.htm
const nodegroup_selector_namespaceObject = "templates/views/components/nodegroup-selector.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/nodegroup-selector.js








/* harmony default export */ const nodegroup_selector = (knockout_latest_default().components.register('views/components/nodegroup-selector', {
  viewModel: function viewModel(params) {
    function_view_model["default"].apply(this, arguments);
    var nodegroups = {};
    this.cards = knockout_latest_default().observableArray();
    this.graph.cards.forEach(function (card) {
      var found = !!underscore_min_default().find(this.graph.nodegroups, function (nodegroup) {
        return nodegroup.parentnodegroup_id === card.nodegroup_id;
      }, this);
      if (!found && !(card.nodegroup_id in nodegroups)) {
        this.cards.push(card);
        nodegroups[card.nodegroup_id] = true;
      }
    }, this);
    this.triggering_nodegroups = params.triggering_nodegroups;
    window.setTimeout(function () {
      jquery_min_default()("select[data-bind^=chosen]").trigger("chosen:updated");
    }, 300);
  },
  template: nodegroup_selector_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZTZhMzg1MGI5YTJlYjQ3ZjFhMjguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNJO0FBQ0Q7QUFDZTtBQUNzQjtBQUN6QjtBQUNEO0FBQ3FEO0FBRzFGLHlEQUFlRSxvQ0FBYSxDQUFDTyxRQUFRLENBQUMscUNBQXFDLEVBQUU7RUFDekVDLFNBQVMsRUFBRSxTQUFYQSxTQUFTQSxDQUFXQyxNQUFNLEVBQUU7SUFFeEJQLDhCQUFpQixDQUFDUSxLQUFLLENBQUMsSUFBSSxFQUFFQyxTQUFTLENBQUM7SUFDeEMsSUFBSUMsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNuQixJQUFJLENBQUNDLEtBQUssR0FBR2IseUNBQWtCLENBQUMsQ0FBQztJQUVqQyxJQUFJLENBQUNlLEtBQUssQ0FBQ0YsS0FBSyxDQUFDRyxPQUFPLENBQUMsVUFBU0MsSUFBSSxFQUFDO01BQ25DLElBQUlDLEtBQUssR0FBRyxDQUFDLENBQUNuQiw2QkFBTSxDQUFDLElBQUksQ0FBQ2dCLEtBQUssQ0FBQ0gsVUFBVSxFQUFFLFVBQVNRLFNBQVMsRUFBQztRQUMzRCxPQUFPQSxTQUFTLENBQUNDLGtCQUFrQixLQUFLSixJQUFJLENBQUNLLFlBQVk7TUFDN0QsQ0FBQyxFQUFFLElBQUksQ0FBQztNQUNSLElBQUcsQ0FBQ0osS0FBSyxJQUFJLEVBQUVELElBQUksQ0FBQ0ssWUFBWSxJQUFJVixVQUFVLENBQUMsRUFBQztRQUM1QyxJQUFJLENBQUNDLEtBQUssQ0FBQ1UsSUFBSSxDQUFDTixJQUFJLENBQUM7UUFDckJMLFVBQVUsQ0FBQ0ssSUFBSSxDQUFDSyxZQUFZLENBQUMsR0FBRyxJQUFJO01BQ3hDO0lBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQztJQUVSLElBQUksQ0FBQ0UscUJBQXFCLEdBQUdmLE1BQU0sQ0FBQ2UscUJBQXFCO0lBRXpEQyxNQUFNLENBQUNDLFVBQVUsQ0FBQyxZQUFVO01BQUM1QixvQkFBQyxDQUFDLDJCQUEyQixDQUFDLENBQUM2QixPQUFPLENBQUMsZ0JBQWdCLENBQUM7SUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0VBQ2pHLENBQUM7RUFDREMsUUFBUSxFQUFFdkIsa0NBQXlCQTtBQUN2QyxDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvbm9kZWdyb3VwLXNlbGVjdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQga29NYXBwaW5nIGZyb20gJ2tub2Nrb3V0LW1hcHBpbmcnO1xuaW1wb3J0IEZ1bmN0aW9uVmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvZnVuY3Rpb24tdmlldy1tb2RlbCc7XG5pbXBvcnQgR3JhcGhNb2RlbCBmcm9tICdtb2RlbHMvZ3JhcGgnO1xuaW1wb3J0IGNob3NlbiBmcm9tICdiaW5kaW5ncy9jaG9zZW4nO1xuaW1wb3J0IG5vZGVncm91cFNlbGVjdG9yVGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvbm9kZWdyb3VwLXNlbGVjdG9yLmh0bSc7XG5cblxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3Rlcigndmlld3MvY29tcG9uZW50cy9ub2RlZ3JvdXAtc2VsZWN0b3InLCB7XG4gICAgdmlld01vZGVsOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICBGdW5jdGlvblZpZXdNb2RlbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB2YXIgbm9kZWdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLmNhcmRzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5ncmFwaC5jYXJkcy5mb3JFYWNoKGZ1bmN0aW9uKGNhcmQpe1xuICAgICAgICAgICAgdmFyIGZvdW5kID0gISFfLmZpbmQodGhpcy5ncmFwaC5ub2RlZ3JvdXBzLCBmdW5jdGlvbihub2RlZ3JvdXApe1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlZ3JvdXAucGFyZW50bm9kZWdyb3VwX2lkID09PSBjYXJkLm5vZGVncm91cF9pZDtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgaWYoIWZvdW5kICYmICEoY2FyZC5ub2RlZ3JvdXBfaWQgaW4gbm9kZWdyb3Vwcykpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKTtcbiAgICAgICAgICAgICAgICBub2RlZ3JvdXBzW2NhcmQubm9kZWdyb3VwX2lkXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcmluZ19ub2RlZ3JvdXBzID0gcGFyYW1zLnRyaWdnZXJpbmdfbm9kZWdyb3VwcztcblxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpeyQoXCJzZWxlY3RbZGF0YS1iaW5kXj1jaG9zZW5dXCIpLnRyaWdnZXIoXCJjaG9zZW46dXBkYXRlZFwiKTt9LCAzMDApO1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IG5vZGVncm91cFNlbGVjdG9yVGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwia29NYXBwaW5nIiwiRnVuY3Rpb25WaWV3TW9kZWwiLCJHcmFwaE1vZGVsIiwiY2hvc2VuIiwibm9kZWdyb3VwU2VsZWN0b3JUZW1wbGF0ZSIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInZpZXdNb2RlbCIsInBhcmFtcyIsImFwcGx5IiwiYXJndW1lbnRzIiwibm9kZWdyb3VwcyIsImNhcmRzIiwib2JzZXJ2YWJsZUFycmF5IiwiZ3JhcGgiLCJmb3JFYWNoIiwiY2FyZCIsImZvdW5kIiwiZmluZCIsIm5vZGVncm91cCIsInBhcmVudG5vZGVncm91cF9pZCIsIm5vZGVncm91cF9pZCIsInB1c2giLCJ0cmlnZ2VyaW5nX25vZGVncm91cHMiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwidHJpZ2dlciIsInRlbXBsYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=