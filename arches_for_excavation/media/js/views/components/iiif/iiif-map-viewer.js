define([
    'knockout',
    'jquery',
    'arches',
    'leaflet',
    'leaflet-draw',
    'leaflet-iiif',
    'templates/views/components/iiif/iiif-map-viewer.htm'
], function(ko, $, arches, Leaflet, _draw, _iiif, mapTemplate) {
    'use strict';

    var viewModel = function(params) {
        var self = this;
        var L = Leaflet || window.L;
        self.onMapReady = params.onMapReady || null;

        // --- Parametry wejściowe ---
        self.serviceUrl = params.serviceUrl;

        // ✅ NEW: globalid/meta url (podawaj z workflow!)
        // obsługujemy kilka nazw, bo pewnie będziesz to przekazywać różnie
        self.globalid = params.globalid || params.geotiffGlobalId || params.manifestGlobalId || null;
        self.metaUrl = params.metaUrl || null;

        self.existingAnnotations = params.existingAnnotations || ko.observableArray([]);
        self.onAnnotationCreated = params.onAnnotationCreated;
        self.onAnnotationDeleted = params.onAnnotationDeleted;

        // --- Stan Mapy ---
        self.map = null;
        self.iiifLayer = null;
        self.drawnItems = new L.FeatureGroup();
        self.existingItems = new L.FeatureGroup();
        self._mapInitialized = false;
        self._imageInfoLoaded = false;

        self._existingLayerMap = {};

        // ✅ NEW: GeoTIFF meta state
        self.geotiffMeta = ko.observable(null);
        self.geotiffMetaLoaded = ko.observable(false);
        self.geotiffMetaError = ko.observable('');
        console.log('[IIIF MAP] Component initialized with:', {
            globalid: ko.unwrap(self.globalid),
            metaUrl: ko.unwrap(self.metaUrl),
            serviceUrl: ko.unwrap(self.serviceUrl)
        });
        function baseRoot() {
            // arches.urls.root zwykle ma trailing slash
            var root = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            return root.replace(/\/+$/, '') + '/';
        }

        // =============================================================
        // URL normalizacja (testserver / cantaloupe hosty)
        // =============================================================
        function normalizeToCurrentHost(url) {
            if (!url) return url;

            // szybkie replace na znane hosty kontenerowe
            url = url
                .replace('cantaloupe_arches_slocal:8182', window.location.host)
                .replace('cantaloupe_arches_slocal', window.location.hostname);

            // testserver -> aktualny host (bo browser tego nie rozwiąże)
            try {
                var u = new URL(url, window.location.origin);
                if (u.hostname === 'testserver') {
                    u.protocol = window.location.protocol;
                    u.hostname = window.location.hostname;
                    u.port = window.location.port || '';
                    return u.toString();
                }
            } catch (e) {
                // jeśli to nie jest pełny URL, zostaw
            }
            return url;
        }

        function iiifInfoUrlFromService(serviceUrl) {
            var u = normalizeToCurrentHost(serviceUrl);
            return u.replace(/\/$/, '') + '/info.json';
        }

        // =============================================================
        // ✅ GeoTIFF meta load
        // =============================================================
        self.loadGeotiffMeta = function() {
            self.geotiffMetaLoaded(false);
            self.geotiffMetaError('');

            var gid = self.globalid ? ko.unwrap(self.globalid) : null;
            var explicitMetaUrl = self.metaUrl ? ko.unwrap(self.metaUrl) : null;

            var url = null;
            if (explicitMetaUrl) {
                url = explicitMetaUrl;
            } else if (gid) {
                url = baseRoot() + 'api/iiif/geotiff-meta/' + gid;
            } else {
                self.geotiffMeta(null);
                self.geotiffMetaLoaded(false);
                return;
            }

            fetch(url, { credentials: 'include' })
                .then(function(resp) {
                    if (!resp.ok) {
                        if (resp.status === 404) throw new Error('geotiff-meta not found (404)');
                        throw new Error('geotiff-meta HTTP ' + resp.status);
                    }
                    return resp.json();
                })
                .then(function(payload) {
                    if (!payload || !payload.ok || !payload.meta) {
                        throw new Error('Invalid geotiff-meta payload');
                    }
                    self.geotiffMeta(payload.meta);
                    self.geotiffMetaLoaded(true);
                    console.log('[IIIF MAP] geotiff-meta loaded:', payload.meta);
                    
                    // ✅ TUTAJ wywołaj, gdy meta załadowana pomyślnie
                    if (self.map && payload.meta) {
                        applyDistanceFromGeoMeta(self.map, payload.meta);
                    }
                })
                .catch(function(err) {
                    self.geotiffMeta(null);
                    self.geotiffMetaLoaded(true);
                    self.geotiffMetaError(String(err.message || err));
                    console.warn('[IIIF MAP] geotiff-meta load failed:', err);
                });
        };

        // automatycznie pobierz meta, gdy globalid/metaUrl się zmienia
        ko.computed(function() {
            var _gid = self.globalid ? ko.unwrap(self.globalid) : null;
            var _mu = self.metaUrl ? ko.unwrap(self.metaUrl) : null;
            // trigger
            self.loadGeotiffMeta();
        });
        function metersPerPixelFromMeta(meta) {
            if (!meta || !meta.res || meta.res.length < 2) return null;

            var xRes = Number(meta.res[0]);
            var yRes = Number(meta.res[1]);
            if (!isFinite(xRes) || !isFinite(yRes) || xRes <= 0 || yRes <= 0) return null;

            var crs = (meta.crs || '').toUpperCase();

            // Jeśli GeoTIFF ma CRS w metrach (większość EPSG:2180 / UTM / itp.)
            // res jest wtedy w [m/pixel]. Wystarczy.
            if (crs.includes('EPSG:2180') || crs.includes('EPSG:3857') || crs.includes('UTM') || crs.includes('EPSG:326') || crs.includes('EPSG:327')) {
                return { x: xRes, y: yRes, unit: 'm' };
            }

            // Jeśli to EPSG:4326 (stopnie/piksel) -> przybliżenie na szerokości środka obrazu
            if (crs.includes('EPSG:4326')) {
                var lat0 = 0;
                if (meta.bounds_wgs84 && isFinite(meta.bounds_wgs84.top) && isFinite(meta.bounds_wgs84.bottom)) {
                    lat0 = (Number(meta.bounds_wgs84.top) + Number(meta.bounds_wgs84.bottom)) / 2;
                }
                var latRad = lat0 * Math.PI / 180;
                var mPerDegLat = 111320; // przybliżenie
                var mPerDegLon = 111320 * Math.cos(latRad);

                return { x: xRes * mPerDegLon, y: yRes * mPerDegLat, unit: 'm' };
            }

            // Nie znamy jednostek — nie zgadujemy
            return null;
        }

        // =====================================================================
        // LOGIKA GEOMETRII (SVG / XYWH)
        // =====================================================================
        function getIIIFSelectorFromLayer(layer) {
            if (!self.map || !self._imageInfoLoaded) {
                console.warn('[IIIF MAP] Map not ready for coordinate conversion');
                return { geometry: null, selector: null };
            }

            try {
                var zoom = self.map.getMaxZoom();
                var geojson = layer.toGeoJSON();
                var dbGeometry = geojson.geometry;
                var iiifSelector = {};

                if (layer instanceof L.Rectangle) {
                    var bounds = layer.getBounds();
                    var sw = self.map.project(bounds.getSouthWest(), zoom);
                    var ne = self.map.project(bounds.getNorthEast(), zoom);

                    var minX = Math.min(sw.x, ne.x);
                    var minY = Math.min(sw.y, ne.y);
                    var w = Math.abs(ne.x - sw.x);
                    var h = Math.abs(ne.y - sw.y);

                    iiifSelector = {
                        type: 'xywh',
                        value: Math.round(minX) + ',' + Math.round(minY) + ',' + Math.round(w) + ',' + Math.round(h)
                    };
                } else {
                    var latlngs = layer.getLatLngs();
                    if (Array.isArray(latlngs[0]) && Array.isArray(latlngs[0][0])) latlngs = latlngs[0];
                    else if (Array.isArray(latlngs[0]) && !latlngs[0].lat) latlngs = latlngs.flat();

                    var flatPoints = [];
                    function extractPoints(arr) {
                        arr.forEach(function(pt) {
                            if (pt.lat !== undefined && pt.lng !== undefined) flatPoints.push(pt);
                            else if (Array.isArray(pt)) extractPoints(pt);
                        });
                    }
                    extractPoints(latlngs);

                    var pathData = flatPoints.map(function(ll, i) {
                        var p = self.map.project(ll, zoom);
                        var cmd = (i === 0) ? 'M' : 'L';
                        return cmd + ' ' + Math.round(p.x) + ' ' + Math.round(p.y);
                    }).join(' ');

                    if (layer instanceof L.Polygon) {
                        pathData += ' Z';
                    }

                    iiifSelector = {
                        type: 'svg',
                        value: '<svg xmlns="http://www.w3.org/2000/svg"><path d="' + pathData + '" /></svg>'
                    };
                }

                return { geometry: dbGeometry, selector: iiifSelector };
            } catch (e) {
                console.error('[IIIF MAP] Error converting layer to selector:', e);
                return { geometry: null, selector: null };
            }
        }

        function parseAnnotationChars(chars) {
            if (!chars) return { label: '', description: '' };
            var labelMatch = /<b>(.*?)<\/b>/i.exec(chars);
            var descMatch = /<p>(?!<b>)(.*?)<\/p>/i.exec(chars);

            var label = labelMatch ? labelMatch[1].trim() : '';
            var description = descMatch ? descMatch[1].trim() : '';

            if (!label && !description) {
                var stripped = chars.replace(/<[^>]*>/g, '').trim();
                label = stripped;
            }
            return { label: label, description: description };
        }

        function drawSvgOnMap(svgString, label, annotationId, annotationIndex) {
            if (!self.map || !self._imageInfoLoaded) return null;

            try {
                var match = /d="([^"]+)"/.exec(svgString);
                if (!match || !match[1]) return null;

                var commands = match[1].split(/(?=[MLZ])/);
                var latlngs = [];
                var zoom = self.map.getMaxZoom();

                commands.forEach(function(cmd) {
                    var parts = cmd.trim().split(/\s+/);
                    if (parts.length >= 3) {
                        var px = parseFloat(parts[1]);
                        var py = parseFloat(parts[2]);
                        if (!isNaN(px) && !isNaN(py)) {
                            latlngs.push(self.map.unproject([px, py], zoom));
                        }
                    }
                });

                if (latlngs.length > 0) {
                    var poly = L.polygon(latlngs, {
                        color: '#3388ff', weight: 2, dashArray: '5, 5', fillOpacity: 0.1
                    });

                    var annos = ko.unwrap(self.existingAnnotations);
                    var anno = annos[annotationIndex];
                    var chars = anno && anno.resource && anno.resource.chars ? anno.resource.chars : '';
                    var parsed = parseAnnotationChars(chars);

                    // ✅ Dodaj flagę canDelete
                    var popupData = { 
                        label: parsed.label || label, 
                        description: parsed.description, 
                        annotationIndex: annotationIndex,
                        canDelete: !!self.onAnnotationDeleted
                    };

                    var popupNode = document.createElement('div');
                    popupNode.innerHTML = document.getElementById('iiif-annotation-popup-template').innerHTML;
                    ko.applyBindings(popupData, popupNode);

                    poly.bindPopup(popupNode, { maxWidth: 300, className: 'iiif-annotation-popup' });

                    self.existingItems.addLayer(poly);
                    return poly;
                }
            } catch (e) {
                console.error('[IIIF MAP] Error drawing SVG annotation:', e);
            }
            return null;
        }

        function drawXywhOnMap(xywh, label, annotationId, annotationIndex) {
            if (!self.map || !self._imageInfoLoaded) return null;

            try {
                if (xywh.length === 4 && xywh.every(function(n){ return !isNaN(n); })) {
                    var zoom = self.map.getMaxZoom();
                    var p1 = self.map.unproject([xywh[0], xywh[1]], zoom);
                    var p2 = self.map.unproject([xywh[0] + xywh[2], xywh[1] + xywh[3]], zoom);

                    var rect = L.rectangle([p1, p2], {
                        color: '#3388ff', dashArray: '5, 5', fillOpacity: 0.1
                    });

                    var annos = ko.unwrap(self.existingAnnotations);
                    var anno = annos[annotationIndex];
                    var chars = anno && anno.resource && anno.resource.chars ? anno.resource.chars : '';
                    var parsed = parseAnnotationChars(chars);

                    // ✅ Dodaj flagę canDelete do popupData
                    var popupData = { 
                        label: parsed.label || label, 
                        description: parsed.description, 
                        annotationIndex: annotationIndex,
                        canDelete: !!self.onAnnotationDeleted  // tylko jeśli callback istnieje
                    };

                    var popupNode = document.createElement('div');
                    popupNode.innerHTML = document.getElementById('iiif-annotation-popup-template').innerHTML;
                    ko.applyBindings(popupData, popupNode);

                    rect.bindPopup(popupNode, { maxWidth: 300, className: 'iiif-annotation-popup' });

                    self.existingItems.addLayer(rect);
                    return rect;
                }
            } catch (e) {
                console.error('[IIIF MAP] Error drawing XYWH annotation:', e);
            }
            return null;
        }

        // =====================================================================
        // RYSOWANIE ISTNIEJĄCYCH
        // =====================================================================
        self.drawExisting = function() {
            if (!self.map || !self._imageInfoLoaded) return;

            self.existingItems.clearLayers();
            self._existingLayerMap = {};

            var annos = ko.unwrap(self.existingAnnotations);
            if (!annos || annos.length === 0) return;

            console.log('[IIIF MAP] Drawing', annos.length, 'existing annotations');

            annos.forEach(function(anno, idx) {
                try {
                    var label = (anno.resource && anno.resource.chars) ? anno.resource.chars : 'Annotation ' + (idx + 1);
                    var annoId = 'anno-index-' + idx;
                    var layer = null;

                    if (anno.on && anno.on.selector && anno.on.selector['@type'] === 'oa:SvgSelector') {
                        layer = drawSvgOnMap(anno.on.selector.value, label, annoId, idx);
                    } else if (typeof anno.on === 'string' && anno.on.indexOf('#xywh=') > -1) {
                        var xywh = anno.on.split('#xywh=')[1].split(',').map(parseFloat);
                        layer = drawXywhOnMap(xywh, label, annoId, idx);
                    }

                    if (layer) self._existingLayerMap[annoId] = { layer: layer, index: idx };
                } catch (e) {
                    console.error('[IIIF MAP] Error drawing annotation', idx, e);
                }
            });
        };

        self.deleteAnnotation = function(annotationIndex) {
            console.log('[IIIF MAP] Deleting annotation at index:', annotationIndex);

            var annoId = 'anno-index-' + annotationIndex;
            var tracked = self._existingLayerMap[annoId];
            if (tracked && tracked.layer) {
                self.existingItems.removeLayer(tracked.layer);
                delete self._existingLayerMap[annoId];
            }

            if (self.onAnnotationDeleted) self.onAnnotationDeleted(annotationIndex);
        };

        window.deleteExistingAnnotation = function(annotationIndex) {
            if (confirm('Are you sure you want to delete this annotation?')) {
                self.deleteAnnotation(annotationIndex);
            }
        };

        // =====================================================================
        // INICJALIZACJA MAPY
        // =====================================================================
        function ensureMap(container) {
            if (!L || self._mapInitialized) return;
            if (self.map) self.map.remove();

            console.log('[IIIF MAP] Creating Leaflet map...');

            self.map = L.map(container, {
                crs: L.CRS.Simple,
                center: [0, 0],
                zoom: 0,
                zoomControl: true
            });

            self.map.addLayer(self.drawnItems);
            self.map.addLayer(self.existingItems);

            var drawControl = new L.Control.Draw({
                edit: { featureGroup: self.drawnItems, remove: true },
                draw: {
                    polygon: { allowIntersection: false, showArea: true },
                    rectangle: true,
                    circle: false, marker: false, polyline: false, circlemarker: false
                }
            });
            self.map.addControl(drawControl);

            self.map.on(L.Draw.Event.CREATED, function(e) {
                var layer = e.layer;
                self.drawnItems.addLayer(layer);

                var data = getIIIFSelectorFromLayer(layer);

                if (self.onAnnotationCreated) {
                    self.onAnnotationCreated({
                        type: e.layerType,
                        selector: data.selector,
                        geometry: data.geometry,
                        created: new Date().toISOString()
                    });
                }
            });
            if (self.onMapReady) {
                try {
                    self.onMapReady(self.map);
                } catch (e) {
                    console.warn('[IIIF MAP] onMapReady callback failed:', e);
                }
            }

            self._mapInitialized = true;
        }

        // =====================================================================
        // ŁADOWANIE OBRAZU
        // =====================================================================
        ko.computed(function() {
            var urlRaw = ko.unwrap(self.serviceUrl);
            var container = document.getElementById('iiif-map-container');

            if (!urlRaw || !container || !L) return;

            if (!self.map) ensureMap(container);

            // normalize hosty (testserver/cantaloupe)
            var url = normalizeToCurrentHost(urlRaw);

            if (self.iiifLayer) {
                self.map.removeLayer(self.iiifLayer);
            }

            self._imageInfoLoaded = false;

            var infoUrl = iiifInfoUrlFromService(url);
            console.log('[IIIF MAP] Loading info.json:', infoUrl);

            $.getJSON(infoUrl)
                .done(function(info) {
                    self.iiifLayer = L.tileLayer.iiif(infoUrl).addTo(self.map);

                    setTimeout(function() {
                        self.map.invalidateSize();

                        if (info.width && info.height) {
                            try {
                                var maxZoom = self.map.getMaxZoom();
                                var southWest = self.map.unproject([0, info.height], maxZoom);
                                var northEast = self.map.unproject([info.width, 0], maxZoom);
                                var bounds = new L.LatLngBounds(southWest, northEast);
                                self.map.fitBounds(bounds);
                            } catch (err) {
                                console.warn('[IIIF MAP] FitBounds failed:', err);
                            }
                        }

                        self._imageInfoLoaded = true;
                        self.drawExisting();
                    }, 200);
                })
                .fail(function(jqxhr, textStatus, error) {
                    console.error('[IIIF MAP] Failed to load info.json:', error, infoUrl);
                });
        });
    };

    return ko.components.register('iiif-map-viewer', {
        viewModel: viewModel,
        template: mapTemplate
    });
});
