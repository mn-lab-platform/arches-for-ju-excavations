import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";
import constants from "../constants/constants";

export class FlyoutContentLayerSettings {
    constructor(layerInfo) {
        this.layerInfo = { ...layerInfo };
        const startingIndex = constants.HATCH_FILL_SOURCE_PATHS.indexOf(this.layerInfo.hatchFill);
        this.hatchFillIndex = startingIndex !== -1 ? startingIndex : 0;
        
        this.trackedKeys = [
            'name', 'opacity', 'color', 'hatchFill', 'hatchFillOpacity', 'lineColor', 
            'lineOpacity', 'lineStyle', 'lineWidth', 'pointColor', 'pointRadius', 
            'pointOpacity', 'pointBorderColor', 'pointBorderWidth', 'labelProperty',
            'customLabel', 'labelColor', 'labelSize', 'labelHaloColor', 'labelHaloWidth'
        ];

        this.inputState = {};
        this.trackedKeys.forEach(key => {
            this.inputState[key] = this.layerInfo[key];
        });
    }

    build() {
        this.content = document.createElement('div');
        this.content.className = 'flyout-content';

        this.content.appendChild(this._buildHeader());
        this.content.appendChild(this._buildGeneralSettingsGroup());

        if (this.layerInfo.isGeojson) {
            this._buildGeojsonGroups();
        }

        return this.content;
    }

    _buildGeojsonGroups() {
        if (this.layerInfo.hasPolygon) this.content.appendChild(this._buildFillGroup());
        if (this.layerInfo.hasPolygon || this.layerInfo.hasLine) this.content.appendChild(this._buildBorderGroup(this.layerInfo.hasLine));
        if (this.layerInfo.hasPoint) this.content.appendChild(this._buildPointGroup());
        if (this.layerInfo.availableLabelProperties.length > 0) {
            this.content.appendChild(this._buildLabelingGroup());
        }
    }

    _createSettingsGroup(groupTitle) {
        const group = document.createElement('div');
        group.className = 'flyout-setting-group';

        const title = document.createElement('h5');
        title.className = 'flyout-setting-group-title';
        title.textContent = groupTitle;

        const content = document.createElement('div');
        content.className = 'flyout-setting-group-content';

        group.appendChild(title);
        group.appendChild(content);

        return { group, content };
    }

    _createRow(labelText, controlEl, isHorizontal = true, isRowSpan2 = false) {
        const container = document.createElement('div');
        let className = isHorizontal ? 'flyout-setting-horizontal' : 'flyout-setting';
        if (isRowSpan2) className += ' col-span-2';
        container.className = className;
        
        const label = document.createElement('label');
        label.textContent = labelText;
        
        container.appendChild(label);
        container.appendChild(controlEl);
        return container;
    }

    _createInput(type, stateKey, className, extraAttrs = {}) {
        const isSelect = type === 'select';
        const input = document.createElement(isSelect ? 'select' : 'input');
        
        if (!isSelect) input.type = type;
        input.className = className;
        input.value = this.inputState[stateKey] || (type === 'number' ? 0 : '');

        if (extraAttrs.min !== undefined) input.min = extraAttrs.min;
        if (extraAttrs.id) input.id = extraAttrs.id;

        if (isSelect && extraAttrs.options) {
            extraAttrs.options.forEach(opt => {
                const optionEl = document.createElement('option');
                optionEl.value = opt.value;
                optionEl.textContent = opt.label;
                input.appendChild(optionEl);
            });
        }

        input.addEventListener(isSelect ? 'change' : 'input', (e) => {
            let val = e.target.value;
            if (type === 'number') val = parseInt(val, 10) || 0;
            this.inputState[stateKey] = val;
            this._updateApplyButtonState();
            if (extraAttrs.additionalCallback) extraAttrs.additionalCallback(val);
        });

        return input;
    }

    _createOpacitySlider(labelText, stateKey, allowZero = false, isRowSpan2 = false) {
        const sliderGroup = document.createElement('div');
        sliderGroup.className = 'flyout-opacity-slider-group';
        
        const input = document.createElement('input');
        input.type = 'range';
        input.min = allowZero ? 0 : 0.1;
        input.max = 1;
        input.step = 0.1;
        input.className = 'flyout-layer-opacity-input';
        input.value = this.inputState[stateKey];

        const valueSpan = document.createElement('span');
        valueSpan.textContent = input.value;
        valueSpan.className = 'flyout-opacity-value';

        input.addEventListener('input', (e) => {
            valueSpan.textContent = e.target.value;
            this.inputState[stateKey] = parseFloat(e.target.value);
            this._updateApplyButtonState();
        });

        sliderGroup.appendChild(input);
        sliderGroup.appendChild(valueSpan);

        return this._createRow(labelText, sliderGroup, false, isRowSpan2);
    }

    _buildGeneralSettingsGroup() {
        const { group, content } = this._createSettingsGroup('General Settings');
        
        const nameInput = this._createInput('text', 'name', 'flyout-text-input', { id: 'flyout-layer-name-input' });
        const nameRow = this._createRow('Layer Name:', nameInput, false);
        nameRow.querySelector('label').setAttribute('for', 'flyout-layer-name-input');

        content.appendChild(nameRow);
        if (!this.layerInfo.isGeojson || this.layerInfo.hasPolygon) {
            content.appendChild(this._createOpacitySlider('Opacity:', 'opacity'));
        }

        return group;
    }

    _buildLabelingGroup() {
        const { group, content } = this._createSettingsGroup('Labeling Settings');

        const propertyOptions = [ { value: '', label: '--------------' } ]
            .concat(this.layerInfo.availableLabelProperties.map(prop => ({ value: prop, label: prop })));

        const propertySelect = this._createInput('select', 'labelProperty', 'flyout-select', { options: propertyOptions });
        content.appendChild(this._createRow('Label Property:', propertySelect, true, true)); 

        const useNameBtn = document.createElement('button');

        const customInputCallback = (value) => {
            const trimmedValue = value.trim();
            const hasText = trimmedValue !== '';
            const matchesLayerName = trimmedValue === this.layerInfo.name;

            propertySelect.disabled = hasText;
            if (hasText) {
                propertySelect.selectedIndex = 0;
                propertySelect.value = '';
            }

            useNameBtn.classList.toggle('use-name-button--active', matchesLayerName);
        };

        const customInput = this._createInput('text', 'customLabel', 'flyout-text-input', { id: 'flyout-custom-label-input', additionalCallback: customInputCallback });

        useNameBtn.className = 'control-panel-btn use-name-button';
        useNameBtn.title = 'Use Layer Name';
        useNameBtn.innerHTML = '<i class="fa fa-tag"></i>';

        useNameBtn.addEventListener('click', (e) => {
            customInput.value = customInput.value === this.layerInfo.name ? '' : this.layerInfo.name;
            customInput.dispatchEvent(new Event('input'));
        });

        const inputWrapper = document.createElement('div');
        inputWrapper.style.display = 'flex';

        inputWrapper.appendChild(customInput);
        inputWrapper.appendChild(useNameBtn);

        const customLabelRow = this._createRow('Custom Label:', inputWrapper, true, true);
        customLabelRow.querySelector('label').setAttribute('for', 'flyout-custom-label-input');
        content.appendChild(customLabelRow);

        content.appendChild(this._createRow('Label Color:', this._createInput('color', 'labelColor', 'flyout-layer-color-input')));
        content.appendChild(this._createRow('Label Size:', this._createInput('number', 'labelSize', 'flyout-number-input', { min: 1 })));
        
        content.appendChild(this._createRow('Halo Color:', this._createInput('color', 'labelHaloColor', 'flyout-layer-color-input')));
        content.appendChild(this._createRow('Halo Width:', this._createInput('number', 'labelHaloWidth', 'flyout-number-input', { min: 0 })));

        return group;
    }

    _buildPointGroup() {
        const { group, content } = this._createSettingsGroup('Point Settings');

        content.appendChild(this._createRow('Point Color:', this._createInput('color', 'pointColor', 'flyout-layer-color-input')));
        content.appendChild(this._createRow('Point Radius:', this._createInput('number', 'pointRadius', 'flyout-number-input', { min: 0 })));
        content.appendChild(this._createRow('Point Border Width:', this._createInput('number', 'pointBorderWidth', 'flyout-number-input', { min: 0 })));
        content.appendChild(this._createRow('Point Border Color:', this._createInput('color', 'pointBorderColor', 'flyout-layer-color-input')));
        content.appendChild(this._createOpacitySlider('Point Opacity:', 'pointOpacity'));

        return group;
    }

    _buildBorderGroup(isLine = false) {
        const prefix = isLine ? 'Line' : 'Border';
        const { group, content } = this._createSettingsGroup(`${prefix} Settings`);

        const lineStyleOptions = [
            { value: constants.LINE_STYLES.solid, label: 'Solid' },
            { value: constants.LINE_STYLES.dashed, label: 'Dashed' },
            { value: constants.LINE_STYLES.dotted, label: 'Dotted' }
        ];
        
        const styleSelect = this._createInput('select', 'lineStyle', 'flyout-select', { options: lineStyleOptions });
        styleSelect.style.alignSelf = 'center';

        content.appendChild(this._createRow(`${prefix} Color:`, this._createInput('color', 'lineColor', 'flyout-layer-color-input')));
        content.appendChild(this._createRow(`${prefix} Width:`, this._createInput('number', 'lineWidth', 'flyout-number-input', { min: 0 })));
        content.appendChild(this._createRow(`${prefix} Style:`, styleSelect));
        content.appendChild(this._createOpacitySlider(`${prefix} Opacity:`, 'lineOpacity', !isLine));

        return group;
    }

    _buildFillGroup() {
        const { group, content } = this._createSettingsGroup('Fill Settings');

        content.appendChild(this._createRow('Features Color:', this._createInput('color', 'color', 'flyout-layer-color-input')));

        const hatchFillButton = document.createElement('button');
        hatchFillButton.className = 'flyout-hatch-fill-button';
        const hatchFillImg = document.createElement('img');
        hatchFillImg.className = 'flyout-hatch-fill-image';
        hatchFillImg.src = this.inputState.hatchFill;

        hatchFillButton.addEventListener('click', () => {
            this.hatchFillIndex = (this.hatchFillIndex + 1) % constants.HATCH_FILL_SOURCE_PATHS.length;
            this.inputState.hatchFill = constants.HATCH_FILL_SOURCE_PATHS[this.hatchFillIndex];
            hatchFillImg.src = this.inputState.hatchFill;
            this._updateApplyButtonState();
        });

        hatchFillButton.appendChild(hatchFillImg);
        content.appendChild(this._createRow('Hatch Fill:', hatchFillButton));
        content.appendChild(this._createOpacitySlider('Hatch Fill Opacity:', 'hatchFillOpacity', true, true));

        return group;
    }

    _buildHeader() {
        const header = document.createElement('div');
        header.className = 'flyout-header';

        const introSection = document.createElement('div');
        introSection.className = 'flyout-intro';
        introSection.innerHTML = `
            <h4 class="flyout-title">Map Layer Settings</h4>
            <p class="flyout-subtitle">Configure your map layer options</p>
        `;

        const actionGroup = document.createElement('div');
        actionGroup.className = 'layer-settings-action-group';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'submit-button submit-button--danger'; 
        deleteButton.textContent = 'Delete';
        deleteButton.title = 'Delete this map layer';
        deleteButton.addEventListener('click', () => {
            if (window.confirm(`Are you sure you want to delete the layer "${this.layerInfo.name}"?`)) {
                EventBusInstance.publish(events.LAYER_REMOVE, this.layerInfo.id);
            }
        });

        this.applyButton = document.createElement('button');
        this.applyButton.className = 'submit-button';
        this.applyButton.textContent = 'Apply Changes';
        this.applyButton.title = 'Apply layer settings changes';
        this.applyButton.disabled = true;

        this.applyButton.addEventListener('click', () => {
            this.layerInfo = { ...this.layerInfo, ...this.inputState };
            
            if (this.layerInfo.type === constants.LAYER_TYPES.iiif) {
                this.layerInfo.color = this.layerInfo.color; 
            }
            
            EventBusInstance.publish(events.LAYER_SETTINGS_UPDATE, this.layerInfo);
            this.applyButton.disabled = true;
        });

        actionGroup.appendChild(deleteButton);
        actionGroup.appendChild(this.applyButton);

        header.appendChild(introSection);
        header.appendChild(actionGroup);

        return header;
    }

    _updateApplyButtonState = () => {
        const altered = this.trackedKeys.some(key => {
            if (key === 'color' && this.layerInfo.type === constants.LAYER_TYPES.iiif) return false;
            return this.inputState[key] !== this.layerInfo[key];
        });
        
        this.applyButton.disabled = !altered;
    };
}