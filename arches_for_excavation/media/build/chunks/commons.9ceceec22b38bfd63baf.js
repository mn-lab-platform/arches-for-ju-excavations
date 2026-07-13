"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[6303],{

/***/ 6303:
/*!***************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/models/graph.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var models_abstract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! models/abstract */ 47797);
/* harmony import */ var models_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! models/node */ 26663);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_5__);






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (models_abstract__WEBPACK_IMPORTED_MODULE_2__["default"].extend({
  /**
  * A backbone model to manage graph data
  * @augments AbstractModel
  * @constructor
  * @name GraphModel
  */

  url: arches__WEBPACK_IMPORTED_MODULE_1__["default"].urls.graph,
  constructor: function constructor(attributes, options) {
    options || (options = {});
    options.parse = true;
    models_abstract__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.constructor.call(this, attributes, options);
  },
  /**
  * Flags the passed in node as selected
  * @memberof GraphModel.prototype
  * @param {NodeModel} node - the node to be selected
  */
  selectNode: function selectNode(newly_selected_node) {
    this.trigger('select-node', newly_selected_node);
    var currentlySelectedNode = this.get('selectedNode')();
    if (currentlySelectedNode && currentlySelectedNode.dirty()) {
      return false;
    } else {
      this.get('nodes')().forEach(function (node) {
        if (node !== newly_selected_node) {
          node.selected(false);
        }
      });
      newly_selected_node.selected(true);
      return true;
    }
  },
  /**
   * deleteNode - deletes the passed in node from the db and updates the graph
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node to be deleted
   * @param  {function} callback - (optional) a callback function
   * @param  {object} scope - (optional) the scope used for the callback
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  deleteNode: function deleteNode(node, callback, scope) {
    return this._doRequest({
      type: "DELETE",
      url: this.url + this.get('graphid') + '/delete_node',
      data: JSON.stringify({
        nodeid: node.nodeid
      })
    }, function (response, status) {
      if (status === 'success' && response.responseJSON) {
        var parentNode = this.getParentNode(node);
        var _getEdges = function getEdges(node) {
          var edges = this.get('edges')().filter(function (edge) {
            return edge.domainnode_id === node.nodeid;
          });
          var nodes = edges.map(function (edge) {
            return this.get('nodes')().find(function (node) {
              return edge.rangenode_id === node.nodeid;
            });
          }, this);
          nodes.forEach(function (node) {
            edges = edges.concat(_getEdges.call(this, node));
          }, this);
          return edges;
        };
        var edges = _getEdges.call(this, node);
        var nodes = edges.map(function (edge) {
          return this.get('nodes')().find(function (node) {
            return edge.rangenode_id === node.nodeid;
          });
        }, this);
        var edge = this.get('edges')().find(function (edge) {
          return edge.rangenode_id === node.nodeid;
        });
        nodes.push(node);
        edges.push(edge);
        if (node.isCollector()) {
          this.get('cards').remove(function (card) {
            return card.nodegroup_id === node.nodeid;
          });
        }
        this.get('edges').remove(function (edge) {
          return underscore__WEBPACK_IMPORTED_MODULE_5___default().contains(edges, edge);
        });
        this.get('nodes').remove(function (node) {
          return underscore__WEBPACK_IMPORTED_MODULE_5___default().contains(nodes, node);
        });
        parentNode.childNodes.remove(node);
        parentNode.selected(true);

        // adds event to trigger dirty state in graph-designer
        document.dispatchEvent(new Event('deleteNode'));
      } else {
        this.trigger('error', response, 'deleteNode');
      }
      if (typeof callback === 'function') {
        scope = scope || this;
        callback.call(scope, response, status);
      }
    }, this, 'changed');
  },
  /**
   * getParentNode - gets the parent node of the passed in node
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node whose parent should be retrieved
   * @return {object} the parent node of the passed in node
   * If parent node of the passed in node can't be found then reutrn passed in node.
   */
  getParentNode: function getParentNode(node) {
    var edge = this.get('edges')().find(function (edge) {
      return edge.rangenode_id === node.nodeid;
    });
    if (edge) {
      return this.get('nodes')().find(function (node) {
        return edge.domainnode_id === node.nodeid;
      });
    } else {
      return node;
    }
  },
  /**
   * appendBranch - appends a graph onto a specific node within this graph
   * @memberof GraphModel.prototype
   * @param  {string} node - the node within this graph that we're connecting the branch to
   * @param  {string} property - the ontology property to use to connect the branch, leave null to use the first available property
   * @param  {string} branch_graph - the {@link GraphModel} we're appending to this graph
   * @param  {function} callback - the function to call after the response returns from the server
   * @param  {object} scope - the value of "this" in the callback function
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  appendBranch: function appendBranch(node, property, branch_graph, callback, scope) {
    property = property ? property : null;
    if (property === null) {
      if (this.get('selectedNode')().ontologyclass()) {
        var ontology_connection = underscore__WEBPACK_IMPORTED_MODULE_5___default().find(branch_graph.get('domain_connections'), function (domain_connection) {
          return underscore__WEBPACK_IMPORTED_MODULE_5___default().find(domain_connection.ontology_classes, function (ontology_class) {
            return ontology_class === this.get('selectedNode')().ontologyclass();
          }, this);
        }, this);
        if (ontology_connection) {
          property = ontology_connection.ontology_property;
        } else {
          if (typeof callback === 'function') {
            scope = scope || self;
            callback.call(scope, null, 'failed');
          }
          return;
        }
      }
    }
    return this._doRequest({
      type: "POST",
      url: this.url + this.get('graphid') + '/append_branch',
      data: JSON.stringify({
        nodeid: node.nodeid,
        property: property,
        graphid: branch_graph.get('graphid'),
        return_appended_graph: true
      })
    }, function (response, status) {
      if (status === 'success' && response.responseJSON) {
        var branchroot = response.responseJSON.root;
        response.responseJSON.nodes.forEach(function (node) {
          this.get('nodes').push(new models_node__WEBPACK_IMPORTED_MODULE_3__["default"]({
            source: node,
            datatypelookup: this.get('datatypelookup'),
            graph: this,
            "ontology_namespaces": this.get('root').ontology_namespaces
          }));
        }, this);
        response.responseJSON.edges.forEach(function (edge) {
          this.get('edges').push(edge);
        }, this);
        this.set('nodegroups', response.responseJSON.nodegroups);
        response.responseJSON.cards_x_nodes_x_widgets.forEach(function (widget) {
          this.get('cardwidgets').push(widget);
        }, this);
        this.get('cards')(this.get('cards')().concat(response.responseJSON.cards));
        if (!this.get('isresource')) {
          this.get('nodes')().forEach(function (node) {
            node.selected(false);
            if (node.nodeid === branchroot.nodeid) {
              node.selected(true);
            }
          });
        }
        this.constructTree(null, null, response.responseJSON.edges, true);
      } else {
        this.trigger('error', response, 'appendBranch');
      }
      if (typeof callback === 'function') {
        scope = scope || this;
        callback.call(scope, response, status);
      }
    }, this, 'changed');
  },
  /**
   * appendNode - appends a graph onto a specific node within this graph
   * @memberof GraphModel.prototype
   * @param  {string} node - the node within this graph onto which we're appending a new node
   * @param  {function} callback - the function to call after the response returns from the server
   * @param  {object} scope - the value of "this" in the callback function
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  appendNode: function appendNode(node, callback, scope) {
    return this._doRequest({
      type: "POST",
      url: this.url + this.get('graphid') + '/append_node',
      data: JSON.stringify({
        nodeid: node.nodeid
      })
    }, function (response, status) {
      if (status === 'success' && response.responseJSON) {
        var nodeSource = response.responseJSON.node;
        nodeSource.parentproperty = response.responseJSON.edge.ontologyproperty;
        var newNode = new models_node__WEBPACK_IMPORTED_MODULE_3__["default"]({
          source: nodeSource,
          datatypelookup: this.get('datatypelookup'),
          graph: this,
          "ontology_namespaces": this.get('root').ontology_namespaces
        });
        newNode.childNodes = knockout__WEBPACK_IMPORTED_MODULE_4___default().observableArray([]);
        this.get('nodes').push(newNode);
        this.get('edges').push(response.responseJSON.edge);
        node.childNodes.unshift(newNode);

        // we set these to empty strings so that a user can easily choose the 
        // onology class and property they want instead of having to unselect 
        // the values chosen by default
        newNode.ontologyclass('');
        newNode.parentproperty('');
        if (!this.get('isresource')) {
          this.selectNode(newNode);
        }
      } else {
        this.trigger('error', response, 'appendNode');
      }
      if (typeof callback === 'function') {
        scope = scope || this;
        callback.call(scope, response, status);
      }
    }, this, 'changed');
  },
  /**
   * moveNode - moves a node from one part of the graph to another
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node within this graph that we're moving
   * @param  {string} property - the ontology property to use to connect the branch
   * @param  {NodeModel} newParentNode - the node to which we moved our branch to
   * @param  {function} callback - the function to call after the response returns from the server
   * @param  {object} scope - the value of "this" in the callback function
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  moveNode: function moveNode(node, property, newParentNode, callback, scope) {
    return this._doRequest({
      type: "POST",
      url: this.url + this.get('graphid') + '/move_node',
      data: JSON.stringify({
        nodeid: node.nodeid,
        property: property,
        newparentnodeid: newParentNode.nodeid
      })
    }, function (response, status) {
      if (status === 'success' && response.responseJSON) {
        this.get('edges')().find(function (edge) {
          if (edge.edgeid === response.responseJSON.edges[0].edgeid) {
            edge.domainnode_id = response.responseJSON.edges[0].domainnode_id;
            return true;
          }
          return false;
        });
        this.get('nodes')().forEach(function (node) {
          var found_node = response.responseJSON.nodes.find(function (response_node) {
            return response_node.nodeid === node.nodeid;
          });
          if (found_node) {
            node.parse(found_node);
          }
        });
      } else {
        this.trigger('error', response, 'moveNode');
      }
      if (typeof callback === 'function') {
        scope = scope || this;
        callback.call(scope, response, status);
      }
    }, this, 'changed');
  },
  /**
   * updateNode - updates the values of a node
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node with updated values
   * @param  {function} callback - the function to call after the response returns from the server
   * @param  {object} scope - the value of "this" in the callback function
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  updateNode: function updateNode(node, callback, scope) {
    return this._doRequest({
      type: "POST",
      url: this.url + this.get('graphid') + '/update_node',
      data: JSON.stringify(node.toJSON())
    }, function (response, status) {
      if (status === 'success' && response.responseJSON) {
        underscore__WEBPACK_IMPORTED_MODULE_5___default().each(this.get('nodes')(), function (node) {
          var nodeJSON = underscore__WEBPACK_IMPORTED_MODULE_5___default().find(response.responseJSON.nodes, function (returned_node) {
            return node.nodeid === returned_node.nodeid;
          });
          node.parse(nodeJSON);
        }, this);
      } else {
        this.trigger('error', response, 'updateNode');
      }
      if (typeof callback === 'function') {
        scope = scope || this;
        callback.call(scope, response, status);
      }
    }, this, 'changed');
  },
  /**
   * exportBranch - creates a new branch rooted at the supplied node
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node with updated values
   * @param  {function} callback - the function to call after the response returns from the server
   * @param  {object} scope - the value of "this" in the callback function
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  exportBranch: function exportBranch(node, callback, scope) {
    return this._doRequest({
      type: "POST",
      async: false,
      url: this.url + this.get('graphid') + '/export_branch',
      data: JSON.stringify(node.toJSON())
    }, function (response, status) {
      if (status !== 'success' || !response.responseJSON) {
        this.trigger('error', response, 'exportBranch');
      }
      if (typeof callback === 'function') {
        scope = scope || this;
        callback.call(scope, response, status);
      }
    }, this, 'changed');
  },
  /**
   * getValidNodesEdges - gets a list of possible ontology properties and classes the node
   * referenced by it's id could be based on the location of the node in the graph
   * @memberof GraphModel.prototype
   * @param  {string} nodeid - the node id of the node of interest
   * @param  {function} callback - function to call when the request returns
   * @param  {object} scope - (optional) the scope used for the callback
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  getValidNodesEdges: function getValidNodesEdges(nodeid, callback, scope) {
    return this._doRequest({
      type: "GET",
      url: this.url + this.get('graphid') + '/get_related_nodes/' + nodeid
    }, function (response, status) {
      callback.call(scope, response.responseJSON);
    }, this);
  },
  /**
   * getValidDomainClasses - gets a list of possible ontology properties and classes the node
   * referenced by it's id could use to be appened to other nodes
   * @memberof GraphModel.prototype
   * @param  {string} nodeid - the node id of the node of interest
   * @param  {function} callback - function to call when the request returns
   * @param  {object} scope - (optional) the scope used for the callback
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  getValidDomainClasses: function getValidDomainClasses(nodeid, callback, scope) {
    return this._doRequest({
      type: "GET",
      url: this.url + this.get('graphid') + '/get_valid_domain_nodes/' + nodeid
    }, function (response, status) {
      callback.call(scope, response.responseJSON);
    }, this);
  },
  /**
   * canAppend - test to see whether or not a graph can be appened to this graph at a specific location
   * @memberof GraphModel.prototype
   * @param  {object} graphToAppend - the {@link GraphModel} to test appending on to this graph
   * @param  {NodeModel} nodeToAppendTo - the node from which to append the graph, defaults to the graphs selected node
   * @return  {boolean} - true if the graph can be appended, false otherwise
   */
  canAppend: function canAppend(graphToAppend, nodeToAppendTo) {
    nodeToAppendTo = nodeToAppendTo ? nodeToAppendTo : this.get('selectedNode')();
    if (!!this.get('ontology_id') && !!graphToAppend.get('ontology_id')) {
      var found = !!underscore__WEBPACK_IMPORTED_MODULE_5___default().find(graphToAppend.get('domain_connections'), function (domain_connection) {
        return !!underscore__WEBPACK_IMPORTED_MODULE_5___default().find(domain_connection.ontology_classes, function (ontology_class) {
          return ontology_class === nodeToAppendTo.ontologyclass();
        }, this);
      }, this);
      if (!found) {
        return false;
      }
    }
    return true;
  },
  /**
   * parse - parses the passed in attributes into a {@link GraphModel}
   * @memberof GraphModel.prototype
   * @param  {object} attributes - the properties to seed a {@link GraphModel} with
   */
  parse: function parse(attributes) {
    var self = this;
    var datatypelookup = {};
    attributes = underscore__WEBPACK_IMPORTED_MODULE_5___default().extend({
      datatypes: [],
      domain_connections: []
    }, attributes);
    underscore__WEBPACK_IMPORTED_MODULE_5___default().defaults(attributes, {
      selectRoot: true
    });
    this.set('domain_connections_loaded', false);
    underscore__WEBPACK_IMPORTED_MODULE_5___default().each(attributes.datatypes, function (datatype) {
      datatypelookup[datatype.datatype] = datatype;
    }, this);
    this.set('datatypelookup', datatypelookup);
    underscore__WEBPACK_IMPORTED_MODULE_5___default().each(attributes.data, function (value, key) {
      switch (key) {
        case 'edges':
        case 'cards':
          this.set(key, knockout__WEBPACK_IMPORTED_MODULE_4___default().observableArray(value));
          break;
        case 'nodes':
          var nodes = [];
          attributes.data.nodes.forEach(function (node, i) {
            var nodeModel = new models_node__WEBPACK_IMPORTED_MODULE_3__["default"]({
              source: node,
              datatypelookup: datatypelookup,
              graph: self,
              "ontology_namespaces": attributes.ontology_namespaces
            });
            nodeModel.childNodes = knockout__WEBPACK_IMPORTED_MODULE_4___default().observableArray([]);
            if (node.istopnode) {
              this.set('root', nodeModel);
            }
            nodes.push(nodeModel);
          }, this);
          this.set('nodes', knockout__WEBPACK_IMPORTED_MODULE_4___default().observableArray(nodes));
          break;
        case 'root':
          break;
        default:
          this.set(key, value);
      }
    }, this);
    this.tree = this.constructTree();
    this.set('selectedNode', knockout__WEBPACK_IMPORTED_MODULE_4___default().computed(function () {
      var selectedNode = underscore__WEBPACK_IMPORTED_MODULE_5___default().find(self.get('nodes')(), function (node) {
        return node.selected();
      }, this);
      return selectedNode;
    }));
    var root = this.get('root');
    if (!!root) {
      if (attributes.selectRoot) {
        root.selected(true);
      }
    }
    this.graphCards = knockout__WEBPACK_IMPORTED_MODULE_4___default().computed(function () {
      var parentCards = [];
      if (this.get('cards')) {
        var allCards = this.get('cards')();
        this.get('nodegroups').filter(function (nodegroup) {
          return !!nodegroup.parentnodegroup_id === false;
        }, this).forEach(function (nodegroup) {
          parentCards = parentCards.concat(allCards.filter(function (card) {
            return card.nodegroup_id === nodegroup.nodegroupid;
          }, this));
        }, this);
      }
      return parentCards;
    }, this);
    this.set('cardwidgets', knockout__WEBPACK_IMPORTED_MODULE_4___default().observableArray());
  },
  /**
   * constructTree - creates a hierarchical node listing from this graphs nodes and edges, or the passed in nodes and edges
   * @memberof GraphModel.prototype
   * @param  {NodeModel} root - a reference to the root node in the nodes parameter, or of this graph if not defined
   * @param  {[NodeModel]} nodes - the nodes to make a tree from, defaults to the nodes in this graph
   * @param  {array} edges - the edges to make a tree from, defaults to the edges in this graph
   * @param  {boolean} append - if true, won't remove the existing hierarchy
   * @return {object} a hierchical node listing
   */
  constructTree: function constructTree(root, nodes, edges, append) {
    var nodeMap = {};
    root = !!root ? root : this.get('root');
    nodes = !!nodes ? nodes : this.get('nodes')();
    edges = !!edges ? edges : this.get('edges')();
    nodes.forEach(function (node) {
      nodeMap[node.id] = node;
      if (!knockout__WEBPACK_IMPORTED_MODULE_4___default().isObservable(node.childNodes)) {
        node.childNodes = knockout__WEBPACK_IMPORTED_MODULE_4___default().observableArray([]);
      } else {
        if (!append) {
          node.childNodes.removeAll();
        }
      }
    });
    edges.forEach(function (edge) {
      nodeMap[edge.domainnode_id].childNodes.unshift(nodeMap[edge.rangenode_id]);
    });
    edges.forEach(function (edge) {
      nodeMap[edge.domainnode_id].childNodes.sort(function (left, right) {
        return left.attributes.source.sortorder == right.attributes.source.sortorder ? 0 : left.attributes.source.sortorder < right.attributes.source.sortorder ? -1 : 1;
      });
    });
    return root;
  },
  /**
   * loadDomainConnections - loads the domain connections for the graph asyncronously
   * @memberof GraphModel.prototype
   * @return {Promise} the Promise gets passes the responseJSON of the request
   */
  loadDomainConnections: function loadDomainConnections() {
    if (!this.get('domain_connections_loaded')) {
      return this.getValidDomainClasses('', function (responseJSON) {
        this.set('domain_connections', responseJSON);
        this.set('domain_connections_loaded', true);
      }, this);
    } else {
      return Promise.resolve();
    }
  },
  /**
   * isNodeInParentGroup - test to see if the node is in a group that is not a child to another group
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node to test
   * @return {Boolean} true if the node is in a parent group, false otherwise
   */
  isNodeInParentGroup: function isNodeInParentGroup(node) {
    var isInParentGroup = false;
    var nodeGroupId = node.nodeGroupId();
    if (nodeGroupId) {
      var collector = underscore__WEBPACK_IMPORTED_MODULE_5___default().find(this.get('nodes')(), function (node) {
        return node.nodeid === nodeGroupId;
      });
      var childNodesAndEdges = this.getChildNodesAndEdges(collector);
      var childGroupNode = childNodesAndEdges.nodes.find(function (childNode) {
        return childNode.nodeGroupId() !== nodeGroupId;
      });
      if (childGroupNode) {
        isInParentGroup = true;
      }
    }
    return isInParentGroup;
  },
  /**
   * isNodeInChildGroup - test to see if the node is in a group that is a child to another group
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node to test
   * @return {Boolean} true if the node is in a child group, false otherwise
   */
  isNodeInChildGroup: function isNodeInChildGroup(node) {
    var nodeGroupId = node.nodeGroupId();
    if (!nodeGroupId) {
      return false;
    }
    var parentNodes = this.getParentNodesAndEdges(node).nodes;
    var hasParentGroup = !!parentNodes.find(function (parentNode) {
      var parentNodeGroupId = parentNode.nodeGroupId();
      return parentNodeGroupId && parentNodeGroupId !== nodeGroupId;
    });
    return hasParentGroup;
  },
  /**
   * isGroupSemantic - test to see if all the nodes in a group are semantic
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node to use as a basis of finding the group
   * @return  {boolean} - true if the group contains only semantic nodes, otherwise false
   */
  isGroupSemantic: function isGroupSemantic(node) {
    return underscore__WEBPACK_IMPORTED_MODULE_5___default().every(this.getGroupedNodes(node), function (node) {
      return node.datatype() === 'semantic';
    }, this);
  },
  /**
   * getGroupedNodes - given a node, get any other nodes that share the same group
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node to use as a basis of finding the group
   * @return  {array} - a list of {@link NodeModel}
   */
  getGroupedNodes: function getGroupedNodes(node) {
    var nodeGroupId = node.nodeGroupId();
    if (!nodeGroupId) {
      return [node];
    }
    return underscore__WEBPACK_IMPORTED_MODULE_5___default().filter(this.get('nodes')(), function (node) {
      return node.nodeGroupId() && node.nodeGroupId() === nodeGroupId;
    });
  },
  /**
   * getParentNodesAndEdges - given a node, get all the parent nodes edges
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node from which to get the node's parents
   * @return  {object} - an object with a list of {@link NodeModel} and edges
   */
  getParentNodesAndEdges: function getParentNodesAndEdges(node) {
    var self = this;
    var nodes = [];
    var edges = [];
    var edge = self.get('edges')().find(function (edge) {
      return edge.rangenode_id === node.nodeid;
    });
    if (edge) {
      var domainnode = self.get('nodes')().find(function (node) {
        return node.nodeid === edge.domainnode_id;
      });
      nodes.push(domainnode);
      edges.push(edge);
      var nodesAndEdges = self.getParentNodesAndEdges(domainnode);
      nodes = nodes.concat(nodesAndEdges.nodes);
      edges = edges.concat(nodesAndEdges.edges);
    }
    return {
      nodes: nodes,
      edges: edges
    };
  },
  /**
   * getChildNodesAndEdges - given a node, get all the child nodes edges
   * @memberof GraphModel.prototype
   * @param  {NodeModel} node - the node from which to get the node's childNodes
   * @return  {object} - an object with a list of {@link NodeModel} and edges
   */
  getChildNodesAndEdges: function getChildNodesAndEdges(node) {
    var self = this;
    var nodes = [];
    var edges = [];
    self.get('edges')().filter(function (edge) {
      return edge.domainnode_id === node.nodeid;
    }).forEach(function (edge) {
      var rangenode = self.get('nodes')().find(function (node) {
        return node.nodeid === edge.rangenode_id;
      });
      nodes.push(rangenode);
      edges.push(edge);
      var nodesAndEdges = self.getChildNodesAndEdges(rangenode);
      nodes = nodes.concat(nodesAndEdges.nodes);
      edges = edges.concat(nodesAndEdges.edges);
    }, self);
    return {
      nodes: nodes,
      edges: edges
    };
  },
  /**
   * _doRequest - a wrapper around a simple ajax call
   * @memberof GraphModel.prototype
   * @param  {object} config - a config object to pass to the ajax request
   * @param  {function} callback - function to call when the request returns
   * @param  {object} scope - (optional) the scope used for the callback
   * @param  {string} eventname - (optional) the event to trigger upon successfull return of the request
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  _doRequest: function _doRequest(config, callback, scope, eventname) {
    var self = this;
    return jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax(jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({
      complete: function complete(request, status) {
        if (typeof callback === 'function') {
          callback.call(scope || self, request, status);
        }
        if (!!eventname) {
          self.trigger(eventname, self, request);
        }
      }
    }, config));
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOWNlY2VlYzIyYjM4YmZkNjNiYWYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNLO0FBQ2dCO0FBQ1I7QUFDVjtBQUNDO0FBRTNCLGlFQUFlRSx1REFBYSxDQUFDSSxNQUFNLENBQUM7RUFDaEM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVJQyxHQUFHLEVBQUVOLDhDQUFNLENBQUNPLElBQUksQ0FBQ0MsS0FBSztFQUV0QkMsV0FBVyxFQUFFLFNBQWJBLFdBQVdBLENBQVlDLFVBQVUsRUFBRUMsT0FBTyxFQUFFO0lBQ3hDQSxPQUFPLEtBQUtBLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6QkEsT0FBTyxDQUFDQyxLQUFLLEdBQUcsSUFBSTtJQUNwQlgsdURBQWEsQ0FBQ1ksU0FBUyxDQUFDSixXQUFXLENBQUNLLElBQUksQ0FBQyxJQUFJLEVBQUVKLFVBQVUsRUFBRUMsT0FBTyxDQUFDO0VBQ3ZFLENBQUM7RUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0lJLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFZQyxtQkFBbUIsRUFBRTtJQUN2QyxJQUFJLENBQUNDLE9BQU8sQ0FBQyxhQUFhLEVBQUVELG1CQUFtQixDQUFDO0lBQ2hELElBQUlFLHFCQUFxQixHQUFHLElBQUksQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsSUFBSUQscUJBQXFCLElBQUlBLHFCQUFxQixDQUFDRSxLQUFLLENBQUMsQ0FBQyxFQUFFO01BQ3hELE9BQU8sS0FBSztJQUNoQixDQUFDLE1BQU07TUFDSCxJQUFJLENBQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNFLE9BQU8sQ0FBQyxVQUFVQyxJQUFJLEVBQUU7UUFDeEMsSUFBSUEsSUFBSSxLQUFLTixtQkFBbUIsRUFBRTtVQUM5Qk0sSUFBSSxDQUFDQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3hCO01B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QyxJQUFJLE9BQU9ULFFBQVEsS0FBSyxVQUFVLEVBQUU7VUFDaENBLFFBQVEsQ0FBQ1gsSUFBSSxDQUFDWSxLQUFLLElBQUl5QyxJQUFJLEVBQUU4RixPQUFPLEVBQUUvSCxNQUFNLENBQUM7UUFDakQ7UUFDQSxJQUFJLENBQUMsQ0FBQzRILFNBQVMsRUFBRTtVQUNiM0YsSUFBSSxDQUFDbEQsT0FBTyxDQUFDNkksU0FBUyxFQUFFM0YsSUFBSSxFQUFFOEYsT0FBTyxDQUFDO1FBQzFDO01BQ0o7SUFDSixDQUFDLEVBQUVKLE1BQU0sQ0FBQyxDQUFDO0VBQ2Y7QUFDSixDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL21vZGVscy9ncmFwaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IEFic3RyYWN0TW9kZWwgZnJvbSAnbW9kZWxzL2Fic3RyYWN0JztcbmltcG9ydCBOb2RlTW9kZWwgZnJvbSAnbW9kZWxzL25vZGUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdE1vZGVsLmV4dGVuZCh7XG4gICAgLyoqXG4gICAgKiBBIGJhY2tib25lIG1vZGVsIHRvIG1hbmFnZSBncmFwaCBkYXRhXG4gICAgKiBAYXVnbWVudHMgQWJzdHJhY3RNb2RlbFxuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKiBAbmFtZSBHcmFwaE1vZGVsXG4gICAgKi9cblxuICAgIHVybDogYXJjaGVzLnVybHMuZ3JhcGgsXG5cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKGF0dHJpYnV0ZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgICAgb3B0aW9ucy5wYXJzZSA9IHRydWU7XG4gICAgICAgIEFic3RyYWN0TW9kZWwucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgYXR0cmlidXRlcywgb3B0aW9ucyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogRmxhZ3MgdGhlIHBhc3NlZCBpbiBub2RlIGFzIHNlbGVjdGVkXG4gICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7Tm9kZU1vZGVsfSBub2RlIC0gdGhlIG5vZGUgdG8gYmUgc2VsZWN0ZWRcbiAgICAqL1xuICAgIHNlbGVjdE5vZGU6IGZ1bmN0aW9uIChuZXdseV9zZWxlY3RlZF9ub2RlKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcignc2VsZWN0LW5vZGUnLCBuZXdseV9zZWxlY3RlZF9ub2RlKTtcbiAgICAgICAgdmFyIGN1cnJlbnRseVNlbGVjdGVkTm9kZSA9IHRoaXMuZ2V0KCdzZWxlY3RlZE5vZGUnKSgpO1xuICAgICAgICBpZiAoY3VycmVudGx5U2VsZWN0ZWROb2RlICYmIGN1cnJlbnRseVNlbGVjdGVkTm9kZS5kaXJ0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldCgnbm9kZXMnKSgpLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSAhPT0gbmV3bHlfc2VsZWN0ZWRfbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5ld2x5X3NlbGVjdGVkX25vZGUuc2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIGRlbGV0ZU5vZGUgLSBkZWxldGVzIHRoZSBwYXNzZWQgaW4gbm9kZSBmcm9tIHRoZSBkYiBhbmQgdXBkYXRlcyB0aGUgZ3JhcGhcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtOb2RlTW9kZWx9IG5vZGUgLSB0aGUgbm9kZSB0byBiZSBkZWxldGVkXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gKG9wdGlvbmFsKSBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBzY29wZSAtIChvcHRpb25hbCkgdGhlIHNjb3BlIHVzZWQgZm9yIHRoZSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gIHtqcVhIUn0gLSBhIFByb2ltaXNlIGNvbXBhdGlibGUgYXN5bmNocm9ub3VzIHJlcXVlc3RcbiAgICAgKi9cbiAgICBkZWxldGVOb2RlOiBmdW5jdGlvbiAobm9kZSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kb1JlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwgKyB0aGlzLmdldCgnZ3JhcGhpZCcpICsgJy9kZWxldGVfbm9kZScsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IG5vZGVpZDogbm9kZS5ub2RlaWQgfSlcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdzdWNjZXNzJyAmJiByZXNwb25zZS5yZXNwb25zZUpTT04pIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IHRoaXMuZ2V0UGFyZW50Tm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICB2YXIgZ2V0RWRnZXMgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWRnZXMgPSB0aGlzLmdldCgnZWRnZXMnKSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkZ2UuZG9tYWlubm9kZV9pZCA9PT0gbm9kZS5ub2RlaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gZWRnZXMubWFwKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ25vZGVzJykoKS5maW5kKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkZ2UucmFuZ2Vub2RlX2lkID09PSBub2RlLm5vZGVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMgPSBlZGdlcy5jb25jYXQoZ2V0RWRnZXMuY2FsbCh0aGlzLCBub2RlKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWRnZXM7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBlZGdlcyA9IGdldEVkZ2VzLmNhbGwodGhpcywgbm9kZSk7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gZWRnZXMubWFwKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnbm9kZXMnKSgpLmZpbmQoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlZGdlLnJhbmdlbm9kZV9pZCA9PT0gbm9kZS5ub2RlaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBlZGdlID0gdGhpcy5nZXQoJ2VkZ2VzJykoKVxuICAgICAgICAgICAgICAgICAgICAuZmluZChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkZ2UucmFuZ2Vub2RlX2lkID09PSBub2RlLm5vZGVpZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICBlZGdlcy5wdXNoKGVkZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmlzQ29sbGVjdG9yKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXQoJ2NhcmRzJykucmVtb3ZlKGZ1bmN0aW9uIChjYXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FyZC5ub2RlZ3JvdXBfaWQgPT09IG5vZGUubm9kZWlkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5nZXQoJ2VkZ2VzJykucmVtb3ZlKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLmNvbnRhaW5zKGVkZ2VzLCBlZGdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldCgnbm9kZXMnKS5yZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uY29udGFpbnMobm9kZXMsIG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuY2hpbGROb2Rlcy5yZW1vdmUobm9kZSk7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zZWxlY3RlZCh0cnVlKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZHMgZXZlbnQgdG8gdHJpZ2dlciBkaXJ0eSBzdGF0ZSBpbiBncmFwaC1kZXNpZ25lclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFdmVudCgnZGVsZXRlTm9kZScpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicsIHJlc3BvbnNlLCAnZGVsZXRlTm9kZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUgPSBzY29wZSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIHJlc3BvbnNlLCBzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLCAnY2hhbmdlZCcpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBnZXRQYXJlbnROb2RlIC0gZ2V0cyB0aGUgcGFyZW50IG5vZGUgb2YgdGhlIHBhc3NlZCBpbiBub2RlXG4gICAgICogQG1lbWJlcm9mIEdyYXBoTW9kZWwucHJvdG90eXBlXG4gICAgICogQHBhcmFtICB7Tm9kZU1vZGVsfSBub2RlIC0gdGhlIG5vZGUgd2hvc2UgcGFyZW50IHNob3VsZCBiZSByZXRyaWV2ZWRcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBwYXJlbnQgbm9kZSBvZiB0aGUgcGFzc2VkIGluIG5vZGVcbiAgICAgKiBJZiBwYXJlbnQgbm9kZSBvZiB0aGUgcGFzc2VkIGluIG5vZGUgY2FuJ3QgYmUgZm91bmQgdGhlbiByZXV0cm4gcGFzc2VkIGluIG5vZGUuXG4gICAgICovXG4gICAgZ2V0UGFyZW50Tm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIGVkZ2UgPSB0aGlzLmdldCgnZWRnZXMnKSgpXG4gICAgICAgICAgICAuZmluZChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlZGdlLnJhbmdlbm9kZV9pZCA9PT0gbm9kZS5ub2RlaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKGVkZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnbm9kZXMnKSgpXG4gICAgICAgICAgICAgICAgLmZpbmQoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkZ2UuZG9tYWlubm9kZV9pZCA9PT0gbm9kZS5ub2RlaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBhcHBlbmRCcmFuY2ggLSBhcHBlbmRzIGEgZ3JhcGggb250byBhIHNwZWNpZmljIG5vZGUgd2l0aGluIHRoaXMgZ3JhcGhcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG5vZGUgLSB0aGUgbm9kZSB3aXRoaW4gdGhpcyBncmFwaCB0aGF0IHdlJ3JlIGNvbm5lY3RpbmcgdGhlIGJyYW5jaCB0b1xuICAgICAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHkgLSB0aGUgb250b2xvZ3kgcHJvcGVydHkgdG8gdXNlIHRvIGNvbm5lY3QgdGhlIGJyYW5jaCwgbGVhdmUgbnVsbCB0byB1c2UgdGhlIGZpcnN0IGF2YWlsYWJsZSBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gYnJhbmNoX2dyYXBoIC0gdGhlIHtAbGluayBHcmFwaE1vZGVsfSB3ZSdyZSBhcHBlbmRpbmcgdG8gdGhpcyBncmFwaFxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxsYmFjayAtIHRoZSBmdW5jdGlvbiB0byBjYWxsIGFmdGVyIHRoZSByZXNwb25zZSByZXR1cm5zIGZyb20gdGhlIHNlcnZlclxuICAgICAqIEBwYXJhbSAge29iamVjdH0gc2NvcGUgLSB0aGUgdmFsdWUgb2YgXCJ0aGlzXCIgaW4gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiAge2pxWEhSfSAtIGEgUHJvaW1pc2UgY29tcGF0aWJsZSBhc3luY2hyb25vdXMgcmVxdWVzdFxuICAgICAqL1xuICAgIGFwcGVuZEJyYW5jaDogZnVuY3Rpb24gKG5vZGUsIHByb3BlcnR5LCBicmFuY2hfZ3JhcGgsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICBwcm9wZXJ0eSA9IHByb3BlcnR5ID8gcHJvcGVydHkgOiBudWxsO1xuICAgICAgICBpZiAocHJvcGVydHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldCgnc2VsZWN0ZWROb2RlJykoKS5vbnRvbG9neWNsYXNzKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgb250b2xvZ3lfY29ubmVjdGlvbiA9IF8uZmluZChicmFuY2hfZ3JhcGguZ2V0KCdkb21haW5fY29ubmVjdGlvbnMnKSwgZnVuY3Rpb24gKGRvbWFpbl9jb25uZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbmQoZG9tYWluX2Nvbm5lY3Rpb24ub250b2xvZ3lfY2xhc3NlcywgZnVuY3Rpb24gKG9udG9sb2d5X2NsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb250b2xvZ3lfY2xhc3MgPT09IHRoaXMuZ2V0KCdzZWxlY3RlZE5vZGUnKSgpLm9udG9sb2d5Y2xhc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKG9udG9sb2d5X2Nvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgPSBvbnRvbG9neV9jb25uZWN0aW9uLm9udG9sb2d5X3Byb3BlcnR5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlID0gc2NvcGUgfHwgc2VsZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIG51bGwsICdmYWlsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwgKyB0aGlzLmdldCgnZ3JhcGhpZCcpICsgJy9hcHBlbmRfYnJhbmNoJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBub2RlaWQ6IG5vZGUubm9kZWlkLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBncmFwaGlkOiBicmFuY2hfZ3JhcGguZ2V0KCdncmFwaGlkJyksXG4gICAgICAgICAgICAgICAgcmV0dXJuX2FwcGVuZGVkX2dyYXBoOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdzdWNjZXNzJyAmJiByZXNwb25zZS5yZXNwb25zZUpTT04pIHtcbiAgICAgICAgICAgICAgICB2YXIgYnJhbmNocm9vdCA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5yb290O1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0KCdub2RlcycpLnB1c2gobmV3IE5vZGVNb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhdHlwZWxvb2t1cDogdGhpcy5nZXQoJ2RhdGF0eXBlbG9va3VwJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFwaDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib250b2xvZ3lfbmFtZXNwYWNlc1wiOiB0aGlzLmdldCgncm9vdCcpLm9udG9sb2d5X25hbWVzcGFjZXNcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lZGdlcy5mb3JFYWNoKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0KCdlZGdlcycpLnB1c2goZWRnZSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ25vZGVncm91cHMnLCByZXNwb25zZS5yZXNwb25zZUpTT04ubm9kZWdyb3Vwcyk7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UucmVzcG9uc2VKU09OLmNhcmRzX3hfbm9kZXNfeF93aWRnZXRzLmZvckVhY2goZnVuY3Rpb24od2lkZ2V0KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXQoJ2NhcmR3aWRnZXRzJykucHVzaCh3aWRnZXQpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0KCdjYXJkcycpKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldCgnY2FyZHMnKSgpLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5jYXJkc1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5nZXQoJ2lzcmVzb3VyY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldCgnbm9kZXMnKSgpLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2VsZWN0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZWlkID09PSBicmFuY2hyb290Lm5vZGVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdFRyZWUobnVsbCwgbnVsbCwgcmVzcG9uc2UucmVzcG9uc2VKU09OLmVkZ2VzLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicsIHJlc3BvbnNlLCAnYXBwZW5kQnJhbmNoJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBzY29wZSA9IHNjb3BlIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzY29wZSwgcmVzcG9uc2UsIHN0YXR1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMsICdjaGFuZ2VkJyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGFwcGVuZE5vZGUgLSBhcHBlbmRzIGEgZ3JhcGggb250byBhIHNwZWNpZmljIG5vZGUgd2l0aGluIHRoaXMgZ3JhcGhcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG5vZGUgLSB0aGUgbm9kZSB3aXRoaW4gdGhpcyBncmFwaCBvbnRvIHdoaWNoIHdlJ3JlIGFwcGVuZGluZyBhIG5ldyBub2RlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGwgYWZ0ZXIgdGhlIHJlc3BvbnNlIHJldHVybnMgZnJvbSB0aGUgc2VydmVyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBzY29wZSAtIHRoZSB2YWx1ZSBvZiBcInRoaXNcIiBpbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuICB7anFYSFJ9IC0gYSBQcm9pbWlzZSBjb21wYXRpYmxlIGFzeW5jaHJvbm91cyByZXF1ZXN0XG4gICAgICovXG4gICAgYXBwZW5kTm9kZTogZnVuY3Rpb24gKG5vZGUsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZG9SZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVybCArIHRoaXMuZ2V0KCdncmFwaGlkJykgKyAnL2FwcGVuZF9ub2RlJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgbm9kZWlkOiBub2RlLm5vZGVpZCB9KVxuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3BvbnNlLnJlc3BvbnNlSlNPTikge1xuICAgICAgICAgICAgICAgIHZhciBub2RlU291cmNlID0gcmVzcG9uc2UucmVzcG9uc2VKU09OLm5vZGU7XG4gICAgICAgICAgICAgICAgbm9kZVNvdXJjZS5wYXJlbnRwcm9wZXJ0eSA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lZGdlLm9udG9sb2d5cHJvcGVydHk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgTm9kZU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBub2RlU291cmNlLFxuICAgICAgICAgICAgICAgICAgICBkYXRhdHlwZWxvb2t1cDogdGhpcy5nZXQoJ2RhdGF0eXBlbG9va3VwJyksXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBcIm9udG9sb2d5X25hbWVzcGFjZXNcIjogdGhpcy5nZXQoJ3Jvb3QnKS5vbnRvbG9neV9uYW1lc3BhY2VzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5jaGlsZE5vZGVzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0KCdub2RlcycpLnB1c2gobmV3Tm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXQoJ2VkZ2VzJykucHVzaChyZXNwb25zZS5yZXNwb25zZUpTT04uZWRnZSk7XG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZE5vZGVzLnVuc2hpZnQobmV3Tm9kZSk7XG5cbiAgICAgICAgICAgICAgICAvLyB3ZSBzZXQgdGhlc2UgdG8gZW1wdHkgc3RyaW5ncyBzbyB0aGF0IGEgdXNlciBjYW4gZWFzaWx5IGNob29zZSB0aGUgXG4gICAgICAgICAgICAgICAgLy8gb25vbG9neSBjbGFzcyBhbmQgcHJvcGVydHkgdGhleSB3YW50IGluc3RlYWQgb2YgaGF2aW5nIHRvIHVuc2VsZWN0IFxuICAgICAgICAgICAgICAgIC8vIHRoZSB2YWx1ZXMgY2hvc2VuIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9udG9sb2d5Y2xhc3MoJycpO1xuICAgICAgICAgICAgICAgIG5ld05vZGUucGFyZW50cHJvcGVydHkoJycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdldCgnaXNyZXNvdXJjZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Tm9kZShuZXdOb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZXJyb3InLCByZXNwb25zZSwgJ2FwcGVuZE5vZGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHNjb3BlID0gc2NvcGUgfHwgdGhpcztcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNjb3BlLCByZXNwb25zZSwgc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcywgJ2NoYW5nZWQnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogbW92ZU5vZGUgLSBtb3ZlcyBhIG5vZGUgZnJvbSBvbmUgcGFydCBvZiB0aGUgZ3JhcGggdG8gYW5vdGhlclxuICAgICAqIEBtZW1iZXJvZiBHcmFwaE1vZGVsLnByb3RvdHlwZVxuICAgICAqIEBwYXJhbSAge05vZGVNb2RlbH0gbm9kZSAtIHRoZSBub2RlIHdpdGhpbiB0aGlzIGdyYXBoIHRoYXQgd2UncmUgbW92aW5nXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBwcm9wZXJ0eSAtIHRoZSBvbnRvbG9neSBwcm9wZXJ0eSB0byB1c2UgdG8gY29ubmVjdCB0aGUgYnJhbmNoXG4gICAgICogQHBhcmFtICB7Tm9kZU1vZGVsfSBuZXdQYXJlbnROb2RlIC0gdGhlIG5vZGUgdG8gd2hpY2ggd2UgbW92ZWQgb3VyIGJyYW5jaCB0b1xuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxsYmFjayAtIHRoZSBmdW5jdGlvbiB0byBjYWxsIGFmdGVyIHRoZSByZXNwb25zZSByZXR1cm5zIGZyb20gdGhlIHNlcnZlclxuICAgICAqIEBwYXJhbSAge29iamVjdH0gc2NvcGUgLSB0aGUgdmFsdWUgb2YgXCJ0aGlzXCIgaW4gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiAge2pxWEhSfSAtIGEgUHJvaW1pc2UgY29tcGF0aWJsZSBhc3luY2hyb25vdXMgcmVxdWVzdFxuICAgICAqL1xuICAgIG1vdmVOb2RlOiBmdW5jdGlvbiAobm9kZSwgcHJvcGVydHksIG5ld1BhcmVudE5vZGUsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZG9SZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVybCArIHRoaXMuZ2V0KCdncmFwaGlkJykgKyAnL21vdmVfbm9kZScsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IG5vZGVpZDogbm9kZS5ub2RlaWQsIHByb3BlcnR5OiBwcm9wZXJ0eSwgbmV3cGFyZW50bm9kZWlkOiBuZXdQYXJlbnROb2RlLm5vZGVpZCB9KVxuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3BvbnNlLnJlc3BvbnNlSlNPTikge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0KCdlZGdlcycpKCkuZmluZChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWRnZS5lZGdlaWQgPT09IHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lZGdlc1swXS5lZGdlaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2UuZG9tYWlubm9kZV9pZCA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lZGdlc1swXS5kb21haW5ub2RlX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0KCdub2RlcycpKCkuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3VuZF9ub2RlID0gcmVzcG9uc2UucmVzcG9uc2VKU09OLm5vZGVzLmZpbmQoZnVuY3Rpb24gKHJlc3BvbnNlX25vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZV9ub2RlLm5vZGVpZCA9PT0gbm9kZS5ub2RlaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmRfbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJzZShmb3VuZF9ub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Vycm9yJywgcmVzcG9uc2UsICdtb3ZlTm9kZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUgPSBzY29wZSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIHJlc3BvbnNlLCBzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLCAnY2hhbmdlZCcpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGVOb2RlIC0gdXBkYXRlcyB0aGUgdmFsdWVzIG9mIGEgbm9kZVxuICAgICAqIEBtZW1iZXJvZiBHcmFwaE1vZGVsLnByb3RvdHlwZVxuICAgICAqIEBwYXJhbSAge05vZGVNb2RlbH0gbm9kZSAtIHRoZSBub2RlIHdpdGggdXBkYXRlZCB2YWx1ZXNcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSB0aGUgZnVuY3Rpb24gdG8gY2FsbCBhZnRlciB0aGUgcmVzcG9uc2UgcmV0dXJucyBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IHNjb3BlIC0gdGhlIHZhbHVlIG9mIFwidGhpc1wiIGluIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm4gIHtqcVhIUn0gLSBhIFByb2ltaXNlIGNvbXBhdGlibGUgYXN5bmNocm9ub3VzIHJlcXVlc3RcbiAgICAgKi9cbiAgICB1cGRhdGVOb2RlOiBmdW5jdGlvbiAobm9kZSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kb1JlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsICsgdGhpcy5nZXQoJ2dyYXBoaWQnKSArICcvdXBkYXRlX25vZGUnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobm9kZS50b0pTT04oKSlcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdzdWNjZXNzJyAmJiByZXNwb25zZS5yZXNwb25zZUpTT04pIHtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5nZXQoJ25vZGVzJykoKSwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVKU09OID0gXy5maW5kKHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5ub2RlcywgZnVuY3Rpb24gKHJldHVybmVkX25vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm5vZGVpZCA9PT0gcmV0dXJuZWRfbm9kZS5ub2RlaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcnNlKG5vZGVKU09OKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicsIHJlc3BvbnNlLCAndXBkYXRlTm9kZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUgPSBzY29wZSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIHJlc3BvbnNlLCBzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLCAnY2hhbmdlZCcpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBleHBvcnRCcmFuY2ggLSBjcmVhdGVzIGEgbmV3IGJyYW5jaCByb290ZWQgYXQgdGhlIHN1cHBsaWVkIG5vZGVcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtOb2RlTW9kZWx9IG5vZGUgLSB0aGUgbm9kZSB3aXRoIHVwZGF0ZWQgdmFsdWVzXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGwgYWZ0ZXIgdGhlIHJlc3BvbnNlIHJldHVybnMgZnJvbSB0aGUgc2VydmVyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBzY29wZSAtIHRoZSB2YWx1ZSBvZiBcInRoaXNcIiBpbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuICB7anFYSFJ9IC0gYSBQcm9pbWlzZSBjb21wYXRpYmxlIGFzeW5jaHJvbm91cyByZXF1ZXN0XG4gICAgICovXG4gICAgZXhwb3J0QnJhbmNoOiBmdW5jdGlvbiAobm9kZSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kb1JlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsICsgdGhpcy5nZXQoJ2dyYXBoaWQnKSArICcvZXhwb3J0X2JyYW5jaCcsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShub2RlLnRvSlNPTigpKVxuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gJ3N1Y2Nlc3MnIHx8ICFyZXNwb25zZS5yZXNwb25zZUpTT04pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Vycm9yJywgcmVzcG9uc2UsICdleHBvcnRCcmFuY2gnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHNjb3BlID0gc2NvcGUgfHwgdGhpcztcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNjb3BlLCByZXNwb25zZSwgc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcywgJ2NoYW5nZWQnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZ2V0VmFsaWROb2Rlc0VkZ2VzIC0gZ2V0cyBhIGxpc3Qgb2YgcG9zc2libGUgb250b2xvZ3kgcHJvcGVydGllcyBhbmQgY2xhc3NlcyB0aGUgbm9kZVxuICAgICAqIHJlZmVyZW5jZWQgYnkgaXQncyBpZCBjb3VsZCBiZSBiYXNlZCBvbiB0aGUgbG9jYXRpb24gb2YgdGhlIG5vZGUgaW4gdGhlIGdyYXBoXG4gICAgICogQG1lbWJlcm9mIEdyYXBoTW9kZWwucHJvdG90eXBlXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBub2RlaWQgLSB0aGUgbm9kZSBpZCBvZiB0aGUgbm9kZSBvZiBpbnRlcmVzdFxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgcmVxdWVzdCByZXR1cm5zXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBzY29wZSAtIChvcHRpb25hbCkgdGhlIHNjb3BlIHVzZWQgZm9yIHRoZSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gIHtqcVhIUn0gLSBhIFByb2ltaXNlIGNvbXBhdGlibGUgYXN5bmNocm9ub3VzIHJlcXVlc3RcbiAgICAgKi9cbiAgICBnZXRWYWxpZE5vZGVzRWRnZXM6IGZ1bmN0aW9uIChub2RlaWQsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZG9SZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsICsgdGhpcy5nZXQoJ2dyYXBoaWQnKSArICcvZ2V0X3JlbGF0ZWRfbm9kZXMvJyArIG5vZGVpZCxcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIHJlc3BvbnNlLnJlc3BvbnNlSlNPTik7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBnZXRWYWxpZERvbWFpbkNsYXNzZXMgLSBnZXRzIGEgbGlzdCBvZiBwb3NzaWJsZSBvbnRvbG9neSBwcm9wZXJ0aWVzIGFuZCBjbGFzc2VzIHRoZSBub2RlXG4gICAgICogcmVmZXJlbmNlZCBieSBpdCdzIGlkIGNvdWxkIHVzZSB0byBiZSBhcHBlbmVkIHRvIG90aGVyIG5vZGVzXG4gICAgICogQG1lbWJlcm9mIEdyYXBoTW9kZWwucHJvdG90eXBlXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBub2RlaWQgLSB0aGUgbm9kZSBpZCBvZiB0aGUgbm9kZSBvZiBpbnRlcmVzdFxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgcmVxdWVzdCByZXR1cm5zXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBzY29wZSAtIChvcHRpb25hbCkgdGhlIHNjb3BlIHVzZWQgZm9yIHRoZSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gIHtqcVhIUn0gLSBhIFByb2ltaXNlIGNvbXBhdGlibGUgYXN5bmNocm9ub3VzIHJlcXVlc3RcbiAgICAgKi9cbiAgICBnZXRWYWxpZERvbWFpbkNsYXNzZXM6IGZ1bmN0aW9uIChub2RlaWQsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZG9SZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsICsgdGhpcy5nZXQoJ2dyYXBoaWQnKSArICcvZ2V0X3ZhbGlkX2RvbWFpbl9ub2Rlcy8nICsgbm9kZWlkLFxuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzY29wZSwgcmVzcG9uc2UucmVzcG9uc2VKU09OKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbkFwcGVuZCAtIHRlc3QgdG8gc2VlIHdoZXRoZXIgb3Igbm90IGEgZ3JhcGggY2FuIGJlIGFwcGVuZWQgdG8gdGhpcyBncmFwaCBhdCBhIHNwZWNpZmljIGxvY2F0aW9uXG4gICAgICogQG1lbWJlcm9mIEdyYXBoTW9kZWwucHJvdG90eXBlXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBncmFwaFRvQXBwZW5kIC0gdGhlIHtAbGluayBHcmFwaE1vZGVsfSB0byB0ZXN0IGFwcGVuZGluZyBvbiB0byB0aGlzIGdyYXBoXG4gICAgICogQHBhcmFtICB7Tm9kZU1vZGVsfSBub2RlVG9BcHBlbmRUbyAtIHRoZSBub2RlIGZyb20gd2hpY2ggdG8gYXBwZW5kIHRoZSBncmFwaCwgZGVmYXVsdHMgdG8gdGhlIGdyYXBocyBzZWxlY3RlZCBub2RlXG4gICAgICogQHJldHVybiAge2Jvb2xlYW59IC0gdHJ1ZSBpZiB0aGUgZ3JhcGggY2FuIGJlIGFwcGVuZGVkLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBjYW5BcHBlbmQ6IGZ1bmN0aW9uIChncmFwaFRvQXBwZW5kLCBub2RlVG9BcHBlbmRUbykge1xuICAgICAgICBub2RlVG9BcHBlbmRUbyA9IG5vZGVUb0FwcGVuZFRvID8gbm9kZVRvQXBwZW5kVG8gOiB0aGlzLmdldCgnc2VsZWN0ZWROb2RlJykoKTtcblxuICAgICAgICBpZiAoISF0aGlzLmdldCgnb250b2xvZ3lfaWQnKSAmJiAhIWdyYXBoVG9BcHBlbmQuZ2V0KCdvbnRvbG9neV9pZCcpKSB7XG4gICAgICAgICAgICB2YXIgZm91bmQgPSAhIV8uZmluZChncmFwaFRvQXBwZW5kLmdldCgnZG9tYWluX2Nvbm5lY3Rpb25zJyksIGZ1bmN0aW9uIChkb21haW5fY29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIV8uZmluZChkb21haW5fY29ubmVjdGlvbi5vbnRvbG9neV9jbGFzc2VzLCBmdW5jdGlvbiAob250b2xvZ3lfY2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9udG9sb2d5X2NsYXNzID09PSBub2RlVG9BcHBlbmRUby5vbnRvbG9neWNsYXNzKCk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcGFyc2UgLSBwYXJzZXMgdGhlIHBhc3NlZCBpbiBhdHRyaWJ1dGVzIGludG8gYSB7QGxpbmsgR3JhcGhNb2RlbH1cbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGF0dHJpYnV0ZXMgLSB0aGUgcHJvcGVydGllcyB0byBzZWVkIGEge0BsaW5rIEdyYXBoTW9kZWx9IHdpdGhcbiAgICAgKi9cbiAgICBwYXJzZTogZnVuY3Rpb24gKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZGF0YXR5cGVsb29rdXAgPSB7fTtcblxuICAgICAgICBhdHRyaWJ1dGVzID0gXy5leHRlbmQoeyBkYXRhdHlwZXM6IFtdLCBkb21haW5fY29ubmVjdGlvbnM6IFtdIH0sIGF0dHJpYnV0ZXMpO1xuICAgICAgICBfLmRlZmF1bHRzKGF0dHJpYnV0ZXMsIHsgc2VsZWN0Um9vdDogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5zZXQoJ2RvbWFpbl9jb25uZWN0aW9uc19sb2FkZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgXy5lYWNoKGF0dHJpYnV0ZXMuZGF0YXR5cGVzLCBmdW5jdGlvbiAoZGF0YXR5cGUpIHtcbiAgICAgICAgICAgIGRhdGF0eXBlbG9va3VwW2RhdGF0eXBlLmRhdGF0eXBlXSA9IGRhdGF0eXBlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5zZXQoJ2RhdGF0eXBlbG9va3VwJywgZGF0YXR5cGVsb29rdXApO1xuXG4gICAgICAgIF8uZWFjaChhdHRyaWJ1dGVzLmRhdGEsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkZ2VzJzpcbiAgICAgICAgICAgICAgICBjYXNlICdjYXJkcyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwga28ub2JzZXJ2YWJsZUFycmF5KHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25vZGVzJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMuZGF0YS5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZU1vZGVsID0gbmV3IE5vZGVNb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGF0eXBlbG9va3VwOiBkYXRhdHlwZWxvb2t1cCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaDogc2VsZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9udG9sb2d5X25hbWVzcGFjZXNcIjogYXR0cmlidXRlcy5vbnRvbG9neV9uYW1lc3BhY2VzXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVNb2RlbC5jaGlsZE5vZGVzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlzdG9wbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdyb290Jywgbm9kZU1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZU1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdub2RlcycsIGtvLm9ic2VydmFibGVBcnJheShub2RlcykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyb290JzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMuY29uc3RydWN0VHJlZSgpO1xuXG4gICAgICAgIHRoaXMuc2V0KCdzZWxlY3RlZE5vZGUnLCBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWROb2RlID0gXy5maW5kKHNlbGYuZ2V0KCdub2RlcycpKCksIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuc2VsZWN0ZWQoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkTm9kZTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHZhciByb290ID0gdGhpcy5nZXQoJ3Jvb3QnKTtcbiAgICAgICAgaWYgKCEhcm9vdCkge1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMuc2VsZWN0Um9vdCkge1xuICAgICAgICAgICAgICAgIHJvb3Quc2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdyYXBoQ2FyZHMgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50Q2FyZHMgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldCgnY2FyZHMnKSkge1xuICAgICAgICAgICAgICAgIHZhciBhbGxDYXJkcyA9IHRoaXMuZ2V0KCdjYXJkcycpKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXQoJ25vZGVncm91cHMnKS5maWx0ZXIoZnVuY3Rpb24gKG5vZGVncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFub2RlZ3JvdXAucGFyZW50bm9kZWdyb3VwX2lkID09PSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q2FyZHMgPSBwYXJlbnRDYXJkcy5jb25jYXQoYWxsQ2FyZHMuZmlsdGVyKGZ1bmN0aW9uIChjYXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FyZC5ub2RlZ3JvdXBfaWQgPT09IG5vZGVncm91cC5ub2RlZ3JvdXBpZDtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcykpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudENhcmRzO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLnNldCgnY2FyZHdpZGdldHMnLCBrby5vYnNlcnZhYmxlQXJyYXkoKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNvbnN0cnVjdFRyZWUgLSBjcmVhdGVzIGEgaGllcmFyY2hpY2FsIG5vZGUgbGlzdGluZyBmcm9tIHRoaXMgZ3JhcGhzIG5vZGVzIGFuZCBlZGdlcywgb3IgdGhlIHBhc3NlZCBpbiBub2RlcyBhbmQgZWRnZXNcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtOb2RlTW9kZWx9IHJvb3QgLSBhIHJlZmVyZW5jZSB0byB0aGUgcm9vdCBub2RlIGluIHRoZSBub2RlcyBwYXJhbWV0ZXIsIG9yIG9mIHRoaXMgZ3JhcGggaWYgbm90IGRlZmluZWRcbiAgICAgKiBAcGFyYW0gIHtbTm9kZU1vZGVsXX0gbm9kZXMgLSB0aGUgbm9kZXMgdG8gbWFrZSBhIHRyZWUgZnJvbSwgZGVmYXVsdHMgdG8gdGhlIG5vZGVzIGluIHRoaXMgZ3JhcGhcbiAgICAgKiBAcGFyYW0gIHthcnJheX0gZWRnZXMgLSB0aGUgZWRnZXMgdG8gbWFrZSBhIHRyZWUgZnJvbSwgZGVmYXVsdHMgdG8gdGhlIGVkZ2VzIGluIHRoaXMgZ3JhcGhcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBhcHBlbmQgLSBpZiB0cnVlLCB3b24ndCByZW1vdmUgdGhlIGV4aXN0aW5nIGhpZXJhcmNoeVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gYSBoaWVyY2hpY2FsIG5vZGUgbGlzdGluZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdFRyZWU6IGZ1bmN0aW9uIChyb290LCBub2RlcywgZWRnZXMsIGFwcGVuZCkge1xuICAgICAgICB2YXIgbm9kZU1hcCA9IHt9O1xuICAgICAgICByb290ID0gISFyb290ID8gcm9vdCA6IHRoaXMuZ2V0KCdyb290Jyk7XG4gICAgICAgIG5vZGVzID0gISFub2RlcyA/IG5vZGVzIDogdGhpcy5nZXQoJ25vZGVzJykoKTtcbiAgICAgICAgZWRnZXMgPSAhIWVkZ2VzID8gZWRnZXMgOiB0aGlzLmdldCgnZWRnZXMnKSgpO1xuICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICBub2RlTWFwW25vZGUuaWRdID0gbm9kZTtcbiAgICAgICAgICAgIGlmICgha28uaXNPYnNlcnZhYmxlKG5vZGUuY2hpbGROb2RlcykpIHtcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkTm9kZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFwcGVuZCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNoaWxkTm9kZXMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlcy5mb3JFYWNoKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICAgICAgICBub2RlTWFwW2VkZ2UuZG9tYWlubm9kZV9pZF0uY2hpbGROb2Rlcy51bnNoaWZ0KG5vZGVNYXBbZWRnZS5yYW5nZW5vZGVfaWRdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRnZXMuZm9yRWFjaChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgICAgICAgbm9kZU1hcFtlZGdlLmRvbWFpbm5vZGVfaWRdLmNoaWxkTm9kZXMuc29ydChmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdC5hdHRyaWJ1dGVzLnNvdXJjZS5zb3J0b3JkZXIgPT0gcmlnaHQuYXR0cmlidXRlcy5zb3VyY2Uuc29ydG9yZGVyID8gMCA6IChsZWZ0LmF0dHJpYnV0ZXMuc291cmNlLnNvcnRvcmRlciA8IHJpZ2h0LmF0dHJpYnV0ZXMuc291cmNlLnNvcnRvcmRlciA/IC0xIDogMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4gcm9vdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogbG9hZERvbWFpbkNvbm5lY3Rpb25zIC0gbG9hZHMgdGhlIGRvbWFpbiBjb25uZWN0aW9ucyBmb3IgdGhlIGdyYXBoIGFzeW5jcm9ub3VzbHlcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSB0aGUgUHJvbWlzZSBnZXRzIHBhc3NlcyB0aGUgcmVzcG9uc2VKU09OIG9mIHRoZSByZXF1ZXN0XG4gICAgICovXG4gICAgbG9hZERvbWFpbkNvbm5lY3Rpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXQoJ2RvbWFpbl9jb25uZWN0aW9uc19sb2FkZWQnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREb21haW5DbGFzc2VzKCcnLCBmdW5jdGlvbiAocmVzcG9uc2VKU09OKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ2RvbWFpbl9jb25uZWN0aW9ucycsIHJlc3BvbnNlSlNPTik7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ2RvbWFpbl9jb25uZWN0aW9uc19sb2FkZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaXNOb2RlSW5QYXJlbnRHcm91cCAtIHRlc3QgdG8gc2VlIGlmIHRoZSBub2RlIGlzIGluIGEgZ3JvdXAgdGhhdCBpcyBub3QgYSBjaGlsZCB0byBhbm90aGVyIGdyb3VwXG4gICAgICogQG1lbWJlcm9mIEdyYXBoTW9kZWwucHJvdG90eXBlXG4gICAgICogQHBhcmFtICB7Tm9kZU1vZGVsfSBub2RlIC0gdGhlIG5vZGUgdG8gdGVzdFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgdGhlIG5vZGUgaXMgaW4gYSBwYXJlbnQgZ3JvdXAsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIGlzTm9kZUluUGFyZW50R3JvdXA6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciBpc0luUGFyZW50R3JvdXAgPSBmYWxzZTtcbiAgICAgICAgdmFyIG5vZGVHcm91cElkID0gbm9kZS5ub2RlR3JvdXBJZCgpO1xuICAgICAgICBpZiAobm9kZUdyb3VwSWQpIHtcbiAgICAgICAgICAgIHZhciBjb2xsZWN0b3IgPSBfLmZpbmQodGhpcy5nZXQoJ25vZGVzJykoKSwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5ub2RlaWQgPT09IG5vZGVHcm91cElkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY2hpbGROb2Rlc0FuZEVkZ2VzID0gdGhpcy5nZXRDaGlsZE5vZGVzQW5kRWRnZXMoY29sbGVjdG9yKTtcbiAgICAgICAgICAgIHZhciBjaGlsZEdyb3VwTm9kZSA9IGNoaWxkTm9kZXNBbmRFZGdlcy5ub2Rlcy5maW5kKGZ1bmN0aW9uIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGROb2RlLm5vZGVHcm91cElkKCkgIT09IG5vZGVHcm91cElkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2hpbGRHcm91cE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpc0luUGFyZW50R3JvdXAgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc0luUGFyZW50R3JvdXA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGlzTm9kZUluQ2hpbGRHcm91cCAtIHRlc3QgdG8gc2VlIGlmIHRoZSBub2RlIGlzIGluIGEgZ3JvdXAgdGhhdCBpcyBhIGNoaWxkIHRvIGFub3RoZXIgZ3JvdXBcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtOb2RlTW9kZWx9IG5vZGUgLSB0aGUgbm9kZSB0byB0ZXN0XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGUgbm9kZSBpcyBpbiBhIGNoaWxkIGdyb3VwLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBpc05vZGVJbkNoaWxkR3JvdXA6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciBub2RlR3JvdXBJZCA9IG5vZGUubm9kZUdyb3VwSWQoKTtcbiAgICAgICAgaWYgKCFub2RlR3JvdXBJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJlbnROb2RlcyA9IHRoaXMuZ2V0UGFyZW50Tm9kZXNBbmRFZGdlcyhub2RlKS5ub2RlcztcbiAgICAgICAgdmFyIGhhc1BhcmVudEdyb3VwID0gISFwYXJlbnROb2Rlcy5maW5kKGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50Tm9kZUdyb3VwSWQgPSBwYXJlbnROb2RlLm5vZGVHcm91cElkKCk7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Tm9kZUdyb3VwSWQgJiYgcGFyZW50Tm9kZUdyb3VwSWQgIT09IG5vZGVHcm91cElkO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhhc1BhcmVudEdyb3VwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBpc0dyb3VwU2VtYW50aWMgLSB0ZXN0IHRvIHNlZSBpZiBhbGwgdGhlIG5vZGVzIGluIGEgZ3JvdXAgYXJlIHNlbWFudGljXG4gICAgICogQG1lbWJlcm9mIEdyYXBoTW9kZWwucHJvdG90eXBlXG4gICAgICogQHBhcmFtICB7Tm9kZU1vZGVsfSBub2RlIC0gdGhlIG5vZGUgdG8gdXNlIGFzIGEgYmFzaXMgb2YgZmluZGluZyB0aGUgZ3JvdXBcbiAgICAgKiBAcmV0dXJuICB7Ym9vbGVhbn0gLSB0cnVlIGlmIHRoZSBncm91cCBjb250YWlucyBvbmx5IHNlbWFudGljIG5vZGVzLCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICBpc0dyb3VwU2VtYW50aWM6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBfLmV2ZXJ5KHRoaXMuZ2V0R3JvdXBlZE5vZGVzKG5vZGUpLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUuZGF0YXR5cGUoKSA9PT0gJ3NlbWFudGljJztcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGdldEdyb3VwZWROb2RlcyAtIGdpdmVuIGEgbm9kZSwgZ2V0IGFueSBvdGhlciBub2RlcyB0aGF0IHNoYXJlIHRoZSBzYW1lIGdyb3VwXG4gICAgICogQG1lbWJlcm9mIEdyYXBoTW9kZWwucHJvdG90eXBlXG4gICAgICogQHBhcmFtICB7Tm9kZU1vZGVsfSBub2RlIC0gdGhlIG5vZGUgdG8gdXNlIGFzIGEgYmFzaXMgb2YgZmluZGluZyB0aGUgZ3JvdXBcbiAgICAgKiBAcmV0dXJuICB7YXJyYXl9IC0gYSBsaXN0IG9mIHtAbGluayBOb2RlTW9kZWx9XG4gICAgICovXG4gICAgZ2V0R3JvdXBlZE5vZGVzOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgbm9kZUdyb3VwSWQgPSBub2RlLm5vZGVHcm91cElkKCk7XG4gICAgICAgIGlmICghbm9kZUdyb3VwSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbm9kZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8uZmlsdGVyKHRoaXMuZ2V0KCdub2RlcycpKCksIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5ub2RlR3JvdXBJZCgpICYmIG5vZGUubm9kZUdyb3VwSWQoKSA9PT0gbm9kZUdyb3VwSWQ7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBnZXRQYXJlbnROb2Rlc0FuZEVkZ2VzIC0gZ2l2ZW4gYSBub2RlLCBnZXQgYWxsIHRoZSBwYXJlbnQgbm9kZXMgZWRnZXNcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtOb2RlTW9kZWx9IG5vZGUgLSB0aGUgbm9kZSBmcm9tIHdoaWNoIHRvIGdldCB0aGUgbm9kZSdzIHBhcmVudHNcbiAgICAgKiBAcmV0dXJuICB7b2JqZWN0fSAtIGFuIG9iamVjdCB3aXRoIGEgbGlzdCBvZiB7QGxpbmsgTm9kZU1vZGVsfSBhbmQgZWRnZXNcbiAgICAgKi9cbiAgICBnZXRQYXJlbnROb2Rlc0FuZEVkZ2VzOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBub2RlcyA9IFtdO1xuICAgICAgICB2YXIgZWRnZXMgPSBbXTtcbiAgICAgICAgdmFyIGVkZ2UgPSBzZWxmLmdldCgnZWRnZXMnKSgpLmZpbmQoZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBlZGdlLnJhbmdlbm9kZV9pZCA9PT0gbm9kZS5ub2RlaWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZWRnZSkge1xuICAgICAgICAgICAgdmFyIGRvbWFpbm5vZGUgPSBzZWxmLmdldCgnbm9kZXMnKSgpLmZpbmQoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5ub2RlaWQgPT09IGVkZ2UuZG9tYWlubm9kZV9pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbm9kZXMucHVzaChkb21haW5ub2RlKTtcbiAgICAgICAgICAgIGVkZ2VzLnB1c2goZWRnZSk7XG5cbiAgICAgICAgICAgIHZhciBub2Rlc0FuZEVkZ2VzID0gc2VsZi5nZXRQYXJlbnROb2Rlc0FuZEVkZ2VzKGRvbWFpbm5vZGUpO1xuICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5jb25jYXQobm9kZXNBbmRFZGdlcy5ub2Rlcyk7XG4gICAgICAgICAgICBlZGdlcyA9IGVkZ2VzLmNvbmNhdChub2Rlc0FuZEVkZ2VzLmVkZ2VzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm9kZXM6IG5vZGVzLFxuICAgICAgICAgICAgZWRnZXM6IGVkZ2VzXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGdldENoaWxkTm9kZXNBbmRFZGdlcyAtIGdpdmVuIGEgbm9kZSwgZ2V0IGFsbCB0aGUgY2hpbGQgbm9kZXMgZWRnZXNcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtOb2RlTW9kZWx9IG5vZGUgLSB0aGUgbm9kZSBmcm9tIHdoaWNoIHRvIGdldCB0aGUgbm9kZSdzIGNoaWxkTm9kZXNcbiAgICAgKiBAcmV0dXJuICB7b2JqZWN0fSAtIGFuIG9iamVjdCB3aXRoIGEgbGlzdCBvZiB7QGxpbmsgTm9kZU1vZGVsfSBhbmQgZWRnZXNcbiAgICAgKi9cbiAgICBnZXRDaGlsZE5vZGVzQW5kRWRnZXM6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5vZGVzID0gW107XG4gICAgICAgIHZhciBlZGdlcyA9IFtdO1xuICAgICAgICBzZWxmLmdldCgnZWRnZXMnKSgpLmZpbHRlcihmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgICAgICAgcmV0dXJuIGVkZ2UuZG9tYWlubm9kZV9pZCA9PT0gbm9kZS5ub2RlaWQ7XG4gICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgICAgICAgIHZhciByYW5nZW5vZGUgPSBzZWxmLmdldCgnbm9kZXMnKSgpLmZpbmQoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5ub2RlaWQgPT09IGVkZ2UucmFuZ2Vub2RlX2lkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKHJhbmdlbm9kZSk7XG4gICAgICAgICAgICBlZGdlcy5wdXNoKGVkZ2UpO1xuXG4gICAgICAgICAgICB2YXIgbm9kZXNBbmRFZGdlcyA9IHNlbGYuZ2V0Q2hpbGROb2Rlc0FuZEVkZ2VzKHJhbmdlbm9kZSk7XG4gICAgICAgICAgICBub2RlcyA9IG5vZGVzLmNvbmNhdChub2Rlc0FuZEVkZ2VzLm5vZGVzKTtcbiAgICAgICAgICAgIGVkZ2VzID0gZWRnZXMuY29uY2F0KG5vZGVzQW5kRWRnZXMuZWRnZXMpO1xuICAgICAgICB9LCBzZWxmKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGVzOiBub2RlcyxcbiAgICAgICAgICAgIGVkZ2VzOiBlZGdlc1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBfZG9SZXF1ZXN0IC0gYSB3cmFwcGVyIGFyb3VuZCBhIHNpbXBsZSBhamF4IGNhbGxcbiAgICAgKiBAbWVtYmVyb2YgR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyAtIGEgY29uZmlnIG9iamVjdCB0byBwYXNzIHRvIHRoZSBhamF4IHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIHJlcXVlc3QgcmV0dXJuc1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gc2NvcGUgLSAob3B0aW9uYWwpIHRoZSBzY29wZSB1c2VkIGZvciB0aGUgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGV2ZW50bmFtZSAtIChvcHRpb25hbCkgdGhlIGV2ZW50IHRvIHRyaWdnZXIgdXBvbiBzdWNjZXNzZnVsbCByZXR1cm4gb2YgdGhlIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuICB7anFYSFJ9IC0gYSBQcm9pbWlzZSBjb21wYXRpYmxlIGFzeW5jaHJvbm91cyByZXF1ZXN0XG4gICAgICovXG4gICAgX2RvUmVxdWVzdDogZnVuY3Rpb24gKGNvbmZpZywgY2FsbGJhY2ssIHNjb3BlLCBldmVudG5hbWUpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gJC5hamF4KCQuZXh0ZW5kKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVxdWVzdCwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNjb3BlIHx8IHNlbGYsIHJlcXVlc3QsIHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghIWV2ZW50bmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXIoZXZlbnRuYW1lLCBzZWxmLCByZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNvbmZpZykpO1xuICAgIH1cbn0pO1xuXG4iXSwibmFtZXMiOlsiJCIsImFyY2hlcyIsIkFic3RyYWN0TW9kZWwiLCJOb2RlTW9kZWwiLCJrbyIsIl8iLCJleHRlbmQiLCJ1cmwiLCJ1cmxzIiwiZ3JhcGgiLCJjb25zdHJ1Y3RvciIsImF0dHJpYnV0ZXMiLCJvcHRpb25zIiwicGFyc2UiLCJwcm90b3R5cGUiLCJjYWxsIiwic2VsZWN0Tm9kZSIsIm5ld2x5X3NlbGVjdGVkX25vZGUiLCJ0cmlnZ2VyIiwiY3VycmVudGx5U2VsZWN0ZWROb2RlIiwiZ2V0IiwiZGlydHkiLCJmb3JFYWNoIiwibm9kZSIsInNlbGVjdGVkIiwiZGVsZXRlTm9kZSIsImNhbGxiYWNrIiwic2NvcGUiLCJfZG9SZXF1ZXN0IiwidHlwZSIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5Iiwibm9kZWlkIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJyZXNwb25zZUpTT04iLCJwYXJlbnROb2RlIiwiZ2V0UGFyZW50Tm9kZSIsImdldEVkZ2VzIiwiZWRnZXMiLCJmaWx0ZXIiLCJlZGdlIiwiZG9tYWlubm9kZV9pZCIsIm5vZGVzIiwibWFwIiwiZmluZCIsInJhbmdlbm9kZV9pZCIsImNvbmNhdCIsInB1c2giLCJpc0NvbGxlY3RvciIsInJlbW92ZSIsImNhcmQiLCJub2RlZ3JvdXBfaWQiLCJjb250YWlucyIsImNoaWxkTm9kZXMiLCJkb2N1bWVudCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImFwcGVuZEJyYW5jaCIsInByb3BlcnR5IiwiYnJhbmNoX2dyYXBoIiwib250b2xvZ3ljbGFzcyIsIm9udG9sb2d5X2Nvbm5lY3Rpb24iLCJkb21haW5fY29ubmVjdGlvbiIsIm9udG9sb2d5X2NsYXNzZXMiLCJvbnRvbG9neV9jbGFzcyIsIm9udG9sb2d5X3Byb3BlcnR5Iiwic2VsZiIsImdyYXBoaWQiLCJyZXR1cm5fYXBwZW5kZWRfZ3JhcGgiLCJicmFuY2hyb290Iiwicm9vdCIsInNvdXJjZSIsImRhdGF0eXBlbG9va3VwIiwib250b2xvZ3lfbmFtZXNwYWNlcyIsInNldCIsIm5vZGVncm91cHMiLCJjYXJkc194X25vZGVzX3hfd2lkZ2V0cyIsIndpZGdldCIsImNhcmRzIiwiY29uc3RydWN0VHJlZSIsImFwcGVuZE5vZGUiLCJub2RlU291cmNlIiwicGFyZW50cHJvcGVydHkiLCJvbnRvbG9neXByb3BlcnR5IiwibmV3Tm9kZSIsIm9ic2VydmFibGVBcnJheSIsInVuc2hpZnQiLCJtb3ZlTm9kZSIsIm5ld1BhcmVudE5vZGUiLCJuZXdwYXJlbnRub2RlaWQiLCJlZGdlaWQiLCJmb3VuZF9ub2RlIiwicmVzcG9uc2Vfbm9kZSIsInVwZGF0ZU5vZGUiLCJ0b0pTT04iLCJlYWNoIiwibm9kZUpTT04iLCJyZXR1cm5lZF9ub2RlIiwiZXhwb3J0QnJhbmNoIiwiYXN5bmMiLCJnZXRWYWxpZE5vZGVzRWRnZXMiLCJnZXRWYWxpZERvbWFpbkNsYXNzZXMiLCJjYW5BcHBlbmQiLCJncmFwaFRvQXBwZW5kIiwibm9kZVRvQXBwZW5kVG8iLCJmb3VuZCIsImRhdGF0eXBlcyIsImRvbWFpbl9jb25uZWN0aW9ucyIsImRlZmF1bHRzIiwic2VsZWN0Um9vdCIsImRhdGF0eXBlIiwidmFsdWUiLCJrZXkiLCJpIiwibm9kZU1vZGVsIiwiaXN0b3Bub2RlIiwidHJlZSIsImNvbXB1dGVkIiwic2VsZWN0ZWROb2RlIiwiZ3JhcGhDYXJkcyIsInBhcmVudENhcmRzIiwiYWxsQ2FyZHMiLCJub2RlZ3JvdXAiLCJwYXJlbnRub2RlZ3JvdXBfaWQiLCJub2RlZ3JvdXBpZCIsImFwcGVuZCIsIm5vZGVNYXAiLCJpZCIsImlzT2JzZXJ2YWJsZSIsInJlbW92ZUFsbCIsInNvcnQiLCJsZWZ0IiwicmlnaHQiLCJzb3J0b3JkZXIiLCJsb2FkRG9tYWluQ29ubmVjdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImlzTm9kZUluUGFyZW50R3JvdXAiLCJpc0luUGFyZW50R3JvdXAiLCJub2RlR3JvdXBJZCIsImNvbGxlY3RvciIsImNoaWxkTm9kZXNBbmRFZGdlcyIsImdldENoaWxkTm9kZXNBbmRFZGdlcyIsImNoaWxkR3JvdXBOb2RlIiwiY2hpbGROb2RlIiwiaXNOb2RlSW5DaGlsZEdyb3VwIiwicGFyZW50Tm9kZXMiLCJnZXRQYXJlbnROb2Rlc0FuZEVkZ2VzIiwiaGFzUGFyZW50R3JvdXAiLCJwYXJlbnROb2RlR3JvdXBJZCIsImlzR3JvdXBTZW1hbnRpYyIsImV2ZXJ5IiwiZ2V0R3JvdXBlZE5vZGVzIiwiZG9tYWlubm9kZSIsIm5vZGVzQW5kRWRnZXMiLCJyYW5nZW5vZGUiLCJjb25maWciLCJldmVudG5hbWUiLCJhamF4IiwiY29tcGxldGUiLCJyZXF1ZXN0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=