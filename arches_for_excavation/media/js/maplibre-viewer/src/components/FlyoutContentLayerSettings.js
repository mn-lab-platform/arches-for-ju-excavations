import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";

export class FlyoutContentLayerSettings {
    constructor(layerInfo) {
        const { layerId, layerName, accentColor, opacity } = layerInfo;
        this.layerId = layerId;
        this.layerName = layerName;
        this.accentColor = accentColor;
        this.opacity = opacity ?? 0.5;

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

        this.applyButton.addEventListener('click', () => {
            console.log('Applying layer settings changes for layerId:', this.layerId);
            console.log('New settings - Name:', this.nameInput.value, 'Color:', this.colorInput.value, 'Opacity:', this.opacityInput.value);
            EventBusInstance.publish(events.LAYER_SETTINGS_UPDATE, {
                layerId: this.layerId,
                newName: this.nameInput.value,
                newColor: this.colorInput.value,
                newOpacity: parseFloat(this.opacityInput.value)
            });
            this.applyButton.disabled = true;
            this.layerName = this.nameInput.value;
            this.accentColor = this.colorInput.value;
            this.opacity = parseFloat(this.opacityInput.value);
        })

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

        this.opacitySliderGroup = document.createElement('div');
        this.opacitySliderGroup.className = 'flyout-opacity-slider-group';
        
        this.opacityInput = document.createElement('input');
        this.opacityInput.type = 'range';
        this.opacityInput.min = 0;
        this.opacityInput.max = 1;
        this.opacityInput.step = 0.1;
        this.opacityInput.className = 'flyout-layer-opacity-input';
        this.opacityInput.value = this.opacity;

        this.opacitySpan = document.createElement('span');
        this.opacitySpan.textContent = this.opacityInput.value;
        this.opacitySpan.className = 'flyout-opacity-value';

        this.opacityInput.addEventListener('input', () => {
            this.opacitySpan.textContent = this.opacityInput.value;
        });

        this.opacityContainer.appendChild(this.opacityInputLabel);
        this.opacityContainer.appendChild(this.opacitySliderGroup);
        this.opacitySliderGroup.appendChild(this.opacityInput);
        this.opacitySliderGroup.appendChild(this.opacitySpan);

        this.settingsContainer.appendChild(this.nameContainer);
        this.settingsContainer.appendChild(this.colorContainer);
        this.settingsContainer.appendChild(this.opacityContainer);

        this.content.appendChild(this.settingsContainer);

        this.nameInput.addEventListener('input', this._updateApplyButtonState);
        this.colorInput.addEventListener('input', this._updateApplyButtonState);
        this.opacityInput.addEventListener('input', this._updateApplyButtonState);

        return this.content;
    }

    _updateApplyButtonState = () => {
    const nameChanged = this.nameInput.value !== this.layerName;
    const colorChanged = this.colorInput.value !== this.accentColor;
    const opacityChanged = parseFloat(this.opacityInput.value) !== this.opacity;

    this.altered = nameChanged || colorChanged || opacityChanged;
    this.applyButton.disabled = !this.altered;
};
}