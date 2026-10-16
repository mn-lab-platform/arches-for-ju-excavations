import ko from 'knockout';
import template from 'templates/views/components/workflows/bone-csv-visualization/bone-iiif-leaflet-step.htm';
import { ensureLeafletIiif } from '../../iiif/lib/leaflet-iiif-loader';

const LOG_PREFIX = '[bone-iiif-leaflet-step]';

ko.bindingHandlers.boneIiifLeafletInit = {
    init(element, valueAccessor) {
        const initFunction = ko.unwrap(valueAccessor());
        if (typeof initFunction === 'function') {
            initFunction(element);
        }
        return { controlsDescendantBindings: false };
    }
};

function firstCanvas(manifest) {
    return Array.isArray(manifest?.items) ? manifest.items[0] : null;
}

function paintingBody(canvas) {
    const page = Array.isArray(canvas?.items) ? canvas.items[0] : null;
    const annotation = Array.isArray(page?.items) ? page.items[0] : null;
    const body = annotation?.body;
    return Array.isArray(body) ? body[0] : body;
}

function imageServiceId(image) {
    const services = Array.isArray(image?.service) ? image.service : [image?.service];
    const service = services.find(Boolean);
    if (!service) return '';
    if (typeof service === 'string') return service.replace(/\/+$/, '');
    return String(service.id || service['@id'] || '').replace(/\/+$/, '');
}

function annotationItems(payload, canvas) {
    if (Array.isArray(payload?.annotationPage?.items)) {
        return payload.annotationPage.items;
    }
    const page = Array.isArray(canvas?.annotations) ? canvas.annotations[0] : null;
    return Array.isArray(page?.items) ? page.items : [];
}

function bodyValue(annotation, purpose) {
    const bodies = Array.isArray(annotation?.body) ? annotation.body : [annotation?.body];
    const body = bodies.find(function(candidate) {
        return candidate && candidate.purpose === purpose;
    });
    return body?.value || '';
}

function selectorPolygons(annotation) {
    const selector = annotation?.target?.selector;
    if (!selector || selector.type !== 'SvgSelector' || !selector.value) {
        return [];
    }

    const documentNode = new DOMParser().parseFromString(selector.value, 'image/svg+xml');
    if (documentNode.querySelector('parsererror')) {
        return [];
    }

    return Array.from(documentNode.querySelectorAll('polygon')).map(function(polygon) {
        return String(polygon.getAttribute('points') || '')
            .trim()
            .split(/\s+/)
            .map(function(pair) {
                const coordinates = pair.split(',').map(Number);
                return coordinates.length === 2 && coordinates.every(Number.isFinite)
                    ? coordinates
                    : null;
            })
            .filter(Boolean);
    }).filter(function(points) {
        return points.length >= 3;
    });
}

function popupContent(boneId, description) {
    const root = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = boneId || 'Bone annotation';
    root.appendChild(title);

    if (description) {
        const text = document.createElement('div');
        text.textContent = description;
        root.appendChild(text);
    }
    return root;
}

function payloadSummary(payload) {
    const manifest = payload?.manifest;
    const canvas = firstCanvas(manifest);
    return {
        hasPayload: Boolean(payload),
        schemaVersion: payload?.schemaVersion || 'legacy-or-missing',
        fileName: payload?.fileName || null,
        declaredRowCount: payload?.rowCount ?? null,
        declaredAnnotationCount: payload?.annotationCount ?? null,
        hasManifest: Boolean(manifest),
        manifestId: manifest?.id || null,
        canvasDimensions: canvas ? [canvas.width, canvas.height] : null,
        resolvedAnnotationCount: annotationItems(payload, canvas).length
    };
}

ko.components.register('bone-iiif-leaflet-step', {
    viewModel: {
        createViewModel(params) {
            const self = {};
            self.status = ko.observable('Preparing IIIF preview…');
            self.errorMessage = ko.observable('');
            self.renderedCount = ko.observable(0);
            self.canvasLabel = ko.observable('');
            self.activeAnnotation = ko.observable(null);
            self.rendererMode = ko.observable('');
            self._renderStage = 'not started';

            self.downloadManifest = function() {
                const payload = ko.unwrap(params.payload);
                if (!payload?.manifest) return;

                const blob = new Blob(
                    [JSON.stringify(payload.manifest, null, 2)],
                    { type: 'application/ld+json;charset=utf-8' }
                );
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'bone-inventory-manifest.json';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            };

            function clearLayers() {
                if (!self._map) return;
                if (self._contentLayer) {
                    self._map.removeLayer(self._contentLayer);
                }
                self._contentLayer = self._L.layerGroup().addTo(self._map);
            }

            async function renderPayload() {
                if (!self._map || !self._L) return;

                self._renderStage = 'reading workflow payload';
                const payload = ko.unwrap(params.payload);
                console.info(LOG_PREFIX, 'render requested', payloadSummary(payload));
                const manifest = payload?.manifest;
                const canvas = firstCanvas(manifest);
                const image = paintingBody(canvas);
                const width = Number(canvas?.width);
                const height = Number(canvas?.height);

                self.errorMessage('');
                self.renderedCount(0);
                self.activeAnnotation(null);

                if (!manifest || !canvas) {
                    self.status('');
                    self.errorMessage('Missing IIIF manifest from the CSV step.');
                    console.warn(LOG_PREFIX, 'manifest missing', payloadSummary(payload));
                    return;
                }
                if (!image?.id || !(width > 0) || !(height > 0)) {
                    self.status('');
                    self.errorMessage('The IIIF Canvas has no valid painting image or dimensions.');
                    console.warn(LOG_PREFIX, 'invalid Canvas painting body', payloadSummary(payload));
                    return;
                }

                self._renderStage = 'preparing map layers';
                self.status('Loading IIIF Canvas…');
                self.canvasLabel(
                    canvas.label?.en?.[0] ||
                    manifest.label?.en?.[0] ||
                    'Bone inventory'
                );
                clearLayers();

                const serviceId = imageServiceId(image);
                const pixelToLatLng = function(x, y) {
                    return self._map.options.crs.pointToLatLng(
                        self._L.point(x, y),
                        0
                    );
                };
                const bounds = self._L.latLngBounds(
                    pixelToLatLng(0, height),
                    pixelToLatLng(width, 0)
                );

                const imageLayer = self._L.imageOverlay(image.id, bounds, {
                    alt: self.canvasLabel(),
                    interactive: false
                });
                imageLayer.addTo(self._contentLayer);
                self.rendererMode(serviceId ? 'IIIF Image API image' : 'Canvas image');

                self._renderStage = 'parsing SvgSelector annotations';
                const annotations = annotationItems(payload, canvas);
                const svgNamespace = 'http://www.w3.org/2000/svg';
                const svgRoot = document.createElementNS(svgNamespace, 'svg');
                let rendered = 0;

                svgRoot.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
                svgRoot.setAttribute('preserveAspectRatio', 'none');
                svgRoot.style.pointerEvents = 'none';

                annotations.forEach(function(annotation) {
                    const boneId = bodyValue(annotation, 'tagging');
                    const description = bodyValue(annotation, 'commenting');
                    const polygons = selectorPolygons(annotation);

                    polygons.forEach(function(points) {
                        const polygonElement = document.createElementNS(svgNamespace, 'polygon');
                        const titleElement = document.createElementNS(svgNamespace, 'title');
                        polygonElement.setAttribute(
                            'points',
                            points.map(function(point) { return point.join(','); }).join(' ')
                        );
                        polygonElement.setAttribute('fill', '#ff6b35');
                        polygonElement.setAttribute('fill-opacity', '0.52');
                        polygonElement.setAttribute('stroke', '#b22d00');
                        polygonElement.setAttribute('stroke-width', '3');
                        polygonElement.setAttribute('vector-effect', 'non-scaling-stroke');
                        polygonElement.style.cursor = 'pointer';
                        polygonElement.style.pointerEvents = 'all';
                        titleElement.textContent = boneId + (description ? ': ' + description : '');
                        polygonElement.appendChild(titleElement);
                        polygonElement.addEventListener('click', function(event) {
                            event.stopPropagation();
                            self.activeAnnotation({
                                boneId: boneId,
                                description: description
                            });
                            const center = points.reduce(function(total, point) {
                                return [total[0] + point[0], total[1] + point[1]];
                            }, [0, 0]).map(function(total) {
                                return total / points.length;
                            });
                            self._L.popup()
                                .setLatLng(pixelToLatLng(center[0], center[1]))
                                .setContent(popupContent(boneId, description))
                                .openOn(self._map);
                        });
                        svgRoot.appendChild(polygonElement);
                        rendered += 1;
                    });
                });

                if (rendered) {
                    self._L.svgOverlay(svgRoot, bounds, { interactive: true })
                        .addTo(self._contentLayer);
                }

                self._renderStage = 'fitting map bounds';
                self._map.fitBounds(bounds, { animate: false });
                self._map.setMaxBounds(bounds.pad(0.35));
                self.renderedCount(rendered);
                self.status('');

                if (!rendered) {
                    self.errorMessage('The AnnotationPage contains no supported SVG polygons.');
                    return;
                }
                if (params.form && params.form.complete) {
                    params.form.complete(true);
                }
                self._renderStage = 'complete';
                console.info(LOG_PREFIX, 'render complete', {
                    fileName: payload?.fileName || null,
                    rendererMode: self.rendererMode(),
                    sourceImage: image.id,
                    renderedAnnotationCount: rendered
                });
            }

            self.initMap = async function(element) {
                try {
                    self._renderStage = 'loading Leaflet dependencies';
                    self._L = await ensureLeafletIiif({ includeCss: true });
                    self._renderStage = 'creating Leaflet map';
                    self._map = self._L.map(element, {
                        crs: self._L.CRS.Simple,
                        zoomControl: true,
                        attributionControl: false,
                        minZoom: -2,
                        maxZoom: 5
                    });
                    self._map.setView([0, 0], 0);

                    if (typeof ResizeObserver !== 'undefined') {
                        self._resizeObserver = new ResizeObserver(function() {
                            self._map?.invalidateSize();
                        });
                        self._resizeObserver.observe(element);
                    }

                    await renderPayload();
                    setTimeout(function() {
                        self._map?.invalidateSize();
                    }, 0);
                } catch (error) {
                    self.status('');
                    const message = error?.message || String(error);
                    self.errorMessage('IIIF preview failed during ' + self._renderStage + ': ' + message);
                    console.error(LOG_PREFIX, 'initialization/render failed', {
                        stage: self._renderStage,
                        payload: payloadSummary(ko.unwrap(params.payload)),
                        error: error
                    });
                }
            };

            self._payloadSubscription = ko.computed(function() {
                ko.unwrap(params.payload);
                if (self._map) {
                    setTimeout(function() {
                        renderPayload().catch(function(error) {
                            self.status('');
                            const message = error?.message || String(error);
                            self.errorMessage('IIIF preview failed during ' + self._renderStage + ': ' + message);
                            console.error(LOG_PREFIX, 'payload re-render failed', {
                                stage: self._renderStage,
                                payload: payloadSummary(ko.unwrap(params.payload)),
                                error: error
                            });
                        });
                    }, 0);
                }
            });

            self.dispose = function() {
                try { self._payloadSubscription?.dispose(); } catch (_) {}
                try { self._resizeObserver?.disconnect(); } catch (_) {}
                try { self._map?.remove(); } catch (_) {}
                self._map = null;
            };

            if (params.form && params.form.complete) {
                params.form.complete(false);
            }
            return self;
        }
    },
    template: template
});
