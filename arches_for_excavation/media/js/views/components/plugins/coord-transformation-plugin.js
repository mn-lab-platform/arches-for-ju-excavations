import 'maplibre-gl/dist/maplibre-gl.css';

import ko from 'knockout';
import viewerTemplate from 'templates/views/components/plugins/coord-transformation-plugin.htm';
import utils from '../../../coord-transformation-plugin/src/utils.js';
import { searchDefinitionsByQuery, transformCoordinates } from '../../../coord-transformation-plugin/src/api/crsService.js';
import { Map } from 'maplibre-gl';

export default ko.components.register('coord-transformation-plugin', {
    viewModel: function(params) {
    const self = this;

    self.coordinatesText = ko.observable(null);
    self.coordinatesHtml = ko.observable(null);
    
    self.statusMessage = ko.observable('');

    self.coordinatesValid = ko.observable(false);

    self.sourceCrsName = ko.observable('');
    self.targetCrsName = ko.observable('');
    self.sourceCrsCode = ko.observable(null);
    self.targetCrsCode = ko.observable(null);
    self.sourceCrsOptions = ko.observableArray([]);
    self.targetCrsOptions = ko.observableArray([]);
    self.sourceCrsSuggestions = ko.pureComputed(function() {
      return self.sourceCrsOptions().slice(0, 5);
    });
    self.targetCrsSuggestions = ko.pureComputed(function() {
      return self.targetCrsOptions().slice(0, 5);
    });

    self.canCompute = ko.computed(function() {
      return self.coordinatesValid()
        && self.sourceCrsCode()
        && self.targetCrsCode();
    });

    self.map = new Map({
      container: 'map-container',
      style: 'https://demotiles.maplibre.org/style.json',
      zoom: 6,
      maxZoom: 25
    });

    let debounceTimeout = null;
    const crsSearchSequences = { source: 0, target: 0 };

    self._setSelectedCrsCode = function(type, crs) {
      const name = crs.is_local ? crs.name : `${crs.name} (EPSG:${crs.code})`;

      if (type === 'source') {
        self.sourceCrsName(name);
        self.sourceCrsCode(crs.code);
        self.sourceCrsOptions([]);
      } else {
        self.targetCrsName(name);
        self.targetCrsCode(crs.code);
        self.targetCrsOptions([]);
      }
    };

    self._searchCrs = async function(type, event) {
      const query = event.target.value.trim();
      const sequence = ++crsSearchSequences[type];

      if (type === 'source') {
        self.sourceCrsCode(null);
      } else {
        self.targetCrsCode(null);
      }

      if (query.length < 2) {
        (type === 'source' ? self.sourceCrsOptions : self.targetCrsOptions)([]);
        return;
      }

      try {
        const data = await searchDefinitionsByQuery(query);

        if (sequence !== crsSearchSequences[type]) return;

        (type === 'source' ? self.sourceCrsOptions : self.targetCrsOptions)(data.results || []);
      } catch (error) {
        console.error('Unable to search CRS definitions.', error);
      }
    };

    self.searchSourceCrs = function(data, event) {
      return self._searchCrs('source', event);
    };

    self.searchTargetCrs = function(data, event) {
      return self._searchCrs('target', event);
    };

    self.selectSourceCrs = function(crs) {
      self._setSelectedCrsCode('source', crs);
    };

    self.selectTargetCrs = function(crs) {
      self._setSelectedCrsCode('target', crs);
    };

    self._transformCoordinates = async function(text, fromCode, toCode) {
      const delimiter = utils.detectDelimiter(text);
      if (!delimiter) throw new Error('Coordinates must use a consistent delimiter.');

      const lines = text.split('\n');
      const coordinates = lines.filter(line => line.trim()).map(line => {
        if (!line.trim()) return line;

        const parts = line.trim().split(delimiter);
        const hasLabel = parts.length === 4;
        if (!hasLabel && parts.length !== 3) {
          throw new Error('Each coordinate line must contain X Y Z or ID X Y Z.');
        }

        const offset = hasLabel ? 1 : 0;
        const x = Number(parts[offset].replace(',', '.'));
        const y = Number(parts[offset + 1].replace(',', '.'));
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
          throw new Error('Coordinate values must be numbers.');
        }

        return { parts, hasLabel, offset, x, y };
      });

      const data = await transformCoordinates(fromCode, toCode, coordinates.map(c => [c.x, c.y]));

      let coordinateIndex = 0;
      return lines.map(line => {
        if (!line.trim()) return line;

        const { parts, hasLabel, offset } = coordinates[coordinateIndex];
        const [transformedX, transformedY] = data.coordinates[coordinateIndex++];
        const transformedParts = hasLabel ? [parts[0]] : [];
        transformedParts.push(
          transformedX.toFixed(10),
          transformedY.toFixed(10),
          parts[offset + 2]
        );
        return transformedParts.join(delimiter);
      }).join('\n');
    };

    self.computeAndDisplay = async function() {
      try {
        const transformedText = await self._transformCoordinates(
          self.coordinatesText(),
          self.sourceCrsCode(),
          self.targetCrsCode()
        );
        self.coordinatesText(transformedText);
        self._processAndUpdateCoordUI();
      } catch (error) {
        console.error('Unable to transform coordinates.', error);
      }
    };
    
    self.handleCoordinatessource = function(data, event) {
        self.editorElement = event.target;
        const text = event.target.innerText.replace(/\u00A0/g, ' ');
        self.coordinatesText(text);
        
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(function() {
          self._processAndUpdateCoordUI();
        }, 500);
    };

    self._processAndUpdateCoordUI = function() {
      const text = self.coordinatesText();
      const cursorIndex = utils.getCursorIndex(self.editorElement);
      const result = utils.processCoordinates(text);
      console.log('Processing coordinates result:', result);
  
      if (result.isEmpty) {
        self.coordinatesHtml('');
        self.coordinatesValid(false);
        self.statusMessage('Enter coordinates as: X Y Z or ID X Y Z');
        console.log('Enter coordinates as: X Y Z or ID X Y Z');
      }
      else if (result.delimiterError) {
        self.coordinatesValid(false);
        self.statusMessage('Inconsistent spacing detected in the first line. Please use the exact same separator between all values.');
        console.log('Inconsistent spacing detected in the first line. Please use the exact same separator between all values.');
      }
      else if (result.allValid) {
        self.statusMessage('Coordinates are valid. You may proceed further.');
        console.log('Coordinates are valid you may proceed further.');
        self.coordinatesValid(result.allValid);
      }
      else {
        self.statusMessage('Some lines contain invalid format. Please correct them to proceed.');
        self.coordinatesValid(false);
      }
  
      self.coordinatesHtml(result.htmlLines);
      self.coordinatesHtml.valueHasMutated();
  
      if (cursorIndex >= 0) {
        setTimeout(() => {
            utils.setCursorIndex(self.editorElement, cursorIndex);
        }, 0);
      }
    };

    self.reorderCoordinates = function() {
        const newText = utils.reorderCoordinatesLogic(self.coordinatesText(), utils.detectDelimiter(self.coordinatesText()));
        self.coordinatesText(newText);
        self._processAndUpdateCoordUI();
    };

    self.resetCoordinates = function() {
      window.alert('This functionality is not yet implemented. It will be available in a future update.');
    };

    self.copyCoordinatesToClipboard = function() {
      navigator.clipboard.writeText(self.coordinatesText()).then(() => {
        self.statusMessage('Coordinates copied to clipboard.');
      }, (err) => {
        self.statusMessage('Failed to copy coordinates to clipboard.');
      });
    }

    },
    template: viewerTemplate
});
