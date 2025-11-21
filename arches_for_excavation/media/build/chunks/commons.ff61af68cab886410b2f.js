(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[61485],{

/***/ 34031:
/*!**********************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/plugins/leaflet-side-by-side/index.js ***!
  \**********************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! leaflet */ 53214)], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  (function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = undefined;
            if (!f && c) return require(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = undefined, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  })()({
    1: [function (require, module, exports) {
      (function (global) {
        var L = typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null;
        require('./layout.css');
        require('./range.css');
        var mapWasDragEnabled;
        var mapWasTapEnabled;

        // Leaflet v0.7 backwards compatibility
        function on(el, types, fn, context) {
          types.split(' ').forEach(function (type) {
            L.DomEvent.on(el, type, fn, context);
          });
        }

        // Leaflet v0.7 backwards compatibility
        function off(el, types, fn, context) {
          types.split(' ').forEach(function (type) {
            L.DomEvent.off(el, type, fn, context);
          });
        }
        function getRangeEvent(rangeInput) {
          return 'oninput' in rangeInput ? 'input' : 'change';
        }
        function cancelMapDrag() {
          mapWasDragEnabled = this._map.dragging.enabled();
          mapWasTapEnabled = this._map.tap && this._map.tap.enabled();
          this._map.dragging.disable();
          this._map.tap && this._map.tap.disable();
        }
        function uncancelMapDrag(e) {
          this._refocusOnMap(e);
          if (mapWasDragEnabled) {
            this._map.dragging.enable();
          }
          if (mapWasTapEnabled) {
            this._map.tap.enable();
          }
        }

        // convert arg to an array - returns empty array if arg is undefined
        function asArray(arg) {
          return arg === 'undefined' ? [] : Array.isArray(arg) ? arg : [arg];
        }
        function noop() {}
        L.Control.SideBySide = L.Control.extend({
          options: {
            thumbSize: 42,
            padding: 0
          },
          initialize: function initialize(leftLayers, rightLayers, options) {
            this.setLeftLayers(leftLayers);
            this.setRightLayers(rightLayers);
            L.setOptions(this, options);
          },
          getPosition: function getPosition() {
            var rangeValue = this._range.value;
            var offset = (0.5 - rangeValue) * (2 * this.options.padding + this.options.thumbSize);
            return this._map.getSize().x * rangeValue + offset;
          },
          setPosition: noop,
          includes: L.Evented.prototype || L.Mixin.Events,
          addTo: function addTo(map) {
            this.remove();
            this._map = map;
            var container = this._container = L.DomUtil.create('div', 'leaflet-sbs', map._controlContainer);
            this._divider = L.DomUtil.create('div', 'leaflet-sbs-divider', container);
            var range = this._range = L.DomUtil.create('input', 'leaflet-sbs-range', container);
            range.type = 'range';
            range.min = 0;
            range.max = 1;
            range.step = 'any';
            range.value = 0.5;
            range.style.paddingLeft = range.style.paddingRight = this.options.padding + 'px';
            this._addEvents();
            this._updateLayers();
            return this;
          },
          remove: function remove() {
            if (!this._map) {
              return this;
            }
            if (this._leftLayer) {
              var container = this._leftLayer.getContainer();
              if (container !== null && container !== void 0 && container.style) {
                container.style.clip = '';
              }
            }
            if (this._rightLayer) {
              var _container = this._rightLayer.getContainer();
              if (_container !== null && _container !== void 0 && _container.style) {
                _container.style.clip = '';
              }
            }
            this._removeEvents();
            L.DomUtil.remove(this._container);
            this._map = null;
            return this;
          },
          setLeftLayers: function setLeftLayers(leftLayers) {
            this._leftLayers = asArray(leftLayers);
            this._updateLayers();
            return this;
          },
          setRightLayers: function setRightLayers(rightLayers) {
            this._rightLayers = asArray(rightLayers);
            this._updateLayers();
            return this;
          },
          _updateClip: function _updateClip() {
            var map = this._map;
            var nw = map.containerPointToLayerPoint([0, 0]);
            var se = map.containerPointToLayerPoint(map.getSize());
            var clipX = nw.x + this.getPosition();
            var dividerX = this.getPosition();
            this._divider.style.left = dividerX + 'px';
            this.fire('dividermove', {
              x: dividerX
            });
            var clipLeft = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
            var clipRight = 'rect(' + [nw.y, se.x, se.y, clipX].join('px,') + 'px)';
            if (this._leftLayer) {
              var container = this._leftLayer.getContainer();
              if (container !== null && container !== void 0 && container.style) {
                container.style.clip = clipLeft;
              }
            }
            if (this._rightLayer) {
              var _container2 = this._rightLayer.getContainer();
              if (_container2 !== null && _container2 !== void 0 && _container2.style) {
                _container2.style.clip = clipRight;
              }
            }
          },
          _updateLayers: function _updateLayers() {
            if (!this._map) {
              return this;
            }
            var prevLeft = this._leftLayer;
            var prevRight = this._rightLayer;
            this._leftLayer = this._rightLayer = null;
            this._leftLayers.forEach(function (layer) {
              if (this._map.hasLayer(layer)) {
                this._leftLayer = layer;
              }
            }, this);
            this._rightLayers.forEach(function (layer) {
              if (this._map.hasLayer(layer)) {
                this._rightLayer = layer;
              }
            }, this);
            if (prevLeft !== this._leftLayer) {
              prevLeft && this.fire('leftlayerremove', {
                layer: prevLeft
              });
              this._leftLayer && this.fire('leftlayeradd', {
                layer: this._leftLayer
              });
            }
            if (prevRight !== this._rightLayer) {
              prevRight && this.fire('rightlayerremove', {
                layer: prevRight
              });
              this._rightLayer && this.fire('rightlayeradd', {
                layer: this._rightLayer
              });
            }
            this._updateClip();
          },
          _addEvents: function _addEvents() {
            var range = this._range;
            var map = this._map;
            if (!map || !range) return;
            map.on('move', this._updateClip, this);
            map.on('layeradd layerremove', this._updateLayers, this);
            on(range, getRangeEvent(range), this._updateClip, this);
            on(range, L.Browser.touch ? 'touchstart' : 'mousedown', cancelMapDrag, this);
            on(range, L.Browser.touch ? 'touchend' : 'mouseup', uncancelMapDrag, this);
          },
          _removeEvents: function _removeEvents() {
            var range = this._range;
            var map = this._map;
            if (range) {
              off(range, getRangeEvent(range), this._updateClip, this);
              off(range, L.Browser.touch ? 'touchstart' : 'mousedown', cancelMapDrag, this);
              off(range, L.Browser.touch ? 'touchend' : 'mouseup', uncancelMapDrag, this);
            }
            if (map) {
              map.off('layeradd layerremove', this._updateLayers, this);
              map.off('move', this._updateClip, this);
            }
          }
        });
        L.control.sideBySide = function (leftLayers, rightLayers, options) {
          return new L.Control.SideBySide(leftLayers, rightLayers, options);
        };
        module.exports = L.Control.SideBySide;
      }).call(this, typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./layout.css": 2,
      "./range.css": 4
    }],
    2: [function (require, module, exports) {
      var inject = require('./node_modules/cssify');
      var css = ".leaflet-sbs-range {\r\n    position: absolute;\r\n    top: 50%;\r\n    width: 100%;\r\n    z-index: 999;\r\n}\r\n.leaflet-sbs-divider {\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 50%;\r\n    margin-left: -2px;\r\n    width: 4px;\r\n    background-color: #fff;\r\n    pointer-events: none;\r\n    z-index: 999;\r\n}\r\n";
      inject(css, undefined, '_i6aomd');
      module.exports = css;
    }, {
      "./node_modules/cssify": 3
    }],
    3: [function (require, module, exports) {
      'use strict';

      function injectStyleTag(document, fileName, cb) {
        var style = document.getElementById(fileName);
        if (style) {
          cb(style);
        } else {
          var head = document.getElementsByTagName('head')[0];
          style = document.createElement('style');
          if (fileName != null) style.id = fileName;
          cb(style);
          head.appendChild(style);
        }
        return style;
      }
      module.exports = function (css, customDocument, fileName) {
        var doc = customDocument || document;
        /* istanbul ignore if: not supported by Electron */
        if (doc.createStyleSheet) {
          var sheet = doc.createStyleSheet();
          sheet.cssText = css;
          return sheet.ownerNode;
        } else {
          return injectStyleTag(doc, fileName, function (style) {
            /* istanbul ignore if: not supported by Electron */
            if (style.styleSheet) {
              style.styleSheet.cssText = css;
            } else {
              style.innerHTML = css;
            }
          });
        }
      };
      module.exports.byUrl = function (url) {
        /* istanbul ignore if: not supported by Electron */
        if (document.createStyleSheet) {
          return document.createStyleSheet(url).ownerNode;
        } else {
          var head = document.getElementsByTagName('head')[0];
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = url;
          head.appendChild(link);
          return link;
        }
      };
    }, {}],
    4: [function (require, module, exports) {
      var inject = require('./node_modules/cssify');
      var css = ".leaflet-sbs-range {\r\n    -webkit-appearance: none;\r\n    display: inline-block!important;\r\n    vertical-align: middle;\r\n    height: 0;\r\n    padding: 0;\r\n    margin: 0;\r\n    border: 0;\r\n    background: rgba(0, 0, 0, 0.25);\r\n    min-width: 100px;\r\n    cursor: pointer;\r\n    pointer-events: none;\r\n    z-index: 999;\r\n}\r\n.leaflet-sbs-range::-ms-fill-upper {\r\n    background: transparent;\r\n}\r\n.leaflet-sbs-range::-ms-fill-lower {\r\n    background: rgba(255, 255, 255, 0.25);\r\n}\r\n/* Browser thingies */\r\n\r\n.leaflet-sbs-range::-moz-range-track {\r\n    opacity: 0;\r\n}\r\n.leaflet-sbs-range::-ms-track {\r\n    opacity: 0;\r\n}\r\n.leaflet-sbs-range::-ms-tooltip {\r\n    display: none;\r\n}\r\n/* For whatever reason, these need to be defined\r\n * on their own so dont group them */\r\n\r\n.leaflet-sbs-range::-webkit-slider-thumb {\r\n    -webkit-appearance: none;\r\n    margin: 0;\r\n    padding: 0;\r\n    background: #fff;\r\n    height: 40px;\r\n    width: 40px;\r\n    border-radius: 20px;\r\n    cursor: ew-resize;\r\n    pointer-events: auto;\r\n    border: 1px solid #ddd;\r\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABlBMVEV9fX3///+Kct39AAAAAnRSTlP/AOW3MEoAAAA9SURBVFjD7dehDQAwDANBZ/+l2wmKoiqR7pHRcaeaCxAIBAL/g7k9JxAIBAKBQCAQCAQC14H+MhAIBE4CD3fOFvGVBzhZAAAAAElFTkSuQmCC\");\r\n    background-position: 50% 50%;\r\n    background-repeat: no-repeat;\r\n    background-size: 40px 40px;\r\n}\r\n.leaflet-sbs-range::-ms-thumb {\r\n    margin: 0;\r\n    padding: 0;\r\n    background: #fff;\r\n    height: 40px;\r\n    width: 40px;\r\n    border-radius: 20px;\r\n    cursor: ew-resize;\r\n    pointer-events: auto;\r\n    border: 1px solid #ddd;\r\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABlBMVEV9fX3///+Kct39AAAAAnRSTlP/AOW3MEoAAAA9SURBVFjD7dehDQAwDANBZ/+l2wmKoiqR7pHRcaeaCxAIBAL/g7k9JxAIBAKBQCAQCAQC14H+MhAIBE4CD3fOFvGVBzhZAAAAAElFTkSuQmCC\");\r\n    background-position: 50% 50%;\r\n    background-repeat: no-repeat;\r\n    background-size: 40px 40px;\r\n}\r\n.leaflet-sbs-range::-moz-range-thumb {\r\n    padding: 0;\r\n    right: 0    ;\r\n    background: #fff;\r\n    height: 40px;\r\n    width: 40px;\r\n    border-radius: 20px;\r\n    cursor: ew-resize;\r\n    pointer-events: auto;\r\n    border: 1px solid #ddd;\r\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABlBMVEV9fX3///+Kct39AAAAAnRSTlP/AOW3MEoAAAA9SURBVFjD7dehDQAwDANBZ/+l2wmKoiqR7pHRcaeaCxAIBAL/g7k9JxAIBAKBQCAQCAQC14H+MhAIBE4CD3fOFvGVBzhZAAAAAElFTkSuQmCC\");\r\n    background-position: 50% 50%;\r\n    background-repeat: no-repeat;\r\n    background-size: 40px 40px;\r\n}\r\n.leaflet-sbs-range:disabled::-moz-range-thumb {\r\n    cursor: default;\r\n}\r\n.leaflet-sbs-range:disabled::-ms-thumb {\r\n    cursor: default;\r\n}\r\n.leaflet-sbs-range:disabled::-webkit-slider-thumb {\r\n    cursor: default;\r\n}\r\n.leaflet-sbs-range:disabled {\r\n    cursor: default;\r\n}\r\n.leaflet-sbs-range:focus {\r\n    outline: none!important;\r\n}\r\n.leaflet-sbs-range::-moz-focus-outer {\r\n    border: 0;\r\n}\r\n\r\n";
      inject(css, undefined, '_1tlt668');
      module.exports = css;
    }, {
      "./node_modules/cssify": 3
    }]
  }, {}, [1]);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 61485:
/*!*******************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/iiif-viewer.js + 2 modules ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ iiif_viewer)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.min.js
var jquery_min = __webpack_require__(33270);
var jquery_min_default = /*#__PURE__*/__webpack_require__.n(jquery_min);
// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
var knockout_mapping_min_default = /*#__PURE__*/__webpack_require__.n(knockout_mapping_min);
// EXTERNAL MODULE: ./node_modules/leaflet/dist/leaflet.js
var leaflet = __webpack_require__(53214);
var leaflet_default = /*#__PURE__*/__webpack_require__.n(leaflet);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/workbench.js + 1 modules
var workbench = __webpack_require__(90141);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/iiif-popup.htm
const iiif_popup_namespaceObject = "templates/views/components/iiif-popup.htm";
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/iiif-viewer.htm
const iiif_viewer_namespaceObject = "templates/views/components/iiif-viewer.htm";
// EXTERNAL MODULE: ./node_modules/select-woo/src/js/select2/utils.js
var utils = __webpack_require__(43060);
var utils_default = /*#__PURE__*/__webpack_require__.n(utils);
// EXTERNAL MODULE: ./node_modules/select-woo/src/js/select2/data/array.js
var array = __webpack_require__(28027);
var array_default = /*#__PURE__*/__webpack_require__.n(array);
// EXTERNAL MODULE: ./node_modules/leaflet-iiif/leaflet-iiif.js
var leaflet_iiif = __webpack_require__(15287);
// EXTERNAL MODULE: ./node_modules/leaflet.fullscreen/Control.FullScreen.js
var Control_FullScreen = __webpack_require__(29401);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/plugins/leaflet-side-by-side/index.js
var leaflet_side_by_side = __webpack_require__(34031);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/select2-query.js
var select2_query = __webpack_require__(28192);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/leaflet.js
var bindings_leaflet = __webpack_require__(70266);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/iiif-viewer.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }















var IIIFViewerViewmodel = function IIIFViewerViewmodel(params) {
  var _this = this;
  var self = this;
  var abortFetchManifest;
  this.getManifestDataValue = function (object, property, returnFirstVal) {
    var val = object[property];
    if (Array.isArray(val) && returnFirstVal) val = object[property][0]["@value"];
    return val;
  };
  this.map = knockout_latest_default().observable();
  this.manifest = knockout_latest_default().observable(params.manifest);
  this.editManifest = knockout_latest_default().observable(!params.manifest);
  this.canvas = knockout_latest_default().observable(params.canvas);
  this.manifestLoading = knockout_latest_default().observable();
  this.filter = knockout_latest_default().observable('');
  this.manifestData = knockout_latest_default().observable();
  this.manifestError = knockout_latest_default().observable();
  this.manifestName = knockout_latest_default().observable();
  this.manifestDescription = knockout_latest_default().observable();
  this.manifestAttribution = knockout_latest_default().observable();
  this.manifestLogo = knockout_latest_default().observable();
  this.manifestMetadata = knockout_mapping_min_default().fromJS([]);
  this.canvasLabel = knockout_latest_default().observable();
  this.zoomToCanvas = !(params.zoom && params.center);
  this.annotationNodes = knockout_latest_default().observableArray();
  this.annotationCounts = knockout_latest_default().observable({});
  this.compareMode = knockout_latest_default().observable(false);
  this.primaryCanvas = knockout_latest_default().observable();
  this.canvasObject = knockout_latest_default().observable();
  this.secondaryCanvasObject = knockout_latest_default().observable();
  this.secondaryCanvas = knockout_latest_default().observable();
  this.compareInstruction = knockout_latest_default().observable();
  this.primaryTilesLoaded = knockout_latest_default().observable(false);
  this.secondaryTilesLoaded = knockout_latest_default().observable(false);
  this.selectPrimaryPanel = knockout_latest_default().observable(true);
  this.secondaryLabel = knockout_latest_default().observable();
  this.imageToolSelector = knockout_latest_default().observable(this.canvas());
  this.floatingLocation = knockout_latest_default().observable("left");
  this.showImageModifiers = knockout_latest_default().observable(false);
  this.renderContext = knockout_latest_default().observable(params.renderContext);
  this.showModeSelector = knockout_latest_default().observable(true);
  this.primaryLayerLoaded = true;
  this.secondaryLayerLoaded = true;
  var primaryPanelFilters;
  var secondaryPanelFilters;
  var layers = [];
  var secondaryLayers = [];
  var cachedAnnotations = {};
  this.origCanvasLabel = knockout_latest_default().observable();
  this.selectPrimaryPanel.subscribe(function (value) {
    // if true, primary panel is being selected
    if (value) {
      _this.imageToolSelector(_this.canvas());
      self.origCanvasLabel(self.canvasObject().label);
      self.canvasLabel(self.canvasObject().label);
      // preserve state of secondary filters, if secondaryCanvas is set
      if (self.secondaryCanvas()) {
        secondaryPanelFilters = self.canvasFilterObject();
        if (primaryPanelFilters) {
          self.brightness(primaryPanelFilters.brightness);
          self.saturation(primaryPanelFilters.saturation);
          self.contrast(primaryPanelFilters.contrast);
          self.greyscale(primaryPanelFilters.greyscale);
        }
      }
    } else {
      var _self$secondaryCanvas, _self$secondaryCanvas2;
      _this.imageToolSelector(_this.secondaryCanvas());
      primaryPanelFilters = self.canvasFilterObject();
      self.origCanvasLabel((_self$secondaryCanvas = self.secondaryCanvasObject()) === null || _self$secondaryCanvas === void 0 ? void 0 : _self$secondaryCanvas.label);
      self.canvasLabel((_self$secondaryCanvas2 = self.secondaryCanvasObject()) === null || _self$secondaryCanvas2 === void 0 ? void 0 : _self$secondaryCanvas2.label);
      if (secondaryPanelFilters) {
        self.brightness(secondaryPanelFilters.brightness);
        self.saturation(secondaryPanelFilters.saturation);
        self.contrast(secondaryPanelFilters.contrast);
        self.greyscale(secondaryPanelFilters.greyscale);
      } else {
        self.brightness(100);
        self.saturation(100);
        self.contrast(100);
        self.greyscale(false);
      }
    }
  });
  this.imageToolSelector.subscribe(function (value) {
    if (_this.selectPrimaryPanel() && _this.canvas() !== _this.imageToolSelector()) {
      _this.canvas(_this.imageToolSelector());
    } else if (!_this.selectPrimaryPanel() && _this.secondaryCanvas() !== _this.imageToolSelector()) {
      _this.secondaryCanvas(_this.imageToolSelector());
    }
  });
  this.compareMode.subscribe(function (mode) {
    if (!mode) {
      var _sideBySideControl;
      var map = self.map();
      if (secondaryCanvasLayer && map.hasLayer(secondaryCanvasLayer)) {
        try {
          map.removeLayer(secondaryCanvasLayer);
        } catch (e) {
          // ignore/smother if remove layer fails
        }
      }
      if (sideBySideControl && (_sideBySideControl = sideBySideControl) !== null && _sideBySideControl !== void 0 && _sideBySideControl._map) {
        map.removeControl(sideBySideControl);
      }
      self.secondaryCanvas(undefined);
      self.secondaryLabel(undefined);
      self.showImageModifiers(false);
      self.selectPrimaryPanel(true);
    } else {
      self.selectPrimaryPanel(false);
      self.canvasClick(self.canvasObject());
      self.selectPrimaryPanel(true);
    }
  });
  this.panelRadio = knockout_latest_default().pureComputed(function () {
    if (!_this.compareMode()) {
      return "single";
    } else {
      return "double";
    }
  });
  this.showLogo = knockout_latest_default().pureComputed(function () {
    var imageExtenstion = ["bmp", "gif", "jpeg", "jpg", "png", "svg", "tif", "tiff", "webp"];
    return !!imageExtenstion.find(function (ext) {
      return self.manifestLogo().endsWith(ext);
    });
  });
  this.buildAnnotationNodes = params.buildAnnotationNodes || function (json) {
    var nodeProcessingStatus = {};
    self.annotationNodes(json.map(function (node) {
      var annotations = knockout_latest_default().observableArray();
      nodeProcessingStatus[node.nodeid] = {
        processing: false,
        completed: false
      };
      var updateAnnotations = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var canvas, annotationsUrl, response, jsonResponse, annotation, counts, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                canvas = self.canvas();
                if (!canvas) {
                  _context.n = 6;
                  break;
                }
                annotationsUrl = arches["default"].urls.iiifannotations + '?canvas=' + canvas + '&nodeid=' + node.nodeid;
                _context.p = 1;
                if (cachedAnnotations[annotationsUrl]) {
                  _context.n = 4;
                  break;
                }
                _context.n = 2;
                return window.fetch(annotationsUrl);
              case 2:
                response = _context.v;
                _context.n = 3;
                return response.json();
              case 3:
                jsonResponse = _context.v;
                cachedAnnotations[annotationsUrl] = jsonResponse;
              case 4:
                annotation = cachedAnnotations[annotationsUrl];
                annotation.features.forEach(function (feature) {
                  feature.properties.graphName = node['graph_name'];
                });
                annotations(annotation.features);
                counts = _objectSpread({}, self.annotationCounts());
                counts[canvas] = annotation.features.length;
                self.annotationCounts(counts);
                _context.n = 6;
                break;
              case 5:
                _context.p = 5;
                _t = _context.v;
                console.error('Error loading annotations for current canvas:', _t);
              case 6:
                return _context.a(2);
            }
          }, _callee, null, [[1, 5]]);
        }));
        return function updateAnnotations() {
          return _ref.apply(this, arguments);
        };
      }();
      var preloadAllAnnotations = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var canvases, processedCount, BATCH_SIZE, _processBatch;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                if (!nodeProcessingStatus[node.nodeid].processing) {
                  _context5.n = 1;
                  break;
                }
                return _context5.a(2);
              case 1:
                nodeProcessingStatus[node.nodeid].processing = true;
                canvases = self.canvases();
                processedCount = 0;
                if (canvases && canvases.length > 0) {
                  BATCH_SIZE = 20; // batch process
                  _processBatch = /*#__PURE__*/function () {
                    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(startIndex) {
                      var endIndex, batchPromises, _loop, i;
                      return _regenerator().w(function (_context4) {
                        while (1) switch (_context4.n) {
                          case 0:
                            endIndex = Math.min(startIndex + BATCH_SIZE, canvases.length);
                            batchPromises = [];
                            _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                              var canvas, canvasId, annotationsUrl;
                              return _regenerator().w(function (_context3) {
                                while (1) switch (_context3.n) {
                                  case 0:
                                    canvas = canvases[i];
                                    canvasId = self.getCanvasService(canvas);
                                    if (canvas && canvasId) {
                                      annotationsUrl = arches["default"].urls.iiifannotations + '?canvas=' + canvasId + '&nodeid=' + node.nodeid;
                                      batchPromises.push(_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
                                        var response, jsonResponse, currentCounts, _t2;
                                        return _regenerator().w(function (_context2) {
                                          while (1) switch (_context2.p = _context2.n) {
                                            case 0:
                                              _context2.p = 0;
                                              if (cachedAnnotations[annotationsUrl]) {
                                                _context2.n = 3;
                                                break;
                                              }
                                              _context2.n = 1;
                                              return window.fetch(annotationsUrl);
                                            case 1:
                                              response = _context2.v;
                                              _context2.n = 2;
                                              return response.json();
                                            case 2:
                                              jsonResponse = _context2.v;
                                              cachedAnnotations[annotationsUrl] = jsonResponse;
                                            case 3:
                                              // get state before update
                                              currentCounts = _objectSpread({}, self.annotationCounts());
                                              if (!currentCounts[canvasId]) {
                                                currentCounts[canvasId] = 0;
                                              }
                                              currentCounts[canvasId] += cachedAnnotations[annotationsUrl].features.length;
                                              processedCount++;

                                              // update counts progress
                                              self.annotationCounts(currentCounts);
                                              _context2.n = 5;
                                              break;
                                            case 4:
                                              _context2.p = 4;
                                              _t2 = _context2.v;
                                              processedCount++;
                                              console.error('Error loading annotations for canvas:', canvasId, _t2);
                                            case 5:
                                              return _context2.a(2);
                                          }
                                        }, _callee2, null, [[0, 4]]);
                                      }))());
                                    } else {
                                      processedCount++;
                                    }
                                  case 1:
                                    return _context3.a(2);
                                }
                              }, _loop);
                            });
                            i = startIndex;
                          case 1:
                            if (!(i < endIndex)) {
                              _context4.n = 3;
                              break;
                            }
                            return _context4.d(_regeneratorValues(_loop()), 2);
                          case 2:
                            i++;
                            _context4.n = 1;
                            break;
                          case 3:
                            _context4.n = 4;
                            return Promise.all(batchPromises);
                          case 4:
                            if (endIndex < canvases.length) {
                              setTimeout(function () {
                                return _processBatch(endIndex);
                              }, 0);
                            } else {
                              // end status
                              nodeProcessingStatus[node.nodeid].completed = true;
                              nodeProcessingStatus[node.nodeid].processing = false;
                            }
                          case 5:
                            return _context4.a(2);
                        }
                      }, _callee3);
                    }));
                    return function processBatch(_x) {
                      return _ref3.apply(this, arguments);
                    };
                  }();
                  _processBatch(0);
                } else {
                  nodeProcessingStatus[node.nodeid].completed = true;
                  nodeProcessingStatus[node.nodeid].processing = false;
                }
              case 2:
                return _context5.a(2);
            }
          }, _callee4);
        }));
        return function preloadAllAnnotations() {
          return _ref2.apply(this, arguments);
        };
      }();
      var initializeAnnotationLoading = /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                _context6.n = 1;
                return updateAnnotations();
              case 1:
                setTimeout(function () {
                  return preloadAllAnnotations();
                }, 100);
              case 2:
                return _context6.a(2);
            }
          }, _callee5);
        }));
        return function initializeAnnotationLoading() {
          return _ref5.apply(this, arguments);
        };
      }();
      self.manifestData.subscribe(initializeAnnotationLoading);
      self.canvas.subscribe(updateAnnotations);
      initializeAnnotationLoading();
      return {
        name: node['graph_name'] + ' - ' + node.name,
        icon: node.icon,
        active: knockout_latest_default().observable(false),
        opacity: knockout_latest_default().observable(100),
        annotations: annotations
      };
    }));
  };
  window.fetch(arches["default"].urls.iiifannotationnodes).then(function (response) {
    return response.json();
  }).then(self.buildAnnotationNodes);
  var annotationLayer = knockout_latest_default().computed(function () {
    var annotationFeatures = [];
    self.annotationNodes().forEach(function (node) {
      if (node.active()) {
        var annotations = node.annotations();
        if (params.tile && params.tile.tileid) {
          annotations = annotations.filter(function (annotation) {
            return annotation.properties.tileId !== params.tile.tileid;
          });
        }
        annotations.forEach(function (annotation) {
          annotation.properties.opacityModifier = node.opacity();
        });
        annotationFeatures = annotations.concat(annotationFeatures);
      }
    });
    return leaflet_default().geoJson({
      type: 'FeatureCollection',
      features: annotationFeatures
    }, {
      pointToLayer: function pointToLayer(feature, latlng) {
        var modifier = feature.properties.opacityModifier / 100;
        var style = {
          color: feature.properties.color,
          fillColor: feature.properties.fillColor,
          weight: feature.properties.weight,
          radius: feature.properties.radius,
          opacity: feature.properties.opacity * modifier,
          fillOpacity: feature.properties.fillOpacity * modifier
        };
        return leaflet_default().circleMarker(latlng, style);
      },
      style: function style(feature) {
        var modifier = feature.properties.opacityModifier / 100;
        var style = {
          color: feature.properties.color,
          fillColor: feature.properties.fillColor,
          weight: feature.properties.weight,
          radius: feature.properties.radius,
          opacity: feature.properties.opacity * modifier,
          fillOpacity: feature.properties.fillOpacity * modifier
        };
        return style;
      },
      onEachFeature: function onEachFeature(feature, layer) {
        if (params.onEachFeature) {
          params.onEachFeature(feature, layer);
        } else {
          var popup = leaflet_default().popup({
            closeButton: false,
            maxWidth: 349
          }).setContent(iiif_popup_namespaceObject).on('add', function () {
            var popupData = {
              'closePopup': function closePopup() {
                popup.remove();
              },
              'name': knockout_latest_default().observable(''),
              'description': knockout_latest_default().observable(''),
              'graphName': feature.properties.graphName,
              'resourceinstanceid': feature.properties.resourceId,
              'reportURL': arches["default"].urls.resource_report,
              'translations': arches["default"].translations
            };
            window.fetch(arches["default"].urls.resource_descriptors + popupData.resourceinstanceid).then(function (response) {
              return response.json();
            }).then(function (descriptors) {
              popupData.name(descriptors.displayname);
              popupData.description(descriptors['map_popup']);
            });
            var popupElement = popup.getElement().querySelector('.mapboxgl-popup-content');
            knockout_latest_default().applyBindingsToDescendants(popupData, popupElement);
          });
          layer.bindPopup(popup);
        }
      }
    });
  });
  var annotationFeatureGroup = new (leaflet_default()).FeatureGroup();
  annotationLayer.subscribe(function (newAnnotationLayer) {
    var map = self.map();
    if (map) {
      annotationFeatureGroup.clearLayers();
      annotationFeatureGroup.addLayer(newAnnotationLayer);
    }
  });
  this.canvases = knockout_latest_default().pureComputed(function () {
    var manifestData = self.manifestData();
    var sequences = manifestData ? manifestData.sequences : [];
    var canvases = [];
    sequences.forEach(function (sequence) {
      if (sequence.canvases) {
        sequence.label = self.getManifestDataValue(sequence, 'label', true);
        sequence.canvases.forEach(function (canvas) {
          canvas.label = self.getManifestDataValue(canvas, 'label', true);
          if (_typeof(canvas.thumbnail) === 'object') canvas.thumbnail = canvas.thumbnail["@id"];else if (canvas.images && canvas.images[0] && canvas.images[0].resource) canvas.thumbnail = canvas.images[0].resource["@id"];
          canvas.id = self.getCanvasService(canvas);
          canvas.text = canvas.label;
          canvases.push(canvas);
        });
      }
    });
    return canvases;
  });
  var validateUrl = function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  };
  var queryTerm;
  var limit = 10;
  this.manifestSelectConfig = {
    value: this.manifest,
    clickBubble: true,
    multiple: false,
    closeOnSelect: true,
    allowClear: true,
    placeholder: arches["default"].translations.selectAManifest,
    ajax: {
      url: arches["default"].urls.iiifmanifest,
      dataType: 'json',
      quietMillis: 250,
      data: function data(requestParams) {
        var term = requestParams.term || '';
        var page = requestParams.page || 1;
        var data = {
          start: (page - 1) * limit,
          limit: limit
        };
        queryTerm = term;
        if (term) data.query = term;
        return data;
      },
      processResults: function processResults(data) {
        var results = data.results;
        if (validateUrl(queryTerm)) results.unshift({
          url: queryTerm,
          label: queryTerm
        });
        results.forEach(function (item) {
          item.id = item.url;
        });
        return {
          "results": results,
          "pagination": {
            "more": data.more
          }
        };
      }
    },
    templateResult: function templateResult(item) {
      return item.label;
    },
    templateSelection: function templateSelection(item) {
      return item.label;
    }
  };
  var CustomDataAdapterClass = function CustomDataAdapterClass() {
    return {};
  };
  var CustomDataAdapter = utils_default().Decorate((array_default()), CustomDataAdapterClass);
  CustomDataAdapter.prototype.current = function (callback) {
    var _this2 = this;
    var canvasObj = self.canvases().find(function (canvas) {
      return self.getCanvasService(canvas) == _this2.options.options.value();
    });
    callback([canvasObj]);
  };
  CustomDataAdapter.prototype.query = function (params, callback) {
    // self.canvases.subscribe(function(canvases){
    //     callback({"results": canvases});
    // });
    callback({
      "results": self.canvases()
    });
  };
  var splitSelectConfig = {
    clickBubble: true,
    multiple: false,
    closeOnSelect: true,
    allowClear: false,
    dataAdapter: CustomDataAdapter,
    dropdownCssClass: "split-controls-drop",
    templateResult: function templateResult(item) {
      if (item.loading) {
        return "";
      }
      return jquery_min_default()("<div class=\"image\"><img src=\"".concat(item.thumbnail, "\" height=\"50\"/></div><div class=\"title\">").concat(item.label, "</div>"));
    },
    templateSelection: function templateSelection(item) {
      return item === null || item === void 0 ? void 0 : item.label;
    }
  };
  this.rightSideSelectConfig = _objectSpread(_objectSpread({}, splitSelectConfig), {}, {
    value: this.secondaryCanvas
  });
  this.leftSideSelectConfig = _objectSpread(_objectSpread({}, splitSelectConfig), {}, {
    value: this.canvas
  });
  this.imageToolConfig = _objectSpread(_objectSpread({}, splitSelectConfig), {}, {
    value: this.imageToolSelector
  });
  this.getManifestData = function () {
    var manifestURL = self.manifest();
    if (manifestURL) {
      self.manifestLoading(true);
      self.manifestError(undefined);
      abortFetchManifest = new window.AbortController();
      window.fetch(manifestURL, {
        signal: abortFetchManifest.signal
      }).then(function (response) {
        return response.json();
      }).then(function (manifestData) {
        self.manifestData(manifestData);
        self.editManifest(false);
      }).catch(function (error) {
        if (error.message !== "The user aborted a request.") self.manifestError(error);
      }).finally(function () {
        self.manifestLoading(false);
        abortFetchManifest = undefined;
      });
    }
  };
  this.getManifestData();
  workbench["default"].apply(this, [params]);
  this.activeTab.subscribe(function () {
    var map = self.map();
    if (map) setTimeout(function () {
      map.invalidateSize();
    }, 1);
  });
  if (params.showGallery === undefined) params.showGallery = true;
  this.showGallery = knockout_latest_default().observable(params.showGallery);
  if (!params.manifest) params.expandGallery = true;
  this.expandGallery = knockout_latest_default().observable(params.expandGallery);
  this.expandGallery.subscribe(function (expandGallery) {
    if (expandGallery) {
      self.compareMode(false);
      self.showGallery(true);
    }
  });
  this.showGallery.subscribe(function (showGallery) {
    if (!showGallery) self.expandGallery(false);
  });
  this.toggleGallery = function () {
    self.showGallery(!self.showGallery());
  };
  this.leafletConfig = {
    center: params.center || [0, 0],
    crs: (leaflet_default()).CRS.Simple,
    zoom: params.zoom || 0,
    afterRender: this.map
  };
  this.imagePropertyUpdate = function (location, viewmodel, event) {
    if (self.floatingLocation() == location || !self.showImageModifiers()) {
      self.showImageModifiers(!self.showImageModifiers());
    }
    self.floatingLocation(location);
    if (self.floatingLocation() == "left") {
      self.selectPrimaryPanel(true);
    } else {
      self.selectPrimaryPanel(false);
    }
  };
  this.fileUpdate = function () {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }
    console.log(params);
  };
  var canvasLayer;
  var secondaryCanvasLayer;
  var sideBySideControl;
  this.brightness = knockout_latest_default().observable(100);
  this.contrast = knockout_latest_default().observable(100);
  this.saturation = knockout_latest_default().observable(100);
  this.greyscale = knockout_latest_default().observable(false);
  this.canvasFilter = knockout_latest_default().pureComputed(function () {
    var b = self.brightness() / 100;
    var c = self.contrast() / 100;
    var s = self.saturation() / 100;
    var g = self.greyscale() ? 1 : 0;
    return 'brightness(' + b + ') contrast(' + c + ') ' + 'saturate(' + s + ') grayscale(' + g + ')';
  });
  this.canvasFilterObject = knockout_latest_default().pureComputed(function () {
    var brightness = self.brightness();
    var contrast = self.contrast();
    var saturation = self.saturation();
    var greyscale = self.greyscale();
    return {
      brightness: brightness,
      contrast: contrast,
      saturation: saturation,
      greyscale: greyscale
    };
  });
  var updateCanvasLayerFilter = function updateCanvasLayerFilter() {
    var filter = self.canvasFilter();
    var map = self.map();
    var layer;
    if (map) {
      if (self.selectPrimaryPanel()) {
        layer = map.getPane('tilePane').querySelector('.iiif-layer-primary');
      } else {
        layer = map.getPane('tilePane').querySelector('.iiif-layer-secondary');
      }
      if (layer && layer !== null) {
        layer.style.filter = filter;
      }
    }
  };
  this.canvasFilter.subscribe(updateCanvasLayerFilter);
  this.resetImageSettings = function () {
    self.brightness(100);
    self.contrast(100);
    self.saturation(100);
    self.greyscale(false);
  };
  var zoomToBounds = function zoomToBounds(map, layer) {
    var initialZoom = layer._getInitialZoom(map.getSize());
    var imageSize = layer._imageSizes[initialZoom];
    var sw = map.options.crs.pointToLatLng(leaflet_default().point(0, imageSize.y), initialZoom);
    var ne = map.options.crs.pointToLatLng(leaflet_default().point(imageSize.x, 0), initialZoom);
    var bounds = leaflet_default().latLngBounds(sw, ne);
    map.fitBounds(bounds);
  };
  var loadComparison = function loadComparison() {
    var _secondaryCanvasLayer;
    var map = self.map();
    if (map && canvasLayer.getContainer() && (_secondaryCanvasLayer = secondaryCanvasLayer) !== null && _secondaryCanvasLayer !== void 0 && _secondaryCanvasLayer.getContainer() /*self.primaryLayerLoaded && self.secondaryLayerLoaded*/) {
      var _sideBySideControl2;
      // remove the control if it's been added to the map already
      if (self.zoomToCanvas) {
        zoomToBounds(map, canvasLayer);
        //map.fitBounds(canvasLayer.getBounds())
        self.zoomToCanvas = false;
      }
      // add the control back, comparing the appropriate layers
      if (!sideBySideControl) {
        sideBySideControl = leaflet_default().control.sideBySide(canvasLayer, secondaryCanvasLayer);
      } else {
        sideBySideControl.setLeftLayers(canvasLayer);
        sideBySideControl.setRightLayers(secondaryCanvasLayer);
      }
      if (!((_sideBySideControl2 = sideBySideControl) !== null && _sideBySideControl2 !== void 0 && _sideBySideControl2._map)) {
        sideBySideControl.addTo(map);
      }
    }
  };
  var updatePrimaryCanvasLayer = function updatePrimaryCanvasLayer() {
    var map = self.map();
    var canvas = self.canvas();
    if (self.selectPrimaryPanel() && canvas && canvas != self.imageToolSelector()) {
      self.imageToolSelector(canvas);
    }
    if (map && canvas) {
      if (canvasLayer && map.hasLayer(canvasLayer)) {
        try {
          map.removeLayer(canvasLayer);
        } catch (e) {
          // ignore/smother if remove layer fails
        }
        canvasLayer = undefined;
      }
      if (canvas) {
        var layerInfoUrl = canvas + '/info.json';
        canvasLayer = getLayer(layerInfoUrl, layers);
        if (!canvasLayer) {
          canvasLayer = leaflet_default().tileLayer.iiif(layerInfoUrl, {
            fitBounds: false,
            className: "iiif-layer-primary"
          });
          canvasLayer.on('load', function () {
            if (self.compareMode()) {
              loadComparison();
            } else if (!self.compareMode() && self.zoomToCanvas && canvasLayer) {
              zoomToBounds(map, canvasLayer);
              self.zoomToCanvas = false;
            }
          });
          layers.push(canvasLayer);
        }
        canvasLayer.addTo(map);
        updateCanvasLayerFilter();
      }
    }
  };
  var getLayer = function getLayer(url, layers) {
    var match = layers.filter(function (layer) {
      return layer._infoUrl == url;
    });
    if (match.length > 0) {
      return match[0];
    }
  };
  var updateSecondaryCanvasLayer = function updateSecondaryCanvasLayer() {
    var map = self.map();
    var primaryCanvas = self.canvas();
    var secondaryCanvas = self.secondaryCanvas();
    if (secondaryCanvas && secondaryCanvas != self.imageToolSelector()) {
      self.selectPrimaryPanel(false);
      self.imageToolSelector(secondaryCanvas);
    }
    if (map && primaryCanvas && secondaryCanvas) {
      if (secondaryCanvasLayer && map.hasLayer(secondaryCanvasLayer)) {
        try {
          map.removeLayer(secondaryCanvasLayer);
        } catch (e) {
          // ignore/smother if remove layer fails
        }
        secondaryCanvasLayer = undefined;
      }
      var layerInfoUrl = secondaryCanvas + '/info.json';
      secondaryCanvasLayer = getLayer(layerInfoUrl, secondaryLayers);
      if (!secondaryCanvasLayer) {
        secondaryCanvasLayer = leaflet_default().tileLayer.iiif(layerInfoUrl, {
          fitBounds: false,
          className: "iiif-layer-secondary"
        });
        secondaryCanvasLayer.on('load', function () {
          if (self.compareMode()) {
            loadComparison();
          }
        });
        secondaryLayers.push(secondaryCanvasLayer);
      }
      secondaryCanvasLayer.addTo(map);
      updateCanvasLayerFilter();
    }
  };
  this.map.subscribe(function (map) {
    leaflet_default().control.fullscreen({
      fullscreenElement: jquery_min_default()(map.getContainer()).closest('.workbench-card-wrapper')[0]
    }).addTo(map);
    updatePrimaryCanvasLayer();
    map.addLayer(annotationFeatureGroup);
  });
  this.canvas.subscribe(updatePrimaryCanvasLayer);
  this.secondaryCanvas.subscribe(updateSecondaryCanvasLayer);
  this.setSecondaryCanvas = function (canvas) {
    var service = self.getCanvasService(canvas);
    if (service) {
      self.secondaryCanvas(service);
    }
  };
  this.selectCanvas = function (canvas) {
    var service = self.getCanvasService(canvas);
    if (service && self.selectPrimaryPanel()) {
      self.canvas(service);
      self.canvasObject(canvas);
      self.canvasLabel(self.getManifestDataValue(canvas, 'label', true));
    } else {
      self.secondaryCanvas(service);
      self.secondaryCanvasObject(canvas);
      self.canvasLabel(self.getManifestDataValue(canvas, 'label', true));
    }
    self.origCanvasLabel(self.canvasLabel());
  };
  this.canvasClick = function (canvas) {
    self.selectCanvas(canvas);
    self.expandGallery(false);
  };
  this.getCanvasService = function (canvas) {
    if (!canvas || !canvas.images || canvas.images.length === 0) return null;
    try {
      if (canvas.images[0] && canvas.images[0].resource && canvas.images[0].resource.service) {
        return canvas.images[0].resource.service['@id'];
      }
    } catch (e) {
      console.error("Error accessing canvas service:", e);
    }
    return null;
  };
  this.updateCanvas = !self.canvas();
  this.manifestData.subscribe(function (manifestData) {
    if (manifestData) {
      if (manifestData.sequences.length > 0) {
        var sequence = manifestData.sequences[0];
        var canvasIndex = 0;
        if (sequence.canvases.length > 0) {
          if (!self.updateCanvas) {
            canvasIndex = sequence.canvases.findIndex(function (c) {
              return c.images[0].resource.service['@id'] === self.canvas();
            });
          }
          var canvas = sequence.canvases[canvasIndex];
          self.secondaryCanvasLayer = undefined;
          self.canvasLayer = undefined;
          var service = self.getCanvasService(canvas);
          self.zoomToCanvas = true;
          self.canvas(service);
          self.canvasObject(canvas);
          if (self.compareMode()) {
            self.secondaryCanvas(service);
            self.secondaryCanvasObject(canvas);
          }
        }
      }
      self.updateCanvas = true;
      self.origManifestName = self.getManifestDataValue(manifestData, 'label', true);
      self.manifestName(self.origManifestName);
      self.origManifestDescription = self.getManifestDataValue(manifestData, 'description', true);
      self.manifestDescription(self.origManifestDescription);
      self.origManifestAttribution = self.getManifestDataValue(manifestData, 'attribution', true);
      self.manifestAttribution(self.origManifestAttribution);
      self.origManifestLogo = self.getManifestDataValue(manifestData, 'logo', true);
      self.manifestLogo(self.origManifestLogo);
      self.origManifestMetadata = knockout_mapping_min_default().toJSON(self.getManifestDataValue(manifestData, 'metadata'));
      self.manifestMetadata.removeAll();
      self.getManifestDataValue(manifestData, 'metadata').forEach(function (entry) {
        self.manifestMetadata.push(knockout_mapping_min_default().fromJS(entry));
      });
    }
  });
  this.toggleManifestEditor = function () {
    self.editManifest(!self.editManifest());
    if (abortFetchManifest) abortFetchManifest.abort();
  };
  this.getAnnotationCount = function (canvasId) {
    var counts = self.annotationCounts();
    return counts && counts[canvasId] ? counts[canvasId] : 0;
  };
};
knockout_latest_default().components.register('iiif-viewer', {
  viewModel: IIIFViewerViewmodel,
  template: iiif_viewer_namespaceObject
});
/* harmony default export */ const iiif_viewer = (IIIFViewerViewmodel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxFQUFDO1FBQ3ZFelksSUFBSSxDQUFDOEcsZ0JBQWdCLENBQUNqRCxJQUFJLENBQUNzQixxQ0FBZ0IsQ0FBQ3NULEtBQUssQ0FBQyxDQUFDO01BQ3ZELENBQUMsQ0FBQztJQUNOO0VBQ0osQ0FBQyxDQUFDO0VBRUYsSUFBSSxDQUFDQyxvQkFBb0IsR0FBRyxZQUFXO0lBQ25DMVksSUFBSSxDQUFDcUcsWUFBWSxDQUFDLENBQUNyRyxJQUFJLENBQUNxRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLElBQUlSLGtCQUFrQixFQUFFQSxrQkFBa0IsQ0FBQzhTLEtBQUssQ0FBQyxDQUFDO0VBQ3RELENBQUM7RUFFRCxJQUFJLENBQUNDLGtCQUFrQixHQUFHLFVBQVMzTCxRQUFRLEVBQUU7SUFDekMsSUFBTTdCLE1BQU0sR0FBR3BMLElBQUksQ0FBQ3NILGdCQUFnQixDQUFDLENBQUM7SUFDdEMsT0FBTzhELE1BQU0sSUFBSUEsTUFBTSxDQUFDNkIsUUFBUSxDQUFDLEdBQUc3QixNQUFNLENBQUM2QixRQUFRLENBQUMsR0FBRyxDQUFDO0VBQzVELENBQUM7QUFDTCxDQUFDO0FBQ0QvSCxvQ0FBYSxDQUFDNFQsUUFBUSxDQUFDLGFBQWEsRUFBRTtFQUNsQ0MsU0FBUyxFQUFFclQsbUJBQW1CO0VBQzlCc1QsUUFBUSxFQUFFelQsMkJBQWtCQTtBQUNoQyxDQUFDLENBQUM7QUFDRixrREFBZUcsbUJBQW1CLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4uLy4uL29wdC92ZW52L2xpYi9weXRob24zLjEzL3NpdGUtcGFja2FnZXMvYXJjaGVzL2FwcC9tZWRpYS9wbHVnaW5zL2xlYWZsZXQtc2lkZS1ieS1zaWRlL2luZGV4LmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvaWlpZi12aWV3ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFtcbiAgJ2xlYWZsZXQnXG5dLCBmdW5jdGlvbigpIHtcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuICAoZnVuY3Rpb24gKGdsb2JhbCl7XG4gIHZhciBMID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ0wnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ0wnXSA6IG51bGwpXG4gIHJlcXVpcmUoJy4vbGF5b3V0LmNzcycpXG4gIHJlcXVpcmUoJy4vcmFuZ2UuY3NzJylcbiAgXG4gIHZhciBtYXBXYXNEcmFnRW5hYmxlZFxuICB2YXIgbWFwV2FzVGFwRW5hYmxlZFxuICBcbiAgLy8gTGVhZmxldCB2MC43IGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gIGZ1bmN0aW9uIG9uIChlbCwgdHlwZXMsIGZuLCBjb250ZXh0KSB7XG4gICAgdHlwZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBMLkRvbUV2ZW50Lm9uKGVsLCB0eXBlLCBmbiwgY29udGV4dClcbiAgICB9KVxuICB9XG4gIFxuICAvLyBMZWFmbGV0IHYwLjcgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgZnVuY3Rpb24gb2ZmIChlbCwgdHlwZXMsIGZuLCBjb250ZXh0KSB7XG4gICAgdHlwZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBMLkRvbUV2ZW50Lm9mZihlbCwgdHlwZSwgZm4sIGNvbnRleHQpXG4gICAgfSlcbiAgfVxuICBcbiAgZnVuY3Rpb24gZ2V0UmFuZ2VFdmVudCAocmFuZ2VJbnB1dCkge1xuICAgIHJldHVybiAnb25pbnB1dCcgaW4gcmFuZ2VJbnB1dCA/ICdpbnB1dCcgOiAnY2hhbmdlJ1xuICB9XG4gIFxuICBmdW5jdGlvbiBjYW5jZWxNYXBEcmFnICgpIHtcbiAgICBtYXBXYXNEcmFnRW5hYmxlZCA9IHRoaXMuX21hcC5kcmFnZ2luZy5lbmFibGVkKClcbiAgICBtYXBXYXNUYXBFbmFibGVkID0gdGhpcy5fbWFwLnRhcCAmJiB0aGlzLl9tYXAudGFwLmVuYWJsZWQoKVxuICAgIHRoaXMuX21hcC5kcmFnZ2luZy5kaXNhYmxlKClcbiAgICB0aGlzLl9tYXAudGFwICYmIHRoaXMuX21hcC50YXAuZGlzYWJsZSgpXG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHVuY2FuY2VsTWFwRHJhZyAoZSkge1xuICAgIHRoaXMuX3JlZm9jdXNPbk1hcChlKVxuICAgIGlmIChtYXBXYXNEcmFnRW5hYmxlZCkge1xuICAgICAgdGhpcy5fbWFwLmRyYWdnaW5nLmVuYWJsZSgpXG4gICAgfVxuICAgIGlmIChtYXBXYXNUYXBFbmFibGVkKSB7XG4gICAgICB0aGlzLl9tYXAudGFwLmVuYWJsZSgpXG4gICAgfVxuICB9XG4gIFxuICAvLyBjb252ZXJ0IGFyZyB0byBhbiBhcnJheSAtIHJldHVybnMgZW1wdHkgYXJyYXkgaWYgYXJnIGlzIHVuZGVmaW5lZFxuICBmdW5jdGlvbiBhc0FycmF5IChhcmcpIHtcbiAgICByZXR1cm4gKGFyZyA9PT0gJ3VuZGVmaW5lZCcpID8gW10gOiBBcnJheS5pc0FycmF5KGFyZykgPyBhcmcgOiBbYXJnXVxuICB9XG4gIFxuICBmdW5jdGlvbiBub29wICgpIHt9XG4gIFxuICBMLkNvbnRyb2wuU2lkZUJ5U2lkZSA9IEwuQ29udHJvbC5leHRlbmQoe1xuICAgIG9wdGlvbnM6IHtcbiAgICAgIHRodW1iU2l6ZTogNDIsXG4gICAgICBwYWRkaW5nOiAwXG4gICAgfSxcbiAgXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxlZnRMYXllcnMsIHJpZ2h0TGF5ZXJzLCBvcHRpb25zKSB7XG4gICAgICB0aGlzLnNldExlZnRMYXllcnMobGVmdExheWVycylcbiAgICAgIHRoaXMuc2V0UmlnaHRMYXllcnMocmlnaHRMYXllcnMpXG4gICAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucylcbiAgICB9LFxuICBcbiAgICBnZXRQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJhbmdlVmFsdWUgPSB0aGlzLl9yYW5nZS52YWx1ZVxuICAgICAgdmFyIG9mZnNldCA9ICgwLjUgLSByYW5nZVZhbHVlKSAqICgyICogdGhpcy5vcHRpb25zLnBhZGRpbmcgKyB0aGlzLm9wdGlvbnMudGh1bWJTaXplKVxuICAgICAgcmV0dXJuIHRoaXMuX21hcC5nZXRTaXplKCkueCAqIHJhbmdlVmFsdWUgKyBvZmZzZXRcbiAgICB9LFxuICBcbiAgICBzZXRQb3NpdGlvbjogbm9vcCxcbiAgXG4gICAgaW5jbHVkZXM6IEwuRXZlbnRlZC5wcm90b3R5cGUgfHwgTC5NaXhpbi5FdmVudHMsXG4gIFxuICAgIGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgICB0aGlzLnJlbW92ZSgpXG4gICAgICB0aGlzLl9tYXAgPSBtYXBcbiAgXG4gICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc2JzJywgbWFwLl9jb250cm9sQ29udGFpbmVyKVxuICBcbiAgICAgIHRoaXMuX2RpdmlkZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zYnMtZGl2aWRlcicsIGNvbnRhaW5lcilcbiAgICAgIHZhciByYW5nZSA9IHRoaXMuX3JhbmdlID0gTC5Eb21VdGlsLmNyZWF0ZSgnaW5wdXQnLCAnbGVhZmxldC1zYnMtcmFuZ2UnLCBjb250YWluZXIpXG4gICAgICByYW5nZS50eXBlID0gJ3JhbmdlJ1xuICAgICAgcmFuZ2UubWluID0gMFxuICAgICAgcmFuZ2UubWF4ID0gMVxuICAgICAgcmFuZ2Uuc3RlcCA9ICdhbnknXG4gICAgICByYW5nZS52YWx1ZSA9IDAuNVxuICAgICAgcmFuZ2Uuc3R5bGUucGFkZGluZ0xlZnQgPSByYW5nZS5zdHlsZS5wYWRkaW5nUmlnaHQgPSB0aGlzLm9wdGlvbnMucGFkZGluZyArICdweCdcbiAgICAgIHRoaXMuX2FkZEV2ZW50cygpXG4gICAgICB0aGlzLl91cGRhdGVMYXllcnMoKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICBcbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fbGVmdExheWVyKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLl9sZWZ0TGF5ZXIuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgaWYoY29udGFpbmVyPy5zdHlsZSl7XG4gICAgICAgICAgY29udGFpbmVyLnN0eWxlLmNsaXAgPSAnJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fcmlnaHRMYXllcikge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5fcmlnaHRMYXllci5nZXRDb250YWluZXIoKVxuICAgICAgICBpZihjb250YWluZXI/LnN0eWxlKXtcbiAgICAgICAgICBjb250YWluZXIuc3R5bGUuY2xpcCA9ICcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlbW92ZUV2ZW50cygpXG4gICAgICBMLkRvbVV0aWwucmVtb3ZlKHRoaXMuX2NvbnRhaW5lcilcbiAgXG4gICAgICB0aGlzLl9tYXAgPSBudWxsXG4gIFxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICBcbiAgICBzZXRMZWZ0TGF5ZXJzOiBmdW5jdGlvbiAobGVmdExheWVycykge1xuICAgICAgdGhpcy5fbGVmdExheWVycyA9IGFzQXJyYXkobGVmdExheWVycylcbiAgICAgIHRoaXMuX3VwZGF0ZUxheWVycygpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gIFxuICAgIHNldFJpZ2h0TGF5ZXJzOiBmdW5jdGlvbiAocmlnaHRMYXllcnMpIHtcbiAgICAgIHRoaXMuX3JpZ2h0TGF5ZXJzID0gYXNBcnJheShyaWdodExheWVycylcbiAgICAgIHRoaXMuX3VwZGF0ZUxheWVycygpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gIFxuICAgIF91cGRhdGVDbGlwOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbWFwID0gdGhpcy5fbWFwXG4gICAgICB2YXIgbncgPSBtYXAuY29udGFpbmVyUG9pbnRUb0xheWVyUG9pbnQoWzAsIDBdKVxuICAgICAgdmFyIHNlID0gbWFwLmNvbnRhaW5lclBvaW50VG9MYXllclBvaW50KG1hcC5nZXRTaXplKCkpXG4gICAgICB2YXIgY2xpcFggPSBudy54ICsgdGhpcy5nZXRQb3NpdGlvbigpXG4gICAgICB2YXIgZGl2aWRlclggPSB0aGlzLmdldFBvc2l0aW9uKClcbiAgXG4gICAgICB0aGlzLl9kaXZpZGVyLnN0eWxlLmxlZnQgPSBkaXZpZGVyWCArICdweCdcbiAgICAgIHRoaXMuZmlyZSgnZGl2aWRlcm1vdmUnLCB7eDogZGl2aWRlclh9KVxuICAgICAgdmFyIGNsaXBMZWZ0ID0gJ3JlY3QoJyArIFtudy55LCBjbGlwWCwgc2UueSwgbncueF0uam9pbigncHgsJykgKyAncHgpJ1xuICAgICAgdmFyIGNsaXBSaWdodCA9ICdyZWN0KCcgKyBbbncueSwgc2UueCwgc2UueSwgY2xpcFhdLmpvaW4oJ3B4LCcpICsgJ3B4KSdcbiAgICAgIGlmICh0aGlzLl9sZWZ0TGF5ZXIpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuX2xlZnRMYXllci5nZXRDb250YWluZXIoKVxuICAgICAgICBpZihjb250YWluZXI/LnN0eWxlKXtcbiAgICAgICAgICBjb250YWluZXIuc3R5bGUuY2xpcCA9IGNsaXBMZWZ0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9yaWdodExheWVyKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLl9yaWdodExheWVyLmdldENvbnRhaW5lcigpXG4gICAgICAgIGlmKGNvbnRhaW5lcj8uc3R5bGUpe1xuICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5jbGlwID0gY2xpcFJpZ2h0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICBcbiAgICBfdXBkYXRlTGF5ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuX21hcCkge1xuICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgfVxuICAgICAgdmFyIHByZXZMZWZ0ID0gdGhpcy5fbGVmdExheWVyXG4gICAgICB2YXIgcHJldlJpZ2h0ID0gdGhpcy5fcmlnaHRMYXllclxuICAgICAgdGhpcy5fbGVmdExheWVyID0gdGhpcy5fcmlnaHRMYXllciA9IG51bGxcbiAgICAgIHRoaXMuX2xlZnRMYXllcnMuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcC5oYXNMYXllcihsYXllcikpIHtcbiAgICAgICAgICB0aGlzLl9sZWZ0TGF5ZXIgPSBsYXllclxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKVxuICAgICAgdGhpcy5fcmlnaHRMYXllcnMuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcC5oYXNMYXllcihsYXllcikpIHtcbiAgICAgICAgICB0aGlzLl9yaWdodExheWVyID0gbGF5ZXJcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcylcbiAgICAgIGlmIChwcmV2TGVmdCAhPT0gdGhpcy5fbGVmdExheWVyKSB7XG4gICAgICAgIHByZXZMZWZ0ICYmIHRoaXMuZmlyZSgnbGVmdGxheWVycmVtb3ZlJywge2xheWVyOiBwcmV2TGVmdH0pXG4gICAgICAgIHRoaXMuX2xlZnRMYXllciAmJiB0aGlzLmZpcmUoJ2xlZnRsYXllcmFkZCcsIHtsYXllcjogdGhpcy5fbGVmdExheWVyfSlcbiAgICAgIH1cbiAgICAgIGlmIChwcmV2UmlnaHQgIT09IHRoaXMuX3JpZ2h0TGF5ZXIpIHtcbiAgICAgICAgcHJldlJpZ2h0ICYmIHRoaXMuZmlyZSgncmlnaHRsYXllcnJlbW92ZScsIHtsYXllcjogcHJldlJpZ2h0fSlcbiAgICAgICAgdGhpcy5fcmlnaHRMYXllciAmJiB0aGlzLmZpcmUoJ3JpZ2h0bGF5ZXJhZGQnLCB7bGF5ZXI6IHRoaXMuX3JpZ2h0TGF5ZXJ9KVxuICAgICAgfVxuICAgICAgdGhpcy5fdXBkYXRlQ2xpcCgpXG4gICAgfSxcbiAgXG4gICAgX2FkZEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJhbmdlID0gdGhpcy5fcmFuZ2VcbiAgICAgIHZhciBtYXAgPSB0aGlzLl9tYXBcbiAgICAgIGlmICghbWFwIHx8ICFyYW5nZSkgcmV0dXJuXG4gICAgICBtYXAub24oJ21vdmUnLCB0aGlzLl91cGRhdGVDbGlwLCB0aGlzKVxuICAgICAgbWFwLm9uKCdsYXllcmFkZCBsYXllcnJlbW92ZScsIHRoaXMuX3VwZGF0ZUxheWVycywgdGhpcylcbiAgICAgIG9uKHJhbmdlLCBnZXRSYW5nZUV2ZW50KHJhbmdlKSwgdGhpcy5fdXBkYXRlQ2xpcCwgdGhpcylcbiAgICAgIG9uKHJhbmdlLCBMLkJyb3dzZXIudG91Y2ggPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJywgY2FuY2VsTWFwRHJhZywgdGhpcylcbiAgICAgIG9uKHJhbmdlLCBMLkJyb3dzZXIudG91Y2ggPyAndG91Y2hlbmQnIDogJ21vdXNldXAnLCB1bmNhbmNlbE1hcERyYWcsIHRoaXMpXG4gICAgfSxcbiAgXG4gICAgX3JlbW92ZUV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJhbmdlID0gdGhpcy5fcmFuZ2VcbiAgICAgIHZhciBtYXAgPSB0aGlzLl9tYXBcbiAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICBvZmYocmFuZ2UsIGdldFJhbmdlRXZlbnQocmFuZ2UpLCB0aGlzLl91cGRhdGVDbGlwLCB0aGlzKVxuICAgICAgICBvZmYocmFuZ2UsIEwuQnJvd3Nlci50b3VjaCA/ICd0b3VjaHN0YXJ0JyA6ICdtb3VzZWRvd24nLCBjYW5jZWxNYXBEcmFnLCB0aGlzKVxuICAgICAgICBvZmYocmFuZ2UsIEwuQnJvd3Nlci50b3VjaCA/ICd0b3VjaGVuZCcgOiAnbW91c2V1cCcsIHVuY2FuY2VsTWFwRHJhZywgdGhpcylcbiAgICAgIH1cbiAgICAgIGlmIChtYXApIHtcbiAgICAgICAgbWFwLm9mZignbGF5ZXJhZGQgbGF5ZXJyZW1vdmUnLCB0aGlzLl91cGRhdGVMYXllcnMsIHRoaXMpXG4gICAgICAgIG1hcC5vZmYoJ21vdmUnLCB0aGlzLl91cGRhdGVDbGlwLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgXG4gIEwuY29udHJvbC5zaWRlQnlTaWRlID0gZnVuY3Rpb24gKGxlZnRMYXllcnMsIHJpZ2h0TGF5ZXJzLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBMLkNvbnRyb2wuU2lkZUJ5U2lkZShsZWZ0TGF5ZXJzLCByaWdodExheWVycywgb3B0aW9ucylcbiAgfVxuICBcbiAgbW9kdWxlLmV4cG9ydHMgPSBMLkNvbnRyb2wuU2lkZUJ5U2lkZVxuICBcbiAgfSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4gIH0se1wiLi9sYXlvdXQuY3NzXCI6MixcIi4vcmFuZ2UuY3NzXCI6NH1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuICB2YXIgaW5qZWN0ID0gcmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY3NzaWZ5Jyk7XG4gIHZhciBjc3MgPSBcIi5sZWFmbGV0LXNicy1yYW5nZSB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiA1MCU7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB6LWluZGV4OiA5OTk7XFxyXFxufVxcclxcbi5sZWFmbGV0LXNicy1kaXZpZGVyIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgbGVmdDogNTAlO1xcclxcbiAgICBtYXJnaW4tbGVmdDogLTJweDtcXHJcXG4gICAgd2lkdGg6IDRweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxuICAgIHotaW5kZXg6IDk5OTtcXHJcXG59XFxyXFxuXCI7XG4gIGluamVjdChjc3MsIHVuZGVmaW5lZCwgJ19pNmFvbWQnKTtcbiAgbW9kdWxlLmV4cG9ydHMgPSBjc3M7XG4gIFxuICB9LHtcIi4vbm9kZV9tb2R1bGVzL2Nzc2lmeVwiOjN9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbiAgJ3VzZSBzdHJpY3QnXG4gIFxuICBmdW5jdGlvbiBpbmplY3RTdHlsZVRhZyAoZG9jdW1lbnQsIGZpbGVOYW1lLCBjYikge1xuICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZpbGVOYW1lKVxuICBcbiAgICBpZiAoc3R5bGUpIHtcbiAgICAgIGNiKHN0eWxlKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgXG4gICAgICBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICAgIGlmIChmaWxlTmFtZSAhPSBudWxsKSBzdHlsZS5pZCA9IGZpbGVOYW1lXG4gICAgICBjYihzdHlsZSlcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpXG4gICAgfVxuICBcbiAgICByZXR1cm4gc3R5bGVcbiAgfVxuICBcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzLCBjdXN0b21Eb2N1bWVudCwgZmlsZU5hbWUpIHtcbiAgICB2YXIgZG9jID0gY3VzdG9tRG9jdW1lbnQgfHwgZG9jdW1lbnRcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWY6IG5vdCBzdXBwb3J0ZWQgYnkgRWxlY3Ryb24gKi9cbiAgICBpZiAoZG9jLmNyZWF0ZVN0eWxlU2hlZXQpIHtcbiAgICAgIHZhciBzaGVldCA9IGRvYy5jcmVhdGVTdHlsZVNoZWV0KClcbiAgICAgIHNoZWV0LmNzc1RleHQgPSBjc3NcbiAgICAgIHJldHVybiBzaGVldC5vd25lck5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGluamVjdFN0eWxlVGFnKGRvYywgZmlsZU5hbWUsIGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWY6IG5vdCBzdXBwb3J0ZWQgYnkgRWxlY3Ryb24gKi9cbiAgICAgICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBjc3NcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgXG4gIG1vZHVsZS5leHBvcnRzLmJ5VXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZjogbm90IHN1cHBvcnRlZCBieSBFbGVjdHJvbiAqL1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCh1cmwpLm93bmVyTm9kZVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gIFxuICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCdcbiAgICAgIGxpbmsuaHJlZiA9IHVybFxuICBcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluaylcbiAgICAgIHJldHVybiBsaW5rXG4gICAgfVxuICB9XG4gIFxuICB9LHt9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbiAgdmFyIGluamVjdCA9IHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2Nzc2lmeScpO1xuICB2YXIgY3NzID0gXCIubGVhZmxldC1zYnMtcmFuZ2Uge1xcclxcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jayFpbXBvcnRhbnQ7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxuICAgIGhlaWdodDogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBib3JkZXI6IDA7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAgIG1pbi13aWR0aDogMTAwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxuICAgIHotaW5kZXg6IDk5OTtcXHJcXG59XFxyXFxuLmxlYWZsZXQtc2JzLXJhbmdlOjotbXMtZmlsbC11cHBlciB7XFxyXFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcclxcbn1cXHJcXG4ubGVhZmxldC1zYnMtcmFuZ2U6Oi1tcy1maWxsLWxvd2VyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTtcXHJcXG59XFxyXFxuLyogQnJvd3NlciB0aGluZ2llcyAqL1xcclxcblxcclxcbi5sZWFmbGV0LXNicy1yYW5nZTo6LW1vei1yYW5nZS10cmFjayB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcbi5sZWFmbGV0LXNicy1yYW5nZTo6LW1zLXRyYWNrIHtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG59XFxyXFxuLmxlYWZsZXQtc2JzLXJhbmdlOjotbXMtdG9vbHRpcCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcbi8qIEZvciB3aGF0ZXZlciByZWFzb24sIHRoZXNlIG5lZWQgdG8gYmUgZGVmaW5lZFxcclxcbiAqIG9uIHRoZWlyIG93biBzbyBkb250IGdyb3VwIHRoZW0gKi9cXHJcXG5cXHJcXG4ubGVhZmxldC1zYnMtcmFuZ2U6Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcXHJcXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIGhlaWdodDogNDBweDtcXHJcXG4gICAgd2lkdGg6IDQwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICAgIGN1cnNvcjogZXctcmVzaXplO1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUZBQUFBQlFDQU1BQUFDNXp3S2ZBQUFBQmxCTVZFVjlmWDMvLy8rS2N0MzlBQUFBQW5SU1RsUC9BT1czTUVvQUFBQTlTVVJCVkZqRDdkZWhEUUF3REFOQlovK2wyd21Lb2lxUjdwSFJjYWVhQ3hBSUJBTC9nN2s5SnhBSUJBS0JRQ0FRQ0FRQzE0SCtNaEFJQkU0Q0QzZk9GdkdWQnpoWkFBQUFBRWxGVGtTdVFtQ0NcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDUwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiA0MHB4IDQwcHg7XFxyXFxufVxcclxcbi5sZWFmbGV0LXNicy1yYW5nZTo6LW1zLXRodW1iIHtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcclxcbiAgICBoZWlnaHQ6IDQwcHg7XFxyXFxuICAgIHdpZHRoOiA0MHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcclxcbiAgICBjdXJzb3I6IGV3LXJlc2l6ZTtcXHJcXG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFGQUFBQUJRQ0FNQUFBQzV6d0tmQUFBQUJsQk1WRVY5ZlgzLy8vK0tjdDM5QUFBQUFuUlNUbFAvQU9XM01Fb0FBQUE5U1VSQlZGakQ3ZGVoRFFBd0RBTkJaLytsMndtS29pcVI3cEhSY2FlYUN4QUlCQUwvZzdrOUp4QUlCQUtCUUNBUUNBUUMxNEgrTWhBSUJFNENEM2ZPRnZHVkJ6aFpBQUFBQUVsRlRrU3VRbUNDXFxcIik7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSA1MCU7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogNDBweCA0MHB4O1xcclxcbn1cXHJcXG4ubGVhZmxldC1zYnMtcmFuZ2U6Oi1tb3otcmFuZ2UtdGh1bWIge1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICByaWdodDogMCAgICA7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIGhlaWdodDogNDBweDtcXHJcXG4gICAgd2lkdGg6IDQwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICAgIGN1cnNvcjogZXctcmVzaXplO1xcclxcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUZBQUFBQlFDQU1BQUFDNXp3S2ZBQUFBQmxCTVZFVjlmWDMvLy8rS2N0MzlBQUFBQW5SU1RsUC9BT1czTUVvQUFBQTlTVVJCVkZqRDdkZWhEUUF3REFOQlovK2wyd21Lb2lxUjdwSFJjYWVhQ3hBSUJBTC9nN2s5SnhBSUJBS0JRQ0FRQ0FRQzE0SCtNaEFJQkU0Q0QzZk9GdkdWQnpoWkFBQUFBRWxGVGtTdVFtQ0NcXFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDUwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiA0MHB4IDQwcHg7XFxyXFxufVxcclxcbi5sZWFmbGV0LXNicy1yYW5nZTpkaXNhYmxlZDo6LW1vei1yYW5nZS10aHVtYiB7XFxyXFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXHJcXG59XFxyXFxuLmxlYWZsZXQtc2JzLXJhbmdlOmRpc2FibGVkOjotbXMtdGh1bWIge1xcclxcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxyXFxufVxcclxcbi5sZWFmbGV0LXNicy1yYW5nZTpkaXNhYmxlZDo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xcclxcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxyXFxufVxcclxcbi5sZWFmbGV0LXNicy1yYW5nZTpkaXNhYmxlZCB7XFxyXFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXHJcXG59XFxyXFxuLmxlYWZsZXQtc2JzLXJhbmdlOmZvY3VzIHtcXHJcXG4gICAgb3V0bGluZTogbm9uZSFpbXBvcnRhbnQ7XFxyXFxufVxcclxcbi5sZWFmbGV0LXNicy1yYW5nZTo6LW1vei1mb2N1cy1vdXRlciB7XFxyXFxuICAgIGJvcmRlcjogMDtcXHJcXG59XFxyXFxuXFxyXFxuXCI7XG4gIGluamVjdChjc3MsIHVuZGVmaW5lZCwgJ18xdGx0NjY4Jyk7XG4gIG1vZHVsZS5leHBvcnRzID0gY3NzO1xuICBcbiAgfSx7XCIuL25vZGVfbW9kdWxlcy9jc3NpZnlcIjozfV19LHt9LFsxXSk7XG59KTsiLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBrb01hcHBpbmcgZnJvbSAna25vY2tvdXQtbWFwcGluZyc7XG5pbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBXb3JrYmVuY2hWaWV3bW9kZWwgZnJvbSAndmlld3MvY29tcG9uZW50cy93b3JrYmVuY2gnO1xuaW1wb3J0IGlpaWZQb3B1cCBmcm9tICd0ZW1wbGF0ZXMvdmlld3MvY29tcG9uZW50cy9paWlmLXBvcHVwLmh0bSc7XG5pbXBvcnQgaWlpZlZpZXdlclRlbXBsYXRlIGZyb20gJ3RlbXBsYXRlcy92aWV3cy9jb21wb25lbnRzL2lpaWYtdmlld2VyLmh0bSc7XG5pbXBvcnQgc2VsZWN0V29vVXRpbHMgZnJvbSAnc2VsZWN0LXdvby1zcmMvdXRpbHMnO1xuaW1wb3J0IHNlbGVjdFdvb0FycmF5QWRhcHRlciBmcm9tICdzZWxlY3Qtd29vLXNyYy9kYXRhL2FycmF5JztcbmltcG9ydCAnbGVhZmxldC1paWlmJztcbmltcG9ydCAnbGVhZmxldC1mdWxsc2NyZWVuJztcbmltcG9ydCAnbGVhZmxldC1zaWRlLWJ5LXNpZGUnO1xuaW1wb3J0ICdiaW5kaW5ncy9zZWxlY3QyLXF1ZXJ5JztcbmltcG9ydCAnYmluZGluZ3MvbGVhZmxldCc7XG5cblxudmFyIElJSUZWaWV3ZXJWaWV3bW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGFib3J0RmV0Y2hNYW5pZmVzdDtcbiAgICB0aGlzLmdldE1hbmlmZXN0RGF0YVZhbHVlID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgcmV0dXJuRmlyc3RWYWwpIHtcbiAgICAgICAgdmFyIHZhbCA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkgJiYgcmV0dXJuRmlyc3RWYWwpIHZhbCA9IG9iamVjdFtwcm9wZXJ0eV1bMF1bXCJAdmFsdWVcIl07XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfTtcblxuXG4gICAgdGhpcy5tYXAgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5tYW5pZmVzdCA9IGtvLm9ic2VydmFibGUocGFyYW1zLm1hbmlmZXN0KTtcbiAgICB0aGlzLmVkaXRNYW5pZmVzdCA9IGtvLm9ic2VydmFibGUoIXBhcmFtcy5tYW5pZmVzdCk7XG4gICAgdGhpcy5jYW52YXMgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5jYW52YXMpO1xuICAgIHRoaXMubWFuaWZlc3RMb2FkaW5nID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZmlsdGVyID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gICAgdGhpcy5tYW5pZmVzdERhdGEgPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5tYW5pZmVzdEVycm9yID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMubWFuaWZlc3ROYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMubWFuaWZlc3REZXNjcmlwdGlvbiA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLm1hbmlmZXN0QXR0cmlidXRpb24gPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5tYW5pZmVzdExvZ28gPSBrby5vYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5tYW5pZmVzdE1ldGFkYXRhID0ga29NYXBwaW5nLmZyb21KUyhbXSk7XG4gICAgdGhpcy5jYW52YXNMYWJlbCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICB0aGlzLnpvb21Ub0NhbnZhcyA9ICEocGFyYW1zLnpvb20gJiYgcGFyYW1zLmNlbnRlcik7XG4gICAgdGhpcy5hbm5vdGF0aW9uTm9kZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB0aGlzLmFubm90YXRpb25Db3VudHMgPSBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICB0aGlzLmNvbXBhcmVNb2RlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy5wcmltYXJ5Q2FudmFzID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuY2FudmFzT2JqZWN0ID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q2FudmFzT2JqZWN0ID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q2FudmFzID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuY29tcGFyZUluc3RydWN0aW9uID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMucHJpbWFyeVRpbGVzTG9hZGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy5zZWNvbmRhcnlUaWxlc0xvYWRlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgIHRoaXMuc2VsZWN0UHJpbWFyeVBhbmVsID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcbiAgICB0aGlzLnNlY29uZGFyeUxhYmVsID0ga28ub2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuaW1hZ2VUb29sU2VsZWN0b3IgPSBrby5vYnNlcnZhYmxlKHRoaXMuY2FudmFzKCkpO1xuICAgIHRoaXMuZmxvYXRpbmdMb2NhdGlvbiA9IGtvLm9ic2VydmFibGUoXCJsZWZ0XCIpO1xuICAgIHRoaXMuc2hvd0ltYWdlTW9kaWZpZXJzID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgdGhpcy5yZW5kZXJDb250ZXh0ID0ga28ub2JzZXJ2YWJsZShwYXJhbXMucmVuZGVyQ29udGV4dCk7XG4gICAgdGhpcy5zaG93TW9kZVNlbGVjdG9yID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcbiAgICB0aGlzLnByaW1hcnlMYXllckxvYWRlZCA9IHRydWU7XG4gICAgdGhpcy5zZWNvbmRhcnlMYXllckxvYWRlZCA9IHRydWU7XG4gICAgbGV0IHByaW1hcnlQYW5lbEZpbHRlcnM7XG4gICAgbGV0IHNlY29uZGFyeVBhbmVsRmlsdGVycztcbiAgICBjb25zdCBsYXllcnMgPSBbXTtcbiAgICBjb25zdCBzZWNvbmRhcnlMYXllcnMgPSBbXTtcbiAgICBjb25zdCBjYWNoZWRBbm5vdGF0aW9ucyA9IHt9O1xuICAgIHRoaXMub3JpZ0NhbnZhc0xhYmVsID0ga28ub2JzZXJ2YWJsZSgpO1xuXG4gICAgdGhpcy5zZWxlY3RQcmltYXJ5UGFuZWwuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAvLyBpZiB0cnVlLCBwcmltYXJ5IHBhbmVsIGlzIGJlaW5nIHNlbGVjdGVkXG4gICAgICAgIGlmKHZhbHVlKXtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VUb29sU2VsZWN0b3IodGhpcy5jYW52YXMoKSk7XG4gICAgICAgICAgICBzZWxmLm9yaWdDYW52YXNMYWJlbChzZWxmLmNhbnZhc09iamVjdCgpLmxhYmVsKTtcbiAgICAgICAgICAgIHNlbGYuY2FudmFzTGFiZWwoc2VsZi5jYW52YXNPYmplY3QoKS5sYWJlbCk7XG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZSBzdGF0ZSBvZiBzZWNvbmRhcnkgZmlsdGVycywgaWYgc2Vjb25kYXJ5Q2FudmFzIGlzIHNldFxuICAgICAgICAgICAgaWYoc2VsZi5zZWNvbmRhcnlDYW52YXMoKSkge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeVBhbmVsRmlsdGVycyA9IHNlbGYuY2FudmFzRmlsdGVyT2JqZWN0KCk7XG4gICAgICAgICAgICAgICAgaWYocHJpbWFyeVBhbmVsRmlsdGVycykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmJyaWdodG5lc3MocHJpbWFyeVBhbmVsRmlsdGVycy5icmlnaHRuZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zYXR1cmF0aW9uKHByaW1hcnlQYW5lbEZpbHRlcnMuc2F0dXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29udHJhc3QocHJpbWFyeVBhbmVsRmlsdGVycy5jb250cmFzdCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ3JleXNjYWxlKHByaW1hcnlQYW5lbEZpbHRlcnMuZ3JleXNjYWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlVG9vbFNlbGVjdG9yKHRoaXMuc2Vjb25kYXJ5Q2FudmFzKCkpO1xuICAgICAgICAgICAgcHJpbWFyeVBhbmVsRmlsdGVycyA9IHNlbGYuY2FudmFzRmlsdGVyT2JqZWN0KCk7XG4gICAgICAgICAgICBzZWxmLm9yaWdDYW52YXNMYWJlbChzZWxmLnNlY29uZGFyeUNhbnZhc09iamVjdCgpPy5sYWJlbCk7XG4gICAgICAgICAgICBzZWxmLmNhbnZhc0xhYmVsKHNlbGYuc2Vjb25kYXJ5Q2FudmFzT2JqZWN0KCk/LmxhYmVsKTtcbiAgICAgICAgICAgIGlmKHNlY29uZGFyeVBhbmVsRmlsdGVycykge1xuICAgICAgICAgICAgICAgIHNlbGYuYnJpZ2h0bmVzcyhzZWNvbmRhcnlQYW5lbEZpbHRlcnMuYnJpZ2h0bmVzcyk7XG4gICAgICAgICAgICAgICAgc2VsZi5zYXR1cmF0aW9uKHNlY29uZGFyeVBhbmVsRmlsdGVycy5zYXR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRyYXN0KHNlY29uZGFyeVBhbmVsRmlsdGVycy5jb250cmFzdCk7XG4gICAgICAgICAgICAgICAgc2VsZi5ncmV5c2NhbGUoc2Vjb25kYXJ5UGFuZWxGaWx0ZXJzLmdyZXlzY2FsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuYnJpZ2h0bmVzcygxMDApO1xuICAgICAgICAgICAgICAgIHNlbGYuc2F0dXJhdGlvbigxMDApO1xuICAgICAgICAgICAgICAgIHNlbGYuY29udHJhc3QoMTAwKTtcbiAgICAgICAgICAgICAgICBzZWxmLmdyZXlzY2FsZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaW1hZ2VUb29sU2VsZWN0b3Iuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZih0aGlzLnNlbGVjdFByaW1hcnlQYW5lbCgpICYmIHRoaXMuY2FudmFzKCkgIT09IHRoaXMuaW1hZ2VUb29sU2VsZWN0b3IoKSl7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyh0aGlzLmltYWdlVG9vbFNlbGVjdG9yKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnNlbGVjdFByaW1hcnlQYW5lbCgpICYmIHRoaXMuc2Vjb25kYXJ5Q2FudmFzKCkgIT09IHRoaXMuaW1hZ2VUb29sU2VsZWN0b3IoKSl7XG4gICAgICAgICAgICB0aGlzLnNlY29uZGFyeUNhbnZhcyh0aGlzLmltYWdlVG9vbFNlbGVjdG9yKCkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbXBhcmVNb2RlLnN1YnNjcmliZSgobW9kZSkgPT4ge1xuICAgICAgICBpZighbW9kZSl7XG4gICAgICAgICAgICBjb25zdCBtYXAgPSBzZWxmLm1hcCgpO1xuXG4gICAgICAgICAgICBpZihzZWNvbmRhcnlDYW52YXNMYXllciAmJiBtYXAuaGFzTGF5ZXIoc2Vjb25kYXJ5Q2FudmFzTGF5ZXIpKXtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBtYXAucmVtb3ZlTGF5ZXIoc2Vjb25kYXJ5Q2FudmFzTGF5ZXIpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZS9zbW90aGVyIGlmIHJlbW92ZSBsYXllciBmYWlsc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2lkZUJ5U2lkZUNvbnRyb2wgJiYgc2lkZUJ5U2lkZUNvbnRyb2w/Ll9tYXApe1xuICAgICAgICAgICAgICAgIG1hcC5yZW1vdmVDb250cm9sKHNpZGVCeVNpZGVDb250cm9sKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5zZWNvbmRhcnlDYW52YXModW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHNlbGYuc2Vjb25kYXJ5TGFiZWwodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHNlbGYuc2hvd0ltYWdlTW9kaWZpZXJzKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0UHJpbWFyeVBhbmVsKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RQcmltYXJ5UGFuZWwoZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5jYW52YXNDbGljayhzZWxmLmNhbnZhc09iamVjdCgpKTtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0UHJpbWFyeVBhbmVsKHRydWUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnBhbmVsUmFkaW8gPSBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBpZighdGhpcy5jb21wYXJlTW9kZSgpKXtcbiAgICAgICAgICAgIHJldHVybiBcInNpbmdsZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiZG91YmxlXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc2hvd0xvZ28gPSBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCBpbWFnZUV4dGVuc3Rpb24gPSBbXCJibXBcIiwgXCJnaWZcIiwgXCJqcGVnXCIsIFwianBnXCIsIFwicG5nXCIsIFwic3ZnXCIsIFwidGlmXCIsIFwidGlmZlwiLCBcIndlYnBcIl1cbiAgICAgICAgcmV0dXJuICEhaW1hZ2VFeHRlbnN0aW9uLmZpbmQoKGV4dCkgPT4gc2VsZi5tYW5pZmVzdExvZ28oKS5lbmRzV2l0aChleHQpKVxuICAgIH0pO1xuXG4gICAgdGhpcy5idWlsZEFubm90YXRpb25Ob2RlcyA9IHBhcmFtcy5idWlsZEFubm90YXRpb25Ob2RlcyB8fCBmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIGNvbnN0IG5vZGVQcm9jZXNzaW5nU3RhdHVzID0ge307XG5cbiAgICAgICAgc2VsZi5hbm5vdGF0aW9uTm9kZXMoXG4gICAgICAgICAgICBqc29uLm1hcCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFubm90YXRpb25zID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgICAgICAgICAgICAgbm9kZVByb2Nlc3NpbmdTdGF0dXNbbm9kZS5ub2RlaWRdID0geyBwcm9jZXNzaW5nOiBmYWxzZSwgY29tcGxldGVkOiBmYWxzZSB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlQW5ub3RhdGlvbnMgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FudmFzID0gc2VsZi5jYW52YXMoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbnZhcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5ub3RhdGlvbnNVcmwgPSBhcmNoZXMudXJscy5paWlmYW5ub3RhdGlvbnMgKyAnP2NhbnZhcz0nICsgY2FudmFzICsgJyZub2RlaWQ9JyArIG5vZGUubm9kZWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighY2FjaGVkQW5ub3RhdGlvbnNbYW5ub3RhdGlvbnNVcmxdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3aW5kb3cuZmV0Y2goYW5ub3RhdGlvbnNVcmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlZEFubm90YXRpb25zW2Fubm90YXRpb25zVXJsXSA9IGpzb25SZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5ub3RhdGlvbiA9IGNhY2hlZEFubm90YXRpb25zW2Fubm90YXRpb25zVXJsXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFubm90YXRpb24uZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5ncmFwaE5hbWUgPSBub2RlWydncmFwaF9uYW1lJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbnMoYW5ub3RhdGlvbi5mZWF0dXJlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudHMgPSB7Li4uc2VsZi5hbm5vdGF0aW9uQ291bnRzKCl9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50c1tjYW52YXNdID0gYW5ub3RhdGlvbi5mZWF0dXJlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hbm5vdGF0aW9uQ291bnRzKGNvdW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgYW5ub3RhdGlvbnMgZm9yIGN1cnJlbnQgY2FudmFzOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcmVsb2FkQWxsQW5ub3RhdGlvbnMgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVQcm9jZXNzaW5nU3RhdHVzW25vZGUubm9kZWlkXS5wcm9jZXNzaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vIEF2b2lkIGNvbmN1cnJlbnQgcHJvY2VzcyBvZiB0aGUgc2FtZSBub2RlXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBub2RlUHJvY2Vzc2luZ1N0YXR1c1tub2RlLm5vZGVpZF0ucHJvY2Vzc2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FudmFzZXMgPSBzZWxmLmNhbnZhc2VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbnZhc2VzICYmIGNhbnZhc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IEJBVENIX1NJWkUgPSAyMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmF0Y2ggcHJvY2Vzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc0JhdGNoID0gYXN5bmMgKHN0YXJ0SW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmRJbmRleCA9IE1hdGgubWluKHN0YXJ0SW5kZXggKyBCQVRDSF9TSVpFLCBjYW52YXNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhdGNoUHJvbWlzZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYW52YXMgPSBjYW52YXNlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FudmFzSWQgPSBzZWxmLmdldENhbnZhc1NlcnZpY2UoY2FudmFzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FudmFzICYmIGNhbnZhc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbm5vdGF0aW9uc1VybCA9IGFyY2hlcy51cmxzLmlpaWZhbm5vdGF0aW9ucyArICc/Y2FudmFzPScgKyBjYW52YXNJZCArICcmbm9kZWlkPScgKyBub2RlLm5vZGVpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0Y2hQcm9taXNlcy5wdXNoKChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjYWNoZWRBbm5vdGF0aW9uc1thbm5vdGF0aW9uc1VybF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgd2luZG93LmZldGNoKGFubm90YXRpb25zVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGpzb25SZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlZEFubm90YXRpb25zW2Fubm90YXRpb25zVXJsXSA9IGpzb25SZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgc3RhdGUgYmVmb3JlIHVwZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Q291bnRzID0gey4uLnNlbGYuYW5ub3RhdGlvbkNvdW50cygpfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRDb3VudHNbY2FudmFzSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q291bnRzW2NhbnZhc0lkXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvdW50c1tjYW52YXNJZF0gKz0gY2FjaGVkQW5ub3RhdGlvbnNbYW5ub3RhdGlvbnNVcmxdLmZlYXR1cmVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkQ291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgY291bnRzIHByb2dyZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYW5ub3RhdGlvbkNvdW50cyhjdXJyZW50Q291bnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGFubm90YXRpb25zIGZvciBjYW52YXM6JywgY2FudmFzSWQsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoYmF0Y2hQcm9taXNlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuZEluZGV4IDwgY2FudmFzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzc0JhdGNoKGVuZEluZGV4KSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlUHJvY2Vzc2luZ1N0YXR1c1tub2RlLm5vZGVpZF0uY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVByb2Nlc3NpbmdTdGF0dXNbbm9kZS5ub2RlaWRdLnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0JhdGNoKDApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVByb2Nlc3NpbmdTdGF0dXNbbm9kZS5ub2RlaWRdLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlUHJvY2Vzc2luZ1N0YXR1c1tub2RlLm5vZGVpZF0ucHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxpemVBbm5vdGF0aW9uTG9hZGluZyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL3ByaW9yaXplIGN1cnJlbnQgY2FudmFzXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHVwZGF0ZUFubm90YXRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcHJlbG9hZEFsbEFubm90YXRpb25zKCksIDEwMCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHNlbGYubWFuaWZlc3REYXRhLnN1YnNjcmliZShpbml0aWFsaXplQW5ub3RhdGlvbkxvYWRpbmcpO1xuICAgICAgICAgICAgICAgIHNlbGYuY2FudmFzLnN1YnNjcmliZSh1cGRhdGVBbm5vdGF0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICBpbml0aWFsaXplQW5ub3RhdGlvbkxvYWRpbmcoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5vZGVbJ2dyYXBoX25hbWUnXSArICcgLSAnICsgbm9kZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBub2RlLmljb24sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSksXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGtvLm9ic2VydmFibGUoMTAwKSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbnM6IGFubm90YXRpb25zXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5mZXRjaChhcmNoZXMudXJscy5paWlmYW5ub3RhdGlvbm5vZGVzKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oc2VsZi5idWlsZEFubm90YXRpb25Ob2Rlcyk7XG5cbiAgICB2YXIgYW5ub3RhdGlvbkxheWVyID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhbm5vdGF0aW9uRmVhdHVyZXMgPSBbXTtcbiAgICAgICAgc2VsZi5hbm5vdGF0aW9uTm9kZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmFjdGl2ZSgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFubm90YXRpb25zID0gbm9kZS5hbm5vdGF0aW9ucygpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMudGlsZSAmJiBwYXJhbXMudGlsZS50aWxlaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbnMgPSBhbm5vdGF0aW9ucy5maWx0ZXIoZnVuY3Rpb24oYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFubm90YXRpb24ucHJvcGVydGllcy50aWxlSWQgIT09IHBhcmFtcy50aWxlLnRpbGVpZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFubm90YXRpb25zLmZvckVhY2goZnVuY3Rpb24oYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uLnByb3BlcnRpZXMub3BhY2l0eU1vZGlmaWVyID0gbm9kZS5vcGFjaXR5KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbkZlYXR1cmVzID0gYW5ub3RhdGlvbnMuY29uY2F0KGFubm90YXRpb25GZWF0dXJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gTC5nZW9Kc29uKHtcbiAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICBmZWF0dXJlczogYW5ub3RhdGlvbkZlYXR1cmVzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHBvaW50VG9MYXllcjogZnVuY3Rpb24oZmVhdHVyZSwgbGF0bG5nKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGlmaWVyID0gZmVhdHVyZS5wcm9wZXJ0aWVzLm9wYWNpdHlNb2RpZmllciAvIDEwMDtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBmZWF0dXJlLnByb3BlcnRpZXMuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogZmVhdHVyZS5wcm9wZXJ0aWVzLmZpbGxDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiBmZWF0dXJlLnByb3BlcnRpZXMud2VpZ2h0LFxuICAgICAgICAgICAgICAgICAgICByYWRpdXM6IGZlYXR1cmUucHJvcGVydGllcy5yYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IChmZWF0dXJlLnByb3BlcnRpZXMub3BhY2l0eSAqIG1vZGlmaWVyKSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IChmZWF0dXJlLnByb3BlcnRpZXMuZmlsbE9wYWNpdHkgKiBtb2RpZmllcilcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcsIHN0eWxlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHlsZTogZnVuY3Rpb24oZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgIHZhciBtb2RpZmllciA9IGZlYXR1cmUucHJvcGVydGllcy5vcGFjaXR5TW9kaWZpZXIgLyAxMDA7XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogZmVhdHVyZS5wcm9wZXJ0aWVzLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IGZlYXR1cmUucHJvcGVydGllcy5maWxsQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHdlaWdodDogZmVhdHVyZS5wcm9wZXJ0aWVzLndlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiBmZWF0dXJlLnByb3BlcnRpZXMucmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAoZmVhdHVyZS5wcm9wZXJ0aWVzLm9wYWNpdHkgKiBtb2RpZmllciksXG4gICAgICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAoZmVhdHVyZS5wcm9wZXJ0aWVzLmZpbGxPcGFjaXR5ICogbW9kaWZpZXIpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25FYWNoRmVhdHVyZTogZnVuY3Rpb24oZmVhdHVyZSwgbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLm9uRWFjaEZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm9uRWFjaEZlYXR1cmUoZmVhdHVyZSwgbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcHVwID0gTC5wb3B1cCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogMzQ5XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q29udGVudChpaWlmUG9wdXApXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2FkZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3B1cERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbG9zZVBvcHVwJzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiBrby5vYnNlcnZhYmxlKCcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzoga28ub2JzZXJ2YWJsZSgnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdncmFwaE5hbWUnOiBmZWF0dXJlLnByb3BlcnRpZXMuZ3JhcGhOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmVzb3VyY2VpbnN0YW5jZWlkJzogZmVhdHVyZS5wcm9wZXJ0aWVzLnJlc291cmNlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZXBvcnRVUkwnOiBhcmNoZXMudXJscy5yZXNvdXJjZV9yZXBvcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGlvbnMnOiBhcmNoZXMudHJhbnNsYXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZmV0Y2goYXJjaGVzLnVybHMucmVzb3VyY2VfZGVzY3JpcHRvcnMgKyBwb3B1cERhdGEucmVzb3VyY2VpbnN0YW5jZWlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwRGF0YS5uYW1lKGRlc2NyaXB0b3JzLmRpc3BsYXluYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwRGF0YS5kZXNjcmlwdGlvbihkZXNjcmlwdG9yc1snbWFwX3BvcHVwJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9wdXBFbGVtZW50ID0gcG9wdXAuZ2V0RWxlbWVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcubWFwYm94Z2wtcG9wdXAtY29udGVudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtvLmFwcGx5QmluZGluZ3NUb0Rlc2NlbmRhbnRzKHBvcHVwRGF0YSwgcG9wdXBFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsYXllci5iaW5kUG9wdXAocG9wdXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmFyIGFubm90YXRpb25GZWF0dXJlR3JvdXAgPSBuZXcgTC5GZWF0dXJlR3JvdXAoKTtcblxuICAgIGFubm90YXRpb25MYXllci5zdWJzY3JpYmUoZnVuY3Rpb24obmV3QW5ub3RhdGlvbkxheWVyKSB7XG4gICAgICAgIHZhciBtYXAgPSBzZWxmLm1hcCgpO1xuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBhbm5vdGF0aW9uRmVhdHVyZUdyb3VwLmNsZWFyTGF5ZXJzKCk7XG4gICAgICAgICAgICBhbm5vdGF0aW9uRmVhdHVyZUdyb3VwLmFkZExheWVyKG5ld0Fubm90YXRpb25MYXllcik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzZXMgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtYW5pZmVzdERhdGEgPSBzZWxmLm1hbmlmZXN0RGF0YSgpO1xuICAgICAgICB2YXIgc2VxdWVuY2VzID0gbWFuaWZlc3REYXRhID8gbWFuaWZlc3REYXRhLnNlcXVlbmNlcyA6IFtdO1xuICAgICAgICB2YXIgY2FudmFzZXMgPSBbXTtcbiAgICAgICAgc2VxdWVuY2VzLmZvckVhY2goZnVuY3Rpb24oc2VxdWVuY2UpIHtcbiAgICAgICAgICAgIGlmIChzZXF1ZW5jZS5jYW52YXNlcykge1xuICAgICAgICAgICAgICAgIHNlcXVlbmNlLmxhYmVsID0gc2VsZi5nZXRNYW5pZmVzdERhdGFWYWx1ZShzZXF1ZW5jZSwgJ2xhYmVsJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VxdWVuY2UuY2FudmFzZXMuZm9yRWFjaChmdW5jdGlvbihjYW52YXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmxhYmVsID0gc2VsZi5nZXRNYW5pZmVzdERhdGFWYWx1ZShjYW52YXMsICdsYWJlbCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbnZhcy50aHVtYm5haWwgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLnRodW1ibmFpbCA9IGNhbnZhcy50aHVtYm5haWxbXCJAaWRcIl07XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNhbnZhcy5pbWFnZXMgJiYgY2FudmFzLmltYWdlc1swXSAmJiBjYW52YXMuaW1hZ2VzWzBdLnJlc291cmNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLnRodW1ibmFpbCA9IGNhbnZhcy5pbWFnZXNbMF0ucmVzb3VyY2VbXCJAaWRcIl07XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5pZCA9IHNlbGYuZ2V0Q2FudmFzU2VydmljZShjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMudGV4dCA9IGNhbnZhcy5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzZXMucHVzaChjYW52YXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNhbnZhc2VzO1xuICAgIH0pO1xuXG4gICAgdmFyIHZhbGlkYXRlVXJsID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIC9eKD86KD86KD86aHR0cHM/fGZ0cCk6KT9cXC9cXC8pKD86XFxTKyg/OjpcXFMqKT9AKT8oPzooPyEoPzoxMHwxMjcpKD86XFwuXFxkezEsM30pezN9KSg/ISg/OjE2OVxcLjI1NHwxOTJcXC4xNjgpKD86XFwuXFxkezEsM30pezJ9KSg/ITE3MlxcLig/OjFbNi05XXwyXFxkfDNbMC0xXSkoPzpcXC5cXGR7MSwzfSl7Mn0pKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswMV1cXGR8MjJbMC0zXSkoPzpcXC4oPzoxP1xcZHsxLDJ9fDJbMC00XVxcZHwyNVswLTVdKSl7Mn0oPzpcXC4oPzpbMS05XVxcZD98MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC00XSkpfCg/Oig/OlthLXpcXHUwMGExLVxcdWZmZmYwLTldLSopKlthLXpcXHUwMGExLVxcdWZmZmYwLTldKykoPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKig/OlxcLig/OlthLXpcXHUwMGExLVxcdWZmZmZdezIsfSkpKSg/OjpcXGR7Miw1fSk/KD86Wy8/I11cXFMqKT8kL2kudGVzdCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIHZhciBxdWVyeVRlcm07XG4gICAgdmFyIGxpbWl0ID0gMTA7XG4gICAgdGhpcy5tYW5pZmVzdFNlbGVjdENvbmZpZyA9IHtcbiAgICAgICAgdmFsdWU6IHRoaXMubWFuaWZlc3QsXG4gICAgICAgIGNsaWNrQnViYmxlOiB0cnVlLFxuICAgICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIGFsbG93Q2xlYXI6IHRydWUsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBhcmNoZXMudHJhbnNsYXRpb25zLnNlbGVjdEFNYW5pZmVzdCxcbiAgICAgICAgYWpheDoge1xuICAgICAgICAgICAgdXJsOiBhcmNoZXMudXJscy5paWlmbWFuaWZlc3QsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgcXVpZXRNaWxsaXM6IDI1MCxcbiAgICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uKHJlcXVlc3RQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVybSA9IHJlcXVlc3RQYXJhbXMudGVybSB8fCAnJztcbiAgICAgICAgICAgICAgICBsZXQgcGFnZSA9IHJlcXVlc3RQYXJhbXMucGFnZSB8fCAxO1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogKHBhZ2UtMSkqbGltaXQsXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiBsaW1pdFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcXVlcnlUZXJtID0gdGVybTtcbiAgICAgICAgICAgICAgICBpZiAodGVybSkgZGF0YS5xdWVyeSA9IHRlcm07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0cyA9IGRhdGEucmVzdWx0cztcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGVVcmwocXVlcnlUZXJtKSkgcmVzdWx0cy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBxdWVyeVRlcm0sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBxdWVyeVRlcm1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXN1bHRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IGl0ZW0udXJsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiByZXN1bHRzLFxuICAgICAgICAgICAgICAgICAgICBcInBhZ2luYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJtb3JlXCI6IGRhdGEubW9yZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmxhYmVsO1xuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubGFiZWw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIEN1c3RvbURhdGFBZGFwdGVyQ2xhc3MgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge307XG4gICAgfTtcblxuICAgIHZhciBDdXN0b21EYXRhQWRhcHRlciA9IHNlbGVjdFdvb1V0aWxzLkRlY29yYXRlKHNlbGVjdFdvb0FycmF5QWRhcHRlciwgQ3VzdG9tRGF0YUFkYXB0ZXJDbGFzcyk7XG4gICAgQ3VzdG9tRGF0YUFkYXB0ZXIucHJvdG90eXBlLmN1cnJlbnQgPSBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAgIGNvbnN0IGNhbnZhc09iaiA9IHNlbGYuY2FudmFzZXMoKS5maW5kKGNhbnZhcyA9PiBzZWxmLmdldENhbnZhc1NlcnZpY2UoY2FudmFzKSA9PSB0aGlzLm9wdGlvbnMub3B0aW9ucy52YWx1ZSgpKTtcbiAgICAgICAgY2FsbGJhY2soW2NhbnZhc09ial0pO1xuICAgIH07XG4gICAgQ3VzdG9tRGF0YUFkYXB0ZXIucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24ocGFyYW1zLCBjYWxsYmFjayl7XG4gICAgICAgIC8vIHNlbGYuY2FudmFzZXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGNhbnZhc2VzKXtcbiAgICAgICAgLy8gICAgIGNhbGxiYWNrKHtcInJlc3VsdHNcIjogY2FudmFzZXN9KTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIGNhbGxiYWNrKHtcInJlc3VsdHNcIjogc2VsZi5jYW52YXNlcygpfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNwbGl0U2VsZWN0Q29uZmlnID0ge1xuICAgICAgICBjbGlja0J1YmJsZTogdHJ1ZSxcbiAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgICAgICBhbGxvd0NsZWFyOiBmYWxzZSxcbiAgICAgICAgZGF0YUFkYXB0ZXI6IEN1c3RvbURhdGFBZGFwdGVyLFxuICAgICAgICBkcm9wZG93bkNzc0NsYXNzOiBcInNwbGl0LWNvbnRyb2xzLWRyb3BcIixcbiAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmKGl0ZW0ubG9hZGluZyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJChgPGRpdiBjbGFzcz1cImltYWdlXCI+PGltZyBzcmM9XCIke2l0ZW0udGh1bWJuYWlsfVwiIGhlaWdodD1cIjUwXCIvPjwvZGl2PjxkaXYgY2xhc3M9XCJ0aXRsZVwiPiR7aXRlbS5sYWJlbH08L2Rpdj5gKTtcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtPy5sYWJlbDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJpZ2h0U2lkZVNlbGVjdENvbmZpZyA9IHtcbiAgICAgICAgLi4uc3BsaXRTZWxlY3RDb25maWcsXG4gICAgICAgIHZhbHVlOiB0aGlzLnNlY29uZGFyeUNhbnZhc1xuICAgIH07XG5cbiAgICB0aGlzLmxlZnRTaWRlU2VsZWN0Q29uZmlnID0ge1xuICAgICAgICAuLi5zcGxpdFNlbGVjdENvbmZpZyxcbiAgICAgICAgdmFsdWU6IHRoaXMuY2FudmFzXG4gICAgfTtcblxuICAgIHRoaXMuaW1hZ2VUb29sQ29uZmlnID0ge1xuICAgICAgICAuLi5zcGxpdFNlbGVjdENvbmZpZyxcbiAgICAgICAgdmFsdWU6IHRoaXMuaW1hZ2VUb29sU2VsZWN0b3JcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRNYW5pZmVzdERhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1hbmlmZXN0VVJMID0gc2VsZi5tYW5pZmVzdCgpO1xuICAgICAgICBpZiAobWFuaWZlc3RVUkwpIHtcbiAgICAgICAgICAgIHNlbGYubWFuaWZlc3RMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgc2VsZi5tYW5pZmVzdEVycm9yKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBhYm9ydEZldGNoTWFuaWZlc3QgPSBuZXcgd2luZG93LkFib3J0Q29udHJvbGxlcigpO1xuICAgICAgICAgICAgd2luZG93LmZldGNoKG1hbmlmZXN0VVJMLCB7c2lnbmFsOiBhYm9ydEZldGNoTWFuaWZlc3Quc2lnbmFsfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24obWFuaWZlc3REYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWFuaWZlc3REYXRhKG1hbmlmZXN0RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZWRpdE1hbmlmZXN0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSAhPT0gXCJUaGUgdXNlciBhYm9ydGVkIGEgcmVxdWVzdC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWFuaWZlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tYW5pZmVzdExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBhYm9ydEZldGNoTWFuaWZlc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuZ2V0TWFuaWZlc3REYXRhKCk7XG5cbiAgICBXb3JrYmVuY2hWaWV3bW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuXG4gICAgdGhpcy5hY3RpdmVUYWIuc3Vic2NyaWJlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWFwID0gc2VsZi5tYXAoKTtcbiAgICAgICAgaWYgKG1hcCkgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcblxuICAgIGlmIChwYXJhbXMuc2hvd0dhbGxlcnkgPT09IHVuZGVmaW5lZCkgcGFyYW1zLnNob3dHYWxsZXJ5ID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dHYWxsZXJ5ID0ga28ub2JzZXJ2YWJsZShwYXJhbXMuc2hvd0dhbGxlcnkpO1xuICAgIGlmICghcGFyYW1zLm1hbmlmZXN0KSBwYXJhbXMuZXhwYW5kR2FsbGVyeSA9IHRydWU7XG4gICAgdGhpcy5leHBhbmRHYWxsZXJ5ID0ga28ub2JzZXJ2YWJsZShwYXJhbXMuZXhwYW5kR2FsbGVyeSk7XG4gICAgdGhpcy5leHBhbmRHYWxsZXJ5LnN1YnNjcmliZShmdW5jdGlvbihleHBhbmRHYWxsZXJ5KSB7XG4gICAgICAgIGlmIChleHBhbmRHYWxsZXJ5KSB7XG4gICAgICAgICAgICBzZWxmLmNvbXBhcmVNb2RlKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYuc2hvd0dhbGxlcnkodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnNob3dHYWxsZXJ5LnN1YnNjcmliZShmdW5jdGlvbihzaG93R2FsbGVyeSkge1xuICAgICAgICBpZiAoIXNob3dHYWxsZXJ5KSBzZWxmLmV4cGFuZEdhbGxlcnkoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgdGhpcy50b2dnbGVHYWxsZXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuc2hvd0dhbGxlcnkoIXNlbGYuc2hvd0dhbGxlcnkoKSk7XG4gICAgfTtcblxuICAgIHRoaXMubGVhZmxldENvbmZpZyA9IHtcbiAgICAgICAgY2VudGVyOiBwYXJhbXMuY2VudGVyIHx8IFswLCAwXSxcbiAgICAgICAgY3JzOiBMLkNSUy5TaW1wbGUsXG4gICAgICAgIHpvb206IHBhcmFtcy56b29tIHx8IDAsXG4gICAgICAgIGFmdGVyUmVuZGVyOiB0aGlzLm1hcFxuICAgIH07XG5cbiAgICB0aGlzLmltYWdlUHJvcGVydHlVcGRhdGUgPSAobG9jYXRpb24sIHZpZXdtb2RlbCwgZXZlbnQpID0+IHtcbiAgICAgICAgaWYoc2VsZi5mbG9hdGluZ0xvY2F0aW9uKCkgPT0gbG9jYXRpb24gfHwgIXNlbGYuc2hvd0ltYWdlTW9kaWZpZXJzKCkpe1xuICAgICAgICAgICAgc2VsZi5zaG93SW1hZ2VNb2RpZmllcnMoIXNlbGYuc2hvd0ltYWdlTW9kaWZpZXJzKCkpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZmxvYXRpbmdMb2NhdGlvbihsb2NhdGlvbik7XG4gICAgICAgIGlmKHNlbGYuZmxvYXRpbmdMb2NhdGlvbigpID09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdFByaW1hcnlQYW5lbCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0UHJpbWFyeVBhbmVsKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoaXMuZmlsZVVwZGF0ZSA9ICguLi5wYXJhbXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICB9O1xuXG4gICAgbGV0IGNhbnZhc0xheWVyO1xuICAgIGxldCBzZWNvbmRhcnlDYW52YXNMYXllcjtcbiAgICBsZXQgc2lkZUJ5U2lkZUNvbnRyb2w7XG4gICAgdGhpcy5icmlnaHRuZXNzID0ga28ub2JzZXJ2YWJsZSgxMDApO1xuICAgIHRoaXMuY29udHJhc3QgPSBrby5vYnNlcnZhYmxlKDEwMCk7XG4gICAgdGhpcy5zYXR1cmF0aW9uID0ga28ub2JzZXJ2YWJsZSgxMDApO1xuICAgIHRoaXMuZ3JleXNjYWxlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG5cbiAgICB0aGlzLmNhbnZhc0ZpbHRlciA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGIgPSBzZWxmLmJyaWdodG5lc3MoKSAvIDEwMDtcbiAgICAgICAgdmFyIGMgPSBzZWxmLmNvbnRyYXN0KCkgLyAxMDA7XG4gICAgICAgIHZhciBzID0gc2VsZi5zYXR1cmF0aW9uKCkgLyAxMDA7XG4gICAgICAgIHZhciBnID0gc2VsZi5ncmV5c2NhbGUoKSA/IDEgOiAwO1xuICAgICAgICByZXR1cm4gJ2JyaWdodG5lc3MoJyArIGIgKyAnKSBjb250cmFzdCgnICsgYyArICcpICcgK1xuICAgICAgICAgICAgJ3NhdHVyYXRlKCcgKyBzICsgJykgZ3JheXNjYWxlKCcgKyBnICsgJyknO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYW52YXNGaWx0ZXJPYmplY3QgPSBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCBicmlnaHRuZXNzID0gc2VsZi5icmlnaHRuZXNzKCk7XG4gICAgICAgIGNvbnN0IGNvbnRyYXN0ID0gc2VsZi5jb250cmFzdCgpO1xuICAgICAgICBjb25zdCBzYXR1cmF0aW9uID0gc2VsZi5zYXR1cmF0aW9uKCk7XG4gICAgICAgIGNvbnN0IGdyZXlzY2FsZSA9IHNlbGYuZ3JleXNjYWxlKCk7XG5cbiAgICAgICAgcmV0dXJuIHsgYnJpZ2h0bmVzcywgY29udHJhc3QsIHNhdHVyYXRpb24sIGdyZXlzY2FsZSB9O1xuICAgIH0pO1xuXG4gICAgdmFyIHVwZGF0ZUNhbnZhc0xheWVyRmlsdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXIgPSBzZWxmLmNhbnZhc0ZpbHRlcigpO1xuICAgICAgICB2YXIgbWFwID0gc2VsZi5tYXAoKTtcbiAgICAgICAgbGV0IGxheWVyO1xuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBpZihzZWxmLnNlbGVjdFByaW1hcnlQYW5lbCgpKXtcbiAgICAgICAgICAgICAgICBsYXllciA9IG1hcC5nZXRQYW5lKCd0aWxlUGFuZScpLnF1ZXJ5U2VsZWN0b3IoJy5paWlmLWxheWVyLXByaW1hcnknKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIgPSBtYXAuZ2V0UGFuZSgndGlsZVBhbmUnKS5xdWVyeVNlbGVjdG9yKCcuaWlpZi1sYXllci1zZWNvbmRhcnknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGxheWVyICYmIGxheWVyICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBsYXllci5zdHlsZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuY2FudmFzRmlsdGVyLnN1YnNjcmliZSh1cGRhdGVDYW52YXNMYXllckZpbHRlcik7XG5cbiAgICB0aGlzLnJlc2V0SW1hZ2VTZXR0aW5ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLmJyaWdodG5lc3MoMTAwKTtcbiAgICAgICAgc2VsZi5jb250cmFzdCgxMDApO1xuICAgICAgICBzZWxmLnNhdHVyYXRpb24oMTAwKTtcbiAgICAgICAgc2VsZi5ncmV5c2NhbGUoZmFsc2UpO1xuICAgIH07XG5cbiAgICBjb25zdCB6b29tVG9Cb3VuZHMgPSAobWFwLCBsYXllcikgPT4ge1xuICAgICAgICB2YXIgaW5pdGlhbFpvb20gPSBsYXllci5fZ2V0SW5pdGlhbFpvb20obWFwLmdldFNpemUoKSk7XG4gICAgICAgIHZhciBpbWFnZVNpemUgPSBsYXllci5faW1hZ2VTaXplc1tpbml0aWFsWm9vbV07XG4gICAgICAgIHZhciBzdyA9IG1hcC5vcHRpb25zLmNycy5wb2ludFRvTGF0TG5nKEwucG9pbnQoMCwgaW1hZ2VTaXplLnkpLCBpbml0aWFsWm9vbSk7XG4gICAgICAgIHZhciBuZSA9IG1hcC5vcHRpb25zLmNycy5wb2ludFRvTGF0TG5nKEwucG9pbnQoaW1hZ2VTaXplLngsIDApLCBpbml0aWFsWm9vbSk7XG4gICAgICAgIHZhciBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhzdywgbmUpO1xuICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGxvYWRDb21wYXJpc29uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSBzZWxmLm1hcCgpO1xuICAgICAgICBpZihtYXAgJiYgY2FudmFzTGF5ZXIuZ2V0Q29udGFpbmVyKCkgJiYgc2Vjb25kYXJ5Q2FudmFzTGF5ZXI/LmdldENvbnRhaW5lcigpIC8qc2VsZi5wcmltYXJ5TGF5ZXJMb2FkZWQgJiYgc2VsZi5zZWNvbmRhcnlMYXllckxvYWRlZCovKXtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgY29udHJvbCBpZiBpdCdzIGJlZW4gYWRkZWQgdG8gdGhlIG1hcCBhbHJlYWR5XG4gICAgICAgICAgICBpZihzZWxmLnpvb21Ub0NhbnZhcyl7XG4gICAgICAgICAgICAgICAgem9vbVRvQm91bmRzKG1hcCwgY2FudmFzTGF5ZXIpO1xuICAgICAgICAgICAgICAgIC8vbWFwLmZpdEJvdW5kcyhjYW52YXNMYXllci5nZXRCb3VuZHMoKSlcbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Ub0NhbnZhcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYWRkIHRoZSBjb250cm9sIGJhY2ssIGNvbXBhcmluZyB0aGUgYXBwcm9wcmlhdGUgbGF5ZXJzXG4gICAgICAgICAgICBpZighc2lkZUJ5U2lkZUNvbnRyb2wpe1xuICAgICAgICAgICAgICAgIHNpZGVCeVNpZGVDb250cm9sID0gTC5jb250cm9sLnNpZGVCeVNpZGUoY2FudmFzTGF5ZXIsIHNlY29uZGFyeUNhbnZhc0xheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2lkZUJ5U2lkZUNvbnRyb2wuc2V0TGVmdExheWVycyhjYW52YXNMYXllcik7XG4gICAgICAgICAgICAgICAgc2lkZUJ5U2lkZUNvbnRyb2wuc2V0UmlnaHRMYXllcnMoc2Vjb25kYXJ5Q2FudmFzTGF5ZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighc2lkZUJ5U2lkZUNvbnRyb2w/Ll9tYXApIHtcbiAgICAgICAgICAgICAgICBzaWRlQnlTaWRlQ29udHJvbC5hZGRUbyhtYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciB1cGRhdGVQcmltYXJ5Q2FudmFzTGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbWFwID0gc2VsZi5tYXAoKTtcbiAgICAgICAgY29uc3QgY2FudmFzID0gc2VsZi5jYW52YXMoKTtcblxuICAgICAgICBpZihzZWxmLnNlbGVjdFByaW1hcnlQYW5lbCgpICYmIGNhbnZhcyAmJiBjYW52YXMgIT0gc2VsZi5pbWFnZVRvb2xTZWxlY3RvcigpKXtcbiAgICAgICAgICAgIHNlbGYuaW1hZ2VUb29sU2VsZWN0b3IoY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXAgJiYgY2FudmFzKSB7XG4gICAgICAgICAgICBpZiAoY2FudmFzTGF5ZXIgJiYgbWFwLmhhc0xheWVyKGNhbnZhc0xheWVyKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5yZW1vdmVMYXllcihjYW52YXNMYXllcik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlL3Ntb3RoZXIgaWYgcmVtb3ZlIGxheWVyIGZhaWxzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbnZhc0xheWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbnZhcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxheWVySW5mb1VybCA9IGNhbnZhcyArICcvaW5mby5qc29uJztcbiAgICAgICAgICAgICAgICBjYW52YXNMYXllciA9IGdldExheWVyKGxheWVySW5mb1VybCwgbGF5ZXJzKTtcblxuICAgICAgICAgICAgICAgIGlmKCFjYW52YXNMYXllcil7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc0xheWVyID0gTC50aWxlTGF5ZXIuaWlpZihsYXllckluZm9VcmwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpdEJvdW5kczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiaWlpZi1sYXllci1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FudmFzTGF5ZXIub24oJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmNvbXBhcmVNb2RlKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRDb21wYXJpc29uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzZWxmLmNvbXBhcmVNb2RlKCkgJiYgc2VsZi56b29tVG9DYW52YXMgJiYgY2FudmFzTGF5ZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpvb21Ub0JvdW5kcyhtYXAsIGNhbnZhc0xheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Ub0NhbnZhcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBsYXllcnMucHVzaChjYW52YXNMYXllcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbnZhc0xheWVyLmFkZFRvKG1hcCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlQ2FudmFzTGF5ZXJGaWx0ZXIoKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGdldExheWVyID0gKHVybCwgbGF5ZXJzKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbGF5ZXJzLmZpbHRlcihsYXllciA9PiBsYXllci5faW5mb1VybCA9PSB1cmwpO1xuICAgICAgICBpZihtYXRjaC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaFswXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVTZWNvbmRhcnlDYW52YXNMYXllciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbWFwID0gc2VsZi5tYXAoKTtcbiAgICAgICAgY29uc3QgcHJpbWFyeUNhbnZhcyA9IHNlbGYuY2FudmFzKCk7XG4gICAgICAgIGNvbnN0IHNlY29uZGFyeUNhbnZhcyA9IHNlbGYuc2Vjb25kYXJ5Q2FudmFzKCk7XG4gICAgICAgIGlmKHNlY29uZGFyeUNhbnZhcyAmJiBzZWNvbmRhcnlDYW52YXMgIT0gc2VsZi5pbWFnZVRvb2xTZWxlY3RvcigpKXtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0UHJpbWFyeVBhbmVsKGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYuaW1hZ2VUb29sU2VsZWN0b3Ioc2Vjb25kYXJ5Q2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXAgJiYgcHJpbWFyeUNhbnZhcyAmJiBzZWNvbmRhcnlDYW52YXMpIHtcbiAgICAgICAgICAgIGlmKHNlY29uZGFyeUNhbnZhc0xheWVyICYmIG1hcC5oYXNMYXllcihzZWNvbmRhcnlDYW52YXNMYXllcikpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBtYXAucmVtb3ZlTGF5ZXIoc2Vjb25kYXJ5Q2FudmFzTGF5ZXIpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZS9zbW90aGVyIGlmIHJlbW92ZSBsYXllciBmYWlsc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlDYW52YXNMYXllciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbGF5ZXJJbmZvVXJsID0gc2Vjb25kYXJ5Q2FudmFzICsgJy9pbmZvLmpzb24nO1xuICAgICAgICAgICAgc2Vjb25kYXJ5Q2FudmFzTGF5ZXIgPSBnZXRMYXllcihsYXllckluZm9VcmwsIHNlY29uZGFyeUxheWVycyk7XG5cbiAgICAgICAgICAgIGlmKCFzZWNvbmRhcnlDYW52YXNMYXllcil7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5Q2FudmFzTGF5ZXIgPSBMLnRpbGVMYXllci5paWlmKGxheWVySW5mb1VybCwge1xuICAgICAgICAgICAgICAgICAgICBmaXRCb3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiaWlpZi1sYXllci1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5Q2FudmFzTGF5ZXIub24oJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY29tcGFyZU1vZGUoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkQ29tcGFyaXNvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlMYXllcnMucHVzaChzZWNvbmRhcnlDYW52YXNMYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWNvbmRhcnlDYW52YXNMYXllci5hZGRUbyhtYXApO1xuXG4gICAgICAgICAgICB1cGRhdGVDYW52YXNMYXllckZpbHRlcigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubWFwLnN1YnNjcmliZShmdW5jdGlvbihtYXApIHtcbiAgICAgICAgTC5jb250cm9sLmZ1bGxzY3JlZW4oe1xuICAgICAgICAgICAgZnVsbHNjcmVlbkVsZW1lbnQ6ICQobWFwLmdldENvbnRhaW5lcigpKS5jbG9zZXN0KCcud29ya2JlbmNoLWNhcmQtd3JhcHBlcicpWzBdXG4gICAgICAgIH0pLmFkZFRvKG1hcCk7XG4gICAgICAgIHVwZGF0ZVByaW1hcnlDYW52YXNMYXllcigpO1xuICAgICAgICBtYXAuYWRkTGF5ZXIoYW5ub3RhdGlvbkZlYXR1cmVHcm91cCk7XG4gICAgfSk7XG4gICAgdGhpcy5jYW52YXMuc3Vic2NyaWJlKHVwZGF0ZVByaW1hcnlDYW52YXNMYXllcik7XG4gICAgdGhpcy5zZWNvbmRhcnlDYW52YXMuc3Vic2NyaWJlKHVwZGF0ZVNlY29uZGFyeUNhbnZhc0xheWVyKTtcblxuICAgIHRoaXMuc2V0U2Vjb25kYXJ5Q2FudmFzID0gKGNhbnZhcykgPT4ge1xuICAgICAgICBjb25zdCBzZXJ2aWNlID0gc2VsZi5nZXRDYW52YXNTZXJ2aWNlKGNhbnZhcyk7XG4gICAgICAgIGlmKHNlcnZpY2Upe1xuICAgICAgICAgICAgc2VsZi5zZWNvbmRhcnlDYW52YXMoc2VydmljZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zZWxlY3RDYW52YXMgPSBmdW5jdGlvbihjYW52YXMpIHtcblxuICAgICAgICBjb25zdCBzZXJ2aWNlID0gc2VsZi5nZXRDYW52YXNTZXJ2aWNlKGNhbnZhcyk7XG5cbiAgICAgICAgaWYgKHNlcnZpY2UgJiYgc2VsZi5zZWxlY3RQcmltYXJ5UGFuZWwoKSkge1xuICAgICAgICAgICAgc2VsZi5jYW52YXMoc2VydmljZSk7XG4gICAgICAgICAgICBzZWxmLmNhbnZhc09iamVjdChjYW52YXMpO1xuICAgICAgICAgICAgc2VsZi5jYW52YXNMYWJlbChzZWxmLmdldE1hbmlmZXN0RGF0YVZhbHVlKGNhbnZhcywgJ2xhYmVsJywgdHJ1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5zZWNvbmRhcnlDYW52YXMoc2VydmljZSk7XG4gICAgICAgICAgICBzZWxmLnNlY29uZGFyeUNhbnZhc09iamVjdChjYW52YXMpO1xuICAgICAgICAgICAgc2VsZi5jYW52YXNMYWJlbChzZWxmLmdldE1hbmlmZXN0RGF0YVZhbHVlKGNhbnZhcywgJ2xhYmVsJywgdHJ1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYub3JpZ0NhbnZhc0xhYmVsKHNlbGYuY2FudmFzTGFiZWwoKSk7XG4gICAgfTtcblxuICAgIHRoaXMuY2FudmFzQ2xpY2sgPSBmdW5jdGlvbihjYW52YXMpIHtcbiAgICAgICAgc2VsZi5zZWxlY3RDYW52YXMoY2FudmFzKTtcbiAgICAgICAgc2VsZi5leHBhbmRHYWxsZXJ5KGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDYW52YXNTZXJ2aWNlID0gZnVuY3Rpb24oY2FudmFzKSB7XG4gICAgICAgIGlmICghY2FudmFzIHx8ICFjYW52YXMuaW1hZ2VzIHx8IGNhbnZhcy5pbWFnZXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChjYW52YXMuaW1hZ2VzWzBdICYmIGNhbnZhcy5pbWFnZXNbMF0ucmVzb3VyY2UgJiYgY2FudmFzLmltYWdlc1swXS5yZXNvdXJjZS5zZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbnZhcy5pbWFnZXNbMF0ucmVzb3VyY2Uuc2VydmljZVsnQGlkJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhY2Nlc3NpbmcgY2FudmFzIHNlcnZpY2U6XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZUNhbnZhcyA9ICFzZWxmLmNhbnZhcygpO1xuICAgIHRoaXMubWFuaWZlc3REYXRhLnN1YnNjcmliZShmdW5jdGlvbihtYW5pZmVzdERhdGEpIHtcbiAgICAgICAgaWYgKG1hbmlmZXN0RGF0YSkge1xuICAgICAgICAgICAgaWYgKG1hbmlmZXN0RGF0YS5zZXF1ZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBzZXF1ZW5jZSA9IG1hbmlmZXN0RGF0YS5zZXF1ZW5jZXNbMF07XG4gICAgICAgICAgICAgICAgdmFyIGNhbnZhc0luZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoc2VxdWVuY2UuY2FudmFzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGYudXBkYXRlQ2FudmFzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJbmRleCA9IHNlcXVlbmNlLmNhbnZhc2VzLmZpbmRJbmRleChmdW5jdGlvbihjKXtyZXR1cm4gYy5pbWFnZXNbMF0ucmVzb3VyY2Uuc2VydmljZVsnQGlkJ10gPT09IHNlbGYuY2FudmFzKCk7fSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbnZhcyA9IHNlcXVlbmNlLmNhbnZhc2VzW2NhbnZhc0luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlY29uZGFyeUNhbnZhc0xheWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbnZhc0xheWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gc2VsZi5nZXRDYW52YXNTZXJ2aWNlKGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRvQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYW52YXMoc2VydmljZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FudmFzT2JqZWN0KGNhbnZhcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jb21wYXJlTW9kZSgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2Vjb25kYXJ5Q2FudmFzKHNlcnZpY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWNvbmRhcnlDYW52YXNPYmplY3QoY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYudXBkYXRlQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYub3JpZ01hbmlmZXN0TmFtZSA9IHNlbGYuZ2V0TWFuaWZlc3REYXRhVmFsdWUobWFuaWZlc3REYXRhLCAnbGFiZWwnLCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubWFuaWZlc3ROYW1lKHNlbGYub3JpZ01hbmlmZXN0TmFtZSk7XG4gICAgICAgICAgICBzZWxmLm9yaWdNYW5pZmVzdERlc2NyaXB0aW9uID0gc2VsZi5nZXRNYW5pZmVzdERhdGFWYWx1ZShtYW5pZmVzdERhdGEsICdkZXNjcmlwdGlvbicsIHRydWUpO1xuICAgICAgICAgICAgc2VsZi5tYW5pZmVzdERlc2NyaXB0aW9uKHNlbGYub3JpZ01hbmlmZXN0RGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgc2VsZi5vcmlnTWFuaWZlc3RBdHRyaWJ1dGlvbiA9IHNlbGYuZ2V0TWFuaWZlc3REYXRhVmFsdWUobWFuaWZlc3REYXRhLCAnYXR0cmlidXRpb24nLCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubWFuaWZlc3RBdHRyaWJ1dGlvbihzZWxmLm9yaWdNYW5pZmVzdEF0dHJpYnV0aW9uKTtcbiAgICAgICAgICAgIHNlbGYub3JpZ01hbmlmZXN0TG9nbyA9IHNlbGYuZ2V0TWFuaWZlc3REYXRhVmFsdWUobWFuaWZlc3REYXRhLCAnbG9nbycsIHRydWUpO1xuICAgICAgICAgICAgc2VsZi5tYW5pZmVzdExvZ28oc2VsZi5vcmlnTWFuaWZlc3RMb2dvKTtcbiAgICAgICAgICAgIHNlbGYub3JpZ01hbmlmZXN0TWV0YWRhdGEgPSBrb01hcHBpbmcudG9KU09OKHNlbGYuZ2V0TWFuaWZlc3REYXRhVmFsdWUobWFuaWZlc3REYXRhLCAnbWV0YWRhdGEnKSk7XG4gICAgICAgICAgICBzZWxmLm1hbmlmZXN0TWV0YWRhdGEucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICBzZWxmLmdldE1hbmlmZXN0RGF0YVZhbHVlKG1hbmlmZXN0RGF0YSwgJ21ldGFkYXRhJykuZm9yRWFjaChmdW5jdGlvbihlbnRyeSl7XG4gICAgICAgICAgICAgICAgc2VsZi5tYW5pZmVzdE1ldGFkYXRhLnB1c2goa29NYXBwaW5nLmZyb21KUyhlbnRyeSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudG9nZ2xlTWFuaWZlc3RFZGl0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5lZGl0TWFuaWZlc3QoIXNlbGYuZWRpdE1hbmlmZXN0KCkpO1xuICAgICAgICBpZiAoYWJvcnRGZXRjaE1hbmlmZXN0KSBhYm9ydEZldGNoTWFuaWZlc3QuYWJvcnQoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRBbm5vdGF0aW9uQ291bnQgPSBmdW5jdGlvbihjYW52YXNJZCkge1xuICAgICAgICBjb25zdCBjb3VudHMgPSBzZWxmLmFubm90YXRpb25Db3VudHMoKTtcbiAgICAgICAgcmV0dXJuIGNvdW50cyAmJiBjb3VudHNbY2FudmFzSWRdID8gY291bnRzW2NhbnZhc0lkXSA6IDA7XG4gICAgfTtcbn07XG5rby5jb21wb25lbnRzLnJlZ2lzdGVyKCdpaWlmLXZpZXdlcicsIHtcbiAgICB2aWV3TW9kZWw6IElJSUZWaWV3ZXJWaWV3bW9kZWwsXG4gICAgdGVtcGxhdGU6IGlpaWZWaWV3ZXJUZW1wbGF0ZSxcbn0pO1xuZXhwb3J0IGRlZmF1bHQgSUlJRlZpZXdlclZpZXdtb2RlbDtcbiJdLCJuYW1lcyI6WyJkZWZpbmUiLCJyIiwiZSIsIm4iLCJ0IiwibyIsImkiLCJmIiwiYyIsInJlcXVpcmUiLCJ1IiwiYSIsIkVycm9yIiwiY29kZSIsInAiLCJleHBvcnRzIiwiY2FsbCIsImxlbmd0aCIsIm1vZHVsZSIsImdsb2JhbCIsIkwiLCJ3aW5kb3ciLCJtYXBXYXNEcmFnRW5hYmxlZCIsIm1hcFdhc1RhcEVuYWJsZWQiLCJvbiIsImVsIiwidHlwZXMiLCJmbiIsImNvbnRleHQiLCJzcGxpdCIsImZvckVhY2giLCJ0eXBlIiwiRG9tRXZlbnQiLCJvZmYiLCJnZXRSYW5nZUV2ZW50IiwicmFuZ2VJbnB1dCIsImNhbmNlbE1hcERyYWciLCJfbWFwIiwiZHJhZ2dpbmciLCJlbmFibGVkIiwidGFwIiwiZGlzYWJsZSIsInVuY2FuY2VsTWFwRHJhZyIsIl9yZWZvY3VzT25NYXAiLCJlbmFibGUiLCJhc0FycmF5IiwiYXJnIiwiQXJyYXkiLCJpc0FycmF5Iiwibm9vcCIsIkNvbnRyb2wiLCJTaWRlQnlTaWRlIiwiZXh0ZW5kIiwib3B0aW9ucyIsInRodW1iU2l6ZSIsInBhZGRpbmciLCJpbml0aWFsaXplIiwibGVmdExheWVycyIsInJpZ2h0TGF5ZXJzIiwic2V0TGVmdExheWVycyIsInNldFJpZ2h0TGF5ZXJzIiwic2V0T3B0aW9ucyIsImdldFBvc2l0aW9uIiwicmFuZ2VWYWx1ZSIsIl9yYW5nZSIsInZhbHVlIiwib2Zmc2V0IiwiZ2V0U2l6ZSIsIngiLCJzZXRQb3NpdGlvbiIsImluY2x1ZGVzIiwiRXZlbnRlZCIsInByb3RvdHlwZSIsIk1peGluIiwiRXZlbnRzIiwiYWRkVG8iLCJtYXAiLCJyZW1vdmUiLCJjb250YWluZXIiLCJfY29udGFpbmVyIiwiRG9tVXRpbCIsImNyZWF0ZSIsIl9jb250cm9sQ29udGFpbmVyIiwiX2RpdmlkZXIiLCJyYW5nZSIsIm1pbiIsIm1heCIsInN0ZXAiLCJzdHlsZSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiX2FkZEV2ZW50cyIsIl91cGRhdGVMYXllcnMiLCJfbGVmdExheWVyIiwiZ2V0Q29udGFpbmVyIiwiY2xpcCIsIl9yaWdodExheWVyIiwiX3JlbW92ZUV2ZW50cyIsIl9sZWZ0TGF5ZXJzIiwiX3JpZ2h0TGF5ZXJzIiwiX3VwZGF0ZUNsaXAiLCJudyIsImNvbnRhaW5lclBvaW50VG9MYXllclBvaW50Iiwic2UiLCJjbGlwWCIsImRpdmlkZXJYIiwibGVmdCIsImZpcmUiLCJjbGlwTGVmdCIsInkiLCJqb2luIiwiY2xpcFJpZ2h0IiwicHJldkxlZnQiLCJwcmV2UmlnaHQiLCJsYXllciIsImhhc0xheWVyIiwiQnJvd3NlciIsInRvdWNoIiwiY29udHJvbCIsInNpZGVCeVNpZGUiLCJzZWxmIiwiaW5qZWN0IiwiY3NzIiwidW5kZWZpbmVkIiwiaW5qZWN0U3R5bGVUYWciLCJkb2N1bWVudCIsImZpbGVOYW1lIiwiY2IiLCJnZXRFbGVtZW50QnlJZCIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImFwcGVuZENoaWxkIiwiY3VzdG9tRG9jdW1lbnQiLCJkb2MiLCJjcmVhdGVTdHlsZVNoZWV0Iiwic2hlZXQiLCJjc3NUZXh0Iiwib3duZXJOb2RlIiwic3R5bGVTaGVldCIsImlubmVySFRNTCIsImJ5VXJsIiwidXJsIiwibGluayIsInJlbCIsImhyZWYiLCJTeW1ib2wiLCJpdGVyYXRvciIsInRvU3RyaW5nVGFnIiwiR2VuZXJhdG9yIiwiT2JqZWN0IiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsIkciLCJ2IiwiZCIsImJpbmQiLCJsIiwiVHlwZUVycm9yIiwiZG9uZSIsInJldHVybiIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIm93bktleXMiLCJrZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZmlsdGVyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsImFyZ3VtZW50cyIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9uZXh0IiwiX3Rocm93IiwiJCIsImtvIiwia29NYXBwaW5nIiwiYXJjaGVzIiwiV29ya2JlbmNoVmlld21vZGVsIiwiaWlpZlBvcHVwIiwiaWlpZlZpZXdlclRlbXBsYXRlIiwic2VsZWN0V29vVXRpbHMiLCJzZWxlY3RXb29BcnJheUFkYXB0ZXIiLCJJSUlGVmlld2VyVmlld21vZGVsIiwicGFyYW1zIiwiX3RoaXMiLCJhYm9ydEZldGNoTWFuaWZlc3QiLCJnZXRNYW5pZmVzdERhdGFWYWx1ZSIsIm9iamVjdCIsInByb3BlcnR5IiwicmV0dXJuRmlyc3RWYWwiLCJ2YWwiLCJvYnNlcnZhYmxlIiwibWFuaWZlc3QiLCJlZGl0TWFuaWZlc3QiLCJjYW52YXMiLCJtYW5pZmVzdExvYWRpbmciLCJtYW5pZmVzdERhdGEiLCJtYW5pZmVzdEVycm9yIiwibWFuaWZlc3ROYW1lIiwibWFuaWZlc3REZXNjcmlwdGlvbiIsIm1hbmlmZXN0QXR0cmlidXRpb24iLCJtYW5pZmVzdExvZ28iLCJtYW5pZmVzdE1ldGFkYXRhIiwiZnJvbUpTIiwiY2FudmFzTGFiZWwiLCJ6b29tVG9DYW52YXMiLCJ6b29tIiwiY2VudGVyIiwiYW5ub3RhdGlvbk5vZGVzIiwib2JzZXJ2YWJsZUFycmF5IiwiYW5ub3RhdGlvbkNvdW50cyIsImNvbXBhcmVNb2RlIiwicHJpbWFyeUNhbnZhcyIsImNhbnZhc09iamVjdCIsInNlY29uZGFyeUNhbnZhc09iamVjdCIsInNlY29uZGFyeUNhbnZhcyIsImNvbXBhcmVJbnN0cnVjdGlvbiIsInByaW1hcnlUaWxlc0xvYWRlZCIsInNlY29uZGFyeVRpbGVzTG9hZGVkIiwic2VsZWN0UHJpbWFyeVBhbmVsIiwic2Vjb25kYXJ5TGFiZWwiLCJpbWFnZVRvb2xTZWxlY3RvciIsImZsb2F0aW5nTG9jYXRpb24iLCJzaG93SW1hZ2VNb2RpZmllcnMiLCJyZW5kZXJDb250ZXh0Iiwic2hvd01vZGVTZWxlY3RvciIsInByaW1hcnlMYXllckxvYWRlZCIsInNlY29uZGFyeUxheWVyTG9hZGVkIiwicHJpbWFyeVBhbmVsRmlsdGVycyIsInNlY29uZGFyeVBhbmVsRmlsdGVycyIsImxheWVycyIsInNlY29uZGFyeUxheWVycyIsImNhY2hlZEFubm90YXRpb25zIiwib3JpZ0NhbnZhc0xhYmVsIiwic3Vic2NyaWJlIiwibGFiZWwiLCJjYW52YXNGaWx0ZXJPYmplY3QiLCJicmlnaHRuZXNzIiwic2F0dXJhdGlvbiIsImNvbnRyYXN0IiwiZ3JleXNjYWxlIiwiX3NlbGYkc2Vjb25kYXJ5Q2FudmFzIiwiX3NlbGYkc2Vjb25kYXJ5Q2FudmFzMiIsIm1vZGUiLCJfc2lkZUJ5U2lkZUNvbnRyb2wiLCJzZWNvbmRhcnlDYW52YXNMYXllciIsInJlbW92ZUxheWVyIiwic2lkZUJ5U2lkZUNvbnRyb2wiLCJyZW1vdmVDb250cm9sIiwiY2FudmFzQ2xpY2siLCJwYW5lbFJhZGlvIiwicHVyZUNvbXB1dGVkIiwic2hvd0xvZ28iLCJpbWFnZUV4dGVuc3Rpb24iLCJmaW5kIiwiZXh0IiwiZW5kc1dpdGgiLCJidWlsZEFubm90YXRpb25Ob2RlcyIsImpzb24iLCJub2RlUHJvY2Vzc2luZ1N0YXR1cyIsIm5vZGUiLCJhbm5vdGF0aW9ucyIsIm5vZGVpZCIsInByb2Nlc3NpbmciLCJjb21wbGV0ZWQiLCJ1cGRhdGVBbm5vdGF0aW9ucyIsIl9yZWYiLCJfY2FsbGVlIiwiYW5ub3RhdGlvbnNVcmwiLCJyZXNwb25zZSIsImpzb25SZXNwb25zZSIsImFubm90YXRpb24iLCJjb3VudHMiLCJfdCIsIl9jb250ZXh0IiwidXJscyIsImlpaWZhbm5vdGF0aW9ucyIsImZldGNoIiwiZmVhdHVyZXMiLCJmZWF0dXJlIiwicHJvcGVydGllcyIsImdyYXBoTmFtZSIsImNvbnNvbGUiLCJlcnJvciIsInByZWxvYWRBbGxBbm5vdGF0aW9ucyIsIl9yZWYyIiwiX2NhbGxlZTQiLCJjYW52YXNlcyIsInByb2Nlc3NlZENvdW50IiwiQkFUQ0hfU0laRSIsIl9wcm9jZXNzQmF0Y2giLCJfY29udGV4dDUiLCJwcm9jZXNzQmF0Y2giLCJfcmVmMyIsIl9jYWxsZWUzIiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwiYmF0Y2hQcm9taXNlcyIsIl9sb29wIiwiX2NvbnRleHQ0IiwiTWF0aCIsImNhbnZhc0lkIiwiX2NvbnRleHQzIiwiZ2V0Q2FudmFzU2VydmljZSIsIl9jYWxsZWUyIiwiY3VycmVudENvdW50cyIsIl90MiIsIl9jb250ZXh0MiIsIl9yZWdlbmVyYXRvclZhbHVlcyIsImFsbCIsInNldFRpbWVvdXQiLCJfeCIsImluaXRpYWxpemVBbm5vdGF0aW9uTG9hZGluZyIsIl9yZWY1IiwiX2NhbGxlZTUiLCJfY29udGV4dDYiLCJuYW1lIiwiaWNvbiIsImFjdGl2ZSIsIm9wYWNpdHkiLCJpaWlmYW5ub3RhdGlvbm5vZGVzIiwiYW5ub3RhdGlvbkxheWVyIiwiY29tcHV0ZWQiLCJhbm5vdGF0aW9uRmVhdHVyZXMiLCJ0aWxlIiwidGlsZWlkIiwidGlsZUlkIiwib3BhY2l0eU1vZGlmaWVyIiwiY29uY2F0IiwiZ2VvSnNvbiIsInBvaW50VG9MYXllciIsImxhdGxuZyIsIm1vZGlmaWVyIiwiY29sb3IiLCJmaWxsQ29sb3IiLCJ3ZWlnaHQiLCJyYWRpdXMiLCJmaWxsT3BhY2l0eSIsImNpcmNsZU1hcmtlciIsIm9uRWFjaEZlYXR1cmUiLCJwb3B1cCIsImNsb3NlQnV0dG9uIiwibWF4V2lkdGgiLCJzZXRDb250ZW50IiwicG9wdXBEYXRhIiwiY2xvc2VQb3B1cCIsInJlc291cmNlSWQiLCJyZXNvdXJjZV9yZXBvcnQiLCJ0cmFuc2xhdGlvbnMiLCJyZXNvdXJjZV9kZXNjcmlwdG9ycyIsInJlc291cmNlaW5zdGFuY2VpZCIsImRlc2NyaXB0b3JzIiwiZGlzcGxheW5hbWUiLCJkZXNjcmlwdGlvbiIsInBvcHVwRWxlbWVudCIsImdldEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYXBwbHlCaW5kaW5nc1RvRGVzY2VuZGFudHMiLCJiaW5kUG9wdXAiLCJhbm5vdGF0aW9uRmVhdHVyZUdyb3VwIiwiRmVhdHVyZUdyb3VwIiwibmV3QW5ub3RhdGlvbkxheWVyIiwiY2xlYXJMYXllcnMiLCJhZGRMYXllciIsInNlcXVlbmNlcyIsInNlcXVlbmNlIiwidGh1bWJuYWlsIiwiaW1hZ2VzIiwicmVzb3VyY2UiLCJ0ZXh0IiwidmFsaWRhdGVVcmwiLCJ0ZXN0IiwicXVlcnlUZXJtIiwibGltaXQiLCJtYW5pZmVzdFNlbGVjdENvbmZpZyIsImNsaWNrQnViYmxlIiwibXVsdGlwbGUiLCJjbG9zZU9uU2VsZWN0IiwiYWxsb3dDbGVhciIsInBsYWNlaG9sZGVyIiwic2VsZWN0QU1hbmlmZXN0IiwiYWpheCIsImlpaWZtYW5pZmVzdCIsImRhdGFUeXBlIiwicXVpZXRNaWxsaXMiLCJkYXRhIiwicmVxdWVzdFBhcmFtcyIsInRlcm0iLCJwYWdlIiwic3RhcnQiLCJxdWVyeSIsInByb2Nlc3NSZXN1bHRzIiwicmVzdWx0cyIsInVuc2hpZnQiLCJpdGVtIiwibW9yZSIsInRlbXBsYXRlUmVzdWx0IiwidGVtcGxhdGVTZWxlY3Rpb24iLCJDdXN0b21EYXRhQWRhcHRlckNsYXNzIiwiQ3VzdG9tRGF0YUFkYXB0ZXIiLCJEZWNvcmF0ZSIsImN1cnJlbnQiLCJjYWxsYmFjayIsIl90aGlzMiIsImNhbnZhc09iaiIsInNwbGl0U2VsZWN0Q29uZmlnIiwiZGF0YUFkYXB0ZXIiLCJkcm9wZG93bkNzc0NsYXNzIiwibG9hZGluZyIsInJpZ2h0U2lkZVNlbGVjdENvbmZpZyIsImxlZnRTaWRlU2VsZWN0Q29uZmlnIiwiaW1hZ2VUb29sQ29uZmlnIiwiZ2V0TWFuaWZlc3REYXRhIiwibWFuaWZlc3RVUkwiLCJBYm9ydENvbnRyb2xsZXIiLCJzaWduYWwiLCJjYXRjaCIsIm1lc3NhZ2UiLCJmaW5hbGx5IiwiYWN0aXZlVGFiIiwiaW52YWxpZGF0ZVNpemUiLCJzaG93R2FsbGVyeSIsImV4cGFuZEdhbGxlcnkiLCJ0b2dnbGVHYWxsZXJ5IiwibGVhZmxldENvbmZpZyIsImNycyIsIkNSUyIsIlNpbXBsZSIsImFmdGVyUmVuZGVyIiwiaW1hZ2VQcm9wZXJ0eVVwZGF0ZSIsImxvY2F0aW9uIiwidmlld21vZGVsIiwiZXZlbnQiLCJmaWxlVXBkYXRlIiwiX2xlbiIsIl9rZXkiLCJsb2ciLCJjYW52YXNMYXllciIsImNhbnZhc0ZpbHRlciIsImIiLCJzIiwiZyIsInVwZGF0ZUNhbnZhc0xheWVyRmlsdGVyIiwiZ2V0UGFuZSIsInJlc2V0SW1hZ2VTZXR0aW5ncyIsInpvb21Ub0JvdW5kcyIsImluaXRpYWxab29tIiwiX2dldEluaXRpYWxab29tIiwiaW1hZ2VTaXplIiwiX2ltYWdlU2l6ZXMiLCJzdyIsInBvaW50VG9MYXRMbmciLCJwb2ludCIsIm5lIiwiYm91bmRzIiwibGF0TG5nQm91bmRzIiwiZml0Qm91bmRzIiwibG9hZENvbXBhcmlzb24iLCJfc2Vjb25kYXJ5Q2FudmFzTGF5ZXIiLCJfc2lkZUJ5U2lkZUNvbnRyb2wyIiwidXBkYXRlUHJpbWFyeUNhbnZhc0xheWVyIiwibGF5ZXJJbmZvVXJsIiwiZ2V0TGF5ZXIiLCJ0aWxlTGF5ZXIiLCJpaWlmIiwiY2xhc3NOYW1lIiwibWF0Y2giLCJfaW5mb1VybCIsInVwZGF0ZVNlY29uZGFyeUNhbnZhc0xheWVyIiwiZnVsbHNjcmVlbiIsImZ1bGxzY3JlZW5FbGVtZW50IiwiY2xvc2VzdCIsInNldFNlY29uZGFyeUNhbnZhcyIsInNlcnZpY2UiLCJzZWxlY3RDYW52YXMiLCJ1cGRhdGVDYW52YXMiLCJjYW52YXNJbmRleCIsImZpbmRJbmRleCIsIm9yaWdNYW5pZmVzdE5hbWUiLCJvcmlnTWFuaWZlc3REZXNjcmlwdGlvbiIsIm9yaWdNYW5pZmVzdEF0dHJpYnV0aW9uIiwib3JpZ01hbmlmZXN0TG9nbyIsIm9yaWdNYW5pZmVzdE1ldGFkYXRhIiwidG9KU09OIiwicmVtb3ZlQWxsIiwiZW50cnkiLCJ0b2dnbGVNYW5pZmVzdEVkaXRvciIsImFib3J0IiwiZ2V0QW5ub3RhdGlvbkNvdW50IiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9