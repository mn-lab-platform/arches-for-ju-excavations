export const createMapControl = ({ iconClass, title }) => {
    const button = document.createElement("button");
    button.classList.add("maplibregl-ctrl", "map-control-button");
    button.title = title;
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
        const isOpen = panel.classList.toggle("--control-panel-open");
        button.classList.toggle("--control-active", isOpen);
        button.setAttribute("aria-expanded", isOpen ? "true" : "false");
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