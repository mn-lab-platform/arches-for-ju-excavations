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

        self.ANNOTATION_MODEL_GRAPHID = 'd1894fdd-41b3-44d3-aebb-ab44999f881e';
        self.CRS_MODEL_GRAPHID = '855343ec-9d7c-4947-970c-e80b6cfacc4f';
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

        const findDeepValue = (obj, keys) => {
            const wanted = Array.isArray(keys) ? keys : [keys];
            const seen = new Set();
            const visit = (value) => {
                if (!value || typeof value !== 'object') return undefined;
                if (seen.has(value)) return undefined;
                seen.add(value);
                for (const key of wanted) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) return value[key];
                }
                for (const child of Object.values(value)) {
                    const found = visit(child);
                    if (found !== undefined) return found;
                }
                return undefined;
            };
            return visit(obj);
        };

        const parseJsonValue = (value, fallback) => {
            if (!value) return fallback;
            if (typeof value !== 'string') return value;
            try { return JSON.parse(value); } catch (_) { return fallback; }
        };

        const extractCrsDefinitions = (crsData) => {
            const resource = crsData && crsData.resource ? crsData.resource : {};
            return {
                proj: resource["Definition (files)"].find(d => d.Type === 'PROJ4')?.String || '',
                wkt: resource["Definition (files)"].find(d => d.Type === 'WKT-2')?.String || '',
                esri: resource["Definition (files)"].find(d => d.Type === 'ESRI WKT')?.String || ''
            };
        };

        console.log('Related Resources Array:', relatedResourcesArray);
        const relatedAnnotationsObject = relatedResourcesArray.filter(rel => self.ANNOTATION_MODEL_GRAPHID === rel.graphid)[0] || { resources: [] };
        self.annotationsIds = relatedAnnotationsObject.resources?.map(res => res.resourceinstanceid) || [];

        console.log('Annotations Resources related to the model:', self.annotationsIds);

        const relatedCRSObject = relatedResourcesArray.filter(rel => self.CRS_MODEL_GRAPHID === rel.graphid)[0] || { resources: [] };
        self.crsResourceId = relatedCRSObject.resources?.[0]?.resourceinstanceid || '';
        console.log('CRS Resource object:', relatedCRSObject);

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
                    const resource = annoRaw.resource || {};
                    return {
                        id: annoRaw.resourceinstanceid,
                        name: annoRaw.displayname,
                        description: annoRaw.displaydescription || '',
                        geometry: parseJsonValue(findDeepValue(resource, 'Geometry'), []),
                        color: findDeepValue(resource, 'Color') || '#64ff64',
                        relatedResourceName: findDeepValue(resource, ['Related Resource', 'Annotated Resource', 'Annoted Resource']) || ''
                    };
                }));
                if (crsData) {
                    self.modelCrsDefinitions([{
                        modelResourceId: self.resourceId,
                        crs: extractCrsDefinitions(crsData)
                    }]);
                }
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        })();
    },
    template: model3dReportTemplate,
});
