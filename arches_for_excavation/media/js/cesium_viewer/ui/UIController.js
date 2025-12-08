import { DistanceTool } from '../cesium/tools/DistanceTool.js';
import { AnnotationsTool } from '../cesium/tools/AnnotationsTool.js';
import { PickerTool } from '../cesium/tools/PickerTool.js';
import { TOOL_CALLBACKS, TOOL_NAMES } from '../const/const.js';
import { createAnnotationModal } from './templates/AnnotationModal.js';

export class UIController {
    constructor(scene, externalCallbacks = {}) {
        this.allowAnnotationsEdits = scene.allowAnnotationsEdits;
        this.allowObjectPicking = scene.allowObjectPicking;
        this.toolDisplays = new Map();
        this.parentContainerId = scene.containerId;
        this.customCallbacks = externalCallbacks;
        this.tools = [
            new DistanceTool(scene, TOOL_NAMES.DISTANCE, {
                [TOOL_CALLBACKS.ON_DISTANCE_UPDATE]: (distance) => this._updateDistanceDisplay(distance)
            }),
            new AnnotationsTool(scene, TOOL_NAMES.ANNOTATIONS, {
                [TOOL_CALLBACKS.ON_POLYGON_COMPLETE]: () => this._showAnnotationModalForTool(TOOL_NAMES.ANNOTATIONS),
                [TOOL_CALLBACKS.ON_ANNOTATION_SAVED]: (annotationData) => this._onAnnotationSaved(annotationData)
            }),
            new PickerTool(scene, TOOL_NAMES.PICKER, {
                [TOOL_CALLBACKS.ON_ANNOTATION_PICKED]: (annotationData) => this._showAnnotationModalForTool(TOOL_NAMES.PICKER, annotationData),
                [TOOL_CALLBACKS.ON_ANNOTATION_SAVED]: (annotationData) => this._onAnnotationSaved(annotationData),
                [TOOL_CALLBACKS.ON_ANNOTATION_DELETED]: (annotationId) => this._onAnnotationDeleted(annotationId)
            })
        ];
        this.annotationClicked = false;
        this._addCreditAnchor();
        this._setupTools();
    }

    _addCreditAnchor() {
        const container = document.getElementById(this.parentContainerId);
        if (!container) return;

        if (container.querySelector('.cesium-credit')) return;

        const creditAnchor = document.createElement('a');
        creditAnchor.classList.add('cesium-credit');
        creditAnchor.href = 'https://cesium.com/';
        creditAnchor.target = '_blank';
        creditAnchor.rel = 'noopener noreferrer';
        creditAnchor.textContent = 'Powered by Cesium';

        container.appendChild(creditAnchor);
    }

    _setupTools() {
        this._initializeToolUi(this.tools[0], '/static/img/cesium_viewer/distance_icon.svg'); 
        if (this.allowAnnotationsEdits) {
            this._initializeToolUi(this.tools[1], '/static/img/cesium_viewer/annotations_icon.svg'); 
        }
        if (this.allowObjectPicking) {
            this._initializeToolUi(this.tools[2], '/static/img/cesium_viewer/picker_icon.svg'); 
        }
    }

    _initializeToolUi(tool, iconPath) {
        const container = document.getElementById(this.parentContainerId);
        if (!container) {
            console.error(`Container ${this.parentContainerId} not found`);
            return;
        }
        const toolsContainer = container.querySelector('.toolsContainer');
        if (!toolsContainer) {
            console.error(`toolsContainer not found in ${this.parentContainerId}`);
            return;
        }

        const toolWrapper = document.createElement('div');
        toolWrapper.classList.add('toolWrapper');
        toolsContainer.appendChild(toolWrapper);

        const button = document.createElement('button');
        button.id = `${tool.name}Button`;
        button.classList.add('toolButton');
        button.innerHTML = `<img src="${iconPath}" alt="${tool.name} Tool" />`;
        toolWrapper.appendChild(button);

        const toolInfoDisplay = document.createElement('div');
        toolInfoDisplay.id = `${tool.name}InfoDisplay`;
        toolInfoDisplay.classList.add('toolInfoDisplay');
        toolWrapper.appendChild(toolInfoDisplay);

        this.toolDisplays.set(tool.name, toolInfoDisplay);

        button.onclick = (() => {
            const active = !tool.active;
            if (active) {
                tool.activate();
                button.classList.add('toolActive');
                this._deactivateUnusedTools(tool);
            }
            else {
                tool.deactivate();
                button.classList.remove('toolActive');
            }
        });
    }

    _deactivateUnusedTools(activeTool) {
        this.tools.forEach((tool) => {
            if (tool !== activeTool && tool.active) {
                tool.deactivate();
                const button = document.getElementById(`${tool.name}Button`);
                if (button) {
                    button.classList.remove('toolActive');
                }
            }
        });
    }

    _updateDistanceDisplay(distanceString) {
        const display = this.toolDisplays.get(TOOL_NAMES.DISTANCE);
        if (!display) return;

        if (distanceString == null) {
            display.textContent = '';
        } else {
            display.textContent = distanceString;
        }
    }

    _updateCreditVisibility() {
        const container = document.getElementById(this.parentContainerId);
        if (!container) return;
        const creditAnchor = container.querySelector('.cesium-credit');
        if (!creditAnchor) return;
        if (this.annotationClicked) {
            creditAnchor.classList.add('invisible');
        } else {
            creditAnchor.classList.remove('invisible');
        }
    }
    
    _showAnnotationModalForTool(toolName, annotationData = {}) {
        const display = this.toolDisplays.get(toolName);
        createAnnotationModal(display, annotationData, this.tools.find(tool => tool.name === toolName), this.allowAnnotationsEdits);
        this.annotationClicked = true;
        this._updateCreditVisibility();
    }

    _onAnnotationSaved(annotationData) {
        /**
         * Expects annotationData to be an object like:
         * {
         *   name: 'Annotation Name',
         *   description: 'Annotation Description',
         *   color: '#ff0000',
         *   position: [[x1, y1, z1], [x2, y2, z2], ...]  // Array of position arrays
         * }
         */
        if (this.customCallbacks.onAnnotationSaved) {
            this.customCallbacks.onAnnotationSaved(annotationData);
        }
    }

    _onAnnotationDeleted(annotationId) {
        if (this.customCallbacks.onAnnotationDeleted) {
            this.customCallbacks.onAnnotationDeleted(annotationId);
        }
    }
}