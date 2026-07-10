export class ControlManager {
    constructor(parentElementId) {
        this._parentElement = document.getElementById(parentElementId);
        this._controlsContainer = this._createControlsParent();
        this._parentElement.appendChild(this._controlsContainer);

        this._controls = [];
        this._activeControlIndex = null;
    }

    _createControlsParent() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'cesium-controls-container';
        return controlsContainer;
    }

    registerControls(controls) {
        controls.forEach(control => {
            control.setButtonClickHandler(() => this.onControlButtonClick(control.id));
            const { button, panel } = control.build();
            this._controlsContainer.appendChild(button);
            if (panel) {
                this._controlsContainer.appendChild(panel);
            }
            this._controls.push(control);
        });
    }

    onControlButtonClick(controlIndex) {
        const clickedControl = this._controls.filter(c => c.id === controlIndex)[0];
        if (!clickedControl) return;

        if (this._activeControlIndex === controlIndex) {
            clickedControl.deactivate();
            this._activeControlIndex = null;
        } else {
            if (this._activeControlIndex !== null) {
                const activeControl = this._controls.filter(c => c.id === this._activeControlIndex)[0];
                if (activeControl) {
                    activeControl.deactivate();
                }
            }
            clickedControl.activate();
            this._activeControlIndex = controlIndex;
        }
    }
}