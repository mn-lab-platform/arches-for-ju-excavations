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

        const ANNOTATION_RESOURCE_GRAPHIDS = ['2880934b-0015-4c5a-8ec1-1ab9bca329fd', 'd1894fdd-41b3-44d3-aebb-ab44999f881e'];
        const CRS_RESOURCE_GRAPHIDS = ['a5219c24-2907-4055-9d68-18216d214458', '855343ec-9d7c-4947-970c-e80b6cfacc4f'];
       
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
        console.log('[CONTEXT REPORT] relatedResourcesLookup buckets',
            Object.entries(relatedResources).map(([key, value]) => ({
                    key,
                    name: value.name,
                    count: value.loadedRelatedResources().length,
                    resources: value.loadedRelatedResources()
                }))
            );

            const contextResourceId = params.report.attributes.resourceid;
            resourceService.getAllRelatedTo(contextResourceId).then(data => {
                console.log('[CONTEXT REPORT] getAllRelatedTo raw', data);
            });
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

        const unwrapValue = (value) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                if (value['@value'] !== undefined) return value['@value'];
                if (value.value !== undefined) return value.value;
            }
            return value;
        };

        const parseJsonValue = (value, fallback) => {
            value = unwrapValue(value);

            if (!value) return fallback;
            if (Array.isArray(value)) return value;
            if (typeof value !== 'string') return fallback;

            try {
                return JSON.parse(value);
            } catch (_) {
                return fallback;
            }
        };

        const graphIn = (graphId, graphIds) => graphIds.includes(graphId);

        const extractCrsDefinitions = (crsData) => {
            const resource = crsData && crsData.resource ? crsData.resource : {};
            return {
                proj: findDeepValue(resource, ['PROJ4 String', 'PROJ4']) || '',
                wkt: findDeepValue(resource, ['WKT-2 String', 'WKT-2', 'WKT2']) || '',
                esri: findDeepValue(resource, ['ESRI WKT String', 'ESRI WKT']) || ''
            };
        };

        const loadModelBundle = async (modelResource) => {
            if (!modelResource) return null;

            const resourceId = modelResource.link.split('/').pop();

            const [modelData, relatedData] = await Promise.all([
                resourceService.getOne(resourceId),
                resourceService.getAllRelatedTo(resourceId)
            ]);

            const relatedResourcesArray = relatedData?.related_resources?.related_resources || [];

            const annotationIds = relatedResourcesArray
                .filter(related => graphIn(related.graph_id, ANNOTATION_RESOURCE_GRAPHIDS))
                .map(related => related.resourceinstanceid);

            const crsId = relatedResourcesArray.find(
                related => graphIn(related.graph_id, CRS_RESOURCE_GRAPHIDS)
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
            const actualModels = model3DResource.flatMap(group => group.loadedRelatedResources());
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
                                const annoResource = anno.resource || {};
                                self.existingAnnotations.push({
                                    id: anno.resourceinstanceid,
                                    name: anno.displayname,
                                    description: anno.displaydescription || '',
                                    geometry: parseJsonValue(findDeepValue(annoResource, 'Geometry'), []),
                                    color: findDeepValue(annoResource, 'Color') || '#64ff64',
                                    relatedResourceName: findDeepValue(annoResource, ['Related Resource', 'Annotated Resource', 'Annoted Resource']) || ''
                                });
                            });
                            if (crsData) {
                                self.modelCrsDefinitions.push({
                                    modelResourceId: resourceId,
                                    crs: extractCrsDefinitions(crsData)
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
            const actualIiifResources = iiifResourceList.flatMap(group =>
                group.loadedRelatedResources()
            );
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