"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[31495],{

/***/ 31495:
/*!**********************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/grouping.js + 1 modules ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ grouping)
});

// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/card-component.js
var card_component = __webpack_require__(19480);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/alert.js
var viewmodels_alert = __webpack_require__(21672);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/cards/grouping.htm
const grouping_namespaceObject = "templates/views/components/cards/grouping.htm";
// EXTERNAL MODULE: ./node_modules/chosen-js/chosen.jquery.min.js
var chosen_jquery_min = __webpack_require__(5785);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/grouping.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }








var _flattenTree = function flattenTree(parents, flatList) {
  var _iterator = _createForOfIteratorHelper(knockout_latest_default().unwrap(parents)),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var parent = _step.value;
      flatList.push(parent);
      _flattenTree(parent.cards, flatList);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return flatList;
};
function viewModel(params) {
  var _params$form, _params$form2, _params$form3;
  // params.form is the CardTreeViewModel
  var self = this;
  this.saving = ((_params$form = params.form) === null || _params$form === void 0 ? void 0 : _params$form.saving) || knockout_latest_default().observable(false);
  this.tiles = [];
  this.widgetInstanceDataLookup = {};
  this.showGrid = params === null || params === void 0 || (_params$form2 = params.form) === null || _params$form2 === void 0 ? void 0 : _params$form2.showGrid;
  this.toggleGrid = params === null || params === void 0 || (_params$form3 = params.form) === null || _params$form3 === void 0 ? void 0 : _params$form3.toggleGrid;

  /*
      'sortedWidgetIds' originally referred to entries in the
      card_x_node_x_widget table. This has been changed, and
      this list now contains `node_id`s instead.
  */
  params.configKeys = ['groupedCardIds', 'sortedWidgetIds'];
  card_component["default"].apply(this, [params]);
  var cards;
  if (params.state === 'report') {
    cards = _flattenTree(params.pageVm.report.cards, []);
  } else {
    cards = !!params.card.parent ? params.card.parent.cards : _flattenTree(params.card.topCards, []);
  }
  this.cardLookup = {};
  this.subscriptions = {};
  this.siblingCards = knockout_latest_default().observableArray();
  var _iterator2 = _createForOfIteratorHelper(cards),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var card = _step2.value;
      this.cardLookup[card.model.id] = card;
      if (card.parentCard === params.card.parentCard && card.model.cardinality() === '1' && card !== params.card && card.cards().length === 0) {
        this.siblingCards.push({
          'name': card.model.name(),
          'id': card.model.id
        });
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  this.groupedCards = knockout_latest_default().computed(function () {
    var _this = this;
    var gc = [this.card.model.id].concat(knockout_latest_default().toJS(this.groupedCardIds())).map(function (cardid) {
      var card = _this.cardLookup[cardid];
      if (card) {
        var subscription = card.model.cardinality.subscribe(function (cardinality) {
          if (cardinality !== '1') {
            card.model.cardinality('1');
            var errorTitle = arches["default"].translations.groupingErrorTitle;
            var errorMesssage = arches["default"].translations.groupingErrorMessage.replace(/\$\{cardName\}/g, self.card.model.name());
            params.pageVm.alert(new viewmodels_alert["default"]('ep-alert-red', errorTitle, errorMesssage, function () {}, function () {
              var newgroup = knockout_latest_default().toJS(self.groupedCardIds()).filter(function (cardid) {
                return cardid !== card.model.id;
              });
              self.groupedCardIds(newgroup);
              self.subscriptions[cardid].dispose();
              card.model.cardinality('n');
              self.card.model.save();
            }));
          }
        }, _this);
        _this.subscriptions[cardid] = subscription;
      }
      return card;
    });
    return gc;
  }, this);
  var updatedSortedWidgetsList = function updatedSortedWidgetsList(cards) {
    this.widgetInstanceDataLookup = {};
    var sortedWidgetIds = knockout_latest_default().toJS(this.sortedWidgetIds);
    var widgetNodeIdList = [];
    cards.forEach(function (card) {
      if (card) {
        card.widgets().forEach(function (widget) {
          this.widgetInstanceDataLookup[widget.node_id()] = widget;
          widgetNodeIdList.push(widget.node_id());
        }, this);
      }
    }, this);
    underscore_min_default().each(this.widgetInstanceDataLookup, function (widget, widgetid) {
      if (!underscore_min_default().contains(sortedWidgetIds, widgetid)) {
        sortedWidgetIds.push(widgetid);
      }
    }, this);
    this.sortedWidgetIds(_toConsumableArray(underscore_min_default().without.apply((underscore_min_default()), [sortedWidgetIds].concat(_toConsumableArray(underscore_min_default().difference(sortedWidgetIds, widgetNodeIdList))))));
  };
  updatedSortedWidgetsList.call(this, this.groupedCards());
  this.groupedCards.subscribe(function (cards) {
    updatedSortedWidgetsList.call(this, cards);
  }, this);
  underscore_min_default().each(this.groupedCards(), function (card) {
    if (card) {
      card.widgets.subscribe(function () {
        updatedSortedWidgetsList.call(this, this.groupedCards());
      }, this);
    }
  }, this);
  if (!!params.preview) {
    underscore_min_default().each(this.groupedCards(), function (card) {
      if (card) {
        if (card.tiles().length === 0) {
          card.tiles.push(card.getNewTile());
        }
        // we do this so that when you select a grouped widget
        // the selectedCard remains the same and doesn't jump to it's true card
        underscore_min_default().each(card.widgets(), function (widget) {
          widget.parent = self.card;
        });
      }
    }, this);
  }
  this.groupedTiles = knockout_latest_default().computed(function () {
    if (this.saving()) {
      return this.tiles;
    } else {
      var tiles = [];
      underscore_min_default().each(this.groupedCards(), function (card) {
        if (card) {
          if (card.tiles().length > 0) {
            tiles.push(card.tiles()[0]);
          } else {
            tiles.push(card.getNewTile());
          }
        }
      }, this);
      this.tiles = tiles;
      return tiles;
    }
  }, this);
  if (knockout_latest_default().isObservable(params.tiles)) {
    params.tiles(self.groupedTiles());
    self.groupedTiles.subscribe(function (tiles) {
      params.tiles(tiles);
    });
  }
  this.hasTiles = knockout_latest_default().computed(function () {
    return underscore_min_default().some(this.groupedCards(), function (card) {
      return card && card.tiles().length > 0;
    }, this);
  }, this);
  this.getDataForDisplay = function (nodeId) {
    var widget = self.widgetInstanceDataLookup[nodeId];
    var tile = self.groupedTiles().find(function (tile) {
      return Object.keys(tile.data).includes(widget.node.nodeid);
    });
    var ret = {
      widget: widget,
      tile: tile,
      tileData: tile.data[widget.node.nodeid],
      card: self.cardLookup[widget.card.cardid()]
    };
    return ret;
  };
  this.beforeMove = function (e) {
    // do nothing
  };
  this.afterMove = function (e) {
    params.card.model.save();
  };
  this.getTile = function (cardid) {
    var tile = underscore_min_default().find(this.groupedTiles(), function (tile) {
      return tile.parent.model.id === cardid;
    });
    if (!tile && !!params.preview) {
      tile = self.cardLookup[cardid].getNewTile();
    }
    return tile;
  };
  this.dirty = knockout_latest_default().computed(function () {
    return Boolean(underscore_min_default().find(self.groupedTiles(), function (tile) {
      return tile.dirty();
    }));
  });
  if (knockout_latest_default().isObservable(params.dirty)) {
    this.dirty.subscribe(function (dirty) {
      params.dirty(dirty);
    });
  }
  this.previouslySaved = knockout_latest_default().computed(function () {
    return !!underscore_min_default().find(this.groupedTiles(), function (tile) {
      return !!tile.tileid;
    }, this);
  }, this);
  this.saveTiles = function () {
    var _params$form4;
    var errors = knockout_latest_default().observableArray().extend({
      rateLimit: 250
    });
    var tiles = self.groupedTiles();
    var tile = self.groupedTiles()[0];
    tile.resourceinstance_id = knockout_latest_default().unwrap(self.form.resourceId);
    tile.transactionId = (_params$form4 = params.form) === null || _params$form4 === void 0 ? void 0 : _params$form4.workflowId;
    self.saving(true);
    tile.save(function (response) {
      errors.push(response);
      self.groupedCardIds.valueHasMutated();
      self.selectGroupCard();
    }, function () {
      var requests = underscore_min_default().map(underscore_min_default().rest(tiles), function (tile) {
        var _params$form5;
        tile.resourceinstance_id = knockout_latest_default().unwrap(self.form.resourceId);
        tile.transactionId = (_params$form5 = params.form) === null || _params$form5 === void 0 ? void 0 : _params$form5.workflowId;
        return tile.save(function (response) {
          errors.push(response);
        });
      }, self);
      Promise.all(requests).finally(function () {
        self.groupedCardIds.valueHasMutated();
        self.selectGroupCard();
        if (params.form.onSaveSuccess) {
          params.form.onSaveSuccess(self.tiles);
        }
        self.saving(false);
        self.loading(false);
      });
    });
    errors.subscribe(function (errors) {
      var title = [];
      var message = [];
      errors.forEach(function (response) {
        title.push(response.responseJSON.title);
        message.push(response.responseJSON.message);
      });
      params.pageVm.alert(new viewmodels_alert["default"]('ep-alert-red', title.join(), message.join(), null, function () {}));
      if (params.form.onSaveError) {
        params.form.onSaveError(self.tile);
      }
    });
  };
  if (params.save) {
    params.save = self.saveTiles;
  }
  if (params.form && params.form.save) {
    params.form.save = self.saveTiles;
  }
  this.deleteTiles = function () {
    params.loading(true);
    var self = this;
    var errors = knockout_latest_default().observableArray().extend({
      rateLimit: 250
    });
    var requests = self.groupedTiles().map(function (tile) {
      if (!!tile.tileid) {
        return jquery_min_default().ajax({
          type: "DELETE",
          url: arches["default"].urls.tile,
          data: JSON.stringify(tile.getData())
        }).done(function (response) {
          tile.parent.tiles.remove(tile);
        }).fail(function (response) {
          errors.push(response);
        });
      }
    }, self);
    Promise.all(requests).finally(function () {
      params.loading(false);
      self.selectGroupCard();
      self.resetTiles();
    });
    errors.subscribe(function (errors) {
      var title = [];
      var message = [];
      errors.forEach(function (response) {
        title.push(response.responseJSON.title);
        message.push(response.responseJSON.message);
      });
      params.pageVm.alert(new viewmodels_alert["default"]('ep-alert-red', title.join(), message.join(), null, function () {}));
    });
  };
  this.resetTiles = function () {
    underscore_min_default().each(this.groupedTiles(), function (tile) {
      tile.reset();
    }, this);
  };
  this.selectGroupCard = function () {
    this.card.selected(true);
  };
}
knockout_latest_default().components.register('grouping-card-component', {
  viewModel: viewModel,
  template: grouping_namespaceObject
});
/* harmony default export */ const grouping = (viewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztRQUN2Q0MsT0FBTyxDQUFDdkgsSUFBSSxDQUFDMkcsUUFBUSxDQUFDYSxZQUFZLENBQUNELE9BQU8sQ0FBQztNQUMvQyxDQUFDLENBQUM7TUFDRmpILE1BQU0sQ0FBQ2UsTUFBTSxDQUFDaUMsS0FBSyxDQUFDLElBQUlwRSwyQkFBYyxDQUFDLGNBQWMsRUFBRW9JLEtBQUssQ0FBQ0csSUFBSSxDQUFDLENBQUMsRUFBRUYsT0FBTyxDQUFDRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0csQ0FBQyxDQUFDO0VBRU4sQ0FBQztFQUVELElBQUksQ0FBQ1ksVUFBVSxHQUFHLFlBQVU7SUFDeEJ4Siw2QkFBTSxDQUFDLElBQUksQ0FBQzhGLFlBQVksQ0FBQyxDQUFDLEVBQUUsVUFBU00sSUFBSSxFQUFFO01BQ3ZDQSxJQUFJLENBQUNxRCxLQUFLLENBQUMsQ0FBQztJQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDO0VBQ1osQ0FBQztFQUVELElBQUksQ0FBQ3pCLGVBQWUsR0FBRyxZQUFXO0lBQzlCLElBQUksQ0FBQ3RGLElBQUksQ0FBQ2dILFFBQVEsQ0FBQyxJQUFJLENBQUM7RUFDNUIsQ0FBQztBQUNMO0FBRUF4SixvQ0FBYSxDQUFDMEosUUFBUSxDQUFDLHlCQUF5QixFQUFFO0VBQzlDcEksU0FBUyxFQUFFQSxTQUFTO0VBQ3BCcUksUUFBUSxFQUFFdkosd0JBQW9CQTtBQUNsQyxDQUFDLENBQUM7QUFDRiwrQ0FBZWtCLFNBQVMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvY2FyZHMvZ3JvdXBpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBDYXJkQ29tcG9uZW50Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvY2FyZC1jb21wb25lbnQnO1xuaW1wb3J0IEFsZXJ0Vmlld01vZGVsIGZyb20gJ3ZpZXdtb2RlbHMvYWxlcnQnO1xuaW1wb3J0IGdyb3VwaW5nQ2FyZFRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2NhcmRzL2dyb3VwaW5nLmh0bSc7XG5pbXBvcnQgJ2Nob3Nlbic7XG5cblxudmFyIGZsYXR0ZW5UcmVlID0gZnVuY3Rpb24ocGFyZW50cywgZmxhdExpc3QpIHtcbiAgICBmb3IgKGNvbnN0IHBhcmVudCBvZiBrby51bndyYXAocGFyZW50cykpIHtcbiAgICAgICAgZmxhdExpc3QucHVzaChwYXJlbnQpO1xuICAgICAgICBmbGF0dGVuVHJlZShcbiAgICAgICAgICAgIHBhcmVudC5jYXJkcyxcbiAgICAgICAgICAgIGZsYXRMaXN0XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmbGF0TGlzdDtcbn07XG5cbmZ1bmN0aW9uIHZpZXdNb2RlbChwYXJhbXMpIHtcbiAgICAvLyBwYXJhbXMuZm9ybSBpcyB0aGUgQ2FyZFRyZWVWaWV3TW9kZWxcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuICAgIHRoaXMuc2F2aW5nID0gcGFyYW1zLmZvcm0/LnNhdmluZyB8fCBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICB0aGlzLnRpbGVzID0gW107XG4gICAgdGhpcy53aWRnZXRJbnN0YW5jZURhdGFMb29rdXAgPSB7fTtcbiAgICB0aGlzLnNob3dHcmlkID0gcGFyYW1zPy5mb3JtPy5zaG93R3JpZDtcbiAgICB0aGlzLnRvZ2dsZUdyaWQgPSBwYXJhbXM/LmZvcm0/LnRvZ2dsZUdyaWQ7XG5cbiAgICAvKlxuICAgICAgICAnc29ydGVkV2lkZ2V0SWRzJyBvcmlnaW5hbGx5IHJlZmVycmVkIHRvIGVudHJpZXMgaW4gdGhlXG4gICAgICAgIGNhcmRfeF9ub2RlX3hfd2lkZ2V0IHRhYmxlLiBUaGlzIGhhcyBiZWVuIGNoYW5nZWQsIGFuZFxuICAgICAgICB0aGlzIGxpc3Qgbm93IGNvbnRhaW5zIGBub2RlX2lkYHMgaW5zdGVhZC5cbiAgICAqLyBcbiAgICBwYXJhbXMuY29uZmlnS2V5cyA9IFsnZ3JvdXBlZENhcmRJZHMnLCAnc29ydGVkV2lkZ2V0SWRzJ107XG4gICAgQ2FyZENvbXBvbmVudFZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG5cbiAgICB2YXIgY2FyZHM7XG4gICAgaWYgKHBhcmFtcy5zdGF0ZSA9PT0gJ3JlcG9ydCcpIHtcbiAgICAgICAgY2FyZHMgPSBmbGF0dGVuVHJlZShwYXJhbXMucGFnZVZtLnJlcG9ydC5jYXJkcywgW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcmRzID0gISFwYXJhbXMuY2FyZC5wYXJlbnQgPyBwYXJhbXMuY2FyZC5wYXJlbnQuY2FyZHMgOiBmbGF0dGVuVHJlZShwYXJhbXMuY2FyZC50b3BDYXJkcywgW10pO1xuICAgIH1cblxuICAgIHRoaXMuY2FyZExvb2t1cCA9IHt9O1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHt9O1xuICAgIHRoaXMuc2libGluZ0NhcmRzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICBmb3IgKGNvbnN0IGNhcmQgb2YgY2FyZHMpIHtcbiAgICAgICAgdGhpcy5jYXJkTG9va3VwW2NhcmQubW9kZWwuaWRdID0gY2FyZDtcbiAgICAgICAgaWYgKGNhcmQucGFyZW50Q2FyZCA9PT0gcGFyYW1zLmNhcmQucGFyZW50Q2FyZCAmJlxuICAgICAgICAgICAgY2FyZC5tb2RlbC5jYXJkaW5hbGl0eSgpID09PSAnMScgJiZcbiAgICAgICAgICAgIGNhcmQgIT09IHBhcmFtcy5jYXJkICYmXG4gICAgICAgICAgICBjYXJkLmNhcmRzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNpYmxpbmdDYXJkcy5wdXNoKHsnbmFtZSc6IGNhcmQubW9kZWwubmFtZSgpLCAnaWQnOiBjYXJkLm1vZGVsLmlkfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmdyb3VwZWRDYXJkcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBnYyA9IFt0aGlzLmNhcmQubW9kZWwuaWRdLmNvbmNhdChrby50b0pTKHRoaXMuZ3JvdXBlZENhcmRJZHMoKSkpLm1hcChjYXJkaWQgPT4ge1xuICAgICAgICAgICAgdmFyIGNhcmQgPSB0aGlzLmNhcmRMb29rdXBbY2FyZGlkXTsgXG5cbiAgICAgICAgICAgIGlmIChjYXJkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IGNhcmQubW9kZWwuY2FyZGluYWxpdHkuc3Vic2NyaWJlKGZ1bmN0aW9uKGNhcmRpbmFsaXR5KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ICE9PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQubW9kZWwuY2FyZGluYWxpdHkoJzEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvclRpdGxlID0gYXJjaGVzLnRyYW5zbGF0aW9ucy5ncm91cGluZ0Vycm9yVGl0bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzc2FnZSA9IGFyY2hlcy50cmFuc2xhdGlvbnMuZ3JvdXBpbmdFcnJvck1lc3NhZ2UucmVwbGFjZSgvXFwkXFx7Y2FyZE5hbWVcXH0vZywgc2VsZi5jYXJkLm1vZGVsLm5hbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucGFnZVZtLmFsZXJ0KG5ldyBBbGVydFZpZXdNb2RlbCgnZXAtYWxlcnQtcmVkJywgZXJyb3JUaXRsZSwgZXJyb3JNZXNzc2FnZSwgZnVuY3Rpb24oKXt9LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdncm91cCA9IGtvLnRvSlMoc2VsZi5ncm91cGVkQ2FyZElkcygpKS5maWx0ZXIoY2FyZGlkID0+IGNhcmRpZCAhPT0gY2FyZC5tb2RlbC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ncm91cGVkQ2FyZElkcyhuZXdncm91cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdWJzY3JpcHRpb25zW2NhcmRpZF0uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQubW9kZWwuY2FyZGluYWxpdHkoJ24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhcmQubW9kZWwuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW2NhcmRpZF0gPSBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2FyZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGdjO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdmFyIHVwZGF0ZWRTb3J0ZWRXaWRnZXRzTGlzdCA9IGZ1bmN0aW9uKGNhcmRzKSB7XG4gICAgICAgIHRoaXMud2lkZ2V0SW5zdGFuY2VEYXRhTG9va3VwID0ge307XG5cbiAgICAgICAgdmFyIHNvcnRlZFdpZGdldElkcyA9IGtvLnRvSlModGhpcy5zb3J0ZWRXaWRnZXRJZHMpO1xuICAgICAgICB2YXIgd2lkZ2V0Tm9kZUlkTGlzdCA9IFtdO1xuXG4gICAgICAgIGNhcmRzLmZvckVhY2goZnVuY3Rpb24oY2FyZCl7XG4gICAgICAgICAgICBpZiAoY2FyZCkge1xuICAgICAgICAgICAgICAgIGNhcmQud2lkZ2V0cygpLmZvckVhY2goZnVuY3Rpb24od2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkZ2V0SW5zdGFuY2VEYXRhTG9va3VwW3dpZGdldC5ub2RlX2lkKCldID0gd2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB3aWRnZXROb2RlSWRMaXN0LnB1c2god2lkZ2V0Lm5vZGVfaWQoKSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIF8uZWFjaCh0aGlzLndpZGdldEluc3RhbmNlRGF0YUxvb2t1cCwgZnVuY3Rpb24od2lkZ2V0LCB3aWRnZXRpZCkge1xuICAgICAgICAgICAgaWYoIShfLmNvbnRhaW5zKHNvcnRlZFdpZGdldElkcywgd2lkZ2V0aWQpKSkge1xuICAgICAgICAgICAgICAgIHNvcnRlZFdpZGdldElkcy5wdXNoKHdpZGdldGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zb3J0ZWRXaWRnZXRJZHMoW1xuICAgICAgICAgICAgLi4uXy53aXRob3V0KHNvcnRlZFdpZGdldElkcywgLi4uXy5kaWZmZXJlbmNlKHNvcnRlZFdpZGdldElkcywgd2lkZ2V0Tm9kZUlkTGlzdCkpXG4gICAgICAgIF0pO1xuICAgIH07XG5cbiAgICB1cGRhdGVkU29ydGVkV2lkZ2V0c0xpc3QuY2FsbCh0aGlzLCB0aGlzLmdyb3VwZWRDYXJkcygpKTtcblxuICAgIHRoaXMuZ3JvdXBlZENhcmRzLnN1YnNjcmliZShmdW5jdGlvbihjYXJkcykge1xuICAgICAgICB1cGRhdGVkU29ydGVkV2lkZ2V0c0xpc3QuY2FsbCh0aGlzLCBjYXJkcyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBfLmVhY2godGhpcy5ncm91cGVkQ2FyZHMoKSwgZnVuY3Rpb24oY2FyZCkge1xuICAgICAgICBpZiAoY2FyZCkge1xuICAgICAgICAgICAgY2FyZC53aWRnZXRzLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkU29ydGVkV2lkZ2V0c0xpc3QuY2FsbCh0aGlzLCB0aGlzLmdyb3VwZWRDYXJkcygpKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBpZiAoISFwYXJhbXMucHJldmlldykge1xuICAgICAgICBfLmVhY2godGhpcy5ncm91cGVkQ2FyZHMoKSwgZnVuY3Rpb24oY2FyZCkge1xuICAgICAgICAgICAgaWYgKGNhcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FyZC50aWxlcygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjYXJkLnRpbGVzLnB1c2goY2FyZC5nZXROZXdUaWxlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB3ZSBkbyB0aGlzIHNvIHRoYXQgd2hlbiB5b3Ugc2VsZWN0IGEgZ3JvdXBlZCB3aWRnZXRcbiAgICAgICAgICAgICAgICAvLyB0aGUgc2VsZWN0ZWRDYXJkIHJlbWFpbnMgdGhlIHNhbWUgYW5kIGRvZXNuJ3QganVtcCB0byBpdCdzIHRydWUgY2FyZFxuICAgICAgICAgICAgICAgIF8uZWFjaChjYXJkLndpZGdldHMoKSwgZnVuY3Rpb24od2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldC5wYXJlbnQgPSBzZWxmLmNhcmQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuZ3JvdXBlZFRpbGVzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnNhdmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aWxlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0aWxlcyA9IFtdO1xuICAgICAgICAgICAgXy5lYWNoKHRoaXMuZ3JvdXBlZENhcmRzKCksIGZ1bmN0aW9uKGNhcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FyZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZC50aWxlcygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzLnB1c2goY2FyZC50aWxlcygpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzLnB1c2goY2FyZC5nZXROZXdUaWxlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnRpbGVzID0gdGlsZXM7XG4gICAgICAgICAgICByZXR1cm4gdGlsZXM7XG4gICAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKHBhcmFtcy50aWxlcykpIHtcbiAgICAgICAgcGFyYW1zLnRpbGVzKHNlbGYuZ3JvdXBlZFRpbGVzKCkpO1xuXG4gICAgICAgIHNlbGYuZ3JvdXBlZFRpbGVzLnN1YnNjcmliZShmdW5jdGlvbih0aWxlcykge1xuICAgICAgICAgICAgcGFyYW1zLnRpbGVzKHRpbGVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5oYXNUaWxlcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXy5zb21lKHRoaXMuZ3JvdXBlZENhcmRzKCksIGZ1bmN0aW9uKGNhcmQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYXJkICYmIGNhcmQudGlsZXMoKS5sZW5ndGggPiAwO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMuZ2V0RGF0YUZvckRpc3BsYXkgPSBmdW5jdGlvbihub2RlSWQpIHtcbiAgICAgICAgdmFyIHdpZGdldCA9IHNlbGYud2lkZ2V0SW5zdGFuY2VEYXRhTG9va3VwW25vZGVJZF07XG4gICAgICAgIHZhciB0aWxlID0gc2VsZi5ncm91cGVkVGlsZXMoKS5maW5kKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aWxlLmRhdGEpLmluY2x1ZGVzKHdpZGdldC5ub2RlLm5vZGVpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXQgPSB7XG4gICAgICAgICAgICB3aWRnZXQ6IHdpZGdldCxcbiAgICAgICAgICAgIHRpbGU6IHRpbGUsXG4gICAgICAgICAgICB0aWxlRGF0YTogIHRpbGUuZGF0YVt3aWRnZXQubm9kZS5ub2RlaWRdLFxuICAgICAgICAgICAgY2FyZDogc2VsZi5jYXJkTG9va3VwW3dpZGdldC5jYXJkLmNhcmRpZCgpXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICB0aGlzLmJlZm9yZU1vdmUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9O1xuXG4gICAgdGhpcy5hZnRlck1vdmUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHBhcmFtcy5jYXJkLm1vZGVsLnNhdmUoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRUaWxlID0gZnVuY3Rpb24oY2FyZGlkKSB7XG4gICAgICAgIHZhciB0aWxlID0gXy5maW5kKHRoaXMuZ3JvdXBlZFRpbGVzKCksIGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aWxlLnBhcmVudC5tb2RlbC5pZCA9PT0gY2FyZGlkO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0aWxlICYmICEhcGFyYW1zLnByZXZpZXcpIHtcbiAgICAgICAgICAgIHRpbGUgPSBzZWxmLmNhcmRMb29rdXBbY2FyZGlkXS5nZXROZXdUaWxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfTtcblxuICAgIHRoaXMuZGlydHkgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oXy5maW5kKHNlbGYuZ3JvdXBlZFRpbGVzKCksIGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aWxlLmRpcnR5KCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKHBhcmFtcy5kaXJ0eSkpIHtcbiAgICAgICAgdGhpcy5kaXJ0eS5zdWJzY3JpYmUoZnVuY3Rpb24oZGlydHkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5kaXJ0eShkaXJ0eSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucHJldmlvdXNseVNhdmVkID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIShfLmZpbmQodGhpcy5ncm91cGVkVGlsZXMoKSwgZnVuY3Rpb24odGlsZSkge1xuICAgICAgICAgICAgcmV0dXJuICEhdGlsZS50aWxlaWQ7XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMuc2F2ZVRpbGVzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGVycm9ycyA9IGtvLm9ic2VydmFibGVBcnJheSgpLmV4dGVuZCh7IHJhdGVMaW1pdDogMjUwIH0pO1xuICAgICAgICB2YXIgdGlsZXMgPSBzZWxmLmdyb3VwZWRUaWxlcygpO1xuICAgICAgICB2YXIgdGlsZSA9IHNlbGYuZ3JvdXBlZFRpbGVzKClbMF07XG4gICAgICAgIHRpbGUucmVzb3VyY2VpbnN0YW5jZV9pZCA9IGtvLnVud3JhcChzZWxmLmZvcm0ucmVzb3VyY2VJZCk7XG4gICAgICAgIHRpbGUudHJhbnNhY3Rpb25JZCA9IHBhcmFtcy5mb3JtPy53b3JrZmxvd0lkO1xuICAgICAgICBzZWxmLnNhdmluZyh0cnVlKTtcblxuICAgICAgICB0aWxlLnNhdmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHNlbGYuZ3JvdXBlZENhcmRJZHMudmFsdWVIYXNNdXRhdGVkKCk7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdEdyb3VwQ2FyZCgpO1xuICAgICAgICB9LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RzID0gXy5tYXAoXy5yZXN0KHRpbGVzKSwgZnVuY3Rpb24odGlsZSkge1xuICAgICAgICAgICAgICAgIHRpbGUucmVzb3VyY2VpbnN0YW5jZV9pZCA9IGtvLnVud3JhcChzZWxmLmZvcm0ucmVzb3VyY2VJZCk7XG4gICAgICAgICAgICAgICAgdGlsZS50cmFuc2FjdGlvbklkID0gcGFyYW1zLmZvcm0/LndvcmtmbG93SWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbGUuc2F2ZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBzZWxmKTtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKHJlcXVlc3RzKS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5ncm91cGVkQ2FyZElkcy52YWx1ZUhhc011dGF0ZWQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEdyb3VwQ2FyZCgpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZm9ybS5vblNhdmVTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5mb3JtLm9uU2F2ZVN1Y2Nlc3Moc2VsZi50aWxlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuc2F2aW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBlcnJvcnMuc3Vic2NyaWJlKGZ1bmN0aW9uKGVycm9ycyl7XG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBbXTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gW107XG4gICAgICAgICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRpdGxlLnB1c2gocmVzcG9uc2UucmVzcG9uc2VKU09OLnRpdGxlKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnB1c2gocmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYXJhbXMucGFnZVZtLmFsZXJ0KG5ldyBBbGVydFZpZXdNb2RlbCgnZXAtYWxlcnQtcmVkJywgdGl0bGUuam9pbigpLCBtZXNzYWdlLmpvaW4oKSwgbnVsbCwgZnVuY3Rpb24oKXt9KSk7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmZvcm0ub25TYXZlRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuZm9ybS5vblNhdmVFcnJvcihzZWxmLnRpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKHBhcmFtcy5zYXZlKSB7XG4gICAgICAgIHBhcmFtcy5zYXZlID0gc2VsZi5zYXZlVGlsZXM7XG4gICAgfVxuICAgIGlmIChwYXJhbXMuZm9ybSAmJiBwYXJhbXMuZm9ybS5zYXZlKSB7XG4gICAgICAgIHBhcmFtcy5mb3JtLnNhdmUgPSBzZWxmLnNhdmVUaWxlcztcbiAgICB9XG5cbiAgICB0aGlzLmRlbGV0ZVRpbGVzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcGFyYW1zLmxvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGVycm9ycyA9IGtvLm9ic2VydmFibGVBcnJheSgpLmV4dGVuZCh7IHJhdGVMaW1pdDogMjUwIH0pO1xuXG4gICAgICAgIHZhciByZXF1ZXN0cyA9IHNlbGYuZ3JvdXBlZFRpbGVzKCkubWFwKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgICAgIGlmICghIXRpbGUudGlsZWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICAgICAgICAgIHVybDogYXJjaGVzLnVybHMudGlsZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGlsZS5nZXREYXRhKCkpXG4gICAgICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWxlLnBhcmVudC50aWxlcy5yZW1vdmUodGlsZSk7XG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNlbGYpO1xuXG4gICAgICAgIFByb21pc2UuYWxsKHJlcXVlc3RzKS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwYXJhbXMubG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdEdyb3VwQ2FyZCgpO1xuICAgICAgICAgICAgc2VsZi5yZXNldFRpbGVzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlcnJvcnMuc3Vic2NyaWJlKGZ1bmN0aW9uKGVycm9ycyl7XG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBbXTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gW107XG4gICAgICAgICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRpdGxlLnB1c2gocmVzcG9uc2UucmVzcG9uc2VKU09OLnRpdGxlKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnB1c2gocmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYXJhbXMucGFnZVZtLmFsZXJ0KG5ldyBBbGVydFZpZXdNb2RlbCgnZXAtYWxlcnQtcmVkJywgdGl0bGUuam9pbigpLCBtZXNzYWdlLmpvaW4oKSwgbnVsbCwgZnVuY3Rpb24oKXt9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHRoaXMucmVzZXRUaWxlcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIF8uZWFjaCh0aGlzLmdyb3VwZWRUaWxlcygpLCBmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgICAgICB0aWxlLnJlc2V0KCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH07XG5cbiAgICB0aGlzLnNlbGVjdEdyb3VwQ2FyZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNhcmQuc2VsZWN0ZWQodHJ1ZSk7XG4gICAgfTtcbn1cblxua28uY29tcG9uZW50cy5yZWdpc3RlcignZ3JvdXBpbmctY2FyZC1jb21wb25lbnQnLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IGdyb3VwaW5nQ2FyZFRlbXBsYXRlLFxufSk7XG5leHBvcnQgZGVmYXVsdCB2aWV3TW9kZWw7XG4iXSwibmFtZXMiOlsiXyIsIiQiLCJrbyIsImFyY2hlcyIsIkNhcmRDb21wb25lbnRWaWV3TW9kZWwiLCJBbGVydFZpZXdNb2RlbCIsImdyb3VwaW5nQ2FyZFRlbXBsYXRlIiwiZmxhdHRlblRyZWUiLCJwYXJlbnRzIiwiZmxhdExpc3QiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsInVud3JhcCIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwicGFyZW50IiwidmFsdWUiLCJwdXNoIiwiY2FyZHMiLCJlcnIiLCJlIiwiZiIsInZpZXdNb2RlbCIsInBhcmFtcyIsIl9wYXJhbXMkZm9ybSIsIl9wYXJhbXMkZm9ybTIiLCJfcGFyYW1zJGZvcm0zIiwic2VsZiIsInNhdmluZyIsImZvcm0iLCJvYnNlcnZhYmxlIiwidGlsZXMiLCJ3aWRnZXRJbnN0YW5jZURhdGFMb29rdXAiLCJzaG93R3JpZCIsInRvZ2dsZUdyaWQiLCJjb25maWdLZXlzIiwiYXBwbHkiLCJzdGF0ZSIsInBhZ2VWbSIsInJlcG9ydCIsImNhcmQiLCJ0b3BDYXJkcyIsImNhcmRMb29rdXAiLCJzdWJzY3JpcHRpb25zIiwic2libGluZ0NhcmRzIiwib2JzZXJ2YWJsZUFycmF5IiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIm1vZGVsIiwiaWQiLCJwYXJlbnRDYXJkIiwiY2FyZGluYWxpdHkiLCJsZW5ndGgiLCJuYW1lIiwiZ3JvdXBlZENhcmRzIiwiY29tcHV0ZWQiLCJfdGhpcyIsImdjIiwiY29uY2F0IiwidG9KUyIsImdyb3VwZWRDYXJkSWRzIiwibWFwIiwiY2FyZGlkIiwic3Vic2NyaXB0aW9uIiwic3Vic2NyaWJlIiwiZXJyb3JUaXRsZSIsInRyYW5zbGF0aW9ucyIsImdyb3VwaW5nRXJyb3JUaXRsZSIsImVycm9yTWVzc3NhZ2UiLCJncm91cGluZ0Vycm9yTWVzc2FnZSIsInJlcGxhY2UiLCJhbGVydCIsIm5ld2dyb3VwIiwiZmlsdGVyIiwiZGlzcG9zZSIsInNhdmUiLCJ1cGRhdGVkU29ydGVkV2lkZ2V0c0xpc3QiLCJzb3J0ZWRXaWRnZXRJZHMiLCJ3aWRnZXROb2RlSWRMaXN0IiwiZm9yRWFjaCIsIndpZGdldHMiLCJ3aWRnZXQiLCJub2RlX2lkIiwiZWFjaCIsIndpZGdldGlkIiwiY29udGFpbnMiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsImNhbGwiLCJwcmV2aWV3IiwiZ2V0TmV3VGlsZSIsImdyb3VwZWRUaWxlcyIsImlzT2JzZXJ2YWJsZSIsImhhc1RpbGVzIiwic29tZSIsImdldERhdGFGb3JEaXNwbGF5Iiwibm9kZUlkIiwidGlsZSIsImZpbmQiLCJPYmplY3QiLCJrZXlzIiwiZGF0YSIsImluY2x1ZGVzIiwibm9kZSIsIm5vZGVpZCIsInJldCIsInRpbGVEYXRhIiwiYmVmb3JlTW92ZSIsImFmdGVyTW92ZSIsImdldFRpbGUiLCJkaXJ0eSIsIkJvb2xlYW4iLCJwcmV2aW91c2x5U2F2ZWQiLCJ0aWxlaWQiLCJzYXZlVGlsZXMiLCJfcGFyYW1zJGZvcm00IiwiZXJyb3JzIiwiZXh0ZW5kIiwicmF0ZUxpbWl0IiwicmVzb3VyY2VpbnN0YW5jZV9pZCIsInJlc291cmNlSWQiLCJ0cmFuc2FjdGlvbklkIiwid29ya2Zsb3dJZCIsInJlc3BvbnNlIiwidmFsdWVIYXNNdXRhdGVkIiwic2VsZWN0R3JvdXBDYXJkIiwicmVxdWVzdHMiLCJyZXN0IiwiX3BhcmFtcyRmb3JtNSIsIlByb21pc2UiLCJhbGwiLCJmaW5hbGx5Iiwib25TYXZlU3VjY2VzcyIsImxvYWRpbmciLCJ0aXRsZSIsIm1lc3NhZ2UiLCJyZXNwb25zZUpTT04iLCJqb2luIiwib25TYXZlRXJyb3IiLCJkZWxldGVUaWxlcyIsImFqYXgiLCJ0eXBlIiwidXJsIiwidXJscyIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXREYXRhIiwicmVtb3ZlIiwiZmFpbCIsInJlc2V0VGlsZXMiLCJyZXNldCIsInNlbGVjdGVkIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9