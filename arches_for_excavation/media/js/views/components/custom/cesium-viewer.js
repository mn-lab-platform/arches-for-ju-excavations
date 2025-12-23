import ko from 'knockout';
import viewerTemplate from 'templates/views/components/custom/cesium-viewer.htm';
import { initializeCesiumViewer } from '../../../cesium_viewer';
import { getCesiumToken } from '../../../config/config';

export default ko.components.register('cesium-viewer', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];
        console.log("Cesium Viewer Params: ", params);
        
        const models = params.models3D() || [];
        const existingAnnotations = params.existingAnnotations() || [];
        console.log("Cesium Viewer models:", models);
        self.viewerIds = models.map((_, index) => `cesiumViewer-${index}`);
        self.modelLabels = ko.observableArray(models.map(m => m.resource.Name || 'Unnamed Model'));
        self.allowAnnotationsEdits = params.allowAnnotationsEdits() || false;
        self.allowObjectPicking = params.allowObjectPicking() || false;

        console.log("Received params: ", self.allowAnnotationsEdits, self.allowObjectPicking);
        console.log("Annotations: ", existingAnnotations);
        self.initializedViewers = new Set();

        self.onCesiumViewerRendered = function () {
            console.log("Cesium viewer containers rendered, initializing viewers...");
            self.initializeAllViewers();
        };

        self.initializeAllViewers = async function () {
            const token = getCesiumToken();
            console.log("Initializing viewers for models:", models);

            for (let i = 0; i < models.length; i++) {
                const model = models[i];
                const modelResourceId = model.resourceinstanceid || model.resourceId;
                const modelUrl = `${model.resource.Url}/tileset.json`;
                const georeferenced = String(model.resource.Georeferenced).toLowerCase() === 'true';
                const viewerId = `cesiumViewer-${i}`;

                if (self.initializedViewers.has(viewerId)) {
                    console.log(`Viewer ${viewerId} already initialized, skipping`);
                    continue;
                }

                const viewerEl = document.getElementById(viewerId);
                if (!viewerEl) {
                    console.error(`Viewer element ${viewerId} not found`);
                    continue;
                }

                const modelAnnotations = existingAnnotations.filter(anno => 
                    anno.modelResourceId === modelResourceId
                );
                
                console.log(`Filtered ${modelAnnotations.length} annotations for model ${modelResourceId}`);

                try {
                    console.log(`Initializing viewer ${i} with model:`, model);
                    await initializeCesiumViewer(
                        token, 
                        viewerId, 
                        { 
                            georeferenced: georeferenced, 
                            allowAnnotationsEdits: self.allowAnnotationsEdits,
                            allowObjectPicking: self.allowObjectPicking,
                            modelUrl: modelUrl,
                            existingAnnotations: modelAnnotations,
                            onAnnotationSaved: params.onAnnotationSaved,
                            onAnnotationDeleted: params.onAnnotationDeleted
                        }
                    );
                    self.initializedViewers.add(viewerId);
                    console.log(`Successfully initialized viewer ${viewerId}`);
                } catch (error) {
                    console.error(`Failed to initialize Cesium viewer ${viewerId}:`, error);
                }
            }
        };
    },
    template: viewerTemplate,
});