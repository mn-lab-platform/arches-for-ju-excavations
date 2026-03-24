import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";

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
        EventBusInstance.subscribe(events.CREATE_LAYER, (layerDataArray) => {
            console.log("received layer data: ", layerDataArray);
            this._createLayerMenuItem(layerDataArray);
        });
    }

    _createLayerMenuItem(layerDataArray) {
        const item = document.createElement('div');
        item.className = 'layer-menu-item';
        item.draggable = true;

        const visibilityCheckbox = document.createElement('input');
        visibilityCheckbox.type = 'checkbox';
        visibilityCheckbox.checked = true;
        visibilityCheckbox.className = 'layer-visibility-checkbox';

        const colorIndicator = document.createElement('i');
        colorIndicator.className = 'fa fa-heart layer-color-indicator';
        colorIndicator.style.color = this._generateRandomColor();

        const nameLabel = document.createElement('span');
        nameLabel.className = 'layer-name';
        nameLabel.textContent = `New Layer ${this.layers.length > 0 ? this.layers.length : ''}`;

        item.appendChild(visibilityCheckbox);
        item.appendChild(colorIndicator);
        item.appendChild(nameLabel);

        this.layerList.appendChild(item);
        this.layers.push(layerDataArray);
    }

    _generateRandomColor() {
        return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`;
    }
}