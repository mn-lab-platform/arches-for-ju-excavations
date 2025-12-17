"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[90403],{

/***/ 90403:
/*!********************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/photo-gallery-card.js + 1 modules ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ photo_gallery_card)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ./node_modules/knockout-mapping/dist/knockout.mapping.min.js
var knockout_mapping_min = __webpack_require__(61101);
// EXTERNAL MODULE: ./node_modules/underscore/underscore-min.js
var underscore_min = __webpack_require__(55869);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/arches.js
var arches = __webpack_require__(77126);
// EXTERNAL MODULE: ./node_modules/dropzone/dist/min/dropzone-amd-module.min.js
var dropzone_amd_module_min = __webpack_require__(50221);
// EXTERNAL MODULE: ./node_modules/uuidjs/dist/uuid.core.js
var uuid_core = __webpack_require__(84806);
var uuid_core_default = /*#__PURE__*/__webpack_require__.n(uuid_core);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/card-component.js
var card_component = __webpack_require__(19480);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/workbench.js + 1 modules
var workbench = __webpack_require__(90141);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/photo-gallery.js
var photo_gallery = __webpack_require__(9405);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/templates/views/components/cards/photo-gallery-card.htm
const photo_gallery_card_namespaceObject = "templates/views/components/cards/photo-gallery-card.htm";
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/alert.js
var viewmodels_alert = __webpack_require__(21672);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/slide.js
var slide = __webpack_require__(83386);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/fadeVisible.js
var fadeVisible = __webpack_require__(42699);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/dropzone.js
var dropzone = __webpack_require__(99152);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/gallery.js
var gallery = __webpack_require__(60925);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/photo-gallery-card.js















var viewModel = function viewModel(params) {
  params.configKeys = ['acceptedFiles', 'maxFilesize'];
  var self = this;
  card_component["default"].apply(this, [params]);
  workbench["default"].apply(this, [params]);
  if (this.card && this.card.activeTab) {
    self.activeTab(this.card.activeTab);
  }
  this.photoGallery = new photo_gallery["default"]();
  this.lastSelected = 0;
  this.selected = knockout_latest_default().observable();
  self.activeTab.subscribe(function (val) {
    self.card.activeTab = val;
  });
  self.card.tiles.subscribe(function (val) {
    if (val.length === 0) {
      self.activeTab(null);
    }
  });
  var getfileListNode = function getfileListNode() {
    var fileListNodeId;
    var fileListNodes = params.card.model.nodes().filter(function (val) {
      if (val.datatype() === 'file-list' && self.card.nodegroupid == val.nodeGroupId()) return val;
    });
    if (fileListNodes.length) {
      fileListNodeId = fileListNodes[0].nodeid;
    }
    return fileListNodeId;
  };
  this.fileListNodeId = getfileListNode();
  this.maxFilesize = knockout_latest_default().computed(function () {
    var mfs = "Missing maxFilesize";
    self.card.widgets().forEach(function (widget) {
      if (widget.node_id() === self.fileListNodeId) {
        mfs = widget.config.maxFilesize() || "--";
      }
    });
    return mfs;
  });
  this.acceptedFiles = knockout_latest_default().computed(function () {
    var _self$card$widgets$fi;
    return ((_self$card$widgets$fi = self.card.widgets().find(function (widget) {
      return widget.node_id() === self.fileListNodeId;
    })) === null || _self$card$widgets$fi === void 0 ? void 0 : _self$card$widgets$fi.config.acceptedFiles()) || arches["default"].translations.allFormatsAccepted;
  });
  this.cleanUrl = function (url) {
    var httpRegex = /^https?:\/\//;
    return !url || httpRegex.test(url) || url.startsWith(arches["default"].urls.url_subpath) ? url : (arches["default"].urls.url_subpath + url).replace('//', '/');
  };
  this.getUrl = function (tile) {
    var url = '';
    var name = '';
    var val = knockout_latest_default().unwrap(tile.data[this.fileListNodeId]);
    if (val && val.length == 1) {
      {
        url = self.cleanUrl(knockout_latest_default().unwrap(val[0].url)) || knockout_latest_default().unwrap(val[0].content);
        name = knockout_latest_default().unwrap(val[0].name);
      }
    }
    return {
      url: url,
      name: name
    };
  };
  this.uniqueId = uuid_core_default().generate();
  this.uniqueidClass = knockout_latest_default().computed(function () {
    return "unique_id_" + self.uniqueId;
  });
  this.showThumbnails = knockout_latest_default().observable(false);
  this.selectDefault = function () {
    var self = this;
    return function () {
      var selectedIndex = self.card.tiles.indexOf(self.selected());
      if (self.card.tiles().length > 0 && selectedIndex === -1) {
        selectedIndex = 0;
      }
      self.card.tiles()[selectedIndex];
      self.photoGallery.selectItem(self.card.tiles()[selectedIndex]);
    };
  };
  this.defaultSelector = this.selectDefault();
  this.displayContent = knockout_latest_default().pureComputed(function () {
    var photo;
    var selected = this.card.tiles().find(function (tile) {
      return tile.selected() === true;
    });
    if (selected) {
      this.selected(selected);
      photo = this.getUrl(selected).url;
    } else {
      this.selected(undefined);
    }
    return photo;
  }, this);
  if (this.displayContent() === undefined) {
    var selectedIndex = 0;
    if (this.card.tiles().length > 0 && this.form && knockout_latest_default().unwrap(this.form.selection) && this.form.selection() !== 'root' || this.form && !knockout_latest_default().unwrap(this.form.selection)) {
      this.photoGallery.selectItem(this.card.tiles()[selectedIndex]);
    }
  }
  this.removeTile = function (val) {
    //TODO: Upon deletion select the tile to the left of the deleted tile
    //If the deleted tile is the first tile, then select the tile to the right
    // var tileCount = this.parent.tiles().length;
    // var index = this.parent.tiles.indexOf(val);
    val.deleteTile();
    setTimeout(self.defaultSelector, 150);
  };
  if (this.form && knockout_latest_default().unwrap(this.form.resourceId)) {
    this.card.resourceinstanceid = knockout_latest_default().unwrap(this.form.resourceId);
  } else if (this.card.resourceinstanceid === undefined && this.card.tiles().length === 0) {
    this.card.resourceinstanceid = uuid_core_default().generate();
  }
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  this.addTile = function (file) {
    var acceptedFileFormats;
    var loadFile;
    acceptedFileFormats = knockout_latest_default().unwrap(self.acceptedFiles).split(',').map(function (item) {
      return item.trim();
    }).map(function (format) {
      return format.replace('.', '');
    });
    if (knockout_latest_default().unwrap(self.acceptedFiles) != arches["default"].translations.allFormatsAccepted && acceptedFileFormats !== undefined && acceptedFileFormats.length > 0) {
      var fileType = file.name.split('.').pop().toLowerCase();
      if (acceptedFileFormats.includes(fileType)) {
        loadFile = true;
      } else {
        loadFile = false;
      }
    } else {
      loadFile = true;
    }
    if (loadFile === true) {
      var newtile;
      newtile = self.card.getNewTile();
      var tilevalue = {
        name: file.name,
        accepted: true,
        height: file.height,
        lastModified: file.lastModified,
        size: file.size,
        status: file.status,
        type: file.type,
        width: file.width,
        url: null,
        file_id: null,
        index: 0,
        content: window.URL.createObjectURL(file),
        error: file.error
      };
      newtile.data[self.fileListNodeId]([tilevalue]);
      newtile.formData.append('file-list_' + self.fileListNodeId, file, file.name);
      newtile.resourceinstance_id = self.card.resourceinstanceid;
      if (self.card.tiles().length === 0) {
        sleep(50);
      }
      newtile.save();
      self.card.newTile = undefined;
    } else {
      params.pageVm.alert(new viewmodels_alert["default"]('ep-alert-red', arches["default"].translations.incorrectFileFormat, arches["default"].translations.fileFormatNotAccepted(knockout_latest_default().unwrap(self.acceptedFiles)), null, function () {}));
    }
  };
  this.dropzoneOptions = {
    url: "arches.urls.root",
    dictDefaultMessage: '',
    autoProcessQueue: false,
    uploadMultiple: true,
    autoQueue: false,
    clickable: ".fileinput-button." + this.uniqueidClass(),
    previewsContainer: '#hidden-dz-previews',
    init: function init() {
      self.dropzone = this;
      this.on("addedfile", self.addTile, self);
      this.on("error", function (file, error) {
        file.error = error;
      });
    }
  };
};
/* harmony default export */ const photo_gallery_card = (knockout_latest_default().components.register('photo-gallery-card', {
  viewModel: viewModel,
  template: photo_gallery_card_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYzk4Yzg4ZjI1MDQzNjE5ZGVhNzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDZTtBQUNkO0FBQ0M7QUFDSTtBQUNSO0FBQ3VDO0FBQ007QUFDakI7QUFDMkM7QUFDakQ7QUFDdEI7QUFDTTtBQUNIO0FBQ0Q7QUFHMUIsSUFBTVcsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQVlDLE1BQU0sRUFBRTtFQUUvQkEsTUFBTSxDQUFDQyxVQUFVLEdBQUcsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDO0VBQ3BELElBQUlDLElBQUksR0FBRyxJQUFJO0VBQ2ZSLHlCQUFzQixDQUFDUyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUNILE1BQU0sQ0FBQyxDQUFDO0VBQzVDTCxvQkFBMkIsQ0FBQ1EsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDSCxNQUFNLENBQUMsQ0FBQztFQUNqRCxJQUFJLElBQUksQ0FBQ0ksSUFBSSxJQUFJLElBQUksQ0FBQ0EsSUFBSSxDQUFDQyxTQUFTLEVBQUU7SUFDbENILElBQUksQ0FBQ0csU0FBUyxDQUFDLElBQUksQ0FBQ0QsSUFBSSxDQUFDQyxTQUFTLENBQUM7RUFDdkM7RUFFQSxJQUFJLENBQUNDLFlBQVksR0FBRyxJQUFJVix3QkFBWSxDQUFDLENBQUM7RUFDdEMsSUFBSSxDQUFDVyxZQUFZLEdBQUcsQ0FBQztFQUNyQixJQUFJLENBQUNDLFFBQVEsR0FBR3BCLG9DQUFhLENBQUMsQ0FBQztFQUMvQmMsSUFBSSxDQUFDRyxTQUFTLENBQUNLLFNBQVMsQ0FBQyxVQUFTQyxHQUFHLEVBQUM7SUFBQ1QsSUFBSSxDQUFDRSxJQUFJLENBQUNDLFNBQVMsR0FBR00sR0FBRztFQUFDLENBQUMsQ0FBQztFQUNuRVQsSUFBSSxDQUFDRSxJQUFJLENBQUNRLEtBQUssQ0FBQ0YsU0FBUyxDQUFDLFVBQVNDLEdBQUcsRUFBQztJQUNuQyxJQUFJ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cGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3ZpZXdzL2NvbXBvbmVudHMvY2FyZHMvcGhvdG8tZ2FsbGVyeS1jYXJkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrbyBmcm9tIFwia25vY2tvdXRcIjtcbmltcG9ydCBrb01hcHBpbmcgZnJvbSBcImtub2Nrb3V0LW1hcHBpbmdcIjtcbmltcG9ydCBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XG5pbXBvcnQgYXJjaGVzIGZyb20gXCJhcmNoZXNcIjtcbmltcG9ydCBEcm9wem9uZSBmcm9tIFwiZHJvcHpvbmVcIjtcbmltcG9ydCB1dWlkIGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgQ2FyZENvbXBvbmVudFZpZXdNb2RlbCBmcm9tIFwidmlld21vZGVscy9jYXJkLWNvbXBvbmVudFwiO1xuaW1wb3J0IFdvcmtiZW5jaENvbXBvbmVudFZpZXdNb2RlbCBmcm9tIFwidmlld3MvY29tcG9uZW50cy93b3JrYmVuY2hcIjtcbmltcG9ydCBQaG90b0dhbGxlcnkgZnJvbSBcInZpZXdtb2RlbHMvcGhvdG8tZ2FsbGVyeVwiO1xuaW1wb3J0IHBob3RvR2FsbGVyeUNhcmRUZW1wbGF0ZSBmcm9tIFwidGVtcGxhdGVzL3ZpZXdzL2NvbXBvbmVudHMvY2FyZHMvcGhvdG8tZ2FsbGVyeS1jYXJkLmh0bVwiO1xuaW1wb3J0IEFsZXJ0Vmlld01vZGVsIGZyb20gXCJ2aWV3bW9kZWxzL2FsZXJ0XCI7XG5pbXBvcnQgXCJiaW5kaW5ncy9zbGlkZVwiO1xuaW1wb3J0IFwiYmluZGluZ3MvZmFkZVZpc2libGVcIjtcbmltcG9ydCBcImJpbmRpbmdzL2Ryb3B6b25lXCI7XG5pbXBvcnQgXCJiaW5kaW5ncy9nYWxsZXJ5XCI7XG5cblxuY29uc3Qgdmlld01vZGVsID0gZnVuY3Rpb24ocGFyYW1zKSB7XG5cbiAgICBwYXJhbXMuY29uZmlnS2V5cyA9IFsnYWNjZXB0ZWRGaWxlcycsICdtYXhGaWxlc2l6ZSddO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBDYXJkQ29tcG9uZW50Vmlld01vZGVsLmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcbiAgICBXb3JrYmVuY2hDb21wb25lbnRWaWV3TW9kZWwuYXBwbHkodGhpcywgW3BhcmFtc10pO1xuICAgIGlmICh0aGlzLmNhcmQgJiYgdGhpcy5jYXJkLmFjdGl2ZVRhYikge1xuICAgICAgICBzZWxmLmFjdGl2ZVRhYih0aGlzLmNhcmQuYWN0aXZlVGFiKTtcbiAgICB9XG5cbiAgICB0aGlzLnBob3RvR2FsbGVyeSA9IG5ldyBQaG90b0dhbGxlcnkoKTtcbiAgICB0aGlzLmxhc3RTZWxlY3RlZCA9IDA7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGtvLm9ic2VydmFibGUoKTtcbiAgICBzZWxmLmFjdGl2ZVRhYi5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKXtzZWxmLmNhcmQuYWN0aXZlVGFiID0gdmFsO30pO1xuICAgIHNlbGYuY2FyZC50aWxlcy5zdWJzY3JpYmUoZnVuY3Rpb24odmFsKXtcbiAgICAgICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNlbGYuYWN0aXZlVGFiKG51bGwpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgZ2V0ZmlsZUxpc3ROb2RlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGZpbGVMaXN0Tm9kZUlkO1xuICAgICAgICB2YXIgZmlsZUxpc3ROb2RlcyA9IHBhcmFtcy5jYXJkLm1vZGVsLm5vZGVzKCkuZmlsdGVyKFxuICAgICAgICAgICAgZnVuY3Rpb24odmFsKXtcbiAgICAgICAgICAgICAgICBpZiAodmFsLmRhdGF0eXBlKCkgPT09ICdmaWxlLWxpc3QnICYmIHNlbGYuY2FyZC5ub2RlZ3JvdXBpZCA9PSB2YWwubm9kZUdyb3VwSWQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoZmlsZUxpc3ROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZpbGVMaXN0Tm9kZUlkID0gZmlsZUxpc3ROb2Rlc1swXS5ub2RlaWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGVMaXN0Tm9kZUlkO1xuICAgIH07XG5cbiAgICB0aGlzLmZpbGVMaXN0Tm9kZUlkID0gZ2V0ZmlsZUxpc3ROb2RlKCk7XG5cbiAgICB0aGlzLm1heEZpbGVzaXplID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIG1mcyA9IFwiTWlzc2luZyBtYXhGaWxlc2l6ZVwiO1xuICAgICAgICBzZWxmLmNhcmQud2lkZ2V0cygpLmZvckVhY2goZnVuY3Rpb24od2lkZ2V0KXtcbiAgICAgICAgICAgIGlmICh3aWRnZXQubm9kZV9pZCgpID09PSBzZWxmLmZpbGVMaXN0Tm9kZUlkKSB7XG4gICAgICAgICAgICAgICAgbWZzID0gd2lkZ2V0LmNvbmZpZy5tYXhGaWxlc2l6ZSgpIHx8IFwiLS1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtZnM7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFjY2VwdGVkRmlsZXMgPSBrby5jb21wdXRlZChmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gc2VsZi5jYXJkLndpZGdldHMoKS5maW5kKHdpZGdldD0+d2lkZ2V0Lm5vZGVfaWQoKSA9PT0gc2VsZi5maWxlTGlzdE5vZGVJZCk/LmNvbmZpZy5hY2NlcHRlZEZpbGVzKCkgfHwgYXJjaGVzLnRyYW5zbGF0aW9ucy5hbGxGb3JtYXRzQWNjZXB0ZWQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNsZWFuVXJsID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIGNvbnN0IGh0dHBSZWdleCA9IC9eaHR0cHM/OlxcL1xcLy87XG4gICAgICAgIHJldHVybiAhdXJsIHx8IGh0dHBSZWdleC50ZXN0KHVybCkgfHwgdXJsLnN0YXJ0c1dpdGgoYXJjaGVzLnVybHMudXJsX3N1YnBhdGgpID8gdXJsIDpcbiAgICAgICAgICAgIChhcmNoZXMudXJscy51cmxfc3VicGF0aCArIHVybCkucmVwbGFjZSgnLy8nLCAnLycpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFVybCA9IGZ1bmN0aW9uKHRpbGUpe1xuICAgICAgICB2YXIgdXJsID0gJyc7XG4gICAgICAgIHZhciBuYW1lID0gJyc7XG4gICAgICAgIHZhciB2YWwgPSBrby51bndyYXAodGlsZS5kYXRhW3RoaXMuZmlsZUxpc3ROb2RlSWRdKTtcbiAgICAgICAgaWYgKHZhbCAmJiB2YWwubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1cmwgPSBzZWxmLmNsZWFuVXJsKGtvLnVud3JhcCh2YWxbMF0udXJsKSkgfHwga28udW53cmFwKHZhbFswXS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICBuYW1lID0ga28udW53cmFwKHZhbFswXS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3VybDogdXJsLCBuYW1lOiBuYW1lfTtcbiAgICB9O1xuXG4gICAgdGhpcy51bmlxdWVJZCA9IHV1aWQuZ2VuZXJhdGUoKTtcbiAgICB0aGlzLnVuaXF1ZWlkQ2xhc3MgPSBrby5jb21wdXRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwidW5pcXVlX2lkX1wiICsgc2VsZi51bmlxdWVJZDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2hvd1RodW1ibmFpbHMgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcblxuICAgIHRoaXMuc2VsZWN0RGVmYXVsdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSW5kZXggPSBzZWxmLmNhcmQudGlsZXMuaW5kZXhPZihzZWxmLnNlbGVjdGVkKCkpO1xuICAgICAgICAgICAgaWYoc2VsZi5jYXJkLnRpbGVzKCkubGVuZ3RoID4gMCAmJiBzZWxlY3RlZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jYXJkLnRpbGVzKClbc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICBzZWxmLnBob3RvR2FsbGVyeS5zZWxlY3RJdGVtKHNlbGYuY2FyZC50aWxlcygpW3NlbGVjdGVkSW5kZXhdKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHRoaXMuZGVmYXVsdFNlbGVjdG9yID0gdGhpcy5zZWxlY3REZWZhdWx0KCk7XG5cbiAgICB0aGlzLmRpc3BsYXlDb250ZW50ID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBwaG90bztcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy5jYXJkLnRpbGVzKCkuZmluZChcbiAgICAgICAgICAgIGZ1bmN0aW9uKHRpbGUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aWxlLnNlbGVjdGVkKCkgPT09IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkKHNlbGVjdGVkKTtcbiAgICAgICAgICAgIHBob3RvID0gdGhpcy5nZXRVcmwoc2VsZWN0ZWQpLnVybDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGhvdG87XG4gICAgfSwgdGhpcyk7XG5cbiAgICBpZiAodGhpcy5kaXNwbGF5Q29udGVudCgpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmNhcmQudGlsZXMoKS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICB0aGlzLmZvcm0gJiZcbiAgICAgICAgICAgIChrby51bndyYXAodGhpcy5mb3JtLnNlbGVjdGlvbikgJiYgdGhpcy5mb3JtLnNlbGVjdGlvbigpICE9PSAncm9vdCcpIHx8XG4gICAgICAgICAgICAodGhpcy5mb3JtICYmICFrby51bndyYXAodGhpcy5mb3JtLnNlbGVjdGlvbikpKSB7XG4gICAgICAgICAgICB0aGlzLnBob3RvR2FsbGVyeS5zZWxlY3RJdGVtKHRoaXMuY2FyZC50aWxlcygpW3NlbGVjdGVkSW5kZXhdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlVGlsZSA9IGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgIC8vVE9ETzogVXBvbiBkZWxldGlvbiBzZWxlY3QgdGhlIHRpbGUgdG8gdGhlIGxlZnQgb2YgdGhlIGRlbGV0ZWQgdGlsZVxuICAgICAgICAvL0lmIHRoZSBkZWxldGVkIHRpbGUgaXMgdGhlIGZpcnN0IHRpbGUsIHRoZW4gc2VsZWN0IHRoZSB0aWxlIHRvIHRoZSByaWdodFxuICAgICAgICAvLyB2YXIgdGlsZUNvdW50ID0gdGhpcy5wYXJlbnQudGlsZXMoKS5sZW5ndGg7XG4gICAgICAgIC8vIHZhciBpbmRleCA9IHRoaXMucGFyZW50LnRpbGVzLmluZGV4T2YodmFsKTtcbiAgICAgICAgdmFsLmRlbGV0ZVRpbGUoKTtcbiAgICAgICAgc2V0VGltZW91dChzZWxmLmRlZmF1bHRTZWxlY3RvciwgMTUwKTtcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZm9ybSAmJiBrby51bndyYXAodGhpcy5mb3JtLnJlc291cmNlSWQpKSB7XG4gICAgICAgIHRoaXMuY2FyZC5yZXNvdXJjZWluc3RhbmNlaWQgPSBrby51bndyYXAodGhpcy5mb3JtLnJlc291cmNlSWQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jYXJkLnJlc291cmNlaW5zdGFuY2VpZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuY2FyZC50aWxlcygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmNhcmQucmVzb3VyY2VpbnN0YW5jZWlkID0gdXVpZC5nZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNsZWVwKG1pbGxpc2Vjb25kcykge1xuICAgICAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxZTc7IGkrKykge1xuICAgICAgICAgICAgaWYgKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0KSA+IG1pbGxpc2Vjb25kcyl7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFkZFRpbGUgPSBmdW5jdGlvbihmaWxlKXtcbiAgICAgICAgdmFyIGFjY2VwdGVkRmlsZUZvcm1hdHM7XG4gICAgICAgIHZhciBsb2FkRmlsZTtcbiAgICAgICAgYWNjZXB0ZWRGaWxlRm9ybWF0cyA9ICgoa28udW53cmFwKHNlbGYuYWNjZXB0ZWRGaWxlcykpLnNwbGl0KCcsJykubWFwKGl0ZW09Pml0ZW0udHJpbSgpKSkubWFwKGZvcm1hdCA9PiBmb3JtYXQucmVwbGFjZSgnLicsICcnKSk7XG4gICAgICAgIGlmKGtvLnVud3JhcChzZWxmLmFjY2VwdGVkRmlsZXMpICE9IGFyY2hlcy50cmFuc2xhdGlvbnMuYWxsRm9ybWF0c0FjY2VwdGVkICYmIGFjY2VwdGVkRmlsZUZvcm1hdHMgIT09IHVuZGVmaW5lZCAmJiBhY2NlcHRlZEZpbGVGb3JtYXRzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgdmFyIGZpbGVUeXBlID0gZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmKGFjY2VwdGVkRmlsZUZvcm1hdHMuaW5jbHVkZXMoZmlsZVR5cGUpKXtcbiAgICAgICAgICAgICAgICBsb2FkRmlsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGxvYWRGaWxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxvYWRGaWxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2FkRmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIG5ld3RpbGU7XG4gICAgICAgICAgICBuZXd0aWxlID0gc2VsZi5jYXJkLmdldE5ld1RpbGUoKTtcbiAgICAgICAgICAgIHZhciB0aWxldmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogZmlsZS5uYW1lLFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhlaWdodDogZmlsZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgbGFzdE1vZGlmaWVkOiBmaWxlLmxhc3RNb2RpZmllZCxcbiAgICAgICAgICAgICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBmaWxlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGZpbGUud2lkdGgsXG4gICAgICAgICAgICAgICAgdXJsOiBudWxsLFxuICAgICAgICAgICAgICAgIGZpbGVfaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgY29udGVudDogd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSksXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZpbGUuZXJyb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBuZXd0aWxlLmRhdGFbc2VsZi5maWxlTGlzdE5vZGVJZF0oW3RpbGV2YWx1ZV0pO1xuICAgICAgICAgICAgbmV3dGlsZS5mb3JtRGF0YS5hcHBlbmQoJ2ZpbGUtbGlzdF8nICsgc2VsZi5maWxlTGlzdE5vZGVJZCwgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICAgICAgICAgIG5ld3RpbGUucmVzb3VyY2VpbnN0YW5jZV9pZCA9IHNlbGYuY2FyZC5yZXNvdXJjZWluc3RhbmNlaWQ7XG4gICAgICAgICAgICBpZiAoc2VsZi5jYXJkLnRpbGVzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2xlZXAoNTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3dGlsZS5zYXZlKCk7XG4gICAgICAgICAgICBzZWxmLmNhcmQubmV3VGlsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcGFyYW1zLnBhZ2VWbS5hbGVydChuZXcgQWxlcnRWaWV3TW9kZWwoXG4gICAgICAgICAgICAgICAgJ2VwLWFsZXJ0LXJlZCcsXG4gICAgICAgICAgICAgICAgYXJjaGVzLnRyYW5zbGF0aW9ucy5pbmNvcnJlY3RGaWxlRm9ybWF0LFxuICAgICAgICAgICAgICAgIGFyY2hlcy50cmFuc2xhdGlvbnMuZmlsZUZvcm1hdE5vdEFjY2VwdGVkKGtvLnVud3JhcChzZWxmLmFjY2VwdGVkRmlsZXMpKSxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCl7fVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kcm9wem9uZU9wdGlvbnMgPSB7XG4gICAgICAgIHVybDogXCJhcmNoZXMudXJscy5yb290XCIsXG4gICAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXG4gICAgICAgIGF1dG9Qcm9jZXNzUXVldWU6IGZhbHNlLFxuICAgICAgICB1cGxvYWRNdWx0aXBsZTogdHJ1ZSxcbiAgICAgICAgYXV0b1F1ZXVlOiBmYWxzZSxcbiAgICAgICAgY2xpY2thYmxlOiBcIi5maWxlaW5wdXQtYnV0dG9uLlwiICsgdGhpcy51bmlxdWVpZENsYXNzKCksXG4gICAgICAgIHByZXZpZXdzQ29udGFpbmVyOiAnI2hpZGRlbi1kei1wcmV2aWV3cycsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5kcm9wem9uZSA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLm9uKFwiYWRkZWRmaWxlXCIsIHNlbGYuYWRkVGlsZSwgc2VsZik7XG4gICAgICAgICAgICB0aGlzLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZmlsZSwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBmaWxlLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwaG90by1nYWxsZXJ5LWNhcmQnLCB7XG4gICAgdmlld01vZGVsOiB2aWV3TW9kZWwsXG4gICAgdGVtcGxhdGU6IHBob3RvR2FsbGVyeUNhcmRUZW1wbGF0ZSxcbn0pO1xuIl0sIm5hbWVzIjpbImtvIiwia29NYXBwaW5nIiwiXyIsImFyY2hlcyIsIkRyb3B6b25lIiwidXVpZCIsIkNhcmRDb21wb25lbnRWaWV3TW9kZWwiLCJXb3JrYmVuY2hDb21wb25lbnRWaWV3TW9kZWwiLCJQaG90b0dhbGxlcnkiLCJwaG90b0dhbGxlcnlDYXJkVGVtcGxhdGUiLCJBbGVydFZpZXdNb2RlbCIsInZpZXdNb2RlbCIsInBhcmFtcyIsImNvbmZpZ0tleXMiLCJzZWxmIiwiYXBwbHkiLCJjYXJkIiwiYWN0aXZlVGFiIiwicGhvdG9HYWxsZXJ5IiwibGFzdFNlbGVjdGVkIiwic2VsZWN0ZWQiLCJvYnNlcnZhYmxlIiwic3Vic2NyaWJlIiwidmFsIiwidGlsZXMiLCJsZW5ndGgiLCJnZXRmaWxlTGlzdE5vZGUiLCJmaWxlTGlzdE5vZGVJZCIsImZpbGVMaXN0Tm9kZXMiLCJtb2RlbCIsIm5vZGVzIiwiZmlsdGVyIiwiZGF0YXR5cGUiLCJub2RlZ3JvdXBpZCIsIm5vZGVHcm91cElkIiwibm9kZWlkIiwibWF4RmlsZXNpemUiLCJjb21wdXRlZCIsIm1mcyIsIndpZGdldHMiLCJmb3JFYWNoIiwid2lkZ2V0Iiwibm9kZV9pZCIsImNvbmZpZyIsImFjY2VwdGVkRmlsZXMiLCJfc2VsZiRjYXJkJHdpZGdldHMkZmkiLCJmaW5kIiwidHJhbnNsYXRpb25zIiwiYWxsRm9ybWF0c0FjY2VwdGVkIiwiY2xlYW5VcmwiLCJ1cmwiLCJodHRwUmVnZXgiLCJ0ZXN0Iiwic3RhcnRzV2l0aCIsInVybHMiLCJ1cmxfc3VicGF0aCIsInJlcGxhY2UiLCJnZXRVcmwiLCJ0aWxlIiwibmFtZSIsInVud3JhcCIsImRhdGEiLCJjb250ZW50IiwidW5pcXVlSWQiLCJnZW5lcmF0ZSIsInVuaXF1ZWlkQ2xhc3MiLCJzaG93VGh1bWJuYWlscyIsInNlbGVjdERlZmF1bHQiLCJzZWxlY3RlZEluZGV4IiwiaW5kZXhPZiIsInNlbGVjdEl0ZW0iLCJkZWZhdWx0U2VsZWN0b3IiLCJkaXNwbGF5Q29udGVudCIsInB1cmVDb21wdXRlZCIsInBob3RvIiwidW5kZWZpbmVkIiwiZm9ybSIsInNlbGVjdGlvbiIsInJlbW92ZVRpbGUiLCJkZWxldGVUaWxlIiwic2V0VGltZW91dCIsInJlc291cmNlSWQiLCJyZXNvdXJjZWluc3RhbmNlaWQiLCJzbGVlcCIsIm1pbGxpc2Vjb25kcyIsInN0YXJ0IiwiRGF0ZSIsImdldFRpbWUiLCJpIiwiYWRkVGlsZSIsImZpbGUiLCJhY2NlcHRlZEZpbGVGb3JtYXRzIiwibG9hZEZpbGUiLCJzcGxpdCIsIm1hcCIsIml0ZW0iLCJ0cmltIiwiZm9ybWF0IiwiZmlsZVR5cGUiLCJwb3AiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwibmV3dGlsZSIsImdldE5ld1RpbGUiLCJ0aWxldmFsdWUiLCJhY2NlcHRlZCIsImhlaWdodCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJzdGF0dXMiLCJ0eXBlIiwid2lkdGgiLCJmaWxlX2lkIiwiaW5kZXgiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJlcnJvciIsImZvcm1EYXRhIiwiYXBwZW5kIiwicmVzb3VyY2VpbnN0YW5jZV9pZCIsInNhdmUiLCJuZXdUaWxlIiwicGFnZVZtIiwiYWxlcnQiLCJpbmNvcnJlY3RGaWxlRm9ybWF0IiwiZmlsZUZvcm1hdE5vdEFjY2VwdGVkIiwiZHJvcHpvbmVPcHRpb25zIiwiZGljdERlZmF1bHRNZXNzYWdlIiwiYXV0b1Byb2Nlc3NRdWV1ZSIsInVwbG9hZE11bHRpcGxlIiwiYXV0b1F1ZXVlIiwiY2xpY2thYmxlIiwicHJldmlld3NDb250YWluZXIiLCJpbml0IiwiZHJvcHpvbmUiLCJvbiIsImNvbXBvbmVudHMiLCJyZWdpc3RlciIsInRlbXBsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==