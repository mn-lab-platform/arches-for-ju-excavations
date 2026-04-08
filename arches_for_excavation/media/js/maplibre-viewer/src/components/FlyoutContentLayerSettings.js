import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";

export class FlyoutContentLayerSettings {
    constructor(layerInfo) {
        const { layerId, layerName, accentColor } = layerInfo;
        this.layerId = layerId;
        this.layerName = layerName;
        this.accentColor = accentColor;

        this.altered = false;
    }

    build() {
        this.content = document.createElement('div');
        this.content.className = 'flyout-content';

        this.header = document.createElement('div');
        this.header.className = 'flyout-header';

        this.introSection = document.createElement('div');
        this.introSection.className = 'flyout-intro';

        this.title = document.createElement('h4');
        this.title.className = 'flyout-title';
        this.title.textContent = 'Map Layer Settings';

        this.subtitle = document.createElement('p');
        this.subtitle.className = 'flyout-subtitle';
        this.subtitle.textContent = 'Configure your map layer options';

        this.introSection.appendChild(this.title);
        this.introSection.appendChild(this.subtitle);

        this.applyButton = document.createElement('button');
        this.applyButton.className = 'flyout-submit-button';
        this.applyButton.textContent = 'Apply Changes';
        this.applyButton.title = 'Apply layer settings changes';
        this.applyButton.disabled = true;

        this.header.appendChild(this.introSection);
        this.header.appendChild(this.applyButton);

        this.content.appendChild(this.header);

        this.settingsContainer = document.createElement('div');
        this.settingsContainer.className = 'flyout-settings-container';

        this.nameContainer = document.createElement('div');
        this.nameContainer.className = 'flyout-setting-group';
        
        this.nameInputLabel = document.createElement('label');
        this.nameInputLabel.textContent = 'Layer Name:';
        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.className = 'flyout-text-input';
        this.nameInput.value = this.layerName;

        this.nameContainer.appendChild(this.nameInputLabel);
        this.nameContainer.appendChild(this.nameInput);

        this.colorContainer = document.createElement('div');
        this.colorContainer.className = 'flyout-setting-group';

        this.colorInputLabel = document.createElement('label');
        this.colorInputLabel.textContent = 'Layer Color:';
        this.colorInput = document.createElement('input');
        this.colorInput.type = 'color';
        this.colorInput.className = 'flyout-layer-color-input';
        this.colorInput.value = this.accentColor;

        this.colorContainer.appendChild(this.colorInputLabel);
        this.colorContainer.appendChild(this.colorInput);

        this.opacityContainer = document.createElement('div');
        this.opacityContainer.className = 'flyout-setting-group';

        this.opacityInputLabel = document.createElement('label');
        this.opacityInputLabel.textContent = 'Layer Opacity:';
        this.opacityInput = document.createElement('input');
        this.opacityInput.type = 'range';
        this.opacityInput.min = 0;
        this.opacityInput.max = 1;
        this.opacityInput.step = 0.1;
        this.opacityInput.className = 'flyout-layer-opacity-input';
        this.opacityInput.value = 0.5;

        this.opacityContainer.appendChild(this.opacityInputLabel);
        this.opacityContainer.appendChild(this.opacityInput);

        this.settingsContainer.appendChild(this.nameContainer);
        this.settingsContainer.appendChild(this.colorContainer);
        this.settingsContainer.appendChild(this.opacityContainer);

        this.content.appendChild(this.settingsContainer);

        this.nameInput.addEventListener('input', this._updateApplyButtonState);
        this.colorInput.addEventListener('input', this._updateApplyButtonState);

        return this.content;
    }

    _updateApplyButtonState = () => {
    const nameChanged = this.nameInput.value !== this.layerName;
    const colorChanged = this.colorInput.value !== this.accentColor;

    this.altered = nameChanged || colorChanged;
    this.applyButton.disabled = !this.altered;
};
}