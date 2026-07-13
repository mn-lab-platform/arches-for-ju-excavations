"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[59394],{

/***/ 59394:
/*!********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/notification.js + 1 modules ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ notification)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(95093);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/notification.htm
const notification_namespaceObject = "templates/views/components/notification.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/notification.js






/** 
 * A generic component for displaying notifications
 * @name NotificationViewModel
 **/

function NotificationViewModel(params) {
  var self = this;
  this.info = knockout_latest_default().observable();
  this.displaytime = moment_default()(params.created).format('dddd, DD MMMM YYYY | hh:mm A');
  this.id = params.id;
  this.loadedResources = params.loaded_resources;
  this.link = params.link;
  this.message = params.message;
  this.files = params.files;
  this.translations = arches["default"].translations;
  this.dismiss = function (parent) {
    jquery_min_default().ajax({
      type: 'POST',
      url: arches["default"].urls.dismiss_notifications,
      data: {
        "dismissals": JSON.stringify([self.id])
      }
    }).done(function () {
      if (parent) {
        var item = parent.items().find(function (item) {
          return item.id === self.id;
        });
        parent.items.remove(item);
      }
    });
  };
  this.getExportFile = function () {
    jquery_min_default().ajax({
      type: 'GET',
      url: arches["default"].urls.get_export_file,
      data: {
        "exportid": self.link
      }
    }).done(function (data) {
      if (data.url) {
        window.open(data.url);
      } else {
        self.info(data.message);
      }
    });
  };
}
knockout_latest_default().components.register('notification', {
  viewModel: NotificationViewModel,
  template: notification_namespaceObject
});
/* harmony default export */ const notification = (NotificationViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYmMxNDYxMDhjOWIzYzJkYzI4MmEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNHO0FBQ0U7QUFDQTtBQUNtRDs7QUFHL0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0sscUJBQXFCQSxDQUFDQyxNQUFNLEVBQUU7RUFDbkMsSUFBSUMsSUFBSSxHQUFHLElBQUk7RUFHZixJQUFJLENBQUNDLElBQUksR0FBR1Asb0NBQWEsQ0FBQyxDQUFDO0VBRTNCLElBQUksQ0FBQ1MsV0FBVyxHQUFHUixnQkFBTSxDQUFDSSxNQUFNLENBQUNLLE9BQU8sQ0FBQyxDQUFDQyxNQUFNLENBQUMsOEJBQThCLENBQUM7RUFDaEYsSUFBSSxDQUFDQyxFQUFFLEdBQUdQLE1BQU0sQ0FBQ08sRUFBRTtFQUNuQixJQUFJLENBQUNDLGVBQWUsR0FBR1IsTUFBTSxDQUFDUyxnQkFBZ0I7RUFDOUMsSUFBSSxDQUFDQyxJQUFJLEdBQUdWLE1BQU0sQ0FBQ1UsSUFBSTtFQUN2QixJQUFJLENBQUNDLE9BQU8sR0FBR1gsTUFBTSxDQUFDVyxPQUFPO0VBQzdCLElBQUksQ0FBQ0MsS0FBSyxHQUFHWixNQUFNLENBQUNZLEtBQUs7RUFDekIsSUFBSSxDQUFDQyxZQUFZLEdBQUdoQixpQkFBTSxDQUFDZ0IsWUFBWTtFQUV2QyxJQUFJLENBQUNDLE9BQU8sR0FBRyxVQUFTQyxNQUFNLEVBQUU7SUFDNUJyQix5QkFBTSxDQUFDO01BQ0h1QixJQUFJLEVBQUUsTUFBTTtNQUNaQyxHQUFHLEVBQUVyQixpQkFBTSxDQUFDc0IsSUFBSSxDQUFDQyxxQkFBcUI7TUFDdENDLElBQUksRUFBRTtRQUFDLFlBQVksRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQ3RCLElBQUksQ0FBQ00sRUFBRSxDQUFDO01BQUM7SUFDbEQsQ0FBQyxDQUFDLENBQUNpQixJQUFJLENBQUMsWUFBVztNQUNmLElBQUlULE1BQU0sRUFBRTtRQUNSLElBQUlVLElBQUksR0FBR1YsTUFBTSxDQUFDVyxLQUFLLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQzFCLFVBQVNGLElBQUksRUFBRTtVQUFFLE9BQU9BLElBQUksQ0FBQ2xCLEVBQUUsS0FBS04sSUFBSSxDQUFDTSxFQUFFO1FBQUUsQ0FDakQsQ0FBQztRQUNEUSxNQUFNLENBQUNXLEtBQUssQ0FBQ0UsTUFBTSxDQUFDSCxJQUFJLENBQUM7TUFDN0I7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBRUQsSUFBSSxDQUFDSSxhQUFhLEdBQUcsWUFBVztJQUM1Qm5DLHlCQUFNLENBQUM7TUFDSHVCLElBQUksRUFBRSxLQUFLO01BQ1hDLEdBQUcsRUFBRXJCLGlCQUFNLENBQUNzQixJQUFJLENBQUNXLGVBQWU7TUFDaENULElBQUksRUFBRTtRQUFDLFVBQVUsRUFBRXBCLElBQUksQ0FBQ1M7TUFBSTtJQUNoQyxDQUFDLENBQUMsQ0FBQ2MsSUFBSSxDQUFDLFVBQVNILElBQUksRUFBRTtNQUNuQixJQUFJQSxJQUFJLENBQUNILEdBQUcsRUFBRTtRQUNWYSxNQUFNLENBQUNDLElBQUksQ0FBQ1gsSUFBSSxDQUFDSCxHQUFHLENBQUM7TUFDekIsQ0FBQyxNQUFNO1FBQ0hqQixJQUFJLENBQUNDLElBQUksQ0FBQ21CLElBQUksQ0FBQ1YsT0FBTyxDQUFDO01BQzNCO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQztBQUNMO0FBRUFoQixvQ0FBYSxDQUFDdUMsUUFBUSxDQUFDLGNBQWMsRUFBRTtFQUNuQ0MsU0FBUyxFQUFFcEMscUJBQXFCO0VBQ2hDcUMsUUFBUSxFQUFFdEMsNEJBQW9CQTtBQUNsQyxDQUFDLENBQUM7QUFFRixtREFBZUMscUJBQXFCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBub3RpZmljYXRpb25UZW1wbGF0ZSBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy9ub3RpZmljYXRpb24uaHRtJztcblxuXG4vKiogXG4gKiBBIGdlbmVyaWMgY29tcG9uZW50IGZvciBkaXNwbGF5aW5nIG5vdGlmaWNhdGlvbnNcbiAqIEBuYW1lIE5vdGlmaWNhdGlvblZpZXdNb2RlbFxuICoqL1xuXG5mdW5jdGlvbiBOb3RpZmljYXRpb25WaWV3TW9kZWwocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIFxuICAgIHRoaXMuaW5mbyA9IGtvLm9ic2VydmFibGUoKTtcblxuICAgIHRoaXMuZGlzcGxheXRpbWUgPSBtb21lbnQocGFyYW1zLmNyZWF0ZWQpLmZvcm1hdCgnZGRkZCwgREQgTU1NTSBZWVlZIHwgaGg6bW0gQScpO1xuICAgIHRoaXMuaWQgPSBwYXJhbXMuaWQ7XG4gICAgdGhpcy5sb2FkZWRSZXNvdXJjZXMgPSBwYXJhbXMubG9hZGVkX3Jlc291cmNlcztcbiAgICB0aGlzLmxpbmsgPSBwYXJhbXMubGluaztcbiAgICB0aGlzLm1lc3NhZ2UgPSBwYXJhbXMubWVzc2FnZTtcbiAgICB0aGlzLmZpbGVzID0gcGFyYW1zLmZpbGVzO1xuICAgIHRoaXMudHJhbnNsYXRpb25zID0gYXJjaGVzLnRyYW5zbGF0aW9ucztcblxuICAgIHRoaXMuZGlzbWlzcyA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5kaXNtaXNzX25vdGlmaWNhdGlvbnMsXG4gICAgICAgICAgICBkYXRhOiB7XCJkaXNtaXNzYWxzXCI6IEpTT04uc3RyaW5naWZ5KFtzZWxmLmlkXSl9LFxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gcGFyZW50Lml0ZW1zKCkuZmluZChcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oaXRlbSkgeyByZXR1cm4gaXRlbS5pZCA9PT0gc2VsZi5pZDsgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcGFyZW50Lml0ZW1zLnJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0RXhwb3J0RmlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLmdldF9leHBvcnRfZmlsZSxcbiAgICAgICAgICAgIGRhdGE6IHtcImV4cG9ydGlkXCI6IHNlbGYubGlua31cbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihkYXRhLnVybCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5mbyhkYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKCdub3RpZmljYXRpb24nLCB7XG4gICAgdmlld01vZGVsOiBOb3RpZmljYXRpb25WaWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IG5vdGlmaWNhdGlvblRlbXBsYXRlLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvblZpZXdNb2RlbDtcbiJdLCJuYW1lcyI6WyIkIiwia28iLCJtb21lbnQiLCJhcmNoZXMiLCJub3RpZmljYXRpb25UZW1wbGF0ZSIsIk5vdGlmaWNhdGlvblZpZXdNb2RlbCIsInBhcmFtcyIsInNlbGYiLCJpbmZvIiwib2JzZXJ2YWJsZSIsImRpc3BsYXl0aW1lIiwiY3JlYXRlZCIsImZvcm1hdCIsImlkIiwibG9hZGVkUmVzb3VyY2VzIiwibG9hZGVkX3Jlc291cmNlcyIsImxpbmsiLCJtZXNzYWdlIiwiZmlsZXMiLCJ0cmFuc2xhdGlvbnMiLCJkaXNtaXNzIiwicGFyZW50IiwiYWpheCIsInR5cGUiLCJ1cmwiLCJ1cmxzIiwiZGlzbWlzc19ub3RpZmljYXRpb25zIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJkb25lIiwiaXRlbSIsIml0ZW1zIiwiZmluZCIsInJlbW92ZSIsImdldEV4cG9ydEZpbGUiLCJnZXRfZXhwb3J0X2ZpbGUiLCJ3aW5kb3ciLCJvcGVuIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwidGVtcGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==