import '../../../css/components/maplibre-viewer/index.css';
import 'font-awesome/css/font-awesome.min.css';

import { MapEngine } from "./map/MapEngine";
import { PanelView } from "./views/PanelView";

export const initializePlugin = () => {
    const mapEngine = new MapEngine('map-root');
    const panelView = new PanelView('map-root');
};

initializePlugin();