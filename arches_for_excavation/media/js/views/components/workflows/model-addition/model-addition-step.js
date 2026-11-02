define([
    'knockout',
    'templates/views/components/workflows/model-addition/model-addition-step.htm',
    '../../../../services/tile-service',
    '../../../../services/models-3d-service',
    '../../../../services/tus-service',
    'tus-js-client',
    'arches',
    'bindings/dropzone'
], function(ko, template, tileServiceModule, models3dServiceModule, tusServiceInstance, tus, arches) {
    return ko.components.register('model-addition-step', {
        viewModel: function(params) {
            const self = this;
            self.value = params.value;
            console.log('Arches:', arches.default || arches);
            const tileService = tileServiceModule.default || tileServiceModule;
            const models3dService = models3dServiceModule.default || models3dServiceModule;
            const tusService = tusServiceInstance.default || tusServiceInstance;
            
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
            self.modelId = null;
            self.currentUpload = null;

            self._createUuid4 = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0;
                    var v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }

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
                        throw error;
                    });
            }

            self.dropzoneOptionsZip = {
                url: '/dummy-upload-endpoint/',
                maxFiles: 1,
                acceptedFiles: '.zip,.3tz',
                autoProcessQueue: false,
                maxFilesize: Infinity,
                clickable: '#dropzone-button',
                previewsContainer: '#dropzone-preview',
                addRemoveLinks: true,
                init: function() {
                    var dz = this;
                    self.dropzone = dz;

                    dz.on('addedfile', function(file) {
                        self.canSubmit(true);
                        self.errorMessage('');
                        self.successMessage('');

                        if (self.currentUpload) {
                            self.currentUpload.abort(false);
                            self.currentUpload = null;
                        }
                        
                        const extractedName = file.name.split('.').slice(0, -1).join('.');
                        self.modelName(extractedName);

                        const checker = new tus.Upload(file, { endpoint: tusService.getUploadUrl() });
                        checker.findPreviousUploads().then(function (previousUploads) {
                            if (previousUploads.length) {
                                const oldMetadata = previousUploads[0].metadata;
                                if (oldMetadata) {
                                    self.modelName(oldMetadata.model_name || extractedName);
                                    self.modelId = oldMetadata.model_id || null;
                                    self.infoMessage('This file has an unfinished upload. It will continue from where it left off. We auto-filled your original settings.');
                                }
                            }

                        })
                        
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
                        if (self.currentUpload) {
                            self.currentUpload.abort(true);
                            self.currentUpload = null;
                        }
                    });

                    dz.on('dragover', function() { dz.element.classList.add('dragover'); });
                    dz.on('dragleave', function() { dz.element.classList.remove('dragover'); });
                    dz.on('drop', function() { dz.element.classList.remove('dragover'); });
                }
            };

            self.submitUpload = async function() {
                const token = (await tusService.generateSecureToken()).token;
                if (!token) {
                    self.errorMessage('Failed to obtain a secure upload token. Please try again.');
                    return;
                }

                if (self.dropzone.files.length > 0) {
                    const file = self.dropzone.files[0];
                    if (!self.parentResourceId()) {
                        self.errorMessage('Cannot upload a 3D model without a parent resource.');
                        return;
                    }
                    self.modelId = self.modelId || self._createUuid4();
                    const upload = new tus.Upload(file, {
                        endpoint: tusService.getUploadUrl(),
                        retryDelays: [0, 3000, 5000, 10000, 20000],
                        removeFingerprintOnSuccess: true,
                        metadata: {
                            upload_token: token,
                            upload_type: tusService.TUS_UPLOAD_TYPES.model,
                            model_name: self.modelName(),
                            model_id: self.modelId,
                            parent_resource_id: self.parentResourceId()
                        },
                        onError: function(error) {
                            self.currentUpload = null;
                            let errorMessage = error.message || 'An error occurred during the upload.';
                            
                            if (error.originalResponse) {
                                const rawBody = error.originalResponse.getBody();

                                try {
                                    const data = JSON.parse(rawBody);
                                    if (data.error) {
                                        errorMessage = data.error;
                                    }
                                } catch (parseError) {
                                    if (rawBody && rawBody.trim().length > 0) {
                                        errorMessage = rawBody.trim();
                                    }
                                }
                            }
                            self.errorMessage(`Upload failed: ${errorMessage}`);
                            self.infoMessage('');
                            self.successMessage('');
                            self.canSubmit(true);
                        },
                        onProgress: function(bytesUploaded, bytesTotal) {
                            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                            self.infoMessage(`Upload progress: ${percentage}%`);
                        },
                        onSuccess: function() {
                            if(self.currentUpload) {
                                const modelUrl = `/files/uploadedfiles/3d_models/${self.parentResourceId()}/${self.modelId}/`;
                                models3dService.waitForModelStatus(
                                    self.parentResourceId(),
                                    self.modelId
                                ).then(status => {
                                    self.isGeoreferenced(status.georeferenced);
                                    return self._createModelResource(self.modelName(), modelUrl, self.modelId);
                                }).then(() => {
                                    self.successMessage('Upload completed successfully!');
                                    self.infoMessage('');
                                    self.errorMessage('');
                                    self.canSubmit(false);
                                    self.value(self.modelId);
                                }).catch((error) => {
                                    self.errorMessage('Upload completed, but failed to create model resource: ' + (error.message || error));
                                    self.infoMessage('');
                                    self.successMessage('');
                                });
                            }
                            self.currentUpload = null;
                        }
                    });
                    self.currentUpload = upload;
                    upload.findPreviousUploads().then(async function (previousUploads) {
                    if (previousUploads.length) {
                        const newMetadata = {
                            upload_type: tusService.TUS_UPLOAD_TYPES.model,
                            upload_token: token,
                            model_name: self.modelName(),
                            model_id: self.modelId,
                            parent_resource_id: self.parentResourceId()
                        };

                        const tusFileId = previousUploads[0].uploadUrl.split('/').pop();
                        try {
                            await tusService.patchTusMetadata(tusFileId, newMetadata);
                        } catch (patchErr) {
                            console.error("Failed to sync new metadata, proceeding with old metadata:", patchErr);
                            self.errorMessage('Failed to sync new metadata with the server. Proceeding with previous metadata.');
                            self.infoMessage('');
                            self.successMessage('');
                        }
                        upload.resumeFromPreviousUpload(previousUploads[0])
                    }

                    upload.start();
                    })
                }
            };
        },
        template: template
    });
});