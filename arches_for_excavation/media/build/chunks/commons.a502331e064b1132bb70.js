"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[86615],{

/***/ 86615:
/*!************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/models/function-model.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var models_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/abstract */ 47797);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! knockout-mapping */ 61101);
/* harmony import */ var knockout_mapping__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(knockout_mapping__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (models_abstract__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
  /**
  * A backbone model to manage function data
  * @augments AbstractModel
  * @constructor
  * @name FunctionModel
  */
  url: arches__WEBPACK_IMPORTED_MODULE_0__["default"].urls.function,
  /**
  * Initializes the model with optional parameters
  * @memberof FunctionXGraphModel.prototype
  * @param {object} options
  * @param {object} options.functionid - the id of the function
  * @param {object} options.name - the name of the function
  * @param {object} options.description - the description of the function
  * @param {object} options.functiontype - the function type
  * @param {object} options.component - a reference to the knockout component
  * @param {object} options.defaultconfig - the default properties requiring user configuration
  */
  initialize: function initialize(options) {
    var self = this;
    this._json = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable('');
    this.functionid = options.functionid;
    this.defaultconfig = knockout_mapping__WEBPACK_IMPORTED_MODULE_3___default().fromJS({
      'triggering_nodegroups': []
    });
    this.name = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
    this.description = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
    this.functiontype = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
    this.component = knockout__WEBPACK_IMPORTED_MODULE_2___default().observable();
    this.parse(options);
    this.json = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
      return JSON.stringify(underscore__WEBPACK_IMPORTED_MODULE_4___default().extend(JSON.parse(self._json()), {
        defaultconfig: knockout_mapping__WEBPACK_IMPORTED_MODULE_3___default().toJS(self.defaultconfig),
        name: self.name(),
        description: self.description(),
        functiontype: self.functiontype(),
        component: self.component()
      }));
    });
    self.dirty = knockout__WEBPACK_IMPORTED_MODULE_2___default().computed(function () {
      return self.json() !== self._json();
    });
  },
  /**
  * parse - parses the passed in data into a {@link FunctionModel}
  * @memberof FunctionModel.prototype
  * @param  {object} data - the observable properties to seed a {@link FunctionModel} with
  * @param {object} data.functionid - the id of the function
  * @param {object} data.name - the name of the function
  * @param {object} data.description - the description of the function
  * @param {object} data.functiontype - the function type
  * @param {object} data.component - a reference to the knockout component
  * @param {object} data.defaultconfig - the default properties requiring user configuration
  */
  parse: function parse(data) {
    this._json(JSON.stringify(data));
    this.functionid = data.functionid;
    knockout_mapping__WEBPACK_IMPORTED_MODULE_3___default().fromJS(data.defaultconfig, this.defaultconfig);
    this.name(data.name);
    this.description(data.description);
    this.functiontype(data.functiontype);
    this.component(data.component);
    this.set('id', data.functionid);
  },
  /**
  * discard unsaved model changes and resets the model data
  * @memberof FunctionModel.prototype
  */
  reset: function reset() {
    this.parse(JSON.parse(this._json()));
  },
  /**
  * returns a JSON object containing model data
  * @memberof FunctionModel.prototype
  * @return {object} a JSON object containing model data
  */
  toJSON: function toJSON() {
    return JSON.parse(this.json());
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYTUwMjMzMWUwNjRiMTEzMmJiNzAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTRCO0FBQ2dCO0FBQ2xCO0FBQ2U7QUFDZDtBQUUzQixpRUFBZUMsdURBQWEsQ0FBQ0ksTUFBTSxDQUFDO0VBQ2hDO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJQyxHQUFHLEVBQUVOLDhDQUFNLENBQUNPLElBQUksQ0FBQ0MsUUFBUTtFQUV6QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lDLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFZQyxPQUFPLEVBQUU7SUFDM0IsSUFBSUMsSUFBSSxHQUFHLElBQUk7SUFDZixJQUFJLENBQUNDLEtBQUssR0FBR1YsMERBQWEsQ0FBQyxFQUFFLENBQUM7SUFDOUIsSUFBSSxDQUFDWSxVQUFVLEdBQUdKLE9BQU8sQ0FBQ0ksVUFBVTtJQUNwQyxJQUFJLENBQUNDLGFBQWEsR0FBR1osOERBQWdCLENBQUM7TUFBRSx1QkFBdUIsRUFBRTtJQUFHLENBQUMsQ0FBQztJQUN0RSxJQUFJLENBQUNjLElBQUksR0FBR2YsMERBQWEsQ0FBQyxDQUFDO0lBQzNCLElBQUksQ0FBQ2dCLFdBQVcsR0FBR2hCLDBEQUFhLENBQUMsQ0FBQztJQUNsQyxJQUFJLENBQUNpQixZQUFZLEdBQUdqQiwwREFBYSxDQUFDLENBQUM7SUFDbkMsSUFBSSxDQUFDa0IsU0FBUyxHQUFHbEIsMERBQWEsQ0FBQyxDQUFDO0lBRWhDLElBQUksQ0FBQ21CLEtBQUssQ0FBQ1gsT0FBTyxDQUFDO0lBRW5CLElBQUksQ0FBQ1ksSUFBSSxHQUFHcEIsd0RBQVcsQ0FBQyxZQUFZO01BQ2hDLE9BQU9zQixJQUFJLENBQUNDLFNBQVMsQ0FBQ3JCLHdEQUFRLENBQUNvQixJQUFJLENBQUNILEtBQUssQ0FBQ1YsSUFBSSxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDckRHLGFBQWEsRUFBRVosNERBQWMsQ0FBQ1EsSUFBSSxDQUFDSSxhQUFhLENBQUM7UUFDakRFLElBQUksRUFBRU4sSUFBSSxDQUFDTSxJQUFJLENBQUMsQ0FBQztRQUNqQkMsV0FBVyxFQUFFUCxJQUFJLENBQUNPLFdBQVcsQ0FBQyxDQUFDO1FBQy9CQyxZQUFZLEVBQUVSLElBQUksQ0FBQ1EsWUFBWSxDQUFDLENBQUM7UUFDakNDLFNBQVMsRUFBRVQsSUFBSSxDQUFDUyxTQUFTLENBQUM7TUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUM7SUFFRlQsSUFBSSxDQUFDZ0IsS0FBSyxHQUFHekIsd0RBQVcsQ0FBQyxZQUFZO01BQ2pDLE9BQU9TLElBQUksQ0FBQ1csSUFBSSxDQUFDLENBQUMsS0FBS1gsSUFBSSxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7RUFDTixDQUFDO0VBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJUyxLQUFLLEVBQUUsU0FBUEEsS0FBS0EsQ0FBWU8sSUFBSSxFQUFFO0lBQ25CLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ1ksSUFBSSxDQUFDQyxTQUFTLENBQUNHLElBQUksQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQ2QsVUFBVSxHQUFHYyxJQUFJLENBQUNkLFVBQVU7SUFDakNYLDhEQUFnQixDQUFDeUIsSUFBSSxDQUFDYixhQUFhLEVBQUUsSUFBSSxDQUFDQSxhQUFhLENBQUM7SUFDeEQsSUFBSSxDQUFDRSxJQUFJLENBQUNXLElBQUksQ0FBQ1gsSUFBSSxDQUFDO0lBQ3BCLElBQUksQ0FBQ0MsV0FBVyxDQUFDVSxJQUFJLENBQUNWLFdBQVcsQ0FBQztJQUNsQyxJQUFJLENBQUNDLFlBQVksQ0FBQ1MsSUFBSSxDQUFDVCxZQUFZLENBQUM7SUFDcEMsSUFBSSxDQUFDQyxTQUFTLENBQUNRLElBQUksQ0FBQ1IsU0FBUyxDQUFDO0lBRTlCLElBQUksQ0FBQ1MsR0FBRyxDQUFDLElBQUksRUFBRUQsSUFBSSxDQUFDZCxVQUFVLENBQUM7RUFDbkMsQ0FBQztFQUVEO0FBQ0o7QUFDQTtBQUNBO0VBQ0lnQixLQUFLLEVBQUUsU0FBUEEsS0FBS0EsQ0FBQSxFQUFjO0lBQ2YsSUFBSSxDQUFDVCxLQUFLLENBQUNHLElBQUksQ0FBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQ1QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hDLENBQUM7RUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0ltQixNQUFNLEVBQUUsU0FBUkEsTUFBTUEsQ0FBQSxFQUFjO0lBQ2hCLE9BQU9QLElBQUksQ0FBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQ0MsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNsQztBQUNKLENBQUMsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvbW9kZWxzL2Z1bmN0aW9uLW1vZGVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBBYnN0cmFjdE1vZGVsIGZyb20gJ21vZGVscy9hYnN0cmFjdCc7XG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IGtvTWFwcGluZyBmcm9tICdrbm9ja291dC1tYXBwaW5nJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdE1vZGVsLmV4dGVuZCh7XG4gICAgLyoqXG4gICAgKiBBIGJhY2tib25lIG1vZGVsIHRvIG1hbmFnZSBmdW5jdGlvbiBkYXRhXG4gICAgKiBAYXVnbWVudHMgQWJzdHJhY3RNb2RlbFxuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKiBAbmFtZSBGdW5jdGlvbk1vZGVsXG4gICAgKi9cbiAgICB1cmw6IGFyY2hlcy51cmxzLmZ1bmN0aW9uLFxuXG4gICAgLyoqXG4gICAgKiBJbml0aWFsaXplcyB0aGUgbW9kZWwgd2l0aCBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgKiBAbWVtYmVyb2YgRnVuY3Rpb25YR3JhcGhNb2RlbC5wcm90b3R5cGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5mdW5jdGlvbmlkIC0gdGhlIGlkIG9mIHRoZSBmdW5jdGlvblxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMubmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvblxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuZGVzY3JpcHRpb24gLSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGZ1bmN0aW9uXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5mdW5jdGlvbnR5cGUgLSB0aGUgZnVuY3Rpb24gdHlwZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuY29tcG9uZW50IC0gYSByZWZlcmVuY2UgdG8gdGhlIGtub2Nrb3V0IGNvbXBvbmVudFxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuZGVmYXVsdGNvbmZpZyAtIHRoZSBkZWZhdWx0IHByb3BlcnRpZXMgcmVxdWlyaW5nIHVzZXIgY29uZmlndXJhdGlvblxuICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9qc29uID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgICAgIHRoaXMuZnVuY3Rpb25pZCA9IG9wdGlvbnMuZnVuY3Rpb25pZDtcbiAgICAgICAgdGhpcy5kZWZhdWx0Y29uZmlnID0ga29NYXBwaW5nLmZyb21KUyh7ICd0cmlnZ2VyaW5nX25vZGVncm91cHMnOiBbXSB9KTtcbiAgICAgICAgdGhpcy5uYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgICAgICB0aGlzLmZ1bmN0aW9udHlwZSA9IGtvLm9ic2VydmFibGUoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBrby5vYnNlcnZhYmxlKCk7XG5cbiAgICAgICAgdGhpcy5wYXJzZShvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmpzb24gPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXy5leHRlbmQoSlNPTi5wYXJzZShzZWxmLl9qc29uKCkpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdGNvbmZpZzoga29NYXBwaW5nLnRvSlMoc2VsZi5kZWZhdWx0Y29uZmlnKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBzZWxmLm5hbWUoKSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogc2VsZi5kZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9udHlwZTogc2VsZi5mdW5jdGlvbnR5cGUoKSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IHNlbGYuY29tcG9uZW50KCksXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuZGlydHkgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5qc29uKCkgIT09IHNlbGYuX2pzb24oKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogcGFyc2UgLSBwYXJzZXMgdGhlIHBhc3NlZCBpbiBkYXRhIGludG8gYSB7QGxpbmsgRnVuY3Rpb25Nb2RlbH1cbiAgICAqIEBtZW1iZXJvZiBGdW5jdGlvbk1vZGVsLnByb3RvdHlwZVxuICAgICogQHBhcmFtICB7b2JqZWN0fSBkYXRhIC0gdGhlIG9ic2VydmFibGUgcHJvcGVydGllcyB0byBzZWVkIGEge0BsaW5rIEZ1bmN0aW9uTW9kZWx9IHdpdGhcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhLmZ1bmN0aW9uaWQgLSB0aGUgaWQgb2YgdGhlIGZ1bmN0aW9uXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YS5uYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YS5kZXNjcmlwdGlvbiAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZnVuY3Rpb25cbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhLmZ1bmN0aW9udHlwZSAtIHRoZSBmdW5jdGlvbiB0eXBlXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YS5jb21wb25lbnQgLSBhIHJlZmVyZW5jZSB0byB0aGUga25vY2tvdXQgY29tcG9uZW50XG4gICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YS5kZWZhdWx0Y29uZmlnIC0gdGhlIGRlZmF1bHQgcHJvcGVydGllcyByZXF1aXJpbmcgdXNlciBjb25maWd1cmF0aW9uXG4gICAgKi9cbiAgICBwYXJzZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fanNvbihKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIHRoaXMuZnVuY3Rpb25pZCA9IGRhdGEuZnVuY3Rpb25pZDtcbiAgICAgICAga29NYXBwaW5nLmZyb21KUyhkYXRhLmRlZmF1bHRjb25maWcsIHRoaXMuZGVmYXVsdGNvbmZpZyk7XG4gICAgICAgIHRoaXMubmFtZShkYXRhLm5hbWUpO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uKGRhdGEuZGVzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLmZ1bmN0aW9udHlwZShkYXRhLmZ1bmN0aW9udHlwZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50KGRhdGEuY29tcG9uZW50KTtcblxuICAgICAgICB0aGlzLnNldCgnaWQnLCBkYXRhLmZ1bmN0aW9uaWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIGRpc2NhcmQgdW5zYXZlZCBtb2RlbCBjaGFuZ2VzIGFuZCByZXNldHMgdGhlIG1vZGVsIGRhdGFcbiAgICAqIEBtZW1iZXJvZiBGdW5jdGlvbk1vZGVsLnByb3RvdHlwZVxuICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wYXJzZShKU09OLnBhcnNlKHRoaXMuX2pzb24oKSkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIHJldHVybnMgYSBKU09OIG9iamVjdCBjb250YWluaW5nIG1vZGVsIGRhdGFcbiAgICAqIEBtZW1iZXJvZiBGdW5jdGlvbk1vZGVsLnByb3RvdHlwZVxuICAgICogQHJldHVybiB7b2JqZWN0fSBhIEpTT04gb2JqZWN0IGNvbnRhaW5pbmcgbW9kZWwgZGF0YVxuICAgICovXG4gICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuanNvbigpKTtcbiAgICB9LFxufSk7XG4iXSwibmFtZXMiOlsiYXJjaGVzIiwiQWJzdHJhY3RNb2RlbCIsImtvIiwia29NYXBwaW5nIiwiXyIsImV4dGVuZCIsInVybCIsInVybHMiLCJmdW5jdGlvbiIsImluaXRpYWxpemUiLCJvcHRpb25zIiwic2VsZiIsIl9qc29uIiwib2JzZXJ2YWJsZSIsImZ1bmN0aW9uaWQiLCJkZWZhdWx0Y29uZmlnIiwiZnJvbUpTIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZnVuY3Rpb250eXBlIiwiY29tcG9uZW50IiwicGFyc2UiLCJqc29uIiwiY29tcHV0ZWQiLCJKU09OIiwic3RyaW5naWZ5IiwidG9KUyIsImRpcnR5IiwiZGF0YSIsInNldCIsInJlc2V0IiwidG9KU09OIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=