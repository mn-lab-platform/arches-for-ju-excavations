import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";
import { extractGeommetryFeaturesFromArchesResourceInfo } from "./utils/utils";
import store from "../core/store";

export class LayerMenuView {
    constructor(parentElement) {
        this.container = document.createElement('div');
        this.container.className = 'layer-menu';
        parentElement.appendChild(this.container);

        this.layers = [];

        this._generateLayout();
        this._setupEventListeners();
    }

    _generateLayout() {
        this.content = document.createElement('div');
        this.content.className = 'layer-menu-content';

        this.controlPanel = document.createElement('div');
        this.controlPanel.className = 'layer-menu-control-panel';

        const groupBtn = document.createElement('button');
        groupBtn.className = 'control-panel-btn';
        groupBtn.title = 'Group Layers';
        groupBtn.innerHTML = '<i class="fa fa-object-group"></i>';

        const filterBtn = document.createElement('button');
        filterBtn.className = 'control-panel-btn';
        filterBtn.title = 'Filter Layers';
        filterBtn.innerHTML = '<i class="fa fa-filter"></i>';

        const sortBtn = document.createElement('button');
        sortBtn.className = 'control-panel-btn';
        sortBtn.title = 'Sort Layers';
        sortBtn.innerHTML = '<i class="fa fa-sort"></i>';

        this.controlPanel.appendChild(groupBtn);
        this.controlPanel.appendChild(filterBtn);
        this.controlPanel.appendChild(sortBtn);

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

            this._createLayerMenuItem(layerId, layerAccentColor);

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
            this.layers.push(layerDefinition);
            
            store.mapLayerIds = [...store.mapLayerIds, layerDefinition.id];
            EventBusInstance.publish(events.LAYER_ADD, layerDefinition);
        });
    }

    _createLayerMenuItem(layerId, accentColor) {
        const item = document.createElement('div');
        item.className = 'layer-menu-item';
        item.draggable = true;

        const visibilityCheckbox = document.createElement('input');
        visibilityCheckbox.type = 'checkbox';
        visibilityCheckbox.checked = true;
        visibilityCheckbox.className = 'layer-visibility-checkbox';

        visibilityCheckbox.addEventListener('change', () => {
            if (visibilityCheckbox.checked) {
                EventBusInstance.publish(events.LAYER_SHOW, layerId);
            } else {
                EventBusInstance.publish(events.LAYER_HIDE, layerId);
            }
        });

        const colorIndicator = document.createElement('i');
        colorIndicator.className = 'fa fa-heart layer-color-indicator';
        colorIndicator.style.color = accentColor;

        const nameLabel = document.createElement('span');
        nameLabel.className = 'layer-name';
        nameLabel.textContent = `New Layer ${this.layers.length > 0 ? this.layers.length : ''}`;

        item.appendChild(visibilityCheckbox);
        item.appendChild(colorIndicator);
        item.appendChild(nameLabel);

        this.layerList.insertBefore(item, this.layerList.firstChild);
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