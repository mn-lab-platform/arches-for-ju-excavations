import ko from 'knockout';
import viewerTemplate from 'templates/views/components/custom/cesium-viewer.htm';
import { initializeCesiumViewer } from '../../../cesium_viewer';
import basemapService from '../../../services/basemap-service';

export default ko.components.register('cesium-viewer', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];
        
        self.models = ko.unwrap(params.models3D) || [];
        self.existingAnnotations = ko.unwrap(params.existingAnnotations) || [];
        self.viewerIds = self.models.map((_, index) => `cesiumViewer-${index}`);
        self.modelLabels = ko.observableArray(self.models.map(m => m.resource.Name || 'Unnamed Model'));
        self.allowAnnotationsEdits = params.allowAnnotationsEdits() || false;
        self.allowObjectPicking = params.allowObjectPicking() || false;
        self.allowObjectAddition = params.allowObjectAddition() || false;
        self.modelCrsDefinitions = ko.unwrap(params.modelCrsDefinitions) || [];

        self.initializedViewers = new Set();

        self.onCesiumViewerRendered = function () {
            self.initializeAllViewers();
        };

        self._fetchBasemaps = async function() {
            try {
                const basemapsAndOverlays = await basemapService.getBasemapsAndOverlaysInfo();
                return basemapsAndOverlays.basemaps || [];
            }
            catch (error) {
                console.error('Error fetching basemaps: ', error);
                return [];
            }
        }

        self.initializeAllViewers = async function () {
            for (let i = 0; i < self.models.length; i++) {
                const model = self.models[i];
                console.log('Model data:', model);
                const modelName = model.resource.Name || `Model ${i}`;
                const modelUrl = `${model.resource.URL}/tileset.json`;
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

                const modelAnnotations = self.existingAnnotations
                    .filter(anno => {
                        if (!anno.relatedResourceName) return false;
                        
                        const relatedNames = anno.relatedResourceName.split(',').map(name => name.trim());
                        return relatedNames.includes(modelName);
                    });
                
                try {
                    const basemaps = await self._fetchBasemaps();
                    await initializeCesiumViewer(
                        viewerId, 
                        { 
                            georeferenced: georeferenced, 
                            allowAnnotationsEdits: self.allowAnnotationsEdits,
                            allowObjectPicking: self.allowObjectPicking,
                            allowObjectAddition: self.allowObjectAddition,
                            modelUrl: modelUrl,
                            existingAnnotations: modelAnnotations,
                            basemaps,
                            crsDefinition: self.modelCrsDefinitions.filter(crsDef => crsDef.modelResourceId === model.resourceinstanceid).map(crsDef => crsDef.crs)[0] || {},
                            onPolygonCompleted: params.onPolygonCompleted,
                            onAnnotationUpdated: params.onAnnotationUpdated,
                            onAnnotationDeleted: params.onAnnotationDeleted
                        }
                    );
                    self.initializedViewers.add(viewerId);
                } catch (error) {
                    console.error(`Failed to initialize Cesium viewer ${viewerId}:`, error);
                }
            }
        };
    },
    template: viewerTemplate,
});