import ko from 'knockout';
import tabbedReportTemplate from 'templates/views/report-templates/tabbed.htm';
import { setupTabbedReport } from '../viewmodels/mixins/tab-report-setup';
import 'views/components/custom/cesium-viewer';
import resourceService from '../services/resource-service';

export default ko.components.register('resource-3d-report', {
    viewModel: function(params) {
        const self = this;
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(false);
        self.allowObjectPicking = ko.observable(false);

        const myTabs = [
            ko.mapping.fromJS({
                name: 'Info',
                icon: 'fa-info-circle',
                main_component: undefined,
                nodegroup_ids: ['1dc344d6-1f5e-44d3-ae3c-18031de00632']  
            })
        ];

        console.log("params: ", params);
        const relatedResources = params.report.relatedResourcesLookup();
        
        console.log("related: ", relatedResources);
        const model3DResource = Object.entries(relatedResources)
            .filter(([_, value]) => (value.name === 'Digital Resource 3D'))
            .map(([_, value]) => value);

        console.log("models: ", model3DResource);
        if (model3DResource.length > 0) {
            myTabs.push(ko.mapping.fromJS({
                name: 'Cesium Viewer',
                icon: 'fa-cube',
                main_component: 'cesium-viewer',
                nodegroup_ids: [],
                component_params: {
                    models3D: self.models3D,
                    allowAnnotationsEdits: self.allowAnnotationsEdits,
                }
            }));
            
            const actualModels = model3DResource[0].loadedRelatedResources();
            console.log("Actual 3D models: ", actualModels);
        
            actualModels.forEach(modelResource => {
                if (modelResource) {
                    const resourceId = modelResource.link.split('/').pop();
                    console.log("Processing resource id: ", resourceId);
                    
                    resourceService.getOne(resourceId).then(data => {
                        data.resourceId = resourceId;
                        self.models3D.push(data);
                        console.log("Added model to models3D:", data);
                    });
                }
            });
        }
        setupTabbedReport(self, params, myTabs);
    },
    template: tabbedReportTemplate
});