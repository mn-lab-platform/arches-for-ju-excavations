import '../../../css/components/cesium-plugin/index.css';
import '../../../css/components/shared-plugin-ui/index.css';
import 'font-awesome/css/font-awesome.min.css';

import { CesiumEngine } from './cesium/CesiumEngine';
import { PanelView } from "./views/PanelView";
import { GlobalBusyOverlay } from './components/GlobalBusyOverlay';

export const initializePlugin = () => {
    const panelView = new PanelView('plugin-3d-root');
    const mapEngine = new CesiumEngine('plugin-3d-root');
    const globalBusyOverlay = new GlobalBusyOverlay('plugin-3d-root');
};

// initializePlugin();