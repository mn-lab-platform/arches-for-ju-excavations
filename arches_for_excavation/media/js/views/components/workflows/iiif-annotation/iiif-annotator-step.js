define([
  'knockout',
  'leaflet',
  'arches',
  'templates/views/components/workflows/iiif-annotation/iiif-annotator-step.htm'
], function(ko, L, arches, template) {

  function viewModel(params) {
    var self = this;

    console.log('[WF LOG] Annotator init, params.imageServiceUrl =', params.imageServiceUrl, 'typeof =', typeof params.imageServiceUrl);

    if (ko.isObservable(params.imageServiceUrl)) {
      this.imageServiceUrl = params.imageServiceUrl;
    } else {
      this.imageServiceUrl = ko.observable(params.imageServiceUrl || '');
    }

    // Node ID for the IIIF URL (must match your graph definition)
    var DIGITAL_RES_URL_NODE_ID = 'e0216dc7-89ba-4a27-9126-bf7e06d859a8';

    function updateUrlFromValue(val) {
      if (!val) return;
      console.log('[WF LOG] Annotator params.value update:', val);

      // 1. If the value object already has imageServiceUrl (direct pass)
      if (val.imageServiceUrl) {
        self.imageServiceUrl(val.imageServiceUrl);
        return;
      }

      // 2. If it looks like a tile ID (string or object with tileid)
      var tileId = (val && typeof val === 'object' && val.tileid) ? val.tileid : val;
      
      // Check if it is a valid UUID string
      if (typeof tileId === 'string' && tileId.length > 30) {
        var baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
        var tileUrl = (arches.urls && arches.urls.api_tile) ? arches.urls.api_tile : (baseUrl + 'tile');
        if (!tileUrl.endsWith('/')) tileUrl += '/';
        tileUrl += tileId;

        fetch(tileUrl)
          .then(function(r) { return r.json(); })
          .then(function(data) {
            if (data && data.data && data.data[DIGITAL_RES_URL_NODE_ID]) {
              var urlVal = data.data[DIGITAL_RES_URL_NODE_ID];
              var url = null;
              
              // Handle Arches complex values (which are often objects like { "en": { "value": "...", ... } })
              if (typeof urlVal === 'string') {
                url = urlVal;
              } else if (urlVal && typeof urlVal === 'object') {
                var keys = Object.keys(urlVal);
                if (keys.length && urlVal[keys[0]] && urlVal[keys[0]].value) {
                  url = urlVal[keys[0]].value;
                }
              }
              
              if (url) {
                console.log('[WF LOG] Resolved URL from tile:', url);
                self.imageServiceUrl(url);
              }
            }
          })
          .catch(function(e) { console.error('[WF LOG] Tile fetch error:', e); });
      }
    }

    // Subscribe to params.value changes
    if (params.value) {
      if (ko.isObservable(params.value)) {
        params.value.subscribe(updateUrlFromValue);
        updateUrlFromValue(params.value());
      } else {
        updateUrlFromValue(params.value);
      }
    }

    console.log('[WF LOG] Annotator effective URL =', this.imageServiceUrl());

    this.map = null;
    this.annotations = ko.observableArray([]);

    this.imageServiceUrl.subscribe(function(newVal) {
      console.log('[WF LOG] Annotator URL changed ->', newVal);
      if (newVal && self.map && L.tileLayer && L.tileLayer.iiif) {
        try {
          L.tileLayer.iiif(newVal.replace(/\/info\.json$/, '') + '/info.json').addTo(self.map);
        } catch (e) {
          console.error('[WF LOG] IIIF add error:', e);
        }
      }
    });

    this.afterMapRender = function(element) {
      // element comes from the template afterRender wrapper; get the #annotation-map div
      var container = (element && element.querySelector) ? element.querySelector('#annotation-map') : document.getElementById('annotation-map');
      console.log('[WF LOG] afterMapRender container =', container);

      self.map = L.map(container, {
        crs: L.CRS.Simple,
        center: [0, 0],
        zoom: 0,
        minZoom: -5,
        maxZoom: 5
      });
      console.log('[WF LOG] Leaflet map created');

      var url = (self.imageServiceUrl() || '').replace(/\/info\.json$/, '');
      console.log('[WF LOG] will load IIIF from =', url);

      if (url && L.tileLayer && L.tileLayer.iiif) {
        try {
          var iiifLayer = L.tileLayer.iiif(url + '/info.json');
          iiifLayer.addTo(self.map);
          iiifLayer.on('load', function() {
            if (iiifLayer && iiifLayer.options && iiifLayer.options.bounds) {
              self.map.fitBounds(iiifLayer.options.bounds);
            }
          });
        } catch (e) {
          console.error('[WF LOG] IIIF layer load error:', e);
        }
      }

      // minimal drawing (optional)
      var drawnItems = new L.FeatureGroup();
      self.map.addLayer(drawnItems);
      var drawControl = new L.Control.Draw({
        edit: { featureGroup: drawnItems, remove: true },
        draw: { polygon: true, rectangle: true, circle: true, marker: true, polyline: true, circlemarker: false }
      });
      self.map.addControl(drawControl);

      self.map.on(L.Draw.Event.CREATED, function(e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);
        self.annotations.push({
          id: 'annotation-' + Date.now(),
          type: e.layerType,
          geometry: layer.toGeoJSON().geometry,
          created: new Date().toISOString()
        });
      });
    };

    params.form.save = function() {
      // make annotations available later if needed
      self.data = {
        imageServiceUrl: self.imageServiceUrl(),
        annotations: self.annotations()
      };
      return Promise.resolve(true);
    };

    return self;
  }

  return ko.components.register('iiif-annotator-step', {
    viewModel: viewModel,
    template: template
  });
});
