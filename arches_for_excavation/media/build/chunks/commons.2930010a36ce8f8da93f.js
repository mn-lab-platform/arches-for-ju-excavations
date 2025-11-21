"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[61694],{

/***/ 61694:
/*!******************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/page-view.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! backbone */ 77186);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var view_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! view-data */ 22212);
/* harmony import */ var viewmodels_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! viewmodels/alert */ 21672);
/* harmony import */ var views_provisional_history_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! views/provisional-history-list */ 24115);
/* harmony import */ var views_notifications_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! views/notifications-list */ 74382);
/* harmony import */ var utils_aria__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! utils/aria */ 9285);
/* harmony import */ var utils_back_to_top__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! utils/back-to-top */ 34567);
/* harmony import */ var bindings_scrollTo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! bindings/scrollTo */ 82067);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! bootstrap */ 21836);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var bindings_slide__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! bindings/slide */ 83386);
/* harmony import */ var jquery_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! jquery-ui */ 76364);
/* harmony import */ var jquery_ui__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(jquery_ui__WEBPACK_IMPORTED_MODULE_14__);
















/**
* A backbone view representing a basic page in arches.  It sets up the
* viewModel defaults, optionally accepts additional view model data and
* binds the view model to the entire page.  When using, no other views
* should bind data to the DOM.
*
* @augments Backbone.View
* @constructor
* @name PageView
*/
var PageView = backbone__WEBPACK_IMPORTED_MODULE_2___default().View.extend({
  el: jquery__WEBPACK_IMPORTED_MODULE_0___default()('body'),
  /**
  * Creates an instance of PageView, optionally using a passed in view
  * model
  *
  * @memberof PageView.prototype
  * @param {object} options
  * @param {object} options.viewModel - an optional view model to be
  *                 bound to the page
  * @return {object} an instance of PageView
  */
  constructor: function constructor(options) {
    var self = this;
    this.viewModel = options && options.viewModel ? options.viewModel : {};
    this.viewModel.helploaded = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
    this.viewModel.helploading = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
    this.viewModel.helpOpen = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
    this.viewModel.editsOpen = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
    this.viewModel.notifsOpen = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
    this.viewModel.provisionalHistoryList = new views_provisional_history_list__WEBPACK_IMPORTED_MODULE_7__["default"]({
      items: knockout__WEBPACK_IMPORTED_MODULE_3___default().observableArray(),
      helploading: this.viewModel.helploading
    });
    this.viewModel.notifsList = new views_notifications_list__WEBPACK_IMPORTED_MODULE_8__["default"]({
      items: knockout__WEBPACK_IMPORTED_MODULE_3___default().observableArray(),
      helploading: this.viewModel.helploading
    });
    underscore__WEBPACK_IMPORTED_MODULE_1___default().defaults(this.viewModel, {
      helpTemplate: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(view_data__WEBPACK_IMPORTED_MODULE_5__["default"].help),
      alert: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(null),
      loading: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false),
      showTabs: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false),
      tabsActive: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false),
      menuActive: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false),
      recentsActive: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false),
      unreadNotifs: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false),
      dirty: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false),
      showConfirmNav: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false),
      navDestination: knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(''),
      handleEscKey: utils_aria__WEBPACK_IMPORTED_MODULE_9__["default"].handleEscKey,
      shiftFocus: utils_aria__WEBPACK_IMPORTED_MODULE_9__["default"].shiftFocus,
      backToTopHandler: utils_back_to_top__WEBPACK_IMPORTED_MODULE_10__["default"].backToTopHandler,
      urls: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls,
      navigate: function navigate(url, bypass) {
        if (!bypass && self.viewModel.dirty()) {
          self.viewModel.navDestination(url);
          self.viewModel.alert(new viewmodels_alert__WEBPACK_IMPORTED_MODULE_6__["default"]('ep-alert-blue', arches__WEBPACK_IMPORTED_MODULE_4__["default"].translations.confirmNav.title, arches__WEBPACK_IMPORTED_MODULE_4__["default"].translations.confirmNav.text, function () {
            self.viewModel.showConfirmNav(false);
          }, function () {
            self.viewModel.navigate(self.viewModel.navDestination(), true);
          }));
          return;
        }
        self.viewModel.alert(null);
        self.viewModel.loading(true);
        window.location.assign(url);
      },
      getHelp: function getHelp(template) {
        self.viewModel.helploading(true);
        var el = document.createElement('div');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ep-help-content').append(el);
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          type: "GET",
          url: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.help_template,
          data: {
            'template': template
          }
        }).done(function (data) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).html(data);
          self.viewModel.helploading(false);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find('.ep-help-topic-toggle').click(function () {
            var sectionEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('div');
            var iconEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('i');
            if (iconEl.hasClass("fa-chevron-right")) {
              iconEl.removeClass("fa-chevron-right");
              iconEl.addClass("fa-chevron-down");
            } else {
              iconEl.removeClass("fa-chevron-down");
              iconEl.addClass("fa-chevron-right");
            }
            var contentEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(sectionEl).find('.ep-help-topic-content').first();
            var contentExpanded = contentEl.css('display');
            if (contentExpanded) {
              if (contentExpanded === 'none') {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('aria-expanded', 'true');
              } else if (contentExpanded === 'block') {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('aria-expanded', 'false');
              }
            }
            contentEl.slideToggle();
          });
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find('.reloadable-img').click(function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('src', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('src'));
          });
        });
      },
      getProvisionalHistory: function getProvisionalHistory() {
        self.viewModel.provisionalHistoryList.updateList();
      },
      getNotifications: function getNotifications() {
        self.viewModel.notifsList.updateList();
      },
      openNotifs: function openNotifs(openButton, escListenScope, closeButton) {
        self.viewModel.getNotifications();
        self.viewModel.notifsOpen(!self.viewModel.notifsOpen());
        setTimeout(function () {
          self.viewModel.handleEscKey(openButton, escListenScope, closeButton);
        }, 500);
      },
      openEdits: function openEdits(openButton, escListenScope, closeButton) {
        self.viewModel.getProvisionalHistory();
        self.viewModel.editsOpen(!self.viewModel.editsOpen());
        setTimeout(function () {
          self.viewModel.handleEscKey(openButton, escListenScope, closeButton);
        }, 500);
      },
      openHelp: function openHelp(helpTemplates, openButton, escListenScope, closeButton) {
        helpTemplates.forEach(function (template) {
          return self.viewModel.getHelp(template);
        });
        self.viewModel.helpOpen(!self.viewModel.helpOpen());
        setTimeout(function () {
          self.viewModel.handleEscKey(openButton, escListenScope, closeButton);
        }, 500);
      },
      closeNotifs: function closeNotifs() {
        self.viewModel.getNotifications();
        self.viewModel.notifsOpen(false);
        self.viewModel.shiftFocus('#ep-notifs-button');
      },
      closeEdits: function closeEdits() {
        self.viewModel.editsOpen(false);
        self.viewModel.shiftFocus('#ep-edits-button');
      },
      closeHelp: function closeHelp() {
        var el = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ep-help-content');
        el.empty();
        self.viewModel.helpOpen(false);
        self.viewModel.shiftFocus('#ep-help-button');
      }
    });
    self.viewModel.notifsList.items.subscribe(function (list) {
      self.viewModel.unreadNotifs(list.length > 0);
    });
    self.viewModel.translations = arches__WEBPACK_IMPORTED_MODULE_4__["default"].translations;
    window.addEventListener('beforeunload', function () {
      self.viewModel.loading(true);
    });
    backbone__WEBPACK_IMPORTED_MODULE_2___default().View.apply(this, arguments);
    return this;
  },
  initialize: function initialize() {
    knockout__WEBPACK_IMPORTED_MODULE_3___default().applyBindings(this.viewModel);
    this.viewModel.getNotifications();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-toggle="tooltip"]').tooltip();
    utils_back_to_top__WEBPACK_IMPORTED_MODULE_10__["default"].scrollToTopHandler();
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageView);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMjkzMDAxMGEzNmNlOGY4ZGE5M2YuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNJO0FBQ0s7QUFDTjtBQUNFO0FBQ0s7QUFDYTtBQUNzQjtBQUNYO0FBQ3RCO0FBQ087QUFDZjtBQUNSO0FBQ0s7QUFDTDs7QUFHbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJVyxRQUFRLEdBQUdULG9EQUFhLENBQUNXLE1BQU0sQ0FBQztFQUNoQ0MsRUFBRSxFQUFFZCw2Q0FBQyxDQUFDLE1BQU0sQ0FBQztFQUViO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0llLFdBQVcsRUFBRSxTQUFiQSxXQUFXQSxDQUFXQyxPQUFPLEVBQUU7SUFDM0IsSUFBSUMsSUFBSSxHQUFHLElBQUk7SUFDZixJQUFJLENBQUNDLFNBQVMsR0FBSUYsT0FBTyxJQUFJQSxPQUFPLENBQUNFLFNBQVMsR0FBSUYsT0FBTyxDQUFDRSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3hFLElBQUksQ0FBQ0EsU0FBUyxDQUFDQyxVQUFVLEdBQUdoQiwwREFBYSxDQUFDLEtBQUssQ0FBQztJQUNoRCxJQUFJLENBQUNlLFNBQVMsQ0FBQ0csV0FBVyxHQUFHbEIsMERBQWEsQ0FBQyxLQUFLLENBQUM7SUFDakQsSUFBSSxDQUFDZSxTQUFTLENBQUNJLFFBQVEsR0FBR25CLDBEQUFhLENBQUMsS0FBSyxDQUFDO0lBQzlDLElBQUksQ0FBQ2UsU0FBUyxDQUFDSyxTQUFTLEdBQUdwQiwwREFBYSxDQUFDLEtBQUssQ0FBQztJQUMvQyxJQUFJLENBQUNlLFNBQVMsQ0FBQ00sVUFBVSxHQUFHckIsMERBQWEsQ0FBQyxLQUFLLENBQUM7SUFDaEQsSUFBSSxDQUFDZSxTQUFTLENBQUNPLHNCQUFzQixHQUFHLElBQUlsQixzRUFBc0IsQ0FBQztNQUMv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QUFTLENBQUNlLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYvQixvREFBYSxDQUFDbUcsS0FBSyxDQUFDLElBQUksRUFBRUMsU0FBUyxDQUFDO0lBQ3BDLE9BQU8sSUFBSTtFQUNmLENBQUM7RUFFREMsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQUEsRUFBYTtJQUNuQnBHLDZEQUFnQixDQUFDLElBQUksQ0FBQ2UsU0FBUyxDQUFDO0lBQ2hDLElBQUksQ0FBQ0EsU0FBUyxDQUFDaUUsZ0JBQWdCLENBQUMsQ0FBQztJQUVqQ25GLDZDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQ3lHLE9BQU8sQ0FBQyxDQUFDO0lBRXRDL0YsMERBQVMsQ0FBQ2dHLGtCQUFrQixDQUFDLENBQUM7RUFDbEM7QUFDSixDQUFDLENBQUM7QUFDRixpRUFBZS9GLFFBQVEsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL3BhZ2Utdmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCB2aWV3RGF0YSBmcm9tICd2aWV3LWRhdGEnO1xuaW1wb3J0IEFsZXJ0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvYWxlcnQnO1xuaW1wb3J0IFByb3Zpc2lvbmFsSGlzdG9yeUxpc3QgZnJvbSAndmlld3MvcHJvdmlzaW9uYWwtaGlzdG9yeS1saXN0JztcbmltcG9ydCBOb3RpZmljYXRpb25zTGlzdCBmcm9tICd2aWV3cy9ub3RpZmljYXRpb25zLWxpc3QnO1xuaW1wb3J0IGFyaWFVdGlscyBmcm9tICd1dGlscy9hcmlhJztcbmltcG9ydCBiYWNrVG9Ub3AgZnJvbSAndXRpbHMvYmFjay10by10b3AnO1xuaW1wb3J0ICdiaW5kaW5ncy9zY3JvbGxUbyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcCc7XG5pbXBvcnQgJ2JpbmRpbmdzL3NsaWRlJztcbmltcG9ydCAnanF1ZXJ5LXVpJztcblxuXG4vKipcbiogQSBiYWNrYm9uZSB2aWV3IHJlcHJlc2VudGluZyBhIGJhc2ljIHBhZ2UgaW4gYXJjaGVzLiAgSXQgc2V0cyB1cCB0aGVcbiogdmlld01vZGVsIGRlZmF1bHRzLCBvcHRpb25hbGx5IGFjY2VwdHMgYWRkaXRpb25hbCB2aWV3IG1vZGVsIGRhdGEgYW5kXG4qIGJpbmRzIHRoZSB2aWV3IG1vZGVsIHRvIHRoZSBlbnRpcmUgcGFnZS4gIFdoZW4gdXNpbmcsIG5vIG90aGVyIHZpZXdzXG4qIHNob3VsZCBiaW5kIGRhdGEgdG8gdGhlIERPTS5cbipcbiogQGF1Z21lbnRzIEJhY2tib25lLlZpZXdcbiogQGNvbnN0cnVjdG9yXG4qIEBuYW1lIFBhZ2VWaWV3XG4qL1xudmFyIFBhZ2VWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIGVsOiAkKCdib2R5JyksXG5cbiAgICAvKipcbiAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUGFnZVZpZXcsIG9wdGlvbmFsbHkgdXNpbmcgYSBwYXNzZWQgaW4gdmlld1xuICAgICogbW9kZWxcbiAgICAqXG4gICAgKiBAbWVtYmVyb2YgUGFnZVZpZXcucHJvdG90eXBlXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMudmlld01vZGVsIC0gYW4gb3B0aW9uYWwgdmlldyBtb2RlbCB0byBiZVxuICAgICogICAgICAgICAgICAgICAgIGJvdW5kIHRvIHRoZSBwYWdlXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IGFuIGluc3RhbmNlIG9mIFBhZ2VWaWV3XG4gICAgKi9cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMudmlld01vZGVsID0gKG9wdGlvbnMgJiYgb3B0aW9ucy52aWV3TW9kZWwpID8gb3B0aW9ucy52aWV3TW9kZWwgOiB7fTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwuaGVscGxvYWRlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5oZWxwbG9hZGluZyA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5oZWxwT3BlbiA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5lZGl0c09wZW4gPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwubm90aWZzT3BlbiA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5wcm92aXNpb25hbEhpc3RvcnlMaXN0ID0gbmV3IFByb3Zpc2lvbmFsSGlzdG9yeUxpc3Qoe1xuICAgICAgICAgICAgaXRlbXM6IGtvLm9ic2VydmFibGVBcnJheSgpLFxuICAgICAgICAgICAgaGVscGxvYWRpbmc6IHRoaXMudmlld01vZGVsLmhlbHBsb2FkaW5nXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5ub3RpZnNMaXN0ID0gbmV3IE5vdGlmaWNhdGlvbnNMaXN0KHtcbiAgICAgICAgICAgIGl0ZW1zOiBrby5vYnNlcnZhYmxlQXJyYXkoKSxcbiAgICAgICAgICAgIGhlbHBsb2FkaW5nOiB0aGlzLnZpZXdNb2RlbC5oZWxwbG9hZGluZ1xuICAgICAgICB9KTtcblxuICAgICAgICBfLmRlZmF1bHRzKHRoaXMudmlld01vZGVsLCB7XG4gICAgICAgICAgICBoZWxwVGVtcGxhdGU6IGtvLm9ic2VydmFibGUodmlld0RhdGEuaGVscCksXG4gICAgICAgICAgICBhbGVydDoga28ub2JzZXJ2YWJsZShudWxsKSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuICAgICAgICAgICAgc2hvd1RhYnM6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuICAgICAgICAgICAgdGFic0FjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSksXG4gICAgICAgICAgICBtZW51QWN0aXZlOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcbiAgICAgICAgICAgIHJlY2VudHNBY3RpdmU6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuICAgICAgICAgICAgdW5yZWFkTm90aWZzOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcbiAgICAgICAgICAgIGRpcnR5OiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcbiAgICAgICAgICAgIHNob3dDb25maXJtTmF2OiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcbiAgICAgICAgICAgIG5hdkRlc3RpbmF0aW9uOiBrby5vYnNlcnZhYmxlKCcnKSxcbiAgICAgICAgICAgIGhhbmRsZUVzY0tleTogYXJpYVV0aWxzLmhhbmRsZUVzY0tleSxcbiAgICAgICAgICAgIHNoaWZ0Rm9jdXM6IGFyaWFVdGlscy5zaGlmdEZvY3VzLFxuICAgICAgICAgICAgYmFja1RvVG9wSGFuZGxlcjogYmFja1RvVG9wLmJhY2tUb1RvcEhhbmRsZXIsXG4gICAgICAgICAgICB1cmxzOiBhcmNoZXMudXJscyxcbiAgICAgICAgICAgIG5hdmlnYXRlOiBmdW5jdGlvbih1cmwsIGJ5cGFzcykge1xuICAgICAgICAgICAgICAgIGlmICghYnlwYXNzICYmIHNlbGYudmlld01vZGVsLmRpcnR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwubmF2RGVzdGluYXRpb24odXJsKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwuYWxlcnQobmV3IEFsZXJ0Vmlld01vZGVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2VwLWFsZXJ0LWJsdWUnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyY2hlcy50cmFuc2xhdGlvbnMuY29uZmlybU5hdi50aXRsZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmNoZXMudHJhbnNsYXRpb25zLmNvbmZpcm1OYXYudGV4dCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZXdNb2RlbC5zaG93Q29uZmlybU5hdihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZXdNb2RlbC5uYXZpZ2F0ZShzZWxmLnZpZXdNb2RlbC5uYXZEZXN0aW5hdGlvbigpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwuYWxlcnQobnVsbCk7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwubG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHVybCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SGVscDogZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZpZXdNb2RlbC5oZWxwbG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAkKCcuZXAtaGVscC1jb250ZW50JykuYXBwZW5kKGVsKTtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLmhlbHBfdGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsndGVtcGxhdGUnOiB0ZW1wbGF0ZX1cbiAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgJChlbCkuaHRtbChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwuaGVscGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAkKGVsKS5maW5kKCcuZXAtaGVscC10b3BpYy10b2dnbGUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWN0aW9uRWwgPSAkKHRoaXMpLmNsb3Nlc3QoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGljb25FbCA9ICQodGhpcykuZmluZCgnaScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGljb25FbC5oYXNDbGFzcyhcImZhLWNoZXZyb24tcmlnaHRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uRWwucmVtb3ZlQ2xhc3MoXCJmYS1jaGV2cm9uLXJpZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25FbC5hZGRDbGFzcyhcImZhLWNoZXZyb24tZG93blwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkVsLnJlbW92ZUNsYXNzKFwiZmEtY2hldnJvbi1kb3duXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25FbC5hZGRDbGFzcyhcImZhLWNoZXZyb24tcmlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudEVsID0gJChzZWN0aW9uRWwpLmZpbmQoJy5lcC1oZWxwLXRvcGljLWNvbnRlbnQnKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRFeHBhbmRlZCA9IGNvbnRlbnRFbC5jc3MoJ2Rpc3BsYXknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50RXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudEV4cGFuZGVkID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnRFeHBhbmRlZCA9PT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50RWwuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICQoZWwpLmZpbmQoJy5yZWxvYWRhYmxlLWltZycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3NyYycsICQodGhpcykuYXR0cignc3JjJykpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRQcm92aXNpb25hbEhpc3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld01vZGVsLnByb3Zpc2lvbmFsSGlzdG9yeUxpc3QudXBkYXRlTGlzdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldE5vdGlmaWNhdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld01vZGVsLm5vdGlmc0xpc3QudXBkYXRlTGlzdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW5Ob3RpZnM6IGZ1bmN0aW9uKG9wZW5CdXR0b24sIGVzY0xpc3RlblNjb3BlLCBjbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld01vZGVsLmdldE5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICBzZWxmLnZpZXdNb2RlbC5ub3RpZnNPcGVuKCEoc2VsZi52aWV3TW9kZWwubm90aWZzT3BlbigpKSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7c2VsZi52aWV3TW9kZWwuaGFuZGxlRXNjS2V5KG9wZW5CdXR0b24sIGVzY0xpc3RlblNjb3BlLCBjbG9zZUJ1dHRvbil9LCA1MDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW5FZGl0czogZnVuY3Rpb24ob3BlbkJ1dHRvbiwgZXNjTGlzdGVuU2NvcGUsIGNsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwuZ2V0UHJvdmlzaW9uYWxIaXN0b3J5KCk7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwuZWRpdHNPcGVuKCEoc2VsZi52aWV3TW9kZWwuZWRpdHNPcGVuKCkpKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtzZWxmLnZpZXdNb2RlbC5oYW5kbGVFc2NLZXkob3BlbkJ1dHRvbiwgZXNjTGlzdGVuU2NvcGUsIGNsb3NlQnV0dG9uKX0sIDUwMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbkhlbHA6IGZ1bmN0aW9uKGhlbHBUZW1wbGF0ZXMsIG9wZW5CdXR0b24sIGVzY0xpc3RlblNjb3BlLCBjbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgIGhlbHBUZW1wbGF0ZXMuZm9yRWFjaCh0ZW1wbGF0ZSA9PiBzZWxmLnZpZXdNb2RlbC5nZXRIZWxwKHRlbXBsYXRlKSk7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwuaGVscE9wZW4oIShzZWxmLnZpZXdNb2RlbC5oZWxwT3BlbigpKSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7c2VsZi52aWV3TW9kZWwuaGFuZGxlRXNjS2V5KG9wZW5CdXR0b24sIGVzY0xpc3RlblNjb3BlLCBjbG9zZUJ1dHRvbil9LCA1MDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlTm90aWZzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZpZXdNb2RlbC5nZXROb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwubm90aWZzT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3TW9kZWwuc2hpZnRGb2N1cygnI2VwLW5vdGlmcy1idXR0b24nKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZUVkaXRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZpZXdNb2RlbC5lZGl0c09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYudmlld01vZGVsLnNoaWZ0Rm9jdXMoJyNlcC1lZGl0cy1idXR0b24nKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZUhlbHA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBlbCA9ICQoJy5lcC1oZWxwLWNvbnRlbnQnKTtcbiAgICAgICAgICAgICAgICBlbC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHNlbGYudmlld01vZGVsLmhlbHBPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZWxmLnZpZXdNb2RlbC5zaGlmdEZvY3VzKCcjZXAtaGVscC1idXR0b24nKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLnZpZXdNb2RlbC5ub3RpZnNMaXN0Lml0ZW1zLnN1YnNjcmliZShmdW5jdGlvbihsaXN0KSB7XG4gICAgICAgICAgICBzZWxmLnZpZXdNb2RlbC51bnJlYWROb3RpZnMoKGxpc3QubGVuZ3RoID4gMCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLnZpZXdNb2RlbC50cmFuc2xhdGlvbnMgPSBhcmNoZXMudHJhbnNsYXRpb25zO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYudmlld01vZGVsLmxvYWRpbmcodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEJhY2tib25lLlZpZXcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBrby5hcHBseUJpbmRpbmdzKHRoaXMudmlld01vZGVsKTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwuZ2V0Tm90aWZpY2F0aW9ucygpO1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cbiAgICAgICAgYmFja1RvVG9wLnNjcm9sbFRvVG9wSGFuZGxlcigpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgUGFnZVZpZXc7XG4iXSwibmFtZXMiOlsiJCIsIl8iLCJCYWNrYm9uZSIsImtvIiwiYXJjaGVzIiwidmlld0RhdGEiLCJBbGVydFZpZXdNb2RlbCIsIlByb3Zpc2lvbmFsSGlzdG9yeUxpc3QiLCJOb3RpZmljYXRpb25zTGlzdCIsImFyaWFVdGlscyIsImJhY2tUb1RvcCIsIlBhZ2VWaWV3IiwiVmlldyIsImV4dGVuZCIsImVsIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwic2VsZiIsInZpZXdNb2RlbCIsImhlbHBsb2FkZWQiLCJvYnNlcnZhYmxlIiwiaGVscGxvYWRpbmciLCJoZWxwT3BlbiIsImVkaXRzT3BlbiIsIm5vdGlmc09wZW4iLCJwcm92aXNpb25hbEhpc3RvcnlMaXN0IiwiaXRlbXMiLCJvYnNlcnZhYmxlQXJyYXkiLCJub3RpZnNMaXN0IiwiZGVmYXVsdHMiLCJoZWxwVGVtcGxhdGUiLCJoZWxwIiwiYWxlcnQiLCJsb2FkaW5nIiwic2hvd1RhYnMiLCJ0YWJzQWN0aXZlIiwibWVudUFjdGl2ZSIsInJlY2VudHNBY3RpdmUiLCJ1bnJlYWROb3RpZnMiLCJkaXJ0eSIsInNob3dDb25maXJtTmF2IiwibmF2RGVzdGluYXRpb24iLCJoYW5kbGVFc2NLZXkiLCJzaGlmdEZvY3VzIiwiYmFja1RvVG9wSGFuZGxlciIsInVybHMiLCJuYXZpZ2F0ZSIsInVybCIsImJ5cGFzcyIsInRyYW5zbGF0aW9ucyIsImNvbmZpcm1OYXYiLCJ0aXRsZSIsInRleHQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImFzc2lnbiIsImdldEhlbHAiLCJ0ZW1wbGF0ZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZCIsImFqYXgiLCJ0eXBlIiwiaGVscF90ZW1wbGF0ZSIsImRhdGEiLCJkb25lIiwiaHRtbCIsImZpbmQiLCJjbGljayIsInNlY3Rpb25FbCIsImNsb3Nlc3QiLCJpY29uRWwiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjb250ZW50RWwiLCJmaXJzdCIsImNvbnRlbnRFeHBhbmRlZCIsImNzcyIsImF0dHIiLCJzbGlkZVRvZ2dsZSIsImdldFByb3Zpc2lvbmFsSGlzdG9yeSIsInVwZGF0ZUxpc3QiLCJnZXROb3RpZmljYXRpb25zIiwib3Blbk5vdGlmcyIsIm9wZW5CdXR0b24iLCJlc2NMaXN0ZW5TY29wZSIsImNsb3NlQnV0dG9uIiwic2V0VGltZW91dCIsIm9wZW5FZGl0cyIsIm9wZW5IZWxwIiwiaGVscFRlbXBsYXRlcyIsImZvckVhY2giLCJjbG9zZU5vdGlmcyIsImNsb3NlRWRpdHMiLCJjbG9zZUhlbHAiLCJlbXB0eSIsInN1YnNjcmliZSIsImxpc3QiLCJsZW5ndGgiLCJhZGRFdmVudExpc3RlbmVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJpbml0aWFsaXplIiwiYXBwbHlCaW5kaW5ncyIsInRvb2x0aXAiLCJzY3JvbGxUb1RvcEhhbmRsZXIiXSwic291cmNlUm9vdCI6IiJ9