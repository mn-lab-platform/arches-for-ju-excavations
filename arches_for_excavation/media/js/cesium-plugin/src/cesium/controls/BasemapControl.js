import { Control } from './Control.js';

import { EventBusInstance } from '../../core/EventBus.js';
import { events } from '../../constants/events.js';
import store from '../../core/store.js';

export class BasemapControl extends Control {
    constructor(iconClass, title, hasPanel, basemapsData) {
        super(iconClass, title, hasPanel);
        this._basemapsData = basemapsData;
    }

    buildPanelContent(panel) {
        this._basemapsData.forEach((basemapData) => {
            const layerInfo = basemapData.layer_info;
            const sourceInfo = basemapData.source_info;

            const basemapOption = document.createElement('div');
            basemapOption.classList.add('control-tile');

            if (store.basemapLayerId === layerInfo.id) {
                basemapOption.classList.add('active');
            }

            const iconElement = document.createElement('i');
            iconElement.className = layerInfo.icon;
            basemapOption.appendChild(iconElement);

            const labelElement = document.createElement('span');
            labelElement.classList.add('maplayer-label');
            labelElement.textContent = layerInfo.name;
            basemapOption.appendChild(labelElement);

            basemapOption.addEventListener('click', () => {
                this._switchBasemap(layerInfo.id, basemapOption);
            });

            panel.appendChild(basemapOption);
        });
    }

    _switchBasemap(basemapId, activeOptionElement) {
        store.basemapLayerId = basemapId;

        EventBusInstance.publish(events.BASEMAP_SHOW, basemapId);

        const options = this._panel.querySelectorAll('.control-tile');
        options.forEach(option => {
            option.classList.remove('active');
        });

        activeOptionElement.classList.add('active');
    }

    activate() {
        super.activate();
    }

    deactivate() {
        super.deactivate();
    }
}