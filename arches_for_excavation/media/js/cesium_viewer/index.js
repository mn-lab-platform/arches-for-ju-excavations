import { Scene } from './cesium/Scene.js';
import { UIController } from './ui/UIController.js';
import '../../css/components/cesium_viewer/index.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export async function initializeCesiumViewer(cesiumContainerId, viewerOptions = {}) {
    const sceneOptions = {
        georeferenced: viewerOptions.georeferenced || false,
        allowAnnotationsEdits: viewerOptions.allowAnnotationsEdits || false,
        allowObjectPicking: viewerOptions.allowObjectPicking || false,
        existingAnnotations: viewerOptions.existingAnnotations || []
    };

    const scene = new Scene(cesiumContainerId, sceneOptions);
    console.log("Scene scale: ", scene.scale);
    await scene.loadTileset(viewerOptions.modelUrl);

    const externalCallbacks = {
        onAnnotationSaved: viewerOptions.onAnnotationSaved,
        onAnnotationDeleted: viewerOptions.onAnnotationDeleted
    }
    
    new UIController(scene, externalCallbacks);
}