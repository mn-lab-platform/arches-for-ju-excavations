import ko from 'knockout';
import tabbedReportTemplate from 'templates/views/report-templates/tabbed.htm';
import { setupTabbedReport } from '../viewmodels/mixins/tab-report-setup';
import 'views/components/custom/cesium-viewer';
import 'views/components/iiif/iiif-map-viewer';
import resourceService from '../services/resource-service';

export default ko.components.register('context-tabbed-report', {
    viewModel: function(params) {
        const self = this;
        
        // 3D Models state
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(false);
        self.allowObjectPicking = ko.observable(false);
        self.existingAnnotations = ko.observableArray([]);
        
        // IIIF state
        self.iiifResources = ko.observableArray([]);
        self.readOnly = ko.observable(true);

        // Base Info tab
        const myTabs = [
            ko.mapping.fromJS({
                name: 'Info',
                icon: 'fa-info-circle',
                main_component: undefined,
                nodegroup_ids: [
                    'd655993d-9f52-11eb-96c4-020063fe0012',  // Field - Characterization
                    'bd290f65-b2fe-4de2-a9b6-fa056036facb',  // Initial Footprint
                    'ca2e0e26-a38d-11eb-96c4-020063fe0012',  // Harris Matrix
                    'd6559940-9f52-11eb-96c4-020063fe0012',  // Field - Location PAP2015
                    'd6559937-9f52-11eb-96c4-020063fe0012',  // Field - Location UTM
                    'd6559925-9f52-11eb-96c4-020063fe0012',  // Field - Images
                    'd655992e-9f52-11eb-96c4-020063fe0012',  // Field - Other Information
                    'd6559931-9f52-11eb-96c4-020063fe0012',  // Footprint
                    'd655992b-9f52-11eb-96c4-020063fe0012',  // Basic Information
                    'd6559928-9f52-11eb-96c4-020063fe0012'   // Field - Remains
                ]
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

            actualModels.forEach(modelResource => {
                if (modelResource) {
                    const resourceId = modelResource.link.split('/').pop();
                    console.log("[CONTEXT REPORT] Processing 3D model resource id:", resourceId);
                    
                    resourceService.getOne(resourceId).then(data => {
                        data.resourceId = resourceId;
                        self.models3D.push(data);
                        console.log("[CONTEXT REPORT] Added 3D model to models3D:", data);
                    });
                }
            });
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