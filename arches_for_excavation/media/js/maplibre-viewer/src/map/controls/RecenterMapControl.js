import { createMapControl } from "../../components/mapControl";
import { EventBusInstance } from "../../core/EventBus";
import { events } from "../../constants/events";

export class RecenterMapControl {
    constructor(options) {
        this._map = null;

        const { button } = createMapControl({
            iconClass: 'fa fa-home',
            title: 'Recenter Map to Default Extent',
            hasPanel: false,
            controlInstance: this
        });
        this._controlButton = button;
    }

    onAdd(map) {
        this._map = map;

        EventBusInstance.subscribe(events.CONTROL_ACTIVE, (activeControl) => {
            if (activeControl === this) {
                EventBusInstance.publish(events.MAP_TO_DEFAULT);
            }
        });
        
        return this._controlButton;
    }

    onRemove() {
        this._controlButton.parentNode?.removeChild(this._controlButton);
    }
}