import ko from 'knockout';
import ReportViewModel from 'viewmodels/report';
import cesiumReportTemplate from 'templates/views/report-templates/cesium_report.htm';
import { getCesiumToken } from '../config/config';
import { initializeCesiumViewer } from '../cesium_viewer';

export default ko.components.register('cesium_report', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];

        ReportViewModel.apply(self, [params]);

        self._initialized = false;

        self.onCesiumViewerRendered = function () {
            if (self._initialized) {
                console.log("Viewer already initialized, skipping");
                return;
            }

            const viewerEl = document.getElementById('cesiumViewer');
            if (!viewerEl) {
                console.error("cesiumViewer element not found");
                return;
            }

            self._initialized = true;
            self.initializeViewer();
        }

        self.initializeViewer = async () => {
            try {
                const token = getCesiumToken();
                await initializeCesiumViewer(token, 'cesiumViewer', { georeferenced: true, readOnly: false });
            } catch (error) {
                console.error('Failed to initialize Cesium:', error);
            }
        };
    },
    template: cesiumReportTemplate,
});