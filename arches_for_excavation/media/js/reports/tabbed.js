import ko from 'knockout';
import TabbedReportViewModel from 'viewmodels/tabbed-report';
import tabbedReportTemplate from 'templates/views/report-templates/tabbed.htm';

export default ko.components.register('tabbed-report', {
    viewModel: function(params) {
        TabbedReportViewModel.apply(this, [params]);
        this.hideEmptyNodes(true);
    },
    template: tabbedReportTemplate
});
