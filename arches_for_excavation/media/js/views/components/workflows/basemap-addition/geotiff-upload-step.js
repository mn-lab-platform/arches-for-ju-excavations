define([
    'knockout',
    'arches',
    'templates/views/components/workflows/basemap-addition/geotiff-upload-step.htm',
    '../../../../services/basemap-service',
    '../../../../services/service-utils',
    'bindings/dropzone'
], function(ko, arches, template, basemapServiceModule, serviceUtils) {
    return ko.components.register('geotiff-upload-step', {
        viewModel: function(params) {
            const CELERY_STATES = {
                pending: 'PENDING',
                started: 'STARTED',
                success: 'SUCCESS',
                failure: 'FAILURE',
                revoked: 'REVOKED',
            }
            const self = this;
            const basemapService = basemapServiceModule.default || basemapServiceModule;

            self.basemapName = ko.observable('');
            self.sortOrder = ko.observable(0);
            self.addToMap = ko.observable(true);
            self.isOverlay = ko.observable(false);
            self.searchOnly = ko.observable(false);
            self.isPublic = ko.observable(true);

            self.errorMessage = ko.observable(null);
            self.infoMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            self.canSubmit = ko.observable(false);

            self.sourceConfig = {};
            self.layerConfig = {};
            
            self.dropzoneOptionsZip = {
                url: '/api/basemap/upload',
                paramName: 'basemap_geotiff',
                maxFiles: 1,
                acceptedFiles: '.tiff, .tif',
                autoProcessQueue: false,
                maxFilesize: Infinity,
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
                        const thumbnailElement = file.previewElement.querySelector("[data-dz-thumbnail]");
                        if (thumbnailElement) {
                            thumbnailElement.style.display = 'none';
                            
                            const iconElement = document.createElement('i');
                            iconElement.className = 'fa fa-map fa-5x';
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
                        self.basemapName('');
                        self.sortOrder(0);
                    });

                    dz.on('sending', function(file, xhr, formData) {
                        formData.append('basemap_name', self._sanitizeFilename(self.basemapName()));
                        formData.append('basemap_sortorder', self.sortOrder());
                        formData.append('basemap_addto_map', self.addToMap());
                        formData.append('basemap_searchonly', self.searchOnly());
                        formData.append('basemap_ispublic', self.isPublic());
                        formData.append('basemap_isoverlay', self.isOverlay());
                        self.infoMessage('Uploading basemap GEOTIFF file...  0%');
                    });

                    dz.on('uploadprogress', function(file, progress, bytesSent) {
                        self.infoMessage(`Uploading basemap GEOTIFF file...  ${Math.round(progress)}%`);
                    });

                    dz.on('success', function(file, response) {
                        console.log('Upload successful:', response);
                        self.infoMessage('Basemap upload initiated. Processing your file in the background...');
                        self.errorMessage('');
                        self.successMessage('');
                        self.canSubmit(false);

                        self.pollTask(response.task_id);
                        self._populateBasemapConfigs(response.basemap_metadata);
                    });

                    dz.on('error', function(file, errorMessage) {
                        console.error('Upload failed:', errorMessage);
                        self.errorMessage(typeof errorMessage === 'string' ? errorMessage : 'Upload failed');
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

            self.pollTask = function(taskId) {
                basemapService.getCeleryTaskStatus(taskId).then(response => {
                    const { _, state, info } = response;
                    if (state === CELERY_STATES.success) {
                        self.infoMessage('');
                        self.infoMessage('Basemap processing completed successfully. Adding basemap to Arches...');
                        basemapService.addSource(self.sourceConfig
                        ).then(() => 
                            basemapService.addLayer(self.layerConfig)
                        ).then(() => {
                            self.infoMessage('');
                            self.successMessage('Basemap added successfully.');
                        }).catch(err => {
                            self.infoMessage('');
                            self.errorMessage(`Error adding basemap to Arches: ${err.message}`);
                        });
                    } else if (state === CELERY_STATES.failure) {
                        self.infoMessage('');
                        self.errorMessage(`Basemap processing failed: ${info}`);
                    } else if (state === CELERY_STATES.revoked) {
                        self.infoMessage('');
                        self.errorMessage('Processing was cancelled (Revoked).');
                    } else {
                        self.infoMessage(`Basemap processing status: ${state}. Please wait...`);
                        setTimeout(() => self.pollTask(taskId), 2000);
                    }
                }).catch(err => {
                    self.infoMessage('');
                    self.successMessage('');
                    self.errorMessage(`Error checking task status: ${err.message}`);
                });
            }

            self._sanitizeFilename = function(name) {
                return name.replace(/[\/\\:*?"<>|]/g, '_').trim();
            };

            self._populateBasemapConfigs = function(basemapMetadata) {
                self.sourceConfig = {
                    name: basemapMetadata.id,
                    source: JSON.stringify({
                        type: 'raster',
                        tiles: [`/api/titiler/tiles/${basemapMetadata.id}/{z}/{x}/{y}`],
                        tileSize: 512,
                        bounds: basemapMetadata.bounds
                    })
                }
                
                self.layerConfig = {
                    mapLayerId: basemapMetadata.id,
                    name: basemapMetadata.name,
                    layerDefinitions: JSON.stringify([{
                        id: basemapMetadata.id,
                        type: 'raster',
                        source: basemapMetadata.id,
                    }]),
                    activated: true,
                    addToMap: basemapMetadata.add_to_map,
                    icon: 'fa fa-binoculars',
                    sortOrder: basemapMetadata.sort_order,
                    isPublic: basemapMetadata.is_public,
                    centerX: basemapMetadata.center_coordinates ? basemapMetadata.center_coordinates[0] : 0,
                    centerY: basemapMetadata.center_coordinates ? basemapMetadata.center_coordinates[1] : 0,
                    searchOnly: basemapMetadata.search_only,
                    isOverlay: basemapMetadata.is_overlay
                }
            }

            self.submitUpload = function() {
                if (self.dropzone.files.length > 0) {
                    self.dropzone.processQueue();
                }
            };
        },
        template: template
    });
});