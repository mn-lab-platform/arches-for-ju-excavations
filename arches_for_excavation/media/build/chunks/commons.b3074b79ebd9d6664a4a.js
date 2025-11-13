"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[97008],{

/***/ 97008:
/*!***************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/graph-designer/node-form.js ***!
  \***************************************************************************************************************/
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
/* harmony import */ var views_components_simple_switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/components/simple-switch */ 96613);
/* harmony import */ var bindings_chosen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bindings/chosen */ 63777);







var NodeFormView = backbone__WEBPACK_IMPORTED_MODULE_2___default().View.extend({
  /**
  * A backbone view representing a node form
  * @augments Backbone.View
  * @constructor
  * @name NodeFormView
  */

  /**
  * Initializes the view with optional parameters
  * @memberof NodeFormView.prototype
  * @param {object} options
  * @param {object} options.graphModel - a reference to the selected {@link GraphModel}
  */
  initialize: function initialize(options) {
    var self = this;
    underscore__WEBPACK_IMPORTED_MODULE_1___default().extend(this, underscore__WEBPACK_IMPORTED_MODULE_1___default().pick(options, 'graphModel'));
    this.datatypes = underscore__WEBPACK_IMPORTED_MODULE_1___default().keys(this.graphModel.get('datatypelookup'));
    this.node = options.node;
    this.isExportable = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(null);
    this.graph = options.graph;
    this.loading = options.loading || knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
    this.hasOntology = knockout__WEBPACK_IMPORTED_MODULE_3___default().computed(function () {
      return self.graph.ontology_id() === null ? false : true;
    });
    this.isResourceTopNode = knockout__WEBPACK_IMPORTED_MODULE_3___default().computed(function () {
      var node = self.node();
      return self.graphModel.get('isresource') && node && node.istopnode;
    });
    this.nodegroup = knockout__WEBPACK_IMPORTED_MODULE_3___default().computed(function () {
      var node = knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(self.node);
      var nodegroup;
      if (node) {
        nodegroup = self.graph.nodegroups().find(function (nodegroup) {
          return nodegroup.nodegroupid() === node.nodeGroupId();
        });
      }
      return nodegroup;
    });
    this.appliedFunctions = options.appliedFunctions;
    this.primaryDescriptorFunction = options.primaryDescriptorFunction;
    options.updatedCardinalityData.subscribe(function (updatedCardinalityData) {
      var data = updatedCardinalityData[0];
      var graphSettingsViewModel = updatedCardinalityData[1];
      self.loading(true);
      self.graph['nodegroups'](knockout__WEBPACK_IMPORTED_MODULE_3___default().mapping.fromJS(data['nodegroups'])());
      graphSettingsViewModel.save();
    });
    this.updateCardinality = function () {
      if (self.nodegroup() && self.node().nodeid === self.node().nodeGroupId()) {
        self.nodegroup().cardinality(self.nodegroup().cardinality() === '1' ? 'n' : '1');
      }
    };
    this.isFuncNode = function () {
      var node = self.node();
      var primaryDescriptorNodes = {},
        descriptorType = null,
        pdFunction = this.primaryDescriptorFunction;
      if (!pdFunction || !pdFunction()) return false;
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
      return !descriptorType ? false : descriptorType === "name" ? "This node participates in the name function" : "This node participates in the descriptor function";
    };
    this.extendNode = function (node, parameters) {
      return underscore__WEBPACK_IMPORTED_MODULE_1___default().extend(node, parameters);
    };
    this.toggleRequired = function () {
      self.node().isrequired(!self.node().isrequired());
    };
    this.disableDatatype = knockout__WEBPACK_IMPORTED_MODULE_3___default().computed(function () {
      return self.isResourceTopNode();
    });
    this.displayMakeCard = knockout__WEBPACK_IMPORTED_MODULE_3___default().computed(function () {
      var res = true;
      if (self.node() && self.graphModel.get('isresource')) {
        var parentNode = self.graphModel.getParentNode(self.node());
        if (parentNode.istopnode === true) {
          res = false;
        }
      }
      return res;
    });
    this.disableIsCollector = knockout__WEBPACK_IMPORTED_MODULE_3___default().computed(function () {
      var node = self.node();
      var isCollector = false;
      var isNodeInChildGroup = false;
      var hasNonSemanticParentNodes = false;
      var isInParentGroup = false;
      var groupHasNonSemanticNodes = false;
      var hasDownstreamCollector = false;
      if (node) {
        isCollector = node.isCollector();
        isNodeInChildGroup = self.graphModel.isNodeInChildGroup(node);
        var groupNodes = self.graphModel.getGroupedNodes(node);
        var childNodes = self.graphModel.getChildNodesAndEdges(node).nodes;
        childNodes.push(node);
        var parentGroupNodes = underscore__WEBPACK_IMPORTED_MODULE_1___default().difference(groupNodes, childNodes);
        hasNonSemanticParentNodes = !!underscore__WEBPACK_IMPORTED_MODULE_1___default().find(parentGroupNodes, function (node) {
          return node.datatype() !== 'semantic';
        });
        groupHasNonSemanticNodes = !!underscore__WEBPACK_IMPORTED_MODULE_1___default().find(groupNodes, function (node) {
          return node.datatype() !== 'semantic';
        });
        hasDownstreamCollector = !!underscore__WEBPACK_IMPORTED_MODULE_1___default().find(childNodes, function (node) {
          return node.isCollector();
        });
        isInParentGroup = self.graphModel.isNodeInParentGroup(node);
      }
      return self.isResourceTopNode() || !isCollector && (isNodeInChildGroup || hasNonSemanticParentNodes) || !isCollector && isInParentGroup && hasDownstreamCollector || isCollector && groupHasNonSemanticNodes && (isInParentGroup || isNodeInChildGroup) || self.graphModel.get('nodes')().length > 1 && node && node.istopnode;
    });
  },
  /**
   * Resets the edited model
   * @memberof NodeFormView.prototype
   */
  cancel: function cancel() {
    this.node().reset();
  },
  /**
   * Calls an async method on the graph model based on the passed in
   * method name.
   * Manages showing loading mask & failure alert
   * @memberof NodeFormView.prototype
   *
   * @param  {string} methodName - method to call on the graph model
   */
  callAsync: function callAsync(methodName) {
    var self = this;
    this.loading(true);
    this.graphModel[methodName](this.node(), function () {
      self.loading(false);
    });
  },
  /**
   * Calls the updateNode method on the graph model for the edited node
   * @memberof NodeFormView.prototype
   */
  save: function save() {
    this.callAsync('updateNode');
  },
  /**
   * Calls the deleteNode method on the graph model for the edited node
   * @memberof NodeFormView.prototype
   */
  deleteNode: function deleteNode() {
    this.callAsync('deleteNode');
  },
  /**
   * Calls the toggleIsCollector method on the node model
   * @memberof NodeFormView.prototype
   */
  toggleIsCollector: function toggleIsCollector() {
    this.node().toggleIsCollector();
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NodeFormView);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzVCLElBQUkzRSxJQUFJLEdBQUcsSUFBSTtJQUNmLElBQUksQ0FBQ1UsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNsQixJQUFJLENBQUNOLFVBQVUsQ0FBQ3VFLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQ3JFLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBVTtNQUMvQ04sSUFBSSxDQUFDVSxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztFQUNOLENBQUM7RUFFRDtBQUNKO0FBQ0E7QUFDQTtFQUNJb0IsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQUEsRUFBYTtJQUNiLElBQUksQ0FBQzRDLFNBQVMsQ0FBQyxZQUFZLENBQUM7RUFDaEMsQ0FBQztFQUVEO0FBQ0o7QUFDQTtBQUNBO0VBQ0lFLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFBLEVBQWE7SUFDbkIsSUFBSSxDQUFDRixTQUFTLENBQUMsWUFBWSxDQUFDO0VBQ2hDLENBQUM7RUFFRDtBQUNKO0FBQ0E7QUFDQTtFQUNJRyxpQkFBaUIsRUFBRSxTQUFuQkEsaUJBQWlCQSxDQUFBLEVBQWE7SUFDMUIsSUFBSSxDQUFDdkUsSUFBSSxDQUFDLENBQUMsQ0FBQ3VFLGlCQUFpQixDQUFDLENBQUM7RUFDbkM7QUFDSixDQUFDLENBQUM7QUFDRixpRUFBZWxGLFlBQVksRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2dyYXBoL2dyYXBoLWRlc2lnbmVyL25vZGUtZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCAndmlld3MvY29tcG9uZW50cy9zaW1wbGUtc3dpdGNoJztcbmltcG9ydCAnYmluZGluZ3MvY2hvc2VuJztcblxuXG52YXIgTm9kZUZvcm1WaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIC8qKlxuICAgICogQSBiYWNrYm9uZSB2aWV3IHJlcHJlc2VudGluZyBhIG5vZGUgZm9ybVxuICAgICogQGF1Z21lbnRzIEJhY2tib25lLlZpZXdcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICogQG5hbWUgTm9kZUZvcm1WaWV3XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogSW5pdGlhbGl6ZXMgdGhlIHZpZXcgd2l0aCBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgKiBAbWVtYmVyb2YgTm9kZUZvcm1WaWV3LnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmdyYXBoTW9kZWwgLSBhIHJlZmVyZW5jZSB0byB0aGUgc2VsZWN0ZWQge0BsaW5rIEdyYXBoTW9kZWx9XG4gICAgKi9cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgXy5leHRlbmQodGhpcywgXy5waWNrKG9wdGlvbnMsICdncmFwaE1vZGVsJykpO1xuICAgICAgICB0aGlzLmRhdGF0eXBlcyA9IF8ua2V5cyh0aGlzLmdyYXBoTW9kZWwuZ2V0KCdkYXRhdHlwZWxvb2t1cCcpKTtcbiAgICAgICAgdGhpcy5ub2RlID0gb3B0aW9ucy5ub2RlO1xuICAgICAgICB0aGlzLmlzRXhwb3J0YWJsZSA9IGtvLm9ic2VydmFibGUobnVsbCk7XG4gICAgICAgIHRoaXMuZ3JhcGggPSBvcHRpb25zLmdyYXBoO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBvcHRpb25zLmxvYWRpbmcgfHwga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgIHRoaXMuaGFzT250b2xvZ3kgPSBrby5jb21wdXRlZChmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZ3JhcGgub250b2xvZ3lfaWQoKSA9PT0gbnVsbCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXNSZXNvdXJjZVRvcE5vZGUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gc2VsZi5ub2RlKCk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5ncmFwaE1vZGVsLmdldCgnaXNyZXNvdXJjZScpICYmIG5vZGUgJiYgbm9kZS5pc3RvcG5vZGU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGVncm91cCA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGtvLnVud3JhcChzZWxmLm5vZGUpO1xuICAgICAgICAgICAgbGV0IG5vZGVncm91cDtcblxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlZ3JvdXAgPSBzZWxmLmdyYXBoLm5vZGVncm91cHMoKS5maW5kKGZ1bmN0aW9uKG5vZGVncm91cCkgeyBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVncm91cC5ub2RlZ3JvdXBpZCgpID09PSBub2RlLm5vZGVHcm91cElkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBub2RlZ3JvdXA7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcGxpZWRGdW5jdGlvbnMgPSBvcHRpb25zLmFwcGxpZWRGdW5jdGlvbnM7XG4gICAgICAgIHRoaXMucHJpbWFyeURlc2NyaXB0b3JGdW5jdGlvbiA9IG9wdGlvbnMucHJpbWFyeURlc2NyaXB0b3JGdW5jdGlvbjtcblxuICAgICAgICBvcHRpb25zLnVwZGF0ZWRDYXJkaW5hbGl0eURhdGEuc3Vic2NyaWJlKGZ1bmN0aW9uKHVwZGF0ZWRDYXJkaW5hbGl0eURhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB1cGRhdGVkQ2FyZGluYWxpdHlEYXRhWzBdO1xuICAgICAgICAgICAgY29uc3QgZ3JhcGhTZXR0aW5nc1ZpZXdNb2RlbCA9IHVwZGF0ZWRDYXJkaW5hbGl0eURhdGFbMV07XG5cbiAgICAgICAgICAgIHNlbGYubG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIHNlbGYuZ3JhcGhbJ25vZGVncm91cHMnXShrby5tYXBwaW5nLmZyb21KUyhkYXRhWydub2RlZ3JvdXBzJ10pKCkpO1xuICAgICAgICAgICAgZ3JhcGhTZXR0aW5nc1ZpZXdNb2RlbC5zYXZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ2FyZGluYWxpdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLm5vZGVncm91cCgpICYmIHNlbGYubm9kZSgpLm5vZGVpZCA9PT0gc2VsZi5ub2RlKCkubm9kZUdyb3VwSWQoKSkge1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZWdyb3VwKCkuY2FyZGluYWxpdHkoc2VsZi5ub2RlZ3JvdXAoKS5jYXJkaW5hbGl0eSgpID09PSAnMScgPyAnbicgOiAnMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaXNGdW5jTm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBzZWxmLm5vZGUoKTtcbiAgICAgICAgICAgIHZhciBwcmltYXJ5RGVzY3JpcHRvck5vZGVzID0ge30sIGRlc2NyaXB0b3JUeXBlID0gbnVsbCwgcGRGdW5jdGlvbiA9IHRoaXMucHJpbWFyeURlc2NyaXB0b3JGdW5jdGlvbjtcblxuICAgICAgICAgICAgaWYgKCFwZEZ1bmN0aW9uIHx8ICFwZEZ1bmN0aW9uKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICBbJ25hbWUnLCAnZGVzY3JpcHRpb24nXS5mb3JFYWNoKGZ1bmN0aW9uKGRlc2NyaXB0b3Ipe1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlEZXNjcmlwdG9yTm9kZXNbcGRGdW5jdGlvbigpWydjb25maWcnXVsnZGVzY3JpcHRvcl90eXBlcyddW2Rlc2NyaXB0b3JdWydub2RlZ3JvdXBfaWQnXV0gPSBkZXNjcmlwdG9yO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBEZXNjcmlwdG9yIGRvZXNuJ3QgZXhpc3Qgc28gaWdub3JlIHRoZSBleGNlcHRpb25cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBkZXNjcmlwdG9yIGNvbmZpZ3VyYXRpb24gZm9yIFwiK2Rlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBbbm9kZV0uY29uY2F0KCEhbm9kZVsnY2hpbGROb2RlcyddKCkgPyBub2RlWydjaGlsZE5vZGVzJ10oKSA6IFtdKVxuICAgICAgICAgICAgICAgIC5maW5kKG5vZGVUb0NoZWNrID0+ICEhKGRlc2NyaXB0b3JUeXBlID0gcHJpbWFyeURlc2NyaXB0b3JOb2Rlc1tub2RlVG9DaGVja1snaWQnXV0pKTtcblxuICAgICAgICAgICAgcmV0dXJuICFkZXNjcmlwdG9yVHlwZSA/IGZhbHNlIDpcbiAgICAgICAgICAgICAgICAoZGVzY3JpcHRvclR5cGUgPT09IFwibmFtZVwiID9cbiAgICAgICAgICAgICAgICAgICAgXCJUaGlzIG5vZGUgcGFydGljaXBhdGVzIGluIHRoZSBuYW1lIGZ1bmN0aW9uXCIgOlxuICAgICAgICAgICAgICAgICAgICBcIlRoaXMgbm9kZSBwYXJ0aWNpcGF0ZXMgaW4gdGhlIGRlc2NyaXB0b3IgZnVuY3Rpb25cIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5leHRlbmROb2RlID0gZnVuY3Rpb24obm9kZSwgcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIF8uZXh0ZW5kKG5vZGUsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudG9nZ2xlUmVxdWlyZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYubm9kZSgpLmlzcmVxdWlyZWQoIXNlbGYubm9kZSgpLmlzcmVxdWlyZWQoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlRGF0YXR5cGUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmlzUmVzb3VyY2VUb3BOb2RlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGlzcGxheU1ha2VDYXJkID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzZWxmLm5vZGUoKSAmJiBzZWxmLmdyYXBoTW9kZWwuZ2V0KCdpc3Jlc291cmNlJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IHNlbGYuZ3JhcGhNb2RlbC5nZXRQYXJlbnROb2RlKHNlbGYubm9kZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50Tm9kZS5pc3RvcG5vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlSXNDb2xsZWN0b3IgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gc2VsZi5ub2RlKCk7XG4gICAgICAgICAgICB2YXIgaXNDb2xsZWN0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBpc05vZGVJbkNoaWxkR3JvdXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBoYXNOb25TZW1hbnRpY1BhcmVudE5vZGVzID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgaXNJblBhcmVudEdyb3VwID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgZ3JvdXBIYXNOb25TZW1hbnRpY05vZGVzID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgaGFzRG93bnN0cmVhbUNvbGxlY3RvciA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpc0NvbGxlY3RvciA9IG5vZGUuaXNDb2xsZWN0b3IoKTtcbiAgICAgICAgICAgICAgICBpc05vZGVJbkNoaWxkR3JvdXAgPSBzZWxmLmdyYXBoTW9kZWwuaXNOb2RlSW5DaGlsZEdyb3VwKG5vZGUpO1xuICAgICAgICAgICAgICAgIHZhciBncm91cE5vZGVzID0gc2VsZi5ncmFwaE1vZGVsLmdldEdyb3VwZWROb2Rlcyhub2RlKTtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGROb2RlcyA9IHNlbGYuZ3JhcGhNb2RlbC5nZXRDaGlsZE5vZGVzQW5kRWRnZXMobm9kZSkubm9kZXM7XG4gICAgICAgICAgICAgICAgY2hpbGROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRHcm91cE5vZGVzID0gXy5kaWZmZXJlbmNlKGdyb3VwTm9kZXMsIGNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgIGhhc05vblNlbWFudGljUGFyZW50Tm9kZXMgPSAhIV8uZmluZChwYXJlbnRHcm91cE5vZGVzLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLmRhdGF0eXBlKCkgIT09ICdzZW1hbnRpYyc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZ3JvdXBIYXNOb25TZW1hbnRpY05vZGVzID0gISFfLmZpbmQoZ3JvdXBOb2RlcywgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5kYXRhdHlwZSgpICE9PSAnc2VtYW50aWMnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhhc0Rvd25zdHJlYW1Db2xsZWN0b3IgPSAhIV8uZmluZChjaGlsZE5vZGVzLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLmlzQ29sbGVjdG9yKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaXNJblBhcmVudEdyb3VwID0gc2VsZi5ncmFwaE1vZGVsLmlzTm9kZUluUGFyZW50R3JvdXAobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5pc1Jlc291cmNlVG9wTm9kZSgpIHx8XG4gICAgICAgICAgICAgICAgKCFpc0NvbGxlY3RvciAmJiAoaXNOb2RlSW5DaGlsZEdyb3VwIHx8IGhhc05vblNlbWFudGljUGFyZW50Tm9kZXMpKSB8fFxuICAgICAgICAgICAgICAgICghaXNDb2xsZWN0b3IgJiYgaXNJblBhcmVudEdyb3VwICYmIGhhc0Rvd25zdHJlYW1Db2xsZWN0b3IpIHx8XG4gICAgICAgICAgICAgICAgKGlzQ29sbGVjdG9yICYmIGdyb3VwSGFzTm9uU2VtYW50aWNOb2RlcyAmJiAoaXNJblBhcmVudEdyb3VwIHx8IGlzTm9kZUluQ2hpbGRHcm91cCkpIHx8XG4gICAgICAgICAgICAgICAgKHNlbGYuZ3JhcGhNb2RlbC5nZXQoJ25vZGVzJykoKS5sZW5ndGggPiAxICYmIG5vZGUgJiYgbm9kZS5pc3RvcG5vZGUpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBlZGl0ZWQgbW9kZWxcbiAgICAgKiBAbWVtYmVyb2YgTm9kZUZvcm1WaWV3LnByb3RvdHlwZVxuICAgICAqL1xuICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZSgpLnJlc2V0KCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgYW4gYXN5bmMgbWV0aG9kIG9uIHRoZSBncmFwaCBtb2RlbCBiYXNlZCBvbiB0aGUgcGFzc2VkIGluXG4gICAgICogbWV0aG9kIG5hbWUuXG4gICAgICogTWFuYWdlcyBzaG93aW5nIGxvYWRpbmcgbWFzayAmIGZhaWx1cmUgYWxlcnRcbiAgICAgKiBAbWVtYmVyb2YgTm9kZUZvcm1WaWV3LnByb3RvdHlwZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBtZXRob2ROYW1lIC0gbWV0aG9kIHRvIGNhbGwgb24gdGhlIGdyYXBoIG1vZGVsXG4gICAgICovXG4gICAgY2FsbEFzeW5jOiBmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2FkaW5nKHRydWUpO1xuICAgICAgICB0aGlzLmdyYXBoTW9kZWxbbWV0aG9kTmFtZV0odGhpcy5ub2RlKCksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLmxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIHVwZGF0ZU5vZGUgbWV0aG9kIG9uIHRoZSBncmFwaCBtb2RlbCBmb3IgdGhlIGVkaXRlZCBub2RlXG4gICAgICogQG1lbWJlcm9mIE5vZGVGb3JtVmlldy5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBzYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jYWxsQXN5bmMoJ3VwZGF0ZU5vZGUnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIGRlbGV0ZU5vZGUgbWV0aG9kIG9uIHRoZSBncmFwaCBtb2RlbCBmb3IgdGhlIGVkaXRlZCBub2RlXG4gICAgICogQG1lbWJlcm9mIE5vZGVGb3JtVmlldy5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBkZWxldGVOb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jYWxsQXN5bmMoJ2RlbGV0ZU5vZGUnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIHRvZ2dsZUlzQ29sbGVjdG9yIG1ldGhvZCBvbiB0aGUgbm9kZSBtb2RlbFxuICAgICAqIEBtZW1iZXJvZiBOb2RlRm9ybVZpZXcucHJvdG90eXBlXG4gICAgICovXG4gICAgdG9nZ2xlSXNDb2xsZWN0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUoKS50b2dnbGVJc0NvbGxlY3RvcigpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgTm9kZUZvcm1WaWV3O1xuIl0sIm5hbWVzIjpbIiQiLCJfIiwiQmFja2JvbmUiLCJrbyIsImFyY2hlcyIsIk5vZGVGb3JtVmlldyIsIlZpZXciLCJleHRlbmQiLCJpbml0aWFsaXplIiwib3B0aW9ucyIsInNlbGYiLCJwaWNrIiwiZGF0YXR5cGVzIiwia2V5cyIsImdyYXBoTW9kZWwiLCJnZXQiLCJub2RlIiwiaXNFeHBvcnRhYmxlIiwib2JzZXJ2YWJsZSIsImdyYXBoIiwibG9hZGluZyIsImhhc09udG9sb2d5IiwiY29tcHV0ZWQiLCJvbnRvbG9neV9pZCIsImlzUmVzb3VyY2VUb3BOb2RlIiwiaXN0b3Bub2RlIiwibm9kZWdyb3VwIiwidW53cmFwIiwibm9kZWdyb3VwcyIsImZpbmQiLCJub2RlZ3JvdXBpZCIsIm5vZGVHcm91cElkIiwiYXBwbGllZEZ1bmN0aW9ucyIsInByaW1hcnlEZXNjcmlwdG9yRnVuY3Rpb24iLCJ1cGRhdGVkQ2FyZGluYWxpdHlEYXRhIiwic3Vic2NyaWJlIiwiZGF0YSIsImdyYXBoU2V0dGluZ3NWaWV3TW9kZWwiLCJtYXBwaW5nIiwiZnJvbUpTIiwic2F2ZSIsInVwZGF0ZUNhcmRpbmFsaXR5Iiwibm9kZWlkIiwiY2FyZGluYWxpdHkiLCJpc0Z1bmNOb2RlIiwicHJpbWFyeURlc2NyaXB0b3JOb2RlcyIsImRlc2NyaXB0b3JUeXBlIiwicGRGdW5jdGlvbiIsImZvckVhY2giLCJkZXNjcmlwdG9yIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJjb25jYXQiLCJub2RlVG9DaGVjayIsImV4dGVuZE5vZGUiLCJwYXJhbWV0ZXJzIiwidG9nZ2xlUmVxdWlyZWQiLCJpc3JlcXVpcmVkIiwiZGlzYWJsZURhdGF0eXBlIiwiZGlzcGxheU1ha2VDYXJkIiwicmVzIiwicGFyZW50Tm9kZSIsImdldFBhcmVudE5vZGUiLCJkaXNhYmxlSXNDb2xsZWN0b3IiLCJpc0NvbGxlY3RvciIsImlzTm9kZUluQ2hpbGRHcm91cCIsImhhc05vblNlbWFudGljUGFyZW50Tm9kZXMiLCJpc0luUGFyZW50R3JvdXAiLCJncm91cEhhc05vblNlbWFudGljTm9kZXMiLCJoYXNEb3duc3RyZWFtQ29sbGVjdG9yIiwiZ3JvdXBOb2RlcyIsImdldEdyb3VwZWROb2RlcyIsImNoaWxkTm9kZXMiLCJnZXRDaGlsZE5vZGVzQW5kRWRnZXMiLCJub2RlcyIsInB1c2giLCJwYXJlbnRHcm91cE5vZGVzIiwiZGlmZmVyZW5jZSIsImRhdGF0eXBlIiwiaXNOb2RlSW5QYXJlbnRHcm91cCIsImxlbmd0aCIsImNhbmNlbCIsInJlc2V0IiwiY2FsbEFzeW5jIiwibWV0aG9kTmFtZSIsImRlbGV0ZU5vZGUiLCJ0b2dnbGVJc0NvbGxlY3RvciJdLCJzb3VyY2VSb290IjoiIn0=