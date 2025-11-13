(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[73865],{

/***/ 73865:
/*!****************************************************!*\
  !*** ./arches_slocal/media/js/utils/iiif-utils.js ***!
  \****************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  var getVersion = function getVersion(manifestData) {
    var urlString = manifestData === null || manifestData === void 0 ? void 0 : manifestData['@context'];
    var url = new URL(urlString);
    if (url.pathname.split("/")[3].startsWith("3")) {
      return 3;
    } else if (url.pathname.split("/")[3].startsWith("2")) {
      return 2;
    } else {
      throw new Error("Unable to identify version of IIIF presentation api.");
    }
  };
  var getManifestDataValue = function getManifestDataValue(object, property, returnFirstVal, version, i18n) {
    var val = object[property];
    if (version === 2) {
      if (Array.isArray(val) && returnFirstVal) val = val[0];
    } else if (version === 3) {
      if (i18n) val = val[i18n];
      if (Array.isArray(val) && returnFirstVal) val = val[0];
    }
    return val;
  };
  var getCanvases = function getCanvases(manifestData) {
    var canvases = [];
    var version = getVersion(manifestData);
    if (version === 3) {
      var sequences = manifestData ? manifestData.items : [];
      sequences.forEach(function (canvas) {
        var _canvas$items, _canvas$items2;
        canvas.label = canvas.label["en"][0];
        canvas.id = getCanvasService(canvas);
        canvas.text = canvas.label;
        if (_typeof(canvas.thumbnail) === 'object') canvas.thumbnail = canvas.thumbnail[0]["id"];else if ((_canvas$items = canvas.items) !== null && _canvas$items !== void 0 && (_canvas$items = _canvas$items[0]) !== null && _canvas$items !== void 0 && (_canvas$items = _canvas$items.items) !== null && _canvas$items !== void 0 && (_canvas$items = _canvas$items[0]) !== null && _canvas$items !== void 0 && (_canvas$items = _canvas$items.body) !== null && _canvas$items !== void 0 && _canvas$items.id) canvas.thumbnail = (_canvas$items2 = canvas.items) === null || _canvas$items2 === void 0 || (_canvas$items2 = _canvas$items2[0]) === null || _canvas$items2 === void 0 || (_canvas$items2 = _canvas$items2.items) === null || _canvas$items2 === void 0 || (_canvas$items2 = _canvas$items2[0]) === null || _canvas$items2 === void 0 || (_canvas$items2 = _canvas$items2.body) === null || _canvas$items2 === void 0 ? void 0 : _canvas$items2.id;
        canvases.push(canvas);
      });
    } else if (version === 2) {
      var _sequences = manifestData ? manifestData.sequences : [];
      _sequences.forEach(function (sequence) {
        if (sequence.canvases) {
          sequence.label = getManifestDataValue(sequence, 'label', true);
          sequence.canvases.forEach(function (canvas) {
            canvas.label = getManifestDataValue(canvas, 'label', true);
            if (_typeof(canvas.thumbnail) === 'object') canvas.thumbnail = canvas.thumbnail["@id"];else if (canvas.images && canvas.images[0] && canvas.images[0].resource) canvas.thumbnail = canvas.images[0].resource["@id"];
            canvas.id = getCanvasService(canvas);
            canvas.text = canvas.label;
            canvases.push(canvas);
          });
        }
      });
    }
    ;
    return canvases;
  };
  var getCanvas = function getCanvas(manifestData, canvasId, updateCanvas) {
    var version = getVersion(manifestData);
    if (version === 3) {
      if (manifestData.items.length > 0) {
        var canvases = manifestData.items;
        var canvasIndex = 0;
        if (!updateCanvas) {
          canvasIndex = canvases.findIndex(function (c) {
            return getCanvasService(c) === canvasId;
          });
        }
        return canvases[canvasIndex];
      }
    } else if (version === 2) {
      if (manifestData.sequences.length > 0) {
        var sequence = manifestData.sequences[0];
        var _canvasIndex = 0;
        if (sequence.canvases.length > 0) {
          if (!updateCanvas) {
            _canvasIndex = sequence.canvases.findIndex(function (c) {
              return getCanvasService(c) === canvasId;
            });
          }
          return sequence.canvases[_canvasIndex];
        }
      }
    }
  };
  var getManifestThumbnail = function getManifestThumbnail(manifest) {
    if (manifest.sequences) {
      var thumbnail = manifest.sequences[0].canvases[0].thumbnail;
      if (_typeof(thumbnail) === 'object') {
        return thumbnail["@id"];
      }
      return thumbnail;
    } else {
      var _thumbnail = manifest.items[0].thumbnail;
      if (_typeof(_thumbnail) === 'object') {
        return _thumbnail[0].id;
      }
      return _thumbnail;
    }
  };
  var getManifestLabel = function getManifestLabel(manifest) {
    var label = manifest === null || manifest === void 0 ? void 0 : manifest.label;
    if (_typeof(label) === 'object') {
      var _manifest$label;
      return (_manifest$label = manifest.label) === null || _manifest$label === void 0 || (_manifest$label = _manifest$label["en"]) === null || _manifest$label === void 0 ? void 0 : _manifest$label[0];
    } else {
      return label;
    }
  };
  var getManifestId = function getManifestId(manifest) {
    return (manifest === null || manifest === void 0 ? void 0 : manifest['@id']) || (manifest === null || manifest === void 0 ? void 0 : manifest['id']);
  };
  var getCanvasLabel = function getCanvasLabel(canvas) {
    var label = canvas.label;
    if (_typeof(label) === 'object') {
      var _canvas$label;
      return (_canvas$label = canvas.label) === null || _canvas$label === void 0 || (_canvas$label = _canvas$label["en"]) === null || _canvas$label === void 0 ? void 0 : _canvas$label[0];
    } else {
      return label;
    }
  };
  var getCanvasService = function getCanvasService(canvas) {
    if (canvas.images) {
      return canvas.images[0].resource.service['@id'];
    } else if (canvas.items) {
      return canvas.items[0].items[0].body[0].service[0]["@id"];
    }
    ;
  };
  var getMetadata = function getMetadata(manifestData) {
    var version = getVersion(manifestData);
    if (version === 2) {
      return manifestData.metadata;
    } else if (version === 3) {
      return manifestData.metadata.map(function (data) {
        var value = {};
        Object.entries(data).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];
          value[k] = v['en'][0];
        });
        return value;
      });
    }
    ;
  };
  var getInitialCanvas = function getInitialCanvas(manifestData) {
    var version = getVersion(manifestData);
    if (version === 2) {
      return manifestData.sequences[0].canvases[0];
    } else if (version === 3) {
      return manifestData.items[0];
    }
  };
  return {
    getVersion: getVersion,
    getManifestDataValue: getManifestDataValue,
    getManifestLabel: getManifestLabel,
    getManifestId: getManifestId,
    getManifestThumbnail: getManifestThumbnail,
    getCanvases: getCanvases,
    getCanvas: getCanvas,
    getCanvasLabel: getCanvasLabel,
    getCanvasService: getCanvasService,
    getMetadata: getMetadata,
    getInitialCanvas: getInitialCanvas
  };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDO1FBQ0YsT0FBT1AsS0FBSztNQUNoQixDQUFDLENBQUM7SUFDTjtJQUFDO0VBQ0wsQ0FBQztFQUNELElBQU1RLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUkvRCxZQUFZLEVBQUs7SUFDdkMsSUFBTVksT0FBTyxHQUFHYixVQUFVLENBQUNDLFlBQVksQ0FBQztJQUN4QyxJQUFJWSxPQUFPLEtBQUssQ0FBQyxFQUFFO01BQ2YsT0FBT1osWUFBWSxDQUFDbUIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDRCxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUMsTUFBTSxJQUFJTixPQUFPLEtBQUssQ0FBQyxFQUFFO01BQ3RCLE9BQU9aLFlBQVksQ0FBQ29CLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEM7RUFDSixDQUFDO0VBSUQsT0FBTztJQUNIckIsVUFBVSxFQUFWQSxVQUFVO0lBQ1ZTLG9CQUFvQixFQUFwQkEsb0JBQW9CO0lBQ3BCcUMsZ0JBQWdCLEVBQWhCQSxnQkFBZ0I7SUFDaEJFLGFBQWEsRUFBYkEsYUFBYTtJQUNiSixvQkFBb0IsRUFBcEJBLG9CQUFvQjtJQUNwQjFCLFdBQVcsRUFBWEEsV0FBVztJQUNYbUIsU0FBUyxFQUFUQSxTQUFTO0lBQ1RZLGNBQWMsRUFBZEEsY0FBYztJQUNkckIsZ0JBQWdCLEVBQWhCQSxnQkFBZ0I7SUFDaEJ3QixXQUFXLEVBQVhBLFdBQVc7SUFDWFksZ0JBQWdCLEVBQWhCQTtFQUNKLENBQUM7QUFDTCxDQUFDO0FBQUEsa0dBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9hcmNoZXNfc2xvY2FsL21lZGlhL2pzL3V0aWxzL2lpaWYtdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBnZXRWZXJzaW9uID0gKG1hbmlmZXN0RGF0YSkgPT4ge1xuICAgICAgICBjb25zdCB1cmxTdHJpbmcgPSBtYW5pZmVzdERhdGE/LlsnQGNvbnRleHQnXTtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh1cmxTdHJpbmcpO1xuICAgICAgICBpZiAodXJsLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVszXS5zdGFydHNXaXRoKFwiM1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIH0gZWxzZSBpZiAodXJsLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVszXS5zdGFydHNXaXRoKFwiMlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gaWRlbnRpZnkgdmVyc2lvbiBvZiBJSUlGIHByZXNlbnRhdGlvbiBhcGkuXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRNYW5pZmVzdERhdGFWYWx1ZSA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHJldHVybkZpcnN0VmFsLCB2ZXJzaW9uLCBpMThuKSB7XG4gICAgICAgIGxldCB2YWwgPSBvYmplY3RbcHJvcGVydHldO1xuICAgICAgICBpZiAodmVyc2lvbiA9PT0gMikge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSAmJiByZXR1cm5GaXJzdFZhbCkgdmFsID0gdmFsWzBdO1xuICAgICAgICB9IGVsc2UgaWYgKHZlcnNpb24gPT09IDMpIHtcbiAgICAgICAgICAgIGlmIChpMThuKSB2YWwgPSB2YWxbaTE4bl07XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpICYmIHJldHVybkZpcnN0VmFsKSB2YWwgPSB2YWxbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9O1xuICAgIGNvbnN0IGdldENhbnZhc2VzID0gKG1hbmlmZXN0RGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBjYW52YXNlcyA9IFtdO1xuICAgICAgICBjb25zdCB2ZXJzaW9uID0gZ2V0VmVyc2lvbihtYW5pZmVzdERhdGEpO1xuICAgICAgICBpZiAodmVyc2lvbiA9PT0gMykge1xuICAgICAgICAgICAgY29uc3Qgc2VxdWVuY2VzID0gbWFuaWZlc3REYXRhID8gbWFuaWZlc3REYXRhLml0ZW1zIDogW107XG4gICAgICAgICAgICBzZXF1ZW5jZXMuZm9yRWFjaChmdW5jdGlvbihjYW52YXMpIHtcbiAgICAgICAgICAgICAgICBjYW52YXMubGFiZWwgPSBjYW52YXMubGFiZWxbXCJlblwiXVswXTtcbiAgICAgICAgICAgICAgICBjYW52YXMuaWQgPSBnZXRDYW52YXNTZXJ2aWNlKGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgY2FudmFzLnRleHQgPSBjYW52YXMubGFiZWw7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYW52YXMudGh1bWJuYWlsID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLnRodW1ibmFpbCA9IGNhbnZhcy50aHVtYm5haWxbMF1bXCJpZFwiXTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjYW52YXMuaXRlbXM/LlswXT8uaXRlbXM/LlswXT8uYm9keT8uaWQpXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy50aHVtYm5haWwgPSBjYW52YXMuaXRlbXM/LlswXT8uaXRlbXM/LlswXT8uYm9keT8uaWQ7XG4gICAgICAgICAgICAgICAgY2FudmFzZXMucHVzaChjYW52YXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmVyc2lvbiA9PT0gMikge1xuICAgICAgICAgICAgY29uc3Qgc2VxdWVuY2VzID0gbWFuaWZlc3REYXRhID8gbWFuaWZlc3REYXRhLnNlcXVlbmNlcyA6IFtdO1xuICAgICAgICAgICAgc2VxdWVuY2VzLmZvckVhY2goZnVuY3Rpb24oc2VxdWVuY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VxdWVuY2UuY2FudmFzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UubGFiZWwgPSBnZXRNYW5pZmVzdERhdGFWYWx1ZShzZXF1ZW5jZSwgJ2xhYmVsJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlLmNhbnZhc2VzLmZvckVhY2goZnVuY3Rpb24oY2FudmFzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMubGFiZWwgPSBnZXRNYW5pZmVzdERhdGFWYWx1ZShjYW52YXMsICdsYWJlbCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYW52YXMudGh1bWJuYWlsID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMudGh1bWJuYWlsID0gY2FudmFzLnRodW1ibmFpbFtcIkBpZFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNhbnZhcy5pbWFnZXMgJiYgY2FudmFzLmltYWdlc1swXSAmJiBjYW52YXMuaW1hZ2VzWzBdLnJlc291cmNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy50aHVtYm5haWwgPSBjYW52YXMuaW1hZ2VzWzBdLnJlc291cmNlW1wiQGlkXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmlkID0gZ2V0Q2FudmFzU2VydmljZShjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLnRleHQgPSBjYW52YXMubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNlcy5wdXNoKGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY2FudmFzZXM7XG4gICAgfTtcbiAgICBjb25zdCBnZXRDYW52YXMgPSAobWFuaWZlc3REYXRhLCBjYW52YXNJZCwgdXBkYXRlQ2FudmFzKSA9PiB7XG4gICAgICAgIGNvbnN0IHZlcnNpb24gPSBnZXRWZXJzaW9uKG1hbmlmZXN0RGF0YSk7XG4gICAgICAgIGlmICh2ZXJzaW9uID09PSAzKSB7XG4gICAgICAgICAgICBpZiAobWFuaWZlc3REYXRhLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYW52YXNlcyA9IG1hbmlmZXN0RGF0YS5pdGVtcztcbiAgICAgICAgICAgICAgICBsZXQgY2FudmFzSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGlmICghdXBkYXRlQ2FudmFzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc0luZGV4ID0gY2FudmFzZXMuZmluZEluZGV4KChjKSA9PiAoZ2V0Q2FudmFzU2VydmljZShjKSA9PT0gY2FudmFzSWQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbnZhc2VzW2NhbnZhc0luZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2ZXJzaW9uID09PSAyKSB7XG4gICAgICAgICAgICBpZiAobWFuaWZlc3REYXRhLnNlcXVlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VxdWVuY2UgPSBtYW5pZmVzdERhdGEuc2VxdWVuY2VzWzBdO1xuICAgICAgICAgICAgICAgIGxldCBjYW52YXNJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHNlcXVlbmNlLmNhbnZhc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1cGRhdGVDYW52YXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0luZGV4ID0gc2VxdWVuY2UuY2FudmFzZXMuZmluZEluZGV4KChjKSA9PiAoZ2V0Q2FudmFzU2VydmljZShjKSA9PT0gY2FudmFzSWQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VxdWVuY2UuY2FudmFzZXNbY2FudmFzSW5kZXhdO1xuICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdldE1hbmlmZXN0VGh1bWJuYWlsID0gKG1hbmlmZXN0KSA9PiB7XG4gICAgICAgIGlmIChtYW5pZmVzdC5zZXF1ZW5jZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRodW1ibmFpbCA9IG1hbmlmZXN0LnNlcXVlbmNlc1swXS5jYW52YXNlc1swXS50aHVtYm5haWw7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRodW1ibmFpbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGh1bWJuYWlsW1wiQGlkXCJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRodW1ibmFpbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHRodW1ibmFpbCA9IG1hbmlmZXN0Lml0ZW1zWzBdLnRodW1ibmFpbDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGh1bWJuYWlsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aHVtYm5haWxbMF0uaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGh1bWJuYWlsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRNYW5pZmVzdExhYmVsID0gKG1hbmlmZXN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gbWFuaWZlc3Q/LmxhYmVsO1xuICAgICAgICBpZiAodHlwZW9mIGxhYmVsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIG1hbmlmZXN0LmxhYmVsPy5bXCJlblwiXT8uWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRNYW5pZmVzdElkID0gKG1hbmlmZXN0KSA9PiB7XG4gICAgICAgIHJldHVybiBtYW5pZmVzdD8uWydAaWQnXSB8fCBtYW5pZmVzdD8uWydpZCddO1xuICAgIH07XG4gICAgY29uc3QgZ2V0Q2FudmFzTGFiZWwgPSAoY2FudmFzKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gY2FudmFzLmxhYmVsO1xuICAgICAgICBpZiAodHlwZW9mIGxhYmVsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbnZhcy5sYWJlbD8uW1wiZW5cIl0/LlswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsYWJlbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ2V0Q2FudmFzU2VydmljZSA9IChjYW52YXMpID0+IHtcbiAgICAgICAgaWYgKGNhbnZhcy5pbWFnZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW52YXMuaW1hZ2VzWzBdLnJlc291cmNlLnNlcnZpY2VbJ0BpZCddO1xuICAgICAgICB9IGVsc2UgaWYgKGNhbnZhcy5pdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbnZhcy5pdGVtc1swXS5pdGVtc1swXS5ib2R5WzBdLnNlcnZpY2VbMF1bXCJAaWRcIl07XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBjb25zdCBnZXRNZXRhZGF0YSA9IChtYW5pZmVzdERhdGEpID0+IHtcbiAgICAgICAgY29uc3QgdmVyc2lvbiA9IGdldFZlcnNpb24obWFuaWZlc3REYXRhKTtcbiAgICAgICAgaWYgKHZlcnNpb24gPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBtYW5pZmVzdERhdGEubWV0YWRhdGE7XG4gICAgICAgIH0gZWxzZSBpZiAodmVyc2lvbiA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIG1hbmlmZXN0RGF0YS5tZXRhZGF0YS5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHt9O1xuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IHZbJ2VuJ11bMF07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBjb25zdCBnZXRJbml0aWFsQ2FudmFzID0gKG1hbmlmZXN0RGF0YSkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJzaW9uID0gZ2V0VmVyc2lvbihtYW5pZmVzdERhdGEpO1xuICAgICAgICBpZiAodmVyc2lvbiA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIG1hbmlmZXN0RGF0YS5zZXF1ZW5jZXNbMF0uY2FudmFzZXNbMF07XG4gICAgICAgIH0gZWxzZSBpZiAodmVyc2lvbiA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIG1hbmlmZXN0RGF0YS5pdGVtc1swXTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VmVyc2lvbixcbiAgICAgICAgZ2V0TWFuaWZlc3REYXRhVmFsdWUsXG4gICAgICAgIGdldE1hbmlmZXN0TGFiZWwsXG4gICAgICAgIGdldE1hbmlmZXN0SWQsXG4gICAgICAgIGdldE1hbmlmZXN0VGh1bWJuYWlsLFxuICAgICAgICBnZXRDYW52YXNlcyxcbiAgICAgICAgZ2V0Q2FudmFzLFxuICAgICAgICBnZXRDYW52YXNMYWJlbCxcbiAgICAgICAgZ2V0Q2FudmFzU2VydmljZSxcbiAgICAgICAgZ2V0TWV0YWRhdGEsXG4gICAgICAgIGdldEluaXRpYWxDYW52YXMsXG4gICAgfTtcbn0pO1xuIl0sIm5hbWVzIjpbImRlZmluZSIsImdldFZlcnNpb24iLCJtYW5pZmVzdERhdGEiLCJ1cmxTdHJpbmciLCJ1cmwiLCJVUkwiLCJwYXRobmFtZSIsInNwbGl0Iiwic3RhcnRzV2l0aCIsIkVycm9yIiwiZ2V0TWFuaWZlc3REYXRhVmFsdWUiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInJldHVybkZpcnN0VmFsIiwidmVyc2lvbiIsImkxOG4iLCJ2YWwiLCJBcnJheSIsImlzQXJyYXkiLCJnZXRDYW52YXNlcyIsImNhbnZhc2VzIiwic2VxdWVuY2VzIiwiaXRlbXMiLCJmb3JFYWNoIiwiY2FudmFzIiwiX2NhbnZhcyRpdGVtcyIsIl9jYW52YXMkaXRlbXMyIiwibGFiZWwiLCJpZCIsImdldENhbnZhc1NlcnZpY2UiLCJ0ZXh0IiwiX3R5cGVvZiIsInRodW1ibmFpbCIsImJvZHkiLCJwdXNoIiwic2VxdWVuY2UiLCJpbWFnZXMiLCJyZXNvdXJjZSIsImdldENhbnZhcyIsImNhbnZhc0lkIiwidXBkYXRlQ2FudmFzIiwibGVuZ3RoIiwiY2FudmFzSW5kZXgiLCJmaW5kSW5kZXgiLCJjIiwiZ2V0TWFuaWZlc3RUaHVtYm5haWwiLCJtYW5pZmVzdCIsImdldE1hbmlmZXN0TGFiZWwiLCJfbWFuaWZlc3QkbGFiZWwiLCJnZXRNYW5pZmVzdElkIiwiZ2V0Q2FudmFzTGFiZWwiLCJfY2FudmFzJGxhYmVsIiwic2VydmljZSIsImdldE1ldGFkYXRhIiwibWV0YWRhdGEiLCJtYXAiLCJkYXRhIiwidmFsdWUiLCJPYmplY3QiLCJlbnRyaWVzIiwiX3JlZiIsIl9yZWYyIiwiX3NsaWNlZFRvQXJyYXkiLCJrIiwidiIsImdldEluaXRpYWxDYW52YXMiXSwic291cmNlUm9vdCI6IiJ9