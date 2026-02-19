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
            self.value = params.value;

            const basemapService = basemapServiceModule.default || basemapServiceModule;

            self.mode = ko.observable(params.mode);
            self.submitLabel = ko.pureComputed(function() {
                return self.mode() === 'overlay' ? 'Create a new Overlay' : 'Create a new Basemap';
            });
            self.basemapName = ko.observable('');
            self.sortOrder = ko.observable(0);
            self.isPublic = ko.observable(true);
            self.isOverlay = ko.observable(self.mode() === 'overlay');

            self.errorMessage = ko.observable(null);
            self.infoMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            self.canSubmit = ko.observable(false);
            self.showModal = ko.observable(false);

            self.iconSearchQuery = ko.observable('');
            self.selectedIcon = ko.observable('fa fa-map');

            self.availableIcons = [
                'fa fa-map',
                'fa fa-map-o',
                'fa fa-map-marker',
                'fa fa-map-pin',
                'fa fa-map-signs',
                'fa fa-globe',
                'fa fa-compass',
                'fa fa-location-arrow',
                'fa fa-crosshairs',
                'fa fa-street-view',
                
                'fa fa-university',
                'fa fa-fort-awesome',
                'fa fa-building',
                'fa fa-building-o',
                'fa fa-home',
                'fa fa-ticket', 
                
                'fa fa-search',
                'fa fa-search-plus',
                'fa fa-archive',
                'fa fa-cube',
                'fa fa-cubes',
                'fa fa-diamond',
                'fa fa-certificate',
                'fa fa-graduation-cap',
                'fa fa-puzzle-piece', 
                'fa fa-language',
                
                'fa fa-history',
                'fa fa-clock-o',
                'fa fa-hourglass',
                'fa fa-hourglass-half',
                
                'fa fa-camera',
                'fa fa-camera-retro',
                'fa fa-picture-o',
                'fa fa-image',
                'fa fa-photo',
                'fa fa-file-image-o',
                'fa fa-file-text',
                'fa fa-file-text-o',
                'fa fa-files-o',
                'fa fa-book',
                'fa fa-video-camera', 
                'fa fa-share-alt', 
                'fa fa-object-group', 
                'fa fa-object-ungroup',
                
                'fa fa-database', 
                'fa fa-folder-open',
                'fa fa-tags', 
                'fa fa-barcode', 
                'fa fa-qrcode',
                'fa fa-file-pdf-o', 
                'fa fa-laptop', 
                
                'fa fa-tree',
                'fa fa-leaf',
                'fa fa-pagelines',
                'fa fa-envira',
                'fa fa-sun-o',
                'fa fa-moon-o',
                'fa fa-cloud',
                'fa fa-tint',
                'fa fa-fire',
                'fa fa-bug', 
                
                'fa fa-plane', 
                'fa fa-ship', 
                'fa fa-car', 
                'fa fa-road', 
                'fa fa-paint-brush', 
                'fa fa-spoon', 
                'fa fa-filter', 
                
                'fa fa-binoculars',
                'fa fa-eye',
                'fa fa-eye-slash',
                'fa fa-wrench',
                'fa fa-cog',
                'fa fa-cogs',
                'fa fa-pencil',
                'fa fa-edit',
                'fa fa-arrows-alt',
                'fa fa-bullseye', 
                'fa fa-flask', 
                'fa fa-magnet', 
                'fa fa-balance-scale', 
                'fa fa-level-down', 
                'fa fa-sort-amount-desc', 
                
                'fa fa-pie-chart',
                'fa fa-bar-chart',
                'fa fa-line-chart',

                'fa fa-circle',
                'fa fa-circle-o',
                'fa fa-dot-circle-o',
                'fa fa-square',
                'fa fa-square-o',
                'fa fa-star',
                'fa fa-star-o',
                'fa fa-flag',
                'fa fa-flag-o',
                'fa fa-flag-checkered',
                'fa fa-bookmark',
                'fa fa-bookmark-o',
                'fa fa-shield',
                'fa fa-anchor'
            ];
            self.filteredIcons = ko.pureComputed(function() {
                const query = self.iconSearchQuery().toLowerCase();
                if (!query) return self.availableIcons;
                return self.availableIcons.filter(icon => 
                    icon.toLowerCase().includes(query)
                );
            });

            self.selectIcon = function(icon) {
                self.selectedIcon(icon);
            };

            self.isNameProvided = ko.pureComputed(function() {
                return self.basemapName() && self.basemapName().trim().length > 0;
            });

            self.canOpenModal = ko.pureComputed(function() {
                return self.canSubmit() && self.isNameProvided();
            });

            self.submitTitle = ko.pureComputed(function() {
                if (!self.canSubmit()) { return 'Upload a GEOTIFF file to enable'; }
                if (!self.isNameProvided()) { return 'Enter a basemap name to enable'; }
                return '';
            });
            
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
                timeout: 0,
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
                            iconElement.className = self.isOverlay() ? 'fa fa-map-o fa-5x' : 'fa fa-map fa-5x';
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
                        self.basemapName('');
                        self.sortOrder(0);
                    });

                    dz.on('sending', function(file, xhr, formData) {
                        formData.append('basemap_name', self.basemapName());
                        formData.append('basemap_sortorder', self.sortOrder());
                        formData.append('basemap_icon', self.selectedIcon());
                        formData.append('basemap_addto_map', true);
                        formData.append('basemap_ispublic', self.isPublic());
                        formData.append('basemap_isoverlay', self.isOverlay());
                        self.infoMessage('Uploading basemap GEOTIFF file...  0%');
                    });

                    dz.on('uploadprogress', function(file, progress, bytesSent) {
                        self.infoMessage(`Uploading basemap GEOTIFF file...  ${Math.round(progress)}%`);
                    });

                    dz.on('success', function(file, response) {
                        console.log('Upload successful:', response);
                        
                        if (response.status === 'error' || response.error) {
                            let displayError = response.error || response.message || 'Upload failed';
                            self.errorMessage(displayError);
                            self.infoMessage('');
                            self.successMessage('');
                            self.canSubmit(true);
                            return;
                        }
                        
                        self.infoMessage('Basemap upload initiated. Processing your file in the background...');
                        self.errorMessage('');
                        self.successMessage('');
                        self.canSubmit(false);

                        self.pollTask(response.task_id);
                    });

                    dz.on('error', function(file, errorMessage, xhr) {
                        console.error('Upload failed:', errorMessage);
                        
                        let displayError = 'Upload failed';
                        
                        if (typeof errorMessage === 'object' && errorMessage.message) {
                            displayError = errorMessage.message;
                        } else if (typeof errorMessage === 'string') {
                            if (errorMessage.includes('<')) {
                                const parser = new DOMParser();
                                const htmlDoc = parser.parseFromString(errorMessage, 'text/html');
                                const messageDiv = htmlDoc.querySelector('.message');
                                displayError = messageDiv ? messageDiv.textContent.trim() : 'Server error occurred';
                            } else {
                                displayError = errorMessage;
                            }
                        }
                        self.errorMessage(displayError);
                        self.infoMessage('');
                        self.canSubmit(true);
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
                    console.log(response);
                    
                    if (state === CELERY_STATES.success) {
                        self.infoMessage('');
                        self.errorMessage('');
                        self.successMessage('Basemap processing completed successfully.');
                        self.value(info);
                    } else if (state === CELERY_STATES.failure) {
                        self.infoMessage('');
                        self.errorMessage(`Basemap processing failed: ${info}`);
                    } else if (state === CELERY_STATES.revoked) {
                        self.infoMessage('');
                        self.errorMessage('Processing was cancelled (Revoked).');
                    } else {
                        self.infoMessage(`We are processing your basemap on our servers. Please wait...`);
                        setTimeout(() => self.pollTask(taskId), 2000);
                    }
                }).catch(err => {
                    self.infoMessage('');
                    self.successMessage('');
                    self.errorMessage(`Error checking task status: ${err.message}`);
                });
            };

            self.openVisibilityModal = function() {
                basemapService.checkIfBasemapNameExists(self.basemapName()).then(response => {
                    if (response.exists) {
                        self.errorMessage(`Map layer with this name already exists. Please choose a different name.`);
                    } else {
                        self.errorMessage(null);
                        $('#visibility-modal').modal('show');
                    }
                }).catch(err => {
                    self.errorMessage(`Error occurred while verifying uniqueness of your ${self.isOverlay() ? 'Overlay' : 'Basemap'}: ${err.message}`);
                });
            };

            self.confirmVisibilityAndSubmit = function() {
                $('#visibility-modal').modal('hide');
                self.submitUpload();
            };
            
            self.selectVisibility = function(isPublic) {
                self.isPublic(isPublic);
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