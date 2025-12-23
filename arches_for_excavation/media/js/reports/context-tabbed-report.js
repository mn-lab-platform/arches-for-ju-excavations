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
       
        // 3D Models state
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(false);
        self.allowObjectPicking = ko.observable(true);
        self.existingAnnotations = ko.observableArray([]);
       
        // IIIF state
        self.iiifResources = ko.observableArray([]);
        self.readOnly = ko.observable(true);
 
        // Base Info tab
        const myTabs = [
            ko.mapping.fromJS({
                name: 'Info',
                icon: 'fa-info-circle',
                main_component: 'map-report',
                nodegroup_ids: [],
                component_params: {}
            })
        ];
 
        console.log("[CONTEXT REPORT] params:", params);
        const relatedResources = params.report.relatedResourcesLookup();
        console.log("[CONTEXT REPORT] related resources:", relatedResources);
 
        // ===== Process 3D Models =====
        const model3DResource = Object.entries(relatedResources)
            .filter(([_, value]) => (value.name === 'Digital Resource 3D'))
            .map(([_, value]) => value);
 
        console.log("[CONTEXT REPORT] 3D models:", model3DResource);
       
        if (model3DResource.length > 0) {
            const actualModels = model3DResource[0].loadedRelatedResources();
            console.log("[CONTEXT REPORT] Actual 3D models:", actualModels);
       
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
                        existingAnnotations: self.existingAnnotations
                    }
                }));
       
                const modelPromises = actualModels.map(modelResource => {
                    if (!modelResource) return Promise.resolve(null);
                    
                    const resourceId = modelResource.link.split('/').pop();
                    console.log("[CONTEXT REPORT] Processing 3D model resource id:", resourceId);

                    return Promise.all([
                        resourceService.getOne(resourceId),
                        resourceService.getAllRelatedTo(resourceId)
                    ]).then(([modelData, relatedData]) => {
                        console.log("[CONTEXT REPORT] Model data:", modelData);
                        console.log("[CONTEXT REPORT] Related resources:", relatedData);
                        
                        const relatedResourcesArray = relatedData?.related_resources?.related_resources || [];
                        console.log("[CONTEXT REPORT] Related resources array:", relatedResourcesArray);
                        
                        const annotationResources = relatedResourcesArray
                            .filter(related => related.graph_id === ANNOTATION_RESOURCE_GRAPHID);
                        
                        console.log("[CONTEXT REPORT] Annotation resources for model:", annotationResources);
                        
                        const annotationPromises = annotationResources.map(anno => 
                            resourceService.getOne(anno.resourceinstanceid)
                        );
                        
                        return Promise.all(annotationPromises).then(annotations => {
                            const annotationsWithModelId = annotations.map(anno => ({
                                ...anno,
                                modelResourceId: resourceId
                            }));
                            
                            console.log("[CONTEXT REPORT] Fetched annotations with model ID:", annotationsWithModelId);
                            
                            self.models3D.push(modelData);
                            
                            annotationsWithModelId.forEach(anno => {
                                self.existingAnnotations.push(anno);
                            });
                            
                            console.log("[CONTEXT REPORT] Added model and annotations");
                            
                            return {
                                model: modelData,
                                annotations: annotationsWithModelId
                            };
                        });
                    });
                });
                
                Promise.all(modelPromises).then(results => {
                    console.log("[CONTEXT REPORT] All models and annotations loaded:", results);
                }).catch(error => {
                    console.error("[CONTEXT REPORT] Error loading models/annotations:", error);
                });
            }
        }
 
        // ===== Process IIIF Resources =====
        const iiifResourceList = Object.entries(relatedResources)
            .filter(([_, value]) => {
                const name = (value.name || '').toLowerCase();
                return name.includes('digital') || name.includes('iiif');
            })
            .map(([_, value]) => value);
 
        console.log("[CONTEXT REPORT] filtered IIIF resources:", iiifResourceList);
 
        if (iiifResourceList.length > 0) {
            const actualIiifResources = iiifResourceList[0].loadedRelatedResources();
            console.log("[CONTEXT REPORT] Actual IIIF resources:", actualIiifResources);
           
            const iiifResourceIds = [];
            actualIiifResources.forEach(iiifResource => {
                if (iiifResource) {
                    const resourceId = iiifResource.link.split('/').pop();
                    console.log("[CONTEXT REPORT] Processing IIIF resource id:", resourceId);
                    iiifResourceIds.push(resourceId);
                   
                    self.iiifResources.push({
                        resourceId: resourceId,
                        displayName: iiifResource.displayname || `IIIF ${resourceId.substring(0, 8)}...`
                    });
                }
            });
 
            console.log("[CONTEXT REPORT] All IIIF Resource IDs:", iiifResourceIds);
 
            // Add a tab for each IIIF resource
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
 
        // Initialize tabbed report with all tabs
        setupTabbedReport(self, params, myTabs);
    },
    template: tabbedReportTemplate
});