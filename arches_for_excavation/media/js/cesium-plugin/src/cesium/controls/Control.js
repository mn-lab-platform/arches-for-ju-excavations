export class Control {
    constructor(iconClass, title, hasPanel = true) {
        this.id = `${this.constructor.name.toLowerCase()}_${Math.random().toString(36).slice(2, 8)}`;
        this._iconClass = iconClass;
        this._title = title;
        this._hasPanel = hasPanel;

        this._panel = null;
        this._button = null;
        this._buttonClickHandler = null;
    }

    setButtonClickHandler(handler) {
        this._buttonClickHandler = handler;
    }

    build() {
        this._button = document.createElement('button');
        this._button.className = 'map-control-button';
        this._button.title = this._title;
        this._button.innerHTML = `<i class="${this._iconClass}"></i>`;
        
        this._button.addEventListener('click', () => {
            if (this._buttonClickHandler) {
                this._buttonClickHandler();
            }
        });

        if (this._hasPanel) {
            this._panel = document.createElement('div');
            this._panel.className = 'control-panel';
            this.buildPanelContent(this._panel);
        }

        return { button: this._button, panel: this._panel };
    }

    buildPanelContent(panel) {
        if (this._hasPanel) {
            throw new Error('buildPanelContent() must be implemented by subclass');
        }
    }

    activate() {
        if (this._button) {
            this._button.classList.add('--control-active');
        }
        if (this._panel && this._hasPanel) {
            this._panel.classList.add('--control-panel-open');
        }
    }

    deactivate() {
        if (this._button) {
            this._button.classList.remove('--control-active');
        }
        if (this._panel && this._hasPanel) {
            this._panel.classList.remove('--control-panel-open');
        }
    }
}