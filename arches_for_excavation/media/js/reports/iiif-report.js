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

        params.configKeys = params.configKeys || [];
        ReportViewModel.apply(self, [params]);

        const tiles = (self.report && self.report.get && self.report.get('tiles')) || [];
        const resourceId = self.report && self.report.get && self.report.get('resourceid');

        self.viewerId = 'iiif-report-' + (resourceId || 'unknown');

        // ---------- helpers ----------
        function baseRoot() {
            const root = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            return root.replace(/\/+$/, '') + '/';
        }

        function getNodeRaw(nodeId) {
            for (let i = 0; i < tiles.length; i++) {
                const tile = tiles[i];
                if (!tile || !tile.data) continue;
                if (tile.data[nodeId] !== undefined) return tile.data[nodeId];
            }
            return null;
        }

        // ---------- IIIF URL ----------
        self.iiifUrl = ko.pureComputed(function() {
            const raw = getNodeRaw(DIGITAL_RES_URL_NODE_ID);
            if (!raw) return null;

            // lang-string: { en: { value: "http://..." } }
            if (typeof raw === 'object' && !Array.isArray(raw)) {
                const langs = Object.keys(raw);
                if (!langs.length) return null;
                const langObj = raw[langs[0]];
                return (langObj && langObj.value) ? ko.unwrap(langObj.value) : null;
            }

            if (typeof raw === 'string') return raw;
            return null;
        });

        // globalid manifestu == resourceId (dla Digital Resource report)
        self.globalid = ko.observable(resourceId || null);
        self.metaUrl = ko.observable(null);

        // ---------- UI state ----------
        self.meta = ko.observable(null);
        self.metaError = ko.observable('');
        self.metaLoaded = ko.observable(false);

        self.measureEnabled = ko.observable(true);
        self.measureStatus = ko.observable(''); // tekst ostatniego pomiaru

        // ---------- internal refs ----------
        self._mapRef = null;
        self._geoMeta = null;
        self._measureGroup = null;
        self._measureControl = null;

        // ---------- Geo meta fetch ----------
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

        // ---------- measurement math ----------
        function isMetersCRS(crs) {
            crs = (crs || '').toUpperCase();
            return (
                crs.includes('EPSG:2180') ||
                crs.includes('EPSG:3857') ||
                crs.includes('UTM') ||
                crs.includes('EPSG:326') ||
                crs.includes('EPSG:327')
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

            // fallback: res (bez rotacji)
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
            if (!isMetersCRS(crs)) return null; // nie liczymy "m²" ze stopni

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

        // ---------- attach/detach measurement ----------
        function attachCustomMeasure(map, meta) {
            const L = window.L;
            if (!L || !L.Control || !L.Control.Draw) {
                console.warn('[IIIF REPORT] Leaflet.Draw missing (leaflet-draw not loaded?)');
                return;
            }

            // prevent duplicates
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
                    marker: false,
                    circlemarker: false
                }
            });
            map.addControl(self._measureControl);

            map.on(L.Draw.Event.CREATED, onMeasureCreated);

            function onMeasureCreated(e) {
                if (!self.measureEnabled()) return;

                const layer = e.layer;
                self._measureGroup.addLayer(layer);

                let msg = 'No geo units (missing/unknown CRS units)';
                if (!meta) msg = 'No GeoTIFF meta available';

                if (meta && e.layerType === 'polyline') {
                    const len = polylineLengthMeters(map, layer.getLatLngs(), meta);
                    msg = 'Length: ' + fmtMeters(len);
                } else if (meta && e.layerType === 'polygon') {
                    const area = polygonAreaMeters2(map, layer.getLatLngs(), meta);
                    const ring = layer.getLatLngs()[0] || layer.getLatLngs();
                    const peri = polylineLengthMeters(map, ring, meta);
                    msg = 'Area: ' + fmtArea(area) + '<br/>Perimeter: ' + fmtMeters(peri);
                }

                self.measureStatus(msg.replace('<br/>', ' | '));
                layer.bindPopup(msg).openPopup();
            }

            // stash handler so we can remove it later
            self._onMeasureCreated = onMeasureCreated;

            console.log('[IIIF REPORT] Custom measure attached');
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

        self.clearMeasurements = function() {
            if (self._measureGroup) self._measureGroup.clearLayers();
            self.measureStatus('');
        };

        // ---------- onMapReady from iiif-map-viewer ----------
        self.onMapReadyCallback = function(map) {
            self._mapRef = map;

            // attach measure when map is ready AND enabled
            if (self.measureEnabled()) {
                attachCustomMeasure(map, self._geoMeta);
            }
        };

        // toggle measurement tool without touching viewer logic
        self.measureEnabled.subscribe(function(enabled) {
            if (!self._mapRef) return;
            if (enabled) attachCustomMeasure(self._mapRef, self._geoMeta);
            else detachCustomMeasure(self._mapRef);
        });

        // ---------- load meta once ----------
        ko.computed(function() {
            const gid = self.globalid();
            const mu = self.metaUrl();

            fetchGeotiffMeta(gid, mu).then(meta => {
                self._geoMeta = meta;
                self.meta(meta);

                // if map already ready, reattach with meta (so units become meters)
                if (self._mapRef && self.measureEnabled()) {
                    attachCustomMeasure(self._mapRef, self._geoMeta);
                }
            });
        });
    },
    template: iiifMapReportTemplate
});
