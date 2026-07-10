import ko from 'knockout';
import tabbedReportTemplate from 'templates/views/report-templates/tabbed.htm';
import { setupTabbedReport } from '../viewmodels/mixins/tab-report-setup';
import 'views/components/custom/cesium-viewer';
import 'views/components/iiif/iiif-map-viewer';
import 'viewmodels/map-report';
import resourceService from '../services/resource-service';
 
export default ko.components.register('context-tabbed-report', {
    viewModel: function(params) {
        const self = this;

        const ANNOTATION_RESOURCE_GRAPHID = '2880934b-0015-4c5a-8ec1-1ab9bca329fd';
        const CRS_RESOURCE_GRAPHID = 'a5219c24-2907-4055-9d68-18216d214458';
       
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(false);
        self.allowObjectPicking = ko.observable(true);
        self.allowObjectAddition = ko.observable(false);
        self.existingAnnotations = ko.observableArray([]);
        self.modelCrsDefinitions = ko.observableArray([]);
       
        self.iiifResources = ko.observableArray([]);
        self.readOnly = ko.observable(true);
 
        const myTabs = [
            ko.mapping.fromJS({
                name: 'Info',
                icon: 'fa-info-circle',
                main_component: 'map-report',
                nodegroup_ids: [],
                component_params: {}
            })
        ];
 
        const relatedResources = params.report.relatedResourcesLookup();

        const loadModelBundle = async (modelResource) => {
            if (!modelResource) return null;

            const resourceId = modelResource.link.split('/').pop();

            const [modelData, relatedData] = await Promise.all([
                resourceService.getOne(resourceId),
                resourceService.getAllRelatedTo(resourceId)
            ]);

            const relatedResourcesArray = relatedData?.related_resources?.related_resources || [];

            const annotationIds = relatedResourcesArray
                .filter(related => related.graph_id === ANNOTATION_RESOURCE_GRAPHID)
                .map(related => related.resourceinstanceid);

            const crsId = relatedResourcesArray.find(
                related => related.graph_id === CRS_RESOURCE_GRAPHID
            )?.resourceinstanceid;

            const [annotations, crsData] = await Promise.all([
                Promise.all(annotationIds.map(id => resourceService.getOne(id))),
                crsId ? resourceService.getOne(crsId) : Promise.resolve(null)
            ]);

            return {
                resourceId,
                modelData,
                annotations,
                crsData
            };
        };
        
        const model3DResource = Object.entries(relatedResources)
            .filter(([_, value]) => (value.name.toLowerCase() || '').includes('3d'))
            .map(([_, value]) => value);
       
        if (model3DResource.length > 0) {
            const actualModels = model3DResource[0].loadedRelatedResources();
       
            if (actualModels.length > 0) {
                myTabs.push(ko.mapping.fromJS({
                    name: 'Cesium Viewer',
                    icon: 'fa-cube',
                    main_component: 'cesium-viewer',
                    nodegroup_ids: [],
                    component_params: {
                        models3D: self.models3D,
                        allowAnnotationsEdits: self.allowAnnotationsEdits,
                        allowObjectPicking: self.allowObjectPicking,
                        existingAnnotations: self.existingAnnotations,
                        modelCrsDefinitions: self.modelCrsDefinitions
                    }
                }));
       
                const modelPromises = actualModels.map(loadModelBundle);

                Promise.allSettled(modelPromises)
                    .then(results => {
                        const fulfilled = results
                            .filter(result => result.status === 'fulfilled' && result.value)
                            .map(result => result.value);

                        fulfilled.forEach(({ resourceId, modelData, annotations, crsData }) => {
                            self.models3D.push(modelData);

                            (annotations || []).forEach(anno => {
                                self.existingAnnotations.push({
                                    id: anno.resourceinstanceid,
                                    name: anno.displayname,
                                    description: anno.displaydescription || '',
                                    geometry: JSON.parse(anno.resource.Geometry),
                                    color: anno.resource.Color || '#64ff64',
                                    relatedResourceName: anno.resource['Related Resource'] || ''
                                });
                            });
                            if (crsData) {
                                self.modelCrsDefinitions.push({
                                    modelResourceId: resourceId,
                                    crs: {
                                        proj: crsData.resource.Definition.PROJ4['PROJ4 String'] || '',
                                        wkt: crsData.resource.Definition['WKT-2']['WKT-2 String'] || '',
                                        esri: crsData.resource.Definition['ESRI WKT']['ESRI WKT String'] || ''
                                    }
                                });
                            }
                        });

                        const rejected = results.filter(result => result.status === 'rejected');
                        if (rejected.length > 0) {
                            console.error('[CONTEXT REPORT] Some models failed to load:', rejected);
                        }

                        console.log('[CONTEXT REPORT] All model bundles processed:', results);
                    })
                    .catch(error => {
                        console.error('[CONTEXT REPORT] Error loading model bundles:', error);
                    });
            }
        }
 
        const iiifResourceList = Object.entries(relatedResources)
            .filter(([_, value]) => {
                const name = (value.name || '').toLowerCase();
                return name.includes('iiif');
            })
            .map(([_, value]) => value);
 
        if (iiifResourceList.length > 0) {
            const actualIiifResources = iiifResourceList[0].loadedRelatedResources();
            console.log('[CONTEXT REPORT] Actual IIIF resources:', actualIiifResources);
           
            const iiifResourceIds = [];
            actualIiifResources.forEach(iiifResource => {
                if (iiifResource) {
                    const resourceId = iiifResource.link.split('/').pop();
                    iiifResourceIds.push(resourceId);
                   
                    self.iiifResources.push({
                        resourceId: resourceId,
                        displayName: iiifResource.displayname || `IIIF ${resourceId.substring(0, 8)}...`
                    });
                }
            });
 
            iiifResourceIds.forEach((resourceId, index) => {
                const resourceData = self.iiifResources()[index];
               
                myTabs.push(ko.mapping.fromJS({
                    name: resourceData.displayName,
                    icon: 'fa-picture-o',
                    main_component: 'iiif-report',
                    nodegroup_ids: [],
                    component_params: {
                        overrideResourceId: resourceId,
                        readOnly: self.readOnly
                    }
                }));
            });
        }
 
        setupTabbedReport(self, params, myTabs);
    },
    template: tabbedReportTemplate
});