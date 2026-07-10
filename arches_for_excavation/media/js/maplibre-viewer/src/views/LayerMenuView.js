import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";
import { extractGeommetryFeaturesFromArchesResourceInfo } from "../core/utils/utils";
import store from "../core/store";
import layerWorkspaceFileService from "../storage/layerWorkspaceFileService";
import constants from "../constants/constants";
import { createLayerDefinition } from "./utils/utils";

export class LayerMenuView {
    constructor(parentElement) {
        this.container = document.createElement('div');
        this.container.className = 'layer-menu';
        parentElement.appendChild(this.container);

        this.layers = [];
        this._visibleLayers = new Set();
        this._draggedLayerId = null;
        this._selectedLayerId = null;

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
            layerWorkspaceFileService.downloadLayerWorkspaceFile(this.layers);
        });

        const hiddenFileINput = document.createElement('input');
        hiddenFileINput.type = 'file';
        hiddenFileINput.accept = layerWorkspaceFileService.EXTENSION;
        hiddenFileINput.style.display = 'none';

        hiddenFileINput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const content = event.target.result;
                    const layersArray = JSON.parse(content);
                    if (Array.isArray(layersArray)) {
                        layersArray.forEach(layerDef => {
                            this._addLayer(layerDef, false);
                        });
                    } else {
                        window.alert('Invalid file format: expected an array of layer definitions.');
                    }
                } catch (error) {
                    window.alert('Error reading file: ' + error.message);
                }
            };
            reader.readAsText(file);
        });

        const loadBtn = document.createElement('button');
        loadBtn.className = 'control-panel-btn';
        loadBtn.title = 'Load Layers from File';
        loadBtn.innerHTML = '<i class="fa fa-folder-open"></i>';

        loadBtn.addEventListener('click', () => {
            hiddenFileINput.value = null;
            hiddenFileINput.click();
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
        EventBusInstance.subscribe(events.LAYER_CREATE_TRIGGER, async (layerDataArray) => {
            const layerDefinition = await createLayerDefinition(layerDataArray, this.layers.length);
            this._addLayer(layerDefinition, true);
        });

        EventBusInstance.subscribe(events.LAYER_SETTINGS_UPDATE, (newLayerInfo) => {
            const layerDef = this.layers.find(l => l.layer_info.id === newLayerInfo.id);
            if (layerDef) {
                layerDef.layer_info = {
                    ...layerDef.layer_info,
                    ...newLayerInfo
                }
                this._refreshLayerMenuItems();
                this._updateStoreLegendData();
                EventBusInstance.publish(events.LAYER_REFRESH, layerDef);
            }
        });

        EventBusInstance.subscribe(events.LAYER_REMOVE, (layerId) => {
            const idx = this.layers.findIndex(l => l.layer_info.id === layerId);
            this.layers.splice(idx, 1);
            this._visibleLayers.delete(layerId);
            this._refreshLayerMenuItems();
            this._updateStoreLegendData();
            store.mapLayerIds = store.mapLayerIds.filter(id => id !== layerId);
            EventBusInstance.publish(events.FLYOUT_CLOSE);
        });

        EventBusInstance.subscribe(events.FLYOUT_CLOSE, () => {
            this._selectedLayerId = null;
            this._refreshLayerMenuItems();
        });

        EventBusInstance.subscribe(events.FLYOUT_OPEN_RESOURCE_SEARCH, () => {
            this._selectedLayerId = null;
            this._refreshLayerMenuItems();
        });
    }

    _addLayer(layerDefinition, onTop = false) {
        onTop ? this.layers.unshift(layerDefinition) : this.layers.push(layerDefinition);
        this._visibleLayers.add(layerDefinition.layer_info.id);
        this._refreshLayerMenuItems();
        this._updateStoreLegendData();
        store.mapLayerIds = [...store.mapLayerIds, layerDefinition.layer_info.id];
        EventBusInstance.publish(events.LAYER_ADD, layerDefinition);
    }

    _createLayerMenuItem(layerDefinition) {
        const layerId = layerDefinition.layer_info.id;
        const color = layerDefinition.layer_info.color;
        const layerName = layerDefinition.layer_info.name;
        const type = layerDefinition.source_info.type;

        const item = document.createElement('div');
        item.className = `layer-menu-item ${this._selectedLayerId === layerId ? 'selected-layer-menu-item' : ''}`;
        item.draggable = true;

        item.addEventListener('dragstart', (e) => {
            this._draggedLayerId = layerId;
            e.dataTransfer.effectAllowed = 'move';
            item.style.opacity = '0.5'; 
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            item.style.borderTop = '2px solid #333'; 
        });

        item.addEventListener('dragleave', () => {
            item.style.borderTop = '';
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            item.style.borderTop = '';
            
            if (this._draggedLayerId) {
                this._reorderLayersByDrag(this._draggedLayerId, layerId);
            }
        });

        item.addEventListener('dragend', () => {
            item.style.opacity = '1';
            this._draggedLayerId = null;
        });

        item.addEventListener('click', (e) => {
            if (this._draggedLayerId) return; 

            if (this._selectedLayerId === layerId) {
                item.classList.remove('selected-layer-menu-item');
                EventBusInstance.publish(events.FLYOUT_CLOSE);
                this._selectedLayerId = null;
            } else {
                this._selectedLayerId = layerId;
                EventBusInstance.publish(events.FLYOUT_OPEN_LAYER_SETTINGS, layerDefinition.layer_info);
                EventBusInstance.publish(events.LAYER_ZOOM_TO, layerDefinition);
                this._refreshLayerMenuItems();
            }
        });

        const layerInfoGroup = document.createElement('div');
        layerInfoGroup.className = 'layer-info-group';

        const visibilityCheckbox = document.createElement('input');
        visibilityCheckbox.type = 'checkbox';
        visibilityCheckbox.checked = this._visibleLayers.has(layerId);
        visibilityCheckbox.className = 'layer-visibility-checkbox';

        visibilityCheckbox.addEventListener('click', (e) => e.stopPropagation());

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
        colorIndicator.className = layerDefinition.layer_info.icon + ' layer-color-indicator';
        colorIndicator.style.color = type === constants.LAYER_TYPES.iiif ? 'white' : color;

        const nameLabel = document.createElement('span');
        nameLabel.className = 'layer-name';
        nameLabel.textContent = layerName;

        layerInfoGroup.appendChild(visibilityCheckbox);
        layerInfoGroup.appendChild(colorIndicator);
        layerInfoGroup.appendChild(nameLabel);

        item.appendChild(layerInfoGroup);

        const orderGroup = document.createElement('div');
        orderGroup.className = 'layer-order-group';

        const moveUpBtn = document.createElement('button');
        moveUpBtn.className = 'layer-move-btn layer-move-up-btn';
        moveUpBtn.innerHTML = '<i class="fa fa-chevron-up"></i>';
        moveUpBtn.title = 'Move Layer Up';
        moveUpBtn.disabled = this.layers[0].layer_info.id === layerId;

        moveUpBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this._moveLayerUp(layerId);
        });

        const moveDownBtn = document.createElement('button');
        moveDownBtn.className = 'layer-move-btn layer-move-down-btn';
        moveDownBtn.innerHTML = '<i class="fa fa-chevron-down"></i>';
        moveDownBtn.title = 'Move Layer Down';
        moveDownBtn.disabled = this.layers[this.layers.length - 1].layer_info.id === layerId;

        moveDownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this._moveLayerDown(layerId);
        });

        orderGroup.appendChild(moveUpBtn);
        orderGroup.appendChild(moveDownBtn);

        item.appendChild(orderGroup);

        this.layerList.appendChild(item);
    }

    _reorderLayersByDrag(draggedId, targetId) {
        const oldIndex = this.layers.findIndex(l => l.layer_info.id === draggedId);
        const newIndex = this.layers.findIndex(l => l.layer_info.id === targetId);

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

        const [movedLayer] = this.layers.splice(oldIndex, 1);
        
        this.layers.splice(newIndex, 0, movedLayer);

        this._refreshLayerMenuItems();
        this._updateStoreLegendData();
        EventBusInstance.publish(events.LAYERS_REORDER, this.layers.map(l => l.layer_info.id));
    }

    _moveLayerUp(layerId) {
        const idx = this.layers.findIndex(l => l.layer_info.id === layerId);
        if (idx > 0) {
            [this.layers[idx - 1], this.layers[idx]] = [this.layers[idx], this.layers[idx - 1]];
            this._refreshLayerMenuItems();
            this._updateStoreLegendData();
            EventBusInstance.publish(events.LAYERS_REORDER, this.layers.map(l => l.layer_info.id));
        }
    }

    _moveLayerDown(layerId) {
        const idx = this.layers.findIndex(l => l.layer_info.id === layerId);
        if (idx < this.layers.length - 1) {
            [this.layers[idx + 1], this.layers[idx]] = [this.layers[idx], this.layers[idx + 1]];
            this._refreshLayerMenuItems();
            this._updateStoreLegendData();
            EventBusInstance.publish(events.LAYERS_REORDER, this.layers.map(l => l.layer_info.id));
        }
    }

    _refreshLayerMenuItems() {
        this.layerList.replaceChildren();
        this.layers.forEach((layerDef) => {
            this._createLayerMenuItem(layerDef);
        });
        this._updateStoreLegendData();
    }

    _updateStoreLegendData() {
        store.legendData = this.layers
        .filter(l => this._visibleLayers.has(l.layer_info.id))
        .map(l => ({ name: l.layer_info.name, color: l.layer_info.color }));
    }
}