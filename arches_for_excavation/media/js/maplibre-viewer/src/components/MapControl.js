import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";

export class MapControl {
    constructor(options) {
        this.iconClass = options.iconClass;
        this.title = options.title;
        this.hasPanel = options.hasPanel;
        this.controlInstance = options.controlInstance || this;
    }

    build() {
        const container = document.createElement("div");
        container.classList.add("maplibregl-ctrl", "map-control-container");
        container.style.position = "relative";

        const button = document.createElement("button");
        button.classList.add("map-control-button");
        button.title = this.title;
        button.setAttribute("aria-haspopup", this.hasPanel ? "true" : "false");
        button.setAttribute("aria-expanded", "false");

        const icon = document.createElement("i");
        icon.className = this.iconClass;
        button.appendChild(icon);

        container.appendChild(button);

        const panel = document.createElement("div");

        button.addEventListener("click", () => {
            const isActive = !button.classList.contains("--control-active");

            button.classList.toggle("--control-active", isActive);
            button.setAttribute("aria-expanded", isActive ? "true" : "false");

            if (isActive) {
                EventBusInstance.publish(events.CONTROL_ACTIVATE, this.controlInstance);
            } else {
                EventBusInstance.publish(events.CONTROL_DEACTIVATE, this.controlInstance);
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

        EventBusInstance.subscribe(events.CONTROL_ACTIVATE, (activeControl) => {
            if (activeControl !== this.controlInstance) {
                EventBusInstance.publish(events.CONTROL_DEACTIVATE, this.controlInstance);
            }
        });

        EventBusInstance.subscribe(events.CONTROL_DEACTIVATE, (deactivatedControl) => {
            if (deactivatedControl === this.controlInstance) {
                button.classList.remove("--control-active");
                button.setAttribute("aria-expanded", "false");
                if (this.hasPanel) {
                    panel.classList.remove("--control-panel-open");
                }
            }
        });

        if (!this.hasPanel) 
            return { container, button };

        panel.classList.add("control-panel");
        panel.setAttribute("role", "menu");
        
        container.appendChild(panel);

        panel.addEventListener("click", (event) => {
            event.stopPropagation();
        }); 

        return { container, button, panel };
    }
}