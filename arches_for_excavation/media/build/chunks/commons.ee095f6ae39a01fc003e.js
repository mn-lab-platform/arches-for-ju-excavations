"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[24115],{

/***/ 24115:
/*!*********************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/provisional-history-list.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ 95093);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var views_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/list */ 38777);
/* harmony import */ var bindings_datepicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bindings/datepicker */ 72253);
/* harmony import */ var bindings_chosen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bindings/chosen */ 63777);
/* harmony import */ var views_components_simple_switch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! views/components/simple-switch */ 96613);









var ProvisionalHistoryList = views_list__WEBPACK_IMPORTED_MODULE_5__["default"].extend({
  /**
  * A backbone view to manage a list of graph nodes
  * @augments ListView
  * @constructor
  * @name ProvisionalHistoryList
  */

  singleSelect: true,
  /**
  * initializes the view with optional parameters
  * @memberof ProvisionalHistoryList.prototype
  * @param {object} options
  */
  initialize: function initialize(options) {
    var self = this;
    var defaultDateRange = "last-30";
    views_list__WEBPACK_IMPORTED_MODULE_5__["default"].prototype.initialize.apply(this, arguments);
    this.updateList = function () {
      self.helploading(true);
      self.items.removeAll();
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'GET',
        url: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.tile_history,
        data: {
          start: this.start(),
          end: this.end()
        }
      }).done(function (data) {
        self.helploading(false);
        self.items(underscore__WEBPACK_IMPORTED_MODULE_1___default().map(data, function (edit) {
          edit.displaytime = moment__WEBPACK_IMPORTED_MODULE_2___default()(edit.lasttimestamp).format('DD-MM-YYYY hh:mm a');
          return edit;
        }));
        if (self.sortDescending() === false) {
          self.sortAsc();
        }
      });
    };
    this.updateRange = function (value) {
      var today = moment__WEBPACK_IMPORTED_MODULE_2___default()();
      var from = today.format(this.format);
      var to = today.add(1, 'days').format(this.format);
      // Note: for DateTimeFields the end (to) date is non-inclusive in a
      // range query. Therefore the range must be one day longer than would
      // seem necessary.
      // (https://docs.djangoproject.com/en/2.0/ref/models/querysets/#range)
      switch (value) {
        case 'today':
          break;
        case 'last-7':
          from = today.subtract(7, 'days').format(this.format);
          break;
        case 'last-30':
          from = today.subtract(30, 'days').format(this.format);
          break;
        case 'this-week':
          from = today.day(0).format(this.format);
          to = today.day(7).format(this.format);
          break;
        case 'this-month':
          from = today.date(1).format(this.format);
          to = moment__WEBPACK_IMPORTED_MODULE_2___default()().month(today.month() + 1).date(1).format(this.format);
          break;
        case 'this-quarter':
          from = moment__WEBPACK_IMPORTED_MODULE_2___default()().date(1).quarter(today.quarter()).format(this.format);
          to = moment__WEBPACK_IMPORTED_MODULE_2___default()().date(1).quarter(today.quarter() + 1).format(this.format);
          break;
        case 'this-year':
          var first = today.dayOfYear(1);
          from = first.format(this.format);
          to = first.add(1, 'years').format(this.format);
          break;
        default:
          return;
      }
      return {
        start: from,
        end: to
      };
    };
    var dateRange = this.updateRange(defaultDateRange);
    this.items = options.items;
    this.helploading = options.helploading;
    this.start = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(dateRange.start);
    this.end = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(dateRange.end);
    this.dateRangeType = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable('custom');
    this.format = 'YYYY-MM-DD';
    this.dateRangeType = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable();
    this.sortDescending = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(true);
    this.sortAsc = function () {
      self.items.sort(function (a, b) {
        return a.lasttimestamp === b.lasttimestamp ? 0 : a.lasttimestamp < b.lasttimestamp ? -1 : 1;
      });
    };
    this.sortDesc = function () {
      self.items.sort(function (a, b) {
        return a.lasttimestamp === b.lasttimestamp ? 0 : a.lasttimestamp > b.lasttimestamp ? -1 : 1;
      });
    };
    this.editResource = function (resourceinstanceid) {
      window.open(arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.resource_editor + resourceinstanceid);
    }, this.sortDescending.subscribe(function (val) {
      if (val === true) {
        self.sortDesc();
      } else {
        self.sortAsc();
      }
    });
    this.dateRangeType(defaultDateRange);
    this.dateRangeType.subscribe(function (value) {
      var range = this.updateRange(value);
      this.start(range.start);
      this.end(range.end);
      this.updateList();
    }, this);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProvisionalHistoryList);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZWUwOTVmNmFlMzlhMDFmYzAwM2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDSTtBQUNDO0FBQ0Y7QUFDRTtBQUNNO0FBQ0c7QUFDSjtBQUNlO0FBR2hELElBQUlTLHNCQUFzQixHQUFHSixrREFBUSxDQUFDSyxNQUFNLENBQUM7RUFDekM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVJQyxZQUFZLEVBQUUsSUFBSTtFQUVsQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0lDLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFXQyxPQUFPLEVBQUU7SUFDMUIsSUFBSUMsSUFBSSxHQUFHLElBQUk7SUFDZixJQUFJQyxnQkFBZ0IsR0FBRyxTQUFTO0lBQ2hDVixrREFBUSxDQUFDVyxTQUFTLENBQUNKLFVBQVUsQ0FBQ0ssS0FBSyxDQUFDLElBQUksRUFBRUMsU0FBUyxDQUFDO0lBRXBELElBQUksQ0FBQ0MsVUFBVSxHQUFHLFlBQVc7TUFDekJMLElBQUksQ0FBQ00sV0FBVyxDQUFDLElBQUksQ0FBQztNQUN0Qk4sSUFBSSxDQUFDTyxLQUFLLENBQUNDLFNBQVMsQ0FBQyxDQUFDO01BQ3RCdEIsa0RBQU0sQ0FBQztRQUNId0IsSUFBSSxFQUFFLEtBQUs7UUFDWEMsR0FBRyxFQUFFckIsOENBQU0sQ0FBQ3NCLElBQUksQ0FBQ0MsWUFBWTtRQUM3QkMsSUFBSSxFQUFFO1VBQUNDLEtBQUssRUFBRSxJQUFJLENBQUNBLEtBQUssQ0FBQyxDQUFDO1VBQUVDLEdBQUcsRUFBRSxJQUFJLENBQUNBLEdBQUcsQ0FBQztRQUFDO01BQy9DLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBU0gsSUFBSSxFQUFFO1FBQ25CZCxJQUFJLENBQUNNLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDdkJOLElBQUksQ0FBQ08sS0FBSyxDQUFDcEIscURBQUssQ0FBQzJCLElBQUksRUFBRSxVQUFTSyxJQUFJLEVBQUU7VUFDbENBLElBQUksQ0FBQ0MsV0FBVyxHQUFHaEMsNkNBQU0sQ0FBQytCLElBQUksQ0FBQ0UsYUFBYSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztVQUMxRSxPQUFPSCxJQUFJO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJbkIsSUFBSSxDQUFDdUIsY0FBYyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7VUFDakN2QixJQUFJLENBQUN3QixPQUFPLENBQUMsQ0FBQztRQUNsQjtNQUNKLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLENBQUNDLFdBQVcsR0FBRyxVQUFTQyxLQUFLLEVBQUU7TUFDL0IsSUFBSUMsS0FBSyxHQUFHdkMsNkNBQU0sQ0FBQyxDQUFDO01BQ3BCLElBQUl3QyxJQUFJLEdBQUdELEtBQUssQ0FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQ0EsTUFBTSxDQUFDO01BQ3BDLElBQUlPLEVBQUUsR0FBR0YsS0FBSyxDQUFDRyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDUixNQUFNLENBQUMsSUFBSSxDQUFDQSxNQUFNLENBQUM7TUFDakQ7TUFDQTtNQUNBO01BQ0E7TUFDQSxRQUFRSSxLQUFLO1FBQ2IsS0FBSyxPQUFPO1VBQ1I7UUFDSixLQUFLLFFBQVE7VUFDVEUsSUFBSSxHQUFHRCxLQUFLLENBQUNJLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUNULE1BQU0sQ0FBQyxJQUFJLENBQUNBLE1BQU0sQ0FBQztVQUNwRDtRQUNKLEtBQUssU0FBUztVQUNWTSxJQUFJLEdBQUdELEtBQUssQ0FBQ0ksUUFBUSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQ0EsTUFBTSxDQUFDO1VBQ3JEO1FBQ0osS0FBSyxXQUFXO1VBQ1pNLElBQUksR0FBR0QsS0FBSyxDQUFDSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUNBLE1BQU0sQ0FBQztVQUN2Q08sRUFBRSxHQUFHRixLQUFLLENBQUNLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQ0EsTUFBTSxDQUFDO1VBQ3JDO1FBQ0osS0FBSyxZQUFZO1VBQ2JNLElBQUksR0FBR0QsS0FBSyxDQUFDTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUNBLE1BQU0sQ0FBQztVQUN4Q08sRUFBRSxHQUFHekMsNkNBQU0sQ0FBQyxDQUFDLENBQUM4QyxLQUFLLENBQUNQLEtBQUssQ0FBQ08sS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDQSxNQUFNLENBQUM7VUFDbEU7UUFDSixLQUFLLGNBQWM7VUFDZk0sSUFBSSxHQUFHeEMsNkNBQU0sQ0FBQyxDQUFDLENBQUM2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNFLE9BQU8sQ0FBQ1IsS0FBSyxDQUFDUSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUNBLE1BQU0sQ0FBQztVQUNwRU8sRUFBRSxHQUFHekMsNkNBQU0sQ0FBQyxDQUFDLENBQUM2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNFLE9BQU8sQ0FBQ1IsS0FBSyxDQUFDUSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDYixNQUFNLENBQUMsSUFBSSxDQUFDQSxNQUFNLENBQUM7VUFDdEU7UUFDSixLQUFLLFdBQVc7VUFDWixJQUFJYyxLQUFLLEdBQUdULEtBQUssQ0FBQ1UsU0FBUyxDQUFDLENBQUMsQ0FBQztVQUM5QlQsSUFBSSxHQUFHUSxLQUFLLENBQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUNBLE1BQU0sQ0FBQztVQUNoQ08sRUFBRSxHQUFHTyxLQUFLLENBQUNOLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUNBLE1BQU0sQ0FBQztVQUM5QztRQUNKO1VBQ0k7TUFDSjtNQUNBLE9BQU87UUFDSFAsS0FBSyxFQUFFYSxJQUFJO1FBQ1haLEdBQUcsRUFBRWE7TUFDVCxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUlTLFNBQVMsR0FBRyxJQUFJLENBQUNiLFdBQVcsQ0FBQ3hCLGdCQUFnQixDQUFDO0lBRWxELElBQUksQ0FBQ00sS0FBSyxHQUFHUixPQUFPLENBQUNRLEtBQUs7SUFDMUIsSUFBSSxDQUFDRCxXQUFXLEdBQUdQLE9BQU8sQ0FBQ08sV0FBVztJQUN0QyxJQUFJLENBQUNTLEtBQUssR0FBRzFCLDBEQUFhLENBQUNpRCxTQUFTLENBQUN2QixLQUFLLENBQUM7SUFDM0MsSUFBSSxDQUFDQyxHQUFHLEdBQUczQiwwREFBYSxDQUFDaUQsU0FBUyxDQUFDdEIsR0FBRyxDQUFDO0lBQ3ZDLElBQUksQ0FBQ3dCLGFBQWEsR0FBR25ELDBEQUFhLENBQUMsUUFBUSxDQUFDO0lBQzVDLElBQUksQ0FBQ2lDLE1BQU0sR0FBRyxZQUFZO0lBQzFCLElBQUksQ0FBQ2tCLGFBQWEsR0FBR25ELDBEQUFhLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUNrQyxjQUFjLEdBQUdsQywwREFBYSxDQUFDLElBQUksQ0FBQztJQUV6QyxJQUFJLENBQUNtQyxPQUFPLEdBQUcsWUFBVztNQUN0QnhCLElBQUksQ0FBQ08sS0FBSyxDQUFDa0MsSUFBSSxDQUFDLFVBQVNDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO1FBQzNCLE9BQU9ELENBQUMsQ0FBQ3JCLGFBQWEsS0FBS3NCLENBQUMsQ0FBQ3RCLGFBQWEsR0FBRyxDQUFDLEdBQUlxQixDQUFDLENBQUNyQixhQUFhLEdBQUdzQixDQUFDLENBQUN0QixhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRTtNQUNqRyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxDQUFDdUIsUUFBUSxHQUFHLFlBQVc7TUFDdkI1QyxJQUFJLENBQUNPLEtBQUssQ0FBQ2tDLElBQUksQ0FBQyxVQUFTQyxDQUFDLEVBQUVDLENBQUMsRUFBRTtRQUMzQixPQUFPRCxDQUFDLENBQUNyQixhQUFhLEtBQUtzQixDQUFDLENBQUN0QixhQUFhLEdBQUcsQ0FBQyxHQUFJcUIsQ0FBQyxDQUFDckIsYUFBYSxHQUFHc0IsQ0FBQyxDQUFDdEIsYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUU7TUFDakcsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksQ0FBQ3dCLFlBQVksR0FBRyxVQUFTQyxrQkFBa0IsRUFBQztNQUM1Q0MsTUFBTSxDQUFDQyxJQUFJLENBQUMxRCw4Q0FBTSxDQUFDc0IsSUFBSSxDQUFDcUMsZUFBZSxHQUFHSCxrQkFBa0IsQ0FBQztJQUNqRSxDQUFDLEVBRUQsSUFBSSxDQUFDdkIsY0FBYyxDQUFDMkIsU0FBUyxDQUFDLFVBQVNDLEdBQUcsRUFBRTtNQUN4QyxJQUFJQSxHQUFHLEtBQUssSUFBSSxFQUFFO1FBQ2RuRCxJQUFJLENBQUM0QyxRQUFRLENBQUMsQ0FBQztNQUNuQixDQUFDLE1BQU07UUFDSDVDLElBQUksQ0FBQ3dCLE9BQU8sQ0FBQyxDQUFDO01BQ2xCO0lBQ0osQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDZ0IsYUFBYSxDQUFDdkMsZ0JBQWdCLENBQUM7SUFFcEMsSUFBSSxDQUFDdUMsYUFBYSxDQUFDVSxTQUFTLENBQUMsVUFBU3hCLEtBQUssRUFBQztNQUN4QyxJQUFJMEIsS0FBSyxHQUFHLElBQUksQ0FBQzNCLFdBQVcsQ0FBQ0MsS0FBSyxDQUFDO01BQ25DLElBQUksQ0FBQ1gsS0FBSyxDQUFDcUMsS0FBSyxDQUFDckMsS0FBSyxDQUFDO01BQ3ZCLElBQUksQ0FBQ0MsR0FBRyxDQUFDb0MsS0FBSyxDQUFDcEMsR0FBRyxDQUFDO01BQ25CLElBQUksQ0FBQ1gsVUFBVSxDQUFDLENBQUM7SUFDckIsQ0FBQyxFQUFFLElBQUksQ0FBQztFQUVaO0FBRUosQ0FBQyxDQUFDO0FBQ0YsaUVBQWVWLHNCQUFzQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvcHJvdmlzaW9uYWwtaGlzdG9yeS1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgTGlzdFZpZXcgZnJvbSAndmlld3MvbGlzdCc7XG5pbXBvcnQgZHAgZnJvbSAnYmluZGluZ3MvZGF0ZXBpY2tlcic7XG5pbXBvcnQgY2ggZnJvbSAnYmluZGluZ3MvY2hvc2VuJztcbmltcG9ydCBzcyBmcm9tICd2aWV3cy9jb21wb25lbnRzL3NpbXBsZS1zd2l0Y2gnO1xuXG5cbnZhciBQcm92aXNpb25hbEhpc3RvcnlMaXN0ID0gTGlzdFZpZXcuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAqIEEgYmFja2JvbmUgdmlldyB0byBtYW5hZ2UgYSBsaXN0IG9mIGdyYXBoIG5vZGVzXG4gICAgKiBAYXVnbWVudHMgTGlzdFZpZXdcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICogQG5hbWUgUHJvdmlzaW9uYWxIaXN0b3J5TGlzdFxuICAgICovXG5cbiAgICBzaW5nbGVTZWxlY3Q6IHRydWUsXG5cbiAgICAvKipcbiAgICAqIGluaXRpYWxpemVzIHRoZSB2aWV3IHdpdGggb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICogQG1lbWJlcm9mIFByb3Zpc2lvbmFsSGlzdG9yeUxpc3QucHJvdG90eXBlXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBkZWZhdWx0RGF0ZVJhbmdlID0gXCJsYXN0LTMwXCI7XG4gICAgICAgIExpc3RWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmhlbHBsb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgc2VsZi5pdGVtcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy50aWxlX2hpc3RvcnksXG4gICAgICAgICAgICAgICAgZGF0YToge3N0YXJ0OiB0aGlzLnN0YXJ0KCksIGVuZDogdGhpcy5lbmQoKX1cbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVscGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYuaXRlbXMoXy5tYXAoZGF0YSwgZnVuY3Rpb24oZWRpdCkge1xuICAgICAgICAgICAgICAgICAgICBlZGl0LmRpc3BsYXl0aW1lID0gbW9tZW50KGVkaXQubGFzdHRpbWVzdGFtcCkuZm9ybWF0KCdERC1NTS1ZWVlZIGhoOm1tIGEnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkaXQ7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNvcnREZXNjZW5kaW5nKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc29ydEFzYygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudXBkYXRlUmFuZ2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHRvZGF5ID0gbW9tZW50KCk7XG4gICAgICAgICAgICB2YXIgZnJvbSA9IHRvZGF5LmZvcm1hdCh0aGlzLmZvcm1hdCk7XG4gICAgICAgICAgICB2YXIgdG8gPSB0b2RheS5hZGQoMSwgJ2RheXMnKS5mb3JtYXQodGhpcy5mb3JtYXQpO1xuICAgICAgICAgICAgLy8gTm90ZTogZm9yIERhdGVUaW1lRmllbGRzIHRoZSBlbmQgKHRvKSBkYXRlIGlzIG5vbi1pbmNsdXNpdmUgaW4gYVxuICAgICAgICAgICAgLy8gcmFuZ2UgcXVlcnkuIFRoZXJlZm9yZSB0aGUgcmFuZ2UgbXVzdCBiZSBvbmUgZGF5IGxvbmdlciB0aGFuIHdvdWxkXG4gICAgICAgICAgICAvLyBzZWVtIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgIC8vIChodHRwczovL2RvY3MuZGphbmdvcHJvamVjdC5jb20vZW4vMi4wL3JlZi9tb2RlbHMvcXVlcnlzZXRzLyNyYW5nZSlcbiAgICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xhc3QtNyc6XG4gICAgICAgICAgICAgICAgZnJvbSA9IHRvZGF5LnN1YnRyYWN0KDcsICdkYXlzJykuZm9ybWF0KHRoaXMuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xhc3QtMzAnOlxuICAgICAgICAgICAgICAgIGZyb20gPSB0b2RheS5zdWJ0cmFjdCgzMCwgJ2RheXMnKS5mb3JtYXQodGhpcy5mb3JtYXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndGhpcy13ZWVrJzpcbiAgICAgICAgICAgICAgICBmcm9tID0gdG9kYXkuZGF5KDApLmZvcm1hdCh0aGlzLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgdG8gPSB0b2RheS5kYXkoNykuZm9ybWF0KHRoaXMuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RoaXMtbW9udGgnOlxuICAgICAgICAgICAgICAgIGZyb20gPSB0b2RheS5kYXRlKDEpLmZvcm1hdCh0aGlzLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgdG8gPSBtb21lbnQoKS5tb250aCh0b2RheS5tb250aCgpICsgMSkuZGF0ZSgxKS5mb3JtYXQodGhpcy5mb3JtYXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndGhpcy1xdWFydGVyJzpcbiAgICAgICAgICAgICAgICBmcm9tID0gbW9tZW50KCkuZGF0ZSgxKS5xdWFydGVyKHRvZGF5LnF1YXJ0ZXIoKSkuZm9ybWF0KHRoaXMuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICB0byA9IG1vbWVudCgpLmRhdGUoMSkucXVhcnRlcih0b2RheS5xdWFydGVyKCkgKyAxKS5mb3JtYXQodGhpcy5mb3JtYXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndGhpcy15ZWFyJzpcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSB0b2RheS5kYXlPZlllYXIoMSk7XG4gICAgICAgICAgICAgICAgZnJvbSA9IGZpcnN0LmZvcm1hdCh0aGlzLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgdG8gPSBmaXJzdC5hZGQoMSwgJ3llYXJzJykuZm9ybWF0KHRoaXMuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogZnJvbSxcbiAgICAgICAgICAgICAgICBlbmQ6IHRvXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkYXRlUmFuZ2UgPSB0aGlzLnVwZGF0ZVJhbmdlKGRlZmF1bHREYXRlUmFuZ2UpO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBvcHRpb25zLml0ZW1zO1xuICAgICAgICB0aGlzLmhlbHBsb2FkaW5nID0gb3B0aW9ucy5oZWxwbG9hZGluZztcbiAgICAgICAgdGhpcy5zdGFydCA9IGtvLm9ic2VydmFibGUoZGF0ZVJhbmdlLnN0YXJ0KTtcbiAgICAgICAgdGhpcy5lbmQgPSBrby5vYnNlcnZhYmxlKGRhdGVSYW5nZS5lbmQpO1xuICAgICAgICB0aGlzLmRhdGVSYW5nZVR5cGUgPSBrby5vYnNlcnZhYmxlKCdjdXN0b20nKTtcbiAgICAgICAgdGhpcy5mb3JtYXQgPSAnWVlZWS1NTS1ERCc7XG4gICAgICAgIHRoaXMuZGF0ZVJhbmdlVHlwZSA9IGtvLm9ic2VydmFibGUoKTtcbiAgICAgICAgdGhpcy5zb3J0RGVzY2VuZGluZyA9IGtvLm9ic2VydmFibGUodHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5zb3J0QXNjID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLml0ZW1zLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLmxhc3R0aW1lc3RhbXAgPT09IGIubGFzdHRpbWVzdGFtcCA/IDAgOiAoYS5sYXN0dGltZXN0YW1wIDwgYi5sYXN0dGltZXN0YW1wID8gLTEgOiAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc29ydERlc2MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuaXRlbXMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEubGFzdHRpbWVzdGFtcCA9PT0gYi5sYXN0dGltZXN0YW1wID8gMCA6IChhLmxhc3R0aW1lc3RhbXAgPiBiLmxhc3R0aW1lc3RhbXAgPyAtMSA6IDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lZGl0UmVzb3VyY2UgPSBmdW5jdGlvbihyZXNvdXJjZWluc3RhbmNlaWQpe1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oYXJjaGVzLnVybHMucmVzb3VyY2VfZWRpdG9yICsgcmVzb3VyY2VpbnN0YW5jZWlkKTtcbiAgICAgICAgfSxcblxuICAgICAgICB0aGlzLnNvcnREZXNjZW5kaW5nLnN1YnNjcmliZShmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNvcnREZXNjKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc29ydEFzYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRhdGVSYW5nZVR5cGUoZGVmYXVsdERhdGVSYW5nZSk7XG5cbiAgICAgICAgdGhpcy5kYXRlUmFuZ2VUeXBlLnN1YnNjcmliZShmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLnVwZGF0ZVJhbmdlKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQocmFuZ2Uuc3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5lbmQocmFuZ2UuZW5kKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdCgpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgIH1cblxufSk7XG5leHBvcnQgZGVmYXVsdCBQcm92aXNpb25hbEhpc3RvcnlMaXN0O1xuIl0sIm5hbWVzIjpbIiQiLCJfIiwibW9tZW50Iiwia28iLCJhcmNoZXMiLCJMaXN0VmlldyIsImRwIiwiY2giLCJzcyIsIlByb3Zpc2lvbmFsSGlzdG9yeUxpc3QiLCJleHRlbmQiLCJzaW5nbGVTZWxlY3QiLCJpbml0aWFsaXplIiwib3B0aW9ucyIsInNlbGYiLCJkZWZhdWx0RGF0ZVJhbmdlIiwicHJvdG90eXBlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ1cGRhdGVMaXN0IiwiaGVscGxvYWRpbmciLCJpdGVtcyIsInJlbW92ZUFsbCIsImFqYXgiLCJ0eXBlIiwidXJsIiwidXJscyIsInRpbGVfaGlzdG9yeSIsImRhdGEiLCJzdGFydCIsImVuZCIsImRvbmUiLCJtYXAiLCJlZGl0IiwiZGlzcGxheXRpbWUiLCJsYXN0dGltZXN0YW1wIiwiZm9ybWF0Iiwic29ydERlc2NlbmRpbmciLCJzb3J0QXNjIiwidXBkYXRlUmFuZ2UiLCJ2YWx1ZSIsInRvZGF5IiwiZnJvbSIsInRvIiwiYWRkIiwic3VidHJhY3QiLCJkYXkiLCJkYXRlIiwibW9udGgiLCJxdWFydGVyIiwiZmlyc3QiLCJkYXlPZlllYXIiLCJkYXRlUmFuZ2UiLCJvYnNlcnZhYmxlIiwiZGF0ZVJhbmdlVHlwZSIsInNvcnQiLCJhIiwiYiIsInNvcnREZXNjIiwiZWRpdFJlc291cmNlIiwicmVzb3VyY2VpbnN0YW5jZWlkIiwid2luZG93Iiwib3BlbiIsInJlc291cmNlX2VkaXRvciIsInN1YnNjcmliZSIsInZhbCIsInJhbmdlIl0sInNvdXJjZVJvb3QiOiIifQ==