import ko from 'knockout';
import ReportViewModel from 'viewmodels/report';
import annotationReportTemplate from 'templates/views/report-templates/annotation-report.htm';
import resourceService from '../services/resource-service';
import 'views/components/custom/cesium-viewer';

export default ko.components.register('annotation-report', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];

        self._initialized = false;
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(false);
        self.allowObjectPicking = ko.observable(true);
        self.existingAnnotations = ko.observableArray([]);

        ReportViewModel.apply(self, [params]);
        const resourceId = params.report.attributes.resourceid;

        const tiles = self.report.get('tiles') || [];
        const annotationsTile = tiles.find(tile => tile.nodegroup_id === self.ANNOTATIONS_TILE_NODE_ID);
        
        if (annotationsTile) {
            self.annotationsIds = (JSON.parse(annotationsTile.data[self.ANNOTATIONS_TILE_NODE_ID]) || []);
            self.allowObjectPicking = ko.observable(true);
        };

        const relatedResources = params.report.relatedResourcesLookup();
        const model3DResource = Object.entries(relatedResources)
            .filter(([_, value]) => (value.name === 'Digital Resource 3D'))
            .map(([_, value]) => value);

        console.log("Digital Resource 3D found: ", model3DResource);

        if (model3DResource.length > 0) {
            const actualModels = model3DResource[0].loadedRelatedResources();
            console.log("Actual 3D models: ", actualModels);
        
            actualModels.forEach(modelResource => {
                if (modelResource) {
                    const modelResourceId = modelResource.link.split('/').pop();
                    console.log("Processing 3D model resource id: ", modelResourceId);
                    
                    resourceService.getOne(modelResourceId).then(data => {
                        data.resourceId = modelResourceId;
                        self.models3D.push(data);
                        console.log("Added 3D model to models3D:", data);
                    });
                }
            });
        }

        (async function () {
            try {
                const annotationData = await resourceService.getOne(resourceId); //TODO: This is very ugly, fetching self pretty much
                console.log("Fetched related annotations:", annotationData);
                self.existingAnnotations([annotationData]);
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        })();
    },
    template: annotationReportTemplate,
});
