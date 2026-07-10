define([
    'knockout',
    'jquery',
    'arches',
    'templates/views/components/workflows/model-annotation/model-annotator-step.htm',
    '../../../../services/resource-service',
    '../../../../services/tile-service',
    'views/components/custom/cesium-viewer'
], function(ko, $, arches, template, resourceServiceModule, tileServiceModule) {
    function viewModel(params) {
        const self = this;
        const resourceService = resourceServiceModule.default || resourceServiceModule;
        const tileService = tileServiceModule.default || tileServiceModule;

        self.REL_ONTOLOGY_PROPERTY_ID = null;
        self.REL_INVERSE_PROPERTY_ID = null;
        self.ANNOTATION_NAME_NODE_ID = 'e202ea9f-e0a9-42a3-85a1-6380bc1115b9';
        self.ANNOTATION_DESCRIPTION_NODE_ID = 'e4c6d7e5-317d-4d04-9936-e4ad1886ba05';
        self.ANNOTATION_COLOR_NODE_ID = 'd691d389-6259-4765-b2d3-7f7f98057101';
        self.ANNOTATION_GEOMETRY_NODE_ID = '4277f805-09e7-4db1-bf26-49c09132c720';
        self.ANNOTATION_RELATED_NODE_ID = '5266b89c-72f7-41cf-a7f4-cde1df9efef9';

        self.ANNOTATION_MODEL_GRAPHID = '2880934b-0015-4c5a-8ec1-1ab9bca329fd';
        self.CRS_MODEL_GRAPHID = 'a5219c24-2907-4055-9d68-18216d214458';

        self.MODE = {
            ADD: 'add',
            EDIT: 'edit'
        };

        self.value = params.value;
        self.modelResourceId = ko.observable(params.parentResourceId || null);
        self.mode = ko.observable(params.mode || 'add');

        self.infoMessage = ko.observable(null);
        self.error = ko.observable(null);
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(self.mode() === self.MODE.EDIT);
        self.allowObjectPicking = ko.observable(self.mode() === self.MODE.EDIT);
        self.allowObjectAddition = ko.observable(self.mode() === self.MODE.ADD);
        self.existingAnnotations = ko.observableArray([]);
        self.modelCrsDefinitions = ko.observableArray([]);
        
        self.annotationsIds = [];

        self.onPolygonCompleted = function(annotationData) {
            self.value(annotationData);
        }

        self.onAnnotationDeleted = function(annotationId) {
            self.infoMessage("Deleting annotation...");
            self.value({id: annotationId, deleted: true});
            self._deleteAnnotation(annotationId).then(function() {
                self.existingAnnotations(self.existingAnnotations().filter(anno => anno.id !== annotationId));
                self.infoMessage(null);
                self.value(1); // placeholder to make workflow proceed
            });
            console.log('[Workflow] Annotation deleted:', annotationId);
        };

        self.onAnnotationUpdated = function(annotationData) {
            self.infoMessage("Saving changes...");
            console.log('[Workflow] Annotation updated:', annotationData);
            if (self._savedAnnotationAlreadyExists(annotationData.id)) {
                console.log("Annotation already exists.");
                return self.updateExistingAnnotation(annotationData).then(function() {
                    self.infoMessage(null);
                    self.value(1); // placeholder to make workflow proceed
                });
            }
        };

        self.updateExistingAnnotation = function(annotationData) {
            const annotationId = annotationData.id;

            return tileService.getAllForResource(annotationId)
                .then(tilesWrapper => {
                    const tiles = tilesWrapper.tiles || [];
                    const nameTile = tiles.find(t => (t.nodegroup === self.ANNOTATION_NAME_NODE_ID));
                    const descriptionTile = tiles.find(t => (t.nodegroup === self.ANNOTATION_DESCRIPTION_NODE_ID));
                    const colorTile = tiles.find(t => (t.nodegroup === self.ANNOTATION_COLOR_NODE_ID));

                    const nameData = {};
                    nameData[self.ANNOTATION_NAME_NODE_ID] = annotationData.name || 'Unnamed Annotation';

                    const descriptionData = {};
                    descriptionData[self.ANNOTATION_DESCRIPTION_NODE_ID] = annotationData.description || '';

                    const colorData = {};
                    colorData[self.ANNOTATION_COLOR_NODE_ID] = annotationData.color || '#ffffff';

                    return self._postTile(self.ANNOTATION_NAME_NODE_ID, nameData, annotationId, nameTile.tileid)
                        .then(() =>
                            self._postTile(self.ANNOTATION_DESCRIPTION_NODE_ID, descriptionData, annotationId, descriptionTile.tileid)
                        ).then(() =>
                            self._postTile(self.ANNOTATION_COLOR_NODE_ID, colorData, annotationId, colorTile.tileid)
                        );
                });
        };

        self._deleteAnnotation = function(resourceId) {
            self.annotationsIds = self.annotationsIds.filter(id => id !== resourceId);
            return resourceService.deleteOne(resourceId);
        };

        self._postTile = function(nodegroupId, data, resourceId, tileId='') {
            const payload = {
                tileid: tileId,
                nodegroup_id: nodegroupId,
                parenttile_id: null,
                resourceinstance_id: resourceId,
                sortorder: 0,
                tiles: {},
                data: data
            };

            if (payload.tileid) {
                return tileService.updateOne(payload);
            }

            return tileService.createOne(payload);
        };

        self._savedAnnotationAlreadyExists = function(annotationIdResourceId) {
            return self.annotationsIds.includes(annotationIdResourceId);
        };

        self._fetchExistingAnnotationsData = function() {
            return resourceService.getAllRelatedTo(self.modelResourceId()).then(function(relatedResources) {
                const relatedResourcesArray = relatedResources.related_resources.related_resources || [];
                self.annotationsIds = relatedResourcesArray.filter(function(rel) {
                    return rel.graph_id === self.ANNOTATION_MODEL_GRAPHID;
                }).map(function(rel) {
                    return rel.resourceinstanceid;
                });   
                
                const fetchPromises = self.annotationsIds.map(function(id) {
                    return resourceService.getOne(id);
                });
                return Promise.all(fetchPromises);
            });
        };

        self._formatAnnotationData = function(annotationResourceObject) {
            console.log("Formatting annotation data for resource: ", annotationResourceObject);
            const resource = annotationResourceObject && annotationResourceObject.resource ? annotationResourceObject.resource : {};
            return {
                id: annotationResourceObject.resourceinstanceid,
                name: annotationResourceObject.displayname || 'Unnamed Annotation',
                description: annotationResourceObject.displaydescription || '',
                color: resource.Color || '#ffffff',
                geometry: resource.Geometry ? JSON.parse(resource.Geometry) : [],
                relatedResourceName: resource["Related Resource"] || '',
                isResource: false
            }
        };

        self._fetchCrsDefinitionForResource = function() {
            return resourceService.getAllRelatedTo(self.modelResourceId()).then(function(relatedResources) {
                const relatedResourcesArray = relatedResources.related_resources.related_resources || [];
                const relatedCRSObject = relatedResourcesArray.filter(function(rel) {
                    return rel.graph_id === self.CRS_MODEL_GRAPHID;
                });
                if (relatedCRSObject.length === 0) {
                    console.log("No related CRS resource found.");
                    return null;
                }
                const crsResourceId = relatedCRSObject[0].resourceinstanceid;
                return resourceService.getOne(crsResourceId);
            });
        };

        if (self.modelResourceId()) {
            self.infoMessage("Loading 3D models...");

            const modelPromise = resourceService.getOne(self.modelResourceId());
            const annotationsPromise = self._fetchExistingAnnotationsData();
            const crsPromise = self._fetchCrsDefinitionForResource();

            Promise.all([modelPromise, annotationsPromise, crsPromise]).then(function(results) {
                const modelData = results[0];
                const annotationsData = results[1];
                const crsData = results[2];
                console.log("CRS data fetched: ", crsData);

                modelData.resourceId = self.modelResourceId();
                self.models3D.push(modelData);

                const formattedAnnotations = annotationsData
                    .filter(function(a) { return a && typeof a === 'object' && !a.then && typeof a !== 'function'; })
                    .map(function(a) { return self._formatAnnotationData(a); });

                self.existingAnnotations(formattedAnnotations);

                if (crsData) {
                    self.modelCrsDefinitions([{
                        modelResourceId: self.modelResourceId(),
                        crs: {
                            proj: crsData.resource.Definition.PROJ4['PROJ4 String'] || '',
                            wkt: crsData.resource.Definition['WKT-2']['WKT-2 String'] || '',
                            esri: crsData.resource.Definition['ESRI WKT']['ESRI WKT String'] || ''
                        }
                    }]);
                }
            }).catch(function(error) {
                console.error("Failed to load data:", error);
                self.error("Failed to load data.");
            }).finally(function() {
                self.infoMessage(null);
            });
        }
    }
    
    return ko.components.register('model-annotator-step', {
        viewModel: viewModel,
        template: template
    });  
});