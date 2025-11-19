import ko from 'knockout';
import ReportViewModel from 'viewmodels/report';
import cesiumReportTemplate from 'templates/views/report-templates/cesium_report.htm';
import { Scene } from 'cesium_viewer/cesium/Scene';
import { ToolController } from 'cesium_viewer/ui/ToolController';
import 'cesium/Build/Cesium/Widgets/widgets.css';

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
                if (!window.CESIUM_BASE_URL) {
                    window.CESIUM_BASE_URL = '/static/cesium';
                }
                self.scene = new Scene('cesiumViewer');

                const tilesetUrl = '/files/uploadedfiles/lamp/tileset.json';
                await self.scene.loadTileset(tilesetUrl);

                self.toolController = new ToolController(self.scene.widget);
            } catch (error) {
                console.error('Failed to initialize Cesium:', error);
            }
        };
    },
    template: cesiumReportTemplate,
});