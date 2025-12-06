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
        self.ANNOTATIONS_GRAPH_ID = '2880934b-0015-4c5a-8ec1-1ab9bca329fd';
        self.NAME_NODE_ID = 'e202ea9f-e0a9-42a3-85a1-6380bc1115b9';
        self.DESCRIPTION_NODE_ID = 'e4c6d7e5-317d-4d04-9936-e4ad1886ba05';
        self.COLOR_NODE_ID = 'd691d389-6259-4765-b2d3-7f7f98057101';
        self.GEOMETRY_NODE_ID = '4277f805-09e7-4db1-bf26-49c09132c720';
        self.RELATED_NODE_ID = '5266b89c-72f7-41cf-a7f4-cde1df9efef9';

        self.PARENT_ANNOTATIONS_NODE_ID = '82c68bd5-586a-4a27-984d-b1aa5fd0f54c';

        self.isLoading = ko.observable(false);
        self.error = ko.observable('');
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(true);
        self.allowObjectPicking = ko.observable(true);
        self.existingAnnotations = ko.observableArray([]);
        self.parentResourceId = ko.observable(params.parentResourceId || null);
        self.annotationsIds = ko.observableArray([]);
        self.parentAnnotationsTileId = ko.observable(null);

        self.onAnnotationSaved = function(annotationData) {
            console.log('[Workflow] Annotation saved:', annotationData);
            return self._saveAnnotationResource(annotationData);
        };

        self._saveAnnotationResource = function(annotationData) {
            const annotationId = annotationData.id;
            
            const nameData = {};
            nameData[self.NAME_NODE_ID] = annotationData.name || 'Unnamed Annotation';

            const descriptionData = {};
            descriptionData[self.DESCRIPTION_NODE_ID] = annotationData.description || '';

            const colorData = {};
            colorData[self.COLOR_NODE_ID] = annotationData.color || '#ffffff';

            const geometryData = {};
            geometryData[self.GEOMETRY_NODE_ID] = JSON.stringify(annotationData.position);

            const relData = {};
            relData[self.RELATED_NODE_ID] = [{
                resourceId: self.parentResourceId(),
                ontologyProperty: self.REL_ONTOLOGY_PROPERTY_ID || "",
                inverseOntologyProperty: self.REL_INVERSE_PROPERTY_ID || "",
                resourceXresourceId: ""
            }];

            const parentAnnotationsData = {};
            self.annotationsIds([...self.annotationsIds(), annotationId]);
            parentAnnotationsData[self.PARENT_ANNOTATIONS_NODE_ID] = JSON.stringify(self.annotationsIds());

            return self._postTile(self.NAME_NODE_ID, nameData, annotationId)
                .then(() => 
                    self._postTile(self.DESCRIPTION_NODE_ID, descriptionData, annotationId)
                ).then(() => 
                    self._postTile(self.COLOR_NODE_ID, colorData, annotationId)
                ).then(() =>
                    self._postTile(self.GEOMETRY_NODE_ID, geometryData, annotationId)
                ).then(() =>
                    self._postTile(self.RELATED_NODE_ID, relData, annotationId)
                ).then(() =>
                    self._postTile(self.PARENT_ANNOTATIONS_NODE_ID, parentAnnotationsData, self.parentResourceId())
                );
        };

        self._postTile = function(nodegroupId, data, resourceId) {
            const isParentList = nodegroupId === self.PARENT_ANNOTATIONS_NODE_ID;
            const payload = {
                tileid: isParentList && self.parentAnnotationsTileId() ? self.parentAnnotationsTileId() : '',
                nodegroup_id: nodegroupId,
                parenttile_id: null,
                resourceinstance_id: resourceId,
                sortorder: 0,
                tiles: {},
                data: data
            };

            return tileService.createOne(payload).then(result => {
                if (isParentList) {
                    const returnedTileId = result?.tileid || result?.data?.tileid;
                    if (returnedTileId) {
                        self.parentAnnotationsTileId(returnedTileId);
                    }
                }
                return result;
            });
        }

        self.onAnnotationDeleted = function(annotationId) {
            self._deleteAnnotationResource(annotationId);
            console.log('[Workflow] Annotation deleted:', annotationId);
        };

        self._deleteAnnotationResource = function(resourceId) {
            const parentAnnotationsData = {};
            self.annotationsIds(self.annotationsIds().filter(id => id !== resourceId));
            parentAnnotationsData[self.PARENT_ANNOTATIONS_NODE_ID] = JSON.stringify(self.annotationsIds());
            self._postTile(self.PARENT_ANNOTATIONS_NODE_ID, parentAnnotationsData, self.parentResourceId());
            return resourceService.deleteOne(resourceId);
        };

        self._fetchExistingAnnotationsData = function() {
            return resourceService.getOne(self.parentResourceId())
                .then(resourceData => {
                    const tiles = resourceData.tiles || resourceData._tiles || [];
                    const parentTile = Array.isArray(tiles)
                        ? tiles.find(t => t.nodegroup_id === self.PARENT_ANNOTATIONS_NODE_ID)
                        : null;
                    if (parentTile?.tileid) {
                        self.parentAnnotationsTileId(parentTile.tileid);
                    }
                    const raw = resourceData.resource.Annotations || '[]';
                    const ids = JSON.parse(raw);
                    self.annotationsIds(ids);
                    return ids.length ? ids.map(id => resourceService.getOne(id)) : [];
                });
        };

        console.log("parent:", self.parentResourceId());

        (async function() {
            if (self.parentResourceId()) {
                try {
                    self.isLoading(true);
                    
                    const modelData = await resourceService.getOne(self.parentResourceId());
                    const annotationsPromises = await self._fetchExistingAnnotationsData();
                    const annotationsData = await Promise.all(annotationsPromises);
                    
                    modelData.resourceId = self.parentResourceId();
                    self.models3D.push(modelData);
                    console.log("Added model to models3D:", modelData);
                    
                    console.log("Fetched related annotations:", annotationsData);
                    self.existingAnnotations(annotationsData);
                    
                } catch (error) {
                    console.error("Failed to load data:", error);
                    self.error("Failed to load data.");
                } finally {
                    self.isLoading(false);
                }
            }
        })();
    }

    return ko.components.register('model-annotator-step', {
        viewModel: viewModel,
        template: template
    });  
});