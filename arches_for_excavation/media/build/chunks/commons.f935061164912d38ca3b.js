"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[54756],{

/***/ 54756:
/*!****************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/reports/image.js + 1 modules ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ reports_image)
});

// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/report.js
var report = __webpack_require__(95442);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/report-templates/image.htm
const image_namespaceObject = "templates/views/report-templates/image.htm";
// EXTERNAL MODULE: ./node_modules/knockstrap/build/knockstrap.min.js
var knockstrap_min = __webpack_require__(88814);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/chosen.js
var chosen = __webpack_require__(63777);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/reports/image.js








/* harmony default export */ const reports_image = (knockout_latest_default().components.register('image-report', {
  viewModel: function viewModel(params) {
    var self = this;
    params.configKeys = ['nodes'];
    report["default"].apply(this, [params]);
    self.imgs = knockout_latest_default().computed(function () {
      var imgs = [];
      var nodes = knockout_latest_default().unwrap(self.nodes);
      self.tiles().forEach(function (tile) {
        underscore_min_default().each(tile.data, function (val, key) {
          val = knockout_mapping_min_default().toJS(val);
          if (Array.isArray(val)) {
            val.forEach(function (item) {
              if (item.status && item.type && item.status === 'uploaded' && item.type.indexOf('image') > -1 && underscore_min_default().contains(nodes, key)) {
                imgs.push({
                  src: (arches["default"].urls.url_subpath + knockout_latest_default().unwrap(item.url)).replace('//', '/'),
                  alt: item.name
                });
              }
            });
          }
        }, self);
      }, self);
      if (imgs.length === 0) {
        imgs = [{
          src: arches["default"].urls.media + 'img/photo_missing.png',
          alt: arches["default"].translations.imageNotAvailable
        }];
      }
      return imgs;
    });
    var widgets = [];
    var _getCardWidgets = function getCardWidgets(card) {
      widgets = widgets.concat(card.model.get('widgets')());
      card.cards().forEach(function (card) {
        _getCardWidgets(card);
      });
    };
    knockout_latest_default().unwrap(self.report.cards).forEach(_getCardWidgets);
    this.nodeOptions = knockout_latest_default().observableArray(widgets.map(function (widget) {
      return widget.node;
    }).filter(function (node) {
      return knockout_latest_default().unwrap(node.datatype) === 'file-list';
    }));
  },
  template: image_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDRCxLQUFLLENBQUMsQ0FBQ2hDLE9BQU8sQ0FBQzJCLGVBQWMsQ0FBQztJQUNwRCxJQUFJLENBQUNPLFdBQVcsR0FBR25ELHlDQUFrQixDQUNqQzJDLE9BQU8sQ0FBQ1UsR0FBRyxDQUFDLFVBQVVDLE1BQU0sRUFBRTtNQUMxQixPQUFPQSxNQUFNLENBQUNDLElBQUk7SUFDdEIsQ0FBQyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxVQUFVRCxJQUFJLEVBQUU7TUFDdEIsT0FBT3ZELGdDQUFTLENBQUN1RCxJQUFJLENBQUNFLFFBQVEsQ0FBQyxLQUFLLFdBQVc7SUFDbkQsQ0FBQyxDQUNMLENBQUM7RUFDTCxDQUFDO0VBQ0RDLFFBQVEsRUFBRXRELHFCQUFtQkE7QUFDakMsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy9yZXBvcnRzL2ltYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgUmVwb3J0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvcmVwb3J0JztcbmltcG9ydCBpbWFnZVJlcG9ydFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9yZXBvcnQtdGVtcGxhdGVzL2ltYWdlLmh0bSc7XG5cbmltcG9ydCAna25vY2tzdHJhcCc7XG5pbXBvcnQgJ2JpbmRpbmdzL2Nob3Nlbic7XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2ltYWdlLXJlcG9ydCcsIHtcbiAgICB2aWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBwYXJhbXMuY29uZmlnS2V5cyA9IFsnbm9kZXMnXTtcblxuICAgICAgICBSZXBvcnRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgICAgIHNlbGYuaW1ncyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWdzID0gW107XG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBrby51bndyYXAoc2VsZi5ub2Rlcyk7XG4gICAgICAgICAgICBzZWxmLnRpbGVzKCkuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aWxlLmRhdGEsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBrb01hcHBpbmcudG9KUyh2YWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnN0YXR1cyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnR5cGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdGF0dXMgPT09ICd1cGxvYWRlZCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmNvbnRhaW5zKG5vZGVzLCBrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IChhcmNoZXMudXJscy51cmxfc3VicGF0aCArIGtvLnVud3JhcChpdGVtLnVybCkpLnJlcGxhY2UoJy8vJywgJy8nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdDogaXRlbS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgc2VsZik7XG4gICAgICAgICAgICB9LCBzZWxmKTtcbiAgICAgICAgICAgIGlmIChpbWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGltZ3MgPSBbe1xuICAgICAgICAgICAgICAgICAgICBzcmM6IGFyY2hlcy51cmxzLm1lZGlhICsgJ2ltZy9waG90b19taXNzaW5nLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGFsdDogYXJjaGVzLnRyYW5zbGF0aW9ucy5pbWFnZU5vdEF2YWlsYWJsZSxcbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbWdzO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgd2lkZ2V0cyA9IFtdO1xuICAgICAgICB2YXIgZ2V0Q2FyZFdpZGdldHMgPSBmdW5jdGlvbiAoY2FyZCkge1xuICAgICAgICAgICAgd2lkZ2V0cyA9IHdpZGdldHMuY29uY2F0KGNhcmQubW9kZWwuZ2V0KCd3aWRnZXRzJykoKSk7XG4gICAgICAgICAgICBjYXJkLmNhcmRzKCkuZm9yRWFjaChmdW5jdGlvbiAoY2FyZCkge1xuICAgICAgICAgICAgICAgIGdldENhcmRXaWRnZXRzKGNhcmQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGtvLnVud3JhcChzZWxmLnJlcG9ydC5jYXJkcykuZm9yRWFjaChnZXRDYXJkV2lkZ2V0cyk7XG4gICAgICAgIHRoaXMubm9kZU9wdGlvbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoXG4gICAgICAgICAgICB3aWRnZXRzLm1hcChmdW5jdGlvbiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldC5ub2RlO1xuICAgICAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtvLnVud3JhcChub2RlLmRhdGF0eXBlKSA9PT0gJ2ZpbGUtbGlzdCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGltYWdlUmVwb3J0VGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJfIiwia28iLCJrb01hcHBpbmciLCJhcmNoZXMiLCJSZXBvcnRWaWV3TW9kZWwiLCJpbWFnZVJlcG9ydFRlbXBsYXRlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsImNvbmZpZ0tleXMiLCJhcHBseSIsImltZ3MiLCJjb21wdXRlZCIsIm5vZGVzIiwidW53cmFwIiwidGlsZXMiLCJmb3JFYWNoIiwidGlsZSIsImVhY2giLCJkYXRhIiwidmFsIiwia2V5IiwidG9KUyIsIkFycmF5IiwiaXNBcnJheSIsIml0ZW0iLCJzdGF0dXMiLCJ0eXBlIiwiaW5kZXhPZiIsImNvbnRhaW5zIiwicHVzaCIsInNyYyIsInVybHMiLCJ1cmxfc3VicGF0aCIsInVybCIsInJlcGxhY2UiLCJhbHQiLCJuYW1lIiwibGVuZ3RoIiwibWVkaWEiLCJ0cmFuc2xhdGlvbnMiLCJpbWFnZU5vdEF2YWlsYWJsZSIsIndpZGdldHMiLCJnZXRDYXJkV2lkZ2V0cyIsImNhcmQiLCJjb25jYXQiLCJtb2RlbCIsImdldCIsImNhcmRzIiwicmVwb3J0Iiwibm9kZU9wdGlvbnMiLCJvYnNlcnZhYmxlQXJyYXkiLCJtYXAiLCJ3aWRnZXQiLCJub2RlIiwiZmlsdGVyIiwiZGF0YXR5cGUiLCJ0ZW1wbGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9