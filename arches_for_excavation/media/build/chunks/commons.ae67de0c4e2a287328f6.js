"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[19480],{

/***/ 19480:
/*!****************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/card-component.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var viewmodels_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! viewmodels/alert */ 21672);
/* harmony import */ var bindings_scrollTo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bindings/scrollTo */ 82067);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(params) {
  var _params$form, _params$form2;
  var self = this;
  if (!params.card && knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(params.form.card)) {
    params.card = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(params.form.card);
  }
  this.inResourceEditor = location.pathname.includes(arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.resource_editor);
  this.configKeys = params.configKeys || [];
  this.showIds = params.showIds || false;
  this.state = params.state || 'form';
  this.preview = params.preview;
  this.loading = params.loading || knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(false);
  this.card = params.card;
  this.showGrid = params === null || params === void 0 || (_params$form = params.form) === null || _params$form === void 0 ? void 0 : _params$form.showGrid;
  this.toggleGrid = params === null || params === void 0 || (_params$form2 = params.form) === null || _params$form2 === void 0 ? void 0 : _params$form2.toggleGrid;
  this.card.hideEmptyNodes = params.hideEmptyNodes;
  this.card.showIds = this.showIds;
  this.tile = params.tile;
  this.reportExpanded = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(true);
  this.form = params.form;
  this.provisionalTileViewModel = params.provisionalTileViewModel;
  this.reviewer = params.reviewer;
  this.expanded = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(true);
  this.showHeaderLine = params.showHeaderLine;
  this.config = this.card.model ? this.card.model.get('config') : {};
  underscore__WEBPACK_IMPORTED_MODULE_1___default().each(this.configKeys, function (key) {
    self[key] = self.config[key];
  });
  this.showChildCards = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    return this.card.widgets().length === 0;
  }, this);
  this.componentCssClasses = function (widget) {
    var _widget$node, _widget$node2;
    return ["card_component", knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap((_widget$node = widget.node) === null || _widget$node === void 0 || (_widget$node = _widget$node.graph) === null || _widget$node === void 0 || (_widget$node = _widget$node.attributes) === null || _widget$node === void 0 ? void 0 : _widget$node.slug), knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap((_widget$node2 = widget.node) === null || _widget$node2 === void 0 ? void 0 : _widget$node2.alias), widget === null || widget === void 0 ? void 0 : widget.widgetLookup[knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(widget === null || widget === void 0 ? void 0 : widget.widget_id)].name].join(" ");
  };
  this.initialize = function () {
    self.card.showForm(true);
    self.tiles = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
      var tiles = [];
      if (self.tile) {
        return self.getTiles(self.tile);
      } else {
        self.card.tiles().forEach(function (tile) {
          self.getTiles(tile, tiles);
        });
      }
      return tiles;
    }, self);
    if (knockout__WEBPACK_IMPORTED_MODULE_0___default().isObservable(params.tiles)) {
      params.tiles(self.tiles());
      self.tiles.subscribe(function (tiles) {
        params.tiles(tiles);
      });
    }
    self.cardIdentifier = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
      return self.card.model.attributes.source_identifier_id ? self.card.model.attributes.source_identifier_id : self.card.model.nodegroup_id();
    });
    self.widgetNodeIdentifier = function (widget) {
      return knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(widget.node.sourceIdentifierId) ? knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(widget.node.sourceIdentifierId) : widget.node.id;
    };
    self.dirty = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
      if (!knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(self.tiles)) {
        return true;
      } else {
        return knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(self.tiles).reduce(function (acc, tile) {
          if (tile.dirty()) {
            acc = true;
          }
          return acc;
        }, false);
      }
    });
    if (knockout__WEBPACK_IMPORTED_MODULE_0___default().isObservable(params.dirty)) {
      self.dirty.subscribe(function (dirty) {
        params.dirty(dirty);
      });
    }
    if (self.preview) {
      if (!self.card.newTile) {
        self.card.newTile = self.card.getNewTile();
      }
      self.tile = self.card.newTile;
    }
    if (self.card.tiles().length > 0) {
      self.card.showForm(false);
    }
    if (self.card.preSaveCallback) {
      self.card.preSaveCallback(self.saveTile);
    }
  };
  this.revealForm = function (card) {
    if (!card.selected()) {
      card.selected(true);
    }
    setTimeout(function () {
      card.showForm(true);
    }, 50);
  };
  this.getTiles = function (tile, tiles) {
    tiles = tiles || [tile];
    tile.cards.forEach(function (card) {
      card.tiles().forEach(function (tile) {
        tiles.push(tile);
        self.getTiles(tile, tiles);
      });
    });
    return tiles;
  };
  this.beforeMove = function (e) {
    e.cancelDrop = e.sourceParent !== e.targetParent;
  };
  this.reorderWidgets = function (e) {
    e.item.card.save(function (response, status, card) {
      if (status === 'error') {
        params.pageVm.alert(new viewmodels_alert__WEBPACK_IMPORTED_MODULE_3__["default"]('ep-alert-red', response.responseJSON.title, response.responseJSON.message, null, function () {}));
        // we can't use e.cancelDrop because of the async nature of the save
        // so we need to manually reset the order of the widgets
        // and set the selected widget to the original position
        var undoSort = function undoSort(array, sourceIndex, targetIndex) {
          var _array$splice = array.splice(targetIndex, 1),
            _array$splice2 = _slicedToArray(_array$splice, 1),
            movedItem = _array$splice2[0];
          array.splice(sourceIndex, 0, movedItem);
        };
        undoSort(self.card.widgets, e.sourceIndex, e.targetIndex);
      }
    });
  };
  this.startDrag = function (e, ui) {
    knockout__WEBPACK_IMPORTED_MODULE_0___default().utils.domData.get(ui.item[0], 'ko_sortItem').selected(true);
  };
  this.getValuesByDatatype = function (type) {
    var values = {};
    if (self.tile && self.form) {
      var data = self.tile.getAttributes().data;
      underscore__WEBPACK_IMPORTED_MODULE_1___default().each(data, function (value, key) {
        var node = self.form.nodeLookup[key];
        if (node && knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(node.datatype) === type) {
          values[knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(node.id)] = {
            name: knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(node.name),
            value: value
          };
        }
      });
    }
    return values;
  };
  this.selectWorkflowTile = function (tile) {
    // used for cardinality 'n' cards in workflows
    tile.selected(true);
    self.tile = tile;
    params.dirty(true);
  };

  // ctrl+S to save any edited/dirty tiles in resource view 
  var keyListener = function keyListener(e) {
    if (e.ctrlKey && e.key === "s") {
      var _self$tile, _self$tile2;
      e.preventDefault();
      if ((self === null || self === void 0 || (_self$tile = self.tile) === null || _self$tile === void 0 ? void 0 : _self$tile.dirty()) == true && (self === null || self === void 0 || (_self$tile2 = self.tile) === null || _self$tile2 === void 0 || (_self$tile2 = _self$tile2.parent) === null || _self$tile2 === void 0 ? void 0 : _self$tile2.isWritable) === true) {
        self.saveTile();
      }
    }
  };
  document.addEventListener("keydown", keyListener);
  // dispose of eventlistener
  this.dispose = function () {
    document.removeEventListener("keydown", keyListener);
  };
  this.saveTile = function (callback) {
    var _params$form3, _params$form4;
    self.loading(true);
    self.tile.transactionId = ((_params$form3 = params.form) === null || _params$form3 === void 0 ? void 0 : _params$form3.workflowId) || undefined;
    if (params.resourceid) {
      self.tile.resourceinstance_id = params.resourceid;
    } else if (knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap((_params$form4 = params.form) === null || _params$form4 === void 0 ? void 0 : _params$form4.resourceId)) {
      self.tile.resourceinstance_id = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(params.form.resourceId);
    }
    self.tile.save(function (response) {
      var _params$form5;
      self.loading(false);
      if (params !== null && params !== void 0 && (_params$form5 = params.form) !== null && _params$form5 !== void 0 && _params$form5.error) {
        params.form.error(response.responseJSON.message);
      }
      params.pageVm.alert(new viewmodels_alert__WEBPACK_IMPORTED_MODULE_3__["default"]('ep-alert-red', response.responseJSON.title, response.responseJSON.message, null, function () {}));
      if (params.form.onSaveError) {
        params.form.onSaveError(self.tile);
      }
    }, function () {
      self.loading(false);
      if (typeof self.onSaveSuccess === 'function') self.onSaveSuccess();
      if (params.form.onSaveSuccess) {
        params.form.onSaveSuccess(self.tile);
      }
      if (typeof callback === 'function') callback();
    });
  };
  var saveTileInWorkflow = function saveTileInWorkflow() {
    self.saveTile(function () {
      params.form.complete(true);
    });
  };
  if (params.save) {
    params.save = saveTileInWorkflow;
  }
  if (params.form && params.form.save) {
    params.form.save = saveTileInWorkflow;
  }

  /*
      TODO: Reverse this logic to be in-line with card UX in resource_editor using this logic:
              params.card && params.card.cardinality === 'n'
              && params.form.componentData.cardinalityOverride !== '1'
  */
  if (params.renderContext === 'workflow') {
    if (params.form.componentData.cardinalityOverride === 'n') {
      self.card.selected(true); // cardinality 'n' cards will display appropriately
      self.inResourceEditor = true;
    }
  }
  this.saveTileAddNew = function () {
    self.saveTile(function () {
      window.setTimeout(function () {
        self.card.selected(true);
      }, 1);
    });
  };
  this.deleteTile = function () {
    params.pageVm.alert(new viewmodels_alert__WEBPACK_IMPORTED_MODULE_3__["default"]('ep-alert-red', 'Item Deletion.', 'Are you sure you would like to delete this item?', function () {},
    //does nothing when canceled
    function () {
      self.loading(true);
      self.tile.deleteTile(function (response) {
        self.loading(false);
        params.pageVm.alert(new viewmodels_alert__WEBPACK_IMPORTED_MODULE_3__["default"]('ep-alert-red', response.responseJSON.title, response.responseJSON.message, null, function () {}));
        if (params.form.onDeleteError) {
          params.form.onDeleteError(self.tile);
        }
      }, function () {
        self.loading(false);
        if (typeof self.onDeleteSuccess === 'function') self.onDeleteSuccess();
        if (params.form.onDeleteSuccess) {
          params.form.onDeleteSuccess(self.tile);
        }
      });
    }));
  };
  this.createParentAndChild = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(parenttile, childcard) {
      var newSave, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return self.card.saveParentTile(parenttile);
          case 1:
            newSave = _context.v;
            if (newSave) {
              childcard.selected(true);
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.log(_t);
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  this.initialize();
}
;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNOLENBQUMsQ0FDTCxDQUFDO0VBQ1QsQ0FBQztFQUVELElBQUksQ0FBQ3NILG9CQUFvQjtJQUFBLElBQUFDLElBQUEsR0FBQXRLLGlCQUFBLGNBQUFiLFlBQUEsR0FBQUUsQ0FBQSxDQUFHLFNBQUFrTCxRQUFNQyxVQUFVLEVBQUVDLFNBQVM7TUFBQSxJQUFBQyxPQUFBLEVBQUFDLEVBQUE7TUFBQSxPQUFBeEwsWUFBQSxHQUFBQyxDQUFBLFdBQUF3TCxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQTdNLENBQUEsR0FBQTZNLFFBQUEsQ0FBQTFOLENBQUE7VUFBQTtZQUFBME4sUUFBQSxDQUFBN00sQ0FBQTtZQUFBNk0sUUFBQSxDQUFBMU4sQ0FBQTtZQUFBLE9BRXpCMEUsSUFBSSxDQUFDQyxJQUFJLENBQUNnSixjQUFjLENBQUNMLFVBQVUsQ0FBQztVQUFBO1lBQXBERSxPQUFPLEdBQUFFLFFBQUEsQ0FBQTFNLENBQUE7WUFDYixJQUFHd00sT0FBTyxFQUFDO2NBQ1BELFNBQVMsQ0FBQzNFLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDNUI7WUFBQzhFLFFBQUEsQ0FBQTFOLENBQUE7WUFBQTtVQUFBO1lBQUEwTixRQUFBLENBQUE3TSxDQUFBO1lBQUE0TSxFQUFBLEdBQUFDLFFBQUEsQ0FBQTFNLENBQUE7WUFFRDRNLE9BQU8sQ0FBQ0MsR0FBRyxDQUFBSixFQUFJLENBQUM7VUFBQztZQUFBLE9BQUFDLFFBQUEsQ0FBQXpNLENBQUE7UUFBQTtNQUFBLEdBQUFvTSxPQUFBO0lBQUEsQ0FFeEI7SUFBQSxpQkFBQVMsRUFBQSxFQUFBQyxHQUFBO01BQUEsT0FBQVgsSUFBQSxDQUFBcEssS0FBQSxPQUFBRCxTQUFBO0lBQUE7RUFBQTtFQUVELElBQUksQ0FBQ3dFLFVBQVUsQ0FBQyxDQUFDO0FBQ3JCO0FBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdtb2RlbHMvY2FyZC1jb21wb25lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGFyY2hlcyBmcm9tICdhcmNoZXMnO1xuaW1wb3J0IEFsZXJ0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvYWxlcnQnO1xuaW1wb3J0ICdiaW5kaW5ncy9zY3JvbGxUbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmICghcGFyYW1zLmNhcmQgJiYga28udW53cmFwKHBhcmFtcy5mb3JtLmNhcmQpKSB7XG4gICAgICAgIHBhcmFtcy5jYXJkID0ga28udW53cmFwKHBhcmFtcy5mb3JtLmNhcmQpO1xuICAgIH1cblxuICAgIHRoaXMuaW5SZXNvdXJjZUVkaXRvciA9IGxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKGFyY2hlcy51cmxzLnJlc291cmNlX2VkaXRvcik7XG4gICAgdGhpcy5jb25maWdLZXlzID0gcGFyYW1zLmNvbmZpZ0tleXMgfHwgW107XG4gICAgdGhpcy5zaG93SWRzID0gcGFyYW1zLnNob3dJZHMgfHwgZmFsc2U7XG4gICAgdGhpcy5zdGF0ZSA9IHBhcmFtcy5zdGF0ZSB8fCAnZm9ybSc7XG4gICAgdGhpcy5wcmV2aWV3ID0gcGFyYW1zLnByZXZpZXc7XG4gICAgdGhpcy5sb2FkaW5nID0gcGFyYW1zLmxvYWRpbmcgfHwga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy5jYXJkID0gcGFyYW1zLmNhcmQ7XG4gICAgdGhpcy5zaG93R3JpZCA9IHBhcmFtcz8uZm9ybT8uc2hvd0dyaWQ7XG4gICAgdGhpcy50b2dnbGVHcmlkID0gcGFyYW1zPy5mb3JtPy50b2dnbGVHcmlkO1xuICAgIHRoaXMuY2FyZC5oaWRlRW1wdHlOb2RlcyA9IHBhcmFtcy5oaWRlRW1wdHlOb2RlcztcbiAgICB0aGlzLmNhcmQuc2hvd0lkcyA9IHRoaXMuc2hvd0lkcztcbiAgICB0aGlzLnRpbGUgPSBwYXJhbXMudGlsZTtcbiAgICB0aGlzLnJlcG9ydEV4cGFuZGVkID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcbiAgICB0aGlzLmZvcm0gPSBwYXJhbXMuZm9ybTtcbiAgICB0aGlzLnByb3Zpc2lvbmFsVGlsZVZpZXdNb2RlbCA9IHBhcmFtcy5wcm92aXNpb25hbFRpbGVWaWV3TW9kZWw7XG4gICAgdGhpcy5yZXZpZXdlciA9IHBhcmFtcy5yZXZpZXdlcjtcbiAgICB0aGlzLmV4cGFuZGVkID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcbiAgICB0aGlzLnNob3dIZWFkZXJMaW5lID0gcGFyYW1zLnNob3dIZWFkZXJMaW5lO1xuXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNhcmQubW9kZWwgPyB0aGlzLmNhcmQubW9kZWwuZ2V0KCdjb25maWcnKSA6IHt9O1xuICAgIF8uZWFjaCh0aGlzLmNvbmZpZ0tleXMsIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBzZWxmLmNvbmZpZ1trZXldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaG93Q2hpbGRDYXJkcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJkLndpZGdldHMoKS5sZW5ndGggPT09IDA7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLmNvbXBvbmVudENzc0NsYXNzZXMgPSBmdW5jdGlvbih3aWRnZXQpIHtcbiAgICAgICAgcmV0dXJuIFtcImNhcmRfY29tcG9uZW50XCIsXG4gICAgICAgICAgICBrby51bndyYXAod2lkZ2V0Lm5vZGU/LmdyYXBoPy5hdHRyaWJ1dGVzPy5zbHVnKSxcbiAgICAgICAgICAgIGtvLnVud3JhcCh3aWRnZXQubm9kZT8uYWxpYXMpLFxuICAgICAgICAgICAgd2lkZ2V0Py53aWRnZXRMb29rdXBba28udW53cmFwKHdpZGdldD8ud2lkZ2V0X2lkKV0ubmFtZV0uam9pbihcIiBcIik7XG4gICAgfTtcblxuXG4gICAgdGhpcy5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuY2FyZC5zaG93Rm9ybSh0cnVlKTtcblxuICAgICAgICBzZWxmLnRpbGVzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGlsZXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChzZWxmLnRpbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5nZXRUaWxlcyhzZWxmLnRpbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNhcmQudGlsZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRUaWxlcyh0aWxlLCB0aWxlcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGlsZXM7XG4gICAgICAgIH0sIHNlbGYpO1xuICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKHBhcmFtcy50aWxlcykpIHtcbiAgICAgICAgICAgIHBhcmFtcy50aWxlcyhzZWxmLnRpbGVzKCkpO1xuXG4gICAgICAgICAgICBzZWxmLnRpbGVzLnN1YnNjcmliZShmdW5jdGlvbih0aWxlcykge1xuICAgICAgICAgICAgICAgIHBhcmFtcy50aWxlcyh0aWxlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuY2FyZElkZW50aWZpZXIgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmNhcmQubW9kZWwuYXR0cmlidXRlcy5zb3VyY2VfaWRlbnRpZmllcl9pZCA/IHNlbGYuY2FyZC5tb2RlbC5hdHRyaWJ1dGVzLnNvdXJjZV9pZGVudGlmaWVyX2lkIDogc2VsZi5jYXJkLm1vZGVsLm5vZGVncm91cF9pZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLndpZGdldE5vZGVJZGVudGlmaWVyID0gZnVuY3Rpb24od2lkZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4ga28udW53cmFwKHdpZGdldC5ub2RlLnNvdXJjZUlkZW50aWZpZXJJZCkgPyBrby51bndyYXAod2lkZ2V0Lm5vZGUuc291cmNlSWRlbnRpZmllcklkKSA6IHdpZGdldC5ub2RlLmlkO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuZGlydHkgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgha28udW53cmFwKHNlbGYudGlsZXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga28udW53cmFwKHNlbGYudGlsZXMpLnJlZHVjZShmdW5jdGlvbihhY2MsIHRpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbGUuZGlydHkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChrby5pc09ic2VydmFibGUocGFyYW1zLmRpcnR5KSkge1xuICAgICAgICAgICAgc2VsZi5kaXJ0eS5zdWJzY3JpYmUoZnVuY3Rpb24oZGlydHkpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuZGlydHkoZGlydHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChzZWxmLnByZXZpZXcpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5jYXJkLm5ld1RpbGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNhcmQubmV3VGlsZSA9IHNlbGYuY2FyZC5nZXROZXdUaWxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnRpbGUgPSBzZWxmLmNhcmQubmV3VGlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLmNhcmQudGlsZXMoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZWxmLmNhcmQuc2hvd0Zvcm0oZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuY2FyZC5wcmVTYXZlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHNlbGYuY2FyZC5wcmVTYXZlQ2FsbGJhY2soc2VsZi5zYXZlVGlsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yZXZlYWxGb3JtID0gZnVuY3Rpb24oY2FyZCl7XG4gICAgICAgIGlmICghY2FyZC5zZWxlY3RlZCgpKSB7Y2FyZC5zZWxlY3RlZCh0cnVlKTt9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNhcmQuc2hvd0Zvcm0odHJ1ZSk7XG4gICAgICAgIH0sIDUwKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRUaWxlcyA9IGZ1bmN0aW9uKHRpbGUsIHRpbGVzKSB7XG4gICAgICAgIHRpbGVzID0gdGlsZXMgfHwgW3RpbGVdO1xuICAgICAgICB0aWxlLmNhcmRzLmZvckVhY2goZnVuY3Rpb24oY2FyZCkge1xuICAgICAgICAgICAgY2FyZC50aWxlcygpLmZvckVhY2goZnVuY3Rpb24odGlsZSkge1xuICAgICAgICAgICAgICAgIHRpbGVzLnB1c2godGlsZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5nZXRUaWxlcyh0aWxlLCB0aWxlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aWxlcztcbiAgICB9O1xuXG4gICAgdGhpcy5iZWZvcmVNb3ZlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLmNhbmNlbERyb3AgPSAoZS5zb3VyY2VQYXJlbnQhPT1lLnRhcmdldFBhcmVudCk7XG4gICAgfTtcblxuICAgIHRoaXMucmVvcmRlcldpZGdldHMgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuaXRlbS5jYXJkLnNhdmUoZnVuY3Rpb24ocmVzcG9uc2UsIHN0YXR1cywgY2FyZCkge1xuICAgICAgICAgICAgaWYoc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLnBhZ2VWbS5hbGVydChcbiAgICAgICAgICAgICAgICAgICAgbmV3IEFsZXJ0Vmlld01vZGVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2VwLWFsZXJ0LXJlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5yZXNwb25zZUpTT04udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpe31cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgLy8gd2UgY2FuJ3QgdXNlIGUuY2FuY2VsRHJvcCBiZWNhdXNlIG9mIHRoZSBhc3luYyBuYXR1cmUgb2YgdGhlIHNhdmVcbiAgICAgICAgICAgICAgICAvLyBzbyB3ZSBuZWVkIHRvIG1hbnVhbGx5IHJlc2V0IHRoZSBvcmRlciBvZiB0aGUgd2lkZ2V0c1xuICAgICAgICAgICAgICAgIC8vIGFuZCBzZXQgdGhlIHNlbGVjdGVkIHdpZGdldCB0byB0aGUgb3JpZ2luYWwgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBjb25zdCB1bmRvU29ydCA9IChhcnJheSwgc291cmNlSW5kZXgsIHRhcmdldEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFttb3ZlZEl0ZW1dID0gYXJyYXkuc3BsaWNlKHRhcmdldEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKHNvdXJjZUluZGV4LCAwLCBtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdW5kb1NvcnQoc2VsZi5jYXJkLndpZGdldHMsIGUuc291cmNlSW5kZXgsIGUudGFyZ2V0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdGFydERyYWcgPSBmdW5jdGlvbihlLCB1aSkge1xuICAgICAgICBrby51dGlscy5kb21EYXRhLmdldCh1aS5pdGVtWzBdLCAna29fc29ydEl0ZW0nKS5zZWxlY3RlZCh0cnVlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRWYWx1ZXNCeURhdGF0eXBlID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB2YXIgdmFsdWVzID0ge307XG4gICAgICAgIGlmIChzZWxmLnRpbGUgJiYgc2VsZi5mb3JtKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNlbGYudGlsZS5nZXRBdHRyaWJ1dGVzKCkuZGF0YTtcbiAgICAgICAgICAgIF8uZWFjaChkYXRhLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBzZWxmLmZvcm0ubm9kZUxvb2t1cFtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChub2RlICYmIGtvLnVud3JhcChub2RlLmRhdGF0eXBlKSA9PT0gdHlwZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1trby51bndyYXAobm9kZS5pZCldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZToga28udW53cmFwKG5vZGUubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH07XG5cbiAgICB0aGlzLnNlbGVjdFdvcmtmbG93VGlsZSA9IGZ1bmN0aW9uKHRpbGUpIHsgIC8vIHVzZWQgZm9yIGNhcmRpbmFsaXR5ICduJyBjYXJkcyBpbiB3b3JrZmxvd3NcbiAgICAgICAgdGlsZS5zZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgc2VsZi50aWxlID0gdGlsZTtcbiAgICAgICAgcGFyYW1zLmRpcnR5KHRydWUpO1xuICAgIH07XG5cbiAgICAvLyBjdHJsK1MgdG8gc2F2ZSBhbnkgZWRpdGVkL2RpcnR5IHRpbGVzIGluIHJlc291cmNlIHZpZXcgXG4gICAgdmFyIGtleUxpc3RlbmVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5jdHJsS2V5ICYmIGUua2V5ID09PSBcInNcIikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKHNlbGY/LnRpbGU/LmRpcnR5KCkgPT0gdHJ1ZSAmJiBcbiAgICAgICAgICAgICAgICBzZWxmPy50aWxlPy5wYXJlbnQ/LmlzV3JpdGFibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zYXZlVGlsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlMaXN0ZW5lcilcbiAgICAvLyBkaXNwb3NlIG9mIGV2ZW50bGlzdGVuZXJcbiAgICB0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbigpe1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlMaXN0ZW5lcik7XG4gICAgfTtcblxuICAgIHRoaXMuc2F2ZVRpbGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBzZWxmLmxvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHNlbGYudGlsZS50cmFuc2FjdGlvbklkID0gcGFyYW1zLmZvcm0/LndvcmtmbG93SWQgfHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChwYXJhbXMucmVzb3VyY2VpZCkge1xuICAgICAgICAgICAgc2VsZi50aWxlLnJlc291cmNlaW5zdGFuY2VfaWQgPSBwYXJhbXMucmVzb3VyY2VpZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrby51bndyYXAocGFyYW1zLmZvcm0/LnJlc291cmNlSWQpKXtcbiAgICAgICAgICAgIHNlbGYudGlsZS5yZXNvdXJjZWluc3RhbmNlX2lkID0ga28udW53cmFwKHBhcmFtcy5mb3JtLnJlc291cmNlSWQpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYudGlsZS5zYXZlKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBzZWxmLmxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgaWYocGFyYW1zPy5mb3JtPy5lcnJvcil7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmZvcm0uZXJyb3IocmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyYW1zLnBhZ2VWbS5hbGVydChcbiAgICAgICAgICAgICAgICBuZXcgQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICdlcC1hbGVydC1yZWQnLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5yZXNwb25zZUpTT04udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpe31cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5mb3JtLm9uU2F2ZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmZvcm0ub25TYXZlRXJyb3Ioc2VsZi50aWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLm9uU2F2ZVN1Y2Nlc3MgPT09ICdmdW5jdGlvbicpIHNlbGYub25TYXZlU3VjY2VzcygpO1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5mb3JtLm9uU2F2ZVN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuZm9ybS5vblNhdmVTdWNjZXNzKHNlbGYudGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNhdmVUaWxlSW5Xb3JrZmxvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnNhdmVUaWxlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGFyYW1zLmZvcm0uY29tcGxldGUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgaWYgKHBhcmFtcy5zYXZlKSB7XG4gICAgICAgIHBhcmFtcy5zYXZlID0gc2F2ZVRpbGVJbldvcmtmbG93O1xuICAgIH1cbiAgICBpZiAocGFyYW1zLmZvcm0gJiYgcGFyYW1zLmZvcm0uc2F2ZSkge1xuICAgICAgICBwYXJhbXMuZm9ybS5zYXZlID0gc2F2ZVRpbGVJbldvcmtmbG93O1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgIFRPRE86IFJldmVyc2UgdGhpcyBsb2dpYyB0byBiZSBpbi1saW5lIHdpdGggY2FyZCBVWCBpbiByZXNvdXJjZV9lZGl0b3IgdXNpbmcgdGhpcyBsb2dpYzpcbiAgICAgICAgICAgICAgICBwYXJhbXMuY2FyZCAmJiBwYXJhbXMuY2FyZC5jYXJkaW5hbGl0eSA9PT0gJ24nXG4gICAgICAgICAgICAgICAgJiYgcGFyYW1zLmZvcm0uY29tcG9uZW50RGF0YS5jYXJkaW5hbGl0eU92ZXJyaWRlICE9PSAnMSdcbiAgICAqL1xuICAgIGlmIChwYXJhbXMucmVuZGVyQ29udGV4dCA9PT0gJ3dvcmtmbG93Jykge1xuICAgICAgICBpZiAocGFyYW1zLmZvcm0uY29tcG9uZW50RGF0YS5jYXJkaW5hbGl0eU92ZXJyaWRlID09PSAnbicpIHtcbiAgICAgICAgICAgIHNlbGYuY2FyZC5zZWxlY3RlZCh0cnVlKTsgIC8vIGNhcmRpbmFsaXR5ICduJyBjYXJkcyB3aWxsIGRpc3BsYXkgYXBwcm9wcmlhdGVseVxuICAgICAgICAgICAgc2VsZi5pblJlc291cmNlRWRpdG9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2F2ZVRpbGVBZGROZXcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5zYXZlVGlsZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuY2FyZC5zZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxldGVUaWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhcmFtcy5wYWdlVm0uYWxlcnQoICAgICAgICAgICAgXG4gICAgICAgICAgICBuZXcgQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgJ2VwLWFsZXJ0LXJlZCcsXG4gICAgICAgICAgICAgICAgJ0l0ZW0gRGVsZXRpb24uJyxcbiAgICAgICAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3b3VsZCBsaWtlIHRvIGRlbGV0ZSB0aGlzIGl0ZW0/JyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpe30sIC8vZG9lcyBub3RoaW5nIHdoZW4gY2FuY2VsZWRcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbGUuZGVsZXRlVGlsZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5wYWdlVm0uYWxlcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEFsZXJ0Vmlld01vZGVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZXAtYWxlcnQtcmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucmVzcG9uc2VKU09OLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKXt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZm9ybS5vbkRlbGV0ZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmZvcm0ub25EZWxldGVFcnJvcihzZWxmLnRpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYub25EZWxldGVTdWNjZXNzID09PSAnZnVuY3Rpb24nKSBzZWxmLm9uRGVsZXRlU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5mb3JtLm9uRGVsZXRlU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5mb3JtLm9uRGVsZXRlU3VjY2VzcyhzZWxmLnRpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVQYXJlbnRBbmRDaGlsZCA9IGFzeW5jKHBhcmVudHRpbGUsIGNoaWxkY2FyZCkgPT4ge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBjb25zdCBuZXdTYXZlID0gYXdhaXQgc2VsZi5jYXJkLnNhdmVQYXJlbnRUaWxlKHBhcmVudHRpbGUpO1xuICAgICAgICAgICAgaWYobmV3U2F2ZSl7XG4gICAgICAgICAgICAgICAgY2hpbGRjYXJkLnNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbn07XG4iXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJyZXR1cm4iLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibmV4dCIsInB1c2giLCJpc0FycmF5Iiwia28iLCJfIiwiYXJjaGVzIiwiQWxlcnRWaWV3TW9kZWwiLCJwYXJhbXMiLCJfcGFyYW1zJGZvcm0iLCJfcGFyYW1zJGZvcm0yIiwic2VsZiIsImNhcmQiLCJ1bndyYXAiLCJmb3JtIiwiaW5SZXNvdXJjZUVkaXRvciIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJpbmNsdWRlcyIsInVybHMiLCJyZXNvdXJjZV9lZGl0b3IiLCJjb25maWdLZXlzIiwic2hvd0lkcyIsInN0YXRlIiwicHJldmlldyIsImxvYWRpbmciLCJvYnNlcnZhYmxlIiwic2hvd0dyaWQiLCJ0b2dnbGVHcmlkIiwiaGlkZUVtcHR5Tm9kZXMiLCJ0aWxlIiwicmVwb3J0RXhwYW5kZWQiLCJwcm92aXNpb25hbFRpbGVWaWV3TW9kZWwiLCJyZXZpZXdlciIsImV4cGFuZGVkIiwic2hvd0hlYWRlckxpbmUiLCJjb25maWciLCJtb2RlbCIsImdldCIsImVhY2giLCJrZXkiLCJzaG93Q2hpbGRDYXJkcyIsImNvbXB1dGVkIiwid2lkZ2V0cyIsImNvbXBvbmVudENzc0NsYXNzZXMiLCJ3aWRnZXQiLCJfd2lkZ2V0JG5vZGUiLCJfd2lkZ2V0JG5vZGUyIiwibm9kZSIsImdyYXBoIiwiYXR0cmlidXRlcyIsInNsdWciLCJhbGlhcyIsIndpZGdldExvb2t1cCIsIndpZGdldF9pZCIsImpvaW4iLCJpbml0aWFsaXplIiwic2hvd0Zvcm0iLCJ0aWxlcyIsImdldFRpbGVzIiwiZm9yRWFjaCIsImlzT2JzZXJ2YWJsZSIsInN1YnNjcmliZSIsImNhcmRJZGVudGlmaWVyIiwic291cmNlX2lkZW50aWZpZXJfaWQiLCJub2RlZ3JvdXBfaWQiLCJ3aWRnZXROb2RlSWRlbnRpZmllciIsInNvdXJjZUlkZW50aWZpZXJJZCIsImlkIiwiZGlydHkiLCJyZWR1Y2UiLCJhY2MiLCJuZXdUaWxlIiwiZ2V0TmV3VGlsZSIsInByZVNhdmVDYWxsYmFjayIsInNhdmVUaWxlIiwicmV2ZWFsRm9ybSIsInNlbGVjdGVkIiwic2V0VGltZW91dCIsImNhcmRzIiwiYmVmb3JlTW92ZSIsImNhbmNlbERyb3AiLCJzb3VyY2VQYXJlbnQiLCJ0YXJnZXRQYXJlbnQiLCJyZW9yZGVyV2lkZ2V0cyIsIml0ZW0iLCJzYXZlIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJwYWdlVm0iLCJhbGVydCIsInJlc3BvbnNlSlNPTiIsInRpdGxlIiwibWVzc2FnZSIsInVuZG9Tb3J0IiwiYXJyYXkiLCJzb3VyY2VJbmRleCIsInRhcmdldEluZGV4IiwiX2FycmF5JHNwbGljZSIsInNwbGljZSIsIl9hcnJheSRzcGxpY2UyIiwibW92ZWRJdGVtIiwic3RhcnREcmFnIiwidWkiLCJ1dGlscyIsImRvbURhdGEiLCJnZXRWYWx1ZXNCeURhdGF0eXBlIiwidHlwZSIsInZhbHVlcyIsImRhdGEiLCJnZXRBdHRyaWJ1dGVzIiwibm9kZUxvb2t1cCIsImRhdGF0eXBlIiwic2VsZWN0V29ya2Zsb3dUaWxlIiwia2V5TGlzdGVuZXIiLCJjdHJsS2V5IiwiX3NlbGYkdGlsZSIsIl9zZWxmJHRpbGUyIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnQiLCJpc1dyaXRhYmxlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzcG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjYWxsYmFjayIsIl9wYXJhbXMkZm9ybTMiLCJfcGFyYW1zJGZvcm00IiwidHJhbnNhY3Rpb25JZCIsIndvcmtmbG93SWQiLCJ1bmRlZmluZWQiLCJyZXNvdXJjZWlkIiwicmVzb3VyY2VpbnN0YW5jZV9pZCIsInJlc291cmNlSWQiLCJfcGFyYW1zJGZvcm01IiwiZXJyb3IiLCJvblNhdmVFcnJvciIsIm9uU2F2ZVN1Y2Nlc3MiLCJzYXZlVGlsZUluV29ya2Zsb3ciLCJjb21wbGV0ZSIsInJlbmRlckNvbnRleHQiLCJjb21wb25lbnREYXRhIiwiY2FyZGluYWxpdHlPdmVycmlkZSIsInNhdmVUaWxlQWRkTmV3Iiwid2luZG93IiwiZGVsZXRlVGlsZSIsIm9uRGVsZXRlRXJyb3IiLCJvbkRlbGV0ZVN1Y2Nlc3MiLCJjcmVhdGVQYXJlbnRBbmRDaGlsZCIsIl9yZWYiLCJfY2FsbGVlIiwicGFyZW50dGlsZSIsImNoaWxkY2FyZCIsIm5ld1NhdmUiLCJfdCIsIl9jb250ZXh0Iiwic2F2ZVBhcmVudFRpbGUiLCJjb25zb2xlIiwibG9nIiwiX3giLCJfeDIiXSwic291cmNlUm9vdCI6IiJ9