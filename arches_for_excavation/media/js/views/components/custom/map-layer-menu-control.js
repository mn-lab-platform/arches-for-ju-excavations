define([
    'knockout',
    'templates/views/components/custom/map-layer-menu-control.htm'
], function(ko, template) {
    class MapLayerMenuControl {
        constructor(layers = []) {
            this._map = null;
            this._container = null;
            this._layers = Array.isArray(layers) ? layers : [];
        }

        setLayers(layers) {
            this._layers = Array.isArray(layers) ? layers : [];
            this._render();
        }

        onAdd(map) {
            this._map = map;
            this._container = document.createElement('div');
            this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
            this._container.style.background = '#fff';
            this._container.style.padding = '8px';
            this._container.style.minWidth = '220px';
            this._container.style.maxHeight = '260px';
            this._container.style.overflow = 'auto';

            this._container.addEventListener('change', this._handleChange.bind(this));
            this._render();
            return this._container;
        }

        onRemove() {
            if (this._container && this._container.parentNode) {
                this._container.parentNode.removeChild(this._container);
            }
            this._map = null;
            this._container = null;
        }

        _render() {
            if (!this._container) return;

            const basemaps = this._items.filter(i => !i.isoverlay);
            const overlays = this._items.filter(i => !!i.isoverlay);

            const basemapHtml = basemaps.map(i => `
                <label style="display:block;margin:3px 0;">
                    <input type="radio" name="ml-basemap" data-kind="basemap" data-id="${i.id}" ${i.visible ? 'checked' : ''} />
                    ${i.name || i.id}
                </label>
            `).join('');

            const overlayHtml = overlays.map(i => `
                <label style="display:block;margin:3px 0;">
                    <input type="checkbox" data-kind="overlay" data-id="${i.id}" ${i.visible ? 'checked' : ''} />
                    ${i.name || i.id}
                </label>
            `).join('');

            this._container.innerHTML = `
                <div style="font-weight:600;margin-bottom:6px;">Map Layers</div>
                <div style="margin-bottom:8px;">
                    <div style="font-size:12px;color:#444;margin-bottom:4px;">Basemaps</div>
                    ${basemapHtml || '<div style="font-size:12px;color:#777;">No basemaps</div>'}
                </div>
                <div>
                    <div style="font-size:12px;color:#444;margin-bottom:4px;">Overlays</div>
                    ${overlayHtml || '<div style="font-size:12px;color:#777;">No overlays</div>'}
                </div>
            `;
        }

        _handleChange(evt) {
            const el = evt.target;
            if (!el || !this._map) return;

            const layerId = el.getAttribute('data-id');
            const kind = el.getAttribute('data-kind');
            if (!layerId || !kind) return;

            if (kind === 'basemap') {
                const basemapIds = this._items.filter(i => !i.isoverlay).map(i => i.id);
                basemapIds.forEach(id => this._setVisibility(id, id === layerId));
                this._items = this._items.map(i => i.isoverlay ? i : { ...i, visible: i.id === layerId });
            } else {
                const visible = !!el.checked;
                this._setVisibility(layerId, visible);
                this._items = this._items.map(i => i.id === layerId ? { ...i, visible } : i);
            }
        }

        _setVisibility(layerId, visible) {
            try {
                this._map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
            } catch (e) {
                // layer may not exist yet
            }
        }
    }

    return ko.components.register('map-layer-menu-control', {
        viewModel: function(params, componentInfo) {
            const self = this;
            self.map = params.map;       // map instance or observable
            self.layers = params.layers;   // [{id, name, isoverlay, visible}]
            self.position = params.position || 'top-left';
            self._subs = [];

            self._control = new MapLayerMenuControl({
                layers: ko.unwrap(self.layers) || []
            });

            const attach = function(map) {
                if (!map) return;
                try { map.addControl(self._control, self.position); } catch (e) {}
            };

            attach(ko.unwrap(self.map));

            if (ko.isObservable(self.map)) {
                self._subs.push(self.map.subscribe(attach));
            }
            if (ko.isObservable(self.layers)) {
                self._subs.push(self.layers.subscribe(function(layers) {
                    self._control.setLayers(layers || []);
                }));
            }

            ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function() {
                self._subs.forEach(s => { try { s.dispose(); } catch (e) {} });
                const map = ko.unwrap(self.map);
                if (map && self._control) {
                    try { map.removeControl(self._control); } catch (e) {}
                }
            });
        },
        template: template
    });
});