"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[38777],{

/***/ 38777:
/*!*************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/list.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! backbone */ 77186);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_2__);



var ListView = backbone__WEBPACK_IMPORTED_MODULE_1___default().View.extend({
  /**
  * A base view to manage lists of things
  * @augments Backbone.View
  * @constructor
  * @name ListView
  */

  /**
  * the list of items being managed
  * @type {array}
  * @memberof ListView.prototype
  */
  items: knockout__WEBPACK_IMPORTED_MODULE_2___default().observableArray(),
  /**
  * if true then only allow 1 selected item at a time
  * @type {boolean}
  * @memberof ListView.prototype
  */
  singleSelect: true,
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
      if (name.toLowerCase().indexOf(filter) !== -1) {
        item.filtered(false);
      }
    }, this);
  },
  /**
  * initializes the view with optional parameters
  * @memberof ListView.prototype
  * @param {object} options - optional parameters to pass in during initialization
  */
  initialize: function initialize(options) {
    if (options.items) {
      this.items = options.items;
    }
    if (options.items) {
      this.groups = options.groups;
    }
    this.items.subscribe(function (items) {
      items.forEach(this._initializeItem, this);
    }, this);
    if (this.filterFunction) {
      this.filter = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable('');
      knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
        return this.filter();
      }, this).extend({
        throttle: 100
      }).subscribe(this.filterFunction, this, 'change');
      this.filterFunction();
    }
    this.selectedItems = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
      return this.items().filter(function (item) {
        this._initializeItem(item);
        return item.selected();
      }, this);
    }, this);
  },
  /**
  * Used internally to add observable parameters to list items
  * @memberof ListView.prototype
  * @param {object} item - a list item
  */
  _initializeItem: function _initializeItem(item) {
    if (!item.filtered) {
      item.filtered = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
    }
    if (!('selectable' in item)) {
      item.selectable = true;
    }
    if (!item.selected) {
      item.selected = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
    }
  },
  /**
  * Toggles the selected status of a single list item, if {@link ListView#singleSelect} is
  *   true clear the selected status of all other list items
  * @memberof ListView.prototype
  * @param {object} item - the item to be selected or unselected
  * @param {object} evt - click event object
  */
  selectItem: function selectItem(item, evt) {
    if (!!item.selectable) {
      var selectedStatus = item.selected();
      if (this.singleSelect) {
        this.clearSelection();
      }
      item.selected(!selectedStatus);
      this.trigger('item-clicked', item, evt);
    }
  },
  /**
  * Unselect all items in the list
  * @memberof ListView.prototype
  */
  clearSelection: function clearSelection() {
    this.items().forEach(function (item) {
      item.selected(false);
    }, this);
  },
  /**
  * Reset the search string to blank
  * @memberof ListView.prototype
  */
  clearSearch: function clearSearch() {
    this.filter('');
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListView);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuZDNiOWZlOGZmOGVjNDM5ZGU1YTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNTO0FBQ047QUFHMUIsSUFBSUcsUUFBUSxHQUFHRixvREFBYSxDQUFDSSxNQUFNLENBQUM7RUFDaEM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFDSUMsS0FBSyxFQUFFSiwrREFBa0IsQ0FBQyxDQUFDO0VBRTNCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFDSU0sWUFBWSxFQUFFLElBQUk7RUFFbEI7QUFDSjtBQUNBO0FBQ0E7RUFDSUMsY0FBYyxFQUFFLFNBQWhCQSxjQUFjQSxDQUFBLEVBQVk7SUFDdEIsSUFBSUMsTUFBTSxHQUFHLElBQUksQ0FBQ0EsTUFBTSxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDTCxLQUFLLENBQUMsQ0FBQyxDQUFDTSxPQUFPLENBQUMsVUFBU0MsSUFBSSxFQUFDO01BQy9CLElBQUlDLElBQUksR0FBRyxPQUFPRCxJQUFJLENBQUNDLElBQUksS0FBSyxRQUFRLEdBQUdELElBQUksQ0FBQ0MsSUFBSSxHQUFHRCxJQUFJLENBQUNDLElBQUksQ0FBQyxDQUFDO01BQ2xFLElBQUksQ0FBQ0QsSUFBSSxDQUFDRSxRQUFRLEVBQUU7UUFDaEJGLElBQUksQ0FBQ0UsUUFBUSxHQUFHYiwwREFBYSxDQUFDLENBQUM7TUFDbkM7TUFDQVcsSUFBSSxDQUFDRSxRQUFRLENBQUMsSUFBSSxDQUFDO01BQ25CLElBQUdELElBQUksQ0FBQ0gsV0FBVyxDQUFDLENBQUMsQ0FBQ00sT0FBTyxDQUFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQztRQUN6Q0csSUFBSSxDQUFDRSxRQUFRLENBQUMsS0FBSyxDQUFDO01BQ3hCO0lBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQztFQUNaLENBQUM7RUFFRDtBQUNKO0FBQ0E7QUFD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O0lBQ3hCLENBQUMsRUFBRSxJQUFJLENBQUM7RUFDWixDQUFDO0VBRUQ7QUFDSjtBQUNBO0FBQ0E7RUFDSU8sV0FBVyxFQUFFLFNBQWJBLFdBQVdBLENBQUEsRUFBWTtJQUNuQixJQUFJLENBQUN2QixNQUFNLENBQUMsRUFBRSxDQUFDO0VBQ25CO0FBQ0osQ0FBQyxDQUFDO0FBRUYsaUVBQWVQLFFBQVEsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2xpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuXG5cbnZhciBMaXN0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAqIEEgYmFzZSB2aWV3IHRvIG1hbmFnZSBsaXN0cyBvZiB0aGluZ3NcbiAgICAqIEBhdWdtZW50cyBCYWNrYm9uZS5WaWV3XG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqIEBuYW1lIExpc3RWaWV3XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogdGhlIGxpc3Qgb2YgaXRlbXMgYmVpbmcgbWFuYWdlZFxuICAgICogQHR5cGUge2FycmF5fVxuICAgICogQG1lbWJlcm9mIExpc3RWaWV3LnByb3RvdHlwZVxuICAgICovXG4gICAgaXRlbXM6IGtvLm9ic2VydmFibGVBcnJheSgpLFxuXG4gICAgLyoqXG4gICAgKiBpZiB0cnVlIHRoZW4gb25seSBhbGxvdyAxIHNlbGVjdGVkIGl0ZW0gYXQgYSB0aW1lXG4gICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAqIEBtZW1iZXJvZiBMaXN0Vmlldy5wcm90b3R5cGVcbiAgICAqL1xuICAgIHNpbmdsZVNlbGVjdDogdHJ1ZSxcblxuICAgIC8qKlxuICAgICogQ2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIGV2ZXJ5IHRpbWUgYSB1c2VyIHR5cGVzIGludG8gdGhlIGZpbHRlciBpbnB1dCBib3hcbiAgICAqIEBtZW1iZXJvZiBMaXN0Vmlldy5wcm90b3R5cGVcbiAgICAqL1xuICAgIGZpbHRlckZ1bmN0aW9uOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZmlsdGVyID0gdGhpcy5maWx0ZXIoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLml0ZW1zKCkuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIHZhciBuYW1lID0gdHlwZW9mIGl0ZW0ubmFtZSA9PT0gJ3N0cmluZycgPyBpdGVtLm5hbWUgOiBpdGVtLm5hbWUoKTtcbiAgICAgICAgICAgIGlmICghaXRlbS5maWx0ZXJlZCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLmZpbHRlcmVkKHRydWUpO1xuICAgICAgICAgICAgaWYobmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyKSAhPT0gLTEpe1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsdGVyZWQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBpbml0aWFsaXplcyB0aGUgdmlldyB3aXRoIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAqIEBtZW1iZXJvZiBMaXN0Vmlldy5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9uYWwgcGFyYW1ldGVycyB0byBwYXNzIGluIGR1cmluZyBpbml0aWFsaXphdGlvblxuICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5pdGVtcykge1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IG9wdGlvbnMuaXRlbXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzID0gb3B0aW9ucy5ncm91cHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtcy5zdWJzY3JpYmUoZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2godGhpcy5faW5pdGlhbGl6ZUl0ZW0sIHRoaXMpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgaWYodGhpcy5maWx0ZXJGdW5jdGlvbil7XG4gICAgICAgICAgICB0aGlzLmZpbHRlciA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgICAgICAgICAga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKCk7XG4gICAgICAgICAgICB9LCB0aGlzKS5leHRlbmQoe1xuICAgICAgICAgICAgICAgIHRocm90dGxlOiAxMDBcbiAgICAgICAgICAgIH0pLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgJ2NoYW5nZSdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlckZ1bmN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBrby5jb21wdXRlZChmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMoKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZUl0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc2VsZWN0ZWQoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBVc2VkIGludGVybmFsbHkgdG8gYWRkIG9ic2VydmFibGUgcGFyYW1ldGVycyB0byBsaXN0IGl0ZW1zXG4gICAgKiBAbWVtYmVyb2YgTGlzdFZpZXcucHJvdG90eXBlXG4gICAgKiBAcGFyYW0ge29iamVjdH0gaXRlbSAtIGEgbGlzdCBpdGVtXG4gICAgKi9cbiAgICBfaW5pdGlhbGl6ZUl0ZW06IGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICBpZiAoIWl0ZW0uZmlsdGVyZWQpIHtcbiAgICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISgnc2VsZWN0YWJsZScgaW4gaXRlbSkpe1xuICAgICAgICAgICAgaXRlbS5zZWxlY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWl0ZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIFRvZ2dsZXMgdGhlIHNlbGVjdGVkIHN0YXR1cyBvZiBhIHNpbmdsZSBsaXN0IGl0ZW0sIGlmIHtAbGluayBMaXN0VmlldyNzaW5nbGVTZWxlY3R9IGlzXG4gICAgKiAgIHRydWUgY2xlYXIgdGhlIHNlbGVjdGVkIHN0YXR1cyBvZiBhbGwgb3RoZXIgbGlzdCBpdGVtc1xuICAgICogQG1lbWJlcm9mIExpc3RWaWV3LnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IGl0ZW0gLSB0aGUgaXRlbSB0byBiZSBzZWxlY3RlZCBvciB1bnNlbGVjdGVkXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZXZ0IC0gY2xpY2sgZXZlbnQgb2JqZWN0XG4gICAgKi9cbiAgICBzZWxlY3RJdGVtOiBmdW5jdGlvbihpdGVtLCBldnQpe1xuICAgICAgICBpZighIWl0ZW0uc2VsZWN0YWJsZSl7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRTdGF0dXMgPSBpdGVtLnNlbGVjdGVkKCk7XG4gICAgICAgICAgICBpZih0aGlzLnNpbmdsZVNlbGVjdCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCghc2VsZWN0ZWRTdGF0dXMpO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdpdGVtLWNsaWNrZWQnLCBpdGVtLCBldnQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogVW5zZWxlY3QgYWxsIGl0ZW1zIGluIHRoZSBsaXN0XG4gICAgKiBAbWVtYmVyb2YgTGlzdFZpZXcucHJvdG90eXBlXG4gICAgKi9cbiAgICBjbGVhclNlbGVjdGlvbjogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5pdGVtcygpLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogUmVzZXQgdGhlIHNlYXJjaCBzdHJpbmcgdG8gYmxhbmtcbiAgICAqIEBtZW1iZXJvZiBMaXN0Vmlldy5wcm90b3R5cGVcbiAgICAqL1xuICAgIGNsZWFyU2VhcmNoOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmZpbHRlcignJyk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RWaWV3O1xuIl0sIm5hbWVzIjpbIiQiLCJCYWNrYm9uZSIsImtvIiwiTGlzdFZpZXciLCJWaWV3IiwiZXh0ZW5kIiwiaXRlbXMiLCJvYnNlcnZhYmxlQXJyYXkiLCJzaW5nbGVTZWxlY3QiLCJmaWx0ZXJGdW5jdGlvbiIsImZpbHRlciIsInRvTG93ZXJDYXNlIiwiZm9yRWFjaCIsIml0ZW0iLCJuYW1lIiwiZmlsdGVyZWQiLCJvYnNlcnZhYmxlIiwiaW5kZXhPZiIsImluaXRpYWxpemUiLCJvcHRpb25zIiwiZ3JvdXBzIiwic3Vic2NyaWJlIiwiX2luaXRpYWxpemVJdGVtIiwiY29tcHV0ZWQiLCJ0aHJvdHRsZSIsInNlbGVjdGVkSXRlbXMiLCJzZWxlY3RlZCIsInNlbGVjdGFibGUiLCJzZWxlY3RJdGVtIiwiZXZ0Iiwic2VsZWN0ZWRTdGF0dXMiLCJjbGVhclNlbGVjdGlvbiIsInRyaWdnZXIiLCJjbGVhclNlYXJjaCJdLCJzb3VyY2VSb290IjoiIn0=