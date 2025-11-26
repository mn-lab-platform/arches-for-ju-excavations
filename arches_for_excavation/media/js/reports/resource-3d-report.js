import ko from 'knockout';
import tabbedReportTemplate from 'templates/views/report-templates/tabbed.htm';
import { setupTabbedReport } from '../viewmodels/mixins/tab-report-setup';
import 'views/components/custom/cesium-viewer';

export default ko.components.register('resource-3d-report', {
    viewModel: function(params) {
        const self = this;
        const myTabs = [
            ko.mapping.fromJS({
                name: 'Info',
                icon: 'fa-info-circle',
                main_component: undefined,
                nodegroup_ids: ['1dc344d6-1f5e-44d3-ae3c-18031de00632']  
            }),
            ko.mapping.fromJS({
                name: 'Cesium Viewer',
                icon: 'fa-cube',
                main_component: 'cesium-viewer',
                nodegroup_ids: []  
            })
        ];
        self.georeferenced = true;
        self.readOnly = false;
        setupTabbedReport(self, params, myTabs);
    },
    template: tabbedReportTemplate
});