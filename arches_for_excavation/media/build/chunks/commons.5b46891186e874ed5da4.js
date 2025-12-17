"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[7471],{

/***/ 7471:
/*!*******************************************************************!*\
  !*** ./arches_slocal/media/js/reports/iiif-report.js + 1 modules ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ iiif_report)
});

// EXTERNAL MODULE: ./node_modules/knockout/build/output/knockout-latest.js
var knockout_latest = __webpack_require__(51786);
var knockout_latest_default = /*#__PURE__*/__webpack_require__.n(knockout_latest);
// EXTERNAL MODULE: ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/viewmodels/report.js
var report = __webpack_require__(95442);
;// ./arches_slocal/templates/views/report-templates/iiif-report.htm
const iiif_report_namespaceObject = "templates/views/report-templates/iiif-report.htm";
// EXTERNAL MODULE: ./node_modules/leaflet/dist/leaflet.js
var leaflet = __webpack_require__(53214);
var leaflet_default = /*#__PURE__*/__webpack_require__.n(leaflet);
// EXTERNAL MODULE: ./node_modules/leaflet-iiif/leaflet-iiif.js
var leaflet_iiif = __webpack_require__(15287);
;// ./arches_slocal/media/js/reports/iiif-report.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }






// udostępniamy Leaflet globalnie, żeby pluginy z okna (np. z <script>) mogły go rozszerzyć
if (typeof window !== 'undefined') {
  window.L = window.L || (leaflet_default());
}

// NODE_ID pola z URL-em IIIF
var DIGITAL_RES_URL_NODE_ID = 'aa8a8e71-4a98-4071-89c3-12fbe5ca9337';
/* harmony default export */ const iiif_report = (knockout_latest_default().components.register('iiif-report', {
  viewModel: function viewModel(params) {
    var self = this;
    console.log('[IIIF REPORT] ========== INIT ==========');
    console.log('[IIIF REPORT] params:', params);

    // wymagane przez ReportViewModel
    params.configKeys = params.configKeys || [];
    report["default"].apply(self, [params]);
    console.log('[IIIF REPORT] ReportViewModel applied');
    console.log('[IIIF REPORT] self.report:', self.report);

    // ID zasobu (do unikalnego id kontenera)
    var resourceId = self.report && self.report.get && self.report.get('resourceid');
    self.viewerId = 'iiif-viewer-' + (resourceId || 'unknown');

    // wszystkie tile’e wprost z raportu – JEDEN raz
    var tiles = self.report && self.report.get && self.report.get('tiles') || [];

    // tu trzymamy instancję mapy
    self.leafletMap = null;

    /**
     * Zwraca surową wartość node’a z tile’i (bez bawienia się w cards).
     * Szukamy pierwszego tile’a, który ma klucz DIGITAL_RES_URL_NODE_ID w data.
     */
    function getNodeRaw(nodeId) {
      for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        console.log("tiles", tiles);
        console.log("tiles", tile);
        if (!tile || !tile.data) continue;
        if (tile.data[nodeId] !== undefined) {
          return tile.data[nodeId];
        }
      }
      return null;
    }

    // computed zwracający czysty URL serwisu IIIF
    self.iiifUrl = knockout_latest_default().pureComputed(function () {
      var raw = getNodeRaw(DIGITAL_RES_URL_NODE_ID);
      if (!raw) {
        return null;
      }

      // przypadek lang-string:
      // { en: { direction: "ltr", value: "http://..." } }
      if (_typeof(raw) === 'object' && !Array.isArray(raw)) {
        var langs = Object.keys(raw);
        if (!langs.length) {
          return null;
        }
        var langObj = raw[langs[0]];
        if (langObj && langObj.value) {
          // w raportach value jest zwykle stringiem, ale owijamy na wszelki wypadek
          var url = knockout_latest_default().unwrap(langObj.value);
          console.log('[IIIF REPORT] iiifUrl from lang-string:', url);
          return url || null;
        }
      }

      // fallback – zwykły string
      if (typeof raw === 'string') {
        console.log('[IIIF REPORT] iiifUrl from plain string:', raw);
        return raw;
      }
      console.warn('[IIIF REPORT] Unsupported node value format for IIIF URL:', raw);
      return null;
    });
    function attachMeasureControl(map) {
      var Leaflet = window.L || (leaflet_default());
      function tryAttach() {
        var attempt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        if (Leaflet.control && typeof Leaflet.control.measure === 'function') {
          Leaflet.control.measure({
            primaryLengthUnit: 'pixels',
            secondaryLengthUnit: 'meters'
          }).addTo(map);
          console.log('[IIIF REPORT] Measurement control attached');
        } else if (attempt < 10) {
          console.log('[IIIF REPORT] Waiting for leaflet-measure, attempt', attempt);
          setTimeout(function () {
            return tryAttach(attempt + 1);
          }, 200);
        } else {
          console.warn('[IIIF REPORT] Measurement plugin still not loaded after retries');
        }
      }
      tryAttach();
    }

    // ====== inicjalizacja Leaflet viewer ======
    function initViewer(iiifServiceUrl) {
      if (!iiifServiceUrl) return;
      var containerId = self.viewerId;
      var container = document.getElementById(containerId);
      if (!container) {
        console.warn('[IIIF REPORT] Viewer container not found:', containerId);
        return;
      }

      // wyczyść starą mapę
      if (self.leafletMap) {
        self.leafletMap.remove();
        self.leafletMap = null;
      }
      if (typeof (leaflet_default()) === 'undefined') {
        console.error('[IIIF REPORT] Leaflet (L) is not defined. Load Leaflet first.');
        return;
      }
      var infoUrl = iiifServiceUrl.replace(/\/$/, '') + '/info.json';
      var map = leaflet_default().map(containerId, {
        center: [0, 0],
        zoom: 0,
        crs: (leaflet_default()).CRS.Simple,
        zoomControl: true
      });
      self.leafletMap = map;
      if ((leaflet_default()).tileLayer && typeof (leaflet_default()).tileLayer.iiif === 'function') {
        leaflet_default().tileLayer.iiif(infoUrl, {}).addTo(map);
      } else {
        console.error('[IIIF REPORT] leaflet-iiif not loaded. L.tileLayer.iiif is missing.');
      }
      attachMeasureControl(map);
    }

    // odpal viewer jak tylko iiifUrl się pojawi
    self.iiifUrl.subscribe(function (url) {
      console.log('[IIIF REPORT] iiifUrl changed -> initViewer', url);
      if (url) {
        setTimeout(function () {
          initViewer(url);
        }, 0);
      }
    });

    // jeśli URL już jest – zainicjalizuj od razu
    if (self.iiifUrl()) {
      setTimeout(function () {
        return initViewer(self.iiifUrl());
      }, 0);
    }
    console.log('[IIIF REPORT] ========== INIT COMPLETE ==========');
  },
  template: iiif_report_namespaceObject
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztFQUNENkQsUUFBUSxFQUFFdkUsMkJBQWtCQTtBQUNoQyxDQUFDLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9hcmNoZXNfc2xvY2FsL21lZGlhL2pzL3JlcG9ydHMvaWlpZi1yZXBvcnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcclxuaW1wb3J0IFJlcG9ydFZpZXdNb2RlbCBmcm9tICd2aWV3bW9kZWxzL3JlcG9ydCc7XHJcbmltcG9ydCBpaWlmUmVwb3J0VGVtcGxhdGUgZnJvbSAndGVtcGxhdGVzL3ZpZXdzL3JlcG9ydC10ZW1wbGF0ZXMvaWlpZi1yZXBvcnQuaHRtJztcclxuaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCAnbGVhZmxldC1paWlmJztcclxuXHJcbi8vIHVkb3N0xJlwbmlhbXkgTGVhZmxldCBnbG9iYWxuaWUsIMW8ZWJ5IHBsdWdpbnkgeiBva25hIChucC4geiA8c2NyaXB0PikgbW9nxYJ5IGdvIHJvenN6ZXJ6ecSHXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgd2luZG93LkwgPSB3aW5kb3cuTCB8fCBMO1xyXG59XHJcblxyXG4vLyBOT0RFX0lEIHBvbGEgeiBVUkwtZW0gSUlJRlxyXG5jb25zdCBESUdJVEFMX1JFU19VUkxfTk9ERV9JRCA9ICdhYThhOGU3MS00YTk4LTQwNzEtODljMy0xMmZiZTVjYTkzMzcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQga28uY29tcG9uZW50cy5yZWdpc3RlcignaWlpZi1yZXBvcnQnLCB7XHJcbiAgICB2aWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tJSUlGIFJFUE9SVF0gPT09PT09PT09PSBJTklUID09PT09PT09PT0nKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnW0lJSUYgUkVQT1JUXSBwYXJhbXM6JywgcGFyYW1zKTtcclxuXHJcbiAgICAgICAgLy8gd3ltYWdhbmUgcHJ6ZXogUmVwb3J0Vmlld01vZGVsXHJcbiAgICAgICAgcGFyYW1zLmNvbmZpZ0tleXMgPSBwYXJhbXMuY29uZmlnS2V5cyB8fCBbXTtcclxuICAgICAgICBSZXBvcnRWaWV3TW9kZWwuYXBwbHkoc2VsZiwgW3BhcmFtc10pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnW0lJSUYgUkVQT1JUXSBSZXBvcnRWaWV3TW9kZWwgYXBwbGllZCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbSUlJRiBSRVBPUlRdIHNlbGYucmVwb3J0OicsIHNlbGYucmVwb3J0KTtcclxuXHJcbiAgICAgICAgLy8gSUQgemFzb2J1IChkbyB1bmlrYWxuZWdvIGlkIGtvbnRlbmVyYSlcclxuICAgICAgICBjb25zdCByZXNvdXJjZUlkID0gc2VsZi5yZXBvcnQgJiYgc2VsZi5yZXBvcnQuZ2V0ICYmIHNlbGYucmVwb3J0LmdldCgncmVzb3VyY2VpZCcpO1xyXG4gICAgICAgIHNlbGYudmlld2VySWQgPSAnaWlpZi12aWV3ZXItJyArIChyZXNvdXJjZUlkIHx8ICd1bmtub3duJyk7XHJcblxyXG4gICAgICAgIC8vIHdzenlzdGtpZSB0aWxl4oCZZSB3cHJvc3QgeiByYXBvcnR1IOKAkyBKRURFTiByYXpcclxuICAgICAgICBjb25zdCB0aWxlcyA9IChzZWxmLnJlcG9ydCAmJiBzZWxmLnJlcG9ydC5nZXQgJiYgc2VsZi5yZXBvcnQuZ2V0KCd0aWxlcycpKSB8fCBbXTtcclxuXHJcbiAgICAgICAgLy8gdHUgdHJ6eW1hbXkgaW5zdGFuY2rEmSBtYXB5XHJcbiAgICAgICAgc2VsZi5sZWFmbGV0TWFwID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWndyYWNhIHN1cm93xIUgd2FydG/Fm8SHIG5vZGXigJlhIHogdGlsZeKAmWkgKGJleiBiYXdpZW5pYSBzacSZIHcgY2FyZHMpLlxyXG4gICAgICAgICAqIFN6dWthbXkgcGllcndzemVnbyB0aWxl4oCZYSwga3TDs3J5IG1hIGtsdWN6IERJR0lUQUxfUkVTX1VSTF9OT0RFX0lEIHcgZGF0YS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXROb2RlUmF3KG5vZGVJZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlID0gdGlsZXNbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRpbGVzXCIsdGlsZXMpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRpbGVzXCIsdGlsZSlcclxuICAgICAgICAgICAgICAgIGlmICghdGlsZSB8fCAhdGlsZS5kYXRhKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLmRhdGFbbm9kZUlkXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRpbGUuZGF0YVtub2RlSWRdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29tcHV0ZWQgendyYWNhasSFY3kgY3p5c3R5IFVSTCBzZXJ3aXN1IElJSUZcclxuICAgICAgICBzZWxmLmlpaWZVcmwgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCByYXcgPSBnZXROb2RlUmF3KERJR0lUQUxfUkVTX1VSTF9OT0RFX0lEKTtcclxuICAgICAgICAgICAgaWYgKCFyYXcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBwcnp5cGFkZWsgbGFuZy1zdHJpbmc6XHJcbiAgICAgICAgICAgIC8vIHsgZW46IHsgZGlyZWN0aW9uOiBcImx0clwiLCB2YWx1ZTogXCJodHRwOi8vLi4uXCIgfSB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmF3ID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShyYXcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYW5ncyA9IE9iamVjdC5rZXlzKHJhdyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxhbmdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFuZ09iaiA9IHJhd1tsYW5nc1swXV07XHJcbiAgICAgICAgICAgICAgICBpZiAobGFuZ09iaiAmJiBsYW5nT2JqLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdyByYXBvcnRhY2ggdmFsdWUgamVzdCB6d3lrbGUgc3RyaW5naWVtLCBhbGUgb3dpamFteSBuYSB3c3plbGtpIHd5cGFkZWtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBrby51bndyYXAobGFuZ09iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tJSUlGIFJFUE9SVF0gaWlpZlVybCBmcm9tIGxhbmctc3RyaW5nOicsIHVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVybCB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBmYWxsYmFjayDigJMgend5a8WCeSBzdHJpbmdcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiByYXcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW0lJSUYgUkVQT1JUXSBpaWlmVXJsIGZyb20gcGxhaW4gc3RyaW5nOicsIHJhdyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmF3O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1tJSUlGIFJFUE9SVF0gVW5zdXBwb3J0ZWQgbm9kZSB2YWx1ZSBmb3JtYXQgZm9yIElJSUYgVVJMOicsIHJhdyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIGF0dGFjaE1lYXN1cmVDb250cm9sKG1hcCkge1xyXG4gICAgICAgICAgICBjb25zdCBMZWFmbGV0ID0gd2luZG93LkwgfHwgTDtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRyeUF0dGFjaChhdHRlbXB0ID0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKExlYWZsZXQuY29udHJvbCAmJiB0eXBlb2YgTGVhZmxldC5jb250cm9sLm1lYXN1cmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBMZWFmbGV0LmNvbnRyb2wubWVhc3VyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlMZW5ndGhVbml0OiAncGl4ZWxzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5TGVuZ3RoVW5pdDogJ21ldGVycydcclxuICAgICAgICAgICAgICAgICAgICB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbSUlJRiBSRVBPUlRdIE1lYXN1cmVtZW50IGNvbnRyb2wgYXR0YWNoZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0ZW1wdCA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tJSUlGIFJFUE9SVF0gV2FpdGluZyBmb3IgbGVhZmxldC1tZWFzdXJlLCBhdHRlbXB0JywgYXR0ZW1wdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0cnlBdHRhY2goYXR0ZW1wdCArIDEpLCAyMDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1tJSUlGIFJFUE9SVF0gTWVhc3VyZW1lbnQgcGx1Z2luIHN0aWxsIG5vdCBsb2FkZWQgYWZ0ZXIgcmV0cmllcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnlBdHRhY2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vID09PT09PSBpbmljamFsaXphY2phIExlYWZsZXQgdmlld2VyID09PT09PVxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRWaWV3ZXIoaWlpZlNlcnZpY2VVcmwpIHtcclxuICAgICAgICAgICAgaWYgKCFpaWlmU2VydmljZVVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVySWQgPSBzZWxmLnZpZXdlcklkO1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJJZCk7XHJcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1tJSUlGIFJFUE9SVF0gVmlld2VyIGNvbnRhaW5lciBub3QgZm91bmQ6JywgY29udGFpbmVySWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB3eWN6ecWbxIcgc3RhcsSFIG1hcMSZXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmxlYWZsZXRNYXApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGVhZmxldE1hcC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYubGVhZmxldE1hcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tJSUlGIFJFUE9SVF0gTGVhZmxldCAoTCkgaXMgbm90IGRlZmluZWQuIExvYWQgTGVhZmxldCBmaXJzdC4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgaW5mb1VybCA9IGlpaWZTZXJ2aWNlVXJsLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnL2luZm8uanNvbic7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXAgPSBMLm1hcChjb250YWluZXJJZCwge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyOiBbMCwgMF0sXHJcbiAgICAgICAgICAgICAgICB6b29tOiAwLFxyXG4gICAgICAgICAgICAgICAgY3JzOiBMLkNSUy5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICB6b29tQ29udHJvbDogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5sZWFmbGV0TWFwID0gbWFwO1xyXG5cclxuICAgICAgICAgICAgaWYgKEwudGlsZUxheWVyICYmIHR5cGVvZiBMLnRpbGVMYXllci5paWlmID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBMLnRpbGVMYXllci5paWlmKGluZm9VcmwsIHt9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignW0lJSUYgUkVQT1JUXSBsZWFmbGV0LWlpaWYgbm90IGxvYWRlZC4gTC50aWxlTGF5ZXIuaWlpZiBpcyBtaXNzaW5nLicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhdHRhY2hNZWFzdXJlQ29udHJvbChtYXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb2RwYWwgdmlld2VyIGphayB0eWxrbyBpaWlmVXJsIHNpxJkgcG9qYXdpXHJcbiAgICAgICAgc2VsZi5paWlmVXJsLnN1YnNjcmliZShmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbSUlJRiBSRVBPUlRdIGlpaWZVcmwgY2hhbmdlZCAtPiBpbml0Vmlld2VyJywgdXJsKTtcclxuICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdFZpZXdlcih1cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gamXFm2xpIFVSTCBqdcW8IGplc3Qg4oCTIHphaW5pY2phbGl6dWogb2QgcmF6dVxyXG4gICAgICAgIGlmIChzZWxmLmlpaWZVcmwoKSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluaXRWaWV3ZXIoc2VsZi5paWlmVXJsKCkpLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbSUlJRiBSRVBPUlRdID09PT09PT09PT0gSU5JVCBDT01QTEVURSA9PT09PT09PT09Jyk7XHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6IGlpaWZSZXBvcnRUZW1wbGF0ZVxyXG59KTtcclxuIl0sIm5hbWVzIjpbImtvIiwiUmVwb3J0Vmlld01vZGVsIiwiaWlpZlJlcG9ydFRlbXBsYXRlIiwiTCIsIndpbmRvdyIsIkRJR0lUQUxfUkVTX1VSTF9OT0RFX0lEIiwiY29tcG9uZW50cyIsInJlZ2lzdGVyIiwidmlld01vZGVsIiwicGFyYW1zIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJjb25maWdLZXlzIiwiYXBwbHkiLCJyZXBvcnQiLCJyZXNvdXJjZUlkIiwiZ2V0Iiwidmlld2VySWQiLCJ0aWxlcyIsImxlYWZsZXRNYXAiLCJnZXROb2RlUmF3Iiwibm9kZUlkIiwiaSIsImxlbmd0aCIsInRpbGUiLCJkYXRhIiwidW5kZWZpbmVkIiwiaWlpZlVybCIsInB1cmVDb21wdXRlZCIsInJhdyIsIl90eXBlb2YiLCJBcnJheSIsImlzQXJyYXkiLCJsYW5ncyIsIk9iamVjdCIsImtleXMiLCJsYW5nT2JqIiwidmFsdWUiLCJ1cmwiLCJ1bndyYXAiLCJ3YXJuIiwiYXR0YWNoTWVhc3VyZUNvbnRyb2wiLCJtYXAiLCJMZWFmbGV0IiwidHJ5QXR0YWNoIiwiYXR0ZW1wdCIsImFyZ3VtZW50cyIsImNvbnRyb2wiLCJtZWFzdXJlIiwicHJpbWFyeUxlbmd0aFVuaXQiLCJzZWNvbmRhcnlMZW5ndGhVbml0IiwiYWRkVG8iLCJzZXRUaW1lb3V0IiwiaW5pdFZpZXdlciIsImlpaWZTZXJ2aWNlVXJsIiwiY29udGFpbmVySWQiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlIiwiZXJyb3IiLCJpbmZvVXJsIiwicmVwbGFjZSIsImNlbnRlciIsInpvb20iLCJjcnMiLCJDUlMiLCJTaW1wbGUiLCJ6b29tQ29udHJvbCIsInRpbGVMYXllciIsImlpaWYiLCJzdWJzY3JpYmUiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=