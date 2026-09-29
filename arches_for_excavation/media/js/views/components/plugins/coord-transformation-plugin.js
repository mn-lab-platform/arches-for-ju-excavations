import ko from 'knockout';
import proj4 from 'proj4';
import viewerTemplate from 'templates/views/components/plugins/coord-transformation-plugin.htm';
import coordLogic from '../../../coord-transformation-plugin/src/index.js';

export default ko.components.register('coord-transformation-plugin', {
    viewModel: function(params) {
    const self = this;

    self.coordinatesText = ko.observable(null);
    self.coordinatesHtml = ko.observable(null);
    
    self.statusMessage = ko.observable('');

    self.coordinatesValid = ko.observable(false);

    self.inputCrsName = ko.observable('');
    self.outputCrsName = ko.observable('');
    self.inputCrsCode = ko.observable(null);
    self.outputCrsCode = ko.observable(null);
    self.inputCrsOptions = ko.observableArray([]);
    self.outputCrsOptions = ko.observableArray([]);

    self.canCompute = ko.computed(function() {
      return self.coordinatesValid()
        && self.inputCrsCode()
        && self.outputCrsCode();
    });

    let debounceTimeout = null;
    const crsSearchSequences = { input: 0, output: 0 };

    self._setSelectedCrsCode = function(type, event) {
      const selectedOption = Array.from(event.target.list.options).find(
        option => option.value === event.target.value
      );
      const code = selectedOption ? selectedOption.dataset.code : null;

      if (type === 'input') {
        self.inputCrsCode(code);
      } else {
        self.outputCrsCode(code);
      }
    };

    self._searchCrs = async function(type, event) {
      self._setSelectedCrsCode(type, event);
      const query = event.target.value.trim();
      const sequence = ++crsSearchSequences[type];

      if (query.length < 2) {
        (type === 'input' ? self.inputCrsOptions : self.outputCrsOptions)([]);
        return;
      }

      try {
        const response = await fetch(`/api/crs/search?q=${encodeURIComponent(query)}`, {
          credentials: 'same-origin',
          headers: { Accept: 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to search CRS definitions.');
        if (sequence !== crsSearchSequences[type]) return;

        (type === 'input' ? self.inputCrsOptions : self.outputCrsOptions)(data.results || []);
      } catch (error) {
        console.error('Unable to search CRS definitions.', error);
      }
    };

    self.searchInputCrs = function(data, event) {
      return self._searchCrs('input', event);
    };

    self.searchOutputCrs = function(data, event) {
      return self._searchCrs('output', event);
    };

    self._getCsrfToken = function() {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='));
      return cookie ? decodeURIComponent(cookie.split('=')[1]) : '';
    };

    self._transformCoordinates = async function(text, fromCode, toCode) {
      const delimiter = coordLogic.detectDelimiter(text);
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
      const response = await fetch('/api/crs/transform', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': self._getCsrfToken(),
        },
        body: JSON.stringify({
          source: fromCode,
          target: toCode,
          coordinates: coordinates.map(({ x, y }) => [x, y]),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to transform coordinates.');

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
          self.inputCrsCode(),
          self.outputCrsCode()
        );
        self.coordinatesText(transformedText);
        self._processAndUpdateCoordUI();
      } catch (error) {
        console.error('Unable to transform coordinates.', error);
      }
    };
    
    self.handleCoordinatesInput = function(data, event) {
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
      const cursorIndex = coordLogic.getCursorIndex(self.editorElement);
      const result = coordLogic.processCoordinates(text);
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
        console.log('Some lines contain invalid format. Please correct them to proceed.');
        self.coordinatesValid(false);
      }
  
      self.coordinatesHtml(result.htmlLines);
      self.coordinatesHtml.valueHasMutated();
  
      if (cursorIndex >= 0) {
        setTimeout(() => {
            coordLogic.setCursorIndex(self.editorElement, cursorIndex);
        }, 0);
      }
    };

    self.reorderCoordinates = function() {
        const newText = coordLogic.reorderCoordinatesLogic(self.coordinatesText(), coordLogic.detectDelimiter(self.coordinatesText()));
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
