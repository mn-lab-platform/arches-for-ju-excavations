// import arches from 'arches';
import { getAllResources, getAllResourcesFromFilterString } from '../api/archesService';
import { EventBusInstance } from '../core/EventBus';
import { events } from '../constants/events';
import { extractGeommetryFeaturesFromArchesResourceInfo } from './utils/utils';


export class FlyoutView {
    constructor(parentElement) {
        this.resourceTypeDicts = {}; // {graphid: {name: resource name, icon: resource icon}}
        this.resources = [];
        this.selectedForLayer = new Map();
        this.previewedIds = new Set();
        this.advancedSearchOn = false;
        this.allResultsSelected = false;

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
        this.createLayerButton.textContent = 'Select resource(s) to create layer';
        this.createLayerButton.title = 'Create a new layer';
        this.createLayerButton.disabled = true;

        this.createLayerButton.addEventListener('click', () => {
            EventBusInstance.publish(events.LAYER_CREATE_TRIGGER, Array.from(this.selectedForLayer.values()));
            EventBusInstance.publish(events.FLYOUT_CLOSED);
            this.container.classList.toggle('flyout--visible', false);
            this._removeAllPreviews();
            this.selectedForLayer.clear();
            this.searchInput.value = '';
            this.typeSelect.value = '';
            this._renderResults(this.resources);
            this._updateCreateLayerButtonState();
        });

        this.header.appendChild(this.introSection);
        this.header.appendChild(this.createLayerButton);

        this.filters = document.createElement('div');
        this.filters.className = 'flyout-filters';

        this.searchContainer = document.createElement('div');
        this.searchContainer.className = 'flyout-search-group';

        this.searchInput = document.createElement('input');
        this.searchInput.className = 'flyout-search-input';
        this.searchInput.type = 'search';
        this.searchInput.placeholder = 'Search resources...';
        this.searchInput.setAttribute('aria-label', 'Search resources');
        this.searchInput.addEventListener('input', () => {
            if (this.advancedSearchCheckbox.checked && this.searchInput.value.trim()) {
                this.advancedApplyButton.style.display = 'inline-block';
            } else {
                this.advancedApplyButton.style.display = 'none';
            }
            if (!this.advancedSearchCheckbox.checked) {
                this._applyFilters();
            }
        });

        this.advancedSearchLabel = document.createElement('label');
        this.advancedSearchLabel.className = 'flyout-advanced-label';
        this.advancedSearchLabel.htmlFor = 'advanced-search-toggle';
        this.advancedSearchLabel.textContent = 'Advanced search';

        this.advancedSearchCheckbox = document.createElement('input');
        this.advancedSearchCheckbox.type = 'checkbox';
        this.advancedSearchCheckbox.id = 'advanced-search-toggle';
        this.advancedSearchCheckbox.name = 'advanced-search-toggle';
        this.advancedSearchCheckbox.checked = this.advancedSearchOn;
        this.advancedSearchCheckbox.title = 'Toggle advanced search mode';

        this.advancedSearchCheckbox.addEventListener('change', () => {
            if (this.advancedSearchCheckbox.checked) {
                this.advancedSearchOn = true;
                this.typeSelect.disabled = true;
                this.searchInput.placeholder = 'Paste your filter URL in here...';
                if (this.searchInput.value.trim()) {
                    this.advancedApplyButton.style.display = 'inline-block';
                }
            } else {
                this.advancedSearchOn = false;
                this.typeSelect.disabled = false;
                this.searchInput.value = '';
                this.searchInput.placeholder = 'Search resources...';
                this.advancedApplyButton.style.display = 'none';
                this._fetchAllResources();
                this._applyFilters();
            }
        });

        this.advancedApplyButton = document.createElement('button');
        this.advancedApplyButton.className = 'flyout-advanced-apply';
        this.advancedApplyButton.textContent = 'Apply';
        this.advancedApplyButton.style.display = 'none';

        this.advancedApplyButton.addEventListener('click', () => {
            const filterUrl = this.searchInput.value.trim();
            if (!filterUrl) {
                return;
            }
            const filterString = this._extractFilterStringFromUrl(filterUrl);
            console.log("Applying advanced filter with string: ", filterString);
            getAllResourcesFromFilterString(filterString).then(response => {
                this._fillInstanceResourcesFromApiResponse(response);
                this._renderResults(this.resources);
            });
        });
        this.searchContainer.appendChild(this.advancedApplyButton);

        this.searchContainer.appendChild(this.searchInput);
        this.searchContainer.appendChild(this.advancedSearchCheckbox);
        this.searchContainer.appendChild(this.advancedSearchLabel);
        this.searchContainer.appendChild(this.advancedApplyButton);

        this.resultToolbar = document.createElement('div');
        this.resultToolbar.className = 'flyout-result-toolbar';
        
        this.filterGroup = document.createElement('div');
        this.filterGroup.className = 'flyout-filter-group';

        this.typeSelect = document.createElement('select');
        this.typeSelect.className = 'flyout-type-select';
        this.typeSelect.setAttribute('aria-label', 'Filter by resource type');
        this._fillTypeSelect();

        this.typeSelect.addEventListener('change', () => {
            this._applyFilters();
        });
        
        this.filterGroup.appendChild(this.typeSelect);

        this.actionGroup = document.createElement('div');
        this.actionGroup.className = 'flyout-action-group';

        this.selectAllButton = document.createElement('button');
        this.selectAllButton.className = 'flyout-select-all';
        this.selectAllButton.textContent = 'Select All';
        this.selectAllButton.title = 'Select all resources in the current filter results';

        this.selectAllButton.addEventListener('click', () => {
            this.allResultsSelected = !this.allResultsSelected;
            let filteredResources;
            if (!this.advancedSearchOn) {
                filteredResources = this._applyFilters(false);
            } else {
                filteredResources = this.resources;
            }

            if (this.allResultsSelected) {
                filteredResources.forEach(resource => {
                    this.selectedForLayer.set(resource.resourceinstanceid, resource);
                });
                this.selectAllButton.textContent = 'Unselect All';
            } else {
                filteredResources.forEach(resource => {
                    this.selectedForLayer.delete(resource.resourceinstanceid);
                });
                this.selectAllButton.textContent = 'Select All';
            }
            this._renderResults(filteredResources);
            this._updateCreateLayerButtonState();
        });

        this.selectedOnlyToggle = document.createElement('div');
        this.selectedOnlyToggle.className = 'selected-only-toggle';

        this.selectedOnlySwitch = document.createElement('label');
        this.selectedOnlySwitch.className = 'selected-only-switch';

        this.selectedOnlyCheckbox = document.createElement('input');
        this.selectedOnlyCheckbox.type = 'checkbox';

        const toggleSpan = document.createElement('span');

        const toggleText = document.createTextNode(' Selected only');

        this.selectedOnlySwitch.appendChild(this.selectedOnlyCheckbox);
        this.selectedOnlySwitch.appendChild(toggleSpan);
        this.selectedOnlySwitch.appendChild(toggleText);

        this.selectedOnlyCheckbox.addEventListener('change', () => {
            if (this.selectedOnlyCheckbox.checked) {
                this._renderResults(Array.from(this.selectedForLayer.values()));
                this.selectAllButton.disabled = true;
            }
            else {                
                this._renderResults(this.resources);
                this.selectAllButton.disabled = false;
            }
        });

        this.selectedOnlyToggle.appendChild(this.selectedOnlySwitch);

        this.filterGroup.appendChild(this.actionGroup);
        this.actionGroup.appendChild(this.selectAllButton);
        this.actionGroup.appendChild(this.selectedOnlyToggle);
        
        this.filters.appendChild(this.searchContainer);
        this.filters.appendChild(this.filterGroup);

        this.results = document.createElement('div');
        this.results.className = 'flyout-results';

        this.content.appendChild(this.header);
        this.content.appendChild(this.filters);
        this.content.appendChild(this.results);


        this.container.appendChild(this.content);
    }

    _extractFilterStringFromUrl(url) {
        try {
            const parsedUrl = new URL(url, window.location.origin);
            return parsedUrl.search ? parsedUrl.search.substring(1) : '';
        } catch (e) {
            const idx = url.indexOf('?');
            return idx !== -1 ? url.substring(idx + 1) : '';
        }
    }

    _updateCreateLayerButtonState() {
        const count = this.selectedForLayer.size;
        const hasSelection = count > 0;

        this.createLayerButton.disabled = !hasSelection;
        this.createLayerButton.textContent = hasSelection
        ? `Create Layer (${count} selected)`
        : "Select resource(s) to create layer";
    }

    _applyFilters(shouldRender = true) {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedType = this.typeSelect.value;

        const filteredResources = this.resources.filter(resource => {
            const matchesSearch = resource.displayname.toLowerCase().includes(searchTerm) ||
                                resource.displaydescription.toLowerCase().includes(searchTerm);
            const matchesType = selectedType ? resource.graph_id === selectedType : true;
            return matchesSearch && matchesType;
        });

        if (shouldRender) {
            this._removeAllPreviews();
            this._renderResults(filteredResources);
        }
        return filteredResources;
    }

    _fillTypeSelect() {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'All Resource Types';
        this.typeSelect.appendChild(defaultOption);

        // const resourceTypes = arches?.resources;
        const resourceTypes = [
    {
        "maplayerid": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
        "graphid": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
        "name": "Digital Resource 3D",
        "icon": "fa fa-cube"
    },
    {
        "maplayerid": "9d82972a-f537-11ea-ac6d-9fb7e90de197",
        "graphid": "9d82972a-f537-11ea-ac6d-9fb7e90de197",
        "name": "Trench",
        "icon": "fa fa-crop"
    },
    {
        "maplayerid": "5115ff02-b628-401b-889c-a10328ee21a2",
        "graphid": "5115ff02-b628-401b-889c-a10328ee21a2",
        "name": "New Resource Model",
        "icon": ""
    },
    {
        "maplayerid": "d6559924-9f52-11eb-96c4-020063fe0012",
        "graphid": "d6559924-9f52-11eb-96c4-020063fe0012",
        "name": "Context ",
        "icon": "fa fa-digg"
    },
    {
        "maplayerid": "a5219c24-2907-4055-9d68-18216d214458",
        "graphid": "a5219c24-2907-4055-9d68-18216d214458",
        "name": "Coordinate System",
        "icon": "fa fa-arrows-alt"
    }
];
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
        getAllResources().then(response => {
            this._fillInstanceResourcesFromApiResponse(response);
            this._renderResults(this.resources);
        });
    }

    _fillInstanceResourcesFromApiResponse(apiResponse) {
        const hits = apiResponse.results.hits.hits;
        this.resources = hits
            .filter((hit => hit._source.geometries && hit._source.geometries.length > 0))
            .map(hit => hit._source);
    }

    _renderResults(resourcesToRender) {
        this.results.innerHTML = '';
        resourcesToRender.forEach(resourceInfo => {
            const item = this._createResultItem(resourceInfo);
            this.results.appendChild(item);
        });
    }

    _createResultItem(resourceInfo) {
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
                this.selectedForLayer.set(resourceId, resourceInfo);
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
                    geometryFeatures: extractGeommetryFeaturesFromArchesResourceInfo(resourceInfo)
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

    _removeAllPreviews() {
        this.previewedIds.forEach(id => {
            EventBusInstance.publish(events.PREVIEW_REMOVE, id);
        });
        this.previewedIds.clear();
    }
}