import { EventBusInstance } from '../core/EventBus.js';
import { events } from '../constants/events.js';
import store from '../core/store.js';

export class FlyoutView {
    constructor(parentElement) {
        this.container = document.createElement('div');
        this.container.className = 'flyout';
        parentElement.appendChild(this.container);
    }

    setContent(contentElement) {
        this.container.innerHTML = '';
        this.container.appendChild(this._createFlyoutPermanentContent());
        this.container.appendChild(contentElement);
    }

    _createFlyoutPermanentContent() {
        this.closeButtonWrapper = document.createElement('div');
        this.closeButtonWrapper.className = 'flyout-close-btn-wrapper';

        this.closeButton = document.createElement('button');
        this.closeButton.className = 'flyout-close-btn';
        this.closeButton.innerHTML = '<i class="fa fa-close"></i>';
        this.closeButton.title = 'Close Flyout';

        this.closeButton.addEventListener('click', () => {
            EventBusInstance.publish(events.FLYOUT_CLOSED);
            store.mapOffsetX = 0;
        });

        this.closeButtonWrapper.appendChild(this.closeButton);

        return this.closeButtonWrapper
    }

    open() {
        this.container.classList.add('flyout--visible');
        store.mapOffsetX = this.container.offsetWidth;
        this._escListener = (e) => {
            if (e.key === 'Escape') {
                EventBusInstance.publish(events.FLYOUT_CLOSED);
            }
        };
        document.addEventListener('keydown', this._escListener);
    }

    close() {
        this.container.classList.remove('flyout--visible');
        if (this._escListener) {
            document.removeEventListener('keydown', this._escListener);
            this._escListener = null;
        }
        store.mapOffsetX = 0;
    }

    is_open() {
        return this.container.classList.contains('flyout--visible');
    }

}