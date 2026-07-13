"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[47797],{

/***/ 47797:
/*!******************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/models/abstract.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! backbone */ 77186);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backbone__WEBPACK_IMPORTED_MODULE_1___default().Model.extend({
  /**
   * A backbone model to manage RESTful requests on a per model basis
   * @constructor
   * @name AbstractModel
  */

  /**
   * Issues a request for a model instance from the server using the id of the model in the url
   * @memberof AbstractModel.prototype
   * @param  {function} callback - the function to call when the request returns
   * @param  {object} scope - (optional) the scope used for the callback
   * @return  {jqXHR} - a Proimise compatible asynchronous request
  */
  read: function read(callback, scope) {
    var method = "GET";
    return this._doRequest({
      type: method,
      data: {
        'format': 'json'
      },
      url: this._getURL(method)
    }, callback, scope, 'read');
  },
  /**
   * Posts a model back to the server using the id of the model in the url
   * @memberof AbstractModel.prototype
   * @param  {function} callback - the function to call when the request returns
   * @param  {object} scope - (optional) the scope used for the callback
   * @return  {jqXHR} - a Proimise compatible asynchronous request
  */
  save: function save(callback, scope) {
    var method = "POST";
    return this._doRequest({
      type: method,
      url: this._getURL(method),
      data: JSON.stringify(this.toJSON())
    }, callback, scope, 'save');
  },
  /**
   * Sends a delete request to the server using the id of the model in the url
   * @memberof AbstractModel.prototype
   * @param  {function} callback - the function to call when the request returns
   * @param  {object} scope - (optional) the scope used for the callback
   * @return  {jqXHR} - a Proimise compatible asynchronous request
  */
  delete: function _delete(callback, scope) {
    var method = "DELETE";
    return this._doRequest({
      type: method,
      url: this._getURL(method),
      data: JSON.stringify(this.toJSON())
    }, callback, scope, 'delete');
  },
  /**
   * Returns the url of the model to use in requests to the server, replaces the placeholder 
   * id 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', if it exists in the url, with the model id, otherwise appends the model id
   * @memberof AbstractModel.prototype
   * @param  {string} method - the type of request being made either "GET", "POST", "DELETE"
  */
  _getURL: function _getURL(method) {
    var id = this.get('id');
    if (!id) {
      id = '';
    }
    if (this.url.indexOf('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa') > -1) {
      return this.url.replace('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', id);
    } else {
      return this.url + id;
    }
  },
  /**
   * _doRequest - a wrapper around a simple ajax call
   * @memberof AbstractModel.prototype
   * @param  {object} config - a config object to pass to the ajax request
   * @param  {function} callback - function to call when the request returns
   * @param  {object} scope - (optional) the scope used for the callback
   * @param  {string} eventname - (optional) the event to trigger upon successfull return of the request
   * @return  {jqXHR} - a Proimise compatible asynchronous request
   */
  _doRequest: function _doRequest(config, callback, scope, eventname) {
    var self = this;
    if (!scope) {
      scope = self;
    }
    return jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax(jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({
      complete: function complete(request, status) {
        if (typeof callback === 'function') {
          callback.call(scope, request, status, self);
        }
        if (status === 'success') {
          self.trigger(eventname, self);
        }
      }
    }, config));
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bkIwQixRQUFRLEVBQUUsU0FBVkEsUUFBUUEsQ0FBV0MsT0FBTyxFQUFFQyxNQUFNLEVBQUU7UUFDaEMsSUFBSSxPQUFPdkIsUUFBUSxLQUFLLFVBQVUsRUFBRTtVQUNoQ0EsUUFBUSxDQUFDd0IsSUFBSSxDQUFDdkIsS0FBSyxFQUFFcUIsT0FBTyxFQUFFQyxNQUFNLEVBQUVKLElBQUksQ0FBQztRQUMvQztRQUNBLElBQUlJLE1BQU0sS0FBSyxTQUFTLEVBQUU7VUFDdEJKLElBQUksQ0FBQ00sT0FBTyxDQUFDUCxTQUFTLEVBQUVDLElBQUksQ0FBQztRQUNqQztNQUNKO0lBQ0osQ0FBQyxFQUFFRixNQUFNLENBQUMsQ0FBQztFQUNmO0FBQ0osQ0FBQyxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9qcy9tb2RlbHMvYWJzdHJhY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG4gICAgLyoqXG4gICAgICogQSBiYWNrYm9uZSBtb2RlbCB0byBtYW5hZ2UgUkVTVGZ1bCByZXF1ZXN0cyBvbiBhIHBlciBtb2RlbCBiYXNpc1xuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBuYW1lIEFic3RyYWN0TW9kZWxcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgICogSXNzdWVzIGEgcmVxdWVzdCBmb3IgYSBtb2RlbCBpbnN0YW5jZSBmcm9tIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGlkIG9mIHRoZSBtb2RlbCBpbiB0aGUgdXJsXG4gICAgICogQG1lbWJlcm9mIEFic3RyYWN0TW9kZWwucHJvdG90eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgcmVxdWVzdCByZXR1cm5zXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBzY29wZSAtIChvcHRpb25hbCkgdGhlIHNjb3BlIHVzZWQgZm9yIHRoZSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gIHtqcVhIUn0gLSBhIFByb2ltaXNlIGNvbXBhdGlibGUgYXN5bmNocm9ub3VzIHJlcXVlc3RcbiAgICAqL1xuICAgIHJlYWQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICB2YXIgbWV0aG9kID0gXCJHRVRcIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiBtZXRob2QsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgJ2Zvcm1hdCc6ICdqc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVybDogdGhpcy5fZ2V0VVJMKG1ldGhvZCksXG4gICAgICAgIH0sIGNhbGxiYWNrLCBzY29wZSwgJ3JlYWQnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUG9zdHMgYSBtb2RlbCBiYWNrIHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGlkIG9mIHRoZSBtb2RlbCBpbiB0aGUgdXJsXG4gICAgICogQG1lbWJlcm9mIEFic3RyYWN0TW9kZWwucHJvdG90eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgcmVxdWVzdCByZXR1cm5zXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBzY29wZSAtIChvcHRpb25hbCkgdGhlIHNjb3BlIHVzZWQgZm9yIHRoZSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gIHtqcVhIUn0gLSBhIFByb2ltaXNlIGNvbXBhdGlibGUgYXN5bmNocm9ub3VzIHJlcXVlc3RcbiAgICAqL1xuICAgIHNhdmU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICB2YXIgbWV0aG9kID0gXCJQT1NUXCI7XG4gICAgICAgIHJldHVybiB0aGlzLl9kb1JlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogbWV0aG9kLFxuICAgICAgICAgICAgdXJsOiB0aGlzLl9nZXRVUkwobWV0aG9kKSxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMudG9KU09OKCkpXG4gICAgICAgIH0sIGNhbGxiYWNrLCBzY29wZSwgJ3NhdmUnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBkZWxldGUgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBpZCBvZiB0aGUgbW9kZWwgaW4gdGhlIHVybFxuICAgICAqIEBtZW1iZXJvZiBBYnN0cmFjdE1vZGVsLnByb3RvdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxsYmFjayAtIHRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIHJlcXVlc3QgcmV0dXJuc1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gc2NvcGUgLSAob3B0aW9uYWwpIHRoZSBzY29wZSB1c2VkIGZvciB0aGUgY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuICB7anFYSFJ9IC0gYSBQcm9pbWlzZSBjb21wYXRpYmxlIGFzeW5jaHJvbm91cyByZXF1ZXN0XG4gICAgKi9cbiAgICBkZWxldGU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICB2YXIgbWV0aG9kID0gXCJERUxFVEVcIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiBtZXRob2QsXG4gICAgICAgICAgICB1cmw6IHRoaXMuX2dldFVSTChtZXRob2QpLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSlcbiAgICAgICAgfSwgY2FsbGJhY2ssIHNjb3BlLCAnZGVsZXRlJyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHVybCBvZiB0aGUgbW9kZWwgdG8gdXNlIGluIHJlcXVlc3RzIHRvIHRoZSBzZXJ2ZXIsIHJlcGxhY2VzIHRoZSBwbGFjZWhvbGRlciBcbiAgICAgKiBpZCAnYWFhYWFhYWEtYWFhYS1hYWFhLWFhYWEtYWFhYWFhYWFhYWFhJywgaWYgaXQgZXhpc3RzIGluIHRoZSB1cmwsIHdpdGggdGhlIG1vZGVsIGlkLCBvdGhlcndpc2UgYXBwZW5kcyB0aGUgbW9kZWwgaWRcbiAgICAgKiBAbWVtYmVyb2YgQWJzdHJhY3RNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG1ldGhvZCAtIHRoZSB0eXBlIG9mIHJlcXVlc3QgYmVpbmcgbWFkZSBlaXRoZXIgXCJHRVRcIiwgXCJQT1NUXCIsIFwiREVMRVRFXCJcbiAgICAqL1xuICAgIF9nZXRVUkw6IGZ1bmN0aW9uKG1ldGhvZCl7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuZ2V0KCdpZCcpO1xuICAgICAgICBpZighKGlkKSl7XG4gICAgICAgICAgICBpZCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMudXJsLmluZGV4T2YoJ2FhYWFhYWFhLWFhYWEtYWFhYS1hYWFhLWFhYWFhYWFhYWFhYScpID4gLTEpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXJsLnJlcGxhY2UoJ2FhYWFhYWFhLWFhYWEtYWFhYS1hYWFhLWFhYWFhYWFhYWFhYScsIGlkKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmwgKyBpZDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBfZG9SZXF1ZXN0IC0gYSB3cmFwcGVyIGFyb3VuZCBhIHNpbXBsZSBhamF4IGNhbGxcbiAgICAgKiBAbWVtYmVyb2YgQWJzdHJhY3RNb2RlbC5wcm90b3R5cGVcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyAtIGEgY29uZmlnIG9iamVjdCB0byBwYXNzIHRvIHRoZSBhamF4IHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIHJlcXVlc3QgcmV0dXJuc1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gc2NvcGUgLSAob3B0aW9uYWwpIHRoZSBzY29wZSB1c2VkIGZvciB0aGUgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGV2ZW50bmFtZSAtIChvcHRpb25hbCkgdGhlIGV2ZW50IHRvIHRyaWdnZXIgdXBvbiBzdWNjZXNzZnVsbCByZXR1cm4gb2YgdGhlIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuICB7anFYSFJ9IC0gYSBQcm9pbWlzZSBjb21wYXRpYmxlIGFzeW5jaHJvbm91cyByZXF1ZXN0XG4gICAgICovXG4gICAgX2RvUmVxdWVzdDogZnVuY3Rpb24oY29uZmlnLCBjYWxsYmFjaywgc2NvcGUsIGV2ZW50bmFtZSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghIHNjb3BlKXtcbiAgICAgICAgICAgIHNjb3BlID0gc2VsZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJC5hamF4KCQuZXh0ZW5kKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZXF1ZXN0LCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIHJlcXVlc3QsIHN0YXR1cywgc2VsZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXIoZXZlbnRuYW1lLCBzZWxmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNvbmZpZykpO1xuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbIiQiLCJCYWNrYm9uZSIsIk1vZGVsIiwiZXh0ZW5kIiwicmVhZCIsImNhbGxiYWNrIiwic2NvcGUiLCJtZXRob2QiLCJfZG9SZXF1ZXN0IiwidHlwZSIsImRhdGEiLCJ1cmwiLCJfZ2V0VVJMIiwic2F2ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0b0pTT04iLCJkZWxldGUiLCJpZCIsImdldCIsImluZGV4T2YiLCJyZXBsYWNlIiwiY29uZmlnIiwiZXZlbnRuYW1lIiwic2VsZiIsImFqYXgiLCJjb21wbGV0ZSIsInJlcXVlc3QiLCJzdGF0dXMiLCJjYWxsIiwidHJpZ2dlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9