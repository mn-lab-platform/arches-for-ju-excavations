import { MapControl } from "../../components/MapControl";
import { EventBusInstance } from "../../core/EventBus";
import { events } from "../../constants/events";
import store from "../../core/store";

export class PrintControl {
    constructor(mapRootContainer) {
        this._map = null;
        this.mapRootContainer = mapRootContainer;

        this.paperSizeDict = {
            A5: [148, 210],
            A4: [210, 297],
            A3: [297, 420],
            A2: [420, 594],
        };

        this.formatDict = {
            PDF: "PDF",
            PNG: "PNG",
        }

        this.stateKeys = {
            paperSize: "paperSize",
            format: "format",
            isHorizontal: "isHorizontal",
        };

        this.state = {
            [this.stateKeys.paperSize]: "A4",
            [this.stateKeys.format]: "PDF",
            [this.stateKeys.isHorizontal]: false,
        };

        const { button, panel } = new MapControl({
            iconClass: "fa fa-file-photo-o",
            title: "Export Map",
            hasPanel: true,
            controlInstance: this,
        }).build();

        this._controlButton = button;
        this._controlPanel = panel;

        this._previewOverlay = null;
        this._previewPaper = null;
        this._resizeHandler = () => this._renderPrintPreview();

        EventBusInstance.subscribe(events.CONTROL_ACTIVATE, (activeControl) => {
            if (activeControl === this) {
                this._mountPrintPreview();
                this._renderPrintPreview();
                window.addEventListener("resize", this._resizeHandler);
            } else {
                this._unmountPrintPreview();
                window.removeEventListener("resize", this._resizeHandler);
            }
        });

        EventBusInstance.subscribe(events.CONTROL_DEACTIVATE, (deactiveControl) => {
            if (deactiveControl === this) {
                this._unmountPrintPreview();
                window.removeEventListener("resize", this._resizeHandler);
            }
        });

    }

    _mountPrintPreview() {
        if (!this.mapRootContainer || this._previewOverlay) return;

        const overlay = document.createElement("div");
        overlay.className = "print-preview-overlay";

        const paper = document.createElement("div");
        paper.className = "print-preview-paper";

        overlay.appendChild(paper);
        this.mapRootContainer.appendChild(overlay);

        this._previewOverlay = overlay;
        this._previewPaper = paper;
    }

    _unmountPrintPreview() {
        if (this._previewOverlay?.parentNode) {
            this._previewOverlay.parentNode.removeChild(this._previewOverlay);
        }
        this._previewOverlay = null;
        this._previewPaper = null;
    }

    _renderPrintPreview() {
        if (!this._previewPaper || !this.mapRootContainer) return;

        const [paperWmm, paperHmm] = this.paperSizeDict[this.state.paperSize] ?? this.paperSizeDict.A4;
        const isHorizontal = !!this.state.isHorizontal;

        const paperW = isHorizontal ? paperHmm : paperWmm;
        const paperH = isHorizontal ? paperWmm : paperHmm;
        const ratio = paperW / paperH;

        const rootRect = this.mapRootContainer.getBoundingClientRect();
        const leftOffset = Math.max(0, store.menuPanelWidth || 0);

        const availW = Math.max(0, rootRect.width - leftOffset);
        const availH = rootRect.height;

        const maxW = availW * 0.9;
        const maxH = availH * 0.9;

        let rectW = maxW;
        let rectH = rectW / ratio;

        if (rectH > maxH) {
            rectH = maxH;
            rectW = rectH * ratio;
        }

        const left = leftOffset + (availW - rectW) / 2;
        const top = (availH - rectH) / 2;

        Object.assign(this._previewPaper.style, {
            width: `${rectW}px`,
            height: `${rectH}px`,
            left: `${left}px`,
            top: `${top}px`,
        });
    }

    onAdd(map) {
        this._map = map;

        const printOptionsContainer = document.createElement("div");
        printOptionsContainer.classList.add("print-tiles-container");

        const paperSizeTile = this._createTile(
            "fa fa-arrows",
            "Paper Size: ",
            "Select paper size for printing",
            this.stateKeys.paperSize
        );
        printOptionsContainer.appendChild(paperSizeTile);

        const formatTile = this._createTile(
            "fa fa-tag",
            "Format: ",
            "Select format for printing",
            this.stateKeys.format
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
        orientationBox.style.transition = "transform 0.3s ease";

        orientationGroup.addEventListener("click", () => {
            this.state.isHorizontal = !this.state.isHorizontal;
            orientationBox.style.transform = this.state.isHorizontal ? "rotate(90deg)" : "rotate(0deg)";
            orientationLabel.textContent = `${this.state.isHorizontal ? "Landscape" : "Portrait"}`;
            this._renderPrintPreview();
        });

        orientationGroup.appendChild(orientationLabel);
        orientationGroup.appendChild(orientationBox);

        const submitButton = document.createElement("button");
        submitButton.textContent = "Print";
        submitButton.classList.add("submit-button");
        
        nonExpandableGroup.appendChild(orientationGroup);
        nonExpandableGroup.appendChild(submitButton);

        this.flyout = document.createElement("div");
        this.flyout.classList.add("print-options-flyout");

        this._controlPanel.appendChild(printOptionsContainer);
        this._controlPanel.appendChild(nonExpandableGroup);
        this._controlPanel.appendChild(this.flyout);


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

        tile.addEventListener("click", () => {
            this._closeTileFlyout();
            this._populateFlyout(settingKey, valueElement);
            this._openTileFlyout();
        });

        return tile;
    }

    _populateFlyout(settingKey, valueElement) {
        let options = [];
        switch (settingKey) {
            case this.stateKeys.paperSize:
                options = Object.keys(this.paperSizeDict);
                break;
            case this.stateKeys.format:
                options = Object.keys(this.formatDict);
                break;
            default:
                break;
        }

        options.forEach(option => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("print-flyout-option");
            optionElement.textContent = option;
            this.flyout.appendChild(optionElement);

            optionElement.addEventListener("click", () => {
                this.state[settingKey] = option;
                valueElement.textContent = option;
                this._closeTileFlyout();
                this._renderPrintPreview();
            });
        })

        return this.flyout;
    }

    _openTileFlyout() {
        this._populateFlyout();
        this.flyout.classList.add("open");
    }

    _closeTileFlyout() {
        this.flyout.innerHTML = "";
        this.flyout.classList.remove("open");
    }

    onRemove() {
        window.removeEventListener("resize", this._resizeHandler);
        this._unmountPrintPreview();
        this._controlButton.parentNode?.removeChild(this._controlButton);
        this._controlPanel.parentNode?.removeChild(this._controlPanel);
    }
}