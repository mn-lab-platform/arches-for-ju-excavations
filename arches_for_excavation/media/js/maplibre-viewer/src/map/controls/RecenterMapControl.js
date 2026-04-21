import { MapControl } from "../../components/MapControl";
import { EventBusInstance } from "../../core/EventBus";
import { events } from "../../constants/events";

export class RecenterMapControl {
    constructor() {
        this._map = null;

        const { button, _ } = new MapControl({
            iconClass: 'fa fa-home',
            title: 'Recenter Map to Default Extent',
            hasPanel: false,
            controlInstance: this
        }).build();
        this._controlButton = button;

        EventBusInstance.subscribe(events.CONTROL_ACTIVATE, (activeControl) => {
            if (activeControl === this) {
                EventBusInstance.publish(events.MAP_TO_DEFAULT);
            }
        });
    }

    onAdd(map) {
        this._map = map;
        
        return this._controlButton;
    }

    onRemove() {
        this._controlButton.parentNode?.removeChild(this._controlButton);
    }
}