import { Scene } from './cesium/Scene.js';
import { UIController } from './ui/UIController.js';
import '../../css/components/cesium-viewer/index.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import modelMatrixService from './services/modelMatrixService.js';

export async function initializeCesiumViewer(cesiumContainerId, viewerOptions = {}) {
    const sceneOptions = {
        georeferenced: viewerOptions.georeferenced || false,
        allowObjectAddition: viewerOptions.allowObjectAddition || false,
        allowObjectPicking: viewerOptions.allowObjectPicking || false,
        allowAnnotationsEdits: viewerOptions.allowAnnotationsEdits || false,
        existingAnnotations: viewerOptions.existingAnnotations || [],
        basemaps: viewerOptions.basemaps || [],
        crsDefinition: viewerOptions.crsDefinition || {}
    };

    const scene = new Scene(cesiumContainerId, sceneOptions);
    const tileset = await scene.loadTileset(viewerOptions.modelUrl);

    if (viewerOptions.crsDefinition && viewerOptions.crsDefinition.wkt) {
        const response = await modelMatrixService.getTransformedModelMatrixForTileset(tileset._url, viewerOptions.crsDefinition.wkt);
        const newMatrix = response.new_matrix;
        if (newMatrix) {
            scene.applyModelMatrix(newMatrix);
        }
    }
    
    const noOp = (..._args) => {};

    const externalCallbacks = {
        onPolygonCompleted: viewerOptions.onPolygonCompleted || noOp,
        onAnnotationUpdated: viewerOptions.onAnnotationUpdated || noOp,
        onAnnotationDeleted: viewerOptions.onAnnotationDeleted || noOp
    }
    
    new UIController(scene, externalCallbacks);
}