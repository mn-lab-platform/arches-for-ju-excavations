"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[4632],{

/***/ 4417:
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ 4632:
/*!**************************************************************!*\
  !*** ./node_modules/cesium/Build/Cesium/Widgets/widgets.css ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ 85072);
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ 97825);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ 77659);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ 55056);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ 10540);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ 41113);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_widgets_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./widgets.css */ 7021);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_widgets_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_widgets_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_widgets_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_widgets_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ 7021:
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/cesium/Build/Cesium/Widgets/widgets.css ***!
  \****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ 71354);
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ 76314);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/getUrl.js */ 4417);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:text/plain;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIDBITKIVzLEMAAAKNSURBVEjHxdXNSxRhHAfw7zzrqhuoWJnSkrippUVSEKsHI9BTUYdAJA/RoYMREV26rAdn6tAfUARi16hQqkOBQRgUEYFWEC3OwczMjdZd92VmdWfmeelgTjO7q7gb0VzmmZnn85vvPPPMM8B/3qTcE2PPpuTZKB1eWuUQACgXYACYwVFbCTTVeZXB/i55o4LFelcAZfStYD4vpAoPGAGo4GBcQEgSOAUMQyAezwK6iQfDPXnhS/FkHZ+/8VLMWxxqWkfH3gbMRNOYi2roavbja0zHQmoFPYf8ED4Ko4aivm9MOG/u9I8mwrafeK7a/tVrNc/bARYN5noadeq7q0342vXw9CIMU6BmW8rVP9cPBPe52uu+v3O/y9sB4gkTWs6Qsk0mj5ExXMelejvA8WafYmkmGPHanTijdtvif8rx5RiCjdWKs2Cp3jWRDl96KhrbqlBeJqBOLyLQXg0IgbkZDS0dO8EZxZfPSTA9jvDDK3mT0OmP1FXh3XwEEAKdTX5MRWLgjCK4pwH3xt/YnjgLHAv4lHTCAKMMu/wV+KZGob6PoKyMQ0+sgBpZVJZn0NterxQaVqef/DRn+/EXYds/mZx2eVeAW9d65dhCEsaKCb7K8HH0gqTevyh9GDkn0VULRiaLzJKGBu9swfdaiie5RVo9ESURN8E8BE0n7ggACJy8KzghSCzp6DmwWxkaCm24EBXr8wI8Hrkq06QBiRC0t24HALS11IBTCyJl4vb1AXmzpbVYTwoVOXN0h7L8Mwtm8bXPybIQ/5FCX3dA2cr6XowvGCA02CvztAnz9+JiZk1AMxG6fEreSoBiPNmoyNnuWiWVzAIAtISO08E6pZi/3N96AIDn4E3h3P8L/wshP+txtEs4JAAAAABJRU5ErkJggg== */ 54347), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* packages/widgets/Source/shared.css */
.cesium-svgPath-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cesium-button {
  display: inline-block;
  position: relative;
  background: #303336;
  border: 1px solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 4px;
  padding: 5px 12px;
  margin: 2px 3px;
  cursor: pointer;
  overflow: hidden;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cesium-button:focus {
  color: #fff;
  fill: #fff;
  border-color: #ea4;
  outline: none;
}
.cesium-button:hover {
  color: #fff;
  fill: #fff;
  background: #48b;
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
}
.cesium-button:active {
  color: #000;
  fill: #000;
  background: #adf;
  border-color: #fff;
  box-shadow: 0 0 8px #fff;
}
.cesium-button:disabled,
.cesium-button-disabled,
.cesium-button-disabled:focus,
.cesium-button-disabled:hover,
.cesium-button-disabled:active {
  background: #303336;
  border-color: #444;
  color: #646464;
  fill: #646464;
  box-shadow: none;
  cursor: default;
}
.cesium-button option {
  background-color: #000;
  color: #eee;
}
.cesium-button option:disabled {
  color: #777;
}
.cesium-button input,
.cesium-button label {
  cursor: pointer;
}
.cesium-button input {
  vertical-align: sub;
}
.cesium-toolbar-button {
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 14%;
  padding: 0;
  vertical-align: middle;
  z-index: 0;
}
.cesium-performanceDisplay-defaultContainer {
  position: absolute;
  top: 50px;
  right: 10px;
  text-align: right;
}
.cesium-performanceDisplay {
  background-color: rgba(40, 40, 40, 0.7);
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #444;
  font: bold 12px sans-serif;
}
.cesium-performanceDisplay-fps {
  color: #e52;
}
.cesium-performanceDisplay-throttled {
  color: #a42;
}
.cesium-performanceDisplay-ms {
  color: #de3;
}

/* packages/widgets/Source/Animation/Animation.css */
.cesium-animation-theme {
  visibility: hidden;
  display: block;
  position: absolute;
  z-index: -100;
}
.cesium-animation-themeNormal {
  color: #222;
}
.cesium-animation-themeHover {
  color: #4488b0;
}
.cesium-animation-themeSelect {
  color: #242;
}
.cesium-animation-themeDisabled {
  color: #333;
}
.cesium-animation-themeKnob {
  color: #222;
}
.cesium-animation-themePointer {
  color: #2e2;
}
.cesium-animation-themeSwoosh {
  color: #8ac;
}
.cesium-animation-themeSwooshHover {
  color: #aef;
}
.cesium-animation-svgText {
  fill: #edffff;
  font-family: Sans-Serif;
  font-size: 15px;
  text-anchor: middle;
}
.cesium-animation-blank {
  fill: #000;
  fill-opacity: 0.01;
  stroke: none;
}
.cesium-animation-rectButton {
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cesium-animation-rectButton .cesium-animation-buttonGlow {
  fill: #fff;
  stroke: none;
  display: none;
}
.cesium-animation-rectButton:hover .cesium-animation-buttonGlow {
  display: block;
}
.cesium-animation-rectButton .cesium-animation-buttonPath {
  fill: #edffff;
}
.cesium-animation-rectButton .cesium-animation-buttonMain {
  stroke: #444;
  stroke-width: 1.2;
}
.cesium-animation-rectButton:hover .cesium-animation-buttonMain {
  stroke: #aef;
}
.cesium-animation-rectButton:active .cesium-animation-buttonMain {
  fill: #abd6ff;
}
.cesium-animation-buttonDisabled {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cesium-animation-buttonDisabled .cesium-animation-buttonMain {
  stroke: #555;
}
.cesium-animation-buttonDisabled .cesium-animation-buttonPath {
  fill: #818181;
}
.cesium-animation-buttonDisabled .cesium-animation-buttonGlow {
  display: none;
}
.cesium-animation-buttonToggled .cesium-animation-buttonGlow {
  display: block;
  fill: #2e2;
}
.cesium-animation-buttonToggled .cesium-animation-buttonMain {
  stroke: #2e2;
}
.cesium-animation-buttonToggled:hover .cesium-animation-buttonGlow {
  fill: #fff;
}
.cesium-animation-buttonToggled:hover .cesium-animation-buttonMain {
  stroke: #2e2;
}
.cesium-animation-shuttleRingG {
  cursor: pointer;
}
.cesium-animation-shuttleRingPointer {
  cursor: pointer;
}
.cesium-animation-shuttleRingPausePointer {
  cursor: pointer;
}
.cesium-animation-shuttleRingBack {
  fill: #181818;
  fill-opacity: 0.8;
  stroke: #333;
  stroke-width: 1.2;
}
.cesium-animation-shuttleRingSwoosh line {
  stroke: #8ac;
  stroke-width: 3;
  stroke-opacity: 0.2;
  stroke-linecap: round;
}
.cesium-animation-knobOuter {
  cursor: pointer;
  stroke: #444;
  stroke-width: 1.2;
}
.cesium-animation-knobInner {
  cursor: pointer;
}

/* packages/widgets/Source/BaseLayerPicker/BaseLayerPicker.css */
.cesium-baseLayerPicker-selected {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
.cesium-baseLayerPicker-dropDown {
  display: block;
  position: absolute;
  box-sizing: content-box;
  top: auto;
  right: 0;
  width: 320px;
  max-height: 500px;
  margin-top: 5px;
  background-color: rgba(38, 38, 38, 0.75);
  border: 1px solid #444;
  padding: 6px;
  overflow: auto;
  border-radius: 10px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transform: translate(0, -20%);
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0s 0.2s,
    opacity 0.2s ease-in,
    transform 0.2s ease-in;
}
.cesium-baseLayerPicker-dropDown-visible {
  transform: translate(0, 0);
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.cesium-baseLayerPicker-sectionTitle {
  display: block;
  font-family: sans-serif;
  font-size: 16pt;
  text-align: left;
  color: #edffff;
  margin-bottom: 4px;
}
.cesium-baseLayerPicker-choices {
  margin-bottom: 5px;
}
.cesium-baseLayerPicker-categoryTitle {
  color: #edffff;
  font-size: 11pt;
}
.cesium-baseLayerPicker-choices {
  display: block;
  border: 1px solid #888;
  border-radius: 5px;
  padding: 5px 0;
}
.cesium-baseLayerPicker-item {
  display: inline-block;
  vertical-align: top;
  margin: 2px 5px;
  width: 64px;
  text-align: center;
  cursor: pointer;
}
.cesium-baseLayerPicker-itemLabel {
  display: block;
  font-family: sans-serif;
  font-size: 8pt;
  text-align: center;
  vertical-align: middle;
  color: #edffff;
  cursor: pointer;
  word-wrap: break-word;
}
.cesium-baseLayerPicker-item:hover .cesium-baseLayerPicker-itemLabel,
.cesium-baseLayerPicker-item:focus .cesium-baseLayerPicker-itemLabel {
  text-decoration: underline;
}
.cesium-baseLayerPicker-itemIcon {
  display: inline-block;
  position: relative;
  width: inherit;
  height: auto;
  background-size: 100% 100%;
  border: solid 1px #444;
  border-radius: 9px;
  color: #edffff;
  margin: 0;
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;
}
.cesium-baseLayerPicker-item:hover .cesium-baseLayerPicker-itemIcon {
  border-color: #fff;
  box-shadow: 0 0 8px #fff, 0 0 8px #fff;
}
.cesium-baseLayerPicker-selectedItem .cesium-baseLayerPicker-itemLabel {
  color: rgb(189, 236, 248);
}
.cesium-baseLayerPicker-selectedItem .cesium-baseLayerPicker-itemIcon {
  border: double 4px rgb(189, 236, 248);
}

/* packages/engine/Source/Widget/CesiumWidget.css */
.cesium-widget {
  font-family: sans-serif;
  font-size: 16px;
  overflow: hidden;
  display: block;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.cesium-widget,
.cesium-widget canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}
.cesium-widget-credits {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  font-size: 10px;
  text-shadow: 0px 0px 2px #000000;
  padding-right: 5px;
}
.cesium-widget-errorPanel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99999;
}
.cesium-widget-errorPanel:before {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  content: "";
}
.cesium-widget-errorPanel-content {
  width: 75%;
  max-width: 500px;
  display: inline-block;
  text-align: left;
  vertical-align: middle;
  border: 1px solid #510c00;
  border-radius: 7px;
  background-color: #f0d9d5;
  font-size: 14px;
  color: #510c00;
}
.cesium-widget-errorPanel-content.expanded {
  max-width: 75%;
}
.cesium-widget-errorPanel-header {
  font-size: 18px;
  font-family:
    "Open Sans",
    Verdana,
    Geneva,
    sans-serif;
  background: #d69d93;
  border-bottom: 2px solid #510c00;
  padding-bottom: 10px;
  border-radius: 3px 3px 0 0;
  padding: 15px;
}
.cesium-widget-errorPanel-scroll {
  overflow: auto;
  font-family:
    "Open Sans",
    Verdana,
    Geneva,
    sans-serif;
  white-space: pre-wrap;
  padding: 0 15px;
  margin: 10px 0 20px 0;
}
.cesium-widget-errorPanel-buttonPanel {
  padding: 0 15px;
  margin: 10px 0 20px 0;
  text-align: right;
}
.cesium-widget-errorPanel-buttonPanel button {
  border-color: #510c00;
  background: #d69d93;
  color: #202020;
  margin: 0;
}
.cesium-widget-errorPanel-buttonPanel button:focus {
  border-color: #510c00;
  background: #f0d9d5;
  color: #510c00;
}
.cesium-widget-errorPanel-buttonPanel button:hover {
  border-color: #510c00;
  background: #f0d9d5;
  color: #510c00;
}
.cesium-widget-errorPanel-buttonPanel button:active {
  border-color: #510c00;
  background: #b17b72;
  color: #510c00;
}
.cesium-widget-errorPanel-more-details {
  text-decoration: underline;
  cursor: pointer;
}
.cesium-widget-errorPanel-more-details:hover {
  color: #2b0700;
}

/* packages/widgets/Source/CesiumInspector/CesiumInspector.css */
.cesium-cesiumInspector {
  border-radius: 5px;
  transition: width ease-in-out 0.25s;
  background: rgba(48, 51, 54, 0.8);
  border: 1px solid #444;
  color: #edffff;
  display: inline-block;
  position: relative;
  padding: 4px 12px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}
.cesium-cesiumInspector-button {
  text-align: center;
  font-size: 11pt;
}
.cesium-cesiumInspector-visible .cesium-cesiumInspector-button {
  border-bottom: 1px solid #aaa;
  padding-bottom: 3px;
}
.cesium-cesiumInspector input:enabled,
.cesium-cesiumInspector-button {
  cursor: pointer;
}
.cesium-cesiumInspector-visible {
  width: 185px;
  height: auto;
}
.cesium-cesiumInspector-hidden {
  width: 122px;
  height: 17px;
}
.cesium-cesiumInspector-sectionContent {
  max-height: 600px;
}
.cesium-cesiumInspector-section-collapsed .cesium-cesiumInspector-sectionContent {
  max-height: 0;
  padding: 0 !important;
  overflow: hidden;
}
.cesium-cesiumInspector-dropDown {
  margin: 5px 0;
  font-family: sans-serif;
  font-size: 10pt;
  width: 185px;
}
.cesium-cesiumInspector-frustumStatistics {
  padding-left: 10px;
  padding: 5px;
  background-color: rgba(80, 80, 80, 0.75);
}
.cesium-cesiumInspector-pickButton {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #444;
  color: #edffff;
  border-radius: 5px;
  padding: 3px 7px;
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 0 auto;
}
.cesium-cesiumInspector-pickButton:focus {
  outline: none;
}
.cesium-cesiumInspector-pickButton:active,
.cesium-cesiumInspector-pickButtonHighlight {
  color: #000;
  background: #adf;
  border-color: #fff;
  box-shadow: 0 0 8px #fff;
}
.cesium-cesiumInspector-center {
  text-align: center;
}
.cesium-cesiumInspector-sectionHeader {
  font-weight: bold;
  font-size: 10pt;
  margin: 0;
  cursor: pointer;
}
.cesium-cesiumInspector-pickSection {
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 3px;
  margin-bottom: 5px;
}
.cesium-cesiumInspector-sectionContent {
  margin-bottom: 10px;
  transition: max-height 0.25s;
}
.cesium-cesiumInspector-tileText {
  padding-bottom: 10px;
  border-bottom: 1px solid #aaa;
}
.cesium-cesiumInspector-relativeText {
  padding-top: 10px;
}
.cesium-cesiumInspector-sectionHeader::before {
  margin-right: 5px;
  content: "-";
  width: 1ch;
  display: inline-block;
}
.cesium-cesiumInspector-section-collapsed .cesium-cesiumInspector-sectionHeader::before {
  content: "+";
}

/* packages/widgets/Source/Cesium3DTilesInspector/Cesium3DTilesInspector.css */
ul.cesium-cesiumInspector-statistics {
  margin: 0;
  padding-top: 3px;
  padding-bottom: 3px;
}
ul.cesium-cesiumInspector-statistics + ul.cesium-cesiumInspector-statistics {
  border-top: 1px solid #aaa;
}
.cesium-cesiumInspector-slider {
  margin-top: 5px;
}
.cesium-cesiumInspector-slider input[type=number] {
  text-align: left;
  background-color: #222;
  outline: none;
  border: 1px solid #444;
  color: #edffff;
  width: 100px;
  border-radius: 3px;
  padding: 1px;
  margin-left: 10px;
  cursor: auto;
}
.cesium-cesiumInspector-slider input[type=number]::-webkit-outer-spin-button,
.cesium-cesiumInspector-slider input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.cesium-cesiumInspector-slider input[type=range] {
  margin-left: 5px;
  vertical-align: middle;
}
.cesium-cesiumInspector-hide .cesium-cesiumInspector-styleEditor {
  display: none;
}
.cesium-cesiumInspector-styleEditor {
  padding: 10px;
  border-radius: 5px;
  background: rgba(48, 51, 54, 0.8);
  border: 1px solid #444;
}
.cesium-cesiumInspector-styleEditor textarea {
  width: 100%;
  height: 300px;
  background: transparent;
  color: #edffff;
  border: none;
  padding: 0;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
}
.cesium-3DTilesInspector {
  width: 300px;
  pointer-events: all;
}
.cesium-3DTilesInspector-statistics {
  font-size: 11px;
}
.cesium-3DTilesInspector-disabledElementsInfo {
  margin: 5px 0 0 0;
  padding: 0 0 0 20px;
  color: #eed202;
}
.cesium-3DTilesInspector div,
.cesium-3DTilesInspector input[type=range] {
  width: 100%;
  box-sizing: border-box;
}
.cesium-cesiumInspector-error {
  color: #ff9e9e;
  overflow: auto;
}
.cesium-3DTilesInspector .cesium-cesiumInspector-section {
  margin-top: 3px;
}
.cesium-3DTilesInspector .cesium-cesiumInspector-sectionHeader + .cesium-cesiumInspector-show {
  border-top: 1px solid white;
}
input.cesium-cesiumInspector-url {
  overflow: hidden;
  white-space: nowrap;
  overflow-x: scroll;
  background-color: transparent;
  color: white;
  outline: none;
  border: none;
  height: 1em;
  width: 100%;
}
.cesium-cesiumInspector .field-group {
  display: table;
}
.cesium-cesiumInspector .field-group > label {
  display: table-cell;
  font-weight: bold;
}
.cesium-cesiumInspector .field-group > .field {
  display: table-cell;
  width: 100%;
}

/* packages/widgets/Source/VoxelInspector/VoxelInspector.css */
.cesium-VoxelInspector {
  width: 300px;
  pointer-events: all;
}
.cesium-VoxelInspector div,
.cesium-VoxelInspector input[type=range] {
  width: 100%;
  box-sizing: border-box;
}
.cesium-VoxelInspector .cesium-cesiumInspector-section {
  margin-top: 3px;
}
.cesium-VoxelInspector .cesium-cesiumInspector-sectionHeader + .cesium-cesiumInspector-show {
  border-top: 1px solid white;
}

/* packages/widgets/Source/FullscreenButton/FullscreenButton.css */
.cesium-button.cesium-fullscreenButton {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 0;
}

/* packages/widgets/Source/VRButton/VRButton.css */
.cesium-button.cesium-vrButton {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 0;
}

/* packages/widgets/Source/Geocoder/Geocoder.css */
.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  border: solid 1px #444;
  background-color: rgba(40, 40, 40, 0.7);
  color: white;
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 32px;
  margin: 0;
  padding: 0 32px 0 0;
  border-radius: 0;
  box-sizing: border-box;
  transition: width ease-in-out 0.25s, background-color 0.2s ease-in-out;
  -webkit-appearance: none;
}
.cesium-viewer-geocoderContainer:hover .cesium-geocoder-input {
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
}
.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  border-color: #ea4;
  background-color: rgba(15, 15, 15, 0.9);
  box-shadow: none;
  outline: none;
}
.cesium-viewer-geocoderContainer:hover .cesium-geocoder-input,
.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus,
.cesium-viewer-geocoderContainer .cesium-geocoder-input-wide {
  padding-left: 4px;
  width: 250px;
}
.cesium-viewer-geocoderContainer .search-results {
  position: absolute;
  background-color: #000;
  color: #eee;
  overflow-y: auto;
  opacity: 0.8;
  width: 100%;
}
.cesium-viewer-geocoderContainer .search-results ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.cesium-viewer-geocoderContainer .search-results ul li {
  font-size: 14px;
  padding: 3px 10px;
}
.cesium-viewer-geocoderContainer .search-results ul li:hover {
  cursor: pointer;
}
.cesium-viewer-geocoderContainer .search-results ul li.active {
  background: #48b;
}
.cesium-geocoder-searchButton {
  background-color: #303336;
  display: inline-block;
  position: absolute;
  cursor: pointer;
  width: 32px;
  top: 1px;
  right: 1px;
  height: 30px;
  vertical-align: middle;
  fill: #edffff;
}
.cesium-geocoder-searchButton:hover {
  background-color: #48b;
}

/* packages/widgets/Source/InfoBox/InfoBox.css */
.cesium-infoBox {
  display: block;
  position: absolute;
  top: 50px;
  right: 0;
  width: 40%;
  max-width: 480px;
  background: rgba(38, 38, 38, 0.95);
  color: #edffff;
  border: 1px solid #444;
  border-right: none;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  box-shadow: 0 0 10px 1px #000;
  transform: translate(100%, 0);
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0s 0.2s,
    opacity 0.2s ease-in,
    transform 0.2s ease-in;
}
.cesium-infoBox-visible {
  transform: translate(0, 0);
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.cesium-infoBox-title {
  display: block;
  height: 20px;
  padding: 5px 30px 5px 25px;
  background: rgba(84, 84, 84, 1);
  border-top-left-radius: 7px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: content-box;
}
.cesium-infoBox-bodyless .cesium-infoBox-title {
  border-bottom-left-radius: 7px;
}
button.cesium-infoBox-camera {
  display: block;
  position: absolute;
  top: 4px;
  left: 4px;
  width: 22px;
  height: 22px;
  background: transparent;
  border-color: transparent;
  border-radius: 3px;
  padding: 0 5px;
  margin: 0;
}
button.cesium-infoBox-close {
  display: block;
  position: absolute;
  top: 5px;
  right: 5px;
  height: 20px;
  background: transparent;
  border: none;
  border-radius: 2px;
  font-weight: bold;
  font-size: 16px;
  padding: 0 5px;
  margin: 0;
  color: #edffff;
}
button.cesium-infoBox-close:focus {
  background: rgba(238, 136, 0, 0.44);
  outline: none;
}
button.cesium-infoBox-close:hover {
  background: #888;
  color: #000;
}
button.cesium-infoBox-close:active {
  background: #a00;
  color: #000;
}
.cesium-infoBox-bodyless .cesium-infoBox-iframe {
  display: none;
}
.cesium-infoBox-iframe {
  border: none;
  width: 100%;
  width: calc(100% - 2px);
}

/* packages/widgets/Source/SceneModePicker/SceneModePicker.css */
span.cesium-sceneModePicker-wrapper {
  display: inline-block;
  position: relative;
  margin: 0 3px;
}
.cesium-sceneModePicker-visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.25s linear;
}
.cesium-sceneModePicker-hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.25s, opacity 0.25s linear;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-none {
  display: none;
}
.cesium-sceneModePicker-slide-svg {
  transition: left 2s;
  top: 0;
  left: 0;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  box-sizing: border-box;
  padding: 0;
  margin: 3px 0;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D,
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView,
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D {
  margin: 0 0 3px 0;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D .cesium-sceneModePicker-icon2D {
  left: 100%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D .cesium-sceneModePicker-iconColumbusView {
  left: 200%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView .cesium-sceneModePicker-icon3D {
  left: -200%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView .cesium-sceneModePicker-icon2D {
  left: -100%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D .cesium-sceneModePicker-icon3D {
  left: -100%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D .cesium-sceneModePicker-iconColumbusView {
  left: 100%;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-selected {
  border-color: #2e2;
  box-shadow: 0 0 8px #fff, 0 0 8px #fff;
}

/* packages/widgets/Source/ProjectionPicker/ProjectionPicker.css */
span.cesium-projectionPicker-wrapper {
  display: inline-block;
  position: relative;
  margin: 0 3px;
}
.cesium-projectionPicker-visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.25s linear;
}
.cesium-projectionPicker-hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.25s, opacity 0.25s linear;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-none {
  display: none;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-dropDown-icon {
  box-sizing: border-box;
  padding: 0;
  margin: 3px 0;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonPerspective,
.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonOrthographic {
  margin: 0 0 3px 0;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonPerspective .cesium-projectionPicker-iconOrthographic {
  left: 100%;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonOrthographic .cesium-projectionPicker-iconPerspective {
  left: -100%;
}
.cesium-projectionPicker-wrapper .cesium-projectionPicker-selected {
  border-color: #2e2;
  box-shadow: 0 0 8px #fff, 0 0 8px #fff;
}

/* packages/widgets/Source/PerformanceWatchdog/PerformanceWatchdog.css */
.cesium-performance-watchdog-message-area {
  position: relative;
  background-color: yellow;
  color: black;
  padding: 10px;
}
.cesium-performance-watchdog-message {
  margin-right: 30px;
}
.cesium-performance-watchdog-message-dismiss {
  position: absolute;
  right: 0;
  margin: 0 10px 0 0;
}

/* packages/widgets/Source/NavigationHelpButton/NavigationHelpButton.css */
.cesium-navigationHelpButton-wrapper {
  position: relative;
  display: inline-block;
}
.cesium-navigation-help {
  visibility: hidden;
  position: absolute;
  top: 38px;
  right: 2px;
  width: 250px;
  border-radius: 10px;
  transform: scale(0.01);
  transform-origin: 234px -10px;
  transition: visibility 0s 0.25s, transform 0.25s ease-in;
}
.cesium-navigation-help-visible {
  visibility: visible;
  transform: scale(1);
  transition: transform 0.25s ease-out;
}
.cesium-navigation-help-instructions {
  border: 1px solid #444;
  background-color: rgba(38, 38, 38, 0.75);
  padding-bottom: 5px;
  border-radius: 0 0 10px 10px;
}
.cesium-click-navigation-help {
  display: none;
}
.cesium-touch-navigation-help {
  display: none;
  padding-top: 5px;
}
.cesium-click-navigation-help-visible {
  display: block;
}
.cesium-touch-navigation-help-visible {
  display: block;
}
.cesium-navigation-help-pan {
  color: #66ccff;
  font-weight: bold;
}
.cesium-navigation-help-zoom {
  color: #65fd00;
  font-weight: bold;
}
.cesium-navigation-help-rotate {
  color: #ffd800;
  font-weight: bold;
}
.cesium-navigation-help-tilt {
  color: #d800d8;
  font-weight: bold;
}
.cesium-navigation-help-details {
  color: #ffffff;
}
.cesium-navigation-button {
  color: #fff;
  background-color: transparent;
  border-bottom: none;
  border-top: 1px solid #444;
  border-right: 1px solid #444;
  margin: 0;
  width: 50%;
  cursor: pointer;
}
.cesium-navigation-button-icon {
  vertical-align: middle;
  padding: 5px 1px;
}
.cesium-navigation-button:focus {
  outline: none;
}
.cesium-navigation-button-left {
  border-radius: 10px 0 0 0;
  border-left: 1px solid #444;
}
.cesium-navigation-button-right {
  border-radius: 0 10px 0 0;
  border-left: none;
}
.cesium-navigation-button-selected {
  background-color: rgba(38, 38, 38, 0.75);
}
.cesium-navigation-button-unselected {
  background-color: rgba(0, 0, 0, 0.75);
}
.cesium-navigation-button-unselected:hover {
  background-color: rgba(76, 76, 76, 0.75);
}

/* packages/widgets/Source/SelectionIndicator/SelectionIndicator.css */
.cesium-selection-wrapper {
  position: absolute;
  width: 160px;
  height: 160px;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s ease-in;
}
.cesium-selection-wrapper-visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-out;
}
.cesium-selection-wrapper svg {
  fill: #2e2;
  stroke: #000;
  stroke-width: 1.1px;
}

/* packages/widgets/Source/Timeline/Timeline.css */
.cesium-timeline-main {
  position: relative;
  left: 0;
  bottom: 0;
  overflow: hidden;
  border: solid 1px #888;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cesium-timeline-trackContainer {
  width: 100%;
  overflow: auto;
  border-top: solid 1px #888;
  position: relative;
  top: 0;
  left: 0;
}
.cesium-timeline-tracks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.cesium-timeline-needle {
  position: absolute;
  left: 0;
  top: 1.7em;
  bottom: 0;
  width: 1px;
  background: #f00;
}
.cesium-timeline-bar {
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 1.7em;
  background:
    linear-gradient(
      to bottom,
      rgba(116, 117, 119, 0.8) 0%,
      rgba(58, 68, 82, 0.8) 11%,
      rgba(46, 50, 56, 0.8) 46%,
      rgba(53, 53, 53, 0.8) 81%,
      rgba(53, 53, 53, 0.8) 100%);
}
.cesium-timeline-ruler {
  visibility: hidden;
  white-space: nowrap;
  font-size: 80%;
  z-index: -200;
}
.cesium-timeline-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #08f;
}
.cesium-timeline-ticLabel {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  font-size: 80%;
  color: #eee;
}
.cesium-timeline-ticMain {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 50%;
  background: #eee;
}
.cesium-timeline-ticSub {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 33%;
  background: #aaa;
}
.cesium-timeline-ticTiny {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 25%;
  background: #888;
}
.cesium-timeline-icon16 {
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-repeat: no-repeat;
}

/* packages/widgets/Source/Viewer/Viewer.css */
.cesium-viewer {
  font-family: sans-serif;
  font-size: 16px;
  overflow: hidden;
  display: block;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.cesium-viewer-cesiumWidgetContainer {
  width: 100%;
  height: 100%;
}
.cesium-viewer-bottom {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-right: 5px;
}
.cesium-viewer .cesium-widget-credits {
  display: inline;
  position: static;
  bottom: auto;
  left: auto;
  padding-right: 0;
  color: #ffffff;
  font-size: 10px;
  text-shadow: 0 0 2px #000000;
}
.cesium-viewer-timelineContainer {
  position: absolute;
  bottom: 0;
  left: 169px;
  right: 29px;
  height: 27px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-size: 14px;
}
.cesium-viewer-animationContainer {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0;
  width: 169px;
  height: 112px;
}
.cesium-viewer-fullscreenContainer {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0;
  width: 29px;
  height: 29px;
  overflow: hidden;
}
.cesium-viewer-vrContainer {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0;
  width: 29px;
  height: 29px;
  overflow: hidden;
}
.cesium-viewer-toolbar {
  display: block;
  position: absolute;
  top: 5px;
  right: 5px;
}
.cesium-viewer-cesiumInspectorContainer {
  display: block;
  position: absolute;
  top: 50px;
  right: 10px;
}
.cesium-viewer-geocoderContainer {
  position: relative;
  display: inline-block;
  margin: 0 3px;
}
.cesium-viewer-cesium3DTilesInspectorContainer {
  display: block;
  position: absolute;
  top: 50px;
  right: 10px;
  max-height: calc(100% - 120px);
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}
.cesium-viewer-voxelInspectorContainer {
  display: block;
  position: absolute;
  top: 50px;
  right: 10px;
  max-height: calc(100% - 120px);
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}

/* packages/widgets/Source/I3SBuildingSceneLayerExplorer/I3SBuildingSceneLayerExplorer.css */
.cesium-viewer-i3s-explorer ul {
  list-style-type: none;
}
.cesium-viewer-i3s-explorer .layersList {
  padding: 0;
}
.cesium-viewer-i3s-explorer input {
  margin: 0 3px 0 0;
}
.cesium-viewer-i3s-explorer .expandItem {
  cursor: pointer;
  user-select: none;
  width: 20px;
}
.cesium-viewer-i3s-explorer .nested,
.cesium-viewer-i3s-explorer #bsl-wrapper {
  display: none;
}
.cesium-viewer-i3s-explorer .active {
  display: block;
}
.cesium-viewer-i3s-explorer .li-wrapper {
  display: flex;
  flex-direction: row;
  align-content: center;
}

/* packages/widgets/Source/widgets.css */
`, "",{"version":3,"sources":["webpack://./node_modules/cesium/Build/Cesium/Widgets/widgets.css"],"names":[],"mappings":"AAAA,uCAAuC;AACvC;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,gBAAgB;AAClB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,mBAAmB;EACnB,sBAAsB;EACtB,cAAc;EACd,aAAa;EACb,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,WAAW;EACX,UAAU;EACV,kBAAkB;EAClB,aAAa;AACf;AACA;EACE,WAAW;EACX,UAAU;EACV,gBAAgB;EAChB,kBAAkB;EAClB,wBAAwB;AAC1B;AACA;EACE,WAAW;EACX,UAAU;EACV,gBAAgB;EAChB,kBAAkB;EAClB,wBAAwB;AAC1B;AACA;;;;;EAKE,mBAAmB;EACnB,kBAAkB;EAClB,cAAc;EACd,aAAa;EACb,gBAAgB;EAChB,eAAe;AACjB;AACA;EACE,sBAAsB;EACtB,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;;EAEE,eAAe;AACjB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,UAAU;EACV,sBAAsB;EACtB,UAAU;AACZ;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,iBAAiB;AACnB;AACA;EACE,uCAAuC;EACvC,YAAY;EACZ,kBAAkB;EAClB,sBAAsB;EACtB,0BAA0B;AAC5B;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;;AAEA,oDAAoD;AACpD;EACE,kBAAkB;EAClB,cAAc;EACd,kBAAkB;EAClB,aAAa;AACf;AACA;EACE,WAAW;AACb;AACA;EACE,cAAc;AAChB;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,eAAe;EACf,mBAAmB;AACrB;AACA;EACE,UAAU;EACV,kBAAkB;EAClB,YAAY;AACd;AACA;EACE,eAAe;EACf,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,UAAU;EACV,YAAY;EACZ,aAAa;AACf;AACA;EACE,cAAc;AAChB;AACA;EACE,aAAa;AACf;AACA;EACE,YAAY;EACZ,iBAAiB;AACnB;AACA;EACE,YAAY;AACd;AACA;EACE,aAAa;AACf;AACA;EACE,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,YAAY;AACd;AACA;EACE,aAAa;AACf;AACA;EACE,aAAa;AACf;AACA;EACE,cAAc;EACd,UAAU;AACZ;AACA;EACE,YAAY;AACd;AACA;EACE,UAAU;AACZ;AACA;EACE,YAAY;AACd;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,aAAa;EACb,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;AACnB;AACA;EACE,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,qBAAqB;AACvB;AACA;EACE,eAAe;EACf,YAAY;EACZ,iBAAiB;AACnB;AACA;EACE,eAAe;AACjB;;AAEA,gEAAgE;AAChE;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,YAAY;AACd;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,uBAAuB;EACvB,SAAS;EACT,QAAQ;EACR,YAAY;EACZ,iBAAiB;EACjB,eAAe;EACf,wCAAwC;EACxC,sBAAsB;EACtB,YAAY;EACZ,cAAc;EACd,mBAAmB;EACnB,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;EACrB,iBAAiB;EACjB,6BAA6B;EAC7B,kBAAkB;EAClB,UAAU;EACV;;;0BAGwB;AAC1B;AACA;EACE,0BAA0B;EAC1B,mBAAmB;EACnB,UAAU;EACV,0DAA0D;AAC5D;AACA;EACE,cAAc;EACd,uBAAuB;EACvB,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,cAAc;EACd,eAAe;AACjB;AACA;EACE,cAAc;EACd,sBAAsB;EACtB,kBAAkB;EAClB,cAAc;AAChB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,eAAe;EACf,WAAW;EACX,kBAAkB;EAClB,eAAe;AACjB;AACA;EACE,cAAc;EACd,uBAAuB;EACvB,cAAc;EACd,kBAAkB;EAClB,sBAAsB;EACtB,cAAc;EACd,eAAe;EACf,qBAAqB;AACvB;AACA;;EAEE,0BAA0B;AAC5B;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,cAAc;EACd,YAAY;EACZ,0BAA0B;EAC1B,sBAAsB;EACtB,kBAAkB;EAClB,cAAc;EACd,SAAS;EACT,UAAU;EACV,eAAe;EACf,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,sCAAsC;AACxC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,qCAAqC;AACvC;;AAEA,mDAAmD;AACnD;EACE,uBAAuB;EACvB,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;AACA;;EAEE,WAAW;EACX,YAAY;EACZ,kBAAkB;AACpB;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,WAAW;EACX,eAAe;EACf,gCAAgC;EAChC,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,kBAAkB;EAClB,8BAA8B;EAC9B,cAAc;AAChB;AACA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,YAAY;EACZ,WAAW;AACb;AACA;EACE,UAAU;EACV,gBAAgB;EAChB,qBAAqB;EACrB,gBAAgB;EAChB,sBAAsB;EACtB,yBAAyB;EACzB,kBAAkB;EAClB,yBAAyB;EACzB,eAAe;EACf,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,eAAe;EACf;;;;cAIY;EACZ,mBAAmB;EACnB,gCAAgC;EAChC,oBAAoB;EACpB,0BAA0B;EAC1B,aAAa;AACf;AACA;EACE,cAAc;EACd;;;;cAIY;EACZ,qBAAqB;EACrB,eAAe;EACf,qBAAqB;AACvB;AACA;EACE,eAAe;EACf,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,cAAc;EACd,SAAS;AACX;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,cAAc;AAChB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,cAAc;AAChB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,cAAc;AAChB;AACA;EACE,0BAA0B;EAC1B,eAAe;AACjB;AACA;EACE,cAAc;AAChB;;AAEA,gEAAgE;AAChE;EACE,kBAAkB;EAClB,mCAAmC;EACnC,iCAAiC;EACjC,sBAAsB;EACtB,cAAc;EACd,qBAAqB;EACrB,kBAAkB;EAClB,iBAAiB;EACjB,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;EACrB,iBAAiB;EACjB,gBAAgB;AAClB;AACA;EACE,kBAAkB;EAClB,eAAe;AACjB;AACA;EACE,6BAA6B;EAC7B,mBAAmB;AACrB;AACA;;EAEE,eAAe;AACjB;AACA;EACE,YAAY;EACZ,YAAY;AACd;AACA;EACE,YAAY;EACZ,YAAY;AACd;AACA;EACE,iBAAiB;AACnB;AACA;EACE,aAAa;EACb,qBAAqB;EACrB,gBAAgB;AAClB;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,eAAe;EACf,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,YAAY;EACZ,wCAAwC;AAC1C;AACA;EACE,oCAAoC;EACpC,sBAAsB;EACtB,cAAc;EACd,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;EACrB,iBAAiB;EACjB,cAAc;AAChB;AACA;EACE,aAAa;AACf;AACA;;EAEE,WAAW;EACX,gBAAgB;EAChB,kBAAkB;EAClB,wBAAwB;AAC1B;AACA;EACE,kBAAkB;AACpB;AACA;EACE,iBAAiB;EACjB,eAAe;EACf,SAAS;EACT,eAAe;AACjB;AACA;EACE,sBAAsB;EACtB,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;AACpB;AACA;EACE,mBAAmB;EACnB,4BAA4B;AAC9B;AACA;EACE,oBAAoB;EACpB,6BAA6B;AAC/B;AACA;EACE,iBAAiB;AACnB;AACA;EACE,iBAAiB;EACjB,YAAY;EACZ,UAAU;EACV,qBAAqB;AACvB;AACA;EACE,YAAY;AACd;;AAEA,8EAA8E;AAC9E;EACE,SAAS;EACT,gBAAgB;EAChB,mBAAmB;AACrB;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,eAAe;AACjB;AACA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,aAAa;EACb,sBAAsB;EACtB,cAAc;EACd,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,iBAAiB;EACjB,YAAY;AACd;AACA;;EAEE,wBAAwB;EACxB,SAAS;AACX;AACA;EACE,gBAAgB;EAChB,sBAAsB;AACxB;AACA;EACE,aAAa;AACf;AACA;EACE,aAAa;EACb,kBAAkB;EAClB,iCAAiC;EACjC,sBAAsB;AACxB;AACA;EACE,WAAW;EACX,aAAa;EACb,uBAAuB;EACvB,cAAc;EACd,YAAY;EACZ,UAAU;EACV,gBAAgB;EAChB,qBAAqB;EACrB,gBAAgB;AAClB;AACA;EACE,YAAY;EACZ,mBAAmB;AACrB;AACA;EACE,eAAe;AACjB;AACA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,cAAc;AAChB;AACA;;EAEE,WAAW;EACX,sBAAsB;AACxB;AACA;EACE,cAAc;EACd,cAAc;AAChB;AACA;EACE,eAAe;AACjB;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,kBAAkB;EAClB,6BAA6B;EAC7B,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,WAAW;EACX,WAAW;AACb;AACA;EACE,cAAc;AAChB;AACA;EACE,mBAAmB;EACnB,iBAAiB;AACnB;AACA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA,8DAA8D;AAC9D;EACE,YAAY;EACZ,mBAAmB;AACrB;AACA;;EAEE,WAAW;EACX,sBAAsB;AACxB;AACA;EACE,eAAe;AACjB;AACA;EACE,2BAA2B;AAC7B;;AAEA,kEAAkE;AAClE;EACE,cAAc;EACd,WAAW;EACX,YAAY;EACZ,SAAS;EACT,gBAAgB;AAClB;;AAEA,kDAAkD;AAClD;EACE,cAAc;EACd,WAAW;EACX,YAAY;EACZ,SAAS;EACT,gBAAgB;AAClB;;AAEA,kDAAkD;AAClD;EACE,sBAAsB;EACtB,uCAAuC;EACvC,YAAY;EACZ,qBAAqB;EACrB,sBAAsB;EACtB,QAAQ;EACR,YAAY;EACZ,SAAS;EACT,mBAAmB;EACnB,gBAAgB;EAChB,sBAAsB;EACtB,sEAAsE;EACtE,wBAAwB;AAC1B;AACA;EACE,kBAAkB;EAClB,wBAAwB;AAC1B;AACA;EACE,kBAAkB;EAClB,uCAAuC;EACvC,gBAAgB;EAChB,aAAa;AACf;AACA;;;EAGE,iBAAiB;EACjB,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,sBAAsB;EACtB,WAAW;EACX,gBAAgB;EAChB,YAAY;EACZ,WAAW;AACb;AACA;EACE,qBAAqB;EACrB,SAAS;EACT,UAAU;AACZ;AACA;EACE,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,eAAe;AACjB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,yBAAyB;EACzB,qBAAqB;EACrB,kBAAkB;EAClB,eAAe;EACf,WAAW;EACX,QAAQ;EACR,UAAU;EACV,YAAY;EACZ,sBAAsB;EACtB,aAAa;AACf;AACA;EACE,sBAAsB;AACxB;;AAEA,gDAAgD;AAChD;EACE,cAAc;EACd,kBAAkB;EAClB,SAAS;EACT,QAAQ;EACR,UAAU;EACV,gBAAgB;EAChB,kCAAkC;EAClC,cAAc;EACd,sBAAsB;EACtB,kBAAkB;EAClB,2BAA2B;EAC3B,8BAA8B;EAC9B,6BAA6B;EAC7B,6BAA6B;EAC7B,kBAAkB;EAClB,UAAU;EACV;;;0BAGwB;AAC1B;AACA;EACE,0BAA0B;EAC1B,mBAAmB;EACnB,UAAU;EACV,0DAA0D;AAC5D;AACA;EACE,cAAc;EACd,YAAY;EACZ,0BAA0B;EAC1B,+BAA+B;EAC/B,2BAA2B;EAC3B,kBAAkB;EAClB,uBAAuB;EACvB,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;AACzB;AACA;EACE,8BAA8B;AAChC;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,WAAW;EACX,YAAY;EACZ,uBAAuB;EACvB,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,SAAS;AACX;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,YAAY;EACZ,uBAAuB;EACvB,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,cAAc;EACd,SAAS;EACT,cAAc;AAChB;AACA;EACE,mCAAmC;EACnC,aAAa;AACf;AACA;EACE,gBAAgB;EAChB,WAAW;AACb;AACA;EACE,gBAAgB;EAChB,WAAW;AACb;AACA;EACE,aAAa;AACf;AACA;EACE,YAAY;EACZ,WAAW;EACX,uBAAuB;AACzB;;AAEA,gEAAgE;AAChE;EACE,qBAAqB;EACrB,kBAAkB;EAClB,aAAa;AACf;AACA;EACE,mBAAmB;EACnB,UAAU;EACV,gCAAgC;AAClC;AACA;EACE,kBAAkB;EAClB,UAAU;EACV,qDAAqD;AACvD;AACA;EACE,aAAa;AACf;AACA;EACE,mBAAmB;EACnB,MAAM;EACN,OAAO;AACT;AACA;EACE,sBAAsB;EACtB,UAAU;EACV,aAAa;AACf;AACA;;;EAGE,iBAAiB;AACnB;AACA;EACE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,UAAU;AACZ;AACA;EACE,kBAAkB;EAClB,sCAAsC;AACxC;;AAEA,kEAAkE;AAClE;EACE,qBAAqB;EACrB,kBAAkB;EAClB,aAAa;AACf;AACA;EACE,mBAAmB;EACnB,UAAU;EACV,gCAAgC;AAClC;AACA;EACE,kBAAkB;EAClB,UAAU;EACV,qDAAqD;AACvD;AACA;EACE,aAAa;AACf;AACA;EACE,sBAAsB;EACtB,UAAU;EACV,aAAa;AACf;AACA;;EAEE,iBAAiB;AACnB;AACA;EACE,UAAU;AACZ;AACA;EACE,WAAW;AACb;AACA;EACE,kBAAkB;EAClB,sCAAsC;AACxC;;AAEA,wEAAwE;AACxE;EACE,kBAAkB;EAClB,wBAAwB;EACxB,YAAY;EACZ,aAAa;AACf;AACA;EACE,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,QAAQ;EACR,kBAAkB;AACpB;;AAEA,0EAA0E;AAC1E;EACE,kBAAkB;EAClB,qBAAqB;AACvB;AACA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,6BAA6B;EAC7B,wDAAwD;AAC1D;AACA;EACE,mBAAmB;EACnB,mBAAmB;EACnB,oCAAoC;AACtC;AACA;EACE,sBAAsB;EACtB,wCAAwC;EACxC,mBAAmB;EACnB,4BAA4B;AAC9B;AACA;EACE,aAAa;AACf;AACA;EACE,aAAa;EACb,gBAAgB;AAClB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;EACd,iBAAiB;AACnB;AACA;EACE,cAAc;EACd,iBAAiB;AACnB;AACA;EACE,cAAc;EACd,iBAAiB;AACnB;AACA;EACE,cAAc;EACd,iBAAiB;AACnB;AACA;EACE,cAAc;AAChB;AACA;EACE,WAAW;EACX,6BAA6B;EAC7B,mBAAmB;EACnB,0BAA0B;EAC1B,4BAA4B;EAC5B,SAAS;EACT,UAAU;EACV,eAAe;AACjB;AACA;EACE,sBAAsB;EACtB,gBAAgB;AAClB;AACA;EACE,aAAa;AACf;AACA;EACE,yBAAyB;EACzB,2BAA2B;AAC7B;AACA;EACE,yBAAyB;EACzB,iBAAiB;AACnB;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,qCAAqC;AACvC;AACA;EACE,wCAAwC;AAC1C;;AAEA,sEAAsE;AACtE;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,kBAAkB;EAClB,UAAU;EACV,oDAAoD;AACtD;AACA;EACE,mBAAmB;EACnB,UAAU;EACV,iCAAiC;AACnC;AACA;EACE,UAAU;EACV,YAAY;EACZ,mBAAmB;AACrB;;AAEA,kDAAkD;AAClD;EACE,kBAAkB;EAClB,OAAO;EACP,SAAS;EACT,gBAAgB;EAChB,sBAAsB;EACtB,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,WAAW;EACX,cAAc;EACd,0BAA0B;EAC1B,kBAAkB;EAClB,MAAM;EACN,OAAO;AACT;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;AACb;AACA;EACE,kBAAkB;EAClB,OAAO;EACP,UAAU;EACV,SAAS;EACT,UAAU;EACV,gBAAgB;AAClB;AACA;EACE,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,gBAAgB;EAChB,eAAe;EACf,WAAW;EACX,aAAa;EACb;;;;;;;iCAO+B;AACjC;AACA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,cAAc;EACd,aAAa;AACf;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,gBAAgB;AAClB;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,mBAAmB;EACnB,cAAc;EACd,WAAW;AACb;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,UAAU;EACV,WAAW;EACX,gBAAgB;AAClB;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,UAAU;EACV,WAAW;EACX,gBAAgB;AAClB;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,UAAU;EACV,WAAW;EACX,gBAAgB;AAClB;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,yDAAkkC;EAClkC,4BAA4B;AAC9B;;AAEA,8CAA8C;AAC9C;EACE,uBAAuB;EACvB,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;AACA;EACE,WAAW;EACX,YAAY;AACd;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,kBAAkB;AACpB;AACA;EACE,eAAe;EACf,gBAAgB;EAChB,YAAY;EACZ,UAAU;EACV,gBAAgB;EAChB,cAAc;EACd,eAAe;EACf,4BAA4B;AAC9B;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,WAAW;EACX,YAAY;EACZ,UAAU;EACV,SAAS;EACT,gBAAgB;EAChB,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,UAAU;EACV,YAAY;EACZ,aAAa;AACf;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,QAAQ;EACR,UAAU;EACV,WAAW;EACX,YAAY;EACZ,gBAAgB;AAClB;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,QAAQ;EACR,UAAU;EACV,WAAW;EACX,YAAY;EACZ,gBAAgB;AAClB;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,UAAU;AACZ;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,SAAS;EACT,WAAW;AACb;AACA;EACE,kBAAkB;EAClB,qBAAqB;EACrB,aAAa;AACf;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,8BAA8B;EAC9B,sBAAsB;EACtB,gBAAgB;EAChB,kBAAkB;AACpB;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,8BAA8B;EAC9B,sBAAsB;EACtB,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA,4FAA4F;AAC5F;EACE,qBAAqB;AACvB;AACA;EACE,UAAU;AACZ;AACA;EACE,iBAAiB;AACnB;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,WAAW;AACb;AACA;;EAEE,aAAa;AACf;AACA;EACE,cAAc;AAChB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,qBAAqB;AACvB;;AAEA,wCAAwC","sourcesContent":["/* packages/widgets/Source/shared.css */\n.cesium-svgPath-svg {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.cesium-button {\n  display: inline-block;\n  position: relative;\n  background: #303336;\n  border: 1px solid #444;\n  color: #edffff;\n  fill: #edffff;\n  border-radius: 4px;\n  padding: 5px 12px;\n  margin: 2px 3px;\n  cursor: pointer;\n  overflow: hidden;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.cesium-button:focus {\n  color: #fff;\n  fill: #fff;\n  border-color: #ea4;\n  outline: none;\n}\n.cesium-button:hover {\n  color: #fff;\n  fill: #fff;\n  background: #48b;\n  border-color: #aef;\n  box-shadow: 0 0 8px #fff;\n}\n.cesium-button:active {\n  color: #000;\n  fill: #000;\n  background: #adf;\n  border-color: #fff;\n  box-shadow: 0 0 8px #fff;\n}\n.cesium-button:disabled,\n.cesium-button-disabled,\n.cesium-button-disabled:focus,\n.cesium-button-disabled:hover,\n.cesium-button-disabled:active {\n  background: #303336;\n  border-color: #444;\n  color: #646464;\n  fill: #646464;\n  box-shadow: none;\n  cursor: default;\n}\n.cesium-button option {\n  background-color: #000;\n  color: #eee;\n}\n.cesium-button option:disabled {\n  color: #777;\n}\n.cesium-button input,\n.cesium-button label {\n  cursor: pointer;\n}\n.cesium-button input {\n  vertical-align: sub;\n}\n.cesium-toolbar-button {\n  box-sizing: border-box;\n  width: 32px;\n  height: 32px;\n  border-radius: 14%;\n  padding: 0;\n  vertical-align: middle;\n  z-index: 0;\n}\n.cesium-performanceDisplay-defaultContainer {\n  position: absolute;\n  top: 50px;\n  right: 10px;\n  text-align: right;\n}\n.cesium-performanceDisplay {\n  background-color: rgba(40, 40, 40, 0.7);\n  padding: 7px;\n  border-radius: 5px;\n  border: 1px solid #444;\n  font: bold 12px sans-serif;\n}\n.cesium-performanceDisplay-fps {\n  color: #e52;\n}\n.cesium-performanceDisplay-throttled {\n  color: #a42;\n}\n.cesium-performanceDisplay-ms {\n  color: #de3;\n}\n\n/* packages/widgets/Source/Animation/Animation.css */\n.cesium-animation-theme {\n  visibility: hidden;\n  display: block;\n  position: absolute;\n  z-index: -100;\n}\n.cesium-animation-themeNormal {\n  color: #222;\n}\n.cesium-animation-themeHover {\n  color: #4488b0;\n}\n.cesium-animation-themeSelect {\n  color: #242;\n}\n.cesium-animation-themeDisabled {\n  color: #333;\n}\n.cesium-animation-themeKnob {\n  color: #222;\n}\n.cesium-animation-themePointer {\n  color: #2e2;\n}\n.cesium-animation-themeSwoosh {\n  color: #8ac;\n}\n.cesium-animation-themeSwooshHover {\n  color: #aef;\n}\n.cesium-animation-svgText {\n  fill: #edffff;\n  font-family: Sans-Serif;\n  font-size: 15px;\n  text-anchor: middle;\n}\n.cesium-animation-blank {\n  fill: #000;\n  fill-opacity: 0.01;\n  stroke: none;\n}\n.cesium-animation-rectButton {\n  cursor: pointer;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.cesium-animation-rectButton .cesium-animation-buttonGlow {\n  fill: #fff;\n  stroke: none;\n  display: none;\n}\n.cesium-animation-rectButton:hover .cesium-animation-buttonGlow {\n  display: block;\n}\n.cesium-animation-rectButton .cesium-animation-buttonPath {\n  fill: #edffff;\n}\n.cesium-animation-rectButton .cesium-animation-buttonMain {\n  stroke: #444;\n  stroke-width: 1.2;\n}\n.cesium-animation-rectButton:hover .cesium-animation-buttonMain {\n  stroke: #aef;\n}\n.cesium-animation-rectButton:active .cesium-animation-buttonMain {\n  fill: #abd6ff;\n}\n.cesium-animation-buttonDisabled {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.cesium-animation-buttonDisabled .cesium-animation-buttonMain {\n  stroke: #555;\n}\n.cesium-animation-buttonDisabled .cesium-animation-buttonPath {\n  fill: #818181;\n}\n.cesium-animation-buttonDisabled .cesium-animation-buttonGlow {\n  display: none;\n}\n.cesium-animation-buttonToggled .cesium-animation-buttonGlow {\n  display: block;\n  fill: #2e2;\n}\n.cesium-animation-buttonToggled .cesium-animation-buttonMain {\n  stroke: #2e2;\n}\n.cesium-animation-buttonToggled:hover .cesium-animation-buttonGlow {\n  fill: #fff;\n}\n.cesium-animation-buttonToggled:hover .cesium-animation-buttonMain {\n  stroke: #2e2;\n}\n.cesium-animation-shuttleRingG {\n  cursor: pointer;\n}\n.cesium-animation-shuttleRingPointer {\n  cursor: pointer;\n}\n.cesium-animation-shuttleRingPausePointer {\n  cursor: pointer;\n}\n.cesium-animation-shuttleRingBack {\n  fill: #181818;\n  fill-opacity: 0.8;\n  stroke: #333;\n  stroke-width: 1.2;\n}\n.cesium-animation-shuttleRingSwoosh line {\n  stroke: #8ac;\n  stroke-width: 3;\n  stroke-opacity: 0.2;\n  stroke-linecap: round;\n}\n.cesium-animation-knobOuter {\n  cursor: pointer;\n  stroke: #444;\n  stroke-width: 1.2;\n}\n.cesium-animation-knobInner {\n  cursor: pointer;\n}\n\n/* packages/widgets/Source/BaseLayerPicker/BaseLayerPicker.css */\n.cesium-baseLayerPicker-selected {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: none;\n}\n.cesium-baseLayerPicker-dropDown {\n  display: block;\n  position: absolute;\n  box-sizing: content-box;\n  top: auto;\n  right: 0;\n  width: 320px;\n  max-height: 500px;\n  margin-top: 5px;\n  background-color: rgba(38, 38, 38, 0.75);\n  border: 1px solid #444;\n  padding: 6px;\n  overflow: auto;\n  border-radius: 10px;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  transform: translate(0, -20%);\n  visibility: hidden;\n  opacity: 0;\n  transition:\n    visibility 0s 0.2s,\n    opacity 0.2s ease-in,\n    transform 0.2s ease-in;\n}\n.cesium-baseLayerPicker-dropDown-visible {\n  transform: translate(0, 0);\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.2s ease-out, transform 0.2s ease-out;\n}\n.cesium-baseLayerPicker-sectionTitle {\n  display: block;\n  font-family: sans-serif;\n  font-size: 16pt;\n  text-align: left;\n  color: #edffff;\n  margin-bottom: 4px;\n}\n.cesium-baseLayerPicker-choices {\n  margin-bottom: 5px;\n}\n.cesium-baseLayerPicker-categoryTitle {\n  color: #edffff;\n  font-size: 11pt;\n}\n.cesium-baseLayerPicker-choices {\n  display: block;\n  border: 1px solid #888;\n  border-radius: 5px;\n  padding: 5px 0;\n}\n.cesium-baseLayerPicker-item {\n  display: inline-block;\n  vertical-align: top;\n  margin: 2px 5px;\n  width: 64px;\n  text-align: center;\n  cursor: pointer;\n}\n.cesium-baseLayerPicker-itemLabel {\n  display: block;\n  font-family: sans-serif;\n  font-size: 8pt;\n  text-align: center;\n  vertical-align: middle;\n  color: #edffff;\n  cursor: pointer;\n  word-wrap: break-word;\n}\n.cesium-baseLayerPicker-item:hover .cesium-baseLayerPicker-itemLabel,\n.cesium-baseLayerPicker-item:focus .cesium-baseLayerPicker-itemLabel {\n  text-decoration: underline;\n}\n.cesium-baseLayerPicker-itemIcon {\n  display: inline-block;\n  position: relative;\n  width: inherit;\n  height: auto;\n  background-size: 100% 100%;\n  border: solid 1px #444;\n  border-radius: 9px;\n  color: #edffff;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  box-sizing: border-box;\n}\n.cesium-baseLayerPicker-item:hover .cesium-baseLayerPicker-itemIcon {\n  border-color: #fff;\n  box-shadow: 0 0 8px #fff, 0 0 8px #fff;\n}\n.cesium-baseLayerPicker-selectedItem .cesium-baseLayerPicker-itemLabel {\n  color: rgb(189, 236, 248);\n}\n.cesium-baseLayerPicker-selectedItem .cesium-baseLayerPicker-itemIcon {\n  border: double 4px rgb(189, 236, 248);\n}\n\n/* packages/engine/Source/Widget/CesiumWidget.css */\n.cesium-widget {\n  font-family: sans-serif;\n  font-size: 16px;\n  overflow: hidden;\n  display: block;\n  position: relative;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.cesium-widget,\n.cesium-widget canvas {\n  width: 100%;\n  height: 100%;\n  touch-action: none;\n}\n.cesium-widget-credits {\n  display: block;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  color: #fff;\n  font-size: 10px;\n  text-shadow: 0px 0px 2px #000000;\n  padding-right: 5px;\n}\n.cesium-widget-errorPanel {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  text-align: center;\n  background: rgba(0, 0, 0, 0.7);\n  z-index: 99999;\n}\n.cesium-widget-errorPanel:before {\n  display: inline-block;\n  vertical-align: middle;\n  height: 100%;\n  content: \"\";\n}\n.cesium-widget-errorPanel-content {\n  width: 75%;\n  max-width: 500px;\n  display: inline-block;\n  text-align: left;\n  vertical-align: middle;\n  border: 1px solid #510c00;\n  border-radius: 7px;\n  background-color: #f0d9d5;\n  font-size: 14px;\n  color: #510c00;\n}\n.cesium-widget-errorPanel-content.expanded {\n  max-width: 75%;\n}\n.cesium-widget-errorPanel-header {\n  font-size: 18px;\n  font-family:\n    \"Open Sans\",\n    Verdana,\n    Geneva,\n    sans-serif;\n  background: #d69d93;\n  border-bottom: 2px solid #510c00;\n  padding-bottom: 10px;\n  border-radius: 3px 3px 0 0;\n  padding: 15px;\n}\n.cesium-widget-errorPanel-scroll {\n  overflow: auto;\n  font-family:\n    \"Open Sans\",\n    Verdana,\n    Geneva,\n    sans-serif;\n  white-space: pre-wrap;\n  padding: 0 15px;\n  margin: 10px 0 20px 0;\n}\n.cesium-widget-errorPanel-buttonPanel {\n  padding: 0 15px;\n  margin: 10px 0 20px 0;\n  text-align: right;\n}\n.cesium-widget-errorPanel-buttonPanel button {\n  border-color: #510c00;\n  background: #d69d93;\n  color: #202020;\n  margin: 0;\n}\n.cesium-widget-errorPanel-buttonPanel button:focus {\n  border-color: #510c00;\n  background: #f0d9d5;\n  color: #510c00;\n}\n.cesium-widget-errorPanel-buttonPanel button:hover {\n  border-color: #510c00;\n  background: #f0d9d5;\n  color: #510c00;\n}\n.cesium-widget-errorPanel-buttonPanel button:active {\n  border-color: #510c00;\n  background: #b17b72;\n  color: #510c00;\n}\n.cesium-widget-errorPanel-more-details {\n  text-decoration: underline;\n  cursor: pointer;\n}\n.cesium-widget-errorPanel-more-details:hover {\n  color: #2b0700;\n}\n\n/* packages/widgets/Source/CesiumInspector/CesiumInspector.css */\n.cesium-cesiumInspector {\n  border-radius: 5px;\n  transition: width ease-in-out 0.25s;\n  background: rgba(48, 51, 54, 0.8);\n  border: 1px solid #444;\n  color: #edffff;\n  display: inline-block;\n  position: relative;\n  padding: 4px 12px;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  overflow: hidden;\n}\n.cesium-cesiumInspector-button {\n  text-align: center;\n  font-size: 11pt;\n}\n.cesium-cesiumInspector-visible .cesium-cesiumInspector-button {\n  border-bottom: 1px solid #aaa;\n  padding-bottom: 3px;\n}\n.cesium-cesiumInspector input:enabled,\n.cesium-cesiumInspector-button {\n  cursor: pointer;\n}\n.cesium-cesiumInspector-visible {\n  width: 185px;\n  height: auto;\n}\n.cesium-cesiumInspector-hidden {\n  width: 122px;\n  height: 17px;\n}\n.cesium-cesiumInspector-sectionContent {\n  max-height: 600px;\n}\n.cesium-cesiumInspector-section-collapsed .cesium-cesiumInspector-sectionContent {\n  max-height: 0;\n  padding: 0 !important;\n  overflow: hidden;\n}\n.cesium-cesiumInspector-dropDown {\n  margin: 5px 0;\n  font-family: sans-serif;\n  font-size: 10pt;\n  width: 185px;\n}\n.cesium-cesiumInspector-frustumStatistics {\n  padding-left: 10px;\n  padding: 5px;\n  background-color: rgba(80, 80, 80, 0.75);\n}\n.cesium-cesiumInspector-pickButton {\n  background-color: rgba(0, 0, 0, 0.3);\n  border: 1px solid #444;\n  color: #edffff;\n  border-radius: 5px;\n  padding: 3px 7px;\n  cursor: pointer;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  margin: 0 auto;\n}\n.cesium-cesiumInspector-pickButton:focus {\n  outline: none;\n}\n.cesium-cesiumInspector-pickButton:active,\n.cesium-cesiumInspector-pickButtonHighlight {\n  color: #000;\n  background: #adf;\n  border-color: #fff;\n  box-shadow: 0 0 8px #fff;\n}\n.cesium-cesiumInspector-center {\n  text-align: center;\n}\n.cesium-cesiumInspector-sectionHeader {\n  font-weight: bold;\n  font-size: 10pt;\n  margin: 0;\n  cursor: pointer;\n}\n.cesium-cesiumInspector-pickSection {\n  border: 1px solid #aaa;\n  border-radius: 5px;\n  padding: 3px;\n  margin-bottom: 5px;\n}\n.cesium-cesiumInspector-sectionContent {\n  margin-bottom: 10px;\n  transition: max-height 0.25s;\n}\n.cesium-cesiumInspector-tileText {\n  padding-bottom: 10px;\n  border-bottom: 1px solid #aaa;\n}\n.cesium-cesiumInspector-relativeText {\n  padding-top: 10px;\n}\n.cesium-cesiumInspector-sectionHeader::before {\n  margin-right: 5px;\n  content: \"-\";\n  width: 1ch;\n  display: inline-block;\n}\n.cesium-cesiumInspector-section-collapsed .cesium-cesiumInspector-sectionHeader::before {\n  content: \"+\";\n}\n\n/* packages/widgets/Source/Cesium3DTilesInspector/Cesium3DTilesInspector.css */\nul.cesium-cesiumInspector-statistics {\n  margin: 0;\n  padding-top: 3px;\n  padding-bottom: 3px;\n}\nul.cesium-cesiumInspector-statistics + ul.cesium-cesiumInspector-statistics {\n  border-top: 1px solid #aaa;\n}\n.cesium-cesiumInspector-slider {\n  margin-top: 5px;\n}\n.cesium-cesiumInspector-slider input[type=number] {\n  text-align: left;\n  background-color: #222;\n  outline: none;\n  border: 1px solid #444;\n  color: #edffff;\n  width: 100px;\n  border-radius: 3px;\n  padding: 1px;\n  margin-left: 10px;\n  cursor: auto;\n}\n.cesium-cesiumInspector-slider input[type=number]::-webkit-outer-spin-button,\n.cesium-cesiumInspector-slider input[type=number]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.cesium-cesiumInspector-slider input[type=range] {\n  margin-left: 5px;\n  vertical-align: middle;\n}\n.cesium-cesiumInspector-hide .cesium-cesiumInspector-styleEditor {\n  display: none;\n}\n.cesium-cesiumInspector-styleEditor {\n  padding: 10px;\n  border-radius: 5px;\n  background: rgba(48, 51, 54, 0.8);\n  border: 1px solid #444;\n}\n.cesium-cesiumInspector-styleEditor textarea {\n  width: 100%;\n  height: 300px;\n  background: transparent;\n  color: #edffff;\n  border: none;\n  padding: 0;\n  white-space: pre;\n  overflow-wrap: normal;\n  overflow-x: auto;\n}\n.cesium-3DTilesInspector {\n  width: 300px;\n  pointer-events: all;\n}\n.cesium-3DTilesInspector-statistics {\n  font-size: 11px;\n}\n.cesium-3DTilesInspector-disabledElementsInfo {\n  margin: 5px 0 0 0;\n  padding: 0 0 0 20px;\n  color: #eed202;\n}\n.cesium-3DTilesInspector div,\n.cesium-3DTilesInspector input[type=range] {\n  width: 100%;\n  box-sizing: border-box;\n}\n.cesium-cesiumInspector-error {\n  color: #ff9e9e;\n  overflow: auto;\n}\n.cesium-3DTilesInspector .cesium-cesiumInspector-section {\n  margin-top: 3px;\n}\n.cesium-3DTilesInspector .cesium-cesiumInspector-sectionHeader + .cesium-cesiumInspector-show {\n  border-top: 1px solid white;\n}\ninput.cesium-cesiumInspector-url {\n  overflow: hidden;\n  white-space: nowrap;\n  overflow-x: scroll;\n  background-color: transparent;\n  color: white;\n  outline: none;\n  border: none;\n  height: 1em;\n  width: 100%;\n}\n.cesium-cesiumInspector .field-group {\n  display: table;\n}\n.cesium-cesiumInspector .field-group > label {\n  display: table-cell;\n  font-weight: bold;\n}\n.cesium-cesiumInspector .field-group > .field {\n  display: table-cell;\n  width: 100%;\n}\n\n/* packages/widgets/Source/VoxelInspector/VoxelInspector.css */\n.cesium-VoxelInspector {\n  width: 300px;\n  pointer-events: all;\n}\n.cesium-VoxelInspector div,\n.cesium-VoxelInspector input[type=range] {\n  width: 100%;\n  box-sizing: border-box;\n}\n.cesium-VoxelInspector .cesium-cesiumInspector-section {\n  margin-top: 3px;\n}\n.cesium-VoxelInspector .cesium-cesiumInspector-sectionHeader + .cesium-cesiumInspector-show {\n  border-top: 1px solid white;\n}\n\n/* packages/widgets/Source/FullscreenButton/FullscreenButton.css */\n.cesium-button.cesium-fullscreenButton {\n  display: block;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  border-radius: 0;\n}\n\n/* packages/widgets/Source/VRButton/VRButton.css */\n.cesium-button.cesium-vrButton {\n  display: block;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  border-radius: 0;\n}\n\n/* packages/widgets/Source/Geocoder/Geocoder.css */\n.cesium-viewer-geocoderContainer .cesium-geocoder-input {\n  border: solid 1px #444;\n  background-color: rgba(40, 40, 40, 0.7);\n  color: white;\n  display: inline-block;\n  vertical-align: middle;\n  width: 0;\n  height: 32px;\n  margin: 0;\n  padding: 0 32px 0 0;\n  border-radius: 0;\n  box-sizing: border-box;\n  transition: width ease-in-out 0.25s, background-color 0.2s ease-in-out;\n  -webkit-appearance: none;\n}\n.cesium-viewer-geocoderContainer:hover .cesium-geocoder-input {\n  border-color: #aef;\n  box-shadow: 0 0 8px #fff;\n}\n.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {\n  border-color: #ea4;\n  background-color: rgba(15, 15, 15, 0.9);\n  box-shadow: none;\n  outline: none;\n}\n.cesium-viewer-geocoderContainer:hover .cesium-geocoder-input,\n.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus,\n.cesium-viewer-geocoderContainer .cesium-geocoder-input-wide {\n  padding-left: 4px;\n  width: 250px;\n}\n.cesium-viewer-geocoderContainer .search-results {\n  position: absolute;\n  background-color: #000;\n  color: #eee;\n  overflow-y: auto;\n  opacity: 0.8;\n  width: 100%;\n}\n.cesium-viewer-geocoderContainer .search-results ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n.cesium-viewer-geocoderContainer .search-results ul li {\n  font-size: 14px;\n  padding: 3px 10px;\n}\n.cesium-viewer-geocoderContainer .search-results ul li:hover {\n  cursor: pointer;\n}\n.cesium-viewer-geocoderContainer .search-results ul li.active {\n  background: #48b;\n}\n.cesium-geocoder-searchButton {\n  background-color: #303336;\n  display: inline-block;\n  position: absolute;\n  cursor: pointer;\n  width: 32px;\n  top: 1px;\n  right: 1px;\n  height: 30px;\n  vertical-align: middle;\n  fill: #edffff;\n}\n.cesium-geocoder-searchButton:hover {\n  background-color: #48b;\n}\n\n/* packages/widgets/Source/InfoBox/InfoBox.css */\n.cesium-infoBox {\n  display: block;\n  position: absolute;\n  top: 50px;\n  right: 0;\n  width: 40%;\n  max-width: 480px;\n  background: rgba(38, 38, 38, 0.95);\n  color: #edffff;\n  border: 1px solid #444;\n  border-right: none;\n  border-top-left-radius: 7px;\n  border-bottom-left-radius: 7px;\n  box-shadow: 0 0 10px 1px #000;\n  transform: translate(100%, 0);\n  visibility: hidden;\n  opacity: 0;\n  transition:\n    visibility 0s 0.2s,\n    opacity 0.2s ease-in,\n    transform 0.2s ease-in;\n}\n.cesium-infoBox-visible {\n  transform: translate(0, 0);\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.2s ease-out, transform 0.2s ease-out;\n}\n.cesium-infoBox-title {\n  display: block;\n  height: 20px;\n  padding: 5px 30px 5px 25px;\n  background: rgba(84, 84, 84, 1);\n  border-top-left-radius: 7px;\n  text-align: center;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  box-sizing: content-box;\n}\n.cesium-infoBox-bodyless .cesium-infoBox-title {\n  border-bottom-left-radius: 7px;\n}\nbutton.cesium-infoBox-camera {\n  display: block;\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  width: 22px;\n  height: 22px;\n  background: transparent;\n  border-color: transparent;\n  border-radius: 3px;\n  padding: 0 5px;\n  margin: 0;\n}\nbutton.cesium-infoBox-close {\n  display: block;\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  height: 20px;\n  background: transparent;\n  border: none;\n  border-radius: 2px;\n  font-weight: bold;\n  font-size: 16px;\n  padding: 0 5px;\n  margin: 0;\n  color: #edffff;\n}\nbutton.cesium-infoBox-close:focus {\n  background: rgba(238, 136, 0, 0.44);\n  outline: none;\n}\nbutton.cesium-infoBox-close:hover {\n  background: #888;\n  color: #000;\n}\nbutton.cesium-infoBox-close:active {\n  background: #a00;\n  color: #000;\n}\n.cesium-infoBox-bodyless .cesium-infoBox-iframe {\n  display: none;\n}\n.cesium-infoBox-iframe {\n  border: none;\n  width: 100%;\n  width: calc(100% - 2px);\n}\n\n/* packages/widgets/Source/SceneModePicker/SceneModePicker.css */\nspan.cesium-sceneModePicker-wrapper {\n  display: inline-block;\n  position: relative;\n  margin: 0 3px;\n}\n.cesium-sceneModePicker-visible {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.25s linear;\n}\n.cesium-sceneModePicker-hidden {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 0.25s, opacity 0.25s linear;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-none {\n  display: none;\n}\n.cesium-sceneModePicker-slide-svg {\n  transition: left 2s;\n  top: 0;\n  left: 0;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 3px 0;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D,\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView,\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D {\n  margin: 0 0 3px 0;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D .cesium-sceneModePicker-icon2D {\n  left: 100%;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D .cesium-sceneModePicker-iconColumbusView {\n  left: 200%;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView .cesium-sceneModePicker-icon3D {\n  left: -200%;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView .cesium-sceneModePicker-icon2D {\n  left: -100%;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D .cesium-sceneModePicker-icon3D {\n  left: -100%;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D .cesium-sceneModePicker-iconColumbusView {\n  left: 100%;\n}\n.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-selected {\n  border-color: #2e2;\n  box-shadow: 0 0 8px #fff, 0 0 8px #fff;\n}\n\n/* packages/widgets/Source/ProjectionPicker/ProjectionPicker.css */\nspan.cesium-projectionPicker-wrapper {\n  display: inline-block;\n  position: relative;\n  margin: 0 3px;\n}\n.cesium-projectionPicker-visible {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.25s linear;\n}\n.cesium-projectionPicker-hidden {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 0.25s, opacity 0.25s linear;\n}\n.cesium-projectionPicker-wrapper .cesium-projectionPicker-none {\n  display: none;\n}\n.cesium-projectionPicker-wrapper .cesium-projectionPicker-dropDown-icon {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 3px 0;\n}\n.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonPerspective,\n.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonOrthographic {\n  margin: 0 0 3px 0;\n}\n.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonPerspective .cesium-projectionPicker-iconOrthographic {\n  left: 100%;\n}\n.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonOrthographic .cesium-projectionPicker-iconPerspective {\n  left: -100%;\n}\n.cesium-projectionPicker-wrapper .cesium-projectionPicker-selected {\n  border-color: #2e2;\n  box-shadow: 0 0 8px #fff, 0 0 8px #fff;\n}\n\n/* packages/widgets/Source/PerformanceWatchdog/PerformanceWatchdog.css */\n.cesium-performance-watchdog-message-area {\n  position: relative;\n  background-color: yellow;\n  color: black;\n  padding: 10px;\n}\n.cesium-performance-watchdog-message {\n  margin-right: 30px;\n}\n.cesium-performance-watchdog-message-dismiss {\n  position: absolute;\n  right: 0;\n  margin: 0 10px 0 0;\n}\n\n/* packages/widgets/Source/NavigationHelpButton/NavigationHelpButton.css */\n.cesium-navigationHelpButton-wrapper {\n  position: relative;\n  display: inline-block;\n}\n.cesium-navigation-help {\n  visibility: hidden;\n  position: absolute;\n  top: 38px;\n  right: 2px;\n  width: 250px;\n  border-radius: 10px;\n  transform: scale(0.01);\n  transform-origin: 234px -10px;\n  transition: visibility 0s 0.25s, transform 0.25s ease-in;\n}\n.cesium-navigation-help-visible {\n  visibility: visible;\n  transform: scale(1);\n  transition: transform 0.25s ease-out;\n}\n.cesium-navigation-help-instructions {\n  border: 1px solid #444;\n  background-color: rgba(38, 38, 38, 0.75);\n  padding-bottom: 5px;\n  border-radius: 0 0 10px 10px;\n}\n.cesium-click-navigation-help {\n  display: none;\n}\n.cesium-touch-navigation-help {\n  display: none;\n  padding-top: 5px;\n}\n.cesium-click-navigation-help-visible {\n  display: block;\n}\n.cesium-touch-navigation-help-visible {\n  display: block;\n}\n.cesium-navigation-help-pan {\n  color: #66ccff;\n  font-weight: bold;\n}\n.cesium-navigation-help-zoom {\n  color: #65fd00;\n  font-weight: bold;\n}\n.cesium-navigation-help-rotate {\n  color: #ffd800;\n  font-weight: bold;\n}\n.cesium-navigation-help-tilt {\n  color: #d800d8;\n  font-weight: bold;\n}\n.cesium-navigation-help-details {\n  color: #ffffff;\n}\n.cesium-navigation-button {\n  color: #fff;\n  background-color: transparent;\n  border-bottom: none;\n  border-top: 1px solid #444;\n  border-right: 1px solid #444;\n  margin: 0;\n  width: 50%;\n  cursor: pointer;\n}\n.cesium-navigation-button-icon {\n  vertical-align: middle;\n  padding: 5px 1px;\n}\n.cesium-navigation-button:focus {\n  outline: none;\n}\n.cesium-navigation-button-left {\n  border-radius: 10px 0 0 0;\n  border-left: 1px solid #444;\n}\n.cesium-navigation-button-right {\n  border-radius: 0 10px 0 0;\n  border-left: none;\n}\n.cesium-navigation-button-selected {\n  background-color: rgba(38, 38, 38, 0.75);\n}\n.cesium-navigation-button-unselected {\n  background-color: rgba(0, 0, 0, 0.75);\n}\n.cesium-navigation-button-unselected:hover {\n  background-color: rgba(76, 76, 76, 0.75);\n}\n\n/* packages/widgets/Source/SelectionIndicator/SelectionIndicator.css */\n.cesium-selection-wrapper {\n  position: absolute;\n  width: 160px;\n  height: 160px;\n  pointer-events: none;\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 0.2s, opacity 0.2s ease-in;\n}\n.cesium-selection-wrapper-visible {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.2s ease-out;\n}\n.cesium-selection-wrapper svg {\n  fill: #2e2;\n  stroke: #000;\n  stroke-width: 1.1px;\n}\n\n/* packages/widgets/Source/Timeline/Timeline.css */\n.cesium-timeline-main {\n  position: relative;\n  left: 0;\n  bottom: 0;\n  overflow: hidden;\n  border: solid 1px #888;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.cesium-timeline-trackContainer {\n  width: 100%;\n  overflow: auto;\n  border-top: solid 1px #888;\n  position: relative;\n  top: 0;\n  left: 0;\n}\n.cesium-timeline-tracks {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n}\n.cesium-timeline-needle {\n  position: absolute;\n  left: 0;\n  top: 1.7em;\n  bottom: 0;\n  width: 1px;\n  background: #f00;\n}\n.cesium-timeline-bar {\n  position: relative;\n  left: 0;\n  top: 0;\n  overflow: hidden;\n  cursor: pointer;\n  width: 100%;\n  height: 1.7em;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(116, 117, 119, 0.8) 0%,\n      rgba(58, 68, 82, 0.8) 11%,\n      rgba(46, 50, 56, 0.8) 46%,\n      rgba(53, 53, 53, 0.8) 81%,\n      rgba(53, 53, 53, 0.8) 100%);\n}\n.cesium-timeline-ruler {\n  visibility: hidden;\n  white-space: nowrap;\n  font-size: 80%;\n  z-index: -200;\n}\n.cesium-timeline-highlight {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  background: #08f;\n}\n.cesium-timeline-ticLabel {\n  position: absolute;\n  top: 0;\n  left: 0;\n  white-space: nowrap;\n  font-size: 80%;\n  color: #eee;\n}\n.cesium-timeline-ticMain {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 1px;\n  height: 50%;\n  background: #eee;\n}\n.cesium-timeline-ticSub {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 1px;\n  height: 33%;\n  background: #aaa;\n}\n.cesium-timeline-ticTiny {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 1px;\n  height: 25%;\n  background: #888;\n}\n.cesium-timeline-icon16 {\n  display: block;\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  background-image: url(data:text/plain;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIDBITKIVzLEMAAAKNSURBVEjHxdXNSxRhHAfw7zzrqhuoWJnSkrippUVSEKsHI9BTUYdAJA/RoYMREV26rAdn6tAfUARi16hQqkOBQRgUEYFWEC3OwczMjdZd92VmdWfmeelgTjO7q7gb0VzmmZnn85vvPPPMM8B/3qTcE2PPpuTZKB1eWuUQACgXYACYwVFbCTTVeZXB/i55o4LFelcAZfStYD4vpAoPGAGo4GBcQEgSOAUMQyAezwK6iQfDPXnhS/FkHZ+/8VLMWxxqWkfH3gbMRNOYi2roavbja0zHQmoFPYf8ED4Ko4aivm9MOG/u9I8mwrafeK7a/tVrNc/bARYN5noadeq7q0342vXw9CIMU6BmW8rVP9cPBPe52uu+v3O/y9sB4gkTWs6Qsk0mj5ExXMelejvA8WafYmkmGPHanTijdtvif8rx5RiCjdWKs2Cp3jWRDl96KhrbqlBeJqBOLyLQXg0IgbkZDS0dO8EZxZfPSTA9jvDDK3mT0OmP1FXh3XwEEAKdTX5MRWLgjCK4pwH3xt/YnjgLHAv4lHTCAKMMu/wV+KZGob6PoKyMQ0+sgBpZVJZn0NterxQaVqef/DRn+/EXYds/mZx2eVeAW9d65dhCEsaKCb7K8HH0gqTevyh9GDkn0VULRiaLzJKGBu9swfdaiie5RVo9ESURN8E8BE0n7ggACJy8KzghSCzp6DmwWxkaCm24EBXr8wI8Hrkq06QBiRC0t24HALS11IBTCyJl4vb1AXmzpbVYTwoVOXN0h7L8Mwtm8bXPybIQ/5FCX3dA2cr6XowvGCA02CvztAnz9+JiZk1AMxG6fEreSoBiPNmoyNnuWiWVzAIAtISO08E6pZi/3N96AIDn4E3h3P8L/wshP+txtEs4JAAAAABJRU5ErkJggg==);\n  background-repeat: no-repeat;\n}\n\n/* packages/widgets/Source/Viewer/Viewer.css */\n.cesium-viewer {\n  font-family: sans-serif;\n  font-size: 16px;\n  overflow: hidden;\n  display: block;\n  position: relative;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.cesium-viewer-cesiumWidgetContainer {\n  width: 100%;\n  height: 100%;\n}\n.cesium-viewer-bottom {\n  display: block;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  padding-right: 5px;\n}\n.cesium-viewer .cesium-widget-credits {\n  display: inline;\n  position: static;\n  bottom: auto;\n  left: auto;\n  padding-right: 0;\n  color: #ffffff;\n  font-size: 10px;\n  text-shadow: 0 0 2px #000000;\n}\n.cesium-viewer-timelineContainer {\n  position: absolute;\n  bottom: 0;\n  left: 169px;\n  right: 29px;\n  height: 27px;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n  font-size: 14px;\n}\n.cesium-viewer-animationContainer {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  padding: 0;\n  width: 169px;\n  height: 112px;\n}\n.cesium-viewer-fullscreenContainer {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  padding: 0;\n  width: 29px;\n  height: 29px;\n  overflow: hidden;\n}\n.cesium-viewer-vrContainer {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  padding: 0;\n  width: 29px;\n  height: 29px;\n  overflow: hidden;\n}\n.cesium-viewer-toolbar {\n  display: block;\n  position: absolute;\n  top: 5px;\n  right: 5px;\n}\n.cesium-viewer-cesiumInspectorContainer {\n  display: block;\n  position: absolute;\n  top: 50px;\n  right: 10px;\n}\n.cesium-viewer-geocoderContainer {\n  position: relative;\n  display: inline-block;\n  margin: 0 3px;\n}\n.cesium-viewer-cesium3DTilesInspectorContainer {\n  display: block;\n  position: absolute;\n  top: 50px;\n  right: 10px;\n  max-height: calc(100% - 120px);\n  box-sizing: border-box;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.cesium-viewer-voxelInspectorContainer {\n  display: block;\n  position: absolute;\n  top: 50px;\n  right: 10px;\n  max-height: calc(100% - 120px);\n  box-sizing: border-box;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n/* packages/widgets/Source/I3SBuildingSceneLayerExplorer/I3SBuildingSceneLayerExplorer.css */\n.cesium-viewer-i3s-explorer ul {\n  list-style-type: none;\n}\n.cesium-viewer-i3s-explorer .layersList {\n  padding: 0;\n}\n.cesium-viewer-i3s-explorer input {\n  margin: 0 3px 0 0;\n}\n.cesium-viewer-i3s-explorer .expandItem {\n  cursor: pointer;\n  user-select: none;\n  width: 20px;\n}\n.cesium-viewer-i3s-explorer .nested,\n.cesium-viewer-i3s-explorer #bsl-wrapper {\n  display: none;\n}\n.cesium-viewer-i3s-explorer .active {\n  display: block;\n}\n.cesium-viewer-i3s-explorer .li-wrapper {\n  display: flex;\n  flex-direction: row;\n  align-content: center;\n}\n\n/* packages/widgets/Source/widgets.css */\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 10540:
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 41113:
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 55056:
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 71354:
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 76314:
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 77659:
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 85072:
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 97825:
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3ZlbmRvcnMuNmM5M2I5MTE4MGIwMmIxZTFlYTguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBLE1BQTJGO0FBQzNGLE1BQWlGO0FBQ2pGLE1BQXdGO0FBQ3hGLE1BQTJHO0FBQzNHLE1BQW9HO0FBQ3BHLE1BQW9HO0FBQ3BHLE1BQWlHO0FBQ2pHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHdGQUFtQjtBQUMvQyx3QkFBd0IscUdBQWE7QUFDckMsaUJBQWlCLDBGQUFhO0FBQzlCLGlCQUFpQixrRkFBTTtBQUN2Qiw2QkFBNkIseUZBQWtCOztBQUUvQyxhQUFhLDZGQUFHLENBQUMsMkVBQU87Ozs7QUFJMkM7QUFDbkUsT0FBTyxpRUFBZSwyRUFBTyxJQUFJLDJFQUFPLFVBQVUsMkVBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCN0U7QUFDc0c7QUFDakI7QUFDTztBQUM1Riw0Q0FBNEMsdW5DQUE4akM7QUFDMW1DLDhCQUE4QixzRUFBMkIsQ0FBQywrRUFBcUM7QUFDL0YseUNBQXlDLHlFQUErQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLDhIQUE4SCxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxLQUFLLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsTUFBTSxTQUFTLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsS0FBSyxLQUFLLFVBQVUsS0FBSyxNQUFNLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLFdBQVcsS0FBSyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxNQUFNLFlBQVksTUFBTSxZQUFZLFdBQVcsWUFBWSxXQUFXLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLE9BQU8sWUFBWSxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxPQUFPLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLE1BQU0sTUFBTSxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLEtBQUssTUFBTSxVQUFVLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsUUFBUSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxLQUFLLEtBQUssVUFBVSxRQUFRLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLEtBQUssS0FBSyxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsT0FBTyxZQUFZLE1BQU0sWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxLQUFLLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsTUFBTSxZQUFZLE1BQU0sVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLFdBQVcsS0FBSyxNQUFNLFlBQVksV0FBVyxLQUFLLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxNQUFNLE1BQU0sVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksV0FBVyxNQUFNLFlBQVksTUFBTSxVQUFVLFlBQVksTUFBTSxNQUFNLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxZQUFZLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxLQUFLLE9BQU8sWUFBWSxXQUFXLEtBQUssS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsVUFBVSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxLQUFLLEtBQUssWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sT0FBTyxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsS0FBSyxLQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssWUFBWSxXQUFXLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLFlBQVksTUFBTSxZQUFZLGFBQWEsV0FBVyxLQUFLLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxZQUFZLFdBQVcsVUFBVSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsS0FBSyxPQUFPLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFlBQVksYUFBYSxPQUFPLFlBQVksTUFBTSxZQUFZLGFBQWEsV0FBVyxLQUFLLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxZQUFZLFdBQVcsVUFBVSxLQUFLLE1BQU0sWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssWUFBWSxhQUFhLE9BQU8sWUFBWSxNQUFNLFlBQVksYUFBYSxXQUFXLFVBQVUsS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsS0FBSyxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLFlBQVksTUFBTSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsS0FBSyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsS0FBSyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFdBQVcsT0FBTyxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsS0FBSyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsYUFBYSxjQUFjLE9BQU8sWUFBWSxNQUFNLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsS0FBSyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsS0FBSyxLQUFLLFlB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O0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7O0FDbkZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9jZXNpdW0vQnVpbGQvQ2VzaXVtL1dpZGdldHMvd2lkZ2V0cy5jc3M/OTM3MiIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL2Nlc2l1bS9CdWlsZC9DZXNpdW0vV2lkZ2V0cy93aWRnZXRzLmNzcyIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi8uLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi8uLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi8uLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vd2lkZ2V0cy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3dpZGdldHMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcImRhdGE6dGV4dC9wbGFpbjtiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNBQUFBQVFDQVlBQUFCM0FIMVpBQUFBQVhOU1IwSUFyczRjNlFBQUFBWmlTMGRFQVA4QS93RC9vTDJua3dBQUFBbHdTRmx6QUFBTEV3QUFDeE1CQUpxY0dBQUFBQWQwU1UxRkI5c0lEQklUS0lWekxFTUFBQUtOU1VSQlZFakh4ZFhOU3hSaEhBZnc3enpycWh1b1dKblNrcmlwcFVWU0VLc0hJOUJUVVlkQUpBL1JvWU1SRVYyNnJBZG42dEFmVUFSaTE2aFFxa09CUVJnVUVZRldFQzNPd2N6TWpkWmQ5MlZtZFdmbWVlbGdUak83cTdnYjBWem1tWm5uODV2dlBQUE1NOEIvM3FUY0UyUFBwdVRaS0IxZVd1VVFBQ2dYWUFDWXdWRmJDVFRWZVpYQi9pNTVvNExGZWxjQVpmU3RZRDR2cEFvUEdBR280R0JjUUVnU09BVU1ReUFlendLNmlRZkRQWG5oUy9Ga0haKy84VkxNV3h4cVdrZkgzZ2JNUk5PWWkycm9hdmJqYTB6SFFtb0ZQWWY4RUQ0S280YWl2bTlNT0cvdTlJOG13cmFmZUs3YS90VnJOYy9iQVJZTjVub2FkZXE3cTAzNDJ2WHc5Q0lNVTZCbVc4clZQOWNQQlBlNTJ1dSt2M08veTlzQjRna1RXczZRc2swbWo1RXhYTWVsZWp2QThXYWZZbWttR1BIYW5UaWpkdHZpZjhyeDVSaUNqZFdLczJDcDNqV1JEbDk2S2hyYnFsQmVKcUJPTHlMUVhnMElnYmtaRFMwZE84RVp4WmZQU1RBOWp2RERLM21UME9tUDFGWGgzWHdFRUFLZFRYNU1SV0xnakNLNHB3SDN4dC9ZbmpnTEhBdjRsSFRDQUtNTXUvd1YrS1pHb2I2UG9LeU1RMCtzZ0JwWlZKWm4wTnRlcnhRYVZxZWYvRFJuKy9FWFlkcy9tWngyZVZlQVc5ZDY1ZGhDRXNhS0NiN0s4SEgwZ3FUZXZ5aDlHRGtuMFZVTFJpYUx6SktHQnU5c3dmZGFpaWU1UlZvOUVTVVJOOEU4QkUwbjdnZ0FDSnk4S3pnaFNDenA2RG13V3hrYUNtMjRFQlhyOHdJOEhya3EwNlFCaVJDMHQyNEhBTFMxMUlCVEN5Smw0dmIxQVhtenBiVllUd29WT1hOMGg3TDhNd3RtOGJYUHliSVEvNUZDWDNkQTJjcjZYb3d2R0NBMDJDdnp0QW56OStKaVprMUFNeEc2ZkVyZVNvQmlQTm1veU5udVdpV1Z6QUlBdElTTzA4RTZwWmkvM045NkFJRG40RTNoM1A4TC93c2hQK3R4dEVzNEpBQUFBQUJKUlU1RXJrSmdnZz09XCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9zaGFyZWQuY3NzICovXG4uY2VzaXVtLXN2Z1BhdGgtc3ZnIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uY2VzaXVtLWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBiYWNrZ3JvdW5kOiAjMzAzMzM2O1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDQ0O1xuICBjb2xvcjogI2VkZmZmZjtcbiAgZmlsbDogI2VkZmZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiA1cHggMTJweDtcbiAgbWFyZ2luOiAycHggM3B4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG4uY2VzaXVtLWJ1dHRvbjpmb2N1cyB7XG4gIGNvbG9yOiAjZmZmO1xuICBmaWxsOiAjZmZmO1xuICBib3JkZXItY29sb3I6ICNlYTQ7XG4gIG91dGxpbmU6IG5vbmU7XG59XG4uY2VzaXVtLWJ1dHRvbjpob3ZlciB7XG4gIGNvbG9yOiAjZmZmO1xuICBmaWxsOiAjZmZmO1xuICBiYWNrZ3JvdW5kOiAjNDhiO1xuICBib3JkZXItY29sb3I6ICNhZWY7XG4gIGJveC1zaGFkb3c6IDAgMCA4cHggI2ZmZjtcbn1cbi5jZXNpdW0tYnV0dG9uOmFjdGl2ZSB7XG4gIGNvbG9yOiAjMDAwO1xuICBmaWxsOiAjMDAwO1xuICBiYWNrZ3JvdW5kOiAjYWRmO1xuICBib3JkZXItY29sb3I6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMCA4cHggI2ZmZjtcbn1cbi5jZXNpdW0tYnV0dG9uOmRpc2FibGVkLFxuLmNlc2l1bS1idXR0b24tZGlzYWJsZWQsXG4uY2VzaXVtLWJ1dHRvbi1kaXNhYmxlZDpmb2N1cyxcbi5jZXNpdW0tYnV0dG9uLWRpc2FibGVkOmhvdmVyLFxuLmNlc2l1bS1idXR0b24tZGlzYWJsZWQ6YWN0aXZlIHtcbiAgYmFja2dyb3VuZDogIzMwMzMzNjtcbiAgYm9yZGVyLWNvbG9yOiAjNDQ0O1xuICBjb2xvcjogIzY0NjQ2NDtcbiAgZmlsbDogIzY0NjQ2NDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuLmNlc2l1bS1idXR0b24gb3B0aW9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgY29sb3I6ICNlZWU7XG59XG4uY2VzaXVtLWJ1dHRvbiBvcHRpb246ZGlzYWJsZWQge1xuICBjb2xvcjogIzc3Nztcbn1cbi5jZXNpdW0tYnV0dG9uIGlucHV0LFxuLmNlc2l1bS1idXR0b24gbGFiZWwge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY2VzaXVtLWJ1dHRvbiBpbnB1dCB7XG4gIHZlcnRpY2FsLWFsaWduOiBzdWI7XG59XG4uY2VzaXVtLXRvb2xiYXItYnV0dG9uIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgYm9yZGVyLXJhZGl1czogMTQlO1xuICBwYWRkaW5nOiAwO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB6LWluZGV4OiAwO1xufVxuLmNlc2l1bS1wZXJmb3JtYW5jZURpc3BsYXktZGVmYXVsdENvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MHB4O1xuICByaWdodDogMTBweDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG4uY2VzaXVtLXBlcmZvcm1hbmNlRGlzcGxheSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDQwLCA0MCwgMC43KTtcbiAgcGFkZGluZzogN3B4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0NDQ7XG4gIGZvbnQ6IGJvbGQgMTJweCBzYW5zLXNlcmlmO1xufVxuLmNlc2l1bS1wZXJmb3JtYW5jZURpc3BsYXktZnBzIHtcbiAgY29sb3I6ICNlNTI7XG59XG4uY2VzaXVtLXBlcmZvcm1hbmNlRGlzcGxheS10aHJvdHRsZWQge1xuICBjb2xvcjogI2E0Mjtcbn1cbi5jZXNpdW0tcGVyZm9ybWFuY2VEaXNwbGF5LW1zIHtcbiAgY29sb3I6ICNkZTM7XG59XG5cbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL0FuaW1hdGlvbi9BbmltYXRpb24uY3NzICovXG4uY2VzaXVtLWFuaW1hdGlvbi10aGVtZSB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogLTEwMDtcbn1cbi5jZXNpdW0tYW5pbWF0aW9uLXRoZW1lTm9ybWFsIHtcbiAgY29sb3I6ICMyMjI7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi10aGVtZUhvdmVyIHtcbiAgY29sb3I6ICM0NDg4YjA7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi10aGVtZVNlbGVjdCB7XG4gIGNvbG9yOiAjMjQyO1xufVxuLmNlc2l1bS1hbmltYXRpb24tdGhlbWVEaXNhYmxlZCB7XG4gIGNvbG9yOiAjMzMzO1xufVxuLmNlc2l1bS1hbmltYXRpb24tdGhlbWVLbm9iIHtcbiAgY29sb3I6ICMyMjI7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi10aGVtZVBvaW50ZXIge1xuICBjb2xvcjogIzJlMjtcbn1cbi5jZXNpdW0tYW5pbWF0aW9uLXRoZW1lU3dvb3NoIHtcbiAgY29sb3I6ICM4YWM7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi10aGVtZVN3b29zaEhvdmVyIHtcbiAgY29sb3I6ICNhZWY7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1zdmdUZXh0IHtcbiAgZmlsbDogI2VkZmZmZjtcbiAgZm9udC1mYW1pbHk6IFNhbnMtU2VyaWY7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgdGV4dC1hbmNob3I6IG1pZGRsZTtcbn1cbi5jZXNpdW0tYW5pbWF0aW9uLWJsYW5rIHtcbiAgZmlsbDogIzAwMDtcbiAgZmlsbC1vcGFjaXR5OiAwLjAxO1xuICBzdHJva2U6IG5vbmU7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1yZWN0QnV0dG9uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuLmNlc2l1bS1hbmltYXRpb24tcmVjdEJ1dHRvbiAuY2VzaXVtLWFuaW1hdGlvbi1idXR0b25HbG93IHtcbiAgZmlsbDogI2ZmZjtcbiAgc3Ryb2tlOiBub25lO1xuICBkaXNwbGF5OiBub25lO1xufVxuLmNlc2l1bS1hbmltYXRpb24tcmVjdEJ1dHRvbjpob3ZlciAuY2VzaXVtLWFuaW1hdGlvbi1idXR0b25HbG93IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1yZWN0QnV0dG9uIC5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvblBhdGgge1xuICBmaWxsOiAjZWRmZmZmO1xufVxuLmNlc2l1bS1hbmltYXRpb24tcmVjdEJ1dHRvbiAuY2VzaXVtLWFuaW1hdGlvbi1idXR0b25NYWluIHtcbiAgc3Ryb2tlOiAjNDQ0O1xuICBzdHJva2Utd2lkdGg6IDEuMjtcbn1cbi5jZXNpdW0tYW5pbWF0aW9uLXJlY3RCdXR0b246aG92ZXIgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uTWFpbiB7XG4gIHN0cm9rZTogI2FlZjtcbn1cbi5jZXNpdW0tYW5pbWF0aW9uLXJlY3RCdXR0b246YWN0aXZlIC5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvbk1haW4ge1xuICBmaWxsOiAjYWJkNmZmO1xufVxuLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uRGlzYWJsZWQge1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uRGlzYWJsZWQgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uTWFpbiB7XG4gIHN0cm9rZTogIzU1NTtcbn1cbi5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvbkRpc2FibGVkIC5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvblBhdGgge1xuICBmaWxsOiAjODE4MTgxO1xufVxuLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uRGlzYWJsZWQgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uR2xvdyB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1idXR0b25Ub2dnbGVkIC5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvbkdsb3cge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZmlsbDogIzJlMjtcbn1cbi5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvblRvZ2dsZWQgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uTWFpbiB7XG4gIHN0cm9rZTogIzJlMjtcbn1cbi5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvblRvZ2dsZWQ6aG92ZXIgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uR2xvdyB7XG4gIGZpbGw6ICNmZmY7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1idXR0b25Ub2dnbGVkOmhvdmVyIC5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvbk1haW4ge1xuICBzdHJva2U6ICMyZTI7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1zaHV0dGxlUmluZ0cge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1zaHV0dGxlUmluZ1BvaW50ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1zaHV0dGxlUmluZ1BhdXNlUG9pbnRlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5jZXNpdW0tYW5pbWF0aW9uLXNodXR0bGVSaW5nQmFjayB7XG4gIGZpbGw6ICMxODE4MTg7XG4gIGZpbGwtb3BhY2l0eTogMC44O1xuICBzdHJva2U6ICMzMzM7XG4gIHN0cm9rZS13aWR0aDogMS4yO1xufVxuLmNlc2l1bS1hbmltYXRpb24tc2h1dHRsZVJpbmdTd29vc2ggbGluZSB7XG4gIHN0cm9rZTogIzhhYztcbiAgc3Ryb2tlLXdpZHRoOiAzO1xuICBzdHJva2Utb3BhY2l0eTogMC4yO1xuICBzdHJva2UtbGluZWNhcDogcm91bmQ7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1rbm9iT3V0ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHN0cm9rZTogIzQ0NDtcbiAgc3Ryb2tlLXdpZHRoOiAxLjI7XG59XG4uY2VzaXVtLWFuaW1hdGlvbi1rbm9iSW5uZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL0Jhc2VMYXllclBpY2tlci9CYXNlTGF5ZXJQaWNrZXIuY3NzICovXG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1zZWxlY3RlZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXI6IG5vbmU7XG59XG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1kcm9wRG93biB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICB0b3A6IGF1dG87XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMzIwcHg7XG4gIG1heC1oZWlnaHQ6IDUwMHB4O1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzgsIDM4LCAzOCwgMC43NSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0NDQ7XG4gIHBhZGRpbmc6IDZweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yMCUpO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246XG4gICAgdmlzaWJpbGl0eSAwcyAwLjJzLFxuICAgIG9wYWNpdHkgMC4ycyBlYXNlLWluLFxuICAgIHRyYW5zZm9ybSAwLjJzIGVhc2UtaW47XG59XG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1kcm9wRG93bi12aXNpYmxlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIG9wYWNpdHk6IDE7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlLW91dCwgdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQ7XG59XG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1zZWN0aW9uVGl0bGUge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTZwdDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY29sb3I6ICNlZGZmZmY7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWNob2ljZXMge1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1jYXRlZ29yeVRpdGxlIHtcbiAgY29sb3I6ICNlZGZmZmY7XG4gIGZvbnQtc2l6ZTogMTFwdDtcbn1cbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWNob2ljZXMge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYm9yZGVyOiAxcHggc29saWQgIzg4ODtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiA1cHggMDtcbn1cbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW0ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIG1hcmdpbjogMnB4IDVweDtcbiAgd2lkdGg6IDY0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItaXRlbUxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDhwdDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBjb2xvcjogI2VkZmZmZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG59XG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1pdGVtOmhvdmVyIC5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW1MYWJlbCxcbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW06Zm9jdXMgLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItaXRlbUxhYmVsIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1pdGVtSWNvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogaW5oZXJpdDtcbiAgaGVpZ2h0OiBhdXRvO1xuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzQ0NDtcbiAgYm9yZGVyLXJhZGl1czogOXB4O1xuICBjb2xvcjogI2VkZmZmZjtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1pdGVtOmhvdmVyIC5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW1JY29uIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDAgOHB4ICNmZmYsIDAgMCA4cHggI2ZmZjtcbn1cbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLXNlbGVjdGVkSXRlbSAuY2VzaXVtLWJhc2VMYXllclBpY2tlci1pdGVtTGFiZWwge1xuICBjb2xvcjogcmdiKDE4OSwgMjM2LCAyNDgpO1xufVxuLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItc2VsZWN0ZWRJdGVtIC5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW1JY29uIHtcbiAgYm9yZGVyOiBkb3VibGUgNHB4IHJnYigxODksIDIzNiwgMjQ4KTtcbn1cblxuLyogcGFja2FnZXMvZW5naW5lL1NvdXJjZS9XaWRnZXQvQ2VzaXVtV2lkZ2V0LmNzcyAqL1xuLmNlc2l1bS13aWRnZXQge1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4uY2VzaXVtLXdpZGdldCxcbi5jZXNpdW0td2lkZ2V0IGNhbnZhcyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHRvdWNoLWFjdGlvbjogbm9uZTtcbn1cbi5jZXNpdW0td2lkZ2V0LWNyZWRpdHMge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDEwcHg7XG4gIHRleHQtc2hhZG93OiAwcHggMHB4IDJweCAjMDAwMDAwO1xuICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG59XG4uY2VzaXVtLXdpZGdldC1lcnJvclBhbmVsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjcpO1xuICB6LWluZGV4OiA5OTk5OTtcbn1cbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWw6YmVmb3JlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGNvbnRlbnQ6IFwiXCI7XG59XG4uY2VzaXVtLXdpZGdldC1lcnJvclBhbmVsLWNvbnRlbnQge1xuICB3aWR0aDogNzUlO1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM1MTBjMDA7XG4gIGJvcmRlci1yYWRpdXM6IDdweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZDlkNTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzUxMGMwMDtcbn1cbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtY29udGVudC5leHBhbmRlZCB7XG4gIG1heC13aWR0aDogNzUlO1xufVxuLmNlc2l1bS13aWRnZXQtZXJyb3JQYW5lbC1oZWFkZXIge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtZmFtaWx5OlxuICAgIFwiT3BlbiBTYW5zXCIsXG4gICAgVmVyZGFuYSxcbiAgICBHZW5ldmEsXG4gICAgc2Fucy1zZXJpZjtcbiAgYmFja2dyb3VuZDogI2Q2OWQ5MztcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM1MTBjMDA7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAzcHggM3B4IDAgMDtcbiAgcGFkZGluZzogMTVweDtcbn1cbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtc2Nyb2xsIHtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGZvbnQtZmFtaWx5OlxuICAgIFwiT3BlbiBTYW5zXCIsXG4gICAgVmVyZGFuYSxcbiAgICBHZW5ldmEsXG4gICAgc2Fucy1zZXJpZjtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICBwYWRkaW5nOiAwIDE1cHg7XG4gIG1hcmdpbjogMTBweCAwIDIwcHggMDtcbn1cbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtYnV0dG9uUGFuZWwge1xuICBwYWRkaW5nOiAwIDE1cHg7XG4gIG1hcmdpbjogMTBweCAwIDIwcHggMDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG4uY2VzaXVtLXdpZGdldC1lcnJvclBhbmVsLWJ1dHRvblBhbmVsIGJ1dHRvbiB7XG4gIGJvcmRlci1jb2xvcjogIzUxMGMwMDtcbiAgYmFja2dyb3VuZDogI2Q2OWQ5MztcbiAgY29sb3I6ICMyMDIwMjA7XG4gIG1hcmdpbjogMDtcbn1cbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtYnV0dG9uUGFuZWwgYnV0dG9uOmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNTEwYzAwO1xuICBiYWNrZ3JvdW5kOiAjZjBkOWQ1O1xuICBjb2xvcjogIzUxMGMwMDtcbn1cbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtYnV0dG9uUGFuZWwgYnV0dG9uOmhvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjNTEwYzAwO1xuICBiYWNrZ3JvdW5kOiAjZjBkOWQ1O1xuICBjb2xvcjogIzUxMGMwMDtcbn1cbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtYnV0dG9uUGFuZWwgYnV0dG9uOmFjdGl2ZSB7XG4gIGJvcmRlci1jb2xvcjogIzUxMGMwMDtcbiAgYmFja2dyb3VuZDogI2IxN2I3MjtcbiAgY29sb3I6ICM1MTBjMDA7XG59XG4uY2VzaXVtLXdpZGdldC1lcnJvclBhbmVsLW1vcmUtZGV0YWlscyB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY2VzaXVtLXdpZGdldC1lcnJvclBhbmVsLW1vcmUtZGV0YWlsczpob3ZlciB7XG4gIGNvbG9yOiAjMmIwNzAwO1xufVxuXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9DZXNpdW1JbnNwZWN0b3IvQ2VzaXVtSW5zcGVjdG9yLmNzcyAqL1xuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Ige1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHRyYW5zaXRpb246IHdpZHRoIGVhc2UtaW4tb3V0IDAuMjVzO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDQ4LCA1MSwgNTQsIDAuOCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0NDQ7XG4gIGNvbG9yOiAjZWRmZmZmO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZzogNHB4IDEycHg7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1idXR0b24ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTFwdDtcbn1cbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXZpc2libGUgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItYnV0dG9uIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNhYWE7XG4gIHBhZGRpbmctYm90dG9tOiAzcHg7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3RvciBpbnB1dDplbmFibGVkLFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItYnV0dG9uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItdmlzaWJsZSB7XG4gIHdpZHRoOiAxODVweDtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItaGlkZGVuIHtcbiAgd2lkdGg6IDEyMnB4O1xuICBoZWlnaHQ6IDE3cHg7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zZWN0aW9uQ29udGVudCB7XG4gIG1heC1oZWlnaHQ6IDYwMHB4O1xufVxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbi1jb2xsYXBzZWQgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbkNvbnRlbnQge1xuICBtYXgtaGVpZ2h0OiAwO1xuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1kcm9wRG93biB7XG4gIG1hcmdpbjogNXB4IDA7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDEwcHQ7XG4gIHdpZHRoOiAxODVweDtcbn1cbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLWZydXN0dW1TdGF0aXN0aWNzIHtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICBwYWRkaW5nOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODAsIDgwLCA4MCwgMC43NSk7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1waWNrQnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDQ0O1xuICBjb2xvcjogI2VkZmZmZjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAzcHggN3B4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItcGlja0J1dHRvbjpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1waWNrQnV0dG9uOmFjdGl2ZSxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXBpY2tCdXR0b25IaWdobGlnaHQge1xuICBjb2xvcjogIzAwMDtcbiAgYmFja2dyb3VuZDogI2FkZjtcbiAgYm9yZGVyLWNvbG9yOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDAgOHB4ICNmZmY7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1jZW50ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zZWN0aW9uSGVhZGVyIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogMTBwdDtcbiAgbWFyZ2luOiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1waWNrU2VjdGlvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWE7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogM3B4O1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zZWN0aW9uQ29udGVudCB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4yNXM7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci10aWxlVGV4dCB7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2FhYTtcbn1cbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXJlbGF0aXZlVGV4dCB7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xufVxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbkhlYWRlcjo6YmVmb3JlIHtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIGNvbnRlbnQ6IFwiLVwiO1xuICB3aWR0aDogMWNoO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zZWN0aW9uLWNvbGxhcHNlZCAuY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zZWN0aW9uSGVhZGVyOjpiZWZvcmUge1xuICBjb250ZW50OiBcIitcIjtcbn1cblxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvQ2VzaXVtM0RUaWxlc0luc3BlY3Rvci9DZXNpdW0zRFRpbGVzSW5zcGVjdG9yLmNzcyAqL1xudWwuY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zdGF0aXN0aWNzIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nLXRvcDogM3B4O1xuICBwYWRkaW5nLWJvdHRvbTogM3B4O1xufVxudWwuY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zdGF0aXN0aWNzICsgdWwuY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zdGF0aXN0aWNzIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNhYWE7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zbGlkZXIge1xuICBtYXJnaW4tdG9wOiA1cHg7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zbGlkZXIgaW5wdXRbdHlwZT1udW1iZXJdIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ0NDtcbiAgY29sb3I6ICNlZGZmZmY7XG4gIHdpZHRoOiAxMDBweDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBwYWRkaW5nOiAxcHg7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBjdXJzb3I6IGF1dG87XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zbGlkZXIgaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2xpZGVyIGlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgbWFyZ2luOiAwO1xufVxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2xpZGVyIGlucHV0W3R5cGU9cmFuZ2VdIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLWhpZGUgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc3R5bGVFZGl0b3Ige1xuICBkaXNwbGF5OiBub25lO1xufVxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc3R5bGVFZGl0b3Ige1xuICBwYWRkaW5nOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoNDgsIDUxLCA1NCwgMC44KTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ0NDtcbn1cbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXN0eWxlRWRpdG9yIHRleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMzAwcHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogI2VkZmZmZjtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICB3aGl0ZS1zcGFjZTogcHJlO1xuICBvdmVyZmxvdy13cmFwOiBub3JtYWw7XG4gIG92ZXJmbG93LXg6IGF1dG87XG59XG4uY2VzaXVtLTNEVGlsZXNJbnNwZWN0b3Ige1xuICB3aWR0aDogMzAwcHg7XG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XG59XG4uY2VzaXVtLTNEVGlsZXNJbnNwZWN0b3Itc3RhdGlzdGljcyB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbn1cbi5jZXNpdW0tM0RUaWxlc0luc3BlY3Rvci1kaXNhYmxlZEVsZW1lbnRzSW5mbyB7XG4gIG1hcmdpbjogNXB4IDAgMCAwO1xuICBwYWRkaW5nOiAwIDAgMCAyMHB4O1xuICBjb2xvcjogI2VlZDIwMjtcbn1cbi5jZXNpdW0tM0RUaWxlc0luc3BlY3RvciBkaXYsXG4uY2VzaXVtLTNEVGlsZXNJbnNwZWN0b3IgaW5wdXRbdHlwZT1yYW5nZV0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLWVycm9yIHtcbiAgY29sb3I6ICNmZjllOWU7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuLmNlc2l1bS0zRFRpbGVzSW5zcGVjdG9yIC5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXNlY3Rpb24ge1xuICBtYXJnaW4tdG9wOiAzcHg7XG59XG4uY2VzaXVtLTNEVGlsZXNJbnNwZWN0b3IgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbkhlYWRlciArIC5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXNob3cge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgd2hpdGU7XG59XG5pbnB1dC5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXVybCB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBoZWlnaHQ6IDFlbTtcbiAgd2lkdGg6IDEwMCU7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3RvciAuZmllbGQtZ3JvdXAge1xuICBkaXNwbGF5OiB0YWJsZTtcbn1cbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yIC5maWVsZC1ncm91cCA+IGxhYmVsIHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uY2VzaXVtLWNlc2l1bUluc3BlY3RvciAuZmllbGQtZ3JvdXAgPiAuZmllbGQge1xuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvVm94ZWxJbnNwZWN0b3IvVm94ZWxJbnNwZWN0b3IuY3NzICovXG4uY2VzaXVtLVZveGVsSW5zcGVjdG9yIHtcbiAgd2lkdGg6IDMwMHB4O1xuICBwb2ludGVyLWV2ZW50czogYWxsO1xufVxuLmNlc2l1bS1Wb3hlbEluc3BlY3RvciBkaXYsXG4uY2VzaXVtLVZveGVsSW5zcGVjdG9yIGlucHV0W3R5cGU9cmFuZ2VdIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4uY2VzaXVtLVZveGVsSW5zcGVjdG9yIC5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXNlY3Rpb24ge1xuICBtYXJnaW4tdG9wOiAzcHg7XG59XG4uY2VzaXVtLVZveGVsSW5zcGVjdG9yIC5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXNlY3Rpb25IZWFkZXIgKyAuY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zaG93IHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHdoaXRlO1xufVxuXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9GdWxsc2NyZWVuQnV0dG9uL0Z1bGxzY3JlZW5CdXR0b24uY3NzICovXG4uY2VzaXVtLWJ1dHRvbi5jZXNpdW0tZnVsbHNjcmVlbkJ1dHRvbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtYXJnaW46IDA7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG59XG5cbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL1ZSQnV0dG9uL1ZSQnV0dG9uLmNzcyAqL1xuLmNlc2l1bS1idXR0b24uY2VzaXVtLXZyQnV0dG9uIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1hcmdpbjogMDtcbiAgYm9yZGVyLXJhZGl1czogMDtcbn1cblxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvR2VvY29kZXIvR2VvY29kZXIuY3NzICovXG4uY2VzaXVtLXZpZXdlci1nZW9jb2RlckNvbnRhaW5lciAuY2VzaXVtLWdlb2NvZGVyLWlucHV0IHtcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzQ0NDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MCwgNDAsIDQwLCAwLjcpO1xuICBjb2xvcjogd2hpdGU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMzJweDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwIDMycHggMCAwO1xuICBib3JkZXItcmFkaXVzOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB0cmFuc2l0aW9uOiB3aWR0aCBlYXNlLWluLW91dCAwLjI1cywgYmFja2dyb3VuZC1jb2xvciAwLjJzIGVhc2UtaW4tb3V0O1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG4uY2VzaXVtLXZpZXdlci1nZW9jb2RlckNvbnRhaW5lcjpob3ZlciAuY2VzaXVtLWdlb2NvZGVyLWlucHV0IHtcbiAgYm9yZGVyLWNvbG9yOiAjYWVmO1xuICBib3gtc2hhZG93OiAwIDAgOHB4ICNmZmY7XG59XG4uY2VzaXVtLXZpZXdlci1nZW9jb2RlckNvbnRhaW5lciAuY2VzaXVtLWdlb2NvZGVyLWlucHV0OmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjZWE0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE1LCAxNSwgMTUsIDAuOSk7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG59XG4uY2VzaXVtLXZpZXdlci1nZW9jb2RlckNvbnRhaW5lcjpob3ZlciAuY2VzaXVtLWdlb2NvZGVyLWlucHV0LFxuLmNlc2l1bS12aWV3ZXItZ2VvY29kZXJDb250YWluZXIgLmNlc2l1bS1nZW9jb2Rlci1pbnB1dDpmb2N1cyxcbi5jZXNpdW0tdmlld2VyLWdlb2NvZGVyQ29udGFpbmVyIC5jZXNpdW0tZ2VvY29kZXItaW5wdXQtd2lkZSB7XG4gIHBhZGRpbmctbGVmdDogNHB4O1xuICB3aWR0aDogMjUwcHg7XG59XG4uY2VzaXVtLXZpZXdlci1nZW9jb2RlckNvbnRhaW5lciAuc2VhcmNoLXJlc3VsdHMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG4gIGNvbG9yOiAjZWVlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBvcGFjaXR5OiAwLjg7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmNlc2l1bS12aWV3ZXItZ2VvY29kZXJDb250YWluZXIgLnNlYXJjaC1yZXN1bHRzIHVsIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG4uY2VzaXVtLXZpZXdlci1nZW9jb2RlckNvbnRhaW5lciAuc2VhcmNoLXJlc3VsdHMgdWwgbGkge1xuICBmb250LXNpemU6IDE0cHg7XG4gIHBhZGRpbmc6IDNweCAxMHB4O1xufVxuLmNlc2l1bS12aWV3ZXItZ2VvY29kZXJDb250YWluZXIgLnNlYXJjaC1yZXN1bHRzIHVsIGxpOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNlc2l1bS12aWV3ZXItZ2VvY29kZXJDb250YWluZXIgLnNlYXJjaC1yZXN1bHRzIHVsIGxpLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICM0OGI7XG59XG4uY2VzaXVtLWdlb2NvZGVyLXNlYXJjaEJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzMDMzMzY7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHdpZHRoOiAzMnB4O1xuICB0b3A6IDFweDtcbiAgcmlnaHQ6IDFweDtcbiAgaGVpZ2h0OiAzMHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBmaWxsOiAjZWRmZmZmO1xufVxuLmNlc2l1bS1nZW9jb2Rlci1zZWFyY2hCdXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDhiO1xufVxuXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9JbmZvQm94L0luZm9Cb3guY3NzICovXG4uY2VzaXVtLWluZm9Cb3gge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwcHg7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogNDAlO1xuICBtYXgtd2lkdGg6IDQ4MHB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDM4LCAzOCwgMzgsIDAuOTUpO1xuICBjb2xvcjogI2VkZmZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ0NDtcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA3cHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDdweDtcbiAgYm94LXNoYWRvdzogMCAwIDEwcHggMXB4ICMwMDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMCUsIDApO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246XG4gICAgdmlzaWJpbGl0eSAwcyAwLjJzLFxuICAgIG9wYWNpdHkgMC4ycyBlYXNlLWluLFxuICAgIHRyYW5zZm9ybSAwLjJzIGVhc2UtaW47XG59XG4uY2VzaXVtLWluZm9Cb3gtdmlzaWJsZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICBvcGFjaXR5OiAxO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZS1vdXQsIHRyYW5zZm9ybSAwLjJzIGVhc2Utb3V0O1xufVxuLmNlc2l1bS1pbmZvQm94LXRpdGxlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogMjBweDtcbiAgcGFkZGluZzogNXB4IDMwcHggNXB4IDI1cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoODQsIDg0LCA4NCwgMSk7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDdweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG59XG4uY2VzaXVtLWluZm9Cb3gtYm9keWxlc3MgLmNlc2l1bS1pbmZvQm94LXRpdGxlIHtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogN3B4O1xufVxuYnV0dG9uLmNlc2l1bS1pbmZvQm94LWNhbWVyYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNHB4O1xuICBsZWZ0OiA0cHg7XG4gIHdpZHRoOiAyMnB4O1xuICBoZWlnaHQ6IDIycHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHBhZGRpbmc6IDAgNXB4O1xuICBtYXJnaW46IDA7XG59XG5idXR0b24uY2VzaXVtLWluZm9Cb3gtY2xvc2Uge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDVweDtcbiAgcmlnaHQ6IDVweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDE2cHg7XG4gIHBhZGRpbmc6IDAgNXB4O1xuICBtYXJnaW46IDA7XG4gIGNvbG9yOiAjZWRmZmZmO1xufVxuYnV0dG9uLmNlc2l1bS1pbmZvQm94LWNsb3NlOmZvY3VzIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyMzgsIDEzNiwgMCwgMC40NCk7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5idXR0b24uY2VzaXVtLWluZm9Cb3gtY2xvc2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjODg4O1xuICBjb2xvcjogIzAwMDtcbn1cbmJ1dHRvbi5jZXNpdW0taW5mb0JveC1jbG9zZTphY3RpdmUge1xuICBiYWNrZ3JvdW5kOiAjYTAwO1xuICBjb2xvcjogIzAwMDtcbn1cbi5jZXNpdW0taW5mb0JveC1ib2R5bGVzcyAuY2VzaXVtLWluZm9Cb3gtaWZyYW1lIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5jZXNpdW0taW5mb0JveC1pZnJhbWUge1xuICBib3JkZXI6IG5vbmU7XG4gIHdpZHRoOiAxMDAlO1xuICB3aWR0aDogY2FsYygxMDAlIC0gMnB4KTtcbn1cblxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvU2NlbmVNb2RlUGlja2VyL1NjZW5lTW9kZVBpY2tlci5jc3MgKi9cbnNwYW4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbjogMCAzcHg7XG59XG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci12aXNpYmxlIHtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgb3BhY2l0eTogMTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjI1cyBsaW5lYXI7XG59XG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1oaWRkZW4ge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMHMgMC4yNXMsIG9wYWNpdHkgMC4yNXMgbGluZWFyO1xufVxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItd3JhcHBlciAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1ub25lIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLXNsaWRlLXN2ZyB7XG4gIHRyYW5zaXRpb246IGxlZnQgMnM7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbn1cbi5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItZHJvcERvd24taWNvbiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogM3B4IDA7XG59XG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbjNELFxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItd3JhcHBlciAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1idXR0b25Db2x1bWJ1c1ZpZXcsXG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbjJEIHtcbiAgbWFyZ2luOiAwIDAgM3B4IDA7XG59XG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbjNEIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWljb24yRCB7XG4gIGxlZnQ6IDEwMCU7XG59XG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbjNEIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWljb25Db2x1bWJ1c1ZpZXcge1xuICBsZWZ0OiAyMDAlO1xufVxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItd3JhcHBlciAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1idXR0b25Db2x1bWJ1c1ZpZXcgLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItaWNvbjNEIHtcbiAgbGVmdDogLTIwMCU7XG59XG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbkNvbHVtYnVzVmlldyAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1pY29uMkQge1xuICBsZWZ0OiAtMTAwJTtcbn1cbi5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItYnV0dG9uMkQgLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItaWNvbjNEIHtcbiAgbGVmdDogLTEwMCU7XG59XG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbjJEIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWljb25Db2x1bWJ1c1ZpZXcge1xuICBsZWZ0OiAxMDAlO1xufVxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItd3JhcHBlciAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1zZWxlY3RlZCB7XG4gIGJvcmRlci1jb2xvcjogIzJlMjtcbiAgYm94LXNoYWRvdzogMCAwIDhweCAjZmZmLCAwIDAgOHB4ICNmZmY7XG59XG5cbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL1Byb2plY3Rpb25QaWNrZXIvUHJvamVjdGlvblBpY2tlci5jc3MgKi9cbnNwYW4uY2VzaXVtLXByb2plY3Rpb25QaWNrZXItd3JhcHBlciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW46IDAgM3B4O1xufVxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXZpc2libGUge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICBvcGFjaXR5OiAxO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMjVzIGxpbmVhcjtcbn1cbi5jZXNpdW0tcHJvamVjdGlvblBpY2tlci1oaWRkZW4ge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMHMgMC4yNXMsIG9wYWNpdHkgMC4yNXMgbGluZWFyO1xufVxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLW5vbmUge1xuICBkaXNwbGF5OiBub25lO1xufVxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLWRyb3BEb3duLWljb24ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDNweCAwO1xufVxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLWJ1dHRvblBlcnNwZWN0aXZlLFxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLWJ1dHRvbk9ydGhvZ3JhcGhpYyB7XG4gIG1hcmdpbjogMCAwIDNweCAwO1xufVxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLWJ1dHRvblBlcnNwZWN0aXZlIC5jZXNpdW0tcHJvamVjdGlvblBpY2tlci1pY29uT3J0aG9ncmFwaGljIHtcbiAgbGVmdDogMTAwJTtcbn1cbi5jZXNpdW0tcHJvamVjdGlvblBpY2tlci13cmFwcGVyIC5jZXNpdW0tcHJvamVjdGlvblBpY2tlci1idXR0b25PcnRob2dyYXBoaWMgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLWljb25QZXJzcGVjdGl2ZSB7XG4gIGxlZnQ6IC0xMDAlO1xufVxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXNlbGVjdGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjMmUyO1xuICBib3gtc2hhZG93OiAwIDAgOHB4ICNmZmYsIDAgMCA4cHggI2ZmZjtcbn1cblxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvUGVyZm9ybWFuY2VXYXRjaGRvZy9QZXJmb3JtYW5jZVdhdGNoZG9nLmNzcyAqL1xuLmNlc2l1bS1wZXJmb3JtYW5jZS13YXRjaGRvZy1tZXNzYWdlLWFyZWEge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcbiAgY29sb3I6IGJsYWNrO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuLmNlc2l1bS1wZXJmb3JtYW5jZS13YXRjaGRvZy1tZXNzYWdlIHtcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xufVxuLmNlc2l1bS1wZXJmb3JtYW5jZS13YXRjaGRvZy1tZXNzYWdlLWRpc21pc3Mge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICBtYXJnaW46IDAgMTBweCAwIDA7XG59XG5cbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL05hdmlnYXRpb25IZWxwQnV0dG9uL05hdmlnYXRpb25IZWxwQnV0dG9uLmNzcyAqL1xuLmNlc2l1bS1uYXZpZ2F0aW9uSGVscEJ1dHRvbi13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4uY2VzaXVtLW5hdmlnYXRpb24taGVscCB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDM4cHg7XG4gIHJpZ2h0OiAycHg7XG4gIHdpZHRoOiAyNTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjAxKTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMjM0cHggLTEwcHg7XG4gIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMHMgMC4yNXMsIHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xufVxuLmNlc2l1bS1uYXZpZ2F0aW9uLWhlbHAtdmlzaWJsZSB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLW91dDtcbn1cbi5jZXNpdW0tbmF2aWdhdGlvbi1oZWxwLWluc3RydWN0aW9ucyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0NDQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzgsIDM4LCAzOCwgMC43NSk7XG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XG59XG4uY2VzaXVtLWNsaWNrLW5hdmlnYXRpb24taGVscCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uY2VzaXVtLXRvdWNoLW5hdmlnYXRpb24taGVscCB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG59XG4uY2VzaXVtLWNsaWNrLW5hdmlnYXRpb24taGVscC12aXNpYmxlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uY2VzaXVtLXRvdWNoLW5hdmlnYXRpb24taGVscC12aXNpYmxlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uY2VzaXVtLW5hdmlnYXRpb24taGVscC1wYW4ge1xuICBjb2xvcjogIzY2Y2NmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uY2VzaXVtLW5hdmlnYXRpb24taGVscC16b29tIHtcbiAgY29sb3I6ICM2NWZkMDA7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmNlc2l1bS1uYXZpZ2F0aW9uLWhlbHAtcm90YXRlIHtcbiAgY29sb3I6ICNmZmQ4MDA7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmNlc2l1bS1uYXZpZ2F0aW9uLWhlbHAtdGlsdCB7XG4gIGNvbG9yOiAjZDgwMGQ4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5jZXNpdW0tbmF2aWdhdGlvbi1oZWxwLWRldGFpbHMge1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cbi5jZXNpdW0tbmF2aWdhdGlvbi1idXR0b24ge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjNDQ0O1xuICBtYXJnaW46IDA7XG4gIHdpZHRoOiA1MCU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5jZXNpdW0tbmF2aWdhdGlvbi1idXR0b24taWNvbiB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHBhZGRpbmc6IDVweCAxcHg7XG59XG4uY2VzaXVtLW5hdmlnYXRpb24tYnV0dG9uOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cbi5jZXNpdW0tbmF2aWdhdGlvbi1idXR0b24tbGVmdCB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggMCAwIDA7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzQ0NDtcbn1cbi5jZXNpdW0tbmF2aWdhdGlvbi1idXR0b24tcmlnaHQge1xuICBib3JkZXItcmFkaXVzOiAwIDEwcHggMCAwO1xuICBib3JkZXItbGVmdDogbm9uZTtcbn1cbi5jZXNpdW0tbmF2aWdhdGlvbi1idXR0b24tc2VsZWN0ZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDM4LCAzOCwgMzgsIDAuNzUpO1xufVxuLmNlc2l1bS1uYXZpZ2F0aW9uLWJ1dHRvbi11bnNlbGVjdGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KTtcbn1cbi5jZXNpdW0tbmF2aWdhdGlvbi1idXR0b24tdW5zZWxlY3RlZDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzYsIDc2LCA3NiwgMC43NSk7XG59XG5cbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL1NlbGVjdGlvbkluZGljYXRvci9TZWxlY3Rpb25JbmRpY2F0b3IuY3NzICovXG4uY2VzaXVtLXNlbGVjdGlvbi13cmFwcGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTYwcHg7XG4gIGhlaWdodDogMTYwcHg7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMHMgMC4ycywgb3BhY2l0eSAwLjJzIGVhc2UtaW47XG59XG4uY2VzaXVtLXNlbGVjdGlvbi13cmFwcGVyLXZpc2libGUge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICBvcGFjaXR5OiAxO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZS1vdXQ7XG59XG4uY2VzaXVtLXNlbGVjdGlvbi13cmFwcGVyIHN2ZyB7XG4gIGZpbGw6ICMyZTI7XG4gIHN0cm9rZTogIzAwMDtcbiAgc3Ryb2tlLXdpZHRoOiAxLjFweDtcbn1cblxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvVGltZWxpbmUvVGltZWxpbmUuY3NzICovXG4uY2VzaXVtLXRpbWVsaW5lLW1haW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzg4ODtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cbi5jZXNpdW0tdGltZWxpbmUtdHJhY2tDb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGJvcmRlci10b3A6IHNvbGlkIDFweCAjODg4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbn1cbi5jZXNpdW0tdGltZWxpbmUtdHJhY2tzIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmNlc2l1bS10aW1lbGluZS1uZWVkbGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMS43ZW07XG4gIGJvdHRvbTogMDtcbiAgd2lkdGg6IDFweDtcbiAgYmFja2dyb3VuZDogI2YwMDtcbn1cbi5jZXNpdW0tdGltZWxpbmUtYmFyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMS43ZW07XG4gIGJhY2tncm91bmQ6XG4gICAgbGluZWFyLWdyYWRpZW50KFxuICAgICAgdG8gYm90dG9tLFxuICAgICAgcmdiYSgxMTYsIDExNywgMTE5LCAwLjgpIDAlLFxuICAgICAgcmdiYSg1OCwgNjgsIDgyLCAwLjgpIDExJSxcbiAgICAgIHJnYmEoNDYsIDUwLCA1NiwgMC44KSA0NiUsXG4gICAgICByZ2JhKDUzLCA1MywgNTMsIDAuOCkgODElLFxuICAgICAgcmdiYSg1MywgNTMsIDUzLCAwLjgpIDEwMCUpO1xufVxuLmNlc2l1bS10aW1lbGluZS1ydWxlciB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgZm9udC1zaXplOiA4MCU7XG4gIHotaW5kZXg6IC0yMDA7XG59XG4uY2VzaXVtLXRpbWVsaW5lLWhpZ2hsaWdodCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kOiAjMDhmO1xufVxuLmNlc2l1bS10aW1lbGluZS10aWNMYWJlbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBmb250LXNpemU6IDgwJTtcbiAgY29sb3I6ICNlZWU7XG59XG4uY2VzaXVtLXRpbWVsaW5lLXRpY01haW4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDFweDtcbiAgaGVpZ2h0OiA1MCU7XG4gIGJhY2tncm91bmQ6ICNlZWU7XG59XG4uY2VzaXVtLXRpbWVsaW5lLXRpY1N1YiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMXB4O1xuICBoZWlnaHQ6IDMzJTtcbiAgYmFja2dyb3VuZDogI2FhYTtcbn1cbi5jZXNpdW0tdGltZWxpbmUtdGljVGlueSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMXB4O1xuICBoZWlnaHQ6IDI1JTtcbiAgYmFja2dyb3VuZDogIzg4ODtcbn1cbi5jZXNpdW0tdGltZWxpbmUtaWNvbjE2IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDE2cHg7XG4gIGhlaWdodDogMTZweDtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xufVxuXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9WaWV3ZXIvVmlld2VyLmNzcyAqL1xuLmNlc2l1bS12aWV3ZXIge1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4uY2VzaXVtLXZpZXdlci1jZXNpdW1XaWRnZXRDb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLmNlc2l1bS12aWV3ZXItYm90dG9tIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG59XG4uY2VzaXVtLXZpZXdlciAuY2VzaXVtLXdpZGdldC1jcmVkaXRzIHtcbiAgZGlzcGxheTogaW5saW5lO1xuICBwb3NpdGlvbjogc3RhdGljO1xuICBib3R0b206IGF1dG87XG4gIGxlZnQ6IGF1dG87XG4gIHBhZGRpbmctcmlnaHQ6IDA7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LXNpemU6IDEwcHg7XG4gIHRleHQtc2hhZG93OiAwIDAgMnB4ICMwMDAwMDA7XG59XG4uY2VzaXVtLXZpZXdlci10aW1lbGluZUNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAxNjlweDtcbiAgcmlnaHQ6IDI5cHg7XG4gIGhlaWdodDogMjdweDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBmb250LXNpemU6IDE0cHg7XG59XG4uY2VzaXVtLXZpZXdlci1hbmltYXRpb25Db250YWluZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcGFkZGluZzogMDtcbiAgd2lkdGg6IDE2OXB4O1xuICBoZWlnaHQ6IDExMnB4O1xufVxuLmNlc2l1bS12aWV3ZXItZnVsbHNjcmVlbkNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgcGFkZGluZzogMDtcbiAgd2lkdGg6IDI5cHg7XG4gIGhlaWdodDogMjlweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi5jZXNpdW0tdmlld2VyLXZyQ29udGFpbmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBwYWRkaW5nOiAwO1xuICB3aWR0aDogMjlweDtcbiAgaGVpZ2h0OiAyOXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLmNlc2l1bS12aWV3ZXItdG9vbGJhciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNXB4O1xuICByaWdodDogNXB4O1xufVxuLmNlc2l1bS12aWV3ZXItY2VzaXVtSW5zcGVjdG9yQ29udGFpbmVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MHB4O1xuICByaWdodDogMTBweDtcbn1cbi5jZXNpdW0tdmlld2VyLWdlb2NvZGVyQ29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbjogMCAzcHg7XG59XG4uY2VzaXVtLXZpZXdlci1jZXNpdW0zRFRpbGVzSW5zcGVjdG9yQ29udGFpbmVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MHB4O1xuICByaWdodDogMTBweDtcbiAgbWF4LWhlaWdodDogY2FsYygxMDAlIC0gMTIwcHgpO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG59XG4uY2VzaXVtLXZpZXdlci12b3hlbEluc3BlY3RvckNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTBweDtcbiAgcmlnaHQ6IDEwcHg7XG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwJSAtIDEyMHB4KTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xufVxuXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9JM1NCdWlsZGluZ1NjZW5lTGF5ZXJFeHBsb3Jlci9JM1NCdWlsZGluZ1NjZW5lTGF5ZXJFeHBsb3Jlci5jc3MgKi9cbi5jZXNpdW0tdmlld2VyLWkzcy1leHBsb3JlciB1bCB7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbn1cbi5jZXNpdW0tdmlld2VyLWkzcy1leHBsb3JlciAubGF5ZXJzTGlzdCB7XG4gIHBhZGRpbmc6IDA7XG59XG4uY2VzaXVtLXZpZXdlci1pM3MtZXhwbG9yZXIgaW5wdXQge1xuICBtYXJnaW46IDAgM3B4IDAgMDtcbn1cbi5jZXNpdW0tdmlld2VyLWkzcy1leHBsb3JlciAuZXhwYW5kSXRlbSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHdpZHRoOiAyMHB4O1xufVxuLmNlc2l1bS12aWV3ZXItaTNzLWV4cGxvcmVyIC5uZXN0ZWQsXG4uY2VzaXVtLXZpZXdlci1pM3MtZXhwbG9yZXIgI2JzbC13cmFwcGVyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5jZXNpdW0tdmlld2VyLWkzcy1leHBsb3JlciAuYWN0aXZlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uY2VzaXVtLXZpZXdlci1pM3MtZXhwbG9yZXIgLmxpLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG59XG5cbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL3dpZGdldHMuY3NzICovXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9jZXNpdW0vQnVpbGQvQ2VzaXVtL1dpZGdldHMvd2lkZ2V0cy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsdUNBQXVDO0FBQ3ZDO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixjQUFjO0VBQ2QsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLHlCQUF5QjtFQUN6QixxQkFBcUI7RUFDckIsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7QUFDQTtFQUNFLFdBQVc7RUFDWCxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLFdBQVc7RUFDWCxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQix3QkFBd0I7QUFDMUI7QUFDQTs7Ozs7RUFLRSxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7QUFDQTtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0FBQ2I7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUNBOztFQUVFLGVBQWU7QUFDakI7QUFDQTtFQUNFLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0Usc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsVUFBVTtBQUNaO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULFdBQVc7RUFDWCxpQkFB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QUNsQixTQUFTO0VBQ1QsV0FBVztFQUNYLDhCQUE4QjtFQUM5QixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQSw0RkFBNEY7QUFDNUY7RUFDRSxxQkFBcUI7QUFDdkI7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFdBQVc7QUFDYjtBQUNBOztFQUVFLGFBQWE7QUFDZjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixxQkFBcUI7QUFDdkI7O0FBRUEsd0NBQXdDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL3NoYXJlZC5jc3MgKi9cXG4uY2VzaXVtLXN2Z1BhdGgtc3ZnIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5jZXNpdW0tYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6ICMzMDMzMzY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjNDQ0O1xcbiAgY29sb3I6ICNlZGZmZmY7XFxuICBmaWxsOiAjZWRmZmZmO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgcGFkZGluZzogNXB4IDEycHg7XFxuICBtYXJnaW46IDJweCAzcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLmNlc2l1bS1idXR0b246Zm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxuICBmaWxsOiAjZmZmO1xcbiAgYm9yZGVyLWNvbG9yOiAjZWE0O1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuLmNlc2l1bS1idXR0b246aG92ZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBmaWxsOiAjZmZmO1xcbiAgYmFja2dyb3VuZDogIzQ4YjtcXG4gIGJvcmRlci1jb2xvcjogI2FlZjtcXG4gIGJveC1zaGFkb3c6IDAgMCA4cHggI2ZmZjtcXG59XFxuLmNlc2l1bS1idXR0b246YWN0aXZlIHtcXG4gIGNvbG9yOiAjMDAwO1xcbiAgZmlsbDogIzAwMDtcXG4gIGJhY2tncm91bmQ6ICNhZGY7XFxuICBib3JkZXItY29sb3I6ICNmZmY7XFxuICBib3gtc2hhZG93OiAwIDAgOHB4ICNmZmY7XFxufVxcbi5jZXNpdW0tYnV0dG9uOmRpc2FibGVkLFxcbi5jZXNpdW0tYnV0dG9uLWRpc2FibGVkLFxcbi5jZXNpdW0tYnV0dG9uLWRpc2FibGVkOmZvY3VzLFxcbi5jZXNpdW0tYnV0dG9uLWRpc2FibGVkOmhvdmVyLFxcbi5jZXNpdW0tYnV0dG9uLWRpc2FibGVkOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kOiAjMzAzMzM2O1xcbiAgYm9yZGVyLWNvbG9yOiAjNDQ0O1xcbiAgY29sb3I6ICM2NDY0NjQ7XFxuICBmaWxsOiAjNjQ2NDY0O1xcbiAgYm94LXNoYWRvdzogbm9uZTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuLmNlc2l1bS1idXR0b24gb3B0aW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBjb2xvcjogI2VlZTtcXG59XFxuLmNlc2l1bS1idXR0b24gb3B0aW9uOmRpc2FibGVkIHtcXG4gIGNvbG9yOiAjNzc3O1xcbn1cXG4uY2VzaXVtLWJ1dHRvbiBpbnB1dCxcXG4uY2VzaXVtLWJ1dHRvbiBsYWJlbCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5jZXNpdW0tYnV0dG9uIGlucHV0IHtcXG4gIHZlcnRpY2FsLWFsaWduOiBzdWI7XFxufVxcbi5jZXNpdW0tdG9vbGJhci1idXR0b24ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHdpZHRoOiAzMnB4O1xcbiAgaGVpZ2h0OiAzMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTQlO1xcbiAgcGFkZGluZzogMDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICB6LWluZGV4OiAwO1xcbn1cXG4uY2VzaXVtLXBlcmZvcm1hbmNlRGlzcGxheS1kZWZhdWx0Q29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTBweDtcXG4gIHJpZ2h0OiAxMHB4O1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcbi5jZXNpdW0tcGVyZm9ybWFuY2VEaXNwbGF5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDQwLCA0MCwgMC43KTtcXG4gIHBhZGRpbmc6IDdweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM0NDQ7XFxuICBmb250OiBib2xkIDEycHggc2Fucy1zZXJpZjtcXG59XFxuLmNlc2l1bS1wZXJmb3JtYW5jZURpc3BsYXktZnBzIHtcXG4gIGNvbG9yOiAjZTUyO1xcbn1cXG4uY2VzaXVtLXBlcmZvcm1hbmNlRGlzcGxheS10aHJvdHRsZWQge1xcbiAgY29sb3I6ICNhNDI7XFxufVxcbi5jZXNpdW0tcGVyZm9ybWFuY2VEaXNwbGF5LW1zIHtcXG4gIGNvbG9yOiAjZGUzO1xcbn1cXG5cXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9BbmltYXRpb24vQW5pbWF0aW9uLmNzcyAqL1xcbi5jZXNpdW0tYW5pbWF0aW9uLXRoZW1lIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogLTEwMDtcXG59XFxuLmNlc2l1bS1hbmltYXRpb24tdGhlbWVOb3JtYWwge1xcbiAgY29sb3I6ICMyMjI7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLXRoZW1lSG92ZXIge1xcbiAgY29sb3I6ICM0NDg4YjA7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLXRoZW1lU2VsZWN0IHtcXG4gIGNvbG9yOiAjMjQyO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi10aGVtZURpc2FibGVkIHtcXG4gIGNvbG9yOiAjMzMzO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi10aGVtZUtub2Ige1xcbiAgY29sb3I6ICMyMjI7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLXRoZW1lUG9pbnRlciB7XFxuICBjb2xvcjogIzJlMjtcXG59XFxuLmNlc2l1bS1hbmltYXRpb24tdGhlbWVTd29vc2gge1xcbiAgY29sb3I6ICM4YWM7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLXRoZW1lU3dvb3NoSG92ZXIge1xcbiAgY29sb3I6ICNhZWY7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLXN2Z1RleHQge1xcbiAgZmlsbDogI2VkZmZmZjtcXG4gIGZvbnQtZmFtaWx5OiBTYW5zLVNlcmlmO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgdGV4dC1hbmNob3I6IG1pZGRsZTtcXG59XFxuLmNlc2l1bS1hbmltYXRpb24tYmxhbmsge1xcbiAgZmlsbDogIzAwMDtcXG4gIGZpbGwtb3BhY2l0eTogMC4wMTtcXG4gIHN0cm9rZTogbm9uZTtcXG59XFxuLmNlc2l1bS1hbmltYXRpb24tcmVjdEJ1dHRvbiB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi1yZWN0QnV0dG9uIC5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvbkdsb3cge1xcbiAgZmlsbDogI2ZmZjtcXG4gIHN0cm9rZTogbm9uZTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLXJlY3RCdXR0b246aG92ZXIgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uR2xvdyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLmNlc2l1bS1hbmltYXRpb24tcmVjdEJ1dHRvbiAuY2VzaXVtLWFuaW1hdGlvbi1idXR0b25QYXRoIHtcXG4gIGZpbGw6ICNlZGZmZmY7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLXJlY3RCdXR0b24gLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uTWFpbiB7XFxuICBzdHJva2U6ICM0NDQ7XFxuICBzdHJva2Utd2lkdGg6IDEuMjtcXG59XFxuLmNlc2l1bS1hbmltYXRpb24tcmVjdEJ1dHRvbjpob3ZlciAuY2VzaXVtLWFuaW1hdGlvbi1idXR0b25NYWluIHtcXG4gIHN0cm9rZTogI2FlZjtcXG59XFxuLmNlc2l1bS1hbmltYXRpb24tcmVjdEJ1dHRvbjphY3RpdmUgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uTWFpbiB7XFxuICBmaWxsOiAjYWJkNmZmO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi1idXR0b25EaXNhYmxlZCB7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi1idXR0b25EaXNhYmxlZCAuY2VzaXVtLWFuaW1hdGlvbi1idXR0b25NYWluIHtcXG4gIHN0cm9rZTogIzU1NTtcXG59XFxuLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uRGlzYWJsZWQgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uUGF0aCB7XFxuICBmaWxsOiAjODE4MTgxO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi1idXR0b25EaXNhYmxlZCAuY2VzaXVtLWFuaW1hdGlvbi1idXR0b25HbG93IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvblRvZ2dsZWQgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uR2xvdyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZpbGw6ICMyZTI7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvblRvZ2dsZWQgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uTWFpbiB7XFxuICBzdHJva2U6ICMyZTI7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvblRvZ2dsZWQ6aG92ZXIgLmNlc2l1bS1hbmltYXRpb24tYnV0dG9uR2xvdyB7XFxuICBmaWxsOiAjZmZmO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi1idXR0b25Ub2dnbGVkOmhvdmVyIC5jZXNpdW0tYW5pbWF0aW9uLWJ1dHRvbk1haW4ge1xcbiAgc3Ryb2tlOiAjMmUyO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi1zaHV0dGxlUmluZ0cge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi1zaHV0dGxlUmluZ1BvaW50ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi1zaHV0dGxlUmluZ1BhdXNlUG9pbnRlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLXNodXR0bGVSaW5nQmFjayB7XFxuICBmaWxsOiAjMTgxODE4O1xcbiAgZmlsbC1vcGFjaXR5OiAwLjg7XFxuICBzdHJva2U6ICMzMzM7XFxuICBzdHJva2Utd2lkdGg6IDEuMjtcXG59XFxuLmNlc2l1bS1hbmltYXRpb24tc2h1dHRsZVJpbmdTd29vc2ggbGluZSB7XFxuICBzdHJva2U6ICM4YWM7XFxuICBzdHJva2Utd2lkdGg6IDM7XFxuICBzdHJva2Utb3BhY2l0eTogMC4yO1xcbiAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kO1xcbn1cXG4uY2VzaXVtLWFuaW1hdGlvbi1rbm9iT3V0ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgc3Ryb2tlOiAjNDQ0O1xcbiAgc3Ryb2tlLXdpZHRoOiAxLjI7XFxufVxcbi5jZXNpdW0tYW5pbWF0aW9uLWtub2JJbm5lciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL0Jhc2VMYXllclBpY2tlci9CYXNlTGF5ZXJQaWNrZXIuY3NzICovXFxuLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItc2VsZWN0ZWQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1kcm9wRG93biB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgdG9wOiBhdXRvO1xcbiAgcmlnaHQ6IDA7XFxuICB3aWR0aDogMzIwcHg7XFxuICBtYXgtaGVpZ2h0OiA1MDBweDtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzgsIDM4LCAzOCwgMC43NSk7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjNDQ0O1xcbiAgcGFkZGluZzogNnB4O1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yMCUpO1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246XFxuICAgIHZpc2liaWxpdHkgMHMgMC4ycyxcXG4gICAgb3BhY2l0eSAwLjJzIGVhc2UtaW4sXFxuICAgIHRyYW5zZm9ybSAwLjJzIGVhc2UtaW47XFxufVxcbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWRyb3BEb3duLXZpc2libGUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgb3BhY2l0eTogMTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlLW91dCwgdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQ7XFxufVxcbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLXNlY3Rpb25UaXRsZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNnB0O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGNvbG9yOiAjZWRmZmZmO1xcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xcbn1cXG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1jaG9pY2VzIHtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItY2F0ZWdvcnlUaXRsZSB7XFxuICBjb2xvcjogI2VkZmZmZjtcXG4gIGZvbnQtc2l6ZTogMTFwdDtcXG59XFxuLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItY2hvaWNlcyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBwYWRkaW5nOiA1cHggMDtcXG59XFxuLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItaXRlbSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbiAgbWFyZ2luOiAycHggNXB4O1xcbiAgd2lkdGg6IDY0cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW1MYWJlbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiA4cHQ7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgY29sb3I6ICNlZGZmZmY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XFxufVxcbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW06aG92ZXIgLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItaXRlbUxhYmVsLFxcbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW06Zm9jdXMgLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItaXRlbUxhYmVsIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG4uY2VzaXVtLWJhc2VMYXllclBpY2tlci1pdGVtSWNvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogaW5oZXJpdDtcXG4gIGhlaWdodDogYXV0bztcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzQ0NDtcXG4gIGJvcmRlci1yYWRpdXM6IDlweDtcXG4gIGNvbG9yOiAjZWRmZmZmO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW06aG92ZXIgLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItaXRlbUljb24ge1xcbiAgYm9yZGVyLWNvbG9yOiAjZmZmO1xcbiAgYm94LXNoYWRvdzogMCAwIDhweCAjZmZmLCAwIDAgOHB4ICNmZmY7XFxufVxcbi5jZXNpdW0tYmFzZUxheWVyUGlja2VyLXNlbGVjdGVkSXRlbSAuY2VzaXVtLWJhc2VMYXllclBpY2tlci1pdGVtTGFiZWwge1xcbiAgY29sb3I6IHJnYigxODksIDIzNiwgMjQ4KTtcXG59XFxuLmNlc2l1bS1iYXNlTGF5ZXJQaWNrZXItc2VsZWN0ZWRJdGVtIC5jZXNpdW0tYmFzZUxheWVyUGlja2VyLWl0ZW1JY29uIHtcXG4gIGJvcmRlcjogZG91YmxlIDRweCByZ2IoMTg5LCAyMzYsIDI0OCk7XFxufVxcblxcbi8qIHBhY2thZ2VzL2VuZ2luZS9Tb3VyY2UvV2lkZ2V0L0Nlc2l1bVdpZGdldC5jc3MgKi9cXG4uY2VzaXVtLXdpZGdldCB7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuLmNlc2l1bS13aWRnZXQsXFxuLmNlc2l1bS13aWRnZXQgY2FudmFzIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgdG91Y2gtYWN0aW9uOiBub25lO1xcbn1cXG4uY2VzaXVtLXdpZGdldC1jcmVkaXRzIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgdGV4dC1zaGFkb3c6IDBweCAwcHggMnB4ICMwMDAwMDA7XFxuICBwYWRkaW5nLXJpZ2h0OiA1cHg7XFxufVxcbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjcpO1xcbiAgei1pbmRleDogOTk5OTk7XFxufVxcbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWw6YmVmb3JlIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG59XFxuLmNlc2l1bS13aWRnZXQtZXJyb3JQYW5lbC1jb250ZW50IHtcXG4gIHdpZHRoOiA3NSU7XFxuICBtYXgtd2lkdGg6IDUwMHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjNTEwYzAwO1xcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZDlkNTtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGNvbG9yOiAjNTEwYzAwO1xcbn1cXG4uY2VzaXVtLXdpZGdldC1lcnJvclBhbmVsLWNvbnRlbnQuZXhwYW5kZWQge1xcbiAgbWF4LXdpZHRoOiA3NSU7XFxufVxcbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtaGVhZGVyIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtZmFtaWx5OlxcbiAgICBcXFwiT3BlbiBTYW5zXFxcIixcXG4gICAgVmVyZGFuYSxcXG4gICAgR2VuZXZhLFxcbiAgICBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZDogI2Q2OWQ5MztcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjNTEwYzAwO1xcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHggM3B4IDAgMDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxufVxcbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtc2Nyb2xsIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgZm9udC1mYW1pbHk6XFxuICAgIFxcXCJPcGVuIFNhbnNcXFwiLFxcbiAgICBWZXJkYW5hLFxcbiAgICBHZW5ldmEsXFxuICAgIHNhbnMtc2VyaWY7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICBwYWRkaW5nOiAwIDE1cHg7XFxuICBtYXJnaW46IDEwcHggMCAyMHB4IDA7XFxufVxcbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtYnV0dG9uUGFuZWwge1xcbiAgcGFkZGluZzogMCAxNXB4O1xcbiAgbWFyZ2luOiAxMHB4IDAgMjBweCAwO1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtYnV0dG9uUGFuZWwgYnV0dG9uIHtcXG4gIGJvcmRlci1jb2xvcjogIzUxMGMwMDtcXG4gIGJhY2tncm91bmQ6ICNkNjlkOTM7XFxuICBjb2xvcjogIzIwMjAyMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuLmNlc2l1bS13aWRnZXQtZXJyb3JQYW5lbC1idXR0b25QYW5lbCBidXR0b246Zm9jdXMge1xcbiAgYm9yZGVyLWNvbG9yOiAjNTEwYzAwO1xcbiAgYmFja2dyb3VuZDogI2YwZDlkNTtcXG4gIGNvbG9yOiAjNTEwYzAwO1xcbn1cXG4uY2VzaXVtLXdpZGdldC1lcnJvclBhbmVsLWJ1dHRvblBhbmVsIGJ1dHRvbjpob3ZlciB7XFxuICBib3JkZXItY29sb3I6ICM1MTBjMDA7XFxuICBiYWNrZ3JvdW5kOiAjZjBkOWQ1O1xcbiAgY29sb3I6ICM1MTBjMDA7XFxufVxcbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtYnV0dG9uUGFuZWwgYnV0dG9uOmFjdGl2ZSB7XFxuICBib3JkZXItY29sb3I6ICM1MTBjMDA7XFxuICBiYWNrZ3JvdW5kOiAjYjE3YjcyO1xcbiAgY29sb3I6ICM1MTBjMDA7XFxufVxcbi5jZXNpdW0td2lkZ2V0LWVycm9yUGFuZWwtbW9yZS1kZXRhaWxzIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uY2VzaXVtLXdpZGdldC1lcnJvclBhbmVsLW1vcmUtZGV0YWlsczpob3ZlciB7XFxuICBjb2xvcjogIzJiMDcwMDtcXG59XFxuXFxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvQ2VzaXVtSW5zcGVjdG9yL0Nlc2l1bUluc3BlY3Rvci5jc3MgKi9cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3RvciB7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICB0cmFuc2l0aW9uOiB3aWR0aCBlYXNlLWluLW91dCAwLjI1cztcXG4gIGJhY2tncm91bmQ6IHJnYmEoNDgsIDUxLCA1NCwgMC44KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM0NDQ7XFxuICBjb2xvcjogI2VkZmZmZjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDRweCAxMnB4O1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLWJ1dHRvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDExcHQ7XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXZpc2libGUgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItYnV0dG9uIHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYWFhO1xcbiAgcGFkZGluZy1ib3R0b206IDNweDtcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3IgaW5wdXQ6ZW5hYmxlZCxcXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1idXR0b24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci12aXNpYmxlIHtcXG4gIHdpZHRoOiAxODVweDtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItaGlkZGVuIHtcXG4gIHdpZHRoOiAxMjJweDtcXG4gIGhlaWdodDogMTdweDtcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbkNvbnRlbnQge1xcbiAgbWF4LWhlaWdodDogNjAwcHg7XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXNlY3Rpb24tY29sbGFwc2VkIC5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXNlY3Rpb25Db250ZW50IHtcXG4gIG1heC1oZWlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1kcm9wRG93biB7XFxuICBtYXJnaW46IDVweCAwO1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDEwcHQ7XFxuICB3aWR0aDogMTg1cHg7XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLWZydXN0dW1TdGF0aXN0aWNzIHtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODAsIDgwLCA4MCwgMC43NSk7XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXBpY2tCdXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ0NDtcXG4gIGNvbG9yOiAjZWRmZmZmO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgcGFkZGluZzogM3B4IDdweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBtYXJnaW46IDAgYXV0bztcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItcGlja0J1dHRvbjpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1waWNrQnV0dG9uOmFjdGl2ZSxcXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1waWNrQnV0dG9uSGlnaGxpZ2h0IHtcXG4gIGNvbG9yOiAjMDAwO1xcbiAgYmFja2dyb3VuZDogI2FkZjtcXG4gIGJvcmRlci1jb2xvcjogI2ZmZjtcXG4gIGJveC1zaGFkb3c6IDAgMCA4cHggI2ZmZjtcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItY2VudGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbkhlYWRlciB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc2l6ZTogMTBwdDtcXG4gIG1hcmdpbjogMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItcGlja1NlY3Rpb24ge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhYTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHBhZGRpbmc6IDNweDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbkNvbnRlbnQge1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4yNXM7XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXRpbGVUZXh0IHtcXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNhYWE7XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXJlbGF0aXZlVGV4dCB7XFxuICBwYWRkaW5nLXRvcDogMTBweDtcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbkhlYWRlcjo6YmVmb3JlIHtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgY29udGVudDogXFxcIi1cXFwiO1xcbiAgd2lkdGg6IDFjaDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbi1jb2xsYXBzZWQgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbkhlYWRlcjo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIrXFxcIjtcXG59XFxuXFxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvQ2VzaXVtM0RUaWxlc0luc3BlY3Rvci9DZXNpdW0zRFRpbGVzSW5zcGVjdG9yLmNzcyAqL1xcbnVsLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc3RhdGlzdGljcyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nLXRvcDogM3B4O1xcbiAgcGFkZGluZy1ib3R0b206IDNweDtcXG59XFxudWwuY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zdGF0aXN0aWNzICsgdWwuY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zdGF0aXN0aWNzIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjYWFhO1xcbn1cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zbGlkZXIge1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zbGlkZXIgaW5wdXRbdHlwZT1udW1iZXJdIHtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM0NDQ7XFxuICBjb2xvcjogI2VkZmZmZjtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHBhZGRpbmc6IDFweDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgY3Vyc29yOiBhdXRvO1xcbn1cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zbGlkZXIgaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXNsaWRlciBpbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zbGlkZXIgaW5wdXRbdHlwZT1yYW5nZV0ge1xcbiAgbWFyZ2luLWxlZnQ6IDVweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLWhpZGUgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc3R5bGVFZGl0b3Ige1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc3R5bGVFZGl0b3Ige1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoNDgsIDUxLCA1NCwgMC44KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM0NDQ7XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXN0eWxlRWRpdG9yIHRleHRhcmVhIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAzMDBweDtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICNlZGZmZmY7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbiAgd2hpdGUtc3BhY2U6IHByZTtcXG4gIG92ZXJmbG93LXdyYXA6IG5vcm1hbDtcXG4gIG92ZXJmbG93LXg6IGF1dG87XFxufVxcbi5jZXNpdW0tM0RUaWxlc0luc3BlY3RvciB7XFxuICB3aWR0aDogMzAwcHg7XFxuICBwb2ludGVyLWV2ZW50czogYWxsO1xcbn1cXG4uY2VzaXVtLTNEVGlsZXNJbnNwZWN0b3Itc3RhdGlzdGljcyB7XFxuICBmb250LXNpemU6IDExcHg7XFxufVxcbi5jZXNpdW0tM0RUaWxlc0luc3BlY3Rvci1kaXNhYmxlZEVsZW1lbnRzSW5mbyB7XFxuICBtYXJnaW46IDVweCAwIDAgMDtcXG4gIHBhZGRpbmc6IDAgMCAwIDIwcHg7XFxuICBjb2xvcjogI2VlZDIwMjtcXG59XFxuLmNlc2l1bS0zRFRpbGVzSW5zcGVjdG9yIGRpdixcXG4uY2VzaXVtLTNEVGlsZXNJbnNwZWN0b3IgaW5wdXRbdHlwZT1yYW5nZV0ge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1lcnJvciB7XFxuICBjb2xvcjogI2ZmOWU5ZTtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG4uY2VzaXVtLTNEVGlsZXNJbnNwZWN0b3IgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbiB7XFxuICBtYXJnaW4tdG9wOiAzcHg7XFxufVxcbi5jZXNpdW0tM0RUaWxlc0luc3BlY3RvciAuY2VzaXVtLWNlc2l1bUluc3BlY3Rvci1zZWN0aW9uSGVhZGVyICsgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2hvdyB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgd2hpdGU7XFxufVxcbmlucHV0LmNlc2l1bS1jZXNpdW1JbnNwZWN0b3ItdXJsIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogd2hpdGU7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgaGVpZ2h0OiAxZW07XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3IgLmZpZWxkLWdyb3VwIHtcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbn1cXG4uY2VzaXVtLWNlc2l1bUluc3BlY3RvciAuZmllbGQtZ3JvdXAgPiBsYWJlbCB7XFxuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yIC5maWVsZC1ncm91cCA+IC5maWVsZCB7XFxuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL1ZveGVsSW5zcGVjdG9yL1ZveGVsSW5zcGVjdG9yLmNzcyAqL1xcbi5jZXNpdW0tVm94ZWxJbnNwZWN0b3Ige1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuLmNlc2l1bS1Wb3hlbEluc3BlY3RvciBkaXYsXFxuLmNlc2l1bS1Wb3hlbEluc3BlY3RvciBpbnB1dFt0eXBlPXJhbmdlXSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5jZXNpdW0tVm94ZWxJbnNwZWN0b3IgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbiB7XFxuICBtYXJnaW4tdG9wOiAzcHg7XFxufVxcbi5jZXNpdW0tVm94ZWxJbnNwZWN0b3IgLmNlc2l1bS1jZXNpdW1JbnNwZWN0b3Itc2VjdGlvbkhlYWRlciArIC5jZXNpdW0tY2VzaXVtSW5zcGVjdG9yLXNob3cge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHdoaXRlO1xcbn1cXG5cXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9GdWxsc2NyZWVuQnV0dG9uL0Z1bGxzY3JlZW5CdXR0b24uY3NzICovXFxuLmNlc2l1bS1idXR0b24uY2VzaXVtLWZ1bGxzY3JlZW5CdXR0b24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1hcmdpbjogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcblxcbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL1ZSQnV0dG9uL1ZSQnV0dG9uLmNzcyAqL1xcbi5jZXNpdW0tYnV0dG9uLmNlc2l1bS12ckJ1dHRvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuXFxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvR2VvY29kZXIvR2VvY29kZXIuY3NzICovXFxuLmNlc2l1bS12aWV3ZXItZ2VvY29kZXJDb250YWluZXIgLmNlc2l1bS1nZW9jb2Rlci1pbnB1dCB7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjNDQ0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MCwgNDAsIDQwLCAwLjcpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAzMnB4O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMCAzMnB4IDAgMDtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgdHJhbnNpdGlvbjogd2lkdGggZWFzZS1pbi1vdXQgMC4yNXMsIGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlLWluLW91dDtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuLmNlc2l1bS12aWV3ZXItZ2VvY29kZXJDb250YWluZXI6aG92ZXIgLmNlc2l1bS1nZW9jb2Rlci1pbnB1dCB7XFxuICBib3JkZXItY29sb3I6ICNhZWY7XFxuICBib3gtc2hhZG93OiAwIDAgOHB4ICNmZmY7XFxufVxcbi5jZXNpdW0tdmlld2VyLWdlb2NvZGVyQ29udGFpbmVyIC5jZXNpdW0tZ2VvY29kZXItaW5wdXQ6Zm9jdXMge1xcbiAgYm9yZGVyLWNvbG9yOiAjZWE0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNSwgMTUsIDE1LCAwLjkpO1xcbiAgYm94LXNoYWRvdzogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcbi5jZXNpdW0tdmlld2VyLWdlb2NvZGVyQ29udGFpbmVyOmhvdmVyIC5jZXNpdW0tZ2VvY29kZXItaW5wdXQsXFxuLmNlc2l1bS12aWV3ZXItZ2VvY29kZXJDb250YWluZXIgLmNlc2l1bS1nZW9jb2Rlci1pbnB1dDpmb2N1cyxcXG4uY2VzaXVtLXZpZXdlci1nZW9jb2RlckNvbnRhaW5lciAuY2VzaXVtLWdlb2NvZGVyLWlucHV0LXdpZGUge1xcbiAgcGFkZGluZy1sZWZ0OiA0cHg7XFxuICB3aWR0aDogMjUwcHg7XFxufVxcbi5jZXNpdW0tdmlld2VyLWdlb2NvZGVyQ29udGFpbmVyIC5zZWFyY2gtcmVzdWx0cyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgY29sb3I6ICNlZWU7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgb3BhY2l0eTogMC44O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5jZXNpdW0tdmlld2VyLWdlb2NvZGVyQ29udGFpbmVyIC5zZWFyY2gtcmVzdWx0cyB1bCB7XFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG4uY2VzaXVtLXZpZXdlci1nZW9jb2RlckNvbnRhaW5lciAuc2VhcmNoLXJlc3VsdHMgdWwgbGkge1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogM3B4IDEwcHg7XFxufVxcbi5jZXNpdW0tdmlld2VyLWdlb2NvZGVyQ29udGFpbmVyIC5zZWFyY2gtcmVzdWx0cyB1bCBsaTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5jZXNpdW0tdmlld2VyLWdlb2NvZGVyQ29udGFpbmVyIC5zZWFyY2gtcmVzdWx0cyB1bCBsaS5hY3RpdmUge1xcbiAgYmFja2dyb3VuZDogIzQ4YjtcXG59XFxuLmNlc2l1bS1nZW9jb2Rlci1zZWFyY2hCdXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMwMzMzNjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHdpZHRoOiAzMnB4O1xcbiAgdG9wOiAxcHg7XFxuICByaWdodDogMXB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIGZpbGw6ICNlZGZmZmY7XFxufVxcbi5jZXNpdW0tZ2VvY29kZXItc2VhcmNoQnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0OGI7XFxufVxcblxcbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL0luZm9Cb3gvSW5mb0JveC5jc3MgKi9cXG4uY2VzaXVtLWluZm9Cb3gge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwcHg7XFxuICByaWdodDogMDtcXG4gIHdpZHRoOiA0MCU7XFxuICBtYXgtd2lkdGg6IDQ4MHB4O1xcbiAgYmFja2dyb3VuZDogcmdiYSgzOCwgMzgsIDM4LCAwLjk1KTtcXG4gIGNvbG9yOiAjZWRmZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ0NDtcXG4gIGJvcmRlci1yaWdodDogbm9uZTtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDdweDtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDdweDtcXG4gIGJveC1zaGFkb3c6IDAgMCAxMHB4IDFweCAjMDAwO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwJSwgMCk7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjpcXG4gICAgdmlzaWJpbGl0eSAwcyAwLjJzLFxcbiAgICBvcGFjaXR5IDAuMnMgZWFzZS1pbixcXG4gICAgdHJhbnNmb3JtIDAuMnMgZWFzZS1pbjtcXG59XFxuLmNlc2l1bS1pbmZvQm94LXZpc2libGUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgb3BhY2l0eTogMTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlLW91dCwgdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQ7XFxufVxcbi5jZXNpdW0taW5mb0JveC10aXRsZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogMjBweDtcXG4gIHBhZGRpbmc6IDVweCAzMHB4IDVweCAyNXB4O1xcbiAgYmFja2dyb3VuZDogcmdiYSg4NCwgODQsIDg0LCAxKTtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDdweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG59XFxuLmNlc2l1bS1pbmZvQm94LWJvZHlsZXNzIC5jZXNpdW0taW5mb0JveC10aXRsZSB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA3cHg7XFxufVxcbmJ1dHRvbi5jZXNpdW0taW5mb0JveC1jYW1lcmEge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDRweDtcXG4gIGxlZnQ6IDRweDtcXG4gIHdpZHRoOiAyMnB4O1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgcGFkZGluZzogMCA1cHg7XFxuICBtYXJnaW46IDA7XFxufVxcbmJ1dHRvbi5jZXNpdW0taW5mb0JveC1jbG9zZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNXB4O1xcbiAgcmlnaHQ6IDVweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBwYWRkaW5nOiAwIDVweDtcXG4gIG1hcmdpbjogMDtcXG4gIGNvbG9yOiAjZWRmZmZmO1xcbn1cXG5idXR0b24uY2VzaXVtLWluZm9Cb3gtY2xvc2U6Zm9jdXMge1xcbiAgYmFja2dyb3VuZDogcmdiYSgyMzgsIDEzNiwgMCwgMC40NCk7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5idXR0b24uY2VzaXVtLWluZm9Cb3gtY2xvc2U6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogIzg4ODtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5idXR0b24uY2VzaXVtLWluZm9Cb3gtY2xvc2U6YWN0aXZlIHtcXG4gIGJhY2tncm91bmQ6ICNhMDA7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuLmNlc2l1bS1pbmZvQm94LWJvZHlsZXNzIC5jZXNpdW0taW5mb0JveC1pZnJhbWUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLmNlc2l1bS1pbmZvQm94LWlmcmFtZSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAycHgpO1xcbn1cXG5cXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9TY2VuZU1vZGVQaWNrZXIvU2NlbmVNb2RlUGlja2VyLmNzcyAqL1xcbnNwYW4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbjogMCAzcHg7XFxufVxcbi5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLXZpc2libGUge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIG9wYWNpdHk6IDE7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMjVzIGxpbmVhcjtcXG59XFxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItaGlkZGVuIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiB2aXNpYmlsaXR5IDBzIDAuMjVzLCBvcGFjaXR5IDAuMjVzIGxpbmVhcjtcXG59XFxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItd3JhcHBlciAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1ub25lIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLXNsaWRlLXN2ZyB7XFxuICB0cmFuc2l0aW9uOiBsZWZ0IDJzO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItd3JhcHBlciAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1kcm9wRG93bi1pY29uIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAzcHggMDtcXG59XFxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItd3JhcHBlciAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1idXR0b24zRCxcXG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbkNvbHVtYnVzVmlldyxcXG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbjJEIHtcXG4gIG1hcmdpbjogMCAwIDNweCAwO1xcbn1cXG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbjNEIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWljb24yRCB7XFxuICBsZWZ0OiAxMDAlO1xcbn1cXG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbjNEIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWljb25Db2x1bWJ1c1ZpZXcge1xcbiAgbGVmdDogMjAwJTtcXG59XFxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItd3JhcHBlciAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1idXR0b25Db2x1bWJ1c1ZpZXcgLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItaWNvbjNEIHtcXG4gIGxlZnQ6IC0yMDAlO1xcbn1cXG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbkNvbHVtYnVzVmlldyAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1pY29uMkQge1xcbiAgbGVmdDogLTEwMCU7XFxufVxcbi5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItYnV0dG9uMkQgLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItaWNvbjNEIHtcXG4gIGxlZnQ6IC0xMDAlO1xcbn1cXG4uY2VzaXVtLXNjZW5lTW9kZVBpY2tlci13cmFwcGVyIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWJ1dHRvbjJEIC5jZXNpdW0tc2NlbmVNb2RlUGlja2VyLWljb25Db2x1bWJ1c1ZpZXcge1xcbiAgbGVmdDogMTAwJTtcXG59XFxuLmNlc2l1bS1zY2VuZU1vZGVQaWNrZXItd3JhcHBlciAuY2VzaXVtLXNjZW5lTW9kZVBpY2tlci1zZWxlY3RlZCB7XFxuICBib3JkZXItY29sb3I6ICMyZTI7XFxuICBib3gtc2hhZG93OiAwIDAgOHB4ICNmZmYsIDAgMCA4cHggI2ZmZjtcXG59XFxuXFxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvUHJvamVjdGlvblBpY2tlci9Qcm9qZWN0aW9uUGlja2VyLmNzcyAqL1xcbnNwYW4uY2VzaXVtLXByb2plY3Rpb25QaWNrZXItd3JhcHBlciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW46IDAgM3B4O1xcbn1cXG4uY2VzaXVtLXByb2plY3Rpb25QaWNrZXItdmlzaWJsZSB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgb3BhY2l0eTogMTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4yNXMgbGluZWFyO1xcbn1cXG4uY2VzaXVtLXByb2plY3Rpb25QaWNrZXItaGlkZGVuIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiB2aXNpYmlsaXR5IDBzIDAuMjVzLCBvcGFjaXR5IDAuMjVzIGxpbmVhcjtcXG59XFxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLW5vbmUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLWRyb3BEb3duLWljb24ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDNweCAwO1xcbn1cXG4uY2VzaXVtLXByb2plY3Rpb25QaWNrZXItd3JhcHBlciAuY2VzaXVtLXByb2plY3Rpb25QaWNrZXItYnV0dG9uUGVyc3BlY3RpdmUsXFxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLWJ1dHRvbk9ydGhvZ3JhcGhpYyB7XFxuICBtYXJnaW46IDAgMCAzcHggMDtcXG59XFxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLWJ1dHRvblBlcnNwZWN0aXZlIC5jZXNpdW0tcHJvamVjdGlvblBpY2tlci1pY29uT3J0aG9ncmFwaGljIHtcXG4gIGxlZnQ6IDEwMCU7XFxufVxcbi5jZXNpdW0tcHJvamVjdGlvblBpY2tlci13cmFwcGVyIC5jZXNpdW0tcHJvamVjdGlvblBpY2tlci1idXR0b25PcnRob2dyYXBoaWMgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLWljb25QZXJzcGVjdGl2ZSB7XFxuICBsZWZ0OiAtMTAwJTtcXG59XFxuLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXdyYXBwZXIgLmNlc2l1bS1wcm9qZWN0aW9uUGlja2VyLXNlbGVjdGVkIHtcXG4gIGJvcmRlci1jb2xvcjogIzJlMjtcXG4gIGJveC1zaGFkb3c6IDAgMCA4cHggI2ZmZiwgMCAwIDhweCAjZmZmO1xcbn1cXG5cXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9QZXJmb3JtYW5jZVdhdGNoZG9nL1BlcmZvcm1hbmNlV2F0Y2hkb2cuY3NzICovXFxuLmNlc2l1bS1wZXJmb3JtYW5jZS13YXRjaGRvZy1tZXNzYWdlLWFyZWEge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuLmNlc2l1bS1wZXJmb3JtYW5jZS13YXRjaGRvZy1tZXNzYWdlIHtcXG4gIG1hcmdpbi1yaWdodDogMzBweDtcXG59XFxuLmNlc2l1bS1wZXJmb3JtYW5jZS13YXRjaGRvZy1tZXNzYWdlLWRpc21pc3Mge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDA7XFxuICBtYXJnaW46IDAgMTBweCAwIDA7XFxufVxcblxcbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL05hdmlnYXRpb25IZWxwQnV0dG9uL05hdmlnYXRpb25IZWxwQnV0dG9uLmNzcyAqL1xcbi5jZXNpdW0tbmF2aWdhdGlvbkhlbHBCdXR0b24td3JhcHBlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5jZXNpdW0tbmF2aWdhdGlvbi1oZWxwIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMzhweDtcXG4gIHJpZ2h0OiAycHg7XFxuICB3aWR0aDogMjUwcHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjAxKTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IDIzNHB4IC0xMHB4O1xcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAwcyAwLjI1cywgdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxufVxcbi5jZXNpdW0tbmF2aWdhdGlvbi1oZWxwLXZpc2libGUge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1vdXQ7XFxufVxcbi5jZXNpdW0tbmF2aWdhdGlvbi1oZWxwLWluc3RydWN0aW9ucyB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjNDQ0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzOCwgMzgsIDM4LCAwLjc1KTtcXG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XFxuICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xcbn1cXG4uY2VzaXVtLWNsaWNrLW5hdmlnYXRpb24taGVscCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4uY2VzaXVtLXRvdWNoLW5hdmlnYXRpb24taGVscCB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcGFkZGluZy10b3A6IDVweDtcXG59XFxuLmNlc2l1bS1jbGljay1uYXZpZ2F0aW9uLWhlbHAtdmlzaWJsZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLmNlc2l1bS10b3VjaC1uYXZpZ2F0aW9uLWhlbHAtdmlzaWJsZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLmNlc2l1bS1uYXZpZ2F0aW9uLWhlbHAtcGFuIHtcXG4gIGNvbG9yOiAjNjZjY2ZmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5jZXNpdW0tbmF2aWdhdGlvbi1oZWxwLXpvb20ge1xcbiAgY29sb3I6ICM2NWZkMDA7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLmNlc2l1bS1uYXZpZ2F0aW9uLWhlbHAtcm90YXRlIHtcXG4gIGNvbG9yOiAjZmZkODAwO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5jZXNpdW0tbmF2aWdhdGlvbi1oZWxwLXRpbHQge1xcbiAgY29sb3I6ICNkODAwZDg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLmNlc2l1bS1uYXZpZ2F0aW9uLWhlbHAtZGV0YWlscyB7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG59XFxuLmNlc2l1bS1uYXZpZ2F0aW9uLWJ1dHRvbiB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDQ0O1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzQ0NDtcXG4gIG1hcmdpbjogMDtcXG4gIHdpZHRoOiA1MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5jZXNpdW0tbmF2aWdhdGlvbi1idXR0b24taWNvbiB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgcGFkZGluZzogNXB4IDFweDtcXG59XFxuLmNlc2l1bS1uYXZpZ2F0aW9uLWJ1dHRvbjpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG4uY2VzaXVtLW5hdmlnYXRpb24tYnV0dG9uLWxlZnQge1xcbiAgYm9yZGVyLXJhZGl1czogMTBweCAwIDAgMDtcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzQ0NDtcXG59XFxuLmNlc2l1bS1uYXZpZ2F0aW9uLWJ1dHRvbi1yaWdodCB7XFxuICBib3JkZXItcmFkaXVzOiAwIDEwcHggMCAwO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5jZXNpdW0tbmF2aWdhdGlvbi1idXR0b24tc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzOCwgMzgsIDM4LCAwLjc1KTtcXG59XFxuLmNlc2l1bS1uYXZpZ2F0aW9uLWJ1dHRvbi11bnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSk7XFxufVxcbi5jZXNpdW0tbmF2aWdhdGlvbi1idXR0b24tdW5zZWxlY3RlZDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc2LCA3NiwgNzYsIDAuNzUpO1xcbn1cXG5cXG4vKiBwYWNrYWdlcy93aWRnZXRzL1NvdXJjZS9TZWxlY3Rpb25JbmRpY2F0b3IvU2VsZWN0aW9uSW5kaWNhdG9yLmNzcyAqL1xcbi5jZXNpdW0tc2VsZWN0aW9uLXdyYXBwZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDE2MHB4O1xcbiAgaGVpZ2h0OiAxNjBweDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMHMgMC4ycywgb3BhY2l0eSAwLjJzIGVhc2UtaW47XFxufVxcbi5jZXNpdW0tc2VsZWN0aW9uLXdyYXBwZXItdmlzaWJsZSB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgb3BhY2l0eTogMTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlLW91dDtcXG59XFxuLmNlc2l1bS1zZWxlY3Rpb24td3JhcHBlciBzdmcge1xcbiAgZmlsbDogIzJlMjtcXG4gIHN0cm9rZTogIzAwMDtcXG4gIHN0cm9rZS13aWR0aDogMS4xcHg7XFxufVxcblxcbi8qIHBhY2thZ2VzL3dpZGdldHMvU291cmNlL1RpbWVsaW5lL1RpbWVsaW5lLmNzcyAqL1xcbi5jZXNpdW0tdGltZWxpbmUtbWFpbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJvcmRlcjogc29saWQgMXB4ICM4ODg7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4uY2VzaXVtLXRpbWVsaW5lLXRyYWNrQ29udGFpbmVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBib3JkZXItdG9wOiBzb2xpZCAxcHggIzg4ODtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxufVxcbi5jZXNpdW0tdGltZWxpbmUtdHJhY2tzIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmNlc2l1bS10aW1lbGluZS1uZWVkbGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMS43ZW07XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMXB4O1xcbiAgYmFja2dyb3VuZDogI2YwMDtcXG59XFxuLmNlc2l1bS10aW1lbGluZS1iYXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMS43ZW07XFxuICBiYWNrZ3JvdW5kOlxcbiAgICBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgdG8gYm90dG9tLFxcbiAgICAgIHJnYmEoMTE2LCAxMTcsIDExOSwgMC44KSAwJSxcXG4gICAgICByZ2JhKDU4LCA2OCwgODIsIDAuOCkgMTElLFxcbiAgICAgIHJnYmEoNDYsIDUwLCA1NiwgMC44KSA0NiUsXFxuICAgICAgcmdiYSg1MywgNTMsIDUzLCAwLjgpIDgxJSxcXG4gICAgICByZ2JhKDUzLCA1MywgNTMsIDAuOCkgMTAwJSk7XFxufVxcbi5jZXNpdW0tdGltZWxpbmUtcnVsZXIge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbiAgei1pbmRleDogLTIwMDtcXG59XFxuLmNlc2l1bS10aW1lbGluZS1oaWdobGlnaHQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQ6ICMwOGY7XFxufVxcbi5jZXNpdW0tdGltZWxpbmUtdGljTGFiZWwge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBmb250LXNpemU6IDgwJTtcXG4gIGNvbG9yOiAjZWVlO1xcbn1cXG4uY2VzaXVtLXRpbWVsaW5lLXRpY01haW4ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxcHg7XFxuICBoZWlnaHQ6IDUwJTtcXG4gIGJhY2tncm91bmQ6ICNlZWU7XFxufVxcbi5jZXNpdW0tdGltZWxpbmUtdGljU3ViIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMXB4O1xcbiAgaGVpZ2h0OiAzMyU7XFxuICBiYWNrZ3JvdW5kOiAjYWFhO1xcbn1cXG4uY2VzaXVtLXRpbWVsaW5lLXRpY1Rpbnkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxcHg7XFxuICBoZWlnaHQ6IDI1JTtcXG4gIGJhY2tncm91bmQ6ICM4ODg7XFxufVxcbi5jZXNpdW0tdGltZWxpbmUtaWNvbjE2IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDE2cHg7XFxuICBoZWlnaHQ6IDE2cHg7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTp0ZXh0L3BsYWluO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBUUNBWUFBQUIzQUgxWkFBQUFBWE5TUjBJQXJzNGM2UUFBQUFaaVMwZEVBUDhBL3dEL29MMm5rd0FBQUFsd1NGbHpBQUFMRXdBQUN4TUJBSnFjR0FBQUFBZDBTVTFGQjlzSURCSVRLSVZ6TEVNQUFBS05TVVJCVkVqSHhkWE5TeFJoSEFmdzd6enJxaHVvV0puU2tyaXBwVVZTRUtzSEk5QlRVWWRBSkEvUm9ZTVJFVjI2ckFkbjZ0QWZVQVJpMTZoUXFrT0JRUmdVRVlGV0VDM093Y3pNamRaZDkyVm1kV2ZtZWVsZ1RqTzdxN2diMFZ6bW1abm44NXZ2UFBQTU04Qi8zcVRjRTJQUHB1VFpLQjFlV3VVUUFDZ1hZQUNZd1ZGYkNUVFZlWlhCL2k1NW80TEZlbGNBWmZTdFlENHZwQW9QR0FHbzRHQmNRRWdTT0FVTVF5QWV6d0s2aVFmRFBYbmhTL0ZrSForLzhWTE1XeHhxV2tmSDNnYk1STk9ZaTJyb2F2YmphMHpIUW1vRlBZZjhFRDRLbzRhaXZtOU1PRy91OUk4bXdyYWZlSzdhL3RWck5jL2JBUllONW5vYWRlcTdxMDM0MnZYdzlDSU1VNkJtVzhyVlA5Y1BCUGU1MnV1K3YzTy95OXNCNGdrVFdzNlFzazBtajVFeFhNZWxlanZBOFdhZllta21HUEhhblRpamR0dmlmOHJ4NVJpQ2pkV0tzMkNwM2pXUkRsOTZLaHJicWxCZUpxQk9MeUxRWGcwSWdia1pEUzBkTzhFWnhaZlBTVEE5anZEREszbVQwT21QMUZYaDNYd0VFQUtkVFg1TVJXTGdqQ0s0cHdIM3h0L1luamdMSEF2NGxIVENBS01NdS93VitLWkdvYjZQb0t5TVEwK3NnQnBaVkpabjBOdGVyeFFhVnFlZi9EUm4rL0VYWWRzL21aeDJlVmVBVzlkNjVkaENFc2FLQ2I3SzhISDBncVRldnloOUdEa24wVlVMUmlhTHpKS0dCdTlzd2ZkYWlpZTVSVm85RVNVUk44RThCRTBuN2dnQUNKeThLemdoU0N6cDZEbXdXeGthQ20yNEVCWHI4d0k4SHJrcTA2UUJpUkMwdDI0SEFMUzExSUJUQ3lKbDR2YjFBWG16cGJWWVR3b1ZPWE4waDdMOE13dG04YlhQeWJJUS81RkNYM2RBMmNyNlhvd3ZHQ0EwMkN2enRBbno5K0ppWmsxQU14RzZmRXJlU29CaVBObW95Tm51V2lXVnpBSUF0SVNPMDhFNnBaaS8zTjk2QUlEbjRFM2gzUDhML3dzaFArdHh0RXM0SkFBQUFBQkpSVTVFcmtKZ2dnPT0pO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG59XFxuXFxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvVmlld2VyL1ZpZXdlci5jc3MgKi9cXG4uY2VzaXVtLXZpZXdlciB7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuLmNlc2l1bS12aWV3ZXItY2VzaXVtV2lkZ2V0Q29udGFpbmVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4uY2VzaXVtLXZpZXdlci1ib3R0b20ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgcGFkZGluZy1yaWdodDogNXB4O1xcbn1cXG4uY2VzaXVtLXZpZXdlciAuY2VzaXVtLXdpZGdldC1jcmVkaXRzIHtcXG4gIGRpc3BsYXk6IGlubGluZTtcXG4gIHBvc2l0aW9uOiBzdGF0aWM7XFxuICBib3R0b206IGF1dG87XFxuICBsZWZ0OiBhdXRvO1xcbiAgcGFkZGluZy1yaWdodDogMDtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAycHggIzAwMDAwMDtcXG59XFxuLmNlc2l1bS12aWV3ZXItdGltZWxpbmVDb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMTY5cHg7XFxuICByaWdodDogMjlweDtcXG4gIGhlaWdodDogMjdweDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG4uY2VzaXVtLXZpZXdlci1hbmltYXRpb25Db250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICB3aWR0aDogMTY5cHg7XFxuICBoZWlnaHQ6IDExMnB4O1xcbn1cXG4uY2VzaXVtLXZpZXdlci1mdWxsc2NyZWVuQ29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHdpZHRoOiAyOXB4O1xcbiAgaGVpZ2h0OiAyOXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLmNlc2l1bS12aWV3ZXItdnJDb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgd2lkdGg6IDI5cHg7XFxuICBoZWlnaHQ6IDI5cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4uY2VzaXVtLXZpZXdlci10b29sYmFyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1cHg7XFxuICByaWdodDogNXB4O1xcbn1cXG4uY2VzaXVtLXZpZXdlci1jZXNpdW1JbnNwZWN0b3JDb250YWluZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwcHg7XFxuICByaWdodDogMTBweDtcXG59XFxuLmNlc2l1bS12aWV3ZXItZ2VvY29kZXJDb250YWluZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luOiAwIDNweDtcXG59XFxuLmNlc2l1bS12aWV3ZXItY2VzaXVtM0RUaWxlc0luc3BlY3RvckNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTBweDtcXG4gIHJpZ2h0OiAxMHB4O1xcbiAgbWF4LWhlaWdodDogY2FsYygxMDAlIC0gMTIwcHgpO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxufVxcbi5jZXNpdW0tdmlld2VyLXZveGVsSW5zcGVjdG9yQ29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MHB4O1xcbiAgcmlnaHQ6IDEwcHg7XFxuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMCUgLSAxMjBweCk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuXFxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2UvSTNTQnVpbGRpbmdTY2VuZUxheWVyRXhwbG9yZXIvSTNTQnVpbGRpbmdTY2VuZUxheWVyRXhwbG9yZXIuY3NzICovXFxuLmNlc2l1bS12aWV3ZXItaTNzLWV4cGxvcmVyIHVsIHtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG59XFxuLmNlc2l1bS12aWV3ZXItaTNzLWV4cGxvcmVyIC5sYXllcnNMaXN0IHtcXG4gIHBhZGRpbmc6IDA7XFxufVxcbi5jZXNpdW0tdmlld2VyLWkzcy1leHBsb3JlciBpbnB1dCB7XFxuICBtYXJnaW46IDAgM3B4IDAgMDtcXG59XFxuLmNlc2l1bS12aWV3ZXItaTNzLWV4cGxvcmVyIC5leHBhbmRJdGVtIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgd2lkdGg6IDIwcHg7XFxufVxcbi5jZXNpdW0tdmlld2VyLWkzcy1leHBsb3JlciAubmVzdGVkLFxcbi5jZXNpdW0tdmlld2VyLWkzcy1leHBsb3JlciAjYnNsLXdyYXBwZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLmNlc2l1bS12aWV3ZXItaTNzLWV4cGxvcmVyIC5hY3RpdmUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5jZXNpdW0tdmlld2VyLWkzcy1leHBsb3JlciAubGktd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLyogcGFja2FnZXMvd2lkZ2V0cy9Tb3VyY2Uvd2lkZ2V0cy5jc3MgKi9cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9