// import arches from 'arches';

export class FlyoutView {
    constructor(parentElement) {
        this.container = document.createElement('div');
        this.container.className = 'flyout';
        parentElement.appendChild(this.container);

        this._buildLayout();
    }

    _buildLayout() {
        this.content = document.createElement('div');
        this.content.className = 'flyout-content';

        this.header = document.createElement('div');
        this.header.className = 'flyout-header';

        this.title = document.createElement('h4');
        this.title.className = 'flyout-title';
        this.title.textContent = 'Add Resource Layer';

        this.subtitle = document.createElement('p');
        this.subtitle.className = 'flyout-subtitle';
        this.subtitle.textContent = 'Search resources and add them to the map.';

        this.header.appendChild(this.title);
        this.header.appendChild(this.subtitle);

        this.filters = document.createElement('div');
        this.filters.className = 'flyout-filters';

        this.searchInput = document.createElement('input');
        this.searchInput.className = 'flyout-search-input';
        this.searchInput.type = 'search';
        this.searchInput.placeholder = 'Search resources...';
        this.searchInput.setAttribute('aria-label', 'Search resources');

        this.typeSelect = document.createElement('select');
        this.typeSelect.className = 'flyout-type-select';
        this.typeSelect.setAttribute('aria-label', 'Filter by resource type');

        const options = [
            { value: '', label: 'All types' },
            { value: 'heritage-place', label: 'Heritage Places' },
            { value: 'information-resource', label: 'Information Resources' },
            { value: 'activity', label: 'Activities' },
            { value: 'actor', label: 'Actors' }
        ];

        options.forEach(({ value, label }) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = label;
            this.typeSelect.appendChild(option);
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
}