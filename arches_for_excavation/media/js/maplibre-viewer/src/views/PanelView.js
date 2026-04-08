import { LayerMenuView } from './LayerMenuView.js';
import { FlyoutView } from './FlyoutView.js';
import { FlyoutContentResourceSearch } from '../components/FlyoutContentResourceSearch.js';

import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";
import { FlyoutContentLayerSettings } from '../components/FlyoutContentLayerSettings.js';

export class PanelView {
    constructor(parentContainerId) {
        const parentContainer = document.getElementById(parentContainerId);

        this.container = document.createElement('div');
        this.container.className = 'menu-panel';
        
        parentContainer.appendChild(this.container);

        this.addLayerBtn = this._createAddLayerButton();
        this.container.appendChild(this.addLayerBtn);

        this.layerMenu = new LayerMenuView(this.container);
        this.flyout = new FlyoutView(this.container);

        this.activeFlyoutMode = null;

        EventBusInstance.subscribe(events.FLYOUT_CLOSED, () => {
            this.activeFlyoutMode = null;
            this.addLayerBtn.textContent = 'Add Layer';
            this.flyout.close();
        });

        EventBusInstance.subscribe(events.FLYOUT_OPEN_RESOURCE_SEARCH, () => {
            this.activeFlyoutMode = 'search';
            this.addLayerBtn.textContent = 'Close Flyout';
            this.flyout.setContent(new FlyoutContentResourceSearch(this.flyout.container).build());
            this.flyout.open(); 
        });

        EventBusInstance.subscribe(events.FLYOUT_OPEN_LAYER_SETTINGS, (layer) => {
            this.activeFlyoutMode = 'settings';
            this.addLayerBtn.textContent = 'Add Layer';
            this.flyout.setContent(new FlyoutContentLayerSettings(this.flyout.container, layer).build());
            this.flyout.open();
        });
    }

    // _createToggleButton() {
    //     const btn = document.createElement('button');
    //     btn.className = 'panel__toggle';
    //     btn.type = 'button';
    //     btn.setAttribute('aria-label', 'Toggle layer panel');
    //     btn.textContent = '<';

    //     btn.addEventListener('click', () => {
    //         this.isCollapsed = !this.isCollapsed;
    //         this.container.classList.toggle('panel--collapsed', this.isCollapsed);
    //         btn.textContent = this.isCollapsed ? '>' : '<';
    //     });

    //     return btn;
    // }

    _createAddLayerButton() {
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
                EventBusInstance.publish(events.FLYOUT_CLOSED);
                return;
            }

            EventBusInstance.publish(events.FLYOUT_OPEN_RESOURCE_SEARCH);
        });

        return btn;
    }
}