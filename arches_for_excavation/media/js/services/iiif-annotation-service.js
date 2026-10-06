define([
    'utils/iiif-addition-utils',
    'utils/iiif-annotation-utils',
    'services/resource-service',
    'services/tile-service',
    'services/service-utils'
], function(iiifAdditionUtils, iiifAnnotationUtils, resourceServiceModule, tileServiceModule, serviceUtils) {
    'use strict';

    var resourceService = (resourceServiceModule && resourceServiceModule.default)
        ? resourceServiceModule.default
        : resourceServiceModule;
    var tileService = (tileServiceModule && tileServiceModule.default)
        ? tileServiceModule.default
        : tileServiceModule;

    var ANNOTATION_NODE_IDS = {
        label: 'c6840b34-8614-4734-bdb2-10d52f258afc',
        description: '897a4abf-32dd-4d1f-925e-45c8d82828b9',
        color: '2a0b5108-ef64-47e3-9460-61c064e397b1',
        geometry: '2586e7f6-3610-4666-bc27-7efe9639dcaf',
        hostLink: 'a2ef2d24-20ae-4070-b11b-207834905809',
        annotationGroup: 'a2ef2d24-20ae-4070-b11b-207834905809'
    };

    var manifestOverrideCache = {};
    var relatedResourcesCache = {};

    function readResponsePayload(response) {
        return response.text().then(function(text) {
            if (!text) return {};

            try {
                return JSON.parse(text);
            } catch (parseError) {
                void parseError;
                return text;
            }
        });
    }

    function getErrorMessage(responsePayload, response) {
        if (responsePayload && typeof responsePayload === 'object') {
            return responsePayload.error || responsePayload.message || ('HTTP ' + response.status);
        }

        if (typeof responsePayload === 'string' && responsePayload.trim()) {
            return responsePayload.trim();
        }

        return 'HTTP ' + response.status;
    }

    function request(url, options) {
        var requestOptions = Object.assign({ credentials: 'include' }, options || {});

        return window.fetch(url, requestOptions).then(function(response) {
            return readResponsePayload(response).then(function(payload) {
                if (!response.ok) {
                    throw new Error(getErrorMessage(payload, response));
                }

                return payload;
            });
        });
    }

    function requestJson(url, options) {
        var headers = Object.assign({ 'Accept': 'application/json' }, (options && options.headers) || {});
        return request(url, Object.assign({}, options || {}, { headers: headers }));
    }

    function postJson(url, body) {
        return request(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': serviceUtils.getCookie('csrftoken')
            },
            body: JSON.stringify(body)
        });
    }

    function manifestEditUrl(resourceId) {
        return iiifAnnotationUtils.baseRoot() + 'api/iiif/geotiff-manifest/edit/' + encodeURIComponent(resourceId);
    }

    function parseGraphCards(graphPayload) {
        if (graphPayload && graphPayload.graph && Array.isArray(graphPayload.graph.cards)) return graphPayload.graph.cards;
        if (graphPayload && Array.isArray(graphPayload.cards)) return graphPayload.cards;
        if (graphPayload && graphPayload.data && Array.isArray(graphPayload.data.cards)) return graphPayload.data.cards;
        if (Array.isArray(graphPayload)) return graphPayload;
        return [];
    }

    function fetchResourceName(resourceId) {
        if (!resourceService || typeof resourceService.getOne !== 'function') {
            return Promise.resolve(resourceId);
        }

        return resourceService.getOne(resourceId)
            .then(function(data) {
                var resource = (data && data.resource) ? data.resource : data;
                return resource.displayname || resource.name || data.displayname || data.name || resourceId;
            })
            .catch(function() {
                return resourceId;
            });
    }

    function buildResourceReference(resourceId, resourceName) {
        if (!resourceId) return null;
        console.log('[iiif-annotation-service] buildResourceReference', {
            resourceId: resourceId,
            resourceName: resourceName,
            reportUrl: iiifAnnotationUtils.baseRoot() + 'report/' + encodeURIComponent(resourceId)
        });
        return {
            id: resourceId,
            name: resourceName || resourceId,
            reportUrl: iiifAnnotationUtils.baseRoot() + 'report/' + encodeURIComponent(resourceId)
        };
    }

    function fetchResourceReference(resourceId) {
        if (!resourceId) return Promise.resolve(null);

        return fetchResourceName(resourceId).then(function(resourceName) {
            return buildResourceReference(resourceId, resourceName);
        });
    }

    function fetchResourceReferences(resourceIds) {
        var ids = Array.isArray(resourceIds) ? resourceIds : [];
        return Promise.all(ids.map(fetchResourceReference)).then(function(resources) {
            return resources.filter(Boolean);
        });
    }

    function parseRelatedResourcesPayload(payload) {
        if (payload && payload.related_resources) {
            if (Array.isArray(payload.related_resources.related_resources)) {
                return payload.related_resources.related_resources;
            }

            if (Array.isArray(payload.related_resources)) {
                return payload.related_resources;
            }
        }

        if (Array.isArray(payload)) return payload;
        return [];
    }

    function fetchRelatedResources(resourceId) {
        if (!resourceId || !resourceService || typeof resourceService.getAllRelatedTo !== 'function') {
            return Promise.resolve([]);
        }

        if (!relatedResourcesCache[resourceId]) {
            relatedResourcesCache[resourceId] = resourceService.getAllRelatedTo(resourceId)
                .then(parseRelatedResourcesPayload)
                .catch(function(error) {
                    console.warn('[iiif-annotation-service] fetchRelatedResources error', error);
                    return [];
                });
        }

        return relatedResourcesCache[resourceId];
    }

    function fetchLinkedResourcesForAnnotation(annotation, hostResourceId) {
        var annotationResourceId = iiifAnnotationUtils.annotationResourceIdFromAnnotation(annotation);
        var manifestLinkedResourceIds = iiifAnnotationUtils.linkedResourceIdsFromAnnotation(annotation);
        var relationPromise = annotationResourceId
            ? fetchRelatedResources(annotationResourceId)
            : Promise.resolve([]);
        var manifestPromise = manifestLinkedResourceIds.length
            ? fetchResourceReferences(manifestLinkedResourceIds)
            : Promise.resolve([]);

        return Promise.all([relationPromise, manifestPromise]).then(function(results) {
            var resources = results[0];
            var manifestLinkedResources = results[1];
            var seen = {};
            var linkedResources = [];

            function addResource(resource) {
                if (!resource || typeof resource !== 'object') return;

                var resourceId = resource.resourceinstanceid || resource.resourceinstance_id || resource.resourceId || resource.id || null;
                if (!resourceId) return;
                if (resourceId === annotationResourceId) return;
                if (hostResourceId && resourceId === hostResourceId) return;
                if (seen[resourceId]) return;

                seen[resourceId] = true;
                linkedResources.push(buildResourceReference(resourceId, resource.displayname || resource.name || resourceId));
            }

            (Array.isArray(resources) ? resources : []).forEach(addResource);
            (Array.isArray(manifestLinkedResources) ? manifestLinkedResources : []).forEach(addResource);

            return linkedResources.filter(Boolean);
        });
    }

    function enrichAnnotationsWithLinkedResources(annotations, hostResourceId) {
        var list = Array.isArray(annotations) ? annotations : [];

        return Promise.all(list.map(function(annotation) {
            return fetchLinkedResourcesForAnnotation(annotation, hostResourceId).then(function(linkedResources) {
                if (!linkedResources.length) return annotation;
                return Object.assign({}, annotation, { linkedResources: linkedResources });
            });
        }));
    }

    function ensureManifestOverride(resourceId, manifest) {
        if (manifestOverrideCache[resourceId]) return Promise.resolve();

        return fetchResourceName(resourceId).then(function(resourceName) {
            return postJson(manifestEditUrl(resourceId), {
                mode: 'replace',
                manifest: manifest,
                resource_name: resourceName
            }).then(function() {
                manifestOverrideCache[resourceId] = true;
            });
        });
    }

    function createAnnotationResource(annotation, hostResourceId, targetResourceId) {
        var resourceId = iiifAdditionUtils.uuidv4();
        var chain = Promise.resolve();

        console.log('[iiif-annotation-service] createAnnotationResource:start', {
            hostResourceId: hostResourceId,
            annotationLabel: annotation && annotation.label,
            annotationId: annotation && annotation.id,
            newAnnotationResourceId: resourceId
        });

        if (annotation.label) {
            chain = chain.then(function() {
                return iiifAdditionUtils.createOrUpdateTile(
                    ANNOTATION_NODE_IDS.label,
                    resourceId,
                    '',
                    annotation.label
                );
            });
        }

        if (annotation.description) {
            chain = chain.then(function() {
                return iiifAdditionUtils.createOrUpdateTile(
                    ANNOTATION_NODE_IDS.description,
                    resourceId,
                    '',
                    annotation.description
                );
            });
        }

        return chain
            .then(function() {
                var groupData = {};
                groupData[ANNOTATION_NODE_IDS.geometry] = JSON.stringify(annotation.geometry || annotation.localGeometry || null);
                groupData[ANNOTATION_NODE_IDS.color] = annotation.color || '#64ff64';
                var relatedResourceIds = [hostResourceId];
                if (targetResourceId && targetResourceId !== hostResourceId) {
                    relatedResourceIds.push(targetResourceId);
                }
                groupData[ANNOTATION_NODE_IDS.hostLink] = relatedResourceIds.map(function(resourceId) {
                    return iiifAnnotationUtils.buildResourceLinkValue(resourceId);
                });

                return tileService.createOne({
                    tileid: '',
                    nodegroup_id: ANNOTATION_NODE_IDS.annotationGroup,
                    parenttile_id: null,
                    resourceinstance_id: resourceId,
                    sortorder: 0,
                    tiles: {},
                    data: groupData
                });
            })
            .then(function() {
                console.log('[iiif-annotation-service] createAnnotationResource:success', {
                    annotationLabel: annotation && annotation.label,
                    annotationId: annotation && annotation.id,
                    annotationResourceId: resourceId
                });
                return resourceId;
            });
    }

    function loadHostResource(resourceId) {
        var root = iiifAnnotationUtils.baseRoot();
        var tilesUrl = root + 'resource/' + encodeURIComponent(resourceId) + '/tiles';
        var manifestUrl = root + 'api/iiif/geotiff-manifest/' + encodeURIComponent(resourceId);

        return Promise.all([
            requestJson(tilesUrl, { method: 'GET' }),
            requestJson(manifestUrl, { method: 'GET' })
        ]).then(function(results) {
            var tilesJson = results[0];
            var manifestJson = results[1];

            var annotations = iiifAnnotationUtils.collectV3AnnotationsFromManifest(manifestJson);

            return enrichAnnotationsWithLinkedResources(annotations, resourceId).then(function(enrichedAnnotations) {
                return {
                    imageServiceUrl: iiifAnnotationUtils.extractIiifFromTiles(tilesJson),
                    manifest: manifestJson,
                    annotations: enrichedAnnotations
                };
            });
        });
    }

    function deleteAnnotation(resourceId, annotation) {
        return postJson(manifestEditUrl(resourceId), {
            mode: 'delete_annotation_everywhere',
            canvas_id: iiifAnnotationUtils.canvasIdFromAnnotation(annotation),
            annotation_id: annotation && annotation.id,
            annotation_resource_id: iiifAnnotationUtils.annotationResourceIdFromAnnotation(annotation)
        });
    }

    function fetchCreatorCardId(graphId) {
        var gid = String(graphId || '').trim();
        if (!gid) return Promise.resolve(null);

        var graphsUrl = iiifAnnotationUtils.baseRoot() + 'graphs/' + encodeURIComponent(gid) + '?cards=true';

        return requestJson(graphsUrl, { method: 'GET' })
            .then(function(payload) {
                var cards = parseGraphCards(payload);
                var active = cards.find(function(card) {
                    return card && card.active !== false;
                }) || cards[0];

                return active && (active.cardid || active.cardId || active.card_id) || null;
            })
            .catch(function(error) {
                console.warn('[iiif-annotation-service] fetchCreatorCardId error', error);
                return null;
            });
    }

    function upsertAnnotation(annotationData, digitalResourceId, sourceManifest) {
        var canvasId = iiifAnnotationUtils.canvasIdFromAnnotation(annotationData);
        if (!canvasId) return Promise.reject(new Error('Missing canvasId for annotation upsert'));

        console.log('[iiif-annotation-service] upsertAnnotation:start', {
            digitalResourceId: digitalResourceId,
            canvasId: canvasId,
            annotationId: annotationData && annotationData.id,
            annotationResourceId: annotationData && annotationData.annotationResourceId
        });

        return postJson(manifestEditUrl(digitalResourceId), {
            mode: 'upsert_annotation',
            canvas_id: canvasId,
            annotation: iiifAnnotationUtils.buildV3Annotation(annotationData)
        }).then(function(result) {
            console.log('[iiif-annotation-service] upsertAnnotation:success', {
                digitalResourceId: digitalResourceId,
                canvasId: canvasId,
                annotationId: annotationData && annotationData.id,
                annotationResourceId: annotationData && annotationData.annotationResourceId,
                response: result
            });
            return result;
        });
    }

    return {
        loadHostResource: loadHostResource,
        deleteAnnotation: deleteAnnotation,
        fetchCreatorCardId: fetchCreatorCardId,
        fetchResourceReference: fetchResourceReference,
        enrichAnnotationsWithLinkedResources: enrichAnnotationsWithLinkedResources,
        upsertAnnotation: upsertAnnotation,
        createAnnotationResource: createAnnotationResource
    };
});
