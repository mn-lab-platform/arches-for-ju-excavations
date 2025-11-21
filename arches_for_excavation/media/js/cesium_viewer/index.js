import { Scene } from './cesium/Scene.js';
import { ToolController } from './ui/ToolController.js';
import '../../css/cesium_viewer/index.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export async function initializeCesiumViewer(cesiumToken, cesiumContainerId, viewerOptions = {}) {
    const sceneOptions = {
        token: cesiumToken,
        georeferenced: viewerOptions.georeferenced || false,
        readOnly: viewerOptions.readOnly || false
    };

    const scene = new Scene(cesiumContainerId, sceneOptions);
    await scene.loadTileset(sceneOptions.georeferenced ? '/files/uploadedfiles/georeferenced/tileset.json' : '/files/uploadedfiles/lamp/tileset.json');

    new ToolController(scene);
}