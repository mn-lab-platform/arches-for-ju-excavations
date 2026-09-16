import ko from 'knockout';
import MapReportViewModel from 'viewmodels/map-report';
import mapReportTemplate from 'templates/views/report-templates/map.htm';

export default ko.components.register('map-report', {
    viewModel: function(params) {
        MapReportViewModel.apply(this, [params]);
        this.hideEmptyNodes(true);
    },
    template: mapReportTemplate
});
