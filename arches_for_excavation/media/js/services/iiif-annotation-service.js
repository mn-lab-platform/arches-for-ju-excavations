define([
    'utils/iiif-addition-utils',
    'utils/iiif-annotation-utils',
    'services/resource-service',
    'services/service-utils'
], function(iiifAdditionUtils, iiifAnnotationUtils, resourceServiceModule, serviceUtils) {
    'use strict';

    var resourceService = (resourceServiceModule && resourceServiceModule.default)
        ? resourceServiceModule.default
        : resourceServiceModule;

    var ANNOTATION_NODE_IDS = {
        label: 'e202ea9f-e0a9-42a3-85a1-6380bc1115b9',
        description: 'e4c6d7e5-317d-4d04-9936-e4ad1886ba05',
        geometry: '4277f805-09e7-4db1-bf26-49c09132c720',
        hostLink: '5266b89c-72f7-41cf-a7f4-cde1df9efef9'
    };

    var manifestOverrideCache = {};

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

    function createAnnotationResource(annotation, hostResourceId) {
        var resourceId = iiifAdditionUtils.uuidv4();
        var chain = Promise.resolve();

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
                return iiifAdditionUtils.createOrUpdateTile(
                    ANNOTATION_NODE_IDS.geometry,
                    resourceId,
                    '',
                    JSON.stringify(annotation.geometry || annotation.localGeometry || null)
                );
            })
            .then(function() {
                return iiifAdditionUtils.createOrUpdateTile(
                    ANNOTATION_NODE_IDS.hostLink,
                    resourceId,
                    '',
                    [iiifAnnotationUtils.buildResourceLinkValue(hostResourceId)]
                );
            })
            .then(function() {
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

            return {
                imageServiceUrl: iiifAnnotationUtils.extractIiifFromTiles(tilesJson),
                manifest: manifestJson,
                annotations: iiifAnnotationUtils.collectV3AnnotationsFromManifest(manifestJson)
            };
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

        return ensureManifestOverride(digitalResourceId, sourceManifest).then(function() {
            return postJson(manifestEditUrl(digitalResourceId), {
                mode: 'upsert_annotation',
                canvas_id: canvasId,
                annotation: iiifAnnotationUtils.buildV3Annotation(annotationData)
            });
        });
    }

    function checkGraphForRelatedResourceNode(graphId) {
        var url = iiifAnnotationUtils.baseRoot() + 'graphs/' + encodeURIComponent(graphId) + '?cards=true';

        return requestJson(url, { method: 'GET' })
            .then(function(graphData) {
                var cards = parseGraphCards(graphData);
                var relatedNode = null;

                for (var i = 0; i < cards.length; i++) {
                    var card = cards[i];
                    var nodes = (card && Array.isArray(card.nodes)) ? card.nodes : [];

                    for (var j = 0; j < nodes.length; j++) {
                        var node = nodes[j];
                        if (node.datatype === 'resource-instance-list' || node.datatype === 'resource-instance') {
                            relatedNode = node;
                            break;
                        }
                    }

                    if (relatedNode) break;
                }

                if (!relatedNode) {
                    return {
                        hasRelatedNode: false,
                        canLinkToAnnotations: false
                    };
                }

                var config = relatedNode.config || {};
                var allowedGraphs = Array.isArray(config.graphs) ? config.graphs : [];
                var canLinkToAnnotations = allowedGraphs.some(function(graph) {
                    var name = (graph && graph.name) ? graph.name.toLowerCase() : '';
                    return (
                        name.indexOf('annotation') >= 0 ||
                        name.indexOf('iiif') >= 0 ||
                        graph.graphid === '96e396f9-3fb8-47bf-b14c-189e9c1dee97' ||
                        graph.graphid === 'ddd13240-8e2b-414f-a652-abab00a02015'
                    );
                });

                return {
                    hasRelatedNode: true,
                    nodeId: relatedNode.nodeid,
                    nodeGroupId: relatedNode.nodegroup_id,
                    name: relatedNode.name,
                    canLinkToAnnotations: canLinkToAnnotations,
                    allowedGraphs: allowedGraphs
                };
            })
            .catch(function(error) {
                console.error('[iiif-annotation-service] Error checking graph structure:', error);
                return {
                    hasRelatedNode: false,
                    canLinkToAnnotations: false,
                    error: error.message
                };
            });
    }

    function addAnnotationsToTargetResource(targetResourceId, annotationResourceIds, targetResourceInfo) {
        var relationValue = annotationResourceIds.map(function(annotationResourceId) {
            return iiifAnnotationUtils.buildResourceLinkValue(annotationResourceId);
        });

        return iiifAdditionUtils.createOrUpdateTile(
            targetResourceInfo.nodeGroupId,
            targetResourceId,
            '',
            relationValue
        );
    }

    return {
        loadHostResource: loadHostResource,
        deleteAnnotation: deleteAnnotation,
        fetchCreatorCardId: fetchCreatorCardId,
        upsertAnnotation: upsertAnnotation,
        createAnnotationResource: createAnnotationResource,
        checkGraphForRelatedResourceNode: checkGraphForRelatedResourceNode,
        addAnnotationsToTargetResource: addAnnotationsToTargetResource
    };
});
