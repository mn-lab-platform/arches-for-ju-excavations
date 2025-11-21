"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[36016],{

/***/ 36016:
/*!*************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/rdm/concept-tree.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! backbone */ 77186);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var jqtree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jqtree */ 31144);
/* harmony import */ var jqtree__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jqtree__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backbone__WEBPACK_IMPORTED_MODULE_1___default().View.extend({
  events: {
    'tree.click': 'treeClick',
    'tree.move': 'moveNode'
  },
  initialize: function initialize(options) {
    var self = this;
    this.model = options.model;
    this.tree = this.$el.tree({
      dragAndDrop: true,
      dataUrl: options.url,
      data: [],
      autoOpen: false,
      rtl: jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").attr("dir") == "rtl"
    });
    this.render();
  },
  render: function render() {
    if (this._doNotRender) {
      return;
    }
    var self = this,
      node = self.$el.tree('getNodeById', this.model.get('id'));
    if (node) {
      // collapse the node while it's loading
      if (!node.load_on_demand) {
        self.$el.tree('toggle', node);
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(node.element).addClass('jqtree-loading');
    }
    self.$el.tree('loadDataFromUrl', null, function () {
      var node;
      if (self.model.get('id') !== '') {
        node = self.$el.tree('getNodeById', self.model.get('id'));
        if (node) {
          self.$el.tree('selectNode', node);
          self.$el.tree('scrollToNode', node);
        }
      }
    });
  },
  treeClick: function treeClick(event) {
    // The clicked node is 'event.node'
    var node = event.node;
    if (!node.load_on_demand) {
      this.$el.tree('toggle', node);
    }
    if (this.model.get('id') !== node.id) {
      this.trigger('conceptSelected', node.id);
    } else {
      event.preventDefault();
    }
  },
  moveNode: function moveNode(event) {
    var self = this,
      move_info = event.move_info;
    if (move_info.position !== 'inside' && move_info.previous_parent.id === move_info.target_node.parent.id || move_info.position === 'inside' && move_info.previous_parent.id === move_info.target_node.id) {
      // here we're just re-ordering nodes
    } else {
      event.preventDefault();
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: "POST",
        url: arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.concept_relation.replace('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', move_info.moved_node.id),
        data: JSON.stringify({
          'target_parent_conceptid': move_info.position === 'inside' ? move_info.target_node.id : move_info.target_node.parent.id,
          'current_parent_conceptid': move_info.previous_parent.id
        }),
        success: function success() {
          var data = JSON.parse(this.data);
          event.move_info.do_move();
          self.trigger('conceptMoved', data.conceptid);
        }
      });
    }
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMmEwMTk4YTdhNzdjZDU5OGEzOTEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7QUFDUztBQUNKO0FBQ1o7QUFHaEIsaUVBQWVDLG9EQUFhLENBQUNHLE1BQU0sQ0FBQztFQUVoQ0MsTUFBTSxFQUFFO0lBQ0osWUFBWSxFQUFFLFdBQVc7SUFDekIsV0FBVyxFQUFFO0VBQ2pCLENBQUM7RUFFREMsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQVdDLE9BQU8sRUFBRTtJQUMxQixJQUFJQyxJQUFJLEdBQUcsSUFBSTtJQUNmLElBQUksQ0FBQ0MsS0FBSyxHQUFHRixPQUFPLENBQUNFLEtBQUs7SUFFMUIsSUFBSSxDQUFDQyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxHQUFHLENBQUNELElBQUksQ0FBQztNQUN0QkUsV0FBVyxFQUFFLElBQUk7TUFDakJDLE9BQU8sRUFBRU4sT0FBTyxDQUFDTyxHQUFHO01BQ3BCQyxJQUFJLEVBQUUsRUFBRTtNQUNSQyxRQUFRLEVBQUUsS0FBSztNQUNmQyxHQUFHLEVBQUVqQiw2Q0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO0lBQ2xDLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUM7RUFDakIsQ0FBQztFQUVEQSxNQUFNLEVBQUUsU0FBUkEsTUFBTUEsQ0FBQSxFQUFhO0lBQ2YsSUFBSSxJQUFJLENBQUNDLFlBQVksRUFBRTtNQUNuQjtJQUNKO0lBQ0EsSUFBSVosSUFBSSxHQUFHLElBQUk7TUFDWGEsSUFBSSxHQUFHYixJQUFJLENBQUNHLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUNELEtBQUssQ0FBQ2EsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdELElBQUlELElBQUksRUFBRTtNQUNOO01BQ0EsSUFBSSxDQUFDQSxJQUFJLENBQUNFLGNBQWMsRUFBRTtRQUN0QmYsSUFB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Q0FBQy9CLElBQUksQ0FBQztVQUNoQ1ksS0FBSyxDQUFDSyxTQUFTLENBQUNlLE9BQU8sQ0FBQyxDQUFDO1VBQ3pCdkMsSUFBSSxDQUFDcUIsT0FBTyxDQUFDLGNBQWMsRUFBRWQsSUFBSSxDQUFDaUMsU0FBUyxDQUFDO1FBQ2hEO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFDSjtBQUNKLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvcmRtL2NvbmNlcHQtdHJlZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCAnanF0cmVlJztcblxuXG5leHBvcnQgZGVmYXVsdCBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgJ3RyZWUuY2xpY2snOiAndHJlZUNsaWNrJyxcbiAgICAgICAgJ3RyZWUubW92ZSc6ICdtb3ZlTm9kZSdcbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuXG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMuJGVsLnRyZWUoe1xuICAgICAgICAgICAgZHJhZ0FuZERyb3A6IHRydWUsXG4gICAgICAgICAgICBkYXRhVXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgYXV0b09wZW46IGZhbHNlLFxuICAgICAgICAgICAgcnRsOiAkKFwiYm9keVwiKS5hdHRyKFwiZGlyXCIpID09IFwicnRsXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RvTm90UmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgbm9kZSA9IHNlbGYuJGVsLnRyZWUoJ2dldE5vZGVCeUlkJywgdGhpcy5tb2RlbC5nZXQoJ2lkJykpO1xuICAgICAgICBcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIC8vIGNvbGxhcHNlIHRoZSBub2RlIHdoaWxlIGl0J3MgbG9hZGluZ1xuICAgICAgICAgICAgaWYgKCFub2RlLmxvYWRfb25fZGVtYW5kKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWwudHJlZSgndG9nZ2xlJywgbm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKG5vZGUuZWxlbWVudCkuYWRkQ2xhc3MoJ2pxdHJlZS1sb2FkaW5nJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLiRlbC50cmVlKFxuICAgICAgICAgICAgJ2xvYWREYXRhRnJvbVVybCcsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubW9kZWwuZ2V0KCdpZCcpICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gc2VsZi4kZWwudHJlZSgnZ2V0Tm9kZUJ5SWQnLCBzZWxmLm1vZGVsLmdldCgnaWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbC50cmVlKCdzZWxlY3ROb2RlJywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbC50cmVlKCdzY3JvbGxUb05vZGUnLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgdHJlZUNsaWNrOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBUaGUgY2xpY2tlZCBub2RlIGlzICdldmVudC5ub2RlJ1xuICAgICAgICB2YXIgbm9kZSA9IGV2ZW50Lm5vZGU7XG4gICAgICAgIGlmICghIG5vZGUubG9hZF9vbl9kZW1hbmQpe1xuICAgICAgICAgICAgdGhpcy4kZWwudHJlZSgndG9nZ2xlJywgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW9kZWwuZ2V0KCdpZCcpICE9PSBub2RlLmlkKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2NvbmNlcHRTZWxlY3RlZCcsIG5vZGUuaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBtb3ZlTm9kZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgbW92ZV9pbmZvID0gZXZlbnQubW92ZV9pbmZvO1xuICAgICAgICBpZiAoKG1vdmVfaW5mby5wb3NpdGlvbiAhPT0gJ2luc2lkZScgJiYgbW92ZV9pbmZvLnByZXZpb3VzX3BhcmVudC5pZCA9PT0gbW92ZV9pbmZvLnRhcmdldF9ub2RlLnBhcmVudC5pZCkgfHxcbiAgICAgICAgICAgIChtb3ZlX2luZm8ucG9zaXRpb24gPT09ICdpbnNpZGUnICYmIG1vdmVfaW5mby5wcmV2aW91c19wYXJlbnQuaWQgPT09IG1vdmVfaW5mby50YXJnZXRfbm9kZS5pZCkpIHtcbiAgICAgICAgICAgIC8vIGhlcmUgd2UncmUganVzdCByZS1vcmRlcmluZyBub2Rlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5jb25jZXB0X3JlbGF0aW9uLnJlcGxhY2UoJ2FhYWFhYWFhLWFhYWEtYWFhYS1hYWFhLWFhYWFhYWFhYWFhYScsIG1vdmVfaW5mby5tb3ZlZF9ub2RlLmlkKSxcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICd0YXJnZXRfcGFyZW50X2NvbmNlcHRpZCc6IG1vdmVfaW5mby5wb3NpdGlvbiA9PT0gJ2luc2lkZScgPyBtb3ZlX2luZm8udGFyZ2V0X25vZGUuaWQgOiBtb3ZlX2luZm8udGFyZ2V0X25vZGUucGFyZW50LmlkLFxuICAgICAgICAgICAgICAgICAgICAnY3VycmVudF9wYXJlbnRfY29uY2VwdGlkJzogbW92ZV9pbmZvLnByZXZpb3VzX3BhcmVudC5pZFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQubW92ZV9pbmZvLmRvX21vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyKCdjb25jZXB0TW92ZWQnLCBkYXRhLmNvbmNlcHRpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6WyIkIiwiQmFja2JvbmUiLCJhcmNoZXMiLCJWaWV3IiwiZXh0ZW5kIiwiZXZlbnRzIiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJzZWxmIiwibW9kZWwiLCJ0cmVlIiwiJGVsIiwiZHJhZ0FuZERyb3AiLCJkYXRhVXJsIiwidXJsIiwiZGF0YSIsImF1dG9PcGVuIiwicnRsIiwiYXR0ciIsInJlbmRlciIsIl9kb05vdFJlbmRlciIsIm5vZGUiLCJnZXQiLCJsb2FkX29uX2RlbWFuZCIsImVsZW1lbnQiLCJhZGRDbGFzcyIsInRyZWVDbGljayIsImV2ZW50IiwiaWQiLCJ0cmlnZ2VyIiwicHJldmVudERlZmF1bHQiLCJtb3ZlTm9kZSIsIm1vdmVfaW5mbyIsInBvc2l0aW9uIiwicHJldmlvdXNfcGFyZW50IiwidGFyZ2V0X25vZGUiLCJwYXJlbnQiLCJhamF4IiwidHlwZSIsInVybHMiLCJjb25jZXB0X3JlbGF0aW9uIiwicmVwbGFjZSIsIm1vdmVkX25vZGUiLCJKU09OIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsInBhcnNlIiwiZG9fbW92ZSIsImNvbmNlcHRpZCJdLCJzb3VyY2VSb290IjoiIn0=