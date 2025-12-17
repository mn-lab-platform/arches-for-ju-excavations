"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[34055],{

/***/ 34055:
/*!*********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/resource/related-resources-node-list.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var views_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/list */ 38777);




var RelatedResourcesNodeList = views_list__WEBPACK_IMPORTED_MODULE_3__["default"].extend({
  /**
  * A backbone view to manage a list of graph nodes
  * @augments ListView
  * @constructor
  * @name RelatedResourcesNodeList
  */

  /**
  * initializes the view with optional parameters
  * @memberof RelatedResourcesNodeList.prototype
  * @param {object} options
  */
  initialize: function initialize(options) {
    var self = this;
    if (options.items) {
      this.items = options.items;
    }
    if (options.items) {
      this.groups = options.groups;
    }
    var initializeItem = function initializeItem(item) {
      var minimumRelations = self.items().length > 0 ? 1 : 0; //If initialized with multiple nodes, then each node has at least 1 relationship
      if (!item.filtered) {
        item.filtered = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
      }
      if (!item.selected) {
        item.selected = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
      }
      if (!item.hovered) {
        item.hovered = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
      }
      if (!item.total) {
        item.total = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(minimumRelations);
      }
      if (!item.loaded) {
        item.loaded = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(minimumRelations);
      }
      if (!item.loadcount) {
        item.loadcount = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(0);
      }
    };
    this.items.subscribe(function (items) {
      items.forEach(initializeItem, this);
    }, this);
    if (this.filterFunction) {
      this.filter = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable('');
      this.filter.subscribe(this.filterFunction, this, 'change');
      this.filterFunction();
    }
    this.selectNode = function (e) {
      underscore__WEBPACK_IMPORTED_MODULE_0___default().each(self.selectedItems(), function (item) {
        if (this.entityid != item.entityid) {
          item.selected(false);
        }
      }, this);
      e.selected(!e.selected());
    };
    this.hoverNode = function (e) {
      if (e.hovered() === false) {
        e.hovered(true);
      } else {
        e.hovered(false);
      }
    };
    this.reportURL = arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.resource_report;
    this.editURL = arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.resource_editor;
    this.selectedItems = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      return this.items().filter(function (item) {
        initializeItem(item);
        return item.selected();
      }, this);
    }, this);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RelatedResourcesNodeList);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxDQUFDYyxTQUFTLEdBQUcsVUFBU0osQ0FBQyxFQUFFO01BQ3pCLElBQUlBLENBQUMsQ0FBQ1QsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7UUFDdkJTLENBQUMsQ0FBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQztNQUNuQixDQUFDLE1BQU07UUFDSFMsQ0FBQyxDQUFDVCxPQUFPLENBQUMsS0FBSyxDQUFDO01BQ3BCO0lBQ0osQ0FBQztJQUVELElBQUksQ0FBQ2MsU0FBUyxHQUFHOUIsOENBQU0sQ0FBQytCLElBQUksQ0FBQ0MsZUFBZTtJQUM1QyxJQUFJLENBQUNDLE9BQU8sR0FBR2pDLDhDQUFNLENBQUMrQixJQUFJLENBQUNHLGVBQWU7SUFFMUMsSUFBSSxDQUFDUCxhQUFhLEdBQUc1Qix3REFBVyxDQUFDLFlBQVU7TUFDdkMsT0FBTyxJQUFJLENBQUNRLEtBQUssQ0FBQyxDQUFDLENBQUNnQixNQUFNLENBQUMsVUFBU2IsSUFBSSxFQUFDO1FBQ3JDRCxjQUFjLENBQUNDLElBQUksQ0FBQztRQUNwQixPQUFPQSxJQUFJLENBQUNLLFFBQVEsQ0FBQyxDQUFDO01BQzFCLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDWixDQUFDLEVBQUUsSUFBSSxDQUFDO0VBQ1o7QUFFSixDQUFDLENBQUM7QUFDRixpRUFBZWIsd0JBQXdCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9yZXNvdXJjZS9yZWxhdGVkLXJlc291cmNlcy1ub2RlLWxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IExpc3RWaWV3IGZyb20gJ3ZpZXdzL2xpc3QnO1xuXG5cbnZhciBSZWxhdGVkUmVzb3VyY2VzTm9kZUxpc3QgPSBMaXN0Vmlldy5leHRlbmQoe1xuICAgIC8qKlxuICAgICogQSBiYWNrYm9uZSB2aWV3IHRvIG1hbmFnZSBhIGxpc3Qgb2YgZ3JhcGggbm9kZXNcbiAgICAqIEBhdWdtZW50cyBMaXN0Vmlld1xuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKiBAbmFtZSBSZWxhdGVkUmVzb3VyY2VzTm9kZUxpc3RcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBpbml0aWFsaXplcyB0aGUgdmlldyB3aXRoIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAqIEBtZW1iZXJvZiBSZWxhdGVkUmVzb3VyY2VzTm9kZUxpc3QucHJvdG90eXBlXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChvcHRpb25zLml0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gb3B0aW9ucy5pdGVtcztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pdGVtcykge1xuICAgICAgICAgICAgdGhpcy5ncm91cHMgPSBvcHRpb25zLmdyb3VwcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5pdGlhbGl6ZUl0ZW0gPSBmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIHZhciBtaW5pbXVtUmVsYXRpb25zID0gc2VsZi5pdGVtcygpLmxlbmd0aCA+IDAgPyAxIDogMDsgLy9JZiBpbml0aWFsaXplZCB3aXRoIG11bHRpcGxlIG5vZGVzLCB0aGVuIGVhY2ggbm9kZSBoYXMgYXQgbGVhc3QgMSByZWxhdGlvbnNoaXBcbiAgICAgICAgICAgIGlmICghaXRlbS5maWx0ZXJlZCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXRlbS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXRlbS5ob3ZlcmVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5ob3ZlcmVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWl0ZW0udG90YWwpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnRvdGFsID0ga28ub2JzZXJ2YWJsZShtaW5pbXVtUmVsYXRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXRlbS5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmxvYWRlZCA9IGtvLm9ic2VydmFibGUobWluaW11bVJlbGF0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWl0ZW0ubG9hZGNvdW50KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5sb2FkY291bnQgPSBrby5vYnNlcnZhYmxlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLml0ZW1zLnN1YnNjcmliZShmdW5jdGlvbihpdGVtcykge1xuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChpbml0aWFsaXplSXRlbSwgdGhpcyk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBpZih0aGlzLmZpbHRlckZ1bmN0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5zdWJzY3JpYmUodGhpcy5maWx0ZXJGdW5jdGlvbiwgdGhpcywgJ2NoYW5nZScpO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJGdW5jdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0Tm9kZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIF8uZWFjaChzZWxmLnNlbGVjdGVkSXRlbXMoKSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0eWlkICE9IGl0ZW0uZW50aXR5aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICBlLnNlbGVjdGVkKCFlLnNlbGVjdGVkKCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaG92ZXJOb2RlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKGUuaG92ZXJlZCgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGUuaG92ZXJlZCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZS5ob3ZlcmVkKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlcG9ydFVSTCA9IGFyY2hlcy51cmxzLnJlc291cmNlX3JlcG9ydDtcbiAgICAgICAgdGhpcy5lZGl0VVJMID0gYXJjaGVzLnVybHMucmVzb3VyY2VfZWRpdG9yO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtcygpLmZpbHRlcihmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplSXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zZWxlY3RlZCgpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxufSk7XG5leHBvcnQgZGVmYXVsdCBSZWxhdGVkUmVzb3VyY2VzTm9kZUxpc3Q7XG4iXSwibmFtZXMiOlsiXyIsImtvIiwiYXJjaGVzIiwiTGlzdFZpZXciLCJSZWxhdGVkUmVzb3VyY2VzTm9kZUxpc3QiLCJleHRlbmQiLCJpbml0aWFsaXplIiwib3B0aW9ucyIsInNlbGYiLCJpdGVtcyIsImdyb3VwcyIsImluaXRpYWxpemVJdGVtIiwiaXRlbSIsIm1pbmltdW1SZWxhdGlvbnMiLCJsZW5ndGgiLCJmaWx0ZXJlZCIsIm9ic2VydmFibGUiLCJzZWxlY3RlZCIsImhvdmVyZWQiLCJ0b3RhbCIsImxvYWRlZCIsImxvYWRjb3VudCIsInN1YnNjcmliZSIsImZvckVhY2giLCJmaWx0ZXJGdW5jdGlvbiIsImZpbHRlciIsInNlbGVjdE5vZGUiLCJlIiwiZWFjaCIsInNlbGVjdGVkSXRlbXMiLCJlbnRpdHlpZCIsImhvdmVyTm9kZSIsInJlcG9ydFVSTCIsInVybHMiLCJyZXNvdXJjZV9yZXBvcnQiLCJlZGl0VVJMIiwicmVzb3VyY2VfZWRpdG9yIiwiY29tcHV0ZWQiXSwic291cmNlUm9vdCI6IiJ9