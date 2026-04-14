define(['arches'], function(arches) {
    'use strict';

    function unwrapCtor(moduleValue) {
        if (typeof moduleValue === 'function') return moduleValue;
        if (moduleValue && typeof moduleValue.default === 'function') return moduleValue.default;
        if (moduleValue && moduleValue.default && typeof moduleValue.default.default === 'function') {
            return moduleValue.default.default;
        }
        return null;
    }

    function baseRoot() {
        var root = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
        return root.replace(/\/+$/, '/');
    }

    function getCreateableResourceGraphs(source) {
        var raw = source;

        if (typeof raw === 'function') raw = raw();

        if (!Array.isArray(raw)) {
            raw = source && (source.createableResources || source.creatableResources || source.createable_resources || []);
            if (typeof raw === 'function') raw = raw();
        }

        var list = Array.isArray(raw) ? raw : [];

        return list
            .filter(function(graph) {
                return graph && graph.graphid && graph.disable_instance_creation !== true && graph.is_active !== false;
            })
            .map(function(graph) {
                return {
                    graphid: graph.graphid,
                    name: graph.name || graph.subtitle || graph.slug || graph.graphid,
                    iconclass: graph.iconclass || ''
                };
            });
    }

    function isUuid(value) {
        return typeof value === 'string' && /^[0-9a-fA-F-]{36}$/.test(value.trim());
    }

    function extractIiifFromTiles(tilesResp) {
        var candidates = [];

        function walk(value) {
            if (!value) return;

            if (typeof value === 'string') {
                if (value.indexOf('/iiif/') >= 0 || /\/info\.json$/i.test(value)) candidates.push(value);
                return;
            }

            if (Array.isArray(value)) {
                value.forEach(walk);
                return;
            }

            if (typeof value === 'object') {
                Object.keys(value).forEach(function(key) {
                    walk(value[key]);
                });
            }
        }

        walk(tilesResp);
        return (candidates[0] || '').replace(/\/info\.json$/i, '');
    }

    function collectV3AnnotationsFromManifest(manifest) {
        var out = [];

        try {
            var canvases = (manifest && Array.isArray(manifest.items)) ? manifest.items : [];
            canvases.forEach(function(canvas) {
                var canvasId = canvas && canvas.id ? canvas.id : null;
                var pages = Array.isArray(canvas.annotations) ? canvas.annotations : [];

                pages.forEach(function(page) {
                    if (!page || !Array.isArray(page.items)) return;

                    page.items.forEach(function(annotation) {
                        var normalized = Object.assign({}, annotation);
                        if (!normalized.canvasId) normalized.canvasId = canvasId;
                        out.push(normalized);
                    });
                });
            });
        } catch (error) {
            void error;
        }

        return out;
    }

    function canvasIdFromAnnotation(annotation) {
        if (!annotation) return null;
        if (annotation.canvasId) return annotation.canvasId;

        var target = annotation.target;
        if (typeof target === 'string') return target;
        if (target && typeof target === 'object') return target.source || target.id || null;

        return null;
    }

    function annotationResourceIdFromAnnotation(annotation) {
        if (!annotation) return null;
        if (annotation.annotationResourceId) return annotation.annotationResourceId;
        if (annotation.annotation_resource_id) return annotation.annotation_resource_id;

        var body = annotation.body;
        if (Array.isArray(body)) {
            var match = body.find(function(item) {
                return item &&
                    typeof item === 'object' &&
                    (item.purpose === 'resource-id' || item.purpose === 'arch-resource-id') &&
                    typeof item.value === 'string' &&
                    item.value.trim();
            });

            return match ? match.value.trim() : null;
        }

        if (body && typeof body === 'object') {
            if ((body.purpose === 'resource-id' || body.purpose === 'arch-resource-id') &&
                typeof body.value === 'string' &&
                body.value.trim()) {
                return body.value.trim();
            }
        }

        return null;
    }

    function normalizeSelector(selector) {
        if (!selector || !selector.value) return null;

        var selectorType = String(selector.type || '').toLowerCase();
        var selectorValue = String(selector.value || '');

        if (selectorType.indexOf('svg') >= 0) {
            return {
                type: 'SvgSelector',
                value: selectorValue
            };
        }

        if (selectorType.indexOf('xywh') >= 0 || selectorType.indexOf('fragment') >= 0) {
            return {
                type: 'FragmentSelector',
                conformsTo: 'http://www.w3.org/TR/media-frags/',
                value: /^xywh=/.test(selectorValue) ? selectorValue : ('xywh=' + selectorValue)
            };
        }

        return selector;
    }

    function buildTextualBody(value, purpose) {
        return {
            type: 'TextualBody',
            value: value,
            format: 'text/plain',
            purpose: purpose
        };
    }

    function hasOwn(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj || {}, key);
    }

    function buildV3Annotation(annotation, overrides) {
        overrides = overrides || {};

        var canvasId = canvasIdFromAnnotation(annotation);
        var rawSelector = hasOwn(overrides, 'selector')
            ? overrides.selector
            : (annotation && annotation.selector) || (annotation && annotation.target && annotation.target.selector);
        var selector = normalizeSelector(rawSelector);
        var target = selector ? { source: canvasId, selector: selector } : canvasId;

        var title = hasOwn(overrides, 'label') ? overrides.label : (annotation && annotation.label);
        var note = hasOwn(overrides, 'description') ? overrides.description : (annotation && annotation.description);
        var color = hasOwn(overrides, 'color') ? overrides.color : (annotation && annotation.color);
        var annotationResourceId = hasOwn(overrides, 'annotationResourceId')
            ? overrides.annotationResourceId
            : annotationResourceIdFromAnnotation(annotation);

        title = String(title || '').trim();
        note = String(note || '').trim();
        color = String(color || '').trim();

        var body = [];

        if (title) body.push(buildTextualBody(title, 'tagging'));
        if (note) body.push(buildTextualBody(note, 'commenting'));
        if (color) body.push(buildTextualBody(color, 'color'));
        if (annotationResourceId) body.push(buildTextualBody(annotationResourceId, 'resource-id'));

        if (!body.length) {
            body.push(buildTextualBody('Annotation', 'commenting'));
        }

        var out = {
            id: (annotation && annotation.id) || ('anno-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)),
            type: 'Annotation',
            motivation: 'commenting',
            target: target,
            body: body
        };

        if (annotationResourceId) {
            out.annotationResourceId = annotationResourceId;
            out.annotation_resource_id = annotationResourceId;
        }

        if (title) {
            out.label = { none: [title] };
        }

        return out;
    }

    function buildResourceLinkValue(resourceId) {
        return {
            resourceId: resourceId,
            ontologyProperty: '',
            inverseOntologyProperty: '',
            resourceXresourceId: ''
        };
    }

    return {
        unwrapCtor: unwrapCtor,
        baseRoot: baseRoot,
        getCreateableResourceGraphs: getCreateableResourceGraphs,
        isUuid: isUuid,
        extractIiifFromTiles: extractIiifFromTiles,
        collectV3AnnotationsFromManifest: collectV3AnnotationsFromManifest,
        canvasIdFromAnnotation: canvasIdFromAnnotation,
        annotationResourceIdFromAnnotation: annotationResourceIdFromAnnotation,
        normalizeSelector: normalizeSelector,
        buildV3Annotation: buildV3Annotation,
        buildResourceLinkValue: buildResourceLinkValue
    };
});
