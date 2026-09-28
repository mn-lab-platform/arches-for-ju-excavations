import ko from 'knockout';
import viewerTemplate from 'templates/views/components/plugins/coord-transformation-plugin.htm';
import coordLogic from '../../../coord-transformation-plugin/src/index.js';

export default ko.components.register('coord-transformation-plugin', {
    viewModel: function(params) {
    const self = this;

    self.coordinatesText = ko.observable(null);
    self.coordinatesHtml = ko.observable(null);
    
    self.statusMessage = ko.observable('');

    self.coordinatesValid = ko.observable(false);

    let debounceTimeout = null;
    
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
  
      if (result.isEmpty) {
        self.coordinatesHtml('');
        self.coordinatesValid(false);
        self.statusMessage('Enter coordinates as: X Y Z or ID X Y Z');
        console.log('Enter coordinates as: X Y Z or ID X Y Z');
      }
  
      if (result.delimiterError) {
        self.coordinatesValid(false);
        self.statusMessage('Inconsistent spacing detected in the first line. Please use the exact same separator between all values.');
        console.log('Inconsistent spacing detected in the first line. Please use the exact same separator between all values.');
      } else {
        if (result.allValid) {
            self.statusMessage('Coordinates are valid. You may proceed further.');
            console.log('Coordinates are valid you may proceed further.');
            self.coordinatesValid(result.allValid);
        } else {
            self.statusMessage('Some lines contain invalid format. Please correct them to proceed.');
            console.log('Some lines contain invalid format. Please correct them to proceed.');
            self.coordinatesValid(false);
        }
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

    },
    template: viewerTemplate
});
