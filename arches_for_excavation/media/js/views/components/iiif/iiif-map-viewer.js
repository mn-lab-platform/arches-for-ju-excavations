define([
    'knockout',
    'leaflet',
    'leaflet-draw',
    'leaflet-iiif',
    'templates/views/components/iiif/iiif-map-viewer.htm'
], function(ko, Leaflet, _draw, _iiif, mapTemplate) {
    'use strict';

    var viewModel = function(params) {
        var self = this;
        var L = Leaflet || window.L;

        // --- Parametry wejściowe ---
        self.serviceUrl = params.serviceUrl; 
        self.existingAnnotations = params.existingAnnotations || ko.observableArray([]);
        self.onAnnotationCreated = params.onAnnotationCreated;
        self.onAnnotationDeleted = params.onAnnotationDeleted; // ✅ NEW: Callback for deletion

        // --- Stan Mapy ---
        self.map = null;
        self.iiifLayer = null;
        self.drawnItems = new L.FeatureGroup(); 
        self.existingItems = new L.FeatureGroup(); 
        self._mapInitialized = false;
        self._imageInfoLoaded = false;

        // ✅ NEW: Map to track existing annotation layers by their ID
        self._existingLayerMap = {};

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
                    // Fix na zagnieżdżone tablice Leafleta
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

                return {
                    geometry: dbGeometry,
                    selector: iiifSelector
                };
            } catch (e) {
                console.error('[IIIF MAP] Error converting layer to selector:', e);
                return { geometry: null, selector: null };
            }
        }

        // ✅ Helper function to parse HTML chars field
        function parseAnnotationChars(chars) {
            if (!chars) return { label: '', description: '' };
            
            // Try to extract from HTML format: <p><b>LABEL</b></p><p>DESCRIPTION</p>
            var labelMatch = /<b>(.*?)<\/b>/i.exec(chars);
            var descMatch = /<p>(?!<b>)(.*?)<\/p>/i.exec(chars);
            
            var label = labelMatch ? labelMatch[1].trim() : '';
            var description = descMatch ? descMatch[1].trim() : '';
            
            // Fallback: if no HTML tags, treat whole thing as label
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
                    
                    // ✅ Parse HTML chars field
                    var annos = ko.unwrap(self.existingAnnotations);
                    var anno = annos[annotationIndex];
                    var chars = anno && anno.resource && anno.resource.chars ? anno.resource.chars : '';
                    var parsed = parseAnnotationChars(chars);
                    
                    var popupData = {
                        label: parsed.label || label,
                        description: parsed.description,
                        annotationIndex: annotationIndex
                    };
                    
                    var popupNode = document.createElement('div');
                    popupNode.innerHTML = document.getElementById('iiif-annotation-popup-template').innerHTML;
                    ko.applyBindings(popupData, popupNode);
                    
                    poly.bindPopup(popupNode, {
                        maxWidth: 300,
                        className: 'iiif-annotation-popup'
                    });
                    
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
                if (xywh.length === 4 && xywh.every(n => !isNaN(n))) {
                    var zoom = self.map.getMaxZoom();
                    var p1 = self.map.unproject([xywh[0], xywh[1]], zoom);
                    var p2 = self.map.unproject([xywh[0] + xywh[2], xywh[1] + xywh[3]], zoom);
                    
                    var rect = L.rectangle([p1, p2], { 
                        color: '#3388ff', dashArray: '5, 5', fillOpacity: 0.1 
                    });
                    
                    // ✅ Parse HTML chars field
                    var annos = ko.unwrap(self.existingAnnotations);
                    var anno = annos[annotationIndex];
                    var chars = anno && anno.resource && anno.resource.chars ? anno.resource.chars : '';
                    var parsed = parseAnnotationChars(chars);
                    
                    var popupData = {
                        label: parsed.label || label,
                        description: parsed.description,
                        annotationIndex: annotationIndex
                    };
                    
                    var popupNode = document.createElement('div');
                    popupNode.innerHTML = document.getElementById('iiif-annotation-popup-template').innerHTML;
                    ko.applyBindings(popupData, popupNode);
                    
                    rect.bindPopup(popupNode, {
                        maxWidth: 300,
                        className: 'iiif-annotation-popup'
                    });
                    
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
            if (!self.map || !self._imageInfoLoaded) {
                return;
            }

            self.existingItems.clearLayers();
            self._existingLayerMap = {}; // ✅ Clear tracking map
            
            var annos = ko.unwrap(self.existingAnnotations);
            
            if (!annos || annos.length === 0) return;

            console.log('[IIIF MAP] Drawing', annos.length, 'existing annotations');

            annos.forEach(function(anno, idx) {
                try {
                    var label = (anno.resource && anno.resource.chars) ? anno.resource.chars : 'Annotation ' + (idx + 1);
                    // ✅ Use index as identifier instead of @id
                    var annoId = 'anno-index-' + idx;
                    var layer = null;
                    
                    // SVG
                    if (anno.on && anno.on.selector && anno.on.selector['@type'] === 'oa:SvgSelector') {
                        layer = drawSvgOnMap(anno.on.selector.value, label, annoId, idx);
                    }
                    // XYWH
                    else if (typeof anno.on === 'string' && anno.on.indexOf('#xywh=') > -1) {
                        var xywh = anno.on.split('#xywh=')[1].split(',').map(parseFloat);
                        layer = drawXywhOnMap(xywh, label, annoId, idx);
                    }
                    
                    // ✅ Track layer by annotation ID
                    if (layer) {
                        self._existingLayerMap[annoId] = { layer: layer, index: idx };
                    }
                } catch (e) {
                    console.error('[IIIF MAP] Error drawing annotation', idx, e);
                }
            });
        };

        // ✅ NEW: Delete annotation by index
        self.deleteAnnotation = function(annotationIndex) {
            console.log('[IIIF MAP] Deleting annotation at index:', annotationIndex);
            
            var annoId = 'anno-index-' + annotationIndex;
            
            // Remove from map
            var tracked = self._existingLayerMap[annoId];
            if (tracked && tracked.layer) {
                self.existingItems.removeLayer(tracked.layer);
                delete self._existingLayerMap[annoId];
            }
            
            // Notify parent component with INDEX
            if (self.onAnnotationDeleted) {
                self.onAnnotationDeleted(annotationIndex);
            }
        };

        // ✅ NEW: Expose delete function globally for popup buttons (now takes index)
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
                crs: L.CRS.Simple, // Kluczowe dla IIIF
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

            self._mapInitialized = true;
        }

        // =====================================================================
        // ŁADOWANIE OBRAZU (KO COMPUTED)
        // =====================================================================
        ko.computed(function() {
            var url = ko.unwrap(self.serviceUrl);
            var container = document.getElementById('iiif-map-container');

            if (url && container && L && $) {
                
                if (!self.map) ensureMap(container);
                
                if (self.iiifLayer) {
                    self.map.removeLayer(self.iiifLayer);
                }

                // Reset flagi gotowości
                self._imageInfoLoaded = false;

                var infoUrl = url.replace(/\/$/, '') + '/info.json';
                console.log('[IIIF MAP] Loading info.json:', infoUrl);
                
                $.getJSON(infoUrl)
                    .done(function(info) {
                        // 1. Dodaj warstwę
                        self.iiifLayer = L.tileLayer.iiif(infoUrl).addTo(self.map);
                        
                        // 2. CRUCIAL FIX: Czekamy chwilę, aż Leaflet przetrawi nowy CRS i rozmiary
                        //    Zanim wywołamy fitBounds lub zaczniemy rysować.
                        setTimeout(function() {
                            // Wymuś przeliczenie rozmiaru kontenera (częsty błąd w Arches tabs)
                            self.map.invalidateSize();

                            if (info.width && info.height) {
                                // Oblicz bounds bezpiecznie
                                try {
                                    // Używamy maxZoom z nowej warstwy
                                    var maxZoom = self.map.getMaxZoom();
                                    var southWest = self.map.unproject([0, info.height], maxZoom);
                                    var northEast = self.map.unproject([info.width, 0], maxZoom);
                                    var bounds = new L.LatLngBounds(southWest, northEast);
                                    
                                    self.map.fitBounds(bounds);
                                } catch (err) {
                                    console.warn('[IIIF MAP] FitBounds failed (ignorable):', err);
                                }
                            }
                            
                            // 3. Teraz możemy bezpiecznie rysować
                            self._imageInfoLoaded = true;
                            self.drawExisting();
                            
                        }, 200); // 200ms opóźnienia dla stabilności
                    })
                    .fail(function(jqxhr, textStatus, error) {
                        console.error('[IIIF MAP] Failed to load info.json:', error);
                    });
            }
        });
    };

    return ko.components.register('iiif-map-viewer', {
        viewModel: viewModel,
        template: mapTemplate
    });
});