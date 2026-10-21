import ko from 'knockout';
import viewerTemplate from 'templates/views/components/custom/cesium-viewer.htm';
import { initializeCesiumViewer } from '../../../cesium_viewer';
import basemapService from '../../../services/basemap-service';
import tileService from '../../../services/tile-service';
import resourceService from '../../../services/resource-service';

export default ko.components.register('cesium-viewer', {
    viewModel: function(params) {
        const self = this;
        const CRS_NODE_ID = '26125877-dc4e-402e-a925-78859a703ec3';
        params.configKeys = [];
        
        self.models = ko.unwrap(params.models3D) || [];
        self.existingAnnotations = ko.unwrap(params.existingAnnotations) || [];
        self.viewerIds = self.models.map((_, index) => `cesiumViewer-${index}`);
        self.modelLabels = ko.observableArray(self.models.map(m => m.displayname || 'Unnamed Model'));
        self.allowAnnotationsEdits = params.allowAnnotationsEdits() || false;
        self.allowObjectPicking = params.allowObjectPicking() || false;
        self.allowObjectAddition = params.allowObjectAddition() || false;
        self.initializedViewers = new Set();

        console.log('[CESIUM] existingAnnotations at init', self.existingAnnotations);
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
        };

        const normalizeRelatedNames = (value) => {
            if (!value) return [];

            if (typeof value === 'string') {
                return value.split(',').map(name => name.trim()).filter(Boolean);
            }

            if (Array.isArray(value)) {
                return value.flatMap(normalizeRelatedNames);
            }

            if (typeof value === 'object') {
                return [
                    value['@value'],
                    value.value,
                    value.displayname,
                    value.displayName,
                    value.name,
                    value.label,
                    value.resourceName,
                    value.resourceId
                ].filter(Boolean).map(String);
            }

            return [String(value)];
        };

        const extractCrsDefinitions = (crsData) => {
            const definitions = crsData?.resource?.['Definition (files)'] || [];
            return {
                proj: definitions.find(definition => definition?.Type === 'PROJ4')?.String || '',
                wkt: definitions.find(definition => definition?.Type === 'WKT-2')?.String || '',
                esri: definitions.find(definition => definition?.Type === 'ESRI WKT')?.String || ''
            };
        };

        const getCrsDefinitionFromModelTile = async (modelResourceId) => {
            const response = await tileService.getAllForResource(modelResourceId);
            const tiles = Array.isArray(response) ? response : response?.tiles || [];
            const crsTile = tiles.find(tile => tile?.data?.[CRS_NODE_ID] !== undefined);
            const crsValue = crsTile?.data?.[CRS_NODE_ID];
            const crsEntry = Array.isArray(crsValue) ? crsValue[0] : crsValue;
            console.log('CRS entry found for model resource', modelResourceId, ':', crsEntry);
            const crsResourceId = crsEntry?.resourceId;

            if (!crsResourceId) {
                return { crsResourceId: '', crsDefinition: {} };
            }

            const crsData = await resourceService.getOne(crsResourceId);

            return extractCrsDefinitions(crsData);
        };

        self.initializeAllViewers = async function () {
            for (let i = 0; i < self.models.length; i++) {
                const model = self.models[i];
                console.log('Model data:', model);
                const modelResourceId = model.resourceinstanceid;
                const modelName =
                    model.displayname ||
                    `Model ${i}`;
                const modelUrl = `${model.resource.URL}/tileset.json`;
                const georeferenced = String(model.resource.Geospatial["@value"]).toLowerCase() === 'true';
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
                        
                        const relatedNames = normalizeRelatedNames(anno.relatedResourceName);
                        return relatedNames.includes(modelName)|| relatedNames.includes(modelResourceId);
                    });
                console.log('[CESIUM] modelAnnotations for', modelName, model.resourceinstanceid, modelAnnotations) ;

                try {
                    const crsDefinition  = await getCrsDefinitionFromModelTile(modelResourceId);
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
                            basemaps: basemaps,
                            crsDefinition: crsDefinition,
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