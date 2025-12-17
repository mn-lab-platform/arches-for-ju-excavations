"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[74382],{

/***/ 74382:
/*!***************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/notifications-list.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var views_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/list */ 38777);
/* harmony import */ var bindings_datepicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bindings/datepicker */ 72253);
/* harmony import */ var bindings_chosen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bindings/chosen */ 63777);
/* harmony import */ var views_components_simple_switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/components/simple-switch */ 96613);
/* harmony import */ var views_components_notification__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/components/notification */ 59394);







var NotificationsList = views_list__WEBPACK_IMPORTED_MODULE_2__["default"].extend({
  /**
  * A backbone view to manage a list of notification records
  * @augments ListView
  * @constructor
  * @name NotificationsList
  */

  singleSelect: true,
  initialize: function initialize(options) {
    var self = this;
    this.items = options.items;
    this.helploading = options.helploading;
    views_list__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.initialize.apply(this, arguments);
    this.updateList = function () {
      self.helploading(true);
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'GET',
        url: arches__WEBPACK_IMPORTED_MODULE_1__["default"].urls.get_notifications,
        data: {
          "unread_only": true
        }
      }).done(function (data) {
        self.items(data.notifications);
        self.helploading(false);
      });
    };
    this.dismissAll = function () {
      var notifs = self.items().map(function (notif) {
        return notif.id;
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: arches__WEBPACK_IMPORTED_MODULE_1__["default"].urls.dismiss_notifications,
        data: {
          "dismissals": JSON.stringify(notifs)
        }
      }).done(function () {
        self.items.removeAll();
      });
    };
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationsList);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMzM2YWY5Yzg2ZTlkMGU1NDQ2NmMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0s7QUFDTTtBQUNMO0FBQ0o7QUFDZTtBQUNEO0FBR3ZDLElBQUlHLGlCQUFpQixHQUFHRCxrREFBUSxDQUFDRSxNQUFNLENBQUM7RUFDcEM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVJQyxZQUFZLEVBQUUsSUFBSTtFQUVsQkMsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQVdDLE9BQU8sRUFBRTtJQUMxQixJQUFJQyxJQUFJLEdBQUcsSUFBSTtJQUVmLElBQUksQ0FBQ0MsS0FBSyxHQUFHRixPQUFPLENBQUNFLEtBQUs7SUFDMUIsSUFBSSxDQUFDQyxXQUFXLEdBQUdILE9BQU8sQ0FBQ0csV0FBVztJQUd0Q1Isa0RBQVEsQ0FBQ1MsU0FBUyxDQUFDTCxVQUFVLENBQUNNLEtBQUssQ0FBQyxJQUFJLEVBQUVDLFNBQVMsQ0FBQztJQUVwRCxJQUFJLENBQUNDLFVBQVUsR0FBRyxZQUFXO01BQ3pCTixJQUFJLENBQUNFLFdBQVcsQ0FBQyxJQUFJLENBQUM7TUFFdEJWLGtEQUFNLENBQUM7UUFDSGdCLElBQUksRUFBRSxLQUFLO1FBQ1hDLEdBQUcsRUFBRWhCLDhDQUFNLENBQUNpQixJQUFJLENBQUNDLGlCQUFpQjtRQUNsQ0MsSUFBSSxFQUFFO1VBQUMsYUFBYSxFQUFFO1FBQUk7TUFDOUIsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxVQUFTRCxJQUFJLEVBQUU7UUFDbkJaLElBQUksQ0FBQ0MsS0FBSyxDQUFDVyxJQUFJLENBQUNFLGFBQWEsQ0FBQztRQUM5QmQsSUFBSSxDQUFDRSxXQUFXLENBQUMsS0FBSyxDQUFDO01BQzNCLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLENBQUNhLFVBQVUsR0FBRyxZQUFXO01BQ3pCLElBQUlDLE1BQU0sR0FBR2hCLElBQUksQ0FBQ0MsS0FBSyxDQUFDLENBQUMsQ0FBQ2dCLEdBQUcsQ0FBQyxVQUFTQyxLQUFLLEVBQUU7UUFBRSxPQUFPQSxLQUFLLENBQUNDLEVBQUU7TUFBRSxDQUFDLENBQUM7TUFFbkUzQixrREFBTSxDQUFDO1FBQ0hnQixJQUFJLEVBQUUsTUFBTTtRQUNaQyxHQUFHLEVBQUVoQiw4Q0FBTSxDQUFDaUIsSUFBSSxDQUFDVSxxQkFBcUI7UUFDdENSLElBQUksRUFBRTtVQUFDLFlBQVksRUFBRVMsSUFBSSxDQUFDQyxTQUFTLENBQUNOLE1BQU07UUFBQztNQUMvQyxDQUFDLENBQUMsQ0FBQ0gsSUFBSSxDQUFDLFlBQVc7UUFDZmIsSUFBSSxDQUFDQyxLQUFLLENBQUNzQixTQUFTLENBQUMsQ0FBQztNQUMxQixDQUFDLENBQUM7SUFDTixDQUFDO0VBQ0w7QUFDSixDQUFDLENBQUM7QUFFRixpRUFBZTVCLGlCQUFpQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3Mvbm90aWZpY2F0aW9ucy1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgTGlzdFZpZXcgZnJvbSAndmlld3MvbGlzdCc7XG5pbXBvcnQgJ2JpbmRpbmdzL2RhdGVwaWNrZXInO1xuaW1wb3J0ICdiaW5kaW5ncy9jaG9zZW4nO1xuaW1wb3J0ICd2aWV3cy9jb21wb25lbnRzL3NpbXBsZS1zd2l0Y2gnO1xuaW1wb3J0ICd2aWV3cy9jb21wb25lbnRzL25vdGlmaWNhdGlvbic7XG5cblxudmFyIE5vdGlmaWNhdGlvbnNMaXN0ID0gTGlzdFZpZXcuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAqIEEgYmFja2JvbmUgdmlldyB0byBtYW5hZ2UgYSBsaXN0IG9mIG5vdGlmaWNhdGlvbiByZWNvcmRzXG4gICAgKiBAYXVnbWVudHMgTGlzdFZpZXdcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICogQG5hbWUgTm90aWZpY2F0aW9uc0xpc3RcbiAgICAqL1xuXG4gICAgc2luZ2xlU2VsZWN0OiB0cnVlLFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IG9wdGlvbnMuaXRlbXM7XG4gICAgICAgIHRoaXMuaGVscGxvYWRpbmcgPSBvcHRpb25zLmhlbHBsb2FkaW5nO1xuXG4gICAgICAgIFxuICAgICAgICBMaXN0Vmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmhlbHBsb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogYXJjaGVzLnVybHMuZ2V0X25vdGlmaWNhdGlvbnMsXG4gICAgICAgICAgICAgICAgZGF0YToge1widW5yZWFkX29ubHlcIjogdHJ1ZX1cbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHNlbGYuaXRlbXMoZGF0YS5ub3RpZmljYXRpb25zKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhlbHBsb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGlzbWlzc0FsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5vdGlmcyA9IHNlbGYuaXRlbXMoKS5tYXAoZnVuY3Rpb24obm90aWYpIHsgcmV0dXJuIG5vdGlmLmlkOyB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5kaXNtaXNzX25vdGlmaWNhdGlvbnMsXG4gICAgICAgICAgICAgICAgZGF0YToge1wiZGlzbWlzc2Fsc1wiOiBKU09OLnN0cmluZ2lmeShub3RpZnMpfSxcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pdGVtcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb25zTGlzdDtcbiJdLCJuYW1lcyI6WyIkIiwiYXJjaGVzIiwiTGlzdFZpZXciLCJOb3RpZmljYXRpb25zTGlzdCIsImV4dGVuZCIsInNpbmdsZVNlbGVjdCIsImluaXRpYWxpemUiLCJvcHRpb25zIiwic2VsZiIsIml0ZW1zIiwiaGVscGxvYWRpbmciLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsInVwZGF0ZUxpc3QiLCJhamF4IiwidHlwZSIsInVybCIsInVybHMiLCJnZXRfbm90aWZpY2F0aW9ucyIsImRhdGEiLCJkb25lIiwibm90aWZpY2F0aW9ucyIsImRpc21pc3NBbGwiLCJub3RpZnMiLCJtYXAiLCJub3RpZiIsImlkIiwiZGlzbWlzc19ub3RpZmljYXRpb25zIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlbW92ZUFsbCJdLCJzb3VyY2VSb290IjoiIn0=