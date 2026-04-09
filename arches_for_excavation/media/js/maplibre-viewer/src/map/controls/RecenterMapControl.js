import { MapControl } from "../../components/MapControl";
import { EventBusInstance } from "../../core/EventBus";
import { events } from "../../constants/events";

export class RecenterMapControl {
    constructor() {
        this._map = null;

        const { button } = new MapControl({
            iconClass: 'fa fa-home',
            title: 'Recenter Map to Default Extent',
            hasPanel: false,
            controlInstance: this
        }).build();
        this._controlButton = button;
    }

    onAdd(map) {
        this._map = map;

        EventBusInstance.subscribe(events.CONTROL_ACTIVE, (activeControl) => {
            console.log('Received CONTROL_ACTIVE event in RecenterMapControl with activeControl:', activeControl);
            console.log('Current control instance:', this);
            if (activeControl === this) {
                console.log('RecenterMapControl activated, recentering map to default extent');
                EventBusInstance.publish(events.MAP_TO_DEFAULT);
            }
        });
        
        return this._controlButton;
    }

    onRemove() {
        this._controlButton.parentNode?.removeChild(this._controlButton);
    }
}