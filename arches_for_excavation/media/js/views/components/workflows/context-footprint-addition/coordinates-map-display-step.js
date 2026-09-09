define([
    'knockout',
    'arches',
    'maplibre-gl',
    'proj4',
    '../../../../services/basemap-service',
    '../../../../services/resource-service',
    'templates/views/components/workflows/context-footprint-addition/coordinates-map-display-step.htm',
    '../../../../../css/components/maplibre-viewer/index.css' 
], function(ko, arches, maplibreGl, proj4, basemapServiceModule, resourceServiceModule, template) {
    class Point {
        constructor(label, x, y, z) {
            this.label = label || null;
            this.x = x; 
            this.y = y;
            this.z = z;
        }
    }

    class LayerControl {
        constructor(options) {
            this._basemaps = options.basemaps || [];
            this._overlays = options.overlays || [];
            this._activeBasemapId = this._basemaps.length > 0
                ? this._basemaps[0].layer_info.id
                : null;
            
            this._container = document.createElement('div');
            this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
            this._container.style.padding = '10px';
            this._container.style.backgroundColor = '#fff';
            this._container.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
            this._container.style.borderRadius = '4px';
            this._container.style.display = 'flex';
            this._container.style.flexDirection = 'column';
            this._container.style.gap = '10px';
            this._container.style.minWidth = '150px';
            this._container.style.overflow = 'hidden';
            this._container.style.boxSizing = 'border-box';
        }

        onAdd(map) {
            this._map = map;
            this._initializeLayers();
            this._buildBasemapSection();

            if (this._overlays.length > 0) {
                this._buildDivider();
                this._buildOverlaySection();
            }

            this._resizeHandler = () => {
                if (this._map && this._map.getContainer()) {
                    const mapHeight = this._map.getContainer().clientHeight;
                    const controlHeight = Math.max(mapHeight - 20, 120);
                    this._container.style.height = `${controlHeight}px`;
                    this._container.style.maxHeight = `${controlHeight}px`;
                }
            };

            this._map.on('resize', this._resizeHandler);
            
            this._resizeHandler();

            return this._container;
        }

        onRemove() {
            if (this._map && this._resizeHandler) {
                this._map.off('resize', this._resizeHandler);
            }
            this._container.parentNode?.removeChild(this._container);
            this._map = undefined;
        }

        _initializeLayers() {
            this._basemaps.forEach(basemap => {
                if (basemap.source_info && !this._map.getSource(basemap.source_info.name)) {
                    const { name, ...sourceDef } = basemap.source_info;
                    this._map.addSource(name, sourceDef);
                }

                if (!this._map.getLayer(basemap.layer_info.id)) {
                    const firstLayerId = this._map.getStyle().layers?.[0]?.id;
                    const basemapLayer = {
                        ...basemap.layer_info,
                        layout: {
                            ...(basemap.layer_info.layout || {}),
                            visibility: this._activeBasemapId === basemap.layer_info.id ? 'visible' : 'none'
                        }
                    };

                    if (firstLayerId) {
                        this._map.addLayer(basemapLayer, firstLayerId);
                    } else {
                        this._map.addLayer(basemapLayer);
                    }
                }
            });

            this._overlays.forEach(overlay => {
                const sources = overlay.sources || (overlay.source_info ? [overlay.source_info] : []);
                sources.forEach(source => {
                    if (source && source.name && !this._map.getSource(source.name)) {
                        const { name, ...sourceDef } = source;
                        this._map.addSource(name, sourceDef);
                    }
                });
                
                overlay.layers.forEach(layer => {
                    if (layer.source && !this._map.getSource(layer.source)) {
                        console.warn(`Skipping overlay layer ${layer.id}: source ${layer.source} is not registered.`);
                        return;
                    }

                    if (!this._map.getLayer(layer.id)) {
                        this._map.addLayer({
                            ...layer,
                            layout: {
                                ...(layer.layout || {}),
                                visibility: overlay.visible !== false ? 'visible' : 'none'
                            }
                        });
                    }
                });
            });

            ['polygon-fill', 'polygon-outline'].forEach(layerId => {
                if (this._map.getLayer(layerId)) {
                    this._map.moveLayer(layerId);
                }
            });
        }

        _buildBasemapSection() {
            const section = document.createElement('div');
            section.style.display = 'flex';
            section.style.flexDirection = 'column';
            section.style.gap = '6px';
            section.style.overflowY = 'auto';
            section.style.flex = '0 1 auto';
            section.style.minHeight = '0';
            section.style.maxHeight = '50%';
            
            const header = document.createElement('strong');
            header.innerText = 'Basemaps';
            header.style.fontSize = '12px';
            header.style.color = '#666';
            section.appendChild(header);

            this._basemaps.forEach(layer => {
                const { layer_info } = layer;
                const label = document.createElement('label');
                label.style.display = 'flex';
                label.style.alignItems = 'center';
                label.style.gap = '8px';
                label.style.fontSize = '13px';
                label.style.cursor = 'pointer';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'basemap-toggle';
                radio.checked = this._activeBasemapId === layer_info.id;
                radio.addEventListener('change', () => this._switchBasemap(layer_info.id));

                label.appendChild(radio);
                label.appendChild(document.createTextNode(layer_info.name));
                section.appendChild(label);
            });

            this._container.appendChild(section);
        }

        _buildOverlaySection() {
            const section = document.createElement('div');
            section.style.display = 'flex';
            section.style.flexDirection = 'column';
            section.style.gap = '6px';
            section.style.paddingInline = '8px';
            section.style.overflowY = 'auto';
            section.style.flex = '1 1 0';
            section.style.minHeight = '0';

            const header = document.createElement('strong');
            header.innerText = 'Resource Overlays';
            header.style.fontSize = '12px';
            header.style.color = '#666';
            section.appendChild(header);

            this._overlays.forEach(overlay => {
                const label = document.createElement('label');
                label.style.display = 'flex';
                label.style.alignItems = 'center';
                label.style.gap = '8px';
                label.style.fontSize = '13px';
                label.style.cursor = 'pointer';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = overlay.visible !== false;
                
                checkbox.addEventListener('change', event => {
                    overlay.layers.forEach(layer => {
                        if (this._map.getLayer(layer.id)) {
                            this._map.setLayoutProperty(layer.id, 'visibility', event.target.checked ? 'visible' : 'none');
                        }
                    });
                });

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(overlay.name));
                section.appendChild(label);
            });

            this._container.appendChild(section);
        }

        _buildDivider() {
            const divider = document.createElement('div');
            divider.style.height = '1px';
            divider.style.backgroundColor = '#ddd';
            divider.style.margin = '4px 0';
            this._container.appendChild(divider);
        }

        _switchBasemap(newLayerId) {
            this._basemaps.forEach(layer => {
                if (this._map.getLayer(layer.layer_info.id)) {
                    this._map.setLayoutProperty(layer.layer_info.id, 'visibility', 'none');
                }
            });

            if (this._map.getLayer(newLayerId)) {
                this._map.setLayoutProperty(newLayerId, 'visibility', 'visible');
            }

            this._activeBasemapId = newLayerId;
        }
    }

    return ko.components.register('coordinates-map-display-step', {
        viewModel: function(params) {
            const self = this;
            const basemapService = basemapServiceModule.default || basemapServiceModule;
            const resourceService = resourceServiceModule.default || resourceServiceModule;
            const inputData = ko.unwrap(params.coordinatesData);
            
            let rawText = '';
            let rawIgnore = false;

            if (inputData && typeof inputData === 'object') {
                rawText = inputData.text || '';
                rawIgnore = inputData.ignoreLastLine || false;
            }

            self.coordinatesText = ko.observable(rawText);
            self.ignoreLastLine = ko.observable(rawIgnore);
            self.crsId = params.crsId || null;
            self.crsProjDefinition = null;

            self.getProjDefinitionFromCRSId = async function() {
                if (!self.crsId) return null;
                try {
                    const crsResource = await resourceService.getOne(self.crsId);
                    return crsResource.resource["Definition (files)"]?.find((crs) => crs.Type === 'PROJ4').String || null;
                } catch (error) {
                    console.error('Error fetching CRS definition:', error);
                    return null;
                }
            };

            self._extractPointsFromText = function(text) {
                const points = [];
                const trimmed = (text || '').trim();
                if (!trimmed) return points;

                const lines = trimmed.split('\n').filter(l => l.trim().length > 0);
                const delimiter = trimmed.includes('\t') ? '\t' : ' ';

                lines.forEach((line, index) => {
                    if (self.ignoreLastLine() && index === lines.length - 1) {
                        return;
                    }
                    const parts = line.trim().split(delimiter).filter(Boolean);
                    if (parts.length === 3 || parts.length === 4) {
                        const coordinateStart = parts.length === 4 ? 1 : 0;
                        const label = parts.length === 4 ? parts[0] : null;
                        const x = parseFloat(parts[coordinateStart]);
                        const y = parseFloat(parts[coordinateStart + 1]);
                        const z = parseFloat(parts[coordinateStart + 2]);
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
                                ${pt.label || 'No Label'}
                            </div>
                            <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 13px; color: #4a4a4a; padding: 2px;">
                                <span style="font-weight: 600; color: #666;">Lng:</span>
                                <span style="font-family: 'Courier New', monospace;">${pt.x.toFixed(6)}</span>
                                <span style="font-weight: 600; color: #666;">Lat:</span>
                                <span style="font-family: 'Courier New', monospace;">${pt.y.toFixed(6)}</span>
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
            };

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
            };

            (async function() {
                self.crsProjDefinition = await self.getProjDefinitionFromCRSId();
                const rawPoints = self._extractPointsFromText(self.coordinatesText());
                
                let displayPoints = rawPoints;
                let projectedTextStr = self.coordinatesText();

                if (self.crsProjDefinition && rawPoints.length > 0) {
                    const wgs84 = '+proj=longlat +datum=WGS84 +no_defs';
                    
                    displayPoints = rawPoints.map(pt => {
                        const transformed = proj4(self.crsProjDefinition, wgs84, [pt.x, pt.y]);
                        return new Point(pt.label, transformed[0], transformed[1], pt.z);
                    });

                    const delimiter = (self.coordinatesText() || '').includes('\t') ? '\t' : ' ';
                    const lines = displayPoints.map(pt => `${pt.label || ''}${delimiter}${pt.x.toFixed(8)}${delimiter}${pt.y.toFixed(8)}${delimiter}${pt.z}`);
                    projectedTextStr = lines.join('\n');
                }

                if (params.value) {
                    params.value({
                        text: self.coordinatesText(),
                        ignoreLastLine: self.ignoreLastLine(),
                        projectedText: projectedTextStr,
                        verified: true
                    });
                }

                const centroid = self._findCentroid(displayPoints) || [0, 0];

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
                    if (displayPoints.length > 0) {
                        self._generateMarkers(displayPoints);
                        self._drawFeatures(displayPoints);
                    }

                    basemapService.getBasemapsAndOverlaysInfo().then(info => {
                        
                        const defaultBasemap = {
                            source_info: {
                                name: 'osm-standard',
                                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                                tileSize: 256,
                                type: 'raster',
                                maxzoom: 19
                            },
                            layer_info: {
                                name: 'Default Basemap',
                                id: 'osm-standard-layer',
                                source: 'osm-standard',
                                type: 'raster'
                            }
                        };

                        const providedBasemaps = info.basemaps || [];
                        const basemapInfo = [
                            ...providedBasemaps.map(basemap => ({
                                ...basemap,
                                layer_info: {
                                    ...basemap.layer_info,
                                    type: 'raster',
                                    source: basemap.layer_info.source || basemap.source_info.name
                                }
                            })),
                            defaultBasemap
                        ];

                        const mapLayers = (arches.default && arches.default.mapLayers) || [];
                        const mapSources = (arches.default && arches.default.mapSources) || {};
                        
                        const overlayInfo = mapLayers
                            .filter(layer => layer.isoverlay === true)
                            .map(layer => {
                                const layerDefinitions = layer.layer_definitions || [];
                                const sourceIds = [...new Set(
                                    layerDefinitions.map(layerDefinition => layerDefinition.source).filter(Boolean)
                                )];
                                
                                const vectorSourceIds = sourceIds.filter(sourceId => {
                                    return mapSources[sourceId]?.type === 'vector';
                                });

                                if (vectorSourceIds.length === 0) return null;

                                const sources = vectorSourceIds.map(sourceId => {
                                    const sourceDef = {
                                        ...mapSources[sourceId],
                                        tiles: mapSources[sourceId].tiles
                                            ? [...mapSources[sourceId].tiles]
                                            : mapSources[sourceId].tiles
                                    };

                                    if (sourceDef.tiles) {
                                        sourceDef.tiles = sourceDef.tiles.map(url => 
                                            url.startsWith('/') ? `${window.location.origin}${url}` : url
                                        );
                                    }

                                    return {
                                        ...sourceDef,
                                        name: sourceId
                                    };
                                });

                                const layers = layerDefinitions.filter(layerDefinition => {
                                    return vectorSourceIds.includes(layerDefinition.source);
                                });

                                return {
                                    name: layer.name,
                                    visible: false,
                                    sources,
                                    layers
                                };
                            })
                            .filter(Boolean);
                            
                        const layerControl = new LayerControl({
                            basemaps: basemapInfo,
                            overlays: overlayInfo
                        });
                        self.map.addControl(layerControl, 'top-right');
                    });
                });

            })();
        },
        template: template
    });
});