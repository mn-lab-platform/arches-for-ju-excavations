define([
    'knockout',
    'arches',
    'leaflet',
    'templates/views/components/workflows/context-addition/coordinates-map-display-step.htm',
], function(ko, arches, L, template) {
    class Point {
        constructor(label, x, y, z) {
            this.label = label;
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    const blueDotIcon = L.icon({
        iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="%234287f5"/></svg>',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -20]
    });

    return ko.components.register('coordinates-map-display-step', {
        viewModel: function(params) {
            const self = this;
            self.coordinatesText = params.coordinatesText;

            self._extractPointsFromText = function(text) {
                const points = [];
                const trimmed = (text || '').trim();
                if (!trimmed) return points;

                const lines = trimmed.split('\n').filter(l => l.trim().length > 0);
                const delimiter = trimmed.includes('\t') ? '\t' : ' ';

                lines.forEach(line => {
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
                return [ySum / points.length, xSum / points.length];
            };

            const points = self._extractPointsFromText(ko.unwrap(self.coordinatesText));
            const centroid = self._findCentroid(points) || [0, 0];

            self.map = L.map('coordinates-map-display');
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: Infinity,
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(self.map);

            if (points.length === 0) {
                self.map.setView(centroid, 2);
                return;
            }

            const markers = [];
            points.forEach(pt => {
                const marker = L.marker([pt.y, pt.x], { icon: blueDotIcon }).addTo(self.map);
                
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
                
                marker.bindPopup(popupContent, {
                    maxWidth: 300,
                    className: 'modern-popup'
                });
                markers.push(marker);
            });

            if (points.length === 1) {
                self.map.setView([points[0].y, points[0].x], 15);
            } else if (points.length === 2) {
                const latlngs = points.map(pt => [pt.y, pt.x]);
                const line = L.polyline(latlngs, { color: 'blue' }).addTo(self.map);
                self.map.fitBounds(line.getBounds(), { padding: [20, 20] });
            } else {
                const latlngs = points.map(pt => [pt.y, pt.x]);
                const polygon = L.polygon(latlngs, { color: 'red', weight: 2, fillOpacity: 0.2 }).addTo(self.map);
                self.map.fitBounds(polygon.getBounds(), { padding: [20, 20] });
            }
        },
        template: template
    });
});