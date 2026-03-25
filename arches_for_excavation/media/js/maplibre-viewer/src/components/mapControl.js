import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";

export const createMapControl = ({ iconClass, title, controlInstance }) => {
    const button = document.createElement("button");
    button.classList.add("maplibregl-ctrl", "map-control-button");
    button.title = title;
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
        const isOpen = panel.classList.toggle("--control-panel-open");
        button.classList.toggle("--control-active", isOpen);
        button.setAttribute("aria-expanded", isOpen ? "true" : "false");
        
        if (isOpen) {
            EventBusInstance.publish(events.CONTROL_OPEN, controlInstance);
        }
    });

    EventBusInstance.subscribe(events.CONTROL_OPEN, (openedControl) => {
        if (openedControl !== controlInstance) {
            panel.classList.remove("--control-panel-open");
            button.classList.remove("--control-active");
            button.setAttribute("aria-expanded", "false");
        }
    });

    const icon = document.createElement("i");
    icon.className = iconClass;
    button.appendChild(icon);

    const panel = document.createElement("div");
    panel.classList.add("control-panel");
    panel.setAttribute("role", "menu");
    button.appendChild(panel);

    panel.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    return { button, panel };
}