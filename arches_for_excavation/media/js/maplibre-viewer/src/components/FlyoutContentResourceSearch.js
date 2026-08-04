import arches from 'arches';
import { getAllResourcesFromFilterString } from '../api/archesService';
import { extractGeommetryFeaturesFromArchesResourceInfo } from '../core/utils/utils';
import { EventBusInstance } from '../core/EventBus';
import { events } from '../constants/events';
import { LAYER_TYPES } from '../constants/constants';
import constants from '../constants/constants';

export class FlyoutContentResourceSearch {
    constructor(preloadedResourceApiResponse = null) {
        this.LABELS = {
            SELECT_ALL: 'Select All Of Type',
            UNSELECT_ALL: 'Unselect All Of Type',
            CREATE_LAYER_EMPTY: 'Select resource(s) to create layer',
            SEARCH_PLACEHOLDER: 'Search resources...'
        };

        this.resourceTypeDicts = {}; 
        this.resources = [];
        if (preloadedResourceApiResponse) {
            this.preloadedResourceApiResponse = preloadedResourceApiResponse;
        }
        this.selectedForLayer = new Map();
        this.currentlyRenderedResources = [];
        this.previewedIds = new Set();
        this.advancedSearchOn = false;
        this.currentlySelectedGraphId = null;
        this.activeRenderedItemRefs = new Map();
        this.mapDisplayableGraphIds = new Set();
        this.IIIF_GRAPH_IDS = new Set(['401b3051-d1c4-465c-8dd0-1d5784adee98', 'f1b9e37a-c3ba-4c26-a797-7f16302c031c']);
        
        this.searchTimeout = null;
        this._initResourceTypes();
    }

    build() {
        this.content = document.createElement('div');
        this.content.className = 'flyout-content';

        this.filters = document.createElement('div');
        this.filters.className = 'flyout-filters';
        this.filters.appendChild(this._buildSearchContainer());
        this.filters.appendChild(this._buildFilterGroup());

        this.results = document.createElement('div');
        this.results.className = 'flyout-results';

        this.content.appendChild(this._buildHeader());
        this.content.appendChild(this.filters);
        this.content.appendChild(this.results);
        
        this._initAllResources();
        
        return this.content;
    }

    _buildHeader() {
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
        this.createLayerButton.className = 'submit-button';
        this.createLayerButton.textContent = this.LABELS.CREATE_LAYER_EMPTY;
        this.createLayerButton.title = 'Create a new layer';
        this.createLayerButton.disabled = true;

        this.createLayerButton.addEventListener('click', () => {
            EventBusInstance.publish(events.FLYOUT_CLOSE);
            EventBusInstance.publish(events.LAYER_CREATE_TRIGGER, Array.from(this.selectedForLayer.values()));
            this._removeAllPreviews();
            this.selectedForLayer.clear();
            this.searchInput.value = '';
            this.typeSelect.value = '';
            this.selectAllButton.textContent = this.LABELS.SELECT_ALL;
            this.selectAllButton.disabled = true;
            this.activeRenderedItemRefs.clear();
            this.currentlySelectedGraphId = null;
            this.selectedOnlyCheckbox.checked = false;
            this._renderResults(this.resources);
            this._updateCreateLayerButtonState();
        });

        this.header.appendChild(this.introSection);
        this.header.appendChild(this.createLayerButton);

        return this.header;
    }

    _buildSearchContainer() {
        this.searchContainer = document.createElement('div');
        this.searchContainer.className = 'flyout-search-group';

        this.searchInput = document.createElement('input');
        this.searchInput.className = 'flyout-text-input';
        this.searchInput.type = 'search';
        this.searchInput.placeholder = this.LABELS.SEARCH_PLACEHOLDER;
        this.searchInput.setAttribute('aria-label', 'Search resources');
        
        this.searchInput.addEventListener('input', () => {
            if (this.searchInput.classList.contains('flyout-search-error')) {
                this.searchInput.classList.remove('flyout-search-error');
                this.searchInput.placeholder = this.LABELS.SEARCH_PLACEHOLDER;
            }

            if (this.advancedSearchCheckbox.checked && this.searchInput.value.trim()) {
                this.advancedApplyButton.style.display = 'inline-block';
            } else {
                this.advancedApplyButton.style.display = 'none';
            }

            if (!this.advancedSearchCheckbox.checked) {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this._applyFilters();
                }, 300);
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
                this.searchInput.placeholder = this.LABELS.SEARCH_PLACEHOLDER;
                this.advancedApplyButton.style.display = 'none';
                this.searchInput.classList.remove('flyout-search-input--error');
                this._initAllResources();
                this._applyFilters();
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

        this.searchContainer.appendChild(this.searchInput);
        this.searchContainer.appendChild(this.advancedSearchCheckbox);
        this.searchContainer.appendChild(this.advancedSearchLabel);
        this.searchContainer.appendChild(this.advancedApplyButton);

        return this.searchContainer;
    }

    _buildFilterGroup() {
        this.filterGroup = document.createElement('div');
        this.filterGroup.className = 'flyout-filter-group';

        this.typeSelect = document.createElement('select');
        this.typeSelect.className = 'flyout-select';
        this.typeSelect.setAttribute('aria-label', 'Filter by resource type');

        this.typeSelect.addEventListener('change', () => {
            this._applyFilters();
        });
        
        this.actionGroup = document.createElement('div');
        this.actionGroup.className = 'flyout-action-group';

        this.selectAllButton = document.createElement('button');
        this.selectAllButton.className = 'flyout-select-all';
        this.selectAllButton.textContent = this.LABELS.SELECT_ALL;
        this.selectAllButton.title = 'Select a resource to determine layer type first.';
        this.selectAllButton.disabled = true;

        this.selectAllButton.addEventListener('click', () => {
            const shouldSelectAll = !this._areAllOfTypeSelected();
            const visible = this.currentlyRenderedResources;
            
            if (shouldSelectAll) {
                visible.forEach(resource => {
                    if (this._resourceShouldBeActive(resource) && resource.graph_id === this.currentlySelectedGraphId) {
                        this.selectedForLayer.set(resource.resourceinstanceid, resource);
                    }
                });
                this.selectAllButton.textContent = this.LABELS.UNSELECT_ALL;
            } else {
                visible.forEach(resource => {
                    if (resource.graph_id === this.currentlySelectedGraphId) {
                        this.selectedForLayer.delete(resource.resourceinstanceid);
                    }
                });
                this.currentlySelectedGraphId = null;
                this.selectAllButton.textContent = this.LABELS.SELECT_ALL;
                this.selectAllButton.disabled = true;
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
            } else {                
                this._renderResults(this.resources);
                this.selectAllButton.disabled = !this.currentlySelectedGraphId;
            }
        });

        this.selectedOnlyToggle.appendChild(this.selectedOnlySwitch);

        this.actionGroup.appendChild(this.selectAllButton);
        this.actionGroup.appendChild(this.selectedOnlyToggle);
        
        this.filterGroup.appendChild(this.typeSelect);
        this.filterGroup.appendChild(this.actionGroup);

        return this.filterGroup;
    }

    _isValidSearchUrl(url) {
        try {
        const parsed = new URL(url, window.location.origin);
            return parsed.pathname.startsWith('/search');
        } catch (e) {
            return false;
        }
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
        : this.LABELS.CREATE_LAYER_EMPTY;
    }

    _updateAggregateCheckboxesState() {
        this.activeRenderedItemRefs.forEach(({graphId, aggregateCheckbox}) => {
            if (graphId === this.currentlySelectedGraphId || this.currentlySelectedGraphId === null) {
                aggregateCheckbox.disabled = false;
                aggregateCheckbox.title = 'Aggregate resources of this type into a single layer';
                aggregateCheckbox.style.cursor = 'pointer';
            } else {                
                aggregateCheckbox.disabled = true;
                aggregateCheckbox.checked = false;
                aggregateCheckbox.title = 'You can only select resources of the same type for layer creation.';
                aggregateCheckbox.style.cursor = 'not-allowed';
            }
        });
    }

    _areAllOfTypeSelected() {
        if (!this.currentlySelectedGraphId) return false;
        const visibleOfType = Array.from(this.activeRenderedItemRefs.values()).filter(r => r.graphId === this.currentlySelectedGraphId);
        return visibleOfType.every(r => r.aggregateCheckbox.checked);
    }

    _applyFilters(shouldRender = true) {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedType = this.typeSelect.value;

        const filteredResources = this.resources.filter(resource => {
            const displayName = String(resource.displayname || '').toLowerCase();
            const displayDescription = String(resource.displaydescription || '').toLowerCase();

            const matchesSearch = displayName.includes(searchTerm) || displayDescription.includes(searchTerm);
            const matchesType = selectedType ? resource.graph_id === selectedType : true;
            return matchesSearch && matchesType;
        });

        if (shouldRender) {
            this._removeAllPreviews();
            this._renderResults(filteredResources);
        }
        return filteredResources;
    }

    _initResourceTypes() {
        this.resourceTypes = arches?.resources;
        this._createResourceTypeDict(this.resourceTypes);
    }

    _fillTypeSelect() {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'All Resource Types';
        this.typeSelect.appendChild(defaultOption);

        this.resourceTypes
            .filter(type => this.mapDisplayableGraphIds.has(type.graphid))
            .forEach(type => {
                const option = document.createElement('option');
                option.value = type.graphid;
                option.textContent = type.name;
                this.typeSelect.appendChild(option);
            });
    }

    _createResourceTypeDict(resources) {
        this.resourceTypeDicts = {};
        resources.forEach(resource => {
            this.resourceTypeDicts[resource.graphid] = {name: resource.name, icon: resource.icon};
        });
    }

    _initAllResources() {
        this._fillInstanceResourcesFromApiResponse(this.preloadedResourceApiResponse);
        this._renderResults(this.resources);
        this._fillTypeSelect();
    };

    _fillInstanceResourcesFromApiResponse(apiResponse) {
        const allHits = [];
        const pushHits = (resp) => {
            const hits = resp?.results?.hits?.hits;
            if (Array.isArray(hits)) {
                allHits.push(...hits);
            }
        };

        if (Array.isArray(apiResponse)) {
            apiResponse.forEach(pushHits);
        } else if (apiResponse) {
            pushHits(apiResponse);
        }
        
        this.resources = allHits
            .map(hit => {
                const source = hit?._source || {};
                source.type = this.IIIF_GRAPH_IDS.has(source.graph_id) ? constants.LAYER_TYPES.iiif : constants.LAYER_TYPES.geojson;
                return source;
            });
    }

    _renderResults(resourcesToRender) {
        this.currentlyRenderedResources = resourcesToRender;
        this.results.innerHTML = '';
        this.activeRenderedItemRefs.clear();
        resourcesToRender.forEach(resourceInfo => {
            if (this._resourceShouldBeActive(resourceInfo)) {
                this.mapDisplayableGraphIds.add(resourceInfo.graph_id);
            }
            const item = this._createResultItem(resourceInfo);
            this.results.appendChild(item);
        });
    }

    _resourceShouldBeActive(resourceInfo) {
        const resourceIsIiif = this.IIIF_GRAPH_IDS.has(resourceInfo.graph_id);
        return resourceIsIiif || resourceInfo.geometries?.length > 0;
    }

    _createResultItem(resourceInfo) {
        const item = document.createElement('div');
        item.className = 'flyout-result-item';

        const itemShouldBeActive = this._resourceShouldBeActive(resourceInfo);

        if (!itemShouldBeActive) {
            item.classList.add('div-disabled');
            item.title = 'This resource is not georeferenced and cannot be added to the map.';
        }
        
        const resourceTypeInfo = this.resourceTypeDicts[resourceInfo.graph_id];
        const resourceId = resourceInfo.resourceinstanceid;

        const info = document.createElement('div');
        info.className = 'flyout-result-info';

        const header = document.createElement('div');
        header.className = 'flyout-result-header';
        
        const icon = document.createElement('i');
        
        icon.className = resourceTypeInfo && resourceTypeInfo.icon ? resourceTypeInfo.icon : 'fa fa-question';
        resourceInfo.icon = icon.className;

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
        aggregateCheckbox.id = `aggregate-${resourceId}`;
        aggregateCheckbox.name = `aggregate-${resourceId}`;
        aggregateCheckbox.checked = this.selectedForLayer.has(resourceId);

        if (this.currentlySelectedGraphId !== null && this.currentlySelectedGraphId !== resourceInfo.graph_id) {
            aggregateCheckbox.disabled = true;
            aggregateCheckbox.title = 'You can only select resources of the same type for layer creation.';
            aggregateCheckbox.style.cursor = 'not-allowed';
        } else {
            aggregateCheckbox.title = 'Aggregate resources of this type into a single layer';        
            aggregateCheckbox.style.cursor = 'pointer';
        }
        
        item.classList.toggle('aggregated', aggregateCheckbox.checked);

        aggregateCheckbox.addEventListener('change', () => {
            if (aggregateCheckbox.checked) {
                this.selectedForLayer.set(resourceId, resourceInfo);
                this.currentlySelectedGraphId = resourceInfo.graph_id;
                this._updateAggregateCheckboxesState();
                this.selectAllButton.disabled = false;
            } else {
                this.selectedForLayer.delete(resourceId);
                if (this.selectedForLayer.size === 0) {
                    this.currentlySelectedGraphId = null;
                    this.selectAllButton.disabled = true;
                    this.selectAllButton.textContent = this.LABELS.SELECT_ALL;
                }
                this._updateAggregateCheckboxesState();
            }
            item.classList.toggle("aggregated", aggregateCheckbox.checked);
            this._updateCreateLayerButtonState(); 
            
            if (this.currentlySelectedGraphId) {
                const allOfTypeSelected = this._areAllOfTypeSelected();
                if (allOfTypeSelected) {
                    this.selectAllButton.textContent = this.LABELS.UNSELECT_ALL;
                } else {
                    this.selectAllButton.textContent = this.LABELS.SELECT_ALL;
                }
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
                    name: resourceInfo.displayname,
                    description: resourceInfo.displaydescription,
                    type: resourceInfo.type,
                    geometryFeatures: extractGeommetryFeaturesFromArchesResourceInfo(resourceInfo) || []
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

        if (itemShouldBeActive) {
            this.activeRenderedItemRefs.set(resourceId, {
                item: item,
                aggregateCheckbox: aggregateCheckbox,
                graphId: resourceInfo.graph_id,
            });
        }
        
        return item;
    }

    _removeAllPreviews() {
        EventBusInstance.publish(events.PREVIEW_REMOVE_ALL);
        this.previewedIds.clear();
    }
}