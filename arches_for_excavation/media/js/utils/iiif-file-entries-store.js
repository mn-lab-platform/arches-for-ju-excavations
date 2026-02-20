define(['knockout', 'utils/iiif-addition-utils'], function(ko, utils) {
  'use strict';

  function _makeFileListItem(entry, arches) {
    var now = Date.now();
    var e = entry || {};

    return {
      accepted: true,
      altText: utils.makeLangValue(e.altText || '', arches),
      title: utils.makeLangValue(e.title || '', arches),
      attribution: utils.makeLangValue(e.attribution || '', arches),
      description: utils.makeLangValue(e.description || '', arches),
      content: null,
      file_id: e.file_id || null,
      height: e.height || null,
      width: e.width || null,
      index: typeof e.index === 'number' ? e.index : 0,
      lastModified: now,
      name: e.name || '',
      path: e.path || null,
      size: typeof e.size === 'number' ? e.size : (e.size || 0),
      status: e.status || 'uploaded',
      type: e.type || 'image/tiff',
      url: e.url || null
    };
  }

  function IiifFileEntriesStore(opts) {
    opts = opts || {};
    this.arches = opts.arches || null;

    this.entries = ko.observableArray([]);
    this.tileId = ko.observable(opts.tileId || null);
  }

  IiifFileEntriesStore.prototype.clear = function() {
    this.entries.removeAll();
  };

  IiifFileEntriesStore.prototype.upsert = function(list) {
    var self = this;
    (list || []).forEach(function(e) {
      if (!e || !e.file_id) return;
      var existing = self.entries().find(function(x) { return x.file_id === e.file_id; });
      if (existing) Object.assign(existing, e);
      else self.entries.push(Object.assign({}, e));
    });
  };

  IiifFileEntriesStore.prototype.toTileArray = function() {
    var self = this;
    return self.entries().map(function(e) {
      return _makeFileListItem(e, self.arches);
    });
  };

  IiifFileEntriesStore.prototype.saveToTile = function(nodeUsedFilesId, resourceId) {
    var self = this;
    var tileid = self.tileId();

    if (!nodeUsedFilesId) throw new Error('Missing nodeUsedFilesId');
    if (!resourceId) throw new Error('Missing resourceId');

    var arr = self.toTileArray();

    return utils.createOrUpdateTile(nodeUsedFilesId, resourceId, tileid, arr)
      .then(function(t) {
        if (t && t.tileid) self.tileId(t.tileid);
        return t;
      });
  };

  return IiifFileEntriesStore;
});