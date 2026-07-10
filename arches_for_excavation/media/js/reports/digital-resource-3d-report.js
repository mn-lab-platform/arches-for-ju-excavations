import ko from 'knockout';
import ReportViewModel from 'viewmodels/report';
import model3dReportTemplate from 'templates/views/report-templates/digital-resource-threeD-report.htm';
import resourceService from '../services/resource-service';
import 'views/components/custom/cesium-viewer';
import arches from 'arches';

export default ko.components.register('digital-resource-3d-report', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];

        self.ANNOTATION_MODEL_GRAPHID = '2880934b-0015-4c5a-8ec1-1ab9bca329fd';
        self.CRS_MODEL_GRAPHID = 'a5219c24-2907-4055-9d68-18216d214458';
        self.annotationsIds = [];
        self.crsResourceId = '';
        self.resourceId = params.report.attributes.resourceid;

        self._initialized = false;
        self.models3D = ko.observableArray([]);
        self.allowAnnotationsEdits = ko.observable(false);
        self.allowObjectPicking = ko.observable(true);
        self.allowObjectAddition = ko.observable(false);
        self.existingAnnotations = ko.observableArray([]);
        self.modelCrsDefinitions = ko.observableArray([]);

        ReportViewModel.apply(self, [params]);
        
        const relatedResourcesArray = self.report.get('related_resources') || [];

        const relatedAnnotationsObject = relatedResourcesArray.filter(rel => rel.graphid === self.ANNOTATION_MODEL_GRAPHID)[0] || { resources: [] };
        self.annotationsIds = relatedAnnotationsObject.resources?.map(res => res.resourceinstanceid);

        const relatedCRSObject = relatedResourcesArray.filter(rel => rel.graphid === self.CRS_MODEL_GRAPHID)[0] || { resources: [] };
        self.crsResourceId = relatedCRSObject.resources?.[0]?.resourceinstanceid || '';

        (async function () {
            try {
                const modelData = await resourceService.getOne(self.resourceId);
                const annotationsData = await Promise.all(
                    self.annotationsIds.map(id => resourceService.getOne(id))
                );
                const crsData = self.crsResourceId ? await resourceService.getOne(self.crsResourceId) : null;
                modelData.resourceId = self.resourceId;
                self.models3D.push(modelData);

                self.existingAnnotations(annotationsData.map(annoRaw => {
                    return {
                        id: annoRaw.resourceinstanceid,
                        name: annoRaw.displayname,
                        description: annoRaw.displaydescription || '',
                        geometry: JSON.parse(annoRaw.resource.Geometry),
                        color: annoRaw.resource.Color || '#64ff64',
                        relatedResourceName: annoRaw.resource["Related Resource"] || ''
                    };
                }));
                if (crsData) {
                    self.modelCrsDefinitions([{
                        modelResourceId: self.resourceId,
                        crs: {
                            proj: crsData.resource.Definition.PROJ4['PROJ4 String'] || '',
                            wkt: crsData.resource.Definition['WKT-2']['WKT-2 String'] || '',
                            esri: crsData.resource.Definition['ESRI WKT']['ESRI WKT String'] || ''
                        }
                    }]);
                }
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        })();
    },
    template: model3dReportTemplate,
});
