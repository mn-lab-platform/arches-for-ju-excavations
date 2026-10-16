define([
    'knockout',
    'arches',
    'templates/views/components/workflows/bone-csv-visualization/bone-csv-visualization-step.htm'
], function(ko, arches, template) {
    const IMAGE_WIDTH = 771;
    const IMAGE_HEIGHT = 1374;
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const LOG_PREFIX = '[bone-csv-visualization-step]';

    // Temporary regions for the prototype image. Replace their points with the
    // final expert-approved pixel coordinates without changing the CSV workflow.
    const BONE_REGIONS = {
        cranium: {
            label: 'Cranium',
            points: '377,57 438,47 497,58 536,94 552,137 529,178 489,207 438,210 400,188 378,151'
        },
        mandible: {
            label: 'Mandible',
            points: '310,247 350,250 386,273 430,278 478,265 520,242 535,278 526,329 494,366 451,383 400,378 351,354 319,315'
        },
        pelvis: {
            label: 'Pelvis',
            points: '335,731 375,714 417,724 449,753 482,724 524,713 548,748 542,801 522,852 486,891 451,906 411,895 371,861 344,811'
        },
        femur_left: {
            label: 'Left femur',
            points: '548,798 574,783 597,798 605,837 598,894 588,947 593,1001 600,1040 587,1065 563,1067 552,1034 558,980 553,924 543,860'
        },
        femur_right: {
            label: 'Right femur',
            points: '274,797 299,784 322,796 330,835 323,895 313,949 318,1004 326,1043 311,1068 286,1060 278,1021 284,968 280,914 269,856'
        }
    };

    const COLUMN_ALIASES = {
        id: ['id', 'record_id', 'row_id', 'lp'],
        boneId: ['bone_id', 'id_kosci', 'kosc', 'bone'],
        description: ['description', 'opis', 'note', 'uwagi']
    };

    function normalizeHeader(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase()
            .replace(/[\s\-/]+/g, '_')
            .replace(/[^a-z0-9_]+/g, '')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
    }

    function countDelimiter(line, delimiter) {
        let count = 0;
        let inQuotes = false;

        for (let index = 0; index < line.length; index += 1) {
            if (line[index] === '"') {
                if (inQuotes && line[index + 1] === '"') {
                    index += 1;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (line[index] === delimiter && !inQuotes) {
                count += 1;
            }
        }
        return count;
    }

    function detectDelimiter(text) {
        const firstLine = text.split(/\r\n|\n|\r/).find(function(line) {
            return line.trim().length > 0;
        }) || '';
        const candidates = [';', ',', '\t'];

        return candidates.reduce(function(best, candidate) {
            return countDelimiter(firstLine, candidate) > countDelimiter(firstLine, best)
                ? candidate
                : best;
        }, ';');
    }

    function parseDelimitedText(sourceText) {
        const text = String(sourceText || '').replace(/^\uFEFF/, '').replace(/\u0000/g, '');
        if (!text.trim()) {
            throw new Error('The CSV file is empty.');
        }

        const delimiter = detectDelimiter(text);
        const rows = [];
        let row = [];
        let value = '';
        let inQuotes = false;

        for (let index = 0; index < text.length; index += 1) {
            const character = text[index];
            const nextCharacter = text[index + 1];

            if (character === '"' && inQuotes && nextCharacter === '"') {
                value += '"';
                index += 1;
            } else if (character === '"') {
                inQuotes = !inQuotes;
            } else if (character === delimiter && !inQuotes) {
                row.push(value);
                value = '';
            } else if ((character === '\n' || character === '\r') && !inQuotes) {
                if (character === '\r' && nextCharacter === '\n') {
                    index += 1;
                }
                row.push(value);
                if (row.some(function(cell) { return cell.trim().length > 0; })) {
                    rows.push(row);
                }
                row = [];
                value = '';
            } else {
                value += character;
            }
        }

        if (inQuotes) {
            throw new Error('The CSV contains an unclosed quoted value.');
        }

        row.push(value);
        if (row.some(function(cell) { return cell.trim().length > 0; })) {
            rows.push(row);
        }

        if (rows.length < 2) {
            throw new Error('The CSV must contain a header and at least one data row.');
        }

        const headers = rows[0].map(function(header) { return header.trim(); });
        const normalizedHeaders = headers.map(normalizeHeader);
        const dataRows = rows.slice(1).map(function(values) {
            const result = {};
            normalizedHeaders.forEach(function(header, index) {
                result[header] = String(values[index] || '').trim();
            });
            return result;
        });

        return {
            delimiter: delimiter,
            headers: headers,
            normalizedHeaders: normalizedHeaders,
            rows: dataRows
        };
    }

    function findColumn(headers, aliases) {
        return aliases.find(function(alias) {
            return headers.includes(alias);
        });
    }

    function decodeBuffer(buffer) {
        const bytes = new Uint8Array(buffer);
        if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) {
            return new TextDecoder('utf-16le').decode(bytes);
        }
        if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) {
            return new TextDecoder('utf-16be').decode(bytes);
        }
        return new TextDecoder('utf-8').decode(bytes);
    }

    function escapeXml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    function triggerDownload(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function logState(eventName, details) {
        console.info(LOG_PREFIX, eventName, details || {});
    }

    function annotationPageFromPayload(payload) {
        if (payload && payload.annotationPage) {
            return payload.annotationPage;
        }
        const canvas = payload && payload.manifest && Array.isArray(payload.manifest.items)
            ? payload.manifest.items[0]
            : null;
        return canvas && Array.isArray(canvas.annotations) ? canvas.annotations[0] : null;
    }

    function annotationBodyValue(annotation, purpose) {
        const bodies = Array.isArray(annotation && annotation.body)
            ? annotation.body
            : [annotation && annotation.body];
        const body = bodies.find(function(candidate) {
            return candidate && candidate.purpose === purpose;
        });
        return body ? String(body.value || '') : '';
    }

    function selectorPoints(annotation) {
        const selector = annotation && annotation.target && annotation.target.selector;
        if (!selector || !selector.value) return '';
        const match = String(selector.value).match(/<polygon\b[^>]*\bpoints=["']([^"']+)["']/i);
        return match ? match[1] : '';
    }

    function annotationsFromPayload(payload) {
        if (payload && payload.preview && Array.isArray(payload.preview.annotations)) {
            return payload.preview.annotations;
        }

        const annotationPage = annotationPageFromPayload(payload);
        const items = annotationPage && Array.isArray(annotationPage.items)
            ? annotationPage.items
            : [];
        return items.map(function(annotation, index) {
            const boneId = annotationBodyValue(annotation, 'tagging');
            const region = BONE_REGIONS[boneId] || {};
            const idParts = String(annotation.id || '').split(':');
            return {
                annotationId: 'bone-annotation-' + (index + 1),
                recordId: decodeURIComponent(idParts[idParts.length - 2] || String(index + 1)),
                boneId: boneId,
                label: region.label || boneId || 'Bone annotation',
                description: annotationBodyValue(annotation, 'commenting'),
                points: selectorPoints(annotation) || region.points || '',
                color: '#ff6b35'
            };
        }).filter(function(annotation) {
            return annotation.boneId && annotation.points;
        });
    }

    function buildAnnotationPage(annotations) {
        return {
            '@context': 'http://iiif.io/api/presentation/3/context.json',
            id: 'urn:arches:bone-inventory:annotation-page',
            type: 'AnnotationPage',
            items: annotations.map(function(annotation) {
                const bodies = [{
                    type: 'TextualBody',
                    value: annotation.boneId,
                    purpose: 'tagging'
                }];
                if (annotation.description) {
                    bodies.push({
                        type: 'TextualBody',
                        value: annotation.description,
                        purpose: 'commenting'
                    });
                }

                return {
                    id: 'urn:arches:bone-inventory:annotation:' +
                        encodeURIComponent(annotation.recordId) + ':' + annotation.annotationId,
                    type: 'Annotation',
                    motivation: 'commenting',
                    body: bodies,
                    target: {
                        type: 'SpecificResource',
                        source: 'urn:arches:bone-inventory:canvas',
                        selector: {
                            type: 'SvgSelector',
                            value: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
                                IMAGE_WIDTH + ' ' + IMAGE_HEIGHT + '"><polygon points="' +
                                escapeXml(annotation.points) + '" /></svg>'
                        }
                    }
                };
            })
        };
    }

    function buildManifest(imageUrl, annotationPage) {
        const canvasId = 'urn:arches:bone-inventory:canvas';
        let serviceUrl = '/iiif/bone-inventory/multimedia';
        try {
            serviceUrl = new URL(serviceUrl, window.location.origin).href;
        } catch (_) {
            try {
                serviceUrl = new URL(serviceUrl, imageUrl).href;
            } catch (_) {}
        }
        const absoluteImageUrl = serviceUrl.replace(/\/+$/, '') + '/full/max/0/default.jpg';

        return {
            '@context': 'http://iiif.io/api/presentation/3/context.json',
            id: 'urn:arches:bone-inventory:manifest',
            type: 'Manifest',
            label: { en: ['Bone inventory preview'] },
            items: [{
                id: canvasId,
                type: 'Canvas',
                height: IMAGE_HEIGHT,
                width: IMAGE_WIDTH,
                items: [{
                    id: 'urn:arches:bone-inventory:painting-page',
                    type: 'AnnotationPage',
                    items: [{
                        id: 'urn:arches:bone-inventory:painting',
                        type: 'Annotation',
                        motivation: 'painting',
                        body: {
                            id: absoluteImageUrl,
                            type: 'Image',
                            format: 'image/jpeg',
                            height: IMAGE_HEIGHT,
                            width: IMAGE_WIDTH,
                            service: [{
                                id: serviceUrl,
                                type: 'ImageService2',
                                profile: 'level1'
                            }]
                        },
                        target: canvasId
                    }]
                }],
                annotations: [annotationPage]
            }]
        };
    }

    return ko.components.register('bone-csv-visualization-step', {
        viewModel: function(params) {
            const self = this;

            const staticUrl = arches && arches.urls && arches.urls.media
                ? arches.urls.media : '/static/';
            self.imageUrl = staticUrl + 'img/bone-inventory/Multimedia.jpg';
            self.fileName = ko.observable('');
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            self.headers = ko.observableArray([]);
            self.rows = ko.observableArray([]);
            self.annotations = ko.observableArray([]);
            self.unknownRows = ko.observableArray([]);
            self.activeAnnotation = ko.observable(null);
            self.annotationPage = ko.observable(null);
            self.manifest = ko.observable(null);

            self.setWorkflowValue = function(value, reason) {
                if (typeof params.value === 'function') {
                    params.value(value);
                }
                if (
                    params.form &&
                    typeof params.form.value === 'function' &&
                    params.form.value !== params.value
                ) {
                    params.form.value(value);
                }
                logState('workflow value updated', {
                    reason: reason,
                    hasPayload: Boolean(value),
                    fileName: value && value.fileName,
                    rowCount: value && value.rowCount,
                    annotationCount: value && value.annotationCount
                });
            };

            self.supportedBones = Object.keys(BONE_REGIONS).map(function(boneId) {
                return {
                    id: boneId,
                    label: BONE_REGIONS[boneId].label
                };
            });

            self.hasResults = ko.pureComputed(function() {
                return self.rows().length > 0;
            });

            self.annotationCount = ko.pureComputed(function() {
                return self.annotations().length;
            });

            self.setActiveAnnotation = function(annotation) {
                self.activeAnnotation(annotation);
            };

            self.clear = function() {
                self.fileName('');
                self.errorMessage(null);
                self.successMessage(null);
                self.headers([]);
                self.rows([]);
                self.annotations([]);
                self.unknownRows([]);
                self.activeAnnotation(null);
                self.annotationPage(null);
                self.manifest(null);
                if (params.form && params.form.complete) {
                    params.form.complete(false);
                }
                self.setWorkflowValue(null, 'clear');
            };

            self.applyCsv = function(file, parsed) {
                const boneColumn = findColumn(parsed.normalizedHeaders, COLUMN_ALIASES.boneId);
                const idColumn = findColumn(parsed.normalizedHeaders, COLUMN_ALIASES.id);
                const descriptionColumn = findColumn(parsed.normalizedHeaders, COLUMN_ALIASES.description);

                if (!boneColumn) {
                    throw new Error('Missing bone_id column. Accepted names: bone_id, id_kosci, kosc, bone.');
                }

                const normalizedRows = parsed.rows.map(function(row, index) {
                    return {
                        id: idColumn ? row[idColumn] : String(index + 1),
                        boneId: normalizeHeader(row[boneColumn]),
                        description: descriptionColumn ? row[descriptionColumn] : '',
                        rowNumber: index + 2
                    };
                }).filter(function(row) {
                    return row.boneId.length > 0;
                });

                const annotations = [];
                const unknownRows = [];

                normalizedRows.forEach(function(row, index) {
                    const region = BONE_REGIONS[row.boneId];
                    if (!region) {
                        unknownRows.push(row);
                        return;
                    }
                    annotations.push({
                        annotationId: 'bone-annotation-' + (index + 1),
                        recordId: row.id,
                        boneId: row.boneId,
                        label: region.label,
                        description: row.description,
                        points: region.points,
                        color: '#ff6b35'
                    });
                });

                if (!normalizedRows.length) {
                    throw new Error('No rows with a bone identifier were found.');
                }

                self.fileName(file.name);
                self.headers(parsed.headers);
                self.rows(normalizedRows);
                self.annotations(annotations);
                self.unknownRows(unknownRows);
                self.activeAnnotation(annotations[0] || null);
                self.successMessage(
                    'Loaded ' + normalizedRows.length + ' row(s); created ' +
                    annotations.length + ' preview annotation(s).'
                );

                const annotationPage = buildAnnotationPage(annotations);
                const manifest = buildManifest(self.imageUrl, annotationPage);
                self.annotationPage(annotationPage);
                self.manifest(manifest);
                const result = {
                    schemaVersion: 1,
                    fileName: file.name,
                    rowCount: normalizedRows.length,
                    annotationCount: annotations.length,
                    unknownBoneIds: unknownRows.map(function(row) { return row.boneId; }),
                    preview: {
                        headers: parsed.headers,
                        rows: normalizedRows,
                        annotations: annotations,
                        unknownRows: unknownRows
                    },
                    annotationPage: annotationPage,
                    manifest: manifest
                };
                self.setWorkflowValue(result, 'CSV parsed');
                if (params.form && params.form.complete) {
                    params.form.complete(annotations.length > 0);
                }
                logState('CSV ready', {
                    fileName: file.name,
                    delimiter: parsed.delimiter === '\t' ? 'tab' : parsed.delimiter,
                    headers: parsed.headers,
                    rowCount: normalizedRows.length,
                    annotationCount: annotations.length,
                    unknownBoneIds: result.unknownBoneIds
                });
            };

            self.onFileSelected = function(_, event) {
                const file = event.target.files && event.target.files[0];
                self.clear();

                if (!file) {
                    logState('file selection cancelled');
                    return;
                }
                logState('file selected', {
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type
                });
                if (!/\.csv$/i.test(file.name)) {
                    self.errorMessage('Choose a CSV file.');
                    console.warn(LOG_PREFIX, 'rejected non-CSV file', file.name);
                    return;
                }
                if (file.size > MAX_FILE_SIZE) {
                    self.errorMessage('The CSV file is too large. The prototype limit is 2 MB.');
                    console.warn(LOG_PREFIX, 'rejected oversized CSV', {
                        fileName: file.name,
                        fileSize: file.size,
                        maxFileSize: MAX_FILE_SIZE
                    });
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(loadEvent) {
                    try {
                        self.applyCsv(file, parseDelimitedText(decodeBuffer(loadEvent.target.result)));
                    } catch (error) {
                        console.error(LOG_PREFIX, 'CSV parsing failed', error);
                        self.errorMessage(error.message || 'Could not read the CSV file.');
                    }
                };
                reader.onerror = function() {
                    console.error(LOG_PREFIX, 'FileReader failed', reader.error);
                    self.errorMessage('Could not read the CSV file.');
                };
                reader.readAsArrayBuffer(file);
            };

            self.goToIiifPreview = function() {
                if (!self.annotationCount()) return;
                const workflow = params.pageVm;
                if (!workflow) return;

                const activeStep = typeof workflow.activeStep === 'function'
                    ? workflow.activeStep()
                    : null;
                if (
                    activeStep &&
                    typeof activeStep.hasUnsavedData === 'function' &&
                    activeStep.hasUnsavedData() &&
                    typeof workflow.saveActiveStep === 'function'
                ) {
                    logState('saving before IIIF preview', {
                        workflowId: typeof workflow.id === 'function' ? workflow.id() : null,
                        stepId: typeof activeStep.id === 'function' ? activeStep.id() : null,
                        annotationCount: self.annotationCount()
                    });
                    workflow.saveActiveStep();
                    return;
                }
                if (typeof workflow.next === 'function') {
                    logState('opening IIIF preview without save', {
                        hasUnsavedData: activeStep && typeof activeStep.hasUnsavedData === 'function'
                            ? activeStep.hasUnsavedData()
                            : null
                    });
                    workflow.next();
                }
            };

            self.downloadIiifAnnotations = function() {
                if (!self.annotationPage()) return;
                triggerDownload(
                    'bone-inventory-annotations.json',
                    JSON.stringify(self.annotationPage(), null, 2),
                    'application/ld+json;charset=utf-8'
                );
            };

            const savedPayload = typeof params.value === 'function'
                ? ko.unwrap(params.value)
                : ko.unwrap(params.value || (params.form && params.form.value));

            if (savedPayload && savedPayload.manifest) {
                const preview = savedPayload.preview || {};
                const restoredAnnotations = annotationsFromPayload(savedPayload);
                const restoredUnknownRows = Array.isArray(preview.unknownRows)
                    ? preview.unknownRows
                    : (savedPayload.unknownBoneIds || []).map(function(boneId, index) {
                        return { id: '', boneId: boneId, description: '', rowNumber: index + 2 };
                    });
                let restoredRows = Array.isArray(preview.rows) ? preview.rows : [];
                if (!restoredRows.length && savedPayload.rowCount) {
                    restoredRows = Array.from({ length: savedPayload.rowCount }, function(_, index) {
                        return { id: String(index + 1), boneId: '', description: '', rowNumber: index + 2 };
                    });
                }

                self.fileName(savedPayload.fileName || 'Saved CSV');
                self.headers(Array.isArray(preview.headers) ? preview.headers : []);
                self.rows(restoredRows);
                self.annotations(restoredAnnotations);
                self.unknownRows(restoredUnknownRows);
                self.activeAnnotation(restoredAnnotations[0] || null);
                self.annotationPage(annotationPageFromPayload(savedPayload));
                self.manifest(savedPayload.manifest);
                self.successMessage(
                    'Restored ' + (savedPayload.rowCount || restoredRows.length) +
                    ' row(s) and ' + restoredAnnotations.length + ' annotation(s) from the saved workflow step.'
                );
                logState('restored saved payload', {
                    schemaVersion: savedPayload.schemaVersion || 'legacy',
                    fileName: savedPayload.fileName,
                    rowCount: savedPayload.rowCount,
                    annotationCount: restoredAnnotations.length,
                    hasPreviewSnapshot: Boolean(savedPayload.preview)
                });
            } else {
                logState('initialized without saved payload', {
                    hasValueObservable: typeof params.value === 'function',
                    formAndValueAreSame: Boolean(params.form && params.form.value === params.value)
                });
            }

            if (params.form && params.form.complete) {
                params.form.complete(self.annotations().length > 0);
            }
        },
        template: template
    });
});
