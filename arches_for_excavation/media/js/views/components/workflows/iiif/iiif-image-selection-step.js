// media/js/views/components/workflows/iiif/iiif-image-selection-step.js
define([
    'knockout',
    'arches',
    'templates/views/components/workflows/iiif/iiif-image-selection-step.htm',
    'bindings/dropzone'
], function(ko, arches, template) {

    console.log('[WF LOG][image-select] Module loaded');

    // ==== KONSTANTY Z GRAFU "iiif-digital" ====
    // UWAGA: to są ID NODEGROUPÓW, nie grafu
    var IIIF_DIGITAL_GRAPH_ID = 'd948ccf4-bfb7-4dd6-b691-4050e3e0a19d'   
    // JEDEN nodegroup – ta pierwsza linijka z grafu
    var DIGITAL_RES_NODEGROUP_ID = '04271267-d0a3-4930-8be3-0e8a2a34a735';

    // Trzy NODE_ID – te z wierszy: relation / iiif-url / _label
    var DIGITAL_RES_LABEL_NODE_ID = '85301074-1385-40fd-9a73-43692fe242dd';
    var DIGITAL_RES_URL_NODE_ID   = 'aa8a8e71-4a98-4071-89c3-12fbe5ca9337';
    var DIGITAL_RES_REL_NODE_ID   = '9b7e1d56-2f2b-411b-8491-4dd40d34e8b3';

    var REL_ONTOLOGY_PROPERTY_ID  = null;
    var REL_INVERSE_PROPERTY_ID   = null;
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

        var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
        var url = (arches.urls && typeof arches.urls.api_tile === 'string')
            ? arches.urls.api_tile          // np. "/tile"
            : baseUrl + 'tile';

        console.log('[WF LOG][image-select] POST tile ->', url, payload);

        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: formData
        }).then(function(resp) {
            if (!resp.ok) {
                throw new Error('HTTP ' + resp.status);
            }
            return resp.json ? resp.json() : {};
        });
    }

    // =============================================================
    function viewModel(params) {
        var self = this;

        console.log('[WF LOG][image-select] ========== INIT ==========');
        console.log('[WF LOG][image-select] params:', params);
        console.log('[WF LOG][image-select] params.hostResourceId:', params.hostResourceId);
        console.log('[WF LOG][image-select] params.form:', params.form);
        console.log('[WF LOG][image-select] params.form.resourceid:', params.form && params.form.resourceid);

        // ===== host resource z kroku 1 =====
        self.targetResourceId = ko.observable(null);
        
        var hostParam = params.hostResourceId;
        console.log('[WF LOG][image-select] hostParam type:', typeof hostParam);
        console.log('[WF LOG][image-select] hostParam value:', hostParam);
        
        if (typeof hostParam === 'function') {
            // workflow turned the string path into a ko.computed/observable
            var unwrapped = ko.unwrap(hostParam);
            console.log('[WF LOG][image-select] hostParam is function, unwrapped value:', unwrapped);
            self.targetResourceId(unwrapped || null);
            
            // Subscribe to changes
            ko.computed(function() {
                var val = ko.unwrap(hostParam);
                console.log('[WF LOG][image-select] hostResourceId changed to:', val);
                self.targetResourceId(val || null);
            });
        } else if (hostParam) {
            // literal value
            console.log('[WF LOG][image-select] hostParam is literal value:', hostParam);
            self.targetResourceId(hostParam);
        } else if (params.form && params.form.resourceid) {
            // fallback jeśli trzymasz to też w formie
            console.log('[WF LOG][image-select] Using params.form.resourceid:', params.form.resourceid);
            self.targetResourceId(params.form.resourceid);
        }
        
        console.log('[WF LOG][image-select] Final targetResourceId:', self.targetResourceId());

        // ===== stan UI =====
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

        var csrftoken = getCookie('csrftoken');
        var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
        var manifestManagerUrl = (arches && arches.urls && arches.urls.manifest_manager)
            ? arches.urls.manifest_manager
            : baseUrl + 'image-service-manager';

        console.log('[WF LOG][image-select] Using baseUrl:', baseUrl,
                    'manifestManagerUrl:', manifestManagerUrl);

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

            var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
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

        self.createDigitalResource = function(serviceUrl, labelText) {
            var resourceId = uuidv4();
            var label = labelText || serviceUrl || ('digital resource: iiif ' + new Date().toISOString());

            var labelData = {};
            labelData[DIGITAL_RES_LABEL_NODE_ID] = makeLangValue(label);

            var urlData = {};
            // jeśli datatype=string
            urlData[DIGITAL_RES_URL_NODE_ID] = makeLangValue(serviceUrl);
            
            var relData = {};
            relData[DIGITAL_RES_REL_NODE_ID] = [{
                resourceId: self.targetResourceId(),
                ontologyProperty: REL_ONTOLOGY_PROPERTY_ID || "",
                inverseOntologyProperty: REL_INVERSE_PROPERTY_ID || "",
                resourceXresourceId: ""   // MUSI być, nawet pusty
            }];
            console.log("relData", relData);
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
                        targetResourceId: self.targetResourceId()
                    });
                    return resourceId;
                });
        }


        // ========== SOURCE A: manifest / info.json ==========

        self.manifestUrl.subscribe(function(url) {
            self.errorMessage('');
            if (!url) { return; }
            self.loadManifest(url.trim());
        });

        self.loadManifest = function(url) {
            console.log('[WF LOG][image-select] loadManifest:', url);
            self.loading(true);
            self.availableImages.removeAll();
            self.imageServiceUrl('');
            params.value(undefined);
            self.digitalResourceId(null);

            if (/\/full\/.+\/default\.jpg(?:$|\?)/i.test(url)) {
                url = serviceFromTile(url).replace(/\/$/, '') + '/info.json';
            }

            fetch(url, {credentials: 'include'})
                .then(function(resp) {
                    console.log('[WF LOG][image-select] manifest response status:', resp.status);
                    if (!resp.ok) { throw new Error('HTTP ' + resp.status); }
                    return resp.json();
                })
                .then(function(data) {
                    console.log('[WF LOG][image-select] manifest payload:', data);

                    if (data['@type'] === 'sc:Manifest' && Array.isArray(data.sequences)) {
                        var images = [];
                        (data.sequences || []).forEach(function(seq) {
                            images = images.concat(imagesFromCanvases(seq.canvases || []));
                        });
                        if (!images.length) { throw new Error('No canvases with IIIF Image services found.'); }
                        self.availableImages(images);
                        self.loading(false);
                        return;
                    }

                    if ((data['@context'] && String(data['@context']).indexOf('iiif.io/api/image') !== -1) ||
                        (data['protocol']  && String(data['protocol']).indexOf('iiif.io/api/image') !== -1)) {

                        var svcId = normalizeHost(data['@id'] || data['id']);
                        if (!svcId) { throw new Error('Missing service @id/id in info.json'); }

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
                    console.log('[WF LOG][image-select] Failed to load IIIF resource:', err);
                    self.errorMessage('Failed to load IIIF resource: ' + err.message);
                    self.loading(false);
                });
        };

        // ========== SOURCE B: upload -> manifest -> loadManifest ==========

        self.dropzoneOptionsCreate = {
            url: baseUrl,
            dictDefaultMessage: '',
            autoProcessQueue: false,
            uploadMultiple: true,
            autoQueue: false,
            clickable: '.fileinput-create-button',
            previewsContainer: '#hidden-dz-create-previews',
            init: function() {
                var dz = this;
                self.dropzone = dz;
                dz.on('addedfiles', function(files) {
                    console.log('[WF LOG][image-select] dropzone addedfiles:', files.length);
                    self.createManifestFromFiles(files);
                });
                dz.on('error', function(file, error) {
                    console.log('[WF LOG][image-select] dropzone error:', error);
                    file.error = error;
                });
            }
        };

        self.createManifestFromFiles = function(fileList) {
            if (!fileList || !fileList.length) { return; }

            self.errorMessage('');
            self.loading(true);
            self.availableImages.removeAll();
            self.imageServiceUrl('');
            params.value(undefined);
            self.digitalResourceId(null);

            self.formData = new window.FormData();
            Array.from(fileList).forEach(function(file) {
                self.formData.append('files', file, file.name);
            });

            var title = 'Workflow upload ' + new Date().toISOString();

            self.formData.append('manifest_title', title);
            self.formData.append('manifest_description', 'Uploaded via IIIF image workflow');
            self.formData.append('operation', 'create');
            self.formData.append('transaction_id', params.form && params.form.workflowId || 'iiif-image-workflow');

            console.log('[WF LOG][image-select] POSTing to manifest_manager', manifestManagerUrl);

            fetch(manifestManagerUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Accept': 'application/json'
                },
                body: self.formData
            })
                .then(function(resp) {
                    console.log('[WF LOG][image-select] manifest_manager status:', resp.status);
                    if (!resp.ok) { throw new Error('HTTP ' + resp.status); }
                    return resp.json();
                })
                .then(function(response) {
                    console.log('[WF LOG][image-select] manifest_manager response:', response);
                    if (response && response.url) {
                        self.loadManifest(response.url);
                    } else {
                        throw new Error('Server did not return manifest URL');
                    }
                })
                .catch(function(err) {
                    console.log('[WF LOG][image-select] createManifestFromFiles error:', err);
                    self.errorMessage('Failed to create manifest: ' + err.message);
                    self.loading(false);
                })
                .finally(function() {
                    if (self.dropzone) {
                        self.dropzone.removeAllFiles(true);
                    }
                });
        };

        // ========== WYBÓR OBRAZU ==========

        self.imageServiceUrl.subscribe(function(val) {
            console.log('[WF LOG][image-select] imageServiceUrl ->', val);
        });

        self.selectImage = function(image, index) {
            console.log('[WF LOG][image-select] selectImage ->', image, index);
            self.selectedImageIndex(index);
            self.imageServiceUrl(image.serviceUrl);

            self.digitalResourceId(null);

            self.createDigitalResource(image.serviceUrl, image.label)
                .then(function(resourceId) {
                    console.log('[WF LOG][image-select] digital resource: iiif created with id', resourceId);
                })
                .catch(function(err) {
                    console.error('[WF LOG][image-select] digital resource creation failed', err);
                });
        };

        // ========== GATING ==========

        params.form.complete(ko.pureComputed(function() {
            var ok = !!self.imageServiceUrl();
            console.log('[WF LOG][image-select] complete?', ok);
            return ok;
        }));

        var _origSave = params.form.save;
        params.form.save = function() {
            console.log('[WF LOG][image-select] save() value =', params.value(),
                        'imageServiceUrl =', self.imageServiceUrl(),
                        'digitalResourceId =', self.digitalResourceId(),
                        'targetResourceId =', self.targetResourceId());
            if (!self.imageServiceUrl()) {
                self.errorMessage('Please select an image before proceeding.');
                return Promise.resolve(false);
            }
            if (_origSave) {
                return _origSave.apply(params.form, arguments);
            }
            return Promise.resolve(true);
        };

        return self;
    }

    return ko.components.register('iiif-image-selection-step', {
        viewModel: viewModel,
        template: template
    });
});
