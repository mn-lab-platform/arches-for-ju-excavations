define([
    'knockout',
    'arches',
    'templates/views/components/workflows/context-footprint-addition/coordinates-addition-step.htm',
    'services/resource-service'
], function(ko, arches, template, resourceServiceModule) {
    return ko.components.register('coordinates-addition-step', {
        viewModel: function(params) {
            const self = this;
            const resourceService = resourceServiceModule.default || resourceServiceModule;

            if (typeof params.value !== 'function') {
                params.value = ko.observable('');
            }

            self.value = params.value;
            self.form = params.form || null;

            self.graphId = params.graphId;
            self.resourceId = params.resourceId;

            self.resourceDisplayName = ko.observable('');
            self.resourceTypeLabel = ko.observable(''); 
            self.coordinatesText = ko.observable('');
            self.coordinatesHtml = ko.observable('');
            self.coordinatesValid = ko.observable(false);
            self.successMessage = ko.observable('');
            self.infoMessage = ko.observable('');
            self.errorMessage = ko.observable('');
            self.errorLines = ko.observableArray([]);
            self.editorElement = null;
            self.delimiter = ko.observable(' ');
            self.ignoreLastLine = ko.observable(false);

            const resourceTypeLabels = {
                '2c536779-d3e6-43ef-bc0c-cd4d97dc8c6c': 'Context',
                'cc91f1ff-6ea8-422c-be14-b818660f66f8': 'Trench',
                'ac939663-80ce-43df-967d-42def45ef333': 'Special Find'
            };

            if (self.resourceId) {
                resourceService.getOne(self.resourceId)
                    .then(function(resource) {
                        self.resourceDisplayName(
                            resource.displayname || self.resourceId
                        );
                        self.resourceTypeLabel(
                            resourceTypeLabels[self.graphId] || 'Unknown resource type'
                        );
                    })
                    .catch(function(error) {
                        console.error('Error fetching resource:', error);
                        self.resourceDisplayName(self.resourceId);
                        self.resourceTypeLabel(
                            resourceTypeLabels[self.graphId] || 'Unknown resource type'
                        );
                    });
            }
            
            self.detectDelimiter = function(text) {
                if (!text) return ' ';
                
                const firstLine = (text.split('\n').find(l => l.trim().length > 0) || '').trim();
                
                const gaps = firstLine.match(/\s+/g);
                
                if (!gaps || gaps.length === 0) return ' ';
                
                const firstGap = gaps[0];
                const isConsistent = gaps.every(gap => gap === firstGap);
                
                if (!isConsistent) {
                    return null;
                }
                
                return firstGap;
            };
            
            let debounceTimeout = null;

            self.handleCoordinatesInput = function(data, event) {
                self.editorElement = event.target;
                const text = event.target.innerText.replace(/\u00A0/g, ' ');
                
                self.delimiter(self.detectDelimiter(text));
                self.coordinatesText(text);
                
                if (debounceTimeout) {
                    clearTimeout(debounceTimeout);
                }
                debounceTimeout = setTimeout(function() {
                    self._coordinatesTextIsValid();
                }, 500);
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

                const lastNonEmptyIndex = (() => {
                    for (let i = lines.length - 1; i >= 0; i--) {
                        if (lines[i].trim().length > 0) return i;
                    }
                    return -1;
                })();

                const htmlLines = lines.map((line, index) => {
                    const isEmpty = line.trim().length === 0;
                    if (isEmpty) {
                        return line; 
                    }

                    if (self.ignoreLastLine() && index === lastNonEmptyIndex) {
                        return line + '<span title="Line is ignored" class="ignore-line-indicator visible"><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#3b82f6"/></svg></span>';
                    }
                    
                    const hasError = errorLineIndices.includes(index);
                    const indicator = hasError 
                        ? '<span title="Line contains error" class="error-indicator visible"><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="red"/></svg></span>' 
                        : '<span class="error-indicator"></span>';
                    return line + indicator;
                }).join('\n');

                self.coordinatesHtml(htmlLines);
                self.coordinatesHtml.valueHasMutated();

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
                    self.errorMessage('');
                    self.infoMessage('Enter coordinates as: X Y Z or ID X Y Z');
                    self.value(null);
                    return false;
                }
                
                const allLines = text.split('\n');
                const delimiter = self.delimiter();
                const lastNonEmptyIndex = (() => {
                    for (let i = allLines.length - 1; i >= 0; i--) {
                        if (allLines[i].trim().length > 0) return i;
                    }
                    return -1;
                })();

                if (!delimiter) {
                    self.errorLines(allLines.map((_, index) => index));
                    self.updateDisplay();
                    self.coordinatesValid(false);
                    self.successMessage('');
                    self.infoMessage('');
                    self.errorMessage('Inconsistent spacing detected in the first line. Please use the exact same separator between all values.');
                    self.value(null);
                    return false;
                }

                const coordinateLineRegex = new RegExp(`^(?:([a-zA-Z0-9_.-]+)${delimiter})?(-?\\d+[.,]?\\d+)${delimiter}(-?\\d+[.,]?\\d+)${delimiter}(-?\\d+[.,]?\\d+)$`);

                const errorLineIndices = [];
                let allValid = true;

                allLines.forEach((line, index) => {
                    if (self.ignoreLastLine() && index === lastNonEmptyIndex) {
                        return;
                    }

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
                    self.infoMessage('');
                    self.successMessage('Coordinates are valid you may proceed further.');
                    
                    self.value({
                        text: self.coordinatesText(),
                        ignoreLastLine: self.ignoreLastLine()
                    });
                } else {
                    self.coordinatesValid(false);
                    self.successMessage('');
                    self.infoMessage('');
                    self.errorMessage('Some lines contain invalid format. Please correct them to proceed.');
                    self.value(null);
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
                    else if (parts.length === 3) {
                        [parts[0], parts[1]] = [parts[1], parts[0]];
                        return parts.join(delimiter);
                    }
                    return line;
                });
                self.coordinatesText(reordered.join('\n'));
                self._coordinatesTextIsValid();
            };

            self.toggleIgnoreLastLine = function() {
                self.ignoreLastLine(!self.ignoreLastLine());
                self._coordinatesTextIsValid();
            }

            if (self.form) {
                self.form.value = self.value;
            }

            (function initFromSaved() {
                const initial = typeof self.value === 'function' ? self.value() : self.value;
                let text = '';
                let ignore = false;
                
                if (initial && typeof initial === 'object') {
                    text = initial.text || '';
                    ignore = initial.ignoreLastLine || false;
                } else {
                    text = initial || '';
                }

                self.coordinatesText(text);
                self.ignoreLastLine(ignore);
                self.delimiter(self.detectDelimiter(text));
                self._coordinatesTextIsValid();
            })();
        },
        template: template
    });
});