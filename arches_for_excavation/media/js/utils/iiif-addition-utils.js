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

    function serviceFromTile(url) {
        var idx = url.indexOf('/full/');
        return idx > -1 ? url.substring(0, idx) : url;
    }

    function ensureInfoJson(url) {
        if (!url) return url;
        url = url.trim();

        if (/\/full\/.+\/default\.(jpg|png)(?:$|\?)/i.test(url)) {
            url = serviceFromTile(url).replace(/\/$/, '') + '/info.json';
            return url;
        }

        if (!/\/info\.json(?:$|\?)/i.test(url) && !/\/manifest(?:$|\?)/i.test(url)) {
            return url.replace(/\/$/, '') + '/info.json';
        }

        return url;
    }

    function imagesFromCanvases(canvases) {
        var images = [];
        (canvases || []).forEach(function(canvas) {
            try {
                var img = canvas.images && canvas.images[0];
                var svc = img && img.resource && img.resource.service &&
                    (img.resource.service['@id'] || img.resource.service.id);
                if (svc) {
                    images.push({
                        label: canvas.label || 'Untitled',
                        serviceUrl: String(svc).replace(/\/$/, ''),
                        thumbnail: String(svc).replace(/\/$/, '') + '/full/200,/0/default.jpg'
                    });
                }
            } catch (e) {
                console.log('[WF][iiif-add] imagesFromCanvases error:', e);
            }
        });
        return images;
    }

    function imagesFromManifest(manifestData, iiifUtils) {
        try {
            var canvases = iiifUtils.getCanvases(manifestData);
            return imagesFromCanvases(canvases);
        } catch (e) {
            console.log('[WF][iiif-add] imagesFromManifest error:', e);
            return [];
        }
    }

    function detectInfoJson(data) {
        var ctx = data['@context'];
        var protocol = data['protocol'];
        return (
            (ctx && String(ctx).indexOf('iiif.io/api/image') !== -1) ||
            (protocol && String(protocol).indexOf('iiif.io/api/image') !== -1)
        );
    }

    function getInfoServiceId(infoJson) {
        return (infoJson['@id'] || infoJson['id'] || '').replace(/\/$/, '');
    }
    function stripTrailingSlash(s) {
        return String(s || '').replace(/\/$/, '');
    }

    function buildIiifThumbUrl(serviceUrl, maxSize) {

        var base = stripTrailingSlash(serviceUrl);
        var size = maxSize || 420;
        return base + '/full/!' + size + ',' + size + '/0/default.jpg';
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

    return {
        createOrUpdateTile,
        uuidv4,
        makeLangValue,
        b64UrlEncode,
        joinUrl,
        serviceFromTile,
        ensureInfoJson,
        imagesFromCanvases,
        imagesFromManifest,
        detectInfoJson,
        getInfoServiceId,
        stripTrailingSlash,
        buildIiifThumbUrl
    };
});