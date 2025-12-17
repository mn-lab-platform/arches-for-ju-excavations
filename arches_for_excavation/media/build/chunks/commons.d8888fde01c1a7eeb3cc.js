"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[96759],{

/***/ 96759:
/*!**************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/models/function-x-graph.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var models_abstract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! models/abstract */ 47797);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (models_abstract__WEBPACK_IMPORTED_MODULE_2__["default"].extend({
  /**
  * A backbone model to manage function data
  * @augments AbstractModel
  * @constructor
  * @name FunctionXGraphModel
  */
  url: arches__WEBPACK_IMPORTED_MODULE_1__["default"].urls.functionXGraph,
  /**
  * Initializes the model with optional parameters
  * @memberof FunctionXGraphModel.prototype
  * @param {object} options
  * @param {object} options.id - the id of the {@link FunctionXGraphModel}
  * @param {object} options.function - a reference to the parent {@link FunctionModel}
  * @param {object} options.function_id - a reference to the parent {@link FunctionModel} id
  * @param {object} options.graph_id - a reference to the parent {@link GraphModel} id
  * @param {object} options.config - the properties requiring user configuration 
  */
  initialize: function initialize(options) {
    var self = this;
    // _id is needed because we can apply more then
    // one function at a time in the function-manager
    this._id = underscore__WEBPACK_IMPORTED_MODULE_0___default().uniqueId();
    this._json = knockout__WEBPACK_IMPORTED_MODULE_3___default().observable('');
    this.id = options.id;
    this.function = options.function;
    this.function_id = options.function_id;
    this.graph_id = options.graph_id;
    this.config = knockout_mapping__WEBPACK_IMPORTED_MODULE_4___default().fromJS({});
    this.parse(options);
    this.dirty = knockout__WEBPACK_IMPORTED_MODULE_3___default().computed(function () {
      return JSON.stringify(underscore__WEBPACK_IMPORTED_MODULE_0___default().extend(JSON.parse(this._json()), this.toJSON())) !== this._json();
    }, this);
  },
  /**
  * parse - parses any passed in data to observable attributes 
  * @memberof FunctionXGraphModel.prototype
  * @param {object} data - the observable properties to seed a {@link FunctionXGraphModel} with
  * @param {object} data.id - the id of the {@link FunctionXGraphModel}
  * @param {object} data.config - the properties requiring user configuration 
  */
  parse: function parse(data) {
    knockout_mapping__WEBPACK_IMPORTED_MODULE_4___default().fromJS(data.config, this.config);
    this.set('id', data.id);
    this._json(JSON.stringify(this.toJSON()));
  },
  /**
  * discard unsaved model changes and resets the model data
  * @memberof FunctionXGraphModel.prototype
  */
  reset: function reset() {
    this.parse(JSON.parse(this._json()));
  },
  /**
  * returns a JSON object containing model data
  * @memberof FunctionXGraphModel.prototype
  * @return {object} a JSON object containing model data
  */
  toJSON: function toJSON() {
    var ret = {};
    var trackedProperties = ['_id', 'id', 'function_id', 'graph_id', 'config'];
    for (var key in this) {
      if (trackedProperties.indexOf(key) !== -1) {
        if (key === 'config') {
          ret[key] = knockout_mapping__WEBPACK_IMPORTED_MODULE_4___default().toJS(this[key]);
          delete ret[key]['__ko_mapping__'];
        } else {
          ret[key] = this[key];
        }
      }
    }
    return ret;
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLENBQUMsQ0FBQztVQUNwQyxPQUFPRixHQUFHLENBQUNFLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO1FBQ3JDLENBQUMsTUFBTTtVQUNIRixHQUFHLENBQUNFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQ0EsR0FBRyxDQUFDO1FBQ3hCO01BQ0o7SUFDSjtJQUNBLE9BQU9GLEdBQUc7RUFDZDtBQUNKLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvbW9kZWxzL2Z1bmN0aW9uLXgtZ3JhcGguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgYXJjaGVzIGZyb20gJ2FyY2hlcyc7XG5pbXBvcnQgQWJzdHJhY3RNb2RlbCBmcm9tICdtb2RlbHMvYWJzdHJhY3QnO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0TW9kZWwuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAqIEEgYmFja2JvbmUgbW9kZWwgdG8gbWFuYWdlIGZ1bmN0aW9uIGRhdGFcbiAgICAqIEBhdWdtZW50cyBBYnN0cmFjdE1vZGVsXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqIEBuYW1lIEZ1bmN0aW9uWEdyYXBoTW9kZWxcbiAgICAqL1xuICAgIHVybDogYXJjaGVzLnVybHMuZnVuY3Rpb25YR3JhcGgsXG5cbiAgICAvKipcbiAgICAqIEluaXRpYWxpemVzIHRoZSBtb2RlbCB3aXRoIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAqIEBtZW1iZXJvZiBGdW5jdGlvblhHcmFwaE1vZGVsLnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmlkIC0gdGhlIGlkIG9mIHRoZSB7QGxpbmsgRnVuY3Rpb25YR3JhcGhNb2RlbH1cbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmZ1bmN0aW9uIC0gYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCB7QGxpbmsgRnVuY3Rpb25Nb2RlbH1cbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmZ1bmN0aW9uX2lkIC0gYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCB7QGxpbmsgRnVuY3Rpb25Nb2RlbH0gaWRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmdyYXBoX2lkIC0gYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCB7QGxpbmsgR3JhcGhNb2RlbH0gaWRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmNvbmZpZyAtIHRoZSBwcm9wZXJ0aWVzIHJlcXVpcmluZyB1c2VyIGNvbmZpZ3VyYXRpb24gXG4gICAgKi9cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIF9pZCBpcyBuZWVkZWQgYmVjYXVzZSB3ZSBjYW4gYXBwbHkgbW9yZSB0aGVuXG4gICAgICAgIC8vIG9uZSBmdW5jdGlvbiBhdCBhIHRpbWUgaW4gdGhlIGZ1bmN0aW9uLW1hbmFnZXJcbiAgICAgICAgdGhpcy5faWQgPSBfLnVuaXF1ZUlkKCk7XG4gICAgICAgIHRoaXMuX2pzb24gPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgICAgICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgICAgIHRoaXMuZnVuY3Rpb24gPSBvcHRpb25zLmZ1bmN0aW9uO1xuICAgICAgICB0aGlzLmZ1bmN0aW9uX2lkID0gb3B0aW9ucy5mdW5jdGlvbl9pZDtcbiAgICAgICAgdGhpcy5ncmFwaF9pZCA9IG9wdGlvbnMuZ3JhcGhfaWQ7XG4gICAgICAgIHRoaXMuY29uZmlnID0ga29NYXBwaW5nLmZyb21KUyh7fSk7XG5cbiAgICAgICAgdGhpcy5wYXJzZShvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmRpcnR5ID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KF8uZXh0ZW5kKEpTT04ucGFyc2UodGhpcy5fanNvbigpKSwgdGhpcy50b0pTT04oKSkpICE9PSB0aGlzLl9qc29uKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICogcGFyc2UgLSBwYXJzZXMgYW55IHBhc3NlZCBpbiBkYXRhIHRvIG9ic2VydmFibGUgYXR0cmlidXRlcyBcbiAgICAqIEBtZW1iZXJvZiBGdW5jdGlvblhHcmFwaE1vZGVsLnByb3RvdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIHRvIHNlZWQgYSB7QGxpbmsgRnVuY3Rpb25YR3JhcGhNb2RlbH0gd2l0aFxuICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEuaWQgLSB0aGUgaWQgb2YgdGhlIHtAbGluayBGdW5jdGlvblhHcmFwaE1vZGVsfVxuICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEuY29uZmlnIC0gdGhlIHByb3BlcnRpZXMgcmVxdWlyaW5nIHVzZXIgY29uZmlndXJhdGlvbiBcbiAgICAqL1xuICAgIHBhcnNlOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBrb01hcHBpbmcuZnJvbUpTKGRhdGEuY29uZmlnLCB0aGlzLmNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5zZXQoJ2lkJywgZGF0YS5pZCk7XG4gICAgICAgIHRoaXMuX2pzb24oSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIGRpc2NhcmQgdW5zYXZlZCBtb2RlbCBjaGFuZ2VzIGFuZCByZXNldHMgdGhlIG1vZGVsIGRhdGFcbiAgICAqIEBtZW1iZXJvZiBGdW5jdGlvblhHcmFwaE1vZGVsLnByb3RvdHlwZVxuICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wYXJzZShKU09OLnBhcnNlKHRoaXMuX2pzb24oKSkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIHJldHVybnMgYSBKU09OIG9iamVjdCBjb250YWluaW5nIG1vZGVsIGRhdGFcbiAgICAqIEBtZW1iZXJvZiBGdW5jdGlvblhHcmFwaE1vZGVsLnByb3RvdHlwZVxuICAgICogQHJldHVybiB7b2JqZWN0fSBhIEpTT04gb2JqZWN0IGNvbnRhaW5pbmcgbW9kZWwgZGF0YVxuICAgICovXG4gICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgdmFyIHRyYWNrZWRQcm9wZXJ0aWVzID0gWydfaWQnLCAnaWQnLCAnZnVuY3Rpb25faWQnLCAnZ3JhcGhfaWQnLCAnY29uZmlnJ107XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAodHJhY2tlZFByb3BlcnRpZXMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdjb25maWcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFtrZXldID0ga29NYXBwaW5nLnRvSlModGhpc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJldFtrZXldWydfX2tvX21hcHBpbmdfXyddO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFtrZXldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG59KTtcbiJdLCJuYW1lcyI6WyJfIiwiYXJjaGVzIiwiQWJzdHJhY3RNb2RlbCIsImtvIiwia29NYXBwaW5nIiwiZXh0ZW5kIiwidXJsIiwidXJscyIsImZ1bmN0aW9uWEdyYXBoIiwiaW5pdGlhbGl6ZSIsIm9wdGlvbnMiLCJzZWxmIiwiX2lkIiwidW5pcXVlSWQiLCJfanNvbiIsIm9ic2VydmFibGUiLCJpZCIsImZ1bmN0aW9uIiwiZnVuY3Rpb25faWQiLCJncmFwaF9pZCIsImNvbmZpZyIsImZyb21KUyIsInBhcnNlIiwiZGlydHkiLCJjb21wdXRlZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0b0pTT04iLCJkYXRhIiwic2V0IiwicmVzZXQiLCJyZXQiLCJ0cmFja2VkUHJvcGVydGllcyIsImtleSIsImluZGV4T2YiLCJ0b0pTIl0sInNvdXJjZVJvb3QiOiIifQ==