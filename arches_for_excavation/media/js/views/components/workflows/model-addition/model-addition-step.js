define([
    'knockout',
    'arches',
    'templates/views/components/workflows/model-addition/model-addition-step.htm',
    'bindings/dropzone'
], function(ko, arches, template) {
    return ko.components.register('model-addition-step', {
        viewModel: function(params) {
            const self = this;

            self.REL_ONTOLOGY_PROPERTY_ID = null;
            self.REL_INVERSE_PROPERTY_ID = null;
            self.NAME_NODE_ID = 'e86d68d2-04f0-4d26-b9a1-ee2d17d18232'
            self.URL_NODE_ID = '5c156476-b54c-4e7b-80b2-005667812d4e'
            self.RELATED_NODE_ID = '19d7fe5b-59ff-46e4-8366-9b2cc77b0a8d'

            self.loading = ko.observable(false);
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            self.canSubmit = ko.observable(false);
            self.isGeoreferenced = ko.observable(false);
            self.parentResourceId = ko.observable(
                params.parentResourceId || null
            ); 

            self._getCookie = function(name) {
                let cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    const cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].trim();
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
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
                
                let formData = new FormData();
                formData.append('data', JSON.stringify(payload));

                const url = '/tile'

                return fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'X-CSRFToken': self._getCookie('csrftoken') },
                    body: formData
                }).then(function(resp) {
                    if (!resp.ok) throw new Error('HTTP ' + resp.status);
                    return resp.json ? resp.json() : {};
                });
            } 

            self._createModelResource = function(name, url, resourceId) {
                // wrap values into objects keyed by node id (server expects an object mapping node IDs -> values)
                const nameData = {};
                nameData[self.NAME_NODE_ID] = name;

                const urlData = {};
                // if the URL node expects a language object, change to { [lang]: { value: url, direction: 'ltr' } }
                urlData[self.URL_NODE_ID] = url;

                let relData = {};
                relData[self.RELATED_NODE_ID] = [{
                    resourceId: self.parentResourceId(),
                    ontologyProperty: self.REL_ONTOLOGY_PROPERTY_ID || "",
                    inverseOntologyProperty: self.REL_INVERSE_PROPERTY_ID || "",
                    resourceXresourceId: ""
                }];
                console.log("relData", relData);
                return self._postTile(self.NAME_NODE_ID, nameData, resourceId)
                    .then(function() {
                        return self._postTile(self.URL_NODE_ID, urlData, resourceId);
                    })
                    .then(function() {
                        return self._postTile(self.RELATED_NODE_ID, relData, resourceId);
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
                paramName: 'zip_file',
                maxFiles: 1,
                acceptedFiles: '.zip',
                autoProcessQueue: false,
                clickable: '#dropzone-button',
                previewsContainer: '#dropzone-preview',
                addRemoveLinks: true,
                headers: {
                    'X-CSRFToken': self._getCookie('csrftoken')
                },
                init: function() {
                    var dz = this;
                    self.dropzone = dz;

                    dz.on('addedfile', function(file) {
                        self.canSubmit(true);
                        self.errorMessage('');
                        
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
                    });

                    dz.on('sending', function(file, xhr, formData) {
                        self.loading(true);
                        formData.append('parent_resource_id', self.parentResourceId() || '');
                    });

                    dz.on('success', function(file, response) {
                        console.log('Upload successful:', response);
                        const {_, model_id, url} = response;
                        self._createModelResource(file.name, url, model_id);
                        self.loading(false);
                        self.errorMessage('');
                        self.successMessage('3D model uploaded successfully.');
                        self.canSubmit(false);
                    });

                    dz.on('error', function(file, errorMessage) {
                        console.error('Upload failed:', errorMessage);
                        self.errorMessage(typeof errorMessage === 'string' ? errorMessage : 'Upload failed');
                    });

                    dz.on('complete', function() {
                        self.loading(false);
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