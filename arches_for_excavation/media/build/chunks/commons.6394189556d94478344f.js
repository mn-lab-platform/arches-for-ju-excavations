"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[88025],{

/***/ 88025:
/*!**********************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/graph/permission-designer.js ***!
  \**********************************************************************************************************/
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
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var views_graph_permission_manager_identity_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/graph/permission-manager/identity-list */ 1463);
/* harmony import */ var views_graph_permission_manager_permission_settings_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/graph/permission-manager/permission-settings-form */ 52232);








/**
* A viewmodel for managing nodegroup permissions
*
* @constructor
* @name PermissionDesignerViewModel
*
* @param  {string} params - a configuration object
*/

var PermissionDesignerViewModel = function PermissionDesignerViewModel(params) {
  var self = this;
  var permIcons = {
    'no_access_to_nodegroup': 'ion-close',
    'read_nodegroup': 'ion-ios-book',
    'write_nodegroup': 'ion-edit',
    'delete_nodegroup': 'ion-android-delete'
  };
  self.identityList = new views_graph_permission_manager_identity_list__WEBPACK_IMPORTED_MODULE_5__["default"]({
    items: knockout__WEBPACK_IMPORTED_MODULE_2___default().observableArray()
  });
  self.identityList.selectedItems.subscribe(function (item) {
    self.updatePermissions();
  });
  self.showPermissionsForm = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable(false);
  self.cardTree = params.cardTree;
  self.cardList = null;
  self.selectedCards = knockout__WEBPACK_IMPORTED_MODULE_2___default().pureComputed(function () {
    return self.cardTree.selection();
  });
  self.getPermissionManagerData = function () {
    self.cardList = self.cardTree.flattenTree(knockout__WEBPACK_IMPORTED_MODULE_2___default().unwrap(self.cardTree.topCards), []);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      url: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.permission_manager_data
    }).done(function (data) {
      data.identities.forEach(function (identity) {
        identity.permsLiteral = ' - ' + underscore__WEBPACK_IMPORTED_MODULE_1___default().pluck(identity.default_permissions, 'name').join(', ');
      });
      self.identityList.items(data.identities);
      data.permissions.forEach(function (perm) {
        perm.icon = permIcons[perm.codename];
      });
      self.permissionSettingsForm = new views_graph_permission_manager_permission_settings_form__WEBPACK_IMPORTED_MODULE_6__["default"]({
        identityList: self.identityList,
        selectedIdentities: self.identityList.selectedItems,
        selectedCards: self.selectedCards,
        nodegroupPermissions: data.permissions,
        cardList: self.cardList
      });
      self.showPermissionsForm(true);
      self.permissionSettingsForm.on('save', function () {
        self.updatePermissions();
      });
      self.permissionSettingsForm.on('revert', function () {
        self.updatePermissions();
      });
    }).fail(function (err) {
      console.log(err);
    });
  };
  this.updatePermissions = function () {
    var item = self.identityList.selectedItems()[0];
    var nodegroupIds = [];
    if (item) {
      self.cardList.forEach(function (item) {
        nodegroupIds.push(item.model.nodegroup_id());
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'GET',
        url: arches__WEBPACK_IMPORTED_MODULE_4__["default"].urls.permission_data,
        data: {
          'nodegroupIds': JSON.stringify(nodegroupIds),
          'identityType': item.type,
          'identityId': item.id
        },
        success: function success(res) {
          res.forEach(function (nodegroup) {
            var card = underscore__WEBPACK_IMPORTED_MODULE_1___default().find(self.cardList, function (card) {
              return card.model.nodegroup_id() === nodegroup.nodegroup_id;
            });
            if (nodegroup.perms.length === 0) {
              nodegroup.perms = self.identityList.selectedItems()[0].default_permissions;
            }
            nodegroup.perms.forEach(function (perm) {
              perm.icon = permIcons[perm.codename];
            });
            card.perms(nodegroup.perms);
            card.permsLiteral(' - ' + underscore__WEBPACK_IMPORTED_MODULE_1___default().pluck(nodegroup.perms, 'name').join(', '));
            if (card.type === 'card') {
              if (card.children.length > 0) {
                card.children.forEach(function (child) {
                  if (child.type === 'node') {
                    child.perms(nodegroup.perms);
                  }
                });
              }
            }
          });
        }
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PermissionDesignerViewModel);
/**
* a GraphPageView representing the graph manager page
*/
// var graphPageView = new GraphPageView({
//     viewModel: {
//         identityList: identityList,
//         groupedNodeList: groupedNodeList,
//         permissionSettingsForm: permissionSettingsForm
//     }
// });

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDO2NBQ047WUFDSjtVQUNKLENBQUMsQ0FBQztRQUNOO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFDSixDQUFDO0FBQ0wsQ0FBQztBQUVELGlFQUFlN0QsMkJBQTJCLEVBQUM7QUFDM0M7QUFDSjtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2dyYXBoL3Blcm1pc3Npb24tZGVzaWduZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgSWRlbnRpdHlMaXN0IGZyb20gJ3ZpZXdzL2dyYXBoL3Blcm1pc3Npb24tbWFuYWdlci9pZGVudGl0eS1saXN0JztcbmltcG9ydCBQZXJtaXNzaW9uU2V0dGluZ3NGb3JtIGZyb20gJ3ZpZXdzL2dyYXBoL3Blcm1pc3Npb24tbWFuYWdlci9wZXJtaXNzaW9uLXNldHRpbmdzLWZvcm0nO1xuXG5cbiAgICAvKipcbiAgICAqIEEgdmlld21vZGVsIGZvciBtYW5hZ2luZyBub2RlZ3JvdXAgcGVybWlzc2lvbnNcbiAgICAqXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqIEBuYW1lIFBlcm1pc3Npb25EZXNpZ25lclZpZXdNb2RlbFxuICAgICpcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gcGFyYW1zIC0gYSBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICovXG5cbiAgICB2YXIgUGVybWlzc2lvbkRlc2lnbmVyVmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHBlcm1JY29ucyA9IHtcbiAgICAgICAgICAgICdub19hY2Nlc3NfdG9fbm9kZWdyb3VwJzogJ2lvbi1jbG9zZScsXG4gICAgICAgICAgICAncmVhZF9ub2RlZ3JvdXAnOiAnaW9uLWlvcy1ib29rJyxcbiAgICAgICAgICAgICd3cml0ZV9ub2RlZ3JvdXAnOiAnaW9uLWVkaXQnLFxuICAgICAgICAgICAgJ2RlbGV0ZV9ub2RlZ3JvdXAnOiAnaW9uLWFuZHJvaWQtZGVsZXRlJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuaWRlbnRpdHlMaXN0ID0gbmV3IElkZW50aXR5TGlzdCh7XG4gICAgICAgICAgICBpdGVtczoga28ub2JzZXJ2YWJsZUFycmF5KClcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuaWRlbnRpdHlMaXN0LnNlbGVjdGVkSXRlbXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlUGVybWlzc2lvbnMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuc2hvd1Blcm1pc3Npb25zRm9ybSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICBzZWxmLmNhcmRUcmVlID0gcGFyYW1zLmNhcmRUcmVlO1xuICAgICAgICBzZWxmLmNhcmRMaXN0ID0gbnVsbDtcblxuICAgICAgICBzZWxmLnNlbGVjdGVkQ2FyZHMgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5jYXJkVHJlZS5zZWxlY3Rpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5nZXRQZXJtaXNzaW9uTWFuYWdlckRhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuY2FyZExpc3QgPSBzZWxmLmNhcmRUcmVlLmZsYXR0ZW5UcmVlKGtvLnVud3JhcChzZWxmLmNhcmRUcmVlLnRvcENhcmRzKSwgW10pO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLnBlcm1pc3Npb25fbWFuYWdlcl9kYXRhXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5pZGVudGl0aWVzLmZvckVhY2goZnVuY3Rpb24oaWRlbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5LnBlcm1zTGl0ZXJhbCA9ICcgLSAnICsgXy5wbHVjayhpZGVudGl0eS5kZWZhdWx0X3Blcm1pc3Npb25zLCAnbmFtZScpLmpvaW4oJywgJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmlkZW50aXR5TGlzdC5pdGVtcyhkYXRhLmlkZW50aXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnBlcm1pc3Npb25zLmZvckVhY2goZnVuY3Rpb24ocGVybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVybS5pY29uID0gcGVybUljb25zW3Blcm0uY29kZW5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBlcm1pc3Npb25TZXR0aW5nc0Zvcm0gPSBuZXcgUGVybWlzc2lvblNldHRpbmdzRm9ybSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGl0eUxpc3Q6IHNlbGYuaWRlbnRpdHlMaXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJZGVudGl0aWVzOiBzZWxmLmlkZW50aXR5TGlzdC5zZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJkczogc2VsZi5zZWxlY3RlZENhcmRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZWdyb3VwUGVybWlzc2lvbnM6IGRhdGEucGVybWlzc2lvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTGlzdDogc2VsZi5jYXJkTGlzdFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dQZXJtaXNzaW9uc0Zvcm0odHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wZXJtaXNzaW9uU2V0dGluZ3NGb3JtLm9uKCdzYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVBlcm1pc3Npb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBlcm1pc3Npb25TZXR0aW5nc0Zvcm0ub24oJ3JldmVydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVQZXJtaXNzaW9ucygpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudXBkYXRlUGVybWlzc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gc2VsZi5pZGVudGl0eUxpc3Quc2VsZWN0ZWRJdGVtcygpWzBdO1xuICAgICAgICAgICAgdmFyIG5vZGVncm91cElkcyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHNlbGYuY2FyZExpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVncm91cElkcy5wdXNoKGl0ZW0ubW9kZWwubm9kZWdyb3VwX2lkKCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGFyY2hlcy51cmxzLnBlcm1pc3Npb25fZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeydub2RlZ3JvdXBJZHMnOiBKU09OLnN0cmluZ2lmeShub2RlZ3JvdXBJZHMpLCAnaWRlbnRpdHlUeXBlJzogaXRlbS50eXBlLCAnaWRlbnRpdHlJZCc6IGl0ZW0uaWR9LFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGVncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJkID0gXy5maW5kKHNlbGYuY2FyZExpc3QsIGZ1bmN0aW9uKGNhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcmQubW9kZWwubm9kZWdyb3VwX2lkKCkgPT09IG5vZGVncm91cC5ub2RlZ3JvdXBfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZWdyb3VwLnBlcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlZ3JvdXAucGVybXMgPSBzZWxmLmlkZW50aXR5TGlzdC5zZWxlY3RlZEl0ZW1zKClbMF0uZGVmYXVsdF9wZXJtaXNzaW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZWdyb3VwLnBlcm1zLmZvckVhY2goZnVuY3Rpb24ocGVybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtLmljb24gPSBwZXJtSWNvbnNbcGVybS5jb2RlbmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC5wZXJtcyhub2RlZ3JvdXAucGVybXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQucGVybXNMaXRlcmFsKCcgLSAnICsgXy5wbHVjayhub2RlZ3JvdXAucGVybXMsICduYW1lJykuam9pbignLCAnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZC50eXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdub2RlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wZXJtcyhub2RlZ3JvdXAucGVybXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgUGVybWlzc2lvbkRlc2lnbmVyVmlld01vZGVsO1xuICAgIC8qKlxuICAgICogYSBHcmFwaFBhZ2VWaWV3IHJlcHJlc2VudGluZyB0aGUgZ3JhcGggbWFuYWdlciBwYWdlXG4gICAgKi9cbiAgICAvLyB2YXIgZ3JhcGhQYWdlVmlldyA9IG5ldyBHcmFwaFBhZ2VWaWV3KHtcbiAgICAvLyAgICAgdmlld01vZGVsOiB7XG4gICAgLy8gICAgICAgICBpZGVudGl0eUxpc3Q6IGlkZW50aXR5TGlzdCxcbiAgICAvLyAgICAgICAgIGdyb3VwZWROb2RlTGlzdDogZ3JvdXBlZE5vZGVMaXN0LFxuICAgIC8vICAgICAgICAgcGVybWlzc2lvblNldHRpbmdzRm9ybTogcGVybWlzc2lvblNldHRpbmdzRm9ybVxuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG4iXSwibmFtZXMiOlsiJCIsIl8iLCJrbyIsImtvTWFwcGluZyIsImFyY2hlcyIsIklkZW50aXR5TGlzdCIsIlBlcm1pc3Npb25TZXR0aW5nc0Zvcm0iLCJQZXJtaXNzaW9uRGVzaWduZXJWaWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwicGVybUljb25zIiwiaWRlbnRpdHlMaXN0IiwiaXRlbXMiLCJvYnNlcnZhYmxlQXJyYXkiLCJzZWxlY3RlZEl0ZW1zIiwic3Vic2NyaWJlIiwiaXRlbSIsInVwZGF0ZVBlcm1pc3Npb25zIiwic2hvd1Blcm1pc3Npb25zRm9ybSIsIm9ic2VydmFibGUiLCJjYXJkVHJlZSIsImNhcmRMaXN0Iiwic2VsZWN0ZWRDYXJkcyIsInB1cmVDb21wdXRlZCIsInNlbGVjdGlvbiIsImdldFBlcm1pc3Npb25NYW5hZ2VyRGF0YSIsImZsYXR0ZW5UcmVlIiwidW53cmFwIiwidG9wQ2FyZHMiLCJhamF4IiwidXJsIiwidXJscyIsInBlcm1pc3Npb25fbWFuYWdlcl9kYXRhIiwiZG9uZSIsImRhdGEiLCJpZGVudGl0aWVzIiwiZm9yRWFjaCIsImlkZW50aXR5IiwicGVybXNMaXRlcmFsIiwicGx1Y2siLCJkZWZhdWx0X3Blcm1pc3Npb25zIiwiam9pbiIsInBlcm1pc3Npb25zIiwicGVybSIsImljb24iLCJjb2RlbmFtZSIsInBlcm1pc3Npb25TZXR0aW5nc0Zvcm0iLCJzZWxlY3RlZElkZW50aXRpZXMiLCJub2RlZ3JvdXBQZXJtaXNzaW9ucyIsIm9uIiwiZmFpbCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJub2RlZ3JvdXBJZHMiLCJwdXNoIiwibW9kZWwiLCJub2RlZ3JvdXBfaWQiLCJ0eXBlIiwicGVybWlzc2lvbl9kYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImlkIiwic3VjY2VzcyIsInJlcyIsIm5vZGVncm91cCIsImNhcmQiLCJmaW5kIiwicGVybXMiLCJsZW5ndGgiLCJjaGlsZHJlbiIsImNoaWxkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=