import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import ReportViewModel from 'viewmodels/report';
import iiifMapReportTemplate from 'templates/views/report-templates/iiif-report.htm';

// IMPORTANT: ensure component is registered
import 'views/components/iiif/iiif-map-viewer';

// Node ID pola z URL-em IIIF w tile
const DIGITAL_RES_URL_NODE_ID = 'e0216dc7-89ba-4a27-9126-bf7e06d859a8';

export default ko.components.register('iiif-report', {
  viewModel: function(params) {
    const self = this;

    // ---- base report vm ----
    params.configKeys = params.configKeys || [];
    ReportViewModel.apply(self, [params]);
    self.elevationEnabled = ko.observable(false);
    self.elevationStatus = ko.observable('');

    // ---- helpers ----
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

    function extractServiceUrlFromManifest(manifest) {
      const canvas = manifest?.sequences?.[0]?.canvases?.[0];
      const img = canvas?.images?.[0]?.resource;
      const svc = img?.service;
      const s = Array.isArray(svc) ? svc[0] : svc;
      return s?.['@id'] || s?.id || null;
    }

    function extractMetaUrlFromManifest(manifest) {
      const sa = manifest?.seeAlso;
      const arr = Array.isArray(sa) ? sa : (sa ? [sa] : []);
      const entry = arr.find(x => (x.format || '').includes('json')) || arr[0];
      return entry ? (entry['@id'] || entry.id || null) : null;
    }

    // ✅ NEW: Extract related manifest URLs
    function extractRelatedManifests(manifest) {
      const related = manifest?.related;
      if (!related) return [];
      const arr = Array.isArray(related) ? related : [related];
      return arr
        .filter(r => r['@type'] === 'sc:Manifest' && r['@id'])
        .map(r => r['@id']);
    }

    function getNodeRawFromTiles(nodeId, tiles) {
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
      return String(url).includes('/manifest/');
    }

    // ---- state exposed to template ----
    self.viewerId = ko.observable('iiif-report-unknown');

    // ✅ CHANGED: Array of service URLs for multi-layer display
    self.iiifServiceUrls = ko.observableArray([]);

    self.manifestUrl = ko.observable(null);
    self.globalid = ko.observable(null);
    self.metaUrl = ko.observable(null);
    self.existingAnnotations = ko.observableArray([]);

    // meta UI
    self.meta = ko.observable(null);
    self.metaError = ko.observable('');
    self.metaLoaded = ko.observable(false);

    // measure tool state
    self.measureEnabled = ko.observable(true);
    self.measureStatus = ko.observable('');

    // internal refs for measurement
    self._mapRef = null;
    self._geoMeta = null;
    self._measureGroup = null;
    self._measureControl = null;
    self._onMeasureCreated = null;
    
    // ✅ NEW: Store mapping from service URL to globalid
    self._serviceUrlToGlobalidMap = {};

    // ---- fetch geotiff meta ----
    function fetchGeotiffMeta(globalid, explicitMetaUrl) {
      self.metaLoaded(false);
      self.metaError('');

      let url = null;
      if (explicitMetaUrl) url = explicitMetaUrl;
      else if (globalid) url = baseRoot() + 'api/iiif/geotiff-meta/' + globalid;
      else return Promise.resolve(null);

      return fetch(url, { credentials: 'include' })
        .then(r => {
          if (!r.ok) throw new Error('geotiff-meta HTTP ' + r.status);
          return r.json();
        })
        .then(j => {
          if (j && j.ok && j.meta) return j.meta;
          throw new Error('Invalid geotiff-meta payload');
        })
        .catch(err => {
          self.metaError(String(err.message || err));
          return null;
        })
        .finally(() => {
          self.metaLoaded(true);
        });
    }

    // ---- measurement math ----
    function isMetersCRS(crs) {
      crs = (crs || '').toUpperCase();
      return (
        crs.includes('EPSG:2180') ||
        crs.includes('EPSG:3857') ||
        crs.includes('UTM') ||
        crs.includes('EPSG:326') ||
        crs.includes('EPSG:327')||
        (crs.includes('LOCAL_CS') && crs.includes('UNIT["METRE"')) ||
        (crs.includes('LOCAL_CS') && crs.includes('UNIT["M"'))        
      );
    }

    function metersPerDegreeAtLat(latDeg) {
      const latRad = latDeg * Math.PI / 180;
      return {
        mPerDegLat: 111320,
        mPerDegLon: 111320 * Math.cos(latRad),
      };
    }

    function pixelDeltaToNative(dxPx, dyPx, meta) {
      const t = meta && meta.transform;
      if (t && isFinite(t.a) && isFinite(t.b) && isFinite(t.d) && isFinite(t.e)) {
        const dX = (Number(t.a) * dxPx) + (Number(t.b) * dyPx);
        const dY = (Number(t.d) * dxPx) + (Number(t.e) * dyPx);
        return { dX, dY };
      }

      if (meta && meta.res && meta.res.length >= 2) {
        const rx = Number(meta.res[0]);
        const ry = Number(meta.res[1]);
        if (isFinite(rx) && isFinite(ry)) {
          return { dX: dxPx * rx, dY: dyPx * ry };
        }
      }
      return null;
    }

    function segmentLengthMeters(p1px, p2px, meta) {
      const dx = p2px.x - p1px.x;
      const dy = p2px.y - p1px.y;
      const dn = pixelDeltaToNative(dx, dy, meta);
      if (!dn) return null;

      const crs = meta && meta.crs;

      if (isMetersCRS(crs)) {
        return Math.sqrt(dn.dX * dn.dX + dn.dY * dn.dY);
      }
      if ((crs || '').includes('LOCAL_CS')) {
        console.log('[MEASUREMENT] LOCAL_CS detected, assuming meter units');
        return Math.sqrt(dn.dX * dn.dX + dn.dY * dn.dY);
      }

      // EPSG:4326 deg -> meters approx
      if ((crs || '').toUpperCase().includes('EPSG:4326') && meta.bounds_wgs84) {
        const lat0 = (Number(meta.bounds_wgs84.top) + Number(meta.bounds_wgs84.bottom)) / 2;
        const { mPerDegLat, mPerDegLon } = metersPerDegreeAtLat(lat0);
        const mx = dn.dX * mPerDegLon;
        const my = dn.dY * mPerDegLat;
        return Math.sqrt(mx * mx + my * my);
      }

      return null;
    }

    function flattenLatLngs(latlngs) {
      const out = [];
      (function rec(a) {
        if (!a) return;
        if (Array.isArray(a)) a.forEach(rec);
        else if (a.lat !== undefined && a.lng !== undefined) out.push(a);
      })(latlngs);
      return out;
    }

    function polylineLengthMeters(map, latlngs, meta) {
      const pts = flattenLatLngs(latlngs);
      if (pts.length < 2) return null;
      const z = map.getMaxZoom();

      let total = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = map.project(pts[i], z);
        const p2 = map.project(pts[i + 1], z);
        const seg = segmentLengthMeters(p1, p2, meta);
        if (seg == null) return null;
        total += seg;
      }
      return total;
    }

    function polygonAreaMeters2(map, latlngs, meta) {
      const pts = flattenLatLngs(latlngs);
      if (pts.length < 3) return null;

      const crs = meta && meta.crs;
      if (!isMetersCRS(crs) && !(crs || '').includes('LOCAL_CS')) {
        console.warn('[MEASUREMENT] Cannot calculate area - CRS not in meters:', crs);
        return null;
      }

      const z = map.getMaxZoom();
      const px = pts.map(ll => map.project(ll, z));

      const t = meta && meta.transform;
      let XY = null;

      if (t && isFinite(t.a) && isFinite(t.b) && isFinite(t.d) && isFinite(t.e)) {
        const a = Number(t.a), b = Number(t.b), d = Number(t.d), e = Number(t.e);
        XY = px.map(p => ({ X: a * p.x + b * p.y, Y: d * p.x + e * p.y }));
      } else if (meta && meta.res && meta.res.length >= 2) {
        const rx = Number(meta.res[0]), ry = Number(meta.res[1]);
        if (isFinite(rx) && isFinite(ry)) {
          XY = px.map(p => ({ X: p.x * rx, Y: p.y * ry }));
        }
      }

      if (!XY) return null;

      let area = 0;
      for (let i = 0; i < XY.length; i++) {
        const j = (i + 1) % XY.length;
        area += XY[i].X * XY[j].Y - XY[j].X * XY[i].Y;
      }
      return Math.abs(area) / 2;
    }

    function fmtMeters(m) {
      if (m == null) return '—';
      if (m >= 1000) return (m / 1000).toFixed(3) + ' km';
      return m.toFixed(2) + ' m';
    }

    function fmtArea(m2) {
      if (m2 == null) return '—';
      if (m2 >= 10000) return (m2 / 10000).toFixed(3) + ' ha';
      return m2.toFixed(2) + ' m²';
    }

    function detachCustomMeasure(map) {
      const L = window.L;
      if (!map || !L) return;

      if (self._measureControl) {
        try { map.removeControl(self._measureControl); } catch (e) {}
        self._measureControl = null;
      }
      if (self._measureGroup) {
        try { map.removeLayer(self._measureGroup); } catch (e) {}
        self._measureGroup = null;
      }
      if (self._onMeasureCreated) {
        try { map.off(L.Draw.Event.CREATED, self._onMeasureCreated); } catch (e) {}
        self._onMeasureCreated = null;
      }
    }
    //SADD
    function attachCustomMeasure(map, meta) {
    const L = window.L;
    if (!L || !L.Control || !L.Control.Draw) {
      console.warn('[IIIF REPORT] Leaflet.Draw missing (leaflet-draw not loaded?)');
      return;
    }

    detachCustomMeasure(map);

    self._measureGroup = new L.FeatureGroup();
    map.addLayer(self._measureGroup);

    self._measureControl = new L.Control.Draw({
      edit: { featureGroup: self._measureGroup, remove: true },
      draw: {
        polyline: true,
        polygon: true,
        rectangle: false,
        circle: false,
        marker: true,
        circlemarker: false
      }
    });
    map.addControl(self._measureControl);

    function onMeasureCreated(e) {
      if (!self.measureEnabled()) return;

      const layer = e.layer;
      self._measureGroup.addLayer(layer);

      let msg = 'No geo units (missing/unknown CRS units)';
      if (!meta) msg = 'No GeoTIFF meta available';
      if (meta && meta.crs) {
        console.log('[MEASUREMENT] CRS:', meta.crs);
        console.log('[MEASUREMENT] Is meters CRS:', isMetersCRS(meta.crs));
        console.log('[MEASUREMENT] Transform:', meta.transform);
        console.log('[MEASUREMENT] Resolution:', meta.res);
      }
      // ======================
      // 1) DŁUGOŚĆ / POWIERZCHNIA
      // ======================
      if (meta && e.layerType === 'polyline') {
        const len = polylineLengthMeters(map, layer.getLatLngs(), meta);
        msg = 'Length: ' + fmtMeters(len);
      } else if (meta && e.layerType === 'polygon') {
        const area = polygonAreaMeters2(map, layer.getLatLngs(), meta);
        const ring = layer.getLatLngs()[0] || layer.getLatLngs();
        const peri = polylineLengthMeters(map, ring, meta);
        msg = 'Area: ' + fmtArea(area) + '<br/>Perimeter: ' + fmtMeters(peri);
      }

      // ======================
      // 2) PUNKT – ZAWSZE PROBE WYSOKOŚCI
      // ======================
      if (e.layerType === 'marker') {
        const latlng = layer.getLatLng();
        const z = map.getMaxZoom();
        const p = map.project(latlng, z);

        // ✅ ZMIANA: Użyj globalid aktywnej warstwy zamiast self.globalid()
        // self.activeLayerGlobalid pobiera globalid z aktualnie widocznej warstwy
        let demId = null;
        demId = demId || self.passid;


        console.log("Active Layer globalid:", demId);
        
        if (!demId) {
          self.elevationStatus('No active layer globalid for elevation');
          msg = 'Point placed (no active layer globalid)';
        } else {
          const px = p.x;
          const py = p.y;
          const pxI = Math.round(p.x);
          const pyI = Math.round(p.y);

          // ✅ Użyj globalid aktywnej warstwy do elevation probe
          const url = baseRoot() + 'api/iiif/dem-elevation/' + demId +
            '?px=' + pxI + '&py=' + pyI;

          self.elevationStatus('Querying elevation…');

          fetch(url, { credentials: 'include' })
            .then(r => r.json())
            .then(data => {
              if (data.ok && typeof data.elevation === 'number') {
                const unit = (meta && meta.vertical_unit) || 'm';

                let natX = null, natY = null;
                if (meta && meta.transform) {
                  const t = meta.transform;
                  natX = t.a * px + t.b * py + t.c;
                  natY = t.d * px + t.e * py + t.f;
                }

                let popupText =
                  'Elevation: ' + data.elevation.toFixed(3) + ' ' + unit +
                  '<br/>Pixel: (' + px.toFixed(1) + ', ' + py.toFixed(1) + ')';

                if (natX !== null && natY !== null) {
                  popupText +=
                    '<br/>Native: (' +
                    natX.toFixed(3) + ', ' + natY.toFixed(3) + ')';
                }

                layer.bindPopup(popupText).openPopup();

                self.elevationStatus(
                  'Elevation: ' + data.elevation.toFixed(3) + ' ' + unit +
                  ' | px=(' + px.toFixed(1) + ', ' + py.toFixed(1) + ')' +
                  (natX !== null
                    ? ' | native=(' + natX.toFixed(3) + ', ' + natY.toFixed(3) + ')'
                    : '')
                );
              } else {
                const msg = data.nodata
                  ? 'No elevation (nodata)'
                  : ('Elevation error: ' + (data.error || 'unknown'));
                layer.bindPopup(msg).openPopup();
                self.elevationStatus(msg);
              }
            })
            .catch(err => {
              console.error('[ELEVATION] Error:', err);
              const msg = 'Elevation request failed';
              layer.bindPopup(msg).openPopup();
              self.elevationStatus(msg);
            });
        }

        msg = 'Point placed';
      }

      self.measureStatus(msg.replace('<br/>', ' | '));
      if (e.layerType !== 'marker') {
        layer.bindPopup(msg).openPopup();
      }
    }

    self._onMeasureCreated = onMeasureCreated;
    map.on(L.Draw.Event.CREATED, onMeasureCreated);

    console.log('[IIIF REPORT] Custom measure attached (line/polygon + point)');
  };

    // ✅ ADD: Function to load existing annotations
    function loadExistingAnnotations(resourceId) {
      if (!resourceId) return;

      const baseUrl = baseRoot();
      const manifestUrl = baseUrl + 'manifest/' + resourceId;
      
      $.getJSON(manifestUrl)
        .done(function(manifest) {
          try {
            // Check if manifest has annotations
            const canvas = manifest?.sequences?.[0]?.canvases?.[0];
            if (!canvas?.otherContent || canvas.otherContent.length === 0) {
              console.log('[IIIF REPORT] No annotations found in manifest');
              return;
            }

            // Load annotation list
            const listUrl = canvas.otherContent[0]['@id'];
            console.log('[IIIF REPORT] Loading annotations from:', listUrl);
            
            $.getJSON(listUrl)
              .done(function(annoList) {
                if (annoList && annoList.resources) {
                  console.log('[IIIF REPORT] Loaded', annoList.resources.length, 'existing annotations');
                  self.existingAnnotations(annoList.resources);
                }
              })
              .fail(function(err) {
                console.warn('[IIIF REPORT] Failed to load annotation list:', err);
              });
          } catch(e) {
            console.warn('[IIIF REPORT] Error parsing manifest for annotations:', e);
          }
        })
        .fail(function(err) {
          console.warn('[IIIF REPORT] Failed to load manifest for annotations:', err);
        });
    }

    // ✅ NEW: Load manifest and related manifests
    function loadManifestAndSetup(resourceId) {
      if (!resourceId) return;

      const url = baseRoot() + 'manifest/' + resourceId;
      self.manifestUrl(url);

      console.log('[IIIF REPORT] Loading manifest from:', url);

      $.getJSON(url)
        .done(function(manifest) {
          // ✅ DEBUG: Log full manifest structure
          console.log('[IIIF REPORT] ====== FULL MANIFEST ======');
          console.log('[IIIF REPORT] Manifest @id:', manifest['@id'] || manifest.id);
          console.log('[IIIF REPORT] Manifest @type:', manifest['@type'] || manifest.type);
          console.log('[IIIF REPORT] Manifest label:', manifest.label);
          console.log('[IIIF REPORT] Manifest description:', manifest.description);
          console.log('[IIIF REPORT] Manifest sequences:', manifest.sequences);
          console.log('[IIIF REPORT] Manifest related:', manifest.related);
          console.log('[IIIF REPORT] Manifest seeAlso:', manifest.seeAlso);
          console.log('[IIIF REPORT] Full manifest object:', manifest);
          console.log('[IIIF REPORT] ============================');

          const svcUrl = extractServiceUrlFromManifest(manifest);
          const mu = extractMetaUrlFromManifest(manifest);
          if (mu) self.metaUrl(mu);

          // ✅ Extract globalid from primary manifest @id
          const manifestId = manifest['@id'] || manifest.id || '';
          console.log('[IIIF REPORT] Extracting globalid from manifest @id:', manifestId);
          const primaryGlobalidMatch = /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i.exec(manifestId);
          const primaryGlobalid = primaryGlobalidMatch ? primaryGlobalidMatch[1] : null;
          console.log('[IIIF REPORT] Primary manifest globalid:', primaryGlobalid);

          // ✅ Check for related manifests
          const relatedUrls = extractRelatedManifests(manifest);
          
          if (relatedUrls.length > 0) {
            console.log('[IIIF REPORT] Found related manifests:', relatedUrls);
            
            // Load all related manifests WITH their globalids
            const relatedPromises = relatedUrls.map(relUrl => {
              console.log('[IIIF REPORT] Loading related manifest from:', relUrl);
              return $.getJSON(relUrl).then(relManifest => {
                console.log('[IIIF REPORT] Related manifest loaded:', relManifest);
                
                const relServiceUrl = extractServiceUrlFromManifest(relManifest);
                const relManifestId = relManifest['@id'] || relManifest.id || '';
                const relGlobalidMatch = /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i.exec(relManifestId);
                const relGlobalid = relGlobalidMatch ? relGlobalidMatch[1] : null;
                
                console.log('[IIIF REPORT] Related manifest @id:', relManifestId);
                console.log('[IIIF REPORT] Related manifest globalid:', relGlobalid);
                console.log('[IIIF REPORT] Related manifest service URL:', relServiceUrl);
                
                return { serviceUrl: relServiceUrl, globalid: relGlobalid };
              });
            });

            Promise.all(relatedPromises).then(relatedData => {
              // Combine primary + related
              const primaryData = { serviceUrl: svcUrl, globalid: primaryGlobalid };
              const allData = [primaryData, ...relatedData].filter(d => d.serviceUrl);
              
              const allUrls = allData.map(d => d.serviceUrl);
              
              // ✅ Create mapping: serviceUrl -> globalid
              const globalidMap = {};
              allData.forEach(d => {
                if (d.serviceUrl && d.globalid) {
                  globalidMap[d.serviceUrl] = d.globalid;
                  console.log('[IIIF REPORT] Mapping:', d.serviceUrl, '->', d.globalid);
                }
              });
              
              self._serviceUrlToGlobalidMap = globalidMap;
              self.iiifServiceUrls(allUrls);
              
              console.log('[IIIF REPORT] Final service URLs:', allUrls);
              console.log('[IIIF REPORT] Final globalid mapping:', globalidMap);
              console.log('[IIIF REPORT] Loading', allUrls.length, 'IIIF layers');
              
              // ✅ DODAJ: Load annotations after setting up layers
              loadExistingAnnotations(resourceId);
            }).catch(err => {
              console.warn('[IIIF REPORT] Failed to load related manifest:', err);
              self.iiifServiceUrls([svcUrl].filter(Boolean));
              // ✅ DODAJ: Load annotations even if related manifests fail
              loadExistingAnnotations(resourceId);
            });
          } else {
            // No related manifests - just show primary
            const globalidMap = (svcUrl && primaryGlobalid) ? { [svcUrl]: primaryGlobalid } : {};
            self._serviceUrlToGlobalidMap = globalidMap;
            self.iiifServiceUrls([svcUrl].filter(Boolean));
            
            console.log('[IIIF REPORT] No related manifests');
            console.log('[IIIF REPORT] Single service URL:', svcUrl);
            console.log('[IIIF REPORT] Single globalid mapping:', globalidMap);
            
            // ✅ DODAJ: Load annotations for primary manifest
            loadExistingAnnotations(resourceId);
          }

          console.log('[IIIF REPORT] Primary IIIF service URL:', svcUrl);
        })
        .fail(function(err) {
          console.warn('[IIIF REPORT] Failed to load manifest:', err);
          self.iiifServiceUrls([]);
        });
    }

    // ---- tiles-driven setup (non-tabbed mode) ----
    function setupFromTilesIfPossible() {
      const tiles =
        (params.tiles && Array.isArray(params.tiles) ? params.tiles : null) ||
        (self.report && self.report.get ? (self.report.get('tiles') || []) : []);

      const raw = getNodeRawFromTiles(DIGITAL_RES_URL_NODE_ID, tiles);
      const url = normalizeLangString(raw);

      if (!url) {
        self.iiifServiceUrls([]);
        return;
      }

      if (looksLikeManifestUrl(url)) {
        self.manifestUrl(url);
        $.getJSON(url)
          .done(function(manifest) {
            const svcUrl = extractServiceUrlFromManifest(manifest);
            const mu = extractMetaUrlFromManifest(manifest);
            if (mu) self.metaUrl(mu);

            // ✅ Check for related manifests in non-tabbed mode też
            const relatedUrls = extractRelatedManifests(manifest);
            
            if (relatedUrls.length > 0) {
              const relatedPromises = relatedUrls.map(relUrl => 
                $.getJSON(relUrl).then(relManifest => extractServiceUrlFromManifest(relManifest))
              );

              Promise.all(relatedPromises).then(relatedServiceUrls => {
                const allUrls = [svcUrl, ...relatedServiceUrls].filter(Boolean);
                self.iiifServiceUrls(allUrls);
                
                // ✅ DODAJ: Load annotations in non-tabbed mode
                const fallbackRid = self.report && self.report.get ? self.report.get('resourceid') : null;
                if (fallbackRid) {
                  loadExistingAnnotations(fallbackRid);
                }
              }).catch(() => {
                self.iiifServiceUrls([svcUrl].filter(Boolean));
              });
            } else {
              self.iiifServiceUrls([svcUrl].filter(Boolean));
              
              // ✅ DODAJ: Load annotations for single manifest
              const fallbackRid = self.report && self.report.get ? self.report.get('resourceid') : null;
              if (fallbackRid) {
                loadExistingAnnotations(fallbackRid);
              }
            }

            console.log('[IIIF REPORT] IIIF service URL (from stored manifest):', svcUrl);
          })
          .fail(function(err) {
            console.warn('[IIIF REPORT] Failed to load stored manifest url:', err);
            self.iiifServiceUrls([]);
          });
      } else {
        self.iiifServiceUrls([url].filter(Boolean));
        console.log('[IIIF REPORT] IIIF service URL (from tile):', url);
      }
    }

    // ---- react to active tab changes (and initial load) ----
    ko.computed(function() {
      const rid = getOverrideResourceIdFromActiveTab();

      // reset per-resource state on change
      self.existingAnnotations([]);
      self.meta(null);
      self.metaError('');
      self.metaLoaded(false);
      self._geoMeta = null;

      if (rid) {
        // tabbed mode: Digital Resource id
        self.globalid(rid);
        self.viewerId('iiif-report-' + rid);

        // manifest -> service url(s)
        self.iiifServiceUrls([]);
        self.metaUrl(null);
        loadManifestAndSetup(rid);
      } else {
        // non-tabbed mode: use report resourceid and tile-stored url
        const fallbackRid = self.report && self.report.get ? self.report.get('resourceid') : null;
        self.globalid(fallbackRid || null);
        self.viewerId('iiif-report-' + (fallbackRid || 'unknown'));

        setupFromTilesIfPossible();
      }
    });

    // ---- load geotiff-meta whenever globalid/metaUrl changes ----
    ko.computed(function() {
      const gid = self.globalid();
      const mu = self.metaUrl();

      fetchGeotiffMeta(gid, mu).then(meta => {
        self._geoMeta = meta;
        self.meta(meta);

        if (self._mapRef && self.measureEnabled()) {
          attachCustomMeasure(self._mapRef, self._geoMeta);
        }
      });
    });

    // ✅ ADD: Callback functions for the template
    self.onMapReadyCallback = function(map) {
      console.log('[IIIF REPORT] Map ready callback');
      self._mapRef = map;
      
      // Attach measurement tools if enabled and we have metadata
      if (self.measureEnabled() && self._geoMeta) {
        attachCustomMeasure(self._mapRef, self._geoMeta);
      }
    };

    self.onLayerMetadataChanged = function(meta) {
      console.log('[IIIF REPORT] Layer metadata changed:', meta);
      self._geoMeta = meta;
      self.meta(meta);
      self.passid = null;
      if (meta.manifest_url) {
        const match = /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i.exec(meta.manifest_url);
        self.passid = match ? match[1] : null;
      }
      // ✅ DODAJ: Przechowaj aktywny globalid w _mapRef
      if (self._mapRef) {
        // Znajdź globalid dla aktualnie aktywnej warstwy
        const activeGlobalid = Object.values(self._serviceUrlToGlobalidMap)[0]; // lub inna logika
        self._mapRef._activeLayerGlobalid = activeGlobalid;

      }
      
      // Re-attach measurement tools with new metadata
      if (self._mapRef && self.measureEnabled()) {
        attachCustomMeasure(self._mapRef, self._geoMeta);
      }
    };


    // Add this function to clear custom measurements from the map
    self.clearMeasurements = function() {
      if (self._measureGroup) {
        self._measureGroup.clearLayers();
      }
      self.measureStatus('');
    };

  },
  template: iiifMapReportTemplate
});
