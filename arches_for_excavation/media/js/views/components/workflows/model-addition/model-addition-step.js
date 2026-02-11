define([
    'knockout',
    'arches',
    'templates/views/components/workflows/model-addition/model-addition-step.htm',
    '../../../../services/tile-service',
    '../../../../services/service-utils',
    'bindings/dropzone'
], function(ko, arches, template, tileServiceModule, serviceUtils) {
    return ko.components.register('model-addition-step', {
        viewModel: function(params) {
            const self = this;
            const tileService = tileServiceModule.default || tileServiceModule;
            
            self.REL_ONTOLOGY_PROPERTY_ID = null;
            self.REL_INVERSE_PROPERTY_ID = null;
            self.NAME_NODE_ID = 'e86d68d2-04f0-4d26-b9a1-ee2d17d18232'
            self.CREATED_AT_NODE_ID = '79e9e772-d8cb-41e5-87a3-f4a0cce70f69'
            self.GEOREFERENCED_NODE_ID = '6f57cc4e-3c15-4483-8517-753a999ac448'
            self.URL_NODE_ID = '5c156476-b54c-4e7b-80b2-005667812d4e'
            self.RELATED_NODE_ID = '19d7fe5b-59ff-46e4-8366-9b2cc77b0a8d',
            self.ANNOTATIONS_NODE_ID = '82c68bd5-586a-4a27-984d-b1aa5fd0f54c';

            self.errorMessage = ko.observable(null);
            self.infoMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            self.canSubmit = ko.observable(false);
            self.isGeoreferenced = ko.observable(false);
            self.modelName = ko.observable('');
            self.parentResourceId = ko.observable(
                params.parentResourceId || null
            ); 

            self._sanitizeFilename = function(name) {
                return name.replace(/[\/\\:*?"<>|]/g, '_').trim();
            };

            self._postTile = function(nodegroupId, data, resourceId) {
                const payload = {
                    tileid: '',
                    nodegroup_id: nodegroupId,
                    parenttile_id: null,
                    resourceinstance_id: resourceId,
                    sortorder: 0,
                    tiles: {},
                    data: data
                };
                
                return tileService.createOne(payload);
            } 

            self._createModelResource = function(name, url, resourceId) {
                const nameData = {};
                nameData[self.NAME_NODE_ID] = name;

                const urlData = {};
                urlData[self.URL_NODE_ID] = url;
                
                const georeferencedData = {};
                georeferencedData[self.GEOREFERENCED_NODE_ID] = self.isGeoreferenced();

                const createdAtData = {};
                createdAtData[self.CREATED_AT_NODE_ID] = new Date().toISOString();

                const relData = {};
                relData[self.RELATED_NODE_ID] = [{
                    resourceId: self.parentResourceId(),
                    ontologyProperty: self.REL_ONTOLOGY_PROPERTY_ID || "",
                    inverseOntologyProperty: self.REL_INVERSE_PROPERTY_ID || "",
                    resourceXresourceId: ""
                }];

                const annotationsData = {};
                annotationsData[self.ANNOTATIONS_NODE_ID] = "[]";

                console.log("relData", relData);
                return self._postTile(self.NAME_NODE_ID, nameData, resourceId)
                    .then(function() {
                        return self._postTile(self.URL_NODE_ID, urlData, resourceId);
                    })
                    .then(function() {
                        return self._postTile(self.RELATED_NODE_ID, relData, resourceId);
                    })
                    .then(function() {
                        return self._postTile(self.CREATED_AT_NODE_ID, createdAtData, resourceId);
                    })
                    .then(function() {
                        return self._postTile(self.GEOREFERENCED_NODE_ID, georeferencedData, resourceId);
                    })
                    .then(function() {
                        return self._postTile(self.ANNOTATIONS_NODE_ID, annotationsData, resourceId);
                    })
                    .catch(function(error) {
                        console.error('Error creating model resource:', error);
                        self.errorMessage('Error creating model resource' + error.message);
                    })
                    .finally(function() {
                        console.log('Finished creating model resource');
                    });
            }

            self.dropzoneOptionsZip = {
                url: '/api/model-3d/upload/',
                paramName: 'model_file',
                maxFiles: 1,
                acceptedFiles: '.zip,.3tz',
                autoProcessQueue: false,
                maxFilesize: 10240,
                clickable: '#dropzone-button',
                previewsContainer: '#dropzone-preview',
                addRemoveLinks: true,
                headers: {
                    'X-CSRFToken': serviceUtils.getCookie('csrftoken')
                },
                init: function() {
                    var dz = this;
                    self.dropzone = dz;

                    dz.on('addedfile', function(file) {
                        self.canSubmit(true);
                        self.errorMessage('');
                        self.modelName(file.name.split('.').slice(0, -1).join('.'));
                        
                        const thumbnailElement = file.previewElement.querySelector("[data-dz-thumbnail]");
                        if (thumbnailElement) {
                            thumbnailElement.style.display = 'none';
                            
                            const iconElement = document.createElement('i');
                            iconElement.className = 'fa fa-cube fa-5x';
                            iconElement.style.color = '#5bc0de'; 
                            iconElement.style.display = 'block';
                            iconElement.style.textAlign = 'center';
                            iconElement.style.padding = '20px';
                            
                            thumbnailElement.parentNode.insertBefore(iconElement, thumbnailElement);
                        }
                    });

                    dz.on('removedfile', function() {
                        self.canSubmit(dz.files.length > 0);
                        self.errorMessage(null);
                        self.successMessage(null);
                        self.infoMessage(null);
                        self.modelName('');
                    });

                    dz.on('sending', function(file, xhr, formData) {
                        formData.append('parent_resource_id', self.parentResourceId() || '');
                        self.infoMessage('Uploading 3D model file...  0%');
                    });

                    dz.on('uploadprogress', function(file, progress, bytesSent) {
                        self.infoMessage(`Uploading 3D model file...  ${Math.round(progress)}%`);
                    });

                    dz.on('success', function(file, response) {
                        console.log('Upload successful:', response);
                        const {_, model_id, url} = response;
                        self._createModelResource(self._sanitizeFilename(self.modelName()), url, model_id);
                        self.errorMessage('');
                        self.successMessage('3D model uploaded successfully.');
                        self.canSubmit(false);
                    });

                    dz.on('error', function(file, errorMessage) {
                        console.error('Upload failed:', errorMessage);
                        self.errorMessage(typeof errorMessage === 'string' ? errorMessage : 'Upload failed');
                        self.infoMessage('');
                        self.successMessage('');
                    });

                    dz.on('complete', function() {
                        self.infoMessage('');
                    });

                    dz.on('dragover', function() {
                        dz.element.classList.add('dragover');
                    });

                    dz.on('dragleave', function() {
                        dz.element.classList.remove('dragover');
                    });

                    dz.on('drop', function() {
                        dz.element.classList.remove('dragover');
                    });
                }
            };

            self.submitUpload = function() {
                if (self.dropzone.files.length > 0) {
                    self.dropzone.processQueue();
                }
            };
        },
        template: template
    });
});