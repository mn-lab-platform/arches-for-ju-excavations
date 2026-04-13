import { LayerMenuView } from './LayerMenuView.js';
import { FlyoutView } from './FlyoutView.js';
import { FlyoutContentResourceSearch } from '../components/FlyoutContentResourceSearch.js';

import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";
import store from '../core/store.js';
import { FlyoutContentLayerSettings } from '../components/FlyoutContentLayerSettings.js';

export class PanelView {
    constructor(parentContainerId) {
        const parentContainer = document.getElementById(parentContainerId);

        this.container = document.createElement('div');
        this.container.className = 'menu-panel';
        
        parentContainer.appendChild(this.container);

        this.addLayerBtn = this._initializeAddLayerButton();
        this.container.appendChild(this.addLayerBtn);

        this.layerMenu = new LayerMenuView(this.container);
        this.flyout = new FlyoutView(this.container);
        store.menuPanelWidth = this.container.offsetWidth;

        this.activeFlyoutMode = null;

        this._setupEventListeners();
    }

    _setupEventListeners() {
        EventBusInstance.subscribe(events.FLYOUT_CLOSE, () => {
            this.activeFlyoutMode = null;
            this.addLayerBtn.textContent = 'Add Layer';
            this.flyout.close();
            EventBusInstance.publish(events.PREVIEW_REMOVE_ALL);
            store.mapOffsetX = 0;
        });

        EventBusInstance.subscribe(events.FLYOUT_OPEN_RESOURCE_SEARCH, () => {
            this.activeFlyoutMode = 'search';
            this.addLayerBtn.textContent = 'Close Flyout';
            this.flyout.setContent(new FlyoutContentResourceSearch().build());
            this.flyout.open(); 
            store.mapOffsetX = this.flyout.getWidth();
        });

        EventBusInstance.subscribe(events.FLYOUT_OPEN_LAYER_SETTINGS, (layerInfo) => {
            this.activeFlyoutMode = 'settings';
            this.addLayerBtn.textContent = 'Add Layer';
            this.flyout.setContent(new FlyoutContentLayerSettings(layerInfo).build());
            this.flyout.open();
            store.mapOffsetX = this.flyout.getWidth();
        });
    }

    _initializeAddLayerButton() {
        const btn = document.createElement('button');
        btn.className = 'add-layer-button';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Add new layer');
        btn.textContent = 'Add Layer';

        btn.addEventListener('click', () => {
            const isOpen = this.flyout.is_open();

            if (!isOpen) {
                EventBusInstance.publish(events.FLYOUT_OPEN_RESOURCE_SEARCH);
                return;
            }

            if (this.activeFlyoutMode === 'search') {
                EventBusInstance.publish(events.FLYOUT_CLOSE);
                this.activeFlyoutMode = null;
                return;
            }

            EventBusInstance.publish(events.FLYOUT_OPEN_RESOURCE_SEARCH);
        });

        return btn;
    }
}