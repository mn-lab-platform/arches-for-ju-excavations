"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[52232],{

/***/ 52232:
/*!**********************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/permission-manager/permission-settings-form.js ***!
  \**********************************************************************************************************************************/
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





var PermissionSettingsForm = backbone__WEBPACK_IMPORTED_MODULE_2___default().View.extend({
  /**
  * A backbone view representing a card component form
  * @augments Backbone.View
  * @constructor
  * @name PermissionSettingsForm
  */

  /**
  * Initializes the view with optional parameters
  * @memberof PermissionSettingsForm.prototype
  * @param {boolean} options.selection - the selected item, either a {@link CardModel} or a {@link NodeModel}
  */
  initialize: function initialize(options) {
    this.selectedIdentities = options.selectedIdentities;
    this.identityList = options.identityList;
    this.selectedCards = options.selectedCards;
    this.noAccessPerm = undefined;
    this.whiteListPerms = [];
    this.groupedNodeList = options.groupedNodeList;
    this.groups = knockout__WEBPACK_IMPORTED_MODULE_3___default().utils.arrayFilter(this.identityList.items(), function (identity) {
      return identity.type === 'group';
    });
    this.groups = underscore__WEBPACK_IMPORTED_MODULE_1___default().forEach(this.groups, function (group) {
      group.combinedId = 'group-' + group.id;
    });
    this.users = knockout__WEBPACK_IMPORTED_MODULE_3___default().utils.arrayFilter(this.identityList.items(), function (identity) {
      return identity.type === 'user';
    });
    this.users = underscore__WEBPACK_IMPORTED_MODULE_1___default().forEach(this.users, function (user) {
      user.combinedId = 'user-' + user.id;
    });
    this.identityid = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(this.groups[0]);
    this.identityid.subscribe(function (val) {
      underscore__WEBPACK_IMPORTED_MODULE_1___default().forEach(options.identityList.items(), function (item) {
        if (item.combinedId != val) {
          item.selected(false);
        } else {
          item.selected(true);
        }
      });
    });
    this.groupedIdentities = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable({
      groups: [{
        name: 'Groups',
        items: this.groups
      }, {
        name: 'Accounts',
        items: this.users
      }]
    });
    options.nodegroupPermissions.forEach(function (perm) {
      perm.selected = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable(false);
      if (perm.codename === 'no_access_to_nodegroup') {
        this.noAccessPerm = perm;
        perm.selected.subscribe(function (selected) {
          if (selected) {
            this.whiteListPerms.forEach(function (perm) {
              perm.selected(false);
            }, this);
          }
        }, this);
      } else {
        this.whiteListPerms.push(perm);
        perm.selected.subscribe(function (selected) {
          if (selected) {
            this.noAccessPerm.selected(false);
          }
        }, this);
      }
    }, this);
    this.nodegroupPermissions = knockout__WEBPACK_IMPORTED_MODULE_3___default().observableArray(options.nodegroupPermissions);
  },
  save: function save() {
    var self = this;
    var postData = {
      'selectedIdentities': this.selectedIdentities().map(function (identity) {
        return {
          type: identity.type,
          id: identity.id
        };
      }),
      'selectedCards': this.selectedCards().map(function (card) {
        return {
          nodegroupid: card.nodegroupid || knockout__WEBPACK_IMPORTED_MODULE_3___default().unwrap(card.model.nodegroup_id)
        };
      }),
      'selectedPermissions': underscore__WEBPACK_IMPORTED_MODULE_1___default().filter(this.nodegroupPermissions(), function (perm) {
        return perm.selected();
      }).map(function (perm) {
        return {
          codename: perm.codename
        };
      })
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: 'POST',
      url: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.permission_data,
      data: JSON.stringify(postData),
      success: function success(res) {
        self.trigger('save');
        self.clearUserPermissionCache();
        // adds event to trigger dirty state in graph-designer
        document.dispatchEvent(new Event('permissionsSave'));
      }
    });
  },
  revert: function revert() {
    var self = this;
    var postData = {
      'selectedIdentities': this.selectedIdentities(),
      'selectedCards': this.selectedCards()
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: 'DELETE',
      url: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.permission_data,
      data: JSON.stringify(postData),
      success: function success(res) {
        self.clearUserPermissionCache();
        self.trigger('revert');
        // adds event to trigger dirty state in graph-designer
        document.dispatchEvent(new Event('permissionsSave'));
      }
    });
  },
  clearUserPermissionCache: function clearUserPermissionCache() {
    return jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: 'POST',
      url: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.clear_user_permission_cache
    });
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PermissionSettingsForm);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuMDdmY2JmMTczYzlmMDQ2ZjlhNGYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNJO0FBQ0s7QUFDTjtBQUNFO0FBRzVCLElBQUlLLHNCQUFzQixHQUFHSCxvREFBYSxDQUFDSyxNQUFNLENBQUM7RUFDOUM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFDSUMsVUFBVSxFQUFFLFNBQVpBLFVBQVVBLENBQVdDLE9BQU8sRUFBRTtJQUMxQixJQUFJLENBQUNDLGtCQUFrQixHQUFHRCxPQUFPLENBQUNDLGtCQUFrQjtJQUNwRCxJQUFJLENBQUNDLFlBQVksR0FBR0YsT0FBTyxDQUFDRSxZQUFZO0lBQ3hDLElBQUksQ0FBQ0MsYUFBYSxHQUFHSCxPQUFPLENBQUNHLGFBQWE7SUFDMUMsSUFBSSxDQUFDQyxZQUFZLEdBQUdDLFNBQVM7SUFDN0IsSUFBSSxDQUFDQyxjQUFjLEdBQUcsRUFBRTtJQUN4QixJQUFJLENBQUNDLGVBQWUsR0FBR1AsT0FBTyxDQUFDTyxlQUFlO0lBRTlDLElBQUksQ0FBQ0MsTUFBTSxHQUFHZCxxREFBUSxDQUFDZ0IsV0FBVyxDQUFDLElBQUksQ0FBQ1IsWUFBWSxDQUFDUyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVNDLFFBQVEsRUFBRTtNQUM3RSxPQUFPQSxRQUFRLENBQUNDLElBQUksS0FBSyxPQUFPO0lBQ3BDLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ0wsTUFBTSxHQUFHaEIseURBQVMsQ0FBQyxJQUFJLENBQUNnQixNQUFNLEVBQUUsVUFBU08sS0FBSyxFQUFFO01BQ2pEQSxLQUFLLENBQUNDLFVBQVUsR0FBRyxRQUFRLEdBQUdELEtBQUssQ0FBQ0UsRUFBRTtJQUMxQyxDQUFDLENBQUM7SUFFRixJQUFJLENBQUNDLEtBQUssR0FBR3hCLHFEQUFRLENBQUNnQixXQUFXLENBQUMsSUFBSSxDQUFDUixZQUFZLENBQUNTLEtB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QUNYLG9CQUFvQixFQUFFLElBQUksQ0FBQ2xDLGtCQUFrQixDQUFDLENBQUM7TUFDL0MsZUFBZSxFQUFFLElBQUksQ0FBQ0UsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFFRFosa0RBQU0sQ0FBQztNQUNIc0IsSUFBSSxFQUFFLFFBQVE7TUFDZCtCLEdBQUcsRUFBRWpELDhDQUFNLENBQUNrRCxJQUFJLENBQUNDLGVBQWU7TUFDaENDLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUNkLFFBQVEsQ0FBQztNQUM5QmUsT0FBTyxFQUFFLFNBQVRBLE9BQU9BLENBQVdDLEdBQUcsRUFBRTtRQUNuQmpCLElBQUksQ0FBQ21CLHdCQUF3QixDQUFDLENBQUM7UUFDL0JuQixJQUFJLENBQUNrQixPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RCO1FBQ0FFLFFBQVEsQ0FBQ0MsYUFBYSxDQUNsQixJQUFJQyxLQUFLLENBQUMsaUJBQWlCLENBQy9CLENBQUM7TUFDTDtJQUNKLENBQUMsQ0FBQztFQUNOLENBQUM7RUFFREgsd0JBQXdCLEVBQUUsU0FBMUJBLHdCQUF3QkEsQ0FBQSxFQUFhO0lBQ2pDLE9BQU85RCxrREFBTSxDQUFDO01BQ1ZzQixJQUFJLEVBQUUsTUFBTTtNQUNaK0IsR0FBRyxFQUFFakQsOENBQU0sQ0FBQ2tELElBQUksQ0FBQ2E7SUFDckIsQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDLENBQUM7QUFDRixpRUFBZTlELHNCQUFzQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvZ3JhcGgvcGVybWlzc2lvbi1tYW5hZ2VyL3Blcm1pc3Npb24tc2V0dGluZ3MtZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcblxuXG52YXIgUGVybWlzc2lvblNldHRpbmdzRm9ybSA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAqIEEgYmFja2JvbmUgdmlldyByZXByZXNlbnRpbmcgYSBjYXJkIGNvbXBvbmVudCBmb3JtXG4gICAgKiBAYXVnbWVudHMgQmFja2JvbmUuVmlld1xuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKiBAbmFtZSBQZXJtaXNzaW9uU2V0dGluZ3NGb3JtXG4gICAgKi9cblxuICAgIC8qKlxuICAgICogSW5pdGlhbGl6ZXMgdGhlIHZpZXcgd2l0aCBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgKiBAbWVtYmVyb2YgUGVybWlzc2lvblNldHRpbmdzRm9ybS5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zZWxlY3Rpb24gLSB0aGUgc2VsZWN0ZWQgaXRlbSwgZWl0aGVyIGEge0BsaW5rIENhcmRNb2RlbH0gb3IgYSB7QGxpbmsgTm9kZU1vZGVsfVxuICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSWRlbnRpdGllcyA9IG9wdGlvbnMuc2VsZWN0ZWRJZGVudGl0aWVzO1xuICAgICAgICB0aGlzLmlkZW50aXR5TGlzdCA9IG9wdGlvbnMuaWRlbnRpdHlMaXN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyZHMgPSBvcHRpb25zLnNlbGVjdGVkQ2FyZHM7XG4gICAgICAgIHRoaXMubm9BY2Nlc3NQZXJtID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLndoaXRlTGlzdFBlcm1zID0gW107XG4gICAgICAgIHRoaXMuZ3JvdXBlZE5vZGVMaXN0ID0gb3B0aW9ucy5ncm91cGVkTm9kZUxpc3Q7XG5cbiAgICAgICAgdGhpcy5ncm91cHMgPSBrby51dGlscy5hcnJheUZpbHRlcih0aGlzLmlkZW50aXR5TGlzdC5pdGVtcygpLCBmdW5jdGlvbihpZGVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuIGlkZW50aXR5LnR5cGUgPT09ICdncm91cCc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ3JvdXBzID0gXy5mb3JFYWNoKHRoaXMuZ3JvdXBzLCBmdW5jdGlvbihncm91cCkge1xuICAgICAgICAgICAgZ3JvdXAuY29tYmluZWRJZCA9ICdncm91cC0nICsgZ3JvdXAuaWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlcnMgPSBrby51dGlscy5hcnJheUZpbHRlcih0aGlzLmlkZW50aXR5TGlzdC5pdGVtcygpLCBmdW5jdGlvbihpZGVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuIGlkZW50aXR5LnR5cGUgPT09ICd1c2VyJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VycyA9IF8uZm9yRWFjaCh0aGlzLnVzZXJzLCBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICB1c2VyLmNvbWJpbmVkSWQgPSAndXNlci0nICsgdXNlci5pZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pZGVudGl0eWlkID0ga28ub2JzZXJ2YWJsZSh0aGlzLmdyb3Vwc1swXSk7XG5cbiAgICAgICAgdGhpcy5pZGVudGl0eWlkLnN1YnNjcmliZShmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChvcHRpb25zLmlkZW50aXR5TGlzdC5pdGVtcygpLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29tYmluZWRJZCAhPSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmdyb3VwZWRJZGVudGl0aWVzID0ga28ub2JzZXJ2YWJsZSh7XG4gICAgICAgICAgICBncm91cHM6IFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdHcm91cHMnLCBpdGVtczogdGhpcy5ncm91cHMgfSxcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdBY2NvdW50cycsIGl0ZW1zOiB0aGlzLnVzZXJzIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3B0aW9ucy5ub2RlZ3JvdXBQZXJtaXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHBlcm0pIHtcbiAgICAgICAgICAgIHBlcm0uc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChwZXJtLmNvZGVuYW1lID09PSAnbm9fYWNjZXNzX3RvX25vZGVncm91cCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vQWNjZXNzUGVybSA9IHBlcm07XG4gICAgICAgICAgICAgICAgcGVybS5zZWxlY3RlZC5zdWJzY3JpYmUoZnVuY3Rpb24oc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndoaXRlTGlzdFBlcm1zLmZvckVhY2goZnVuY3Rpb24ocGVybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm0uc2VsZWN0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aGl0ZUxpc3RQZXJtcy5wdXNoKHBlcm0pO1xuICAgICAgICAgICAgICAgIHBlcm0uc2VsZWN0ZWQuc3Vic2NyaWJlKGZ1bmN0aW9uKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub0FjY2Vzc1Blcm0uc2VsZWN0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm9kZWdyb3VwUGVybWlzc2lvbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkob3B0aW9ucy5ub2RlZ3JvdXBQZXJtaXNzaW9ucyk7XG4gICAgfSxcblxuICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBwb3N0RGF0YSA9IHtcbiAgICAgICAgICAgICdzZWxlY3RlZElkZW50aXRpZXMnOiB0aGlzLnNlbGVjdGVkSWRlbnRpdGllcygpLm1hcChmdW5jdGlvbihpZGVudGl0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGlkZW50aXR5LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZGVudGl0eS5pZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICdzZWxlY3RlZENhcmRzJzogdGhpcy5zZWxlY3RlZENhcmRzKCkubWFwKGZ1bmN0aW9uKGNhcmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBub2RlZ3JvdXBpZDogY2FyZC5ub2RlZ3JvdXBpZCB8fCBrby51bndyYXAoY2FyZC5tb2RlbC5ub2RlZ3JvdXBfaWQpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgJ3NlbGVjdGVkUGVybWlzc2lvbnMnOiBfLmZpbHRlcih0aGlzLm5vZGVncm91cFBlcm1pc3Npb25zKCksIGZ1bmN0aW9uKHBlcm0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVybS5zZWxlY3RlZCgpO1xuICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHBlcm0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2RlbmFtZTogcGVybS5jb2RlbmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLnBlcm1pc3Npb25fZGF0YSxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBvc3REYXRhKSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlcignc2F2ZScpO1xuICAgICAgICAgICAgICAgIHNlbGYuY2xlYXJVc2VyUGVybWlzc2lvbkNhY2hlKCk7XG4gICAgICAgICAgICAgICAgLy8gYWRkcyBldmVudCB0byB0cmlnZ2VyIGRpcnR5IHN0YXRlIGluIGdyYXBoLWRlc2lnbmVyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgICAgICAgbmV3IEV2ZW50KCdwZXJtaXNzaW9uc1NhdmUnKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZXZlcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBwb3N0RGF0YSA9IHtcbiAgICAgICAgICAgICdzZWxlY3RlZElkZW50aXRpZXMnOiB0aGlzLnNlbGVjdGVkSWRlbnRpdGllcygpLFxuICAgICAgICAgICAgJ3NlbGVjdGVkQ2FyZHMnOiB0aGlzLnNlbGVjdGVkQ2FyZHMoKVxuICAgICAgICB9O1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcbiAgICAgICAgICAgIHVybDogYXJjaGVzLnVybHMucGVybWlzc2lvbl9kYXRhLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbGVhclVzZXJQZXJtaXNzaW9uQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3JldmVydCcpO1xuICAgICAgICAgICAgICAgIC8vIGFkZHMgZXZlbnQgdG8gdHJpZ2dlciBkaXJ0eSBzdGF0ZSBpbiBncmFwaC1kZXNpZ25lclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFdmVudCgncGVybWlzc2lvbnNTYXZlJylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2xlYXJVc2VyUGVybWlzc2lvbkNhY2hlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLmNsZWFyX3VzZXJfcGVybWlzc2lvbl9jYWNoZSxcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5leHBvcnQgZGVmYXVsdCBQZXJtaXNzaW9uU2V0dGluZ3NGb3JtO1xuIl0sIm5hbWVzIjpbIiQiLCJfIiwiQmFja2JvbmUiLCJrbyIsImFyY2hlcyIsIlBlcm1pc3Npb25TZXR0aW5nc0Zvcm0iLCJWaWV3IiwiZXh0ZW5kIiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJzZWxlY3RlZElkZW50aXRpZXMiLCJpZGVudGl0eUxpc3QiLCJzZWxlY3RlZENhcmRzIiwibm9BY2Nlc3NQZXJtIiwidW5kZWZpbmVkIiwid2hpdGVMaXN0UGVybXMiLCJncm91cGVkTm9kZUxpc3QiLCJncm91cHMiLCJ1dGlscyIsImFycmF5RmlsdGVyIiwiaXRlbXMiLCJpZGVudGl0eSIsInR5cGUiLCJmb3JFYWNoIiwiZ3JvdXAiLCJjb21iaW5lZElkIiwiaWQiLCJ1c2VycyIsInVzZXIiLCJpZGVudGl0eWlkIiwib2JzZXJ2YWJsZSIsInN1YnNjcmliZSIsInZhbCIsIml0ZW0iLCJzZWxlY3RlZCIsImdyb3VwZWRJZGVudGl0aWVzIiwibmFtZSIsIm5vZGVncm91cFBlcm1pc3Npb25zIiwicGVybSIsImNvZGVuYW1lIiwicHVzaCIsIm9ic2VydmFibGVBcnJheSIsInNhdmUiLCJzZWxmIiwicG9zdERhdGEiLCJtYXAiLCJjYXJkIiwibm9kZWdyb3VwaWQiLCJ1bndyYXAiLCJtb2RlbCIsIm5vZGVncm91cF9pZCIsImZpbHRlciIsImFqYXgiLCJ1cmwiLCJ1cmxzIiwicGVybWlzc2lvbl9kYXRhIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWNjZXNzIiwicmVzIiwidHJpZ2dlciIsImNsZWFyVXNlclBlcm1pc3Npb25DYWNoZSIsImRvY3VtZW50IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwicmV2ZXJ0IiwiY2xlYXJfdXNlcl9wZXJtaXNzaW9uX2NhY2hlIl0sInNvdXJjZVJvb3QiOiIifQ==