(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[63154],{

/***/ 63154:
/*!******************************************************************************!*\
  !*** ./arches_slocal/media/js/views/components/custom/report_scenes/name.js ***!
  \******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ 55869), __webpack_require__(/*! knockout */ 51786), __webpack_require__(/*! templates/views/components/custom/report_scenes/name.htm */ 99284), __webpack_require__(/*! arches */ 77126), __webpack_require__(/*! bindings/datatable */ 65863)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, ko, nameSceneTemplate, arches) {
  return ko.components.register('views/components/custom/report_scenes/name', {
    viewModel: function viewModel(params) {
      var self = this;
      self.nameTableConfig = _objectSpread(_objectSpread({}, self.defaultTableConfig), {}, {
        columns: Array(4).fill(null)
      });
      self.identifierTableConfig = _objectSpread(_objectSpread({}, self.defaultTableConfig), {}, {
        columns: Array(3).fill(null)
      });
      self.dataConfig = {
        name: 'Name',
        identifier: 'Identifier',
        exactMatch: 'exactmatch',
        type: 'type'
      };
      self.cards = Object.assign({}, params.cards);
      self.edit = params.editTile || self.editTile;
      self.delete = params.deleteTile || self.deleteTile;
      self.add = params.addTile || self.addNewTile;
      self.names = ko.observableArray();
      self.identifiers = ko.observableArray();
      self.exactMatch = ko.observableArray();
      self.type = ko.observable();
      self.summary = params.summary || false;
      self.visible = {
        names: ko.observable(true),
        identifiers: ko.observable(true),
        classifications: ko.observable(true)
      };
      Object.assign(self.dataConfig, params.dataConfig || {});

      // if params.compiled is set and true, the user has compiled their own data.  Use as is.
      if (params !== null && params !== void 0 && params.compiled) {
        self.names(params.data.names);
        self.identifiers(params.data.identifiers);
        self.exactMatch(params.data.exactMatch);
        self.type(params.data.type);
      } else {
        var _nameData;
        var nameData = params.data()[self.dataConfig.name];
        if (((_nameData = nameData) === null || _nameData === void 0 ? void 0 : _nameData.length) === undefined) {
          nameData = [nameData];
        }
        self.names(nameData.map(function (x) {
          var type = self.getNodeValue(x, {
            testPaths: [["".concat(self.dataConfig.name.toLowerCase(), "_type")], ['type']]
          });
          var content = self.getNodeValue(x, {
            testPaths: [["".concat(self.dataConfig.name.toLowerCase(), "_content")], ['content']]
          });
          var language = self.getNodeValue(x, {
            testPaths: [["".concat(self.dataConfig.name.toLowerCase(), "_language")], ['language']]
          });
          var tileid = self.getTileId(x);
          return {
            type: type,
            content: content,
            language: language,
            tileid: tileid
          };
        }));
        var identifierData = params.data()[self.dataConfig.identifier];
        if (identifierData) {
          if (identifierData.length === undefined) {
            identifierData = [identifierData];
          }
          self.identifiers(identifierData.map(function (x) {
            var type = self.getNodeValue(x, {
              testPaths: [["".concat(self.dataConfig.identifier.toLowerCase(), "_type")], ['type']]
            });
            var content = self.getNodeValue(x, {
              testPaths: [["".concat(self.dataConfig.identifier.toLowerCase(), "_content")], ['content']]
            });
            var tileid = self.getTileId(x);
            return {
              type: type,
              content: content,
              tileid: tileid
            };
          }));
        }
        console.log("aaaaaaa");
        var exactMatchData = self.getRawNodeValue(params.data(), self.dataConfig.exactMatch);
        if (exactMatchData) {
          if (exactMatchData.length === undefined) {
            exactMatchData = [exactMatchData];
          }
          self.exactMatch(exactMatchData.map(function (x) {
            return self.getNodeValue(x);
          }));
        }
        self.type(self.getNodeValue(params.data(), self.dataConfig.type));
      }
    },
    template: nameSceneTemplate
  });
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 99284:
/*!********************************************************************************!*\
  !*** ./arches_slocal/templates/views/components/custom/report_scenes/name.htm ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "templates/views/components/custom/report_scenes/name.htm";

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVMsQ0FBQztZQUNkLENBQUMsQ0FBQztZQUVQLElBQU1HLE1BQU0sR0FBRzVDLElBQUksQ0FBQzZDLFNBQVMsQ0FBQ1IsQ0FBQyxDQUFDO1lBQ2hDLE9BQU87Y0FBRXpCLElBQUksRUFBSkEsSUFBSTtjQUFFOEIsT0FBTyxFQUFQQSxPQUFPO2NBQUVFLE1BQU0sRUFBTkE7WUFBTyxDQUFDO1VBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ1A7UUFDQUcsT0FBTyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBRXRCLElBQUlDLGNBQWMsR0FBR2pELElBQUksQ0FBQ2tELGVBQWUsQ0FBQ25ELE1BQU0sQ0FBQ2dDLElBQUksQ0FBQyxDQUFDLEVBQUUvQixJQUFJLENBQUNRLFVBQVUsQ0FBQ0csVUFBVSxDQUFDO1FBQ3BGLElBQUdzQyxjQUFjLEVBQUU7VUFDZixJQUFHQSxjQUFjLENBQUNmLE1BQU0sS0FBS0MsU0FBUyxFQUFDO1lBQ25DYyxjQUFjLEdBQUcsQ0FBQ0EsY0FBYyxDQUFDO1VBQ3JDO1VBQ0FqRCxJQUFJLENBQUNXLFVBQVUsQ0FBQ3NDLGNBQWMsQ0FBQ2IsR0FBRyxDQUFDLFVBQUFDLENBQUM7WUFBQSxPQUFJckMsSUFBSSxDQUFDc0MsWUFBWSxDQUFDRCxDQUFDLENBQUM7VUFBQSxFQUFDLENBQUM7UUFDbEU7UUFFQXJDLElBQUksQ0FBQ1ksSUFBSSxDQUFDWixJQUFJLENBQUNzQyxZQUFZLENBQUN2QyxNQUFNLENBQUNnQyxJQUFJLENBQUMsQ0FBQyxFQUFFL0IsSUFBSSxDQUFDUSxVQUFVLENBQUNJLElBQUksQ0FBQyxDQUFDO01BQ3JFO0lBRUosQ0FBQztJQUNEdUMsUUFBUSxFQUFFekQ7RUFDZCxDQUFDLENBQUM7QUFDTixDQUFDO0FBQUEsa0dBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9hcmNoZXNfc2xvY2FsL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvY3VzdG9tL3JlcG9ydF9zY2VuZXMvbmFtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWyd1bmRlcnNjb3JlJyxcclxuICAgICdrbm9ja291dCcsXHJcbiAgICAndGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvY3VzdG9tL3JlcG9ydF9zY2VuZXMvbmFtZS5odG0nLFxyXG4gICAgJ2FyY2hlcycsXHJcbiAgICAnYmluZGluZ3MvZGF0YXRhYmxlJ1xyXG5dLCBmdW5jdGlvbihfLCBrbywgbmFtZVNjZW5lVGVtcGxhdGUsIGFyY2hlcykge1xyXG4gICAgcmV0dXJuIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3ZpZXdzL2NvbXBvbmVudHMvY3VzdG9tL3JlcG9ydF9zY2VuZXMvbmFtZScsIHtcclxuICAgICAgICB2aWV3TW9kZWw6IGZ1bmN0aW9uKHBhcmFtcykge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBzZWxmLm5hbWVUYWJsZUNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgIC4uLnNlbGYuZGVmYXVsdFRhYmxlQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogQXJyYXkoNCkuZmlsbChudWxsKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2VsZi5pZGVudGlmaWVyVGFibGVDb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICAuLi5zZWxmLmRlZmF1bHRUYWJsZUNvbmZpZyxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IEFycmF5KDMpLmZpbGwobnVsbClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZGF0YUNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lJyxcclxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6ICdJZGVudGlmaWVyJyxcclxuICAgICAgICAgICAgICAgIGV4YWN0TWF0Y2g6ICdleGFjdG1hdGNoJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd0eXBlJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLmNhcmRzID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLmNhcmRzKTtcclxuICAgICAgICAgICAgc2VsZi5lZGl0ID0gcGFyYW1zLmVkaXRUaWxlIHx8IHNlbGYuZWRpdFRpbGU7XHJcbiAgICAgICAgICAgIHNlbGYuZGVsZXRlID0gcGFyYW1zLmRlbGV0ZVRpbGUgfHwgc2VsZi5kZWxldGVUaWxlO1xyXG4gICAgICAgICAgICBzZWxmLmFkZCA9IHBhcmFtcy5hZGRUaWxlIHx8IHNlbGYuYWRkTmV3VGlsZTtcclxuICAgICAgICAgICAgc2VsZi5uYW1lcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgICAgICAgICBzZWxmLmlkZW50aWZpZXJzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XHJcbiAgICAgICAgICAgIHNlbGYuZXhhY3RNYXRjaCA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgICAgICAgICBzZWxmLnR5cGUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgICAgIHNlbGYuc3VtbWFyeSA9IHBhcmFtcy5zdW1tYXJ5IHx8IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLnZpc2libGUgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lczoga28ub2JzZXJ2YWJsZSh0cnVlKSxcclxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJzOiBrby5vYnNlcnZhYmxlKHRydWUpLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NpZmljYXRpb25zOiBrby5vYnNlcnZhYmxlKHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzZWxmLmRhdGFDb25maWcsIHBhcmFtcy5kYXRhQ29uZmlnIHx8IHt9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHBhcmFtcy5jb21waWxlZCBpcyBzZXQgYW5kIHRydWUsIHRoZSB1c2VyIGhhcyBjb21waWxlZCB0aGVpciBvd24gZGF0YS4gIFVzZSBhcyBpcy5cclxuICAgICAgICAgICAgaWYocGFyYW1zPy5jb21waWxlZCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm5hbWVzKHBhcmFtcy5kYXRhLm5hbWVzKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuaWRlbnRpZmllcnMocGFyYW1zLmRhdGEuaWRlbnRpZmllcnMpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5leGFjdE1hdGNoKHBhcmFtcy5kYXRhLmV4YWN0TWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi50eXBlKHBhcmFtcy5kYXRhLnR5cGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVEYXRhID0gcGFyYW1zLmRhdGEoKVtzZWxmLmRhdGFDb25maWcubmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZihuYW1lRGF0YT8ubGVuZ3RoID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVEYXRhID0gW25hbWVEYXRhXVxyXG4gICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLm5hbWVzKG5hbWVEYXRhLm1hcCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc2VsZi5nZXROb2RlVmFsdWUoeCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0UGF0aHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgJHtzZWxmLmRhdGFDb25maWcubmFtZS50b0xvd2VyQ2FzZSgpfV90eXBlYF0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWyd0eXBlJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgXX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzZWxmLmdldE5vZGVWYWx1ZSh4LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RQYXRoczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Ake3NlbGYuZGF0YUNvbmZpZy5uYW1lLnRvTG93ZXJDYXNlKCl9X2NvbnRlbnRgXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJ2NvbnRlbnQnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBzZWxmLmdldE5vZGVWYWx1ZSh4LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RQYXRoczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Ake3NlbGYuZGF0YUNvbmZpZy5uYW1lLnRvTG93ZXJDYXNlKCl9X2xhbmd1YWdlYF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJ2xhbmd1YWdlJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgXX0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWxlaWQgPSBzZWxmLmdldFRpbGVJZCh4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB0eXBlLCBjb250ZW50LCBsYW5ndWFnZSwgdGlsZWlkIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaWRlbnRpZmllckRhdGEgPSBwYXJhbXMuZGF0YSgpW3NlbGYuZGF0YUNvbmZpZy5pZGVudGlmaWVyXTtcclxuICAgICAgICAgICAgICAgIGlmKGlkZW50aWZpZXJEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaWRlbnRpZmllckRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyRGF0YSA9IFtpZGVudGlmaWVyRGF0YV1cclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmlkZW50aWZpZXJzKGlkZW50aWZpZXJEYXRhLm1hcCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNlbGYuZ2V0Tm9kZVZhbHVlKHgse1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdFBhdGhzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Ake3NlbGYuZGF0YUNvbmZpZy5pZGVudGlmaWVyLnRvTG93ZXJDYXNlKCl9X3R5cGVgXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyd0eXBlJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHNlbGYuZ2V0Tm9kZVZhbHVlKHgsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RQYXRoczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgJHtzZWxmLmRhdGFDb25maWcuaWRlbnRpZmllci50b0xvd2VyQ2FzZSgpfV9jb250ZW50YF0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsnY29udGVudCddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWxlaWQgPSBzZWxmLmdldFRpbGVJZCh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZSwgY29udGVudCwgdGlsZWlkIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFhYWFhYWFcIilcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZXhhY3RNYXRjaERhdGEgPSBzZWxmLmdldFJhd05vZGVWYWx1ZShwYXJhbXMuZGF0YSgpLCBzZWxmLmRhdGFDb25maWcuZXhhY3RNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICBpZihleGFjdE1hdGNoRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGV4YWN0TWF0Y2hEYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhhY3RNYXRjaERhdGEgPSBbZXhhY3RNYXRjaERhdGFdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXhhY3RNYXRjaChleGFjdE1hdGNoRGF0YS5tYXAoeCA9PiBzZWxmLmdldE5vZGVWYWx1ZSh4KSkpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi50eXBlKHNlbGYuZ2V0Tm9kZVZhbHVlKHBhcmFtcy5kYXRhKCksIHNlbGYuZGF0YUNvbmZpZy50eXBlKSk7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcGxhdGU6IG5hbWVTY2VuZVRlbXBsYXRlXHJcbiAgICB9KTtcclxufSk7Il0sIm5hbWVzIjpbImRlZmluZSIsIl8iLCJrbyIsIm5hbWVTY2VuZVRlbXBsYXRlIiwiYXJjaGVzIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsIm5hbWVUYWJsZUNvbmZpZyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0VGFibGVDb25maWciLCJjb2x1bW5zIiwiQXJyYXkiLCJmaWxsIiwiaWRlbnRpZmllclRhYmxlQ29uZmlnIiwiZGF0YUNvbmZpZyIsIm5hbWUiLCJpZGVudGlmaWVyIiwiZXhhY3RNYXRjaCIsInR5cGUiLCJjYXJkcyIsIk9iamVjdCIsImFzc2lnbiIsImVkaXQiLCJlZGl0VGlsZSIsImRlbGV0ZSIsImRlbGV0ZVRpbGUiLCJhZGQiLCJhZGRUaWxlIiwiYWRkTmV3VGlsZSIsIm5hbWVzIiwib2JzZXJ2YWJsZUFycmF5IiwiaWRlbnRpZmllcnMiLCJvYnNlcnZhYmxlIiwic3VtbWFyeSIsInZpc2libGUiLCJjbGFzc2lmaWNhdGlvbnMiLCJjb21waWxlZCIsImRhdGEiLCJfbmFtZURhdGEiLCJuYW1lRGF0YSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1hcCIsIngiLCJnZXROb2RlVmFsdWUiLCJ0ZXN0UGF0aHMiLCJjb25jYXQiLCJ0b0xvd2VyQ2FzZSIsImNvbnRlbnQiLCJsYW5ndWFnZSIsInRpbGVpZCIsImdldFRpbGVJZCIsImlkZW50aWZpZXJEYXRhIiwiY29uc29sZSIsImxvZyIsImV4YWN0TWF0Y2hEYXRhIiwiZ2V0UmF3Tm9kZVZhbHVlIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9