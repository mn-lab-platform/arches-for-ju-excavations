import ko from 'knockout';
import viewerTemplate from 'templates/views/components/custom/cesium_viewer.htm';
import { initializeCesiumViewer } from '../../../cesium_viewer';
import { getCesiumToken } from '../../../config/config';

export default ko.components.register('cesium-viewer', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];

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

        self.initializeViewer = async function () {
            try {
                const token = getCesiumToken();
                await initializeCesiumViewer(token, 'cesiumViewer', { georeferenced: true, readOnly: false });
            } catch (error) {
                console.error('Failed to initialize Cesium:', error);
            }
        };
    },
    template: viewerTemplate,
});