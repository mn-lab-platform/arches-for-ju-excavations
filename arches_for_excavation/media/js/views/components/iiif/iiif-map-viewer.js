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
        self.onMapClick = params.onMapClick || null;   

        // ✅ CHANGED: Support both single URL (legacy) and array
        var serviceUrlParam = params.serviceUrl || params.serviceUrls;
        
        if (typeof serviceUrlParam === 'function') {
            var unwrapped = ko.unwrap(serviceUrlParam);
            if (Array.isArray(unwrapped)) {
                self.serviceUrls = serviceUrlParam;
            } else {
                // Single URL -> wrap in array
                self.serviceUrls = ko.computed(function() {
                    var val = ko.unwrap(serviceUrlParam);
                    return val ? [val] : [];
                });
            }
        } else if (Array.isArray(serviceUrlParam)) {
            self.serviceUrls = ko.observableArray(serviceUrlParam);
        } else if (serviceUrlParam) {
            self.serviceUrls = ko.observableArray([serviceUrlParam]);
        } else {
            self.serviceUrls = ko.observableArray([]);
        }

        self.globalid = params.globalid || params.geotiffGlobalId || params.manifestGlobalId || null;
        self.metaUrl = params.metaUrl || null;

        self.existingAnnotations = params.existingAnnotations || ko.observableArray([]);
        self.onAnnotationCreated = params.onAnnotationCreated;
        self.onAnnotationDeleted = params.onAnnotationDeleted;
        self.onMetadataChanged = params.onMetadataChanged || null; // ✅ NEW
        
        // ✅ NEW: Accept mapping from service URL to globalid
        self.serviceUrlToGlobalidMap = params.serviceUrlToGlobalidMap || {};

        // --- Stan Mapy ---
        self.map = null;
        self.iiifLayers = []; // ✅ Array of layers
        self.drawnItems = new L.FeatureGroup();
        self.existingItems = new L.FeatureGroup();
        self._mapInitialized = false;
        self._imageInfoLoaded = false;

        self._existingLayerMap = {};

        // ✅ Layer control for toggling
        self.layerControl = null;

        // ✅ NEW: Track metadata for each layer
        self.layerMetadata = {}; // { globalid: metaObject }
        self.activeLayerGlobalid = ko.observable(null);

        self.geotiffMeta = ko.observable(null);
        self.geotiffMetaLoaded = ko.observable(false);
        self.geotiffMetaError = ko.observable('');

        console.log('[IIIF MAP] Component initialized with:', {
            globalid: ko.unwrap(self.globalid),
            metaUrl: ko.unwrap(self.metaUrl),
            serviceUrls: ko.unwrap(self.serviceUrls)
        });

        function baseRoot() {
            var root = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            return root.replace(/\/+$/, '') + '/';
        }

        // =============================================================
        // URL normalizacja
        // =============================================================
        function normalizeToCurrentHost(url) {
            if (!url) return url;

            url = url
                .replace('cantaloupe_arches_slocal:8182', window.location.host)
                .replace('cantaloupe_arches_slocal', window.location.hostname);

            try {
                var u = new URL(url, window.location.origin);
                if (u.hostname === 'testserver') {
                    u.protocol = window.location.protocol;
                    u.hostname = window.location.hostname;
                    u.port = window.location.port || '';
                    return u.toString();
                }
            } catch (e) {}
            return url;
        }

        function iiifInfoUrlFromService(serviceUrl) {
            var u = normalizeToCurrentHost(serviceUrl);
            return u.replace(/\/$/, '') + '/info.json';
        }

        // =============================================================
        // GeoTIFF meta load
        // =============================================================
        self.loadGeotiffMeta = function(globalidToLoad) {
            if (!globalidToLoad) {
                self.geotiffMeta(null);
                self.geotiffMetaLoaded(false);
                return;
            }

            // Check if already loaded
            if (self.layerMetadata[globalidToLoad]) {
                self.geotiffMeta(self.layerMetadata[globalidToLoad]);
                self.geotiffMetaLoaded(true);
                console.log('[IIIF MAP] Using cached metadata for:', globalidToLoad);
                return;
            }

            self.geotiffMetaLoaded(false);
            self.geotiffMetaError('');

            var url = baseRoot() + 'api/iiif/geotiff-meta/' + globalidToLoad;

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
                    // Cache the metadata
                    self.layerMetadata[globalidToLoad] = payload.meta;
                    self.geotiffMeta(payload.meta);
                    self.geotiffMetaLoaded(true);
                    console.log('[IIIF MAP] Loaded and cached metadata for:', globalidToLoad);
                })
                .catch(function(err) {
                    self.geotiffMeta(null);
                    self.geotiffMetaLoaded(true);
                    self.geotiffMetaError(String(err.message || err));
                    console.warn('[IIIF MAP] geotiff-meta load failed for', globalidToLoad, ':', err);
                });
        };

        // ✅ CHANGED: React to active layer changes and notify parent
        ko.computed(function() {
            var activeGid = self.activeLayerGlobalid();
            if (activeGid) {
                self.loadGeotiffMeta(activeGid);
                
                // Notify parent component when metadata is loaded
                if (self.onMetadataChanged && self.geotiffMeta()) {
                    self.onMetadataChanged(self.geotiffMeta());
                }
            }
        });

        // ✅ Also notify when metadata finishes loading
        self.geotiffMeta.subscribe(function(newMeta) {
            if (self.onMetadataChanged && newMeta) {
                console.log('[IIIF MAP] Notifying parent of metadata change');
                self.onMetadataChanged(newMeta);
            }
        });

        // =============================================================
        // GEOMETRY/SELECTOR logic (unchanged)
        // =============================================================
        // ...existing code...

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
                    // ✅ Rectangle handling (existing code)
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
                } else if (layer instanceof L.Polygon) {
                    // ✅ NEW: Polygon handling - generate SVG selector
                    console.log('[IIIF MAP] Polygon detected, generating SVG selector');
                    
                    var latlngs = layer.getLatLngs();
                    // Flatten nested arrays if needed
                    var points = latlngs[0] || latlngs;
                    
                    // Convert LatLngs to IIIF pixel coordinates
                    var svgPoints = points.map(function(latlng) {
                        var pixel = self.map.project(latlng, zoom);
                        return Math.round(pixel.x) + ',' + Math.round(pixel.y);
                    }).join(' ');
                    
                    // Get bounding box for SVG viewBox
                    var bounds = layer.getBounds();
                    var sw = self.map.project(bounds.getSouthWest(), zoom);
                    var ne = self.map.project(bounds.getNorthEast(), zoom);
                    var minX = Math.round(Math.min(sw.x, ne.x));
                    var minY = Math.round(Math.min(sw.y, ne.y));
                    var maxX = Math.round(Math.max(sw.x, ne.x));
                    var maxY = Math.round(Math.max(sw.y, ne.y));
                    var width = maxX - minX;
                    var height = maxY - minY;
                    
                    // Build SVG string
                    var svgString = '<svg xmlns="http://www.w3.org/2000/svg">' +
                        '<polygon points="' + svgPoints + '"/>' +
                        '</svg>';
                    
                    console.log('[IIIF MAP] Generated SVG selector:', svgString);
                    
                    iiifSelector = {
                        type: 'svg',
                        value: svgString
                    };
                } else {
                    // ✅ Fallback for other layer types
                    console.warn('[IIIF MAP] Unsupported layer type:', layer.constructor.name);
                    iiifSelector = {
                        type: 'unknown',
                        value: ''
                    };
                }
                
                console.log('[IIIF MAP] Generated selector:', iiifSelector);
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
                var latlngs = [];
                var zoom = self.map.getMaxZoom();

                // ✅ FIX: Check for <polygon points="..."> format first
                var polygonMatch = /points="([^"]+)"/.exec(svgString);
                if (polygonMatch && polygonMatch[1]) {
                    console.log('[IIIF MAP] Parsing SVG polygon format');
                    
                    // Split "x1,y1 x2,y2 x3,y3" into coordinate pairs
                    var pointsStr = polygonMatch[1].trim();
                    var coords = pointsStr.split(/\s+/);
                    
                    coords.forEach(function(coord) {
                        var parts = coord.split(',');
                        if (parts.length === 2) {
                            var px = parseFloat(parts[0]);
                            var py = parseFloat(parts[1]);
                            if (!isNaN(px) && !isNaN(py)) {
                                latlngs.push(self.map.unproject([px, py], zoom));
                            }
                        }
                    });
                    
                    console.log('[IIIF MAP] Parsed polygon points:', latlngs.length);
                } else {
                    // ✅ Fallback: Try path d="..." format
                    var pathMatch = /d="([^"]+)"/.exec(svgString);
                    if (!pathMatch || !pathMatch[1]) {
                        console.warn('[IIIF MAP] No points or d attribute found in SVG:', svgString);
                        return null;
                    }

                    console.log('[IIIF MAP] Parsing SVG path format');
                    var commands = pathMatch[1].split(/(?=[MLZ])/);

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
                }

                if (latlngs.length > 0) {
                    console.log('[IIIF MAP] Drawing polygon with', latlngs.length, 'points');
                    
                    var poly = L.polygon(latlngs, {
                        color: '#3388ff', weight: 2, dashArray: '5, 5', fillOpacity: 0.1
                    });

                    var annos = ko.unwrap(self.existingAnnotations);
                    var anno = annos[annotationIndex];
                    var chars = anno && anno.resource && anno.resource.chars ? anno.resource.chars : '';
                    var parsed = parseAnnotationChars(chars);

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
                } else {
                    console.warn('[IIIF MAP] No valid points parsed from SVG');
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

                    var popupData = { 
                        label: parsed.label || label, 
                        description: parsed.description, 
                        annotationIndex: annotationIndex,
                        canDelete: !!self.onAnnotationDeleted
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

        // =============================================================
        // Drawing existing annotations
        // =============================================================
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

                    // ✅ FIX: Handle both SVG selector formats
            
            // Format 1: SVG with SpecificResource wrapper (standard IIIF)
            // "on": { "@type": "oa:SpecificResource", "selector": { "@type": "oa:SvgSelector", "value": "..." } }
            if (anno.on && typeof anno.on === 'object' && anno.on.selector) {
                if (anno.on.selector['@type'] === 'oa:SvgSelector' && anno.on.selector.value) {
                    console.log('[IIIF MAP] SVG annotation (SpecificResource format) at index', idx);
                    layer = drawSvgOnMap(anno.on.selector.value, label, annoId, idx);
                }
            }
            // Format 2: Old format with selector directly on "on"
            // "on": { "selector": { "@type": "oa:SvgSelector", "value": "..." } }
            else if (anno.on && anno.on.selector && anno.on.selector['@type'] === 'oa:SvgSelector') {
                console.log('[IIIF MAP] SVG annotation (direct selector format) at index', idx);
                layer = drawSvgOnMap(anno.on.selector.value, label, annoId, idx);
            }
            // Format 3: XYWH in string
            // "on": "http://...#xywh=100,200,300,400"
            else if (typeof anno.on === 'string' && anno.on.indexOf('#xywh=') > -1) {
                console.log('[IIIF MAP] XYWH annotation at index', idx);
                var xywh = anno.on.split('#xywh=')[1].split(',').map(parseFloat);
                layer = drawXywhOnMap(xywh, label, annoId, idx);
            }
            else {
                console.warn('[IIIF MAP] Unsupported annotation format at index', idx, ':', anno);
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

        // =============================================================
        // Map initialization
        // =============================================================
        function ensureMap(container) {
            if (!L || self._mapInitialized) return;
            if (self.map) self.map.remove();

            console.log('[IIIF MAP] Creating Leaflet    asadsadasdasdasmap...');

            self.map = L.map(container, {
                crs: L.CRS.Simple,
                center: [0, 0],
                zoom: 0,
                zoomControl: true
            });

            self.map.addLayer(self.drawnItems);
            self.map.addLayer(self.existingItems);
            if (self.onMapClick) {
                    self.map.on('click', function(e) {
                        if (!self._imageInfoLoaded) return;

                        var z = self.map.getMaxZoom();
                        var p = self.map.project(e.latlng, z); // piksele IIIF

                        self.onMapClick({
                            latlng: e.latlng,
                            pixel: { x: p.x, y: p.y },
                            zoom: z
                        });
                    });
                }
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

        // =============================================================
        // ✅ MULTI-LAYER IMAGE LOADING
        // =============================================================
        ko.computed(function() {
            var urlsRaw = ko.unwrap(self.serviceUrls);
            var container = document.getElementById('iiif-map-container');

            if (!urlsRaw || urlsRaw.length === 0 || !container || !L) {
                return;
            }

            if (!self.map) ensureMap(container);

            // Remove existing IIIF layers
            self.iiifLayers.forEach(function(lyr) {
                if (lyr) self.map.removeLayer(lyr);
            });
            self.iiifLayers = [];

            // Remove existing layer control
            if (self.layerControl) {
                self.map.removeControl(self.layerControl);
                self.layerControl = null;
            }

            self._imageInfoLoaded = false;

            var urls = urlsRaw.map(normalizeToCurrentHost);
            
            console.log('[IIIF MAP] Loading', urls.length, 'IIIF layer(s):', urls);

            // ✅ NEW: Extract globalid from each URL (assumes pattern: /iiif/3/{globalid}/)
            function extractGlobalidFromUrl(url) {
                var match = /\/iiif\/[23]\/([a-f0-9-]+)/i.exec(url);
                return match ? match[1] : null;
            }

            console.log('[IIIF MAP] Loading', urls.length, 'IIIF layer(s):', urls);
                        console.log('[IIIF MAP] serviceUrlToGlobalidMap:', self.serviceUrlToGlobalidMap);

                        var loadPromises = urls.map(function(url, idx) {
                            var infoUrl = iiifInfoUrlFromService(url);
                            
                            return $.getJSON(infoUrl).then(function(info) {
                                var layer = L.tileLayer.iiif(infoUrl, {});
                                
                                // ✅ Get globalid from mapping (passed from parent)
                                var globalid = self.serviceUrlToGlobalidMap[url];
                                
                                console.log('[IIIF MAP] Layer', idx + 1, '- URL:', url);
                                console.log('[IIIF MAP] Layer', idx + 1, '- Mapped globalid:', globalid);
                                
                                return {
                                    layer: layer,
                                    info: info,
                                    globalid: globalid,
                                    label: 'Layer ' + (idx + 1) + ' (' + (info.width || '?') + 'x' + (info.height || '?') + ')'
                                };
                            });
                        });

                        Promise.all(loadPromises).then(function(layerDataArray) {
                            var baseLayers = {};
                            
                            // Add only the first layer to the map initially
                            layerDataArray.forEach(function(layerData, idx) {
                                if (idx === 0) {    
                                    layerData.layer.addTo(self.map);
                                    // ✅ Set initial active layer
                                    if (layerData.globalid) {
                                        console.log('[IIIF MAP] Setting initial active globalid:', layerData.globalid);
                                        self.activeLayerGlobalid(layerData.globalid);
                                    }
                                }
                                self.iiifLayers.push(layerData.layer);
                                baseLayers[layerData.label] = layerData.layer;
                                
                                // ✅ Store globalid reference on layer
                                layerData.layer._globalid = layerData.globalid;
                                
                                console.log('[IIIF MAP] Layer', idx + 1, 'configured with globalid:', layerData.globalid);
                            });

                // Create layer control with base layers
                if (Object.keys(baseLayers).length > 1) {
                    self.layerControl = L.control.layers(baseLayers, null, {
                        position: 'topright',
                        collapsed: false
                    });
                    self.layerControl.addTo(self.map);

                    // ✅ NEW: Listen for layer changes
                    self.map.on('baselayerchange', function(e) {
                        var newLayer = e.layer;
                        var newGlobalid = newLayer._globalid;
                        
                        console.log('[IIIF MAP] Layer changed to:', e.name, 'globalid:', newGlobalid);
                        
                        if (newGlobalid) {
                            self.activeLayerGlobalid(newGlobalid);
                        }
                    });
                }

                setTimeout(function() {
                    self.map.invalidateSize();

                    // Fit bounds to first layer's dimensions
                    var firstInfo = layerDataArray[0].info;
                    if (firstInfo && firstInfo.width && firstInfo.height) {
                        try {
                            var maxZoom = self.map.getMaxZoom();
                            var southWest = self.map.unproject([0, firstInfo.height], maxZoom);
                            var northEast = self.map.unproject([firstInfo.width, 0], maxZoom);
                            var bounds = new L.LatLngBounds(southWest, northEast);
                            self.map.fitBounds(bounds);
                        } catch (err) {
                            console.warn('[IIIF MAP] FitBounds failed:', err);
                        }
                    }

                    self._imageInfoLoaded = true;
                    self.drawExisting();
                }, 200);

                console.log('[IIIF MAP] Successfully loaded', layerDataArray.length, 'layer(s)');
            }).catch(function(err) {
                console.error('[IIIF MAP] Failed to load IIIF layer(s):', err);
            });
        });
    };

    return ko.components.register('iiif-map-viewer', {
        viewModel: viewModel,
        template: mapTemplate
    });
});
