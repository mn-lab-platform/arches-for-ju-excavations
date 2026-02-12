define(['../services/tile-service'], function(tileServiceModule) {
'use strict';

    var tileService = (tileServiceModule && tileServiceModule.default)
    ? tileServiceModule.default
    : tileServiceModule;

    function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    }

    function makeLangValue(value, arches) {
    var lang = (arches && arches.activeLanguage) ? arches.activeLanguage : 'en';
    var obj = {};
    obj[lang] = { value: value, direction: 'ltr' };
    return obj;
    }

    function b64UrlEncode(str) {
    var b64 = btoa(unescape(encodeURIComponent(String(str))));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    }

    function joinUrl(base, path) {
    if (!base) base = '';
    if (!path) path = '';
    if (base.endsWith('/') && path.startsWith('/')) return base + path.slice(1);
    if (!base.endsWith('/') && !path.startsWith('/')) return base + '/' + path;
    return base + path;
    }

    function stripExt(name) {
    return String(name || '').replace(/\.[^.]+$/, '');
    }

    function safeGet(obj, pathArr) {
    var cur = obj;
    for (var i = 0; i < (pathArr || []).length; i++) {
        if (!cur) return null;
        cur = cur[pathArr[i]];
    }
    return cur == null ? null : cur;
    }

    // Celery result helpers:
    // result.derived.hillshade.download_url_cog.titiler.iiif_service_url
    // result.derived.color_relief.download_url_cog.titiler.iiif_service_url
    function getDerivedIiifServiceUrl(result, key) {
    return (
        safeGet(result, ['derived', key, 'download_url_cog', 'titiler', 'iiif_service_url']) ||
        safeGet(result, ['derived', key, 'titiler', 'iiif_service_url']) ||
        null
    );
    }

    function humanSize(bytes) {
    var b = Number(bytes || 0);
    if (!b) return '0 B';
    var units = ['B', 'KB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(b) / Math.log(1024));
    i = Math.min(i, units.length - 1);
    return (b / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1) + ' ' + units[i];
    }

    function normalizeFiles(files) {
    if (!files) return [];
    if (Array.isArray(files)) return files;
    if (typeof files.length === 'number') return Array.prototype.slice.call(files);
    return [files];
    }

    function createOrUpdateTile(nodeId, resourceId, tileid, value) {
    var data = {};
    data[nodeId] = value;

    var payload = {
        tileid: tileid || '',
        nodegroup_id: nodeId,
        parenttile_id: null,
        resourceinstance_id: resourceId,
        sortorder: 0,
        tiles: {},
        data: data
    };

    if (!tileService || typeof tileService.createOne !== 'function') {
        console.error('[IIIF-UTILS] tileService import invalid:', tileServiceModule);
        throw new Error('tileService.createOne is not available');
    }

    return tileService.createOne(payload);
    }

    function stripTrailingSlash(s) {
    return String(s || '').replace(/\/$/, '');
    }

    function buildIiifThumbUrl(serviceUrl, maxSize) {
    var base = stripTrailingSlash(serviceUrl);
    var size = maxSize || 420;
    return base + '/full/!' + size + ',' + size + '/0/default.jpg';
    }
    function toAbsoluteUrl(u) {
        if (!u) return null;
        try {
        return new URL(u, window.location.origin).href;
        } catch (e) {
        return null;
        }
    }
        return {
        uuidv4: uuidv4,
        makeLangValue: makeLangValue,
        b64UrlEncode: b64UrlEncode,
        joinUrl: joinUrl,
        stripExt: stripExt,
        safeGet: safeGet,
        getDerivedIiifServiceUrl: getDerivedIiifServiceUrl,
        toAbsoluteUrl: toAbsoluteUrl,
        humanSize: humanSize,
        normalizeFiles: normalizeFiles,
        createOrUpdateTile: createOrUpdateTile,
        stripTrailingSlash: stripTrailingSlash,
        buildIiifThumbUrl: buildIiifThumbUrl
        };
});