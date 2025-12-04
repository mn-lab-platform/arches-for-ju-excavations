import ko from 'knockout';
import ReportViewModel from 'viewmodels/report';
import model3dReportTemplate from 'templates/views/report-templates/digital-resource-threeD-report.htm';
import resourceService from '../services/resource-service';
import 'views/components/custom/cesium-viewer';

export default ko.components.register('digital-resource-3d-report', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];
        self._initialized = false;
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(false);
        self.allowObjectPicking = ko.observable(false);

        ReportViewModel.apply(self, [params]);
        console.log("params: ", params);
        console.log("report: ", params.report);

        const resourceId = params.report.attributes.resourceid;
        
        resourceService.getResourceData(resourceId).then(data => {
            data.resourceId = resourceId;
            self.models3D.push(data);
            console.log("Added model to models3D:", data);
        }).catch(error => {
            console.error("Failed to load model data:", error);
        });
    },
    template: model3dReportTemplate,
});
