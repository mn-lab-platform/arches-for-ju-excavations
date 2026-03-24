export class LayerMenuView {
    constructor(parentElement) {
        this.container = document.createElement('div');
        this.container.className = 'layer-menu';
        parentElement.appendChild(this.container);

        this._generateLayout();
    }

    _generateLayout() {
        this.content = document.createElement('div');
        this.content.className = 'layer-menu-content';

        this.controlPanel = document.createElement('div');
        this.controlPanel.className = 'layer-menu-control-panel';

        const groupBtn = document.createElement('button');
        groupBtn.className = 'control-panel-btn';
        groupBtn.title = 'Group Layers';
        groupBtn.innerHTML = '<i class="fa fa-object-group"></i>';

        const filterBtn = document.createElement('button');
        filterBtn.className = 'control-panel-btn';
        filterBtn.title = 'Filter Layers';
        filterBtn.innerHTML = '<i class="fa fa-filter"></i>';

        const sortBtn = document.createElement('button');
        sortBtn.className = 'control-panel-btn';
        sortBtn.title = 'Sort Layers';
        sortBtn.innerHTML = '<i class="fa fa-sort"></i>';

        this.controlPanel.appendChild(groupBtn);
        this.controlPanel.appendChild(filterBtn);
        this.controlPanel.appendChild(sortBtn);

        this.layerList = document.createElement('div');
        this.layerList.className = 'layer-list';

        this.content.appendChild(this.controlPanel);
        this.content.appendChild(this.layerList);

        this.container.appendChild(this.content);
    }
}