import ko from 'knockout';
import ReportViewModel from 'viewmodels/report';
import model3dReportTemplate from 'templates/views/report-templates/digital-resource-threeD-report.htm';
import resourceService from '../services/resource-service';
import 'views/components/custom/cesium-viewer';

export default ko.components.register('digital-resource-3d-report', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];

        self.ANNOTATIONS_TILE_NODE_ID = '82c68bd5-586a-4a27-984d-b1aa5fd0f54c';
        self.annotationsIds = [];

        self._initialized = false;
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(false);
        self.allowObjectPicking = ko.observable(false);
        self.existingAnnotations = ko.observableArray([]);

        ReportViewModel.apply(self, [params]);
        console.log("params: ", params);
        console.log("report: ", params.report);
        console.log("tiles: ", self.report.get('tiles'));

        const resourceId = params.report.attributes.resourceid;
        const tiles = self.report.get('tiles') || [];
        const annotationsTile = tiles.find(tile => tile.nodegroup_id === self.ANNOTATIONS_TILE_NODE_ID);

        if (annotationsTile) {
            self.annotationsIds = (JSON.parse(annotationsTile.data[self.ANNOTATIONS_TILE_NODE_ID]) || []);
            self.allowObjectPicking = ko.observable(true);
        };

        (async function () {
            try {
                const modelData = await resourceService.getOne(resourceId);
                const annotationsData = await Promise.all(
                    self.annotationsIds.map(id => resourceService.getOne(id))
                );
                modelData.resourceId = resourceId;
                self.models3D.push(modelData);
                console.log("Added model to models3D:", modelData);

                console.log("Fetched related annotations:", annotationsData);
                self.existingAnnotations(annotationsData);
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        })();
    },
    template: model3dReportTemplate,
});
