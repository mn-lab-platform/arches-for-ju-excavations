import { Tool } from "./Tool";

export class EntitiesVisibilityTool extends Tool {
    constructor(scene, name, callbacks) {
        super(scene, name, callbacks);
        this.entities = this.widget.entities;
        this.active = true;
    }

    activate() {
        this.active = true;
        this._showAllEntities();
    }

    deactivate() {
        this.active = false;
        this._hideAllEntities();
    }

    _showAllEntities() {
        this.entities.values.forEach(entity => {
            entity.show = true;
        });
    }

    _hideAllEntities() {
        this.entities.values.forEach(entity => {
            entity.show = false;
        });
    }
}