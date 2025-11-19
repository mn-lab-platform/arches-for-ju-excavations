define([
    'knockout',
    'templates/views/report-templates/resource_report.htm',
    'arches',
    'views/components/custom/cesium_viewer'
], function(ko, resourceReportTemplate, arches) {
    return ko.components.register('resource_report', {
        viewModel: function(params) {
            params.configKeys = ['tabs', 'activeTabIndex'];

            this.sections = [
                { id: 'cesium_viewer', title: 'Cesium Viewer' }
            ];

            this.activeSection = ko.observable('cesium_viewer');
        },
        template: resourceReportTemplate
    });
});

