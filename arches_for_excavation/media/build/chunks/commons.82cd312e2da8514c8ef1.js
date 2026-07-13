"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[82359],{

/***/ 82359:
/*!**************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/resource/edit-log.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 95093);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var views_base_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/base-manager */ 18646);
/* harmony import */ var views_resource_resource_edit_history_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/resource/resource-edit-history-data */ 17429);
/* harmony import */ var bindings_chosen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bindings/chosen */ 63777);







var ResourceEditLogView = views_base_manager__WEBPACK_IMPORTED_MODULE_4__["default"].extend({
  initialize: function initialize(options) {
    var self = this; // eslint-disable-line @typescript-eslint/no-this-alias
    var cards = views_resource_resource_edit_history_data__WEBPACK_IMPORTED_MODULE_5__["default"].cards;
    var edits = views_resource_resource_edit_history_data__WEBPACK_IMPORTED_MODULE_5__["default"].edits;
    var editTypeLookup = {
      'create': {
        icon: 'fa fa-chevron-circle-right fa-lg',
        color: 'bg-mint'
      },
      'tile edit': {
        icon: 'fa fa-repeat fa-lg',
        color: 'bg-purple'
      },
      'tile create': {
        icon: 'fa fa-plus fa-lg',
        color: 'bg-dark'
      },
      'tile delete': {
        icon: 'fa fa-minus fa-lg',
        color: 'bg-danger'
      },
      'delete edit': {
        icon: 'fa fa-minus fa-lg',
        color: 'bg-danger'
      },
      'update_resource_instance_lifecycle_state': {
        icon: 'fa fa-exclamation fa-lg',
        color: 'bg-warning'
      }
    };
    var _handleChildCards = function handleChildCards(card) {
      if (card.cards.length > 0) {
        underscore__WEBPACK_IMPORTED_MODULE_1___default().each(card.cards, function (subCard) {
          underscore__WEBPACK_IMPORTED_MODULE_1___default().each(underscore__WEBPACK_IMPORTED_MODULE_1___default().where(edits, {
            nodegroupid: subCard.nodegroup_id
          }), function (match) {
            match.card = subCard;
            match.cardContainerName = card.name;
          });
          _handleChildCards(subCard);
        }, this);
      }
    };
    var assignCards = function assignCards() {
      underscore__WEBPACK_IMPORTED_MODULE_1___default().each(cards, function (card) {
        underscore__WEBPACK_IMPORTED_MODULE_1___default().each(underscore__WEBPACK_IMPORTED_MODULE_1___default().where(edits, {
          nodegroupid: card.nodegroup_id
        }), function (match) {
          match.card = card;
          match.cardContainerName = null;
        });
        _handleChildCards(card);
      }, this);
    };
    assignCards();
    var createFullValue = function createFullValue(value, edit) {
      var full_value = {};
      function rounder(key, value) {
        if (typeof value === 'number') {
          return Math.round(value * 10000000) / 10000000;
        }
        return value;
      }
      underscore__WEBPACK_IMPORTED_MODULE_1___default().each(value, function (v, k) {
        if (underscore__WEBPACK_IMPORTED_MODULE_1___default().isObject(v) && v['features']) {
          v = underscore__WEBPACK_IMPORTED_MODULE_1___default().map(v['features'], function (feature) {
            return JSON.stringify(feature['geometry'], rounder, 4);
          });
        }
        full_value[k] = {
          new_value: v
        };
        if (edit.card) {
          underscore__WEBPACK_IMPORTED_MODULE_1___default().each(edit.card.nodes, function (node) {
            if (k == node.nodeid) {
              full_value[node.nodeid].node = node;
            }
          }, this);
        }
      });
      return underscore__WEBPACK_IMPORTED_MODULE_1___default().map(full_value, function (v, k) {
        return v;
      }); // eslint-disable-line @typescript-eslint/no-unused-vars
    };
    underscore__WEBPACK_IMPORTED_MODULE_1___default().each(edits, function (edit) {
      var datetime = moment__WEBPACK_IMPORTED_MODULE_3___default()(edit.timestamp);
      edit.time = datetime.format("HH:mm");
      edit.day = datetime.format('DD MMMM, YYYY');
      edit.editor = edit.user_email != '' ? edit.user_email : edit.user_username;
      edit.edit_type_icon = editTypeLookup[edit.edittype];
      if (edit.nodegroupid) {
        edit.full_new_value = createFullValue(edit.newvalue, edit);
        edit.full_old_value = createFullValue(edit.oldvalue, edit);
        edit.full_new_provisional_value = createFullValue(edit.newprovisionalvalue, edit);
        edit.full_old_provisional_value = createFullValue(edit.oldprovisionalvalue, edit);
      }
    });
    this.viewModel.displayname = views_resource_resource_edit_history_data__WEBPACK_IMPORTED_MODULE_5__["default"].displayname;
    this.viewModel.description = views_resource_resource_edit_history_data__WEBPACK_IMPORTED_MODULE_5__["default"].description;
    this.viewModel.sortOrder = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable('time_desc');
    this.viewModel.edits = knockout__WEBPACK_IMPORTED_MODULE_2___default().observableArray(edits);
    this.viewModel.edits.sort(function (left, right) {
      return left.timestamp == right.timestamp ? 0 : left.timestamp > right.timestamp ? -1 : 1;
    });
    this.viewModel.currentDate = moment__WEBPACK_IMPORTED_MODULE_3___default()().format('MMMM D, YYYY');
    this.viewModel.sortOrder.subscribe(function (val) {
      var sortConditions = {
        'time_desc': {
          'property': 'timestamp',
          'direction': 'gt'
        },
        'time_asc': {
          'property': 'timestamp',
          'direction': 'lt'
        },
        'editor_asc': {
          'property': 'user_email',
          'direction': 'lt'
        },
        'type_desc': {
          'property': 'edittype',
          'direction': 'gt'
        }
      };
      var sortProperty = sortConditions[val].property;
      var sortDirection = sortConditions[val].direction;
      if (sortDirection == 'gt') {
        self.viewModel.edits.sort(function (left, right) {
          return left[sortProperty] == right[sortProperty] ? 0 : left[sortProperty] > right[sortProperty] ? -1 : 1;
        });
      } else {
        self.viewModel.edits.sort(function (left, right) {
          return left[sortProperty] == right[sortProperty] ? 0 : left[sortProperty] < right[sortProperty] ? -1 : 1;
        });
      }
    });
    views_base_manager__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.initialize.call(this, options);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ResourceEditLogView());

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuODJjZDMxMmUyZGE4NTE0YzhlZjEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCO0FBQ0k7QUFDRDtBQUNFO0FBQ3FCO0FBQ1k7QUFDcEM7QUFHekIsSUFBSU0sbUJBQW1CLEdBQUdGLDBEQUFlLENBQUNHLE1BQU0sQ0FBQztFQUM3Q0MsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQVdDLE9BQU8sRUFBQztJQUN6QixJQUFNQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUU7SUFDcEIsSUFBSUMsS0FBSyxHQUFHTixpRkFBSSxDQUFDTSxLQUFLO0lBQ3RCLElBQUlDLEtBQUssR0FBR1AsaUZBQUksQ0FBQ08sS0FBSztJQUV0QixJQUFJQyxjQUFjLEdBQUc7TUFDakIsUUFBUSxFQUFFO1FBQUNDLElBQUksRUFBRSxrQ0FBa0M7UUFBRUMsS0FBSyxFQUFFO01BQVMsQ0FBQztNQUN0RSxXQUFXLEVBQUU7UUFBQ0QsSUFBSSxFQUFFLG9CQUFvQjtRQUFFQyxLQUFLLEVBQUU7TUFBVyxDQUFDO01BQzdELGFBQWEsRUFBRTtRQUFDRCxJQUFJLEVBQUUsa0JBQWtCO1FBQUVDLEtBQUssRUFBRTtNQUFTLENBQUM7TUFDM0QsYUFBYSxFQUFFO1FBQUNELElBQUksRUFBRSxtQkFBbUI7UUFBRUMsS0FBSyxFQUFFO01BQVcsQ0FBQztNQUM5RCxhQUFhLEVBQUU7UUFBQ0QsSUFBSSxFQUFFLG1CQUFtQjtRQUFFQyxLQUFLLEVBQUU7TUFBVyxDQUFDO01BQzlELDBDQUEwQyxFQUFFO1FBQUNELElBQUksRUFBRSx5QkFBeUI7UUFBRUMsS0FBSyxFQUFFO01BQVk7SUFDckcsQ0FBQztJQUVELElBQUlDLGlCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQVlDLElBQUksRUFBRTtNQUNsQyxJQUFJQSxJQUFJLENBQUNOLEtBQUssQ0FBQ08sTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN2QmpCLHNEQUFNLENBQUNnQixJQUFJLENB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QyxHQUFHLENBQUMsR0FBSU4sSUFBSSxDQUFDTSxZQUFZLENBQUMsR0FBR0wsS0FBSyxDQUFDSyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFFO1FBQUUsQ0FBQyxDQUFDO01BQ3BLLENBQUMsTUFBTTtRQUNIcEUsSUFBSSxDQUFDdUQsU0FBUyxDQUFDckQsS0FBSyxDQUFDMkQsSUFBSSxDQUFDLFVBQVNDLElBQUksRUFBRUMsS0FBSyxFQUFFO1VBQUUsT0FBT0QsSUFBSSxDQUFDTSxZQUFZLENBQUMsSUFBSUwsS0FBSyxDQUFDSyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUlOLElBQUksQ0FBQ00sWUFBWSxDQUFDLEdBQUdMLEtBQUssQ0FBQ0ssWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRTtRQUFFLENBQUMsQ0FBQztNQUNwSztJQUNKLENBQUMsQ0FBQztJQUVGMUUsMERBQWUsQ0FBQzhFLFNBQVMsQ0FBQzFFLFVBQVUsQ0FBQzJFLElBQUksQ0FBQyxJQUFJLEVBQUUxRSxPQUFPLENBQUM7RUFDNUQ7QUFDSixDQUFDLENBQUM7QUFDRixpRUFBZSxJQUFJSCxtQkFBbUIsQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy92aWV3cy9yZXNvdXJjZS9lZGl0LWxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IEJhc2VNYW5hZ2VyVmlldyBmcm9tICd2aWV3cy9iYXNlLW1hbmFnZXInO1xuaW1wb3J0IGRhdGEgZnJvbSAndmlld3MvcmVzb3VyY2UvcmVzb3VyY2UtZWRpdC1oaXN0b3J5LWRhdGEnO1xuaW1wb3J0ICdiaW5kaW5ncy9jaG9zZW4nO1xuXG5cbnZhciBSZXNvdXJjZUVkaXRMb2dWaWV3ID0gQmFzZU1hbmFnZXJWaWV3LmV4dGVuZCh7XG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhc1xuICAgICAgICB2YXIgY2FyZHMgPSBkYXRhLmNhcmRzO1xuICAgICAgICB2YXIgZWRpdHMgPSBkYXRhLmVkaXRzO1xuXG4gICAgICAgIHZhciBlZGl0VHlwZUxvb2t1cCA9IHtcbiAgICAgICAgICAgICdjcmVhdGUnOiB7aWNvbjogJ2ZhIGZhLWNoZXZyb24tY2lyY2xlLXJpZ2h0IGZhLWxnJywgY29sb3I6ICdiZy1taW50J30sXG4gICAgICAgICAgICAndGlsZSBlZGl0Jzoge2ljb246ICdmYSBmYS1yZXBlYXQgZmEtbGcnLCBjb2xvcjogJ2JnLXB1cnBsZSd9LFxuICAgICAgICAgICAgJ3RpbGUgY3JlYXRlJzoge2ljb246ICdmYSBmYS1wbHVzIGZhLWxnJywgY29sb3I6ICdiZy1kYXJrJ30sXG4gICAgICAgICAgICAndGlsZSBkZWxldGUnOiB7aWNvbjogJ2ZhIGZhLW1pbnVzIGZhLWxnJywgY29sb3I6ICdiZy1kYW5nZXInfSxcbiAgICAgICAgICAgICdkZWxldGUgZWRpdCc6IHtpY29uOiAnZmEgZmEtbWludXMgZmEtbGcnLCBjb2xvcjogJ2JnLWRhbmdlcid9LFxuICAgICAgICAgICAgJ3VwZGF0ZV9yZXNvdXJjZV9pbnN0YW5jZV9saWZlY3ljbGVfc3RhdGUnOiB7aWNvbjogJ2ZhIGZhLWV4Y2xhbWF0aW9uIGZhLWxnJywgY29sb3I6ICdiZy13YXJuaW5nJ30sXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGhhbmRsZUNoaWxkQ2FyZHMgPSBmdW5jdGlvbihjYXJkKSB7XG4gICAgICAgICAgICBpZiAoY2FyZC5jYXJkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKGNhcmQuY2FyZHMsIGZ1bmN0aW9uKHN1YkNhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKF8ud2hlcmUoZWRpdHMsIHsgbm9kZWdyb3VwaWQ6IHN1YkNhcmQubm9kZWdyb3VwX2lkIH0pLCBmdW5jdGlvbihtYXRjaCkgeyBtYXRjaC5jYXJkID0gc3ViQ2FyZDsgbWF0Y2guY2FyZENvbnRhaW5lck5hbWUgPSBjYXJkLm5hbWU7IH0pO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVDaGlsZENhcmRzKHN1YkNhcmQpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhc3NpZ25DYXJkcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBfLmVhY2goY2FyZHMsIGZ1bmN0aW9uKGNhcmQpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2goXy53aGVyZShlZGl0cywge25vZGVncm91cGlkOiBjYXJkLm5vZGVncm91cF9pZH0pLCBmdW5jdGlvbihtYXRjaCl7bWF0Y2guY2FyZCA9IGNhcmQ7IG1hdGNoLmNhcmRDb250YWluZXJOYW1lID0gbnVsbDt9KTtcbiAgICAgICAgICAgICAgICBoYW5kbGVDaGlsZENhcmRzKGNhcmQpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIGFzc2lnbkNhcmRzKCk7XG5cbiAgICAgICAgdmFyIGNyZWF0ZUZ1bGxWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBlZGl0KSB7XG4gICAgICAgICAgICB2YXIgZnVsbF92YWx1ZSA9IHt9O1xuICAgICAgICAgICAgZnVuY3Rpb24gcm91bmRlcihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiAxMDAwMDAwMCkgLyAxMDAwMDAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLmVhY2godmFsdWUsIGZ1bmN0aW9uKHYsIGspe1xuICAgICAgICAgICAgICAgIGlmIChfLmlzT2JqZWN0KHYpICYmIHZbJ2ZlYXR1cmVzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgdiA9IF8ubWFwKHZbJ2ZlYXR1cmVzJ10sIGZ1bmN0aW9uKGZlYXR1cmUpe3JldHVybiBKU09OLnN0cmluZ2lmeShmZWF0dXJlWydnZW9tZXRyeSddLCByb3VuZGVyLCA0KTt9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVsbF92YWx1ZVtrXSA9IHtuZXdfdmFsdWU6IHZ9O1xuICAgICAgICAgICAgICAgIGlmIChlZGl0LmNhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGVkaXQuY2FyZC5ub2RlcywgZnVuY3Rpb24obm9kZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoayA9PSBub2RlLm5vZGVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxfdmFsdWVbbm9kZS5ub2RlaWRdLm5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBfLm1hcChmdWxsX3ZhbHVlLCBmdW5jdGlvbih2LGspe3JldHVybiB2O30pOyAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIH07XG5cbiAgICAgICAgXy5lYWNoKGVkaXRzLCBmdW5jdGlvbihlZGl0KXtcbiAgICAgICAgICAgIHZhciBkYXRldGltZSA9IG1vbWVudChlZGl0LnRpbWVzdGFtcCk7XG4gICAgICAgICAgICBlZGl0LnRpbWUgPSBkYXRldGltZS5mb3JtYXQoXCJISDptbVwiKTtcbiAgICAgICAgICAgIGVkaXQuZGF5ID0gZGF0ZXRpbWUuZm9ybWF0KCdERCBNTU1NLCBZWVlZJyk7XG4gICAgICAgICAgICBlZGl0LmVkaXRvciA9IGVkaXQudXNlcl9lbWFpbCAhPSAnJyA/IGVkaXQudXNlcl9lbWFpbCA6IGVkaXQudXNlcl91c2VybmFtZTtcbiAgICAgICAgICAgIGVkaXQuZWRpdF90eXBlX2ljb24gPSBlZGl0VHlwZUxvb2t1cFtlZGl0LmVkaXR0eXBlXTtcbiAgICAgICAgICAgIGlmIChlZGl0Lm5vZGVncm91cGlkKSB7XG4gICAgICAgICAgICAgICAgZWRpdC5mdWxsX25ld192YWx1ZSA9IGNyZWF0ZUZ1bGxWYWx1ZShlZGl0Lm5ld3ZhbHVlLCBlZGl0KTtcbiAgICAgICAgICAgICAgICBlZGl0LmZ1bGxfb2xkX3ZhbHVlID0gY3JlYXRlRnVsbFZhbHVlKGVkaXQub2xkdmFsdWUsIGVkaXQpO1xuICAgICAgICAgICAgICAgIGVkaXQuZnVsbF9uZXdfcHJvdmlzaW9uYWxfdmFsdWUgPSBjcmVhdGVGdWxsVmFsdWUoZWRpdC5uZXdwcm92aXNpb25hbHZhbHVlLCBlZGl0KTtcbiAgICAgICAgICAgICAgICBlZGl0LmZ1bGxfb2xkX3Byb3Zpc2lvbmFsX3ZhbHVlID0gY3JlYXRlRnVsbFZhbHVlKGVkaXQub2xkcHJvdmlzaW9uYWx2YWx1ZSwgZWRpdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudmlld01vZGVsLmRpc3BsYXluYW1lID0gZGF0YS5kaXNwbGF5bmFtZTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5zb3J0T3JkZXIgPSBrby5vYnNlcnZhYmxlKCd0aW1lX2Rlc2MnKTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwuZWRpdHMgPSBrby5vYnNlcnZhYmxlQXJyYXkoZWRpdHMpO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5lZGl0cy5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0LnRpbWVzdGFtcCA9PSByaWdodC50aW1lc3RhbXAgPyAwIDogKGxlZnQudGltZXN0YW1wID4gcmlnaHQudGltZXN0YW1wID8gLTEgOiAxKTsgfSk7XG4gICAgICAgIHRoaXMudmlld01vZGVsLmN1cnJlbnREYXRlID0gbW9tZW50KCkuZm9ybWF0KCdNTU1NIEQsIFlZWVknKTtcblxuICAgICAgICB0aGlzLnZpZXdNb2RlbC5zb3J0T3JkZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgdmFyIHNvcnRDb25kaXRpb25zID0ge1xuICAgICAgICAgICAgICAgICd0aW1lX2Rlc2MnOiB7J3Byb3BlcnR5JzondGltZXN0YW1wJywgJ2RpcmVjdGlvbic6ICdndCd9LFxuICAgICAgICAgICAgICAgICd0aW1lX2FzYyc6IHsncHJvcGVydHknOid0aW1lc3RhbXAnLCAnZGlyZWN0aW9uJzogJ2x0J30sXG4gICAgICAgICAgICAgICAgJ2VkaXRvcl9hc2MnOiB7J3Byb3BlcnR5JzondXNlcl9lbWFpbCcsICdkaXJlY3Rpb24nOiAnbHQnfSxcbiAgICAgICAgICAgICAgICAndHlwZV9kZXNjJzogeydwcm9wZXJ0eSc6J2VkaXR0eXBlJywgJ2RpcmVjdGlvbic6ICdndCd9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHNvcnRQcm9wZXJ0eSA9IHNvcnRDb25kaXRpb25zW3ZhbF0ucHJvcGVydHk7XG4gICAgICAgICAgICB2YXIgc29ydERpcmVjdGlvbiA9IHNvcnRDb25kaXRpb25zW3ZhbF0uZGlyZWN0aW9uO1xuICAgICAgICAgICAgaWYgKHNvcnREaXJlY3Rpb24gPT0gJ2d0Jykge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld01vZGVsLmVkaXRzLnNvcnQoZnVuY3Rpb24obGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnRbc29ydFByb3BlcnR5XSA9PSByaWdodFtzb3J0UHJvcGVydHldID8gMCA6IChsZWZ0W3NvcnRQcm9wZXJ0eV0gPiByaWdodFtzb3J0UHJvcGVydHldID8gLTEgOiAxKTsgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld01vZGVsLmVkaXRzLnNvcnQoZnVuY3Rpb24obGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnRbc29ydFByb3BlcnR5XSA9PSByaWdodFtzb3J0UHJvcGVydHldID8gMCA6IChsZWZ0W3NvcnRQcm9wZXJ0eV0gPCByaWdodFtzb3J0UHJvcGVydHldID8gLTEgOiAxKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEJhc2VNYW5hZ2VyVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgbmV3IFJlc291cmNlRWRpdExvZ1ZpZXcoKTtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwibW9tZW50IiwiQmFzZU1hbmFnZXJWaWV3IiwiZGF0YSIsIlJlc291cmNlRWRpdExvZ1ZpZXciLCJleHRlbmQiLCJpbml0aWFsaXplIiwib3B0aW9ucyIsInNlbGYiLCJjYXJkcyIsImVkaXRzIiwiZWRpdFR5cGVMb29rdXAiLCJpY29uIiwiY29sb3IiLCJoYW5kbGVDaGlsZENhcmRzIiwiY2FyZCIsImxlbmd0aCIsImVhY2giLCJzdWJDYXJkIiwid2hlcmUiLCJub2RlZ3JvdXBpZCIsIm5vZGVncm91cF9pZCIsIm1hdGNoIiwiY2FyZENvbnRhaW5lck5hbWUiLCJuYW1lIiwiYXNzaWduQ2FyZHMiLCJjcmVhdGVGdWxsVmFsdWUiLCJ2YWx1ZSIsImVkaXQiLCJmdWxsX3ZhbHVlIiwicm91bmRlciIsImtleSIsIk1hdGgiLCJyb3VuZCIsInYiLCJrIiwiaXNPYmplY3QiLCJtYXAiLCJmZWF0dXJlIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5ld192YWx1ZSIsIm5vZGVzIiwibm9kZSIsIm5vZGVpZCIsImRhdGV0aW1lIiwidGltZXN0YW1wIiwidGltZSIsImZvcm1hdCIsImRheSIsImVkaXRvciIsInVzZXJfZW1haWwiLCJ1c2VyX3VzZXJuYW1lIiwiZWRpdF90eXBlX2ljb24iLCJlZGl0dHlwZSIsImZ1bGxfbmV3X3ZhbHVlIiwibmV3dmFsdWUiLCJmdWxsX29sZF92YWx1ZSIsIm9sZHZhbHVlIiwiZnVsbF9uZXdfcHJvdmlzaW9uYWxfdmFsdWUiLCJuZXdwcm92aXNpb25hbHZhbHVlIiwiZnVsbF9vbGRfcHJvdmlzaW9uYWxfdmFsdWUiLCJvbGRwcm92aXNpb25hbHZhbHVlIiwidmlld01vZGVsIiwiZGlzcGxheW5hbWUiLCJkZXNjcmlwdGlvbiIsInNvcnRPcmRlciIsIm9ic2VydmFibGUiLCJvYnNlcnZhYmxlQXJyYXkiLCJzb3J0IiwibGVmdCIsInJpZ2h0IiwiY3VycmVudERhdGUiLCJzdWJzY3JpYmUiLCJ2YWwiLCJzb3J0Q29uZGl0aW9ucyIsInNvcnRQcm9wZXJ0eSIsInByb3BlcnR5Iiwic29ydERpcmVjdGlvbiIsImRpcmVjdGlvbiIsInByb3RvdHlwZSIsImNhbGwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==