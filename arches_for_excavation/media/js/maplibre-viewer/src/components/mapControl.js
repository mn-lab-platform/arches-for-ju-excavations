import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";

export class MapControl {
    constructor(options) {
        this.iconClass = options.iconClass;
        this.title = options.title;
        this.hasPanel = options.hasPanel;
        this.controlInstance = this;
    }

    build() {
        const button = document.createElement("button");
        const panel = document.createElement("div");

        button.classList.add("maplibregl-ctrl", "map-control-button");
        button.title = this.title;
        button.setAttribute("aria-haspopup", this.hasPanel ? "true" : "false");
        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {
            const isActive = !button.classList.contains("--control-active");

            button.classList.toggle("--control-active", isActive);
            button.setAttribute("aria-expanded", isActive ? "true" : "false");

            if (isActive) {
                EventBusInstance.publish(events.CONTROL_ACTIVE, this.controlInstance);
            }

            if (this.hasPanel) {
                panel.classList.toggle("--control-panel-open", isActive);
            } else if (isActive) {
                setTimeout(() => {
                    button.classList.remove("--control-active");
                    button.setAttribute("aria-expanded", "false");
                }, 500);
            }
        });

        EventBusInstance.subscribe(events.CONTROL_ACTIVE, (activeControl) => {
            if (activeControl !== this.controlInstance) {
                button.classList.remove("--control-active");
                button.setAttribute("aria-expanded", "false");
                if (this.hasPanel) {
                    panel.classList.remove("--control-panel-open");
                }
            }
        });

        const icon = document.createElement("i");
        icon.className = this.iconClass;
        button.appendChild(icon);

        if (!this.hasPanel) 
            return { button };

        panel.classList.add("control-panel");
        panel.setAttribute("role", "menu");
        button.appendChild(panel);

        panel.addEventListener("click", (event) => {
            event.stopPropagation();
        }); 

        return { button, panel };
    }
}