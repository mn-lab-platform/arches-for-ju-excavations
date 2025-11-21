"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[55402],{

/***/ 55402:
/*!****************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/node-value.js + 1 modules ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ node_value)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
var underscore_min_default = /*#__PURE__*/__webpack_require__.n(underscore_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/datatypes/node-value.htm
const node_value_namespaceObject = "templates/views/components/datatypes/node-value.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/datatypes/node-value.js





var node_value_name = 'node-value-datatype-config';
var viewModel = function viewModel(params) {
  var self = this;
  this.nodes = [{
    id: null,
    name: knockout_latest_default().observable('')
  }];
  if (params.graph) {
    this.nodes = this.nodes.concat(underscore_min_default().filter(params.graph.get('nodes')(), function (node) {
      return node.datatypelookup[node.datatype()].defaultwidget_id && node.datatype() !== 'node-value' && node.nodeid !== params.nodeid;
    }));
  }
  this.config = params.config;
  this.search = params.search;
  if (!this.search) {
    this.node = params;
    this.graph = params.graph;
    this.properties = knockout_latest_default().observableArray();
    var updateProperties = function updateProperties() {
      var properties = [{
        name: '',
        id: null
      }];
      if (self.config.nodeid() && self.graph) {
        var node = underscore_min_default().find(params.graph.get('nodes')(), function (node) {
          return node.id === self.config.nodeid();
        });
        if (node) {
          jquery_min_default().ajax({
            dataType: "json",
            url: arches["default"].urls.graph + node.graph.get('graphid') + '/get_related_nodes/' + node.id,
            data: {
              parent_nodeid: params.id
            },
            success: function success(response) {
              self.properties(properties.concat(underscore_min_default().map(response, function (prop) {
                return {
                  name: node.getFriendlyOntolgyName(prop.ontology_property),
                  id: prop.ontology_property
                };
              })));
            }
          });
        }
      } else {
        self.properties(properties);
      }
    };
    updateProperties();
    this.config.nodeid.subscribe(updateProperties);
    if (params.graph) {
      this.propertyName = knockout_latest_default().computed(function () {
        var propertyId = self.config.property();
        var selectedProperty = underscore_min_default().find(self.properties(), function (property) {
          return property.id === propertyId;
        });
        return selectedProperty ? selectedProperty.name : '';
      });
      this.relatedNodeName = knockout_latest_default().computed(function () {
        var nodeid = self.config.nodeid();
        var relatedNode = underscore_min_default().find(params.graph.get('nodes')(), function (node) {
          return node.id === nodeid;
        });
        return relatedNode ? relatedNode.name() : '';
      });
    }
  } else {
    var filter = params.filterValue();
    this.node = params.node;
    this.op = knockout_latest_default().observable(filter.op || '');
    this.searchValue = knockout_latest_default().observable(filter.val || '');
    this.filterValue = knockout_latest_default().computed(function () {
      return {
        op: self.op(),
        val: self.searchValue() || ''
      };
    }).extend({
      throttle: 750
    });
    params.filterValue(this.filterValue());
    this.filterValue.subscribe(function (val) {
      params.filterValue(val);
    });
  }
};
knockout_latest_default().components.register(node_value_name, {
  viewModel: viewModel,
  template: node_value_namespaceObject
});
/* harmony default export */ const node_value = (node_value_name);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvZGF0YXR5cGVzL25vZGUtdmFsdWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBub2RlVmFsdWVEYXRhdHlwZVRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2RhdGF0eXBlcy9ub2RlLXZhbHVlLmh0bSc7XG5cblxudmFyIG5hbWUgPSAnbm9kZS12YWx1ZS1kYXRhdHlwZS1jb25maWcnO1xuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBcbiAgICB0aGlzLm5vZGVzID0gW3tcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIG5hbWU6IGtvLm9ic2VydmFibGUoJycpXG4gICAgfV07XG4gICAgaWYgKHBhcmFtcy5ncmFwaCkge1xuICAgICAgICB0aGlzLm5vZGVzID0gdGhpcy5ub2Rlcy5jb25jYXQoXG4gICAgICAgICAgICBfLmZpbHRlcihwYXJhbXMuZ3JhcGguZ2V0KCdub2RlcycpKCksIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5kYXRhdHlwZWxvb2t1cFtub2RlLmRhdGF0eXBlKCldLmRlZmF1bHR3aWRnZXRfaWQgJiZcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5kYXRhdHlwZSgpICE9PSAnbm9kZS12YWx1ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5ub2RlaWQgIT09IHBhcmFtcy5ub2RlaWQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XG4gICAgdGhpcy5zZWFyY2ggPSBwYXJhbXMuc2VhcmNoO1xuXG4gICAgaWYgKCF0aGlzLnNlYXJjaCkge1xuICAgICAgICB0aGlzLm5vZGUgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuZ3JhcGggPSBwYXJhbXMuZ3JhcGg7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgICAgICB2YXIgdXBkYXRlUHJvcGVydGllcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBbe1xuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGlkOiBudWxsXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5ub2RlaWQoKSAmJiBzZWxmLmdyYXBoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBfLmZpbmQocGFyYW1zLmdyYXBoLmdldCgnbm9kZXMnKSgpLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLmlkID09PSBzZWxmLmNvbmZpZy5ub2RlaWQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5ncmFwaCArIG5vZGUuZ3JhcGguZ2V0KCdncmFwaGlkJykgKyAnL2dldF9yZWxhdGVkX25vZGVzLycgKyBub2RlLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudF9ub2RlaWQ6IHBhcmFtcy5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wcm9wZXJ0aWVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ubWFwKHJlc3BvbnNlLCBmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbm9kZS5nZXRGcmllbmRseU9udG9sZ3lOYW1lKHByb3Aub250b2xvZ3lfcHJvcGVydHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcHJvcC5vbnRvbG9neV9wcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZVByb3BlcnRpZXMoKTtcbiAgICAgICAgdGhpcy5jb25maWcubm9kZWlkLnN1YnNjcmliZSh1cGRhdGVQcm9wZXJ0aWVzKTtcbiAgICAgICAgaWYgKHBhcmFtcy5ncmFwaCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlJZCA9IHNlbGYuY29uZmlnLnByb3BlcnR5KCk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkUHJvcGVydHkgPSBfLmZpbmQoc2VsZi5wcm9wZXJ0aWVzKCksIGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eS5pZCA9PT0gcHJvcGVydHlJZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRQcm9wZXJ0eSA/IHNlbGVjdGVkUHJvcGVydHkubmFtZSA6ICcnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbGF0ZWROb2RlTmFtZSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlaWQgPSBzZWxmLmNvbmZpZy5ub2RlaWQoKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVsYXRlZE5vZGUgPSAgXy5maW5kKHBhcmFtcy5ncmFwaC5nZXQoJ25vZGVzJykoKSwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5pZCA9PT0gbm9kZWlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZWxhdGVkTm9kZSA/IHJlbGF0ZWROb2RlLm5hbWUoKSA6ICcnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZmlsdGVyID0gcGFyYW1zLmZpbHRlclZhbHVlKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IHBhcmFtcy5ub2RlO1xuICAgICAgICB0aGlzLm9wID0ga28ub2JzZXJ2YWJsZShmaWx0ZXIub3AgfHwgJycpO1xuICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0ga28ub2JzZXJ2YWJsZShmaWx0ZXIudmFsIHx8ICcnKTtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvcDogc2VsZi5vcCgpLFxuICAgICAgICAgICAgICAgIHZhbDogc2VsZi5zZWFyY2hWYWx1ZSgpIHx8ICcnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KS5leHRlbmQoeyB0aHJvdHRsZTogNzUwIH0pO1xuICAgICAgICBwYXJhbXMuZmlsdGVyVmFsdWUodGhpcy5maWx0ZXJWYWx1ZSgpKTtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZS5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBwYXJhbXMuZmlsdGVyVmFsdWUodmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxua28uY29tcG9uZW50cy5yZWdpc3RlcihuYW1lLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IG5vZGVWYWx1ZURhdGF0eXBlVGVtcGxhdGUsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbmFtZTtcbiJdLCJuYW1lcyI6WyIkIiwiXyIsImtvIiwiYXJjaGVzIiwibm9kZVZhbHVlRGF0YXR5cGVUZW1wbGF0ZSIsIm5hbWUiLCJ2aWV3TW9kZWwiLCJwYXJhbXMiLCJzZWxmIiwibm9kZXMiLCJpZCIsIm9ic2VydmFibGUiLCJncmFwaCIsImNvbmNhdCIsImZpbHRlciIsImdldCIsIm5vZGUiLCJkYXRhdHlwZWxvb2t1cCIsImRhdGF0eXBlIiwiZGVmYXVsdHdpZGdldF9pZCIsIm5vZGVpZCIsImNvbmZpZyIsInNlYXJjaCIsInByb3BlcnRpZXMiLCJvYnNlcnZhYmxlQXJyYXkiLCJ1cGRhdGVQcm9wZXJ0aWVzIiwiZmluZCIsImFqYXgiLCJkYXRhVHlwZSIsInVybCIsInVybHMiLCJkYXRhIiwicGFyZW50X25vZGVpZCIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsIm1hcCIsInByb3AiLCJnZXRGcmllbmRseU9udG9sZ3lOYW1lIiwib250b2xvZ3lfcHJvcGVydHkiLCJzdWJzY3JpYmUiLCJwcm9wZXJ0eU5hbWUiLCJjb21wdXRlZCIsInByb3BlcnR5SWQiLCJwcm9wZXJ0eSIsInNlbGVjdGVkUHJvcGVydHkiLCJyZWxhdGVkTm9kZU5hbWUiLCJyZWxhdGVkTm9kZSIsImZpbHRlclZhbHVlIiwib3AiLCJzZWFyY2hWYWx1ZSIsInZhbCIsImV4dGVuZCIsInRocm90dGxlIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9