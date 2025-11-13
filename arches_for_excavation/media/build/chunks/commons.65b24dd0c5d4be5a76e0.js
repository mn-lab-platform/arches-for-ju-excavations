"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[31159],{

/***/ 31159:
/*!*************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/file-widget.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 51786);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ 55869);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ 33270);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var arches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! arches */ 77126);
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dropzone */ 50221);
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dropzone__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ 84806);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var viewmodels_widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! viewmodels/widget */ 77260);
/* harmony import */ var bindings_dropzone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bindings/dropzone */ 99152);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









/**
 * A viewmodel used for file widgets
 *
 * @constructor
 * @name FileWidgetViewModel
 *
 * @param  {string} params - a configuration object
 */
var FileWidgetViewModel = function FileWidgetViewModel(params) {
  var _this = this;
  var self = this;
  params.configKeys = ['acceptedFiles', 'maxFilesize', 'maxFiles'];
  viewmodels_widget__WEBPACK_IMPORTED_MODULE_6__["default"].apply(this, [params]);
  this.uploadMulti = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(true);
  this.filesForUpload = knockout__WEBPACK_IMPORTED_MODULE_0___default().observableArray();
  this.uploadedFiles = knockout__WEBPACK_IMPORTED_MODULE_0___default().observableArray();
  this.unsupportedImageTypes = ['tif', 'tiff', 'vnd.adobe.photoshop'];
  if (this.form) {
    this.form.on('after-update', function (req, tile) {
      var hasdata = underscore__WEBPACK_IMPORTED_MODULE_1___default().filter(tile.data, function (val, key) {
        val = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(val);
        if (val) {
          return val;
        }
      });
      if (tile.isParent === true || hasdata.length === 0) {
        if (self.dropzone) {
          self.dropzone.removeAllFiles(true);
        }
      } else if ((self.tile === tile || underscore__WEBPACK_IMPORTED_MODULE_1___default().contains(tile.tiles, self.tile)) && req.status === 200) {
        if (self.filesForUpload().length > 0) {
          self.filesForUpload.removeAll();
        }
        var data = req.responseJSON.data[self.node.nodeid];
        if (Array.isArray(data)) {
          self.uploadedFiles(data);
        }
        if (self.dropzone) {
          self.dropzone.removeAllFiles(true);
        }
        self.formData.delete('file-list_' + self.node.nodeid);
      }
    });
    this.form.on('tile-reset', function (tile) {
      if (self.tile === tile || underscore__WEBPACK_IMPORTED_MODULE_1___default().contains(tile.tiles, self.tile)) {
        if (self.filesForUpload().length > 0) {
          self.filesForUpload.removeAll();
        }
        if (Array.isArray(self.value())) {
          var uploaded = underscore__WEBPACK_IMPORTED_MODULE_1___default().filter(self.value(), function (val) {
            return knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(val.status) === 'uploaded';
          });
          self.uploadedFiles(uploaded);
        }
        if (self.dropzone) {
          self.dropzone.removeAllFiles(true);
          self.formData.delete('file-list_' + self.node.nodeid);
        }
      }
      self.beforeChangeMetadataSnapshot({});
    });
  }
  this.acceptedFiles.subscribe(function (val) {
    if (self.dropzone) {
      self.dropzone.hiddenFileInput.setAttribute("accept", val);
    }
  });
  this.maxFilesize.subscribe(function (val) {
    if (self.dropzone) {
      self.dropzone.options.maxFilesize = val;
    }
  });
  this.formatSize = function (file) {
    var bytes = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(file.size);
    if (bytes == 0) return '0 Byte';
    var k = 1024;
    var dm = 2;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return '<span>' + parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '</span> ' + sizes[i];
  };
  this.createStrObject = function (str) {
    return _defineProperty({}, arches__WEBPACK_IMPORTED_MODULE_3__["default"].activeLanguage, {
      "direction": arches__WEBPACK_IMPORTED_MODULE_3__["default"].languages.find(function (lang) {
        return lang.code == arches__WEBPACK_IMPORTED_MODULE_3__["default"].activeLanguage;
      }).default_direction,
      "value": str
    });
  };
  this.activeLanguage = arches__WEBPACK_IMPORTED_MODULE_3__["default"].activeLanguage;
  this.beforeChangeMetadataSnapshot = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable({});
  this.standaloneObservable = knockout__WEBPACK_IMPORTED_MODULE_0___default().observableArray();
  this.filesJSON = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    var filesForUpload = self.filesForUpload();
    var uploadedFiles = self.uploadedFiles().map(function (file) {
      if (knockout__WEBPACK_IMPORTED_MODULE_0___default().isObservable(file.title[self.activeLanguage].value)) {
        return file;
      }
      // Rewrap in observable if needed.
      return _objectSpread(_objectSpread({}, file), {}, {
        altText: _objectSpread(_objectSpread({}, file.altText), {}, _defineProperty({}, self.activeLanguage, {
          "direction": knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(file.altText[self.activeLanguage].direction),
          "value": knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(file.altText[self.activeLanguage].value)
        })),
        title: _objectSpread(_objectSpread({}, file.title), {}, _defineProperty({}, self.activeLanguage, {
          "direction": knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(file.title[self.activeLanguage].direction),
          "value": knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(file.title[self.activeLanguage].value)
        })),
        attribution: _objectSpread(_objectSpread({}, file.attribution), {}, _defineProperty({}, self.activeLanguage, {
          "direction": knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(file.attribution[self.activeLanguage].direction),
          "value": knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(file.attribution[self.activeLanguage].value)
        })),
        description: _objectSpread(_objectSpread({}, file.description), {}, _defineProperty({}, self.activeLanguage, {
          "direction": knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(file.description[self.activeLanguage].direction),
          "value": knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(file.description[self.activeLanguage].value)
        }))
      });
    });
    var standaloneObservable = self.standaloneObservable(); // for triggering update
    var beforeChangeMetadataSnapshot = self.beforeChangeMetadataSnapshot();
    return uploadedFiles.concat(underscore__WEBPACK_IMPORTED_MODULE_1___default().map(filesForUpload, function (file, i) {
      var _beforeChangeMetadata, _beforeChangeMetadata2, _beforeChangeMetadata3, _beforeChangeMetadata4, _beforeChangeMetadata5, _beforeChangeMetadata6, _beforeChangeMetadata7, _beforeChangeMetadata8;
      return {
        name: file.name,
        altText: (_beforeChangeMetadata = (_beforeChangeMetadata2 = beforeChangeMetadataSnapshot[i]) === null || _beforeChangeMetadata2 === void 0 ? void 0 : _beforeChangeMetadata2.altText) !== null && _beforeChangeMetadata !== void 0 ? _beforeChangeMetadata : self.createStrObject(''),
        title: (_beforeChangeMetadata3 = (_beforeChangeMetadata4 = beforeChangeMetadataSnapshot[i]) === null || _beforeChangeMetadata4 === void 0 ? void 0 : _beforeChangeMetadata4.title) !== null && _beforeChangeMetadata3 !== void 0 ? _beforeChangeMetadata3 : self.createStrObject(''),
        attribution: (_beforeChangeMetadata5 = (_beforeChangeMetadata6 = beforeChangeMetadataSnapshot[i]) === null || _beforeChangeMetadata6 === void 0 ? void 0 : _beforeChangeMetadata6.attribution) !== null && _beforeChangeMetadata5 !== void 0 ? _beforeChangeMetadata5 : self.createStrObject(''),
        description: (_beforeChangeMetadata7 = (_beforeChangeMetadata8 = beforeChangeMetadataSnapshot[i]) === null || _beforeChangeMetadata8 === void 0 ? void 0 : _beforeChangeMetadata8.description) !== null && _beforeChangeMetadata7 !== void 0 ? _beforeChangeMetadata7 : self.createStrObject(''),
        accepted: file.accepted,
        height: file.height,
        lastModified: file.lastModified,
        size: file.size,
        status: file.status,
        type: file.type,
        width: file.width,
        url: null,
        file_id: null,
        index: i,
        content: URL.createObjectURL(file),
        error: file.error
      };
    }));
  }).extend({
    throttle: 100
  });
  this.filesJSON.subscribe(function (value) {
    if (self.formData) {
      if (underscore__WEBPACK_IMPORTED_MODULE_1___default().contains(self.formData.keys(), 'file-list_' + self.node.nodeid)) {
        self.formData.delete('file-list_' + self.node.nodeid);
      }
    }
    if (value.length > 1 && self.selectedFile() == undefined) {
      self.selectedFile(value[0]);
    }
    underscore__WEBPACK_IMPORTED_MODULE_1___default().each(self.filesForUpload(), function (file) {
      if (file.accepted) {
        self.formData.append('file-list_' + self.node.nodeid, file, file.name);
      }
    });
    if (knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(self.value) !== null || self.filesForUpload().length !== 0 || self.uploadedFiles().length !== 0) {
      self.value(value.filter(function (file) {
        return file.accepted;
      }));
    }
  });
  this.equalMetadata = function (a, b) {
    if (!a || !b) {
      return false;
    }
    return a.altText[_this.activeLanguage].value === b.altText[_this.activeLanguage].value && a.title[_this.activeLanguage].value === b.title[_this.activeLanguage].value && a.attribution[_this.activeLanguage].value === b.title[_this.activeLanguage].value && a.description[_this.activeLanguage].value === b.title[_this.activeLanguage].value;
  };
  this.metadataIsEmpty = function (metadata) {
    return !metadata.altText[_this.activeLanguage].value && !metadata.title[_this.activeLanguage].value && !metadata.attribution[_this.activeLanguage].value && !metadata.description[_this.activeLanguage].value;
  };
  this.filesJSON.subscribe(function (value) {
    // Preserve current metadata for yet-to-be-uploaded files
    value.filter(function (file) {
      return file.file_id === null
      // Don't take a snapshot of the unsaved metadata if we're deleting it.
      && self.filesForUpload().find(function (f) {
        return f.name === file.name;
      });
    }).forEach(function (file, i) {
      var altText = file.altText,
        title = file.title,
        attribution = file.attribution,
        description = file.description;
      var metadata = {
        altText: altText,
        title: title,
        attribution: attribution,
        description: description
      };
      if (self.metadataIsEmpty(metadata)) {
        return;
      }
      if (!self.equalMetadata(self.beforeChangeMetadataSnapshot()[i], metadata)) {
        self.beforeChangeMetadataSnapshot()[i] = metadata;
        self.standaloneObservable.push(Math.random());
      }
    });
  }, this, 'beforeChange');
  this.getFileUrl = function (urltoclean) {
    var url = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(urltoclean);
    var httpRegex = /^https?:\/\//;
    // test whether the url is fully qualified or already starts with url_subpath
    return !url || httpRegex.test(url) || url.startsWith(arches__WEBPACK_IMPORTED_MODULE_3__["default"].urls.url_subpath) ? url : (arches__WEBPACK_IMPORTED_MODULE_3__["default"].urls.url_subpath + url).replace('//', '/');
  };
  if (Array.isArray(self.value())) {
    // Hydrate the metadata fields in place with the active language keys if missing
    var vals = self.value();
    vals.forEach(function (val) {
      ['altText', 'title', 'attribution', 'description'].forEach(function (metadataAttr) {
        if (!val[metadataAttr]) {
          // Metadata fields missing entirely
          val[metadataAttr] = self.createStrObject(''); // ensures active language
        } else if (!val[metadataAttr][arches__WEBPACK_IMPORTED_MODULE_3__["default"].activeLanguage]) {
          // Active language missing
          val[metadataAttr][arches__WEBPACK_IMPORTED_MODULE_3__["default"].activeLanguage] = self.createStrObject('')[arches__WEBPACK_IMPORTED_MODULE_3__["default"].activeLanguage];
        }
      });
    });
    this.uploadedFiles(vals);
  }
  this.filter = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable("");
  this.filteredList = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    var arr = [],
      lowerName = "",
      filter = self.filter().toLowerCase();
    if (filter) {
      self.filesJSON().forEach(function (f, i) {
        lowerName = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(f.name).toLowerCase();
        if (lowerName.includes(filter)) {
          arr.push(self.filesJSON()[i]);
        }
      });
    }
    return arr;
  });
  this.selectedFile = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(self.filesJSON()[0]);
  this.selectFile = function (sFile) {
    self.selectedFile(sFile);
  };
  this.removeFile = function (file) {
    var filePosition;
    self.filesJSON().forEach(function (f, i) {
      if (f.file_id === file.file_id) {
        filePosition = i;
      }
    });
    self.shiftMetadata(filePosition);
    var newfilePosition = filePosition === 0 ? 1 : filePosition - 1;
    var filesForUpload = self.filesForUpload();
    var uploadedFiles = self.uploadedFiles();
    if (file.file_id) {
      file = underscore__WEBPACK_IMPORTED_MODULE_1___default().find(uploadedFiles, function (uploadedFile) {
        return knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(file.file_id) === knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(uploadedFile.file_id);
      });
      self.uploadedFiles.remove(file);
    } else {
      file = filesForUpload[file.index];
      self.filesForUpload.remove(file);
    }
    if (self.filesJSON().length > 0) {
      self.selectedFile(self.filesJSON()[newfilePosition]);
    }
  };
  this.pageCt = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable(5);
  this.pageCtReached = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    return self.filesJSON().length > self.pageCt() ? 'visible' : 'hidden';
  });
  this.pagedList = function (list) {
    var arr = [],
      i = 0;
    if (list.length > self.pageCt()) {
      while (arr.length < self.pageCt()) {
        arr.push(list[i++]);
      }
      return arr;
    }
    return list;
  };
  this.unique_id = uuid__WEBPACK_IMPORTED_MODULE_5___default().generate();
  this.uniqueidClass = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    return "unique_id_" + self.unique_id;
  });
  this.metadataDrawerCollapsedStatus = knockout__WEBPACK_IMPORTED_MODULE_0___default().observable({}); // 0-indexed. true = collapsed
  this.toggleDropdown = function (index) {
    var drawer = jquery__WEBPACK_IMPORTED_MODULE_2___default()(".file-metadata-additional-".concat(self.unique_id).concat(index))[0];
    if (!drawer) {
      self.metadataDrawerCollapsedStatus(_objectSpread(_objectSpread({}, self.metadataDrawerCollapsedStatus()), {}, _defineProperty({}, index, true)));
      return;
    }
    self.metadataDrawerCollapsedStatus(_objectSpread(_objectSpread({}, self.metadataDrawerCollapsedStatus()), {}, _defineProperty({}, index, drawer.className.includes('collapse in'))));
  };
  self.shiftMetadata = function (filePosition) {
    var newToggles = {};
    var someDrawerWasOpenAfterRemovedPosition = false;
    for (var _i = 0, _Object$entries = Object.entries(self.metadataDrawerCollapsedStatus()); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        val = _Object$entries$_i[1];
      var keyAsInt = Number.parseInt(key);
      if (keyAsInt < filePosition) {
        newToggles[keyAsInt] = val;
      } else if (keyAsInt !== filePosition && !someDrawerWasOpenAfterRemovedPosition) {
        newToggles[keyAsInt - 1] = val;
        if (val) {
          // Only the first of these seems to work (bootstrap bug?)
          // So set a flag to ensure we close subsequent drawers.
          someDrawerWasOpenAfterRemovedPosition = true;
        }
      }
    }
    self.metadataDrawerCollapsedStatus(newToggles);
    var newMetadata = {};
    for (var _i2 = 0, _Object$entries2 = Object.entries(self.beforeChangeMetadataSnapshot()); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        _key = _Object$entries2$_i[0],
        _val = _Object$entries2$_i[1];
      var _keyAsInt = Number.parseInt(_key);
      if (_keyAsInt < filePosition) {
        newMetadata[_keyAsInt] = _val;
      } else if (_keyAsInt !== filePosition) {
        newMetadata[_keyAsInt - 1] = _val;
      }
    }
    self.beforeChangeMetadataSnapshot(newMetadata);
  };
  this.dropzoneOptions = {
    url: "arches.urls.root",
    dictDefaultMessage: '',
    autoProcessQueue: false,
    previewTemplate: jquery__WEBPACK_IMPORTED_MODULE_2___default()("template#file-widget-dz-preview").html(),
    autoQueue: false,
    previewsContainer: ".dz-previews." + this.uniqueidClass(),
    clickable: ".fileinput-button." + this.uniqueidClass(),
    acceptedFiles: this.acceptedFiles(),
    maxFilesize: this.maxFilesize(),
    uploadMultiple: self.uploadMulti(),
    // maxFiles: Number(this.maxFiles()),
    init: function init() {
      self.dropzone = this;
      this.on("addedfile", function (file) {
        self.filesForUpload.push(file);
      });
      this.on("error", function (file, error) {
        file.error = error;
        self.filesForUpload.valueHasMutated();
      });
      this.on("removedfile", function (file) {
        self.filesForUpload.remove(file);
      });
    }
  };
  this.reset = function () {
    if (self.dropzone) {
      self.dropzone.removeAllFiles(true);
      self.uploadedFiles.removeAll();
      self.filesForUpload.removeAll();
      self.beforeChangeMetadataSnapshot({});
    }
  };
  this.displayValue = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    return self.uploadedFiles().length === 1 ? knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(self.uploadedFiles()[0].name) : self.uploadedFiles().length;
  });
  this.reportFiles = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    return self.uploadedFiles().filter(function (file) {
      var fileType = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(file.type);
      if (fileType) {
        var ext = fileType.split('/').pop();
        return fileType.indexOf('image') < 0 || self.unsupportedImageTypes.indexOf(ext) > -1;
      }
      return true;
    });
  });
  this.reportImages = knockout__WEBPACK_IMPORTED_MODULE_0___default().computed(function () {
    return self.uploadedFiles().filter(function (file) {
      var fileType = knockout__WEBPACK_IMPORTED_MODULE_0___default().unwrap(file.type);
      if (fileType) {
        var ext = fileType.split('/').pop();
        return fileType.indexOf('image') >= 0 && self.unsupportedImageTypes.indexOf(ext) <= 0;
      }
      return false;
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileWidgetViewModel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxJQUFJdEwsSUFBSSxDQUFDUSxxQkFBcUIsQ0FBQzhLLE9BQU8sQ0FBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ3hGO01BQ0EsT0FBTyxJQUFJO0lBQ2YsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0VBRUYsSUFBSSxDQUFDSSxZQUFZLEdBQUdqTSx3REFBVyxDQUFDLFlBQVc7SUFDdkMsT0FBT1UsSUFBSSxDQUFDTyxhQUFhLENBQUMsQ0FBQyxDQUFDTyxNQUFNLENBQUMsVUFBUzhCLElBQUksRUFBRTtNQUM5QyxJQUFJc0ksUUFBUSxHQUFHNUwsc0RBQVMsQ0FBQ3NELElBQUksQ0FBQzhDLElBQUksQ0FBQztNQUNuQyxJQUFJd0YsUUFBUSxFQUFFO1FBQ1YsSUFBSUMsR0FBRyxHQUFHRCxRQUFRLENBQUNFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLENBQUM7UUFDbkMsT0FBT0gsUUFBUSxDQUFDSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJdEwsSUFBSSxDQUFDUSxxQkFBcUIsQ0FBQzhLLE9BQU8sQ0FBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQztNQUN6RjtNQUNBLE9BQU8sS0FBSztJQUNoQixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsaUVBQWV0TCxtQkFBbUIsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdtb2RlbHMvZmlsZS13aWRnZXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBhcmNoZXMgZnJvbSAnYXJjaGVzJztcbmltcG9ydCBEcm9wem9uZSBmcm9tICdkcm9wem9uZSc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBXaWRnZXRWaWV3TW9kZWwgZnJvbSAndmlld21vZGVscy93aWRnZXQnO1xuaW1wb3J0ICdiaW5kaW5ncy9kcm9wem9uZSc7XG5cblxuLyoqXG4gKiBBIHZpZXdtb2RlbCB1c2VkIGZvciBmaWxlIHdpZGdldHNcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBuYW1lIEZpbGVXaWRnZXRWaWV3TW9kZWxcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHBhcmFtcyAtIGEgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqL1xudmFyIEZpbGVXaWRnZXRWaWV3TW9kZWwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcGFyYW1zLmNvbmZpZ0tleXMgPSBbJ2FjY2VwdGVkRmlsZXMnLCAnbWF4RmlsZXNpemUnLCAnbWF4RmlsZXMnXTtcblxuICAgIFdpZGdldFZpZXdNb2RlbC5hcHBseSh0aGlzLCBbcGFyYW1zXSk7XG5cbiAgICB0aGlzLnVwbG9hZE11bHRpID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcbiAgICB0aGlzLmZpbGVzRm9yVXBsb2FkID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgdGhpcy51cGxvYWRlZEZpbGVzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgdGhpcy51bnN1cHBvcnRlZEltYWdlVHlwZXMgPSBbJ3RpZicsICd0aWZmJywgJ3ZuZC5hZG9iZS5waG90b3Nob3AnXTtcblxuXG4gICAgaWYgKHRoaXMuZm9ybSkge1xuICAgICAgICB0aGlzLmZvcm0ub24oJ2FmdGVyLXVwZGF0ZScsIGZ1bmN0aW9uKHJlcSwgdGlsZSkge1xuICAgICAgICAgICAgdmFyIGhhc2RhdGEgPSBfLmZpbHRlcih0aWxlLmRhdGEsIGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gICAgICAgICAgICAgICAgdmFsID0ga28udW53cmFwKHZhbCk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRpbGUuaXNQYXJlbnQgPT09IHRydWUgfHwgaGFzZGF0YS5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRyb3B6b25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZHJvcHpvbmUucmVtb3ZlQWxsRmlsZXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICgoc2VsZi50aWxlID09PSB0aWxlIHx8IF8uY29udGFpbnModGlsZS50aWxlcywgc2VsZi50aWxlKSkgJiYgcmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZmlsZXNGb3JVcGxvYWQoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmlsZXNGb3JVcGxvYWQucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVxLnJlc3BvbnNlSlNPTi5kYXRhW3NlbGYubm9kZS5ub2RlaWRdO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkZWRGaWxlcyhkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZHJvcHpvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kcm9wem9uZS5yZW1vdmVBbGxGaWxlcyh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5mb3JtRGF0YS5kZWxldGUoJ2ZpbGUtbGlzdF8nICsgc2VsZi5ub2RlLm5vZGVpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZvcm0ub24oJ3RpbGUtcmVzZXQnLCBmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgICAgICBpZiAoKHNlbGYudGlsZSA9PT0gdGlsZSB8fCBfLmNvbnRhaW5zKHRpbGUudGlsZXMsIHNlbGYudGlsZSkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZmlsZXNGb3JVcGxvYWQoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmlsZXNGb3JVcGxvYWQucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGYudmFsdWUoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVwbG9hZGVkID0gXy5maWx0ZXIoc2VsZi52YWx1ZSgpLCBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrby51bndyYXAodmFsLnN0YXR1cykgPT09ICd1cGxvYWRlZCc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwbG9hZGVkRmlsZXModXBsb2FkZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kcm9wem9uZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRyb3B6b25lLnJlbW92ZUFsbEZpbGVzKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnZmlsZS1saXN0XycgKyBzZWxmLm5vZGUubm9kZWlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmJlZm9yZUNoYW5nZU1ldGFkYXRhU25hcHNob3Qoe30pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5hY2NlcHRlZEZpbGVzLnN1YnNjcmliZShmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHNlbGYuZHJvcHpvbmUpIHtcbiAgICAgICAgICAgIHNlbGYuZHJvcHpvbmUuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcImFjY2VwdFwiLCB2YWwpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tYXhGaWxlc2l6ZS5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmIChzZWxmLmRyb3B6b25lKSB7XG4gICAgICAgICAgICBzZWxmLmRyb3B6b25lLm9wdGlvbnMubWF4RmlsZXNpemUgPSB2YWw7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZm9ybWF0U2l6ZSA9IGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgdmFyIGJ5dGVzID0ga28udW53cmFwKGZpbGUuc2l6ZSk7XG4gICAgICAgIGlmKGJ5dGVzID09IDApIHJldHVybiAnMCBCeXRlJztcbiAgICAgICAgdmFyIGsgPSAxMDI0O1xuICAgICAgICB2YXIgZG0gPSAyO1xuICAgICAgICB2YXIgc2l6ZXMgPSBbJ0J5dGVzJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJywgJ0VCJywgJ1pCJywgJ1lCJ107XG4gICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZyhrKSk7XG4gICAgICAgIHJldHVybiAnPHNwYW4+JyArIHBhcnNlRmxvYXQoKGJ5dGVzIC8gTWF0aC5wb3coaywgaSkpLnRvRml4ZWQoZG0pKSArICc8L3NwYW4+ICcgKyBzaXplc1tpXTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVTdHJPYmplY3QgPSBzdHIgPT4ge1xuICAgICAgICByZXR1cm4ge1thcmNoZXMuYWN0aXZlTGFuZ3VhZ2VdOiB7XG4gICAgICAgICAgICBcImRpcmVjdGlvblwiOiBhcmNoZXMubGFuZ3VhZ2VzLmZpbmQobGFuZyA9PiBsYW5nLmNvZGUgPT0gYXJjaGVzLmFjdGl2ZUxhbmd1YWdlKS5kZWZhdWx0X2RpcmVjdGlvbixcbiAgICAgICAgICAgIFwidmFsdWVcIjogc3RyLFxuICAgICAgICB9fTtcbiAgICB9O1xuICAgIHRoaXMuYWN0aXZlTGFuZ3VhZ2UgPSBhcmNoZXMuYWN0aXZlTGFuZ3VhZ2U7XG5cbiAgICB0aGlzLmJlZm9yZUNoYW5nZU1ldGFkYXRhU25hcHNob3QgPSBrby5vYnNlcnZhYmxlKHt9KTtcbiAgICB0aGlzLnN0YW5kYWxvbmVPYnNlcnZhYmxlID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICB0aGlzLmZpbGVzSlNPTiA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsZXNGb3JVcGxvYWQgPSBzZWxmLmZpbGVzRm9yVXBsb2FkKCk7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkRmlsZXMgPSBzZWxmLnVwbG9hZGVkRmlsZXMoKS5tYXAoZmlsZSA9PiB7XG4gICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKGZpbGUudGl0bGVbc2VsZi5hY3RpdmVMYW5ndWFnZV0udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXdyYXAgaW4gb2JzZXJ2YWJsZSBpZiBuZWVkZWQuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmZpbGUsXG4gICAgICAgICAgICAgICAgYWx0VGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5maWxlLmFsdFRleHQsXG4gICAgICAgICAgICAgICAgICAgIFtzZWxmLmFjdGl2ZUxhbmd1YWdlXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXJlY3Rpb25cIjoga28ub2JzZXJ2YWJsZShmaWxlLmFsdFRleHRbc2VsZi5hY3RpdmVMYW5ndWFnZV0uZGlyZWN0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjoga28ub2JzZXJ2YWJsZShmaWxlLmFsdFRleHRbc2VsZi5hY3RpdmVMYW5ndWFnZV0udmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uZmlsZS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgW3NlbGYuYWN0aXZlTGFuZ3VhZ2VdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpcmVjdGlvblwiOiBrby5vYnNlcnZhYmxlKGZpbGUudGl0bGVbc2VsZi5hY3RpdmVMYW5ndWFnZV0uZGlyZWN0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjoga28ub2JzZXJ2YWJsZShmaWxlLnRpdGxlW3NlbGYuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmZpbGUuYXR0cmlidXRpb24sXG4gICAgICAgICAgICAgICAgICAgIFtzZWxmLmFjdGl2ZUxhbmd1YWdlXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXJlY3Rpb25cIjoga28ub2JzZXJ2YWJsZShmaWxlLmF0dHJpYnV0aW9uW3NlbGYuYWN0aXZlTGFuZ3VhZ2VdLmRpcmVjdGlvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGtvLm9ic2VydmFibGUoZmlsZS5hdHRyaWJ1dGlvbltzZWxmLmFjdGl2ZUxhbmd1YWdlXS52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAuLi5maWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBbc2VsZi5hY3RpdmVMYW5ndWFnZV06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGlyZWN0aW9uXCI6IGtvLm9ic2VydmFibGUoZmlsZS5kZXNjcmlwdGlvbltzZWxmLmFjdGl2ZUxhbmd1YWdlXS5kaXJlY3Rpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBrby5vYnNlcnZhYmxlKGZpbGUuZGVzY3JpcHRpb25bc2VsZi5hY3RpdmVMYW5ndWFnZV0udmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgc3RhbmRhbG9uZU9ic2VydmFibGUgPSBzZWxmLnN0YW5kYWxvbmVPYnNlcnZhYmxlKCk7ICAvLyBmb3IgdHJpZ2dlcmluZyB1cGRhdGVcbiAgICAgICAgdmFyIGJlZm9yZUNoYW5nZU1ldGFkYXRhU25hcHNob3QgPSBzZWxmLmJlZm9yZUNoYW5nZU1ldGFkYXRhU25hcHNob3QoKTtcbiAgICAgICAgcmV0dXJuIHVwbG9hZGVkRmlsZXMuY29uY2F0KFxuICAgICAgICAgICAgXy5tYXAoZmlsZXNGb3JVcGxvYWQsIGZ1bmN0aW9uKGZpbGUsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGFsdFRleHQ6IGJlZm9yZUNoYW5nZU1ldGFkYXRhU25hcHNob3RbaV0/LmFsdFRleHQgPz8gc2VsZi5jcmVhdGVTdHJPYmplY3QoJycpLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogYmVmb3JlQ2hhbmdlTWV0YWRhdGFTbmFwc2hvdFtpXT8udGl0bGUgPz8gc2VsZi5jcmVhdGVTdHJPYmplY3QoJycpLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogYmVmb3JlQ2hhbmdlTWV0YWRhdGFTbmFwc2hvdFtpXT8uYXR0cmlidXRpb24gPz8gc2VsZi5jcmVhdGVTdHJPYmplY3QoJycpLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYmVmb3JlQ2hhbmdlTWV0YWRhdGFTbmFwc2hvdFtpXT8uZGVzY3JpcHRpb24gPz8gc2VsZi5jcmVhdGVTdHJPYmplY3QoJycpLFxuICAgICAgICAgICAgICAgICAgICBhY2NlcHRlZDogZmlsZS5hY2NlcHRlZCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBmaWxlLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE1vZGlmaWVkOiBmaWxlLmxhc3RNb2RpZmllZCxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogZmlsZS5zaXplLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGZpbGUuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBmaWxlLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVfaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZmlsZS5lcnJvclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0pLmV4dGVuZCh7dGhyb3R0bGU6IDEwMH0pO1xuXG4gICAgdGhpcy5maWxlc0pTT04uc3Vic2NyaWJlKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmIChzZWxmLmZvcm1EYXRhKSB7XG4gICAgICAgICAgICBpZiAoXy5jb250YWlucyhzZWxmLmZvcm1EYXRhLmtleXMoKSwgJ2ZpbGUtbGlzdF8nICsgc2VsZi5ub2RlLm5vZGVpZCkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmRlbGV0ZSgnZmlsZS1saXN0XycgKyBzZWxmLm5vZGUubm9kZWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMSAmJiBzZWxmLnNlbGVjdGVkRmlsZSgpID09IHVuZGVmaW5lZCkgeyBzZWxmLnNlbGVjdGVkRmlsZSh2YWx1ZVswXSk7IH1cbiAgICAgICAgXy5lYWNoKHNlbGYuZmlsZXNGb3JVcGxvYWQoKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgaWYgKGZpbGUuYWNjZXB0ZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmZvcm1EYXRhLmFwcGVuZCgnZmlsZS1saXN0XycgKyBzZWxmLm5vZGUubm9kZWlkLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGtvLnVud3JhcChzZWxmLnZhbHVlKSAhPT0gbnVsbCB8fCBzZWxmLmZpbGVzRm9yVXBsb2FkKCkubGVuZ3RoICE9PSAwIHx8IHNlbGYudXBsb2FkZWRGaWxlcygpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgc2VsZi52YWx1ZShcbiAgICAgICAgICAgICAgICB2YWx1ZS5maWx0ZXIoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsZS5hY2NlcHRlZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5lcXVhbE1ldGFkYXRhID0gKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKCFhIHx8ICFiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGEuYWx0VGV4dFt0aGlzLmFjdGl2ZUxhbmd1YWdlXS52YWx1ZSA9PT0gYi5hbHRUZXh0W3RoaXMuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlXG4gICAgICAgICAgICAmJiBhLnRpdGxlW3RoaXMuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlID09PSBiLnRpdGxlW3RoaXMuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlXG4gICAgICAgICAgICAmJiBhLmF0dHJpYnV0aW9uW3RoaXMuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlID09PSBiLnRpdGxlW3RoaXMuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlXG4gICAgICAgICAgICAmJiBhLmRlc2NyaXB0aW9uW3RoaXMuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlID09PSBiLnRpdGxlW3RoaXMuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIHRoaXMubWV0YWRhdGFJc0VtcHR5ID0gKG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAhbWV0YWRhdGEuYWx0VGV4dFt0aGlzLmFjdGl2ZUxhbmd1YWdlXS52YWx1ZVxuICAgICAgICAgICAgJiYgIW1ldGFkYXRhLnRpdGxlW3RoaXMuYWN0aXZlTGFuZ3VhZ2VdLnZhbHVlXG4gICAgICAgICAgICAmJiAhbWV0YWRhdGEuYXR0cmlidXRpb25bdGhpcy5hY3RpdmVMYW5ndWFnZV0udmFsdWVcbiAgICAgICAgICAgICYmICFtZXRhZGF0YS5kZXNjcmlwdGlvblt0aGlzLmFjdGl2ZUxhbmd1YWdlXS52YWx1ZVxuICAgIH07XG5cbiAgICB0aGlzLmZpbGVzSlNPTi5zdWJzY3JpYmUoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgLy8gUHJlc2VydmUgY3VycmVudCBtZXRhZGF0YSBmb3IgeWV0LXRvLWJlLXVwbG9hZGVkIGZpbGVzXG4gICAgICAgIHZhbHVlLmZpbHRlcihcbiAgICAgICAgICAgIGZpbGUgPT4gZmlsZS5maWxlX2lkID09PSBudWxsXG4gICAgICAgICAgICAvLyBEb24ndCB0YWtlIGEgc25hcHNob3Qgb2YgdGhlIHVuc2F2ZWQgbWV0YWRhdGEgaWYgd2UncmUgZGVsZXRpbmcgaXQuXG4gICAgICAgICAgICAmJiBzZWxmLmZpbGVzRm9yVXBsb2FkKCkuZmluZChmID0+IGYubmFtZSA9PT0gZmlsZS5uYW1lKVxuICAgICAgICApLmZvckVhY2goKGZpbGUsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgYWx0VGV4dCwgdGl0bGUsIGF0dHJpYnV0aW9uLCBkZXNjcmlwdGlvbiB9ID0gZmlsZTtcbiAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhID0geyBhbHRUZXh0LCB0aXRsZSwgYXR0cmlidXRpb24sIGRlc2NyaXB0aW9uIH07XG4gICAgICAgICAgICBpZiAoc2VsZi5tZXRhZGF0YUlzRW1wdHkobWV0YWRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzZWxmLmVxdWFsTWV0YWRhdGEoc2VsZi5iZWZvcmVDaGFuZ2VNZXRhZGF0YVNuYXBzaG90KClbaV0sIG1ldGFkYXRhKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuYmVmb3JlQ2hhbmdlTWV0YWRhdGFTbmFwc2hvdCgpW2ldID0gbWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgc2VsZi5zdGFuZGFsb25lT2JzZXJ2YWJsZS5wdXNoKE1hdGgucmFuZG9tKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCB0aGlzLCAnYmVmb3JlQ2hhbmdlJyk7XG5cbiAgICB0aGlzLmdldEZpbGVVcmwgPSBmdW5jdGlvbih1cmx0b2NsZWFuKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IGtvLnVud3JhcCh1cmx0b2NsZWFuKTtcbiAgICAgICAgY29uc3QgaHR0cFJlZ2V4ID0gL15odHRwcz86XFwvXFwvLztcbiAgICAgICAgLy8gdGVzdCB3aGV0aGVyIHRoZSB1cmwgaXMgZnVsbHkgcXVhbGlmaWVkIG9yIGFscmVhZHkgc3RhcnRzIHdpdGggdXJsX3N1YnBhdGhcbiAgICAgICAgcmV0dXJuICF1cmwgfHwgaHR0cFJlZ2V4LnRlc3QodXJsKSB8fCB1cmwuc3RhcnRzV2l0aChhcmNoZXMudXJscy51cmxfc3VicGF0aCkgPyB1cmwgOlxuICAgICAgICAgICAgKGFyY2hlcy51cmxzLnVybF9zdWJwYXRoICsgdXJsKS5yZXBsYWNlKCcvLycsICcvJyk7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGYudmFsdWUoKSkpIHtcbiAgICAgICAgLy8gSHlkcmF0ZSB0aGUgbWV0YWRhdGEgZmllbGRzIGluIHBsYWNlIHdpdGggdGhlIGFjdGl2ZSBsYW5ndWFnZSBrZXlzIGlmIG1pc3NpbmdcbiAgICAgICAgY29uc3QgdmFscyA9IHNlbGYudmFsdWUoKTtcbiAgICAgICAgdmFscy5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICAgICAgICBbJ2FsdFRleHQnLCAndGl0bGUnLCAnYXR0cmlidXRpb24nLCAnZGVzY3JpcHRpb24nXS5mb3JFYWNoKG1ldGFkYXRhQXR0ciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxbbWV0YWRhdGFBdHRyXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBNZXRhZGF0YSBmaWVsZHMgbWlzc2luZyBlbnRpcmVseVxuICAgICAgICAgICAgICAgICAgICB2YWxbbWV0YWRhdGFBdHRyXSA9IHNlbGYuY3JlYXRlU3RyT2JqZWN0KCcnKTsgIC8vIGVuc3VyZXMgYWN0aXZlIGxhbmd1YWdlXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsW21ldGFkYXRhQXR0cl1bYXJjaGVzLmFjdGl2ZUxhbmd1YWdlXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBY3RpdmUgbGFuZ3VhZ2UgbWlzc2luZ1xuICAgICAgICAgICAgICAgICAgICB2YWxbbWV0YWRhdGFBdHRyXVthcmNoZXMuYWN0aXZlTGFuZ3VhZ2VdID0gc2VsZi5jcmVhdGVTdHJPYmplY3QoJycpW2FyY2hlcy5hY3RpdmVMYW5ndWFnZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwbG9hZGVkRmlsZXModmFscyk7XG4gICAgfVxuICAgIHRoaXMuZmlsdGVyID0ga28ub2JzZXJ2YWJsZShcIlwiKTtcbiAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJyID0gW10sIGxvd2VyTmFtZSA9IFwiXCIsIGZpbHRlciA9IHNlbGYuZmlsdGVyKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYoZmlsdGVyKSB7XG4gICAgICAgICAgICBzZWxmLmZpbGVzSlNPTigpLmZvckVhY2goZnVuY3Rpb24oZiwgaSkge1xuICAgICAgICAgICAgICAgIGxvd2VyTmFtZSA9IGtvLnVud3JhcChmLm5hbWUpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYobG93ZXJOYW1lLmluY2x1ZGVzKGZpbHRlcikpIHsgYXJyLnB1c2goc2VsZi5maWxlc0pTT04oKVtpXSk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNlbGVjdGVkRmlsZSA9IGtvLm9ic2VydmFibGUoc2VsZi5maWxlc0pTT04oKVswXSk7XG4gICAgdGhpcy5zZWxlY3RGaWxlID0gZnVuY3Rpb24oc0ZpbGUpIHsgc2VsZi5zZWxlY3RlZEZpbGUoc0ZpbGUpOyB9O1xuXG4gICAgdGhpcy5yZW1vdmVGaWxlID0gZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICB2YXIgZmlsZVBvc2l0aW9uO1xuICAgICAgICBzZWxmLmZpbGVzSlNPTigpLmZvckVhY2goZnVuY3Rpb24oZiwgaSkgeyBpZiAoZi5maWxlX2lkID09PSBmaWxlLmZpbGVfaWQpIHsgZmlsZVBvc2l0aW9uID0gaTsgfSB9KTtcbiAgICAgICAgc2VsZi5zaGlmdE1ldGFkYXRhKGZpbGVQb3NpdGlvbik7XG4gICAgICAgIHZhciBuZXdmaWxlUG9zaXRpb24gPSBmaWxlUG9zaXRpb24gPT09IDAgPyAxIDogZmlsZVBvc2l0aW9uIC0gMTtcbiAgICAgICAgdmFyIGZpbGVzRm9yVXBsb2FkID0gc2VsZi5maWxlc0ZvclVwbG9hZCgpO1xuICAgICAgICB2YXIgdXBsb2FkZWRGaWxlcyA9IHNlbGYudXBsb2FkZWRGaWxlcygpO1xuICAgICAgICBpZiAoZmlsZS5maWxlX2lkKSB7XG4gICAgICAgICAgICBmaWxlID0gXy5maW5kKHVwbG9hZGVkRmlsZXMsIGZ1bmN0aW9uKHVwbG9hZGVkRmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrby51bndyYXAoZmlsZS5maWxlX2lkKSA9PT0ga28udW53cmFwKHVwbG9hZGVkRmlsZS5maWxlX2lkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi51cGxvYWRlZEZpbGVzLnJlbW92ZShmaWxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbGUgPSBmaWxlc0ZvclVwbG9hZFtmaWxlLmluZGV4XTtcbiAgICAgICAgICAgIHNlbGYuZmlsZXNGb3JVcGxvYWQucmVtb3ZlKGZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmZpbGVzSlNPTigpLmxlbmd0aCA+IDApIHsgc2VsZi5zZWxlY3RlZEZpbGUoc2VsZi5maWxlc0pTT04oKVtuZXdmaWxlUG9zaXRpb25dKTsgfVxuICAgIH07XG5cbiAgICB0aGlzLnBhZ2VDdCA9IGtvLm9ic2VydmFibGUoNSk7XG4gICAgdGhpcy5wYWdlQ3RSZWFjaGVkID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoc2VsZi5maWxlc0pTT04oKS5sZW5ndGggPiBzZWxmLnBhZ2VDdCgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wYWdlZExpc3QgPSBmdW5jdGlvbihsaXN0KSB7XG4gICAgICAgIHZhciBhcnIgPSBbXSwgaSA9IDA7XG4gICAgICAgIGlmKGxpc3QubGVuZ3RoID4gc2VsZi5wYWdlQ3QoKSkge1xuICAgICAgICAgICAgd2hpbGUoYXJyLmxlbmd0aCA8IHNlbGYucGFnZUN0KCkpIHsgYXJyLnB1c2gobGlzdFtpKytdKTsgfVxuICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuXG4gICAgdGhpcy51bmlxdWVfaWQgPSB1dWlkLmdlbmVyYXRlKCk7XG4gICAgdGhpcy51bmlxdWVpZENsYXNzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcInVuaXF1ZV9pZF9cIiArIHNlbGYudW5pcXVlX2lkO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tZXRhZGF0YURyYXdlckNvbGxhcHNlZFN0YXR1cyA9IGtvLm9ic2VydmFibGUoe30pOyAgLy8gMC1pbmRleGVkLiB0cnVlID0gY29sbGFwc2VkXG4gICAgdGhpcy50b2dnbGVEcm9wZG93biA9IChpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBkcmF3ZXIgPSAkKGAuZmlsZS1tZXRhZGF0YS1hZGRpdGlvbmFsLSR7c2VsZi51bmlxdWVfaWR9JHtpbmRleH1gKVswXTtcbiAgICAgICAgaWYgKCFkcmF3ZXIpIHtcbiAgICAgICAgICAgIHNlbGYubWV0YWRhdGFEcmF3ZXJDb2xsYXBzZWRTdGF0dXMoe1xuICAgICAgICAgICAgICAgIC4uLnNlbGYubWV0YWRhdGFEcmF3ZXJDb2xsYXBzZWRTdGF0dXMoKSxcbiAgICAgICAgICAgICAgICBbaW5kZXhdOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLm1ldGFkYXRhRHJhd2VyQ29sbGFwc2VkU3RhdHVzKHtcbiAgICAgICAgICAgIC4uLnNlbGYubWV0YWRhdGFEcmF3ZXJDb2xsYXBzZWRTdGF0dXMoKSxcbiAgICAgICAgICAgIFtpbmRleF06IGRyYXdlci5jbGFzc05hbWUuaW5jbHVkZXMoJ2NvbGxhcHNlIGluJyksXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLnNoaWZ0TWV0YWRhdGEgPSBmdW5jdGlvbihmaWxlUG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgbmV3VG9nZ2xlcyA9IHt9O1xuICAgICAgICB2YXIgc29tZURyYXdlcldhc09wZW5BZnRlclJlbW92ZWRQb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoc2VsZi5tZXRhZGF0YURyYXdlckNvbGxhcHNlZFN0YXR1cygpKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5QXNJbnQgPSBOdW1iZXIucGFyc2VJbnQoa2V5KTtcbiAgICAgICAgICAgIGlmIChrZXlBc0ludCA8IGZpbGVQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIG5ld1RvZ2dsZXNba2V5QXNJbnRdID0gdmFsO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlBc0ludCAhPT0gZmlsZVBvc2l0aW9uICYmICFzb21lRHJhd2VyV2FzT3BlbkFmdGVyUmVtb3ZlZFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgbmV3VG9nZ2xlc1trZXlBc0ludCAtIDFdID0gdmFsO1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB0aGUgZmlyc3Qgb2YgdGhlc2Ugc2VlbXMgdG8gd29yayAoYm9vdHN0cmFwIGJ1Zz8pXG4gICAgICAgICAgICAgICAgICAgIC8vIFNvIHNldCBhIGZsYWcgdG8gZW5zdXJlIHdlIGNsb3NlIHN1YnNlcXVlbnQgZHJhd2Vycy5cbiAgICAgICAgICAgICAgICAgICAgc29tZURyYXdlcldhc09wZW5BZnRlclJlbW92ZWRQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYubWV0YWRhdGFEcmF3ZXJDb2xsYXBzZWRTdGF0dXMobmV3VG9nZ2xlcyk7XG5cbiAgICAgICAgY29uc3QgbmV3TWV0YWRhdGEgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHNlbGYuYmVmb3JlQ2hhbmdlTWV0YWRhdGFTbmFwc2hvdCgpKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5QXNJbnQgPSBOdW1iZXIucGFyc2VJbnQoa2V5KTtcbiAgICAgICAgICAgIGlmIChrZXlBc0ludCA8IGZpbGVQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIG5ld01ldGFkYXRhW2tleUFzSW50XSA9IHZhbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5QXNJbnQgIT09IGZpbGVQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIG5ld01ldGFkYXRhW2tleUFzSW50IC0gMV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5iZWZvcmVDaGFuZ2VNZXRhZGF0YVNuYXBzaG90KG5ld01ldGFkYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyb3B6b25lT3B0aW9ucyA9IHtcbiAgICAgICAgdXJsOiBcImFyY2hlcy51cmxzLnJvb3RcIixcbiAgICAgICAgZGljdERlZmF1bHRNZXNzYWdlOiAnJyxcbiAgICAgICAgYXV0b1Byb2Nlc3NRdWV1ZTogZmFsc2UsXG4gICAgICAgIHByZXZpZXdUZW1wbGF0ZTogJChcInRlbXBsYXRlI2ZpbGUtd2lkZ2V0LWR6LXByZXZpZXdcIikuaHRtbCgpLFxuICAgICAgICBhdXRvUXVldWU6IGZhbHNlLFxuICAgICAgICBwcmV2aWV3c0NvbnRhaW5lcjogXCIuZHotcHJldmlld3MuXCIgKyB0aGlzLnVuaXF1ZWlkQ2xhc3MoKSxcbiAgICAgICAgY2xpY2thYmxlOiBcIi5maWxlaW5wdXQtYnV0dG9uLlwiICsgdGhpcy51bmlxdWVpZENsYXNzKCksXG4gICAgICAgIGFjY2VwdGVkRmlsZXM6IHRoaXMuYWNjZXB0ZWRGaWxlcygpLFxuICAgICAgICBtYXhGaWxlc2l6ZTogdGhpcy5tYXhGaWxlc2l6ZSgpLFxuICAgICAgICB1cGxvYWRNdWx0aXBsZTogc2VsZi51cGxvYWRNdWx0aSgpLFxuICAgICAgICAvLyBtYXhGaWxlczogTnVtYmVyKHRoaXMubWF4RmlsZXMoKSksXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5kcm9wem9uZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMub24oXCJhZGRlZGZpbGVcIiwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZmlsZXNGb3JVcGxvYWQucHVzaChmaWxlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZmlsZSwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBmaWxlLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgc2VsZi5maWxlc0ZvclVwbG9hZC52YWx1ZUhhc011dGF0ZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLm9uKFwicmVtb3ZlZGZpbGVcIiwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZmlsZXNGb3JVcGxvYWQucmVtb3ZlKGZpbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2VsZi5kcm9wem9uZSkge1xuICAgICAgICAgICAgc2VsZi5kcm9wem9uZS5yZW1vdmVBbGxGaWxlcyh0cnVlKTtcbiAgICAgICAgICAgIHNlbGYudXBsb2FkZWRGaWxlcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIHNlbGYuZmlsZXNGb3JVcGxvYWQucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICBzZWxmLmJlZm9yZUNoYW5nZU1ldGFkYXRhU25hcHNob3Qoe30pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcGxheVZhbHVlID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzZWxmLnVwbG9hZGVkRmlsZXMoKS5sZW5ndGggPT09IDEgPyBrby51bndyYXAoc2VsZi51cGxvYWRlZEZpbGVzKClbMF0ubmFtZSkgOiBzZWxmLnVwbG9hZGVkRmlsZXMoKS5sZW5ndGg7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlcG9ydEZpbGVzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzZWxmLnVwbG9hZGVkRmlsZXMoKS5maWx0ZXIoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgdmFyIGZpbGVUeXBlID0ga28udW53cmFwKGZpbGUudHlwZSk7XG4gICAgICAgICAgICBpZiAoZmlsZVR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXh0ID0gZmlsZVR5cGUuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsZVR5cGUuaW5kZXhPZignaW1hZ2UnKSA8IDAgfHwgc2VsZi51bnN1cHBvcnRlZEltYWdlVHlwZXMuaW5kZXhPZihleHQpID4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlcG9ydEltYWdlcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2VsZi51cGxvYWRlZEZpbGVzKCkuZmlsdGVyKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgIHZhciBmaWxlVHlwZSA9IGtvLnVud3JhcChmaWxlLnR5cGUpO1xuICAgICAgICAgICAgaWYgKGZpbGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV4dCA9IGZpbGVUeXBlLnNwbGl0KCcvJykucG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVUeXBlLmluZGV4T2YoJ2ltYWdlJykgPj0gMCAmJiBzZWxmLnVuc3VwcG9ydGVkSW1hZ2VUeXBlcy5pbmRleE9mKGV4dCkgPD0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGaWxlV2lkZ2V0Vmlld01vZGVsO1xuIl0sIm5hbWVzIjpbImtvIiwiXyIsIiQiLCJhcmNoZXMiLCJEcm9wem9uZSIsInV1aWQiLCJXaWRnZXRWaWV3TW9kZWwiLCJGaWxlV2lkZ2V0Vmlld01vZGVsIiwicGFyYW1zIiwiX3RoaXMiLCJzZWxmIiwiY29uZmlnS2V5cyIsImFwcGx5IiwidXBsb2FkTXVsdGkiLCJvYnNlcnZhYmxlIiwiZmlsZXNGb3JVcGxvYWQiLCJvYnNlcnZhYmxlQXJyYXkiLCJ1cGxvYWRlZEZpbGVzIiwidW5zdXBwb3J0ZWRJbWFnZVR5cGVzIiwiZm9ybSIsIm9uIiwicmVxIiwidGlsZSIsImhhc2RhdGEiLCJmaWx0ZXIiLCJkYXRhIiwidmFsIiwia2V5IiwidW53cmFwIiwiaXNQYXJlbnQiLCJsZW5ndGgiLCJkcm9wem9uZSIsInJlbW92ZUFsbEZpbGVzIiwiY29udGFpbnMiLCJ0aWxlcyIsInN0YXR1cyIsInJlbW92ZUFsbCIsInJlc3BvbnNlSlNPTiIsIm5vZGUiLCJub2RlaWQiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JtRGF0YSIsImRlbGV0ZSIsInZhbHVlIiwidXBsb2FkZWQiLCJiZWZvcmVDaGFuZ2VNZXRhZGF0YVNuYXBzaG90IiwiYWNjZXB0ZWRGaWxlcyIsInN1YnNjcmliZSIsImhpZGRlbkZpbGVJbnB1dCIsInNldEF0dHJpYnV0ZSIsIm1heEZpbGVzaXplIiwib3B0aW9ucyIsImZvcm1hdFNpemUiLCJmaWxlIiwiYnl0ZXMiLCJzaXplIiwiayIsImRtIiwic2l6ZXMiLCJpIiwiTWF0aCIsImZsb29yIiwibG9nIiwicGFyc2VGbG9hdCIsInBvdyIsInRvRml4ZWQiLCJjcmVhdGVTdHJPYmplY3QiLCJzdHIiLCJfZGVmaW5lUHJvcGVydHkiLCJhY3RpdmVMYW5ndWFnZSIsImxhbmd1YWdlcyIsImZpbmQiLCJsYW5nIiwiY29kZSIsImRlZmF1bHRfZGlyZWN0aW9uIiwic3RhbmRhbG9uZU9ic2VydmFibGUiLCJmaWxlc0pTT04iLCJjb21wdXRlZCIsIm1hcCIsImlzT2JzZXJ2YWJsZSIsInRpdGxlIiwiX29iamVjdFNwcmVhZCIsImFsdFRleHQiLCJkaXJlY3Rpb24iLCJhdHRyaWJ1dGlvbiIsImRlc2NyaXB0aW9uIiwiY29uY2F0IiwiX2JlZm9yZUNoYW5nZU1ldGFkYXRhIiwiX2JlZm9yZUNoYW5nZU1ldGFkYXRhMiIsIl9iZWZvcmVDaGFuZ2VNZXRhZGF0YTMiLCJfYmVmb3JlQ2hhbmdlTWV0YWRhdGE0IiwiX2JlZm9yZUNoYW5nZU1ldGFkYXRhNSIsIl9iZWZvcmVDaGFuZ2VNZXRhZGF0YTYiLCJfYmVmb3JlQ2hhbmdlTWV0YWRhdGE3IiwiX2JlZm9yZUNoYW5nZU1ldGFkYXRhOCIsIm5hbWUiLCJhY2NlcHRlZCIsImhlaWdodCIsImxhc3RNb2RpZmllZCIsInR5cGUiLCJ3aWR0aCIsInVybCIsImZpbGVfaWQiLCJpbmRleCIsImNvbnRlbnQiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJlcnJvciIsImV4dGVuZCIsInRocm90dGxlIiwia2V5cyIsInNlbGVjdGVkRmlsZSIsInVuZGVmaW5lZCIsImVhY2giLCJhcHBlbmQiLCJlcXVhbE1ldGFkYXRhIiwiYSIsImIiLCJtZXRhZGF0YUlzRW1wdHkiLCJtZXRhZGF0YSIsImYiLCJmb3JFYWNoIiwicHVzaCIsInJhbmRvbSIsImdldEZpbGVVcmwiLCJ1cmx0b2NsZWFuIiwiaHR0cFJlZ2V4IiwidGVzdCIsInN0YXJ0c1dpdGgiLCJ1cmxzIiwidXJsX3N1YnBhdGgiLCJyZXBsYWNlIiwidmFscyIsIm1ldGFkYXRhQXR0ciIsImZpbHRlcmVkTGlzdCIsImFyciIsImxvd2VyTmFtZSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJzZWxlY3RGaWxlIiwic0ZpbGUiLCJyZW1vdmVGaWxlIiwiZmlsZVBvc2l0aW9uIiwic2hpZnRNZXRhZGF0YSIsIm5ld2ZpbGVQb3NpdGlvbiIsInVwbG9hZGVkRmlsZSIsInJlbW92ZSIsInBhZ2VDdCIsInBhZ2VDdFJlYWNoZWQiLCJwYWdlZExpc3QiLCJsaXN0IiwidW5pcXVlX2lkIiwiZ2VuZXJhdGUiLCJ1bmlxdWVpZENsYXNzIiwibWV0YWRhdGFEcmF3ZXJDb2xsYXBzZWRTdGF0dXMiLCJ0b2dnbGVEcm9wZG93biIsImRyYXdlciIsImNsYXNzTmFtZSIsIm5ld1RvZ2dsZXMiLCJzb21lRHJhd2VyV2FzT3BlbkFmdGVyUmVtb3ZlZFBvc2l0aW9uIiwiX2kiLCJfT2JqZWN0JGVudHJpZXMiLCJPYmplY3QiLCJlbnRyaWVzIiwiX09iamVjdCRlbnRyaWVzJF9pIiwiX3NsaWNlZFRvQXJyYXkiLCJrZXlBc0ludCIsIk51bWJlciIsInBhcnNlSW50IiwibmV3TWV0YWRhdGEiLCJfaTIiLCJfT2JqZWN0JGVudHJpZXMyIiwiX09iamVjdCRlbnRyaWVzMiRfaSIsImRyb3B6b25lT3B0aW9ucyIsImRpY3REZWZhdWx0TWVzc2FnZSIsImF1dG9Qcm9jZXNzUXVldWUiLCJwcmV2aWV3VGVtcGxhdGUiLCJodG1sIiwiYXV0b1F1ZXVlIiwicHJldmlld3NDb250YWluZXIiLCJjbGlja2FibGUiLCJ1cGxvYWRNdWx0aXBsZSIsImluaXQiLCJ2YWx1ZUhhc011dGF0ZWQiLCJyZXNldCIsImRpc3BsYXlWYWx1ZSIsInJlcG9ydEZpbGVzIiwiZmlsZVR5cGUiLCJleHQiLCJzcGxpdCIsInBvcCIsImluZGV4T2YiLCJyZXBvcnRJbWFnZXMiXSwic291cmNlUm9vdCI6IiJ9