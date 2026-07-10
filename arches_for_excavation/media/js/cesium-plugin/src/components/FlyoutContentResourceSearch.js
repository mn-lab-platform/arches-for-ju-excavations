import { getAllModels } from '../api/archesService';
import { EventBusInstance } from '../core/EventBus';
import { events } from '../constants/events';

export class FlyoutContentResourceSearch {
    constructor() {
        this.resources = [];
        this.selectedForLayer = new Map();
        this.currentlyRenderedResources = [];
        this.previewedIds = new Set();
        this.advancedSearchOn = false;
        this.allResultsSelected = false;

        this._fetchAllResources();
    }

    _fetchAllResources() {
        getAllModels().then(models => {
            this.resources = models;
            console.log('Fetched resources:', this.resources);
            this._renderResults(this.resources);
        })
    }

    build() {
        this.content = document.createElement('div');
        this.content.className = 'flyout-content';

        this.header = document.createElement('div');
        this.header.className = 'flyout-header';

        this.introSection = document.createElement('div');
        this.introSection.className = 'flyout-intro';

        this.title = document.createElement('h4');
        this.title.className = 'flyout-title';
        this.title.textContent = 'Add Model Layer';

        this.subtitle = document.createElement('p');
        this.subtitle.className = 'flyout-subtitle';
        this.subtitle.textContent = 'Search models and add them to the map.';

        this.introSection.appendChild(this.title);
        this.introSection.appendChild(this.subtitle);

        this.createLayerButton = document.createElement('button');
        this.createLayerButton.className = 'submit-button';
        this.createLayerButton.textContent = 'Select model(s) to create layer';
        this.createLayerButton.title = 'Create a new layer';
        this.createLayerButton.disabled = true;

        this.createLayerButton.addEventListener('click', () => {
            console.log('Selected resources for layer creation:', Array.from(this.selectedForLayer.values()));
            EventBusInstance.publish(events.FLYOUT_CLOSE);
            const selectedForLayersArray = Array.from(this.selectedForLayer.values());
            const layerData = {
                id: `layer_${Date.now()}`,
                name: `${selectedForLayersArray.length > 1 ? `${selectedForLayersArray[0].name} and ${selectedForLayersArray.length - 1} more` : selectedForLayersArray[0].name}`,
                urls: selectedForLayersArray.map(ld => ld.url),
                ids: selectedForLayersArray.map(ld => ld.resource_id),
            }
            EventBusInstance.publish(events.LAYER_ADD, layerData);
            this._removeAllPreviews();
            this.selectedForLayer.clear();
            this.searchInput.value = '';
            this.selectAllButton.textContent = 'Select All';
            this.allResultsSelected = false;
            this.selectedOnlyCheckbox.checked = false;
            this.selectAllButton.disabled = false;
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
        this.searchInput.className = 'flyout-text-input';
        this.searchInput.type = 'search';
        this.searchInput.placeholder = 'Search models...';
        this.searchInput.setAttribute('aria-label', 'Search models');
        this.searchInput.addEventListener('input', () => {
            if (this.searchInput.classList.contains('flyout-search-error')) {
                this.searchInput.classList.remove('flyout-search-error');
                this.searchInput.placeholder = 'Search models...';
            }

            if (this.advancedSearchCheckbox.checked && this.searchInput.value.trim()) {
                this.advancedApplyButton.style.display = 'inline-block';
            } else {
                this.advancedApplyButton.style.display = 'none';
            }
            if (!this.advancedSearchCheckbox.checked) {
                this._applySearch();
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
                this.searchInput.placeholder = 'Paste your filter URL in here...';
                if (this.searchInput.value.trim()) {
                    this.advancedApplyButton.style.display = 'inline-block';
                }
            } else {
                this.advancedSearchOn = false;
                this.searchInput.value = '';
                this.searchInput.placeholder = 'Search models...';
                this.advancedApplyButton.style.display = 'none';
                this.searchInput.classList.remove('flyout-search-input--error');
                this._fetchAllResources();
                this._applySearch();
            }
        });

        this.advancedApplyButton = document.createElement('button');
        this.advancedApplyButton.className = 'flyout-advanced-apply';
        this.advancedApplyButton.textContent = 'Apply';
        this.advancedApplyButton.style.display = 'none';

        this.advancedApplyButton.addEventListener('click', () => {
            const filterUrl = this.searchInput.value.trim();
            if (!filterUrl || !this._isValidSearchUrl(filterUrl)) {
                this.searchInput.value = '';
                this.searchInput.placeholder = 'Please enter a valid search URL';
                this.searchInput.classList.add('flyout-search-input--error');
                return;
            }
            const filterString = this._extractFilterStringFromUrl(filterUrl);
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

        this.actionGroup = document.createElement('div');
        this.actionGroup.className = 'flyout-action-group';

        this.selectAllButton = document.createElement('button');
        this.selectAllButton.className = 'flyout-select-all';
        this.selectAllButton.textContent = 'Select All';
        this.selectAllButton.title = 'Select all resources in the current filter results';

        this.selectAllButton.addEventListener('click', () => {
            this.allResultsSelected = !this.allResultsSelected;
            const visible = this.currentlyRenderedResources;
            console.log('Visible resources for select all toggle:', visible);
            if (this.allResultsSelected) {
                visible.forEach(resource => {
                    if (resource.georeferenced) this.selectedForLayer.set(resource.resource_id, resource);
                });
                this.selectAllButton.textContent = 'Unselect All';
            } else {
                visible.forEach(resource => this.selectedForLayer.delete(resource.resource_id));
                this.selectAllButton.textContent = 'Select All';
            }
            this._renderResults(visible);
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


        return this.content;
    }

    _applySearch(shouldRender = true) {
        const searchTerm = this.searchInput.value.toLowerCase();

        const filteredResources = this.resources.filter(resource => {
            const displayName = String(resource.name || '').toLowerCase();
            const displayDescription = String(resource.description || '').toLowerCase();

            const matchesSearch = displayName.includes(searchTerm) || displayDescription.includes(searchTerm);
            return matchesSearch;
        });

        if (shouldRender) {
            this._removeAllPreviews();
            this._renderResults(filteredResources);
        }
        return filteredResources;
    }

    _renderResults(resourcesToRender) {
        this.currentlyRenderedResources = resourcesToRender;
        this.results.innerHTML = '';
        resourcesToRender.forEach(resourceInfo => {
            const item = this._createResultItem(resourceInfo);
            this.results.appendChild(item);
        });
    }

    _createResultItem(resourceInfo) {
        const resourceId = resourceInfo.resource_id;

        const item = document.createElement('div');
        item.className = 'flyout-result-item';
        if (!resourceInfo.georeferenced) { 
            item.classList.add('div-disabled');
            item.title = 'This resource is not georeferenced and cannot be added to the map.';
        }
        
        const info = document.createElement('div');
        info.className = 'flyout-result-info';

        const header = document.createElement('div');
        header.className = 'flyout-result-header';
        
        const icon = document.createElement('i');
        
        icon.className = 'fa fa-cube'

        const title = document.createElement('p');
        title.className = 'flyout-result-title';
        title.textContent = resourceInfo.name;

        header.appendChild(icon);
        header.appendChild(title);

        const details = document.createElement('div');
        details.className = 'flyout-result-details';
        
        const description = document.createElement('small');
        description.className = 'flyout-result-description';
        description.textContent = resourceInfo.description || 'No description available.';

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

            const visibleResourceIds = this.currentlyRenderedResources.map(r => r.resourceinstanceid);
            const allChecked = visibleResourceIds.every(id => this.selectedForLayer.has(id));
        
            if (allChecked) {
                this.allResultsSelected = true;
                this.selectAllButton.textContent = 'Unselect All';
            } else {
                this.allResultsSelected = false;
                this.selectAllButton.textContent = 'Select All';
            }
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
                    url: resourceInfo.url,
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

    _updateCreateLayerButtonState() {
        const count = this.selectedForLayer.size;
        const hasSelection = count > 0;

        this.createLayerButton.disabled = !hasSelection;
        this.createLayerButton.textContent = hasSelection
        ? `Create Layer (${count} selected)`
        : "Select resource(s) to create layer";
    }

    _removeAllPreviews() {
        EventBusInstance.publish(events.PREVIEW_REMOVE_ALL);
        this.previewedIds.clear();
    }
}