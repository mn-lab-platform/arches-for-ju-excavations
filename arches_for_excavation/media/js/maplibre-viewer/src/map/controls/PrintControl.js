import { MapControl } from "../../components/MapControl";
import { EventBusInstance } from "../../core/EventBus";
import { events } from "../../constants/events";

export class PrintControl {
    constructor() {
        this._map = null;

        this.state = {
            paperSize: 'A4',
            format: 'PDF',
            isHorizontal: false
        }

        const { button, panel } = new MapControl({
            iconClass: 'fa fa-file-photo-o',
            title: 'Export Map',
            hasPanel: true,
            controlInstance: this
        }).build();
        this._controlButton = button;
        this._controlPanel = panel;
    }

    onAdd(map) {
        this._map = map;

        const printOptionsContainer = document.createElement("div");
        printOptionsContainer.classList.add("print-tiles-container");

        const paperSizeTile = this._createTile(
            'fa fa-arrows',
            'Paper Size: ',
            'Select paper size for printing',
            'paperSize'
        );
        printOptionsContainer.appendChild(paperSizeTile);

        const formatTile = this._createTile(
            'fa fa-tag',
            'Format: ',
            'Select format for printing',
            'format'
        );
        printOptionsContainer.appendChild(formatTile);

        const nonExpandableGroup = document.createElement("div");
        nonExpandableGroup.classList.add("non-expandable-group");

        const orientationGroup = document.createElement("div");
        orientationGroup.classList.add("orientation-group");
        orientationGroup.title = "Toggle between portrait and landscape orientation";

        const orientationLabel = document.createElement("span");
        orientationLabel.textContent = `${this.state.isHorizontal ? "Landscape" : "Portrait"}`;
        
        const orientationBox = document.createElement("div");
        orientationBox.classList.add("print-orientation-box");
        orientationBox.style.transform = this.state.isHorizontal ? "rotate(0deg)" : "rotate(90deg)";
        orientationBox.style.transition = "transform 0.3s ease";

        orientationGroup.addEventListener("click", () => {
            this.state.isHorizontal = !this.state.isHorizontal;
            orientationBox.style.transform = this.state.isHorizontal ? "rotate(0deg)" : "rotate(90deg)";
            orientationLabel.textContent = `${this.state.isHorizontal ? "Landscape" : "Portrait"}`;
        });

        orientationGroup.appendChild(orientationLabel);
        orientationGroup.appendChild(orientationBox);

        const submitButton = document.createElement("button");
        submitButton.textContent = "Print";
        submitButton.classList.add("submit-button");
        submitButton.disabled = true;
        
        nonExpandableGroup.appendChild(orientationGroup);
        nonExpandableGroup.appendChild(submitButton);

        this._controlPanel.appendChild(printOptionsContainer);
        this._controlPanel.appendChild(nonExpandableGroup);

        return this._controlButton;
    }

    _createTile(icon, label, title, settingKey) {
        const tile = document.createElement("div");
        tile.classList.add("control-tile", "print-option-tile");
        tile.title = title;

        const leftSide = document.createElement("div");
        leftSide.classList.add("print-tile-left-side");

        const chevron = document.createElement("i");
        chevron.className = "fa fa-chevron-left print-expand-icon";

        const mainInfo = document.createElement("div");
        mainInfo.classList.add("print-tile-main-info");

        const iconElement = document.createElement("i");
        iconElement.className = icon;

        const labelElement = document.createElement("span");
        labelElement.classList.add("print-tile-label");
        labelElement.textContent = label;

        mainInfo.appendChild(iconElement);
        mainInfo.appendChild(labelElement);

        leftSide.appendChild(chevron);
        leftSide.appendChild(mainInfo);

        const valueElement = document.createElement("span");
        valueElement.classList.add("print-tile-value");
        valueElement.textContent = this.state[settingKey] || "";

        tile.appendChild(leftSide);
        tile.appendChild(valueElement);

        return tile;
    }

    onRemove() {
        this._controlButton.parentNode?.removeChild(this._controlButton);
        this._controlPanel.parentNode?.removeChild(this._controlPanel);
    }
}