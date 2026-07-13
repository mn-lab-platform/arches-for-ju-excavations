"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[56285],{

/***/ 56285:
/*!*******************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/related-resources-graph.js + 1 modules ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ related_resources_graph)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/workbench.js + 1 modules
var workbench = __webpack_require__(90141);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/related-resources-graph.htm
const related_resources_graph_namespaceObject = "templates/views/components/related-resources-graph.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/cytoscape.js
var cytoscape = __webpack_require__(53606);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/related-resources-graph.js





var viewModel = function viewModel(params) {
  var self = this;
  var layout = {
    name: "cola",
    animate: true,
    directed: true,
    edgeLength: 200
  };
  this.viz = knockout_latest_default().observable();
  this.cytoscapeConfig = knockout_latest_default().observable();
  this.focusResourceId = knockout_latest_default().isObservable(params.resourceId) ? params.resourceId : knockout_latest_default().observable(params.resourceId);
  this.selection = knockout_latest_default().observable();
  this.selectionMode = knockout_latest_default().observable('information');
  this.elements = knockout_latest_default().observableArray();
  this.informationElement = knockout_latest_default().observable();
  this.informationGraph = knockout_latest_default().computed(function () {
    var informationElement = self.informationElement();
    if (informationElement && informationElement.graph_id) return resourceTypeLookup[informationElement.graph_id];
    return {};
  });
  this.viewInformationNodeReport = function () {
    var informationElement = self.informationElement();
    if (informationElement) window.open(arches["default"].urls.resource_report + informationElement.id);
  };
  this.editInformationNode = function () {
    var informationElement = self.informationElement();
    if (informationElement) window.open(arches["default"].urls.resource_editor + informationElement.id);
  };
  this.hoverElementId = knockout_latest_default().observable();
  this.legendEntries = knockout_latest_default().computed(function () {
    var elements = self.elements();
    var entries = [];
    for (var resourceTypeId in resourceTypeLookup) {
      if (elements.filter(function (element) {
        return element.data('graph_id') === resourceTypeId;
      }).length > 0) entries.push(resourceTypeLookup[resourceTypeId]);
    }
    return entries;
  });
  this.nodeSearchFilter = knockout_latest_default().observable('');
  this.expandedSearchId = knockout_latest_default().observable();
  this.searchNodes = knockout_latest_default().computed(function () {
    var filter = self.nodeSearchFilter();
    var elements = self.elements();
    var viz = self.viz();
    var filteredNodes = [];
    if (viz) elements.forEach(function (element) {
      if (element.isNode()) {
        var data = element.data();
        if (!data.shownRelationsCount) data.shownRelationsCount = knockout_latest_default().observable();
        if (data.displayname.toLowerCase().indexOf(filter) !== -1) {
          data.graph = resourceTypeLookup[data.graph_id];
          // excludes target relationships back to node, to prevent duplicates
          data.shownRelationsCount(viz.edges('[source = "' + data.id + '"]').length + viz.edges('[target = "' + data.id + '"][source != "' + data.id + '"]').length);
          filteredNodes.push(data);
        }
      }
    });
    return filteredNodes;
  });
  // strips URL from relationship labels, if present, for presentation
  var getRelationshipLabel = function getRelationshipLabel(edgeData) {
    var label;
    try {
      var url = new window.URL(edgeData.relationshiptype_label);
      label = url.pathname.split('/')[url.pathname.split('/').length - 1];
    } catch (e) {
      label = edgeData.relationshiptype_label;
    }
    return label;
  };
  this.informationElementRelationships = knockout_latest_default().computed(function () {
    var relationships = [];
    var informationElement = self.informationElement();
    var viz = self.viz();
    self.elements();
    if (informationElement && viz && !informationElement.source) {
      var sourceEdges = viz.edges('[source = "' + informationElement.id + '"]');
      var targetEdges = viz.edges('[target = "' + informationElement.id + '"]');
      var addRelationship = function addRelationship(edge, nodeType) {
        var edgeData = edge.data();
        var nodeData = edge[nodeType]().data();
        var label = getRelationshipLabel(edgeData);
        relationships.push({
          label: label,
          node: nodeData,
          edge: edgeData,
          informationElement: self.informationElement,
          hoverElementId: self.hoverElementId
        });
      };
      sourceEdges.forEach(function (edge) {
        addRelationship(edge, 'target');
      });
      targetEdges.forEach(function (edge) {
        // excludes target relationships back to node, to prevent duplicates
        if (edge.source().id() !== edge.target().id()) addRelationship(edge, 'source');
      });
    }
    return relationships;
  });
  this.edgeInformation = knockout_latest_default().computed(function () {
    var informationElement = self.informationElement();
    var viz = self.viz();
    if (informationElement && viz && informationElement.source) {
      var sourceData = viz.getElementById(informationElement.source).data();
      var targetData = viz.getElementById(informationElement.target).data();
      return {
        id: informationElement.id,
        label: getRelationshipLabel(informationElement),
        source: sourceData,
        sourceGraph: resourceTypeLookup[sourceData['graph_id']],
        target: targetData,
        targetGraph: resourceTypeLookup[targetData['graph_id']]
      };
    }
  });
  workbench["default"].apply(this, [params]);
  var getResourceRelations = function getResourceRelations(resourceId) {
    var url = "".concat(arches["default"].urls.related_resources).concat(resourceId, "?paginate=false&lang=").concat(arches["default"].activeLanguage);
    return window.fetch(url);
  };
  var resourceTypeLookup = {};
  var dataToElement = function dataToElement(data) {
    data.source = data.from_resource;
    data.target = data.to_resource;
    if (data.source) {
      data.id = data.resourcexid;
    } else {
      data.id = data.resourceinstanceid;
      data.totalRelations = data.total_relations.value;
    }
    var classes = [];
    if (data.graph_id) classes.push(resourceTypeLookup[data.graph_id].className);
    if (data.focus) classes.push('focus');
    return {
      data: data,
      classes: classes,
      selected: data.focus
    };
  };
  this.refreshLayout = function () {
    var viz = self.viz();
    if (viz) {
      viz.elements().makeLayout(layout).run();
    }
  };
  this.addMissingNodes = function (elements) {
    var nodesReferencedByEdges = [];
    elements.forEach(function (ele) {
      if (!!ele.data.source) {
        nodesReferencedByEdges.push(ele.data.source);
      }
      if (!!ele.data.target) {
        nodesReferencedByEdges.push(ele.data.target);
      }
    });
    var relatedResourceIds = elements.filter(function (ele) {
      return !!ele.data.resourceinstanceid;
    }).map(function (ele) {
      return ele.data.resourceinstanceid;
    });
    // add reference to missing nodes
    nodesReferencedByEdges.forEach(function (resourceId) {
      if (!relatedResourceIds.includes(resourceId)) {
        elements.push({
          'classes': [],
          'data': {
            'graph_id': 'undefined',
            'id': resourceId,
            'target': undefined,
            'source': undefined,
            'displayname': '',
            'totalRelations': 1
          },
          'selected': undefined
        });
        relatedResourceIds.push(resourceId);
      }
    });
    return elements;
  };
  this.expandNode = function (node) {
    var viz = self.viz();
    var position;
    if (viz) {
      position = self.viz().getElementById(node.id).position();
    }
    if (node.id) getResourceRelations(node.id).then(function (response) {
      return response.json();
    }).then(function (result) {
      var elements = result.related_resources.concat(result.resource_relationships).map(function (data) {
        var element = dataToElement(data);
        if (!data.source && position) {
          element.position = {
            x: position.x,
            y: position.y
          };
        }
        return element;
      });
      elements = self.addMissingNodes(elements).filter(function (element) {
        return viz.getElementById(element.data.id).length === 0;
      });
      self.viz().getElementById(node.id).lock();
      viz.add(elements);
      self.elements(viz.elements());
      var vizLayout = viz.elements().makeLayout(layout);
      vizLayout.on("layoutstop", function () {
        viz.nodes().unlock();
      });
      vizLayout.run();
    });
  };
  var getStyle = function getStyle() {
    var nodeSize = 60;
    var borderColor = '#115170';
    var borderHighlightColor = '#023047';
    var borderSelectedColor = '#000F16';
    var lineColor = '#BFBEBE';
    var selectedLineColor = '#023047';
    var borderWidth = 1;
    var hoverBorderWidth = 4;
    var selectedBorderWidth = 4;
    var styles = [{
      "selector": "node",
      "style": {
        "content": "data(displayname)",
        "font-size": "18px",
        "width": nodeSize,
        "height": nodeSize,
        "text-valign": "center",
        "text-halign": "center",
        "border-color": borderColor,
        "border-width": borderWidth
      }
    }, {
      "selector": "node.focus",
      "style": {
        "font-weight": "bold"
      }
    }, {
      "selector": "node:selected",
      "style": {
        "border-width": selectedBorderWidth,
        "border-color": borderSelectedColor
      }
    }, {
      "selector": "node.hover",
      "style": {
        "border-width": hoverBorderWidth,
        "border-color": borderHighlightColor
      }
    }, {
      "selector": "edge",
      "style": {
        "line-color": lineColor,
        "border-width": borderWidth
      }
    }, {
      "selector": "edge:selected",
      "style": {
        "width": selectedBorderWidth,
        "line-color": selectedLineColor
      }
    }, {
      "selector": "edge.hover",
      "style": {
        "width": hoverBorderWidth,
        "line-color": selectedLineColor
      }
    }];
    for (var resourceId in resourceTypeLookup) {
      var color = resourceTypeLookup[resourceId].fillColor || '#CCCCCC';
      var style = {
        "selector": "node." + resourceTypeLookup[resourceId].className,
        "style": {
          "background-color": color
        }
      };
      styles.push(style);
    }
    return styles;
  };
  var updateCytoscapeConfig = function updateCytoscapeConfig(elements) {
    self.cytoscapeConfig({
      selectionType: 'single',
      elements: elements,
      layout: layout,
      style: getStyle()
    });
  };
  var updateFocusResource = function updateFocusResource() {
    var resourceId = self.focusResourceId();
    if (resourceId) {
      var viz = self.viz();
      if (viz) {
        var element = viz.getElementById(resourceId);
        if (element) self.informationElement(element.data());
      }
      self.selection(null);
      getResourceRelations(resourceId).then(function (response) {
        return response.json();
      }).then(function (result) {
        var i = 0;
        var lookup = result['node_config_lookup'];
        for (var resourceId in lookup) {
          lookup[resourceId].className = 'resource-type-' + i;
          i++;
        }
        // add lookup for referencing a missing related resources
        lookup['undefined'] = {
          'fillColor': '#CCCCCC'
        };
        resourceTypeLookup = lookup;
        result.resource_instance.focus = true;
        result.resource_instance['total_relations'] = {
          value: result.resource_relationships.length
        };
        var elements = [dataToElement(result.resource_instance)].concat(result.related_resources.concat(result.resource_relationships).map(dataToElement));
        elements = self.addMissingNodes(elements);
        self.selection(elements[0].data);
        if (!viz) {
          updateCytoscapeConfig(elements);
        } else {
          viz.remove('*');
          viz.add(elements);
          viz.style(getStyle());
          viz.layout(layout).run();
        }
        self.elements(self.viz().elements());
      });
    }
  };
  this.focusResourceId.subscribe(updateFocusResource);
  this.viz.subscribe(function (viz) {
    if (!viz) {
      self.cytoscapeConfig(null);
      self.selection(null);
    } else {
      viz.on('select', 'node, edge', function (e) {
        // prevents multiple selection
        viz.elements().not(e.target).unselect();
        self.selection(e.target.data());
      });
      viz.on('unselect', 'node, edge', function () {
        self.selection(null);
      });
      viz.on('mouseover', 'node, edge', function (e) {
        self.hoverElementId(e.target.id());
      });
      viz.on('mouseout', 'node, edge', function () {
        self.hoverElementId(null);
      });
    }
  });
  this.hoverElementId.subscribe(function (elementId) {
    var viz = self.viz();
    if (viz) {
      viz.elements().removeClass('hover');
      if (elementId) viz.getElementById(elementId).addClass('hover');
    }
  });
  this.activeTab.subscribe(function () {
    var viz = self.viz();
    if (viz) viz.resize();
  });
  this.selection.subscribe(function (selection) {
    var mode = self.selectionMode();
    var viz = self.viz();
    if (selection) switch (mode) {
      case 'expand':
        if (selection.source) viz.elements().unselect();else self.expandNode(selection);
        break;
      case 'delete':
        var element = viz.getElementById(selection.id);
        var informationElement = self.informationElement();
        var informationElementId = informationElement ? informationElement.id : null;
        if (!selection.source) viz.edges().forEach(function (edge) {
          if (edge.source().id() === selection.id || edge.target().id() === selection.id) {
            if (edge.id() === informationElementId) self.informationElement(null);
            viz.remove(edge);
            self.elements.remove(edge);
          }
        });
        if (selection.id === informationElementId) self.informationElement(null);
        viz.remove(element);
        self.elements.remove(element);
        break;
      case 'focus':
        if (selection.source) viz.elements().unselect();else self.focusResourceId(selection.id);
        break;
      default:
        self.informationElement(selection);
        break;
    }
  });
  self.informationElement.subscribe(function (data) {
    var viz = self.viz();
    if (data) {
      if (viz) {
        var element = viz.getElementById(data.id);
        if (!element.selected()) {
          self.selectionMode('information');
          element.select();
        }
      }
      self.activeTab('information');
    }
  });
  this.selectionMode.subscribe(function () {
    var viz = self.viz();
    viz.elements().unselect();
  });
  updateFocusResource();
};
/* harmony default export */ const related_resources_graph = (knockout_latest_default().components.register('related-resources-graph', {
  viewModel: viewModel,
  template: related_resources_graph_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7UUFDcEI7TUFDSjtNQUNBdEosSUFBSSxDQUFDa0osU0FBUyxDQUFDLGFBQWEsQ0FBQztJQUNqQztFQUNKLENBQUMsQ0FBQztFQUVGLElBQUksQ0FBQ3JJLGFBQWEsQ0FBQytILFNBQVMsQ0FBQyxZQUFXO0lBQ3BDLElBQUl0SSxHQUFHLEdBQUdOLElBQUksQ0FBQ00sR0FBRyxDQUFDLENBQUM7SUFDcEJBLEdBQUcsQ0FBQ1EsUUFBUSxDQUFDLENBQUMsQ0FBQ2dJLFFBQVEsQ0FBQyxDQUFDO0VBQzdCLENBQUMsQ0FBQztFQUVGUCxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFRCw4REFBZTdJLG9DQUFhLENBQUM4SixRQUFRLENBQUMseUJBQXlCLEVBQUU7RUFDN0QxSixTQUFTLEVBQUVBLFNBQVM7RUFDcEIySixRQUFRLEVBQUU1Six1Q0FBNkJBO0FBQzNDLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9yZWxhdGVkLXJlc291cmNlcy1ncmFwaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IFdvcmtiZW5jaFZpZXdtb2RlbCBmcm9tICd2aWV3cy9jb21wb25lbnRzL3dvcmtiZW5jaCc7XG5pbXBvcnQgcmVsYXRlZFJlc291cmNlc0dyYXBoVGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvcmVsYXRlZC1yZXNvdXJjZXMtZ3JhcGguaHRtJztcbmltcG9ydCAnYmluZGluZ3MvY3l0b3NjYXBlJztcblxuXG5jb25zdCB2aWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGxheW91dCA9IHtcbiAgICAgICAgbmFtZTogXCJjb2xhXCIsXG4gICAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICAgIGRpcmVjdGVkOiB0cnVlLFxuICAgICAgICBlZGdlTGVuZ3RoOiAyMDBcbiAgICB9O1xuXG4gICAgICAgIFxuICAgIHRoaXMudml6ID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuY3l0b3NjYXBlQ29uZmlnID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZm9jdXNSZXNvdXJjZUlkID0ga28uaXNPYnNlcnZhYmxlKHBhcmFtcy5yZXNvdXJjZUlkKSA/XG4gICAgICAgIHBhcmFtcy5yZXNvdXJjZUlkIDpcbiAgICAgICAga28ub2JzZXJ2YWJsZShwYXJhbXMucmVzb3VyY2VJZCk7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5zZWxlY3Rpb25Nb2RlID0ga28ub2JzZXJ2YWJsZSgnaW5mb3JtYXRpb24nKTtcbiAgICB0aGlzLmVsZW1lbnRzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgdGhpcy5pbmZvcm1hdGlvbkVsZW1lbnQgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5pbmZvcm1hdGlvbkdyYXBoID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpbmZvcm1hdGlvbkVsZW1lbnQgPSBzZWxmLmluZm9ybWF0aW9uRWxlbWVudCgpO1xuICAgICAgICBpZiAoaW5mb3JtYXRpb25FbGVtZW50ICYmIGluZm9ybWF0aW9uRWxlbWVudC5ncmFwaF9pZClcbiAgICAgICAgICAgIHJldHVybiByZXNvdXJjZVR5cGVMb29rdXBbaW5mb3JtYXRpb25FbGVtZW50LmdyYXBoX2lkXTtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH0pO1xuICAgIHRoaXMudmlld0luZm9ybWF0aW9uTm9kZVJlcG9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaW5mb3JtYXRpb25FbGVtZW50ID0gc2VsZi5pbmZvcm1hdGlvbkVsZW1lbnQoKTtcbiAgICAgICAgaWYgKGluZm9ybWF0aW9uRWxlbWVudClcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKGFyY2hlcy51cmxzLnJlc291cmNlX3JlcG9ydCArIGluZm9ybWF0aW9uRWxlbWVudC5pZCk7XG4gICAgfTtcbiAgICB0aGlzLmVkaXRJbmZvcm1hdGlvbk5vZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGluZm9ybWF0aW9uRWxlbWVudCA9IHNlbGYuaW5mb3JtYXRpb25FbGVtZW50KCk7XG4gICAgICAgIGlmIChpbmZvcm1hdGlvbkVsZW1lbnQpXG4gICAgICAgICAgICB3aW5kb3cub3BlbihhcmNoZXMudXJscy5yZXNvdXJjZV9lZGl0b3IgKyBpbmZvcm1hdGlvbkVsZW1lbnQuaWQpO1xuICAgIH07XG4gICAgdGhpcy5ob3ZlckVsZW1lbnRJZCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLmxlZ2VuZEVudHJpZXMgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gc2VsZi5lbGVtZW50cygpO1xuICAgICAgICB2YXIgZW50cmllcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciByZXNvdXJjZVR5cGVJZCBpbiByZXNvdXJjZVR5cGVMb29rdXApIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmRhdGEoJ2dyYXBoX2lkJykgPT09IHJlc291cmNlVHlwZUlkO1xuICAgICAgICAgICAgfSkubGVuZ3RoID4gMCkgZW50cmllcy5wdXNoKHJlc291cmNlVHlwZUxvb2t1cFtyZXNvdXJjZVR5cGVJZF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgIH0pO1xuICAgIHRoaXMubm9kZVNlYXJjaEZpbHRlciA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgIHRoaXMuZXhwYW5kZWRTZWFyY2hJZCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLnNlYXJjaE5vZGVzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXIgPSBzZWxmLm5vZGVTZWFyY2hGaWx0ZXIoKTtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gc2VsZi5lbGVtZW50cygpO1xuICAgICAgICB2YXIgdml6ID0gc2VsZi52aXooKTtcbiAgICAgICAgdmFyIGZpbHRlcmVkTm9kZXMgPSBbXTtcbiAgICAgICAgaWYgKHZpeikgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5pc05vZGUoKSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZWxlbWVudC5kYXRhKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnNob3duUmVsYXRpb25zQ291bnQpIGRhdGEuc2hvd25SZWxhdGlvbnNDb3VudCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kaXNwbGF5bmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ncmFwaCA9IHJlc291cmNlVHlwZUxvb2t1cFtkYXRhLmdyYXBoX2lkXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhjbHVkZXMgdGFyZ2V0IHJlbGF0aW9uc2hpcHMgYmFjayB0byBub2RlLCB0byBwcmV2ZW50IGR1cGxpY2F0ZXNcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zaG93blJlbGF0aW9uc0NvdW50KHZpei5lZGdlcygnW3NvdXJjZSA9IFwiJyArIGRhdGEuaWQgKyAnXCJdJykubGVuZ3RoICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpei5lZGdlcygnW3RhcmdldCA9IFwiJyArIGRhdGEuaWQgKyAnXCJdW3NvdXJjZSAhPSBcIicgKyBkYXRhLmlkICsgJ1wiXScpLiBsZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE5vZGVzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkTm9kZXM7XG4gICAgfSk7XG4gICAgLy8gc3RyaXBzIFVSTCBmcm9tIHJlbGF0aW9uc2hpcCBsYWJlbHMsIGlmIHByZXNlbnQsIGZvciBwcmVzZW50YXRpb25cbiAgICB2YXIgZ2V0UmVsYXRpb25zaGlwTGFiZWwgPSBmdW5jdGlvbihlZGdlRGF0YSkge1xuICAgICAgICB2YXIgbGFiZWw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gbmV3IHdpbmRvdy5VUkwoZWRnZURhdGEucmVsYXRpb25zaGlwdHlwZV9sYWJlbCk7XG4gICAgICAgICAgICBsYWJlbCA9IHVybC5wYXRobmFtZS5zcGxpdCgnLycpW3VybC5wYXRobmFtZS5zcGxpdCgnLycpLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBsYWJlbCA9IGVkZ2VEYXRhLnJlbGF0aW9uc2hpcHR5cGVfbGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgIH07XG4gICAgdGhpcy5pbmZvcm1hdGlvbkVsZW1lbnRSZWxhdGlvbnNoaXBzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWxhdGlvbnNoaXBzID0gW107XG4gICAgICAgIHZhciBpbmZvcm1hdGlvbkVsZW1lbnQgPSBzZWxmLmluZm9ybWF0aW9uRWxlbWVudCgpO1xuICAgICAgICB2YXIgdml6ID0gc2VsZi52aXooKTtcbiAgICAgICAgc2VsZi5lbGVtZW50cygpO1xuICAgICAgICBpZiAoaW5mb3JtYXRpb25FbGVtZW50ICYmIHZpeiAmJiAhaW5mb3JtYXRpb25FbGVtZW50LnNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIHNvdXJjZUVkZ2VzID0gdml6LmVkZ2VzKCdbc291cmNlID0gXCInICsgaW5mb3JtYXRpb25FbGVtZW50LmlkICsgJ1wiXScpO1xuICAgICAgICAgICAgdmFyIHRhcmdldEVkZ2VzID0gdml6LmVkZ2VzKCdbdGFyZ2V0ID0gXCInICsgaW5mb3JtYXRpb25FbGVtZW50LmlkICsgJ1wiXScpO1xuICAgICAgICAgICAgdmFyIGFkZFJlbGF0aW9uc2hpcCA9IGZ1bmN0aW9uKGVkZ2UsIG5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVkZ2VEYXRhID0gZWRnZS5kYXRhKCk7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVEYXRhID0gZWRnZVtub2RlVHlwZV0oKS5kYXRhKCk7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gZ2V0UmVsYXRpb25zaGlwTGFiZWwoZWRnZURhdGEpO1xuXG4gICAgICAgICAgICAgICAgcmVsYXRpb25zaGlwcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBub2RlOiBub2RlRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgZWRnZTogZWRnZURhdGEsXG4gICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uRWxlbWVudDogc2VsZi5pbmZvcm1hdGlvbkVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGhvdmVyRWxlbWVudElkOiBzZWxmLmhvdmVyRWxlbWVudElkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc291cmNlRWRnZXMuZm9yRWFjaChmdW5jdGlvbihlZGdlKSB7XG4gICAgICAgICAgICAgICAgYWRkUmVsYXRpb25zaGlwKGVkZ2UsICd0YXJnZXQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGFyZ2V0RWRnZXMuZm9yRWFjaChmdW5jdGlvbihlZGdlKSB7XG4gICAgICAgICAgICAgICAgLy8gZXhjbHVkZXMgdGFyZ2V0IHJlbGF0aW9uc2hpcHMgYmFjayB0byBub2RlLCB0byBwcmV2ZW50IGR1cGxpY2F0ZXNcbiAgICAgICAgICAgICAgICBpZiAoZWRnZS5zb3VyY2UoKS5pZCgpICE9PSBlZGdlLnRhcmdldCgpLmlkKCkpXG4gICAgICAgICAgICAgICAgICAgIGFkZFJlbGF0aW9uc2hpcChlZGdlLCAnc291cmNlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVsYXRpb25zaGlwcztcbiAgICB9KTtcbiAgICB0aGlzLmVkZ2VJbmZvcm1hdGlvbiA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaW5mb3JtYXRpb25FbGVtZW50ID0gc2VsZi5pbmZvcm1hdGlvbkVsZW1lbnQoKTtcbiAgICAgICAgdmFyIHZpeiA9IHNlbGYudml6KCk7XG4gICAgICAgIGlmIChpbmZvcm1hdGlvbkVsZW1lbnQgJiYgdml6ICYmIGluZm9ybWF0aW9uRWxlbWVudC5zb3VyY2UpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2VEYXRhID0gdml6LmdldEVsZW1lbnRCeUlkKGluZm9ybWF0aW9uRWxlbWVudC5zb3VyY2UpLmRhdGEoKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXREYXRhID0gdml6LmdldEVsZW1lbnRCeUlkKGluZm9ybWF0aW9uRWxlbWVudC50YXJnZXQpLmRhdGEoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IGluZm9ybWF0aW9uRWxlbWVudC5pZCxcbiAgICAgICAgICAgICAgICBsYWJlbDogZ2V0UmVsYXRpb25zaGlwTGFiZWwoaW5mb3JtYXRpb25FbGVtZW50KSxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZURhdGEsXG4gICAgICAgICAgICAgICAgc291cmNlR3JhcGg6IHJlc291cmNlVHlwZUxvb2t1cFtzb3VyY2VEYXRhWydncmFwaF9pZCddXSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldERhdGEsXG4gICAgICAgICAgICAgICAgdGFyZ2V0R3JhcGg6IHJlc291cmNlVHlwZUxvb2t1cFt0YXJnZXREYXRhWydncmFwaF9pZCddXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgV29ya2JlbmNoVmlld21vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcblxuICAgIHZhciBnZXRSZXNvdXJjZVJlbGF0aW9ucyA9IGZ1bmN0aW9uKHJlc291cmNlSWQpIHtcbiAgICAgICAgdmFyIHVybCA9IGAke2FyY2hlcy51cmxzLnJlbGF0ZWRfcmVzb3VyY2VzfSR7cmVzb3VyY2VJZH0/cGFnaW5hdGU9ZmFsc2UmbGFuZz0ke2FyY2hlcy5hY3RpdmVMYW5ndWFnZX1gO1xuICAgICAgICByZXR1cm4gd2luZG93LmZldGNoKHVybCk7XG4gICAgfTtcbiAgICB2YXIgcmVzb3VyY2VUeXBlTG9va3VwID0ge307XG4gICAgdmFyIGRhdGFUb0VsZW1lbnQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGRhdGEuc291cmNlID0gZGF0YS5mcm9tX3Jlc291cmNlO1xuICAgICAgICBkYXRhLnRhcmdldCA9IGRhdGEudG9fcmVzb3VyY2U7XG4gICAgICAgIGlmIChkYXRhLnNvdXJjZSkge1xuICAgICAgICAgICAgZGF0YS5pZCA9IGRhdGEucmVzb3VyY2V4aWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhLmlkID0gZGF0YS5yZXNvdXJjZWluc3RhbmNlaWQ7XG4gICAgICAgICAgICBkYXRhLnRvdGFsUmVsYXRpb25zID0gZGF0YS50b3RhbF9yZWxhdGlvbnMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgICAgICAgaWYgKGRhdGEuZ3JhcGhfaWQpIGNsYXNzZXMucHVzaChyZXNvdXJjZVR5cGVMb29rdXBbZGF0YS5ncmFwaF9pZF0uY2xhc3NOYW1lKTtcbiAgICAgICAgaWYgKGRhdGEuZm9jdXMpIGNsYXNzZXMucHVzaCgnZm9jdXMnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IGRhdGEuZm9jdXNcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHRoaXMucmVmcmVzaExheW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdml6ID0gc2VsZi52aXooKTtcbiAgICAgICAgaWYgKHZpeikge1xuICAgICAgICAgICAgdml6LmVsZW1lbnRzKCkubWFrZUxheW91dChsYXlvdXQpLnJ1bigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmFkZE1pc3NpbmdOb2RlcyA9IGZ1bmN0aW9uKGVsZW1lbnRzKXtcbiAgICAgICAgdmFyIG5vZGVzUmVmZXJlbmNlZEJ5RWRnZXMgPSBbXTtcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGUpe1xuICAgICAgICAgICAgaWYoISFlbGUuZGF0YS5zb3VyY2Upe1xuICAgICAgICAgICAgICAgIG5vZGVzUmVmZXJlbmNlZEJ5RWRnZXMucHVzaChlbGUuZGF0YS5zb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoISFlbGUuZGF0YS50YXJnZXQpe1xuICAgICAgICAgICAgICAgIG5vZGVzUmVmZXJlbmNlZEJ5RWRnZXMucHVzaChlbGUuZGF0YS50YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHJlbGF0ZWRSZXNvdXJjZUlkcyA9IGVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbihlbGUpe1xuICAgICAgICAgICAgcmV0dXJuICEhZWxlLmRhdGEucmVzb3VyY2VpbnN0YW5jZWlkO1xuICAgICAgICB9KS5tYXAoZnVuY3Rpb24oZWxlKXtcbiAgICAgICAgICAgIHJldHVybiBlbGUuZGF0YS5yZXNvdXJjZWluc3RhbmNlaWQ7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhZGQgcmVmZXJlbmNlIHRvIG1pc3Npbmcgbm9kZXNcbiAgICAgICAgbm9kZXNSZWZlcmVuY2VkQnlFZGdlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc291cmNlSWQpe1xuICAgICAgICAgICAgaWYoIXJlbGF0ZWRSZXNvdXJjZUlkcy5pbmNsdWRlcyhyZXNvdXJjZUlkKSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICdjbGFzc2VzJzpbXSxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOntcbiAgICAgICAgICAgICAgICAgICAgICAgICdncmFwaF9pZCc6ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogcmVzb3VyY2VJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXQnOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc291cmNlJzogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXluYW1lJzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAndG90YWxSZWxhdGlvbnMnOiAxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdzZWxlY3RlZCc6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlbGF0ZWRSZXNvdXJjZUlkcy5wdXNoKHJlc291cmNlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgIH07XG4gICAgdGhpcy5leHBhbmROb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICB2YXIgdml6ID0gc2VsZi52aXooKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uO1xuICAgICAgICBpZiAodml6KSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHNlbGYudml6KCkuZ2V0RWxlbWVudEJ5SWQobm9kZS5pZCkucG9zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5pZCkgZ2V0UmVzb3VyY2VSZWxhdGlvbnMobm9kZS5pZClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSByZXN1bHQucmVsYXRlZF9yZXNvdXJjZXMuY29uY2F0KHJlc3VsdC5yZXNvdXJjZV9yZWxhdGlvbnNoaXBzKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZGF0YVRvRWxlbWVudChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5zb3VyY2UgJiYgcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBwb3NpdGlvbi55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB9KTsgICAgXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzZWxmLmFkZE1pc3NpbmdOb2RlcyhlbGVtZW50cylcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdml6LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQuZGF0YS5pZCkubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLnZpeigpLmdldEVsZW1lbnRCeUlkKG5vZGUuaWQpLmxvY2soKTtcbiAgICAgICAgICAgICAgICB2aXouYWRkKGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICBzZWxmLmVsZW1lbnRzKHZpei5lbGVtZW50cygpKTtcbiAgICAgICAgICAgICAgICB2YXIgdml6TGF5b3V0ID0gdml6LmVsZW1lbnRzKCkubWFrZUxheW91dChsYXlvdXQpO1xuICAgICAgICAgICAgICAgIHZpekxheW91dC5vbihcImxheW91dHN0b3BcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpei5ub2RlcygpLnVubG9jaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZpekxheW91dC5ydW4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldFN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBub2RlU2l6ZSA9IDYwO1xuICAgICAgICB2YXIgYm9yZGVyQ29sb3IgPSAnIzExNTE3MCc7XG4gICAgICAgIHZhciBib3JkZXJIaWdobGlnaHRDb2xvciA9ICcjMDIzMDQ3JztcbiAgICAgICAgdmFyIGJvcmRlclNlbGVjdGVkQ29sb3IgPSAnIzAwMEYxNic7XG4gICAgICAgIHZhciBsaW5lQ29sb3IgPSAnI0JGQkVCRSc7XG4gICAgICAgIHZhciBzZWxlY3RlZExpbmVDb2xvciA9ICcjMDIzMDQ3JztcbiAgICAgICAgdmFyIGJvcmRlcldpZHRoID0gMTtcbiAgICAgICAgdmFyIGhvdmVyQm9yZGVyV2lkdGggPSA0O1xuICAgICAgICB2YXIgc2VsZWN0ZWRCb3JkZXJXaWR0aCA9IDQ7XG4gICAgICAgIHZhciBzdHlsZXMgPSBbe1xuICAgICAgICAgICAgXCJzZWxlY3RvclwiOiBcIm5vZGVcIixcbiAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcImRhdGEoZGlzcGxheW5hbWUpXCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxOHB4XCIsXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBub2RlU2l6ZSxcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBub2RlU2l6ZSxcbiAgICAgICAgICAgICAgICBcInRleHQtdmFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWhhbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbG9yXCI6IGJvcmRlckNvbG9yLFxuICAgICAgICAgICAgICAgIFwiYm9yZGVyLXdpZHRoXCI6IGJvcmRlcldpZHRoXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIFwic2VsZWN0b3JcIjogXCJub2RlLmZvY3VzXCIsXG4gICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIFwic2VsZWN0b3JcIjogXCJub2RlOnNlbGVjdGVkXCIsXG4gICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci13aWR0aFwiOiBzZWxlY3RlZEJvcmRlcldpZHRoLFxuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbG9yXCI6IGJvcmRlclNlbGVjdGVkQ29sb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgXCJzZWxlY3RvclwiOiBcIm5vZGUuaG92ZXJcIixcbiAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyLXdpZHRoXCI6IGhvdmVyQm9yZGVyV2lkdGgsXG4gICAgICAgICAgICAgICAgXCJib3JkZXItY29sb3JcIjogYm9yZGVySGlnaGxpZ2h0Q29sb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgXCJzZWxlY3RvclwiOiBcImVkZ2VcIixcbiAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwibGluZS1jb2xvclwiOiBsaW5lQ29sb3IsXG4gICAgICAgICAgICAgICAgXCJib3JkZXItd2lkdGhcIjogYm9yZGVyV2lkdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgXCJzZWxlY3RvclwiOiBcImVkZ2U6c2VsZWN0ZWRcIixcbiAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogc2VsZWN0ZWRCb3JkZXJXaWR0aCxcbiAgICAgICAgICAgICAgICBcImxpbmUtY29sb3JcIjogc2VsZWN0ZWRMaW5lQ29sb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgXCJzZWxlY3RvclwiOiBcImVkZ2UuaG92ZXJcIixcbiAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogaG92ZXJCb3JkZXJXaWR0aCxcbiAgICAgICAgICAgICAgICBcImxpbmUtY29sb3JcIjogc2VsZWN0ZWRMaW5lQ29sb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV07XG4gICAgICAgIGZvciAodmFyIHJlc291cmNlSWQgaW4gcmVzb3VyY2VUeXBlTG9va3VwKSB7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSByZXNvdXJjZVR5cGVMb29rdXBbcmVzb3VyY2VJZF0uZmlsbENvbG9yIHx8ICcjQ0NDQ0NDJztcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBcInNlbGVjdG9yXCI6IFwibm9kZS5cIiArIHJlc291cmNlVHlwZUxvb2t1cFtyZXNvdXJjZUlkXS5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBjb2xvclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzdHlsZXMucHVzaChzdHlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9O1xuICAgIHZhciB1cGRhdGVDeXRvc2NhcGVDb25maWcgPSBmdW5jdGlvbihlbGVtZW50cykge1xuICAgICAgICBzZWxmLmN5dG9zY2FwZUNvbmZpZyh7XG4gICAgICAgICAgICBzZWxlY3Rpb25UeXBlOiAnc2luZ2xlJyxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBlbGVtZW50cyxcbiAgICAgICAgICAgIGxheW91dDogbGF5b3V0LFxuICAgICAgICAgICAgc3R5bGU6IGdldFN0eWxlKClcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgdXBkYXRlRm9jdXNSZXNvdXJjZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzb3VyY2VJZCA9IHNlbGYuZm9jdXNSZXNvdXJjZUlkKCk7XG4gICAgICAgIGlmIChyZXNvdXJjZUlkKSB7XG4gICAgICAgICAgICB2YXIgdml6ID0gc2VsZi52aXooKTtcbiAgICAgICAgICAgIGlmICh2aXopIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHZpei5nZXRFbGVtZW50QnlJZChyZXNvdXJjZUlkKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCkgc2VsZi5pbmZvcm1hdGlvbkVsZW1lbnQoZWxlbWVudC5kYXRhKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGlvbihudWxsKTtcbiAgICAgICAgICAgIGdldFJlc291cmNlUmVsYXRpb25zKHJlc291cmNlSWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb29rdXAgPSByZXN1bHRbJ25vZGVfY29uZmlnX2xvb2t1cCddO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByZXNvdXJjZUlkIGluIGxvb2t1cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9va3VwW3Jlc291cmNlSWRdLmNsYXNzTmFtZSA9ICdyZXNvdXJjZS10eXBlLScgKyBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBsb29rdXAgZm9yIHJlZmVyZW5jaW5nIGEgbWlzc2luZyByZWxhdGVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICBsb29rdXBbJ3VuZGVmaW5lZCddID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpbGxDb2xvcic6ICcjQ0NDQ0NDJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZVR5cGVMb29rdXAgPSBsb29rdXA7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZXNvdXJjZV9pbnN0YW5jZS5mb2N1cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZXNvdXJjZV9pbnN0YW5jZVsndG90YWxfcmVsYXRpb25zJ10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LnJlc291cmNlX3JlbGF0aW9uc2hpcHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IFtkYXRhVG9FbGVtZW50KHJlc3VsdC5yZXNvdXJjZV9pbnN0YW5jZSldXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZWxhdGVkX3Jlc291cmNlcy5jb25jYXQocmVzdWx0LnJlc291cmNlX3JlbGF0aW9uc2hpcHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZGF0YVRvRWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc2VsZi5hZGRNaXNzaW5nTm9kZXMoZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGlvbihlbGVtZW50c1swXS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2aXopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUN5dG9zY2FwZUNvbmZpZyhlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXoucmVtb3ZlKCcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXouYWRkKGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpei5zdHlsZShnZXRTdHlsZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpei5sYXlvdXQobGF5b3V0KS5ydW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmVsZW1lbnRzKHNlbGYudml6KCkuZWxlbWVudHMoKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5mb2N1c1Jlc291cmNlSWQuc3Vic2NyaWJlKHVwZGF0ZUZvY3VzUmVzb3VyY2UpO1xuICAgIHRoaXMudml6LnN1YnNjcmliZShmdW5jdGlvbih2aXopIHtcbiAgICAgICAgaWYgKCF2aXopIHtcbiAgICAgICAgICAgIHNlbGYuY3l0b3NjYXBlQ29uZmlnKG51bGwpO1xuICAgICAgICAgICAgc2VsZi5zZWxlY3Rpb24obnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2aXoub24oJ3NlbGVjdCcsICdub2RlLCBlZGdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIC8vIHByZXZlbnRzIG11bHRpcGxlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIHZpei5lbGVtZW50cygpLm5vdChlLnRhcmdldCkudW5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGlvbihlLnRhcmdldC5kYXRhKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aXoub24oJ3Vuc2VsZWN0JywgJ25vZGUsIGVkZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGlvbihudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdml6Lm9uKCdtb3VzZW92ZXInLCAnbm9kZSwgZWRnZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhvdmVyRWxlbWVudElkKGUudGFyZ2V0LmlkKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aXoub24oJ21vdXNlb3V0JywgJ25vZGUsIGVkZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhvdmVyRWxlbWVudElkKG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaG92ZXJFbGVtZW50SWQuc3Vic2NyaWJlKGZ1bmN0aW9uKGVsZW1lbnRJZCkge1xuICAgICAgICB2YXIgdml6ID0gc2VsZi52aXooKTtcbiAgICAgICAgaWYgKHZpeikge1xuICAgICAgICAgICAgdml6LmVsZW1lbnRzKCkucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudElkKSB2aXouZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKS5hZGRDbGFzcygnaG92ZXInKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmVUYWIuc3Vic2NyaWJlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdml6ID0gc2VsZi52aXooKTtcbiAgICAgICAgaWYgKHZpeikgdml6LnJlc2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3Rpb24uc3Vic2NyaWJlKGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICB2YXIgbW9kZSA9IHNlbGYuc2VsZWN0aW9uTW9kZSgpO1xuICAgICAgICB2YXIgdml6ID0gc2VsZi52aXooKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvbikgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgIGNhc2UgJ2V4cGFuZCc6XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLnNvdXJjZSkgdml6LmVsZW1lbnRzKCkudW5zZWxlY3QoKTtcbiAgICAgICAgICAgIGVsc2Ugc2VsZi5leHBhbmROb2RlKHNlbGVjdGlvbik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdml6LmdldEVsZW1lbnRCeUlkKHNlbGVjdGlvbi5pZCk7XG4gICAgICAgICAgICB2YXIgaW5mb3JtYXRpb25FbGVtZW50ID0gc2VsZi5pbmZvcm1hdGlvbkVsZW1lbnQoKTtcbiAgICAgICAgICAgIHZhciBpbmZvcm1hdGlvbkVsZW1lbnRJZCA9IGluZm9ybWF0aW9uRWxlbWVudCA/IGluZm9ybWF0aW9uRWxlbWVudC5pZCA6IG51bGw7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdGlvbi5zb3VyY2UpIHZpei5lZGdlcygpLmZvckVhY2goZnVuY3Rpb24oZWRnZSkge1xuICAgICAgICAgICAgICAgIGlmIChlZGdlLnNvdXJjZSgpLmlkKCkgPT09IHNlbGVjdGlvbi5pZCB8fFxuICAgICAgICAgICAgICAgICAgICBlZGdlLnRhcmdldCgpLmlkKCkgPT09IHNlbGVjdGlvbi5pZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWRnZS5pZCgpID09PSBpbmZvcm1hdGlvbkVsZW1lbnRJZCkgc2VsZi5pbmZvcm1hdGlvbkVsZW1lbnQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHZpei5yZW1vdmUoZWRnZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZWxlbWVudHMucmVtb3ZlKGVkZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5pZCA9PT0gaW5mb3JtYXRpb25FbGVtZW50SWQpIHNlbGYuaW5mb3JtYXRpb25FbGVtZW50KG51bGwpO1xuICAgICAgICAgICAgdml6LnJlbW92ZShlbGVtZW50KTtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudHMucmVtb3ZlKGVsZW1lbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24uc291cmNlKSB2aXouZWxlbWVudHMoKS51bnNlbGVjdCgpO1xuICAgICAgICAgICAgZWxzZSBzZWxmLmZvY3VzUmVzb3VyY2VJZChzZWxlY3Rpb24uaWQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzZWxmLmluZm9ybWF0aW9uRWxlbWVudChzZWxlY3Rpb24pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlbGYuaW5mb3JtYXRpb25FbGVtZW50LnN1YnNjcmliZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciB2aXogPSBzZWxmLnZpeigpO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKHZpeikge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdml6LmdldEVsZW1lbnRCeUlkKGRhdGEuaWQpO1xuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudC5zZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0aW9uTW9kZSgnaW5mb3JtYXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmFjdGl2ZVRhYignaW5mb3JtYXRpb24nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3Rpb25Nb2RlLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZpeiA9IHNlbGYudml6KCk7XG4gICAgICAgIHZpei5lbGVtZW50cygpLnVuc2VsZWN0KCk7XG4gICAgfSk7XG5cbiAgICB1cGRhdGVGb2N1c1Jlc291cmNlKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdyZWxhdGVkLXJlc291cmNlcy1ncmFwaCcsIHtcbiAgICB2aWV3TW9kZWw6IHZpZXdNb2RlbCxcbiAgICB0ZW1wbGF0ZTogcmVsYXRlZFJlc291cmNlc0dyYXBoVGVtcGxhdGUsXG59KTtcbiJdLCJuYW1lcyI6WyJrbyIsImFyY2hlcyIsIldvcmtiZW5jaFZpZXdtb2RlbCIsInJlbGF0ZWRSZXNvdXJjZXNHcmFwaFRlbXBsYXRlIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsImxheW91dCIsIm5hbWUiLCJhbmltYXRlIiwiZGlyZWN0ZWQiLCJlZGdlTGVuZ3RoIiwidml6Iiwib2JzZXJ2YWJsZSIsImN5dG9zY2FwZUNvbmZpZyIsImZvY3VzUmVzb3VyY2VJZCIsImlzT2JzZXJ2YWJsZSIsInJlc291cmNlSWQiLCJzZWxlY3Rpb24iLCJzZWxlY3Rpb25Nb2RlIiwiZWxlbWVudHMiLCJvYnNlcnZhYmxlQXJyYXkiLCJpbmZvcm1hdGlvbkVsZW1lbnQiLCJpbmZvcm1hdGlvbkdyYXBoIiwiY29tcHV0ZWQiLCJncmFwaF9pZCIsInJlc291cmNlVHlwZUxvb2t1cCIsInZpZXdJbmZvcm1hdGlvbk5vZGVSZXBvcnQiLCJ3aW5kb3ciLCJvcGVuIiwidXJscyIsInJlc291cmNlX3JlcG9ydCIsImlkIiwiZWRpdEluZm9ybWF0aW9uTm9kZSIsInJlc291cmNlX2VkaXRvciIsImhvdmVyRWxlbWVudElkIiwibGVnZW5kRW50cmllcyIsImVudHJpZXMiLCJyZXNvdXJjZVR5cGVJZCIsImZpbHRlciIsImVsZW1lbnQiLCJkYXRhIiwibGVuZ3RoIiwicHVzaCIsIm5vZGVTZWFyY2hGaWx0ZXIiLCJleHBhbmRlZFNlYXJjaElkIiwic2VhcmNoTm9kZXMiLCJmaWx0ZXJlZE5vZGVzIiwiZm9yRWFjaCIsImlzTm9kZSIsInNob3duUmVsYXRpb25zQ291bnQiLCJkaXNwbGF5bmFtZSIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImdyYXBoIiwiZWRnZXMiLCJnZXRSZWxhdGlvbnNoaXBMYWJlbCIsImVkZ2VEYXRhIiwibGFiZWwiLCJ1cmwiLCJVUkwiLCJyZWxhdGlvbnNoaXB0eXBlX2xhYmVsIiwicGF0aG5hbWUiLCJzcGxpdCIsImUiLCJpbmZvcm1hdGlvbkVsZW1lbnRSZWxhdGlvbnNoaXBzIiwicmVsYXRpb25zaGlwcyIsInNvdXJjZSIsInNvdXJjZUVkZ2VzIiwidGFyZ2V0RWRnZXMiLCJhZGRSZWxhdGlvbnNoaXAiLCJlZGdlIiwibm9kZVR5cGUiLCJub2RlRGF0YSIsIm5vZGUiLCJ0YXJnZXQiLCJlZGdlSW5mb3JtYXRpb24iLCJzb3VyY2VEYXRhIiwiZ2V0RWxlbWVudEJ5SWQiLCJ0YXJnZXREYXRhIiwic291cmNlR3JhcGgiLCJ0YXJnZXRHcmFwaCIsImFwcGx5IiwiZ2V0UmVzb3VyY2VSZWxhdGlvbnMiLCJjb25jYXQiLCJyZWxhdGVkX3Jlc291cmNlcyIsImFjdGl2ZUxhbmd1YWdlIiwiZmV0Y2giLCJkYXRhVG9FbGVtZW50IiwiZnJvbV9yZXNvdXJjZSIsInRvX3Jlc291cmNlIiwicmVzb3VyY2V4aWQiLCJyZXNvdXJjZWluc3RhbmNlaWQiLCJ0b3RhbFJlbGF0aW9ucyIsInRvdGFsX3JlbGF0aW9ucyIsInZhbHVlIiwiY2xhc3NlcyIsImNsYXNzTmFtZSIsImZvY3VzIiwic2VsZWN0ZWQiLCJyZWZyZXNoTGF5b3V0IiwibWFrZUxheW91dCIsInJ1biIsImFkZE1pc3NpbmdOb2RlcyIsIm5vZGVzUmVmZXJlbmNlZEJ5RWRnZXMiLCJlbGUiLCJyZWxhdGVkUmVzb3VyY2VJZHMiLCJtYXAiLCJpbmNsdWRlcyIsInVuZGVmaW5lZCIsImV4cGFuZE5vZGUiLCJwb3NpdGlvbiIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJyZXN1bHQiLCJyZXNvdXJjZV9yZWxhdGlvbnNoaXBzIiwieCIsInkiLCJsb2NrIiwiYWRkIiwidml6TGF5b3V0Iiwib24iLCJub2RlcyIsInVubG9jayIsImdldFN0eWxlIiwibm9kZVNpemUiLCJib3JkZXJDb2xvciIsImJvcmRlckhpZ2hsaWdodENvbG9yIiwiYm9yZGVyU2VsZWN0ZWRDb2xvciIsImxpbmVDb2xvciIsInNlbGVjdGVkTGluZUNvbG9yIiwiYm9yZGVyV2lkdGgiLCJob3ZlckJvcmRlcldpZHRoIiwic2VsZWN0ZWRCb3JkZXJXaWR0aCIsInN0eWxlcyIsImNvbG9yIiwiZmlsbENvbG9yIiwic3R5bGUiLCJ1cGRhdGVDeXRvc2NhcGVDb25maWciLCJzZWxlY3Rpb25UeXBlIiwidXBkYXRlRm9jdXNSZXNvdXJjZSIsImkiLCJsb29rdXAiLCJyZXNvdXJjZV9pbnN0YW5jZSIsInJlbW92ZSIsInN1YnNjcmliZSIsIm5vdCIsInVuc2VsZWN0IiwiZWxlbWVudElkIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImFjdGl2ZVRhYiIsInJlc2l6ZSIsIm1vZGUiLCJpbmZvcm1hdGlvbkVsZW1lbnRJZCIsInNlbGVjdCIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=