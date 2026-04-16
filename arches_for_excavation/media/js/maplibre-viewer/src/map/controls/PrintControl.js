import { MapControl } from "../../components/MapControl";
import { PrintPreview } from "../../components/PrintPreview";
import { PrintManager } from "../PrintManager";
import { EventBusInstance } from "../../core/EventBus";
import { events } from "../../constants/events";

export class PrintControl {
    constructor(mapRootContainer) {
        this._map = null;
        this.mapRootContainer = mapRootContainer;
        this.printManager = null;

        this._paperSizeDict = {
            A5: [148, 210],
            A4: [210, 297],
            A3: [297, 420],
            A2: [420, 594],
        };

        this._formatDict = {
            PDF: "PDF",
        }

        this._dpiDict = {
            "72": 72,
            "96": 96,
            "150": 150,
            "300": 300,
            "400": 400
        };

        this._dpiArr = [72, 96, 150, 300, 400];

        this._northArrowDict = {
            "Arrow 1": "/arrow-1.svg",
            "Arrow 2": "/arrow-2.svg",
            "Arrow 3": "/arrow-3.svg",
        };

        this.tileStateKeys = {
            paperSize: "paperSize",
            format: "format",
            dpi: "dpi",
            northArrow: "northArrow",
        };

        this.state = {
            [this.tileStateKeys.paperSize]: "A4",
            [this.tileStateKeys.format]: "PDF",
            [this.tileStateKeys.dpi]: 96,
            [this.tileStateKeys.northArrow]: "/arrow-1.svg",

            isHorizontal: false,
            currentlySelectedTileKey: null,
        };

        this.tileTypes = {
            standard: "standard",
            icon: "icon"
        }

        const { button, panel } = new MapControl({
            iconClass: "fa fa-file-photo-o",
            title: "Print Map",
            hasPanel: true,
            controlInstance: this,
        }).build();

        this._controlButton = button;
        this._controlPanel = panel;
        this.printPreview = new PrintPreview(this.mapRootContainer);

        this._resizeHandler = () => this.printPreview.renderPrintPreview(this._paperSizeDict[this.state.paperSize] ?? this._paperSizeDict.A4, this.state.isHorizontal);

        EventBusInstance.subscribe(events.CONTROL_ACTIVATE, (activeControl) => {
            if (activeControl === this) {
                this.printPreview.mountPrintPreview();
                this.printPreview.renderPrintPreview(this._paperSizeDict[this.state.paperSize] ?? this._paperSizeDict.A4, this.state.isHorizontal);
                window.addEventListener("resize", this._resizeHandler);
            } else {
                this.printPreview.unmountPrintPreview();
                window.removeEventListener("resize", this._resizeHandler);
            }
        });

        EventBusInstance.subscribe(events.CONTROL_DEACTIVATE, (deactiveControl) => {
            if (deactiveControl === this) {
                this.printPreview.unmountPrintPreview();
                window.removeEventListener("resize", this._resizeHandler);
            }
        });

    }

    onAdd(map) {
        this._map = map;
        this.printManager = new PrintManager(this._map, this.mapRootContainer);

        const printOptionsContainer = document.createElement("div");
        printOptionsContainer.classList.add("print-tiles-container");

        const paperSizeTile = this._createTile(
            "fa fa-arrows",
            "Paper Size: ",
            "Select paper size for printing",
            this.tileStateKeys.paperSize
        );
        printOptionsContainer.appendChild(paperSizeTile);

        const formatTile = this._createTile(
            "fa fa-tag",
            "Format: ",
            "Select format for printing",
            this.tileStateKeys.format
        );
        printOptionsContainer.appendChild(formatTile);

        const dpiTile = this._createTile(
            "fa fa-th",
            "DPI: ",
            "Select resolution for printing",
            this.tileStateKeys.dpi
        );
        printOptionsContainer.appendChild(dpiTile);

        const northArrowTile = this._createTile(
            "fa fa-compass",
            "North Arrow: ",
            "Choose north arrow icon for the printout",
            this.tileStateKeys.northArrow,
            this.tileTypes.icon
        );
        printOptionsContainer.appendChild(northArrowTile);

        const nonExpandableGroup = this._createNonExpandableTile();

        this.flyout = document.createElement("div");
        this.flyout.classList.add("print-options-flyout");

        this._controlPanel.appendChild(printOptionsContainer);
        this._controlPanel.appendChild(nonExpandableGroup);
        this._controlPanel.appendChild(this.flyout);

        return this._controlButton;
    }

    _createTile(icon, label, title, settingKey, type = this.tileTypes.standard) {
        const tile = document.createElement("div");
        tile.classList.add("control-tile", "print-option-tile");
        tile.title = title;

        const leftSide = document.createElement("div");
        leftSide.classList.add("print-tile-left-side");

        const chevron = document.createElement("i");
        chevron.className = "fa fa-chevron-left print-expand-icon";

        const mainInfo = document.createElement("div");
        mainInfo.classList.add("print-tile-main-info");

        const iconElement = document.createElement("img");
        iconElement.className = icon;

        const labelElement = document.createElement("span");
        labelElement.classList.add("print-tile-label");
        labelElement.textContent = label;

        mainInfo.appendChild(iconElement);
        mainInfo.appendChild(labelElement);

        leftSide.appendChild(chevron);
        leftSide.appendChild(mainInfo);

        let valueElement;

        if (type !== this.tileTypes.standard) {
            valueElement = document.createElement("img");
            valueElement.className = 'print-tile-icon-value';
            valueElement.src = this.state[settingKey] || "";
        } else {
            valueElement = document.createElement("span");
            valueElement.classList.add("print-tile-value");
            valueElement.textContent = this.state[settingKey] || "";
        }
        
        tile.appendChild(leftSide);
        tile.appendChild(valueElement);

        tile.addEventListener("click", () => {
            this._closeTileFlyout();

            if (this.state.currentlySelectedTileKey && this.state.currentlySelectedTileKey === settingKey) {
                this.state.currentlySelectedTileKey = null;
            }
            else {
                this.state.currentlySelectedTileKey = settingKey;
                this._populateFlyout(settingKey, valueElement);
                this._openTileFlyout();
            }
        });

        return tile;
    }

    _createNonExpandableTile() {
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
            this.printPreview.renderPrintPreview(this._paperSizeDict[this.state.paperSize] ?? this._paperSizeDict.A4, this.state.isHorizontal);
        });

        orientationGroup.appendChild(orientationLabel);
        orientationGroup.appendChild(orientationBox);

        const submitButton = document.createElement("button");
        submitButton.textContent = "Print";
        submitButton.classList.add("submit-button");

        submitButton.addEventListener("click", () => {
            this._closeTileFlyout();
            this.printManager.exportPdf(
                this._paperSizeDict[this.state.paperSize] ?? this._paperSizeDict.A4,
                this.state.isHorizontal,
                this._dpiDict[this.state.dpi] ?? 96,
                this.printPreview._previewPaper.getBoundingClientRect(),
                this.state.northArrow
            )
            EventBusInstance.publish(events.CONTROL_DEACTIVATE, this);
        });
        
        nonExpandableGroup.appendChild(orientationGroup);
        nonExpandableGroup.appendChild(submitButton);

        return nonExpandableGroup;
    }

    _populateFlyout(settingKey, valueElement) {
        const isIconValue = settingKey === this.tileStateKeys.northArrow;
        let options = [];
        switch (settingKey) {
            case this.tileStateKeys.paperSize:
                options = Object.keys(this._paperSizeDict);
                break;
            case this.tileStateKeys.format:
                options = Object.keys(this._formatDict);
                break;
            case this.tileStateKeys.dpi:
                options = Object.keys(this._dpiDict);
                break;
            case this.tileStateKeys.northArrow:
                options = Object.entries(this._northArrowDict);
                break;
            default:
                break;
        }

        options.forEach(option => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("print-flyout-option");
            optionElement.textContent = option;

            if (isIconValue) {
                const [label, iconUrl] = option;
                console.log(option);
                console.log(iconUrl);
                optionElement.textContent = "";
                const iconImg = document.createElement("img");
                iconImg.src = iconUrl;
                iconImg.alt = label;
                optionElement.appendChild(iconImg);
                optionElement.title = label;
                optionElement.addEventListener("click", () => {
                    this.state[settingKey] = iconUrl;
                    valueElement.src = iconUrl;
                    this._closeTileFlyout();
                    this.state.currentlySelectedTileKey = null;
                });
            } else {
                optionElement.addEventListener("click", () => {
                    this.state[settingKey] = option;
                    valueElement.textContent = option;
                    if (isIconValue) {
                        valueElement.textContent = "";
                        valueElement.src = option;
                    }
                    this._closeTileFlyout();
                    this.printPreview.renderPrintPreview(this._paperSizeDict[this.state.paperSize] ?? this._paperSizeDict.A4, this.state.isHorizontal);
                    this.state.currentlySelectedTileKey = null;
                });
            }
            this.flyout.appendChild(optionElement);
        })

        return this.flyout;
    }

    _openTileFlyout() {
        this.flyout.classList.add("open");
        this._controlPanel.classList.toggle("flat-border-left", true);
    }

    _closeTileFlyout() {
        this.flyout.innerHTML = "";
        this.flyout.classList.remove("open");
        this._controlPanel.classList.toggle("flat-border-left", false);
    }

    onRemove() {
        window.removeEventListener("resize", this._resizeHandler);
        this._unmountPrintPreview();
        this._controlButton.parentNode?.removeChild(this._controlButton);
        this._controlPanel.parentNode?.removeChild(this._controlPanel);
    }
}