"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[31537],{

/***/ 31537:
/*!*************************************************************!*\
  !*** ./arches_slocal/media/js/cesium_viewer/utils/utils.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function extractAnnotationData(annotationEntity) {
  var _annotationEntity$_de, _annotationEntity$_po, _annotationEntity$_po2;
  var id = (annotationEntity === null || annotationEntity === void 0 ? void 0 : annotationEntity._id) || '';
  var name = (annotationEntity === null || annotationEntity === void 0 ? void 0 : annotationEntity._name) || '';
  var description = (annotationEntity === null || annotationEntity === void 0 || (_annotationEntity$_de = annotationEntity._description) === null || _annotationEntity$_de === void 0 ? void 0 : _annotationEntity$_de._value) || '';
  var colorObj = annotationEntity === null || annotationEntity === void 0 || (_annotationEntity$_po = annotationEntity._polygon) === null || _annotationEntity$_po === void 0 || (_annotationEntity$_po = _annotationEntity$_po.material) === null || _annotationEntity$_po === void 0 || (_annotationEntity$_po = _annotationEntity$_po.color) === null || _annotationEntity$_po === void 0 ? void 0 : _annotationEntity$_po._value;
  var positionObj = annotationEntity === null || annotationEntity === void 0 || (_annotationEntity$_po2 = annotationEntity._polygon) === null || _annotationEntity$_po2 === void 0 || (_annotationEntity$_po2 = _annotationEntity$_po2._hierarchy) === null || _annotationEntity$_po2 === void 0 ? void 0 : _annotationEntity$_po2._value;
  return {
    id: id,
    name: name,
    description: description,
    color: colorObj ? _cesiumColorToHex(colorObj) : '',
    position: positionObj.positions.map(function (pos) {
      return [pos.x, pos.y, pos.z];
    })
  };
}
function _cesiumColorToHex(color) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  var r = Math.floor(color.red * 255);
  var g = Math.floor(color.green * 255);
  var b = Math.floor(color.blue * 255);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function generateUniqueId(prefix) {
  return "".concat(prefix, "-").concat(Date.now(), "-").concat(Math.random().toString(36).slice(2));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  extractAnnotationData: extractAnnotationData,
  generateUniqueId: generateUniqueId
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQUFGLE1BQUEsQ0FBSVQsSUFBSSxDQUFDWSxNQUFNLENBQUMsQ0FBQyxDQUFDZixRQUFRLENBQUMsRUFBRSxDQUFDLENBQUNnQixLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3pFO0FBRUEsaUVBQWU7RUFDWDdDLHFCQUFxQixFQUFyQkEscUJBQXFCO0VBQ3JCdUMsZ0JBQWdCLEVBQWhCQTtBQUNKLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9hcmNoZXNfc2xvY2FsL21lZGlhL2pzL2Nlc2l1bV92aWV3ZXIvdXRpbHMvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZXh0cmFjdEFubm90YXRpb25EYXRhKGFubm90YXRpb25FbnRpdHkpIHtcclxuICAgIGNvbnN0IGlkID0gYW5ub3RhdGlvbkVudGl0eT8uX2lkIHx8ICcnO1xyXG4gICAgY29uc3QgbmFtZSA9IGFubm90YXRpb25FbnRpdHk/Ll9uYW1lIHx8ICcnO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBhbm5vdGF0aW9uRW50aXR5Py5fZGVzY3JpcHRpb24/Ll92YWx1ZSB8fCAnJztcclxuICAgIGNvbnN0IGNvbG9yT2JqID0gYW5ub3RhdGlvbkVudGl0eT8uX3BvbHlnb24/Lm1hdGVyaWFsPy5jb2xvcj8uX3ZhbHVlO1xyXG4gICAgY29uc3QgcG9zaXRpb25PYmogPSBhbm5vdGF0aW9uRW50aXR5Py5fcG9seWdvbj8uX2hpZXJhcmNoeT8uX3ZhbHVlO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICBjb2xvcjogY29sb3JPYmogPyBfY2VzaXVtQ29sb3JUb0hleChjb2xvck9iaikgOiAnJyxcclxuICAgICAgICBwb3NpdGlvbjogcG9zaXRpb25PYmoucG9zaXRpb25zLm1hcChwb3MgPT4gW3Bvcy54LCBwb3MueSwgcG9zLnpdKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfY2VzaXVtQ29sb3JUb0hleChjb2xvcikge1xyXG4gICAgZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xyXG4gICAgICAgIHZhciBoZXggPSBjLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XHJcbiAgICB9XHJcbiAgICBjb25zdCByID0gTWF0aC5mbG9vcihjb2xvci5yZWQgKiAyNTUpO1xyXG4gICAgY29uc3QgZyA9IE1hdGguZmxvb3IoY29sb3IuZ3JlZW4gKiAyNTUpO1xyXG4gICAgY29uc3QgYiA9IE1hdGguZmxvb3IoY29sb3IuYmx1ZSAqIDI1NSk7XHJcblxyXG4gICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVVuaXF1ZUlkKHByZWZpeCkge1xyXG4gICAgcmV0dXJuIGAke3ByZWZpeH0tJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIpfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGV4dHJhY3RBbm5vdGF0aW9uRGF0YSxcclxuICAgIGdlbmVyYXRlVW5pcXVlSWRcclxufVxyXG4iXSwibmFtZXMiOlsiZXh0cmFjdEFubm90YXRpb25EYXRhIiwiYW5ub3RhdGlvbkVudGl0eSIsIl9hbm5vdGF0aW9uRW50aXR5JF9kZSIsIl9hbm5vdGF0aW9uRW50aXR5JF9wbyIsIl9hbm5vdGF0aW9uRW50aXR5JF9wbzIiLCJpZCIsIl9pZCIsIm5hbWUiLCJfbmFtZSIsImRlc2NyaXB0aW9uIiwiX2Rlc2NyaXB0aW9uIiwiX3ZhbHVlIiwiY29sb3JPYmoiLCJfcG9seWdvbiIsIm1hdGVyaWFsIiwiY29sb3IiLCJwb3NpdGlvbk9iaiIsIl9oaWVyYXJjaHkiLCJfY2VzaXVtQ29sb3JUb0hleCIsInBvc2l0aW9uIiwicG9zaXRpb25zIiwibWFwIiwicG9zIiwieCIsInkiLCJ6IiwiY29tcG9uZW50VG9IZXgiLCJjIiwiaGV4IiwidG9TdHJpbmciLCJsZW5ndGgiLCJyIiwiTWF0aCIsImZsb29yIiwicmVkIiwiZyIsImdyZWVuIiwiYiIsImJsdWUiLCJnZW5lcmF0ZVVuaXF1ZUlkIiwicHJlZml4IiwiY29uY2F0IiwiRGF0ZSIsIm5vdyIsInJhbmRvbSIsInNsaWNlIl0sInNvdXJjZVJvb3QiOiIifQ==