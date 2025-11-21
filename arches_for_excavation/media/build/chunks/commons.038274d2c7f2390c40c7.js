"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[32220],{

/***/ 32220:
/*!****************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/graph-manager/branch-list.js ***!
  \****************************************************************************************************************/
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
/* harmony import */ var views_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/list */ 38777);
/* harmony import */ var models_graph__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! models/graph */ 6303);





var BranchList = views_list__WEBPACK_IMPORTED_MODULE_3__["default"].extend({
  /**
  * A backbone view to manage a list of branch graphs
  * @augments ListView
  * @constructor
  * @name BranchList
  */

  /**
  * initializes the view with optional parameters
  * @memberof BranchList.prototype
  * @param {object} options
  * @param {boolean} options.graphModel - a reference to the selected {@link GraphModel}
  * @param {boolean} options.branches - an observableArray of branches
  */
  initialize: function initialize(options) {
    var self = this;
    views_list__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.initialize.apply(this, arguments);
    this.loading = options.loading || knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
    this.disableAppendButton = options.disableAppendButton || knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
    this.graphModel = options.graphModel;
    this.selectedNode = this.graphModel.get('selectedNode');
    options.branches.forEach(function (branch) {
      branch.selected = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
      branch.filtered = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
      branch.graphModel = new models_graph__WEBPACK_IMPORTED_MODULE_4__["default"]({
        data: branch,
        selectRoot: false
      });
      this.items.push(branch);
    }, this);
    this.loadingBranchDomains = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
    this.filtered_items = knockout__WEBPACK_IMPORTED_MODULE_2___default().pureComputed(function () {
      var filtered_items = underscore__WEBPACK_IMPORTED_MODULE_1___default().filter(this.items(), function (item) {
        return !item.filtered() && !item.source_identifier_id;
      }, this);
      filtered_items.sort(function (a, b) {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      });
      return filtered_items;
    }, this);

    // update the list of items in the branch list 
    // when any of these properties change
    var valueListener = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
      var node = self.selectedNode;
      if (!!node()) {
        var oc = node().ontologyclass();
        var datatype = node().datatype();
        var collector = node().isCollector();
        return oc + datatype + collector;
      }
      return false;
    }, this).extend({
      deferred: true
    });
    valueListener.subscribe(function () {
      this.loadDomainConnections();
    }, this);
  },
  /**
  * Downloads domain connection data for each branch (usually an expensive operation)
  * @memberof BranchList.prototype
  */
  loadDomainConnections: function loadDomainConnections() {
    var self = this;
    var domainConnections = [];
    this.loadingBranchDomains(true);
    this.items().forEach(function (branch, i) {
      domainConnections.push(branch.graphModel.loadDomainConnections());
    }, this);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().when.apply((jquery__WEBPACK_IMPORTED_MODULE_0___default()), domainConnections).then(function () {
      self.loadingBranchDomains(false);
      self.filterFunction();
    });
  },
  /**
  * Callback function called every time a user types into the filter input box
  * @memberof ListView.prototype
  */
  filterFunction: function filterFunction() {
    var filter = this.filter().toLowerCase();
    this.items().forEach(function (item) {
      var name = typeof item.name === 'string' ? item.name : item.name();
      if (!item.filtered) {
        item.filtered = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
      }
      item.filtered(true);
      if (name.toLowerCase().indexOf(filter) !== -1 && this.graphModel.canAppend(item.graphModel)) {
        item.filtered(false);
      }
    }, this);
  },
  /**
  * Appends the currently selected branch onto the currently selected node in the graph
  * @memberof BranchList.prototype
  * @param {object} item - the branch object the user selected
  * @param {object} evt - click event object
  */
  appendBranch: function appendBranch(item, evt) {
    var self = this;
    if (this.selectedNode()) {
      this.loading(true);
      this.graphModel.appendBranch(this.selectedNode(), null, item.graphModel, function (response, status) {
        // this.loading(false); // TODO: @cbyrd 8842 disable page refresh on branch append
        underscore__WEBPACK_IMPORTED_MODULE_1___default().delay(underscore__WEBPACK_IMPORTED_MODULE_1___default().bind(function () {
          if (status === 'success') {
            document.dispatchEvent(new Event('appendBranch'));
            window.location.reload(); // TODO: @cbyrd 8842 disable page refresh on branch append
            this.closeForm();
          }
        }, this), 300, true);
      }, this);
    }
  },
  /**
  * Closes the form and deselects the currently selected branch
  * @memberof BranchList.prototype
  */
  closeForm: function closeForm() {
    this.clearSelection();
    this.trigger('close');
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BranchList);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMDM4Mjc0ZDJjN2YyMzkwYzQwYzcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0k7QUFDRDtBQUNRO0FBQ0k7QUFHdEMsSUFBSUssVUFBVSxHQUFHRixrREFBUSxDQUFDRyxNQUFNLENBQUM7RUFDN0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lDLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFXQyxPQUFPLEVBQUU7SUFDMUIsSUFBSUMsSUFBSSxHQUFHLElBQUk7SUFDZk4sa0RBQVEsQ0FBQ08sU0FBUyxDQUFDSCxVQUFVLENBQUNJLEtBQUssQ0FBQyxJQUFJLEVBQUVDLFNBQVMsQ0FBQztJQUVwRCxJQUFJLENBQUNDLE9BQU8sR0FBR0wsT0FBTyxDQUFDSyxPQUFPLElBQUlYLDBEQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3RELElBQUksQ0FBQ2EsbUJBQW1CLEdBQUdQLE9BQU8sQ0FBQ08sbUJBQW1CLElBQUliLDBEQUFhLENBQUMsS0FBSyxDQUFDO0lBQzlFLElBQUksQ0FBQ2MsVUFBVSxHQUFHUixPQUFPLENBQUNRLFVBQVU7SUFDcEMsSUFBSSxDQUFDQyxZQUFZLEdBQUcsSUFBSSxDQUFDRCxVQUFVLENBQUNFLEdBQUcsQ0FBQyxjQUFjLENBQUM7SUFDdkRWLE9BQU8sQ0FBQ1csUUFBUSxDQUFDQyxPQUFPLENBQUMsVUFBU0MsTUFBTSxFQUFFO01BQ3RDQSxNQUFNLENBQUNDLFFBQVEsR0FBR3BCLDBEQUFhLENBQUMsS0FBSyxDQUFDO01BQ3RDbUIsTUFBTSxDQUFDRSxRQUFRLEdBQUdyQiwwREFBYSxDQUFDLEtBQUssQ0FBQztNQUN0Q21CLE1BQU0sQ0FBQ0wsVUFBVSxHQUFHLElBQUlaLG9EQUFVLENBQUM7UUFDL0JvQixJQUFJLEVBQUVILE1BQU07UUFDWkksVUFBVSxFQUFFO01BQ2hCLENBQUMsQ0FBQztNQUNGLElB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QUNwQkcsUUFBUSxDQUFDQyxhQUFhLENBQ2xCLElBQUlDLEtBQUssQ0FBQyxjQUFjLENBQzVCLENBQUM7WUFDREMsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBRTtZQUMzQixJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO1VBQ3BCO1FBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7TUFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNaO0VBQ0osQ0FBQztFQUVEO0FBQ0o7QUFDQTtBQUNBO0VBQ0lBLFNBQVMsRUFBRSxTQUFYQSxTQUFTQSxDQUFBLEVBQVk7SUFDakIsSUFBSSxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUNDLE9BQU8sQ0FBQyxPQUFPLENBQUM7RUFDekI7QUFHSixDQUFDLENBQUM7QUFDRixpRUFBZWxFLFVBQVUsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2dyYXBoL2dyYXBoLW1hbmFnZXIvYnJhbmNoLWxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBMaXN0VmlldyBmcm9tICd2aWV3cy9saXN0JztcbmltcG9ydCBHcmFwaE1vZGVsIGZyb20gJ21vZGVscy9ncmFwaCc7XG5cblxudmFyIEJyYW5jaExpc3QgPSBMaXN0Vmlldy5leHRlbmQoe1xuICAgIC8qKlxuICAgICogQSBiYWNrYm9uZSB2aWV3IHRvIG1hbmFnZSBhIGxpc3Qgb2YgYnJhbmNoIGdyYXBoc1xuICAgICogQGF1Z21lbnRzIExpc3RWaWV3XG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqIEBuYW1lIEJyYW5jaExpc3RcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBpbml0aWFsaXplcyB0aGUgdmlldyB3aXRoIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAqIEBtZW1iZXJvZiBCcmFuY2hMaXN0LnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5ncmFwaE1vZGVsIC0gYSByZWZlcmVuY2UgdG8gdGhlIHNlbGVjdGVkIHtAbGluayBHcmFwaE1vZGVsfVxuICAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmJyYW5jaGVzIC0gYW4gb2JzZXJ2YWJsZUFycmF5IG9mIGJyYW5jaGVzXG4gICAgKi9cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgTGlzdFZpZXcucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBvcHRpb25zLmxvYWRpbmcgfHwga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgIHRoaXMuZGlzYWJsZUFwcGVuZEJ1dHRvbiA9IG9wdGlvbnMuZGlzYWJsZUFwcGVuZEJ1dHRvbiB8fCBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5ncmFwaE1vZGVsID0gb3B0aW9ucy5ncmFwaE1vZGVsO1xuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZSA9IHRoaXMuZ3JhcGhNb2RlbC5nZXQoJ3NlbGVjdGVkTm9kZScpO1xuICAgICAgICBvcHRpb25zLmJyYW5jaGVzLmZvckVhY2goZnVuY3Rpb24oYnJhbmNoKSB7XG4gICAgICAgICAgICBicmFuY2guc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIGJyYW5jaC5maWx0ZXJlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICAgICAgYnJhbmNoLmdyYXBoTW9kZWwgPSBuZXcgR3JhcGhNb2RlbCh7XG4gICAgICAgICAgICAgICAgZGF0YTogYnJhbmNoLFxuICAgICAgICAgICAgICAgIHNlbGVjdFJvb3Q6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChicmFuY2gpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nQnJhbmNoRG9tYWlucyA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyZWRfaXRlbXMgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRfaXRlbXMgPSBfLmZpbHRlcih0aGlzLml0ZW1zKCksIGZ1bmN0aW9uKGl0ZW0peyBcbiAgICAgICAgICAgICAgICByZXR1cm4gIWl0ZW0uZmlsdGVyZWQoKSAmJiAhaXRlbS5zb3VyY2VfaWRlbnRpZmllcl9pZDsgXG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIGZpbHRlcmVkX2l0ZW1zLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEubmFtZS50b0xvd2VyQ2FzZSgpID4gYi5uYW1lLnRvTG93ZXJDYXNlKCkgPyAxIDogLTE7fSk7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRfaXRlbXM7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGlzdCBvZiBpdGVtcyBpbiB0aGUgYnJhbmNoIGxpc3QgXG4gICAgICAgIC8vIHdoZW4gYW55IG9mIHRoZXNlIHByb3BlcnRpZXMgY2hhbmdlXG4gICAgICAgIHZhciB2YWx1ZUxpc3RlbmVyID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHNlbGYuc2VsZWN0ZWROb2RlO1xuICAgICAgICAgICAgaWYoISFub2RlKCkpe1xuICAgICAgICAgICAgICAgIHZhciBvYyA9IG5vZGUoKS5vbnRvbG9neWNsYXNzKCk7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGF0eXBlID0gbm9kZSgpLmRhdGF0eXBlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGNvbGxlY3RvciA9IG5vZGUoKS5pc0NvbGxlY3RvcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYyArIGRhdGF0eXBlICsgY29sbGVjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LCB0aGlzKS5leHRlbmQoeyBkZWZlcnJlZDogdHJ1ZSB9KTtcblxuICAgICAgICB2YWx1ZUxpc3RlbmVyLnN1YnNjcmliZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5sb2FkRG9tYWluQ29ubmVjdGlvbnMoKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBEb3dubG9hZHMgZG9tYWluIGNvbm5lY3Rpb24gZGF0YSBmb3IgZWFjaCBicmFuY2ggKHVzdWFsbHkgYW4gZXhwZW5zaXZlIG9wZXJhdGlvbilcbiAgICAqIEBtZW1iZXJvZiBCcmFuY2hMaXN0LnByb3RvdHlwZVxuICAgICovXG4gICAgbG9hZERvbWFpbkNvbm5lY3Rpb25zOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBkb21haW5Db25uZWN0aW9ucyA9IFtdO1xuXG4gICAgICAgIHRoaXMubG9hZGluZ0JyYW5jaERvbWFpbnModHJ1ZSk7XG4gICAgICAgIHRoaXMuaXRlbXMoKS5mb3JFYWNoKGZ1bmN0aW9uKGJyYW5jaCwgaSl7XG4gICAgICAgICAgICBkb21haW5Db25uZWN0aW9ucy5wdXNoKGJyYW5jaC5ncmFwaE1vZGVsLmxvYWREb21haW5Db25uZWN0aW9ucygpKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgJC53aGVuKC4uLmRvbWFpbkNvbm5lY3Rpb25zKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRpbmdCcmFuY2hEb21haW5zKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmZpbHRlckZ1bmN0aW9uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIENhbGxiYWNrIGZ1bmN0aW9uIGNhbGxlZCBldmVyeSB0aW1lIGEgdXNlciB0eXBlcyBpbnRvIHRoZSBmaWx0ZXIgaW5wdXQgYm94XG4gICAgKiBAbWVtYmVyb2YgTGlzdFZpZXcucHJvdG90eXBlXG4gICAgKi9cbiAgICBmaWx0ZXJGdW5jdGlvbjogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGZpbHRlciA9IHRoaXMuZmlsdGVyKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5pdGVtcygpLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IHR5cGVvZiBpdGVtLm5hbWUgPT09ICdzdHJpbmcnID8gaXRlbS5uYW1lIDogaXRlbS5uYW1lKCk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uZmlsdGVyZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmZpbHRlcmVkID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbS5maWx0ZXJlZCh0cnVlKTtcbiAgICAgICAgICAgIGlmKG5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgIT09IC0xICYmIHRoaXMuZ3JhcGhNb2RlbC5jYW5BcHBlbmQoaXRlbS5ncmFwaE1vZGVsKSl7XG4gICAgICAgICAgICAgICAgaXRlbS5maWx0ZXJlZChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICogQXBwZW5kcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGJyYW5jaCBvbnRvIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgbm9kZSBpbiB0aGUgZ3JhcGhcbiAgICAqIEBtZW1iZXJvZiBCcmFuY2hMaXN0LnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IGl0ZW0gLSB0aGUgYnJhbmNoIG9iamVjdCB0aGUgdXNlciBzZWxlY3RlZFxuICAgICogQHBhcmFtIHtvYmplY3R9IGV2dCAtIGNsaWNrIGV2ZW50IG9iamVjdFxuICAgICovXG4gICAgYXBwZW5kQnJhbmNoOiBmdW5jdGlvbihpdGVtLCBldnQpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWROb2RlKCkpe1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5ncmFwaE1vZGVsLmFwcGVuZEJyYW5jaCh0aGlzLnNlbGVjdGVkTm9kZSgpLCBudWxsLCBpdGVtLmdyYXBoTW9kZWwsIGZ1bmN0aW9uKHJlc3BvbnNlLCBzdGF0dXMpe1xuICAgICAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyhmYWxzZSk7IC8vIFRPRE86IEBjYnlyZCA4ODQyIGRpc2FibGUgcGFnZSByZWZyZXNoIG9uIGJyYW5jaCBhcHBlbmRcbiAgICAgICAgICAgICAgICBfLmRlbGF5KF8uYmluZChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZihzdGF0dXMgPT09ICdzdWNjZXNzJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBFdmVudCgnYXBwZW5kQnJhbmNoJylcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7ICAvLyBUT0RPOiBAY2J5cmQgODg0MiBkaXNhYmxlIHBhZ2UgcmVmcmVzaCBvbiBicmFuY2ggYXBwZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgdGhpcyksIDMwMCwgdHJ1ZSk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIENsb3NlcyB0aGUgZm9ybSBhbmQgZGVzZWxlY3RzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgYnJhbmNoXG4gICAgKiBAbWVtYmVyb2YgQnJhbmNoTGlzdC5wcm90b3R5cGVcbiAgICAqL1xuICAgIGNsb3NlRm9ybTogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2Nsb3NlJyk7XG4gICAgfSxcblxuXG59KTtcbmV4cG9ydCBkZWZhdWx0IEJyYW5jaExpc3Q7XG4iXSwibmFtZXMiOlsiJCIsIl8iLCJrbyIsIkxpc3RWaWV3IiwiR3JhcGhNb2RlbCIsIkJyYW5jaExpc3QiLCJleHRlbmQiLCJpbml0aWFsaXplIiwib3B0aW9ucyIsInNlbGYiLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsImxvYWRpbmciLCJvYnNlcnZhYmxlIiwiZGlzYWJsZUFwcGVuZEJ1dHRvbiIsImdyYXBoTW9kZWwiLCJzZWxlY3RlZE5vZGUiLCJnZXQiLCJicmFuY2hlcyIsImZvckVhY2giLCJicmFuY2giLCJzZWxlY3RlZCIsImZpbHRlcmVkIiwiZGF0YSIsInNlbGVjdFJvb3QiLCJpdGVtcyIsInB1c2giLCJsb2FkaW5nQnJhbmNoRG9tYWlucyIsImZpbHRlcmVkX2l0ZW1zIiwicHVyZUNvbXB1dGVkIiwiZmlsdGVyIiwiaXRlbSIsInNvdXJjZV9pZGVudGlmaWVyX2lkIiwic29ydCIsImEiLCJiIiwibmFtZSIsInRvTG93ZXJDYXNlIiwidmFsdWVMaXN0ZW5lciIsImNvbXB1dGVkIiwibm9kZSIsIm9jIiwib250b2xvZ3ljbGFzcyIsImRhdGF0eXBlIiwiY29sbGVjdG9yIiwiaXNDb2xsZWN0b3IiLCJkZWZlcnJlZCIsInN1YnNjcmliZSIsImxvYWREb21haW5Db25uZWN0aW9ucyIsImRvbWFpbkNvbm5lY3Rpb25zIiwiaSIsIndoZW4iLCJ0aGVuIiwiZmlsdGVyRnVuY3Rpb24iLCJpbmRleE9mIiwiY2FuQXBwZW5kIiwiYXBwZW5kQnJhbmNoIiwiZXZ0IiwicmVzcG9uc2UiLCJzdGF0dXMiLCJkZWxheSIsImJpbmQiLCJkb2N1bWVudCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY2xvc2VGb3JtIiwiY2xlYXJTZWxlY3Rpb24iLCJ0cmlnZ2VyIl0sInNvdXJjZVJvb3QiOiIifQ==