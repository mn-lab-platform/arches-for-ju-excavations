"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[31376],{

/***/ 31376:
/*!*********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/edit-history.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var views_base_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! views/base-manager */ 18646);
/* harmony import */ var bindings_datatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bindings/datatable */ 65863);



/**
* a BaseManagerView representing the recent edits pages
*/
var EditHistory = views_base_manager__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  initialize: function initialize(options) {
    options.viewModel.resourceTableConfig = {
      "responsive": true,
      "paging": true,
      "scrollY": "50vh",
      "scrollCollapse": true,
      "language": {
        "paginate": {
          "previous": '<i class="fa fa-angle-left"></i>',
          "next": '<i class="fa fa-angle-right"></i>'
        }
      },
      "order": [[3, "desc"]],
      "columns": [null, null, null, {
        "orderData": 7
      }, null, null, null, {
        "visible": false
      }]
    };
    views_base_manager__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.initialize.call(this, options);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EditHistory());

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZjNiNjAzYjA1ODc5NmNjZDZhNzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQWlEO0FBQ3JCOztBQUc1QjtBQUNBO0FBQ0E7QUFDQSxJQUFJQyxXQUFXLEdBQUdELDBEQUFlLENBQUNFLE1BQU0sQ0FBQztFQUNyQ0MsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQVdDLE9BQU8sRUFBQztJQUN6QkEsT0FBTyxDQUFDQyxTQUFTLENBQUNDLG1CQUFtQixHQUFHO01BQ3BDLFlBQVksRUFBRSxJQUFJO01BQ2xCLFFBQVEsRUFBRSxJQUFJO01BQ2QsU0FBUyxFQUFFLE1BQU07TUFDakIsZ0JBQWdCLEVBQUUsSUFBSTtNQUN0QixVQUFVLEVBQUU7UUFDUixVQUFVLEVBQUU7VUFDUixVQUFVLEVBQUUsa0NBQWtDO1VBQzlDLE1BQU0sRUFBRTtRQUNaO01BQ0osQ0FBQztNQUNELE9BQU8sRUFBRSxDQUFDLENBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBRSxDQUFDO01BQ3hCLFNBQVMsRUFBRSxDQUNQLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKO1FBQUUsV0FBVyxFQUFFO01BQUUsQ0FBQyxFQUNsQixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSjtRQUFFLFNBQVMsRUFBRTtNQUFNLENBQUM7SUFFNUIsQ0FBQztJQUNETiwwREFBZSxDQUFDTyxTQUFTLENBQUNKLFVBQVUsQ0FBQ0ssSUFBSSxDQUFDLElBQUksRUFBRUosT0FBTyxDQUFDO0VBQzVEO0FBQ0osQ0FBQyxDQUFDO0FBQ0YsaUVBQWUsSUFBSUgsV0FBVyxDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2VkaXQtaGlzdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZU1hbmFnZXJWaWV3IGZyb20gJ3ZpZXdzL2Jhc2UtbWFuYWdlcic7XG5pbXBvcnQgJ2JpbmRpbmdzL2RhdGF0YWJsZSc7XG5cblxuLyoqXG4qIGEgQmFzZU1hbmFnZXJWaWV3IHJlcHJlc2VudGluZyB0aGUgcmVjZW50IGVkaXRzIHBhZ2VzXG4qL1xudmFyIEVkaXRIaXN0b3J5ID0gQmFzZU1hbmFnZXJWaWV3LmV4dGVuZCh7XG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIG9wdGlvbnMudmlld01vZGVsLnJlc291cmNlVGFibGVDb25maWcgPSB7XG4gICAgICAgICAgICBcInJlc3BvbnNpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwicGFnaW5nXCI6IHRydWUsXG4gICAgICAgICAgICBcInNjcm9sbFlcIjogXCI1MHZoXCIsXG4gICAgICAgICAgICBcInNjcm9sbENvbGxhcHNlXCI6IHRydWUsXG4gICAgICAgICAgICBcImxhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2luYXRlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c1wiOiAnPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1sZWZ0XCI+PC9pPicsXG4gICAgICAgICAgICAgICAgICAgIFwibmV4dFwiOiAnPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1yaWdodFwiPjwvaT4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwib3JkZXJcIjogW1sgMywgXCJkZXNjXCIgXV0sXG4gICAgICAgICAgICBcImNvbHVtbnNcIjogW1xuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIHsgXCJvcmRlckRhdGFcIjogNyB9LFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIHsgXCJ2aXNpYmxlXCI6IGZhbHNlIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgQmFzZU1hbmFnZXJWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxufSk7XG5leHBvcnQgZGVmYXVsdCBuZXcgRWRpdEhpc3RvcnkoKTtcbiJdLCJuYW1lcyI6WyJCYXNlTWFuYWdlclZpZXciLCJFZGl0SGlzdG9yeSIsImV4dGVuZCIsImluaXRpYWxpemUiLCJvcHRpb25zIiwidmlld01vZGVsIiwicmVzb3VyY2VUYWJsZUNvbmZpZyIsInByb3RvdHlwZSIsImNhbGwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==