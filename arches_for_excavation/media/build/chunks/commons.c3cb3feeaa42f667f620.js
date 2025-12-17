"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[32846],{

/***/ 32846:
/*!****************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/graph-designer/graph-tree.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var views_tree_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/tree-view */ 67323);
/* harmony import */ var viewmodels_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! viewmodels/alert */ 21672);
/* harmony import */ var bindings_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bindings/clipboard */ 39805);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var loading = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
var GraphTree = views_tree_view__WEBPACK_IMPORTED_MODULE_4__["default"].extend({
  /**
  * A backbone view to manage a list of graph nodes
  * @augments TreeView
  * @constructor
  * @name GraphTree
  */

  filterFunction: function filterFunction() {
    var filter = this.filter().toLowerCase();
    this.items().forEach(function (item) {
      item.filtered(true);
      if (filter.length > 2) {
        if (item.name().toLowerCase().indexOf(filter) !== -1 || item.datatype().toLowerCase().indexOf(filter) !== -1 || (!!item.ontologyclass() ? item.ontologyclass().toLowerCase().indexOf(filter) !== -1 : false)) {
          item.filtered(false);
          this.expandParentNode(item);
        }
      }
    }, this);
  },
  filterEnterKeyHandler: function filterEnterKeyHandler(context, e) {
    var self = this;
    if (e.keyCode === 13) {
      var highlightedItems = underscore__WEBPACK_IMPORTED_MODULE_2___default().filter(this.items(), function (item) {
        return !item.filtered();
      });
      var previousItem = self.scrollTo();
      self.scrollTo(null);
      if (highlightedItems.length > 0) {
        var scrollIndex = 0;
        var previousIndex = highlightedItems.indexOf(previousItem);
        if (previousItem && highlightedItems[previousIndex + 1]) {
          scrollIndex = previousIndex + 1;
        }
        self.scrollTo(highlightedItems[scrollIndex]);
      }
      return false;
    }
    return true;
  },
  /**
  * initializes the view with optional parameters
  * @memberof GraphTree.prototype
  * @param {object} options
  * @param {boolean} options.graphModel - a reference to the selected {@link GraphModel}
  */
  initialize: function initialize(options) {
    var self = this;
    this.graphModel = options.graphModel;
    this.graphSettings = options.graphSettings;
    this.cardTree = options.cardTree;
    this.appliedFunctions = options.appliedFunctions;
    this.primaryDescriptorFunction = options.primaryDescriptorFunction;
    this.permissionTree = options.permissionTree;
    this.items = this.graphModel.get('nodes');
    this.branchListVisible = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
    this.scrollTo = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable();
    this.showIds = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
    this.toggleIds = function () {
      self.showIds(!self.showIds());
    };
    this.translations = arches__WEBPACK_IMPORTED_MODULE_3__["default"].translations;
    this.showGrid = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
    this.activeLanguageDir = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(arches__WEBPACK_IMPORTED_MODULE_3__["default"].activeLanguageDir);
    this.pageVm = options.pageVm, views_tree_view__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.initialize.apply(this, arguments);
  },
  /**
  * Returns a knockout computed used to calculate display name of the node
  * @memberof GraphTree.prototype
  * @param {object} node - a node in the tree
  */

  getDisplayName: function getDisplayName(node) {
    return knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      var name = node.name();
      if (node.ontologyclass_friendlyname() != "") {
        name = name + ' (' + node.ontologyclass_friendlyname().split('_')[0] + ')';
      }
      return name;
    }, this);
  },
  /**
  * Returns a knockout computed used to calculate nodeidentifier of the node
  * @memberof GraphTree.prototype
  * @param {object} node - a node in the tree
  */
  getNodeIdentifier: function getNodeIdentifier(node) {
    return node.sourceIdentifierId() ? node.sourceIdentifierId() : node.nodeid;
  },
  /**
   * Returns a boolean to indicate whether this node participates in descriptor function
   * @param {object} node - a node in the tree
   */
  isFuncNode: function isFuncNode(node) {
    var primaryDescriptorNodes = {},
      descriptorType,
      pdFunction = this.primaryDescriptorFunction;
    if (!this.primaryDescriptorFunction()) return null;
    ['name', 'description'].forEach(function (descriptor) {
      try {
        primaryDescriptorNodes[pdFunction()['config']['descriptor_types'][descriptor]['nodegroup_id']] = descriptor;
      } catch (e) {
        // Descriptor doesn't exist so ignore the exception
        console.log("No descriptor configuration for " + descriptor);
      }
    });
    [node].concat(!!node['childNodes']() ? node['childNodes']() : []).find(function (nodeToCheck) {
      return !!(descriptorType = primaryDescriptorNodes[nodeToCheck['id']]);
    });
    return !!descriptorType;
  },
  /**
  * Returns a knockout computed used to calculate display name of the node
  * @memberof GraphTree.prototype
  * @param {object} node - a node in the tree
  */
  isChildSelected: function isChildSelected(node) {
    var _isChildSelected = function isChildSelected(parent) {
      var childSelected = false;
      if (!parent.istopnode) {
        parent.childNodes().forEach(function (child) {
          if (child && child.selected() || _isChildSelected(child)) {
            childSelected = true;
          }
        });
        return childSelected;
      }
    };
    return knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      return _isChildSelected(node);
    }, this);
  },
  /**
  * Expands the parent of the passed in node
  * @memberof GraphTree.prototype
  * @param {object} node - the child of the parent node to be expanded
  */
  expandParentNode: function expandParentNode(node) {
    if (node.parent) {
      node.parent.expanded(true);
      this.expandParentNode(node.parent);
    }
  },
  /**
  * Selects the passed in node
  * @memberof GraphTree.prototype
  * @param {object} node - the node to be selected via {@link GraphModel#selectNode}
  * @param {object} e - click event object
  */
  selectItem: function selectItem(node) {
    if (!this.graphSettings.dirty()) {
      this.graphModel.selectNode(node);
      this.trigger('node-selected', node);
    }
  },
  toggleBranchList: function toggleBranchList(node, e) {
    e.stopImmediatePropagation();
    this.branchListVisible(!this.branchListVisible());
    if (this.branchListVisible()) {
      node.expanded(true);
    }
    this.trigger('toggle-branch-list');
  },
  addChildNode: function addChildNode(node, e) {
    e.stopImmediatePropagation();
    this.graphModel.appendNode(node, function (response, status) {
      if (status === 'success') {
        node.expanded(true);
        if (node.istopnode && this.graphModel.get('isresource')) {
          this.cardTree.addCard(response.responseJSON);
          this.permissionTree.addCard(response.responseJSON);
        }

        // adds event to trigger dirty state in graph-designer
        document.dispatchEvent(new Event('addChildNode'));
      }
    }, this);
  },
  deleteNode: function deleteNode(node, e) {
    e.stopImmediatePropagation();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).tooltip('destroy'); // needs to be called before the node is deleted

    this.graphModel.deleteNode(node, function (_response, status) {
      if (status === 'success') {
        if (node.isCollector()) {
          this.cardTree.deleteCard(node.nodeGroupId());
          this.permissionTree.deleteCard(node.nodeGroupId());
        }
      }
    }, this);
  },
  exportBranch: function exportBranch(node, e) {
    e.stopImmediatePropagation();
    this.graphModel.exportBranch(node, function (response) {
      var url = arches__WEBPACK_IMPORTED_MODULE_3__["default"].urls.graph_designer(response.responseJSON.graphid);
      window.open(url);
    });
  },
  beforeMove: function beforeMove(e) {
    if (e.sourceParent !== e.targetParent || e.item.is_immutable && !e.item.isCollector() || !Boolean(e.item.graph.attributes.source_identifier_id)) {
      e.cancelDrop = true;
    }
  },
  reorderNodes: function reorderNodes(e) {
    loading(true);
    var self = this;
    var nodes = underscore__WEBPACK_IMPORTED_MODULE_2___default().map(e.sourceParent(), function (node) {
      return node.attributes.source;
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: "POST",
      data: JSON.stringify({
        nodes: nodes
      }),
      url: arches__WEBPACK_IMPORTED_MODULE_3__["default"].urls.reorder_nodes,
      complete: function complete() {
        // adds event to trigger dirty state in graph-designer
        document.dispatchEvent(new Event('reorderNodes'));
        loading(false);
      },
      error: function error(response) {
        self.pageVm.alert(new viewmodels_alert__WEBPACK_IMPORTED_MODULE_5__["default"]('ep-alert-red', response.responseJSON.title, response.responseJSON.message, null, function () {}));
        var undoSort = function undoSort(array, sourceIndex, targetIndex) {
          var _array$splice = array.splice(targetIndex, 1),
            _array$splice2 = _slicedToArray(_array$splice, 1),
            movedItem = _array$splice2[0];
          array.splice(sourceIndex, 0, movedItem);
        };
        undoSort(e.sourceParent, e.sourceIndex, e.targetIndex);
      }
    });
  },
  _initializeItem: function _initializeItem(item) {
    if (!item.expanded) {
      item.expanded = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(item.istopnode);
    }
    views_tree_view__WEBPACK_IMPORTED_MODULE_4__["default"].prototype._initializeItem.apply(this, arguments);
  },
  collapseAll: function collapseAll() {
    this.items().forEach(function (item) {
      if (!item.istopnode) {
        item.expanded(false);
      }
    }, this);
  },
  toggleGrid: function toggleGrid() {
    this.showGrid(!this.showGrid());
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GraphTree);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNEUixRQUFRLENBQUMxRyxDQUFDLENBQUNtRixZQUFZLEVBQUVuRixDQUFDLENBQUM0RyxXQUFXLEVBQUU1RyxDQUFDLENBQUM2RyxXQUFXLENBQUM7TUFDMUQ7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBRURNLGVBQWUsRUFBRSxTQUFqQkEsZUFBZUEsQ0FBVzdILElBQUksRUFBQztJQUMzQixJQUFJLENBQUNBLElBQUksQ0FBQzhELFFBQVEsRUFBRTtNQUNoQjlELElBQUksQ0FBQzhELFFBQVEsR0FBRzVFLDBEQUFhLENBQUNjLElBQUksQ0FBQzBELFNBQVMsQ0FBQztJQUNqRDtJQUNBckUsdURBQVEsQ0FBQzZDLFNBQVMsQ0FBQzJGLGVBQWUsQ0FBQzFGLEtBQUssQ0FBQyxJQUFJLEVBQUVDLFNBQVMsQ0FBQztFQUM3RCxDQUFDO0VBRUQwRixXQUFXLEVBQUUsU0FBYkEsV0FBV0EsQ0FBQSxFQUFZO0lBQ25CLElBQUksQ0FBQ2hJLEtBQUssQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFTQyxJQUFJLEVBQUM7TUFDL0IsSUFBSSxDQUFDQSxJQUFJLENBQUMwRCxTQUFTLEVBQUU7UUFDakIxRCxJQUFJLENBQUM4RCxRQUFRLENBQUMsS0FBSyxDQUFDO01BQ3hCO0lBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQztFQUNaLENBQUM7RUFDRGlFLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFBLEVBQVk7SUFDbEIsSUFBSSxDQUFDaEcsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDQSxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ25DO0FBRUosQ0FBQyxDQUFDO0FBQ0YsaUVBQWV0QyxTQUFTLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9ncmFwaC9ncmFwaC1kZXNpZ25lci9ncmFwaC10cmVlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgVHJlZVZpZXcgZnJvbSAndmlld3MvdHJlZS12aWV3JztcbmltcG9ydCBBbGVydFZpZXdNb2RlbCBmcm9tICd2aWV3bW9kZWxzL2FsZXJ0JztcbmltcG9ydCAnYmluZGluZ3MvY2xpcGJvYXJkJztcblxuXG52YXIgbG9hZGluZyA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuXG52YXIgR3JhcGhUcmVlID0gVHJlZVZpZXcuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAqIEEgYmFja2JvbmUgdmlldyB0byBtYW5hZ2UgYSBsaXN0IG9mIGdyYXBoIG5vZGVzXG4gICAgKiBAYXVnbWVudHMgVHJlZVZpZXdcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICogQG5hbWUgR3JhcGhUcmVlXG4gICAgKi9cblxuICAgIGZpbHRlckZ1bmN0aW9uOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZmlsdGVyID0gdGhpcy5maWx0ZXIoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLml0ZW1zKCkuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIGl0ZW0uZmlsdGVyZWQodHJ1ZSk7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgIT09IC0xIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRhdGF0eXBlKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgIT09IC0xIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoISEoaXRlbS5vbnRvbG9neWNsYXNzKCkpID8gaXRlbS5vbnRvbG9neWNsYXNzKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgIT09IC0xIDogZmFsc2UpKXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5maWx0ZXJlZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kUGFyZW50Tm9kZShpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBmaWx0ZXJFbnRlcktleUhhbmRsZXI6IGZ1bmN0aW9uKGNvbnRleHQsIGUpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgdmFyIGhpZ2hsaWdodGVkSXRlbXMgPSBfLmZpbHRlcih0aGlzLml0ZW1zKCksIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWl0ZW0uZmlsdGVyZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzSXRlbSA9IHNlbGYuc2Nyb2xsVG8oKTtcbiAgICAgICAgICAgIHNlbGYuc2Nyb2xsVG8obnVsbCk7XG4gICAgICAgICAgICBpZiAoaGlnaGxpZ2h0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNJbmRleCA9IGhpZ2hsaWdodGVkSXRlbXMuaW5kZXhPZihwcmV2aW91c0l0ZW0pO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c0l0ZW0gJiYgaGlnaGxpZ2h0ZWRJdGVtc1twcmV2aW91c0luZGV4KzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEluZGV4ID0gcHJldmlvdXNJbmRleCArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsVG8oaGlnaGxpZ2h0ZWRJdGVtc1tzY3JvbGxJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIGluaXRpYWxpemVzIHRoZSB2aWV3IHdpdGggb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICogQG1lbWJlcm9mIEdyYXBoVHJlZS5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuZ3JhcGhNb2RlbCAtIGEgcmVmZXJlbmNlIHRvIHRoZSBzZWxlY3RlZCB7QGxpbmsgR3JhcGhNb2RlbH1cbiAgICAqL1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmdyYXBoTW9kZWwgPSBvcHRpb25zLmdyYXBoTW9kZWw7XG4gICAgICAgIHRoaXMuZ3JhcGhTZXR0aW5ncyA9IG9wdGlvbnMuZ3JhcGhTZXR0aW5ncztcbiAgICAgICAgdGhpcy5jYXJkVHJlZSA9IG9wdGlvbnMuY2FyZFRyZWU7XG4gICAgICAgIHRoaXMuYXBwbGllZEZ1bmN0aW9ucyA9IG9wdGlvbnMuYXBwbGllZEZ1bmN0aW9ucztcbiAgICAgICAgdGhpcy5wcmltYXJ5RGVzY3JpcHRvckZ1bmN0aW9uID0gb3B0aW9ucy5wcmltYXJ5RGVzY3JpcHRvckZ1bmN0aW9uO1xuICAgICAgICB0aGlzLnBlcm1pc3Npb25UcmVlID0gb3B0aW9ucy5wZXJtaXNzaW9uVHJlZTtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuZ3JhcGhNb2RlbC5nZXQoJ25vZGVzJyk7XG4gICAgICAgIHRoaXMuYnJhbmNoTGlzdFZpc2libGUgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zY3JvbGxUbyA9IGtvLm9ic2VydmFibGUoKTtcbiAgICAgICAgdGhpcy5zaG93SWRzID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgIHRoaXMudG9nZ2xlSWRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnNob3dJZHMoIXNlbGYuc2hvd0lkcygpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbnMgPSBhcmNoZXMudHJhbnNsYXRpb25zO1xuICAgICAgICB0aGlzLnNob3dHcmlkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgIHRoaXMuYWN0aXZlTGFuZ3VhZ2VEaXIgPSBrby5vYnNlcnZhYmxlKGFyY2hlcy5hY3RpdmVMYW5ndWFnZURpcik7XG4gICAgICAgIHRoaXMucGFnZVZtID0gb3B0aW9ucy5wYWdlVm0sXG4gICAgICAgIFRyZWVWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogUmV0dXJucyBhIGtub2Nrb3V0IGNvbXB1dGVkIHVzZWQgdG8gY2FsY3VsYXRlIGRpc3BsYXkgbmFtZSBvZiB0aGUgbm9kZVxuICAgICogQG1lbWJlcm9mIEdyYXBoVHJlZS5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBub2RlIC0gYSBub2RlIGluIHRoZSB0cmVlXG4gICAgKi9cblxuICAgIGdldERpc3BsYXlOYW1lOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIHJldHVybiBrby5jb21wdXRlZChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBub2RlLm5hbWUoKTtcbiAgICAgICAgICAgIGlmIChub2RlLm9udG9sb2d5Y2xhc3NfZnJpZW5kbHluYW1lKCkgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lICsgJyAoJyArIG5vZGUub250b2xvZ3ljbGFzc19mcmllbmRseW5hbWUoKS5zcGxpdCgnXycpWzBdICsgJyknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIFJldHVybnMgYSBrbm9ja291dCBjb21wdXRlZCB1c2VkIHRvIGNhbGN1bGF0ZSBub2RlaWRlbnRpZmllciBvZiB0aGUgbm9kZVxuICAgICogQG1lbWJlcm9mIEdyYXBoVHJlZS5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBub2RlIC0gYSBub2RlIGluIHRoZSB0cmVlXG4gICAgKi9cbiAgICBnZXROb2RlSWRlbnRpZmllcjogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZS5zb3VyY2VJZGVudGlmaWVySWQoKSA/IG5vZGUuc291cmNlSWRlbnRpZmllcklkKCkgOiBub2RlLm5vZGVpZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGJvb2xlYW4gdG8gaW5kaWNhdGUgd2hldGhlciB0aGlzIG5vZGUgcGFydGljaXBhdGVzIGluIGRlc2NyaXB0b3IgZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbm9kZSAtIGEgbm9kZSBpbiB0aGUgdHJlZVxuICAgICAqL1xuICAgIGlzRnVuY05vZGU6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgdmFyIHByaW1hcnlEZXNjcmlwdG9yTm9kZXMgPSB7fSwgZGVzY3JpcHRvclR5cGUsIHBkRnVuY3Rpb24gPSB0aGlzLnByaW1hcnlEZXNjcmlwdG9yRnVuY3Rpb247XG5cbiAgICAgICAgaWYoIXRoaXMucHJpbWFyeURlc2NyaXB0b3JGdW5jdGlvbigpKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgWyduYW1lJywgJ2Rlc2NyaXB0aW9uJ10uZm9yRWFjaChmdW5jdGlvbihkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHByaW1hcnlEZXNjcmlwdG9yTm9kZXNbcGRGdW5jdGlvbigpWydjb25maWcnXVsnZGVzY3JpcHRvcl90eXBlcyddW2Rlc2NyaXB0b3JdWydub2RlZ3JvdXBfaWQnXV0gPSBkZXNjcmlwdG9yO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIERlc2NyaXB0b3IgZG9lc24ndCBleGlzdCBzbyBpZ25vcmUgdGhlIGV4Y2VwdGlvblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gZGVzY3JpcHRvciBjb25maWd1cmF0aW9uIGZvciBcIitkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgW25vZGVdLmNvbmNhdCghIW5vZGVbJ2NoaWxkTm9kZXMnXSgpID8gbm9kZVsnY2hpbGROb2RlcyddKCkgOiBbXSlcbiAgICAgICAgICAgIC5maW5kKG5vZGVUb0NoZWNrID0+ICEhKGRlc2NyaXB0b3JUeXBlID0gcHJpbWFyeURlc2NyaXB0b3JOb2Rlc1tub2RlVG9DaGVja1snaWQnXV0pKTtcblxuICAgICAgICByZXR1cm4gISFkZXNjcmlwdG9yVHlwZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIGEga25vY2tvdXQgY29tcHV0ZWQgdXNlZCB0byBjYWxjdWxhdGUgZGlzcGxheSBuYW1lIG9mIHRoZSBub2RlXG4gICAgKiBAbWVtYmVyb2YgR3JhcGhUcmVlLnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG5vZGUgLSBhIG5vZGUgaW4gdGhlIHRyZWVcbiAgICAqL1xuICAgIGlzQ2hpbGRTZWxlY3RlZDogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICB2YXIgaXNDaGlsZFNlbGVjdGVkID0gZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFwYXJlbnQuaXN0b3Bub2RlKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkTm9kZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCAmJiBjaGlsZC5zZWxlY3RlZCgpIHx8IGlzQ2hpbGRTZWxlY3RlZChjaGlsZCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRTZWxlY3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNDaGlsZFNlbGVjdGVkKG5vZGUpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBFeHBhbmRzIHRoZSBwYXJlbnQgb2YgdGhlIHBhc3NlZCBpbiBub2RlXG4gICAgKiBAbWVtYmVyb2YgR3JhcGhUcmVlLnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG5vZGUgLSB0aGUgY2hpbGQgb2YgdGhlIHBhcmVudCBub2RlIHRvIGJlIGV4cGFuZGVkXG4gICAgKi9cbiAgICBleHBhbmRQYXJlbnROb2RlOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIGlmKG5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICBub2RlLnBhcmVudC5leHBhbmRlZCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kUGFyZW50Tm9kZShub2RlLnBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBTZWxlY3RzIHRoZSBwYXNzZWQgaW4gbm9kZVxuICAgICogQG1lbWJlcm9mIEdyYXBoVHJlZS5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBub2RlIC0gdGhlIG5vZGUgdG8gYmUgc2VsZWN0ZWQgdmlhIHtAbGluayBHcmFwaE1vZGVsI3NlbGVjdE5vZGV9XG4gICAgKiBAcGFyYW0ge29iamVjdH0gZSAtIGNsaWNrIGV2ZW50IG9iamVjdFxuICAgICovXG4gICAgc2VsZWN0SXRlbTogZnVuY3Rpb24obm9kZSl7XG4gICAgICAgIGlmICghdGhpcy5ncmFwaFNldHRpbmdzLmRpcnR5KCkpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhNb2RlbC5zZWxlY3ROb2RlKG5vZGUpO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdub2RlLXNlbGVjdGVkJywgbm9kZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9nZ2xlQnJhbmNoTGlzdDogZnVuY3Rpb24obm9kZSwgZSkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmJyYW5jaExpc3RWaXNpYmxlKCF0aGlzLmJyYW5jaExpc3RWaXNpYmxlKCkpO1xuICAgICAgICBpZih0aGlzLmJyYW5jaExpc3RWaXNpYmxlKCkpe1xuICAgICAgICAgICAgbm9kZS5leHBhbmRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3RvZ2dsZS1icmFuY2gtbGlzdCcpO1xuICAgIH0sXG5cbiAgICBhZGRDaGlsZE5vZGU6IGZ1bmN0aW9uKG5vZGUsIGUpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5ncmFwaE1vZGVsLmFwcGVuZE5vZGUobm9kZSAsZnVuY3Rpb24ocmVzcG9uc2UsIHN0YXR1cyl7XG4gICAgICAgICAgICBpZihzdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIG5vZGUuZXhwYW5kZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuaXN0b3Bub2RlICYmIHRoaXMuZ3JhcGhNb2RlbC5nZXQoJ2lzcmVzb3VyY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRUcmVlLmFkZENhcmQocmVzcG9uc2UucmVzcG9uc2VKU09OKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uVHJlZS5hZGRDYXJkKHJlc3BvbnNlLnJlc3BvbnNlSlNPTik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkcyBldmVudCB0byB0cmlnZ2VyIGRpcnR5IHN0YXRlIGluIGdyYXBoLWRlc2lnbmVyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgICAgICAgbmV3IEV2ZW50KCdhZGRDaGlsZE5vZGUnKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBkZWxldGVOb2RlOiBmdW5jdGlvbihub2RlLCBlKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgJChlLnRhcmdldCkudG9vbHRpcCgnZGVzdHJveScpOyAgLy8gbmVlZHMgdG8gYmUgY2FsbGVkIGJlZm9yZSB0aGUgbm9kZSBpcyBkZWxldGVkXG5cbiAgICAgICAgdGhpcy5ncmFwaE1vZGVsLmRlbGV0ZU5vZGUobm9kZSwgZnVuY3Rpb24oX3Jlc3BvbnNlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmlzQ29sbGVjdG9yKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkVHJlZS5kZWxldGVDYXJkKG5vZGUubm9kZUdyb3VwSWQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVybWlzc2lvblRyZWUuZGVsZXRlQ2FyZChub2RlLm5vZGVHcm91cElkKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIGV4cG9ydEJyYW5jaDogZnVuY3Rpb24obm9kZSwgZSkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmdyYXBoTW9kZWwuZXhwb3J0QnJhbmNoKG5vZGUsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gYXJjaGVzLnVybHMuZ3JhcGhfZGVzaWduZXIocmVzcG9uc2UucmVzcG9uc2VKU09OLmdyYXBoaWQpO1xuICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGJlZm9yZU1vdmU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZS5zb3VyY2VQYXJlbnQgIT09IGUudGFyZ2V0UGFyZW50XG4gICAgICAgICAgICB8fCAoZS5pdGVtLmlzX2ltbXV0YWJsZSAmJiAhZS5pdGVtLmlzQ29sbGVjdG9yKCkpXG4gICAgICAgICAgICB8fCAhQm9vbGVhbihlLml0ZW0uZ3JhcGguYXR0cmlidXRlcy5zb3VyY2VfaWRlbnRpZmllcl9pZClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBlLmNhbmNlbERyb3AgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW9yZGVyTm9kZXM6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbG9hZGluZyh0cnVlKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbm9kZXMgPSBfLm1hcChlLnNvdXJjZVBhcmVudCgpLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5hdHRyaWJ1dGVzLnNvdXJjZTtcbiAgICAgICAgfSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBub2Rlczogbm9kZXNcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5yZW9yZGVyX25vZGVzLFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIGFkZHMgZXZlbnQgdG8gdHJpZ2dlciBkaXJ0eSBzdGF0ZSBpbiBncmFwaC1kZXNpZ25lclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFdmVudCgncmVvcmRlck5vZGVzJylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucGFnZVZtLmFsZXJ0KFxuICAgICAgICAgICAgICAgICAgICBuZXcgQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZXAtYWxlcnQtcmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCl7fVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1bmRvU29ydCA9IChhcnJheSwgc291cmNlSW5kZXgsIHRhcmdldEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFttb3ZlZEl0ZW1dID0gYXJyYXkuc3BsaWNlKHRhcmdldEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKHNvdXJjZUluZGV4LCAwLCBtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdW5kb1NvcnQoZS5zb3VyY2VQYXJlbnQsIGUuc291cmNlSW5kZXgsIGUudGFyZ2V0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgX2luaXRpYWxpemVJdGVtOiBmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgaWYgKCFpdGVtLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICBpdGVtLmV4cGFuZGVkID0ga28ub2JzZXJ2YWJsZShpdGVtLmlzdG9wbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgVHJlZVZpZXcucHJvdG90eXBlLl9pbml0aWFsaXplSXRlbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICBjb2xsYXBzZUFsbDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5pdGVtcygpLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uaXN0b3Bub2RlKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5leHBhbmRlZChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG4gICAgdG9nZ2xlR3JpZDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5zaG93R3JpZCghdGhpcy5zaG93R3JpZCgpKTtcbiAgICB9XG5cbn0pO1xuZXhwb3J0IGRlZmF1bHQgR3JhcGhUcmVlO1xuXG4iXSwibmFtZXMiOlsiJCIsImtvIiwiXyIsImFyY2hlcyIsIlRyZWVWaWV3IiwiQWxlcnRWaWV3TW9kZWwiLCJsb2FkaW5nIiwib2JzZXJ2YWJsZSIsIkdyYXBoVHJlZSIsImV4dGVuZCIsImZpbHRlckZ1bmN0aW9uIiwiZmlsdGVyIiwidG9Mb3dlckNhc2UiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiZmlsdGVyZWQiLCJsZW5ndGgiLCJuYW1lIiwiaW5kZXhPZiIsImRhdGF0eXBlIiwib250b2xvZ3ljbGFzcyIsImV4cGFuZFBhcmVudE5vZGUiLCJmaWx0ZXJFbnRlcktleUhhbmRsZXIiLCJjb250ZXh0IiwiZSIsInNlbGYiLCJrZXlDb2RlIiwiaGlnaGxpZ2h0ZWRJdGVtcyIsInByZXZpb3VzSXRlbSIsInNjcm9sbFRvIiwic2Nyb2xsSW5kZXgiLCJwcmV2aW91c0luZGV4IiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJncmFwaE1vZGVsIiwiZ3JhcGhTZXR0aW5ncyIsImNhcmRUcmVlIiwiYXBwbGllZEZ1bmN0aW9ucyIsInByaW1hcnlEZXNjcmlwdG9yRnVuY3Rpb24iLCJwZXJtaXNzaW9uVHJlZSIsImdldCIsImJyYW5jaExpc3RWaXNpYmxlIiwic2hvd0lkcyIsInRvZ2dsZUlkcyIsInRyYW5zbGF0aW9ucyIsInNob3dHcmlkIiwiYWN0aXZlTGFuZ3VhZ2VEaXIiLCJwYWdlVm0iLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsImdldERpc3BsYXlOYW1lIiwibm9kZSIsImNvbXB1dGVkIiwib250b2xvZ3ljbGFzc19mcmllbmRseW5hbWUiLCJzcGxpdCIsImdldE5vZGVJZGVudGlmaWVyIiwic291cmNlSWRlbnRpZmllcklkIiwibm9kZWlkIiwiaXNGdW5jTm9kZSIsInByaW1hcnlEZXNjcmlwdG9yTm9kZXMiLCJkZXNjcmlwdG9yVHlwZSIsInBkRnVuY3Rpb24iLCJkZXNjcmlwdG9yIiwiY29uc29sZSIsImxvZyIsImNvbmNhdCIsImZpbmQiLCJub2RlVG9DaGVjayIsImlzQ2hpbGRTZWxlY3RlZCIsInBhcmVudCIsImNoaWxkU2VsZWN0ZWQiLCJpc3RvcG5vZGUiLCJjaGlsZE5vZGVzIiwiY2hpbGQiLCJzZWxlY3RlZCIsImV4cGFuZGVkIiwic2VsZWN0SXRlbSIsImRpcnR5Iiwic2VsZWN0Tm9kZSIsInRyaWdnZXIiLCJ0b2dnbGVCcmFuY2hMaXN0Iiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiYWRkQ2hpbGROb2RlIiwiYXBwZW5kTm9kZSIsInJlc3BvbnNlIiwic3RhdHVzIiwiYWRkQ2FyZCIsInJlc3BvbnNlSlNPTiIsImRvY3VtZW50IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiZGVsZXRlTm9kZSIsInRhcmdldCIsInRvb2x0aXAiLCJfcmVzcG9uc2UiLCJpc0NvbGxlY3RvciIsImRlbGV0ZUNhcmQiLCJub2RlR3JvdXBJZCIsImV4cG9ydEJyYW5jaCIsInVybCIsInVybHMiLCJncmFwaF9kZXNpZ25lciIsImdyYXBoaWQiLCJ3aW5kb3ciLCJvcGVuIiwiYmVmb3JlTW92ZSIsInNvdXJjZVBhcmVudCIsInRhcmdldFBhcmVudCIsImlzX2ltbXV0YWJsZSIsIkJvb2xlYW4iLCJncmFwaCIsImF0dHJpYnV0ZXMiLCJzb3VyY2VfaWRlbnRpZmllcl9pZCIsImNhbmNlbERyb3AiLCJyZW9yZGVyTm9kZXMiLCJub2RlcyIsIm1hcCIsInNvdXJjZSIsImFqYXgiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW9yZGVyX25vZGVzIiwiY29tcGxldGUiLCJlcnJvciIsImFsZXJ0IiwidGl0bGUiLCJtZXNzYWdlIiwidW5kb1NvcnQiLCJhcnJheSIsInNvdXJjZUluZGV4IiwidGFyZ2V0SW5kZXgiLCJfYXJyYXkkc3BsaWNlIiwic3BsaWNlIiwiX2FycmF5JHNwbGljZTIiLCJfc2xpY2VkVG9BcnJheSIsIm1vdmVkSXRlbSIsIl9pbml0aWFsaXplSXRlbSIsImNvbGxhcHNlQWxsIiwidG9nZ2xlR3JpZCJdLCJzb3VyY2VSb290IjoiIn0=