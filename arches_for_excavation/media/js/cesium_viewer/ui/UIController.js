import { BackToDefaultTool } from '../cesium/tools/BackToDefaultTool.js';
import { DistanceTool } from '../cesium/tools/DistanceTool.js';
import { AnnotationsTool } from '../cesium/tools/AnnotationsTool.js';
import { PickerTool } from '../cesium/tools/PickerTool.js';
import { TOOL_CALLBACKS, TOOL_NAMES, TOOL_TITLES } from '../const/const.js';
import { createAnnotationModal } from './templates/AnnotationModal.js';
import { GlobeTool } from '../cesium/tools/GlobeTool.js';
import { EntitiesVisibilityTool } from '../cesium/tools/EntitiesVisibilityTool.js';

export class UIController {
    constructor(scene, externalCallbacks = {}) {
        this.scene = scene;
        this.allowAnnotationsEdits = scene.allowAnnotationsEdits;
        this.allowObjectAddition = scene.allowObjectAddition;
        this.allowObjectPicking = scene.allowObjectPicking;
        this.sceneGeoreferenced = scene.georeferenced;
        this.toolDisplays = new Map();
        this.parentContainerId = scene.containerId;
        this.basemaps = scene.getBasemapsInfo();
        this.currentBasemapTitle = this.basemaps.length > 0 ? this.basemaps[0].name : 'No Basemaps';
        this.customCallbacks = externalCallbacks;
        this.tools = [
            new BackToDefaultTool(scene, TOOL_NAMES.BACK_TO_DEFAULT, {
                [TOOL_CALLBACKS.ON_TOOL_SELF_DEACTIVATE]: () => this._onToolSelfDeactivate(TOOL_NAMES.BACK_TO_DEFAULT)
            }),
            new DistanceTool(scene, TOOL_NAMES.DISTANCE, {
                [TOOL_CALLBACKS.ON_DISTANCE_UPDATE]: (distance) => this._updateDistanceDisplay(distance)
            }),
            new AnnotationsTool(scene, TOOL_NAMES.ANNOTATIONS, {
                [TOOL_CALLBACKS.ON_POLYGON_COMPLETED]: (annotationData) => this._onPolygonCompleted(annotationData),
            }),
            new PickerTool(scene, TOOL_NAMES.PICKER, {
                [TOOL_CALLBACKS.ON_ANNOTATION_PICKED]: (annotationData) => this._showAnnotationModalForTool(TOOL_NAMES.PICKER, annotationData),
                [TOOL_CALLBACKS.ON_ANNOTATION_UPDATED]: (annotationData) => this._onAnnotationUpdated(annotationData),
                [TOOL_CALLBACKS.ON_ANNOTATION_DELETED]: (annotationId) => this._onAnnotationDeleted(annotationId)
            }),
            new EntitiesVisibilityTool(scene, TOOL_NAMES.ENTITIES_VISIBILITY, {}),
            new GlobeTool(scene, TOOL_NAMES.GLOBE, {
                    [TOOL_CALLBACKS.ON_BASEMAP_SELECTED]: (basemapId) => this._onShowBasemap(basemapId)
                }, 
                this.basemaps
            )
        ];
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
        this._initializeToolUi(this.tools[0], 'fa-home');
        this._initializeToolUi(this.tools[1], 'fa-arrows-h');
        if (this.allowObjectAddition) {
            this._initializeToolUi(this.tools[2], 'fa-pencil');
        }
        if (this.allowObjectPicking) {
            this._initializeToolUi(this.tools[3], 'fa-crosshairs');
        }
        if(this.scene.hasAnnotations()) {
            this._initializeToolUi(this.tools[4], 'fa-eye');
        }
        if (this.sceneGeoreferenced) {
            this._initializeToolUi(this.tools[5], 'fa-globe');
        }
    }

    _initializeToolUi(tool, iconClass) {
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
        button.innerHTML = `<i class="fa ${iconClass}" aria-hidden="true"></i>`;
        button.title = TOOL_TITLES[tool.name] || tool.name;
        if (tool.active) {
            button.classList.add('toolActive');
        }
        toolWrapper.appendChild(button);

        const toolInfoDisplay = document.createElement('div');
        toolInfoDisplay.id = `${tool.name}InfoDisplay`;
        toolInfoDisplay.classList.add('toolInfoDisplay');
        toolInfoDisplay.style.display = 'none';
        toolWrapper.appendChild(toolInfoDisplay);

        if (tool.name === TOOL_NAMES.GLOBE) {
            toolInfoDisplay.classList.add('basemapSelector');

            const left = document.createElement('button');
            left.classList.add('basemapNavButton', 'basemapNavButtonLeft');
            left.innerHTML = `<i class="fa fa-chevron-left" aria-hidden="true"></i>`;
            left.title = 'Previous Basemap';

            const title = document.createElement('span');
            title.classList.add('basemapTitle');
            title.textContent = this.currentBasemapTitle;

            const right = document.createElement('button');
            right.classList.add('basemapNavButton', 'basemapNavButtonRight');
            right.innerHTML = `<i class="fa fa-chevron-right" aria-hidden="true"></i>`;
            right.title = 'Next Basemap';

            left.addEventListener('click', () => {
                tool.previousBasemap();
                title.textContent = this.currentBasemapTitle;
            });

            right.addEventListener('click', () => {
                tool.nextBasemap();
                title.textContent = this.currentBasemapTitle;
            });

            toolInfoDisplay.appendChild(left);
            toolInfoDisplay.appendChild(title);
            toolInfoDisplay.appendChild(right);
        }

        this.toolDisplays.set(tool.name, toolInfoDisplay);

        button.onclick = (() => {
            const active = !tool.active;
            if (active) {
                tool.activate();
                button.classList.add('toolActive');
                this._setToolInfoVisibility(tool.name, true);

                if (tool.name === TOOL_NAMES.BACK_TO_DEFAULT) {
                    this._deactivateUnusedTools(tool);
                }
            }
            else {
                tool.deactivate();
                button.classList.remove('toolActive');
                this._setToolInfoVisibility(tool.name, false);
            }
        });
    }

    _setToolInfoVisibility(toolName, isVisible) {
        const display = this.toolDisplays.get(toolName);
        if (!display) return;
        display.style.display = isVisible ? 'flex' : 'none';
    }

    _deactivateUnusedTools(activeTool) {
        this.tools.forEach((tool) => {
            if (tool !== activeTool && tool.active) {
                this._deactivateTool(tool);
            }
        });
    }

    _deactivateTool(tool) {
        tool.deactivate();
        const button = document.getElementById(`${tool.name}Button`);
        if (button) {
            button.classList.remove('toolActive');
        }
        this._setToolInfoVisibility(tool.name, false);
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
    
    _showAnnotationModalForTool(toolName, annotationData = {}) {
        const display = this.toolDisplays.get(toolName);
        createAnnotationModal(display, annotationData, this.tools.find(tool => tool.name === toolName), this.allowAnnotationsEdits);
    }

    _onAnnotationUpdated(annotationData) {
        if (this.customCallbacks.onAnnotationUpdated) {
            this.customCallbacks.onAnnotationUpdated(annotationData);
        }
    }

    // _onAnnotationSaved(annotationData) {
    //     if (this.customCallbacks.onAnnotationSaved) {
    //         this.customCallbacks.onAnnotationSaved(annotationData);
    //     }
    // }

    _onPolygonCompleted(annotationData) {
        if (this.customCallbacks.onPolygonCompleted) {
            this.customCallbacks.onPolygonCompleted(annotationData);
        }
    }

    _onAnnotationDeleted(annotationId) {
        if (this.customCallbacks.onAnnotationDeleted) {
            this.customCallbacks.onAnnotationDeleted(annotationId);
        }
    }

    _onToolSelfDeactivate(toolName) {
        setTimeout(() => {
            const tool = this.tools.find(t => t.name === toolName);
            if (tool) {
                this._deactivateTool(tool);
            }
        }, 0);
    }

    _onShowBasemap(basemapId) {
        this.scene.showBasemap(basemapId);
        this.currentBasemapTitle = this.basemaps.find(b => b.id === basemapId).name || 'Unknown Basemap';
    }
}