define([
    'knockout',
    'arches',
    'templates/views/components/workflows/context-footprint-addition/coordinates-addition-step.htm',
], function(ko, arches, template) {
    return ko.components.register('coordinates-addition-step', {
        viewModel: function(params) {
            const self = this;

            if (typeof params.value !== 'function') {
                params.value = ko.observable('');
            }
            self.value = params.value;

            self.form = params.form || null;

            self.coordinatesText = ko.observable('');
            self.coordinatesHtml = ko.observable('');
            self.coordinatesValid = ko.observable(false);
            self.successMessage = ko.observable('');
            self.errorMessage = ko.observable('');
            self.errorLines = ko.observableArray([]);
            self.editorElement = null;
            self.delimiter = ko.observable(' ');

            let debounceTimeout = null;
            
            self.detectDelimiter = function(text) {
                return text.includes('\t') ? '\t' : ' ';
            };

            self.handleCoordinatesInput = function(data, event) {
                self.editorElement = event.target;
                const text = event.target.innerText;
                self.delimiter(self.detectDelimiter(text));
                self.coordinatesText(text);
                
                if (debounceTimeout) {
                    clearTimeout(debounceTimeout);
                }
                debounceTimeout = setTimeout(function() {
                    self._coordinatesTextIsValid();
                }, 300);
            };

            self.updateDisplay = function() {
                let cursorIndex = -1;
                const selection = window.getSelection();
                if (self.editorElement && document.activeElement === self.editorElement && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(self.editorElement);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    cursorIndex = preCaretRange.toString().length;
                }

                const text = self.coordinatesText();
                const lines = text.split('\n');
                const errorLineIndices = self.errorLines();

                const htmlLines = lines.map((line, index) => {
                    const hasError = errorLineIndices.includes(index);
                    const indicator = hasError 
                        ? '<span title="Line contains error" class="error-indicator visible"><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="red"/></svg></span>' 
                        : '<span class="error-indicator"></span>';
                    return line + indicator;
                }).join('\n');

                self.coordinatesHtml(htmlLines);

                if (cursorIndex >= 0) {
                    setTimeout(() => {
                        const walker = document.createTreeWalker(self.editorElement, NodeFilter.SHOW_TEXT, null, false);
                        let charCount = 0;
                        while (walker.nextNode()) {
                            const node = walker.currentNode;
                            if (charCount + node.length >= cursorIndex) {
                                const range = document.createRange();
                                range.setStart(node, cursorIndex - charCount);
                                range.collapse(true);
                                selection.removeAllRanges();
                                selection.addRange(range);
                                break;
                            }
                            charCount += node.length;
                        }
                    }, 0);
                }
            };

            self._coordinatesTextIsValid = function() {
                const text = self.coordinatesText();
                if (text.trim().length === 0) {
                    self.errorLines([]);
                    self.updateDisplay();
                    self.coordinatesValid(false);
                    self.successMessage('');
                    self.errorMessage('Please enter coordinates to proceed.');
                    self.value(null);
                    if (self.form) {
                        if (ko.isObservable(self.form.complete)) {
                            self.form.complete(false);
                        } else {
                            self.form.complete = false;
                        }
                    }
                    return false;
                }
                const allLines = text.split('\n');
                const coordinateLineRegex = /^([a-zA-Z0-9_.-]+)\s+(-?\d+[.,]?\d+)\s+(-?\d+[.,]?\d+)\s+(-?\d+[.,]?\d+)$/;

                const errorLineIndices = [];
                let allValid = true;

                allLines.forEach((line, index) => {
                    const trimmedLine = line.trim();
                    if (trimmedLine.length === 0) return;
                    const match = trimmedLine.match(coordinateLineRegex);
                    if (!match) {
                        allValid = false;
                        errorLineIndices.push(index);
                    }
                });

                self.errorLines(errorLineIndices);
                self.updateDisplay();

                if (allValid) {
                    self.coordinatesValid(true);
                    self.errorMessage('');
                    self.successMessage('Coordinates are valid you may proceed further.');
                    self.value(self.coordinatesText());
                } else {
                    self.coordinatesValid(false);
                    self.successMessage('');
                    self.errorMessage('Some lines contain invalid format. Please correct them to proceed.');
                    self.value(null);
                }

                if (self.form) {
                    if (ko.isObservable(self.form.complete)) {
                        self.form.complete(self.coordinatesValid());
                    } else {
                        self.form.complete = self.coordinatesValid();
                    }
                }

                return allValid;
            };

            self.reorderCoordinates = function() {
                const delimiter = self.delimiter();
                const lines = self.coordinatesText().split('\n');
                const reordered = lines.map(line => {
                    const parts = line.trim().split(delimiter);
                    if (parts.length === 4) {
                        [parts[1], parts[2]] = [parts[2], parts[1]];
                        return parts.join(delimiter);
                    }
                    return line;
                });
                self.coordinatesText(reordered.join('\n'));
                self._coordinatesTextIsValid();
            };

            if (self.form) {
                self.form.value = self.value;
            }

            (function initFromSaved() {
                const initial = typeof self.value === 'function' ? self.value() : self.value;
                const text = initial || '';
                self.coordinatesText(text);
                self.delimiter(self.detectDelimiter(text));
                self._coordinatesTextIsValid();
            })();
        },
        template: template
    });
});