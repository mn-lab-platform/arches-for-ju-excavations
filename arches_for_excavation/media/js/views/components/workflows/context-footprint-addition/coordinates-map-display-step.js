define([
    'knockout',
    'arches',
    'maplibre-gl',
    '../../../../services/basemap-service',
    'templates/views/components/workflows/context-footprint-addition/coordinates-map-display-step.htm',
    '../../../../../css/components/maplibre-viewer/index.css' 
], function(ko, arches, maplibreGl, basemapServiceModule, template) {
    class Point {
        constructor(label, x, y, z) {
            this.label = label;
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    class SimpleBasemapControl {
        constructor(options) {
            const defaultBasemap = {
                source_info: {
                    name: 'carto-voyager',
                    tiles: ['https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'],
                    tileSize: 256,
                    type: 'raster'
                },
                layer_info: {
                    name: 'Default Basemap',
                    id: 'carto-voyager-layer',
                    source: 'carto-voyager',
                    icon: 'fa fa-home'
                }
            };

            const areLayersProvided = options && options.layers && options.layers.length > 0;
            this._layers = areLayersProvided ? [...options.layers, defaultBasemap] : [defaultBasemap];
            this._activeLayerId = this._layers[0].layer_info.id;
            
            this._container = document.createElement('div');
            this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group basemap-control-panel';
            // Basic styling to mimic a floating panel; adjust as needed to match your css
            this._container.style.padding = '5px';
            this._container.style.backgroundColor = '#fff';
            this._container.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
            this._container.style.borderRadius = '4px';
            this._container.style.display = 'flex';
            this._container.style.flexDirection = 'column';
            this._container.style.gap = '5px';
        }

        onAdd(map) {
            this._map = map;
            
            this._layers.forEach(layer => {
                const { source_info, layer_info } = layer;

                // 1. Add source and layer to map if they don't exist
                if (!this._map.getSource(source_info.name)) {
                    this._map.addSource(source_info.name, source_info);
                }
                if (!this._map.getLayer(layer_info.id)) {
                    // Insert at the bottom-most layer (before any features are drawn)
                    this._map.addLayer({
                        id: layer_info.id,
                        type: 'raster',
                        source: layer_info.source,
                        layout: {
                            visibility: this._activeLayerId === layer_info.id ? 'visible' : 'none'
                        }
                    });
                }

                // 2. Build UI button for this layer
                const tile = document.createElement("div");
                tile.style.cursor = 'pointer';
                tile.style.padding = '4px 8px';
                tile.style.borderRadius = '3px';
                tile.style.display = 'flex';
                tile.style.alignItems = 'center';
                tile.style.gap = '8px';

                if (this._activeLayerId === layer_info.id) {
                    tile.style.backgroundColor = '#e0e0e0';
                }

                tile.innerHTML = `<i class="${layer_info.icon || 'fa fa-map'}"></i> <span style="font-size: 12px;">${layer_info.name}</span>`;

                // 3. Handle switching
                tile.addEventListener("click", () => {
                    this._switchBasemap(layer_info.id, tile);
                });

                this._container.appendChild(tile);
            });
            
            return this._container;
        }

        _switchBasemap(newLayerId, clickedTile) {
            // Hide all managed basemaps
            this._layers.forEach(l => {
                if (this._map.getLayer(l.layer_info.id)) {
                    this._map.setLayoutProperty(l.layer_info.id, 'visibility', 'none');
                }
            });

            // Show selected
            if (this._map.getLayer(newLayerId)) {
                this._map.setLayoutProperty(newLayerId, 'visibility', 'visible');
            }
            
            // Update UI styling
            Array.from(this._container.children).forEach(el => el.style.backgroundColor = 'transparent');
            clickedTile.style.backgroundColor = '#e0e0e0';
            this._activeLayerId = newLayerId;
        }

        onRemove() {
            this._container.parentNode?.removeChild(this._container);
            this._map = undefined;
        }
    }

    return ko.components.register('coordinates-map-display-step', {
        viewModel: function(params) {
            const self = this;

            const basemapService = basemapServiceModule.default || basemapServiceModule;

            if (params.value) {
                params.value({
                    verified: true
                });
            }
            
            const inputData = ko.unwrap(params.coordinatesData);
            
            let rawText = '';
            let rawIgnore = false;

            if (inputData && typeof inputData === 'object') {
                rawText = inputData.text || '';
                rawIgnore = inputData.ignoreLastLine || false;
            }

            self.coordinatesText = ko.observable(rawText);
            self.ignoreLastLine = ko.observable(rawIgnore);
            
            self._extractPointsFromText = function(text) {
                const points = [];
                const trimmed = (text || '').trim();
                if (!trimmed) return points;

                const lines = trimmed.split('\n').filter(l => l.trim().length > 0);
                const delimiter = trimmed.includes('\t') ? '\t' : ' ';

                lines.forEach(line => {
                    if (self.ignoreLastLine() && line === lines[lines.length - 1]) {
                        return;
                    }
                    const parts = line.trim().split(delimiter).filter(Boolean);
                    if (parts.length >= 4) {
                        const label = parts[0];
                        const x = parseFloat(parts[1]);
                        const y = parseFloat(parts[2]);
                        const z = parseFloat(parts[3]);
                        points.push(new Point(label, x, y, z));
                    }
                });

                return points;
            };

            self._findCentroid = function(points) {
                if (!points || points.length === 0) return null;
                let xSum = 0;
                let ySum = 0;
                points.forEach(pt => {
                    xSum += pt.x;
                    ySum += pt.y;
                });
                return [xSum / points.length, ySum / points.length];
            };

            self._generateMarkers = function(points) {
                points.forEach(pt => {
                    const popupContent = `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-width: 200px; padding: 2px;">
                            <div style="font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #4287f5;">
                                ${pt.label}
                            </div>
                            <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 13px; color: #4a4a4a; padding: 2px;">
                                <span style="font-weight: 600; color: #666;">X:</span>
                                <span style="font-family: 'Courier New', monospace;">${pt.x.toFixed(3)}</span>
                                <span style="font-weight: 600; color: #666;">Y:</span>
                                <span style="font-family: 'Courier New', monospace;">${pt.y.toFixed(3)}</span>
                                <span style="font-weight: 600; color: #666;">Z:</span>
                                <span style="font-family: 'Courier New', monospace;">${pt.z.toFixed(1)}</span>
                            </div>
                        </div>
                    `;

                    const popup = new maplibreGl.Popup({
                        maxWidth: '300px',
                        offset: [0, -20]
                    }).setHTML(popupContent);

                    new maplibreGl.Marker({
                        color: "#4287f5",
                        draggable: false
                    })
                        .setLngLat([pt.x, pt.y])
                        .setPopup(popup)
                        .addTo(self.map);
                });
            }

            self._drawFeatures = function(points) {
                if (points.length === 1) {
                    self.map.setCenter([points[0].x, points[0].y]);
                } 
                else if (points.length === 2) {
                    const lngLats = points.map(pt => [pt.x, pt.y]);
                    
                    self.map.addSource('line-source', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: lngLats
                            }
                        }
                    });

                    self.map.addLayer({
                        id: 'line-layer',
                        type: 'line',
                        source: 'line-source',
                        paint: {
                            'line-color': 'blue',
                            'line-width': 2
                        }
                    });

                    const bounds = new maplibreGl.LngLatBounds();
                    lngLats.forEach(coord => bounds.extend(coord));
                    self.map.fitBounds(bounds, { padding: 30 });
                } else {
                    const lngLats = points.map(pt => [pt.x, pt.y]);
                    const polygonCoords = [...lngLats, lngLats[0]];

                    self.map.addSource('polygon-source', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [polygonCoords]
                            }
                        }
                    });

                    self.map.addLayer({
                        id: 'polygon-fill',
                        type: 'fill',
                        source: 'polygon-source',
                        paint: {
                            'fill-color': 'blue',
                            'fill-opacity': 0.2
                        }
                    });

                    self.map.addLayer({
                        id: 'polygon-outline',
                        type: 'line',
                        source: 'polygon-source',
                        paint: {
                            'line-color': 'blue',
                            'line-width': 2
                        }
                    });

                    const bounds = new maplibreGl.LngLatBounds();
                    lngLats.forEach(coord => bounds.extend(coord));
                    self.map.fitBounds(bounds, { padding: 30 });
                }
            }

            const points = self._extractPointsFromText(self.coordinatesText());
            const centroid = self._findCentroid(points) || [0, 0];

            self.map = new maplibreGl.Map({
                container: 'coordinates-map-display',
                style: {
                    version: 8,
                    sources: {},
                    layers: [] 
                },
                center: centroid,
                zoom: 15,
                maxZoom: 23,
            });

            self.map.on('load', () => {
                if (points.length === 0) {
                    return;
                }

                basemapService.getBasemapsAndOverlaysInfo().then(info => {
                    const basemapInfo = info.basemaps;

                    const basemapControl = new SimpleBasemapControl({
                        layers: basemapInfo
                    });
                    self.map.addControl(basemapControl, 'top-right');

                    self._generateMarkers(points);
                    self._drawFeatures(points); // Ensure these lines draw on top of the basemap
                });
            });
        },
        template: template
    });
});