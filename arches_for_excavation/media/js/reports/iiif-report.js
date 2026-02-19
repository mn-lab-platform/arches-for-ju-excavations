import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import ReportViewModel from 'viewmodels/report';

import iiifReportTemplate from 'templates/views/report-templates/iiif-report.htm';

// IMPORTANT: samo importowanie rejestruje komponent iiif-map-viewer
import 'views/components/iiif/iiif-map-viewer';

const DIGITAL_RES_URL_NODE_ID = 'e0216dc7-89ba-4a27-9126-bf7e06d859a8';
const LOG = '[iiif-report]';

export default ko.components.register('iiif-report', {
  viewModel: function(params) {
    const self = this;

    params.configKeys = params.configKeys || [];
    ReportViewModel.apply(self, [params]);

    function baseRoot() {
      const root = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
      return root.replace(/\/+$/, '') + '/';
    }

    function safeUnwrap(x) {
      try { return ko.unwrap(x); } catch (e) { return x; }
    }

    function getOverrideResourceIdFromActiveTab() {
      const tab = params.activeTab ? safeUnwrap(params.activeTab) : null;
      if (!tab) return null;
      const cp = tab.component_params ? safeUnwrap(tab.component_params) : null;

      const rid =
        (cp && cp.overrideResourceId) ? safeUnwrap(cp.overrideResourceId) :
        (tab.overrideResourceId ? safeUnwrap(tab.overrideResourceId) : null);

      return rid || null;
    }

    function tilesArray(resp) {
      if (!resp) return [];
      if (Array.isArray(resp)) return resp;
      if (Array.isArray(resp.tiles)) return resp.tiles;
      return [];
    }

    function getNodeRawFromTiles(nodeId, tilesResp) {
      const tiles = tilesArray(tilesResp);
      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if (!tile || !tile.data) continue;
        if (tile.data[nodeId] !== undefined) return tile.data[nodeId];
      }
      return null;
    }

    function normalizeLangString(raw) {
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        const langs = Object.keys(raw);
        if (!langs.length) return null;
        const langObj = raw[langs[0]];
        const v = langObj && langObj.value ? safeUnwrap(langObj.value) : null;
        return v || null;
      }
      if (typeof raw === 'string') return raw;
      return null;
    }

    function looksLikeManifestUrl(url) {
      if (!url) return false;
      const s = String(url);
      return (s.indexOf('/manifest/') > -1 || s.indexOf('/api/iiif/geotiff-manifest/') > -1);
    }

    function normalizeManifestUrl(url) {
      if (!url || typeof url !== 'string') return null;
      const s = url.trim();
      if (!s) return null;

      if (/^https?:\/\//i.test(s)) return s;

      const root = baseRoot().replace(/\/$/, '');
      return s.charAt(0) === '/' ? root + s : root + '/' + s;
    }

    function geotiffManifestUrlForResource(resourceId) {
      return baseRoot() + 'api/iiif/geotiff-manifest/' + encodeURIComponent(resourceId);
    }

    function defaultManifestUrlForResource(resourceId) {
      return baseRoot() + 'manifest/' + encodeURIComponent(resourceId);
    }

    self.status = ko.observable('Loading…');
    self.error = ko.observable('');
    self.manifestUrl = ko.observable(null);
    self.manifest = ko.observable(null);

    function loadManifestFromUrl(url) {
      self.status('Loading manifest…');
      self.error('');
      self.manifestUrl(url);

      return $.getJSON(url)
        .then(m => {
          self.manifest(m);
          self.status('');
          return m;
        })
        .catch(err => {
          self.manifest(null);
          self.status('');
          self.error('Manifest load failed: ' + (err?.message || String(err)));
          throw err;
        });
    }

    function manifestUrlFromTiles(resourceId) {
      const tilesUrl = baseRoot() + 'resource/' + encodeURIComponent(resourceId) + '/tiles';
      return $.ajax({ url: tilesUrl, method: 'GET', xhrFields: { withCredentials: true } })
        .then(resp => {
          const raw = getNodeRawFromTiles(DIGITAL_RES_URL_NODE_ID, resp);
          const val = normalizeLangString(raw) || raw;
          const url = (typeof val === 'string') ? val : null;
          if (url && looksLikeManifestUrl(url)) return url;
          return null;
        });
    }

    function bootstrap() {
      const ridFromTab = getOverrideResourceIdFromActiveTab();
      const ridFallback = self.report && self.report.get ? self.report.get('resourceid') : null;
      const rid = ridFromTab || ridFallback;

      if (!rid) {
        self.status('');
        self.error('No resource id available for IIIF report.');
        return;
      }

      manifestUrlFromTiles(rid)
        .then(tileManifestUrl => {
          const tileUrl = normalizeManifestUrl(tileManifestUrl);

          if (tileUrl && looksLikeManifestUrl(tileUrl)) {
            return loadManifestFromUrl(tileUrl);
          }

          return loadManifestFromUrl(geotiffManifestUrlForResource(rid))
            .catch(() => loadManifestFromUrl(defaultManifestUrlForResource(rid)));
        })
        .catch(() => {
          return loadManifestFromUrl(geotiffManifestUrlForResource(rid))
            .catch(() => loadManifestFromUrl(defaultManifestUrlForResource(rid)));
        });
    }

    bootstrap();

    // debug (opcjonalnie)
    // console.log(LOG, 'iiif-report registered:', ko.components.isRegistered('iiif-report'));
  },

  template: iiifReportTemplate
});