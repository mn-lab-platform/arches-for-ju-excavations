import { Scene } from './cesium/Scene.js';
import { ToolController } from './ui/ToolController.js';
import '../../css/components/cesium_viewer/index.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export async function initializeCesiumViewer(cesiumToken, cesiumContainerId, viewerOptions = {}) {
    const sceneOptions = {
        token: cesiumToken,
        georeferenced: viewerOptions.georeferenced || false,
        allowAnnotationsEdits: viewerOptions.allowAnnotationsEdits || false,
        allowObjectPicking: viewerOptions.allowObjectPicking || false,
        containerId: viewerOptions.containerId || cesiumContainerId
    };

    const scene = new Scene(cesiumContainerId, sceneOptions);
    console.log("Scene scale: ", scene.scale);
    await scene.loadTileset(viewerOptions.modelUrl);
    
    new ToolController(scene);
}