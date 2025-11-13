"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[51761],{

/***/ 51761:
/*!***********************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/related-resources-graph.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3 */ 39970);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! arches */ 77126);





(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).relatedResourcesGraph = {
  init: function init(element, valueAccessor) {
    var modelMap = arches__WEBPACK_IMPORTED_MODULE_4__["default"].resources.reduce(function (a, v) {
      a[v.graphid] = v;
      return a;
    }, {});
    var options = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(valueAccessor());
    var subscriptions = options.subscriptions;
    var nodeSelection = options.nodeSelection;
    var selectedState = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(false);
    var $el = jquery__WEBPACK_IMPORTED_MODULE_1___default()(element);
    var width = $el.parent().width() || 400;
    var height = $el.parent().height() || 400;
    var newNodeId = 0;
    var nodeMap = {};
    var linkMap = {};
    var data = {
      nodes: [],
      links: []
    };
    var texts;
    var selectedNode;
    var simulation = d3__WEBPACK_IMPORTED_MODULE_3__.forceSimulation(data.nodes).force("link", d3__WEBPACK_IMPORTED_MODULE_3__.forceLink(data.links)).force("charge", d3__WEBPACK_IMPORTED_MODULE_3__.forceCollide().radius(100)).force("radial", d3__WEBPACK_IMPORTED_MODULE_3__.forceRadial(300, width / 2, height / 2)).force("center", d3__WEBPACK_IMPORTED_MODULE_3__.forceCenter(width / 2, height / 2)).alpha(0.01);
    var nodeList = options.nodeList;
    var currentResource = options.currentResource;
    var selectNode = function selectNode(d) {
      nodesElement.selectAll("circle").attr("class", function (d1) {
        var className = 'node-' + (d.isRoot ? 'current' : 'ancestor');
        if (d1 === d) {
          className += '-selected';
        } else if (underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, d1.id + '_' + d.id) || underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, d.id + '_' + d1.id)) {
          className += '-neighbor';
        }
        return className;
      });
      linksElement.selectAll("line").attr('class', function (l) {
        return l.source === d || l.target === d ? 'linkMouseover' : 'link';
      });
      nodeSelection([d]);
      updateNodeInfo(d);
    };
    var clearHover = function clearHover(d) {
      linksElement.selectAll("line").attr('class', function (l) {
        return 'link';
      });
      nodesElement.selectAll("circle").attr("class", function (d1) {
        var className = 'node-' + (d1.isRoot ? 'current' : 'ancestor');
        if (d1.selected()) {
          className += '-selected';
        }
        return className;
      });
    };
    var hoverNode = function hoverNode(d) {
      nodesElement.selectAll("circle").attr("class", function (d1) {
        var className = 'node-' + (d.isRoot ? 'current' : 'ancestor');
        if (d1 === d) {
          className += d1.selected() ? '-selected' : '-over';
          if (selectedState() === false) {
            nodeSelection([d1]);
          }
        } else if (underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, d1.id + '_' + d.id) || underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, d.id + '_' + d1.id)) {
          if (d1.selected() === false) {
            className += '-neighbor';
          } else {
            className += '-selected';
          }
        } else if (d1.selected()) {
          className += '-selected';
        }
        return className;
      });
      linksElement.selectAll("line").attr('class', function (l) {
        return l.source === d || l.target === d ? 'linkMouseover' : 'link';
      });
    };
    var updateSelected = function updateSelected(item) {
      return function (val) {
        selectedState(val);
        if (val === true) {
          selectNode(item);
        } else {
          nodeSelection.removeAll();
          nodesElement.selectAll("circle").attr("class", function (d1) {
            return 'node-' + (d1.isRoot ? 'current' : 'ancestor');
          });
        }
      };
    };
    var updateHovered = function updateHovered(item) {
      return function (val) {
        if (val === true) {
          hoverNode(item);
        } else {
          clearHover(item);
          if (selectedState() === false) {
            nodeSelection.removeAll();
          }
        }
      };
    };
    var svg = d3__WEBPACK_IMPORTED_MODULE_3__.select(element).append("svg:svg").attr("viewBox", [0, 0, width, height]).call(d3__WEBPACK_IMPORTED_MODULE_3__.zoom().extent([[0, 0], [width, height]]).scaleExtent([0.25, 8]).on("zoom", function (event) {
      groupElement.attr("transform", event.transform);
    }));
    var groupElement = svg.append('svg:g');
    var linksElement = groupElement.append('svg:g');
    var nodesElement = groupElement.append('svg:g');
    var update = function update() {
      var linkMap = linkMap;
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).trigger("resize");
      simulation.nodes(data.nodes);
      simulation.force("link").links(data.links);
      simulation.alpha(0.01).restart();
      var link = linksElement.selectAll("line").data(data.links).join("line").attr("class", "link").on("mouseover", function (event, d) {
        var hoveredNodes = [];
        var linkMap = linkMap;
        d3__WEBPACK_IMPORTED_MODULE_3__.select(this).attr("class", "linkMouseover");
        nodesElement.selectAll("circle").attr("class", function (d1) {
          var matrix;
          var className = 'node-' + (d1.isRoot ? 'current' : 'ancestor');
          if (d.source === d1 || d.target === d1) {
            className += d1.selected() ? '-selected' : '-neighbor';
            d1.relationship = d.target === d1 ? d.relationshipTarget : d.relationshipSource;
            d1.relationships = d.all_relationships;
            matrix = this.getScreenCTM();
            //transform svg coords to screen coords
            d1.absX = matrix.a * d1.x + matrix.c * d1.y + matrix.e;
            d1.absY = matrix.b * d1.x + matrix.d * d1.y + matrix.f;
            hoveredNodes.push(d1);
          } else if (d1.selected()) {
            className += '-selected';
          }
          return className;
        });
        nodeSelection(hoveredNodes);
      }).on("mouseout", function (event, d) {
        d3__WEBPACK_IMPORTED_MODULE_3__.select(this).attr("class", "link");
        nodesElement.selectAll("circle").attr("class", function (d1) {
          var className = 'node-' + (d1.isRoot ? 'current' : 'ancestor');
          if (d1.selected()) {
            className += '-selected';
          }
          return className;
        });
        nodeSelection.removeAll();
      });
      link.exit().remove();
      var node = nodesElement.selectAll("circle").data(data.nodes, function (d) {
        return d.id;
      }).join("circle").style('fill', function (d) {
        return d.color;
      }).attr("r", function (d) {
        return d.isRoot ? 24 : 18;
      }).attr("class", function (d) {
        return 'node-' + (d.isRoot ? 'current' : 'ancestor');
      }).on("mouseover", function (event, d) {
        nodesElement.selectAll("circle").attr("class", function (d1) {
          var className = 'node-' + (d.isRoot ? 'current' : 'ancestor');
          if (d1 === d) {
            className += d1.selected() ? '-selected' : '-over';
            underscore__WEBPACK_IMPORTED_MODULE_2___default().each(nodeList(), function (n) {
              if (n.entityid === d.entityid) {
                n.hovered(true);
              } else {
                n.hovered(false);
              }
            });
          } else if (underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, d1.id + '_' + d.id) || underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, d.id + '_' + d1.id)) {
            if (d1.selected() === false) {
              className += '-neighbor';
            } else {
              className += '-selected';
            }
          } else if (d1.selected() === true) {
            className += '-selected';
          }
          return className;
        });
        linksElement.selectAll("line").attr('class', function (l) {
          return l.source === d || l.target === d ? 'linkMouseover' : 'link';
        });
      }).on('mouseout', function (event, d) {
        nodesElement.selectAll("circle").attr("class", function (d1) {
          var className = 'node-' + (d.isRoot ? 'current' : 'ancestor');
          if (d1.selected()) {
            className += '-selected';
          }
          underscore__WEBPACK_IMPORTED_MODULE_2___default().each(nodeList(), function (n) {
            n.hovered(false);
            if (n.relationCount) {
              n.loaded(n.relationCount.loaded);
              n.total(n.relationCount.total);
            }
          });
          return className;
        });
        if (selectedState() === false) {
          nodeSelection.removeAll();
        }
        linksElement.selectAll("line").attr('class', 'link');
      }).on("click", function (event, d) {
        if (!event.defaultPrevented) {
          d.loadcount(d.loadcount() + 1);
        }
        nodesElement.selectAll("circle").attr("class", function (d1) {
          var className = 'node-' + (d.isRoot ? 'current' : 'ancestor');
          if (d1 === d) {
            underscore__WEBPACK_IMPORTED_MODULE_2___default().each(nodeList(), function (n) {
              if (n.entityid === d.entityid) {
                if (n.selected() === false) {
                  n.selected(true);
                  className += '-selected';
                } else {
                  n.selected(false);
                }
              } else {
                n.selected(false);
              }
            });
          } else if (underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, d1.id + '_' + d.id) || underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, d.id + '_' + d1.id)) {
            className += '-neighbor';
          }
          return className;
        });
        linksElement.selectAll("line").attr('class', function (l) {
          return l.source === d || l.target === d ? 'linkMouseover' : 'link';
        });
        updateNodeInfo(d);
      }).call(d3__WEBPACK_IMPORTED_MODULE_3__.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
      function dragstarted(event, d) {
        if (!event.active) {
          simulation.alphaTarget(0.01).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event, d) {
        if (!event.active) {
          simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }
      if (texts) {
        texts.remove();
      }
      texts = nodesElement.selectAll("text.nodeLabels").data(data.nodes).join("text").attr("class", function (d) {
        return d.isRoot ? 'root-node-label' : 'nodeLabels';
      }).attr("dy", ".35em").text(function (d) {
        return d.name;
      });
      simulation.on("tick", function () {
        link.attr("x1", function (d) {
          return d.source.x;
        }).attr("y1", function (d) {
          return d.source.y;
        }).attr("x2", function (d) {
          return d.target.x;
        }).attr("y2", function (d) {
          return d.target.y;
        });
        node.attr("cx", function (d) {
          return d.x;
        }).attr("cy", function (d) {
          return d.y;
        }).attr("x", function () {
          return width / 2;
        }).attr("y", function () {
          return height / 2;
        });
        texts.attr("x", function (d) {
          return d.x;
        }).attr("y", function (d) {
          return d.y;
        });
      });
    };
    var updateNodeInfo = function updateNodeInfo(d) {
      var iconEl = $el.find('.resource-type-icon');
      $el.find('.selected-resource-name').html(d.name);
      $el.find('.selected-resource-name').attr('href', arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.reports + d.entityid);
      $el.find('.resource-type-name').html(modelMap[d.entitytypeid].name);
      if (d.relationCount) {
        $el.find('.relation-unloaded').hide();
        $el.find('.relation-count').show();
        $el.find('.relation-load-count').html(d.relationCount.loaded);
        $el.find('.relation-total-count').html(d.relationCount.total);
        if (d.relationCount.loaded === d.relationCount.total) {
          $el.find('.load-more-relations-link').hide();
        } else {
          $el.find('.load-more-relations-link').show();
        }
      } else {
        $el.find('.load-more-relations-link').show();
        $el.find('.relation-count').hide();
        $el.find('.relation-unloaded').show();
      }
      iconEl.removeClass();
      iconEl.addClass('resource-type-icon');
      iconEl.addClass(modelMap[d.entitytypeid].icon);
      $el.find('.node_info').show();
      selectedNode = d;
    };
    var getResourceDataForNode = function getResourceDataForNode(d) {
      getResourceData(d.entityid, d.name, d.entitytypeid, function (newData) {
        if (newData.nodes.length > 0 || newData.links.length > 0) {
          data.nodes = data.nodes.concat(newData.nodes);
          data.links = data.links.concat(newData.links);
          update(data);
        }
      }, false);
    };
    var getMoreData = function getMoreData(item) {
      return function (val) {
        if (val) {
          getResourceDataForNode(item);
        }
      };
    };
    var getResourceData = function getResourceData(resourceId, resourceName, resourceTypeId, callback, isRoot) {
      var load = true;
      var start = 0;
      var page = 1;
      var rootNode = nodeMap[resourceId];
      if (rootNode) {
        if (rootNode.relationCount) {
          load = rootNode.relationCount.total > rootNode.relationCount.loaded && !rootNode.loading;
          start = rootNode.relationCount.loaded;
          page = rootNode.loadcount();
        }
      }
      if (load) {
        if (rootNode) {
          rootNode.loading = true;
        }
        jquery__WEBPACK_IMPORTED_MODULE_1___default().ajax({
          url: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.related_resources + resourceId,
          data: {
            start: start,
            page: page > 0 ? page : 1
          },
          error: function error(e) {
            // eslint-disable-next-line no-console
            console.log('request failed', e);
          },
          success: function success(response) {
            var links = [];
            var nodes = [];
            var rr = response.related_resources;
            var totalLoaded;
            if (isRoot) {
              nodeSelection.removeAll();
              selectedState(false);
              rootNode = {
                id: newNodeId,
                entityid: resourceId,
                name: resourceName,
                description: rr.resource_instance.displaydescription,
                entitytypeid: resourceTypeId,
                isRoot: true,
                relationType: 'Current',
                graphname: rr.node_config_lookup[rr.resource_instance.graph_id].name,
                iconclass: rr.node_config_lookup[rr.resource_instance.graph_id].iconclass,
                color: rr.node_config_lookup[rr.resource_instance.graph_id].fillColor,
                relationCount: {
                  total: rr.total.value,
                  loaded: rr.resource_relationships.length
                }
              };
              nodes.push(rootNode);
              nodeMap[resourceId] = rootNode;
              newNodeId += 1;
            } else if (rootNode.relationCount) {
              totalLoaded = rootNode.relationCount.loaded + rr.resource_relationships.length;
              rootNode.relationCount.loaded = totalLoaded <= rr.total.value ? totalLoaded : rr.total.value;
            } else {
              rootNode.relationCount = {
                total: rr.total.value,
                loaded: rr.resource_relationships.length
              };
            }
            rootNode.loading = false;
            updateNodeInfo(rootNode);
            var getRelated = function getRelated(relatedResource) {
              var nodeConfigLookup = rr.node_config_lookup;
              if (!nodeMap[relatedResource.resourceinstanceid]) {
                var node = {
                  id: newNodeId,
                  entityid: relatedResource.resourceinstanceid,
                  entitytypeid: relatedResource.graph_id,
                  name: relatedResource.displayname,
                  description: relatedResource.displaydescription,
                  color: nodeConfigLookup[relatedResource.graph_id].fillColor,
                  iconclass: nodeConfigLookup[relatedResource.graph_id].iconclass,
                  graphname: nodeConfigLookup[relatedResource.graph_id].name,
                  isRoot: false,
                  relationType: 'Ancestor',
                  relationCount: {
                    total: relatedResource.total_relations.value,
                    loaded: 1
                  }
                };
                nodes.push(node);
                nodeMap[relatedResource.resourceinstanceid] = node;
                newNodeId += 1;
              }
            };
            underscore__WEBPACK_IMPORTED_MODULE_2___default().each(rr.related_resources, getRelated);
            underscore__WEBPACK_IMPORTED_MODULE_2___default().each(rr.resource_relationships, function (resourceRelationships) {
              var sourceId = nodeMap[resourceRelationships.from_resource];
              var targetId = nodeMap[resourceRelationships.to_resource];
              var relationshipSource = resourceRelationships.relationshiptype_label;
              var relationshipTarget = resourceRelationships.relationshiptype_label;
              if (resourceRelationships.relationshiptype_label.split('/').length === 2) {
                relationshipSource = resourceRelationships.relationshiptype_label.split('/')[0].trim();
                relationshipTarget = resourceRelationships.relationshiptype_label.split('/')[1].trim();
              }
              links.push({
                source: sourceId,
                target: targetId,
                relationshipSource: relationshipSource,
                relationshipTarget: relationshipTarget,
                weight: 1
              });
              if (!underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, [sourceId.id + '_' + targetId.id])) {
                linkMap[sourceId.id + '_' + targetId.id] = {
                  relationships: []
                };
              }
              if (!underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, [targetId.id + '_' + sourceId.id])) {
                linkMap[targetId.id + '_' + sourceId.id] = {
                  relationships: []
                };
              }
              if (underscore__WEBPACK_IMPORTED_MODULE_2___default().contains(linkMap[sourceId.id + '_' + targetId.id]['relationships'], relationshipSource) === false) {
                linkMap[sourceId.id + '_' + targetId.id]['relationships'].push(relationshipSource);
              }
              if (underscore__WEBPACK_IMPORTED_MODULE_2___default().contains(linkMap[targetId.id + '_' + sourceId.id]['relationships'], relationshipSource) === false) {
                linkMap[targetId.id + '_' + sourceId.id]['relationships'].push(relationshipSource);
              }
            });
            links = underscore__WEBPACK_IMPORTED_MODULE_2___default().uniq(links, function (item, key, source) {
              return item.source.id + '_' + item.target.id;
            });
            underscore__WEBPACK_IMPORTED_MODULE_2___default().each(links, function (l) {
              if (underscore__WEBPACK_IMPORTED_MODULE_2___default().has(linkMap, l.source.id + '_' + l.target.id)) {
                l.all_relationships = linkMap[l.source.id + '_' + l.target.id].relationships;
              }
            });
            nodeList(nodeList().concat(nodes));
            callback({
              nodes: nodes,
              links: links
            });
          }
        });
      }
    };
    var setRoot = function setRoot(val) {
      if (val.graphid !== undefined) {
        nodeMap = {};
        linkMap = {};
        nodeList([]);
        getResourceData(val.resourceinstanceid, val.displayname, val.graphid, function (newData) {
          $el.removeClass('loading');
          data = newData;
          data.nodes[0].x = width / 2;
          data.nodes[0].y = height / 2 - 160;
          update();
        }, true);
      }
    };
    if (currentResource().resourceinstanceid) {
      setRoot(currentResource());
    }
    if (knockout__WEBPACK_IMPORTED_MODULE_0___default().isObservable(currentResource)) {
      var subscription = currentResource.subscribe(setRoot, this);
      if (subscriptions.length > 0) {
        underscore__WEBPACK_IMPORTED_MODULE_2___default().each(subscriptions, function (s) {
          s.dispose();
        });
      }
      subscriptions.push(subscription);
    }
    jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).on("resize", function () {
      var w = $el.parent().width();
      var h = $el.parent().height();
      svg.attr("width", w);
      svg.attr("height", h);
      svg.attr("viewBox", [0, 0, w, h]);
    }).trigger("resize");
    nodeList.subscribe(function (list) {
      underscore__WEBPACK_IMPORTED_MODULE_2___default().each(list, function (item) {
        if (item.selectedSubscription) {
          item.selectedSubscription.dispose();
          item.hoveredSubscription.dispose();
          item.loadcountSubscription.dispose();
        }
        item.selectedSubscription = item.selected.subscribe(updateSelected(item), this);
        item.hoveredSubscription = item.hovered.subscribe(updateHovered(item), this);
        if (item.isRoot && item.loadcount() === 0) {
          item.loadcount(1);
        }
        item.loadcountSubscription = item.loadcount.subscribe(getMoreData(item), this);
        if (item.relationCount) {
          item.loaded(item.relationCount.loaded);
          item.total(item.relationCount.total);
        }
      });
    }, this);
    nodeList([]);
  }
};
(knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).relatedResourcesGraph.init = knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers.relatedResourcesGraph.init.bind((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).relatedResourcesGraph);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((knockout__WEBPACK_IMPORTED_MODULE_0___default().bindingHandlers).relatedResourcesGraph);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuOWRkMDQzZTU1MmI4MDA4N2QxZDkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ0g7QUFDSTtBQUNGO0FBQ0c7QUFHNUJBLGlFQUFrQixDQUFDTSxxQkFBcUIsR0FBRztFQUN2Q0MsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQVdDLE9BQU8sRUFBRUMsYUFBYSxFQUFFO0lBQ25DLElBQUlDLFFBQVEsR0FBR04sOENBQU0sQ0FBQ08sU0FBUyxDQUFDQyxNQUFNLENBQUMsVUFBU0MsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFDbERELENBQUMsQ0FBQ0MsQ0FBQyxDQUFDQyxPQUFPLENBQUMsR0FBR0QsQ0FBQztNQUNoQixPQUFPRCxDQUFDO0lBQ1osQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ04sSUFBSUcsT0FBTyxHQUFHaEIsc0RBQVMsQ0FBQ1MsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN4QyxJQUFJUyxhQUFhLEdBQUdGLE9BQU8sQ0FBQ0UsYUFBYTtJQUN6QyxJQUFJQyxhQUFhLEdBQUdILE9BQU8sQ0FBQ0csYUFBYTtJQUN6QyxJQUFJQyxhQUFhLEdBQUdwQiwwREFBYSxDQUFDLEtBQUssQ0FBQztJQUN4QyxJQUFJc0IsR0FBRyxHQUFHckIsNkNBQUMsQ0FBQ08sT0FBTyxDQUFDO0lBQ3BCLElBQUllLEtBQUssR0FBR0QsR0FBRyxDQUFDRSxNQUFNLENBQUMsQ0FBQyxDQUFDRCxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUc7SUFDdkMsSUFBSUUsTUFBTSxHQUFHSCxHQUFHLENBQUNFLE1BQU0sQ0FBQyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRztJQUN6QyxJQUFJQyxTQUFTLEdBQUcsQ0FBQztJQUNqQixJQUFJQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLElBQUlDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDaEIsSUFBSUMsSUFBSSxHQUFHO01BQ1BDLEtBQUssRUFB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QUksQ0FBQzhDLE9BQU8sQ0FBQ3FGLFNBQVMsQ0FBQ2hJLGFBQWEsQ0FBQ0gsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDO1FBQzVFLElBQUlBLElBQUksQ0FBQ1osTUFBTSxJQUFJWSxJQUFJLENBQUNtRCxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtVQUN2Q25ELElBQUksQ0FBQ21ELFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDckI7UUFDQW5ELElBQUksQ0FBQzJJLHFCQUFxQixHQUFHM0ksSUFBSSxDQUFDbUQsU0FBUyxDQUFDZ0YsU0FBUyxDQUFDckQsV0FBVyxDQUFDOUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDO1FBRTlFLElBQUlBLElBQUksQ0FBQytDLGFBQWEsRUFBRTtVQUNwQi9DLElBQUksQ0FBQ2dELE1BQU0sQ0FBQ2hELElBQUksQ0FBQytDLGFBQWEsQ0FBQ0MsTUFBTSxDQUFDO1VBQ3RDaEQsSUFBSSxDQUFDaUQsS0FBSyxDQUFDakQsSUFBSSxDQUFDK0MsYUFBYSxDQUFDRSxLQUFLLENBQUM7UUFDeEM7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBRVJ0RSxRQUFRLENBQUMsRUFBRSxDQUFDO0VBQ2hCO0FBQ0osQ0FBQztBQUNEM0MsaUVBQWtCLENBQUNNLHFCQUFxQixDQUFDQyxJQUFJLEdBQUdQLCtEQUFrQixDQUFDTSxxQkFBcUIsQ0FBQ0MsSUFBSSxDQUFDcU0sSUFBSSxDQUFDNU0saUVBQWtCLENBQUNNLHFCQUFxQixDQUFDO0FBRTVJLGlFQUFlTixpRUFBa0IsQ0FBQ00scUJBQXFCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy9iaW5kaW5ncy9yZWxhdGVkLXJlc291cmNlcy1ncmFwaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuXG5cbmtvLmJpbmRpbmdIYW5kbGVycy5yZWxhdGVkUmVzb3VyY2VzR3JhcGggPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xuICAgICAgICB2YXIgbW9kZWxNYXAgPSBhcmNoZXMucmVzb3VyY2VzLnJlZHVjZShmdW5jdGlvbihhLCB2KSB7XG4gICAgICAgICAgICBhW3YuZ3JhcGhpZF0gPSB2O1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBrby51bndyYXAodmFsdWVBY2Nlc3NvcigpKTtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSBvcHRpb25zLnN1YnNjcmlwdGlvbnM7XG4gICAgICAgIHZhciBub2RlU2VsZWN0aW9uID0gb3B0aW9ucy5ub2RlU2VsZWN0aW9uO1xuICAgICAgICB2YXIgc2VsZWN0ZWRTdGF0ZSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICB2YXIgJGVsID0gJChlbGVtZW50KTtcbiAgICAgICAgdmFyIHdpZHRoID0gJGVsLnBhcmVudCgpLndpZHRoKCkgfHwgNDAwO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gJGVsLnBhcmVudCgpLmhlaWdodCgpIHx8IDQwMDtcbiAgICAgICAgdmFyIG5ld05vZGVJZCA9IDA7XG4gICAgICAgIHZhciBub2RlTWFwID0ge307XG4gICAgICAgIHZhciBsaW5rTWFwID0ge307XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbm9kZXM6IFtdLFxuICAgICAgICAgICAgbGlua3M6IFtdXG4gICAgICAgIH07XG4gICAgICAgIHZhciB0ZXh0cztcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZTtcblxuICAgICAgICB2YXIgc2ltdWxhdGlvbiA9IGQzLmZvcmNlU2ltdWxhdGlvbihkYXRhLm5vZGVzKVxuICAgICAgICAgICAgLmZvcmNlKFwibGlua1wiLCBkMy5mb3JjZUxpbmsoZGF0YS5saW5rcykpXG4gICAgICAgICAgICAuZm9yY2UoXCJjaGFyZ2VcIiwgZDMuZm9yY2VDb2xsaWRlKCkucmFkaXVzKDEwMCkpXG4gICAgICAgICAgICAuZm9yY2UoXCJyYWRpYWxcIiwgZDMuZm9yY2VSYWRpYWwoMzAwLCB3aWR0aC8yLCBoZWlnaHQvMikpXG4gICAgICAgICAgICAuZm9yY2UoXCJjZW50ZXJcIiwgZDMuZm9yY2VDZW50ZXIod2lkdGggLyAyLCBoZWlnaHQgLyAyKSlcbiAgICAgICAgICAgIC5hbHBoYSgwLjAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICB2YXIgbm9kZUxpc3QgPSBvcHRpb25zLm5vZGVMaXN0O1xuICAgICAgICB2YXIgY3VycmVudFJlc291cmNlID0gb3B0aW9ucy5jdXJyZW50UmVzb3VyY2U7XG5cbiAgICAgICAgdmFyIHNlbGVjdE5vZGUgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBub2Rlc0VsZW1lbnQuc2VsZWN0QWxsKFwiY2lyY2xlXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBmdW5jdGlvbihkMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ25vZGUtJyArIChkLmlzUm9vdCA/ICdjdXJyZW50JyA6ICdhbmNlc3RvcicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZDEgPT09IGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnLXNlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLmhhcyhsaW5rTWFwLCBkMS5pZCArICdfJyArIGQuaWQpIHx8IF8uaGFzKGxpbmtNYXAsIGQuaWQgKyAnXycgKyBkMS5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnLW5laWdoYm9yJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGlua3NFbGVtZW50LnNlbGVjdEFsbChcImxpbmVcIilcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAobC5zb3VyY2UgPT09IGQgfHwgbC50YXJnZXQgPT09IGQpID8gJ2xpbmtNb3VzZW92ZXInIDogJ2xpbmsnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbm9kZVNlbGVjdGlvbihbZF0pO1xuICAgICAgICAgICAgdXBkYXRlTm9kZUluZm8oZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNsZWFySG92ZXIgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBsaW5rc0VsZW1lbnQuc2VsZWN0QWxsKFwibGluZVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdsaW5rJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5vZGVzRWxlbWVudC5zZWxlY3RBbGwoXCJjaXJjbGVcIikuYXR0cihcImNsYXNzXCIsIGZ1bmN0aW9uKGQxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdub2RlLScgKyAoZDEuaXNSb290ID8gJ2N1cnJlbnQnIDogJ2FuY2VzdG9yJyk7XG4gICAgICAgICAgICAgICAgaWYgKGQxLnNlbGVjdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9ICctc2VsZWN0ZWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGhvdmVyTm9kZSA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIG5vZGVzRWxlbWVudC5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIGZ1bmN0aW9uKGQxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAnbm9kZS0nICsgKGQuaXNSb290ID8gJ2N1cnJlbnQnIDogJ2FuY2VzdG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkMSA9PT0gZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9IGQxLnNlbGVjdGVkKCkgPyAnLXNlbGVjdGVkJyA6ICctb3Zlcic7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRTdGF0ZSgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVTZWxlY3Rpb24oW2QxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5oYXMobGlua01hcCwgZDEuaWQgKyAnXycgKyBkLmlkKSB8fCBfLmhhcyhsaW5rTWFwLCBkLmlkICsgJ18nICsgZDEuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZDEuc2VsZWN0ZWQoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJy1uZWlnaGJvcic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnLXNlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkMS5zZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJy1zZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpbmtzRWxlbWVudC5zZWxlY3RBbGwoXCJsaW5lXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24obCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGwuc291cmNlID09PSBkIHx8IGwudGFyZ2V0ID09PSBkKSA/ICdsaW5rTW91c2VvdmVyJyA6ICdsaW5rJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdXBkYXRlU2VsZWN0ZWQgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTdGF0ZSh2YWwpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Tm9kZShpdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgICAgICBub2Rlc0VsZW1lbnQuc2VsZWN0QWxsKFwiY2lyY2xlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIGZ1bmN0aW9uKGQxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdub2RlLScgKyAoZDEuaXNSb290ID8gJ2N1cnJlbnQnIDogJ2FuY2VzdG9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB1cGRhdGVIb3ZlcmVkID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJOb2RlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySG92ZXIoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0YXRlKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3ZnID0gZDMuc2VsZWN0KGVsZW1lbnQpLmFwcGVuZChcInN2ZzpzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwidmlld0JveFwiLCBbMCwgMCwgd2lkdGgsIGhlaWdodF0pXG4gICAgICAgICAgICAuY2FsbChkMy56b29tKClcbiAgICAgICAgICAgICAgICAuZXh0ZW50KFtbMCwgMF0sIFt3aWR0aCwgaGVpZ2h0XV0pXG4gICAgICAgICAgICAgICAgLnNjYWxlRXh0ZW50KFswLjI1LCA4XSlcbiAgICAgICAgICAgICAgICAub24oXCJ6b29tXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwRWxlbWVudC5hdHRyKFwidHJhbnNmb3JtXCIsIGV2ZW50LnRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIHZhciBncm91cEVsZW1lbnQgPSBzdmcuYXBwZW5kKCdzdmc6ZycpO1xuICAgICAgICB2YXIgbGlua3NFbGVtZW50ID0gZ3JvdXBFbGVtZW50LmFwcGVuZCgnc3ZnOmcnKTtcbiAgICAgICAgdmFyIG5vZGVzRWxlbWVudCA9IGdyb3VwRWxlbWVudC5hcHBlbmQoJ3N2ZzpnJyk7XG5cbiAgICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGxpbmtNYXAgPSBsaW5rTWFwO1xuXG4gICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcihcInJlc2l6ZVwiKTtcbiAgICAgICAgICAgIHNpbXVsYXRpb24ubm9kZXMoZGF0YS5ub2Rlcyk7XG4gICAgICAgICAgICBzaW11bGF0aW9uLmZvcmNlKFwibGlua1wiKS5saW5rcyhkYXRhLmxpbmtzKTtcbiAgICAgICAgICAgIHNpbXVsYXRpb24uYWxwaGEoMC4wMSkucmVzdGFydCgpO1xuXG4gICAgICAgICAgICB2YXIgbGluayA9IGxpbmtzRWxlbWVudC5zZWxlY3RBbGwoXCJsaW5lXCIpXG4gICAgICAgICAgICAgICAgLmRhdGEoZGF0YS5saW5rcylcbiAgICAgICAgICAgICAgICAuam9pbihcImxpbmVcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGlua1wiKVxuICAgICAgICAgICAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihldmVudCwgZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaG92ZXJlZE5vZGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5rTWFwID0gbGlua01hcDtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoXCJjbGFzc1wiLCBcImxpbmtNb3VzZW92ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzRWxlbWVudC5zZWxlY3RBbGwoXCJjaXJjbGVcIikuYXR0cihcImNsYXNzXCIsIGZ1bmN0aW9uKGQxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0cml4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdub2RlLScgKyAoZDEuaXNSb290ID8gJ2N1cnJlbnQnIDogJ2FuY2VzdG9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5zb3VyY2UgPT09IGQxIHx8IGQudGFyZ2V0ID09PSBkMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSBkMS5zZWxlY3RlZCgpID8gJy1zZWxlY3RlZCcgOiAnLW5laWdoYm9yJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkMS5yZWxhdGlvbnNoaXAgPSAoZC50YXJnZXQgPT09IGQxKSA/IGQucmVsYXRpb25zaGlwVGFyZ2V0IDogZC5yZWxhdGlvbnNoaXBTb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZDEucmVsYXRpb25zaGlwcyA9IGQuYWxsX3JlbGF0aW9uc2hpcHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0cml4ID0gdGhpcy5nZXRTY3JlZW5DVE0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RyYW5zZm9ybSBzdmcgY29vcmRzIHRvIHNjcmVlbiBjb29yZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkMS5hYnNYID0gbWF0cml4LmEgKiBkMS54ICsgbWF0cml4LmMgKiBkMS55ICsgbWF0cml4LmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZDEuYWJzWSA9IG1hdHJpeC5iICogZDEueCArIG1hdHJpeC5kICogZDEueSArIG1hdHJpeC5mO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVyZWROb2Rlcy5wdXNoKGQxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZDEuc2VsZWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnLXNlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uKGhvdmVyZWROb2Rlcyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihldmVudCwgZCkge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cihcImNsYXNzXCIsIFwibGlua1wiKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXNFbGVtZW50LnNlbGVjdEFsbChcImNpcmNsZVwiKS5hdHRyKFwiY2xhc3NcIiwgZnVuY3Rpb24oZDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAnbm9kZS0nICsgKGQxLmlzUm9vdCA/ICdjdXJyZW50JyA6ICdhbmNlc3RvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQxLnNlbGVjdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJy1zZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZVNlbGVjdGlvbi5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpbmsuZXhpdCgpXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVzRWxlbWVudC5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhLm5vZGVzLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvbG9yO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuaXNSb290ID8gMjQgOiAxODtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25vZGUtJyArIChkLmlzUm9vdCA/ICdjdXJyZW50JyA6ICdhbmNlc3RvcicpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGV2ZW50LCBkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzRWxlbWVudC5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgZnVuY3Rpb24oZDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ25vZGUtJyArIChkLmlzUm9vdCA/ICdjdXJyZW50JyA6ICdhbmNlc3RvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkMSA9PT0gZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gZDEuc2VsZWN0ZWQoKSA/ICctc2VsZWN0ZWQnIDogJy1vdmVyJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKG5vZGVMaXN0KCksIGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLmVudGl0eWlkID09PSBkLmVudGl0eWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5ob3ZlcmVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLmhvdmVyZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8uaGFzKGxpbmtNYXAsIGQxLmlkICsgJ18nICsgZC5pZCkgfHwgXy5oYXMobGlua01hcCwgZC5pZCArICdfJyArIGQxLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZDEuc2VsZWN0ZWQoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnLW5laWdoYm9yJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnLXNlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZDEuc2VsZWN0ZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJy1zZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbGlua3NFbGVtZW50LnNlbGVjdEFsbChcImxpbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGwuc291cmNlID09PSBkIHx8IGwudGFyZ2V0ID09PSBkKSA/ICdsaW5rTW91c2VvdmVyJyA6ICdsaW5rJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKGV2ZW50LCBkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzRWxlbWVudC5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgZnVuY3Rpb24oZDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ25vZGUtJyArIChkLmlzUm9vdCA/ICdjdXJyZW50JyA6ICdhbmNlc3RvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkMS5zZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnLXNlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKG5vZGVMaXN0KCksIGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5ob3ZlcmVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ucmVsYXRpb25Db3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5sb2FkZWQobi5yZWxhdGlvbkNvdW50LmxvYWRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLnRvdGFsKG4ucmVsYXRpb25Db3VudC50b3RhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFN0YXRlKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxpbmtzRWxlbWVudC5zZWxlY3RBbGwoXCJsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluaycpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQsIGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLmxvYWRjb3VudChkLmxvYWRjb3VudCgpKzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzRWxlbWVudC5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgZnVuY3Rpb24oZDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ25vZGUtJyArIChkLmlzUm9vdCA/ICdjdXJyZW50JyA6ICdhbmNlc3RvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkMSA9PT0gZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2gobm9kZUxpc3QoKSwgZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4uZW50aXR5aWQgPT09IGQuZW50aXR5aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5zZWxlY3RlZCgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLnNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJy1zZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5zZWxlY3RlZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLnNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLmhhcyhsaW5rTWFwLCBkMS5pZCArICdfJyArIGQuaWQpIHx8IF8uaGFzKGxpbmtNYXAsIGQuaWQgKyAnXycgKyBkMS5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9ICctbmVpZ2hib3InO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtzRWxlbWVudC5zZWxlY3RBbGwoXCJsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChsLnNvdXJjZSA9PT0gZCB8fCBsLnRhcmdldCA9PT0gZCkgPyAnbGlua01vdXNlb3ZlcicgOiAnbGluayc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlTm9kZUluZm8oZCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2FsbChkMy5kcmFnKClcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgZHJhZ3N0YXJ0ZWQpXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZHJhZ2dlZClcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGRyYWdlbmRlZClcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBkcmFnc3RhcnRlZChldmVudCwgZCkge1xuICAgICAgICAgICAgICAgIGlmICghZXZlbnQuYWN0aXZlKSB7IHNpbXVsYXRpb24uYWxwaGFUYXJnZXQoMC4wMSkucmVzdGFydCgpOyB9XG4gICAgICAgICAgICAgICAgZC5meCA9IGQueDtcbiAgICAgICAgICAgICAgICBkLmZ5ID0gZC55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmdW5jdGlvbiBkcmFnZ2VkKGV2ZW50LCBkKSB7XG4gICAgICAgICAgICAgICAgZC5meCA9IGV2ZW50Lng7XG4gICAgICAgICAgICAgICAgZC5meSA9IGV2ZW50Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRyYWdlbmRlZChldmVudCwgZCkge1xuICAgICAgICAgICAgICAgIGlmICghZXZlbnQuYWN0aXZlKSB7IHNpbXVsYXRpb24uYWxwaGFUYXJnZXQoMCk7IH1cbiAgICAgICAgICAgICAgICBkLmZ4ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBkLmZ5ID0gbnVsbDtcbiAgICAgICAgICAgIH0gICAgXG5cbiAgICAgICAgICAgIGlmICh0ZXh0cykge1xuICAgICAgICAgICAgICAgIHRleHRzLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0cyA9IG5vZGVzRWxlbWVudC5zZWxlY3RBbGwoXCJ0ZXh0Lm5vZGVMYWJlbHNcIilcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhLm5vZGVzKVxuICAgICAgICAgICAgICAgIC5qb2luKFwidGV4dFwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmlzUm9vdCA/ICdyb290LW5vZGUtbGFiZWwnIDogJ25vZGVMYWJlbHMnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJkeVwiLCBcIi4zNWVtXCIpXG4gICAgICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5uYW1lO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzaW11bGF0aW9uLm9uKFwidGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsaW5rLmF0dHIoXCJ4MVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnNvdXJjZS54O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieTFcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuc291cmNlLnk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieDJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQudGFyZ2V0Lng7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieTJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQudGFyZ2V0Lnk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbm9kZS5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC54O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiY3lcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQueTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRleHRzXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC54O1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQueTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB1cGRhdGVOb2RlSW5mbyA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciBpY29uRWwgPSAkZWwuZmluZCgnLnJlc291cmNlLXR5cGUtaWNvbicpO1xuICAgICAgICAgICAgJGVsLmZpbmQoJy5zZWxlY3RlZC1yZXNvdXJjZS1uYW1lJykuaHRtbChkLm5hbWUpO1xuICAgICAgICAgICAgJGVsLmZpbmQoJy5zZWxlY3RlZC1yZXNvdXJjZS1uYW1lJykuYXR0cignaHJlZicsIGFyY2hlcy51cmxzLnJlcG9ydHMgKyBkLmVudGl0eWlkKTtcbiAgICAgICAgICAgICRlbC5maW5kKCcucmVzb3VyY2UtdHlwZS1uYW1lJykuaHRtbChtb2RlbE1hcFtkLmVudGl0eXR5cGVpZF0ubmFtZSk7XG4gICAgICAgICAgICBpZiAoZC5yZWxhdGlvbkNvdW50KSB7XG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5yZWxhdGlvbi11bmxvYWRlZCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkZWwuZmluZCgnLnJlbGF0aW9uLWNvdW50Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgICRlbC5maW5kKCcucmVsYXRpb24tbG9hZC1jb3VudCcpLmh0bWwoZC5yZWxhdGlvbkNvdW50LmxvYWRlZCk7XG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5yZWxhdGlvbi10b3RhbC1jb3VudCcpLmh0bWwoZC5yZWxhdGlvbkNvdW50LnRvdGFsKTtcbiAgICAgICAgICAgICAgICBpZiAoZC5yZWxhdGlvbkNvdW50LmxvYWRlZCA9PT0gZC5yZWxhdGlvbkNvdW50LnRvdGFsKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbC5maW5kKCcubG9hZC1tb3JlLXJlbGF0aW9ucy1saW5rJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRlbC5maW5kKCcubG9hZC1tb3JlLXJlbGF0aW9ucy1saW5rJykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5sb2FkLW1vcmUtcmVsYXRpb25zLWxpbmsnKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5yZWxhdGlvbi1jb3VudCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkZWwuZmluZCgnLnJlbGF0aW9uLXVubG9hZGVkJykuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWNvbkVsLnJlbW92ZUNsYXNzKCk7XG4gICAgICAgICAgICBpY29uRWwuYWRkQ2xhc3MoJ3Jlc291cmNlLXR5cGUtaWNvbicpO1xuICAgICAgICAgICAgaWNvbkVsLmFkZENsYXNzKG1vZGVsTWFwW2QuZW50aXR5dHlwZWlkXS5pY29uKTtcbiAgICAgICAgICAgICRlbC5maW5kKCcubm9kZV9pbmZvJykuc2hvdygpO1xuICAgICAgICAgICAgc2VsZWN0ZWROb2RlID0gZDtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZ2V0UmVzb3VyY2VEYXRhRm9yTm9kZSA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGdldFJlc291cmNlRGF0YShkLmVudGl0eWlkLCBkLm5hbWUsIGQuZW50aXR5dHlwZWlkLCBmdW5jdGlvbihuZXdEYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0RhdGEubm9kZXMubGVuZ3RoID4gMCB8fCBuZXdEYXRhLmxpbmtzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ub2RlcyA9IGRhdGEubm9kZXMuY29uY2F0KG5ld0RhdGEubm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmxpbmtzID0gZGF0YS5saW5rcy5jb25jYXQobmV3RGF0YS5saW5rcyk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGdldE1vcmVEYXRhID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UmVzb3VyY2VEYXRhRm9yTm9kZShpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBnZXRSZXNvdXJjZURhdGEgPSBmdW5jdGlvbihyZXNvdXJjZUlkLCByZXNvdXJjZU5hbWUsIHJlc291cmNlVHlwZUlkLCBjYWxsYmFjaywgaXNSb290KSB7XG4gICAgICAgICAgICB2YXIgbG9hZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSAwO1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSAxO1xuICAgICAgICAgICAgdmFyIHJvb3ROb2RlID0gbm9kZU1hcFtyZXNvdXJjZUlkXTtcblxuICAgICAgICAgICAgaWYgKHJvb3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvb3ROb2RlLnJlbGF0aW9uQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZCA9IChyb290Tm9kZS5yZWxhdGlvbkNvdW50LnRvdGFsID4gcm9vdE5vZGUucmVsYXRpb25Db3VudC5sb2FkZWQgJiYgIXJvb3ROb2RlLmxvYWRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IHJvb3ROb2RlLnJlbGF0aW9uQ291bnQubG9hZGVkO1xuICAgICAgICAgICAgICAgICAgICBwYWdlID0gcm9vdE5vZGUubG9hZGNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxvYWQpIHtcbiAgICAgICAgICAgICAgICBpZiAocm9vdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdE5vZGUubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5yZWxhdGVkX3Jlc291cmNlcyArIHJlc291cmNlSWQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IHBhZ2UgPiAwID8gcGFnZSA6IDFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBmYWlsZWQnLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5rcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcnIgPSByZXNwb25zZS5yZWxhdGVkX3Jlc291cmNlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3RhbExvYWRlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3ROb2RlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogbmV3Tm9kZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlpZDogcmVzb3VyY2VJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVzb3VyY2VOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcnIucmVzb3VyY2VfaW5zdGFuY2UuZGlzcGxheWRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHl0eXBlaWQ6IHJlc291cmNlVHlwZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Jvb3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ0N1cnJlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaG5hbWU6IHJyLm5vZGVfY29uZmlnX2xvb2t1cFtyci5yZXNvdXJjZV9pbnN0YW5jZS5ncmFwaF9pZF0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbmNsYXNzOiByci5ub2RlX2NvbmZpZ19sb29rdXBbcnIucmVzb3VyY2VfaW5zdGFuY2UuZ3JhcGhfaWRdLmljb25jbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJyLm5vZGVfY29uZmlnX2xvb2t1cFtyci5yZXNvdXJjZV9pbnN0YW5jZS5ncmFwaF9pZF0uZmlsbENvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbkNvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbDogcnIudG90YWwudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWQ6IHJyLnJlc291cmNlX3JlbGF0aW9uc2hpcHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gocm9vdE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVNYXBbcmVzb3VyY2VJZF0gPSByb290Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlSWQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm9vdE5vZGUucmVsYXRpb25Db3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsTG9hZGVkID0gcm9vdE5vZGUucmVsYXRpb25Db3VudC5sb2FkZWQgKyByci5yZXNvdXJjZV9yZWxhdGlvbnNoaXBzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290Tm9kZS5yZWxhdGlvbkNvdW50LmxvYWRlZCA9IHRvdGFsTG9hZGVkIDw9IHJyLnRvdGFsLnZhbHVlID8gdG90YWxMb2FkZWQgOiByci50b3RhbC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vdE5vZGUucmVsYXRpb25Db3VudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IHJyLnRvdGFsLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWQ6IHJyLnJlc291cmNlX3JlbGF0aW9uc2hpcHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3ROb2RlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZU5vZGVJbmZvKHJvb3ROb2RlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdldFJlbGF0ZWQgPSBmdW5jdGlvbihyZWxhdGVkUmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZUNvbmZpZ0xvb2t1cCA9IHJyLm5vZGVfY29uZmlnX2xvb2t1cDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGVNYXBbcmVsYXRlZFJlc291cmNlLnJlc291cmNlaW5zdGFuY2VpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogbmV3Tm9kZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5aWQ6IHJlbGF0ZWRSZXNvdXJjZS5yZXNvdXJjZWluc3RhbmNlaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHl0eXBlaWQ6IHJlbGF0ZWRSZXNvdXJjZS5ncmFwaF9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlbGF0ZWRSZXNvdXJjZS5kaXNwbGF5bmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiByZWxhdGVkUmVzb3VyY2UuZGlzcGxheWRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG5vZGVDb25maWdMb29rdXBbcmVsYXRlZFJlc291cmNlLmdyYXBoX2lkXS5maWxsQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uY2xhc3M6IG5vZGVDb25maWdMb29rdXBbcmVsYXRlZFJlc291cmNlLmdyYXBoX2lkXS5pY29uY2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaG5hbWU6IG5vZGVDb25maWdMb29rdXBbcmVsYXRlZFJlc291cmNlLmdyYXBoX2lkXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb290OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ0FuY2VzdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbDogcmVsYXRlZFJlc291cmNlLnRvdGFsX3JlbGF0aW9ucy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWQ6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZU1hcFtyZWxhdGVkUmVzb3VyY2UucmVzb3VyY2VpbnN0YW5jZWlkXSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld05vZGVJZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2gocnIucmVsYXRlZF9yZXNvdXJjZXMsIGdldFJlbGF0ZWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2gocnIucmVzb3VyY2VfcmVsYXRpb25zaGlwcywgZnVuY3Rpb24ocmVzb3VyY2VSZWxhdGlvbnNoaXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUlkID0gbm9kZU1hcFtyZXNvdXJjZVJlbGF0aW9uc2hpcHMuZnJvbV9yZXNvdXJjZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldElkID0gbm9kZU1hcFtyZXNvdXJjZVJlbGF0aW9uc2hpcHMudG9fcmVzb3VyY2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWxhdGlvbnNoaXBTb3VyY2UgPSByZXNvdXJjZVJlbGF0aW9uc2hpcHMucmVsYXRpb25zaGlwdHlwZV9sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVsYXRpb25zaGlwVGFyZ2V0ID0gcmVzb3VyY2VSZWxhdGlvbnNoaXBzLnJlbGF0aW9uc2hpcHR5cGVfbGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc291cmNlUmVsYXRpb25zaGlwcy5yZWxhdGlvbnNoaXB0eXBlX2xhYmVsLnNwbGl0KCcvJykubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uc2hpcFNvdXJjZSA9IHJlc291cmNlUmVsYXRpb25zaGlwcy5yZWxhdGlvbnNoaXB0eXBlX2xhYmVsLnNwbGl0KCcvJylbMF0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbnNoaXBUYXJnZXQgPSByZXNvdXJjZVJlbGF0aW9uc2hpcHMucmVsYXRpb25zaGlwdHlwZV9sYWJlbC5zcGxpdCgnLycpWzFdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2VJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25zaGlwU291cmNlOiByZWxhdGlvbnNoaXBTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uc2hpcFRhcmdldDogcmVsYXRpb25zaGlwVGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghXy5oYXMobGlua01hcCwgW3NvdXJjZUlkLmlkICsgJ18nICsgdGFyZ2V0SWQuaWRdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rTWFwW3NvdXJjZUlkLmlkICsgJ18nICsgdGFyZ2V0SWQuaWRdID0ge3JlbGF0aW9uc2hpcHM6W119O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaGFzKGxpbmtNYXAsIFt0YXJnZXRJZC5pZCArICdfJyArIHNvdXJjZUlkLmlkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua01hcFt0YXJnZXRJZC5pZCArICdfJyArIHNvdXJjZUlkLmlkXSA9IHtyZWxhdGlvbnNoaXBzOltdfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uY29udGFpbnMobGlua01hcFtzb3VyY2VJZC5pZCArICdfJyArIHRhcmdldElkLmlkXVsncmVsYXRpb25zaGlwcyddLCByZWxhdGlvbnNoaXBTb3VyY2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rTWFwW3NvdXJjZUlkLmlkICsgJ18nICsgdGFyZ2V0SWQuaWRdWydyZWxhdGlvbnNoaXBzJ10ucHVzaChyZWxhdGlvbnNoaXBTb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5jb250YWlucyhsaW5rTWFwW3RhcmdldElkLmlkICsgJ18nICsgc291cmNlSWQuaWRdWydyZWxhdGlvbnNoaXBzJ10sIHJlbGF0aW9uc2hpcFNvdXJjZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtNYXBbdGFyZ2V0SWQuaWQgKyAnXycgKyBzb3VyY2VJZC5pZF1bJ3JlbGF0aW9uc2hpcHMnXS5wdXNoKHJlbGF0aW9uc2hpcFNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzID0gXy51bmlxKGxpbmtzLCBmdW5jdGlvbihpdGVtLCBrZXksIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnNvdXJjZS5pZCArICdfJyArIGl0ZW0udGFyZ2V0LmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZWFjaChsaW5rcywgZnVuY3Rpb24obCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaGFzKGxpbmtNYXAsIGwuc291cmNlLmlkICsgJ18nICsgbC50YXJnZXQuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwuYWxsX3JlbGF0aW9uc2hpcHMgPSBsaW5rTWFwW2wuc291cmNlLmlkICsgJ18nICsgbC50YXJnZXQuaWRdLnJlbGF0aW9uc2hpcHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0KG5vZGVMaXN0KCkuY29uY2F0KG5vZGVzKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlczogbm9kZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua3M6IGxpbmtzXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzZXRSb290ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsLmdyYXBoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAgPSB7fTtcbiAgICAgICAgICAgICAgICBsaW5rTWFwID0ge307XG4gICAgICAgICAgICAgICAgbm9kZUxpc3QoW10pO1xuICAgICAgICAgICAgICAgIGdldFJlc291cmNlRGF0YSh2YWwucmVzb3VyY2VpbnN0YW5jZWlkLCB2YWwuZGlzcGxheW5hbWUsIHZhbC5ncmFwaGlkLCBmdW5jdGlvbihuZXdEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gbmV3RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ub2Rlc1swXS54ID0gd2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLm5vZGVzWzBdLnkgPSBoZWlnaHQgLyAyIC0gMTYwO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY3VycmVudFJlc291cmNlKCkucmVzb3VyY2VpbnN0YW5jZWlkKSB7XG4gICAgICAgICAgICBzZXRSb290KGN1cnJlbnRSZXNvdXJjZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrby5pc09ic2VydmFibGUoY3VycmVudFJlc291cmNlKSkge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IGN1cnJlbnRSZXNvdXJjZS5zdWJzY3JpYmUoc2V0Um9vdCwgdGhpcyk7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHN1YnNjcmlwdGlvbnMsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB3ID0gJGVsLnBhcmVudCgpLndpZHRoKCk7XG4gICAgICAgICAgICB2YXIgaCA9ICRlbC5wYXJlbnQoKS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHN2Zy5hdHRyKFwid2lkdGhcIiwgdyk7XG4gICAgICAgICAgICBzdmcuYXR0cihcImhlaWdodFwiLCBoKTtcbiAgICAgICAgICAgIHN2Zy5hdHRyKFwidmlld0JveFwiLCBbMCwgMCwgdywgaF0pO1xuICAgICAgICB9KS50cmlnZ2VyKFwicmVzaXplXCIpO1xuXG5cbiAgICAgICAgbm9kZUxpc3Quc3Vic2NyaWJlKGZ1bmN0aW9uKGxpc3QpIHtcbiAgICAgICAgICAgIF8uZWFjaChsaXN0LCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZFN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaG92ZXJlZFN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZGNvdW50U3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZFN1YnNjcmlwdGlvbiA9IGl0ZW0uc2VsZWN0ZWQuc3Vic2NyaWJlKHVwZGF0ZVNlbGVjdGVkKGl0ZW0pLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBpdGVtLmhvdmVyZWRTdWJzY3JpcHRpb24gPSBpdGVtLmhvdmVyZWQuc3Vic2NyaWJlKHVwZGF0ZUhvdmVyZWQoaXRlbSksIHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzUm9vdCAmJiBpdGVtLmxvYWRjb3VudCgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZGNvdW50KDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtLmxvYWRjb3VudFN1YnNjcmlwdGlvbiA9IGl0ZW0ubG9hZGNvdW50LnN1YnNjcmliZShnZXRNb3JlRGF0YShpdGVtKSwgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5yZWxhdGlvbkNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZGVkKGl0ZW0ucmVsYXRpb25Db3VudC5sb2FkZWQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnRvdGFsKGl0ZW0ucmVsYXRpb25Db3VudC50b3RhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIG5vZGVMaXN0KFtdKTtcbiAgICB9XG59O1xua28uYmluZGluZ0hhbmRsZXJzLnJlbGF0ZWRSZXNvdXJjZXNHcmFwaC5pbml0ID0ga28uYmluZGluZ0hhbmRsZXJzLnJlbGF0ZWRSZXNvdXJjZXNHcmFwaC5pbml0LmJpbmQoa28uYmluZGluZ0hhbmRsZXJzLnJlbGF0ZWRSZXNvdXJjZXNHcmFwaCk7XG5cbmV4cG9ydCBkZWZhdWx0IGtvLmJpbmRpbmdIYW5kbGVycy5yZWxhdGVkUmVzb3VyY2VzR3JhcGg7XG4iXSwibmFtZXMiOlsia28iLCIkIiwiXyIsImQzIiwiYXJjaGVzIiwiYmluZGluZ0hhbmRsZXJzIiwicmVsYXRlZFJlc291cmNlc0dyYXBoIiwiaW5pdCIsImVsZW1lbnQiLCJ2YWx1ZUFjY2Vzc29yIiwibW9kZWxNYXAiLCJyZXNvdXJjZXMiLCJyZWR1Y2UiLCJhIiwidiIsImdyYXBoaWQiLCJvcHRpb25zIiwidW53cmFwIiwic3Vic2NyaXB0aW9ucyIsIm5vZGVTZWxlY3Rpb24iLCJzZWxlY3RlZFN0YXRlIiwib2JzZXJ2YWJsZSIsIiRlbCIsIndpZHRoIiwicGFyZW50IiwiaGVpZ2h0IiwibmV3Tm9kZUlkIiwibm9kZU1hcCIsImxpbmtNYXAiLCJkYXRhIiwibm9kZXMiLCJsaW5rcyIsInRleHRzIiwic2VsZWN0ZWROb2RlIiwic2ltdWxhdGlvbiIsImZvcmNlU2ltdWxhdGlvbiIsImZvcmNlIiwiZm9yY2VMaW5rIiwiZm9yY2VDb2xsaWRlIiwicmFkaXVzIiwiZm9yY2VSYWRpYWwiLCJmb3JjZUNlbnRlciIsImFscGhhIiwibm9kZUxpc3QiLCJjdXJyZW50UmVzb3VyY2UiLCJzZWxlY3ROb2RlIiwiZCIsIm5vZGVzRWxlbWVudCIsInNlbGVjdEFsbCIsImF0dHIiLCJkMSIsImNsYXNzTmFtZSIsImlzUm9vdCIsImhhcyIsImlkIiwibGlua3NFbGVtZW50IiwibCIsInNvdXJjZSIsInRhcmdldCIsInVwZGF0ZU5vZGVJbmZvIiwiY2xlYXJIb3ZlciIsInNlbGVjdGVkIiwiaG92ZXJOb2RlIiwidXBkYXRlU2VsZWN0ZWQiLCJpdGVtIiwidmFsIiwicmVtb3ZlQWxsIiwidXBkYXRlSG92ZXJlZCIsInN2ZyIsInNlbGVjdCIsImFwcGVuZCIsImNhbGwiLCJ6b29tIiwiZXh0ZW50Iiwic2NhbGVFeHRlbnQiLCJvbiIsImV2ZW50IiwiZ3JvdXBFbGVtZW50IiwidHJhbnNmb3JtIiwidXBkYXRlIiwid2luZG93IiwidHJpZ2dlciIsInJlc3RhcnQiLCJsaW5rIiwiam9pbiIsImhvdmVyZWROb2RlcyIsIm1hdHJpeCIsInJlbGF0aW9uc2hpcCIsInJlbGF0aW9uc2hpcFRhcmdldCIsInJlbGF0aW9uc2hpcFNvdXJjZSIsInJlbGF0aW9uc2hpcHMiLCJhbGxfcmVsYXRpb25zaGlwcyIsImdldFNjcmVlbkNUTSIsImFic1giLCJ4IiwiYyIsInkiLCJlIiwiYWJzWSIsImIiLCJmIiwicHVzaCIsImV4aXQiLCJyZW1vdmUiLCJub2RlIiwic3R5bGUiLCJjb2xvciIsImVhY2giLCJuIiwiZW50aXR5aWQiLCJob3ZlcmVkIiwicmVsYXRpb25Db3VudCIsImxvYWRlZCIsInRvdGFsIiwiZGVmYXVsdFByZXZlbnRlZCIsImxvYWRjb3VudCIsImRyYWciLCJkcmFnc3RhcnRlZCIsImRyYWdnZWQiLCJkcmFnZW5kZWQiLCJhY3RpdmUiLCJhbHBoYVRhcmdldCIsImZ4IiwiZnkiLCJ0ZXh0IiwibmFtZSIsImljb25FbCIsImZpbmQiLCJodG1sIiwidXJscyIsInJlcG9ydHMiLCJlbnRpdHl0eXBlaWQiLCJoaWRlIiwic2hvdyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJpY29uIiwiZ2V0UmVzb3VyY2VEYXRhRm9yTm9kZSIsImdldFJlc291cmNlRGF0YSIsIm5ld0RhdGEiLCJsZW5ndGgiLCJjb25jYXQiLCJnZXRNb3JlRGF0YSIsInJlc291cmNlSWQiLCJyZXNvdXJjZU5hbWUiLCJyZXNvdXJjZVR5cGVJZCIsImNhbGxiYWNrIiwibG9hZCIsInN0YXJ0IiwicGFnZSIsInJvb3ROb2RlIiwibG9hZGluZyIsImFqYXgiLCJ1cmwiLCJyZWxhdGVkX3Jlc291cmNlcyIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInJyIiwidG90YWxMb2FkZWQiLCJkZXNjcmlwdGlvbiIsInJlc291cmNlX2luc3RhbmNlIiwiZGlzcGxheWRlc2NyaXB0aW9uIiwicmVsYXRpb25UeXBlIiwiZ3JhcGhuYW1lIiwibm9kZV9jb25maWdfbG9va3VwIiwiZ3JhcGhfaWQiLCJpY29uY2xhc3MiLCJmaWxsQ29sb3IiLCJ2YWx1ZSIsInJlc291cmNlX3JlbGF0aW9uc2hpcHMiLCJnZXRSZWxhdGVkIiwicmVsYXRlZFJlc291cmNlIiwibm9kZUNvbmZpZ0xvb2t1cCIsInJlc291cmNlaW5zdGFuY2VpZCIsImRpc3BsYXluYW1lIiwidG90YWxfcmVsYXRpb25zIiwicmVzb3VyY2VSZWxhdGlvbnNoaXBzIiwic291cmNlSWQiLCJmcm9tX3Jlc291cmNlIiwidGFyZ2V0SWQiLCJ0b19yZXNvdXJjZSIsInJlbGF0aW9uc2hpcHR5cGVfbGFiZWwiLCJzcGxpdCIsInRyaW0iLCJ3ZWlnaHQiLCJjb250YWlucyIsInVuaXEiLCJrZXkiLCJzZXRSb290IiwidW5kZWZpbmVkIiwiaXNPYnNlcnZhYmxlIiwic3Vic2NyaXB0aW9uIiwic3Vic2NyaWJlIiwicyIsImRpc3Bvc2UiLCJ3IiwiaCIsImxpc3QiLCJzZWxlY3RlZFN1YnNjcmlwdGlvbiIsImhvdmVyZWRTdWJzY3JpcHRpb24iLCJsb2FkY291bnRTdWJzY3JpcHRpb24iLCJiaW5kIl0sInNvdXJjZVJvb3QiOiIifQ==