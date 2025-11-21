"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[3338],{

/***/ 3338:
/*!*********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/reports/map-header.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var geojson_extent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! geojson-extent */ 50653);
/* harmony import */ var geojson_extent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(geojson_extent__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var views_components_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/components/map */ 70680);
/* harmony import */ var views_components_cards_select_feature_layers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/components/cards/select-feature-layers */ 77578);
/* harmony import */ var templates_views_components_map_htm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! templates/views/components/map.htm */ 68540);








var viewModel = function viewModel(params) {
  var self = this;
  self.translations = arches__WEBPACK_IMPORTED_MODULE_3__["default"].translations;
  var featureCollection = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    var features = [];
    knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(params.tiles).forEach(function (tile) {
      underscore__WEBPACK_IMPORTED_MODULE_2___default().each(tile.data, function (val) {
        if (val !== null && val !== void 0 && val.features) {
          features = features.concat(knockout_mapping__WEBPACK_IMPORTED_MODULE_1___default().toJS(val.features));
        }
      }, this);
    }, this);
    return {
      type: 'FeatureCollection',
      features: features
    };
  });
  if (featureCollection().features.length > 0) {
    params.bounds = geojson_extent__WEBPACK_IMPORTED_MODULE_4___default()(featureCollection());
    params.fitBoundsOptions = {
      padding: 40
    };
  }
  params.sources = Object.assign({
    "report-header-map-data": {
      "type": "geojson",
      "data": featureCollection()
    }
  }, params.sources);
  params.layers = (0,views_components_cards_select_feature_layers__WEBPACK_IMPORTED_MODULE_6__["default"])('', 'report-header-map-data', undefined, [], true);
  views_components_map__WEBPACK_IMPORTED_MODULE_5__["default"].apply(this, [Object.assign({}, params, {
    "activeTab": knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(false),
    "zoom": null
  })]);
  featureCollection.subscribe(function (featureCollection) {
    var map = self.map();
    if (map && map.getStyle()) map.getSource('report-header-map-data').setData(featureCollection);
  });
};
knockout__WEBPACK_IMPORTED_MODULE_0___default().components.register('report-header-map', {
  viewModel: viewModel,
  template: templates_views_components_map_htm__WEBPACK_IMPORTED_MODULE_7__
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOTkyODI0M2VmN2Y4YTlmMzY0NGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNlO0FBQ2Q7QUFDQztBQUNlO0FBQ2M7QUFDNkI7QUFDYjtBQUV6RSxJQUFNUSxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBYUMsTUFBTSxFQUFFO0VBQ2hDLElBQUlDLElBQUksR0FBRyxJQUFJO0VBRWZBLElBQUksQ0FBQ0MsWUFBWSxHQUFHUiw4Q0FBTSxDQUFDUSxZQUFZO0VBQ3ZDLElBQUlDLGlCQUFpQixHQUFHWix3REFBVyxDQUFDLFlBQVk7SUFDNUMsSUFBSWMsUUFBUSxHQUFHLEVBQUU7SUFDakJkLHNEQUFTLENBQUNTLE1BQU0sQ0FBQ08sS0FBSyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFVQyxJQUFJLEVBQUU7TUFDNUNoQixzREFBTSxDQUFDZ0IsSUFBSSxDQUFDRSxJQUFJLEVBQUUsVUFBVUMsR0FBRyxFQUFFO1FBQzdCLElBQUlBLEdBQUcsYUFBSEEsR0FBRyxlQUFIQSxHQUFHLENBQUVQLFFBQVEsRUFBRTtVQUNmQSxRQUFRLEdBQUdBLFFBQVEsQ0FBQ1EsTUFBTSxDQUFDckIsNERBQWMsQ0FBQ29CLEdBQUcsQ0FBQ1AsUUFBUSxDQUFDLENBQUM7UUFDNUQ7TUFDSixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNSLE9BQU87TUFDSFUsSUFBSSxFQUFFLG1CQUFtQjtNQUN6QlYsUUFBUSxFQUFFQTtJQUNkLENBQUM7RUFDTCxDQUFDLENBQUM7RUFFRixJQUFJRixpQkFBaUIsQ0FBQyxDQUFDLENBQUNFLFFBQVEsQ0FBQ1csTUFBTSxHQUFHLENBQUMsRUFBRTtJQUN6Q2hCLE1BQU0sQ0FBQ2lCLE1BQU0sR0FBR3RCLHFEQUFhLENBQUNRLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNsREgsTUFBTSxDQUFDa0IsZ0JBQWdCLEdBQUc7TUFBRUMsT0FBTyxFQUFFO0lBQUcsQ0FBQztFQUM3QztFQUVBbkIsTUFBTSxDQUFDb0IsT0FBTyxHQUFHQyxNQUFNLENBQUNDLE1BQU0sQ0FBQztJQUMzQix3QkFBd0IsRUFBRTtNQUN0QixNQUFNLEVBQUUsU0FBUztNQUNqQixNQUFNLEVBQUVuQixpQkFBaUIsQ0FBQztJQUM5QjtFQUNKLENBQUMsRUFBRUgsTUFBTSxDQUFDb0IsT0FBTyxDQUFDO0VBRWxCcEIsTUFBTSxDQUFDdUIsTUFBTSxHQUFHMUIsd0ZBQTBCLENBQ3RDLEVBQUUsRUFDRix3QkFBd0IsRUFDeEIyQixTQUFTLEVBQ1QsRUFBRSxFQUNGLElBQ0osQ0FBQztFQUVENUIsNERBQXFCLENBQUM2QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUNKLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFdEIsTUFBTSxFQUN2RDtJQUNJLFdBQVcsRUFBRVQsMERBQWEsQ0FBQyxLQUFLLENBQUM7SUFDakMsTUFBTSxFQUFFO0VBQ1osQ0FDSixDQUFDLENBQUMsQ0FBQztFQUVIWSxpQkFBaUIsQ0FBQ3dCLFNBQVMsQ0FBQyxVQUFVeEIsaUJBQWlCLEVBQUU7SUFDckQsSUFBSXlCLEdBQUcsR0FBRzNCLElBQUksQ0FBQzJCLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLElBQUlBLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxFQUFFRCxHQUFHLENBQUNFLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUM3REMsT0FBTyxDQUFDNUIsaUJBQWlCLENBQUM7RUFDbkMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVEWiwwREFBYSxDQUFDMEMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO0VBQ3hDbEMsU0FBUyxFQUFFQSxTQUFTO0VBQ3BCbUMsUUFBUSxFQUFFcEMsK0RBQXVCQTtBQUNyQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3JlcG9ydHMvbWFwLWhlYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGtvTWFwcGluZyBmcm9tICdrbm9ja291dC1tYXBwaW5nJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IGdlb2pzb25FeHRlbnQgZnJvbSAnZ2VvanNvbi1leHRlbnQnO1xuaW1wb3J0IE1hcENvbXBvbmVudFZpZXdNb2RlbCBmcm9tICd2aWV3cy9jb21wb25lbnRzL21hcCc7XG5pbXBvcnQgc2VsZWN0RmVhdHVyZUxheWVyc0ZhY3RvcnkgZnJvbSAndmlld3MvY29tcG9uZW50cy9jYXJkcy9zZWxlY3QtZmVhdHVyZS1sYXllcnMnO1xuaW1wb3J0IHJlcG9ydEhlYWRlck1hcFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL21hcC5odG0nO1xuXG5jb25zdCB2aWV3TW9kZWwgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgc2VsZi50cmFuc2xhdGlvbnMgPSBhcmNoZXMudHJhbnNsYXRpb25zO1xuICAgIHZhciBmZWF0dXJlQ29sbGVjdGlvbiA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gW107XG4gICAgICAgIGtvLnVud3JhcChwYXJhbXMudGlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgICAgIF8uZWFjaCh0aWxlLmRhdGEsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsPy5mZWF0dXJlcykge1xuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlcyA9IGZlYXR1cmVzLmNvbmNhdChrb01hcHBpbmcudG9KUyh2YWwuZmVhdHVyZXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVzXG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpZiAoZmVhdHVyZUNvbGxlY3Rpb24oKS5mZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhcmFtcy5ib3VuZHMgPSBnZW9qc29uRXh0ZW50KGZlYXR1cmVDb2xsZWN0aW9uKCkpO1xuICAgICAgICBwYXJhbXMuZml0Qm91bmRzT3B0aW9ucyA9IHsgcGFkZGluZzogNDAgfTtcbiAgICB9XG5cbiAgICBwYXJhbXMuc291cmNlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBcInJlcG9ydC1oZWFkZXItbWFwLWRhdGFcIjoge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZ2VvanNvblwiLFxuICAgICAgICAgICAgXCJkYXRhXCI6IGZlYXR1cmVDb2xsZWN0aW9uKClcbiAgICAgICAgfVxuICAgIH0sIHBhcmFtcy5zb3VyY2VzKTtcblxuICAgIHBhcmFtcy5sYXllcnMgPSBzZWxlY3RGZWF0dXJlTGF5ZXJzRmFjdG9yeShcbiAgICAgICAgJycsXG4gICAgICAgICdyZXBvcnQtaGVhZGVyLW1hcC1kYXRhJyxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICBbXSxcbiAgICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBNYXBDb21wb25lbnRWaWV3TW9kZWwuYXBwbHkodGhpcywgW09iamVjdC5hc3NpZ24oe30sIHBhcmFtcyxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJhY3RpdmVUYWJcIjoga28ub2JzZXJ2YWJsZShmYWxzZSksXG4gICAgICAgICAgICBcInpvb21cIjogbnVsbFxuICAgICAgICB9XG4gICAgKV0pO1xuXG4gICAgZmVhdHVyZUNvbGxlY3Rpb24uc3Vic2NyaWJlKGZ1bmN0aW9uIChmZWF0dXJlQ29sbGVjdGlvbikge1xuICAgICAgICB2YXIgbWFwID0gc2VsZi5tYXAoKTtcbiAgICAgICAgaWYgKG1hcCAmJiBtYXAuZ2V0U3R5bGUoKSkgbWFwLmdldFNvdXJjZSgncmVwb3J0LWhlYWRlci1tYXAtZGF0YScpXG4gICAgICAgICAgICAuc2V0RGF0YShmZWF0dXJlQ29sbGVjdGlvbik7XG4gICAgfSk7XG59O1xuXG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKCdyZXBvcnQtaGVhZGVyLW1hcCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogcmVwb3J0SGVhZGVyTWFwVGVtcGxhdGVcbn0pO1xuIl0sIm5hbWVzIjpbImtvIiwia29NYXBwaW5nIiwiXyIsImFyY2hlcyIsImdlb2pzb25FeHRlbnQiLCJNYXBDb21wb25lbnRWaWV3TW9kZWwiLCJzZWxlY3RGZWF0dXJlTGF5ZXJzRmFjdG9yeSIsInJlcG9ydEhlYWRlck1hcFRlbXBsYXRlIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsInRyYW5zbGF0aW9ucyIsImZlYXR1cmVDb2xsZWN0aW9uIiwiY29tcHV0ZWQiLCJmZWF0dXJlcyIsInVud3JhcCIsInRpbGVzIiwiZm9yRWFjaCIsInRpbGUiLCJlYWNoIiwiZGF0YSIsInZhbCIsImNvbmNhdCIsInRvSlMiLCJ0eXBlIiwibGVuZ3RoIiwiYm91bmRzIiwiZml0Qm91bmRzT3B0aW9ucyIsInBhZGRpbmciLCJzb3VyY2VzIiwiT2JqZWN0IiwiYXNzaWduIiwibGF5ZXJzIiwidW5kZWZpbmVkIiwiYXBwbHkiLCJvYnNlcnZhYmxlIiwic3Vic2NyaWJlIiwibWFwIiwiZ2V0U3R5bGUiLCJnZXRTb3VyY2UiLCJzZXREYXRhIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9