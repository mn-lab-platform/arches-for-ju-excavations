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
            self.value = params.value;
            const tileService = tileServiceModule.default || tileServiceModule;
            
            self.LABEL_NODE_ID = '5b1ab6bd-faf6-4120-93ae-8e6f4ea1de32';
            self.CREATED_AT_NODE_ID = '664b24d2-b94d-4cfd-be93-eb7d94ea0c03';
            self.CREATED_AT_NODEGROUP_ID = '27bb6c9e-cd39-4d8e-ba37-ed6bad2284f3';
            self.GEOREFERENCED_NODE_ID = 'dc5d3b0a-f66a-4c66-b951-0d99fc68367b';
            self.URL_NODE_ID = 'c38b2683-4297-4a83-87ba-de31a4ec88d8';
            self.RELATED_NODE_ID = 'f67c4c42-fe0e-489b-9af7-58405ad7c65f';

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
                const sanitized = name.replace(/[\/\\:*?"<>|]/g, '_').trim();
                return sanitized;
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
                
                return tileService.createOne(payload).then(function(response) {
                    return response;
                }).catch(function(error) {
                    console.error(`[ModelAdditionStep] _postTile ERROR for nodegroupId: ${nodegroupId}`, error);
                    throw error;
                });
            } 

            self._createModelResource = function(name, url, resourceId) {
                const labelData = {};
                labelData[self.LABEL_NODE_ID] = name;

                const urlData = {};
                urlData[self.URL_NODE_ID] = url;
                
                const georeferencedData = {};
                georeferencedData[self.GEOREFERENCED_NODE_ID] = self.isGeoreferenced();

                const createdAtData = {};
                createdAtData[self.CREATED_AT_NODE_ID] = new Date().toISOString();

                const relData = {};
                relData[self.RELATED_NODE_ID] = [{
                    resourceId: self.parentResourceId()
                }];

                return self._postTile(self.LABEL_NODE_ID, labelData, resourceId)
                    .then(function() {
                        return self._postTile(self.URL_NODE_ID, urlData, resourceId);
                    })
                    .then(function() {
                        return self._postTile(self.RELATED_NODE_ID, relData, resourceId);
                    })
                    .then(function() {
                        return self._postTile(self.CREATED_AT_NODEGROUP_ID, createdAtData, resourceId);
                    })
                    .then(function() {
                        return self._postTile(self.GEOREFERENCED_NODE_ID, georeferencedData, resourceId);
                    })
                    .then(function() {
                        console.log('[ModelAdditionStep] All tiles created successfully!');
                    })
                    .catch(function(error) {
                        console.error('[ModelAdditionStep] Promise chain broken! Error creating model resource:', error);
                        self.errorMessage('Error creating model resource: ' + (error.message || error));
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
                        
                        const extractedName = file.name.split('.').slice(0, -1).join('.');
                        self.modelName(extractedName);
                        
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
                        const {_, model_id, url, georeferenced} = response;
                        self.isGeoreferenced(georeferenced);
                        
                        const currentModelName = self.modelName();                        
                        const safeName = self._sanitizeFilename(currentModelName);
                        self._createModelResource(safeName, url, model_id);
                        
                        self.errorMessage('');
                        self.successMessage('3D model uploaded successfully.');
                        self.canSubmit(false);
                        self.value(model_id);
                    });

                    dz.on('error', function(file, errorMessage) {
                        console.error('Upload failed:', errorMessage);
                        self.errorMessage(typeof errorMessage === 'string' ? errorMessage : 'Upload failed');
                        self.infoMessage('');
                        self.successMessage('');
                    });

                    dz.on('complete', function() {
                        console.log('[ModelAdditionStep] Dropzone: upload complete event triggered.');
                        self.infoMessage('');
                    });

                    dz.on('dragover', function() { dz.element.classList.add('dragover'); });
                    dz.on('dragleave', function() { dz.element.classList.remove('dragover'); });
                    dz.on('drop', function() { dz.element.classList.remove('dragover'); });
                }
            };

            self.submitUpload = function() {
                if (self.dropzone.files.length > 0) {
                    self.dropzone.processQueue();
                } else {
                    console.warn('[ModelAdditionStep] Cannot submit: No files in Dropzone queue.');
                }
            };
        },
        template: template
    });
});