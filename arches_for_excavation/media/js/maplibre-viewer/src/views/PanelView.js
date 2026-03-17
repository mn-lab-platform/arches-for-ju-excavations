import { LayerMenuView } from './LayerMenuView.js';
import { FlyoutView } from './FlyoutView.js';

export class PanelView {
    constructor(parentContainerId) {
        const parentContainer = document.getElementById(parentContainerId);

        this.container = document.createElement('div');
        this.container.className = 'menu-panel';
        
        parentContainer.appendChild(this.container);

        this.addLayerBtn = this._createAddLayerButton();
        this.container.appendChild(this.addLayerBtn);

        this.layerMenu = new LayerMenuView(this.container);
        this.flyout = new FlyoutView(this.container);

        this.flyoutVisible = false;
    }

    // _createToggleButton() {
    //     const btn = document.createElement('button');
    //     btn.className = 'panel__toggle';
    //     btn.type = 'button';
    //     btn.setAttribute('aria-label', 'Toggle layer panel');
    //     btn.textContent = '<';

    //     btn.addEventListener('click', () => {
    //         this.isCollapsed = !this.isCollapsed;
    //         this.container.classList.toggle('panel--collapsed', this.isCollapsed);
    //         btn.textContent = this.isCollapsed ? '>' : '<';
    //     });

    //     return btn;
    // }

    _createAddLayerButton() {
        const btn = document.createElement('button');
        btn.className = 'add-layer-button';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Add new layer');
        btn.textContent = 'Add Layer';

        btn.addEventListener('click', () => {
            this.flyoutVisible = !this.flyoutVisible;
            this.flyout.container.classList.toggle('flyout--visible', this.flyoutVisible);
            this.addLayerBtn.textContent = this.flyoutVisible ? 'Close Flyout' : 'Add Layer';
        });

        return btn;
    }
}