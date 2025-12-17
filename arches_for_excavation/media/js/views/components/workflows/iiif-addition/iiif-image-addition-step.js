define([
    'knockout',
    'arches',
    'templates/views/components/workflows/iiif-addition/iiif-image-addition-step.htm',
    'bindings/dropzone'
], function(ko, arches, template) {
    'use strict';

    console.log('[WF LOG][image-select] Module loaded');

    // ==== KONSTANTY Z GRAFU "iiif-digital" ====
    var IIIF_DIGITAL_GRAPH_ID = 'd948ccf4-bfb7-4dd6-b691-4050e3e0a19d';
    var DIGITAL_RES_NODEGROUP_ID = '04271267-d0a3-4930-8be3-0e8a2a34a735';

    var DIGITAL_RES_LABEL_NODE_ID = '78422c09-4994-4eff-b764-60f21f3290cd';
    var DIGITAL_RES_URL_NODE_ID   = 'e0216dc7-89ba-4a27-9126-bf7e06d859a8';
    var DIGITAL_RES_REL_NODE_ID   = '9c317e5f-76b4-407d-9b8d-b64f446ea17a';

    var REL_ONTOLOGY_PROPERTY_ID = null;
    var REL_INVERSE_PROPERTY_ID  = null;

    // ====== HELPERS ======
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
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

    function makeLangValue(value) {
        var lang = (arches && arches.activeLanguage) ? arches.activeLanguage : 'en';
        var obj = {};
        obj[lang] = { value: value, direction: 'ltr' };
        return obj;
    }

    function normalizeHost(url) {
        if (!url) { return url; }
        return url
            .replace('cantaloupe_arches_slocal:8182', 'localhost:8183')
            .replace('cantaloupe_arches_slocal', 'localhost');
    }

    function serviceFromTile(url) {
        var idx = url.indexOf('/full/');
        return idx > -1 ? url.substring(0, idx) : url;
    }

    function imagesFromCanvases(canvases) {
        var images = [];
        (canvases || []).forEach(function(canvas) {
            try {
                var img = canvas.images && canvas.images[0];
                var svc = img && img.resource && img.resource.service &&
                    (img.resource.service['@id'] || img.resource.service.id);
                if (svc) {
                    svc = normalizeHost(svc);
                    images.push({
                        label: canvas.label || 'Untitled',
                        serviceUrl: svc,
                        thumbnail: svc.replace(/\/$/, '') + '/full/200,/0/default.jpg'
                    });
                }
            } catch (e) {
                console.log('[WF LOG][image-select] imagesFromCanvases error:', e, canvas);
            }
        });
        return images;
    }

    // =============================================================
    function viewModel(params) {
        var self = this;

        console.log('[WF LOG][image-select] ========== INIT ==========');
        console.log('[WF LOG][image-select] params:', params);


        // ===== step configuration =====
        // assetType: 'iiif' (default) | 'dem' | ...
        var assetParam = params.assetType || params.asset_type || 'iiif';
        self.assetType = ko.observable(ko.unwrap(assetParam) || assetParam || 'iiif');
        if (typeof assetParam === 'function') {
            ko.computed(function() {
                self.assetType(ko.unwrap(assetParam) || 'iiif');
            });
        }

        // optional step support (e.g. DEM step)
        var optionalParam = (params.optional !== undefined) ? params.optional : false;
        self.optional = ko.observable(!!ko.unwrap(optionalParam));
        if (typeof optionalParam === 'function') {
            ko.computed(function() {
                self.optional(!!ko.unwrap(optionalParam));
            });
        }

        // UI texts (can be overridden from workflow step parameters)
        var titleParam = params.stepTitle || params.title;
        self.stepTitle = ko.pureComputed(function() {
            var t = ko.unwrap(titleParam);
            if (t) return t;
            return (self.assetType() === 'dem') ? 'Add DEM (optional)' : 'Add IIIF image (digital resource: iiif)';
        });

        var descParam = params.stepDescription || params.description;
        self.stepDescription = ko.pureComputed(function() {
            var d = ko.unwrap(descParam);
            if (d !== undefined && d !== null && String(d).trim() !== '') return d;
            return (self.assetType() === 'dem')
                ? 'Upload a DEM-derived visualization (recommended: hillshade / color relief) and link it to the selected resource.'
                : '';
        });

        self.manifestDescription = ko.pureComputed(function() {
            return ko.unwrap(params.manifestDescription) ||
                ((self.assetType() === 'dem') ? 'DEM uploaded via geotiff workflow' : 'Processed via geotiff workflow');
        });

        self.labelPrefix = ko.pureComputed(function() {
            return ko.unwrap(params.labelPrefix) || ((self.assetType() === 'dem') ? 'DEM: ' : '');
        });

        // ===== host resource z kroku 1 =====
        self.targetResourceId = ko.observable(null);
        var hostParam = params.hostResourceId;

        if (typeof hostParam === 'function') {
            self.targetResourceId(ko.unwrap(hostParam) || null);
            ko.computed(function() {
                self.targetResourceId(ko.unwrap(hostParam) || null);
            });
        } else if (hostParam) {
            self.targetResourceId(hostParam);
        } else if (params.form && params.form.resourceid) {
            self.targetResourceId(params.form.resourceid);
        }

        // ===== UI state =====
        self.manifestUrl        = ko.observable('');
        self.imageServiceUrl    = ko.observable('');
        self.selectedImageIndex = ko.observable(null);
        self.loading            = ko.observable(false);
        self.errorMessage       = ko.observable('');
        self.availableImages    = ko.observableArray([]);

        if (typeof params.value !== 'function') {
            params.value = ko.observable();
        }

        self.digitalResourceId = ko.observable(null);
        self.formData = new window.FormData();
        self.dropzone = null;
        self.lastManifestGlobalId = null;

        // ✅ ADD THIS: track related manifest (for DEM -> Ortho)
        self.relatedManifestGlobalId = ko.observable(null);
        var relatedParam = params.relatedManifestGlobalId;
        if (typeof relatedParam === 'function') {
            self.relatedManifestGlobalId(ko.unwrap(relatedParam) || null);
            ko.computed(function() {
                self.relatedManifestGlobalId(ko.unwrap(relatedParam) || null);
            });
        } else if (relatedParam) {
            self.relatedManifestGlobalId(relatedParam);
        }

        var csrftoken = getCookie('csrftoken');
        var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
        
        // NOWY ENDPOINT - Python view który przetwarza i tworzy manifest
        var geotiffProcessUrl = baseUrl + 'api/iiif/geotiff-reencode-test';

        // ===================== CREATE digital resource: iiif =====================
        function postTile(nodegroupId, data, resourceId) {
            var payload = {
                tileid: '',
                nodegroup_id: nodegroupId,
                parenttile_id: null,
                resourceinstance_id: resourceId,
                sortorder: 0,
                tiles: {},
                data: data
            };

            var formData = new window.FormData();
            formData.append('data', JSON.stringify(payload));

            var url = (arches.urls && typeof arches.urls.api_tile === 'string')
                ? arches.urls.api_tile
                : baseUrl + 'tile';

            return fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: formData
            }).then(function(resp) {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.json ? resp.json() : {};
            });
        }

        self.createDigitalResource = function(serviceUrl, labelText, manifestGlobalId) {
            var resourceId = manifestGlobalId || uuidv4();
            var label = labelText || serviceUrl || ('digital resource: ' + self.assetType() + ' ' + new Date().toISOString());
            var _pfx = self.labelPrefix && self.labelPrefix() ? String(self.labelPrefix()) : '';
            if (_pfx && label.indexOf(_pfx) !== 0) label = _pfx + label;

            console.log('[WF LOG][image-select] Creating digital resource with ID:', resourceId);

            // Create resource by posting the first tile with graph metadata
            var labelData = {};
            labelData[DIGITAL_RES_LABEL_NODE_ID] = makeLangValue(label);

            var urlData = {};
            urlData[DIGITAL_RES_URL_NODE_ID] = makeLangValue(serviceUrl);
            
            var relData = {};
            relData[DIGITAL_RES_REL_NODE_ID] = [{
                resourceId: self.targetResourceId(),
                ontologyProperty: REL_ONTOLOGY_PROPERTY_ID || "",
                inverseOntologyProperty: REL_INVERSE_PROPERTY_ID || "",
                resourceXresourceId: ""
            }];
            
            return postTile(DIGITAL_RES_LABEL_NODE_ID, labelData, resourceId)
                .then(function() {
                    return postTile(DIGITAL_RES_URL_NODE_ID, urlData, resourceId);
                })
                .then(function() {
                    return postTile(DIGITAL_RES_REL_NODE_ID, relData, resourceId);
                })
                .then(function() {
                    self.digitalResourceId(resourceId);
                    params.value({
                        imageServiceUrl: serviceUrl,
                        digitalResourceId: resourceId,
                        targetResourceId: self.targetResourceId(),
                        manifestGlobalId: resourceId
                    });
                    console.log('[WF LOG][image-select] Digital resource created:', resourceId);
                    return resourceId;
                });
        }

        // ========== SOURCE A: manifest / info.json (bez zmian) ==========
        self.manifestUrl.subscribe(function(url) {
            self.errorMessage('');
            if (!url) return;
            self.loadManifest(url.trim());
        });

        self.loadManifest = function(url) {
            console.log('[WF LOG][image-select] loadManifest:', url);
            self.loading(true);
            self.availableImages.removeAll();
            self.imageServiceUrl('');
            params.value(undefined);
            self.digitalResourceId(null);

            if (/\/full\/.+\/default\.(jpg|png)(?:$|\?)/i.test(url)) {
                url = serviceFromTile(url).replace(/\/$/, '') + '/info.json';
            }

            fetch(url, { credentials: 'include' })
                .then(function(resp) {
                    if (!resp.ok) throw new Error('HTTP ' + resp.status);
                    return resp.json();
                })
                .then(function(data) {
                    if (data['@type'] === 'sc:Manifest' && Array.isArray(data.sequences)) {
                        var images = [];
                        (data.sequences || []).forEach(function(seq) {
                            images = images.concat(imagesFromCanvases(seq.canvases || []));
                        });
                        if (!images.length) throw new Error('No canvases with IIIF Image services found.');

                        self.availableImages(images);
                        self.loading(false);
                        return;
                    }

                    // info.json (Image API)
                    if ((data['@context'] && String(data['@context']).indexOf('iiif.io/api/image') !== -1) ||
                        (data['protocol'] && String(data['protocol']).indexOf('iiif.io/api/image') !== -1)) {

                        var svcId = normalizeHost(data['@id'] || data['id']);
                        if (!svcId) throw new Error('Missing service @id/id in info.json');

                        self.availableImages([{
                            label: data['@id'] || data['id'] || 'Image',
                            serviceUrl: svcId,
                            thumbnail: svcId.replace(/\/$/, '') + '/full/200,/0/default.jpg'
                        }]);
                        self.loading(false);
                        return;
                    }

                    throw new Error('Unsupported IIIF payload (not Manifest or Image API info.json).');
                })
                .catch(function(err) {
                    self.errorMessage('Failed to load IIIF resource: ' + err.message);
                    self.loading(false);
                });
        };

        // ========== SOURCE B: upload -> Python przetwarza i tworzy manifest ==========
        self.dropzoneOptionsCreate = {
            url: baseUrl,
            dictDefaultMessage: '',
            maxFilesize: 4096,  // 4 GB
            autoProcessQueue: false,
            uploadMultiple: false,  // pojedynczo dla prostoty
            autoQueue: false,
            clickable: '.fileinput-create-button',
            previewsContainer: '#hidden-dz-create-previews',
            init: function() {
                var dz = this;
                self.dropzone = dz;
                dz.on('addedfiles', function(files) {
                    self.uploadAndProcessFile(files[0]);
                });
                dz.on('error', function(file, error) {
                    console.log('[WF LOG][image-select] dropzone error:', error);
                    file.error = error;
                });
            }
        };

        self.uploadAndProcessFile = function(file) {
            if (!file) return;

            self.errorMessage('');
            self.loading(true);
            self.availableImages.removeAll();
            self.imageServiceUrl('');
            params.value(undefined);
            self.digitalResourceId(null);
            self.lastManifestGlobalId = null;

            self.formData = new window.FormData();
            self.formData.append('files', file, file.name);

            var title = ((self.assetType() === 'dem') ? 'Workflow DEM upload ' : 'Workflow upload ') + new Date().toISOString();
            self.formData.append('manifest_title', title);
            self.formData.append('manifest_description', self.manifestDescription());
            self.formData.append('asset_type', self.assetType());
            self.formData.append('transaction_id', params.form && params.form.workflowId || 'iiif-image-workflow');

            // ✅ ADD THIS: pass related manifest globalid if available (DEM -> Ortho)
            if (self.relatedManifestGlobalId()) {
                self.formData.append('related_manifest_id', self.relatedManifestGlobalId());
                console.log('[WF LOG][image-select] Related manifest globalid:', self.relatedManifestGlobalId());
            }

            console.log('[WF LOG][image-select] Uploading to Python processor:', geotiffProcessUrl);

            fetch(geotiffProcessUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Accept': 'application/json'
                },
                body: self.formData
            })
                .then(function(resp) {
                    console.log('[WF LOG][image-select] Python processor status:', resp.status);
                    if (!resp.ok) throw new Error('HTTP ' + resp.status);
                    return resp.json();
                })
                .then(function(response) {
                    console.log('[WF LOG][image-select] Python response:', response);
                    
                    if (!response.ok) {
                        throw new Error(response.error || 'Processing failed');
                    }
                    
                    // Python zwraca gotowy manifest URL i globalid
                    if (response.globalid) {
                        self.lastManifestGlobalId = response.globalid;
                        console.log('[WF LOG][image-select] Stored manifest globalid:', self.lastManifestGlobalId);
                    }
                    
                    if (response.manifest_url) {
                        // Załaduj manifest (który już istnieje dzięki Python)
                        self.loadManifest(response.manifest_url);
                    } else {
                        throw new Error('Server did not return manifest URL');
                    }
                })
                .catch(function(err) {
                    console.log('[WF LOG][image-select] Upload/process error:', err);
                    self.errorMessage('Failed to process file: ' + err.message);
                    self.loading(false);
                })
                .finally(function() {
                    if (self.dropzone) {
                        self.dropzone.removeAllFiles(true);
                    }
                });
        };

        // ========== WYBÓR OBRAZU ==========
        self.selectImage = function(image, index) {
            self.selectedImageIndex(index);
            self.imageServiceUrl(image.serviceUrl);
            self.digitalResourceId(null);

            var manifestGlobalId = self.lastManifestGlobalId || null;
            self.createDigitalResource(image.serviceUrl, image.label, manifestGlobalId)
                .catch(function(err) {
                    console.error('[WF LOG][image-select] digital resource creation failed', err);
                    self.errorMessage('Failed to create digital resource: ' + err.message);
                });
        };

        // ========== GATING ==========
        params.form.complete(ko.pureComputed(function() {
            return self.optional() ? true : !!self.imageServiceUrl();
        }));

        var _origSave = params.form.save;
        params.form.save = function() {
            if (!self.imageServiceUrl()) {
                if (self.optional()) {
                    if (_origSave) return _origSave.apply(params.form, arguments);
                    return Promise.resolve(true);
                }
                self.errorMessage('Please select an image before proceeding.');
                return Promise.resolve(false);
            }
            if (_origSave) return _origSave.apply(params.form, arguments);
            return Promise.resolve(true);
        };

        return self;
    }

    return ko.components.register('iiif-image-addition-step', {
        viewModel: viewModel,
        template: template
    });
});