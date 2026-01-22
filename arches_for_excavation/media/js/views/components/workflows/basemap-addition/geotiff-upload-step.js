define([
    'knockout',
    'arches',
    'templates/views/components/workflows/basemap-addition/geotiff-upload-step.htm',
    '../../../../services/tile-service',
    '../../../../services/service-utils',
    'bindings/dropzone'
], function(ko, arches, template, tileServiceModule, serviceUtils) {
    return ko.components.register('geotiff-upload-step', {
        viewModel: function(params) {
            const self = this;
            const tileService = tileServiceModule.default || tileServiceModule;

            self.basemapName = ko.observable('');
            self.legend = ko.observable('');
            self.sortOrder = ko.observable(0);

            self.isOverlay = ko.observable(false);
            self.isActivated = ko.observable(true);
            self.addToMap = ko.observable(false);
            self.searchOnly = ko.observable(false);
            self.isPublic = ko.observable(true);

            self.loading = ko.observable(false);
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            self.canSubmit = ko.observable(false);

            self.dropzoneOptionsZip = {
                url: '/api/basemap/upload/',
                paramName: 'basemap_geotiff',
                maxFiles: 1,
                acceptedFiles: '.tiff, .tif',
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
                    });

                    dz.on('sending', function(file, xhr, formData) {
                        self.loading(true);
                        formData.append('basemap_name', self.basemapName());
                    });

                    dz.on('success', function(file, response) {
                        console.log('Upload successful:', response);
                        self.loading(false);
                        self.errorMessage('');
                        self.successMessage('Basemap uploaded successfully.');
                        self.canSubmit(false);
                    });

                    dz.on('error', function(file, errorMessage) {
                        console.error('Upload failed:', errorMessage);
                        self.errorMessage(typeof errorMessage === 'string' ? errorMessage : 'Upload failed');
                    });

                    dz.on('complete', function() {
                        self.loading(false);
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