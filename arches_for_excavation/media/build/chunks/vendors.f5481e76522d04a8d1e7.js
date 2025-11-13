(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[31144],{

/***/ 31144:
/*!********************************************!*\
  !*** ./node_modules/jqtree/tree.jquery.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! ./node_modules/jquery/dist/jquery.min */ 33270);
/*
JqTree 1.3.4

Copyright 2015 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=undefined;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=undefined;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $, DragAndDropHandler, DragElement, HitAreasGenerator, Position, VisibleNodeIterator, node_module, util,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

node_module = require('./node');

util = require('./util');

Position = node_module.Position;

$ = jQuery;

DragAndDropHandler = (function() {
  function DragAndDropHandler(tree_widget) {
    this.tree_widget = tree_widget;
    this.hovered_area = null;
    this.$ghost = null;
    this.hit_areas = [];
    this.is_dragging = false;
    this.current_item = null;
  }

  DragAndDropHandler.prototype.mouseCapture = function(position_info) {
    var $element, node_element;
    $element = $(position_info.target);
    if (!this.mustCaptureElement($element)) {
      return null;
    }
    if (this.tree_widget.options.onIsMoveHandle && !this.tree_widget.options.onIsMoveHandle($element)) {
      return null;
    }
    node_element = this.tree_widget._getNodeElement($element);
    if (node_element && this.tree_widget.options.onCanMove) {
      if (!this.tree_widget.options.onCanMove(node_element.node)) {
        node_element = null;
      }
    }
    this.current_item = node_element;
    return this.current_item !== null;
  };

  DragAndDropHandler.prototype.mouseStart = function(position_info) {
    var offset;
    this.refresh();
    offset = $(position_info.target).offset();
    this.drag_element = new DragElement(this.current_item.node, position_info.page_x - offset.left, position_info.page_y - offset.top, this.tree_widget.element);
    this.is_dragging = true;
    this.current_item.$element.addClass('jqtree-moving');
    return true;
  };

  DragAndDropHandler.prototype.mouseDrag = function(position_info) {
    var area, can_move_to;
    this.drag_element.move(position_info.page_x, position_info.page_y);
    area = this.findHoveredArea(position_info.page_x, position_info.page_y);
    can_move_to = this.canMoveToArea(area);
    if (can_move_to && area) {
      if (!area.node.isFolder()) {
        this.stopOpenFolderTimer();
      }
      if (this.hovered_area !== area) {
        this.hovered_area = area;
        if (this.mustOpenFolderTimer(area)) {
          this.startOpenFolderTimer(area.node);
        } else {
          this.stopOpenFolderTimer();
        }
        this.updateDropHint();
      }
    } else {
      this.removeHover();
      this.removeDropHint();
      this.stopOpenFolderTimer();
    }
    if (!area) {
      if (this.tree_widget.options.onDragMove != null) {
        this.tree_widget.options.onDragMove(this.current_item.node, position_info.original_event);
      }
    }
    return true;
  };

  DragAndDropHandler.prototype.mustCaptureElement = function($element) {
    return !$element.is('input,select');
  };

  DragAndDropHandler.prototype.canMoveToArea = function(area) {
    var position_name;
    if (!area) {
      return false;
    } else if (this.tree_widget.options.onCanMoveTo) {
      position_name = Position.getName(area.position);
      return this.tree_widget.options.onCanMoveTo(this.current_item.node, area.node, position_name);
    } else {
      return true;
    }
  };

  DragAndDropHandler.prototype.mouseStop = function(position_info) {
    var current_item;
    this.moveItem(position_info);
    this.clear();
    this.removeHover();
    this.removeDropHint();
    this.removeHitAreas();
    current_item = this.current_item;
    if (this.current_item) {
      this.current_item.$element.removeClass('jqtree-moving');
      this.current_item = null;
    }
    this.is_dragging = false;
    if (!this.hovered_area && current_item) {
      if (this.tree_widget.options.onDragStop != null) {
        this.tree_widget.options.onDragStop(current_item.node, position_info.original_event);
      }
    }
    return false;
  };

  DragAndDropHandler.prototype.refresh = function() {
    this.removeHitAreas();
    if (this.current_item) {
      this.generateHitAreas();
      this.current_item = this.tree_widget._getNodeElementForNode(this.current_item.node);
      if (this.is_dragging) {
        return this.current_item.$element.addClass('jqtree-moving');
      }
    }
  };

  DragAndDropHandler.prototype.removeHitAreas = function() {
    return this.hit_areas = [];
  };

  DragAndDropHandler.prototype.clear = function() {
    this.drag_element.remove();
    return this.drag_element = null;
  };

  DragAndDropHandler.prototype.removeDropHint = function() {
    if (this.previous_ghost) {
      return this.previous_ghost.remove();
    }
  };

  DragAndDropHandler.prototype.removeHover = function() {
    return this.hovered_area = null;
  };

  DragAndDropHandler.prototype.generateHitAreas = function() {
    var hit_areas_generator;
    hit_areas_generator = new HitAreasGenerator(this.tree_widget.tree, this.current_item.node, this.getTreeDimensions().bottom);
    return this.hit_areas = hit_areas_generator.generate();
  };

  DragAndDropHandler.prototype.findHoveredArea = function(x, y) {
    var area, dimensions, high, low, mid;
    dimensions = this.getTreeDimensions();
    if (x < dimensions.left || y < dimensions.top || x > dimensions.right || y > dimensions.bottom) {
      return null;
    }
    low = 0;
    high = this.hit_areas.length;
    while (low < high) {
      mid = (low + high) >> 1;
      area = this.hit_areas[mid];
      if (y < area.top) {
        high = mid;
      } else if (y > area.bottom) {
        low = mid + 1;
      } else {
        return area;
      }
    }
    return null;
  };

  DragAndDropHandler.prototype.mustOpenFolderTimer = function(area) {
    var node;
    node = area.node;
    return node.isFolder() && !node.is_open && area.position === Position.INSIDE;
  };

  DragAndDropHandler.prototype.updateDropHint = function() {
    var node_element;
    if (!this.hovered_area) {
      return;
    }
    this.removeDropHint();
    node_element = this.tree_widget._getNodeElementForNode(this.hovered_area.node);
    return this.previous_ghost = node_element.addDropHint(this.hovered_area.position);
  };

  DragAndDropHandler.prototype.startOpenFolderTimer = function(folder) {
    var openFolder;
    openFolder = (function(_this) {
      return function() {
        return _this.tree_widget._openNode(folder, _this.tree_widget.options.slide, function() {
          _this.refresh();
          return _this.updateDropHint();
        });
      };
    })(this);
    this.stopOpenFolderTimer();
    return this.open_folder_timer = setTimeout(openFolder, this.tree_widget.options.openFolderDelay);
  };

  DragAndDropHandler.prototype.stopOpenFolderTimer = function() {
    if (this.open_folder_timer) {
      clearTimeout(this.open_folder_timer);
      return this.open_folder_timer = null;
    }
  };

  DragAndDropHandler.prototype.moveItem = function(position_info) {
    var doMove, event, moved_node, position, previous_parent, target_node;
    if (this.hovered_area && this.hovered_area.position !== Position.NONE && this.canMoveToArea(this.hovered_area)) {
      moved_node = this.current_item.node;
      target_node = this.hovered_area.node;
      position = this.hovered_area.position;
      previous_parent = moved_node.parent;
      if (position === Position.INSIDE) {
        this.hovered_area.node.is_open = true;
      }
      doMove = (function(_this) {
        return function() {
          _this.tree_widget.tree.moveNode(moved_node, target_node, position);
          _this.tree_widget.element.empty();
          return _this.tree_widget._refreshElements();
        };
      })(this);
      event = this.tree_widget._triggerEvent('tree.move', {
        move_info: {
          moved_node: moved_node,
          target_node: target_node,
          position: Position.getName(position),
          previous_parent: previous_parent,
          do_move: doMove,
          original_event: position_info.original_event
        }
      });
      if (!event.isDefaultPrevented()) {
        return doMove();
      }
    }
  };

  DragAndDropHandler.prototype.getTreeDimensions = function() {
    var offset;
    offset = this.tree_widget.element.offset();
    return {
      left: offset.left,
      top: offset.top,
      right: offset.left + this.tree_widget.element.width(),
      bottom: offset.top + this.tree_widget.element.height() + 16
    };
  };

  return DragAndDropHandler;

})();

VisibleNodeIterator = (function() {
  function VisibleNodeIterator(tree) {
    this.tree = tree;
  }

  VisibleNodeIterator.prototype.iterate = function() {
    var _iterateNode, is_first_node;
    is_first_node = true;
    _iterateNode = (function(_this) {
      return function(node, next_node) {
        var $element, child, children_length, i, j, len, must_iterate_inside, ref;
        must_iterate_inside = (node.is_open || !node.element) && node.hasChildren();
        if (node.element) {
          $element = $(node.element);
          if (!$element.is(':visible')) {
            return;
          }
          if (is_first_node) {
            _this.handleFirstNode(node, $element);
            is_first_node = false;
          }
          if (!node.hasChildren()) {
            _this.handleNode(node, next_node, $element);
          } else if (node.is_open) {
            if (!_this.handleOpenFolder(node, $element)) {
              must_iterate_inside = false;
            }
          } else {
            _this.handleClosedFolder(node, next_node, $element);
          }
        }
        if (must_iterate_inside) {
          children_length = node.children.length;
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            child = ref[i];
            if (i === (children_length - 1)) {
              _iterateNode(node.children[i], null);
            } else {
              _iterateNode(node.children[i], node.children[i + 1]);
            }
          }
          if (node.is_open) {
            return _this.handleAfterOpenFolder(node, next_node, $element);
          }
        }
      };
    })(this);
    return _iterateNode(this.tree, null);
  };

  VisibleNodeIterator.prototype.handleNode = function(node, next_node, $element) {};

  VisibleNodeIterator.prototype.handleOpenFolder = function(node, $element) {};

  VisibleNodeIterator.prototype.handleClosedFolder = function(node, next_node, $element) {};

  VisibleNodeIterator.prototype.handleAfterOpenFolder = function(node, next_node, $element) {};

  VisibleNodeIterator.prototype.handleFirstNode = function(node, $element) {};

  return VisibleNodeIterator;

})();

HitAreasGenerator = (function(superClass) {
  extend(HitAreasGenerator, superClass);

  function HitAreasGenerator(tree, current_node, tree_bottom) {
    HitAreasGenerator.__super__.constructor.call(this, tree);
    this.current_node = current_node;
    this.tree_bottom = tree_bottom;
  }

  HitAreasGenerator.prototype.generate = function() {
    this.positions = [];
    this.last_top = 0;
    this.iterate();
    return this.generateHitAreas(this.positions);
  };

  HitAreasGenerator.prototype.getTop = function($element) {
    return $element.offset().top;
  };

  HitAreasGenerator.prototype.addPosition = function(node, position, top) {
    var area;
    area = {
      top: top,
      node: node,
      position: position
    };
    this.positions.push(area);
    return this.last_top = top;
  };

  HitAreasGenerator.prototype.handleNode = function(node, next_node, $element) {
    var top;
    top = this.getTop($element);
    if (node === this.current_node) {
      this.addPosition(node, Position.NONE, top);
    } else {
      this.addPosition(node, Position.INSIDE, top);
    }
    if (next_node === this.current_node || node === this.current_node) {
      return this.addPosition(node, Position.NONE, top);
    } else {
      return this.addPosition(node, Position.AFTER, top);
    }
  };

  HitAreasGenerator.prototype.handleOpenFolder = function(node, $element) {
    if (node === this.current_node) {
      return false;
    }
    if (node.children[0] !== this.current_node) {
      this.addPosition(node, Position.INSIDE, this.getTop($element));
    }
    return true;
  };

  HitAreasGenerator.prototype.handleClosedFolder = function(node, next_node, $element) {
    var top;
    top = this.getTop($element);
    if (node === this.current_node) {
      return this.addPosition(node, Position.NONE, top);
    } else {
      this.addPosition(node, Position.INSIDE, top);
      if (next_node !== this.current_node) {
        return this.addPosition(node, Position.AFTER, top);
      }
    }
  };

  HitAreasGenerator.prototype.handleFirstNode = function(node, $element) {
    if (node !== this.current_node) {
      return this.addPosition(node, Position.BEFORE, this.getTop($(node.element)));
    }
  };

  HitAreasGenerator.prototype.handleAfterOpenFolder = function(node, next_node, $element) {
    if (node === this.current_node.node || next_node === this.current_node.node) {
      return this.addPosition(node, Position.NONE, this.last_top);
    } else {
      return this.addPosition(node, Position.AFTER, this.last_top);
    }
  };

  HitAreasGenerator.prototype.generateHitAreas = function(positions) {
    var group, hit_areas, j, len, position, previous_top;
    previous_top = -1;
    group = [];
    hit_areas = [];
    for (j = 0, len = positions.length; j < len; j++) {
      position = positions[j];
      if (position.top !== previous_top && group.length) {
        if (group.length) {
          this.generateHitAreasForGroup(hit_areas, group, previous_top, position.top);
        }
        previous_top = position.top;
        group = [];
      }
      group.push(position);
    }
    this.generateHitAreasForGroup(hit_areas, group, previous_top, this.tree_bottom);
    return hit_areas;
  };

  HitAreasGenerator.prototype.generateHitAreasForGroup = function(hit_areas, positions_in_group, top, bottom) {
    var area_height, area_top, i, position, position_count;
    position_count = Math.min(positions_in_group.length, 4);
    area_height = Math.round((bottom - top) / position_count);
    area_top = top;
    i = 0;
    while (i < position_count) {
      position = positions_in_group[i];
      hit_areas.push({
        top: area_top,
        bottom: area_top + area_height,
        node: position.node,
        position: position.position
      });
      area_top += area_height;
      i += 1;
    }
    return null;
  };

  return HitAreasGenerator;

})(VisibleNodeIterator);

DragElement = (function() {
  function DragElement(node, offset_x, offset_y, $tree) {
    var node_name;
    this.offset_x = offset_x;
    this.offset_y = offset_y;
    node_name = util.html_escape(node.name);
    this.$element = $("<span class=\"jqtree-title jqtree-dragging\">" + node_name + "</span>");
    this.$element.css("position", "absolute");
    $tree.append(this.$element);
  }

  DragElement.prototype.move = function(page_x, page_y) {
    return this.$element.offset({
      left: page_x - this.offset_x,
      top: page_y - this.offset_y
    });
  };

  DragElement.prototype.remove = function() {
    return this.$element.remove();
  };

  return DragElement;

})();

module.exports = {
  DragAndDropHandler: DragAndDropHandler,
  DragElement: DragElement,
  HitAreasGenerator: HitAreasGenerator
};

},{"./node":5,"./util":12}],2:[function(require,module,exports){
var $, ElementsRenderer, NodeElement, html_escape, node_element, util;

node_element = require('./node_element');

NodeElement = node_element.NodeElement;

util = require('./util');

html_escape = util.html_escape;

$ = jQuery;

ElementsRenderer = (function() {
  function ElementsRenderer(tree_widget) {
    this.tree_widget = tree_widget;
    this.opened_icon_element = this.createButtonElement(tree_widget.options.openedIcon);
    this.closed_icon_element = this.createButtonElement(tree_widget.options.closedIcon);
  }

  ElementsRenderer.prototype.render = function(from_node) {
    if (from_node && from_node.parent) {
      return this.renderFromNode(from_node);
    } else {
      return this.renderFromRoot();
    }
  };

  ElementsRenderer.prototype.renderFromRoot = function() {
    var $element;
    $element = this.tree_widget.element;
    $element.empty();
    return this.createDomElements($element[0], this.tree_widget.tree.children, true, true, 1);
  };

  ElementsRenderer.prototype.renderFromNode = function(node) {
    var $previous_li, li;
    $previous_li = $(node.element);
    li = this.createLi(node, node.getLevel());
    this.attachNodeData(node, li);
    $previous_li.after(li);
    $previous_li.remove();
    if (node.children) {
      return this.createDomElements(li, node.children, false, false, node.getLevel() + 1);
    }
  };

  ElementsRenderer.prototype.createDomElements = function(element, children, is_root_node, is_open, level) {
    var child, i, len, li, ul;
    ul = this.createUl(is_root_node);
    element.appendChild(ul);
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      li = this.createLi(child, level);
      ul.appendChild(li);
      this.attachNodeData(child, li);
      if (child.hasChildren()) {
        this.createDomElements(li, child.children, false, child.is_open, level + 1);
      }
    }
    return null;
  };

  ElementsRenderer.prototype.attachNodeData = function(node, li) {
    node.element = li;
    return $(li).data('node', node);
  };

  ElementsRenderer.prototype.createUl = function(is_root_node) {
    var class_string, role, ul;
    if (!is_root_node) {
      class_string = '';
      role = 'group';
    } else {
      class_string = 'jqtree-tree';
      role = 'tree';
      if (this.tree_widget.options.rtl) {
        class_string += ' jqtree-rtl';
      }
    }
    ul = document.createElement('ul');
    ul.className = "jqtree_common " + class_string;
    ul.setAttribute('role', role);
    return ul;
  };

  ElementsRenderer.prototype.createLi = function(node, level) {
    var is_selected, li;
    is_selected = this.tree_widget.select_node_handler && this.tree_widget.select_node_handler.isNodeSelected(node);
    if (node.isFolder()) {
      li = this.createFolderLi(node, level, is_selected);
    } else {
      li = this.createNodeLi(node, level, is_selected);
    }
    if (this.tree_widget.options.onCreateLi) {
      this.tree_widget.options.onCreateLi(node, $(li));
    }
    return li;
  };

  ElementsRenderer.prototype.createFolderLi = function(node, level, is_selected) {
    var button_classes, button_link, div, folder_classes, icon_element, is_folder, li;
    button_classes = this.getButtonClasses(node);
    folder_classes = this.getFolderClasses(node, is_selected);
    if (node.is_open) {
      icon_element = this.opened_icon_element;
    } else {
      icon_element = this.closed_icon_element;
    }
    li = document.createElement('li');
    li.className = "jqtree_common " + folder_classes;
    li.setAttribute('role', 'presentation');
    div = document.createElement('div');
    div.className = "jqtree-element jqtree_common";
    div.setAttribute('role', 'presentation');
    li.appendChild(div);
    button_link = document.createElement('a');
    button_link.className = button_classes;
    button_link.appendChild(icon_element.cloneNode(false));
    button_link.setAttribute('role', 'presentation');
    button_link.setAttribute('aria-hidden', 'true');
    if (this.tree_widget.options.buttonLeft) {
      div.appendChild(button_link);
    }
    div.appendChild(this.createTitleSpan(node.name, level, is_selected, node.is_open, is_folder = true));
    if (!this.tree_widget.options.buttonLeft) {
      div.appendChild(button_link);
    }
    return li;
  };

  ElementsRenderer.prototype.createNodeLi = function(node, level, is_selected) {
    var class_string, div, is_folder, li, li_classes;
    li_classes = ['jqtree_common'];
    if (is_selected) {
      li_classes.push('jqtree-selected');
    }
    class_string = li_classes.join(' ');
    li = document.createElement('li');
    li.className = class_string;
    li.setAttribute('role', 'presentation');
    div = document.createElement('div');
    div.className = "jqtree-element jqtree_common";
    div.setAttribute('role', 'presentation');
    li.appendChild(div);
    div.appendChild(this.createTitleSpan(node.name, level, is_selected, node.is_open, is_folder = false));
    return li;
  };

  ElementsRenderer.prototype.createTitleSpan = function(node_name, level, is_selected, is_open, is_folder) {
    var classes, title_span;
    title_span = document.createElement('span');
    classes = "jqtree-title jqtree_common";
    if (is_folder) {
      classes += " jqtree-title-folder";
    }
    title_span.className = classes;
    title_span.setAttribute('role', 'treeitem');
    title_span.setAttribute('aria-level', level);
    title_span.setAttribute('aria-selected', util.getBoolString(is_selected));
    title_span.setAttribute('aria-expanded', util.getBoolString(is_open));
    if (is_selected) {
      title_span.setAttribute('tabindex', 0);
    }
    title_span.innerHTML = this.escapeIfNecessary(node_name);
    return title_span;
  };

  ElementsRenderer.prototype.getButtonClasses = function(node) {
    var classes;
    classes = ['jqtree-toggler', 'jqtree_common'];
    if (!node.is_open) {
      classes.push('jqtree-closed');
    }
    if (this.tree_widget.options.buttonLeft) {
      classes.push('jqtree-toggler-left');
    } else {
      classes.push('jqtree-toggler-right');
    }
    return classes.join(' ');
  };

  ElementsRenderer.prototype.getFolderClasses = function(node, is_selected) {
    var classes;
    classes = ['jqtree-folder'];
    if (!node.is_open) {
      classes.push('jqtree-closed');
    }
    if (is_selected) {
      classes.push('jqtree-selected');
    }
    if (node.is_loading) {
      classes.push('jqtree-loading');
    }
    return classes.join(' ');
  };

  ElementsRenderer.prototype.escapeIfNecessary = function(value) {
    if (this.tree_widget.options.autoEscape) {
      return html_escape(value);
    } else {
      return value;
    }
  };

  ElementsRenderer.prototype.createButtonElement = function(value) {
    var div;
    if (typeof value === 'string') {
      div = document.createElement('div');
      div.innerHTML = value;
      return document.createTextNode(div.innerHTML);
    } else {
      return $(value)[0];
    }
  };

  return ElementsRenderer;

})();

module.exports = ElementsRenderer;

},{"./node_element":6,"./util":12}],3:[function(require,module,exports){
var $, KeyHandler,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$ = jQuery;

KeyHandler = (function() {
  var DOWN, LEFT, RIGHT, UP;

  LEFT = 37;

  UP = 38;

  RIGHT = 39;

  DOWN = 40;

  function KeyHandler(tree_widget) {
    this.selectNode = bind(this.selectNode, this);
    this.tree_widget = tree_widget;
    if (tree_widget.options.keyboardSupport) {
      $(document).bind('keydown.jqtree', $.proxy(this.handleKeyDown, this));
    }
  }

  KeyHandler.prototype.deinit = function() {
    return $(document).unbind('keydown.jqtree');
  };

  KeyHandler.prototype.moveDown = function() {
    var node;
    node = this.tree_widget.getSelectedNode();
    if (node) {
      return this.selectNode(node.getNextNode());
    } else {
      return false;
    }
  };

  KeyHandler.prototype.moveUp = function() {
    var node;
    node = this.tree_widget.getSelectedNode();
    if (node) {
      return this.selectNode(node.getPreviousNode());
    } else {
      return false;
    }
  };

  KeyHandler.prototype.moveRight = function() {
    var node;
    node = this.tree_widget.getSelectedNode();
    if (!node) {
      return true;
    } else if (!node.isFolder()) {
      return true;
    } else {
      if (node.is_open) {
        return this.selectNode(node.getNextNode());
      } else {
        this.tree_widget.openNode(node);
        return false;
      }
    }
  };

  KeyHandler.prototype.moveLeft = function() {
    var node;
    node = this.tree_widget.getSelectedNode();
    if (!node) {
      return true;
    } else if (node.isFolder() && node.is_open) {
      this.tree_widget.closeNode(node);
      return false;
    } else {
      return this.selectNode(node.getParent());
    }
  };

  KeyHandler.prototype.handleKeyDown = function(e) {
    var key;
    if (!this.tree_widget.options.keyboardSupport) {
      return true;
    }
    if ($(document.activeElement).is('textarea,input,select')) {
      return true;
    }
    if (!this.tree_widget.getSelectedNode()) {
      return true;
    }
    key = e.which;
    switch (key) {
      case DOWN:
        return this.moveDown();
      case UP:
        return this.moveUp();
      case RIGHT:
        return this.moveRight();
      case LEFT:
        return this.moveLeft();
    }
    return true;
  };

  KeyHandler.prototype.selectNode = function(node) {
    if (!node) {
      return true;
    } else {
      this.tree_widget.selectNode(node);
      if (this.tree_widget.scroll_handler && (!this.tree_widget.scroll_handler.isScrolledIntoView($(node.element).find('.jqtree-element')))) {
        this.tree_widget.scrollToNode(node);
      }
      return false;
    }
  };

  return KeyHandler;

})();

module.exports = KeyHandler;

},{}],4:[function(require,module,exports){

/*
This widget does the same a the mouse widget in jqueryui.
 */
var $, MouseWidget, SimpleWidget,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimpleWidget = require('./simple.widget');

$ = jQuery;

MouseWidget = (function(superClass) {
  extend(MouseWidget, superClass);

  function MouseWidget() {
    return MouseWidget.__super__.constructor.apply(this, arguments);
  }

  MouseWidget.is_mouse_handled = false;

  MouseWidget.prototype._init = function() {
    this.$el.bind('mousedown.mousewidget', $.proxy(this._mouseDown, this));
    this.$el.bind('touchstart.mousewidget', $.proxy(this._touchStart, this));
    this.is_mouse_started = false;
    this.mouse_delay = 0;
    this._mouse_delay_timer = null;
    this._is_mouse_delay_met = true;
    return this.mouse_down_info = null;
  };

  MouseWidget.prototype._deinit = function() {
    var $document;
    this.$el.unbind('mousedown.mousewidget');
    this.$el.unbind('touchstart.mousewidget');
    $document = $(document);
    $document.unbind('mousemove.mousewidget');
    return $document.unbind('mouseup.mousewidget');
  };

  MouseWidget.prototype._mouseDown = function(e) {
    var result;
    if (e.which !== 1) {
      return;
    }
    result = this._handleMouseDown(e, this._getPositionInfo(e));
    if (result) {
      e.preventDefault();
    }
    return result;
  };

  MouseWidget.prototype._handleMouseDown = function(e, position_info) {
    if (MouseWidget.is_mouse_handled) {
      return;
    }
    if (this.is_mouse_started) {
      this._handleMouseUp(position_info);
    }
    this.mouse_down_info = position_info;
    if (!this._mouseCapture(position_info)) {
      return;
    }
    this._handleStartMouse();
    this.is_mouse_handled = true;
    return true;
  };

  MouseWidget.prototype._handleStartMouse = function() {
    var $document;
    $document = $(document);
    $document.bind('mousemove.mousewidget', $.proxy(this._mouseMove, this));
    $document.bind('touchmove.mousewidget', $.proxy(this._touchMove, this));
    $document.bind('mouseup.mousewidget', $.proxy(this._mouseUp, this));
    $document.bind('touchend.mousewidget', $.proxy(this._touchEnd, this));
    if (this.mouse_delay) {
      return this._startMouseDelayTimer();
    }
  };

  MouseWidget.prototype._startMouseDelayTimer = function() {
    if (this._mouse_delay_timer) {
      clearTimeout(this._mouse_delay_timer);
    }
    this._mouse_delay_timer = setTimeout((function(_this) {
      return function() {
        return _this._is_mouse_delay_met = true;
      };
    })(this), this.mouse_delay);
    return this._is_mouse_delay_met = false;
  };

  MouseWidget.prototype._mouseMove = function(e) {
    return this._handleMouseMove(e, this._getPositionInfo(e));
  };

  MouseWidget.prototype._handleMouseMove = function(e, position_info) {
    if (this.is_mouse_started) {
      this._mouseDrag(position_info);
      return e.preventDefault();
    }
    if (this.mouse_delay && !this._is_mouse_delay_met) {
      return true;
    }
    this.is_mouse_started = this._mouseStart(this.mouse_down_info) !== false;
    if (this.is_mouse_started) {
      this._mouseDrag(position_info);
    } else {
      this._handleMouseUp(position_info);
    }
    return !this.is_mouse_started;
  };

  MouseWidget.prototype._getPositionInfo = function(e) {
    return {
      page_x: e.pageX,
      page_y: e.pageY,
      target: e.target,
      original_event: e
    };
  };

  MouseWidget.prototype._mouseUp = function(e) {
    return this._handleMouseUp(this._getPositionInfo(e));
  };

  MouseWidget.prototype._handleMouseUp = function(position_info) {
    var $document;
    $document = $(document);
    $document.unbind('mousemove.mousewidget');
    $document.unbind('touchmove.mousewidget');
    $document.unbind('mouseup.mousewidget');
    $document.unbind('touchend.mousewidget');
    if (this.is_mouse_started) {
      this.is_mouse_started = false;
      this._mouseStop(position_info);
    }
  };

  MouseWidget.prototype._mouseCapture = function(position_info) {
    return true;
  };

  MouseWidget.prototype._mouseStart = function(position_info) {
    return null;
  };

  MouseWidget.prototype._mouseDrag = function(position_info) {
    return null;
  };

  MouseWidget.prototype._mouseStop = function(position_info) {
    return null;
  };

  MouseWidget.prototype.setMouseDelay = function(mouse_delay) {
    return this.mouse_delay = mouse_delay;
  };

  MouseWidget.prototype._touchStart = function(e) {
    var touch;
    if (e.originalEvent.touches.length > 1) {
      return;
    }
    touch = e.originalEvent.changedTouches[0];
    return this._handleMouseDown(e, this._getPositionInfo(touch));
  };

  MouseWidget.prototype._touchMove = function(e) {
    var touch;
    if (e.originalEvent.touches.length > 1) {
      return;
    }
    touch = e.originalEvent.changedTouches[0];
    return this._handleMouseMove(e, this._getPositionInfo(touch));
  };

  MouseWidget.prototype._touchEnd = function(e) {
    var touch;
    if (e.originalEvent.touches.length > 1) {
      return;
    }
    touch = e.originalEvent.changedTouches[0];
    return this._handleMouseUp(this._getPositionInfo(touch));
  };

  return MouseWidget;

})(SimpleWidget);

module.exports = MouseWidget;

},{"./simple.widget":10}],5:[function(require,module,exports){
var $, Node, Position;

$ = jQuery;

Position = {
  getName: function(position) {
    return Position.strings[position - 1];
  },
  nameToIndex: function(name) {
    var i, j, ref;
    for (i = j = 1, ref = Position.strings.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      if (Position.strings[i - 1] === name) {
        return i;
      }
    }
    return 0;
  }
};

Position.BEFORE = 1;

Position.AFTER = 2;

Position.INSIDE = 3;

Position.NONE = 4;

Position.strings = ['before', 'after', 'inside', 'none'];

Node = (function() {
  function Node(o, is_root, node_class) {
    if (is_root == null) {
      is_root = false;
    }
    if (node_class == null) {
      node_class = Node;
    }
    this.name = '';
    this.setData(o);
    this.children = [];
    this.parent = null;
    if (is_root) {
      this.id_mapping = {};
      this.tree = this;
      this.node_class = node_class;
    }
  }

  Node.prototype.setData = function(o) {

    /*
    Set the data of this node.
    
    setData(string): set the name of the node
    setdata(object): set attributes of the node
    
    Examples:
        setdata('node1')
    
        setData({ name: 'node1', id: 1});
    
        setData({ name: 'node2', id: 2, color: 'green'});
    
    * This is an internal function; it is not in the docs
    * Does not remove existing node values
     */
    var key, setName, value;
    setName = (function(_this) {
      return function(name) {
        if (name !== null) {
          return _this.name = name;
        }
      };
    })(this);
    if (typeof o !== 'object') {
      setName(o);
    } else {
      for (key in o) {
        value = o[key];
        if (key === 'label') {
          setName(value);
        } else if (key !== 'children') {
          this[key] = value;
        }
      }
    }
    return null;
  };

  Node.prototype.initFromData = function(data) {
    var addChildren, addNode;
    addNode = (function(_this) {
      return function(node_data) {
        _this.setData(node_data);
        if (node_data.children) {
          return addChildren(node_data.children);
        }
      };
    })(this);
    addChildren = (function(_this) {
      return function(children_data) {
        var child, j, len, node;
        for (j = 0, len = children_data.length; j < len; j++) {
          child = children_data[j];
          node = new _this.tree.node_class('');
          node.initFromData(child);
          _this.addChild(node);
        }
        return null;
      };
    })(this);
    addNode(data);
    return null;
  };


  /*
  Create tree from data.
  
  Structure of data is:
  [
      {
          label: 'node1',
          children: [
              { label: 'child1' },
              { label: 'child2' }
          ]
      },
      {
          label: 'node2'
      }
  ]
   */

  Node.prototype.loadFromData = function(data) {
    var j, len, node, o;
    this.removeChildren();
    for (j = 0, len = data.length; j < len; j++) {
      o = data[j];
      node = new this.tree.node_class(o);
      this.addChild(node);
      if (typeof o === 'object' && o.children) {
        node.loadFromData(o.children);
      }
    }
    return null;
  };


  /*
  Add child.
  
  tree.addChild(
      new Node('child1')
  );
   */

  Node.prototype.addChild = function(node) {
    this.children.push(node);
    return node._setParent(this);
  };


  /*
  Add child at position. Index starts at 0.
  
  tree.addChildAtPosition(
      new Node('abc'),
      1
  );
   */

  Node.prototype.addChildAtPosition = function(node, index) {
    this.children.splice(index, 0, node);
    return node._setParent(this);
  };

  Node.prototype._setParent = function(parent) {
    this.parent = parent;
    this.tree = parent.tree;
    return this.tree.addNodeToIndex(this);
  };


  /*
  Remove child. This also removes the children of the node.
  
  tree.removeChild(tree.children[0]);
   */

  Node.prototype.removeChild = function(node) {
    node.removeChildren();
    return this._removeChild(node);
  };

  Node.prototype._removeChild = function(node) {
    this.children.splice(this.getChildIndex(node), 1);
    return this.tree.removeNodeFromIndex(node);
  };


  /*
  Get child index.
  
  var index = getChildIndex(node);
   */

  Node.prototype.getChildIndex = function(node) {
    return $.inArray(node, this.children);
  };


  /*
  Does the tree have children?
  
  if (tree.hasChildren()) {
      //
  }
   */

  Node.prototype.hasChildren = function() {
    return this.children.length !== 0;
  };

  Node.prototype.isFolder = function() {
    return this.hasChildren() || this.load_on_demand;
  };


  /*
  Iterate over all the nodes in the tree.
  
  Calls callback with (node, level).
  
  The callback must return true to continue the iteration on current node.
  
  tree.iterate(
      function(node, level) {
         console.log(node.name);
  
         // stop iteration after level 2
         return (level <= 2);
      }
  );
   */

  Node.prototype.iterate = function(callback) {
    var _iterate;
    _iterate = function(node, level) {
      var child, j, len, ref, result;
      if (node.children) {
        ref = node.children;
        for (j = 0, len = ref.length; j < len; j++) {
          child = ref[j];
          result = callback(child, level);
          if (result && child.hasChildren()) {
            _iterate(child, level + 1);
          }
        }
        return null;
      }
    };
    _iterate(this, 0);
    return null;
  };


  /*
  Move node relative to another node.
  
  Argument position: Position.BEFORE, Position.AFTER or Position.Inside
  
  // move node1 after node2
  tree.moveNode(node1, node2, Position.AFTER);
   */

  Node.prototype.moveNode = function(moved_node, target_node, position) {
    if (moved_node.isParentOf(target_node)) {
      return;
    }
    moved_node.parent._removeChild(moved_node);
    if (position === Position.AFTER) {
      return target_node.parent.addChildAtPosition(moved_node, target_node.parent.getChildIndex(target_node) + 1);
    } else if (position === Position.BEFORE) {
      return target_node.parent.addChildAtPosition(moved_node, target_node.parent.getChildIndex(target_node));
    } else if (position === Position.INSIDE) {
      return target_node.addChildAtPosition(moved_node, 0);
    }
  };


  /*
  Get the tree as data.
   */

  Node.prototype.getData = function(include_parent) {
    var getDataFromNodes;
    if (include_parent == null) {
      include_parent = false;
    }
    getDataFromNodes = function(nodes) {
      var data, j, k, len, node, tmp_node, v;
      data = [];
      for (j = 0, len = nodes.length; j < len; j++) {
        node = nodes[j];
        tmp_node = {};
        for (k in node) {
          v = node[k];
          if ((k !== 'parent' && k !== 'children' && k !== 'element' && k !== 'tree') && Object.prototype.hasOwnProperty.call(node, k)) {
            tmp_node[k] = v;
          }
        }
        if (node.hasChildren()) {
          tmp_node.children = getDataFromNodes(node.children);
        }
        data.push(tmp_node);
      }
      return data;
    };
    if (include_parent) {
      return getDataFromNodes([this]);
    } else {
      return getDataFromNodes(this.children);
    }
  };

  Node.prototype.getNodeByName = function(name) {
    return this.getNodeByCallback(function(node) {
      return node.name === name;
    });
  };

  Node.prototype.getNodeByCallback = function(callback) {
    var result;
    result = null;
    this.iterate(function(node) {
      if (callback(node)) {
        result = node;
        return false;
      } else {
        return true;
      }
    });
    return result;
  };

  Node.prototype.addAfter = function(node_info) {
    var child_index, node;
    if (!this.parent) {
      return null;
    } else {
      node = new this.tree.node_class(node_info);
      child_index = this.parent.getChildIndex(this);
      this.parent.addChildAtPosition(node, child_index + 1);
      if (typeof node_info === 'object' && node_info.children && node_info.children.length) {
        node.loadFromData(node_info.children);
      }
      return node;
    }
  };

  Node.prototype.addBefore = function(node_info) {
    var child_index, node;
    if (!this.parent) {
      return null;
    } else {
      node = new this.tree.node_class(node_info);
      child_index = this.parent.getChildIndex(this);
      this.parent.addChildAtPosition(node, child_index);
      if (typeof node_info === 'object' && node_info.children && node_info.children.length) {
        node.loadFromData(node_info.children);
      }
      return node;
    }
  };

  Node.prototype.addParent = function(node_info) {
    var child, j, len, new_parent, original_parent, ref;
    if (!this.parent) {
      return null;
    } else {
      new_parent = new this.tree.node_class(node_info);
      new_parent._setParent(this.tree);
      original_parent = this.parent;
      ref = original_parent.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        new_parent.addChild(child);
      }
      original_parent.children = [];
      original_parent.addChild(new_parent);
      return new_parent;
    }
  };

  Node.prototype.remove = function() {
    if (this.parent) {
      this.parent.removeChild(this);
      return this.parent = null;
    }
  };

  Node.prototype.append = function(node_info) {
    var node;
    node = new this.tree.node_class(node_info);
    this.addChild(node);
    if (typeof node_info === 'object' && node_info.children && node_info.children.length) {
      node.loadFromData(node_info.children);
    }
    return node;
  };

  Node.prototype.prepend = function(node_info) {
    var node;
    node = new this.tree.node_class(node_info);
    this.addChildAtPosition(node, 0);
    if (typeof node_info === 'object' && node_info.children && node_info.children.length) {
      node.loadFromData(node_info.children);
    }
    return node;
  };

  Node.prototype.isParentOf = function(node) {
    var parent;
    parent = node.parent;
    while (parent) {
      if (parent === this) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  };

  Node.prototype.getLevel = function() {
    var level, node;
    level = 0;
    node = this;
    while (node.parent) {
      level += 1;
      node = node.parent;
    }
    return level;
  };

  Node.prototype.getNodeById = function(node_id) {
    return this.id_mapping[node_id];
  };

  Node.prototype.addNodeToIndex = function(node) {
    if (node.id != null) {
      return this.id_mapping[node.id] = node;
    }
  };

  Node.prototype.removeNodeFromIndex = function(node) {
    if (node.id != null) {
      return delete this.id_mapping[node.id];
    }
  };

  Node.prototype.removeChildren = function() {
    this.iterate((function(_this) {
      return function(child) {
        _this.tree.removeNodeFromIndex(child);
        return true;
      };
    })(this));
    return this.children = [];
  };

  Node.prototype.getPreviousSibling = function() {
    var previous_index;
    if (!this.parent) {
      return null;
    } else {
      previous_index = this.parent.getChildIndex(this) - 1;
      if (previous_index >= 0) {
        return this.parent.children[previous_index];
      } else {
        return null;
      }
    }
  };

  Node.prototype.getNextSibling = function() {
    var next_index;
    if (!this.parent) {
      return null;
    } else {
      next_index = this.parent.getChildIndex(this) + 1;
      if (next_index < this.parent.children.length) {
        return this.parent.children[next_index];
      } else {
        return null;
      }
    }
  };

  Node.prototype.getNodesByProperty = function(key, value) {
    return this.filter(function(node) {
      return node[key] === value;
    });
  };

  Node.prototype.filter = function(f) {
    var result;
    result = [];
    this.iterate(function(node) {
      if (f(node)) {
        result.push(node);
      }
      return true;
    });
    return result;
  };

  Node.prototype.getNextNode = function(include_children) {
    var next_sibling;
    if (include_children == null) {
      include_children = true;
    }
    if (include_children && this.hasChildren() && this.is_open) {
      return this.children[0];
    } else {
      if (!this.parent) {
        return null;
      } else {
        next_sibling = this.getNextSibling();
        if (next_sibling) {
          return next_sibling;
        } else {
          return this.parent.getNextNode(false);
        }
      }
    }
  };

  Node.prototype.getPreviousNode = function() {
    var previous_sibling;
    if (!this.parent) {
      return null;
    } else {
      previous_sibling = this.getPreviousSibling();
      if (previous_sibling) {
        if (!previous_sibling.hasChildren() || !previous_sibling.is_open) {
          return previous_sibling;
        } else {
          return previous_sibling.getLastChild();
        }
      } else {
        return this.getParent();
      }
    }
  };

  Node.prototype.getParent = function() {
    if (!this.parent) {
      return null;
    } else if (!this.parent.parent) {
      return null;
    } else {
      return this.parent;
    }
  };

  Node.prototype.getLastChild = function() {
    var last_child;
    if (!this.hasChildren()) {
      return null;
    } else {
      last_child = this.children[this.children.length - 1];
      if (!last_child.hasChildren() || !last_child.is_open) {
        return last_child;
      } else {
        return last_child.getLastChild();
      }
    }
  };

  return Node;

})();

module.exports = {
  Node: Node,
  Position: Position
};

},{}],6:[function(require,module,exports){
var $, BorderDropHint, FolderElement, GhostDropHint, NodeElement, Position, node,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

node = require('./node');

Position = node.Position;

$ = jQuery;

NodeElement = (function() {
  function NodeElement(node, tree_widget) {
    this.init(node, tree_widget);
  }

  NodeElement.prototype.init = function(node, tree_widget) {
    this.node = node;
    this.tree_widget = tree_widget;
    if (!node.element) {
      node.element = this.tree_widget.element;
    }
    return this.$element = $(node.element);
  };

  NodeElement.prototype.getUl = function() {
    return this.$element.children('ul:first');
  };

  NodeElement.prototype.getSpan = function() {
    return this.$element.children('.jqtree-element').find('span.jqtree-title');
  };

  NodeElement.prototype.getLi = function() {
    return this.$element;
  };

  NodeElement.prototype.addDropHint = function(position) {
    if (position === Position.INSIDE) {
      return new BorderDropHint(this.$element);
    } else {
      return new GhostDropHint(this.node, this.$element, position);
    }
  };

  NodeElement.prototype.select = function() {
    var $li, $span;
    $li = this.getLi();
    $li.addClass('jqtree-selected');
    $li.attr('aria-selected', 'true');
    $span = this.getSpan();
    return $span.attr('tabindex', 0);
  };

  NodeElement.prototype.deselect = function() {
    var $li, $span;
    $li = this.getLi();
    $li.removeClass('jqtree-selected');
    $li.attr('aria-selected', 'false');
    $span = this.getSpan();
    return $span.attr('tabindex', -1);
  };

  return NodeElement;

})();

FolderElement = (function(superClass) {
  extend(FolderElement, superClass);

  function FolderElement() {
    return FolderElement.__super__.constructor.apply(this, arguments);
  }

  FolderElement.prototype.open = function(on_finished, slide) {
    var $button, doOpen;
    if (slide == null) {
      slide = true;
    }
    if (!this.node.is_open) {
      this.node.is_open = true;
      $button = this.getButton();
      $button.removeClass('jqtree-closed');
      $button.html('');
      $button.append(this.tree_widget.renderer.opened_icon_element.cloneNode(false));
      doOpen = (function(_this) {
        return function() {
          var $li, $span;
          $li = _this.getLi();
          $li.removeClass('jqtree-closed');
          $span = _this.getSpan();
          $span.attr('aria-expanded', 'true');
          if (on_finished) {
            on_finished();
          }
          return _this.tree_widget._triggerEvent('tree.open', {
            node: _this.node
          });
        };
      })(this);
      if (slide) {
        return this.getUl().slideDown('fast', doOpen);
      } else {
        this.getUl().show();
        return doOpen();
      }
    }
  };

  FolderElement.prototype.close = function(slide) {
    var $button, doClose;
    if (slide == null) {
      slide = true;
    }
    if (this.node.is_open) {
      this.node.is_open = false;
      $button = this.getButton();
      $button.addClass('jqtree-closed');
      $button.html('');
      $button.append(this.tree_widget.renderer.closed_icon_element.cloneNode(false));
      doClose = (function(_this) {
        return function() {
          var $li, $span;
          $li = _this.getLi();
          $li.addClass('jqtree-closed');
          $span = _this.getSpan();
          $span.attr('aria-expanded', 'false');
          return _this.tree_widget._triggerEvent('tree.close', {
            node: _this.node
          });
        };
      })(this);
      if (slide) {
        return this.getUl().slideUp('fast', doClose);
      } else {
        this.getUl().hide();
        return doClose();
      }
    }
  };

  FolderElement.prototype.getButton = function() {
    return this.$element.children('.jqtree-element').find('a.jqtree-toggler');
  };

  FolderElement.prototype.addDropHint = function(position) {
    if (!this.node.is_open && position === Position.INSIDE) {
      return new BorderDropHint(this.$element);
    } else {
      return new GhostDropHint(this.node, this.$element, position);
    }
  };

  return FolderElement;

})(NodeElement);

BorderDropHint = (function() {
  function BorderDropHint($element) {
    var $div, width;
    $div = $element.children('.jqtree-element');
    width = $element.width() - 4;
    this.$hint = $('<span class="jqtree-border"></span>');
    $div.append(this.$hint);
    this.$hint.css({
      width: width,
      height: $div.outerHeight() - 4
    });
  }

  BorderDropHint.prototype.remove = function() {
    return this.$hint.remove();
  };

  return BorderDropHint;

})();

GhostDropHint = (function() {
  function GhostDropHint(node, $element, position) {
    this.$element = $element;
    this.node = node;
    this.$ghost = $('<li class="jqtree_common jqtree-ghost"><span class="jqtree_common jqtree-circle"></span><span class="jqtree_common jqtree-line"></span></li>');
    if (position === Position.AFTER) {
      this.moveAfter();
    } else if (position === Position.BEFORE) {
      this.moveBefore();
    } else if (position === Position.INSIDE) {
      if (node.isFolder() && node.is_open) {
        this.moveInsideOpenFolder();
      } else {
        this.moveInside();
      }
    }
  }

  GhostDropHint.prototype.remove = function() {
    return this.$ghost.remove();
  };

  GhostDropHint.prototype.moveAfter = function() {
    return this.$element.after(this.$ghost);
  };

  GhostDropHint.prototype.moveBefore = function() {
    return this.$element.before(this.$ghost);
  };

  GhostDropHint.prototype.moveInsideOpenFolder = function() {
    return $(this.node.children[0].element).before(this.$ghost);
  };

  GhostDropHint.prototype.moveInside = function() {
    this.$element.after(this.$ghost);
    return this.$ghost.addClass('jqtree-inside');
  };

  return GhostDropHint;

})();

module.exports = {
  BorderDropHint: BorderDropHint,
  FolderElement: FolderElement,
  GhostDropHint: GhostDropHint,
  NodeElement: NodeElement
};

},{"./node":5}],7:[function(require,module,exports){
var $, SaveStateHandler, indexOf, isInt, util;

util = require('./util');

indexOf = util.indexOf;

isInt = util.isInt;

$ = jQuery;

SaveStateHandler = (function() {
  function SaveStateHandler(tree_widget) {
    this.tree_widget = tree_widget;
  }

  SaveStateHandler.prototype.saveState = function() {
    var state;
    state = JSON.stringify(this.getState());
    if (this.tree_widget.options.onSetStateFromStorage) {
      return this.tree_widget.options.onSetStateFromStorage(state);
    } else if (this.supportsLocalStorage()) {
      return localStorage.setItem(this.getCookieName(), state);
    } else if ($.cookie) {
      $.cookie.raw = true;
      return $.cookie(this.getCookieName(), state, {
        path: '/'
      });
    }
  };

  SaveStateHandler.prototype.getStateFromStorage = function() {
    var json_data;
    json_data = this._loadFromStorage();
    if (json_data) {
      return this._parseState(json_data);
    } else {
      return null;
    }
  };

  SaveStateHandler.prototype._parseState = function(json_data) {
    var state;
    state = $.parseJSON(json_data);
    if (state && state.selected_node && isInt(state.selected_node)) {
      state.selected_node = [state.selected_node];
    }
    return state;
  };

  SaveStateHandler.prototype._loadFromStorage = function() {
    if (this.tree_widget.options.onGetStateFromStorage) {
      return this.tree_widget.options.onGetStateFromStorage();
    } else if (this.supportsLocalStorage()) {
      return localStorage.getItem(this.getCookieName());
    } else if ($.cookie) {
      $.cookie.raw = true;
      return $.cookie(this.getCookieName());
    } else {
      return null;
    }
  };

  SaveStateHandler.prototype.getState = function() {
    var getOpenNodeIds, getSelectedNodeIds;
    getOpenNodeIds = (function(_this) {
      return function() {
        var open_nodes;
        open_nodes = [];
        _this.tree_widget.tree.iterate(function(node) {
          if (node.is_open && node.id && node.hasChildren()) {
            open_nodes.push(node.id);
          }
          return true;
        });
        return open_nodes;
      };
    })(this);
    getSelectedNodeIds = (function(_this) {
      return function() {
        var n;
        return (function() {
          var i, len, ref, results;
          ref = this.tree_widget.getSelectedNodes();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            n = ref[i];
            results.push(n.id);
          }
          return results;
        }).call(_this);
      };
    })(this);
    return {
      open_nodes: getOpenNodeIds(),
      selected_node: getSelectedNodeIds()
    };
  };

  SaveStateHandler.prototype.setInitialState = function(state) {
    var must_load_on_demand;
    if (!state) {
      return false;
    } else {
      must_load_on_demand = this._openInitialNodes(state.open_nodes);
      this._selectInitialNodes(state.selected_node);
      return must_load_on_demand;
    }
  };

  SaveStateHandler.prototype._openInitialNodes = function(node_ids) {
    var i, len, must_load_on_demand, node, node_id;
    must_load_on_demand = false;
    for (i = 0, len = node_ids.length; i < len; i++) {
      node_id = node_ids[i];
      node = this.tree_widget.getNodeById(node_id);
      if (node) {
        if (!node.load_on_demand) {
          node.is_open = true;
        } else {
          must_load_on_demand = true;
        }
      }
    }
    return must_load_on_demand;
  };

  SaveStateHandler.prototype._selectInitialNodes = function(node_ids) {
    var i, len, node, node_id, select_count;
    select_count = 0;
    for (i = 0, len = node_ids.length; i < len; i++) {
      node_id = node_ids[i];
      node = this.tree_widget.getNodeById(node_id);
      if (node) {
        select_count += 1;
        this.tree_widget.select_node_handler.addToSelection(node);
      }
    }
    return select_count !== 0;
  };

  SaveStateHandler.prototype.setInitialStateOnDemand = function(state, cb_finished) {
    if (state) {
      return this._setInitialStateOnDemand(state.open_nodes, state.selected_node, cb_finished);
    } else {
      return cb_finished();
    }
  };

  SaveStateHandler.prototype._setInitialStateOnDemand = function(node_ids, selected_nodes, cb_finished) {
    var loadAndOpenNode, loading_count, openNodes;
    loading_count = 0;
    openNodes = (function(_this) {
      return function() {
        var i, len, new_nodes_ids, node, node_id;
        new_nodes_ids = [];
        for (i = 0, len = node_ids.length; i < len; i++) {
          node_id = node_ids[i];
          node = _this.tree_widget.getNodeById(node_id);
          if (!node) {
            new_nodes_ids.push(node_id);
          } else {
            if (!node.is_loading) {
              if (node.load_on_demand) {
                loadAndOpenNode(node);
              } else {
                _this.tree_widget._openNode(node, false);
              }
            }
          }
        }
        node_ids = new_nodes_ids;
        if (_this._selectInitialNodes(selected_nodes)) {
          _this.tree_widget._refreshElements();
        }
        if (loading_count === 0) {
          return cb_finished();
        }
      };
    })(this);
    loadAndOpenNode = (function(_this) {
      return function(node) {
        loading_count += 1;
        return _this.tree_widget._openNode(node, false, function() {
          loading_count -= 1;
          return openNodes();
        });
      };
    })(this);
    return openNodes();
  };

  SaveStateHandler.prototype.getCookieName = function() {
    if (typeof this.tree_widget.options.saveState === 'string') {
      return this.tree_widget.options.saveState;
    } else {
      return 'tree';
    }
  };

  SaveStateHandler.prototype.supportsLocalStorage = function() {
    var testSupport;
    testSupport = function() {
      var error, error1, key;
      if (typeof localStorage === "undefined" || localStorage === null) {
        return false;
      } else {
        try {
          key = '_storage_test';
          sessionStorage.setItem(key, true);
          sessionStorage.removeItem(key);
        } catch (error1) {
          error = error1;
          return false;
        }
        return true;
      }
    };
    if (this._supportsLocalStorage == null) {
      this._supportsLocalStorage = testSupport();
    }
    return this._supportsLocalStorage;
  };

  SaveStateHandler.prototype.getNodeIdToBeSelected = function() {
    var state;
    state = this.getStateFromStorage();
    if (state && state.selected_node) {
      return state.selected_node[0];
    } else {
      return null;
    }
  };

  return SaveStateHandler;

})();

module.exports = SaveStateHandler;

},{"./util":12}],8:[function(require,module,exports){
var $, ScrollHandler;

$ = jQuery;

ScrollHandler = (function() {
  function ScrollHandler(tree_widget) {
    this.tree_widget = tree_widget;
    this.previous_top = -1;
    this.is_initialized = false;
    this._initScrollParent();
  }

  ScrollHandler.prototype._initScrollParent = function() {
    var $scroll_parent, getParentWithOverflow, setDocumentAsScrollParent;
    getParentWithOverflow = (function(_this) {
      return function() {
        var css_values, el, hasOverFlow, i, len, ref;
        css_values = ['overflow', 'overflow-y'];
        hasOverFlow = function(el) {
          var css_value, i, len, ref;
          for (i = 0, len = css_values.length; i < len; i++) {
            css_value = css_values[i];
            if ((ref = $.css(el, css_value)) === 'auto' || ref === 'scroll') {
              return true;
            }
          }
          return false;
        };
        if (hasOverFlow(_this.tree_widget.$el[0])) {
          return _this.tree_widget.$el;
        }
        ref = _this.tree_widget.$el.parents();
        for (i = 0, len = ref.length; i < len; i++) {
          el = ref[i];
          if (hasOverFlow(el)) {
            return $(el);
          }
        }
        return null;
      };
    })(this);
    setDocumentAsScrollParent = (function(_this) {
      return function() {
        _this.scroll_parent_top = 0;
        return _this.$scroll_parent = null;
      };
    })(this);
    if (this.tree_widget.$el.css('position') === 'fixed') {
      setDocumentAsScrollParent();
    }
    $scroll_parent = getParentWithOverflow();
    if ($scroll_parent && $scroll_parent.length && $scroll_parent[0].tagName !== 'HTML') {
      this.$scroll_parent = $scroll_parent;
      this.scroll_parent_top = this.$scroll_parent.offset().top;
    } else {
      setDocumentAsScrollParent();
    }
    return this.is_initialized = true;
  };

  ScrollHandler.prototype._ensureInit = function() {
    if (!this.is_initialized) {
      return this._initScrollParent();
    }
  };

  ScrollHandler.prototype.checkScrolling = function() {
    var hovered_area;
    this._ensureInit();
    hovered_area = this.tree_widget.dnd_handler.hovered_area;
    if (hovered_area && hovered_area.top !== this.previous_top) {
      this.previous_top = hovered_area.top;
      if (this.$scroll_parent) {
        return this._handleScrollingWithScrollParent(hovered_area);
      } else {
        return this._handleScrollingWithDocument(hovered_area);
      }
    }
  };

  ScrollHandler.prototype._handleScrollingWithScrollParent = function(area) {
    var distance_bottom;
    distance_bottom = this.scroll_parent_top + this.$scroll_parent[0].offsetHeight - area.bottom;
    if (distance_bottom < 20) {
      this.$scroll_parent[0].scrollTop += 20;
      this.tree_widget.refreshHitAreas();
      return this.previous_top = -1;
    } else if ((area.top - this.scroll_parent_top) < 20) {
      this.$scroll_parent[0].scrollTop -= 20;
      this.tree_widget.refreshHitAreas();
      return this.previous_top = -1;
    }
  };

  ScrollHandler.prototype._handleScrollingWithDocument = function(area) {
    var distance_top;
    distance_top = area.top - $(document).scrollTop();
    if (distance_top < 20) {
      return $(document).scrollTop($(document).scrollTop() - 20);
    } else if ($(window).height() - (area.bottom - $(document).scrollTop()) < 20) {
      return $(document).scrollTop($(document).scrollTop() + 20);
    }
  };

  ScrollHandler.prototype.scrollTo = function(top) {
    var tree_top;
    this._ensureInit();
    if (this.$scroll_parent) {
      return this.$scroll_parent[0].scrollTop = top;
    } else {
      tree_top = this.tree_widget.$el.offset().top;
      return $(document).scrollTop(top + tree_top);
    }
  };

  ScrollHandler.prototype.isScrolledIntoView = function(element) {
    var $element, element_bottom, element_top, view_bottom, view_top;
    this._ensureInit();
    $element = $(element);
    if (this.$scroll_parent) {
      view_top = 0;
      view_bottom = this.$scroll_parent.height();
      element_top = $element.offset().top - this.scroll_parent_top;
      element_bottom = element_top + $element.height();
    } else {
      view_top = $(window).scrollTop();
      view_bottom = view_top + $(window).height();
      element_top = $element.offset().top;
      element_bottom = element_top + $element.height();
    }
    return (element_bottom <= view_bottom) && (element_top >= view_top);
  };

  return ScrollHandler;

})();

module.exports = ScrollHandler;

},{}],9:[function(require,module,exports){
var $, SelectNodeHandler;

$ = jQuery;

SelectNodeHandler = (function() {
  function SelectNodeHandler(tree_widget) {
    this.tree_widget = tree_widget;
    this.clear();
  }

  SelectNodeHandler.prototype.getSelectedNode = function() {
    var selected_nodes;
    selected_nodes = this.getSelectedNodes();
    if (selected_nodes.length) {
      return selected_nodes[0];
    } else {
      return false;
    }
  };

  SelectNodeHandler.prototype.getSelectedNodes = function() {
    var id, node, selected_nodes;
    if (this.selected_single_node) {
      return [this.selected_single_node];
    } else {
      selected_nodes = [];
      for (id in this.selected_nodes) {
        node = this.tree_widget.getNodeById(id);
        if (node) {
          selected_nodes.push(node);
        }
      }
      return selected_nodes;
    }
  };

  SelectNodeHandler.prototype.getSelectedNodesUnder = function(parent) {
    var id, node, selected_nodes;
    if (this.selected_single_node) {
      if (parent.isParentOf(this.selected_single_node)) {
        return [this.selected_single_node];
      } else {
        return [];
      }
    } else {
      selected_nodes = [];
      for (id in this.selected_nodes) {
        node = this.tree_widget.getNodeById(id);
        if (node && parent.isParentOf(node)) {
          selected_nodes.push(node);
        }
      }
      return selected_nodes;
    }
  };

  SelectNodeHandler.prototype.isNodeSelected = function(node) {
    if (node.id) {
      return this.selected_nodes[node.id];
    } else if (this.selected_single_node) {
      return this.selected_single_node.element === node.element;
    } else {
      return false;
    }
  };

  SelectNodeHandler.prototype.clear = function() {
    this.selected_nodes = {};
    return this.selected_single_node = null;
  };

  SelectNodeHandler.prototype.removeFromSelection = function(node, include_children) {
    if (include_children == null) {
      include_children = false;
    }
    if (!node.id) {
      if (this.selected_single_node && node.element === this.selected_single_node.element) {
        return this.selected_single_node = null;
      }
    } else {
      delete this.selected_nodes[node.id];
      if (include_children) {
        return node.iterate((function(_this) {
          return function(n) {
            delete _this.selected_nodes[node.id];
            return true;
          };
        })(this));
      }
    }
  };

  SelectNodeHandler.prototype.addToSelection = function(node) {
    if (node.id) {
      return this.selected_nodes[node.id] = true;
    } else {
      return this.selected_single_node = node;
    }
  };

  return SelectNodeHandler;

})();

module.exports = SelectNodeHandler;

},{}],10:[function(require,module,exports){

/*
Copyright 2013 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
var $, SimpleWidget,
  slice = [].slice;

$ = jQuery;

SimpleWidget = (function() {
  SimpleWidget.prototype.defaults = {};

  function SimpleWidget(el, options) {
    this.$el = $(el);
    this.options = $.extend({}, this.defaults, options);
  }

  SimpleWidget.prototype.destroy = function() {
    return this._deinit();
  };

  SimpleWidget.prototype._init = function() {
    return null;
  };

  SimpleWidget.prototype._deinit = function() {
    return null;
  };

  SimpleWidget.register = function(widget_class, widget_name) {
    var callFunction, createWidget, destroyWidget, getDataKey, getWidgetData;
    getDataKey = function() {
      return "simple_widget_" + widget_name;
    };
    getWidgetData = function(el, data_key) {
      var widget;
      widget = $.data(el, data_key);
      if (widget && (widget instanceof SimpleWidget)) {
        return widget;
      } else {
        return null;
      }
    };
    createWidget = function($el, options) {
      var data_key, el, existing_widget, i, len, widget;
      data_key = getDataKey();
      for (i = 0, len = $el.length; i < len; i++) {
        el = $el[i];
        existing_widget = getWidgetData(el, data_key);
        if (!existing_widget) {
          widget = new widget_class(el, options);
          if (!$.data(el, data_key)) {
            $.data(el, data_key, widget);
          }
          widget._init();
        }
      }
      return $el;
    };
    destroyWidget = function($el) {
      var data_key, el, i, len, results, widget;
      data_key = getDataKey();
      results = [];
      for (i = 0, len = $el.length; i < len; i++) {
        el = $el[i];
        widget = getWidgetData(el, data_key);
        if (widget) {
          widget.destroy();
        }
        results.push($.removeData(el, data_key));
      }
      return results;
    };
    callFunction = function($el, function_name, args) {
      var el, i, len, result, widget, widget_function;
      result = null;
      for (i = 0, len = $el.length; i < len; i++) {
        el = $el[i];
        widget = $.data(el, getDataKey());
        if (widget && (widget instanceof SimpleWidget)) {
          widget_function = widget[function_name];
          if (widget_function && (typeof widget_function === 'function')) {
            result = widget_function.apply(widget, args);
          }
        }
      }
      return result;
    };
    return $.fn[widget_name] = function() {
      var $el, args, argument1, function_name, options;
      argument1 = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      $el = this;
      if (argument1 === void 0 || typeof argument1 === 'object') {
        options = argument1;
        return createWidget($el, options);
      } else if (typeof argument1 === 'string' && argument1[0] !== '_') {
        function_name = argument1;
        if (function_name === 'destroy') {
          return destroyWidget($el);
        } else if (function_name === 'get_widget_class') {
          return widget_class;
        } else {
          return callFunction($el, function_name, args);
        }
      }
    };
  };

  return SimpleWidget;

})();

module.exports = SimpleWidget;

},{}],11:[function(require,module,exports){
var $, BorderDropHint, DragAndDropHandler, DragElement, ElementsRenderer, FolderElement, GhostDropHint, HitAreasGenerator, JqTreeWidget, KeyHandler, MouseWidget, Node, NodeElement, Position, SaveStateHandler, ScrollHandler, SelectNodeHandler, SimpleWidget, __version__, drag_and_drop_handler, node_module, ref, util_module,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

__version__ = require('./version');

drag_and_drop_handler = require('./drag_and_drop_handler');

ElementsRenderer = require('./elements_renderer');

KeyHandler = require('./key_handler');

MouseWidget = require('./mouse.widget');

SaveStateHandler = require('./save_state_handler');

ScrollHandler = require('./scroll_handler');

SelectNodeHandler = require('./select_node_handler');

SimpleWidget = require('./simple.widget');

node_module = require('./node');

Node = node_module.Node;

Position = node_module.Position;

util_module = require('./util');

ref = require('./node_element'), BorderDropHint = ref.BorderDropHint, FolderElement = ref.FolderElement, GhostDropHint = ref.GhostDropHint, NodeElement = ref.NodeElement;

DragAndDropHandler = drag_and_drop_handler.DragAndDropHandler, DragElement = drag_and_drop_handler.DragElement, HitAreasGenerator = drag_and_drop_handler.HitAreasGenerator;

$ = jQuery;

JqTreeWidget = (function(superClass) {
  extend(JqTreeWidget, superClass);

  function JqTreeWidget() {
    return JqTreeWidget.__super__.constructor.apply(this, arguments);
  }

  JqTreeWidget.prototype.BorderDropHint = BorderDropHint;

  JqTreeWidget.prototype.DragElement = DragElement;

  JqTreeWidget.prototype.DragAndDropHandler = DragAndDropHandler;

  JqTreeWidget.prototype.ElementsRenderer = ElementsRenderer;

  JqTreeWidget.prototype.GhostDropHint = GhostDropHint;

  JqTreeWidget.prototype.HitAreasGenerator = HitAreasGenerator;

  JqTreeWidget.prototype.Node = Node;

  JqTreeWidget.prototype.SaveStateHandler = SaveStateHandler;

  JqTreeWidget.prototype.ScrollHandler = ScrollHandler;

  JqTreeWidget.prototype.SelectNodeHandler = SelectNodeHandler;

  JqTreeWidget.prototype.defaults = {
    autoOpen: false,
    saveState: false,
    dragAndDrop: false,
    selectable: true,
    useContextMenu: true,
    onCanSelectNode: null,
    onSetStateFromStorage: null,
    onGetStateFromStorage: null,
    onCreateLi: null,
    onIsMoveHandle: null,
    onCanMove: null,
    onCanMoveTo: null,
    onLoadFailed: null,
    autoEscape: true,
    dataUrl: null,
    closedIcon: null,
    openedIcon: '&#x25bc;',
    slide: true,
    nodeClass: Node,
    dataFilter: null,
    keyboardSupport: true,
    openFolderDelay: 500,
    rtl: null,
    onDragMove: null,
    onDragStop: null,
    buttonLeft: true,
    onLoading: null
  };

  JqTreeWidget.prototype.toggle = function(node, slide) {
    if (slide == null) {
      slide = null;
    }
    if (slide === null) {
      slide = this.options.slide;
    }
    if (node.is_open) {
      this.closeNode(node, slide);
    } else {
      this.openNode(node, slide);
    }
    return this.element;
  };

  JqTreeWidget.prototype.getTree = function() {
    return this.tree;
  };

  JqTreeWidget.prototype.selectNode = function(node) {
    this._selectNode(node, false);
    return this.element;
  };

  JqTreeWidget.prototype._selectNode = function(node, must_toggle) {
    var canSelect, deselected_node, openParents, saveState;
    if (must_toggle == null) {
      must_toggle = false;
    }
    if (!this.select_node_handler) {
      return;
    }
    canSelect = (function(_this) {
      return function() {
        if (_this.options.onCanSelectNode) {
          return _this.options.selectable && _this.options.onCanSelectNode(node);
        } else {
          return _this.options.selectable;
        }
      };
    })(this);
    openParents = (function(_this) {
      return function() {
        var parent;
        parent = node.parent;
        if (parent && parent.parent && !parent.is_open) {
          return _this.openNode(parent, false);
        }
      };
    })(this);
    saveState = (function(_this) {
      return function() {
        if (_this.options.saveState) {
          return _this.save_state_handler.saveState();
        }
      };
    })(this);
    if (!node) {
      this._deselectCurrentNode();
      saveState();
      return;
    }
    if (!canSelect()) {
      return;
    }
    if (this.select_node_handler.isNodeSelected(node)) {
      if (must_toggle) {
        this._deselectCurrentNode();
        this._triggerEvent('tree.select', {
          node: null,
          previous_node: node
        });
      }
    } else {
      deselected_node = this.getSelectedNode();
      this._deselectCurrentNode();
      this.addToSelection(node);
      this._triggerEvent('tree.select', {
        node: node,
        deselected_node: deselected_node
      });
      openParents();
    }
    return saveState();
  };

  JqTreeWidget.prototype.getSelectedNode = function() {
    if (this.select_node_handler) {
      return this.select_node_handler.getSelectedNode();
    } else {
      return null;
    }
  };

  JqTreeWidget.prototype.toJson = function() {
    return JSON.stringify(this.tree.getData());
  };

  JqTreeWidget.prototype.loadData = function(data, parent_node) {
    this._loadData(data, parent_node);
    return this.element;
  };


  /*
  signatures:
  - loadDataFromUrl(url, parent_node=null, on_finished=null)
      loadDataFromUrl('/my_data');
      loadDataFromUrl('/my_data', node1);
      loadDataFromUrl('/my_data', node1, function() { console.log('finished'); });
      loadDataFromUrl('/my_data', null, function() { console.log('finished'); });
  
  - loadDataFromUrl(parent_node=null, on_finished=null)
      loadDataFromUrl();
      loadDataFromUrl(node1);
      loadDataFromUrl(null, function() { console.log('finished'); });
      loadDataFromUrl(node1, function() { console.log('finished'); });
   */

  JqTreeWidget.prototype.loadDataFromUrl = function(param1, param2, param3) {
    if ($.type(param1) === 'string') {
      this._loadDataFromUrl(param1, param2, param3);
    } else {
      this._loadDataFromUrl(null, param1, param2);
    }
    return this.element;
  };

  JqTreeWidget.prototype.reload = function(on_finished) {
    this._loadDataFromUrl(null, null, on_finished);
    return this.element;
  };

  JqTreeWidget.prototype._loadDataFromUrl = function(url_info, parent_node, on_finished) {
    var $el, addLoadingClass, handeLoadData, handleError, handleSuccess, loadDataFromUrlInfo, parseUrlInfo, removeLoadingClass;
    $el = null;
    addLoadingClass = (function(_this) {
      return function() {
        if (parent_node) {
          $el = $(parent_node.element);
        } else {
          $el = _this.element;
        }
        $el.addClass('jqtree-loading');
        return _this._notifyLoading(true, parent_node, $el);
      };
    })(this);
    removeLoadingClass = (function(_this) {
      return function() {
        if ($el) {
          $el.removeClass('jqtree-loading');
          return _this._notifyLoading(false, parent_node, $el);
        }
      };
    })(this);
    parseUrlInfo = function() {
      if ($.type(url_info) === 'string') {
        return {
          url: url_info
        };
      }
      if (!url_info.method) {
        url_info.method = 'get';
      }
      return url_info;
    };
    handeLoadData = (function(_this) {
      return function(data) {
        removeLoadingClass();
        _this._loadData(data, parent_node);
        if (on_finished && $.isFunction(on_finished)) {
          return on_finished();
        }
      };
    })(this);
    handleSuccess = (function(_this) {
      return function(response) {
        var data;
        if ($.isArray(response) || typeof response === 'object') {
          data = response;
        } else if (data != null) {
          data = $.parseJSON(response);
        } else {
          data = [];
        }
        if (_this.options.dataFilter) {
          data = _this.options.dataFilter(data);
        }
        return handeLoadData(data);
      };
    })(this);
    handleError = (function(_this) {
      return function(response) {
        removeLoadingClass();
        if (_this.options.onLoadFailed) {
          return _this.options.onLoadFailed(response);
        }
      };
    })(this);
    loadDataFromUrlInfo = function() {
      url_info = parseUrlInfo();
      return $.ajax($.extend({}, url_info, {
        method: url_info.method != null ? url_info.method.toUpperCase() : 'GET',
        cache: false,
        dataType: 'json',
        success: handleSuccess,
        error: handleError
      }));
    };
    if (!url_info) {
      url_info = this._getDataUrlInfo(parent_node);
    }
    addLoadingClass();
    if (!url_info) {
      removeLoadingClass();
    } else if ($.isArray(url_info)) {
      handeLoadData(url_info);
    } else {
      loadDataFromUrlInfo();
    }
  };

  JqTreeWidget.prototype._loadData = function(data, parent_node) {
    var deselectNodes, loadSubtree;
    if (parent_node == null) {
      parent_node = null;
    }
    deselectNodes = (function(_this) {
      return function() {
        var i, len, n, selected_nodes_under_parent;
        if (_this.select_node_handler) {
          selected_nodes_under_parent = _this.select_node_handler.getSelectedNodesUnder(parent_node);
          for (i = 0, len = selected_nodes_under_parent.length; i < len; i++) {
            n = selected_nodes_under_parent[i];
            _this.select_node_handler.removeFromSelection(n);
          }
        }
        return null;
      };
    })(this);
    loadSubtree = (function(_this) {
      return function() {
        parent_node.loadFromData(data);
        parent_node.load_on_demand = false;
        parent_node.is_loading = false;
        return _this._refreshElements(parent_node);
      };
    })(this);
    if (!data) {
      return;
    }
    this._triggerEvent('tree.load_data', {
      tree_data: data
    });
    if (!parent_node) {
      this._initTree(data);
    } else {
      deselectNodes();
      loadSubtree();
    }
    if (this.isDragging()) {
      return this.dnd_handler.refresh();
    }
  };

  JqTreeWidget.prototype.getNodeById = function(node_id) {
    return this.tree.getNodeById(node_id);
  };

  JqTreeWidget.prototype.getNodeByName = function(name) {
    return this.tree.getNodeByName(name);
  };

  JqTreeWidget.prototype.getNodesByProperty = function(key, value) {
    return this.tree.getNodesByProperty(key, value);
  };

  JqTreeWidget.prototype.getNodeByHtmlElement = function(element) {
    return this._getNode($(element));
  };

  JqTreeWidget.prototype.getNodeByCallback = function(callback) {
    return this.tree.getNodeByCallback(callback);
  };

  JqTreeWidget.prototype.openNode = function(node, slide) {
    if (slide == null) {
      slide = null;
    }
    if (slide === null) {
      slide = this.options.slide;
    }
    this._openNode(node, slide);
    return this.element;
  };

  JqTreeWidget.prototype._openNode = function(node, slide, on_finished) {
    var doOpenNode, parent;
    if (slide == null) {
      slide = true;
    }
    doOpenNode = (function(_this) {
      return function(_node, _slide, _on_finished) {
        var folder_element;
        folder_element = new FolderElement(_node, _this);
        return folder_element.open(_on_finished, _slide);
      };
    })(this);
    if (node.isFolder()) {
      if (node.load_on_demand) {
        return this._loadFolderOnDemand(node, slide, on_finished);
      } else {
        parent = node.parent;
        while (parent) {
          if (parent.parent) {
            doOpenNode(parent, false, null);
          }
          parent = parent.parent;
        }
        doOpenNode(node, slide, on_finished);
        return this._saveState();
      }
    }
  };

  JqTreeWidget.prototype._loadFolderOnDemand = function(node, slide, on_finished) {
    if (slide == null) {
      slide = true;
    }
    node.is_loading = true;
    return this._loadDataFromUrl(null, node, (function(_this) {
      return function() {
        return _this._openNode(node, slide, on_finished);
      };
    })(this));
  };

  JqTreeWidget.prototype.closeNode = function(node, slide) {
    if (slide == null) {
      slide = null;
    }
    if (slide === null) {
      slide = this.options.slide;
    }
    if (node.isFolder()) {
      new FolderElement(node, this).close(slide);
      this._saveState();
    }
    return this.element;
  };

  JqTreeWidget.prototype.isDragging = function() {
    if (this.dnd_handler) {
      return this.dnd_handler.is_dragging;
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype.refreshHitAreas = function() {
    this.dnd_handler.refresh();
    return this.element;
  };

  JqTreeWidget.prototype.addNodeAfter = function(new_node_info, existing_node) {
    var new_node;
    new_node = existing_node.addAfter(new_node_info);
    this._refreshElements(existing_node.parent);
    return new_node;
  };

  JqTreeWidget.prototype.addNodeBefore = function(new_node_info, existing_node) {
    var new_node;
    new_node = existing_node.addBefore(new_node_info);
    this._refreshElements(existing_node.parent);
    return new_node;
  };

  JqTreeWidget.prototype.addParentNode = function(new_node_info, existing_node) {
    var new_node;
    new_node = existing_node.addParent(new_node_info);
    this._refreshElements(new_node.parent);
    return new_node;
  };

  JqTreeWidget.prototype.removeNode = function(node) {
    var parent;
    parent = node.parent;
    if (parent) {
      this.select_node_handler.removeFromSelection(node, true);
      node.remove();
      this._refreshElements(parent);
    }
    return this.element;
  };

  JqTreeWidget.prototype.appendNode = function(new_node_info, parent_node) {
    var node;
    parent_node = parent_node || this.tree;
    node = parent_node.append(new_node_info);
    this._refreshElements(parent_node);
    return node;
  };

  JqTreeWidget.prototype.prependNode = function(new_node_info, parent_node) {
    var node;
    if (!parent_node) {
      parent_node = this.tree;
    }
    node = parent_node.prepend(new_node_info);
    this._refreshElements(parent_node);
    return node;
  };

  JqTreeWidget.prototype.updateNode = function(node, data) {
    var id_is_changed;
    id_is_changed = data.id && data.id !== node.id;
    if (id_is_changed) {
      this.tree.removeNodeFromIndex(node);
    }
    node.setData(data);
    if (id_is_changed) {
      this.tree.addNodeToIndex(node);
    }
    if (typeof data === 'object' && data.children && data.children.length) {
      node.removeChildren();
      node.loadFromData(data.children);
    }
    this.renderer.renderFromNode(node);
    this._selectCurrentNode();
    return this.element;
  };

  JqTreeWidget.prototype.moveNode = function(node, target_node, position) {
    var position_index;
    position_index = Position.nameToIndex(position);
    this.tree.moveNode(node, target_node, position_index);
    this._refreshElements();
    return this.element;
  };

  JqTreeWidget.prototype.getStateFromStorage = function() {
    return this.save_state_handler.getStateFromStorage();
  };

  JqTreeWidget.prototype.addToSelection = function(node) {
    if (node) {
      this.select_node_handler.addToSelection(node);
      this._getNodeElementForNode(node).select();
      this._saveState();
    }
    return this.element;
  };

  JqTreeWidget.prototype.getSelectedNodes = function() {
    return this.select_node_handler.getSelectedNodes();
  };

  JqTreeWidget.prototype.isNodeSelected = function(node) {
    return this.select_node_handler.isNodeSelected(node);
  };

  JqTreeWidget.prototype.removeFromSelection = function(node) {
    this.select_node_handler.removeFromSelection(node);
    this._getNodeElementForNode(node).deselect();
    this._saveState();
    return this.element;
  };

  JqTreeWidget.prototype.scrollToNode = function(node) {
    var $element, top;
    $element = $(node.element);
    top = $element.offset().top - this.$el.offset().top;
    this.scroll_handler.scrollTo(top);
    return this.element;
  };

  JqTreeWidget.prototype.getState = function() {
    return this.save_state_handler.getState();
  };

  JqTreeWidget.prototype.setState = function(state) {
    this.save_state_handler.setInitialState(state);
    this._refreshElements();
    return this.element;
  };

  JqTreeWidget.prototype.setOption = function(option, value) {
    this.options[option] = value;
    return this.element;
  };

  JqTreeWidget.prototype.moveDown = function() {
    if (this.key_handler) {
      this.key_handler.moveDown();
    }
    return this.element;
  };

  JqTreeWidget.prototype.moveUp = function() {
    if (this.key_handler) {
      this.key_handler.moveUp();
    }
    return this.element;
  };

  JqTreeWidget.prototype.getVersion = function() {
    return __version__;
  };

  JqTreeWidget.prototype._init = function() {
    JqTreeWidget.__super__._init.call(this);
    this.element = this.$el;
    this.mouse_delay = 300;
    this.is_initialized = false;
    this.options.rtl = this._getRtlOption();
    if (!this.options.closedIcon) {
      this.options.closedIcon = this._getDefaultClosedIcon();
    }
    this.renderer = new ElementsRenderer(this);
    if (SaveStateHandler != null) {
      this.save_state_handler = new SaveStateHandler(this);
    } else {
      this.options.saveState = false;
    }
    if (SelectNodeHandler != null) {
      this.select_node_handler = new SelectNodeHandler(this);
    }
    if (DragAndDropHandler != null) {
      this.dnd_handler = new DragAndDropHandler(this);
    } else {
      this.options.dragAndDrop = false;
    }
    if (ScrollHandler != null) {
      this.scroll_handler = new ScrollHandler(this);
    }
    if ((KeyHandler != null) && (SelectNodeHandler != null)) {
      this.key_handler = new KeyHandler(this);
    }
    this._initData();
    this.element.click($.proxy(this._click, this));
    this.element.dblclick($.proxy(this._dblclick, this));
    if (this.options.useContextMenu) {
      return this.element.bind('contextmenu', $.proxy(this._contextmenu, this));
    }
  };

  JqTreeWidget.prototype._deinit = function() {
    this.element.empty();
    this.element.unbind();
    if (this.key_handler) {
      this.key_handler.deinit();
    }
    this.tree = null;
    return JqTreeWidget.__super__._deinit.call(this);
  };

  JqTreeWidget.prototype._initData = function() {
    if (this.options.data) {
      return this._loadData(this.options.data);
    } else {
      return this._loadDataFromUrl(this._getDataUrlInfo());
    }
  };

  JqTreeWidget.prototype._getDataUrlInfo = function(node) {
    var data_url, getUrlFromString;
    data_url = this.options.dataUrl || this.element.data('url');
    getUrlFromString = (function(_this) {
      return function() {
        var data, selected_node_id, url_info;
        url_info = {
          url: data_url
        };
        if (node && node.id) {
          data = {
            node: node.id
          };
          url_info['data'] = data;
        } else {
          selected_node_id = _this._getNodeIdToBeSelected();
          if (selected_node_id) {
            data = {
              selected_node: selected_node_id
            };
            url_info['data'] = data;
          }
        }
        return url_info;
      };
    })(this);
    if ($.isFunction(data_url)) {
      return data_url(node);
    } else if ($.type(data_url) === 'string') {
      return getUrlFromString();
    } else {
      return data_url;
    }
  };

  JqTreeWidget.prototype._getNodeIdToBeSelected = function() {
    if (this.options.saveState) {
      return this.save_state_handler.getNodeIdToBeSelected();
    } else {
      return null;
    }
  };

  JqTreeWidget.prototype._initTree = function(data) {
    var doInit, must_load_on_demand;
    doInit = (function(_this) {
      return function() {
        if (!_this.is_initialized) {
          _this.is_initialized = true;
          return _this._triggerEvent('tree.init');
        }
      };
    })(this);
    this.tree = new this.options.nodeClass(null, true, this.options.nodeClass);
    if (this.select_node_handler) {
      this.select_node_handler.clear();
    }
    this.tree.loadFromData(data);
    must_load_on_demand = this._setInitialState();
    this._refreshElements();
    if (!must_load_on_demand) {
      return doInit();
    } else {
      return this._setInitialStateOnDemand(doInit);
    }
  };

  JqTreeWidget.prototype._setInitialState = function() {
    var autoOpenNodes, is_restored, must_load_on_demand, ref1, restoreState;
    restoreState = (function(_this) {
      return function() {
        var must_load_on_demand, state;
        if (!(_this.options.saveState && _this.save_state_handler)) {
          return [false, false];
        } else {
          state = _this.save_state_handler.getStateFromStorage();
          if (!state) {
            return [false, false];
          } else {
            must_load_on_demand = _this.save_state_handler.setInitialState(state);
            return [true, must_load_on_demand];
          }
        }
      };
    })(this);
    autoOpenNodes = (function(_this) {
      return function() {
        var max_level, must_load_on_demand;
        if (_this.options.autoOpen === false) {
          return false;
        }
        max_level = _this._getAutoOpenMaxLevel();
        must_load_on_demand = false;
        _this.tree.iterate(function(node, level) {
          if (node.load_on_demand) {
            must_load_on_demand = true;
            return false;
          } else if (!node.hasChildren()) {
            return false;
          } else {
            node.is_open = true;
            return level !== max_level;
          }
        });
        return must_load_on_demand;
      };
    })(this);
    ref1 = restoreState(), is_restored = ref1[0], must_load_on_demand = ref1[1];
    if (!is_restored) {
      must_load_on_demand = autoOpenNodes();
    }
    return must_load_on_demand;
  };

  JqTreeWidget.prototype._setInitialStateOnDemand = function(cb_finished) {
    var autoOpenNodes, restoreState;
    restoreState = (function(_this) {
      return function() {
        var state;
        if (!(_this.options.saveState && _this.save_state_handler)) {
          return false;
        } else {
          state = _this.save_state_handler.getStateFromStorage();
          if (!state) {
            return false;
          } else {
            _this.save_state_handler.setInitialStateOnDemand(state, cb_finished);
            return true;
          }
        }
      };
    })(this);
    autoOpenNodes = (function(_this) {
      return function() {
        var loadAndOpenNode, loading_count, max_level, openNodes;
        max_level = _this._getAutoOpenMaxLevel();
        loading_count = 0;
        loadAndOpenNode = function(node) {
          loading_count += 1;
          return _this._openNode(node, false, function() {
            loading_count -= 1;
            return openNodes();
          });
        };
        openNodes = function() {
          _this.tree.iterate(function(node, level) {
            if (node.load_on_demand) {
              if (!node.is_loading) {
                loadAndOpenNode(node);
              }
              return false;
            } else {
              _this._openNode(node, false);
              return level !== max_level;
            }
          });
          if (loading_count === 0) {
            return cb_finished();
          }
        };
        return openNodes();
      };
    })(this);
    if (!restoreState()) {
      return autoOpenNodes();
    }
  };

  JqTreeWidget.prototype._getAutoOpenMaxLevel = function() {
    if (this.options.autoOpen === true) {
      return -1;
    } else {
      return parseInt(this.options.autoOpen);
    }
  };


  /*
  Redraw the tree or part of the tree.
   * from_node: redraw this subtree
   */

  JqTreeWidget.prototype._refreshElements = function(from_node) {
    if (from_node == null) {
      from_node = null;
    }
    this.renderer.render(from_node);
    return this._triggerEvent('tree.refresh');
  };

  JqTreeWidget.prototype._click = function(e) {
    var click_target, event, node;
    click_target = this._getClickTarget(e.target);
    if (click_target) {
      if (click_target.type === 'button') {
        this.toggle(click_target.node, this.options.slide);
        e.preventDefault();
        return e.stopPropagation();
      } else if (click_target.type === 'label') {
        node = click_target.node;
        event = this._triggerEvent('tree.click', {
          node: node,
          click_event: e
        });
        if (!event.isDefaultPrevented()) {
          return this._selectNode(node, true);
        }
      }
    }
  };

  JqTreeWidget.prototype._dblclick = function(e) {
    var click_target;
    click_target = this._getClickTarget(e.target);
    if (click_target && click_target.type === 'label') {
      return this._triggerEvent('tree.dblclick', {
        node: click_target.node,
        click_event: e
      });
    }
  };

  JqTreeWidget.prototype._getClickTarget = function(element) {
    var $button, $el, $target, node;
    $target = $(element);
    $button = $target.closest('.jqtree-toggler');
    if ($button.length) {
      node = this._getNode($button);
      if (node) {
        return {
          type: 'button',
          node: node
        };
      }
    } else {
      $el = $target.closest('.jqtree-element');
      if ($el.length) {
        node = this._getNode($el);
        if (node) {
          return {
            type: 'label',
            node: node
          };
        }
      }
    }
    return null;
  };

  JqTreeWidget.prototype._getNode = function($element) {
    var $li;
    $li = $element.closest('li.jqtree_common');
    if ($li.length === 0) {
      return null;
    } else {
      return $li.data('node');
    }
  };

  JqTreeWidget.prototype._getNodeElementForNode = function(node) {
    if (node.isFolder()) {
      return new FolderElement(node, this);
    } else {
      return new NodeElement(node, this);
    }
  };

  JqTreeWidget.prototype._getNodeElement = function($element) {
    var node;
    node = this._getNode($element);
    if (node) {
      return this._getNodeElementForNode(node);
    } else {
      return null;
    }
  };

  JqTreeWidget.prototype._contextmenu = function(e) {
    var $div, node;
    $div = $(e.target).closest('ul.jqtree-tree .jqtree-element');
    if ($div.length) {
      node = this._getNode($div);
      if (node) {
        e.preventDefault();
        e.stopPropagation();
        this._triggerEvent('tree.contextmenu', {
          node: node,
          click_event: e
        });
        return false;
      }
    }
  };

  JqTreeWidget.prototype._saveState = function() {
    if (this.options.saveState) {
      return this.save_state_handler.saveState();
    }
  };

  JqTreeWidget.prototype._mouseCapture = function(position_info) {
    if (this.options.dragAndDrop) {
      return this.dnd_handler.mouseCapture(position_info);
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype._mouseStart = function(position_info) {
    if (this.options.dragAndDrop) {
      return this.dnd_handler.mouseStart(position_info);
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype._mouseDrag = function(position_info) {
    var result;
    if (this.options.dragAndDrop) {
      result = this.dnd_handler.mouseDrag(position_info);
      if (this.scroll_handler) {
        this.scroll_handler.checkScrolling();
      }
      return result;
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype._mouseStop = function(position_info) {
    if (this.options.dragAndDrop) {
      return this.dnd_handler.mouseStop(position_info);
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype._triggerEvent = function(event_name, values) {
    var event;
    event = $.Event(event_name);
    $.extend(event, values);
    this.element.trigger(event);
    return event;
  };

  JqTreeWidget.prototype.testGenerateHitAreas = function(moving_node) {
    this.dnd_handler.current_item = this._getNodeElementForNode(moving_node);
    this.dnd_handler.generateHitAreas();
    return this.dnd_handler.hit_areas;
  };

  JqTreeWidget.prototype._selectCurrentNode = function() {
    var node, node_element;
    node = this.getSelectedNode();
    if (node) {
      node_element = this._getNodeElementForNode(node);
      if (node_element) {
        return node_element.select();
      }
    }
  };

  JqTreeWidget.prototype._deselectCurrentNode = function() {
    var node;
    node = this.getSelectedNode();
    if (node) {
      return this.removeFromSelection(node);
    }
  };

  JqTreeWidget.prototype._getDefaultClosedIcon = function() {
    if (this.options.rtl) {
      return '&#x25c0;';
    } else {
      return '&#x25ba;';
    }
  };

  JqTreeWidget.prototype._getRtlOption = function() {
    var data_rtl;
    if (this.options.rtl !== null) {
      return this.options.rtl;
    } else {
      data_rtl = this.element.data('rtl');
      if ((data_rtl != null) && data_rtl !== false) {
        return true;
      } else {
        return false;
      }
    }
  };

  JqTreeWidget.prototype._notifyLoading = function(is_loading, node, $el) {
    if (this.options.onLoading) {
      return this.options.onLoading(is_loading, node, $el);
    }
  };

  return JqTreeWidget;

})(MouseWidget);

JqTreeWidget.getModule = function(name) {
  var modules;
  modules = {
    'node': node_module,
    'util': util_module,
    'drag_and_drop_handler': drag_and_drop_handler
  };
  return modules[name];
};

SimpleWidget.register(JqTreeWidget, 'tree');

},{"./drag_and_drop_handler":1,"./elements_renderer":2,"./key_handler":3,"./mouse.widget":4,"./node":5,"./node_element":6,"./save_state_handler":7,"./scroll_handler":8,"./select_node_handler":9,"./simple.widget":10,"./util":12,"./version":13}],12:[function(require,module,exports){
var _indexOf, getBoolString, html_escape, indexOf, isInt;

_indexOf = function(array, item) {
  var i, j, len, value;
  for (i = j = 0, len = array.length; j < len; i = ++j) {
    value = array[i];
    if (value === item) {
      return i;
    }
  }
  return -1;
};

indexOf = function(array, item) {
  if (array.indexOf) {
    return array.indexOf(item);
  } else {
    return _indexOf(array, item);
  }
};

isInt = function(n) {
  return typeof n === 'number' && n % 1 === 0;
};

html_escape = function(string) {
  return ('' + string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
};

getBoolString = function(value) {
  if (value) {
    return 'true';
  } else {
    return 'false';
  }
};

module.exports = {
  _indexOf: _indexOf,
  getBoolString: getBoolString,
  html_escape: html_escape,
  indexOf: indexOf,
  isInt: isInt
};

},{}],13:[function(require,module,exports){
module.exports = '1.3.4';

},{}]},{},[11]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3ZlbmRvcnMuZjU0ODFlNzY1MjJkMDRhOGQxZTcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQixVQUFVLFVBQVUsTUFBTSxTQUFtQyxDQUFDLGdCQUFnQixPQUFDLE9BQU8sb0JBQW9CLDhDQUE4QyxrQ0FBa0MsWUFBWSxZQUFZLG1DQUFtQyxpQkFBaUIsZ0JBQWdCLHNCQUFzQixvQkFBb0IsTUFBTSxTQUFtQyxDQUFDLFlBQVksV0FBVyxZQUFZLFNBQVMsR0FBRztBQUM1YjtBQUNBLHFDQUFxQywwQkFBMEIsMkRBQTJELGtCQUFrQiw0QkFBNEIsbUNBQW1DLDhCQUE4QixvQ0FBb0MsZUFBZTtBQUM1UixjQUFjOztBQUVkOztBQUVBOztBQUVBOztBQUVBLElBQUksTUFBTTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFNBQVM7QUFDckQ7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsRUFBRSx1QkFBdUI7QUFDMUI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsSUFBSSxNQUFNOztBQUVWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBLENBQUMsRUFBRSwrQkFBK0I7QUFDbEM7QUFDQSwyQkFBMkIsbUJBQW1COztBQUU5QyxJQUFJLE1BQU07O0FBRVY7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUEsQ0FBQyxHQUFHOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDBCQUEwQiwyREFBMkQsa0JBQWtCLDRCQUE0QixtQ0FBbUMsOEJBQThCLG9DQUFvQyxlQUFlO0FBQzVSLGNBQWM7O0FBRWQ7O0FBRUEsSUFBSSxNQUFNOztBQUVWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUEsQ0FBQyxFQUFFLHFCQUFxQjtBQUN4Qjs7QUFFQSxJQUFJLE1BQU07O0FBRVY7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtREFBbUQsZ0NBQWdDO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUJBQXFCO0FBQ3ZDO0FBQ0Esa0JBQWtCLHFDQUFxQztBQUN2RDtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxTQUFTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakMsZ0JBQWdCO0FBQ2hCO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsU0FBUztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7QUFDQSxxQ0FBcUMsMEJBQTBCLDJEQUEyRCxrQkFBa0IsNEJBQTRCLG1DQUFtQyw4QkFBOEIsb0NBQW9DLGVBQWU7QUFDNVIsY0FBYzs7QUFFZDs7QUFFQTs7QUFFQSxJQUFJLE1BQU07O0FBRVY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxFQUFFLFdBQVc7QUFDZDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFJLE1BQU07O0FBRVY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsU0FBUztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7O0FBRUEsSUFBSSxNQUFNOztBQUVWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsU0FBUztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBLENBQUMsR0FBRztBQUNKOztBQUVBLElBQUksTUFBTTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQSxDQUFDLEdBQUc7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLE1BQU07O0FBRVY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7QUFDQSxxQ0FBcUMsMEJBQTBCLDJEQUEyRCxrQkFBa0IsNEJBQTRCLG1DQUFtQyw4QkFBOEIsb0NBQW9DLGVBQWU7QUFDNVIsY0FBYzs7QUFFZDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFJLE1BQU07O0FBRVY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwwQkFBMEI7QUFDaEYscURBQXFELDBCQUEwQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QywwQkFBMEI7QUFDbkUsMENBQTBDLDBCQUEwQjtBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsU0FBUztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLE1BQU07QUFDTixzQkFBc0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsK09BQStPO0FBQ2xQOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxzQkFBc0Isc0JBQXNCLHdCQUF3Qix3QkFBd0IseUJBQXlCO0FBQ2hLOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7O0FBRUEsQ0FBQyxHQUFHLEVBQUUsR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvanF0cmVlL3RyZWUuanF1ZXJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5KcVRyZWUgMS4zLjRcblxuQ29weXJpZ2h0IDIwMTUgTWFyY28gQnJhYWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQsIERyYWdBbmREcm9wSGFuZGxlciwgRHJhZ0VsZW1lbnQsIEhpdEFyZWFzR2VuZXJhdG9yLCBQb3NpdGlvbiwgVmlzaWJsZU5vZGVJdGVyYXRvciwgbm9kZV9tb2R1bGUsIHV0aWwsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5ub2RlX21vZHVsZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xuXG51dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cblBvc2l0aW9uID0gbm9kZV9tb2R1bGUuUG9zaXRpb247XG5cbiQgPSBqUXVlcnk7XG5cbkRyYWdBbmREcm9wSGFuZGxlciA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gRHJhZ0FuZERyb3BIYW5kbGVyKHRyZWVfd2lkZ2V0KSB7XG4gICAgdGhpcy50cmVlX3dpZGdldCA9IHRyZWVfd2lkZ2V0O1xuICAgIHRoaXMuaG92ZXJlZF9hcmVhID0gbnVsbDtcbiAgICB0aGlzLiRnaG9zdCA9IG51bGw7XG4gICAgdGhpcy5oaXRfYXJlYXMgPSBbXTtcbiAgICB0aGlzLmlzX2RyYWdnaW5nID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50X2l0ZW0gPSBudWxsO1xuICB9XG5cbiAgRHJhZ0FuZERyb3BIYW5kbGVyLnByb3RvdHlwZS5tb3VzZUNhcHR1cmUgPSBmdW5jdGlvbihwb3NpdGlvbl9pbmZvKSB7XG4gICAgdmFyICRlbGVtZW50LCBub2RlX2VsZW1lbnQ7XG4gICAgJGVsZW1lbnQgPSAkKHBvc2l0aW9uX2luZm8udGFyZ2V0KTtcbiAgICBpZiAoIXRoaXMubXVzdENhcHR1cmVFbGVtZW50KCRlbGVtZW50KSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMub25Jc01vdmVIYW5kbGUgJiYgIXRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5vbklzTW92ZUhhbmRsZSgkZWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBub2RlX2VsZW1lbnQgPSB0aGlzLnRyZWVfd2lkZ2V0Ll9nZXROb2RlRWxlbWVudCgkZWxlbWVudCk7XG4gICAgaWYgKG5vZGVfZWxlbWVudCAmJiB0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMub25DYW5Nb3ZlKSB7XG4gICAgICBpZiAoIXRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5vbkNhbk1vdmUobm9kZV9lbGVtZW50Lm5vZGUpKSB7XG4gICAgICAgIG5vZGVfZWxlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY3VycmVudF9pdGVtID0gbm9kZV9lbGVtZW50O1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRfaXRlbSAhPT0gbnVsbDtcbiAgfTtcblxuICBEcmFnQW5kRHJvcEhhbmRsZXIucHJvdG90eXBlLm1vdXNlU3RhcnQgPSBmdW5jdGlvbihwb3NpdGlvbl9pbmZvKSB7XG4gICAgdmFyIG9mZnNldDtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgICBvZmZzZXQgPSAkKHBvc2l0aW9uX2luZm8udGFyZ2V0KS5vZmZzZXQoKTtcbiAgICB0aGlzLmRyYWdfZWxlbWVudCA9IG5ldyBEcmFnRWxlbWVudCh0aGlzLmN1cnJlbnRfaXRlbS5ub2RlLCBwb3NpdGlvbl9pbmZvLnBhZ2VfeCAtIG9mZnNldC5sZWZ0LCBwb3NpdGlvbl9pbmZvLnBhZ2VfeSAtIG9mZnNldC50b3AsIHRoaXMudHJlZV93aWRnZXQuZWxlbWVudCk7XG4gICAgdGhpcy5pc19kcmFnZ2luZyA9IHRydWU7XG4gICAgdGhpcy5jdXJyZW50X2l0ZW0uJGVsZW1lbnQuYWRkQ2xhc3MoJ2pxdHJlZS1tb3ZpbmcnKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBEcmFnQW5kRHJvcEhhbmRsZXIucHJvdG90eXBlLm1vdXNlRHJhZyA9IGZ1bmN0aW9uKHBvc2l0aW9uX2luZm8pIHtcbiAgICB2YXIgYXJlYSwgY2FuX21vdmVfdG87XG4gICAgdGhpcy5kcmFnX2VsZW1lbnQubW92ZShwb3NpdGlvbl9pbmZvLnBhZ2VfeCwgcG9zaXRpb25faW5mby5wYWdlX3kpO1xuICAgIGFyZWEgPSB0aGlzLmZpbmRIb3ZlcmVkQXJlYShwb3NpdGlvbl9pbmZvLnBhZ2VfeCwgcG9zaXRpb25faW5mby5wYWdlX3kpO1xuICAgIGNhbl9tb3ZlX3RvID0gdGhpcy5jYW5Nb3ZlVG9BcmVhKGFyZWEpO1xuICAgIGlmIChjYW5fbW92ZV90byAmJiBhcmVhKSB7XG4gICAgICBpZiAoIWFyZWEubm9kZS5pc0ZvbGRlcigpKSB7XG4gICAgICAgIHRoaXMuc3RvcE9wZW5Gb2xkZXJUaW1lcigpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaG92ZXJlZF9hcmVhICE9PSBhcmVhKSB7XG4gICAgICAgIHRoaXMuaG92ZXJlZF9hcmVhID0gYXJlYTtcbiAgICAgICAgaWYgKHRoaXMubXVzdE9wZW5Gb2xkZXJUaW1lcihhcmVhKSkge1xuICAgICAgICAgIHRoaXMuc3RhcnRPcGVuRm9sZGVyVGltZXIoYXJlYS5ub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0b3BPcGVuRm9sZGVyVGltZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZURyb3BIaW50KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlSG92ZXIoKTtcbiAgICAgIHRoaXMucmVtb3ZlRHJvcEhpbnQoKTtcbiAgICAgIHRoaXMuc3RvcE9wZW5Gb2xkZXJUaW1lcigpO1xuICAgIH1cbiAgICBpZiAoIWFyZWEpIHtcbiAgICAgIGlmICh0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMub25EcmFnTW92ZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5vbkRyYWdNb3ZlKHRoaXMuY3VycmVudF9pdGVtLm5vZGUsIHBvc2l0aW9uX2luZm8ub3JpZ2luYWxfZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBEcmFnQW5kRHJvcEhhbmRsZXIucHJvdG90eXBlLm11c3RDYXB0dXJlRWxlbWVudCA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gICAgcmV0dXJuICEkZWxlbWVudC5pcygnaW5wdXQsc2VsZWN0Jyk7XG4gIH07XG5cbiAgRHJhZ0FuZERyb3BIYW5kbGVyLnByb3RvdHlwZS5jYW5Nb3ZlVG9BcmVhID0gZnVuY3Rpb24oYXJlYSkge1xuICAgIHZhciBwb3NpdGlvbl9uYW1lO1xuICAgIGlmICghYXJlYSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy50cmVlX3dpZGdldC5vcHRpb25zLm9uQ2FuTW92ZVRvKSB7XG4gICAgICBwb3NpdGlvbl9uYW1lID0gUG9zaXRpb24uZ2V0TmFtZShhcmVhLnBvc2l0aW9uKTtcbiAgICAgIHJldHVybiB0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMub25DYW5Nb3ZlVG8odGhpcy5jdXJyZW50X2l0ZW0ubm9kZSwgYXJlYS5ub2RlLCBwb3NpdGlvbl9uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9O1xuXG4gIERyYWdBbmREcm9wSGFuZGxlci5wcm90b3R5cGUubW91c2VTdG9wID0gZnVuY3Rpb24ocG9zaXRpb25faW5mbykge1xuICAgIHZhciBjdXJyZW50X2l0ZW07XG4gICAgdGhpcy5tb3ZlSXRlbShwb3NpdGlvbl9pbmZvKTtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5yZW1vdmVIb3ZlcigpO1xuICAgIHRoaXMucmVtb3ZlRHJvcEhpbnQoKTtcbiAgICB0aGlzLnJlbW92ZUhpdEFyZWFzKCk7XG4gICAgY3VycmVudF9pdGVtID0gdGhpcy5jdXJyZW50X2l0ZW07XG4gICAgaWYgKHRoaXMuY3VycmVudF9pdGVtKSB7XG4gICAgICB0aGlzLmN1cnJlbnRfaXRlbS4kZWxlbWVudC5yZW1vdmVDbGFzcygnanF0cmVlLW1vdmluZycpO1xuICAgICAgdGhpcy5jdXJyZW50X2l0ZW0gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmlzX2RyYWdnaW5nID0gZmFsc2U7XG4gICAgaWYgKCF0aGlzLmhvdmVyZWRfYXJlYSAmJiBjdXJyZW50X2l0ZW0pIHtcbiAgICAgIGlmICh0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMub25EcmFnU3RvcCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5vbkRyYWdTdG9wKGN1cnJlbnRfaXRlbS5ub2RlLCBwb3NpdGlvbl9pbmZvLm9yaWdpbmFsX2V2ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIERyYWdBbmREcm9wSGFuZGxlci5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlSGl0QXJlYXMoKTtcbiAgICBpZiAodGhpcy5jdXJyZW50X2l0ZW0pIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVIaXRBcmVhcygpO1xuICAgICAgdGhpcy5jdXJyZW50X2l0ZW0gPSB0aGlzLnRyZWVfd2lkZ2V0Ll9nZXROb2RlRWxlbWVudEZvck5vZGUodGhpcy5jdXJyZW50X2l0ZW0ubm9kZSk7XG4gICAgICBpZiAodGhpcy5pc19kcmFnZ2luZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50X2l0ZW0uJGVsZW1lbnQuYWRkQ2xhc3MoJ2pxdHJlZS1tb3ZpbmcnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgRHJhZ0FuZERyb3BIYW5kbGVyLnByb3RvdHlwZS5yZW1vdmVIaXRBcmVhcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmhpdF9hcmVhcyA9IFtdO1xuICB9O1xuXG4gIERyYWdBbmREcm9wSGFuZGxlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmRyYWdfZWxlbWVudC5yZW1vdmUoKTtcbiAgICByZXR1cm4gdGhpcy5kcmFnX2VsZW1lbnQgPSBudWxsO1xuICB9O1xuXG4gIERyYWdBbmREcm9wSGFuZGxlci5wcm90b3R5cGUucmVtb3ZlRHJvcEhpbnQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c19naG9zdCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXNfZ2hvc3QucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIERyYWdBbmREcm9wSGFuZGxlci5wcm90b3R5cGUucmVtb3ZlSG92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5ob3ZlcmVkX2FyZWEgPSBudWxsO1xuICB9O1xuXG4gIERyYWdBbmREcm9wSGFuZGxlci5wcm90b3R5cGUuZ2VuZXJhdGVIaXRBcmVhcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBoaXRfYXJlYXNfZ2VuZXJhdG9yO1xuICAgIGhpdF9hcmVhc19nZW5lcmF0b3IgPSBuZXcgSGl0QXJlYXNHZW5lcmF0b3IodGhpcy50cmVlX3dpZGdldC50cmVlLCB0aGlzLmN1cnJlbnRfaXRlbS5ub2RlLCB0aGlzLmdldFRyZWVEaW1lbnNpb25zKCkuYm90dG9tKTtcbiAgICByZXR1cm4gdGhpcy5oaXRfYXJlYXMgPSBoaXRfYXJlYXNfZ2VuZXJhdG9yLmdlbmVyYXRlKCk7XG4gIH07XG5cbiAgRHJhZ0FuZERyb3BIYW5kbGVyLnByb3RvdHlwZS5maW5kSG92ZXJlZEFyZWEgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIGFyZWEsIGRpbWVuc2lvbnMsIGhpZ2gsIGxvdywgbWlkO1xuICAgIGRpbWVuc2lvbnMgPSB0aGlzLmdldFRyZWVEaW1lbnNpb25zKCk7XG4gICAgaWYgKHggPCBkaW1lbnNpb25zLmxlZnQgfHwgeSA8IGRpbWVuc2lvbnMudG9wIHx8IHggPiBkaW1lbnNpb25zLnJpZ2h0IHx8IHkgPiBkaW1lbnNpb25zLmJvdHRvbSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxvdyA9IDA7XG4gICAgaGlnaCA9IHRoaXMuaGl0X2FyZWFzLmxlbmd0aDtcbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgbWlkID0gKGxvdyArIGhpZ2gpID4+IDE7XG4gICAgICBhcmVhID0gdGhpcy5oaXRfYXJlYXNbbWlkXTtcbiAgICAgIGlmICh5IDwgYXJlYS50b3ApIHtcbiAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgIH0gZWxzZSBpZiAoeSA+IGFyZWEuYm90dG9tKSB7XG4gICAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYXJlYTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgRHJhZ0FuZERyb3BIYW5kbGVyLnByb3RvdHlwZS5tdXN0T3BlbkZvbGRlclRpbWVyID0gZnVuY3Rpb24oYXJlYSkge1xuICAgIHZhciBub2RlO1xuICAgIG5vZGUgPSBhcmVhLm5vZGU7XG4gICAgcmV0dXJuIG5vZGUuaXNGb2xkZXIoKSAmJiAhbm9kZS5pc19vcGVuICYmIGFyZWEucG9zaXRpb24gPT09IFBvc2l0aW9uLklOU0lERTtcbiAgfTtcblxuICBEcmFnQW5kRHJvcEhhbmRsZXIucHJvdG90eXBlLnVwZGF0ZURyb3BIaW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5vZGVfZWxlbWVudDtcbiAgICBpZiAoIXRoaXMuaG92ZXJlZF9hcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlRHJvcEhpbnQoKTtcbiAgICBub2RlX2VsZW1lbnQgPSB0aGlzLnRyZWVfd2lkZ2V0Ll9nZXROb2RlRWxlbWVudEZvck5vZGUodGhpcy5ob3ZlcmVkX2FyZWEubm9kZSk7XG4gICAgcmV0dXJuIHRoaXMucHJldmlvdXNfZ2hvc3QgPSBub2RlX2VsZW1lbnQuYWRkRHJvcEhpbnQodGhpcy5ob3ZlcmVkX2FyZWEucG9zaXRpb24pO1xuICB9O1xuXG4gIERyYWdBbmREcm9wSGFuZGxlci5wcm90b3R5cGUuc3RhcnRPcGVuRm9sZGVyVGltZXIgPSBmdW5jdGlvbihmb2xkZXIpIHtcbiAgICB2YXIgb3BlbkZvbGRlcjtcbiAgICBvcGVuRm9sZGVyID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy50cmVlX3dpZGdldC5fb3Blbk5vZGUoZm9sZGVyLCBfdGhpcy50cmVlX3dpZGdldC5vcHRpb25zLnNsaWRlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZURyb3BIaW50KCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICB0aGlzLnN0b3BPcGVuRm9sZGVyVGltZXIoKTtcbiAgICByZXR1cm4gdGhpcy5vcGVuX2ZvbGRlcl90aW1lciA9IHNldFRpbWVvdXQob3BlbkZvbGRlciwgdGhpcy50cmVlX3dpZGdldC5vcHRpb25zLm9wZW5Gb2xkZXJEZWxheSk7XG4gIH07XG5cbiAgRHJhZ0FuZERyb3BIYW5kbGVyLnByb3RvdHlwZS5zdG9wT3BlbkZvbGRlclRpbWVyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMub3Blbl9mb2xkZXJfdGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLm9wZW5fZm9sZGVyX3RpbWVyKTtcbiAgICAgIHJldHVybiB0aGlzLm9wZW5fZm9sZGVyX3RpbWVyID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgRHJhZ0FuZERyb3BIYW5kbGVyLnByb3RvdHlwZS5tb3ZlSXRlbSA9IGZ1bmN0aW9uKHBvc2l0aW9uX2luZm8pIHtcbiAgICB2YXIgZG9Nb3ZlLCBldmVudCwgbW92ZWRfbm9kZSwgcG9zaXRpb24sIHByZXZpb3VzX3BhcmVudCwgdGFyZ2V0X25vZGU7XG4gICAgaWYgKHRoaXMuaG92ZXJlZF9hcmVhICYmIHRoaXMuaG92ZXJlZF9hcmVhLnBvc2l0aW9uICE9PSBQb3NpdGlvbi5OT05FICYmIHRoaXMuY2FuTW92ZVRvQXJlYSh0aGlzLmhvdmVyZWRfYXJlYSkpIHtcbiAgICAgIG1vdmVkX25vZGUgPSB0aGlzLmN1cnJlbnRfaXRlbS5ub2RlO1xuICAgICAgdGFyZ2V0X25vZGUgPSB0aGlzLmhvdmVyZWRfYXJlYS5ub2RlO1xuICAgICAgcG9zaXRpb24gPSB0aGlzLmhvdmVyZWRfYXJlYS5wb3NpdGlvbjtcbiAgICAgIHByZXZpb3VzX3BhcmVudCA9IG1vdmVkX25vZGUucGFyZW50O1xuICAgICAgaWYgKHBvc2l0aW9uID09PSBQb3NpdGlvbi5JTlNJREUpIHtcbiAgICAgICAgdGhpcy5ob3ZlcmVkX2FyZWEubm9kZS5pc19vcGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGRvTW92ZSA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgX3RoaXMudHJlZV93aWRnZXQudHJlZS5tb3ZlTm9kZShtb3ZlZF9ub2RlLCB0YXJnZXRfbm9kZSwgcG9zaXRpb24pO1xuICAgICAgICAgIF90aGlzLnRyZWVfd2lkZ2V0LmVsZW1lbnQuZW1wdHkoKTtcbiAgICAgICAgICByZXR1cm4gX3RoaXMudHJlZV93aWRnZXQuX3JlZnJlc2hFbGVtZW50cygpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICBldmVudCA9IHRoaXMudHJlZV93aWRnZXQuX3RyaWdnZXJFdmVudCgndHJlZS5tb3ZlJywge1xuICAgICAgICBtb3ZlX2luZm86IHtcbiAgICAgICAgICBtb3ZlZF9ub2RlOiBtb3ZlZF9ub2RlLFxuICAgICAgICAgIHRhcmdldF9ub2RlOiB0YXJnZXRfbm9kZSxcbiAgICAgICAgICBwb3NpdGlvbjogUG9zaXRpb24uZ2V0TmFtZShwb3NpdGlvbiksXG4gICAgICAgICAgcHJldmlvdXNfcGFyZW50OiBwcmV2aW91c19wYXJlbnQsXG4gICAgICAgICAgZG9fbW92ZTogZG9Nb3ZlLFxuICAgICAgICAgIG9yaWdpbmFsX2V2ZW50OiBwb3NpdGlvbl9pbmZvLm9yaWdpbmFsX2V2ZW50XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKCFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm4gZG9Nb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIERyYWdBbmREcm9wSGFuZGxlci5wcm90b3R5cGUuZ2V0VHJlZURpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb2Zmc2V0O1xuICAgIG9mZnNldCA9IHRoaXMudHJlZV93aWRnZXQuZWxlbWVudC5vZmZzZXQoKTtcbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogb2Zmc2V0LmxlZnQsXG4gICAgICB0b3A6IG9mZnNldC50b3AsXG4gICAgICByaWdodDogb2Zmc2V0LmxlZnQgKyB0aGlzLnRyZWVfd2lkZ2V0LmVsZW1lbnQud2lkdGgoKSxcbiAgICAgIGJvdHRvbTogb2Zmc2V0LnRvcCArIHRoaXMudHJlZV93aWRnZXQuZWxlbWVudC5oZWlnaHQoKSArIDE2XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gRHJhZ0FuZERyb3BIYW5kbGVyO1xuXG59KSgpO1xuXG5WaXNpYmxlTm9kZUl0ZXJhdG9yID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBWaXNpYmxlTm9kZUl0ZXJhdG9yKHRyZWUpIHtcbiAgICB0aGlzLnRyZWUgPSB0cmVlO1xuICB9XG5cbiAgVmlzaWJsZU5vZGVJdGVyYXRvci5wcm90b3R5cGUuaXRlcmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfaXRlcmF0ZU5vZGUsIGlzX2ZpcnN0X25vZGU7XG4gICAgaXNfZmlyc3Rfbm9kZSA9IHRydWU7XG4gICAgX2l0ZXJhdGVOb2RlID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obm9kZSwgbmV4dF9ub2RlKSB7XG4gICAgICAgIHZhciAkZWxlbWVudCwgY2hpbGQsIGNoaWxkcmVuX2xlbmd0aCwgaSwgaiwgbGVuLCBtdXN0X2l0ZXJhdGVfaW5zaWRlLCByZWY7XG4gICAgICAgIG11c3RfaXRlcmF0ZV9pbnNpZGUgPSAobm9kZS5pc19vcGVuIHx8ICFub2RlLmVsZW1lbnQpICYmIG5vZGUuaGFzQ2hpbGRyZW4oKTtcbiAgICAgICAgaWYgKG5vZGUuZWxlbWVudCkge1xuICAgICAgICAgICRlbGVtZW50ID0gJChub2RlLmVsZW1lbnQpO1xuICAgICAgICAgIGlmICghJGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzX2ZpcnN0X25vZGUpIHtcbiAgICAgICAgICAgIF90aGlzLmhhbmRsZUZpcnN0Tm9kZShub2RlLCAkZWxlbWVudCk7XG4gICAgICAgICAgICBpc19maXJzdF9ub2RlID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbm9kZS5oYXNDaGlsZHJlbigpKSB7XG4gICAgICAgICAgICBfdGhpcy5oYW5kbGVOb2RlKG5vZGUsIG5leHRfbm9kZSwgJGVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5pc19vcGVuKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmhhbmRsZU9wZW5Gb2xkZXIobm9kZSwgJGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgIG11c3RfaXRlcmF0ZV9pbnNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaGFuZGxlQ2xvc2VkRm9sZGVyKG5vZGUsIG5leHRfbm9kZSwgJGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobXVzdF9pdGVyYXRlX2luc2lkZSkge1xuICAgICAgICAgIGNoaWxkcmVuX2xlbmd0aCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgIHJlZiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgICAgZm9yIChpID0gaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGkgPSArK2opIHtcbiAgICAgICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICAgICAgaWYgKGkgPT09IChjaGlsZHJlbl9sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICBfaXRlcmF0ZU5vZGUobm9kZS5jaGlsZHJlbltpXSwgbnVsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaXRlcmF0ZU5vZGUobm9kZS5jaGlsZHJlbltpXSwgbm9kZS5jaGlsZHJlbltpICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5pc19vcGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuaGFuZGxlQWZ0ZXJPcGVuRm9sZGVyKG5vZGUsIG5leHRfbm9kZSwgJGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICByZXR1cm4gX2l0ZXJhdGVOb2RlKHRoaXMudHJlZSwgbnVsbCk7XG4gIH07XG5cbiAgVmlzaWJsZU5vZGVJdGVyYXRvci5wcm90b3R5cGUuaGFuZGxlTm9kZSA9IGZ1bmN0aW9uKG5vZGUsIG5leHRfbm9kZSwgJGVsZW1lbnQpIHt9O1xuXG4gIFZpc2libGVOb2RlSXRlcmF0b3IucHJvdG90eXBlLmhhbmRsZU9wZW5Gb2xkZXIgPSBmdW5jdGlvbihub2RlLCAkZWxlbWVudCkge307XG5cbiAgVmlzaWJsZU5vZGVJdGVyYXRvci5wcm90b3R5cGUuaGFuZGxlQ2xvc2VkRm9sZGVyID0gZnVuY3Rpb24obm9kZSwgbmV4dF9ub2RlLCAkZWxlbWVudCkge307XG5cbiAgVmlzaWJsZU5vZGVJdGVyYXRvci5wcm90b3R5cGUuaGFuZGxlQWZ0ZXJPcGVuRm9sZGVyID0gZnVuY3Rpb24obm9kZSwgbmV4dF9ub2RlLCAkZWxlbWVudCkge307XG5cbiAgVmlzaWJsZU5vZGVJdGVyYXRvci5wcm90b3R5cGUuaGFuZGxlRmlyc3ROb2RlID0gZnVuY3Rpb24obm9kZSwgJGVsZW1lbnQpIHt9O1xuXG4gIHJldHVybiBWaXNpYmxlTm9kZUl0ZXJhdG9yO1xuXG59KSgpO1xuXG5IaXRBcmVhc0dlbmVyYXRvciA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChIaXRBcmVhc0dlbmVyYXRvciwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gSGl0QXJlYXNHZW5lcmF0b3IodHJlZSwgY3VycmVudF9ub2RlLCB0cmVlX2JvdHRvbSkge1xuICAgIEhpdEFyZWFzR2VuZXJhdG9yLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHRyZWUpO1xuICAgIHRoaXMuY3VycmVudF9ub2RlID0gY3VycmVudF9ub2RlO1xuICAgIHRoaXMudHJlZV9ib3R0b20gPSB0cmVlX2JvdHRvbTtcbiAgfVxuXG4gIEhpdEFyZWFzR2VuZXJhdG9yLnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucG9zaXRpb25zID0gW107XG4gICAgdGhpcy5sYXN0X3RvcCA9IDA7XG4gICAgdGhpcy5pdGVyYXRlKCk7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVIaXRBcmVhcyh0aGlzLnBvc2l0aW9ucyk7XG4gIH07XG5cbiAgSGl0QXJlYXNHZW5lcmF0b3IucHJvdG90eXBlLmdldFRvcCA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gICAgcmV0dXJuICRlbGVtZW50Lm9mZnNldCgpLnRvcDtcbiAgfTtcblxuICBIaXRBcmVhc0dlbmVyYXRvci5wcm90b3R5cGUuYWRkUG9zaXRpb24gPSBmdW5jdGlvbihub2RlLCBwb3NpdGlvbiwgdG9wKSB7XG4gICAgdmFyIGFyZWE7XG4gICAgYXJlYSA9IHtcbiAgICAgIHRvcDogdG9wLFxuICAgICAgbm9kZTogbm9kZSxcbiAgICAgIHBvc2l0aW9uOiBwb3NpdGlvblxuICAgIH07XG4gICAgdGhpcy5wb3NpdGlvbnMucHVzaChhcmVhKTtcbiAgICByZXR1cm4gdGhpcy5sYXN0X3RvcCA9IHRvcDtcbiAgfTtcblxuICBIaXRBcmVhc0dlbmVyYXRvci5wcm90b3R5cGUuaGFuZGxlTm9kZSA9IGZ1bmN0aW9uKG5vZGUsIG5leHRfbm9kZSwgJGVsZW1lbnQpIHtcbiAgICB2YXIgdG9wO1xuICAgIHRvcCA9IHRoaXMuZ2V0VG9wKCRlbGVtZW50KTtcbiAgICBpZiAobm9kZSA9PT0gdGhpcy5jdXJyZW50X25vZGUpIHtcbiAgICAgIHRoaXMuYWRkUG9zaXRpb24obm9kZSwgUG9zaXRpb24uTk9ORSwgdG9wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRQb3NpdGlvbihub2RlLCBQb3NpdGlvbi5JTlNJREUsIHRvcCk7XG4gICAgfVxuICAgIGlmIChuZXh0X25vZGUgPT09IHRoaXMuY3VycmVudF9ub2RlIHx8IG5vZGUgPT09IHRoaXMuY3VycmVudF9ub2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRQb3NpdGlvbihub2RlLCBQb3NpdGlvbi5OT05FLCB0b3ApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRQb3NpdGlvbihub2RlLCBQb3NpdGlvbi5BRlRFUiwgdG9wKTtcbiAgICB9XG4gIH07XG5cbiAgSGl0QXJlYXNHZW5lcmF0b3IucHJvdG90eXBlLmhhbmRsZU9wZW5Gb2xkZXIgPSBmdW5jdGlvbihub2RlLCAkZWxlbWVudCkge1xuICAgIGlmIChub2RlID09PSB0aGlzLmN1cnJlbnRfbm9kZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobm9kZS5jaGlsZHJlblswXSAhPT0gdGhpcy5jdXJyZW50X25vZGUpIHtcbiAgICAgIHRoaXMuYWRkUG9zaXRpb24obm9kZSwgUG9zaXRpb24uSU5TSURFLCB0aGlzLmdldFRvcCgkZWxlbWVudCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBIaXRBcmVhc0dlbmVyYXRvci5wcm90b3R5cGUuaGFuZGxlQ2xvc2VkRm9sZGVyID0gZnVuY3Rpb24obm9kZSwgbmV4dF9ub2RlLCAkZWxlbWVudCkge1xuICAgIHZhciB0b3A7XG4gICAgdG9wID0gdGhpcy5nZXRUb3AoJGVsZW1lbnQpO1xuICAgIGlmIChub2RlID09PSB0aGlzLmN1cnJlbnRfbm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkUG9zaXRpb24obm9kZSwgUG9zaXRpb24uTk9ORSwgdG9wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRQb3NpdGlvbihub2RlLCBQb3NpdGlvbi5JTlNJREUsIHRvcCk7XG4gICAgICBpZiAobmV4dF9ub2RlICE9PSB0aGlzLmN1cnJlbnRfbm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRQb3NpdGlvbihub2RlLCBQb3NpdGlvbi5BRlRFUiwgdG9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSGl0QXJlYXNHZW5lcmF0b3IucHJvdG90eXBlLmhhbmRsZUZpcnN0Tm9kZSA9IGZ1bmN0aW9uKG5vZGUsICRlbGVtZW50KSB7XG4gICAgaWYgKG5vZGUgIT09IHRoaXMuY3VycmVudF9ub2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRQb3NpdGlvbihub2RlLCBQb3NpdGlvbi5CRUZPUkUsIHRoaXMuZ2V0VG9wKCQobm9kZS5lbGVtZW50KSkpO1xuICAgIH1cbiAgfTtcblxuICBIaXRBcmVhc0dlbmVyYXRvci5wcm90b3R5cGUuaGFuZGxlQWZ0ZXJPcGVuRm9sZGVyID0gZnVuY3Rpb24obm9kZSwgbmV4dF9ub2RlLCAkZWxlbWVudCkge1xuICAgIGlmIChub2RlID09PSB0aGlzLmN1cnJlbnRfbm9kZS5ub2RlIHx8IG5leHRfbm9kZSA9PT0gdGhpcy5jdXJyZW50X25vZGUubm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkUG9zaXRpb24obm9kZSwgUG9zaXRpb24uTk9ORSwgdGhpcy5sYXN0X3RvcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFBvc2l0aW9uKG5vZGUsIFBvc2l0aW9uLkFGVEVSLCB0aGlzLmxhc3RfdG9wKTtcbiAgICB9XG4gIH07XG5cbiAgSGl0QXJlYXNHZW5lcmF0b3IucHJvdG90eXBlLmdlbmVyYXRlSGl0QXJlYXMgPSBmdW5jdGlvbihwb3NpdGlvbnMpIHtcbiAgICB2YXIgZ3JvdXAsIGhpdF9hcmVhcywgaiwgbGVuLCBwb3NpdGlvbiwgcHJldmlvdXNfdG9wO1xuICAgIHByZXZpb3VzX3RvcCA9IC0xO1xuICAgIGdyb3VwID0gW107XG4gICAgaGl0X2FyZWFzID0gW107XG4gICAgZm9yIChqID0gMCwgbGVuID0gcG9zaXRpb25zLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uc1tqXTtcbiAgICAgIGlmIChwb3NpdGlvbi50b3AgIT09IHByZXZpb3VzX3RvcCAmJiBncm91cC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGdyb3VwLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuZ2VuZXJhdGVIaXRBcmVhc0Zvckdyb3VwKGhpdF9hcmVhcywgZ3JvdXAsIHByZXZpb3VzX3RvcCwgcG9zaXRpb24udG9wKTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2aW91c190b3AgPSBwb3NpdGlvbi50b3A7XG4gICAgICAgIGdyb3VwID0gW107XG4gICAgICB9XG4gICAgICBncm91cC5wdXNoKHBvc2l0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5nZW5lcmF0ZUhpdEFyZWFzRm9yR3JvdXAoaGl0X2FyZWFzLCBncm91cCwgcHJldmlvdXNfdG9wLCB0aGlzLnRyZWVfYm90dG9tKTtcbiAgICByZXR1cm4gaGl0X2FyZWFzO1xuICB9O1xuXG4gIEhpdEFyZWFzR2VuZXJhdG9yLnByb3RvdHlwZS5nZW5lcmF0ZUhpdEFyZWFzRm9yR3JvdXAgPSBmdW5jdGlvbihoaXRfYXJlYXMsIHBvc2l0aW9uc19pbl9ncm91cCwgdG9wLCBib3R0b20pIHtcbiAgICB2YXIgYXJlYV9oZWlnaHQsIGFyZWFfdG9wLCBpLCBwb3NpdGlvbiwgcG9zaXRpb25fY291bnQ7XG4gICAgcG9zaXRpb25fY291bnQgPSBNYXRoLm1pbihwb3NpdGlvbnNfaW5fZ3JvdXAubGVuZ3RoLCA0KTtcbiAgICBhcmVhX2hlaWdodCA9IE1hdGgucm91bmQoKGJvdHRvbSAtIHRvcCkgLyBwb3NpdGlvbl9jb3VudCk7XG4gICAgYXJlYV90b3AgPSB0b3A7XG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBwb3NpdGlvbl9jb3VudCkge1xuICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbnNfaW5fZ3JvdXBbaV07XG4gICAgICBoaXRfYXJlYXMucHVzaCh7XG4gICAgICAgIHRvcDogYXJlYV90b3AsXG4gICAgICAgIGJvdHRvbTogYXJlYV90b3AgKyBhcmVhX2hlaWdodCxcbiAgICAgICAgbm9kZTogcG9zaXRpb24ubm9kZSxcbiAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLnBvc2l0aW9uXG4gICAgICB9KTtcbiAgICAgIGFyZWFfdG9wICs9IGFyZWFfaGVpZ2h0O1xuICAgICAgaSArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gSGl0QXJlYXNHZW5lcmF0b3I7XG5cbn0pKFZpc2libGVOb2RlSXRlcmF0b3IpO1xuXG5EcmFnRWxlbWVudCA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gRHJhZ0VsZW1lbnQobm9kZSwgb2Zmc2V0X3gsIG9mZnNldF95LCAkdHJlZSkge1xuICAgIHZhciBub2RlX25hbWU7XG4gICAgdGhpcy5vZmZzZXRfeCA9IG9mZnNldF94O1xuICAgIHRoaXMub2Zmc2V0X3kgPSBvZmZzZXRfeTtcbiAgICBub2RlX25hbWUgPSB1dGlsLmh0bWxfZXNjYXBlKG5vZGUubmFtZSk7XG4gICAgdGhpcy4kZWxlbWVudCA9ICQoXCI8c3BhbiBjbGFzcz1cXFwianF0cmVlLXRpdGxlIGpxdHJlZS1kcmFnZ2luZ1xcXCI+XCIgKyBub2RlX25hbWUgKyBcIjwvc3Bhbj5cIik7XG4gICAgdGhpcy4kZWxlbWVudC5jc3MoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpO1xuICAgICR0cmVlLmFwcGVuZCh0aGlzLiRlbGVtZW50KTtcbiAgfVxuXG4gIERyYWdFbGVtZW50LnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24ocGFnZV94LCBwYWdlX3kpIHtcbiAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5vZmZzZXQoe1xuICAgICAgbGVmdDogcGFnZV94IC0gdGhpcy5vZmZzZXRfeCxcbiAgICAgIHRvcDogcGFnZV95IC0gdGhpcy5vZmZzZXRfeVxuICAgIH0pO1xuICB9O1xuXG4gIERyYWdFbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5yZW1vdmUoKTtcbiAgfTtcblxuICByZXR1cm4gRHJhZ0VsZW1lbnQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBEcmFnQW5kRHJvcEhhbmRsZXI6IERyYWdBbmREcm9wSGFuZGxlcixcbiAgRHJhZ0VsZW1lbnQ6IERyYWdFbGVtZW50LFxuICBIaXRBcmVhc0dlbmVyYXRvcjogSGl0QXJlYXNHZW5lcmF0b3Jcbn07XG5cbn0se1wiLi9ub2RlXCI6NSxcIi4vdXRpbFwiOjEyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgJCwgRWxlbWVudHNSZW5kZXJlciwgTm9kZUVsZW1lbnQsIGh0bWxfZXNjYXBlLCBub2RlX2VsZW1lbnQsIHV0aWw7XG5cbm5vZGVfZWxlbWVudCA9IHJlcXVpcmUoJy4vbm9kZV9lbGVtZW50Jyk7XG5cbk5vZGVFbGVtZW50ID0gbm9kZV9lbGVtZW50Lk5vZGVFbGVtZW50O1xuXG51dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmh0bWxfZXNjYXBlID0gdXRpbC5odG1sX2VzY2FwZTtcblxuJCA9IGpRdWVyeTtcblxuRWxlbWVudHNSZW5kZXJlciA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gRWxlbWVudHNSZW5kZXJlcih0cmVlX3dpZGdldCkge1xuICAgIHRoaXMudHJlZV93aWRnZXQgPSB0cmVlX3dpZGdldDtcbiAgICB0aGlzLm9wZW5lZF9pY29uX2VsZW1lbnQgPSB0aGlzLmNyZWF0ZUJ1dHRvbkVsZW1lbnQodHJlZV93aWRnZXQub3B0aW9ucy5vcGVuZWRJY29uKTtcbiAgICB0aGlzLmNsb3NlZF9pY29uX2VsZW1lbnQgPSB0aGlzLmNyZWF0ZUJ1dHRvbkVsZW1lbnQodHJlZV93aWRnZXQub3B0aW9ucy5jbG9zZWRJY29uKTtcbiAgfVxuXG4gIEVsZW1lbnRzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGZyb21fbm9kZSkge1xuICAgIGlmIChmcm9tX25vZGUgJiYgZnJvbV9ub2RlLnBhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRnJvbU5vZGUoZnJvbV9ub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRnJvbVJvb3QoKTtcbiAgICB9XG4gIH07XG5cbiAgRWxlbWVudHNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyRnJvbVJvb3QgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGVsZW1lbnQ7XG4gICAgJGVsZW1lbnQgPSB0aGlzLnRyZWVfd2lkZ2V0LmVsZW1lbnQ7XG4gICAgJGVsZW1lbnQuZW1wdHkoKTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVEb21FbGVtZW50cygkZWxlbWVudFswXSwgdGhpcy50cmVlX3dpZGdldC50cmVlLmNoaWxkcmVuLCB0cnVlLCB0cnVlLCAxKTtcbiAgfTtcblxuICBFbGVtZW50c1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJGcm9tTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgJHByZXZpb3VzX2xpLCBsaTtcbiAgICAkcHJldmlvdXNfbGkgPSAkKG5vZGUuZWxlbWVudCk7XG4gICAgbGkgPSB0aGlzLmNyZWF0ZUxpKG5vZGUsIG5vZGUuZ2V0TGV2ZWwoKSk7XG4gICAgdGhpcy5hdHRhY2hOb2RlRGF0YShub2RlLCBsaSk7XG4gICAgJHByZXZpb3VzX2xpLmFmdGVyKGxpKTtcbiAgICAkcHJldmlvdXNfbGkucmVtb3ZlKCk7XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURvbUVsZW1lbnRzKGxpLCBub2RlLmNoaWxkcmVuLCBmYWxzZSwgZmFsc2UsIG5vZGUuZ2V0TGV2ZWwoKSArIDEpO1xuICAgIH1cbiAgfTtcblxuICBFbGVtZW50c1JlbmRlcmVyLnByb3RvdHlwZS5jcmVhdGVEb21FbGVtZW50cyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNoaWxkcmVuLCBpc19yb290X25vZGUsIGlzX29wZW4sIGxldmVsKSB7XG4gICAgdmFyIGNoaWxkLCBpLCBsZW4sIGxpLCB1bDtcbiAgICB1bCA9IHRoaXMuY3JlYXRlVWwoaXNfcm9vdF9ub2RlKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHVsKTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIGxpID0gdGhpcy5jcmVhdGVMaShjaGlsZCwgbGV2ZWwpO1xuICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgdGhpcy5hdHRhY2hOb2RlRGF0YShjaGlsZCwgbGkpO1xuICAgICAgaWYgKGNoaWxkLmhhc0NoaWxkcmVuKCkpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVEb21FbGVtZW50cyhsaSwgY2hpbGQuY2hpbGRyZW4sIGZhbHNlLCBjaGlsZC5pc19vcGVuLCBsZXZlbCArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBFbGVtZW50c1JlbmRlcmVyLnByb3RvdHlwZS5hdHRhY2hOb2RlRGF0YSA9IGZ1bmN0aW9uKG5vZGUsIGxpKSB7XG4gICAgbm9kZS5lbGVtZW50ID0gbGk7XG4gICAgcmV0dXJuICQobGkpLmRhdGEoJ25vZGUnLCBub2RlKTtcbiAgfTtcblxuICBFbGVtZW50c1JlbmRlcmVyLnByb3RvdHlwZS5jcmVhdGVVbCA9IGZ1bmN0aW9uKGlzX3Jvb3Rfbm9kZSkge1xuICAgIHZhciBjbGFzc19zdHJpbmcsIHJvbGUsIHVsO1xuICAgIGlmICghaXNfcm9vdF9ub2RlKSB7XG4gICAgICBjbGFzc19zdHJpbmcgPSAnJztcbiAgICAgIHJvbGUgPSAnZ3JvdXAnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbGFzc19zdHJpbmcgPSAnanF0cmVlLXRyZWUnO1xuICAgICAgcm9sZSA9ICd0cmVlJztcbiAgICAgIGlmICh0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMucnRsKSB7XG4gICAgICAgIGNsYXNzX3N0cmluZyArPSAnIGpxdHJlZS1ydGwnO1xuICAgICAgfVxuICAgIH1cbiAgICB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdWwuY2xhc3NOYW1lID0gXCJqcXRyZWVfY29tbW9uIFwiICsgY2xhc3Nfc3RyaW5nO1xuICAgIHVsLnNldEF0dHJpYnV0ZSgncm9sZScsIHJvbGUpO1xuICAgIHJldHVybiB1bDtcbiAgfTtcblxuICBFbGVtZW50c1JlbmRlcmVyLnByb3RvdHlwZS5jcmVhdGVMaSA9IGZ1bmN0aW9uKG5vZGUsIGxldmVsKSB7XG4gICAgdmFyIGlzX3NlbGVjdGVkLCBsaTtcbiAgICBpc19zZWxlY3RlZCA9IHRoaXMudHJlZV93aWRnZXQuc2VsZWN0X25vZGVfaGFuZGxlciAmJiB0aGlzLnRyZWVfd2lkZ2V0LnNlbGVjdF9ub2RlX2hhbmRsZXIuaXNOb2RlU2VsZWN0ZWQobm9kZSk7XG4gICAgaWYgKG5vZGUuaXNGb2xkZXIoKSkge1xuICAgICAgbGkgPSB0aGlzLmNyZWF0ZUZvbGRlckxpKG5vZGUsIGxldmVsLCBpc19zZWxlY3RlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpID0gdGhpcy5jcmVhdGVOb2RlTGkobm9kZSwgbGV2ZWwsIGlzX3NlbGVjdGVkKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5vbkNyZWF0ZUxpKSB7XG4gICAgICB0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMub25DcmVhdGVMaShub2RlLCAkKGxpKSk7XG4gICAgfVxuICAgIHJldHVybiBsaTtcbiAgfTtcblxuICBFbGVtZW50c1JlbmRlcmVyLnByb3RvdHlwZS5jcmVhdGVGb2xkZXJMaSA9IGZ1bmN0aW9uKG5vZGUsIGxldmVsLCBpc19zZWxlY3RlZCkge1xuICAgIHZhciBidXR0b25fY2xhc3NlcywgYnV0dG9uX2xpbmssIGRpdiwgZm9sZGVyX2NsYXNzZXMsIGljb25fZWxlbWVudCwgaXNfZm9sZGVyLCBsaTtcbiAgICBidXR0b25fY2xhc3NlcyA9IHRoaXMuZ2V0QnV0dG9uQ2xhc3Nlcyhub2RlKTtcbiAgICBmb2xkZXJfY2xhc3NlcyA9IHRoaXMuZ2V0Rm9sZGVyQ2xhc3Nlcyhub2RlLCBpc19zZWxlY3RlZCk7XG4gICAgaWYgKG5vZGUuaXNfb3Blbikge1xuICAgICAgaWNvbl9lbGVtZW50ID0gdGhpcy5vcGVuZWRfaWNvbl9lbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBpY29uX2VsZW1lbnQgPSB0aGlzLmNsb3NlZF9pY29uX2VsZW1lbnQ7XG4gICAgfVxuICAgIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBsaS5jbGFzc05hbWUgPSBcImpxdHJlZV9jb21tb24gXCIgKyBmb2xkZXJfY2xhc3NlcztcbiAgICBsaS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG4gICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSA9IFwianF0cmVlLWVsZW1lbnQganF0cmVlX2NvbW1vblwiO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG4gICAgbGkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBidXR0b25fbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBidXR0b25fbGluay5jbGFzc05hbWUgPSBidXR0b25fY2xhc3NlcztcbiAgICBidXR0b25fbGluay5hcHBlbmRDaGlsZChpY29uX2VsZW1lbnQuY2xvbmVOb2RlKGZhbHNlKSk7XG4gICAgYnV0dG9uX2xpbmsuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuICAgIGJ1dHRvbl9saW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGlmICh0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMuYnV0dG9uTGVmdCkge1xuICAgICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbl9saW5rKTtcbiAgICB9XG4gICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlVGl0bGVTcGFuKG5vZGUubmFtZSwgbGV2ZWwsIGlzX3NlbGVjdGVkLCBub2RlLmlzX29wZW4sIGlzX2ZvbGRlciA9IHRydWUpKTtcbiAgICBpZiAoIXRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5idXR0b25MZWZ0KSB7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uX2xpbmspO1xuICAgIH1cbiAgICByZXR1cm4gbGk7XG4gIH07XG5cbiAgRWxlbWVudHNSZW5kZXJlci5wcm90b3R5cGUuY3JlYXRlTm9kZUxpID0gZnVuY3Rpb24obm9kZSwgbGV2ZWwsIGlzX3NlbGVjdGVkKSB7XG4gICAgdmFyIGNsYXNzX3N0cmluZywgZGl2LCBpc19mb2xkZXIsIGxpLCBsaV9jbGFzc2VzO1xuICAgIGxpX2NsYXNzZXMgPSBbJ2pxdHJlZV9jb21tb24nXTtcbiAgICBpZiAoaXNfc2VsZWN0ZWQpIHtcbiAgICAgIGxpX2NsYXNzZXMucHVzaCgnanF0cmVlLXNlbGVjdGVkJyk7XG4gICAgfVxuICAgIGNsYXNzX3N0cmluZyA9IGxpX2NsYXNzZXMuam9pbignICcpO1xuICAgIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBsaS5jbGFzc05hbWUgPSBjbGFzc19zdHJpbmc7XG4gICAgbGkuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBcImpxdHJlZS1lbGVtZW50IGpxdHJlZV9jb21tb25cIjtcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuICAgIGxpLmFwcGVuZENoaWxkKGRpdik7XG4gICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlVGl0bGVTcGFuKG5vZGUubmFtZSwgbGV2ZWwsIGlzX3NlbGVjdGVkLCBub2RlLmlzX29wZW4sIGlzX2ZvbGRlciA9IGZhbHNlKSk7XG4gICAgcmV0dXJuIGxpO1xuICB9O1xuXG4gIEVsZW1lbnRzUmVuZGVyZXIucHJvdG90eXBlLmNyZWF0ZVRpdGxlU3BhbiA9IGZ1bmN0aW9uKG5vZGVfbmFtZSwgbGV2ZWwsIGlzX3NlbGVjdGVkLCBpc19vcGVuLCBpc19mb2xkZXIpIHtcbiAgICB2YXIgY2xhc3NlcywgdGl0bGVfc3BhbjtcbiAgICB0aXRsZV9zcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNsYXNzZXMgPSBcImpxdHJlZS10aXRsZSBqcXRyZWVfY29tbW9uXCI7XG4gICAgaWYgKGlzX2ZvbGRlcikge1xuICAgICAgY2xhc3NlcyArPSBcIiBqcXRyZWUtdGl0bGUtZm9sZGVyXCI7XG4gICAgfVxuICAgIHRpdGxlX3NwYW4uY2xhc3NOYW1lID0gY2xhc3NlcztcbiAgICB0aXRsZV9zcGFuLnNldEF0dHJpYnV0ZSgncm9sZScsICd0cmVlaXRlbScpO1xuICAgIHRpdGxlX3NwYW4uc2V0QXR0cmlidXRlKCdhcmlhLWxldmVsJywgbGV2ZWwpO1xuICAgIHRpdGxlX3NwYW4uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdXRpbC5nZXRCb29sU3RyaW5nKGlzX3NlbGVjdGVkKSk7XG4gICAgdGl0bGVfc3Bhbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB1dGlsLmdldEJvb2xTdHJpbmcoaXNfb3BlbikpO1xuICAgIGlmIChpc19zZWxlY3RlZCkge1xuICAgICAgdGl0bGVfc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgfVxuICAgIHRpdGxlX3NwYW4uaW5uZXJIVE1MID0gdGhpcy5lc2NhcGVJZk5lY2Vzc2FyeShub2RlX25hbWUpO1xuICAgIHJldHVybiB0aXRsZV9zcGFuO1xuICB9O1xuXG4gIEVsZW1lbnRzUmVuZGVyZXIucHJvdG90eXBlLmdldEJ1dHRvbkNsYXNzZXMgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIGNsYXNzZXM7XG4gICAgY2xhc3NlcyA9IFsnanF0cmVlLXRvZ2dsZXInLCAnanF0cmVlX2NvbW1vbiddO1xuICAgIGlmICghbm9kZS5pc19vcGVuKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2pxdHJlZS1jbG9zZWQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5idXR0b25MZWZ0KSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2pxdHJlZS10b2dnbGVyLWxlZnQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdqcXRyZWUtdG9nZ2xlci1yaWdodCcpO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG4gIH07XG5cbiAgRWxlbWVudHNSZW5kZXJlci5wcm90b3R5cGUuZ2V0Rm9sZGVyQ2xhc3NlcyA9IGZ1bmN0aW9uKG5vZGUsIGlzX3NlbGVjdGVkKSB7XG4gICAgdmFyIGNsYXNzZXM7XG4gICAgY2xhc3NlcyA9IFsnanF0cmVlLWZvbGRlciddO1xuICAgIGlmICghbm9kZS5pc19vcGVuKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2pxdHJlZS1jbG9zZWQnKTtcbiAgICB9XG4gICAgaWYgKGlzX3NlbGVjdGVkKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2pxdHJlZS1zZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAobm9kZS5pc19sb2FkaW5nKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2pxdHJlZS1sb2FkaW5nJyk7XG4gICAgfVxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgfTtcblxuICBFbGVtZW50c1JlbmRlcmVyLnByb3RvdHlwZS5lc2NhcGVJZk5lY2Vzc2FyeSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5hdXRvRXNjYXBlKSB7XG4gICAgICByZXR1cm4gaHRtbF9lc2NhcGUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIEVsZW1lbnRzUmVuZGVyZXIucHJvdG90eXBlLmNyZWF0ZUJ1dHRvbkVsZW1lbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBkaXY7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRpdi5pbm5lckhUTUwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJCh2YWx1ZSlbMF07XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBFbGVtZW50c1JlbmRlcmVyO1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnRzUmVuZGVyZXI7XG5cbn0se1wiLi9ub2RlX2VsZW1lbnRcIjo2LFwiLi91dGlsXCI6MTJ9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkLCBLZXlIYW5kbGVyLFxuICBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfTtcblxuJCA9IGpRdWVyeTtcblxuS2V5SGFuZGxlciA9IChmdW5jdGlvbigpIHtcbiAgdmFyIERPV04sIExFRlQsIFJJR0hULCBVUDtcblxuICBMRUZUID0gMzc7XG5cbiAgVVAgPSAzODtcblxuICBSSUdIVCA9IDM5O1xuXG4gIERPV04gPSA0MDtcblxuICBmdW5jdGlvbiBLZXlIYW5kbGVyKHRyZWVfd2lkZ2V0KSB7XG4gICAgdGhpcy5zZWxlY3ROb2RlID0gYmluZCh0aGlzLnNlbGVjdE5vZGUsIHRoaXMpO1xuICAgIHRoaXMudHJlZV93aWRnZXQgPSB0cmVlX3dpZGdldDtcbiAgICBpZiAodHJlZV93aWRnZXQub3B0aW9ucy5rZXlib2FyZFN1cHBvcnQpIHtcbiAgICAgICQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24uanF0cmVlJywgJC5wcm94eSh0aGlzLmhhbmRsZUtleURvd24sIHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBLZXlIYW5kbGVyLnByb3RvdHlwZS5kZWluaXQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJChkb2N1bWVudCkudW5iaW5kKCdrZXlkb3duLmpxdHJlZScpO1xuICB9O1xuXG4gIEtleUhhbmRsZXIucHJvdG90eXBlLm1vdmVEb3duID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5vZGU7XG4gICAgbm9kZSA9IHRoaXMudHJlZV93aWRnZXQuZ2V0U2VsZWN0ZWROb2RlKCk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdE5vZGUobm9kZS5nZXROZXh0Tm9kZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBLZXlIYW5kbGVyLnByb3RvdHlwZS5tb3ZlVXAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbm9kZTtcbiAgICBub2RlID0gdGhpcy50cmVlX3dpZGdldC5nZXRTZWxlY3RlZE5vZGUoKTtcbiAgICBpZiAobm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0Tm9kZShub2RlLmdldFByZXZpb3VzTm9kZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBLZXlIYW5kbGVyLnByb3RvdHlwZS5tb3ZlUmlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbm9kZTtcbiAgICBub2RlID0gdGhpcy50cmVlX3dpZGdldC5nZXRTZWxlY3RlZE5vZGUoKTtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIW5vZGUuaXNGb2xkZXIoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChub2RlLmlzX29wZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0Tm9kZShub2RlLmdldE5leHROb2RlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmVlX3dpZGdldC5vcGVuTm9kZShub2RlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBLZXlIYW5kbGVyLnByb3RvdHlwZS5tb3ZlTGVmdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBub2RlO1xuICAgIG5vZGUgPSB0aGlzLnRyZWVfd2lkZ2V0LmdldFNlbGVjdGVkTm9kZSgpO1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChub2RlLmlzRm9sZGVyKCkgJiYgbm9kZS5pc19vcGVuKSB7XG4gICAgICB0aGlzLnRyZWVfd2lkZ2V0LmNsb3NlTm9kZShub2RlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0Tm9kZShub2RlLmdldFBhcmVudCgpKTtcbiAgICB9XG4gIH07XG5cbiAgS2V5SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIga2V5O1xuICAgIGlmICghdGhpcy50cmVlX3dpZGdldC5vcHRpb25zLmtleWJvYXJkU3VwcG9ydCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICgkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmlzKCd0ZXh0YXJlYSxpbnB1dCxzZWxlY3QnKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghdGhpcy50cmVlX3dpZGdldC5nZXRTZWxlY3RlZE5vZGUoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGtleSA9IGUud2hpY2g7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgRE9XTjpcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZURvd24oKTtcbiAgICAgIGNhc2UgVVA6XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVVcCgpO1xuICAgICAgY2FzZSBSSUdIVDpcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgICBjYXNlIExFRlQ6XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIEtleUhhbmRsZXIucHJvdG90eXBlLnNlbGVjdE5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmVlX3dpZGdldC5zZWxlY3ROb2RlKG5vZGUpO1xuICAgICAgaWYgKHRoaXMudHJlZV93aWRnZXQuc2Nyb2xsX2hhbmRsZXIgJiYgKCF0aGlzLnRyZWVfd2lkZ2V0LnNjcm9sbF9oYW5kbGVyLmlzU2Nyb2xsZWRJbnRvVmlldygkKG5vZGUuZWxlbWVudCkuZmluZCgnLmpxdHJlZS1lbGVtZW50JykpKSkge1xuICAgICAgICB0aGlzLnRyZWVfd2lkZ2V0LnNjcm9sbFRvTm9kZShub2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEtleUhhbmRsZXI7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5SGFuZGxlcjtcblxufSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbi8qXG5UaGlzIHdpZGdldCBkb2VzIHRoZSBzYW1lIGEgdGhlIG1vdXNlIHdpZGdldCBpbiBqcXVlcnl1aS5cbiAqL1xudmFyICQsIE1vdXNlV2lkZ2V0LCBTaW1wbGVXaWRnZXQsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5TaW1wbGVXaWRnZXQgPSByZXF1aXJlKCcuL3NpbXBsZS53aWRnZXQnKTtcblxuJCA9IGpRdWVyeTtcblxuTW91c2VXaWRnZXQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTW91c2VXaWRnZXQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIE1vdXNlV2lkZ2V0KCkge1xuICAgIHJldHVybiBNb3VzZVdpZGdldC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIE1vdXNlV2lkZ2V0LmlzX21vdXNlX2hhbmRsZWQgPSBmYWxzZTtcblxuICBNb3VzZVdpZGdldC5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRlbC5iaW5kKCdtb3VzZWRvd24ubW91c2V3aWRnZXQnLCAkLnByb3h5KHRoaXMuX21vdXNlRG93biwgdGhpcykpO1xuICAgIHRoaXMuJGVsLmJpbmQoJ3RvdWNoc3RhcnQubW91c2V3aWRnZXQnLCAkLnByb3h5KHRoaXMuX3RvdWNoU3RhcnQsIHRoaXMpKTtcbiAgICB0aGlzLmlzX21vdXNlX3N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlX2RlbGF5ID0gMDtcbiAgICB0aGlzLl9tb3VzZV9kZWxheV90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faXNfbW91c2VfZGVsYXlfbWV0ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5tb3VzZV9kb3duX2luZm8gPSBudWxsO1xuICB9O1xuXG4gIE1vdXNlV2lkZ2V0LnByb3RvdHlwZS5fZGVpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRkb2N1bWVudDtcbiAgICB0aGlzLiRlbC51bmJpbmQoJ21vdXNlZG93bi5tb3VzZXdpZGdldCcpO1xuICAgIHRoaXMuJGVsLnVuYmluZCgndG91Y2hzdGFydC5tb3VzZXdpZGdldCcpO1xuICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuICAgICRkb2N1bWVudC51bmJpbmQoJ21vdXNlbW92ZS5tb3VzZXdpZGdldCcpO1xuICAgIHJldHVybiAkZG9jdW1lbnQudW5iaW5kKCdtb3VzZXVwLm1vdXNld2lkZ2V0Jyk7XG4gIH07XG5cbiAgTW91c2VXaWRnZXQucHJvdG90eXBlLl9tb3VzZURvd24gPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAoZS53aGljaCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXN1bHQgPSB0aGlzLl9oYW5kbGVNb3VzZURvd24oZSwgdGhpcy5fZ2V0UG9zaXRpb25JbmZvKGUpKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgTW91c2VXaWRnZXQucHJvdG90eXBlLl9oYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbihlLCBwb3NpdGlvbl9pbmZvKSB7XG4gICAgaWYgKE1vdXNlV2lkZ2V0LmlzX21vdXNlX2hhbmRsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNfbW91c2Vfc3RhcnRlZCkge1xuICAgICAgdGhpcy5faGFuZGxlTW91c2VVcChwb3NpdGlvbl9pbmZvKTtcbiAgICB9XG4gICAgdGhpcy5tb3VzZV9kb3duX2luZm8gPSBwb3NpdGlvbl9pbmZvO1xuICAgIGlmICghdGhpcy5fbW91c2VDYXB0dXJlKHBvc2l0aW9uX2luZm8pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2hhbmRsZVN0YXJ0TW91c2UoKTtcbiAgICB0aGlzLmlzX21vdXNlX2hhbmRsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIE1vdXNlV2lkZ2V0LnByb3RvdHlwZS5faGFuZGxlU3RhcnRNb3VzZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkZG9jdW1lbnQ7XG4gICAgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG4gICAgJGRvY3VtZW50LmJpbmQoJ21vdXNlbW92ZS5tb3VzZXdpZGdldCcsICQucHJveHkodGhpcy5fbW91c2VNb3ZlLCB0aGlzKSk7XG4gICAgJGRvY3VtZW50LmJpbmQoJ3RvdWNobW92ZS5tb3VzZXdpZGdldCcsICQucHJveHkodGhpcy5fdG91Y2hNb3ZlLCB0aGlzKSk7XG4gICAgJGRvY3VtZW50LmJpbmQoJ21vdXNldXAubW91c2V3aWRnZXQnLCAkLnByb3h5KHRoaXMuX21vdXNlVXAsIHRoaXMpKTtcbiAgICAkZG9jdW1lbnQuYmluZCgndG91Y2hlbmQubW91c2V3aWRnZXQnLCAkLnByb3h5KHRoaXMuX3RvdWNoRW5kLCB0aGlzKSk7XG4gICAgaWYgKHRoaXMubW91c2VfZGVsYXkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdGFydE1vdXNlRGVsYXlUaW1lcigpO1xuICAgIH1cbiAgfTtcblxuICBNb3VzZVdpZGdldC5wcm90b3R5cGUuX3N0YXJ0TW91c2VEZWxheVRpbWVyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX21vdXNlX2RlbGF5X3RpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fbW91c2VfZGVsYXlfdGltZXIpO1xuICAgIH1cbiAgICB0aGlzLl9tb3VzZV9kZWxheV90aW1lciA9IHNldFRpbWVvdXQoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5faXNfbW91c2VfZGVsYXlfbWV0ID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkodGhpcyksIHRoaXMubW91c2VfZGVsYXkpO1xuICAgIHJldHVybiB0aGlzLl9pc19tb3VzZV9kZWxheV9tZXQgPSBmYWxzZTtcbiAgfTtcblxuICBNb3VzZVdpZGdldC5wcm90b3R5cGUuX21vdXNlTW92ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlTW91c2VNb3ZlKGUsIHRoaXMuX2dldFBvc2l0aW9uSW5mbyhlKSk7XG4gIH07XG5cbiAgTW91c2VXaWRnZXQucHJvdG90eXBlLl9oYW5kbGVNb3VzZU1vdmUgPSBmdW5jdGlvbihlLCBwb3NpdGlvbl9pbmZvKSB7XG4gICAgaWYgKHRoaXMuaXNfbW91c2Vfc3RhcnRlZCkge1xuICAgICAgdGhpcy5fbW91c2VEcmFnKHBvc2l0aW9uX2luZm8pO1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW91c2VfZGVsYXkgJiYgIXRoaXMuX2lzX21vdXNlX2RlbGF5X21ldCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHRoaXMuaXNfbW91c2Vfc3RhcnRlZCA9IHRoaXMuX21vdXNlU3RhcnQodGhpcy5tb3VzZV9kb3duX2luZm8pICE9PSBmYWxzZTtcbiAgICBpZiAodGhpcy5pc19tb3VzZV9zdGFydGVkKSB7XG4gICAgICB0aGlzLl9tb3VzZURyYWcocG9zaXRpb25faW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhbmRsZU1vdXNlVXAocG9zaXRpb25faW5mbyk7XG4gICAgfVxuICAgIHJldHVybiAhdGhpcy5pc19tb3VzZV9zdGFydGVkO1xuICB9O1xuXG4gIE1vdXNlV2lkZ2V0LnByb3RvdHlwZS5fZ2V0UG9zaXRpb25JbmZvID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlX3g6IGUucGFnZVgsXG4gICAgICBwYWdlX3k6IGUucGFnZVksXG4gICAgICB0YXJnZXQ6IGUudGFyZ2V0LFxuICAgICAgb3JpZ2luYWxfZXZlbnQ6IGVcbiAgICB9O1xuICB9O1xuXG4gIE1vdXNlV2lkZ2V0LnByb3RvdHlwZS5fbW91c2VVcCA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlTW91c2VVcCh0aGlzLl9nZXRQb3NpdGlvbkluZm8oZSkpO1xuICB9O1xuXG4gIE1vdXNlV2lkZ2V0LnByb3RvdHlwZS5faGFuZGxlTW91c2VVcCA9IGZ1bmN0aW9uKHBvc2l0aW9uX2luZm8pIHtcbiAgICB2YXIgJGRvY3VtZW50O1xuICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuICAgICRkb2N1bWVudC51bmJpbmQoJ21vdXNlbW92ZS5tb3VzZXdpZGdldCcpO1xuICAgICRkb2N1bWVudC51bmJpbmQoJ3RvdWNobW92ZS5tb3VzZXdpZGdldCcpO1xuICAgICRkb2N1bWVudC51bmJpbmQoJ21vdXNldXAubW91c2V3aWRnZXQnKTtcbiAgICAkZG9jdW1lbnQudW5iaW5kKCd0b3VjaGVuZC5tb3VzZXdpZGdldCcpO1xuICAgIGlmICh0aGlzLmlzX21vdXNlX3N0YXJ0ZWQpIHtcbiAgICAgIHRoaXMuaXNfbW91c2Vfc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fbW91c2VTdG9wKHBvc2l0aW9uX2luZm8pO1xuICAgIH1cbiAgfTtcblxuICBNb3VzZVdpZGdldC5wcm90b3R5cGUuX21vdXNlQ2FwdHVyZSA9IGZ1bmN0aW9uKHBvc2l0aW9uX2luZm8pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBNb3VzZVdpZGdldC5wcm90b3R5cGUuX21vdXNlU3RhcnQgPSBmdW5jdGlvbihwb3NpdGlvbl9pbmZvKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgTW91c2VXaWRnZXQucHJvdG90eXBlLl9tb3VzZURyYWcgPSBmdW5jdGlvbihwb3NpdGlvbl9pbmZvKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgTW91c2VXaWRnZXQucHJvdG90eXBlLl9tb3VzZVN0b3AgPSBmdW5jdGlvbihwb3NpdGlvbl9pbmZvKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgTW91c2VXaWRnZXQucHJvdG90eXBlLnNldE1vdXNlRGVsYXkgPSBmdW5jdGlvbihtb3VzZV9kZWxheSkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlX2RlbGF5ID0gbW91c2VfZGVsYXk7XG4gIH07XG5cbiAgTW91c2VXaWRnZXQucHJvdG90eXBlLl90b3VjaFN0YXJ0ID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciB0b3VjaDtcbiAgICBpZiAoZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0b3VjaCA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlTW91c2VEb3duKGUsIHRoaXMuX2dldFBvc2l0aW9uSW5mbyh0b3VjaCkpO1xuICB9O1xuXG4gIE1vdXNlV2lkZ2V0LnByb3RvdHlwZS5fdG91Y2hNb3ZlID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciB0b3VjaDtcbiAgICBpZiAoZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0b3VjaCA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlTW91c2VNb3ZlKGUsIHRoaXMuX2dldFBvc2l0aW9uSW5mbyh0b3VjaCkpO1xuICB9O1xuXG4gIE1vdXNlV2lkZ2V0LnByb3RvdHlwZS5fdG91Y2hFbmQgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRvdWNoO1xuICAgIGlmIChlLm9yaWdpbmFsRXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVNb3VzZVVwKHRoaXMuX2dldFBvc2l0aW9uSW5mbyh0b3VjaCkpO1xuICB9O1xuXG4gIHJldHVybiBNb3VzZVdpZGdldDtcblxufSkoU2ltcGxlV2lkZ2V0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb3VzZVdpZGdldDtcblxufSx7XCIuL3NpbXBsZS53aWRnZXRcIjoxMH1dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQsIE5vZGUsIFBvc2l0aW9uO1xuXG4kID0galF1ZXJ5O1xuXG5Qb3NpdGlvbiA9IHtcbiAgZ2V0TmFtZTogZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICByZXR1cm4gUG9zaXRpb24uc3RyaW5nc1twb3NpdGlvbiAtIDFdO1xuICB9LFxuICBuYW1lVG9JbmRleDogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBpLCBqLCByZWY7XG4gICAgZm9yIChpID0gaiA9IDEsIHJlZiA9IFBvc2l0aW9uLnN0cmluZ3MubGVuZ3RoOyAxIDw9IHJlZiA/IGogPD0gcmVmIDogaiA+PSByZWY7IGkgPSAxIDw9IHJlZiA/ICsraiA6IC0taikge1xuICAgICAgaWYgKFBvc2l0aW9uLnN0cmluZ3NbaSAtIDFdID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxufTtcblxuUG9zaXRpb24uQkVGT1JFID0gMTtcblxuUG9zaXRpb24uQUZURVIgPSAyO1xuXG5Qb3NpdGlvbi5JTlNJREUgPSAzO1xuXG5Qb3NpdGlvbi5OT05FID0gNDtcblxuUG9zaXRpb24uc3RyaW5ncyA9IFsnYmVmb3JlJywgJ2FmdGVyJywgJ2luc2lkZScsICdub25lJ107XG5cbk5vZGUgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIE5vZGUobywgaXNfcm9vdCwgbm9kZV9jbGFzcykge1xuICAgIGlmIChpc19yb290ID09IG51bGwpIHtcbiAgICAgIGlzX3Jvb3QgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG5vZGVfY2xhc3MgPT0gbnVsbCkge1xuICAgICAgbm9kZV9jbGFzcyA9IE5vZGU7XG4gICAgfVxuICAgIHRoaXMubmFtZSA9ICcnO1xuICAgIHRoaXMuc2V0RGF0YShvKTtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIGlmIChpc19yb290KSB7XG4gICAgICB0aGlzLmlkX21hcHBpbmcgPSB7fTtcbiAgICAgIHRoaXMudHJlZSA9IHRoaXM7XG4gICAgICB0aGlzLm5vZGVfY2xhc3MgPSBub2RlX2NsYXNzO1xuICAgIH1cbiAgfVxuXG4gIE5vZGUucHJvdG90eXBlLnNldERhdGEgPSBmdW5jdGlvbihvKSB7XG5cbiAgICAvKlxuICAgIFNldCB0aGUgZGF0YSBvZiB0aGlzIG5vZGUuXG4gICAgXG4gICAgc2V0RGF0YShzdHJpbmcpOiBzZXQgdGhlIG5hbWUgb2YgdGhlIG5vZGVcbiAgICBzZXRkYXRhKG9iamVjdCk6IHNldCBhdHRyaWJ1dGVzIG9mIHRoZSBub2RlXG4gICAgXG4gICAgRXhhbXBsZXM6XG4gICAgICAgIHNldGRhdGEoJ25vZGUxJylcbiAgICBcbiAgICAgICAgc2V0RGF0YSh7IG5hbWU6ICdub2RlMScsIGlkOiAxfSk7XG4gICAgXG4gICAgICAgIHNldERhdGEoeyBuYW1lOiAnbm9kZTInLCBpZDogMiwgY29sb3I6ICdncmVlbid9KTtcbiAgICBcbiAgICAqIFRoaXMgaXMgYW4gaW50ZXJuYWwgZnVuY3Rpb247IGl0IGlzIG5vdCBpbiB0aGUgZG9jc1xuICAgICogRG9lcyBub3QgcmVtb3ZlIGV4aXN0aW5nIG5vZGUgdmFsdWVzXG4gICAgICovXG4gICAgdmFyIGtleSwgc2V0TmFtZSwgdmFsdWU7XG4gICAgc2V0TmFtZSA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0Jykge1xuICAgICAgc2V0TmFtZShvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChrZXkgaW4gbykge1xuICAgICAgICB2YWx1ZSA9IG9ba2V5XTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ2xhYmVsJykge1xuICAgICAgICAgIHNldE5hbWUodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSAhPT0gJ2NoaWxkcmVuJykge1xuICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLmluaXRGcm9tRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgYWRkQ2hpbGRyZW4sIGFkZE5vZGU7XG4gICAgYWRkTm9kZSA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5vZGVfZGF0YSkge1xuICAgICAgICBfdGhpcy5zZXREYXRhKG5vZGVfZGF0YSk7XG4gICAgICAgIGlmIChub2RlX2RhdGEuY2hpbGRyZW4pIHtcbiAgICAgICAgICByZXR1cm4gYWRkQ2hpbGRyZW4obm9kZV9kYXRhLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICBhZGRDaGlsZHJlbiA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNoaWxkcmVuX2RhdGEpIHtcbiAgICAgICAgdmFyIGNoaWxkLCBqLCBsZW4sIG5vZGU7XG4gICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IGNoaWxkcmVuX2RhdGEubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICBjaGlsZCA9IGNoaWxkcmVuX2RhdGFbal07XG4gICAgICAgICAgbm9kZSA9IG5ldyBfdGhpcy50cmVlLm5vZGVfY2xhc3MoJycpO1xuICAgICAgICAgIG5vZGUuaW5pdEZyb21EYXRhKGNoaWxkKTtcbiAgICAgICAgICBfdGhpcy5hZGRDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgYWRkTm9kZShkYXRhKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuXG4gIC8qXG4gIENyZWF0ZSB0cmVlIGZyb20gZGF0YS5cbiAgXG4gIFN0cnVjdHVyZSBvZiBkYXRhIGlzOlxuICBbXG4gICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdub2RlMScsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgeyBsYWJlbDogJ2NoaWxkMScgfSxcbiAgICAgICAgICAgICAgeyBsYWJlbDogJ2NoaWxkMicgfVxuICAgICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdub2RlMidcbiAgICAgIH1cbiAgXVxuICAgKi9cblxuICBOb2RlLnByb3RvdHlwZS5sb2FkRnJvbURhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIGosIGxlbiwgbm9kZSwgbztcbiAgICB0aGlzLnJlbW92ZUNoaWxkcmVuKCk7XG4gICAgZm9yIChqID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgbyA9IGRhdGFbal07XG4gICAgICBub2RlID0gbmV3IHRoaXMudHJlZS5ub2RlX2NsYXNzKG8pO1xuICAgICAgdGhpcy5hZGRDaGlsZChub2RlKTtcbiAgICAgIGlmICh0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgby5jaGlsZHJlbikge1xuICAgICAgICBub2RlLmxvYWRGcm9tRGF0YShvLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cblxuICAvKlxuICBBZGQgY2hpbGQuXG4gIFxuICB0cmVlLmFkZENoaWxkKFxuICAgICAgbmV3IE5vZGUoJ2NoaWxkMScpXG4gICk7XG4gICAqL1xuXG4gIE5vZGUucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHRoaXMuY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICByZXR1cm4gbm9kZS5fc2V0UGFyZW50KHRoaXMpO1xuICB9O1xuXG5cbiAgLypcbiAgQWRkIGNoaWxkIGF0IHBvc2l0aW9uLiBJbmRleCBzdGFydHMgYXQgMC5cbiAgXG4gIHRyZWUuYWRkQ2hpbGRBdFBvc2l0aW9uKFxuICAgICAgbmV3IE5vZGUoJ2FiYycpLFxuICAgICAgMVxuICApO1xuICAgKi9cblxuICBOb2RlLnByb3RvdHlwZS5hZGRDaGlsZEF0UG9zaXRpb24gPSBmdW5jdGlvbihub2RlLCBpbmRleCkge1xuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBub2RlKTtcbiAgICByZXR1cm4gbm9kZS5fc2V0UGFyZW50KHRoaXMpO1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLl9zZXRQYXJlbnQgPSBmdW5jdGlvbihwYXJlbnQpIHtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLnRyZWUgPSBwYXJlbnQudHJlZTtcbiAgICByZXR1cm4gdGhpcy50cmVlLmFkZE5vZGVUb0luZGV4KHRoaXMpO1xuICB9O1xuXG5cbiAgLypcbiAgUmVtb3ZlIGNoaWxkLiBUaGlzIGFsc28gcmVtb3ZlcyB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUuXG4gIFxuICB0cmVlLnJlbW92ZUNoaWxkKHRyZWUuY2hpbGRyZW5bMF0pO1xuICAgKi9cblxuICBOb2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkcmVuKCk7XG4gICAgcmV0dXJuIHRoaXMuX3JlbW92ZUNoaWxkKG5vZGUpO1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLl9yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSh0aGlzLmdldENoaWxkSW5kZXgobm9kZSksIDEpO1xuICAgIHJldHVybiB0aGlzLnRyZWUucmVtb3ZlTm9kZUZyb21JbmRleChub2RlKTtcbiAgfTtcblxuXG4gIC8qXG4gIEdldCBjaGlsZCBpbmRleC5cbiAgXG4gIHZhciBpbmRleCA9IGdldENoaWxkSW5kZXgobm9kZSk7XG4gICAqL1xuXG4gIE5vZGUucHJvdG90eXBlLmdldENoaWxkSW5kZXggPSBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuICQuaW5BcnJheShub2RlLCB0aGlzLmNoaWxkcmVuKTtcbiAgfTtcblxuXG4gIC8qXG4gIERvZXMgdGhlIHRyZWUgaGF2ZSBjaGlsZHJlbj9cbiAgXG4gIGlmICh0cmVlLmhhc0NoaWxkcmVuKCkpIHtcbiAgICAgIC8vXG4gIH1cbiAgICovXG5cbiAgTm9kZS5wcm90b3R5cGUuaGFzQ2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGggIT09IDA7XG4gIH07XG5cbiAgTm9kZS5wcm90b3R5cGUuaXNGb2xkZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNDaGlsZHJlbigpIHx8IHRoaXMubG9hZF9vbl9kZW1hbmQ7XG4gIH07XG5cblxuICAvKlxuICBJdGVyYXRlIG92ZXIgYWxsIHRoZSBub2RlcyBpbiB0aGUgdHJlZS5cbiAgXG4gIENhbGxzIGNhbGxiYWNrIHdpdGggKG5vZGUsIGxldmVsKS5cbiAgXG4gIFRoZSBjYWxsYmFjayBtdXN0IHJldHVybiB0cnVlIHRvIGNvbnRpbnVlIHRoZSBpdGVyYXRpb24gb24gY3VycmVudCBub2RlLlxuICBcbiAgdHJlZS5pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24obm9kZSwgbGV2ZWwpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKG5vZGUubmFtZSk7XG4gIFxuICAgICAgICAgLy8gc3RvcCBpdGVyYXRpb24gYWZ0ZXIgbGV2ZWwgMlxuICAgICAgICAgcmV0dXJuIChsZXZlbCA8PSAyKTtcbiAgICAgIH1cbiAgKTtcbiAgICovXG5cbiAgTm9kZS5wcm90b3R5cGUuaXRlcmF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdmFyIF9pdGVyYXRlO1xuICAgIF9pdGVyYXRlID0gZnVuY3Rpb24obm9kZSwgbGV2ZWwpIHtcbiAgICAgIHZhciBjaGlsZCwgaiwgbGVuLCByZWYsIHJlc3VsdDtcbiAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHJlZiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgIGNoaWxkID0gcmVmW2pdO1xuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGNoaWxkLCBsZXZlbCk7XG4gICAgICAgICAgaWYgKHJlc3VsdCAmJiBjaGlsZC5oYXNDaGlsZHJlbigpKSB7XG4gICAgICAgICAgICBfaXRlcmF0ZShjaGlsZCwgbGV2ZWwgKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgICBfaXRlcmF0ZSh0aGlzLCAwKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuXG4gIC8qXG4gIE1vdmUgbm9kZSByZWxhdGl2ZSB0byBhbm90aGVyIG5vZGUuXG4gIFxuICBBcmd1bWVudCBwb3NpdGlvbjogUG9zaXRpb24uQkVGT1JFLCBQb3NpdGlvbi5BRlRFUiBvciBQb3NpdGlvbi5JbnNpZGVcbiAgXG4gIC8vIG1vdmUgbm9kZTEgYWZ0ZXIgbm9kZTJcbiAgdHJlZS5tb3ZlTm9kZShub2RlMSwgbm9kZTIsIFBvc2l0aW9uLkFGVEVSKTtcbiAgICovXG5cbiAgTm9kZS5wcm90b3R5cGUubW92ZU5vZGUgPSBmdW5jdGlvbihtb3ZlZF9ub2RlLCB0YXJnZXRfbm9kZSwgcG9zaXRpb24pIHtcbiAgICBpZiAobW92ZWRfbm9kZS5pc1BhcmVudE9mKHRhcmdldF9ub2RlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtb3ZlZF9ub2RlLnBhcmVudC5fcmVtb3ZlQ2hpbGQobW92ZWRfbm9kZSk7XG4gICAgaWYgKHBvc2l0aW9uID09PSBQb3NpdGlvbi5BRlRFUikge1xuICAgICAgcmV0dXJuIHRhcmdldF9ub2RlLnBhcmVudC5hZGRDaGlsZEF0UG9zaXRpb24obW92ZWRfbm9kZSwgdGFyZ2V0X25vZGUucGFyZW50LmdldENoaWxkSW5kZXgodGFyZ2V0X25vZGUpICsgMSk7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gUG9zaXRpb24uQkVGT1JFKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0X25vZGUucGFyZW50LmFkZENoaWxkQXRQb3NpdGlvbihtb3ZlZF9ub2RlLCB0YXJnZXRfbm9kZS5wYXJlbnQuZ2V0Q2hpbGRJbmRleCh0YXJnZXRfbm9kZSkpO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09IFBvc2l0aW9uLklOU0lERSkge1xuICAgICAgcmV0dXJuIHRhcmdldF9ub2RlLmFkZENoaWxkQXRQb3NpdGlvbihtb3ZlZF9ub2RlLCAwKTtcbiAgICB9XG4gIH07XG5cblxuICAvKlxuICBHZXQgdGhlIHRyZWUgYXMgZGF0YS5cbiAgICovXG5cbiAgTm9kZS5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uKGluY2x1ZGVfcGFyZW50KSB7XG4gICAgdmFyIGdldERhdGFGcm9tTm9kZXM7XG4gICAgaWYgKGluY2x1ZGVfcGFyZW50ID09IG51bGwpIHtcbiAgICAgIGluY2x1ZGVfcGFyZW50ID0gZmFsc2U7XG4gICAgfVxuICAgIGdldERhdGFGcm9tTm9kZXMgPSBmdW5jdGlvbihub2Rlcykge1xuICAgICAgdmFyIGRhdGEsIGosIGssIGxlbiwgbm9kZSwgdG1wX25vZGUsIHY7XG4gICAgICBkYXRhID0gW107XG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSBub2Rlcy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBub2RlID0gbm9kZXNbal07XG4gICAgICAgIHRtcF9ub2RlID0ge307XG4gICAgICAgIGZvciAoayBpbiBub2RlKSB7XG4gICAgICAgICAgdiA9IG5vZGVba107XG4gICAgICAgICAgaWYgKChrICE9PSAncGFyZW50JyAmJiBrICE9PSAnY2hpbGRyZW4nICYmIGsgIT09ICdlbGVtZW50JyAmJiBrICE9PSAndHJlZScpICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLCBrKSkge1xuICAgICAgICAgICAgdG1wX25vZGVba10gPSB2O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5oYXNDaGlsZHJlbigpKSB7XG4gICAgICAgICAgdG1wX25vZGUuY2hpbGRyZW4gPSBnZXREYXRhRnJvbU5vZGVzKG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEucHVzaCh0bXBfbm9kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIGlmIChpbmNsdWRlX3BhcmVudCkge1xuICAgICAgcmV0dXJuIGdldERhdGFGcm9tTm9kZXMoW3RoaXNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldERhdGFGcm9tTm9kZXModGhpcy5jaGlsZHJlbik7XG4gICAgfVxuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLmdldE5vZGVCeU5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUJ5Q2FsbGJhY2soZnVuY3Rpb24obm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUubmFtZSA9PT0gbmFtZTtcbiAgICB9KTtcbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5nZXROb2RlQnlDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICByZXN1bHQgPSBudWxsO1xuICAgIHRoaXMuaXRlcmF0ZShmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAoY2FsbGJhY2sobm9kZSkpIHtcbiAgICAgICAgcmVzdWx0ID0gbm9kZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5hZGRBZnRlciA9IGZ1bmN0aW9uKG5vZGVfaW5mbykge1xuICAgIHZhciBjaGlsZF9pbmRleCwgbm9kZTtcbiAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IG5ldyB0aGlzLnRyZWUubm9kZV9jbGFzcyhub2RlX2luZm8pO1xuICAgICAgY2hpbGRfaW5kZXggPSB0aGlzLnBhcmVudC5nZXRDaGlsZEluZGV4KHRoaXMpO1xuICAgICAgdGhpcy5wYXJlbnQuYWRkQ2hpbGRBdFBvc2l0aW9uKG5vZGUsIGNoaWxkX2luZGV4ICsgMSk7XG4gICAgICBpZiAodHlwZW9mIG5vZGVfaW5mbyA9PT0gJ29iamVjdCcgJiYgbm9kZV9pbmZvLmNoaWxkcmVuICYmIG5vZGVfaW5mby5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgbm9kZS5sb2FkRnJvbURhdGEobm9kZV9pbmZvLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5hZGRCZWZvcmUgPSBmdW5jdGlvbihub2RlX2luZm8pIHtcbiAgICB2YXIgY2hpbGRfaW5kZXgsIG5vZGU7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBuZXcgdGhpcy50cmVlLm5vZGVfY2xhc3Mobm9kZV9pbmZvKTtcbiAgICAgIGNoaWxkX2luZGV4ID0gdGhpcy5wYXJlbnQuZ2V0Q2hpbGRJbmRleCh0aGlzKTtcbiAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkQXRQb3NpdGlvbihub2RlLCBjaGlsZF9pbmRleCk7XG4gICAgICBpZiAodHlwZW9mIG5vZGVfaW5mbyA9PT0gJ29iamVjdCcgJiYgbm9kZV9pbmZvLmNoaWxkcmVuICYmIG5vZGVfaW5mby5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgbm9kZS5sb2FkRnJvbURhdGEobm9kZV9pbmZvLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5hZGRQYXJlbnQgPSBmdW5jdGlvbihub2RlX2luZm8pIHtcbiAgICB2YXIgY2hpbGQsIGosIGxlbiwgbmV3X3BhcmVudCwgb3JpZ2luYWxfcGFyZW50LCByZWY7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld19wYXJlbnQgPSBuZXcgdGhpcy50cmVlLm5vZGVfY2xhc3Mobm9kZV9pbmZvKTtcbiAgICAgIG5ld19wYXJlbnQuX3NldFBhcmVudCh0aGlzLnRyZWUpO1xuICAgICAgb3JpZ2luYWxfcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICByZWYgPSBvcmlnaW5hbF9wYXJlbnQuY2hpbGRyZW47XG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgY2hpbGQgPSByZWZbal07XG4gICAgICAgIG5ld19wYXJlbnQuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgfVxuICAgICAgb3JpZ2luYWxfcGFyZW50LmNoaWxkcmVuID0gW107XG4gICAgICBvcmlnaW5hbF9wYXJlbnQuYWRkQ2hpbGQobmV3X3BhcmVudCk7XG4gICAgICByZXR1cm4gbmV3X3BhcmVudDtcbiAgICB9XG4gIH07XG5cbiAgTm9kZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5vZGVfaW5mbykge1xuICAgIHZhciBub2RlO1xuICAgIG5vZGUgPSBuZXcgdGhpcy50cmVlLm5vZGVfY2xhc3Mobm9kZV9pbmZvKTtcbiAgICB0aGlzLmFkZENoaWxkKG5vZGUpO1xuICAgIGlmICh0eXBlb2Ygbm9kZV9pbmZvID09PSAnb2JqZWN0JyAmJiBub2RlX2luZm8uY2hpbGRyZW4gJiYgbm9kZV9pbmZvLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgbm9kZS5sb2FkRnJvbURhdGEobm9kZV9pbmZvLmNoaWxkcmVuKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgTm9kZS5wcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uKG5vZGVfaW5mbykge1xuICAgIHZhciBub2RlO1xuICAgIG5vZGUgPSBuZXcgdGhpcy50cmVlLm5vZGVfY2xhc3Mobm9kZV9pbmZvKTtcbiAgICB0aGlzLmFkZENoaWxkQXRQb3NpdGlvbihub2RlLCAwKTtcbiAgICBpZiAodHlwZW9mIG5vZGVfaW5mbyA9PT0gJ29iamVjdCcgJiYgbm9kZV9pbmZvLmNoaWxkcmVuICYmIG5vZGVfaW5mby5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIG5vZGUubG9hZEZyb21EYXRhKG5vZGVfaW5mby5jaGlsZHJlbik7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLmlzUGFyZW50T2YgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIHBhcmVudDtcbiAgICBwYXJlbnQgPSBub2RlLnBhcmVudDtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICBpZiAocGFyZW50ID09PSB0aGlzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLmdldExldmVsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxldmVsLCBub2RlO1xuICAgIGxldmVsID0gMDtcbiAgICBub2RlID0gdGhpcztcbiAgICB3aGlsZSAobm9kZS5wYXJlbnQpIHtcbiAgICAgIGxldmVsICs9IDE7XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBsZXZlbDtcbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5nZXROb2RlQnlJZCA9IGZ1bmN0aW9uKG5vZGVfaWQpIHtcbiAgICByZXR1cm4gdGhpcy5pZF9tYXBwaW5nW25vZGVfaWRdO1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLmFkZE5vZGVUb0luZGV4ID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLmlkICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmlkX21hcHBpbmdbbm9kZS5pZF0gPSBub2RlO1xuICAgIH1cbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5yZW1vdmVOb2RlRnJvbUluZGV4ID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLmlkICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBkZWxldGUgdGhpcy5pZF9tYXBwaW5nW25vZGUuaWRdO1xuICAgIH1cbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaXRlcmF0ZSgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICBfdGhpcy50cmVlLnJlbW92ZU5vZGVGcm9tSW5kZXgoY2hpbGQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuID0gW107XG4gIH07XG5cbiAgTm9kZS5wcm90b3R5cGUuZ2V0UHJldmlvdXNTaWJsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHByZXZpb3VzX2luZGV4O1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c19pbmRleCA9IHRoaXMucGFyZW50LmdldENoaWxkSW5kZXgodGhpcykgLSAxO1xuICAgICAgaWYgKHByZXZpb3VzX2luZGV4ID49IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmNoaWxkcmVuW3ByZXZpb3VzX2luZGV4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5nZXROZXh0U2libGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXh0X2luZGV4O1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0X2luZGV4ID0gdGhpcy5wYXJlbnQuZ2V0Q2hpbGRJbmRleCh0aGlzKSArIDE7XG4gICAgICBpZiAobmV4dF9pbmRleCA8IHRoaXMucGFyZW50LmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuY2hpbGRyZW5bbmV4dF9pbmRleF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgTm9kZS5wcm90b3R5cGUuZ2V0Tm9kZXNCeVByb3BlcnR5ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbihub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZVtrZXldID09PSB2YWx1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbihmKSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICByZXN1bHQgPSBbXTtcbiAgICB0aGlzLml0ZXJhdGUoZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKGYobm9kZSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLmdldE5leHROb2RlID0gZnVuY3Rpb24oaW5jbHVkZV9jaGlsZHJlbikge1xuICAgIHZhciBuZXh0X3NpYmxpbmc7XG4gICAgaWYgKGluY2x1ZGVfY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgICAgaW5jbHVkZV9jaGlsZHJlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpbmNsdWRlX2NoaWxkcmVuICYmIHRoaXMuaGFzQ2hpbGRyZW4oKSAmJiB0aGlzLmlzX29wZW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dF9zaWJsaW5nID0gdGhpcy5nZXROZXh0U2libGluZygpO1xuICAgICAgICBpZiAobmV4dF9zaWJsaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHRfc2libGluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0TmV4dE5vZGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLmdldFByZXZpb3VzTm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwcmV2aW91c19zaWJsaW5nO1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c19zaWJsaW5nID0gdGhpcy5nZXRQcmV2aW91c1NpYmxpbmcoKTtcbiAgICAgIGlmIChwcmV2aW91c19zaWJsaW5nKSB7XG4gICAgICAgIGlmICghcHJldmlvdXNfc2libGluZy5oYXNDaGlsZHJlbigpIHx8ICFwcmV2aW91c19zaWJsaW5nLmlzX29wZW4pIHtcbiAgICAgICAgICByZXR1cm4gcHJldmlvdXNfc2libGluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcHJldmlvdXNfc2libGluZy5nZXRMYXN0Q2hpbGQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLmdldFBhcmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMucGFyZW50LnBhcmVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9XG4gIH07XG5cbiAgTm9kZS5wcm90b3R5cGUuZ2V0TGFzdENoaWxkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxhc3RfY2hpbGQ7XG4gICAgaWYgKCF0aGlzLmhhc0NoaWxkcmVuKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0X2NoaWxkID0gdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKCFsYXN0X2NoaWxkLmhhc0NoaWxkcmVuKCkgfHwgIWxhc3RfY2hpbGQuaXNfb3Blbikge1xuICAgICAgICByZXR1cm4gbGFzdF9jaGlsZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsYXN0X2NoaWxkLmdldExhc3RDaGlsZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gTm9kZTtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE5vZGU6IE5vZGUsXG4gIFBvc2l0aW9uOiBQb3NpdGlvblxufTtcblxufSx7fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgJCwgQm9yZGVyRHJvcEhpbnQsIEZvbGRlckVsZW1lbnQsIEdob3N0RHJvcEhpbnQsIE5vZGVFbGVtZW50LCBQb3NpdGlvbiwgbm9kZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcblxuUG9zaXRpb24gPSBub2RlLlBvc2l0aW9uO1xuXG4kID0galF1ZXJ5O1xuXG5Ob2RlRWxlbWVudCA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gTm9kZUVsZW1lbnQobm9kZSwgdHJlZV93aWRnZXQpIHtcbiAgICB0aGlzLmluaXQobm9kZSwgdHJlZV93aWRnZXQpO1xuICB9XG5cbiAgTm9kZUVsZW1lbnQucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihub2RlLCB0cmVlX3dpZGdldCkge1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgdGhpcy50cmVlX3dpZGdldCA9IHRyZWVfd2lkZ2V0O1xuICAgIGlmICghbm9kZS5lbGVtZW50KSB7XG4gICAgICBub2RlLmVsZW1lbnQgPSB0aGlzLnRyZWVfd2lkZ2V0LmVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLiRlbGVtZW50ID0gJChub2RlLmVsZW1lbnQpO1xuICB9O1xuXG4gIE5vZGVFbGVtZW50LnByb3RvdHlwZS5nZXRVbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLiRlbGVtZW50LmNoaWxkcmVuKCd1bDpmaXJzdCcpO1xuICB9O1xuXG4gIE5vZGVFbGVtZW50LnByb3RvdHlwZS5nZXRTcGFuID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oJy5qcXRyZWUtZWxlbWVudCcpLmZpbmQoJ3NwYW4uanF0cmVlLXRpdGxlJyk7XG4gIH07XG5cbiAgTm9kZUVsZW1lbnQucHJvdG90eXBlLmdldExpID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQ7XG4gIH07XG5cbiAgTm9kZUVsZW1lbnQucHJvdG90eXBlLmFkZERyb3BIaW50ID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICBpZiAocG9zaXRpb24gPT09IFBvc2l0aW9uLklOU0lERSkge1xuICAgICAgcmV0dXJuIG5ldyBCb3JkZXJEcm9wSGludCh0aGlzLiRlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBHaG9zdERyb3BIaW50KHRoaXMubm9kZSwgdGhpcy4kZWxlbWVudCwgcG9zaXRpb24pO1xuICAgIH1cbiAgfTtcblxuICBOb2RlRWxlbWVudC5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRsaSwgJHNwYW47XG4gICAgJGxpID0gdGhpcy5nZXRMaSgpO1xuICAgICRsaS5hZGRDbGFzcygnanF0cmVlLXNlbGVjdGVkJyk7XG4gICAgJGxpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICRzcGFuID0gdGhpcy5nZXRTcGFuKCk7XG4gICAgcmV0dXJuICRzcGFuLmF0dHIoJ3RhYmluZGV4JywgMCk7XG4gIH07XG5cbiAgTm9kZUVsZW1lbnQucHJvdG90eXBlLmRlc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRsaSwgJHNwYW47XG4gICAgJGxpID0gdGhpcy5nZXRMaSgpO1xuICAgICRsaS5yZW1vdmVDbGFzcygnanF0cmVlLXNlbGVjdGVkJyk7XG4gICAgJGxpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbiAgICAkc3BhbiA9IHRoaXMuZ2V0U3BhbigpO1xuICAgIHJldHVybiAkc3Bhbi5hdHRyKCd0YWJpbmRleCcsIC0xKTtcbiAgfTtcblxuICByZXR1cm4gTm9kZUVsZW1lbnQ7XG5cbn0pKCk7XG5cbkZvbGRlckVsZW1lbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRm9sZGVyRWxlbWVudCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRm9sZGVyRWxlbWVudCgpIHtcbiAgICByZXR1cm4gRm9sZGVyRWxlbWVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEZvbGRlckVsZW1lbnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbihvbl9maW5pc2hlZCwgc2xpZGUpIHtcbiAgICB2YXIgJGJ1dHRvbiwgZG9PcGVuO1xuICAgIGlmIChzbGlkZSA9PSBudWxsKSB7XG4gICAgICBzbGlkZSA9IHRydWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5ub2RlLmlzX29wZW4pIHtcbiAgICAgIHRoaXMubm9kZS5pc19vcGVuID0gdHJ1ZTtcbiAgICAgICRidXR0b24gPSB0aGlzLmdldEJ1dHRvbigpO1xuICAgICAgJGJ1dHRvbi5yZW1vdmVDbGFzcygnanF0cmVlLWNsb3NlZCcpO1xuICAgICAgJGJ1dHRvbi5odG1sKCcnKTtcbiAgICAgICRidXR0b24uYXBwZW5kKHRoaXMudHJlZV93aWRnZXQucmVuZGVyZXIub3BlbmVkX2ljb25fZWxlbWVudC5jbG9uZU5vZGUoZmFsc2UpKTtcbiAgICAgIGRvT3BlbiA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyICRsaSwgJHNwYW47XG4gICAgICAgICAgJGxpID0gX3RoaXMuZ2V0TGkoKTtcbiAgICAgICAgICAkbGkucmVtb3ZlQ2xhc3MoJ2pxdHJlZS1jbG9zZWQnKTtcbiAgICAgICAgICAkc3BhbiA9IF90aGlzLmdldFNwYW4oKTtcbiAgICAgICAgICAkc3Bhbi5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgICBpZiAob25fZmluaXNoZWQpIHtcbiAgICAgICAgICAgIG9uX2ZpbmlzaGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBfdGhpcy50cmVlX3dpZGdldC5fdHJpZ2dlckV2ZW50KCd0cmVlLm9wZW4nLCB7XG4gICAgICAgICAgICBub2RlOiBfdGhpcy5ub2RlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIGlmIChzbGlkZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVbCgpLnNsaWRlRG93bignZmFzdCcsIGRvT3Blbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdldFVsKCkuc2hvdygpO1xuICAgICAgICByZXR1cm4gZG9PcGVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIEZvbGRlckVsZW1lbnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oc2xpZGUpIHtcbiAgICB2YXIgJGJ1dHRvbiwgZG9DbG9zZTtcbiAgICBpZiAoc2xpZGUgPT0gbnVsbCkge1xuICAgICAgc2xpZGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5ub2RlLmlzX29wZW4pIHtcbiAgICAgIHRoaXMubm9kZS5pc19vcGVuID0gZmFsc2U7XG4gICAgICAkYnV0dG9uID0gdGhpcy5nZXRCdXR0b24oKTtcbiAgICAgICRidXR0b24uYWRkQ2xhc3MoJ2pxdHJlZS1jbG9zZWQnKTtcbiAgICAgICRidXR0b24uaHRtbCgnJyk7XG4gICAgICAkYnV0dG9uLmFwcGVuZCh0aGlzLnRyZWVfd2lkZ2V0LnJlbmRlcmVyLmNsb3NlZF9pY29uX2VsZW1lbnQuY2xvbmVOb2RlKGZhbHNlKSk7XG4gICAgICBkb0Nsb3NlID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJGxpLCAkc3BhbjtcbiAgICAgICAgICAkbGkgPSBfdGhpcy5nZXRMaSgpO1xuICAgICAgICAgICRsaS5hZGRDbGFzcygnanF0cmVlLWNsb3NlZCcpO1xuICAgICAgICAgICRzcGFuID0gX3RoaXMuZ2V0U3BhbigpO1xuICAgICAgICAgICRzcGFuLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgICByZXR1cm4gX3RoaXMudHJlZV93aWRnZXQuX3RyaWdnZXJFdmVudCgndHJlZS5jbG9zZScsIHtcbiAgICAgICAgICAgIG5vZGU6IF90aGlzLm5vZGVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVsKCkuc2xpZGVVcCgnZmFzdCcsIGRvQ2xvc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5nZXRVbCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGRvQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgRm9sZGVyRWxlbWVudC5wcm90b3R5cGUuZ2V0QnV0dG9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oJy5qcXRyZWUtZWxlbWVudCcpLmZpbmQoJ2EuanF0cmVlLXRvZ2dsZXInKTtcbiAgfTtcblxuICBGb2xkZXJFbGVtZW50LnByb3RvdHlwZS5hZGREcm9wSGludCA9IGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgaWYgKCF0aGlzLm5vZGUuaXNfb3BlbiAmJiBwb3NpdGlvbiA9PT0gUG9zaXRpb24uSU5TSURFKSB7XG4gICAgICByZXR1cm4gbmV3IEJvcmRlckRyb3BIaW50KHRoaXMuJGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IEdob3N0RHJvcEhpbnQodGhpcy5ub2RlLCB0aGlzLiRlbGVtZW50LCBwb3NpdGlvbik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBGb2xkZXJFbGVtZW50O1xuXG59KShOb2RlRWxlbWVudCk7XG5cbkJvcmRlckRyb3BIaW50ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBCb3JkZXJEcm9wSGludCgkZWxlbWVudCkge1xuICAgIHZhciAkZGl2LCB3aWR0aDtcbiAgICAkZGl2ID0gJGVsZW1lbnQuY2hpbGRyZW4oJy5qcXRyZWUtZWxlbWVudCcpO1xuICAgIHdpZHRoID0gJGVsZW1lbnQud2lkdGgoKSAtIDQ7XG4gICAgdGhpcy4kaGludCA9ICQoJzxzcGFuIGNsYXNzPVwianF0cmVlLWJvcmRlclwiPjwvc3Bhbj4nKTtcbiAgICAkZGl2LmFwcGVuZCh0aGlzLiRoaW50KTtcbiAgICB0aGlzLiRoaW50LmNzcyh7XG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBoZWlnaHQ6ICRkaXYub3V0ZXJIZWlnaHQoKSAtIDRcbiAgICB9KTtcbiAgfVxuXG4gIEJvcmRlckRyb3BIaW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy4kaGludC5yZW1vdmUoKTtcbiAgfTtcblxuICByZXR1cm4gQm9yZGVyRHJvcEhpbnQ7XG5cbn0pKCk7XG5cbkdob3N0RHJvcEhpbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEdob3N0RHJvcEhpbnQobm9kZSwgJGVsZW1lbnQsIHBvc2l0aW9uKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgdGhpcy4kZ2hvc3QgPSAkKCc8bGkgY2xhc3M9XCJqcXRyZWVfY29tbW9uIGpxdHJlZS1naG9zdFwiPjxzcGFuIGNsYXNzPVwianF0cmVlX2NvbW1vbiBqcXRyZWUtY2lyY2xlXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwianF0cmVlX2NvbW1vbiBqcXRyZWUtbGluZVwiPjwvc3Bhbj48L2xpPicpO1xuICAgIGlmIChwb3NpdGlvbiA9PT0gUG9zaXRpb24uQUZURVIpIHtcbiAgICAgIHRoaXMubW92ZUFmdGVyKCk7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gUG9zaXRpb24uQkVGT1JFKSB7XG4gICAgICB0aGlzLm1vdmVCZWZvcmUoKTtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSBQb3NpdGlvbi5JTlNJREUpIHtcbiAgICAgIGlmIChub2RlLmlzRm9sZGVyKCkgJiYgbm9kZS5pc19vcGVuKSB7XG4gICAgICAgIHRoaXMubW92ZUluc2lkZU9wZW5Gb2xkZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubW92ZUluc2lkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEdob3N0RHJvcEhpbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLiRnaG9zdC5yZW1vdmUoKTtcbiAgfTtcblxuICBHaG9zdERyb3BIaW50LnByb3RvdHlwZS5tb3ZlQWZ0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5hZnRlcih0aGlzLiRnaG9zdCk7XG4gIH07XG5cbiAgR2hvc3REcm9wSGludC5wcm90b3R5cGUubW92ZUJlZm9yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLiRlbGVtZW50LmJlZm9yZSh0aGlzLiRnaG9zdCk7XG4gIH07XG5cbiAgR2hvc3REcm9wSGludC5wcm90b3R5cGUubW92ZUluc2lkZU9wZW5Gb2xkZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJCh0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZWxlbWVudCkuYmVmb3JlKHRoaXMuJGdob3N0KTtcbiAgfTtcblxuICBHaG9zdERyb3BIaW50LnByb3RvdHlwZS5tb3ZlSW5zaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kZWxlbWVudC5hZnRlcih0aGlzLiRnaG9zdCk7XG4gICAgcmV0dXJuIHRoaXMuJGdob3N0LmFkZENsYXNzKCdqcXRyZWUtaW5zaWRlJyk7XG4gIH07XG5cbiAgcmV0dXJuIEdob3N0RHJvcEhpbnQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBCb3JkZXJEcm9wSGludDogQm9yZGVyRHJvcEhpbnQsXG4gIEZvbGRlckVsZW1lbnQ6IEZvbGRlckVsZW1lbnQsXG4gIEdob3N0RHJvcEhpbnQ6IEdob3N0RHJvcEhpbnQsXG4gIE5vZGVFbGVtZW50OiBOb2RlRWxlbWVudFxufTtcblxufSx7XCIuL25vZGVcIjo1fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgJCwgU2F2ZVN0YXRlSGFuZGxlciwgaW5kZXhPZiwgaXNJbnQsIHV0aWw7XG5cbnV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuaW5kZXhPZiA9IHV0aWwuaW5kZXhPZjtcblxuaXNJbnQgPSB1dGlsLmlzSW50O1xuXG4kID0galF1ZXJ5O1xuXG5TYXZlU3RhdGVIYW5kbGVyID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBTYXZlU3RhdGVIYW5kbGVyKHRyZWVfd2lkZ2V0KSB7XG4gICAgdGhpcy50cmVlX3dpZGdldCA9IHRyZWVfd2lkZ2V0O1xuICB9XG5cbiAgU2F2ZVN0YXRlSGFuZGxlci5wcm90b3R5cGUuc2F2ZVN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIHN0YXRlID0gSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRTdGF0ZSgpKTtcbiAgICBpZiAodGhpcy50cmVlX3dpZGdldC5vcHRpb25zLm9uU2V0U3RhdGVGcm9tU3RvcmFnZSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5vblNldFN0YXRlRnJvbVN0b3JhZ2Uoc3RhdGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdXBwb3J0c0xvY2FsU3RvcmFnZSgpKSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5nZXRDb29raWVOYW1lKCksIHN0YXRlKTtcbiAgICB9IGVsc2UgaWYgKCQuY29va2llKSB7XG4gICAgICAkLmNvb2tpZS5yYXcgPSB0cnVlO1xuICAgICAgcmV0dXJuICQuY29va2llKHRoaXMuZ2V0Q29va2llTmFtZSgpLCBzdGF0ZSwge1xuICAgICAgICBwYXRoOiAnLydcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBTYXZlU3RhdGVIYW5kbGVyLnByb3RvdHlwZS5nZXRTdGF0ZUZyb21TdG9yYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGpzb25fZGF0YTtcbiAgICBqc29uX2RhdGEgPSB0aGlzLl9sb2FkRnJvbVN0b3JhZ2UoKTtcbiAgICBpZiAoanNvbl9kYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGFyc2VTdGF0ZShqc29uX2RhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgU2F2ZVN0YXRlSGFuZGxlci5wcm90b3R5cGUuX3BhcnNlU3RhdGUgPSBmdW5jdGlvbihqc29uX2RhdGEpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgc3RhdGUgPSAkLnBhcnNlSlNPTihqc29uX2RhdGEpO1xuICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5zZWxlY3RlZF9ub2RlICYmIGlzSW50KHN0YXRlLnNlbGVjdGVkX25vZGUpKSB7XG4gICAgICBzdGF0ZS5zZWxlY3RlZF9ub2RlID0gW3N0YXRlLnNlbGVjdGVkX25vZGVdO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG4gIH07XG5cbiAgU2F2ZVN0YXRlSGFuZGxlci5wcm90b3R5cGUuX2xvYWRGcm9tU3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMub25HZXRTdGF0ZUZyb21TdG9yYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmVlX3dpZGdldC5vcHRpb25zLm9uR2V0U3RhdGVGcm9tU3RvcmFnZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdXBwb3J0c0xvY2FsU3RvcmFnZSgpKSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5nZXRDb29raWVOYW1lKCkpO1xuICAgIH0gZWxzZSBpZiAoJC5jb29raWUpIHtcbiAgICAgICQuY29va2llLnJhdyA9IHRydWU7XG4gICAgICByZXR1cm4gJC5jb29raWUodGhpcy5nZXRDb29raWVOYW1lKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgU2F2ZVN0YXRlSGFuZGxlci5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZ2V0T3Blbk5vZGVJZHMsIGdldFNlbGVjdGVkTm9kZUlkcztcbiAgICBnZXRPcGVuTm9kZUlkcyA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3Blbl9ub2RlcztcbiAgICAgICAgb3Blbl9ub2RlcyA9IFtdO1xuICAgICAgICBfdGhpcy50cmVlX3dpZGdldC50cmVlLml0ZXJhdGUoZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLmlzX29wZW4gJiYgbm9kZS5pZCAmJiBub2RlLmhhc0NoaWxkcmVuKCkpIHtcbiAgICAgICAgICAgIG9wZW5fbm9kZXMucHVzaChub2RlLmlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb3Blbl9ub2RlcztcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgZ2V0U2VsZWN0ZWROb2RlSWRzID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBuO1xuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgICAgICAgICByZWYgPSB0aGlzLnRyZWVfd2lkZ2V0LmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBuID0gcmVmW2ldO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG4uaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSkuY2FsbChfdGhpcyk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIHJldHVybiB7XG4gICAgICBvcGVuX25vZGVzOiBnZXRPcGVuTm9kZUlkcygpLFxuICAgICAgc2VsZWN0ZWRfbm9kZTogZ2V0U2VsZWN0ZWROb2RlSWRzKClcbiAgICB9O1xuICB9O1xuXG4gIFNhdmVTdGF0ZUhhbmRsZXIucHJvdG90eXBlLnNldEluaXRpYWxTdGF0ZSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgdmFyIG11c3RfbG9hZF9vbl9kZW1hbmQ7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBtdXN0X2xvYWRfb25fZGVtYW5kID0gdGhpcy5fb3BlbkluaXRpYWxOb2RlcyhzdGF0ZS5vcGVuX25vZGVzKTtcbiAgICAgIHRoaXMuX3NlbGVjdEluaXRpYWxOb2RlcyhzdGF0ZS5zZWxlY3RlZF9ub2RlKTtcbiAgICAgIHJldHVybiBtdXN0X2xvYWRfb25fZGVtYW5kO1xuICAgIH1cbiAgfTtcblxuICBTYXZlU3RhdGVIYW5kbGVyLnByb3RvdHlwZS5fb3BlbkluaXRpYWxOb2RlcyA9IGZ1bmN0aW9uKG5vZGVfaWRzKSB7XG4gICAgdmFyIGksIGxlbiwgbXVzdF9sb2FkX29uX2RlbWFuZCwgbm9kZSwgbm9kZV9pZDtcbiAgICBtdXN0X2xvYWRfb25fZGVtYW5kID0gZmFsc2U7XG4gICAgZm9yIChpID0gMCwgbGVuID0gbm9kZV9pZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIG5vZGVfaWQgPSBub2RlX2lkc1tpXTtcbiAgICAgIG5vZGUgPSB0aGlzLnRyZWVfd2lkZ2V0LmdldE5vZGVCeUlkKG5vZGVfaWQpO1xuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlLmxvYWRfb25fZGVtYW5kKSB7XG4gICAgICAgICAgbm9kZS5pc19vcGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtdXN0X2xvYWRfb25fZGVtYW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbXVzdF9sb2FkX29uX2RlbWFuZDtcbiAgfTtcblxuICBTYXZlU3RhdGVIYW5kbGVyLnByb3RvdHlwZS5fc2VsZWN0SW5pdGlhbE5vZGVzID0gZnVuY3Rpb24obm9kZV9pZHMpIHtcbiAgICB2YXIgaSwgbGVuLCBub2RlLCBub2RlX2lkLCBzZWxlY3RfY291bnQ7XG4gICAgc2VsZWN0X2NvdW50ID0gMDtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBub2RlX2lkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbm9kZV9pZCA9IG5vZGVfaWRzW2ldO1xuICAgICAgbm9kZSA9IHRoaXMudHJlZV93aWRnZXQuZ2V0Tm9kZUJ5SWQobm9kZV9pZCk7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICBzZWxlY3RfY291bnQgKz0gMTtcbiAgICAgICAgdGhpcy50cmVlX3dpZGdldC5zZWxlY3Rfbm9kZV9oYW5kbGVyLmFkZFRvU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0X2NvdW50ICE9PSAwO1xuICB9O1xuXG4gIFNhdmVTdGF0ZUhhbmRsZXIucHJvdG90eXBlLnNldEluaXRpYWxTdGF0ZU9uRGVtYW5kID0gZnVuY3Rpb24oc3RhdGUsIGNiX2ZpbmlzaGVkKSB7XG4gICAgaWYgKHN0YXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0SW5pdGlhbFN0YXRlT25EZW1hbmQoc3RhdGUub3Blbl9ub2Rlcywgc3RhdGUuc2VsZWN0ZWRfbm9kZSwgY2JfZmluaXNoZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2JfZmluaXNoZWQoKTtcbiAgICB9XG4gIH07XG5cbiAgU2F2ZVN0YXRlSGFuZGxlci5wcm90b3R5cGUuX3NldEluaXRpYWxTdGF0ZU9uRGVtYW5kID0gZnVuY3Rpb24obm9kZV9pZHMsIHNlbGVjdGVkX25vZGVzLCBjYl9maW5pc2hlZCkge1xuICAgIHZhciBsb2FkQW5kT3Blbk5vZGUsIGxvYWRpbmdfY291bnQsIG9wZW5Ob2RlcztcbiAgICBsb2FkaW5nX2NvdW50ID0gMDtcbiAgICBvcGVuTm9kZXMgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGksIGxlbiwgbmV3X25vZGVzX2lkcywgbm9kZSwgbm9kZV9pZDtcbiAgICAgICAgbmV3X25vZGVzX2lkcyA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBub2RlX2lkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIG5vZGVfaWQgPSBub2RlX2lkc1tpXTtcbiAgICAgICAgICBub2RlID0gX3RoaXMudHJlZV93aWRnZXQuZ2V0Tm9kZUJ5SWQobm9kZV9pZCk7XG4gICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICBuZXdfbm9kZXNfaWRzLnB1c2gobm9kZV9pZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghbm9kZS5pc19sb2FkaW5nKSB7XG4gICAgICAgICAgICAgIGlmIChub2RlLmxvYWRfb25fZGVtYW5kKSB7XG4gICAgICAgICAgICAgICAgbG9hZEFuZE9wZW5Ob2RlKG5vZGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLnRyZWVfd2lkZ2V0Ll9vcGVuTm9kZShub2RlLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbm9kZV9pZHMgPSBuZXdfbm9kZXNfaWRzO1xuICAgICAgICBpZiAoX3RoaXMuX3NlbGVjdEluaXRpYWxOb2RlcyhzZWxlY3RlZF9ub2RlcykpIHtcbiAgICAgICAgICBfdGhpcy50cmVlX3dpZGdldC5fcmVmcmVzaEVsZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvYWRpbmdfY291bnQgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gY2JfZmluaXNoZWQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICBsb2FkQW5kT3Blbk5vZGUgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIGxvYWRpbmdfY291bnQgKz0gMTtcbiAgICAgICAgcmV0dXJuIF90aGlzLnRyZWVfd2lkZ2V0Ll9vcGVuTm9kZShub2RlLCBmYWxzZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbG9hZGluZ19jb3VudCAtPSAxO1xuICAgICAgICAgIHJldHVybiBvcGVuTm9kZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIHJldHVybiBvcGVuTm9kZXMoKTtcbiAgfTtcblxuICBTYXZlU3RhdGVIYW5kbGVyLnByb3RvdHlwZS5nZXRDb29raWVOYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnRyZWVfd2lkZ2V0Lm9wdGlvbnMuc2F2ZVN0YXRlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMudHJlZV93aWRnZXQub3B0aW9ucy5zYXZlU3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAndHJlZSc7XG4gICAgfVxuICB9O1xuXG4gIFNhdmVTdGF0ZUhhbmRsZXIucHJvdG90eXBlLnN1cHBvcnRzTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRlc3RTdXBwb3J0O1xuICAgIHRlc3RTdXBwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZXJyb3IsIGVycm9yMSwga2V5O1xuICAgICAgaWYgKHR5cGVvZiBsb2NhbFN0b3JhZ2UgPT09IFwidW5kZWZpbmVkXCIgfHwgbG9jYWxTdG9yYWdlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAga2V5ID0gJ19zdG9yYWdlX3Rlc3QnO1xuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCB0cnVlKTtcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yMSkge1xuICAgICAgICAgIGVycm9yID0gZXJyb3IxO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICh0aGlzLl9zdXBwb3J0c0xvY2FsU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9zdXBwb3J0c0xvY2FsU3RvcmFnZSA9IHRlc3RTdXBwb3J0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zdXBwb3J0c0xvY2FsU3RvcmFnZTtcbiAgfTtcblxuICBTYXZlU3RhdGVIYW5kbGVyLnByb3RvdHlwZS5nZXROb2RlSWRUb0JlU2VsZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgc3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVN0b3JhZ2UoKTtcbiAgICBpZiAoc3RhdGUgJiYgc3RhdGUuc2VsZWN0ZWRfbm9kZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLnNlbGVjdGVkX25vZGVbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU2F2ZVN0YXRlSGFuZGxlcjtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTYXZlU3RhdGVIYW5kbGVyO1xuXG59LHtcIi4vdXRpbFwiOjEyfV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgJCwgU2Nyb2xsSGFuZGxlcjtcblxuJCA9IGpRdWVyeTtcblxuU2Nyb2xsSGFuZGxlciA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gU2Nyb2xsSGFuZGxlcih0cmVlX3dpZGdldCkge1xuICAgIHRoaXMudHJlZV93aWRnZXQgPSB0cmVlX3dpZGdldDtcbiAgICB0aGlzLnByZXZpb3VzX3RvcCA9IC0xO1xuICAgIHRoaXMuaXNfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9pbml0U2Nyb2xsUGFyZW50KCk7XG4gIH1cblxuICBTY3JvbGxIYW5kbGVyLnByb3RvdHlwZS5faW5pdFNjcm9sbFBhcmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2Nyb2xsX3BhcmVudCwgZ2V0UGFyZW50V2l0aE92ZXJmbG93LCBzZXREb2N1bWVudEFzU2Nyb2xsUGFyZW50O1xuICAgIGdldFBhcmVudFdpdGhPdmVyZmxvdyA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3NzX3ZhbHVlcywgZWwsIGhhc092ZXJGbG93LCBpLCBsZW4sIHJlZjtcbiAgICAgICAgY3NzX3ZhbHVlcyA9IFsnb3ZlcmZsb3cnLCAnb3ZlcmZsb3cteSddO1xuICAgICAgICBoYXNPdmVyRmxvdyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgdmFyIGNzc192YWx1ZSwgaSwgbGVuLCByZWY7XG4gICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gY3NzX3ZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY3NzX3ZhbHVlID0gY3NzX3ZhbHVlc1tpXTtcbiAgICAgICAgICAgIGlmICgocmVmID0gJC5jc3MoZWwsIGNzc192YWx1ZSkpID09PSAnYXV0bycgfHwgcmVmID09PSAnc2Nyb2xsJykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoaGFzT3ZlckZsb3coX3RoaXMudHJlZV93aWRnZXQuJGVsWzBdKSkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy50cmVlX3dpZGdldC4kZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmVmID0gX3RoaXMudHJlZV93aWRnZXQuJGVsLnBhcmVudHMoKTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgZWwgPSByZWZbaV07XG4gICAgICAgICAgaWYgKGhhc092ZXJGbG93KGVsKSkge1xuICAgICAgICAgICAgcmV0dXJuICQoZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgc2V0RG9jdW1lbnRBc1Njcm9sbFBhcmVudCA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBfdGhpcy5zY3JvbGxfcGFyZW50X3RvcCA9IDA7XG4gICAgICAgIHJldHVybiBfdGhpcy4kc2Nyb2xsX3BhcmVudCA9IG51bGw7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGlmICh0aGlzLnRyZWVfd2lkZ2V0LiRlbC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCcpIHtcbiAgICAgIHNldERvY3VtZW50QXNTY3JvbGxQYXJlbnQoKTtcbiAgICB9XG4gICAgJHNjcm9sbF9wYXJlbnQgPSBnZXRQYXJlbnRXaXRoT3ZlcmZsb3coKTtcbiAgICBpZiAoJHNjcm9sbF9wYXJlbnQgJiYgJHNjcm9sbF9wYXJlbnQubGVuZ3RoICYmICRzY3JvbGxfcGFyZW50WzBdLnRhZ05hbWUgIT09ICdIVE1MJykge1xuICAgICAgdGhpcy4kc2Nyb2xsX3BhcmVudCA9ICRzY3JvbGxfcGFyZW50O1xuICAgICAgdGhpcy5zY3JvbGxfcGFyZW50X3RvcCA9IHRoaXMuJHNjcm9sbF9wYXJlbnQub2Zmc2V0KCkudG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXREb2N1bWVudEFzU2Nyb2xsUGFyZW50KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfTtcblxuICBTY3JvbGxIYW5kbGVyLnByb3RvdHlwZS5fZW5zdXJlSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5pc19pbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2luaXRTY3JvbGxQYXJlbnQoKTtcbiAgICB9XG4gIH07XG5cbiAgU2Nyb2xsSGFuZGxlci5wcm90b3R5cGUuY2hlY2tTY3JvbGxpbmcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaG92ZXJlZF9hcmVhO1xuICAgIHRoaXMuX2Vuc3VyZUluaXQoKTtcbiAgICBob3ZlcmVkX2FyZWEgPSB0aGlzLnRyZWVfd2lkZ2V0LmRuZF9oYW5kbGVyLmhvdmVyZWRfYXJlYTtcbiAgICBpZiAoaG92ZXJlZF9hcmVhICYmIGhvdmVyZWRfYXJlYS50b3AgIT09IHRoaXMucHJldmlvdXNfdG9wKSB7XG4gICAgICB0aGlzLnByZXZpb3VzX3RvcCA9IGhvdmVyZWRfYXJlYS50b3A7XG4gICAgICBpZiAodGhpcy4kc2Nyb2xsX3BhcmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlU2Nyb2xsaW5nV2l0aFNjcm9sbFBhcmVudChob3ZlcmVkX2FyZWEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVNjcm9sbGluZ1dpdGhEb2N1bWVudChob3ZlcmVkX2FyZWEpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBTY3JvbGxIYW5kbGVyLnByb3RvdHlwZS5faGFuZGxlU2Nyb2xsaW5nV2l0aFNjcm9sbFBhcmVudCA9IGZ1bmN0aW9uKGFyZWEpIHtcbiAgICB2YXIgZGlzdGFuY2VfYm90dG9tO1xuICAgIGRpc3RhbmNlX2JvdHRvbSA9IHRoaXMuc2Nyb2xsX3BhcmVudF90b3AgKyB0aGlzLiRzY3JvbGxfcGFyZW50WzBdLm9mZnNldEhlaWdodCAtIGFyZWEuYm90dG9tO1xuICAgIGlmIChkaXN0YW5jZV9ib3R0b20gPCAyMCkge1xuICAgICAgdGhpcy4kc2Nyb2xsX3BhcmVudFswXS5zY3JvbGxUb3AgKz0gMjA7XG4gICAgICB0aGlzLnRyZWVfd2lkZ2V0LnJlZnJlc2hIaXRBcmVhcygpO1xuICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXNfdG9wID0gLTE7XG4gICAgfSBlbHNlIGlmICgoYXJlYS50b3AgLSB0aGlzLnNjcm9sbF9wYXJlbnRfdG9wKSA8IDIwKSB7XG4gICAgICB0aGlzLiRzY3JvbGxfcGFyZW50WzBdLnNjcm9sbFRvcCAtPSAyMDtcbiAgICAgIHRoaXMudHJlZV93aWRnZXQucmVmcmVzaEhpdEFyZWFzKCk7XG4gICAgICByZXR1cm4gdGhpcy5wcmV2aW91c190b3AgPSAtMTtcbiAgICB9XG4gIH07XG5cbiAgU2Nyb2xsSGFuZGxlci5wcm90b3R5cGUuX2hhbmRsZVNjcm9sbGluZ1dpdGhEb2N1bWVudCA9IGZ1bmN0aW9uKGFyZWEpIHtcbiAgICB2YXIgZGlzdGFuY2VfdG9wO1xuICAgIGRpc3RhbmNlX3RvcCA9IGFyZWEudG9wIC0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCk7XG4gICAgaWYgKGRpc3RhbmNlX3RvcCA8IDIwKSB7XG4gICAgICByZXR1cm4gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpIC0gMjApO1xuICAgIH0gZWxzZSBpZiAoJCh3aW5kb3cpLmhlaWdodCgpIC0gKGFyZWEuYm90dG9tIC0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkpIDwgMjApIHtcbiAgICAgIHJldHVybiAkKGRvY3VtZW50KS5zY3JvbGxUb3AoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgKyAyMCk7XG4gICAgfVxuICB9O1xuXG4gIFNjcm9sbEhhbmRsZXIucHJvdG90eXBlLnNjcm9sbFRvID0gZnVuY3Rpb24odG9wKSB7XG4gICAgdmFyIHRyZWVfdG9wO1xuICAgIHRoaXMuX2Vuc3VyZUluaXQoKTtcbiAgICBpZiAodGhpcy4kc2Nyb2xsX3BhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjcm9sbF9wYXJlbnRbMF0uc2Nyb2xsVG9wID0gdG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmVlX3RvcCA9IHRoaXMudHJlZV93aWRnZXQuJGVsLm9mZnNldCgpLnRvcDtcbiAgICAgIHJldHVybiAkKGRvY3VtZW50KS5zY3JvbGxUb3AodG9wICsgdHJlZV90b3ApO1xuICAgIH1cbiAgfTtcblxuICBTY3JvbGxIYW5kbGVyLnByb3RvdHlwZS5pc1Njcm9sbGVkSW50b1ZpZXcgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgdmFyICRlbGVtZW50LCBlbGVtZW50X2JvdHRvbSwgZWxlbWVudF90b3AsIHZpZXdfYm90dG9tLCB2aWV3X3RvcDtcbiAgICB0aGlzLl9lbnN1cmVJbml0KCk7XG4gICAgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuICAgIGlmICh0aGlzLiRzY3JvbGxfcGFyZW50KSB7XG4gICAgICB2aWV3X3RvcCA9IDA7XG4gICAgICB2aWV3X2JvdHRvbSA9IHRoaXMuJHNjcm9sbF9wYXJlbnQuaGVpZ2h0KCk7XG4gICAgICBlbGVtZW50X3RvcCA9ICRlbGVtZW50Lm9mZnNldCgpLnRvcCAtIHRoaXMuc2Nyb2xsX3BhcmVudF90b3A7XG4gICAgICBlbGVtZW50X2JvdHRvbSA9IGVsZW1lbnRfdG9wICsgJGVsZW1lbnQuaGVpZ2h0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdfdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgdmlld19ib3R0b20gPSB2aWV3X3RvcCArICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgIGVsZW1lbnRfdG9wID0gJGVsZW1lbnQub2Zmc2V0KCkudG9wO1xuICAgICAgZWxlbWVudF9ib3R0b20gPSBlbGVtZW50X3RvcCArICRlbGVtZW50LmhlaWdodCgpO1xuICAgIH1cbiAgICByZXR1cm4gKGVsZW1lbnRfYm90dG9tIDw9IHZpZXdfYm90dG9tKSAmJiAoZWxlbWVudF90b3AgPj0gdmlld190b3ApO1xuICB9O1xuXG4gIHJldHVybiBTY3JvbGxIYW5kbGVyO1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbEhhbmRsZXI7XG5cbn0se31dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQsIFNlbGVjdE5vZGVIYW5kbGVyO1xuXG4kID0galF1ZXJ5O1xuXG5TZWxlY3ROb2RlSGFuZGxlciA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gU2VsZWN0Tm9kZUhhbmRsZXIodHJlZV93aWRnZXQpIHtcbiAgICB0aGlzLnRyZWVfd2lkZ2V0ID0gdHJlZV93aWRnZXQ7XG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG5cbiAgU2VsZWN0Tm9kZUhhbmRsZXIucHJvdG90eXBlLmdldFNlbGVjdGVkTm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxlY3RlZF9ub2RlcztcbiAgICBzZWxlY3RlZF9ub2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgIGlmIChzZWxlY3RlZF9ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBzZWxlY3RlZF9ub2Rlc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBTZWxlY3ROb2RlSGFuZGxlci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWROb2RlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpZCwgbm9kZSwgc2VsZWN0ZWRfbm9kZXM7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRfc2luZ2xlX25vZGUpIHtcbiAgICAgIHJldHVybiBbdGhpcy5zZWxlY3RlZF9zaW5nbGVfbm9kZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGVkX25vZGVzID0gW107XG4gICAgICBmb3IgKGlkIGluIHRoaXMuc2VsZWN0ZWRfbm9kZXMpIHtcbiAgICAgICAgbm9kZSA9IHRoaXMudHJlZV93aWRnZXQuZ2V0Tm9kZUJ5SWQoaWQpO1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgIHNlbGVjdGVkX25vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxlY3RlZF9ub2RlcztcbiAgICB9XG4gIH07XG5cbiAgU2VsZWN0Tm9kZUhhbmRsZXIucHJvdG90eXBlLmdldFNlbGVjdGVkTm9kZXNVbmRlciA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgIHZhciBpZCwgbm9kZSwgc2VsZWN0ZWRfbm9kZXM7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRfc2luZ2xlX25vZGUpIHtcbiAgICAgIGlmIChwYXJlbnQuaXNQYXJlbnRPZih0aGlzLnNlbGVjdGVkX3NpbmdsZV9ub2RlKSkge1xuICAgICAgICByZXR1cm4gW3RoaXMuc2VsZWN0ZWRfc2luZ2xlX25vZGVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RlZF9ub2RlcyA9IFtdO1xuICAgICAgZm9yIChpZCBpbiB0aGlzLnNlbGVjdGVkX25vZGVzKSB7XG4gICAgICAgIG5vZGUgPSB0aGlzLnRyZWVfd2lkZ2V0LmdldE5vZGVCeUlkKGlkKTtcbiAgICAgICAgaWYgKG5vZGUgJiYgcGFyZW50LmlzUGFyZW50T2Yobm9kZSkpIHtcbiAgICAgICAgICBzZWxlY3RlZF9ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZWN0ZWRfbm9kZXM7XG4gICAgfVxuICB9O1xuXG4gIFNlbGVjdE5vZGVIYW5kbGVyLnByb3RvdHlwZS5pc05vZGVTZWxlY3RlZCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5pZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRfbm9kZXNbbm9kZS5pZF07XG4gICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkX3NpbmdsZV9ub2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZF9zaW5nbGVfbm9kZS5lbGVtZW50ID09PSBub2RlLmVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgU2VsZWN0Tm9kZUhhbmRsZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZWxlY3RlZF9ub2RlcyA9IHt9O1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkX3NpbmdsZV9ub2RlID0gbnVsbDtcbiAgfTtcblxuICBTZWxlY3ROb2RlSGFuZGxlci5wcm90b3R5cGUucmVtb3ZlRnJvbVNlbGVjdGlvbiA9IGZ1bmN0aW9uKG5vZGUsIGluY2x1ZGVfY2hpbGRyZW4pIHtcbiAgICBpZiAoaW5jbHVkZV9jaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgICBpbmNsdWRlX2NoaWxkcmVuID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghbm9kZS5pZCkge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRfc2luZ2xlX25vZGUgJiYgbm9kZS5lbGVtZW50ID09PSB0aGlzLnNlbGVjdGVkX3NpbmdsZV9ub2RlLmVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRfc2luZ2xlX25vZGUgPSBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5zZWxlY3RlZF9ub2Rlc1tub2RlLmlkXTtcbiAgICAgIGlmIChpbmNsdWRlX2NoaWxkcmVuKSB7XG4gICAgICAgIHJldHVybiBub2RlLml0ZXJhdGUoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5zZWxlY3RlZF9ub2Rlc1tub2RlLmlkXTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgU2VsZWN0Tm9kZUhhbmRsZXIucHJvdG90eXBlLmFkZFRvU2VsZWN0aW9uID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLmlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZF9ub2Rlc1tub2RlLmlkXSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkX3NpbmdsZV9ub2RlID0gbm9kZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFNlbGVjdE5vZGVIYW5kbGVyO1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdE5vZGVIYW5kbGVyO1xuXG59LHt9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbi8qXG5Db3B5cmlnaHQgMjAxMyBNYXJjbyBCcmFha1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyICQsIFNpbXBsZVdpZGdldCxcbiAgc2xpY2UgPSBbXS5zbGljZTtcblxuJCA9IGpRdWVyeTtcblxuU2ltcGxlV2lkZ2V0ID0gKGZ1bmN0aW9uKCkge1xuICBTaW1wbGVXaWRnZXQucHJvdG90eXBlLmRlZmF1bHRzID0ge307XG5cbiAgZnVuY3Rpb24gU2ltcGxlV2lkZ2V0KGVsLCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWwgPSAkKGVsKTtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyk7XG4gIH1cblxuICBTaW1wbGVXaWRnZXQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVpbml0KCk7XG4gIH07XG5cbiAgU2ltcGxlV2lkZ2V0LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIFNpbXBsZVdpZGdldC5wcm90b3R5cGUuX2RlaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIFNpbXBsZVdpZGdldC5yZWdpc3RlciA9IGZ1bmN0aW9uKHdpZGdldF9jbGFzcywgd2lkZ2V0X25hbWUpIHtcbiAgICB2YXIgY2FsbEZ1bmN0aW9uLCBjcmVhdGVXaWRnZXQsIGRlc3Ryb3lXaWRnZXQsIGdldERhdGFLZXksIGdldFdpZGdldERhdGE7XG4gICAgZ2V0RGF0YUtleSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwic2ltcGxlX3dpZGdldF9cIiArIHdpZGdldF9uYW1lO1xuICAgIH07XG4gICAgZ2V0V2lkZ2V0RGF0YSA9IGZ1bmN0aW9uKGVsLCBkYXRhX2tleSkge1xuICAgICAgdmFyIHdpZGdldDtcbiAgICAgIHdpZGdldCA9ICQuZGF0YShlbCwgZGF0YV9rZXkpO1xuICAgICAgaWYgKHdpZGdldCAmJiAod2lkZ2V0IGluc3RhbmNlb2YgU2ltcGxlV2lkZ2V0KSkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgICBjcmVhdGVXaWRnZXQgPSBmdW5jdGlvbigkZWwsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBkYXRhX2tleSwgZWwsIGV4aXN0aW5nX3dpZGdldCwgaSwgbGVuLCB3aWRnZXQ7XG4gICAgICBkYXRhX2tleSA9IGdldERhdGFLZXkoKTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9ICRlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlbCA9ICRlbFtpXTtcbiAgICAgICAgZXhpc3Rpbmdfd2lkZ2V0ID0gZ2V0V2lkZ2V0RGF0YShlbCwgZGF0YV9rZXkpO1xuICAgICAgICBpZiAoIWV4aXN0aW5nX3dpZGdldCkge1xuICAgICAgICAgIHdpZGdldCA9IG5ldyB3aWRnZXRfY2xhc3MoZWwsIG9wdGlvbnMpO1xuICAgICAgICAgIGlmICghJC5kYXRhKGVsLCBkYXRhX2tleSkpIHtcbiAgICAgICAgICAgICQuZGF0YShlbCwgZGF0YV9rZXksIHdpZGdldCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpZGdldC5faW5pdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJGVsO1xuICAgIH07XG4gICAgZGVzdHJveVdpZGdldCA9IGZ1bmN0aW9uKCRlbCkge1xuICAgICAgdmFyIGRhdGFfa2V5LCBlbCwgaSwgbGVuLCByZXN1bHRzLCB3aWRnZXQ7XG4gICAgICBkYXRhX2tleSA9IGdldERhdGFLZXkoKTtcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9ICRlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlbCA9ICRlbFtpXTtcbiAgICAgICAgd2lkZ2V0ID0gZ2V0V2lkZ2V0RGF0YShlbCwgZGF0YV9rZXkpO1xuICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgd2lkZ2V0LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRzLnB1c2goJC5yZW1vdmVEYXRhKGVsLCBkYXRhX2tleSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbiAgICBjYWxsRnVuY3Rpb24gPSBmdW5jdGlvbigkZWwsIGZ1bmN0aW9uX25hbWUsIGFyZ3MpIHtcbiAgICAgIHZhciBlbCwgaSwgbGVuLCByZXN1bHQsIHdpZGdldCwgd2lkZ2V0X2Z1bmN0aW9uO1xuICAgICAgcmVzdWx0ID0gbnVsbDtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9ICRlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlbCA9ICRlbFtpXTtcbiAgICAgICAgd2lkZ2V0ID0gJC5kYXRhKGVsLCBnZXREYXRhS2V5KCkpO1xuICAgICAgICBpZiAod2lkZ2V0ICYmICh3aWRnZXQgaW5zdGFuY2VvZiBTaW1wbGVXaWRnZXQpKSB7XG4gICAgICAgICAgd2lkZ2V0X2Z1bmN0aW9uID0gd2lkZ2V0W2Z1bmN0aW9uX25hbWVdO1xuICAgICAgICAgIGlmICh3aWRnZXRfZnVuY3Rpb24gJiYgKHR5cGVvZiB3aWRnZXRfZnVuY3Rpb24gPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB3aWRnZXRfZnVuY3Rpb24uYXBwbHkod2lkZ2V0LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gJC5mblt3aWRnZXRfbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkZWwsIGFyZ3MsIGFyZ3VtZW50MSwgZnVuY3Rpb25fbmFtZSwgb3B0aW9ucztcbiAgICAgIGFyZ3VtZW50MSA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgJGVsID0gdGhpcztcbiAgICAgIGlmIChhcmd1bWVudDEgPT09IHZvaWQgMCB8fCB0eXBlb2YgYXJndW1lbnQxID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvcHRpb25zID0gYXJndW1lbnQxO1xuICAgICAgICByZXR1cm4gY3JlYXRlV2lkZ2V0KCRlbCwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudDEgPT09ICdzdHJpbmcnICYmIGFyZ3VtZW50MVswXSAhPT0gJ18nKSB7XG4gICAgICAgIGZ1bmN0aW9uX25hbWUgPSBhcmd1bWVudDE7XG4gICAgICAgIGlmIChmdW5jdGlvbl9uYW1lID09PSAnZGVzdHJveScpIHtcbiAgICAgICAgICByZXR1cm4gZGVzdHJveVdpZGdldCgkZWwpO1xuICAgICAgICB9IGVsc2UgaWYgKGZ1bmN0aW9uX25hbWUgPT09ICdnZXRfd2lkZ2V0X2NsYXNzJykge1xuICAgICAgICAgIHJldHVybiB3aWRnZXRfY2xhc3M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxGdW5jdGlvbigkZWwsIGZ1bmN0aW9uX25hbWUsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gU2ltcGxlV2lkZ2V0O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbXBsZVdpZGdldDtcblxufSx7fV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQsIEJvcmRlckRyb3BIaW50LCBEcmFnQW5kRHJvcEhhbmRsZXIsIERyYWdFbGVtZW50LCBFbGVtZW50c1JlbmRlcmVyLCBGb2xkZXJFbGVtZW50LCBHaG9zdERyb3BIaW50LCBIaXRBcmVhc0dlbmVyYXRvciwgSnFUcmVlV2lkZ2V0LCBLZXlIYW5kbGVyLCBNb3VzZVdpZGdldCwgTm9kZSwgTm9kZUVsZW1lbnQsIFBvc2l0aW9uLCBTYXZlU3RhdGVIYW5kbGVyLCBTY3JvbGxIYW5kbGVyLCBTZWxlY3ROb2RlSGFuZGxlciwgU2ltcGxlV2lkZ2V0LCBfX3ZlcnNpb25fXywgZHJhZ19hbmRfZHJvcF9oYW5kbGVyLCBub2RlX21vZHVsZSwgcmVmLCB1dGlsX21vZHVsZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbl9fdmVyc2lvbl9fID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cbmRyYWdfYW5kX2Ryb3BfaGFuZGxlciA9IHJlcXVpcmUoJy4vZHJhZ19hbmRfZHJvcF9oYW5kbGVyJyk7XG5cbkVsZW1lbnRzUmVuZGVyZXIgPSByZXF1aXJlKCcuL2VsZW1lbnRzX3JlbmRlcmVyJyk7XG5cbktleUhhbmRsZXIgPSByZXF1aXJlKCcuL2tleV9oYW5kbGVyJyk7XG5cbk1vdXNlV2lkZ2V0ID0gcmVxdWlyZSgnLi9tb3VzZS53aWRnZXQnKTtcblxuU2F2ZVN0YXRlSGFuZGxlciA9IHJlcXVpcmUoJy4vc2F2ZV9zdGF0ZV9oYW5kbGVyJyk7XG5cblNjcm9sbEhhbmRsZXIgPSByZXF1aXJlKCcuL3Njcm9sbF9oYW5kbGVyJyk7XG5cblNlbGVjdE5vZGVIYW5kbGVyID0gcmVxdWlyZSgnLi9zZWxlY3Rfbm9kZV9oYW5kbGVyJyk7XG5cblNpbXBsZVdpZGdldCA9IHJlcXVpcmUoJy4vc2ltcGxlLndpZGdldCcpO1xuXG5ub2RlX21vZHVsZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xuXG5Ob2RlID0gbm9kZV9tb2R1bGUuTm9kZTtcblxuUG9zaXRpb24gPSBub2RlX21vZHVsZS5Qb3NpdGlvbjtcblxudXRpbF9tb2R1bGUgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxucmVmID0gcmVxdWlyZSgnLi9ub2RlX2VsZW1lbnQnKSwgQm9yZGVyRHJvcEhpbnQgPSByZWYuQm9yZGVyRHJvcEhpbnQsIEZvbGRlckVsZW1lbnQgPSByZWYuRm9sZGVyRWxlbWVudCwgR2hvc3REcm9wSGludCA9IHJlZi5HaG9zdERyb3BIaW50LCBOb2RlRWxlbWVudCA9IHJlZi5Ob2RlRWxlbWVudDtcblxuRHJhZ0FuZERyb3BIYW5kbGVyID0gZHJhZ19hbmRfZHJvcF9oYW5kbGVyLkRyYWdBbmREcm9wSGFuZGxlciwgRHJhZ0VsZW1lbnQgPSBkcmFnX2FuZF9kcm9wX2hhbmRsZXIuRHJhZ0VsZW1lbnQsIEhpdEFyZWFzR2VuZXJhdG9yID0gZHJhZ19hbmRfZHJvcF9oYW5kbGVyLkhpdEFyZWFzR2VuZXJhdG9yO1xuXG4kID0galF1ZXJ5O1xuXG5KcVRyZWVXaWRnZXQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoSnFUcmVlV2lkZ2V0LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBKcVRyZWVXaWRnZXQoKSB7XG4gICAgcmV0dXJuIEpxVHJlZVdpZGdldC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuQm9yZGVyRHJvcEhpbnQgPSBCb3JkZXJEcm9wSGludDtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLkRyYWdFbGVtZW50ID0gRHJhZ0VsZW1lbnQ7XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5EcmFnQW5kRHJvcEhhbmRsZXIgPSBEcmFnQW5kRHJvcEhhbmRsZXI7XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5FbGVtZW50c1JlbmRlcmVyID0gRWxlbWVudHNSZW5kZXJlcjtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLkdob3N0RHJvcEhpbnQgPSBHaG9zdERyb3BIaW50O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuSGl0QXJlYXNHZW5lcmF0b3IgPSBIaXRBcmVhc0dlbmVyYXRvcjtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLk5vZGUgPSBOb2RlO1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuU2F2ZVN0YXRlSGFuZGxlciA9IFNhdmVTdGF0ZUhhbmRsZXI7XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5TY3JvbGxIYW5kbGVyID0gU2Nyb2xsSGFuZGxlcjtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLlNlbGVjdE5vZGVIYW5kbGVyID0gU2VsZWN0Tm9kZUhhbmRsZXI7XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5kZWZhdWx0cyA9IHtcbiAgICBhdXRvT3BlbjogZmFsc2UsXG4gICAgc2F2ZVN0YXRlOiBmYWxzZSxcbiAgICBkcmFnQW5kRHJvcDogZmFsc2UsXG4gICAgc2VsZWN0YWJsZTogdHJ1ZSxcbiAgICB1c2VDb250ZXh0TWVudTogdHJ1ZSxcbiAgICBvbkNhblNlbGVjdE5vZGU6IG51bGwsXG4gICAgb25TZXRTdGF0ZUZyb21TdG9yYWdlOiBudWxsLFxuICAgIG9uR2V0U3RhdGVGcm9tU3RvcmFnZTogbnVsbCxcbiAgICBvbkNyZWF0ZUxpOiBudWxsLFxuICAgIG9uSXNNb3ZlSGFuZGxlOiBudWxsLFxuICAgIG9uQ2FuTW92ZTogbnVsbCxcbiAgICBvbkNhbk1vdmVUbzogbnVsbCxcbiAgICBvbkxvYWRGYWlsZWQ6IG51bGwsXG4gICAgYXV0b0VzY2FwZTogdHJ1ZSxcbiAgICBkYXRhVXJsOiBudWxsLFxuICAgIGNsb3NlZEljb246IG51bGwsXG4gICAgb3BlbmVkSWNvbjogJyYjeDI1YmM7JyxcbiAgICBzbGlkZTogdHJ1ZSxcbiAgICBub2RlQ2xhc3M6IE5vZGUsXG4gICAgZGF0YUZpbHRlcjogbnVsbCxcbiAgICBrZXlib2FyZFN1cHBvcnQ6IHRydWUsXG4gICAgb3BlbkZvbGRlckRlbGF5OiA1MDAsXG4gICAgcnRsOiBudWxsLFxuICAgIG9uRHJhZ01vdmU6IG51bGwsXG4gICAgb25EcmFnU3RvcDogbnVsbCxcbiAgICBidXR0b25MZWZ0OiB0cnVlLFxuICAgIG9uTG9hZGluZzogbnVsbFxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24obm9kZSwgc2xpZGUpIHtcbiAgICBpZiAoc2xpZGUgPT0gbnVsbCkge1xuICAgICAgc2xpZGUgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoc2xpZGUgPT09IG51bGwpIHtcbiAgICAgIHNsaWRlID0gdGhpcy5vcHRpb25zLnNsaWRlO1xuICAgIH1cbiAgICBpZiAobm9kZS5pc19vcGVuKSB7XG4gICAgICB0aGlzLmNsb3NlTm9kZShub2RlLCBzbGlkZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3Blbk5vZGUobm9kZSwgc2xpZGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuZ2V0VHJlZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyZWU7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5zZWxlY3ROb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHRoaXMuX3NlbGVjdE5vZGUobm9kZSwgZmFsc2UpO1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fc2VsZWN0Tm9kZSA9IGZ1bmN0aW9uKG5vZGUsIG11c3RfdG9nZ2xlKSB7XG4gICAgdmFyIGNhblNlbGVjdCwgZGVzZWxlY3RlZF9ub2RlLCBvcGVuUGFyZW50cywgc2F2ZVN0YXRlO1xuICAgIGlmIChtdXN0X3RvZ2dsZSA9PSBudWxsKSB7XG4gICAgICBtdXN0X3RvZ2dsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2VsZWN0X25vZGVfaGFuZGxlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYW5TZWxlY3QgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMub25DYW5TZWxlY3ROb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLm9wdGlvbnMuc2VsZWN0YWJsZSAmJiBfdGhpcy5vcHRpb25zLm9uQ2FuU2VsZWN0Tm9kZShub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMub3B0aW9ucy5zZWxlY3RhYmxlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIG9wZW5QYXJlbnRzID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYXJlbnQ7XG4gICAgICAgIHBhcmVudCA9IG5vZGUucGFyZW50O1xuICAgICAgICBpZiAocGFyZW50ICYmIHBhcmVudC5wYXJlbnQgJiYgIXBhcmVudC5pc19vcGVuKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLm9wZW5Ob2RlKHBhcmVudCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIHNhdmVTdGF0ZSA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5zYXZlU3RhdGUpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuc2F2ZV9zdGF0ZV9oYW5kbGVyLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGlmICghbm9kZSkge1xuICAgICAgdGhpcy5fZGVzZWxlY3RDdXJyZW50Tm9kZSgpO1xuICAgICAgc2F2ZVN0YXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghY2FuU2VsZWN0KCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0X25vZGVfaGFuZGxlci5pc05vZGVTZWxlY3RlZChub2RlKSkge1xuICAgICAgaWYgKG11c3RfdG9nZ2xlKSB7XG4gICAgICAgIHRoaXMuX2Rlc2VsZWN0Q3VycmVudE5vZGUoKTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckV2ZW50KCd0cmVlLnNlbGVjdCcsIHtcbiAgICAgICAgICBub2RlOiBudWxsLFxuICAgICAgICAgIHByZXZpb3VzX25vZGU6IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc2VsZWN0ZWRfbm9kZSA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlKCk7XG4gICAgICB0aGlzLl9kZXNlbGVjdEN1cnJlbnROb2RlKCk7XG4gICAgICB0aGlzLmFkZFRvU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgdGhpcy5fdHJpZ2dlckV2ZW50KCd0cmVlLnNlbGVjdCcsIHtcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgZGVzZWxlY3RlZF9ub2RlOiBkZXNlbGVjdGVkX25vZGVcbiAgICAgIH0pO1xuICAgICAgb3BlblBhcmVudHMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNhdmVTdGF0ZSgpO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuZ2V0U2VsZWN0ZWROb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0X25vZGVfaGFuZGxlcikge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0X25vZGVfaGFuZGxlci5nZXRTZWxlY3RlZE5vZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUudG9Kc29uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudHJlZS5nZXREYXRhKCkpO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUubG9hZERhdGEgPSBmdW5jdGlvbihkYXRhLCBwYXJlbnRfbm9kZSkge1xuICAgIHRoaXMuX2xvYWREYXRhKGRhdGEsIHBhcmVudF9ub2RlKTtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9O1xuXG5cbiAgLypcbiAgc2lnbmF0dXJlczpcbiAgLSBsb2FkRGF0YUZyb21VcmwodXJsLCBwYXJlbnRfbm9kZT1udWxsLCBvbl9maW5pc2hlZD1udWxsKVxuICAgICAgbG9hZERhdGFGcm9tVXJsKCcvbXlfZGF0YScpO1xuICAgICAgbG9hZERhdGFGcm9tVXJsKCcvbXlfZGF0YScsIG5vZGUxKTtcbiAgICAgIGxvYWREYXRhRnJvbVVybCgnL215X2RhdGEnLCBub2RlMSwgZnVuY3Rpb24oKSB7IGNvbnNvbGUubG9nKCdmaW5pc2hlZCcpOyB9KTtcbiAgICAgIGxvYWREYXRhRnJvbVVybCgnL215X2RhdGEnLCBudWxsLCBmdW5jdGlvbigpIHsgY29uc29sZS5sb2coJ2ZpbmlzaGVkJyk7IH0pO1xuICBcbiAgLSBsb2FkRGF0YUZyb21VcmwocGFyZW50X25vZGU9bnVsbCwgb25fZmluaXNoZWQ9bnVsbClcbiAgICAgIGxvYWREYXRhRnJvbVVybCgpO1xuICAgICAgbG9hZERhdGFGcm9tVXJsKG5vZGUxKTtcbiAgICAgIGxvYWREYXRhRnJvbVVybChudWxsLCBmdW5jdGlvbigpIHsgY29uc29sZS5sb2coJ2ZpbmlzaGVkJyk7IH0pO1xuICAgICAgbG9hZERhdGFGcm9tVXJsKG5vZGUxLCBmdW5jdGlvbigpIHsgY29uc29sZS5sb2coJ2ZpbmlzaGVkJyk7IH0pO1xuICAgKi9cblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLmxvYWREYXRhRnJvbVVybCA9IGZ1bmN0aW9uKHBhcmFtMSwgcGFyYW0yLCBwYXJhbTMpIHtcbiAgICBpZiAoJC50eXBlKHBhcmFtMSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9sb2FkRGF0YUZyb21VcmwocGFyYW0xLCBwYXJhbTIsIHBhcmFtMyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xvYWREYXRhRnJvbVVybChudWxsLCBwYXJhbTEsIHBhcmFtMik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5yZWxvYWQgPSBmdW5jdGlvbihvbl9maW5pc2hlZCkge1xuICAgIHRoaXMuX2xvYWREYXRhRnJvbVVybChudWxsLCBudWxsLCBvbl9maW5pc2hlZCk7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLl9sb2FkRGF0YUZyb21VcmwgPSBmdW5jdGlvbih1cmxfaW5mbywgcGFyZW50X25vZGUsIG9uX2ZpbmlzaGVkKSB7XG4gICAgdmFyICRlbCwgYWRkTG9hZGluZ0NsYXNzLCBoYW5kZUxvYWREYXRhLCBoYW5kbGVFcnJvciwgaGFuZGxlU3VjY2VzcywgbG9hZERhdGFGcm9tVXJsSW5mbywgcGFyc2VVcmxJbmZvLCByZW1vdmVMb2FkaW5nQ2xhc3M7XG4gICAgJGVsID0gbnVsbDtcbiAgICBhZGRMb2FkaW5nQ2xhc3MgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHBhcmVudF9ub2RlKSB7XG4gICAgICAgICAgJGVsID0gJChwYXJlbnRfbm9kZS5lbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZWwgPSBfdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgICRlbC5hZGRDbGFzcygnanF0cmVlLWxvYWRpbmcnKTtcbiAgICAgICAgcmV0dXJuIF90aGlzLl9ub3RpZnlMb2FkaW5nKHRydWUsIHBhcmVudF9ub2RlLCAkZWwpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICByZW1vdmVMb2FkaW5nQ2xhc3MgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCRlbCkge1xuICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnanF0cmVlLWxvYWRpbmcnKTtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuX25vdGlmeUxvYWRpbmcoZmFsc2UsIHBhcmVudF9ub2RlLCAkZWwpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIHBhcnNlVXJsSW5mbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCQudHlwZSh1cmxfaW5mbykgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdXJsOiB1cmxfaW5mb1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKCF1cmxfaW5mby5tZXRob2QpIHtcbiAgICAgICAgdXJsX2luZm8ubWV0aG9kID0gJ2dldCc7XG4gICAgICB9XG4gICAgICByZXR1cm4gdXJsX2luZm87XG4gICAgfTtcbiAgICBoYW5kZUxvYWREYXRhID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZW1vdmVMb2FkaW5nQ2xhc3MoKTtcbiAgICAgICAgX3RoaXMuX2xvYWREYXRhKGRhdGEsIHBhcmVudF9ub2RlKTtcbiAgICAgICAgaWYgKG9uX2ZpbmlzaGVkICYmICQuaXNGdW5jdGlvbihvbl9maW5pc2hlZCkpIHtcbiAgICAgICAgICByZXR1cm4gb25fZmluaXNoZWQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICBoYW5kbGVTdWNjZXNzID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIGlmICgkLmlzQXJyYXkocmVzcG9uc2UpIHx8IHR5cGVvZiByZXNwb25zZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBkYXRhID0gcmVzcG9uc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgZGF0YSA9ICQucGFyc2VKU09OKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuZGF0YUZpbHRlcikge1xuICAgICAgICAgIGRhdGEgPSBfdGhpcy5vcHRpb25zLmRhdGFGaWx0ZXIoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhbmRlTG9hZERhdGEoZGF0YSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGhhbmRsZUVycm9yID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmVtb3ZlTG9hZGluZ0NsYXNzKCk7XG4gICAgICAgIGlmIChfdGhpcy5vcHRpb25zLm9uTG9hZEZhaWxlZCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5vcHRpb25zLm9uTG9hZEZhaWxlZChyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgbG9hZERhdGFGcm9tVXJsSW5mbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdXJsX2luZm8gPSBwYXJzZVVybEluZm8oKTtcbiAgICAgIHJldHVybiAkLmFqYXgoJC5leHRlbmQoe30sIHVybF9pbmZvLCB7XG4gICAgICAgIG1ldGhvZDogdXJsX2luZm8ubWV0aG9kICE9IG51bGwgPyB1cmxfaW5mby5tZXRob2QudG9VcHBlckNhc2UoKSA6ICdHRVQnLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IGhhbmRsZVN1Y2Nlc3MsXG4gICAgICAgIGVycm9yOiBoYW5kbGVFcnJvclxuICAgICAgfSkpO1xuICAgIH07XG4gICAgaWYgKCF1cmxfaW5mbykge1xuICAgICAgdXJsX2luZm8gPSB0aGlzLl9nZXREYXRhVXJsSW5mbyhwYXJlbnRfbm9kZSk7XG4gICAgfVxuICAgIGFkZExvYWRpbmdDbGFzcygpO1xuICAgIGlmICghdXJsX2luZm8pIHtcbiAgICAgIHJlbW92ZUxvYWRpbmdDbGFzcygpO1xuICAgIH0gZWxzZSBpZiAoJC5pc0FycmF5KHVybF9pbmZvKSkge1xuICAgICAgaGFuZGVMb2FkRGF0YSh1cmxfaW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvYWREYXRhRnJvbVVybEluZm8oKTtcbiAgICB9XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fbG9hZERhdGEgPSBmdW5jdGlvbihkYXRhLCBwYXJlbnRfbm9kZSkge1xuICAgIHZhciBkZXNlbGVjdE5vZGVzLCBsb2FkU3VidHJlZTtcbiAgICBpZiAocGFyZW50X25vZGUgPT0gbnVsbCkge1xuICAgICAgcGFyZW50X25vZGUgPSBudWxsO1xuICAgIH1cbiAgICBkZXNlbGVjdE5vZGVzID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLCBsZW4sIG4sIHNlbGVjdGVkX25vZGVzX3VuZGVyX3BhcmVudDtcbiAgICAgICAgaWYgKF90aGlzLnNlbGVjdF9ub2RlX2hhbmRsZXIpIHtcbiAgICAgICAgICBzZWxlY3RlZF9ub2Rlc191bmRlcl9wYXJlbnQgPSBfdGhpcy5zZWxlY3Rfbm9kZV9oYW5kbGVyLmdldFNlbGVjdGVkTm9kZXNVbmRlcihwYXJlbnRfbm9kZSk7XG4gICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gc2VsZWN0ZWRfbm9kZXNfdW5kZXJfcGFyZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBuID0gc2VsZWN0ZWRfbm9kZXNfdW5kZXJfcGFyZW50W2ldO1xuICAgICAgICAgICAgX3RoaXMuc2VsZWN0X25vZGVfaGFuZGxlci5yZW1vdmVGcm9tU2VsZWN0aW9uKG4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgbG9hZFN1YnRyZWUgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcGFyZW50X25vZGUubG9hZEZyb21EYXRhKGRhdGEpO1xuICAgICAgICBwYXJlbnRfbm9kZS5sb2FkX29uX2RlbWFuZCA9IGZhbHNlO1xuICAgICAgICBwYXJlbnRfbm9kZS5pc19sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBfdGhpcy5fcmVmcmVzaEVsZW1lbnRzKHBhcmVudF9ub2RlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3RyaWdnZXJFdmVudCgndHJlZS5sb2FkX2RhdGEnLCB7XG4gICAgICB0cmVlX2RhdGE6IGRhdGFcbiAgICB9KTtcbiAgICBpZiAoIXBhcmVudF9ub2RlKSB7XG4gICAgICB0aGlzLl9pbml0VHJlZShkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzZWxlY3ROb2RlcygpO1xuICAgICAgbG9hZFN1YnRyZWUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNEcmFnZ2luZygpKSB7XG4gICAgICByZXR1cm4gdGhpcy5kbmRfaGFuZGxlci5yZWZyZXNoKCk7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuZ2V0Tm9kZUJ5SWQgPSBmdW5jdGlvbihub2RlX2lkKSB7XG4gICAgcmV0dXJuIHRoaXMudHJlZS5nZXROb2RlQnlJZChub2RlX2lkKTtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLmdldE5vZGVCeU5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMudHJlZS5nZXROb2RlQnlOYW1lKG5hbWUpO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuZ2V0Tm9kZXNCeVByb3BlcnR5ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnRyZWUuZ2V0Tm9kZXNCeVByb3BlcnR5KGtleSwgdmFsdWUpO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuZ2V0Tm9kZUJ5SHRtbEVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldE5vZGUoJChlbGVtZW50KSk7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5nZXROb2RlQnlDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMudHJlZS5nZXROb2RlQnlDYWxsYmFjayhjYWxsYmFjayk7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5vcGVuTm9kZSA9IGZ1bmN0aW9uKG5vZGUsIHNsaWRlKSB7XG4gICAgaWYgKHNsaWRlID09IG51bGwpIHtcbiAgICAgIHNsaWRlID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHNsaWRlID09PSBudWxsKSB7XG4gICAgICBzbGlkZSA9IHRoaXMub3B0aW9ucy5zbGlkZTtcbiAgICB9XG4gICAgdGhpcy5fb3Blbk5vZGUobm9kZSwgc2xpZGUpO1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fb3Blbk5vZGUgPSBmdW5jdGlvbihub2RlLCBzbGlkZSwgb25fZmluaXNoZWQpIHtcbiAgICB2YXIgZG9PcGVuTm9kZSwgcGFyZW50O1xuICAgIGlmIChzbGlkZSA9PSBudWxsKSB7XG4gICAgICBzbGlkZSA9IHRydWU7XG4gICAgfVxuICAgIGRvT3Blbk5vZGUgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihfbm9kZSwgX3NsaWRlLCBfb25fZmluaXNoZWQpIHtcbiAgICAgICAgdmFyIGZvbGRlcl9lbGVtZW50O1xuICAgICAgICBmb2xkZXJfZWxlbWVudCA9IG5ldyBGb2xkZXJFbGVtZW50KF9ub2RlLCBfdGhpcyk7XG4gICAgICAgIHJldHVybiBmb2xkZXJfZWxlbWVudC5vcGVuKF9vbl9maW5pc2hlZCwgX3NsaWRlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgaWYgKG5vZGUuaXNGb2xkZXIoKSkge1xuICAgICAgaWYgKG5vZGUubG9hZF9vbl9kZW1hbmQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRGb2xkZXJPbkRlbWFuZChub2RlLCBzbGlkZSwgb25fZmluaXNoZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICBpZiAocGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgZG9PcGVuTm9kZShwYXJlbnQsIGZhbHNlLCBudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBkb09wZW5Ob2RlKG5vZGUsIHNsaWRlLCBvbl9maW5pc2hlZCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zYXZlU3RhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fbG9hZEZvbGRlck9uRGVtYW5kID0gZnVuY3Rpb24obm9kZSwgc2xpZGUsIG9uX2ZpbmlzaGVkKSB7XG4gICAgaWYgKHNsaWRlID09IG51bGwpIHtcbiAgICAgIHNsaWRlID0gdHJ1ZTtcbiAgICB9XG4gICAgbm9kZS5pc19sb2FkaW5nID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5fbG9hZERhdGFGcm9tVXJsKG51bGwsIG5vZGUsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMuX29wZW5Ob2RlKG5vZGUsIHNsaWRlLCBvbl9maW5pc2hlZCk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLmNsb3NlTm9kZSA9IGZ1bmN0aW9uKG5vZGUsIHNsaWRlKSB7XG4gICAgaWYgKHNsaWRlID09IG51bGwpIHtcbiAgICAgIHNsaWRlID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHNsaWRlID09PSBudWxsKSB7XG4gICAgICBzbGlkZSA9IHRoaXMub3B0aW9ucy5zbGlkZTtcbiAgICB9XG4gICAgaWYgKG5vZGUuaXNGb2xkZXIoKSkge1xuICAgICAgbmV3IEZvbGRlckVsZW1lbnQobm9kZSwgdGhpcykuY2xvc2Uoc2xpZGUpO1xuICAgICAgdGhpcy5fc2F2ZVN0YXRlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5pc0RyYWdnaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuZG5kX2hhbmRsZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmRuZF9oYW5kbGVyLmlzX2RyYWdnaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUucmVmcmVzaEhpdEFyZWFzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kbmRfaGFuZGxlci5yZWZyZXNoKCk7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLmFkZE5vZGVBZnRlciA9IGZ1bmN0aW9uKG5ld19ub2RlX2luZm8sIGV4aXN0aW5nX25vZGUpIHtcbiAgICB2YXIgbmV3X25vZGU7XG4gICAgbmV3X25vZGUgPSBleGlzdGluZ19ub2RlLmFkZEFmdGVyKG5ld19ub2RlX2luZm8pO1xuICAgIHRoaXMuX3JlZnJlc2hFbGVtZW50cyhleGlzdGluZ19ub2RlLnBhcmVudCk7XG4gICAgcmV0dXJuIG5ld19ub2RlO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuYWRkTm9kZUJlZm9yZSA9IGZ1bmN0aW9uKG5ld19ub2RlX2luZm8sIGV4aXN0aW5nX25vZGUpIHtcbiAgICB2YXIgbmV3X25vZGU7XG4gICAgbmV3X25vZGUgPSBleGlzdGluZ19ub2RlLmFkZEJlZm9yZShuZXdfbm9kZV9pbmZvKTtcbiAgICB0aGlzLl9yZWZyZXNoRWxlbWVudHMoZXhpc3Rpbmdfbm9kZS5wYXJlbnQpO1xuICAgIHJldHVybiBuZXdfbm9kZTtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLmFkZFBhcmVudE5vZGUgPSBmdW5jdGlvbihuZXdfbm9kZV9pbmZvLCBleGlzdGluZ19ub2RlKSB7XG4gICAgdmFyIG5ld19ub2RlO1xuICAgIG5ld19ub2RlID0gZXhpc3Rpbmdfbm9kZS5hZGRQYXJlbnQobmV3X25vZGVfaW5mbyk7XG4gICAgdGhpcy5fcmVmcmVzaEVsZW1lbnRzKG5ld19ub2RlLnBhcmVudCk7XG4gICAgcmV0dXJuIG5ld19ub2RlO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUucmVtb3ZlTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgcGFyZW50O1xuICAgIHBhcmVudCA9IG5vZGUucGFyZW50O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMuc2VsZWN0X25vZGVfaGFuZGxlci5yZW1vdmVGcm9tU2VsZWN0aW9uKG5vZGUsIHRydWUpO1xuICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX3JlZnJlc2hFbGVtZW50cyhwYXJlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuYXBwZW5kTm9kZSA9IGZ1bmN0aW9uKG5ld19ub2RlX2luZm8sIHBhcmVudF9ub2RlKSB7XG4gICAgdmFyIG5vZGU7XG4gICAgcGFyZW50X25vZGUgPSBwYXJlbnRfbm9kZSB8fCB0aGlzLnRyZWU7XG4gICAgbm9kZSA9IHBhcmVudF9ub2RlLmFwcGVuZChuZXdfbm9kZV9pbmZvKTtcbiAgICB0aGlzLl9yZWZyZXNoRWxlbWVudHMocGFyZW50X25vZGUpO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUucHJlcGVuZE5vZGUgPSBmdW5jdGlvbihuZXdfbm9kZV9pbmZvLCBwYXJlbnRfbm9kZSkge1xuICAgIHZhciBub2RlO1xuICAgIGlmICghcGFyZW50X25vZGUpIHtcbiAgICAgIHBhcmVudF9ub2RlID0gdGhpcy50cmVlO1xuICAgIH1cbiAgICBub2RlID0gcGFyZW50X25vZGUucHJlcGVuZChuZXdfbm9kZV9pbmZvKTtcbiAgICB0aGlzLl9yZWZyZXNoRWxlbWVudHMocGFyZW50X25vZGUpO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUudXBkYXRlTm9kZSA9IGZ1bmN0aW9uKG5vZGUsIGRhdGEpIHtcbiAgICB2YXIgaWRfaXNfY2hhbmdlZDtcbiAgICBpZF9pc19jaGFuZ2VkID0gZGF0YS5pZCAmJiBkYXRhLmlkICE9PSBub2RlLmlkO1xuICAgIGlmIChpZF9pc19jaGFuZ2VkKSB7XG4gICAgICB0aGlzLnRyZWUucmVtb3ZlTm9kZUZyb21JbmRleChub2RlKTtcbiAgICB9XG4gICAgbm9kZS5zZXREYXRhKGRhdGEpO1xuICAgIGlmIChpZF9pc19jaGFuZ2VkKSB7XG4gICAgICB0aGlzLnRyZWUuYWRkTm9kZVRvSW5kZXgobm9kZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgZGF0YS5jaGlsZHJlbiAmJiBkYXRhLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgbm9kZS5yZW1vdmVDaGlsZHJlbigpO1xuICAgICAgbm9kZS5sb2FkRnJvbURhdGEoZGF0YS5jaGlsZHJlbik7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyRnJvbU5vZGUobm9kZSk7XG4gICAgdGhpcy5fc2VsZWN0Q3VycmVudE5vZGUoKTtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUubW92ZU5vZGUgPSBmdW5jdGlvbihub2RlLCB0YXJnZXRfbm9kZSwgcG9zaXRpb24pIHtcbiAgICB2YXIgcG9zaXRpb25faW5kZXg7XG4gICAgcG9zaXRpb25faW5kZXggPSBQb3NpdGlvbi5uYW1lVG9JbmRleChwb3NpdGlvbik7XG4gICAgdGhpcy50cmVlLm1vdmVOb2RlKG5vZGUsIHRhcmdldF9ub2RlLCBwb3NpdGlvbl9pbmRleCk7XG4gICAgdGhpcy5fcmVmcmVzaEVsZW1lbnRzKCk7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLmdldFN0YXRlRnJvbVN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zYXZlX3N0YXRlX2hhbmRsZXIuZ2V0U3RhdGVGcm9tU3RvcmFnZSgpO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuYWRkVG9TZWxlY3Rpb24gPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0X25vZGVfaGFuZGxlci5hZGRUb1NlbGVjdGlvbihub2RlKTtcbiAgICAgIHRoaXMuX2dldE5vZGVFbGVtZW50Rm9yTm9kZShub2RlKS5zZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NhdmVTdGF0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuZ2V0U2VsZWN0ZWROb2RlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdF9ub2RlX2hhbmRsZXIuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuaXNOb2RlU2VsZWN0ZWQgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0X25vZGVfaGFuZGxlci5pc05vZGVTZWxlY3RlZChub2RlKTtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLnJlbW92ZUZyb21TZWxlY3Rpb24gPSBmdW5jdGlvbihub2RlKSB7XG4gICAgdGhpcy5zZWxlY3Rfbm9kZV9oYW5kbGVyLnJlbW92ZUZyb21TZWxlY3Rpb24obm9kZSk7XG4gICAgdGhpcy5fZ2V0Tm9kZUVsZW1lbnRGb3JOb2RlKG5vZGUpLmRlc2VsZWN0KCk7XG4gICAgdGhpcy5fc2F2ZVN0YXRlKCk7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLnNjcm9sbFRvTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgJGVsZW1lbnQsIHRvcDtcbiAgICAkZWxlbWVudCA9ICQobm9kZS5lbGVtZW50KTtcbiAgICB0b3AgPSAkZWxlbWVudC5vZmZzZXQoKS50b3AgLSB0aGlzLiRlbC5vZmZzZXQoKS50b3A7XG4gICAgdGhpcy5zY3JvbGxfaGFuZGxlci5zY3JvbGxUbyh0b3ApO1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNhdmVfc3RhdGVfaGFuZGxlci5nZXRTdGF0ZSgpO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgIHRoaXMuc2F2ZV9zdGF0ZV9oYW5kbGVyLnNldEluaXRpYWxTdGF0ZShzdGF0ZSk7XG4gICAgdGhpcy5fcmVmcmVzaEVsZW1lbnRzKCk7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLnNldE9wdGlvbiA9IGZ1bmN0aW9uKG9wdGlvbiwgdmFsdWUpIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5tb3ZlRG93biA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmtleV9oYW5kbGVyKSB7XG4gICAgICB0aGlzLmtleV9oYW5kbGVyLm1vdmVEb3duKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5tb3ZlVXAgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5rZXlfaGFuZGxlcikge1xuICAgICAgdGhpcy5rZXlfaGFuZGxlci5tb3ZlVXAoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLmdldFZlcnNpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gX192ZXJzaW9uX187XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIEpxVHJlZVdpZGdldC5fX3N1cGVyX18uX2luaXQuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLiRlbDtcbiAgICB0aGlzLm1vdXNlX2RlbGF5ID0gMzAwO1xuICAgIHRoaXMuaXNfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMucnRsID0gdGhpcy5fZ2V0UnRsT3B0aW9uKCk7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2xvc2VkSWNvbikge1xuICAgICAgdGhpcy5vcHRpb25zLmNsb3NlZEljb24gPSB0aGlzLl9nZXREZWZhdWx0Q2xvc2VkSWNvbigpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IEVsZW1lbnRzUmVuZGVyZXIodGhpcyk7XG4gICAgaWYgKFNhdmVTdGF0ZUhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zYXZlX3N0YXRlX2hhbmRsZXIgPSBuZXcgU2F2ZVN0YXRlSGFuZGxlcih0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zLnNhdmVTdGF0ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoU2VsZWN0Tm9kZUhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZWxlY3Rfbm9kZV9oYW5kbGVyID0gbmV3IFNlbGVjdE5vZGVIYW5kbGVyKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoRHJhZ0FuZERyb3BIYW5kbGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZG5kX2hhbmRsZXIgPSBuZXcgRHJhZ0FuZERyb3BIYW5kbGVyKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJhZ0FuZERyb3AgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFNjcm9sbEhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zY3JvbGxfaGFuZGxlciA9IG5ldyBTY3JvbGxIYW5kbGVyKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoKEtleUhhbmRsZXIgIT0gbnVsbCkgJiYgKFNlbGVjdE5vZGVIYW5kbGVyICE9IG51bGwpKSB7XG4gICAgICB0aGlzLmtleV9oYW5kbGVyID0gbmV3IEtleUhhbmRsZXIodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX2luaXREYXRhKCk7XG4gICAgdGhpcy5lbGVtZW50LmNsaWNrKCQucHJveHkodGhpcy5fY2xpY2ssIHRoaXMpKTtcbiAgICB0aGlzLmVsZW1lbnQuZGJsY2xpY2soJC5wcm94eSh0aGlzLl9kYmxjbGljaywgdGhpcykpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlQ29udGV4dE1lbnUpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuYmluZCgnY29udGV4dG1lbnUnLCAkLnByb3h5KHRoaXMuX2NvbnRleHRtZW51LCB0aGlzKSk7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX2RlaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZWxlbWVudC5lbXB0eSgpO1xuICAgIHRoaXMuZWxlbWVudC51bmJpbmQoKTtcbiAgICBpZiAodGhpcy5rZXlfaGFuZGxlcikge1xuICAgICAgdGhpcy5rZXlfaGFuZGxlci5kZWluaXQoKTtcbiAgICB9XG4gICAgdGhpcy50cmVlID0gbnVsbDtcbiAgICByZXR1cm4gSnFUcmVlV2lkZ2V0Ll9fc3VwZXJfXy5fZGVpbml0LmNhbGwodGhpcyk7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5faW5pdERhdGEgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLl9sb2FkRGF0YSh0aGlzLm9wdGlvbnMuZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9sb2FkRGF0YUZyb21VcmwodGhpcy5fZ2V0RGF0YVVybEluZm8oKSk7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX2dldERhdGFVcmxJbmZvID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciBkYXRhX3VybCwgZ2V0VXJsRnJvbVN0cmluZztcbiAgICBkYXRhX3VybCA9IHRoaXMub3B0aW9ucy5kYXRhVXJsIHx8IHRoaXMuZWxlbWVudC5kYXRhKCd1cmwnKTtcbiAgICBnZXRVcmxGcm9tU3RyaW5nID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhLCBzZWxlY3RlZF9ub2RlX2lkLCB1cmxfaW5mbztcbiAgICAgICAgdXJsX2luZm8gPSB7XG4gICAgICAgICAgdXJsOiBkYXRhX3VybFxuICAgICAgICB9O1xuICAgICAgICBpZiAobm9kZSAmJiBub2RlLmlkKSB7XG4gICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIG5vZGU6IG5vZGUuaWRcbiAgICAgICAgICB9O1xuICAgICAgICAgIHVybF9pbmZvWydkYXRhJ10gPSBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdGVkX25vZGVfaWQgPSBfdGhpcy5fZ2V0Tm9kZUlkVG9CZVNlbGVjdGVkKCk7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkX25vZGVfaWQpIHtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHNlbGVjdGVkX25vZGU6IHNlbGVjdGVkX25vZGVfaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB1cmxfaW5mb1snZGF0YSddID0gZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybF9pbmZvO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICBpZiAoJC5pc0Z1bmN0aW9uKGRhdGFfdXJsKSkge1xuICAgICAgcmV0dXJuIGRhdGFfdXJsKG5vZGUpO1xuICAgIH0gZWxzZSBpZiAoJC50eXBlKGRhdGFfdXJsKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBnZXRVcmxGcm9tU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRhX3VybDtcbiAgICB9XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fZ2V0Tm9kZUlkVG9CZVNlbGVjdGVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zYXZlU3RhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNhdmVfc3RhdGVfaGFuZGxlci5nZXROb2RlSWRUb0JlU2VsZWN0ZWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX2luaXRUcmVlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBkb0luaXQsIG11c3RfbG9hZF9vbl9kZW1hbmQ7XG4gICAgZG9Jbml0ID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghX3RoaXMuaXNfaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICBfdGhpcy5pc19pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLl90cmlnZ2VyRXZlbnQoJ3RyZWUuaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIHRoaXMudHJlZSA9IG5ldyB0aGlzLm9wdGlvbnMubm9kZUNsYXNzKG51bGwsIHRydWUsIHRoaXMub3B0aW9ucy5ub2RlQ2xhc3MpO1xuICAgIGlmICh0aGlzLnNlbGVjdF9ub2RlX2hhbmRsZXIpIHtcbiAgICAgIHRoaXMuc2VsZWN0X25vZGVfaGFuZGxlci5jbGVhcigpO1xuICAgIH1cbiAgICB0aGlzLnRyZWUubG9hZEZyb21EYXRhKGRhdGEpO1xuICAgIG11c3RfbG9hZF9vbl9kZW1hbmQgPSB0aGlzLl9zZXRJbml0aWFsU3RhdGUoKTtcbiAgICB0aGlzLl9yZWZyZXNoRWxlbWVudHMoKTtcbiAgICBpZiAoIW11c3RfbG9hZF9vbl9kZW1hbmQpIHtcbiAgICAgIHJldHVybiBkb0luaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX3NldEluaXRpYWxTdGF0ZU9uRGVtYW5kKGRvSW5pdCk7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX3NldEluaXRpYWxTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhdXRvT3Blbk5vZGVzLCBpc19yZXN0b3JlZCwgbXVzdF9sb2FkX29uX2RlbWFuZCwgcmVmMSwgcmVzdG9yZVN0YXRlO1xuICAgIHJlc3RvcmVTdGF0ZSA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXVzdF9sb2FkX29uX2RlbWFuZCwgc3RhdGU7XG4gICAgICAgIGlmICghKF90aGlzLm9wdGlvbnMuc2F2ZVN0YXRlICYmIF90aGlzLnNhdmVfc3RhdGVfaGFuZGxlcikpIHtcbiAgICAgICAgICByZXR1cm4gW2ZhbHNlLCBmYWxzZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUgPSBfdGhpcy5zYXZlX3N0YXRlX2hhbmRsZXIuZ2V0U3RhdGVGcm9tU3RvcmFnZSgpO1xuICAgICAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBbZmFsc2UsIGZhbHNlXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbXVzdF9sb2FkX29uX2RlbWFuZCA9IF90aGlzLnNhdmVfc3RhdGVfaGFuZGxlci5zZXRJbml0aWFsU3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIFt0cnVlLCBtdXN0X2xvYWRfb25fZGVtYW5kXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgYXV0b09wZW5Ob2RlcyA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWF4X2xldmVsLCBtdXN0X2xvYWRfb25fZGVtYW5kO1xuICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5hdXRvT3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbWF4X2xldmVsID0gX3RoaXMuX2dldEF1dG9PcGVuTWF4TGV2ZWwoKTtcbiAgICAgICAgbXVzdF9sb2FkX29uX2RlbWFuZCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy50cmVlLml0ZXJhdGUoZnVuY3Rpb24obm9kZSwgbGV2ZWwpIHtcbiAgICAgICAgICBpZiAobm9kZS5sb2FkX29uX2RlbWFuZCkge1xuICAgICAgICAgICAgbXVzdF9sb2FkX29uX2RlbWFuZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmICghbm9kZS5oYXNDaGlsZHJlbigpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuaXNfb3BlbiA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbGV2ZWwgIT09IG1heF9sZXZlbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbXVzdF9sb2FkX29uX2RlbWFuZDtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgcmVmMSA9IHJlc3RvcmVTdGF0ZSgpLCBpc19yZXN0b3JlZCA9IHJlZjFbMF0sIG11c3RfbG9hZF9vbl9kZW1hbmQgPSByZWYxWzFdO1xuICAgIGlmICghaXNfcmVzdG9yZWQpIHtcbiAgICAgIG11c3RfbG9hZF9vbl9kZW1hbmQgPSBhdXRvT3Blbk5vZGVzKCk7XG4gICAgfVxuICAgIHJldHVybiBtdXN0X2xvYWRfb25fZGVtYW5kO1xuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX3NldEluaXRpYWxTdGF0ZU9uRGVtYW5kID0gZnVuY3Rpb24oY2JfZmluaXNoZWQpIHtcbiAgICB2YXIgYXV0b09wZW5Ob2RlcywgcmVzdG9yZVN0YXRlO1xuICAgIHJlc3RvcmVTdGF0ZSA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RhdGU7XG4gICAgICAgIGlmICghKF90aGlzLm9wdGlvbnMuc2F2ZVN0YXRlICYmIF90aGlzLnNhdmVfc3RhdGVfaGFuZGxlcikpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUgPSBfdGhpcy5zYXZlX3N0YXRlX2hhbmRsZXIuZ2V0U3RhdGVGcm9tU3RvcmFnZSgpO1xuICAgICAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuc2F2ZV9zdGF0ZV9oYW5kbGVyLnNldEluaXRpYWxTdGF0ZU9uRGVtYW5kKHN0YXRlLCBjYl9maW5pc2hlZCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgYXV0b09wZW5Ob2RlcyA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbG9hZEFuZE9wZW5Ob2RlLCBsb2FkaW5nX2NvdW50LCBtYXhfbGV2ZWwsIG9wZW5Ob2RlcztcbiAgICAgICAgbWF4X2xldmVsID0gX3RoaXMuX2dldEF1dG9PcGVuTWF4TGV2ZWwoKTtcbiAgICAgICAgbG9hZGluZ19jb3VudCA9IDA7XG4gICAgICAgIGxvYWRBbmRPcGVuTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBsb2FkaW5nX2NvdW50ICs9IDE7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLl9vcGVuTm9kZShub2RlLCBmYWxzZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2FkaW5nX2NvdW50IC09IDE7XG4gICAgICAgICAgICByZXR1cm4gb3Blbk5vZGVzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIG9wZW5Ob2RlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLnRyZWUuaXRlcmF0ZShmdW5jdGlvbihub2RlLCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKG5vZGUubG9hZF9vbl9kZW1hbmQpIHtcbiAgICAgICAgICAgICAgaWYgKCFub2RlLmlzX2xvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICBsb2FkQW5kT3Blbk5vZGUobm9kZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuX29wZW5Ob2RlKG5vZGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGxldmVsICE9PSBtYXhfbGV2ZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGxvYWRpbmdfY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjYl9maW5pc2hlZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG9wZW5Ob2RlcygpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICBpZiAoIXJlc3RvcmVTdGF0ZSgpKSB7XG4gICAgICByZXR1cm4gYXV0b09wZW5Ob2RlcygpO1xuICAgIH1cbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLl9nZXRBdXRvT3Blbk1heExldmVsID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5vcHRpb25zLmF1dG9PcGVuKTtcbiAgICB9XG4gIH07XG5cblxuICAvKlxuICBSZWRyYXcgdGhlIHRyZWUgb3IgcGFydCBvZiB0aGUgdHJlZS5cbiAgICogZnJvbV9ub2RlOiByZWRyYXcgdGhpcyBzdWJ0cmVlXG4gICAqL1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX3JlZnJlc2hFbGVtZW50cyA9IGZ1bmN0aW9uKGZyb21fbm9kZSkge1xuICAgIGlmIChmcm9tX25vZGUgPT0gbnVsbCkge1xuICAgICAgZnJvbV9ub2RlID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoZnJvbV9ub2RlKTtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlckV2ZW50KCd0cmVlLnJlZnJlc2gnKTtcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLl9jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgY2xpY2tfdGFyZ2V0LCBldmVudCwgbm9kZTtcbiAgICBjbGlja190YXJnZXQgPSB0aGlzLl9nZXRDbGlja1RhcmdldChlLnRhcmdldCk7XG4gICAgaWYgKGNsaWNrX3RhcmdldCkge1xuICAgICAgaWYgKGNsaWNrX3RhcmdldC50eXBlID09PSAnYnV0dG9uJykge1xuICAgICAgICB0aGlzLnRvZ2dsZShjbGlja190YXJnZXQubm9kZSwgdGhpcy5vcHRpb25zLnNsaWRlKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0gZWxzZSBpZiAoY2xpY2tfdGFyZ2V0LnR5cGUgPT09ICdsYWJlbCcpIHtcbiAgICAgICAgbm9kZSA9IGNsaWNrX3RhcmdldC5ub2RlO1xuICAgICAgICBldmVudCA9IHRoaXMuX3RyaWdnZXJFdmVudCgndHJlZS5jbGljaycsIHtcbiAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgIGNsaWNrX2V2ZW50OiBlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE5vZGUobm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fZGJsY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGNsaWNrX3RhcmdldDtcbiAgICBjbGlja190YXJnZXQgPSB0aGlzLl9nZXRDbGlja1RhcmdldChlLnRhcmdldCk7XG4gICAgaWYgKGNsaWNrX3RhcmdldCAmJiBjbGlja190YXJnZXQudHlwZSA9PT0gJ2xhYmVsJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJFdmVudCgndHJlZS5kYmxjbGljaycsIHtcbiAgICAgICAgbm9kZTogY2xpY2tfdGFyZ2V0Lm5vZGUsXG4gICAgICAgIGNsaWNrX2V2ZW50OiBlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fZ2V0Q2xpY2tUYXJnZXQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgdmFyICRidXR0b24sICRlbCwgJHRhcmdldCwgbm9kZTtcbiAgICAkdGFyZ2V0ID0gJChlbGVtZW50KTtcbiAgICAkYnV0dG9uID0gJHRhcmdldC5jbG9zZXN0KCcuanF0cmVlLXRvZ2dsZXInKTtcbiAgICBpZiAoJGJ1dHRvbi5sZW5ndGgpIHtcbiAgICAgIG5vZGUgPSB0aGlzLl9nZXROb2RlKCRidXR0b24pO1xuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICBub2RlOiBub2RlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICRlbCA9ICR0YXJnZXQuY2xvc2VzdCgnLmpxdHJlZS1lbGVtZW50Jyk7XG4gICAgICBpZiAoJGVsLmxlbmd0aCkge1xuICAgICAgICBub2RlID0gdGhpcy5fZ2V0Tm9kZSgkZWwpO1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICAgICAgbm9kZTogbm9kZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fZ2V0Tm9kZSA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gICAgdmFyICRsaTtcbiAgICAkbGkgPSAkZWxlbWVudC5jbG9zZXN0KCdsaS5qcXRyZWVfY29tbW9uJyk7XG4gICAgaWYgKCRsaS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJGxpLmRhdGEoJ25vZGUnKTtcbiAgICB9XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fZ2V0Tm9kZUVsZW1lbnRGb3JOb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLmlzRm9sZGVyKCkpIHtcbiAgICAgIHJldHVybiBuZXcgRm9sZGVyRWxlbWVudChub2RlLCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBOb2RlRWxlbWVudChub2RlLCB0aGlzKTtcbiAgICB9XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fZ2V0Tm9kZUVsZW1lbnQgPSBmdW5jdGlvbigkZWxlbWVudCkge1xuICAgIHZhciBub2RlO1xuICAgIG5vZGUgPSB0aGlzLl9nZXROb2RlKCRlbGVtZW50KTtcbiAgICBpZiAobm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldE5vZGVFbGVtZW50Rm9yTm9kZShub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX2NvbnRleHRtZW51ID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciAkZGl2LCBub2RlO1xuICAgICRkaXYgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCd1bC5qcXRyZWUtdHJlZSAuanF0cmVlLWVsZW1lbnQnKTtcbiAgICBpZiAoJGRpdi5sZW5ndGgpIHtcbiAgICAgIG5vZGUgPSB0aGlzLl9nZXROb2RlKCRkaXYpO1xuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ3RyZWUuY29udGV4dG1lbnUnLCB7XG4gICAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgICBjbGlja19ldmVudDogZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLl9zYXZlU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnNhdmVTdGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2F2ZV9zdGF0ZV9oYW5kbGVyLnNhdmVTdGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLl9tb3VzZUNhcHR1cmUgPSBmdW5jdGlvbihwb3NpdGlvbl9pbmZvKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kcmFnQW5kRHJvcCkge1xuICAgICAgcmV0dXJuIHRoaXMuZG5kX2hhbmRsZXIubW91c2VDYXB0dXJlKHBvc2l0aW9uX2luZm8pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX21vdXNlU3RhcnQgPSBmdW5jdGlvbihwb3NpdGlvbl9pbmZvKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kcmFnQW5kRHJvcCkge1xuICAgICAgcmV0dXJuIHRoaXMuZG5kX2hhbmRsZXIubW91c2VTdGFydChwb3NpdGlvbl9pbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLl9tb3VzZURyYWcgPSBmdW5jdGlvbihwb3NpdGlvbl9pbmZvKSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRyYWdBbmREcm9wKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmRuZF9oYW5kbGVyLm1vdXNlRHJhZyhwb3NpdGlvbl9pbmZvKTtcbiAgICAgIGlmICh0aGlzLnNjcm9sbF9oYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsX2hhbmRsZXIuY2hlY2tTY3JvbGxpbmcoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fbW91c2VTdG9wID0gZnVuY3Rpb24ocG9zaXRpb25faW5mbykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZHJhZ0FuZERyb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLmRuZF9oYW5kbGVyLm1vdXNlU3RvcChwb3NpdGlvbl9pbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLl90cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbihldmVudF9uYW1lLCB2YWx1ZXMpIHtcbiAgICB2YXIgZXZlbnQ7XG4gICAgZXZlbnQgPSAkLkV2ZW50KGV2ZW50X25hbWUpO1xuICAgICQuZXh0ZW5kKGV2ZW50LCB2YWx1ZXMpO1xuICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKGV2ZW50KTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS50ZXN0R2VuZXJhdGVIaXRBcmVhcyA9IGZ1bmN0aW9uKG1vdmluZ19ub2RlKSB7XG4gICAgdGhpcy5kbmRfaGFuZGxlci5jdXJyZW50X2l0ZW0gPSB0aGlzLl9nZXROb2RlRWxlbWVudEZvck5vZGUobW92aW5nX25vZGUpO1xuICAgIHRoaXMuZG5kX2hhbmRsZXIuZ2VuZXJhdGVIaXRBcmVhcygpO1xuICAgIHJldHVybiB0aGlzLmRuZF9oYW5kbGVyLmhpdF9hcmVhcztcbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLl9zZWxlY3RDdXJyZW50Tm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBub2RlLCBub2RlX2VsZW1lbnQ7XG4gICAgbm9kZSA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlKCk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIG5vZGVfZWxlbWVudCA9IHRoaXMuX2dldE5vZGVFbGVtZW50Rm9yTm9kZShub2RlKTtcbiAgICAgIGlmIChub2RlX2VsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5vZGVfZWxlbWVudC5zZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSnFUcmVlV2lkZ2V0LnByb3RvdHlwZS5fZGVzZWxlY3RDdXJyZW50Tm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBub2RlO1xuICAgIG5vZGUgPSB0aGlzLmdldFNlbGVjdGVkTm9kZSgpO1xuICAgIGlmIChub2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZW1vdmVGcm9tU2VsZWN0aW9uKG5vZGUpO1xuICAgIH1cbiAgfTtcblxuICBKcVRyZWVXaWRnZXQucHJvdG90eXBlLl9nZXREZWZhdWx0Q2xvc2VkSWNvbiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucnRsKSB7XG4gICAgICByZXR1cm4gJyYjeDI1YzA7JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcmI3gyNWJhOyc7XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX2dldFJ0bE9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhX3J0bDtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJ0bCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ydGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFfcnRsID0gdGhpcy5lbGVtZW50LmRhdGEoJ3J0bCcpO1xuICAgICAgaWYgKChkYXRhX3J0bCAhPSBudWxsKSAmJiBkYXRhX3J0bCAhPT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIEpxVHJlZVdpZGdldC5wcm90b3R5cGUuX25vdGlmeUxvYWRpbmcgPSBmdW5jdGlvbihpc19sb2FkaW5nLCBub2RlLCAkZWwpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm9uTG9hZGluZykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5vbkxvYWRpbmcoaXNfbG9hZGluZywgbm9kZSwgJGVsKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEpxVHJlZVdpZGdldDtcblxufSkoTW91c2VXaWRnZXQpO1xuXG5KcVRyZWVXaWRnZXQuZ2V0TW9kdWxlID0gZnVuY3Rpb24obmFtZSkge1xuICB2YXIgbW9kdWxlcztcbiAgbW9kdWxlcyA9IHtcbiAgICAnbm9kZSc6IG5vZGVfbW9kdWxlLFxuICAgICd1dGlsJzogdXRpbF9tb2R1bGUsXG4gICAgJ2RyYWdfYW5kX2Ryb3BfaGFuZGxlcic6IGRyYWdfYW5kX2Ryb3BfaGFuZGxlclxuICB9O1xuICByZXR1cm4gbW9kdWxlc1tuYW1lXTtcbn07XG5cblNpbXBsZVdpZGdldC5yZWdpc3RlcihKcVRyZWVXaWRnZXQsICd0cmVlJyk7XG5cbn0se1wiLi9kcmFnX2FuZF9kcm9wX2hhbmRsZXJcIjoxLFwiLi9lbGVtZW50c19yZW5kZXJlclwiOjIsXCIuL2tleV9oYW5kbGVyXCI6MyxcIi4vbW91c2Uud2lkZ2V0XCI6NCxcIi4vbm9kZVwiOjUsXCIuL25vZGVfZWxlbWVudFwiOjYsXCIuL3NhdmVfc3RhdGVfaGFuZGxlclwiOjcsXCIuL3Njcm9sbF9oYW5kbGVyXCI6OCxcIi4vc2VsZWN0X25vZGVfaGFuZGxlclwiOjksXCIuL3NpbXBsZS53aWRnZXRcIjoxMCxcIi4vdXRpbFwiOjEyLFwiLi92ZXJzaW9uXCI6MTN9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgX2luZGV4T2YsIGdldEJvb2xTdHJpbmcsIGh0bWxfZXNjYXBlLCBpbmRleE9mLCBpc0ludDtcblxuX2luZGV4T2YgPSBmdW5jdGlvbihhcnJheSwgaXRlbSkge1xuICB2YXIgaSwgaiwgbGVuLCB2YWx1ZTtcbiAgZm9yIChpID0gaiA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaiA8IGxlbjsgaSA9ICsraikge1xuICAgIHZhbHVlID0gYXJyYXlbaV07XG4gICAgaWYgKHZhbHVlID09PSBpdGVtKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuaW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtKSB7XG4gIGlmIChhcnJheS5pbmRleE9mKSB7XG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YoaXRlbSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIF9pbmRleE9mKGFycmF5LCBpdGVtKTtcbiAgfVxufTtcblxuaXNJbnQgPSBmdW5jdGlvbihuKSB7XG4gIHJldHVybiB0eXBlb2YgbiA9PT0gJ251bWJlcicgJiYgbiAlIDEgPT09IDA7XG59O1xuXG5odG1sX2VzY2FwZSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICByZXR1cm4gKCcnICsgc3RyaW5nKS5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpLnJlcGxhY2UoLycvZywgJyYjeDI3OycpLnJlcGxhY2UoL1xcLy9nLCAnJiN4MkY7Jyk7XG59O1xuXG5nZXRCb29sU3RyaW5nID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgcmV0dXJuICd0cnVlJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJ2ZhbHNlJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIF9pbmRleE9mOiBfaW5kZXhPZixcbiAgZ2V0Qm9vbFN0cmluZzogZ2V0Qm9vbFN0cmluZyxcbiAgaHRtbF9lc2NhcGU6IGh0bWxfZXNjYXBlLFxuICBpbmRleE9mOiBpbmRleE9mLFxuICBpc0ludDogaXNJbnRcbn07XG5cbn0se31dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gJzEuMy40JztcblxufSx7fV19LHt9LFsxMV0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9