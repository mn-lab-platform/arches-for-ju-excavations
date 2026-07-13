"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[18646],{

/***/ 18646:
/*!*********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/base-manager.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var views_page_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/page-view */ 61694);
/* harmony import */ var view_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! view-data */ 22212);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ 84806);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var dom_4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dom-4 */ 12924);
/* harmony import */ var dom_4__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dom_4__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var views_components_language_switcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! views/components/language-switcher */ 45726);








var BaseManager = views_page_view__WEBPACK_IMPORTED_MODULE_3__["default"].extend({
  /**
  * Creates an instance of PageView, optionally using a passed in view model
  * appends the following properties to viewModel:
  * allGraphs - an array of graphs models as JSON (not model instances)
  *
  * @memberof PageView.prototype
  * @param {object} options
  * @param {object} options.viewModel - an optional view model to be
  *                 bound to the page
  * @return {object} an instance of BaseManager
  */
  constructor: function constructor(options) {
    options = options ? options : {};
    options.viewModel = options && options.viewModel ? options.viewModel : {};
    view_data__WEBPACK_IMPORTED_MODULE_4__["default"].graphs.sort(function (left, right) {
      return left.name.toLowerCase() == right.name.toLowerCase() ? 0 : left.name.toLowerCase() < right.name.toLowerCase() ? -1 : 1;
    });
    view_data__WEBPACK_IMPORTED_MODULE_4__["default"].graphs.forEach(function (graph) {
      graph.name = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(graph.name);
      graph.iconclass = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(graph.iconclass);
    });
    options.viewModel.allGraphs = knockout__WEBPACK_IMPORTED_MODULE_2___default().observableArray(view_data__WEBPACK_IMPORTED_MODULE_4__["default"].graphs);
    options.viewModel.graphs = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
      return knockout__WEBPACK_IMPORTED_MODULE_2___default().utils.arrayFilter(options.viewModel.allGraphs(), function (graph) {
        return !graph.isresource;
      });
    });
    options.viewModel.resources = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
      return knockout__WEBPACK_IMPORTED_MODULE_2___default().utils.arrayFilter(options.viewModel.allGraphs(), function (graph) {
        return graph.isresource && !graph.source_identifier_id;
      });
    });
    options.viewModel.createableResources = knockout__WEBPACK_IMPORTED_MODULE_2___default().observableArray(view_data__WEBPACK_IMPORTED_MODULE_4__["default"].createableResources.filter(function (currentGraph) {
      return currentGraph.source_identifier_id === null;
    }));
    options.viewModel.userCanReadResources = view_data__WEBPACK_IMPORTED_MODULE_4__["default"].userCanReadResources;
    options.viewModel.userCanEditResources = view_data__WEBPACK_IMPORTED_MODULE_4__["default"].userCanEditResources;
    options.viewModel.setResourceOptionDisable = function (option, item) {
      if (item) {
        knockout__WEBPACK_IMPORTED_MODULE_2___default().applyBindingsToNode(option, {
          disable: item.disable_instance_creation
        }, item);
      }
    };
    options.viewModel.navExpanded = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
    options.viewModel.inSearch = knockout__WEBPACK_IMPORTED_MODULE_2___default().pureComputed(function () {
      return window.location.pathname === "/search" || window.location.pathname === "/plugins/c8261a41-a409-4e45-b049-c925c28a57da";
    });
    var getHiddenOffsetWidth = function getHiddenOffsetWidth(hiddenElement) {
      var width = 0;
      hiddenElement.style.display = "block";
      hiddenElement.style.position = "absolute";
      width = hiddenElement.offsetWidth;
      hiddenElement.removeAttribute('style');
      return width;
    };

    // this is used to manage the popover menu for the unexpanded side nav 
    var listeles = document.querySelectorAll('div.sidenav-menu > ul > li');
    listeles.forEach(function (listele) {
      var menutitle = listele.querySelector('.menu-title');
      if (menutitle) {
        var width = getHiddenOffsetWidth(menutitle);
        var ulele = listele.querySelector('ul');
        if (ulele) {
          ulele.style.minWidth = width + 40 + "px";
        }
      }
    });

    // this is to prevent an infinite spinner when the page is reloaded via back/forward page navigation
    window.addEventListener('pageshow', function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    });
    views_page_view__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.constructor.call(this, options);
    return this;
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseManager);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUdDLEtBQUssRUFBQztVQUNMQSxLQUFLLENBQUNYLEtBQUssQ0FBQ1ksUUFBUSxHQUFJYixLQUFLLEdBQUcsRUFBRSxHQUFJLElBQUk7UUFDOUM7TUFDSjtJQUNKLENBQUMsQ0FBQzs7SUFFRjtJQUNBTCxNQUFNLENBQUNtQixnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBVUMsS0FBSyxFQUFFO01BQ2pELElBQUlBLEtBQUssQ0FBQ0MsU0FBUyxFQUFFO1FBQ2pCckIsTUFBTSxDQUFDQyxRQUFRLENBQUNxQixNQUFNLENBQUMsQ0FBQztNQUM1QjtJQUNKLENBQUMsQ0FBQztJQUVGOUQsdURBQVEsQ0FBQytELFNBQVMsQ0FBQzFELFdBQVcsQ0FBQzJELElBQUksQ0FBQyxJQUFJLEVBQUUxRCxPQUFPLENBQUM7SUFDbEQsT0FBTyxJQUFJO0VBQ2Y7QUFDSixDQUFDLENBQUM7QUFFRixpRUFBZUgsV0FBVyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvYmFzZS1tYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgUGFnZVZpZXcgZnJvbSAndmlld3MvcGFnZS12aWV3JztcbmltcG9ydCBkYXRhIGZyb20gJ3ZpZXctZGF0YSc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCAnZG9tLTQnO1xuaW1wb3J0ICd2aWV3cy9jb21wb25lbnRzL2xhbmd1YWdlLXN3aXRjaGVyJztcblxuXG52YXIgQmFzZU1hbmFnZXIgPSBQYWdlVmlldy5leHRlbmQoe1xuICAgIC8qKlxuICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQYWdlVmlldywgb3B0aW9uYWxseSB1c2luZyBhIHBhc3NlZCBpbiB2aWV3IG1vZGVsXG4gICAgKiBhcHBlbmRzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyB0byB2aWV3TW9kZWw6XG4gICAgKiBhbGxHcmFwaHMgLSBhbiBhcnJheSBvZiBncmFwaHMgbW9kZWxzIGFzIEpTT04gKG5vdCBtb2RlbCBpbnN0YW5jZXMpXG4gICAgKlxuICAgICogQG1lbWJlcm9mIFBhZ2VWaWV3LnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnZpZXdNb2RlbCAtIGFuIG9wdGlvbmFsIHZpZXcgbW9kZWwgdG8gYmVcbiAgICAqICAgICAgICAgICAgICAgICBib3VuZCB0byB0aGUgcGFnZVxuICAgICogQHJldHVybiB7b2JqZWN0fSBhbiBpbnN0YW5jZSBvZiBCYXNlTWFuYWdlclxuICAgICovXG4gICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBvcHRpb25zIDoge307XG4gICAgICAgIG9wdGlvbnMudmlld01vZGVsID0gKG9wdGlvbnMgJiYgb3B0aW9ucy52aWV3TW9kZWwpID8gb3B0aW9ucy52aWV3TW9kZWwgOiB7fTtcblxuICAgICAgICBkYXRhLmdyYXBocy5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gbGVmdC5uYW1lLnRvTG93ZXJDYXNlKCkgPT0gcmlnaHQubmFtZS50b0xvd2VyQ2FzZSgpID8gMCA6IChsZWZ0Lm5hbWUudG9Mb3dlckNhc2UoKSA8IHJpZ2h0Lm5hbWUudG9Mb3dlckNhc2UoKSA/IC0xIDogMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkYXRhLmdyYXBocy5mb3JFYWNoKGZ1bmN0aW9uKGdyYXBoKXtcbiAgICAgICAgICAgIGdyYXBoLm5hbWUgPSBrby5vYnNlcnZhYmxlKGdyYXBoLm5hbWUpO1xuICAgICAgICAgICAgZ3JhcGguaWNvbmNsYXNzID0ga28ub2JzZXJ2YWJsZShncmFwaC5pY29uY2xhc3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgb3B0aW9ucy52aWV3TW9kZWwuYWxsR3JhcGhzID0ga28ub2JzZXJ2YWJsZUFycmF5KGRhdGEuZ3JhcGhzKTtcbiAgICAgICAgb3B0aW9ucy52aWV3TW9kZWwuZ3JhcGhzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ga28udXRpbHMuYXJyYXlGaWx0ZXIob3B0aW9ucy52aWV3TW9kZWwuYWxsR3JhcGhzKCksIGZ1bmN0aW9uKGdyYXBoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFncmFwaC5pc3Jlc291cmNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBvcHRpb25zLnZpZXdNb2RlbC5yZXNvdXJjZXMgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAga28udXRpbHMuYXJyYXlGaWx0ZXIob3B0aW9ucy52aWV3TW9kZWwuYWxsR3JhcGhzKCksIGZ1bmN0aW9uKGdyYXBoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyYXBoLmlzcmVzb3VyY2UgJiYgIWdyYXBoLnNvdXJjZV9pZGVudGlmaWVyX2lkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBvcHRpb25zLnZpZXdNb2RlbC5jcmVhdGVhYmxlUmVzb3VyY2VzID0ga28ub2JzZXJ2YWJsZUFycmF5KGRhdGEuY3JlYXRlYWJsZVJlc291cmNlcy5maWx0ZXIoY3VycmVudEdyYXBoID0+IGN1cnJlbnRHcmFwaC5zb3VyY2VfaWRlbnRpZmllcl9pZCA9PT0gbnVsbCkpOyBcbiAgICAgICAgb3B0aW9ucy52aWV3TW9kZWwudXNlckNhblJlYWRSZXNvdXJjZXMgPSBkYXRhLnVzZXJDYW5SZWFkUmVzb3VyY2VzO1xuICAgICAgICBvcHRpb25zLnZpZXdNb2RlbC51c2VyQ2FuRWRpdFJlc291cmNlcyA9IGRhdGEudXNlckNhbkVkaXRSZXNvdXJjZXM7XG5cbiAgICAgICAgb3B0aW9ucy52aWV3TW9kZWwuc2V0UmVzb3VyY2VPcHRpb25EaXNhYmxlID0gZnVuY3Rpb24ob3B0aW9uLCBpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGtvLmFwcGx5QmluZGluZ3NUb05vZGUob3B0aW9uLCB7ZGlzYWJsZTogaXRlbS5kaXNhYmxlX2luc3RhbmNlX2NyZWF0aW9ufSwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgb3B0aW9ucy52aWV3TW9kZWwubmF2RXhwYW5kZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgb3B0aW9ucy52aWV3TW9kZWwuaW5TZWFyY2ggPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9zZWFyY2hcIiB8fCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL3BsdWdpbnMvYzgyNjFhNDEtYTQwOS00ZTQ1LWIwNDktYzkyNWMyOGE1N2RhXCI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBnZXRIaWRkZW5PZmZzZXRXaWR0aCA9IGZ1bmN0aW9uKGhpZGRlbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IDA7XG4gICAgICAgICAgICBoaWRkZW5FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBoaWRkZW5FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgd2lkdGggPSBoaWRkZW5FbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgaGlkZGVuRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICByZXR1cm4gd2lkdGg7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdGhpcyBpcyB1c2VkIHRvIG1hbmFnZSB0aGUgcG9wb3ZlciBtZW51IGZvciB0aGUgdW5leHBhbmRlZCBzaWRlIG5hdiBcbiAgICAgICAgbGV0IGxpc3RlbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2LnNpZGVuYXYtbWVudSA+IHVsID4gbGknKTtcbiAgICAgICAgbGlzdGVsZXMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZWxlKXtcbiAgICAgICAgICAgIGxldCBtZW51dGl0bGUgPSBsaXN0ZWxlLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LXRpdGxlJyk7XG4gICAgICAgICAgICBpZihtZW51dGl0bGUpe1xuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IGdldEhpZGRlbk9mZnNldFdpZHRoKG1lbnV0aXRsZSk7XG4gICAgICAgICAgICAgICAgbGV0IHVsZWxlID0gbGlzdGVsZS5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgICAgICAgICAgICAgIGlmKHVsZWxlKXtcbiAgICAgICAgICAgICAgICAgICAgdWxlbGUuc3R5bGUubWluV2lkdGggPSAod2lkdGggKyA0MCkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzIGlzIHRvIHByZXZlbnQgYW4gaW5maW5pdGUgc3Bpbm5lciB3aGVuIHRoZSBwYWdlIGlzIHJlbG9hZGVkIHZpYSBiYWNrL2ZvcndhcmQgcGFnZSBuYXZpZ2F0aW9uXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnBlcnNpc3RlZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgUGFnZVZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlTWFuYWdlcjtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwiUGFnZVZpZXciLCJkYXRhIiwidXVpZCIsIkJhc2VNYW5hZ2VyIiwiZXh0ZW5kIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwidmlld01vZGVsIiwiZ3JhcGhzIiwic29ydCIsImxlZnQiLCJyaWdodCIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsImZvckVhY2giLCJncmFwaCIsIm9ic2VydmFibGUiLCJpY29uY2xhc3MiLCJhbGxHcmFwaHMiLCJvYnNlcnZhYmxlQXJyYXkiLCJjb21wdXRlZCIsInV0aWxzIiwiYXJyYXlGaWx0ZXIiLCJpc3Jlc291cmNlIiwicmVzb3VyY2VzIiwic291cmNlX2lkZW50aWZpZXJfaWQiLCJjcmVhdGVhYmxlUmVzb3VyY2VzIiwiZmlsdGVyIiwiY3VycmVudEdyYXBoIiwidXNlckNhblJlYWRSZXNvdXJjZXMiLCJ1c2VyQ2FuRWRpdFJlc291cmNlcyIsInNldFJlc291cmNlT3B0aW9uRGlzYWJsZSIsIm9wdGlvbiIsIml0ZW0iLCJhcHBseUJpbmRpbmdzVG9Ob2RlIiwiZGlzYWJsZSIsImRpc2FibGVfaW5zdGFuY2VfY3JlYXRpb24iLCJuYXZFeHBhbmRlZCIsImluU2VhcmNoIiwicHVyZUNvbXB1dGVkIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImdldEhpZGRlbk9mZnNldFdpZHRoIiwiaGlkZGVuRWxlbWVudCIsIndpZHRoIiwic3R5bGUiLCJkaXNwbGF5IiwicG9zaXRpb24iLCJvZmZzZXRXaWR0aCIsInJlbW92ZUF0dHJpYnV0ZSIsImxpc3RlbGVzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdGVsZSIsIm1lbnV0aXRsZSIsInF1ZXJ5U2VsZWN0b3IiLCJ1bGVsZSIsIm1pbldpZHRoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicGVyc2lzdGVkIiwicmVsb2FkIiwicHJvdG90eXBlIiwiY2FsbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9