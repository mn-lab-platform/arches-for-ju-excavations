"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[61885],{

/***/ 61885:
/*!*************************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/functions/primary-descriptors.js + 1 modules ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ primary_descriptors)
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
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/function-view-model.js
var function_view_model = __webpack_require__(80056);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/chosen.js
var chosen = __webpack_require__(63777);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/functions/primary-descriptors.htm
const primary_descriptors_namespaceObject = "templates/views/components/functions/primary-descriptors.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/functions/primary-descriptors.js








var viewModel = function viewModel(params) {
  function_view_model["default"].apply(this, arguments);
  var nodegroups = {};
  this.cards = knockout_latest_default().observableArray();
  this.loading = knockout_latest_default().observable(false);
  this.cards.unshift({
    'name': null
  });
  this.graph.cards.forEach(function (card) {
    this.cards.push(card);
    nodegroups[card.nodegroup_id] = true;
  }, this);
  this.name = params.config.descriptor_types.name;
  this.description = params.config.descriptor_types.description;
  this.map_popup = params.config.descriptor_types.map_popup;
  underscore_min_default().each([this.name, this.description, this.map_popup], function (property) {
    if (property.nodegroup_id) {
      property.nodegroup_id.subscribe(function (nodegroup_id) {
        property.string_template(nodegroup_id);
        var nodes = underscore_min_default().filter(this.graph.nodes, function (node) {
          return node.nodegroup_id === nodegroup_id;
        }, this);
        var templateFragments = [];
        underscore_min_default().each(nodes, function (node) {
          templateFragments.push('<' + node.name + '>');
        }, this);
        var template = templateFragments.join(', ');
        property.string_template(template);
      }, this);
    }
  }, this);
  this.reindexdb = function () {
    this.loading(true);
    jquery_min_default().ajax({
      type: "POST",
      url: arches["default"].urls.reindex,
      context: this,
      data: JSON.stringify({
        'graphids': [this.graph.graphid]
      }),
      error: function error() {
        console.log('error');
      },
      complete: function complete() {
        this.loading(false);
      }
    });
  };
  window.setTimeout(function () {
    jquery_min_default()("select[data-bind^=chosen]").trigger("chosen:updated");
  }, 300);
};
/* harmony default export */ const primary_descriptors = (knockout_latest_default().components.register('views/components/functions/primary-descriptors', {
  viewModel: viewModel,
  template: primary_descriptors_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUssQ0FBQzhCLE9BQU87TUFBQyxDQUFDLENBQUM7TUFDeERDLEtBQUssRUFBRSxTQUFQQSxLQUFLQSxDQUFBLEVBQWE7UUFDZEMsT0FBTyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO01BQ3hCLENBQUM7TUFDREMsUUFBUSxFQUFFLFNBQVZBLFFBQVFBLENBQUEsRUFBWTtRQUNoQixJQUFJLENBQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDO01BQ3ZCO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUNEc0MsTUFBTSxDQUFDQyxVQUFVLENBQUMsWUFBVTtJQUFDdEQsb0JBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDdUQsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0VBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztBQUNqRyxDQUFDO0FBRUQsMERBQWVyRCxvQ0FBYSxDQUFDdUQsUUFBUSxDQUFDLGdEQUFnRCxFQUFFO0VBQ3BGakQsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCNEIsUUFBUSxFQUFFN0IsbUNBQWtDQTtBQUNoRCxDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvZnVuY3Rpb25zL3ByaW1hcnktZGVzY3JpcHRvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgRnVuY3Rpb25WaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy9mdW5jdGlvbi12aWV3LW1vZGVsJztcbmltcG9ydCBjaG9zZW4gZnJvbSAnYmluZGluZ3MvY2hvc2VuJztcbmltcG9ydCBwcmltYXJ5RGVzY3JpcHRvcnNGdW5jdGlvblRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2Z1bmN0aW9ucy9wcmltYXJ5LWRlc2NyaXB0b3JzLmh0bSc7XG5cblxuY29uc3Qgdmlld01vZGVsID0gIGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICBcbiAgICBGdW5jdGlvblZpZXdNb2RlbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciBub2RlZ3JvdXBzID0ge307XG4gICAgdGhpcy5jYXJkcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIHRoaXMubG9hZGluZyA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgIHRoaXMuY2FyZHMudW5zaGlmdCh7XG4gICAgICAgICduYW1lJzogbnVsbCxcbiAgICB9KTtcblxuICAgIHRoaXMuZ3JhcGguY2FyZHMuZm9yRWFjaChmdW5jdGlvbihjYXJkKXtcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpO1xuICAgICAgICBub2RlZ3JvdXBzW2NhcmQubm9kZWdyb3VwX2lkXSA9IHRydWU7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMuY29uZmlnLmRlc2NyaXB0b3JfdHlwZXMubmFtZTtcblxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBwYXJhbXMuY29uZmlnLmRlc2NyaXB0b3JfdHlwZXMuZGVzY3JpcHRpb247XG4gICAgdGhpcy5tYXBfcG9wdXAgPSBwYXJhbXMuY29uZmlnLmRlc2NyaXB0b3JfdHlwZXMubWFwX3BvcHVwO1xuXG4gICAgXy5lYWNoKFt0aGlzLm5hbWUsIHRoaXMuZGVzY3JpcHRpb24sIHRoaXMubWFwX3BvcHVwXSwgZnVuY3Rpb24ocHJvcGVydHkpe1xuICAgICAgICBpZiAocHJvcGVydHkubm9kZWdyb3VwX2lkKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eS5ub2RlZ3JvdXBfaWQuc3Vic2NyaWJlKGZ1bmN0aW9uKG5vZGVncm91cF9pZCl7XG4gICAgICAgICAgICAgICAgcHJvcGVydHkuc3RyaW5nX3RlbXBsYXRlKG5vZGVncm91cF9pZCk7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gXy5maWx0ZXIodGhpcy5ncmFwaC5ub2RlcywgZnVuY3Rpb24obm9kZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm5vZGVncm91cF9pZCA9PT0gbm9kZWdyb3VwX2lkO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZUZyYWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIF8uZWFjaChub2RlcywgZnVuY3Rpb24obm9kZSl7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlRnJhZ21lbnRzLnB1c2goJzwnICsgbm9kZS5uYW1lICsgJz4nKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRlbXBsYXRlRnJhZ21lbnRzLmpvaW4oJywgJyk7XG4gICAgICAgICAgICAgICAgcHJvcGVydHkuc3RyaW5nX3RlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLnJlaW5kZXhkYiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMubG9hZGluZyh0cnVlKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5yZWluZGV4LFxuICAgICAgICAgICAgY29udGV4dDogdGhpcyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsnZ3JhcGhpZHMnOiBbdGhpcy5ncmFwaC5ncmFwaGlkXX0pLFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXskKFwic2VsZWN0W2RhdGEtYmluZF49Y2hvc2VuXVwiKS50cmlnZ2VyKFwiY2hvc2VuOnVwZGF0ZWRcIik7fSwgMzAwKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3ZpZXdzL2NvbXBvbmVudHMvZnVuY3Rpb25zL3ByaW1hcnktZGVzY3JpcHRvcnMnLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IHByaW1hcnlEZXNjcmlwdG9yc0Z1bmN0aW9uVGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwia29NYXBwaW5nIiwiYXJjaGVzIiwiRnVuY3Rpb25WaWV3TW9kZWwiLCJjaG9zZW4iLCJwcmltYXJ5RGVzY3JpcHRvcnNGdW5jdGlvblRlbXBsYXRlIiwidmlld01vZGVsIiwicGFyYW1zIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJub2RlZ3JvdXBzIiwiY2FyZHMiLCJvYnNlcnZhYmxlQXJyYXkiLCJsb2FkaW5nIiwib2JzZXJ2YWJsZSIsInVuc2hpZnQiLCJncmFwaCIsImZvckVhY2giLCJjYXJkIiwicHVzaCIsIm5vZGVncm91cF9pZCIsIm5hbWUiLCJjb25maWciLCJkZXNjcmlwdG9yX3R5cGVzIiwiZGVzY3JpcHRpb24iLCJtYXBfcG9wdXAiLCJlYWNoIiwicHJvcGVydHkiLCJzdWJzY3JpYmUiLCJzdHJpbmdfdGVtcGxhdGUiLCJub2RlcyIsImZpbHRlciIsIm5vZGUiLCJ0ZW1wbGF0ZUZyYWdtZW50cyIsInRlbXBsYXRlIiwiam9pbiIsInJlaW5kZXhkYiIsImFqYXgiLCJ0eXBlIiwidXJsIiwidXJscyIsInJlaW5kZXgiLCJjb250ZXh0IiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJncmFwaGlkIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiY29tcGxldGUiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwidHJpZ2dlciIsImNvbXBvbmVudHMiLCJyZWdpc3RlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9