import ko from 'knockout';
import cesiumViewerTemplate from 'templates/views/components/custom/cesium_viewer.htm';
import { Scene } from '../../../cesium_viewer/cesium/Scene';
import { ToolController } from '../../../cesium_viewer/ui/ToolController';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export default ko.components.register('cesium_viewer', {
    viewModel: function(params) {
        params.configKeys = [];

        const self = this;
        self.viewerInitialized = false;

        this.onCesiumViewerRendered = function () {
            if (self.viewerInitialized) {
                console.log("Viewer already initialized, skipping");
                return;
            }

            const viewerEl = document.getElementById('cesiumViewer');
            if (!viewerEl) {
                console.error("cesiumViewer element not found");
                return;
            }

            const existingContainers = viewerEl.querySelectorAll('#cesiumViewer');
            if (existingContainers.length > 0) {
                console.log("CesiumViewer container already exist, skipping initialization");
                return;
            }

            self.viewerInitialized = true;
            viewerEl.innerHTML = '';

            console.log("Initializing Cesium viewer...");
            self.initializeViewer();
        }

        this.initializeViewer = async function () {
            try {
                const scene = new Scene('cesiumViewer');

                const tilesetUrl = '/files/uploadedfiles/lamp/tileset.json';
                await scene.loadTileset(tilesetUrl);

                const toolController = new ToolController(scene.widget);
                console.log("Cesium viewer initialized successfully");
            } catch (error) {
                console.error("Error initializing viewer:", error);
            }
        }
    }, template: cesiumViewerTemplate,
});