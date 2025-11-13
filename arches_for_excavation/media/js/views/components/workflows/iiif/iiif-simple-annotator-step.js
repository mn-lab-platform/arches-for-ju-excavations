define([
  'knockout',
  'leaflet',
  'arches',
  'templates/views/components/workflows/iiif/iiif-simple-annotator-step.htm'
], function(ko, L, arches, template) {

  function viewModel(params) {
    var self = this;

    console.log('[WF LOG] Annotator init, params.imageServiceUrl =', params.imageServiceUrl, 'typeof =', typeof params.imageServiceUrl);

    if (ko.isObservable(params.imageServiceUrl)) {
      this.imageServiceUrl = params.imageServiceUrl;
    } else {
      this.imageServiceUrl = ko.observable(params.imageServiceUrl || '');
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

  return ko.components.register('iiif-simple-annotator-step', {
    viewModel: viewModel,
    template: template
  });
});
