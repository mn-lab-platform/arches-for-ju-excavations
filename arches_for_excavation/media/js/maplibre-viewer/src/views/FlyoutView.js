import arches from 'arches';
import { getAllResources } from '../api/archesService';
import { EventBusInstance } from '../core/EventBus';
import { events } from '../constants/events';

export class FlyoutView {
    constructor(parentElement) {
        this.resourceTypeDicts = {}; // {graphid: {name: resource name, icon: resource icon}}
        this.resources = [];
        this.selectedForLayer = new Set();
        this.previewedIds = new Set();

        this.container = document.createElement('div');
        this.container.className = 'flyout';
        parentElement.appendChild(this.container);

        this._buildLayout();
        this._fetchAllResources();
    }

    _buildLayout() {
        this.content = document.createElement('div');
        this.content.className = 'flyout-content';

        this.header = document.createElement('div');
        this.header.className = 'flyout-header';

        this.introSection = document.createElement('div');
        this.introSection.className = 'flyout-intro';

        this.title = document.createElement('h4');
        this.title.className = 'flyout-title';
        this.title.textContent = 'Add Resource Layer';

        this.subtitle = document.createElement('p');
        this.subtitle.className = 'flyout-subtitle';
        this.subtitle.textContent = 'Search resources and add them to the map.';

        this.introSection.appendChild(this.title);
        this.introSection.appendChild(this.subtitle);

        this.createLayerButton = document.createElement('button');
        this.createLayerButton.className = 'flyout-create-layer-button';
        this.createLayerButton.textContent = 'Create Layer';
        this.createLayerButton.title = 'Create a new layer';
        this.createLayerButton.disabled = true;

        this.createLayerButton.addEventListener('click', () => {
            
        });

        this.header.appendChild(this.introSection);
        this.header.appendChild(this.createLayerButton);

        this.filters = document.createElement('div');
        this.filters.className = 'flyout-filters';

        this.searchInput = document.createElement('input');
        this.searchInput.className = 'flyout-search-input';
        this.searchInput.type = 'search';
        this.searchInput.placeholder = 'Search resources...';
        this.searchInput.setAttribute('aria-label', 'Search resources');
        this.searchInput.addEventListener('input', () => {
            this._applyFilters();
        });

        this.typeSelect = document.createElement('select');
        this.typeSelect.className = 'flyout-type-select';
        this.typeSelect.setAttribute('aria-label', 'Filter by resource type');
        this._fillTypeSelect();
        this.typeSelect.addEventListener('change', () => {
            this._applyFilters();
        });

        this.filters.appendChild(this.searchInput);
        this.filters.appendChild(this.typeSelect);

        this.results = document.createElement('div');
        this.results.className = 'flyout-results';

        this.content.appendChild(this.header);
        this.content.appendChild(this.filters);
        this.content.appendChild(this.results);


        this.container.appendChild(this.content);
    }

    _updateCreateLayerButtonState() {
        const count = this.selectedForLayer.size;
        const hasSelection = count > 0;

        this.createLayerButton.disabled = !hasSelection;
        this.createLayerButton.textContent = hasSelection
        ? `Create Layer (${count} selected)`
        : "Create Layer";
    }

    _applyFilters() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedType = this.typeSelect.value;

        const filteredResources = this.resources.filter(resource => {
            const matchesSearch = resource.displayname.toLowerCase().includes(searchTerm) || resource.displaydescription.toLowerCase().includes(searchTerm);
            const matchesType = selectedType ? resource.graph_id === selectedType : true;
            return matchesSearch && matchesType;
        });

        const filteredIds = new Set(filteredResources.map(r => r.resourceinstanceid));
        this.previewedIds.forEach(id => {
            if (!filteredIds.has(id)) {
                EventBusInstance.publish(events.PREVIEW_REMOVE, id);
                this.previewedIds.delete(id);
            }
        });
        this._renderResults(filteredResources);
    }

    _fillTypeSelect() {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'All Resource Types';
        this.typeSelect.appendChild(defaultOption);

        const resourceTypes = arches?.resources;
//         const resourceTypes = [
//     {
//         "maplayerid": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
//         "graphid": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
//         "name": "Digital Resource 3D",
//         "icon": "fa fa-cube"
//     },
//     {
//         "maplayerid": "9d82972a-f537-11ea-ac6d-9fb7e90de197",
//         "graphid": "9d82972a-f537-11ea-ac6d-9fb7e90de197",
//         "name": "Trench",
//         "icon": "fa fa-crop"
//     },
//     {
//         "maplayerid": "5115ff02-b628-401b-889c-a10328ee21a2",
//         "graphid": "5115ff02-b628-401b-889c-a10328ee21a2",
//         "name": "New Resource Model",
//         "icon": ""
//     },
//     {
//         "maplayerid": "d6559924-9f52-11eb-96c4-020063fe0012",
//         "graphid": "d6559924-9f52-11eb-96c4-020063fe0012",
//         "name": "Context ",
//         "icon": "fa fa-digg"
//     },
//     {
//         "maplayerid": "a5219c24-2907-4055-9d68-18216d214458",
//         "graphid": "a5219c24-2907-4055-9d68-18216d214458",
//         "name": "Coordinate System",
//         "icon": "fa fa-arrows-alt"
//     }
// ];
        resourceTypes.forEach(resource => {
            const option = document.createElement('option');
            option.value = resource.graphid;
            option.textContent = resource.name;
            this.typeSelect.appendChild(option);
        });

        this._createResourceTypeDict(resourceTypes);
    }

    _createResourceTypeDict(resources) {
        this.resourceTypeDicts = {};
        resources.forEach(resource => {
            this.resourceTypeDicts[resource.graphid] = {name: resource.name, icon: resource.icon};
        });
    }

    _fetchAllResources() {
        getAllResources().then(resources => {
            const hits = resources.results.hits.hits;
            this.resources = hits
                .filter((hit => hit._source.geometries && hit._source.geometries.length > 0))
                .map(hit => hit._source);
            this._renderResults(this.resources);
        });
    }

    _renderResults(resourcesToRender) {
        this.results.innerHTML = '';
        resourcesToRender.forEach(resourceInfo => {
            const item = this._createResultItem(resourceInfo);
            this.results.appendChild(item);
        });
    }

    _createResultItem(resourceInfo) {
        console.log("ResourceInfo: ", resourceInfo);
        
        const resourceTypeInfo = this.resourceTypeDicts[resourceInfo.graph_id];
        const resourceId = resourceInfo.resourceinstanceid;

        const item = document.createElement('div');
        item.className = 'flyout-result-item';

        const info = document.createElement('div');
        info.className = 'flyout-result-info';

        const header = document.createElement('div');
        header.className = 'flyout-result-header';
        
        const icon = document.createElement('i');
        
        icon.className = resourceTypeInfo && resourceTypeInfo.icon ? resourceTypeInfo.icon : 'fa fa-question';

        const title = document.createElement('p');
        title.className = 'flyout-result-title';
        title.textContent = resourceInfo.displayname;

        header.appendChild(icon);
        header.appendChild(title);

        const details = document.createElement('div');
        details.className = 'flyout-result-details';
        
        const description = document.createElement('small');
        description.className = 'flyout-result-description';
        description.textContent = resourceInfo.displaydescription || 'No description available.';

        details.appendChild(description);

        const controls = document.createElement('div');
        controls.className = 'flyout-result-controls';

        const aggregateCheckbox = document.createElement('input');
        aggregateCheckbox.type = 'checkbox';
        aggregateCheckbox.title = 'Aggregate resources of this type into a single layer';        
        aggregateCheckbox.id = `aggregate-${resourceId}`;
        aggregateCheckbox.name = `aggregate-${resourceId}`;
        aggregateCheckbox.checked = this.selectedForLayer.has(resourceId);
        item.classList.toggle('aggregated', aggregateCheckbox.checked);

        aggregateCheckbox.addEventListener('change', () => {
            if (aggregateCheckbox.checked) {
                this.selectedForLayer.add(resourceId);
            } else {
                this.selectedForLayer.delete(resourceId);
            }
            item.classList.toggle("aggregated", aggregateCheckbox.checked);
            this._updateCreateLayerButtonState();
        });

        const mapPreviewButton = document.createElement('button');
        mapPreviewButton.innerHTML = '<i class="fa fa-map"></i>';
        mapPreviewButton.title = 'Preview on map';
        mapPreviewButton.classList.toggle('active', this.previewedIds.has(resourceId));
        item.classList.toggle('previewed', this.previewedIds.has(resourceId));

        mapPreviewButton.addEventListener('click', () => {
            this.previewedIds.has(resourceId) ? this.previewedIds.delete(resourceId) : this.previewedIds.add(resourceId);
            mapPreviewButton.classList.toggle('active', this.previewedIds.has(resourceId));
            item.classList.toggle('previewed');

            if (mapPreviewButton.classList.contains('active')) {
                EventBusInstance.publish(events.PREVIEW_ADD, {
                    resourceId: resourceId,
                    name: resourceInfo.displayname,
                    description: resourceInfo.displaydescription,
                    geometry: resourceInfo.geometries[0]
                });
            }
            else {
                EventBusInstance.publish(events.PREVIEW_REMOVE, resourceId);
            }
        });

        const reportLink = document.createElement('a');
        reportLink.href = `/report/${resourceId}`;
        reportLink.target = '_blank';
        reportLink.title = 'View resource report';
        reportLink.innerHTML = '<i class="fa fa-bar-chart"></i>';

        controls.appendChild(aggregateCheckbox);
        controls.appendChild(mapPreviewButton);
        controls.appendChild(reportLink);
        
        info.appendChild(header);
        info.appendChild(details);

        item.appendChild(info);
        item.appendChild(controls);
        return item;
    }
}