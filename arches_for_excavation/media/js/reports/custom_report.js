import ko from 'knockout';
import ReportViewModel from 'viewmodels/report';
import customReportTemplate from 'templates/views/report-templates/custom_report.htm';

export default ko.components.register('custom_report', {
    viewModel: function(params) {
        params.configKeys = [];
        // define params for custom report here

        ReportViewModel.apply(this, [params]);
        // Put custom report logic here
    },
    template: customReportTemplate,
});
