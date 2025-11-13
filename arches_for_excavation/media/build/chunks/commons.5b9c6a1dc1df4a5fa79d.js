"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[26663],{

/***/ 26663:
/*!**************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/models/node.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var models_abstract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! models/abstract */ 47797);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (models_abstract__WEBPACK_IMPORTED_MODULE_3__["default"].extend({
  /**
   * A backbone model representing a single node in a graph
   * @augments AbstractModel
   * @constructor
   * @name NodeModel
   */
  url: arches__WEBPACK_IMPORTED_MODULE_2__["default"].urls.node,
  /**
   * Initializes the model with optional parameters
   * @memberof NodeModel.prototype
   * @param {object} options
   * @param {object} options.graph - a reference to the parent {@link GraphModel}
   * @param {array} options.datatypelookup - an array of datatype objects
   * @param {object} options.source - an object containing node data
   */
  initialize: function initialize(options) {
    var self = this;
    self.graph = options.graph;
    self.datatypelookup = options.datatypelookup;
    self.layer = options.layer;
    self.icons = options.icons || [];
    self.mapSource = options.mapSource;
    self.loading = options.loading;
    self.permissions = options.permissions;
    self.ontology_namespaces = options.ontology_namespaces || {};
    if (options.url) {
      self.url = options.url;
    }
    if (options.source.config && underscore__WEBPACK_IMPORTED_MODULE_0___default().keys(options.source.config).length === 0) {
      options.source.config = null;
    }
    self._node = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable('');
    self.selected = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
    self.filtered = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
    self.name = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable('');
    self.description = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(null);
    self.slug = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(null);
    self.alias = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(null);
    self.hasCustomAlias = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
    self.sourceIdentifierId = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(null);
    self.nodeGroupId = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable('');
    var datatype = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable('');
    self.datatype = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed({
      read: function read() {
        return datatype();
      },
      write: function write(value) {
        if (datatype() !== value) {
          var datatypeRecord = self.datatypelookup[value];
          if (datatypeRecord) {
            var defaultConfig = datatypeRecord.defaultconfig;
            self.setupConfig(defaultConfig);
          }
          datatype(value);
        }
      },
      owner: this
    });
    self.datatypeDataBearing = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      var result = false;
      if (self.datatype()) {
        if (self.datatypelookup[self.datatype()]) {
          result = !!self.datatypelookup[self.datatype()].defaultwidget_id;
        }
      }
      return result;
    });
    self.datatypeIsSearchable = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      var searchable = false;
      var datatype = self.datatypelookup[self.datatype()];
      if (datatype && datatype.configname) {
        searchable = datatype.issearchable;
      }
      return searchable;
    });
    self.datatypeConfigComponent = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      var component = null;
      var datatype = self.datatypelookup[self.datatype()];
      if (datatype && datatype.configname) {
        component = datatype.configname;
      }
      return component;
    });
    self.ontologyclass = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable('');
    self.parentproperty = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable('');
    self.ontology_cache = knockout__WEBPACK_IMPORTED_MODULE_1___default().observableArray().extend({
      deferred: true
    });
    self.configKeys = knockout__WEBPACK_IMPORTED_MODULE_1___default().observableArray();
    self.config = {};
    self.issearchable = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(true);
    self.isrequired = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(true);
    self.fieldname = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable();
    self.exportable = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(false);
    self.parse(options.source);
    self.validclasses = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      if (!self.parentproperty()) {
        return underscore__WEBPACK_IMPORTED_MODULE_0___default().chain(self.ontology_cache()).sortBy(function (item) {
          return item.class;
        }).uniq(function (item) {
          return item.class;
        }).pluck('class').value();
      } else {
        return underscore__WEBPACK_IMPORTED_MODULE_0___default().chain(self.ontology_cache()).sortBy(function (item) {
          return item.class;
        }).filter(function (item) {
          return item.property === self.parentproperty();
        }).pluck('class').value();
      }
    }, this);
    if (!self.istopnode) {
      self.validproperties = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
        if (!self.ontologyclass()) {
          return underscore__WEBPACK_IMPORTED_MODULE_0___default().chain(self.ontology_cache()).sortBy(function (item) {
            return item.property;
          }).uniq(function (item) {
            return item.property;
          }).pluck('property').value();
        } else {
          return underscore__WEBPACK_IMPORTED_MODULE_0___default().chain(self.ontology_cache()).sortBy(function (item) {
            return item.property;
          }).filter(function (item) {
            return item.class === self.ontologyclass();
          }).pluck('property').value();
        }
      }, this);
    }
    self.iconclass = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      var datatypeRecord = self.datatypelookup[self.datatype()];
      if (!datatypeRecord) {
        return '';
      }
      return datatypeRecord.iconclass;
    });
    self.json = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      var keys = self.configKeys();
      var config = null;
      if (keys.length > 0) {
        config = {};
        underscore__WEBPACK_IMPORTED_MODULE_0___default().each(keys, function (key) {
          config[key] = self.config[key]();
        });
      }
      var jsObj = knockout__WEBPACK_IMPORTED_MODULE_1___default().toJS({
        name: self.name,
        datatype: self.datatype,
        nodegroup_id: self.nodeGroupId,
        description: self.description,
        slug: self.slug,
        ontologyclass: self.ontologyclass,
        parentproperty: self.parentproperty,
        config: config,
        issearchable: self.issearchable,
        isrequired: self.isrequired,
        is_immutable: self.is_immutable,
        fieldname: self.fieldname,
        exportable: self.exportable,
        alias: self.alias,
        hascustomalias: self.hasCustomAlias,
        sourcebranchpublication_id: self.sourceBranchPublicationId
      });
      return JSON.stringify(underscore__WEBPACK_IMPORTED_MODULE_0___default().extend(JSON.parse(self._node()), jsObj));
    });
    self.dirty = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      return self.json() !== self._node();
    }).extend({
      rateLimit: 100
    });
    self.isCollector = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      return self.nodeid === self.nodeGroupId();
    });
    self.selected.subscribe(function (selected) {
      if (selected) {
        self.getValidNodesEdges();
      }
    });
    self.ontologyclass_friendlyname = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      return self.getFriendlyOntolgyName(self.ontologyclass());
    });
    self.parentproperty_friendlyname = knockout__WEBPACK_IMPORTED_MODULE_1___default().computed(function () {
      return self.getFriendlyOntolgyName(self.parentproperty());
    });
  },
  /**
   * Gets the name for an ontology uri that is more user friendly
   * by using a namespace if possible
   * "http://www.cidoc-crm.org/cidoc-crm/E1_Entity" could become "E1_Entity"
   * @memberof NodeModel.prototype
   * @param {string} ontologyname - the ontology URI to get the friendly name for
   */
  getFriendlyOntolgyName: function getFriendlyOntolgyName(ontologyname) {
    if (!!ontologyname) {
      var uri = underscore__WEBPACK_IMPORTED_MODULE_0___default().chain(this.ontology_namespaces).keys().find(function (namespace) {
        return ontologyname.indexOf(namespace) !== -1;
      }).value();
      if (!!uri) {
        var namespace = this.ontology_namespaces[uri];
        if (!!namespace) {
          return ontologyname.replace(uri, namespace + ":");
        } else {
          return ontologyname.replace(uri, '');
        }
      } else {
        return ontologyname;
      }
    } else {
      return '';
    }
  },
  /**
   * Parses a js object and updates the model
   * @memberof NodeModel.prototype
   * @param {object} source - an object containing node data
   */
  parse: function parse(source) {
    var self = this;
    self._node(JSON.stringify(source));
    self.name(knockout__WEBPACK_IMPORTED_MODULE_1___default().unwrap(source.name));
    self.nodeGroupId(source.nodegroup_id);
    self.datatype(source.datatype);
    self.description(source.description);
    self.slug(source.slug);
    self.ontologyclass(source.ontologyclass);
    self.parentproperty(source.parentproperty);
    self.issearchable(source.issearchable);
    self.isrequired(source.isrequired);
    self.fieldname(source.fieldname);
    self.exportable(source.exportable);
    self.alias(source.alias);
    self.hasCustomAlias(source.hascustomalias);
    self.sourceIdentifierId(source.source_identifier_id);
    if (source.config) {
      self.setupConfig(source.config);
    }
    self.nodeid = source.nodeid;
    self.istopnode = source.istopnode;
    self.is_immutable = source.is_immutable;
    self.sourceBranchPublicationId = source.sourcebranchpublication_id;
    self.set('id', self.nodeid);
    self.set('graph_id', source.graph_id);
  },
  setupConfig: function setupConfig(config) {
    var self = this;
    var keys = [];
    var datatypeRecord = this.datatypelookup[this.datatype()];
    if (datatypeRecord && datatypeRecord.defaultconfig && config) {
      var defaultConfig = datatypeRecord.defaultconfig;
      underscore__WEBPACK_IMPORTED_MODULE_0___default().each(defaultConfig, function (value, key) {
        if (!Object.prototype.hasOwnProperty.call(config, key)) {
          config[key] = value;
        }
      });
    }
    underscore__WEBPACK_IMPORTED_MODULE_0___default().each(config, function (configVal, configKey) {
      if (!knockout__WEBPACK_IMPORTED_MODULE_1___default().isObservable(self.config[configKey])) {
        self.config[configKey] = Array.isArray(configVal) ? knockout__WEBPACK_IMPORTED_MODULE_1___default().observableArray(configVal) : knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(configVal);
      } else {
        self.config[configKey](configVal);
      }
      keys.push(configKey);
    });
    self.configKeys(keys);
  },
  /**
   * discards unsaved model changes and resets the model data
   * @memberof NodeModel.prototype
   */
  reset: function reset() {
    this.parse(JSON.parse(this._node()), self);
  },
  save: function save(userCallback, scope) {
    var method = "POST";
    var callback = function callback(request, status, model) {
      if (typeof userCallback === 'function') {
        userCallback.call(this, request, status, model);
      }
      if (status === 'success') {
        var _request$responseJSON;
        this.alias((_request$responseJSON = request.responseJSON.updated_values) === null || _request$responseJSON === void 0 ? void 0 : _request$responseJSON.node.alias);
        this._node(this.json());
      }
    };

    // adds event to trigger dirty state in graph-designer
    // need to execute before save to avoid issues with graph caching
    document.dispatchEvent(new Event('nodeSave'));
    return this._doRequest({
      type: method,
      url: this._getURL(method),
      data: JSON.stringify(this.toJSON())
    }, callback, scope, 'save');
  },
  /**
   * returns a JSON object containing model data
   * @memberof NodeModel.prototype
   * @return {object} a JSON object containing model data
   */
  toJSON: function toJSON() {
    return JSON.parse(this.json());
  },
  /**
   * toggles the isCollector state of the node model by managing group ids
   * @memberof NodeModel.prototype
   */
  toggleIsCollector: function toggleIsCollector() {
    var nodeGroupId = this.nodeid;
    var self = this;
    if (this.isCollector()) {
      nodeGroupId = this.graph.getParentNode(this).nodeGroupId();
    }
    var children = this.graph.getChildNodesAndEdges(this).nodes;
    children.forEach(function (child) {
      if (child.nodeGroupId() === self.nodeGroupId()) {
        child.nodeGroupId(nodeGroupId);
        child._node(child.json());
      }
    });
    this.nodeGroupId(nodeGroupId);
  },
  /**
   * updates the cache of available ontology classes based on graph state
   * @memberof NodeModel.prototype
   */
  getValidNodesEdges: function getValidNodesEdges() {
    this.graph.getValidNodesEdges(this.nodeid, function (responseJSON) {
      this.ontology_cache.removeAll();
      if (responseJSON !== undefined) {
        responseJSON.forEach(function (item) {
          item.ontology_classes.forEach(function (ontologyclass) {
            this.ontology_cache.push({
              'property': item.ontology_property,
              'class': ontologyclass
            });
          }, this);
        }, this);
      }
    }, this);
  },
  _getURL: function _getURL(method) {
    var id = this.get('graph_id');
    if (!id) {
      id = '';
    }
    if (this.url.indexOf('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa') > -1) {
      return this.url.replace('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', id);
    } else {
      return this.url + id;
    }
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNWI5YzZhMWRjMWRmNGE1ZmE3OWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEyQjtBQUNEO0FBQ0U7QUFDZ0I7QUFFNUMsaUVBQWVHLHVEQUFhLENBQUNDLE1BQU0sQ0FBQztFQUNoQztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSUMsR0FBRyxFQUFFSCw4Q0FBTSxDQUFDSSxJQUFJLENBQUNDLElBQUk7RUFFckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJQyxVQUFVLEVBQUUsU0FBWkEsVUFBVUEsQ0FBV0MsT0FBTyxFQUFFO0lBQzFCLElBQUlDLElBQUksR0FBRyxJQUFJO0lBQ2ZBLElBQUksQ0FBQ0MsS0FBSyxHQUFHRixPQUFPLENBQUNFLEtBQUs7SUFDMUJELElBQUksQ0FBQ0UsY0FBYyxHQUFHSCxPQUFPLENBQUNHLGNBQWM7SUFDNUNGLElBQUksQ0FBQ0csS0FBSyxHQUFHSixPQUFPLENBQUNJLEtBQUs7SUFDMUJILElBQUksQ0FBQ0ksS0FBSyxHQUFHTCxPQUFPLENBQUNLLEtBQUssSUFBSSxFQUFFO0lBQ2hDSixJQUFJLENBQUNLLFNBQVMsR0FBR04sT0FBTyxDQUFDTSxTQUFTO0lBQ2xDTCxJQUFJLENBQUNNLE9BQU8sR0FBR1AsT0FBTyxDQUFDTyxPQUFPO0lBQzlCTixJQUFJLENBQUNPLFdBQVcsR0FBR1IsT0FBTyxDQUFDUSxXQUFXO0lBQ3RDUCxJQUFJLENBQUNRLG1CQUFtQixHQUFHVCxPQUFPLENBQUNTLG1CQUFtQixJQUFJLENBQUMsQ0FBQztJQUM1RCxJQUFJVCxPQUFPLENBQUNKLEdBQUcsRUFBRTtNQUNiSyxJQUFJLENBQUNMLEdBQUcsR0FBR0ksT0FBTyxDQUFDSixHQUFHO0lBQzFCO0lBRUEsSUFBSUksT0FBTyxDQUFDVSxNQUFNLENBQUNDLE1BQU0sSUFBSXBCLHNEQUFNLENBQUNTLE9BQU8sQ0FBQ1UsTUFBTSxDQUFDQyxNQUFNLENBQUMsQ0FB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ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL21vZGVscy9ub2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBBYnN0cmFjdE1vZGVsIGZyb20gJ21vZGVscy9hYnN0cmFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0TW9kZWwuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAgKiBBIGJhY2tib25lIG1vZGVsIHJlcHJlc2VudGluZyBhIHNpbmdsZSBub2RlIGluIGEgZ3JhcGhcbiAgICAgKiBAYXVnbWVudHMgQWJzdHJhY3RNb2RlbFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBuYW1lIE5vZGVNb2RlbFxuICAgICAqL1xuICAgIHVybDogYXJjaGVzLnVybHMubm9kZSxcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBtb2RlbCB3aXRoIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgKiBAbWVtYmVyb2YgTm9kZU1vZGVsLnByb3RvdHlwZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuZ3JhcGggLSBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHtAbGluayBHcmFwaE1vZGVsfVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IG9wdGlvbnMuZGF0YXR5cGVsb29rdXAgLSBhbiBhcnJheSBvZiBkYXRhdHlwZSBvYmplY3RzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuc291cmNlIC0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgbm9kZSBkYXRhXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuZ3JhcGggPSBvcHRpb25zLmdyYXBoO1xuICAgICAgICBzZWxmLmRhdGF0eXBlbG9va3VwID0gb3B0aW9ucy5kYXRhdHlwZWxvb2t1cDtcbiAgICAgICAgc2VsZi5sYXllciA9IG9wdGlvbnMubGF5ZXI7XG4gICAgICAgIHNlbGYuaWNvbnMgPSBvcHRpb25zLmljb25zIHx8IFtdO1xuICAgICAgICBzZWxmLm1hcFNvdXJjZSA9IG9wdGlvbnMubWFwU291cmNlO1xuICAgICAgICBzZWxmLmxvYWRpbmcgPSBvcHRpb25zLmxvYWRpbmc7XG4gICAgICAgIHNlbGYucGVybWlzc2lvbnMgPSBvcHRpb25zLnBlcm1pc3Npb25zO1xuICAgICAgICBzZWxmLm9udG9sb2d5X25hbWVzcGFjZXMgPSBvcHRpb25zLm9udG9sb2d5X25hbWVzcGFjZXMgfHwge307XG4gICAgICAgIGlmIChvcHRpb25zLnVybCkge1xuICAgICAgICAgICAgc2VsZi51cmwgPSBvcHRpb25zLnVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnNvdXJjZS5jb25maWcgJiYgXy5rZXlzKG9wdGlvbnMuc291cmNlLmNvbmZpZykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBvcHRpb25zLnNvdXJjZS5jb25maWcgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5fbm9kZSA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgICAgICBzZWxmLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgIHNlbGYuZmlsdGVyZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgc2VsZi5uYW1lID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgICAgIHNlbGYuZGVzY3JpcHRpb24gPSBrby5vYnNlcnZhYmxlKG51bGwpO1xuICAgICAgICBzZWxmLnNsdWcgPSBrby5vYnNlcnZhYmxlKG51bGwpO1xuICAgICAgICBzZWxmLmFsaWFzID0ga28ub2JzZXJ2YWJsZShudWxsKTtcbiAgICAgICAgc2VsZi5oYXNDdXN0b21BbGlhcyA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICBzZWxmLnNvdXJjZUlkZW50aWZpZXJJZCA9IGtvLm9ic2VydmFibGUobnVsbCk7XG4gICAgICAgIHNlbGYubm9kZUdyb3VwSWQgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICAgICAgdmFyIGRhdGF0eXBlID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgICAgIHNlbGYuZGF0YXR5cGUgPSBrby5jb21wdXRlZCh7XG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YXR5cGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YXR5cGUoKSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGF0eXBlUmVjb3JkID0gc2VsZi5kYXRhdHlwZWxvb2t1cFt2YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhdHlwZVJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRDb25maWcgPSBkYXRhdHlwZVJlY29yZC5kZWZhdWx0Y29uZmlnO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXR1cENvbmZpZyhkZWZhdWx0Q29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhdHlwZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG93bmVyOiB0aGlzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuZGF0YXR5cGVEYXRhQmVhcmluZyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YXR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGF0eXBlbG9va3VwW3NlbGYuZGF0YXR5cGUoKV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gISFzZWxmLmRhdGF0eXBlbG9va3VwW3NlbGYuZGF0YXR5cGUoKV0uZGVmYXVsdHdpZGdldF9pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLmRhdGF0eXBlSXNTZWFyY2hhYmxlID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2VhcmNoYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGRhdGF0eXBlID0gc2VsZi5kYXRhdHlwZWxvb2t1cFtzZWxmLmRhdGF0eXBlKCldO1xuICAgICAgICAgICAgaWYgKGRhdGF0eXBlICYmIGRhdGF0eXBlLmNvbmZpZ25hbWUpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hhYmxlID0gZGF0YXR5cGUuaXNzZWFyY2hhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaGFibGU7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmRhdGF0eXBlQ29uZmlnQ29tcG9uZW50ID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBkYXRhdHlwZSA9IHNlbGYuZGF0YXR5cGVsb29rdXBbc2VsZi5kYXRhdHlwZSgpXTtcbiAgICAgICAgICAgIGlmIChkYXRhdHlwZSAmJiBkYXRhdHlwZS5jb25maWduYW1lKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gZGF0YXR5cGUuY29uZmlnbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLm9udG9sb2d5Y2xhc3MgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICAgICAgc2VsZi5wYXJlbnRwcm9wZXJ0eSA9IGtvLm9ic2VydmFibGUoJycpO1xuICAgICAgICBzZWxmLm9udG9sb2d5X2NhY2hlID0ga28ub2JzZXJ2YWJsZUFycmF5KCkuZXh0ZW5kKHtcbiAgICAgICAgICAgIGRlZmVycmVkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmNvbmZpZ0tleXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICAgICAgc2VsZi5jb25maWcgPSB7fTtcbiAgICAgICAgc2VsZi5pc3NlYXJjaGFibGUgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xuICAgICAgICBzZWxmLmlzcmVxdWlyZWQgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xuICAgICAgICBzZWxmLmZpZWxkbmFtZSA9IGtvLm9ic2VydmFibGUoKTtcbiAgICAgICAgc2VsZi5leHBvcnRhYmxlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG5cbiAgICAgICAgc2VsZi5wYXJzZShvcHRpb25zLnNvdXJjZSk7XG5cbiAgICAgICAgc2VsZi52YWxpZGNsYXNzZXMgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5wYXJlbnRwcm9wZXJ0eSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uY2hhaW4oc2VsZi5vbnRvbG9neV9jYWNoZSgpKVxuICAgICAgICAgICAgICAgICAgICAuc29ydEJ5KGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmNsYXNzO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudW5pcShmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jbGFzcztcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnBsdWNrKCdjbGFzcycpXG4gICAgICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5jaGFpbihzZWxmLm9udG9sb2d5X2NhY2hlKCkpXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0QnkoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2xhc3M7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucHJvcGVydHkgPT09IHNlbGYucGFyZW50cHJvcGVydHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnBsdWNrKCdjbGFzcycpXG4gICAgICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBpZiAoIXNlbGYuaXN0b3Bub2RlKSB7XG4gICAgICAgICAgICBzZWxmLnZhbGlkcHJvcGVydGllcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICghc2VsZi5vbnRvbG9neWNsYXNzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uY2hhaW4oc2VsZi5vbnRvbG9neV9jYWNoZSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnRCeShmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVuaXEoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnByb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wbHVjaygncHJvcGVydHknKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnZhbHVlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uY2hhaW4oc2VsZi5vbnRvbG9neV9jYWNoZSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnRCeShmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2xhc3MgPT09IHNlbGYub250b2xvZ3ljbGFzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wbHVjaygncHJvcGVydHknKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnZhbHVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLmljb25jbGFzcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGF0eXBlUmVjb3JkID0gc2VsZi5kYXRhdHlwZWxvb2t1cFtzZWxmLmRhdGF0eXBlKCldO1xuICAgICAgICAgICAgaWYgKCFkYXRhdHlwZVJlY29yZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhdHlwZVJlY29yZC5pY29uY2xhc3M7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuanNvbiA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBzZWxmLmNvbmZpZ0tleXMoKTtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHt9O1xuICAgICAgICAgICAgICAgIF8uZWFjaChrZXlzLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnW2tleV0gPSBzZWxmLmNvbmZpZ1trZXldKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIganNPYmogPSBrby50b0pTKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBzZWxmLm5hbWUsXG4gICAgICAgICAgICAgICAgZGF0YXR5cGU6IHNlbGYuZGF0YXR5cGUsXG4gICAgICAgICAgICAgICAgbm9kZWdyb3VwX2lkOiBzZWxmLm5vZGVHcm91cElkLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzZWxmLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHNsdWc6IHNlbGYuc2x1ZyxcbiAgICAgICAgICAgICAgICBvbnRvbG9neWNsYXNzOiBzZWxmLm9udG9sb2d5Y2xhc3MsXG4gICAgICAgICAgICAgICAgcGFyZW50cHJvcGVydHk6IHNlbGYucGFyZW50cHJvcGVydHksXG4gICAgICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICAgICAgaXNzZWFyY2hhYmxlOiBzZWxmLmlzc2VhcmNoYWJsZSxcbiAgICAgICAgICAgICAgICBpc3JlcXVpcmVkOiBzZWxmLmlzcmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgaXNfaW1tdXRhYmxlOiBzZWxmLmlzX2ltbXV0YWJsZSxcbiAgICAgICAgICAgICAgICBmaWVsZG5hbWU6IHNlbGYuZmllbGRuYW1lLFxuICAgICAgICAgICAgICAgIGV4cG9ydGFibGU6IHNlbGYuZXhwb3J0YWJsZSxcbiAgICAgICAgICAgICAgICBhbGlhczogc2VsZi5hbGlhcyxcbiAgICAgICAgICAgICAgICBoYXNjdXN0b21hbGlhczogc2VsZi5oYXNDdXN0b21BbGlhcyxcbiAgICAgICAgICAgICAgICBzb3VyY2VicmFuY2hwdWJsaWNhdGlvbl9pZDogc2VsZi5zb3VyY2VCcmFuY2hQdWJsaWNhdGlvbklkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShfLmV4dGVuZChKU09OLnBhcnNlKHNlbGYuX25vZGUoKSksIGpzT2JqKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuZGlydHkgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmpzb24oKSAhPT0gc2VsZi5fbm9kZSgpO1xuICAgICAgICB9KS5leHRlbmQoeyByYXRlTGltaXQ6IDEwMCB9KTtcblxuICAgICAgICBzZWxmLmlzQ29sbGVjdG9yID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5ub2RlaWQgPT09IHNlbGYubm9kZUdyb3VwSWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5zZWxlY3RlZC5zdWJzY3JpYmUoZnVuY3Rpb24oc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ2V0VmFsaWROb2Rlc0VkZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYub250b2xvZ3ljbGFzc19mcmllbmRseW5hbWUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmdldEZyaWVuZGx5T250b2xneU5hbWUoc2VsZi5vbnRvbG9neWNsYXNzKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5wYXJlbnRwcm9wZXJ0eV9mcmllbmRseW5hbWUgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmdldEZyaWVuZGx5T250b2xneU5hbWUoc2VsZi5wYXJlbnRwcm9wZXJ0eSgpKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5hbWUgZm9yIGFuIG9udG9sb2d5IHVyaSB0aGF0IGlzIG1vcmUgdXNlciBmcmllbmRseVxuICAgICAqIGJ5IHVzaW5nIGEgbmFtZXNwYWNlIGlmIHBvc3NpYmxlXG4gICAgICogXCJodHRwOi8vd3d3LmNpZG9jLWNybS5vcmcvY2lkb2MtY3JtL0UxX0VudGl0eVwiIGNvdWxkIGJlY29tZSBcIkUxX0VudGl0eVwiXG4gICAgICogQG1lbWJlcm9mIE5vZGVNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb250b2xvZ3luYW1lIC0gdGhlIG9udG9sb2d5IFVSSSB0byBnZXQgdGhlIGZyaWVuZGx5IG5hbWUgZm9yXG4gICAgICovXG4gICAgZ2V0RnJpZW5kbHlPbnRvbGd5TmFtZTogZnVuY3Rpb24ob250b2xvZ3luYW1lKXtcbiAgICAgICAgaWYoISFvbnRvbG9neW5hbWUpe1xuICAgICAgICAgICAgdmFyIHVyaSA9IF8uY2hhaW4odGhpcy5vbnRvbG9neV9uYW1lc3BhY2VzKVxuICAgICAgICAgICAgICAgIC5rZXlzKClcbiAgICAgICAgICAgICAgICAuZmluZChmdW5jdGlvbihuYW1lc3BhY2Upe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb250b2xvZ3luYW1lLmluZGV4T2YobmFtZXNwYWNlKSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudmFsdWUoKTtcblxuICAgICAgICAgICAgaWYoISF1cmkpe1xuICAgICAgICAgICAgICAgIHZhciBuYW1lc3BhY2UgPSB0aGlzLm9udG9sb2d5X25hbWVzcGFjZXNbdXJpXTtcbiAgICAgICAgICAgICAgICBpZighIW5hbWVzcGFjZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvbnRvbG9neW5hbWUucmVwbGFjZSh1cmksIG5hbWVzcGFjZSArIFwiOlwiKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9udG9sb2d5bmFtZS5yZXBsYWNlKHVyaSwgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBvbnRvbG9neW5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGpzIG9iamVjdCBhbmQgdXBkYXRlcyB0aGUgbW9kZWxcbiAgICAgKiBAbWVtYmVyb2YgTm9kZU1vZGVsLnByb3RvdHlwZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzb3VyY2UgLSBhbiBvYmplY3QgY29udGFpbmluZyBub2RlIGRhdGFcbiAgICAgKi9cbiAgICBwYXJzZTogZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5fbm9kZShKU09OLnN0cmluZ2lmeShzb3VyY2UpKTtcbiAgICAgICAgc2VsZi5uYW1lKGtvLnVud3JhcChzb3VyY2UubmFtZSkpO1xuICAgICAgICBzZWxmLm5vZGVHcm91cElkKHNvdXJjZS5ub2RlZ3JvdXBfaWQpO1xuICAgICAgICBzZWxmLmRhdGF0eXBlKHNvdXJjZS5kYXRhdHlwZSk7XG4gICAgICAgIHNlbGYuZGVzY3JpcHRpb24oc291cmNlLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgc2VsZi5zbHVnKHNvdXJjZS5zbHVnKTtcbiAgICAgICAgc2VsZi5vbnRvbG9neWNsYXNzKHNvdXJjZS5vbnRvbG9neWNsYXNzKTtcbiAgICAgICAgc2VsZi5wYXJlbnRwcm9wZXJ0eShzb3VyY2UucGFyZW50cHJvcGVydHkpO1xuICAgICAgICBzZWxmLmlzc2VhcmNoYWJsZShzb3VyY2UuaXNzZWFyY2hhYmxlKTtcbiAgICAgICAgc2VsZi5pc3JlcXVpcmVkKHNvdXJjZS5pc3JlcXVpcmVkKTtcbiAgICAgICAgc2VsZi5maWVsZG5hbWUoc291cmNlLmZpZWxkbmFtZSk7XG4gICAgICAgIHNlbGYuZXhwb3J0YWJsZShzb3VyY2UuZXhwb3J0YWJsZSk7XG4gICAgICAgIHNlbGYuYWxpYXMoc291cmNlLmFsaWFzKTtcbiAgICAgICAgc2VsZi5oYXNDdXN0b21BbGlhcyhzb3VyY2UuaGFzY3VzdG9tYWxpYXMpO1xuICAgICAgICBzZWxmLnNvdXJjZUlkZW50aWZpZXJJZChzb3VyY2Uuc291cmNlX2lkZW50aWZpZXJfaWQpO1xuXG4gICAgICAgIGlmIChzb3VyY2UuY29uZmlnKSB7XG4gICAgICAgICAgICBzZWxmLnNldHVwQ29uZmlnKHNvdXJjZS5jb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5ub2RlaWQgPSBzb3VyY2Uubm9kZWlkO1xuICAgICAgICBzZWxmLmlzdG9wbm9kZSA9IHNvdXJjZS5pc3RvcG5vZGU7XG4gICAgICAgIHNlbGYuaXNfaW1tdXRhYmxlID0gc291cmNlLmlzX2ltbXV0YWJsZTtcbiAgICAgICAgc2VsZi5zb3VyY2VCcmFuY2hQdWJsaWNhdGlvbklkID0gc291cmNlLnNvdXJjZWJyYW5jaHB1YmxpY2F0aW9uX2lkO1xuXG4gICAgICAgIHNlbGYuc2V0KCdpZCcsIHNlbGYubm9kZWlkKTtcbiAgICAgICAgc2VsZi5zZXQoJ2dyYXBoX2lkJywgc291cmNlLmdyYXBoX2lkKTtcbiAgICB9LFxuXG4gICAgc2V0dXBDb25maWc6IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgIHZhciBkYXRhdHlwZVJlY29yZCA9IHRoaXMuZGF0YXR5cGVsb29rdXBbdGhpcy5kYXRhdHlwZSgpXTtcbiAgICAgICAgaWYgKGRhdGF0eXBlUmVjb3JkICYmIGRhdGF0eXBlUmVjb3JkLmRlZmF1bHRjb25maWcgJiYgY29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdENvbmZpZyA9IGRhdGF0eXBlUmVjb3JkLmRlZmF1bHRjb25maWc7XG4gICAgICAgICAgICBfLmVhY2goZGVmYXVsdENvbmZpZywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25maWdba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIF8uZWFjaChjb25maWcsIGZ1bmN0aW9uKGNvbmZpZ1ZhbCwgY29uZmlnS2V5KSB7XG4gICAgICAgICAgICBpZiAoIWtvLmlzT2JzZXJ2YWJsZShzZWxmLmNvbmZpZ1tjb25maWdLZXldKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnW2NvbmZpZ0tleV0gPSBBcnJheS5pc0FycmF5KGNvbmZpZ1ZhbCkgP1xuICAgICAgICAgICAgICAgICAgICBrby5vYnNlcnZhYmxlQXJyYXkoY29uZmlnVmFsKSA6XG4gICAgICAgICAgICAgICAgICAgIGtvLm9ic2VydmFibGUoY29uZmlnVmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWdbY29uZmlnS2V5XShjb25maWdWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5cy5wdXNoKGNvbmZpZ0tleSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmNvbmZpZ0tleXMoa2V5cyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRpc2NhcmRzIHVuc2F2ZWQgbW9kZWwgY2hhbmdlcyBhbmQgcmVzZXRzIHRoZSBtb2RlbCBkYXRhXG4gICAgICogQG1lbWJlcm9mIE5vZGVNb2RlbC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucGFyc2UoSlNPTi5wYXJzZSh0aGlzLl9ub2RlKCkpLCBzZWxmKTtcbiAgICB9LFxuXG4gICAgc2F2ZTogZnVuY3Rpb24odXNlckNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICB2YXIgbWV0aG9kID0gXCJQT1NUXCI7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKHJlcXVlc3QsIHN0YXR1cywgbW9kZWwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdXNlckNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdXNlckNhbGxiYWNrLmNhbGwodGhpcywgcmVxdWVzdCwgc3RhdHVzLCBtb2RlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdHVzPT09J3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlhcyhyZXF1ZXN0LnJlc3BvbnNlSlNPTi51cGRhdGVkX3ZhbHVlcz8ubm9kZS5hbGlhcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbm9kZSh0aGlzLmpzb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYWRkcyBldmVudCB0byB0cmlnZ2VyIGRpcnR5IHN0YXRlIGluIGdyYXBoLWRlc2lnbmVyXG4gICAgICAgIC8vIG5lZWQgdG8gZXhlY3V0ZSBiZWZvcmUgc2F2ZSB0byBhdm9pZCBpc3N1ZXMgd2l0aCBncmFwaCBjYWNoaW5nXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnQoJ25vZGVTYXZlJylcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiBtZXRob2QsXG4gICAgICAgICAgICB1cmw6IHRoaXMuX2dldFVSTChtZXRob2QpLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSlcbiAgICAgICAgfSwgY2FsbGJhY2ssIHNjb3BlLCAnc2F2ZScpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgSlNPTiBvYmplY3QgY29udGFpbmluZyBtb2RlbCBkYXRhXG4gICAgICogQG1lbWJlcm9mIE5vZGVNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IGEgSlNPTiBvYmplY3QgY29udGFpbmluZyBtb2RlbCBkYXRhXG4gICAgICovXG4gICAgdG9KU09OOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5qc29uKCkpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIHRvZ2dsZXMgdGhlIGlzQ29sbGVjdG9yIHN0YXRlIG9mIHRoZSBub2RlIG1vZGVsIGJ5IG1hbmFnaW5nIGdyb3VwIGlkc1xuICAgICAqIEBtZW1iZXJvZiBOb2RlTW9kZWwucHJvdG90eXBlXG4gICAgICovXG4gICAgdG9nZ2xlSXNDb2xsZWN0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbm9kZUdyb3VwSWQgPSB0aGlzLm5vZGVpZDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5pc0NvbGxlY3RvcigpKSB7XG4gICAgICAgICAgICBub2RlR3JvdXBJZCA9IHRoaXMuZ3JhcGguZ2V0UGFyZW50Tm9kZSh0aGlzKS5ub2RlR3JvdXBJZCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZHJlbiAgPSB0aGlzLmdyYXBoLmdldENoaWxkTm9kZXNBbmRFZGdlcyh0aGlzKS5ub2RlcztcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgICAgaWYgKGNoaWxkLm5vZGVHcm91cElkKCkgPT09IHNlbGYubm9kZUdyb3VwSWQoKSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLm5vZGVHcm91cElkKG5vZGVHcm91cElkKTtcbiAgICAgICAgICAgICAgICBjaGlsZC5fbm9kZShjaGlsZC5qc29uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlR3JvdXBJZChub2RlR3JvdXBJZCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZXMgdGhlIGNhY2hlIG9mIGF2YWlsYWJsZSBvbnRvbG9neSBjbGFzc2VzIGJhc2VkIG9uIGdyYXBoIHN0YXRlXG4gICAgICogQG1lbWJlcm9mIE5vZGVNb2RlbC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBnZXRWYWxpZE5vZGVzRWRnZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdyYXBoLmdldFZhbGlkTm9kZXNFZGdlcyh0aGlzLm5vZGVpZCwgZnVuY3Rpb24ocmVzcG9uc2VKU09OKSB7XG4gICAgICAgICAgICB0aGlzLm9udG9sb2d5X2NhY2hlLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlSlNPTiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VKU09OLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm9udG9sb2d5X2NsYXNzZXMuZm9yRWFjaChmdW5jdGlvbihvbnRvbG9neWNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9udG9sb2d5X2NhY2hlLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9wZXJ0eSc6IGl0ZW0ub250b2xvZ3lfcHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogb250b2xvZ3ljbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX2dldFVSTDogZnVuY3Rpb24obWV0aG9kKXtcbiAgICAgICAgdmFyIGlkID0gdGhpcy5nZXQoJ2dyYXBoX2lkJyk7XG4gICAgICAgIGlmKCEoaWQpKXtcbiAgICAgICAgICAgIGlkID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy51cmwuaW5kZXhPZignYWFhYWFhYWEtYWFhYS1hYWFhLWFhYWEtYWFhYWFhYWFhYWFhJykgPiAtMSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmwucmVwbGFjZSgnYWFhYWFhYWEtYWFhYS1hYWFhLWFhYWEtYWFhYWFhYWFhYWFhJywgaWQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVybCArIGlkO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuIl0sIm5hbWVzIjpbIl8iLCJrbyIsImFyY2hlcyIsIkFic3RyYWN0TW9kZWwiLCJleHRlbmQiLCJ1cmwiLCJ1cmxzIiwibm9kZSIsImluaXRpYWxpemUiLCJvcHRpb25zIiwic2VsZiIsImdyYXBoIiwiZGF0YXR5cGVsb29rdXAiLCJsYXllciIsImljb25zIiwibWFwU291cmNlIiwibG9hZGluZyIsInBlcm1pc3Npb25zIiwib250b2xvZ3lfbmFtZXNwYWNlcyIsInNvdXJjZSIsImNvbmZpZyIsImtleXMiLCJsZW5ndGgiLCJfbm9kZSIsIm9ic2VydmFibGUiLCJzZWxlY3RlZCIsImZpbHRlcmVkIiwibmFtZSIsImRlc2NyaXB0aW9uIiwic2x1ZyIsImFsaWFzIiwiaGFzQ3VzdG9tQWxpYXMiLCJzb3VyY2VJZGVudGlmaWVySWQiLCJub2RlR3JvdXBJZCIsImRhdGF0eXBlIiwiY29tcHV0ZWQiLCJyZWFkIiwid3JpdGUiLCJ2YWx1ZSIsImRhdGF0eXBlUmVjb3JkIiwiZGVmYXVsdENvbmZpZyIsImRlZmF1bHRjb25maWciLCJzZXR1cENvbmZpZyIsIm93bmVyIiwiZGF0YXR5cGVEYXRhQmVhcmluZyIsInJlc3VsdCIsImRlZmF1bHR3aWRnZXRfaWQiLCJkYXRhdHlwZUlzU2VhcmNoYWJsZSIsInNlYXJjaGFibGUiLCJjb25maWduYW1lIiwiaXNzZWFyY2hhYmxlIiwiZGF0YXR5cGVDb25maWdDb21wb25lbnQiLCJjb21wb25lbnQiLCJvbnRvbG9neWNsYXNzIiwicGFyZW50cHJvcGVydHkiLCJvbnRvbG9neV9jYWNoZSIsIm9ic2VydmFibGVBcnJheSIsImRlZmVycmVkIiwiY29uZmlnS2V5cyIsImlzcmVxdWlyZWQiLCJmaWVsZG5hbWUiLCJleHBvcnRhYmxlIiwicGFyc2UiLCJ2YWxpZGNsYXNzZXMiLCJjaGFpbiIsInNvcnRCeSIsIml0ZW0iLCJjbGFzcyIsInVuaXEiLCJwbHVjayIsImZpbHRlciIsInByb3BlcnR5IiwiaXN0b3Bub2RlIiwidmFsaWRwcm9wZXJ0aWVzIiwiaWNvbmNsYXNzIiwianNvbiIsImVhY2giLCJrZXkiLCJqc09iaiIsInRvSlMiLCJub2RlZ3JvdXBfaWQiLCJpc19pbW11dGFibGUiLCJoYXNjdXN0b21hbGlhcyIsInNvdXJjZWJyYW5jaHB1YmxpY2F0aW9uX2lkIiwic291cmNlQnJhbmNoUHVibGljYXRpb25JZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkaXJ0eSIsInJhdGVMaW1pdCIsImlzQ29sbGVjdG9yIiwibm9kZWlkIiwic3Vic2NyaWJlIiwiZ2V0VmFsaWROb2Rlc0VkZ2VzIiwib250b2xvZ3ljbGFzc19mcmllbmRseW5hbWUiLCJnZXRGcmllbmRseU9udG9sZ3lOYW1lIiwicGFyZW50cHJvcGVydHlfZnJpZW5kbHluYW1lIiwib250b2xvZ3luYW1lIiwidXJpIiwiZmluZCIsIm5hbWVzcGFjZSIsImluZGV4T2YiLCJyZXBsYWNlIiwidW53cmFwIiwic291cmNlX2lkZW50aWZpZXJfaWQiLCJzZXQiLCJncmFwaF9pZCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImNvbmZpZ1ZhbCIsImNvbmZpZ0tleSIsImlzT2JzZXJ2YWJsZSIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJyZXNldCIsInNhdmUiLCJ1c2VyQ2FsbGJhY2siLCJzY29wZSIsIm1ldGhvZCIsImNhbGxiYWNrIiwicmVxdWVzdCIsInN0YXR1cyIsIm1vZGVsIiwiX3JlcXVlc3QkcmVzcG9uc2VKU09OIiwicmVzcG9uc2VKU09OIiwidXBkYXRlZF92YWx1ZXMiLCJkb2N1bWVudCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsIl9kb1JlcXVlc3QiLCJ0eXBlIiwiX2dldFVSTCIsImRhdGEiLCJ0b0pTT04iLCJ0b2dnbGVJc0NvbGxlY3RvciIsImdldFBhcmVudE5vZGUiLCJjaGlsZHJlbiIsImdldENoaWxkTm9kZXNBbmRFZGdlcyIsIm5vZGVzIiwiZm9yRWFjaCIsImNoaWxkIiwicmVtb3ZlQWxsIiwidW5kZWZpbmVkIiwib250b2xvZ3lfY2xhc3NlcyIsIm9udG9sb2d5X3Byb3BlcnR5IiwiaWQiLCJnZXQiXSwic291cmNlUm9vdCI6IiJ9