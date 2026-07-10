import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";

export class FlyoutContentLayerSettings {
    constructor(layerInfo) {
        const { layerId, layerName, accentColor, vectorOpacity, rasterOpacity } = layerInfo;
        this.layerId = layerId;
        this.layerName = layerName;
        this.accentColor = accentColor;
        this.vectorOpacity = vectorOpacity ?? 0.5;
        this.rasterOpacity = rasterOpacity ?? 1;

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

        this.actionGroup = document.createElement('div');
        this.actionGroup.className = 'layer-settings-action-group';

        this.deleteButton = document.createElement('button');
        this.deleteButton.className = 'submit-button submit-button--danger'; 
        this.deleteButton.textContent = 'Delete';
        this.deleteButton.title = 'Delete this map layer';

        this.deleteButton.addEventListener('click', () => {
            const confirmed = window.confirm(`Are you sure you want to delete the layer "${this.layerName}"?`);
            if (confirmed) {
                EventBusInstance.publish(events.LAYER_REMOVE, this.layerId);
            }
        });

        this.applyButton = document.createElement('button');
        this.applyButton.className = 'submit-button';
        this.applyButton.textContent = 'Apply Changes';
        this.applyButton.title = 'Apply layer settings changes';
        this.applyButton.disabled = true;

        this.applyButton.addEventListener('click', () => {
            EventBusInstance.publish(events.LAYER_SETTINGS_UPDATE, {
                layerId: this.layerId,
                newName: this.nameInput.value,
                newColor: this.colorInput.value,
                newVectorOpacity: parseFloat(this.vectorOpacityInput.value),
                newRasterOpacity: parseFloat(this.rasterOpacityInput.value)
            });
            this.applyButton.disabled = true;
            this.layerName = this.nameInput.value;
            this.accentColor = this.colorInput.value;
            this.vectorOpacity = parseFloat(this.vectorOpacityInput.value);
            this.rasterOpacity = parseFloat(this.rasterOpacityInput.value);
        });

        this.actionGroup.appendChild(this.deleteButton);
        this.actionGroup.appendChild(this.applyButton);

        this.header.appendChild(this.introSection);
        this.header.appendChild(this.actionGroup);

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
        this.colorInputLabel.textContent = 'Vector Features Color:';
        this.colorInput = document.createElement('input');
        this.colorInput.type = 'color';
        this.colorInput.className = 'flyout-layer-color-input';
        this.colorInput.value = this.accentColor;

        this.colorContainer.appendChild(this.colorInputLabel);
        this.colorContainer.appendChild(this.colorInput);


        const vectorSliderParams = this._createOpacitySlider('Vector Features Opacity:', this.vectorOpacity);
        this.vectorOpacityInput = vectorSliderParams.input;
        this.vectorOpacityContainer = vectorSliderParams.container;

        const rasterSliderParams = this._createOpacitySlider('Raster Features Opacity:', this.rasterOpacity);
        this.rasterOpacityInput = rasterSliderParams.input;
        this.rasterOpacityContainer = rasterSliderParams.container;


        this.settingsContainer.appendChild(this.nameContainer);
        this.settingsContainer.appendChild(this.colorContainer);
        this.settingsContainer.appendChild(this.vectorOpacityContainer);
        this.settingsContainer.appendChild(this.rasterOpacityContainer);

        this.content.appendChild(this.settingsContainer);

        this.nameInput.addEventListener('input', this._updateApplyButtonState);
        this.colorInput.addEventListener('input', this._updateApplyButtonState);
        this.vectorOpacityInput.addEventListener('input', this._updateApplyButtonState);
        this.rasterOpacityInput.addEventListener('input', this._updateApplyButtonState);

        return this.content;
    }

    _createOpacitySlider(labelText, initialValue) {
        const container = document.createElement('div');
        container.className = 'flyout-setting-group';

        const label = document.createElement('label');
        label.textContent = labelText;

        const sliderGroup = document.createElement('div');
        sliderGroup.className = 'flyout-opacity-slider-group';
        
        const input = document.createElement('input');
        input.type = 'range';
        input.min = 0.1;
        input.max = 1;
        input.step = 0.1;
        input.className = 'flyout-layer-opacity-input';
        input.value = initialValue;

        const valueSpan = document.createElement('span');
        valueSpan.textContent = input.value;
        valueSpan.className = 'flyout-opacity-value';

        input.addEventListener('input', () => {
            valueSpan.textContent = input.value;
        });

        container.appendChild(label);
        container.appendChild(sliderGroup);
        sliderGroup.appendChild(input);
        sliderGroup.appendChild(valueSpan);

        return { container, input };
    }

    _updateApplyButtonState = () => {
        const nameChanged = this.nameInput.value !== this.layerName;
        const colorChanged = this.colorInput.value !== this.accentColor;
        const vectorOpacityChanged = parseFloat(this.vectorOpacityInput.value) !== this.vectorOpacity;
        const rasterOpacityChanged = parseFloat(this.rasterOpacityInput.value) !== this.rasterOpacity;

        this.altered = nameChanged || colorChanged || vectorOpacityChanged || rasterOpacityChanged;
        this.applyButton.disabled = !this.altered;
    };
}