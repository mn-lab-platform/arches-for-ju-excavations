define([
    'knockout',
    'views/components/iiif/iiif-map-viewer',
    'viewmodels/resource-instance-select',
    'utils/iiif-annotation-utils',
    'services/iiif-annotation-service',
    'templates/views/components/workflows/iiif-annotation/iiif-annotator-step.htm'
], function(ko, _MapViewer, ResourceInstanceSelectModule, iiifAnnotationUtils, iiifAnnotationService, template) {
    'use strict';

    var RIS = iiifAnnotationUtils.unwrapCtor(ResourceInstanceSelectModule);

    function viewModel(params) {
        var self = this;

        if (typeof params.value !== 'function') params.value = ko.observable(null);
        self.value = params.value;

        self.hostResourceId = ko.observable(ko.unwrap(params.hostResourceId) || null);

        self.loading = ko.observable(false);
        self.error = ko.observable('');
        self.success = ko.observable('');
        self.isSaved = ko.observable(false);
        self.isSaving = ko.observable(false);

        self.manifest = ko.observable(null);
        self.imageServiceUrl = ko.observable('');

        self.existingAnnotations = ko.observableArray([]);
        self.newAnnotations = ko.observableArray([]);

        self.showFinalizeModal = ko.observable(false);
        self.outputMode = ko.observable('annotation-only');

        self.availableOutputGraphs = ko.observableArray([]);
        self.targetGraphId = ko.observable('');

        self.riValue = ko.observable(null);
        self.riVm = ko.observable(null);
        self.riVmReady = ko.observable(false);
        self.creatorCardId = ko.observable(null);

        self.showAnnoMetaModal = ko.observable(false);
        self.pendingAnnotation = ko.observable(null);
        self.pendingTitle = ko.observable('');
        self.pendingDescription = ko.observable('');
        self.pendingColor = ko.observable('#64ff64');

        self.handlePendingColorInput = function(_, e) {
            var v = e && e.target ? e.target.value : null;
            if (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)) {
                self.pendingColor(v);
            }
        };

        self.setPendingColor = function(color) {
            if (typeof color === 'string' && /^#[0-9a-fA-F]{6}$/.test(color)) {
                self.pendingColor(color);
            }
        };

        self.resetUnsavedAnnotations = function() {
            self.showFinalizeModal(false);
            self.showAnnoMetaModal(false);

            self.pendingAnnotation(null);
            self.pendingTitle('');
            self.pendingDescription('');
            self.pendingColor('#64ff64');

            self.newAnnotations.removeAll();

            self.error('');
            self.success('');
            invalidateSavedState();

            if (self.hostResourceId()) {
                return self.loadHostResource(self.hostResourceId());
            }
            return Promise.resolve();
        };

        function invalidateSavedState() {
            if (self.isSaved()) {
                self.isSaved(false);
                self.success('');
            }
        }

        function resetLoadedState() {
            self.manifest(null);
            self.imageServiceUrl('');
            self.existingAnnotations.removeAll();
            self.newAnnotations.removeAll();
        }

        function resetTargetResourceState() {
            self.targetGraphId('');
            self.riValue(null);
            self.creatorCardId(null);
            self.riVm(null);
            self.riVmReady(false);
        }

        function buildPendingAnnotation(annotationPayload) {
            return {
                id: annotationPayload.id || ('anno-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)),
                type: annotationPayload.type || 'Polygon',
                canvasId: annotationPayload.canvasId || null,
                selector: annotationPayload.selector || null,
                geometry: annotationPayload.geometry || null,
                localGeometry: annotationPayload.localGeometry || null,
                created: annotationPayload.created || new Date().toISOString(),
                color: annotationPayload.color || '#64ff64',
                label: '',
                description: '',
                body: annotationPayload.body || null
            };
        }
        function normalizeHexColor(input, fallback) {
            var fb = (typeof fallback === 'string' && /^#[0-9a-fA-F]{6}$/.test(fallback)) ? fallback : '#64ff64';
            if (typeof input !== 'string') return fb;

            var v = input.trim();
            if (/^#[0-9a-fA-F]{6}$/.test(v)) return v.toLowerCase();
            if (/^[0-9a-fA-F]{6}$/.test(v)) return ('#' + v).toLowerCase();
            if (/^#[0-9a-fA-F]{3}$/.test(v)) {
                return ('#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3]).toLowerCase();
            }

            return fb;
        }

        function upsertColorBody(annotation, color) {
            var normalized = normalizeHexColor(color, '#64ff64');
            var body = annotation.body;
            var arr = [];

            if (Array.isArray(body)) {
                arr = body.slice();
            } else if (body && typeof body === 'object') {
                arr = [body];
            }

            arr = arr.filter(function(x) {
                return !(x && typeof x === 'object' && x.purpose === 'color');
            });

            arr.push({
                type: 'TextualBody',
                purpose: 'color',
                value: normalized
            });

            annotation.body = arr;
            return annotation;
        }        
        function buildStepPayload() {
            return {
                hostResourceId: self.hostResourceId(),
                digitalResourceId: self.hostResourceId(),
                iiifServiceUrl: self.imageServiceUrl(),
                manifest: self.manifest(),
                annotations: self.newAnnotations(),
                output: {
                    mode: self.outputMode(),
                    targetGraphId: self.targetGraphId(),
                    targetResourceId: self.riValue()
                }
            };
        }

        self.loadHostResource = function(resourceId) {
            if (!resourceId) return Promise.resolve();

            self.loading(true);
            self.error('');
            self.success('');
            self.isSaved(false);
            resetLoadedState();

            return iiifAnnotationService.loadHostResource(resourceId)
                .then(function(bundle) {
                    if (bundle.imageServiceUrl) self.imageServiceUrl(bundle.imageServiceUrl);

                    if (!bundle.manifest || !Array.isArray(bundle.manifest.items)) {
                        self.error('Manifest does not look like IIIF Presentation 3 (missing items[]).');
                        return;
                    }

                    self.manifest(bundle.manifest);
                    self.existingAnnotations(bundle.annotations || []);
                })
                .catch(function(error) {
                    self.error(error && error.message ? error.message : 'Failed to load manifest/tiles');
                })
                .finally(function() {
                    self.loading(false);
                });
        };

        if (self.hostResourceId()) {
            self.loadHostResource(self.hostResourceId());
        }

        self.handleNewAnnotation = function(annotationPayload) {
            self.pendingAnnotation(buildPendingAnnotation(annotationPayload));
            self.pendingTitle('');
            self.pendingDescription('');
            self.showAnnoMetaModal(true);
        };

        self.cancelAnnoMetaModal = function() {
            self.pendingAnnotation(null);
            self.pendingTitle('');
            self.pendingDescription('');
            self.pendingColor('#64ff64');
            self.showAnnoMetaModal(false);
        };

        self.confirmAnnoMetaModal = function() {
            var annotation = self.pendingAnnotation();
            if (!annotation) return;

            annotation.label = (self.pendingTitle() || '').trim() || 'Annotation';
            annotation.description = (self.pendingDescription() || '').trim();

            var finalColor = normalizeHexColor(annotation.color, '#64ff64');
            annotation.color = finalColor;
            upsertColorBody(annotation, finalColor);

            self.newAnnotations.push(annotation);
            self.pendingAnnotation(null);
            self.showAnnoMetaModal(false);

            invalidateSavedState();
        };

        self.handleAnnotationDeleted = function(annotationOrIndex) {
            var existing = self.existingAnnotations().slice();
            var annotation = null;

            if (typeof annotationOrIndex === 'number') {
                if (annotationOrIndex >= 0 && annotationOrIndex < existing.length) {
                    annotation = existing[annotationOrIndex];
                    existing.splice(annotationOrIndex, 1);
                    self.existingAnnotations(existing);
                }
            } else if (annotationOrIndex && typeof annotationOrIndex === 'object') {
                annotation = annotationOrIndex;
                self.existingAnnotations(existing.filter(function(item) {
                    return item.id !== annotation.id;
                }));
            }

            if (annotation && annotation.id && iiifAnnotationUtils.canvasIdFromAnnotation(annotation)) {
                self.deleteAnnotationFromServer(annotation);
            }
        };

        self.deleteAnnotationFromServer = function(annotation) {
            if (!self.hostResourceId()) return Promise.resolve();

            return iiifAnnotationService.deleteAnnotation(self.hostResourceId(), annotation)
                .catch(function(error) {
                    console.error('[iiif-annotator-step] Failed to delete annotation:', error);
                    alert('Failed to delete annotation from server (state may be inconsistent).');
                });
        };

        ko.computed(function() {
            var pageVm = params.pageVm || {};
            var rawGraphs = ko.unwrap(pageVm.createableResources || pageVm.creatableResources || pageVm.createable_resources || []);
            self.availableOutputGraphs(iiifAnnotationUtils.getCreateableResourceGraphs(rawGraphs));
        });

        self.creatorParams = ko.pureComputed(function() {
            var vm = self.riVm();
            var newResourceInstance = vm && vm.newResourceInstance && vm.newResourceInstance();
            var cardId = self.creatorCardId();

            if (!newResourceInstance || !cardId) return null;

            return Object.assign({}, newResourceInstance, { cardid: cardId, cardId: cardId });
        });

        function rebuildRiVm(graphId) {
            var gid = String(graphId || '').trim();

            self.riVm(null);
            self.riVmReady(false);
            self.creatorCardId(null);

            if (!gid || !RIS) return;

            try {
                var newVm = new RIS({
                    renderContext: 'workflow',
                    multiple: false,
                    value: self.riValue,
                    allowInstanceCreation: true,
                    graphids: ko.observableArray([gid]),
                    label: 'Target resource',
                    placeholder: 'Search or create new resourceâ€¦',
                    displayOntologyTable: false,
                    onlyManageResourceIds: true,
                    form: params.form || null,
                    tile: null,
                    pageVm: params.pageVm
                });

                self.riVm(newVm);

                window.setTimeout(function() {
                    self.riVmReady(true);
                }, 50);

                iiifAnnotationService.fetchCreatorCardId(gid).then(function(cardId) {
                    if (self.targetGraphId() === gid) self.creatorCardId(cardId);
                });
            } catch (error) {
                console.error('[iiif-annotator-step] Failed to initialize RIS:', error);
                self.error('Failed to initialize resource selector: ' + error.message);
            }
        }

        self.outputMode.subscribe(function(mode) {
            invalidateSavedState();

            if (mode !== 'annotation-and-resource') {
                resetTargetResourceState();
            }
        });

        self.targetGraphId.subscribe(function(graphId) {
            invalidateSavedState();
            self.riValue(null);
            rebuildRiVm(graphId);
        });

        self.riValue.subscribe(function() {
            invalidateSavedState();
        });

        self.openFinalizeModal = function() {
            self.error('');
            self.success('');
            self.showFinalizeModal(true);
        };

        self.cancelFinalizeModal = function() {
            self.showFinalizeModal(false);
        };

        self.canOpenFinalize = ko.pureComputed(function() {
            return !!self.manifest() && self.newAnnotations().length > 0 && !self.loading();
        });

        self.canSave = ko.pureComputed(function() {
            if (!self.manifest() || self.newAnnotations().length === 0 || self.isSaving()) return false;

            if (self.outputMode() !== 'annotation-and-resource') return true;

            return !!self.targetGraphId() && !!self.riValue();
        });

        function checkTargetGraphStructure() {
            var selectedGraphId = self.targetGraphId();

            if (!selectedGraphId) {
                return Promise.resolve({
                    hasRelatedNode: false,
                    error: 'No graph ID available'
                });
            }

            return iiifAnnotationService.checkGraphForRelatedResourceNode(selectedGraphId)
                .then(function(graphInfo) {
                    return Object.assign({}, graphInfo, {
                        resourceGraphId: selectedGraphId,
                        resourceId: self.riValue()
                    });
                });
        }

        self.updateManifestOnServer = function(annotationData, digitalResourceId, sourceManifest) {
            return iiifAnnotationService.upsertAnnotation(annotationData, digitalResourceId, sourceManifest);
        };

        self.createAnnotationResource = function(annotation, hostResourceId) {
            return iiifAnnotationService.createAnnotationResource(annotation, hostResourceId);
        };

        self.addAnnotationsToTargetResource = function(targetResourceId, annotationResourceIds, targetResourceInfo) {
            return iiifAnnotationService.addAnnotationsToTargetResource(
                targetResourceId,
                annotationResourceIds,
                targetResourceInfo
            );
        };

        self.saveAnnotationsOnly = function() {
            var annotations = self.newAnnotations() || [];
            var hostResourceId = self.hostResourceId();
            var sourceManifest = self.manifest() || null;

            return Promise.all(annotations.map(function(annotation) {
                return self.createAnnotationResource(annotation, hostResourceId);
            })).then(function(annotationResourceIds) {
                return Promise.all(annotations.map(function(annotation, index) {
                    var withResourceId = Object.assign({}, annotation, {
                        annotationResourceId: annotationResourceIds[index]
                    });

                    return self.updateManifestOnServer(withResourceId, hostResourceId, sourceManifest)
                        .then(function() {
                            return withResourceId;
                        });
                }));
            });
        };

        self.saveAnnotationsWithTargetResource = function(targetResourceId, targetResourceInfo) {
            var annotations = self.newAnnotations() || [];
            var hostResourceId = self.hostResourceId();
            var sourceManifest = self.manifest() || null;

            return Promise.all(annotations.map(function(annotation) {
                return self.createAnnotationResource(annotation, hostResourceId);
            }))
                .then(function(annotationResourceIds) {
                    if (targetResourceInfo.hasRelatedNode) {
                        return self.addAnnotationsToTargetResource(targetResourceId, annotationResourceIds, targetResourceInfo)
                            .then(function() {
                                return annotationResourceIds;
                            });
                    }

                    return annotationResourceIds;
                })
                .then(function(annotationResourceIds) {
                    return Promise.all(annotations.map(function(annotation, index) {
                        var withResourceId = Object.assign({}, annotation, {
                            annotationResourceId: annotationResourceIds[index]
                        });

                        return self.updateManifestOnServer(withResourceId, hostResourceId, sourceManifest)
                            .then(function() {
                                return withResourceId;
                            });
                    }));
                });
        };

        self.saveAll = function() {
            if (!self.manifest()) {
                self.error('Manifest not loaded.');
                return Promise.reject(new Error('Manifest not loaded.'));
            }

            if (!self.newAnnotations().length) {
                self.error('No new annotations to save.');
                return Promise.reject(new Error('No new annotations to save.'));
            }

            if (self.outputMode() === 'annotation-and-resource') {
                if (!self.targetGraphId()) {
                    self.error('Choose target resource type first.');
                    return Promise.reject(new Error('Missing target graph.'));
                }

                if (!self.riValue()) {
                    self.error('Choose or create target resource first.');
                    return Promise.reject(new Error('Missing target resource.'));
                }

                if (!iiifAnnotationUtils.isUuid(String(self.riValue()))) {
                    self.error('Target resource ID is not a valid UUID.');
                    return Promise.reject(new Error('Invalid target resource UUID.'));
                }
            }

            self.isSaving(true);
            self.error('');
            self.success('');
            self.isSaved(false);

            var savePromise = (self.outputMode() === 'annotation-and-resource')
                ? checkTargetGraphStructure().then(function(targetInfo) {
                    return self.saveAnnotationsWithTargetResource(self.riValue(), targetInfo);
                })
                : self.saveAnnotationsOnly();

            return savePromise
                .then(function(savedAnnotations) {
                    var mergedExisting = self.existingAnnotations().slice().concat(
                        (savedAnnotations || []).map(function(annotation) {
                            return iiifAnnotationUtils.buildV3Annotation(annotation);
                        })
                    );

                    self.existingAnnotations(mergedExisting);
                    self.newAnnotations.removeAll();

                    self.value(buildStepPayload());
                    self.isSaved(true);
                    self.success('Annotations saved successfully.');
                    self.showFinalizeModal(false);
                })
                .catch(function(error) {
                    console.error('[iiif-annotator-step] saveAll failed:', error);
                    self.error('Failed to save: ' + (error && error.message ? error.message : String(error)));
                    throw error;
                })
                .finally(function() {
                    self.isSaving(false);
                });
        };

        self.confirmFinalizeModal = function() {
            self.saveAll().catch(function() {
                // handled in saveAll
            });
        };

        if (params.form && params.form.complete) {
            params.form.complete(ko.pureComputed(function() {
                return self.isSaved() && !self.isSaving();
            }));
        }

        if (params.form && params.form.save) {
            var originalSave = params.form.save;
            params.form.save = function() {
                self.value(buildStepPayload());

                if (!self.isSaved()) {
                    return Promise.reject(new Error('Annotations must be saved before completing the workflow.'));
                }

                return originalSave ? originalSave.apply(params.form, arguments) : Promise.resolve(true);
            };
        }

        self.newAnnotations.subscribe(invalidateSavedState);
        self.outputMode.subscribe(invalidateSavedState);

        return self;
    }

    return ko.components.register('iiif-annotator-step', {
        viewModel: viewModel,
        template: template
    });
});
