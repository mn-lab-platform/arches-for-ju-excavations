import ko from 'knockout';
import tabbedReportTemplate from 'templates/views/report-templates/tabbed.htm';
import { setupTabbedReport } from '../viewmodels/mixins/tab-report-setup';
import 'views/components/iiif/iiif-map-viewer';

export default ko.components.register('resource-iiif-report', {
    viewModel: function(params) {
        const self = this;
        
        // Observable arrays dla zasobów IIIF
        self.iiifResources = ko.observableArray([]);
        self.readOnly = ko.observable(true);

        // Bazowa zakładka Info
        const myTabs = [
            ko.mapping.fromJS({
                name: 'Info',
                icon: 'fa-info-circle',
                main_component: undefined,
                nodegroup_ids: ['1dc344d6-1f5e-44d3-ae3c-18031de00632']  
            })
        ];

        console.log("[IIIF REPORT] params:", params);
        const relatedResources = params.report.relatedResourcesLookup();
        
        console.log("[IIIF REPORT] related resources:", relatedResources);
        
        // Filtruj zasoby typu "Digital Resource" lub "IIIF"
        const iiifResourceList = Object.entries(relatedResources)
            .filter(([_, value]) => {
                // Dopasuj nazwę grafu - może być "Digital Resource", "IIIF Digital", itp.
                const name = (value.name || '').toLowerCase();
                return name.includes('digital') || name.includes('iiif');
            })
            .map(([_, value]) => value);

        console.log("[IIIF REPORT] filtered IIIF resources:", iiifResourceList);

        // Jeśli znaleziono zasoby IIIF, dodaj zakładki
        if (iiifResourceList.length > 0) {
            
            // Pobierz faktyczne powiązane zasoby
            const actualIiifResources = iiifResourceList[0].loadedRelatedResources();
            console.log("[IIIF REPORT] Actual IIIF resources:", actualIiifResources);
            
            // Zbierz resourceId wszystkich zasobów IIIF
            const iiifResourceIds = [];
            actualIiifResources.forEach(iiifResource => {
                if (iiifResource) {
                    const resourceId = iiifResource.link.split('/').pop();
                    console.log("[IIIF REPORT] Processing IIIF resource id:", resourceId);
                    iiifResourceIds.push(resourceId);
                    
                    // Dodaj do observable array (opcjonalnie - jeśli chcesz przechowywać pełne dane)
                    self.iiifResources.push({
                        resourceId: resourceId,
                        displayName: iiifResource.displayname || `IIIF ${resourceId.substring(0, 8)}...`
                    });
                }
            });

            console.log("[IIIF REPORT] All IIIF Resource IDs:", iiifResourceIds);

            // Dodaj zakładkę dla każdego zasobu IIIF
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

            // Alternatywnie: jedna zakładka ze wszystkimi obrazami (gridowa galeria)
            // Odkomentuj jeśli wolisz tę opcję:
            /*
            myTabs.push(ko.mapping.fromJS({
                name: 'IIIF Gallery',
                icon: 'fa-images',
                main_component: 'iiif-gallery-view',
                nodegroup_ids: [],
                component_params: {
                    iiifResourceIds: iiifResourceIds,
                    readOnly: self.readOnly
                }
            }));
            */
        }

        // Inicjalizacja raportu z zakładkami
        setupTabbedReport(self, params, myTabs);
    },
    template: tabbedReportTemplate
});