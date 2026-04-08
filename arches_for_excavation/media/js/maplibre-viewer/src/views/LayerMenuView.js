import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";
import { extractGeommetryFeaturesFromArchesResourceInfo } from "../core/utils/utils";
import store from "../core/store";

export class LayerMenuView {
    constructor(parentElement) {
        this.container = document.createElement('div');
        this.container.className = 'layer-menu';
        parentElement.appendChild(this.container);

        this.layers = [];
        this._visibleLayers = new Set();

        this._generateLayout();
        this._setupEventListeners();
    }

    _generateLayout() {
        this.content = document.createElement('div');
        this.content.className = 'layer-menu-content';

        this.controlPanel = document.createElement('div');
        this.controlPanel.className = 'layer-menu-control-panel';

        const saveBtn = document.createElement('button');
        saveBtn.className = 'control-panel-btn';
        saveBtn.title = 'Save Layers to File';
        saveBtn.innerHTML = '<i class="fa fa-save"></i>';

        saveBtn.addEventListener('click', () => {
            window.alert('Oops! This feature is not implemented yet.'); //TODO: implement export functionality
        });

        const loadBtn = document.createElement('button');
        loadBtn.className = 'control-panel-btn';
        loadBtn.title = 'Load Layers from File';
        loadBtn.innerHTML = '<i class="fa fa-folder-open"></i>';

        loadBtn.addEventListener('click', () => {
            window.alert('Oops! This feature is not implemented yet.'); //TODO: implement import functionality
        });

        this.controlPanel.appendChild(saveBtn);
        this.controlPanel.appendChild(loadBtn);

        this.layerList = document.createElement('div');
        this.layerList.className = 'layer-list';

        this.content.appendChild(this.controlPanel);
        this.content.appendChild(this.layerList);

        this.container.appendChild(this.content);
    }

    _setupEventListeners() {
        EventBusInstance.subscribe(events.LAYER_CREATE_TRIGGER, (layerDataArray) => {
            console.log("received layer data: ", layerDataArray);
            const layerAccentColor = this._generateRandomColor();
            const layerId = `layer-${this.layers.length}`;

            const featureCollection = this._aggregateLayerGeometryFeatures(layerDataArray);
            const layerDefinition = {
                source_info: {
                    name: layerId,
                    type: 'geojson',
                    data: featureCollection
                },
                layer_info: {
                    id: layerId,
                    name: `Layer ${this.layers.length}`,
                    source: layerId,
                    accent: layerAccentColor,
                    icon: 'fa fa-map-marker',
                }
            }
            this.layers.unshift(layerDefinition);
            this._visibleLayers.add(layerId);
            this._refreshLayerMenuItems();
            
            store.mapLayerIds = [...store.mapLayerIds, layerDefinition.layer_info.id];
            EventBusInstance.publish(events.LAYER_ADD, layerDefinition);
        });
    }

    _createLayerMenuItem(layerId, accentColor, layerName) {
        const item = document.createElement('div');
        item.className = 'layer-menu-item';
        item.draggable = true;

        const layerInfoGroup = document.createElement('div');
        layerInfoGroup.className = 'layer-info-group';

        const visibilityCheckbox = document.createElement('input');
        visibilityCheckbox.type = 'checkbox';
        visibilityCheckbox.checked = this._visibleLayers.has(layerId);
        visibilityCheckbox.className = 'layer-visibility-checkbox';

        visibilityCheckbox.addEventListener('change', () => {
            if (visibilityCheckbox.checked) {
                EventBusInstance.publish(events.LAYER_SHOW, layerId);
                this._visibleLayers.add(layerId);
            } else {
                EventBusInstance.publish(events.LAYER_HIDE, layerId);
                this._visibleLayers.delete(layerId);
            }
        });

        const colorIndicator = document.createElement('i');
        colorIndicator.className = 'fa fa-heart layer-color-indicator';
        colorIndicator.style.color = accentColor;

        const nameLabel = document.createElement('span');
        nameLabel.className = 'layer-name';
        nameLabel.textContent = layerName;

        layerInfoGroup.appendChild(visibilityCheckbox);
        layerInfoGroup.appendChild(colorIndicator);
        layerInfoGroup.appendChild(nameLabel);

        const layerControlGroup = document.createElement('div');
        layerControlGroup.className = 'layer-control-group';

        const settingsButton = document.createElement('button');
        settingsButton.className = 'layer-settings-btn';
        settingsButton.innerHTML = '<i class="fa fa-cog"></i>';
        settingsButton.title = 'Layer Settings';

        settingsButton.addEventListener('click', () => {
            EventBusInstance.publish(events.FLYOUT_OPEN_LAYER_SETTINGS, {
                layerId: layerId,
                layerName: layerName,
                accentColor: accentColor
            });
        });

        const orderGroup = document.createElement('div');
        orderGroup.className = 'layer-order-group';

        const moveUpBtn = document.createElement('button');
        moveUpBtn.className = 'layer-move-btn layer-move-up-btn';
        moveUpBtn.innerHTML = '<i class="fa fa-chevron-up"></i>';
        moveUpBtn.title = 'Move Layer Up';
        moveUpBtn.disabled = this.layers[0].layer_info.id === layerId;

        moveUpBtn.addEventListener('click', () => {
            this._moveLayerUp(layerId);
        });

        const moveDownBtn = document.createElement('button');
        moveDownBtn.className = 'layer-move-btn layer-move-down-btn';
        moveDownBtn.innerHTML = '<i class="fa fa-chevron-down"></i>';
        moveDownBtn.title = 'Move Layer Down';
        moveDownBtn.disabled = this.layers[this.layers.length - 1].layer_info.id === layerId;

        moveDownBtn.addEventListener('click', () => {
            this._moveLayerDown(layerId);
        });

        orderGroup.appendChild(moveUpBtn);
        orderGroup.appendChild(moveDownBtn);

        layerControlGroup.appendChild(settingsButton);
        layerControlGroup.appendChild(orderGroup);
    
        item.appendChild(layerInfoGroup);
        item.appendChild(layerControlGroup);

        this.layerList.appendChild(item);
    }

    _moveLayerUp(layerId) {
        const idx = this.layers.findIndex(l => l.layer_info.id === layerId);
        if (idx > 0) {
            [this.layers[idx - 1], this.layers[idx]] = [this.layers[idx], this.layers[idx - 1]];
            this._refreshLayerMenuItems();
            EventBusInstance.publish(events.LAYERS_REORDER, this.layers.map(l => l.layer_info.id));
        }
    }

    _moveLayerDown(layerId) {
        const idx = this.layers.findIndex(l => l.layer_info.id === layerId);
        if (idx < this.layers.length - 1) {
            [this.layers[idx + 1], this.layers[idx]] = [this.layers[idx], this.layers[idx + 1]];
            this._refreshLayerMenuItems();
            EventBusInstance.publish(events.LAYERS_REORDER, this.layers.map(l => l.layer_info.id));
        }
    }

    _refreshLayerMenuItems() {
        this.layerList.replaceChildren();
        this.layers.forEach((layerDef) => {
            this._createLayerMenuItem(layerDef.layer_info.id, layerDef.layer_info.accent, layerDef.layer_info.name);
        });
    }
    
    _generateRandomColor() {
        return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`;
    }

    _aggregateLayerGeometryFeatures(layerDataArray) {
        const allFeatures = [];

        layerDataArray.forEach((layerData, layerIdx) => {
            const features = extractGeommetryFeaturesFromArchesResourceInfo(layerData);
            if (!features || !Array.isArray(features)) return;

            features.forEach((feat, fi) => {
                let feature = feat;

                if (!feature || feature.type !== 'Feature') {
                    feature = {
                        type: 'Feature',
                        geometry: feat?.geometry ?? feat,
                        properties: {}
                    };
                } else {
                    feature = { ...feature };
                }

                const resId = layerData.resourceinstanceid ?? layerData.resourceId ?? `layer-${layerIdx}`;
                feature.id = feature.id ?? `${resId}-${fi}`;
                feature.properties = {
                    ...(feature.properties || {}),
                    sourceResourceId: resId,
                    sourceDisplayName: layerData.displayname ?? layerData.name
                };

                allFeatures.push(feature);
            });
        });

        const featureCollection = {
            type: 'FeatureCollection',
            features: allFeatures
        };

        console.log('Aggregated FeatureCollection:', featureCollection);
        return featureCollection;
    }
}