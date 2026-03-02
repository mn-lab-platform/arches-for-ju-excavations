define([
    'knockout',
    'arches',
    'maplibre-gl',
    'templates/views/components/workflows/context-footprint-addition/coordinates-map-display-step.htm',
    'maplibre-gl/dist/maplibre-gl.css'
], function(ko, arches, maplibreGl, template) {
    class Point {
        constructor(label, x, y, z) {
            this.label = label;
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    return ko.components.register('coordinates-map-display-step', {
        viewModel: function(params) {
            const self = this;
            
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

            console.log("Ignore Last line: ", self.ignoreLastLine());
            
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

            const points = self._extractPointsFromText(self.coordinatesText());
            const centroid = self._findCentroid(points) || [0, 0];

            self.map = new maplibreGl.Map({
                container: 'coordinates-map-display',
                style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
                center: centroid,
                zoom: 15,
                maxZoom: 24,
            });

            self.map.on('load', () => {
                if (points.length === 0) {
                    return;
                }

                const markers = [];
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

                    const marker = new maplibreGl.Marker({
                        color: "#4287f5",
                        draggable: false
                    })
                        .setLngLat([pt.x, pt.y])
                        .setPopup(popup)
                        .addTo(self.map);

                    markers.push(marker);
                });

                if (points.length === 1) {
                    self.map.setCenter([points[0].x, points[0].y]);
                } else if (points.length === 2) {
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
                    self.map.fitBounds(bounds, { padding: 20 });
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
                    self.map.fitBounds(bounds, { padding: 20 });
                }
            });
        },
        template: template
    });
});